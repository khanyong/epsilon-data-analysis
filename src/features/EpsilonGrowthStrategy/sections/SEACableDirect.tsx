import React from 'react';
import { Cable, DollarSign, Globe, MapPin, Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { DataLink } from '../components/DataLink';

export function SEACableDirect() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">동남아 해저케이블 직접 구축</h1>
        <p className="text-gray-600">조호바루/바탐 지역 사업 현황</p>
        <div className="mt-2">
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded">
            기업비밀Ⅱ급
          </span>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
          Executive Summary
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">🎯 핵심 결론 (BLUF)</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">1.</span>
                <span><strong>JSB 케이블 참여 적극 권고</strong>: <DataLink href="#ref-cable-investment">USD 6~9M 투자</DataLink>로 동남아 디지털 트라이앵글의 핵심 인프라 선점</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">2.</span>
                <span><strong>삼각 연결 구조의 전략적 가치</strong>: 기존 양자 간 연결을 넘어선 네트워크 복원력 및 독립성 확보</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">3.</span>
                <span><strong>2026년 서비스 개시</strong>: 무중계 방식으로 건설·운영비 절감 및 초저지연 서비스 제공</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">4.</span>
                <span><strong>예상 ROI 18~22%</strong>: <DataLink href="#ref-cable-investment">25년 운영 기간</DataLink> 동안 안정적 수익 창출 가능</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">📊 투자 개요</h3>
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 text-gray-600">투자 규모</td>
                  <td className="py-2 font-semibold text-right">USD 6~9M (지분 10~15%)</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">총 프로젝트 규모</td>
                  <td className="py-2 font-semibold text-right">USD 50~60M</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">서비스 개시</td>
                  <td className="py-2 font-semibold text-right">2026년 Q2</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">예상 ROI</td>
                  <td className="py-2 font-semibold text-right">18~22% (25년 기준)</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">투자회수기간</td>
                  <td className="py-2 font-semibold text-right">4~5년</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 사업 개요 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Cable className="w-6 h-6 mr-2 text-indigo-600" />
          1. 사업 개요
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">1.1 프로젝트 명: Johor-Singapore-Batam (JSB) Cable System</h3>
            <ul className="text-gray-700 mb-4 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>JSB 케이블 시스템</strong>: 말레이시아 조호바루(Pontian), 싱가포르, 인도네시아 바탐을 직접 연결하는 혁신적인 <strong>삼각 연결 구조</strong>의 해저케이블</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>주도 기관</strong>: 말레이시아 Global Submarine Cable Sdn. Bhd.(GSC)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>목표</strong>: 2026년 서비스 개시 목표로 구축 중</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">1.2 기술적 사양</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">구분</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">사양</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">총 길이</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">150km</td>
                    <td className="border border-gray-300 px-4 py-2">주 구간 120km + 지선 30km</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">광섬유 페어</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold"><DataLink href="#ref-cable-capacity">24개</DataLink></td>
                    <td className="border border-gray-300 px-4 py-2">최신 표준 적용</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">설계 용량</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold"><DataLink href="#ref-cable-capacity">144 Tbps</DataLink></td>
                    <td className="border border-gray-300 px-4 py-2">확장 가능 구조</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">케이블 방식</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">무중계(Repeaterless)</td>
                    <td className="border border-gray-300 px-4 py-2"><DataLink href="#ref-cable-investment">건설비 20~30% 절감</DataLink></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">수명</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">25년+</td>
                    <td className="border border-gray-300 px-4 py-2">업계 표준</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">1.3 지리적 위치 및 경로</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">조호바루(Pontian) ↔ 바탄 직접 연결</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>거리</strong>: 120km 주 구간</li>
                  <li>• <strong>혁신성</strong>: 기존 싱가포르 경유 방식에서 말레이시아-인도네시아 간 직접 연결로 전환</li>
                  <li>• <strong>효과</strong>: 네트워크 주권 확보 및 지연시간 50% 이상 단축</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">싱가포르 지선</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>거리</strong>: 30km</li>
                  <li>• <strong>연결 방식</strong>: 주 구간에서 분기하여 싱가포르 연결</li>
                  <li>• <strong>구조</strong>: 완전한 삼각 연결 구조 구현</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 시장 환경 분석 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-green-600" />
          2. 시장 환경 분석
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.1 디지털 트라이앵글 현황</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">싱가포르 데이터센터 공급 제약</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 2019~2022년 신규 DC 허가 제한으로 공급 부족 심화</li>
                  <li>• 2023년 기준 임대가능 용량 4MW 미만, 공실률 2% 이하</li>
                  <li>• 조호바루와 바탐으로의 <strong>Spillover Effect</strong> 가속화</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">조호바루 DC 시장 급성장</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 2024~2025년 수요 급증으로 2.6GW+ 용량 계획</li>
                  <li>• 주요 사업자: AirTrunk(420MW), YTL(500MW), Nxera(200MW)</li>
                  <li>• 싱가포르 대비 구축비 및 부지비용 30~40% 절감</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">바탐 지역 특성</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 싱가포르와 20km 근접, 골프 관광으로 유명</li>
                  <li>• 석유 시추 및 제조업 기반 경제</li>
                  <li>• 인도네시아 리아우 주 소속, 화교 비중 높음</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.2 기존 해저케이블 현황</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">레거시 시스템들</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>TIS (Thailand-Indonesia-Singapore)</strong>: 2003년 개통, 0.32 Tbps</li>
                  <li>• <strong>MCS (Matrix Cable System)</strong>: 2008년 개통, 5.12 Tbps</li>
                  <li>• <strong>BSCS (Batam Singapore Cable System)</strong>: 2009년 개통, Telin 단독 소유</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">신규 대용량 케이블 (2025~2026년 개통 예정)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>INSICA (Indonesia Singapore Cable)</strong>: 144+ Tbps</li>
                  <li>• <strong>Nongsa-Changi</strong>: 고용량 케이블</li>
                  <li>• 공급 과잉으로 점등 용량(Lit Capacity) 가격 압박 예상</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSB 케이블의 전략적 의의 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-purple-600" />
          3. JSB 케이블의 전략적 의의
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-800 mb-3">3.1 삼각 연결의 혁신성</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">기존 양자 간 연결의 한계</h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  <li>• <strong>싱가포르-바탐</strong>: 단순 P2P 연결</li>
                  <li>• <strong>싱가포르-조호바루</strong>: 육로 연결 위주</li>
                  <li>• <strong>조호바루-바탐</strong>: 싱가포르 경유 필수</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">JSB의 삼각 연결 구조</h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  <li>• <strong>직접 연결</strong>: 세 지역 간 직접 연결 구현</li>
                  <li>• <strong>우회 경로</strong>: 특정 노드 장애 시에도 우회 경로 확보</li>
                  <li>• <strong>복원력</strong>: 네트워크 복원력 획기적 향상</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-gray-800 mb-3">3.2 경제적 효과</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">운영비 절감</h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  <li>• <strong>유지보수비</strong>: 무중계 방식으로 50% 이상 절감</li>
                  <li>• <strong>복구 시간</strong>: 단거리 특성으로 3~5일로 단축</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">지연시간 최적화</h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  <li>• <strong>직접 연결 효과</strong>: 조호바루-바탐 지연시간 50% 단축</li>
                  <li>• <strong>적용 분야</strong>: 실시간 금융거래, 게이밍 등 초저지연 서비스 최적화</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">네트워크 주권</h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  <li>• <strong>독립 경로</strong>: 말레이시아-인도네시아 간 독립적 통신 경로 확보</li>
                  <li>• <strong>주권 확보</strong>: 싱가포르 의존도 감소 및 디지털 주권 확보</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold text-gray-800 mb-3">3.3 미래 확장성</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">AI/ML 데이터센터 연동</h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  <li>• <strong>조호바루</strong>: YTL-NVIDIA 협력 (100MW AI DC)</li>
                  <li>• <strong>바탐</strong>: 제조업체들의 Industry 4.0 전환 지원</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">동남아 허브 역할</h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  <li>• <strong>확장성</strong>: 향후 인도차이나, 미얀마 등으로 확장 시 핵심 경유지</li>
                  <li>• <strong>연계 가능성</strong>: 중국 일대일로(BRI) 프로젝트와 연계 가능</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 투자 구조 및 재무 분석 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <DollarSign className="w-6 h-6 mr-2 text-green-600" />
          4. 투자 구조 및 재무 분석
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">4.1 프로젝트 총투자비</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">항목</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">비용 (USD Million)</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">비율</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">근거</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">케이블 제조</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold">25~30</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">50%</td>
                    <td className="border border-gray-300 px-4 py-2">NEC 등 주요 공급업체 견적</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">설치 및 시공</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold">15~18</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">30%</td>
                    <td className="border border-gray-300 px-4 py-2">포설선 일당 USD 1.2M × 15일</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">프로젝트 관리</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold">5~6</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">10%</td>
                    <td className="border border-gray-300 px-4 py-2">업계 표준</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">예비비</td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold">5~6</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">10%</td>
                    <td className="border border-gray-300 px-4 py-2">리스크 대응</td>
                  </tr>
                  <tr className="bg-blue-50 font-bold">
                    <td className="border border-gray-300 px-4 py-2">합계</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">50~60</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">100%</td>
                    <td className="border border-gray-300 px-4 py-2">GSC 공식 발표</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">4.2 지분 참여 방안</h3>
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-900 mb-2">권장 지분율: 10~15%</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>투자 금액</strong>: USD 6~9 Million</li>
                  <li>• <strong>의사결정권</strong>: 소수 지분이지만 기술적 자문 역할 가능</li>
                  <li>• <strong>수익 배분</strong>: 지분율에 비례한 IRU 확보</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">4.3 수익성 분석</h3>
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-3">
                  <h4 className="font-semibold text-green-900 text-sm mb-1">매출원 구조</h4>
                  <ul className="text-xs text-gray-700 space-y-0.5">
                    <li>• IRU 재판매: 연간 USD 3~4 Million</li>
                    <li>• Transit 서비스: 연간 USD 2~3 Million</li>
                    <li>• Co-location 서비스: 연간 USD 1~2 Million</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <h4 className="font-semibold text-yellow-900 text-sm mb-1">수익성 지표</h4>
                  <ul className="text-xs text-gray-700 space-y-0.5">
                    <li>• 연간 순이익: USD 4~6 Million</li>
                    <li>• ROI: 18~22% (25년 평균)</li>
                    <li>• 투자회수기간: 4~5년</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 리스크 분석 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
          5. 리스크 분석 및 대응방안
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">5.1 기술적 리스크</h3>
            <div className="space-y-2">
              <div className="bg-red-50 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-red-800">케이블 물리적 손상</span>
                  <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded">중간/높음</span>
                </div>
                <p className="text-xs text-gray-700">대응: 무중계 방식으로 복구 신속화</p>
              </div>
              <div className="bg-orange-50 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-orange-800">어선 닻 손상</span>
                  <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded">높음/중간</span>
                </div>
                <p className="text-xs text-gray-700">대응: 매설 깊이 최적화, 보호 조치</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">5.2 사업적 리스크</h3>
            <div className="space-y-2">
              <div className="bg-yellow-50 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-yellow-800">경쟁 케이블 공급 과잉</span>
                  <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">높음/중간</span>
                </div>
                <p className="text-xs text-gray-700">대응: 차별화된 서비스 포트폴리오</p>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-gray-800">수요 예측 오류</span>
                  <span className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded">중간/높음</span>
                </div>
                <p className="text-xs text-gray-700">대응: 단계별 투자, 유연한 계약</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">5.3 지정학적 리스크</h3>
            <div className="space-y-2">
              <div className="bg-purple-50 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-purple-800">말-인니 갈등</span>
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded">낮음/높음</span>
                </div>
                <p className="text-xs text-gray-700">대응: 중립적 운영 주체 참여</p>
              </div>
              <div className="bg-blue-50 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-blue-800">사이버 보안 위협</span>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded">중간/높음</span>
                </div>
                <p className="text-xs text-gray-700">대응: 다층 보안 체계 구축</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 결론 및 제언 */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <CheckCircle className="w-6 h-6 mr-2" />
          6. 결론 및 제언
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="font-bold mb-3">6.1 핵심 요약</h3>
            <ul className="text-sm opacity-90 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>JSB 케이블</strong>: 동남아 지역 최초의 <strong>삼각 연결 구조</strong> 구현</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>핵심 가치</strong>: 네트워크 복원력과 독립성 동시 확보</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>기술적 이점</strong>: 무중계 방식으로 경제성 확보하면서 초저지연 서비스 제공</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>미래 역할</strong>: AI/ML, 실시간 금융거래 등 고부가가치 서비스의 핵심 인프라</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="font-bold mb-3">6.2 투자 권고사항</h3>
            <ol className="text-sm space-y-2 opacity-90">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span><strong>즉시 투자 검토</strong>: 2025년 상반기 지분 참여 협상 개시</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span><strong>지분율</strong>: 10~15% (USD 6~9M) 수준에서 참여</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span><strong>단계적 접근</strong>: 초기 5% 참여 후 성과에 따라 추가 투자</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-6 bg-white/10 rounded-lg p-6">
          <h3 className="font-bold mb-3">6.3 향후 과제</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">GSC와 MOU 체결</h4>
              <p className="text-xs opacity-90">지분 참여 및 기술 협력 조건 협의</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">현지 파트너십</h4>
              <p className="text-xs opacity-90">말레이시아, 인도네시아 현지 업체와 제휴</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">운영 체계 구축</h4>
              <p className="text-xs opacity-90">케이블 관리 및 유지보수 역량 확보</p>
            </div>
          </div>
        </div>
      </div>

      {/* 참고자료 */}
      <div className="bg-gray-100 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-gray-900 mb-4">참고자료</h3>
        <ol className="text-sm text-gray-700 space-y-1">
          <li>1. 싱가포르바탐조호르바루를 연결하는 해저케이블 인프라 심층 분석.pdf</li>
          <li>2. TeleGeography Submarine Cable Map - <a href="https://www.submarinecablemap.com" className="text-blue-600 hover:underline">https://www.submarinecablemap.com</a></li>
          <li>3. Global Submarine Cable Sdn. Bhd. 공식 발표자료</li>
          <li>4. 20250820_조호르 지역 DC 사업현황.pdf</li>
          <li>5. [단독] SK브로드밴드, 아시아 9개국 연결 국제 해저 케이블 완공 '초읽기' | 인사이트코리아 (2021.06.02)</li>
          <li>6. 테크공룡들, 땅에서는 데이터센터 수면 아래선 해저케이블 힘겨루기 | 인더스트리뉴스 (2021.04.11)</li>
        </ol>
      </div>

      {/* 별첨 1: 기술 용어 해설 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">별첨 1: 기술 용어 해설</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">A. 핵심 기술 용어</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">무중계 케이블 (Repeaterless Cable)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>정의</strong>: 신호 증폭을 위한 중계기가 없는 해저케이블</li>
                  <li>• <strong>적용 범위</strong>: 일반적으로 200km 이하의 단거리 구간</li>
                  <li>• <strong>경제성</strong>: 건설비 20~30% 절감, 유지보수비 50% 이상 절감</li>
                  <li>• <strong>JSB 적용</strong>: 150km 총 길이로 무중계 방식 최적화</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">삼각 연결 구조 (Triangular Connectivity)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>정의</strong>: 3개 지점을 직접 연결하는 Y자형 케이블 구조</li>
                  <li>• <strong>장점</strong>: 단일 장애점 제거, 우회 경로 확보, 네트워크 복원력 강화</li>
                  <li>• <strong>JSB 혁신성</strong>: 동남아 최초의 삼각 연결 해저케이블</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">디지털 트라이앵글 (Digital Triangle)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>정의</strong>: 싱가포르-조호바루-바탐을 잇는 데이터센터 클러스터</li>
                  <li>• <strong>특징</strong>: 싱가포르 공급 제약으로 인한 Spillover 효과</li>
                  <li>• <strong>시장 규모</strong>: 총 3GW 이상의 데이터센터 용량 계획</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">B. 지역 약어 및 기관</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded p-3">
                <p className="font-semibold text-gray-800">GSC</p>
                <p className="text-sm text-gray-600">Global Submarine Cable Sdn. Bhd. (말레이시아)</p>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <p className="font-semibold text-gray-800">JSB</p>
                <p className="text-sm text-gray-600">Johor-Singapore-Batam Cable System</p>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <p className="font-semibold text-gray-800">INSICA</p>
                <p className="text-sm text-gray-600">Indonesia Singapore Cable</p>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <p className="font-semibold text-gray-800">TIS</p>
                <p className="text-sm text-gray-600">Thailand-Indonesia-Singapore Cable System</p>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <p className="font-semibold text-gray-800">MCS</p>
                <p className="text-sm text-gray-600">Matrix Cable System</p>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <p className="font-semibold text-gray-800">BSCS</p>
                <p className="text-sm text-gray-600">Batam Singapore Cable System</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 별첨 2: 경쟁 환경 분석 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">별첨 2: 경쟁 환경 분석</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">A. 기존 해저케이블 현황</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">케이블명</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">개통연도</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">용량</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">소유주</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">특징</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">TIS</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2003</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">0.32 Tbps</td>
                    <td className="border border-gray-300 px-4 py-2">Singtel, Telin, CAT</td>
                    <td className="border border-gray-300 px-4 py-2">레거시 시스템</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">MCS</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2008</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">5.12 Tbps</td>
                    <td className="border border-gray-300 px-4 py-2">Matrix Networks</td>
                    <td className="border border-gray-300 px-4 py-2">중간 용량</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">BSCS</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2009</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">업그레이드 중</td>
                    <td className="border border-gray-300 px-4 py-2">Telin 단독</td>
                    <td className="border border-gray-300 px-4 py-2">사설 케이블</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">INSICA</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2025 예정</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">144+ Tbps</td>
                    <td className="border border-gray-300 px-4 py-2">다자 컨소시엄</td>
                    <td className="border border-gray-300 px-4 py-2">대용량 경쟁</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Nongsa-Changi</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">2026 예정</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">고용량</td>
                    <td className="border border-gray-300 px-4 py-2">미공개</td>
                    <td className="border border-gray-300 px-4 py-2">신규 대용량</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">B. 주요 해저케이블 운영사 현황</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Singtel (싱가포르)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>보유 케이블</strong>: SEA-ME-WE 3/4/5, C2C, APCN 등</li>
                  <li>• <strong>지역 허브</strong>: 싱가포르 창이 케이블 랜딩 스테이션 운영</li>
                  <li>• <strong>투자 전략</strong>: 아시아-유럽 경로 다각화, 5G 백홀 연계</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">PCCW Global (홍콩)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>보유 케이블</strong>: EAC, C2C, ASE 등</li>
                  <li>• <strong>특징</strong>: 중화권 연결에 특화, 금융 서비스 최적화</li>
                  <li>• <strong>강점</strong>: 홍콩-중국 본토 연결성</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Telin (인도네시아)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>보유 케이블</strong>: BSCS 단독 소유, TIS 참여</li>
                  <li>• <strong>특징</strong>: 인도네시아 국영 통신사 자회사</li>
                  <li>• <strong>지역 강점</strong>: 인도네시아 내륙 연결성</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">C. 하이퍼스케일러 투자 동향</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Google</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>소유 케이블</strong>: Apricot, Echo 등 아시아-태평양 집중</li>
                  <li>• <strong>투자 전략</strong>: 클라우드 리전 연결성 강화</li>
                  <li>• <strong>예상 영향</strong>: JSB 지역 데이터센터 활용 가능성</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Microsoft</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>프로젝트</strong>: NCP, MAREA 등 참여</li>
                  <li>• <strong>특징</strong>: Azure 서비스 최적화를 위한 전략적 투자</li>
                  <li>• <strong>아시아 전략</strong>: 싱가포르, 홍콩 리전 강화</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Meta (Facebook)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>프로젝트</strong>: Echo, Bifrost 등 동남아 집중</li>
                  <li>• <strong>투자 규모</strong>: USD 1 Billion+ (2020~2025)</li>
                  <li>• <strong>특징</strong>: 소셜미디어 트래픽 최적화</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 별첨 3: 재무 모델링 상세 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">별첨 3: 재무 모델링 상세</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">A. 매출 구조 분석 (연간 기준)</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">IRU 재판매 (60% 비중)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 기본 용량: 1.44 Tbps (지분 10% 기준)</li>
                  <li>• 재판매 단가: USD 2,000~3,000 per Mbps/month</li>
                  <li>• 연간 매출: USD 3~4 Million</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">Transit 서비스 (30% 비중)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 대상: 중소 ISP, 기업 고객</li>
                  <li>• 평균 단가: USD 15~25 per Mbps/month</li>
                  <li>• 연간 매출: USD 2~3 Million</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">Co-location 및 부가서비스 (10% 비중)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 케이블 랜딩 스테이션 co-location</li>
                  <li>• 네트워크 모니터링, 유지보수 서비스</li>
                  <li>• 연간 매출: USD 1~2 Million</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">B. 비용 구조 분석</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">운영비 (OPEX)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 케이블 유지보수: USD 0.8~1.0 Million</li>
                  <li>• 인건비: USD 0.3~0.5 Million</li>
                  <li>• 보험료: USD 0.2~0.3 Million</li>
                  <li>• 기타 운영비: USD 0.2~0.2 Million</li>
                  <li className="font-semibold pt-2 border-t">• 총 OPEX: USD 1.5~2.0 Million</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">감가상각 (CAPEX)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 투자금 USD 7.5M ÷ 25년 = USD 0.3M</li>
                  <li>• 장비 교체비 연간 적립: USD 0.1M</li>
                  <li className="font-semibold pt-2 border-t">• 총 감가상각: USD 0.4M</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">C. 시나리오별 수익성 분석</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">낙관적 시나리오 (확률 30%)</h4>
                <p className="text-sm text-gray-700 mb-2">조건: 데이터센터 급성장, 경쟁 케이블 지연</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 연간 매출: USD 8 Million</li>
                  <li>• 연간 순이익: USD 5.6 Million</li>
                  <li>• ROI: 22%</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">기준 시나리오 (확률 50%)</h4>
                <p className="text-sm text-gray-700 mb-2">조건: 계획대로 시장 성장</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 연간 매출: USD 6.5 Million</li>
                  <li>• 연간 순이익: USD 4.1 Million</li>
                  <li>• ROI: 18%</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">비관적 시나리오 (확률 20%)</h4>
                <p className="text-sm text-gray-700 mb-2">조건: 경쟁 심화, 수요 둔화</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 연간 매출: USD 4.5 Million</li>
                  <li>• 연간 순이익: USD 2.1 Million</li>
                  <li>• ROI: 12%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 별첨 4: 법적 및 규제 환경 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">별첨 4: 법적 및 규제 환경</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">A. 해저케이블 관련 국제법</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">유엔해양법협약 (UNCLOS)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 제58조: 공해상 해저케이블 부설의 자유</li>
                  <li>• 제79조: 대륙붕에서의 해저케이블 부설권</li>
                  <li>• JSB 적용: 3개국 영해 및 배타적 경제수역 통과</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">1884년 해저케이블협약</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 해저케이블 고의 파괴 행위 처벌 규정</li>
                  <li>• 국제수사공조 체계</li>
                  <li>• 현대적 해석: 사이버 공격에 대한 대응 근거</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">B. 주요국 규제 현황</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">말레이시아</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 관할 기관: Malaysian Communications and Multimedia Commission (MCMC)</li>
                  <li>• 라이센스: Network Service Provider License 필요</li>
                  <li>• 외국인 투자: 49% 제한, 부미푸트라 정책 고려</li>
                  <li>• JSB 특이사항: Johor Special Economic Zone 혜택 가능</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">싱가포르</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 관할 기관: Infocomm Media Development Authority (IMDA)</li>
                  <li>• 라이센스: Submarine Cable Landing License</li>
                  <li>• 외국인 투자: 100% 가능</li>
                  <li>• 특징: 케이블 허브 정책, 다중 경로 권장</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">인도네시아</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 관할 기관: Ministry of Communication and Informatics</li>
                  <li>• 라이센스: International Gateway License</li>
                  <li>• 외국인 투자: 67% 제한 (통신 분야)</li>
                  <li>• 바탐 특구: 자유무역지대 혜택</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">C. 투자 실행 일정</h3>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3">2025년 상반기 실행 계획</h4>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mr-3">Q1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">2025년 1~2월: 실사 및 협상</p>
                    <ul className="text-sm text-gray-600 mt-1">
                      <li>• 기술 실사, 재무 실사</li>
                      <li>• 법률 검토, 규제 확인</li>
                      <li>• GSC와 지분 참여 협상</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded mr-3">Q2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">2025년 3월: 투자 결정</p>
                    <ul className="text-sm text-gray-600 mt-1">
                      <li>• 투자위원회 승인</li>
                      <li>• 지분 참여 계약 체결</li>
                      <li>• 자금 납입 (USD 3M)</li>
                      <li>• 프로젝트 거버넌스 참여</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded mr-3">Q3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">2025년 4~6월: 건설 착수</p>
                    <ul className="text-sm text-gray-600 mt-1">
                      <li>• 케이블 제조 착수</li>
                      <li>• 허가 취득 완료</li>
                      <li>• 육양국 건설 시작</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded mr-3">2026</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">2026년 Q2: 서비스 개시</p>
                    <ul className="text-sm text-gray-600 mt-1">
                      <li>• 케이블 포설 완료</li>
                      <li>• 시스템 테스트</li>
                      <li>• 상업 서비스 개시</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">D. 리스크 완화 전략</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">규제 리스크</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 현지 파트너십: 각국 규제 요건 충족</li>
                  <li>• 컴플라이언스: 국제 표준 준수</li>
                  <li>• 정부 관계: 정기적 소통 채널 유지</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">운영적 위험</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 인력 확보: 전문 인력 채용 및 교육</li>
                  <li>• 재무 관리: 현금흐름 예측, 비상 자금 확보</li>
                  <li>• 계약 관리: SLA 체계 구축</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 페이지 하단 정보 */}
      <div className="text-center mt-12 pt-8 border-t border-gray-300">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-red-600">기업비밀Ⅱ급</span> | 3 / 3
        </p>
        <p className="text-xs text-gray-500 mt-2">
          본 보고서는 기업비밀Ⅱ급으로 분류되며, 관련 정보의 외부 유출을 금지합니다.
        </p>
      </div>
    </div>
  );
}