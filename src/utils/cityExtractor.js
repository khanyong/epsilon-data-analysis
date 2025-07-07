import { supabase } from '../services/supabaseService.js';

// Google Geocoding API를 사용한 도시명 추출
export class CityExtractor {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.cache = new Map(); // 중복 요청 방지용 캐시
    this.requestCount = 0;
    this.maxRequestsPerSecond = 10; // API 제한 고려
  }

  // 단일 주소에서 도시명 추출
  async extractCity(address) {
    if (!address || address.trim() === '') return '';

    // 캐시 확인
    if (this.cache.has(address)) {
      console.log(`캐시에서 가져옴: ${address.substring(0, 50)}...`);
      return this.cache.get(address);
    }

    try {
      // API 호출 제한 관리
      await this.rateLimitDelay();

      const encodedAddress = encodeURIComponent(address);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&language=en&key=${this.apiKey}`;
      
      console.log(`Google API 호출: ${address.substring(0, 50)}...`);
      
      const response = await fetch(url);
      const data = await response.json();
      
      this.requestCount++;
      
      if (data.status === 'OK' && data.results.length > 0) {
        const city = this.findCityFromComponents(data.results[0].address_components);
        const normalizedCity = this.normalizeCityName(city);
        
        // 캐시에 저장
        this.cache.set(address, normalizedCity);
        
        console.log(`✅ 성공: ${normalizedCity}`);
        return normalizedCity;
      } else {
        console.log(`❌ API 오류 (${data.status}): ${address.substring(0, 50)}...`);
        this.cache.set(address, ''); // 빈 값도 캐시하여 재요청 방지
        return '';
      }
    } catch (error) {
      console.error(`네트워크 오류: ${error.message}`);
      return '';
    }
  }

  // 주소 컴포넌트에서 도시명 찾기
  findCityFromComponents(components) {
    // 1순위: locality (도시)
    let city = components.find(comp => comp.types.includes('locality'))?.long_name;
    if (city) return city;
    
    // 2순위: administrative_area_level_2 (군/구)
    city = components.find(comp => comp.types.includes('administrative_area_level_2'))?.long_name;
    if (city) return city;
    
    // 3순위: administrative_area_level_1 (주/도)
    city = components.find(comp => comp.types.includes('administrative_area_level_1'))?.long_name;
    if (city) return city;
    
    // 4순위: sublocality (하위 지역)
    city = components.find(comp => comp.types.includes('sublocality'))?.long_name;
    
    return city || '';
  }

  // API 호출 제한 관리
  async rateLimitDelay() {
    const delay = 1000 / this.maxRequestsPerSecond; // 초당 요청 수 제한
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // 전체 RFQ 데이터 처리
  async processAllRFQData(batchSize = 10) {
    try {
      console.log('🚀 RFQ 데이터 도시명 추출 시작...');
      
      // 1. 아직 처리되지 않은 데이터 가져오기
      const { data: rfqData, error } = await supabase
        .from('rfq')
        .select('uuid, "Location A", "Location B", city_a, city_b')
        .or('city_a.is.null,city_b.is.null');

      if (error) {
        console.error('데이터 조회 오류:', error);
        return;
      }

      console.log(`총 ${rfqData.length}개 레코드 처리 예정`);

      // 2. 배치 단위로 처리
      let processedCount = 0;
      let successCount = 0;
      let errorCount = 0;

      for (let i = 0; i < rfqData.length; i += batchSize) {
        const batch = rfqData.slice(i, i + batchSize);
        console.log(`\n📦 배치 ${Math.floor(i/batchSize) + 1}/${Math.ceil(rfqData.length/batchSize)} 처리 중...`);
        
        for (const row of batch) {
          try {
            let cityA = row['city_a']; // 기존 값 유지
            let cityB = row['city_b']; // 기존 값 유지
            let needsUpdate = false;

            // LocationA 처리 (아직 도시명이 없는 경우만)
            if (row["Location A"] && !cityA) {
              cityA = await this.extractCity(row["Location A"]);
              needsUpdate = true;
            }

            // LocationB 처리 (아직 도시명이 없는 경우만)
            if (row["Location B"] && !cityB) {
              cityB = await this.extractCity(row["Location B"]);
              needsUpdate = true;
            }

            // 3. 데이터베이스 업데이트 (변경사항이 있는 경우만)
            if (needsUpdate) {
              const { error: updateError } = await supabase
                .from('rfq')
                .update({
                  city_a: cityA || '',
                  city_b: cityB || ''
                })
                .eq('uuid', row.uuid);

              if (updateError) {
                console.error(`❌ ID ${row.uuid} 업데이트 오류:`, updateError);
                errorCount++;
              } else {
                console.log(`✅ ID ${row.uuid}: ${cityA || '(없음)'} | ${cityB || '(없음)'}`);
                successCount++;
              }
            }

            processedCount++;

          } catch (error) {
            console.error(`❌ ID ${row.uuid} 처리 오류:`, error);
            errorCount++;
          }
        }

        // 배치 간 휴식
        if (i + batchSize < rfqData.length) {
          console.log('⏱️ 배치 간 휴식 (2초)...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      // 4. 최종 결과 출력
      console.log('\n🎉 처리 완료!');
      console.log(`📊 처리 결과:`);
      console.log(`   - 총 처리: ${processedCount}개`);
      console.log(`   - 성공: ${successCount}개`);
      console.log(`   - 오류: ${errorCount}개`);
      console.log(`   - API 호출: ${this.requestCount}회`);
      console.log(`   - 캐시 적중: ${this.cache.size}개`);

    } catch (error) {
      console.error('전체 처리 오류:', error);
    }
  }

  // 특정 레코드들만 처리
  async processSpecificRecords(recordIds) {
    try {
      console.log(`🎯 특정 레코드 ${recordIds.length}개 처리 시작...`);

      const { data: rfqData, error } = await supabase
        .from('rfq')
        .select('uuid, "Location A", "Location B"')
        .in('uuid', recordIds);

      if (error) {
        console.error('데이터 조회 오류:', error);
        return;
      }

      for (const row of rfqData) {
        const cityA = row["Location A"] ? await this.extractCity(row["Location A"]) : '';
        const cityB = row["Location B"] ? await this.extractCity(row["Location B"]) : '';

        const { error: updateError } = await supabase
          .from('rfq')
          .update({
            city_a: cityA,
            city_b: cityB
          })
          .eq('uuid', row.uuid);

        if (updateError) {
          console.error(`❌ ID ${row.uuid} 업데이트 오류:`, updateError);
        } else {
          console.log(`✅ ID ${row.uuid}: ${cityA} | ${cityB}`);
        }
      }

      console.log('🎉 특정 레코드 처리 완료!');

    } catch (error) {
      console.error('특정 레코드 처리 오류:', error);
    }
  }

  // 테스트용 함수
  async testSingleAddress(address) {
    console.log(`🧪 테스트 주소: ${address}`);
    const city = await this.extractCity(address);
    console.log(`결과: ${city}`);
    return city;
  }

  // 통계 정보 출력
  getStats() {
    return {
      totalRequests: this.requestCount,
      cacheSize: this.cache.size,
      cacheEntries: Array.from(this.cache.entries()).slice(0, 5) // 첫 5개만
    };
  }

  // 도시명 정규화 함수
  normalizeCityName(cityName) {
    if (!cityName || cityName.trim() === '') return '';
    
    let normalized = cityName.trim();
    
    // 1. 일반적인 접미사 제거
    const suffixesToRemove = [
      ' City', ' city', ' CITY',
      ' Si', ' si', ' SI',           // 한국어 "시"
      ' Shi', ' shi', ' SHI',        // 중국어 "市"
      ' To', ' to', ' TO',           // 일본어 "都"
      ' Fu', ' fu', ' FU',           // 일본어 "府"
      ' Ken', ' ken', ' KEN',        // 일본어 "県"
      ' Province', ' province',
      ' Prefecture', ' prefecture',
      ' Municipality', ' municipality',
      ' Metropolitan', ' metropolitan',
      ' District', ' district',
      ' County', ' county'
    ];
    
    for (const suffix of suffixesToRemove) {
      if (normalized.endsWith(suffix)) {
        normalized = normalized.slice(0, -suffix.length).trim();
        break; // 첫 번째 매칭만 제거
      }
    }
    
    // 2. 국가명 제거 (쉼표 뒤 부분)
    if (normalized.includes(',')) {
      normalized = normalized.split(',')[0].trim();
    }
    
    // 3. 괄호 안 내용 제거
    normalized = normalized.replace(/\([^)]*\)/g, '').trim();
    
    // 4. 하이픈을 공백으로 변환
    normalized = normalized.replace(/-/g, ' ');
    
    // 5. 연속 공백을 단일 공백으로
    normalized = normalized.replace(/\s+/g, ' ').trim();
    
    // 6. 첫 글자 대문자화 (각 단어별)
    normalized = normalized.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    // 7. 특별한 케이스 매핑
    const cityMappings = {
      'Nyc': 'New York',
      'La': 'Los Angeles', 
      'Sf': 'San Francisco',
      'Dc': 'Washington',
      'Hk': 'Hong Kong',
      'Sg': 'Singapore',
      'Kl': 'Kuala Lumpur',
      'Bj': 'Beijing',
      'Sh': 'Shanghai',
      'Gz': 'Guangzhou',
      'Sz': 'Shenzhen'
    };
    
    if (cityMappings[normalized]) {
      normalized = cityMappings[normalized];
    }
    
    console.log(`🔄 정규화: "${cityName}" → "${normalized}"`);
    return normalized;
  }
}

// 사용 예제 및 실행 함수들
export async function runCityExtraction() {
  // 스크립트에서 API 키를 전달받도록 수정
  const GOOGLE_API_KEY = arguments[0] || 'YOUR_GOOGLE_API_KEY_HERE';
  
  if (GOOGLE_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
    console.error('❌ Google API 키를 설정해주세요!');
    return;
  }

  const extractor = new CityExtractor(GOOGLE_API_KEY);

  // 전체 데이터 처리
  await extractor.processAllRFQData(5); // 배치 크기 5개씩
}

// 테스트 실행
export async function testCityExtraction() {
  // 스크립트에서 API 키를 전달받도록 수정
  const GOOGLE_API_KEY = arguments[0] || 'YOUR_GOOGLE_API_KEY_HERE';
  
  if (GOOGLE_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
    console.error('❌ Google API 키를 설정해주세요!');
    return;
  }

  const extractor = new CityExtractor(GOOGLE_API_KEY);

  // 테스트 주소들
  const testAddresses = [
    "SRY.No: 134-151,189-195, 335-383, Ammavaru palli, Erramanchi (village), Penukonda Mandal, Andhra Pradesh, 515164, India",
    "Boulevard de Russie, Yaound?, BP 11 939, CMR, BP 11 939",
    "COLONEL BOURGSTRAAT 109 Comp. 1 EVERE, Belgium 1140"
  ];

  console.log('🧪 테스트 시작...\n');

  for (const address of testAddresses) {
    await extractor.testSingleAddress(address);
    console.log('---');
  }

  console.log('\n📊 통계:', extractor.getStats());
}

// 기본 내보내기
export default CityExtractor; 