import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  Globe,
  Activity,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { supabase } from '../../../lib/supabase';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueData {
  month: string;
  revenue: number;
  serviceCount: number;
}

interface CustomerSegment {
  name: string;
  count: number;
  revenue: number;
  percentage: number;
  avgMonthlyRevenue: number;
}

interface GTMMetrics {
  totalRevenue: number;
  totalCustomers: number;
  activeServices: number;
  avgRevenuePerCustomer: number;
  avgMonthlyRevenue: number;
  revenueGrowth: number;
  totalMonths: number;
}

const GTMIntegratedDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'customers' | 'services'>('revenue');
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<GTMMetrics>({
    totalRevenue: 0,
    totalCustomers: 0,
    activeServices: 0,
    avgRevenuePerCustomer: 0,
    avgMonthlyRevenue: 0,
    revenueGrowth: 0,
    totalMonths: 0
  });
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // 1. 월별 매출 데이터 조회
      const { data: revenueData, error: revenueError } = await supabase
        .from('gtm_sales_revenues')
        .select('*')
        .order('revenue_month', { ascending: true });

      if (revenueError) throw revenueError;

      // 2. 마스터 데이터 조회
      const { data: masterData, error: masterError } = await supabase
        .from('gtm_sales_master')
        .select('*');

      if (masterError) throw masterError;

      // 3. 고객별 집계 (뷰 사용)
      const { data: customerSummary, error: summaryError } = await supabase
        .from('gtm_customer_summary')
        .select('*')
        .order('total_revenue', { ascending: false });

      if (summaryError) throw summaryError;

      // 4. 월별 트렌드 데이터
      const { data: monthlyTrend, error: trendError } = await supabase
        .from('gtm_monthly_trend')
        .select('*')
        .order('revenue_month', { ascending: true });

      if (trendError) throw trendError;

      // 데이터 처리
      processData(revenueData, masterData, customerSummary, monthlyTrend);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processData = (
    revenues: any[], 
    masters: any[], 
    customerSummary: any[],
    monthlyTrend: any[]
  ) => {
    // 월별 매출 데이터 처리
    const monthlyData = monthlyTrend.map(item => ({
      month: formatMonth(item.revenue_month),
      revenue: item.total_revenue / 100000000, // 억원 단위
      serviceCount: item.active_services
    }));
    setRevenueData(monthlyData);

    // 전체 메트릭 계산
    const totalRevenue = revenues.reduce((sum, r) => sum + (r.revenue_amount || 0), 0);
    const uniqueCustomers = new Set(masters.map(m => m.customer_name)).size;
    const activeServices = masters.length;
    const uniqueMonths = new Set(revenues.map(r => r.revenue_month)).size;
    
    // 월평균 매출 계산
    const avgMonthlyRevenue = uniqueMonths > 0 ? totalRevenue / uniqueMonths : 0;
    
    // 성장률 계산 (최근 2개월 비교)
    let growth = 0;
    if (monthlyTrend.length >= 2) {
      const lastMonth = monthlyTrend[monthlyTrend.length - 1].total_revenue;
      const prevMonth = monthlyTrend[monthlyTrend.length - 2].total_revenue;
      growth = prevMonth > 0 ? ((lastMonth - prevMonth) / prevMonth) * 100 : 0;
    }

    setMetrics({
      totalRevenue: totalRevenue / 100000000, // 억원 단위
      totalCustomers: uniqueCustomers,
      activeServices: activeServices,
      avgRevenuePerCustomer: uniqueCustomers > 0 ? (totalRevenue / uniqueCustomers) / 100000000 : 0,
      avgMonthlyRevenue: avgMonthlyRevenue / 100000000, // 억원 단위
      revenueGrowth: growth,
      totalMonths: uniqueMonths
    });

    // 고객 세그먼트 처리 (고객군별 그룹핑)
    const segmentMap = new Map<string, CustomerSegment>();
    
    masters.forEach(master => {
      const segment = master.customer_group || '기타';
      const customerRevenue = revenues
        .filter(r => r.service_id === master.service_id)
        .reduce((sum, r) => sum + (r.revenue_amount || 0), 0);
      
      if (!segmentMap.has(segment)) {
        segmentMap.set(segment, {
          name: segment,
          count: 0,
          revenue: 0,
          percentage: 0,
          avgMonthlyRevenue: 0
        });
      }
      
      const seg = segmentMap.get(segment)!;
      seg.count++;
      seg.revenue += customerRevenue / 100000000; // 억원 단위
    });

    // 백분율 및 월평균 계산
    const segments = Array.from(segmentMap.values());
    const totalSegmentRevenue = segments.reduce((sum, s) => sum + s.revenue, 0);
    
    segments.forEach(seg => {
      seg.percentage = totalSegmentRevenue > 0 ? (seg.revenue / totalSegmentRevenue) * 100 : 0;
      seg.avgMonthlyRevenue = uniqueMonths > 0 ? seg.revenue / uniqueMonths : 0;
    });

    // 상위 8개 세그먼트만 표시
    setCustomerSegments(segments.sort((a, b) => b.revenue - a.revenue).slice(0, 8));
  };

  const formatMonth = (month: string): string => {
    // YYMM 형식을 읽기 쉬운 형식으로 변환
    const year = '20' + month.substring(0, 2);
    const monthNum = parseInt(month.substring(2, 4));
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[monthNum - 1]} ${year}`;
  };

  // 차트 데이터 설정
  const revenueChartData = {
    labels: revenueData.map(d => d.month),
    datasets: [
      {
        label: '매출액 (억원)',
        data: revenueData.map(d => d.revenue),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const customerDistributionData = {
    labels: customerSegments.map(s => s.name),
    datasets: [
      {
        data: customerSegments.map(s => s.revenue),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(250, 204, 21, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(107, 114, 128, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  const serviceGrowthData = {
    labels: revenueData.slice(-6).map(d => d.month),
    datasets: [
      {
        label: '서비스 수',
        data: revenueData.slice(-6).map(d => d.serviceCount),
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        yAxisID: 'y1'
      },
      {
        label: '매출 (억원)',
        data: revenueData.slice(-6).map(d => d.revenue),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        yAxisID: 'y'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 10,
          font: { size: 11 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 12 },
        bodyFont: { size: 11 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const handleRefresh = () => {
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GTM 통합 대시보드</h1>
            <p className="text-gray-600 mt-1">전체 GTM 데이터 분석 및 현황 (DB 기반)</p>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as 'month' | 'quarter' | 'year')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="month">월별</option>
              <option value="quarter">분기별</option>
              <option value="year">연도별</option>
            </select>
            
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              새로고침
            </button>
            
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              내보내기
            </button>
          </div>
        </div>
      </div>

      {/* 주요 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className={`text-sm font-medium ${metrics.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {metrics.revenueGrowth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(metrics.revenueGrowth).toFixed(1)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {metrics.totalRevenue.toFixed(1)}억원
          </div>
          <div className="text-sm text-gray-600 mt-1">총 매출액</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-blue-600">
              {metrics.totalMonths}개월
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {metrics.avgMonthlyRevenue.toFixed(2)}억원
          </div>
          <div className="text-sm text-gray-600 mt-1">월평균 매출</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">
              {metrics.activeServices}개 서비스
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {metrics.totalCustomers}개사
          </div>
          <div className="text-sm text-gray-600 mt-1">전체 고객사</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {metrics.avgRevenuePerCustomer.toFixed(2)}억원
          </div>
          <div className="text-sm text-gray-600 mt-1">고객당 평균 매출</div>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 매출 트렌드 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-blue-600" />
            월별 매출 트렌드
          </h3>
          <div style={{ height: '300px' }}>
            <Line data={revenueChartData} options={chartOptions} />
          </div>
        </div>

        {/* 고객군별 분포 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-600" />
            고객군별 매출 분포
          </h3>
          <div style={{ height: '300px' }}>
            <Pie data={customerDistributionData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* 서비스 성장 차트 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-green-600" />
          서비스 및 매출 성장
        </h3>
        <div style={{ height: '350px' }}>
          <Bar data={serviceGrowthData} options={{
            ...chartOptions,
            scales: {
              ...chartOptions.scales,
              y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                  drawOnChartArea: false
                }
              }
            }
          }} />
        </div>
      </div>

      {/* 고객 세그먼트 테이블 */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">고객군별 상세 현황</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객군
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객 수
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총 매출 (억원)
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  월평균 매출 (억원)
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  비중 (%)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerSegments.map((segment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {segment.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {segment.count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-medium">
                    {segment.revenue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {segment.avgMonthlyRevenue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span>{segment.percentage.toFixed(1)}%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${segment.percentage}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GTMIntegratedDashboard;