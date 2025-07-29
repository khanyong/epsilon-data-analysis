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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$4,000</td>
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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$100</td>
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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$4,100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$2,050</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$4,100</td>
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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$4,000</td>
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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$100</td>
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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$4,100</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$2,050</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$4,100</td>
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