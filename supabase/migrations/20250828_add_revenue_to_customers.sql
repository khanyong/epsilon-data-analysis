-- Add revenue fields to gtm_customers table
ALTER TABLE gtm_customers
ADD COLUMN IF NOT EXISTS annual_revenue DECIMAL(15, 2),
ADD COLUMN IF NOT EXISTS revenue_currency VARCHAR(10) DEFAULT 'KRW',
ADD COLUMN IF NOT EXISTS revenue_year INTEGER,
ADD COLUMN IF NOT EXISTS revenue_notes TEXT;

-- Add index for better performance on revenue queries
CREATE INDEX IF NOT EXISTS idx_gtm_customers_annual_revenue ON gtm_customers(annual_revenue);
CREATE INDEX IF NOT EXISTS idx_gtm_customers_revenue_year ON gtm_customers(revenue_year);

-- Comment on columns
COMMENT ON COLUMN gtm_customers.annual_revenue IS '연간 매출액';
COMMENT ON COLUMN gtm_customers.revenue_currency IS '매출 통화 (KRW, USD, EUR 등)';
COMMENT ON COLUMN gtm_customers.revenue_year IS '매출 기준 연도';
COMMENT ON COLUMN gtm_customers.revenue_notes IS '매출 관련 메모';