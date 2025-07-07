// 2. HYUNDAI, VPN, KOTRA top100 기반 synergy score 계산 및 저장
import fs from 'fs';
import path from 'path';

const top100CitiesPath = path.join('src', 'data', '01_cityScoreAggregator.json');
const ktGroupsPath = path.join('src', 'data', '02_calcTop10Synergy.json');
const outputPath = path.join('src', 'data', '2_synergyScores.json');

const top100Cities = JSON.parse(fs.readFileSync(top100CitiesPath, 'utf-8'));
const hyundaiTop = top100Cities.HYUNDAI.top100;
const vpnTop = top100Cities.VPN.top100;
const kotraTop = top100Cities.KOTRA.top100;
const ktGroups = JSON.parse(fs.readFileSync(ktGroupsPath, 'utf-8'));

function normalizeCity(city) {
  if (!city) return '';
  let c = city.trim().toUpperCase();

  // 1. 괄호 안 영문 우선 추출
  const parenEng = c.match(/\(([A-Z\\s]+)\)/);
  if (parenEng) {
    c = parenEng[1].replace(/\s+/g, '');
  } else {
    // 2. 한글, 한자, 특수문자, 공백 제거 후 영문만 남김
    c = c
      .replace(/[가-힣]/g, '') // 한글 제거
      .replace(/[一-龥]/g, '') // 한자 제거
      .replace(/[()\\[\\]{}]/g, '') // 괄호 제거
      .replace(/[^A-Z]/gi, '') // 영문만 남김
      .toUpperCase();
  }

  // 3. 주요 도시 예외 처리
  if (c.includes('HONGKONG') || c.includes('홍콩')) return 'HONG KONG';
  if (c === 'FRANKFURTAMMAIN' || c === 'FRANKFURT') return 'FRANKFURT';
  if (c.includes('HOCHIMINH') || c.includes('HOCHIMINHCITY') || c.includes('호치민')) return 'HO CHI MINH';
  if (c === 'NEWYORK') return 'NEW YORK';
  if (c === 'LOSANGELES') return 'LOS ANGELES';
  if (c === 'SAOPAULO') return 'SAO PAULO';
  if (c === 'BINHDUONG') return 'BINH DUONG';
  if (c === 'PHNOMPENH') return 'PHNOM PENH';
  if (c === 'BANGKOK') return 'BANGKOK';
  // 필요시 추가 예외 처리

  return c;
}

function rankScore(rank, maxRank = 100) {
  return (maxRank - rank + 1) / maxRank;
}

function makeRankMapWithTies(topList) {
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

const allSynergyCities = Array.from(
  new Set([
    ...ktGroups.flatMap(group => group.cities.map(city => normalizeCity(city))),
    ...hyundaiTop.map(row => normalizeCity(row.city)),
    ...vpnTop.map(row => normalizeCity(row.city)),
    ...kotraTop.map(row => normalizeCity(row.city))
  ])
);

const synergyScores = allSynergyCities.map(city => {
  const hyundaiRank = hyundaiRankMap[city] || 0;
  const vpnRank = vpnRankMap[city] || 0;
  const kotraRank = kotraRankMap[city] || 0;
  const hyundaiScore = hyundaiRank ? Number(rankScore(hyundaiRank).toFixed(4)) : 0.0;
  const vpnScore = vpnRank ? Number(rankScore(vpnRank).toFixed(4)) : 0.0;
  const kotraScore = kotraRank ? Number(rankScore(kotraRank).toFixed(4)) : 0.0;
  const synergyScore = Number(((hyundaiScore + vpnScore) / 2 + kotraScore).toFixed(4));
  return {
    city,
    synergyScore,
    hyundaiScore,
    vpnScore,
    kotraScore
  };
});

fs.writeFileSync(outputPath, JSON.stringify(synergyScores, null, 2), 'utf-8');
console.log(`✅ 2_synergyScores.json 파일이 생성되었습니다. (${synergyScores.length}개 도시)`); 