-- 중복 service_id를 처리하는 개선된 변환 함수

-- 기존 함수 삭제
DROP FUNCTION IF EXISTS transform_gtm_sales_to_flexible();

-- 새로운 변환 함수 (중복 처리 개선)
CREATE OR REPLACE FUNCTION transform_gtm_sales_to_flexible() 
RETURNS TABLE(
    master_count INT,
    revenue_count INT,
    duplicate_count INT
) AS $$
DECLARE
    rec RECORD;
    revenue_cols TEXT[] := ARRAY[
        'revenue_2506', 'revenue_2505', 'revenue_2504', 'revenue_2503', 
        'revenue_2502', 'revenue_2501', 'revenue_2412', 'revenue_2411', 
        'revenue_2410', 'revenue_2409', 'revenue_2408'
    ];
    col TEXT;
    month_code TEXT;
    revenue_val DECIMAL;
    v_master_count INT;
    v_revenue_count INT;
    v_duplicate_count INT;
BEGIN
    -- 기존 데이터 초기화 (선택사항)
    -- DELETE FROM gtm_sales_revenues;
    -- DELETE FROM gtm_sales_master;
    
    -- 1. 마스터 데이터 입력 (중복 service_id는 마지막 값으로 업데이트)
    INSERT INTO gtm_sales_master (
        division, settlement_type, bm_manager, settlement_manager,
        customer_name, domestic_overseas, channel, customer_group,
        service_type, service_id, pop, capacity, capacity_unit
    )
    SELECT DISTINCT ON (service_id)
        division, settlement_type, bm_manager, settlement_manager,
        customer_name, domestic_overseas, channel, customer_group,
        service_type, service_id, pop, capacity, capacity_unit
    FROM gtm_sales
    WHERE service_id IS NOT NULL
    ORDER BY service_id, id DESC  -- 중복 시 마지막 행 선택
    ON CONFLICT (service_id) DO UPDATE SET
        customer_name = EXCLUDED.customer_name,
        service_type = EXCLUDED.service_type,
        updated_at = NOW();
    
    -- 2. 월별 매출 데이터 입력 (모든 행의 매출 포함)
    FOR rec IN SELECT * FROM gtm_sales WHERE service_id IS NOT NULL LOOP
        -- 각 월별 컬럼 처리
        FOREACH col IN ARRAY revenue_cols LOOP
            -- 컬럼명에서 월 코드 추출
            month_code := substring(col from 9 for 4);
            
            -- 동적 SQL로 해당 컬럼 값 가져오기
            EXECUTE format('SELECT $1.%I', col) INTO revenue_val USING rec;
            
            -- NULL이 아닌 경우 입력 또는 합산
            IF revenue_val IS NOT NULL THEN
                INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
                VALUES (rec.service_id, month_code, revenue_val)
                ON CONFLICT (service_id, revenue_month) 
                DO UPDATE SET 
                    -- 중복 시 매출액 합산
                    revenue_amount = gtm_sales_revenues.revenue_amount + EXCLUDED.revenue_amount;
            END IF;
        END LOOP;
    END LOOP;
    
    -- 통계 계산
    SELECT COUNT(DISTINCT service_id) INTO v_master_count FROM gtm_sales_master;
    SELECT COUNT(*) INTO v_revenue_count FROM gtm_sales_revenues;
    SELECT COUNT(*) INTO v_duplicate_count 
    FROM (
        SELECT service_id, COUNT(*) as cnt 
        FROM gtm_sales 
        GROUP BY service_id 
        HAVING COUNT(*) > 1
    ) t;
    
    -- 결과 반환
    RETURN QUERY SELECT v_master_count, v_revenue_count, v_duplicate_count;
END;
$$ LANGUAGE plpgsql;

-- 사용 예시
/*
-- 변환 실행 및 통계 확인
SELECT * FROM transform_gtm_sales_to_flexible();

-- 중복 service_id의 매출 합계 확인
SELECT 
    m.service_id,
    m.customer_name,
    r.revenue_month,
    r.revenue_amount
FROM gtm_sales_master m
JOIN gtm_sales_revenues r ON m.service_id = r.service_id
WHERE m.service_id IN (
    SELECT service_id 
    FROM gtm_sales 
    GROUP BY service_id 
    HAVING COUNT(*) > 1
)
ORDER BY m.service_id, r.revenue_month
LIMIT 20;
*/