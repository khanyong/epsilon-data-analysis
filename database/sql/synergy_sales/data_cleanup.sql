-- =====================================================
-- Synergy Sales 데이터 정리 및 변환
-- =====================================================

-- 1단계: 숫자가 아닌 데이터 찾기
SELECT 
  column_name,
  value,
  COUNT(*) as count
FROM (
  SELECT '22-1' as column_name, "22-1" as value FROM synergy_sales WHERE "22-1" ~ '[^0-9.]'
  UNION ALL
  SELECT '22-2' as column_name, "22-2" as value FROM synergy_sales WHERE "22-2" ~ '[^0-9.]'
  UNION ALL
  SELECT '22-3' as column_name, "22-3" as value FROM synergy_sales WHERE "22-3" ~ '[^0-9.]'
  UNION ALL
  SELECT '22-4' as column_name, "22-4" as value FROM synergy_sales WHERE "22-4" ~ '[^0-9.]'
  UNION ALL
  SELECT '22-5' as column_name, "22-5" as value FROM synergy_sales WHERE "22-5" ~ '[^0-9.]'
  UNION ALL
  SELECT '22-6' as column_name, "22-6" as value FROM synergy_sales WHERE "22-6" ~ '[^0-9.]'
  UNION ALL
  SELECT '22-7' as column_name, "22-7" as value FROM synergy_sales WHERE "22-7" ~ '[^0-9.]'
  UNION ALL
  SELECT '22-8' as column_name, "22-8" as value FROM synergy_sales WHERE "22-8" ~ '[^0-9.]'
  UNION ALL
  SELECT '22-9' as column_name, "22-9" as value FROM synergy_sales WHERE "22-9" ~ '[^0-9.]'
  UNION ALL
  SELECT '22-10' as column_name, "22-10" as value FROM synergy_sales WHERE "22-10" ~ '[^0-9.]'
  UNION ALL
  SELECT '22-11' as column_name, "22-11" as value FROM synergy_sales WHERE "22-11" ~ '[^0-9.]'
  UNION ALL
  SELECT '22-12' as column_name, "22-12" as value FROM synergy_sales WHERE "22-12" ~ '[^0-9.]'
  
  UNION ALL
  
  SELECT '23-1' as column_name, "23-1" as value FROM synergy_sales WHERE "23-1" ~ '[^0-9.]'
  UNION ALL
  SELECT '23-2' as column_name, "23-2" as value FROM synergy_sales WHERE "23-2" ~ '[^0-9.]'
  UNION ALL
  SELECT '23-3' as column_name, "23-3" as value FROM synergy_sales WHERE "23-3" ~ '[^0-9.]'
  UNION ALL
  SELECT '23-4' as column_name, "23-4" as value FROM synergy_sales WHERE "23-4" ~ '[^0-9.]'
  UNION ALL
  SELECT '23-5' as column_name, "23-5" as value FROM synergy_sales WHERE "23-5" ~ '[^0-9.]'
  UNION ALL
  SELECT '23-6' as column_name, "23-6" as value FROM synergy_sales WHERE "23-6" ~ '[^0-9.]'
  UNION ALL
  SELECT '23-7' as column_name, "23-7" as value FROM synergy_sales WHERE "23-7" ~ '[^0-9.]'
  UNION ALL
  SELECT '23-8' as column_name, "23-8" as value FROM synergy_sales WHERE "23-8" ~ '[^0-9.]'
  UNION ALL
  SELECT '23-9' as column_name, "23-9" as value FROM synergy_sales WHERE "23-9" ~ '[^0-9.]'
  UNION ALL
  SELECT '23-10' as column_name, "23-10" as value FROM synergy_sales WHERE "23-10" ~ '[^0-9.]'
  UNION ALL
  SELECT '23-11' as column_name, "23-11" as value FROM synergy_sales WHERE "23-11" ~ '[^0-9.]'
  UNION ALL
  SELECT '23-12' as column_name, "23-12" as value FROM synergy_sales WHERE "23-12" ~ '[^0-9.]'
  
  UNION ALL
  
  SELECT '24-1' as column_name, "24-1" as value FROM synergy_sales WHERE "24-1" ~ '[^0-9.]'
  UNION ALL
  SELECT '24-2' as column_name, "24-2" as value FROM synergy_sales WHERE "24-2" ~ '[^0-9.]'
  UNION ALL
  SELECT '24-3' as column_name, "24-3" as value FROM synergy_sales WHERE "24-3" ~ '[^0-9.]'
  UNION ALL
  SELECT '24-4' as column_name, "24-4" as value FROM synergy_sales WHERE "24-4" ~ '[^0-9.]'
  UNION ALL
  SELECT '24-5' as column_name, "24-5" as value FROM synergy_sales WHERE "24-5" ~ '[^0-9.]'
  UNION ALL
  SELECT '24-6' as column_name, "24-6" as value FROM synergy_sales WHERE "24-6" ~ '[^0-9.]'
  UNION ALL
  SELECT '24-7' as column_name, "24-7" as value FROM synergy_sales WHERE "24-7" ~ '[^0-9.]'
  UNION ALL
  SELECT '24-8' as column_name, "24-8" as value FROM synergy_sales WHERE "24-8" ~ '[^0-9.]'
  UNION ALL
  SELECT '24-9' as column_name, "24-9" as value FROM synergy_sales WHERE "24-9" ~ '[^0-9.]'
  UNION ALL
  SELECT '24-10' as column_name, "24-10" as value FROM synergy_sales WHERE "24-10" ~ '[^0-9.]'
  UNION ALL
  SELECT '24-11' as column_name, "24-11" as value FROM synergy_sales WHERE "24-11" ~ '[^0-9.]'
  UNION ALL
  SELECT '24-12' as column_name, "24-12" as value FROM synergy_sales WHERE "24-12" ~ '[^0-9.]'
  
  UNION ALL
  
  SELECT '25-1' as column_name, "25-1" as value FROM synergy_sales WHERE "25-1" ~ '[^0-9.]'
  UNION ALL
  SELECT '25-2' as column_name, "25-2" as value FROM synergy_sales WHERE "25-2" ~ '[^0-9.]'
  UNION ALL
  SELECT '25-3' as column_name, "25-3" as value FROM synergy_sales WHERE "25-3" ~ '[^0-9.]'
  UNION ALL
  SELECT '25-4' as column_name, "25-4" as value FROM synergy_sales WHERE "25-4" ~ '[^0-9.]'
  UNION ALL
  SELECT '25-5' as column_name, "25-5" as value FROM synergy_sales WHERE "25-5" ~ '[^0-9.]'
  UNION ALL
  SELECT '25-6' as column_name, "25-6" as value FROM synergy_sales WHERE "25-6" ~ '[^0-9.]'
  UNION ALL
  SELECT '25-7' as column_name, "25-7" as value FROM synergy_sales WHERE "25-7" ~ '[^0-9.]'
  UNION ALL
  SELECT '25-8' as column_name, "25-8" as value FROM synergy_sales WHERE "25-8" ~ '[^0-9.]'
  UNION ALL
  SELECT '25-9' as column_name, "25-9" as value FROM synergy_sales WHERE "25-9" ~ '[^0-9.]'
  UNION ALL
  SELECT '25-10' as column_name, "25-10" as value FROM synergy_sales WHERE "25-10" ~ '[^0-9.]'
  UNION ALL
  SELECT '25-11' as column_name, "25-11" as value FROM synergy_sales WHERE "25-11" ~ '[^0-9.]'
  UNION ALL
  SELECT '25-12' as column_name, "25-12" as value FROM synergy_sales WHERE "25-12" ~ '[^0-9.]'
  
  UNION ALL
  
  SELECT '26-1' as column_name, "26-1" as value FROM synergy_sales WHERE "26-1" ~ '[^0-9.]'
  UNION ALL
  SELECT '26-2' as column_name, "26-2" as value FROM synergy_sales WHERE "26-2" ~ '[^0-9.]'
  UNION ALL
  SELECT '26-3' as column_name, "26-3" as value FROM synergy_sales WHERE "26-3" ~ '[^0-9.]'
  UNION ALL
  SELECT '26-4' as column_name, "26-4" as value FROM synergy_sales WHERE "26-4" ~ '[^0-9.]'
  UNION ALL
  SELECT '26-5' as column_name, "26-5" as value FROM synergy_sales WHERE "26-5" ~ '[^0-9.]'
  UNION ALL
  SELECT '26-6' as column_name, "26-6" as value FROM synergy_sales WHERE "26-6" ~ '[^0-9.]'
  UNION ALL
  SELECT '26-7' as column_name, "26-7" as value FROM synergy_sales WHERE "26-7" ~ '[^0-9.]'
  UNION ALL
  SELECT '26-8' as column_name, "26-8" as value FROM synergy_sales WHERE "26-8" ~ '[^0-9.]'
  UNION ALL
  SELECT '26-9' as column_name, "26-9" as value FROM synergy_sales WHERE "26-9" ~ '[^0-9.]'
  UNION ALL
  SELECT '26-10' as column_name, "26-10" as value FROM synergy_sales WHERE "26-10" ~ '[^0-9.]'
  UNION ALL
  SELECT '26-11' as column_name, "26-11" as value FROM synergy_sales WHERE "26-11" ~ '[^0-9.]'
  UNION ALL
  SELECT '26-12' as column_name, "26-12" as value FROM synergy_sales WHERE "26-12" ~ '[^0-9.]'
) as invalid_data
GROUP BY column_name, value
ORDER BY column_name, value;

-- 2단계: 숫자가 아닌 데이터를 NULL로 변경
UPDATE synergy_sales SET
  "22-1" = NULL WHERE "22-1" ~ '[^0-9.]',
  "22-2" = NULL WHERE "22-2" ~ '[^0-9.]',
  "22-3" = NULL WHERE "22-3" ~ '[^0-9.]',
  "22-4" = NULL WHERE "22-4" ~ '[^0-9.]',
  "22-5" = NULL WHERE "22-5" ~ '[^0-9.]',
  "22-6" = NULL WHERE "22-6" ~ '[^0-9.]',
  "22-7" = NULL WHERE "22-7" ~ '[^0-9.]',
  "22-8" = NULL WHERE "22-8" ~ '[^0-9.]',
  "22-9" = NULL WHERE "22-9" ~ '[^0-9.]',
  "22-10" = NULL WHERE "22-10" ~ '[^0-9.]',
  "22-11" = NULL WHERE "22-11" ~ '[^0-9.]',
  "22-12" = NULL WHERE "22-12" ~ '[^0-9.]',
  
  "23-1" = NULL WHERE "23-1" ~ '[^0-9.]',
  "23-2" = NULL WHERE "23-2" ~ '[^0-9.]',
  "23-3" = NULL WHERE "23-3" ~ '[^0-9.]',
  "23-4" = NULL WHERE "23-4" ~ '[^0-9.]',
  "23-5" = NULL WHERE "23-5" ~ '[^0-9.]',
  "23-6" = NULL WHERE "23-6" ~ '[^0-9.]',
  "23-7" = NULL WHERE "23-7" ~ '[^0-9.]',
  "23-8" = NULL WHERE "23-8" ~ '[^0-9.]',
  "23-9" = NULL WHERE "23-9" ~ '[^0-9.]',
  "23-10" = NULL WHERE "23-10" ~ '[^0-9.]',
  "23-11" = NULL WHERE "23-11" ~ '[^0-9.]',
  "23-12" = NULL WHERE "23-12" ~ '[^0-9.]',
  
  "24-1" = NULL WHERE "24-1" ~ '[^0-9.]',
  "24-2" = NULL WHERE "24-2" ~ '[^0-9.]',
  "24-3" = NULL WHERE "24-3" ~ '[^0-9.]',
  "24-4" = NULL WHERE "24-4" ~ '[^0-9.]',
  "24-5" = NULL WHERE "24-5" ~ '[^0-9.]',
  "24-6" = NULL WHERE "24-6" ~ '[^0-9.]',
  "24-7" = NULL WHERE "24-7" ~ '[^0-9.]',
  "24-8" = NULL WHERE "24-8" ~ '[^0-9.]',
  "24-9" = NULL WHERE "24-9" ~ '[^0-9.]',
  "24-10" = NULL WHERE "24-10" ~ '[^0-9.]',
  "24-11" = NULL WHERE "24-11" ~ '[^0-9.]',
  "24-12" = NULL WHERE "24-12" ~ '[^0-9.]',
  
  "25-1" = NULL WHERE "25-1" ~ '[^0-9.]',
  "25-2" = NULL WHERE "25-2" ~ '[^0-9.]',
  "25-3" = NULL WHERE "25-3" ~ '[^0-9.]',
  "25-4" = NULL WHERE "25-4" ~ '[^0-9.]',
  "25-5" = NULL WHERE "25-5" ~ '[^0-9.]',
  "25-6" = NULL WHERE "25-6" ~ '[^0-9.]',
  "25-7" = NULL WHERE "25-7" ~ '[^0-9.]',
  "25-8" = NULL WHERE "25-8" ~ '[^0-9.]',
  "25-9" = NULL WHERE "25-9" ~ '[^0-9.]',
  "25-10" = NULL WHERE "25-10" ~ '[^0-9.]',
  "25-11" = NULL WHERE "25-11" ~ '[^0-9.]',
  "25-12" = NULL WHERE "25-12" ~ '[^0-9.]',
  
  "26-1" = NULL WHERE "26-1" ~ '[^0-9.]',
  "26-2" = NULL WHERE "26-2" ~ '[^0-9.]',
  "26-3" = NULL WHERE "26-3" ~ '[^0-9.]',
  "26-4" = NULL WHERE "26-4" ~ '[^0-9.]',
  "26-5" = NULL WHERE "26-5" ~ '[^0-9.]',
  "26-6" = NULL WHERE "26-6" ~ '[^0-9.]',
  "26-7" = NULL WHERE "26-7" ~ '[^0-9.]',
  "26-8" = NULL WHERE "26-8" ~ '[^0-9.]',
  "26-9" = NULL WHERE "26-9" ~ '[^0-9.]',
  "26-10" = NULL WHERE "26-10" ~ '[^0-9.]',
  "26-11" = NULL WHERE "26-11" ~ '[^0-9.]',
  "26-12" = NULL WHERE "26-12" ~ '[^0-9.]';

-- 3단계: 빈 문자열도 NULL로 변경
UPDATE synergy_sales SET
  "22-1" = NULL WHERE "22-1" = '',
  "22-2" = NULL WHERE "22-2" = '',
  "22-3" = NULL WHERE "22-3" = '',
  "22-4" = NULL WHERE "22-4" = '',
  "22-5" = NULL WHERE "22-5" = '',
  "22-6" = NULL WHERE "22-6" = '',
  "22-7" = NULL WHERE "22-7" = '',
  "22-8" = NULL WHERE "22-8" = '',
  "22-9" = NULL WHERE "22-9" = '',
  "22-10" = NULL WHERE "22-10" = '',
  "22-11" = NULL WHERE "22-11" = '',
  "22-12" = NULL WHERE "22-12" = '',
  
  "23-1" = NULL WHERE "23-1" = '',
  "23-2" = NULL WHERE "23-2" = '',
  "23-3" = NULL WHERE "23-3" = '',
  "23-4" = NULL WHERE "23-4" = '',
  "23-5" = NULL WHERE "23-5" = '',
  "23-6" = NULL WHERE "23-6" = '',
  "23-7" = NULL WHERE "23-7" = '',
  "23-8" = NULL WHERE "23-8" = '',
  "23-9" = NULL WHERE "23-9" = '',
  "23-10" = NULL WHERE "23-10" = '',
  "23-11" = NULL WHERE "23-11" = '',
  "23-12" = NULL WHERE "23-12" = '',
  
  "24-1" = NULL WHERE "24-1" = '',
  "24-2" = NULL WHERE "24-2" = '',
  "24-3" = NULL WHERE "24-3" = '',
  "24-4" = NULL WHERE "24-4" = '',
  "24-5" = NULL WHERE "24-5" = '',
  "24-6" = NULL WHERE "24-6" = '',
  "24-7" = NULL WHERE "24-7" = '',
  "24-8" = NULL WHERE "24-8" = '',
  "24-9" = NULL WHERE "24-9" = '',
  "24-10" = NULL WHERE "24-10" = '',
  "24-11" = NULL WHERE "24-11" = '',
  "24-12" = NULL WHERE "24-12" = '',
  
  "25-1" = NULL WHERE "25-1" = '',
  "25-2" = NULL WHERE "25-2" = '',
  "25-3" = NULL WHERE "25-3" = '',
  "25-4" = NULL WHERE "25-4" = '',
  "25-5" = NULL WHERE "25-5" = '',
  "25-6" = NULL WHERE "25-6" = '',
  "25-7" = NULL WHERE "25-7" = '',
  "25-8" = NULL WHERE "25-8" = '',
  "25-9" = NULL WHERE "25-9" = '',
  "25-10" = NULL WHERE "25-10" = '',
  "25-11" = NULL WHERE "25-11" = '',
  "25-12" = NULL WHERE "25-12" = '',
  
  "26-1" = NULL WHERE "26-1" = '',
  "26-2" = NULL WHERE "26-2" = '',
  "26-3" = NULL WHERE "26-3" = '',
  "26-4" = NULL WHERE "26-4" = '',
  "26-5" = NULL WHERE "26-5" = '',
  "26-6" = NULL WHERE "26-6" = '',
  "26-7" = NULL WHERE "26-7" = '',
  "26-8" = NULL WHERE "26-8" = '',
  "26-9" = NULL WHERE "26-9" = '',
  "26-10" = NULL WHERE "26-10" = '',
  "26-11" = NULL WHERE "26-11" = '',
  "26-12" = NULL WHERE "26-12" = '';

-- 4단계: 이제 안전하게 numeric으로 변환
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