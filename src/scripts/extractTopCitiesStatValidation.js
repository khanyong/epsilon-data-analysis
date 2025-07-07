// 통계 검증용: 상위 40개 도시별 기존 점수, Z-Score, Min-Max, PCA 점수 산출 스크립트
// 사용법: node src/scripts/extractTopCitiesStatValidation.js

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { mean, std } from 'mathjs';
import { PCA } from 'ml-pca';

// 데이터 파일 경로 (extractTopCities.js와 동일)
const DATA_FILES = {
  RFQ: path.join('data', 'rfq_supabase.csv'),
  SOF: path.join('data', 'sof_supabase_clean.csv'),
  HYUNDAI: path.join('data', 'hyundai_motors_upload.csv'),
  VPN: path.join('data', 'vpn_connections_upload.csv'),
  KOTRA: path.join('data', 'kotra.csv'),
};

function normalizeCity(city) {
  if (!city) return '';
  return city.trim().toUpperCase();
}

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

function extractCityCount(records, cityCol) {
  const cityCount = {};
  for (const row of records) {
    const city = normalizeCity(row[cityCol]);
    if (!city) continue;
    cityCount[city] = (cityCount[city] || 0) + 1;
  }
  return cityCount;
}

function countCities(cityCountObj) {
  return Object.entries(cityCountObj).sort((a, b) => b[1] - a[1]);
}

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

function getTopCities(results, n = 40) {
  // 상위 40개 도시명 집합 생성 (모든 소스에서 등장한 도시 포함)
  const citySet = new Set();
  ['RFQ', 'SOF', 'HYUNDAI', 'VPN', 'KOTRA'].forEach(key => {
    results[key].forEach(([city]) => city && citySet.add(city));
  });
  return Array.from(citySet).slice(0, n);
}

function getCityFeatureMatrix(cities, results) {
  // 각 도시별 [RFQ, SOF, HYUNDAI, VPN, KOTRA] 건수 배열 생성
  const cityToFeatures = {};
  for (const city of cities) {
    cityToFeatures[city] = [0, 0, 0, 0, 0];
  }
  results.RFQ.forEach(([city, cnt]) => { if (cityToFeatures[city]) cityToFeatures[city][0] = cnt; });
  results.SOF.forEach(([city, cnt]) => { if (cityToFeatures[city]) cityToFeatures[city][1] = cnt; });
  results.HYUNDAI.forEach(([city, cnt]) => { if (cityToFeatures[city]) cityToFeatures[city][2] = cnt; });
  results.VPN.forEach(([city, cnt]) => { if (cityToFeatures[city]) cityToFeatures[city][3] = cnt; });
  results.KOTRA.forEach(([city, cnt]) => { if (cityToFeatures[city]) cityToFeatures[city][4] = cnt; });
  return cities.map(city => cityToFeatures[city]);
}

function minMaxNormalize(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return arr.map(v => max === min ? 0 : (v - min) / (max - min));
}

function zScoreNormalize(arr) {
  const m = mean(arr);
  const s = std(arr);
  return arr.map(v => s === 0 ? 0 : (v - m) / s);
}

function weightedScore(features, weights) {
  return features.map(f => f.reduce((acc, v, i) => acc + v * weights[i], 0));
}

function getStatTable(arr) {
  // arr: [ [도시, 건수], ... ]
  const values = arr.map(x => x[1]);
  const m = mean(values);
  const s = std(values);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return arr.map(([city, cnt]) => ({
    city,
    count: cnt,
    z: s === 0 ? 0 : (cnt - m) / s,
    mm: max === min ? 0 : (cnt - min) / (max - min),
  }));
}

function saveStatTableMd(filename, statTable) {
  const lines = [];
  lines.push('| 순위 | 도시명 | 건수 | Z-Score | Min-Max |');
  lines.push('|------|--------|------|---------|---------|');
  statTable.forEach((row, idx) => {
    lines.push(`| ${idx + 1} | ${row.city} | ${row.count} | ${row.z.toFixed(4)} | ${row.mm.toFixed(4)} |`);
  });
  fs.writeFileSync(filename, lines.join('\n'), 'utf-8');
}

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
  // KOTRA
  if (fs.existsSync(DATA_FILES.KOTRA)) {
    results.KOTRA = countCities(
      analyzeFile(DATA_FILES.KOTRA, { type: 'kotra', cityCol: 'city' })
    );
  } else {
    results.KOTRA = [];
  }

  // 각 데이터별로 상위 40개 도시, 통계 표 산출 및 저장
  Object.entries(results).forEach(([key, arr]) => {
    const top40 = arr.slice(0, 40);
    const statTable = getStatTable(top40);
    saveStatTableMd(`top_cities_stat_validation_${key}.md`, statTable);
    console.log(`✅ top_cities_stat_validation_${key}.md 파일로 저장 완료!`);
  });
}

main(); 