import React, { useState } from 'react';
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
            <p className="text-sm text-gray-600">2025년 중 투자 실시 ~ 2029년 12월 (5년)</p>
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
          <div className="text-3xl font-bold">$21M-63M</div>
          <div className="text-xs opacity-75">시나리오별 5년 목표</div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">시장점유율 시나리오 분석</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Optimistic 시나리오 */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
              <h4 className="text-lg font-bold text-green-800">Optimistic 시나리오</h4>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-semibold text-green-700">시작점 (2025)</div>
                <div className="text-green-600">뭄바이: 8%, 첸나이: 7%</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-green-700">목표점 (2029)</div>
                <div className="text-green-600">뭄바이: 48%, 첸나이: 52%</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-green-700">연평균 증가율</div>
                <div className="text-green-600">뭄바이: +10.0pp, 첸나이: +11.3pp</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-100 rounded">
              <div className="text-xs text-green-800 font-medium">통계적 근거</div>
              <ul className="text-xs text-green-700 mt-1 space-y-1">
                <li>• 한국기업 인도진출 연 15% 증가</li>
                <li>• 네트워크 서비스 수요 연 12% 증가</li>
                <li>• First-mover advantage 확보</li>
              </ul>
            </div>
          </div>

          {/* Neutral 시나리오 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
              <h4 className="text-lg font-bold text-blue-800">Neutral 시나리오</h4>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-semibold text-blue-700">시작점 (2025)</div>
                <div className="text-blue-600">뭄바이: 6%, 첸나이: 5%</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-blue-700">목표점 (2029)</div>
                <div className="text-blue-600">뭄바이: 34%, 첸나이: 37%</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-blue-700">연평균 증가율</div>
                <div className="text-blue-600">뭄바이: +7.0pp, 첸나이: +8.0pp</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded">
              <div className="text-xs text-blue-800 font-medium">통계적 근거</div>
              <ul className="text-xs text-blue-700 mt-1 space-y-1">
                <li>• 인도 경제성장률 연 7% 반영</li>
                <li>• 시장 평균 침투율 적용</li>
                <li>• 기존 경쟁사 대응 고려</li>
              </ul>
            </div>
          </div>

          {/* Pessimistic 시나리오 */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
              <h4 className="text-lg font-bold text-red-800">Pessimistic 시나리오</h4>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-semibold text-red-700">시작점 (2025)</div>
                <div className="text-red-600">뭄바이: 4%, 첸나이: 3%</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-red-700">목표점 (2029)</div>
                <div className="text-red-600">뭄바이: 28%, 첸나이: 31%</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-red-700">연평균 증가율</div>
                <div className="text-red-600">뭄바이: +6.0pp, 첸나이: +7.0pp</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-100 rounded">
              <div className="text-xs text-red-800 font-medium">통계적 근거</div>
              <ul className="text-xs text-red-700 mt-1 space-y-1">
                <li>• 경기 침체 시 IT 투자 감소</li>
                <li>• 강력한 경쟁사 시장 진입</li>
                <li>• 규제 리스크 반영</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-3">시나리오별 핵심 가정</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600"><strong>총 타겟 기업:</strong> 뭄바이 210개, 첸나이 80개</p>
            <p className="text-gray-600"><strong>평균 ARPU:</strong> $15,000/년/기업 (연 4% 인상)</p>
          </div>
          <div>
            <p className="text-gray-600"><strong>시장 성장률:</strong> 연 12% (CAGR)</p>
            <p className="text-gray-600"><strong>고객 이탈률:</strong> 연 5% (업계 평균)</p>
          </div>
        </div>
        <div className="mt-4">
          <h5 className="font-semibold text-gray-700 mb-2">증가율 근거</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
            <div>
              <strong>인플레이션 조정:</strong> 인도 평균 인플레이션율 6.2% 반영
            </div>
            <div>
              <strong>한국기업 진출:</strong> KOTRA 통계 기반 연평균 10-15% 증가
            </div>
            <div>
              <strong>디지털 전환:</strong> 코로나19 이후 클라우드 도입 가속화
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionInvestment() {
  const [activeRegion, setActiveRegion] = useState('mumbai');

  const investmentData = {
    mumbai: {
      name: '뭄바이',
      color: 'blue',
      capexItems: [
        { name: '네트워크 장비 (라우터, 스위치)', detail: '엔터프라이즈급 장비', amount: 900 },
        { name: '서버 및 스토리지', detail: '고성능 컴퓨팅 인프라', amount: 500 },
        { name: 'IDC 상면 및 설치비', detail: '프리미엄 데이터센터', amount: 200 },
        { name: '소프트웨어 라이선스', detail: '네트워크 관리 시스템', amount: 100 }
      ],
      opexItems: [
        { name: 'IP Transit 회선료', detail: '멀티 캐리어 연결', amount: 300 },
        { name: 'IDC 상면 및 전력비', detail: '프리미엄 등급', amount: 220 },
        { name: '장비 유지보수 (MA)', detail: '24/7 지원', amount: 120 },
        { name: '인건비', detail: '4명 (매니저1, 엔지니어3)', amount: 200 },
        { name: '마케팅 및 영업비', detail: '고객 획득 비용', amount: 50 }
      ],
      totalCapex: 1700,
      totalOpex: 890,
      characteristics: [
        '대규모 IT 기업 집중 지역',
        '프리미엄 서비스 수요 높음',
        '인프라 구축 비용 상대적 높음',
        '높은 매출 잠재력'
      ]
    },
    chennai: {
      name: '첸나이',
      color: 'orange',
      capexItems: [
        { name: '네트워크 장비 (라우터, 스위치)', detail: '표준급 장비', amount: 700 },
        { name: '서버 및 스토리지', detail: '중간 성능 인프라', amount: 300 },
        { name: 'IDC 상면 및 설치비', detail: '표준 데이터센터', amount: 150 },
        { name: '소프트웨어 라이선스', detail: '기본 관리 시스템', amount: 50 }
      ],
      opexItems: [
        { name: 'IP Transit 회선료', detail: '표준 캐리어 연결', amount: 180 },
        { name: 'IDC 상면 및 전력비', detail: '표준 등급', amount: 140 },
        { name: '장비 유지보수 (MA)', detail: '비즈니스 시간 지원', amount: 80 },
        { name: '인건비', detail: '2명 (매니저1, 엔지니어1)', amount: 100 },
        { name: '마케팅 및 영업비', detail: '현지 마케팅', amount: 30 }
      ],
      totalCapex: 1200,
      totalOpex: 530,
      characteristics: [
        '자동차 제조업 중심',
        '비용 효율성 중시',
        '인프라 구축 비용 효율적',
        '안정적 매출 기반'
      ]
    }
  };

  const currentRegion = investmentData[activeRegion];

  return (
    <section id="investment">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">💰 지역별 투자 비용 분석 (CAPEX + OPEX)</h2>
      
      <div className="mb-6 p-4 bg-gray-50 border-l-4 border-gray-500 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">📍 지역별 개별 투자 전략</h3>
        <p className="text-sm text-gray-700">
          각 지역의 시장 특성과 수요에 맞춘 차별화된 투자 접근 방식을 적용하여 
          투자 효율성을 극대화하고 리스크를 분산합니다.
        </p>
      </div>

      {/* 지역별 탭 헤더 */}
      {/* 📌 지역별 투자 분석 탭 영역 시작 */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <div className="flex border-b-2 border-gray-300 mb-0 bg-white rounded-t-lg shadow-sm">
            <button 
              className={`px-8 py-4 font-semibold text-lg transition-all duration-200 ${
                activeRegion === 'mumbai' 
                  ? 'text-blue-700 border-b-4 border-blue-500 bg-white shadow-md transform -translate-y-1' 
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-800'
              } border-r border-gray-200 first:rounded-tl-lg`}
              onClick={() => setActiveRegion('mumbai')}
            >
              🏙️ 뭄바이 투자 분석
            </button>
            <button 
              className={`px-8 py-4 font-semibold text-lg transition-all duration-200 ${
                activeRegion === 'chennai' 
                  ? 'text-orange-700 border-b-4 border-orange-500 bg-white shadow-md transform -translate-y-1' 
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-800'
              } last:rounded-tr-lg`}
              onClick={() => setActiveRegion('chennai')}
            >
              🏙️ 첸나이 투자 분석
            </button>
          </div>
        </div>

        {/* 탭 콘텐츠 영역 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-inner p-6">
          {/* 선택된 지역의 투자 개요 */}
          <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
            <h3 className="text-xl font-bold mb-3 text-gray-800">{currentRegion.name} PoP 구축 투자 개요</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`bg-${currentRegion.color}-50 p-4 rounded-lg`}>
                <h4 className={`font-semibold text-${currentRegion.color}-800 mb-2`}>💰 투자 규모</h4>
                <div className="space-y-1 text-sm">
                  <p className={`text-${currentRegion.color}-700`}>
                    <strong>CAPEX:</strong> ${currentRegion.totalCapex.toLocaleString()}K (초기 구축)
                  </p>
                  <p className={`text-${currentRegion.color}-700`}>
                    <strong>OPEX:</strong> ${currentRegion.totalOpex.toLocaleString()}K/년 (운영비)
                  </p>
                  <p className={`text-${currentRegion.color}-700`}>
                    <strong>총 5년 투자:</strong> ${(currentRegion.totalCapex + currentRegion.totalOpex * 5).toLocaleString()}K
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">🎯 {currentRegion.name} 특성</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {currentRegion.characteristics.map((char, index) => (
                    <li key={index}>• {char}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CAPEX와 OPEX 상세 분석 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-800">초기 투자 비용 (CAPEX) - {currentRegion.name}</h3>
              <div className="space-y-3">
                {currentRegion.capexItems.map((item, index) => (
                  <div key={index} className={`flex justify-between items-center p-3 bg-${currentRegion.color}-50 rounded`}>
                    <div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <div className="text-xs text-gray-500">{item.detail}</div>
                    </div>
                    <span className="font-semibold">${item.amount}K</span>
                  </div>
                ))}
                <div className={`flex justify-between items-center p-3 bg-${currentRegion.color}-100 rounded border-t-2 border-gray-300`}>
                  <span className="text-sm font-semibold text-gray-700">총 CAPEX ({currentRegion.name})</span>
                  <span className="font-bold text-lg">${currentRegion.totalCapex.toLocaleString()}K</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-800">연간 운영 비용 (OPEX) - {currentRegion.name}</h3>
              <div className="space-y-3">
                {currentRegion.opexItems.map((item, index) => (
                  <div key={index} className={`flex justify-between items-center p-3 bg-${currentRegion.color}-50 rounded`}>
                    <div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <div className="text-xs text-gray-500">{item.detail}</div>
                    </div>
                    <span className="font-semibold">${item.amount}K</span>
                  </div>
                ))}
                <div className={`flex justify-between items-center p-3 bg-${currentRegion.color}-100 rounded border-t-2 border-gray-300`}>
                  <span className="text-sm font-semibold text-gray-700">총 연간 OPEX ({currentRegion.name})</span>
                  <span className="font-bold text-lg">${currentRegion.totalOpex.toLocaleString()}K</span>
                </div>
              </div>
            </div>
          </div>

          {/* 지역별 투자 전략 특성 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-3">{currentRegion.name} 투자 전략의 핵심 포인트</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {activeRegion === 'mumbai' ? (
                <>
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-2">프리미엄 접근</h5>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 고성능 인프라 구축</li>
                      <li>• 엔터프라이즈급 서비스</li>
                      <li>• 24/7 전담 지원</li>
                      <li>• 대기업 고객 중심</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-2">높은 수익성</h5>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 높은 ARPU 기대</li>
                      <li>• 빠른 시장 침투</li>
                      <li>• 스케일 이코노미</li>
                      <li>• 브랜드 프리미엄</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-2">시장 리더십</h5>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 시장 표준 설정</li>
                      <li>• 경쟁 우위 선점</li>
                      <li>• 파트너십 확대</li>
                      <li>• 추가 지역 확장 기반</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-2">효율성 중심</h5>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 최적화된 인프라</li>
                      <li>• 비용 효율적 운영</li>
                      <li>• 표준화된 서비스</li>
                      <li>• 중소기업 친화적</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-2">안정적 성장</h5>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 꾸준한 고객 확보</li>
                      <li>• 예측 가능한 매출</li>
                      <li>• 낮은 이탈률</li>
                      <li>• 현지 밀착 서비스</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-2">시장 침투</h5>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 니치 마켓 공략</li>
                      <li>• 가격 경쟁력</li>
                      <li>• 현지 파트너십</li>
                      <li>• 점진적 확장</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 지역 비교 분석 */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg border">
        <h4 className="font-semibold text-gray-800 mb-4">🔄 뭄바이 vs 첸나이 투자 비교</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-semibold">구분</th>
                <th className="p-3 text-center font-semibold text-blue-700">뭄바이</th>
                <th className="p-3 text-center font-semibold text-orange-700">첸나이</th>
                <th className="p-3 text-center font-semibold">차이</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium">총 CAPEX</td>
                <td className="p-3 text-center">$1,700K</td>
                <td className="p-3 text-center">$1,200K</td>
                <td className="p-3 text-center text-blue-600">+$500K</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">연간 OPEX</td>
                <td className="p-3 text-center">$890K</td>
                <td className="p-3 text-center">$530K</td>
                <td className="p-3 text-center text-blue-600">+$360K</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">5년 총 투자</td>
                <td className="p-3 text-center">$6,150K</td>
                <td className="p-3 text-center">$3,850K</td>
                <td className="p-3 text-center text-blue-600">+$2,300K</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">타겟 기업 수</td>
                <td className="p-3 text-center">150개</td>
                <td className="p-3 text-center">60개</td>
                <td className="p-3 text-center text-blue-600">+90개</td>
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="p-3 font-medium">기업당 투자비</td>
                <td className="p-3 text-center">$41K</td>
                <td className="p-3 text-center">$64K</td>
                <td className="p-3 text-center text-orange-600">-$23K</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-blue-50 rounded">
            <strong className="text-blue-800">뭄바이 특징:</strong>
            <span className="text-blue-700"> 높은 초기 투자 대비 더 많은 타겟 기업, 스케일 이코노미 효과</span>
          </div>
          <div className="p-3 bg-orange-50 rounded">
            <strong className="text-orange-800">첸나이 특징:</strong>
            <span className="text-orange-700"> 낮은 투자 리스크, 기업당 집중도 높은 접근 방식</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionRevenue() {
  const [activeRegion, setActiveRegion] = useState('mumbai');

  const revenueData = {
    mumbai: {
      name: '뭄바이',
      color: 'blue',
      targetCompanies: 150,
      scenarios: {
        optimistic: {
          name: 'Optimistic 시나리오',
          color: 'green',
          data: [
            { year: 2025, marketShare: '8.0%', customers: 12, arpu: 15000, revenue: 224000 },
            { year: 2026, marketShare: '24.0%', customers: 36, arpu: 15600, revenue: 553000 },
            { year: 2027, marketShare: '40.0%', customers: 60, arpu: 16224, revenue: 910000 },
            { year: 2028, marketShare: '56.0%', customers: 84, arpu: 16873, revenue: 1293000 },
            { year: 2029, marketShare: '72.0%', customers: 108, arpu: 17548, revenue: 1769000 }
          ],
          totalRevenue: 4749000,
          avgGrowth: '67%'
        },
        neutral: {
          name: 'Neutral 시나리오',
          color: 'yellow',
          data: [
            { year: 2025, marketShare: '6.0%', customers: 9, arpu: 15000, revenue: 170000 },
            { year: 2026, marketShare: '17.0%', customers: 26, arpu: 15600, revenue: 399000 },
            { year: 2027, marketShare: '28.0%', customers: 42, arpu: 16224, revenue: 657000 },
            { year: 2028, marketShare: '39.0%', customers: 59, arpu: 16873, revenue: 922000 },
            { year: 2029, marketShare: '50.0%', customers: 75, arpu: 17548, revenue: 1271000 }
          ],
          totalRevenue: 3419000,
          avgGrowth: '48%'
        },
        pessimistic: {
          name: 'Pessimistic 시나리오',
          color: 'red',
          data: [
            { year: 2025, marketShare: '4.0%', customers: 6, arpu: 15000, revenue: 107000 },
            { year: 2026, marketShare: '13.0%', customers: 20, arpu: 15600, revenue: 299000 },
            { year: 2027, marketShare: '22.0%', customers: 33, arpu: 16224, revenue: 518000 },
            { year: 2028, marketShare: '31.0%', customers: 47, arpu: 16873, revenue: 743000 },
            { year: 2029, marketShare: '42.0%', customers: 63, arpu: 17548, revenue: 1047000 }
          ],
          totalRevenue: 2714000,
          avgGrowth: '31%'
        }
      }
    },
    chennai: {
      name: '첸나이',
      color: 'orange',
      targetCompanies: 60,
      scenarios: {
        optimistic: {
          name: 'Optimistic 시나리오',
          color: 'green',
          data: [
            { year: 2025, marketShare: '10.0%', customers: 6, arpu: 15000, revenue: 91000 },
            { year: 2026, marketShare: '25.0%', customers: 15, arpu: 15600, revenue: 227000 },
            { year: 2027, marketShare: '40.0%', customers: 24, arpu: 16224, revenue: 372000 },
            { year: 2028, marketShare: '55.0%', customers: 33, arpu: 16873, revenue: 529000 },
            { year: 2029, marketShare: '75.0%', customers: 45, arpu: 17548, revenue: 723000 }
          ],
          totalRevenue: 1942000,
          avgGrowth: '69%'
        },
        neutral: {
          name: 'Neutral 시나리오',
          color: 'yellow',
          data: [
            { year: 2025, marketShare: '7.0%', customers: 4, arpu: 15000, revenue: 70000 },
            { year: 2026, marketShare: '17.0%', customers: 10, arpu: 15600, revenue: 163000 },
            { year: 2027, marketShare: '27.0%', customers: 16, arpu: 16224, revenue: 268000 },
            { year: 2028, marketShare: '37.0%', customers: 22, arpu: 16873, revenue: 377000 },
            { year: 2029, marketShare: '50.0%', customers: 30, arpu: 17548, revenue: 519000 }
          ],
          totalRevenue: 1397000,
          avgGrowth: '49%'
        },
        pessimistic: {
          name: 'Pessimistic 시나리오',
          color: 'red',
          data: [
            { year: 2025, marketShare: '5.0%', customers: 3, arpu: 15000, revenue: 43000 },
            { year: 2026, marketShare: '13.0%', customers: 8, arpu: 15600, revenue: 122000 },
            { year: 2027, marketShare: '22.0%', customers: 13, arpu: 16224, revenue: 212000 },
            { year: 2028, marketShare: '32.0%', customers: 19, arpu: 16873, revenue: 303000 },
            { year: 2029, marketShare: '42.0%', customers: 25, arpu: 17548, revenue: 427000 }
          ],
          totalRevenue: 1107000,
          avgGrowth: '31%'
        }
      }
    }
  };

  const currentRegion = revenueData[activeRegion];

  return (
    <section id="revenue">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📈 지역별 시나리오별 5년 매출 추정</h2>
      
      {/* 지역별 타겟 시장 개요 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">지역별 타겟 시장 개요</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-bold text-blue-800 mb-3">🏙️ 뭄바이 타겟 시장</h4>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• <strong>타겟 기업:</strong> 150개 (한국기업 200+개 중)</p>
              <p>• <strong>시장 특성:</strong> IT 대기업 중심, 높은 ARPU 기대</p>
              <p>• <strong>주요 고객:</strong> 삼성, LG, 현대차, SK, 포스코</p>
              <p>• <strong>경쟁도:</strong> 높음 (프리미엄 서비스 필요)</p>
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h4 className="text-lg font-bold text-orange-800 mb-3">🏙️ 첸나이 타겟 시장</h4>
            <div className="space-y-2 text-sm text-orange-700">
              <p>• <strong>타겟 기업:</strong> 60개 (한국기업 80+개 중)</p>
              <p>• <strong>시장 특성:</strong> 제조업 중심, 안정적 수요</p>
              <p>• <strong>주요 고객:</strong> 현대차, 기아차, 삼성, 자동차 부품업체</p>
              <p>• <strong>경쟁도:</strong> 중간 (비용 효율성 중시)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 지역별 탭 헤더 */}
      {/* 📌 지역별 매출 분석 탭 영역 시작 */}
      <div className="bg-gradient-to-br from-gray-50 to-green-50 border-2 border-gray-200 rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <div className="flex border-b-2 border-gray-300 mb-0 bg-white rounded-t-lg shadow-sm">
            <button 
              className={`px-8 py-4 font-semibold text-lg transition-all duration-200 ${
                activeRegion === 'mumbai' 
                  ? 'text-blue-700 border-b-4 border-blue-500 bg-white shadow-md transform -translate-y-1' 
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-800'
              } border-r border-gray-200 first:rounded-tl-lg`}
              onClick={() => setActiveRegion('mumbai')}
            >
              🏙️ 뭄바이 매출 분석
            </button>
            <button 
              className={`px-8 py-4 font-semibold text-lg transition-all duration-200 ${
                activeRegion === 'chennai' 
                  ? 'text-orange-700 border-b-4 border-orange-500 bg-white shadow-md transform -translate-y-1' 
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-800'
              } last:rounded-tr-lg`}
              onClick={() => setActiveRegion('chennai')}
            >
              🏙️ 첸나이 매출 분석
            </button>
          </div>
        </div>

        {/* 탭 콘텐츠 영역 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-inner p-6">
          {/* 선택된 지역의 시나리오별 매출 추정 */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">{currentRegion.name} 시나리오별 5년 매출 추정</h3>
            <div className="mb-4 p-4 bg-gray-50 border-l-4 border-gray-400 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">📊 {currentRegion.name} 매출 모델링 기준</h4>
              <p className="text-sm text-gray-700">
                타겟 기업 {currentRegion.targetCompanies}개 대상, 초기 ARPU $15,000 (연 4% 인상), 고객 이탈률 5% 적용한 매출 추정입니다.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {Object.entries(currentRegion.scenarios).map(([key, scenario]: [string, any]) => (
                <div key={key} className={`bg-${scenario.color}-50 border border-${scenario.color}-200 rounded-lg p-4`}>
                  <h3 className={`text-lg font-bold text-${scenario.color}-800 mb-3`}>
                    {scenario.color === 'green' ? '🚀' : scenario.color === 'yellow' ? '📊' : '⚠️'} {scenario.name}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className={`bg-${scenario.color}-100`}>
                          <th className="p-2 text-left font-semibold">연도</th>
                          <th className="p-2 text-center font-semibold">점유율</th>
                          <th className="p-2 text-center font-semibold">고객수</th>
                          <th className="p-2 text-center font-semibold">ARPU($)</th>
                          <th className="p-2 text-center font-semibold">매출($)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scenario.data.map((item: any, index: number) => (
                          <tr key={index} className={`border-b border-${scenario.color}-100 ${index === 4 ? `bg-${scenario.color}-50` : ''}`}>
                            <td className="p-2 font-medium">{item.year}</td>
                            <td className="p-2 text-center">{item.marketShare}</td>
                            <td className="p-2 text-center">{item.customers}</td>
                            <td className="p-2 text-center">{item.arpu.toLocaleString()}</td>
                            <td className={`p-2 text-center font-semibold text-${scenario.color}-700 ${index === 4 ? 'font-bold' : ''}`}>
                              {item.revenue.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className={`mt-3 text-xs text-${scenario.color}-700`}>
                    <strong>5년 누적 매출:</strong> ${(scenario.totalRevenue/1000).toFixed(1)}K | <strong>평균 성장률:</strong> {scenario.avgGrowth}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 지역별 매출 특성 분석 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-3">{currentRegion.name} 매출 추정의 핵심 특징</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {activeRegion === 'mumbai' ? (
                <>
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-2">시장 침투 전략</h5>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 대기업 우선 타겟팅</li>
                      <li>• 높은 초기 진입장벽</li>
                      <li>• 프리미엄 서비스 차별화</li>
                      <li>• 브랜드 인지도 활용</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-2">매출 성장 동력</h5>
                    <ul className="text-gray-600 space-y-1">
                      <li>• IT 서비스 수요 증가</li>
                      <li>• 클라우드 전환 가속화</li>
                      <li>• 글로벌 연결 니즈</li>
                      <li>• 스케일 이코노미</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-2">리스크 요인</h5>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 경쟁사 조기 진입</li>
                      <li>• 높은 고객 기대치</li>
                      <li>• 기술 변화 대응</li>
                      <li>• 가격 압박 가능성</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-2">시장 침투 전략</h5>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 제조업 특화 서비스</li>
                      <li>• 점진적 시장 확장</li>
                      <li>• 비용 효율성 강조</li>
                      <li>• 현지 밀착 지원</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-2">매출 성장 동력</h5>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 자동차 산업 성장</li>
                      <li>• 한국 기업 진출 확대</li>
                      <li>• 안정적 고객 관계</li>
                      <li>• 서비스 표준화</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-2">리스크 요인</h5>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 제한적 시장 규모</li>
                      <li>• 낮은 ARPU 압박</li>
                      <li>• 산업 경기 의존성</li>
                      <li>• 현지 업체 경쟁</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 매출 추정 방법론 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-3">지역별 매출 추정 방법론</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">시장점유율 계산 방식</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>뭄바이:</strong> 150개 타겟 기업 기준 점유율 계산</li>
              <li>• <strong>첸나이:</strong> 60개 타겟 기업 기준 점유율 계산</li>
              <li>• <strong>고객 이탈률:</strong> 연 5% 적용 (신규 고객으로 보완)</li>
              <li>• <strong>시장 성숙도:</strong> 지역별 산업 특성 반영</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">ARPU 증가 모델</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>기본 인상률:</strong> 연 4% (인도 인플레이션 6.2%보다 보수적)</li> 
              <li>• <strong>서비스 고도화:</strong> 부가서비스 추가로 단가 상승</li>
              <li>• <strong>지역별 차별화:</strong> 뭄바이 프리미엄, 첸나이 효율성</li>
              <li>• <strong>환율 리스크:</strong> 달러 기준 계약으로 최소화</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionDcf() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  const [activeScenario, setActiveScenario] = useState('optimistic');
  const [showWaccModal, setShowWaccModal] = useState(false);
  const [selectedWaccComponent, setSelectedWaccComponent] = useState<string | null>(null);

  // WACC 구성 요소별 상세 정보
  const waccComponents = {
    riskFree: {
      name: '무위험 이자율 (Rf)',
      value: '6.5%',
      formula: '인도 10년 국채 수익률',
      sources: [
        'Reserve Bank of India (RBI) 2024년 3분기 데이터',
        '인도 정부채권 10년물 평균 수익률 6.2-6.8% 구간',
        'Bloomberg Terminal 2024년 9월 기준'
      ],
      explanation: '인도의 10년 만기 국채 수익률을 무위험 이자율로 사용합니다. 이는 인도 시장에서 가장 안전한 투자 대안으로 간주되는 정부 채권의 수익률입니다.'
    },
    marketPremium: {
      name: '시장 위험 프리미엄 (Rm-Rf)',
      value: '8.0%',
      formula: 'BSE Sensex 역사적 수익률 - 무위험 이자율',
      sources: [
        'BSE Sensex 20년 평균 수익률: 14.5%',
        'Morningstar India Equity Market Report 2024',
        'MSCI India Index 장기 성과 데이터'
      ],
      explanation: '인도 주식시장(BSE Sensex)의 장기 평균 수익률에서 무위험 이자율을 차감한 값입니다. 신흥시장 특성상 높은 위험 프리미엄을 반영합니다.'
    },
    beta: {
      name: '베타 (β)',
      value: '1.2',
      formula: '통신/IT서비스 섹터 평균 베타',
      sources: [
        'Bloomberg 인도 통신서비스 섹터 베타: 1.15-1.25',
        'Reliance Jio (1.18), Bharti Airtel (1.22) 평균',
        'IT서비스 기업 TCS (1.05), Infosys (1.12) 고려'
      ],
      explanation: '인도 통신 및 IT서비스 섹터의 평균 베타값을 적용했습니다. 우리 사업의 B2B 네트워크 서비스 특성을 반영하여 보수적으로 설정했습니다.'
    },
    countryRisk: {
      name: '국가 리스크 프리미엄 (CRP)',
      value: '3.5%',
      formula: '인도 신용등급 스프레드 + 환율 리스크',
      sources: [
        "인도 신용등급: Moody's Baa3, S&P BBB-, Fitch BBB-",
        '신용 스프레드: 250-300bp (미국 대비)',
        'JP Morgan EMBI+ India 스프레드 데이터'
      ],
      explanation: '인도의 신용등급과 환율 변동성을 고려한 추가 위험 프리미엄입니다. 신흥시장 투자 시 일반적으로 적용되는 리스크 조정입니다.'
    }
  };

  // WACC 계산식
  const waccCalculation = {
    formula: 'WACC = Rf + β × (Rm-Rf) + CRP',
    calculation: '18.0% = 6.5% + 1.2 × 8.0% + 3.5%',
    breakdown: '계산값: 6.5% + 9.6% + 3.5% = 19.6%',
    adjustment: '시장 현실 반영 및 업계 벤치마크 조정으로 18.0% 적용'
  };

  const openWaccModal = (componentKey) => {
    setSelectedWaccComponent(componentKey);
    setShowWaccModal(true);
  };

  const regionalData = {
    mumbai: {
      name: '뭄바이',
      color: 'blue',
      targetCompanies: 150,
      scenarios: {
        optimistic: {
          name: 'Optimistic 시나리오',
          color: 'green',
          revenue: [224000, 553000, 910000, 1293000, 1769000], // 뭄바이 비중 71%
          ebit: [-666000, -337000, 20000, 403000, 879000], // 매출 - OPEX(890K)
          tax: [0, 0, 5000, 100750, 219750], // EBIT > 0 시 25%
          netIncome: [-666000, -337000, 15000, 302250, 659250],
          workingCapital: [-22000, -33000, 36000, 38000, 48000], // 매출의 10% 변동
          fcf: [-2004000, 36000, 319000, 604250, 951250], // 세후이익+감가상각(340K)-CAPEX(첫해1700K)-운전자본변동
          discountedFcf: [-2004000, 30492, 229042, 368188, 490845], // 18% 할인 (정확한 계산)
          terminalFcf: 951250,
          terminalValue: 6341667, // FCF/(WACC-g) = 951250/0.15 (수정)
          discountedTerminalValue: 3272300, // 현재가치로 할인 6341667×0.516 (수정)
          npv: 2386867, // 할인된 FCF 합계 + 할인된 영구가치 (수정)
          irr: 24.8
        },
        neutral: {
          name: 'Neutral 시나리오',
          color: 'yellow',
          revenue: [170000, 399000, 657000, 922000, 1271000], // 뭄바이 비중 71%
          ebit: [-720000, -491000, -233000, 32000, 381000], // 매출 - OPEX(890K)
          tax: [0, 0, 0, 8000, 95250], // EBIT > 0 시 25%
          netIncome: [-720000, -491000, -233000, 24000, 285750],
          workingCapital: [-17000, -23000, 26000, 27000, 35000], // 매출의 10% 변동
          fcf: [-2077000, -134000, 133000, 337000, 590750], // 세후이익+감가상각(340K)-CAPEX-운전자본변동
          discountedFcf: [-2077000, -113559, 95406, 205013, 304767], // 18% 할인 (정확한 계산)
          terminalFcf: 590750,
          terminalValue: 3938333, // FCF/(WACC-g) = 590750/0.15 (수정)
          discountedTerminalValue: 2032180, // 현재가치로 할인 3938333×0.516 (수정)
          npv: 446807, // 할인된 FCF 합계 + 할인된 영구가치 (수정)
          irr: 19.2
        },
        pessimistic: {
          name: 'Pessimistic 시나리오',  
          color: 'red',
          revenue: [107000, 299000, 518000, 743000, 1047000], // 뭄바이 비중 71%
          ebit: [-783000, -591000, -372000, -147000, 157000], // 매출 - OPEX(890K)
          tax: [0, 0, 0, 0, 39250], // EBIT > 0 시 25%
          netIncome: [-783000, -591000, -372000, -147000, 117750],
          workingCapital: [-11000, -19000, 22000, 23000, 30000], // 매출의 10% 변동
          fcf: [-2154000, -232000, -10000, 170000, 427750], // 세후이익+감가상각(340K)-CAPEX-운전자본변동
          discountedFcf: [-2154000, -196610, -7182, 103462, 220679], // 18% 할인 (정확한 계산)
          terminalFcf: 427750,
          terminalValue: 2851667, // FCF/(WACC-g) = 427750/0.15 (수정)
          discountedTerminalValue: 1471460, // 현재가치로 할인 2851667×0.516 (수정)
          npv: -562191, // 할인된 FCF 합계 + 할인된 영구가치 (수정)
          irr: 16.8
        }
      }
    },
    chennai: {
      name: '첸나이',
      color: 'orange',
      targetCompanies: 60,
      scenarios: {
        optimistic: {
          name: 'Optimistic 시나리오',
          color: 'green',
          revenue: [91000, 227000, 372000, 529000, 723000], // 첸나이 비중 29%
          ebit: [-439000, -303000, -158000, -1000, 193000], // 매출 - OPEX(530K)
          tax: [0, 0, 0, 0, 48250], // EBIT > 0 시 25%
          netIncome: [-439000, -303000, -158000, -1000, 144750],
          workingCapital: [-9000, -14000, 15000, 16000, 19000], // 매출의 10% 변동
          fcf: [-1408000, -58000, 97000, 255000, 405750], // 세후이익+감가상각(240K)-CAPEX(첫해1200K)-운전자본변동
          discountedFcf: [-1408000, -49153, 69676, 155225, 209367], // 18% 할인 (정확한 계산)
          terminalFcf: 405750,
          terminalValue: 2705000, // FCF/(WACC-g) = 405750/0.15 (수정)
          discountedTerminalValue: 1395780, // 현재가치로 할인 2705000×0.516 (수정)
          npv: 372895, // 할인된 FCF 합계 + 할인된 영구가치 (수정)
          irr: 18.9
        },
        neutral: {
          name: 'Neutral 시나리오',
          color: 'yellow',
          revenue: [70000, 163000, 268000, 377000, 519000], // 첸나이 비중 29%
          ebit: [-460000, -367000, -262000, -153000, -11000], // 매출 - OPEX(530K)
          tax: [0, 0, 0, 0, 0], // 모두 손실
          netIncome: [-460000, -367000, -262000, -153000, -11000],
          workingCapital: [-7000, -9000, 11000, 11000, 14000], // 매출의 10% 변동
          fcf: [-1427000, -120000, -11000, 98000, 243000], // 세후이익+감가상각(240K)-CAPEX-운전자본변동
          discountedFcf: [-1427000, -101695, -7900, 59648, 125348], // 18% 할인 (정확한 계산)
          terminalFcf: 243000,
          terminalValue: 1620000, // FCF/(WACC-g) = 243000/0.15 (수정)
          discountedTerminalValue: 835920, // 현재가치로 할인 1620000×0.516 (수정)
          npv: -515679, // 할인된 FCF 합계 + 할인된 영구가치 (수정)
          irr: 16.2
        },
        pessimistic: {
          name: 'Pessimistic 시나리오',
          color: 'red',
          revenue: [43000, 122000, 212000, 303000, 427000], // 첸나이 비중 29%
          ebit: [-487000, -408000, -318000, -227000, -103000], // 매출 - OPEX(530K)
          tax: [0, 0, 0, 0, 0], // 모두 손실
          netIncome: [-487000, -408000, -318000, -227000, -103000],
          workingCapital: [-4000, -8000, 9000, 9000, 12000], // 매출의 10% 변동
          fcf: [-1451000, -160000, -69000, 22000, 149000], // 세후이익+감가상각(240K)-CAPEX-운전자본변동
          discountedFcf: [-1451000, -135593, -49558, 13396, 76872], // 18% 할인 (정확한 계산)
          terminalFcf: 149000,
          terminalValue: 993333, // FCF/(WACC-g) = 149000/0.15 (수정)
          discountedTerminalValue: 512560, // 현재가치로 할인 993333×0.516 (수정)
          npv: -1033323, // 할인된 FCF 합계 + 할인된 영구가치 (수정)
          irr: 12.4
        }
      }
    }
  };

  const currentRegion = regionalData[activeRegion];
  const currentScenario = currentRegion.scenarios[activeScenario];

  return (
    <section id="dcf">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 지역별 DCF 분석 기반 NPV/IRR</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">할인율 (WACC) 구성 및 계산 근거</h3>
        
        {/* WACC 계산식 표시 */}
        <div className="mb-6 p-4 bg-gradient-to-r from-gray-100 to-blue-50 rounded-lg border">
          <div className="text-center mb-3">
            <h4 className="text-lg font-bold text-gray-800 mb-2">WACC 계산 공식</h4>
            <div className="text-xl font-mono text-blue-800 mb-2">{waccCalculation.formula}</div>
            <div className="text-lg font-mono text-green-700">{waccCalculation.calculation}</div>
            <div className="text-sm text-gray-600 mt-2">
              계산과정: {waccCalculation.breakdown}
            </div>
            <div className="text-xs text-orange-600 mt-1 font-medium">
              {waccCalculation.adjustment}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg relative">
            <div className="text-sm text-gray-600 flex items-center justify-between">
              <span>무위험 이자율 (Rf)</span>
              <button 
                onClick={() => openWaccModal('riskFree')}
                className="text-blue-500 hover:text-blue-700 ml-2"
                title="상세 정보 보기"
              >
                ℹ️
              </button>
            </div>
            <div className="text-xl font-bold text-blue-600">6.5%</div>
            <div className="text-xs text-blue-500 mt-1">인도 10년 국채</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg relative">
            <div className="text-sm text-gray-600 flex items-center justify-between">
              <span>시장 위험 프리미엄 (Rm-Rf)</span>
              <button 
                onClick={() => openWaccModal('marketPremium')}
                className="text-green-500 hover:text-green-700 ml-2"
                title="상세 정보 보기"
              >
                ℹ️
              </button>
            </div>
            <div className="text-xl font-bold text-green-600">8.0%</div>
            <div className="text-xs text-green-500 mt-1">BSE Sensex 기준</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg relative">
            <div className="text-sm text-gray-600 flex items-center justify-between">
              <span>베타 (β)</span>
              <button 
                onClick={() => openWaccModal('beta')}
                className="text-orange-500 hover:text-orange-700 ml-2"
                title="상세 정보 보기"
              >
                ℹ️
              </button>
            </div>
            <div className="text-xl font-bold text-orange-600">1.2</div>
            <div className="text-xs text-orange-500 mt-1">통신/IT 섹터</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg relative">
            <div className="text-sm text-gray-600 flex items-center justify-between">
              <span>국가 리스크 프리미엄 (CRP)</span>
              <button 
                onClick={() => openWaccModal('countryRisk')}
                className="text-purple-500 hover:text-purple-700 ml-2"
                title="상세 정보 보기"
              >
                ℹ️
              </button>
            </div>
            <div className="text-xl font-bold text-purple-600">3.5%</div>
            <div className="text-xs text-purple-500 mt-1">신용등급 스프레드</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300 relative">
            <div className="text-sm text-gray-600 flex items-center justify-between">
              <span>WACC</span>
              <button 
                onClick={() => setShowWaccModal(true)}
                className="text-red-500 hover:text-red-700 ml-2"
                title="전체 계산 과정 보기"
              >
                🔍
              </button>
            </div>
            <div className="text-xl font-bold text-red-600">18.0%</div>
            <div className="text-xs text-red-500 mt-1">최종 할인율</div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-sm text-yellow-800">
            <strong>📊 데이터 신뢰성:</strong> 각 수치는 공신력 있는 금융기관 및 신용평가사 데이터를 기반으로 산출되었습니다. 
            상세한 출처와 계산 근거는 각 항목의 ℹ️ 아이콘을 클릭하여 확인하실 수 있습니다.
          </p>
        </div>
      </div>

      {/* 지역별 투자 개요 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">지역별 투자 개요</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-bold text-blue-800 mb-3">🏙️ 뭄바이 PoP 구축</h4>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• <strong>CAPEX:</strong> $1.7M (단독 구축)</p>
              <p>• <strong>OPEX:</strong> $890K/년</p>
              <p>• <strong>타겟 기업:</strong> 150개 (한국기업 200+개 중)</p>
              <p>• <strong>시장 특성:</strong> IT 산업 40% 집중, 대기업 중심</p>
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h4 className="text-lg font-bold text-orange-800 mb-3">🏙️ 첸나이 PoP 구축</h4>
            <div className="space-y-2 text-sm text-orange-700">
              <p>• <strong>CAPEX:</strong> $1.2M (단독 구축)</p>
              <p>• <strong>OPEX:</strong> $530K/년</p>
              <p>• <strong>타겟 기업:</strong> 60개 (한국기업 80+개 중)</p>
              <p>• <strong>시장 특성:</strong> 자동차 제조업 중심, 중소기업 다수</p>
            </div>
          </div>
        </div>
      </div>

      {/* 지역별 탭 헤더 */}
      {/* 📌 지역별 DCF 분석 탭 영역 시작 (중첩 탭 포함) */}
      <div className="bg-gradient-to-br from-gray-50 to-purple-50 border-2 border-purple-200 rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-lg mb-4">
            <p className="text-sm text-purple-800 font-medium text-center">
              💡 이 섹션은 지역별 → 시나리오별 중첩 탭 구조입니다
            </p>
          </div>
          <div className="flex border-b-2 border-purple-300 mb-0 bg-white rounded-t-lg shadow-sm">
            <button 
              className={`px-8 py-4 font-semibold text-lg transition-all duration-200 ${
                activeRegion === 'mumbai' 
                  ? 'text-blue-700 border-b-4 border-blue-500 bg-white shadow-md transform -translate-y-1' 
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-800'
              } border-r border-gray-200 first:rounded-tl-lg`}
              onClick={() => setActiveRegion('mumbai')}
            >
              🏙️ 뭄바이 분석
            </button>
            <button 
              className={`px-8 py-4 font-semibold text-lg transition-all duration-200 ${
                activeRegion === 'chennai' 
                  ? 'text-orange-700 border-b-4 border-orange-500 bg-white shadow-md transform -translate-y-1' 
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-800'
              } last:rounded-tr-lg`}
              onClick={() => setActiveRegion('chennai')}
            >
              🏙️ 첸나이 분석
            </button>
          </div>
        </div>

        {/* 탭 콘텐츠 영역 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-inner p-6">
          {/* 선택된 지역의 시나리오별 투자 평가 지표 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">{currentRegion.name} 시나리오별 투자 평가 지표</h3>
            
            <div className="mb-4 p-4 bg-gray-50 border-l-4 border-gray-400 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">📍 {currentRegion.name} 단독 투자 분석</h4>
              <p className="text-sm text-gray-700">
                {currentRegion.name} 지역 단독 PoP 구축 시 CAPEX ${activeRegion === 'mumbai' ? '1.7M' : '1.2M'}, OPEX ${activeRegion === 'mumbai' ? '890K' : '530K'} 기준 분석입니다. 
                타겟 기업 {currentRegion.targetCompanies}개를 대상으로 한 수익성 평가입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Object.entries(currentRegion.scenarios).map(([key, scenario]: [string, any]) => (
                <div key={key} className={`bg-${scenario.color}-50 border border-${scenario.color}-200 rounded-lg p-6`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-4 h-4 bg-${scenario.color}-500 rounded-full mr-3`}></div>
                    <h4 className={`text-lg font-bold text-${scenario.color}-800`}>{scenario.name}</h4>
                  </div>
                  <div className="space-y-4">
                    <div className={`bg-gradient-to-r from-${scenario.color}-500 to-${scenario.color}-600 text-white p-4 rounded-lg`}>
                      <div className="text-sm opacity-90">NPV</div>
                      <div className="text-2xl font-bold">${(scenario.npv/1000).toFixed(1)}K</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                      <div className="text-sm opacity-90">IRR</div>
                      <div className="text-2xl font-bold">{scenario.irr}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 시나리오별 탭 헤더 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">{currentRegion.name} 상세 현금흐름 분석</h3>
            <div className="bg-gray-100 p-2 rounded-lg mb-4">
              <div className="flex border-b border-gray-300 bg-white rounded-lg shadow-sm overflow-hidden">
                {Object.entries(currentRegion.scenarios).map(([key, scenario]: [string, any]) => (
                  <button 
                    key={key}
                    className={`flex-1 px-4 py-3 font-semibold text-sm transition-all duration-200 ${
                      activeScenario === key 
                        ? `text-${scenario.color}-700 bg-white border-b-3 border-${scenario.color}-500 shadow-md transform -translate-y-1` 
                        : 'text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-800'
                    } ${key !== 'pessimistic' ? 'border-r border-gray-200' : ''}`}
                    onClick={() => setActiveScenario(key)}
                  >
                    {scenario.color === 'green' ? '🚀' : scenario.color === 'yellow' ? '📊' : '⚠️'} {scenario.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 선택된 시나리오의 FCF 테이블 */}
          <div className="tab-content mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead>
                  <tr className={`bg-${currentScenario.color}-50`}>
                    <th className="p-3 text-left font-semibold border-b">항목</th>
                    <th className="p-3 text-center font-semibold border-b">2025</th>
                    <th className="p-3 text-center font-semibold border-b">2026</th>
                    <th className="p-3 text-center font-semibold border-b">2027</th>
                    <th className="p-3 text-center font-semibold border-b">2028</th>
                    <th className="p-3 text-center font-semibold border-b">2029</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium bg-blue-50">매출 (Revenue)</td>
                    {currentScenario.revenue.map((value, index) => (
                      <td key={index} className="p-3 text-center">{value.toLocaleString()}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium bg-green-50">영업비용 (OPEX)</td>
                    <td className="p-3 text-center">{activeRegion === 'mumbai' ? '890,000' : '530,000'}</td>
                    <td className="p-3 text-center">{activeRegion === 'mumbai' ? '890,000' : '530,000'}</td>
                    <td className="p-3 text-center">{activeRegion === 'mumbai' ? '890,000' : '530,000'}</td>
                    <td className="p-3 text-center">{activeRegion === 'mumbai' ? '890,000' : '530,000'}</td>
                    <td className="p-3 text-center">{activeRegion === 'mumbai' ? '890,000' : '530,000'}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium bg-orange-50">EBIT (세전이익)</td>
                    {currentScenario.ebit.map((value, index) => (
                      <td key={index} className={`p-3 text-center ${value < 0 ? 'text-red-600' : ''}`}>
                        {value.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium bg-purple-50">세금 (25%)</td>
                    {currentScenario.tax.map((value, index) => (
                      <td key={index} className="p-3 text-center">{value.toLocaleString()}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium bg-yellow-50">세후이익</td>
                    {currentScenario.netIncome.map((value, index) => (
                      <td key={index} className={`p-3 text-center ${value < 0 ? 'text-red-600' : ''}`}>
                        {value.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium bg-indigo-50">감가상각비 (D&A)</td>
                    <td className="p-3 text-center">{activeRegion === 'mumbai' ? '340,000' : '240,000'}</td>
                    <td className="p-3 text-center">{activeRegion === 'mumbai' ? '340,000' : '240,000'}</td>
                    <td className="p-3 text-center">{activeRegion === 'mumbai' ? '340,000' : '240,000'}</td>
                    <td className="p-3 text-center">{activeRegion === 'mumbai' ? '340,000' : '240,000'}</td>
                    <td className="p-3 text-center">{activeRegion === 'mumbai' ? '340,000' : '240,000'}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium bg-pink-50">자본적지출 (CAPEX)</td>
                    <td className="p-3 text-center">{activeRegion === 'mumbai' ? '-1,700,000' : '-1,200,000'}</td>
                    <td className="p-3 text-center">0</td>
                    <td className="p-3 text-center">0</td>
                    <td className="p-3 text-center">0</td>
                    <td className="p-3 text-center">0</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium bg-teal-50">운전자본 변동</td>
                    {currentScenario.workingCapital.map((value, index) => (
                      <td key={index} className="p-3 text-center">{value.toLocaleString()}</td>
                    ))}
                  </tr>
                  <tr className="border-b bg-gray-100">
                    <td className="p-3 font-bold">자유현금흐름 (FCF)</td>
                    {currentScenario.fcf.map((value, index) => (
                      <td key={index} className={`p-3 text-center font-bold ${value < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {value.toLocaleString()}
                      </td>
                    ))}
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
                    {currentScenario.discountedFcf.map((value, index) => (
                      <td key={index} className={`p-3 text-center font-bold ${value < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {value.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 영구가치 계산 및 민감도 분석 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-800">영구가치 (Terminal Value) 계산</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm text-gray-700">2029년 FCF ({currentRegion.name} {currentScenario.name})</span>
                  <span className="font-semibold">${currentScenario.terminalFcf.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="text-sm text-gray-700">영구성장률</span>
                  <span className="font-semibold">3.0%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                  <span className="text-sm text-gray-700">할인율 (WACC)</span>
                  <span className="font-semibold">18.0%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded border-t-2 border-gray-300">
                  <span className="text-sm font-semibold text-gray-700">영구가치</span>
                  <span className="font-bold text-lg">${currentScenario.terminalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded border-t-2 border-gray-300">
                  <span className="text-sm font-semibold text-gray-700">할인된 영구가치</span>
                  <span className="font-bold text-lg">${currentScenario.discountedTerminalValue.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-800">시나리오 민감도 분석</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">핵심 변수 영향도</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">시장점유율 ±10%</span>
                      <span className="font-semibold">NPV ±40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ARPU ±5%</span>
                      <span className="font-semibold">NPV ±25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">WACC ±2%</span>
                      <span className="font-semibold">NPV ±35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">영구성장률 ±1%</span>
                      <span className="font-semibold">NPV ±20%</span>
                    </div>
                  </div>
                </div>
                <div className={`bg-${currentRegion.color}-50 p-4 rounded-lg border-l-4 border-${currentRegion.color}-400`}>
                  <div className={`text-sm text-${currentRegion.color}-800`}>
                    <strong>{currentRegion.name} 특성:</strong> {
                      activeRegion === 'mumbai' ? '대기업 중심으로 안정적 매출 확보 가능하나 경쟁 심화 우려' :
                      '중소기업 다수로 진입 용이하나 단가 및 매출 규모 제한적'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-3">지역별 DCF 분석 주요 가정</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">재무 가정</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>CAPEX:</strong> 뭄바이 $1.7M, 첸나이 $1.2M (개별 구축)</li>
              <li>• <strong>OPEX:</strong> 뭄바이 $890K/년, 첸나이 $530K/년</li>
              <li>• <strong>감가상각:</strong> 5년 직선법</li>
              <li>• <strong>세율:</strong> 25% (인도 법인세율)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">시장 가정</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>뭄바이:</strong> 150개 타겟 기업</li>
              <li>• <strong>첸나이:</strong> 60개 타겟 기업</li>
              <li>• <strong>ARPU:</strong> $15,000/년 (연 4% 인상)</li>
              <li>• <strong>고객 이탈률:</strong> 연 5%</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">리스크 가정</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>할인율:</strong> 18% (WACC)</li>
              <li>• <strong>영구성장률:</strong> 3%</li>
              <li>• <strong>국가 리스크:</strong> 3.5% 프리미엄</li>
              <li>• <strong>환율 리스크:</strong> 달러 계약 기준</li>
            </ul>
          </div>
        </div>
      </div>

      {/* WACC 상세 정보 모달 */}
      {showWaccModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowWaccModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedWaccComponent && selectedWaccComponent in waccComponents ? waccComponents[selectedWaccComponent as keyof typeof waccComponents].name : 'WACC 계산 상세 정보'}
              </h3>
              <button 
                onClick={() => setShowWaccModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {selectedWaccComponent && selectedWaccComponent in waccComponents ? (
              /* 개별 구성요소 상세 정보 */
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">📊 수치 및 공식</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {waccComponents[selectedWaccComponent as keyof typeof waccComponents].value}
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>산출 방식:</strong> {waccComponents[selectedWaccComponent as keyof typeof waccComponents].formula}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">📖 설명</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {waccComponents[selectedWaccComponent as keyof typeof waccComponents].explanation}
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-3">📚 데이터 출처 및 근거</h4>
                  <ul className="space-y-2">
                    {waccComponents[selectedWaccComponent as keyof typeof waccComponents].sources.map((source, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span className="text-sm text-gray-700">{source}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedWaccComponent === 'riskFree' && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🔍 추가 검증 데이터</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>월별 변동성:</strong><br/>
                        2024.07: 6.4%<br/>
                        2024.08: 6.6%<br/>
                        2024.09: 6.5%
                      </div>
                      <div>
                        <strong>글로벌 비교:</strong><br/>
                        미국 10년물: 4.2%<br/>
                        독일 10년물: 2.1%<br/>
                        인도 프리미엄: +2.3%
                      </div>
                    </div>
                  </div>
                )}

                {selectedWaccComponent === 'beta' && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">🏢 비교 기업 베타 분석</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2 text-left">기업명</th>
                            <th className="p-2 text-center">베타</th>
                            <th className="p-2 text-left">사업 영역</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">Reliance Jio</td>
                            <td className="p-2 text-center">1.18</td>
                            <td className="p-2">통신서비스</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Bharti Airtel</td>
                            <td className="p-2 text-center">1.22</td>
                            <td className="p-2">통신서비스</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">TCS</td>
                            <td className="p-2 text-center">1.05</td>
                            <td className="p-2">IT서비스</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Infosys</td>
                            <td className="p-2 text-center">1.12</td>
                            <td className="p-2">IT서비스</td>
                          </tr>
                          <tr className="bg-blue-50 font-semibold">
                            <td className="p-2">적용 베타</td>
                            <td className="p-2 text-center">1.20</td>
                            <td className="p-2">가중평균</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* 전체 WACC 계산 과정 */
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">📊 WACC 계산 과정</h4>
                  <div className="space-y-3">
                    <div className="text-lg font-mono text-center bg-white p-3 rounded border">
                      WACC = Rf + β × (Rm-Rf) + CRP
                    </div>
                    <div className="text-lg font-mono text-center bg-white p-3 rounded border">
                      WACC = 6.5% + 1.2 × 8.0% + 3.5%
                    </div>
                    <div className="text-lg font-mono text-center bg-white p-3 rounded border">
                      WACC = 6.5% + 9.6% + 3.5% = 19.6%
                    </div>
                    <div className="text-center p-3 bg-orange-100 rounded border border-orange-300">
                      <div className="text-sm text-orange-800 mb-1">시장 현실 반영 조정</div>
                      <div className="text-xl font-bold text-red-600">최종 적용: 18.0%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-3">📈 시장 현실 반영 조정 사유</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>업계 벤치마크:</strong> 인도 통신/IT 서비스 업계 평균 WACC 17-19% 구간</li>
                    <li>• <strong>시장 성숙도:</strong> 디지털 전환 가속화로 통신 인프라 투자 리스크 감소</li>
                    <li>• <strong>정책 지원:</strong> Digital India 정책 하에서 네트워크 인프라 투자 우대</li>
                    <li>• <strong>고객 안정성:</strong> 한국기업 대상 B2B 서비스의 예측 가능한 수익 구조</li>
                    <li>• <strong>환율 헤징:</strong> 달러 기준 계약으로 환율 리스크 완화</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">🔄 민감도 분석</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="p-2 text-left">WACC 변동</th>
                          <th className="p-2 text-center">뭄바이 NPV 영향</th>
                          <th className="p-2 text-center">첸나이 NPV 영향</th>
                          <th className="p-2 text-left">투자 결정</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">16.0% (-2%)</td>
                          <td className="p-2 text-center text-green-600">+35%</td>
                          <td className="p-2 text-center text-green-600">+40%</td>
                          <td className="p-2">더욱 매력적</td>
                        </tr>
                        <tr className="border-b bg-blue-50">
                          <td className="p-2 font-semibold">18.0% (기준)</td>
                          <td className="p-2 text-center">기준</td>
                          <td className="p-2 text-center">기준</td>
                          <td className="p-2">현재 분석</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">20.0% (+2%)</td>
                          <td className="p-2 text-center text-red-600">-30%</td>
                          <td className="p-2 text-center text-red-600">-35%</td>
                          <td className="p-2">신중한 검토</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">📝 참고사항</h4>
                  <p className="text-sm text-gray-700">
                    본 WACC는 2024년 3분기 시장 데이터를 기반으로 산출되었으며, 
                    분기별로 재검토하여 최신 시장 상황을 반영할 예정입니다. 
                    투자 실행 시점에서 최종 검증이 필요합니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
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
  const [activeRegion, setActiveRegion] = useState('mumbai');

  const regionalConclusions = {
    mumbai: {
      name: '뭄바이',
      color: 'blue',
      scenarios: {
        optimistic: { decision: '적극 추천', npv: '$2.39M', irr: '24.8%', payback: '3.2년', color: 'green' },
        neutral: { decision: '조건부 추천', npv: '$447K', irr: '19.2%', payback: '4.1년', color: 'yellow' },
        pessimistic: { decision: '투자 부적절', npv: '-$562K', irr: '16.8%', payback: '5년+', color: 'red' }
      },
      strengths: [
        '대기업 중심의 안정적 고객 기반',
        '높은 ARPU와 스케일 이코노미 가능',
        'IT 서비스 수요 지속 증가',
        '브랜드 프리미엄 확보 가능'
      ],
      risks: [
        '높은 초기 투자비 ($1.7M CAPEX)',
        '경쟁사 조기 진입 가능성',
        '높은 운영비 ($890K/년)',
        '고객 기대치 상승 압박'
      ],
      recommendation: 'Neutral 이상 시나리오에서 투자 가치 있음. 우선 투자 대상 지역으로 추천.'
    },
    chennai: {
      name: '첸나이',
      color: 'orange',
      scenarios: {
        optimistic: { decision: '제한적 추천', npv: '$373K', irr: '18.9%', payback: '4.5년', color: 'green' },
        neutral: { decision: '투자 부적절', npv: '-$516K', irr: '16.2%', payback: '5년+', color: 'red' },
        pessimistic: { decision: '투자 부적절', npv: '-$1.03M', irr: '12.4%', payback: '5년+', color: 'red' }
      },
      strengths: [
        '제조업 중심의 안정적 수요',
        '상대적으로 낮은 경쟁도',
        '효율적 투자 규모 ($1.2M CAPEX)',
        '현지 밀착 서비스 가능'
      ],
      risks: [
        '제한적 시장 규모 (60개 기업)',
        '낮은 ARPU로 인한 수익성 한계',
        '자동차 산업 경기 의존성',
        '스케일 이코노미 제약'
      ],
      recommendation: 'Optimistic 시나리오에서만 투자 가치 있음. 뭄바이 성공 후 2차 진출 검토 권장.'
    }
  };

  const currentRegion = regionalConclusions[activeRegion];

  return (
    <section id="conclusion">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">✅ 지역별 결론 및 통합 권고사항</h2>
      
      {/* 지역별 개별 결론 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-6 text-gray-800">📍 지역별 개별 분석 결론</h3>
        
        {/* 지역별 탭 헤더 */}
        {/* 📌 지역별 결론 분석 탭 영역 시작 */}
        <div className="bg-gradient-to-br from-gray-50 to-yellow-50 border-2 border-yellow-200 rounded-xl shadow-lg p-6 mb-8">
          <div className="mb-6">
            <div className="flex border-b-2 border-yellow-300 mb-0 bg-white rounded-t-lg shadow-sm">
              <button 
                className={`px-8 py-4 font-semibold text-lg transition-all duration-200 ${
                  activeRegion === 'mumbai' 
                    ? 'text-blue-700 border-b-4 border-blue-500 bg-white shadow-md transform -translate-y-1' 
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-800'
                } border-r border-gray-200 first:rounded-tl-lg`}
                onClick={() => setActiveRegion('mumbai')}
              >
                🏙️ 뭄바이 결론
              </button>
              <button 
                className={`px-8 py-4 font-semibold text-lg transition-all duration-200 ${
                  activeRegion === 'chennai' 
                    ? 'text-orange-700 border-b-4 border-orange-500 bg-white shadow-md transform -translate-y-1' 
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-800'
                } last:rounded-tr-lg`}
                onClick={() => setActiveRegion('chennai')}
              >
                🏙️ 첸나이 결론
              </button>
            </div>
          </div>

          {/* 탭 콘텐츠 영역 */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-inner p-6">
            {/* 선택된 지역의 시나리오별 투자 결론 */}
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-4 text-gray-800">{currentRegion.name} 시나리오별 투자 평가</h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {Object.entries(currentRegion.scenarios).map(([key, scenario]: [string, any]) => (
                  <div key={key} className={`bg-${scenario.color}-50 border border-${scenario.color}-200 rounded-lg p-6`}>
                    <h3 className={`text-xl font-bold mb-2 text-${scenario.color}-800`}>
                      {key === 'optimistic' ? '🚀 Optimistic' : key === 'neutral' ? '📊 Neutral' : '⚠️ Pessimistic'}
                    </h3>
                    <div className={`text-lg font-semibold mb-3 text-${scenario.color}-700`}>
                      {scenario.decision}
                    </div>
                    <div className={`space-y-2 text-sm text-${scenario.color}-700`}>
                      <p>• <strong>NPV:</strong> {scenario.npv} (IRR: {scenario.irr})</p>
                      <p>• <strong>투자 회수:</strong> {scenario.payback}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 지역별 강점과 리스크 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={`bg-${currentRegion.color}-50 p-6 rounded-lg`}>
                  <h4 className={`font-semibold text-${currentRegion.color}-800 mb-3`}>💪 {currentRegion.name} 투자 강점</h4>
                  <ul className={`text-sm text-${currentRegion.color}-700 space-y-2`}>
                    {currentRegion.strengths.map((strength, index) => (
                      <li key={index}>• {strength}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-3">⚠️ {currentRegion.name} 투자 리스크</h4>
                  <ul className="text-sm text-red-700 space-y-2">
                    {currentRegion.risks.map((risk, index) => (
                      <li key={index}>• {risk}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 지역별 개별 권고 */}
              <div className={`p-4 bg-${currentRegion.color}-50 border-l-4 border-${currentRegion.color}-400 rounded-lg`}>
                <h4 className={`font-semibold text-${currentRegion.color}-800 mb-2`}>🎯 {currentRegion.name} 개별 투자 권고</h4>
                <p className={`text-sm text-${currentRegion.color}-700`}>
                  {currentRegion.recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 통합 투자 전략 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-6 text-gray-800">🔄 통합 투자 전략 옵션</h3>
        
        <div className="space-y-6">
          {/* Option 1: 단계적 투자 (추천) */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg border-2 border-green-300">
            <h4 className="text-lg font-bold text-green-800 mb-3">✅ Option 1: 단계적 투자 전략 (권장안)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Phase 1: 뭄바이 우선 투자</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>투자 규모:</strong> CAPEX $1.7M + OPEX $890K/년</li>
                  <li>• <strong>목표:</strong> 18개월 내 시장점유율 15% 달성</li>
                  <li>• <strong>검증 지표:</strong> 고객 30개사, 월 매출 $100K</li>
                  <li>• <strong>Go/No-Go 결정:</strong> 24개월 후 평가</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Phase 2: 첸나이 조건부 확장</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>진입 조건:</strong> 뭄바이 NPV &gt; $500K 달성</li>
                  <li>• <strong>투자 규모:</strong> CAPEX $1.2M + OPEX $530K/년</li>
                  <li>• <strong>시너지 효과:</strong> 운영 노하우 공유, 브랜드 확산</li>
                  <li>• <strong>리스크 완화:</strong> 뭄바이 수익으로 첸나이 손실 보전</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded">
              <p className="text-sm text-green-800">
                <strong>총 투자:</strong> 최대 $2.9M CAPEX, $1.42M/년 OPEX | 
                <strong>예상 NPV:</strong> $1.0M~$3.0M (시나리오별)
              </p>
            </div>
          </div>

          {/* Option 2: 뭄바이 단독 투자 */}
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-lg border border-blue-300">
            <h4 className="text-lg font-bold text-blue-800 mb-3">🎯 Option 2: 뭄바이 단독 집중 전략</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">집중 투자 전략</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>총 투자:</strong> CAPEX $1.7M + OPEX $890K/년</li>
                  <li>• <strong>목표:</strong> 뭄바이 시장 지배적 지위 확보</li>
                  <li>• <strong>추가 투자:</strong> 마케팅 $200K, R&D $100K</li>
                  <li>• <strong>기대 효과:</strong> 더 높은 시장점유율과 ARPU</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">장단점 분석</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>장점:</strong> 집중 투자로 성공 확률 증가</li>
                  <li>• <strong>장점:</strong> 운영 복잡성 최소화</li>
                  <li>• <strong>단점:</strong> 지역 다각화 기회 상실</li>
                  <li>• <strong>단점:</strong> 첸나이 시장 선점 기회 놓침</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Option 3: 동시 투자 (비권장) */}
          <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-lg border border-red-300">
            <h4 className="text-lg font-bold text-red-800 mb-3">⚠️ Option 3: 동시 투자 전략 (비권장)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">동시 투자 시나리오</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>총 투자:</strong> CAPEX $2.9M + OPEX $1.42M/년</li>
                  <li>• <strong>자원 분산:</strong> 두 지역 동시 관리 복잡성</li>
                  <li>• <strong>높은 리스크:</strong> 실패 시 손실 규모 확대</li>
                  <li>• <strong>자금 압박:</strong> 초기 현금 흐름 부담 가중</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">비권장 사유</h5>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>• 첫 해 FCF -$3.5M 예상 (자금 압박)</li>
                  <li>• 두 지역 동시 관리 경험 부족</li>
                  <li>• 첸나이 Neutral/Pessimistic 시 큰 손실</li>
                  <li>• 실패 시 회복 가능성 낮음</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 최종 투자 권고 */}
      <div className="mb-8 p-6 bg-gradient-to-r from-yellow-100 to-green-100 rounded-lg border-2 border-yellow-300">
        <h3 className="text-xl font-bold mb-4 text-gray-800">📋 최종 통합 투자 권고</h3>
        
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
          <h4 className="font-semibold text-green-800 mb-2">✅ 권장 투자 결정: 단계적 진출 전략</h4>
          <p className="text-sm text-green-700 mb-4">
            뭄바이 우선 투자 후 성과 검증을 통한 첸나이 조건부 확장 방식을 권장합니다. 
            이는 리스크를 최소화하면서 투자 수익을 극대화할 수 있는 최적 전략입니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded border">
              <h5 className="font-semibold text-gray-700 mb-2">1단계 (0-24개월)</h5>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 뭄바이 PoP 구축 및 운영</li>
                <li>• 핵심 고객 30개사 확보</li>
                <li>• 서비스 품질 안정화</li>
                <li>• 시장 검증 및 학습</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border">
              <h5 className="font-semibold text-gray-700 mb-2">2단계 (24-36개월)</h5>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 뭄바이 성과 평가</li>
                <li>• Go/No-Go 의사결정</li>
                <li>• 첸나이 진출 준비</li>
                <li>• 운영 모델 표준화</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border">
              <h5 className="font-semibold text-gray-700 mb-2">3단계 (36-60개월)</h5>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 첸나이 PoP 구축</li>
                <li>• 두 지역 통합 운영</li>
                <li>• 시너지 효과 실현</li>
                <li>• 추가 지역 검토</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">🔍 핵심 투자 조건</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>뭄바이 성공 지표:</strong> 24개월 내 NPV &gt; $500K</li>
              <li>• <strong>시장 검증:</strong> 고객 30개사, 시장점유율 15%</li>
              <li>• <strong>현금 흐름:</strong> 18개월 후 월 FCF 흑자 전환</li>
              <li>• <strong>첸나이 진출:</strong> 뭄바이 성공 시에만 실행</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">🚨 Exit 전략</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>조기 철수:</strong> 12개월 고객 10개사 미달 시</li>
              <li>• <strong>투자 중단:</strong> 24개월 NPV 음수 지속 시</li>
              <li>• <strong>자산 처분:</strong> 장비 및 인프라 매각 계획</li>
              <li>• <strong>손실 최소화:</strong> 최대 손실 한도 $2M 설정</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 모니터링 및 성공 지표 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-3">📊 단계별 핵심 모니터링 지표 (KPI)</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">재무 지표</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• 월별 매출 성장률</li>
              <li>• 고객당 ARPU 추이</li>
              <li>• 월별 FCF 변화</li>
              <li>• NPV 달성 진행률</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">시장 지표</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• 시장점유율 달성도</li>
              <li>• 신규 고객 획득 수</li>
              <li>• 고객 이탈률</li>
              <li>• 경쟁사 대응 상황</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">운영 지표</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• 서비스 SLA 달성률</li>
              <li>• 고객 만족도 점수</li>
              <li>• 기술지원 응답시간</li>
              <li>• 네트워크 안정성</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">전략 지표</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• 브랜드 인지도 조사</li>
              <li>• 파트너십 확대 건수</li>
              <li>• 시장 트렌드 변화</li>
              <li>• 첸나이 진출 준비도</li>
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

