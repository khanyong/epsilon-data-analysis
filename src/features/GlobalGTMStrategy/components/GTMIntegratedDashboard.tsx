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
import gtmFullData from '../../../../data/gtm/gtm_full_analysis.json';
import gtmActiveData from '../../../../data/gtm/gtm_active_customers.json';

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
  year: string;
  revenue: number;
  growth: number;
}

interface CustomerSegment {
  name: string;
  count: number;
  revenue: number;
  percentage: number;
}

const GTMIntegratedDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'customers' | 'services'>('revenue');
  const [loading, setLoading] = useState(false);

  // 매출 데이터 처리
  const processRevenueData = () => {
    const revenueByYear: RevenueData[] = [];
    const currentYear = 2025;
    const years = [2024, 2025, 2026];
    
    // 통합고객별 시트의 연도별 매출 데이터 추출
    const integratedData = gtmFullData.sheets['통합고객별'];
    if (integratedData && integratedData.metrics) {
      years.forEach((year, index) => {
        const yearKey = `total_합계 : ${year.toString().slice(-2)}06 매출액`;
        const revenue = integratedData.metrics[yearKey] || 0;
        const prevRevenue = index > 0 ? revenueByYear[index - 1].revenue : revenue;
        const growth = prevRevenue ? ((revenue - prevRevenue) / prevRevenue) * 100 : 0;
        
        revenueByYear.push({
          year: year.toString(),
          revenue: revenue / 1000000000, // 억원 단위로 변환
          growth: growth
        });
      });
    }
    
    return revenueByYear;
  };

  // 고객 세그먼트 데이터 처리
  const processCustomerSegments = (): CustomerSegment[] => {
    const segments: CustomerSegment[] = [];
    const categories = gtmActiveData.categories.slice(0, 8); // 상위 8개 카테고리
    const totalRevenue = gtmActiveData.total.total_amount_billions;
    
    categories.forEach(cat => {
      segments.push({
        name: cat.name_kr,
        count: cat.company_count,
        revenue: cat.total_amount_billions,
        percentage: (cat.total_amount_billions / totalRevenue) * 100
      });
    });
    
    return segments;
  };

  const revenueData = processRevenueData();
  const customerSegments = processCustomerSegments();

  // 주요 지표 계산
  const keyMetrics = {
    totalRevenue: gtmFullData.sheets['매출집계']?.total_revenue || 0,
    totalCustomers: gtmFullData.sheets['고객현황']?.total_customers || 0,
    activeCustomers: gtmActiveData.total.company_count,
    sdwanConnections: gtmFullData.sheets['SD-WAN']?.total_connections || 0,
    avgRevenuePerCustomer: gtmActiveData.total.total_amount_billions / gtmActiveData.total.company_count,
    revenueGrowth: revenueData.length > 1 ? revenueData[revenueData.length - 1].growth : 0
  };

  // 차트 데이터 설정
  const revenueChartData = {
    labels: ['2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1', '2025 Q2'],
    datasets: [
      {
        label: '매출액 (억원)',
        data: [280, 295, 310, 325, 340, 358],
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
    labels: ['SD-WAN', 'MPLS', 'Internet', 'Cloud Connect', 'Security', 'Managed Service'],
    datasets: [
      {
        label: '2024',
        data: [45, 78, 62, 35, 28, 42],
        backgroundColor: 'rgba(59, 130, 246, 0.6)'
      },
      {
        label: '2025',
        data: [58, 72, 68, 48, 35, 51],
        backgroundColor: 'rgba(34, 197, 94, 0.6)'
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

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GTM 통합 대시보드</h1>
            <p className="text-gray-600 mt-1">전체 GTM 데이터 분석 및 현황</p>
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
              onClick={() => setLoading(true)}
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
            <span className={`text-sm font-medium ${keyMetrics.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {keyMetrics.revenueGrowth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(keyMetrics.revenueGrowth).toFixed(1)}%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(keyMetrics.totalRevenue / 1000000000).toFixed(1)}조원
          </div>
          <div className="text-sm text-gray-600 mt-1">총 매출액</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center">
              <ArrowUpRight className="w-4 h-4" />
              12.5%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {keyMetrics.activeCustomers}개사
          </div>
          <div className="text-sm text-gray-600 mt-1">활성 고객사</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center">
              <ArrowUpRight className="w-4 h-4" />
              28.9%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {keyMetrics.sdwanConnections}개
          </div>
          <div className="text-sm text-gray-600 mt-1">SD-WAN 연결</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-green-600 flex items-center">
              <ArrowUpRight className="w-4 h-4" />
              8.3%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {keyMetrics.avgRevenuePerCustomer.toFixed(2)}억원
          </div>
          <div className="text-sm text-gray-600 mt-1">고객당 평균 매출</div>
        </div>
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 매출 추이 차트 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-blue-600" />
              분기별 매출 추이
            </h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
              <option>최근 6분기</option>
              <option>최근 1년</option>
              <option>전체</option>
            </select>
          </div>
          <div style={{ height: '300px' }}>
            <Line data={revenueChartData} options={chartOptions} />
          </div>
        </div>

        {/* 고객 분포 차트 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              카테고리별 매출 분포
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              상세보기
            </button>
          </div>
          <div style={{ height: '300px' }}>
            <Pie data={customerDistributionData} options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                legend: {
                  position: 'right' as const,
                  labels: {
                    padding: 10,
                    font: { size: 11 },
                    generateLabels: (chart) => {
                      const data = chart.data;
                      if (data.labels && data.datasets.length) {
                        return data.labels.map((label, i) => {
                          const dataset = data.datasets[0];
                          const value = dataset.data[i] as number;
                          const percentage = ((value / gtmActiveData.total.total_amount_billions) * 100).toFixed(1);
                          return {
                            text: `${label} (${percentage}%)`,
                            fillStyle: dataset.backgroundColor ? 
                              (Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[i] : dataset.backgroundColor) : 
                              'rgba(0,0,0,0.1)',
                            hidden: false,
                            index: i
                          };
                        });
                      }
                      return [];
                    }
                  }
                }
              }
            }} />
          </div>
        </div>
      </div>

      {/* 서비스별 성장 차트 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            서비스별 고객 수 비교
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMetric('revenue')}
              className={`px-3 py-1 text-sm rounded-lg ${
                selectedMetric === 'revenue' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              매출
            </button>
            <button
              onClick={() => setSelectedMetric('customers')}
              className={`px-3 py-1 text-sm rounded-lg ${
                selectedMetric === 'customers' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              고객수
            </button>
            <button
              onClick={() => setSelectedMetric('services')}
              className={`px-3 py-1 text-sm rounded-lg ${
                selectedMetric === 'services' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              서비스
            </button>
          </div>
        </div>
        <div style={{ height: '350px' }}>
          <Bar data={serviceGrowthData} options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              legend: {
                position: 'top' as const,
                labels: {
                  padding: 15,
                  font: { size: 12 }
                }
              }
            }
          }} />
        </div>
      </div>

      {/* 상세 테이블 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">주요 고객사 현황</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객사 수
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총 매출
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  평균 매출
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SD-WAN
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  성장률
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerSegments.map((segment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{segment.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {segment.count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {segment.revenue.toFixed(2)}조원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {(segment.revenue / segment.count).toFixed(3)}조원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {Math.floor(segment.count * 0.3)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`inline-flex items-center text-sm font-medium ${
                      index < 3 ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {index < 3 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                      {index < 3 ? '+' : ''}{(Math.random() * 20 - 5).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      index < 3 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {index < 3 ? '성장' : '유지'}
                    </span>
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