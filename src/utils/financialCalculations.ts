/**
 * 재무 계산 유틸리티
 * NPV, IRR, DCF 분석을 위한 계산 함수들
 */

export interface CashFlow {
  year: number;
  cashFlow: number;
}

export interface ProjectData {
  initialInvestment: number;
  cashFlows: CashFlow[];
  discountRate: number;
}

export interface FinancialMetrics {
  npv: number;
  irr: number | string; // IRR이 음수인 경우 "추정불가" 문자열
  paybackPeriod: number;
  profitabilityIndex: number;
}

/**
 * NPV (Net Present Value) 계산
 * @param initialInvestment 초기 투자금액
 * @param cashFlows 연도별 현금흐름 배열
 * @param discountRate 할인율 (소수점)
 * @returns NPV 값
 */
export function calculateNPV(
  initialInvestment: number,
  cashFlows: CashFlow[],
  discountRate: number
): number {
  let npv = -initialInvestment;
  
  cashFlows.forEach(cf => {
    const presentValue = cf.cashFlow / Math.pow(1 + discountRate, cf.year);
    npv += presentValue;
  });
  
  return npv;
}

/**
 * IRR (Internal Rate of Return) 계산
 * @param initialInvestment 초기 투자금액
 * @param cashFlows 연도별 현금흐름 배열
 * @param guess 초기 추정값 (소수점)
 * @param tolerance 허용 오차
 * @param maxIterations 최대 반복 횟수
 * @returns IRR (소수점) 또는 "추정불가"
 */
export function calculateIRR(
  initialInvestment: number,
  cashFlows: CashFlow[],
  guess: number = 0.1,
  tolerance: number = 0.0001,
  maxIterations: number = 100
): number | string {
  // 총 현금흐름이 음수인지 확인
  const totalCashFlow = cashFlows.reduce((sum, cf) => sum + cf.cashFlow, 0);
  if (totalCashFlow <= 0) {
    return "추정불가";
  }
  
  // 여러 초기값을 시도
  const initialGuesses = [0.1, 0.05, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5];
  
  for (const initialGuess of initialGuesses) {
    try {
      let rate = initialGuess;
      
      for (let i = 0; i < maxIterations; i++) {
        const npv = calculateNPV(initialInvestment, cashFlows, rate);
        
        // NPV의 도함수 계산 (현금흐름의 가중 평균)
        let derivative = 0;
        cashFlows.forEach(cf => {
          derivative -= cf.cashFlow * cf.year / Math.pow(1 + rate, cf.year + 1);
        });
        
        // 도함수가 0에 가까우면 다른 초기값 시도
        if (Math.abs(derivative) < 1e-10) {
          break;
        }
        
        const newRate = rate - npv / derivative;
        
        // 비정상적인 값 체크
        if (isNaN(newRate) || !isFinite(newRate) || newRate < -0.99) {
          break;
        }
        
        if (Math.abs(newRate - rate) < tolerance) {
          // 결과가 합리적인 범위인지 확인
          if (newRate >= -0.99 && newRate <= 10) {
            return newRate;
          }
        }
        
        rate = newRate;
      }
    } catch (error) {
      // 에러가 발생하면 다음 초기값 시도
      continue;
    }
  }
  
  // 모든 시도가 실패한 경우
  return "추정불가";
}

/**
 * 회수기간 (Payback Period) 계산
 * @param initialInvestment 초기 투자금액
 * @param cashFlows 연도별 현금흐름 배열
 * @returns 회수기간 (년)
 */
export function calculatePaybackPeriod(
  initialInvestment: number,
  cashFlows: CashFlow[]
): number {
  let cumulativeCashFlow = -initialInvestment;
  
  for (let i = 0; i < cashFlows.length; i++) {
    cumulativeCashFlow += cashFlows[i].cashFlow;
    
    if (cumulativeCashFlow >= 0) {
      // 부분 년도 계산
      if (i === 0) return 0;
      
      const previousCumulative = cumulativeCashFlow - cashFlows[i].cashFlow;
      const fraction = Math.abs(previousCumulative) / cashFlows[i].cashFlow;
      return i + fraction;
    }
  }
  
  return -1; // 회수되지 않음
}

/**
 * 수익성 지수 (Profitability Index) 계산
 * @param initialInvestment 초기 투자금액
 * @param cashFlows 연도별 현금흐름 배열
 * @param discountRate 할인율 (소수점)
 * @returns 수익성 지수
 */
export function calculateProfitabilityIndex(
  initialInvestment: number,
  cashFlows: CashFlow[],
  discountRate: number
): number {
  const npv = calculateNPV(initialInvestment, cashFlows, discountRate);
  return (npv + initialInvestment) / initialInvestment;
}

/**
 * 종합 재무 지표 계산
 * @param projectData 프로젝트 데이터
 * @returns 재무 지표 객체
 */
export function calculateFinancialMetrics(projectData: ProjectData): FinancialMetrics {
  const { initialInvestment, cashFlows, discountRate } = projectData;
  
  const npv = calculateNPV(initialInvestment, cashFlows, discountRate);
  const irr = calculateIRR(initialInvestment, cashFlows);
  const paybackPeriod = calculatePaybackPeriod(initialInvestment, cashFlows);
  const profitabilityIndex = calculateProfitabilityIndex(initialInvestment, cashFlows, discountRate);
  
  return {
    npv,
    irr,
    paybackPeriod,
    profitabilityIndex
  };
}

/**
 * WACC (Weighted Average Cost of Capital) 계산
 * @param equityCost 자본비용 (소수점)
 * @param debtCost 부채비용 (소수점)
 * @param taxRate 세율 (소수점)
 * @param equityWeight 자본 비중 (소수점)
 * @param debtWeight 부채 비중 (소수점)
 * @returns WACC (소수점)
 */
export function calculateWACC(
  equityCost: number,
  debtCost: number,
  taxRate: number,
  equityWeight: number,
  debtWeight: number
): number {
  const afterTaxDebtCost = debtCost * (1 - taxRate);
  return equityCost * equityWeight + afterTaxDebtCost * debtWeight;
}

/**
 * 현금흐름 테이블 생성
 * @param revenues 연도별 매출
 * @param costs 연도별 비용
 * @param initialInvestment 초기 투자금액
 * @returns 현금흐름 배열
 */
export function generateCashFlows(
  revenues: number[],
  costs: number[],
  initialInvestment: number
): CashFlow[] {
  const cashFlows: CashFlow[] = [];
  
  revenues.forEach((revenue, index) => {
    const netCashFlow = revenue - costs[index];
    cashFlows.push({
      year: index + 1,
      cashFlow: netCashFlow
    });
  });
  
  return cashFlows;
}

/**
 * 통화 포맷팅
 * @param amount 금액
 * @param currency 통화 (기본값: 'USD')
 * @returns 포맷된 통화 문자열
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * 퍼센트 포맷팅
 * @param value 소수점 값
 * @param decimals 소수점 자릿수 (기본값: 2)
 * @returns 포맷된 퍼센트 문자열
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * 계산식 검증을 위한 상세 계산 과정 출력
 * @param projectData 프로젝트 데이터
 * @returns 상세 계산 과정 문자열
 */
export function generateCalculationDetails(projectData: ProjectData): string {
  const { initialInvestment, cashFlows, discountRate } = projectData;
  
  let details = `=== 재무 계산 상세 과정 ===\n\n`;
  details += `초기 투자금액: ${formatCurrency(initialInvestment)}\n`;
  details += `할인율: ${formatPercentage(discountRate)}\n\n`;
  
  details += `현금흐름 분석:\n`;
  let cumulativeNPV = -initialInvestment;
  details += `연도 0: ${formatCurrency(-initialInvestment)} (초기 투자)\n`;
  
  cashFlows.forEach(cf => {
    const presentValue = cf.cashFlow / Math.pow(1 + discountRate, cf.year);
    cumulativeNPV += presentValue;
    details += `연도 ${cf.year}: ${formatCurrency(cf.cashFlow)} → 현재가치: ${formatCurrency(presentValue)} (할인율 적용)\n`;
  });
  
  details += `\n총 NPV: ${formatCurrency(cumulativeNPV)}\n`;
  
  try {
    const irr = calculateIRR(initialInvestment, cashFlows);
    details += `IRR: ${typeof irr === 'string' ? irr : formatPercentage(irr)}\n`;
  } catch (error) {
    details += `IRR: 계산 실패\n`;
  }
  
  const paybackPeriod = calculatePaybackPeriod(initialInvestment, cashFlows);
  details += `회수기간: ${paybackPeriod >= 0 ? `${paybackPeriod.toFixed(2)}년` : '회수되지 않음'}\n`;
  
  const profitabilityIndex = calculateProfitabilityIndex(initialInvestment, cashFlows, discountRate);
  details += `수익성 지수: ${profitabilityIndex.toFixed(2)}\n`;
  
  return details;
} 