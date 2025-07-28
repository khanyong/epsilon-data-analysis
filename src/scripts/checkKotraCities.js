// kotra 테이블에서 인도, 뭄바이, 첸나이 도시에 진출한 기업 상세 분석
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
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '설정됨' : '누락');
  console.error('VITE_SUPABASE_KEY:', supabaseKey ? '설정됨' : '누락');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function analyzeKotraCities() {
  console.log('🔍 kotra 테이블에서 인도 도시별 기업 상세 분석 중...');
  
  try {
    // 1. 먼저 kotra 테이블의 구조 확인
    console.log('\n📋 kotra 테이블 구조 확인...');
    const { data: sampleData, error: sampleError } = await supabase
      .from('kotra')
      .select('*')
      .limit(1);
    
    if (sampleError) {
      console.error('❌ kotra 테이블 접근 오류:', sampleError);
      return;
    }
    
    if (sampleData && sampleData.length > 0) {
      console.log('✅ kotra 테이블 컬럼:');
      console.log(Object.keys(sampleData[0]));
    }
    
    // 2. 인도 전체 기업 데이터 수집
    console.log('\n🇮🇳 인도 전체 기업 데이터 수집...');
    const { data: indiaData, error: indiaError, count: indiaCount } = await supabase
      .from('kotra')
      .select('*', { count: 'exact' })
      .ilike('country', '%india%');
    
    if (indiaError) {
      console.error('❌ 인도 데이터 조회 오류:', indiaError);
    } else {
      console.log(`✅ 인도 전체 기업 수: ${indiaCount || 0}개`);
      
      // 인도 기업 데이터 분석
      if (indiaData && indiaData.length > 0) {
        analyzeCompanyData(indiaData, '인도 전체');
      }
    }
    
    // 3. 뭄바이 기업 데이터 수집
    console.log('\n🏙️ 뭄바이 기업 데이터 수집...');
    const { data: mumbaiData, error: mumbaiError, count: mumbaiCount } = await supabase
      .from('kotra')
      .select('*', { count: 'exact' })
      .ilike('city', '%mumbai%');
    
    if (mumbaiError) {
      console.error('❌ 뭄바이 데이터 조회 오류:', mumbaiError);
    } else {
      console.log(`✅ 뭄바이 기업 수: ${mumbaiCount || 0}개`);
      
      if (mumbaiData && mumbaiData.length > 0) {
        analyzeCompanyData(mumbaiData, '뭄바이');
        saveDetailedData(mumbaiData, 'mumbai_companies');
      }
    }
    
    // 4. 첸나이 기업 데이터 수집
    console.log('\n🏙️ 첸나이 기업 데이터 수집...');
    const { data: chennaiData, error: chennaiError, count: chennaiCount } = await supabase
      .from('kotra')
      .select('*', { count: 'exact' })
      .ilike('city', '%chennai%');
    
    if (chennaiError) {
      console.error('❌ 첸나이 데이터 조회 오류:', chennaiError);
    } else {
      console.log(`✅ 첸나이 기업 수: ${chennaiCount || 0}개`);
      
      if (chennaiData && chennaiData.length > 0) {
        analyzeCompanyData(chennaiData, '첸나이');
        saveDetailedData(chennaiData, 'chennai_companies');
      }
    }
    
    // 5. 인도 주요 도시들 데이터 수집
    console.log('\n🔍 인도 주요 도시들 데이터 수집...');
    const indianCities = [
      { name: 'delhi', displayName: '델리' },
      { name: 'bangalore', displayName: '방갈로르' },
      { name: 'hyderabad', displayName: '하이데라바드' },
      { name: 'pune', displayName: '푸네' },
      { name: 'kolkata', displayName: '콜카타' }
    ];
    
    const cityResults = {};
    
    for (const city of indianCities) {
      const { data: cityData, count: cityCount } = await supabase
        .from('kotra')
        .select('*', { count: 'exact' })
        .ilike('city', `%${city.name}%`);
      
      console.log(`  ${city.displayName}: ${cityCount || 0}개`);
      
      if (cityData && cityData.length > 0) {
        cityResults[city.name] = {
          data: cityData,
          count: cityCount,
          displayName: city.displayName
        };
      }
    }
    
    // 6. 종합 분석 결과 생성
    console.log('\n📊 종합 분석 결과:');
    console.log('=' * 60);
    console.log(`🇮🇳 인도 전체: ${indiaCount || 0}개`);
    console.log(`🏙️ 뭄바이: ${mumbaiCount || 0}개`);
    console.log(`🏙️ 첸나이: ${chennaiCount || 0}개`);
    
    // 주요 도시 요약
    Object.values(cityResults).forEach(city => {
      console.log(`🏙️ ${city.displayName}: ${city.count}개`);
    });
    console.log('=' * 60);
    
    // 7. 상세 데이터 파일 저장
    saveSummaryReport({
      india: { data: indiaData, count: indiaCount },
      mumbai: { data: mumbaiData, count: mumbaiCount },
      chennai: { data: chennaiData, count: chennaiCount },
      otherCities: cityResults
    });
    
  } catch (error) {
    console.error('❌ 스크립트 실행 중 오류:', error);
  }
}

// 기업 데이터 분석 함수
function analyzeCompanyData(data, regionName) {
  console.log(`\n📈 ${regionName} 기업 분석:`);
  
  // 1. 산업 분류별 기업 수
  const industryMap = {};
  const companyNames = [];
  
  data.forEach(company => {
    // 산업 분류 추출 (가능한 컬럼들)
    const industry = company.industry || company.sector || company.business_type || company.category || '기타';
    industryMap[industry] = (industryMap[industry] || 0) + 1;
    
    // 기업명 수집
    if (company.company_name) {
      companyNames.push(company.company_name);
    }
  });
  
  console.log(`  📊 총 기업 수: ${data.length}개`);
  console.log(`  🏢 고유 기업명 수: ${new Set(companyNames).size}개`);
  
  // 산업 분류별 통계
  console.log(`  🏭 산업 분류별 기업 수:`);
  Object.entries(industryMap)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([industry, count]) => {
      console.log(`    - ${industry}: ${count}개`);
    });
  
  // 2. 도시별 분포 (인도 전체 데이터인 경우)
  if (regionName === '인도 전체') {
    const cityMap = {};
    data.forEach(company => {
      const city = company.city || '기타';
      cityMap[city] = (cityMap[city] || 0) + 1;
    });
    
    console.log(`  🏙️ 도시별 기업 수 (상위 10개):`);
    Object.entries(cityMap)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([city, count]) => {
        console.log(`    - ${city}: ${count}개`);
      });
  }
}

// 상세 데이터 저장 함수
function saveDetailedData(data, filename) {
  const outputDir = path.join('data', 'kotra_analysis');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const filepath = path.join(outputDir, `${filename}.json`);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`  💾 상세 데이터 저장: ${filepath}`);
}

// 종합 보고서 저장 함수
function saveSummaryReport(summary) {
  const outputDir = path.join('data', 'kotra_analysis');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      india: summary.india.count || 0,
      mumbai: summary.mumbai.count || 0,
      chennai: summary.chennai.count || 0,
      otherCities: Object.fromEntries(
        Object.entries(summary.otherCities).map(([key, city]) => [key, city.count])
      )
    },
    totalCompanies: (summary.india.count || 0) + (summary.mumbai.count || 0) + (summary.chennai.count || 0)
  };
  
  const filepath = path.join(outputDir, 'kotra_india_summary.json');
  fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
  console.log(`  📄 종합 보고서 저장: ${filepath}`);
}

// 스크립트 실행
analyzeKotraCities().then(() => {
  console.log('\n✅ 스크립트 실행 완료');
  console.log('📁 분석 결과는 data/kotra_analysis/ 폴더에 저장되었습니다.');
  process.exit(0);
}).catch((error) => {
  console.error('❌ 스크립트 실행 실패:', error);
  process.exit(1);
}); 