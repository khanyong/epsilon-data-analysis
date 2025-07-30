-- KT PoPs 테이블 생성
CREATE TABLE IF NOT EXISTS public.kt_pops (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    establishment TEXT,
    city TEXT,
    country TEXT,
    region TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- RLS (Row Level Security) 활성화
ALTER TABLE public.kt_pops ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (있을 경우)
DROP POLICY IF EXISTS "kt_pops_read_policy" ON public.kt_pops;
DROP POLICY IF EXISTS "kt_pops_write_policy" ON public.kt_pops;

-- 읽기 권한 정책 (모든 사용자가 읽을 수 있도록)
CREATE POLICY "Enable read access for all users" ON public.kt_pops
    FOR SELECT USING (true);

-- 쓰기 권한 정책 (인증된 사용자만 쓸 수 있도록)
CREATE POLICY "Enable insert for authenticated users only" ON public.kt_pops
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON public.kt_pops
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON public.kt_pops
    FOR DELETE USING (auth.role() = 'authenticated');

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_kt_pops_location ON public.kt_pops(location);
CREATE INDEX IF NOT EXISTS idx_kt_pops_country ON public.kt_pops(country);
CREATE INDEX IF NOT EXISTS idx_kt_pops_region ON public.kt_pops(region);
CREATE INDEX IF NOT EXISTS idx_kt_pops_city ON public.kt_pops(city);

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_kt_pops_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS kt_pops_updated_at_trigger ON public.kt_pops;
CREATE TRIGGER kt_pops_updated_at_trigger
    BEFORE UPDATE ON public.kt_pops
    FOR EACH ROW
    EXECUTE FUNCTION update_kt_pops_updated_at();

-- 코멘트 추가
COMMENT ON TABLE public.kt_pops IS 'KT Point of Presence (PoP) 위치 정보';
COMMENT ON COLUMN public.kt_pops.location IS 'PoP 위치명';
COMMENT ON COLUMN public.kt_pops.address IS '상세 주소';
COMMENT ON COLUMN public.kt_pops.establishment IS '설치/개설일';
COMMENT ON COLUMN public.kt_pops.city IS '도시명';
COMMENT ON COLUMN public.kt_pops.country IS '국가명';
COMMENT ON COLUMN public.kt_pops.region IS '지역 (APAC, AMERICAS, EUROPE, MEA)'; 