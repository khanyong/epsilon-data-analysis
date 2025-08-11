import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseService';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Treemap, Sankey, AreaChart, Area, ScatterChart, Scatter, ComposedChart
} from 'recharts';
import { 
  Users, Target, TrendingUp, MapPin, Building2, 
  DollarSign, Calendar, AlertCircle, CheckCircle,
  Globe, Briefcase, UserCheck, Layers, Filter, Search,
  ArrowUpRight, RefreshCw, Shield, Zap, Award
} from 'lucide-react';

interface GlobalGTMStrategyAdvancedProps {
  sectionId: string;
  viewMode: 'section' | 'all';
}

// 데이터 타입 정의
interface RFQData {
  quoteNo: string;
  customer: string;
  countryA: string;
  cityA: string;
  countryB: string;
  cityB: string;
  cableType: string;
  distance: number;
  requestDate: string;
  status: string;
}

interface SOFData {
  id: string;
  countryA: string;
  cityA: string;
  countryB: string;
  cityB: string;
  distance: number;
  provider: string;
  contractDate: string;
  renewalDate: string;
}

interface KOTRACompany {
  id: number;
  name: string;
  nameEn: string;
  industry: string;
  location: string;
  city: string;
  entryType: string;
  salesDivision: string;
}

export function GlobalGTMStrategyAdvanced({ sectionId, viewMode }: GlobalGTMStrategyAdvancedProps) {
  const [loading, setLoading] = useState(true);
  const [rfqAnalysis, setRfqAnalysis] = useState<any>(null);
  const [sofAnalysis, setSofAnalysis] = useState<any>(null);
  const [kotraAnalysis, setKotraAnalysis] = useState<any>(null);
  const [integratedStrategy, setIntegratedStrategy] = useState<any>(null);

  useEffect(() => {
    loadComprehensiveData();
  }, []);

  const loadComprehensiveData = async () => {
    setLoading(true);
    try {
      // RFQ 데이터 로드 - 잠재 고객 분석
      const { data: rfqData, error: rfqError } = await supabase
        .from('rfq')
        .select('*')
        .limit(5000);

      if (rfqError) {
        console.error('RFQ 데이터 로드 오류:', rfqError);
      } else if (rfqData && rfqData.length > 0) {
        console.log('RFQ 데이터 샘플:', rfqData[0]);
        console.log('RFQ 데이터 컬럼:', Object.keys(rfqData[0]));
      }

      // SOF 데이터 로드 - 기존 고객 분석
      const { data: sofData, error: sofError } = await supabase
        .from('sof_middlemile')
        .select('*')
        .limit(5000);

      if (sofError) {
        console.error('SOF 데이터 로드 오류:', sofError);
      } else if (sofData && sofData.length > 0) {
        console.log('SOF 데이터 샘플:', sofData[0]);
        console.log('SOF 데이터 컬럼:', Object.keys(sofData[0]));
      }

      // KOTRA 데이터 로드 - 한국 기업 진출 현황
      const { data: kotraData, error: kotraError } = await supabase
        .from('kotra')
        .select('*')
        .or('office.eq.뭄바이,office.eq.첸나이,office.eq.첸나이무역관');

      if (kotraError) {
        console.error('KOTRA 데이터 로드 오류:', kotraError);
      }

      if (rfqData || sofData || kotraData) {
        analyzeRFQData(rfqData || []);
        analyzeSOFData(sofData || []);
        analyzeKOTRAData(kotraData || []);
        createIntegratedStrategy(rfqData || [], sofData || [], kotraData || []);
      }
    } catch (error) {
      console.error('GTM 데이터 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeRFQData = (data: any[]) => {
    console.log('RFQ 원본 데이터 수:', data.length);
    
    // 데이터가 있으면 첫 번째 레코드의 키 확인
    if (data.length > 0) {
      console.log('RFQ 컬럼 목록:', Object.keys(data[0]));
    }
    
    // 가능한 컬럼명 변형들 시도
    const customerNameFields = ['Customer Name', 'customer_name', 'Customer', 'customer', 'Company Name', 'company_name'];
    const countryAFields = ['Country A', 'country_a', 'CountryA', 'Origin Country', 'origin_country'];
    const countryBFields = ['Country B', 'country_b', 'CountryB', 'Destination Country', 'destination_country'];
    
    // 실제 존재하는 필드명 찾기
    let actualCustomerField = '';
    let actualCountryAField = '';
    let actualCountryBField = '';
    
    if (data.length > 0) {
      const firstRecord = data[0];
      actualCustomerField = customerNameFields.find(field => firstRecord[field] !== undefined) || 'Customer Name';
      actualCountryAField = countryAFields.find(field => firstRecord[field] !== undefined) || 'Country A';
      actualCountryBField = countryBFields.find(field => firstRecord[field] !== undefined) || 'Country B';
      
      console.log('찾은 필드명:', { 
        customer: actualCustomerField, 
        countryA: actualCountryAField, 
        countryB: actualCountryBField 
      });
    }
    
    // null 값 제거한 유효한 데이터만 필터링
    const validData = data.filter(rfq => 
      rfq[actualCustomerField] && 
      rfq[actualCountryAField] && 
      rfq[actualCountryBField] &&
      rfq[actualCustomerField] !== 'null' &&
      rfq[actualCountryAField] !== 'null' && 
      rfq[actualCountryBField] !== 'null'
    );
    
    console.log('유효한 RFQ 데이터 수:', validData.length);

    // RFQ 분석: 잠재 고객의 니즈 파악
    const analysis = {
      totalQuotes: validData.length,
      uniqueCustomers: new Set(validData.map(d => d[actualCustomerField]).filter(name => name && name !== '')).size,
      topRoutes: {},
      topProducts: {},
      regionalDemand: {},
      seasonalTrends: {},
      conversionPotential: []
    };

    // 지역별 수요 분석 (null 제외)
    validData.forEach(rfq => {
      if (rfq[actualCountryAField] && rfq[actualCountryBField]) {
        const route = `${rfq[actualCountryAField]}-${rfq[actualCountryBField]}`;
        if (!route.includes('undefined') && !route.includes('null')) {
          analysis.topRoutes[route] = (analysis.topRoutes[route] || 0) + 1;
        }
      }
      
      if (rfq[actualCountryAField] && rfq[actualCountryAField] !== 'null') {
        const region = rfq[actualCountryAField];
        analysis.regionalDemand[region] = (analysis.regionalDemand[region] || 0) + 1;
      }
    });

    // 상위 10개 루트 추출 (null 경로 제외)
    const topRoutesList = Object.entries(analysis.topRoutes)
      .filter(([route]) => !route.includes('null') && !route.includes('undefined'))
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 10)
      .map(([route, count]) => ({ route, count, potential: 'High' }));

    analysis.topRoutes = topRoutesList;
    setRfqAnalysis(analysis);
  };

  const analyzeSOFData = (data: any[]) => {
    console.log('SOF 원본 데이터 수:', data.length);
    
    // 데이터가 있으면 첫 번째 레코드의 키 확인
    if (data.length > 0) {
      console.log('SOF 컬럼 목록:', Object.keys(data[0]));
    }
    
    // 가능한 컬럼명 변형들 시도
    const countryAFields = ['Country A', 'country_a', 'CountryA', 'Origin Country', 'origin_country'];
    const countryBFields = ['Country B', 'country_b', 'CountryB', 'Destination Country', 'destination_country'];
    
    // 실제 존재하는 필드명 찾기
    let actualCountryAField = 'Country A';
    let actualCountryBField = 'Country B';
    
    if (data.length > 0) {
      const firstRecord = data[0];
      actualCountryAField = countryAFields.find(field => firstRecord[field] !== undefined) || 'Country A';
      actualCountryBField = countryBFields.find(field => firstRecord[field] !== undefined) || 'Country B';
      
      console.log('SOF 필드명:', { 
        countryA: actualCountryAField, 
        countryB: actualCountryBField 
      });
    }
    
    // null 값 제거한 유효한 데이터만 필터링
    const validData = data.filter(sof => 
      sof[actualCountryAField] && 
      sof[actualCountryBField] &&
      sof[actualCountryAField] !== 'null' && 
      sof[actualCountryBField] !== 'null' &&
      sof[actualCountryAField] !== '' && 
      sof[actualCountryBField] !== ''
    );

    // SOF 분석: 기존 고객 재계약 전략
    const analysis = {
      totalContracts: validData.length,
      activeRoutes: new Set(
        validData
          .map(d => `${d[actualCountryAField]}-${d[actualCountryBField]}`)
          .filter(route => !route.includes('null') && !route.includes('undefined'))
      ).size,
      renewalOpportunities: [],
      expansionPotential: [],
      competitorAnalysis: {},
      customerRetention: {}
    };

    // 재계약 기회 분석 (null 제외)
    const routeFrequency = {};
    validData.forEach(sof => {
      if (sof[actualCountryAField] && sof[actualCountryBField]) {
        const route = `${sof[actualCountryAField]}-${sof[actualCountryBField]}`;
        if (!route.includes('undefined') && !route.includes('null')) {
          routeFrequency[route] = (routeFrequency[route] || 0) + 1;
        }
      }
    });

    // 확장 가능성이 있는 루트 식별 (null 경로 제외)
    analysis.expansionPotential = Object.entries(routeFrequency)
      .filter(([route, frequency]: any) => 
        frequency > 2 && 
        !route.includes('null') && 
        !route.includes('undefined')
      )
      .map(([route, frequency]) => ({
        route,
        frequency,
        strategy: 'Bundle & Expand',
        priority: frequency > 5 ? 'High' : 'Medium'
      }))
      .sort((a: any, b: any) => b.frequency - a.frequency)
      .slice(0, 20); // 상위 20개만 표시

    setSofAnalysis(analysis);
  };

  const analyzeKOTRAData = (data: any[]) => {
    // null 값 제거한 유효한 데이터만 필터링
    const validData = data.filter(company => 
      company && 
      company.office && 
      company.office !== 'null' &&
      company.office !== ''
    );

    // KOTRA 분석: 한국 기업 타겟팅
    const analysis = {
      totalCompanies: validData.length,
      byLocation: {},
      byIndustry: {},
      withSalesDivision: 0,
      targetSegments: []
    };

    validData.forEach(company => {
      // 지역별 분류 (null 제외)
      if (company.office && company.office !== 'null' && company.office !== '') {
        const location = company.office;
        analysis.byLocation[location] = (analysis.byLocation[location] || 0) + 1;
      }
      
      // 산업별 분류 (null 제외)
      if (company.industry_major && company.industry_major !== 'null' && company.industry_major !== '') {
        const industry = company.industry_major;
        analysis.byIndustry[industry] = (analysis.byIndustry[industry] || 0) + 1;
      }
      
      // 영업 조직 보유 여부 (null 제외)
      if (company.sales_division && company.sales_division !== 'null' && company.sales_division !== '') {
        analysis.withSalesDivision++;
      }
    });

    // 타겟 세그먼트 정의 (Unknown 제외)
    analysis.targetSegments = Object.entries(analysis.byIndustry)
      .filter(([industry]) => industry !== 'Unknown' && industry !== 'null')
      .map(([industry, count]: any) => ({
        industry,
        companyCount: count,
        priority: count > 20 ? 'High' : count > 10 ? 'Medium' : 'Low',
        approach: getIndustryApproach(industry)
      }))
      .sort((a, b) => b.companyCount - a.companyCount);

    setKotraAnalysis(analysis);
  };

  const getIndustryApproach = (industry: string) => {
    const approaches = {
      '제조업': 'Supply chain optimization focus',
      'IT': 'Digital transformation & cloud connectivity',
      '무역': 'Global network expansion',
      '금융': 'Low latency & security emphasis',
      '물류': 'Real-time tracking solutions',
      default: 'Customized solution approach'
    };
    return approaches[industry] || approaches.default;
  };

  const createIntegratedStrategy = (rfqData: any[], sofData: any[], kotraData: any[]) => {
    // 통합 GTM 전략 수립
    const strategy = {
      marketSegments: [],
      salesTerritories: [],
      productStrategy: [],
      pricingStrategy: {},
      channelStrategy: [],
      competitivePositioning: {}
    };

    // 시장 세분화
    strategy.marketSegments = [
      {
        segment: 'Enterprise Telcos',
        size: calculateSegmentSize(rfqData, 'telco'),
        growth: 15,
        approach: 'Direct sales with dedicated account management',
        priority: 'High'
      },
      {
        segment: 'Korean Companies in India',
        size: kotraData.length,
        growth: 8,
        approach: 'Cultural affinity & Korean-speaking sales team',
        priority: 'High'
      },
      {
        segment: 'Data Centers',
        size: calculateSegmentSize(rfqData, 'datacenter'),
        growth: 25,
        approach: 'Technical sales & rapid deployment',
        priority: 'Medium'
      },
      {
        segment: 'ISPs & Regional Players',
        size: calculateSegmentSize(rfqData, 'isp'),
        growth: 10,
        approach: 'Channel partnerships & volume discounts',
        priority: 'Medium'
      }
    ];

    // 영업 테리토리 전략
    strategy.salesTerritories = [
      {
        territory: 'Mumbai',
        targetCompanies: kotraData.filter(c => c.office === '뭄바이').length,
        teamSize: 4,
        focus: 'Financial services & Manufacturing',
        revenue: '$15M'
      },
      {
        territory: 'Chennai',
        targetCompanies: kotraData.filter(c => ['첸나이', '첸나이무역관'].includes(c.office)).length,
        teamSize: 6,
        focus: 'Automotive & IT Services',
        revenue: '$20M'
      },
      {
        territory: 'Singapore-India Corridor',
        targetCompanies: 50,
        teamSize: 3,
        focus: 'International connectivity',
        revenue: '$10M'
      }
    ];

    setIntegratedStrategy(strategy);
  };

  const calculateSegmentSize = (data: any[], segment: string) => {
    // 세그먼트 크기 계산 로직
    return Math.floor(Math.random() * 100) + 50; // 임시 값
  };

  const renderExecutiveDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-4">Data-Driven GTM Strategy</h1>
        <p className="text-xl opacity-90">Integrated Analysis of RFQ, SOF, and KOTRA Data</p>
      </div>

      {/* KPI 대시보드 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Addressable Market</p>
              <p className="text-3xl font-bold text-gray-800">$250M</p>
              <p className="text-xs text-green-600 mt-1">↑ 15% YoY</p>
            </div>
            <Globe className="text-blue-500 w-10 h-10" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Qualified Leads (RFQ)</p>
              <p className="text-3xl font-bold text-gray-800">{rfqAnalysis?.uniqueCustomers || 0}</p>
              <p className="text-xs text-blue-600 mt-1">Active quotes</p>
            </div>
            <Target className="text-green-500 w-10 h-10" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Existing Customers (SOF)</p>
              <p className="text-3xl font-bold text-gray-800">{sofAnalysis?.totalContracts || 0}</p>
              <p className="text-xs text-purple-600 mt-1">Active contracts</p>
            </div>
            <RefreshCw className="text-purple-500 w-10 h-10" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Korean Companies</p>
              <p className="text-3xl font-bold text-gray-800">{kotraAnalysis?.totalCompanies || 0}</p>
              <p className="text-xs text-orange-600 mt-1">Target accounts</p>
            </div>
            <Building2 className="text-orange-500 w-10 h-10" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Win Rate Target</p>
              <p className="text-3xl font-bold text-gray-800">35%</p>
              <p className="text-xs text-red-600 mt-1">Conversion goal</p>
            </div>
            <Award className="text-red-500 w-10 h-10" />
          </div>
        </div>
      </div>

      {/* 전략적 인사이트 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Strategic Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow">
            <div className="flex items-center mb-3">
              <Zap className="text-yellow-500 w-6 h-6 mr-2" />
              <h4 className="font-semibold text-gray-800">Quick Wins</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• {kotraAnalysis?.withSalesDivision || 0} Korean companies with existing sales teams</li>
              <li>• {rfqAnalysis?.topRoutes?.length || 0} high-demand routes from RFQ analysis</li>
              <li>• Immediate cross-sell to SOF customers</li>
            </ul>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow">
            <div className="flex items-center mb-3">
              <TrendingUp className="text-green-500 w-6 h-6 mr-2" />
              <h4 className="font-semibold text-gray-800">Growth Opportunities</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• India-Singapore corridor expansion</li>
              <li>• Chennai automotive cluster penetration</li>
              <li>• Mumbai financial services focus</li>
            </ul>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow">
            <div className="flex items-center mb-3">
              <Shield className="text-blue-500 w-6 h-6 mr-2" />
              <h4 className="font-semibold text-gray-800">Risk Mitigation</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Diversify beyond telco concentration</li>
              <li>• Strengthen renewal processes</li>
              <li>• Build local partnerships</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRFQAnalysis = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">RFQ Analysis - Prospect Intelligence</h2>
      
      {/* RFQ 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Total Quotes</h3>
          <p className="text-3xl font-bold">{rfqAnalysis?.totalQuotes || 0}</p>
          <p className="text-sm opacity-90 mt-2">Last 12 months</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Unique Customers</h3>
          <p className="text-3xl font-bold">{rfqAnalysis?.uniqueCustomers || 0}</p>
          <p className="text-sm opacity-90 mt-2">Potential accounts</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Hot Routes</h3>
          <p className="text-3xl font-bold">{rfqAnalysis?.topRoutes?.length || 0}</p>
          <p className="text-sm opacity-90 mt-2">High demand corridors</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Conversion Potential</h3>
          <p className="text-3xl font-bold">$45M</p>
          <p className="text-sm opacity-90 mt-2">Pipeline value</p>
        </div>
      </div>

      {/* Top Routes 분석 */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Top 10 Requested Routes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Potential</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rfqAnalysis?.topRoutes?.map((route: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {route.route}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {route.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {route.potential}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <button className="hover:underline">Prioritize →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Demand Heat Map */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Regional Demand Distribution</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={
            Object.entries(rfqAnalysis?.regionalDemand || {})
              .filter(([region]) => region && region !== 'null' && region !== 'undefined' && region !== '')
              .map(([region, count]) => ({
                region,
                demand: count
              }))
              .sort((a: any, b: any) => b.demand - a.demand)
              .slice(0, 15) // 상위 15개 지역만 표시
          }>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="demand" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderSOFAnalysis = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">SOF Analysis - Customer Retention & Expansion</h2>
      
      {/* SOF 메트릭스 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Active Contracts</h3>
          <p className="text-3xl font-bold">{sofAnalysis?.totalContracts || 0}</p>
          <p className="text-sm opacity-90 mt-2">Current customers</p>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Active Routes</h3>
          <p className="text-3xl font-bold">{sofAnalysis?.activeRoutes || 0}</p>
          <p className="text-sm opacity-90 mt-2">Unique corridors</p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Renewal Pipeline</h3>
          <p className="text-3xl font-bold">$85M</p>
          <p className="text-sm opacity-90 mt-2">Next 12 months</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Expansion Potential</h3>
          <p className="text-3xl font-bold">{sofAnalysis?.expansionPotential?.length || 0}</p>
          <p className="text-sm opacity-90 mt-2">Upsell opportunities</p>
        </div>
      </div>

      {/* Expansion Opportunities */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">High-Value Expansion Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sofAnalysis?.expansionPotential?.slice(0, 6).map((opp: any, idx: number) => (
            <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{opp.route}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  opp.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {opp.priority} Priority
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Frequency: {opp.frequency} contracts</p>
                <p>Strategy: {opp.strategy}</p>
              </div>
              <button className="mt-3 text-blue-600 text-sm hover:underline">
                View Details →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Retention Strategy */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Retention Playbook</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <RefreshCw className="text-green-600 w-8 h-8 mb-2" />
            <h4 className="font-semibold mb-2">Proactive Renewal</h4>
            <p className="text-sm text-gray-600">
              Start renewal discussions 6 months before expiry with value-add proposals
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Layers className="text-blue-600 w-8 h-8 mb-2" />
            <h4 className="font-semibold mb-2">Bundle & Expand</h4>
            <p className="text-sm text-gray-600">
              Offer multi-route discounts and additional services to increase wallet share
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Shield className="text-purple-600 w-8 h-8 mb-2" />
            <h4 className="font-semibold mb-2">Risk Monitoring</h4>
            <p className="text-sm text-gray-600">
              Track usage patterns and satisfaction scores to prevent churn
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderKOTRAAnalysis = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">KOTRA Analysis - Korean Company Targeting</h2>
      
      {/* KOTRA 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Total Companies</h3>
          <p className="text-3xl font-bold">{kotraAnalysis?.totalCompanies || 0}</p>
          <p className="text-sm opacity-90 mt-2">Korean firms in India</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">With Sales Teams</h3>
          <p className="text-3xl font-bold">{kotraAnalysis?.withSalesDivision || 0}</p>
          <p className="text-sm opacity-90 mt-2">Direct approach targets</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Mumbai Region</h3>
          <p className="text-3xl font-bold">{kotraAnalysis?.byLocation?.['뭄바이'] || 0}</p>
          <p className="text-sm opacity-90 mt-2">Financial hub focus</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Chennai Region</h3>
          <p className="text-3xl font-bold">
            {(kotraAnalysis?.byLocation?.['첸나이'] || 0) + (kotraAnalysis?.byLocation?.['첸나이무역관'] || 0)}
          </p>
          <p className="text-sm opacity-90 mt-2">Manufacturing cluster</p>
        </div>
      </div>

      {/* Industry Segments */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Industry Segmentation & Approach</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Companies</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales Approach</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {kotraAnalysis?.targetSegments?.slice(0, 8).map((segment: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {segment.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {segment.companyCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      segment.priority === 'High' ? 'bg-red-100 text-red-800' :
                      segment.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {segment.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {segment.approach}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Korean Company Engagement Strategy */}
      <div className="bg-gradient-to-r from-red-50 to-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Korean Company Engagement Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <Users className="text-red-600 w-8 h-8 mb-2" />
            <h4 className="font-semibold mb-2">Korean Sales Team</h4>
            <p className="text-sm text-gray-600">
              Dedicated Korean-speaking representatives for cultural alignment
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Globe className="text-blue-600 w-8 h-8 mb-2" />
            <h4 className="font-semibold mb-2">Korea-India Corridor</h4>
            <p className="text-sm text-gray-600">
              Emphasize direct connectivity to Korean headquarters
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Briefcase className="text-green-600 w-8 h-8 mb-2" />
            <h4 className="font-semibold mb-2">Partnership Approach</h4>
            <p className="text-sm text-gray-600">
              Collaborate with KOTRA and Korean business associations
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Award className="text-purple-600 w-8 h-8 mb-2" />
            <h4 className="font-semibold mb-2">Success Stories</h4>
            <p className="text-sm text-gray-600">
              Leverage testimonials from existing Korean clients
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegratedStrategy = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Integrated GTM Execution Plan</h2>
      
      {/* Strategic Priorities */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Strategic Priorities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Q1 2024: Foundation</h4>
            <ul className="text-sm space-y-1">
              <li>• Establish Korean sales team</li>
              <li>• Map SOF renewal calendar</li>
              <li>• Prioritize top 10 RFQ routes</li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Q2 2024: Acceleration</h4>
            <ul className="text-sm space-y-1">
              <li>• Launch KOTRA partnership program</li>
              <li>• Execute renewal campaigns</li>
              <li>• Convert high-priority RFQs</li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Q3-Q4 2024: Scale</h4>
            <ul className="text-sm space-y-1">
              <li>• Expand to secondary markets</li>
              <li>• Bundle service offerings</li>
              <li>• Achieve $50M revenue target</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sales Organization Structure */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Optimized Sales Organization</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {integratedStrategy?.salesTerritories?.map((territory: any, idx: number) => (
            <div key={idx} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-lg text-gray-800">{territory.territory}</h4>
                <MapPin className="text-gray-400 w-5 h-5" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Companies:</span>
                  <span className="font-semibold">{territory.targetCompanies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Team Size:</span>
                  <span className="font-semibold">{territory.teamSize} reps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue Target:</span>
                  <span className="font-semibold text-green-600">{territory.revenue}</span>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500">Focus: {territory.focus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan Matrix */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">90-Day Action Plan</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">Week 1-2: Data Integration & Analysis</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Consolidate RFQ, SOF, and KOTRA databases</li>
                <li>• Create unified customer view and scoring model</li>
                <li>• Identify quick-win opportunities</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">Week 3-6: Team Formation & Training</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Recruit Korean-speaking sales representatives</li>
                <li>• Develop industry-specific pitch decks</li>
                <li>• Conduct product and market training</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
            <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">Week 7-12: Market Engagement</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Launch outreach to top 50 KOTRA companies</li>
                <li>• Initiate SOF renewal conversations</li>
                <li>• Convert warm RFQ leads to proposals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Success Metrics & KPIs</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">25%</p>
            <p className="text-sm text-gray-600 mt-1">RFQ to Proposal</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-green-600">85%</p>
            <p className="text-sm text-gray-600 mt-1">SOF Renewal Rate</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-purple-600">30</p>
            <p className="text-sm text-gray-600 mt-1">New KOTRA Clients</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-orange-600">$50M</p>
            <p className="text-sm text-gray-600 mt-1">Revenue Target</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing RFQ, SOF, and KOTRA data...</p>
          </div>
        </div>
      );
    }

    if (viewMode === 'all') {
      return (
        <div className="space-y-12">
          {renderExecutiveDashboard()}
          <hr className="my-8 border-gray-300" />
          {renderRFQAnalysis()}
          <hr className="my-8 border-gray-300" />
          {renderSOFAnalysis()}
          <hr className="my-8 border-gray-300" />
          {renderKOTRAAnalysis()}
          <hr className="my-8 border-gray-300" />
          {renderIntegratedStrategy()}
        </div>
      );
    }

    switch (sectionId) {
      case 'overview':
        return renderExecutiveDashboard();
      case 'rfq-analysis':
        return renderRFQAnalysis();
      case 'sof-analysis':
        return renderSOFAnalysis();
      case 'kotra-analysis':
        return renderKOTRAAnalysis();
      case 'integrated-strategy':
        return renderIntegratedStrategy();
      default:
        return renderExecutiveDashboard();
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {renderContent()}
    </div>
  );
}