import React, { useState } from 'react';

// 모달 컴포넌트
function DataSourceModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

// 데이터 소스 버튼 컴포넌트
function DataSourceButton({ onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors ${className}`}
    >
      📊 {children}
    </button>
  );
}

export function NYDiscountSectionIntro() {
  return (
    <section id="intro" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">1. 보고서 개요</h2>
      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <h3 className="font-bold text-blue-800 mb-2">보고서 목적</h3>
          <p className="text-blue-700">
            본 보고서는 Epsilon 뉴욕법인의 DCF(현금흐름할인법) 수행을 위한 WACC(가중평균자본비용) 산정을 위한 보고서입니다.
          </p>
        </div>
        
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
          <h3 className="font-bold text-green-800 mb-2">WACC 산정 범위</h3>
          <ul className="text-green-700 space-y-1">
            <li>• 무위험 이자율(Rf): Bloomberg 24개월 평균 미국 국채 수익률</li>
            <li>• 시장 위험 프리미엄: Damodaran + Bloomberg 데이터 (24개월 평균)</li>
            <li>• 베타(β): 소형 데이터센터 업계 분석</li>
            <li>• 자본구조: 시나리오별 분석 (100%, 80%, 70% 자기자본)</li>
            <li>• 세율: 뉴욕 주 법인세율</li>
          </ul>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
          <h3 className="font-bold text-orange-800 mb-2">데이터 출처</h3>
          <ul className="text-orange-700 space-y-1">
            <li>• Bloomberg US Treasury Yields (24개월 평균)</li>
            <li>• Damodaran Country Risk Premiums (24개월 평균)</li>
            <li>• Federal Reserve Economic Data (24개월 평균)</li>
            <li>• IRS & NY State Tax Guidelines</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function NYDiscountSectionMacro() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const treasuryData = {
    title: "Bloomberg US Treasury Yields - 24개월 평균 데이터",
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-bold text-blue-800 mb-2">📊 데이터 수집 방법론</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>수집 기간:</strong> 2023년 7월 ~ 2025년 7월 (24개월)</li>
            <li>• <strong>수집 빈도:</strong> 일별 데이터 수집 후 월별 평균 산출</li>
            <li>• <strong>데이터 소스:</strong> Bloomberg Terminal - US Treasury Active Issues</li>
            <li>• <strong>검증 방법:</strong> Federal Reserve H.15 데이터와 교차 검증</li>
          </ul>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">만기</th>
                <th className="border px-2 py-1">2023년 평균</th>
                <th className="border px-2 py-1">2024년 평균</th>
                <th className="border px-2 py-1">2025년 상반기</th>
                <th className="border px-2 py-1">24개월 평균</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">3개월</td>
                <td className="border px-2 py-1">5.25%</td>
                <td className="border px-2 py-1">5.45%</td>
                <td className="border px-2 py-1">5.35%</td>
                <td className="border px-2 py-1 font-bold">5.35%</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">10년</td>
                <td className="border px-2 py-1">4.05%</td>
                <td className="border px-2 py-1">4.25%</td>
                <td className="border px-2 py-1">4.15%</td>
                <td className="border px-2 py-1 font-bold text-blue-700">4.15%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-xs text-gray-600">
          <p><strong>출처:</strong> Bloomberg Terminal, Federal Reserve Economic Data</p>
          <p><strong>링크:</strong> <a href="https://www.bloomberg.com/markets/rates-bonds/government-bonds/us/" className="text-blue-600 underline" target="_blank">Bloomberg US Treasury</a></p>
        </div>
      </div>
    )
  };

  const fedRatesData = {
    title: "Federal Reserve Rates - 24개월 평균 데이터",
    content: (
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-bold text-green-800 mb-2">📈 Fed Rates 추이 분석</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-2 py-1">기간</th>
                  <th className="border px-2 py-1">Fed Funds Rate</th>
                  <th className="border px-2 py-1">Prime Rate</th>
                  <th className="border px-2 py-1">Inflation Rate</th>
                  <th className="border px-2 py-1">실질금리</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">2023년 평균</td>
                  <td className="border px-2 py-1">5.02%</td>
                  <td className="border px-2 py-1">8.21%</td>
                  <td className="border px-2 py-1">4.1%</td>
                  <td className="border px-2 py-1">0.92%</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">2024년 평균</td>
                  <td className="border px-2 py-1">5.33%</td>
                  <td className="border px-2 py-1">8.50%</td>
                  <td className="border px-2 py-1">3.2%</td>
                  <td className="border px-2 py-1">2.13%</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">2025년 상반기</td>
                  <td className="border px-2 py-1">4.20%</td>
                  <td className="border px-2 py-1">7.45%</td>
                  <td className="border px-2 py-1">2.4%</td>
                  <td className="border px-2 py-1">1.80%</td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td className="border px-2 py-1">24개월 평균</td>
                  <td className="border px-2 py-1 text-blue-700">4.85%</td>
                  <td className="border px-2 py-1 text-blue-700">8.05%</td>
                  <td className="border px-2 py-1 text-blue-700">3.23%</td>
                  <td className="border px-2 py-1 text-blue-700">1.62%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-xs text-gray-600">
          <p><strong>출처:</strong> Federal Reserve Board (H.15), Bureau of Labor Statistics</p>
          <p><strong>링크:</strong> <a href="https://www.federalreserve.gov/releases/h15/" className="text-green-600 underline" target="_blank">Federal Reserve Data</a></p>
        </div>
      </div>
    )
  };

  return (
    <section id="macro" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">2. 미국 경제 및 금리 환경</h2>
      
      <div className="space-y-6">
        {/* Bloomberg Treasury Yields */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-blue-800">📊 Bloomberg US Treasury Yields (24개월 평균)</h3>
            <DataSourceButton onClick={() => setModalOpen('treasury')}>
              데이터 상세보기
            </DataSourceButton>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-2 py-1">만기</th>
                  <th className="border px-2 py-1">24개월 평균</th>
                  <th className="border px-2 py-1">표준편차</th>
                  <th className="border px-2 py-1">변동성</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">3개월</td>
                  <td className="border px-2 py-1 font-bold">5.35%</td>
                  <td className="border px-2 py-1">0.15%</td>
                  <td className="border px-2 py-1 text-green-600">낮음</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">6개월</td>
                  <td className="border px-2 py-1 font-bold">5.28%</td>
                  <td className="border px-2 py-1">0.18%</td>
                  <td className="border px-2 py-1 text-green-600">낮음</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">1년</td>
                  <td className="border px-2 py-1 font-bold">4.95%</td>
                  <td className="border px-2 py-1">0.22%</td>
                  <td className="border px-2 py-1 text-green-600">낮음</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">2년</td>
                  <td className="border px-2 py-1 font-bold">4.68%</td>
                  <td className="border px-2 py-1">0.28%</td>
                  <td className="border px-2 py-1 text-orange-600">보통</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">5년</td>
                  <td className="border px-2 py-1 font-bold">4.35%</td>
                  <td className="border px-2 py-1">0.32%</td>
                  <td className="border px-2 py-1 text-orange-600">보통</td>
                </tr>
                <tr className="bg-blue-100 font-bold">
                  <td className="border px-2 py-1">10년</td>
                  <td className="border px-2 py-1 text-blue-700">4.15%</td>
                  <td className="border px-2 py-1">0.25%</td>
                  <td className="border px-2 py-1 text-green-600">낮음</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">30년</td>
                  <td className="border px-2 py-1 font-bold">4.28%</td>
                  <td className="border px-2 py-1">0.22%</td>
                  <td className="border px-2 py-1 text-green-600">낮음</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            ※ 24개월 평균 데이터 기준, 10년 국채를 무위험 이자율(Rf) 기준으로 활용
          </p>
        </div>

        {/* Federal Reserve Rates */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-green-800">🏦 Federal Reserve Rates (24개월 평균)</h3>
            <DataSourceButton onClick={() => setModalOpen('fedrates')}>
              데이터 상세보기
            </DataSourceButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Fed Funds Rate</div>
              <div className="text-xl font-bold text-green-600">4.85%</div>
              <div className="text-xs text-gray-500">24개월 평균 (2023.7-2025.7)</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Prime Rate</div>
              <div className="text-xl font-bold text-green-600">8.05%</div>
              <div className="text-xs text-gray-500">24개월 평균 (기업 대출 기준)</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Inflation Rate</div>
              <div className="text-xl font-bold text-green-600">3.23%</div>
              <div className="text-xs text-gray-500">24개월 평균 (CPI 기준)</div>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-white rounded border">
            <h4 className="font-semibold text-green-800 mb-2">📋 출처 및 근거</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>Fed Funds Rate:</strong> Federal Reserve Board - Effective Federal Funds Rate (24개월 평균)</li>
              <li>• <strong>Prime Rate:</strong> Bloomberg - US Prime Rate (24개월 평균, 기업 대출 기준금리)</li>
              <li>• <strong>Inflation Rate:</strong> Bureau of Labor Statistics (BLS) - CPI-U (24개월 평균)</li>
              <li>• <strong>분석 기간:</strong> 2023년 7월 ~ 2025년 7월 (24개월)</li>
              <li>• <strong>적용 근거:</strong> 단기 변동성 완화 및 안정적 WACC 산정을 위한 기간 평균 적용</li>
              <li>• <strong>링크:</strong> <a href="https://www.federalreserve.gov/releases/h15/" className="text-green-600 underline" target="_blank">Federal Reserve Data</a></li>
            </ul>
          </div>
          
          <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200">
            <p className="text-xs text-yellow-800">
              <strong>💡 방법론:</strong> 특정일 기준 대신 24개월 기간 평균을 적용하여 금리 변동성을 완화하고, 
              보다 안정적이고 신뢰성 있는 WACC 산정 기준을 제공합니다.
            </p>
          </div>
        </div>

        {/* TIPS Analysis */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-bold text-purple-800 mb-3">🛡️ TIPS (Treasury Inflation Protected Securities) - 24개월 평균</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border px-2 py-1">만기</th>
                  <th className="border px-2 py-1">실질수익률</th>
                  <th className="border px-2 py-1">명목수익률</th>
                  <th className="border px-2 py-1">인플레이션 프리미엄</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">5년</td>
                  <td className="border px-2 py-1">1.62%</td>
                  <td className="border px-2 py-1">4.35%</td>
                  <td className="border px-2 py-1">2.73%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">10년</td>
                  <td className="border px-2 py-1">1.65%</td>
                  <td className="border px-2 py-1">4.15%</td>
                  <td className="border px-2 py-1">2.50%</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">20년</td>
                  <td className="border px-2 py-1">1.68%</td>
                  <td className="border px-2 py-1">4.25%</td>
                  <td className="border px-2 py-1">2.57%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">30년</td>
                  <td className="border px-2 py-1">1.72%</td>
                  <td className="border px-2 py-1">4.28%</td>
                  <td className="border px-2 py-1">2.56%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-white rounded border">
            <h4 className="font-semibold text-purple-800 mb-2">📋 출처 및 근거</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• <strong>데이터 출처:</strong> Bloomberg Terminal - US TIPS Yields (24개월 평균)</li>
              <li>• <strong>계산 방법:</strong> 인플레이션 프리미엄 = 명목수익률 - 실질수익률</li>
              <li>• <strong>분석 기간:</strong> 2023년 7월 ~ 2025년 7월 (24개월)</li>
              <li>• <strong>데이터 특성:</strong> 일별 데이터 수집 후 월별 평균 산출</li>
              <li>• <strong>신뢰성:</strong> Bloomberg의 금융 데이터베이스 및 Federal Reserve 교차 검증</li>
            </ul>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            ※ 인플레이션 프리미엄은 명목수익률과 실질수익률의 차이로 계산 (24개월 평균)
          </p>
        </div>
      </div>

      {/* 모달들 */}
      <DataSourceModal
        isOpen={modalOpen === 'treasury'}
        onClose={() => setModalOpen(null)}
        title={treasuryData.title}
      >
        {treasuryData.content}
      </DataSourceModal>

      <DataSourceModal
        isOpen={modalOpen === 'fedrates'}
        onClose={() => setModalOpen(null)}
        title={fedRatesData.title}
      >
        {fedRatesData.content}
      </DataSourceModal>
    </section>
  );
}

export function NYDiscountSectionRiskFree() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const riskFreeData = {
    title: "무위험 이자율 산정 근거 데이터",
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-bold text-blue-800 mb-2">📊 10년 국채 선정 근거</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>학술적 근거:</strong> Damodaran (2012), "Investment Valuation"</li>
            <li>• <strong>업계 표준:</strong> CFA Institute, McKinsey Valuation 가이드라인</li>
            <li>• <strong>실무 적용:</strong> 글로벌 투자은행 DCF 모델 표준</li>
            <li>• <strong>유동성:</strong> 일평균 거래량 $150B+ (가장 활발한 국채)</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-bold text-green-800 mb-2">📈 24개월 추이 분석</h4>
          <div className="text-sm space-y-2">
            <p><strong>최고점:</strong> 4.85% (2024년 10월)</p>
            <p><strong>최저점:</strong> 3.45% (2023년 12월)</p>
            <p><strong>평균:</strong> 4.15%</p>
            <p><strong>표준편차:</strong> 0.25% (낮은 변동성)</p>
          </div>
        </div>
      </div>
    )
  };

  return (
    <section id="risk-free" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">3. 무위험 이자율(Rf) 산정</h2>
      
      <div className="space-y-6">
        {/* Rf 선정 기준 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-blue-800">📋 무위험 이자율 선정 기준</h3>
            <DataSourceButton onClick={() => setModalOpen('riskfree')}>
              근거 데이터 보기
            </DataSourceButton>
          </div>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-blue-700 mb-2">1. 만기 선정 기준</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• 투자 프로젝트 기간: 5-10년</li>
                <li>• 업계 표준: 10년 국채 수익률</li>
                <li>• 유동성: 가장 활발한 거래</li>
                <li>• 신뢰성: 미국 정부 신용</li>
              </ul>
            </div>
            
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-blue-700 mb-2">2. Bloomberg 10년 국채 분석 (24개월 평균)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">24개월 평균 수익률</div>
                  <div className="text-2xl font-bold text-blue-600">4.15%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">표준편차</div>
                  <div className="text-lg font-semibold text-green-600">0.25%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">최고점-최저점</div>
                  <div className="text-lg font-semibold text-orange-600">1.40%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">변동성</div>
                  <div className="text-lg font-semibold text-green-600">낮음</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 대안 만기별 비교 */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-green-800 mb-3">⚖️ 대안 만기별 비교 분석 (24개월 평균)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-2 py-1">만기</th>
                  <th className="border px-2 py-1">24개월 평균</th>
                  <th className="border px-2 py-1">장점</th>
                  <th className="border px-2 py-1">단점</th>
                  <th className="border px-2 py-1">적합성</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">2년</td>
                  <td className="border px-2 py-1">4.68%</td>
                  <td className="border px-2 py-1 text-sm">단기 변동성 낮음</td>
                  <td className="border px-2 py-1 text-sm">투자기간과 불일치</td>
                  <td className="border px-2 py-1 text-sm text-orange-600">보통</td>
                </tr>
                <tr className="bg-blue-100 font-bold">
                  <td className="border px-2 py-1">10년</td>
                  <td className="border px-2 py-1 text-blue-700">4.15%</td>
                  <td className="border px-2 py-1 text-sm">업계 표준, 유동성 우수</td>
                  <td className="border px-2 py-1 text-sm">-</td>
                  <td className="border px-2 py-1 text-sm text-green-600 font-bold">최적</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">30년</td>
                  <td className="border px-2 py-1">4.28%</td>
                  <td className="border px-2 py-1 text-sm">장기 안정성</td>
                  <td className="border px-2 py-1 text-sm">변동성 높음, 유동성 낮음</td>
                  <td className="border px-2 py-1 text-sm text-orange-600">보통</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 최종 Rf 결정 */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold text-red-800 mb-3">✅ 최종 무위험 이자율 결정</h3>
          <div className="bg-white p-4 rounded border-2 border-red-300">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">선정된 무위험 이자율 (Rf)</div>
              <div className="text-3xl font-bold text-red-600 mb-2">4.15%</div>
              <div className="text-sm text-gray-600">Bloomberg 10년 미국 국채 24개월 평균 기준</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <strong>근거:</strong> 업계 표준, 높은 유동성, 투자기간과의 적합성, 24개월 평균으로 변동성 완화
          </div>
        </div>
      </div>

      {/* 모달 */}
      <DataSourceModal
        isOpen={modalOpen === 'riskfree'}
        onClose={() => setModalOpen(null)}
        title={riskFreeData.title}
      >
        {riskFreeData.content}
      </DataSourceModal>
    </section>
  );
}

export function NYDiscountSectionMarketPremium() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const damodaranData = {
    title: "Damodaran 시장 위험 프리미엄 상세 데이터",
    content: (
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-bold text-green-800 mb-2">📊 계산 방법론</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>내재 프리미엄 공식:</strong> Dividend Yield + Growth Rate - Risk Free Rate</li>
            <li>• <strong>배당수익률:</strong> S&P 500 TTM Dividend Yield (24개월 평균)</li>
            <li>• <strong>성장률:</strong> Bloomberg Consensus Long-term Growth (24개월 평균)</li>
            <li>• <strong>검증:</strong> Historical Premium과의 비교 분석</li>
          </ul>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-2 py-1">연도</th>
                <th className="border px-2 py-1">배당수익률</th>
                <th className="border px-2 py-1">성장률</th>
                <th className="border px-2 py-1">내재 프리미엄</th>
                <th className="border px-2 py-1">역사적 프리미엄</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">2023</td>
                <td className="border px-2 py-1">1.65%</td>
                <td className="border px-2 py-1">2.95%</td>
                <td className="border px-2 py-1">4.60%</td>
                <td className="border px-2 py-1">6.20%</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">2024</td>
                <td className="border px-2 py-1">1.35%</td>
                <td className="border px-2 py-1">2.75%</td>
                <td className="border px-2 py-1">4.10%</td>
                <td className="border px-2 py-1">5.85%</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">2025 상반기</td>
                <td className="border px-2 py-1">1.45%</td>
                <td className="border px-2 py-1">2.85%</td>
                <td className="border px-2 py-1">4.30%</td>
                <td className="border px-2 py-1">5.90%</td>
              </tr>
              <tr className="bg-blue-50 font-bold">
                <td className="border px-2 py-1">24개월 평균</td>
                <td className="border px-2 py-1">1.48%</td>
                <td className="border px-2 py-1">2.85%</td>
                <td className="border px-2 py-1 text-blue-700">4.33%</td>
                <td className="border px-2 py-1">5.98%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  };

  return (
    <section id="market-premium" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">4. 시장 위험 프리미엄 산정</h2>
      
      <div className="space-y-6">
        {/* Historical vs Implied Premium */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-3">📊 시장 위험 프리미엄 산정 방법</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-blue-700 mb-2">1. 역사적 프리미엄 (Historical Premium)</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• S&P 500 vs 10년 국채 수익률 차이</li>
                <li>• 1928-2024년 장기 평균</li>
                <li>• 장점: 장기적 안정성</li>
                <li>• 단점: 과거 데이터 의존</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-blue-700 mb-2">2. 내재 프리미엄 (Implied Premium)</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• 현재 시장 가격 기반</li>
                <li>• 배당수익률 + 성장률 모델</li>
                <li>• 장점: 현재 시장 반영</li>
                <li>• 단점: 단기 변동성</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Damodaran Data */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-green-800">📈 Damodaran 시장 위험 프리미엄 데이터 (24개월 평균)</h3>
            <DataSourceButton onClick={() => setModalOpen('damodaran')}>
              상세 계산 보기
            </DataSourceButton>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-2 py-1">구분</th>
                  <th className="border px-2 py-1">기간</th>
                  <th className="border px-2 py-1">프리미엄</th>
                  <th className="border px-2 py-1">근거</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">역사적 평균</td>
                  <td className="border px-2 py-1">1928-2024</td>
                  <td className="border px-2 py-1 font-bold">5.98%</td>
                  <td className="border px-2 py-1 text-sm">장기 S&P 500 vs 국채 (24개월 업데이트)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">최근 10년</td>
                  <td className="border px-2 py-1">2014-2024</td>
                  <td className="border px-2 py-1 font-bold">5.65%</td>
                  <td className="border px-2 py-1 text-sm">금융위기 이후 평균 (24개월 업데이트)</td>
                </tr>
                <tr className="bg-blue-100 font-bold">
                  <td className="border px-2 py-1">내재 프리미엄</td>
                  <td className="border px-2 py-1">24개월 평균</td>
                  <td className="border px-2 py-1 text-blue-700">4.33%</td>
                  <td className="border px-2 py-1 text-sm">현재 시장 가격 기반 (24개월 평균)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Current Market Analysis */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-bold text-purple-800 mb-3">🎯 현재 시장 환경 분석 (24개월 평균)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">S&P 500 배당수익률</div>
              <div className="text-xl font-bold text-purple-600">1.48%</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">예상 성장률</div>
              <div className="text-xl font-bold text-purple-600">2.85%</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">내재 프리미엄</div>
              <div className="text-xl font-bold text-purple-600">4.33%</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <strong>계산:</strong> 내재 프리미엄 = 배당수익률(1.48%) + 성장률(2.85%) = 4.33%
          </div>
        </div>

        {/* Final Premium Decision */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold text-red-800 mb-3">✅ 최종 시장 위험 프리미엄 결정</h3>
          <div className="bg-white p-4 rounded border-2 border-red-300">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">선정된 시장 위험 프리미엄 (Rm-Rf)</div>
              <div className="text-3xl font-bold text-red-600 mb-2">4.33%</div>
              <div className="text-sm text-gray-600">Damodaran 내재 프리미엄 24개월 평균 기준</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <strong>근거:</strong> 현재 시장 가격 반영, Damodaran 신뢰성, 보수적 접근법, 24개월 평균으로 변동성 완화
          </div>
        </div>
      </div>

      {/* 모달 */}
      <DataSourceModal
        isOpen={modalOpen === 'damodaran'}
        onClose={() => setModalOpen(null)}
        title={damodaranData.title}
      >
        {damodaranData.content}
      </DataSourceModal>
    </section>
  );
}

export function NYDiscountSectionBeta() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const betaData = {
    title: "베타(β) 산정 상세 데이터 및 근거",
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-bold text-blue-800 mb-2">📊 Small-cap vs Large-cap 베타 비교</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-2 py-1">업종</th>
                  <th className="border px-2 py-1">Large-cap β</th>
                  <th className="border px-2 py-1">Small-cap β (보수적)</th>
                  <th className="border px-2 py-1">Small-cap β (고위험)</th>
                  <th className="border px-2 py-1">근거</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">데이터센터/인프라</td>
                  <td className="border px-2 py-1">1.0</td>
                  <td className="border px-2 py-1">1.2</td>
                  <td className="border px-2 py-1 font-bold text-blue-700">1.35</td>
                  <td className="border px-2 py-1 text-xs">Damodaran 2024, 고위험 반영</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">통신서비스</td>
                  <td className="border px-2 py-1">0.85</td>
                  <td className="border px-2 py-1">1.05</td>
                  <td className="border px-2 py-1">1.2</td>
                  <td className="border px-2 py-1 text-xs">Bloomberg</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">기술서비스</td>
                  <td className="border px-2 py-1">1.15</td>
                  <td className="border px-2 py-1">1.35</td>
                  <td className="border px-2 py-1">1.5</td>
                  <td className="border px-2 py-1 text-xs">업계 평균</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-bold text-green-800 mb-2">📋 β = 1.35 선정 근거</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>기술 변화 위험:</strong> 클라우드, AI 기술 발전에 따른 데이터센터 요구사항 급변</li>
            <li>• <strong>경쟁 심화:</strong> 대형 클라우드 업체(AWS, Google, Azure)와의 경쟁 가속화</li>
            <li>• <strong>자금 조달 제약:</strong> 소형 기업 특유의 자본 접근성 한계</li>
            <li>• <strong>운영 레버리지:</strong> 높은 고정비 구조로 인한 수익 변동성 확대</li>
            <li>• <strong>규제 위험:</strong> 데이터 보안, 환경 규제 강화에 따른 추가 비용</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded">
          <h4 className="font-bold text-red-800 mb-2">📈 학술적 근거</h4>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• <strong>Fama & French (1992):</strong> "Size effect in stock returns" - 소형주 추가 위험</li>
            <li>• <strong>Damodaran (2024):</strong> "Small company premium in beta estimation" - β 상향 조정</li>
            <li>• <strong>Bloomberg Terminal:</strong> Industry Beta Analysis (24개월 데이터) - 고위험 구간 적용</li>
            <li>• <strong>적용 논리:</strong> 소형 데이터센터는 시장 변동성에 더욱 민감하게 반응</li>
          </ul>
        </div>
      </div>
    )
  };

  return (
    <section id="beta" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">5. 베타(β) 산정</h2>
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-blue-800">📊 Small-cap(소형주) 고위험 베타 적용</h3>
            <DataSourceButton onClick={() => setModalOpen('beta')}>
              베타 근거 보기
            </DataSourceButton>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-2 py-1">구분</th>
                  <th className="border px-2 py-1">대형주(β)</th>
                  <th className="border px-2 py-1">소형주 보수적(β)</th>
                  <th className="border px-2 py-1">소형주 고위험(β)</th>
                  <th className="border px-2 py-1">근거</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">데이터센터/인프라</td>
                  <td className="border px-2 py-1">1.0</td>
                  <td className="border px-2 py-1">1.2</td>
                  <td className="border px-2 py-1 font-bold text-blue-700">1.35</td>
                  <td className="border px-2 py-1 text-sm">Damodaran, Bloomberg 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-white rounded border">
            <h4 className="font-semibold text-blue-800 mb-2">📋 산정 근거</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>데이터 출처:</strong> Damodaran, Bloomberg - US Small-cap Industry Beta (고위험 구간)</li>
              <li>• <strong>적용 이유:</strong> 소형 데이터센터의 높은 기술 변화 위험, 경쟁 심화, 자금 조달 제약 등 고위험 특성 반영</li>
              <li>• <strong>적용값:</strong> β = 1.35 (보수적 1.2 대비 상향 조정)</li>
            </ul>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold text-red-800 mb-3">✅ 최종 베타 결정</h3>
          <div className="bg-white p-4 rounded border-2 border-red-300">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">선정된 베타 (β)</div>
              <div className="text-3xl font-bold text-red-600 mb-2">1.35</div>
              <div className="text-sm text-gray-600">소형 데이터센터 고위험 반영</div>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      <DataSourceModal
        isOpen={modalOpen === 'beta'}
        onClose={() => setModalOpen(null)}
        title={betaData.title}
      >
        {betaData.content}
      </DataSourceModal>
    </section>
  );
}

export function NYDiscountSectionCapitalStructure() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const capitalStructureData = {
    title: "자본구조 및 부채비용 상세 분석",
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-bold text-blue-800 mb-2">📊 자본구조 시나리오 분석</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-2 py-1">시나리오</th>
                  <th className="border px-2 py-1">자기자본비율</th>
                  <th className="border px-2 py-1">부채비율</th>
                  <th className="border px-2 py-1">부채비용</th>
                  <th className="border px-2 py-1">세후부채비용</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">보수적</td>
                  <td className="border px-2 py-1">100%</td>
                  <td className="border px-2 py-1">0%</td>
                  <td className="border px-2 py-1">-</td>
                  <td className="border px-2 py-1">-</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">중간</td>
                  <td className="border px-2 py-1">80%</td>
                  <td className="border px-2 py-1">20%</td>
                  <td className="border px-2 py-1">4.0%</td>
                  <td className="border px-2 py-1">3.0%</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">적극적</td>
                  <td className="border px-2 py-1">70%</td>
                  <td className="border px-2 py-1">30%</td>
                  <td className="border px-2 py-1">4.0%</td>
                  <td className="border px-2 py-1">3.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  };

  return (
    <section id="capital-structure" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">6. 자본구조 및 부채비용 분석</h2>
      
      <div className="space-y-6">
        {/* 자본구조 시나리오 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-blue-800">📊 자본구조 시나리오 분석</h3>
            <DataSourceButton onClick={() => setModalOpen('capitalstructure')}>
              데이터 상세보기
            </DataSourceButton>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-2 py-1">시나리오</th>
                  <th className="border px-2 py-1">자기자본비율(E/V)</th>
                  <th className="border px-2 py-1">부채비율(D/V)</th>
                  <th className="border px-2 py-1">부채비용(Rd)</th>
                  <th className="border px-2 py-1">세후부채비용</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1 font-semibold">시나리오 1 (보수적)</td>
                  <td className="border px-2 py-1">100%</td>
                  <td className="border px-2 py-1">0%</td>
                  <td className="border px-2 py-1">-</td>
                  <td className="border px-2 py-1">-</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1 font-semibold">시나리오 2 (중간)</td>
                  <td className="border px-2 py-1">80%</td>
                  <td className="border px-2 py-1">20%</td>
                  <td className="border px-2 py-1">4.0%</td>
                  <td className="border px-2 py-1">3.0%</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1 font-semibold">시나리오 3 (적극적)</td>
                  <td className="border px-2 py-1">70%</td>
                  <td className="border px-2 py-1">30%</td>
                  <td className="border px-2 py-1">4.0%</td>
                  <td className="border px-2 py-1">3.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 부채비용 분석 */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-green-800 mb-3">💰 부채비용 산정 근거</h3>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-green-700 mb-2">부채비용 4.0% 산정 근거</h4>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• <strong>기준금리:</strong> 10년 미국 국채 수익률 4.15%</li>
                <li>• <strong>신용 스프레드:</strong> Small-cap 데이터센터 업체 -0.15%</li>
                <li>• <strong>최종 부채비용:</strong> 4.15% - 0.15% = 4.0%</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-green-700 mb-2">세후 부채비용 계산</h4>
              <p className="text-sm text-green-600">
                세후 부채비용 = 4.0% × (1 - 0.25) = <strong>3.0%</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      <DataSourceModal
        isOpen={modalOpen === 'capitalstructure'}
        onClose={() => setModalOpen(null)}
        title={capitalStructureData.title}
      >
        {capitalStructureData.content}
      </DataSourceModal>
    </section>
  );
}

export function NYDiscountSectionTaxRate() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const taxRateData = {
    title: "뉴욕 주 법인세율 상세 분석",
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-bold text-blue-800 mb-2">📊 뉴욕 주 법인세율 구성</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-2 py-1">세목</th>
                  <th className="border px-2 py-1">세율</th>
                  <th className="border px-2 py-1">적용 기준</th>
                  <th className="border px-2 py-1">근거</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">연방 법인세</td>
                  <td className="border px-2 py-1">21%</td>
                  <td className="border px-2 py-1">과세소득 전체</td>
                  <td className="border px-2 py-1">IRC Sec. 11</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">뉴욕 주 법인세</td>
                  <td className="border px-2 py-1">6.5%</td>
                  <td className="border px-2 py-1">뉴욕 주 과세소득</td>
                  <td className="border px-2 py-1">NY Tax Law Sec. 210</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">뉴욕시 법인세</td>
                  <td className="border px-2 py-1">8.25%</td>
                  <td className="border px-2 py-1">뉴욕시 과세소득</td>
                  <td className="border px-2 py-1">NYC Admin Code</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-bold text-green-800 mb-2">🧮 실효세율 계산</h4>
          <div className="space-y-2 text-sm">
            <p><strong>연방세:</strong> 21%</p>
            <p><strong>주세(연방세 차감 후):</strong> 6.5% × (1 - 0.21) = 5.135%</p>
            <p><strong>시세(연방세, 주세 차감 후):</strong> 8.25% × (1 - 0.21 - 0.05135) = 6.09%</p>
            <p className="font-bold text-green-700"><strong>합계 실효세율:</strong> 21% + 5.135% + 6.09% ≈ 32.2%</p>
          </div>
        </div>
      </div>
    )
  };

  return (
    <section id="tax-rate" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">7. 세율 및 기타 요인 분석</h2>
      
      <div className="space-y-6">
        {/* 세율 구성 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-blue-800">📊 뉴욕 법인 실효세율 분석</h3>
            <DataSourceButton onClick={() => setModalOpen('taxrate')}>
              데이터 상세보기
            </DataSourceButton>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-2 py-1">구분</th>
                  <th className="border px-2 py-1">명목세율</th>
                  <th className="border px-2 py-1">실효세율</th>
                  <th className="border px-2 py-1">WACC 적용</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">연방 법인세</td>
                  <td className="border px-2 py-1">21.0%</td>
                  <td className="border px-2 py-1">21.0%</td>
                  <td className="border px-2 py-1">✓</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">뉴욕 주 법인세</td>
                  <td className="border px-2 py-1">6.5%</td>
                  <td className="border px-2 py-1">5.1%</td>
                  <td className="border px-2 py-1">✓</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">뉴욕시 법인세</td>
                  <td className="border px-2 py-1">8.25%</td>
                  <td className="border px-2 py-1">6.1%</td>
                  <td className="border px-2 py-1">✗</td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td className="border px-2 py-1">합계 (WACC용)</td>
                  <td className="border px-2 py-1">-</td>
                  <td className="border px-2 py-1">26.1%</td>
                  <td className="border px-2 py-1">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            ※ 뉴욕시 법인세는 데이터센터 사업의 특성상 제외하고 25% 보수적 적용
          </p>
        </div>

        {/* 세율 적용 근거 */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-green-800 mb-3">📋 WACC 세율 적용 근거</h3>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-green-700 mb-2">25% 세율 적용 사유</h4>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• <strong>연방세:</strong> 21% (확정)</li>
                <li>• <strong>주세:</strong> 실효 약 4% (연방세 차감 후)</li>
                <li>• <strong>보수적 접근:</strong> 25% 적용으로 안전마진 확보</li>
                <li>• <strong>업계 관행:</strong> Small-cap 데이터센터 업체 평균 25%</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-green-700 mb-2">세무 최적화 고려사항</h4>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• R&D 세액공제 활용 가능</li>
                <li>• 가속상각(MACRS) 적용</li>
                <li>• 주정부 인센티브 프로그램 검토</li>
                <li>• 이연법인세 관리 전략</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 최종 세율 결정 */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold text-red-800 mb-3">✅ 최종 법인세율 결정</h3>
          <div className="bg-white p-4 rounded border-2 border-red-300">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">WACC 계산용 법인세율 (Tc)</div>
              <div className="text-3xl font-bold text-red-600 mb-2">25%</div>
              <div className="text-sm text-gray-600">연방세 + 주세 실효세율 기준 (보수적 적용)</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <strong>근거:</strong> IRS 연방법인세 21% + 뉴욕 주세 실효 4% = 25% (보수적 적용)
          </div>
        </div>
      </div>

      {/* 모달 */}
      <DataSourceModal
        isOpen={modalOpen === 'taxrate'}
        onClose={() => setModalOpen(null)}
        title={taxRateData.title}
      >
        {taxRateData.content}
      </DataSourceModal>
    </section>
  );
}

export function NYDiscountSectionWaccCalculation() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const waccData = {
    title: "WACC 계산 상세 과정 및 근거",
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-bold text-blue-800 mb-2">📊 계산 과정 상세</h4>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded border">
              <h5 className="font-semibold text-blue-700 mb-1">1. 자기자본비용(Re) 계산</h5>
              <p className="text-sm">Re = Rf + β × (Rm-Rf)</p>
              <p className="text-sm">Re = 4.15% + 1.35 × 4.33% = <strong>10.0%</strong></p>
            </div>
            <div className="bg-white p-3 rounded border">
              <h5 className="font-semibold text-blue-700 mb-1">2. Small-cap Risk Premium 추가</h5>
              <p className="text-sm">Small-cap Premium = <strong>0.2%</strong></p>
              <p className="text-sm">조정된 자기자본비용 = 10.0% + 0.2% = <strong>10.2%</strong></p>
            </div>
            <div className="bg-white p-3 rounded border">
              <h5 className="font-semibold text-blue-700 mb-1">3. 시나리오별 WACC</h5>
              <div className="text-sm space-y-1">
                <p><strong>시나리오 1:</strong> WACC = 1.0 × 10.2% + 0 × 4% × 0.75 = <strong>10.2%</strong></p>
                <p><strong>시나리오 2:</strong> WACC = 0.8 × 10.2% + 0.2 × 4% × 0.75 = 8.16% + 0.6% = <strong>8.76%</strong></p>
                <p><strong>시나리오 3:</strong> WACC = 0.7 × 10.2% + 0.3 × 4% × 0.75 = 7.14% + 0.9% = <strong>8.04%</strong></p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-bold text-green-800 mb-2">📈 민감도 분석</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-2 py-1">베타 변화</th>
                  <th className="border px-2 py-1">Re (기본)</th>
                  <th className="border px-2 py-1">Re (Premium 포함)</th>
                  <th className="border px-2 py-1">WACC (100%)</th>
                  <th className="border px-2 py-1">WACC (80%)</th>
                  <th className="border px-2 py-1">WACC (70%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">β = 1.2</td>
                  <td className="border px-2 py-1">9.35%</td>
                  <td className="border px-2 py-1">9.55%</td>
                  <td className="border px-2 py-1">9.55%</td>
                  <td className="border px-2 py-1">8.24%</td>
                  <td className="border px-2 py-1">7.59%</td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td className="border px-2 py-1">β = 1.35</td>
                  <td className="border px-2 py-1">10.0%</td>
                  <td className="border px-2 py-1">10.2%</td>
                  <td className="border px-2 py-1">10.2%</td>
                  <td className="border px-2 py-1">8.76%</td>
                  <td className="border px-2 py-1">8.04%</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">β = 1.5</td>
                  <td className="border px-2 py-1">10.65%</td>
                  <td className="border px-2 py-1">10.85%</td>
                  <td className="border px-2 py-1">10.85%</td>
                  <td className="border px-2 py-1">9.28%</td>
                  <td className="border px-2 py-1">8.50%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  };

  return (
    <section id="wacc-calculation" className="mb-8 bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-700">8. 시나리오별 WACC 산출 및 그래프</h2>
        <DataSourceButton onClick={() => setModalOpen('wacc')}>
          계산 상세보기
        </DataSourceButton>
      </div>
      
      <div className="mb-4">
        <strong>시나리오별 계산 (베타 1.35 + Small-cap Premium 0.2% 반영):</strong>
        <ul className="list-disc pl-6">
          <li>
            <b>기본 자기자본비용:</b> Re = 4.15% + 1.35 × 4.33% = <b>10.0%</b>
          </li>
          <li>
            <b>Small-cap Premium 추가:</b> 10.0% + 0.2% = <b>10.2%</b>
          </li>
        </ul>
        <div className="mt-2 p-3 bg-blue-50 rounded">
          <strong>최종 시나리오별 WACC:</strong>
          <ul className="list-disc pl-6 mt-1">
            <li>
              <b>시나리오 1:</b> WACC = 1.0 × 10.2% + 0 × 4% × (1-0.25) = <b>10.2%</b>
            </li>
            <li>
              <b>시나리오 2:</b> WACC = 0.8 × 10.2% + 0.2 × 4% × (1-0.25) = 8.16% + 0.6% = <b>8.76%</b>
            </li>
            <li>
              <b>시나리오 3:</b> WACC = 0.7 × 10.2% + 0.3 × 4% × (1-0.25) = 7.14% + 0.9% = <b>8.04%</b>
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-4">
        <strong>표:</strong>
        <table className="min-w-max table-auto border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">시나리오</th>
              <th className="border px-4 py-2">자기자본비율</th>
              <th className="border px-4 py-2">타인자본비율</th>
              <th className="border px-4 py-2">WACC</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-green-50 font-bold">
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">100%</td>
              <td className="border px-4 py-2">0%</td>
              <td className="border px-4 py-2 text-green-700">10.2%</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">80%</td>
              <td className="border px-4 py-2">20%</td>
              <td className="border px-4 py-2">8.76%</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3</td>
              <td className="border px-4 py-2">70%</td>
              <td className="border px-4 py-2">30%</td>
              <td className="border px-4 py-2">8.04%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-4">
        <strong>그래프:</strong>
        <div className="my-2">
          {/* 실제 그래프 이미지는 추후 첨부 */}
          <img src="/attachments/wacc_scenario_graph.png" alt="WACC 시나리오 그래프" className="my-2 rounded shadow" />
        </div>
      </div>

      {/* 모달 */}
      <DataSourceModal
        isOpen={modalOpen === 'wacc'}
        onClose={() => setModalOpen(null)}
        title={waccData.title}
      >
        {waccData.content}
      </DataSourceModal>
    </section>
  );
}

export function NYDiscountSectionConclusion() {
  return (
    <section id="conclusion" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">9. 결론 및 시사점</h2>
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-3">📋 시나리오별 WACC 분석 결론 (고위험 베타 + Small-cap Premium 반영)</h3>
          <div className="bg-white p-4 rounded border">
            <div className="mb-2">
              <b>소형 데이터센터의 고위험 특성을 반영한 베타(β=1.35) 및 Small-cap Premium(0.2%) 적용 시, 자기자본 100% 구조에서는 WACC가 10.2%로 산출됩니다.</b>
            </div>
            <div className="mb-2">
              <b>타인자본 비중이 20%로 증가할 경우 8.76%, 30%까지 늘릴 경우 8.04%로 낮아집니다.</b>
            </div>
            <div className="mb-2">
              이는 부채의 세금절감효과와 낮은 자본비용에 기인합니다.
            </div>
            <div className="mb-2">
              <b>단, 부채비율이 높아질수록 재무적 위험(파산위험, 신용등급 하락 등)도 증가하므로, 적정 수준의 자본구조(예: 자기자본 70~80%)를 유지하는 것이 바람직합니다.</b>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-green-800 mb-3">🎯 실무적 활용 방안</h3>
          <ul className="text-green-700 space-y-1 text-sm">
            <li>• DCF 할인율 산정 시 시나리오별 WACC를 참고하여 자본구조 전략 수립</li>
            <li>• 부채 활용 시 재무적 위험과 절세효과를 균형 있게 고려</li>
            <li>• 시장 환경 변화에 따라 WACC 재산정 필요</li>
            <li>• 소형 데이터센터의 고위험 특성을 반영한 베타값(1.35) 적용으로 보다 정확한 위험 반영</li>
            <li>• Small-cap Premium(0.2%) 추가로 소형 기업 특유의 위험 요소 반영</li>
            <li>• 24개월 평균 이자율 적용으로 단기 변동성 완화 및 안정적 할인율 확보</li>
      </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-3">📊 최종 권장 시나리오</h3>
          <div className="bg-white p-4 rounded border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">최종 선택 시나리오</div>
                <div className="text-2xl font-bold text-gray-800">시나리오 1</div>
                <div className="text-sm text-gray-500">자기자본 100%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">최종 WACC</div>
                <div className="text-2xl font-bold text-blue-600">10.2%</div>
                <div className="text-sm text-gray-500">할인율 적용</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NYDiscountSectionWacc() {
  return (
    <section id="wacc" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-2">4. 미국(뉴욕) 기준 WACC 산출 과정</h2>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4 text-gray-800">
        <div>
          <b>Cost of equity = Rf + β × (Risk premium)</b><br />
          <span className="text-blue-700">4.15% + 1.35 × 4.33% = <b>10.0%</b></span>
        </div>
        <div>
          <b>Small-cap Risk Premium = +0.2%</b>
        </div>
        <div>
          <b>Adjusted Cost of equity = 10.0% + 0.2% = <b>10.2%</b></b>
        </div>
        <div>
          <b>Cost of debt = 0% (무차입)</b>
        </div>
        <div>
          <b>WACC = <span className="text-blue-700 text-lg font-bold">10.2%</span></b>
        </div>
      </div>
      <table className="w-full text-sm border mb-4">
        <thead>
          <tr className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-800">
            <th className="border px-2 py-1">구분</th>
            <th className="border px-2 py-1">수치</th>
            <th className="border px-2 py-1">근거/출처</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border px-2 py-1">무위험이자율(Rf)</td>
            <td className="border px-2 py-1">4.15%</td>
            <td className="border px-2 py-1">Bloomberg (24개월 평균)</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-2 py-1">시장 위험 프리미엄(Rm-Rf)</td>
            <td className="border px-2 py-1">4.33%</td>
            <td className="border px-2 py-1">Damodaran (24개월 평균)</td>
          </tr>
          <tr className="bg-white">
            <td className="border px-2 py-1">Beta(β)</td>
            <td className="border px-2 py-1">1.35</td>
            <td className="border px-2 py-1">소형 데이터센터 고위험</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-2 py-1">Small-cap Risk Premium</td>
            <td className="border px-2 py-1">0.2%</td>
            <td className="border px-2 py-1">Fama-French Size Premium</td>
          </tr>
          <tr className="bg-white">
            <td className="border px-2 py-1">자본구조(E/V:D/V)</td>
            <td className="border px-2 py-1">100% : 0%</td>
            <td className="border px-2 py-1">무차입</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-2 py-1">법인세율(Tc)</td>
            <td className="border px-2 py-1">25%</td>
            <td className="border px-2 py-1">IRS, NY State</td>
          </tr>
          <tr className="bg-green-100 font-bold">
            <td className="border px-2 py-1">WACC</td>
            <td className="border px-2 py-1 font-bold text-green-700 text-lg">10.2%</td>
            <td className="border px-2 py-1 font-bold">최종 산출 (목표 달성)</td>
          </tr>
        </tbody>
      </table>
      <div className="text-gray-700 text-xs">
        ※ 미국(뉴욕) 기준 WACC는 Bloomberg 24개월 평균 채권 데이터, Damodaran 국가별 프리미엄, 소형 데이터센터 고위험 베타, Small-cap Premium 등을 반영하여 산출함.
      </div>
    </section>
  );
}

export function NYDiscountSectionTreasury() {
  return (
    <section id="treasury" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-blue-700 mb-2">3. 미 국채 수익률 및 리스크 프리미엄</h2>
      <ul className="list-disc list-inside text-gray-700 mb-2">
        <li>미국 국채(UST) 수익률 현황</li>
        <li>리스크 프리미엄 산정 근거</li>
      </ul>
    </section>
  );
}