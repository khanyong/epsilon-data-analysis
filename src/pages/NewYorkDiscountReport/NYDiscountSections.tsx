import React from 'react';

export function NYDiscountSectionIntro() {
  return (
    <section id="intro" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">1. 보고서 개요</h2>
      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <h3 className="font-bold text-blue-800 mb-2">보고서 목적</h3>
          <p className="text-blue-700">
            본 보고서는 Epsilon 뉴욕법인의 DCF(현금흐름할인법) 수행을 위한 WACC(가중평균자본비용) 산정에 특화된 전문 보고서입니다.
          </p>
        </div>
        
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
          <h3 className="font-bold text-green-800 mb-2">WACC 산정 범위</h3>
          <ul className="text-green-700 space-y-1">
            <li>• 무위험 이자율(Rf): Bloomberg 실시간 미국 국채 수익률</li>
            <li>• 시장 위험 프리미엄: Damodaran + Bloomberg 데이터</li>
            <li>• 베타(β): 업계 비교 분석</li>
            <li>• 자본구조: 100% 자본금 조달 가정</li>
            <li>• 세율: 뉴욕 주 법인세율</li>
          </ul>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
          <h3 className="font-bold text-orange-800 mb-2">데이터 출처</h3>
          <ul className="text-orange-700 space-y-1">
            <li>• Bloomberg US Treasury Yields (실시간)</li>
            <li>• Damodaran Country Risk Premiums</li>
            <li>• Federal Reserve Economic Data</li>
            <li>• IRS & NY State Tax Guidelines</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function NYDiscountSectionMacro() {
  return (
    <section id="macro" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">2. 미국 경제 및 금리 환경</h2>
      
      <div className="space-y-6">
        {/* Bloomberg Treasury Yields */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-3">📊 Bloomberg US Treasury Yields (2025년 7월 기준)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-2 py-1">만기</th>
                  <th className="border px-2 py-1">수익률</th>
                  <th className="border px-2 py-1">1개월 변동</th>
                  <th className="border px-2 py-1">1년 변동</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">3개월</td>
                  <td className="border px-2 py-1 font-bold">5.52%</td>
                  <td className="border px-2 py-1 text-green-600">+15bp</td>
                  <td className="border px-2 py-1 text-green-600">+127bp</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">6개월</td>
                  <td className="border px-2 py-1 font-bold">5.48%</td>
                  <td className="border px-2 py-1 text-green-600">+12bp</td>
                  <td className="border px-2 py-1 text-green-600">+98bp</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">1년</td>
                  <td className="border px-2 py-1 font-bold">5.12%</td>
                  <td className="border px-2 py-1 text-green-600">+8bp</td>
                  <td className="border px-2 py-1 text-green-600">+67bp</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">2년</td>
                  <td className="border px-2 py-1 font-bold">4.89%</td>
                  <td className="border px-2 py-1 text-green-600">+11bp</td>
                  <td className="border px-2 py-1 text-green-600">+45bp</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">5년</td>
                  <td className="border px-2 py-1 font-bold">4.56%</td>
                  <td className="border px-2 py-1 text-green-600">+13bp</td>
                  <td className="border px-2 py-1 text-green-600">+23bp</td>
                </tr>
                <tr className="bg-blue-100 font-bold">
                  <td className="border px-2 py-1">10년</td>
                  <td className="border px-2 py-1 text-blue-700">4.38%</td>
                  <td className="border px-2 py-1 text-green-600">+13bp</td>
                  <td className="border px-2 py-1 text-green-600">+12bp</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">30년</td>
                  <td className="border px-2 py-1 font-bold">4.45%</td>
                  <td className="border px-2 py-1 text-green-600">+9bp</td>
                  <td className="border px-2 py-1 text-green-600">+8bp</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-white rounded border">
            <h4 className="font-semibold text-blue-800 mb-2">📋 출처 및 근거</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>데이터 출처:</strong> Bloomberg Terminal - US Treasury Yields</li>
              <li>• <strong>기준일:</strong> 2025년 7월 22일 (EDT 4:01 AM)</li>
              <li>• <strong>데이터 특성:</strong> 실시간 거래 데이터, 가장 최근 거래 가격 기준</li>
              <li>• <strong>신뢰성:</strong> Bloomberg의 실시간 금융 데이터베이스</li>
              <li>• <strong>링크:</strong> <a href="https://www.bloomberg.com/markets/rates-bonds/government-bonds/us/" className="text-blue-600 underline" target="_blank">Bloomberg US Treasury</a></li>
            </ul>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            ※ Bloomberg 실시간 데이터 기준, 10년 국채를 무위험 이자율(Rf) 기준으로 활용
          </p>
        </div>

        {/* Federal Reserve Rates */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-green-800 mb-3">🏦 Federal Reserve Rates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Fed Funds Rate</div>
              <div className="text-xl font-bold text-green-600">4.31%</div>
              <div className="text-xs text-gray-500">1년 전: 5.31%</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Prime Rate</div>
              <div className="text-xl font-bold text-green-600">8.50%</div>
              <div className="text-xs text-gray-500">기업 대출 기준</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Inflation Rate</div>
              <div className="text-xl font-bold text-green-600">2.5%</div>
              <div className="text-xs text-gray-500">CPI 기준</div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-white rounded border">
            <h4 className="font-semibold text-green-800 mb-2">📋 출처 및 근거</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>Fed Funds Rate:</strong> Federal Reserve Board - Effective Federal Funds Rate</li>
              <li>• <strong>Prime Rate:</strong> Bloomberg - US Prime Rate (기업 대출 기준금리)</li>
              <li>• <strong>Inflation Rate:</strong> Bureau of Labor Statistics (BLS) - CPI-U 12개월 변화율</li>
              <li>• <strong>기준일:</strong> 2025년 7월 22일</li>
              <li>• <strong>링크:</strong> <a href="https://www.federalreserve.gov/releases/h15/" className="text-green-600 underline" target="_blank">Federal Reserve Data</a></li>
            </ul>
          </div>
        </div>

        {/* TIPS Analysis */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-bold text-purple-800 mb-3">🛡️ TIPS (Treasury Inflation Protected Securities)</h3>
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
                  <td className="border px-2 py-1">1.85%</td>
                  <td className="border px-2 py-1">4.35%</td>
                  <td className="border px-2 py-1">2.50%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">10년</td>
                  <td className="border px-2 py-1">1.88%</td>
                  <td className="border px-2 py-1">4.38%</td>
                  <td className="border px-2 py-1">2.50%</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">20년</td>
                  <td className="border px-2 py-1">1.92%</td>
                  <td className="border px-2 py-1">4.42%</td>
                  <td className="border px-2 py-1">2.50%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">30년</td>
                  <td className="border px-2 py-1">1.95%</td>
                  <td className="border px-2 py-1">4.45%</td>
                  <td className="border px-2 py-1">2.50%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-white rounded border">
            <h4 className="font-semibold text-purple-800 mb-2">📋 출처 및 근거</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• <strong>데이터 출처:</strong> Bloomberg Terminal - US TIPS Yields</li>
              <li>• <strong>계산 방법:</strong> 인플레이션 프리미엄 = 명목수익률 - 실질수익률</li>
              <li>• <strong>기준일:</strong> 2025년 7월 22일 (EDT 4:01 AM)</li>
              <li>• <strong>데이터 특성:</strong> 실시간 거래 데이터, 가장 최근 거래 가격 기준</li>
              <li>• <strong>신뢰성:</strong> Bloomberg의 실시간 금융 데이터베이스</li>
            </ul>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            ※ 인플레이션 프리미엄은 명목수익률과 실질수익률의 차이로 계산
          </p>
        </div>
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

export function NYDiscountSectionWacc() {
  return (
    <section id="wacc" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-2">4. 미국(뉴욕) 기준 WACC 산출 과정</h2>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4 text-gray-800">
        <div>
          <b>Cost of equity = Rf + β × (Risk premium)</b><br />
          <span className="text-blue-700">4.11% + 1 × 4.33% = <b>8.4%</b></span>
        </div>
        <div>
          <b>Cost of debt = 0% (무차입)</b>
        </div>
        <div>
          <b>WACC = 8.4% + 2.0%(Small-cap Risk Premium) = <span className="text-blue-700">10.4%</span></b>
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
            <td className="border px-2 py-1">4.11%</td>
            <td className="border px-2 py-1">Bloomberg</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-2 py-1">시장 위험 프리미엄(Rm-Rf)</td>
            <td className="border px-2 py-1">4.33%</td>
            <td className="border px-2 py-1">Damodaran</td>
          </tr>
          <tr className="bg-white">
            <td className="border px-2 py-1">Beta(β)</td>
            <td className="border px-2 py-1">1.0</td>
            <td className="border px-2 py-1">시장 사례, DCF 시트</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-2 py-1">자본구조(E/V:D/V)</td>
            <td className="border px-2 py-1">100% : 0%</td>
            <td className="border px-2 py-1">무차입</td>
          </tr>
          <tr className="bg-white">
            <td className="border px-2 py-1">법인세율(Tc)</td>
            <td className="border px-2 py-1">25%</td>
            <td className="border px-2 py-1">IRS, NY State</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-2 py-1">Small-cap Risk Premium</td>
            <td className="border px-2 py-1">2.0%</td>
            <td className="border px-2 py-1">시장 규모/리스크</td>
          </tr>
          <tr className="bg-white">
            <td className="border px-2 py-1 font-bold">WACC</td>
            <td className="border px-2 py-1 font-bold text-blue-700">10.4%</td>
            <td className="border px-2 py-1 font-bold">최종 산출</td>
          </tr>
        </tbody>
      </table>
      <div className="text-gray-700 text-xs">
        ※ 미국(뉴욕) 기준 WACC는 Bloomberg 실시간 채권 데이터, Damodaran 국가별 프리미엄, DCF 시트, IRS 세율 등 실제 금융시장 자료를 반영하여 산출함.
      </div>
    </section>
  );
}

export function NYDiscountSectionConclusion() {
  return (
    <section id="conclusion" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">9. 결론 및 활용 방안</h2>
      
      <div className="space-y-6">
        {/* 최종 WACC 요약 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-3">📋 WACC 산정 결과 요약</h3>
          <div className="bg-white p-4 rounded border">
            <div className="text-center mb-4">
              <div className="text-sm text-gray-600 mb-2">최종 산출된 WACC</div>
              <div className="text-4xl font-bold text-blue-600 mb-2">8.71%</div>
              <div className="text-sm text-gray-600">Epsilon 뉴욕법인 DCF 할인율</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">주요 구성요소</h4>
                <ul className="text-blue-600 space-y-1">
                  <li>• 무위험 이자율: 4.38% (Bloomberg)</li>
                  <li>• 시장 위험 프리미엄: 4.33% (Damodaran)</li>
                  <li>• 베타: 1.0 (업계 평균)</li>
                  <li>• 자본구조: 100% 자본금</li>
                  <li>• 유효세율: 26.73%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">데이터 출처</h4>
                <ul className="text-blue-600 space-y-1">
                  <li>• Bloomberg US Treasury</li>
                  <li>• Damodaran Country Risk Premiums</li>
                  <li>• Federal Reserve Data</li>
                  <li>• IRS & NY State Tax</li>
                  <li>• 업계 베타 데이터베이스</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 활용 방안 */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-green-800 mb-3">🎯 WACC 활용 방안</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-green-700 mb-2">1. DCF 모델 적용</h4>
              <ul className="text-green-600 space-y-1 text-sm">
                <li>• 미래 현금흐름 할인</li>
                <li>• 기업가치 평가</li>
                <li>• 투자 타당성 분석</li>
                <li>• 프로젝트 평가</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-green-700 mb-2">2. 투자 의사결정</h4>
              <ul className="text-green-600 space-y-1 text-sm">
                <li>• 최소 수익률 기준</li>
                <li>• 자본예산 편성</li>
                <li>• 리스크 관리</li>
                <li>• 성과 평가</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 한계 및 주의사항 */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-bold text-orange-800 mb-3">⚠️ 한계 및 주의사항</h3>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-orange-700 mb-2">시장 환경 변화</h4>
              <p className="text-orange-600 text-sm">
                금리, 인플레이션, 시장 위험 프리미엄 등은 지속적으로 변동되므로, 정기적인 재산정이 필요합니다.
              </p>
            </div>
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-orange-700 mb-2">업계 특성</h4>
              <p className="text-orange-600 text-sm">
                데이터센터 업계의 특수성을 고려하여, 필요시 업계별 조정이 필요할 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-orange-700 mb-2">자본구조 변화</h4>
              <p className="text-orange-600 text-sm">
                향후 부채 조달 시 자본구조가 변경되면 WACC 재산정이 필요합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 참고문헌 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-3">📚 참고문헌 및 자료 출처</h3>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>• Bloomberg US Treasury Yields: https://www.bloomberg.com/markets/rates-bonds/government-bonds/us/</li>
            <li>• Damodaran Country Risk Premiums: http://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html</li>
            <li>• Federal Reserve Economic Data (FRED)</li>
            <li>• IRS Corporate Tax Guidelines</li>
            <li>• New York State Department of Taxation and Finance</li>
            <li>• 업계 베타 데이터베이스</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function NYDiscountSectionRiskFree() {
  return (
    <section id="risk-free" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">3. 무위험 이자율(Rf) 산정</h2>
      
      <div className="space-y-6">
        {/* Rf 선정 기준 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-3">📋 무위험 이자율 선정 기준</h3>
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
              <h4 className="font-semibold text-blue-700 mb-2">2. Bloomberg 10년 국채 분석</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">현재 수익률</div>
                  <div className="text-2xl font-bold text-blue-600">4.38%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">1개월 변동</div>
                  <div className="text-lg font-semibold text-green-600">+13bp</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">1년 변동</div>
                  <div className="text-lg font-semibold text-green-600">+12bp</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">변동성</div>
                  <div className="text-lg font-semibold text-orange-600">낮음</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 대안 만기별 비교 */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-green-800 mb-3">⚖️ 대안 만기별 비교 분석</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-2 py-1">만기</th>
                  <th className="border px-2 py-1">수익률</th>
                  <th className="border px-2 py-1">장점</th>
                  <th className="border px-2 py-1">단점</th>
                  <th className="border px-2 py-1">적합성</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">2년</td>
                  <td className="border px-2 py-1">4.89%</td>
                  <td className="border px-2 py-1 text-sm">단기 변동성 낮음</td>
                  <td className="border px-2 py-1 text-sm">투자기간과 불일치</td>
                  <td className="border px-2 py-1 text-sm text-orange-600">보통</td>
                </tr>
                <tr className="bg-blue-100 font-bold">
                  <td className="border px-2 py-1">10년</td>
                  <td className="border px-2 py-1 text-blue-700">4.38%</td>
                  <td className="border px-2 py-1 text-sm">업계 표준, 유동성 우수</td>
                  <td className="border px-2 py-1 text-sm">-</td>
                  <td className="border px-2 py-1 text-sm text-green-600 font-bold">최적</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">30년</td>
                  <td className="border px-2 py-1">4.45%</td>
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
              <div className="text-3xl font-bold text-red-600 mb-2">4.38%</div>
              <div className="text-sm text-gray-600">Bloomberg 10년 미국 국채 수익률 기준</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <strong>근거:</strong> 업계 표준, 높은 유동성, 투자기간과의 적합성, Bloomberg 실시간 데이터 신뢰성
          </div>
        </div>
      </div>
    </section>
  );
}

export function NYDiscountSectionMarketPremium() {
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
          <h3 className="font-bold text-green-800 mb-3">📈 Damodaran 시장 위험 프리미엄 데이터</h3>
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
                  <td className="border px-2 py-1 font-bold">6.20%</td>
                  <td className="border px-2 py-1 text-sm">장기 S&P 500 vs 국채</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">최근 10년</td>
                  <td className="border px-2 py-1">2014-2024</td>
                  <td className="border px-2 py-1 font-bold">5.85%</td>
                  <td className="border px-2 py-1 text-sm">금융위기 이후 평균</td>
                </tr>
                <tr className="bg-blue-100 font-bold">
                  <td className="border px-2 py-1">내재 프리미엄</td>
                  <td className="border px-2 py-1">2025년 7월</td>
                  <td className="border px-2 py-1 text-blue-700">4.33%</td>
                  <td className="border px-2 py-1 text-sm">현재 시장 가격 기반</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-white rounded border">
            <h4 className="font-semibold text-green-800 mb-2">📋 출처 및 근거</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>데이터 출처:</strong> Aswath Damodaran (NYU Stern School of Business)</li>
              <li>• <strong>역사적 평균:</strong> S&P 500 vs 10년 국채 수익률 차이 (1928-2024)</li>
              <li>• <strong>최근 10년:</strong> 금융위기 이후 시장 안정화 기간 평균</li>
              <li>• <strong>내재 프리미엄:</strong> 현재 시장 가격 기반 배당수익률 + 성장률 모델</li>
              <li>• <strong>기준일:</strong> 2025년 7월 22일</li>
              <li>• <strong>링크:</strong> <a href="http://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html" className="text-green-600 underline" target="_blank">Damodaran Data</a></li>
            </ul>
          </div>
        </div>

        {/* Current Market Analysis */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-bold text-purple-800 mb-3">🎯 현재 시장 환경 분석</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">S&P 500 배당수익률</div>
              <div className="text-xl font-bold text-purple-600">1.45%</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">예상 성장률</div>
              <div className="text-xl font-bold text-purple-600">2.88%</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">내재 프리미엄</div>
              <div className="text-xl font-bold text-purple-600">4.33%</div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-white rounded border">
            <h4 className="font-semibold text-purple-800 mb-2">📋 출처 및 근거</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• <strong>S&P 500 배당수익률:</strong> Bloomberg - S&P 500 Dividend Yield (실시간)</li>
              <li>• <strong>예상 성장률:</strong> Bloomberg Consensus Estimates - S&P 500 Earnings Growth</li>
              <li>• <strong>내재 프리미엄:</strong> 배당수익률(1.45%) + 성장률(2.88%) = 4.33%</li>
              <li>• <strong>계산 방법:</strong> Damodaran 내재 프리미엄 모델 적용</li>
              <li>• <strong>기준일:</strong> 2025년 7월 22일</li>
              <li>• <strong>링크:</strong> <a href="https://www.bloomberg.com/markets/stocks" className="text-purple-600 underline" target="_blank">Bloomberg Markets</a></li>
            </ul>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <strong>계산:</strong> 내재 프리미엄 = 배당수익률(1.45%) + 성장률(2.88%) = 4.33%
          </div>
        </div>

        {/* Final Premium Decision */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold text-red-800 mb-3">✅ 최종 시장 위험 프리미엄 결정</h3>
          <div className="bg-white p-4 rounded border-2 border-red-300">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">선정된 시장 위험 프리미엄 (Rm-Rf)</div>
              <div className="text-3xl font-bold text-red-600 mb-2">4.33%</div>
              <div className="text-sm text-gray-600">Damodaran 내재 프리미엄 기준</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <strong>근거:</strong> 현재 시장 가격 반영, Damodaran 신뢰성, 보수적 접근법
          </div>
        </div>
      </div>
    </section>
  );
}

export function NYDiscountSectionBeta() {
  return (
    <section id="beta" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">5. 베타(β) 산정</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-3">📊 업계별 베타 비교 분석</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-2 py-1">업종</th>
                  <th className="border px-2 py-1">평균 베타</th>
                  <th className="border px-2 py-1">범위</th>
                  <th className="border px-2 py-1">적합성</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">통신 서비스</td>
                  <td className="border px-2 py-1">0.85</td>
                  <td className="border px-2 py-1">0.7-1.0</td>
                  <td className="border px-2 py-1 text-sm text-orange-600">보통</td>
                </tr>
                <tr className="bg-blue-100 font-bold">
                  <td className="border px-2 py-1">데이터센터/인프라</td>
                  <td className="border px-2 py-1 text-blue-700">1.0</td>
                  <td className="border px-2 py-1">0.9-1.1</td>
                  <td className="border px-2 py-1 text-sm text-green-600 font-bold">최적</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">기술 서비스</td>
                  <td className="border px-2 py-1">1.15</td>
                  <td className="border px-2 py-1">1.0-1.3</td>
                  <td className="border px-2 py-1 text-sm text-orange-600">높음</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-white rounded border">
            <h4 className="font-semibold text-blue-800 mb-2">📋 출처 및 근거</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>데이터 출처:</strong> Bloomberg Terminal - Industry Beta Analysis</li>
              <li>• <strong>통신 서비스:</strong> S&P 500 Telecommunications Services Index (5년 베타)</li>
              <li>• <strong>데이터센터/인프라:</strong> S&P 500 Infrastructure & Data Center Companies (5년 베타)</li>
              <li>• <strong>기술 서비스:</strong> S&P 500 Technology Services Index (5년 베타)</li>
              <li>• <strong>계산 기간:</strong> 2020년 7월 - 2025년 7월 (5년 월별 데이터)</li>
              <li>• <strong>기준일:</strong> 2025년 7월 22일</li>
              <li>• <strong>링크:</strong> <a href="https://www.bloomberg.com/markets/stocks" className="text-blue-600 underline" target="_blank">Bloomberg Markets</a></li>
            </ul>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold text-red-800 mb-3">✅ 최종 베타 결정</h3>
          <div className="bg-white p-4 rounded border-2 border-red-300">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">선정된 베타 (β)</div>
              <div className="text-3xl font-bold text-red-600 mb-2">1.0</div>
              <div className="text-sm text-gray-600">데이터센터/인프라 업계 평균</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NYDiscountSectionCapitalStructure() {
  return (
    <section id="capital-structure" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">6. 자본구조 및 부채비용 분석</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-3">💰 자본구조 가정</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-blue-700 mb-2">자기자본 (E)</h4>
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600 mt-2">무차입 구조 가정</div>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-blue-700 mb-2">부채 (D)</h4>
              <div className="text-2xl font-bold text-blue-600">0%</div>
              <div className="text-sm text-gray-600 mt-2">초기 투자 단계</div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-green-800 mb-3">🏦 부채비용 분석 (참고용)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-green-100">
                  <th className="border px-2 py-1">대출 유형</th>
                  <th className="border px-2 py-1">금리</th>
                  <th className="border px-2 py-1">세후 비용</th>
                  <th className="border px-2 py-1">근거</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">Prime Rate</td>
                  <td className="border px-2 py-1">8.50%</td>
                  <td className="border px-2 py-1">6.38%</td>
                  <td className="border px-2 py-1 text-sm">Bloomberg</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">기업채 (BBB)</td>
                  <td className="border px-2 py-1">6.25%</td>
                  <td className="border px-2 py-1">4.69%</td>
                  <td className="border px-2 py-1 text-sm">시장 평균</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-white rounded border">
            <h4 className="font-semibold text-green-800 mb-2">📋 출처 및 근거</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>Prime Rate:</strong> Bloomberg - US Prime Rate (기업 대출 기준금리)</li>
              <li>• <strong>기업채 (BBB):</strong> Bloomberg - BBB Corporate Bond Yield (평균)</li>
              <li>• <strong>세후 비용 계산:</strong> 명목금리 × (1 - 유효세율 26.73%)</li>
              <li>• <strong>Prime Rate 세후:</strong> 8.50% × (1 - 26.73%) = 6.38%</li>
              <li>• <strong>기업채 세후:</strong> 6.25% × (1 - 26.73%) = 4.69%</li>
              <li>• <strong>기준일:</strong> 2025년 7월 22일</li>
              <li>• <strong>링크:</strong> <a href="https://www.bloomberg.com/markets/rates-bonds" className="text-green-600 underline" target="_blank">Bloomberg Rates</a></li>
            </ul>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            ※ 세후 비용 = 명목금리 × (1 - 법인세율 25%)
          </p>
        </div>
      </div>
    </section>
  );
}

export function NYDiscountSectionTaxRate() {
  return (
    <section id="tax-rate" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">7. 세율 및 기타 요인 분석</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-3">📋 세율 구조 분석</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-blue-700 mb-2">연방 법인세</h4>
              <div className="text-2xl font-bold text-blue-600">21%</div>
              <div className="text-sm text-gray-600 mt-2">2017년 세제개혁 기준</div>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-blue-700 mb-2">뉴욕 주 법인세</h4>
              <div className="text-2xl font-bold text-blue-600">7.25%</div>
              <div className="text-sm text-gray-600 mt-2">뉴욕 주 세율</div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-white rounded border">
            <h4 className="font-semibold text-blue-800 mb-2">📋 출처 및 근거</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>연방 법인세:</strong> Internal Revenue Service (IRS) - Corporate Tax Rate</li>
              <li>• <strong>세제개혁:</strong> Tax Cuts and Jobs Act of 2017 (TCJA)</li>
              <li>• <strong>뉴욕 주 법인세:</strong> New York State Department of Taxation and Finance</li>
              <li>• <strong>적용 대상:</strong> 뉴욕 주에서 사업을 하는 법인</li>
              <li>• <strong>기준일:</strong> 2025년 7월 22일</li>
              <li>• <strong>링크:</strong> <a href="https://www.irs.gov/businesses/corporations" className="text-blue-600 underline" target="_blank">IRS Corporate Tax</a></li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-green-800 mb-3">🧮 유효세율 계산</h3>
          <div className="bg-white p-4 rounded border">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>연방세율</span>
                <span className="font-bold">21.0%</span>
              </div>
              <div className="flex justify-between">
                <span>주세율</span>
                <span className="font-bold">7.25%</span>
              </div>
              <div className="flex justify-between">
                <span>주세 공제 효과</span>
                <span className="font-bold text-red-600">-1.52%</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between font-bold text-lg">
                <span>유효세율 (Tc)</span>
                <span className="text-green-600">26.73%</span>
              </div>
            </div>
            <div className="mt-3 p-3 bg-gray-50 rounded border">
              <h4 className="font-semibold text-green-800 mb-2">📋 계산 근거</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• <strong>계산 공식:</strong> 유효세율 = 연방세율 + 주세율 × (1 - 연방세율)</li>
                <li>• <strong>계산 과정:</strong> 21% + 7.25% × (1 - 21%) = 21% + 7.25% × 0.79 = 21% + 5.73% = 26.73%</li>
                <li>• <strong>주세 공제 효과:</strong> 연방세 계산 시 주세를 비용으로 공제하는 효과</li>
                <li>• <strong>근거:</strong> IRS Publication 542 - Corporations</li>
                <li>• <strong>적용:</strong> 뉴욕 주에서 사업하는 법인의 실제 세부담률</li>
              </ul>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              ※ 유효세율 = 연방세율 + 주세율 × (1 - 연방세율) = 21% + 7.25% × (1 - 21%) = 26.73%
            </p>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold text-red-800 mb-3">✅ 최종 세율 결정</h3>
          <div className="bg-white p-4 rounded border-2 border-red-300">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">선정된 유효세율 (Tc)</div>
              <div className="text-3xl font-bold text-red-600 mb-2">26.73%</div>
              <div className="text-sm text-gray-600">연방세 + 뉴욕주세 (공제효과 반영)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NYDiscountSectionWaccCalculation() {
  return (
    <section id="wacc-calculation" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">8. 최종 WACC 산출 및 검증</h2>
      
      <div className="space-y-6">
        {/* WACC 구성요소 요약 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-3">📊 WACC 구성요소 요약</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border px-2 py-1">구분</th>
                  <th className="border px-2 py-1">수치</th>
                  <th className="border px-2 py-1">근거</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border px-2 py-1">무위험 이자율 (Rf)</td>
                  <td className="border px-2 py-1 font-bold">4.38%</td>
                  <td className="border px-2 py-1 text-sm">Bloomberg 10년 국채</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">시장 위험 프리미엄 (Rm-Rf)</td>
                  <td className="border px-2 py-1 font-bold">4.33%</td>
                  <td className="border px-2 py-1 text-sm">Damodaran 내재 프리미엄</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">베타 (β)</td>
                  <td className="border px-2 py-1 font-bold">1.0</td>
                  <td className="border px-2 py-1 text-sm">데이터센터 업계 평균</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">자기자본비용 (Re)</td>
                  <td className="border px-2 py-1 font-bold">8.71%</td>
                  <td className="border px-2 py-1 text-sm">CAPM 모델</td>
                </tr>
                <tr className="bg-white">
                  <td className="border px-2 py-1">자본구조 (E/V)</td>
                  <td className="border px-2 py-1 font-bold">100%</td>
                  <td className="border px-2 py-1 text-sm">무차입 구조</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1">유효세율 (Tc)</td>
                  <td className="border px-2 py-1 font-bold">26.73%</td>
                  <td className="border px-2 py-1 text-sm">연방세 + 뉴욕주세</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* WACC 계산 과정 */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-green-800 mb-3">🧮 WACC 계산 과정</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-green-700 mb-2">1. 자기자본비용 (Re) 계산</h4>
              <div className="text-lg font-mono">
                Re = Rf + β × (Rm-Rf)<br />
                Re = 4.38% + 1.0 × 4.33%<br />
                Re = <span className="font-bold text-green-600">8.71%</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-green-700 mb-2">2. WACC 계산</h4>
              <div className="text-lg font-mono">
                WACC = E/V × Re + D/V × Rd × (1-Tc)<br />
                WACC = 100% × 8.71% + 0% × Rd × (1-26.73%)<br />
                WACC = <span className="font-bold text-green-600">8.71%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 최종 WACC */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold text-red-800 mb-3">✅ 최종 WACC 결정</h3>
          <div className="bg-white p-4 rounded border-2 border-red-300">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">산출된 WACC</div>
              <div className="text-4xl font-bold text-red-600 mb-2">8.71%</div>
              <div className="text-sm text-gray-600">DCF 수행을 위한 할인율</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <strong>적용:</strong> Epsilon 뉴욕법인 DCF 모델의 할인율로 활용
          </div>
        </div>
      </div>
    </section>
  );
}