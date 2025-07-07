// 컬럼명 매핑 함수 (공백/대소문자 무시)
export function normalize(str: string) {
  return str.replace(/\s+/g, '').toLowerCase();
}

export function findKeyInsensitive(obj: any, col: string) {
  const normCol = normalize(col);
  return Object.keys(obj).find(k => normalize(k) === normCol);
}

// 고유값 구하는 함수
export function getUniqueValues(data: any[], col: string): string[] {
  return Array.from(new Set(data.map(row => {
    const keyName = findKeyInsensitive(row, col);
    return keyName ? String(row[keyName] ?? '(빈값)') : '(빈값)';
  })));
}

// Quote No 중복 개수 구하는 함수
export function getValueCounts(data: any[], col: string): Array<{ value: string; count: number }> {
  const counts: Record<string, number> = {};
  data.forEach(row => {
    const value = String(row[col] ?? '(빈값)');
    counts[value] = (counts[value] || 0) + 1;
  });
  return Object.entries(counts).map(([value, count]) => ({ value, count }));
}

// 트리 형태로 그룹핑
export function groupByPivotTree(data: any[], columns: string[], level = 0): any[] {
  if (columns.length === 0) return [];

  const col = columns[0];
  const groups: Record<string, any[]> = {};

  data.forEach(row => {
    const keyName = findKeyInsensitive(row, col);
    const key = keyName ? row[keyName] : '(빈값)';
    if (!groups[key]) groups[key] = [];
    groups[key].push(row);
  });

  return Object.entries(groups).map(([key, rows]) => {
    const node: any = {
      key,
      col,
      level,
      count: rows.length,
      children: [],
    };
    if (columns.length > 1) {
      node.children = groupByPivotTree(rows, columns.slice(1), level + 1);
    }
    return node;
  });
}

// 지역 분석을 위한 공통 함수
export function analyzeRegionalData(rowData: any[], cityKeyA: string = 'City A', cityKeyB: string = 'City B') {
  const originCountries = rowData.map(r => r['Country A']).filter(value => value != null && value !== '');
  const destCountries = rowData.map(r => r['Country B']).filter(value => value != null && value !== '');
  const uniqueOriginCountries = Array.from(new Set(originCountries));
  const uniqueDestCountries = Array.from(new Set(destCountries));
  
  const cityA = rowData.map(r => r[cityKeyA]).filter(value => value != null && value !== '');
  const cityB = rowData.map(r => r[cityKeyB]).filter(value => value != null && value !== '');
  const uniqueCityA = Array.from(new Set(cityA));
  const uniqueCityB = Array.from(new Set(cityB));
  const allCities = [...cityA, ...cityB];
  const uniqueAllCities = Array.from(new Set(allCities));
  
  // 국가별 건수 통계
  const countryAStats: Record<string, number> = {};
  const countryBStats: Record<string, number> = {};
  originCountries.forEach(country => {
    countryAStats[country] = (countryAStats[country] || 0) + 1;
  });
  destCountries.forEach(country => {
    countryBStats[country] = (countryBStats[country] || 0) + 1;
  });
  
  // 도시별 건수 통계
  const cityAStats: Record<string, number> = {};
  const cityBStats: Record<string, number> = {};
  cityA.forEach(city => {
    cityAStats[city] = (cityAStats[city] || 0) + 1;
  });
  cityB.forEach(city => {
    cityBStats[city] = (cityBStats[city] || 0) + 1;
  });

  return {
    countries: {
      origin: originCountries,
      dest: destCountries,
      uniqueOrigin: uniqueOriginCountries,
      uniqueDest: uniqueDestCountries,
    },
    cities: {
      cityA,
      cityB,
      uniqueCityA,
      uniqueCityB,
      allCities,
      uniqueAllCities,
    },
    stats: {
      countryAStats,
      countryBStats,
      cityAStats,
      cityBStats,
    }
  };
}

// 상위 순위 데이터 생성
export function generateTopRankingData(stats: Record<string, number>, type: string, limit: number = 10) {
  return Object.entries(stats)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, limit)
    .map(([name, count]) => ({ name, value: count as number, type }));
} 