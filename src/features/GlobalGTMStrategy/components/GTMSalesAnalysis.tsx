import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import {
  BarChart3,
  TrendingUp,
  Globe,
  DollarSign,
  Activity,
  Users,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

interface SalesData {
  service_id: string;
  customer_name: string;
  service_type: string;
  domestic_overseas: string;
  capacity: number;
  capacity_unit: string;
  pop: string;
  channel: string;
  customer_group: string;
}

interface MonthlyRevenue {
  service_id: string;
  revenue_month: string;
  revenue_amount: number;
}

interface SalesSummary {
  total_revenue: number;
  total_customers: number;
  domestic_revenue: number;
  overseas_revenue: number;
  avg_monthly_revenue: number;
  top_customers: Array<{
    customer_name: string;
    total_revenue: number;
  }>;
}

const GTMSalesAnalysis: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [selectedServiceType, setSelectedServiceType] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  useEffect(() => {
    fetchData();
  }, [selectedPeriod, selectedServiceType, selectedRegion]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // 기본 판매 데이터 조회
      let salesQuery = supabase
        .from('gtm_global_sales')
        .select('*');

      if (selectedServiceType !== 'all') {
        salesQuery = salesQuery.eq('service_type', selectedServiceType);
      }
      if (selectedRegion !== 'all') {
        salesQuery = salesQuery.eq('domestic_overseas', selectedRegion);
      }

      const { data: salesResult, error: salesError } = await salesQuery;
      if (salesError) throw salesError;

      // 월별 매출 데이터 조회
      const startDate = getStartDate(selectedPeriod);
      const { data: revenueResult, error: revenueError } = await supabase
        .from('gtm_monthly_revenue')
        .select('*')
        .gte('revenue_month', startDate)
        .order('revenue_month', { ascending: true });

      if (revenueError) throw revenueError;

      setSalesData(salesResult || []);
      setMonthlyRevenue(revenueResult || []);

      // 요약 데이터 계산
      calculateSummary(salesResult || [], revenueResult || []);

    } catch (error) {
      console.error('데이터 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStartDate = (period: string) => {
    const now = new Date();
    switch (period) {
      case '1month':
        now.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        now.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        now.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        now.setFullYear(now.getFullYear() - 1);
        break;
      default:
        now.setMonth(now.getMonth() - 3);
    }
    return now.toISOString().split('T')[0];
  };

  const calculateSummary = (sales: SalesData[], revenue: MonthlyRevenue[]) => {
    const totalRevenue = revenue.reduce((sum, r) => sum + (r.revenue_amount || 0), 0);
    const uniqueCustomers = new Set(sales.map(s => s.customer_name)).size;

    // 국내/해외 매출 계산
    const domesticRevenue = revenue
      .filter(r => {
        const sale = sales.find(s => s.service_id === r.service_id);
        return sale?.domestic_overseas === '국내';
      })
      .reduce((sum, r) => sum + (r.revenue_amount || 0), 0);

    const overseasRevenue = revenue
      .filter(r => {
        const sale = sales.find(s => s.service_id === r.service_id);
        return sale?.domestic_overseas === '해외';
      })
      .reduce((sum, r) => sum + (r.revenue_amount || 0), 0);

    // 고객별 매출 집계
    const customerRevenue: { [key: string]: number } = {};
    revenue.forEach(r => {
      const sale = sales.find(s => s.service_id === r.service_id);
      if (sale) {
        customerRevenue[sale.customer_name] = 
          (customerRevenue[sale.customer_name] || 0) + (r.revenue_amount || 0);
      }
    });

    const topCustomers = Object.entries(customerRevenue)
      .map(([name, total]) => ({ customer_name: name, total_revenue: total }))
      .sort((a, b) => b.total_revenue - a.total_revenue)
      .slice(0, 10);

    setSummary({
      total_revenue: totalRevenue,
      total_customers: uniqueCustomers,
      domestic_revenue: domesticRevenue,
      overseas_revenue: overseasRevenue,
      avg_monthly_revenue: revenue.length > 0 ? totalRevenue / revenue.length : 0,
      top_customers: topCustomers
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(1)}억`;
    } else if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}만`;
    }
    return value.toLocaleString();
  };

  const exportToCSV = () => {
    // CSV 내보내기 로직
    const csvContent = [
      ['고객명', '서비스유형', '지역', '총매출'],
      ...summary?.top_customers.map(c => [
        c.customer_name,
        salesData.find(s => s.customer_name === c.customer_name)?.service_type || '',
        salesData.find(s => s.customer_name === c.customer_name)?.domestic_overseas || '',
        c.total_revenue
      ]) || []
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `gtm_sales_analysis_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
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
      {/* 필터 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            필터 옵션
          </h2>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Download className="h-4 w-4" />
            CSV 내보내기
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              기간 선택
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1month">최근 1개월</option>
              <option value="3months">최근 3개월</option>
              <option value="6months">최근 6개월</option>
              <option value="1year">최근 1년</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              서비스 유형
            </label>
            <select
              value={selectedServiceType}
              onChange={(e) => setSelectedServiceType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">전체</option>
              <option value="글로벌패스 전용회선">글로벌패스 전용회선</option>
              <option value="글로벌 프리미엄 인터넷">글로벌 프리미엄 인터넷</option>
              <option value="글로벌패스 MPLS-VPN">글로벌패스 MPLS-VPN</option>
              <option value="글로벌 IDC">글로벌 IDC</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              지역
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">전체</option>
              <option value="국내">국내</option>
              <option value="해외">해외</option>
            </select>
          </div>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 매출</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(summary?.total_revenue || 0)}원
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">고객 수</p>
              <p className="text-2xl font-bold text-gray-900">
                {summary?.total_customers || 0}개사
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">국내 매출</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(summary?.domestic_revenue || 0)}원
              </p>
            </div>
            <Activity className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">해외 매출</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(summary?.overseas_revenue || 0)}원
              </p>
            </div>
            <Globe className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Top 10 고객 테이블 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Top 10 고객 매출
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  순위
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  서비스 유형
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  지역
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총 매출
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  비중
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {summary?.top_customers.map((customer, index) => {
                const sale = salesData.find(s => s.customer_name === customer.customer_name);
                const percentage = ((customer.total_revenue / (summary?.total_revenue || 1)) * 100).toFixed(1);
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {customer.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale?.service_type || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        sale?.domestic_overseas === '국내' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {sale?.domestic_overseas || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {formatCurrency(customer.total_revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {percentage}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 월별 트렌드 차트 (간단한 표 형태) */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          월별 매출 트렌드
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from(new Set(monthlyRevenue.map(r => r.revenue_month)))
            .sort()
            .slice(-6)
            .map(month => {
              const monthTotal = monthlyRevenue
                .filter(r => r.revenue_month === month)
                .reduce((sum, r) => sum + (r.revenue_amount || 0), 0);
              
              return (
                <div key={month} className="text-center">
                  <p className="text-xs text-gray-500 mb-1">
                    {new Date(month).toLocaleDateString('ko-KR', { year: '2-digit', month: 'short' })}
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {formatNumber(monthTotal)}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default GTMSalesAnalysis;