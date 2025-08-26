-- GTM Sales 분석을 위한 뷰 생성

-- 1. 고객별 요약 뷰
DROP VIEW IF EXISTS gtm_customer_summary CASCADE;
CREATE OR REPLACE VIEW gtm_customer_summary AS
SELECT 
    m.customer_name,
    m.domestic_overseas,
    COUNT(DISTINCT m.service_id) as service_count,
    COALESCE(SUM(r.revenue_amount), 0) as total_revenue,
    COALESCE(SUM(CASE WHEN r.revenue_month = '2506' THEN r.revenue_amount ELSE 0 END), 0) as latest_month_revenue
FROM gtm_sales_master m
LEFT JOIN gtm_sales_revenues r ON m.service_id = r.service_id
GROUP BY m.customer_name, m.domestic_overseas
ORDER BY total_revenue DESC;

-- 2. 월별 트렌드 뷰
DROP VIEW IF EXISTS gtm_monthly_trend CASCADE;
CREATE OR REPLACE VIEW gtm_monthly_trend AS
SELECT 
    revenue_month,
    COUNT(DISTINCT service_id) as active_services,
    COALESCE(SUM(revenue_amount), 0) as total_revenue,
    COALESCE(AVG(revenue_amount), 0) as avg_revenue
FROM gtm_sales_revenues
GROUP BY revenue_month
ORDER BY revenue_month;

-- 3. 서비스 유형별 요약 뷰
DROP VIEW IF EXISTS gtm_sales_service_summary CASCADE;
CREATE OR REPLACE VIEW gtm_sales_service_summary AS
SELECT 
    m.service_type,
    COUNT(DISTINCT m.service_id) as service_count,
    COUNT(DISTINCT m.customer_name) as customer_count,
    COALESCE(SUM(r.revenue_amount), 0) as total_revenue
FROM gtm_sales_master m
LEFT JOIN gtm_sales_revenues r ON m.service_id = r.service_id
WHERE m.service_type IS NOT NULL
GROUP BY m.service_type
ORDER BY total_revenue DESC;

-- 4. RLS 정책 확인 및 수정
-- 뷰에 대한 읽기 권한 부여
GRANT SELECT ON gtm_customer_summary TO authenticated;
GRANT SELECT ON gtm_monthly_trend TO authenticated;
GRANT SELECT ON gtm_sales_service_summary TO authenticated;

-- 기본 테이블에 대한 RLS 정책 재설정
ALTER TABLE gtm_sales_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE gtm_sales_revenues ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Allow read access" ON gtm_sales_master;
DROP POLICY IF EXISTS "Allow read access" ON gtm_sales_revenues;

-- 새로운 읽기 정책 생성 (모든 인증된 사용자)
CREATE POLICY "Allow read access to authenticated users" ON gtm_sales_master
    FOR SELECT 
    USING (true);  -- 모든 인증된 사용자가 읽기 가능

CREATE POLICY "Allow read access to authenticated users" ON gtm_sales_revenues
    FOR SELECT 
    USING (true);  -- 모든 인증된 사용자가 읽기 가능

-- 5. 데이터 확인 쿼리
/*
-- 데이터 존재 확인
SELECT COUNT(*) as master_count FROM gtm_sales_master;
SELECT COUNT(*) as revenue_count FROM gtm_sales_revenues;

-- 뷰 데이터 확인
SELECT * FROM gtm_customer_summary LIMIT 5;
SELECT * FROM gtm_monthly_trend LIMIT 5;
SELECT * FROM gtm_sales_service_summary LIMIT 5;
*/