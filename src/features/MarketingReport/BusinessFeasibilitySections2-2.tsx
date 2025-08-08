import React, { useState, useEffect } from 'react';
import { COMMON_CONFIG, REGION_CONFIGS } from '../../config/businessConfig';
import { CogsSection } from '../../components/CogsSection';
import { isInvestmentExecuted, getGlobalInvestmentParams } from './BusinessFeasibilitySections2-1';

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

// 수익 추정 시뮬레이션을 위한 타입 정의
interface RevenueParameters {
  baseCustomers: number;
  customersByYear: number[]; // 연도별 고객수 (2025-2029)
  basePrice: number;
  priceDeclineRate: number;
  mbpsPerCustomer: number;
}

// 전역 상태로 수익 파라미터 관리
let globalRevenueParams: { mumbai: RevenueParameters; chennai: RevenueParameters } = {
  mumbai: {
    baseCustomers: 3,
    customersByYear: [3, 5, 9, 14, 24], // 연도별 고객수 (정수)
    basePrice: COMMON_CONFIG.basePrice,
    priceDeclineRate: 0.05, // 연간 5% 감소
    mbpsPerCustomer: 10
  },
  chennai: {
    baseCustomers: 5,
    customersByYear: [5, 8, 16, 32, 77], // 연도별 고객수 (정수)
    basePrice: COMMON_CONFIG.basePrice,
    priceDeclineRate: 0.05, // 연간 5% 감소
    mbpsPerCustomer: 10
  }
};

let globalRevenueExecuted: { mumbai: boolean; chennai: boolean } = {
  mumbai: false,
  chennai: false
};

// 전역 함수로 수익 파라미터 업데이트
export const updateGlobalRevenueParams = (region: 'mumbai' | 'chennai', params: RevenueParameters) => {
  globalRevenueParams[region] = params;
};

// 전역 함수로 수익 파라미터 가져오기
export const getGlobalRevenueParams = (region: 'mumbai' | 'chennai') => {
  return globalRevenueParams[region];
};

// COGS 데이터 전역 관리 (CogsSection에서 사용)
// 기본 COGS 데이터 정의
const DEFAULT_COGS_DATA = {
  mumbai: [8317, 103554, 113934, 141219, 152811],
  chennai: [8317, 103554, 113934, 141219, 152811]
};

let globalCogsData: { mumbai: number[]; chennai: number[] } = {
  mumbai: [...DEFAULT_COGS_DATA.mumbai],
  chennai: [...DEFAULT_COGS_DATA.chennai]
};

// 전역 함수로 COGS 데이터 가져오기
export const getGlobalCogsData = (region: 'mumbai' | 'chennai') => {
  return globalCogsData[region];
};

// 전역 함수로 COGS 데이터 업데이트
export const updateGlobalCogsData = (region: 'mumbai' | 'chennai', cogsByYear: number[]) => {
  globalCogsData[region] = cogsByYear;
};

// 전역 함수로 COGS 데이터를 기본값으로 리셋
export const resetGlobalCogsData = (region: 'mumbai' | 'chennai') => {
  globalCogsData[region] = [...DEFAULT_COGS_DATA[region]];
};

// CogsSection에서 호출할 전역 리셋 함수
export const resetCogsSectionData = (region: 'mumbai' | 'chennai') => {
  // 전역 COGS 데이터를 기본값으로 리셋
  globalCogsData[region] = [...DEFAULT_COGS_DATA[region]];
  
  // 페이지 새로고침 없이 전역 상태 업데이트를 트리거
  // 이벤트를 발생시켜 다른 컴포넌트들이 업데이트를 감지하도록 함
  window.dispatchEvent(new CustomEvent('cogsDataReset', { detail: { region } }));
};

export const setRevenueExecuted = (region: 'mumbai' | 'chennai') => {
  globalRevenueExecuted[region] = true;
};

export const isRevenueExecuted = (region: 'mumbai' | 'chennai') => {
  return globalRevenueExecuted[region];
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

export function BusinessFeasibilitySectionRevenue() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  
  // 수익 시뮬레이션 파라미터 상태
  const [revenueParams, setRevenueParams] = useState<RevenueParameters>({
    baseCustomers: 3,
    customersByYear: [3, 3.8, 4.7, 5.8, 7.2], // 뭄바이: 2029년 정확히 24명 목표
    basePrice: COMMON_CONFIG.basePrice,
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
      basePrice: COMMON_CONFIG.basePrice,
      priceDeclineRate: COMMON_CONFIG.priceDeclineRate,
      mbpsPerCustomer: COMMON_CONFIG.mbpsPerCustomer
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">6. 💰 5년 매출 추정</h2>
      
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
                기본 단가 ($/Mbps) - 2025년 기준
              </label>
              <input
                type="number"
                value={revenueParams.basePrice}
                onChange={(e) => handleParameterChange('basePrice', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="10"
              />
              <div className="text-xs text-gray-500 mt-1">
                매년 {(revenueParams.priceDeclineRate * 100).toFixed(1)}%씩 하락 (2026년: ${(revenueParams.basePrice * (1 - revenueParams.priceDeclineRate)).toFixed(0)}, 2027년: ${(revenueParams.basePrice * Math.pow(1 - revenueParams.priceDeclineRate, 2)).toFixed(0)})
              </div>
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
      </div>
    </section>
  );
} 