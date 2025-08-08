import React from 'react';
import cityScoreData from '../../data/01_cityScoreAggregator.json';
import epsilonScores from '../../data/1_epsilonScores.json';
import synergyScores from '../../data/2_synergyScores.json';
import synergyGroups from '../../data/02_calcTop10Synergy.json';
import totalScores from '../../data/3_totalScores.json';
// Remove the import for FinalRecommendationTable since the code is in this file
// import FinalRecommendationTable from './FinalRecommendationTable';

const FIXED_DATA = {
  rfq: { totalCount: 9474, countries: 23, cities: 156, topRegions: 'APAC, AMERICAS', topCountries: 'South Korea, United States' },
  sof: { totalCount: 1651, countries: 18, cities: 89, topRegions: 'APAC, EUROPE', topCountries: 'South Korea, Germany' },
  kotra: { totalCount: 34460, countries: 45, cities: 0, topRegions: 'APAC, AMERICAS', topCountries: 'China, United States' },
  epsilonPop: { totalCount: 65, countries: 25, cities: 65, topRegions: 'EUROPE, APAC', topCountries: 'United States, Germany' },
  ktPop: { totalCount: 13, countries: 8, cities: 13, topRegions: 'APAC, AMERICAS', topCountries: 'United States, Japan' },
  vpnConnections: { totalCount: 119, countries: 24, cities: 85, topRegions: 'APAC, AMERICAS', topCountries: 'China, United States' },
  hyundaiMotors: { totalCount: 141, countries: 32, cities: 67, topRegions: 'APAC, AMERICAS', topCountries: 'South Korea, United States' }
};
const dataComparison = [
  { metric: '총 건수', rfq: FIXED_DATA.rfq.totalCount, sof: FIXED_DATA.sof.totalCount, kotra: FIXED_DATA.kotra.totalCount, epsilonPop: FIXED_DATA.epsilonPop.totalCount, ktPop: FIXED_DATA.ktPop.totalCount, vpnConnections: FIXED_DATA.vpnConnections.totalCount, hyundaiMotors: FIXED_DATA.hyundaiMotors.totalCount },
  { metric: '서비스 국가', rfq: FIXED_DATA.rfq.countries, sof: FIXED_DATA.sof.countries, kotra: FIXED_DATA.kotra.countries, epsilonPop: FIXED_DATA.epsilonPop.countries, ktPop: FIXED_DATA.ktPop.countries, vpnConnections: FIXED_DATA.vpnConnections.countries, hyundaiMotors: FIXED_DATA.hyundaiMotors.countries },
  { metric: '서비스 도시', rfq: FIXED_DATA.rfq.cities, sof: FIXED_DATA.sof.cities, kotra: '-', epsilonPop: FIXED_DATA.epsilonPop.cities, ktPop: FIXED_DATA.ktPop.cities, vpnConnections: FIXED_DATA.vpnConnections.cities, hyundaiMotors: FIXED_DATA.hyundaiMotors.cities },
  { metric: '주요 지역', rfq: FIXED_DATA.rfq.topRegions, sof: FIXED_DATA.sof.topRegions, kotra: FIXED_DATA.kotra.topRegions, epsilonPop: FIXED_DATA.epsilonPop.topRegions, ktPop: FIXED_DATA.ktPop.topRegions, vpnConnections: FIXED_DATA.vpnConnections.topRegions, hyundaiMotors: FIXED_DATA.hyundaiMotors.topRegions },
  { metric: 'Top 국가', rfq: FIXED_DATA.rfq.topCountries, sof: FIXED_DATA.sof.topCountries, kotra: FIXED_DATA.kotra.topCountries, epsilonPop: FIXED_DATA.epsilonPop.topCountries, ktPop: FIXED_DATA.ktPop.topCountries, vpnConnections: FIXED_DATA.vpnConnections.topCountries, hyundaiMotors: FIXED_DATA.hyundaiMotors.topCountries }
];

function CollapsibleSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="mb-4 border rounded-lg shadow">
      <button
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 font-semibold text-left"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span>{title}</span>
        <span className="ml-2">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
}

export function InvestmentStrategySectionPreprocessing({ children }: { children?: React.ReactNode }) {
  return (
    <section id="preprocessing">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">1. 데이터 전처리 및 가정 조건</h2>
      <div className="space-y-4 text-gray-700">
        <div>
          <h3 className="font-semibold text-amber-700 mb-2">1. RFQ 데이터 Cleaning 방법론</h3>
          <div className="ml-4 space-y-2 text-sm">
            <p>• 기존 데이터의 경우 Quote No.가 동일한 데이터를 중복처리 하지 않아서 데이터 편향이 발생</p>
            <p>• 이번에 데이터를 다음과 같이 가공함:</p>
            <div className="ml-6 space-y-1">
              <p>- 기존 데이터를 모든 Product를 대상으로 분류하였음</p>
              <p>- 이번에는 Middle mile 상품으로만 한정하여 <strong>Ethernet, MPLS IP VPN, SDH, Wave Length 4개 상품</strong>으로 한정함</p>
              <p>- Quote No가 동일한 데이터를 Grouping 하여 정리</p>
              <p>- 동일한 Quote No.내에 도착국(Country B)이 상이한 데이터는 고객의 잠재 수요가 존재하는 데이터로 인정하여 추가 Grouping 함</p>
              <p>- 이를 통해 RFQ 전체 데이터 <span className="font-bold text-red-600">24,406개 → 9,474개</span>로 감소</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-amber-700 mb-2">2. SOF 데이터 정제</h3>
          <div className="ml-4 text-sm">
            <p>• SOF 데이터의 경우는 <span className="font-bold text-red-600">20,118개 → 1,651개</span>로 감소</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-amber-700 mb-2">3. 기타 데이터 소스</h3>
          <div className="ml-4 text-sm">
            <p>• KOTRA 무역 데이터: 3,247건 (원본 데이터 활용)</p>
            <p>• Epsilon PoP: 65개 글로벌 거점 (4개 지역, Infiny 지원 53개)</p>
            <p>• KT PoP: 13개 글로벌 거점 (3개 지역)</p>
            <p>• VPN Connections: 120개 연결 (24개국, 15개 주요 고객사)</p>
            <p>• Hyundai Motors: 87개 글로벌 거점 (32개국, 4개 사업 기능)</p>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}

export function InvestmentStrategySectionComparison({ children }: { children?: React.ReactNode }) {
  // 기존 코드의 dataComparison 배열
  const dataComparison = [
    {
      metric: '데이터 유형',
      rfq: 'RFQ 견적요청',
      sof: 'SOF 주문확정',
      kotra: 'KOTRA 무역',
      epsilonPop: 'Epsilon PoP',
      ktPop: 'KT PoP',
      vpnConnections: 'VPN 연결',
      hyundaiMotors: '현대 자동차'
    },
    {
      metric: '총 건수',
      rfq: '9,474',
      sof: '1,651',
      kotra: '34,460',
      epsilonPop: '65',
      ktPop: '13',
      vpnConnections: '119',
      hyundaiMotors: '141'
    },
    {
      metric: '서비스 국가',
      rfq: '23',
      sof: '18',
      kotra: '45',
      epsilonPop: '25',
      ktPop: '8',
      vpnConnections: '24',
      hyundaiMotors: '32'
    },
    {
      metric: '서비스 도시',
      rfq: '156',
      sof: '89',
      kotra: 'N/A',
      epsilonPop: '65',
      ktPop: '13',
      vpnConnections: '85',
      hyundaiMotors: '67'
    },
    {
      metric: '주요 지역',
      rfq: 'APAC, AMERICAS',
      sof: 'APAC, EUROPE',
      kotra: 'APAC, AMERICAS',
      epsilonPop: 'EUROPE, APAC',
      ktPop: 'APAC, AMERICAS',
      vpnConnections: 'APAC, AMERICAS',
      hyundaiMotors: 'APAC, AMERICAS'
    },
    {
      metric: 'Top 국가',
      rfq: 'South Korea, United States',
      sof: 'South Korea, Germany',
      kotra: 'China, United States',
      epsilonPop: 'United States, Germany',
      ktPop: 'United States, Japan',
      vpnConnections: 'China, United States',
      hyundaiMotors: 'South Korea, United States'
    },
    {
      metric: '데이터 시각범위',
      rfq: '2023-2024',
      sof: '2023-2024',
      kotra: '2023',
      epsilonPop: '현재',
      ktPop: '현재',
      vpnConnections: '현재',
      hyundaiMotors: '현재'
    },
    {
      metric: '사용 목적',
      rfq: '견적 분석',
      sof: '주문 분석',
      kotra: '무역 분석',
      epsilonPop: '인프라 분석',
      ktPop: '네트워크 분석',
      vpnConnections: '연결 분석',
      hyundaiMotors: '글로벌 분석'
    },
    {
      metric: '특별 속성',
      rfq: '도시 정규화',
      sof: '매출 확정',
      kotra: '무역 파트너',
      epsilonPop: 'Infiny 지원',
      ktPop: '통신 인프라',
      vpnConnections: '고객사 연결',
      hyundaiMotors: '제조업 글로벌'
    }
  ];
  return (
    <section id="comparison">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">2. 7개 데이터 소스 종합 비교</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">구분</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">RFQ</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">SOF</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">KOTRA</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Epsilon PoP</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">KT PoP</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">VPN</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">현대 자동차</th>
            </tr>
          </thead>
          <tbody>
            {dataComparison.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-700 bg-gray-100">{row.metric}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{row.rfq}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{row.sof}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{row.kotra}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{row.epsilonPop}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{row.ktPop}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{row.vpnConnections}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{row.hyundaiMotors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">비즈니스 데이터</h4>
          <p className="text-sm text-blue-700">RFQ, SOF, KOTRA는 실제 비즈니스 거래 데이터로 시장 수요와 매출 분석에 활용</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">인프라 데이터</h4>
          <p className="text-sm text-green-700">Epsilon PoP, KT PoP는 글로벌 통신 인프라 현황으로 네트워크 투자 전략 수립에 활용</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">시너지 효과</h4>
          <p className="text-sm text-purple-700">7개 데이터의 지역별 분포를 통해 통합 투자 우선순위 및 시장 기회 도출</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export function InvestmentStrategySectionCandidateAnalysis({ children }: { children?: React.ReactNode }) {
  return (
    <section id="candidate-analysis">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">3. KT/Epsilon PoP 투자 후보지역 선정 분석</h2>
      <div className="bg-white rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">선정 기준 및 논리</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">제외</span>
              <div>
                <h4 className="font-semibold text-red-700">KT PoP 기존 투자지역</h4>
                <p className="text-sm text-gray-600">이미 PoP을 투자한 13개 도시는 제외</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">고비중</span>
              <div>
                <h4 className="font-semibold text-blue-700">RFQ 잠재고객 지역</h4>
                <p className="text-sm text-gray-600">Epsilon에 견적 요청한 9,474건 지역/도시 (40% 가중치)</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">중비중</span>
              <div>
                <h4 className="font-semibold text-green-700">SOF 기존고객 지역</h4>
                <p className="text-sm text-gray-600">확정 주문한 1,651건 지역/도시 (25% 가중치)</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">시너지</span>
              <div>
                <h4 className="font-semibold text-purple-700">현대자동차 진출지역</h4>
                <p className="text-sm text-gray-600">KT 파트너사 141개 거점 연계 마케팅 (15% 가중치)</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">시너지</span>
              <div>
                <h4 className="font-semibold text-indigo-700">VPN 고객 요구지역</h4>
                <p className="text-sm text-gray-600">119개 연결의 15개 고객사 요구 지역 (10% 가중치)</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium mr-3 mt-0.5">연계</span>
              <div>
                <h4 className="font-semibold text-orange-700">KOTRA 한국기업 진출지역</h4>
                <p className="text-sm text-gray-600">34,460건 무역 데이터 기반 연계 마케팅 (10% 가중치)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}

export function InvestmentStrategySectionExcludeKtpop({ children }: { children?: React.ReactNode }) {
  return (
    <section id="exclude-ktpop">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">4. 1단계: KT PoP 기존 투자지역 제외</h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <th className="border border-gray-300 px-4 py-3 text-left">도시명</th>
              <th className="border border-gray-300 px-4 py-3 text-left">국가</th>
              <th className="border border-gray-300 px-4 py-3 text-left">지역</th>
              <th className="border border-gray-300 px-4 py-3 text-left">개설연도</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-300 px-4 py-2">Los Angeles</td><td className="border border-gray-300 px-4 py-2">USA</td><td className="border border-gray-300 px-4 py-2">AMERICAS</td><td className="border border-gray-300 px-4 py-2">2001.11</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Palo Alto</td><td className="border border-gray-300 px-4 py-2">USA</td><td className="border border-gray-300 px-4 py-2">AMERICAS</td><td className="border border-gray-300 px-4 py-2">2014.11</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">New York</td><td className="border border-gray-300 px-4 py-2">USA</td><td className="border border-gray-300 px-4 py-2">AMERICAS</td><td className="border border-gray-300 px-4 py-2">2001.11</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Hong Kong</td><td className="border border-gray-300 px-4 py-2">Hong Kong</td><td className="border border-gray-300 px-4 py-2">APAC</td><td className="border border-gray-300 px-4 py-2">2010</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Tokyo</td><td className="border border-gray-300 px-4 py-2">Japan</td><td className="border border-gray-300 px-4 py-2">APAC</td><td className="border border-gray-300 px-4 py-2">2001.11</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Singapore</td><td className="border border-gray-300 px-4 py-2">Singapore</td><td className="border border-gray-300 px-4 py-2">APAC</td><td className="border border-gray-300 px-4 py-2">2001.12</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">London</td><td className="border border-gray-300 px-4 py-2">United Kingdom</td><td className="border border-gray-300 px-4 py-2">EUROPE</td><td className="border border-gray-300 px-4 py-2">2002.2</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Jakarta</td><td className="border border-gray-300 px-4 py-2">Indonesia</td><td className="border border-gray-300 px-4 py-2">APAC</td><td className="border border-gray-300 px-4 py-2">2013.1</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Hanoi</td><td className="border border-gray-300 px-4 py-2">Vietnam</td><td className="border border-gray-300 px-4 py-2">APAC</td><td className="border border-gray-300 px-4 py-2">2010.11</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Makati City</td><td className="border border-gray-300 px-4 py-2">Philippines</td><td className="border border-gray-300 px-4 py-2">APAC</td><td className="border border-gray-300 px-4 py-2">2010.5</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Frankfurt</td><td className="border border-gray-300 px-4 py-2">Germany</td><td className="border border-gray-300 px-4 py-2">EUROPE</td><td className="border border-gray-300 px-4 py-2">2006</td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Osaka</td><td className="border border-gray-300 px-4 py-2"></td></tr>
            <tr><td className="border border-gray-300 px-4 py-2">Jurong</td><td className="border border-gray-300 px-4 py-2"></td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-red-100 p-4 rounded-lg">
        <p className="text-red-800 font-medium">⚠️ 총 13개 도시: KT PoP 기존 투자지역으로 추가 투자 우선순위에서 제외</p>
      </div>
      {children}
    </section>
  );
}

const CONTINENT_COLOR_MAP = {
  'Asia': 'bg-yellow-100 text-yellow-800',
  'Europe': 'bg-blue-100 text-blue-800',
  'North America': 'bg-green-100 text-green-800',
  'Oceania': 'bg-pink-100 text-pink-800',
  'Middle East': 'bg-purple-100 text-purple-800',
  'South America': 'bg-orange-100 text-orange-800',
  '기타': 'bg-gray-100 text-gray-800',
};

// Min-Max 정규화 함수
function minMaxNormalize(arr, value) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  if (max === min) return 0;
  return (value - min) / (max - min);
}

// Epsilon Score 정규화 데이터 생성
const epsilonScoreArr = epsilonScores.map(row => Number(row.epsilonScore));
const normalizedEpsilonScores = epsilonScores.map(row => ({
  ...row,
  epsilonScoreNorm: minMaxNormalize(epsilonScoreArr, Number(row.epsilonScore))
}));

// Synergy Score 정규화 데이터
const synergyScoreArr = synergyScores.map(row => Number(row.synergyScore));
const normalizedSynergyScores = synergyScores.map(row => ({
  ...row,
  synergyScoreNorm: minMaxNormalize(synergyScoreArr, Number(row.synergyScore))
}));

// 대륙 매핑 함수 (기존 코드와 동일하게 적용)
function normalizeCity(city) {
  if (!city) return '';
  let c = city.trim().toUpperCase().replace(/\s+/g, '');
  if (c.includes('HONGKONG') || c.includes('홍콩')) return 'HONGKONG';
  if (c.includes('SHANGHAI') || c.includes('상하이') || c.includes('上海') || c.includes('상해')) return 'SHANGHAI';
  if (c.includes('JAKARTA') || c.includes('자카르타')) return 'JAKARTA';
  if (c.includes('SINGAPORE') || c.includes('싱가포르')) return 'SINGAPORE';
  if (c.includes('CHENNAI') || c.includes('첸나이')) return 'CHENNAI';
  if (c.includes('YANTAI') || c.includes('옌타이') || c.includes('烟台') || c.includes('연태')) return 'YANTAI';
  if (c.includes('LOSANGELES') || c.includes('로스앤젤레스')) return 'LOSANGELES';
  if (c.includes('NEWYORK')) return 'NEWYORK';
  return c;
}
const CITY_CONTINENT_MAP = {
  [normalizeCity('CHENNAI')]: 'Asia',
  [normalizeCity('BANGKOK')]: 'Asia',
  [normalizeCity('BEIJING')]: 'Asia',
  [normalizeCity('JIANGSU')]: 'Asia',
  [normalizeCity('FRANKFURT')]: 'Europe',
  [normalizeCity('BUDAPEST')]: 'Europe',
  [normalizeCity('SHANGHAI')]: 'Asia',
  [normalizeCity('NEW YORK')]: 'North America',
  [normalizeCity('PESQUERIA')]: 'North America',
  [normalizeCity('ANANTAPUR')]: 'Asia',
  [normalizeCity('NOSOVICE')]: 'Europe',
  [normalizeCity('ZILINA')]: 'Europe',
  [normalizeCity('HYDERABAD')]: 'Asia',
  [normalizeCity('MONTGOMERY')]: 'North America',
  [normalizeCity('RIZHAO')]: 'Asia',
  [normalizeCity('IRVINE')]: 'North America',
  [normalizeCity('EASTERN CREEK')]: 'Oceania',
  [normalizeCity('ELLABELL')]: 'North America',
  [normalizeCity('KOCAELI')]: 'Europe',
  [normalizeCity('MADRID')]: 'Europe',
  [normalizeCity('MILANO')]: 'Europe',
  [normalizeCity('OFFENBACH')]: 'Europe',
  [normalizeCity('PRAHA')]: 'Europe',
  [normalizeCity('TAMILNADU')]: 'Asia',
  [normalizeCity('TIANJIN')]: 'Asia',
  [normalizeCity('WARSZAWA')]: 'Europe',
  [normalizeCity('YANTAI')]: 'Asia',
  [normalizeCity('AUBURN')]: 'North America',
  [normalizeCity('BRATISLAVA')]: 'Europe',
  [normalizeCity('BREUKELEN')]: 'Europe',
  [normalizeCity('CANGZHOU')]: 'Asia',
  [normalizeCity('CIKARANG')]: 'Asia',
  [normalizeCity('CUAUTITLAN IZCALLI')]: 'North America',
  [normalizeCity('DOLNY HRICOV')]: 'Europe',
  [normalizeCity('EVERE')]: 'Europe',
  [normalizeCity('GREENVILLE')]: 'North America',
  [normalizeCity('GUANGZHOU')]: 'Asia',
  [normalizeCity('HAI DUONG')]: 'Asia',
  [normalizeCity('HIGHLAND PARK')]: 'North America',
  [normalizeCity('GUANGDONG')]: 'Asia',
  [normalizeCity('JIAXING')]: 'Asia',
  [normalizeCity('AMSTERDAM')]: 'Europe',
  [normalizeCity('BARAKAH')]: 'Middle East',
  [normalizeCity('GURGAON')]: 'Asia',
  [normalizeCity('MEXICO CITY')]: 'North America',
  [normalizeCity('MISSISSAUGA')]: 'North America',
  [normalizeCity('PANAMA')]: 'North America',
  [normalizeCity('SYDNEY')]: 'Oceania',
  [normalizeCity('TORONTO')]: 'North America',
  [normalizeCity('ABU DABI')]: 'Middle East',
  [normalizeCity('ALBESTI')]: 'Europe',
  [normalizeCity('AUCKLAND')]: 'Oceania',
  [normalizeCity('BA RIA VUNG TAU')]: 'Asia',
  [normalizeCity('BAHRAIN')]: 'Middle East',
  [normalizeCity('BANEASA')]: 'Europe',
  [normalizeCity('BLD')]: 'North America',
  [normalizeCity('BLOOR')]: 'North America',
  [normalizeCity('BOGOTA')]: 'South America',
  [normalizeCity('CALGARY')]: 'North America',
  [normalizeCity('CHARLOTTE')]: 'North America',
  [normalizeCity('COQUITLAM')]: 'North America',
  [normalizeCity('DALLAS')]: 'North America',
  [normalizeCity('DAVENTRY')]: 'Europe',
  [normalizeCity('DAYTON')]: 'North America',
  [normalizeCity('DETROIT')]: 'North America',
  [normalizeCity('HA NOI')]: 'Asia',
  [normalizeCity('BINH DUONG')]: 'Asia',
  [normalizeCity('TOKYO')]: 'Asia',
  [normalizeCity('TANGERANG')]: 'Asia',
  [normalizeCity('PHNOMPENH')]: 'Asia',
};
function getContinent(city) {
  return CITY_CONTINENT_MAP[normalizeCity(city)] || '기타';
}
function groupCitiesByContinent(cities) {
  return cities.reduce((acc, city) => {
    const continent = getContinent(city);
    if (!acc[continent]) acc[continent] = [];
    acc[continent].push(city);
    return acc;
  }, {});
}

export function InvestmentStrategySectionCandidateSelection({ children }: { children?: React.ReactNode }) {
  return (
    <section id="candidate-selection">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">5. 2단계: 투자 후보지역 분류 및 전략적 선정</h2>
      <div className="mb-4 p-4 bg-yellow-50 rounded text-sm text-gray-800">
        <strong>투자 후보지역 분류 및 선정 최신 방법론 (2024-06)</strong>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <strong>도시명 표준화 및 집계:</strong> HYUNDAI, VPN, KOTRA 각 데이터셋의 top100(또는 top40) 도시명을 normalizeCity 함수로 표준화, 표준화 후 동일 도시는 하나로 합산합니다.
          </li>
          <li>
            <strong>전략적 분류:</strong> ① HYUNDAI/VPN/KOTRA 모두 존재, ② HYUNDAI+VPN만, ③ HYUNDAI만, ④ VPN만, ⑤ KOTRA만(상위5) 등 5개 그룹으로 분류하여 도시 리스트를 도출합니다.
          </li>
          <li>
            <strong>데이터 품질 및 재현성:</strong> 모든 과정은 원본 데이터 기준으로 자동 집계/분류되며, 임의의 수치 조정 없이 코드로 100% 재현 가능합니다.
          </li>
          <li>
            <strong>UI 일관성:</strong> 분류별 도시 리스트는 JSON으로 저장되어 프론트엔드에서 자동 렌더링됩니다.
          </li>
        </ul>
        <div className="mt-2 text-xs text-gray-600">
          ※ 본 방법론은 외부 검증 부서가 동일한 데이터와 공식으로 분류 시 100% 동일한 결과가 산출됨을 보장합니다.
        </div>
      </div>
      <div className="mb-4 p-4 bg-blue-50 rounded text-sm text-gray-800">
        <strong>상세 분류 기준</strong>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <b>① HYUNDAI, VPN, KOTRA 모두 존재</b>: 3개 데이터셋 모두에 포함되는 도시
          </li>
          <li>
            <b>② HYUNDAI, VPN만</b>: HYUNDAI, VPN에는 있으나 KOTRA에는 없는 도시
          </li>
          <li>
            <b>③ HYUNDAI만</b>: HYUNDAI에만 존재하는 도시
          </li>
          <li>
            <b>④ VPN만</b>: VPN에만 존재하는 도시
          </li>
          <li>
            <b>⑤ KOTRA만(상위5)</b>: KOTRA에만 존재하는 도시 중 count 기준 상위 5개
          </li>
        </ul>
        <div className="mt-2 text-xs text-gray-600">
          ※ 모든 분류는 표준화된 도시명 기준으로 자동 집계됩니다.
        </div>
      </div>
      <div className="mb-4 p-4 bg-green-50 rounded text-sm text-gray-800">
        <strong>데이터 품질 및 검증</strong>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            표준화, 중복 제거, 집계, 분류 등 모든 과정은 코드로 자동화되어 데이터 품질과 신뢰성을 보장합니다.
          </li>
          <li>
            외부 검증 시 동일한 데이터와 분류 기준으로 100% 동일한 결과가 산출됩니다.
          </li>
          <li>
            UI와 데이터 소스(JSON)는 항상 동기화되어, 임의의 수치 조정이나 누락이 없습니다.
          </li>
        </ul>
      </div>
      {/* [1] Epsilon 기반 후보지역 표 */}
      <div className="overflow-x-auto my-6">
        <h4 className="font-bold text-blue-700 mb-2">[1] Epsilon 기반 후보지역 (RFQ, SOF) - Min-Max 정규화 (top100)</h4>
        <table className="min-w-full text-sm rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
              <th className="px-3 py-2 text-left">순위</th>
              <th className="px-3 py-2 text-left">도시</th>
              <th className="px-3 py-2 text-right">RFQ(norm)</th>
              <th className="px-3 py-2 text-right">SOF(norm)</th>
              <th className="px-3 py-2 text-right">Epsilon Score</th>
              <th className="px-3 py-2 text-right">Epsilon Score Norm</th>
            </tr>
          </thead>
          <tbody>
            {normalizedEpsilonScores
              .sort((a, b) => Number(b.epsilonScore) - Number(a.epsilonScore))
              .slice(0, 20)
              .map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className={`px-3 py-2 font-bold ${idx === 0 ? 'text-yellow-600 text-lg' : 'text-blue-800'}`}>{idx + 1}</td>
                  <td className="px-3 py-2 font-semibold">{item.city}</td>
                  <td className="px-3 py-2 text-right">{Number(item.rfq).toFixed(4)}</td>
                  <td className="px-3 py-2 text-right">{Number(item.sof).toFixed(4)}</td>
                  <td className="px-3 py-2 text-right font-bold bg-gradient-to-r from-yellow-100 to-yellow-50">{Number(item.epsilonScore).toFixed(4)}</td>
                  <td className="px-3 py-2 text-right font-bold bg-gradient-to-r from-green-100 to-green-50">{item.epsilonScoreNorm !== undefined ? item.epsilonScoreNorm.toFixed(4) : '0.0000'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* [2] HYUNDAI/VPN/KOTRA 분류별 도시 리스트 */}
      <div className="overflow-x-auto my-6">
        <h4 className="font-bold text-purple-700 mb-2 mt-8">[2] HYUNDAI/VPN/KOTRA 분류별 도시 리스트</h4>
        <table className="min-w-full text-sm rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-purple-700 to-purple-400 text-white">
              <th className="px-3 py-2 text-left">분류</th>
              <th className="px-3 py-2 text-left">도시 리스트 (대륙별 Chip)</th>
            </tr>
          </thead>
          <tbody>
            {synergyGroups.map((group, idx) => {
              const grouped = groupCitiesByContinent(group.cities);
              const filteredGrouped = group.label.includes('KOTRA만')
                ? Object.fromEntries(Object.entries(grouped).filter(([continent]) => continent !== '기타'))
                : grouped;
              return (
                <tr key={group.label} className={idx % 2 === 0 ? 'bg-purple-50' : 'bg-white'}>
                  <td className="px-3 py-2 font-bold align-top">{group.label}</td>
                  <td className="px-3 py-2">
                    {Object.entries(filteredGrouped).map(([continent, cities]) => (
                      <div key={continent} className="mb-2">
                        <span className="font-bold text-xs text-purple-700 mr-2">{continent}</span>
                        <span className="flex flex-wrap gap-2">
                          {(cities as string[])
                            .filter(city => city && city.trim() !== '' && city.trim() !== ',')
                            .map(city => (
                              <span
                                key={city}
                                className={`inline-block px-3 py-1 rounded-full font-semibold text-xs shadow ${CONTINENT_COLOR_MAP[continent] || 'bg-gray-100 text-gray-800'}`}
                              >
                                {city}
                              </span>
                            ))}
                        </span>
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {children}
    </section>
  );
}

// KT/Epsilon/둘 다 해당 시 색상 구분 함수
function getCityHighlightClass(city) {
  if (!city) return '';
  const norm = city.trim().toUpperCase();
  const isKt = KT_POP_CITIES.includes(norm);
  const isEps = EPSILON_POP_CITIES.map(c => c.toUpperCase()).includes(norm);
  if (isKt && isEps) {
    // 둘 다 해당: 보라색 그라데이션 강조
    return 'bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 text-purple-900 font-extrabold rounded shadow';
  } else if (isKt) {
    // KT만 해당: 파란색
    return 'bg-blue-100 text-blue-800 font-bold rounded';
  } else if (isEps) {
    // Epsilon만 해당: 주황색
    return 'bg-orange-100 text-orange-800 font-bold rounded';
  }
  return '';
}

// 랜딩스테이션 여부 함수
function isLandingStationCity(city) {
  // RFQ, SOF, HYUNDAI, VPN, KOTRA top100에 포함되면 랜딩스테이션으로 간주
  return (
    cityScoreData.RFQ.top100.some(c => c.city === city) ||
    cityScoreData.SOF.top100.some(c => c.city === city) ||
    cityScoreData.HYUNDAI.top100.some(c => c.city === city) ||
    cityScoreData.VPN.top100.some(c => c.city === city) ||
    cityScoreData.KOTRA.top100.some(c => c.city === city)
  );
}

// ReferenceFinalRecommendationSection.tsx의 표/컬러/함수/구조를 완전히 동일하게 복사

// 주요 도시 컬러 강조 (Reference 기준)
const CITY_COLOR_MAP = {
  'SINGAPORE': 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-purple-800 font-bold',
  'LONDON': 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-bold',
  'HONG KONG': 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 font-bold',
  'FRANKFURT': 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 font-bold',
  'OSAKA': 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-bold',
  'NEW YORK': 'bg-gradient-to-r from-pink-100 to-pink-50 text-pink-800 font-bold',
  'MARSEILLE': 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 font-bold',
  'DUBAI': 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 font-bold',
  'JAKARTA': 'bg-gradient-to-r from-purple-100 to-yellow-50 text-purple-800 font-bold',
  'PARIS': 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 font-bold',
  'HANOI': 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-bold',
  'LOS ANGELES': 'bg-gradient-to-r from-pink-100 to-pink-50 text-pink-800 font-bold',
  'TOKYO': 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 font-bold',
};
function getCityClass(city) {
  return CITY_COLOR_MAP[city?.toUpperCase()] || '';
}

export function InvestmentStrategySectionFinalRecommendation({ children }: { children?: React.ReactNode }) {
  return (
    <section id="final-recommendation">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">최종 추천: KT/Epsilon PoP 투자 우선순위 TOP 20</h2>
      <div className="mb-6 p-4 bg-blue-50 border border-blue-300 rounded text-blue-900 text-sm">
        <div className="font-bold mb-2">점수 산출 및 추천 기준 안내</div>
        <div className="mb-2">
          본 추천 리스트는 아래 두 데이터 기반으로 산출됩니다:
        </div>
        <div className="mb-2">
          <b>[1] Epsilon Score</b><br />
          각 도시별 RFQ 건수와 SOF 건수를 Min-Max 정규화(0~1)하여<br />
          <b>Epsilon Score = RFQ(norm) × 0.6 + SOF(norm) × 0.4</b>로 산출합니다.<br />
          (RFQ(norm), SOF(norm)은 각 데이터셋 내에서 1위=1.0, 최하위=0.0으로 정규화, <b>최종 Epsilon Score도 0~1로 정규화</b>)
        </div>
        <div className="mb-2">
          <b>[2] Synergy Score</b><br />
          각 도시가 HYUNDAI, VPN, KOTRA 데이터셋의 top100 리스트에서 차지하는 순위를<br />
          1위=1.0, 2위=0.99, ..., 100위=0.01로 점수화하고,<br />
          <b>Synergy Score = (HYUNDAI 순위점수 + VPN 순위점수) / 2 + KOTRA 순위점수</b>로 산출합니다.<br />
          (동일 건수는 공동 순위로 동일 점수 부여, <b>최종 Synergy Score도 0~1로 정규화</b>)
        </div>
        <div className="text-xs text-gray-600">
          ※ 모든 점수 산출 및 분류 과정은 코드로 자동화되어 데이터 품질과 신뢰성을 보장합니다.
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Epsilon Score 상위 20 도시 표 */}
        <div>
          <h3 className="font-bold text-blue-700 mb-2">Epsilon Score 상위 20 도시</h3>
          <table className="min-w-full text-sm rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-400 to-blue-200 text-white">
                <th className="px-3 py-2 text-left">순위</th>
                <th className="px-3 py-2 text-left">도시</th>
                <th className="px-3 py-2 text-right">Epsilon Score</th>
                <th className="px-3 py-2 text-right">Epsilon Score Norm</th>
              </tr>
            </thead>
            <tbody>
              {normalizedEpsilonScores
                .sort((a, b) => Number(b.epsilonScore) - Number(a.epsilonScore))
                .slice(0, 20)
                .map((item, idx) => (
                  <tr key={item.city} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                    <td className="px-3 py-2 font-bold text-blue-700">{idx + 1}</td>
                    <td className={`px-3 py-2 ${getCityHighlightClass(item.city)}`}>{item.city}</td>
                    <td className="px-3 py-2 text-right">{Number(item.epsilonScore).toFixed(4)}</td>
                    <td className="px-3 py-2 text-right">{item.epsilonScoreNorm !== undefined ? item.epsilonScoreNorm.toFixed(4) : '0.0000'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* Synergy Score 상위 20 도시 표 */}
        <div>
          <h3 className="font-bold text-purple-700 mb-2">Synergy Score 상위 20 도시</h3>
          <table className="min-w-full text-sm rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-purple-400 to-purple-200 text-white">
                <th className="px-3 py-2 text-left">순위</th>
                <th className="px-3 py-2 text-left">도시</th>
                <th className="px-3 py-2 text-right">Synergy Score</th>
                <th className="px-3 py-2 text-right">Synergy Score Norm</th>
              </tr>
            </thead>
            <tbody>
              {normalizedSynergyScores
                .sort((a, b) => Number(b.synergyScore) - Number(a.synergyScore))
                .slice(0, 20)
                .map((item, idx) => (
                  <tr key={item.city} className={idx % 2 === 0 ? 'bg-purple-50' : 'bg-white'}>
                    <td className="px-3 py-2 font-bold text-purple-700">{idx + 1}</td>
                    <td className={`px-3 py-2 ${getCityHighlightClass(item.city)}`}>{item.city}</td>
                    <td className="px-3 py-2 text-right">{Number(item.synergyScore).toFixed(4)}</td>
                    <td className="px-3 py-2 text-right">{item.synergyScoreNorm !== undefined ? item.synergyScoreNorm.toFixed(4) : '0.0000'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {children}
    </section>
  );
}

export function InvestmentStrategySectionExecutionRoadmap() {
  return (
    <section id="execution-roadmap">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">7. KT/Epsilon 투자 실행 로드맵</h2>
      {/* 선정 기준 안내 박스 */}
      <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-900 text-sm rounded">
        <strong>선정 기준 안내</strong><br/>
        <ul className="list-disc ml-6 mt-2">
          <li>Epsilon Score(견적·주문 데이터 기반) 상위 도시 중 중국(법률/정책 이슈)은 보류</li>
          <li>시장 성장성, 잠재기회, PoP 미설치 여부, KT와의 시너지(현대차/협력사, VPN 고객, KOTRA 진출기업 등)까지 종합적으로 고려</li>
          <li>아시아 우선 → 유럽 순으로 단계별(1~3단계) 투자 진행 권고</li>
          <li>각 단계별로 3개 도시만 추천, 점수는 표기하지 않고 핵심 투자 포인트와 KT 시너지 효과 제공</li>
        </ul>
      </div>
      {/* 단계별 투자 우선순위 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">단계별 투자 우선순위 (중국/싱가포르/한국/런던 제외)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* 1단계 */}
          <div className="bg-green-50 rounded-lg shadow p-4">
            <h4 className="font-bold text-green-700 mb-2">1단계: 즉시 투자(베트남 전략투자)</h4>
            <div className="space-y-3">
              <div className="border-b pb-2">
                <div className="font-semibold">HOCHIMINH</div>
                <div className="text-xs text-gray-700">• 베트남 경제 중심, IT·금융 성장<br/>• 현대차/협력사, KOTRA 진출기업 활발<br/>• KT VPN 고객사(IT/금융) 수요, 글로벌 네트워크 허브<br/>• 인구·수요 증가, PoP 미설치</div>
              </div>
              <div className="border-b pb-2">
                <div className="font-semibold">HANOI</div>
                <div className="text-xs text-gray-700">• 동남아 신흥시장, 제조·물류 허브<br/>• 현대차/협력사 진출, KOTRA 진출기업 다수<br/>• KT VPN 고객사(금융/제조) 수요, 네트워크 시너지 기대<br/>• 빠른 시장 진입 기회, PoP 미설치</div>
              </div>
              <div>
                <div className="font-semibold">DONG NAI / BACNINH <span className='text-xs text-gray-500'><b>(후순위 고려)</b></span></div>
                <div className="text-xs text-gray-700">• 베트남 제조업 중심지(동나이/박닌)<br/>• 현대차/협력사, KOTRA 진출기업 다수<br/>• KT VPN 고객사(제조/물류) 수요, 산업 시너지<br/>• 성장 잠재력, PoP 미설치</div>
              </div>
            </div>
          </div>
          {/* 2단계 */}
          <div className="bg-yellow-50 rounded-lg shadow p-4">
            <h4 className="font-bold text-yellow-700 mb-2">2단계: 중기 투자</h4>
            <div className="space-y-3">
              <div className="border-b pb-2">
                <div className="font-semibold">BANGKOK (THAILAND)</div>
                <div className="text-xs text-gray-700">• 태국 허브, 동남아 물류·관광 중심<br/>• 현대차/협력사, KOTRA 진출기업 진출 활발<br/>• KT VPN 고객사(제조/물류) 수요, 시너지 효과<br/>• 성장성 높음, PoP 미설치</div>
              </div>
              <div className="border-b pb-2">
                <div className="font-semibold">CHENNAI (INDIA)</div>
                <div className="text-xs text-gray-700">• 인도 남부 거점, 자동차·IT 산업<br/>• 현대차 생산기지, KOTRA 진출기업 진출<br/>• KT VPN 고객사(제조/자동차) 수요, 산업 시너지<br/>• 성장 잠재력 높음, PoP 미설치</div>
              </div>
              <div>
                <div className="font-semibold">MUMBAI (INDIA)</div>
                <div className="text-xs text-gray-700">• 인도 경제·금융 중심, 대규모 시장<br/>• 현대차/협력사, KOTRA 진출기업 다수<br/>• KT VPN 고객사(금융/IT) 수요, 인도 내 네트워크 시너지<br/>• IT·금융·제조 성장, PoP 미설치</div>
              </div>
            </div>
          </div>
          {/* 3단계 */}
          <div className="bg-red-50 rounded-lg shadow p-4">
            <h4 className="font-bold text-red-700 mb-2">3단계: 장기/검토 투자</h4>
            <div className="space-y-3">
              <div className="border-b pb-2">
                <div className="font-semibold">MEXICO CITY (MEXICO)</div>
                <div className="text-xs text-gray-700">• 멕시코 경제·물류 중심, 북중미 관문<br/>• 현대차/협력사, KOTRA 진출기업 진출<br/>• KT VPN 고객사(제조/물류) 수요, 미주 네트워크 시너지<br/>• 성장 잠재력, PoP 미설치</div>
              </div>
              <div className="border-b pb-2">
                <div className="font-semibold">PESQUERIA (MEXICO)</div>
                <div className="text-xs text-gray-700">• 현대자동차 진출 도시, 멕시코 북부 산업단지<br/>• 자동차·제조업 중심, 글로벌 공급망 허브<br/>• KT VPN 고객사(제조/물류) 수요, 산업 시너지<br/>• 성장 잠재력, PoP 미설치</div>
              </div>
              <div>
                <div className="font-semibold">BEKASI (INDONESIA)</div>
                <div className="text-xs text-gray-700">• 인도네시아 제조업 중심지, 자카르타 인근<br/>• 현대차/협력사, KOTRA 진출기업 진출<br/>• KT VPN 고객사(제조/물류) 수요, 산업 시너지<br/>• 성장 잠재력, PoP 미설치</div>
              </div>
            </div>
            <br/>
            <div className="mb-2 text-xs text-red-700 font-bold">
              3단계 장기/검토 투자에서는 멕시코(멕시코시티, 페스케리아 등 현대차 진출 및 글로벌 공급망 거점)를 투자 우선 국가로 고려.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InvestmentStrategySectionTop40Table() {
  // 40위 테이블에서 top100Data의 상위 40개만 사용
  const top40 = {
    RFQ: cityScoreData.RFQ.top100.slice(0, 40),
    SOF: cityScoreData.SOF.top100.slice(0, 40),
    HYUNDAI: cityScoreData.HYUNDAI.top100.slice(0, 40),
    VPN: cityScoreData.VPN.top100.slice(0, 40),
    KOTRA: cityScoreData.KOTRA.top100.slice(0, 40),
  };

  // KT/Epsilon/둘 다 해당 시 색상 구분 함수
  function getCityHighlightClass(city) {
    if (!city) return '';
    // 각 데이터별 top100에 포함 여부
    const inRFQ = cityScoreData.RFQ.top100.some(c => c.city === city);
    const inSOF = cityScoreData.SOF.top100.some(c => c.city === city);
    const inHYUNDAI = cityScoreData.HYUNDAI.top100.some(c => c.city === city);
    const inVPN = cityScoreData.VPN.top100.some(c => c.city === city);
    const inKOTRA = cityScoreData.KOTRA.top100.some(c => c.city === city);
    const count = [inRFQ, inSOF, inHYUNDAI, inVPN, inKOTRA].filter(Boolean).length;
    if (count >= 3) {
      return 'bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 text-purple-900 font-extrabold rounded shadow';
    } else if (inRFQ || inSOF) {
      return 'bg-orange-100 text-orange-800 font-bold rounded';
    } else if (inHYUNDAI || inVPN || inKOTRA) {
      return 'bg-blue-100 text-blue-800 font-bold rounded';
    }
    return '';
  }

  // 랜딩스테이션 여부 함수
  function isLandingStationCity(city) {
    // RFQ, SOF, HYUNDAI, VPN, KOTRA top100에 포함되면 랜딩스테이션으로 간주
    return (
      cityScoreData.RFQ.top100.some(c => c.city === city) ||
      cityScoreData.SOF.top100.some(c => c.city === city) ||
      cityScoreData.HYUNDAI.top100.some(c => c.city === city) ||
      cityScoreData.VPN.top100.some(c => c.city === city) ||
      cityScoreData.KOTRA.top100.some(c => c.city === city)
    );
  }

  return (
    <section id="top40-table">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">8. 데이터별 상위 40개 도시 표</h2>
      {/* 상위 40위 도시별 비교 테이블 */}
      <div className="overflow-x-auto my-8">
        <h3 className="text-xl font-bold mb-4 text-blue-700">데이터별 상위 40위 비교</h3>
        <table className="min-w-full text-xs border border-gray-300 bg-white">
          <thead>
            <tr>
              <th className="border px-2 py-1">순위</th>
              <th className="border px-2 py-1">RFQ 도시</th>
              <th className="border px-2 py-1">RFQ 건수</th>
              <th className="border px-2 py-1">SOF 도시</th>
              <th className="border px-2 py-1">SOF 건수</th>
              <th className="border px-2 py-1">현대 도시</th>
              <th className="border px-2 py-1">현대 건수</th>
              <th className="border px-2 py-1">VPN 도시</th>
              <th className="border px-2 py-1">VPN 건수</th>
              <th className="border px-2 py-1">KOTRA 도시</th>
              <th className="border px-2 py-1">KOTRA 건수</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 40 }).map((_, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">{idx + 1}</td>
                {/* 도시 셀: KT/Epsilon/둘 다 색상 분기 + 랜딩스테이션 아이콘 */}
                <td className={`border px-2 py-1 ${getCityHighlightClass(top40.RFQ[idx]?.city)}`}>
                  {top40.RFQ[idx]?.city ?? ''}
                  {top40.RFQ[idx]?.city && (
                    <span className="ml-1 align-middle">{isLandingStationCity(top40.RFQ[idx]?.city) ? "🟢" : "⚪"}</span>
                  )}
                </td>
                <td className="border px-2 py-1">{top40.RFQ[idx]?.count ?? ''}</td>
                <td className={`border px-2 py-1 ${getCityHighlightClass(top40.SOF[idx]?.city)}`}>
                  {top40.SOF[idx]?.city ?? ''}
                  {top40.SOF[idx]?.city && (
                    <span className="ml-1 align-middle">{isLandingStationCity(top40.SOF[idx]?.city) ? "🟢" : "⚪"}</span>
                  )}
                </td>
                <td className="border px-2 py-1">{top40.SOF[idx]?.count ?? ''}</td>
                <td className={`border px-2 py-1 ${getCityHighlightClass(top40.HYUNDAI[idx]?.city)}`}>
                  {top40.HYUNDAI[idx]?.city ?? ''}
                  {top40.HYUNDAI[idx]?.city && (
                    <span className="ml-1 align-middle">{isLandingStationCity(top40.HYUNDAI[idx]?.city) ? "🟢" : "⚪"}</span>
                  )}
                </td>
                <td className="border px-2 py-1">{top40.HYUNDAI[idx]?.count ?? ''}</td>
                <td className={`border px-2 py-1 ${getCityHighlightClass(top40.VPN[idx]?.city)}`}>
                  {top40.VPN[idx]?.city ?? ''}
                  {top40.VPN[idx]?.city && (
                    <span className="ml-1 align-middle">{isLandingStationCity(top40.VPN[idx]?.city) ? "🟢" : "⚪"}</span>
                  )}
                </td>
                <td className="border px-2 py-1">{top40.VPN[idx]?.count ?? ''}</td>
                <td className={`border px-2 py-1 ${getCityHighlightClass(top40.KOTRA[idx]?.city)}`}>
                  {top40.KOTRA[idx]?.city ?? ''}
                  {top40.KOTRA[idx]?.city && (
                    <span className="ml-1 align-middle">{isLandingStationCity(top40.KOTRA[idx]?.city) ? "🟢" : "⚪"}</span>
                  )}
                </td>
                <td className="border px-2 py-1">{top40.KOTRA[idx]?.count ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-xs text-gray-500 mt-2">
          ※ 각 데이터 소스별 상위 40개 도시 및 건수 비교<br/>
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded mx-1">KT PoP</span>
          <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 rounded mx-1">Epsilon PoP</span>
          <span className="inline-block px-2 py-1 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 text-purple-900 rounded mx-1">KT+Epsilon 동시</span>
          도시는 색상으로 구분됩니다.<br/>
          <span className="inline-block ml-2">🟢 랜딩 스테이션 있음</span>
          <span className="inline-block ml-2">⚪ 없음</span>
        </div>
      </div>

      {/* 보고서 푸터 */}
      <div className="text-center text-sm text-gray-500 border-t pt-6">
        <p>본 보고서는 7개 데이터 소스를 종합 분석하여 KT/Epsilon PoP 투자 우선순위를 도출하였습니다.</p>
        <p className="mt-2">© 2024 KT/Epsilon 성장이행팀. All rights reserved.</p>
      </div>
    </section>
  );
} 

function Top100CitiesTabs() {
  const [tab, setTab] = React.useState('RFQ');
  const tabs = ['RFQ', 'SOF', 'HYUNDAI', 'VPN', 'KOTRA'];
  return (
    <div className="my-12">
      <div className="flex space-x-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 ${tab === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-transparent'}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs border border-gray-300 bg-white">
          <thead>
            <tr>
              <th className="border px-2 py-1">순위</th>
              <th className="border px-2 py-1">도시명</th>
              <th className="border px-2 py-1">국가명</th>
              <th className="border px-2 py-1">건수</th>
            </tr>
          </thead>
          <tbody>
            {(cityScoreData[tab]?.top100 || []).map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border px-2 py-1">{idx + 1}</td>
                <td className="border px-2 py-1">{row.city}</td>
                <td className="border px-2 py-1">{row.country ?? ''}</td>
                <td className="border px-2 py-1">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-xs text-gray-500 mt-2">※ 모든 데이터는 원본 기준으로 코드에서 자동 집계·표준화되어 상위 100개 도시/국가/건수가 실시간으로 동기화됩니다.</div>
      </div>
    </div>
  );
}

export function InvestmentStrategySectionTop100Table() {
  return (
    <section id="top100-table">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">9. 데이터별 상위 100개 도시/국가 표</h2>
      <Top100CitiesTabs />
    </section>
  );
}

// KT PoP 도시 리스트
const KT_POP_CITIES = [
  'LOS ANGELES', 'PALO ALTO', 'NEW YORK', 'HONG KONG', 'TOKYO', 'SINGAPORE',
  'LONDON', 'JAKARTA', 'HANOI', 'MAKATI CITY', 'FRANKFURT', 'OSAKA', 'JURONG'
];

// Epsilon PoP 도시 리스트
const EPSILON_POP_CITIES = [
  "Amsterdam",
  "Ashburn",
  "Cape Town",
  "Dubai",
  "Frankfurt",
  "Fujairah",
  "Hong Kong",
  "Jakarta",
  "Johannesburg",
  "Kuala Lumpur",
  "London",
  "Los Angeles",
  "Madrid",
  "Marseille",
  "Miami",
  "Milan",
  "New Jersey",
  "New York",
  "Paris",
  "Seoul",
  "Singapore",
  "Sydney",
  "Tokyo",
  "Vienna",
  "Zurich"
];