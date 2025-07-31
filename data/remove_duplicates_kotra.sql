-- KOTRA 테이블 중복 데이터 확인 및 제거
-- 생성일: 2025-01-31

-- 1. 중복 데이터 확인
-- company_name_kr 기준으로 중복된 레코드들을 찾습니다
SELECT 
    company_name_kr, 
    COUNT(*) as duplicate_count,
    STRING_AGG(id::text, ', ') as duplicate_ids
FROM kotra 
WHERE company_name_kr IS NOT NULL AND company_name_kr != ''
GROUP BY company_name_kr 
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, company_name_kr;

-- 2. 중복 제거 전 상세 정보 확인
-- 중복된 회사들의 상세 정보를 확인합니다
WITH duplicates AS (
    SELECT company_name_kr
    FROM kotra 
    WHERE company_name_kr IS NOT NULL AND company_name_kr != ''
    GROUP BY company_name_kr 
    HAVING COUNT(*) > 1
)
SELECT 
    k.id,
    k.company_name_kr,
    k.company_name_en,
    k.sales_division,
    k.sales_division_match_type,
    k.sales_division_similarity,
    k.address,
    k.created_at
FROM kotra k
INNER JOIN duplicates d ON k.company_name_kr = d.company_name_kr
ORDER BY k.company_name_kr, k.id;

-- 3. 중복 제거 실행
-- 중복 제거 전략:
-- 1. sales_division이 있는 레코드 우선 유지
-- 2. 더 많은 정보가 있는 레코드 우선 유지  
-- 3. ID가 작은 레코드 우선 유지 (더 오래된 데이터)
WITH duplicates AS (
    SELECT 
        id, 
        company_name_kr, 
        sales_division,
        -- 정보 완성도 계산 (NULL이 아닌 컬럼 수)
        (CASE WHEN region IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN country IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN trade_office IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN company_name_en IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN sales_division IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN address IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN postal_code IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN entry_type IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN investment_type IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN parent_company IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN industry_major IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN industry_minor IS NOT NULL THEN 1 ELSE 0 END) as info_completeness,
        ROW_NUMBER() OVER (
            PARTITION BY company_name_kr 
            ORDER BY 
                -- 1순위: sales_division이 있는 레코드 우선
                CASE WHEN sales_division IS NOT NULL AND sales_division != '' THEN 0 ELSE 1 END,
                -- 2순위: 정보 완성도가 높은 레코드 우선
                info_completeness DESC,
                -- 3순위: ID가 작은 레코드 우선 (더 오래된 데이터)
                id
        ) as rn
    FROM kotra 
    WHERE company_name_kr IS NOT NULL AND company_name_kr != ''
)
DELETE FROM kotra 
WHERE id IN (
    SELECT id FROM duplicates WHERE rn > 1
);

-- 4. 중복 제거 후 확인
-- 중복이 모두 제거되었는지 확인합니다
SELECT 
    company_name_kr, 
    COUNT(*) as count
FROM kotra 
WHERE company_name_kr IS NOT NULL AND company_name_kr != ''
GROUP BY company_name_kr 
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- 5. 최종 데이터 통계
SELECT 
    COUNT(*) as total_records,
    COUNT(DISTINCT company_name_kr) as unique_companies,
    COUNT(CASE WHEN sales_division IS NOT NULL AND sales_division != '' THEN 1 END) as records_with_sales_division
FROM kotra 
WHERE company_name_kr IS NOT NULL AND company_name_kr != '';

-- 6. 영업조직 정보 통계
SELECT 
    sales_division_match_type,
    COUNT(*) as count,
    AVG(sales_division_similarity) as avg_similarity
FROM kotra 
WHERE sales_division IS NOT NULL AND sales_division != ''
GROUP BY sales_division_match_type
ORDER BY count DESC; 