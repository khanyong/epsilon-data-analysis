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
            <p className="text-sm text-gray-600">2025년 1월 ~ 2029년 12월 (5년)</p>
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📈 시나리오별 5년 매출 추정</h2>
      
      {/* 시나리오 선택 탭 스타일 */}
      <div className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Optimistic 시나리오 */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-green-800 mb-3">🚀 Optimistic 시나리오</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-green-100">
                    <th className="p-2 text-left font-semibold">연도</th>
                    <th className="p-2 text-center font-semibold">점유율</th>
                    <th className="p-2 text-center font-semibold">고객수</th>
                    <th className="p-2 text-center font-semibold">ARPU($)</th>
                    <th className="p-2 text-center font-semibold">매출($)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-green-100">
                    <td className="p-2 font-medium">2025</td>
                    <td className="p-2 text-center">7.2%</td>
                    <td className="p-2 text-center">21</td>
                    <td className="p-2 text-center">15,000</td>
                    <td className="p-2 text-center font-semibold text-green-700">315,000</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="p-2 font-medium">2026</td>
                    <td className="p-2 text-center">17.2%</td>
                    <td className="p-2 text-center">50</td>
                    <td className="p-2 text-center">15,600</td>
                    <td className="p-2 text-center font-semibold text-green-700">780,000</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="p-2 font-medium">2027</td>
                    <td className="p-2 text-center">27.2%</td>
                    <td className="p-2 text-center">79</td>
                    <td className="p-2 text-center">16,224</td>
                    <td className="p-2 text-center font-semibold text-green-700">1,282,000</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="p-2 font-medium">2028</td>
                    <td className="p-2 text-center">37.2%</td>
                    <td className="p-2 text-center">108</td>
                    <td className="p-2 text-center">16,873</td>
                    <td className="p-2 text-center font-semibold text-green-700">1,822,000</td>
                  </tr>
                  <tr className="border-b border-green-100 bg-green-50">
                    <td className="p-2 font-medium">2029</td>
                    <td className="p-2 text-center">49.0%</td>
                    <td className="p-2 text-center">142</td>
                    <td className="p-2 text-center">17,548</td>
                    <td className="p-2 text-center font-bold text-green-800">2,492,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-green-700">
              <strong>5년 누적 매출:</strong> $6.7M | <strong>평균 성장률:</strong> 68%
            </div>
          </div>

          {/* Neutral 시나리오 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-blue-800 mb-3">📊 Neutral 시나리오</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-2 text-left font-semibold">연도</th>
                    <th className="p-2 text-center font-semibold">점유율</th>
                    <th className="p-2 text-center font-semibold">고객수</th>
                    <th className="p-2 text-center font-semibold">ARPU($)</th>
                    <th className="p-2 text-center font-semibold">매출($)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-blue-100">
                    <td className="p-2 font-medium">2025</td>
                    <td className="p-2 text-center">5.5%</td>
                    <td className="p-2 text-center">16</td>
                    <td className="p-2 text-center">15,000</td>
                    <td className="p-2 text-center font-semibold text-blue-700">240,000</td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="p-2 font-medium">2026</td>
                    <td className="p-2 text-center">12.5%</td>
                    <td className="p-2 text-center">36</td>
                    <td className="p-2 text-center">15,600</td>
                    <td className="p-2 text-center font-semibold text-blue-700">562,000</td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="p-2 font-medium">2027</td>
                    <td className="p-2 text-center">19.5%</td>
                    <td className="p-2 text-center">57</td>
                    <td className="p-2 text-center">16,224</td>
                    <td className="p-2 text-center font-semibold text-blue-700">925,000</td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="p-2 font-medium">2028</td>
                    <td className="p-2 text-center">26.5%</td>
                    <td className="p-2 text-center">77</td>
                    <td className="p-2 text-center">16,873</td>
                    <td className="p-2 text-center font-semibold text-blue-700">1,299,000</td>
                  </tr>
                  <tr className="border-b border-blue-100 bg-blue-50">
                    <td className="p-2 font-medium">2029</td>
                    <td className="p-2 text-center">35.0%</td>
                    <td className="p-2 text-center">102</td>
                    <td className="p-2 text-center">17,548</td>
                    <td className="p-2 text-center font-bold text-blue-800">1,790,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-blue-700">
              <strong>5년 누적 매출:</strong> $4.8M | <strong>평균 성장률:</strong> 48%
            </div>
          </div>

          {/* Pessimistic 시나리오 */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-red-800 mb-3">⚠️ Pessimistic 시나리오</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-red-100">
                    <th className="p-2 text-left font-semibold">연도</th>
                    <th className="p-2 text-center font-semibold">점유율</th>
                    <th className="p-2 text-center font-semibold">고객수</th>
                    <th className="p-2 text-center font-semibold">ARPU($)</th>
                    <th className="p-2 text-center font-semibold">매출($)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-red-100">
                    <td className="p-2 font-medium">2025</td>
                    <td className="p-2 text-center">3.4%</td>
                    <td className="p-2 text-center">10</td>
                    <td className="p-2 text-center">15,000</td>
                    <td className="p-2 text-center font-semibold text-red-700">150,000</td>
                  </tr>
                  <tr className="border-b border-red-100">
                    <td className="p-2 font-medium">2026</td>
                    <td className="p-2 text-center">9.4%</td>
                    <td className="p-2 text-center">27</td>
                    <td className="p-2 text-center">15,600</td>
                    <td className="p-2 text-center font-semibold text-red-700">421,000</td>
                  </tr>
                  <tr className="border-b border-red-100">
                    <td className="p-2 font-medium">2027</td>
                    <td className="p-2 text-center">15.4%</td>
                    <td className="p-2 text-center">45</td>
                    <td className="p-2 text-center">16,224</td>
                    <td className="p-2 text-center font-semibold text-red-700">730,000</td>
                  </tr>
                  <tr className="border-b border-red-100">
                    <td className="p-2 font-medium">2028</td>
                    <td className="p-2 text-center">21.4%</td>
                    <td className="p-2 text-center">62</td>
                    <td className="p-2 text-center">16,873</td>
                    <td className="p-2 text-center font-semibold text-red-700">1,046,000</td>
                  </tr>
                  <tr className="border-b border-red-100 bg-red-50">
                    <td className="p-2 font-medium">2029</td>
                    <td className="p-2 text-center">29.0%</td>
                    <td className="p-2 text-center">84</td>
                    <td className="p-2 text-center">17,548</td>
                    <td className="p-2 text-center font-bold text-red-800">1,474,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-red-700">
              <strong>5년 누적 매출:</strong> $3.8M | <strong>평균 성장률:</strong> 31%
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-3">매출 추정 방법론</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">시장점유율 계산</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>총 타겟:</strong> 뭄바이 210개 + 첸나이 80개 = 290개 기업</li>
              <li>• <strong>가중평균:</strong> 각 지역별 점유율을 기업 수로 가중평균</li>
              <li>• <strong>고객 이탈률:</strong> 연 5% 적용 (신규 고객으로 보완)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">ARPU 증가 가정</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>인플레이션 반영:</strong> 연 4% 인상 (인도 평균 6.2%보다 보수적)</li>
              <li>• <strong>서비스 고도화:</strong> 부가서비스 추가로 단가 상승</li>
              <li>• <strong>환율 리스크:</strong> 달러 기준 계약으로 최소화</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <h5 className="font-semibold text-blue-800 mb-2">시나리오별 주요 차이점</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <strong className="text-green-700">Optimistic:</strong>
              <span className="text-gray-600"> 한국기업 추가 진출 활발, 네트워크 수요 급증, 경쟁 제한적</span>
            </div>
            <div>
              <strong className="text-blue-700">Neutral:</strong>
              <span className="text-gray-600"> 시장 평균 성장률, 적정 경쟁 환경, 안정적 수요 증가</span>
            </div>
            <div>
              <strong className="text-red-700">Pessimistic:</strong>
              <span className="text-gray-600"> 경기 둔화, 강력한 경쟁사 진입, 가격 경쟁 심화</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionDcf() {
  return (
    <section id="dcf">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 시나리오별 DCF 분석 기반 NPV/IRR</h2>
      
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

      {/* 시나리오별 DCF 결과 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">시나리오별 투자 평가 지표</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Optimistic 시나리오 DCF */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
              <h4 className="text-lg font-bold text-green-800">Optimistic 시나리오</h4>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">NPV</div>
                <div className="text-2xl font-bold">$4.8M</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">IRR</div>
                <div className="text-2xl font-bold">28.7%</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">회수기간</div>
                <div className="text-2xl font-bold">3.8년</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">PI</div>
                <div className="text-2xl font-bold">3.8x</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-100 rounded">
              <div className="text-xs text-green-800">
                <strong>5년 누적 FCF:</strong> $3.9M<br/>
                <strong>영구가치:</strong> $9.8M<br/>
                <strong>투자 결정:</strong> <span className="font-bold">강력 추천</span>
              </div>
            </div>
          </div>

          {/* Neutral 시나리오 DCF */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
              <h4 className="text-lg font-bold text-blue-800">Neutral 시나리오</h4>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">NPV</div>
                <div className="text-2xl font-bold">$2.1M</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">IRR</div>
                <div className="text-2xl font-bold">22.4%</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">회수기간</div>
                <div className="text-2xl font-bold">4.3년</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">PI</div>
                <div className="text-2xl font-bold">2.2x</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded">
              <div className="text-xs text-blue-800">
                <strong>5년 누적 FCF:</strong> $2.1M<br/>
                <strong>영구가치:</strong> $7.1M<br/>
                <strong>투자 결정:</strong> <span className="font-bold">추천</span>
              </div>
            </div>
          </div>

          {/* Pessimistic 시나리오 DCF */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
              <h4 className="text-lg font-bold text-red-800">Pessimistic 시나리오</h4>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">NPV</div>
                <div className="text-2xl font-bold">$0.3M</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">IRR</div>
                <div className="text-2xl font-bold">19.1%</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">회수기간</div>
                <div className="text-2xl font-bold">4.8년</div>
              </div>
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">PI</div>
                <div className="text-2xl font-bold">1.2x</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-100 rounded">
              <div className="text-xs text-red-800">
                <strong>5년 누적 FCF:</strong> $1.1M<br/>
                <strong>영구가치:</strong> $5.8M<br/>
                <strong>투자 결정:</strong> <span className="font-bold">신중 검토</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 DCF 계산 - Neutral 시나리오 기준 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">상세 현금흐름 분석 (Neutral 시나리오 기준)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
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
                <td className="p-3 text-center">240,000</td>
                <td className="p-3 text-center">562,000</td>
                <td className="p-3 text-center">925,000</td>
                <td className="p-3 text-center">1,299,000</td>
                <td className="p-3 text-center">1,790,000</td>
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
                <td className="p-3 text-center text-red-600">-450,000</td>
                <td className="p-3 text-center text-red-600">-128,000</td>
                <td className="p-3 text-center">235,000</td>
                <td className="p-3 text-center">609,000</td>
                <td className="p-3 text-center">1,100,000</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-purple-50">세금 (25%)</td>
                <td className="p-3 text-center">0</td>
                <td className="p-3 text-center">0</td>
                <td className="p-3 text-center">58,750</td>
                <td className="p-3 text-center">152,250</td>
                <td className="p-3 text-center">275,000</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium bg-yellow-50">세후이익</td>
                <td className="p-3 text-center text-red-600">-450,000</td>
                <td className="p-3 text-center text-red-600">-128,000</td>
                <td className="p-3 text-center">176,250</td>
                <td className="p-3 text-center">456,750</td>
                <td className="p-3 text-center">825,000</td>
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
                <td className="p-3 text-center">-24,000</td>
                <td className="p-3 text-center">-32,200</td>
                <td className="p-3 text-center">-36,300</td>
                <td className="p-3 text-center">-37,400</td>
                <td className="p-3 text-center">-49,100</td>
              </tr>
              <tr className="border-b bg-gray-100">
                <td className="p-3 font-bold">자유현금흐름 (FCF)</td>
                <td className="p-3 text-center font-bold text-red-600">-1,834,000</td>
                <td className="p-3 text-center font-bold text-green-600">179,800</td>
                <td className="p-3 text-center font-bold text-green-600">479,950</td>
                <td className="p-3 text-center font-bold text-green-600">759,350</td>
                <td className="p-3 text-center font-bold text-green-600">1,115,900</td>
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
                <td className="p-3 text-center font-bold text-red-600">-1,834,000</td>
                <td className="p-3 text-center font-bold text-green-600">152,373</td>
                <td className="p-3 text-center font-bold text-green-600">344,624</td>
                <td className="p-3 text-center font-bold text-green-600">462,444</td>
                <td className="p-3 text-center font-bold text-green-600">575,804</td>
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
              <span className="text-sm text-gray-700">2029년 FCF (Neutral)</span>
              <span className="font-semibold">$1,115,900</span>
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
              <span className="font-bold text-lg">$7,439,333</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded border-t-2 border-gray-300">
              <span className="text-sm font-semibold text-gray-700">할인된 영구가치</span>
              <span className="font-bold text-lg">$3,838,684</span>
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
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <div className="text-sm text-yellow-800">
                <strong>리스크 요인:</strong> 시장점유율 확보가 가장 중요한 성공 요인으로, 
                초기 마케팅 투자와 서비스 품질이 핵심
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-3">DCF 분석 주요 가정</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">재무 가정</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>영구성장률:</strong> 3.0% (인도 장기 GDP 성장률)</li>
              <li>• <strong>세율:</strong> 25% (인도 법인세율)</li>
              <li>• <strong>감가상각:</strong> 20년 직선법</li>
              <li>• <strong>운전자본:</strong> 매출의 10%</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">시장 가정</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>ARPU 성장:</strong> 연 4% (인플레이션 대비 보수적)</li>
              <li>• <strong>고객 이탈률:</strong> 연 5%</li>
              <li>• <strong>경쟁 심화:</strong> 2027년부터 본격화</li>
              <li>• <strong>시장 성숙:</strong> 2029년 이후 안정화</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">리스크 가정</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• <strong>국가 리스크:</strong> 3.5% 프리미엄</li>
              <li>• <strong>기술 리스크:</strong> 베타 1.2 적용</li>
              <li>• <strong>환율 리스크:</strong> 달러 계약으로 최소화</li>
              <li>• <strong>규제 리스크:</strong> 안정적 환경 가정</li>
            </ul>
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">✅ 시나리오별 결론 및 권고사항</h2>
      
      {/* 시나리오별 투자 권고 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">🚀 Optimistic: 강력 추천</h3>
          <div className="space-y-2 text-sm opacity-90">
            <p>• NPV: $4.8M (IRR: 28.7%)</p>
            <p>• 투자 회수: 3.8년</p>
            <p>• 한국기업 진출 가속화 시</p>
            <p>• 조기 시장 진입 필수</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">📊 Neutral: 추천</h3>
          <div className="space-y-2 text-sm opacity-90">
            <p>• NPV: $2.1M (IRR: 22.4%)</p>
            <p>• 투자 회수: 4.3년</p>
            <p>• 안정적 시장 성장 시</p>
            <p>• 단계적 투자 진행</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">⚠️ Pessimistic: 신중 검토</h3>
          <div className="space-y-2 text-sm opacity-90">
            <p>• NPV: $0.3M (IRR: 19.1%)</p>
            <p>• 투자 회수: 4.8년</p>
            <p>• 경기 침체 또는 경쟁 심화 시</p>
            <p>• 리스크 관리 방안 필수</p>
          </div>
        </div>
      </div>

      {/* 핵심 성공 요인 */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">🎯 핵심 성공 요인 (Critical Success Factors)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">시장 진입 전략</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• <strong>초기 5년이 결정적:</strong> 시장점유율 10% 이상 확보 필수</li>
              <li>• <strong>한국기업 네트워크 활용:</strong> 한국상공회의소, 업종별 협회 협력</li>
              <li>• <strong>로컬 파트너십:</strong> 데이터센터, ISP 등과 전략적 제휴</li>
              <li>• <strong>차별화된 서비스:</strong> 한국어 지원, 24/7 커스터마이징</li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3">리스크 관리 방안</h4>
            <ul className="text-sm text-green-700 space-y-2">
              <li>• <strong>점진적 투자:</strong> 1차 뭄바이 집중, 성과 검증 후 첸나이 확장</li>
              <li>• <strong>환율 헤징:</strong> 주요 계약의 70% 이상 달러화 고정</li>
              <li>• <strong>경쟁 대응:</strong> 가격보다 서비스 품질로 차별화</li>
              <li>• <strong>규제 리스크:</strong> 현지 법무법인과 사전 검토</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 최종 투자 권고 */}
      <div className="mb-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border-2 border-green-300">
        <h3 className="text-xl font-bold mb-4 text-gray-800">📋 최종 투자 권고</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">✅ 투자 결정: GO (조건부 승인)</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 모든 시나리오에서 NPV &gt; 0 (투자 가치 인정)</li>
              <li>• IRR 19.1~28.7% (WACC 18% 대비 우수)</li>
              <li>• 인도 시장 성장 잠재력 높음</li>
              <li>• 한국기업 진출 지속 확대 예상</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">⚠️ 투자 조건</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 단계적 투자 접근 (뭄바이 우선)</li>
              <li>• 초기 2년간 분기별 성과 모니터링</li>
              <li>• 시장점유율 5% 미달 시 전략 재검토</li>
              <li>• 경쟁사 진입 시 대응 방안 수립</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 단계별 실행 계획 */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800">📅 단계별 실행 계획</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-800 mb-2">Phase 1: 준비단계 (6개월)</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 현지 법인 설립 및 라이선스 취득</li>
              <li>• 뭄바이 데이터센터 사이트 확정</li>
              <li>• 핵심 인력 채용 (한국인 2명, 현지 3명)</li>
              <li>• 주요 한국기업 20개사 사전 MOU</li>
              <li>• 로컬 파트너 3개사 제휴 체결</li>
            </ul>
            <div className="mt-3 p-2 bg-blue-100 rounded">
              <div className="text-xs text-blue-800">
                <strong>예산:</strong> $200K | <strong>목표:</strong> 사업 기반 구축
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-800 mb-2">Phase 2: 구축단계 (12개월)</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 뭄바이 네트워크 인프라 구축 완료</li>
              <li>• 베타 고객 10개사 서비스 개시</li>
              <li>• 서비스 품질 최적화 및 안정화</li>
              <li>• 마케팅 캠페인 본격 시작</li>
              <li>• 첸나이 진출 타당성 재검토</li>
            </ul>
            <div className="mt-3 p-2 bg-green-100 rounded">
              <div className="text-xs text-green-800">
                <strong>예산:</strong> $1.5M | <strong>목표:</strong> 시장점유율 5% 달성
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-semibold text-orange-800 mb-2">Phase 3: 확장단계 (36개월)</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• 뭄바이 고객 기반 100개사 확대</li>
              <li>• 첸나이 진출 및 인프라 구축</li>
              <li>• 부가서비스 포트폴리오 확장</li>
              <li>• 경쟁사 대응 전략 실행</li>
              <li>• 추가 지역 진출 검토</li>
            </ul>
            <div className="mt-3 p-2 bg-orange-100 rounded">
              <div className="text-xs text-orange-800">
                <strong>예산:</strong> $500K | <strong>목표:</strong> 시장점유율 25% 달성
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모니터링 지표 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-3">📊 핵심 모니터링 지표 (KPI)</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">재무 지표</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• 월별 매출 성장률</li>
              <li>• 고객당 수익성 (ARPU)</li>
              <li>• 현금흐름 (FCF)</li>
              <li>• 투자 회수 진행률</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">시장 지표</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• 시장점유율 진행률</li>
              <li>• 신규 고객 획득 수</li>
              <li>• 고객 이탈률</li>
              <li>• 경쟁사 동향</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">운영 지표</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• 서비스 가용률 (SLA)</li>
              <li>• 고객 만족도</li>
              <li>• 기술지원 응답시간</li>
              <li>• 네트워크 성능</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">리스크 지표</h5>
            <ul className="text-gray-600 space-y-1">
              <li>• 환율 변동 영향</li>
              <li>• 규제 변화 모니터링</li>
              <li>• 고객 집중도 리스크</li>
              <li>• 기술 트렌드 변화</li>
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
