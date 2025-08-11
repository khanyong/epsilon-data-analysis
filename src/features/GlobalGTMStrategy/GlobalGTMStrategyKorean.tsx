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
  ArrowUpRight, RefreshCw, Shield, Zap, Award, Building
} from 'lucide-react';

interface GlobalGTMStrategyKoreanProps {
  sectionId: string;
  viewMode: 'section' | 'all';
}

export function GlobalGTMStrategyKorean({ sectionId, viewMode }: GlobalGTMStrategyKoreanProps) {
  const [loading, setLoading] = useState(true);
  const [rfqAnalysis, setRfqAnalysis] = useState<any>(null);
  const [sofAnalysis, setSofAnalysis] = useState<any>(null);
  const [kotraAnalysis, setKotraAnalysis] = useState<any>(null);
  const [integratedStrategy, setIntegratedStrategy] = useState<any>(null);
  const [territoryData, setTerritoryData] = useState<any>(null);

  useEffect(() => {
    loadComprehensiveData();
  }, []);

  const loadComprehensiveData = async () => {
    setLoading(true);
    try {
      // RFQ 데이터 로드
      const { data: rfqData } = await supabase
        .from('rfq')
        .select('*')
        .limit(5000);

      // SOF 데이터 로드
      const { data: sofData } = await supabase
        .from('sof_middlemile')
        .select('*')
        .limit(5000);

      // KOTRA 데이터 로드 - 뭄바이, 첸나이 중심
      const { data: kotraData } = await supabase
        .from('kotra')
        .select('*');

      if (kotraData) {
        // 뭄바이, 첸나이 지역 기업 분석
        const mumbaiCompanies = kotraData.filter(c => c.office === '뭄바이');
        const chennaiCompanies = kotraData.filter(c => 
          c.office === '첸나이' || c.office === '첸나이무역관'
        );

        setTerritoryData({
          mumbai: {
            total: mumbaiCompanies.length,
            withSales: mumbaiCompanies.filter(c => c.sales_division).length,
            industries: groupByIndustry(mumbaiCompanies),
            salesTeams: groupBySalesTeam(mumbaiCompanies)
          },
          chennai: {
            total: chennaiCompanies.length,
            withSales: chennaiCompanies.filter(c => c.sales_division).length,
            industries: groupByIndustry(chennaiCompanies),
            salesTeams: groupBySalesTeam(chennaiCompanies)
          }
        });
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

  const groupByIndustry = (companies: any[]) => {
    const groups: any = {};
    companies.forEach(c => {
      if (c.industry_major && c.industry_major !== 'null') {
        groups[c.industry_major] = (groups[c.industry_major] || 0) + 1;
      }
    });
    return groups;
  };

  const groupBySalesTeam = (companies: any[]) => {
    const groups: any = {};
    companies.forEach(c => {
      if (c.sales_division && c.sales_division !== 'null') {
        if (!groups[c.sales_division]) {
          groups[c.sales_division] = [];
        }
        groups[c.sales_division].push({
          name: c.company_name_kr,
          industry: c.industry_major
        });
      }
    });
    return groups;
  };

  const analyzeRFQData = (data: any[]) => {
    const validData = data.filter(rfq => 
      rfq && Object.keys(rfq).length > 0
    );

    const analysis = {
      totalQuotes: validData.length,
      uniqueCustomers: new Set(validData.map(d => d['Customer Name'] || d.customer_name || d.Customer).filter(Boolean)).size,
      topRoutes: {},
      regionalDemand: {}
    };

    validData.forEach(rfq => {
      const countryA = rfq['Country A'] || rfq.country_a || rfq.CountryA;
      const countryB = rfq['Country B'] || rfq.country_b || rfq.CountryB;
      
      if (countryA && countryB && countryA !== 'null' && countryB !== 'null') {
        const route = `${countryA}-${countryB}`;
        analysis.topRoutes[route] = (analysis.topRoutes[route] || 0) + 1;
      }
      
      if (countryA && countryA !== 'null') {
        analysis.regionalDemand[countryA] = (analysis.regionalDemand[countryA] || 0) + 1;
      }
    });

    setRfqAnalysis(analysis);
  };

  const analyzeSOFData = (data: any[]) => {
    const validData = data.filter(sof => 
      sof && Object.keys(sof).length > 0
    );

    const analysis = {
      totalContracts: validData.length,
      activeRoutes: 0,
      expansionPotential: []
    };

    const routeFrequency: any = {};
    validData.forEach(sof => {
      const countryA = sof['Country A'] || sof.country_a || sof.CountryA;
      const countryB = sof['Country B'] || sof.country_b || sof.CountryB;
      
      if (countryA && countryB && countryA !== 'null' && countryB !== 'null') {
        const route = `${countryA}-${countryB}`;
        routeFrequency[route] = (routeFrequency[route] || 0) + 1;
      }
    });

    analysis.activeRoutes = Object.keys(routeFrequency).length;
    analysis.expansionPotential = Object.entries(routeFrequency)
      .filter(([_, freq]: any) => freq > 2)
      .map(([route, freq]) => ({ route, frequency: freq }))
      .sort((a: any, b: any) => b.frequency - a.frequency)
      .slice(0, 10);

    setSofAnalysis(analysis);
  };

  const analyzeKOTRAData = (data: any[]) => {
    const validData = data.filter(company => 
      company && company.office && company.office !== 'null'
    );

    const analysis = {
      totalCompanies: validData.length,
      withSalesDivision: validData.filter(c => c.sales_division && c.sales_division !== 'null').length,
      byLocation: {},
      byIndustry: {},
      targetSegments: []
    };

    validData.forEach(company => {
      if (company.office) {
        analysis.byLocation[company.office] = (analysis.byLocation[company.office] || 0) + 1;
      }
      if (company.industry_major && company.industry_major !== 'null') {
        analysis.byIndustry[company.industry_major] = (analysis.byIndustry[company.industry_major] || 0) + 1;
      }
    });

    analysis.targetSegments = Object.entries(analysis.byIndustry)
      .map(([industry, count]: any) => ({
        industry,
        companyCount: count,
        priority: count > 20 ? '높음' : count > 10 ? '중간' : '낮음'
      }))
      .sort((a, b) => b.companyCount - a.companyCount)
      .slice(0, 10);

    setKotraAnalysis(analysis);
  };

  const createIntegratedStrategy = (rfqData: any[], sofData: any[], kotraData: any[]) => {
    const strategy = {
      marketSegments: [
        {
          segment: '대형 통신사',
          size: 45,
          growth: 15,
          approach: '전담 계정 관리자 배치 및 맞춤형 솔루션',
          priority: '최우선'
        },
        {
          segment: '인도 진출 한국기업',
          size: kotraData.length,
          growth: 8,
          approach: '한국어 영업팀 운영 및 문화적 친밀감 활용',
          priority: '높음'
        },
        {
          segment: '데이터센터',
          size: 30,
          growth: 25,
          approach: '기술 영업팀 지원 및 신속한 구축',
          priority: '중간'
        }
      ]
    };
    setIntegratedStrategy(strategy);
  };

  const renderExecutiveDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-4">Global GTM Strategy Dashboard</h1>
        <p className="text-xl opacity-90">RFQ, SOF, KOTRA 데이터 통합 분석 기반 영업 전략</p>
      </div>

      {/* 핵심 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">총 시장 규모</p>
              <p className="text-3xl font-bold text-gray-800">₩3,000억</p>
              <p className="text-xs text-green-600 mt-1">↑ 15% 전년대비</p>
            </div>
            <Globe className="text-blue-500 w-10 h-10" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">견적 요청 고객</p>
              <p className="text-3xl font-bold text-gray-800">{rfqAnalysis?.uniqueCustomers || 0}</p>
              <p className="text-xs text-blue-600 mt-1">잠재 고객</p>
            </div>
            <Target className="text-green-500 w-10 h-10" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">기존 계약</p>
              <p className="text-3xl font-bold text-gray-800">{sofAnalysis?.totalContracts || 0}</p>
              <p className="text-xs text-purple-600 mt-1">재계약 대상</p>
            </div>
            <RefreshCw className="text-purple-500 w-10 h-10" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">한국 기업</p>
              <p className="text-3xl font-bold text-gray-800">{kotraAnalysis?.totalCompanies || 0}</p>
              <p className="text-xs text-orange-600 mt-1">타겟 기업</p>
            </div>
            <Building2 className="text-orange-500 w-10 h-10" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">목표 전환율</p>
              <p className="text-3xl font-bold text-gray-800">35%</p>
              <p className="text-xs text-red-600 mt-1">영업 목표</p>
            </div>
            <Award className="text-red-500 w-10 h-10" />
          </div>
        </div>
      </div>

      {/* 지역별 영업 조직 현황 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">🌏 인도 지역별 영업 조직 현황</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 뭄바이 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-blue-800">🏙️ Mumbai Region</h4>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {territoryData?.mumbai?.total || 0}개 기업
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">영업팀 보유 기업</span>
                <span className="font-bold text-green-600">{territoryData?.mumbai?.withSales || 0}개</span>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">주요 산업 분포</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(territoryData?.mumbai?.industries || {})
                    .slice(0, 5)
                    .map(([industry, count]: any) => (
                      <span key={industry} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                        {industry} ({count})
                      </span>
                    ))}
                </div>
              </div>
              
              <div className="border-t pt-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">영업 전략</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 금융/IT 서비스 기업 집중 공략</li>
                  <li>• 현지 파트너십 활용</li>
                  <li>• 4명 전담 영업팀 운영</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 첸나이 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-purple-800">🏭 Chennai Region</h4>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                {territoryData?.chennai?.total || 0}개 기업
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-600">영업팀 보유 기업</span>
                <span className="font-bold text-green-600">{territoryData?.chennai?.withSales || 0}개</span>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">주요 산업 분포</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(territoryData?.chennai?.industries || {})
                    .slice(0, 5)
                    .map(([industry, count]: any) => (
                      <span key={industry} className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs">
                        {industry} ({count})
                      </span>
                    ))}
                </div>
              </div>
              
              <div className="border-t pt-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">영업 전략</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 제조업/자동차 산업 특화</li>
                  <li>• 한국 기업 밀집 지역 집중</li>
                  <li>• 6명 전담 영업팀 운영</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 전략적 인사이트 */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 핵심 전략 인사이트</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-yellow-500 pl-4">
            <div className="flex items-center mb-2">
              <Zap className="text-yellow-500 w-6 h-6 mr-2" />
              <h4 className="font-semibold text-gray-800">즉시 실행 가능</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 영업팀 보유 한국기업 {kotraAnalysis?.withSalesDivision || 0}개사 우선 접촉</li>
              <li>• 상위 10개 고빈도 경로 집중 영업</li>
              <li>• 기존 SOF 고객 재계약 캠페인</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="text-green-500 w-6 h-6 mr-2" />
              <h4 className="font-semibold text-gray-800">성장 기회</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 인도-싱가포르 구간 확대</li>
              <li>• 첸나이 자동차 클러스터 침투</li>
              <li>• 뭄바이 금융 서비스 집중</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center mb-2">
              <Shield className="text-blue-500 w-6 h-6 mr-2" />
              <h4 className="font-semibold text-gray-800">리스크 관리</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 통신사 의존도 분산</li>
              <li>• 재계약 프로세스 강화</li>
              <li>• 현지 파트너십 구축</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTerritoryStrategy = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🎯 Territory Sales Strategy & Organization</h2>
      
      {/* 영업 조직 매칭 테이블 */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Target Company Assignment by Sales Team</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">영업 조직</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">담당 지역</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">할당 기업 수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">주요 산업</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">매출 목표</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">전략</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(territoryData?.mumbai?.salesTeams || {}).slice(0, 3).map(([team, companies]: any) => (
                <tr key={team} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">뭄바이</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{companies.length}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {[...new Set(companies.map((c: any) => c.industry))].slice(0, 2).join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    ₩{(companies.length * 0.8).toFixed(1)}억
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">직접 영업</td>
                </tr>
              ))}
              {Object.entries(territoryData?.chennai?.salesTeams || {}).slice(0, 3).map(([team, companies]: any) => (
                <tr key={team} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">첸나이</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{companies.length}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {[...new Set(companies.map((c: any) => c.industry))].slice(0, 2).join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    ₩{(companies.length * 1.2).toFixed(1)}억
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">파트너십</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 지역별 상세 전략 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Mumbai Sales Strategy</h3>
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">총 타겟 기업</span>
              <span className="font-bold text-blue-600">{territoryData?.mumbai?.total || 0}개</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">영업팀 규모</span>
              <span className="font-bold">4명</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">1인당 담당 기업</span>
              <span className="font-bold">{Math.ceil((territoryData?.mumbai?.total || 0) / 4)}개</span>
            </div>
            <div className="border-t pt-3">
              <p className="text-sm font-semibold mb-2">핵심 접근 방법</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ 금융 서비스 기업 우선 공략</li>
                <li>✓ 한국어 구사 가능 영업 담당자 배치</li>
                <li>✓ 분기별 현지 세미나 개최</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-purple-900 mb-4">Chennai Sales Strategy</h3>
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">총 타겟 기업</span>
              <span className="font-bold text-purple-600">{territoryData?.chennai?.total || 0}개</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">영업팀 규모</span>
              <span className="font-bold">6명</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">1인당 담당 기업</span>
              <span className="font-bold">{Math.ceil((territoryData?.chennai?.total || 0) / 6)}개</span>
            </div>
            <div className="border-t pt-3">
              <p className="text-sm font-semibold mb-2">핵심 접근 방법</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ 제조업 클러스터 집중 공략</li>
                <li>✓ 현지 KOTRA 사무소와 협력</li>
                <li>✓ 기술 지원 엔지니어 상주</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegratedStrategy = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📋 Integrated GTM Execution Plan</h2>
      
      {/* 90일 액션 플랜 */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">90-Day Execution Roadmap</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">1</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-2">1-2주차: 데이터 통합 및 분석</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• RFQ, SOF, KOTRA 데이터베이스 통합</li>
                <li>• 고객 스코어링 모델 구축</li>
                <li>• 우선순위 타겟 리스트 작성</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">2</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-2">3-6주차: 영업팀 구성 및 교육</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 뭄바이 4명, 첸나이 6명 영업팀 구성</li>
                <li>• 한국어 구사 가능 인력 우선 채용</li>
                <li>• 산업별 맞춤 영업 교육 실시</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
            <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">3</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-2">7-12주차: 시장 진출 실행</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 영업팀 보유 한국기업 50개사 우선 접촉</li>
                <li>• SOF 재계약 대상 고객 미팅 진행</li>
                <li>• RFQ 고빈도 경로 제안서 발송</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* KPI 및 성과 지표 */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Key Performance Indicators (KPI)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600">25%</p>
            <p className="text-sm text-gray-600 mt-1">RFQ 전환율</p>
            <p className="text-xs text-gray-500 mt-1">목표: 견적→계약</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-green-600">85%</p>
            <p className="text-sm text-gray-600 mt-1">SOF 재계약율</p>
            <p className="text-xs text-gray-500 mt-1">기존고객 유지</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-purple-600">30개</p>
            <p className="text-sm text-gray-600 mt-1">신규 한국기업</p>
            <p className="text-xs text-gray-500 mt-1">KOTRA 타겟</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-orange-600">₩600억</p>
            <p className="text-sm text-gray-600 mt-1">매출 목표</p>
            <p className="text-xs text-gray-500 mt-1">2024년 목표</p>
          </div>
        </div>
      </div>

      {/* 예상 성과 */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Expected Performance & ROI</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-3">3개월 후</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex justify-between">
                <span>신규 계약</span>
                <span className="font-semibold">15건</span>
              </li>
              <li className="flex justify-between">
                <span>매출</span>
                <span className="font-semibold text-green-600">₩120억</span>
              </li>
              <li className="flex justify-between">
                <span>ROI</span>
                <span className="font-semibold">150%</span>
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-3">6개월 후</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex justify-between">
                <span>신규 계약</span>
                <span className="font-semibold">35건</span>
              </li>
              <li className="flex justify-between">
                <span>매출</span>
                <span className="font-semibold text-green-600">₩300억</span>
              </li>
              <li className="flex justify-between">
                <span>ROI</span>
                <span className="font-semibold">250%</span>
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4 bg-green-50">
            <h4 className="font-semibold text-gray-700 mb-3">12개월 후</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex justify-between">
                <span>신규 계약</span>
                <span className="font-semibold">70건</span>
              </li>
              <li className="flex justify-between">
                <span>매출</span>
                <span className="font-semibold text-green-600">₩600억</span>
              </li>
              <li className="flex justify-between">
                <span>ROI</span>
                <span className="font-semibold">400%</span>
              </li>
            </ul>
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
            <p className="text-gray-600">GTM 데이터 분석 중...</p>
          </div>
        </div>
      );
    }

    if (viewMode === 'all') {
      return (
        <div className="space-y-12">
          {renderExecutiveDashboard()}
          <hr className="my-8 border-gray-300" />
          {renderTerritoryStrategy()}
          <hr className="my-8 border-gray-300" />
          {renderIntegratedStrategy()}
        </div>
      );
    }

    switch (sectionId) {
      case 'overview':
        return renderExecutiveDashboard();
      case 'territory-strategy':
        return renderTerritoryStrategy();
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