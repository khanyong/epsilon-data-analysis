import { runCityExtraction, testCityExtraction, CityExtractor } from '../utils/cityExtractor.js';

// ⚠️ 여기에 실제 Google API 키를 입력하세요
const GOOGLE_API_KEY = 'AIzaSyCu2-Drp3rsJ3Gw371at8lREC7uLZTCHc4';

async function main() {
  console.log('🏙️ 도시명 추출 스크립트 시작\n');

  if (GOOGLE_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
    console.error('❌ Google API 키를 설정해주세요!');
    console.log('📝 runCityExtraction.js 파일에서 GOOGLE_API_KEY 값을 변경하세요.');
    return;
  }

  // 사용자 선택
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  switch (command) {
    case 'test':
      console.log('🧪 테스트 모드 실행...\n');
      await testCityExtraction(GOOGLE_API_KEY);
      break;

    case 'run':
      console.log('🚀 전체 데이터 처리 시작...\n');
      await runCityExtraction(GOOGLE_API_KEY);
      break;

    case 'specific':
      const ids = args.slice(1).map(id => parseInt(id)).filter(id => !isNaN(id));
      if (ids.length === 0) {
        console.error('❌ 처리할 레코드 ID를 입력하세요.');
        console.log('예: npm run city-extract specific 1 2 3');
        return;
      }
      console.log(`🎯 특정 레코드 처리: ${ids.join(', ')}\n`);
      const extractor = new CityExtractor(GOOGLE_API_KEY);
      await extractor.processSpecificRecords(ids);
      break;

    case 'single':
      const address = args.slice(1).join(' ');
      if (!address) {
        console.error('❌ 테스트할 주소를 입력하세요.');
        console.log('예: npm run city-extract single "Seoul, South Korea"');
        return;
      }
      console.log(`🧪 단일 주소 테스트: ${address}\n`);
      const singleExtractor = new CityExtractor(GOOGLE_API_KEY);
      await singleExtractor.testSingleAddress(address);
      break;

    default:
      console.log('📖 사용법:');
      console.log('');
      console.log('  npm run city-extract test     - 샘플 주소들로 테스트');
      console.log('  npm run city-extract run      - 전체 RFQ 데이터 처리');
      console.log('  npm run city-extract specific [ids...] - 특정 레코드만 처리');
      console.log('  npm run city-extract single "주소" - 단일 주소 테스트');
      console.log('');
      console.log('📝 먼저 Google API 키를 설정하세요:');
      console.log('   src/scripts/runCityExtraction.js 파일에서 GOOGLE_API_KEY 수정');
      console.log('');
      console.log('🔧 데이터베이스 준비:');
      console.log('   Supabase에서 rfq 테이블에 city_a, city_b 컬럼 추가 필요');
      break;
  }
}

// 스크립트 실행
main().catch(error => {
  console.error('❌ 스크립트 실행 오류:', error);
  process.exit(1);
}); 