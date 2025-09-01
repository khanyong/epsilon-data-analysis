# GTM Sales 월별 데이터 추가 방법

## 📊 현재 데이터베이스 구조

### 테이블 구조
- **gtm_sales_master**: 서비스 기본 정보 (service_id가 Primary Key)
- **gtm_sales_revenues**: 월별 매출 데이터 (service_id + revenue_month가 Unique)
- **gtm_sales**: CSV import용 임시 테이블 (선택적 사용)

### 유연한 구조의 장점
- 새로운 월 추가 시 테이블 구조 변경 불필요
- 데이터만 INSERT하면 자동으로 처리
- 중복 데이터는 자동으로 업데이트 (UPSER
---

## 🔄 월별 데이터 추가 방법

### 방법 1: Python 스크립트 사용 (권장) ✅

#### 사전 준비
1. CSV 파일 준비 (새로운 월 컬럼 포함)
   - 예: `revenue_2507` 컬럼이 추가된 CSV
2. 파일 위치: `data/gtm/Global_Sales.csv`

#### 실행 방법

```bash
# 특정 월 데이터만 추가
python scripts/add_new_month.py data/gtm/Global_Sales.csv 2507

# CSV의 모든 월 데이터 업데이트/추가
python scripts/add_new_month.py data/gtm/Global_Sales.csv --all
```

#### 장점
- 자동으로 중복 처리
- 새로운 서비스 자동 감지 및 추가
- 대량 데이터 처리에 효율적

---

### 방법 2: Supabase UI를 통한 Import

#### 단계별 진행

1. **CSV 파일 준비**
   ```python
   # 숫자 형식 정리 (쉼표 제거)
   python scripts/clean_csv_numbers.py
   ```

2. **임시 테이블에 Import**
   - Supabase Table Editor → `gtm_sales` 테이블 선택
   - Import Data 클릭
   - 정리된 CSV 파일 업로드

3. **특정 월 데이터 변환**
   ```sql
   -- 2507 월 데이터만 추가
   SELECT add_month_from_temp_table('2507');
   ```

4. **또는 전체 데이터 재변환**
   ```sql
   -- 모든 월 데이터 업데이트
   SELECT transform_gtm_sales_to_flexible();
   ```

---

### 방법 3: 직접 SQL INSERT

#### 소량 데이터 추가
```sql
-- 개별 서비스 매출 추가
INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
VALUES ('0888-7065-9003', '2507', 19500000)
ON CONFLICT (service_id, revenue_month) 
DO UPDATE SET revenue_amount = EXCLUDED.revenue_amount;
```

#### 여러 서비스 한번에 추가
```sql
INSERT INTO gtm_sales_revenues (service_id, revenue_month, revenue_amount)
VALUES 
    ('0888-7065-9003', '2507', 19500000),
    ('0888-7065-9009', '2507', 19500000),
    ('0888-7065-1034', '2507', 1850000)
ON CONFLICT (service_id, revenue_month) 
DO UPDATE SET revenue_amount = EXCLUDED.revenue_amount;
```

---

## 📝 시나리오별 가이드

### 시나리오 1: 매월 정기 업데이트
**상황**: 2025년 7월 매출 데이터 추가

1. 기존 CSV에 `revenue_2507` 컬럼 추가
2. 각 서비스의 7월 매출액 입력
3. 실행:
   ```bash
   python scripts/add_new_month.py data/gtm/Global_Sales.csv 2507
   ```

### 시나리오 2: 새로운 서비스 추가
**상황**: 신규 고객사 서비스 10개 추가

1. CSV에 새로운 행 10개 추가
2. 모든 월별 매출 데이터 포함
3. 실행:
   ```bash
   python scripts/add_new_month.py data/gtm/Global_Sales.csv --all
   ```

### 시나리오 3: 과거 데이터 수정
**상황**: 2024년 12월 매출액 수정 필요

1. CSV에서 `revenue_2412` 컬럼 값 수정
2. 실행:
   ```bash
   python scripts/add_new_month.py data/gtm/Global_Sales.csv 2412
   ```

### 시나리오 4: 긴급 단건 수정
**상황**: 특정 서비스 1개의 매출액만 수정

```sql
-- Supabase SQL Editor에서 직접 실행
UPDATE gtm_sales_revenues 
SET revenue_amount = 20000000
WHERE service_id = '0888-7065-9003' 
AND revenue_month = '2506';
```

---

## 🔍 데이터 확인 방법

### 추가된 데이터 확인
```sql
-- 특정 월 데이터 확인
SELECT COUNT(*) as service_count, SUM(revenue_amount) as total
FROM gtm_sales_revenues
WHERE revenue_month = '2507';

-- 특정 서비스의 월별 매출 추이
SELECT * FROM gtm_sales_revenues
WHERE service_id = '0888-7065-9003'
ORDER BY revenue_month;
```

### 전체 현황 확인
```sql
-- 월별 전체 매출 트렌드
SELECT * FROM gtm_monthly_trend ORDER BY revenue_month;

-- 고객별 총 매출 Top 10
SELECT * FROM gtm_customer_summary LIMIT 10;

-- 피벗 뷰로 원본 형태 확인
SELECT * FROM gtm_sales_pivot LIMIT 5;
```

---

## ⚠️ 주의사항

1. **중복 service_id 처리**
   - 동일한 service_id가 여러 행에 있을 경우 매출액이 자동 합산됨
   - 의도하지 않은 중복은 CSV에서 미리 확인 필요

2. **데이터 형식**
   - CSV의 숫자에 쉼표(,)가 있으면 제거 필요
   - `clean_csv_numbers.py` 스크립트 활용

3. **월 코드 형식**
   - YYMM 형식 사용 (예: 2507 = 2025년 7월)
   - 일관된 형식 유지 중요

4. **백업**
   - 대량 업데이트 전 데이터 백업 권장
   ```sql
   -- 백업 테이블 생성
   CREATE TABLE gtm_sales_revenues_backup AS 
   SELECT * FROM gtm_sales_revenues;
   ```

---

## 📞 문제 해결

### CSV Import 실패
- 원인: 숫자 형식 문제 (쉼표 포함)
- 해결: `python scripts/clean_csv_numbers.py` 실행

### 중복 데이터 문제
- 원인: 동일 service_id + revenue_month 조합
- 해결: ON CONFLICT 절이 자동으로 UPDATE 처리

### 새 서비스가 보이지 않음
- 원인: gtm_sales_master에 없음
- 해결: `python scripts/add_new_month.py --all` 실행

---

## 📁 관련 파일 위치

- **스크립트**: `scripts/add_new_month.py`
- **CSV 정리**: `scripts/clean_csv_numbers.py`
- **SQL 함수**: `supabase/migrations/20250125_add_month_function.sql`
- **데이터 파일**: `data/gtm/Global_Sales.csv`

---

*작성일: 2025-01-25*
*최종 업데이트: 2025-01-25*