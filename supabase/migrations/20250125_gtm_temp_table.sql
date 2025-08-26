-- CSV Import를 위한 임시 테이블 (옵션 B - 2단계)
-- 이 테이블은 CSV 파일 구조와 정확히 일치합니다

DROP TABLE IF EXISTS gtm_sales CASCADE;

CREATE TABLE gtm_sales (
    id BIGSERIAL PRIMARY KEY,
    
    -- CSV 헤더와 일치하는 컬럼들
    division TEXT,
    settlement_type TEXT,
    bm_manager TEXT,
    settlement_manager TEXT,
    customer_name TEXT,
    domestic_overseas TEXT,
    channel TEXT,
    customer_group TEXT,
    service_type TEXT,
    service_id TEXT,
    pop TEXT,
    capacity TEXT,
    capacity_unit TEXT,
    
    -- 월별 매출액 (CSV 컬럼 순서와 동일)
    revenue_2506 DECIMAL(15,2),
    revenue_2505 DECIMAL(15,2),
    revenue_2504 DECIMAL(15,2),
    revenue_2503 DECIMAL(15,2),
    revenue_2502 DECIMAL(15,2),
    revenue_2501 DECIMAL(15,2),
    revenue_2412 DECIMAL(15,2),
    revenue_2411 DECIMAL(15,2),
    revenue_2410 DECIMAL(15,2),
    revenue_2409 DECIMAL(15,2),
    revenue_2408 DECIMAL(15,2)
);