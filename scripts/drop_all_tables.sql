-- Euro Pricing 모든 테이블 삭제 스크립트
-- Supabase SQL Editor에서 실행

-- 모든 테이블 삭제
DROP TABLE IF EXISTS euro_pricing_home CASCADE;
DROP TABLE IF EXISTS euro_pricing_charts CASCADE;
DROP TABLE IF EXISTS euro_pricing_regions CASCADE;
DROP TABLE IF EXISTS euro_pricing_countries CASCADE;
DROP TABLE IF EXISTS euro_pricing_country_routes CASCADE;
DROP TABLE IF EXISTS euro_pricing_wholesale_prices CASCADE;
DROP TABLE IF EXISTS euro_pricing_route_summary CASCADE;
DROP TABLE IF EXISTS euro_pricing_trans_atlantic CASCADE;
DROP TABLE IF EXISTS euro_pricing_trans_pacific CASCADE;
DROP TABLE IF EXISTS euro_pricing_us_latin_america CASCADE;
DROP TABLE IF EXISTS euro_pricing_intra_asia CASCADE;
DROP TABLE IF EXISTS euro_pricing_europe_middle_east_and_egypt CASCADE;
DROP TABLE IF EXISTS euro_pricing_europe_east_asia CASCADE;
DROP TABLE IF EXISTS euro_pricing_europe_south_asia CASCADE;
DROP TABLE IF EXISTS euro_pricing_east_asia_south_asia CASCADE;
DROP TABLE IF EXISTS euro_pricing_europe_sub_saharan_africa CASCADE;
DROP TABLE IF EXISTS euro_pricing_trans_atl_lit_v_potential CASCADE;
DROP TABLE IF EXISTS euro_pricing_trans_pac_lit_v_potential CASCADE;
DROP TABLE IF EXISTS euro_pricing_us_latam_lit_v_potential CASCADE;
DROP TABLE IF EXISTS euro_pricing_lease_iru_calculator CASCADE;

SELECT 'All Euro Pricing tables have been dropped successfully!' as message;