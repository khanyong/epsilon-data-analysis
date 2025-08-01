import { supabase } from './supabaseService';

export interface CogsData {
  id: string;
  region: 'mumbai' | 'chennai';
  year: number;
  cogs_value: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CogsByRegion {
  mumbai: number[];
  chennai: number[];
}

// COGS 데이터 조회
export async function fetchCogsData(): Promise<CogsData[]> {
  try {
    const { data, error } = await supabase
      .from('cogs')
      .select('*')
      .order('region')
      .order('year');

    if (error) {
      console.error('COGS 데이터 조회 오류:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('COGS 데이터 조회 실패:', error);
    throw error;
  }
}

// 지역별 COGS 데이터 조회 (배열 형태로 반환)
export async function fetchCogsByRegion(): Promise<CogsByRegion> {
  try {
    const { data, error } = await supabase
      .from('cogs')
      .select('region, year, cogs_value')
      .order('region')
      .order('year');

    if (error) {
      console.error('지역별 COGS 데이터 조회 오류:', error);
      throw error;
    }

    // 기본값 설정
    const defaultCogs: CogsByRegion = {
      mumbai: [20820, 43440, 67740, 93840, 122040],
      chennai: [55520, 111040, 166560, 222080, 277600]
    };

    if (!data || data.length === 0) {
      console.warn('COGS 데이터가 없습니다. 기본값을 사용합니다.');
      return defaultCogs;
    }

    // 데이터를 지역별로 정리
    const cogsByRegion: CogsByRegion = {
      mumbai: [],
      chennai: []
    };

    data.forEach(item => {
      const yearIndex = item.year - 2025; // 2025년을 0번 인덱스로
      if (yearIndex >= 0 && yearIndex < 5) {
        if (item.region === 'mumbai') {
          cogsByRegion.mumbai[yearIndex] = item.cogs_value;
        } else if (item.region === 'chennai') {
          cogsByRegion.chennai[yearIndex] = item.cogs_value;
        }
      }
    });

    // 빈 값이 있으면 기본값으로 채우기
    for (let i = 0; i < 5; i++) {
      if (!cogsByRegion.mumbai[i]) {
        cogsByRegion.mumbai[i] = defaultCogs.mumbai[i];
      }
      if (!cogsByRegion.chennai[i]) {
        cogsByRegion.chennai[i] = defaultCogs.chennai[i];
      }
    }

    return cogsByRegion;
  } catch (error) {
    console.error('지역별 COGS 데이터 조회 실패:', error);
    // 오류 시 기본값 반환
    return {
      mumbai: [20820, 43440, 67740, 93840, 122040],
      chennai: [55520, 111040, 166560, 222080, 277600]
    };
  }
}

// COGS 데이터 업데이트
export async function updateCogsData(region: 'mumbai' | 'chennai', year: number, cogsValue: number, description?: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('cogs')
      .upsert({
        region,
        year,
        cogs_value: cogsValue,
        description: description || `${region} ${year}년 COGS`,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('COGS 데이터 업데이트 오류:', error);
      throw error;
    }

    console.log(`${region} ${year}년 COGS 업데이트 완료: ${cogsValue}`);
  } catch (error) {
    console.error('COGS 데이터 업데이트 실패:', error);
    throw error;
  }
}

// 지역별 COGS 데이터 일괄 업데이트
export async function updateCogsByRegion(region: 'mumbai' | 'chennai', cogsValues: number[]): Promise<void> {
  try {
    const updates = cogsValues.map((value, index) => ({
      region,
      year: 2025 + index,
      cogs_value: value,
      description: `${region} ${2025 + index}년 COGS`,
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from('cogs')
      .upsert(updates);

    if (error) {
      console.error('지역별 COGS 데이터 일괄 업데이트 오류:', error);
      throw error;
    }

    console.log(`${region} 지역 COGS 데이터 일괄 업데이트 완료`);
  } catch (error) {
    console.error('지역별 COGS 데이터 일괄 업데이트 실패:', error);
    throw error;
  }
}

// COGS 데이터 초기화 (기본값으로 리셋)
export async function resetCogsToDefault(): Promise<void> {
  try {
    const defaultData = [
      // Mumbai COGS 데이터
      { region: 'mumbai', year: 2025, cogs_value: 20820, description: 'Mumbai 2025년 COGS' },
      { region: 'mumbai', year: 2026, cogs_value: 43440, description: 'Mumbai 2026년 COGS' },
      { region: 'mumbai', year: 2027, cogs_value: 67740, description: 'Mumbai 2027년 COGS' },
      { region: 'mumbai', year: 2028, cogs_value: 93840, description: 'Mumbai 2028년 COGS' },
      { region: 'mumbai', year: 2029, cogs_value: 122040, description: 'Mumbai 2029년 COGS' },
      
      // Chennai COGS 데이터
      { region: 'chennai', year: 2025, cogs_value: 55520, description: 'Chennai 2025년 COGS' },
      { region: 'chennai', year: 2026, cogs_value: 111040, description: 'Chennai 2026년 COGS' },
      { region: 'chennai', year: 2027, cogs_value: 166560, description: 'Chennai 2027년 COGS' },
      { region: 'chennai', year: 2028, cogs_value: 222080, description: 'Chennai 2028년 COGS' },
      { region: 'chennai', year: 2029, cogs_value: 277600, description: 'Chennai 2029년 COGS' }
    ];

    const { error } = await supabase
      .from('cogs')
      .upsert(defaultData.map(item => ({
        ...item,
        updated_at: new Date().toISOString()
      })));

    if (error) {
      console.error('COGS 데이터 초기화 오류:', error);
      throw error;
    }

    console.log('COGS 데이터를 기본값으로 초기화 완료');
  } catch (error) {
    console.error('COGS 데이터 초기화 실패:', error);
    throw error;
  }
} 