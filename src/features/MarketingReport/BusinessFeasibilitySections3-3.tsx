import React, { useState, useEffect } from 'react';
import { COMMON_CONFIG, REGION_CONFIGS } from '../../config/businessConfig';
import { getGlobalRevenueParams, calculateRevenue, isInvestmentExecuted, isRevenueExecuted, updateGlobalRevenueParams } from './BusinessFeasibilitySections2';
import { getGlobalInvestmentParams, calculateInvestmentCosts, updateGlobalInvestmentParams } from './BusinessFeasibilitySections2';
import { getGlobalCogsData } from './BusinessFeasibilitySections2-2';
import { CogsByRegion } from '../../services/cogsService';

// NPV 파라미터 인터페이스
interface NPVParameters {
  discountRate: number;
  taxRate: number;
  growthRate: number; // 영구성장률 추가
}

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

// 통합된 계산 함수들
const calculateUnifiedRevenue = (region: 'mumbai' | 'chennai', customParams?: {
  basePrice?: number;
  priceDeclineRate?: number;
  customersByYear?: number[];
}) => {
  if (!region || !['mumbai', 'chennai'].includes(region)) {
    throw new Error('지역은 mumbai 또는 chennai여야 합니다');
  }

  const basePrice = customParams?.basePrice ?? COMMON_CONFIG.basePrice;
  const priceDeclineRate = customParams?.priceDeclineRate ?? COMMON_CONFIG.priceDeclineRate;
  const customersByYear = customParams?.customersByYear ?? REGION_CONFIGS[region].customersByYear;

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
  
  const totalCapex = backboneDeviceCapex + dcnOdfCapex;
  const totalAnnualOpex = backboneMaintenanceOpex * 12;
  const annualDepreciation = totalCapex / depreciationYears;
  
  const depreciationByYear = [
    annualDepreciation, annualDepreciation, annualDepreciation, 
    annualDepreciation, annualDepreciation
  ];
  
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
  const { revenues } = calculateUnifiedRevenue(region, revenueParams);
  const { totalCapex, totalAnnualOpex, depreciationByYear } = calculateUnifiedInvestmentCosts(investmentParams);
  
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
    const depreciation = depreciationByYear[year];
    
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
    depreciation: depreciationByYear
  };
};

// 검증 함수들
const validateCalculationConsistency = (region: 'mumbai' | 'chennai') => {
  try {
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

const validateFinancialMetrics = (metrics: {
  npv: number;
  irr: number;
  paybackPeriod: number;
  profitabilityIndex: number;
  terminalValue: number;
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

// COGS Assumption 인터페이스 추가
interface CogsAssumption {
  capacityToLease: { value: number; unit: string };
  circuitDiscountPercent: number;
  colocationGrowthPercent: number;
  targetRfsMonths: number;
  oneYearApplyPercentRevenue: number;
  churnPercent: number;
}

export function BusinessFeasibilitySectionSimulation() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  
  // 각 시뮬레이션 박스의 접기/펼치기 상태
  const [expandedSections, setExpandedSections] = useState({
    investment: true,
    revenue: true,
    cogs: true,
    npv: true
  });
  
  // Simulation 전용 독립적인 파라미터 상태
  const [simulationInvestmentParams, setSimulationInvestmentParams] = useState({
    backboneDeviceCapex: COMMON_CONFIG.backboneDeviceCapex,
    dcnOdfCapex: COMMON_CONFIG.dcnOdfCapex,
    depreciationYears: COMMON_CONFIG.depreciationYears,
    backboneMaintenanceOpex: COMMON_CONFIG.backboneMaintenanceOpex
  });

  const [simulationRevenueParams, setSimulationRevenueParams] = useState({
    baseCustomers: REGION_CONFIGS.mumbai.baseCustomers,
    customersByYear: REGION_CONFIGS.mumbai.customersByYear,
    basePrice: COMMON_CONFIG.basePrice,
    priceDeclineRate: COMMON_CONFIG.priceDeclineRate,
    mbpsPerCustomer: COMMON_CONFIG.mbpsPerCustomer
  });

  const [simulationNpvParams, setSimulationNpvParams] = useState({
    discountRate: COMMON_CONFIG.discountRate,
    taxRate: COMMON_CONFIG.taxRate,
    growthRate: 0.00 // 영구성장률 추가
  });

  // COGS 데이터 상태 추가 - 항목별 구조로 변경
  const [simulationCogsData, setSimulationCogsData] = useState<CogsByRegion>({
    mumbai: REGION_CONFIGS.mumbai.cogsByYear,
    chennai: REGION_CONFIGS.chennai.cogsByYear
  });

  // 항목별 COGS 데이터 상태 추가
  const [simulationCogsItems, setSimulationCogsItems] = useState({
    mumbai: {
      'Capacity to lease': [80, 80, 80, 80, 80],
      'Circuit Discount %': [15, 15, 15, 15, 15],
      'Colocation growth %': [20, 20, 20, 20, 20],
      'Target RFS(mm)': [6, 6, 6, 6, 6],
      '1yr apply % revenue': [5, 5, 5, 5, 5],
      'Churn %': [3, 3, 3, 3, 3]
    },
    chennai: {
      'Capacity to lease': [80, 80, 80, 80, 80],
      'Circuit Discount %': [15, 15, 15, 15, 15],
      'Colocation growth %': [20, 20, 20, 20, 20],
      'Target RFS(mm)': [6, 6, 6, 6, 6],
      '1yr apply % revenue': [5, 5, 5, 5, 5],
      'Churn %': [3, 3, 3, 3, 3]
    }
  });

  // COGS Assumption 상태 추가
  const [cogsAssumption, setCogsAssumption] = useState<CogsAssumption>({
    capacityToLease: { value: 350, unit: 'Mbps' },
    circuitDiscountPercent: 5,
    colocationGrowthPercent: 5.8,
    targetRfsMonths: 12,
    oneYearApplyPercentRevenue: 5,
    churnPercent: 0
  });

  // COGS Assumption 핸들러 함수들 추가
  const handleAssumptionChange = (field: keyof CogsAssumption, value: any) => {
    setCogsAssumption(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAssumptionNumericChange = (field: keyof CogsAssumption, value: number) => {
    setCogsAssumption(prev => ({
      ...prev,
      [field]: field === 'capacityToLease' ? { ...prev.capacityToLease, value } : value
    }));
  };

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
    
    // 전역 COGS 데이터 가져오기
    try {
      const globalCogs = getGlobalCogsData(activeRegion as 'mumbai' | 'chennai');
      if (globalCogs && globalCogs.length > 0) {
        setSimulationCogsData(prev => ({
          ...prev,
          [activeRegion]: globalCogs
        }));
      }
    } catch (error) {
      console.log('전역 COGS 데이터를 가져올 수 없습니다. 기본값을 사용합니다.');
    }
  }, [activeRegion]);

  // COGS 데이터 변경 감지 및 업데이트
  useEffect(() => {
    const updateCogsData = () => {
      try {
        const globalCogs = getGlobalCogsData(activeRegion as 'mumbai' | 'chennai');
        if (globalCogs && globalCogs.length > 0) {
          setSimulationCogsData(prev => ({
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

  // COGS 값 변경 핸들러
  const handleCogsValueChange = (yearIndex: number, value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setSimulationCogsData(prev => ({
        ...prev,
        [activeRegion]: prev[activeRegion].map((val, index) => 
          index === yearIndex ? numValue : val
        )
      }));
    }
  };

  // 항목별 COGS 값 변경 핸들러
  const handleCogsItemValueChange = (itemType: string, yearIndex: number, value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setSimulationCogsItems(prev => ({
        ...prev,
        [activeRegion]: {
          ...prev[activeRegion as 'mumbai' | 'chennai'],
          [itemType]: prev[activeRegion as 'mumbai' | 'chennai'][itemType as keyof typeof prev.mumbai].map((val, index) => 
            index === yearIndex ? numValue : val
          )
        }
      }));
    }
  };

  // 항목별 COGS 총계 계산 함수
  const calculateCogsTotal = () => {
    const regionData = simulationCogsItems[activeRegion as 'mumbai' | 'chennai'];
    const totals = [0, 0, 0, 0, 0];
    
    Object.values(regionData).forEach(itemData => {
      itemData.forEach((value, index) => {
        totals[index] += value;
      });
    });
    
    return totals;
  };

  // COGS 총계 업데이트
  useEffect(() => {
    const totals = calculateCogsTotal();
    setSimulationCogsData(prev => ({
      ...prev,
      [activeRegion]: totals
    }));
  }, [simulationCogsItems, activeRegion]);

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

  // TV(Terminal Value) 계산 함수
  const calculateTerminalValue = (finalCashFlow: number, growthRate: number, discountRate: number) => {
    // Gordon Growth Model: TV = CF5 × (1 + g) / (r - g)
    if (discountRate <= growthRate) {
      console.warn('⚠️ 할인율이 성장률보다 작거나 같습니다. TV 계산이 부정확할 수 있습니다.');
      return finalCashFlow * 10; // 임시값
    }
    return finalCashFlow * (1 + growthRate) / (discountRate - growthRate);
  };

  // 기존과 동일한 DCF 계산 함수
  const calculateFinancialMetrics = (cashFlows: number[], discountRate: number) => {
    // TV 계산 (5년차 현금흐름 기준)
    const finalCashFlow = cashFlows[cashFlows.length - 1];
    const terminalValue = calculateTerminalValue(finalCashFlow, simulationNpvParams.growthRate, discountRate);
    
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
      profitabilityIndex,
      terminalValue // Terminal Value도 반환
    };
  };

  // 기존과 동일한 현금흐름 생성 함수 (COGS 데이터 포함)
  const generateSimulationCashFlows = () => {
    return calculateUnifiedCashFlows(
      activeRegion as 'mumbai' | 'chennai',
      {
        basePrice: simulationRevenueParams.basePrice,
        priceDeclineRate: simulationRevenueParams.priceDeclineRate,
        customersByYear: simulationRevenueParams.customersByYear
      },
      {
        backboneDeviceCapex: simulationInvestmentParams.backboneDeviceCapex,
        dcnOdfCapex: simulationInvestmentParams.dcnOdfCapex,
        backboneMaintenanceOpex: simulationInvestmentParams.backboneMaintenanceOpex,
        depreciationYears: simulationInvestmentParams.depreciationYears
      },
      {
        discountRate: simulationNpvParams.discountRate,
        taxRate: simulationNpvParams.taxRate
      },
      simulationCogsData
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
      taxRate: COMMON_CONFIG.taxRate,
      growthRate: 0.00
    });
    // COGS 기본값 리셋
    setSimulationCogsData({
      mumbai: REGION_CONFIGS.mumbai.cogsByYear,
      chennai: REGION_CONFIGS.chennai.cogsByYear
    });
    // 항목별 COGS 기본값 리셋
    setSimulationCogsItems({
      mumbai: {
        'Capacity to lease': [80, 80, 80, 80, 80],
        'Circuit Discount %': [15, 15, 15, 15, 15],
        'Colocation growth %': [20, 20, 20, 20, 20],
        'Target RFS(mm)': [6, 6, 6, 6, 6],
        '1yr apply % revenue': [5, 5, 5, 5, 5],
        'Churn %': [3, 3, 3, 3, 3]
      },
      chennai: {
        'Capacity to lease': [80, 80, 80, 80, 80],
        'Circuit Discount %': [15, 15, 15, 15, 15],
        'Colocation growth %': [20, 20, 20, 20, 20],
        'Target RFS(mm)': [6, 6, 6, 6, 6],
        '1yr apply % revenue': [5, 5, 5, 5, 5],
        'Churn %': [3, 3, 3, 3, 3]
      }
    });
  };

  // 접기/펼치기 토글 함수
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <section id="simulation">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">13. 🎯 Simulation - 통합 시뮬레이션</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          투자 비용, 수익 추정, COGS 관리, NPV 계산을 한 페이지에서 통합적으로 시뮬레이션할 수 있습니다. 
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

        {/* 1. NPV, IRR, 회수기간, 수익성지수 결과 카드들 */}
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

        {/* 통합 시뮬레이션 그리드 */}
        <div className="space-y-6">
          
          {/* 2. 투자 비용 시뮬레이션 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('investment')}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">💰 투자 비용 시뮬레이션</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSimulationInvestmentParams({
                        backboneDeviceCapex: COMMON_CONFIG.backboneDeviceCapex,
                        dcnOdfCapex: COMMON_CONFIG.dcnOdfCapex,
                        depreciationYears: COMMON_CONFIG.depreciationYears,
                        backboneMaintenanceOpex: COMMON_CONFIG.backboneMaintenanceOpex
                      });
                    }}
                    className="text-gray-600 hover:text-gray-800 text-sm underline"
                  >
                    기본값 리셋
                  </button>
                  <span className="text-sm text-gray-500">
                    {expandedSections.investment ? '접기' : '펼치기'}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.investment ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {expandedSections.investment && (
              <div className="px-6 pb-6">
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
                      연간 OPEX ($/월 × 12)
                    </label>
                    <input
                      type="number"
                      value={simulationInvestmentParams.backboneMaintenanceOpex}
                      onChange={(e) => handleInvestmentParameterChange('backboneMaintenanceOpex', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      step="10"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. 수익추정 시뮬레이션 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('revenue')}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">📈 수익추정 시뮬레이션</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSimulationRevenueParams({
                        baseCustomers: REGION_CONFIGS[activeRegion as 'mumbai' | 'chennai'].baseCustomers,
                        customersByYear: REGION_CONFIGS[activeRegion as 'mumbai' | 'chennai'].customersByYear,
                        basePrice: COMMON_CONFIG.basePrice,
                        priceDeclineRate: COMMON_CONFIG.priceDeclineRate,
                        mbpsPerCustomer: COMMON_CONFIG.mbpsPerCustomer
                      });
                    }}
                    className="text-gray-600 hover:text-gray-800 text-sm underline"
                  >
                    기본값 리셋
                  </button>
                  <span className="text-sm text-gray-500">
                    {expandedSections.revenue ? '접기' : '펼치기'}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.revenue ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {expandedSections.revenue && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      가격 하락률 (%)
                    </label>
                    <input
                      type="number"
                      value={(simulationRevenueParams.priceDeclineRate * 100).toFixed(1)}
                      onChange={(e) => handleRevenueParameterChange('priceDeclineRate', Number(e.target.value) / 100)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      고객당 Mbps
                    </label>
                    <input
                      type="number"
                      value={simulationRevenueParams.mbpsPerCustomer}
                      onChange={(e) => handleRevenueParameterChange('mbpsPerCustomer', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연도별 고객수
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {simulationRevenueParams.customersByYear.map((customers, index) => (
                      <div key={index}>
                        <label className="block text-xs text-gray-600 mb-1">
                          {2025 + index}
                        </label>
                        <input
                          type="number"
                          value={customers}
                          onChange={(e) => {
                            const newCustomers = [...simulationRevenueParams.customersByYear];
                            newCustomers[index] = Number(e.target.value);
                            setSimulationRevenueParams(prev => ({
                              ...prev,
                              customersByYear: newCustomers
                            }));
                          }}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0"
                          step="1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. COGS 시뮬레이션 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('cogs')}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">💼 COGS 시뮬레이션</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSimulationCogsData({
                        mumbai: REGION_CONFIGS.mumbai.cogsByYear,
                        chennai: REGION_CONFIGS.chennai.cogsByYear
                      });
                      setSimulationCogsItems({
                        mumbai: {
                          'Capacity to lease': [80, 80, 80, 80, 80],
                          'Circuit Discount %': [15, 15, 15, 15, 15],
                          'Colocation growth %': [20, 20, 20, 20, 20],
                          'Target RFS(mm)': [6, 6, 6, 6, 6],
                          '1yr apply % revenue': [5, 5, 5, 5, 5],
                          'Churn %': [3, 3, 3, 3, 3]
                        },
                        chennai: {
                          'Capacity to lease': [80, 80, 80, 80, 80],
                          'Circuit Discount %': [15, 15, 15, 15, 15],
                          'Colocation growth %': [20, 20, 20, 20, 20],
                          'Target RFS(mm)': [6, 6, 6, 6, 6],
                          '1yr apply % revenue': [5, 5, 5, 5, 5],
                          'Churn %': [3, 3, 3, 3, 3]
                        }
                      });
                    }}
                    className="text-gray-600 hover:text-gray-800 text-sm underline"
                  >
                    기본값 리셋
                  </button>
                  <span className="text-sm text-gray-500">
                    {expandedSections.cogs ? '접기' : '펼치기'}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.cogs ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {expandedSections.cogs && (
              <div className="px-6 pb-6">
                {/* COGS ASSUMPTION */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-700 mb-3">
                    COGS ASSUMPTION - {activeRegion === 'mumbai' ? '뭄바이' : '첸나이'}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">PARAMETER</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">VALUE</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">DESCRIPTION</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">Capacity to lease</td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            <div className="flex items-center">
                              <input
                                type="number"
                                value={cogsAssumption.capacityToLease.value}
                                onChange={(e) => handleAssumptionNumericChange('capacityToLease', Number(e.target.value))}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-xs"
                                min="0"
                              />
                              <span className="ml-2 text-gray-500 text-xs">{cogsAssumption.capacityToLease.unit}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">임대 가능한 용량 비율</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">Circuit Discount %</td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            <input
                              type="number"
                              value={cogsAssumption.circuitDiscountPercent}
                              onChange={(e) => handleAssumptionChange('circuitDiscountPercent', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              min="0"
                              max="100"
                              step="0.1"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">회선 할인율</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">Colocation growth %</td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            <input
                              type="number"
                              value={cogsAssumption.colocationGrowthPercent}
                              onChange={(e) => handleAssumptionChange('colocationGrowthPercent', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              min="0"
                              max="100"
                              step="0.1"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">공동위치 성장률</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">Target RFS(mm)</td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            <input
                              type="number"
                              value={cogsAssumption.targetRfsMonths}
                              onChange={(e) => handleAssumptionChange('targetRfsMonths', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              min="1"
                              max="24"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">목표 RFS 개월</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">1yr apply % revenue</td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            <input
                              type="number"
                              value={cogsAssumption.oneYearApplyPercentRevenue}
                              onChange={(e) => handleAssumptionChange('oneYearApplyPercentRevenue', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              min="0"
                              max="100"
                              step="0.1"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">1년 적용 매출 비율</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">Churn %</td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            <input
                              type="number"
                              value={cogsAssumption.churnPercent}
                              onChange={(e) => handleAssumptionChange('churnPercent', Number(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              min="0"
                              max="100"
                              step="0.1"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">이탈률</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* COGS 입력 */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-700 mb-3">
                    COGS (Cost of Goods Sold) 입력 - {activeRegion === 'mumbai' ? '뭄바이' : '첸나이'}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">항목</th>
                          {[2025, 2026, 2027, 2028, 2029].map(year => (
                            <th key={year} className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                              {year}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">Capacity to lease</td>
                          {simulationCogsItems[activeRegion as 'mumbai' | 'chennai']['Capacity to lease'].map((value, index) => (
                            <td key={index} className="px-4 py-2">
                              <input
                                type="number"
                                value={value}
                                onChange={(e) => handleCogsItemValueChange('Capacity to lease', index, e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">Circuit Discount %</td>
                          {simulationCogsItems[activeRegion as 'mumbai' | 'chennai']['Circuit Discount %'].map((value, index) => (
                            <td key={index} className="px-4 py-2">
                              <input
                                type="number"
                                value={value}
                                onChange={(e) => handleCogsItemValueChange('Circuit Discount %', index, e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">Colocation growth %</td>
                          {simulationCogsItems[activeRegion as 'mumbai' | 'chennai']['Colocation growth %'].map((value, index) => (
                            <td key={index} className="px-4 py-2">
                              <input
                                type="number"
                                value={value}
                                onChange={(e) => handleCogsItemValueChange('Colocation growth %', index, e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">Target RFS(mm)</td>
                          {simulationCogsItems[activeRegion as 'mumbai' | 'chennai']['Target RFS(mm)'].map((value, index) => (
                            <td key={index} className="px-4 py-2">
                              <input
                                type="number"
                                value={value}
                                onChange={(e) => handleCogsItemValueChange('Target RFS(mm)', index, e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">1yr apply % revenue</td>
                          {simulationCogsItems[activeRegion as 'mumbai' | 'chennai']['1yr apply % revenue'].map((value, index) => (
                            <td key={index} className="px-4 py-2">
                              <input
                                type="number"
                                value={value}
                                onChange={(e) => handleCogsItemValueChange('1yr apply % revenue', index, e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">Churn %</td>
                          {simulationCogsItems[activeRegion as 'mumbai' | 'chennai']['Churn %'].map((value, index) => (
                            <td key={index} className="px-4 py-2">
                              <input
                                type="number"
                                value={value}
                                onChange={(e) => handleCogsItemValueChange('Churn %', index, e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2 text-sm font-bold text-gray-900">총 COGS</td>
                          {simulationCogsData[activeRegion as 'mumbai' | 'chennai'].map((value, index) => (
                            <td key={index} className="px-4 py-2">
                              <input
                                type="number"
                                value={value}
                                onChange={(e) => handleCogsValueChange(index, e.target.value)}
                                className="w-full px-2 py-1 text-sm font-bold border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5. NPV 시뮬레이션 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('npv')}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">🎯 NPV 시뮬레이션</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {expandedSections.npv ? '접기' : '펼치기'}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections.npv ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {expandedSections.npv && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      할인율 (%)
                    </label>
                    <input
                      type="number"
                      value={(simulationNpvParams.discountRate * 100).toFixed(1)}
                      onChange={(e) => handleNpvParameterChange('discountRate', Number(e.target.value) / 100)}
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
                      value={(simulationNpvParams.taxRate * 100).toFixed(1)}
                      onChange={(e) => handleNpvParameterChange('taxRate', Number(e.target.value) / 100)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      영구성장률 (%)
                    </label>
                    <input
                      type="number"
                      value={(simulationNpvParams.growthRate * 100).toFixed(1)}
                      onChange={(e) => handleNpvParameterChange('growthRate', Number(e.target.value) / 100)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 6. 연도별 현금흐름 상세 테이블 */}
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
                  {formatCurrency(calculateTerminalValue(simulationResults.netCashFlows[4], simulationNpvParams.growthRate, simulationNpvParams.discountRate))}
                </td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
} 
