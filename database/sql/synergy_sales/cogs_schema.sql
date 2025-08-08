-- COGS (Cost of Goods Sold) 테이블 생성
CREATE TABLE cogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    region TEXT NOT NULL, -- 'mumbai' 또는 'chennai'
    year INTEGER NOT NULL, -- 2025, 2026, 2027, 2028, 2029
    cogs_value DECIMAL(15,2) NOT NULL, -- COGS 값
    description TEXT, -- 설명
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(region, year)
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_cogs_region ON cogs(region);
CREATE INDEX idx_cogs_year ON cogs(year);
CREATE INDEX idx_cogs_region_year ON cogs(region, year);

-- Row Level Security (RLS) 활성화
ALTER TABLE cogs ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 모든 사용자가 읽기 가능
CREATE POLICY "Enable read access for all users" ON cogs
    FOR SELECT USING (true);

-- RLS 정책: 인증된 사용자만 삽입 가능  
CREATE POLICY "Enable insert for authenticated users only" ON cogs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS 정책: 인증된 사용자만 업데이트 가능
CREATE POLICY "Enable update for authenticated users only" ON cogs
    FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS 정책: 인증된 사용자만 삭제 가능
CREATE POLICY "Enable delete for authenticated users only" ON cogs
    FOR DELETE USING (auth.role() = 'authenticated');

-- 테이블 설명 추가
COMMENT ON TABLE cogs IS 'COGS (Cost of Goods Sold) 데이터 - 지역별, 연도별';
COMMENT ON COLUMN cogs.region IS '지역 (mumbai, chennai)';
COMMENT ON COLUMN cogs.year IS '연도 (2025-2029)';
COMMENT ON COLUMN cogs.cogs_value IS 'COGS 값 (원)';
COMMENT ON COLUMN cogs.description IS '설명';

-- 기본 데이터 삽입 (하드코딩된 값들을 기본값으로 사용)
INSERT INTO cogs (region, year, cogs_value, description) VALUES
-- Mumbai COGS 데이터
('mumbai', 2025, 20820, 'Mumbai 2025년 COGS'),
('mumbai', 2026, 43440, 'Mumbai 2026년 COGS'),
('mumbai', 2027, 67740, 'Mumbai 2027년 COGS'),
('mumbai', 2028, 93840, 'Mumbai 2028년 COGS'),
('mumbai', 2029, 122040, 'Mumbai 2029년 COGS'),

-- Chennai COGS 데이터
('chennai', 2025, 55520, 'Chennai 2025년 COGS'),
('chennai', 2026, 111040, 'Chennai 2026년 COGS'),
('chennai', 2027, 166560, 'Chennai 2027년 COGS'),
('chennai', 2028, 222080, 'Chennai 2028년 COGS'),
('chennai', 2029, 277600, 'Chennai 2029년 COGS')
ON CONFLICT (region, year) DO NOTHING; 