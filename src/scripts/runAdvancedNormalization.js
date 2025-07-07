import 'dotenv/config';
import { supabase } from '../services/supabaseService.js';
import { AdvancedCityNormalizer } from '../utils/advancedCityNormalizer.js';

const normalizer = new AdvancedCityNormalizer();

// 테스트 케이스들
const testCases = [
  // 베트남어 테스트
  'Quận 7',
  'Thành phố Hồ Chí Minh',
  'Thủ Đức',
  'Ba Đình',
  'Dĩ An',
  
  // 터키어 테스트
  'İstanbul',
  'Kadıköy',
  'Şişli',
  'Büyükçekmece',
  
  // 아랍어 테스트
  'دبي',
  'أبو ظبي',
  'الرياض',
  
  // 한국어 테스트
  '서울특별시',
  '영통구',
  '부산광역시',
  
  // 중국어 테스트
  '北京市',
  '上海',
  '广州市',
  
  // 복잡한 주소 테스트
  'Interxion FRA11, Weismuellerstraße 40, 60314 Frankfurt am Main, Germany',
  'No. 1 Science Park Road, Singapore Science Park II, The Capricorn, 02-10/11, Singapore, 117528, Singapore',
  'Unit 2503-2506, 25/F, Tower 1, Jing An Kerry Centre, 1515 Nanjing Road West, Jing An District, Shanghai, China 200040',
  'Room 364,Neutral Cargo Terminal, KongGang 9 Road, Guangzhou Baiyun Int\'l Airport.',
  'KINX Dogok (5/F) 13 Eonju-ro 30-gil 5th Floor Seoul, 135-272, South Korea',
  
  // Mixed/Unknown 케이스들
  'Halkalı Merkez Mah. Basın Ekspres Cad. Capital Tower No: 9 Kat: 10, Halkalı, Küçükçekmece 34303',
  'Hanauer Landstraße 302, 60314 Frankfurt am Main, Germany',
  'Hong Kong, 中環皇后大道中39號25/F',
  'Jl. Kuningan Barat No. 8 RT.1/RW.3 Jakarta 12710',
  'No.21, Xi dawang road, Chaoyang district, Beijing Hopson One local: L1-05, B2-S01C'
];

// 테스트 함수
async function runTests() {
  console.log('🧪 고급 도시명 정규화 테스트 시작');
  console.log('='.repeat(60));
  
  console.log('\n📋 테스트 케이스 결과:');
  console.log('-'.repeat(60));
  
  testCases.forEach((testCase, index) => {
    const result = normalizer.normalizeCity(testCase);
    console.log(`${(index + 1).toString().padStart(2, '0')}. "${testCase}"`);
    console.log(`    → "${result}"`);
    console.log('');
  });
}

// 실제 데이터베이스 데이터 정규화
async function normalizeDatabase() {
  try {
    console.log('🔄 데이터베이스 도시명 정규화 시작...');
    console.log('='.repeat(60));
    
    // 데이터 조회
    const { data: rfqData, error } = await supabase
      .from('rfq')
      .select('uuid, city_a, city_b, "Location A", "Location B"');

    if (error) {
      console.error('❌ 데이터 조회 오류:', error);
      return;
    }

    console.log(`📊 총 ${rfqData.length}개 레코드 처리 중...\n`);

    let processedCount = 0;
    let updatedCount = 0;
    const errors = [];
    
    // 배치 크기
    const batchSize = 100;
    
    for (let i = 0; i < rfqData.length; i += batchSize) {
      const batch = rfqData.slice(i, i + batchSize);
      const updates = [];
      
      for (const row of batch) {
        try {
          // 기존 도시명들
          const originalCityA = row.city_a || '';
          const originalCityB = row.city_b || '';
          const originalLocationA = row["Location A"] || '';
          const originalLocationB = row["Location B"] || '';
          
          // 정규화 적용
          let newCityA = originalCityA;
          let newCityB = originalCityB;
          
          // city_a가 비어있고 Location A가 있으면 Location A에서 추출
          if (!originalCityA && originalLocationA) {
            newCityA = normalizer.normalizeCity(originalLocationA);
          } else if (originalCityA) {
            newCityA = normalizer.normalizeCity(originalCityA);
          }
          
          // city_b가 비어있고 Location B가 있으면 Location B에서 추출
          if (!originalCityB && originalLocationB) {
            newCityB = normalizer.normalizeCity(originalLocationB);
          } else if (originalCityB) {
            newCityB = normalizer.normalizeCity(originalCityB);
          }
          
          // 변경이 있는 경우만 업데이트
          if (newCityA !== originalCityA || newCityB !== originalCityB) {
            updates.push({
              uuid: row.uuid,
              city_a: newCityA,
              city_b: newCityB
            });
          }
          
          processedCount++;
          
          // 진행상황 표시
          if (processedCount % 100 === 0) {
            console.log(`⏳ 처리 중... ${processedCount}/${rfqData.length} (${((processedCount/rfqData.length)*100).toFixed(1)}%)`);
          }
          
        } catch (error) {
          errors.push({
            uuid: row.uuid,
            error: error.message
          });
        }
      }
      
      // 배치 업데이트 실행
      if (updates.length > 0) {
        for (const update of updates) {
          const { error: updateError } = await supabase
            .from('rfq')
            .update({
              city_a: update.city_a,
              city_b: update.city_b
            })
            .eq('uuid', update.uuid);
          
          if (updateError) {
            errors.push({
              uuid: update.uuid,
              error: updateError.message
            });
          } else {
            updatedCount++;
          }
        }
      }
      
      // 잠시 대기 (API 제한 방지)
      if (i + batchSize < rfqData.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log('\n✅ 정규화 완료!');
    console.log('-'.repeat(40));
    console.log(`📊 처리된 레코드: ${processedCount}개`);
    console.log(`🔄 업데이트된 레코드: ${updatedCount}개`);
    console.log(`❌ 오류 발생: ${errors.length}개`);
    
    if (errors.length > 0) {
      console.log('\n❌ 오류 목록:');
      errors.slice(0, 10).forEach(error => {
        console.log(`  - ${error.uuid}: ${error.error}`);
      });
      if (errors.length > 10) {
        console.log(`  ... 그 외 ${errors.length - 10}개 오류`);
      }
    }
    
  } catch (error) {
    console.error('❌ 정규화 오류:', error);
  }
}

// 정규화 통계 분석
async function analyzeNormalization() {
  try {
    console.log('📈 정규화 효과 분석 중...');
    console.log('='.repeat(60));
    
    const { data: rfqData, error } = await supabase
      .from('rfq')
      .select('city_a, city_b, "Location A", "Location B"');

    if (error) {
      console.error('❌ 데이터 조회 오류:', error);
      return;
    }

    // 원본 데이터 수집
    const originalCities = [];
    const normalizedCities = [];
    
    rfqData.forEach(row => {
      // 원본 도시명들
      if (row.city_a) originalCities.push(row.city_a);
      if (row.city_b) originalCities.push(row.city_b);
      if (row["Location A"]) originalCities.push(row["Location A"]);
      if (row["Location B"]) originalCities.push(row["Location B"]);
      
      // 정규화된 도시명들
      if (row.city_a) normalizedCities.push(normalizer.normalizeCity(row.city_a));
      if (row.city_b) normalizedCities.push(normalizer.normalizeCity(row.city_b));
      if (row["Location A"]) normalizedCities.push(normalizer.normalizeCity(row["Location A"]));
      if (row["Location B"]) normalizedCities.push(normalizer.normalizeCity(row["Location B"]));
    });
    
    const stats = normalizer.getStats(originalCities);
    
    console.log('📊 정규화 통계:');
    console.log('-'.repeat(30));
    console.log(`총 도시명 수: ${stats.totalOriginal}개`);
    console.log(`고유 원본 도시명: ${stats.uniqueOriginal}개`);
    console.log(`고유 정규화 도시명: ${stats.uniqueNormalized}개`);
    console.log(`빈 결과: ${stats.emptyResults}개`);
    console.log(`압축 비율: ${(stats.compressionRatio * 100).toFixed(1)}%`);
    console.log(`중복 제거율: ${((1 - stats.compressionRatio) * 100).toFixed(1)}%`);
    
    // 가장 많이 나타나는 정규화된 도시명들
    const cityCount = new Map();
    normalizedCities.filter(city => city !== '').forEach(city => {
      cityCount.set(city, (cityCount.get(city) || 0) + 1);
    });
    
    const topCities = Array.from(cityCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
    
    console.log('\n🏆 상위 20개 도시 (정규화 후):');
    console.log('-'.repeat(40));
    topCities.forEach(([city, count], index) => {
      console.log(`${(index + 1).toString().padStart(2, '0')}. ${city}: ${count}개`);
    });
    
  } catch (error) {
    console.error('❌ 분석 오류:', error);
  }
}

// 샘플 정규화 미리보기
async function previewNormalization() {
  try {
    console.log('👀 정규화 미리보기 (샘플 50개)');
    console.log('='.repeat(60));
    
    const { data: sampleData, error } = await supabase
      .from('rfq')
      .select('uuid, city_a, city_b, "Location A", "Location B"')
      .limit(50);

    if (error) {
      console.error('❌ 데이터 조회 오류:', error);
      return;
    }

    console.log('원본 → 정규화 결과:');
    console.log('-'.repeat(60));
    
    let count = 0;
    sampleData.forEach(row => {
      const samples = [
        { label: 'city_a', value: row.city_a },
        { label: 'city_b', value: row.city_b },
        { label: 'Location A', value: row["Location A"] },
        { label: 'Location B', value: row["Location B"] }
      ].filter(item => item.value && item.value.trim() !== '');
      
      samples.forEach(sample => {
        if (count < 50) {
          const normalized = normalizer.normalizeCity(sample.value);
          console.log(`${(count + 1).toString().padStart(2, '0')}. [${sample.label}] "${sample.value}"`);
          console.log(`    → "${normalized}"`);
          console.log('');
          count++;
        }
      });
    });
    
  } catch (error) {
    console.error('❌ 미리보기 오류:', error);
  }
}

// 명령줄 인수 처리
const mode = process.argv[2] || 'test';

async function main() {
  switch (mode) {
    case 'test':
      await runTests();
      break;
    case 'normalize':
      await normalizeDatabase();
      break;
    case 'analyze':
      await analyzeNormalization();
      break;
    case 'preview':
      await previewNormalization();
      break;
    default:
      console.log('사용법:');
      console.log('  npm run advanced-normalize test     - 테스트 케이스 실행');
      console.log('  npm run advanced-normalize preview  - 정규화 미리보기');
      console.log('  npm run advanced-normalize analyze  - 정규화 효과 분석');
      console.log('  npm run advanced-normalize normalize - 실제 데이터베이스 정규화');
      break;
  }
}

main().catch(error => {
  console.error('❌ 실행 오류:', error);
  process.exit(1);
}); 