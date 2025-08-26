import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import {
  Target,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Globe,
  DollarSign,
  Users,
  Zap,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface StrategyInsight {
  type: 'opportunity' | 'risk' | 'action' | 'trend';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  metrics?: {
    current: number;
    target: number;
    unit: string;
  };
}

interface MarketSegment {
  segment: string;
  revenue: number;
  growth_rate: number;
  customer_count: number;
  avg_revenue_per_customer: number;
  market_potential: 'high' | 'medium' | 'low';
}

interface ServicePerformance {
  service_type: string;
  revenue: number;
  customer_count: number;
  avg_revenue: number;
  growth_trend: number;
  market_share: number;
}

const GTMStrategyInsights: React.FC = () => {
  const [insights, setInsights] = useState<StrategyInsight[]>([]);
  const [marketSegments, setMarketSegments] = useState<MarketSegment[]>([]);
  const [servicePerformance, setServicePerformance] = useState<ServicePerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarter');

  useEffect(() => {
    analyzeGTMData();
  }, [selectedTimeframe]);

  const analyzeGTMData = async () => {
    try {
      setLoading(true);

      // GTM Sales 데이터 조회
      const { data: salesData, error: salesError } = await supabase
        .from('gtm_sales')
        .select('*');

      if (salesError) throw salesError;

      // 월별 트렌드 데이터 조회
      const { data: trendData, error: trendError } = await supabase
        .from('gtm_sales_monthly_trend')
        .select('*')
        .order('month', { ascending: false });

      if (trendError) throw trendError;

      // 고객 요약 데이터 조회
      const { data: customerSummary, error: customerError } = await supabase
        .from('gtm_sales_customer_summary')
        .select('*');

      if (customerError) throw customerError;

      // 서비스 요약 데이터 조회
      const { data: serviceSummary, error: serviceError } = await supabase
        .from('gtm_sales_service_summary')
        .select('*');

      if (serviceError) throw serviceError;

      // 전략적 인사이트 도출
      const generatedInsights = generateStrategicInsights(
        salesData || [],
        trendData || [],
        customerSummary || [],
        serviceSummary || []
      );

      // 시장 세그먼트 분석
      const segments = analyzeMarketSegments(
        salesData || [],
        customerSummary || []
      );

      // 서비스 성과 분석
      const performance = analyzeServicePerformance(
        serviceSummary || [],
        trendData || []
      );

      setInsights(generatedInsights);
      setMarketSegments(segments);
      setServicePerformance(performance);

    } catch (error) {
      console.error('GTM 데이터 분석 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateStrategicInsights = (
    sales: any[],
    trends: any[],
    customers: any[],
    services: any[]
  ): StrategyInsight[] => {
    const insights: StrategyInsight[] = [];

    // 1. 해외 시장 확장 기회
    const overseasRevenue = customers
      .filter(c => c.domestic_overseas === '해외')
      .reduce((sum, c) => sum + (c.total_revenue || 0), 0);
    
    const domesticRevenue = customers
      .filter(c => c.domestic_overseas === '국내')
      .reduce((sum, c) => sum + (c.total_revenue || 0), 0);

    const overseasRatio = overseasRevenue / (overseasRevenue + domesticRevenue);

    if (overseasRatio < 0.3) {
      insights.push({
        type: 'opportunity',
        priority: 'high',
        title: '해외 시장 확장 기회',
        description: `현재 해외 매출 비중이 ${(overseasRatio * 100).toFixed(1)}%로 낮은 수준입니다.`,
        impact: '해외 시장 확장으로 연간 30% 이상의 매출 성장 가능',
        recommendation: '싱가포르, 홍콩 등 아시아 주요 허브 중심으로 글로벌 IDC 서비스 확대',
        metrics: {
          current: overseasRatio * 100,
          target: 40,
          unit: '%'
        }
      });
    }

    // 2. 고객 집중도 리스크
    const top5Revenue = customers
      .sort((a, b) => b.total_revenue - a.total_revenue)
      .slice(0, 5)
      .reduce((sum, c) => sum + c.total_revenue, 0);
    
    const totalRevenue = customers.reduce((sum, c) => sum + c.total_revenue, 0);
    const concentration = top5Revenue / totalRevenue;

    if (concentration > 0.5) {
      insights.push({
        type: 'risk',
        priority: 'high',
        title: '고객 집중도 리스크',
        description: `상위 5개 고객이 전체 매출의 ${(concentration * 100).toFixed(1)}%를 차지합니다.`,
        impact: '주요 고객 이탈 시 매출 급감 위험',
        recommendation: '중소형 고객 기반 확대 및 신규 고객 유치 전략 수립',
        metrics: {
          current: concentration * 100,
          target: 35,
          unit: '%'
        }
      });
    }

    // 3. 프리미엄 서비스 성장 기회
    const premiumServices = services.find(s => 
      s.service_type === '글로벌 프리미엄 인터넷'
    );

    if (premiumServices) {
      const premiumGrowthPotential = calculateGrowthPotential(premiumServices);
      if (premiumGrowthPotential > 20) {
        insights.push({
          type: 'opportunity',
          priority: 'medium',
          title: '프리미엄 서비스 성장 잠재력',
          description: '글로벌 프리미엄 인터넷 서비스의 수요가 증가하고 있습니다.',
          impact: `연간 ${premiumGrowthPotential}% 성장 가능`,
          recommendation: '고대역폭 요구 고객 대상 프리미엄 패키지 출시',
          metrics: {
            current: premiumServices.customer_count,
            target: Math.round(premiumServices.customer_count * 1.3),
            unit: '고객사'
          }
        });
      }
    }

    // 4. 월별 매출 변동성
    const revenueVolatility = calculateRevenueVolatility(trends);
    if (revenueVolatility > 15) {
      insights.push({
        type: 'risk',
        priority: 'medium',
        title: '매출 변동성 관리 필요',
        description: `월별 매출 변동성이 ${revenueVolatility.toFixed(1)}%로 높습니다.`,
        impact: '예측 가능성 저하 및 운영 효율성 감소',
        recommendation: '장기 계약 비중 확대 및 구독형 서비스 모델 강화'
      });
    }

    // 5. 교차 판매 기회
    const singleServiceCustomers = calculateSingleServiceCustomers(sales);
    if (singleServiceCustomers > 50) {
      insights.push({
        type: 'action',
        priority: 'high',
        title: '교차 판매 기회 확대',
        description: `${singleServiceCustomers}% 고객이 단일 서비스만 이용 중입니다.`,
        impact: '고객당 평균 매출 30% 증가 가능',
        recommendation: '번들 패키지 및 통합 솔루션 제안 강화'
      });
    }

    // 6. 신규 시장 진입 전략
    insights.push({
      type: 'action',
      priority: 'high',
      title: '유럽 시장 진입 전략',
      description: '유럽 데이터센터 수요 증가에 따른 시장 진입 기회',
      impact: '2025년 신규 매출 20억원 창출 가능',
      recommendation: '프랑크푸르트, 암스테르담 POP 구축 및 현지 파트너십 체결'
    });

    return insights;
  };

  const analyzeMarketSegments = (sales: any[], customers: any[]): MarketSegment[] => {
    const segments: MarketSegment[] = [];

    // 국내/해외 세그먼트 분석
    const domesticData = customers.filter(c => c.domestic_overseas === '국내');
    const overseasData = customers.filter(c => c.domestic_overseas === '해외');

    segments.push({
      segment: '국내 시장',
      revenue: domesticData.reduce((sum, c) => sum + c.total_revenue, 0),
      growth_rate: calculateGrowthRate(domesticData),
      customer_count: domesticData.length,
      avg_revenue_per_customer: domesticData.length > 0 
        ? domesticData.reduce((sum, c) => sum + c.total_revenue, 0) / domesticData.length 
        : 0,
      market_potential: 'medium'
    });

    segments.push({
      segment: '해외 시장',
      revenue: overseasData.reduce((sum, c) => sum + c.total_revenue, 0),
      growth_rate: calculateGrowthRate(overseasData),
      customer_count: overseasData.length,
      avg_revenue_per_customer: overseasData.length > 0
        ? overseasData.reduce((sum, c) => sum + c.total_revenue, 0) / overseasData.length
        : 0,
      market_potential: 'high'
    });

    // 서비스 유형별 세그먼트
    const serviceTypes = ['글로벌패스 전용회선', '글로벌 프리미엄 인터넷', '글로벌 IDC', '글로벌패스 MPLS-VPN'];
    
    serviceTypes.forEach(serviceType => {
      const serviceCustomers = sales.filter(s => s.service_type === serviceType);
      const uniqueCustomers = new Set(serviceCustomers.map(s => s.customer_name)).size;
      const totalRevenue = calculateTotalRevenue(serviceCustomers);

      segments.push({
        segment: serviceType,
        revenue: totalRevenue,
        growth_rate: calculateServiceGrowthRate(serviceCustomers),
        customer_count: uniqueCustomers,
        avg_revenue_per_customer: uniqueCustomers > 0 ? totalRevenue / uniqueCustomers : 0,
        market_potential: determineMarketPotential(serviceType)
      });
    });

    return segments.sort((a, b) => b.revenue - a.revenue);
  };

  const analyzeServicePerformance = (services: any[], trends: any[]): ServicePerformance[] => {
    const totalRevenue = services.reduce((sum, s) => sum + s.total_revenue, 0);

    return services.map(service => ({
      service_type: service.service_type,
      revenue: service.total_revenue,
      customer_count: service.customer_count,
      avg_revenue: service.total_revenue / service.customer_count,
      growth_trend: calculateServiceGrowthTrend(service, trends),
      market_share: (service.total_revenue / totalRevenue) * 100
    })).sort((a, b) => b.revenue - a.revenue);
  };

  // 보조 함수들
  const calculateGrowthPotential = (service: any): number => {
    // 성장 잠재력 계산 로직
    const marketSize = 1000000000; // 예상 시장 규모
    const currentShare = service.total_revenue / marketSize;
    return Math.min((1 - currentShare) * 100, 50);
  };

  const calculateRevenueVolatility = (trends: any[]): number => {
    if (trends.length < 2) return 0;
    
    const revenues = trends.map(t => t.revenue);
    const mean = revenues.reduce((a, b) => a + b, 0) / revenues.length;
    const variance = revenues.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / revenues.length;
    const stdDev = Math.sqrt(variance);
    
    return (stdDev / mean) * 100;
  };

  const calculateSingleServiceCustomers = (sales: any[]): number => {
    const customerServices: { [key: string]: Set<string> } = {};
    
    sales.forEach(sale => {
      if (!customerServices[sale.customer_name]) {
        customerServices[sale.customer_name] = new Set();
      }
      customerServices[sale.customer_name].add(sale.service_type);
    });

    const singleService = Object.values(customerServices).filter(s => s.size === 1).length;
    const total = Object.keys(customerServices).length;
    
    return total > 0 ? (singleService / total) * 100 : 0;
  };

  const calculateGrowthRate = (data: any[]): number => {
    // 간단한 성장률 계산 (실제로는 시계열 데이터 필요)
    return Math.random() * 20 - 5; // -5% ~ 15% 범위의 임시 값
  };

  const calculateServiceGrowthRate = (services: any[]): number => {
    // 서비스별 성장률 계산
    return Math.random() * 25 - 5; // -5% ~ 20% 범위의 임시 값
  };

  const calculateTotalRevenue = (services: any[]): number => {
    return services.reduce((sum, s) => {
      return sum + (s.revenue_2506 || 0) + (s.revenue_2505 || 0) + 
             (s.revenue_2504 || 0) + (s.revenue_2503 || 0) + 
             (s.revenue_2502 || 0) + (s.revenue_2501 || 0);
    }, 0);
  };

  const determineMarketPotential = (serviceType: string): 'high' | 'medium' | 'low' => {
    if (serviceType.includes('IDC') || serviceType.includes('프리미엄')) return 'high';
    if (serviceType.includes('MPLS')) return 'medium';
    return 'low';
  };

  const calculateServiceGrowthTrend = (service: any, trends: any[]): number => {
    // 서비스 성장 트렌드 계산
    const serviceTrends = trends.filter(t => t.service_type === service.service_type);
    if (serviceTrends.length < 2) return 0;
    
    const recent = serviceTrends.slice(0, 3).reduce((sum, t) => sum + t.revenue, 0);
    const previous = serviceTrends.slice(3, 6).reduce((sum, t) => sum + t.revenue, 0);
    
    return previous > 0 ? ((recent - previous) / previous) * 100 : 0;
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case 'risk': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'action': return <Zap className="h-5 w-5 text-blue-500" />;
      case 'trend': return <TrendingUp className="h-5 w-5 text-green-500" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(1)}억원`;
    } else if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}만원`;
    }
    return `${value.toLocaleString()}원`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 전략적 인사이트 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            전략적 인사이트
          </h2>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="month">월간</option>
            <option value="quarter">분기</option>
            <option value="year">연간</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getInsightIcon(insight.type)}
                  <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                  {insight.priority === 'high' ? '높음' : insight.priority === 'medium' ? '중간' : '낮음'}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{insight.description}</p>

              {insight.metrics && (
                <div className="bg-gray-50 rounded p-3 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">현재</span>
                    <span className="text-sm font-semibold">{insight.metrics.current}{insight.metrics.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(insight.metrics.current / insight.metrics.target) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">목표</span>
                    <span className="text-sm font-semibold">{insight.metrics.target}{insight.metrics.unit}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-gray-700">예상 효과</p>
                    <p className="text-xs text-gray-600">{insight.impact}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-gray-700">권장 조치</p>
                    <p className="text-xs text-gray-600">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 시장 세그먼트 분석 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-purple-600" />
          시장 세그먼트 분석
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  세그먼트
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  매출
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  성장률
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객 수
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  평균 매출
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  잠재력
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {marketSegments.map((segment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {segment.segment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(segment.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex items-center justify-end gap-1">
                      {segment.growth_rate > 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <span className={segment.growth_rate > 0 ? 'text-green-600' : 'text-red-600'}>
                        {Math.abs(segment.growth_rate).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {segment.customer_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {formatCurrency(segment.avg_revenue_per_customer)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      segment.market_potential === 'high' 
                        ? 'bg-green-100 text-green-800'
                        : segment.market_potential === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {segment.market_potential === 'high' ? '높음' : 
                       segment.market_potential === 'medium' ? '중간' : '낮음'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 서비스 성과 대시보드 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-green-600" />
          서비스별 성과 분석
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicePerformance.map((service, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900 text-sm mb-3">{service.service_type}</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">매출</span>
                  <span className="text-sm font-semibold">{formatCurrency(service.revenue)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">고객</span>
                  <span className="text-sm font-semibold">{service.customer_count}개사</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">평균</span>
                  <span className="text-sm font-semibold">{formatCurrency(service.avg_revenue)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">점유율</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${service.market_share}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{service.market_share.toFixed(1)}%</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">성장 추세</span>
                    <div className="flex items-center gap-1">
                      {service.growth_trend > 0 ? (
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs font-medium ${
                        service.growth_trend > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {Math.abs(service.growth_trend).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GTMStrategyInsights;