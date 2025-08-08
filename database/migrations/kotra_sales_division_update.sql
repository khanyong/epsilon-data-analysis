-- KOTRA 테이블 sales_division 업데이트
-- 생성일: 2025-01-27
-- 목적: CSV에서 sales_division 정보를 기존 DB에 추가

-- 신규 기업 INSERT
INSERT INTO kotra (
  region, country, office, company_name_kr, company_name_en, company_name_cn,
  local_address, local_zipcode, entry_type, investment_type, parent_company,
  industry_major, industry_minor, sales_division, sales_division_match_type, sales_division_similarity
) VALUES
  ('', '인도', '뭄바이', 'HMM Shipping India PVT Ltd', 'HMM SHIPPING INDIA PVT LTD ', NULL, 'LEELA BUSINESS PARK, UNIT NO  302, 3RD FLOOR, SIR M V  ROAD, MAROL PIPE LINE, ANDHERI-KURLA ROAD, ANDHERI,MUMBAI', '400059', '서비스법인, 해외지사', '단독투자', 'HMM', 'H  운수 및 창고업', NULL, '강북/강원법인고객본부 북부법인고객1담당 법인고객영업1팀', 'csv_import', 1.0);

-- 기존 기업 sales_division UPDATE
UPDATE kotra SET
  sales_division = '서부법인고객본부 서부법인고객1담당 법인고객영업2팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '(주)에이디티 인디아';

UPDATE kotra SET
  sales_division = '강남법인고객본부 서울남부법인고객담당 법인고객영업2팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '금강공업 인도법인';

UPDATE kotra SET
  sales_division = '강남법인고객본부 경기남부법인고객담당 법인고객영업2팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '나리건설 & NRM PRECISION INDIA';

UPDATE kotra SET
  sales_division = '부산/경남법인고객본부 경남법인고객담당 법인고객영업1팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '디와이파워 인도법인';

UPDATE kotra SET
  sales_division = '강남법인고객본부 서울남부법인고객담당 법인고객영업2팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '삼목 에스폼(주) 인도법인';

UPDATE kotra SET
  sales_division = '서부법인고객본부 서부법인고객1담당 법인고객영업1팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '엘에스 오토모티브 테크놀리지';

UPDATE kotra SET
  sales_division = '충남/충북법인고객본부 충남법인고객담당 법인고객영업2팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '우선전기';

UPDATE kotra SET
  sales_division = '강남법인고객본부 서울남부법인고객담당 IT섹터영업팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '인디아 세아';

UPDATE kotra SET
  sales_division = '강북/강원법인고객본부 북부법인고객2담당 법인고객영업2팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '코디아';

UPDATE kotra SET
  sales_division = '서부고객본부 경기서부지사',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '화천인디아';

UPDATE kotra SET
  sales_division = '전략고객사업본부 전략사업2담당 전략고객2팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '효성 T&D 인도법인';

UPDATE kotra SET
  sales_division = '전략고객사업본부 전략사업2담당 전략고객2팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '효성 T&D 인디아';

UPDATE kotra SET
  sales_division = '전략고객사업본부 전략사업3담당 전략고객1팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '포스코 인터네셔널';

UPDATE kotra SET
  sales_division = '전략고객사업본부 전략사업2담당 전략고객1팀',
  sales_division_match_type = 'csv_import',
  sales_division_similarity = 1.0
WHERE company_name_kr = '현대모비스';
