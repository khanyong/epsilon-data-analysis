-- GTM Sales 테이블 생성 (CSV 구조와 동일)
DROP TABLE IF EXISTS gtm_sales CASCADE;

CREATE TABLE gtm_sales (
    id BIGSERIAL PRIMARY KEY,
    
    -- 원본 CSV 컬럼들
    division TEXT,                    -- 구분
    settlement_type TEXT,             -- 결산구분
    bm_manager TEXT,                  -- BM담당
    settlement_manager TEXT,          -- 정산담당
    customer_name TEXT,               -- 통합고객명
    domestic_overseas TEXT,           -- 국내/해외
    channel TEXT,                     -- 채널
    customer_group TEXT,              -- 고객군
    service_type TEXT,                -- 서비스유형
    service_id TEXT,                  -- 서비스ID
    pop TEXT,                         -- POP
    capacity TEXT,                    -- 용량
    capacity_unit TEXT,               -- 용량단위
    
    -- 월별 매출액 컬럼들 (2024년 8월 ~ 2025년 6월)
    revenue_2408 DECIMAL(15,2),      -- 2408 매출액
    revenue_2409 DECIMAL(15,2),      -- 2409 매출액
    revenue_2410 DECIMAL(15,2),      -- 2410 매출액
    revenue_2411 DECIMAL(15,2),      -- 2411 매출액
    revenue_2412 DECIMAL(15,2),      -- 2412 매출액
    revenue_2501 DECIMAL(15,2),      -- 2501 매출액
    revenue_2502 DECIMAL(15,2),      -- 2502 매출액
    revenue_2503 DECIMAL(15,2),      -- 2503 매출액
    revenue_2504 DECIMAL(15,2),      -- 2504 매출액
    revenue_2505 DECIMAL(15,2),      -- 2505 매출액
    revenue_2506 DECIMAL(15,2),      -- 2506 매출액
    
    -- 메타데이터
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_gtm_sales_customer ON gtm_sales(customer_name);
CREATE INDEX idx_gtm_sales_service_id ON gtm_sales(service_id);
CREATE INDEX idx_gtm_sales_service_type ON gtm_sales(service_type);
CREATE INDEX idx_gtm_sales_domestic ON gtm_sales(domestic_overseas);

-- RLS 정책 활성화
ALTER TABLE gtm_sales ENABLE ROW LEVEL SECURITY;

-- 읽기 권한 (모든 인증된 사용자)
CREATE POLICY "Allow read access to authenticated users" ON gtm_sales
    FOR SELECT USING (auth.role() = 'authenticated');

-- 쓰기 권한 (서비스 역할만)
CREATE POLICY "Allow insert for service role" ON gtm_sales
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow update for service role" ON gtm_sales
    FOR UPDATE USING (auth.role() = 'service_role');

CREATE POLICY "Allow delete for service role" ON gtm_sales
    FOR DELETE USING (auth.role() = 'service_role');

-- 유용한 뷰들

-- 1. 고객별 총 매출 뷰
CREATE OR REPLACE VIEW gtm_sales_customer_summary AS
SELECT 
    customer_name,
    domestic_overseas,
    COUNT(*) as service_count,
    SUM(
        COALESCE(revenue_2408, 0) + COALESCE(revenue_2409, 0) + 
        COALESCE(revenue_2410, 0) + COALESCE(revenue_2411, 0) + 
        COALESCE(revenue_2412, 0) + COALESCE(revenue_2501, 0) + 
        COALESCE(revenue_2502, 0) + COALESCE(revenue_2503, 0) + 
        COALESCE(revenue_2504, 0) + COALESCE(revenue_2505, 0) + 
        COALESCE(revenue_2506, 0)
    ) as total_revenue,
    SUM(COALESCE(revenue_2506, 0)) as latest_month_revenue
FROM gtm_sales
WHERE customer_name IS NOT NULL
GROUP BY customer_name, domestic_overseas
ORDER BY total_revenue DESC;

-- 2. 서비스 유형별 매출 뷰
CREATE OR REPLACE VIEW gtm_sales_service_summary AS
SELECT 
    service_type,
    COUNT(*) as service_count,
    COUNT(DISTINCT customer_name) as customer_count,
    SUM(
        COALESCE(revenue_2408, 0) + COALESCE(revenue_2409, 0) + 
        COALESCE(revenue_2410, 0) + COALESCE(revenue_2411, 0) + 
        COALESCE(revenue_2412, 0) + COALESCE(revenue_2501, 0) + 
        COALESCE(revenue_2502, 0) + COALESCE(revenue_2503, 0) + 
        COALESCE(revenue_2504, 0) + COALESCE(revenue_2505, 0) + 
        COALESCE(revenue_2506, 0)
    ) as total_revenue
FROM gtm_sales
WHERE service_type IS NOT NULL
GROUP BY service_type
ORDER BY total_revenue DESC;

-- 3. 월별 트렌드 뷰 (피벗 해제)
CREATE OR REPLACE VIEW gtm_sales_monthly_trend AS
WITH unpivoted AS (
    SELECT 
        id,
        customer_name,
        service_type,
        domestic_overseas,
        service_id,
        '2024-08-01'::DATE as month,
        revenue_2408 as revenue
    FROM gtm_sales
    UNION ALL
    SELECT id, customer_name, service_type, domestic_overseas, service_id, 
           '2024-09-01'::DATE, revenue_2409 FROM gtm_sales
    UNION ALL
    SELECT id, customer_name, service_type, domestic_overseas, service_id,
           '2024-10-01'::DATE, revenue_2410 FROM gtm_sales
    UNION ALL
    SELECT id, customer_name, service_type, domestic_overseas, service_id,
           '2024-11-01'::DATE, revenue_2411 FROM gtm_sales
    UNION ALL
    SELECT id, customer_name, service_type, domestic_overseas, service_id,
           '2024-12-01'::DATE, revenue_2412 FROM gtm_sales
    UNION ALL
    SELECT id, customer_name, service_type, domestic_overseas, service_id,
           '2025-01-01'::DATE, revenue_2501 FROM gtm_sales
    UNION ALL
    SELECT id, customer_name, service_type, domestic_overseas, service_id,
           '2025-02-01'::DATE, revenue_2502 FROM gtm_sales
    UNION ALL
    SELECT id, customer_name, service_type, domestic_overseas, service_id,
           '2025-03-01'::DATE, revenue_2503 FROM gtm_sales
    UNION ALL
    SELECT id, customer_name, service_type, domestic_overseas, service_id,
           '2025-04-01'::DATE, revenue_2504 FROM gtm_sales
    UNION ALL
    SELECT id, customer_name, service_type, domestic_overseas, service_id,
           '2025-05-01'::DATE, revenue_2505 FROM gtm_sales
    UNION ALL
    SELECT id, customer_name, service_type, domestic_overseas, service_id,
           '2025-06-01'::DATE, revenue_2506 FROM gtm_sales
)
SELECT 
    month,
    customer_name,
    service_type,
    domestic_overseas,
    service_id,
    COALESCE(revenue, 0) as revenue
FROM unpivoted
ORDER BY month, customer_name;

-- 샘플 데이터 삽입 예시 (CSV 데이터 기반)
-- 실제로는 Supabase 대시보드의 CSV import 기능을 사용하거나
-- 아래와 같이 직접 INSERT 문을 사용할 수 있습니다.

/*
INSERT INTO gtm_sales (
    division, settlement_type, bm_manager, settlement_manager, customer_name,
    domestic_overseas, channel, customer_group, service_type, service_id,
    pop, capacity, capacity_unit,
    revenue_2408, revenue_2409, revenue_2410, revenue_2411, revenue_2412,
    revenue_2501, revenue_2502, revenue_2503, revenue_2504, revenue_2505, revenue_2506
) VALUES 
(
    '일반', '일반', '이하림', '고은주', 'CHINA TELECOM(CTG)',
    '해외', 'BM자체', '통신사/ISP', '글로벌패스 전용회선', '0888-7065-9003',
    '0미사용', '10', 'Gbps',
    18900000, 18133200, 18900000, 18900000, 18900000,
    18900000, 18900000, 18900000, 18190237, 18900000, 18900000
),
(
    '일반', '일반', '이하림', '고은주', 'CHINA TELECOM(CTG)',
    '해외', 'BM자체', '통신사/ISP', '글로벌패스 전용회선', '0888-7065-9009',
    '0미사용', '10', 'Gbps',
    18900000, 18900000, 18900000, 18900000, 18900000,
    18900000, 18900000, 18900000, 18900000, 18900000, 18900000
);
*/

-- 데이터 통계 확인용 쿼리
/*
-- 전체 레코드 수
SELECT COUNT(*) as total_records FROM gtm_sales;

-- 고객별 총 매출 Top 10
SELECT * FROM gtm_sales_customer_summary LIMIT 10;

-- 서비스 유형별 매출
SELECT * FROM gtm_sales_service_summary;

-- 최근 3개월 매출 합계
SELECT 
    customer_name,
    SUM(revenue_2504 + revenue_2505 + revenue_2506) as recent_3month_revenue
FROM gtm_sales
GROUP BY customer_name
ORDER BY recent_3month_revenue DESC
LIMIT 10;
*/