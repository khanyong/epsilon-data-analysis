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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Mumbai</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$40,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">6</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$3,333</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$6,667</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$6,667</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$6,667</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$6,667</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">On net HW</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">DCN/ODF</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Mumbai</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$2,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">6</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$167</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$333</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$333</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$333</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$333</td>
                </tr>
                <tr className="bg-blue-50 font-semibold">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b" colSpan={5}>총계</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">-</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,500</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$7,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$7,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$7,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$7,000</td>
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
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Chennai</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$40,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">6</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$3,333</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$6,667</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$6,667</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$6,667</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$6,667</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">On net HW</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">DCN/ODF</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Chennai</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">Epsilon</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$2,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">6</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$167</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$333</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$333</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$333</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">$333</td>
                </tr>
                <tr className="bg-orange-50 font-semibold">
                  <td className="px-4 py-3 text-sm text-gray-900 border-b" colSpan={5}>총계</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">-</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$3,500</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$7,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$7,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$7,000</td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b font-medium">$7,000</td>
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
            <div className="text-2xl font-bold text-blue-600">$42,000</div>
            <div className="text-sm text-gray-600 mt-1">초기 투자 비용</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">연간 OPEX</h4>
            <div className="text-2xl font-bold text-green-600">$3,200</div>
            <div className="text-sm text-gray-600 mt-1">유지보수 비용</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">감가상각비</h4>
            <div className="text-2xl font-bold text-purple-600">$7,000</div>
            <div className="text-sm text-gray-600 mt-1">연간 감가상각 ($42,000 ÷ 6년)</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessFeasibilitySectionRevenue() {
  const [activeRegion, setActiveRegion] = useState('mumbai');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <section id="revenue">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📈 수익 추정 분석</h2>
      
      {/* 매출 추정 방법론 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 매출 추정 방법론</h3>
        
        {/* 종합 지역 분석 */}
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-3">🎯 종합 지역 분석 기반 매출 추정</h4>
          <div className="text-sm text-blue-700 space-y-2">
            <p><strong>핵심 발견:</strong> 영업조직 매칭 결과, 첸나이가 뭄바이보다 압도적으로 높음</p>
            <p><strong>영업조직 매칭 비율:</strong> 첸나이 85% vs 뭄바이 15%</p>
            <p><strong>결론:</strong> 첸나이가 더 매력적인 시장</p>
            <p><strong>종합 분석 근거:</strong></p>
            
            {/* 흐름도 스타일 분석 */}
            <div className="space-y-6">
              {/* 1단계: 영업조직 매칭 분석 */}
              <div className="bg-white border-2 border-blue-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</div>
                    <h5 className="font-semibold text-blue-800">영업조직 매칭 분석</h5>
                  </div>
                  <button 
                    onClick={() => openModal('sales')}
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    근거 보기
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h6 className="font-semibold text-green-700 mb-2">첸나이 (38.1%)</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 202개 기업 중 77개 매칭</li>
                      <li>• 기존 영업 인프라 활용 가능</li>
                      <li>• 고객 접근성 우수</li>
                      <li>• 시장 진입 장벽 낮음</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h6 className="font-semibold text-red-700 mb-2">뭄바이 (24.7%)</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 97개 기업 중 24개 매칭</li>
                      <li>• 영업 인프라 부족</li>
                      <li>• 고객 접근성 제한</li>
                      <li>• 시장 진입 장벽 높음</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 화살표 */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg">↓</div>
              </div>

              {/* 2단계: 시장 환경 분석 */}
              <div className="bg-white border-2 border-green-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</div>
                    <h5 className="font-semibold text-green-800">시장 환경 분석</h5>
                  </div>
                  <button 
                    onClick={() => openModal('market')}
                    className="text-green-600 hover:text-green-800 text-sm underline"
                  >
                    근거 보기
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h6 className="font-semibold text-green-700 mb-2">첸나이 시장 환경</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>기업 수:</strong> 202개 (제조업 중심)</li>
                      <li>• <strong>시장 환경:</strong> 자동차 클러스터 확장</li>
                      <li>• <strong>법률규제:</strong> 제조업 친화적 정책</li>
                      <li>• <strong>경쟁도:</strong> 상대적으로 낮음</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h6 className="font-semibold text-red-700 mb-2">뭄바이 시장 환경</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>기업 수:</strong> 97개 (다양한 업종)</li>
                      <li>• <strong>시장 환경:</strong> 서비스업 중심</li>
                      <li>• <strong>법률규제:</strong> 복잡한 규제 환경</li>
                      <li>• <strong>경쟁도:</strong> 높은 경쟁 강도</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 화살표 */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-lg">↓</div>
              </div>

              {/* 3단계: 인프라 및 비즈니스 환경 분석 */}
              <div className="bg-white border-2 border-purple-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</div>
                    <h5 className="font-semibold text-purple-800">인프라 및 비즈니스 환경 분석</h5>
                  </div>
                  <button 
                    onClick={() => openModal('infrastructure')}
                    className="text-purple-600 hover:text-purple-800 text-sm underline"
                  >
                    근거 보기
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h6 className="font-semibold text-green-700 mb-2">첸나이 인프라 환경</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>전력환경:</strong> 안정적 공급 (제조업 특화)</li>
                      <li>• <strong>임대료:</strong> 상대적으로 저렴</li>
                      <li>• <strong>세금환경:</strong> 제조업 세제 혜택</li>
                      <li>• <strong>글로벌 네트워크:</strong> 자동차 산업 클러스터</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h6 className="font-semibold text-red-700 mb-2">뭄바이 인프라 환경</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>전력환경:</strong> 부족한 공급 (서비스업 중심)</li>
                      <li>• <strong>임대료:</strong> 높은 임대료</li>
                      <li>• <strong>세금환경:</strong> 복잡한 세제</li>
                      <li>• <strong>글로벌 네트워크:</strong> 금융 중심지</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 화살표 */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg">↓</div>
              </div>

              {/* 4단계: 종합 매출 추정 */}
              <div className="bg-white border-2 border-orange-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</div>
                    <h5 className="font-semibold text-orange-800">종합 매출 추정</h5>
                  </div>
                  <button 
                    onClick={() => openModal('revenue')}
                    className="text-orange-600 hover:text-orange-800 text-sm underline"
                  >
                    근거 보기
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h6 className="font-semibold text-green-700 mb-2">첸나이: 상향 조정</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>고객 확보:</strong> 연 8개사씩 누적 증가</li>
                      <li>• <strong>매출 전망:</strong> $542,400 (2029년)</li>
                      <li>• <strong>성장률:</strong> 안정적 성장</li>
                      <li>• <strong>리스크:</strong> 낮음</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <h6 className="font-semibold text-orange-700 mb-2">뭄바이: 하향 조정</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>고객 확보:</strong> 연 3개사씩 누적 증가</li>
                      <li>• <strong>매출 전망:</strong> $203,400 (2029년)</li>
                      <li>• <strong>성장률:</strong> 불확실한 성장</li>
                      <li>• <strong>리스크:</strong> 높음</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-800">🎯 핵심 통찰</p>
              <div className="space-y-2">
                <p><strong>"종합적 지역 분석 = 정확한 매출 추정"</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• 영업조직 매칭: 실제 비즈니스 기회 지표</li>
                  <li>• 시장 환경: 지역별 특성과 규제 환경</li>
                  <li>• 인프라 환경: 비즈니스 운영의 물리적 조건</li>
                  <li>• 종합 분석: 모든 요소를 고려한 현실적 추정</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-800">✅ 결론</p>
              <p>종합 지역 분석을 반영하여 매출 전망을 재조정합니다:</p>
              <ul className="ml-4 space-y-1">
                <li>• <strong>첸나이</strong>: 모든 요소에서 우수한 조건으로 매출 전망 상향 조정</li>
                <li>• <strong>뭄바이</strong>: 여러 제약 요소로 인해 매출 전망 하향 조정</li>
                <li>• <strong>전략적 우선순위</strong>: 첸나이를 1차 시장으로 선정</li>
              </ul>
              <p className="font-semibold mt-2">따라서 첸나이가 뭄바이보다 더 매력적인 시장으로 재평가됩니다.</p>
            </div>
          </div>
        </div>

        {/* 근거 모달 */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {modalType === 'sales' ? '📊 영업조직 매칭 분석 근거' : 
                   modalType === 'market' ? '🏢 시장 환경 분석 근거' : 
                   modalType === 'infrastructure' ? '🏗️ 인프라 환경 분석 근거' : 
                   '💰 종합 매출 추정 근거'}
                </h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              {modalType === 'sales' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📊 영업조직 매칭 수치 근거</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>첸나이:</strong> 202개 기업 중 77개 매칭 (38.1%)</li>
                      <li>• <strong>뭄바이:</strong> 97개 기업 중 24개 매칭 (24.7%)</li>
                      <li>• <strong>매칭 기준:</strong> 기업명, 주소, 업종 정보 기반</li>
                      <li>• <strong>데이터 출처:</strong> KOTRA, LinkedIn Sales Division</li>
                      <li>• <strong>참고:</strong> 현재 Supabase 데이터 기준 (2024년 1월)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">📋 매칭의 비즈니스 의미</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <strong>영업 인프라:</strong> 기존 영업 조직 활용 가능</li>
                      <li>• <strong>고객 접근성:</strong> 직접적인 고객 접촉 경로</li>
                      <li>• <strong>시장 진입:</strong> 낮은 진입 장벽</li>
                      <li>• <strong>영업 효율성:</strong> 높은 영업 성공률</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🔗 참고 자료 링크</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• <a href="https://www.kotra.or.kr/" target="_blank" rel="noopener noreferrer" className="underline">KOTRA</a> - 한국기업 진출 현황</li>
                      <li>• <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a> - 영업 조직 정보</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {modalType === 'market' && (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🏢 시장 환경 분석 근거</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <strong>기업 수:</strong> RBI, DPIIT 공식 통계 기반</li>
                      <li>• <strong>시장 환경:</strong> 지역별 산업 특성 분석</li>
                      <li>• <strong>법률규제:</strong> 인도 정부 정책 및 규제 환경</li>
                      <li>• <strong>경쟁도:</strong> 시장 조사 기관 분석</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📋 지역별 특성 분석</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>첸나이:</strong> 제조업 중심, 자동차 클러스터</li>
                      <li>• <strong>뭄바이:</strong> 서비스업 중심, 금융 중심지</li>
                      <li>• <strong>산업 정책:</strong> Make in India 정책 영향</li>
                      <li>• <strong>투자 환경:</strong> FDI 정책 및 규제</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🔗 참고 자료 링크</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" className="underline">RBI</a> - 인도 경제 통계</li>
                      <li>• <a href="https://dpiit.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">DPIIT</a> - 산업 정책</li>
                      <li>• <a href="https://www.idc.com/" target="_blank" rel="noopener noreferrer" className="underline">IDC</a> - 시장 조사</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {modalType === 'infrastructure' && (
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🏗️ 인프라 환경 분석 근거</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• <strong>전력환경:</strong> 인도 전력부 공식 통계</li>
                      <li>• <strong>임대료:</strong> 부동산 시장 조사 기관</li>
                      <li>• <strong>세금환경:</strong> 인도 세무부 정책</li>
                      <li>• <strong>글로벌 네트워크:</strong> 산업 클러스터 분석</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📋 비즈니스 운영 환경</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>첸나이:</strong> 제조업 특화 인프라, 안정적 전력</li>
                      <li>• <strong>뭄바이:</strong> 서비스업 중심, 높은 운영비</li>
                      <li>• <strong>세제 혜택:</strong> 지역별 세제 차별화</li>
                      <li>• <strong>인프라 투자:</strong> 정부 인프라 개발 계획</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🔗 참고 자료 링크</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <a href="https://powermin.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">Ministry of Power</a> - 전력 통계</li>
                      <li>• <a href="https://cbic.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">CBIC</a> - 세무 정책</li>
                      <li>• <a href="https://www.jll.co.in/" target="_blank" rel="noopener noreferrer" className="underline">JLL</a> - 부동산 시장</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {modalType === 'revenue' && (
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">💰 종합 매출 추정 근거</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• <strong>고객 확보:</strong> 영업조직 매칭 기반 현실적 목표</li>
                      <li>• <strong>매출 계산:</strong> ARPU × 고객 수 × 12개월</li>
                      <li>• <strong>성장률:</strong> 지역별 특성 반영</li>
                      <li>• <strong>리스크 평가:</strong> 종합 환경 분석 기반</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📋 추정 모델</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>첸나이:</strong> 연 8개사씩 누적 증가 (안정적 성장)</li>
                      <li>• <strong>뭄바이:</strong> 연 3개사씩 누적 증가 (불확실한 성장)</li>
                      <li>• <strong>ARPU:</strong> 지역별 시장 조사 기반</li>
                      <li>• <strong>성장률:</strong> 산업 트렌드 및 지역 특성</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🔗 참고 자료 링크</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <a href="https://www.idc.com/" target="_blank" rel="noopener noreferrer" className="underline">IDC</a> - IT 시장 분석</li>
                      <li>• <a href="https://www.gartner.com/" target="_blank" rel="noopener noreferrer" className="underline">Gartner</a> - 기술 시장</li>
                      <li>• <a href="https://www.kotra.or.kr/" target="_blank" rel="noopener noreferrer" className="underline">KOTRA</a> - 진출 현황</li>
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}

      {/* 가격 및 고객 확보 전략 */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-800">📊 가격 및 고객 확보 전략</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💰 가격 전략</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 가격: $1,160/월</li>
              <li>• 물가상승률 반영: 연 4% 가격 상승</li>
              <li>• 인플레이션, GDP 등 고려</li>
              <li>• 고객당 평균 10Mbps</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">🎯 고객 확보 전략</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>첸나이 우선</strong>: 연 8개사씩 누적 증가 (영업조직 매칭 기반)</li>
              <li>• <strong>뭄바이 후순위</strong>: 연 3개사씩 누적 증가 (인프라 구축 후)</li>
              <li>• 3년 계약 유지 가정</li>
              <li>• 기존 영업조직 활용으로 빠른 진입</li>
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
                  ) : (
                    <>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2025</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">8</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">80</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,160</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$92,800</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$92,800</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2026</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">16</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">160</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,206</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$192,960</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$192,960</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2027</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">24</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">240</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,254</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$300,960</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$300,960</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2028</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">32</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">320</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,304</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$417,280</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$417,280</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2029</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">40</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">400</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$1,356</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$542,400</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$542,400</td>
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