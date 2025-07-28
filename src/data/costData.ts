/**
 * 비용 데이터 정의
 * Chennai와 Mumbai의 CAPEX, OPEX 상세 데이터
 */

export interface CostItem {
  item: string;
  specificItem: string;
  point: string;
  costOwner: string;
  capex?: number;
  opexYr?: number;
  depYr?: number;
  dep?: number;
  cost2025: number;
  cost2026: number;
  cost2027: number;
  cost2028: number;
  cost2029: number;
}

// Chennai CAPEX 데이터
export const chennaiCapexData: CostItem[] = [
  {
    item: 'On net HW',
    specificItem: 'Backbone device',
    point: 'Chennai',
    costOwner: 'Epsilon',
    capex: 40000,
    depYr: 10,
    dep: 4000,
    cost2025: 2000,
    cost2026: 4000,
    cost2027: 4000,
    cost2028: 4000,
    cost2029: 4000
  },
  {
    item: 'On net HW',
    specificItem: 'DCN/ODF',
    point: 'Chennai',
    costOwner: 'Epsilon',
    capex: 1000,
    depYr: 10,
    dep: 100,
    cost2025: 50,
    cost2026: 100,
    cost2027: 100,
    cost2028: 100,
    cost2029: 100
  }
];

// Chennai OPEX 데이터
export const chennaiOpexData: CostItem[] = [
  {
    item: 'Maintenance Cost',
    specificItem: 'Backbone device',
    point: 'Chennai',
    costOwner: 'Epsilon',
    opexYr: 1600,
    cost2025: 1600,
    cost2026: 1600,
    cost2027: 1600,
    cost2028: 1600,
    cost2029: 1600
  }
];

// Mumbai CAPEX 데이터 (Chennai와 동일)
export const mumbaiCapexData: CostItem[] = [
  {
    item: 'On net HW',
    specificItem: 'Backbone device',
    point: 'Mumbai',
    costOwner: 'Epsilon',
    capex: 40000,
    depYr: 10,
    dep: 4000,
    cost2025: 2000,
    cost2026: 4000,
    cost2027: 4000,
    cost2028: 4000,
    cost2029: 4000
  },
  {
    item: 'On net HW',
    specificItem: 'DCN/ODF',
    point: 'Mumbai',
    costOwner: 'Epsilon',
    capex: 1000,
    depYr: 10,
    dep: 100,
    cost2025: 50,
    cost2026: 100,
    cost2027: 100,
    cost2028: 100,
    cost2029: 100
  }
];

// Mumbai OPEX 데이터 (Chennai와 동일)
export const mumbaiOpexData: CostItem[] = [
  {
    item: 'Maintenance Cost',
    specificItem: 'Backbone device',
    point: 'Mumbai',
    costOwner: 'Epsilon',
    opexYr: 1600,
    cost2025: 1600,
    cost2026: 1600,
    cost2027: 1600,
    cost2028: 1600,
    cost2029: 1600
  }
];

// 비용 계산 유틸리티 함수들
export const calculateTotalCapex = (data: CostItem[]): number => {
  return data.reduce((sum, item) => sum + (item.capex || 0), 0);
};

export const calculateTotalOpex = (data: CostItem[]): number => {
  return data.reduce((sum, item) => sum + (item.opexYr || 0), 0);
};

export const calculateAnnualCosts = (data: CostItem[], year: 'cost2025' | 'cost2026' | 'cost2027' | 'cost2028' | 'cost2029'): number => {
  return data.reduce((sum, item) => sum + item[year], 0);
};

export const calculateTotalDepreciation = (data: CostItem[]): number => {
  return data.reduce((sum, item) => sum + (item.dep || 0), 0);
};

// 지역별 총 비용 계산
export const getChennaiTotalCosts = () => {
  const capex = calculateTotalCapex(chennaiCapexData);
  const opex = calculateTotalOpex(chennaiOpexData);
  const annualCosts = {
    2025: calculateAnnualCosts([...chennaiCapexData, ...chennaiOpexData], 'cost2025'),
    2026: calculateAnnualCosts([...chennaiCapexData, ...chennaiOpexData], 'cost2026'),
    2027: calculateAnnualCosts([...chennaiCapexData, ...chennaiOpexData], 'cost2027'),
    2028: calculateAnnualCosts([...chennaiCapexData, ...chennaiOpexData], 'cost2028'),
    2029: calculateAnnualCosts([...chennaiCapexData, ...chennaiOpexData], 'cost2029')
  };
  
  return { capex, opex, annualCosts };
};

export const getMumbaiTotalCosts = () => {
  const capex = calculateTotalCapex(mumbaiCapexData);
  const opex = calculateTotalOpex(mumbaiOpexData);
  const annualCosts = {
    2025: calculateAnnualCosts([...mumbaiCapexData, ...mumbaiOpexData], 'cost2025'),
    2026: calculateAnnualCosts([...mumbaiCapexData, ...mumbaiOpexData], 'cost2026'),
    2027: calculateAnnualCosts([...mumbaiCapexData, ...mumbaiOpexData], 'cost2027'),
    2028: calculateAnnualCosts([...mumbaiCapexData, ...mumbaiOpexData], 'cost2028'),
    2029: calculateAnnualCosts([...mumbaiCapexData, ...mumbaiOpexData], 'cost2029')
  };
  
  return { capex, opex, annualCosts };
}; 