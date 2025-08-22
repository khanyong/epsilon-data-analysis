import React, { useEffect } from 'react';
import {
  FileText,
  ExternalLink,
  Database,
  ChartBar,
  Globe,
  BookOpen,
  Link,
  AlertCircle
} from 'lucide-react';

export function DataReferences() {
  // 페이지 로드 시 hash가 있으면 해당 위치로 스크롤
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">6. 근거 자료 및 세부 데이터</h1>
        <p className="text-gray-600">Epsilon 성장 전략 보고서 참고 자료 및 데이터 출처</p>
        <div className="mt-2">
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
            참고자료
          </span>
        </div>
      </div>

      {/* 섹션 1: 조호바르DC/싱가포르 DC 근거 자료 */}
      <div className="bg-white rounded-xl shadow-lg p-8" id="ref-johor-singapore">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Database className="w-6 h-6 mr-2 text-blue-600" />
          1. 조호바르DC/싱가포르 DC 구축 - 근거 자료
        </h2>

        <div className="space-y-6">
          {/* 시장 규모 및 성장률 */}
          <div id="ref-dc-market-size">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">1.1 데이터센터 시장 규모 및 성장률</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2">지표</th>
                    <th className="text-right py-2">수치</th>
                    <th className="text-left py-2">출처</th>
                    <th className="text-center py-2">연도</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">싱가포르 DC 총 용량</td>
                    <td className="text-right py-2 font-semibold">700MW+</td>
                    <td className="py-2 text-gray-600">
                      <div className="space-y-1">
                        <a href="https://www.cushmanwakefield.com/en/singapore/news/2023/08/singapores-data-centre-market-to-surpass-1gw-milestone-by-2024" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline block text-xs">
                          Cushman & Wakefield: 싱가포르 1GW 돌파 전망 (2024)
                        </a>
                        <a href="https://www.mordorintelligence.com/industry-reports/singapore-data-center-market" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline block text-xs">
                          Mordor Intelligence: 싱가포르 DC 시장 분석
                        </a>
                        <a href="https://www.dcbyte.com/market-spotlights/singapore-data-centre-market-may-2024/" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline block text-xs">
                          DC Byte: 싱가포르 시장 현황 (2024년 5월)
                        </a>
                      </div>
                    </td>
                    <td className="text-center py-2">2024</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">싱가포르 DC 모라토리엄</td>
                    <td className="text-right py-2 font-semibold">2019-2022</td>
                    <td className="py-2 text-gray-600">
                      <div className="space-y-1">
                        <a href="https://www.datacenterdynamics.com/en/analysis/after-the-moratorium-how-singapore-plans-to-stay-in-data-center-race/" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline block text-xs">
                          DCD: 싱가포르 모라토리엄 분석 (2022)
                        </a>
                        <a href="https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2022/launch-of-pilot-data-centre---call-for-application-to-support-sustainable-growth-of-dcs" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline block text-xs">
                          IMDA 공식 발표: DC-CFA 파일럿 프로그램 (2022)
                        </a>
                        <a href="https://www.datacenterknowledge.com/cooling/singapore-ends-data-center-pause-as-it-seeks-sustainable-growth" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline block text-xs">
                          Data Center Knowledge: 모라토리엄 종료 발표
                        </a>
                      </div>
                    </td>
                    <td className="text-center py-2">2019-2022</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">조호바르 계획 용량</td>
                    <td className="text-right py-2 font-semibold">1,000MW+</td>
                    <td className="py-2 text-gray-600">
                      <a href="https://www.datacenterdynamics.com/en/news/ntt-plans-290mw-data-center-campus-in-johor-malaysia/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NTT 290MW 포함 다수 프로젝트</a>
                    </td>
                    <td className="text-center py-2">2024</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">비용 절감율 (vs 싱가포르)</td>
                    <td className="text-right py-2 font-semibold">40-50%</td>
                    <td className="py-2 text-gray-600">
                      Cushman & Wakefield Asia Pacific Data Centre Report 2023
                    </td>
                    <td className="text-center py-2">2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 하이퍼스케일러 투자 */}
          <div id="ref-hyperscaler-investment">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">1.2 하이퍼스케일러 투자 현황</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">Microsoft</h4>
                  <p className="text-sm text-gray-600">투자 규모: USD 2.2B (말레이시아)</p>
                  <p className="text-xs text-gray-500">출처: Microsoft Press Release, 2024년 5월 2일</p>
                  <p className="text-xs text-gray-500">"Microsoft to establish cloud and AI infrastructure in Malaysia"</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">Google</h4>
                  <p className="text-sm text-gray-600">투자 규모: USD 2.0B (태국/말레이시아)</p>
                  <p className="text-xs text-gray-500">출처: Google Cloud Press Release, 2024년 9월</p>
                  <p className="text-xs text-gray-500">"Google announces $2 billion investment in Malaysia and Thailand"</p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold">Amazon Web Services</h4>
                  <p className="text-sm text-gray-600">투자 규모: USD 9.0B (싱가포르, 2023-2028)</p>
                  <p className="text-xs text-gray-500">출처: AWS Press Release, 2023년 5월</p>
                  <p className="text-xs text-gray-500">"AWS to invest $9 billion in Singapore to expand cloud infrastructure"</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold">ByteDance</h4>
                  <p className="text-sm text-gray-600">투자 규모: USD 2.1B (조호바르 데이터센터)</p>
                  <p className="text-xs text-gray-500">출처: Reuters, 2024년 6월 7일</p>
                  <p className="text-xs text-gray-500">"ByteDance plans $2.1 billion investment in Malaysia AI and data center hub"</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold">Equinix</h4>
                  <p className="text-sm text-gray-600">투자 규모: USD 260M (싱가포르 SG6)</p>
                  <p className="text-xs text-gray-500">출처: <a href="https://www.equinix.com/newsroom/press-releases/2024/11/equinix-to-help-accelerate-ai-innovation-in-singapore-with-us-260-million-data-center-expansion" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Equinix Press Release, 2024년 11월 19일</a></p>
                  <p className="text-xs text-gray-500">"20MW AI-ready data center opening Q1 2027"</p>
                </div>
              </div>
            </div>
          </div>

          {/* 전력 비용 비교 */}
          <div id="ref-power-cost">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">1.3 전력 비용 비교 데이터</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2">지역</th>
                    <th className="text-right py-2">전력 비용 (USD/kWh)</th>
                    <th className="text-right py-2">냉각 PUE</th>
                    <th className="text-right py-2">총 운영비용 지수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">싱가포르</td>
                    <td className="text-right py-2">$0.18-0.22</td>
                    <td className="text-right py-2">1.7-1.9</td>
                    <td className="text-right py-2">100 (기준)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">조호바르</td>
                    <td className="text-right py-2">$0.08-0.10</td>
                    <td className="text-right py-2">1.5-1.7</td>
                    <td className="text-right py-2">55-60</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-xs text-gray-600 mt-2 space-y-1">
                <p>출처:</p>
                <a href="https://www.spgroup.com.sg/our-services/utilities/tariff-information" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                  • SP Group: 싱가포르 전력 요금 정보
                </a>
                <a href="https://www.ema.gov.sg/consumer-information/electricity/buying-electricity/buying-at-regulated-tariff" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                  • EMA Singapore: 규제 전력 요금
                </a>
                <a href="https://www.tnb.com.my/commercial-industrial/pricing-tariffs" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline block">
                  • TNB Malaysia: 상업/산업 전력 요금
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 섹션 2: 동남아 해저케이블 직접 구축 근거 자료 */}
      <div className="bg-white rounded-xl shadow-lg p-8" id="ref-sea-cable">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-indigo-600" />
          2. 동남아 해저케이블 직접 구축 - 근거 자료
        </h2>

        <div className="space-y-6">
          {/* 해저케이블 용량 및 트래픽 */}
          <div id="ref-cable-capacity">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.1 해저케이블 용량 및 트래픽 데이터</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="mb-4">
                <h4 className="font-semibold mb-2">주요 케이블 시스템 현황</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-2">케이블명</th>
                      <th className="text-right py-2">총 용량</th>
                      <th className="text-right py-2">활용률</th>
                      <th className="text-left py-2">주요 경로</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">SEA-ME-WE 3</td>
                      <td className="text-right py-2">960 Gbps</td>
                      <td className="text-right py-2">95%</td>
                      <td className="py-2">동남아-중동-유럽</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">AAG</td>
                      <td className="text-right py-2">2.88 Tbps</td>
                      <td className="text-right py-2">88%</td>
                      <td className="py-2">아시아-미국</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">APG</td>
                      <td className="text-right py-2">54 Tbps</td>
                      <td className="text-right py-2">72%</td>
                      <td className="py-2">아시아-태평양</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">SJC2</td>
                      <td className="text-right py-2">144 Tbps</td>
                      <td className="text-right py-2">45%</td>
                      <td className="py-2">동남아-일본-중국</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-600 mt-2">
                  출처: TeleGeography Submarine Cable Map Database (2024)
                </p>
                <p className="text-xs text-gray-600">
                  참고: <a href="https://www.submarinecablemap.com/" target="_blank" rel="noopener noreferrer"
                          className="text-blue-600 hover:underline inline-flex items-center">
                    Submarine Cable Map <ExternalLink className="w-3 h-3 ml-1" />
                  </a> (인터랙티브 맵)
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">국제 대역폭 수요 성장률</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-2">경로</th>
                      <th className="text-right py-2">2023년 (Tbps)</th>
                      <th className="text-right py-2">2028년 예상 (Tbps)</th>
                      <th className="text-right py-2">CAGR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">인트라-아시아</td>
                      <td className="text-right py-2">285</td>
                      <td className="text-right py-2">890</td>
                      <td className="text-right py-2">26%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">아시아-미국</td>
                      <td className="text-right py-2">125</td>
                      <td className="text-right py-2">320</td>
                      <td className="text-right py-2">21%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">아시아-유럽</td>
                      <td className="text-right py-2">95</td>
                      <td className="text-right py-2">210</td>
                      <td className="text-right py-2">17%</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-600 mt-2">
                  출처: TeleGeography Global Bandwidth Research Service 2024
                </p>
              </div>
            </div>
          </div>

          {/* 투자 비용 분석 */}
          <div id="ref-cable-investment">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.2 해저케이블 투자 비용 분석</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2">구성 요소</th>
                    <th className="text-right py-2">비용 (USD/km)</th>
                    <th className="text-right py-2">비중 (%)</th>
                    <th className="text-left py-2">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">케이블 제조</td>
                    <td className="text-right py-2">$20,000-30,000</td>
                    <td className="text-right py-2">35%</td>
                    <td className="py-2">광섬유 페어 수에 따라 변동</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">해저 설치</td>
                    <td className="text-right py-2">$25,000-40,000</td>
                    <td className="text-right py-2">40%</td>
                    <td className="py-2">수심, 해저 지형에 따라 변동</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">육양국 구축</td>
                    <td className="text-right py-2">$5M-10M/site</td>
                    <td className="text-right py-2">15%</td>
                    <td className="py-2">위치별 고정비</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">허가 및 조사</td>
                    <td className="text-right py-2">$5,000-10,000</td>
                    <td className="text-right py-2">10%</td>
                    <td className="py-2">국가별 규제에 따라 변동</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-2">
                출처: SubOptic Conference 2023 Proceedings, 
                "Economics of Modern Submarine Cable Systems" by Pioneer Consulting
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 섹션 3: 동남아 PoP 확대 구축 근거 자료 */}
      <div className="bg-white rounded-xl shadow-lg p-8" id="ref-sea-pop">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <ChartBar className="w-6 h-6 mr-2 text-purple-600" />
          3. 동남아 PoP 확대 구축 - 근거 자료
        </h2>

        <div className="space-y-6">
          {/* IP 트래픽 성장 데이터 */}
          <div id="ref-ip-traffic">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.1 동남아 IP 트래픽 성장 데이터</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2">국가</th>
                    <th className="text-right py-2">2024년 (EB/월)</th>
                    <th className="text-right py-2">2030년 예상 (EB/월)</th>
                    <th className="text-right py-2">CAGR (%)</th>
                    <th className="text-left py-2">출처</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">인도네시아</td>
                    <td className="text-right py-2">8.2</td>
                    <td className="text-right py-2">28.5</td>
                    <td className="text-right py-2">23%</td>
                    <td className="py-2"><a href="https://www.mordorintelligence.com/industry-reports/indonesia-data-center-market" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Market Report</a></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">태국</td>
                    <td className="text-right py-2">4.8</td>
                    <td className="text-right py-2">16.2</td>
                    <td className="text-right py-2">22%</td>
                    <td className="py-2"><a href="https://www.mordorintelligence.com/industry-reports/thailand-data-center-market" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Thailand DC Report</a></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">베트남</td>
                    <td className="text-right py-2">3.2</td>
                    <td className="text-right py-2">12.8</td>
                    <td className="text-right py-2">26%</td>
                    <td className="py-2">Cisco VNI</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">필리핀</td>
                    <td className="text-right py-2">2.5</td>
                    <td className="text-right py-2">9.8</td>
                    <td className="text-right py-2">25%</td>
                    <td className="py-2">Cisco VNI</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-2">
                출처: Cisco Visual Networking Index (VNI) Complete Forecast 2023-2028
              </p>
              <p className="text-xs text-gray-600">
                Cisco Annual Internet Report (2023-2028) White Paper
              </p>
            </div>
          </div>

          {/* 클라우드 투자 현황 */}
          <div id="ref-cloud-investment">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.2 클라우드 사업자 투자 현황</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">AWS 투자 계획</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 인도네시아: $5B (2024-2030)</li>
                    <li>• 태국: <a href="https://www.businesswire.com/news/home/20250429664508/en/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">$5B (2024-2034)</a></li>
                    <li>• 말레이시아: $6B (2024-2038)</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
                    출처: AWS Press Releases 2023-2024
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Google Cloud 투자 계획</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 인도네시아: 진행 중</li>
                    <li>• 태국: $1B (2025-2029)</li>
                    <li>• 말레이시아: $2B (2024-2030)</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
                    출처: Google Cloud Press Releases 2024
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PoP 구축 비용 */}
          <div id="ref-pop-cost">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">3.3 PoP 구축 비용 세부내역</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2">도시 등급</th>
                    <th className="text-right py-2">초기 투자 (USD M)</th>
                    <th className="text-right py-2">연간 운영비 (USD M)</th>
                    <th className="text-right py-2">예상 ROI (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Tier-1 (자카르타, 방콕)</td>
                    <td className="text-right py-2">80-100</td>
                    <td className="text-right py-2">8-10</td>
                    <td className="text-right py-2">25-30</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Tier-2 (수라바야, 다낭)</td>
                    <td className="text-right py-2">40-60</td>
                    <td className="text-right py-2">4-6</td>
                    <td className="text-right py-2">20-25</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Tier-3 (지방 도시)</td>
                    <td className="text-right py-2">20-30</td>
                    <td className="text-right py-2">2-3</td>
                    <td className="text-right py-2">15-20</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-2">
                출처: Industry estimates based on Equinix, Digital Realty investor presentations (2023-2024)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 섹션 4: 싱가포르-유럽 IRU 근거 자료 */}
      <div className="bg-white rounded-xl shadow-lg p-8" id="ref-singapore-europe">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-green-600" />
          4. 싱가포르-유럽 관련 IRU - 근거 자료
        </h2>

        <div className="space-y-6">
          {/* 기존 케이블 현황 */}
          <div id="ref-sg-eu-cables">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.1 싱가포르-유럽 케이블 현황</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2">케이블 시스템</th>
                    <th className="text-right py-2">용량 (Tbps)</th>
                    <th className="text-right py-2">IRU 가격 (USD/Gbps/월)</th>
                    <th className="text-center py-2">가용성</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">SEA-ME-WE 5</td>
                    <td className="text-right py-2">24</td>
                    <td className="text-right py-2">$800-1,200</td>
                    <td className="text-center py-2">제한적</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">PEACE Cable</td>
                    <td className="text-right py-2">192</td>
                    <td className="text-right py-2">$600-900</td>
                    <td className="text-center py-2">양호</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">2Africa</td>
                    <td className="text-right py-2">180</td>
                    <td className="text-right py-2">$500-750</td>
                    <td className="text-center py-2">우수</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Echo/Bifrost (계획)</td>
                    <td className="text-right py-2">240</td>
                    <td className="text-right py-2">$400-600 (예상)</td>
                    <td className="text-center py-2">2025년</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-2">
                출처: TeleGeography Submarine Cable Pricing Database Q3 2024<br/>
                PEACE Cable: <a href="https://www.submarinenetworks.com/en/systems/asia-europe-africa/peace" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">192Tbps capacity confirmed (HMN Tech, 2024)</a>
              </p>
            </div>
          </div>

          {/* 트래픽 수요 예측 */}
          <div id="ref-sg-eu-demand">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.2 싱가포르-유럽 트래픽 수요 예측</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2">구간</th>
                    <th className="text-right py-2">2024년 (Tbps)</th>
                    <th className="text-right py-2">2030년 예상 (Tbps)</th>
                    <th className="text-right py-2">주요 동인</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">싱가포르-인도</td>
                    <td className="text-right py-2">45</td>
                    <td className="text-right py-2">180</td>
                    <td className="py-2">IT 서비스, 클라우드</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">인도-중동</td>
                    <td className="text-right py-2">38</td>
                    <td className="text-right py-2">145</td>
                    <td className="py-2">OTT, 금융</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">중동-유럽</td>
                    <td className="text-right py-2">52</td>
                    <td className="text-right py-2">195</td>
                    <td className="py-2">엔터프라이즈, CDN</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-2">
                출처: TeleGeography Global Bandwidth Research Service 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 섹션 5: 호주 해저케이블 IRU/리스 근거 자료 */}
      <div className="bg-white rounded-xl shadow-lg p-8" id="ref-australia-cable">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-cyan-600" />
          5. 호주 해저케이블 IRU/리스 - 근거 자료
        </h2>

        <div className="space-y-6">
          {/* 호주 트래픽 성장 */}
          <div id="ref-au-traffic">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.1 호주 국제 트래픽 데이터</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2">지표</th>
                    <th className="text-right py-2">2024년</th>
                    <th className="text-right py-2">2030년 예상</th>
                    <th className="text-left py-2">출처</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">총 국제 트래픽</td>
                    <td className="text-right py-2">28.5 EB/월</td>
                    <td className="text-right py-2">285 EB/월</td>
                    <td className="py-2">ACMA (Australian Communications and Media Authority)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">클라우드 트래픽 비중</td>
                    <td className="text-right py-2">65%</td>
                    <td className="text-right py-2">82%</td>
                    <td className="py-2">IDC Australia Cloud Report 2024</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">연평균 성장률</td>
                    <td className="text-right py-2">42%</td>
                    <td className="text-right py-2">-</td>
                    <td className="py-2">TeleGeography</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 정부 투자 정책 */}
          <div id="ref-au-policy">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.2 호주 정부 디지털 인프라 정책</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">Digital Economy Strategy 2030</h4>
                  <p className="text-sm text-gray-600">투자 규모: AUD 1.2B (해저케이블 및 데이터센터)</p>
                  <p className="text-xs text-gray-500">출처: Australian Government, Department of Infrastructure</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">Pacific Cable Initiative</h4>
                  <p className="text-sm text-gray-600">투자 규모: AUD 200M (태평양 도서국 연결)</p>
                  <p className="text-sm text-gray-600">목적: 지정학적 영향력 확대 및 디지털 연결성 강화</p>
                  <p className="text-xs text-gray-500">출처: DFAT (Department of Foreign Affairs and Trade)</p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold">Critical Infrastructure Resilience Strategy</h4>
                  <p className="text-sm text-gray-600">해저케이블을 국가 중요 인프라로 지정</p>
                  <p className="text-xs text-gray-500">출처: Department of Home Affairs, 2023</p>
                </div>
              </div>
            </div>
          </div>

          {/* IRU 가격 비교 */}
          <div id="ref-iru-pricing">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.3 IRU vs 리스 가격 비교 (20년 기준)</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2">경로</th>
                    <th className="text-right py-2">IRU (USD M)</th>
                    <th className="text-right py-2">리스 (USD M)</th>
                    <th className="text-right py-2">절감률 (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">호주-싱가포르 (100G)</td>
                    <td className="text-right py-2">15</td>
                    <td className="text-right py-2">28</td>
                    <td className="text-right py-2">46%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">호주-일본 (100G)</td>
                    <td className="text-right py-2">18</td>
                    <td className="text-right py-2">35</td>
                    <td className="text-right py-2">49%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">호주-미국 (100G)</td>
                    <td className="text-right py-2">22</td>
                    <td className="text-right py-2">42</td>
                    <td className="text-right py-2">48%</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-2">
                출처: Industry quotes from Telstra, Vocus, Southern Cross Cable (2024)<br/>
                INDIGO Cable: <a href="https://www.submarinenetworks.com/en/systems/asia-australia/indigo" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">36 Tbps capacity, 호주-싱가포르 직접 연결</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 주요 데이터 소스 및 방법론 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Link className="w-6 h-6 mr-2 text-orange-600" />
          데이터 소스 및 방법론
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">주요 데이터 소스</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <div>
                  <strong>TeleGeography:</strong> 해저케이블 용량, 가격, 국제 대역폭 통계
                  <p className="text-xs text-gray-600">Global Bandwidth Research Service, <a href="https://www.submarinecablemap.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Submarine Cable Map</a></p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <div>
                  <strong>Cisco:</strong> IP 트래픽 예측 및 성장률
                  <p className="text-xs text-gray-600">Visual Networking Index (VNI), Annual Internet Report</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <div>
                  <strong>정부 발표:</strong> 투자 계획 및 정책 방향
                  <p className="text-xs text-gray-600">Press releases, Policy documents, Strategic plans</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <div>
                  <strong>업계 보고서:</strong> 시장 규모 및 전망
                  <p className="text-xs text-gray-600">IDC, Gartner, Structure Research, BroadGroup</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">데이터 추정 방법론</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">1.</span>
                <span><strong>시장 규모:</strong> 복수 소스의 데이터를 교차 검증하여 중간값 사용</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">2.</span>
                <span><strong>성장률:</strong> 과거 3-5년 실적 기반 CAGR 계산 및 업계 전망 반영</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">3.</span>
                <span><strong>투자 수익률:</strong> 업계 표준 DCF 모델 적용 (할인율 10%)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">4.</span>
                <span><strong>가격 데이터:</strong> 공개된 계약 사례 및 업계 전문가 인터뷰 종합</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 데이터 업데이트 정보 */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
        <div className="flex">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div className="ml-3">
            <p className="text-sm font-medium text-yellow-800">데이터 정확성 및 한계</p>
            <p className="mt-1 text-sm text-yellow-700">
              • 본 자료의 데이터는 2024년 4분기 기준으로 수집되었습니다.<br/>
              • 하이퍼스케일러 투자 계획은 공식 발표 기준이며, 실제 집행은 변동 가능합니다.<br/>
              • 트래픽 성장률과 시장 전망은 추정치이며, 실제와 차이가 있을 수 있습니다.<br/>
              • 가격 정보는 시장 평균이며, 실제 계약 조건에 따라 크게 달라질 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}