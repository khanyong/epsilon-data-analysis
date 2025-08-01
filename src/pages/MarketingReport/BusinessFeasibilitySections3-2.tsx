import React, { useState, useEffect } from 'react';
import { COMMON_CONFIG, REGION_CONFIGS } from '../../config/businessConfig';
import { getGlobalRevenueParams, calculateRevenue, isInvestmentExecuted, isRevenueExecuted, updateGlobalRevenueParams } from './BusinessFeasibilitySections2';
import { getGlobalInvestmentParams, calculateInvestmentCosts, updateGlobalInvestmentParams } from './BusinessFeasibilitySections2';
import { CogsByRegion } from '../../services/cogsService';

// COGS 데이터 가져오기
const getCogsData = async (): Promise<CogsByRegion> => {
  try {
    // 기본값 사용 (Supabase 연결 제거)
    return {
      mumbai: REGION_CONFIGS.mumbai.cogsByYear,
      chennai: REGION_CONFIGS.chennai.cogsByYear
    };
  } catch (error) {
    console.error('COGS 데이터 로드 실패, 기본값 사용:', error);
    return {
      mumbai: REGION_CONFIGS.mumbai.cogsByYear,
      chennai: REGION_CONFIGS.chennai.cogsByYear
    };
  }
};

// 통합 매출 계산
const calculateUnifiedRevenue = (region: 'mumbai' | 'chennai', customParams?: {
  basePrice?: number;
  priceDeclineRate?: number;
  customersByYear?: number[];
}) => {
  // 입력 검증
  if (!region || !['mumbai', 'chennai'].includes(region)) {
    throw new Error('지역은 mumbai 또는 chennai여야 합니다');
  }

  const basePrice = customParams?.basePrice ?? COMMON_CONFIG.basePrice;
  const priceDeclineRate = customParams?.priceDeclineRate ?? COMMON_CONFIG.priceDeclineRate;
  const customersByYear = customParams?.customersByYear ?? REGION_CONFIGS[region].customersByYear;

  // 매개변수 검증
  if (basePrice <= 0) {
    throw new Error('기본 가격은 0보다 커야 합니다');
  }
  if (priceDeclineRate < 0 || priceDeclineRate > 1) {
    throw new Error('가격 감소율은 0~100% 사이여야 합니다');
  }
  if (!customersByYear || customersByYear.length !== 5) {
    throw new Error('연도별 고객 수는 5개여야 합니다');
  }
  if (customersByYear.some(c => c < 0)) {
    throw new Error('연도별 고객 수는 음수일 수 없습니다');
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
    console.warn('매출이 음수일 수 없습니다. 매개변수를 확인해주세요.');
  }
  if (revenues.some(r => r > 1000000)) {
    console.warn('매출이 비정상적인 값을 가질 수 있습니다. 매개변수를 확인해주세요.');
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
  
  // 매개변수 검증
  if (backboneDeviceCapex < 0) {
    throw new Error('백본 장비 CAPEX는 음수일 수 없습니다');
  }
  if (dcnOdfCapex < 0) {
    throw new Error('DCN/ODF CAPEX는 음수일 수 없습니다');
  }
  if (backboneMaintenanceOpex < 0) {
    throw new Error('유지보수 OPEX는 음수일 수 없습니다');
  }
  if (depreciationYears <= 0) {
    throw new Error('감가상각 기간은 0보다 커야 합니다');
  }
  
  const totalCapex = backboneDeviceCapex + dcnOdfCapex;
  const totalAnnualOpex = backboneMaintenanceOpex * 12; // 월별 OPEX * 12
  
  // 감가상각 계산 (직선법)
  const annualDepreciation = totalCapex / depreciationYears;
  
  // 감가상각 연도별 배열
  const depreciationByYear = [
    annualDepreciation, // 2025년
    annualDepreciation, // 2026년
    annualDepreciation, // 2027년
    annualDepreciation, // 2028년
    annualDepreciation  // 2029년
  ];
  
  // 결과 검증
  if (totalCapex <= 0) {
    console.warn('초기 CAPEX가 0 이하입니다. 자본 비용을 확인해주세요.');
  }
  if (annualDepreciation <= 0) {
    console.warn('감가상각이 0 이하입니다. 감가상각 기간을 확인해주세요.');
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
  },
  cogsData?: CogsByRegion
) => {
  // 입력 검증
  if (!region || !['mumbai', 'chennai'].includes(region)) {
    throw new Error('지역은 mumbai 또는 chennai여야 합니다');
  }

  // COGS 데이터 가져오기 (기본값 사용)
  let cogsByYear: number[];
  if (cogsData) {
    cogsByYear = cogsData[region];
  } else {
    // 기본값 사용
    cogsByYear = REGION_CONFIGS[region].cogsByYear;
  }

  // 순이익 계산
  const revenueData = calculateUnifiedRevenue(region, revenueParams);
  const revenues = revenueData.revenues;

  // 자본 비용 계산
  const investmentData = calculateUnifiedInvestmentCosts(investmentParams);
  const totalCapex = investmentData.totalCapex;
  const totalAnnualOpex = investmentData.totalAnnualOpex;
  const depreciationByYear = investmentData.depreciationByYear;

  // NPV 매개변수
  const discountRate = npvParams?.discountRate ?? COMMON_CONFIG.discountRate;
  const taxRate = npvParams?.taxRate ?? COMMON_CONFIG.taxRate;

  // NPV 매개변수 검증
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
    const cogs = cogsByYear[year] || 0; // COGS 데이터 사용
    const opex = totalAnnualOpex; // 월별 OPEX * 12
    const totalCost = cogs + opex; // COGS + OPEX
    costs.push(totalCost);

    const profit = revenue - totalCost;
    profits.push(profit);

    // 고정: 순이익만 세금 계산, 실제 수익은 현금 0
    const tax = profit > 0 ? profit * taxRate : 0;
    taxes.push(tax);

    const netCashFlow = profit - tax + depreciationByYear[year];
    netCashFlows.push(netCashFlow);
  }

  // 초기 자본 비용 초기화
  cashFlows.push(-totalCapex);
  cashFlows.push(...netCashFlows);

  // 결과 검증
  if (profits.some(p => p < -1000000)) {
    console.warn('순이익이 비정상적인 값을 가질 수 있습니다. 비용 구조를 확인해주세요.');
  }
  if (taxes.some(t => t < 0)) {
    console.warn('순이익이 음수일 수 있습니다. 세율을 확인해주세요.');
  }
  if (netCashFlows.some(n => Math.abs(n) > 1000000)) {
    console.warn('현금흐름이 비정상적인 값을 가질 수 있습니다. 계산을 다시 확인해주세요.');
  }

  return {
    cashFlows,
    revenues,
    costs,
    profits,
    taxes,
    netCashFlows,
    cogsByYear, // COGS 데이터 반환
    depreciationByYear // 감가상각 데이터 반환
  };
};

// 틸리티 수 형식화
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

// NPV 매개변수를 위한 인터페이스
interface NPVParameters {
  discountRate: number;
  taxRate: number;
}

export function BusinessFeasibilitySectionDcf() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  const [showWaccModal, setShowWaccModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('');
  
  // NPV 매개변수 상태
  const [npvParams, setNpvParams] = useState<NPVParameters>({
    discountRate: COMMON_CONFIG.discountRate,
    taxRate: COMMON_CONFIG.taxRate
  });

  const openWaccModal = (componentKey: string) => {
    setSelectedComponent(componentKey);
    setShowWaccModal(true);
  };

  // 지역 변경 시 매출 추정 자본 비용 파라미터 로드
  useEffect(() => {
    // 지역 변경 시 매출 추정 자본 비용 파라미터 업데이트
    const revenueParams = getGlobalRevenueParams(activeRegion as 'mumbai' | 'chennai');
    const investmentParams = getGlobalInvestmentParams(activeRegion as 'mumbai' | 'chennai');
    console.log(`${activeRegion} 지역 매출 파라미터:`, revenueParams);
    console.log(`${activeRegion} 지역 자본 비용 파라미터:`, investmentParams);
  }, [activeRegion]);

  // DCF 계산 함수
  const calculateFinancialMetrics = (cashFlows: number[], discountRate: number) => {
    // 고정 NPV 계산 (연도별)
    const npv = cashFlows.reduce((sum, cf, year) => {
      return sum + cf / Math.pow(1 + discountRate, year);
    }, 0);

    // 개선된 IRR 계산 (Newton-Raphson 방법)
    const calculateIRR = (cashFlows: number[]) => {
      let irr = 0.1; // 초기 추정치
      const maxIterations = 100;
      const tolerance = 0.0001; // 허용 오차

      for (let i = 0; i < maxIterations; i++) {
        let npv = 0;
        let derivative = 0;

        // NPV 미분 계산
        for (let year = 0; year < cashFlows.length; year++) {
          const factor = Math.pow(1 + irr, year);
          npv += cashFlows[year] / factor;
          if (year > 0) {
            derivative -= year * cashFlows[year] / (factor * (1 + irr));
          }
        }

        // Newton-Raphson 방법
        const newIrr = irr - npv / derivative;
        
        // 수렴 조건
        if (Math.abs(newIrr - irr) < tolerance) {
          return newIrr;
        }
        
        irr = newIrr;
        
        // 효율적 범위 제한
        if (irr < -0.99 || irr > 10) {
          return 0.1; // 기본값 반환
        }
      }
      
      return irr;
    };

    const irr = calculateIRR(cashFlows);

    // Payback Period 계산 - 기존 방식
    let cumulativeCf = 0;
    let paybackPeriod = 0;
    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCf += cashFlows[i];
      if (cumulativeCf >= 0) {
        paybackPeriod = i + 1;
        break;
      }
    }

    // Profitability Index - 기존 방식
    const profitabilityIndex = npv / Math.abs(cashFlows[0]);

    return {
      npv,
      irr,
      paybackPeriod,
      profitabilityIndex
    };
  };

  // 매출 추정 자본 비용에서 생성된 시뮬레이션 현금흐름
  const generateSimulationCashFlows = () => {
    return calculateUnifiedCashFlows(
      activeRegion as 'mumbai' | 'chennai',
      undefined, // 기본 매출 파라미터 사용
      undefined, // 기본 자본 비용 파라미터 사용
      {
        discountRate: npvParams.discountRate,
        taxRate: npvParams.taxRate
      },
      undefined // 기본 COGS 데이터 사용
    );
  };

  // 시뮬레이션 결과 계산
  const simulationResults = generateSimulationCashFlows();
  const metrics = calculateFinancialMetrics(simulationResults.cashFlows, npvParams.discountRate);

  // 매개변수 데이터 처리

  // 파라미터 변경 핸들러
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
    
    // 역태 13.Simulation 섹션 기본값 리셋
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

  // Base 매출 데이터 가져오기 (매출 추정 계산 시 기본값 사용)
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
    const adjustedCashFlows = [cashFlows.cashFlows[0]]; // 초기 자본 비용
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">DCF 분석 기반 NPV/IRR 분석</h2>
      
      {/* 지역 선택 */}
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
              뭄바??
            </button>
            <button
              onClick={() => setActiveRegion('chennai')}
              className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                activeRegion === 'chennai'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 bg-gray-100'
              }`}
            >
              첸나??
            </button>
          </div>
        </div>

        {/* NPV 결과 - 첫 번째 행으로 이동 */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(metrics.npv)}
              </div>
              <div className="text-sm text-gray-600">NPV</div>
              <div className="text-xs text-gray-500">
                {metrics.npv >= 0 ? '순자 가치 증가' : '순자 가치 감소'}
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
                {metrics.irr >= npvParams.discountRate ? '높은 수준 초과' : '높은 수준 미달'}
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
                {metrics.paybackPeriod <= 5 ? '정상적' : '비정상적'}
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
                {metrics.profitabilityIndex >= 1 ? '정상적' : '부정상적'}
              </div>
            </div>
          </div>
        </div>

        {/* NPV 매개변수 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">NPV 매개변수</h3>
            <div className="flex space-x-2">
              <button
                onClick={resetToDefaults}
                className="text-gray-600 hover:text-gray-800 text-sm underline"
              >
                기본값으로 리셋
              </button>
              <button
                onClick={() => {
                  // 계산 실행
                  const investmentExecuted = isInvestmentExecuted(activeRegion as 'mumbai' | 'chennai');
                  const revenueExecuted = isRevenueExecuted(activeRegion as 'mumbai' | 'chennai');
                  
                  if (!investmentExecuted || !revenueExecuted) {
                    let warningMessage = '현재 계산을 직접 실행하려면 다음 작업이 필요합니다.\n\n';
                    
                    if (!investmentExecuted) {
                      warningMessage += '자본 비용 분석 실행 필요\n';
                    }
                    if (!revenueExecuted) {
                      warningMessage += '매출 추정 실행 필요\n';
                    }
                    
                    warningMessage += '\n확인하고 NPV 계산을 진행하려면 모든 작업을 완료해야 합니다.';
                    
                    alert(warningMessage);
                    return;
                  }
                  
                  // 최종 NPV 계산 실행
                  const finalResults = generateSimulationCashFlows();
                  const finalMetrics = calculateFinancialMetrics(finalResults.cashFlows, npvParams.discountRate);
                  alert(`최종 NPV 계산이 완료되었습니다.\n\nNPV: ${formatCurrency(finalMetrics.npv)}\nIRR: ${formatPercentage(finalMetrics.irr)}\n회수 기간: ${finalMetrics.paybackPeriod}년\n수익성: ${finalMetrics.profitabilityIndex.toFixed(2)}`);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                최종 계산 실행
              </button>
            </div>
          </div>
          
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              NPV는 할인율과 세율을 조정하여 자본 가치를 분석합니다. 
              매출 추정 자본 비용 분석 결과를 반영하여 계산합니다.
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

        {/* 현금흐름 표 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800">현금흐름 표</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연도</th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">순이익</td>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">현금흐름</td>
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">마케팅 전략</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-blue-800">주요 마케팅 포인트</h3>
          <ul className="space-y-2 text-blue-700">
            <li>대한민국 진출 국내 기업 진출</li>
            <li>사업 근간: 금융, 조세, IT 비용</li>
            <li>규모 전략: 대기업 중심, 중소기업 진출</li>
            <li>지역 차별화: 뭄바??선 자본, 첸나??계 진입</li>
          </ul>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-green-800">마케팅 채널</h3>
          <ul className="space-y-2 text-green-700">
            <li>직접 영업: 국내 기업 1:1 근무</li>
            <li>트래픽: ISP, 통신 통합체</li>
            <li>소셜 미디어: LinkedIn, 산업 통합</li>
            <li>벤처: 국내 기업 투자 투명성</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">마케팅 산출 KPI</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">마케팅 배분</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>직접 영업: 40%</li>
              <li>트래픽: 30%</li>
              <li>소셜 미디어 마케팅 20%</li>
              <li>벤처 10%</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">KPI 목표</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>고객 획득: 뭄바이 {REGION_CONFIGS.mumbai.baseCustomers + REGION_CONFIGS.chennai.baseCustomers}개사 (뭄바이 {REGION_CONFIGS.mumbai.baseCustomers}개사 첸나이 {REGION_CONFIGS.chennai.baseCustomers}개사)</li>
              <li>리드 성과: 20개</li>
              <li>환원율 15%</li>
              <li>고객 만족도 90%</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">마케팅 측정</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>매출 기여도</li>
              <li>고객 소비 가치</li>
              <li>마케팅 ROI</li>
              <li>브랜드 가치 증대</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-yellow-800">마케팅 리스크 분석</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">주요 리스크</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>경쟁 리스크: ISP와의 강력한 마케팅</li>
              <li>문화 차이: 비즈니스 문화 차이로 인한 부족</li>
              <li>규제 변경: 새로운 규제 책 변경</li>
              <li>경기 침체: 국내 기업 자본 축소</li>
              <li>지역 차이: 뭄바??vs 첸나??장 성능 차이</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">전략</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>차별화: 국내 기업 화 비용 강조</li>
              <li>문화 맞춤형 마케팅: 문화에 맞는 마케팅</li>
              <li>트래픽: 트래픽 통합 력</li>
              <li>연차: 장 변화에 빠른 대응</li>
              <li>계약 진입: 뭄바??공 첸나??장</li>
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">10. 📋 결론 및 권고사항</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-green-800">자본 권고</h3>
          <ul className="space-y-2 text-green-700">
            <li>뭄바??선 자본, 첸나??계 진입</li>
            <li>기본 가격: {formatCurrency(COMMON_CONFIG.basePrice)}/Mbps</li>
            <li>가격 감소율: {formatPercentage(COMMON_CONFIG.priceDeclineRate)}</li>
            <li>할인율: {formatPercentage(COMMON_CONFIG.discountRate)}</li>
            <li>세율: {formatPercentage(COMMON_CONFIG.taxRate)}</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-blue-800">주요 관심 사항</h3>
          <ul className="space-y-2 text-blue-700">
            <li>장기 기회: 대한민국 진출 국내 기업 증가</li>
            <li>차별화: 국내 기업 화 비용</li>
            <li>기술: 글로벌 트래픽 동향</li>
            <li>트래픽: 트래픽 통합 력</li>
            <li>계약 진입: 뭄바??공 첸나??장</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">자본 약정</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(COMMON_CONFIG.backboneDeviceCapex + COMMON_CONFIG.dcnOdfCapex)}
            </div>
            <div className="text-sm text-gray-600">초기 자본</div>
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
            <div className="text-sm text-gray-600">감가상각 기간</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(COMMON_CONFIG.backboneMaintenanceOpex)}
            </div>
            <div className="text-sm text-gray-600">월별 OPEX</div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-yellow-800">주의 사항 권고</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">자본 고려 사항</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>계약 자본: 뭄바??선, 첸나??속 자본</li>
              <li>루피 변화에 따른 영향: 높은 루피 변화</li>
              <li>트래픽 관계자 영향력: 트래픽 관계자 영향력</li>
              <li>기술 자본: 지문적 기술 개발 노력</li>
              <li>모니터링: 기술 문제 발생 모니터링</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">공통 조건</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>장 진입: 뭄바??진입, 첸나??장</li>
              <li>고객 데이터: 초기 고객 데이터 참고 고객 구축</li>
              <li>영업 수익률: 비용 수익률 인하</li>
              <li>비용 품질: 고품질 비용 통합</li>
              <li>지문적 개선: 장 변화에 빠른 개선</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 지역별 권고 항목 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-bold mb-4 text-green-800">뭄바??자 권고</h3>
          <ul className="space-y-2 text-green-700">
            <li>자본 선택: 1년 자본</li>
            <li>기본 고객 수: {REGION_CONFIGS.mumbai.baseCustomers}개</li>
            <li>고객 증가: {REGION_CONFIGS.mumbai.customersByYear.join(' 개/')}개</li>
            <li>장 성과: 금융 중심, 구매 예정</li>
            <li>전략: 빠른 장 진입 대응</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <h3 className="text-lg font-bold mb-4 text-orange-800">첸나??자 권고</h3>
          <ul className="space-y-2 text-orange-700">
            <li>자본 선택: 2년 자본</li>
            <li>기본 고객 수: {REGION_CONFIGS.chennai.baseCustomers}개</li>
            <li>고객 증가: {REGION_CONFIGS.chennai.customersByYear.join(' 개/')}개</li>
            <li>장 성과: 조세 중심, 보수 근무</li>
            <li>전략: 뭄바??공 계약 진입</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionRisk() {
  return (
    <section id="risk">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">9. ⚠️ 리스크 분석</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-red-800">주요 리스크</h3>
          <ul className="space-y-2 text-red-700">
            <li>장 리스크: 대한민국 장 진입 실패</li>
            <li>경쟁 리스크: ISP와 치열한 경쟁</li>
            <li>규제 리스크: 대한민국 신 규제 책 변경</li>
            <li>루피 리스크: 높은 루피 변화</li>
            <li>기술 리스크: 트래픽 통합 구축 지연</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-orange-800">리스크 방향</h3>
          <ul className="space-y-2 text-orange-700">
            <li>중요: 장 진입 실패, 경쟁 강화</li>
            <li>중간: 규제 변경, 루피 변화</li>
            <li>중요: 기술 문제, 영업 리스크</li>
            <li>중요: 리스크 대응 부분은 전략 정립 가능</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">리스크 모니터링 전략</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">장 리스크 모니터링</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>계약 진입 (뭄바??첸나??</li>
              <li>트래픽 통합 구축</li>
              <li>장 조사 강화</li>
              <li>연차 비즈니스 모델</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">경쟁 리스크 모니터링</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>국내 기업 화 비용</li>
              <li>차별화된 가격 제안</li>
              <li>고품질 비용 통합</li>
              <li>전략 트래픽</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">무 리스크 모니터링</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>루피 변화 전략</li>
              <li>고정된 수익 구조</li>
              <li>보수 무 계획</li>
              <li>기술 문제 모니터링</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-yellow-800">리스크 모니터링</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">기본 모니터링</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>장 방향: 간 장 분석 보고서</li>
              <li>경쟁 방향: 분기별 경쟁 분석</li>
              <li>규제 변경: 대한민국 신 책 모니터링</li>
              <li>루피 변경: 일일 루피 추적</li>
              <li>고객 만족도: 분기별 고객 만족도 조사</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">리스크 모니터링 프로세스</h4>
            <ul className="text-sm text-yellow-600 space-y-2">
              <li>조기 경보: 리스크 발생 즉시 모니터링</li>
              <li>즉시 대응: 리스크 발생 즉시 대응 구성</li>
              <li>전략 조정: 필요한 비즈니스 전략 조정</li>
              <li>리스크 경험 축적: 리스크 모니터링 경험 축적</li>
              <li>분기 검토: 분기별 리스크 모니터링 검토</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-green-800">리스크 화 과정</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-green-600">70%</div>
            <div className="text-sm text-gray-600">리스크 화율</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-600">전략 준비도</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-purple-600">90%</div>
            <div className="text-sm text-gray-600">모니터링 체계 구축</div>
          </div>
        </div>
      </div>
    </section>
  );
}
