import React, { useState, useEffect } from 'react';
import { getGlobalRevenueParams, calculateRevenue, isInvestmentExecuted, isRevenueExecuted, updateGlobalRevenueParams } from './BusinessFeasibilitySections2';
import { getGlobalInvestmentParams, calculateInvestmentCosts, updateGlobalInvestmentParams } from './BusinessFeasibilitySections2';

// 공통 기본 설정
const COMMON_CONFIG = {
  basePrice: 1160,
  priceDeclineRate: 0.05,
  mbpsPerCustomer: 10,
  discountRate: 0.12,
  taxRate: 0.25,
  depreciationYears: 6,
  backboneDeviceCapex: 40000,
  dcnOdfCapex: 2000,
  backboneMaintenanceOpex: 1600
};

// 지역별 기본 설정
const REGION_CONFIGS = {
  mumbai: {
    baseCustomers: 3,
    customersByYear: [3, 5, 9, 14, 24],
    cogsByYear: [20820, 43440, 67740, 93840, 122040],
    depreciationByYear: [3500, 7000, 7000, 7000, 7000]
  },
  chennai: {
    baseCustomers: 5,
    customersByYear: [5, 8, 16, 32, 77],
    cogsByYear: [55520, 111040, 166560, 222080, 277600],
    depreciationByYear: [3500, 7000, 7000, 7000, 7000]
  }
};

// 통합된 계산 함수들
const calculateUnifiedRevenue = (region: 'mumbai' | 'chennai', customParams?: {
  basePrice?: number;
  priceDeclineRate?: number;
  customersByYear?: number[];
}) => {
  // 입력값 검증
  if (!region || !['mumbai', 'chennai'].includes(region)) {
    throw new Error('지역은 mumbai 또는 chennai여야 합니다');
  }

  const basePrice = customParams?.basePrice ?? COMMON_CONFIG.basePrice;
  const priceDeclineRate = customParams?.priceDeclineRate ?? COMMON_CONFIG.priceDeclineRate;
  const customersByYear = customParams?.customersByYear ?? REGION_CONFIGS[region].customersByYear;

  // 파라미터 검증
  if (basePrice <= 0) {
    throw new Error('기본 단가는 0보다 커야 합니다');
  }
  if (priceDeclineRate < 0 || priceDeclineRate > 1) {
    throw new Error('가격 하락률은 0~100% 사이여야 합니다');
  }
  if (!customersByYear || customersByYear.length !== 5) {
    throw new Error('고객수 데이터는 5년치여야 합니다');
  }
  if (customersByYear.some(c => c < 0)) {
    throw new Error('고객수는 음수가 될 수 없습니다');
  }
  
  const revenues: number[] = [];
  const customers: number[] = [];
  const salesUnits: number[] = [];
  const prices: number[] = [];

  for (let year = 0; year < 5; year++) {
    const customerCount = customersByYear[year];
    const price = basePrice * Math.pow(1 - priceDeclineRate, year);
    const salesUnit = customerCount * COMMON_CONFIG.mbpsPerCustomer;
    const revenue = salesUnit * price;

    customers.push(customerCount);
    salesUnits.push(salesUnit);
    prices.push(price);
    revenues.push(revenue);
  }

  // 결과 검증
  if (revenues.some(r => r < 0)) {
    console.warn('⚠️ 일부 매출이 음수입니다. 파라미터를 확인해주세요.');
  }
  if (revenues.some(r => r > 1000000)) {
    console.warn('⚠️ 일부 매출이 비정상적으로 큽니다. 파라미터를 확인해주세요.');
  }

  return { revenues, customers, salesUnits, prices };
};

const calculateUnifiedInvestmentCosts = (customParams?: {
  backboneDeviceCapex?: number;
  dcnOdfCapex?: number;
  backboneMaintenanceOpex?: number;
  depreciationYears?: number;
}) => {
  const backboneDeviceCapex = customParams?.backboneDeviceCapex ?? COMMON_CONFIG.backboneDeviceCapex;
  const dcnOdfCapex = customParams?.dcnOdfCapex ?? COMMON_CONFIG.dcnOdfCapex;
  const backboneMaintenanceOpex = customParams?.backboneMaintenanceOpex ?? COMMON_CONFIG.backboneMaintenanceOpex;
  const depreciationYears = customParams?.depreciationYears ?? COMMON_CONFIG.depreciationYears;
  
  // 파라미터 검증
  if (backboneDeviceCapex < 0) {
    throw new Error('Backbone Device CAPEX는 음수가 될 수 없습니다');
  }
  if (dcnOdfCapex < 0) {
    throw new Error('DCN/ODF CAPEX는 음수가 될 수 없습니다');
  }
  if (backboneMaintenanceOpex < 0) {
    throw new Error('연간 OPEX는 음수가 될 수 없습니다');
  }
  if (depreciationYears <= 0) {
    throw new Error('감가상각 연수는 0보다 커야 합니다');
  }
  
  const totalCapex = backboneDeviceCapex + dcnOdfCapex;
  const totalAnnualOpex = backboneMaintenanceOpex;
  
  // 감가상각 계산 (직선법)
  const annualDepreciation = totalCapex / depreciationYears;
  
  // 연도별 감가상각
  const depreciationByYear = [
    annualDepreciation, // 2025년
    annualDepreciation, // 2026년
    annualDepreciation, // 2027년
    annualDepreciation, // 2028년
    annualDepreciation  // 2029년
  ];
  
  // 결과 검증
  if (totalCapex <= 0) {
    console.warn('⚠️ 총 CAPEX가 0 이하입니다. 투자 비용을 확인해주세요.');
  }
  if (annualDepreciation <= 0) {
    console.warn('⚠️ 연간 감가상각이 0 이하입니다. 감가상각 연수를 확인해주세요.');
  }
  
  return {
    totalCapex,
    totalAnnualOpex,
    annualDepreciation,
    depreciationByYear
  };
};

const calculateUnifiedCashFlows = (
  region: 'mumbai' | 'chennai',
  revenueParams?: {
    basePrice?: number;
    priceDeclineRate?: number;
    customersByYear?: number[];
  },
  investmentParams?: {
    backboneDeviceCapex?: number;
    dcnOdfCapex?: number;
    backboneMaintenanceOpex?: number;
    depreciationYears?: number;
  },
  npvParams?: {
    discountRate?: number;
    taxRate?: number;
  }
) => {
  // 입력값 검증
  if (!region || !['mumbai', 'chennai'].includes(region)) {
    throw new Error('지역은 mumbai 또는 chennai여야 합니다');
  }

  // 수익 계산
  const revenueData = calculateUnifiedRevenue(region, revenueParams);
  const revenues = revenueData.revenues;

  // 투자 비용 계산
  const investmentData = calculateUnifiedInvestmentCosts(investmentParams);
  const totalCapex = investmentData.totalCapex;
  const totalAnnualOpex = investmentData.totalAnnualOpex;
  const depreciationByYear = investmentData.depreciationByYear;

  // NPV 파라미터
  const discountRate = npvParams?.discountRate ?? COMMON_CONFIG.discountRate;
  const taxRate = npvParams?.taxRate ?? COMMON_CONFIG.taxRate;

  // NPV 파라미터 검증
  if (discountRate < 0 || discountRate > 1) {
    throw new Error('할인율은 0~100% 사이여야 합니다');
  }
  if (taxRate < 0 || taxRate > 1) {
    throw new Error('세율은 0~100% 사이여야 합니다');
  }

  const cashFlows: number[] = [];
  const costs: number[] = [];
  const profits: number[] = [];
  const taxes: number[] = [];
  const netCashFlows: number[] = [];

  for (let year = 0; year < 5; year++) {
    const revenue = revenues[year];
    const cost = totalAnnualOpex;
    costs.push(cost);

    const profit = revenue - cost;
    profits.push(profit);

    const tax = profit * taxRate;
    taxes.push(tax);

    const netCashFlow = profit - tax + depreciationByYear[year];
    netCashFlows.push(netCashFlow);
  }

  // 초기 투자 비용을 첫 번째 현금흐름에 반영
  cashFlows.push(-totalCapex);
  cashFlows.push(...netCashFlows);

  // 결과 검증
  if (profits.some(p => p < -1000000)) {
    console.warn('⚠️ 일부 연도의 손실이 비정상적으로 큽니다. 비용 구조를 확인해주세요.');
  }
  if (taxes.some(t => t < 0)) {
    console.warn('⚠️ 일부 연도의 세금이 음수입니다. 이익 구조를 확인해주세요.');
  }
  if (netCashFlows.some(n => Math.abs(n) > 1000000)) {
    console.warn('⚠️ 일부 연도의 순현금흐름이 비정상적으로 큽니다. 계산을 확인해주세요.');
  }

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
    discountRate: COMMON_CONFIG.discountRate,
    taxRate: COMMON_CONFIG.taxRate
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
    // ✅ 수정된 NPV 계산 (year 사용)
    const npv = cashFlows.reduce((sum, cf, year) => {
      return sum + cf / Math.pow(1 + discountRate, year);
    }, 0);

    // ✅ 개선된 IRR 계산 (Newton-Raphson 방법)
    const calculateIRR = (cashFlows: number[]) => {
      let irr = 0.1; // 초기 추정값
      const maxIterations = 100;
      const tolerance = 0.0001; // 허용 오차

      for (let i = 0; i < maxIterations; i++) {
        let npv = 0;
        let derivative = 0;

        // NPV와 미분값 계산
        for (let year = 0; year < cashFlows.length; year++) {
          const factor = Math.pow(1 + irr, year);
          npv += cashFlows[year] / factor;
          if (year > 0) {
            derivative -= year * cashFlows[year] / (factor * (1 + irr));
          }
        }

        // Newton-Raphson 업데이트
        const newIrr = irr - npv / derivative;
        
        // 수렴 확인
        if (Math.abs(newIrr - irr) < tolerance) {
          return newIrr;
        }
        
        irr = newIrr;
        
        // 유효한 범위 내로 제한
        if (irr < -0.99 || irr > 10) {
          return 0.1; // 기본값 반환
        }
      }
      
      return irr;
    };

    const irr = calculateIRR(cashFlows);

    // Payback Period 계산 - 기존과 동일
    let cumulativeCf = 0;
    let paybackPeriod = 0;
    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCf += cashFlows[i];
      if (cumulativeCf >= 0) {
        paybackPeriod = i + 1;
        break;
      }
    }

    // Profitability Index - 기존과 동일
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
    return calculateUnifiedCashFlows(
      activeRegion as 'mumbai' | 'chennai',
      undefined, // 기본 수익 파라미터 사용
      undefined, // 기본 투자 비용 파라미터 사용
      {
        discountRate: npvParams.discountRate,
        taxRate: npvParams.taxRate
      }
    );
  };

  // 시뮬레이션 결과 계산
  const simulationResults = generateSimulationCashFlows();
  const metrics = calculateFinancialMetrics(simulationResults.cashFlows, npvParams.discountRate);

  // 검증 로직 추가
  validateCalculationConsistency(activeRegion as 'mumbai' | 'chennai');
  validateFinancialMetrics(metrics);

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
      discountRate: COMMON_CONFIG.discountRate,
      taxRate: COMMON_CONFIG.taxRate
    });
    
    // 전역 상태도 13.Simulation과 동일한 기본값으로 리셋
    updateGlobalInvestmentParams(activeRegion as 'mumbai' | 'chennai', {
      backboneDeviceCapex: COMMON_CONFIG.backboneDeviceCapex,
      dcnOdfCapex: COMMON_CONFIG.dcnOdfCapex,
      depreciationYears: COMMON_CONFIG.depreciationYears,
      backboneMaintenanceOpex: COMMON_CONFIG.backboneMaintenanceOpex
    });
    
    updateGlobalRevenueParams(activeRegion as 'mumbai' | 'chennai', {
      baseCustomers: REGION_CONFIGS[activeRegion as 'mumbai' | 'chennai'].baseCustomers,
      customersByYear: REGION_CONFIGS[activeRegion as 'mumbai' | 'chennai'].customersByYear,
      basePrice: COMMON_CONFIG.basePrice,
      priceDeclineRate: COMMON_CONFIG.priceDeclineRate,
      mbpsPerCustomer: COMMON_CONFIG.mbpsPerCustomer
    });
  };

  // Base 매출 데이터 (매출 추정에서 계산된 실제 값)
  const getBaseRevenueData = (region: 'mumbai' | 'chennai') => {
    const revenueData = calculateUnifiedRevenue(region);
    const investmentData = calculateUnifiedInvestmentCosts();
    
    return { 
      revenues: revenueData.revenues, 
      capex: investmentData.totalCapex, 
      annualOpex: investmentData.totalAnnualOpex 
    };
  };

  const generateCashFlows = (region: 'mumbai' | 'chennai', scenario: 'base' | 'optimistic' | 'pessimistic' = 'base') => {
    // 시나리오별 매출 조정 비율
    const revenueAdjustments = {
      optimistic: 1.25, // +25%
      base: 1.0,        // Base
      pessimistic: 0.75  // -25%
    };
    
    const adjustment = revenueAdjustments[scenario];
    const cashFlows = calculateUnifiedCashFlows(region);
    
    // 시나리오별로 매출 조정
    const adjustedCashFlows = [cashFlows.cashFlows[0]]; // 초기 투자 비용
    for (let i = 1; i < cashFlows.cashFlows.length; i++) {
      adjustedCashFlows.push(cashFlows.cashFlows[i] * adjustment);
    }
    
    return adjustedCashFlows;
  };

  const generateCalculationDetails = (region: 'mumbai' | 'chennai', scenario: 'base' | 'optimistic' | 'pessimistic' = 'base') => {
    const cashFlows = calculateUnifiedCashFlows(region);
    
    // 시나리오별 매출 조정 비율
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
    
    for (let year = 1; year <= 5; year++) {
      const adjustedRevenue = cashFlows.revenues[year - 1] * adjustment;
      const cogs = REGION_CONFIGS[region].cogsByYear[year - 1];
      const grossProfit = adjustedRevenue - cogs;
      const opex = cashFlows.costs[year - 1] * Math.pow(1.03, year);
      const ebitda = grossProfit - opex;
      const tax = ebitda > 0 ? ebitda * 0.25 : 0;
      const netIncome = ebitda - tax;
      const depreciation = cashFlows.depreciationByYear[year - 1];
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
    const discountRate = COMMON_CONFIG.discountRate; // 12% WACC
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
                  const finalMetrics = calculateFinancialMetrics(finalResults.cashFlows, npvParams.discountRate);
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">항목</th>
                  {simulationResults.revenues.map((_, index) => (
                    <th key={index} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {2025 + index}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">매출</td>
                  {simulationResults.revenues.map((revenue, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {formatCurrency(revenue)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">비용</td>
                  {simulationResults.costs.map((cost, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {formatCurrency(cost)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">이익</td>
                  {simulationResults.profits.map((profit, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {formatCurrency(profit)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">세금</td>
                  {simulationResults.taxes.map((tax, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {formatCurrency(tax)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">감가상각</td>
                  {simulationResults.depreciationByYear.map((depr, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {formatCurrency(depr)}
                    </td>
                  ))}
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">순현금흐름</td>
                  {simulationResults.netCashFlows.map((net, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-center">
                      {formatCurrency(net)}
                    </td>
                  ))}
                </tr>
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
              <li>• 고객 획득: 연 {REGION_CONFIGS.mumbai.baseCustomers + REGION_CONFIGS.chennai.baseCustomers}개사 (뭄바이 {REGION_CONFIGS.mumbai.baseCustomers}개, 첸나이 {REGION_CONFIGS.chennai.baseCustomers}개)</li>
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
            <li>• <strong>기본 단가:</strong> {formatCurrency(COMMON_CONFIG.basePrice)}/Mbps</li>
            <li>• <strong>가격 하락률:</strong> {formatPercentage(COMMON_CONFIG.priceDeclineRate)}</li>
            <li>• <strong>할인율:</strong> {formatPercentage(COMMON_CONFIG.discountRate)}</li>
            <li>• <strong>세율:</strong> {formatPercentage(COMMON_CONFIG.taxRate)}</li>
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
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(COMMON_CONFIG.backboneDeviceCapex + COMMON_CONFIG.dcnOdfCapex)}
            </div>
            <div className="text-sm text-gray-600">초기 투자</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatPercentage(COMMON_CONFIG.discountRate)}
            </div>
            <div className="text-sm text-gray-600">할인율</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-green-600">
              {COMMON_CONFIG.depreciationYears}년
            </div>
            <div className="text-sm text-gray-600">감가상각 연수</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(COMMON_CONFIG.backboneMaintenanceOpex)}
            </div>
            <div className="text-sm text-gray-600">연간 OPEX</div>
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
            <li>• <strong>기본 고객 수:</strong> {REGION_CONFIGS.mumbai.baseCustomers}명</li>
            <li>• <strong>고객 증가 패턴:</strong> {REGION_CONFIGS.mumbai.customersByYear.join(' → ')}명</li>
            <li>• <strong>시장 특성:</strong> 금융 중심, 높은 구매력</li>
            <li>• <strong>전략:</strong> 빠른 시장 진입 및 확장</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <h3 className="text-lg font-bold mb-4 text-orange-800">🏭 첸나이 투자 권고</h3>
          <ul className="space-y-2 text-orange-700">
            <li>• <strong>투자 우선순위:</strong> 2차 투자 대상</li>
            <li>• <strong>기본 고객 수:</strong> {REGION_CONFIGS.chennai.baseCustomers}명</li>
            <li>• <strong>고객 증가 패턴:</strong> {REGION_CONFIGS.chennai.customersByYear.join(' → ')}명</li>
            <li>• <strong>시장 특성:</strong> 제조 중심, 보수적 접근</li>
            <li>• <strong>전략:</strong> 뭄바이 성공 후 단계적 진입</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 

export function BusinessFeasibilitySectionSimulation() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  
  // Simulation 전용 독립적인 파라미터 상태
  const [simulationInvestmentParams, setSimulationInvestmentParams] = useState({
    backboneDeviceCapex: COMMON_CONFIG.backboneDeviceCapex,
    dcnOdfCapex: COMMON_CONFIG.dcnOdfCapex,
    depreciationYears: COMMON_CONFIG.depreciationYears,
    backboneMaintenanceOpex: COMMON_CONFIG.backboneMaintenanceOpex
  });

  const [simulationRevenueParams, setSimulationRevenueParams] = useState({
    baseCustomers: 3,
    customersByYear: [3, 5, 9, 14, 24], // 연도별 고객수 (정수)
    basePrice: COMMON_CONFIG.basePrice,
    priceDeclineRate: COMMON_CONFIG.priceDeclineRate,
    mbpsPerCustomer: COMMON_CONFIG.mbpsPerCustomer
  });

  const [simulationNpvParams, setSimulationNpvParams] = useState({
    discountRate: COMMON_CONFIG.discountRate,
    taxRate: COMMON_CONFIG.taxRate
  });

  // 지역 변경 시 파라미터 업데이트
  useEffect(() => {
    if (activeRegion === 'mumbai') {
      setSimulationRevenueParams({
        baseCustomers: REGION_CONFIGS.mumbai.baseCustomers,
        customersByYear: REGION_CONFIGS.mumbai.customersByYear,
        basePrice: COMMON_CONFIG.basePrice,
        priceDeclineRate: COMMON_CONFIG.priceDeclineRate,
        mbpsPerCustomer: COMMON_CONFIG.mbpsPerCustomer
      });
    } else {
      setSimulationRevenueParams({
        baseCustomers: REGION_CONFIGS.chennai.baseCustomers,
        customersByYear: REGION_CONFIGS.chennai.customersByYear,
        basePrice: COMMON_CONFIG.basePrice,
        priceDeclineRate: COMMON_CONFIG.priceDeclineRate,
        mbpsPerCustomer: COMMON_CONFIG.mbpsPerCustomer
      });
    }
  }, [activeRegion]);

  // 기존과 동일한 투자 비용 계산 함수
  const calculateSimulationInvestmentCosts = () => {
    return calculateUnifiedInvestmentCosts({
      backboneDeviceCapex: simulationInvestmentParams.backboneDeviceCapex,
      dcnOdfCapex: simulationInvestmentParams.dcnOdfCapex,
      backboneMaintenanceOpex: simulationInvestmentParams.backboneMaintenanceOpex,
      depreciationYears: simulationInvestmentParams.depreciationYears
    });
  };

  // 기존과 동일한 수익 계산 함수
  const calculateSimulationRevenue = () => {
    return calculateUnifiedRevenue(activeRegion as 'mumbai' | 'chennai', {
      basePrice: simulationRevenueParams.basePrice,
      priceDeclineRate: simulationRevenueParams.priceDeclineRate,
      customersByYear: simulationRevenueParams.customersByYear
    });
  };

  // 기존과 동일한 DCF 계산 함수
  const calculateFinancialMetrics = (cashFlows: number[], discountRate: number) => {
    // ✅ 수정된 NPV 계산 (year 사용)
    const npv = cashFlows.reduce((sum, cf, year) => {
      return sum + cf / Math.pow(1 + discountRate, year);
    }, 0);

    // ✅ 개선된 IRR 계산 (Newton-Raphson 방법)
    const calculateIRR = (cashFlows: number[]) => {
      let irr = 0.1; // 초기 추정값
      const maxIterations = 100;
      const tolerance = 0.0001; // 허용 오차

      for (let i = 0; i < maxIterations; i++) {
        let npv = 0;
        let derivative = 0;

        // NPV와 미분값 계산
        for (let year = 0; year < cashFlows.length; year++) {
          const factor = Math.pow(1 + irr, year);
          npv += cashFlows[year] / factor;
          if (year > 0) {
            derivative -= year * cashFlows[year] / (factor * (1 + irr));
          }
        }

        // Newton-Raphson 업데이트
        const newIrr = irr - npv / derivative;
        
        // 수렴 확인
        if (Math.abs(newIrr - irr) < tolerance) {
          return newIrr;
        }
        
        irr = newIrr;
        
        // 유효한 범위 내로 제한
        if (irr < -0.99 || irr > 10) {
          return 0.1; // 기본값 반환
        }
      }
      
      return irr;
    };

    const irr = calculateIRR(cashFlows);

    // Payback Period 계산 - 기존과 동일
    let cumulativeCf = 0;
    let paybackPeriod = 0;
    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCf += cashFlows[i];
      if (cumulativeCf >= 0) {
        paybackPeriod = i + 1;
        break;
      }
    }

    // Profitability Index - 기존과 동일
    const profitabilityIndex = npv / Math.abs(cashFlows[0]);

    return {
      npv,
      irr,
      paybackPeriod,
      profitabilityIndex
    };
  };

  // 기존과 동일한 현금흐름 생성 함수
  const generateSimulationCashFlows = () => {
    return calculateUnifiedCashFlows(
      activeRegion as 'mumbai' | 'chennai',
      undefined, // 기본 수익 파라미터 사용
      undefined, // 기본 투자 비용 파라미터 사용
      {
        discountRate: simulationNpvParams.discountRate,
        taxRate: simulationNpvParams.taxRate
      }
    );
  };

  // 시뮬레이션 결과 계산
  const simulationResults = generateSimulationCashFlows();
  
  // ✅ 수정: 전체 현금흐름으로 NPV와 IRR 계산
  const npvMetrics = calculateFinancialMetrics(simulationResults.cashFlows, simulationNpvParams.discountRate);
  
  // 검증 로직 추가
  validateCalculationConsistency(activeRegion as 'mumbai' | 'chennai');
  validateFinancialMetrics(npvMetrics);
  
  // 회수기간 계산 (전체 현금흐름 포함)
  const calculatePaybackPeriod = (cashFlows: number[]) => {
    let cumulativeCf = 0;
    let paybackPeriod = 0;
    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCf += cashFlows[i];
      if (cumulativeCf >= 0) {
        paybackPeriod = i + 1;
        break;
      }
    }
    return paybackPeriod;
  };
  
  const paybackPeriod = calculatePaybackPeriod(simulationResults.cashFlows);
  
  // 최종 메트릭스 조합
  const metrics = {
    npv: npvMetrics.npv,
    irr: npvMetrics.irr,
    paybackPeriod: paybackPeriod,
    profitabilityIndex: npvMetrics.profitabilityIndex
  };

  // 투자 비용 파라미터 업데이트 핸들러
  const handleInvestmentParameterChange = (param: keyof typeof simulationInvestmentParams, value: number) => {
    setSimulationInvestmentParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // 수익 파라미터 업데이트 핸들러
  const handleRevenueParameterChange = (param: keyof typeof simulationRevenueParams, value: number) => {
    setSimulationRevenueParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // NPV 파라미터 업데이트 핸들러
  const handleNpvParameterChange = (param: keyof typeof simulationNpvParams, value: number) => {
    setSimulationNpvParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // 기본값 리셋 핸들러
  const resetToDefaults = () => {
    setSimulationInvestmentParams({
      backboneDeviceCapex: COMMON_CONFIG.backboneDeviceCapex,
      dcnOdfCapex: COMMON_CONFIG.dcnOdfCapex,
      depreciationYears: COMMON_CONFIG.depreciationYears,
      backboneMaintenanceOpex: COMMON_CONFIG.backboneMaintenanceOpex
    });
    setSimulationRevenueParams({
      baseCustomers: REGION_CONFIGS[activeRegion as 'mumbai' | 'chennai'].baseCustomers,
      customersByYear: REGION_CONFIGS[activeRegion as 'mumbai' | 'chennai'].customersByYear,
      basePrice: COMMON_CONFIG.basePrice,
      priceDeclineRate: COMMON_CONFIG.priceDeclineRate,
      mbpsPerCustomer: COMMON_CONFIG.mbpsPerCustomer
    });
    setSimulationNpvParams({
      discountRate: COMMON_CONFIG.discountRate,
      taxRate: COMMON_CONFIG.taxRate
    });
  };

  return (
    <section id="simulation">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🎯 Simulation - 통합 시뮬레이션</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          투자 비용, 수익 추정, NPV 계산을 한 페이지에서 통합적으로 시뮬레이션할 수 있습니다. 
          각 섹션의 파라미터를 조정하면 실시간으로 NPV 결과가 업데이트됩니다.
          <br /><br />
          <strong>💡 참고:</strong> 이 페이지는 기존 시뮬레이션과 완전히 분리되어 독립적으로 작동하지만, 
          동일한 계산 로직이 적용됩니다.
        </p>
        <div className="flex justify-end">
          <button
            onClick={resetToDefaults}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            🔄 기본값으로 리셋
          </button>
        </div>
      </div>

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

        {/* 통합 시뮬레이션 그리드 */}
        <div className="space-y-6">
          
          {/* 1. 투자 비용 시뮬레이션 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">💰 투자 비용 시뮬레이션</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backbone Device CAPEX ($)
                </label>
                <input
                  type="number"
                  value={simulationInvestmentParams.backboneDeviceCapex}
                  onChange={(e) => handleInvestmentParameterChange('backboneDeviceCapex', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="1000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DCN/ODF CAPEX ($)
                </label>
                <input
                  type="number"
                  value={simulationInvestmentParams.dcnOdfCapex}
                  onChange={(e) => handleInvestmentParameterChange('dcnOdfCapex', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연간 OPEX ($)
                </label>
                <input
                  type="number"
                  value={simulationInvestmentParams.backboneMaintenanceOpex}
                  onChange={(e) => handleInvestmentParameterChange('backboneMaintenanceOpex', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="100"
                />
              </div>
            </div>
          </div>

          {/* 2. 수익 추정 시뮬레이션 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📈 수익 추정 시뮬레이션</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기본 고객 수
                </label>
                <input
                  type="number"
                  value={simulationRevenueParams.baseCustomers}
                  onChange={(e) => handleRevenueParameterChange('baseCustomers', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  step="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  2025년 고객수
                </label>
                <input
                  type="number"
                  value={simulationRevenueParams.customersByYear[0]}
                  onChange={(e) => {
                    const newCustomersByYear = [...simulationRevenueParams.customersByYear];
                    newCustomersByYear[0] = Math.round(Number(e.target.value));
                    setSimulationRevenueParams(prev => ({
                      ...prev,
                      customersByYear: newCustomersByYear
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  2026년 고객수
                </label>
                <input
                  type="number"
                  value={simulationRevenueParams.customersByYear[1]}
                  onChange={(e) => {
                    const newCustomersByYear = [...simulationRevenueParams.customersByYear];
                    newCustomersByYear[1] = Math.round(Number(e.target.value));
                    setSimulationRevenueParams(prev => ({
                      ...prev,
                      customersByYear: newCustomersByYear
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  2027년 고객수
                </label>
                <input
                  type="number"
                  value={simulationRevenueParams.customersByYear[2]}
                  onChange={(e) => {
                    const newCustomersByYear = [...simulationRevenueParams.customersByYear];
                    newCustomersByYear[2] = Math.round(Number(e.target.value));
                    setSimulationRevenueParams(prev => ({
                      ...prev,
                      customersByYear: newCustomersByYear
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  2028년 고객수
                </label>
                <input
                  type="number"
                  value={simulationRevenueParams.customersByYear[3]}
                  onChange={(e) => {
                    const newCustomersByYear = [...simulationRevenueParams.customersByYear];
                    newCustomersByYear[3] = Math.round(Number(e.target.value));
                    setSimulationRevenueParams(prev => ({
                      ...prev,
                      customersByYear: newCustomersByYear
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  2029년 고객수
                </label>
                <input
                  type="number"
                  value={simulationRevenueParams.customersByYear[4]}
                  onChange={(e) => {
                    const newCustomersByYear = [...simulationRevenueParams.customersByYear];
                    newCustomersByYear[4] = Math.round(Number(e.target.value));
                    setSimulationRevenueParams(prev => ({
                      ...prev,
                      customersByYear: newCustomersByYear
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기본 단가 ($/Mbps)
                </label>
                <input
                  type="number"
                  value={simulationRevenueParams.basePrice}
                  onChange={(e) => handleRevenueParameterChange('basePrice', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="10"
                />
              </div>
            </div>
          </div>

          {/* 3. NPV 시뮬레이션 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📊 NPV 시뮬레이션</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  할인율 (%)
                </label>
                <input
                  type="number"
                  value={Math.round(simulationNpvParams.discountRate * 1000) / 10}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      handleNpvParameterChange('discountRate', value / 100);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  세율 (%)
                </label>
                <input
                  type="number"
                  value={Math.round(simulationNpvParams.taxRate * 1000) / 10}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      handleNpvParameterChange('taxRate', value / 100);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 실시간 NPV 결과 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
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
                {metrics.irr >= simulationNpvParams.discountRate ? '✅ 기준 초과' : '❌ 기준 미달'}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">항목</th>
                {simulationResults.revenues.map((_, index) => (
                  <th key={index} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {2025 + index}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">매출</td>
                {simulationResults.revenues.map((revenue, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {formatCurrency(revenue)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">비용</td>
                {simulationResults.costs.map((cost, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {formatCurrency(cost)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">이익</td>
                {simulationResults.profits.map((profit, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {formatCurrency(profit)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">세금</td>
                {simulationResults.taxes.map((tax, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {formatCurrency(tax)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">감가상각</td>
                {simulationResults.depreciationByYear.map((depr, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {formatCurrency(depr)}
                  </td>
                ))}
              </tr>
              <tr className="bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">순현금흐름</td>
                {simulationResults.netCashFlows.map((net, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-center">
                    {formatCurrency(net)}
                  </td>
                ))}
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
} 

// 일관성 검증 함수들
const validateCalculationConsistency = (region: 'mumbai' | 'chennai') => {
  try {
    // 동일한 파라미터로 여러 번 계산했을 때 같은 결과가 나오는지 확인
    const result1 = calculateUnifiedCashFlows(region);
    const result2 = calculateUnifiedCashFlows(region);
    
    const npvDiff = Math.abs(result1.cashFlows.reduce((sum, cf, year) => 
      sum + cf / Math.pow(1 + COMMON_CONFIG.discountRate, year), 0) - 
      result2.cashFlows.reduce((sum, cf, year) => 
      sum + cf / Math.pow(1 + COMMON_CONFIG.discountRate, year), 0));
    
    if (npvDiff > 0.01) {
      console.warn('⚠️ 계산 결과가 일관되지 않습니다. 계산 로직을 확인해주세요.');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ 일관성 검증 중 오류 발생:', error);
    return false;
  }
};

const validateDataCompleteness = (params: any) => {
  const requiredFields = ['region', 'basePrice', 'discountRate', 'taxRate'];
  const missingFields = requiredFields.filter(field => !params[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`필수 파라미터가 누락되었습니다: ${missingFields.join(', ')}`);
  }
  
  return true;
};

const validateFinancialMetrics = (metrics: {
  npv: number;
  irr: number;
  paybackPeriod: number;
  profitabilityIndex: number;
}) => {
  const warnings: string[] = [];
  
  if (Math.abs(metrics.npv) > 10000000) {
    warnings.push('NPV가 비정상적으로 큽니다');
  }
  
  if (metrics.irr < -0.5 || metrics.irr > 2) {
    warnings.push('IRR이 비현실적인 범위입니다');
  }
  
  if (metrics.paybackPeriod < 0 || metrics.paybackPeriod > 20) {
    warnings.push('투자 회수기간이 비현실적입니다');
  }
  
  if (metrics.profitabilityIndex < 0 || metrics.profitabilityIndex > 10) {
    warnings.push('수익성 지수가 비현실적입니다');
  }
  
  if (warnings.length > 0) {
    console.warn('⚠️ 재무 지표 검증 경고:', warnings.join(', '));
    return false;
  }
  
  return true;
};

// 유틸리티 함수들