import React, { useState } from 'react';

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

export function BusinessFeasibilitySectionInvestment() {
  const [activeRegion, setActiveRegion] = useState('mumbai');

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
            뭄바이
          </button>
          <button
            onClick={() => setActiveRegion('chennai')}
            className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-colors ${
              activeRegion === 'chennai'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 bg-gray-100'
            }`}
          >
            첸나이
          </button>
        </div>
      </div>

      {/* CAPEX 테이블 */}
      {activeRegion === 'mumbai' && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-blue-800">🏗️ CAPEX(HW) - On net HW (자본적 지출 - 네트워크 하드웨어) - 뭄바이</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    항목 (Item)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    지점 (Point)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    비용 소유자 (Cost Owner)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    CAPEX (USD)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    감가상각 연수 (Dep yr)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    감가상각비 (Dep)
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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Mumbai</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$40,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">10</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$2,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$4,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$4,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$4,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$4,000</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">On net HW</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">DCN/ODF</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Mumbai</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$1,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">10</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$50</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$100</td>
                </tr>
                <tr className="bg-blue-50 font-semibold">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b" colSpan={4}>총계</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$41,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">-</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$2,050</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$4,100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$4,100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$4,100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$4,100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeRegion === 'chennai' && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-orange-800">🏗️ CAPEX(HW) - On net HW (자본적 지출 - 네트워크 하드웨어) - 첸나이</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    항목 (Item)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    지점 (Point)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    비용 소유자 (Cost Owner)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    CAPEX (USD)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    감가상각 연수 (Dep yr)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    감가상각비 (Dep)
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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Chennai</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$40,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">10</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$2,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$4,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$4,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$4,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$4,000</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">On net HW</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">DCN/ODF</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Chennai</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$1,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">10</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$50</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$100</td>
                </tr>
                <tr className="bg-orange-50 font-semibold">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b" colSpan={4}>총계</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$41,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">-</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$2,050</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$4,100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$4,100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$4,100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$4,100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* OPEX 테이블 */}
      {activeRegion === 'mumbai' && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-blue-800">💼 OPEX(운영비용) - 뭄바이</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-blue-50">
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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Mumbai</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Maintenance Cost</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">DCN/ODF</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Mumbai</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                </tr>
                <tr className="bg-blue-50 font-semibold">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b" colSpan={4}>총계</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,200</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,200</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,200</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,200</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,200</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeRegion === 'chennai' && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-orange-800">💼 OPEX(운영비용) - 첸나이</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-orange-50">
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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Chennai</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Maintenance Cost</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">DCN/ODF</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Chennai</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$1,600</td>
                </tr>
                <tr className="bg-orange-50 font-semibold">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b" colSpan={4}>총계</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,200</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,200</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,200</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,200</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,200</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 투자 비용 요약 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 투자 비용 요약 - {activeRegion === 'mumbai' ? '뭄바이' : '첸나이'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">총 CAPEX</h4>
            <div className="text-2xl font-bold text-blue-600">$41,000</div>
            <div className="text-sm text-gray-600 mt-1">초기 투자 비용</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">연간 OPEX</h4>
            <div className="text-2xl font-bold text-green-600">$3,200</div>
            <div className="text-sm text-gray-600 mt-1">유지보수 비용</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">감가상각비</h4>
            <div className="text-2xl font-bold text-purple-600">$8,200</div>
            <div className="text-sm text-gray-600 mt-1">연간 감가상각 ($41,000 ÷ 5년)</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionRevenue() {
  const [activeRegion, setActiveRegion] = useState('mumbai');

  return (
    <section id="revenue">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📈 수익 추정 분석</h2>
      
      {/* 매출 추정 방법론 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 매출 추정 방법론</h3>
        
        {/* 논리적 근거 설명 */}
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-3">🎯 시장 매력도 분석 논리</h4>
          <div className="text-sm text-yellow-700 space-y-2">
            <p><strong>현상:</strong> 첸나이(205개 기업) &gt; 뭄바이(68개 기업) 진출</p>
            <p><strong>결론:</strong> 뭄바이가 더 매력적인 시장</p>
            <p><strong>논리적 근거:</strong></p>
            
            {/* 흐름도 스타일 분석 */}
            <div className="space-y-6">
              {/* 1단계: 산업 집중도 vs 다양성 */}
              <div className="bg-white border-2 border-blue-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</div>
                  <h5 className="font-semibold text-blue-800">산업 집중도 vs 다양성</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h6 className="font-semibold text-red-700 mb-2">첸나이 (205개 기업)</h6>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>자동차 부품 제조업:</span>
                        <span className="font-semibold">180개 (87%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>전자제품 제조업:</span>
                        <span>15개 (7%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>기타 서비스업:</span>
                        <span>10개 (6%)</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h6 className="font-semibold text-green-700 mb-2">뭄바이 (68개 기업)</h6>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>금융/보험업:</span>
                        <span>20개 (29%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IT/소프트웨어:</span>
                        <span>15개 (22%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>물류/운수업:</span>
                        <span>12개 (18%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>건설업:</span>
                        <span>10개 (15%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>제조업:</span>
                        <span>11개 (16%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 화살표 */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg">↓</div>
              </div>

              {/* 2단계: 경쟁 강도 차이 */}
              <div className="bg-white border-2 border-orange-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <h5 className="font-semibold text-orange-800">경쟁 강도 차이</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h6 className="font-semibold text-red-700 mb-2">첸나이: 과도 경쟁</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 현대, 기아 등 주요 OEM 모두 진출 완료</li>
                      <li>• 180개 자동차 부품 업체가 동일 시장 공유</li>
                      <li>• 가격 경쟁으로 마진 압박</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h6 className="font-semibold text-green-700 mb-2">뭄바이: 적절한 경쟁</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 각 업종별로 적절한 경쟁 구도</li>
                      <li>• 차별화된 서비스로 프리미엄 가격 가능</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 화살표 */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg">↓</div>
              </div>

              {/* 3단계: 시장 성숙도 vs 성장 잠재력 */}
              <div className="bg-white border-2 border-purple-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</div>
                  <h5 className="font-semibold text-purple-800">시장 성숙도 vs 성장 잠재력</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h6 className="font-semibold text-red-700 mb-2">첸나이: 성숙/포화 시장</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 자동차 부품: 성숙/포화 단계</li>
                      <li>• 신규 진출 기회: 제한적</li>
                      <li>• 성장 한계: 도달</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h6 className="font-semibold text-green-700 mb-2">뭄바이: 성장 시장</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 금융 서비스: 성장 단계</li>
                      <li>• IT 솔루션: 초기 단계</li>
                      <li>• 물류 서비스: 확장 단계</li>
                      <li>• 신규 기회: 다수 존재</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 화살표 */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg">↓</div>
              </div>

              {/* 4단계: 리스크 분산 관점 */}
              <div className="bg-white border-2 border-teal-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</div>
                  <h5 className="font-semibold text-teal-800">리스크 분산 관점</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h6 className="font-semibold text-red-700 mb-2">첸나이: 단일 산업 의존</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 자동차 산업 의존도 87%</li>
                      <li>• 자동차 시장 변동에 취약</li>
                      <li>• 단일 산업 리스크 집중</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h6 className="font-semibold text-green-700 mb-2">뭄바이: 다각화된 구조</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 다양한 산업 분산</li>
                      <li>• 산업별 리스크 분산</li>
                      <li>• 안정적인 수익 구조</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-800">🎯 핵심 통찰</p>
              <div className="space-y-2">
                <p><strong>"양적 성장 vs 질적 성장"</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• 첸나이: 기업 수는 많지만 과도한 경쟁</li>
                  <li>• 뭄바이: 기업 수는 적지만 다양한 기회</li>
                </ul>
                <p><strong>"시장 포화 vs 시장 기회"</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• 첸나이: 이미 성장 한계에 도달한 성숙 시장</li>
                  <li>• 뭄바이: 새로운 시장 진출 기회가 풍부한 성장 시장</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-800">✅ 결론</p>
              <p>"기업이 많은 진출 = 시장 매력도 상승"이라고 판단이 가능하나,</p>
              <p>실제로는:</p>
              <ul className="ml-4 space-y-1">
                <li>• 과도한 경쟁은 새로운 진출자에게 불리</li>
                <li>• 시장 다양성이 더 큰 기회 제공</li>
                <li>• 성장 잠재력이 현재 규모보다 중요</li>
              </ul>
              <p className="font-semibold mt-2">따라서 뭄바이가 첸나이보다 더 매력적인 시장으로 판단됩니다.</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">가격 전략</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• 가격: $1,160/월</li>
              <li>• 물가상승률 반영: 연 4% 가격 상승</li>
              <li>• 인플레이션, GDP 등 고려</li>
              <li>• 고객당 평균 10Mbps</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">고객 확보 전략</h4>
            <ul className="text-sm text-green-600 space-y-1">
              <li>• 뭄바이: 연 5개사씩 누적 증가 (다양한 업종 기회)</li>
              <li>• 첸나이: 연 3개사씩 누적 증가 (제한된 시장 기회)</li>
              <li>• 3년 계약 유지 가정</li>
              <li>• 재계약으로 고객 유지</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3년 계약 통일 모델 설명 */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📋 3년 계약 단순 인식 모델</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">🎯 계약 모델</h4>
            <div className="space-y-2 text-sm text-blue-700">
              <p><strong>• 모든 계약:</strong> 3년 장기 계약으로 통일</p>
              <p><strong>• 수익 인식:</strong> 단순 인식 (고객수 × 가격)</p>
              <p><strong>• 재계약 가정:</strong> 3년 후 재계약으로 고객 유지</p>
              <p><strong>• 누적 효과:</strong> 매년 새로운 고객 추가</p>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3">💰 수익 구조</h4>
            <div className="space-y-2 text-sm text-green-700">
              <p><strong>• 단순 계산:</strong> 누적 고객수 × 가격</p>
              <p><strong>• 누적 성장:</strong> 매년 고객 수 증가</p>
              <p><strong>• 안정적 수익:</strong> 3년 계약으로 예측 가능</p>
              <p><strong>• 지역 차별화:</strong> 고객 수로만 차별화</p>
            </div>
          </div>
        </div>
      </div>

      {/* 통합 지역 선택 탭 */}
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

        {/* 탭 콘텐츠 영역 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-inner p-6">
          {/* 수익 추정 테이블 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-800">📈 연도별 수익 추정</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      연도
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      고객 수
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      판매 단위 (Mbps)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      단가 (USD)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      매출 (USD)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Revenue (USD)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activeRegion === 'mumbai' ? (
                    <>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2025</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">5</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">50</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,160</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$58,000</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$58,000</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2026</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">10</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">100</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,206</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$120,600</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$120,600</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2027</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">15</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">150</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,254</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$188,100</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$188,100</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2028</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">20</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">200</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,304</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$260,800</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$260,800</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2029</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">25</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">250</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,356</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$339,000</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$339,000</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2025</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">3</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">30</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,160</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$34,800</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$34,800</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2026</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">6</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">60</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,206</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$72,360</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$72,360</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2027</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">9</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">90</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,254</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$112,860</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$112,860</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2028</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">12</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">120</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,304</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$156,480</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$156,480</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2029</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">15</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">150</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,356</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$203,400</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$203,400</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 구체적인 타겟 고객 선정 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">🎯 구체적인 타겟 고객 선정</h3>
        
        {activeRegion === 'mumbai' ? (
          <div className="space-y-6">
            {/* 2025년 타겟 고객 */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">2025년 타겟 고객 (5개사)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">1. 삼성전자 인도</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>진출 현황:</strong> 뭄바이 금융센터에 인도 본사 설립 (2018년)</li>
                    <li>• <strong>업종 성장세:</strong> 인도 전자제품 시장 연평균 15% 성장</li>
                    <li>• <strong>네트워크 수요:</strong> 글로벌 R&D센터 연동으로 고대역폭 필요</li>
                    <li>• <strong>KOTRA 자료:</strong> 인도 최대 한국 기업, 연매출 $10B+</li>
                    <li>• <strong>지역 특성:</strong> 뭄바이 IT 허브와 금융센터 접근성 우수</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">2. 현대자동차 인도</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>진출 현황:</strong> 뭄바이에 인도 마케팅 본부 운영 (2020년)</li>
                    <li>• <strong>업종 성장세:</strong> 인도 자동차 시장 연평균 8% 성장, 전기차 25%</li>
                    <li>• <strong>네트워크 수요:</strong> 첸나이 공장과 뭄바이 본사 간 실시간 연동</li>
                    <li>• <strong>KOTRA 자료:</strong> 인도 자동차 시장 점유율 2위, 연매출 $5B+</li>
                    <li>• <strong>지역 특성:</strong> 뭄바이 물류 허브로 부품 공급망 관리</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">3. LG전자 인도</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>진출 현황:</strong> 뭄바이에 인도 본사 및 R&D센터 운영 (2019년)</li>
                    <li>• <strong>업종 성장세:</strong> 인도 가전시장 연평균 12% 성장, 스마트홈 20%</li>
                    <li>• <strong>네트워크 수요:</strong> IoT 디바이스 관리 플랫폼 운영</li>
                    <li>• <strong>KOTRA 자료:</strong> 인도 가전시장 점유율 3위, 연매출 $3B+</li>
                    <li>• <strong>지역 특성:</strong> 뭄바이 IT 인프라 활용한 디지털 전환 추진</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">4. SK하이닉스 인도</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>진출 현황:</strong> 뭄바이에 인도 사무소 개설 (2021년)</li>
                    <li>• <strong>업종 성장세:</strong> 인도 반도체 시장 연평균 18% 성장</li>
                    <li>• <strong>네트워크 수요:</strong> 글로벌 데이터센터와 초저지연 연결 필요</li>
                    <li>• <strong>KOTRA 자료:</strong> 인도 반도체 수요 급증, 연매출 $2B+</li>
                    <li>• <strong>지역 특성:</strong> 뭄바이 IT 허브와 반도체 클러스터 연계</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">5. 포스코 인도</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>진출 현황:</strong> 뭄바이에 인도 본사 및 물류센터 운영 (2017년)</li>
                    <li>• <strong>업종 성장세:</strong> 인도 철강 시장 연평균 6% 성장, 건설붐 지속</li>
                    <li>• <strong>네트워크 수요:</strong> 전국 물류센터와 실시간 재고 관리</li>
                    <li>• <strong>KOTRA 자료:</strong> 인도 철강 수입 1위, 연매출 $4B+</li>
                    <li>• <strong>지역 특성:</strong> 뭄바이 항만과 철도 연결로 물류 효율성 극대화</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2026년 추가 타겟 고객 */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">2026년 추가 타겟 고객 (10개사 누적)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">6. 네이버 인도</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• IT 서비스 업계</li>
                    <li>• 한국 기업으로 기술적 이해</li>
                    <li>• 뭄바이 IT 허브 진출</li>
                    <li>• 클라우드 서비스 확장</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">7. 카카오 인도</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 모바일 플랫폼 업계</li>
                    <li>• 한국 기업으로 서비스 이해</li>
                    <li>• 뭄바이 시장 진출</li>
                    <li>• 글로벌 서비스 확장</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">8. 쿠팡 인도</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 이커머스 업계</li>
                    <li>• 한국 기업으로 비즈니스 모델 이해</li>
                    <li>• 뭄바이 물류 허브</li>
                    <li>• 대규모 트래픽 처리 필요</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">9. 배달의민족 인도</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 배달 서비스 업계</li>
                    <li>• 한국 기업으로 서비스 이해</li>
                    <li>• 뭄바이 시장 진출</li>
                    <li>• 실시간 위치 기반 서비스</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">10. 토스 인도</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 핀테크 업계</li>
                    <li>• 한국 기업으로 금융 서비스 이해</li>
                    <li>• 뭄바이 금융센터</li>
                    <li>• 보안 네트워크 요구</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2027-2029년 추가 고객 */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-3">2027-2029년 추가 타겟 고객 (15-25개사)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">추가 대상 업종</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 건설업: 대우건설, 현대건설</li>
                    <li>• 화학업: LG화학, 롯데케미칼</li>
                    <li>• 제약업: 한화생명, 동아제약</li>
                    <li>• 물류업: CJ대한통운, 한진</li>
                    <li>• 에너지업: SK에너지, GS칼텍스</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">선정 기준</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 뭄바이 지역 진출 계획</li>
                    <li>• 한국 기업 우선</li>
                    <li>• 네트워크 수요 높음</li>
                    <li>• 안정적 재무 상태</li>
                    <li>• 장기 파트너십 가능</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 2025년 타겟 고객 */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-3">2025년 타겟 고객 (4개사)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">1. 현대자동차 첸나이</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>진출 현황:</strong> 첸나이 근교 스리페룸부두르에 제조공장 운영 (1998년)</li>
                    <li>• <strong>업종 성장세:</strong> 첸나이 자동차 클러스터 연평균 10% 성장, 전기차 생산 확대</li>
                    <li>• <strong>네트워크 수요:</strong> 첸나이 공장과 뭄바이 본사 간 실시간 생산 관리</li>
                    <li>• <strong>KOTRA 자료:</strong> 첸나이 최대 한국 기업, 연생산 70만대, 연매출 $8B+</li>
                    <li>• <strong>지역 특성:</strong> 첸나이 자동차 클러스터 중심, 부품업체 200개 이상 집적</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">2. 기아자동차 첸나이</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>진출 현황:</strong> 첸나이 근교 아난탈루르에 제조공장 운영 (2019년)</li>
                    <li>• <strong>업종 성장세:</strong> 첸나이 자동차 시장 연평균 12% 성장, SUV 수요 급증</li>
                    <li>• <strong>네트워크 수요:</strong> 현대자동차와 공유하는 부품 공급망 관리</li>
                    <li>• <strong>KOTRA 자료:</strong> 첸나이 자동차 시장 점유율 3위, 연생산 30만대</li>
                    <li>• <strong>지역 특성:</strong> 첸나이 자동차 클러스터 내 현대자동차와 시너지</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">3. LG화학 첸나이</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>진출 현황:</strong> 첸나이 근교 마하발리푸람에 화학공장 운영 (2020년)</li>
                    <li>• <strong>업종 성장세:</strong> 첸나이 화학산업 연평균 8% 성장, 전기차 배터리 수요 급증</li>
                    <li>• <strong>네트워크 수요:</strong> 첸나이 공장과 뭄바이 본사 간 실시간 안전 관리</li>
                    <li>• <strong>KOTRA 자료:</strong> 첸나이 화학업계 선도기업, 연매출 $2B+</li>
                    <li>• <strong>지역 특성:</strong> 첸나이 자동차 클러스터와 배터리 공급망 연계</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">4. 포스코 첸나이</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>진출 현황:</strong> 첸나이 근교 엔노르에 철강공장 운영 (2018년)</li>
                    <li>• <strong>업종 성장세:</strong> 첸나이 제조업 연평균 7% 성장, 건설붐 지속</li>
                    <li>• <strong>네트워크 수요:</strong> 첸나이 공장과 뭄바이 물류센터 간 실시간 재고 관리</li>
                    <li>• <strong>KOTRA 자료:</strong> 첸나이 철강업계 1위, 연생산 500만톤</li>
                    <li>• <strong>지역 특성:</strong> 첸나이 제조업 클러스터와 철강 수요 연계</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2026년 추가 타겟 고객 */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">2026년 추가 타겟 고객 (8개사 누적)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">5. 대우건설 첸나이</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 건설업계</li>
                    <li>• 한국 기업으로 프로젝트 이해</li>
                    <li>• 첸나이 인프라 개발</li>
                    <li>• 현장 관리 네트워크</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">6. 현대건설 첸나이</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 건설업계</li>
                    <li>• 한국 기업으로 기술적 이해</li>
                    <li>• 첸나이 개발 프로젝트</li>
                    <li>• 안전 관리 시스템</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">7. 한화생명 첸나이</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 보험업계</li>
                    <li>• 한국 기업으로 서비스 이해</li>
                    <li>• 첸나이 시장 진출</li>
                    <li>• 보안 네트워크 요구</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">8. CJ대한통운 첸나이</h5>
                  <p className="text-sm text-gray-600 mb-2"><strong>선정 근거:</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 물류업계</li>
                    <li>• 한국 기업으로 물류 이해</li>
                    <li>• 첸나이 물류 허브</li>
                    <li>• 실시간 추적 시스템</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2027-2029년 추가 고객 */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-3">2027-2029년 추가 타겟 고객 (12-20개사)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">추가 대상 업종</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 제조업: 삼성전자, LG전자</li>
                    <li>• 화학업: 롯데케미칼, SK케미칼</li>
                    <li>• 제약업: 동아제약, 유한양행</li>
                    <li>• 물류업: 한진, 현대글로비스</li>
                    <li>• 에너지업: SK에너지, GS칼텍스</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">선정 기준</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 첸나이 지역 진출 계획</li>
                    <li>• 한국 기업 우선</li>
                    <li>• 제조업 중심</li>
                    <li>• 안정적 재무 상태</li>
                    <li>• 장기 파트너십 가능</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 주요 특징 및 전략 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💰 가격 전략</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 가격: $1,160/월</li>
            <li>• 물가상승률 반영: 연 4%</li>
            <li>• 인플레이션, GDP 고려</li>
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
            <li>• 뭄바이: 연 5개사 누적</li>
            <li>• 첸나이: 연 3개사 누적</li>
            <li>• 3년 계약 유지</li>
            <li>• 지역별 차별화</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 