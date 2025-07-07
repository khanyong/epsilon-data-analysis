// 도시별 Min-Max 점수 기반 최종점수 산출 및 상위 10개 도시 표 출력 스크립트
// 사용법: node src/scripts/cityScoreAggregator.js

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const ktGroupsPath = path.join('src', 'data', 'ktCityGroups.json');
const ktCityGroups = JSON.parse(fs.readFileSync(ktGroupsPath, 'utf-8'));

// 도시명-국가 매핑 테이블 (예시, 필요시 확장)
const cityToCountry = {
  'MUMBAI': 'INDIA',
  'NEW DELHI': 'INDIA',
  'DELHI': 'INDIA',
  'BANGKOK': 'THAILAND',
  'KRUNGTHEPMAHANAKHON': 'THAILAND',
  '방콕': 'THAILAND',
  'KUALALUMPUR': 'MALAYSIA',
  '쿠알라룸푸르': 'MALAYSIA',
  'SAOPAULO': 'BRAZIL',
  'SÃO PAULO': 'BRAZIL',
  // ... 필요시 추가 ...
};

// 도시명 표준화 함수 (extractTopCities.js 방식 + 매핑 추가)
const cityStandardMap = {
  '호치민시(HO CHI MINH CITY)': '호치민(HO CHI MINH)',
  '호치민(HO CHI MINH)': '호치민(HO CHI MINH)',
  // ... 필요시 추가 ...
};
function normalizeCity(city) {
  if (!city) return '';
  let c = city.trim().toUpperCase().replace(/\s+/g, '');
  // 홍콩
  if (c.includes('HONGKONG') || c.includes('홍콩')) return 'HONG KONG';
  // 프랑크푸르트
  if (c === 'FRANKFURTAMMAIN' || c === 'FRANKFURT') return 'FRANKFURT';
  // 호치민
  if (c.includes('HOCHIMINH') || c.includes('호치민')) return 'HO CHI MINH';
  // ... 기타 표준화 ...
  return c;
}

// md 파일에서 도시별 Min-Max 점수 추출
function parseMdMinMax(filePath) {
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
  const cityToScore = {};
  for (const line of lines) {
    if (line.startsWith('|') && !line.includes('순위')) {
      const cols = line.split('|').map(x => x.trim());
      const city = normalizeCity(cols[2]);
      const minmax = parseFloat(cols[5]);
      if (city) cityToScore[city] = minmax;
    }
  }
  return cityToScore;
}

const sources = [
  { key: 'RFQ', file: path.join('data', 'statistic_output', 'top_cities_stat_validation_RFQ.md'), weight: 0.4 },
  { key: 'SOF', file: path.join('data', 'statistic_output', 'top_cities_stat_validation_SOF.md'), weight: 0.25 },
  { key: 'HYUNDAI', file: path.join('data', 'statistic_output', 'top_cities_stat_validation_HYUNDAI.md'), weight: 0.15 },
  { key: 'VPN', file: path.join('data', 'statistic_output', 'top_cities_stat_validation_VPN.md'), weight: 0.1 },
  { key: 'KOTRA', file: path.join('data', 'statistic_output', 'top_cities_stat_validation_KOTRA.md'), weight: 0.1 },
];

// 모든 도시명 집합 만들기
const allCitySet = new Set();
const cityScoresBySource = {};
sources.forEach(src => {
  cityScoresBySource[src.key] = parseMdMinMax(src.file);
  Object.keys(cityScoresBySource[src.key]).forEach(city => allCitySet.add(city));
});

// 도시별 최종점수 계산
const cityFinalScores = [];
for (const city of allCitySet) {
  let total = 0;
  let detail = [];
  sources.forEach(src => {
    const score = cityScoresBySource[src.key][city] || 0;
    total += score * src.weight;
    detail.push(score);
  });
  cityFinalScores.push({ city, scores: detail, total });
}

// 상위 10개 도시 추출
cityFinalScores.sort((a, b) => b.total - a.total);
const top10 = cityFinalScores.slice(0, 10);

// 국가별 점수 합산
const countryScores = {};
for (const row of cityFinalScores) {
  const country = cityToCountry[row.city] || row.city; // 매핑 없으면 도시명 그대로
  if (!countryScores[country]) countryScores[country] = { scores: [0,0,0,0,0], total: 0 };
  row.scores.forEach((v, i) => countryScores[country].scores[i] += v);
  countryScores[country].total += row.total;
}
const countryScoreArr = Object.entries(countryScores).map(([country, v]) => ({ country, scores: v.scores, total: v.total }));
countryScoreArr.sort((a, b) => b.total - a.total);

// 표 출력 (도시 단위)
console.log('\n[도시 단위 상위 10위 표]');
console.log('| 순위 | 도시명 | RFQ(40%) | SOF(25%) | 현대(15%) | VPN(10%) | KOTRA(10%) | 총점 |');
console.log('|------|--------|----------|----------|-----------|----------|------------|------|');
top10.forEach((row, idx) => {
  const [rfq, sof, hyundai, vpn, kotra] = row.scores.map(x => x.toFixed(4));
  console.log(`| ${idx + 1} | ${row.city} | ${rfq} | ${sof} | ${hyundai} | ${vpn} | ${kotra} | ${row.total.toFixed(4)} |`);
});

// 표 출력 (국가 단위)
console.log('\n[국가 단위 합산 표]');
console.log('| 순위 | 국가 | RFQ(40%) | SOF(25%) | 현대(15%) | VPN(10%) | KOTRA(10%) | 총점 |');
console.log('|------|------|----------|----------|-----------|----------|------------|------|');
countryScoreArr.slice(0, 10).forEach((row, idx) => {
  const [rfq, sof, hyundai, vpn, kotra] = row.scores.map(x => x.toFixed(4));
  console.log(`| ${idx + 1} | ${row.country} | ${rfq} | ${sof} | ${hyundai} | ${vpn} | ${kotra} | ${row.total.toFixed(4)} |`);
});

// 데이터 파일 경로 정의 (extractTopCitiesStatValidation.js와 동일하게)
const DATA_FILES = {
  RFQ: path.join('data', 'rfq_supabase.csv'),
  SOF: path.join('data', 'sof_supabase_clean.csv'),
  HYUNDAI: path.join('data', 'hyundai_motors_upload.csv'),
  VPN: path.join('data', 'vpn_connections_upload.csv'),
  KOTRA: path.join('data', 'kotra.csv'),
};

// 각 데이터셋 파일 읽기 및 파싱
const rfqRaw = fs.readFileSync(DATA_FILES.RFQ, 'utf-8');
const rfqData = parse(rfqRaw, { columns: true, skip_empty_lines: true });

const sofRaw = fs.readFileSync(DATA_FILES.SOF, 'utf-8');
const sofData = parse(sofRaw, { columns: true, skip_empty_lines: true });

const hyundaiRaw = fs.readFileSync(DATA_FILES.HYUNDAI, 'utf-8');
const hyundaiData = parse(hyundaiRaw, { columns: true, skip_empty_lines: true });

const vpnRaw = fs.readFileSync(DATA_FILES.VPN, 'utf-8');
const vpnData = parse(vpnRaw, { columns: true, skip_empty_lines: true });

const kotraRaw = fs.readFileSync(DATA_FILES.KOTRA, 'utf-8');
const kotraData = parse(kotraRaw, { columns: true, skip_empty_lines: true });

// RFQ: 'Quote No' + 'city_b' 유니크 조합 기준, 도시명 표준화
const seenRFQ = new Set();
const rfqCityCount = {};
rfqData.forEach(row => {
  const quoteNo = row['Quote No'];
  const cityB = normalizeCity(row['city_b']);
  if (!quoteNo || !cityB) return;
  const key = `${quoteNo}__${cityB}`;
  if (!seenRFQ.has(key)) {
    seenRFQ.add(key);
    rfqCityCount[cityB] = (rfqCityCount[cityB] || 0) + 1;
  }
});
const top100_RFQ = Object.entries(rfqCityCount)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko'))
  .slice(0, 100)
  .map(([city, count]) => ({ city, count }));
console.log('RFQ 추출 도시 개수:', top100_RFQ.length);
console.log('RFQ 상위 5개 예시:', top100_RFQ.slice(0, 5));

// SOF: 'Quote No' + 'City B' 유니크 조합 기준, 도시명 표준화
const seenSOF = new Set();
const sofCityCount = {};
sofData.forEach(row => {
  const quoteNo = row['Quote No'];
  const cityB = normalizeCity(row['City B']);
  if (!quoteNo || !cityB) return;
  const key = `${quoteNo}__${cityB}`;
  if (!seenSOF.has(key)) {
    seenSOF.add(key);
    sofCityCount[cityB] = (sofCityCount[cityB] || 0) + 1;
  }
});
const top100_SOF = Object.entries(sofCityCount)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko'))
  .slice(0, 100)
  .map(([city, count]) => ({ city, count }));

// HYUNDAI: 표준화된 도시명 기준 count
const hyundaiCityCount = {};
hyundaiData.forEach(row => {
  const city = normalizeCity(row['city']);
  if (!city) return;
  hyundaiCityCount[city] = (hyundaiCityCount[city] || 0) + 1;
});
const top100_HYUNDAI = Object.entries(hyundaiCityCount)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko'))
  .slice(0, 100)
  .map(([city, count]) => ({ city, count }));

// VPN: 표준화된 도시명 기준 count
const vpnCityCount = {};
vpnData.forEach(row => {
  const city = normalizeCity(row['city']);
  if (!city) return;
  vpnCityCount[city] = (vpnCityCount[city] || 0) + 1;
});
const top100_VPN = Object.entries(vpnCityCount)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko'))
  .slice(0, 100)
  .map(([city, count]) => ({ city, count }));

// KOTRA: 표준화된 도시명 기준 count
const kotraCityCount = {};
kotraData.forEach(row => {
  const city = normalizeCity(row['city']);
  if (!city) return;
  kotraCityCount[city] = (kotraCityCount[city] || 0) + 1;
});
const top100_KOTRA = Object.entries(kotraCityCount)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko'))
  .slice(0, 100)
  .map(([city, count]) => ({ city, count }));

// 표 출력 (상위 100위)
console.log('\n[상위 100위 도시별 빈도 표]');
console.log('| 순위 | RFQ 도시 | RFQ 건수 | SOF 도시 | SOF 건수 | 현대 도시 | 현대 건수 | VPN 도시 | VPN 건수 | KOTRA 도시 | KOTRA 건수 |');
console.log('|------|----------|----------|----------|----------|-----------|-----------|----------|----------|------------|------------|');
for (let i = 0; i < 100; i++) {
  const rfq = top100_RFQ[i] || { city: '', count: 0 };
  const sof = top100_SOF[i] || { city: '', count: 0 };
  const hyundai = top100_HYUNDAI[i] || { city: '', count: 0 };
  const vpn = top100_VPN[i] || { city: '', count: 0 };
  const kotra = top100_KOTRA[i] || { city: '', count: 0 };
  console.log(`| ${i + 1} | ${rfq.city} | ${rfq.count} | ${sof.city} | ${sof.count} | ${hyundai.city} | ${hyundai.count} | ${vpn.city} | ${vpn.count} | ${kotra.city} | ${kotra.count} |`);
}

// === 모든 데이터셋에 대해 상위 100개 도시 → 국가별 그룹화 및 표 출력 ===
const DATASETS = [
  { name: 'RFQ', top100: top100_RFQ },
  { name: 'SOF', top100: top100_SOF },
  { name: 'HYUNDAI', top100: top100_HYUNDAI },
  { name: 'VPN', top100: top100_VPN },
  { name: 'KOTRA', top100: top100_KOTRA },
];

DATASETS.forEach(ds => {
  // 국가별 그룹화
  const countryGroups = {};
  ds.top100.forEach(row => {
    if (!countryGroups[row.country]) {
      countryGroups[row.country] = { cities: [], totalCount: 0, count: 0 };
    }
    countryGroups[row.country].cities.push(row.city);
    countryGroups[row.country].totalCount += Number(row.count);
    countryGroups[row.country].count += 1;
  });
  const countrySummary = Object.entries(countryGroups).map(([country, info]) => ({
    country,
    cities: info.cities,
    totalCount: info.totalCount,
    avgCount: info.totalCount / info.count,
    cityCount: info.count,
  })).sort((a, b) => b.avgCount - a.avgCount);

  // 국가별 표 출력
  console.log(`\n[${ds.name} 상위 100개 도시 → 국가별 그룹화 결과]`);
  console.log('| 순위 | 국가 | 도시수 | 도시목록 | 건수합계 | 건수평균 |');
  console.log('|------|------|-------|----------|---------|---------|');
  countrySummary.slice(0, 10).forEach((row, idx) => {
    console.log(`| ${idx + 1} | ${row.country} | ${row.cityCount} | ${row.cities.join(', ')} | ${row.totalCount} | ${row.avgCount.toFixed(2)} |`);
  });

  // 도시명/국가명/건수 목록 표 출력
  console.log(`\n[${ds.name} 상위 100개 도시의 도시명/국가명/건수 목록]`);
  console.log('| 순위 | 도시명 | 국가명 | 건수 |');
  console.log('|------|--------|--------|------|');
  ds.top100.forEach((row, idx) => {
    console.log(`| ${idx + 1} | ${row.city} | ${row.country} | ${row.count} |`);
  });

  // 국가별 도시 수 분포
  const top100CountryDist = {};
  ds.top100.forEach(row => {
    top100CountryDist[row.country] = (top100CountryDist[row.country] || 0) + 1;
  });
  console.log(`\n[${ds.name} 상위 100개 도시의 국가별 도시 수]`);
  console.table(top100CountryDist);
});

// 모든 데이터셋별로 상위 100개 도시, 국가별 그룹화, 도시/국가/건수 목록을 JSON으로 저장
function makeCountrySummary(top100) {
  const countryGroups = {};
  top100.forEach(row => {
    const country = row.country || undefined;
    if (!countryGroups[country]) {
      countryGroups[country] = { cities: [], totalCount: 0, count: 0 };
    }
    countryGroups[country].cities.push(row.city);
    countryGroups[country].totalCount += Number(row.count);
    countryGroups[country].count += 1;
  });
  return Object.entries(countryGroups).map(([country, info]) => ({
    country,
    cities: info.cities,
    totalCount: info.totalCount,
    avgCount: info.totalCount / info.count,
    cityCount: info.count,
  })).sort((a, b) => b.avgCount - a.avgCount);
}

function makeCityList(top100) {
  return top100.map((row, idx) => ({
    rank: idx + 1,
    city: row.city,
    country: row.country || undefined,
    count: row.count,
  }));
}

const allTop100Data = {
  RFQ: {
    top100: top100_RFQ,
    countrySummary: makeCountrySummary(top100_RFQ),
    cityList: makeCityList(top100_RFQ),
  },
  SOF: {
    top100: top100_SOF,
    countrySummary: makeCountrySummary(top100_SOF),
    cityList: makeCityList(top100_SOF),
  },
  HYUNDAI: {
    top100: top100_HYUNDAI,
    countrySummary: makeCountrySummary(top100_HYUNDAI),
    cityList: makeCityList(top100_HYUNDAI),
  },
  VPN: {
    top100: top100_VPN,
    countrySummary: makeCountrySummary(top100_VPN),
    cityList: makeCityList(top100_VPN),
  },
  KOTRA: {
    top100: top100_KOTRA,
    countrySummary: makeCountrySummary(top100_KOTRA),
    cityList: makeCityList(top100_KOTRA),
  },
};
fs.writeFileSync('src/data/01_cityScoreAggregator.json', JSON.stringify(allTop100Data, null, 2), 'utf-8');
console.log('✅ 모든 데이터셋의 상위 100개 도시, 국가별 그룹화, 도시/국가/건수 목록이 src/data/01_cityScoreAggregator.json 파일로 저장되었습니다.');

// === 수정: 표준화 및 중복 제거 적용 ===
const citySetEpsilon = new Set();
['RFQ', 'SOF'].forEach(key => {
  allTop100Data[key].top100.forEach(row => citySetEpsilon.add(normalizeCity(row.city)));
});

// === Epsilon 후보지역 점수 산정용 정규화 함수 및 변수 추가 ===
const rfqTop100 = allTop100Data.RFQ.top100;
const sofTop100 = allTop100Data.SOF.top100;
const rfqCounts = rfqTop100.map(row => row.count);
const sofCounts = sofTop100.map(row => row.count);
const rfqMin = Math.min(...rfqCounts);
const rfqMax = Math.max(...rfqCounts);
const sofMin = Math.min(...sofCounts);
const sofMax = Math.max(...sofCounts);
function getNormalizedScore100(city, top100, min, max) {
  const found = top100.find(row => normalizeCity(row.city) === city);
  if (!found) return 0;
  if (max === min) return 1;
  return (found.count - min) / (max - min);
}

// Epsilon 후보지역 (Min-Max, top100)
const epsilonResultMap = new Map();
citySetEpsilon.forEach(city => {
  const normCity = normalizeCity(city);
  const normRfq = getNormalizedScore100(normCity, rfqTop100, rfqMin, rfqMax);
  const normSof = getNormalizedScore100(normCity, sofTop100, sofMin, sofMax);
  const epsilonScore = normRfq * 0.6 + normSof * 0.4;
  if (epsilonScore > 0) {
    epsilonResultMap.set(normCity, { city: normCity, rfq: normRfq, sof: normSof, epsilonScore: epsilonScore.toFixed(4) });
  }
});
const epsilonResultMinMax = Array.from(epsilonResultMap.values());
epsilonResultMinMax.sort((a, b) => b.epsilonScore - a.epsilonScore);

// 그룹별 색상 매핑
const groupColorMap = {
  'HYUNDAI만': 'bg-blue-200 text-blue-800',
  'VPN만': 'bg-green-200 text-green-800',
  'KOTRA만(상위5)': 'bg-orange-200 text-orange-800',
  'HYUNDAI, VPN': 'bg-purple-200 text-purple-800',
  'HYUNDAI, VPN, KOTRA 모두': 'bg-gradient-to-r from-blue-200 via-green-200 to-orange-200 text-gray-900',
  // 기타 그룹은 회색
};

// 표준화 함수와 동일하게 cityContinentMap의 키를 맞춤
function continentKey(city) {
  return city.trim().toUpperCase().replace(/\s+/g, '');
}

const cityContinentMap = {
  // Asia
  [normalizeCity('SEOUL')]: 'Asia',
  [normalizeCity('TOKYO')]: 'Asia',
  [normalizeCity('HONG KONG')]: 'Asia',
  [normalizeCity('SHANG HAI')]: 'Asia',
  [normalizeCity('JAKARTA SELATAN')]: 'Asia',
  [normalizeCity('CHENNAI')]: 'Asia',
  [normalizeCity('BANGKOK')]: 'Asia',
  [normalizeCity('BEIJING')]: 'Asia',
  [normalizeCity('JIANGSU')]: 'Asia',
  [normalizeCity('HYDERABAD')]: 'Asia',
  [normalizeCity('RIZHAO')]: 'Asia',
  [normalizeCity('GUANGZHOU')]: 'Asia',
  [normalizeCity('TAMILNADU')]: 'Asia',
  [normalizeCity('TIANJIN')]: 'Asia',
  [normalizeCity('YANTAI')]: 'Asia',
  [normalizeCity('CANGZHOU')]: 'Asia',
  [normalizeCity('CIKARANG')]: 'Asia',
  [normalizeCity('HAI DUONG')]: 'Asia',
  [normalizeCity('GUANGDONG')]: 'Asia',
  [normalizeCity('JIAXING')]: 'Asia',
  [normalizeCity('HA NOI')]: 'Asia',
  [normalizeCity('BINH DUONG')]: 'Asia',
  [normalizeCity('TANGERANG')]: 'Asia',
  // Europe
  [normalizeCity('FRANKFURT')]: 'Europe',
  [normalizeCity('FRANKFURT AM MAIN')]: 'Europe',
  [normalizeCity('BUDAPEST')]: 'Europe',
  [normalizeCity('NOSOVICE')]: 'Europe',
  [normalizeCity('ZILINA')]: 'Europe',
  [normalizeCity('KOCAELI')]: 'Europe',
  [normalizeCity('MADRID')]: 'Europe',
  [normalizeCity('MILANO')]: 'Europe',
  [normalizeCity('OFFENBACH')]: 'Europe',
  [normalizeCity('PRAHA')]: 'Europe',
  [normalizeCity('WARSZAWA')]: 'Europe',
  [normalizeCity('BRATISLAVA')]: 'Europe',
  [normalizeCity('BREUKELEN')]: 'Europe',
  [normalizeCity('DOLNY HRICOV')]: 'Europe',
  [normalizeCity('EVERE')]: 'Europe',
  [normalizeCity('AMSTERDAM')]: 'Europe',
  [normalizeCity('DAVENTRY')]: 'Europe',
  [normalizeCity('ALBESTI')]: 'Europe',
  [normalizeCity('BANEASA')]: 'Europe',
  // North America
  [normalizeCity('NEW YORK')]: 'North America',
  [normalizeCity('LOS ANGELES')]: 'North America',
  [normalizeCity('PALO ALTO')]: 'North America',
  [normalizeCity('MONTGOMERY')]: 'North America',
  [normalizeCity('IRVINE')]: 'North America',
  [normalizeCity('EASTERN CREEK')]: 'North America',
  [normalizeCity('ELLABELL')]: 'North America',
  [normalizeCity('AUBURN')]: 'North America',
  [normalizeCity('GREENVILLE')]: 'North America',
  [normalizeCity('HIGHLAND PARK')]: 'North America',
  [normalizeCity('MEXICO CITY')]: 'North America',
  [normalizeCity('MISSISSAUGA')]: 'North America',
  [normalizeCity('NEWYORK')]: 'North America',
  [normalizeCity('PANAMA')]: 'North America',
  [normalizeCity('TORONTO')]: 'North America',
  [normalizeCity('AUCKLAND')]: 'North America',
  [normalizeCity('BOGOTA')]: 'North America',
  [normalizeCity('CALGARY')]: 'North America',
  [normalizeCity('CHARLOTTE')]: 'North America',
  [normalizeCity('COQUITLAM')]: 'North America',
  [normalizeCity('DALLAS')]: 'North America',
  [normalizeCity('DAYTON')]: 'North America',
  [normalizeCity('DETROIT')]: 'North America',
  // Middle East
  [normalizeCity('DUBAI')]: 'Middle East',
  [normalizeCity('ABU DABI')]: 'Middle East',
  [normalizeCity('BARAKAH')]: 'Middle East',
  [normalizeCity('BAHRAIN')]: 'Middle East',
  // 기타 필요시 추가...
};

// Chip 렌더링/대륙 분류 시 반드시 normalizeCity(city)로 조회
function getContinent(city) {
  const key = normalizeCity(city);
  return cityContinentMap[key] || 'Unknown';
}

// === [추가] 최종 점수 산출 및 JSON 저장 ===
// 1. 분류별 시너지 점수 등급 정의
const citySynergyScoreMap = {};
ktCityGroups.forEach(group => {
  let score = 0.4;
  if (group.label.includes('HYUNDAI, VPN, KOTRA 모두')) score = 1.0;
  else if (group.label.includes('HYUNDAI, VPN만')) score = 0.7;
  // HYUNDAI만, VPN만, KOTRA만(상위5)는 0.4
  group.cities.forEach(city => {
    citySynergyScoreMap[normalizeCity(city)] = score;
  });
});

// 2. Epsilon Score 맵 생성
const epsilonScoreMap = {};
epsilonResultMinMax.forEach(row => {
  epsilonScoreMap[normalizeCity(row.city)] = Number(row.epsilonScore);
});

// 3. 모든 도시 집합
const allCitiesSet = new Set([
  ...Object.keys(epsilonScoreMap),
  ...Object.keys(citySynergyScoreMap)
]);

// 4. 최종 점수 계산
const totalCityScores = Array.from(allCitiesSet).map(city => {
  const eps = epsilonScoreMap[city] ?? 0;
  const syn = citySynergyScoreMap[city] ?? 0;
  const total = (eps * 0.5) + (syn * 0.5);
  return {
    city,
    epsilonScore: eps,
    synergyScore: syn,
    totalScore: Number((total * 100).toFixed(2)) // 100점 만점 환산
  };
});

// 5. 점수순 정렬
const sortedTotalCityScores = totalCityScores.sort((a, b) => b.totalScore - a.totalScore);

// 6. JSON 저장
// (아래 fs.writeFileSync 및 관련 로그 삭제)
// ... existing code ...

// cities: 도시명 배열, group: 그룹명
// function CityGroupByContinent({ cities, group }) { ... }
// {ktCityGroups.map(groupObj => (...))} 