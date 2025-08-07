import React from 'react';

// 8. 리스크 분석 및 대응방안
export function EuroMarketingStrategySectionRiskAnalysis() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">8. 리스크 분석 및 대응방안</h2>
      
      {/* 리스크 매트릭스 */}
      <div className="bg-red-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-red-900 mb-6">⚠️ 주요 리스크 매트릭스</h3>
        
        {/* 리스크 매트릭스 차트 */}
        <div className="relative bg-white p-6 rounded-lg h-[500px]">
          <div className="absolute left-0 top-0 text-sm font-semibold text-gray-600 -rotate-90 origin-left translate-y-full">
            영향도 →
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-600">
            발생 가능성 →
          </div>
          
          {/* 그리드 */}
          <div className="absolute inset-6 grid grid-cols-3 grid-rows-3 gap-1">
            {/* 고위험 영역 (우상단) */}
            <div className="col-start-3 row-start-1 bg-red-100 rounded p-3">
              <p className="text-xs font-bold text-red-800 mb-2">고위험</p>
              <div className="space-y-1">
                <div className="bg-red-200 rounded px-2 py-1">
                  <p className="text-xs font-semibold">자금 조달 실패</p>
                </div>
                <div className="bg-red-200 rounded px-2 py-1">
                  <p className="text-xs font-semibold">규제 변화</p>
                </div>
              </div>
            </div>
            
            {/* 중위험 영역 */}
            <div className="col-start-2 row-start-2 bg-yellow-100 rounded p-3">
              <p className="text-xs font-bold text-yellow-800 mb-2">중위험</p>
              <div className="space-y-1">
                <div className="bg-yellow-200 rounded px-2 py-1">
                  <p className="text-xs font-semibold">기술 인력 부족</p>
                </div>
                <div className="bg-yellow-200 rounded px-2 py-1">
                  <p className="text-xs font-semibold">파트너십 실패</p>
                </div>
                <div className="bg-yellow-200 rounded px-2 py-1">
                  <p className="text-xs font-semibold">시장 진입 지연</p>
                </div>
              </div>
            </div>
            
            {/* 저위험 영역 (좌하단) */}
            <div className="col-start-1 row-start-3 bg-green-100 rounded p-3">
              <p className="text-xs font-bold text-green-800 mb-2">저위험</p>
              <div className="space-y-1">
                <div className="bg-green-200 rounded px-2 py-1">
                  <p className="text-xs font-semibold">환율 변동</p>
                </div>
                <div className="bg-green-200 rounded px-2 py-1">
                  <p className="text-xs font-semibold">문화적 차이</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 축 레이블 */}
          <div className="absolute top-6 left-6 text-xs text-gray-500">높음</div>
          <div className="absolute bottom-6 left-6 text-xs text-gray-500">낮음</div>
          <div className="absolute bottom-6 left-6 text-xs text-gray-500">낮음</div>
          <div className="absolute bottom-6 right-6 text-xs text-gray-500">높음</div>
        </div>
      </div>

      {/* 카테고리별 리스크 분석 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 시장 리스크 */}
        <div className="bg-white border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-3 flex items-center">
            <span className="text-xl mr-2">📈</span>
            시장 리스크
          </h4>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-red-700 text-sm">경쟁 심화</p>
              <p className="text-gray-600 text-xs">대기업의 시장 독점 강화</p>
              <div className="mt-1 bg-blue-50 p-2 rounded">
                <p className="text-xs text-blue-700">
                  <strong>대응:</strong> 니치 마켓 집중, 차별화 서비스
                </p>
              </div>
            </div>
            <div>
              <p className="font-medium text-red-700 text-sm">수요 둔화</p>
              <p className="text-gray-600 text-xs">경제 불황으로 인한 수요 감소</p>
              <div className="mt-1 bg-blue-50 p-2 rounded">
                <p className="text-xs text-blue-700">
                  <strong>대응:</strong> 유연한 가격 정책, 다양한 서비스
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 운영 리스크 */}
        <div className="bg-white border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
            <span className="text-xl mr-2">⚙️</span>
            운영 리스크
          </h4>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-orange-700 text-sm">기술 장애</p>
              <p className="text-gray-600 text-xs">네트워크 장애 및 서비스 중단</p>
              <div className="mt-1 bg-blue-50 p-2 rounded">
                <p className="text-xs text-blue-700">
                  <strong>대응:</strong> 이중화 시스템, 24/7 모니터링
                </p>
              </div>
            </div>
            <div>
              <p className="font-medium text-orange-700 text-sm">인력 부족</p>
              <p className="text-gray-600 text-xs">전문 기술 인력 확보 어려움</p>
              <div className="mt-1 bg-blue-50 p-2 rounded">
                <p className="text-xs text-blue-700">
                  <strong>대응:</strong> 현지 인재 양성, 원격 근무
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 재무 리스크 */}
        <div className="bg-white border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
            <span className="text-xl mr-2">💰</span>
            재무 리스크
          </h4>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-yellow-700 text-sm">자금 조달</p>
              <p className="text-gray-600 text-xs">초기 투자금 확보 실패</p>
              <div className="mt-1 bg-blue-50 p-2 rounded">
                <p className="text-xs text-blue-700">
                  <strong>대응:</strong> 단계적 투자, 다양한 자금원
                </p>
              </div>
            </div>
            <div>
              <p className="font-medium text-yellow-700 text-sm">환율 변동</p>
              <p className="text-gray-600 text-xs">유로화 환율 급변동</p>
              <div className="mt-1 bg-blue-50 p-2 rounded">
                <p className="text-xs text-blue-700">
                  <strong>대응:</strong> 헤지 전략, 유로화 매출 확대
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 규제 리스크 */}
        <div className="bg-white border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
            <span className="text-xl mr-2">⚖️</span>
            규제 리스크
          </h4>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-purple-700 text-sm">GDPR 준수</p>
              <p className="text-gray-600 text-xs">데이터 보호 규정 위반</p>
              <div className="mt-1 bg-blue-50 p-2 rounded">
                <p className="text-xs text-blue-700">
                  <strong>대응:</strong> 법무팀 구성, 컴플라이언스 시스템
                </p>
              </div>
            </div>
            <div>
              <p className="font-medium text-purple-700 text-sm">라이선스</p>
              <p className="text-gray-600 text-xs">통신 사업 라이선스 취득 지연</p>
              <div className="mt-1 bg-blue-50 p-2 rounded">
                <p className="text-xs text-blue-700">
                  <strong>대응:</strong> 사전 준비, 현지 컨설팅
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 리스크 대응 로드맵 */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">🛡️ 리스크 대응 로드맵</h3>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-300"></div>
          
          <div className="space-y-6">
            <div className="relative flex items-start">
              <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="ml-16 bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold text-blue-800">Phase 1: 예방 (2025 Q4)</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• 리스크 관리 체계 구축</li>
                  <li>• 조기 경보 시스템 도입</li>
                  <li>• 보험 가입 및 헤지 전략</li>
                </ul>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="ml-16 bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold text-blue-800">Phase 2: 모니터링 (2026)</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• 실시간 리스크 모니터링</li>
                  <li>• 정기적 리스크 평가</li>
                  <li>• 대응 시나리오 업데이트</li>
                </ul>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="ml-16 bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold text-blue-800">Phase 3: 대응 (2027)</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• 신속한 위기 대응</li>
                  <li>• 비상 계획 실행</li>
                  <li>• 이해관계자 커뮤니케이션</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 9. 재무 전망 및 투자 계획
export function EuroMarketingStrategySectionFinancialProjection() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">9. 재무 전망 및 투자 계획</h2>
      
      {/* 투자 계획 개요 */}
      <div className="bg-green-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-green-900 mb-4">💰 투자 계획 개요</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-green-600">€15M</p>
            <p className="text-sm text-gray-600 mt-1">총 투자 규모</p>
            <p className="text-xs text-gray-500 mt-2">2025-2028 (4년)</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">36개월</p>
            <p className="text-sm text-gray-600 mt-1">손익분기점</p>
            <p className="text-xs text-gray-500 mt-2">2028 Q4 예상</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-purple-600">45%</p>
            <p className="text-sm text-gray-600 mt-1">목표 IRR</p>
            <p className="text-xs text-gray-500 mt-2">5년 기준</p>
          </div>
        </div>
      </div>

      {/* 단계별 투자 계획 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 단계별 투자 계획</h3>
        
        <div className="space-y-4">
          {/* Phase 1 */}
          <div className="border-l-4 border-purple-500 pl-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-purple-800">Phase 1: 시장 진입 (2025 Q4 - 2026 Q1)</h4>
                <p className="text-sm text-gray-600 mt-1">초기 인프라 구축 및 팀 구성</p>
              </div>
              <p className="text-xl font-bold text-purple-600">€3M</p>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <div className="bg-purple-50 p-2 rounded">
                <p className="font-semibold text-purple-700">인프라: €1.5M</p>
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <p className="font-semibold text-purple-700">인력: €1M</p>
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <p className="font-semibold text-purple-700">마케팅: €0.5M</p>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-blue-800">Phase 2: 시장 확대 (2026 Q2 - 2027)</h4>
                <p className="text-sm text-gray-600 mt-1">서비스 확장 및 고객 확보</p>
              </div>
              <p className="text-xl font-bold text-blue-600">€5M</p>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <div className="bg-blue-50 p-2 rounded">
                <p className="font-semibold text-blue-700">네트워크: €2.5M</p>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <p className="font-semibold text-blue-700">영업: €1.5M</p>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <p className="font-semibold text-blue-700">R&D: €1M</p>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="border-l-4 border-green-500 pl-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-green-800">Phase 3: 성장 가속 (2028)</h4>
                <p className="text-sm text-gray-600 mt-1">M&A 및 신규 시장 진출</p>
              </div>
              <p className="text-xl font-bold text-green-600">€7M</p>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <div className="bg-green-50 p-2 rounded">
                <p className="font-semibold text-green-700">M&A: €4M</p>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <p className="font-semibold text-green-700">확장: €2M</p>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <p className="font-semibold text-green-700">운영: €1M</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 수익 전망 */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">📈 수익 전망 (2025-2030)</h3>
        
        <div className="bg-white p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2">연도</th>
                <th className="text-right py-2">매출</th>
                <th className="text-right py-2">EBITDA</th>
                <th className="text-right py-2">순이익</th>
                <th className="text-right py-2">마진율</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">2025</td>
                <td className="text-right">€2M</td>
                <td className="text-right text-red-600">-€1M</td>
                <td className="text-right text-red-600">-€1.5M</td>
                <td className="text-right">-75%</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">2026</td>
                <td className="text-right">€10M</td>
                <td className="text-right text-red-600">-€0.5M</td>
                <td className="text-right text-red-600">-€1M</td>
                <td className="text-right">-10%</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">2027</td>
                <td className="text-right">€25M</td>
                <td className="text-right text-green-600">€2.5M</td>
                <td className="text-right text-green-600">€1M</td>
                <td className="text-right">4%</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">2028</td>
                <td className="text-right">€50M</td>
                <td className="text-right text-green-600">€10M</td>
                <td className="text-right text-green-600">€5M</td>
                <td className="text-right">10%</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">2029</td>
                <td className="text-right">€80M</td>
                <td className="text-right text-green-600">€20M</td>
                <td className="text-right text-green-600">€12M</td>
                <td className="text-right">15%</td>
              </tr>
              <tr className="border-b font-bold">
                <td className="py-2">2030</td>
                <td className="text-right">€120M</td>
                <td className="text-right text-green-600">€36M</td>
                <td className="text-right text-green-600">€24M</td>
                <td className="text-right">20%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 자금 조달 전략 */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-yellow-900 mb-4">💼 자금 조달 전략</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-3">Series A (2025)</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">목표 금액:</span>
                <span className="font-semibold">€5M</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">투자자:</span>
                <span className="font-semibold">VC, 전략적 투자자</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">지분 희석:</span>
                <span className="font-semibold">20-25%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">용도:</span>
                <span className="font-semibold">초기 인프라, 팀 구축</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-3">Series B (2027)</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">목표 금액:</span>
                <span className="font-semibold">€10M</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">투자자:</span>
                <span className="font-semibold">PE, 기관투자자</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">지분 희석:</span>
                <span className="font-semibold">15-20%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">용도:</span>
                <span className="font-semibold">시장 확장, M&A</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// 10. 실행 로드맵
export function EuroMarketingStrategySectionExecutionRoadmap() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">10. 실행 로드맵</h2>
      
      {/* 전체 타임라인 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">📅 2025-2028 실행 타임라인</h3>
        
        {/* 간트 차트 스타일 타임라인 */}
        <div className="bg-white p-4 rounded-lg overflow-x-auto">
          <div className="min-w-[800px]">
            {/* 헤더 */}
            <div className="grid grid-cols-12 gap-1 mb-2 text-xs font-semibold text-gray-600">
              <div className="col-span-3">구분</div>
              <div className="text-center">Q4'25</div>
              <div className="text-center">Q1'26</div>
              <div className="text-center">Q2'26</div>
              <div className="text-center">Q3'26</div>
              <div className="text-center">Q4'26</div>
              <div className="text-center">Q1'27</div>
              <div className="text-center">Q2'27</div>
              <div className="text-center">Q3'27</div>
              <div className="text-center">Q4'27</div>
            </div>
            
            {/* 인프라 구축 */}
            <div className="grid grid-cols-12 gap-1 mb-2 items-center">
              <div className="col-span-3 text-sm font-medium">인프라 구축</div>
              <div className="col-span-2 bg-blue-500 h-6 rounded"></div>
            </div>
            
            {/* 파트너십 체결 */}
            <div className="grid grid-cols-12 gap-1 mb-2 items-center">
              <div className="col-span-3 text-sm font-medium">파트너십 체결</div>
              <div className="col-start-4 col-span-3 bg-green-500 h-6 rounded"></div>
            </div>
            
            {/* 서비스 개발 */}
            <div className="grid grid-cols-12 gap-1 mb-2 items-center">
              <div className="col-span-3 text-sm font-medium">서비스 개발</div>
              <div className="col-start-5 col-span-4 bg-purple-500 h-6 rounded"></div>
            </div>
            
            {/* 고객 확보 */}
            <div className="grid grid-cols-12 gap-1 mb-2 items-center">
              <div className="col-span-3 text-sm font-medium">고객 확보</div>
              <div className="col-start-6 col-span-6 bg-yellow-500 h-6 rounded"></div>
            </div>
            
            {/* 시장 확장 */}
            <div className="grid grid-cols-12 gap-1 mb-2 items-center">
              <div className="col-span-3 text-sm font-medium">시장 확장</div>
              <div className="col-start-9 col-span-3 bg-red-500 h-6 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 분기별 주요 마일스톤 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 분기별 주요 마일스톤</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 2025-2026 */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 border-b pb-2">2025-2026</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                <div>
                  <p className="font-medium text-sm">2025 Q4</p>
                  <p className="text-xs text-gray-600">영국 본사 유럽팀 구성, 초기 자금 조달</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                <div>
                  <p className="font-medium text-sm">2026 Q1</p>
                  <p className="text-xs text-gray-600">핵심 파트너십 체결, 인프라 구축 시작</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                <div>
                  <p className="font-medium text-sm">2026 Q2</p>
                  <p className="text-xs text-gray-600">싱가포르-프랑크푸르트 라우트 개통</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                <div>
                  <p className="font-medium text-sm">2026 Q3-Q4</p>
                  <p className="text-xs text-gray-600">첫 10개 고객 확보, 서비스 안정화</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 2027-2028 */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 border-b pb-2">2027-2028</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3"></div>
                <div>
                  <p className="font-medium text-sm">2027 Q1</p>
                  <p className="text-xs text-gray-600">암스테르담, 런던 POP 추가</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3"></div>
                <div>
                  <p className="font-medium text-sm">2027 Q2-Q3</p>
                  <p className="text-xs text-gray-600">Series B 자금 조달, 100개 기업 고객 달성</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3"></div>
                <div>
                  <p className="font-medium text-sm">2027 Q4</p>
                  <p className="text-xs text-gray-600">연매출 €50M 달성, EBITDA 흑자 전환</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3"></div>
                <div>
                  <p className="font-medium text-sm">2028</p>
                  <p className="text-xs text-gray-600">시장점유율 1% 달성, IPO 준비</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI 추적 대시보드 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 핵심 KPI 추적</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">고객 수</p>
            <p className="text-2xl font-bold text-blue-600">500+</p>
            <p className="text-xs text-green-600">목표: 2028</p>
          </div>
          <div className="bg-white p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">연매출</p>
            <p className="text-2xl font-bold text-green-600">€100M</p>
            <p className="text-xs text-green-600">목표: 2028</p>
          </div>
          <div className="bg-white p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">EBITDA 마진</p>
            <p className="text-2xl font-bold text-purple-600">20%</p>
            <p className="text-xs text-green-600">목표: 2028</p>
          </div>
          <div className="bg-white p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500 mb-1">시장점유율</p>
            <p className="text-2xl font-bold text-orange-600">1%</p>
            <p className="text-xs text-green-600">목표: 2028</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 11. 결론 및 권고사항
export function EuroMarketingStrategySectionConclusion() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">11. 결론 및 권고사항</h2>
      
      {/* 핵심 결론 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-8">
        <h3 className="text-2xl font-bold mb-4">🎯 핵심 결론</h3>
        <p className="text-lg leading-relaxed">
          유럽 해저케이블 시장은 극도로 경쟁적이지만, <strong>니치 마켓 집중</strong>과 
          <strong> 전략적 파트너십</strong>을 통해 Epsilon과 같은 중소기업도 충분히 성공할 수 있습니다. 
          특히 중소 ISP, 핀테크, 헬스케어 등 특화된 시장에서 맞춤형 서비스를 제공함으로써 
          2028년까지 <strong>€100M 매출</strong>과 <strong>시장점유율 1%</strong>를 달성할 수 있을 것으로 전망됩니다.
        </p>
      </div>

      {/* 전략적 권고사항 */}
      <div className="bg-white border-2 border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">📋 전략적 권고사항</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div className="ml-3">
              <h4 className="font-semibold text-gray-800">즉시 실행 (2025 Q4)</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>✓ 영국 본사 내 유럽 전담팀 구성</li>
                <li>✓ Series A 자금 조달 프로세스 시작</li>
                <li>✓ 핵심 파트너 후보 리스트 작성 및 접촉</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div className="ml-3">
              <h4 className="font-semibold text-gray-800">단기 실행 (2026)</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>✓ 최소 3개 이상 전략적 파트너십 체결</li>
                <li>✓ 싱가포르-프랑크푸르트 초기 서비스 개시</li>
                <li>✓ 첫 10개 고객 확보 및 레퍼런스 구축</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div className="ml-3">
              <h4 className="font-semibold text-gray-800">중기 실행 (2027)</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>✓ 유럽 주요 도시 POP 확대</li>
                <li>✓ 니치 마켓별 전문 서비스 포트폴리오 구축</li>
                <li>✓ M&A 기회 탐색 및 실행</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 성공 요인 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-3">✅ 성공 요인</h4>
          <ul className="space-y-2 text-sm text-green-700">
            <li>• 명확한 니치 마켓 타겟팅</li>
            <li>• 강력한 파트너 네트워크</li>
            <li>• 차별화된 서비스 제공</li>
            <li>• 단계적 시장 확장</li>
            <li>• 충분한 자금 확보</li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-3">⚠️ 주의 사항</h4>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>• 초기 투자 규모 과대 방지</li>
            <li>• 규제 준수 철저</li>
            <li>• 현지 문화 이해</li>
            <li>• 기술 인력 확보</li>
            <li>• 환율 리스크 관리</li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">🎯 목표 지표</h4>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>• 2028년 매출 €100M</li>
            <li>• EBITDA 마진 20%</li>
            <li>• 고객 수 500+</li>
            <li>• 시장점유율 1%</li>
            <li>• ROI 45%+</li>
          </ul>
        </div>
      </div>

      {/* 최종 메시지 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg border-2 border-purple-200">
        <h3 className="text-xl font-bold text-purple-900 mb-4">💡 최종 권고</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            <strong className="text-purple-900">Epsilon의 유럽 시장 진출은 도전적이지만 충분히 실현 가능한 목표입니다.</strong> 
            본 전략 보고서에서 제시한 니치 마켓 중심 접근법과 파트너십 전략을 충실히 실행한다면, 
            대기업들이 지배하는 시장에서도 독자적인 포지션을 구축할 수 있을 것입니다.
          </p>
          <p>
            핵심은 <strong>"작지만 강한"</strong> 기업이 되는 것입니다. 모든 고객을 대상으로 하기보다는 
            특정 세그먼트에서 최고가 되는 것을 목표로 해야 합니다. 이를 통해 높은 수익성과 
            지속 가능한 성장을 달성할 수 있습니다.
          </p>
          <p className="font-semibold text-purple-900">
            지금이 바로 유럽 시장 진출의 적기입니다. 2025년 4분기부터 체계적인 준비를 시작하여 
            2028년까지 유럽 시장의 주요 플레이어로 성장하기를 권고합니다.
          </p>
        </div>
      </div>
    </section>
  );
}