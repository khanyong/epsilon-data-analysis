// 타겟 마케팅을 위한 업종별 분류 및 기업 규모 분석
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

// 업종별 매출 규모 가중치 정의
const INDUSTRY_REVENUE_WEIGHTS = {
  // 제조업
  'C. 제조업': { baseRevenue: 50000000, weight: 1.0 },
  '제조업': { baseRevenue: 40000000, weight: 0.9 },
  '자동차 및 트레일러 제조업': { baseRevenue: 80000000, weight: 1.2 },
  '전기장비 제조업': { baseRevenue: 60000000, weight: 1.1 },
  '화학 물질 및 화학제품 제조업': { baseRevenue: 70000000, weight: 1.1 },
  '의료, 정밀, 광학 기기 및 시계 제조업': { baseRevenue: 55000000, weight: 1.0 },
  
  // 서비스업
  'H. 운수 및 창고업': { baseRevenue: 30000000, weight: 0.8 },
  '운수 및 창고업': { baseRevenue: 25000000, weight: 0.7 },
  'G. 도매 및 소매업': { baseRevenue: 35000000, weight: 0.9 },
  '도매 및 소매업': { baseRevenue: 30000000, weight: 0.8 },
  'K. 금융 및 보험업': { baseRevenue: 100000000, weight: 1.5 },
  '금융 및 보험업': { baseRevenue: 80000000, weight: 1.3 },
  'M. 전문, 과학 및 기술 서비스업': { baseRevenue: 45000000, weight: 1.0 },
  '전문, 과학 및 기술 서비스업': { baseRevenue: 40000000, weight: 0.9 },
  
  // 건설업
  'F. 건설업': { baseRevenue: 60000000, weight: 1.1 },
  '건설업': { baseRevenue: 50000000, weight: 1.0 },
  '건설·공사업': { baseRevenue: 55000000, weight: 1.0 },
  
  // 기타
  'I. 숙박 및 음식점업': { baseRevenue: 20000000, weight: 0.6 },
  '숙박 및 음식점업': { baseRevenue: 18000000, weight: 0.5 },
  '부동산업': { baseRevenue: 40000000, weight: 0.9 },
  '부동산·임대업': { baseRevenue: 35000000, weight: 0.8 },
  '정보통신업': { baseRevenue: 50000000, weight: 1.0 },
  '미분류': { baseRevenue: 25000000, weight: 0.7 }
};

// 진출 유형별 규모 가중치
const ENTRY_TYPE_WEIGHTS = {
  '생산법인': 1.5,      // 가장 큰 규모
  '판매법인': 1.2,      // 중간 규모
  '서비스법인': 1.0,    // 표준 규모
  '해외지사': 1.3,      // 중상위 규모
  '연락사무소': 0.6,    // 작은 규모
  '기타(트레이딩)': 0.8, // 중하위 규모
  '기타': 0.7,          // 작은 규모
  '미분류': 0.5          // 최소 규모
};

// 투자 유형별 규모 가중치
const INVESTMENT_TYPE_WEIGHTS = {
  '단독투자': 1.0,      // 표준 규모
  '합작투자': 1.3,      // 큰 규모 (파트너십)
  '단독': 0.9,          // 약간 작은 규모
  '미분류': 0.7         // 작은 규모
};

async function targetMarketingAnalysis() {
  console.log('🎯 타겟 마케팅을 위한 업종별 기업 분석...');
  
  try {
    // 1. 뭄바이 기업 데이터 수집
    console.log('\n🏙️ 뭄바이 기업 데이터 수집...');
    const { data: mumbaiData, error: mumbaiError } = await supabase
      .from('kotra')
      .select('*')
      .or('city.ilike.%mumbai%,city.ilike.%bombay%,office.ilike.%뭄바이%');
    
    if (mumbaiError) {
      console.error('❌ 뭄바이 데이터 조회 오류:', mumbaiError);
      return;
    }
    
    console.log(`✅ 뭄바이 기업 수: ${mumbaiData.length}개`);
    
    // 2. 첸나이 기업 데이터 수집
    console.log('\n🏙️ 첸나이 기업 데이터 수집...');
    const { data: chennaiData, error: chennaiError } = await supabase
      .from('kotra')
      .select('*')
      .or('city.ilike.%chennai%,city.ilike.%madras%,office.ilike.%첸나이%');
    
    if (chennaiError) {
      console.error('❌ 첸나이 데이터 조회 오류:', chennaiError);
      return;
    }
    
    console.log(`✅ 첸나이 기업 수: ${chennaiData.length}개`);
    
    // 3. 업종별 분석 및 예상 매출 계산
    console.log('\n💰 업종별 예상 매출 분석...');
    
    const mumbaiAnalysis = analyzeCompaniesByIndustry(mumbaiData, '뭄바이');
    const chennaiAnalysis = analyzeCompaniesByIndustry(chennaiData, '첸나이');
    
    // 4. 타겟 마케팅 등급 분류
    console.log('\n🎯 타겟 마케팅 등급 분류...');
    
    const mumbaiTargets = classifyTargetCompanies(mumbaiAnalysis.companies, '뭄바이');
    const chennaiTargets = classifyTargetCompanies(chennaiAnalysis.companies, '첸나이');
    
    // 5. 상세 분석 결과 생성
    const analysisReport = {
      timestamp: new Date().toISOString(),
      summary: {
        mumbai: {
          totalCompanies: mumbaiData.length,
          totalEstimatedRevenue: mumbaiAnalysis.totalRevenue,
          averageRevenue: mumbaiAnalysis.averageRevenue,
          industryBreakdown: mumbaiAnalysis.industryBreakdown
        },
        chennai: {
          totalCompanies: chennaiData.length,
          totalEstimatedRevenue: chennaiAnalysis.totalRevenue,
          averageRevenue: chennaiAnalysis.averageRevenue,
          industryBreakdown: chennaiAnalysis.industryBreakdown
        }
      },
      targetMarketing: {
        mumbai: mumbaiTargets,
        chennai: chennaiTargets
      },
      industryAnalysis: {
        mumbai: mumbaiAnalysis,
        chennai: chennaiAnalysis
      }
    };
    
    // 6. 결과 저장
    const outputDir = 'data/target_marketing';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(outputDir, 'target_marketing_analysis.json'),
      JSON.stringify(analysisReport, null, 2)
    );
    
    // 7. 타겟별 CSV 파일 생성
    generateTargetCSV(mumbaiTargets, 'mumbai_targets.csv', outputDir);
    generateTargetCSV(chennaiTargets, 'chennai_targets.csv', outputDir);
    
    console.log('\n✅ 타겟 마케팅 분석 완료!');
    console.log('📁 결과 파일:');
    console.log('  - target_marketing_analysis.json');
    console.log('  - mumbai_targets.csv');
    console.log('  - chennai_targets.csv');
    
  } catch (error) {
    console.error('❌ 분석 중 오류:', error);
  }
}

// 업종별 기업 분석 및 예상 매출 계산
function analyzeCompaniesByIndustry(companies, cityName) {
  const industryBreakdown = {};
  let totalRevenue = 0;
  
  companies.forEach(company => {
    const industry = company.industry_major || '미분류';
    const entryType = company.entry_type || '미분류';
    const investmentType = company.investment_type || '미분류';
    
    // 예상 매출 계산
    const estimatedRevenue = calculateEstimatedRevenue(company);
    totalRevenue += estimatedRevenue;
    
    if (!industryBreakdown[industry]) {
      industryBreakdown[industry] = {
        count: 0,
        totalRevenue: 0,
        companies: [],
        averageRevenue: 0
      };
    }
    
    industryBreakdown[industry].count++;
    industryBreakdown[industry].totalRevenue += estimatedRevenue;
    industryBreakdown[industry].companies.push({
      ...company,
      estimatedRevenue: estimatedRevenue
    });
  });
  
  // 평균 매출 계산
  Object.values(industryBreakdown).forEach(industry => {
    industry.averageRevenue = industry.totalRevenue / industry.count;
  });
  
  const averageRevenue = totalRevenue / companies.length;
  
  console.log(`\n📊 ${cityName} 업종별 분석:`);
  console.log(`  📈 총 예상 매출: ${formatCurrency(totalRevenue)}`);
  console.log(`  📊 평균 예상 매출: ${formatCurrency(averageRevenue)}`);
  
  Object.entries(industryBreakdown)
    .sort(([,a], [,b]) => b.totalRevenue - a.totalRevenue)
    .slice(0, 10)
    .forEach(([industry, data]) => {
      console.log(`  🏭 ${industry}: ${data.count}개, ${formatCurrency(data.totalRevenue)}`);
    });
  
  return {
    companies: companies.map(company => ({
      ...company,
      estimatedRevenue: calculateEstimatedRevenue(company)
    })),
    industryBreakdown,
    totalRevenue,
    averageRevenue
  };
}

// 예상 매출 계산
function calculateEstimatedRevenue(company) {
  const industry = company.industry_major || '미분류';
  const entryType = company.entry_type || '미분류';
  const investmentType = company.investment_type || '미분류';
  
  // 기본 업종별 매출
  const industryData = INDUSTRY_REVENUE_WEIGHTS[industry] || INDUSTRY_REVENUE_WEIGHTS['미분류'];
  let baseRevenue = industryData.baseRevenue;
  
  // 진출 유형별 가중치 적용
  const entryWeight = ENTRY_TYPE_WEIGHTS[entryType] || 1.0;
  baseRevenue *= entryWeight;
  
  // 투자 유형별 가중치 적용
  const investmentWeight = INVESTMENT_TYPE_WEIGHTS[investmentType] || 1.0;
  baseRevenue *= investmentWeight;
  
  // 업종별 가중치 적용
  baseRevenue *= industryData.weight;
  
  return Math.round(baseRevenue);
}

// 타겟 마케팅 등급 분류
function classifyTargetCompanies(companies, cityName) {
  const targets = {
    premium: [],    // 프리미엄 타겟 (예상 매출 1억 이상)
    high: [],       // 고가치 타겟 (예상 매출 5천만원 이상)
    medium: [],     // 중간 타겟 (예상 매출 2천만원 이상)
    standard: []    // 표준 타겟 (기타)
  };
  
  companies.forEach(company => {
    const revenue = company.estimatedRevenue;
    
    if (revenue >= 100000000) {
      targets.premium.push(company);
    } else if (revenue >= 50000000) {
      targets.high.push(company);
    } else if (revenue >= 20000000) {
      targets.medium.push(company);
    } else {
      targets.standard.push(company);
    }
  });
  
  console.log(`\n🎯 ${cityName} 타겟 분류:`);
  console.log(`  💎 프리미엄 타겟: ${targets.premium.length}개`);
  console.log(`  🔥 고가치 타겟: ${targets.high.length}개`);
  console.log(`  ⭐ 중간 타겟: ${targets.medium.length}개`);
  console.log(`  📋 표준 타겟: ${targets.standard.length}개`);
  
  return targets;
}

// CSV 파일 생성
function generateTargetCSV(targets, filename, outputDir) {
  const csvData = [];
  
  // 헤더 추가
  csvData.push([
    '타겟등급',
    '기업명(한국어)',
    '기업명(영어)',
    '업종',
    '진출유형',
    '투자유형',
    '예상매출(원)',
    '도시',
    '주소',
    '전화번호',
    '이메일',
    '홈페이지'
  ]);
  
  // 데이터 추가
  Object.entries(targets).forEach(([grade, companies]) => {
    companies.forEach(company => {
      csvData.push([
        getGradeDisplayName(grade),
        company.company_name_kr || '',
        company.company_name_en || '',
        company.industry_major || '',
        company.entry_type || '',
        company.investment_type || '',
        company.estimatedRevenue || 0,
        company.city || '',
        company.local_address || '',
        company.phone || '',
        company.email || '',
        company.homepage || ''
      ]);
    });
  });
  
  // CSV 문자열 생성
  const csvContent = csvData.map(row => 
    row.map(cell => `"${cell}"`).join(',')
  ).join('\n');
  
  fs.writeFileSync(path.join(outputDir, filename), csvContent);
  console.log(`  💾 ${filename} 생성 완료`);
}

// 등급 표시명 변환
function getGradeDisplayName(grade) {
  const gradeNames = {
    premium: '프리미엄',
    high: '고가치',
    medium: '중간',
    standard: '표준'
  };
  return gradeNames[grade] || grade;
}

// 통화 포맷팅
function formatCurrency(amount) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0
  }).format(amount);
}

// 스크립트 실행
targetMarketingAnalysis().then(() => {
  console.log('\n✅ 타겟 마케팅 분석 완료');
  process.exit(0);
}).catch((error) => {
  console.error('❌ 분석 실패:', error);
  process.exit(1);
}); 