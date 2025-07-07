# Strategic Data Analyzer

React + TypeScript로 구축된 전략적 데이터 분석 대시보드입니다. RFQ(견적), SOF(주문), KOTRA(수출입) 데이터를 분석하는 피벗 테이블 기능을 제공합니다.

## 주요 기능

### 📊 피벗 테이블 분석
- **다단계 피벗**: 최대 N단계까지 계층적 그룹화
- **드래그앤드롭**: 컬럼 순서 변경 가능
- **값 필터링**: 각 컬럼별로 특정 값만 선택하여 분석
- **동적 통계**: 총 건수, 금액, 국가 수 등 실시간 계산

### 🎯 데이터 소스
- **RFQ (견적 데이터)**: Country A/B, 도시, 금액 분석
- **SOF (주문 데이터)**: 주문 상태, 제품별 분석  
- **KOTRA (수출입 데이터)**: 국가별, 품목별 수출입 현황

### 📈 고급 분석
- **기본 통계**: 컬럼별 고유값, 빈도 분석
- **조정 통계**: Quote No별 중복 제거 후 분석
- **투자전략보고서**: 분석 결과를 종합한 전략 보고서 생성

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 Supabase 정보를 입력하세요:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_KEY=your_supabase_anon_key_here
```

### 3. 개발 서버 실행
```bash
npm run dev
```

## 주요 개선사항

### 피벗 테이블 계층 구조 수정
- 2단계 이상 피벗에서 하위 그룹이 보이지 않는 문제 해결
- `groupByPivotN` 함수를 `parentKeys`를 활용한 정확한 계층 구조로 개선

### 데이터 로딩 최적화
- Supabase API 제한(1,000개) 문제 해결
- 페이지네이션을 통한 전체 데이터 로딩 (5,000개씩 분할)
- statement timeout 에러 방지

### UX/UI 현대화
- 복잡한 체크박스 → 드롭다운 + Chip 방식
- 각 기능별 카드 분리 (컬럼 선택, 값 필터, 실행, 결과)
- Tailwind CSS 기반 현대적 디자인

### 값 필터 기능
- 엑셀 피벗테이블과 유사한 값 필터링
- 컬럼별 특정 값만 선택하여 피벗 분석
- 전체 선택/해제 버튼 제공

## 기술 스택

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Charts**: Recharts
- **Backend**: Supabase (PostgreSQL)
- **Build Tool**: Vite

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── DataTable.tsx   # 데이터 테이블 표시
│   ├── ChartPanel.tsx  # 차트 패널
│   ├── FileUploader.tsx # 파일 업로드
│   └── InvestmentReport.tsx # 투자전략보고서
├── pages/
│   └── Dashboard.tsx   # 메인 대시보드
├── services/
│   └── supabaseService.ts # Supabase 연동
└── types/              # TypeScript 타입 정의
```

## 사용 방법

### 1. 피벗 테이블 생성
1. 상단 네비게이션에서 분석할 데이터 선택 (RFQ/SOF/KOTRA)
2. "피벗 컬럼 선택" 카드에서 드롭다운으로 컬럼 추가
3. 필요시 드래그앤드롭으로 컬럼 순서 변경
4. "값 필터" 카드에서 특정 값만 선택 (선택사항)
5. "피벗 실행" 버튼 클릭

### 2. 결과 분석
- 계층적 그룹 구조로 데이터 표시
- 각 그룹별 건수 자동 계산
- 상단 요약 카드에서 전체 통계 확인

### 3. 데이터 내보내기
- "CSV 다운로드" 버튼으로 원본 데이터 내보내기
- 투자전략보고서 생성 후 분석 결과 문서화

## 문제 해결

### Supabase 연결 오류
- `.env` 파일의 URL과 키가 정확한지 확인
- Supabase 프로젝트의 API 설정에서 "Maximum rows returned" 확인

### 데이터 로딩 느림
- 큰 데이터셋의 경우 페이지네이션으로 분할 로딩
- 필요한 컬럼만 선택하여 로딩 속도 개선

### 피벗 결과 이상
- 값 필터가 올바르게 설정되었는지 확인
- 컬럼명의 대소문자/공백 차이 확인

## 라이선스

MIT License 