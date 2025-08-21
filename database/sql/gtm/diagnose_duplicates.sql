-- GTM 데이터 중복 진단 및 정리 스크립트

-- 1. 현재 gtm_customers 테이블의 중복 customer_id 확인
SELECT 'gtm_customers 테이블 중복 확인' as check_type;
SELECT 
    customer_id,
    COUNT(*) as duplicate_count,
    STRING_AGG(CAST(id AS TEXT), ', ') as record_ids,
    STRING_AGG(customer_name, ' | ') as customer_names
FROM gtm_customers
GROUP BY customer_id
HAVING COUNT(*) > 1
ORDER BY COUNT(*) DESC, customer_id;

-- 2. NULL 또는 빈 customer_id 확인
SELECT 'NULL 또는 빈 customer_id 확인' as check_type;
SELECT 
    id,
    customer_id,
    customer_name,
    CASE 
        WHEN customer_id IS NULL THEN 'NULL'
        WHEN customer_id = '' THEN '빈 문자열'
        ELSE 'OK'
    END as status
FROM gtm_customers
WHERE customer_id IS NULL OR customer_id = '';

-- 3. customer_id 형식 검사 (예상 패턴과 다른 경우)
SELECT 'customer_id 형식 이상 확인' as check_type;
SELECT 
    id,
    customer_id,
    customer_name,
    LENGTH(customer_id) as id_length,
    CASE
        WHEN customer_id ~ '^\s' THEN '앞 공백'
        WHEN customer_id ~ '\s$' THEN '뒤 공백'
        WHEN customer_id ~ '\s\s' THEN '중복 공백'
        WHEN customer_id ~ '[^\x20-\x7E]' THEN '특수문자/비ASCII'
        ELSE 'OK'
    END as issue
FROM gtm_customers
WHERE 
    customer_id ~ '^\s' OR 
    customer_id ~ '\s$' OR 
    customer_id ~ '\s\s' OR
    customer_id ~ '[^\x20-\x7E]'
ORDER BY id;

-- 4. 중복 제거를 위한 백업 테이블 생성
-- CREATE TABLE gtm_customers_backup AS SELECT * FROM gtm_customers;

-- 5. 중복 레코드 중 최신 것만 유지하는 쿼리 (실행 전 확인 필요)
/*
-- 중복 제거 (최신 레코드만 유지)
WITH duplicates AS (
    SELECT 
        id,
        customer_id,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id 
            ORDER BY updated_at DESC, id DESC
        ) as rn
    FROM gtm_customers
    WHERE customer_id IS NOT NULL AND customer_id != ''
)
DELETE FROM gtm_customers
WHERE id IN (
    SELECT id FROM duplicates WHERE rn > 1
);
*/

-- 6. 데이터 정리 스크립트 (공백 제거)
/*
UPDATE gtm_customers
SET customer_id = TRIM(customer_id)
WHERE customer_id != TRIM(customer_id);
*/

-- 7. 통계 정보
SELECT '데이터 통계' as check_type;
SELECT 
    COUNT(*) as total_records,
    COUNT(DISTINCT customer_id) as unique_customers,
    COUNT(*) - COUNT(DISTINCT customer_id) as duplicate_count,
    COUNT(CASE WHEN customer_id IS NULL OR customer_id = '' THEN 1 END) as empty_ids,
    COUNT(CASE WHEN service_giga_premium = true THEN 1 END) as giga_premium_users,
    COUNT(CASE WHEN competitor_kt = true OR competitor_lg = true OR competitor_sk = true THEN 1 END) as has_competitor
FROM gtm_customers;