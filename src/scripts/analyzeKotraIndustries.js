// kotra 데이터 산업 분류별 상세 분석
import fs from 'fs';
import path from 'path';

function analyzeKotraIndustries() {
  console.log('🔍 kotra 데이터 산업 분류별 상세 분석...');
  
  try {
    // 데이터 파일들 로드
    const mumbaiData = JSON.parse(fs.readFileSync('data/kotra_analysis/mumbai_companies.json', 'utf8'));
    const chennaiData = JSON.parse(fs.readFileSync('data/kotra_analysis/chennai_companies.json', 'utf8'));
    
    console.log(`📊 데이터 로드 완료:`);
    console.log(`  - 뭄바이: ${mumbaiData.length}개 기업`);
    console.log(`  - 첸나이: ${chennaiData.length}개 기업`);
    
    // 1. 산업 분류별 분석
    console.log('\n🏭 산업 분류별 분석:');
    
    const mumbaiIndustries = analyzeIndustries(mumbaiData, '뭄바이');
    const chennaiIndustries = analyzeIndustries(chennaiData, '첸나이');
    
    // 2. 진출 유형별 분석
    console.log('\n🏢 진출 유형별 분석:');
    
    const mumbaiEntryTypes = analyzeEntryTypes(mumbaiData, '뭄바이');
    const chennaiEntryTypes = analyzeEntryTypes(chennaiData, '첸나이');
    
    // 3. 투자 유형별 분석
    console.log('\n💰 투자 유형별 분석:');
    
    const mumbaiInvestmentTypes = analyzeInvestmentTypes(mumbaiData, '뭄바이');
    const chennaiInvestmentTypes = analyzeInvestmentTypes(chennaiData, '첸나이');
    
    // 4. 주요 기업 리스트 생성
    console.log('\n🏢 주요 기업 리스트:');
    
    generateCompanyList(mumbaiData, '뭄바이');
    generateCompanyList(chennaiData, '첸나이');
    
    // 5. 상세 보고서 생성
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        mumbai: {
          total: mumbaiData.length,
          industries: mumbaiIndustries,
          entryTypes: mumbaiEntryTypes,
          investmentTypes: mumbaiInvestmentTypes
        },
        chennai: {
          total: chennaiData.length,
          industries: chennaiIndustries,
          entryTypes: chennaiEntryTypes,
          investmentTypes: chennaiInvestmentTypes
        }
      },
      topCompanies: {
        mumbai: getTopCompanies(mumbaiData, 10),
        chennai: getTopCompanies(chennaiData, 10)
      }
    };
    
    // 보고서 저장
    const outputDir = 'data/kotra_analysis';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(outputDir, 'kotra_industry_analysis.json'),
      JSON.stringify(report, null, 2)
    );
    
    console.log('\n✅ 분석 완료!');
    console.log('📁 상세 보고서: data/kotra_analysis/kotra_industry_analysis.json');
    
  } catch (error) {
    console.error('❌ 분석 중 오류:', error);
  }
}

// 산업 분류별 분석
function analyzeIndustries(data, cityName) {
  const industryMap = {};
  const majorIndustryMap = {};
  
  data.forEach(company => {
    // 대분류 산업
    const majorIndustry = company.industry_major || '미분류';
    majorIndustryMap[majorIndustry] = (majorIndustryMap[majorIndustry] || 0) + 1;
    
    // 소분류 산업
    const minorIndustry = company.industry_minor || '미분류';
    industryMap[minorIndustry] = (industryMap[minorIndustry] || 0) + 1;
  });
  
  console.log(`\n📈 ${cityName} 산업 분류별 기업 수:`);
  console.log('  🏭 대분류 산업:');
  Object.entries(majorIndustryMap)
    .sort(([,a], [,b]) => b - a)
    .forEach(([industry, count]) => {
      console.log(`    - ${industry}: ${count}개`);
    });
  
  console.log('  🏭 소분류 산업 (상위 10개):');
  Object.entries(industryMap)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([industry, count]) => {
      console.log(`    - ${industry}: ${count}개`);
    });
  
  return {
    major: majorIndustryMap,
    minor: industryMap
  };
}

// 진출 유형별 분석
function analyzeEntryTypes(data, cityName) {
  const entryTypeMap = {};
  
  data.forEach(company => {
    const entryType = company.entry_type || '미분류';
    entryTypeMap[entryType] = (entryTypeMap[entryType] || 0) + 1;
  });
  
  console.log(`\n🏢 ${cityName} 진출 유형별 기업 수:`);
  Object.entries(entryTypeMap)
    .sort(([,a], [,b]) => b - a)
    .forEach(([entryType, count]) => {
      console.log(`  - ${entryType}: ${count}개`);
    });
  
  return entryTypeMap;
}

// 투자 유형별 분석
function analyzeInvestmentTypes(data, cityName) {
  const investmentTypeMap = {};
  
  data.forEach(company => {
    const investmentType = company.investment_type || '미분류';
    investmentTypeMap[investmentType] = (investmentTypeMap[investmentType] || 0) + 1;
  });
  
  console.log(`\n💰 ${cityName} 투자 유형별 기업 수:`);
  Object.entries(investmentTypeMap)
    .sort(([,a], [,b]) => b - a)
    .forEach(([investmentType, count]) => {
      console.log(`  - ${investmentType}: ${count}개`);
    });
  
  return investmentTypeMap;
}

// 주요 기업 리스트 생성
function generateCompanyList(data, cityName) {
  console.log(`\n🏢 ${cityName} 주요 기업 리스트 (상위 15개):`);
  
  // 산업별로 그룹화하여 주요 기업 선별
  const industryGroups = {};
  
  data.forEach(company => {
    const majorIndustry = company.industry_major || '미분류';
    if (!industryGroups[majorIndustry]) {
      industryGroups[majorIndustry] = [];
    }
    industryGroups[majorIndustry].push(company);
  });
  
  // 각 산업별로 대표 기업 선별
  Object.entries(industryGroups)
    .sort(([,a], [,b]) => b.length - a.length)
    .slice(0, 5)
    .forEach(([industry, companies]) => {
      console.log(`\n  🏭 ${industry} (${companies.length}개):`);
      companies.slice(0, 3).forEach((company, index) => {
        console.log(`    ${index + 1}. ${company.company_name_kr || company.company_name_en} (${company.entry_type})`);
      });
    });
}

// 상위 기업 선별
function getTopCompanies(data, limit = 10) {
  // 산업별 중요도와 기업 규모를 고려하여 선별
  const scoredCompanies = data.map(company => {
    let score = 0;
    
    // 진출 유형별 점수
    const entryTypeScores = {
      '생산법인': 5,
      '판매법인': 4,
      '서비스법인': 3,
      '기타(트레이딩)': 2
    };
    score += entryTypeScores[company.entry_type] || 1;
    
    // 산업별 점수 (제조업 우선)
    if (company.industry_major && company.industry_major.includes('제조업')) {
      score += 3;
    }
    
    // 홈페이지 보유 시 추가 점수
    if (company.homepage) {
      score += 1;
    }
    
    return { ...company, score };
  });
  
  return scoredCompanies
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(company => ({
      name_kr: company.company_name_kr,
      name_en: company.company_name_en,
      industry: company.industry_major,
      entry_type: company.entry_type,
      score: company.score
    }));
}

// 스크립트 실행
analyzeKotraIndustries(); 