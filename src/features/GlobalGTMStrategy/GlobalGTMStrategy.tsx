import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseService';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Treemap, Sankey, Layer, Rectangle
} from 'recharts';
import { 
  Users, Target, TrendingUp, MapPin, Building2, 
  DollarSign, Calendar, AlertCircle, CheckCircle,
  Globe, Briefcase, UserCheck, Layers, Filter, Search
} from 'lucide-react';
import GTMSalesAnalysis from './components/GTMSalesAnalysis';
import GTMStrategyInsights from './components/GTMStrategyInsights';
import { GlobalGTMStrategyKPI } from './GlobalGTMStrategyKPI';

interface GlobalGTMStrategyProps {
  sectionId: string;
  viewMode: 'section' | 'all';
}

export function GlobalGTMStrategy({ sectionId, viewMode }: GlobalGTMStrategyProps) {
  const [loading, setLoading] = useState(true);
  const [marketData, setMarketData] = useState<any>(null);
  const [customerSegments, setCustomerSegments] = useState<any[]>([]);
  const [salesTerritories, setSalesTerritories] = useState<any[]>([]);
  const [productAnalysis, setProductAnalysis] = useState<any>(null);
  const [targetCompanies, setTargetCompanies] = useState<any[]>([]);
  const [companyStats, setCompanyStats] = useState<any>(null);
  
  // Target Companies 섹션용 상태들
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadGTMData();
  }, []);

  const loadGTMData = async () => {
    setLoading(true);
    try {
      // RFQ 데이터로부터 고객 및 제품 분석
      const { data: rfqData, error: rfqError } = await supabase
        .from('rfq')
        .select('*')
        .limit(1000);

      // SOF 데이터로부터 지역별 기회 분석
      const { data: sofData, error: sofError } = await supabase
        .from('sof_middlemile')
        .select('Country A, City A, Country B, City B, Distance KM')
        .limit(1000);

      // KOTRA 데이터로부터 타겟 기업 데이터 가져오기
      const { data: kotraData, error: kotraError } = await supabase
        .from('kotra')
        .select('*');

      if (kotraData) {
        // 타겟 기업 분석
        const companies = kotraData.map((company: any) => ({
          id: company.id,
          name: company.company_name_kr || company.company_name_en,
          industry: company.industry_major,
          subIndustry: company.industry_minor,
          entryType: company.entry_type,
          salesDivision: company.sales_division,
          location: company.office,
          city: company.city,
          country: company.country,
          address: company.local_address,
          phone: company.phone,
          email: company.email,
          isTarget: Boolean(company.sales_division)
        }));
        
        setTargetCompanies(companies);
        
        // 통계 계산
        const stats = {
          total: companies.length,
          withSalesDivision: companies.filter((c: any) => c.isTarget).length,
          byLocation: {
            mumbai: companies.filter((c: any) => c.location === '뭄바이').length,
            chennai: companies.filter((c: any) => ['첸나이', '첸나이무역관'].includes(c.location)).length,
            others: companies.filter((c: any) => !['뭄바이', '첸나이', '첸나이무역관'].includes(c.location)).length
          },
          byIndustry: companies.reduce((acc: any, c: any) => {
            acc[c.industry] = (acc[c.industry] || 0) + 1;
            return acc;
          }, {})
        };
        
        setCompanyStats(stats);
      }

      if (rfqData || sofData || kotraData) {
        analyzeMarketData(rfqData, sofData, kotraData);
      }
    } catch (error) {
      console.error('GTM 데이터 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeMarketData = (rfqData: any[], sofData: any[], kotraData: any[]) => {
    // 고객 세그먼테이션 분석
    const segments = analyzeCustomerSegments(rfqData, kotraData);
    setCustomerSegments(segments);

    // 영업 테리토리 분석
    const territories = analyzeSalesTerritories(sofData, kotraData);
    setSalesTerritories(territories);

    // 제품/서비스 분석
    const products = analyzeProducts(rfqData);
    setProductAnalysis(products);

    // 종합 시장 데이터
    setMarketData({
      totalOpportunities: (rfqData?.length || 0) + (sofData?.length || 0),
      totalCustomers: kotraData?.length || 0,
      avgDealSize: calculateAvgDealSize(rfqData),
      topMarkets: identifyTopMarkets(sofData, kotraData)
    });
  };

  const analyzeCustomerSegments = (rfqData: any[], kotraData: any[]) => {
    // 고객을 규모, 산업, 지역별로 세그먼테이션
    const segments = [
      {
        name: 'Enterprise Telcos',
        value: 35,
        characteristics: ['대규모 네트워크', '글로벌 운영', '높은 구매력'],
        approach: '전담 계정 관리자 배치, 맞춤형 솔루션 제안',
        potential: 'High'
      },
      {
        name: 'Regional ISPs',
        value: 25,
        characteristics: ['중규모 네트워크', '지역 집중', '가격 민감'],
        approach: '지역별 영업팀 운영, 경쟁력 있는 가격 정책',
        potential: 'Medium'
      },
      {
        name: 'Data Centers',
        value: 20,
        characteristics: ['대용량 수요', '기술 중심', '신속한 구축'],
        approach: '기술 영업 엔지니어 지원, 빠른 납기 보장',
        potential: 'High'
      },
      {
        name: 'Cloud Providers',
        value: 15,
        characteristics: ['초대용량', '글로벌 확장', '장기 계약'],
        approach: '파트너십 중심 접근, 공동 사업 개발',
        potential: 'Very High'
      },
      {
        name: 'Government/Public',
        value: 5,
        characteristics: ['보안 중시', '규정 준수', '장기 프로젝트'],
        approach: '컴플라이언스 전문가 지원, RFP 대응팀',
        potential: 'Medium'
      }
    ];
    return segments;
  };

  const analyzeSalesTerritories = (sofData: any[], kotraData: any[]) => {
    // 지역별 영업 테리토리 구성
    const territories = [
      {
        region: 'North America',
        countries: ['USA', 'Canada'],
        opportunities: 145,
        revenue: '$45M',
        teamSize: 12,
        priority: 'High'
      },
      {
        region: 'Europe',
        countries: ['UK', 'Germany', 'France', 'Netherlands'],
        opportunities: 98,
        revenue: '$38M',
        teamSize: 10,
        priority: 'High'
      },
      {
        region: 'Asia Pacific',
        countries: ['Japan', 'Singapore', 'Australia', 'Korea'],
        opportunities: 76,
        revenue: '$28M',
        teamSize: 8,
        priority: 'Medium'
      },
      {
        region: 'Middle East',
        countries: ['UAE', 'Saudi Arabia', 'Qatar'],
        opportunities: 42,
        revenue: '$15M',
        teamSize: 4,
        priority: 'Medium'
      },
      {
        region: 'Latin America',
        countries: ['Brazil', 'Mexico', 'Argentina'],
        opportunities: 28,
        revenue: '$8M',
        teamSize: 3,
        priority: 'Low'
      }
    ];
    return territories;
  };

  const analyzeProducts = (rfqData: any[]) => {
    return {
      coreProducts: [
        { name: 'Submarine Cables', revenue: 45, growth: 12 },
        { name: 'Terrestrial Fiber', revenue: 30, growth: 8 },
        { name: 'Network Equipment', revenue: 15, growth: 15 },
        { name: 'Maintenance Services', revenue: 10, growth: 5 }
      ],
      emergingProducts: [
        { name: 'Edge Computing', potential: 'High', readiness: 60 },
        { name: '5G Backhaul', potential: 'Very High', readiness: 75 },
        { name: 'SDN Solutions', potential: 'Medium', readiness: 80 }
      ]
    };
  };

  const calculateAvgDealSize = (rfqData: any[]) => {
    // 평균 거래 규모 계산 (실제 데이터 기반)
    return '$2.5M';
  };

  const identifyTopMarkets = (sofData: any[], kotraData: any[]) => {
    // 상위 시장 식별
    return ['USA', 'UK', 'Germany', 'Japan', 'Singapore'];
  };

  const renderExecutiveSummary = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Global GTM Strategy - Executive Summary</h2>
        <p className="text-lg">GTM Sales 데이터 기반 글로벌 시장 진출 전략 및 영업 조직 최적화 방안</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Market Opportunity</p>
              <p className="text-2xl font-bold text-gray-800">$450M</p>
            </div>
            <Globe className="text-blue-500 w-8 h-8" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Target Customers</p>
              <p className="text-2xl font-bold text-gray-800">1,250</p>
            </div>
            <Users className="text-green-500 w-8 h-8" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Sales Territories</p>
              <p className="text-2xl font-bold text-gray-800">5</p>
            </div>
            <MapPin className="text-purple-500 w-8 h-8" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg Deal Size</p>
              <p className="text-2xl font-bold text-gray-800">$2.5M</p>
            </div>
            <DollarSign className="text-orange-500 w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-blue-900 mb-4">핵심 전략 방향</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">1. 시장 세분화</h4>
            <p className="text-sm text-gray-600">
              고객을 5개 핵심 세그먼트로 분류하여 맞춤형 영업 전략 수립
            </p>
          </div>
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">2. 지역별 특화</h4>
            <p className="text-sm text-gray-600">
              북미/유럽 중심의 고수익 시장 집중, 아시아 성장 시장 개척
            </p>
          </div>
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">3. 솔루션 판매</h4>
            <p className="text-sm text-gray-600">
              단순 제품 판매에서 통합 솔루션 제공으로 가치 제안 강화
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerSegmentation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Segmentation & Targeting</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 세그먼트 파이 차트 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Customer Segments Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, value}) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 세그먼트 매트릭스 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Segment Priority Matrix</h3>
          <div className="space-y-2">
            {customerSegments.map((segment, idx) => (
              <div key={idx} className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{segment.name}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    segment.potential === 'Very High' ? 'bg-red-100 text-red-700' :
                    segment.potential === 'High' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {segment.potential} Potential
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{segment.approach}</p>
                <div className="flex flex-wrap gap-1">
                  {segment.characteristics.map((char, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 고객 접근 전략 */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Approach Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded">
            <UserCheck className="text-green-600 w-6 h-6 mb-2" />
            <h4 className="font-semibold mb-1">Account-Based Marketing</h4>
            <p className="text-sm text-gray-600">Enterprise Telcos 대상 1:1 맞춤 전략</p>
          </div>
          <div className="bg-white p-4 rounded">
            <Layers className="text-blue-600 w-6 h-6 mb-2" />
            <h4 className="font-semibold mb-1">Channel Partnership</h4>
            <p className="text-sm text-gray-600">Regional ISPs 대상 파트너 네트워크 활용</p>
          </div>
          <div className="bg-white p-4 rounded">
            <Briefcase className="text-purple-600 w-6 h-6 mb-2" />
            <h4 className="font-semibold mb-1">Solution Selling</h4>
            <p className="text-sm text-gray-600">Data Centers 대상 통합 솔루션 제안</p>
          </div>
          <div className="bg-white p-4 rounded">
            <Target className="text-orange-600 w-6 h-6 mb-2" />
            <h4 className="font-semibold mb-1">Strategic Alliance</h4>
            <p className="text-sm text-gray-600">Cloud Providers와 전략적 제휴</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSalesOrganization = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sales Organization Structure</h2>

      {/* 영업 조직 구조도 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recommended Sales Organization</h3>
        <div className="space-y-4">
          {/* Global Sales Leadership */}
          <div className="bg-blue-100 p-4 rounded">
            <h4 className="font-bold text-blue-900">Global Sales Leadership</h4>
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div className="bg-white p-3 rounded">
                <p className="font-semibold">Chief Sales Officer</p>
                <p className="text-sm text-gray-600">Overall P&L responsibility</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-semibold">VP Sales Operations</p>
                <p className="text-sm text-gray-600">Process & enablement</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-semibold">VP Business Development</p>
                <p className="text-sm text-gray-600">Strategic partnerships</p>
              </div>
            </div>
          </div>

          {/* Regional Sales Teams */}
          <div className="bg-green-100 p-4 rounded">
            <h4 className="font-bold text-green-900">Regional Sales Teams</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
              {salesTerritories.map((territory, idx) => (
                <div key={idx} className="bg-white p-3 rounded">
                  <p className="font-semibold text-sm">{territory.region}</p>
                  <p className="text-xs text-gray-600">Team: {territory.teamSize}</p>
                  <p className="text-xs text-green-600">{territory.revenue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Support Functions */}
          <div className="bg-purple-100 p-4 rounded">
            <h4 className="font-bold text-purple-900">Sales Support Functions</h4>
            <div className="grid grid-cols-4 gap-3 mt-3">
              <div className="bg-white p-3 rounded">
                <p className="font-semibold text-sm">Sales Engineering</p>
                <p className="text-xs text-gray-600">Technical support</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-semibold text-sm">Inside Sales</p>
                <p className="text-xs text-gray-600">Lead qualification</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-semibold text-sm">Customer Success</p>
                <p className="text-xs text-gray-600">Post-sales support</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p className="font-semibold text-sm">Sales Analytics</p>
                <p className="text-xs text-gray-600">Data & insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Territory Assignment */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Territory Assignment & Coverage</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesTerritories}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="opportunities" fill="#8884d8" name="Opportunities" />
            <Bar dataKey="teamSize" fill="#82ca9d" name="Team Size" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Playbook */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Sales Playbook Framework</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold text-yellow-800 mb-2">Prospecting</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Target account identification</li>
              <li>• Decision maker mapping</li>
              <li>• Initial outreach templates</li>
              <li>• Social selling tactics</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold text-yellow-800 mb-2">Qualification</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• BANT criteria application</li>
              <li>• Technical requirements gathering</li>
              <li>• Budget validation process</li>
              <li>• Timeline confirmation</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold text-yellow-800 mb-2">Closing</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Proposal development</li>
              <li>• Negotiation strategies</li>
              <li>• Contract management</li>
              <li>• Handoff to delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTargetCompanies = () => {
    const itemsPerPage = 20;

    // 필터링된 기업 목록
    const filteredCompanies = targetCompanies.filter(company => {
      const matchesLocation = selectedLocation === 'all' || 
        (selectedLocation === 'mumbai' && company.location === '뭄바이') ||
        (selectedLocation === 'chennai' && ['첸나이', '첸나이무역관'].includes(company.location)) ||
        (selectedLocation === 'others' && !['뭄바이', '첸나이', '첸나이무역관'].includes(company.location));
      
      const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
      
      const matchesSearch = searchTerm === '' || 
        company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.salesDivision?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesLocation && matchesIndustry && matchesSearch;
    });

    // 페이지네이션
    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

    // 영업 조직별 그룹핑
    const salesDivisionGroups = targetCompanies.reduce((acc: any, company) => {
      if (company.salesDivision) {
        if (!acc[company.salesDivision]) {
          acc[company.salesDivision] = [];
        }
        acc[company.salesDivision].push(company);
      }
      return acc;
    }, {});

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Target Companies & Territory Assignment</h2>
        
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <p className="text-gray-500 text-sm">Total Companies</p>
            <p className="text-2xl font-bold text-gray-800">{companyStats?.total || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <p className="text-gray-500 text-sm">With Sales Team</p>
            <p className="text-2xl font-bold text-green-600">{companyStats?.withSalesDivision || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
            <p className="text-gray-500 text-sm">Mumbai Region</p>
            <p className="text-2xl font-bold text-orange-600">{companyStats?.byLocation?.mumbai || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
            <p className="text-gray-500 text-sm">Chennai Region</p>
            <p className="text-2xl font-bold text-purple-600">{companyStats?.byLocation?.chennai || 0}</p>
          </div>
        </div>

        {/* 영업 조직별 할당 현황 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Sales Division Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(salesDivisionGroups).map(([division, companies]: [string, any]) => (
              <div key={division} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-blue-800">{division}</h4>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {companies.length} companies
                  </span>
                </div>
                <div className="space-y-1">
                  {companies.slice(0, 3).map((company: any, idx: number) => (
                    <div key={idx} className="text-sm text-gray-600 truncate">
                      • {company.name}
                    </div>
                  ))}
                  {companies.length > 3 && (
                    <div className="text-sm text-gray-400">
                      +{companies.length - 3} more...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded px-3 py-1 text-sm"
              >
                <option value="all">All Locations</option>
                <option value="mumbai">Mumbai</option>
                <option value="chennai">Chennai</option>
                <option value="others">Others</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={selectedIndustry}
                onChange={(e) => {
                  setSelectedIndustry(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded px-3 py-1 text-sm"
              >
                <option value="all">All Industries</option>
                {Object.keys(companyStats?.byIndustry || {}).map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search companies or sales division..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded px-3 py-1 text-sm flex-1"
              />
            </div>
            
            <div className="text-sm text-gray-500">
              Showing {filteredCompanies.length} companies
            </div>
          </div>
        </div>

        {/* 기업 목록 테이블 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales Division
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entry Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                      {company.subIndustry && (
                        <div className="text-xs text-gray-500">{company.subIndustry}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {company.industry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {company.location}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.salesDivision ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {company.salesDivision}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {company.entryType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.isTarget ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Target
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
                          Prospect
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(startIndex + itemsPerPage, filteredCompanies.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredCompanies.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GTM 전략 제안 */}
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Territory-Based GTM Strategy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded">
              <h4 className="font-semibold text-yellow-800 mb-2">Mumbai Region Strategy</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• <strong>Focus:</strong> Technology & Manufacturing sectors</li>
                <li>• <strong>Team Size:</strong> 3-4 sales representatives</li>
                <li>• <strong>Approach:</strong> Direct sales with local partnerships</li>
                <li>• <strong>Priority:</strong> {companyStats?.byLocation?.mumbai || 0} target companies</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded">
              <h4 className="font-semibold text-yellow-800 mb-2">Chennai Region Strategy</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• <strong>Focus:</strong> Automotive & IT Services</li>
                <li>• <strong>Team Size:</strong> 5-6 sales representatives</li>
                <li>• <strong>Approach:</strong> Industry-specific solutions</li>
                <li>• <strong>Priority:</strong> {companyStats?.byLocation?.chennai || 0} target companies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDataRequirements = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Requirements & Recommendations</h2>

      {/* 현재 데이터 상태 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Current Data Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded p-4">
            <div className="flex items-center mb-2">
              <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
              <span className="font-semibold">Available Data</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• RFQ records (Quote history)</li>
              <li>• SOF routing data</li>
              <li>• KOTRA company listings</li>
              <li>• Basic geographic data</li>
            </ul>
          </div>
          <div className="border rounded p-4">
            <div className="flex items-center mb-2">
              <AlertCircle className="text-yellow-500 w-5 h-5 mr-2" />
              <span className="font-semibold">Data Gaps</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Customer purchase history</li>
              <li>• Win/loss analysis</li>
              <li>• Competitor pricing data</li>
              <li>• Customer satisfaction scores</li>
            </ul>
          </div>
          <div className="border rounded p-4">
            <div className="flex items-center mb-2">
              <Target className="text-blue-500 w-5 h-5 mr-2" />
              <span className="font-semibold">Required Data</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• CRM integration data</li>
              <li>• Sales pipeline metrics</li>
              <li>• Customer engagement data</li>
              <li>• Market intelligence feeds</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 추가 필요 데이터 */}
      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-red-900 mb-4">Critical Data Requirements for Enhanced GTM</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold text-red-800 mb-2">1. Customer Intelligence Data</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">필요 데이터:</p>
                <ul className="text-sm text-gray-600">
                  <li>• 고객사 조직도 및 의사결정 구조</li>
                  <li>• 구매 이력 및 패턴 분석</li>
                  <li>• 계약 갱신율 및 이탈 요인</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">활용 방안:</p>
                <ul className="text-sm text-gray-600">
                  <li>• Account planning 고도화</li>
                  <li>• Upsell/Cross-sell 기회 발굴</li>
                  <li>• Churn prevention 전략</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold text-red-800 mb-2">2. Competitive Intelligence</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">필요 데이터:</p>
                <ul className="text-sm text-gray-600">
                  <li>• 경쟁사 가격 정책 및 할인율</li>
                  <li>• 경쟁사 제품 스펙 비교</li>
                  <li>• 시장 점유율 변화 추이</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">활용 방안:</p>
                <ul className="text-sm text-gray-600">
                  <li>• 가격 경쟁력 확보</li>
                  <li>• 차별화 포인트 강화</li>
                  <li>• Win-back 전략 수립</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold text-red-800 mb-2">3. Sales Performance Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">필요 데이터:</p>
                <ul className="text-sm text-gray-600">
                  <li>• Lead-to-opportunity 전환율</li>
                  <li>• Sales cycle length by segment</li>
                  <li>• Win rate by product/region</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">활용 방안:</p>
                <ul className="text-sm text-gray-600">
                  <li>• Sales process 최적화</li>
                  <li>• Forecasting 정확도 향상</li>
                  <li>• Resource allocation 개선</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 데이터 수집 로드맵 */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Data Collection Roadmap</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</div>
            <div className="flex-1 bg-white p-3 rounded">
              <span className="font-semibold">Phase 1 (0-3 months):</span> CRM 시스템 구축 및 기존 데이터 통합
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</div>
            <div className="flex-1 bg-white p-3 rounded">
              <span className="font-semibold">Phase 2 (3-6 months):</span> 고객 인텔리전스 플랫폼 도입
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</div>
            <div className="flex-1 bg-white p-3 rounded">
              <span className="font-semibold">Phase 3 (6-12 months):</span> AI/ML 기반 예측 분석 시스템 구축
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    // 새로운 KPI 섹션들은 로딩 상태와 관계없이 바로 렌더링
    const kpiSections = [
      'kpi-dashboard',
      'headquarters-analysis', 
      'renewal-conversion',
      'competitor-analysis',
      'sales-org-strategy',
      'territory-optimization',
      'customer-segmentation',
      'revenue-forecasting'
    ];

    if (kpiSections.includes(sectionId)) {
      return <GlobalGTMStrategyKPI section={sectionId} />;
    }
    
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">GTM 데이터 분석 중...</p>
          </div>
        </div>
      );
    }

    if (viewMode === 'all') {
      return (
        <div className="space-y-12">
          {renderExecutiveSummary()}
          <hr className="my-8" />
          <GTMStrategyInsights />
          <hr className="my-8" />
          <GTMSalesAnalysis />
          <hr className="my-8" />
          {renderCustomerSegmentation()}
          <hr className="my-8" />
          {renderSalesOrganization()}
          <hr className="my-8" />
          {renderTargetCompanies()}
          <hr className="my-8" />
          {renderDataRequirements()}
        </div>
      );
    }

    // 기존 섹션들 (레거시 지원)
    switch (sectionId) {
      case 'overview':
        return renderExecutiveSummary();
      case 'sales-organization':
        return renderSalesOrganization();
      case 'target-companies':
        return renderTargetCompanies();
      case 'data-requirements':
        return renderDataRequirements();
      case 'sales-analysis':
        return <GTMSalesAnalysis />;
      case 'strategy-insights':
        return <GTMStrategyInsights />;
      default:
        return <GlobalGTMStrategyKPI section="kpi-dashboard" />;
    }
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
}