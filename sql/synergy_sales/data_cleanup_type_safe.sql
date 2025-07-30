-- =====================================================
-- Synergy Sales 데이터 정리 및 변환 (타입 안전 버전)
-- =====================================================

-- 1단계: 현재 컬럼 타입 확인
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

-- 2단계: text 타입 컬럼에서 숫자가 아닌 데이터 찾기
SELECT 
  column_name,
  value,
  COUNT(*) as count
FROM (
  SELECT '22-1' as column_name, "22-1"::text as value FROM synergy_sales WHERE "22-1"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '22-2' as column_name, "22-2"::text as value FROM synergy_sales WHERE "22-2"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '22-3' as column_name, "22-3"::text as value FROM synergy_sales WHERE "22-3"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '22-4' as column_name, "22-4"::text as value FROM synergy_sales WHERE "22-4"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '22-5' as column_name, "22-5"::text as value FROM synergy_sales WHERE "22-5"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '22-6' as column_name, "22-6"::text as value FROM synergy_sales WHERE "22-6"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '22-7' as column_name, "22-7"::text as value FROM synergy_sales WHERE "22-7"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '22-8' as column_name, "22-8"::text as value FROM synergy_sales WHERE "22-8"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '22-9' as column_name, "22-9"::text as value FROM synergy_sales WHERE "22-9"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '22-10' as column_name, "22-10"::text as value FROM synergy_sales WHERE "22-10"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '22-11' as column_name, "22-11"::text as value FROM synergy_sales WHERE "22-11"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '22-12' as column_name, "22-12"::text as value FROM synergy_sales WHERE "22-12"::text ~ '[^0-9.]'
  
  UNION ALL
  
  SELECT '23-1' as column_name, "23-1"::text as value FROM synergy_sales WHERE "23-1"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '23-2' as column_name, "23-2"::text as value FROM synergy_sales WHERE "23-2"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '23-3' as column_name, "23-3"::text as value FROM synergy_sales WHERE "23-3"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '23-4' as column_name, "23-4"::text as value FROM synergy_sales WHERE "23-4"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '23-5' as column_name, "23-5"::text as value FROM synergy_sales WHERE "23-5"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '23-6' as column_name, "23-6"::text as value FROM synergy_sales WHERE "23-6"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '23-7' as column_name, "23-7"::text as value FROM synergy_sales WHERE "23-7"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '23-8' as column_name, "23-8"::text as value FROM synergy_sales WHERE "23-8"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '23-9' as column_name, "23-9"::text as value FROM synergy_sales WHERE "23-9"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '23-10' as column_name, "23-10"::text as value FROM synergy_sales WHERE "23-10"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '23-11' as column_name, "23-11"::text as value FROM synergy_sales WHERE "23-11"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '23-12' as column_name, "23-12"::text as value FROM synergy_sales WHERE "23-12"::text ~ '[^0-9.]'
  
  UNION ALL
  
  SELECT '24-1' as column_name, "24-1"::text as value FROM synergy_sales WHERE "24-1"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '24-2' as column_name, "24-2"::text as value FROM synergy_sales WHERE "24-2"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '24-3' as column_name, "24-3"::text as value FROM synergy_sales WHERE "24-3"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '24-4' as column_name, "24-4"::text as value FROM synergy_sales WHERE "24-4"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '24-5' as column_name, "24-5"::text as value FROM synergy_sales WHERE "24-5"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '24-6' as column_name, "24-6"::text as value FROM synergy_sales WHERE "24-6"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '24-7' as column_name, "24-7"::text as value FROM synergy_sales WHERE "24-7"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '24-8' as column_name, "24-8"::text as value FROM synergy_sales WHERE "24-8"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '24-9' as column_name, "24-9"::text as value FROM synergy_sales WHERE "24-9"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '24-10' as column_name, "24-10"::text as value FROM synergy_sales WHERE "24-10"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '24-11' as column_name, "24-11"::text as value FROM synergy_sales WHERE "24-11"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '24-12' as column_name, "24-12"::text as value FROM synergy_sales WHERE "24-12"::text ~ '[^0-9.]'
  
  UNION ALL
  
  SELECT '25-1' as column_name, "25-1"::text as value FROM synergy_sales WHERE "25-1"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '25-2' as column_name, "25-2"::text as value FROM synergy_sales WHERE "25-2"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '25-3' as column_name, "25-3"::text as value FROM synergy_sales WHERE "25-3"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '25-4' as column_name, "25-4"::text as value FROM synergy_sales WHERE "25-4"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '25-5' as column_name, "25-5"::text as value FROM synergy_sales WHERE "25-5"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '25-6' as column_name, "25-6"::text as value FROM synergy_sales WHERE "25-6"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '25-7' as column_name, "25-7"::text as value FROM synergy_sales WHERE "25-7"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '25-8' as column_name, "25-8"::text as value FROM synergy_sales WHERE "25-8"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '25-9' as column_name, "25-9"::text as value FROM synergy_sales WHERE "25-9"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '25-10' as column_name, "25-10"::text as value FROM synergy_sales WHERE "25-10"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '25-11' as column_name, "25-11"::text as value FROM synergy_sales WHERE "25-11"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '25-12' as column_name, "25-12"::text as value FROM synergy_sales WHERE "25-12"::text ~ '[^0-9.]'
  
  UNION ALL
  
  SELECT '26-1' as column_name, "26-1"::text as value FROM synergy_sales WHERE "26-1"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '26-2' as column_name, "26-2"::text as value FROM synergy_sales WHERE "26-2"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '26-3' as column_name, "26-3"::text as value FROM synergy_sales WHERE "26-3"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '26-4' as column_name, "26-4"::text as value FROM synergy_sales WHERE "26-4"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '26-5' as column_name, "26-5"::text as value FROM synergy_sales WHERE "26-5"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '26-6' as column_name, "26-6"::text as value FROM synergy_sales WHERE "26-6"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '26-7' as column_name, "26-7"::text as value FROM synergy_sales WHERE "26-7"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '26-8' as column_name, "26-8"::text as value FROM synergy_sales WHERE "26-8"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '26-9' as column_name, "26-9"::text as value FROM synergy_sales WHERE "26-9"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '26-10' as column_name, "26-10"::text as value FROM synergy_sales WHERE "26-10"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '26-11' as column_name, "26-11"::text as value FROM synergy_sales WHERE "26-11"::text ~ '[^0-9.]'
  UNION ALL
  SELECT '26-12' as column_name, "26-12"::text as value FROM synergy_sales WHERE "26-12"::text ~ '[^0-9.]'
) as invalid_data
GROUP BY column_name, value
ORDER BY column_name, value;

-- 3단계: 모든 컬럼을 text로 변환 (안전한 변환을 위해)
ALTER TABLE synergy_sales 
  ALTER COLUMN "22-1" TYPE text,
  ALTER COLUMN "22-2" TYPE text,
  ALTER COLUMN "22-3" TYPE text,
  ALTER COLUMN "22-4" TYPE text,
  ALTER COLUMN "22-5" TYPE text,
  ALTER COLUMN "22-6" TYPE text,
  ALTER COLUMN "22-7" TYPE text,
  ALTER COLUMN "22-8" TYPE text,
  ALTER COLUMN "22-9" TYPE text,
  ALTER COLUMN "22-10" TYPE text,
  ALTER COLUMN "22-11" TYPE text,
  ALTER COLUMN "22-12" TYPE text,
  
  ALTER COLUMN "23-1" TYPE text,
  ALTER COLUMN "23-2" TYPE text,
  ALTER COLUMN "23-3" TYPE text,
  ALTER COLUMN "23-4" TYPE text,
  ALTER COLUMN "23-5" TYPE text,
  ALTER COLUMN "23-6" TYPE text,
  ALTER COLUMN "23-7" TYPE text,
  ALTER COLUMN "23-8" TYPE text,
  ALTER COLUMN "23-9" TYPE text,
  ALTER COLUMN "23-10" TYPE text,
  ALTER COLUMN "23-11" TYPE text,
  ALTER COLUMN "23-12" TYPE text,
  
  ALTER COLUMN "24-1" TYPE text,
  ALTER COLUMN "24-2" TYPE text,
  ALTER COLUMN "24-3" TYPE text,
  ALTER COLUMN "24-4" TYPE text,
  ALTER COLUMN "24-5" TYPE text,
  ALTER COLUMN "24-6" TYPE text,
  ALTER COLUMN "24-7" TYPE text,
  ALTER COLUMN "24-8" TYPE text,
  ALTER COLUMN "24-9" TYPE text,
  ALTER COLUMN "24-10" TYPE text,
  ALTER COLUMN "24-11" TYPE text,
  ALTER COLUMN "24-12" TYPE text,
  
  ALTER COLUMN "25-1" TYPE text,
  ALTER COLUMN "25-2" TYPE text,
  ALTER COLUMN "25-3" TYPE text,
  ALTER COLUMN "25-4" TYPE text,
  ALTER COLUMN "25-5" TYPE text,
  ALTER COLUMN "25-6" TYPE text,
  ALTER COLUMN "25-7" TYPE text,
  ALTER COLUMN "25-8" TYPE text,
  ALTER COLUMN "25-9" TYPE text,
  ALTER COLUMN "25-10" TYPE text,
  ALTER COLUMN "25-11" TYPE text,
  ALTER COLUMN "25-12" TYPE text,
  
  ALTER COLUMN "26-1" TYPE text,
  ALTER COLUMN "26-2" TYPE text,
  ALTER COLUMN "26-3" TYPE text,
  ALTER COLUMN "26-4" TYPE text,
  ALTER COLUMN "26-5" TYPE text,
  ALTER COLUMN "26-6" TYPE text,
  ALTER COLUMN "26-7" TYPE text,
  ALTER COLUMN "26-8" TYPE text,
  ALTER COLUMN "26-9" TYPE text,
  ALTER COLUMN "26-10" TYPE text,
  ALTER COLUMN "26-11" TYPE text,
  ALTER COLUMN "26-12" TYPE text;

-- 4단계: 숫자가 아닌 데이터를 NULL로 변경
UPDATE synergy_sales SET "22-1" = NULL WHERE "22-1" ~ '[^0-9.]';
UPDATE synergy_sales SET "22-2" = NULL WHERE "22-2" ~ '[^0-9.]';
UPDATE synergy_sales SET "22-3" = NULL WHERE "22-3" ~ '[^0-9.]';
UPDATE synergy_sales SET "22-4" = NULL WHERE "22-4" ~ '[^0-9.]';
UPDATE synergy_sales SET "22-5" = NULL WHERE "22-5" ~ '[^0-9.]';
UPDATE synergy_sales SET "22-6" = NULL WHERE "22-6" ~ '[^0-9.]';
UPDATE synergy_sales SET "22-7" = NULL WHERE "22-7" ~ '[^0-9.]';
UPDATE synergy_sales SET "22-8" = NULL WHERE "22-8" ~ '[^0-9.]';
UPDATE synergy_sales SET "22-9" = NULL WHERE "22-9" ~ '[^0-9.]';
UPDATE synergy_sales SET "22-10" = NULL WHERE "22-10" ~ '[^0-9.]';
UPDATE synergy_sales SET "22-11" = NULL WHERE "22-11" ~ '[^0-9.]';
UPDATE synergy_sales SET "22-12" = NULL WHERE "22-12" ~ '[^0-9.]';

UPDATE synergy_sales SET "23-1" = NULL WHERE "23-1" ~ '[^0-9.]';
UPDATE synergy_sales SET "23-2" = NULL WHERE "23-2" ~ '[^0-9.]';
UPDATE synergy_sales SET "23-3" = NULL WHERE "23-3" ~ '[^0-9.]';
UPDATE synergy_sales SET "23-4" = NULL WHERE "23-4" ~ '[^0-9.]';
UPDATE synergy_sales SET "23-5" = NULL WHERE "23-5" ~ '[^0-9.]';
UPDATE synergy_sales SET "23-6" = NULL WHERE "23-6" ~ '[^0-9.]';
UPDATE synergy_sales SET "23-7" = NULL WHERE "23-7" ~ '[^0-9.]';
UPDATE synergy_sales SET "23-8" = NULL WHERE "23-8" ~ '[^0-9.]';
UPDATE synergy_sales SET "23-9" = NULL WHERE "23-9" ~ '[^0-9.]';
UPDATE synergy_sales SET "23-10" = NULL WHERE "23-10" ~ '[^0-9.]';
UPDATE synergy_sales SET "23-11" = NULL WHERE "23-11" ~ '[^0-9.]';
UPDATE synergy_sales SET "23-12" = NULL WHERE "23-12" ~ '[^0-9.]';

UPDATE synergy_sales SET "24-1" = NULL WHERE "24-1" ~ '[^0-9.]';
UPDATE synergy_sales SET "24-2" = NULL WHERE "24-2" ~ '[^0-9.]';
UPDATE synergy_sales SET "24-3" = NULL WHERE "24-3" ~ '[^0-9.]';
UPDATE synergy_sales SET "24-4" = NULL WHERE "24-4" ~ '[^0-9.]';
UPDATE synergy_sales SET "24-5" = NULL WHERE "24-5" ~ '[^0-9.]';
UPDATE synergy_sales SET "24-6" = NULL WHERE "24-6" ~ '[^0-9.]';
UPDATE synergy_sales SET "24-7" = NULL WHERE "24-7" ~ '[^0-9.]';
UPDATE synergy_sales SET "24-8" = NULL WHERE "24-8" ~ '[^0-9.]';
UPDATE synergy_sales SET "24-9" = NULL WHERE "24-9" ~ '[^0-9.]';
UPDATE synergy_sales SET "24-10" = NULL WHERE "24-10" ~ '[^0-9.]';
UPDATE synergy_sales SET "24-11" = NULL WHERE "24-11" ~ '[^0-9.]';
UPDATE synergy_sales SET "24-12" = NULL WHERE "24-12" ~ '[^0-9.]';

UPDATE synergy_sales SET "25-1" = NULL WHERE "25-1" ~ '[^0-9.]';
UPDATE synergy_sales SET "25-2" = NULL WHERE "25-2" ~ '[^0-9.]';
UPDATE synergy_sales SET "25-3" = NULL WHERE "25-3" ~ '[^0-9.]';
UPDATE synergy_sales SET "25-4" = NULL WHERE "25-4" ~ '[^0-9.]';
UPDATE synergy_sales SET "25-5" = NULL WHERE "25-5" ~ '[^0-9.]';
UPDATE synergy_sales SET "25-6" = NULL WHERE "25-6" ~ '[^0-9.]';
UPDATE synergy_sales SET "25-7" = NULL WHERE "25-7" ~ '[^0-9.]';
UPDATE synergy_sales SET "25-8" = NULL WHERE "25-8" ~ '[^0-9.]';
UPDATE synergy_sales SET "25-9" = NULL WHERE "25-9" ~ '[^0-9.]';
UPDATE synergy_sales SET "25-10" = NULL WHERE "25-10" ~ '[^0-9.]';
UPDATE synergy_sales SET "25-11" = NULL WHERE "25-11" ~ '[^0-9.]';
UPDATE synergy_sales SET "25-12" = NULL WHERE "25-12" ~ '[^0-9.]';

UPDATE synergy_sales SET "26-1" = NULL WHERE "26-1" ~ '[^0-9.]';
UPDATE synergy_sales SET "26-2" = NULL WHERE "26-2" ~ '[^0-9.]';
UPDATE synergy_sales SET "26-3" = NULL WHERE "26-3" ~ '[^0-9.]';
UPDATE synergy_sales SET "26-4" = NULL WHERE "26-4" ~ '[^0-9.]';
UPDATE synergy_sales SET "26-5" = NULL WHERE "26-5" ~ '[^0-9.]';
UPDATE synergy_sales SET "26-6" = NULL WHERE "26-6" ~ '[^0-9.]';
UPDATE synergy_sales SET "26-7" = NULL WHERE "26-7" ~ '[^0-9.]';
UPDATE synergy_sales SET "26-8" = NULL WHERE "26-8" ~ '[^0-9.]';
UPDATE synergy_sales SET "26-9" = NULL WHERE "26-9" ~ '[^0-9.]';
UPDATE synergy_sales SET "26-10" = NULL WHERE "26-10" ~ '[^0-9.]';
UPDATE synergy_sales SET "26-11" = NULL WHERE "26-11" ~ '[^0-9.]';
UPDATE synergy_sales SET "26-12" = NULL WHERE "26-12" ~ '[^0-9.]';

-- 5단계: 빈 문자열을 NULL로 변경
UPDATE synergy_sales SET "22-1" = NULL WHERE "22-1" = '';
UPDATE synergy_sales SET "22-2" = NULL WHERE "22-2" = '';
UPDATE synergy_sales SET "22-3" = NULL WHERE "22-3" = '';
UPDATE synergy_sales SET "22-4" = NULL WHERE "22-4" = '';
UPDATE synergy_sales SET "22-5" = NULL WHERE "22-5" = '';
UPDATE synergy_sales SET "22-6" = NULL WHERE "22-6" = '';
UPDATE synergy_sales SET "22-7" = NULL WHERE "22-7" = '';
UPDATE synergy_sales SET "22-8" = NULL WHERE "22-8" = '';
UPDATE synergy_sales SET "22-9" = NULL WHERE "22-9" = '';
UPDATE synergy_sales SET "22-10" = NULL WHERE "22-10" = '';
UPDATE synergy_sales SET "22-11" = NULL WHERE "22-11" = '';
UPDATE synergy_sales SET "22-12" = NULL WHERE "22-12" = '';

UPDATE synergy_sales SET "23-1" = NULL WHERE "23-1" = '';
UPDATE synergy_sales SET "23-2" = NULL WHERE "23-2" = '';
UPDATE synergy_sales SET "23-3" = NULL WHERE "23-3" = '';
UPDATE synergy_sales SET "23-4" = NULL WHERE "23-4" = '';
UPDATE synergy_sales SET "23-5" = NULL WHERE "23-5" = '';
UPDATE synergy_sales SET "23-6" = NULL WHERE "23-6" = '';
UPDATE synergy_sales SET "23-7" = NULL WHERE "23-7" = '';
UPDATE synergy_sales SET "23-8" = NULL WHERE "23-8" = '';
UPDATE synergy_sales SET "23-9" = NULL WHERE "23-9" = '';
UPDATE synergy_sales SET "23-10" = NULL WHERE "23-10" = '';
UPDATE synergy_sales SET "23-11" = NULL WHERE "23-11" = '';
UPDATE synergy_sales SET "23-12" = NULL WHERE "23-12" = '';

UPDATE synergy_sales SET "24-1" = NULL WHERE "24-1" = '';
UPDATE synergy_sales SET "24-2" = NULL WHERE "24-2" = '';
UPDATE synergy_sales SET "24-3" = NULL WHERE "24-3" = '';
UPDATE synergy_sales SET "24-4" = NULL WHERE "24-4" = '';
UPDATE synergy_sales SET "24-5" = NULL WHERE "24-5" = '';
UPDATE synergy_sales SET "24-6" = NULL WHERE "24-6" = '';
UPDATE synergy_sales SET "24-7" = NULL WHERE "24-7" = '';
UPDATE synergy_sales SET "24-8" = NULL WHERE "24-8" = '';
UPDATE synergy_sales SET "24-9" = NULL WHERE "24-9" = '';
UPDATE synergy_sales SET "24-10" = NULL WHERE "24-10" = '';
UPDATE synergy_sales SET "24-11" = NULL WHERE "24-11" = '';
UPDATE synergy_sales SET "24-12" = NULL WHERE "24-12" = '';

UPDATE synergy_sales SET "25-1" = NULL WHERE "25-1" = '';
UPDATE synergy_sales SET "25-2" = NULL WHERE "25-2" = '';
UPDATE synergy_sales SET "25-3" = NULL WHERE "25-3" = '';
UPDATE synergy_sales SET "25-4" = NULL WHERE "25-4" = '';
UPDATE synergy_sales SET "25-5" = NULL WHERE "25-5" = '';
UPDATE synergy_sales SET "25-6" = NULL WHERE "25-6" = '';
UPDATE synergy_sales SET "25-7" = NULL WHERE "25-7" = '';
UPDATE synergy_sales SET "25-8" = NULL WHERE "25-8" = '';
UPDATE synergy_sales SET "25-9" = NULL WHERE "25-9" = '';
UPDATE synergy_sales SET "25-10" = NULL WHERE "25-10" = '';
UPDATE synergy_sales SET "25-11" = NULL WHERE "25-11" = '';
UPDATE synergy_sales SET "25-12" = NULL WHERE "25-12" = '';

UPDATE synergy_sales SET "26-1" = NULL WHERE "26-1" = '';
UPDATE synergy_sales SET "26-2" = NULL WHERE "26-2" = '';
UPDATE synergy_sales SET "26-3" = NULL WHERE "26-3" = '';
UPDATE synergy_sales SET "26-4" = NULL WHERE "26-4" = '';
UPDATE synergy_sales SET "26-5" = NULL WHERE "26-5" = '';
UPDATE synergy_sales SET "26-6" = NULL WHERE "26-6" = '';
UPDATE synergy_sales SET "26-7" = NULL WHERE "26-7" = '';
UPDATE synergy_sales SET "26-8" = NULL WHERE "26-8" = '';
UPDATE synergy_sales SET "26-9" = NULL WHERE "26-9" = '';
UPDATE synergy_sales SET "26-10" = NULL WHERE "26-10" = '';
UPDATE synergy_sales SET "26-11" = NULL WHERE "26-11" = '';
UPDATE synergy_sales SET "26-12" = NULL WHERE "26-12" = '';

-- 6단계: 이제 안전하게 numeric으로 변환
ALTER TABLE synergy_sales 
  ALTER COLUMN "22-1" TYPE numeric USING "22-1"::numeric,
  ALTER COLUMN "22-2" TYPE numeric USING "22-2"::numeric,
  ALTER COLUMN "22-3" TYPE numeric USING "22-3"::numeric,
  ALTER COLUMN "22-4" TYPE numeric USING "22-4"::numeric,
  ALTER COLUMN "22-5" TYPE numeric USING "22-5"::numeric,
  ALTER COLUMN "22-6" TYPE numeric USING "22-6"::numeric,
  ALTER COLUMN "22-7" TYPE numeric USING "22-7"::numeric,
  ALTER COLUMN "22-8" TYPE numeric USING "22-8"::numeric,
  ALTER COLUMN "22-9" TYPE numeric USING "22-9"::numeric,
  ALTER COLUMN "22-10" TYPE numeric USING "22-10"::numeric,
  ALTER COLUMN "22-11" TYPE numeric USING "22-11"::numeric,
  ALTER COLUMN "22-12" TYPE numeric USING "22-12"::numeric,
  
  ALTER COLUMN "23-1" TYPE numeric USING "23-1"::numeric,
  ALTER COLUMN "23-2" TYPE numeric USING "23-2"::numeric,
  ALTER COLUMN "23-3" TYPE numeric USING "23-3"::numeric,
  ALTER COLUMN "23-4" TYPE numeric USING "23-4"::numeric,
  ALTER COLUMN "23-5" TYPE numeric USING "23-5"::numeric,
  ALTER COLUMN "23-6" TYPE numeric USING "23-6"::numeric,
  ALTER COLUMN "23-7" TYPE numeric USING "23-7"::numeric,
  ALTER COLUMN "23-8" TYPE numeric USING "23-8"::numeric,
  ALTER COLUMN "23-9" TYPE numeric USING "23-9"::numeric,
  ALTER COLUMN "23-10" TYPE numeric USING "23-10"::numeric,
  ALTER COLUMN "23-11" TYPE numeric USING "23-11"::numeric,
  ALTER COLUMN "23-12" TYPE numeric USING "23-12"::numeric,
  
  ALTER COLUMN "24-1" TYPE numeric USING "24-1"::numeric,
  ALTER COLUMN "24-2" TYPE numeric USING "24-2"::numeric,
  ALTER COLUMN "24-3" TYPE numeric USING "24-3"::numeric,
  ALTER COLUMN "24-4" TYPE numeric USING "24-4"::numeric,
  ALTER COLUMN "24-5" TYPE numeric USING "24-5"::numeric,
  ALTER COLUMN "24-6" TYPE numeric USING "24-6"::numeric,
  ALTER COLUMN "24-7" TYPE numeric USING "24-7"::numeric,
  ALTER COLUMN "24-8" TYPE numeric USING "24-8"::numeric,
  ALTER COLUMN "24-9" TYPE numeric USING "24-9"::numeric,
  ALTER COLUMN "24-10" TYPE numeric USING "24-10"::numeric,
  ALTER COLUMN "24-11" TYPE numeric USING "24-11"::numeric,
  ALTER COLUMN "24-12" TYPE numeric USING "24-12"::numeric,
  
  ALTER COLUMN "25-1" TYPE numeric USING "25-1"::numeric,
  ALTER COLUMN "25-2" TYPE numeric USING "25-2"::numeric,
  ALTER COLUMN "25-3" TYPE numeric USING "25-3"::numeric,
  ALTER COLUMN "25-4" TYPE numeric USING "25-4"::numeric,
  ALTER COLUMN "25-5" TYPE numeric USING "25-5"::numeric,
  ALTER COLUMN "25-6" TYPE numeric USING "25-6"::numeric,
  ALTER COLUMN "25-7" TYPE numeric USING "25-7"::numeric,
  ALTER COLUMN "25-8" TYPE numeric USING "25-8"::numeric,
  ALTER COLUMN "25-9" TYPE numeric USING "25-9"::numeric,
  ALTER COLUMN "25-10" TYPE numeric USING "25-10"::numeric,
  ALTER COLUMN "25-11" TYPE numeric USING "25-11"::numeric,
  ALTER COLUMN "25-12" TYPE numeric USING "25-12"::numeric,
  
  ALTER COLUMN "26-1" TYPE numeric USING "26-1"::numeric,
  ALTER COLUMN "26-2" TYPE numeric USING "26-2"::numeric,
  ALTER COLUMN "26-3" TYPE numeric USING "26-3"::numeric,
  ALTER COLUMN "26-4" TYPE numeric USING "26-4"::numeric,
  ALTER COLUMN "26-5" TYPE numeric USING "26-5"::numeric,
  ALTER COLUMN "26-6" TYPE numeric USING "26-6"::numeric,
  ALTER COLUMN "26-7" TYPE numeric USING "26-7"::numeric,
  ALTER COLUMN "26-8" TYPE numeric USING "26-8"::numeric,
  ALTER COLUMN "26-9" TYPE numeric USING "26-9"::numeric,
  ALTER COLUMN "26-10" TYPE numeric USING "26-10"::numeric,
  ALTER COLUMN "26-11" TYPE numeric USING "26-11"::numeric,
  ALTER COLUMN "26-12" TYPE numeric USING "26-12"::numeric;

-- 7단계: 최종 확인
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