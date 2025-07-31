import React, { useState, useEffect } from 'react';
import { getGlobalRevenueParams, calculateRevenue, isInvestmentExecuted, isRevenueExecuted } from './BusinessFeasibilitySections2';
import { getGlobalInvestmentParams, calculateInvestmentCosts } from './BusinessFeasibilitySections2';

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

// NPV 시뮬레이션을 위한 타입 정의
interface NPVParameters {
  discountRate: number;
  taxRate: number;
}

export function BusinessFeasibilitySectionDcf() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  const [showWaccModal, setShowWaccModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('');
  
  // NPV 시뮬레이션 파라미터 상태
  const [npvParams, setNpvParams] = useState<NPVParameters>({
    discountRate: 0.12,
    taxRate: 0.25
  });

  const openWaccModal = (componentKey: string) => {
    setSelectedComponent(componentKey);
    setShowWaccModal(true);
  };

  // 지역 변경 시 파라미터 업데이트 (수익 추정과 투자 비용 연동)
  useEffect(() => {
    // 지역이 변경되면 수익 추정과 투자 비용의 전역 파라미터를 확인
    const revenueParams = getGlobalRevenueParams(activeRegion as 'mumbai' | 'chennai');
    const investmentParams = getGlobalInvestmentParams(activeRegion as 'mumbai' | 'chennai');
    console.log(`${activeRegion} 지역 수익 파라미터:`, revenueParams);
    console.log(`${activeRegion} 지역 투자 비용 파라미터:`, investmentParams);
  }, [activeRegion]);

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

  // 수익 추정과 투자 비용에서 가져온 데이터를 사용한 현금흐름 생성
  const generateSimulationCashFlows = () => {
    // 수익 추정에서 계산된 매출 데이터 가져오기
    const revenueData = calculateRevenue(activeRegion as 'mumbai' | 'chennai');
    const revenues = revenueData.revenues;

    // 투자 비용에서 계산된 비용 데이터 가져오기
    const investmentData = calculateInvestmentCosts(activeRegion as 'mumbai' | 'chennai');
    const totalCapex = investmentData.totalCapex;
    const totalAnnualOpex = investmentData.totalAnnualOpex;
    const depreciationByYear = investmentData.depreciationByYear;

    const cashFlows: number[] = [];
    const costs: number[] = [];
    const profits: number[] = [];
    const taxes: number[] = [];
    const netCashFlows: number[] = [];

    for (let year = 0; year < 5; year++) {
      // 매출은 수익 추정에서 가져온 값 사용
      const revenue = revenues[year];

      // 비용은 투자 비용에서 가져온 값 사용
      const cost = totalAnnualOpex;
      costs.push(cost);

      // 이익 계산
      const profit = revenue - cost;
      profits.push(profit);

      // 세금 계산
      const tax = profit * npvParams.taxRate;
      taxes.push(tax);

      // 순현금흐름 계산 (감가상각 포함)
      const netCashFlow = profit - tax + depreciationByYear[year];
      netCashFlows.push(netCashFlow);
    }

    // 초기 투자 비용을 첫 번째 현금흐름에 반영
    cashFlows.push(-totalCapex);
    cashFlows.push(...netCashFlows);

    return {
      cashFlows,
      revenues,
      costs,
      profits,
      taxes,
      netCashFlows,
      depreciationByYear
    };
  };

  // 시뮬레이션 결과 계산
  const simulationResults = generateSimulationCashFlows();
  const metrics = calculateFinancialMetrics(simulationResults.cashFlows.slice(1), npvParams.discountRate);

  // 파라미터 업데이트 핸들러
  const handleParameterChange = (param: keyof NPVParameters, value: number) => {
    setNpvParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // 파라미터 리셋 핸들러
  const resetToDefaults = () => {
    setNpvParams({
      discountRate: 0.12,
      taxRate: 0.25
    });
  };

  // Base 매출 데이터 (매출 추정에서 계산된 실제 값)
  const getBaseRevenueData = (region: 'mumbai' | 'chennai') => {
    const basePrice = 1160;
    const baseCustomers = region === 'mumbai' ? 3 : 8; // 뭄바이 3명, 첸나이 8명 (영업조직 매칭 기반)
    const baseProduct = 10;
    const capex = 42000; // 투자 비용 분석에서 가져온 값 (감가상각 6년 기준)
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
    
    // 연도별 COGS (새로운 매출 전망 기반)
    const cogsByYear = region === 'mumbai' 
      ? [
          20820,  // 2025: $20,820 (뭄바이 3명 고객 기준)
          43440,  // 2026: $43,440 (뭄바이 6명 고객 기준)
          67740,  // 2027: $67,740 (뭄바이 9명 고객 기준)
          93840,  // 2028: $93,840 (뭄바이 12명 고객 기준)
          122040  // 2029: $122,040 (뭄바이 15명 고객 기준)
        ]
      : [
          55520,  // 2025: $55,520 (첸나이 8명 고객 기준)
          111040, // 2026: $111,040 (첸나이 16명 고객 기준)
          166560, // 2027: $166,560 (첸나이 24명 고객 기준)
          222080, // 2028: $222,080 (첸나이 32명 고객 기준)
          277600  // 2029: $277,600 (첸나이 40명 고객 기준)
        ];
    
    // 연도별 감가상각비 (CAPEX 테이블 기반)
    const depreciationByYear = region === 'mumbai' 
      ? [3500, 7000, 7000, 7000, 7000] // 뭄바이: 2025년 $3,500, 2026-2029년 $7,000
      : [3500, 7000, 7000, 7000, 7000]; // 첸나이: 2025년 $3,500, 2026-2029년 $7,000
    
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
      const depreciation = depreciationByYear[year - 1]; // 실제 감가상각비 사용
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
    
    // 연도별 COGS 계산 (새로운 매출 전망 기반)
    const cogsByYear = region === 'mumbai' 
      ? [
          20820,  // 2025: $20,820 (뭄바이 3명 고객 기준)
          43440,  // 2026: $43,440 (뭄바이 6명 고객 기준)
          67740,  // 2027: $67,740 (뭄바이 9명 고객 기준)
          93840,  // 2028: $93,840 (뭄바이 12명 고객 기준)
          122040  // 2029: $122,040 (뭄바이 15명 고객 기준)
        ]
      : [
          55520,  // 2025: $55,520 (첸나이 8명 고객 기준)
          111040, // 2026: $111,040 (첸나이 16명 고객 기준)
          166560, // 2027: $166,560 (첸나이 24명 고객 기준)
          222080, // 2028: $222,080 (첸나이 32명 고객 기준)
          277600  // 2029: $277,600 (첸나이 40명 고객 기준)
        ];
    
    // 연도별 감가상각비 (CAPEX 테이블 기반)
    const depreciationByYear = region === 'mumbai' 
      ? [3500, 7000, 7000, 7000, 7000] // 뭄바이: 2025년 $3,500, 2026-2029년 $7,000
      : [3500, 7000, 7000, 7000, 7000]; // 첸나이: 2025년 $3,500, 2026-2029년 $7,000
    
    for (let year = 1; year <= 5; year++) {
      const adjustedRevenue = revenues[year - 1] * adjustment;
      const cogs = cogsByYear[year - 1]; // 실제 COGS 데이터 사용
      const grossProfit = adjustedRevenue - cogs;
      const opex = annualOpex * Math.pow(1.03, year);
      const ebitda = grossProfit - opex;
      const tax = ebitda > 0 ? ebitda * 0.25 : 0;
      const netIncome = ebitda - tax;
      const depreciation = depreciationByYear[year - 1]; // 실제 감가상각비 사용
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">💰 DCF 분석 기반 NPV/IRR 분석</h2>
      
      {/* 지역 선택 탭 */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl shadow-lg p-6 mb-8">
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
              🏙️ 뭄바이
            </button>
            <button
              onClick={() => setActiveRegion('chennai')}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                activeRegion === 'chennai'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 bg-gray-100'
              }`}
            >
              🏭 첸나이
            </button>
          </div>
        </div>

        {/* NPV 시뮬레이션 폼 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">🎯 NPV 시뮬레이션</h3>
            <div className="flex space-x-2">
              <button
                onClick={resetToDefaults}
                className="text-gray-600 hover:text-gray-800 text-sm underline"
              >
                기본값으로 리셋
              </button>
              <button
                onClick={() => {
                  // 단계별 실행 여부 확인
                  const investmentExecuted = isInvestmentExecuted(activeRegion as 'mumbai' | 'chennai');
                  const revenueExecuted = isRevenueExecuted(activeRegion as 'mumbai' | 'chennai');
                  
                  if (!investmentExecuted || !revenueExecuted) {
                    let warningMessage = '⚠️ 다음 단계들이 아직 실행되지 않았습니다:\n\n';
                    
                    if (!investmentExecuted) {
                      warningMessage += '❌ 투자 비용 분석 실행 필요\n';
                    }
                    if (!revenueExecuted) {
                      warningMessage += '❌ 수익 추정 실행 필요\n';
                    }
                    
                    warningMessage += '\n정확한 NPV 계산을 위해 모든 단계를 순서대로 실행해주세요.';
                    
                    alert(warningMessage);
                    return;
                  }
                  
                  // 최종 NPV 계산 실행
                  const finalResults = generateSimulationCashFlows();
                  const finalMetrics = calculateFinancialMetrics(finalResults.cashFlows.slice(1), npvParams.discountRate);
                  alert(`최종 NPV 계산이 완료되었습니다!\n\nNPV: ${formatCurrency(finalMetrics.npv)}\nIRR: ${formatPercentage(finalMetrics.irr)}\n회수기간: ${finalMetrics.paybackPeriod}년\n수익성지수: ${finalMetrics.profitabilityIndex.toFixed(2)}`);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                최종 계산 실행
              </button>
            </div>
          </div>
          
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>시뮬레이션 흐름 (순서 필수):</strong><br/>
              1️⃣ <strong>투자 비용 분석</strong>에서 CAPEX/OPEX 입력 후 "실행" 버튼 클릭<br/>
              2️⃣ <strong>수익 추정</strong>에서 고객수/단가 입력 후 "실행" 버튼 클릭<br/>
              3️⃣ <strong>이곳에서</strong> 할인율/세율 조정 후 "최종 계산 실행" 버튼 클릭<br/>
              → 모든 단계가 순서대로 실행되어야 정확한 NPV, IRR, 회수기간, 수익성지수가 계산됩니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* 할인율 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                할인율 (%)
              </label>
              <input
                type="number"
                value={(npvParams.discountRate * 100).toFixed(1)}
                onChange={(e) => handleParameterChange('discountRate', Number(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            {/* 세율 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                세율 (%)
              </label>
              <input
                type="number"
                value={(npvParams.taxRate * 100).toFixed(1)}
                onChange={(e) => handleParameterChange('taxRate', Number(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* 실시간 NPV 결과 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(metrics.npv)}
              </div>
              <div className="text-sm text-gray-600">NPV</div>
              <div className="text-xs text-gray-500">
                {metrics.npv >= 0 ? '✅ 투자 가치 있음' : '❌ 투자 가치 없음'}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatPercentage(metrics.irr)}
              </div>
              <div className="text-sm text-gray-600">IRR</div>
              <div className="text-xs text-gray-500">
                {metrics.irr >= npvParams.discountRate ? '✅ 기준 초과' : '❌ 기준 미달'}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {metrics.paybackPeriod}년
              </div>
              <div className="text-sm text-gray-600">회수 기간</div>
              <div className="text-xs text-gray-500">
                {metrics.paybackPeriod <= 5 ? '✅ 적정 수준' : '⚠️ 장기 투자'}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {metrics.profitabilityIndex.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">수익성 지수</div>
              <div className="text-xs text-gray-500">
                {metrics.profitabilityIndex >= 1 ? '✅ 수익성 양호' : '❌ 수익성 부족'}
              </div>
            </div>
          </div>
        </div>

        {/* 현금흐름 상세 테이블 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800">📊 연도별 현금흐름 상세</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연도</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매출</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">비용</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이익</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">세금</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">감가상각</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">순현금흐름</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {simulationResults.revenues.map((revenue, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {2025 + index}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(simulationResults.costs[index])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(simulationResults.profits[index])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(simulationResults.taxes[index])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(simulationResults.depreciationByYear[index])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(simulationResults.netCashFlows[index])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <li>• <strong>지역별 차별화:</strong> 뭄바이 우선 투자, 첸나이 단계적 진입</li>
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
              <li>• 고객 획득: 연 8개사 (뭄바이 5개, 첸나이 3개)</li>
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
              <li>• <strong>지역별 차이:</strong> 뭄바이 vs 첸나이 시장 특성 차이</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">대응 전략</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>• <strong>차별화:</strong> 한국 기업 특화 서비스 강조</li>
              <li>• <strong>현지화:</strong> 인도 문화에 맞는 마케팅</li>
              <li>• <strong>파트너십:</strong> 현지 파트너와의 협력</li>
              <li>• <strong>유연성:</strong> 시장 변화에 빠른 대응</li>
              <li>• <strong>단계적 진입:</strong> 뭄바이 성공 후 첸나이 확장</li>
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
            <li>• <strong>지역별 리스크:</strong> 뭄바이(높은 비용), 첸나이(낮은 수익성)</li>
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
            <li>• <strong>단계적 진입:</strong> 뭄바이 우선, 첸나이 후속 투자</li>
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
              <li>• 지역별 수익성 차이 (확률: 높음, 영향: 높음)</li>
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
              <li>• 지역별 차별화 전략</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">🔄 대응 전략</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 비상 계획 수립</li>
              <li>• 보험 가입</li>
              <li>• 현금 보유</li>
              <li>• 대체 계획</li>
              <li>• 지역별 투자 조정</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">📈 모니터링</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 월간 리스크 보고</li>
              <li>• 분기별 평가</li>
              <li>• 연간 전략 검토</li>
              <li>• 지속적 개선</li>
              <li>• 지역별 성과 비교</li>
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
            <li>• <strong>전체 평가:</strong> 뭄바이 우선 투자, 첸나이 단계적 진입</li>
            <li>• <strong>뭄바이 IRR:</strong> 19.2% (투자 추천)</li>
            <li>• <strong>첸나이 IRR:</strong> 12.8% (신중 검토)</li>
            <li>• <strong>투자 회수 기간:</strong> 뭄바이 4.1년, 첸나이 5.2년</li>
            <li>• <strong>리스크 대비 수익:</strong> 뭄바이 적절, 첸나이 보수적</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-blue-800">🎯 핵심 성공 요인</h3>
          <ul className="space-y-2 text-blue-700">
            <li>• <strong>시장 기회:</strong> 인도 진출 한국 기업 증가</li>
            <li>• <strong>차별화:</strong> 한국 기업 특화 서비스</li>
            <li>• <strong>기술력:</strong> 글로벌 네트워크 연동</li>
            <li>• <strong>파트너십:</strong> 현지 파트너와의 협력</li>
            <li>• <strong>단계적 진입:</strong> 뭄바이 성공 후 첸나이 확장</li>
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
            <div className="text-2xl font-bold text-blue-600">16.0%</div>
            <div className="text-sm text-gray-600">평균 IRR</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-green-600">4.7년</div>
            <div className="text-sm text-gray-600">평균 투자 회수</div>
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
              <li>• <strong>단계적 투자:</strong> 뭄바이 우선, 첸나이 후속 투자</li>
              <li>• <strong>환율 헤징:</strong> 인도 루피 변동에 대한 대비</li>
              <li>• <strong>현지 파트너십:</strong> 현지 이해관계자와의 협력</li>
              <li>• <strong>기술 투자:</strong> 지속적인 기술 개발 및 업그레이드</li>
              <li>• <strong>모니터링:</strong> 정기적인 성과 평가 및 전략 조정</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">성공을 위한 조건</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>• <strong>시장 진입:</strong> 뭄바이 우선 진입, 첸나이 단계적 확장</li>
              <li>• <strong>고객 확보:</strong> 초기 고객 확보 및 참고 사례 구축</li>
              <li>• <strong>운영 효율성:</strong> 비용 효율적인 운영 체계</li>
              <li>• <strong>서비스 품질:</strong> 고품질 네트워크 서비스 제공</li>
              <li>• <strong>지속적 개선:</strong> 시장 변화에 대한 빠른 대응</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 지역별 특별 권고사항 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-bold mb-4 text-green-800">🏙️ 뭄바이 투자 권고</h3>
          <ul className="space-y-2 text-green-700">
            <li>• <strong>투자 우선순위:</strong> 1차 투자 대상</li>
            <li>• <strong>예상 수익률:</strong> 높음 (IRR 19.2%)</li>
            <li>• <strong>투자 회수:</strong> 4.1년</li>
            <li>• <strong>시장 특성:</strong> 금융 중심, 높은 구매력</li>
            <li>• <strong>전략:</strong> 빠른 시장 진입 및 확장</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <h3 className="text-lg font-bold mb-4 text-orange-800">🏭 첸나이 투자 권고</h3>
          <ul className="space-y-2 text-orange-700">
            <li>• <strong>투자 우선순위:</strong> 2차 투자 대상</li>
            <li>• <strong>예상 수익률:</strong> 보통 (IRR 12.8%)</li>
            <li>• <strong>투자 회수:</strong> 5.2년</li>
            <li>• <strong>시장 특성:</strong> 제조 중심, 보수적 접근</li>
            <li>• <strong>전략:</strong> 뭄바이 성공 후 단계적 진입</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 