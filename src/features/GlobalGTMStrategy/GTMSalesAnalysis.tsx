import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Area, AreaChart, ComposedChart
} from 'recharts';
import { 
  TrendingUp, Users, DollarSign, Calendar, 
  Globe, Filter, Download, RefreshCw,
  ChevronDown, ChevronUp, Package
} from 'lucide-react';

interface GTMSalesData {
  service_id: string;
  customer_name: string;
  service_type: string;
  domestic_overseas: string;
  channel: string;
  revenue_month: string;
  revenue_amount: number;
}

interface CustomerSummary {
  customer_name: string;
  domestic_overseas: string;
  service_count: number;
  total_revenue: number;
  latest_month_revenue: number;
}

interface MonthlyTrend {
  revenue_month: string;
  active_services: number;
  total_revenue: number;
  avg_revenue: number;
}

interface ServiceTypeSummary {
  service_type: string;
  service_count: number;
  customer_count: number;
  total_revenue: number;
}

const GTMSalesAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customerData, setCustomerData] = useState<CustomerSummary[]>([]);
  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyTrend[]>([]);
  const [serviceTypeData, setServiceTypeData] = useState<ServiceTypeSummary[]>([]);
  const [totalMetrics, setTotalMetrics] = useState({
    totalRevenue: 0,
    totalServices: 0,
    totalCustomers: 0,
    avgMonthlyRevenue: 0
  });
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchGTMData();
  }, [selectedFilter]);

  const fetchGTMData = async () => {
    setLoading(true);
    try {
      // 먼저 기본 테이블 데이터 확인
      const { data: masterCheck, error: masterError } = await supabase
        .from('gtm_sales_master')
        .select('*')
        .limit(1);
      
      console.log('Master table check:', masterCheck, masterError);

      // 고객별 요약 데이터
      const { data: customers, error: customerError } = await supabase
        .from('gtm_customer_summary')
        .select('*')
        .order('total_revenue', { ascending: false })
        .limit(20);

      console.log('Customer data:', customers, customerError);
      if (customerError) {
        console.error('Customer error:', customerError);
        throw customerError;
      }

      // 월별 트렌드 데이터
      const { data: trends, error: trendError } = await supabase
        .from('gtm_monthly_trend')
        .select('*')
        .order('revenue_month');

      console.log('Trend data:', trends, trendError);
      if (trendError) {
        console.error('Trend error:', trendError);
        throw trendError;
      }

      // 서비스 유형별 데이터
      const { data: serviceTypes, error: serviceError } = await supabase
        .from('gtm_sales_service_summary')
        .select('*')
        .order('total_revenue', { ascending: false });

      console.log('Service type data:', serviceTypes, serviceError);
      if (serviceError) {
        console.error('Service error:', serviceError);
        throw serviceError;
      }

      // 전체 통계 계산
      const totalRevenue = customers?.reduce((sum, c) => sum + (c.total_revenue || 0), 0) || 0;
      const totalServices = serviceTypes?.reduce((sum, s) => sum + (s.service_count || 0), 0) || 0;
      const totalCustomers = customers?.length || 0;
      const avgMonthlyRevenue = trends?.length > 0 
        ? trends.reduce((sum, t) => sum + (t.total_revenue || 0), 0) / trends.length 
        : 0;

      setCustomerData(customers || []);
      setMonthlyTrend(trends || []);
      setServiceTypeData(serviceTypes || []);
      setTotalMetrics({
        totalRevenue,
        totalServices,
        totalCustomers,
        avgMonthlyRevenue
      });

    } catch (err) {
      console.error('Error fetching GTM data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const formatRevenue = (value: number) => {
    if (value >= 1000000000) {
      return `₩${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `₩${(value / 1000000).toFixed(1)}M`;
    }
    return `₩${(value / 1000).toFixed(0)}K`;
  };

  const formatMonth = (month: string) => {
    // YYMM 형식을 YY년 MM월로 변환
    if (month && month.length === 4) {
      const year = month.substring(0, 2);
      const monthNum = month.substring(2, 4);
      return `${year}년 ${monthNum}월`;
    }
    return month;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-600 text-xl mb-4">데이터 로드 실패</div>
        <div className="text-gray-600 mb-4">{error}</div>
        <button 
          onClick={() => fetchGTMData()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">GTM Sales Analysis</h1>
        <p className="text-gray-600 mt-2">Global Sales 데이터 분석 대시보드</p>
      </div>

      {/* 핵심 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 매출액</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatRevenue(totalMetrics.totalRevenue)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 서비스 수</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalMetrics.totalServices.toLocaleString()}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 고객사</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalMetrics.totalCustomers.toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">월 평균 매출</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatRevenue(totalMetrics.avgMonthlyRevenue)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 월별 매출 트렌드 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">월별 매출 트렌드</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="revenue_month" 
                tickFormatter={formatMonth}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tickFormatter={formatRevenue} />
              <Tooltip 
                formatter={(value: number) => formatRevenue(value)}
                labelFormatter={(label) => formatMonth(label)}
              />
              <Area 
                type="monotone" 
                dataKey="total_revenue" 
                stroke="#0088FE" 
                fill="#0088FE" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 서비스 유형별 매출 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">서비스 유형별 매출</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceTypeData.slice(0, 6)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.service_type}: ${formatRevenue(entry.total_revenue)}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total_revenue"
              >
                {serviceTypeData.slice(0, 6).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatRevenue(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 고객별 매출 Top 20 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">고객별 매출 Top 20</h2>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            {showDetails ? '간단히 보기' : '자세히 보기'}
            {showDetails ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
          </button>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={customerData.slice(0, 20)} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={formatRevenue} />
            <YAxis 
              type="category" 
              dataKey="customer_name" 
              width={150}
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(value: number) => formatRevenue(value)} />
            <Bar dataKey="total_revenue" fill="#0088FE">
              {customerData.slice(0, 20).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.domestic_overseas === '해외' ? '#0088FE' : '#00C49F'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {showDetails && (
          <div className="mt-4 overflow-x-auto">
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
                    구분
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    서비스 수
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    총 매출액
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    최근월 매출
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customerData.slice(0, 20).map((customer, index) => (
                  <tr key={customer.customer_name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {customer.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        customer.domestic_overseas === '해외' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {customer.domestic_overseas || '미분류'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.service_count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {formatRevenue(customer.total_revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRevenue(customer.latest_month_revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 서비스 유형별 상세 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">서비스 유형별 상세 현황</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  서비스 유형
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  서비스 수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객사 수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  총 매출액
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  비중
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {serviceTypeData.map((service) => (
                <tr key={service.service_type}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service.service_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.service_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.customer_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {formatRevenue(service.total_revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {((service.total_revenue / totalMetrics.totalRevenue) * 100).toFixed(1)}%
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

export default GTMSalesAnalysis;