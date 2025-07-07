import React, { useState, useEffect } from 'react';
import { useDataAnalysis } from '../hooks/useDataAnalysis';
import { downloadTableAsCSV } from '../services/supabaseService';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1', '#D084D0'];

export function EpsilonPoPAnalysis() {
  const { rowData, loading } = useDataAnalysis('EPSILON_POPS');
  const [regionData, setRegionData] = useState<any[]>([]);
  const [countryData, setCountryData] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [infinyData, setInfinyData] = useState<any[]>([]);
  const [facilityData, setFacilityData] = useState<any[]>([]);

  // 데이터 분석 및 요약
  useEffect(() => {
    if (!rowData || rowData.length === 0) return;

    // 지역별 통계
    const regionStats: Record<string, number> = {};
    const countryStats: Record<string, number> = {};
    const cityStats: Record<string, number> = {};
    const infinyStats: Record<string, number> = { true: 0, false: 0 };
    const facilityStats: Record<string, number> = {};

    rowData.forEach(item => {
      // 지역별 카운트
      const region = item.region || '미분류';
      regionStats[region] = (regionStats[region] || 0) + 1;

      // 국가별 카운트
      const country = item.country || '미분류';
      countryStats[country] = (countryStats[country] || 0) + 1;

      // 도시별 카운트
      const city = item.city || '미분류';
      cityStats[city] = (cityStats[city] || 0) + 1;

      // Infiny 지원 현황
      const infinyEnabled = item.infiny_enabled === 'true' || item.infiny_enabled === true;
      infinyStats[infinyEnabled ? 'true' : 'false'] = (infinyStats[infinyEnabled ? 'true' : 'false'] || 0) + 1;

      // 시설 유형별 카운트
      const facilityType = item.facility_type || '미분류';
      facilityStats[facilityType] = (facilityStats[facilityType] || 0) + 1;
    });

    // 차트 데이터 변환
    setRegionData(
      Object.entries(regionStats)
        .map(([region, count]) => ({ region, count }))
        .sort((a, b) => b.count - a.count)
    );

    setCountryData(
      Object.entries(countryStats)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10) // 상위 10개국만
    );

    setCityData(
      Object.entries(cityStats)
        .map(([city, count]) => ({ city, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10) // 상위 10개 도시만
    );

    setInfinyData([
      { name: 'Infiny 지원', value: infinyStats['true'] || 0, color: '#00C49F' },
      { name: 'Infiny 미지원', value: infinyStats['false'] || 0, color: '#FF8042' }
    ]);

    setFacilityData(
      Object.entries(facilityStats)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count)
    );
  }, [rowData]);

  // CSV 다운로드
  const handleDownloadCSV = async () => {
    try {
      await downloadTableAsCSV('epsilon_pops');
    } catch (error) {
      console.error('CSV 다운로드 실패:', error);
      alert('CSV 다운로드에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Epsilon PoP 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!rowData || rowData.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <h3 className="text-yellow-800 font-medium">데이터 없음</h3>
        <p className="text-yellow-600 text-sm mt-1">Epsilon PoP 데이터를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🌐 Epsilon PoP 현황 분석</h1>
            <p className="text-gray-600 mt-1">글로벌 Epsilon Physical Point of Presence 분포 현황</p>
          </div>
          <button
            onClick={handleDownloadCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <span>📥</span>
            <span>CSV 다운로드</span>
          </button>
        </div>
      </div>

      {/* KPI 패널 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">총 PoP 수</p>
              <p className="text-3xl font-bold">{rowData?.length || 0}</p>
            </div>
            <div className="text-4xl opacity-80">🌐</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">서비스 지역</p>
              <p className="text-3xl font-bold">{regionData.length}</p>
            </div>
            <div className="text-4xl opacity-80">🗺️</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">서비스 국가</p>
              <p className="text-3xl font-bold">{countryData.length}</p>
            </div>
            <div className="text-4xl opacity-80">🏁</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Infiny 지원률</p>
              <p className="text-3xl font-bold">{
                rowData && rowData.length > 0 
                  ? Math.round((infinyData.find(d => d.name === 'Infiny 지원')?.value || 0) / rowData.length * 100)
                  : 0
              }%</p>
            </div>
            <div className="text-4xl opacity-80">⚡</div>
          </div>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 지역별 분포 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">📊 지역별 PoP 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Infiny 지원 현황 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">⚡ Infiny 지원 현황</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={infinyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }: any) => `${name}: ${value} (${((percent || 0) * 100).toFixed(1)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {infinyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 상위 국가 및 도시 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 상위 10개 국가 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">🏁 상위 10개 국가</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={countryData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="country" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 상위 10개 도시 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">🏙️ 상위 10개 도시</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={cityData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="city" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 상세 통계 테이블 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">📋 상세 통계</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 지역별 상세 */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">🗺️ 지역별 현황</h4>
            <div className="space-y-2">
              {regionData.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{item.region}</span>
                  <span className="font-semibold">{item.count}개</span>
                </div>
              ))}
            </div>
          </div>

          {/* 시설 유형별 */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">🏢 시설 유형별</h4>
            <div className="space-y-2">
              {facilityData.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{item.type}</span>
                  <span className="font-semibold">{item.count}개</span>
                </div>
              ))}
            </div>
          </div>

          {/* Infiny 상세 */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">⚡ Infiny 상세</h4>
            <div className="space-y-2">
              {infinyData.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-semibold">{item.value}개</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <p className="text-sm text-blue-700">
                <strong>Infiny 지원률:</strong> {
                  rowData && rowData.length > 0 
                    ? ((infinyData.find(d => d.name === 'Infiny 지원')?.value || 0) / rowData.length * 100).toFixed(1)
                    : 0
                }%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 