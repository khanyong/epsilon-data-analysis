import React from 'react';
import { ChartPanel } from '../../components/ChartPanel';

export function BusinessFeasibilitySectionOverview() {
  return (
    <section id="overview">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">�� 프로젝트 개요</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-700">프로젝트 목표</h4>
            <p className="text-sm text-gray-600">인도 주요 도시에 네트워크 PoP 구축을 통한 글로벌 네트워크 인프라 확장</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-700">대상 지역</h4>
            <p className="text-sm text-gray-600">뭄바이 (Maharashtra), 첸나이 (Tamil Nadu)</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-700">사업 기간</h4>
            <p className="text-sm text-gray-600">2024년 1월 ~ 2028년 12월 (5년)</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800">핵심 가치 제안</h4>
            <ul className="text-sm text-blue-600 space-y-1 mt-2">
              <li>• 인도 시장 진출 한국 기업 대상 네트워크 서비스</li>
              <li>• 글로벌 클라우드 서비스 제공업체 연동</li>
              <li>• 로컬 ISP 및 데이터센터 파트너십</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionMumbai() {
  const mumbaiChartData = [
    { name: '인구(만명)', value: 2100 },
    { name: 'GDP($B)', value: 310 },
    { name: '데이터센터(개)', value: 50 },
    { name: '한국기업(개)', value: 200 },
  ];
  const barColors = ['#2563eb', '#22c55e', '#f59e42', '#a21caf'];
  const handleBarClick = (entry: any) => {
    alert(`뭄바이 한국기업 수: ${entry.value}개`);
  };
  return (
    <section id="mumbai">
      <h3 className="text-xl font-bold mb-4 text-gray-800">🏙️ 뭄바이 시장 분석</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-700">시장 규모</h4>
            <p className="text-sm text-gray-600">인구: <span className="font-semibold">2,100만명</span> (메트로폴리탄)</p>
            <div className="text-xs text-green-600 font-medium">GDP: <span className="font-semibold">$310B</span> (인도 전체의 11%)</div>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-700">IT 산업 현황</h4>
            <p className="text-sm text-gray-600">인도 IT 산업의 40% 집중, 글로벌 기업 R&D 센터 다수</p>
            <div className="text-xs text-blue-600 font-medium">데이터센터: <span className="font-semibold">50+ 개</span> 운영중</div>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-700">한국 기업 현황</h4>
            <p className="text-sm text-gray-600">삼성, LG, 현대차 등 <span className="font-semibold">200+ 한국 기업</span> 진출</p>
            <div className="text-xs text-purple-600 font-medium">예상 타겟: 150개 기업</div>
          </div>
        </div>
        <div className="flex justify-center">
          <ChartPanel
            data={mumbaiChartData}
            xKey="name"
            yKey="value"
            barColors={barColors}
            highlightKey="한국기업(개)"
            onBarClick={handleBarClick}
          />
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionChennai() {
  const chennaiChartData = [
    { name: '인구(만명)', value: 1100 },
    { name: 'GDP($B)', value: 78 },
    { name: '데이터센터(개)', value: 25 },
    { name: '한국기업(개)', value: 80 },
  ];
  const barColors = ['#2563eb', '#22c55e', '#f59e42', '#a21caf'];
  const handleBarClick = (entry: any) => {
    alert(`첸나이 한국기업 수: ${entry.value}개`);
  };
  return (
    <section id="chennai">
      <h3 className="text-xl font-bold mb-4 text-gray-800">🏙️ 첸나이 시장 분석</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-700">시장 규모</h4>
            <p className="text-sm text-gray-600">인구: <span className="font-semibold">1,100만명</span> (메트로폴리탄)</p>
            <div className="text-xs text-green-600 font-medium">GDP: <span className="font-semibold">$78B</span> (타밀나두 주의 40%)</div>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-700">IT 산업 현황</h4>
            <p className="text-sm text-gray-600">인도 IT 산업의 15% 집중, 자동차 제조업 중심</p>
            <div className="text-xs text-blue-600 font-medium">데이터센터: <span className="font-semibold">25+ 개</span> 운영중</div>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-gray-700">한국 기업 현황</h4>
            <p className="text-sm text-gray-600">현대차, 기아차, 삼성 등 80+ 한국 기업 진출</p>
            <div className="text-xs text-purple-600 font-medium">예상 타겟: 60개 기업</div>
          </div>
        </div>
        <div className="flex justify-center">
          <ChartPanel
            data={chennaiChartData}
            xKey="name"
            yKey="value"
            barColors={barColors}
            highlightKey="한국기업(개)"
            onBarClick={handleBarClick}
          />
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionAms() {
  return (
    <section id="ams">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 Addressable Market Size (AMS) 분석</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="text-sm opacity-90">총 시장 규모 (TAM)</div>
          <div className="text-3xl font-bold">$2.8B</div>
          <div className="text-xs opacity-75">인도 네트워크 서비스 시장</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="text-sm opacity-90">서비스 가능 시장 (SAM)</div>
          <div className="text-3xl font-bold">$420M</div>
          <div className="text-xs opacity-75">뭄바이·첸나이 지역</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <div className="text-sm opacity-90">획득 가능 시장 (SOM)</div>
          <div className="text-3xl font-bold">$42M</div>
          <div className="text-xs opacity-75">5년간 목표 시장 점유율 10%</div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-3">시장 점유율 가정</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600"><strong>뭄바이:</strong> 210개 한국 기업 중 150개 타겟 (71%)</p>
            <p className="text-gray-600"><strong>첸나이:</strong> 80개 한국 기업 중 60개 타겟 (75%)</p>
          </div>
          <div>
            <p className="text-gray-600"><strong>평균 ARPU:</strong> $15,000/년/기업</p>
            <p className="text-gray-600"><strong>시장 성장률:</strong> 연 12% (CAGR)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionInvestment() {
  return (
    <section id="investment">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">💰 투자 비용 분석 (CAPEX + OPEX)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800">초기 투자 비용 (CAPEX)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span className="text-sm text-gray-700">네트워크 장비 (라우터, 스위치)</span>
              <span className="font-semibold">$800K</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span className="text-sm text-gray-700">서버 및 스토리지</span>
              <span className="font-semibold">$400K</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
              <span className="text-sm text-gray-700">IDC 상면 및 설치비</span>
              <span className="font-semibold">$300K</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
              <span className="text-sm text-gray-700">소프트웨어 라이선스</span>
              <span className="font-semibold">$200K</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded border-t-2 border-gray-300">
              <span className="text-sm font-semibold text-gray-700">총 CAPEX</span>
              <span className="font-bold text-lg">$1.7M</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800">연간 운영 비용 (OPEX)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span className="text-sm text-gray-700">IP Transit 회선료</span>
              <span className="font-semibold">$240K</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span className="text-sm text-gray-700">IDC 상면 및 전력비</span>
              <span className="font-semibold">$180K</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
              <span className="text-sm text-gray-700">장비 유지보수 (MA)</span>
              <span className="font-semibold">$120K</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
              <span className="text-sm text-gray-700">인건비 (3명)</span>
              <span className="font-semibold">$150K</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded border-t-2 border-gray-300">
              <span className="text-sm font-semibold text-gray-700">총 연간 OPEX</span>
              <span className="font-bold text-lg">$690K</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionRevenue() {
  return (
    <section id="revenue">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📈 5년 매출 추정</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left font-semibold">연도</th>
              <th className="p-3 text-center font-semibold">고객 수</th>
              <th className="p-3 text-center font-semibold">ARPU ($)</th>
              <th className="p-3 text-center font-semibold">매출 ($)</th>
              <th className="p-3 text-center font-semibold">성장률</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 font-medium">2024</td>
              <td className="p-3 text-center">50</td>
              <td className="p-3 text-center">15,000</td>
              <td className="p-3 text-center font-semibold">750,000</td>
              <td className="p-3 text-center text-green-600">-</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium">2025</td>
              <td className="p-3 text-center">85</td>
              <td className="p-3 text-center">15,600</td>
              <td className="p-3 text-center font-semibold">1,326,000</td>
              <td className="p-3 text-center text-green-600">+77%</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium">2026</td>
              <td className="p-3 text-center">120</td>
              <td className="p-3 text-center">16,200</td>
              <td className="p-3 text-center font-semibold">1,944,000</td>
              <td className="p-3 text-center text-green-600">+47%</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium">2027</td>
              <td className="p-3 text-center">150</td>
              <td className="p-3 text-center">16,800</td>
              <td className="p-3 text-center font-semibold">2,520,000</td>
              <td className="p-3 text-center text-green-600">+30%</td>
            </tr>
            <tr className="border-b bg-blue-50">
              <td className="p-3 font-medium">2028</td>
              <td className="p-3 text-center">180</td>
              <td className="p-3 text-center">17,400</td>
              <td className="p-3 text-center font-semibold">3,132,000</td>
              <td className="p-3 text-center text-green-600">+24%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">매출 추정 가정</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>고객 확보:</strong> 뭄바이 150개, 첸나이 60개 (총 210개) 중 180개 목표</li>
          <li>• <strong>ARPU 증가:</strong> 연 4% 성장 (서비스 품질 향상 및 인플레이션 반영)</li>
          <li>• <strong>고객 이탈률:</strong> 연 5% (우수한 서비스 품질로 낮은 이탈률 유지)</li>
        </ul>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionDcf() {
  return (
    <section id="dcf">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 DCF 분석 기반 NPV/IRR 분석</h2>
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">할인율 (WACC) 구성</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">무위험 이자율 (Rf)</div>
            <div className="text-xl font-bold text-blue-600">6.5%</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">시장 위험 프리미엄 (Rm-Rf)</div>
            <div className="text-xl font-bold text-green-600">8.0%</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">베타 (β)</div>
            <div className="text-xl font-bold text-orange-600">1.2</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">국가 리스크 프리미엄 (CRP)</div>
            <div className="text-xl font-bold text-purple-600">3.5%</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
            <div className="text-sm text-gray-600">WACC</div>
            <div className="text-xl font-bold text-red-600">18.0%</div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">연도별 현금흐름 분석 (DCF 모델)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left font-semibold border-b">항목</th>
                <th className="p-3 text-center font-semibold border-b">2024</th>
                <th className="p-3 text-center font-semibold border-b">2025</th>
                <th className="p-3 text-center font-semibold border-b">2026</th>
                <th className="p-3 text-center font-semibold border-b">2027</th>
                <th className="p-3 text-center font-semibold border-b">2028</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium bg-blue-50">매출 (Revenue)</td>
                <td className="p-3 text-center">750,000</td>
                <td className="p-3 text-center">1,326,000</td>
                <td className="p-3 text-center">1,944,000</td>
                <td className="p-3 text-center">2,520,000</td>
                <td className="p-3 text-center">3,132,000</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-green-50">영업비용 (OPEX)</td>
                <td className="p-3 text-center">690,000</td>
                <td className="p-3 text-center">690,000</td>
                <td className="p-3 text-center">690,000</td>
                <td className="p-3 text-center">690,000</td>
                <td className="p-3 text-center">690,000</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-orange-50">EBIT (세전이익)</td>
                <td className="p-3 text-center">60,000</td>
                <td className="p-3 text-center">636,000</td>
                <td className="p-3 text-center">1,254,000</td>
                <td className="p-3 text-center">1,830,000</td>
                <td className="p-3 text-center">2,442,000</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-purple-50">세금 (25%)</td>
                <td className="p-3 text-center">15,000</td>
                <td className="p-3 text-center">159,000</td>
                <td className="p-3 text-center">313,500</td>
                <td className="p-3 text-center">457,500</td>
                <td className="p-3 text-center">610,500</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-yellow-50">세후이익</td>
                <td className="p-3 text-center">45,000</td>
                <td className="p-3 text-center">477,000</td>
                <td className="p-3 text-center">940,500</td>
                <td className="p-3 text-center">1,372,500</td>
                <td className="p-3 text-center">1,831,500</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-indigo-50">감가상각비 (D&A)</td>
                <td className="p-3 text-center">340,000</td>
                <td className="p-3 text-center">340,000</td>
                <td className="p-3 text-center">340,000</td>
                <td className="p-3 text-center">340,000</td>
                <td className="p-3 text-center">340,000</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-pink-50">자본적지출 (CAPEX)</td>
                <td className="p-3 text-center">-1,700,000</td>
                <td className="p-3 text-center">0</td>
                <td className="p-3 text-center">0</td>
                <td className="p-3 text-center">0</td>
                <td className="p-3 text-center">0</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-teal-50">운전자본 변동</td>
                <td className="p-3 text-center">-75,000</td>
                <td className="p-3 text-center">-57,600</td>
                <td className="p-3 text-center">-61,800</td>
                <td className="p-3 text-center">-57,600</td>
                <td className="p-3 text-center">-61,200</td>
              </tr>
              <tr className="border-b bg-gray-100">
                <td className="p-3 font-bold">자유현금흐름 (FCF)</td>
                <td className="p-3 text-center font-bold text-red-600">-1,390,000</td>
                <td className="p-3 text-center font-bold text-green-600">759,400</td>
                <td className="p-3 text-center font-bold text-green-600">1,218,700</td>
                <td className="p-3 text-center font-bold text-green-600">1,654,900</td>
                <td className="p-3 text-center font-bold text-green-600">2,110,300</td>
              </tr>
              <tr className="border-b bg-blue-100">
                <td className="p-3 font-bold">할인계수 (18%)</td>
                <td className="p-3 text-center">1.000</td>
                <td className="p-3 text-center">0.847</td>
                <td className="p-3 text-center">0.718</td>
                <td className="p-3 text-center">0.609</td>
                <td className="p-3 text-center">0.516</td>
              </tr>
              <tr className="border-b bg-green-100">
                <td className="p-3 font-bold">할인된 현금흐름</td>
                <td className="p-3 text-center font-bold text-red-600">-1,390,000</td>
                <td className="p-3 text-center font-bold text-green-600">643,211</td>
                <td className="p-3 text-center font-bold text-green-600">875,027</td>
                <td className="p-3 text-center font-bold text-green-600">1,007,834</td>
                <td className="p-3 text-center font-bold text-green-600">1,088,915</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800">영구가치 (Terminal Value) 계산</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span className="text-sm text-gray-700">2028년 FCF</span>
              <span className="font-semibold">$2,110,300</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span className="text-sm text-gray-700">영구성장률 (3%)</span>
              <span className="font-semibold">3.0%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
              <span className="text-sm text-gray-700">할인율 (18%)</span>
              <span className="font-semibold">18.0%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded border-t-2 border-gray-300">
              <span className="text-sm font-semibold text-gray-700">영구가치</span>
              <span className="font-bold text-lg">$14,068,667</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded border-t-2 border-gray-300">
              <span className="text-sm font-semibold text-gray-700">할인된 영구가치</span>
              <span className="font-bold text-lg">$7,259,432</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800">기업가치 평가</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span className="text-sm text-gray-700">할인된 FCF 합계</span>
              <span className="font-semibold">$1,224,983</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span className="text-sm text-gray-700">할인된 영구가치</span>
              <span className="font-semibold">$7,259,432</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded border-t-2 border-gray-300">
              <span className="text-sm font-semibold text-gray-700">기업가치 (EV)</span>
              <span className="font-bold text-lg">$8,484,415</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
              <span className="text-sm text-gray-700">현금</span>
              <span className="font-semibold">$0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
              <span className="text-sm text-gray-700">부채</span>
              <span className="font-semibold">$0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded border-t-2 border-gray-300">
              <span className="text-sm font-semibold text-gray-700">주주가치</span>
              <span className="font-bold text-lg">$8,484,415</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4 text-gray-800">투자 평가 지표</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
            <div className="text-sm opacity-90">NPV (Net Present Value)</div>
            <div className="text-3xl font-bold">$6.8M</div>
            <div className="text-xs opacity-75">양수 = 투자 가치 있음</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
            <div className="text-sm opacity-90">IRR (Internal Rate of Return)</div>
            <div className="text-3xl font-bold">32.5%</div>
            <div className="text-xs opacity-75">WACC(18%) 대비 우수</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
            <div className="text-sm opacity-90">투자 회수 기간</div>
            <div className="text-3xl font-bold">3.2년</div>
            <div className="text-xs opacity-75">일반적인 기준(5년) 대비 우수</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
            <div className="text-sm opacity-90">수익성 지수 (PI)</div>
            <div className="text-3xl font-bold">4.0x</div>
            <div className="text-xs opacity-75">1.0 초과 = 수익성 우수</div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-3">DCF 분석 가정</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600"><strong>영구성장률:</strong> 3.0% (인도 경제 성장률 반영)</p>
              <p className="text-gray-600"><strong>세율:</strong> 25% (인도 법인세율)</p>
              <p className="text-gray-600"><strong>감가상각:</strong> 20년 직선법 (네트워크 장비 기준)</p>
            </div>
            <div>
              <p className="text-gray-600"><strong>운전자본:</strong> 매출의 10% (업계 평균)</p>
              <p className="text-gray-600"><strong>CAPEX:</strong> 초기 투자 후 유지보수 수준</p>
              <p className="text-gray-600"><strong>할인율:</strong> WACC 18% (국가 리스크 포함)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionMarketing() {
  return (
    <section id="marketing">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🎯 타겟 마케팅 전략</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800">1차 타겟: 진출 한국 기업</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">뭄바이 지역 (150개 기업)</h4>
              <ul className="text-sm text-blue-600 space-y-1 mt-2">
                <li>• 삼성전자, LG전자 (R&D 센터)</li>
                <li>• 현대차, 기아차 (판매법인)</li>
                <li>• SK하이닉스, 포스코 (현지법인)</li>
                <li>• 중소기업 100+ 개</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">첸나이 지역 (60개 기업)</h4>
              <ul className="text-sm text-green-600 space-y-1 mt-2">
                <li>• 현대차, 기아차 (생산공장)</li>
                <li>• 삼성전자 (제조공장)</li>
                <li>• 자동차 부품업체 30+ 개</li>
                <li>• IT 서비스업체 20+ 개</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800">2차 타겟: 로컬 파트너</h3>
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800">데이터센터 파트너</h4>
              <ul className="text-sm text-orange-600 space-y-1 mt-2">
                <li>• CtrlS Datacenters</li>
                <li>• Sify Technologies</li>
                <li>• Netmagic Solutions</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">ISP 파트너</h4>
              <ul className="text-sm text-purple-600 space-y-1 mt-2">
                <li>• BSNL (국영통신사)</li>
                <li>• Reliance Jio</li>
                <li>• Airtel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-3">마케팅 접근 전략</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">1. 직접 영업</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• 한국상공회의소 연계</li>
              <li>• 현지 한국기업협회 활용</li>
              <li>• 1:1 고객 미팅</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">2. 파트너십</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• 로컬 데이터센터 제휴</li>
              <li>• ISP 공동 마케팅</li>
              <li>• 시스템 통합업체 협력</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">3. 디지털 마케팅</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• LinkedIn 타겟 광고</li>
              <li>• 업계 컨퍼런스 참가</li>
              <li>• 기술 블로그 운영</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionRisk() {
  return (
    <section id="risk">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">⚠️ 리스크 분석 및 대응 방안</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800">주요 리스크 요인</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-gray-700">정치/규제 리스크</h4>
              <p className="text-sm text-gray-600">통신 라이선스 발급 지연, 외국인 투자 제한</p>
              <div className="text-xs text-red-600 font-medium">대응: 현지 법무법인 사전 자문</div>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-700">경쟁 리스크</h4>
              <p className="text-sm text-gray-600">기존 ISP 업체들의 가격 경쟁</p>
              <div className="text-xs text-orange-600 font-medium">대응: 차별화된 서비스 품질</div>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-gray-700">환율 리스크</h4>
              <p className="text-sm text-gray-600">인도 루피 대비 달러 환율 변동</p>
              <div className="text-xs text-yellow-600 font-medium">대응: 환율 헤징 상품 활용</div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800">리스크 완화 전략</h3>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">다각화 전략</h4>
              <ul className="text-sm text-green-600 space-y-1 mt-2">
                <li>• 다중 고객 세그먼트 확보</li>
                <li>• 다양한 서비스 포트폴리오</li>
                <li>• 지역별 리스크 분산</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">파트너십 전략</h4>
              <ul className="text-sm text-blue-600 space-y-1 mt-2">
                <li>• 로컬 파트너와의 전략적 제휴</li>
                <li>• 정부 기관과의 협력 관계</li>
                <li>• 업계 협회 참여</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionConclusion() {
  return (
    <section id="conclusion">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">✅ 결론 및 권고사항</h2>
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">투자 권고: GO</h3>
          <p className="opacity-90">NPV $2.8M (양수), IRR 32.5% (WACC 18% 대비 우수)로 경제적 타당성 확보</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">단기 실행 계획 (6개월)</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• 현지 법무법인 선정</li>
              <li>• 통신 라이선스 신청</li>
              <li>• 데이터센터 사이트 선정</li>
              <li>• 핵심 인력 채용</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">중기 실행 계획 (1년)</h4>
            <ul className="text-sm text-green-600 space-y-1">
              <li>• 네트워크 인프라 구축</li>
              <li>• 파트너십 체결</li>
              <li>• 베타 고객 확보</li>
              <li>• 서비스 런칭</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">장기 실행 계획 (3년)</h4>
            <ul className="text-sm text-orange-600 space-y-1">
              <li>• 시장 점유율 10% 달성</li>
              <li>• 추가 지역 확장 검토</li>
              <li>• 서비스 포트폴리오 확대</li>
              <li>• 수익성 개선</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionAppendix() {
  return (
    <section id="appendix">
      <h2 className="text-lg font-bold mb-4 text-gray-800">📋 부록</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">데이터 소스</h4>
          <ul className="text-gray-600 space-y-1">
            <li>• 인도 통계청 (Census of India)</li>
            <li>• 한국무역협회 (KOTRA) 인도 진출기업 현황</li>
            <li>• TeleGeography (네트워크 인프라)</li>
            <li>• IDC, Gartner (시장 조사)</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">분석 방법론</h4>
          <ul className="text-gray-600 space-y-1">
            <li>• DCF (Discounted Cash Flow) 분석</li>
            <li>• 시장 규모 추정 (TAM/SAM/SOM)</li>
            <li>• 경쟁사 벤치마킹</li>
            <li>• 시나리오 분석</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
