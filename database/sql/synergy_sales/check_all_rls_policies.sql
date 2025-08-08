-- 모든 테이블 RLS 정책 통합 확인 스크립트
-- 7개 테이블 (rfq_middlemile, sof_middlemile, kotra, epsilon_pops, kt_pops, vpn_connections, hyundai_motors)

-- 1. 모든 테이블의 RLS 활성화 상태 확인
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename IN (
    'rfq_middlemile', 
    'sof_middlemile', 
    'kotra', 
    'epsilon_pops', 
    'kt_pops', 
    'vpn_connections', 
    'hyundai_motors'
)
ORDER BY tablename;

-- 2. 모든 테이블의 RLS 정책 개수 확인
SELECT 
    tablename,
    COUNT(*) as policy_count
FROM pg_policies 
WHERE tablename IN (
    'rfq_middlemile', 
    'sof_middlemile', 
    'kotra', 
    'epsilon_pops', 
    'kt_pops', 
    'vpn_connections', 
    'hyundai_motors'
)
GROUP BY tablename
ORDER BY tablename;

-- 3. 모든 테이블의 정책 상세 정보 확인 (표준화 확인용)
SELECT 
    tablename,
    policyname,
    cmd,
    permissive,
    roles
FROM pg_policies 
WHERE tablename IN (
    'rfq_middlemile', 
    'sof_middlemile', 
    'kotra', 
    'epsilon_pops', 
    'kt_pops', 
    'vpn_connections', 
    'hyundai_motors'
)
ORDER BY tablename, cmd;

-- 4. 표준화 완료 여부 확인 (각 테이블당 4개 정책이 있어야 함)
WITH policy_counts AS (
    SELECT 
        tablename,
        COUNT(*) as policy_count,
        COUNT(CASE WHEN cmd = 'SELECT' THEN 1 END) as select_policies,
        COUNT(CASE WHEN cmd = 'INSERT' THEN 1 END) as insert_policies,
        COUNT(CASE WHEN cmd = 'UPDATE' THEN 1 END) as update_policies,
        COUNT(CASE WHEN cmd = 'DELETE' THEN 1 END) as delete_policies
    FROM pg_policies 
    WHERE tablename IN (
        'rfq_middlemile', 
        'sof_middlemile', 
        'kotra', 
        'epsilon_pops', 
        'kt_pops', 
        'vpn_connections', 
        'hyundai_motors'
    )
    GROUP BY tablename
)
SELECT 
    tablename,
    policy_count,
    select_policies,
    insert_policies,
    update_policies,
    delete_policies,
    CASE 
        WHEN policy_count = 4 AND select_policies = 1 AND insert_policies = 1 
             AND update_policies = 1 AND delete_policies = 1 
        THEN '✅ 표준화 완료'
        ELSE '❌ 표준화 필요'
    END as standardization_status
FROM policy_counts
ORDER BY tablename;

-- 5. 데이터 접근 테스트 (각 테이블 행 개수 확인)
SELECT 'rfq_middlemile' as table_name, COUNT(*) as row_count FROM rfq_middlemile
UNION ALL
SELECT 'sof_middlemile' as table_name, COUNT(*) as row_count FROM sof_middlemile
UNION ALL
SELECT 'kotra' as table_name, COUNT(*) as row_count FROM kotra
UNION ALL
SELECT 'epsilon_pops' as table_name, COUNT(*) as row_count FROM epsilon_pops
UNION ALL
SELECT 'kt_pops' as table_name, COUNT(*) as row_count FROM kt_pops
UNION ALL
SELECT 'vpn_connections' as table_name, COUNT(*) as row_count FROM vpn_connections
UNION ALL
SELECT 'hyundai_motors' as table_name, COUNT(*) as row_count FROM hyundai_motors
ORDER BY table_name; 