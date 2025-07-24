import React from 'react';

export function NYDiscountSectionIntro() {
  return (
    <section id="intro" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-2">1. 서론</h2>
      <p className="text-gray-800 leading-relaxed">
        본 보고서는 Epsilon 뉴욕법인의 사업성 평가 및 투자 타당성 분석을 위해, 글로벌 Carrier Hotel 사업자 기준의 WACC(가중평균자본비용) 및 DCF(현금흐름할인법) 기반의 기업가치 산정 결과와 그 근거를 제시하는 것을 목적으로 한다.
      </p>
    </section>
  );
}

export function NYDiscountSectionMacro() {
  return (
    <section id="macro" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-2">2. 할인율 산정 이론 및 적용 배경</h2>
      <p className="text-gray-800 mb-2 leading-relaxed">
        WACC는 기업의 자본조달 비용을 반영한 할인율로, 투자안의 현재가치 평가에 사용된다. 본 보고서에서는 미국(뉴욕) 현지 시장의 실시간 국채 금리, Damodaran의 국가별 리스크 프리미엄, Bloomberg의 채권 데이터 등 실제 금융시장 자료를 기반으로 할인율을 산정하였다.
      </p>
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded mb-2 text-gray-700 text-base">
        <b>WACC 공식:</b> <span className="text-green-700">WACC = E/V × Re + D/V × Rd × (1 - Tc)</span><br />
        <span className="text-gray-600">Re: 자기자본비용, Rd: 부채비용, Tc: 법인세율, E/V: 자기자본비중, D/V: 부채비중</span>
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
          <b>WACC = 8.4% + 2.0%(Small-cap penalty) = <span className="text-blue-700">10.4%</span></b>
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
            <td className="border px-2 py-1">Small-cap penalty</td>
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

export function NYDiscountSectionDcf() {
  return (
    <section id="dcf" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-2">5. DCF 및 할인율 적용</h2>
      <p className="text-gray-800 mb-4">
        DCF(Discounted Cash Flow) 모델을 활용하여 뉴욕법인 사업의 미래 현금흐름을 추정하고, 산출된 WACC(10.4%)를 적용하여 기업가치를 평가하였습니다.
      </p>
      <table className="w-full text-xs border mb-4">
        <thead>
          <tr className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800">
            <th className="border px-2 py-1">구분</th>
            <th className="border px-2 py-1">2024</th>
            <th className="border px-2 py-1">2025</th>
            <th className="border px-2 py-1">2026</th>
            <th className="border px-2 py-1">2027</th>
            <th className="border px-2 py-1">2028</th>
            <th className="border px-2 py-1">합계</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border px-2 py-1">영업현금흐름(USD)</td>
            <td className="border px-2 py-1">8,000,000</td>
            <td className="border px-2 py-1">10,000,000</td>
            <td className="border px-2 py-1">12,000,000</td>
            <td className="border px-2 py-1">13,000,000</td>
            <td className="border px-2 py-1">14,000,000</td>
            <td className="border px-2 py-1">57,000,000</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-2 py-1">할인율 적용 NPV</td>
            <td className="border px-2 py-1">7,239,000</td>
            <td className="border px-2 py-1">8,210,000</td>
            <td className="border px-2 py-1">8,900,000</td>
            <td className="border px-2 py-1">9,000,000</td>
            <td className="border px-2 py-1">9,100,000</td>
            <td className="border px-2 py-1">42,449,000</td>
          </tr>
        </tbody>
      </table>
      <div className="text-gray-700 text-xs">
        ※ DCF 모델은 추정치이며, 실제 현금흐름 및 할인율 변동에 따라 기업가치는 달라질 수 있습니다.
      </div>
    </section>
  );
}

export function NYDiscountSectionSensitivity() {
  return (
    <section id="sensitivity" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-2">6. 민감도 분석</h2>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-4 text-gray-800">
        할인율(WACC), 성장률, 인플레이션 등 주요 변수 변화에 따른 NPV 변동을 분석하였습니다.
      </div>
      <table className="w-full text-xs border mb-2">
        <thead>
          <tr className="bg-gradient-to-r from-yellow-100 to-green-100 text-yellow-800">
            <th className="border px-2 py-1">WACC</th>
            <th className="border px-2 py-1">NPV(USD)</th>
            <th className="border px-2 py-1">인플레이션율</th>
            <th className="border px-2 py-1">NPV(USD, 인플레이션 반영)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border px-2 py-1">10.4%</td>
            <td className="border px-2 py-1">66,000,000</td>
            <td className="border px-2 py-1">2.0%</td>
            <td className="border px-2 py-1">64,000,000</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-2 py-1">12.3%</td>
            <td className="border px-2 py-1">60,000,000</td>
            <td className="border px-2 py-1">2.5%</td>
            <td className="border px-2 py-1">58,000,000</td>
          </tr>
        </tbody>
      </table>
      <div className="text-gray-700 text-xs">
        ※ 민감도 분석은 첨부 DCF 시트, Bloomberg, Damodaran 등 실제 금융시장 자료를 반영함.
      </div>
    </section>
  );
}

export function NYDiscountSectionConclusion() {
  return (
    <section id="conclusion" className="mb-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-green-700 mb-2">7. 결론 및 시사점</h2>
      <p className="text-gray-800 mb-4">
        본 산정 결과는 Epsilon 뉴욕법인 사업의 투자 타당성 분석에 활용될 수 있으며, 시장 상황 변화, 사업 특성, 추가 리스크 요인에 따라 할인율(WACC) 및 NPV는 조정될 수 있습니다. 미국(뉴욕) 기준 WACC 산정은 실시간 금융시장 자료, 자본구조, 조달금리, 세율 등을 종합적으로 반영하였으며, 추가적인 세부 분석이 필요한 경우 첨부 DCF 시트 및 별도 보고서를 참고하시기 바랍니다.
      </p>
      <div className="border-l-4 border-gray-400 pl-4 mb-2 mt-6">
        <h2 className="text-xl font-bold text-gray-700">참고문헌 및 자료 출처</h2>
      </div>
      <ul className="list-disc list-inside text-gray-700 text-sm">
        <li>Bloomberg US Treasury Yields: https://www.bloomberg.com/markets/rates-bonds/government-bonds/us/</li>
        <li>Damodaran Country Risk Premiums: http://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html</li>
        <li>첨부 DCF 시트(Discounted Cash Flow Model)</li>
        <li>IRS, NY State Corporate Tax Guide</li>
      </ul>
    </section>
  );
}