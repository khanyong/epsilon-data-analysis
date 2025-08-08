-- =====================================================
-- KT Philippines 2022년 합산 검증 (수정된 버전)
-- =====================================================

-- 1. KT Philippines 2022년 월별 데이터 확인
SELECT 
  "Category",
  "Customer",
  "22-1", "22-2", "22-3", "22-4", "22-5", "22-6",
  "22-7", "22-8", "22-9", "22-10", "22-11", "22-12"
FROM synergy_sales 
WHERE "Customer" = 'KT Philippines'
ORDER BY "Category";

-- 2. 수동으로 2022년 합산 계산
SELECT 
  "Category",
  "Customer",
  -- 개별 월별 데이터
  "22-1", "22-2", "22-3", "22-4", "22-5", "22-6",
  "22-7", "22-8", "22-9", "22-10", "22-11", "22-12",
  -- 수동 합산
  COALESCE("22-1", 0) + COALESCE("22-2", 0) + COALESCE("22-3", 0) + 
  COALESCE("22-4", 0) + COALESCE("22-5", 0) + COALESCE("22-6", 0) + 
  COALESCE("22-7", 0) + COALESCE("22-8", 0) + COALESCE("22-9", 0) + 
  COALESCE("22-10", 0) + COALESCE("22-11", 0) + COALESCE("22-12", 0) as "2022_Manual_Sum"
FROM synergy_sales 
WHERE "Customer" = 'KT Philippines'
ORDER BY "Category";

-- 3. 뷰에서 계산된 2022년 합산과 비교
SELECT 
  s."Category",
  s."Customer",
  -- 수동 합산
  COALESCE(s."22-1", 0) + COALESCE(s."22-2", 0) + COALESCE(s."22-3", 0) + 
  COALESCE(s."22-4", 0) + COALESCE(s."22-5", 0) + COALESCE(s."22-6", 0) + 
  COALESCE(s."22-7", 0) + COALESCE(s."22-8", 0) + COALESCE(s."22-9", 0) + 
  COALESCE(s."22-10", 0) + COALESCE(s."22-11", 0) + COALESCE(s."22-12", 0) as "Manual_Sum",
  -- 뷰 합산
  v."2022_Total" as "View_Sum",
  -- 차이
  (COALESCE(s."22-1", 0) + COALESCE(s."22-2", 0) + COALESCE(s."22-3", 0) + 
   COALESCE(s."22-4", 0) + COALESCE(s."22-5", 0) + COALESCE(s."22-6", 0) + 
   COALESCE(s."22-7", 0) + COALESCE(s."22-8", 0) + COALESCE(s."22-9", 0) + 
   COALESCE(s."22-10", 0) + COALESCE(s."22-11", 0) + COALESCE(s."22-12", 0)) - 
   COALESCE(v."2022_Total", 0) as "Difference"
FROM synergy_sales s
LEFT JOIN synergy_sales_annual_view v ON s."Category" = v."Category" AND s."Customer" = v."Customer"
WHERE s."Customer" = 'KT Philippines'
ORDER BY s."Category";

-- 4. NULL 값 확인
SELECT 
  "Category",
  "Customer",
  COUNT(CASE WHEN "22-1" IS NULL THEN 1 END) as null_22_1,
  COUNT(CASE WHEN "22-2" IS NULL THEN 1 END) as null_22_2,
  COUNT(CASE WHEN "22-3" IS NULL THEN 1 END) as null_22_3,
  COUNT(CASE WHEN "22-4" IS NULL THEN 1 END) as null_22_4,
  COUNT(CASE WHEN "22-5" IS NULL THEN 1 END) as null_22_5,
  COUNT(CASE WHEN "22-6" IS NULL THEN 1 END) as null_22_6,
  COUNT(CASE WHEN "22-7" IS NULL THEN 1 END) as null_22_7,
  COUNT(CASE WHEN "22-8" IS NULL THEN 1 END) as null_22_8,
  COUNT(CASE WHEN "22-9" IS NULL THEN 1 END) as null_22_9,
  COUNT(CASE WHEN "22-10" IS NULL THEN 1 END) as null_22_10,
  COUNT(CASE WHEN "22-11" IS NULL THEN 1 END) as null_22_11,
  COUNT(CASE WHEN "22-12" IS NULL THEN 1 END) as null_22_12
FROM synergy_sales 
WHERE "Customer" = 'KT Philippines'
GROUP BY "Category", "Customer"; 