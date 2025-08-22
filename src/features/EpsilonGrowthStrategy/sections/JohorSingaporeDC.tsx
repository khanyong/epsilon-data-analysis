import React from 'react';
import { Server, MapPin, Zap, Globe, Shield, TrendingUp, DollarSign, AlertTriangle, CheckCircle, Building } from 'lucide-react';
import { DataLink } from '../components/DataLink';

export function JohorSingaporeDC() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">조호바르DC/싱가포르 DC 구축</h1>
        <p className="text-gray-600">조호바르/싱가포르 데이터센터 구축 전략 심층 분석</p>
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
                <span><strong>싱가포르 제약 → 조호바르 기회</strong>: 싱가포르 DC <DataLink href="#ref-dc-market-size">모라토리엄</DataLink>으로 조호바르가 차세대 디지털 허브로 부상</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">2.</span>
                <span><strong>1,000MW+ 대규모 개발</strong>: 조호바르 3대 클러스터 중심으로 싱가포르 전체 용량의 <DataLink href="#ref-dc-market-size">2배 규모</DataLink> 구축 중</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">3.</span>
                <span><strong>하이퍼스케일러 대규모 투자</strong>: MS(2.2B), Google(2.0B), AWS(9.0B), ByteDance(2.1B) 등 <DataLink href="#ref-hyperscaler-investment">총 150억 달러 이상</DataLink> 투자</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">4.</span>
                <span><strong>40-50% 비용 절감</strong>: 싱가포르 대비 <DataLink href="#ref-power-cost">운영비용 절감</DataLink>으로 높은 경제성 확보</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">📊 투자 개요</h3>
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 text-gray-600">총 투자 규모</td>
                  <td className="py-2 font-semibold text-right">USD 350M</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">조호바르 DC</td>
                  <td className="py-2 font-semibold text-right">50MW (USD 150M)</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">싱가포르 DC</td>
                  <td className="py-2 font-semibold text-right">15MW (USD 200M)</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">예상 ROI</td>
                  <td className="py-2 font-semibold text-right">22% (IRR)</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">투자회수기간</td>
                  <td className="py-2 font-semibold text-right">5.5년</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 1. 시장 동향 및 성장 동력 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-indigo-600" />
          1. 시장 동향 및 성장 동력
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">1.1 싱가포르 데이터센터 시장의 구조적 제약</h3>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>시장 규모</strong>: 전체 DC 용량 약 <DataLink href="#ref-dc-market-size">700MW+</DataLink>, 아시아태평양 최대 성숙 시장</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>2022년 모라토리엄</strong>: <DataLink href="#ref-dc-market-size">신규 대형 DC 건설 사실상 중단</DataLink>, 구조적 공급 부족 심화</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>제약 요인</strong>: 토지 부족, <DataLink href="#ref-power-cost">높은 전력 비용</DataLink>, 정부 정책적 제한</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>주요 플레이어</strong>: <a href="https://www.equinix.com/newsroom/press-releases/2024/11/equinix-to-help-accelerate-ai-innovation-in-singapore-with-us-260-million-data-center-expansion" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Equinix</a>, Digital Realty, Global Switch 등 글로벌 운영사 집중</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">1.2 조호바르의 전략적 부상</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">토지 가용성</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Sedenak Tech Park</strong>: 2,023 에이커</li>
                  <li>• <strong>용량</strong>: 300MW급 대형시설 가능</li>
                  <li>• <strong>가격</strong>: 싱가포르 대비 70% 저렴</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">전력 인프라</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>TNB 전용 공급</strong>: 500MW 구축 중</li>
                  <li>• <strong>확장 계획</strong>: 1,000MW까지</li>
                  <li>• <strong>비용</strong>: 싱가포르 대비 <DataLink href="#ref-power-cost">40% 저렴</DataLink></li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">지리적 이점</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>싱가포르 거리</strong>: 5km (초저지연)</li>
                  <li>• <strong>연결성</strong>: 40-60km 내 접근</li>
                  <li>• <strong>시간대</strong>: 동일 (운영 효율성)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 주요 플레이어 분석 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Building className="w-6 h-6 mr-2 text-green-600" />
          2. 주요 플레이어 분석
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.1 하이퍼스케일러 투자 현황</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">Microsoft</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>투자 규모</strong>: <DataLink href="#ref-hyperscaler-investment">USD 2.2B</DataLink> (말레이시아 전체)</li>
                  <li>• <strong>프로젝트</strong>: 클라우드 및 AI 인프라 구축</li>
                  <li>• <strong>지역</strong>: 조호바르 포함 말레이시아 전역</li>
                  <li>• <strong>목적</strong>: Azure 동남아 리전 확장</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">Google</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>투자 규모</strong>: <DataLink href="#ref-hyperscaler-investment">USD 2.0B</DataLink> (말레이시아)</li>
                  <li>• <strong>태국</strong>: USD 1.0B (2025-2029)</li>
                  <li>• <strong>프로젝트</strong>: 데이터센터 및 클라우드 인프라</li>
                  <li>• <strong>목적</strong>: Google Cloud Platform 아시아 확장</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">AWS</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>싱가포르</strong>: <DataLink href="#ref-hyperscaler-investment">USD 9.0B</DataLink> (2023-2028)</li>
                  <li>• <strong>말레이시아</strong>: USD 6.0B (2024-2038)</li>
                  <li>• <strong>태국</strong>: USD 5.0B (2024-2034)</li>
                  <li>• <strong>목적</strong>: 아시아태평양 가용영역 확장</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">ByteDance</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>투자 규모</strong>: <DataLink href="#ref-hyperscaler-investment">USD 2.1B</DataLink> (조호바르)</li>
                  <li>• <strong>프로젝트</strong>: AI 및 데이터센터 허브</li>
                  <li>• <strong>위치</strong>: 조호바르 지역</li>
                  <li>• <strong>목적</strong>: 동남아시아 AI 인프라 구축</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">2.2 전통적 데이터센터 운영사</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  <a href="https://www.datacenterdynamics.com/en/news/ntt-plans-290mw-data-center-campus-in-johor-malaysia/" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline">
                    NTT Global Data Centers
                  </a>
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>프로젝트</strong>: 조호바르 캠퍼스</li>
                  <li>• <strong>규모</strong>: 290MW (6개 빌딩)</li>
                  <li>• <strong>부지</strong>: 68.5 에이커</li>
                  <li>• <strong>1단계</strong>: 48MW (2027년 4월)</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Keppel Data Centres</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>프로젝트</strong>: Keppel DC Johor 1</li>
                  <li>• <strong>위치</strong>: 세데낙 테크 파크</li>
                  <li>• <strong>규모</strong>: 100,495 sqft</li>
                  <li>• <strong>특징</strong>: Built-to-suit 시설</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">YTL Power</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>프로젝트</strong>: YTL Green DC Park</li>
                  <li>• <strong>규모</strong>: 500MW (풀빌드)</li>
                  <li>• <strong>입주사</strong>: SEA Group, GDS</li>
                  <li>• <strong>특징</strong>: 100% 재생에너지</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 주요 데이터센터 클러스터 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-purple-600" />
          3. 주요 데이터센터 클러스터
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Sedenak Tech Park</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>규모</strong>: 2,023 에이커</li>
              <li>• <strong>예상 용량</strong>: 500MW+</li>
              <li>• <strong>주요 입주사</strong>: Microsoft, Bridge Data Centres</li>
              <li>• <strong>특징</strong>: 최대 규모, 하이퍼스케일 특화</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Nusajaya Tech Park</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>규모</strong>: 1,000 에이커</li>
              <li>• <strong>예상 용량</strong>: 300MW</li>
              <li>• <strong>주요 입주사</strong>: Google, Equinix</li>
              <li>• <strong>특징</strong>: 이스칸다르 푸테리 인접</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">YTL Green DC Park</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>규모</strong>: 800 에이커</li>
              <li>• <strong>예상 용량</strong>: 500MW</li>
              <li>• <strong>주요 입주사</strong>: AWS, SEA Group</li>
              <li>• <strong>특징</strong>: 100% 재생에너지 목표</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. 기술 사양 및 인프라 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-indigo-600" />
          4. 기술 사양 및 인프라
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">전력 및 냉각</h3>
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 text-gray-600">전력 용량</td>
                  <td className="py-2 font-semibold text-right">2N 이중화</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">PUE 목표</td>
                  <td className="py-2 font-semibold text-right">1.3 이하</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">냉각 방식</td>
                  <td className="py-2 font-semibold text-right">액체 냉각 + Free Cooling</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">재생에너지</td>
                  <td className="py-2 font-semibold text-right">30% (태양광)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">네트워크 연결성</h3>
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 text-gray-600">캐리어 중립성</td>
                  <td className="py-2 font-semibold text-right">15+ 통신사</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">클라우드 연결</td>
                  <td className="py-2 font-semibold text-right">AWS, Azure, GCP 직접 연결</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">IX 연결</td>
                  <td className="py-2 font-semibold text-right">SGIX, MyIX, DE-CIX</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">지연시간</td>
                  <td className="py-2 font-semibold text-right">싱가포르 &lt;2ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">환경 조건 및 대응</h3>
          <div className="bg-yellow-50 rounded-lg p-4">
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>평균 기온</strong>: 26-32°C (열대성 기후)</li>
              <li>• <strong>습도</strong>: 75-85% (고습도 환경)</li>
              <li>• <strong>연간 강우량</strong>: 2,400mm</li>
              <li>• <strong>대응 전략</strong>: 첨단 냉각 기술 도입, PUE 최적화 필수</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. 투자 기회 및 리스크 분석 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <DollarSign className="w-6 h-6 mr-2 text-green-600" />
          5. 투자 기회 및 리스크 분석
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.1 투자 기회</h3>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">시장 성장성</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>시장 규모</strong>: 2024년 5억 달러 → 2030년 25억 달러</li>
                  <li>• <strong>CAGR</strong>: 31% 연평균 성장률</li>
                  <li>• <strong>수요 동력</strong>: 하이퍼스케일러 확정적 수요</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">경쟁 우위</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>비용 절감</strong>: 싱가포르 대비 40-50% 저렴</li>
                  <li>• <strong>정부 지원</strong>: 세제 혜택, 인프라 투자</li>
                  <li>• <strong>확장성</strong>: 충분한 토지 및 전력 여유</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">5.2 주요 리스크</h3>
            <div className="space-y-4">
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">규제 리스크</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>데이터 주권</strong>: 말레이시아 정책 변화 가능성</li>
                  <li>• <strong>외국인 투자</strong>: 제한 정책 도입 위험</li>
                  <li>• <strong>대응</strong>: 현지 파트너십 강화</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">인프라 리스크</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>전력 안정성</strong>: 공급 중단 우려</li>
                  <li>• <strong>네트워크 장애</strong>: 연결성 이슈</li>
                  <li>• <strong>대응</strong>: 이중화 시스템 구축</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. 구축 일정 */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">6. 구축 일정</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-white/20 rounded-full px-3 py-1 mr-4">
              <span className="font-bold">2025 Q1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">설계 및 인허가</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• 상세 설계 완료</li>
                <li>• 환경영향평가</li>
                <li>• 건축 허가 취득</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-white/20 rounded-full px-3 py-1 mr-4">
              <span className="font-bold">2025 Q3</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">건설 착공</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• 조호바르 DC 1단계 착공</li>
                <li>• 싱가포르 DC 리모델링</li>
                <li>• 전력 인프라 구축</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-white/20 rounded-full px-3 py-1 mr-4">
              <span className="font-bold">2026 Q2</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">시운전</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• 시스템 테스트</li>
                <li>• 인증 획득</li>
                <li>• 고객 사전 계약</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-white/20 rounded-full px-3 py-1 mr-4">
              <span className="font-bold">2026 Q3</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">상업 운영 개시</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• 고객 입주 시작</li>
                <li>• 24/7 운영 체제</li>
                <li>• 2단계 확장 검토</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 7. 결론 및 제언 */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <CheckCircle className="w-6 h-6 mr-2" />
          7. 결론 및 제언
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="font-bold mb-3">7.1 핵심 요약</h3>
            <ul className="text-sm opacity-90 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>전략적 중요성</strong>: 동남아시아 디지털 경제의 미래를 좌우할 핵심 이니셔티브</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>시장 기회</strong>: 싱가포르 구조적 제약과 급증하는 수요가 조호바르에 전례 없는 성장 기회 제공</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>투자 타이밍</strong>: 하이퍼스케일러 진출 초기 단계로 최적의 진입 시점</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>장기 전망</strong>: 향후 5-10년간 아시아태평양 디지털 경제의 새로운 중심지로 부상 전망</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="font-bold mb-3">7.2 투자 권고사항</h3>
            <ol className="text-sm space-y-2 opacity-90">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span><strong>즉시 투자 검토</strong>: 2025년 상반기 내 사업 착수 필수</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span><strong>단계적 접근</strong>: 1단계 20MW → 성과 검증 → 50MW 확장</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span><strong>파트너십 구축</strong>: 현지 운영사 및 하이퍼스케일러와 전략적 제휴</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-6 bg-white/10 rounded-lg p-6">
          <h3 className="font-bold mb-3">7.3 성공 요인</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">신속한 의사결정</h4>
              <ul className="text-xs opacity-90 space-y-1">
                <li>• 빠른 시장 진입</li>
                <li>• 선점 효과 극대화</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">충분한 초기 투자</h4>
              <ul className="text-xs opacity-90 space-y-1">
                <li>• 인프라 품질 확보</li>
                <li>• 경쟁력 있는 서비스</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">네트워크 연결성</h4>
              <ul className="text-xs opacity-90 space-y-1">
                <li>• 싱가포르 직접 연결</li>
                <li>• 글로벌 네트워크 구축</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 페이지 하단 정보 */}
      <div className="text-center mt-12 pt-8 border-t border-gray-300">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-red-600">기업비밀Ⅱ급</span> | 1 / 5
        </p>
        <p className="text-xs text-gray-500 mt-2">
          본 보고서는 기업비밀Ⅱ급으로 분류되며, 관련 정보의 외부 유출을 금지합니다.
        </p>
      </div>
    </div>
  );
}