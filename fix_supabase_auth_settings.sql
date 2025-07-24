-- Supabase Auth 설정 확인 및 수정 스크립트
-- 회원가입 시 "Database error saving new user" 오류 해결

-- 1. 현재 Auth 설정 확인
SELECT
    name,
    value,
    description
FROM auth.config
ORDER BY name;

-- 2. Email Auth 설정 확인 및 수정
-- 이메일 인증 활성화 확인
SELECT
    CASE
        WHEN value::boolean = true THEN '✅ 이메일 인증 활성화됨'
        ELSE '❌ 이메일 인증 비활성화됨'
    END as email_auth_status
FROM auth.config
WHERE name = 'enable_signup';

-- 3. 이메일 인증 활성화 (필요한 경우)
UPDATE auth.config
SET value = 'true'::jsonb
WHERE name = 'enable_signup' AND value::boolean = false;

-- 4. 이메일 확인 필요 여부 설정 확인
SELECT
    CASE
        WHEN value::boolean = true THEN '✅ 이메일 확인 필요'
        ELSE '❌ 이메일 확인 불필요'
    END as email_confirm_status
FROM auth.config
WHERE name = 'enable_confirmations';

-- 5. 이메일 확인을 선택적으로 설정 (회원가입 테스트를 위해)
UPDATE auth.config
SET value = 'false'::jsonb
WHERE name = 'enable_confirmations' AND value::boolean = true;

-- 6. Site URL 설정 확인
SELECT
    name,
    value,
    CASE
        WHEN name = 'site_url' AND value IS NOT NULL THEN '✅ Site URL 설정됨'
        WHEN name = 'site_url' AND value IS NULL THEN '❌ Site URL 설정 필요'
        ELSE '기타 설정'
    END as status
FROM auth.config
WHERE name = 'site_url';

-- 7. Redirect URLs 설정 확인
SELECT
    name,
    value,
    CASE
        WHEN name = 'redirect_urls' AND value IS NOT NULL THEN '✅ Redirect URLs 설정됨'
        WHEN name = 'redirect_urls' AND value IS NULL THEN '❌ Redirect URLs 설정 필요'
        ELSE '기타 설정'
    END as status
FROM auth.config
WHERE name = 'redirect_urls';

-- 8. JWT 설정 확인
SELECT
    name,
    CASE
        WHEN name = 'jwt_exp' AND value IS NOT NULL THEN '✅ JWT 만료시간 설정됨'
        WHEN name = 'jwt_exp' AND value IS NULL THEN '❌ JWT 만료시간 설정 필요'
        ELSE '기타 JWT 설정'
    END as jwt_status
FROM auth.config
WHERE name LIKE 'jwt%';

-- 9. 보안 설정 확인
SELECT
    name,
    value,
    CASE
        WHEN name = 'secure_email_change_enabled' AND value::boolean = true THEN '✅ 보안 이메일 변경 활성화'
        WHEN name = 'secure_email_change_enabled' AND value::boolean = false THEN '❌ 보안 이메일 변경 비활성화'
        ELSE '기타 보안 설정'
    END as security_status
FROM auth.config
WHERE name LIKE '%secure%' OR name LIKE '%security%';

-- 10. 최종 설정 상태 요약
SELECT
    'Auth 설정 상태 요약' as summary,
    (SELECT CASE WHEN value::boolean = true THEN '활성화' ELSE '비활성화' END
     FROM auth.config WHERE name = 'enable_signup') as signup_enabled,
    (SELECT CASE WHEN value::boolean = true THEN '필요' ELSE '불필요' END
     FROM auth.config WHERE name = 'enable_confirmations') as email_confirmation,
    (SELECT CASE WHEN value IS NOT NULL THEN '설정됨' ELSE '설정 필요' END
     FROM auth.config WHERE name = 'site_url') as site_url_status; 