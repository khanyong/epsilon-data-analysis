# GTM 데이터 통합 계획

## 현재 데이터 구조 분석

### 1. Supabase 기존 데이터
- **gtm_customers** (테이블): 12,231개 고객 레코드
  - 개별 고객 정보 (이름, ID, 매출, 계약 정보 등)
  - 주요 키: customer_id, customer_name

### 2. Excel 데이터 (GTM-data-active.xlsx)
- **Sheet1**: 카테고리별 집계 (AX, CP, IT 등 16개 카테고리)
- **고객현황**: 163개 고객 정보
- **SD-WAN**: 19개 SD-WAN 연결 정보
- **매출집계**: 연도별/월별 매출 데이터
- **매출**: 상세 매출 내역
- **통합고객별**: 178개 통합 고객 데이터
- **서비스ID**: 1,256개 서비스 정보
- **영업기회ID**: 250개 영업 기회

## 데이터 통합 전략

### Phase 1: 데이터 매핑 및 정합성 확인

#### 1.1 고객 데이터 매핑
```
Excel "고객현황" (163개) + "통합고객별" (178개) 
    ↓ 매핑
Supabase "gtm_customers" (12,231개)
```

**문제점**:
- Excel: 약 341개 고객
- Supabase: 12,231개 고객
- **큰 차이**: Excel은 주요 고객만, Supabase는 전체 고객

**해결방안**:
1. Excel 고객을 Supabase의 "주요 고객" 플래그로 표시
2. 카테고리 정보를 별도 테이블로 관리

#### 1.2 매출 데이터 통합
```
Excel "매출집계" + "매출" 
    ↓ 시계열 데이터로 변환
새 테이블: gtm_revenue_history
```

### Phase 2: 새 테이블 구조 설계

#### 2.1 카테고리 마스터 테이블
```sql
CREATE TABLE gtm_categories (
    id UUID PRIMARY KEY,
    category_code VARCHAR(50),  -- 'AX', 'CP', 'IT' 등
    category_name_kr VARCHAR(100),  -- '금융', '물류' 등
    category_name_en VARCHAR(100),  -- 'Finance', 'Logistics' 등
    color_class VARCHAR(50),  -- UI 표시용
    display_order INTEGER
);
```

#### 2.2 고객-카테고리 연결 테이블
```sql
CREATE TABLE gtm_customer_categories (
    id UUID PRIMARY KEY,
    customer_id VARCHAR(100),  -- gtm_customers.customer_id 참조
    category_id UUID REFERENCES gtm_categories(id),
    assigned_date DATE,
    is_primary BOOLEAN  -- 주 카테고리 여부
);
```

#### 2.3 카테고리별 집계 테이블
```sql
CREATE TABLE gtm_category_metrics (
    id UUID PRIMARY KEY,
    category_id UUID REFERENCES gtm_categories(id),
    metric_date DATE,  -- 집계 기준일
    company_count INTEGER,
    total_revenue DECIMAL(15,2),
    avg_revenue DECIMAL(15,2),
    percentage DECIMAL(5,2)
);
```

#### 2.4 매출 이력 테이블
```sql
CREATE TABLE gtm_revenue_history (
    id UUID PRIMARY KEY,
    customer_id VARCHAR(100),
    year INTEGER,
    month INTEGER,
    revenue_amount DECIMAL(15,2),
    revenue_type VARCHAR(50),  -- '매출', '미청구', '청구' 등
    service_type VARCHAR(100)
);
```

### Phase 3: 데이터 통합 프로세스

#### 3.1 카테고리 데이터 통합
1. Excel Sheet1에서 16개 카테고리 추출
2. gtm_categories 테이블에 입력
3. 각 카테고리의 집계 데이터를 gtm_category_metrics에 저장

#### 3.2 고객 매핑
1. Excel 고객명과 Supabase 고객명 매칭
   - 정확한 매칭: customer_name 일치
   - 유사 매칭: 레벤슈타인 거리 또는 부분 문자열 매칭
2. 매칭된 고객에 카테고리 할당
3. 매칭 안 된 Excel 고객은 신규 추가 검토

#### 3.3 매출 데이터 통합
1. Excel 매출 데이터를 월별/연도별로 정규화
2. gtm_revenue_history 테이블에 저장
3. 기존 gtm_customers의 revenue_2024 필드와 연결

### Phase 4: 구현 단계

#### Step 1: 테이블 생성 (SQL)
```sql
-- 1. 카테고리 관련 테이블 생성
CREATE TABLE gtm_categories (...);
CREATE TABLE gtm_customer_categories (...);
CREATE TABLE gtm_category_metrics (...);

-- 2. 매출 이력 테이블 생성
CREATE TABLE gtm_revenue_history (...);

-- 3. SD-WAN 서비스 테이블
CREATE TABLE gtm_sdwan_services (...);
```

#### Step 2: 데이터 마이그레이션 (Python)
```python
# 1. Excel 데이터 읽기
df_categories = read_excel('Sheet1')
df_customers = read_excel('고객현황')
df_revenue = read_excel('매출집계')

# 2. 데이터 정제 및 변환
categories = transform_categories(df_categories)
customer_mappings = match_customers(df_customers, supabase_customers)

# 3. Supabase 업로드
upload_to_supabase(categories, 'gtm_categories')
upload_to_supabase(customer_mappings, 'gtm_customer_categories')
```

#### Step 3: 데이터 검증
1. 레코드 수 확인
2. 금액 합계 검증
3. 카테고리별 고객 수 확인

### Phase 5: UI 통합

#### 5.1 대시보드 수정
- 카테고리별 뷰 추가
- 시계열 매출 차트
- 고객 카테고리 필터

#### 5.2 데이터 소스 변경
- JSON 파일 → Supabase 테이블
- 실시간 데이터 조회

## 주요 고려사항

### 1. 데이터 정합성
- **문제**: Excel과 Supabase의 고객명이 다를 수 있음
- **해결**: 매핑 테이블 생성 또는 수동 검증

### 2. 중복 데이터
- **문제**: 같은 고객이 다른 이름으로 존재할 수 있음
- **해결**: customer_id 기준 중복 제거

### 3. 데이터 업데이트
- **문제**: Excel 데이터 정기 업데이트 필요
- **해결**: 
  - 업로드 인터페이스 구현
  - 자동 동기화 스크립트

### 4. 권한 관리
- **문제**: 민감한 매출 데이터 보안
- **해결**: RLS (Row Level Security) 적용

## 실행 순서

1. **Week 1**: 테이블 설계 확정 및 생성
2. **Week 2**: 데이터 매핑 및 정제
3. **Week 3**: 마이그레이션 스크립트 개발
4. **Week 4**: UI 통합 및 테스트

## 예상 결과

- 통합된 GTM 데이터베이스
- 실시간 대시보드
- 카테고리별/시계열 분석 가능
- 데이터 일관성 향상