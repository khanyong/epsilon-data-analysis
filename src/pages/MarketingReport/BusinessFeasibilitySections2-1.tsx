import React, { useState, useEffect } from 'react';

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

// 단계별 실행 여부 추적
let globalInvestmentExecuted: { mumbai: boolean; chennai: boolean } = {
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

// 단계별 실행 여부 관리 함수들
export const setInvestmentExecuted = (region: 'mumbai' | 'chennai') => {
  globalInvestmentExecuted[region] = true;
};

export const isInvestmentExecuted = (region: 'mumbai' | 'chennai') => {
  return globalInvestmentExecuted[region];
};

// 투자 비용 계산 함수
export const calculateInvestmentCosts = (region: 'mumbai' | 'chennai') => {
  const params = globalInvestmentParams[region];
  
  const totalCapex = params.backboneDeviceCapex + params.dcnOdfCapex;
  const totalAnnualOpex = params.backboneMaintenanceOpex * 12; // 연간 OPEX에 12를 곱함 (월별 계산)
  
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
    const totalAnnualOpex = investmentParams.backboneMaintenanceOpex * 12; // 연간 OPEX에 12를 곱함 (월별 계산)
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
                step="1"
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
              <div className="text-sm text-gray-600 mt-1">유지보수 비용 (월별 × 12)</div>
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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">{formatCurrency(investmentParams.backboneMaintenanceOpex * 12)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneMaintenanceOpex * 12)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneMaintenanceOpex * 12)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneMaintenanceOpex * 12)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneMaintenanceOpex * 12)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(investmentParams.backboneMaintenanceOpex * 12)}</td>
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
    </section>
  );
} 