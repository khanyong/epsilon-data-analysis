import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  Sankey
} from 'recharts';
import {
  Building2,
  TrendingUp,
  Users,
  Globe,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  UserCheck,
  RefreshCw,
  Award,
  Activity
} from 'lucide-react';

// UI Components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-3 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>{children}</p>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-3 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: string }) => {
  const variants: Record<string, string> = {
    default: 'bg-gray-100 text-gray-900',
    success: 'bg-green-100 text-green-900',
    warning: 'bg-yellow-100 text-yellow-900',
    danger: 'bg-red-100 text-red-900',
    info: 'bg-blue-100 text-blue-900'
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
};

interface CustomerData {
  id: string;
  customer_name: string;
  headquarters: string;
  team: string;
  annual_revenue: number;
  industry_category: string;
  business_type: string;
  overseas_presence_2025: boolean;
  kt_global_data_usage_2025: boolean;
  other_global_data_usage: boolean;
  other_provider_name: string;
  renewal_date: string;
  other_monthly_fee: number;
}

interface SalesData {
  service_id: string;
  customer_name: string;
  service_type: string;
  status: string;
  contract_end_date: string;
}

interface RevenueData {
  service_id: string;
  revenue_month: string;
  revenue_amount: number;
}

interface KOTRAData {
  id: string;
  country: string;
  region: string;
  city: string;
  company_name_kr: string;
  company_name_en: string;
  industry_major: string;
  industry_minor: string;
  sales_division: string;
  phone: string;
  email: string;
  homepage: string;
  continent: string;
}

export const GlobalGTMStrategyKPI: React.FC<{ section: string }> = ({ section }) => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [sales, setSales] = useState<SalesData[]>([]);
  const [revenues, setRevenues] = useState<RevenueData[]>([]);
  const [kotraData, setKotraData] = useState<KOTRAData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [custResult, salesResult, revResult, kotraResult] = await Promise.all([
        supabase.from('gtm_customers').select('*'),
        supabase.from('gtm_sales_master').select('*'),
        supabase.from('gtm_sales_revenues').select('*'),
        supabase.from('kotra').select('*')
      ]);

      if (custResult.data) {
        setCustomers(custResult.data);
      }
      
      if (salesResult.data) {
        setSales(salesResult.data);
      }
      
      if (revResult.data) {
        setRevenues(revResult.data);
      }
      
      if (kotraResult.data) {
        setKotraData(kotraResult.data);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // KPI 계산 함수들
  const calculateKPIs = () => {
    // 본부별 잠재고객 수
    const hqPotentialCustomers = customers.reduce((acc, customer) => {
      if (customer.overseas_presence_2025 && !customer.kt_global_data_usage_2025) {
        const hq = customer.headquarters || '기타';
        acc[hq] = (acc[hq] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // 갱신 예정 고객
    const renewalSoon = customers.filter(c => {
      if (!c.renewal_date) return false;
      const days = (new Date(c.renewal_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      return days > 0 && days <= 90;
    });

    // 경쟁사 전환 가능 고객
    const competitorCustomers = customers.filter(c => c.other_global_data_usage);

    // 월별 매출 추이
    const monthlyRevenue = revenues.reduce((acc, rev) => {
      const month = rev.revenue_month;
      acc[month] = (acc[month] || 0) + rev.revenue_amount;
      return acc;
    }, {} as Record<string, number>);

    // 서비스별 갱신율 (Active 상태 비율)
    const renewalRate = sales.length > 0 
      ? (sales.filter((s: SalesData) => s.status === 'Active').length / sales.length * 100)
      : 0;

    // Active 고객 계산 (gtm_sales_master의 유니크 고객)
    const uniqueActiveCustomers = new Set(
      sales.map((s: SalesData) => s.customer_name).filter((name: string) => name)
    );
    const activeCustomersCount = uniqueActiveCustomers.size;
    
    console.log('=== GlobalGTMStrategyKPI Active 고객 계산 ===');
    console.log('전체 서비스 수 (sales):', sales.length);
    console.log('유니크 Active 고객 수:', activeCustomersCount);
    console.log('gtm_customers 기반 Active (kt_global_data_usage_2025):', customers.filter(c => c.kt_global_data_usage_2025).length);

    return {
      hqPotentialCustomers,
      renewalSoon,
      competitorCustomers,
      monthlyRevenue,
      renewalRate: renewalRate || 0,
      totalCustomers: customers.length || 0,
      activeCustomers: activeCustomersCount,  // gtm_sales_master 기반 유니크 고객 수
      potentialValue: competitorCustomers.reduce((sum, c) => sum + (c.other_monthly_fee || 0), 0) || 0
    };
  };

  const kpis = calculateKPIs();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-gray-500">GTM 데이터 로딩 중...</div>
        </div>
      </div>
    );
  }
  
  // 데이터가 없는 경우 안내 메시지
  if (!customers.length && !sales.length && !revenues.length) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <div className="text-gray-600 font-semibold mb-2">GTM 데이터가 없습니다</div>
          <div className="text-sm text-gray-500">GTM Data Management 메뉴에서 데이터를 입력해주세요.</div>
        </div>
      </div>
    );
  }

  // 섹션별 렌더링
  switch (section) {
    case 'kpi-dashboard':
      return <KPIDashboard kpis={kpis} customers={customers} sales={sales} revenues={revenues} />;
    case 'headquarters-analysis':
      return <HeadquartersAnalysis customers={customers} kpis={kpis} />;
    case 'renewal-conversion':
      return <RenewalConversionAnalysis customers={customers} sales={sales} />;
    case 'competitor-analysis':
      return <CompetitorAnalysis customers={customers} />;
    case 'sales-org-strategy':
      return <SalesOrgStrategy customers={customers} sales={sales} />;
    case 'territory-optimization':
      return <TerritoryOptimization customers={customers} sales={sales} kotraData={kotraData} />;
    case 'customer-segmentation':
      return <CustomerSegmentation customers={customers} revenues={revenues} />;
    case 'revenue-forecasting':
      return <RevenueForecasting revenues={revenues} sales={sales} />;
    default:
      return <KPIDashboard kpis={kpis} customers={customers} sales={sales} revenues={revenues} />;
  }
};

// 1. 핵심 KPI 대시보드
const KPIDashboard: React.FC<any> = ({ kpis, customers, sales, revenues }) => (
  <div className="space-y-6">
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">핵심 KPI 대시보드</h2>
      <p className="text-gray-600">GTM 전략의 핵심 성과 지표를 한눈에 확인</p>
    </div>

    {/* KPI 카드 */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <Building2 className="h-4 w-4 mr-2 text-blue-600" />
            전체 법인 고객
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{kpis.totalCustomers}</div>
          <p className="text-xs text-gray-600 mt-1">Total Enterprise Customers</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <Activity className="h-4 w-4 mr-2 text-green-600" />
            Active 고객
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">{kpis.activeCustomers}</div>
          <p className="text-xs text-gray-600 mt-1">
            활성화율: {((kpis.activeCustomers / kpis.totalCustomers) * 100).toFixed(1)}%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <RefreshCw className="h-4 w-4 mr-2 text-blue-600" />
            갱신율
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600">{kpis.renewalRate.toFixed(1)}%</div>
          <p className="text-xs text-gray-600 mt-1">서비스 갱신 유지율</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-purple-600" />
            잠재 가치
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-600">
            ₩{(kpis.potentialValue / 100000000).toFixed(1)}억
          </div>
          <p className="text-xs text-gray-600 mt-1">경쟁사 고객 월요금 합계</p>
        </CardContent>
      </Card>
    </div>

    {/* 본부별 잠재고객 차트 */}
    <Card>
      <CardHeader>
        <CardTitle>본부별 잠재고객 현황</CardTitle>
        <CardDescription>해외사업장 보유 but KT 미사용 고객</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={Object.entries(kpis.hqPotentialCustomers).map(([hq, count]) => ({ hq, count }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hq" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* 갱신 예정 고객 리스트 */}
    <Card>
      <CardHeader>
        <CardTitle>90일 내 갱신 예정 고객</CardTitle>
        <CardDescription>우선 컨택이 필요한 고객 리스트</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {kpis.renewalSoon.slice(0, 5).map((customer: CustomerData, idx: number) => (
            <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{customer.customer_name}</p>
                <p className="text-sm text-gray-600">{customer.headquarters} / {customer.team}</p>
              </div>
              <div className="text-right">
                <Badge variant="warning">
                  D-{Math.ceil((new Date(customer.renewal_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                </Badge>
                <p className="text-xs text-gray-600 mt-1">
                  {customer.other_provider_name || 'KT'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// 2. 본부별 잠재고객 분석
const HeadquartersAnalysis: React.FC<any> = ({ customers, kpis }) => {
  // 본부별 통계 계산
  const hqStats = customers.reduce((acc: any, customer: CustomerData) => {
    const hq = customer.headquarters || '기타';
    if (!acc[hq]) {
      acc[hq] = {
        total: 0,
        active: 0,
        potential: 0,
        competitor: 0,
        revenue: 0
      };
    }
    acc[hq].total++;
    if (customer.kt_global_data_usage_2025) acc[hq].active++;
    if (customer.overseas_presence_2025 && !customer.kt_global_data_usage_2025) acc[hq].potential++;
    if (customer.other_global_data_usage) acc[hq].competitor++;
    acc[hq].revenue += customer.annual_revenue || 0;
    return acc;
  }, {});

  const hqData = Object.entries(hqStats).map(([hq, stats]: any) => ({
    hq,
    ...stats,
    conversionRate: stats.total > 0 ? (stats.active / stats.total * 100).toFixed(1) : 0,
    avgRevenue: stats.total > 0 ? Math.round(stats.revenue / stats.total) : 0
  }));

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">본부별 잠재고객 분석</h2>
        <p className="text-gray-600">본부별 영업 기회 발굴 및 우선순위 설정</p>
      </div>

      {/* 본부별 현황 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>본부별 고객 현황 및 우선순위</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3">본부</th>
                  <th className="text-center p-3">전체고객</th>
                  <th className="text-center p-3">Active</th>
                  <th className="text-center p-3">잠재고객</th>
                  <th className="text-center p-3">경쟁사</th>
                  <th className="text-center p-3">활성화율</th>
                  <th className="text-right p-3">평균매출</th>
                  <th className="text-center p-3">우선순위</th>
                </tr>
              </thead>
              <tbody>
                {hqData
                  .sort((a, b) => b.potential - a.potential)
                  .map((hq, idx) => (
                    <tr key={hq.hq} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{hq.hq}</td>
                      <td className="p-3 text-center">{hq.total}</td>
                      <td className="p-3 text-center">
                        <Badge variant="success">{hq.active}</Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant="info">{hq.potential}</Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Badge variant="warning">{hq.competitor}</Badge>
                      </td>
                      <td className="p-3 text-center">{hq.conversionRate}%</td>
                      <td className="p-3 text-right">{hq.avgRevenue}억</td>
                      <td className="p-3 text-center">
                        <Badge variant={idx < 3 ? 'danger' : 'default'}>
                          {idx + 1}순위
                        </Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 본부별 잠재고객 Contact 우선순위 */}
      <Card>
        <CardHeader>
          <CardTitle>Contact 우선순위 매트릭스</CardTitle>
          <CardDescription>잠재고객 수 × 평균 매출 기준</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={hqData.sort((a, b) => (b.potential * b.avgRevenue) - (a.potential * a.avgRevenue)).slice(0, 10)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hq" angle={-45} textAnchor="end" height={100} />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="potential" fill="#8884d8" name="잠재고객 수" />
              <Bar yAxisId="right" dataKey="avgRevenue" fill="#82ca9d" name="평균매출(억)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// 3. 갱신율 및 전환율 분석
const RenewalConversionAnalysis: React.FC<any> = ({ customers, sales }) => {
  // 갱신 데이터 분석
  const renewalData = customers.map((customer: CustomerData) => {
    const daysToRenewal = customer.renewal_date 
      ? Math.ceil((new Date(customer.renewal_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null;
    
    return {
      ...customer,
      daysToRenewal,
      renewalStatus: daysToRenewal === null ? 'N/A' :
                     daysToRenewal < 0 ? '만료' :
                     daysToRenewal <= 30 ? '긴급' :
                     daysToRenewal <= 90 ? '주의' :
                     '안정'
    };
  });

  // 전환 가능성 분석
  const conversionPotential = customers
    .filter((c: CustomerData) => c.other_global_data_usage)
    .map((c: CustomerData) => ({
      name: c.customer_name,
      currentProvider: c.other_provider_name,
      monthlyFee: c.other_monthly_fee,
      daysToRenewal: c.renewal_date 
        ? Math.ceil((new Date(c.renewal_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : null,
      score: calculateConversionScore(c)
    }))
    .sort((a, b) => b.score - a.score);

  function calculateConversionScore(customer: CustomerData) {
    let score = 0;
    if (customer.renewal_date) {
      const days = Math.ceil((new Date(customer.renewal_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (days > 0 && days <= 30) score += 50;
      else if (days > 30 && days <= 90) score += 30;
      else if (days > 90 && days <= 180) score += 10;
    }
    if (customer.other_monthly_fee) {
      if (customer.other_monthly_fee > 10000000) score += 30;
      else if (customer.other_monthly_fee > 5000000) score += 20;
      else score += 10;
    }
    if (customer.overseas_presence_2025) score += 20;
    return score;
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">갱신율 및 전환율 분석</h2>
        <p className="text-gray-600">계약 갱신 관리 및 경쟁사 고객 전환 전략</p>
      </div>

      {/* 갱신 현황 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['긴급', '주의', '안정', '만료'].map((status) => {
          const count = renewalData.filter(r => r.renewalStatus === status).length;
          const variant = status === '긴급' ? 'danger' : 
                          status === '주의' ? 'warning' :
                          status === '안정' ? 'success' : 'default';
          return (
            <Card key={status}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{status}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{count}</div>
                <p className="text-xs text-gray-600">
                  {status === '긴급' && '30일 이내'}
                  {status === '주의' && '31-90일'}
                  {status === '안정' && '90일 이상'}
                  {status === '만료' && '계약 만료'}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 전환 가능성 높은 고객 */}
      <Card>
        <CardHeader>
          <CardTitle>전환 가능성 높은 경쟁사 고객 TOP 10</CardTitle>
          <CardDescription>갱신일, 월요금, 해외사업장 등 종합 스코어</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {conversionPotential.slice(0, 10).map((customer, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-gray-600">
                    현재: {customer.currentProvider} | 월 {(customer.monthlyFee / 10000).toFixed(0)}만원
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-600">{customer.score}</span>
                    <span className="text-xs text-gray-600">점</span>
                  </div>
                  {customer.daysToRenewal && customer.daysToRenewal > 0 && (
                    <Badge variant={customer.daysToRenewal <= 30 ? 'danger' : 'warning'}>
                      D-{customer.daysToRenewal}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 월별 갱신율 추이 */}
      <Card>
        <CardHeader>
          <CardTitle>서비스 상태별 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Active', value: sales.filter((s: SalesData) => s.status === 'Active').length, fill: '#10b981' },
                  { name: 'Pending', value: sales.filter((s: SalesData) => s.status === 'Pending').length, fill: '#f59e0b' },
                  { name: 'Terminated', value: sales.filter((s: SalesData) => s.status === 'Terminated').length, fill: '#ef4444' }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                dataKey="value"
              >
                {[].map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// 4. 경쟁사 고객 공략 전략
const CompetitorAnalysis: React.FC<any> = ({ customers }) => {
  // 경쟁사별 고객 분석
  const competitorStats = customers
    .filter((c: CustomerData) => c.other_global_data_usage)
    .reduce((acc: any, customer: CustomerData) => {
      const provider = customer.other_provider_name || '기타';
      if (!acc[provider]) {
        acc[provider] = {
          count: 0,
          totalFee: 0,
          customers: []
        };
      }
      acc[provider].count++;
      acc[provider].totalFee += customer.other_monthly_fee || 0;
      acc[provider].customers.push(customer);
      return acc;
    }, {});

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">경쟁사 고객 공략 전략</h2>
        <p className="text-gray-600">경쟁사별 고객 현황 및 전환 전략 수립</p>
      </div>

      {/* 경쟁사별 현황 */}
      <Card>
        <CardHeader>
          <CardTitle>경쟁사별 고객 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={Object.entries(competitorStats).map(([provider, stats]: any) => ({
                provider,
                count: stats.count,
                avgFee: stats.totalFee / stats.count / 10000
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="provider" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="고객 수" />
              <Bar yAxisId="right" dataKey="avgFee" fill="#82ca9d" name="평균 월요금(만원)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 경쟁사별 상세 전략 */}
      {Object.entries(competitorStats).map(([provider, stats]: any) => (
        <Card key={provider}>
          <CardHeader>
            <CardTitle>{provider} 고객 공략</CardTitle>
            <CardDescription>
              총 {stats.count}개 고객 | 월 {(stats.totalFee / 10000).toFixed(0)}만원
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">주요 고객</h4>
                <div className="space-y-2">
                  {stats.customers.slice(0, 5).map((c: CustomerData, idx: number) => (
                    <div key={idx} className="text-sm">
                      <span className="font-medium">{c.customer_name}</span>
                      <span className="text-gray-600 ml-2">
                        월 {((c.other_monthly_fee || 0) / 10000).toFixed(0)}만원
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">공략 포인트</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 평균 월요금 대비 10-20% 할인 제안</li>
                  <li>• 글로벌 커버리지 우위 강조</li>
                  <li>• 통합 관리 플랫폼 제공</li>
                  <li>• 전환 비용 지원 프로그램</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// 5. 영업 조직 운영 전략
const SalesOrgStrategy: React.FC<any> = ({ customers, sales }) => {
  // 팀별 성과 분석
  const teamPerformance = customers.reduce((acc: any, customer: CustomerData) => {
    const team = customer.team || '미배정';
    if (!acc[team]) {
      acc[team] = {
        totalCustomers: 0,
        activeCustomers: 0,
        potentialCustomers: 0,
        revenue: 0
      };
    }
    acc[team].totalCustomers++;
    if (customer.kt_global_data_usage_2025) acc[team].activeCustomers++;
    if (customer.overseas_presence_2025 && !customer.kt_global_data_usage_2025) {
      acc[team].potentialCustomers++;
    }
    acc[team].revenue += customer.annual_revenue || 0;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">영업 조직 운영 전략</h2>
        <p className="text-gray-600">팀별 성과 분석 및 리소스 최적화 방안</p>
      </div>

      {/* 팀별 성과 대시보드 */}
      <Card>
        <CardHeader>
          <CardTitle>팀별 성과 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3">팀</th>
                  <th className="text-center p-3">담당고객</th>
                  <th className="text-center p-3">Active</th>
                  <th className="text-center p-3">잠재고객</th>
                  <th className="text-center p-3">활성화율</th>
                  <th className="text-right p-3">총 매출규모</th>
                  <th className="text-center p-3">효율성</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(teamPerformance)
                  .sort((a: any, b: any) => b[1].revenue - a[1].revenue)
                  .map(([team, stats]: any) => {
                    const activationRate = stats.totalCustomers > 0 
                      ? (stats.activeCustomers / stats.totalCustomers * 100).toFixed(1)
                      : 0;
                    const efficiency = stats.revenue / stats.totalCustomers;
                    
                    return (
                      <tr key={team} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{team}</td>
                        <td className="p-3 text-center">{stats.totalCustomers}</td>
                        <td className="p-3 text-center">
                          <Badge variant="success">{stats.activeCustomers}</Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant="info">{stats.potentialCustomers}</Badge>
                        </td>
                        <td className="p-3 text-center">{activationRate}%</td>
                        <td className="p-3 text-right">{stats.revenue.toLocaleString()}억</td>
                        <td className="p-3 text-center">
                          <Badge variant={efficiency > 1000 ? 'success' : 'warning'}>
                            {efficiency.toFixed(0)}억/고객
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 영업 조직 개선 방안 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>리소스 재배치 제안</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="font-semibold text-red-900">우선 강화 필요</p>
                <p className="text-sm text-red-700 mt-1">
                  잠재고객 10개 이상 보유 팀에 추가 인력 배치
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="font-semibold text-yellow-900">효율성 개선 필요</p>
                <p className="text-sm text-yellow-700 mt-1">
                  활성화율 20% 미만 팀 대상 영업 교육 강화
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-semibold text-green-900">벤치마킹 대상</p>
                <p className="text-sm text-green-700 mt-1">
                  고효율 팀의 영업 방식 전사 공유
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>영업 프로세스 개선안</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Lead Scoring 시스템 도입</p>
                  <p className="text-sm text-gray-600">고객 우선순위 자동화</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">CRM 통합 관리</p>
                  <p className="text-sm text-gray-600">고객 이력 및 상태 실시간 추적</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">주간 파이프라인 리뷰</p>
                  <p className="text-sm text-gray-600">팀별 진행 상황 공유</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">인센티브 제도 개선</p>
                  <p className="text-sm text-gray-600">신규 획득 + 갱신율 연계</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 6. 지역별 영업 최적화
const TerritoryOptimization: React.FC<any> = ({ customers, sales, kotraData }) => {
  // KOTRA 데이터 분석 - 대륙별 집계
  const continentAnalysis = kotraData?.reduce((acc: any, company: KOTRAData) => {
    const continent = company.continent || '기타';
    if (!acc[continent]) {
      acc[continent] = {
        count: 0,
        countries: new Set(),
        industries: new Set(),
        companies: []
      };
    }
    acc[continent].count++;
    acc[continent].countries.add(company.country);
    acc[continent].industries.add(company.industry_major);
    acc[continent].companies.push(company);
    return acc;
  }, {}) || {};

  // 국가별 상위 10개국 분석
  const countryAnalysis = kotraData?.reduce((acc: any, company: KOTRAData) => {
    const country = company.country || '미분류';
    if (!acc[country]) {
      acc[country] = { count: 0, cities: new Set(), industries: new Set() };
    }
    acc[country].count++;
    acc[country].cities.add(company.city);
    acc[country].industries.add(company.industry_major);
    return acc;
  }, {}) || {};

  const topCountries = Object.entries(countryAnalysis)
    .sort((a: any, b: any) => b[1].count - a[1].count)
    .slice(0, 10)
    .map(([country, data]: any) => ({
      country,
      count: data.count,
      cities: data.cities.size,
      industries: data.industries.size
    }));

  // 산업별 글로벌 분포
  const industryDistribution = kotraData?.reduce((acc: any, company: KOTRAData) => {
    const industry = company.industry_major || '기타';
    if (!acc[industry]) {
      acc[industry] = { count: 0, countries: new Set() };
    }
    acc[industry].count++;
    acc[industry].countries.add(company.country);
    return acc;
  }, {}) || {};

  const topIndustries = Object.entries(industryDistribution)
    .sort((a: any, b: any) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([industry, data]: any) => ({
      name: industry,
      value: data.count,
      countries: data.countries.size
    }));

  // 대륙별 차트 데이터
  const continentChartData = Object.entries(continentAnalysis).map(([continent, data]: any) => ({
    continent,
    companies: data.count,
    countries: data.countries.size,
    industries: data.industries.size
  }));

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">글로벌 지역별 잠재고객 발굴</h2>
        <p className="text-gray-600">KOTRA 데이터 기반 글로벌 시장 분석 및 잠재고객 현황</p>
      </div>

      {/* 글로벌 잠재고객 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Globe className="h-4 w-4 mr-2 text-blue-600" />
              전체 해외기업
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{kotraData?.length || 0}</div>
            <p className="text-xs text-gray-600 mt-1">KOTRA 등록 기업</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Users className="h-4 w-4 mr-2 text-green-600" />
              진출 국가
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {Object.keys(countryAnalysis).length}
            </div>
            <p className="text-xs text-gray-600 mt-1">개국</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-purple-600" />
              주요 산업
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {Object.keys(industryDistribution).length}
            </div>
            <p className="text-xs text-gray-600 mt-1">개 산업군</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Target className="h-4 w-4 mr-2 text-orange-600" />
              우선 타겟
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {topCountries.slice(0, 3).reduce((sum, c) => sum + c.count, 0)}
            </div>
            <p className="text-xs text-gray-600 mt-1">Top 3 국가 기업수</p>
          </CardContent>
        </Card>
      </div>

      {/* 대륙별 분포 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>대륙별 잠재고객 분포</CardTitle>
          <CardDescription>글로벌 진출 한국 기업의 대륙별 분포 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={continentChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="continent" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="companies" fill="#8884d8" name="기업 수" />
              <Bar yAxisId="right" dataKey="countries" fill="#82ca9d" name="국가 수" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 국가별 Top 10 */}
      <Card>
        <CardHeader>
          <CardTitle>국가별 잠재고객 Top 10</CardTitle>
          <CardDescription>한국 기업이 가장 많이 진출한 국가 순위</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">순위</th>
                  <th className="text-left py-2">국가</th>
                  <th className="text-right py-2">기업 수</th>
                  <th className="text-right py-2">도시 수</th>
                  <th className="text-right py-2">산업군</th>
                  <th className="text-left py-2">영업 전략</th>
                </tr>
              </thead>
              <tbody>
                {topCountries.map((country, index) => (
                  <tr key={country.country} className="border-b hover:bg-gray-50">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2 font-medium">{country.country}</td>
                    <td className="text-right py-2">{country.count}</td>
                    <td className="text-right py-2">{country.cities}</td>
                    <td className="text-right py-2">{country.industries}</td>
                    <td className="py-2">
                      {index < 3 && <Badge variant="success">우선순위</Badge>}
                      {index >= 3 && index < 6 && <Badge variant="warning">중점관리</Badge>}
                      {index >= 6 && <Badge variant="info">장기육성</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 산업별 글로벌 분포 */}
      <Card>
        <CardHeader>
          <CardTitle>산업별 글로벌 진출 현황</CardTitle>
          <CardDescription>주요 산업군의 해외 진출 분포</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topIndustries}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, countries }) => `${name}: ${value}개 (${countries}개국)`}
                outerRadius={100}
                dataKey="value"
              >
                {topIndustries.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'][index % 5]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 지역별 영업 전략 권고안 */}
      <Card>
        <CardHeader>
          <CardTitle>지역별 맞춤 영업 전략</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                아시아 지역 ({continentAnalysis['아시아']?.count || 0}개사)
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 문화적 유사성을 활용한 관계 중심 영업</li>
                <li>• 현지 파트너십 구축 우선</li>
                <li>• 빠른 의사결정 문화 대응</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                북미 지역 ({continentAnalysis['북미']?.count || 0}개사)
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 데이터 기반 ROI 중심 제안</li>
                <li>• 컴플라이언스 및 보안 강조</li>
                <li>• 장기 계약 중심 접근</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                유럽 지역 ({continentAnalysis['유럽']?.count || 0}개사)
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• GDPR 등 규제 준수 강조</li>
                <li>• 품질 및 안정성 중심 어필</li>
                <li>• 다국어 지원 체계 구축</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                신흥 시장 ({(continentAnalysis['남미']?.count || 0) + (continentAnalysis['아프리카']?.count || 0)}개사)
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 가격 경쟁력 및 유연성 강조</li>
                <li>• 현지화 솔루션 제공</li>
                <li>• 성장 가능성 중심 장기 투자</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 7. 고객 세분화 전략
const CustomerSegmentation: React.FC<any> = ({ customers, revenues }) => {
  // 산업별 세분화
  const industrySegments = customers.reduce((acc: any, customer: CustomerData) => {
    const industry = customer.industry_category || '미분류';
    if (!acc[industry]) {
      acc[industry] = {
        count: 0,
        activeCount: 0,
        avgRevenue: 0,
        totalRevenue: 0
      };
    }
    acc[industry].count++;
    if (customer.kt_global_data_usage_2025) acc[industry].activeCount++;
    acc[industry].totalRevenue += customer.annual_revenue || 0;
    return acc;
  }, {});

  // 평균 계산
  Object.keys(industrySegments).forEach(industry => {
    industrySegments[industry].avgRevenue = 
      industrySegments[industry].totalRevenue / industrySegments[industry].count;
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">고객 세분화 전략</h2>
        <p className="text-gray-600">산업별, 규모별 맞춤 영업 전략</p>
      </div>

      {/* 산업별 세분화 */}
      <Card>
        <CardHeader>
          <CardTitle>산업별 고객 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(industrySegments).map(([industry, stats]: any) => ({
                  name: industry,
                  value: stats.count
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                dataKey="value"
              >
                {Object.entries(industrySegments).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 세그먼트별 전략 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(industrySegments).slice(0, 4).map(([industry, stats]: any) => (
          <Card key={industry}>
            <CardHeader>
              <CardTitle className="text-base">{industry}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">고객 수</span>
                  <span className="font-medium">{stats.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">활성화율</span>
                  <span className="font-medium">
                    {((stats.activeCount / stats.count) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">평균 매출</span>
                  <span className="font-medium">{stats.avgRevenue.toFixed(0)}억</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// 8. 매출 예측 및 목표 관리
const RevenueForecasting: React.FC<any> = ({ revenues, sales }) => {
  // 월별 매출 추이 데이터
  const monthlyTrend = revenues.reduce((acc: any, rev: RevenueData) => {
    const month = rev.revenue_month;
    if (!acc[month]) acc[month] = 0;
    acc[month] += rev.revenue_amount;
    return acc;
  }, {});

  const trendData = Object.entries(monthlyTrend)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, amount]) => ({
      month: `20${month.substring(0, 2)}.${month.substring(2, 4)}`,
      actual: (amount as number) / 100000000,
      target: (amount as number) / 100000000 * 1.2 // 목표: 120%
    }));

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">매출 예측 및 목표 관리</h2>
        <p className="text-gray-600">매출 트렌드 분석 및 목표 달성 전략</p>
      </div>

      {/* 매출 트렌드 */}
      <Card>
        <CardHeader>
          <CardTitle>월별 매출 추이 및 목표</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `₩${value.toFixed(1)}억`} />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#8884d8" name="실제 매출" strokeWidth={2} />
              <Line type="monotone" dataKey="target" stroke="#82ca9d" name="목표 매출" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 목표 달성 전략 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">단기 전략 (1-3개월)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 갱신 예정 고객 집중 관리</li>
              <li>• 경쟁사 전환 프로모션 실행</li>
              <li>• 신규 서비스 Cross-selling</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">중기 전략 (3-6개월)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 잠재고객 파이프라인 구축</li>
              <li>• 파트너십 확대</li>
              <li>• 서비스 포트폴리오 강화</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">장기 전략 (6-12개월)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 신규 시장 진출</li>
              <li>• 대형 Deal 추진</li>
              <li>• 전략적 M&A 검토</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalGTMStrategyKPI;