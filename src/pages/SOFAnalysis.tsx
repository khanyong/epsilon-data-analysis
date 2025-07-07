import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useDataAnalysis } from '../hooks/useDataAnalysis';
import { downloadTableAsCSV } from '../services/supabaseService';
import { analyzeRegionalData, generateTopRankingData, groupByPivotTree, getUniqueValues } from '../utils/dataAnalysisUtils';
import { DataTable } from '../components/DataTable';

// 차트 색상 팔레트
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1', '#D084D0'];

export function SOFAnalysis() {
  const { rowData, columnDefs, loading } = useDataAnalysis('SOF');
  const [selectedChart, setSelectedChart] = useState('bar');
  const [comparisonTab, setComparisonTab] = useState('count');

  // 피벗 테이블 분석을 위한 상태
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [pivotResult, setPivotResult] = useState<any[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [availableValues, setAvailableValues] = useState<string[]>([]);
  const [filterColumn, setFilterColumn] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  function getSOFDashboardData() {
    if (!rowData.length) return null;

    // RFQ와 동일한 지역 데이터 분석 적용
    const regionalData = analyzeRegionalData(rowData, 'city_a', 'city_b');
    
    const topCountriesA = generateTopRankingData(regionalData.stats.countryAStats, 'Country A');
    const topCountriesB = generateTopRankingData(regionalData.stats.countryBStats, 'Country B');
    
    const normalizationData = [
      { name: 'City A 원본', value: regionalData.cities.cityA.length },
      { name: 'City A 정규화', value: regionalData.cities.uniqueCityA.length },
      { name: 'City B 원본', value: regionalData.cities.cityB.length },
      { name: 'City B 정규화', value: regionalData.cities.uniqueCityB.length },
    ];
    
    const comparisonData = [
      { 
        category: '국가 수', 
        'Country A': regionalData.countries.uniqueOrigin.length, 
        'Country B': regionalData.countries.uniqueDest.length 
      },
      { 
        category: '도시 수', 
        'Country A': regionalData.cities.uniqueCityA.length, 
        'Country B': regionalData.cities.uniqueCityB.length 
      },
      { 
        category: '총 건수', 
        'Country A': regionalData.countries.origin.length, 
        'Country B': regionalData.countries.dest.length 
      },
    ];

    // SOF 특화 데이터도 포함
    const orderStatuses = rowData.map(r => r['Order Status'] || r['Status']).filter(value => value != null && value !== '');
    const uniqueStatuses = Array.from(new Set(orderStatuses));
    
    // 금액 데이터 분석
    const amounts = rowData.map(r => {
      const amount = r['Total Amount'] || r['Amount'] || r['Price'] || 0;
      return typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    }).filter(val => val > 0);
    
    const totalAmount = amounts.reduce((sum, val) => sum + val, 0);
    const avgAmount = amounts.length > 0 ? totalAmount / amounts.length : 0;
    
    // 상태별 통계
    const statusStats: Record<string, number> = {};
    orderStatuses.forEach(status => {
      statusStats[status] = (statusStats[status] || 0) + 1;
    });
    
    const topStatuses = Object.entries(statusStats)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([status, count]) => ({ name: status, value: count as number }));
    
    return {
      kpi: {
        totalRecords: rowData.length,
        countriesA: regionalData.countries.uniqueOrigin.length,
        countriesB: regionalData.countries.uniqueDest.length,
        citiesA: regionalData.cities.uniqueCityA.length,
        citiesB: regionalData.cities.uniqueCityB.length,
        compressionRate: (((regionalData.cities.allCities.length - regionalData.cities.uniqueAllCities.length) / regionalData.cities.allCities.length) * 100).toFixed(1),
        totalAmount: totalAmount,
        avgAmount: avgAmount,
        uniqueStatuses: uniqueStatuses.length,
      },
      charts: {
        topCountriesA,
        topCountriesB,
        normalizationData,
        comparisonData,
        topStatuses,
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
        <div className="text-gray-500">SOF 데이터를 불러오는 중...</div>
      </div>
    );
  }

  const dashboardData = getSOFDashboardData();
  const filteredData = getFilteredData();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">주문(SOF) 데이터 분석</h1>
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
            onClick={() => downloadTableAsCSV('sof_middlemile')}
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
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">전체 건수</div>
                <div className="text-2xl font-bold">{dashboardData.kpi.totalRecords.toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">Country A</div>
                <div className="text-2xl font-bold">{dashboardData.kpi.countriesA}</div>
                <div className="text-xs opacity-75">개 국가</div>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">Country B</div>
                <div className="text-2xl font-bold">{dashboardData.kpi.countriesB}</div>
                <div className="text-xs opacity-75">개 국가</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">City A</div>
                <div className="text-2xl font-bold">{dashboardData.kpi.citiesA}</div>
                <div className="text-xs opacity-75">개 도시</div>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">City B</div>
                <div className="text-2xl font-bold">{dashboardData.kpi.citiesB}</div>
                <div className="text-xs opacity-75">개 도시</div>
              </div>
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-lg">
                <div className="text-sm opacity-90">도시명 압축률</div>
                <div className="text-2xl font-bold">{dashboardData.kpi.compressionRate}%</div>
                <div className="text-xs opacity-75">정규화 효과</div>
              </div>
            </div>
          </div>

          {/* 차트 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 국가 비교 차트 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">🌍 Country A vs Country B</h3>
              <div className="flex gap-2 mb-4">
                <button
                  className={`px-4 py-2 rounded text-sm ${comparisonTab === 'count' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setComparisonTab('count')}
                >
                  🏢 개수 비교
                </button>
                <button
                  className={`px-4 py-2 rounded text-sm ${comparisonTab === 'volume' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setComparisonTab('volume')}
                >
                  📦 건수 비교
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={
                  comparisonTab === 'count' 
                    ? dashboardData.charts.comparisonData.slice(0, 2)
                    : [dashboardData.charts.comparisonData[2]]
                }>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Country A" fill="#0088FE" />
                  <Bar dataKey="Country B" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 정규화 효과 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">🔄 도시명 정규화 효과</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData.charts.normalizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 상위 국가/도시 차트들 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">🛫 Top 10 Country A</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dashboardData.charts.topCountriesA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">🛬 Top 10 Country B</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dashboardData.charts.topCountriesB}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SOF 특화 차트 + 파이 차트 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">📋 주문 상태별 분포</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dashboardData.charts.topStatuses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884D8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">🥧 Country A 분포</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={dashboardData.charts.topCountriesA?.slice(0, 8) || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(dashboardData.charts.topCountriesA?.slice(0, 8) || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 추가 파이 차트 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">🥧 Country B 분포</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.charts.topCountriesB?.slice(0, 8) || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(dashboardData.charts.topCountriesB?.slice(0, 8) || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">🥧 주문 상태 비율</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.charts.topStatuses?.slice(0, 8) || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(dashboardData.charts.topStatuses?.slice(0, 8) || []).map((entry, index) => (
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
              <h2 className="text-lg font-semibold text-gray-800">SOF 데이터 테이블</h2>
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