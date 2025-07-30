import React, { useState } from 'react';

interface CostItem {
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

interface DetailedCostTableProps {
  title: string;
  data: CostItem[];
  type: 'capex' | 'opex';
  currency?: string;
}

export function DetailedCostTable({ title, data, type, currency = 'USD' }: DetailedCostTableProps) {
  const [showDetails, setShowDetails] = useState(false);

  const calculateTotal = (field: keyof CostItem) => {
    return data.reduce((sum, item) => sum + (item[field] as number || 0), 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showDetails ? '간단히 보기' : '상세 보기'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                항목 (Item)
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                세부 항목 (Specific Item)
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                지점 (Point)
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                비용 소유자 (Cost Owner)
              </th>
              {type === 'capex' && (
                <>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    CAPEX(USD)
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    감가상각 연수(DEP YR)
                  </th>
                </>
              )}
              {type === 'opex' && (
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  OPEX(yr)
                </th>
              )}
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                2025
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                2026
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                2027
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                2028
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                2029
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-sm text-gray-900 border-b">
                  {item.item}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900 border-b">
                  {item.specificItem}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900 border-b">
                  {item.point}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900 border-b">
                  {item.costOwner}
                </td>
                {type === 'capex' && (
                  <>
                    <td className="px-3 py-2 text-sm text-gray-900 border-b font-medium">
                      {formatCurrency(item.capex || 0)}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-900 border-b">
                      {item.depYr}
                    </td>
                  </>
                )}
                {type === 'opex' && (
                  <td className="px-3 py-2 text-sm text-gray-900 border-b font-medium">
                    {formatCurrency(item.opexYr || 0)}
                  </td>
                )}
                <td className="px-3 py-2 text-sm text-gray-900 border-b">
                  {formatCurrency(item.cost2025)}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900 border-b">
                  {formatCurrency(item.cost2026)}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900 border-b">
                  {formatCurrency(item.cost2027)}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900 border-b">
                  {formatCurrency(item.cost2028)}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900 border-b">
                  {formatCurrency(item.cost2029)}
                </td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-gray-100 font-semibold">
              <td className="px-3 py-2 text-sm text-gray-900 border-b" colSpan={type === 'capex' ? 6 : 5}>
                총계
              </td>
              <td className="px-3 py-2 text-sm text-gray-900 border-b font-medium">
                {formatCurrency(calculateTotal('cost2025'))}
              </td>
              <td className="px-3 py-2 text-sm text-gray-900 border-b font-medium">
                {formatCurrency(calculateTotal('cost2026'))}
              </td>
              <td className="px-3 py-2 text-sm text-gray-900 border-b font-medium">
                {formatCurrency(calculateTotal('cost2027'))}
              </td>
              <td className="px-3 py-2 text-sm text-gray-900 border-b font-medium">
                {formatCurrency(calculateTotal('cost2028'))}
              </td>
              <td className="px-3 py-2 text-sm text-gray-900 border-b font-medium">
                {formatCurrency(calculateTotal('cost2029'))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 요약 정보 */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">총 {type.toUpperCase()}</div>
          <div className="text-lg font-bold text-blue-800">
            {type === 'capex' 
              ? formatCurrency(calculateTotal('capex'))
              : formatCurrency(calculateTotal('opexYr'))
            }
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-sm text-green-600 font-medium">연평균 비용</div>
          <div className="text-lg font-bold text-green-800">
            {formatCurrency(
              (calculateTotal('cost2025') + calculateTotal('cost2026') + 
               calculateTotal('cost2027') + calculateTotal('cost2028') + 
               calculateTotal('cost2029')) / 5
            )}
          </div>
        </div>
        {type === 'capex' && (
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-sm text-purple-600 font-medium">총 감가상각</div>
            <div className="text-lg font-bold text-purple-800">
              {formatCurrency(calculateTotal('dep'))}
            </div>
          </div>
        )}
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="text-sm text-orange-600 font-medium">2025년 비용</div>
          <div className="text-lg font-bold text-orange-800">
            {formatCurrency(calculateTotal('cost2025'))}
          </div>
        </div>
      </div>
    </div>
  );
} 