// 1. RFQ, SOF 데이터 읽기 및 파싱
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const DATA_FILES = {
  RFQ: path.join('data', 'rfq_supabase.csv'),
  SOF: path.join('data', 'sof_supabase_clean.csv'),
};

function normalizeCity(city) {
  if (!city) return '';
  let c = city.trim().toUpperCase().replace(/\s+/g, '');
  if (c.includes('HONGKONG') || c.includes('홍콩')) return 'HONG KONG';
  if (c === 'FRANKFURTAMMAIN' || c === 'FRANKFURT') return 'FRANKFURT';
  if (c.includes('HOCHIMINH') || c.includes('호치민')) return 'HO CHI MINH';
  return c;
}

// RFQ 데이터 처리
const rfqRaw = fs.readFileSync(DATA_FILES.RFQ, 'utf-8');
const rfqData = parse(rfqRaw, { columns: true, skip_empty_lines: true });
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

// SOF 데이터 처리
const sofRaw = fs.readFileSync(DATA_FILES.SOF, 'utf-8');
const sofData = parse(sofRaw, { columns: true, skip_empty_lines: true });
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

// 2. Epsilon 후보지역 집합 생성
const citySetEpsilon = new Set();
top100_RFQ.forEach(row => citySetEpsilon.add(row.city));
top100_SOF.forEach(row => citySetEpsilon.add(row.city));

// 3. Min-Max 정규화 및 epsilon score 계산
const rfqCounts = top100_RFQ.map(row => row.count);
const sofCounts = top100_SOF.map(row => row.count);
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

const epsilonResult = [];
citySetEpsilon.forEach(city => {
  const normCity = normalizeCity(city);
  const normRfq = getNormalizedScore100(normCity, top100_RFQ, rfqMin, rfqMax);
  const normSof = getNormalizedScore100(normCity, top100_SOF, sofMin, sofMax);
  const epsilonScore = normRfq * 0.8 + normSof * 0.2;
  if (epsilonScore > 0) {
    epsilonResult.push({ city: normCity, rfq: normRfq, sof: normSof, epsilonScore: epsilonScore.toFixed(4) });
  }
});
epsilonResult.sort((a, b) => b.epsilonScore - a.epsilonScore);

// rank 필드 추가
const epsilonResultWithRank = epsilonResult.map((row, idx) => ({
  ...row,
  rank: idx + 1
}));

// 4. 결과 저장
fs.writeFileSync('src/data/1_epsilonScores.json', JSON.stringify(epsilonResultWithRank, null, 2), 'utf-8');
console.log('✅ 1_epsilonScores.json 파일이 생성되었습니다.'); 