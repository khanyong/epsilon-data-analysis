import React, { useState, useEffect } from 'react';
import { Building2, TrendingUp, Users, DollarSign, PieChart, BarChart3, Search, Filter, RefreshCw, Calendar } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface ActiveCustomer {
  customer_name: string;
  customer_group: string;
  service_count: number;
  total_revenue: number;
  avg_monthly_revenue: number;
  active_months: number;
  latest_month: string;
}

interface CustomerGroupStats {
  group_name: string;
  customer_count: number;
  service_count: number;
  total_revenue: number;
  avg_monthly_revenue: number;
  percentage: number;
}

interface ActiveMetrics {
  totalCustomers: number;
  totalServices: number;
  totalRevenue: number;
  avgMonthlyRevenue: number;
  activeMonths: number;
  avgRevenuePerCustomer: number;
}

const ActiveCustomersSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<ActiveCustomer[]>([]);
  const [customerGroups, setCustomerGroups] = useState<CustomerGroupStats[]>([]);
  const [metrics, setMetrics] = useState<ActiveMetrics>({
    totalCustomers: 0,
    totalServices: 0,
    totalRevenue: 0,
    avgMonthlyRevenue: 0,
    activeMonths: 0,
    avgRevenuePerCustomer: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [sortBy, setSortBy] = useState<'revenue' | 'count' | 'avg'>('revenue');

  useEffect(() => {
    fetchActiveCustomersData();
  }, []);

  const fetchActiveCustomersData = async () => {
    try {
      setLoading(true);

      // 1. 고객별 집계 데이터 조회
      const { data: customerData, error: customerError } = await supabase
        .from('gtm_customer_summary')
        .select('*')
        .order('total_revenue', { ascending: false });

      if (customerError) throw customerError;

      // 2. 마스터 데이터에서 고객군 정보 조회
      const { data: masterData, error: masterError } = await supabase
        .from('gtm_sales_master')
        .select('customer_name, customer_group, service_id');

      if (masterError) throw masterError;

      // 3. 월별 매출 데이터 조회
      const { data: revenueData, error: revenueError } = await supabase
        .from('gtm_sales_revenues')
        .select('*');

      if (revenueError) throw revenueError;

      // 데이터 처리
      processActiveCustomersData(customerData, masterData, revenueData);
      
    } catch (error) {
      console.error('Error fetching active customers data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processActiveCustomersData = (
    customerSummary: any[],
    masters: any[],
    revenues: any[]
  ) => {
    // 고객군 매핑 생성
    const customerGroupMap = new Map<string, string>();
    masters.forEach(master => {
      if (!customerGroupMap.has(master.customer_name)) {
        customerGroupMap.set(master.customer_name, master.customer_group || '미분류');
      }
    });

    // Active 고객 데이터 처리
    const activeCustomers: ActiveCustomer[] = customerSummary
      .filter(c => c.total_revenue > 0)
      .map(customer => ({
        customer_name: customer.customer_name,
        customer_group: customerGroupMap.get(customer.customer_name) || '미분류',
        service_count: customer.service_count,
        total_revenue: customer.total_revenue / 100000000, // 억원 단위
        avg_monthly_revenue: customer.active_months > 0 
          ? (customer.total_revenue / customer.active_months) / 100000000 
          : 0,
        active_months: customer.active_months,
        latest_month: formatMonth(customer.latest_month)
      }));
    
    setCustomers(activeCustomers);

    // 고객군별 통계 계산
    const groupStatsMap = new Map<string, CustomerGroupStats>();
    
    activeCustomers.forEach(customer => {
      const group = customer.customer_group;
      
      if (!groupStatsMap.has(group)) {
        groupStatsMap.set(group, {
          group_name: group,
          customer_count: 0,
          service_count: 0,
          total_revenue: 0,
          avg_monthly_revenue: 0,
          percentage: 0
        });
      }
      
      const stats = groupStatsMap.get(group)!;
      stats.customer_count++;
      stats.service_count += customer.service_count;
      stats.total_revenue += customer.total_revenue;
    });

    // 백분율 및 월평균 계산
    const groupStats = Array.from(groupStatsMap.values());
    const totalGroupRevenue = groupStats.reduce((sum, g) => sum + g.total_revenue, 0);
    const uniqueMonths = new Set(revenues.map(r => r.revenue_month)).size;
    
    groupStats.forEach(group => {
      group.percentage = totalGroupRevenue > 0 ? (group.total_revenue / totalGroupRevenue) * 100 : 0;
      group.avg_monthly_revenue = uniqueMonths > 0 ? group.total_revenue / uniqueMonths : 0;
    });

    setCustomerGroups(groupStats.sort((a, b) => b.total_revenue - a.total_revenue));

    // 전체 메트릭 계산
    const totalRevenue = activeCustomers.reduce((sum, c) => sum + c.total_revenue, 0);
    const totalServices = activeCustomers.reduce((sum, c) => sum + c.service_count, 0);
    
    setMetrics({
      totalCustomers: activeCustomers.length,
      totalServices: totalServices,
      totalRevenue: totalRevenue,
      avgMonthlyRevenue: uniqueMonths > 0 ? totalRevenue / uniqueMonths : 0,
      activeMonths: uniqueMonths,
      avgRevenuePerCustomer: activeCustomers.length > 0 ? totalRevenue / activeCustomers.length : 0
    });
  };

  const formatMonth = (month: string): string => {
    if (!month) return '-';
    const year = '20' + month.substring(0, 2);
    const monthNum = parseInt(month.substring(2, 4));
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    return `${year}년 ${monthNames[monthNum - 1]}`;
  };

  // 카테고리 색상 매핑
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'AX': 'bg-blue-500',
      'CP': 'bg-green-500',
      'IT': 'bg-purple-500',
      'Telco': 'bg-orange-500',
      '공공': 'bg-pink-500',
      '금융': 'bg-yellow-500',
      '전략': 'bg-indigo-500',
      '제조': 'bg-red-500',
      '법인': 'bg-gray-500',
      '방송': 'bg-teal-500',
      '항공': 'bg-cyan-500',
      '건설': 'bg-lime-500',
      '교육': 'bg-amber-500',
      '미분류': 'bg-stone-500'
    };
    return colors[category] || 'bg-gray-400';
  };

  // 필터링된 고객 목록
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = searchTerm === '' || 
      customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === '' || customer.customer_group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  // 정렬된 고객 목록
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'revenue':
        return b.total_revenue - a.total_revenue;
      case 'count':
        return b.service_count - a.service_count;
      case 'avg':
        return b.avg_monthly_revenue - a.avg_monthly_revenue;
      default:
        return 0;
    }
  });

  // 월평균 매출 기준 TOP 10 고객
  const top10ByMonthlyAvg = [...customers]
    .sort((a, b) => b.avg_monthly_revenue - a.avg_monthly_revenue)
    .slice(0, 10);

  // 상위 5개 그룹 (월평균 매출 기준으로 정렬)
  const topGroups = [...customerGroups]
    .sort((a, b) => b.avg_monthly_revenue - a.avg_monthly_revenue)
    .slice(0, 5);

  const handleRefresh = () => {
    fetchActiveCustomersData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">활성 고객 현황</h2>
            <p className="text-blue-100">실시간 DB 기반 고객사 분포 및 매출 분석</p>
          </div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            새로고침
          </button>
        </div>
      </div>

      {/* 주요 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-500">전체 고객사</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.totalCustomers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">개사</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-500">총 매출</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.totalRevenue.toFixed(2)}</div>
          <div className="text-sm text-gray-600">억원</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-500">월평균 매출</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.avgMonthlyRevenue.toFixed(2)}</div>
          <div className="text-sm text-gray-600">억원 ({metrics.activeMonths}개월)</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-gray-500">고객당 평균</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{metrics.avgRevenuePerCustomer.toFixed(2)}</div>
          <div className="text-sm text-gray-600">억원/고객사</div>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="고객사 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">전체 고객군</option>
              {customerGroups.map(group => (
                <option key={group.group_name} value={group.group_name}>
                  {group.group_name} ({group.customer_count}개사)
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'revenue' | 'count' | 'avg')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="revenue">총 매출순</option>
              <option value="count">서비스 수순</option>
              <option value="avg">월평균 매출순</option>
            </select>
          </div>
        </div>
      </div>

      {/* 고객군별 분포 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 막대 차트 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            상위 5개 고객군 월평균 매출
          </h3>
          <div className="space-y-3">
            {topGroups.map((group, index) => (
              <div key={group.group_name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{group.group_name}</span>
                  <span className="text-gray-600">{group.avg_monthly_revenue.toFixed(3)}억원/월</span>
                </div>
                <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full ${getCategoryColor(group.group_name)} opacity-80 transition-all duration-500`}
                    style={{ width: `${(group.avg_monthly_revenue / topGroups[0].avg_monthly_revenue) * 100}%` }}
                  >
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs font-medium">
                      {group.customer_count}개사
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 파이 차트 (시각적 표현) */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-600" />
            고객군별 월평균 매출 비중
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {topGroups.map((group) => {
              const monthlyPercentage = topGroups.reduce((sum, g) => sum + g.avg_monthly_revenue, 0) > 0 
                ? (group.avg_monthly_revenue / topGroups.reduce((sum, g) => sum + g.avg_monthly_revenue, 0)) * 100 
                : 0;
              return (
                <div key={group.group_name} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getCategoryColor(group.group_name)}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{group.group_name}</div>
                    <div className="text-xs text-gray-500">{monthlyPercentage.toFixed(1)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 월평균 매출 TOP 10 테이블 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">월평균 매출 TOP 10 고객사</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  순위
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객사명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객군
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  월평균 매출 (억원)
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총 매출 (억원)
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  활동 개월수
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  서비스 수
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {top10ByMonthlyAvg.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full text-white ${getCategoryColor(customer.customer_group)}`}>
                      {customer.customer_group}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-blue-600">
                    {customer.avg_monthly_revenue.toFixed(3)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {customer.total_revenue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                    {customer.active_months}개월
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                    {customer.service_count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 전체 고객 목록 테이블 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">전체 고객사 현황</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객사명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객군
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  서비스 수
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총 매출 (억원)
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  월평균 매출 (억원)
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  최근 매출
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCustomers.slice(0, 20).map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full text-white ${getCategoryColor(customer.customer_group)}`}>
                      {customer.customer_group}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {customer.service_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    {customer.total_revenue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {customer.avg_monthly_revenue.toFixed(3)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {customer.latest_month}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sortedCustomers.length > 20 && (
          <div className="px-6 py-4 border-t text-center text-sm text-gray-500">
            전체 {sortedCustomers.length}개 중 상위 20개 표시
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveCustomersSection;