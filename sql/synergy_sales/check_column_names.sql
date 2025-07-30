-- =====================================================
-- Synergy Sales 테이블 컬럼명 확인
-- =====================================================

-- 1. 모든 컬럼명 확인
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'synergy_sales'
ORDER BY ordinal_position;

-- 2. 샘플 데이터로 실제 컬럼명 확인
SELECT * FROM synergy_sales LIMIT 1; 