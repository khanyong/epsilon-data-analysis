-- Profiles 테이블 RLS 정책 수정 스크립트
-- 회원가입 시 "Database error saving new user" 오류 해결

-- 1. profiles 테이블 존재 여부 확인
SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name = 'profiles'
) as profiles_table_exists;

-- 2. profiles 테이블이 존재하는 경우 RLS 정책 확인 및 수정
DO $$
BEGIN
    -- profiles 테이블이 존재하는지 확인
    IF EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'profiles'
    ) THEN
        -- RLS 활성화 상태 확인
        IF NOT EXISTS (
            SELECT FROM pg_tables
            WHERE tablename = 'profiles'
            AND rowsecurity = true
        ) THEN
            -- RLS 활성화
            ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
            RAISE NOTICE 'Profiles 테이블에 RLS가 활성화되었습니다.';
        END IF;

        -- 기존 정책 삭제 (안전하게)
        DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
        DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
        DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.profiles;
        DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.profiles;
        DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
        DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

        -- 새로운 정책 생성 (회원가입 시 문제 해결)
        -- 읽기 정책: 모든 사용자가 읽기 가능
        CREATE POLICY "Enable read access for all users" ON public.profiles
            FOR SELECT USING (true);

        -- 삽입 정책: 인증된 사용자만 삽입 가능 (회원가입 시 필요)
        CREATE POLICY "Enable insert for authenticated users only" ON public.profiles
            FOR INSERT WITH CHECK (auth.role() = 'authenticated');

        -- 수정 정책: 사용자는 자신의 프로필만 수정 가능
        CREATE POLICY "Enable update for authenticated users only" ON public.profiles
            FOR UPDATE USING (auth.uid() = id);

        -- 삭제 정책: 사용자는 자신의 프로필만 삭제 가능
        CREATE POLICY "Enable delete for authenticated users only" ON public.profiles
            FOR DELETE USING (auth.uid() = id);

        RAISE NOTICE 'Profiles 테이블의 RLS 정책이 수정되었습니다.';
    ELSE
        RAISE NOTICE 'Profiles 테이블이 존재하지 않습니다.';
    END IF;
END $$;

-- 3. profiles 테이블 구조 확인 (테이블이 존재하는 경우)
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 4. 현재 RLS 정책 상태 확인
SELECT
    tablename,
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY cmd;

-- 5. auth.users 테이블과 profiles 테이블 연결 확인
-- (profiles 테이블이 존재하는 경우)
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_name = 'profiles'; 