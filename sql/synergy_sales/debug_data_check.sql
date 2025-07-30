-- =====================================================
-- Synergy Sales 데이터 상태 확인 및 디버깅
-- =====================================================

-- 1. 데이터 타입 확인
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'synergy_sales' 
  AND (column_name LIKE '%22-%' 
       OR column_name LIKE '%23-%'
       OR column_name LIKE '%24-%'
       OR column_name LIKE '%25-%'
       OR column_name LIKE '%26-%')
ORDER BY column_name;

-- 2. 샘플 데이터 확인 (첫 번째 행)
SELECT 
  Category,
  Customer,
  Channel,
  "End Customer",
  "SD-WAN",
  -- 2022년 데이터
  "22-1", "22-2", "22-3", "22-4", "22-5", "22-6",
  "22-7", "22-8", "22-9", "22-10", "22-11", "22-12",
  -- 2023년 데이터
  "23-1", "23-2", "23-3", "23-4", "23-5", "23-6",
  "23-7", "23-8", "23-9", "23-10", "23-11", "23-12"
FROM synergy_sales 
WHERE Category = 'Epsilon Off-net 소싱' AND Customer = 'Epsilon'
LIMIT 1;

-- 3. 수동 계산 테스트 (2022년)
SELECT 
  Category,
  Customer,
  -- 2022년 각 월 데이터
  "22-1", "22-2", "22-3", "22-4", "22-5", "22-6",
  "22-7", "22-8", "22-9", "22-10", "22-11", "22-12",
  -- 수동 계산된 2022년 합계
  (COALESCE(CAST("22-1" AS numeric), 0) + 
   COALESCE(CAST("22-2" AS numeric), 0) + 
   COALESCE(CAST("22-3" AS numeric), 0) + 
   COALESCE(CAST("22-4" AS numeric), 0) + 
   COALESCE(CAST("22-5" AS numeric), 0) + 
   COALESCE(CAST("22-6" AS numeric), 0) + 
   COALESCE(CAST("22-7" AS numeric), 0) + 
   COALESCE(CAST("22-8" AS numeric), 0) + 
   COALESCE(CAST("22-9" AS numeric), 0) + 
   COALESCE(CAST("22-10" AS numeric), 0) + 
   COALESCE(CAST("22-11" AS numeric), 0) + 
   COALESCE(CAST("22-12" AS numeric), 0)) as "2022_Manual_Sum"
FROM synergy_sales 
WHERE Category = 'Epsilon Off-net 소싱' AND Customer = 'Epsilon'
LIMIT 3;

-- 4. 빈 값 및 잘못된 데이터 확인
SELECT 
  Category,
  Customer,
  COUNT(*) as total_rows,
  COUNT(CASE WHEN "22-1" IS NULL OR "22-1" = '' THEN 1 END) as null_22_1,
  COUNT(CASE WHEN "22-2" IS NULL OR "22-2" = '' THEN 1 END) as null_22_2,
  COUNT(CASE WHEN "22-3" IS NULL OR "22-3" = '' THEN 1 END) as null_22_3,
  COUNT(CASE WHEN "22-4" IS NULL OR "22-4" = '' THEN 1 END) as null_22_4,
  COUNT(CASE WHEN "22-5" IS NULL OR "22-5" = '' THEN 1 END) as null_22_5,
  COUNT(CASE WHEN "22-6" IS NULL OR "22-6" = '' THEN 1 END) as null_22_6,
  COUNT(CASE WHEN "22-7" IS NULL OR "22-7" = '' THEN 1 END) as null_22_7,
  COUNT(CASE WHEN "22-8" IS NULL OR "22-8" = '' THEN 1 END) as null_22_8,
  COUNT(CASE WHEN "22-9" IS NULL OR "22-9" = '' THEN 1 END) as null_22_9,
  COUNT(CASE WHEN "22-10" IS NULL OR "22-10" = '' THEN 1 END) as null_22_10,
  COUNT(CASE WHEN "22-11" IS NULL OR "22-11" = '' THEN 1 END) as null_22_11,
  COUNT(CASE WHEN "22-12" IS NULL OR "22-12" = '' THEN 1 END) as null_22_12
FROM synergy_sales 
GROUP BY Category, Customer
ORDER BY Category, Customer; 