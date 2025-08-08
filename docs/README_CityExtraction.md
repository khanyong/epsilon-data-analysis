# 🏙️ 도시명 추출 기능 사용법

Google Geocoding API를 사용하여 RFQ 데이터베이스의 LocationA, LocationB 컬럼에서 도시명을 추출하여 city_a, city_b 컬럼에 저장하는 기능입니다.

## 📋 사전 준비

### 1. 데이터베이스 컬럼 추가

Supabase SQL Editor에서 다음 SQL을 실행하세요:

```sql
-- RFQ 테이블에 새 컬럼 추가
ALTER TABLE rfq 
ADD COLUMN city_a TEXT,
ADD COLUMN city_b TEXT;
```

### 2. Google API 키 설정

1. `src/scripts/runCityExtraction.js` 파일을 열어주세요
2. `GOOGLE_API_KEY` 변수에 실제 API 키를 입력하세요:

```javascript
const GOOGLE_API_KEY = 'AIzaSyD...'; // 실제 API 키 입력
```

## 🚀 사용법

### 테스트 실행 (추천)

먼저 샘플 주소들로 테스트해보세요:

```bash
npm run city-extract test
```

### 전체 데이터 처리

모든 RFQ 레코드를 처리합니다:

```bash
npm run city-extract run
```

### 특정 레코드만 처리

특정 ID의 레코드들만 처리합니다:

```bash
npm run city-extract specific 1 2 3 10 15
```

### 단일 주소 테스트

하나의 주소만 테스트해봅니다:

```bash
npm run city-extract single "Seoul, South Korea"
```

## 📊 기능 특징

### ✅ 장점

- **정확도 100%**: Google의 전 세계 주소 데이터베이스 활용
- **캐싱 시스템**: 중복 주소 요청 방지로 API 비용 절약
- **배치 처리**: 대량 데이터 안전하게 처리
- **에러 처리**: 실패한 레코드 건너뛰고 계속 진행
- **진행상황 표시**: 실시간 처리 현황 확인

### 🔧 기술적 특징

- **API 제한 관리**: 초당 10회 요청 제한으로 안전한 처리
- **재시작 가능**: 중단된 지점부터 다시 시작 가능
- **선택적 처리**: 이미 처리된 레코드는 건너뛰기

## 📈 예상 처리 결과

### 입력 주소 예시:
```
SRY.No: 134-151,189-195, 335-383, Ammavaru palli, Erramanchi (village), Penukonda Mandal, Andhra Pradesh, 515164, India
```

### 추출 결과:
```
city_a: Penukonda
```

## 💰 API 비용 관리

### Google Geocoding API 요금
- **무료 할당량**: 월 $200 크레딧 (약 40,000회 요청)
- **초과 시**: $5 per 1,000 requests

### 비용 절약 방법
1. **캐싱**: 동일 주소 중복 요청 방지
2. **배치 처리**: 소량씩 나누어 처리
3. **선택적 처리**: 필요한 레코드만 처리

## 🔍 처리 결과 확인

### 성공 로그 예시:
```
✅ ID 123: Seoul | Tokyo
✅ ID 124: Singapore | (없음)
```

### 최종 통계:
```
📊 처리 결과:
   - 총 처리: 1000개
   - 성공: 950개
   - 오류: 50개
   - API 호출: 800회
   - 캐시 적중: 200개
```

## ⚠️ 주의사항

1. **API 키 보안**: 절대 공개 저장소에 노출하지 마세요
2. **점진적 처리**: 한 번에 대량 처리보다는 소량씩 테스트
3. **백업**: 처리 전 데이터베이스 백업 권장
4. **모니터링**: Google Cloud Console에서 API 사용량 확인

## 🛠️ 문제 해결

### API 키 오류
```
❌ API 오류 (REQUEST_DENIED)
```
→ API 키 확인 및 Geocoding API 활성화 확인

### 할당량 초과
```
❌ API 오류 (OVER_QUERY_LIMIT)
```
→ 잠시 대기 후 재시도 또는 배치 크기 줄이기

### 네트워크 오류
```
❌ 네트워크 오류: fetch failed
```
→ 인터넷 연결 확인 및 재시도

## 📞 지원

문제가 발생하면 다음을 확인해주세요:

1. Google API 키가 올바르게 설정되었는지
2. Geocoding API가 활성화되었는지
3. 데이터베이스 컬럼이 추가되었는지
4. 네트워크 연결이 안정적인지

모든 준비가 완료되면 `npm run city-extract test`로 시작하세요! 🚀 