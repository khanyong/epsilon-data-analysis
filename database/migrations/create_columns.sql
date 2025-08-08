
-- 1. 새로운 컬럼 추가
ALTER TABLE kotra 
ADD COLUMN IF NOT EXISTS sales_division TEXT,
ADD COLUMN IF NOT EXISTS sales_division_match_type TEXT,
ADD COLUMN IF NOT EXISTS sales_division_similarity FLOAT;

-- 2. 컬럼 설명 추가
COMMENT ON COLUMN kotra.sales_division IS '영업조직 정보';
COMMENT ON COLUMN kotra.sales_division_match_type IS '매칭 타입 (korean_name, english_name, address)';
COMMENT ON COLUMN kotra.sales_division_similarity IS '매칭 유사도 (0.0 ~ 1.0)';
