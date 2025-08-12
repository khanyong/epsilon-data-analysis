import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

// 6. 전략적 파트너십 방안
export function EuroMarketingStrategySectionStrategicPartnerships() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">6. 전략적 파트너십 방안</h2>
      
      {/* 파트너십 전략 개요 */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">🤝 파트너십 중심 진입 전략</h3>
        
        <div className="bg-white p-4 rounded-lg mb-4">
          <p className="text-blue-700 mb-4">
            Epsilon과 같은 중소기업이 유럽 시장에서 성공하기 위해서는 <strong>전략적 파트너십</strong>이 핵심입니다. 
            자본 집약적인 인프라 투자를 최소화하면서도 시장 접근성과 기술 역량을 확보할 수 있는 방안입니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-3 rounded text-center">
              <h4 className="font-semibold text-blue-800">투자 절감</h4>
              <p className="text-2xl font-bold text-blue-600">50-70%</p>
              <p className="text-blue-600 text-sm">초기 CAPEX 절감</p>
            </div>
            
            <div className="bg-green-100 p-3 rounded text-center">
              <h4 className="font-semibold text-green-800">시장 진입</h4>
              <p className="text-2xl font-bold text-green-600">6-12개월</p>
              <p className="text-green-600 text-sm">진입 기간 단축</p>
            </div>
            
            <div className="bg-purple-100 p-3 rounded text-center">
              <h4 className="font-semibold text-purple-800">리스크 감소</h4>
              <p className="text-2xl font-bold text-purple-600">60%</p>
              <p className="text-purple-600 text-sm">운영 리스크 감소</p>
            </div>
          </div>
        </div>
      </div>

      {/* 파트너십 유형별 전략 - 상호 연계 다이어그램 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">🎯 파트너십 유형별 전략</h3>
        
        {/* 3개의 원과 상호 연결 다이어그램 */}
        <div className="relative h-[500px] mb-8">
          {/* 중앙 연결선들 */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {/* 인프라-기술 연결선 */}
            <line x1="25%" y1="30%" x2="50%" y2="30%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
            </line>
            {/* 기술-고객 연결선 */}
            <line x1="75%" y1="30%" x2="50%" y2="30%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
            </line>
            {/* 인프라-고객 연결선 */}
            <line x1="25%" y1="30%" x2="50%" y2="70%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
            </line>
            <line x1="75%" y1="30%" x2="50%" y2="70%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
            </line>
          </svg>

          {/* 인프라 파트너십 원 (왼쪽 상단) */}
          <div className="absolute left-[10%] top-[10%] w-64 h-64 z-10">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full shadow-xl border-4 border-blue-500 p-4 flex flex-col justify-center">
                <h4 className="font-bold text-blue-800 text-center mb-3">🏗️ 인프라 파트너십</h4>
                <div className="text-xs text-blue-700 space-y-1 text-center px-2">
                  <p className="font-semibold">핵심 파트너:</p>
                  <p>• KPN (네덜란드)</p>
                  <p>• Deutsche Telekom</p>
                  <p>• Eunetworks</p>
                  <p className="font-semibold mt-2">협력 모델:</p>
                  <p>• Network Sharing</p>
                  <p>• IRU 계약</p>
                  <p>• Joint Venture</p>
                </div>
              </div>
            </div>
          </div>

          {/* 기술 파트너십 원 (오른쪽 상단) */}
          <div className="absolute right-[10%] top-[10%] w-64 h-64 z-10">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute inset-2 bg-white rounded-full shadow-xl border-4 border-green-500 p-4 flex flex-col justify-center">
                <h4 className="font-bold text-green-800 text-center mb-3">⚙️ 기술 파트너십</h4>
                <div className="text-xs text-green-700 space-y-1 text-center px-2">
                  <p className="font-semibold">핵심 파트너:</p>
                  <p>• Nokia/Alcatel</p>
                  <p>• Ciena</p>
                  <p>• Infinera</p>
                  <p className="font-semibold mt-2">협력 분야:</p>
                  <p>• R&D 협력</p>
                  <p>• 기술 라이선스</p>
                  <p>• 시스템 통합</p>
                </div>
              </div>
            </div>
          </div>

          {/* 고객 파트너십 원 (하단 중앙) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[10%] w-64 h-64 z-10">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <div className="absolute inset-2 bg-white rounded-full shadow-xl border-4 border-purple-500 p-4 flex flex-col justify-center">
                <h4 className="font-bold text-purple-800 text-center mb-3">👥 고객 파트너십</h4>
                <div className="text-xs text-purple-700 space-y-1 text-center px-2">
                  <p className="font-semibold">전략적 고객:</p>
                  <p>• 중소 ISP</p>
                  <p>• CDN 업체</p>
                  <p>• 클라우드 업체</p>
                  <p className="font-semibold mt-2">협력 모델:</p>
                  <p>• Long-term Contract</p>
                  <p>• Volume Discount</p>
                  <p>• Co-marketing</p>
                </div>
              </div>
            </div>
          </div>

          {/* 중앙 시너지 효과 */}
          <div className="absolute left-1/2 top-[35%] transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-4 shadow-2xl animate-pulse">
              <div className="bg-white rounded-full p-3">
                <p className="text-sm font-bold text-gray-800 text-center">EPSILON<br/>시너지</p>
              </div>
            </div>
          </div>

          {/* 상호 작용 화살표 애니메이션 */}
          <div className="absolute left-[25%] top-[35%] text-blue-600 animate-pulse">
            <span className="text-2xl">→</span>
          </div>
          <div className="absolute right-[25%] top-[35%] text-green-600 animate-pulse" style={{ animationDelay: '0.5s' }}>
            <span className="text-2xl">←</span>
          </div>
          <div className="absolute left-[35%] bottom-[35%] text-purple-600 animate-pulse" style={{ animationDelay: '1s' }}>
            <span className="text-2xl transform rotate-45 inline-block">↗</span>
          </div>
          <div className="absolute right-[35%] bottom-[35%] text-purple-600 animate-pulse" style={{ animationDelay: '1.5s' }}>
            <span className="text-2xl transform rotate-[-45deg] inline-block">↖</span>
          </div>
        </div>

        {/* 시너지 효과 설명 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-amber-900 mb-3 text-center">💫 파트너십 시너지 효과</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="font-semibold text-blue-700 mb-1">인프라 + 기술</p>
                <p className="text-gray-600 text-xs">최신 기술을 활용한 네트워크 인프라 최적화</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="font-semibold text-green-700 mb-1">기술 + 고객</p>
                <p className="text-gray-600 text-xs">고객 니즈 기반 맞춤형 기술 솔루션 개발</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="font-semibold text-purple-700 mb-1">고객 + 인프라</p>
                <p className="text-gray-600 text-xs">고객 요구사항에 맞는 인프라 확장 및 개선</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 파트너십 실행 로드맵 */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-yellow-900 mb-4">📅 파트너십 실행 로드맵</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">2025 Q4 - 2026 Q1</h4>
            <h5 className="text-yellow-700 font-medium mb-2">파트너 발굴 및 초기 접촉</h5>
            <ul className="text-yellow-600 text-sm space-y-1">
              <li>• 타겟 파트너 리스트 작성</li>
              <li>• 초기 미팅 및 관계 구축</li>
              <li>• NDA 체결 및 정보 교환</li>
              <li>• 파일럿 프로젝트 기획</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">2026 Q2-Q3</h4>
            <h5 className="text-yellow-700 font-medium mb-2">파트너십 체결 및 시작</h5>
            <ul className="text-yellow-600 text-sm space-y-1">
              <li>• 핵심 파트너와 MOU 체결</li>
              <li>• 파일럿 프로젝트 실행</li>
              <li>• 초기 성과 검증</li>
              <li>• 확장 계획 수립</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">2026 Q4 - 2027</h4>
            <h5 className="text-yellow-700 font-medium mb-2">파트너십 확장 및 심화</h5>
            <ul className="text-yellow-600 text-sm space-y-1">
              <li>• 성공 파트너십 확대</li>
              <li>• 신규 파트너 추가</li>
              <li>• Joint Venture 검토</li>
              <li>• 전략적 지분 투자</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// 7. 니치 마켓 집중 전략
export function EuroMarketingStrategySectionNicheMarketFocus() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">7. 니치 마켓 집중 전략</h2>
      
      {/* 니치 마켓 전략 개요 */}
      <div className="bg-green-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-green-900 mb-4">🎯 '작은 물고기, 큰 연못' 전략</h3>
        
        <div className="bg-white p-4 rounded-lg mb-4">
          <p className="text-green-700 mb-4">
            대기업이 주목하지 않거나 서비스하기 어려운 <strong>특화된 시장 세그먼트</strong>에 집중하여 
            경쟁 우위를 확보하고 높은 수익성을 달성하는 전략입니다. Epsilon의 민첩성과 맞춤 서비스 역량을 
            최대한 활용할 수 있는 접근법입니다.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-lg mb-2">
                <span className="text-2xl">🐠</span>
              </div>
              <p className="text-green-800 font-medium text-sm">높은 마진</p>
              <p className="text-green-600 text-xs">25-40%</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-lg mb-2">
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-green-800 font-medium text-sm">빠른 진입</p>
              <p className="text-green-600 text-xs">3-6개월</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-lg mb-2">
                <span className="text-2xl">🏆</span>
              </div>
              <p className="text-green-800 font-medium text-sm">시장 리더십</p>
              <p className="text-green-600 text-xs">세그먼트 내</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-lg mb-2">
                <span className="text-2xl">🔒</span>
              </div>
              <p className="text-green-800 font-medium text-sm">고객 충성도</p>
              <p className="text-green-600 text-xs">90%+ 유지</p>
            </div>
          </div>
        </div>
      </div>

      {/* 타겟 니치 마켓 - 2x2 매트릭스 */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-blue-900 mb-6">🎪 핵심 타겟 니치 마켓</h3>
        
        {/* 니치 마켓 기회 설명 */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg mb-6 border border-indigo-200">
          <h4 className="font-semibold text-indigo-900 mb-4">💡 왜 이 시장들이 Epsilon에게 기회인가?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-indigo-800 mb-2">🔍 대기업의 사각지대</h5>
              <ul className="text-gray-700 space-y-1">
                <li>• <span className="font-medium">거래 규모 불일치:</span> Tier 1 기업들은 $1M 이하 거래에 무관심</li>
                <li>• <span className="font-medium">맞춤형 요구:</span> 표준화된 서비스로 충족 불가능</li>
                <li>• <span className="font-medium">빠른 대응 필요:</span> 대기업의 의사결정 속도로는 대응 불가</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-indigo-800 mb-2">🎯 Epsilon의 차별화 포인트</h5>
              <ul className="text-gray-700 space-y-1">
                <li>• <span className="font-medium">민첩성:</span> 고객 요구에 즉각적인 대응과 맞춤 솔루션</li>
                <li>• <span className="font-medium">전문성:</span> 특정 산업별 규제와 요구사항 깊은 이해</li>
                <li>• <span className="font-medium">파트너십:</span> 고객과 함께 성장하는 장기적 관계</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">📊 시장 규모 vs 기술 요구도 분석:</span> 
              높은 기술 요구도를 가진 시장일수록 대기업이 표준 서비스로 대응하기 어려우며, 
              중소 규모 시장은 대기업이 직접 진입하기엔 ROI가 맞지 않아 Epsilon에게 최적의 기회가 됩니다.
            </p>
          </div>
        </div>

        {/* 차별화 실현을 위한 조직 역량 구축 */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg mb-6 border border-orange-200">
          <h4 className="font-semibold text-orange-900 mb-4">🏢 차별화 실현을 위한 조직 역량 구축 계획</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-red-800 mb-2 flex items-center">
                <span className="text-xl mr-2">👥</span>
                전문 인력 구성
              </h5>
              <ul className="text-gray-700 text-sm space-y-1">
                <li className="flex items-start">
                  <span className="text-red-600 mr-1">▸</span>
                  <div>
                    <span className="font-medium">산업별 전문 영업팀:</span>
                    <span className="text-xs block text-gray-600">금융, 헬스케어, 미디어 각 2명씩 전담</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-1">▸</span>
                  <div>
                    <span className="font-medium">솔루션 아키텍트:</span>
                    <span className="text-xs block text-gray-600">고객 요구사항을 기술로 구현하는 전문가 5명</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-1">▸</span>
                  <div>
                    <span className="font-medium">규제 컴플라이언스 담당:</span>
                    <span className="text-xs block text-gray-600">GDPR, HIPAA, MiFID II 전문가 각 1명</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-red-800 mb-2 flex items-center">
                <span className="text-xl mr-2">⚡</span>
                즉각 대응 체계
              </h5>
              <ul className="text-gray-700 text-sm space-y-1">
                <li className="flex items-start">
                  <span className="text-red-600 mr-1">▸</span>
                  <div>
                    <span className="font-medium">24/7 네트워크 운영 센터 (NOC):</span>
                    <span className="text-xs block text-gray-600">런던 본사 기반 3교대 운영 (총 12명)</span>
                    <span className="text-xs block text-gray-500 italic">Network Operations Center - 실시간 모니터링 및 장애 대응</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-1">▸</span>
                  <div>
                    <span className="font-medium">Fast-Track 의사결정:</span>
                    <span className="text-xs block text-gray-600">$500K 이하 거래 48시간 내 승인</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-1">▸</span>
                  <div>
                    <span className="font-medium">원격 지원 시스템:</span>
                    <span className="text-xs block text-gray-600">15분 내 기술지원 응답 보장</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-red-800 mb-2 flex items-center">
                <span className="text-xl mr-2">🤝</span>
                고객 관계 관리
              </h5>
              <ul className="text-gray-700 text-sm space-y-1">
                <li className="flex items-start">
                  <span className="text-red-600 mr-1">▸</span>
                  <div>
                    <span className="font-medium">전담 Account Manager:</span>
                    <span className="text-xs block text-gray-600">주요 고객당 1명 배정, 월 1회 정기 미팅</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-1">▸</span>
                  <div>
                    <span className="font-medium">Predictive CRM 시스템:</span>
                    <span className="text-xs block text-gray-600">AI 기반 고객 니즈 예측 및 선제 제안</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-1">▸</span>
                  <div>
                    <span className="font-medium">고객 성공 프로그램:</span>
                    <span className="text-xs block text-gray-600">분기별 비즈니스 리뷰 및 최적화 제안</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 bg-white p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-orange-500 pl-3">
                <h5 className="font-semibold text-orange-800 mb-2">💰 투자 규모</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 초기 인력 채용: $3-4M/년</li>
                  <li>• 네트워크 운영 센터 구축: $1.5M (일회성)</li>
                  <li>• CRM/지원 시스템: $500K/년</li>
                  <li className="font-semibold">총 연간 운영비: $5-6M</li>
                </ul>
              </div>
              <div className="border-l-4 border-orange-500 pl-3">
                <h5 className="font-semibold text-orange-800 mb-2">📈 기대 효과</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 고객 이탈률 5% 이하 유지</li>
                  <li>• 평균 계약 기간 3년 → 5년 연장</li>
                  <li>• 고객 만족도 95% 이상 달성</li>
                  <li className="font-semibold">ROI: 투자 대비 3배 수익</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* 니치 마켓 선정 근거 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6 border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-4">🎯 4대 핵심 니치 마켓 선정 근거</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-pink-800 mb-3">📊 데이터 기반 선정 기준</h5>
              <ul className="text-gray-700 text-sm space-y-2">
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">1.</span>
                  <div>
                    <span className="font-medium">시장 성장률:</span>
                    <span className="text-xs block text-gray-600">연평균 15% 이상 성장 시장만 선별</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">2.</span>
                  <div>
                    <span className="font-medium">진입 장벽:</span>
                    <span className="text-xs block text-gray-600">대기업이 표준 서비스로 대응 불가능한 영역</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">3.</span>
                  <div>
                    <span className="font-medium">수익성:</span>
                    <span className="text-xs block text-gray-600">EBITDA 30% 이상 달성 가능 시장</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">4.</span>
                  <div>
                    <span className="font-medium">시장 규모:</span>
                    <span className="text-xs block text-gray-600">TAM(Total Addressable Market) $500M 이상</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-pink-800 mb-3">🔍 유럽 시장 특수성 분석</h5>
              <ul className="text-gray-700 text-sm space-y-2">
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <div>
                    <span className="font-medium">규제 환경:</span>
                    <span className="text-xs block text-gray-600">GDPR, MiFID II, MDR 등 강력한 규제로 전문성 필요</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <div>
                    <span className="font-medium">디지털 전환:</span>
                    <span className="text-xs block text-gray-600">유럽 디지털 단일시장 전략 2030에 따른 수요 급증</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <div>
                    <span className="font-medium">인프라 현황:</span>
                    <span className="text-xs block text-gray-600">5G 구축 가속화, 클라우드 도입률 65% 돌파</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <div>
                    <span className="font-medium">경쟁 구도:</span>
                    <span className="text-xs block text-gray-600">대기업 위주 시장에서 틈새 기회 존재</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h5 className="font-semibold text-yellow-900 mb-3">✨ 왜 이 4개 시장인가?</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">💰</span>
                  <span className="font-bold text-yellow-800">핀테크</span>
                </div>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• 런던 = 유럽 금융 중심지</li>
                  <li>• 초저지연 절대 요구</li>
                  <li>• 프리미엄 가격 지불 의사</li>
                  <li>• 시장 규모: $48.6B (2025)</li>
                </ul>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🏥</span>
                  <span className="font-bold text-green-800">헬스케어</span>
                </div>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• 원격의료 연 40% 성장</li>
                  <li>• HIPAA/MDR 규제 전문성</li>
                  <li>• 생명과 직결된 신뢰성</li>
                  <li>• 시장 규모: $30.2B (2025)</li>
                </ul>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🌐</span>
                  <span className="font-bold text-blue-800">중소 ISP</span>
                </div>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• 500+ 타겟 기업 존재</li>
                  <li>• 대기업 서비스 공백</li>
                  <li>• 안정적 장기 계약</li>
                  <li>• 시장 규모: $37.8B (2025)</li>
                </ul>
              </div>
              
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🎮</span>
                  <span className="font-bold text-purple-800">게임/미디어</span>
                </div>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• e스포츠 연 25% 성장</li>
                  <li>• 실시간 스트리밍 수요</li>
                  <li>• CDN 통합 기회</li>
                  <li>• 시장 규모: $23.8B (2025)</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-sm font-semibold text-yellow-800">
                총 목표 시장 규모: $140.4B (2025) → $270B (2030)
                <span class="text-xs text-gray-500">(환율: 1€ = $1.08 적용)</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                4개 시장 합산 시 유럽 전체 Connectivity 시장의 15% 차지
              </p>
            </div>
          </div>
        </div>
        
        {/* 2x2 매트릭스 */}
        <div className="relative bg-white p-8 rounded-lg">
          {/* 축 레이블 */}
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-semibold text-gray-600">
            기술 요구도 →
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 text-sm font-semibold text-gray-600">
            시장 규모 →
          </div>
          
          {/* 매트릭스 그리드 */}
          <div className="relative h-[600px]">
            {/* 중앙 십자선 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300"></div>
            
            {/* 축 화살표 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="text-gray-400 text-2xl">↑</div>
              <div className="text-xs text-gray-500 font-semibold">높음</div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6">
              <div className="text-xs text-gray-500 font-semibold">낮음</div>
            </div>
            <div className="absolute right-0 top-1/2 transform translate-x-6 -translate-y-1/2">
              <div className="text-gray-400 text-2xl">→</div>
              <div className="text-xs text-gray-500 font-semibold">대규모</div>
            </div>
            <div className="absolute left-0 top-1/2 transform -translate-x-6 -translate-y-1/2">
              <div className="text-xs text-gray-500 font-semibold">소규모</div>
            </div>
            
            {/* 사분면 1: 핀테크 및 금융 서비스 (우상단) */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 p-4">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 h-full rounded-lg p-4 border-2 border-yellow-400 shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">💰</span>
                  핀테크 및 금융 서비스
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-yellow-700">시장 특성</p>
                    <ul className="text-yellow-600 text-xs space-y-0.5">
                      <li>• 초저지연 요구 (&lt;1ms)</li>
                      <li>• 높은 보안 및 신뢰성</li>
                      <li>• 프리미엄 가격 수용</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-700">Epsilon 전략</p>
                    <ul className="text-yellow-600 text-xs space-y-0.5">
                      <li>• 다중 경로 백업</li>
                      <li>• 금융 규제 준수</li>
                      <li>• 실시간 모니터링</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-200 rounded p-2 mt-2">
                    <p className="text-xs font-bold text-yellow-800">매출 목표: $60-180M</p>
                    <p className="text-xs font-bold text-yellow-800">EBITDA: 40%+</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 사분면 2: 헬스케어 및 원격의료 (좌상단) */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 p-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 h-full rounded-lg p-4 border-2 border-green-400 shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="font-bold text-green-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🏥</span>
                  헬스케어 및 원격의료
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-green-700">시장 특성</p>
                    <ul className="text-green-600 text-xs space-y-0.5">
                      <li>• 의료 데이터 전송</li>
                      <li>• HIPAA 규제 준수</li>
                      <li>• 원격 수술 지원</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">Epsilon 전략</p>
                    <ul className="text-green-600 text-xs space-y-0.5">
                      <li>• 의료용 암호화</li>
                      <li>• 99.99% 신뢰성</li>
                      <li>• 전문 지원팀</li>
                    </ul>
                  </div>
                  <div className="bg-green-200 rounded p-2 mt-2">
                    <p className="text-xs font-bold text-green-800">매출 목표: $25-100M</p>
                    <p className="text-xs font-bold text-green-800">EBITDA: 35%+</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 사분면 3: 중소 ISP (좌하단) */}
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 p-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-full rounded-lg p-4 border-2 border-blue-400 shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🌐</span>
                  중소 ISP
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-blue-700">시장 특성</p>
                    <ul className="text-blue-600 text-xs space-y-0.5">
                      <li>• 500+ 중소 ISP</li>
                      <li>• 지역별 특화</li>
                      <li>• 가격 민감성 높음</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-700">Epsilon 전략</p>
                    <ul className="text-blue-600 text-xs space-y-0.5">
                      <li>• 맞춤형 패키지</li>
                      <li>• 유연한 계약</li>
                      <li>• 24/7 기술 지원</li>
                    </ul>
                  </div>
                  <div className="bg-blue-200 rounded p-2 mt-2">
                    <p className="text-xs font-bold text-blue-800">매출 목표: $50-120M</p>
                    <p className="text-xs font-bold text-blue-800">EBITDA: 30%+</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 사분면 4: 게임 및 미디어 스트리밍 (우하단) */}
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 p-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 h-full rounded-lg p-4 border-2 border-purple-400 shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="font-bold text-purple-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎮</span>
                  게임 및 미디어 스트리밍
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-purple-700">시장 특성</p>
                    <ul className="text-purple-600 text-xs space-y-0.5">
                      <li>• 실시간 스트리밍</li>
                      <li>• 트래픽 급증 대응</li>
                      <li>• 사용자 경험 중시</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-700">Epsilon 전략</p>
                    <ul className="text-purple-600 text-xs space-y-0.5">
                      <li>• 다이나믹 대역폭</li>
                      <li>• QoS 보장</li>
                      <li>• 실시간 분석</li>
                    </ul>
                  </div>
                  <div className="bg-purple-200 rounded p-2 mt-2">
                    <p className="text-xs font-bold text-purple-800">매출 목표: $45-160M</p>
                    <p className="text-xs font-bold text-purple-800">EBITDA: 25%+</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 중앙 핵심 메시지 */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-white rounded-full p-4 shadow-2xl border-4 border-gray-300">
                <p className="text-xs font-bold text-gray-700 text-center">
                  EPSILON<br/>
                  타겟 시장<br/>
                  포트폴리오
                </p>
              </div>
            </div>
          </div>
          
          {/* 매트릭스 설명 */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">📊 시장 포지셔닝 전략</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-600">• 고기술/소규모 (좌상): 전문성 중심</p>
                <p className="font-medium text-gray-600">• 고기술/대규모 (우상): 프리미엄 전략</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">• 저기술/소규모 (좌하): 가격 경쟁력</p>
                <p className="font-medium text-gray-600">• 저기술/대규모 (우하): 규모의 경제</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 니치 마켓 성공 전략 */}
      <div className="bg-orange-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-orange-900 mb-4">🏆 니치 마켓 성공 핵심 전략</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-3">📈 시장 지배력 구축</h4>
            <ul className="space-y-2 text-orange-700 text-sm">
              <li>• <strong>First Mover Advantage:</strong> 새로운 니치 시장 선점</li>
              <li>• <strong>Deep Specialization:</strong> 세그먼트 내 전문성 확보</li>
              <li>• <strong>Customer Intimacy:</strong> 고객과의 밀접한 관계</li>
              <li>• <strong>Ecosystem Building:</strong> 파트너 네트워크 구축</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-3">🔒 진입장벽 구축</h4>
            <ul className="space-y-2 text-orange-700 text-sm">
              <li>• <strong>Technical Expertise:</strong> 고도의 기술 전문성</li>
              <li>• <strong>Regulatory Compliance:</strong> 규제 준수 역량</li>
              <li>• <strong>Brand Trust:</strong> 신뢰할 수 있는 브랜드</li>
              <li>• <strong>Switching Cost:</strong> 고객의 전환 비용 증대</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}