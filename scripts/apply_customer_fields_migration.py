import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Supabase client
url = os.environ.get("SUPABASE_URL", "http://localhost:54321")
key = os.environ.get("SUPABASE_SERVICE_KEY") or os.environ.get("SUPABASE_ANON_KEY", "")

if not key:
    print("Error: SUPABASE_SERVICE_KEY or SUPABASE_ANON_KEY not found in environment variables")
    print("\nSupabase Studio에서 직접 SQL을 실행해주세요:")
    print("URL: http://localhost:54323/project/default/editor")
    sys.exit(1)

print("GTM Customers 테이블 업데이트 스크립트")
print("=" * 50)

# SQL for adding new columns
migration_sql = """
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

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_gtm_customers_annual_revenue ON gtm_customers(annual_revenue);
CREATE INDEX IF NOT EXISTS idx_gtm_customers_revenue_year ON gtm_customers(revenue_year);
CREATE INDEX IF NOT EXISTS idx_gtm_customers_industry_category ON gtm_customers(industry_category);
CREATE INDEX IF NOT EXISTS idx_gtm_customers_business_type ON gtm_customers(business_type);
"""

print("\n다음 SQL을 Supabase Studio에서 실행해주세요:")
print("-" * 50)
print(migration_sql)
print("-" * 50)

print("\n\nSupabase Studio SQL Editor 접속:")
print("1. 브라우저에서 열기: http://localhost:54323/project/default/editor")
print("2. 위 SQL 복사하여 붙여넣기")
print("3. 'Run' 버튼 클릭")

print("\n\n또는 pgAdmin/DBeaver 등 PostgreSQL 클라이언트로 접속:")
print("Host: localhost")
print("Port: 54322")
print("Database: postgres")
print("Username: postgres")
print("Password: postgres")

# 테이블 구조 확인을 위한 쿼리
check_sql = """
-- 테이블 컬럼 확인
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'gtm_customers'
ORDER BY ordinal_position;
"""

print("\n\n적용 후 확인용 SQL:")
print("-" * 50)
print(check_sql)
print("-" * 50)

# 샘플 데이터 업데이트
sample_data_sql = """
-- 샘플 데이터 업데이트 (선택사항)
UPDATE gtm_customers SET 
  annual_revenue = 10000,
  revenue_year = 2024,
  industry_category = '제조업',
  business_type = 'B2B',
  employee_count = 50000
WHERE customer_name LIKE '%삼성%' AND annual_revenue IS NULL;

UPDATE gtm_customers SET 
  annual_revenue = 5500,
  revenue_year = 2024,
  industry_category = 'IT/SW',
  business_type = 'B2B',
  employee_count = 30000
WHERE customer_name LIKE '%LG%' AND annual_revenue IS NULL;

UPDATE gtm_customers SET 
  annual_revenue = 4500,
  revenue_year = 2024,
  industry_category = '통신업',
  business_type = 'B2C',
  employee_count = 20000
WHERE customer_name LIKE '%SK%' AND annual_revenue IS NULL;

UPDATE gtm_customers SET 
  annual_revenue = 3000,
  revenue_year = 2024,
  industry_category = '제조업',
  business_type = 'B2B2C',
  employee_count = 70000
WHERE customer_name LIKE '%현대%' AND annual_revenue IS NULL;

UPDATE gtm_customers SET 
  annual_revenue = 450,
  revenue_year = 2024,
  industry_category = '금융업',
  business_type = 'B2C',
  employee_count = 5000
WHERE customer_name LIKE '%KB%' OR customer_name LIKE '%국민%' AND annual_revenue IS NULL;

UPDATE gtm_customers SET 
  annual_revenue = 380,
  revenue_year = 2024,
  industry_category = '유통업',
  business_type = 'B2C',
  employee_count = 10000
WHERE customer_name LIKE '%롯데%' AND annual_revenue IS NULL;

UPDATE gtm_customers SET 
  annual_revenue = 250,
  revenue_year = 2024,
  industry_category = '서비스업',
  business_type = 'B2C',
  employee_count = 3000
WHERE customer_name LIKE '%CJ%' AND annual_revenue IS NULL;

UPDATE gtm_customers SET 
  annual_revenue = 200,
  revenue_year = 2024,
  industry_category = '의료/제약',
  business_type = 'B2B2C',
  employee_count = 2000
WHERE customer_name LIKE '%한미%' OR customer_name LIKE '%셀트리온%' AND annual_revenue IS NULL;
"""

print("\n\n샘플 데이터 업데이트 (선택사항):")
print("-" * 50)
print(sample_data_sql)
print("-" * 50)

print("\n\n✅ 위 SQL들을 순서대로 실행하시면 됩니다.")
print("📌 기업 규모 자동 분류 기준:")
print("   - 대기업: 연매출 5000억원 이상")
print("   - 중견기업: 연매출 400억원 ~ 5000억원")
print("   - 중소기업: 연매출 400억원 미만")