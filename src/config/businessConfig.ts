// 중앙화된 비즈니스 설정 파일
// 모든 BusinessFeasibilitySections 파일에서 공통으로 사용되는 설정값들을 관리

// 공통 기본 설정
export const COMMON_CONFIG = {
  basePrice: 1000,                    // 기본 단가 (Mbps당)
  priceDeclineRate: 0.05,            // 가격 하락률 (5%)
  mbpsPerCustomer: 10,               // 고객당 Mbps
  discountRate: 0.12,                // 할인율 (12% WACC)
  taxRate: 0.25,                     // 세율 (25%)
  depreciationYears: 6,              // 감가상각 연수
  backboneDeviceCapex: 40000,        // Backbone Device CAPEX
  dcnOdfCapex: 2000,                 // DCN ODF CAPEX
  backboneMaintenanceOpex: 133       // Backbone Maintenance OPEX
};

// 지역별 기본 설정
export const REGION_CONFIGS = {
  mumbai: {
    baseCustomers: 3,
    customersByYear: [3, 5, 9, 14, 24],
    cogsByYear: [20820, 43440, 67740, 93840, 122040], // 기본값
    depreciationByYear: [3500, 7000, 7000, 7000, 7000]
  },
  chennai: {
    baseCustomers: 5,
    customersByYear: [5, 8, 16, 32, 77],
    cogsByYear: [55520, 111040, 166560, 222080, 277600], // 기본값
    depreciationByYear: [3500, 7000, 7000, 7000, 7000]
  }
};

// 설정 타입 정의
export interface CommonConfig {
  basePrice: number;
  priceDeclineRate: number;
  mbpsPerCustomer: number;
  discountRate: number;
  taxRate: number;
  depreciationYears: number;
  backboneDeviceCapex: number;
  dcnOdfCapex: number;
  backboneMaintenanceOpex: number;
}

export interface RegionConfig {
  baseCustomers: number;
  customersByYear: number[];
  cogsByYear: number[];
  depreciationByYear: number[];
}

export interface RegionConfigs {
  mumbai: RegionConfig;
  chennai: RegionConfig;
}

// 설정 업데이트 함수 (필요시 사용)
export const updateCommonConfig = (updates: Partial<CommonConfig>) => {
  Object.assign(COMMON_CONFIG, updates);
};

export const updateRegionConfig = (region: 'mumbai' | 'chennai', updates: Partial<RegionConfig>) => {
  Object.assign(REGION_CONFIGS[region], updates);
}; 