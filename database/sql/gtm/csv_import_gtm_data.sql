-- =====================================================
-- GTM CSV 데이터 일괄 임포트 스크립트
-- =====================================================
-- 작성일: 2025-01-21
-- 설명: CSV 파일에서 대량의 데이터를 gtm_customers 테이블로 임포트
-- 사용법: 
--   1. Supabase 대시보드에서 CSV 파일을 먼저 임시 테이블로 업로드
--   2. 이 스크립트를 실행하여 데이터 정제 및 본 테이블로 이동
-- =====================================================

-- =====================================================
-- 1. 임시 테이블 생성 (CSV 업로드용)
-- =====================================================
CREATE TABLE IF NOT EXISTS gtm_customers_temp (
  "사업기회 구분" TEXT,
  "관리고객명" TEXT,
  "관리고객ID" TEXT,
  "그룹사(모기업)" TEXT,
  "사업자번호" TEXT,
  "본부" TEXT,
  "담당" TEXT,
  "부" TEXT,
  "팀" TEXT,
  "팀장" TEXT,
  "영업대표(ITC)" TEXT,
  "24년고객사 매출(단위:억원)" TEXT,
  "25년해외사업장 보유(O/X)" TEXT,
  "25년KT 글로벌데이터사용 유무(O/X)" TEXT,
  "KT 회선 사용 규모_계약기간" TEXT,
  "KT 회선 사용 규모_월 요금(억원)" TEXT,
  "타사 글로벌데이터 사용 여부(O/X)" TEXT,
  "타사 회선 사용 규모_타사명" TEXT,
  "타사 회선 사용 규모_계약기간" TEXT,
  "타사 회선 사용 규모_월 요금(단위:억원)" TEXT,
  "재계약 시점" TEXT,
  "타사 사용현황_국제전용/MPLS-VPN" TEXT,
  "타사 사용현황_SD-WAN" TEXT,
  "타사 사용현황_인터넷VPN" TEXT,
  "고객 니즈/불편사항" TEXT,
  "비고(국가/도시 등 국제 회선 사용 현황)" TEXT
);

-- =====================================================
-- 2. CSV 데이터를 임시 테이블에 업로드
-- =====================================================
-- Supabase 대시보드에서 CSV 파일을 gtm_customers_temp 테이블로 직접 업로드
-- 또는 아래 COPY 명령 사용 (로컬 환경에서만 가능)
-- COPY gtm_customers_temp FROM '/path/to/GTM-data.csv' WITH CSV HEADER ENCODING 'UTF8';

-- =====================================================
-- 3. 데이터 정제 및 본 테이블로 이동
-- =====================================================
INSERT INTO gtm_customers (
  business_opportunity_type,
  customer_name,
  customer_id,
  parent_company,
  business_number,
  headquarters,
  department_head,
  division,
  team,
  team_leader,
  sales_representative,
  revenue_2024,
  overseas_presence_2025,
  kt_global_data_usage_2025,
  kt_contract_period,
  kt_monthly_fee,
  other_global_data_usage,
  other_provider_name,
  other_contract_period,
  other_monthly_fee,
  renewal_date,
  usage_intl_dedicated_mpls,
  usage_sd_wan,
  usage_internet_vpn,
  customer_needs,
  notes
)
SELECT 
  NULLIF(TRIM("사업기회 구분"), ''),
  NULLIF(TRIM("관리고객명"), ''),
  NULLIF(TRIM("관리고객ID"), ''),
  NULLIF(TRIM("그룹사(모기업)"), ''),
  NULLIF(TRIM("사업자번호"), ''),
  NULLIF(TRIM("본부"), ''),
  NULLIF(TRIM("담당"), ''),
  NULLIF(TRIM("부"), ''),
  NULLIF(TRIM("팀"), ''),
  NULLIF(TRIM("팀장"), ''),
  NULLIF(TRIM("영업대표(ITC)"), ''),
  CASE 
    WHEN TRIM("24년고객사 매출(단위:억원)") = '' THEN NULL
    ELSE CAST(REPLACE(TRIM("24년고객사 매출(단위:억원)"), ',', '') AS DECIMAL(15,2))
  END,
  CASE 
    WHEN UPPER(TRIM("25년해외사업장 보유(O/X)")) = 'O' THEN true
    WHEN UPPER(TRIM("25년해외사업장 보유(O/X)")) = 'X' THEN false
    ELSE NULL
  END,
  CASE 
    WHEN UPPER(TRIM("25년KT 글로벌데이터사용 유무(O/X)")) = 'O' THEN true
    WHEN UPPER(TRIM("25년KT 글로벌데이터사용 유무(O/X)")) = 'X' THEN false
    ELSE NULL
  END,
  NULLIF(TRIM("KT 회선 사용 규모_계약기간"), ''),
  CASE 
    WHEN TRIM("KT 회선 사용 규모_월 요금(억원)") = '' THEN NULL
    ELSE CAST(REPLACE(TRIM("KT 회선 사용 규모_월 요금(억원)"), ',', '') AS DECIMAL(10,2))
  END,
  CASE 
    WHEN UPPER(TRIM("타사 글로벌데이터 사용 여부(O/X)")) = 'O' THEN true
    WHEN UPPER(TRIM("타사 글로벌데이터 사용 여부(O/X)")) = 'X' THEN false
    ELSE NULL
  END,
  NULLIF(TRIM("타사 회선 사용 규모_타사명"), ''),
  NULLIF(TRIM("타사 회선 사용 규모_계약기간"), ''),
  CASE 
    WHEN TRIM("타사 회선 사용 규모_월 요금(단위:억원)") = '' THEN NULL
    ELSE CAST(REPLACE(TRIM("타사 회선 사용 규모_월 요금(단위:억원)"), ',', '') AS DECIMAL(10,2))
  END,
  CASE 
    WHEN TRIM("재계약 시점") = '' THEN NULL
    ELSE TO_DATE(TRIM("재계약 시점"), 'YYYY-MM-DD')
  END,
  CASE 
    WHEN UPPER(TRIM("타사 사용현황_국제전용/MPLS-VPN")) = 'O' THEN true
    WHEN UPPER(TRIM("타사 사용현황_국제전용/MPLS-VPN")) = 'X' THEN false
    ELSE NULL
  END,
  CASE 
    WHEN UPPER(TRIM("타사 사용현황_SD-WAN")) = 'O' THEN true
    WHEN UPPER(TRIM("타사 사용현황_SD-WAN")) = 'X' THEN false
    ELSE NULL
  END,
  CASE 
    WHEN UPPER(TRIM("타사 사용현황_인터넷VPN")) = 'O' THEN true
    WHEN UPPER(TRIM("타사 사용현황_인터넷VPN")) = 'X' THEN false
    ELSE NULL
  END,
  NULLIF(TRIM("고객 니즈/불편사항"), ''),
  NULLIF(TRIM("비고(국가/도시 등 국제 회선 사용 현황)"), '')
FROM gtm_customers_temp
WHERE "관리고객명" IS NOT NULL AND TRIM("관리고객명") != ''
ON CONFLICT (customer_id) DO UPDATE SET
  business_opportunity_type = EXCLUDED.business_opportunity_type,
  customer_name = EXCLUDED.customer_name,
  parent_company = EXCLUDED.parent_company,
  business_number = EXCLUDED.business_number,
  headquarters = EXCLUDED.headquarters,
  department_head = EXCLUDED.department_head,
  division = EXCLUDED.division,
  team = EXCLUDED.team,
  team_leader = EXCLUDED.team_leader,
  sales_representative = EXCLUDED.sales_representative,
  revenue_2024 = COALESCE(EXCLUDED.revenue_2024, gtm_customers.revenue_2024),
  overseas_presence_2025 = COALESCE(EXCLUDED.overseas_presence_2025, gtm_customers.overseas_presence_2025),
  kt_global_data_usage_2025 = COALESCE(EXCLUDED.kt_global_data_usage_2025, gtm_customers.kt_global_data_usage_2025),
  kt_contract_period = COALESCE(EXCLUDED.kt_contract_period, gtm_customers.kt_contract_period),
  kt_monthly_fee = COALESCE(EXCLUDED.kt_monthly_fee, gtm_customers.kt_monthly_fee),
  other_global_data_usage = COALESCE(EXCLUDED.other_global_data_usage, gtm_customers.other_global_data_usage),
  other_provider_name = COALESCE(EXCLUDED.other_provider_name, gtm_customers.other_provider_name),
  other_contract_period = COALESCE(EXCLUDED.other_contract_period, gtm_customers.other_contract_period),
  other_monthly_fee = COALESCE(EXCLUDED.other_monthly_fee, gtm_customers.other_monthly_fee),
  renewal_date = COALESCE(EXCLUDED.renewal_date, gtm_customers.renewal_date),
  usage_intl_dedicated_mpls = COALESCE(EXCLUDED.usage_intl_dedicated_mpls, gtm_customers.usage_intl_dedicated_mpls),
  usage_sd_wan = COALESCE(EXCLUDED.usage_sd_wan, gtm_customers.usage_sd_wan),
  usage_internet_vpn = COALESCE(EXCLUDED.usage_internet_vpn, gtm_customers.usage_internet_vpn),
  customer_needs = COALESCE(EXCLUDED.customer_needs, gtm_customers.customer_needs),
  notes = COALESCE(EXCLUDED.notes, gtm_customers.notes),
  updated_at = NOW();

-- =====================================================
-- 4. 데이터 검증
-- =====================================================

-- 임포트 결과 확인
SELECT 
  'Total Imported' AS metric,
  COUNT(*) AS count
FROM gtm_customers
UNION ALL
SELECT 
  'KT Customers' AS metric,
  COUNT(*) AS count
FROM gtm_customers
WHERE kt_global_data_usage_2025 = true
UNION ALL
SELECT 
  'Other Provider Customers' AS metric,
  COUNT(*) AS count
FROM gtm_customers
WHERE other_global_data_usage = true
UNION ALL
SELECT 
  'Overseas Business' AS metric,
  COUNT(*) AS count
FROM gtm_customers
WHERE overseas_presence_2025 = true;

-- 데이터 품질 확인
SELECT 
  'Missing Customer ID' AS issue,
  COUNT(*) AS count
FROM gtm_customers
WHERE customer_id IS NULL
UNION ALL
SELECT 
  'Missing Business Number' AS issue,
  COUNT(*) AS count
FROM gtm_customers
WHERE business_number IS NULL
UNION ALL
SELECT 
  'Duplicate Customer ID' AS issue,
  COUNT(*) - COUNT(DISTINCT customer_id) AS count
FROM gtm_customers
WHERE customer_id IS NOT NULL;

-- =====================================================
-- 5. 임시 테이블 삭제 (선택사항)
-- =====================================================
-- DROP TABLE IF EXISTS gtm_customers_temp;

-- =====================================================
-- 완료 메시지
-- =====================================================
-- CSV 데이터 임포트가 완료되었습니다.
-- 위의 검증 쿼리 결과를 확인하여 데이터가 올바르게 임포트되었는지 확인하세요.