-- =====================================================
-- Synergy Sales 데이터 타입 통일 및 정리
-- =====================================================

-- 1. 모든 월별 컬럼을 numeric으로 변경
ALTER TABLE synergy_sales 
  ALTER COLUMN "22-1" TYPE numeric USING NULLIF("22-1", '')::numeric,
  ALTER COLUMN "22-2" TYPE numeric USING NULLIF("22-2", '')::numeric,
  ALTER COLUMN "22-3" TYPE numeric USING NULLIF("22-3", '')::numeric,
  ALTER COLUMN "22-4" TYPE numeric USING NULLIF("22-4", '')::numeric,
  ALTER COLUMN "22-5" TYPE numeric USING NULLIF("22-5", '')::numeric,
  ALTER COLUMN "22-6" TYPE numeric USING NULLIF("22-6", '')::numeric,
  ALTER COLUMN "22-7" TYPE numeric USING NULLIF("22-7", '')::numeric,
  ALTER COLUMN "22-8" TYPE numeric USING NULLIF("22-8", '')::numeric,
  ALTER COLUMN "22-9" TYPE numeric USING NULLIF("22-9", '')::numeric,
  ALTER COLUMN "22-10" TYPE numeric USING NULLIF("22-10", '')::numeric,
  ALTER COLUMN "22-11" TYPE numeric USING NULLIF("22-11", '')::numeric,
  ALTER COLUMN "22-12" TYPE numeric USING NULLIF("22-12", '')::numeric,
  
  ALTER COLUMN "23-1" TYPE numeric USING NULLIF("23-1", '')::numeric,
  ALTER COLUMN "23-2" TYPE numeric USING NULLIF("23-2", '')::numeric,
  ALTER COLUMN "23-3" TYPE numeric USING NULLIF("23-3", '')::numeric,
  ALTER COLUMN "23-4" TYPE numeric USING NULLIF("23-4", '')::numeric,
  ALTER COLUMN "23-5" TYPE numeric USING NULLIF("23-5", '')::numeric,
  ALTER COLUMN "23-6" TYPE numeric USING NULLIF("23-6", '')::numeric,
  ALTER COLUMN "23-7" TYPE numeric USING NULLIF("23-7", '')::numeric,
  ALTER COLUMN "23-8" TYPE numeric USING NULLIF("23-8", '')::numeric,
  ALTER COLUMN "23-9" TYPE numeric USING NULLIF("23-9", '')::numeric,
  ALTER COLUMN "23-10" TYPE numeric USING NULLIF("23-10", '')::numeric,
  ALTER COLUMN "23-11" TYPE numeric USING NULLIF("23-11", '')::numeric,
  ALTER COLUMN "23-12" TYPE numeric USING NULLIF("23-12", '')::numeric,
  
  ALTER COLUMN "24-1" TYPE numeric USING NULLIF("24-1", '')::numeric,
  ALTER COLUMN "24-2" TYPE numeric USING NULLIF("24-2", '')::numeric,
  ALTER COLUMN "24-3" TYPE numeric USING NULLIF("24-3", '')::numeric,
  ALTER COLUMN "24-4" TYPE numeric USING NULLIF("24-4", '')::numeric,
  ALTER COLUMN "24-5" TYPE numeric USING NULLIF("24-5", '')::numeric,
  ALTER COLUMN "24-6" TYPE numeric USING NULLIF("24-6", '')::numeric,
  ALTER COLUMN "24-7" TYPE numeric USING NULLIF("24-7", '')::numeric,
  ALTER COLUMN "24-8" TYPE numeric USING NULLIF("24-8", '')::numeric,
  ALTER COLUMN "24-9" TYPE numeric USING NULLIF("24-9", '')::numeric,
  ALTER COLUMN "24-10" TYPE numeric USING NULLIF("24-10", '')::numeric,
  ALTER COLUMN "24-11" TYPE numeric USING NULLIF("24-11", '')::numeric,
  ALTER COLUMN "24-12" TYPE numeric USING NULLIF("24-12", '')::numeric,
  
  ALTER COLUMN "25-1" TYPE numeric USING NULLIF("25-1", '')::numeric,
  ALTER COLUMN "25-2" TYPE numeric USING NULLIF("25-2", '')::numeric,
  ALTER COLUMN "25-3" TYPE numeric USING NULLIF("25-3", '')::numeric,
  ALTER COLUMN "25-4" TYPE numeric USING NULLIF("25-4", '')::numeric,
  ALTER COLUMN "25-5" TYPE numeric USING NULLIF("25-5", '')::numeric,
  ALTER COLUMN "25-6" TYPE numeric USING NULLIF("25-6", '')::numeric,
  ALTER COLUMN "25-7" TYPE numeric USING NULLIF("25-7", '')::numeric,
  ALTER COLUMN "25-8" TYPE numeric USING NULLIF("25-8", '')::numeric,
  ALTER COLUMN "25-9" TYPE numeric USING NULLIF("25-9", '')::numeric,
  ALTER COLUMN "25-10" TYPE numeric USING NULLIF("25-10", '')::numeric,
  ALTER COLUMN "25-11" TYPE numeric USING NULLIF("25-11", '')::numeric,
  ALTER COLUMN "25-12" TYPE numeric USING NULLIF("25-12", '')::numeric,
  
  ALTER COLUMN "26-1" TYPE numeric USING NULLIF("26-1", '')::numeric,
  ALTER COLUMN "26-2" TYPE numeric USING NULLIF("26-2", '')::numeric,
  ALTER COLUMN "26-3" TYPE numeric USING NULLIF("26-3", '')::numeric,
  ALTER COLUMN "26-4" TYPE numeric USING NULLIF("26-4", '')::numeric,
  ALTER COLUMN "26-5" TYPE numeric USING NULLIF("26-5", '')::numeric,
  ALTER COLUMN "26-6" TYPE numeric USING NULLIF("26-6", '')::numeric,
  ALTER COLUMN "26-7" TYPE numeric USING NULLIF("26-7", '')::numeric,
  ALTER COLUMN "26-8" TYPE numeric USING NULLIF("26-8", '')::numeric,
  ALTER COLUMN "26-9" TYPE numeric USING NULLIF("26-9", '')::numeric,
  ALTER COLUMN "26-10" TYPE numeric USING NULLIF("26-10", '')::numeric,
  ALTER COLUMN "26-11" TYPE numeric USING NULLIF("26-11", '')::numeric,
  ALTER COLUMN "26-12" TYPE numeric USING NULLIF("26-12", '')::numeric;

-- 2. 데이터 타입 확인 쿼리
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'synergy_sales' 
  AND column_name LIKE '%22-%' 
   OR column_name LIKE '%23-%'
   OR column_name LIKE '%24-%'
   OR column_name LIKE '%25-%'
   OR column_name LIKE '%26-%'
ORDER BY column_name;

-- 3. 샘플 데이터 확인
SELECT 
  "22-1", "22-7", "22-10", "22-11", "22-12",
  "23-1", "23-12",
  "24-1", "24-12",
  "25-1", "25-12",
  "26-1", "26-12"
FROM synergy_sales 
LIMIT 5; 