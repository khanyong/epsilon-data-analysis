import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface SynergySalesData {
  id: number;
  company_name: string;
  revenue: number;
  synergy_effect: number;
  region: string;
  quarter: string;
  year: number;
}

interface AnalysisStats {
  totalRecords: number;
  totalRevenue: number;
  totalSynergyEffect: number;
  averageSynergyEffect: number;
  topCompanies: Array<{ name: string; synergy: number }>;
  regionalBreakdown: Array<{ region: string; count: number; revenue: number }>;
  quarterlyTrends: Array<{ quarter: string; revenue: number; synergy: number }>;
  yearlyGrowth: Array<{ year: number; revenue: number; synergy: number }>;
}

export function SynergySalesDBAnalysis() {
  const [data, setData] = useState<SynergySalesData[]>([]);
  const [stats, setStats] = useState<AnalysisStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchSynergySalesData();
  }, []);

  const fetchSynergySalesData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 synergy_sales 테이블 데이터 로딩 중...');

      // 전체 데이터 가져오기 (정렬 제거)
      const { data: rawData, error: fetchError } = await supabase
        .from('synergy_sales')
        .select('*');

      if (fetchError) {
        console.error('❌ 데이터 로딩 실패:', fetchError);
        throw new Error(`데이터 로딩 실패: ${fetchError.message}`);
      }

      if (!rawData || rawData.length === 0) {
        throw new Error('synergy_sales 테이블에 데이터가 없습니다.');
      }

      console.log(`✅ ${rawData.length}개 레코드 로딩 완료`);
      setData(rawData);

      // 통계 계산
      const calculatedStats = calculateStats(rawData);
      setStats(calculatedStats);

    } catch (err) {
      console.error('❌ 분석 중 오류:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: SynergySalesData[]): AnalysisStats => {
    // 기본 통계
    const totalRecords = data.length;
    const totalRevenue = data.reduce((sum, item) => sum + (item.revenue || 0), 0);
    const totalSynergyEffect = data.reduce((sum, item) => sum + (item.synergy_effect || 0), 0);
    const averageSynergyEffect = totalSynergyEffect / totalRecords;

    // 상위 기업 (시너지 효과 기준)
    const companySynergyMap = new Map<string, number>();
    data.forEach(item => {
      const current = companySynergyMap.get(item.company_name) || 0;
      companySynergyMap.set(item.company_name, current + (item.synergy_effect || 0));
    });

    const topCompanies = Array.from(companySynergyMap.entries())
      .map(([name, synergy]) => ({ name, synergy }))
      .sort((a, b) => b.synergy - a.synergy)
      .slice(0, 10);

    // 지역별 분석
    const regionalMap = new Map<string, { count: number; revenue: number }>();
    data.forEach(item => {
      const region = item.region || 'Unknown';
      const current = regionalMap.get(region) || { count: 0, revenue: 0 };
      regionalMap.set(region, {
        count: current.count + 1,
        revenue: current.revenue + (item.revenue || 0)
      });
    });

    const regionalBreakdown = Array.from(regionalMap.entries())
      .map(([region, stats]) => ({ region, ...stats }))
      .sort((a, b) => b.revenue - a.revenue);

    // 분기별 트렌드
    const quarterlyMap = new Map<string, { revenue: number; synergy: number; count: number }>();
    data.forEach(item => {
      const quarter = item.quarter || 'Unknown';
      const current = quarterlyMap.get(quarter) || { revenue: 0, synergy: 0, count: 0 };
      quarterlyMap.set(quarter, {
        revenue: current.revenue + (item.revenue || 0),
        synergy: current.synergy + (item.synergy_effect || 0),
        count: current.count + 1
      });
    });

    const quarterlyTrends = Array.from(quarterlyMap.entries())
      .map(([quarter, stats]) => ({ 
        quarter, 
        revenue: stats.revenue, 
        synergy: stats.synergy 
      }))
      .sort((a, b) => a.quarter.localeCompare(b.quarter));

    // 연도별 성장
    const yearlyMap = new Map<number, { revenue: number; synergy: number; count: number }>();
    data.forEach(item => {
      const year = item.year || new Date().getFullYear();
      const current = yearlyMap.get(year) || { revenue: 0, synergy: 0, count: 0 };
      yearlyMap.set(year, {
        revenue: current.revenue + (item.revenue || 0),
        synergy: current.synergy + (item.synergy_effect || 0),
        count: current.count + 1
      });
    });

    const yearlyGrowth = Array.from(yearlyMap.entries())
      .map(([year, stats]) => ({ 
        year, 
        revenue: stats.revenue, 
        synergy: stats.synergy 
      }))
      .sort((a, b) => a.year - b.year);

    return {
      totalRecords,
      totalRevenue,
      totalSynergyEffect,
      averageSynergyEffect,
      topCompanies,
      regionalBreakdown,
      quarterlyTrends,
      yearlyGrowth
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">synergy_sales 데이터를 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">오류 발생!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
          <button
            onClick={fetchSynergySalesData}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">데이터를 분석할 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg font-bold">DB</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Synergy Sales DB 분석</h1>
                  <p className="text-sm text-gray-500">실제 데이터 기반 시너지 매출 통계</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                총 {stats.totalRecords.toLocaleString()}개 레코드
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: '개요', icon: '📊' },
              { id: 'companies', name: '기업별', icon: '🏢' },
              { id: 'regions', name: '지역별', icon: '🌍' },
              { id: 'trends', name: '트렌드', icon: '📈' },
              { id: 'raw-data', name: '원본 데이터', icon: '📋' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab stats={stats} />}
        {activeTab === 'companies' && <CompaniesTab stats={stats} />}
        {activeTab === 'regions' && <RegionsTab stats={stats} />}
        {activeTab === 'trends' && <TrendsTab stats={stats} />}
        {activeTab === 'raw-data' && <RawDataTab data={data} />}
      </div>
    </div>
  );
}

// 개요 탭
function OverviewTab({ stats }: { stats: AnalysisStats }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm font-bold">📊</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">총 레코드</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRecords.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-sm font-bold">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">총 매출</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-sm font-bold">⚡</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">총 시너지 효과</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalSynergyEffect)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-sm font-bold">📈</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">평균 시너지</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.averageSynergyEffect)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 시너지 효과 비율 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">시너지 효과 비율</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>시너지 효과</span>
              <span>{formatPercentage(stats.totalSynergyEffect, stats.totalRevenue)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${formatPercentage(stats.totalSynergyEffect, stats.totalRevenue)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            총 매출 대비 시너지 효과 비율: {formatCurrency(stats.totalSynergyEffect)} / {formatCurrency(stats.totalRevenue)}
          </p>
        </div>
      </div>
    </div>
  );
}

// 기업별 탭
function CompaniesTab({ stats }: { stats: AnalysisStats }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">상위 10개 기업 (시너지 효과 기준)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">순위</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기업명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시너지 효과</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">비율</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.topCompanies.map((company, index) => (
                <tr key={company.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(company.synergy)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatPercentage(company.synergy, stats.totalSynergyEffect)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 지역별 탭
function RegionsTab({ stats }: { stats: AnalysisStats }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">지역별 분석</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">지역</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">레코드 수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">총 매출</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">비율</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.regionalBreakdown.map((region) => (
                <tr key={region.region}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {region.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {region.count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(region.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatPercentage(region.revenue, stats.totalRevenue)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 트렌드 탭
function TrendsTab({ stats }: { stats: AnalysisStats }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* 분기별 트렌드 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">분기별 트렌드</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">분기</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">총 매출</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">총 시너지</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.quarterlyTrends.map((trend) => (
                <tr key={trend.quarter}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {trend.quarter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(trend.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(trend.synergy)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 연도별 성장 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">연도별 성장</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연도</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">총 매출</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">총 시너지</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.yearlyGrowth.map((growth) => (
                <tr key={growth.year}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {growth.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(growth.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(growth.synergy)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 원본 데이터 탭
function RawDataTab({ data }: { data: SynergySalesData[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">원본 데이터</h3>
          <div className="text-sm text-gray-500">
            {startIndex + 1}-{Math.min(endIndex, data.length)} / {data.length} 레코드
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기업명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매출</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시너지 효과</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">지역</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">분기</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연도</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.company_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.revenue)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.synergy_effect)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quarter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              <span className="px-3 py-1 text-sm">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SynergySalesDBAnalysis; 