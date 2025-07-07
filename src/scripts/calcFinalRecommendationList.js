import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 파일 경로
const epsilonPath = path.join(__dirname, '../data/epsilonTopCities.json');
const synergyPath = path.join(__dirname, '../data/synergyScores.json');
const outputPath = path.join(__dirname, '../data/finalRecommendationList.json');

// 파일 읽기
const epsilonData = JSON.parse(fs.readFileSync(epsilonPath, 'utf-8'));
const synergyData = JSON.parse(fs.readFileSync(synergyPath, 'utf-8'));

// 도시명 → 점수 매핑 (대문자 기준)
const epsilonMap = Object.fromEntries(epsilonData.map(row => [row.city.toUpperCase(), Number(row.epsilonScore)]));
const synergyMap = Object.fromEntries(synergyData.map(row => [row.city.toUpperCase(), Number(row.synergyScore)]));

// 도시명 합집합
const allCities = Array.from(new Set([
  ...epsilonData.map(row => row.city.toUpperCase()),
  ...synergyData.map(row => row.city.toUpperCase())
]));

// 최종 리스트 생성
const finalList = allCities.map((city, idx) => ({
  city,
  epsilonScore: epsilonMap[city] ?? 0,
  synergyScore: synergyMap[city] ?? 0,
  totalScore: ((epsilonMap[city] ?? 0) * 0.5 + (synergyMap[city] ?? 0) * 0.5) * 100,
})).sort((a, b) => b.totalScore - a.totalScore)
  .map((row, idx) => ({ ...row, rank: idx + 1 }));

fs.writeFileSync(outputPath, JSON.stringify(finalList, null, 2), 'utf-8');

console.log(`✅ finalRecommendationList.json 파일이 생성되었습니다. (${finalList.length}개 도시)`); 