# Synergy Sales SQL 스크립트 모음

## 📁 폴더 구조
```
sql/synergy_sales/
├── README.md                           # 이 파일
├── data_cleanup/                       # 데이터 정리 관련
│   ├── data_cleanup_type_safe.sql     # 최종 데이터 타입 변환
│   ├── data_cleanup_fixed.sql         # 수정된 데이터 정리
│   └── data_cleanup.sql               # 초기 데이터 정리
├── views/                              # 뷰 생성 관련
│   ├── create_annual_views_fixed.sql  # 최종 연도별 합산 뷰
│   └── create_annual_views.sql        # 초기 뷰 생성
├── verification/                       # 검증 관련
│   ├── verify_kt_philippines_2022_fixed.sql  # KT Philippines 검증
│   └── verify_kt_philippines_2022.sql        # 초기 검증
└── debug/                              # 디버깅 관련
    ├── check_column_names.sql         # 컬럼명 확인
    ├── debug_data_check.sql           # 데이터 타입 확인
    └── step_by_step_fix.sql           # 단계별 수정
```

## 🚀 실행 순서 (이미 완료됨)

### 1단계: 데이터 타입 변환
```sql
-- 최종 버전 실행
data_cleanup_type_safe.sql
```

### 2단계: 뷰 생성
```sql
-- 연도별 합산 뷰 생성
create_annual_views_fixed.sql
```

### 3단계: 검증
```sql
-- KT Philippines 2022년 합산 검증
verify_kt_philippines_2022_fixed.sql
```

## ✅ 완료된 작업
- [x] 모든 월별 컬럼을 `numeric` 타입으로 변환
- [x] `synergy_sales_annual_view` 뷰 생성
- [x] `synergy_sales_category_annual_view` 뷰 생성
- [x] KT Philippines 2022년 합산 검증 완료
- [x] 성능 최적화 인덱스 생성

## 📊 생성된 뷰

### synergy_sales_annual_view
- 각 행별 연도별 합산 (2022-2026)
- 컬럼: Category, Customer, Channel, End_Customer, SD_WAN, 2022_Total ~ 2026_Total

### synergy_sales_category_annual_view
- 카테고리별 연도별 합산 (2022-2026)
- 컬럼: Category, 2022_Total ~ 2026_Total

## 🔍 주요 해결된 문제들
1. **데이터 타입 불일치**: text ↔ numeric 혼재
2. **빈 문자열 처리**: '' → NULL 변환
3. **비숫자 데이터**: 'j' 등 문자 데이터 정리
4. **컬럼명 대소문자**: PostgreSQL 따옴표 처리
5. **뷰 생성 오류**: 컬럼명 인식 문제 해결

## 📝 참고사항
- 모든 SQL 스크립트는 Supabase SQL Editor에서 실행
- 실행 전 백업 권장
- 뷰는 `CREATE OR REPLACE`로 안전하게 재생성 가능 