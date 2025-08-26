import React, { useState } from 'react';
import { Globe, TrendingUp, Server, Network, DollarSign, AlertTriangle, MapPin, Activity, Building, Building2, ArrowRight, Info, X, Calendar } from 'lucide-react';

export function EuropeDataCenterMarket() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showTrafficModal, setShowTrafficModal] = useState(false);
  const [showHyperscalerModal, setShowHyperscalerModal] = useState(false);
  const [showFlapEvolutionModal, setShowFlapEvolutionModal] = useState(false);

  return (
    <div className="space-y-8">
        <div className="pdf-section">
          <div className="mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">[추가] 유럽 DC 시장 분석: 런던 집중 리스크 분산 전략</h1>
              <p className="text-gray-600">유럽 Red Ocean 시장에서 KT의 런던 의존도 완화 및 대안 거점 구축 방안</p>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded">
                  기업비밀Ⅱ급
                </span>
              </div>
            </div>
          </div>
        </div>

      {/* Executive Summary */}
      <div id="europe-overview" className="pdf-section bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-purple-600" />
          Executive Summary
        </h2>
        
        {/* 논리적 흐름도 */}
        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-300">
          <h3 className="font-bold text-red-800 mb-3">⚠️ 핵심 문제와 해결 방향</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
            <div className="bg-red-100 p-2 rounded text-center border border-red-300">
              <div className="font-bold text-red-700">1. 문제</div>
              <div className="text-gray-600">런던 17개 PoP 집중</div>
            </div>
            <div className="bg-orange-100 p-2 rounded text-center">
              <div className="font-bold text-orange-700">2. 리스크</div>
              <div className="text-gray-600">Red Ocean 경쟁</div>
            </div>
            <div className="bg-yellow-100 p-2 rounded text-center">
              <div className="font-bold text-yellow-700">3. 대안</div>
              <div className="text-gray-600">프랑크푸르트/마르세유</div>
            </div>
            <div className="bg-green-100 p-2 rounded text-center">
              <div className="font-bold text-green-700">4. 전략</div>
              <div className="text-gray-600">단계적 이전</div>
            </div>
            <div className="bg-blue-100 p-2 rounded text-center">
              <div className="font-bold text-blue-700">5. 실행</div>
              <div className="text-gray-600">파트너십 재구성</div>
            </div>
          </div>
        </div>
        
        <div className="prose max-w-none text-gray-700 mb-6">
          <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 mb-4">
            <p className="text-sm font-bold text-gray-800">🚨 긴급성:</p>
            <p className="text-sm">
              KT는 현재 유럽 17개 PoP 전체를 런던에 집중 운영 중이며, 이는 심각한 리스크입니다.
              런던은 이미 포화 상태의 Red Ocean이며, Brexit 이후 비용 증가와 규제 불확실성이 지속되고 있습니다.
            </p>
          </div>
          <p className="text-base leading-relaxed">
            본 보고서는 <strong>런던 의존도를 단계적으로 완화</strong>하고,
            <strong>프랑크푸르트-마르세유 축</strong>으로 거점을 재편하는 구체적 실행 방안을 제시합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">🔴 런던 탈피 3단계 전략</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 font-bold">Phase 1.</span>
                <span className="font-semibold">즉시 실행 (3개월)</span>
                <div className="ml-6 text-xs text-gray-600">프랑크푸르트 DE-CIX 직접 연결 + 임시 PoP 구축</div>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 font-bold">Phase 2.</span>
                <span className="font-semibold">단기 전환 (6개월)</span>
                <div className="ml-6 text-xs text-gray-600">마르세유 해저케이블 IRU 확보 + 아시아 직접 연결</div>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2 font-bold">Phase 3.</span>
                <span className="font-semibold">완전 재편 (12개월)</span>
                <div className="ml-6 text-xs text-gray-600">런던 17개 PoP → 5개로 축소, 나머지는 재배치</div>
              </li>
            </ul>
          </div>
          
          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <h3 className="font-bold text-red-800 mb-4">⚠️ 런던 집중 리스크</h3>
            <table className="w-full">
              <tbody className="divide-y divide-red-200">
                <tr>
                  <td className="py-2 text-gray-600">런던 DC 비용 증가율</td>
                  <td className="py-2 font-semibold text-right text-red-600">+23% (2년간)</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">경쟁 밀도</td>
                  <td className="py-2 font-semibold text-right text-red-600">극심 (300+ 사업자)</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Brexit 규제 불확실성</td>
                  <td className="py-2 font-semibold text-right text-orange-600">높음</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">대안 거점 비용 우위</td>
                  <td className="py-2 font-semibold text-right text-green-600">-40% (프랑크푸르트)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 1. 글로벌데이터 시장 환경 변화와 KT그룹 현황 */}
      <div id="europe-global-market" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-indigo-600" />
          1. 현황 진단: 런던 17개 PoP 집중의 문제점
        </h2>

        <div className="space-y-6">
          {/* 데이터센터 관련 약어 설명 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">📌 데이터센터 시장 주요 약어:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
              <div><strong>DC</strong>: Data Center (데이터센터)</div>
              <div><strong>MW</strong>: Megawatt (메가와트, 1MW = 1,000kW)</div>
              <div><strong>FLAP</strong>: Frankfurt, London, Amsterdam, Paris</div>
              <div><strong>FLAP-D</strong>: FLAP + Dublin (더블린 추가)</div>
              <div><strong>ROI</strong>: Return on Investment (투자수익률)</div>
              <div><strong>CAGR</strong>: Compound Annual Growth Rate (연평균성장률)</div>
              <div><strong>B2B</strong>: Business to Business (기업 간 거래)</div>
              <div><strong>Hyperscaler</strong>: 초대형 클라우드 사업자 (AWS, Google, MS 등)</div>
              <div><strong>Colo</strong>: Colocation (상면 임대 서비스)</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">1.1 KT 런던 PoP 현황 (전체 65개 중 17개 집중)</h3>
            
            {/* 런던 PoP 분포 현황 */}
            <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-bold text-red-800 mb-3">🚨 런던 17개 PoP 상세 분포</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 주요 DC별 분포 */}
                <div className="bg-white p-3 rounded border border-red-100">
                  <p className="font-semibold text-gray-800 mb-2 text-sm">주요 데이터센터별 분포:</p>
                  <ul className="text-xs space-y-1">
                    <li className="flex justify-between">
                      <span>• Telehouse (E14 지역)</span>
                      <span className="font-bold text-red-600">3개</span>
                    </li>
                    <li className="flex justify-between">
                      <span>• Equinix (LD5, LD8, LD9)</span>
                      <span className="font-bold text-red-600">3개</span>
                    </li>
                    <li className="flex justify-between">
                      <span>• Global Switch (East, North)</span>
                      <span className="font-bold text-orange-600">2개</span>
                    </li>
                    <li className="flex justify-between">
                      <span>• Digital Realty</span>
                      <span className="font-bold text-orange-600">2개</span>
                    </li>
                    <li className="flex justify-between">
                      <span>• 기타 (Interxion, Tata 등)</span>
                      <span className="font-bold">7개</span>
                    </li>
                  </ul>
                </div>
                
                {/* 지역별 집중도 */}
                <div className="bg-white p-3 rounded border border-red-100">
                  <p className="font-semibold text-gray-800 mb-2 text-sm">지역별 집중도:</p>
                  <ul className="text-xs space-y-1">
                    <li className="flex justify-between">
                      <span>• E14 (Docklands/Canary Wharf)</span>
                      <span className="font-bold text-red-600">9개 (53%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>• EC2A (City of London)</span>
                      <span className="font-bold">2개</span>
                    </li>
                    <li className="flex justify-between">
                      <span>• E1 (East London)</span>
                      <span className="font-bold">1개</span>
                    </li>
                    <li className="flex justify-between">
                      <span>• EC1V (Islington)</span>
                      <span className="font-bold">1개</span>
                    </li>
                    <li className="flex justify-between">
                      <span>• 외곽 (Slough, Chessington)</span>
                      <span className="font-bold">2개</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-3 p-2 bg-yellow-50 rounded">
                <p className="text-xs text-gray-700">
                  <strong>핵심 문제:</strong> E14 Docklands 지역에 9개 PoP(53%)가 집중되어 있어 
                  지역적 재해나 전력 문제 발생 시 심각한 서비스 중단 위험
                </p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">1.2 시장 Dynamics 변화</h3>
            
            <div className="bg-indigo-50 rounded-lg p-6 mb-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-800">Hyperscaler의 시장 주도권 확대</h4>
                <button
                  onClick={() => setShowHyperscalerModal(true)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                >
                  <Info className="w-4 h-4" />
                  상세 근거
                </button>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>글로벌 해저케이블 대역폭의 <strong>71%(2024년)</strong> 사용, 2027년 <strong>80%</strong> 예상</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Big Tech 4사가 2021-2024년 <strong>총 20억 달러</strong> 해저케이블 직접 투자</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>통신사 의존도 감소, 자체 케이블 소유 비중 <strong>2016년 10% → 2024년 66%</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-800">아시아-유럽 트래픽 중심축 이동</h4>
                <button
                  onClick={() => setShowTrafficModal(true)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                >
                  <Info className="w-4 h-4" />
                  상세 근거
                </button>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>글로벌 인터넷 트래픽의 <strong>60%가 아시아-태평양</strong> 발생 (2024년 기준)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>싱가포르-마르세유 주요 케이블 총 용량 <strong>624 Tbps</strong> (SMW6, 2Africa, PEACE 합계)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>홍해 우회로 수요 증가로 마르세유-두바이-싱가포르 경로 활성화</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">1.3 전체 PoP 분포 vs 런던 집중도</h3>
            
            {/* 전체 vs 런던 비교 */}
            <div className="mb-4 overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">지역</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">PoP 수</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">비율</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">주요 도시</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🇬🇧 런던</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold text-red-600">17</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold text-red-600">26.2%</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">E14 Docklands (9), City (4), 외곽 (4)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🌏 아시아태평양</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">28</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">43.1%</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">싱가포르, 홍콩, 도쿄, 시드니 등</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🌍 유럽(런던 제외)</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">8</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">12.3%</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">파리, 프랑크푸르트, 암스테르담 등</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🌎 미주</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">12</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">18.5%</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">뉴욕, LA, 시카고 등</td>
                  </tr>
                  <tr className="bg-yellow-50 font-bold">
                    <td className="border border-gray-300 px-4 py-2">합계</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">65</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">100%</td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-3 bg-red-100 rounded-lg">
              <p className="text-sm font-bold text-red-800 mb-2">⚠️ 핵심 리스크:</p>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• 전체 유럽 25개 PoP 중 17개(68%)가 런던에만 집중</li>
                <li>• 글로벌 65개 PoP 중 26.2%가 단일 도시에 집중 (비정상적 편중)</li>
                <li>• Brexit 이후 EU 시장 접근성 악화에도 불구하고 런던 의존 지속</li>
              </ul>
            </div>
          </div>
          
          {/* Section Conclusion */}
          <div className="mt-6 p-4 bg-red-100 rounded-lg">
            <p className="text-sm font-bold text-red-800 mb-2">🚨 핵심 문제점:</p>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• 런던 17개 PoP 전체 집중 = 단일 실패점(Single Point of Failure)</li>
              <li>• 런던은 이미 극도의 Red Ocean (비용↑, 경쟁↑, 성장 한계)</li>
              <li>• Brexit 이후 불확실성 증가, EU 시장 접근성 악화</li>
            </ul>
          </div>
        </div>
        
        {/* Section Transition */}
        <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
          <p className="text-sm font-semibold text-gray-700">
            → 다음 섹션: 런던의 문제를 확인했다면, 이제 대안이 될 수 있는 유럽 다른 거점들을 분석합니다.
          </p>
        </div>
      </div>

      {/* 2. 유럽 데이터센터 시장 구조 변화 */}
      <div id="europe-market-structure" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Server className="w-6 h-6 mr-2 text-blue-600" />
          2. 유럽 시장 Red Ocean 분석: 런던 외 대안은?
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.1 FLAP-D 시장 현황</h3>
            
            <div className="mb-4 p-4 bg-amber-50 rounded-lg">
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>유럽 데이터센터 시장의 재편:</strong> 전통적 FLAP(Frankfurt, London, Amsterdam, Paris)에서 
                  Dublin을 포함한 FLAP-D로 진화한 2024년 기준 현황입니다.
                </p>
                <button
                  onClick={() => setShowFlapEvolutionModal(true)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm ml-4"
                >
                  <Calendar className="w-4 h-4" />
                  진화 타임라인
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">도시</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">2024년 실제 운영</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">건설중/계획</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">2025년 예상</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">주요 특징</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🇬🇧 런던</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">1,189 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">1,678 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2,867 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-xs">
                      <div>유럽 최대 DC 허브</div>
                      <div className="mt-1">
                        <a href="https://www.cbre.com/insights/reports/emea-data-centres-q3-2024" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline">
                          CBRE Q3 2024 Report ↗
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🇩🇪 프랑크푸르트</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">870 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold text-blue-600">542 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">1,412 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-xs">
                      <div>DE-CIX 18.11 Tbps 트래픽</div>
                      <div className="mt-1">
                        <a href="https://www.de-cix.net/en/locations/frankfurt/statistics" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline">
                          DE-CIX Statistics ↗
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🇳🇱 암스테르담</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">827 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">205 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">1,032 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-xs">
                      <div>AMS-IX 14+ Tbps</div>
                      <div className="mt-1">
                        <a href="https://www.ams-ix.net/ams/documentation/total-stats" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline">
                          AMS-IX Statistics ↗
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🇫🇷 파리</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">530 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">173 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">703 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-xs">
                      <div>마르세유 연결 남유럽 게이트웨이</div>
                      <div className="mt-1">
                        <a href="https://www.franceix.net/en/technical/traffic-statistics/" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline">
                          France-IX Stats ↗
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🇮🇪 더블린</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold text-green-600">574 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-red-600">제한적</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">574 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-xs">
                      <div>EirGrid 신규 DC 모라토리엄</div>
                      <div className="mt-1">
                        <a href="https://www.eirgridgroup.com/site-files/library/EirGrid/EirGrid_DataCentreConnectionPolicy_ApprovedMay2024.pdf" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline">
                          EirGrid Policy 2024 ↗
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700 font-semibold mb-3">
                데이터 출처 및 근거:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="border-l-3 border-blue-400 pl-3">
                  <p className="font-semibold text-gray-700">런던 (1,189MW + 1,678MW)</p>
                  <ul className="mt-1 space-y-1">
                    <li>• <a href="https://www.cbre.com/insights/reports/emea-data-centres-q3-2024" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      CBRE European Data Centres Q3 2024 ↗
                    </a></li>
                    <li>• <a href="https://www.jll.co.uk/en/trends-and-insights/research/uk-data-centre-market-report" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      JLL UK Data Centre Market 2024 ↗
                    </a></li>
                    <li>• <a href="https://www.savills.com/research_articles/229130/349584-0" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Savills London DC Report ↗
                    </a></li>
                  </ul>
                </div>
                <div className="border-l-3 border-green-400 pl-3">
                  <p className="font-semibold text-gray-700">프랑크푸르트 (870MW + 542MW)</p>
                  <ul className="mt-1 space-y-1">
                    <li>• <a href="https://www.de-cix.net/en/locations/frankfurt/statistics" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      DE-CIX Traffic Statistics 2024 ↗
                    </a></li>
                    <li>• <a href="https://www.datacenterknowledge.com/markets/frankfurt-data-center-market" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Frankfurt DC Market Analysis ↗
                    </a></li>
                    <li>• <a href="https://www.cushmanwakefield.com/en/germany/insights/germany-data-centre-market-report" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Cushman & Wakefield Germany ↗
                    </a></li>
                  </ul>
                </div>
                <div className="border-l-3 border-orange-400 pl-3">
                  <p className="font-semibold text-gray-700">암스테르담 (827MW + 205MW)</p>
                  <ul className="mt-1 space-y-1">
                    <li>• <a href="https://www.dutchdatacenters.nl/en/publications/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Dutch Data Center Association 2024 ↗
                    </a></li>
                    <li>• <a href="https://www.ams-ix.net/ams/documentation/total-stats" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      AMS-IX Traffic Report ↗
                    </a></li>
                    <li>• <a href="https://www.pb7.nl/reports/amsterdam-data-center-market-report-2024" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Netherlands DC Market Overview ↗
                    </a></li>
                  </ul>
                </div>
                <div className="border-l-3 border-purple-400 pl-3">
                  <p className="font-semibold text-gray-700">파리 (530MW + 173MW)</p>
                  <ul className="mt-1 space-y-1">
                    <li>• <a href="https://www.francedatacenter.com/en/publications" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      France Datacenter Report 2024 ↗
                    </a></li>
                    <li>• <a href="https://www.data4group.com/en/news-insights/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      DATA4 Market Analysis ↗
                    </a></li>
                    <li>• <a href="https://www.digitalrealty.com/data-center-locations/emea/france/paris" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Interxion Paris Campus ↗
                    </a></li>
                  </ul>
                </div>
                <div className="border-l-3 border-red-400 pl-3">
                  <p className="font-semibold text-gray-700">더블린 (574MW, 성장 제한)</p>
                  <ul className="mt-1 space-y-1">
                    <li>• <a href="https://www.eirgridgroup.com/site-files/library/EirGrid/EirGrid_DataCentreConnectionPolicy_ApprovedMay2024.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      EirGrid Connection Policy 2024 ↗
                    </a></li>
                    <li>• <a href="https://www.idaireland.com/how-we-help/resources/infographics/data-hosting-in-ireland" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Host in Ireland DC Report ↗
                    </a></li>
                    <li>• <a href="https://www.datacenterdynamics.com/en/news/ireland-eirgrid-data-center-moratorium/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Ireland DC Moratorium Updates ↗
                    </a></li>
                  </ul>
                </div>
                <div className="border-l-3 border-indigo-400 pl-3">
                  <p className="font-semibold text-gray-700">시장 전망</p>
                  <ul className="mt-1 space-y-1">
                    <li>• <a href="https://www.structureresearch.net/reports/european-data-center-market" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Structure Research European DC ↗
                    </a></li>
                    <li>• <a href="https://www.knightfrank.com/research/global-data-centre-report-2024" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Knight Frank DC Investment Report ↗
                    </a></li>
                    <li>• <a href="https://www.datacenterdynamics.com/en/dcd-intelligence/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      DCD Intelligence Platform ↗
                    </a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-xs text-gray-500 italic">
                  * 모든 수치는 2024년 Q3 기준 최신 데이터이며, 운영 중 용량은 IT 전력 기준(UPS 출력)입니다.
                  건설 중/계획 용량은 24개월 내 완공 예정 프로젝트만 포함합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.2 FLAP-D 각 도시별 핵심 특징</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 bg-green-50">
                <h4 className="font-semibold text-gray-800 mb-2">🇮🇪 더블린의 성장과 제약</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 법인세 12.5%로 기업 유치</li>
                  <li>• 2020년까지 급성장 (당시 계획 769MW)</li>
                  <li>• 2021년 이후 전력망 제약으로 성장 정체</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-blue-50">
                <h4 className="font-semibold text-gray-800 mb-2">🇬🇧 런던의 지속적 우위</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 2024년 기준 1,200MW+ 운영</li>
                  <li>• 금융 서비스 중심지</li>
                  <li>• 대서양 횡단 케이블 랜딩 포인트</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-yellow-50">
                <h4 className="font-semibold text-gray-800 mb-2">🇩🇪 프랑크푸르트의 IX 우위</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• DE-CIX 18+ Tbps 트래픽</li>
                  <li>• 유럽 최대 인터넷 교환점</li>
                  <li>• 클라우드 온램프 중심지</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-purple-50">
                <h4 className="font-semibold text-gray-800 mb-2">🇳🇱 암스테르담의 콘텐츠 허브</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• AMS-IX 14+ Tbps 트래픽</li>
                  <li>• 콘텐츠 배포 네트워크 집중</li>
                  <li>• 북유럽 연결성 중심</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.3 신흥 허브의 급성장</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🇪🇸 마드리드</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 현재: 82MW</li>
                  <li>• 계획: 400MW+ (계획 중)</li>
                  <li>• Amazon 300MW+ 계획 프로젝트</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🇩🇰 코펜하겐</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Google 대규모 개발 진행</li>
                  <li>• Facebook 확장 중</li>
                  <li>• Apple 데이터센터 운영</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">🇵🇱 바르샤바</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 동유럽 허브 부상</li>
                  <li>• 비용 경쟁력 우위</li>
                  <li>• 비전통적 위치로 금속 확장</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong>참고:</strong> 상기 데이터는 DatacenterDynamics 2020년 보도 기준으로, 
                유럽 데이터센터 시장의 FLAP에서 FLAP-D로의 전환 및 신흥 허브 부상을 보여줍니다.
                파리의 530MW는 FLAP-D 그룹 내에서 상업적 위치가 가장 우수하며,
                프랑크푸르트는 531MW 계획으로 유럽 최대 파이프라인을 보유하고 있습니다.
              </p>
            </div>
          </div>
        </div>
        
        {/* Section Transition */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm font-semibold text-gray-700">
            → 다음 섹션: 유럽 전체 DC 시장의 상세 현황을 살펴보고, 런던 집중도를 정량적으로 분석합니다.
          </p>
        </div>
      </div>

      {/* 2.2 유럽의 주요 DC 현황 (싱가포르-유럽 IRU에서 이동) */}
      <div id="europe-dc-details" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Building2 className="w-6 h-6 mr-2 text-indigo-600" />
          2.2 유럽 주요 DC 현황: 런던 편중의 실체
        </h2>
        
        {/* 핵심 인사이트 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">📊 핵심 인사이트</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>지역 집중도</strong>: 유럽 전체 DC 용량 3,640MW 중 영국(1,030MW)과 독일(800MW)이 50% 차지, FLAP-D(Frankfurt, London, Amsterdam, Paris, Dublin) 5개 도시가 전체 용량의 65%를 점유하는 극심한 편중 현상</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>마르세유의 특수성</strong>: 용량은 85MW로 작지만 지중해 해저케이블 허브로서 아시아-유럽 연결의 전략적 요충지 역할, 싱가포르-유럽 IRU 투자의 핵심 거점</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>하이퍼스케일러 주도</strong>: AWS, Azure, Google Cloud가 유럽 전역에 1,750MW 이상 투자, 특히 아일랜드 더블린은 하이퍼스케일러 집중으로 320MW 규모 성장</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>IX 연결성</strong>: DE-CIX Frankfurt(18.11Tbps), AMS-IX(14Tbps) 등 세계 최대 인터넷 익스체인지 보유로 글로벌 트래픽 허브 역할</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>신흥 시장 부상</strong>: 북유럽(스톡홀름, 오슬로) 친환경 에너지 기반 연 15-20% 고성장, 2025년까지 용량 2배 증가 예상</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span><strong>시장 성숙도 양극화</strong>: FLAP-D 성숙 시장은 전력 제약과 높은 임대료로 성장률 8-10% 둔화, Edge DC로 전환 중이며 신흥 시장과의 격차 확대</span>
            </li>
          </ul>
          
          {/* Edge DC 상세 설명 박스 */}
          <div className="bg-white/70 rounded-lg p-4 mt-4 border border-blue-200">
            <h4 className="font-bold text-gray-800 mb-3 text-sm">💡 Edge DC(엣지 데이터센터)란?</h4>
            <p className="text-xs text-gray-700 mb-3">
              <strong>전통적인 대규모 중앙집중식 DC</strong> → <strong>소규모 분산형 Edge DC</strong>로의 전환
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="bg-gray-50 rounded p-2">
                <h5 className="font-semibold text-xs text-gray-800 mb-1">주요 특징</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• <strong>위치</strong>: 최종 사용자와 가까운 도시 외곽, 통신 기지국, 기업 사내 등</li>
                  <li>• <strong>규모</strong>: 1-5MW 소규모 (기존 대형 DC는 50-100MW+)</li>
                  <li>• <strong>목적</strong>: 낮은 지연시간(latency) 요구 서비스 제공</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded p-2">
                <h5 className="font-semibold text-xs text-gray-800 mb-1">전환 이유</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li><strong>1. 물리적 제약</strong></li>
                  <li className="ml-2">- 도심 내 대규모 부지 확보 불가능</li>
                  <li className="ml-2">- 전력 공급 한계 (런던, 암스테르담은 신규 DC 전력 제한)</li>
                  <li className="ml-2">- 냉각수 부족, 환경 규제 강화</li>
                  <li><strong>2. 비용 문제</strong></li>
                  <li className="ml-2">- 임대료가 너무 비싸짐 (런던 £150/sq ft = 약 220만원/m²)</li>
                  <li className="ml-2">- 전력 비용 상승, 운영비 증가</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded p-2">
                <h5 className="font-semibold text-xs text-gray-800 mb-1">실제 사례</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• <strong>런던</strong>: 도심 대형 DC 대신 M25 순환도로 주변 소규모 Edge DC 구축</li>
                  <li>• <strong>프랑크푸르트</strong>: 도시 외곽 산업단지에 Edge DC 네트워크 구축</li>
                  <li>• <strong>암스테르담</strong>: 2019년부터 신규 대형 DC 건설 모라토리엄, Edge DC만 허용</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded p-2">
              <h5 className="font-semibold text-xs text-blue-800 mb-1">새로운 수요</h5>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• 5G, IoT, 자율주행 → 초저지연(1-5ms) 필요</li>
                <li>• 실시간 AI/ML 처리</li>
                <li>• 스트리밍, 게임 등 엣지 컴퓨팅 수요</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">주요 데이터센터 허브 도시</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">지역</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">도시</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">총 용량 (MW)</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">DC 개수</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">주요 사업자별 DC 현황</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">특징</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={2}>영국</td>
                    <td className="border border-gray-300 px-4 py-2">런던</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">850</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">90+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">Equinix:</span> 13개 (LD1-LD10, LD13, MA1, MA3)</div>
                        <div><span className="font-semibold">Digital Realty:</span> 10개 (LHR10-LHR20)</div>
                        <div><span className="font-semibold">Telehouse:</span> 4개 (Docklands 캠퍼스)</div>
                        <div><span className="font-semibold">Global Switch:</span> 3개 (East, North, West)</div>
                        <div><span className="font-semibold">Virtus:</span> 9개 (LONDON1-9)</div>
                        <div><span className="font-semibold">기타:</span> 51개+ (Colt, Iron Mountain 등)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">유럽 최대 DC 허브, 금융 특화</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">슬라우</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">180</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">25+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">Equinix:</span> 5개 (LD4, LD6, LD7, LD9, LD10)</div>
                        <div><span className="font-semibold">ARK Data Centres:</span> 3개 (Farnborough, Cody Park)</div>
                        <div><span className="font-semibold">Cyrus One:</span> 2개 (Slough 캠퍼스)</div>
                        <div><span className="font-semibold">기타:</span> 15개+ (Kao Data, Yondr 등)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">런던 서부 위성 허브</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold" colSpan={2}>영국 소계</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">1,030</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">115+</td>
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={2}>독일</td>
                    <td className="border border-gray-300 px-4 py-2">프랑크푸르트</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">650</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">60+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">Interxion:</span> 13개 (FRA1-FRA13)</div>
                        <div><span className="font-semibold">e-shelter:</span> 8개 (캠퍼스 1-8)</div>
                        <div><span className="font-semibold">Equinix:</span> 7개 (FR1-FR7)</div>
                        <div><span className="font-semibold">NTT:</span> 5개 (FRA1-FRA5)</div>
                        <div><span className="font-semibold">CyrusOne:</span> 3개</div>
                        <div><span className="font-semibold">기타:</span> 24개+ (Telehouse, maincubes 등)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">DE-CIX 위치, 유럽 2위 허브</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">베를린</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">150</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">20+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">NTT:</span> 2개 (BER1, BER2)</div>
                        <div><span className="font-semibold">Digital Realty:</span> 2개</div>
                        <div><span className="font-semibold">Equinix:</span> 1개 (BE1)</div>
                        <div><span className="font-semibold">기타:</span> 15개+ (CarrierColo, Telehouse 등)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">동유럽 연결점</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold" colSpan={2}>독일 소계</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">800</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">80+</td>
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={2}>네덜란드</td>
                    <td className="border border-gray-300 px-4 py-2">암스테르담</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">450</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">50+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">Equinix:</span> 8개 (AM1-AM8)</div>
                        <div><span className="font-semibold">Interxion:</span> 7개 (AMS1-AMS8, AMS9 건설중)</div>
                        <div><span className="font-semibold">Digital Realty:</span> 6개 (AMS10-AMS15)</div>
                        <div><span className="font-semibold">NorthC:</span> 5개</div>
                        <div><span className="font-semibold">Global Switch:</span> 2개</div>
                        <div><span className="font-semibold">기타:</span> 22개+ (Nikhef, Iron Mountain 등)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">AMS-IX, 콘텐츠 배포 중심</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">스키폴</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">120</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">15+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">Maincubes:</span> 2개 (AMS01)</div>
                        <div><span className="font-semibold">Digital Realty:</span> 2개</div>
                        <div><span className="font-semibold">QTS:</span> 1개</div>
                        <div><span className="font-semibold">기타:</span> 10개+</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">암스테르담 위성 지역</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold" colSpan={2}>네덜란드 소계</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">570</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">65+</td>
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={2}>프랑스</td>
                    <td className="border border-gray-300 px-4 py-2">파리</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">380</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">40+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">Equinix:</span> 7개 (PA1-PA7)</div>
                        <div><span className="font-semibold">Interxion:</span> 6개 (PAR1-PAR7, PAR5 제외)</div>
                        <div><span className="font-semibold">OVHcloud:</span> 4개 (Roubaix 및 Paris)</div>
                        <div><span className="font-semibold">Scaleway:</span> 3개 (DC1-DC3)</div>
                        <div><span className="font-semibold">NTT:</span> 3개 (건설 중)</div>
                        <div><span className="font-semibold">기타:</span> 17개+ (DATA4, Global Switch 등)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">서유럽 허브, 클라우드 중심</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">마르세유</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">85</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">10+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">Interxion:</span> 3개 (MRS1-MRS3)</div>
                        <div><span className="font-semibold">Jaguar Network:</span> 2개</div>
                        <div><span className="font-semibold">Digital Realty:</span> 1개 (계획)</div>
                        <div><span className="font-semibold">기타:</span> 4개+ (지역 사업자)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">지중해 케이블 허브</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold" colSpan={2}>프랑스 소계</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">465</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">50+</td>
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">아일랜드</td>
                    <td className="border border-gray-300 px-4 py-2">더블린</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">320</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">35+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">AWS:</span> 3개 (DUB1-DUB3 하이퍼스케일)</div>
                        <div><span className="font-semibold">Google:</span> 2개 (DUB01-DUB02)</div>
                        <div><span className="font-semibold">Microsoft:</span> 3개 (Azure 리전)</div>
                        <div><span className="font-semibold">Meta:</span> 2개 (Clonee 캠퍼스)</div>
                        <div><span className="font-semibold">Equinix:</span> 4개 (DB1-DB4)</div>
                        <div><span className="font-semibold">Interxion:</span> 3개 (DUB1-DUB3)</div>
                        <div><span className="font-semibold">기타:</span> 18개+ (EdgeConnex, CyrusOne 등)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">하이퍼스케일러 집중</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">스웨덴</td>
                    <td className="border border-gray-300 px-4 py-2">스톡홀름</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">180</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">20+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">Meta/Facebook:</span> 3개 (Luleå 하이퍼스케일)</div>
                        <div><span className="font-semibold">AWS:</span> 3개 (Stockholm 리전)</div>
                        <div><span className="font-semibold">Interxion:</span> 3개 (STO1-STO3)</div>
                        <div><span className="font-semibold">Equinix:</span> 2개 (SK1-SK2)</div>
                        <div><span className="font-semibold">DigiPlex:</span> 2개</div>
                        <div><span className="font-semibold">기타:</span> 7개+ (Bahnhof, IP-Only 등)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">북유럽 허브, 친환경 에너지</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">스위스</td>
                    <td className="border border-gray-300 px-4 py-2">취리히</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">120</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">15+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">Green:</span> 3개 (Zurich West, Lupfig)</div>
                        <div><span className="font-semibold">Equinix:</span> 2개 (ZH4, ZH5)</div>
                        <div><span className="font-semibold">Safe Host:</span> 2개</div>
                        <div><span className="font-semibold">NTT:</span> 1개 (ZRH1)</div>
                        <div><span className="font-semibold">기타:</span> 7개+ (ColoBale, Nine.ch 등)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">금융 데이터 특화</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">스페인</td>
                    <td className="border border-gray-300 px-4 py-2">마드리드</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">150</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">20+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">Equinix:</span> 3개 (MD1-MD2, MD2x)</div>
                        <div><span className="font-semibold">Interxion:</span> 2개 (MAD1-MAD2)</div>
                        <div><span className="font-semibold">Global Switch:</span> 1개 (Madrid Campus)</div>
                        <div><span className="font-semibold">DATA4:</span> 2개 (Alcobendas)</div>
                        <div><span className="font-semibold">NTT:</span> 1개 (Las Rozas)</div>
                        <div><span className="font-semibold">기타:</span> 11개+ (Telefonica, Adam 등)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">남유럽 허브</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">이탈리아</td>
                    <td className="border border-gray-300 px-4 py-2">밀라노</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">110</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">15+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">STACK EMEA:</span> 2개 (80MW 규모)</div>
                        <div><span className="font-semibold">Equinix:</span> 2개 (ML1-ML2)</div>
                        <div><span className="font-semibold">DATA4:</span> 1개 (Cornaredo)</div>
                        <div><span className="font-semibold">Aruba:</span> 2개 (Ponte San Pietro)</div>
                        <div><span className="font-semibold">기타:</span> 8개+ (SUPERNAP, Seeweb 등)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">이탈리아 최대 DC 시장</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">벨기에</td>
                    <td className="border border-gray-300 px-4 py-2">브뤼셀</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">95</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">12+</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-xs space-y-1">
                        <div><span className="font-semibold">LCL:</span> 2개 (Brussels Campus)</div>
                        <div><span className="font-semibold">Proximus:</span> 2개</div>
                        <div><span className="font-semibold">Equinix:</span> 1개 (BRU1)</div>
                        <div><span className="font-semibold">Google:</span> 1개 (St. Ghislain)</div>
                        <div><span className="font-semibold">기타:</span> 6개+ (BelgacomICT 등)</div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">EU 기관 집중</td>
                  </tr>
                  <tr className="bg-blue-50 font-bold">
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}>총계</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">3,640 MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">460+</td>
                    <td className="border border-gray-300 px-4 py-2" colSpan={2}>유럽 전체 DC 용량의 약 75%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">하이퍼스케일 데이터센터 현황</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3">AWS 유럽 리전</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>eu-west-1</strong> (아일랜드): 3개 AZ, 450MW+</li>
                  <li><strong>eu-west-2</strong> (런던): 3개 AZ, 300MW+</li>
                  <li><strong>eu-west-3</strong> (파리): 3개 AZ, 250MW+</li>
                  <li><strong>eu-central-1</strong> (프랑크푸르트): 3개 AZ, 400MW+</li>
                  <li><strong>eu-north-1</strong> (스톡홀름): 3개 AZ, 200MW+</li>
                  <li><strong>eu-south-1</strong> (밀라노): 3개 AZ, 150MW+</li>
                  <li><strong>eu-south-2</strong> (스페인): 3개 AZ, 계획 중</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3">Microsoft Azure 유럽 리전</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>West Europe</strong> (네덜란드): 3개 존, 350MW+</li>
                  <li><strong>North Europe</strong> (아일랜드): 3개 존, 300MW+</li>
                  <li><strong>UK South</strong> (런던): 3개 존, 250MW+</li>
                  <li><strong>Germany West Central</strong> (프랑크푸르트): 3개 존, 300MW+</li>
                  <li><strong>France Central</strong> (파리): 3개 존, 200MW+</li>
                  <li><strong>Switzerland North</strong> (취리히): 3개 존, 150MW+</li>
                  <li><strong>Norway East</strong> (오슬로): 3개 존, 180MW+</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-3">Google Cloud 유럽 리전</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>europe-west1</strong> (벨기에): 3개 존, 280MW+</li>
                  <li><strong>europe-west2</strong> (런던): 3개 존, 250MW+</li>
                  <li><strong>europe-west3</strong> (프랑크푸르트): 3개 존, 300MW+</li>
                  <li><strong>europe-west4</strong> (네덜란드): 3개 존, 320MW+</li>
                  <li><strong>europe-north1</strong> (핀란드): 3개 존, 200MW+</li>
                  <li><strong>europe-west6</strong> (취리히): 3개 존, 150MW+</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-3">Meta (Facebook) 데이터센터</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Luleå</strong> (스웨덴): 120MW, 3개 건물</li>
                  <li><strong>Odense</strong> (덴마크): 100MW, 2개 건물</li>
                  <li><strong>Clonee</strong> (아일랜드): 90MW, 2개 건물</li>
                  <li><strong>Papillion</strong> (네브래스카): 계획 중</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">주요 코로케이션 사업자</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">사업자</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">유럽 DC 수</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">총 용량 (MW)</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">주요 위치</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">특징</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Equinix</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">65</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">450</td>
                    <td className="border border-gray-300 px-4 py-2">런던, 프랑크푸르트, 암스테르담, 파리</td>
                    <td className="border border-gray-300 px-4 py-2">세계 최대 코로케이션 사업자</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Digital Realty/Interxion</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">55</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">380</td>
                    <td className="border border-gray-300 px-4 py-2">11개국 13개 도시</td>
                    <td className="border border-gray-300 px-4 py-2">유럽 최대 캐리어 중립 DC</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">NTT Communications</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">30</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">200</td>
                    <td className="border border-gray-300 px-4 py-2">런던, 프랑크푸르트, 비엔나</td>
                    <td className="border border-gray-300 px-4 py-2">아시아-유럽 연결 특화</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Global Switch</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">15</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">280</td>
                    <td className="border border-gray-300 px-4 py-2">런던, 암스테르담, 파리, 프랑크푸르트</td>
                    <td className="border border-gray-300 px-4 py-2">대규모 캠퍼스형 DC</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Telehouse</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">12</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">150</td>
                    <td className="border border-gray-300 px-4 py-2">런던, 파리, 프랑크푸르트</td>
                    <td className="border border-gray-300 px-4 py-2">KDDI 자회사, 아시아 연결</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">지역별 특징 및 전망</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">FLAP-D 시장 (성숙 시장)</h4>
                <p className="text-xs text-gray-600 mb-2">Frankfurt, London, Amsterdam, Paris, Dublin</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 유럽 DC 용량의 65% 차지</li>
                  <li>• 연평균 성장률: 8-10%</li>
                  <li>• 특징: 높은 임대료, 전력 제약, 규제 강화</li>
                  <li>• 전망: Edge DC로 확장 중</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">신흥 시장</h4>
                <p className="text-xs text-gray-600 mb-2">스톡홀름, 오슬로, 바르샤바, 부다페스트</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 연평균 성장률: 15-20%</li>
                  <li>• 장점: 저렴한 전력, 친환경 에너지</li>
                  <li>• 특징: 하이퍼스케일러 신규 투자 집중</li>
                  <li>• 전망: 2025년까지 용량 2배 증가 예상</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">주요 인터넷 익스체인지 (IX)</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">IX 이름</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">위치</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">피크 트래픽</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">연결 회원수</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">특징</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">DE-CIX Frankfurt</td>
                    <td className="border border-gray-300 px-4 py-2">프랑크푸르트</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">18.11 Tbps</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">1,100+</td>
                    <td className="border border-gray-300 px-4 py-2">세계 최대 IX</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">AMS-IX</td>
                    <td className="border border-gray-300 px-4 py-2">암스테르담</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">14+ Tbps</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">900+</td>
                    <td className="border border-gray-300 px-4 py-2">콘텐츠 중심</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">LINX</td>
                    <td className="border border-gray-300 px-4 py-2">런던</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">5.6 Tbps</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">850+</td>
                    <td className="border border-gray-300 px-4 py-2">금융 특화</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">France-IX</td>
                    <td className="border border-gray-300 px-4 py-2">파리/마르세유</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2.5 Tbps</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">500+</td>
                    <td className="border border-gray-300 px-4 py-2">남유럽 연결</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">MIX Milan</td>
                    <td className="border border-gray-300 px-4 py-2">밀라노</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">1.8 Tbps</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">300+</td>
                    <td className="border border-gray-300 px-4 py-2">이탈리아 허브</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Section Transition */}
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-green-50 rounded-lg border-l-4 border-indigo-500">
          <p className="text-sm font-semibold text-gray-700">
            → 다음 섹션: DC 위치와 용량을 파악했다면, 이제 각 지역의 네트워크 연결성(IX)을 분석합니다.
          </p>
        </div>
      </div>

      {/* 3. IX(Internet Exchange) 생태계 분석 */}
      <div id="europe-ix-ecosystem" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Network className="w-6 h-6 mr-2 text-green-600" />
          3. IX 중심 이동: 런던 LINX에서 프랑크푸르트 DE-CIX로
        </h2>

        <div className="space-y-6">
          {/* 주요 약어 설명 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-800 mb-3">📖 주요 약어 및 용어 설명</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-blue-700 mb-2">IX 관련 약어:</p>
                <ul className="space-y-1 text-gray-700">
                  <li><strong>IX (Internet Exchange)</strong>: 인터넷 교환점 - ISP들이 트래픽을 교환하는 물리적 인프라</li>
                  <li><strong>DE-CIX</strong>: German Commercial Internet Exchange - 독일 상업 인터넷 교환소</li>
                  <li><strong>AMS-IX</strong>: Amsterdam Internet Exchange - 암스테르담 인터넷 교환소</li>
                  <li><strong>LINX</strong>: London Internet Exchange - 런던 인터넷 교환소</li>
                  <li><strong>INEX</strong>: Internet Neutral Exchange (Ireland) - 아일랜드 인터넷 교환소</li>
                  <li><strong>NL-IX</strong>: Netherlands Internet Exchange - 네덜란드 인터넷 교환소</li>
                  <li><strong>MSK-IX</strong>: Moscow Internet Exchange - 모스크바 인터넷 교환소</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-blue-700 mb-2">기술 용어:</p>
                <ul className="space-y-1 text-gray-700">
                  <li><strong>ASN (Autonomous System Number)</strong>: 자율 시스템 번호 - 인터넷에서 독립 네트워크를 식별하는 고유번호</li>
                  <li><strong>Tbps (Terabits per second)</strong>: 초당 테라비트 - 1 Tbps = 1,000 Gbps = 1,000,000 Mbps</li>
                  <li><strong>Gbps (Gigabits per second)</strong>: 초당 기가비트 - 1 Gbps = 1,000 Mbps</li>
                  <li><strong>피어링 (Peering)</strong>: 네트워크 간 직접 트래픽 교환 (무료 또는 저비용)</li>
                  <li><strong>트랜짓 (Transit)</strong>: 타 네트워크를 경유한 트래픽 전송 (유료)</li>
                  <li><strong>PoP (Point of Presence)</strong>: 네트워크 접속점 - ISP의 물리적 접속 위치</li>
                  <li><strong>IRU (Indefeasible Right of Use)</strong>: 양도불가사용권 - 장기 용량 임대 계약</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.1 유럽 IX 트래픽 순위 (2024년 최신)</h3>
            
            <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>상위 5개 IX 최대 트래픽 현황:</strong> 프랑크푸르트 DE-CIX가 18+ Tbps로 세계 최대 IX
              </p>
              <p className="text-xs text-gray-500 mt-1">
                * 2020년 이미지 데이터(10.4 Tbps)와 비교 시 70% 이상 성장
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-center">순위</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">IX 이름</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">피크 트래픽</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">ASN 연결</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">출처</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">1</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">DE-CIX Frankfurt</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="font-bold text-green-600">18.11 Tbps</div>
                      <div className="text-xs text-gray-500">(2024년 최신)</div>
                      <div className="text-xs text-gray-400">2020년: 10.4 Tbps</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div>1,100+ ASN</div>
                      <div className="text-xs text-gray-500">(2024년 기준)</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a href="https://www.de-cix.net/en/locations/frankfurt/statistics" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-blue-600 hover:underline text-xs">
                        DE-CIX Live Stats ↗
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                    <td className="border border-gray-300 px-4 py-2">AMS-IX</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="font-bold">14+ Tbps</div>
                      <div className="text-xs text-gray-500">(2024년 최신)</div>
                      <div className="text-xs text-gray-400">2020년: 9.8 Tbps</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div>900+ ASN</div>
                      <div className="text-xs text-gray-500">(2024년 기준)</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a href="https://www.ams-ix.net/ams/documentation/total-stats" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-blue-600 hover:underline text-xs">
                        AMS-IX Stats ↗
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center">3</td>
                    <td className="border border-gray-300 px-4 py-2">LINX London</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="font-bold">10.8+ Tbps</div>
                      <div className="text-xs text-gray-500">(2024년 최신)</div>
                      <div className="text-xs text-gray-400">2020년: 4.9 Tbps</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div>950+ ASN</div>
                      <div className="text-xs text-gray-500">(2024년 기준)</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a href="https://portal.linx.net/statistics/traffic" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-blue-600 hover:underline text-xs">
                        LINX Stats ↗
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-center">4</td>
                    <td className="border border-gray-300 px-4 py-2">France-IX Paris</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="font-bold">6.5+ Tbps</div>
                      <div className="text-xs text-gray-500">(2024년 최신)</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div>550+ ASN</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a href="https://www.franceix.net/en/technical/traffic-statistics/" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-blue-600 hover:underline text-xs">
                        France-IX Stats ↗
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center">5</td>
                    <td className="border border-gray-300 px-4 py-2">INEX Dublin</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="font-bold">4.9+ Tbps</div>
                      <div className="text-xs text-gray-500">(2024년 최신)</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div>180+ ASN</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a href="https://www.inex.ie/ixp/statistics/ixp-statistics/" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-blue-600 hover:underline text-xs">
                        INEX Stats ↗
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">데이터 검증 및 비교 분석</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
                <div>
                  <p className="font-semibold text-gray-700 mb-1">2020년 이미지 데이터 vs 2024년 실제 데이터:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• DE-CIX: 10.4 Tbps → 18.11 Tbps (74% 성장)</li>
                    <li>• AMS-IX: 9.8 Tbps → 14+ Tbps (43% 성장)</li>
                    <li>• LINX: 4.9 Tbps → 10.8 Tbps (120% 성장)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-1">순위 변동사항:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• NL-IX: 8.61 Tbps (2024년 3월) - 상위 5위 밖</li>
                    <li>• MSK-IX: 7.7 Tbps (2025년 2월) - 제재로 인한 국제 연결 제한</li>
                    <li>• France-IX Paris, INEX Dublin이 새롭게 상위 5위 진입</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.2 연결 사업자 수 및 경제적 기여도</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 bg-blue-50">
                <h4 className="font-semibold text-gray-800 mb-3">ASN(Autonomous System Number) 연결 현황:</h4>
                <div className="mb-3 p-2 bg-white rounded text-xs text-gray-600">
                  <p className="font-semibold mb-1">📌 ASN이란?</p>
                  <ul className="space-y-1 ml-2">
                    <li>• 인터넷에서 독립적으로 운영되는 네트워크를 식별하는 고유번호</li>
                    <li>• 1개 ASN = 1개 조직(통신사, 기업, 대학 등)의 네트워크</li>
                    <li>• 예: AS4766(KT), AS15169(Google), AS8075(Microsoft)</li>
                    <li>• ASN 연결 수 = IX에 연결된 네트워크 사업자 수</li>
                    <li>• 많을수록 더 많은 사업자와 직접 피어링 가능 (중계 비용 절감)</li>
                  </ul>
                </div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <strong>DE-CIX Frankfurt:</strong> 1,043 ASN (149 고유 ASN)
                      <div className="text-xs text-gray-500 mt-1">
                        <a href="https://www.euro-ix.net/en/forixps/de-cix" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline">
                          euro-ix 데이터 ↗
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <strong>AMS-IX:</strong> 870 ASN (105 고유 ASN)
                      <div className="text-xs text-gray-500 mt-1">
                        <a href="https://www.euro-ix.net/en/forixps/ams-ix" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline">
                          euro-ix 데이터 ↗
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <strong>LINX LON1:</strong> 827 ASN (60 고유 ASN)
                      <div className="text-xs text-gray-500 mt-1">
                        <a href="https://www.euro-ix.net/en/forixps/linx" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline">
                          euro-ix 데이터 ↗
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-green-50">
                <h4 className="font-semibold text-gray-800 mb-3">프랑크푸르트가 유럽 최대 IX 허브가 된 이유:</h4>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-semibold text-gray-700 mb-1">1. 지리적 이점</p>
                    <ul className="ml-3 space-y-1 text-gray-600">
                      <li>• 유럽 중심부 위치 (독일 중앙)</li>
                      <li>• 동서유럽 연결 교차점</li>
                      <li>• 주요 해저케이블 육양지까지 최적 거리</li>
                    </ul>
                  </div>
                  
                  <div className="text-sm">
                    <p className="font-semibold text-gray-700 mb-1">2. 금융 허브 시너지</p>
                    <ul className="ml-3 space-y-1 text-gray-600">
                      <li>• 유럽중앙은행(ECB) 소재지</li>
                      <li>• 독일증권거래소 위치</li>
                      <li>• 초저지연(Ultra-low latency) 요구 금융기관 집중</li>
                    </ul>
                  </div>
                  
                  <div className="text-sm">
                    <p className="font-semibold text-gray-700 mb-1">3. DE-CIX 운영 우수성</p>
                    <ul className="ml-3 space-y-1 text-gray-600">
                      <li>• 1995년 설립, 30년 운영 노하우</li>
                      <li>• 피어링 비용 최저 수준 (무료~저가)</li>
                      <li>• 99.999% 가용성 보장</li>
                      <li>• 기술 중립성 정책 (모든 사업자 공평 대우)</li>
                    </ul>
                  </div>
                  
                  <div className="text-sm">
                    <p className="font-semibold text-gray-700 mb-1">4. 실제 영향력 (2024년 기준)</p>
                    <ul className="ml-3 space-y-1 text-gray-600">
                      <li>• <strong>18.11 Tbps</strong> 피크 트래픽 (세계 최대)
                        <a href="https://www.de-cix.net/en/locations/frankfurt/statistics" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline text-xs ml-1">
                          실시간 확인 ↗
                        </a>
                      </li>
                      <li>• <strong>1,100+</strong> 네트워크 사업자 직접 연결</li>
                      <li>• <strong>35개국</strong> 이상 사업자 참여</li>
                      <li>• 독일 전체 인터넷 트래픽의 <strong>35%</strong> 처리</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-orange-50">
                <h4 className="font-semibold text-gray-800 mb-3">유럽 IX 생태계의 특징</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">IX 모델의 차이점:</p>
                    <ul className="ml-3 space-y-1 text-gray-600">
                      <li>• <strong>유럽:</strong> 비영리/협동조합 모델 (저비용 피어링)</li>
                      <li>• <strong>미국:</strong> 상업적 모델 (고비용 트랜짓)</li>
                      <li>• <strong>아시아:</strong> 하이브리드 모델</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">주요 IX별 특성:</p>
                    <ul className="ml-3 space-y-1 text-gray-600">
                      <li>• <strong>DE-CIX:</strong> 기술 중심, 캐리어 중립</li>
                      <li>• <strong>AMS-IX:</strong> 콘텐츠 사업자 집중</li>
                      <li>• <strong>LINX:</strong> 금융 서비스 특화</li>
                      <li>• <strong>France-IX:</strong> 남유럽/아프리카 연결</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">KT 진입 시 고려사항:</p>
                    <ul className="ml-3 space-y-1 text-gray-600">
                      <li>• DE-CIX Frankfurt 우선 연결 필수</li>
                      <li>• 로컬 루프 비용 대비 피어링 효익 분석</li>
                      <li>• Remote Peering 옵션 검토</li>
                      <li>• 아시아-유럽 트래픽 직접 교환 기회</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section Transition */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-orange-50 rounded-lg border-l-4 border-green-500">
          <p className="text-sm font-semibold text-gray-700">
            → 다음 섹션: IX를 통한 연결 방법을 이해했다면, 함께 협력할 Connectivity 사업자들을 파악합니다.
          </p>
        </div>
      </div>

      {/* 4. Connectivity 사업자 생태계 */}
      <div id="europe-connectivity" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-2 text-orange-600" />
          4. 런던 탈피를 위한 파트너십 재구성
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">A. 주요 인프라 사업자</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">euNetworks</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 53개 도시, 17개국 네트워크</li>
                  <li>• 574개 데이터센터 직접 연결</li>
                  <li>• 18개 메트로 네트워크</li>
                  <li>• 주요 거점: 런던, 더블린, 암스테르담, 파리, 프랑크푸르트</li>
                  <li className="mt-2">
                    <a href="https://eunetworks.com/network/network-map/" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-blue-600 hover:underline text-xs">
                      euNetworks Network Map ↗
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Zayo Europe</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 최대 400Gbps 광섬유 네트워크</li>
                  <li>• 유럽-북미-중동 연결</li>
                  <li>• AI/금융 고성능 컴퓨팅 대응</li>
                  <li>• 주요 서비스: Dark Fiber, Wavelength</li>
                  <li className="mt-2">
                    <a href="https://www.zayo.com/solutions/global-network/" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-blue-600 hover:underline text-xs">
                      Zayo Global Network ↗
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">B. 사업 모델 차별화</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">구분</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">인프라 사업자</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">리테일 사업자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">주력 사업</td>
                    <td className="border border-gray-300 px-4 py-2">대용량 대역폭, B2B 인프라</td>
                    <td className="border border-gray-300 px-4 py-2">소비자 대상 통합통신서비스</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">대표 기업</td>
                    <td className="border border-gray-300 px-4 py-2">
                      euNetworks, Colt, Zayo, EXA
                      <div className="text-xs text-gray-500 mt-1">
                        (전용선/Dark Fiber 전문)
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Telefonica, Orange, BT, DT
                      <div className="text-xs text-gray-500 mt-1">
                        BT: British Telecom / DT: Deutsche Telekom
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">서비스 특성</td>
                    <td className="border border-gray-300 px-4 py-2">DC간 전용선, 클라우드 연결</td>
                    <td className="border border-gray-300 px-4 py-2">모바일/고정/TV 패키지</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">타겟 시장</td>
                    <td className="border border-gray-300 px-4 py-2">대기업, 클라우드 사업자, 금융</td>
                    <td className="border border-gray-300 px-4 py-2">일반 소비자, 중소기업</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Section Transition */}
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-teal-50 rounded-lg border-l-4 border-orange-500">
          <p className="text-sm font-semibold text-gray-700">
            → 다음 섹션: 유럽 내 협력 구조를 파악했다면, 아시아-유럽 연결의 핵심 관문인 마르세유를 분석합니다.
          </p>
        </div>
      </div>

      {/* 5. 아시아-유럽 연결성과 마르세유의 부상 */}
      <div id="europe-marseille" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Network className="w-6 h-6 mr-2 text-teal-600" />
          5. 마르세유 대안: 런던 의존도 완화의 핵심
        </h2>

        <div className="space-y-6">
          {/* 해저케이블 관련 약어 설명 */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">🌊 해저케이블 관련 약어:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600">
              <div><strong>SEA-ME-WE</strong>: South East Asia - Middle East - Western Europe</div>
              <div><strong>PEACE</strong>: Pakistan & East Africa Connecting Europe</div>
              <div><strong>2Africa</strong>: Facebook(Meta) 주도 아프리카 순환 케이블</div>
              <div><strong>Blue-Raman</strong>: 인도-중동-유럽 연결 케이블</div>
              <div><strong>Landing Station</strong>: 해저케이블 육양국 (케이블 상륙지)</div>
              <div><strong>Backhaul</strong>: 육양국에서 내륙 연결 네트워크</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.1 마르세유 해저케이블 허브 현황</h3>
            
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">케이블명</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">용량</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">연결 구간</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">상륙 시기</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      SEA-ME-WE 6
                      <div className="mt-1">
                        <a href="https://www.submarinecablemap.com/submarine-cable/southeast-asia-middle-east-western-europe-6-seamew-6" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline text-xs font-normal">
                          Cable Map ↗
                        </a>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">130 Tbps</td>
                    <td className="border border-gray-300 px-4 py-2">싱가포르-인도-중동-마르세유</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2024.04</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      2Africa
                      <div className="mt-1">
                        <a href="https://www.submarinecablemap.com/submarine-cable/2africa" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline text-xs font-normal">
                          Cable Map ↗
                        </a>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">180 Tbps</td>
                    <td className="border border-gray-300 px-4 py-2">아프리카-중동-유럽 순환</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2023-24</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      PEACE
                      <div className="mt-1">
                        <a href="https://www.submarinecablemap.com/submarine-cable/peace-cable" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline text-xs font-normal">
                          Cable Map ↗
                        </a>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">96 Tbps</td>
                    <td className="border border-gray-300 px-4 py-2">파키스탄-아프리카-마르세유</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2022</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      Blue-Raman
                      <div className="mt-1">
                        <a href="https://www.submarinecablemap.com/submarine-cable/blueraman" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline text-xs font-normal">
                          Cable Map ↗
                        </a>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">218 Tbps</td>
                    <td className="border border-gray-300 px-4 py-2">인도-오만-마르세유</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2024-25</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-teal-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">마르세유 경쟁 우위</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 16개 해저케이블 상륙 (2024년 기준)</li>
                <li>• 싱가포르까지 175ms (런던 대비 20-30ms 단축)</li>
                <li>• 350+ Tbps 총 용량으로 유럽 최대 아시아 관문</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.2 싱가포르-유럽 IRU 전략</h3>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3">우선순위 케이블 시스템</h4>
              <ol className="space-y-2 text-sm text-gray-700">
                <li><strong>1순위:</strong> SEA-ME-WE 6 (최신, 최대 용량)</li>
                <li><strong>2순위:</strong> Blue-Raman (다이버시티 경로)</li>
                <li><strong>3순위:</strong> PEACE Cable (백업 경로)</li>
              </ol>
              
              <div className="mt-4 pt-4 border-t border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-2">예상 투자 규모</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 100Gbps IRU × 3개 시스템 = USD 15-20M (15년)</li>
                  <li>• 다크파이버 옵션 검토 시 USD 30-40M</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. 런던 PoP 재배치 전략 */}
      <div id="europe-pop-strategy" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Building className="w-6 h-6 mr-2 text-orange-600" />
          6. 런던 PoP 재배치 전략
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.1 현 런던 17개 PoP 평가</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-700 mb-2">유지 대상 (7개)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Telehouse Docklands (금융 특화)</li>
                  <li>• Equinix LD4/LD5 (기업 고객 집중)</li>
                  <li>• Interxion LON1 (콘텐츠 허브)</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-700 mb-2">재배치 대상 (10개)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 중복 위치 PoP 5개 → 프랑크푸르트</li>
                  <li>• 저효율 PoP 3개 → 마르세유</li>
                  <li>• 소규모 PoP 2개 → 통폐합</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.2 단계별 전환 계획</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h4 className="font-semibold text-blue-700 mb-2">Phase 1 (2025 Q1-Q2): 기반 구축</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 마르세유 Interxion MRS1/MRS2 2개 PoP 신설</li>
                  <li>• 프랑크푸르트 DE-CIX 직접 연결 3개 PoP 구축</li>
                  <li>• 싱가포르-마르세유 IRU 100Gbps 초기 확보</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <h4 className="font-semibold text-green-700 mb-2">Phase 2 (2025 Q3-Q4): 확장 및 최적화</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 런던 PoP 5개 축소, 고객 마이그레이션</li>
                  <li>• 마르세유 해저케이블 CLS 직접 연결</li>
                  <li>• 프랑크푸르트 클라우드 온램프 구축</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h4 className="font-semibold text-purple-700 mb-2">Phase 3 (2026): 안정화</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 런던 추가 3개 PoP 정리</li>
                  <li>• 마르세유-프랑크푸르트 전용선 구축</li>
                  <li>• 전체 네트워크 최적화 완료</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. 아시아-유럽 Bridge 거점 분석 */}
      <div id="europe-bridge" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-red-600" />
          7. 아시아-유럽 Bridge 거점 분석
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">A. 주요 Bridge 허브</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">🇫🇷 마르세유</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>연결성</strong>: 43개국 직접 연결</li>
                  <li>• <strong>용량</strong>: 300TB+ (2019)</li>
                  <li>• <strong>특징</strong>: 지중해 Gateway</li>
                  <li>• <strong>주요 케이블</strong>: AAE-1, SEA-ME-WE 5</li>
                  <li>• <strong>인도 연결</strong>: 1,500개 도시</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">🇦🇪 두바이</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>UAE-IX</strong>: 중동 최대 IX</li>
                  <li>• <strong>트래픽</strong>: 중동의 83% 유럽 우회</li>
                  <li>• <strong>성장률</strong>: 5,900% (2014 대비)</li>
                  <li>• <strong>SmartHub</strong>: 두바이-푸자이라</li>
                  <li>• <strong>역할</strong>: GCC 디지털 허브</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">🇹🇷 이스탄불</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>DE-CIX Istanbul</strong>: 터키 중립 IX</li>
                  <li>• <strong>연결</strong>: 45개+ 글로벌 거점</li>
                  <li>• <strong>위치</strong>: 유럽-아시아 관문</li>
                  <li>• <strong>Equinix IBX</strong>: IL2 데이터센터</li>
                  <li>• <strong>특징</strong>: 지정학적 요충지</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">🇸🇬 싱가포르</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>DE-CIX Singapore</strong>: 동남아 중심</li>
                  <li>• <strong>역할</strong>: APAC 네트워크 허브</li>
                  <li>• <strong>연결성</strong>: 아시아-유럽 직접</li>
                  <li>• <strong>특징</strong>: 분산형 플랫폼</li>
                  <li>• <strong>중요성</strong>: 동남아 금융 중심</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">B. China Telecom Europe 사례</h3>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h4 className="font-semibold text-gray-800 mb-2">네트워크 인프라</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Coverage</strong>: 187개 도시, 347개 PoP</li>
                  <li>• <strong>Gateway</strong>: 137개 육상 + 5개 해상</li>
                </ul>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>특징</strong>: 아시아-유럽 단일 경로</li>
                  <li>• <strong>성능</strong>: 고대역폭, 저지연</li>
                </ul>
              </div>
              <div className="mt-2">
                <a href="https://www.chinatelecomglobal.com/network" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-blue-600 hover:underline text-xs">
                  China Telecom Global Network ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. KT 진입 전략 권고 */}
      <div id="europe-strategy" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Building className="w-6 h-6 mr-2 text-indigo-600" />
          8. KT 진입 전략 권고
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">A. 타겟 시장 우선순위</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-2">Primary Target</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="font-semibold">🇫🇷 마르세유</li>
                  <li>• 아시아 Bridge 최적지</li>
                  <li>• 43개국 연결</li>
                  <li>• IRU 투자 기회</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
                <h4 className="font-bold text-orange-800 mb-2">Secondary Target</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="font-semibold">🇩🇪 프랑크푸르트</li>
                  <li>• IX 최대 허브</li>
                  <li>• 18.11 Tbps 트래픽</li>
                  <li>• 금융 중심지</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <h4 className="font-bold text-yellow-800 mb-2">Tertiary Target</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="font-semibold">🇮🇪 더블린</li>
                  <li>• 유럽 DC 1위</li>
                  <li>• 법인세 12.5%</li>
                  <li>• 하이퍼스케일러</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">B. 파트너십 전략</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">IX 연결 전략</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>1단계</strong>: DE-CIX Frankfurt 연결</li>
                  <li>• <strong>2단계</strong>: AMS-IX, LINX 확장</li>
                  <li>• <strong>3단계</strong>: France-IX, ESPANIX</li>
                  <li>• <strong>목표</strong>: Top 5 IX 모두 연결</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">사업자 협력</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>인프라</strong>: euNetworks, Zayo</li>
                  <li>• <strong>DC</strong>: Equinix, Interxion</li>
                  <li>• <strong>로컬</strong>: Orange, Telefonica</li>
                  <li>• <strong>형태</strong>: JV, IRU, 상호접속</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. 투자 계획 및 기대 효과 */}
      <div id="europe-financial" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <DollarSign className="w-6 h-6 mr-2 text-green-600" />
          9. 투자 계획 및 기대 효과
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">8.1 투자 규모 (3년 총계)</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">항목</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">투자액 (USD)</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">싱가포르-유럽 IRU</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">15-20M</td>
                    <td className="border border-gray-300 px-4 py-2">3개 시스템, 100Gbps</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">마르세유 PoP</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">8-10M</td>
                    <td className="border border-gray-300 px-4 py-2">5개소 구축</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">프랑크푸르트 PoP</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">12-15M</td>
                    <td className="border border-gray-300 px-4 py-2">7개소 구축</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">런던 구조조정</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">5-7M</td>
                    <td className="border border-gray-300 px-4 py-2">통폐합 비용</td>
                  </tr>
                  <tr className="bg-blue-100">
                    <td className="border border-gray-300 px-4 py-2 font-bold">총 투자</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold text-blue-600">40-52M</td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">8.2 기대 효과</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-700 mb-2">정량적 효과</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 운영비 절감: 연간 USD 8-10M (25-30%)</li>
                  <li>• 레이턴시 개선: 싱가포르-유럽 평균 20-30ms 단축</li>
                  <li>• 매출 성장: 아시아-유럽 트래픽 40% 증가 예상</li>
                  <li>• ROI: 15-18% (5년 기준)</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-700 mb-2">정성적 효과</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Hyperscaler 파트너십 강화 기반 마련</li>
                  <li>• EU 규제 리스크 분산</li>
                  <li>• 아시아 중심 성장 전략과 일관성 확보</li>
                  <li>• End-to-End 서비스 차별화</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 9. 위험 관리 */}
      <div id="europe-risk" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
          10. 위험 관리
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">시장 위험</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 경쟁 심화 (euNetworks, Zayo)</li>
                <li>• 가격 압력 증가</li>
                <li>• 시장 포화 가능성</li>
                <li className="text-red-600">→ 차별화 전략 필수</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">규제 위험</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• GDPR 준수 부담</li>
                <li>• 데이터 주권 규제</li>
                <li>• 환경 규제 강화</li>
                <li className="text-orange-600">→ 현지 법무 지원</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">운영 위험</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 현지 인력 확보</li>
                <li>• 24/7 운영 체계</li>
                <li>• 서비스 품질 유지</li>
                <li className="text-yellow-600">→ 파트너십 활용</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 10. 실행 로드맵 */}
      <div id="europe-roadmap" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <ArrowRight className="w-6 h-6 mr-2 text-blue-600" />
          11. 실행 로드맵
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h4 className="font-bold text-blue-800 mb-2">Phase 1 (2025)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ 마르세유 PoP 구축</li>
                <li>✓ DE-CIX Frankfurt 연결</li>
                <li>✓ 초기 고객 확보</li>
                <li>✓ 파트너십 체결</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h4 className="font-bold text-green-800 mb-2">Phase 2 (2026)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ 프랑크푸르트 진출</li>
                <li>✓ Top 5 IX 모두 연결</li>
                <li>✓ 서비스 포트폴리오 확대</li>
                <li>✓ 매출 $8M 달성</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <h4 className="font-bold text-purple-800 mb-2">Phase 3 (2027+)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ FLAP-D 전체 커버리지</li>
                <li>✓ 자체 인프라 구축</li>
                <li>✓ M&A 기회 검토</li>
                <li>✓ 매출 $15M+ 목표</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 결론 */}
      <div className="pdf-section bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">결론 및 권고사항</h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-3">핵심 권고사항</h3>
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">1.</span>
                <span><strong>마르세유 우선 진출</strong>: 아시아-유럽 Bridge 최적지로 즉시 PoP 구축 권고</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">2.</span>
                <span><strong>프랑크푸르트 IX 연결</strong>: DE-CIX 18.11Tbps 트래픽 활용을 위한 필수 거점</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">3.</span>
                <span><strong>런던 PoP 재배치</strong>: 17개 PoP 중 10개를 마르세유/프랑크푸르트로 전환</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">4.</span>
                <span><strong>파트너십 중심 전략</strong>: Hyperscaler와의 전략적 협력으로 차별화</span>
              </li>
            </ol>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-3">예상 성과</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">15-18%</p>
                <p className="text-sm text-gray-600">예상 ROI (5년)</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">$40-52M</p>
                <p className="text-sm text-gray-600">총 투자 규모 (3년)</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">40%</p>
                <p className="text-sm text-gray-600">아시아-유럽 트래픽 증가</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 트래픽 이동 상세 근거 모달 */}
      {showTrafficModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">아시아-유럽 트래픽 중심축 이동 - 상세 근거자료</h2>
              <button
                onClick={() => setShowTrafficModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* 1. 트래픽 증가 통계 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">1. 글로벌 인터넷 트래픽 분포 변화</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border px-3 py-2 text-left">지역</th>
                      <th className="border px-3 py-2 text-center">2020년</th>
                      <th className="border px-3 py-2 text-center">2024년</th>
                      <th className="border px-3 py-2 text-center">CAGR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-3 py-2">아시아-태평양</td>
                      <td className="border px-3 py-2 text-center">48%</td>
                      <td className="border px-3 py-2 text-center font-bold">60%</td>
                      <td className="border px-3 py-2 text-center">+25%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-3 py-2">북미</td>
                      <td className="border px-3 py-2 text-center">28%</td>
                      <td className="border px-3 py-2 text-center">22%</td>
                      <td className="border px-3 py-2 text-center">-5%</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">유럽</td>
                      <td className="border px-3 py-2 text-center">18%</td>
                      <td className="border px-3 py-2 text-center">14%</td>
                      <td className="border px-3 py-2 text-center">-6%</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-600 mt-2">출처: Cisco Annual Internet Report 2024, TeleGeography Global Internet Geography 2024</p>
              </div>

              {/* 2. 해저케이블 용량 상세 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">2. 싱가포르-마르세유 해저케이블 시스템 상세</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border px-3 py-2 text-left">케이블명</th>
                      <th className="border px-3 py-2 text-center">용량(Tbps)</th>
                      <th className="border px-3 py-2 text-center">운영개시</th>
                      <th className="border px-3 py-2 text-left">주요 투자자</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-3 py-2 font-semibold">SEA-ME-WE 6</td>
                      <td className="border px-3 py-2 text-center">130</td>
                      <td className="border px-3 py-2 text-center">2024.04</td>
                      <td className="border px-3 py-2">Orange, Singtel 등 19개사</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-3 py-2 font-semibold">2Africa</td>
                      <td className="border px-3 py-2 text-center">180</td>
                      <td className="border px-3 py-2 text-center">2024.Q1</td>
                      <td className="border px-3 py-2">Meta, MTN, Orange, Vodafone</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2 font-semibold">PEACE</td>
                      <td className="border px-3 py-2 text-center">96</td>
                      <td className="border px-3 py-2 text-center">2022</td>
                      <td className="border px-3 py-2">Huawei Marine, PCCW</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-3 py-2 font-semibold">Blue-Raman</td>
                      <td className="border px-3 py-2 text-center">218</td>
                      <td className="border px-3 py-2 text-center">2025.Q1</td>
                      <td className="border px-3 py-2">Google, Sparkle</td>
                    </tr>
                    <tr className="bg-blue-100">
                      <td className="border px-3 py-2 font-bold">합계</td>
                      <td className="border px-3 py-2 text-center font-bold">624</td>
                      <td className="border px-3 py-2 text-center">-</td>
                      <td className="border px-3 py-2">-</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-600 mt-2">출처: Submarine Cable Map 2024, TeleGeography Database</p>
              </div>

              {/* 3. 대체 경로 활성화 근거 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">3. 중동/아프리카 경유 대체 경로 활성화 배경</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2">①</span>
                    <div>
                      <strong>지정학적 리스크 분산:</strong> 홍해(수에즈 운하) 단일 경로 의존도 감소 필요
                      <ul className="ml-4 mt-1 text-gray-600">
                        <li>• 2023년 홍해 해운 차질로 케이블 손상 리스크 부각</li>
                        <li>• 전체 아시아-유럽 트래픽의 95%가 홍해 경유 (2023년 기준)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2">②</span>
                    <div>
                      <strong>대체 경로 투자 증가:</strong>
                      <ul className="ml-4 mt-1 text-gray-600">
                        <li>• 마르세유-지브롤터-서아프리카 경로: 2Africa (180 Tbps)</li>
                        <li>• 두바이-오만-케냐 경로: PEACE East (96 Tbps)</li>
                        <li>• 인도-남아공 직접 연결: India-Africa-1 (계획중)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2">③</span>
                    <div>
                      <strong>레이턴시 개선:</strong> 일부 경로에서 홍해 경유보다 10-15ms 단축
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">출처: SubOptic 2023 Conference Papers, ITU Broadband Maps 2024</p>
              </div>

              {/* 4. 추가 검증 자료 */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">4. 핵심 인사이트</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>수정된 수치:</strong> 싱가포르-마르세유 간 실제 운영중인 케이블 용량은 406 Tbps (SMW6 130 + 2Africa 180 + PEACE 96)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>2025년 예상:</strong> Blue-Raman(218 Tbps) 추가 시 총 624 Tbps로 증가</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>트래픽 이동:</strong> 실제로는 "대서양 중심"이 아닌 "대서양 의존도 감소"가 정확한 표현</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>KT 기회:</strong> 마르세유 허브 활용 시 아시아-유럽 트래픽의 새로운 경로 확보 가능</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hyperscaler 시장 주도권 상세 근거 모달 */}
      {showHyperscalerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Hyperscaler 시장 주도권 확대 - 상세 근거자료</h2>
              <button
                onClick={() => setShowHyperscalerModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* 1. 대역폭 사용 비중 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">1. Hyperscaler의 글로벌 대역폭 점유율 추이</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border px-3 py-2 text-left">구분</th>
                      <th className="border px-3 py-2 text-center">2016</th>
                      <th className="border px-3 py-2 text-center">2020</th>
                      <th className="border px-3 py-2 text-center">2024</th>
                      <th className="border px-3 py-2 text-center">2027(E)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-3 py-2 font-semibold">전체 대역폭 사용률</td>
                      <td className="border px-3 py-2 text-center">26%</td>
                      <td className="border px-3 py-2 text-center">56%</td>
                      <td className="border px-3 py-2 text-center font-bold text-blue-600">71%</td>
                      <td className="border px-3 py-2 text-center">80%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-3 py-2 font-semibold">대서양 횡단 경로</td>
                      <td className="border px-3 py-2 text-center">40%</td>
                      <td className="border px-3 py-2 text-center">68%</td>
                      <td className="border px-3 py-2 text-center font-bold text-red-600">77%</td>
                      <td className="border px-3 py-2 text-center">85%</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2 font-semibold">태평양 횡단 경로</td>
                      <td className="border px-3 py-2 text-center">33%</td>
                      <td className="border px-3 py-2 text-center">64%</td>
                      <td className="border px-3 py-2 text-center font-bold">73%</td>
                      <td className="border px-3 py-2 text-center">82%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-3 py-2 font-semibold">아시아-유럽 경로</td>
                      <td className="border px-3 py-2 text-center">18%</td>
                      <td className="border px-3 py-2 text-center">45%</td>
                      <td className="border px-3 py-2 text-center font-bold">66%</td>
                      <td className="border px-3 py-2 text-center">75%</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-600 mt-2">출처: TeleGeography Global Bandwidth Research 2024</p>
              </div>

              {/* 2. 투자 규모 상세 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">2. Big Tech 해저케이블 투자 현황 (2021-2024)</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border px-3 py-2 text-left">기업</th>
                      <th className="border px-3 py-2 text-left">주요 케이블 프로젝트</th>
                      <th className="border px-3 py-2 text-center">투자액(M$)</th>
                      <th className="border px-3 py-2 text-center">소유형태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-3 py-2 font-semibold">Google</td>
                      <td className="border px-3 py-2">Dunant, Grace Hopper, Firmina, Blue-Raman</td>
                      <td className="border px-3 py-2 text-center">650</td>
                      <td className="border px-3 py-2 text-center">단독/공동</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-3 py-2 font-semibold">Meta</td>
                      <td className="border px-3 py-2">2Africa, Anjana, Echo, Bifrost</td>
                      <td className="border px-3 py-2 text-center">580</td>
                      <td className="border px-3 py-2 text-center">컨소시엄</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2 font-semibold">Microsoft</td>
                      <td className="border px-3 py-2">MAREA, AEC-2, Amitié</td>
                      <td className="border px-3 py-2 text-center">420</td>
                      <td className="border px-3 py-2 text-center">공동</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-3 py-2 font-semibold">Amazon</td>
                      <td className="border px-3 py-2">JUPITER, Bay to Bay Express</td>
                      <td className="border px-3 py-2 text-center">350</td>
                      <td className="border px-3 py-2 text-center">컨소시엄</td>
                    </tr>
                    <tr className="bg-blue-100">
                      <td className="border px-3 py-2 font-bold">합계</td>
                      <td className="border px-3 py-2">-</td>
                      <td className="border px-3 py-2 text-center font-bold">2,000</td>
                      <td className="border px-3 py-2 text-center">-</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-600 mt-2">출처: Submarine Networks World 2024, 각 사 IR 자료</p>
              </div>

              {/* 3. 소유 구조 변화 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">3. 해저케이블 소유 구조 변화</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">2016년 소유 구조</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 통신사 단독/컨소시엄: <strong>82%</strong></li>
                      <li>• Hyperscaler 참여: <strong>10%</strong></li>
                      <li>• 정부/기타: <strong>8%</strong></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">2024년 소유 구조</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 통신사 단독/컨소시엄: <strong>28%</strong></li>
                      <li className="text-blue-600">• Hyperscaler 참여: <strong>66%</strong></li>
                      <li>• 정부/기타: <strong>6%</strong></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>주요 변화:</strong> Hyperscaler가 단순 용량 구매자에서 케이블 소유자로 전환. 
                    특히 Google은 14개 해저케이블 직접 투자, Meta는 16개 케이블 컨소시엄 참여
                  </p>
                </div>
              </div>

              {/* 4. 통신사 영향 분석 */}
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">4. 통신사업자에 대한 영향</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2">①</span>
                    <div>
                      <strong>수익 구조 변화:</strong>
                      <ul className="ml-4 mt-1 text-gray-600">
                        <li>• IRU/리스 판매 수익 감소 (2020년 대비 -35%)</li>
                        <li>• Hyperscaler 의존도 증가 (전체 수익의 45%)</li>
                        <li>• 협상력 약화로 마진 압박</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-2">②</span>
                    <div>
                      <strong>KT 대응 전략 방향:</strong>
                      <ul className="ml-4 mt-1 text-gray-600">
                        <li>• Hyperscaler가 진출하지 않은 틈새 시장 공략</li>
                        <li>• 마르세유 같은 신흥 허브에서 파트너십 구축</li>
                        <li>• B2B 기업고객 중심 차별화 서비스</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. 핵심 시사점 */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">5. 핵심 시사점 및 수정사항</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>수정된 수치:</strong> 전체 대역폭의 71% 사용 (75%가 아닌), 대서양 경로는 77% (92%가 아닌)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>투자 규모:</strong> 2021-2024년 20억 달러 (2025년까지 19.3억이 아닌)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>중요 트렌드:</strong> 단순 사용에서 직접 소유로 전환이 핵심 (2024년 66% 직접 참여)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>KT 시사점:</strong> Hyperscaler와 경쟁보다는 보완적 파트너십 구축이 현실적</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLAP to FLAP-D Evolution Modal */}
      {showFlapEvolutionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                FLAP에서 FLAP-D로의 진화 타임라인
              </h2>
              <button
                onClick={() => setShowFlapEvolutionModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* 1. 초기 FLAP 시대 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">1. FLAP 시대 (2010년대 초반~2016년)</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold text-gray-700">2010-2015년: FLAP 용어 정착</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• Frankfurt, London, Amsterdam, Paris가 유럽 4대 DC 허브로 확립</li>
                      <li>• CBRE, JLL 등 부동산 리서치 회사들이 FLAP 용어 사용 시작</li>
                      <li>• 당시 더블린은 상대적으로 소규모 시장</li>
                    </ul>
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                      <strong>출처:</strong> CBRE European Data Centres MarketView Q4 2015
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. 더블린 급성장기 */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">2. 더블린 급성장 시작 (2016-2018년)</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="font-semibold text-gray-700">2016년: 더블린 부상의 신호</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• 브렉시트 투표(2016.6) 후 금융기관들의 더블린 관심 증가</li>
                      <li>• Facebook, Google 등 대형 테크 기업 더블린 DC 확장 발표</li>
                      <li>• 법인세 12.5% 이점 부각</li>
                    </ul>
                    <div className="mt-2 p-2 bg-yellow-100 rounded text-xs">
                      <strong>출처:</strong> DatacenterDynamics "Dublin emerges as Brexit winner" (2017.3)
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4 mt-3">
                    <p className="font-semibold text-gray-700">2017-2018년: FLAP-D 용어 첫 등장</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• Knight Frank 리포트에서 처음 "FLAP-D" 언급 (2017 Q4)</li>
                      <li>• 더블린 DC 용량 300MW 돌파</li>
                      <li>• Amazon Web Services 더블린 리전 확장</li>
                    </ul>
                    <div className="mt-2 p-2 bg-yellow-100 rounded text-xs">
                      <strong>출처:</strong> Knight Frank European Data Centre Report 2018
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. FLAP-D 공식화 */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">3. FLAP-D 공식화 (2019-2020년)</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-semibold text-gray-700">2019년: 업계 표준 용어로 정착</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• JLL, CBRE, Cushman & Wakefield 모두 FLAP-D 용어 채택</li>
                      <li>• 더블린 DC 용량 500MW 돌파</li>
                      <li>• Microsoft, Oracle 등 추가 진출</li>
                    </ul>
                    <div className="mt-2 p-2 bg-green-100 rounded text-xs">
                      <strong>출처:</strong> JLL Data Centre Outlook 2019, CBRE Data Centre MarketView 2019
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4 mt-3">
                    <p className="font-semibold text-gray-700">2020년: 더블린이 파리 추월</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• 더블린 769MW로 유럽 3위 도시로 부상 (계획 기준)</li>
                      <li>• "Dublin overtakes Paris" - DatacenterDynamics 헤드라인</li>
                      <li>• COVID-19로 디지털 전환 가속화</li>
                    </ul>
                    <div className="mt-2 p-2 bg-green-100 rounded text-xs">
                      <strong>출처:</strong> DatacenterDynamics "Dublin becomes Europe's third-largest data center hub" (2020.7)
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. 현재 FLAP-D 시대 */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">4. FLAP-D 시대 정착 (2021-현재)</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold text-gray-700">2021-2022년: 더블린 성장 제약</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• 아일랜드 전력망 제약으로 신규 DC 승인 중단</li>
                      <li>• EirGrid(아일랜드 송전사업자) DC 모라토리엄 선언</li>
                      <li>• 그럼에도 FLAP-D 용어는 업계 표준으로 유지</li>
                    </ul>
                    <div className="mt-2 p-2 bg-blue-100 rounded text-xs">
                      <strong>출처:</strong> EirGrid "Data Centre Connection Policy" (2021.11)
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4 mt-3">
                    <p className="font-semibold text-gray-700">2023-2024년: FLAP-D 이후 논의</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• 일부에서 FLAP-M(+Milan) 또는 FLAPM(+Madrid) 제안</li>
                      <li>• 마르세유, 바르셀로나 등 제2선 도시 부상</li>
                      <li>• 하지만 FLAP-D가 여전히 가장 널리 사용되는 용어</li>
                    </ul>
                    <div className="mt-2 p-2 bg-blue-100 rounded text-xs">
                      <strong>출처:</strong> Savills European Data Centres 2024, Structure Research 2024
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. 핵심 정리 */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">핵심 정리</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3">
                    <p className="font-semibold text-purple-700 mb-2">FLAP → FLAP-D 전환 시점</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>2017년:</strong> 용어 첫 등장</li>
                      <li>• <strong>2019년:</strong> 업계 표준화</li>
                      <li>• <strong>2020년:</strong> 완전 정착</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded p-3">
                    <p className="font-semibold text-purple-700 mb-2">주요 리서치 회사 채택</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• JLL: 2019년부터</li>
                      <li>• CBRE: 2019년부터</li>
                      <li>• Knight Frank: 2017년부터</li>
                      <li>• Cushman & Wakefield: 2019년부터</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-purple-100 rounded">
                  <p className="text-sm text-purple-900">
                    <strong>결론:</strong> FLAP는 2010년대 초반~2018년까지 사용되었으며, 
                    2017년부터 FLAP-D가 등장하기 시작해 2019년에 업계 표준이 되었고, 
                    2020년에 완전히 정착되었습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NTT 유럽 데이터센터 현황 분석 (싱가포르-유럽 IRU에서 이동) */}
      <div id="europe-ntt-analysis" className="pdf-section bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Building2 className="w-6 h-6 mr-2 text-purple-600" />
          12. NTT 유럽 데이터센터 현황 분석 (부록)
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">전세계 DC 현황 (2025년 기준)</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">구분</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">수량/규모</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">총 DC 수</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">160개 이상</td>
                    <td className="border border-gray-300 px-4 py-2">세계 3위 데이터센터 사업자</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">국가/지역</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">20개국 이상</td>
                    <td className="border border-gray-300 px-4 py-2">Americas, EMEA, APAC, 인도</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">총 직원 수</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">약 194,000명</td>
                    <td className="border border-gray-300 px-4 py-2">50개국 이상에 분포</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">총 투자규모</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">$100억</td>
                    <td className="border border-gray-300 px-4 py-2">2023-2027 글로벌 확장 계획</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">지역별 DC 운영 용량 (2024년 실제 데이터)</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">지역</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">운영 용량</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">2024년 추가</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">비중</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Americas (미주)</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">520MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">24MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">40.0%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">EMEA (유럽/중동/아프리카)</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">430MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">41MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">33.1%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">India (인도)</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">290MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">155MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">22.3%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">APAC (아시아태평양)</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">60MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">7MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">4.6%</td>
                  </tr>
                  <tr className="bg-blue-100">
                    <td className="border border-gray-300 px-4 py-2 font-bold">전체</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">1,300MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">227MW</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">유럽(EMEA) 국가별 DC 현황</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">국가</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">도시</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">DC 수</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">용량/특징</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={4}>🇩🇪 독일</td>
                    <td className="border border-gray-300 px-4 py-2">프랑크푸르트</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">5개</td>
                    <td className="border border-gray-300 px-4 py-2">77.4MW, 52,200m² IT 공간</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">뮌헨</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2개+</td>
                    <td className="border border-gray-300 px-4 py-2">1,100 랙, 5,600m² 확장 계획</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">베를린</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">1개</td>
                    <td className="border border-gray-300 px-4 py-2">2024년 신규 부지 취득</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">니어스테인</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">계획</td>
                    <td className="border border-gray-300 px-4 py-2">프랑크푸르트 남쪽 50km</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={3}>🇬🇧 영국</td>
                    <td className="border border-gray-300 px-4 py-2">런던</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">7개+</td>
                    <td className="border border-gray-300 px-4 py-2">도크랜즈 인근, 금융허브</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 px-4 py-2">헤멀햄스테드</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">1개+</td>
                    <td className="border border-gray-300 px-4 py-2">LON7, 런던 위성 지역</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 px-4 py-2">신규부지</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">계획</td>
                    <td className="border border-gray-300 px-4 py-2">LON2, 26.3 에이커</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🇳🇱 네덜란드</td>
                    <td className="border border-gray-300 px-4 py-2">암스테르담</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2개+</td>
                    <td className="border border-gray-300 px-4 py-2">9,720m² 확장 중</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🇫🇷 프랑스</td>
                    <td className="border border-gray-300 px-4 py-2">파리 남부</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">3개 건설 중</td>
                    <td className="border border-gray-300 px-4 py-2">84MW, 14.4 헥타르</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🇪🇸 스페인</td>
                    <td className="border border-gray-300 px-4 py-2">마드리드</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">1개+</td>
                    <td className="border border-gray-300 px-4 py-2">Las Rozas, 2022년 개장</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🇮🇹 이탈리아</td>
                    <td className="border border-gray-300 px-4 py-2">밀라노</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">계획</td>
                    <td className="border border-gray-300 px-4 py-2">53 에이커, 128MW 용량</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🇦🇹 오스트리아</td>
                    <td className="border border-gray-300 px-4 py-2">비엔나</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">1개+</td>
                    <td className="border border-gray-300 px-4 py-2">동유럽 게이트웨이</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">🇨🇭 스위스</td>
                    <td className="border border-gray-300 px-4 py-2">취리히</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">1개+</td>
                    <td className="border border-gray-300 px-4 py-2">Rümlang, 2011년 개장</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">유럽 핵심 시장 집중도 (FLAP 전략)</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">도시</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">DC 집중도</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">특징</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">용량/투자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">프랑크푸르트</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <span className="text-green-600 font-bold">5개</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      • 독일 금융 수도<br/>
                      • DE-CIX (세계 최대 IXP)<br/>
                      • 동서유럽 연결 허브
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">77.4MW+</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">런던</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <span className="text-green-600 font-bold">7개+</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      • 유럽 금융 중심지<br/>
                      • LINX 허브<br/>
                      • 브렉시트 후에도 지속 투자
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">100MW+</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">암스테르담</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <span className="text-yellow-600 font-bold">2개+</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      • AMS-IX 허브<br/>
                      • 유럽 디지털 게이트웨이<br/>
                      • 확장 진행 중
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">확장 중</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">파리</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <span className="text-blue-600 font-bold">3개 (신규)</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      • FLAP 전략 완성<br/>
                      • 2024년 신규 진입<br/>
                      • 대규모 투자
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">84MW</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">투자 계획 (2023-2027)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">총 투자 규모</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 글로벌 DC 투자: <span className="font-bold">$100억 이상</span></li>
                  <li>• 데이터센터 특화: <span className="font-bold">¥1.5조 이상</span></li>
                  <li>• 2024년 연간 투자: <span className="font-bold">$2.9억</span></li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">2024년 지역별 신규 용량</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 인도: <span className="font-bold">155MW (68.3%)</span></li>
                  <li>• EMEA: <span className="font-bold">41MW (18.1%)</span></li>
                  <li>• Americas: <span className="font-bold">24MW (10.6%)</span></li>
                  <li>• APAC: <span className="font-bold">7MW (3.1%)</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">주요 시사점</h3>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h4 className="font-semibold text-gray-800 mb-2">NTT의 유럽 전략 특징</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• EMEA 지역 집중도: 전체 DC 용량의 <span className="font-bold">33.1% (430MW/1,300MW)</span></li>
                <li>• 독일 최우선: 프랑크푸르트 5개 DC로 유럽 내 최대 집중</li>
                <li>• 영국 지속 투자: 런던 7개+ DC 운영, 신규 26.3 에이커 부지 확보</li>
                <li>• 프랑스 신규 진출: 2024년 파리 84MW 프로젝트로 FLAP 전략 완성</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">마르세유 IRU 전략과의 차별화 포인트</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 지중해 루트: 마르세유 중심의 남유럽-MENA 연결 (NTT 미진출 지역)</li>
                <li>• 동남아 허브: 싱가포르-조호바르 DC를 통한 동남아 거점 확보</li>
                <li>• 타이밍: NTT가 상대적으로 약한 남유럽/지중해 지역 선점 기회</li>
                <li>• 파트너십: 직접 투자(NTT $100억) 대비 효율적 IRU 전략</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}