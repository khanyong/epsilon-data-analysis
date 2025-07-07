import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 파일 경로
const epsilonPath = path.join(__dirname, '../data/epsilonTopCities.json');
const ktGroupsPath = path.join(__dirname, '../data/ktCityGroups.json');
const outputPath = path.join(__dirname, '../data/synergyScores.json');

// HYUNDAI, VPN, KOTRA top100 리스트 경로
const top100CitiesPath = path.join(__dirname, '../data/top100Cities.json');

// 파일 읽기
const epsilonData = JSON.parse(fs.readFileSync(epsilonPath, 'utf-8'));
const ktGroups = JSON.parse(fs.readFileSync(ktGroupsPath, 'utf-8'));

const top100Cities = JSON.parse(fs.readFileSync(top100CitiesPath, 'utf-8'));
const hyundaiTop = top100Cities.HYUNDAI.top100;
const vpnTop = top100Cities.VPN.top100;
const kotraTop = top100Cities.KOTRA.top100;

// 도시명 표준화 함수 (cityScoreAggregator.js와 동일)
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

// 순위 점수화 함수
function rankScore(rank, maxRank = 100) {
  return (maxRank - rank + 1) / maxRank;
}

// 공동 순위(동점) 처리 함수
function makeRankMapWithTies(topList) {
  // topList: [{city, count}, ...] (이미 count 내림차순 정렬)
  const map = {};
  let prevCount = null;
  let rank = 0;
  let realRank = 0;
  for (const row of topList) {
    realRank += 1;
    if (row.count !== prevCount) {
      rank = realRank;
      prevCount = row.count;
    }
    map[normalizeCity(row.city)] = rank;
  }
  return map;
}

const hyundaiRankMap = makeRankMapWithTies(hyundaiTop);
const vpnRankMap = makeRankMapWithTies(vpnTop);
const kotraRankMap = makeRankMapWithTies(kotraTop);

// ktGroups의 모든 도시 합집합
const allSynergyCities = Array.from(
  new Set(ktGroups.flatMap(group => group.cities.map(city => normalizeCity(city))))
);

// 결과 배열 생성 (가중평균 적용)
const synergyScores = allSynergyCities.map(city => {
  const hyundaiRank = hyundaiRankMap[city] || 0;
  const vpnRank = vpnRankMap[city] || 0;
  const kotraRank = kotraRankMap[city] || 0;
  const hyundaiScore = hyundaiRank ? rankScore(hyundaiRank) : 0.0;
  const vpnScore = vpnRank ? rankScore(vpnRank) : 0.0;
  const kotraScore = kotraRank ? rankScore(kotraRank) : 0.0;
  // 가중치 적용
  const synergyScore =
    hyundaiScore * 0.2 +
    vpnScore * 0.2 +
    kotraScore * 0.6;
  return {
    city,
    synergyScore: Number(synergyScore.toFixed(4)),
    hyundaiScore,
    vpnScore,
    kotraScore
  };
});

// JSON 파일로 저장
fs.writeFileSync(outputPath, JSON.stringify(synergyScores, null, 2), 'utf-8');

console.log(`✅ synergyScores.json 파일이 생성되었습니다. (${synergyScores.length}개 도시)`);
