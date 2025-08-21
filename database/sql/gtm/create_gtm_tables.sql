-- =====================================================
-- GTM (Go-To-Market) 데이터베이스 테이블 생성 스크립트
-- =====================================================
-- 작성일: 2025-01-21
-- 설명: KT 글로벌 영업 GTM 전략을 위한 고객 관리 테이블
-- =====================================================

-- 기존 테이블이 있으면 삭제 (주의: 데이터가 모두 삭제됨)
-- DROP TABLE IF EXISTS gtm_update_logs CASCADE;
-- DROP TABLE IF EXISTS gtm_customers CASCADE;

-- =====================================================
-- 1. 메인 고객 테이블 생성
-- =====================================================
CREATE TABLE IF NOT EXISTS gtm_customers (
  -- 기본 키
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 기본 정보
  business_opportunity_type VARCHAR(100),
  customer_name VARCHAR(200) NOT NULL,
  customer_id VARCHAR(50) UNIQUE,
  parent_company VARCHAR(200),
  business_number VARCHAR(20),
  
  -- 조직 구조 정보
  headquarters VARCHAR(100),
  department_head VARCHAR(100),
  division VARCHAR(100),
  team VARCHAR(100),
  team_leader VARCHAR(50),
  sales_representative VARCHAR(50),
  
  -- 재무 및 사업 정보
  revenue_2024 DECIMAL(15,2),
  overseas_presence_2025 BOOLEAN DEFAULT false,
  kt_global_data_usage_2025 BOOLEAN DEFAULT false,
  
  -- KT 서비스 사용 현황
  kt_contract_period VARCHAR(100),
  kt_monthly_fee DECIMAL(10,2),
  
  -- 타사 서비스 사용 현황
  other_global_data_usage BOOLEAN DEFAULT false,
  other_provider_name VARCHAR(100),
  other_contract_period VARCHAR(100),
  other_monthly_fee DECIMAL(10,2),
  renewal_date DATE,
  
  -- 타사 서비스 상세 사용 현황
  usage_intl_dedicated_mpls BOOLEAN DEFAULT false,
  usage_sd_wan BOOLEAN DEFAULT false,
  usage_internet_vpn BOOLEAN DEFAULT false,
  
  -- 고객 니즈 및 기타 정보
  customer_needs TEXT,
  notes TEXT,
  
  -- 메타데이터
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  
  -- 추가 필드 (향후 확장용)
  status VARCHAR(50) DEFAULT 'active',
  priority VARCHAR(20),
  last_contact_date DATE,
  next_action_date DATE,
  opportunity_value DECIMAL(15,2),
  win_probability INTEGER CHECK (win_probability >= 0 AND win_probability <= 100)
);

-- 컬럼 코멘트 추가
COMMENT ON COLUMN gtm_customers.business_opportunity_type IS '사업기회 구분';
COMMENT ON COLUMN gtm_customers.customer_name IS '관리고객명';
COMMENT ON COLUMN gtm_customers.customer_id IS '관리고객ID';
COMMENT ON COLUMN gtm_customers.parent_company IS '그룹사(모기업)';
COMMENT ON COLUMN gtm_customers.business_number IS '사업자번호';
COMMENT ON COLUMN gtm_customers.headquarters IS '본부';
COMMENT ON COLUMN gtm_customers.department_head IS '담당';
COMMENT ON COLUMN gtm_customers.division IS '부';
COMMENT ON COLUMN gtm_customers.team IS '팀';
COMMENT ON COLUMN gtm_customers.team_leader IS '팀장';
COMMENT ON COLUMN gtm_customers.sales_representative IS '영업대표(ITC)';
COMMENT ON COLUMN gtm_customers.revenue_2024 IS '24년 고객사 매출(억원)';
COMMENT ON COLUMN gtm_customers.overseas_presence_2025 IS '25년 해외사업장 보유(O/X)';
COMMENT ON COLUMN gtm_customers.kt_global_data_usage_2025 IS '25년 KT 글로벌데이터 사용 유무(O/X)';
COMMENT ON COLUMN gtm_customers.kt_contract_period IS 'KT 회선 사용 규모 - 계약기간';
COMMENT ON COLUMN gtm_customers.kt_monthly_fee IS 'KT 회선 사용 규모 - 월 요금(억원)';
COMMENT ON COLUMN gtm_customers.other_global_data_usage IS '타사 글로벌데이터 사용 여부(O/X)';
COMMENT ON COLUMN gtm_customers.other_provider_name IS '타사 회선 사용 규모 - 타사명';
COMMENT ON COLUMN gtm_customers.other_contract_period IS '타사 회선 사용 규모 - 계약기간';
COMMENT ON COLUMN gtm_customers.other_monthly_fee IS '타사 회선 사용 규모 - 월 요금(억원)';
COMMENT ON COLUMN gtm_customers.renewal_date IS '재계약 시점';
COMMENT ON COLUMN gtm_customers.usage_intl_dedicated_mpls IS '타사 사용현황 - 국제전용/MPLS-VPN';
COMMENT ON COLUMN gtm_customers.usage_sd_wan IS '타사 사용현황 - SD-WAN';
COMMENT ON COLUMN gtm_customers.usage_internet_vpn IS '타사 사용현황 - 인터넷VPN';
COMMENT ON COLUMN gtm_customers.customer_needs IS '고객 니즈/불편사항';
COMMENT ON COLUMN gtm_customers.notes IS '비고(국가/도시 등 국제 회선 사용 현황)';
COMMENT ON COLUMN gtm_customers.status IS '상태 (active, inactive, pending)';
COMMENT ON COLUMN gtm_customers.priority IS '우선순위 (high, medium, low)';
COMMENT ON COLUMN gtm_customers.last_contact_date IS '마지막 접촉일';
COMMENT ON COLUMN gtm_customers.next_action_date IS '다음 액션 예정일';
COMMENT ON COLUMN gtm_customers.opportunity_value IS '예상 기회 가치(억원)';
COMMENT ON COLUMN gtm_customers.win_probability IS '성공 확률(%)';

-- =====================================================
-- 2. 업데이트 이력 테이블 생성
-- =====================================================
CREATE TABLE IF NOT EXISTS gtm_update_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES gtm_customers(id) ON DELETE CASCADE,
  field_name VARCHAR(100) NOT NULL,
  old_value TEXT,
  new_value TEXT,
  update_type VARCHAR(50) DEFAULT 'manual',
  update_reason TEXT,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 컬럼 코멘트 추가
COMMENT ON COLUMN gtm_update_logs.field_name IS '수정된 필드명';
COMMENT ON COLUMN gtm_update_logs.old_value IS '이전 값';
COMMENT ON COLUMN gtm_update_logs.new_value IS '새로운 값';
COMMENT ON COLUMN gtm_update_logs.update_type IS '업데이트 유형 (manual, csv_upload, api)';
COMMENT ON COLUMN gtm_update_logs.update_reason IS '수정 사유';

-- =====================================================
-- 3. 인덱스 생성 (검색 성능 향상)
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_gtm_customer_name ON gtm_customers(customer_name);
CREATE INDEX IF NOT EXISTS idx_gtm_customer_id ON gtm_customers(customer_id);
CREATE INDEX IF NOT EXISTS idx_gtm_business_number ON gtm_customers(business_number);
CREATE INDEX IF NOT EXISTS idx_gtm_headquarters ON gtm_customers(headquarters);
CREATE INDEX IF NOT EXISTS idx_gtm_team ON gtm_customers(team);
CREATE INDEX IF NOT EXISTS idx_gtm_status ON gtm_customers(status);
CREATE INDEX IF NOT EXISTS idx_gtm_renewal_date ON gtm_customers(renewal_date);
CREATE INDEX IF NOT EXISTS idx_gtm_other_provider ON gtm_customers(other_provider_name);
CREATE INDEX IF NOT EXISTS idx_gtm_created_at ON gtm_customers(created_at DESC);

-- 업데이트 로그 인덱스
CREATE INDEX IF NOT EXISTS idx_gtm_log_customer_id ON gtm_update_logs(customer_id);
CREATE INDEX IF NOT EXISTS idx_gtm_log_updated_at ON gtm_update_logs(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_gtm_log_field_name ON gtm_update_logs(field_name);

-- =====================================================
-- 4. RLS (Row Level Security) 정책 설정
-- =====================================================

-- RLS 활성화
ALTER TABLE gtm_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gtm_update_logs ENABLE ROW LEVEL SECURITY;

-- gtm_customers 테이블 정책
-- 모든 인증된 사용자는 읽기 가능
CREATE POLICY "gtm_customers_select_policy" ON gtm_customers
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- 관리자만 생성 가능
CREATE POLICY "gtm_customers_insert_policy" ON gtm_customers
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND 
    (
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid()
        AND (raw_user_meta_data->>'role' = 'admin' OR raw_user_meta_data->>'role' = 'editor')
      )
    )
  );

-- 관리자와 편집자만 수정 가능
CREATE POLICY "gtm_customers_update_policy" ON gtm_customers
  FOR UPDATE
  USING (
    auth.uid() IS NOT NULL AND 
    (
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid()
        AND (raw_user_meta_data->>'role' = 'admin' OR raw_user_meta_data->>'role' = 'editor')
      )
    )
  );

-- 관리자만 삭제 가능
CREATE POLICY "gtm_customers_delete_policy" ON gtm_customers
  FOR DELETE
  USING (
    auth.uid() IS NOT NULL AND 
    (
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid()
        AND raw_user_meta_data->>'role' = 'admin'
      )
    )
  );

-- gtm_update_logs 테이블 정책
-- 모든 인증된 사용자는 로그 읽기 가능
CREATE POLICY "gtm_logs_select_policy" ON gtm_update_logs
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- 시스템에서만 로그 생성 가능 (트리거를 통해)
CREATE POLICY "gtm_logs_insert_policy" ON gtm_update_logs
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- =====================================================
-- 5. 트리거 함수 생성 (자동 업데이트 시간 기록)
-- =====================================================

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_gtm_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS set_gtm_updated_at ON gtm_customers;
CREATE TRIGGER set_gtm_updated_at
  BEFORE UPDATE ON gtm_customers
  FOR EACH ROW
  EXECUTE FUNCTION update_gtm_updated_at();

-- =====================================================
-- 6. 뷰 생성 (자주 사용하는 쿼리)
-- =====================================================

-- 활성 고객 뷰
CREATE OR REPLACE VIEW gtm_active_customers AS
SELECT 
  gc.*,
  CASE 
    WHEN other_global_data_usage = true THEN '타사 사용중'
    WHEN kt_global_data_usage_2025 = true THEN 'KT 사용중'
    ELSE '미사용'
  END AS service_status,
  CASE
    WHEN renewal_date IS NOT NULL AND renewal_date <= CURRENT_DATE + INTERVAL '90 days' THEN '갱신 임박'
    WHEN renewal_date IS NOT NULL AND renewal_date <= CURRENT_DATE + INTERVAL '180 days' THEN '갱신 예정'
    ELSE '정상'
  END AS renewal_status
FROM gtm_customers gc
WHERE status = 'active' OR status IS NULL;

-- 타사 사용 고객 뷰 (영업 기회)
CREATE OR REPLACE VIEW gtm_opportunity_customers AS
SELECT 
  customer_name,
  customer_id,
  headquarters,
  team,
  sales_representative,
  other_provider_name,
  other_monthly_fee,
  renewal_date,
  customer_needs,
  notes
FROM gtm_customers
WHERE other_global_data_usage = true
  AND (status = 'active' OR status IS NULL)
ORDER BY renewal_date ASC NULLS LAST;

-- =====================================================
-- 7. 함수 생성 (비즈니스 로직)
-- =====================================================

-- 고객 통계 함수
CREATE OR REPLACE FUNCTION get_gtm_statistics()
RETURNS TABLE (
  total_customers BIGINT,
  kt_customers BIGINT,
  other_customers BIGINT,
  opportunities_next_90days BIGINT,
  total_kt_monthly_revenue NUMERIC,
  total_other_monthly_revenue NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT AS total_customers,
    COUNT(*) FILTER (WHERE kt_global_data_usage_2025 = true)::BIGINT AS kt_customers,
    COUNT(*) FILTER (WHERE other_global_data_usage = true)::BIGINT AS other_customers,
    COUNT(*) FILTER (WHERE renewal_date <= CURRENT_DATE + INTERVAL '90 days')::BIGINT AS opportunities_next_90days,
    COALESCE(SUM(kt_monthly_fee), 0) AS total_kt_monthly_revenue,
    COALESCE(SUM(other_monthly_fee), 0) AS total_other_monthly_revenue
  FROM gtm_customers
  WHERE status = 'active' OR status IS NULL;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 8. 권한 부여
-- =====================================================

-- 뷰에 대한 권한 부여
GRANT SELECT ON gtm_active_customers TO authenticated;
GRANT SELECT ON gtm_opportunity_customers TO authenticated;

-- 함수 실행 권한 부여
GRANT EXECUTE ON FUNCTION get_gtm_statistics() TO authenticated;

-- =====================================================
-- 완료 메시지
-- =====================================================
-- GTM 테이블 생성이 완료되었습니다.
-- 다음 단계: 
-- 1. CSV 데이터 import (insert_gtm_data.sql 실행)
-- 2. 사용자 역할 설정 (admin, editor, viewer)
-- 3. 웹 인터페이스 구현