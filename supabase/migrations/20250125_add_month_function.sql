-- 새로운 월 데이터를 추가하는 SQL 함수

-- 방법 1: 임시 테이블 방식 (CSV import 후 변환)
CREATE OR REPLACE FUNCTION add_month_from_temp_table(p_month VARCHAR(4))
RETURNS INT AS $$
DECLARE
    v_count INT;
    v_col_name TEXT;
BEGIN
    -- 컬럼명 생성
    v_col_name := 'revenue_' || p_month;
    
    -- 동적 SQL로 해당 월 데이터 추가
    EXECUTE format('
        INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
        SELECT service_id, %L, SUM(%I)
        FROM gtm_sales
        WHERE service_id IS NOT NULL AND %I IS NOT NULL
        GROUP BY service_id
        ON CONFLICT (service_id, revenue_month) 
        DO UPDATE SET revenue_amount = EXCLUDED.revenue_amount
    ', p_month, v_col_name, v_col_name);
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    
    RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- 방법 2: 직접 INSERT (개별 데이터)
CREATE OR REPLACE FUNCTION add_single_revenue(
    p_service_id TEXT,
    p_month VARCHAR(4),
    p_amount DECIMAL
) RETURNS void AS $$
BEGIN
    INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
    VALUES (p_service_id, p_month, p_amount)
    ON CONFLICT (service_id, revenue_month) 
    DO UPDATE SET revenue_amount = EXCLUDED.revenue_amount;
END;
$$ LANGUAGE plpgsql;

-- 사용 예시
/*
-- 1. CSV를 gtm_sales 임시 테이블에 import 후
SELECT add_month_from_temp_table('2507');

-- 2. 개별 데이터 추가
SELECT add_single_revenue('0888-7065-9003', '2507', 19500000);

-- 3. 여러 데이터 한번에
INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
VALUES 
    ('0888-7065-9003', '2507', 19500000),
    ('0888-7065-9009', '2507', 19500000),
    ('0888-7065-1034', '2507', 1850000)
ON CONFLICT (service_id, revenue_month) 
DO UPDATE SET revenue_amount = EXCLUDED.revenue_amount;
*/