
-- 매칭된 데이터 업데이트 예시
UPDATE kotra 
SET 
    sales_division = '전략고객사업본부 전략사업2담당 전략고객1팀',
    sales_division_match_type = 'korean_name',
    sales_division_similarity = 1.0
WHERE company_name_kr = '현대자동차';
