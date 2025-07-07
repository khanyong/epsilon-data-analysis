import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON 파일 읽기
const cityScoreData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/01_cityScoreAggregator.json'), 'utf-8'));

// 표준화 함수 예시
function normalizeCity(city) {
  // 한글, 특수문자, 괄호, 공백 모두 제거 후 영문만 남김
  return city
    .replace(/[가-힣]/g, '') // 한글 제거
    .replace(/[^A-Z ]/gi, '') // 영문, 공백만 남김
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

const KT_POP_CITIES = [
  'Los Angeles',
  'Palo Alto',
  'New York',
  'Hong Kong',
  'Tokyo',
  'Singapore',
  'London',
  'Jakarta',
  'Hanoi',
  'Makati City',
  'Frankfurt',
  'Osaka',
  'Jurong'
].map(normalizeCity);

// 1. 도시명 집합 만들기 (KT: 40위, Epsilon: 100위)
const citySetEpsilon = new Set();
['RFQ', 'SOF'].forEach(key => {
  cityScoreData[key].top100.forEach(row => citySetEpsilon.add(normalizeCity(row.city)));
});
const citySetKT = new Set();
['HYUNDAI', 'VPN', 'KOTRA'].forEach(key => {
  cityScoreData[key].top100.slice(0, 40).forEach(row => citySetKT.add(normalizeCity(row.city)));
});

// Epsilon 후보지역용 집계 (top100 전체)
function aggregateTopCities100(arr) {
  const map = new Map();
  arr.forEach(row => {
    const normCity = normalizeCity(row.city);
    const prev = map.get(normCity) || 0;
    map.set(normCity, prev + Number(row.count));
  });
  return Array.from(map.entries())
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count);
}
const rfqTop100 = aggregateTopCities100(cityScoreData.RFQ.top100);
const sofTop100 = aggregateTopCities100(cityScoreData.SOF.top100);

// KT 후보지역용 집계 (top40)
function aggregateTopCities(arr) {
  const map = new Map();
  arr.forEach(row => {
    const normCity = normalizeCity(row.city);
    const prev = map.get(normCity) || 0;
    map.set(normCity, prev + Number(row.count));
  });
  return Array.from(map.entries())
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 40);
}
const hyundaiTop40 = aggregateTopCities(cityScoreData.HYUNDAI.top100);
const vpnTop40 = aggregateTopCities(cityScoreData.VPN.top100);
const kotraTop40 = aggregateTopCities(cityScoreData.KOTRA.top100);

// Epsilon 후보지역 (Min-Max, top100)
const rfqArr = rfqTop100.map(row => Number(row.count));
const sofArr = sofTop100.map(row => Number(row.count));
const rfqMin = Math.min(...rfqArr), rfqMax = Math.max(...rfqArr);
const sofMin = Math.min(...sofArr), sofMax = Math.max(...sofArr);
function getNormalizedScore100(city, arr, min, max) {
  const found = arr.find(row => normalizeCity(row.city) === normalizeCity(city));
  if (!found) return 0;
  const val = Number(found.count);
  return (max === min) ? 0 : (val - min) / (max - min);
}
const epsilonResultMinMax = [];
citySetEpsilon.forEach(city => {
  const normRfq = getNormalizedScore100(city, rfqTop100, rfqMin, rfqMax);
  const normSof = getNormalizedScore100(city, sofTop100, sofMin, sofMax);
  const epsilonScore = normRfq * 0.6 + normSof * 0.4;
  if (epsilonScore > 0) {
    epsilonResultMinMax.push({ city, rfq: normRfq, sof: normSof, epsilonScore: epsilonScore.toFixed(4) });
  }
});
epsilonResultMinMax.sort((a, b) => b.epsilonScore - a.epsilonScore);

// [분류별 도시 리스트 테이블 출력]
// HYUNDAI, VPN, KOTRA top40 도시를 표준화하여 5가지 그룹으로 분류
const hyundaiSet = new Set(hyundaiTop40.map(row => normalizeCity(row.city)));
const vpnSet = new Set(vpnTop40.map(row => normalizeCity(row.city)));
const kotraSet = new Set(kotraTop40.map(row => normalizeCity(row.city)));

const allCities = new Set([
  ...hyundaiSet,
  ...vpnSet,
  ...kotraSet
]);

const group1 = []; // HYUNDAI, VPN, KOTRA 모두
const group2 = []; // HYUNDAI, VPN만
const group3 = []; // HYUNDAI만
const group4 = []; // VPN만

allCities.forEach(city => {
  const inHyundai = hyundaiSet.has(city);
  const inVpn = vpnSet.has(city);
  const inKotra = kotraSet.has(city);

  if (inHyundai && inVpn && inKotra) group1.push(city);
  else if (inHyundai && inVpn && !inKotra) group2.push(city);
  else if (inHyundai && !inVpn && !inKotra) group3.push(city);
  else if (!inHyundai && inVpn && !inKotra) group4.push(city);
});

// group5: KOTRA에만 있는 도시 중 count 상위 5개
const kotraOnly = kotraTop40
  .map(row => ({
    city: normalizeCity(row.city),
    count: Number(row.count)
  }))
  .filter(row => row.city) // 빈 도시명 제외
  .filter(row =>
    !hyundaiSet.has(row.city) && !vpnSet.has(row.city)
  )
  .sort((a, b) => b.count - a.count);

const group5 = kotraOnly.slice(0, 5).map(row => row.city);

// [2] HYUNDAI/VPN/KOTRA 분류별 도시 리스트 테이블만 출력
console.log('\n[2] HYUNDAI/VPN/KOTRA 분류별 도시 리스트');
console.log('| 분류 | 도시 리스트 |');
console.log('|------|-------------|');
console.log(`| HYUNDAI, VPN, KOTRA 모두 | ${group1.join(', ')} |`);
console.log(`| HYUNDAI, VPN만 | ${group2.join(', ')} |`);
console.log(`| HYUNDAI만 | ${group3.join(', ')} |`);
console.log(`| VPN만 | ${group4.join(', ')} |`);
console.log(`| KOTRA만(상위5) | ${group5.join(', ')} |`);

// [JSON 파일로 저장] HYUNDAI/VPN/KOTRA 분류별 도시 리스트
const ktCityGroups = [
  { label: 'HYUNDAI, VPN, KOTRA 모두', cities: group1 },
  { label: 'HYUNDAI, VPN만', cities: group2 },
  { label: 'HYUNDAI만', cities: group3 },
  { label: 'VPN만', cities: group4 },
  { label: 'KOTRA만(상위5)', cities: group5 }
];
fs.writeFileSync(
  path.join(__dirname, '../data/02_calcTop10Synergy.json'),
  JSON.stringify(ktCityGroups, null, 2),
  'utf-8'
);

// === 저장 완료 로그 및 미리보기 추가 ===
console.log('✅ 02_calcTop10Synergy.json 파일이 정상적으로 저장되었습니다.');
console.log('=== 02_calcTop10Synergy.json 미리보기 ===');
console.log(JSON.stringify(ktCityGroups, null, 2));
