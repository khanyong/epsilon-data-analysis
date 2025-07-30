-- VPN Connections 테이블 RLS 정책 표준화
-- 기존 정책 삭제 후 표준화된 정책 적용

-- 1. 기존 RLS 정책 모두 삭제
DROP POLICY IF EXISTS "Allow read access for all users" ON vpn_connections;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON vpn_connections;
DROP POLICY IF EXISTS "Allow update for authenticated users" ON vpn_connections;
DROP POLICY IF EXISTS "Allow delete for authenticated users" ON vpn_connections;

-- 기존 정책명이 다를 수 있으므로 모든 가능한 정책명으로 삭제 시도
DROP POLICY IF EXISTS "Enable read access for all users" ON vpn_connections;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON vpn_connections;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON vpn_connections;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON vpn_connections;

-- 2. RLS 활성화 (이미 활성화되어 있어도 안전)
ALTER TABLE vpn_connections ENABLE ROW LEVEL SECURITY;

-- 3. 표준화된 RLS 정책 생성

-- Read 정책: 모든 사용자(익명 포함)가 SELECT 가능
CREATE POLICY "Enable read access for all users" ON vpn_connections
    FOR SELECT USING (true);

-- Insert 정책: 인증된 사용자만 INSERT 가능
CREATE POLICY "Enable insert for authenticated users only" ON vpn_connections
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Update 정책: 인증된 사용자만 UPDATE 가능
CREATE POLICY "Enable update for authenticated users only" ON vpn_connections
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Delete 정책: 인증된 사용자만 DELETE 가능
CREATE POLICY "Enable delete for authenticated users only" ON vpn_connections
    FOR DELETE USING (auth.role() = 'authenticated');

-- 4. 정책 적용 확인 쿼리
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'vpn_connections'
ORDER BY policyname;

-- 5. 테이블 정보 확인
SELECT 
    'vpn_connections' as table_name,
    COUNT(*) as row_count,
    COUNT(DISTINCT country) as unique_countries,
    COUNT(DISTINCT customer) as unique_customers
FROM vpn_connections;

-- 6. RLS 상태 확인 (안전한 방식)
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'vpn_connections';

-- 추가: RLS 정책 개수 확인
SELECT 
    COUNT(*) as policy_count,
    'vpn_connections' as table_name
FROM pg_policies 
WHERE tablename = 'vpn_connections'; 