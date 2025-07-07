import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseKey);

// 개선: pageSize를 5000으로 줄이고, 컬럼 선택 기능 추가
/**
 * 테이블 데이터 전체 fetch (분할 요청 + 합치기)
 * @param table 테이블명 (예: 'rfq', 'sof', 'kotra')
 * @param columns 불러올 컬럼 배열 (예: ['Quote No', 'Country A'])
 * @returns 전체 row 배열
 * @throws 에러 발생 시 사용자 친화적 메시지 포함
 * @example
 *   fetchTable('rfq', ['Quote No', 'Country A'])
 *   fetchTable('sof') // 모든 컬럼
 */
export async function fetchTable(table: string, columns: string[] = ['*']) {
  console.log(`🚀 fetchTable 시작 - 테이블: ${table}, 컬럼: ${columns.join(', ')}`);
  
  let allData: any[] = [];
  let from = 0;
  const pageSize = 5000; // timeout 방지 위해 5000으로 축소
  let pageCount = 0;
  
  while (true) {
    pageCount++;
    console.log(`📄 페이지 ${pageCount} 요청 중... (${from} ~ ${from + pageSize - 1})`);
    
    const { data, error, count } = await supabase
      .from(table)
      .select(columns.join(','), { count: 'exact' })
      .range(from, from + pageSize - 1);
      
    if (error) {
      console.error(`❌ Supabase 에러 (페이지 ${pageCount}):`, {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        table: table
      });
      
      // 테이블이 존재하지 않는 경우 특별 처리
      if (error.code === 'PGRST116' || error.message.includes('relation') || error.message.includes('does not exist')) {
        throw new Error(`테이블 '${table}'을(를) 찾을 수 없습니다. 테이블 이름을 확인해주세요.`);
      }
      
      // statement timeout 등 사용자 안내 메시지 포함
      throw new Error(
        error.message?.includes('timeout')
          ? '서버 처리 시간이 초과되었습니다. 컬럼 수를 줄이거나, 데이터 양을 줄여 다시 시도해 주세요.'
          : error.message || '데이터를 불러오는 중 오류가 발생했습니다.'
      );
    }
    
    console.log(`✅ 페이지 ${pageCount} 성공:`, {
      받은_행수: data?.length || 0,
      전체_예상행수: count,
      현재_누적행수: allData.length + (data?.length || 0)
    });
    
    if (!data || data.length === 0) break;
    allData = allData.concat(data);
    if (data.length < pageSize) break; // 마지막 페이지
    from += pageSize;
  }
  
  console.log(`🎉 fetchTable 완료 - 총 ${allData.length}개 행 로딩됨`);
  return allData;
}

/**
 * 데이터를 CSV 형식으로 변환
 * @param data 변환할 데이터 배열
 * @param filename 파일명 (기본값: 'data.csv')
 */
export function convertToCSV(data: any[], filename: string = 'data.csv'): void {
  if (!data || data.length === 0) {
    alert('다운로드할 데이터가 없습니다.');
    return;
  }

  // 헤더 추출
  const headers = Object.keys(data[0]);
  
  // CSV 내용 생성
  const csvContent = [
    // 헤더 행
    headers.map(header => `"${header}"`).join(','),
    // 데이터 행들
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // null, undefined 처리 및 문자열 이스케이프
        if (value === null || value === undefined) {
          return '""';
        }
        // 쉼표, 따옴표, 줄바꿈이 포함된 경우 따옴표로 감싸고 이스케이프
        const stringValue = String(value).replace(/"/g, '""');
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue}"`;
        }
        return `"${stringValue}"`;
      }).join(',')
    )
  ].join('\n');

  // BOM 추가 (한글 깨짐 방지)
  const BOM = '\uFEFF';
  const csvWithBOM = BOM + csvContent;

  // 파일 다운로드
  const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * 테이블 전체 데이터를 CSV로 다운로드
 * @param table 테이블명
 * @param columns 다운로드할 컬럼 (선택사항)
 * @param customFilename 사용자 정의 파일명 (선택사항)
 */
export async function downloadTableAsCSV(
  table: string, 
  columns: string[] = ['*'], 
  customFilename?: string
): Promise<void> {
  try {
    console.log(`${table} 테이블 데이터를 CSV로 다운로드 중...`);
    
    const data = await fetchTable(table, columns);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = customFilename || `${table}_export_${timestamp}.csv`;
    
    convertToCSV(data, filename);
    
    console.log(`CSV 다운로드 완료: ${filename} (${data.length}개 행)`);
  } catch (error) {
    console.error('CSV 다운로드 실패:', error);
    alert(`CSV 다운로드 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

/**
 * Supabase에서 사용 가능한 테이블 목록을 확인하는 함수
 */
export async function listTables() {
  try {
    // information_schema.tables에서 public 스키마의 테이블 목록 조회
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_type', 'BASE TABLE');
    
    if (error) {
      console.error('테이블 목록 조회 실패:', error);
      // 대안: 직접 테이블들을 테스트해보기
      return await testCommonTableNames();
    }
    
    const tableNames = data.map(row => row.table_name);
    console.log('📋 사용 가능한 테이블 목록:', tableNames);
    return tableNames;
  } catch (error) {
    console.error('테이블 목록 조회 중 오류:', error);
    return await testCommonTableNames();
  }
}

/**
 * 일반적인 테이블 이름들을 테스트하여 존재하는 테이블 찾기
 */
async function testCommonTableNames() {
  const commonNames = ['sof', 'SOF', 'rfq', 'RFQ', 'kotra', 'KOTRA'];
  const existingTables = [];
  
  for (const tableName of commonNames) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);
      
      if (!error) {
        existingTables.push(tableName);
        console.log(`✅ 테이블 '${tableName}' 존재함`);
      } else {
        console.log(`❌ 테이블 '${tableName}' 존재하지 않음`);
      }
    } catch (e) {
      console.log(`❌ 테이블 '${tableName}' 테스트 실패`);
    }
  }
  
  console.log('🔍 존재하는 테이블들:', existingTables);
  return existingTables;
}

/**
 * SOF 테이블 전용 최적화된 fetch 함수
 * 더 작은 페이지 크기와 재시도 로직 사용
 */
export async function fetchSOFTable(tableName: string = 'sof_middlemile', columns: string[] = ['*']) {
  console.log(`🚀 SOF 전용 fetchTable 시작 - 테이블: ${tableName}, 컬럼: ${columns.join(', ')}`);
  
  let allData: any[] = [];
  let from = 0;
  const pageSize = 1000; // SOF는 더 작은 페이지 크기 사용
  let pageCount = 0;
  const maxRetries = 3;
  
  while (true) {
    pageCount++;
    console.log(`📄 SOF 페이지 ${pageCount} 요청 중... (${from} ~ ${from + pageSize - 1})`);
    
    let success = false;
    let retryCount = 0;
    let pageData = null;
    
    // 재시도 로직
    while (!success && retryCount < maxRetries) {
      try {
        const { data, error, count } = await supabase
          .from(tableName)
          .select(columns.join(','), { count: 'exact' })
          .range(from, from + pageSize - 1);
          
        if (error) {
          throw error;
        }
        
        pageData = data;
        success = true;
        
        console.log(`✅ SOF 페이지 ${pageCount} 성공 (시도 ${retryCount + 1}/${maxRetries}):`, {
          받은_행수: data?.length || 0,
          전체_예상행수: count,
          현재_누적행수: allData.length + (data?.length || 0)
        });
        
      } catch (error: any) {
        retryCount++;
        console.warn(`⚠️ SOF 페이지 ${pageCount} 실패 (시도 ${retryCount}/${maxRetries}):`, {
          code: error.code,
          message: error.message,
          from,
          to: from + pageSize - 1
        });
        
        if (retryCount >= maxRetries) {
          // 마지막 시도에서도 실패하면 더 작은 페이지로 재시도
          if (pageSize > 100) {
            console.log(`🔄 더 작은 페이지 크기로 재시도... (${pageSize} → ${Math.floor(pageSize / 2)})`);
            return await fetchSOFTableWithSmallPages(tableName, columns, from);
          }
          throw error;
        }
        
        // 재시도 전 잠시 대기
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
    }
    
    if (!pageData || pageData.length === 0) break;
    allData = allData.concat(pageData);
    if (pageData.length < pageSize) break; // 마지막 페이지
    from += pageSize;
  }
  
  console.log(`🎉 SOF fetchTable 완료 - 총 ${allData.length}개 행 로딩됨`);
  return allData;
}

/**
 * SOF 테이블을 더 작은 페이지로 로딩하는 백업 함수
 */
async function fetchSOFTableWithSmallPages(tableName: string, columns: string[] = ['*'], startFrom: number = 0) {
  console.log(`🔄 SOF 소형 페이지 모드 시작 (테이블: ${tableName}, from: ${startFrom})`);
  
  let allData: any[] = [];
  let from = startFrom;
  const smallPageSize = 100; // 매우 작은 페이지 크기
  let pageCount = 0;
  
  while (true) {
    pageCount++;
    console.log(`📄 SOF 소형 페이지 ${pageCount} 요청 중... (${from} ~ ${from + smallPageSize - 1})`);
    
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select(columns.join(','))
        .range(from, from + smallPageSize - 1);
        
      if (error) {
        console.error(`❌ SOF 소형 페이지 ${pageCount} 실패:`, error);
        // 소형 페이지에서도 실패하면 해당 범위를 스킵
        from += smallPageSize;
        continue;
      }
      
      console.log(`✅ SOF 소형 페이지 ${pageCount} 성공: ${data?.length || 0}개 행`);
      
      if (!data || data.length === 0) break;
      allData = allData.concat(data);
      if (data.length < smallPageSize) break;
      from += smallPageSize;
      
    } catch (error) {
      console.error(`❌ SOF 소형 페이지 ${pageCount} 예외:`, error);
      from += smallPageSize; // 문제 구간 스킵
    }
  }
  
  console.log(`🎉 SOF 소형 페이지 모드 완료 - 총 ${allData.length}개 행 로딩됨`);
  return allData;
}

/**
 * SOF 테이블에서 City A, City B 정보만 빠르게 로딩
 */
export async function fetchSOFCityData() {
  console.log(`🌍 SOF City A/B 데이터 로딩 시작...`);
  
  try {
    // City A, City B, Country A, Country B 컬럼만 선택
    const columns = ['City A', 'City B', 'Country A', 'Country B', 'SOF Id'];
    
    const { data, error, count } = await supabase
      .from('sof')
      .select(columns.join(','), { count: 'exact' })
      .limit(5000); // 처음 5000개만 테스트
      
    if (error) {
      console.error('❌ SOF City 데이터 로딩 실패:', error);
      throw new Error(`SOF City 데이터 로딩 실패: ${error.message}`);
    }
    
    console.log(`✅ SOF City 데이터 로딩 성공!`);
    console.log(`📊 총 예상 행수: ${count}, 로딩된 행수: ${data?.length || 0}`);
    
    if (data && data.length > 0) {
      console.log('🔑 컬럼들:', Object.keys(data[0]));
      console.log('💾 첫 번째 행 샘플:', data[0]);
      
      // City A, City B 고유값 분석
      const cityA = data.map(row => row['City A']).filter(val => val != null && val !== '');
      const cityB = data.map(row => row['City B']).filter(val => val != null && val !== '');
      const uniqueCityA = Array.from(new Set(cityA));
      const uniqueCityB = Array.from(new Set(cityB));
      
      console.log('📍 City A 통계:', {
        전체수: cityA.length,
        고유수: uniqueCityA.length,
        상위5개: uniqueCityA.slice(0, 5)
      });
      
      console.log('📍 City B 통계:', {
        전체수: cityB.length,
        고유수: uniqueCityB.length,
        상위5개: uniqueCityB.slice(0, 5)
      });
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ SOF City 데이터 로딩 중 오류:', error);
    throw error;
  }
}

// 개발 환경에서 디버깅을 위한 함수들
if (typeof window !== 'undefined') {
  // 전역으로 함수 노출
  (window as any).testSOFCityData = fetchSOFCityData;
  (window as any).testSOFTable = fetchSOFTable;
  (window as any).checkRLSPolicy = checkRLSPolicy;
  (window as any).testTableAccess = testTableAccess;
  
  console.log('🔧 개발 테스트 함수 노출됨: window.testSOFCityData(), window.testSOFTable(), window.checkRLSPolicy("tableName"), window.testTableAccess("tableName")');
}

// RLS 정책 확인 함수
export async function checkRLSPolicy(tableName: string) {
  console.log(`🔒 ${tableName} 테이블의 RLS 정책 확인 중...`);
  
  try {
    // 1. 테이블 존재 여부 확인
    const { data: tableExists, error: tableError } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error(`❌ 테이블 접근 실패:`, tableError);
      return {
        tableExists: false,
        rlsEnabled: null,
        hasData: false,
        error: tableError.message
      };
    }
    
    // 2. 실제 데이터 개수 확인 (count 쿼리)
    const { count, error: countError } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    
    console.log(`📊 ${tableName} 테이블 데이터 개수:`, count);
    
    // 3. RLS 상태 확인을 위해 다른 방법으로 접근 시도
    const { data: sampleData, error: sampleError } = await supabase
      .from(tableName)
      .select('*')
      .limit(5);
    
    console.log(`🔍 ${tableName} 샘플 데이터:`, sampleData);
    
    const result = {
      tableExists: true,
      totalCount: count || 0,
      sampleDataLength: sampleData?.length || 0,
      hasRLSIssue: (count || 0) > 0 && (sampleData?.length || 0) === 0,
      sampleData: sampleData?.slice(0, 2) || []
    };
    
    console.log(`📋 ${tableName} RLS 분석 결과:`, result);
    
    if (result.hasRLSIssue) {
      console.warn(`⚠️ RLS 정책 이슈 감지: 테이블에는 ${result.totalCount}건의 데이터가 있지만 ${result.sampleDataLength}건만 조회됨`);
    }
    
    return result;
    
  } catch (error) {
    console.error(`❌ RLS 정책 확인 실패:`, error);
    return {
      tableExists: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    };
  }
}

// 테이블 접근 권한 테스트 함수
export async function testTableAccess(tableName: string) {
  console.log(`🧪 ${tableName} 테이블 접근 권한 테스트 시작...`);
  
  const tests = [
    {
      name: 'SELECT 권한 테스트',
      test: async () => {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        return { success: !error, data: data?.length || 0, error: error?.message };
      }
    },
    {
      name: 'COUNT 권한 테스트', 
      test: async () => {
        const { count, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });
        return { success: !error, data: count || 0, error: error?.message };
      }
    },
    {
      name: '컬럼 메타데이터 조회',
      test: async () => {
        const { data, error } = await supabase
          .from(tableName)
          .select()
          .limit(0);
        return { success: !error, data: 'metadata', error: error?.message };
      }
    }
  ];
  
  const results: any[] = [];
  
  for (const test of tests) {
    try {
      const result = await test.test();
      results.push({
        testName: test.name,
        ...result
      });
      console.log(`${result.success ? '✅' : '❌'} ${test.name}: ${result.success ? `성공 (${result.data})` : `실패 - ${result.error}`}`);
    } catch (error) {
      results.push({
        testName: test.name,
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      });
      console.log(`❌ ${test.name}: 실패 - ${error}`);
    }
  }
  
  return results;
}
