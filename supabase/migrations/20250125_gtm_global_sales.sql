-- GTM Global Sales 테이블 생성
CREATE TABLE IF NOT EXISTS gtm_global_sales (
    id BIGSERIAL PRIMARY KEY,
    
    -- 기본 정보
    division TEXT, -- 구분
    settlement_type TEXT, -- 결산구분
    bm_manager TEXT, -- BM담당
    settlement_manager TEXT, -- 정산담당
    customer_name TEXT NOT NULL, -- 통합고객명
    
    -- 분류 정보
    domestic_overseas TEXT, -- 국내/해외
    channel TEXT, -- 채널
    customer_group TEXT, -- 고객군
    service_type TEXT, -- 서비스유형
    
    -- 서비스 정보
    service_id TEXT UNIQUE NOT NULL, -- 서비스ID
    pop TEXT, -- POP
    capacity DECIMAL(10,2), -- 용량
    capacity_unit TEXT, -- 용량단위
    
    -- 메타데이터
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 월별 매출 데이터 테이블
CREATE TABLE IF NOT EXISTS gtm_monthly_revenue (
    id BIGSERIAL PRIMARY KEY,
    service_id TEXT NOT NULL REFERENCES gtm_global_sales(service_id) ON DELETE CASCADE,
    revenue_month DATE NOT NULL, -- YYYY-MM-01 형식
    revenue_amount DECIMAL(15,2), -- 매출액
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(service_id, revenue_month) -- 서비스ID와 월의 조합은 유니크
);

-- 인덱스 생성
CREATE INDEX idx_gtm_global_sales_customer ON gtm_global_sales(customer_name);
CREATE INDEX idx_gtm_global_sales_service_type ON gtm_global_sales(service_type);
CREATE INDEX idx_gtm_global_sales_domestic ON gtm_global_sales(domestic_overseas);
CREATE INDEX idx_gtm_monthly_revenue_month ON gtm_monthly_revenue(revenue_month);
CREATE INDEX idx_gtm_monthly_revenue_service ON gtm_monthly_revenue(service_id);

-- RLS 정책
ALTER TABLE gtm_global_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE gtm_monthly_revenue ENABLE ROW LEVEL SECURITY;

-- 모든 인증된 사용자가 읽기 가능
CREATE POLICY "Allow read access to all authenticated users" ON gtm_global_sales
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read access to all authenticated users" ON gtm_monthly_revenue
    FOR SELECT USING (auth.role() = 'authenticated');

-- 관리자만 수정 가능
CREATE POLICY "Allow full access to service role" ON gtm_global_sales
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow full access to service role" ON gtm_monthly_revenue
    FOR ALL USING (auth.role() = 'service_role');

-- 뷰 생성: 전체 매출 요약 (모든 기간)
CREATE OR REPLACE VIEW gtm_revenue_summary AS
SELECT 
    g.customer_name,
    g.service_type,
    g.domestic_overseas,
    g.capacity,
    g.capacity_unit,
    g.service_id,
    COUNT(DISTINCT r.revenue_month) as total_months,
    SUM(r.revenue_amount) as total_revenue,
    AVG(r.revenue_amount) as avg_monthly_revenue,
    MIN(r.revenue_month) as first_revenue_month,
    MAX(r.revenue_month) as last_revenue_month
FROM gtm_global_sales g
LEFT JOIN gtm_monthly_revenue r ON g.service_id = r.service_id
GROUP BY g.customer_name, g.service_type, g.domestic_overseas, g.capacity, g.capacity_unit, g.service_id;

-- 뷰 생성: 최근 N개월 매출 (동적 조회용)
CREATE OR REPLACE VIEW gtm_monthly_trend AS
SELECT 
    g.customer_name,
    g.service_type,
    g.domestic_overseas,
    g.service_id,
    r.revenue_month,
    r.revenue_amount,
    SUM(r.revenue_amount) OVER (
        PARTITION BY g.service_id 
        ORDER BY r.revenue_month 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as rolling_3month_sum,
    AVG(r.revenue_amount) OVER (
        PARTITION BY g.service_id 
        ORDER BY r.revenue_month 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as rolling_3month_avg
FROM gtm_global_sales g
JOIN gtm_monthly_revenue r ON g.service_id = r.service_id
ORDER BY g.service_id, r.revenue_month;

-- 뷰 생성: 고객별 월별 매출 매트릭스
CREATE OR REPLACE VIEW gtm_customer_monthly_matrix AS
SELECT 
    g.customer_name,
    g.service_type,
    r.revenue_month,
    SUM(r.revenue_amount) as monthly_revenue
FROM gtm_global_sales g
JOIN gtm_monthly_revenue r ON g.service_id = r.service_id
GROUP BY g.customer_name, g.service_type, r.revenue_month
ORDER BY g.customer_name, r.revenue_month;