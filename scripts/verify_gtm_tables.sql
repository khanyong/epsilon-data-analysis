-- =====================================================
-- GTM 테이블/뷰 구조 확인 SQL
-- Supabase SQL Editor에서 실행하세요
-- =====================================================

-- 1. 테이블과 뷰 구분 확인
-- =====================================================
SELECT 
    'TABLE' as object_type,
    schemaname,
    tablename as object_name
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN ('gtm_customers', 'gtm_active_customers')

UNION ALL

SELECT 
    'VIEW' as object_type,
    schemaname,
    viewname as object_name
FROM pg_views 
WHERE schemaname = 'public' 
    AND viewname IN ('gtm_customers', 'gtm_active_customers')

ORDER BY object_name;

-- =====================================================
-- 2. gtm_customers 테이블 데이터 확인
-- =====================================================
SELECT 
    'gtm_customers' as table_name,
    COUNT(*) as total_records,
    COUNT(DISTINCT customer_id) as unique_customers,
    COUNT(DISTINCT customer_name) as unique_names
FROM gtm_customers;

-- =====================================================
-- 3. gtm_active_customers 데이터 확인
-- =====================================================
SELECT 
    'gtm_active_customers' as table_name,
    COUNT(*) as total_records,
    COUNT(DISTINCT customer_id) as unique_customers,
    COUNT(DISTINCT customer_name) as unique_names
FROM gtm_active_customers;

-- =====================================================
-- 4. 두 테이블/뷰의 레코드 수 비교
-- =====================================================
SELECT 
    (SELECT COUNT(*) FROM gtm_customers) as gtm_customers_count,
    (SELECT COUNT(*) FROM gtm_active_customers) as gtm_active_customers_count,
    CASE 
        WHEN (SELECT COUNT(*) FROM gtm_customers) = (SELECT COUNT(*) FROM gtm_active_customers) 
        THEN '레코드 수 동일'
        WHEN (SELECT COUNT(*) FROM gtm_customers) > (SELECT COUNT(*) FROM gtm_active_customers)
        THEN 'gtm_customers가 더 많음 (active_customers는 필터링된 뷰일 가능성)'
        ELSE 'gtm_active_customers가 더 많음'
    END as comparison;

-- =====================================================
-- 5. gtm_customers 샘플 데이터 (상위 5개)
-- =====================================================
SELECT 
    'gtm_customers 샘플' as source,
    id,
    customer_name,
    customer_id,
    status,
    created_at
FROM gtm_customers
LIMIT 5;

-- =====================================================
-- 6. gtm_active_customers 샘플 데이터 (상위 5개)
-- =====================================================
SELECT 
    'gtm_active_customers 샘플' as source,
    id,
    customer_name,
    customer_id,
    CASE 
        WHEN status IS NOT NULL THEN status
        ELSE 'status 컬럼 없음'
    END as status,
    created_at
FROM gtm_active_customers
LIMIT 5;

-- =====================================================
-- 7. gtm_active_customers가 뷰인 경우 정의 확인
-- =====================================================
SELECT 
    viewname,
    definition
FROM pg_views
WHERE schemaname = 'public' 
    AND viewname = 'gtm_active_customers';

-- =====================================================
-- 8. 테이블 컬럼 구조 비교
-- =====================================================
SELECT 
    'gtm_customers' as table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'gtm_customers'
ORDER BY ordinal_position
LIMIT 10;

SELECT 
    'gtm_active_customers' as table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'gtm_active_customers'
ORDER BY ordinal_position
LIMIT 10;

-- =====================================================
-- 9. 동일한 ID를 가진 레코드가 있는지 확인
-- =====================================================
SELECT 
    'ID 중복 확인' as check_type,
    COUNT(*) as matching_ids
FROM gtm_customers c
INNER JOIN gtm_active_customers a ON c.id = a.id;

-- =====================================================
-- 10. gtm_customers에서 status별 분포
-- =====================================================
SELECT 
    COALESCE(status, 'NULL') as status,
    COUNT(*) as count
FROM gtm_customers
GROUP BY status
ORDER BY count DESC;

-- =====================================================
-- 11. 전체 요약
-- =====================================================
WITH summary AS (
    SELECT 
        (SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public' AND tablename = 'gtm_customers') as customers_is_table,
        (SELECT COUNT(*) FROM pg_views WHERE schemaname = 'public' AND viewname = 'gtm_customers') as customers_is_view,
        (SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public' AND tablename = 'gtm_active_customers') as active_is_table,
        (SELECT COUNT(*) FROM pg_views WHERE schemaname = 'public' AND viewname = 'gtm_active_customers') as active_is_view,
        (SELECT COUNT(*) FROM gtm_customers) as customers_count,
        (SELECT COUNT(*) FROM gtm_active_customers) as active_count
)
SELECT 
    CASE 
        WHEN customers_is_table > 0 THEN 'gtm_customers는 테이블입니다'
        WHEN customers_is_view > 0 THEN 'gtm_customers는 뷰입니다'
        ELSE 'gtm_customers를 찾을 수 없습니다'
    END as gtm_customers_type,
    CASE 
        WHEN active_is_table > 0 THEN 'gtm_active_customers는 테이블입니다'
        WHEN active_is_view > 0 THEN 'gtm_active_customers는 뷰입니다'
        ELSE 'gtm_active_customers를 찾을 수 없습니다'
    END as gtm_active_customers_type,
    customers_count as gtm_customers_records,
    active_count as gtm_active_customers_records
FROM summary;