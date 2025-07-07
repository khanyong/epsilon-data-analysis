// 3. epsilon score, synergy score 합산하여 최종 추천 리스트 생성 및 저장
import fs from 'fs';
import path from 'path';

const epsilonPath = path.join('src', 'data', '1_epsilonScores.json');
const synergyPath = path.join('src', 'data', '2_synergyScores.json');
const outputPath = path.join('src', 'data', '3_totalScores.json');

const epsilonData = JSON.parse(fs.readFileSync(epsilonPath, 'utf-8'));
const synergyData = JSON.parse(fs.readFileSync(synergyPath, 'utf-8'));

const epsilonMap = Object.fromEntries(epsilonData.map(row => [row.city.toUpperCase(), Number(row.epsilonScore)]));
const synergyMap = Object.fromEntries(synergyData.map(row => [row.city.toUpperCase(), Number(row.synergyScore)]));

const allCities = Array.from(new Set([
  ...epsilonData.map(row => row.city.toUpperCase()),
  ...synergyData.map(row => row.city.toUpperCase())
]));

const finalList = allCities.map((city, idx) => ({
  city,
  epsilonScore: epsilonMap[city] ?? 0,
  synergyScore: synergyMap[city] ?? 0,
  totalScore: ((epsilonMap[city] ?? 0) * 0.5 + (synergyMap[city] ?? 0) * 0.5) * 100,
})).sort((a, b) => b.totalScore - a.totalScore)
  .map((row, idx) => ({ ...row, rank: idx + 1 }));

fs.writeFileSync(outputPath, JSON.stringify(finalList, null, 2), 'utf-8');
console.log(`✅ 3_totalScores.json 파일이 생성되었습니다. (${finalList.length}개 도시)`); 