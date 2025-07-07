import 'dotenv/config';
import { supabase } from '../services/supabaseService.js';

// 언어 감지 함수
function detectLanguage(text) {
  if (!text || text.trim() === '') return 'empty';
  
  const languages = [];
  
  // 아랍어 감지 (U+0600-U+06FF)
  if (/[\u0600-\u06FF]/.test(text)) {
    languages.push('Arabic');
  }
  
  // 한국어 감지 (한글: U+AC00-U+D7AF, 한글 자모: U+3130-U+318F)
  if (/[\uAC00-\uD7AF\u3130-\u318F]/.test(text)) {
    languages.push('Korean');
  }
  
  // 중국어/일본어 한자 감지 (CJK 통합 한자: U+4E00-U+9FFF)
  if (/[\u4E00-\u9FFF]/.test(text)) {
    // 일본어 히라가나/가타카나가 있으면 일본어
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) {
      languages.push('Japanese');
    } else {
      languages.push('Chinese');
    }
  }
  
  // 일본어 히라가나/가타카나만 있는 경우
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text) && !/[\u4E00-\u9FFF]/.test(text)) {
    languages.push('Japanese');
  }
  
  // 태국어 감지 (U+0E00-U+0E7F)
  if (/[\u0E00-\u0E7F]/.test(text)) {
    languages.push('Thai');
  }
  
  // 러시아어 감지 (키릴 문자: U+0400-U+04FF)
  if (/[\u0400-\u04FF]/.test(text)) {
    languages.push('Russian');
  }
  
  // 베트남어 감지 (성조 기호가 있는 라틴 문자)
  if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/.test(text.toLowerCase())) {
    languages.push('Vietnamese');
  }
  
  // 터키어 감지 (터키어 특수 문자)
  if (/[İıŞşĞğÜüÖöÇç]/.test(text)) {
    languages.push('Turkish');
  }
  
  // 그리스어 감지 (U+0370-U+03FF)
  if (/[\u0370-\u03FF]/.test(text)) {
    languages.push('Greek');
  }
  
  // 히브리어 감지 (U+0590-U+05FF)
  if (/[\u0590-\u05FF]/.test(text)) {
    languages.push('Hebrew');
  }
  
  // 힌디어/데바나가리 감지 (U+0900-U+097F)
  if (/[\u0900-\u097F]/.test(text)) {
    languages.push('Hindi');
  }
  
  // 기본 라틴 문자만 있으면 영어로 간주
  if (languages.length === 0 && /^[a-zA-Z\s\-'.(),0-9]+$/.test(text)) {
    languages.push('English');
  }
  
  // 혼합 언어인 경우
  if (languages.length === 0) {
    languages.push('Mixed/Unknown');
  }
  
  return languages;
}

// 메인 분석 함수
async function analyzeCityLanguages() {
  try {
    console.log('🌍 도시명 언어 분석 시작...');
    console.log('='.repeat(50));
    
    // 데이터베이스에서 모든 도시명 가져오기
    const { data: rfqData, error } = await supabase
      .from('rfq')
      .select('uuid, city_a, city_b, "Location A", "Location B"')
      .limit(1000); // 처음 1000개만 분석

    if (error) {
      console.error('데이터 조회 오류:', error);
      return;
    }

    console.log(`📊 총 ${rfqData.length}개 레코드 분석 중...\n`);

    const languageStats = new Map();
    const languageExamples = new Map();
    
    // 각 레코드 분석
    rfqData.forEach((row, index) => {
      const cities = [
        { name: row.city_a, type: 'city_a' },
        { name: row.city_b, type: 'city_b' },
        { name: row["Location A"], type: 'Location A' },
        { name: row["Location B"], type: 'Location B' }
      ];
      
      cities.forEach(city => {
        if (city.name && city.name.trim() !== '') {
          const languages = detectLanguage(city.name);
          
          languages.forEach(lang => {
            // 통계 업데이트
            const count = languageStats.get(lang) || 0;
            languageStats.set(lang, count + 1);
            
            // 예제 저장 (각 언어당 최대 10개)
            if (!languageExamples.has(lang)) {
              languageExamples.set(lang, []);
            }
            const examples = languageExamples.get(lang);
            if (examples.length < 10 && !examples.includes(city.name)) {
              examples.push(city.name);
            }
          });
        }
      });
    });

    // 결과 출력
    console.log('📈 언어별 통계:');
    console.log('-'.repeat(30));
    
    const sortedLanguages = Array.from(languageStats.entries())
      .sort((a, b) => b[1] - a[1]);
    
    sortedLanguages.forEach(([language, count]) => {
      console.log(`${language}: ${count}개`);
    });
    
    console.log('\n🔍 언어별 예제:');
    console.log('='.repeat(50));
    
    sortedLanguages.forEach(([language, count]) => {
      if (language !== 'English') { // 영어 외 언어만 상세히 보여주기
        console.log(`\n🌐 ${language} (${count}개):`);
        const examples = languageExamples.get(language) || [];
        examples.forEach((example, index) => {
          console.log(`  ${index + 1}. "${example}"`);
        });
      }
    });
    
    // 영어가 아닌 언어들의 총계
    const nonEnglishCount = Array.from(languageStats.entries())
      .filter(([lang, count]) => lang !== 'English')
      .reduce((total, [lang, count]) => total + count, 0);
    
    console.log('\n📊 요약:');
    console.log('-'.repeat(30));
    console.log(`총 언어 종류: ${languageStats.size}개`);
    console.log(`영어 외 언어 사용: ${nonEnglishCount}개`);
    console.log(`영어 사용: ${languageStats.get('English') || 0}개`);
    
  } catch (error) {
    console.error('❌ 분석 오류:', error);
  }
}

// 특정 언어의 도시명만 조회
async function getCitiesByLanguage(targetLanguage) {
  try {
    console.log(`🔍 ${targetLanguage} 도시명 검색 중...`);
    
    const { data: rfqData, error } = await supabase
      .from('rfq')
      .select('uuid, city_a, city_b, "Location A", "Location B"');

    if (error) {
      console.error('데이터 조회 오류:', error);
      return;
    }

    const targetCities = new Set();
    
    rfqData.forEach(row => {
      const cities = [row.city_a, row.city_b, row["Location A"], row["Location B"]];
      
      cities.forEach(city => {
        if (city && city.trim() !== '') {
          const languages = detectLanguage(city);
          if (languages.includes(targetLanguage)) {
            targetCities.add(city);
          }
        }
      });
    });

    console.log(`\n📋 ${targetLanguage} 도시명 목록 (${targetCities.size}개):`);
    Array.from(targetCities).sort().forEach((city, index) => {
      console.log(`${index + 1}. "${city}"`);
    });
    
  } catch (error) {
    console.error('❌ 검색 오류:', error);
  }
}

// 명령줄 인수 처리
const mode = process.argv[2] || 'analyze';
const targetLang = process.argv[3];

async function main() {
  if (mode === 'language' && targetLang) {
    await getCitiesByLanguage(targetLang);
  } else {
    await analyzeCityLanguages();
  }
}

main().catch(error => {
  console.error('❌ 실행 오류:', error);
  process.exit(1);
}); 