# GTM 데이터 통합 계획 (수정안)

## 현황 재분석

### 데이터 소스 비교

| 구분 | Supabase (gtm_customers) | Excel 파일 |
|------|--------------------------|------------|
| **데이터 양** | 12,231개 고객 | 약 300-400개 고객 |
| **데이터 성격** | 전체 고객 DB | 주요/활성 고객 |
| **주요 정보** | 개별 고객 상세 정보 | 카테고리별 집계, 매출 추이 |
| **업데이트 주기** | 실시간 | 월별/분기별 |

### 핵심 문제점
1. **데이터 범위 불일치**: Supabase는 전체 고객, Excel은 주요 고객만
2. **데이터 목적 차이**: Supabase는 운영 데이터, Excel은 분석/보고용
3. **중복 vs 보완**: 두 데이터가 중복이 아닌 서로 보완 관계

## 수정된 통합 전략

### Option A: 보완적 통합 (권장)
**개념**: Excel 데이터를 Supabase의 "분석 레이어"로 추가

```
Supabase (운영 데이터)
    ├── gtm_customers (12,231개 전체 고객)
    └── gtm_active_customers (뷰)

+ 분석 레이어 (새로 추가)
    ├── gtm_analysis_categories (카테고리별 집계)
    ├── gtm_analysis_revenue_trend (매출 추이)
    └── gtm_analysis_key_accounts (주요 고객 지표)
```

#### 장점
- 기존 데이터 구조 유지
- Excel의 분석 가치 보존
- 점진적 통합 가능

#### 구현 방법
```sql
-- 1. 분석용 스키마 생성
CREATE SCHEMA IF NOT EXISTS analysis;

-- 2. 카테고리 집계 테이블
CREATE TABLE analysis.gtm_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_code VARCHAR(50),
    category_name VARCHAR(100),
    company_count INTEGER,
    total_revenue DECIMAL(15,2),
    data_month DATE,  -- 집계 기준월
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 주요 고객 지표 테이블
CREATE TABLE analysis.gtm_key_metrics (
    customer_id VARCHAR(100),
    customer_name VARCHAR(255),
    category VARCHAR(50),
    revenue_2024 DECIMAL(15,2),
    revenue_2025_forecast DECIMAL(15,2),
    is_key_account BOOLEAN,
    data_source VARCHAR(50)  -- 'excel' or 'system'
);
```

### Option B: 완전 통합
**개념**: Excel 데이터를 Supabase 메인 테이블에 병합

#### 문제점
- 데이터 정합성 리스크
- 고객명 매칭 어려움
- 카테고리 정보 손실 가능성

### Option C: 하이브리드 접근 (실용적)
**개념**: 중요 데이터만 통합, 나머지는 참조

```
1단계: 즉시 활용 가능한 데이터
   - 카테고리별 집계 → 새 테이블로 저장
   - 매출 추이 → 차트용 테이블로 저장

2단계: 매칭 후 통합
   - Excel 고객 → Supabase 고객과 매칭
   - 매칭된 고객에 카테고리 태그 추가

3단계: 대시보드 통합
   - 실시간 데이터 + 분석 데이터 결합
```

## 실행 계획 (단순화)

### Phase 1: 독립 테이블 생성 (1주차)
Excel 데이터를 그대로 Supabase에 저장

```sql
-- Excel 데이터 그대로 저장
CREATE TABLE gtm_excel_import (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sheet_name VARCHAR(100),
    row_data JSONB,
    import_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 카테고리별 집계 전용
CREATE TABLE gtm_category_summary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_name VARCHAR(100),
    company_count INTEGER,
    total_revenue DECIMAL(15,2),
    percentage DECIMAL(5,2),
    report_date DATE
);
```

### Phase 2: 데이터 로드 (1주차)
Python 스크립트로 Excel → Supabase

```python
# 간단한 업로드
def upload_excel_to_supabase():
    # 1. Excel 읽기
    excel_data = pd.read_excel('GTM-data-active.xlsx', sheet_name=None)
    
    # 2. 카테고리 데이터만 먼저 업로드
    categories = process_categories(excel_data['Sheet1'])
    supabase.table('gtm_category_summary').insert(categories).execute()
    
    # 3. 매출 추이 업로드
    revenue_trend = process_revenue(excel_data['매출집계'])
    supabase.table('gtm_revenue_trend').insert(revenue_trend).execute()
```

### Phase 3: 대시보드 연동 (2주차)
React 컴포넌트에서 두 데이터 소스 결합

```typescript
// 기존 고객 데이터
const customers = await supabase.from('gtm_customers').select('*')

// Excel 분석 데이터
const categories = await supabase.from('gtm_category_summary').select('*')
const revenue_trend = await supabase.from('gtm_revenue_trend').select('*')

// 대시보드에서 결합하여 표시
```

## 핵심 차이점 (기존 계획 대비)

### 기존 계획의 문제
1. **너무 복잡**: 데이터 매칭, 정규화 등 과도한 작업
2. **리스크 높음**: 잘못된 매칭으로 데이터 손상 가능
3. **시간 소요**: 4주 이상 예상

### 수정된 계획의 장점
1. **단순함**: Excel 데이터를 별도 테이블로 관리
2. **안전함**: 기존 데이터 영향 없음
3. **빠른 구현**: 1-2주 내 완료 가능
4. **점진적 개선**: 나중에 매칭 작업 추가 가능

## 의사결정 필요 사항

### Q1: 데이터 통합의 목적은?
- A. 대시보드 개선 → **Option C 추천**
- B. 데이터 일원화 → Option B
- C. 분석 기능 강화 → **Option A 추천**

### Q2: Excel 업데이트 빈도는?
- A. 매일 → 자동화 필요
- B. 주간/월간 → **수동 업로드 충분**
- C. 일회성 → JSON 파일 유지

### Q3: 우선순위는?
- A. 빠른 구현 → **Phase 1만 진행**
- B. 완벽한 통합 → 전체 Phase 진행
- C. 최소 기능 → 현재 JSON 유지

## 추천 방안

**"Phase 1 + 대시보드 연동"** 방식을 추천합니다:

1. Excel 데이터를 간단한 테이블 2-3개로 Supabase에 저장
2. 복잡한 매칭 작업은 생략
3. 대시보드에서 두 데이터 소스를 조합하여 표시
4. 향후 필요시 점진적 개선

이 방식이 가장 실용적이고 리스크가 낮습니다.