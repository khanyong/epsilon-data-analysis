// 분할된 파일들을 import
export { BusinessFeasibilitySectionInvestment } from './BusinessFeasibilitySections2-1';
export { BusinessFeasibilitySectionRevenue } from './BusinessFeasibilitySections2-2';

// 전역 함수들도 export
export { 
  updateGlobalInvestmentParams,
  getGlobalInvestmentParams,
  setInvestmentExecuted,
  isInvestmentExecuted,
  calculateInvestmentCosts
} from './BusinessFeasibilitySections2-1';

export {
  updateGlobalRevenueParams,
  getGlobalRevenueParams,
  setRevenueExecuted,
  isRevenueExecuted,
  calculateRevenue
} from './BusinessFeasibilitySections2-2'; 