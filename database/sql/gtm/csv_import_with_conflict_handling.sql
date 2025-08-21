-- GTM 고객 데이터 CSV 임포트 스크립트 (중복 처리 포함)
-- 이 스크립트는 CSV 데이터를 안전하게 임포트하고 중복을 처리합니다

-- 1. 임시 테이블 생성 (CSV 데이터 로드용)
DROP TABLE IF EXISTS temp_gtm_import;
CREATE TEMP TABLE temp_gtm_import (
    customer_id VARCHAR(50),
    customer_name VARCHAR(200),
    
    -- 조직 정보
    organization_type VARCHAR(100),
    sub_type VARCHAR(100),
    department VARCHAR(100),
    contact_person VARCHAR(100),
    
    -- 서비스 정보 (O/X 문자열로 받음)
    service_giga_premium TEXT,
    service_giga_lite TEXT,
    service_premium TEXT,
    service_lite TEXT,
    service_soho TEXT,
    service_mplsvpn TEXT,
    service_internet TEXT,
    service_dcn TEXT,
    service_iplc TEXT,
    service_ipvpn TEXT,
    
    -- 타사 서비스 정보 (O/X 문자열로 받음)
    competitor_kt TEXT,
    competitor_lg TEXT,
    competitor_sk TEXT,
    
    -- 기타 정보
    equipment VARCHAR(200),
    manager VARCHAR(100),
    location VARCHAR(100),
    code VARCHAR(50),
    customer_code VARCHAR(50)
);

-- 2. CSV 데이터 로드 (헤더 스킵)
-- 실제 CSV 파일 경로로 변경 필요
\COPY temp_gtm_import FROM 'path/to/your/gtm_data.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', ENCODING 'UTF8');

-- 3. 중복 customer_id 확인 및 보고
DO $$
DECLARE
    duplicate_count INTEGER;
    duplicate_ids TEXT;
BEGIN
    -- 임시 테이블 내 중복 확인
    SELECT COUNT(*), STRING_AGG(customer_id, ', ' ORDER BY customer_id)
    INTO duplicate_count, duplicate_ids
    FROM (
        SELECT customer_id, COUNT(*) as cnt
        FROM temp_gtm_import
        WHERE customer_id IS NOT NULL AND customer_id != ''
        GROUP BY customer_id
        HAVING COUNT(*) > 1
    ) dupes;
    
    IF duplicate_count > 0 THEN
        RAISE NOTICE '경고: 임시 테이블에 % 개의 중복 customer_id가 발견되었습니다: %', duplicate_count, duplicate_ids;
    END IF;
    
    -- 기존 테이블과의 중복 확인
    SELECT COUNT(*), STRING_AGG(t.customer_id, ', ' ORDER BY t.customer_id)
    INTO duplicate_count, duplicate_ids
    FROM temp_gtm_import t
    INNER JOIN gtm_customers g ON t.customer_id = g.customer_id
    WHERE t.customer_id IS NOT NULL AND t.customer_id != '';
    
    IF duplicate_count > 0 THEN
        RAISE NOTICE '경고: 기존 데이터베이스에 이미 존재하는 customer_id % 개: %', duplicate_count, duplicate_ids;
    END IF;
END $$;

-- 4. 데이터 정리 및 검증
UPDATE temp_gtm_import
SET
    -- NULL 또는 빈 문자열 처리
    customer_id = NULLIF(TRIM(customer_id), ''),
    customer_name = NULLIF(TRIM(customer_name), ''),
    organization_type = NULLIF(TRIM(organization_type), ''),
    sub_type = NULLIF(TRIM(sub_type), ''),
    department = NULLIF(TRIM(department), ''),
    contact_person = NULLIF(TRIM(contact_person), ''),
    equipment = NULLIF(TRIM(equipment), ''),
    manager = NULLIF(TRIM(manager), ''),
    location = NULLIF(TRIM(location), ''),
    code = NULLIF(TRIM(code), ''),
    customer_code = NULLIF(TRIM(customer_code), '');

-- 5. 유효하지 않은 레코드 제거
DELETE FROM temp_gtm_import
WHERE customer_id IS NULL OR customer_id = '';

-- 6. 임시 테이블 내 중복 제거 (최신 레코드 유지)
WITH duplicates AS (
    SELECT ctid, 
           ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY ctid DESC) as rn
    FROM temp_gtm_import
)
DELETE FROM temp_gtm_import
WHERE ctid IN (
    SELECT ctid FROM duplicates WHERE rn > 1
);

-- 7. 실제 테이블로 데이터 삽입 (UPSERT)
INSERT INTO gtm_customers (
    customer_id,
    customer_name,
    organization_type,
    sub_type,
    department,
    contact_person,
    service_giga_premium,
    service_giga_lite,
    service_premium,
    service_lite,
    service_soho,
    service_mplsvpn,
    service_internet,
    service_dcn,
    service_iplc,
    service_ipvpn,
    competitor_kt,
    competitor_lg,
    competitor_sk,
    equipment,
    manager,
    location,
    code,
    customer_code
)
SELECT
    customer_id,
    customer_name,
    organization_type,
    sub_type,
    department,
    contact_person,
    -- O/X 문자열을 boolean으로 변환
    CASE 
        WHEN UPPER(TRIM(service_giga_premium)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(service_giga_premium)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    CASE 
        WHEN UPPER(TRIM(service_giga_lite)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(service_giga_lite)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    CASE 
        WHEN UPPER(TRIM(service_premium)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(service_premium)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    CASE 
        WHEN UPPER(TRIM(service_lite)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(service_lite)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    CASE 
        WHEN UPPER(TRIM(service_soho)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(service_soho)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    CASE 
        WHEN UPPER(TRIM(service_mplsvpn)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(service_mplsvpn)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    CASE 
        WHEN UPPER(TRIM(service_internet)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(service_internet)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    CASE 
        WHEN UPPER(TRIM(service_dcn)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(service_dcn)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    CASE 
        WHEN UPPER(TRIM(service_iplc)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(service_iplc)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    CASE 
        WHEN UPPER(TRIM(service_ipvpn)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(service_ipvpn)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    CASE 
        WHEN UPPER(TRIM(competitor_kt)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(competitor_kt)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    CASE 
        WHEN UPPER(TRIM(competitor_lg)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(competitor_lg)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    CASE 
        WHEN UPPER(TRIM(competitor_sk)) IN ('O', 'YES', 'Y', '1', 'TRUE') THEN true
        WHEN UPPER(TRIM(competitor_sk)) IN ('X', 'NO', 'N', '0', 'FALSE') THEN false
        ELSE NULL
    END,
    equipment,
    manager,
    location,
    code,
    customer_code
FROM temp_gtm_import
ON CONFLICT (customer_id) DO UPDATE SET
    customer_name = EXCLUDED.customer_name,
    organization_type = EXCLUDED.organization_type,
    sub_type = EXCLUDED.sub_type,
    department = EXCLUDED.department,
    contact_person = EXCLUDED.contact_person,
    service_giga_premium = EXCLUDED.service_giga_premium,
    service_giga_lite = EXCLUDED.service_giga_lite,
    service_premium = EXCLUDED.service_premium,
    service_lite = EXCLUDED.service_lite,
    service_soho = EXCLUDED.service_soho,
    service_mplsvpn = EXCLUDED.service_mplsvpn,
    service_internet = EXCLUDED.service_internet,
    service_dcn = EXCLUDED.service_dcn,
    service_iplc = EXCLUDED.service_iplc,
    service_ipvpn = EXCLUDED.service_ipvpn,
    competitor_kt = EXCLUDED.competitor_kt,
    competitor_lg = EXCLUDED.competitor_lg,
    competitor_sk = EXCLUDED.competitor_sk,
    equipment = EXCLUDED.equipment,
    manager = EXCLUDED.manager,
    location = EXCLUDED.location,
    code = EXCLUDED.code,
    customer_code = EXCLUDED.customer_code,
    updated_at = CURRENT_TIMESTAMP;

-- 8. 결과 보고
DO $$
DECLARE
    inserted_count INTEGER;
    updated_count INTEGER;
    total_count INTEGER;
BEGIN
    GET DIAGNOSTICS inserted_count = ROW_COUNT;
    
    SELECT COUNT(*) INTO total_count FROM gtm_customers;
    
    RAISE NOTICE '=================================';
    RAISE NOTICE '임포트 완료:';
    RAISE NOTICE '처리된 레코드: %', inserted_count;
    RAISE NOTICE '전체 고객 수: %', total_count;
    RAISE NOTICE '=================================';
END $$;

-- 9. 임시 테이블 정리
DROP TABLE IF EXISTS temp_gtm_import;