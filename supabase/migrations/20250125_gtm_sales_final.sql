-- GTM Sales 테이블 생성 (CSV Import용)
-- CSV 파일의 첫 번째 행(헤더)를 아래 영문 컬럼명으로 변경 후 import

DROP TABLE IF EXISTS gtm_sales CASCADE;

CREATE TABLE gtm_sales (
    id BIGSERIAL PRIMARY KEY,
    
    -- 기본 정보 컬럼
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
    
    -- 월별 매출액 컬럼 (2025년 6월부터 2024년 8월까지 역순)
    revenue_2506 DECIMAL(15,2),      -- 2506 매출액
    revenue_2505 DECIMAL(15,2),      -- 2505 매출액
    revenue_2504 DECIMAL(15,2),      -- 2504 매출액
    revenue_2503 DECIMAL(15,2),      -- 2503 매출액
    revenue_2502 DECIMAL(15,2),      -- 2502 매출액
    revenue_2501 DECIMAL(15,2),      -- 2501 매출액
    revenue_2412 DECIMAL(15,2),      -- 2412 매출액
    revenue_2411 DECIMAL(15,2),      -- 2411 매출액
    revenue_2410 DECIMAL(15,2),      -- 2410 매출액
    revenue_2409 DECIMAL(15,2),      -- 2409 매출액
    revenue_2408 DECIMAL(15,2),      -- 2408 매출액
    
    -- 메타데이터
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성 (검색 성능 향상)
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

-- ============================================
-- 유용한 뷰들
-- ============================================

-- 1. 고객별 총 매출 뷰
CREATE OR REPLACE VIEW gtm_sales_customer_summary AS
SELECT 
    customer_name,
    domestic_overseas,
    COUNT(*) as service_count,
    SUM(
        COALESCE(revenue_2506, 0) + 
        COALESCE(revenue_2505, 0) + 
        COALESCE(revenue_2504, 0) + 
        COALESCE(revenue_2503, 0) + 
        COALESCE(revenue_2502, 0) + 
        COALESCE(revenue_2501, 0) + 
        COALESCE(revenue_2412, 0) + 
        COALESCE(revenue_2411, 0) + 
        COALESCE(revenue_2410, 0) + 
        COALESCE(revenue_2409, 0) + 
        COALESCE(revenue_2408, 0)
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
        COALESCE(revenue_2506, 0) + 
        COALESCE(revenue_2505, 0) + 
        COALESCE(revenue_2504, 0) + 
        COALESCE(revenue_2503, 0) + 
        COALESCE(revenue_2502, 0) + 
        COALESCE(revenue_2501, 0) + 
        COALESCE(revenue_2412, 0) + 
        COALESCE(revenue_2411, 0) + 
        COALESCE(revenue_2410, 0) + 
        COALESCE(revenue_2409, 0) + 
        COALESCE(revenue_2408, 0)
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

-- 4. 최근 3개월 매출 뷰
CREATE OR REPLACE VIEW gtm_recent_revenue AS
SELECT 
    customer_name,
    service_type,
    service_id,
    revenue_2504 as apr_2025,
    revenue_2505 as may_2025,
    revenue_2506 as jun_2025,
    (COALESCE(revenue_2504, 0) + 
     COALESCE(revenue_2505, 0) + 
     COALESCE(revenue_2506, 0)) as recent_3month_total
FROM gtm_sales
WHERE (revenue_2504 IS NOT NULL OR 
       revenue_2505 IS NOT NULL OR 
       revenue_2506 IS NOT NULL)
ORDER BY recent_3month_total DESC;

-- ============================================
-- 사용 방법
-- ============================================
/*
1. CSV 파일 준비:
   - Excel에서 Global_Sales.csv 파일 열기
   - 첫 번째 행(헤더)의 한글 컬럼명을 위의 영문 컬럼명으로 변경
   - CSV UTF-8 형식으로 저장

2. Supabase Dashboard에서:
   - SQL Editor에서 이 파일 전체 실행
   - Table Editor → gtm_sales 테이블 선택
   - Import Data 버튼 클릭
   - 수정된 CSV 파일 업로드
   - 컬럼 매핑 확인 후 Import

3. 데이터 확인:
   SELECT COUNT(*) FROM gtm_sales;
   SELECT * FROM gtm_sales_customer_summary LIMIT 10;
   SELECT * FROM gtm_sales_service_summary;
*/