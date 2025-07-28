// KOTRA 인도 진출 기업 포괄적 분석
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// 환경 변수 로드
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function comprehensiveKotraAnalysis() {
  console.log('🔍 KOTRA 인도 진출 기업 포괄적 분석...');
  
  try {
    // 1. 다양한 검색 조건으로 뭄바이 기업 수집
    console.log('\n🏙️ 뭄바이 기업 포괄적 수집...');
    
    const mumbaiQueries = [
      { field: 'city', value: '%mumbai%' },
      { field: 'city', value: '%bombay%' },
      { field: 'office', value: '%뭄바이%' },
      { field: 'local_address', value: '%mumbai%' },
      { field: 'local_address', value: '%bombay%' }
    ];
    
    let allMumbaiCompanies = [];
    let uniqueMumbaiIds = new Set();
    
    for (const query of mumbaiQueries) {
      const { data, error } = await supabase
        .from('kotra')
        .select('*')
        .ilike(query.field, query.value);
      
      if (!error && data) {
        data.forEach(company => {
          if (!uniqueMumbaiIds.has(company.id)) {
            uniqueMumbaiIds.add(company.id);
            allMumbaiCompanies.push(company);
          }
        });
      }
    }
    
    console.log(`✅ 뭄바이 총 기업 수: ${allMumbaiCompanies.length}개`);
    
    // 2. 다양한 검색 조건으로 첸나이 기업 수집
    console.log('\n🏙️ 첸나이 기업 포괄적 수집...');
    
    const chennaiQueries = [
      { field: 'city', value: '%chennai%' },
      { field: 'city', value: '%madras%' },
      { field: 'office', value: '%첸나이%' },
      { field: 'local_address', value: '%chennai%' },
      { field: 'local_address', value: '%madras%' }
    ];
    
    let allChennaiCompanies = [];
    let uniqueChennaiIds = new Set();
    
    for (const query of chennaiQueries) {
      const { data, error } = await supabase
        .from('kotra')
        .select('*')
        .ilike(query.field, query.value);
      
      if (!error && data) {
        data.forEach(company => {
          if (!uniqueChennaiIds.has(company.id)) {
            uniqueChennaiIds.add(company.id);
            allChennaiCompanies.push(company);
          }
        });
      }
    }
    
    console.log(`✅ 첸나이 총 기업 수: ${allChennaiCompanies.length}개`);
    
    // 3. 인도 전체 기업 수집 (다양한 조건)
    console.log('\n🇮🇳 인도 전체 기업 포괄적 수집...');
    
    const indiaQueries = [
      { field: 'country', value: '%india%' },
      { field: 'country', value: '%인도%' },
      { field: 'continent', value: '%서남아%' }
    ];
    
    let allIndiaCompanies = [];
    let uniqueIndiaIds = new Set();
    
    for (const query of indiaQueries) {
      const { data, error } = await supabase
        .from('kotra')
        .select('*')
        .ilike(query.field, query.value);
      
      if (!error && data) {
        data.forEach(company => {
          if (!uniqueIndiaIds.has(company.id)) {
            uniqueIndiaIds.add(company.id);
            allIndiaCompanies.push(company);
          }
        });
      }
    }
    
    console.log(`✅ 인도 전체 기업 수: ${allIndiaCompanies.length}개`);
    
    // 4. 주요 도시별 추가 분석
    console.log('\n🔍 주요 도시별 추가 분석...');
    
    const majorCities = [
      { name: 'delhi', displayName: '델리', queries: ['%delhi%', '%뉴델리%'] },
      { name: 'bangalore', displayName: '방갈로르', queries: ['%bangalore%', '%벵갈루루%'] },
      { name: 'hyderabad', displayName: '하이데라바드', queries: ['%hyderabad%'] },
      { name: 'pune', displayName: '푸네', queries: ['%pune%'] },
      { name: 'kolkata', displayName: '콜카타', queries: ['%kolkata%', '%calcutta%'] }
    ];
    
    const cityResults = {};
    
    for (const city of majorCities) {
      let cityCompanies = [];
      let uniqueCityIds = new Set();
      
      for (const query of city.queries) {
        const { data, error } = await supabase
          .from('kotra')
          .select('*')
          .or(`city.ilike.${query},office.ilike.${query},local_address.ilike.${query}`);
        
        if (!error && data) {
          data.forEach(company => {
            if (!uniqueCityIds.has(company.id)) {
              uniqueCityIds.add(company.id);
              cityCompanies.push(company);
            }
          });
        }
      }
      
      cityResults[city.name] = {
        count: cityCompanies.length,
        displayName: city.displayName,
        companies: cityCompanies
      };
      
      console.log(`  ${city.displayName}: ${cityCompanies.length}개`);
    }
    
    // 5. 종합 분석 결과
    console.log('\n📊 종합 분석 결과:');
    console.log('=' * 60);
    console.log(`🇮🇳 인도 전체: ${allIndiaCompanies.length}개`);
    console.log(`🏙️ 뭄바이: ${allMumbaiCompanies.length}개`);
    console.log(`🏙️ 첸나이: ${allChennaiCompanies.length}개`);
    
    Object.values(cityResults).forEach(city => {
      console.log(`🏙️ ${city.displayName}: ${city.count}개`);
    });
    console.log('=' * 60);
    
    // 6. 산업별 분석
    console.log('\n🏭 산업별 분석:');
    
    const mumbaiIndustries = analyzeIndustries(allMumbaiCompanies, '뭄바이');
    const chennaiIndustries = analyzeIndustries(allChennaiCompanies, '첸나이');
    
    // 7. 결과 저장
    const comprehensiveReport = {
      timestamp: new Date().toISOString(),
      summary: {
        india: allIndiaCompanies.length,
        mumbai: allMumbaiCompanies.length,
        chennai: allChennaiCompanies.length,
        otherCities: Object.fromEntries(
          Object.entries(cityResults).map(([key, city]) => [key, city.count])
        )
      },
      detailedData: {
        mumbai: allMumbaiCompanies,
        chennai: allChennaiCompanies,
        india: allIndiaCompanies,
        otherCities: cityResults
      },
      industryAnalysis: {
        mumbai: mumbaiIndustries,
        chennai: chennaiIndustries
      }
    };
    
    // 저장
    const outputDir = 'data/kotra_analysis';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(outputDir, 'comprehensive_kotra_analysis.json'),
      JSON.stringify(comprehensiveReport, null, 2)
    );
    
    // 상세 데이터 파일들 저장
    fs.writeFileSync(
      path.join(outputDir, 'mumbai_companies_comprehensive.json'),
      JSON.stringify(allMumbaiCompanies, null, 2)
    );
    
    fs.writeFileSync(
      path.join(outputDir, 'chennai_companies_comprehensive.json'),
      JSON.stringify(allChennaiCompanies, null, 2)
    );
    
    console.log('\n✅ 포괄적 분석 완료!');
    console.log('📁 결과 파일:');
    console.log('  - comprehensive_kotra_analysis.json');
    console.log('  - mumbai_companies_comprehensive.json');
    console.log('  - chennai_companies_comprehensive.json');
    
  } catch (error) {
    console.error('❌ 분석 중 오류:', error);
  }
}

// 산업별 분석 함수
function analyzeIndustries(data, cityName) {
  const industryMap = {};
  const entryTypeMap = {};
  
  data.forEach(company => {
    const industry = company.industry_major || '미분류';
    const entryType = company.entry_type || '미분류';
    
    industryMap[industry] = (industryMap[industry] || 0) + 1;
    entryTypeMap[entryType] = (entryTypeMap[entryType] || 0) + 1;
  });
  
  console.log(`\n📈 ${cityName} 분석:`);
  console.log(`  📊 총 기업 수: ${data.length}개`);
  
  console.log('  🏭 주요 산업 (상위 5개):');
  Object.entries(industryMap)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .forEach(([industry, count]) => {
      console.log(`    - ${industry}: ${count}개`);
    });
  
  console.log('  🏢 진출 유형 (상위 5개):');
  Object.entries(entryTypeMap)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .forEach(([entryType, count]) => {
      console.log(`    - ${entryType}: ${count}개`);
    });
  
  return {
    industries: industryMap,
    entryTypes: entryTypeMap
  };
}

// 스크립트 실행
comprehensiveKotraAnalysis().then(() => {
  console.log('\n✅ 포괄적 분석 완료');
  process.exit(0);
}).catch((error) => {
  console.error('❌ 분석 실패:', error);
  process.exit(1);
}); 