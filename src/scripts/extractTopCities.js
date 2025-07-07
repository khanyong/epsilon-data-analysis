// RFQ, SOF, 현대, VPN, KOTRA의 csv 파일에서 도시별 등장 빈도 상위 20개를 추출해 표로 저장하는 Node.js 스크립트
// 사용법: node src/scripts/extractTopCities.js

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// 데이터 파일 경로
const DATA_FILES = {
  RFQ: path.join('data', 'rfq_supabase.csv'),
  SOF: path.join('data', 'sof_supabase_clean.csv'),
  HYUNDAI: path.join('data', 'hyundai_motors_upload.csv'),
  VPN: path.join('data', 'vpn_connections_upload.csv'),
  KOTRA: path.join('data', 'kotra.csv'), // kotra.csv가 없으면 생략
};

// 도시명 표준화 함수 (간단 버전, 필요시 확장)
function normalizeCity(city) {
  if (!city) return '';
  return city.trim().toUpperCase();
}

// RFQ/SOF: "Quote No" + "City B" 유니크 조합 기준
function extractUniqueCityB(records, quoteNoCol, cityBCol) {
  const seen = new Set();
  const cityCount = {};
  for (const row of records) {
    const quoteNo = row[quoteNoCol];
    const cityB = normalizeCity(row[cityBCol]);
    if (!quoteNo || !cityB) continue;
    const key = `${quoteNo}__${cityB}`;
    if (!seen.has(key)) {
      seen.add(key);
      cityCount[cityB] = (cityCount[cityB] || 0) + 1;
    }
  }
  return cityCount;
}

// 현대/ VPN/ KOTRA: city 컬럼 기준
function extractCityCount(records, cityCol) {
  const cityCount = {};
  for (const row of records) {
    const city = normalizeCity(row[cityCol]);
    if (!city) continue;
    cityCount[city] = (cityCount[city] || 0) + 1;
  }
  return cityCount;
}

// 도시별 빈도 집계
function countCities(cityCountObj) {
  return Object.entries(cityCountObj).sort((a, b) => b[1] - a[1]);
}

// 상위 20개만 추출
function topN(cityCounts, n = 20) {
  return cityCounts.slice(0, n);
}

// 파일별 분석
function analyzeFile(filePath, options) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true });
  if (options.type === 'rfq' || options.type === 'sof') {
    return extractUniqueCityB(records, options.quoteNoCol, options.cityBCol);
  } else {
    return extractCityCount(records, options.cityCol);
  }
}

// 분석 실행
function main() {
  const results = {};
  // RFQ
  results.RFQ = countCities(
    analyzeFile(DATA_FILES.RFQ, { type: 'rfq', quoteNoCol: 'Quote No', cityBCol: 'city_b' })
  );
  // SOF
  results.SOF = countCities(
    analyzeFile(DATA_FILES.SOF, { type: 'sof', quoteNoCol: 'Quote No', cityBCol: 'City B' })
  );
  // 현대자동차
  results.HYUNDAI = countCities(
    analyzeFile(DATA_FILES.HYUNDAI, { type: 'hyundai', cityCol: 'city' })
  );
  // VPN
  results.VPN = countCities(
    analyzeFile(DATA_FILES.VPN, { type: 'vpn', cityCol: 'city' })
  );
  // KOTRA (파일이 없으면 생략)
  if (fs.existsSync(DATA_FILES.KOTRA)) {
    results.KOTRA = countCities(
      analyzeFile(DATA_FILES.KOTRA, { type: 'kotra', cityCol: 'city' })
    );
  } else {
    results.KOTRA = [];
  }

  // 보고서용 표 생성
  const lines = [];
  lines.push('| 순위 | RFQ 도시 | RFQ 건수 | SOF 도시 | SOF 건수 | 현대 도시 | 현대 건수 | VPN 도시 | VPN 건수 | KOTRA 도시 | KOTRA 건수 |');
  lines.push('|------|----------|----------|----------|----------|-----------|-----------|----------|----------|------------|------------|');
  for (let i = 0; i < 40; i++) {
    const rfq = results.RFQ[i] || ['', ''];
    const sof = results.SOF[i] || ['', ''];
    const hyundai = results.HYUNDAI[i] || ['', ''];
    const vpn = results.VPN[i] || ['', ''];
    const kotra = results.KOTRA[i] || ['', ''];
    lines.push(`| ${i + 1} | ${rfq[0]} | ${rfq[1]} | ${sof[0]} | ${sof[1]} | ${hyundai[0]} | ${hyundai[1]} | ${vpn[0]} | ${vpn[1]} | ${kotra[0]} | ${kotra[1]} |`);
  }
  fs.writeFileSync('top_cities_report.md', lines.join('\n'), 'utf-8');
  console.log('✅ top_cities_report.md 파일로 저장 완료!');
}

main(); 