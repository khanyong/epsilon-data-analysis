import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { useDataAnalysis } from '../hooks/useDataAnalysis';
import { downloadTableAsCSV } from '../services/supabaseService';
import { groupByPivotTree, getUniqueValues } from '../utils/dataAnalysisUtils';
import { DataTable } from '../components/DataTable';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1', '#D084D0'];

export function KOTRAAnalysis() {
  const { rowData, columnDefs, loading } = useDataAnalysis('KOTRA');
  const [selectedChart, setSelectedChart] = useState('bar');
  const [tradeType, setTradeType] = useState('all'); // 'all', 'export', 'import'

  // 피벗 테이블 분석을 위한 상태
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [pivotResult, setPivotResult] = useState<any[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [availableValues, setAvailableValues] = useState<string[]>([]);
  const [filterColumn, setFilterColumn] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  function getKOTRADashboardData() {
    if (!rowData.length) return null;

    // 수출입 데이터 분석
    const countries = rowData.map(r => r['Country'] || r['country']).filter(value => value != null && value !== '');
    const uniqueCountries = Array.from(new Set(countries));
    
    const items = rowData.map(r => r['Item'] || r['item'] || r['Product']).filter(value => value != null && value !== '');
    const uniqueItems = Array.from(new Set(items));
    
    // 무역 타입 분석 (수출/수입)
    const tradeTypes = rowData.map(r => r['Trade Type'] || r['trade_type'] || r['Type']).filter(value => value != null && value !== '');
    const uniqueTradeTypes = Array.from(new Set(tradeTypes));
    
    // 금액 데이터 분석
    const amounts = rowData.map(r => {
      const amount = r['Amount'] || r['Value'] || r['Trade Value'] || 0;
      return typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    }).filter(val => val > 0);
    
    const totalAmount = amounts.reduce((sum, val) => sum + val, 0);
    const avgAmount = amounts.length > 0 ? totalAmount / amounts.length : 0;
    
    // 국가별 통계
    const countryStats: Record<string, number> = {};
    countries.forEach(country => {
      countryStats[country] = (countryStats[country] || 0) + 1;
    });
    
    const topCountries = Object.entries(countryStats)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([country, count]) => ({ name: country, value: count as number }));
    
    // 품목별 통계
    const itemStats: Record<string, number> = {};
    items.forEach(item => {
      itemStats[item] = (itemStats[item] || 0) + 1;
    });
    
    const topItems = Object.entries(itemStats)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([item, count]) => ({ name: item, value: count as number }));
    
    // 무역 타입별 통계
    const tradeTypeStats: Record<string, number> = {};
    tradeTypes.forEach(type => {
      tradeTypeStats[type] = (tradeTypeStats[type] || 0) + 1;
    });
    
    const tradeTypeData = Object.entries(tradeTypeStats)
      .map(([type, count]) => ({ name: type, value: count as number }));
    
    return {
      kpi: {
        totalRecords: rowData.length,
        totalAmount: totalAmount,
        avgAmount: avgAmount,
        maxAmount: amounts.length > 0 ? Math.max(...amounts) : 0,
        minAmount: amounts.length > 0 ? Math.min(...amounts) : 0,
        uniqueCountries: uniqueCountries.length,
        uniqueItems: uniqueItems.length,
        uniqueTradeTypes: uniqueTradeTypes.length,
      },
      charts: {
        topCountries,
        topItems,
        tradeTypeData,
        amounts: amounts,
      }
    };
  }

  // 피벗 테이블 분석 실행
  const handlePivotAnalysis = () => {
    if (selectedColumns.length === 0) return;
    
    const result = groupByPivotTree(getFilteredData(), selectedColumns);
    setPivotResult(result);
  };

  // 컬럼 선택 토글
  const handleColumnToggle = (col: string) => {
    setSelectedColumns(prev => 
      prev.includes(col) 
        ? prev.filter(c => c !== col)
        : [...prev, col]
    );
    setPivotResult([]);
  };

  // 필터 컬럼 변경 시 사용 가능한 값 업데이트
  const handleFilterColumnChange = (col: string) => {
    setFilterColumn(col);
    if (col && rowData.length > 0) {
      const values = getUniqueValues(rowData, col);
      setAvailableValues(values);
      setSelectedValues([]);
    } else {
      setAvailableValues([]);
      setSelectedValues([]);
    }
    setPivotResult([]);
  };

  // 값 선택 토글
  const handleValueToggle = (value: string) => {
    setSelectedValues(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  // 값 필터링된 데이터 가져오기
  const getFilteredData = () => {
    if (!filterColumn || selectedValues.length === 0) return rowData;
    return rowData.filter(row => selectedValues.includes(String(row[filterColumn])));
  };

  // 피벗 테이블 렌더링 함수
  const renderPivotTable = (nodes: any[], level = 0) => {
    return nodes.map((node, index) => (
      <div key={index} className={`ml-${level * 4} mb-2`}>
        <div className={`flex items-center p-2 rounded ${level === 0 ? 'bg-blue-50 font-semibold' : level === 1 ? 'bg-gray-50' : 'bg-white'} border`}>
          <span className="flex-1">{node.key}</span>
          <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded">{node.count}건</span>
        </div>
        {node.children && node.children.length > 0 && (
          <div className="ml-4">
            {renderPivotTable(node.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">KOTRA 데이터를 불러오는 중...</div>
      </div>
    );
  }

  const dashboardData = getKOTRADashboardData();
  const filteredData = getFilteredData();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">수출입(KOTRA) 데이터 분석</h1>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded ${selectedChart === 'bar' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedChart('bar')}
          >
            📊 통계 대시보드
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedChart === 'pie' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedChart('pie')}
          >
            📋 데이터 테이블
          </button>
          <button
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            onClick={() => downloadTableAsCSV('kotra')}
          >
            💾 CSV 다운로드
          </button>
        </div>
      </div>

      {selectedChart === 'bar' && dashboardData && (
        <div className="space-y-6">
          {/* KPI 패널 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">📊 핵심 지표 (KPI)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">전체 건수</div>
                <div className="text-2xl font-bold">{dashboardData.kpi.totalRecords.toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">총 금액</div>
                <div className="text-2xl font-bold">${dashboardData.kpi.totalAmount.toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">평균 금액</div>
                <div className="text-2xl font-bold">${Math.round(dashboardData.kpi.avgAmount).toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">최대 금액</div>
                <div className="text-2xl font-bold">${dashboardData.kpi.maxAmount.toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">최소 금액</div>
                <div className="text-2xl font-bold">${dashboardData.kpi.minAmount.toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">국가 수</div>
                <div className="text-2xl font-bold">{dashboardData.kpi.uniqueCountries}</div>
                <div className="text-xs opacity-75">개 국가</div>
              </div>
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">품목 수</div>
                <div className="text-2xl font-bold">{dashboardData.kpi.uniqueItems}</div>
                <div className="text-xs opacity-75">개 품목</div>
              </div>
            </div>
          </div>

          {/* 차트 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 상위 국가 차트 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">🌍 상위 무역 상대국</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dashboardData.charts.topCountries}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 상위 품목 차트 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">📦 상위 무역 품목</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dashboardData.charts.topItems}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 무역 타입 및 분포 차트 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">🚢 무역 타입 분포</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.charts.tradeTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dashboardData.charts.tradeTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">🥧 국가별 무역 비율</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.charts.topCountries?.slice(0, 8) || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(dashboardData.charts.topCountries?.slice(0, 8) || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {selectedChart === 'pie' && (
        <div className="space-y-6">
          {/* 피벗 테이블 분석 도구 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">🔍 피벗 테이블 분석</h2>
            
            {/* 컬럼 선택 영역 */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">컬럼 선택</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value=""
                    onChange={(e) => e.target.value && handleColumnToggle(e.target.value)}
                  >
                    <option value="">-- 컬럼 선택 --</option>
                    {columnDefs.filter(col => !selectedColumns.includes(col.field)).map(col => (
                      <option key={col.field} value={col.field}>{col.headerName}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                    onClick={handlePivotAnalysis}
                    disabled={selectedColumns.length === 0}
                  >
                    📊 분석
                  </button>
                </div>
              </div>
              
              {/* 선택된 컬럼 태그 */}
              {selectedColumns.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedColumns.map(col => {
                    const colDef = columnDefs.find(c => c.field === col);
                    return (
                      <span 
                        key={col}
                        className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {colDef?.headerName || col}
                        <button
                          onClick={() => handleColumnToggle(col)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 피벗 테이블 결과 */}
            {pivotResult.length > 0 && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-3 text-gray-800">
                  📊 데이터 표/피벗 ({selectedColumns.join(' > ')})
                </h3>
                <div className="max-h-96 overflow-y-auto">
                  {renderPivotTable(pivotResult)}
                </div>
              </div>
            )}
          </div>

          {/* 데이터 테이블 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">KOTRA 데이터 테이블</h2>
              <div className="text-sm text-gray-500">
                {selectedValues.length > 0 ? `"${selectedValues.join(', ')}"로 필터링: ` : '전체: '}
                {filteredData.length.toLocaleString()}건
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto border rounded">
              <DataTable rowData={filteredData} columnDefs={columnDefs} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 