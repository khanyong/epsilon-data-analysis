-- Euro Pricing Tables Creation Script for Supabase
-- Run this script in Supabase SQL Editor

-- 1. Home 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_home (
    id SERIAL PRIMARY KEY,
    unnamed_0 TEXT,
    unnamed_1 TEXT,
    unnamed_2 TEXT,
    unnamed_3 TEXT,
    unnamed_4 TEXT,
    unnamed_5 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Charts 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_charts (
    id SERIAL PRIMARY KEY,
    charts TEXT,
    unnamed_1 TEXT,
    unnamed_2 TEXT,
    unnamed_3 TEXT,
    unnamed_4 TEXT,
    unnamed_5 TEXT,
    unnamed_6 TEXT,
    unnamed_7 TEXT,
    unnamed_8 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Regions 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_regions (
    id SERIAL PRIMARY KEY,
    used_international_bandwidth_by_region TEXT,
    unnamed_1 TEXT,
    unnamed_2 TEXT,
    unnamed_3 TEXT,
    unnamed_4 TEXT,
    unnamed_5 TEXT,
    unnamed_6 TEXT,
    unnamed_7 TEXT,
    unnamed_8 TEXT,
    unnamed_9 TEXT,
    unnamed_10 TEXT,
    unnamed_11 TEXT,
    unnamed_12 TEXT,
    unnamed_13 TEXT,
    unnamed_14 TEXT,
    unnamed_15 TEXT,
    unnamed_16 TEXT,
    unnamed_17 TEXT,
    unnamed_18 TEXT,
    unnamed_19 TEXT,
    unnamed_20 TEXT,
    unnamed_21 TEXT,
    unnamed_22 TEXT,
    unnamed_23 TEXT,
    unnamed_24 TEXT,
    unnamed_25 TEXT,
    unnamed_26 TEXT,
    unnamed_27 TEXT,
    unnamed_28 TEXT,
    unnamed_29 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. Countries 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_countries (
    id SERIAL PRIMARY KEY,
    used_international_bandwidth_by_country TEXT,
    unnamed_1 TEXT,
    unnamed_2 TEXT,
    unnamed_3 TEXT,
    unnamed_4 TEXT,
    unnamed_5 TEXT,
    unnamed_6 TEXT,
    unnamed_7 TEXT,
    unnamed_8 TEXT,
    unnamed_9 TEXT,
    unnamed_10 TEXT,
    unnamed_11 TEXT,
    unnamed_12 TEXT,
    unnamed_13 TEXT,
    unnamed_14 TEXT,
    unnamed_15 TEXT,
    unnamed_16 TEXT,
    unnamed_17 TEXT,
    unnamed_18 TEXT,
    unnamed_19 TEXT,
    unnamed_20 TEXT,
    unnamed_21 TEXT,
    unnamed_22 TEXT,
    unnamed_23 TEXT,
    unnamed_24 TEXT,
    unnamed_25 TEXT,
    unnamed_26 TEXT,
    unnamed_27 TEXT,
    unnamed_28 TEXT,
    unnamed_29 TEXT,
    unnamed_30 TEXT,
    unnamed_31 TEXT,
    unnamed_32 TEXT,
    unnamed_33 TEXT,
    unnamed_34 TEXT,
    unnamed_35 TEXT,
    unnamed_36 TEXT,
    unnamed_37 TEXT,
    unnamed_38 TEXT,
    unnamed_39 TEXT,
    unnamed_40 TEXT,
    unnamed_41 TEXT,
    unnamed_42 TEXT,
    unnamed_43 TEXT,
    unnamed_44 TEXT,
    unnamed_45 TEXT,
    unnamed_46 TEXT,
    unnamed_47 TEXT,
    unnamed_48 TEXT,
    unnamed_49 TEXT,
    unnamed_50 TEXT,
    unnamed_51 TEXT,
    unnamed_52 TEXT,
    unnamed_53 TEXT,
    unnamed_54 TEXT,
    unnamed_55 TEXT,
    unnamed_56 TEXT,
    unnamed_57 TEXT,
    unnamed_58 TEXT,
    unnamed_59 TEXT,
    unnamed_60 TEXT,
    unnamed_61 TEXT,
    unnamed_62 TEXT,
    unnamed_63 TEXT,
    unnamed_64 TEXT,
    unnamed_65 TEXT,
    unnamed_66 TEXT,
    unnamed_67 TEXT,
    unnamed_68 TEXT,
    unnamed_69 TEXT,
    unnamed_70 TEXT,
    unnamed_71 TEXT,
    unnamed_72 TEXT,
    unnamed_73 TEXT,
    unnamed_74 TEXT,
    unnamed_75 TEXT,
    unnamed_76 TEXT,
    unnamed_77 TEXT,
    unnamed_78 TEXT,
    unnamed_79 TEXT,
    unnamed_80 TEXT,
    unnamed_81 TEXT,
    unnamed_82 TEXT,
    unnamed_83 TEXT,
    unnamed_84 TEXT,
    unnamed_85 TEXT,
    unnamed_86 TEXT,
    unnamed_87 TEXT,
    unnamed_88 TEXT,
    unnamed_89 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 5. Country Routes 테이블 (가장 중요한 데이터)
CREATE TABLE IF NOT EXISTS euro_pricing_country_routes (
    id SERIAL PRIMARY KEY,
    country1 TEXT,
    country2 TEXT,
    subregion1 TEXT,
    subregion2 TEXT,
    region1 TEXT,
    region2 TEXT,
    year_2017 NUMERIC,
    year_2018 NUMERIC,
    year_2019 NUMERIC,
    year_2020 NUMERIC,
    year_2021 NUMERIC,
    year_2022 NUMERIC,
    year_2023 NUMERIC,
    year_2024 NUMERIC,
    year_2025 NUMERIC,
    year_2026 NUMERIC,
    year_2027 NUMERIC,
    year_2028 NUMERIC,
    year_2029 NUMERIC,
    year_2030 NUMERIC,
    cagr_2023_30 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 6. Wholesale Prices 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_wholesale_prices (
    id SERIAL PRIMARY KEY,
    route_name TEXT,
    year_2017 NUMERIC,
    year_2018 NUMERIC,
    year_2019 NUMERIC,
    year_2020 NUMERIC,
    year_2021 NUMERIC,
    year_2022 NUMERIC,
    year_2023 NUMERIC,
    year_2024 NUMERIC,
    year_2025 NUMERIC,
    year_2026 NUMERIC,
    year_2027 NUMERIC,
    year_2028 NUMERIC,
    year_2029 NUMERIC,
    year_2030 NUMERIC,
    cagr_2023_30 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 7. Route Summary 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_route_summary (
    id SERIAL PRIMARY KEY,
    submarine_cable_route_summary TEXT,
    unnamed_1 TEXT,
    unnamed_2 TEXT,
    unnamed_3 TEXT,
    unnamed_4 TEXT,
    unnamed_5 TEXT,
    unnamed_6 TEXT,
    unnamed_7 TEXT,
    unnamed_8 TEXT,
    unnamed_9 TEXT,
    unnamed_10 TEXT,
    unnamed_11 TEXT,
    unnamed_12 TEXT,
    unnamed_13 TEXT,
    unnamed_14 TEXT,
    unnamed_15 TEXT,
    unnamed_16 TEXT,
    unnamed_17 TEXT,
    unnamed_18 TEXT,
    unnamed_19 TEXT,
    unnamed_20 TEXT,
    unnamed_21 TEXT,
    unnamed_22 TEXT,
    unnamed_23 TEXT,
    unnamed_24 TEXT,
    unnamed_25 TEXT,
    unnamed_26 TEXT,
    unnamed_27 TEXT,
    unnamed_28 TEXT,
    unnamed_29 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 8. Trans-Atlantic 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_trans_atlantic (
    id SERIAL PRIMARY KEY,
    metric_name TEXT,
    year_2017 NUMERIC,
    year_2018 NUMERIC,
    year_2019 NUMERIC,
    year_2020 NUMERIC,
    year_2021 NUMERIC,
    year_2022 NUMERIC,
    year_2023 NUMERIC,
    year_2024 NUMERIC,
    year_2025 NUMERIC,
    year_2026 NUMERIC,
    year_2027 NUMERIC,
    year_2028 NUMERIC,
    year_2029 NUMERIC,
    year_2030 NUMERIC,
    change_2018 NUMERIC,
    change_2019 NUMERIC,
    change_2020 NUMERIC,
    change_2021 NUMERIC,
    change_2022 NUMERIC,
    change_2023 NUMERIC,
    change_2024 NUMERIC,
    change_2025 NUMERIC,
    change_2026 NUMERIC,
    change_2027 NUMERIC,
    change_2028 NUMERIC,
    change_2029 NUMERIC,
    change_2030 NUMERIC,
    cagr_2023_30 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 9. Trans-Pacific 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_trans_pacific (
    id SERIAL PRIMARY KEY,
    metric_name TEXT,
    year_2017 NUMERIC,
    year_2018 NUMERIC,
    year_2019 NUMERIC,
    year_2020 NUMERIC,
    year_2021 NUMERIC,
    year_2022 NUMERIC,
    year_2023 NUMERIC,
    year_2024 NUMERIC,
    year_2025 NUMERIC,
    year_2026 NUMERIC,
    year_2027 NUMERIC,
    year_2028 NUMERIC,
    year_2029 NUMERIC,
    year_2030 NUMERIC,
    change_2018 NUMERIC,
    change_2019 NUMERIC,
    change_2020 NUMERIC,
    change_2021 NUMERIC,
    change_2022 NUMERIC,
    change_2023 NUMERIC,
    change_2024 NUMERIC,
    change_2025 NUMERIC,
    change_2026 NUMERIC,
    change_2027 NUMERIC,
    change_2028 NUMERIC,
    change_2029 NUMERIC,
    change_2030 NUMERIC,
    cagr_2023_30 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 10. US-Latin America 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_us_latin_america (
    id SERIAL PRIMARY KEY,
    metric_name TEXT,
    year_2017 NUMERIC,
    year_2018 NUMERIC,
    year_2019 NUMERIC,
    year_2020 NUMERIC,
    year_2021 NUMERIC,
    year_2022 NUMERIC,
    year_2023 NUMERIC,
    year_2024 NUMERIC,
    year_2025 NUMERIC,
    year_2026 NUMERIC,
    year_2027 NUMERIC,
    year_2028 NUMERIC,
    year_2029 NUMERIC,
    year_2030 NUMERIC,
    change_2018 NUMERIC,
    change_2019 NUMERIC,
    change_2020 NUMERIC,
    change_2021 NUMERIC,
    change_2022 NUMERIC,
    change_2023 NUMERIC,
    change_2024 NUMERIC,
    change_2025 NUMERIC,
    change_2026 NUMERIC,
    change_2027 NUMERIC,
    change_2028 NUMERIC,
    change_2029 NUMERIC,
    change_2030 NUMERIC,
    cagr_2023_30 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 11. Intra-Asia 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_intra_asia (
    id SERIAL PRIMARY KEY,
    metric_name TEXT,
    year_2017 NUMERIC,
    year_2018 NUMERIC,
    year_2019 NUMERIC,
    year_2020 NUMERIC,
    year_2021 NUMERIC,
    year_2022 NUMERIC,
    year_2023 NUMERIC,
    year_2024 NUMERIC,
    year_2025 NUMERIC,
    year_2026 NUMERIC,
    year_2027 NUMERIC,
    year_2028 NUMERIC,
    year_2029 NUMERIC,
    year_2030 NUMERIC,
    change_2018 NUMERIC,
    change_2019 NUMERIC,
    change_2020 NUMERIC,
    change_2021 NUMERIC,
    change_2022 NUMERIC,
    change_2023 NUMERIC,
    change_2024 NUMERIC,
    change_2025 NUMERIC,
    change_2026 NUMERIC,
    change_2027 NUMERIC,
    change_2028 NUMERIC,
    change_2029 NUMERIC,
    change_2030 NUMERIC,
    cagr_2023_30 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 12. Europe-Middle East & Egypt 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_europe_middle_east_and_egypt (
    id SERIAL PRIMARY KEY,
    metric_name TEXT,
    year_2017 NUMERIC,
    year_2018 NUMERIC,
    year_2019 NUMERIC,
    year_2020 NUMERIC,
    year_2021 NUMERIC,
    year_2022 NUMERIC,
    year_2023 NUMERIC,
    year_2024 NUMERIC,
    year_2025 NUMERIC,
    year_2026 NUMERIC,
    year_2027 NUMERIC,
    year_2028 NUMERIC,
    year_2029 NUMERIC,
    year_2030 NUMERIC,
    change_2018 NUMERIC,
    change_2019 NUMERIC,
    change_2020 NUMERIC,
    change_2021 NUMERIC,
    change_2022 NUMERIC,
    change_2023 NUMERIC,
    change_2024 NUMERIC,
    change_2025 NUMERIC,
    change_2026 NUMERIC,
    change_2027 NUMERIC,
    change_2028 NUMERIC,
    change_2029 NUMERIC,
    change_2030 NUMERIC,
    cagr_2023_30 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 13. Europe-East Asia 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_europe_east_asia (
    id SERIAL PRIMARY KEY,
    metric_name TEXT,
    year_2017 NUMERIC,
    year_2018 NUMERIC,
    year_2019 NUMERIC,
    year_2020 NUMERIC,
    year_2021 NUMERIC,
    year_2022 NUMERIC,
    year_2023 NUMERIC,
    year_2024 NUMERIC,
    year_2025 NUMERIC,
    year_2026 NUMERIC,
    year_2027 NUMERIC,
    year_2028 NUMERIC,
    year_2029 NUMERIC,
    year_2030 NUMERIC,
    change_2018 NUMERIC,
    change_2019 NUMERIC,
    change_2020 NUMERIC,
    change_2021 NUMERIC,
    change_2022 NUMERIC,
    change_2023 NUMERIC,
    change_2024 NUMERIC,
    change_2025 NUMERIC,
    change_2026 NUMERIC,
    change_2027 NUMERIC,
    change_2028 NUMERIC,
    change_2029 NUMERIC,
    change_2030 NUMERIC,
    cagr_2023_30 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 14. Europe-South Asia 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_europe_south_asia (
    id SERIAL PRIMARY KEY,
    metric_name TEXT,
    year_2017 NUMERIC,
    year_2018 NUMERIC,
    year_2019 NUMERIC,
    year_2020 NUMERIC,
    year_2021 NUMERIC,
    year_2022 NUMERIC,
    year_2023 NUMERIC,
    year_2024 NUMERIC,
    year_2025 NUMERIC,
    year_2026 NUMERIC,
    year_2027 NUMERIC,
    year_2028 NUMERIC,
    year_2029 NUMERIC,
    year_2030 NUMERIC,
    change_2018 NUMERIC,
    change_2019 NUMERIC,
    change_2020 NUMERIC,
    change_2021 NUMERIC,
    change_2022 NUMERIC,
    change_2023 NUMERIC,
    change_2024 NUMERIC,
    change_2025 NUMERIC,
    change_2026 NUMERIC,
    change_2027 NUMERIC,
    change_2028 NUMERIC,
    change_2029 NUMERIC,
    change_2030 NUMERIC,
    cagr_2023_30 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 15. East Asia-South Asia 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_east_asia_south_asia (
    id SERIAL PRIMARY KEY,
    metric_name TEXT,
    year_2017 NUMERIC,
    year_2018 NUMERIC,
    year_2019 NUMERIC,
    year_2020 NUMERIC,
    year_2021 NUMERIC,
    year_2022 NUMERIC,
    year_2023 NUMERIC,
    year_2024 NUMERIC,
    year_2025 NUMERIC,
    year_2026 NUMERIC,
    year_2027 NUMERIC,
    year_2028 NUMERIC,
    year_2029 NUMERIC,
    year_2030 NUMERIC,
    change_2018 NUMERIC,
    change_2019 NUMERIC,
    change_2020 NUMERIC,
    change_2021 NUMERIC,
    change_2022 NUMERIC,
    change_2023 NUMERIC,
    change_2024 NUMERIC,
    change_2025 NUMERIC,
    change_2026 NUMERIC,
    change_2027 NUMERIC,
    change_2028 NUMERIC,
    change_2029 NUMERIC,
    change_2030 NUMERIC,
    cagr_2023_30 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 16. Europe-Sub-Saharan Africa 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_europe_sub_saharan_africa (
    id SERIAL PRIMARY KEY,
    metric_name TEXT,
    year_2017 NUMERIC,
    year_2018 NUMERIC,
    year_2019 NUMERIC,
    year_2020 NUMERIC,
    year_2021 NUMERIC,
    year_2022 NUMERIC,
    year_2023 NUMERIC,
    year_2024 NUMERIC,
    year_2025 NUMERIC,
    year_2026 NUMERIC,
    year_2027 NUMERIC,
    year_2028 NUMERIC,
    year_2029 NUMERIC,
    year_2030 NUMERIC,
    change_2018 NUMERIC,
    change_2019 NUMERIC,
    change_2020 NUMERIC,
    change_2021 NUMERIC,
    change_2022 NUMERIC,
    change_2023 NUMERIC,
    change_2024 NUMERIC,
    change_2025 NUMERIC,
    change_2026 NUMERIC,
    change_2027 NUMERIC,
    change_2028 NUMERIC,
    change_2029 NUMERIC,
    change_2030 NUMERIC,
    cagr_2023_30 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 17. Trans-Atlantic Lit vs Potential 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_trans_atl_lit_v_potential (
    id SERIAL PRIMARY KEY,
    metric_name TEXT,
    unnamed_1 TEXT,
    unnamed_2 TEXT,
    unnamed_3 TEXT,
    unnamed_4 TEXT,
    unnamed_5 TEXT,
    unnamed_6 TEXT,
    unnamed_7 TEXT,
    unnamed_8 TEXT,
    unnamed_9 TEXT,
    unnamed_10 TEXT,
    unnamed_11 TEXT,
    unnamed_12 TEXT,
    unnamed_13 TEXT,
    unnamed_14 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 18. Trans-Pacific Lit vs Potential 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_trans_pac_lit_v_potential (
    id SERIAL PRIMARY KEY,
    metric_name TEXT,
    unnamed_1 TEXT,
    unnamed_2 TEXT,
    unnamed_3 TEXT,
    unnamed_4 TEXT,
    unnamed_5 TEXT,
    unnamed_6 TEXT,
    unnamed_7 TEXT,
    unnamed_8 TEXT,
    unnamed_9 TEXT,
    unnamed_10 TEXT,
    unnamed_11 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 19. US-LatAm Lit vs Potential 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_us_latam_lit_v_potential (
    id SERIAL PRIMARY KEY,
    metric_name TEXT,
    unnamed_1 TEXT,
    unnamed_2 TEXT,
    unnamed_3 TEXT,
    unnamed_4 TEXT,
    unnamed_5 TEXT,
    unnamed_6 TEXT,
    unnamed_7 TEXT,
    unnamed_8 TEXT,
    unnamed_9 TEXT,
    unnamed_10 TEXT,
    unnamed_11 TEXT,
    unnamed_12 TEXT,
    unnamed_13 TEXT,
    unnamed_14 TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 20. Lease-IRU Calculator 테이블
CREATE TABLE IF NOT EXISTS euro_pricing_lease_iru_calculator (
    id SERIAL PRIMARY KEY,
    parameter TEXT,
    value TEXT,
    unit TEXT,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 인덱스 생성 (성능 향상을 위해)
CREATE INDEX IF NOT EXISTS idx_country_routes_countries ON euro_pricing_country_routes(country1, country2);
CREATE INDEX IF NOT EXISTS idx_country_routes_regions ON euro_pricing_country_routes(region1, region2);
CREATE INDEX IF NOT EXISTS idx_wholesale_prices_route ON euro_pricing_wholesale_prices(route_name);

-- RLS (Row Level Security) 비활성화 (필요에 따라 조정)
ALTER TABLE euro_pricing_home DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_charts DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_regions DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_countries DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_country_routes DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_wholesale_prices DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_route_summary DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_trans_atlantic DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_trans_pacific DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_us_latin_america DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_intra_asia DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_europe_middle_east_and_egypt DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_europe_east_asia DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_europe_south_asia DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_east_asia_south_asia DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_europe_sub_saharan_africa DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_trans_atl_lit_v_potential DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_trans_pac_lit_v_potential DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_us_latam_lit_v_potential DISABLE ROW LEVEL SECURITY;
ALTER TABLE euro_pricing_lease_iru_calculator DISABLE ROW LEVEL SECURITY;

-- 완료 메시지
SELECT 'All Euro Pricing tables created successfully!' as message;