# Epsilon Data Analyzer - 프로젝트 구조

## 📁 폴더 구조

```
epsilon-data-analyzer/
├── 📖 docs/                    # 프로젝트 문서
│   ├── CLAUDE.md              # Claude AI 통합 가이드
│   ├── PDF_제출_체크리스트.md    # PDF 제출 체크리스트
│   ├── RLS_정책_설명서.md       # Row Level Security 정책 문서
│   ├── 문서_전달_가이드.md      # 문서 전달 가이드
│   ├── 새_데이터_업로드_안내서.md # 데이터 업로드 가이드
│   └── 테이블_정의서_수동.md     # 데이터베이스 테이블 정의
│
├── 📊 reports/                 # 분석 보고서
│   ├── kotra_analysis/        # KOTRA 분석 보고서
│   ├── target_marketing/      # 타겟 마케팅 분석
│   └── validation/           # 데이터 검증 보고서
│
├── 🗄️ database/               # 데이터베이스 관련
│   ├── migrations/           # SQL 마이그레이션 스크립트
│   └── sql/                 # SQL 스키마 및 쿼리
│       └── synergy_sales/   # Synergy Sales 관련 SQL
│
├── 📈 data/                   # 데이터 파일
│   ├── euro_pricing_table/   # 유로 가격 데이터
│   ├── *.csv                # CSV 데이터 파일
│   └── *.json              # JSON 데이터 파일
│
├── 🐍 scripts/                # Python 스크립트
│   ├── upload_*.py          # 데이터 업로드 스크립트
│   ├── analyze_*.py         # 데이터 분석 스크립트
│   └── check_*.py          # 데이터 검증 스크립트
│
├── 🎨 src/                    # 소스 코드
│   ├── features/            # 기능별 컴포넌트 모듈
│   │   ├── Dashboard/       # 대시보드
│   │   ├── EpsilonFactbook/ # Epsilon Factbook
│   │   ├── EuroMarketingStrategy/ # 유로 마케팅 전략
│   │   ├── InvestmentStrategyReport/ # 투자 전략 보고서
│   │   ├── MarketingReport/ # 마케팅 보고서
│   │   ├── NewYorkDiscountReport/ # 뉴욕 할인 보고서
│   │   └── SynergySales/    # Synergy Sales
│   │
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── ChartPanel.tsx   # 차트 패널
│   │   ├── DataTable.tsx    # 데이터 테이블
│   │   ├── FileUploader.tsx # 파일 업로더
│   │   └── ProtectedRoute.tsx # 인증 라우트
│   │
│   ├── services/            # 서비스 레이어
│   │   ├── supabaseService.ts # Supabase 서비스
│   │   └── cogsService.ts   # COGS 서비스
│   │
│   ├── lib/                 # 라이브러리 설정
│   │   └── supabase.ts      # Supabase 클라이언트
│   │
│   ├── utils/               # 유틸리티 함수
│   │   ├── dataAnalysisUtils.ts # 데이터 분석 유틸
│   │   ├── financialCalculations.ts # 재무 계산
│   │   └── cityNormalizer.js # 도시명 정규화
│   │
│   ├── contexts/            # React Context
│   │   └── AuthContext.tsx  # 인증 컨텍스트
│   │
│   ├── hooks/               # Custom Hooks
│   │   └── useDataAnalysis.ts # 데이터 분석 훅
│   │
│   ├── types/               # TypeScript 타입 정의
│   │   └── index.ts         # 공통 타입
│   │
│   ├── config/              # 설정 파일
│   │   └── businessConfig.ts # 비즈니스 설정
│   │
│   ├── App.tsx              # 메인 앱 컴포넌트
│   ├── main.tsx             # 앱 진입점
│   └── index.css           # 글로벌 스타일
│
├── 🌐 public/                 # 정적 파일
│   ├── attachments/         # 첨부 파일
│   └── data/               # 공개 데이터
│
├── ⚙️ 설정 파일
│   ├── .env                 # 환경 변수
│   ├── package.json         # 프로젝트 의존성
│   ├── vite.config.js       # Vite 설정
│   ├── tailwind.config.js   # Tailwind CSS 설정
│   ├── tsconfig.json        # TypeScript 설정
│   └── vercel.json         # Vercel 배포 설정
│
└── 🔧 Task Master            # 작업 관리 시스템
    └── .taskmaster/         # Task Master 설정 및 작업

```

## 🚀 주요 기능 모듈

### 1. Dashboard (대시보드)
- 전체 데이터 개요 및 분석 시각화
- 주요 지표 모니터링

### 2. Epsilon Factbook
- Epsilon POP 분석
- 도시별 데이터 집계

### 3. Euro Marketing Strategy
- 유럽 시장 마케팅 전략 분석
- 가격 데이터 관리

### 4. Investment Strategy Report
- 투자 전략 보고서 생성
- WACC 시나리오 분석

### 5. Marketing Report
- 비즈니스 타당성 분석
- COGS 관리

### 6. Synergy Sales
- 연간 판매 분석
- 데이터베이스 분석 대시보드

## 🛠️ 기술 스택

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **State Management**: React Context API
- **Charts**: Recharts
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## 📝 개발 가이드

### 환경 설정
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

### 환경 변수
`.env` 파일에 다음 변수 설정 필요:
- `VITE_SUPABASE_URL`: Supabase 프로젝트 URL
- `VITE_SUPABASE_ANON_KEY`: Supabase 익명 키

### 데이터베이스
- Supabase에서 테이블 생성 필요
- `database/migrations/` 폴더의 SQL 스크립트 실행
- RLS(Row Level Security) 정책 적용

## 📊 데이터 구조

### 주요 테이블
- `kotra`: KOTRA 기업 데이터
- `rfq_supabase`: RFQ 데이터
- `sof_supabase`: SOF 데이터
- `vpn_connections`: VPN 연결 데이터
- `hyundai_motors`: 현대자동차 데이터
- `kt_pops`: KT POP 데이터
- `synergy_sales`: Synergy 판매 데이터
- `euro_pricing_q2_*`: 유로 가격 데이터 (분기별)

## 🔄 작업 흐름

1. **데이터 수집**: CSV/Excel 파일을 `data/` 폴더에 저장
2. **데이터 처리**: Python 스크립트로 데이터 정제 및 변환
3. **데이터 업로드**: Supabase로 데이터 업로드
4. **분석 및 시각화**: React 앱에서 데이터 조회 및 시각화
5. **보고서 생성**: 분석 결과를 기반으로 보고서 생성

## 📚 추가 문서

- [Claude AI 통합 가이드](./docs/CLAUDE.md)
- [데이터 업로드 안내서](./docs/새_데이터_업로드_안내서.md)
- [RLS 정책 설명서](./docs/RLS_정책_설명서.md)
- [테이블 정의서](./docs/테이블_정의서_수동.md)