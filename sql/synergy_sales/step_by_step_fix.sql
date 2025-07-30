-- =====================================================
-- Synergy Sales 데이터 타입 단계별 안전 변환
-- =====================================================

-- 1단계: 현재 데이터 타입 확인
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

-- 2단계: 2022년 컬럼들을 개별적으로 변환
-- 22-1
ALTER TABLE synergy_sales ALTER COLUMN "22-1" TYPE text;
UPDATE synergy_sales SET "22-1" = NULL WHERE "22-1" = '';
ALTER TABLE synergy_sales ALTER COLUMN "22-1" TYPE numeric USING "22-1"::numeric;

-- 22-2
ALTER TABLE synergy_sales ALTER COLUMN "22-2" TYPE text;
UPDATE synergy_sales SET "22-2" = NULL WHERE "22-2" = '';
ALTER TABLE synergy_sales ALTER COLUMN "22-2" TYPE numeric USING "22-2"::numeric;

-- 22-3
ALTER TABLE synergy_sales ALTER COLUMN "22-3" TYPE text;
UPDATE synergy_sales SET "22-3" = NULL WHERE "22-3" = '';
ALTER TABLE synergy_sales ALTER COLUMN "22-3" TYPE numeric USING "22-3"::numeric;

-- 22-4
ALTER TABLE synergy_sales ALTER COLUMN "22-4" TYPE text;
UPDATE synergy_sales SET "22-4" = NULL WHERE "22-4" = '';
ALTER TABLE synergy_sales ALTER COLUMN "22-4" TYPE numeric USING "22-4"::numeric;

-- 22-5
ALTER TABLE synergy_sales ALTER COLUMN "22-5" TYPE text;
UPDATE synergy_sales SET "22-5" = NULL WHERE "22-5" = '';
ALTER TABLE synergy_sales ALTER COLUMN "22-5" TYPE numeric USING "22-5"::numeric;

-- 22-6
ALTER TABLE synergy_sales ALTER COLUMN "22-6" TYPE text;
UPDATE synergy_sales SET "22-6" = NULL WHERE "22-6" = '';
ALTER TABLE synergy_sales ALTER COLUMN "22-6" TYPE numeric USING "22-6"::numeric;

-- 22-7 (문제가 되는 컬럼)
ALTER TABLE synergy_sales ALTER COLUMN "22-7" TYPE text;
UPDATE synergy_sales SET "22-7" = NULL WHERE "22-7" = '';
ALTER TABLE synergy_sales ALTER COLUMN "22-7" TYPE numeric USING "22-7"::numeric;

-- 22-8
ALTER TABLE synergy_sales ALTER COLUMN "22-8" TYPE text;
UPDATE synergy_sales SET "22-8" = NULL WHERE "22-8" = '';
ALTER TABLE synergy_sales ALTER COLUMN "22-8" TYPE numeric USING "22-8"::numeric;

-- 22-9
ALTER TABLE synergy_sales ALTER COLUMN "22-9" TYPE text;
UPDATE synergy_sales SET "22-9" = NULL WHERE "22-9" = '';
ALTER TABLE synergy_sales ALTER COLUMN "22-9" TYPE numeric USING "22-9"::numeric;

-- 22-10
ALTER TABLE synergy_sales ALTER COLUMN "22-10" TYPE text;
UPDATE synergy_sales SET "22-10" = NULL WHERE "22-10" = '';
ALTER TABLE synergy_sales ALTER COLUMN "22-10" TYPE numeric USING "22-10"::numeric;

-- 22-11
ALTER TABLE synergy_sales ALTER COLUMN "22-11" TYPE text;
UPDATE synergy_sales SET "22-11" = NULL WHERE "22-11" = '';
ALTER TABLE synergy_sales ALTER COLUMN "22-11" TYPE numeric USING "22-11"::numeric;

-- 22-12
ALTER TABLE synergy_sales ALTER COLUMN "22-12" TYPE text;
UPDATE synergy_sales SET "22-12" = NULL WHERE "22-12" = '';
ALTER TABLE synergy_sales ALTER COLUMN "22-12" TYPE numeric USING "22-12"::numeric;

-- 3단계: 변환 결과 확인
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'synergy_sales' 
  AND column_name LIKE '22-%'
ORDER BY column_name; 