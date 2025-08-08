-- VPN 연결 정보 테이블 생성
CREATE TABLE vpn_connections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    a_end_pop TEXT, -- 해외사업자 연동 PoP
    b_end_address TEXT, -- 고객사 해외 주소
    country TEXT NOT NULL,
    city TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_vpn_connections_customer ON vpn_connections(customer);
CREATE INDEX idx_vpn_connections_country ON vpn_connections(country);
CREATE INDEX idx_vpn_connections_city ON vpn_connections(city);
CREATE INDEX idx_vpn_connections_pop ON vpn_connections(a_end_pop);

-- Row Level Security (RLS) 활성화
ALTER TABLE vpn_connections ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 모든 사용자가 읽기 가능
CREATE POLICY "Allow read access for all users" ON vpn_connections
    FOR SELECT USING (true);

-- RLS 정책: 인증된 사용자만 삽입 가능  
CREATE POLICY "Allow insert for authenticated users" ON vpn_connections
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS 정책: 인증된 사용자만 업데이트 가능
CREATE POLICY "Allow update for authenticated users" ON vpn_connections
    FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS 정책: 인증된 사용자만 삭제 가능
CREATE POLICY "Allow delete for authenticated users" ON vpn_connections
    FOR DELETE USING (auth.role() = 'authenticated');

-- 테이블 설명 추가
COMMENT ON TABLE vpn_connections IS 'VPN 연결 정보 및 고객사 해외 주소 데이터';
COMMENT ON COLUMN vpn_connections.customer IS '고객사명';
COMMENT ON COLUMN vpn_connections.customer_name IS '고객사 상세명';
COMMENT ON COLUMN vpn_connections.a_end_pop IS 'A-end 해외사업자 연동 PoP';
COMMENT ON COLUMN vpn_connections.b_end_address IS 'B-end 고객사 해외 주소';
COMMENT ON COLUMN vpn_connections.country IS '국가';
COMMENT ON COLUMN vpn_connections.city IS '도시'; 