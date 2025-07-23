# 전략 데이터 분석기 (Strategic Data Analyzer)

## 🔐 보안 기능

### Supabase 인증 시스템
- **로그인/회원가입**: 이메일과 비밀번호 기반 인증
- **세션 관리**: 자동 세션 유지 및 만료 처리
- **보호된 라우트**: 인증되지 않은 사용자의 접근 차단
- **안전한 로그아웃**: 세션 완전 종료

### 보안 특징
- 모든 데이터는 암호화되어 저장
- 비밀번호는 안전하게 해시화
- HTTPS를 통한 안전한 통신
- JWT 토큰 기반 인증

## 🚀 시작하기

### 1. 환경 설정
```bash
# .env 파일에 Supabase 설정 추가
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 로그인
- 브라우저에서 `http://localhost:5173` 접속
- 로그인 페이지에서 계정 생성 또는 로그인
- 인증 후 대시보드 접근 가능

## 📊 주요 기능

### 사업성 분석 보고서
- **DCF 분석**: NPV, IRR 계산
- **시장 분석**: TAM/SAM/SOM 분석
- **투자 비용 분석**: CAPEX/OPEX 상세 분석
- **백업자료 시스템**: 모든 수치에 대한 근거자료 제공

### 보안 기능
- **인증 필수**: 모든 분석 기능은 로그인 후 접근 가능
- **세션 관리**: 자동 로그인 유지
- **안전한 로그아웃**: 완전한 세션 종료

## 🛠 기술 스택

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **인증**: Supabase Auth
- **라우팅**: React Router DOM
- **빌드 도구**: Vite

## 📁 프로젝트 구조

```
src/
├── components/
│   └── ProtectedRoute.tsx    # 보호된 라우트 컴포넌트
├── contexts/
│   └── AuthContext.tsx       # 인증 컨텍스트
├── lib/
│   └── supabase.ts          # Supabase 클라이언트
├── pages/
│   ├── Login.tsx            # 로그인 페이지
│   ├── Dashboard.tsx        # 메인 대시보드
│   └── MarketingReport.tsx  # 사업성 분석 보고서
└── App.tsx                  # 메인 앱 컴포넌트
```

## 🔧 개발 가이드

### 새로운 보호된 페이지 추가
1. `src/pages/`에 새 페이지 컴포넌트 생성
2. `src/App.tsx`에 라우트 추가
3. `ProtectedRoute`로 감싸서 보호

### 인증 상태 확인
```typescript
import { useAuth } from '../contexts/AuthContext'

function MyComponent() {
  const { user, loading, signOut } = useAuth()
  
  if (loading) return <div>로딩 중...</div>
  if (!user) return <div>로그인이 필요합니다</div>
  
  return <div>안녕하세요, {user.email}님!</div>
}
```

## 🚨 보안 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- Supabase 키는 안전하게 관리하세요
- 프로덕션 환경에서는 HTTPS를 사용하세요
- 정기적으로 비밀번호를 변경하세요

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해주세요. 