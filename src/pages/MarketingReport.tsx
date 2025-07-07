import React from 'react';

export function MarketingReport() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">📈 마케팅 전략 보고서</h1>
          <div className="text-sm text-gray-500">
            생성일: {new Date().toLocaleDateString('ko-KR')}
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">시장 분석 및 마케팅 전략</h2>
          <p className="opacity-90">글로벌 시장 동향과 타겟 고객 분석을 통한 전략적 마케팅 인사이트</p>
        </div>
      </div>

      {/* 핵심 KPI */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🎯 마케팅 핵심 지표</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
            <div className="text-sm opacity-90">시장 접근성</div>
            <div className="text-3xl font-bold">85%</div>
            <div className="text-xs opacity-75">전년 대비 +12%</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
            <div className="text-sm opacity-90">고객 만족도</div>
            <div className="text-3xl font-bold">92%</div>
            <div className="text-xs opacity-75">목표 달성</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
            <div className="text-sm opacity-90">브랜드 인지도</div>
            <div className="text-3xl font-bold">78%</div>
            <div className="text-xs opacity-75">전년 대비 +8%</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
            <div className="text-sm opacity-90">전환율</div>
            <div className="text-3xl font-bold">15.2%</div>
            <div className="text-xs opacity-75">업계 평균 초과</div>
          </div>
        </div>
      </div>

      {/* 시장 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">🌏 주요 시장 분석</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-700">아시아-태평양 지역</h4>
              <p className="text-sm text-gray-600">높은 성장 잠재력과 디지털 트랜스포메이션 수요 증가</p>
              <div className="text-xs text-green-600 font-medium">성장률: +25%</div>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-700">유럽 시장</h4>
              <p className="text-sm text-gray-600">지속가능성 중심의 안정적 수요와 프리미엄 시장 확대</p>
              <div className="text-xs text-blue-600 font-medium">성장률: +12%</div>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-700">북미 시장</h4>
              <p className="text-sm text-gray-600">기술 혁신 주도 시장으로 고부가가치 서비스 선호</p>
              <div className="text-xs text-purple-600 font-medium">성장률: +18%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">👥 고객 세그먼트</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">기업 고객 (B2B)</h4>
              <p className="text-sm text-blue-600">대기업 및 중견기업 대상 통합 솔루션 제공</p>
              <div className="text-xs text-blue-500 mt-1">비중: 65%</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">정부/공공기관</h4>
              <p className="text-sm text-green-600">스마트시티 및 디지털 정부 사업 참여</p>
              <div className="text-xs text-green-500 mt-1">비중: 25%</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">중소기업</h4>
              <p className="text-sm text-purple-600">맞춤형 솔루션 및 컨설팅 서비스</p>
              <div className="text-xs text-purple-500 mt-1">비중: 10%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 전략 제안 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 전략 제안</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <div className="text-blue-600 text-2xl mb-3">🎯</div>
            <h3 className="text-lg font-bold text-blue-800 mb-2">타겟팅 전략</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 고성장 지역 집중 투자</li>
              <li>• 핵심 고객사 관계 강화</li>
              <li>• 신규 시장 진입 전략</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
            <div className="text-green-600 text-2xl mb-3">💡</div>
            <h3 className="text-lg font-bold text-green-800 mb-2">혁신 전략</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• AI/ML 기반 서비스 확대</li>
              <li>• 디지털 전환 가속화</li>
              <li>• 사용자 경험 개선</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
            <div className="text-purple-600 text-2xl mb-3">📈</div>
            <h3 className="text-lg font-bold text-purple-800 mb-2">성장 전략</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• 파트너십 확대</li>
              <li>• 브랜드 가치 제고</li>
              <li>• 글로벌 네트워크 강화</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 실행 계획 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📅 실행 계획</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">Q1 2024: 시장 분석 완료</h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">완료</span>
            </div>
            <p className="text-sm text-gray-600">주요 시장 동향 분석 및 고객 니즈 파악 완료</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">Q2 2024: 전략 수립 및 리소스 배분</h3>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">진행중</span>
            </div>
            <p className="text-sm text-gray-600">마케팅 전략 구체화 및 예산 할당</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">Q3-Q4 2024: 실행 및 모니터링</h3>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">예정</span>
            </div>
            <p className="text-sm text-gray-600">전략 실행 및 성과 측정, 필요시 전략 조정</p>
          </div>
        </div>
      </div>

      {/* 부록 */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">📋 부록</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">데이터 소스</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• RFQ 분석 데이터</li>
              <li>• SOF 주문 데이터</li>
              <li>• 시장 조사 보고서</li>
              <li>• 고객 피드백 데이터</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">분석 방법론</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• 통계적 분석</li>
              <li>• 트렌드 분석</li>
              <li>• 경쟁사 벤치마킹</li>
              <li>• 고객 여정 분석</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 