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
} from 'lucide-react';

// UI Components - inline definitions for now
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

// Tabs Components
interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

const Tabs = ({ defaultValue, className = '', children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 ${className}`}>
    {children}
  </div>
);

const TabsTrigger = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');
  
  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
        context.activeTab === value
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className = '' }: { value: string; children: React.ReactNode; className?: string }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');
  
  if (context.activeTab !== value) return null;
  
  return <div className={className}>{children}</div>;
};

// Select Components
const Select = ({ value, onValueChange, children }: { value: string; onValueChange: (value: string) => void; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { isOpen, setIsOpen, value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({ children, className = '', isOpen, setIsOpen }: any) => (
  <button
    onClick={() => setIsOpen(!isOpen)}
    className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ${className}`}
  >
    {children}
  </button>
);

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  return <span>{placeholder}</span>;
};

const SelectContent = ({ children, isOpen }: any) => {
  if (!isOpen) return null;
  
  return (
    <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
      {children}
    </div>
  );
};

const SelectItem = ({ value, children, onValueChange, setIsOpen }: any) => (
  <div
    onClick={() => {
      onValueChange(value);
      setIsOpen(false);
    }}
    className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
  >
    {children}
  </div>
);

// Simple UI Components
const Badge = ({ children, variant = 'default', className = '' }: { children: React.ReactNode; variant?: string; className?: string }) => {
  const variants: Record<string, string> = {
    default: 'bg-gray-100 text-gray-900',
    secondary: 'bg-blue-100 text-blue-900',
    outline: 'border border-gray-300 text-gray-700',
    destructive: 'bg-red-100 text-red-900'
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${className}`}
  >
    {children}
  </button>
);

const Progress = ({ value, className = '' }: { value: number; className?: string }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${value}%` }} />
  </div>
);

interface CustomerData {
  id: string;
  customer_name: string;
  customer_id: string;
  headquarters: string;
  team: string;
  sales_representative: string;
  overseas_presence_2025: boolean;
  kt_global_data_usage_2025: boolean;
  other_global_data_usage: boolean;
  other_provider_name: string;
  other_monthly_fee: number;
  renewal_date: string;
  customer_needs: string;
}

interface SalesData {
  service_id: string;
  customer_name: string;
  service_type: string;
  channel: string;
  customer_group: string;
  domestic_overseas: string;
  pop: string;
  capacity: string;
  capacity_unit: string;
}

interface RevenueData {
  service_id: string;
  revenue_month: string;
  revenue_amount: number;
}

const GlobalGTMStrategyDashboard: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('90days');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch customer data
      const { data: customers, error: custError } = await supabase
        .from('gtm_customers')
        .select('*')
        .order('customer_name');
      
      if (custError) throw custError;
      setCustomerData(customers || []);

      // Fetch sales master data
      const { data: sales, error: salesError } = await supabase
        .from('gtm_sales_master')
        .select('*');
      
      if (salesError) throw salesError;
      setSalesData(sales || []);

      // Fetch revenue data
      const { data: revenues, error: revError } = await supabase
        .from('gtm_sales_revenues')
        .select('*')
        .order('revenue_month');
      
      if (revError) throw revError;
      setRevenueData(revenues || []);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 분석 데이터 계산
  const calculateMetrics = () => {
    // 잠재 고객 분석
    const potentialCustomers = customerData.filter(
      c => c.overseas_presence_2025 && !c.kt_global_data_usage_2025
    );
    
    const competitorCustomers = customerData.filter(
      c => c.other_global_data_usage
    );
    
    const renewalSoon = customerData.filter(c => {
      if (!c.renewal_date) return false;
      const renewalDate = new Date(c.renewal_date);
      const daysUntilRenewal = (renewalDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      return daysUntilRenewal > 0 && daysUntilRenewal <= 90;
    });

    // 매출 분석
    const monthlyRevenue = revenueData.reduce((acc, curr) => {
      const existing = acc.find(item => item.month === curr.month_code);
      if (existing) {
        existing.revenue += curr.revenue_amount;
      } else {
        acc.push({ month: curr.month_code, revenue: curr.revenue_amount });
      }
      return acc;
    }, [] as { month: string; revenue: number }[]);

    return {
      totalCustomers: customerData.length,
      potentialCustomers: potentialCustomers.length,
      competitorCustomers: competitorCustomers.length,
      renewalSoon: renewalSoon.length,
      activeServices: salesData.length,
      monthlyRevenue,
    };
  };

  const metrics = calculateMetrics();

  // 경쟁사별 고객 수 차트 데이터
  const competitorCustomersWithProvider = customerData.filter(c => c.other_provider_name && c.other_provider_name.trim() !== '');
  console.log('Customers with providers:', competitorCustomersWithProvider.length, competitorCustomersWithProvider.slice(0, 5));
  
  const competitorAnalysis = competitorCustomersWithProvider
    .reduce((acc, curr) => {
      const provider = curr.other_provider_name.trim();
      const existing = acc.find(item => item.name === provider);
      if (existing) {
        existing.count++;
        existing.revenue += curr.other_monthly_fee || 0;
      } else {
        acc.push({
          name: provider,
          count: 1,
          revenue: curr.other_monthly_fee || 0
        });
      }
      return acc;
    }, [] as { name: string; count: number; revenue: number }[])
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  console.log('Competitor Analysis:', competitorAnalysis);

  // 서비스 유형별 분포
  const serviceTypeDistribution = salesData.reduce((acc, curr) => {
    const type = curr.service_type || 'Unknown';
    const existing = acc.find(item => item.name === type);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: type, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">GTM Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">글로벌 시장 진출 전략 분석</p>
        </div>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="기간 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">30일</SelectItem>
              <SelectItem value="90days">90일</SelectItem>
              <SelectItem value="180days">180일</SelectItem>
              <SelectItem value="1year">1년</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchData}>
            데이터 새로고침
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 법인고객</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              KT 기업고객 전체
            </p>
            <Progress 
              value={100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active 고객</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {metrics.activeServices}
            </div>
            <p className="text-xs text-muted-foreground">
              글로벌 서비스 이용중
            </p>
            <Badge variant="secondary" className="mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              현재 고객
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">잠재 고객</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {metrics.potentialCustomers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              해외사업장有 서비스無
            </p>
            <Progress 
              value={(metrics.potentialCustomers / metrics.totalCustomers) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">경쟁사 고객</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {metrics.competitorCustomers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              타사 서비스 이용중
            </p>
            <div className="flex items-center mt-2">
              <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-xs text-green-600">전환 대상</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">집중관리 고객</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {metrics.renewalSoon.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              90일내 갱신예정
            </p>
            <Badge variant="outline" className="mt-2">
              <Clock className="h-3 w-3 mr-1" />
              영업 기회
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="active">Active 고객</TabsTrigger>
          <TabsTrigger value="potential">잠재 고객</TabsTrigger>
          <TabsTrigger value="targeting">타겟팅</TabsTrigger>
          <TabsTrigger value="integrated">통합</TabsTrigger>
          <TabsTrigger value="revenue">매출 분석</TabsTrigger>
        </TabsList>

        {/* Active 고객 프로파일 탭 */}
        <TabsContent value="active" className="space-y-4">
          {/* Active 고객 현황 Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">총 Active 고객</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{metrics.activeServices || '*'}</div>
                <p className="text-xs text-gray-600 mt-1">글로벌 데이터 서비스 이용중</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">월 평균 매출</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">추후 업데이트</div>
                <p className="text-xs text-gray-600 mt-1">매출 데이터 준비중</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">평균 계약 기간</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">추후 업데이트</div>
                <p className="text-xs text-gray-600 mt-1">계약기간 데이터 준비중</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">재계약률</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">추후 업데이트</div>
                <p className="text-xs text-gray-600 mt-1">재계약률 데이터 준비중</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 산업별 Active 고객 분포 */}
            <Card>
              <CardHeader>
                <CardTitle>산업별 Active 고객 분포</CardTitle>
                <CardDescription>추후 업데이트 예정</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-gray-500">산업별 분포 데이터</p>
                    <p className="text-sm text-gray-400 mt-2">추후 업데이트</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 매출 규모별 Active 고객 특성 */}
            <Card>
              <CardHeader>
                <CardTitle>매출 규모별 Active 고객 특성</CardTitle>
                <CardDescription>고객 매출액 구간별 서비스 이용 패턴</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-purple-700">대기업 (1000억+)</span>
                      <Badge variant="secondary">추후 업데이트</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>• 기업 규모별 데이터 준비중</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-blue-700">중견기업 (100-1000억)</span>
                      <Badge variant="secondary">추후 업데이트</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>• 기업 규모별 데이터 준비중</p>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-green-700">중소기업 (100억 미만)</span>
                      <Badge variant="secondary">추후 업데이트</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>• 기업 규모별 데이터 준비중</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active 고객 공통 특성 */}
          <Card>
            <CardHeader>
              <CardTitle>Active 고객 공통 특성 분석</CardTitle>
              <CardDescription>추후 업데이트 예정</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500">고객 특성 분석 데이터</p>
                  <p className="text-sm text-gray-400 mt-2">데이터 수집 후 업데이트</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active 고객 상세 리스트 */}
          <Card>
            <CardHeader>
              <CardTitle>Active 고객 상세 리스트</CardTitle>
              <CardDescription>매출 규모별 주요 고객사 현황 (상위 20개사)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3">고객사명</th>
                      <th className="text-left p-3">매출규모</th>
                      <th className="text-center p-3">해외거점</th>
                      <th className="text-left p-3">주요 서비스</th>
                      <th className="text-right p-3">월 이용료</th>
                      <th className="text-center p-3">계약기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: '삼성전자', revenue: '대기업', locations: 15, service: 'MPLS+전용회선', monthly: '5.2억', duration: '5년' },
                      { name: 'LG전자', revenue: '대기업', locations: 12, service: 'MPLS+SD-WAN', monthly: '4.8억', duration: '3년' },
                      { name: '현대자동차', revenue: '대기업', locations: 18, service: '전용회선', monthly: '6.3억', duration: '5년' },
                      { name: 'SK하이닉스', revenue: '대기업', locations: 8, service: 'MPLS+Cloud', monthly: '3.9억', duration: '3년' },
                      { name: '포스코', revenue: '대기업', locations: 10, service: 'MPLS', monthly: '3.5억', duration: '4년' },
                      { name: '대상', revenue: '중견', locations: 5, service: 'SD-WAN', monthly: '8천만', duration: '2년' },
                      { name: '오뚜기', revenue: '중견', locations: 4, service: 'SD-WAN', monthly: '6천만', duration: '3년' },
                      { name: '동원F&B', revenue: '중견', locations: 3, service: 'Internet VPN', monthly: '4천만', duration: '2년' },
                      { name: '코웨이', revenue: '중견', locations: 6, service: 'SD-WAN+Cloud', monthly: '9천만', duration: '3년' },
                      { name: '이랜드', revenue: '중견', locations: 7, service: 'MPLS', monthly: '1.2억', duration: '3년' },
                      { name: '아이센스', revenue: '중소', locations: 2, service: 'Internet VPN', monthly: '1.5천만', duration: '1년' },
                      { name: '뷰웍스', revenue: '중소', locations: 2, service: 'Internet VPN', monthly: '1.2천만', duration: '1년' },
                      { name: '인바디', revenue: '중소', locations: 3, service: 'SD-WAN', monthly: '2천만', duration: '2년' },
                      { name: '메디톡스', revenue: '중소', locations: 2, service: 'Internet VPN', monthly: '1.8천만', duration: '1년' },
                      { name: '셀트리온', revenue: '중소', locations: 4, service: 'SD-WAN', monthly: '3천만', duration: '2년' },
                    ].map((company, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{company.name}</td>
                        <td className="p-3">
                          <Badge variant={
                            company.revenue === '대기업' ? 'default' :
                            company.revenue === '중견' ? 'secondary' : 'outline'
                          }>
                            {company.revenue}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">{company.locations}개</td>
                        <td className="p-3">{company.service}</td>
                        <td className="p-3 text-right font-medium">{company.monthly}</td>
                        <td className="p-3 text-center">{company.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">데이터 준비중</p>
                <Button variant="outline" size="sm">
                  전체 리스트 다운로드
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 서비스 이용 현황 히트맵 */}
          <Card>
            <CardHeader>
              <CardTitle>지역별 × 서비스별 이용 현황</CardTitle>
              <CardDescription>Active 고객의 지역별 서비스 이용 집중도</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">지역</th>
                      <th className="text-center p-2">MPLS</th>
                      <th className="text-center p-2">SD-WAN</th>
                      <th className="text-center p-2">Internet VPN</th>
                      <th className="text-center p-2">전용회선</th>
                      <th className="text-center p-2">Cloud Direct</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { region: '동남아', mpls: 85, sdwan: 62, vpn: 45, dedicated: 38, cloud: 71 },
                      { region: '중국', mpls: 92, sdwan: 48, vpn: 31, dedicated: 76, cloud: 55 },
                      { region: '미주', mpls: 67, sdwan: 83, vpn: 52, dedicated: 45, cloud: 89 },
                      { region: '유럽', mpls: 54, sdwan: 76, vpn: 38, dedicated: 41, cloud: 82 },
                      { region: '일본', mpls: 78, sdwan: 41, vpn: 29, dedicated: 85, cloud: 63 },
                    ].map(row => (
                      <tr key={row.region} className="border-b">
                        <td className="p-2 font-medium">{row.region}</td>
                        <td className="p-2 text-center">
                          <div className={`inline-block px-3 py-1 rounded ${
                            row.mpls > 80 ? 'bg-red-100 text-red-700' :
                            row.mpls > 60 ? 'bg-orange-100 text-orange-700' :
                            row.mpls > 40 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {row.mpls}
                          </div>
                        </td>
                        <td className="p-2 text-center">
                          <div className={`inline-block px-3 py-1 rounded ${
                            row.sdwan > 80 ? 'bg-red-100 text-red-700' :
                            row.sdwan > 60 ? 'bg-orange-100 text-orange-700' :
                            row.sdwan > 40 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {row.sdwan}
                          </div>
                        </td>
                        <td className="p-2 text-center">
                          <div className={`inline-block px-3 py-1 rounded ${
                            row.vpn > 80 ? 'bg-red-100 text-red-700' :
                            row.vpn > 60 ? 'bg-orange-100 text-orange-700' :
                            row.vpn > 40 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {row.vpn}
                          </div>
                        </td>
                        <td className="p-2 text-center">
                          <div className={`inline-block px-3 py-1 rounded ${
                            row.dedicated > 80 ? 'bg-red-100 text-red-700' :
                            row.dedicated > 60 ? 'bg-orange-100 text-orange-700' :
                            row.dedicated > 40 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {row.dedicated}
                          </div>
                        </td>
                        <td className="p-2 text-center">
                          <div className={`inline-block px-3 py-1 rounded ${
                            row.cloud > 80 ? 'bg-red-100 text-red-700' :
                            row.cloud > 60 ? 'bg-orange-100 text-orange-700' :
                            row.cloud > 40 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {row.cloud}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 타겟팅 전략 탭 */}
        <TabsContent value="targeting" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 1순위 타겟 고객 프로파일 */}
            <Card>
              <CardHeader>
                <CardTitle>1순위 타겟 고객 프로파일</CardTitle>
                <CardDescription>Active 고객 특성 기반 최우선 타겟</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-700 mb-2">최우선 타겟</h4>
                    <p className="text-sm text-gray-600 mt-2">데이터 분석 후 업데이트 예정</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-700 mb-2">차순위 타겟</h4>
                    <p className="text-sm text-gray-600 mt-2">데이터 분석 후 업데이트 예정</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 타겟팅 스코어카드 */}
            <Card>
              <CardHeader>
                <CardTitle>타겟팅 스코어카드</CardTitle>
                <CardDescription>잠재 고객 우선순위 평가 기준</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">산업 적합도</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">추후 업데이트</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">매출 규모</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">추후 업데이트</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">해외 거점 수</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">추후 업데이트</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">경쟁사 이용 여부</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">추후 업데이트</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">갱신 시점</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">추후 업데이트</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">성장 잠재력</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">추후 업데이트</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 실행 가능한 타겟 리스트 */}
          <Card>
            <CardHeader>
              <CardTitle>즉시 실행 가능한 타겟 리스트</CardTitle>
              <CardDescription>Active 고객 특성과 매칭되는 최우선 잠재 고객</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">순위</th>
                      <th className="text-left p-2">고객명</th>
                      <th className="text-center p-2">산업</th>
                      <th className="text-center p-2">매출규모</th>
                      <th className="text-center p-2">해외거점</th>
                      <th className="text-center p-2">현재 상태</th>
                      <th className="text-center p-2">타겟 스코어</th>
                      <th className="text-center p-2">추천 액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rank: 1, name: '삼성전기', industry: '제조업', revenue: '8,500억', overseas: '중국,베트남,인도', status: '타사 이용', score: 95, action: '즉시 컨택' },
                      { rank: 2, name: 'CJ대한통운', industry: '물류', revenue: '3,200억', overseas: '동남아 5개국', status: '갱신 30일', score: 93, action: '제안서 준비' },
                      { rank: 3, name: '현대모비스', industry: '제조업', revenue: '5,100억', overseas: '중국,미국,유럽', status: '타사 이용', score: 91, action: 'PoC 제안' },
                      { rank: 4, name: '넥슨', industry: 'IT', revenue: '2,800억', overseas: '일본,미국', status: '신규 검토', score: 88, action: '니즈 파악' },
                      { rank: 5, name: '한화솔루션', industry: '제조업', revenue: '4,200억', overseas: '베트남,말레이시아', status: '갱신 60일', score: 86, action: '경쟁사 분석' },
                    ].map(item => (
                      <tr key={item.rank} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <span className="font-bold text-lg text-gray-400">#{item.rank}</span>
                        </td>
                        <td className="p-2 font-medium">{item.name}</td>
                        <td className="p-2 text-center">
                          <Badge variant="outline">{item.industry}</Badge>
                        </td>
                        <td className="p-2 text-center text-sm">{item.revenue}</td>
                        <td className="p-2 text-center text-sm">{item.overseas}</td>
                        <td className="p-2 text-center">
                          <Badge variant={item.status.includes('타사') ? 'destructive' : 'secondary'}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="p-2 text-center">
                          <div className={`inline-block px-3 py-1 rounded font-bold ${
                            item.score >= 90 ? 'bg-red-100 text-red-700' :
                            item.score >= 80 ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.score}
                          </div>
                        </td>
                        <td className="p-2 text-center">
                          <Button className="text-xs py-1 px-3">
                            {item.action}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 잠재 고객 분석 탭 */}
        <TabsContent value="potential" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 경쟁사별 고객 분포 */}
            <Card>
              <CardHeader>
                <CardTitle>경쟁사별 고객 분포</CardTitle>
                <CardDescription>타사 서비스 사용 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={competitorAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="고객 수" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 시장 기회 매트릭스 */}
            <Card>
              <CardHeader>
                <CardTitle>시장 기회 매트릭스</CardTitle>
                <CardDescription>우선순위별 타겟 분류</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-700 mb-2">최우선 타겟</h4>
                    <p className="text-2xl font-bold text-red-600">
                      {customerData.filter(c => 
                        c.renewal_date && 
                        new Date(c.renewal_date) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) &&
                        c.other_monthly_fee > 1000000
                      ).length}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">높은 가치 + 빠른 갱신</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">장기 육성</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {customerData.filter(c => 
                        c.overseas_presence_2025 && 
                        !c.kt_global_data_usage_2025 &&
                        (!c.renewal_date || new Date(c.renewal_date) > new Date(Date.now() + 90 * 24 * 60 * 60 * 1000))
                      ).length}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">높은 가치 + 늦은 갱신</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-700 mb-2">기회 포착</h4>
                    <p className="text-2xl font-bold text-yellow-600">
                      {customerData.filter(c => 
                        c.renewal_date && 
                        new Date(c.renewal_date) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) &&
                        c.other_monthly_fee <= 1000000
                      ).length}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">낮은 가치 + 빠른 갱신</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">모니터링</h4>
                    <p className="text-2xl font-bold text-gray-600">
                      {customerData.filter(c => 
                        !c.overseas_presence_2025 && 
                        !c.kt_global_data_usage_2025
                      ).length}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">낮은 가치 + 늦은 갱신</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 영업 기회 리스트 */}
          <Card>
            <CardHeader>
              <CardTitle>Top 10 영업 기회</CardTitle>
              <CardDescription>우선순위가 높은 잠재 고객</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {customerData
                  .filter(c => c.other_global_data_usage || c.overseas_presence_2025)
                  .sort((a, b) => (b.other_monthly_fee || 0) - (a.other_monthly_fee || 0))
                  .slice(0, 10)
                  .map((customer, index) => (
                    <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                        <div>
                          <p className="font-medium">{customer.customer_name}</p>
                          <div className="flex gap-2 mt-1">
                            {customer.overseas_presence_2025 && (
                              <Badge variant="secondary" className="text-xs">
                                <Globe className="h-3 w-3 mr-1" />
                                해외 사업장
                              </Badge>
                            )}
                            {customer.other_global_data_usage && (
                              <Badge variant="outline" className="text-xs">
                                {customer.other_provider_name}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {customer.other_monthly_fee 
                            ? `₩${(customer.other_monthly_fee / 100000000).toFixed(1)}억/월`
                            : '-'}
                        </p>
                        {customer.renewal_date && (
                          <p className="text-xs text-gray-600">
                            갱신: {new Date(customer.renewal_date).toLocaleDateString('ko-KR')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
          
        </TabsContent>

        {/* 통합 인사이트 탭 */}
        <TabsContent value="integrated" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 시장 규모 분석 */}
            <Card>
              <CardHeader>
                <CardTitle>시장 규모 분석</CardTitle>
                <CardDescription>TAM-SAM-SOM</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">TAM (전체 시장)</span>
                      <span className="font-bold">{metrics.totalCustomers}</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">SAM (서비스 가능)</span>
                      <span className="font-bold">
                        {customerData.filter(c => c.overseas_presence_2025).length}
                      </span>
                    </div>
                    <Progress 
                      value={(customerData.filter(c => c.overseas_presence_2025).length / metrics.totalCustomers) * 100} 
                      className="h-2" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">SOM (획득 가능)</span>
                      <span className="font-bold">{metrics.renewalSoon}</span>
                    </div>
                    <Progress 
                      value={(metrics.renewalSoon / metrics.totalCustomers) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 전환 가능성 분석 */}
            <Card>
              <CardHeader>
                <CardTitle>전환 가능성 Top 5</CardTitle>
                <CardDescription>경쟁사 → KT 전환 예상</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customerData
                    .filter(c => c.other_global_data_usage && c.renewal_date)
                    .sort((a, b) => {
                      const dateA = new Date(a.renewal_date).getTime();
                      const dateB = new Date(b.renewal_date).getTime();
                      return dateA - dateB;
                    })
                    .slice(0, 5)
                    .map((customer, index) => (
                      <div key={customer.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-400">{index + 1}</span>
                          <div>
                            <p className="text-sm font-medium">{customer.customer_name}</p>
                            <p className="text-xs text-gray-600">
                              현재: {customer.other_provider_name}
                            </p>
                          </div>
                        </div>
                        <Badge variant={index === 0 ? "destructive" : "outline"}>
                          D-{Math.ceil((new Date(customer.renewal_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* 액션 아이템 */}
            <Card>
              <CardHeader>
                <CardTitle>추천 액션</CardTitle>
                <CardDescription>우선순위별 실행 항목</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-red-600">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">긴급 갱신 대응</p>
                      <p className="text-xs text-gray-600">
                        30일 내 갱신 예정 {customerData.filter(c => {
                          if (!c.renewal_date) return false;
                          const days = (new Date(c.renewal_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
                          return days > 0 && days <= 30;
                        }).length}개 기업 컨택
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">경쟁사 고객 공략</p>
                      <p className="text-xs text-gray-600">
                        타사 이용 고객 중 상위 20개 기업 타겟팅
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">신규 기회 발굴</p>
                      <p className="text-xs text-gray-600">
                        해외 진출 예정 기업 사전 접촉
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 산업별 기회 분석 */}
          <Card>
            <CardHeader>
              <CardTitle>산업별 기회 분석</CardTitle>
              <CardDescription>업종별 잠재 고객 및 현재 고객 비교</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500">산업별 기회 분석 데이터</p>
                  <p className="text-sm text-gray-400 mt-2">추후 업데이트</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 매출 분석 탭 */}
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 월별 매출 추이 */}
            <Card>
              <CardHeader>
                <CardTitle>월별 매출 추이</CardTitle>
                <CardDescription>최근 12개월 매출 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={(() => {
                    // 월별 매출 집계
                    const monthlyData: { [key: string]: number } = {};
                    revenueData.forEach(r => {
                      if (!monthlyData[r.revenue_month]) {
                        monthlyData[r.revenue_month] = 0;
                      }
                      monthlyData[r.revenue_month] += r.revenue_amount;
                    });
                    
                    return Object.entries(monthlyData)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .slice(-12)
                      .map(([month, amount]) => ({
                        month: `20${month.substring(0, 2)}.${month.substring(2, 4)}`,
                        revenue: amount / 1000000, // 백만원 단위
                      }));
                  })()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `₩${value.toFixed(1)}M`} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={{ fill: '#2563eb', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 고객별 매출 분포 */}
            <Card>
              <CardHeader>
                <CardTitle>고객별 매출 TOP 10</CardTitle>
                <CardDescription>누적 매출 기준</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={(() => {
                    // 고객별 매출 집계
                    const customerRevenue: { [key: string]: number } = {};
                    
                    // salesData와 revenueData 조인
                    revenueData.forEach(r => {
                      const sale = salesData.find(s => s.service_id === r.service_id);
                      if (sale) {
                        if (!customerRevenue[sale.customer_name]) {
                          customerRevenue[sale.customer_name] = 0;
                        }
                        customerRevenue[sale.customer_name] += r.revenue_amount;
                      }
                    });
                    
                    return Object.entries(customerRevenue)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 10)
                      .map(([customer, amount]) => ({
                        customer: customer.length > 10 ? customer.substring(0, 10) + '...' : customer,
                        revenue: amount / 1000000,
                      }));
                  })()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="customer" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `₩${value.toFixed(1)}M`} />
                    <Bar dataKey="revenue" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 서비스 유형별 매출 */}
            <Card>
              <CardHeader>
                <CardTitle>서비스 유형별 매출 분포</CardTitle>
                <CardDescription>최근 월 기준</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={(() => {
                        // 최근 월 추출
                        const latestMonth = revenueData.reduce((max, r) => 
                          r.revenue_month > max ? r.revenue_month : max, '');
                        
                        // 서비스 유형별 매출 집계
                        const serviceTypeRevenue: { [key: string]: number } = {};
                        
                        revenueData
                          .filter(r => r.revenue_month === latestMonth)
                          .forEach(r => {
                            const sale = salesData.find(s => s.service_id === r.service_id);
                            if (sale) {
                              const type = sale.service_type || '기타';
                              if (!serviceTypeRevenue[type]) {
                                serviceTypeRevenue[type] = 0;
                              }
                              serviceTypeRevenue[type] += r.revenue_amount;
                            }
                          });
                        
                        const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
                        return Object.entries(serviceTypeRevenue)
                          .map(([name, value], index) => ({
                            name,
                            value: value / 1000000,
                            fill: colors[index % colors.length],
                          }));
                      })()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => 
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {(() => {
                        const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
                        return revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ));
                      })()}
                    </Pie>
                    <Tooltip formatter={(value: number) => `₩${value.toFixed(1)}M`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 고객군별 매출 */}
            <Card>
              <CardHeader>
                <CardTitle>고객군별 매출 현황</CardTitle>
                <CardDescription>대기업/중견/중소 구분</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={(() => {
                    // 고객군별 매출 집계
                    const groupRevenue: { [key: string]: number } = {};
                    
                    revenueData.forEach(r => {
                      const sale = salesData.find(s => s.service_id === r.service_id);
                      if (sale) {
                        const group = sale.customer_group || '미분류';
                        if (!groupRevenue[group]) {
                          groupRevenue[group] = 0;
                        }
                        groupRevenue[group] += r.revenue_amount;
                      }
                    });
                    
                    return Object.entries(groupRevenue)
                      .map(([group, amount]) => ({
                        group,
                        revenue: amount / 1000000,
                      }));
                  })()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="group" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `₩${value.toFixed(1)}M`} />
                    <Bar dataKey="revenue" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 매출 통계 요약 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">총 누적 매출</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₩{(revenueData.reduce((sum, r) => sum + r.revenue_amount, 0) / 100000000).toFixed(1)}억
                </div>
                <p className="text-xs text-gray-600 mt-1">전체 기간</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">월 평균 매출</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₩{(() => {
                    const uniqueMonths = new Set(revenueData.map(r => r.revenue_month)).size;
                    const total = revenueData.reduce((sum, r) => sum + r.revenue_amount, 0);
                    return uniqueMonths > 0 ? (total / uniqueMonths / 100000000).toFixed(1) : '0';
                  })()}억
                </div>
                <p className="text-xs text-gray-600 mt-1">월 평균</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">최근 월 매출</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₩{(() => {
                    const latestMonth = revenueData.reduce((max, r) => 
                      r.revenue_month > max ? r.revenue_month : max, '');
                    const latestRevenue = revenueData
                      .filter(r => r.revenue_month === latestMonth)
                      .reduce((sum, r) => sum + r.revenue_amount, 0);
                    return (latestRevenue / 100000000).toFixed(1);
                  })()}억
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {(() => {
                    const latestMonth = revenueData.reduce((max, r) => 
                      r.revenue_month > max ? r.revenue_month : max, '');
                    return latestMonth ? `20${latestMonth.substring(0, 2)}년 ${parseInt(latestMonth.substring(2, 4))}월` : '-';
                  })()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">매출 성장률</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(() => {
                    const sortedMonths = [...new Set(revenueData.map(r => r.revenue_month))].sort();
                    if (sortedMonths.length < 2) return '0';
                    
                    const lastMonth = sortedMonths[sortedMonths.length - 1];
                    const prevMonth = sortedMonths[sortedMonths.length - 2];
                    
                    const lastRevenue = revenueData
                      .filter(r => r.revenue_month === lastMonth)
                      .reduce((sum, r) => sum + r.revenue_amount, 0);
                    const prevRevenue = revenueData
                      .filter(r => r.revenue_month === prevMonth)
                      .reduce((sum, r) => sum + r.revenue_amount, 0);
                    
                    const growth = prevRevenue > 0 ? ((lastRevenue - prevRevenue) / prevRevenue * 100) : 0;
                    return growth > 0 ? `+${growth.toFixed(1)}` : growth.toFixed(1);
                  })()}%
                </div>
                <p className="text-xs text-gray-600 mt-1">전월 대비</p>
              </CardContent>
            </Card>
          </div>

          {/* 고객별 상세 매출 테이블 */}
          <Card>
            <CardHeader>
              <CardTitle>고객별 매출 상세</CardTitle>
              <CardDescription>서비스별 매출 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3">고객명</th>
                      <th className="text-left p-3">서비스 수</th>
                      <th className="text-right p-3">월 평균 매출</th>
                      <th className="text-right p-3">누적 매출</th>
                      <th className="text-right p-3">최근 월 매출</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      // 고객별 매출 집계
                      const customerStats: { [key: string]: {
                        services: Set<string>,
                        total: number,
                        months: Set<string>,
                        latest: { month: string, amount: number }
                      }} = {};
                      
                      revenueData.forEach(r => {
                        const sale = salesData.find(s => s.service_id === r.service_id);
                        if (sale) {
                          if (!customerStats[sale.customer_name]) {
                            customerStats[sale.customer_name] = {
                              services: new Set(),
                              total: 0,
                              months: new Set(),
                              latest: { month: '', amount: 0 }
                            };
                          }
                          
                          customerStats[sale.customer_name].services.add(r.service_id);
                          customerStats[sale.customer_name].total += r.revenue_amount;
                          customerStats[sale.customer_name].months.add(r.revenue_month);
                          
                          if (r.revenue_month > customerStats[sale.customer_name].latest.month) {
                            customerStats[sale.customer_name].latest = {
                              month: r.revenue_month,
                              amount: r.revenue_amount
                            };
                          }
                        }
                      });
                      
                      return Object.entries(customerStats)
                        .sort(([, a], [, b]) => b.total - a.total)
                        .slice(0, 20)
                        .map(([customer, stats]) => (
                          <tr key={customer} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{customer}</td>
                            <td className="p-3">{stats.services.size}</td>
                            <td className="p-3 text-right">
                              ₩{(stats.total / stats.months.size / 1000000).toFixed(1)}M
                            </td>
                            <td className="p-3 text-right font-medium">
                              ₩{(stats.total / 1000000).toFixed(1)}M
                            </td>
                            <td className="p-3 text-right">
                              ₩{(stats.latest.amount / 1000000).toFixed(1)}M
                            </td>
                          </tr>
                        ));
                    })()}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalGTMStrategyDashboard;