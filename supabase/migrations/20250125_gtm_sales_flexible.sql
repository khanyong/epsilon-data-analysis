-- GTM Sales 유연한 구조 (월별 데이터 추가 가능)
-- 새로운 월 데이터가 추가되어도 스키마 변경 없이 처리 가능

-- 기존 테이블 삭제
DROP TABLE IF EXISTS gtm_sales_revenues CASCADE;
DROP TABLE IF EXISTS gtm_sales_master CASCADE;

-- 1. 마스터 테이블 (서비스 기본 정보)
CREATE TABLE gtm_sales_master (
    id BIGSERIAL PRIMARY KEY,
    
    -- 기본 정보
    division TEXT,                    -- 구분
    settlement_type TEXT,             -- 결산구분
    bm_manager TEXT,                  -- BM담당
    settlement_manager TEXT,          -- 정산담당
    customer_name TEXT,               -- 통합고객명
    domestic_overseas TEXT,           -- 국내/해외
    channel TEXT,                     -- 채널
    customer_group TEXT,              -- 고객군
    service_type TEXT,                -- 서비스유형
    service_id TEXT UNIQUE NOT NULL,  -- 서비스ID (고유키)
    pop TEXT,                         -- POP
    capacity TEXT,                    -- 용량
    capacity_unit TEXT,               -- 용량단위
    
    -- 메타데이터
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 월별 매출 테이블 (유연한 구조)
CREATE TABLE gtm_sales_revenues (
    id BIGSERIAL PRIMARY KEY,
    service_id TEXT NOT NULL REFERENCES gtm_sales_master(service_id) ON DELETE CASCADE,
    revenue_month VARCHAR(4) NOT NULL,  -- YYMM 형식 (예: 2506, 2505, 2412)
    revenue_amount DECIMAL(15,2),       -- 매출액
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(service_id, revenue_month)   -- 서비스별 월별 유니크
);

-- 인덱스 생성
CREATE INDEX idx_gtm_master_customer ON gtm_sales_master(customer_name);
CREATE INDEX idx_gtm_master_service_type ON gtm_sales_master(service_type);
CREATE INDEX idx_gtm_master_domestic ON gtm_sales_master(domestic_overseas);
CREATE INDEX idx_gtm_revenues_month ON gtm_sales_revenues(revenue_month);
CREATE INDEX idx_gtm_revenues_service ON gtm_sales_revenues(service_id);

-- RLS 정책
ALTER TABLE gtm_sales_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE gtm_sales_revenues ENABLE ROW LEVEL SECURITY;

-- 읽기 권한
CREATE POLICY "Allow read access" ON gtm_sales_master
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read access" ON gtm_sales_revenues
    FOR SELECT USING (auth.role() = 'authenticated');

-- 쓰기 권한
CREATE POLICY "Allow write access" ON gtm_sales_master
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow write access" ON gtm_sales_revenues
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 데이터 Import 함수
-- ============================================

-- CSV import 후 데이터 변환 함수
CREATE OR REPLACE FUNCTION transform_gtm_sales_to_flexible() 
RETURNS void AS $$
DECLARE
    rec RECORD;
    revenue_cols TEXT[] := ARRAY[
        'revenue_2506', 'revenue_2505', 'revenue_2504', 'revenue_2503', 
        'revenue_2502', 'revenue_2501', 'revenue_2412', 'revenue_2411', 
        'revenue_2410', 'revenue_2409', 'revenue_2408'
    ];
    col TEXT;
    month_code TEXT;
    revenue_val DECIMAL;
BEGIN
    -- 1. 마스터 데이터 입력
    INSERT INTO gtm_sales_master (
        division, settlement_type, bm_manager, settlement_manager,
        customer_name, domestic_overseas, channel, customer_group,
        service_type, service_id, pop, capacity, capacity_unit
    )
    SELECT DISTINCT ON (service_id)
        division, settlement_type, bm_manager, settlement_manager,
        customer_name, domestic_overseas, channel, customer_group,
        service_type, service_id, pop, capacity, capacity_unit
    FROM gtm_sales
    ON CONFLICT (service_id) DO UPDATE SET
        customer_name = EXCLUDED.customer_name,
        updated_at = NOW();
    
    -- 2. 월별 매출 데이터 입력
    FOR rec IN SELECT * FROM gtm_sales LOOP
        -- 각 월별 컬럼 처리
        FOREACH col IN ARRAY revenue_cols LOOP
            -- 컬럼명에서 월 코드 추출 (예: revenue_2506 -> 2506)
            month_code := substring(col from 9 for 4);
            
            -- 동적 SQL로 해당 컬럼 값 가져오기
            EXECUTE format('SELECT $1.%I', col) INTO revenue_val USING rec;
            
            -- NULL이 아닌 경우만 입력
            IF revenue_val IS NOT NULL THEN
                INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
                VALUES (rec.service_id, month_code, revenue_val)
                ON CONFLICT (service_id, revenue_month) 
                DO UPDATE SET revenue_amount = EXCLUDED.revenue_amount;
            END IF;
        END LOOP;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 유용한 뷰들
-- ============================================

-- 1. 피벗 뷰 (월별 컬럼으로 표시)
CREATE OR REPLACE VIEW gtm_sales_pivot AS
SELECT 
    m.*,
    -- 동적으로 월별 데이터 피벗
    MAX(CASE WHEN r.revenue_month = '2506' THEN r.revenue_amount END) as revenue_2506,
    MAX(CASE WHEN r.revenue_month = '2505' THEN r.revenue_amount END) as revenue_2505,
    MAX(CASE WHEN r.revenue_month = '2504' THEN r.revenue_amount END) as revenue_2504,
    MAX(CASE WHEN r.revenue_month = '2503' THEN r.revenue_amount END) as revenue_2503,
    MAX(CASE WHEN r.revenue_month = '2502' THEN r.revenue_amount END) as revenue_2502,
    MAX(CASE WHEN r.revenue_month = '2501' THEN r.revenue_amount END) as revenue_2501,
    MAX(CASE WHEN r.revenue_month = '2412' THEN r.revenue_amount END) as revenue_2412,
    MAX(CASE WHEN r.revenue_month = '2411' THEN r.revenue_amount END) as revenue_2411,
    MAX(CASE WHEN r.revenue_month = '2410' THEN r.revenue_amount END) as revenue_2410,
    MAX(CASE WHEN r.revenue_month = '2409' THEN r.revenue_amount END) as revenue_2409,
    MAX(CASE WHEN r.revenue_month = '2408' THEN r.revenue_amount END) as revenue_2408
FROM gtm_sales_master m
LEFT JOIN gtm_sales_revenues r ON m.service_id = r.service_id
GROUP BY m.id, m.division, m.settlement_type, m.bm_manager, m.settlement_manager,
         m.customer_name, m.domestic_overseas, m.channel, m.customer_group,
         m.service_type, m.service_id, m.pop, m.capacity, m.capacity_unit,
         m.created_at, m.updated_at;

-- 2. 고객별 총 매출 (모든 월 자동 집계)
CREATE OR REPLACE VIEW gtm_customer_summary AS
SELECT 
    m.customer_name,
    m.domestic_overseas,
    COUNT(DISTINCT m.service_id) as service_count,
    SUM(r.revenue_amount) as total_revenue,
    COUNT(DISTINCT r.revenue_month) as active_months,
    MAX(r.revenue_month) as latest_month
FROM gtm_sales_master m
LEFT JOIN gtm_sales_revenues r ON m.service_id = r.service_id
GROUP BY m.customer_name, m.domestic_overseas
ORDER BY total_revenue DESC;

-- 3. 월별 전체 매출 트렌드
CREATE OR REPLACE VIEW gtm_monthly_trend AS
SELECT 
    revenue_month,
    COUNT(DISTINCT service_id) as active_services,
    SUM(revenue_amount) as total_revenue,
    AVG(revenue_amount) as avg_revenue
FROM gtm_sales_revenues
GROUP BY revenue_month
ORDER BY revenue_month;

-- 4. 서비스별 매출 이력
CREATE OR REPLACE VIEW gtm_service_history AS
SELECT 
    m.service_id,
    m.customer_name,
    m.service_type,
    r.revenue_month,
    r.revenue_amount,
    -- 성장률 계산 (이전 월 대비)
    LAG(r.revenue_amount) OVER (PARTITION BY m.service_id ORDER BY r.revenue_month) as prev_month_revenue,
    CASE 
        WHEN LAG(r.revenue_amount) OVER (PARTITION BY m.service_id ORDER BY r.revenue_month) > 0
        THEN ((r.revenue_amount - LAG(r.revenue_amount) OVER (PARTITION BY m.service_id ORDER BY r.revenue_month)) / 
              LAG(r.revenue_amount) OVER (PARTITION BY m.service_id ORDER BY r.revenue_month) * 100)
        ELSE NULL
    END as growth_rate
FROM gtm_sales_master m
JOIN gtm_sales_revenues r ON m.service_id = r.service_id
ORDER BY m.service_id, r.revenue_month;

-- ============================================
-- 새로운 월 데이터 추가 함수
-- ============================================

CREATE OR REPLACE FUNCTION add_new_month_revenue(
    p_service_id TEXT,
    p_month VARCHAR(4),
    p_amount DECIMAL
) RETURNS void AS $$
BEGIN
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    VALUES (p_service_id, p_month, p_amount)
    ON CONFLICT (service_id, revenue_month) 
    DO UPDATE SET revenue_amount = EXCLUDED.revenue_amount;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 사용 방법
-- ============================================
/*
방법 1: 기존 테이블 구조 사용 (간단하지만 제한적)
1. CSV import를 위해 먼저 gtm_sales 테이블 생성 (20250125_gtm_sales_final.sql 실행)
2. CSV 파일 import
3. 데이터 변환:
   SELECT transform_gtm_sales_to_flexible();
4. 기존 테이블 삭제 (선택사항):
   DROP TABLE gtm_sales;

방법 2: Python 스크립트로 직접 입력
- scripts/import_gtm_sales_flexible.py 사용

새로운 월 추가 예시:
-- 2507 매출 추가
SELECT add_new_month_revenue('0888-7065-9003', '2507', 19500000);

-- 또는 일괄 추가
INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
VALUES 
    ('0888-7065-9003', '2507', 19500000),
    ('0888-7065-9009', '2507', 19500000)
ON CONFLICT (service_id, revenue_month) 
DO UPDATE SET revenue_amount = EXCLUDED.revenue_amount;

-- 피벗 뷰 재생성 (새로운 월 추가 시)
-- gtm_sales_pivot 뷰를 DROP하고 새로운 월 컬럼을 추가하여 재생성
*/