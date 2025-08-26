-- 나머지 504개 데이터 INSERT (중복 처리 포함)
-- service_id 중복 시 매출액을 합산

-- 임시 테이블의 service_id를 UNIQUE로 변경
ALTER TABLE gtm_sales DROP CONSTRAINT IF EXISTS gtm_sales_service_id_unique;
ALTER TABLE gtm_sales ADD CONSTRAINT gtm_sales_service_id_unique UNIQUE (service_id);

-- 또는 중복을 허용하려면 위 제약조건을 추가하지 않고
-- transform_gtm_sales_to_flexible() 함수가 처리하도록 함

-- 나머지 데이터를 먼저 입력 (중복 허용)
-- insert_remaining_data.sql 파일 실행

-- 그 다음 변환 함수 실행
SELECT transform_gtm_sales_to_flexible();

-- 변환 후 중복 확인
WITH duplicate_check AS (
    SELECT 
        service_id,
        COUNT(*) as count,
        SUM(revenue_amount) as total_revenue
    FROM gtm_sales_revenues
    WHERE revenue_month = '2506'
    GROUP BY service_id
    HAVING COUNT(*) > 1
)
SELECT * FROM duplicate_check;