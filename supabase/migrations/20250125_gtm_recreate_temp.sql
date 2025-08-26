-- 기존 테이블 삭제 후 재생성 (중복 허용)

-- 1. 기존 임시 테이블 삭제
DROP TABLE IF EXISTS gtm_sales CASCADE;

-- 2. 임시 테이블 재생성 (service_id 중복 허용)
CREATE TABLE gtm_sales (
    id BIGSERIAL PRIMARY KEY,
    
    -- CSV 헤더와 일치하는 컬럼들 (중복 허용)
    division TEXT,
    settlement_type TEXT,
    bm_manager TEXT,
    settlement_manager TEXT,
    customer_name TEXT,
    domestic_overseas TEXT,
    channel TEXT,
    customer_group TEXT,
    service_type TEXT,
    service_id TEXT,                  -- UNIQUE 제약조건 없음
    pop TEXT,
    capacity TEXT,
    capacity_unit TEXT,
    
    -- 월별 매출액
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
    revenue_2408 DECIMAL(15,2),
    
    -- 메타데이터
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 추가 (성능 향상용)
CREATE INDEX idx_gtm_sales_temp_service_id ON gtm_sales(service_id);
CREATE INDEX idx_gtm_sales_temp_customer ON gtm_sales(customer_name);

-- 확인
SELECT 'Table gtm_sales recreated - duplicates allowed' as status;