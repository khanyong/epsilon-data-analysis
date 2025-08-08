import React, { useState, useEffect } from 'react';
import { COMMON_CONFIG, REGION_CONFIGS } from '../../config/businessConfig';
import { getGlobalRevenueParams, calculateRevenue, isInvestmentExecuted, isRevenueExecuted, updateGlobalRevenueParams } from './BusinessFeasibilitySections2';
import { getGlobalInvestmentParams, calculateInvestmentCosts, updateGlobalInvestmentParams } from './BusinessFeasibilitySections2';
import { getGlobalCogsData } from './BusinessFeasibilitySections2-2';
import { CogsByRegion } from '../../services/cogsService';

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
  const totalAnnualOpex = backboneMaintenanceOpex * 12; // 연간 OPEX에 12를 곱함 (월별 계산)
  
  const depreciationPerYear = totalCapex / depreciationYears;
  const depreciationSchedule: number[] = [];
  
  for (let year = 0; year < 5; year++) {
    if (year < depreciationYears) {
      depreciationSchedule.push(depreciationPerYear);
    } else {
      depreciationSchedule.push(0);
    }
  }
  
  return {
    totalCapex,
    totalAnnualOpex,
    depreciationSchedule,
    backboneDeviceCapex,
    dcnOdfCapex,
    backboneMaintenanceOpex
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
  const { revenues } = calculateUnifiedRevenue(region, revenueParams);
  const { totalCapex, totalAnnualOpex, depreciationSchedule } = calculateUnifiedInvestmentCosts(investmentParams);
  
  const discountRate = npvParams?.discountRate ?? COMMON_CONFIG.discountRate;
  const taxRate = npvParams?.taxRate ?? COMMON_CONFIG.taxRate;
  
  // COGS 데이터 사용 (기본값 또는 전달받은 값)
  const defaultCogs = REGION_CONFIGS[region].cogsByYear;
  const cogsByYear = cogsData?.[region] ?? defaultCogs;
  
  const cashFlows: number[] = [];
  const revenues_detail: number[] = [];
  const costs: number[] = [];
  const profits: number[] = [];
  const taxes: number[] = [];
  const netCashFlows: number[] = [];
  
  for (let year = 0; year < 5; year++) {
    const revenue = revenues[year];
    const cogs = cogsByYear[year] || 0;
    const opex = totalAnnualOpex;
    const depreciation = depreciationSchedule[year];
    
    // 표준 DCF 계산 방식
    // 1. 매출총이익 (Gross Profit)
    const grossProfit = revenue - cogs;
    
    // 2. EBITDA (Earnings Before Interest, Taxes, Depreciation, Amortization)
    const ebitda = grossProfit - opex;
    
    // 3. EBIT (Earnings Before Interest and Taxes)
    const ebit = ebitda - depreciation;
    
    // 4. 세금 (EBIT 기준으로 계산)
    const tax = ebit > 0 ? ebit * taxRate : 0;
    
    // 5. 순이익 (Net Income)
    const netIncome = ebit - tax;
    
    // 6. 순현금흐름 (Net Cash Flow) = 순이익 + 감가상각비
    const netCashFlow = netIncome + depreciation;
    
    revenues_detail.push(revenue);
    costs.push(cogs + opex); // COGS + OPEX만 비용으로 표시
    profits.push(ebit); // EBIT를 이익으로 표시
    taxes.push(tax);
    netCashFlows.push(netCashFlow);
  }
  
  // 초기 투자 비용을 첫 번째 현금흐름에 반영
  cashFlows.push(-totalCapex);
  cashFlows.push(...netCashFlows);
  
  return {
    cashFlows,
    revenues: revenues_detail,
    costs,
    profits,
    taxes,
    netCashFlows,
    depreciation: depreciationSchedule
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
  return `${(value * 100).toFixed(2)}%`;
};

// NPV 시뮬레이션을 위한 타입 정의
interface NPVParameters {
  discountRate: number;
  taxRate: number;
  growthRate: number; // 영구성장률 추가
}

export function BusinessFeasibilitySectionDcf() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  const [showWaccModal, setShowWaccModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('');
  
  // NPV 시뮬레이션 파라미터 상태
  const [npvParams, setNpvParams] = useState<NPVParameters>({
    discountRate: COMMON_CONFIG.discountRate,
    taxRate: COMMON_CONFIG.taxRate,
    growthRate: 0.00 // 영구성장률 기본값을 0%로 변경
  });

  // 시뮬레이션 매출 파라미터 상태 (사용자 입력값 반영)
  const [simulationRevenueParams, setSimulationRevenueParams] = useState({
    basePrice: COMMON_CONFIG.basePrice,
    priceDeclineRate: COMMON_CONFIG.priceDeclineRate,
    customersByYear: REGION_CONFIGS.mumbai.customersByYear
  });

  // 시뮬레이션 투자 파라미터 상태 (사용자 입력값 반영)
  const [simulationInvestmentParams, setSimulationInvestmentParams] = useState({
    backboneDeviceCapex: COMMON_CONFIG.backboneDeviceCapex,
    dcnOdfCapex: COMMON_CONFIG.dcnOdfCapex,
    backboneMaintenanceOpex: COMMON_CONFIG.backboneMaintenanceOpex,
    depreciationYears: COMMON_CONFIG.depreciationYears
  });

  // COGS 데이터 상태 (전역 데이터 사용)
  const [cogsData, setCogsData] = useState<CogsByRegion>({
    mumbai: REGION_CONFIGS.mumbai.cogsByYear,
    chennai: REGION_CONFIGS.chennai.cogsByYear
  });

  // 지역 변경 시 파라미터 업데이트 (수익 추정과 투자 비용 연동)
  useEffect(() => {
    // 지역이 변경되면 수익 추정과 투자 비용의 전역 파라미터를 확인
    console.log(`${activeRegion} 지역 선택됨`);
    
    // 시뮬레이션 파라미터를 선택된 지역에 맞게 업데이트
    setSimulationRevenueParams(prev => ({
      ...prev,
      customersByYear: REGION_CONFIGS[activeRegion as 'mumbai' | 'chennai'].customersByYear
    }));
    
    // 전역 COGS 데이터 가져오기
    try {
      const globalCogs = getGlobalCogsData(activeRegion as 'mumbai' | 'chennai');
      if (globalCogs && globalCogs.length > 0) {
        setCogsData(prev => ({
          ...prev,
          [activeRegion]: globalCogs
        }));
      }
    } catch (error) {
      console.log('전역 COGS 데이터를 가져올 수 없습니다. 기본값을 사용합니다.');
    }
  }, [activeRegion]);

  // 매출 추정의 전역 데이터를 가져와서 시뮬레이션 파라미터에 반영
  useEffect(() => {
    const updateRevenueParams = () => {
      try {
        const globalRevenueParams = getGlobalRevenueParams(activeRegion as 'mumbai' | 'chennai');
        if (globalRevenueParams) {
          setSimulationRevenueParams({
            basePrice: globalRevenueParams.basePrice,
            priceDeclineRate: globalRevenueParams.priceDeclineRate,
            customersByYear: globalRevenueParams.customersByYear
          });
        }
      } catch (error) {
        console.log('전역 매출 데이터를 가져올 수 없습니다.');
      }
    };

    // 주기적으로 매출 데이터 확인 (1초마다)
    const interval = setInterval(updateRevenueParams, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, [activeRegion]);

  // COGS 데이터 변경 감지 및 업데이트
  useEffect(() => {
    const updateCogsData = () => {
      try {
        const globalCogs = getGlobalCogsData(activeRegion as 'mumbai' | 'chennai');
        if (globalCogs && globalCogs.length > 0) {
          setCogsData(prev => ({
            ...prev,
            [activeRegion]: globalCogs
          }));
        }
      } catch (error) {
        console.log('전역 COGS 데이터를 가져올 수 없습니다.');
      }
    };

    // 주기적으로 COGS 데이터 확인 (1초마다)
    const interval = setInterval(updateCogsData, 1000);
    
    // COGS 데이터 리셋 이벤트 감지
    const handleCogsReset = (event: CustomEvent) => {
      if (event.detail.region === activeRegion) {
        updateCogsData();
      }
    };
    
    window.addEventListener('cogsDataReset', handleCogsReset as EventListener);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('cogsDataReset', handleCogsReset as EventListener);
    };
  }, [activeRegion]);

  // TV(Terminal Value) 계산 함수
  const calculateTerminalValue = (finalCashFlow: number, growthRate: number, discountRate: number) => {
    // Gordon Growth Model: TV = CF5 × (1 + g) / (r - g)
    if (discountRate <= growthRate) {
      console.warn('⚠️ 할인율이 성장률보다 작거나 같습니다. TV 계산이 부정확할 수 있습니다.');
      return finalCashFlow * 10; // 임시값
    }
    return finalCashFlow * (1 + growthRate) / (discountRate - growthRate);
  };

  // DCF 계산 함수들
  const calculateFinancialMetrics = (cashFlows: number[], discountRate: number) => {
    // TV 계산 (5년차 현금흐름 기준)
    const finalCashFlow = cashFlows[cashFlows.length - 1];
    const terminalValue = calculateTerminalValue(finalCashFlow, npvParams.growthRate, discountRate);
    
    // ✅ 수정된 NPV 계산 (TV 포함)
    let npv = cashFlows.reduce((sum, cf, year) => {
      return sum + cf / Math.pow(1 + discountRate, year);
    }, 0);
    
    // TV를 5년차에 할인하여 추가
    const discountedTV = terminalValue / Math.pow(1 + discountRate, 5);
    npv += discountedTV;

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

    // Payback Period 계산 - 수정된 로직
    const initialInvestment = Math.abs(cashFlows[0]); // 초기 투자 비용 (양수로 변환)
    let cumulativeCf = 0;
    let paybackPeriod = 0;
    
    for (let i = 1; i < cashFlows.length; i++) { // i=1부터 시작 (연간 현금흐름만)
      cumulativeCf += cashFlows[i];
      if (cumulativeCf >= initialInvestment) {
        paybackPeriod = i; // 연도 수 (초기 투자 비용 제외)
        break;
      }
    }
    
    // 만약 5년 내에 회수되지 않으면 -1로 표시 (UI에서 "5년 초과"로 표시)
    if (paybackPeriod === 0) {
      paybackPeriod = -1; // 5년 초과를 의미
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
      simulationRevenueParams,
      simulationInvestmentParams,
      {
        discountRate: npvParams.discountRate,
        taxRate: npvParams.taxRate
      },
      cogsData // 동적 COGS 데이터 사용
    );
  };

  // 시뮬레이션 결과 계산
  const simulationResults = generateSimulationCashFlows();
  const metrics = calculateFinancialMetrics(simulationResults.cashFlows, npvParams.discountRate);

  // 파라미터 업데이트 핸들러
  const handleParameterChange = (param: keyof NPVParameters, value: number) => {
    setNpvParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // 시뮬레이션 매출 파라미터 변경 핸들러
  const handleRevenueParameterChange = (param: keyof typeof simulationRevenueParams, value: number | number[]) => {
    setSimulationRevenueParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // 시뮬레이션 투자 파라미터 변경 핸들러
  const handleInvestmentParameterChange = (param: keyof typeof simulationInvestmentParams, value: number) => {
    setSimulationInvestmentParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // 파라미터 리셋 핸들러
  const resetToDefaults = () => {
    // NPV 파라미터만 기본값으로 리셋 (매출/투자 파라미터는 참조용이므로 리셋하지 않음)
    setNpvParams({
      discountRate: COMMON_CONFIG.discountRate,
      taxRate: COMMON_CONFIG.taxRate,
      growthRate: 0.00 // 영구성장률 기본값을 0%로 변경
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
      const depreciation = cashFlows.depreciation[year - 1];
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">7. 💰 DCF 분석 기반 NPV/IRR 분석</h2>
      
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

        {/* DCF 계산 방식 설명 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold mb-4 text-gray-800">📋 DCF 계산 방식</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 계산 순서 */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">🔄 계산 순서</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>매출 (Revenue)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>매출총이익 = 매출 - COGS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>EBITDA = 매출총이익 - OPEX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span>EBIT = EBITDA - 감가상각비</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                  <span>세금 = EBIT x 세율 (EBIT &gt; 0인 경우만)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
                  <span>순이익 = EBIT - 세금</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">7</span>
                  <span className="font-semibold">순현금흐름 = 순이익 + 감가상각비</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">8</span>
                  <span className="font-semibold">Terminal Value = CF5 × (1 + g) / (r - g)</span>
                </div>
              </div>
            </div>

            {/* 감가상각비 처리 */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">📊 감가상각비 처리</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-2">비현금 비용 처리</p>
                  <p className="text-blue-700">
                    감가상각비는 실제 현금 지출이 아니므로, 세금 계산 후 현금흐름에 다시 추가됩니다.
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-2">세금 절약 효과</p>
                  <p className="text-green-700">
                    감가상각비는 세금을 줄이는 효과가 있어 실질적인 현금흐름을 증가시킵니다.
                  </p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="font-medium text-purple-800 mb-2">Terminal Value</p>
                  <p className="text-purple-700">
                    5년차 이후의 영구 성장을 반영하여 최종 가치를 계산합니다.
                  </p>
                </div>
              </div>
            </div>
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
                NPV 파라미터 리셋
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
              💡 <strong>NPV 시뮬레이션</strong>은 할인율, 세율, 영구성장률을 조정하여 투자 가치를 분석합니다. 
              수익 추정과 투자 비용 분석이 완료된 후 실행하세요.
            </p>
          </div>

          {/* NPV 파라미터 입력 */}
          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-3">📊 NPV 파라미터</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  영구성장률 (%)
                </label>
                <input
                  type="number"
                  value={(npvParams.growthRate * 100).toFixed(1)}
                  onChange={(e) => handleParameterChange('growthRate', Number(e.target.value) / 100)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="10"
                  step="0.1"
                />
                <p className="text-xs text-gray-500">5년 이후 영구 성장률</p>
              </div>
            </div>
          </div>

          {/* 실시간 NPV 결과 - 테이블 바로 위로 이동 */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  {metrics.paybackPeriod === -1 ? '5년 초과' : `${metrics.paybackPeriod}년`}
                </div>
                <div className="text-sm text-gray-600">회수 기간</div>
                <div className="text-xs text-gray-500">
                  {metrics.paybackPeriod === -1 ? '❌ 회수 불가' : 
                   metrics.paybackPeriod <= 5 ? '✅ 적정 수준' : '⚠️ 장기 투자'}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">비용 (COGS+OPEX)</td>
                  {simulationResults.costs.map((cost, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {formatCurrency(cost)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">EBIT</td>
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
                  {simulationResults.depreciation.map((depr, index) => (
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
                <tr className="bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">Terminal Value</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-700 text-center">
                    {formatCurrency(calculateTerminalValue(simulationResults.netCashFlows[4], npvParams.growthRate, npvParams.discountRate))}
                  </td>
                </tr>
              </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 투자 파라미터 참조 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">🏗️ 투자 파라미터 참조</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Backbone Device CAPEX (USD)</label>
              <input
                type="number"
                value={simulationInvestmentParams.backboneDeviceCapex}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">투자 비용 분석에서 설정된 값</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">DCN/ODF CAPEX (USD)</label>
              <input
                type="number"
                value={simulationInvestmentParams.dcnOdfCapex}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">투자 비용 분석에서 설정된 값</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">월간 OPEX (USD)</label>
              <input
                type="number"
                value={simulationInvestmentParams.backboneMaintenanceOpex}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">투자 비용 분석에서 설정된 값</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">감가상각 연수</label>
              <input
                type="number"
                value={simulationInvestmentParams.depreciationYears}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">투자 비용 분석에서 설정된 값</p>
            </div>
          </div>
        </div>

        {/* 매출 파라미터 참조 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">💰 매출 파라미터 참조</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">기본 단가 (USD/Mbps)</label>
              <input
                type="number"
                value={simulationRevenueParams.basePrice}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">6. 5년 매출 추정에서 설정된 값</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">가격 하락률 (%)</label>
              <input
                type="number"
                value={simulationRevenueParams.priceDeclineRate * 100}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">6. 5년 매출 추정에서 설정된 값</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">고객당 Mbps</label>
              <input
                type="number"
                value={COMMON_CONFIG.mbpsPerCustomer}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">고정값 (변경 불가)</p>
            </div>
          </div>
        </div>

        {/* COGS 파라미터 참조 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">📊 COGS 파라미터 참조</h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {cogsData[activeRegion as 'mumbai' | 'chennai'].map((cogs, index) => {
              const revenue = simulationResults.revenues[index];
              const costRatio = revenue > 0 ? (cogs / revenue * 100) : 0;
              return (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{2025 + index}년 COGS</label>
                  <input
                    type="number"
                    value={cogs}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                    disabled
                  />
                  <div className="mt-2 p-2 rounded-md text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600">매출:</span>
                      <span className="font-medium">{formatCurrency(revenue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">매출원가율:</span>
                      <span className={`font-medium ${
                        costRatio > 80 ? 'text-red-600' : 
                        costRatio > 60 ? 'text-orange-600' : 
                        costRatio > 40 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {costRatio.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">6. 5년 매출 추정에서 설정된 값</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h5 className="text-sm font-medium text-blue-800 mb-2">📈 매출원가율 기준</h5>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-700">40% 이하: 양호</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-yellow-700">40-60%: 보통</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-orange-700">60-80%: 높음</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-red-700">80% 이상: 매우 높음</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionMarketing() {
  const [selectedRegion, setSelectedRegion] = useState<'mumbai' | 'chennai'>('mumbai');
  const [selectedScenario, setSelectedScenario] = useState<'base' | 'optimistic' | 'pessimistic'>('base');

  const getRevenueData = (region: 'mumbai' | 'chennai', scenario: 'base' | 'optimistic' | 'pessimistic') => {
    let revenueParams: {
      basePrice?: number;
      priceDeclineRate?: number;
      customersByYear?: number[];
    } | undefined = undefined;
    
    if (scenario === 'optimistic') {
      revenueParams = {
        basePrice: COMMON_CONFIG.basePrice * 1.2,
        priceDeclineRate: COMMON_CONFIG.priceDeclineRate * 0.8,
        customersByYear: REGION_CONFIGS[region].customersByYear.map(c => Math.floor(c * 1.3))
      };
    } else if (scenario === 'pessimistic') {
      revenueParams = {
        basePrice: COMMON_CONFIG.basePrice * 0.8,
        priceDeclineRate: COMMON_CONFIG.priceDeclineRate * 1.2,
        customersByYear: REGION_CONFIGS[region].customersByYear.map(c => Math.floor(c * 0.7))
      };
    }
    
    return calculateUnifiedRevenue(region, revenueParams);
  };

  const mumbaiData = getRevenueData('mumbai', selectedScenario);
  const chennaiData = getRevenueData('chennai', selectedScenario);

  const scenarioLabels = {
    base: '기본',
    optimistic: '낙관적',
    pessimistic: '비관적'
  };

  return (
    <section id="marketing">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">8. 📈 마케팅 분석</h2>
      
      {/* 시나리오 선택 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">🎯 시나리오 선택</h3>
        <div className="flex flex-wrap gap-2">
          {(['base', 'optimistic', 'pessimistic'] as const).map((scenario) => (
            <button
              key={scenario}
              onClick={() => setSelectedScenario(scenario)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedScenario === scenario
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {scenarioLabels[scenario]}
            </button>
          ))}
        </div>
      </div>

      {/* 지역별 매출 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mumbai */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">🏙️ Mumbai</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-600 mb-2">연도별 고객수</h4>
              <div className="grid grid-cols-5 gap-2">
                {mumbaiData.customers.map((customer, index) => (
                  <div key={index} className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-sm text-gray-600">연도 {index + 1}</div>
                    <div className="font-semibold text-blue-800">{customer}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-600 mb-2">연도별 단가</h4>
              <div className="grid grid-cols-5 gap-2">
                {mumbaiData.prices.map((price, index) => (
                  <div key={index} className="text-center p-2 bg-green-50 rounded">
                    <div className="text-sm text-gray-600">연도 {index + 1}</div>
                    <div className="font-semibold text-green-800">{formatCurrency(price)}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-600 mb-2">연도별 매출</h4>
              <div className="grid grid-cols-5 gap-2">
                {mumbaiData.revenues.map((revenue, index) => (
                  <div key={index} className="text-center p-2 bg-purple-50 rounded">
                    <div className="text-sm text-gray-600">연도 {index + 1}</div>
                    <div className="font-semibold text-purple-800">{formatCurrency(revenue)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chennai */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">🏙️ Chennai</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-600 mb-2">연도별 고객수</h4>
              <div className="grid grid-cols-5 gap-2">
                {chennaiData.customers.map((customer, index) => (
                  <div key={index} className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-sm text-gray-600">연도 {index + 1}</div>
                    <div className="font-semibold text-blue-800">{customer}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-600 mb-2">연도별 단가</h4>
              <div className="grid grid-cols-5 gap-2">
                {chennaiData.prices.map((price, index) => (
                  <div key={index} className="text-center p-2 bg-green-50 rounded">
                    <div className="text-sm text-gray-600">연도 {index + 1}</div>
                    <div className="font-semibold text-green-800">{formatCurrency(price)}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-600 mb-2">연도별 매출</h4>
              <div className="grid grid-cols-5 gap-2">
                {chennaiData.revenues.map((revenue, index) => (
                  <div key={index} className="text-center p-2 bg-purple-50 rounded">
                    <div className="text-sm text-gray-600">연도 {index + 1}</div>
                    <div className="font-semibold text-purple-800">{formatCurrency(revenue)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 요약 통계 */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">📊 요약 통계</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-600 mb-3">Mumbai</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">총 고객수:</span>
                <span className="font-semibold">{mumbaiData.customers.reduce((a, b) => a + b, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">총 매출:</span>
                <span className="font-semibold">{formatCurrency(mumbaiData.revenues.reduce((a, b) => a + b, 0))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">평균 단가:</span>
                <span className="font-semibold">{formatCurrency(mumbaiData.prices.reduce((a, b) => a + b, 0) / mumbaiData.prices.length)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-600 mb-3">Chennai</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">총 고객수:</span>
                <span className="font-semibold">{chennaiData.customers.reduce((a, b) => a + b, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">총 매출:</span>
                <span className="font-semibold">{formatCurrency(chennaiData.revenues.reduce((a, b) => a + b, 0))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">평균 단가:</span>
                <span className="font-semibold">{formatCurrency(chennaiData.prices.reduce((a, b) => a + b, 0) / chennaiData.prices.length)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}