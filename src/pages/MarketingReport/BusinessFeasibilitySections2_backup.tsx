import React, { useState, useEffect } from 'react';
import { CogsSection } from '../../components/CogsSection';

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

// 투자 비용 시뮬레이션을 위한 타입 정의
interface InvestmentParameters {
  backboneDeviceCapex: number;
  dcnOdfCapex: number;
  depreciationYears: number;
  backboneMaintenanceOpex: number;
}

// 수익 추정 시뮬레이션을 위한 타입 정의
interface RevenueParameters {
  baseCustomers: number;
  customersByYear: number[]; // 연도별 고객수 (2025-2029)
  basePrice: number;
  priceDeclineRate: number;
  mbpsPerCustomer: number;
}

// 전역 상태로 투자 비용 파라미터 관리
let globalInvestmentParams: { mumbai: InvestmentParameters; chennai: InvestmentParameters } = {
  mumbai: {
    backboneDeviceCapex: 40000,
    dcnOdfCapex: 2000,
    depreciationYears: 6,
    backboneMaintenanceOpex: 1600
  },
  chennai: {
    backboneDeviceCapex: 40000,
    dcnOdfCapex: 2000,
    depreciationYears: 6,
    backboneMaintenanceOpex: 1600
  }
};

// 전역 상태로 수익 파라미터 관리
let globalRevenueParams: { mumbai: RevenueParameters; chennai: RevenueParameters } = {
  mumbai: {
    baseCustomers: 3,
    customersByYear: [3, 5, 9, 14, 24], // 연도별 고객수 (정수)
    basePrice: 1160,
    priceDeclineRate: 0.05, // 연간 5% 감소
    mbpsPerCustomer: 10
  },
  chennai: {
    baseCustomers: 5,
    customersByYear: [5, 8, 16, 32, 77], // 연도별 고객수 (정수)
    basePrice: 1160,
    priceDeclineRate: 0.05, // 연간 5% 감소
    mbpsPerCustomer: 10
  }
};

// 단계별 실행 여부 추적
let globalInvestmentExecuted: { mumbai: boolean; chennai: boolean } = {
  mumbai: false,
  chennai: false
};

let globalRevenueExecuted: { mumbai: boolean; chennai: boolean } = {
  mumbai: false,
  chennai: false
};

// 전역 함수로 투자 비용 파라미터 업데이트
export const updateGlobalInvestmentParams = (region: 'mumbai' | 'chennai', params: InvestmentParameters) => {
  globalInvestmentParams[region] = params;
};

// 전역 함수로 투자 비용 파라미터 가져오기
export const getGlobalInvestmentParams = (region: 'mumbai' | 'chennai') => {
  return globalInvestmentParams[region];
};

// 전역 함수로 수익 파라미터 업데이트
export const updateGlobalRevenueParams = (region: 'mumbai' | 'chennai', params: RevenueParameters) => {
  globalRevenueParams[region] = params;
};

// 전역 함수로 수익 파라미터 가져오기
export const getGlobalRevenueParams = (region: 'mumbai' | 'chennai') => {
  return globalRevenueParams[region];
};

// 단계별 실행 여부 관리 함수들
export const setInvestmentExecuted = (region: 'mumbai' | 'chennai') => {
  globalInvestmentExecuted[region] = true;
};

export const setRevenueExecuted = (region: 'mumbai' | 'chennai') => {
  globalRevenueExecuted[region] = true;
};

export const isInvestmentExecuted = (region: 'mumbai' | 'chennai') => {
  return globalInvestmentExecuted[region];
};

export const isRevenueExecuted = (region: 'mumbai' | 'chennai') => {
  return globalRevenueExecuted[region];
};

// 투자 비용 계산 함수
export const calculateInvestmentCosts = (region: 'mumbai' | 'chennai') => {
  const params = globalInvestmentParams[region];
  
  const totalCapex = params.backboneDeviceCapex + params.dcnOdfCapex;
  const totalAnnualOpex = params.backboneMaintenanceOpex;
  
  // 감가상각 계산 (직선법)
  const annualDepreciation = totalCapex / params.depreciationYears;
  
  // 연도별 감가상각 (2025년도부터 1년으로 변경)
  const depreciationByYear = [
    annualDepreciation,       // 2025년 (1년)
    annualDepreciation,       // 2026년
    annualDepreciation,       // 2027년
    annualDepreciation,       // 2028년
    annualDepreciation        // 2029년
  ];
  
  return {
    totalCapex,
    totalAnnualOpex,
    annualDepreciation,
    depreciationByYear,
    params
  };
};

// 수익 계산 함수
export const calculateRevenue = (region: 'mumbai' | 'chennai') => {
  const params = globalRevenueParams[region];
  const revenues: number[] = [];
  const customers: number[] = [];
  const salesUnits: number[] = [];
  const prices: number[] = [];

  for (let year = 0; year < 5; year++) {
    const customerCount = params.customersByYear[year];
    const price = params.basePrice * Math.pow(1 - params.priceDeclineRate, year);
    const salesUnit = customerCount * params.mbpsPerCustomer;
    const revenue = salesUnit * price;

    customers.push(customerCount);
    salesUnits.push(salesUnit);
    prices.push(price);
    revenues.push(revenue);
  }

  return { revenues, customers, salesUnits, prices };
};

export function BusinessFeasibilitySectionInvestment() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  
  // 투자 비용 시뮬레이션 파라미터 상태
  const [investmentParams, setInvestmentParams] = useState<InvestmentParameters>({
    backboneDeviceCapex: 40000,
    dcnOdfCapex: 2000,
    depreciationYears: 6,
    backboneMaintenanceOpex: 3200
  });

  // 지역 변경 시 파라미터 업데이트
  useEffect(() => {
    const currentParams = getGlobalInvestmentParams(activeRegion as 'mumbai' | 'chennai');
    setInvestmentParams(currentParams);
  }, [activeRegion]);

  // 파라미터 업데이트 핸들러
  const handleParameterChange = (param: keyof InvestmentParameters, value: number) => {
    setInvestmentParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // 실행 버튼 핸들러
  const handleApplyChanges = () => {
    updateGlobalInvestmentParams(activeRegion as 'mumbai' | 'chennai', investmentParams);
    setInvestmentExecuted(activeRegion as 'mumbai' | 'chennai');
    alert(`${activeRegion === 'mumbai' ? '뭄바이' : '첸나이'} 투자 비용 파라미터가 업데이트되었습니다.`);
  };

  // 새로고침 핸들러 (NPV 계산 즉시 반영)
  const handleRefresh = () => {
    window.location.reload();
  };

  // 기본값 리셋 핸들러
  const resetToDefaults = () => {
    const defaultParams = {
      backboneDeviceCapex: 40000,
      dcnOdfCapex: 2000,
      depreciationYears: 6,
      backboneMaintenanceOpex: 1600
    };
    setInvestmentParams(defaultParams);
  };

  // 현재 파라미터로 투자 비용 계산
  const calculateCurrentInvestment = () => {
    const totalCapex = investmentParams.backboneDeviceCapex + investmentParams.dcnOdfCapex;
    const totalAnnualOpex = investmentParams.backboneMaintenanceOpex;
    const annualDepreciation = totalCapex / investmentParams.depreciationYears;
    
    const depreciationByYear = [
      annualDepreciation,       // 2025년 (1년)
      annualDepreciation,       // 2026년
      annualDepreciation,       // 2027년
      annualDepreciation,       // 2028년
      annualDepreciation        // 2029년
    ];

    return {
      totalCapex,
      totalAnnualOpex,
      annualDepreciation,
      depreciationByYear
    };
  };

  const currentResults = calculateCurrentInvestment();

  return (
    <section id="investment">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">💰 투자 비용 분석</h2>
      
      <div className="mb-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2 text-blue-800">📋 비용 분석 가정</h3>
          <p className="text-blue-700 text-sm">
            <strong>Mumbai와 Chennai의 투자 비용을 동일하게 간주합니다.</strong> 
            두 지역 모두 동일한 네트워크 하드웨어 구성(Backbone device, DCN/ODF)을 사용하며, 
            장비 구매 비용과 유지보수 비용이 동일하게 적용됩니다.
          </p>
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
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 bg-gray-100'
              }`}
            >
              🏭 첸나이
            </button>
          </div>
        </div>

        {/* 투자 비용 시뮬레이션 폼 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">🎯 투자 비용 시뮬레이션</h3>
            <div className="flex space-x-2">
              <button
                onClick={resetToDefaults}
                className="text-gray-600 hover:text-gray-800 text-sm underline"
              >
                기본값으로 리셋
              </button>
              <button
                onClick={handleApplyChanges}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                실행
              </button>
            </div>
          </div>
          
          <div className="mb-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              💡 <strong>시뮬레이션 흐름 1단계:</strong> 이곳에서 투자 비용 파라미터를 설정한 후 "실행" 버튼을 클릭하세요. 
              이 단계가 완료되어야 다음 단계인 수익 추정으로 진행할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
            {/* Backbone Device CAPEX */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Backbone Device CAPEX ($)
              </label>
              <input
                type="number"
                value={investmentParams.backboneDeviceCapex}
                onChange={(e) => handleParameterChange('backboneDeviceCapex', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="1000"
              />
            </div>

            {/* DCN/ODF CAPEX */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                DCN/ODF CAPEX ($)
              </label>
              <input
                type="number"
                value={investmentParams.dcnOdfCapex}
                onChange={(e) => handleParameterChange('dcnOdfCapex', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="100"
              />
            </div>

            {/* 감가상각 연수 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                감가상각 연수
              </label>
              <input
                type="number"
                value={investmentParams.depreciationYears}
                onChange={(e) => handleParameterChange('depreciationYears', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="20"
                step="1"
              />
            </div>

            {/* Backbone Maintenance OPEX */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Backbone OPEX ($/년)
              </label>
              <input
                type="number"
                value={investmentParams.backboneMaintenanceOpex}
                onChange={(e) => handleParameterChange('backboneMaintenanceOpex', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="100"
              />
            </div>
          </div>
        </div>

        {/* 투자 비용 요약 */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-4 text-gray-800">📊 투자 비용 요약 - {activeRegion === 'mumbai' ? '뭄바이' : '첸나이'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-700 mb-2">총 CAPEX</h4>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(currentResults.totalCapex)}</div>
              <div className="text-sm text-gray-600 mt-1">초기 투자 비용</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-700 mb-2">연간 OPEX</h4>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(currentResults.totalAnnualOpex)}</div>
              <div className="text-sm text-gray-600 mt-1">유지보수 비용</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-700 mb-2">감가상각비</h4>
              <div className="text-2xl font-bold text-purple-600">{formatCurrency(currentResults.annualDepreciation)}</div>
              <div className="text-sm text-gray-600 mt-1">연간 감가상각 (총 CAPEX ÷ {investmentParams.depreciationYears}년)</div>
            </div>
          </div>
        </div>

        {/* CAPEX 상세 테이블 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">🏗️ CAPEX(HW) - On net HW (자본적 지출 - 네트워크 하드웨어) - {activeRegion === 'mumbai' ? '뭄바이' : '첸나이'}</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    항목 (Item)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    세부 항목 (Specific Item)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    지점 (Point)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    비용 소유자 (Cost Owner)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    CAPEX(USD)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    감가상각 연수(DEP YR)
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
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">On net HW</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Backbone device</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{activeRegion === 'mumbai' ? 'Mumbai' : 'Chennai'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(investmentParams.backboneDeviceCapex)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{investmentParams.depreciationYears}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency((investmentParams.backboneDeviceCapex / investmentParams.depreciationYears) * 1.0)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneDeviceCapex / investmentParams.depreciationYears)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneDeviceCapex / investmentParams.depreciationYears)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneDeviceCapex / investmentParams.depreciationYears)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneDeviceCapex / investmentParams.depreciationYears)}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">On net HW</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">DCN/ODF</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{activeRegion === 'mumbai' ? 'Mumbai' : 'Chennai'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(investmentParams.dcnOdfCapex)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{investmentParams.depreciationYears}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency((investmentParams.dcnOdfCapex / investmentParams.depreciationYears) * 1.0)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.dcnOdfCapex / investmentParams.depreciationYears)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.dcnOdfCapex / investmentParams.depreciationYears)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.dcnOdfCapex / investmentParams.depreciationYears)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.dcnOdfCapex / investmentParams.depreciationYears)}</td>
                </tr>
                <tr className={`font-semibold ${activeRegion === 'mumbai' ? 'bg-blue-50' : 'bg-orange-50'}`}>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b" colSpan={5}>총계</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">-</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(currentResults.depreciationByYear[0])}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(currentResults.depreciationByYear[1])}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(currentResults.depreciationByYear[2])}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(currentResults.depreciationByYear[3])}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(currentResults.depreciationByYear[4])}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* OPEX 상세 테이블 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">💼 OPEX(운영비용) - {activeRegion === 'mumbai' ? '뭄바이' : '첸나이'}</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    항목 (Item)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    세부 항목 (Specific Item)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    지점 (Point)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    비용 소유자 (Cost Owner)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    OPEX(yr) (USD)
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
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Maintenance Cost</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Backbone device</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{activeRegion === 'mumbai' ? 'Mumbai' : 'Chennai'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(investmentParams.backboneMaintenanceOpex)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneMaintenanceOpex)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneMaintenanceOpex)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneMaintenanceOpex)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneMaintenanceOpex)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneMaintenanceOpex)}</td>
                </tr>
                <tr className={`font-semibold ${activeRegion === 'mumbai' ? 'bg-blue-50' : 'bg-orange-50'}`}>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b" colSpan={4}>총계</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(currentResults.totalAnnualOpex)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(currentResults.totalAnnualOpex)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(currentResults.totalAnnualOpex)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(currentResults.totalAnnualOpex)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(currentResults.totalAnnualOpex)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(currentResults.totalAnnualOpex)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* COGS 섹션 추가 */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-6 text-gray-800">💰 COGS (Cost of Goods Sold) 관리</h3>
        
        {/* COGS 탭 */}
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
                🏙️ 뭄바이 COGS
              </button>
              <button
                onClick={() => setActiveRegion('chennai')}
                className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                  activeRegion === 'chennai'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 bg-gray-100'
                }`}
              >
                🏢 첸나이 COGS
              </button>
            </div>
          </div>

          {/* COGS 입력 및 결과 섹션 */}
          <CogsSection region={activeRegion as 'mumbai' | 'chennai'} />
        </div>
      </div>

      {/* 주요 특징 및 전략 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💰 가격 전략</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 초기 가격: $1,160/월</li>
            <li>• 네트워크 사업 특성: 연 8% 단가 감소</li>
            <li>• 기술 발전 및 경쟁 심화 반영</li>
            <li>• 지역 차별화 없음</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📊 수익 인식</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• 모든 계약: 3년 장기 계약</li>
            <li>• 단순 인식: 고객수 × 가격</li>
            <li>• 누적 고객 기반</li>
            <li>• 재계약으로 유지</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">🎯 고객 확보</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• <strong>첸나이 우선</strong>: 연 8개사 누적 (영업조직 매칭 기반)</li>
            <li>• <strong>뭄바이 후순위</strong>: 연 3개사 누적 (인프라 구축 후)</li>
            <li>• 3년 계약 유지</li>
            <li>• 기존 영업조직 활용</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionRevenue() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  
  // 수익 시뮬레이션 파라미터 상태
  const [revenueParams, setRevenueParams] = useState<RevenueParameters>({
    baseCustomers: 3,
    customersByYear: [3, 3.8, 4.7, 5.8, 7.2], // 뭄바이: 2029년 정확히 24명 목표
    basePrice: 1160,
    priceDeclineRate: 0.08,
    mbpsPerCustomer: 10
  });

  // 지역 변경 시 파라미터 업데이트
  useEffect(() => {
    const currentParams = getGlobalRevenueParams(activeRegion as 'mumbai' | 'chennai');
    setRevenueParams(currentParams);
  }, [activeRegion]);

  // 파라미터 업데이트 핸들러
  const handleParameterChange = (param: keyof RevenueParameters, value: number) => {
    setRevenueParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // 실행 버튼 핸들러
  const handleApplyChanges = () => {
    // 투자 비용 분석이 실행되었는지 확인
    if (!isInvestmentExecuted(activeRegion as 'mumbai' | 'chennai')) {
      const confirmed = window.confirm(
        `⚠️ 투자 비용 분석이 아직 실행되지 않았습니다.\n\n` +
        `현재 ${activeRegion === 'mumbai' ? '뭄바이' : '첸나이'} 투자 비용 파라미터:\n` +
        `• Backbone Device CAPEX: $${getGlobalInvestmentParams(activeRegion as 'mumbai' | 'chennai').backboneDeviceCapex.toLocaleString()}\n` +
        `• DCN/ODF CAPEX: $${getGlobalInvestmentParams(activeRegion as 'mumbai' | 'chennai').dcnOdfCapex.toLocaleString()}\n` +
        `• 연간 OPEX: $${(getGlobalInvestmentParams(activeRegion as 'mumbai' | 'chennai').backboneMaintenanceOpex).toLocaleString()}\n\n` +
        `이 값들을 확인하고 수익 추정을 진행하시겠습니까?`
      );
      
      if (!confirmed) {
        return;
      }
    }
    
    updateGlobalRevenueParams(activeRegion as 'mumbai' | 'chennai', revenueParams);
    setRevenueExecuted(activeRegion as 'mumbai' | 'chennai');
    alert(`${activeRegion === 'mumbai' ? '뭄바이' : '첸나이'} 수익 파라미터가 업데이트되었습니다.`);
  };

  // 새로고침 핸들러 (NPV 계산 즉시 반영)
  const handleRefresh = () => {
    // 페이지 새로고침으로 NPV 계산에 즉시 반영
    window.location.reload();
  };

  // 기본값 리셋 핸들러
  const resetToDefaults = () => {
    const defaultParams = {
      baseCustomers: activeRegion === 'mumbai' ? 3 : 5,
      customersByYear: activeRegion === 'mumbai' ? [3, 5, 9, 14, 24] : [5, 8, 16, 32, 77], // 연도별 고객수 (정수)
      basePrice: 1160,
      priceDeclineRate: 0.05,
      mbpsPerCustomer: 10
    };
    setRevenueParams(defaultParams);
  };

  // 현재 파라미터로 수익 계산
  const calculateCurrentRevenue = () => {
    const revenues: number[] = [];
    const customers: number[] = [];
    const salesUnits: number[] = [];
    const prices: number[] = [];

    for (let year = 0; year < 5; year++) {
      const customerCount = revenueParams.customersByYear[year];
      const price = revenueParams.basePrice * Math.pow(1 - revenueParams.priceDeclineRate, year);
      const salesUnit = customerCount * revenueParams.mbpsPerCustomer;
      const revenue = salesUnit * price;

      customers.push(customerCount);
      salesUnits.push(salesUnit);
      prices.push(price);
      revenues.push(revenue);
    }

    return { revenues, customers, salesUnits, prices };
  };

  const currentResults = calculateCurrentRevenue();

  return (
    <section id="revenue">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">💰 수익 추정</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          인도 뭄바이, 첸나이 지역 진출 시 예상 수익을 분석합니다. 
          고객 수, 단가, 성장률 등의 변수를 조정하여 다양한 시나리오를 시뮬레이션할 수 있습니다.
        </p>
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

        {/* 수익 시뮬레이션 폼 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">🎯 수익 시뮬레이션</h3>
            <div className="flex space-x-2">
              <button
                onClick={resetToDefaults}
                className="text-gray-600 hover:text-gray-800 text-sm underline"
              >
                기본값으로 리셋
              </button>
              <button
                onClick={handleApplyChanges}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                실행
              </button>
            </div>
          </div>
          
          <div className="mb-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              💡 <strong>시뮬레이션 흐름 2단계:</strong> 이곳에서 수익 파라미터를 설정한 후 "실행" 버튼을 클릭하세요. 
              투자 비용 분석이 먼저 실행되어야 하며, 이 단계가 완료되어야 최종 NPV 계산이 가능합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
            {/* 2025년 고객수 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                2025년 고객수
              </label>
              <input
                type="number"
                value={revenueParams.customersByYear[0]}
                onChange={(e) => {
                  const newCustomersByYear = [...revenueParams.customersByYear];
                  newCustomersByYear[0] = Math.round(Number(e.target.value));
                  setRevenueParams(prev => ({
                    ...prev,
                    customersByYear: newCustomersByYear
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="1"
              />
            </div>

            {/* 2026년 고객수 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                2026년 고객수
              </label>
              <input
                type="number"
                value={revenueParams.customersByYear[1]}
                onChange={(e) => {
                  const newCustomersByYear = [...revenueParams.customersByYear];
                  newCustomersByYear[1] = Math.round(Number(e.target.value));
                  setRevenueParams(prev => ({
                    ...prev,
                    customersByYear: newCustomersByYear
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="1"
              />
            </div>

            {/* 2027년 고객수 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                2027년 고객수
              </label>
              <input
                type="number"
                value={revenueParams.customersByYear[2]}
                onChange={(e) => {
                  const newCustomersByYear = [...revenueParams.customersByYear];
                  newCustomersByYear[2] = Math.round(Number(e.target.value));
                  setRevenueParams(prev => ({
                    ...prev,
                    customersByYear: newCustomersByYear
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="1"
              />
            </div>

            {/* 2028년 고객수 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                2028년 고객수
              </label>
              <input
                type="number"
                value={revenueParams.customersByYear[3]}
                onChange={(e) => {
                  const newCustomersByYear = [...revenueParams.customersByYear];
                  newCustomersByYear[3] = Math.round(Number(e.target.value));
                  setRevenueParams(prev => ({
                    ...prev,
                    customersByYear: newCustomersByYear
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="1"
              />
            </div>

            {/* 2029년 고객수 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                2029년 고객수
              </label>
              <input
                type="number"
                value={revenueParams.customersByYear[4]}
                onChange={(e) => {
                  const newCustomersByYear = [...revenueParams.customersByYear];
                  newCustomersByYear[4] = Math.round(Number(e.target.value));
                  setRevenueParams(prev => ({
                    ...prev,
                    customersByYear: newCustomersByYear
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start mt-4">
            {/* 기본 단가 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                기본 단가 ($/Mbps)
              </label>
              <input
                type="number"
                value={revenueParams.basePrice}
                onChange={(e) => handleParameterChange('basePrice', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="10"
              />
            </div>

            {/* 단가 감소율 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                단가 감소율 (%)
              </label>
              <input
                type="number"
                value={(revenueParams.priceDeclineRate * 100).toFixed(1)}
                onChange={(e) => handleParameterChange('priceDeclineRate', Number(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="50"
                step="0.1"
              />
            </div>

            {/* 고객당 Mbps */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                고객당 Mbps
              </label>
              <input
                type="number"
                value={revenueParams.mbpsPerCustomer}
                onChange={(e) => handleParameterChange('mbpsPerCustomer', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                step="1"
              />
            </div>
          </div>
        </div>

        {/* 수익 추정 테이블 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-inner p-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">📊 연도별 수익 추정 - {activeRegion === 'mumbai' ? '뭄바이' : '첸나이'}</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    구분
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    2025
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    2026
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    2027
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    2028
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    2029
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">고객 수</td>
                  {currentResults.customers.map((customer, index) => (
                    <td key={index} className="px-4 py-3 text-sm text-gray-900 border-b text-center">
                      {customer.toFixed(1)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">판매 단위 (Mbps)</td>
                  {currentResults.salesUnits.map((unit, index) => (
                    <td key={index} className="px-4 py-3 text-sm text-gray-900 border-b text-center">
                      {unit.toFixed(0)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">단가 (USD)</td>
                  {currentResults.prices.map((price, index) => (
                    <td key={index} className="px-4 py-3 text-sm text-gray-900 border-b text-center">
                      {formatCurrency(price)}
                    </td>
                  ))}
                </tr>
                <tr className={`font-semibold ${activeRegion === 'mumbai' ? 'bg-blue-50' : 'bg-orange-50'}`}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">매출 (USD)</td>
                  {currentResults.revenues.map((revenue, index) => (
                    <td key={index} className="px-4 py-3 text-sm text-gray-900 border-b text-center font-medium">
                      {formatCurrency(revenue)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* COGS 섹션 추가 */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-6 text-gray-800">💰 COGS (Cost of Goods Sold) 관리</h3>
          
          {/* COGS 탭 */}
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
                  🏙️ 뭄바이 COGS
                </button>
                <button
                  onClick={() => setActiveRegion('chennai')}
                  className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
                    activeRegion === 'chennai'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 bg-gray-100'
                  }`}
                >
                  🏢 첸나이 COGS
                </button>
              </div>
            </div>

            {/* COGS 입력 및 결과 섹션 */}
            <CogsSection region={activeRegion as 'mumbai' | 'chennai'} />
          </div>
        </div>

        {/* 주요 특징 및 전략 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💰 가격 전략</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 초기 가격: $1,160/월</li>
              <li>• 네트워크 사업 특성: 연 8% 단가 감소</li>
              <li>• 기술 발전 및 경쟁 심화 반영</li>
              <li>• 지역 차별화 없음</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">📊 수익 인식</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 모든 계약: 3년 장기 계약</li>
              <li>• 단순 인식: 고객수 × 가격</li>
              <li>• 누적 고객 기반</li>
              <li>• 재계약으로 유지</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">🎯 고객 확보</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• <strong>첸나이 우선</strong>: 연 8개사 누적 (영업조직 매칭 기반)</li>
              <li>• <strong>뭄바이 후순위</strong>: 연 3개사 누적 (인프라 구축 후)</li>
              <li>• 3년 계약 유지</li>
              <li>• 기존 영업조직 활용</li>
            </ul>
          </div>
        </div>
      </section>
    );
  } 