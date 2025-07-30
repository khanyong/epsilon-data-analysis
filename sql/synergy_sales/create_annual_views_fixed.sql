-- =====================================================
-- Synergy Sales 연도별 합산 뷰 생성 (수정된 버전)
-- =====================================================

-- 1. 연도별 합산 뷰 생성 (성능 최적화)
CREATE OR REPLACE VIEW synergy_sales_annual_view AS
SELECT
  "Category",
  "Customer",
  "Channel",
  "End Customer" as End_Customer,
  "SD-WAN" as SD_WAN,
  -- 2022년 합계 (22-1 ~ 22-12)
  COALESCE("22-1", 0) + COALESCE("22-2", 0) + COALESCE("22-3", 0) + 
  COALESCE("22-4", 0) + COALESCE("22-5", 0) + COALESCE("22-6", 0) + 
  COALESCE("22-7", 0) + COALESCE("22-8", 0) + COALESCE("22-9", 0) + 
  COALESCE("22-10", 0) + COALESCE("22-11", 0) + COALESCE("22-12", 0) as "2022_Total",
  
  -- 2023년 합계 (23-1 ~ 23-12)
  COALESCE("23-1", 0) + COALESCE("23-2", 0) + COALESCE("23-3", 0) + 
  COALESCE("23-4", 0) + COALESCE("23-5", 0) + COALESCE("23-6", 0) + 
  COALESCE("23-7", 0) + COALESCE("23-8", 0) + COALESCE("23-9", 0) + 
  COALESCE("23-10", 0) + COALESCE("23-11", 0) + COALESCE("23-12", 0) as "2023_Total",
  
  -- 2024년 합계 (24-1 ~ 24-12)
  COALESCE("24-1", 0) + COALESCE("24-2", 0) + COALESCE("24-3", 0) + 
  COALESCE("24-4", 0) + COALESCE("24-5", 0) + COALESCE("24-6", 0) + 
  COALESCE("24-7", 0) + COALESCE("24-8", 0) + COALESCE("24-9", 0) + 
  COALESCE("24-10", 0) + COALESCE("24-11", 0) + COALESCE("24-12", 0) as "2024_Total",
  
  -- 2025년 합계 (25-1 ~ 25-12)
  COALESCE("25-1", 0) + COALESCE("25-2", 0) + COALESCE("25-3", 0) + 
  COALESCE("25-4", 0) + COALESCE("25-5", 0) + COALESCE("25-6", 0) + 
  COALESCE("25-7", 0) + COALESCE("25-8", 0) + COALESCE("25-9", 0) + 
  COALESCE("25-10", 0) + COALESCE("25-11", 0) + COALESCE("25-12", 0) as "2025_Total",
  
  -- 2026년 합계 (26-1 ~ 26-12)
  COALESCE("26-1", 0) + COALESCE("26-2", 0) + COALESCE("26-3", 0) + 
  COALESCE("26-4", 0) + COALESCE("26-5", 0) + COALESCE("26-6", 0) + 
  COALESCE("26-7", 0) + COALESCE("26-8", 0) + COALESCE("26-9", 0) + 
  COALESCE("26-10", 0) + COALESCE("26-11", 0) + COALESCE("26-12", 0) as "2026_Total"
FROM synergy_sales;

-- 2. 카테고리별 연도별 합산 뷰 생성
CREATE OR REPLACE VIEW synergy_sales_category_annual_view AS
SELECT
  "Category",
  -- 2022년 합계
  SUM(COALESCE("22-1", 0) + COALESCE("22-2", 0) + COALESCE("22-3", 0) + 
      COALESCE("22-4", 0) + COALESCE("22-5", 0) + COALESCE("22-6", 0) + 
      COALESCE("22-7", 0) + COALESCE("22-8", 0) + COALESCE("22-9", 0) + 
      COALESCE("22-10", 0) + COALESCE("22-11", 0) + COALESCE("22-12", 0)) as "2022_Total",
  
  -- 2023년 합계
  SUM(COALESCE("23-1", 0) + COALESCE("23-2", 0) + COALESCE("23-3", 0) + 
      COALESCE("23-4", 0) + COALESCE("23-5", 0) + COALESCE("23-6", 0) + 
      COALESCE("23-7", 0) + COALESCE("23-8", 0) + COALESCE("23-9", 0) + 
      COALESCE("23-10", 0) + COALESCE("23-11", 0) + COALESCE("23-12", 0)) as "2023_Total",
  
  -- 2024년 합계
  SUM(COALESCE("24-1", 0) + COALESCE("24-2", 0) + COALESCE("24-3", 0) + 
      COALESCE("24-4", 0) + COALESCE("24-5", 0) + COALESCE("24-6", 0) + 
      COALESCE("24-7", 0) + COALESCE("24-8", 0) + COALESCE("24-9", 0) + 
      COALESCE("24-10", 0) + COALESCE("24-11", 0) + COALESCE("24-12", 0)) as "2024_Total",
  
  -- 2025년 합계
  SUM(COALESCE("25-1", 0) + COALESCE("25-2", 0) + COALESCE("25-3", 0) + 
      COALESCE("25-4", 0) + COALESCE("25-5", 0) + COALESCE("25-6", 0) + 
      COALESCE("25-7", 0) + COALESCE("25-8", 0) + COALESCE("25-9", 0) + 
      COALESCE("25-10", 0) + COALESCE("25-11", 0) + COALESCE("25-12", 0)) as "2025_Total",
  
  -- 2026년 합계
  SUM(COALESCE("26-1", 0) + COALESCE("26-2", 0) + COALESCE("26-3", 0) + 
      COALESCE("26-4", 0) + COALESCE("26-5", 0) + COALESCE("26-6", 0) + 
      COALESCE("26-7", 0) + COALESCE("26-8", 0) + COALESCE("26-9", 0) + 
      COALESCE("26-10", 0) + COALESCE("26-11", 0) + COALESCE("26-12", 0)) as "2026_Total"
FROM synergy_sales
GROUP BY "Category"
ORDER BY "Category";

-- 3. 성능 최적화를 위한 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_synergy_sales_category ON synergy_sales("Category");
CREATE INDEX IF NOT EXISTS idx_synergy_sales_customer ON synergy_sales("Customer");

-- 4. 테스트 쿼리: 뷰가 제대로 작동하는지 확인
SELECT 
  "Category",
  "2022_Total",
  "2023_Total", 
  "2024_Total",
  "2025_Total",
  "2026_Total"
FROM synergy_sales_annual_view
WHERE "Category" = 'Epsilon Off-net 소싱' AND "Customer" = 'Epsilon'
LIMIT 3;

-- 5. 카테고리별 합산 테스트
SELECT * FROM synergy_sales_category_annual_view
ORDER BY "2022_Total" DESC; 