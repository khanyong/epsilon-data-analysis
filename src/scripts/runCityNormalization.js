import 'dotenv/config';
import { CityNormalizer, normalizeAllCities, analyzeCities, testCityNormalization } from '../utils/cityNormalizer.js';

// 명령줄 인수 처리
const mode = process.argv[2] || 'help';

async function main() {
  console.log('🏙️ 도시명 정규화 도구');
  console.log('='.repeat(50));

  switch (mode.toLowerCase()) {
    case 'test':
      await runTests();
      break;
    
    case 'normalize':
      console.log('🔄 기존 데이터베이스의 도시명 정규화 시작...');
      await normalizeAllCities();
      break;
    
    case 'analyze':
      console.log('📊 도시별 통계 분석 시작...');
      await analyzeCities();
      break;
    
    case 'single':
      const testCity = process.argv[3];
      if (!testCity) {
        console.log('❌ 테스트할 도시명을 입력해주세요.');
        console.log('예: npm run city-normalize single "New York City"');
        return;
      }
      testCityNormalization(testCity);
      break;
    
    default:
      showHelp();
      break;
  }
}

// 테스트 실행
async function runTests() {
  console.log('🧪 도시명 정규화 테스트 시작...\n');
  
  const testCases = [
    // 기본 테스트
    'New York City',
    'Los Angeles City',
    'Tokyo Shi',
    'Seoul Si',
    'Beijing Shi',
    'Mumbai City',
    
    // 아랍어권 도시명 테스트
    'Al-Riyadh City',
    'El-Cairo Governorate',
    'As-Sharjah Emirate',
    'Ad-Doha City',
    'Jidda City',
    'Makkah Province',
    'Madinah Region',
    'Dubayy Emirate',
    'Bayrut City',
    'Dimashq Governorate',
    'Al-Kuwait City',
    'Qahirah Governorate',
    'Iskandariyah City',
    'Casablanca City',
    'Marrakesh City',
    'Fes City',
    'Algiers City',
    'Tunis City',
    'Tripoli City',
    'Baghdad City',
    'Mosul City',
    'Tehran City',
    'Isfahan City',
    'Mashhad City',
    
    // 아랍어 원문 테스트
    'دبي',
    'الرياض',
    'القاهرة',
    'بغداد',
    'بيروت',
    'دمشق',
    'عمان',
    'الدوحة',
    'الكويت',
    'مسقط',
    'المنامة',
    
    // 한국어 도시명 테스트
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '수원시',
    '성남시',
    '고양시',
    '용인시',
    '부천시',
    '안산시',
    '안양시',
    '남양주시',
    
    // 중국어 도시명 테스트 (간체)
    '北京',
    '上海',
    '广州',
    '深圳',
    '天津',
    '重庆',
    '成都',
    '武汉',
    '西安',
    '南京',
    '杭州',
    '苏州',
    
    // 중국어 도시명 테스트 (번체)
    '台北',
    '台中',
    '高雄',
    '香港',
    '澳門',
    
    // 일본어 도시명 테스트
    '東京',
    '大阪',
    '横浜',
    '名古屋',
    '札幌',
    '神戸',
    '京都',
    '福岡',
    
    // 베트남어 도시명 테스트
    'Hà Nội',
    'Thành phố Hồ Chí Minh',
    'Hải Phòng',
    'Đà Nẵng',
    'Cần Thơ',
    'Thủ Đức',
    'Huế',
    'Nha Trang',
    
    // 터키어 도시명 테스트
    'İstanbul',
    'Ankara',
    'İzmir',
    'Bursa',
    'Antalya',
    'Kadıköy',
    'Üsküdar',
    'Beyoğlu',
    'Şişli',
    'Beşiktaş',
    
    // 태국어 도시명 테스트
    'กรุงเทพ',
    'เชียงใหม่',
    'นครราชสีมา',
    'หาดใหญ่',
    'ภูเก็ต',
    'พัทยา',
    
    // 프랑스어 특수 케이스
    'Ferrières-en-Brie',
    'Saint-Denis',
    'Boulogne-Billancourt',
    'Aix-en-Provence',
    'Clermont-Ferrand'
  ];
  
  const normalizer = new CityNormalizer();
  
  // 아랍어권 도시명만 먼저 테스트
  console.log('🕌 아랍어권 도시명 테스트:');
  const arabicCities = testCases.slice(6, 33); // 아랍어권 도시들만
  for (const testCity of arabicCities) {
    normalizer.testNormalization(testCity);
  }
  
  console.log('\n🏙️ 기타 도시명 테스트:');
  for (const testCity of testCases.slice(0, 6)) { // 처음 6개만 테스트
    normalizer.testNormalization(testCity);
  }
  
  console.log('\n✅ 테스트 완료!');
}

// 도움말 표시
function showHelp() {
  console.log(`
📖 사용법:
  npm run city-normalize <mode> [options]

🔧 모드:
  test       - 샘플 도시명들로 정규화 테스트
  normalize  - 기존 데이터베이스의 모든 도시명 정규화
  analyze    - 도시별 통계 분석 및 상위 도시 목록
  single     - 단일 도시명 테스트
  help       - 이 도움말 표시

💡 예제:
  npm run city-normalize test
  npm run city-normalize normalize
  npm run city-normalize analyze
  npm run city-normalize single "New York City"

⚠️  주의사항:
  - 이 도구는 Google API를 사용하지 않습니다
  - 기존 city_a, city_b 컬럼의 데이터만 정리합니다
  - 데이터베이스 연결을 위해 .env 파일이 필요합니다
  `);
}

// 메인 실행
main().catch(error => {
  console.error('❌ 실행 오류:', error);
  process.exit(1);
}); 