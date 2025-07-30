-- Hyundai Motors 글로벌 법인 및 시설 테이블 생성
CREATE TABLE hyundai_motors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name TEXT NOT NULL,
    group_subsidiary TEXT,
    entity_name_code TEXT,
    function TEXT,
    region TEXT,
    region_detail TEXT,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_hyundai_motors_country ON hyundai_motors(country);
CREATE INDEX idx_hyundai_motors_city ON hyundai_motors(city);
CREATE INDEX idx_hyundai_motors_region ON hyundai_motors(region);
CREATE INDEX idx_hyundai_motors_company ON hyundai_motors(company_name);
CREATE INDEX idx_hyundai_motors_function ON hyundai_motors(function);

-- Row Level Security (RLS) 활성화
ALTER TABLE hyundai_motors ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 모든 사용자가 읽기 가능
CREATE POLICY "Enable read access for all users" ON hyundai_motors
    FOR SELECT USING (true);

-- RLS 정책: 인증된 사용자만 삽입 가능  
CREATE POLICY "Enable insert for authenticated users only" ON hyundai_motors
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS 정책: 인증된 사용자만 업데이트 가능
CREATE POLICY "Enable update for authenticated users only" ON hyundai_motors
    FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS 정책: 인증된 사용자만 삭제 가능
CREATE POLICY "Enable delete for authenticated users only" ON hyundai_motors
    FOR DELETE USING (auth.role() = 'authenticated');

-- 테이블 설명 추가
COMMENT ON TABLE hyundai_motors IS 'Hyundai Motor Group 글로벌 법인 및 시설 정보';
COMMENT ON COLUMN hyundai_motors.company_name IS '회사명 (Hyundai Motors, Kia Motors, etc.)';
COMMENT ON COLUMN hyundai_motors.group_subsidiary IS '그룹/계열사 구분';
COMMENT ON COLUMN hyundai_motors.entity_name_code IS '법인명/코드';
COMMENT ON COLUMN hyundai_motors.function IS '기능 (Sales Entity, Production entity, Laboratory, etc.)';
COMMENT ON COLUMN hyundai_motors.region IS '지역 (Asia, Europe, Americas, etc.)';
COMMENT ON COLUMN hyundai_motors.region_detail IS '세부 지역';
COMMENT ON COLUMN hyundai_motors.country IS '국가';
COMMENT ON COLUMN hyundai_motors.city IS '도시';
COMMENT ON COLUMN hyundai_motors.postal_address IS '우편 주소'; 