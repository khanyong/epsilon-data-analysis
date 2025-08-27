-- Add revenue and industry fields to gtm_customers table
ALTER TABLE gtm_customers
ADD COLUMN IF NOT EXISTS annual_revenue DECIMAL(15, 2),
ADD COLUMN IF NOT EXISTS revenue_currency VARCHAR(10) DEFAULT 'KRW',
ADD COLUMN IF NOT EXISTS revenue_year INTEGER,
ADD COLUMN IF NOT EXISTS revenue_notes TEXT,
ADD COLUMN IF NOT EXISTS industry_category VARCHAR(100),
ADD COLUMN IF NOT EXISTS industry_subcategory VARCHAR(100),
ADD COLUMN IF NOT EXISTS business_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS employee_count INTEGER,
ADD COLUMN IF NOT EXISTS establishment_year INTEGER;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gtm_customers_annual_revenue ON gtm_customers(annual_revenue);
CREATE INDEX IF NOT EXISTS idx_gtm_customers_revenue_year ON gtm_customers(revenue_year);
CREATE INDEX IF NOT EXISTS idx_gtm_customers_industry_category ON gtm_customers(industry_category);
CREATE INDEX IF NOT EXISTS idx_gtm_customers_business_type ON gtm_customers(business_type);

-- Comment on columns
COMMENT ON COLUMN gtm_customers.annual_revenue IS '연간 매출액 (억원 단위)';
COMMENT ON COLUMN gtm_customers.revenue_currency IS '매출 통화 (KRW, USD, EUR 등)';
COMMENT ON COLUMN gtm_customers.revenue_year IS '매출 기준 연도';
COMMENT ON COLUMN gtm_customers.revenue_notes IS '매출 관련 메모';
COMMENT ON COLUMN gtm_customers.industry_category IS '산업 대분류 (제조업, 서비스업, 금융업, IT, 유통업 등)';
COMMENT ON COLUMN gtm_customers.industry_subcategory IS '산업 세부분류';
COMMENT ON COLUMN gtm_customers.business_type IS '사업 유형 (B2B, B2C, B2G 등)';
COMMENT ON COLUMN gtm_customers.employee_count IS '직원 수';
COMMENT ON COLUMN gtm_customers.establishment_year IS '설립 연도';