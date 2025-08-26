-- 테이블 구조 확인 및 변환

-- 1. 먼저 gtm_sales 테이블 구조 확인
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'gtm_sales'
ORDER BY ordinal_position;

-- 2. 샘플 데이터 확인
SELECT * FROM gtm_sales LIMIT 1;

-- 3. 간단한 변환 함수 (동적 SQL 대신 직접 접근)
CREATE OR REPLACE FUNCTION transform_gtm_sales_to_flexible() 
RETURNS TABLE(
    master_count INT,
    revenue_count INT,
    duplicate_count INT
) AS $$
DECLARE
    v_master_count INT;
    v_revenue_count INT;
    v_duplicate_count INT;
BEGIN
    -- 기존 데이터 초기화
    DELETE FROM gtm_sales_revenues;
    DELETE FROM gtm_sales_master;
    
    -- 1. 마스터 데이터 입력
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
    ORDER BY service_id, id DESC;
    
    -- 2. 월별 매출 데이터 입력 (직접 접근)
    -- 2506
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    SELECT service_id, '2506', SUM(revenue_2506)
    FROM gtm_sales
    WHERE service_id IS NOT NULL AND revenue_2506 IS NOT NULL
    GROUP BY service_id;
    
    -- 2505
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    SELECT service_id, '2505', SUM(revenue_2505)
    FROM gtm_sales
    WHERE service_id IS NOT NULL AND revenue_2505 IS NOT NULL
    GROUP BY service_id;
    
    -- 2504
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    SELECT service_id, '2504', SUM(revenue_2504)
    FROM gtm_sales
    WHERE service_id IS NOT NULL AND revenue_2504 IS NOT NULL
    GROUP BY service_id;
    
    -- 2503
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    SELECT service_id, '2503', SUM(revenue_2503)
    FROM gtm_sales
    WHERE service_id IS NOT NULL AND revenue_2503 IS NOT NULL
    GROUP BY service_id;
    
    -- 2502
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    SELECT service_id, '2502', SUM(revenue_2502)
    FROM gtm_sales
    WHERE service_id IS NOT NULL AND revenue_2502 IS NOT NULL
    GROUP BY service_id;
    
    -- 2501
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    SELECT service_id, '2501', SUM(revenue_2501)
    FROM gtm_sales
    WHERE service_id IS NOT NULL AND revenue_2501 IS NOT NULL
    GROUP BY service_id;
    
    -- 2412
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    SELECT service_id, '2412', SUM(revenue_2412)
    FROM gtm_sales
    WHERE service_id IS NOT NULL AND revenue_2412 IS NOT NULL
    GROUP BY service_id;
    
    -- 2411
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    SELECT service_id, '2411', SUM(revenue_2411)
    FROM gtm_sales
    WHERE service_id IS NOT NULL AND revenue_2411 IS NOT NULL
    GROUP BY service_id;
    
    -- 2410
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    SELECT service_id, '2410', SUM(revenue_2410)
    FROM gtm_sales
    WHERE service_id IS NOT NULL AND revenue_2410 IS NOT NULL
    GROUP BY service_id;
    
    -- 2409
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    SELECT service_id, '2409', SUM(revenue_2409)
    FROM gtm_sales
    WHERE service_id IS NOT NULL AND revenue_2409 IS NOT NULL
    GROUP BY service_id;
    
    -- 2408
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    SELECT service_id, '2408', SUM(revenue_2408)
    FROM gtm_sales
    WHERE service_id IS NOT NULL AND revenue_2408 IS NOT NULL
    GROUP BY service_id;
    
    -- 통계 계산
    SELECT COUNT(DISTINCT service_id) INTO v_master_count FROM gtm_sales_master;
    SELECT COUNT(*) INTO v_revenue_count FROM gtm_sales_revenues;
    SELECT COUNT(*) INTO v_duplicate_count 
    FROM (
        SELECT service_id 
        FROM gtm_sales 
        GROUP BY service_id 
        HAVING COUNT(*) > 1
    ) t;
    
    -- 결과 반환
    RETURN QUERY SELECT v_master_count, v_revenue_count, v_duplicate_count;
END;
$$ LANGUAGE plpgsql;