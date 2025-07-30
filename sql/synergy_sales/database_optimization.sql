-- =====================================================
-- Synergy Sales 연도별 합산 최적화 SQL
-- =====================================================

-- 1. 연도별 합산 뷰 생성 (성능 최적화) - 안전한 타입 변환 포함
CREATE OR REPLACE VIEW synergy_sales_annual_view AS
SELECT 
  Category,
  Customer,
  Channel,
  "End Customer" as End_Customer,
  "SD-WAN" as SD_WAN,
  -- 2022년 합계 (22-1 ~ 22-12) - 안전한 타입 변환
  COALESCE(CAST("22-1" AS numeric), 0) + COALESCE(CAST("22-2" AS numeric), 0) + 
  COALESCE(CAST("22-3" AS numeric), 0) + COALESCE(CAST("22-4" AS numeric), 0) + 
  COALESCE(CAST("22-5" AS numeric), 0) + COALESCE(CAST("22-6" AS numeric), 0) + 
  COALESCE(CAST("22-7" AS numeric), 0) + COALESCE(CAST("22-8" AS numeric), 0) + 
  COALESCE(CAST("22-9" AS numeric), 0) + COALESCE(CAST("22-10" AS numeric), 0) + 
  COALESCE(CAST("22-11" AS numeric), 0) + COALESCE(CAST("22-12" AS numeric), 0) as "2022_Total",
  
  -- 2023년 합계 (23-1 ~ 23-12)
  COALESCE(CAST("23-1" AS numeric), 0) + COALESCE(CAST("23-2" AS numeric), 0) + 
  COALESCE(CAST("23-3" AS numeric), 0) + COALESCE(CAST("23-4" AS numeric), 0) + 
  COALESCE(CAST("23-5" AS numeric), 0) + COALESCE(CAST("23-6" AS numeric), 0) + 
  COALESCE(CAST("23-7" AS numeric), 0) + COALESCE(CAST("23-8" AS numeric), 0) + 
  COALESCE(CAST("23-9" AS numeric), 0) + COALESCE(CAST("23-10" AS numeric), 0) + 
  COALESCE(CAST("23-11" AS numeric), 0) + COALESCE(CAST("23-12" AS numeric), 0) as "2023_Total",
  
  -- 2024년 합계 (24-1 ~ 24-12)
  COALESCE(CAST("24-1" AS numeric), 0) + COALESCE(CAST("24-2" AS numeric), 0) + 
  COALESCE(CAST("24-3" AS numeric), 0) + COALESCE(CAST("24-4" AS numeric), 0) + 
  COALESCE(CAST("24-5" AS numeric), 0) + COALESCE(CAST("24-6" AS numeric), 0) + 
  COALESCE(CAST("24-7" AS numeric), 0) + COALESCE(CAST("24-8" AS numeric), 0) + 
  COALESCE(CAST("24-9" AS numeric), 0) + COALESCE(CAST("24-10" AS numeric), 0) + 
  COALESCE(CAST("24-11" AS numeric), 0) + COALESCE(CAST("24-12" AS numeric), 0) as "2024_Total",
  
  -- 2025년 합계 (25-1 ~ 25-12)
  COALESCE(CAST("25-1" AS numeric), 0) + COALESCE(CAST("25-2" AS numeric), 0) + 
  COALESCE(CAST("25-3" AS numeric), 0) + COALESCE(CAST("25-4" AS numeric), 0) + 
  COALESCE(CAST("25-5" AS numeric), 0) + COALESCE(CAST("25-6" AS numeric), 0) + 
  COALESCE(CAST("25-7" AS numeric), 0) + COALESCE(CAST("25-8" AS numeric), 0) + 
  COALESCE(CAST("25-9" AS numeric), 0) + COALESCE(CAST("25-10" AS numeric), 0) + 
  COALESCE(CAST("25-11" AS numeric), 0) + COALESCE(CAST("25-12" AS numeric), 0) as "2025_Total",
  
  -- 2026년 합계 (26-1 ~ 26-12)
  COALESCE(CAST("26-1" AS numeric), 0) + COALESCE(CAST("26-2" AS numeric), 0) + 
  COALESCE(CAST("26-3" AS numeric), 0) + COALESCE(CAST("26-4" AS numeric), 0) + 
  COALESCE(CAST("26-5" AS numeric), 0) + COALESCE(CAST("26-6" AS numeric), 0) + 
  COALESCE(CAST("26-7" AS numeric), 0) + COALESCE(CAST("26-8" AS numeric), 0) + 
  COALESCE(CAST("26-9" AS numeric), 0) + COALESCE(CAST("26-10" AS numeric), 0) + 
  COALESCE(CAST("26-11" AS numeric), 0) + COALESCE(CAST("26-12" AS numeric), 0) as "2026_Total"
FROM synergy_sales;

-- 2. 카테고리별 연도 합계 뷰 생성
CREATE OR REPLACE VIEW synergy_sales_category_annual_view AS
SELECT 
  Category,
  SUM(COALESCE("22-1", 0) + COALESCE("22-2", 0) + COALESCE("22-3", 0) + COALESCE("22-4", 0) + 
      COALESCE("22-5", 0) + COALESCE("22-6", 0) + COALESCE("22-7", 0) + COALESCE("22-8", 0) + 
      COALESCE("22-9", 0) + COALESCE("22-10", 0) + COALESCE("22-11", 0) + COALESCE("22-12", 0)) as "2022_Total",
  
  SUM(COALESCE("23-1", 0) + COALESCE("23-2", 0) + COALESCE("23-3", 0) + COALESCE("23-4", 0) + 
      COALESCE("23-5", 0) + COALESCE("23-6", 0) + COALESCE("23-7", 0) + COALESCE("23-8", 0) + 
      COALESCE("23-9", 0) + COALESCE("23-10", 0) + COALESCE("23-11", 0) + COALESCE("23-12", 0)) as "2023_Total",
  
  SUM(COALESCE("24-1", 0) + COALESCE("24-2", 0) + COALESCE("24-3", 0) + COALESCE("24-4", 0) + 
      COALESCE("24-5", 0) + COALESCE("24-6", 0) + COALESCE("24-7", 0) + COALESCE("24-8", 0) + 
      COALESCE("24-9", 0) + COALESCE("24-10", 0) + COALESCE("24-11", 0) + COALESCE("24-12", 0)) as "2024_Total",
  
  SUM(COALESCE("25-1", 0) + COALESCE("25-2", 0) + COALESCE("25-3", 0) + COALESCE("25-4", 0) + 
      COALESCE("25-5", 0) + COALESCE("25-6", 0) + COALESCE("25-7", 0) + COALESCE("25-8", 0) + 
      COALESCE("25-9", 0) + COALESCE("25-10", 0) + COALESCE("25-11", 0) + COALESCE("25-12", 0)) as "2025_Total",
  
  SUM(COALESCE("26-1", 0) + COALESCE("26-2", 0) + COALESCE("26-3", 0) + COALESCE("26-4", 0) + 
      COALESCE("26-5", 0) + COALESCE("26-6", 0) + COALESCE("26-7", 0) + COALESCE("26-8", 0) + 
      COALESCE("26-9", 0) + COALESCE("26-10", 0) + COALESCE("26-11", 0) + COALESCE("26-12", 0)) as "2026_Total"
FROM synergy_sales
GROUP BY Category
ORDER BY Category;

-- 3. 성능 최적화를 위한 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_synergy_sales_category ON synergy_sales(Category);
CREATE INDEX IF NOT EXISTS idx_synergy_sales_customer ON synergy_sales(Customer);
CREATE INDEX IF NOT EXISTS idx_synergy_sales_channel ON synergy_sales(Channel);

-- 4. RPC 함수 생성 (선택사항)
CREATE OR REPLACE FUNCTION get_annual_sales_summary()
RETURNS TABLE (
  Category text,
  Customer text,
  Channel text,
  End_Customer text,
  SD_WAN text,
  "2022_Total" numeric,
  "2023_Total" numeric,
  "2024_Total" numeric,
  "2025_Total" numeric,
  "2026_Total" numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.Category,
    s.Customer,
    s.Channel,
    s."End Customer",
    s."SD-WAN",
    COALESCE(s."22-1", 0) + COALESCE(s."22-2", 0) + COALESCE(s."22-3", 0) + COALESCE(s."22-4", 0) + 
    COALESCE(s."22-5", 0) + COALESCE(s."22-6", 0) + COALESCE(s."22-7", 0) + COALESCE(s."22-8", 0) + 
    COALESCE(s."22-9", 0) + COALESCE(s."22-10", 0) + COALESCE(s."22-11", 0) + COALESCE(s."22-12", 0) as "2022_Total",
    
    COALESCE(s."23-1", 0) + COALESCE(s."23-2", 0) + COALESCE(s."23-3", 0) + COALESCE(s."23-4", 0) + 
    COALESCE(s."23-5", 0) + COALESCE(s."23-6", 0) + COALESCE(s."23-7", 0) + COALESCE(s."23-8", 0) + 
    COALESCE(s."23-9", 0) + COALESCE(s."23-10", 0) + COALESCE(s."23-11", 0) + COALESCE(s."23-12", 0) as "2023_Total",
    
    COALESCE(s."24-1", 0) + COALESCE(s."24-2", 0) + COALESCE(s."24-3", 0) + COALESCE(s."24-4", 0) + 
    COALESCE(s."24-5", 0) + COALESCE(s."24-6", 0) + COALESCE(s."24-7", 0) + COALESCE(s."24-8", 0) + 
    COALESCE(s."24-9", 0) + COALESCE(s."24-10", 0) + COALESCE(s."24-11", 0) + COALESCE(s."24-12", 0) as "2024_Total",
    
    COALESCE(s."25-1", 0) + COALESCE(s."25-2", 0) + COALESCE(s."25-3", 0) + COALESCE(s."25-4", 0) + 
    COALESCE(s."25-5", 0) + COALESCE(s."25-6", 0) + COALESCE(s."25-7", 0) + COALESCE(s."25-8", 0) + 
    COALESCE(s."25-9", 0) + COALESCE(s."25-10", 0) + COALESCE(s."25-11", 0) + COALESCE(s."25-12", 0) as "2025_Total",
    
    COALESCE(s."26-1", 0) + COALESCE(s."26-2", 0) + COALESCE(s."26-3", 0) + COALESCE(s."26-4", 0) + 
    COALESCE(s."26-5", 0) + COALESCE(s."26-6", 0) + COALESCE(s."26-7", 0) + COALESCE(s."26-8", 0) + 
    COALESCE(s."26-9", 0) + COALESCE(s."26-10", 0) + COALESCE(s."26-11", 0) + COALESCE(s."26-12", 0) as "2026_Total"
  FROM synergy_sales s
  ORDER BY s.Category, s.Customer;
END;
$$ LANGUAGE plpgsql;

-- 5. 뷰 권한 설정
GRANT SELECT ON synergy_sales_annual_view TO authenticated;
GRANT SELECT ON synergy_sales_category_annual_view TO authenticated;

-- =====================================================
-- 사용법:
-- 1. 뷰 사용: SELECT * FROM synergy_sales_annual_view;
-- 2. 카테고리별 합계: SELECT * FROM synergy_sales_category_annual_view;
-- 3. RPC 함수: SELECT * FROM get_annual_sales_summary();
-- ===================================================== 