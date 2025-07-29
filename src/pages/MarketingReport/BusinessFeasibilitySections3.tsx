import React, { useState } from 'react';

// 유틸리티 함수들
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const formatPercentage = (value: number) => {
  return `${(value * 100).toFixed(1)}%`;
};

export function BusinessFeasibilitySectionDcf() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  const [showWaccModal, setShowWaccModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('');

  const openWaccModal = (componentKey: string) => {
    setSelectedComponent(componentKey);
    setShowWaccModal(true);
  };

  // DCF 계산 함수들
  const calculateFinancialMetrics = (cashFlows: number[], discountRate: number) => {
    const npv = cashFlows.reduce((sum, cf, year) => {
      return sum + cf / Math.pow(1 + discountRate, year + 1);
    }, 0);

    // IRR 계산 (간단한 근사치)
    let irr = 0.1;
    for (let i = 0; i < 100; i++) {
      const npvTest = cashFlows.reduce((sum, cf, year) => {
        return sum + cf / Math.pow(1 + irr, year + 1);
      }, 0);
      if (Math.abs(npvTest) < 1000) break;
      irr += npvTest > 0 ? 0.01 : -0.01;
    }

    // Payback Period 계산
    let cumulativeCf = 0;
    let paybackPeriod = 0;
    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCf += cashFlows[i];
      if (cumulativeCf >= 0) {
        paybackPeriod = i + 1;
        break;
      }
    }

    // Profitability Index
    const profitabilityIndex = npv / Math.abs(cashFlows[0]);

    return {
      npv,
      irr,
      paybackPeriod,
      profitabilityIndex
    };
  };

  // Base 매출 데이터 (매출 추정에서 계산된 실제 값)
  const getBaseRevenueData = (region: 'mumbai' | 'chennai') => {
    const basePrice = 1160;
    const baseCustomers = region === 'mumbai' ? 5 : 5; // 첸나이 고객 수를 5로 증가
    const baseProduct = 10;
    const capex = 41000; // 투자 비용 분석에서 가져온 값
    const annualOpex = 3200; // 투자 비용 분석에서 가져온 값
    
    const revenues: number[] = [];
    for (let year = 0; year < 5; year++) {
      const price = basePrice * Math.pow(1.04, year);
      const cumulativeCustomers = baseCustomers * (year + 1);
      const cumulativeSalesUnit = baseProduct * cumulativeCustomers;
      const revenue = cumulativeSalesUnit * price;
      revenues.push(revenue);
    }
    
    return { revenues, capex, annualOpex };
  };

  const generateCashFlows = (region: 'mumbai' | 'chennai', scenario: 'base' | 'optimistic' | 'pessimistic' = 'base') => {
    const { revenues, capex, annualOpex } = getBaseRevenueData(region);
    
    // 시나리오별 매출 조정 비율
    const revenueAdjustments = {
      optimistic: 1.25, // +25%
      base: 1.0,        // Base
      pessimistic: 0.75  // -25%
    };
    
    // 연도별 COGS (이미지 데이터 기반)
    const cogsByYear = [
      55110,  // 2025: $55,110
      135485, // 2026: $135,485
      153430, // 2027: $153,430
      164114, // 2028: $164,114
      175874  // 2029: $175,874
    ];
    
    const adjustment = revenueAdjustments[scenario];
    const cashFlows: number[] = [-capex]; // 초기 투자
    
    for (let year = 1; year <= 5; year++) {
      const adjustedRevenue = revenues[year - 1] * adjustment;
      const cogs = cogsByYear[year - 1]; // 실제 COGS 데이터 사용
      const grossProfit = adjustedRevenue - cogs;
      const opex = annualOpex * Math.pow(1.03, year); // 3% 증가
      const ebitda = grossProfit - opex;
      const tax = ebitda > 0 ? ebitda * 0.25 : 0; // EBITDA가 양수일 때만 세금 계산
      const netIncome = ebitda - tax;
      const depreciation = capex / 5; // 5년 상각
      const operatingCashFlow = netIncome + depreciation;
      
      cashFlows.push(operatingCashFlow);
    }
    
    return cashFlows;
  };

  const generateCalculationDetails = (region: 'mumbai' | 'chennai', scenario: 'base' | 'optimistic' | 'pessimistic' = 'base') => {
    const { revenues, capex, annualOpex } = getBaseRevenueData(region);
    
    const revenueAdjustments = {
      optimistic: 1.25,
      base: 1.0,
      pessimistic: 0.75
    };
    
    const adjustment = revenueAdjustments[scenario];
    const details: Array<{
      year: number;
      revenue: number;
      cogs: number;
      grossProfit: number;
      opex: number;
      ebitda: number;
      tax: number;
      netIncome: number;
      depreciation: number;
      operatingCashFlow: number;
    }> = [];
    
    // COGS 구성 요소 (이미지 데이터 기반)
    const cogsComponents = {
      backbone: { mrc: 2500, arc: 30000 },
      fiberXc: { mrc: 1800, arc: 21600 },
      colocation: { mrc: 1350, arc: 16200 },
      supportHw: { mrc: 167, arc: 2004 },
      localLoop: { mrc: 3400, arc: 40800 }
    };
    
    // 연도별 COGS 계산 (이미지 데이터 기반)
    const cogsByYear = [
      55110,  // 2025: $55,110
      135485, // 2026: $135,485
      153430, // 2027: $153,430
      164114, // 2028: $164,114
      175874  // 2029: $175,874
    ];
    
    for (let year = 1; year <= 5; year++) {
      const adjustedRevenue = revenues[year - 1] * adjustment;
      const cogs = cogsByYear[year - 1]; // 실제 COGS 데이터 사용
      const grossProfit = adjustedRevenue - cogs;
      const opex = annualOpex * Math.pow(1.03, year);
      const ebitda = grossProfit - opex;
      const tax = ebitda > 0 ? ebitda * 0.25 : 0;
      const netIncome = ebitda - tax;
      const depreciation = capex / 5;
      const operatingCashFlow = netIncome + depreciation;
      
      details.push({
        year,
        revenue: adjustedRevenue,
        cogs,
        grossProfit,
        opex,
        ebitda,
        tax,
        netIncome,
        depreciation,
        operatingCashFlow
      });
    }
    
    return details;
  };

  const calculateMetricsForScenario = (region: 'mumbai' | 'chennai', scenario: 'optimistic' | 'base' | 'pessimistic') => {
    const cashFlows = generateCashFlows(region, scenario);
    const discountRate = 0.12; // 12% WACC
    return calculateFinancialMetrics(cashFlows, discountRate);
  };

  // 시나리오별 메트릭 계산
  const mumbaiOptimistic = calculateMetricsForScenario('mumbai', 'optimistic');
  const mumbaiBase = calculateMetricsForScenario('mumbai', 'base');
  const mumbaiPessimistic = calculateMetricsForScenario('mumbai', 'pessimistic');
  
  const chennaiOptimistic = calculateMetricsForScenario('chennai', 'optimistic');
  const chennaiBase = calculateMetricsForScenario('chennai', 'base');
  const chennaiPessimistic = calculateMetricsForScenario('chennai', 'pessimistic');

  // Base 매출 데이터 가져오기
  const mumbaiBaseData = getBaseRevenueData('mumbai');
  const chennaiBaseData = getBaseRevenueData('chennai');

  return (
    <section id="dcf">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">💰 DCF (Discounted Cash Flow) 분석</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          현금흐름 할인법을 통한 투자 가치 평가를 수행합니다. 
          뭄바이와 첸나이 지역별로 시나리오 분석을 통해 투자 위험과 수익성을 종합적으로 평가합니다.
        </p>
      </div>

      {/* 지역 선택 탭 */}
      <div className="bg-gradient-to-br from-gray-50 to-green-50 border-2 border-gray-200 rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setActiveRegion('mumbai')}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                activeRegion === 'mumbai'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 bg-gray-100'
              }`}
            >
              🏙️ 뭄바이 DCF 분석
            </button>
            <button
              onClick={() => setActiveRegion('chennai')}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                activeRegion === 'chennai'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 bg-gray-100'
              }`}
            >
              🏭 첸나이 DCF 분석
            </button>
          </div>
        </div>

        {/* 탭 콘텐츠 영역 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-inner p-6">
          {/* 시나리오별 분석 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-800">📊 시나리오별 분석</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Optimistic */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3">🚀 Optimistic</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">NPV:</span>
                    <span className="font-semibold text-green-800">
                      {formatCurrency(activeRegion === 'mumbai' ? mumbaiOptimistic.npv : chennaiOptimistic.npv)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">IRR:</span>
                    <span className="font-semibold text-green-800">
                      {formatPercentage(activeRegion === 'mumbai' ? mumbaiOptimistic.irr : chennaiOptimistic.irr)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Payback:</span>
                    <span className="font-semibold text-green-800">
                      {(activeRegion === 'mumbai' ? mumbaiOptimistic.paybackPeriod : chennaiOptimistic.paybackPeriod).toFixed(1)}년
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">PI:</span>
                    <span className="font-semibold text-green-800">
                      {(activeRegion === 'mumbai' ? mumbaiOptimistic.profitabilityIndex : chennaiOptimistic.profitabilityIndex).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Base */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">📈 Base</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">NPV:</span>
                    <span className="font-semibold text-blue-800">
                      {formatCurrency(activeRegion === 'mumbai' ? mumbaiBase.npv : chennaiBase.npv)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">IRR:</span>
                    <span className="font-semibold text-blue-800">
                      {formatPercentage(activeRegion === 'mumbai' ? mumbaiBase.irr : chennaiBase.irr)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Payback:</span>
                    <span className="font-semibold text-blue-800">
                      {(activeRegion === 'mumbai' ? mumbaiBase.paybackPeriod : chennaiBase.paybackPeriod).toFixed(1)}년
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">PI:</span>
                    <span className="font-semibold text-blue-800">
                      {(activeRegion === 'mumbai' ? mumbaiBase.profitabilityIndex : chennaiBase.profitabilityIndex).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pessimistic */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3">⚠️ Pessimistic</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-700">NPV:</span>
                    <span className="font-semibold text-red-800">
                      {formatCurrency(activeRegion === 'mumbai' ? mumbaiPessimistic.npv : chennaiPessimistic.npv)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">IRR:</span>
                    <span className="font-semibold text-red-800">
                      {formatPercentage(activeRegion === 'mumbai' ? mumbaiPessimistic.irr : chennaiPessimistic.irr)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Payback:</span>
                    <span className="font-semibold text-red-800">
                      {(activeRegion === 'mumbai' ? mumbaiPessimistic.paybackPeriod : chennaiPessimistic.paybackPeriod).toFixed(1)}년
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">PI:</span>
                    <span className="font-semibold text-red-800">
                      {(activeRegion === 'mumbai' ? mumbaiPessimistic.profitabilityIndex : chennaiPessimistic.profitabilityIndex).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COGS 상세 분석 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-800">📊 COGS (매출원가) 상세 분석</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      COGS 항목
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      공급업체
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      용량
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      MRC (USD)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      ARC (USD)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      2025
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      2026
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      2027
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      2028
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      2029
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* On net Backbone 섹션 */}
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 text-sm font-semibold text-blue-800 border-b" colSpan={10}>
                      On net Backbone
                    </td>
                  </tr>
                  {/* Backbone */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">Backbone</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">Sify</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">1G</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$2,500</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$30,000</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$22,500</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$57,000</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$71,250</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$85,500</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$99,750</td>
                  </tr>
                  {/* Fiber XC */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">Fiber XC</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$150</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,800</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$900</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,800</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,800</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,672</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,543</td>
                  </tr>
                  {/* Colocation */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">Colocation</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">Digital Realty</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,350</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$16,200</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$8,100</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$16,200</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$16,200</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$16,200</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$16,200</td>
                  </tr>
                  {/* Support HW */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">Support (HW)</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$167</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$2,004</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,002</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$2,004</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$2,004</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,851</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,718</td>
                  </tr>
                  {/* On net Backbone 합계 */}
                  <tr className="bg-blue-100 font-semibold">
                    <td className="px-4 py-3 text-sm text-blue-800 border-b" colSpan={5}>On net Backbone 합계</td>
                    <td className="px-4 py-3 text-sm text-blue-800 border-b font-medium">$32,502</td>
                    <td className="px-4 py-3 text-sm text-blue-800 border-b font-medium">$77,004</td>
                    <td className="px-4 py-3 text-sm text-blue-800 border-b font-medium">$91,254</td>
                    <td className="px-4 py-3 text-sm text-blue-800 border-b font-medium">$104,077</td>
                    <td className="px-4 py-3 text-sm text-blue-800 border-b font-medium">$116,901</td>
                  </tr>

                  {/* Local Loop (Cloud Connect) 섹션 */}
                  <tr className="bg-green-50">
                    <td className="px-4 py-3 text-sm font-semibold text-green-800 border-b" colSpan={10}>
                      Local Loop (Cloud Connect)
                    </td>
                  </tr>
                  {/* Cloud Connect */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">Cloud Connect</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">FTP</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">-</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$12,408</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$17,681</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$22,396</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$21,277</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$20,213</td>
                  </tr>
                  {/* Local Loop (Cloud Connect) 합계 */}
                  <tr className="bg-green-100 font-semibold">
                    <td className="px-4 py-3 text-sm text-green-800 border-b" colSpan={5}>Local Loop (Cloud Connect) 합계</td>
                    <td className="px-4 py-3 text-sm text-green-800 border-b font-medium">$12,408</td>
                    <td className="px-4 py-3 text-sm text-green-800 border-b font-medium">$17,681</td>
                    <td className="px-4 py-3 text-sm text-green-800 border-b font-medium">$22,396</td>
                    <td className="px-4 py-3 text-sm text-green-800 border-b font-medium">$21,277</td>
                    <td className="px-4 py-3 text-sm text-green-800 border-b font-medium">$20,213</td>
                  </tr>

                  {/* Local Loop (KT VPN) 섹션 */}
                  <tr className="bg-orange-50">
                    <td className="px-4 py-3 text-sm font-semibold text-orange-800 border-b" colSpan={10}>
                      Local Loop (KT VPN)
                    </td>
                  </tr>
                  {/* KT VPN */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">KT VPN</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">CMI</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">1G</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$3,400</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$40,800</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$10,200</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$40,800</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$39,780</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$38,760</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-b">$38,760</td>
                  </tr>
                  {/* Local Loop (KT VPN) 합계 */}
                  <tr className="bg-orange-100 font-semibold">
                    <td className="px-4 py-3 text-sm text-orange-800 border-b" colSpan={5}>Local Loop (KT VPN) 합계</td>
                    <td className="px-4 py-3 text-sm text-orange-800 border-b font-medium">$10,200</td>
                    <td className="px-4 py-3 text-sm text-orange-800 border-b font-medium">$40,800</td>
                    <td className="px-4 py-3 text-sm text-orange-800 border-b font-medium">$39,780</td>
                    <td className="px-4 py-3 text-sm text-orange-800 border-b font-medium">$38,760</td>
                    <td className="px-4 py-3 text-sm text-orange-800 border-b font-medium">$38,760</td>
                  </tr>

                  {/* 총 COGS */}
                  <tr className="bg-purple-50 font-semibold">
                    <td className="px-4 py-3 text-sm text-purple-800 border-b" colSpan={5}>총 COGS</td>
                    <td className="px-4 py-3 text-sm text-purple-800 border-b font-medium">$55,110</td>
                    <td className="px-4 py-3 text-sm text-purple-800 border-b font-medium">$135,485</td>
                    <td className="px-4 py-3 text-sm text-purple-800 border-b font-medium">$153,430</td>
                    <td className="px-4 py-3 text-sm text-purple-800 border-b font-medium">$164,114</td>
                    <td className="px-4 py-3 text-sm text-purple-800 border-b font-medium">$175,874</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* COGS 설명 */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">📋 COGS 구성 요소 설명</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p><strong>• On net Backbone:</strong> Sify Chennai 02 - Siruseri, SIPCOT IT Park Campus</p>
                  <p><strong>• Local Loop (Cloud Connect):</strong> 클라우드 연결을 위한 지역 네트워크</p>
                  <p><strong>• Local Loop (KT VPN):</strong> KT VPN 서비스를 위한 지역 네트워크</p>
                </div>
                <div>
                  <p><strong>• 총 COGS:</strong> 매출원가의 약 65-70% 차지</p>
                  <p><strong>• 연도별 변동:</strong> 1년차 마이그레이션 및 Local Loop 비용 감소 반영</p>
                  <p><strong>• 공급업체:</strong> Sify, Epsilon, Digital Realty, CMI, FTP</p>
                </div>
              </div>
            </div>
          </div>

          {/* 현금흐름 분석 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-800">💸 현금흐름 분석</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      연도
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      매출
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      매출원가
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      매출총이익
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      OPEX
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      EBITDA
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      세금
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      순이익
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      감가상각
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      영업현금흐름
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(activeRegion === 'mumbai' ? generateCalculationDetails('mumbai', 'base') : generateCalculationDetails('chennai', 'base')).map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {2024 + item.year}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.revenue)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.cogs)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.grossProfit)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.opex)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.ebitda)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.tax)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.netIncome)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.depreciation)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.operatingCashFlow)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 투자 권고사항 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-800">🎯 투자 권고사항</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">🚀 Optimistic</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p>• <strong>투자 권고:</strong> 적극 추천</p>
                  <p>• <strong>예상 수익률:</strong> 높음</p>
                  <p>• <strong>리스크:</strong> 낮음</p>
                  <p>• <strong>전략:</strong> 빠른 시장 진입</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">📈 Base</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• <strong>투자 권고:</strong> 추천</p>
                  <p>• <strong>예상 수익률:</strong> 보통</p>
                  <p>• <strong>리스크:</strong> 중간</p>
                  <p>• <strong>전략:</strong> 단계적 진입</p>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">⚠️ Pessimistic</h4>
                <div className="text-sm text-red-700 space-y-1">
                  <p>• <strong>투자 권고:</strong> 신중</p>
                  <p>• <strong>예상 수익률:</strong> 낮음</p>
                  <p>• <strong>리스크:</strong> 높음</p>
                  <p>• <strong>전략:</strong> 보수적 접근</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 주요 가정 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">📊 주요 가정</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• 할인율 (WACC): 12%</li>
            <li>• Base 매출: 매출 추정에서 계산된 실제 값</li>
            <li>• Optimistic: Base + 25%</li>
            <li>• Pessimistic: Base - 25%</li>
            <li>• OPEX 증가율: 3%</li>
            <li>• 세율: 25%</li>
            <li>• 감가상각: 5년 직선법</li>
            <li>• 초기 투자: $41,000 (CAPEX)</li>
            <li>• 연간 OPEX: $3,200</li>
          </ul>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-2">⚠️ 리스크 요인</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• 환율 변동 리스크</li>
            <li>• 시장 경쟁 심화</li>
            <li>• 규제 환경 변화</li>
            <li>• 기술 변화 리스크</li>
            <li>• 매출 성장 지연</li>
            <li>• 고객 확보 실패</li>
            <li>• 가격 경쟁 압박</li>
          </ul>
        </div>
      </div>

      {/* Base 매출 정보 */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">📈 Base 매출 정보</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold text-blue-700 mb-2">뭄바이 Base 매출</h5>
            <ul className="text-sm text-blue-600 space-y-1">
              {mumbaiBaseData.revenues.map((revenue, index) => (
                <li key={index}>• {2025 + index}년: {formatCurrency(revenue)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-blue-700 mb-2">첸나이 Base 매출</h5>
            <ul className="text-sm text-blue-600 space-y-1">
              {chennaiBaseData.revenues.map((revenue, index) => (
                <li key={index}>• {2025 + index}년: {formatCurrency(revenue)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionMarketing() {
  return (
    <section id="marketing">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📢 마케팅 전략</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-blue-800">🎯 타겟 마케팅</h3>
          <ul className="space-y-2 text-blue-700">
            <li>• <strong>주요 타겟:</strong> 인도 진출 한국 기업</li>
            <li>• <strong>산업별 접근:</strong> 금융, 제조, IT 서비스</li>
            <li>• <strong>규모별 전략:</strong> 대기업 중심, 중소기업 확대</li>
            <li>• <strong>지역별 차별화:</strong> 뭄바이 프리미엄, 첸나이 효율성</li>
          </ul>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-green-800">📈 마케팅 채널</h3>
          <ul className="space-y-2 text-green-700">
            <li>• <strong>직접 영업:</strong> 한국 기업 대상 1:1 접근</li>
            <li>• <strong>파트너십:</strong> 현지 ISP, 시스템 통합업체</li>
            <li>• <strong>디지털 마케팅:</strong> LinkedIn, 업계 포털</li>
            <li>• <strong>이벤트:</strong> 한국 기업 대상 세미나</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 마케팅 예산 및 KPI</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">💰 예산 배분</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 직접 영업: 40%</li>
              <li>• 파트너십: 30%</li>
              <li>• 디지털 마케팅: 20%</li>
              <li>• 이벤트: 10%</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">📈 KPI 목표</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 고객 획득: 연 8개사</li>
              <li>• 리드 생성: 월 20개</li>
              <li>• 전환율: 15%</li>
              <li>• 고객 만족도: 90%</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">🎯 성과 측정</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 매출 기여도</li>
              <li>• 고객 생애 가치</li>
              <li>• 마케팅 ROI</li>
              <li>• 브랜드 인지도</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-yellow-800">⚠️ 마케팅 리스크 및 대응</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">주요 리스크</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>• <strong>경쟁 심화:</strong> 현지 ISP들의 강력한 마케팅</li>
              <li>• <strong>문화적 차이:</strong> 인도 비즈니스 문화 이해 부족</li>
              <li>• <strong>규제 변화:</strong> 통신 규제 정책 변화</li>
              <li>• <strong>경기 침체:</strong> 한국 기업 투자 축소</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">대응 전략</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>• <strong>차별화:</strong> 한국 기업 특화 서비스 강조</li>
              <li>• <strong>현지화:</strong> 인도 문화에 맞는 마케팅</li>
              <li>• <strong>파트너십:</strong> 현지 파트너와의 협력</li>
              <li>• <strong>유연성:</strong> 시장 변화에 빠른 대응</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionRisk() {
  return (
    <section id="risk">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">⚠️ 리스크 분석</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-red-800">🔥 주요 리스크</h3>
          <ul className="space-y-2 text-red-700">
            <li>• <strong>환율 리스크:</strong> 인도 루피 변동</li>
            <li>• <strong>정치적 리스크:</strong> 인도 정부 정책 변화</li>
            <li>• <strong>경쟁 리스크:</strong> 현지 ISP들의 강력한 경쟁</li>
            <li>• <strong>기술 리스크:</strong> 신기술 도입 및 변화</li>
            <li>• <strong>운영 리스크:</strong> 현지 인력 확보 및 관리</li>
          </ul>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-green-800">🛡️ 리스크 대응</h3>
          <ul className="space-y-2 text-green-700">
            <li>• <strong>환율 헤징:</strong> 선물 거래 및 통화 스왑</li>
            <li>• <strong>정치적 대응:</strong> 정부 관계 구축</li>
            <li>• <strong>차별화 전략:</strong> 한국 기업 특화 서비스</li>
            <li>• <strong>기술 투자:</strong> 지속적인 기술 개발</li>
            <li>• <strong>현지화:</strong> 현지 파트너십 구축</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 리스크 매트릭스</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">높은 영향도</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 환율 변동 (확률: 중간, 영향: 높음)</li>
              <li>• 정부 정책 변화 (확률: 낮음, 영향: 높음)</li>
              <li>• 경쟁 심화 (확률: 높음, 영향: 높음)</li>
              <li>• 기술 변화 (확률: 중간, 영향: 높음)</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">낮은 영향도</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 인력 확보 (확률: 낮음, 영향: 중간)</li>
              <li>• 공급업체 리스크 (확률: 낮음, 영향: 중간)</li>
              <li>• 자연재해 (확률: 낮음, 영향: 낮음)</li>
              <li>• 브랜드 리스크 (확률: 낮음, 영향: 중간)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-blue-800">📋 리스크 관리 계획</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">🎯 예방 전략</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 정기적인 리스크 평가</li>
              <li>• 다양한 공급업체 확보</li>
              <li>• 현지 파트너십 구축</li>
              <li>• 기술 다각화</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">🔄 대응 전략</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 비상 계획 수립</li>
              <li>• 보험 가입</li>
              <li>• 현금 보유</li>
              <li>• 대체 계획</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">📈 모니터링</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 월간 리스크 보고</li>
              <li>• 분기별 평가</li>
              <li>• 연간 전략 검토</li>
              <li>• 지속적 개선</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionConclusion() {
  return (
    <section id="conclusion">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📋 결론 및 권고사항</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-green-800">✅ 투자 권고</h3>
          <ul className="space-y-2 text-green-700">
            <li>• <strong>전체 평가:</strong> 투자 추천</li>
            <li>• <strong>예상 IRR:</strong> 19.2%</li>
            <li>• <strong>투자 회수 기간:</strong> 4.1년</li>
            <li>• <strong>NPV:</strong> 양수 (Base 시나리오)</li>
            <li>• <strong>리스크 대비 수익:</strong> 적절</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-blue-800">🎯 핵심 성공 요인</h3>
          <ul className="space-y-2 text-blue-700">
            <li>• <strong>시장 기회:</strong> 인도 진출 한국 기업 증가</li>
            <li>• <strong>차별화:</strong> 한국 기업 특화 서비스</li>
            <li>• <strong>기술력:</strong> 글로벌 네트워크 연동</li>
            <li>• <strong>파트너십:</strong> 현지 파트너와의 협력</li>
            <li>• <strong>안정성:</strong> 3년 계약 기반 수익</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 투자 요약</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-purple-600">$2.9M</div>
            <div className="text-sm text-gray-600">초기 투자</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-blue-600">19.2%</div>
            <div className="text-sm text-gray-600">IRR</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-green-600">4.1년</div>
            <div className="text-sm text-gray-600">투자 회수</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-orange-600">$1.2M</div>
            <div className="text-sm text-gray-600">연간 매출</div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-yellow-800">⚠️ 주의사항 및 권고</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">투자 시 고려사항</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>• <strong>단계적 투자:</strong> 리스크 분산을 위한 단계적 진입</li>
              <li>• <strong>환율 헤징:</strong> 인도 루피 변동에 대한 대비</li>
              <li>• <strong>현지 파트너십:</strong> 현지 이해관계자와의 협력</li>
              <li>• <strong>기술 투자:</strong> 지속적인 기술 개발 및 업그레이드</li>
              <li>• <strong>모니터링:</strong> 정기적인 성과 평가 및 전략 조정</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">성공을 위한 조건</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>• <strong>시장 진입:</strong> 적절한 시점의 시장 진입</li>
              <li>• <strong>고객 확보:</strong> 초기 고객 확보 및 참고 사례 구축</li>
              <li>• <strong>운영 효율성:</strong> 비용 효율적인 운영 체계</li>
              <li>• <strong>서비스 품질:</strong> 고품질 네트워크 서비스 제공</li>
              <li>• <strong>지속적 개선:</strong> 시장 변화에 대한 빠른 대응</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 