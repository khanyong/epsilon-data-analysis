-- GTM 활성 고객 카테고리 테이블
CREATE TABLE IF NOT EXISTS gtm_active_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name_kr VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    company_count INTEGER NOT NULL DEFAULT 0,
    total_amount DECIMAL(15, 2) NOT NULL DEFAULT 0, -- 원 단위
    total_amount_billions DECIMAL(10, 4) NOT NULL DEFAULT 0, -- 조 원 단위
    avg_per_company DECIMAL(15, 2) NOT NULL DEFAULT 0, -- 원 단위
    avg_per_company_billions DECIMAL(10, 4) NOT NULL DEFAULT 0, -- 조 원 단위
    percentage DECIMAL(5, 2) NOT NULL DEFAULT 0, -- 전체 대비 비율
    color_class VARCHAR(50), -- UI 표시용 색상 클래스
    display_order INTEGER, -- 표시 순서
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_gtm_active_categories_name_en ON gtm_active_categories(name_en);
CREATE INDEX idx_gtm_active_categories_total_amount ON gtm_active_categories(total_amount_billions DESC);
CREATE INDEX idx_gtm_active_categories_company_count ON gtm_active_categories(company_count DESC);

-- GTM 활성 고객 상세 정보 테이블 (선택적 - 향후 확장용)
CREATE TABLE IF NOT EXISTS gtm_active_customers_detail (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES gtm_active_categories(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    company_code VARCHAR(50),
    contract_amount DECIMAL(15, 2),
    contract_start_date DATE,
    contract_end_date DATE,
    service_type VARCHAR(100),
    account_manager VARCHAR(100),
    notes TEXT,
    is_strategic_account BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_gtm_active_customers_detail_category ON gtm_active_customers_detail(category_id);
CREATE INDEX idx_gtm_active_customers_detail_company ON gtm_active_customers_detail(company_name);
CREATE INDEX idx_gtm_active_customers_detail_strategic ON gtm_active_customers_detail(is_strategic_account);

-- GTM 활성 고객 통계 요약 테이블
CREATE TABLE IF NOT EXISTS gtm_active_summary (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    total_company_count INTEGER NOT NULL DEFAULT 0,
    total_amount DECIMAL(15, 2) NOT NULL DEFAULT 0,
    total_amount_billions DECIMAL(10, 4) NOT NULL DEFAULT 0,
    category_count INTEGER NOT NULL DEFAULT 0,
    average_per_company DECIMAL(15, 2) NOT NULL DEFAULT 0,
    average_per_company_billions DECIMAL(10, 4) NOT NULL DEFAULT 0,
    top_category_id UUID REFERENCES gtm_active_categories(id),
    data_source VARCHAR(100), -- 'excel', 'manual', 'api' 등
    import_date DATE,
    import_file_name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GTM 활성 고객 이력 테이블 (시계열 분석용)
CREATE TABLE IF NOT EXISTS gtm_active_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES gtm_active_categories(id),
    snapshot_date DATE NOT NULL,
    company_count INTEGER NOT NULL DEFAULT 0,
    total_amount DECIMAL(15, 2) NOT NULL DEFAULT 0,
    total_amount_billions DECIMAL(10, 4) NOT NULL DEFAULT 0,
    month_over_month_growth DECIMAL(5, 2), -- 전월 대비 성장률
    year_over_year_growth DECIMAL(5, 2), -- 전년 대비 성장률
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_gtm_active_history_category ON gtm_active_history(category_id);
CREATE INDEX idx_gtm_active_history_date ON gtm_active_history(snapshot_date DESC);

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
CREATE TRIGGER update_gtm_active_categories_updated_at
    BEFORE UPDATE ON gtm_active_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gtm_active_customers_detail_updated_at
    BEFORE UPDATE ON gtm_active_customers_detail
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gtm_active_summary_updated_at
    BEFORE UPDATE ON gtm_active_summary
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 초기 데이터 삽입 (analyze_gtm_excel.py 결과 기반)
INSERT INTO gtm_active_categories (name_kr, name_en, company_count, total_amount, total_amount_billions, avg_per_company, avg_per_company_billions, percentage, color_class, display_order) VALUES
('AX', 'AX', 40, 7304346588, 7.3043, 182608664.7, 0.1826, 23.4, 'bg-blue-500', 1),
('CP', 'Content Provider', 16, 6369302460, 6.3693, 398081403.75, 0.3981, 20.4, 'bg-green-500', 2),
('서비스', 'Services', 36, 3492617670, 3.4926, 97017157.5, 0.097, 11.2, 'bg-cyan-500', 3),
('물류', 'Logistics', 24, 3354615590, 3.3546, 139775649.58, 0.1398, 10.7, 'bg-indigo-500', 4),
('금융', 'Finance', 24, 2893507590, 2.8935, 120562816.25, 0.1206, 9.3, 'bg-yellow-500', 5),
('미디어', 'Media', 41, 2021502600, 2.0215, 49280063.41, 0.0493, 6.5, 'bg-red-500', 6),
('기타', 'Other', 59, 1812307980, 1.8123, 30716237.63, 0.0307, 5.8, 'bg-stone-500', 7),
('유통', 'Distribution', 18, 1298411400, 1.2984, 72133966.67, 0.0721, 4.2, 'bg-amber-500', 8),
('제조', 'Manufacturing', 34, 1273514220, 1.2735, 37456300.59, 0.0375, 4.1, 'bg-slate-500', 9),
('IT', 'IT Services', 29, 641924000, 0.6419, 22135310.34, 0.0221, 2.1, 'bg-purple-500', 10),
('게임', 'Gaming', 20, 408100000, 0.4081, 20405000, 0.0204, 1.3, 'bg-pink-500', 11),
('Telco', 'Telecommunications', 10, 302700000, 0.3027, 30270000, 0.0303, 1.0, 'bg-orange-500', 12),
('의료', 'Healthcare', 9, 75800000, 0.0758, 8422222.22, 0.0084, 0.2, 'bg-emerald-500', 13),
('보안', 'Security', 9, 52600000, 0.0526, 5844444.44, 0.0058, 0.2, 'bg-gray-500', 14),
('에너지', 'Energy', 8, 37300000, 0.0373, 4662500, 0.0047, 0.1, 'bg-lime-500', 15),
('부동산', 'Real Estate', 7, 37200000, 0.0372, 5314285.71, 0.0053, 0.1, 'bg-teal-500', 16);

-- 요약 데이터 삽입
INSERT INTO gtm_active_summary (
    total_company_count,
    total_amount,
    total_amount_billions,
    category_count,
    average_per_company,
    average_per_company_billions,
    data_source,
    import_date,
    import_file_name
) VALUES (
    384,
    31204827308,
    31.2048,
    16,
    81262571.63,
    0.0813,
    'excel',
    CURRENT_DATE,
    'GTM-data-active.xlsx'
);

-- Row Level Security (RLS) 정책 설정
ALTER TABLE gtm_active_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gtm_active_customers_detail ENABLE ROW LEVEL SECURITY;
ALTER TABLE gtm_active_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE gtm_active_history ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능
CREATE POLICY "Enable read access for all users" ON gtm_active_categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON gtm_active_customers_detail FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON gtm_active_summary FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON gtm_active_history FOR SELECT USING (true);

-- 인증된 사용자만 쓰기 가능 (향후 관리자 권한 추가 가능)
CREATE POLICY "Enable insert for authenticated users" ON gtm_active_categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON gtm_active_categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON gtm_active_categories FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON gtm_active_customers_detail FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON gtm_active_customers_detail FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON gtm_active_customers_detail FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON gtm_active_summary FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON gtm_active_summary FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON gtm_active_summary FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON gtm_active_history FOR INSERT WITH CHECK (auth.role() = 'authenticated');