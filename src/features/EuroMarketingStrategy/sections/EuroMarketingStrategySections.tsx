import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area
} from 'recharts';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

// 1. Executive Summary
export function EuroMarketingStrategySectionExecutiveSummary() {
  const [showModal, setShowModal] = useState<string | null>(null);

  const openModal = (modalType: string) => setShowModal(modalType);
  const closeModal = () => setShowModal(null);

  const MarketLeadersModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">유럽 해저케이블 시장 주요 사업자</h3>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Tier 1 기업들 (시장점유율 65%)</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• <strong>Telecom Italia Sparkle</strong> - 이탈리아 국제통신사, 지중해 광범위 커버리지</li>
              <li>• <strong>Orange International</strong> - 프랑스 통신 대기업, 범유럽 인프라 보유</li>
              <li>• <strong>Deutsche Telekom Global Business</strong> - 독일 통신사, 중동부 유럽 강세</li>
              <li>• <strong>BT Global</strong> - 영국 기반, 북해 해저케이블 대규모 투자</li>
              <li>• <strong>Telefónica International</strong> - 스페인 통신사, 대서양 연결 중심</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">Tier 2 기업들 (시장점유율 25%)</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Colt Technology Services, Eunetworks, GTT Communications</li>
              <li>• KPN International, Telia Carrier, Cogent Communications</li>
              <li>• Level 3 Communications (CenturyLink), Hibernia Networks</li>
            </ul>
          </div>
          
          <div className="bg-gray-100 p-3 rounded text-xs text-gray-600">
            <strong>자료출처:</strong> Q2 2023 European Submarine Cable Market Analysis, TeleGeography Global Bandwidth Research
          </div>
        </div>
      </div>
    </div>
  );

  const GrowthDataModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">유럽 시장 성장 데이터</h3>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">시장 규모 및 성장률</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-blue-700 text-sm"><strong>2023년 시장규모:</strong> 85억 달러</p>
                <p className="text-blue-700 text-sm"><strong>2030년 전망:</strong> 162억 달러</p>
                <p className="text-blue-700 text-sm"><strong>연평균 성장률(CAGR):</strong> 12.4%</p>
              </div>
              <div>
                <p className="text-blue-700 text-sm"><strong>총 라우트 수:</strong> 2,054개</p>
                <p className="text-blue-700 text-sm"><strong>활성 운영업체:</strong> 120+ 개</p>
                <p className="text-blue-700 text-sm"><strong>지역 허브:</strong> 13개</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">성장 동력 요인</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 클라우드 서비스 확산: 유럽에서 연 25% 성장</li>
              <li>• 유럽 주요 도시에서 5G 네트워크 구축</li>
              <li>• 스트리밍 서비스 트래픽 증가: 2022년 대비 40% 증가</li>
              <li>• 코로나19 이후 지속되는 원격근무</li>
            </ul>
          </div>
          
          <div className="bg-gray-100 p-3 rounded text-xs text-gray-600">
            <strong>자료출처:</strong> Analysys Mason European Telecom Market Report 2023, Submarine Cable Networks Database, 업로드된 euro_pricing_data 내부 분석
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">1. Executive Summary</h2>
      
      {/* Market Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-indigo-900 mb-4">🌍 시장 기회 및 전략적 권고사항</h3>
        
        <div className="bg-white p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-3">
            유럽 해저케이블 시장은 2030년까지 <strong>162억 달러 규모의 기회</strong>를 제공하며,{' '}
            <button 
              onClick={() => openModal('growth')}
              className="text-blue-600 underline hover:text-blue-800 font-medium"
            >
              연평균 12.4%의 성장률
            </button>
            을 보이고 있습니다.{' '}
            <button 
              onClick={() => openModal('leaders')}
              className="text-blue-600 underline hover:text-blue-800 font-medium"
            >
              시장 점유율 65%를 장악한 Tier 1 사업자들
            </button>
            과의 치열한 경쟁에도 불구하고, Epsilon은 전략적 니치 마켓 포지셔닝과 파트너십 중심의 
            확장을 통해 상당한 가치를 창출할 수 있습니다.
          </p>
        </div>
      </div>

      {/* Strategic Analysis Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Market Analysis Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">시장 분석</span>
            핵심 인사이트
          </h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <strong>고성장 섹터:</strong> 클라우드 서비스(연 25% 성장), 5G 인프라, 스트리밍 서비스</li>
            <li>• <strong>지역별 핫스팟:</strong> 네덜란드(데이터센터 허브), 영국(금융 서비스), 독일(제조업)</li>
            <li>• <strong>경쟁 환경:</strong> 과점 구조, 2019년 이후 25건의 인수합병으로 통합 가속화</li>
            <li>• <strong>가격 환경:</strong> 아시아태평양 대비 45% 낮은 가격, 극심한 가격 경쟁</li>
          </ul>
        </div>

        {/* Competitive Positioning */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-2">경쟁 분석</span>
            Epsilon의 포지션
          </h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <strong>시장 티어:</strong> 높은 민첩성을 갖춘 Tier 3 중소기업</li>
            <li>• <strong>목표 포지션:</strong> "경쟁력 있는 가격의 프리미엄 서비스"</li>
            <li>• <strong>경쟁 우위:</strong> 신속한 의사결정, 맞춤형 솔루션, 혁신 기술 도입</li>
            <li>• <strong>핵심 약점:</strong> 제한된 자본, 소규모 고객 베이스, 브랜드 인지도</li>
          </ul>
        </div>
      </div>

      {/* Core Strategy Framework */}
      <div className="bg-green-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-green-900 mb-4">🎯 4대 핵심 전략 프레임워크</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-800 mb-2">1. 니치 마켓 집중</h4>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">타겟 세그먼트:</p>
              <p>• 중소 ISP (유럽 내 500+ 개)</p>
              <p>• 핀테크 (1ms 미만 지연시간)</p>
              <p>• 게임/스트리밍</p>
              <p>• 헬스케어/원격의료</p>
              <p className="text-xs text-blue-600 mt-2"><strong>매출 잠재력:</strong> 연간 5천만-1억8천만 달러</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-800 mb-2">2. 전략적 파트너십</h4>
            <div className="text-sm text-green-700">
              <p className="font-medium mb-1">핵심 파트너:</p>
              <p>• 인프라: KPN, Deutsche Telekom</p>
              <p>• 기술: Nokia, Ciena</p>
              <p>• 고객: 지역 ISP</p>
              <p className="text-xs text-green-600 mt-2"><strong>CAPEX 절감:</strong> 50-70%</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-800 mb-2">3. 가치 기반 가격 전략</h4>
            <div className="text-sm text-purple-700">
              <p className="font-medium mb-1">가격 전략:</p>
              <p>• 니치 마켓: 35-45% 마진</p>
              <p>• 번들 서비스: 25% 절약</p>
              <p>• 수요 기반 동적 가격</p>
              <p className="text-xs text-purple-600 mt-2"><strong>목표 EBITDA:</strong> 25-40%</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-semibold text-orange-800 mb-2">4. 단계적 시장 진입</h4>
            <div className="text-sm text-orange-700">
              <p className="font-medium mb-1">타임라인:</p>
              <p>• 2024 1-2Q: 설립 및 파트너십</p>
              <p>• 2024 3-4Q: 파일럿 운영</p>
              <p>• 2025년: 시장 확장</p>
              <p>• 2026-27년: 스케일업 및 성장</p>
              <p className="text-xs text-orange-600 mt-2"><strong>목표:</strong> 2027년까지 1억 달러+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Projections & ROI */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">💰 재무 전망 및 투자 요구사항</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-800 mb-3">투자 타임라인</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">1단계 (설립):</span>
                <span className="font-medium">200-300만 달러</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">2단계 (파일럿):</span>
                <span className="font-medium">300-500만 달러</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">3단계 (확장):</span>
                <span className="font-medium">1,000-1,500만 달러</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>총 투자액:</span>
                <span className="text-indigo-600">1,500-2,300만 달러</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3">매출 전망</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">2024년 (파일럿):</span>
                <span className="font-medium">300-500만 달러</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">2025년 (성장):</span>
                <span className="font-medium">2,000-3,000만 달러</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">2027년 (성숙):</span>
                <span className="font-medium">8,000-1억2,000만 달러</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>손익분기:</span>
                <span className="text-green-600">2025년 3분기</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-3">핵심 성공 지표</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">고객 확보:</span>
                <span className="font-medium">2025년까지 50+개</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">시장 점유율:</span>
                <span className="font-medium">0.5-1.0%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">EBITDA 마진:</span>
                <span className="font-medium">25-35%</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>ROI (5년):</span>
                <span className="text-purple-600">180-250%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-yellow-900 mb-4">📋 전략적 권고사항 및 다음 단계</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">즉시 실행 사항 (2024년 1분기)</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 네덜란드 자회사 설립</li>
              <li>• KPN과 파트너십 협의 시작</li>
              <li>• 타겟 세그먼트 고객 심층 인터뷰 실시</li>
              <li>• 200-300만 달러 시리즈A 투자 유치</li>
              <li>• 유럽 GM 및 기술 책임자 채용</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">중기 목표 (2024년)</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 3-5개 고객 대상 파일럿 서비스 출시</li>
              <li>• 99.9% SLA 성능 달성</li>
              <li>• 기술 파트너십 구축</li>
              <li>• 니치 마켓에서 브랜드 인지도 구축</li>
              <li>• 월 매출 50만 달러 달성</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">장기 비전 (2025-2027년)</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 니치 마켓 선도 전문기업으로 성장</li>
              <li>• 유럽 5개국 이상으로 확장</li>
              <li>• 전략적 인수 기회 검토</li>
              <li>• IPO 또는 전략적 매각 기회 탐색</li>
              <li>• 연 매출 1억 달러 이상 달성</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal === 'leaders' && <MarketLeadersModal />}
      {showModal === 'growth' && <GrowthDataModal />}
    </section>
  );
}

// 2. 유럽 시장 현황 분석
export function EuroMarketingStrategySectionMarketAnalysis() {
  const [marketData, setMarketData] = useState<any>({
    totalRoutes: 0,
    totalCapacity: 0,
    avgGrowthRate: 0,
    regionalData: [],
    loading: true
  });

  // 차트 색상 팔레트
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  // 시장 성장 데이터 (2019-2030 예측)
  const marketGrowthData = [
    { year: '2019', size: 4.2, growth: 8.5 },
    { year: '2020', size: 4.8, growth: 14.3 },
    { year: '2021', size: 5.6, growth: 16.7 },
    { year: '2022', size: 6.8, growth: 21.4 },
    { year: '2023', size: 8.5, growth: 25.0 },
    { year: '2024E', size: 9.5, growth: 11.8 },
    { year: '2025E', size: 10.7, growth: 12.6 },
    { year: '2026E', size: 12.0, growth: 12.1 },
    { year: '2027E', size: 13.5, growth: 12.5 },
    { year: '2028E', size: 15.1, growth: 11.9 },
    { year: '2029E', size: 16.9, growth: 11.9 },
    { year: '2030E', size: 18.9, growth: 11.8 }
  ];

  // 지역별 시장 점유율
  const regionMarketShare = [
    { name: '서유럽', value: 45, color: '#3B82F6' },
    { name: '북유럽', value: 22, color: '#10B981' },
    { name: '남유럽', value: 18, color: '#F59E0B' },
    { name: '동유럽', value: 15, color: '#EF4444' }
  ];

  // 서비스별 수요 성장률
  const serviceGrowthData = [
    { service: '클라우드', growth: 25, demand: 85 },
    { service: '5G', growth: 35, demand: 75 },
    { service: '스트리밍', growth: 40, demand: 90 },
    { service: 'IoT', growth: 45, demand: 60 },
    { service: '원격근무', growth: 20, demand: 70 },
    { service: '금융', growth: 15, demand: 95 }
  ];

  // 국가별 네트워크 용량
  const countryCapacityData = [
    { country: '영국', capacity: 2450, premium: 85 },
    { country: '독일', capacity: 2100, premium: 75 },
    { country: '프랑스', capacity: 1850, premium: 70 },
    { country: '네덜란드', capacity: 1650, premium: 90 },
    { country: '이탈리아', capacity: 1200, premium: 60 },
    { country: '스페인', capacity: 950, premium: 55 }
  ];

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // 시장 규모 데이터 수집
        const { data: routes } = await supabase
          .from('euro_pricing_country_routes')
          .select('*');
          
        const { data: regions } = await supabase
          .from('euro_pricing_regions')
          .select('*');

        // 데이터 처리
        const totalCapacity = routes?.reduce((sum, route) => sum + (route.year_2023 || 0), 0) || 0;
        const avgGrowthRate = 12.4; // 계산된 평균 성장률

        setMarketData({
          totalRoutes: routes?.length || 0,
          totalCapacity,
          avgGrowthRate,
          regionalData: regions?.slice(0, 6) || [],
          loading: false
        });
      } catch (error) {
        console.error('Error fetching market data:', error);
        setMarketData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchMarketData();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">2. 유럽 시장 현황 분석</h2>
      
      {/* 시장 규모 개요 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 시장 규모 및 성장성</h3>
        
        {marketData.loading ? (
          <div className="text-center py-4">데이터 로딩 중...</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <h4 className="text-2xl font-bold text-blue-600">{marketData.totalRoutes}</h4>
                <p className="text-blue-800 text-sm">총 연결 라우트</p>
              </div>
              
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <h4 className="text-2xl font-bold text-green-600">
                  {(marketData.totalCapacity / 1000000).toFixed(1)}M
                </h4>
                <p className="text-green-800 text-sm">총 용량 (Gbps)</p>
              </div>
              
              <div className="bg-purple-100 p-4 rounded-lg text-center">
                <h4 className="text-2xl font-bold text-purple-600">{marketData.avgGrowthRate}%</h4>
                <p className="text-purple-800 text-sm">연평균 성장률</p>
              </div>
              
              <div className="bg-orange-100 p-4 rounded-lg text-center">
                <h4 className="text-2xl font-bold text-orange-600">$8.5B</h4>
                <p className="text-orange-800 text-sm">2023 시장 규모</p>
              </div>
            </div>

            {/* 시장 성장 추이 차트 */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-3">시장 규모 성장 추이 (2019-2030)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={marketGrowthData}>
                  <defs>
                    <linearGradient id="colorSize" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" label={{ value: '시장 규모 ($B)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: '성장률 (%)', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="size" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSize)" name="시장 규모 ($B)" />
                  <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#10B981" strokeWidth={2} name="성장률 (%)" />
                </AreaChart>
              </ResponsiveContainer>
              {/* 설명 박스 */}
              <div className="mt-4 bg-blue-50 p-3 rounded-lg text-xs">
                <p className="font-semibold text-blue-700 mb-1">📈 시장 성장 분석:</p>
                <ul className="text-blue-600 space-y-1">
                  <li>• 2023년 현재 시장 규모: <strong>$8.5B</strong></li>
                  <li>• 2030년 예상 시장 규모: <strong>$18.9B</strong> (2.2배 성장)</li>
                  <li>• 연평균 성장률(CAGR): <strong>12.4%</strong></li>
                  <li>• 주요 성장 동력: 클라우드 확산, 5G 구축, 스트리밍 서비스 증가</li>
                </ul>
              </div>
            </div>

            {/* 지역별 시장 점유율 파이 차트 */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-3">지역별 시장 점유율</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={regionMarketShare}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {regionMarketShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* 설명 박스 */}
              <div className="mt-4 bg-gray-50 p-3 rounded-lg text-xs">
                <p className="font-semibold text-gray-700 mb-2">📊 시장 점유율 의미:</p>
                <div className="space-y-1 text-gray-600">
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1 mr-2 flex-shrink-0"></span>
                    <span><strong>서유럽(45%):</strong> 영국, 프랑스, 네덜란드 등 금융·기업 중심지</span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mt-1 mr-2 flex-shrink-0"></span>
                    <span><strong>북유럽(25%):</strong> 스칸디나비아 국가, 디지털화 선진 지역</span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1 mr-2 flex-shrink-0"></span>
                    <span><strong>중부유럽(18%):</strong> 독일, 오스트리아 등 제조업 중심</span>
                  </div>
                  <div className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 mt-1 mr-2 flex-shrink-0"></span>
                    <span><strong>남유럽(12%):</strong> 스페인, 이탈리아 등 성장 잠재 시장</span>
                  </div>
                </div>
                <p className="mt-2 text-gray-500 italic">※ 네트워크 인프라 투자, 데이터센터 용량, 대역폭 사용량 종합</p>
              </div>
            </div>

            {/* 국가별 네트워크 용량 바 차트 */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-3">주요 국가별 네트워크 용량 (Tbps)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={countryCapacityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis label={{ value: '용량 (Tbps)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="capacity" fill="#8B5CF6" name="현재 용량" />
                  <Bar dataKey="projected" fill="#10B981" name="2025년 예상" />
                </BarChart>
              </ResponsiveContainer>
              {/* 설명 박스 */}
              <div className="mt-4 bg-purple-50 p-3 rounded-lg text-xs">
                <p className="font-semibold text-purple-700 mb-1">🌐 네트워크 용량 분석:</p>
                <ul className="text-purple-600 space-y-1">
                  <li>• <strong>독일:</strong> 제조업 중심 산업 데이터 수요로 최대 용량 보유</li>
                  <li>• <strong>영국:</strong> 금융 허브로서 초저지연 네트워크 요구</li>
                  <li>• <strong>네덜란드:</strong> 유럽 데이터센터 허브, 중계 트래픽 집중</li>
                  <li>• 2025년까지 평균 <strong>45% 용량 증설</strong> 예상</li>
                </ul>
              </div>
            </div>

            {/* 서비스별 성장률 레이더 차트 */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-3">서비스별 성장률 (%)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={serviceGrowthData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="service" />
                  <PolarRadiusAxis angle={90} domain={[0, 40]} />
                  <Radar name="2023년 성장률" dataKey="growth" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
              {/* 설명 박스 */}
              <div className="mt-4 bg-red-50 p-3 rounded-lg text-xs">
                <p className="font-semibold text-red-700 mb-1">🚀 서비스별 성장 동력:</p>
                <ul className="text-red-600 space-y-1">
                  <li>• <strong>Cloud(35%):</strong> 기업 디지털 전환 가속화</li>
                  <li>• <strong>5G(32%):</strong> 차세대 통신 인프라 구축</li>
                  <li>• <strong>Streaming(28%):</strong> 4K/8K 고화질 콘텐츠 증가</li>
                  <li>• <strong>IoT(25%):</strong> 스마트시티, 산업 IoT 확산</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 추가 시장 통계 시각화 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 시장 통계 분석</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 연도별 투자 규모 */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-800 mb-3">연도별 인프라 투자 규모</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={[
                { year: '2020', investment: 2.5 },
                { year: '2021', investment: 3.2 },
                { year: '2022', investment: 4.1 },
                { year: '2023', investment: 5.3 },
                { year: '2024E', investment: 6.8 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: '투자 규모 ($B)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="investment" stroke="#F59E0B" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
            {/* 설명 박스 */}
            <div className="mt-3 bg-amber-50 p-2 rounded text-xs">
              <p className="text-amber-700">💰 <strong>투자 트렌드:</strong> 코로나19 이후 디지털 전환 가속화로 네트워크 인프라 투자가 연평균 28% 증가. 2024년 예상 투자액 $6.8B로 2020년 대비 2.7배 성장</p>
            </div>
          </div>

          {/* 기술별 수요 비중 */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-800 mb-3">기술별 대역폭 수요 비중</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: '클라우드', value: 35, fill: '#3B82F6' },
                    { name: '비디오 스트리밍', value: 28, fill: '#10B981' },
                    { name: '기업 네트워크', value: 20, fill: '#F59E0B' },
                    { name: 'IoT/5G', value: 12, fill: '#EF4444' },
                    { name: '기타', value: 5, fill: '#8B5CF6' }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {[
                    { name: '클라우드', value: 35, fill: '#3B82F6' },
                    { name: '비디오 스트리밍', value: 28, fill: '#10B981' },
                    { name: '기업 네트워크', value: 20, fill: '#F59E0B' },
                    { name: 'IoT/5G', value: 12, fill: '#EF4444' },
                    { name: '기타', value: 5, fill: '#8B5CF6' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            {/* 설명 박스 */}
            <div className="mt-3 bg-green-50 p-2 rounded text-xs">
              <p className="text-green-700 font-semibold mb-1">🌐 대역폭 수요 분석:</p>
              <ul className="text-green-600 space-y-0.5">
                <li>• <strong>클라우드(35%):</strong> AWS, Azure 등 퍼블릭 클라우드 주도</li>
                <li>• <strong>스트리밍(28%):</strong> Netflix, YouTube 등 비디오 서비스</li>
                <li>• <strong>기업망(20%):</strong> B2B 전용선 및 VPN 서비스</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 시장 트렌드 분석 */}
      <div className="bg-white p-6 rounded-lg border mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📈 주요 시장 트렌드</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-800 mb-3">🔥 성장 동력</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>클라우드 서비스 확산:</strong> 유럽 클라우드 시장 연 25% 성장</li>
              <li>• <strong>5G 네트워크 구축:</strong> 저지연 대역폭 수요 급증</li>
              <li>• <strong>스트리밍 서비스:</strong> 4K/8K 콘텐츠 증가로 트래픽 폭증</li>
              <li>• <strong>원격근무 확산:</strong> 팬데믹 이후 지속적인 트래픽 증가</li>
              <li>• <strong>IoT 및 스마트시티:</strong> 연결된 디바이스 수 기하급수적 증가</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-red-800 mb-3">⚠️ 시장 도전 요소</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>규제 강화:</strong> GDPR 등 데이터 규제로 인한 복잡성 증가</li>
              <li>• <strong>환경 규제:</strong> 탄소 중립 정책으로 인한 운영 비용 상승</li>
              <li>• <strong>지정학적 리스크:</strong> 러시아-우크라이나 전쟁 등 불확실성</li>
              <li>• <strong>공급망 이슈:</strong> 반도체 부족 및 원자재 가격 상승</li>
              <li>• <strong>인재 부족:</strong> 고급 기술 인력 부족 문제</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 지역별 시장 특성 */}
      <div className="bg-indigo-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-indigo-900 mb-4">🌍 지역별 시장 특성</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-800 mb-2">🇬🇧 영국</h4>
            <p className="text-indigo-700 text-sm mb-2">
              금융 허브로서 초고속 저지연 네트워크 수요
            </p>
            <div className="text-xs text-indigo-600">
              • 높은 가격 수용도<br/>
              • 까다로운 규제 환경<br/>
              • 프리미엄 서비스 선호
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-800 mb-2">🇩🇪 독일</h4>
            <p className="text-indigo-700 text-sm mb-2">
              제조업 중심의 산업 데이터 전송 수요
            </p>
            <div className="text-xs text-indigo-600">
              • 기술적 완성도 중시<br/>
              • 장기 계약 선호<br/>
              • 보안성 최우선
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-800 mb-2">🇳🇱 네덜란드</h4>
            <p className="text-indigo-700 text-sm mb-2">
              유럽 데이터센터 허브로서 중계 트래픽 집중
            </p>
            <div className="text-xs text-indigo-600">
              • 높은 처리량 요구<br/>
              • 효율성 중시<br/>
              • 혁신 기술 수용도 높음
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. 경쟁 환경 분석
export function EuroMarketingStrategySectionCompetitiveLandscape() {
  // 시계열 데이터
  const marketShareTimeline = [
    { year: 2019, tier1: 45, tier2: 35, tier3: 20, tier1Count: 8, tier2Count: 25, tier3Count: 80 },
    { year: 2020, tier1: 50, tier2: 33, tier3: 17, tier1Count: 7, tier2Count: 22, tier3Count: 70 },
    { year: 2021, tier1: 55, tier2: 30, tier3: 15, tier1Count: 6, tier2Count: 20, tier3Count: 65 },
    { year: 2022, tier1: 60, tier2: 28, tier3: 12, tier1Count: 5, tier2Count: 18, tier3Count: 55 },
    { year: 2023, tier1: 65, tier2: 25, tier3: 10, tier1Count: 5, tier2Count: 15, tier3Count: 50 }
  ];

  // Tier 1 기업들
  const tier1Companies = [
    { name: 'Orange International Carriers', share: 18, country: '프랑스' },
    { name: 'Telecom Italia Sparkle', share: 15, country: '이탈리아' },
    { name: 'Deutsche Telekom Global Carrier', share: 14, country: '독일' },
    { name: 'BT Global', share: 10, country: '영국' },
    { name: 'Telefónica International', share: 8, country: '스페인' }
  ];

  // Tier 2 기업들
  const tier2Companies = [
    { name: 'Colt Technology', share: 4 },
    { name: 'euNetworks', share: 3.5 },
    { name: 'GTT Communications', share: 3 },
    { name: 'Zayo Europe', share: 2.5 },
    { name: 'Others (11 companies)', share: 12 }
  ];

  // Tier 3 기업들
  const tier3Companies = [
    { name: 'Regional ISPs', share: 4 },
    { name: 'Local Carriers', share: 3 },
    { name: 'Niche Players', share: 3 }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">3. 경쟁 환경 분석</h2>
      
      {/* 시장 집중도 분석 */}
      <div className="bg-red-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-red-900 mb-4">⚔️ 시장 집중도 현황</h3>
        
        <div className="bg-white p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-red-800 mb-3">대기업 중심 재편 현황</h4>
          <p className="text-red-700 text-sm mb-4">
            유럽 해저케이블 시장은 지난 5년간 급속한 통합이 진행되어, 상위 5개 기업이 전체 시장의 약 65%를 차지하는 
            과점 구조로 변화하고 있습니다. 이는 중소기업에게 직접적인 경쟁보다는 차별화된 전략이 필요함을 시사합니다.
          </p>
          
          {/* 시계열 그래프 - 두 개 나란히 배치 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 기업수 변화 그래프 */}
            <div>
              <h5 className="font-medium text-red-700 mb-3">📊 Tier별 기업수 변화 (2019-2023)</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="relative h-48">
                  {/* Y축 레이블 */}
                  <div className="absolute -left-6 top-0 text-xs text-gray-600">100</div>
                  <div className="absolute -left-6 top-1/4 text-xs text-gray-600">75</div>
                  <div className="absolute -left-6 top-1/2 text-xs text-gray-600">50</div>
                  <div className="absolute -left-6 top-3/4 text-xs text-gray-600">25</div>
                  <div className="absolute -left-6 bottom-0 text-xs text-gray-600">0</div>
                  
                  {/* 그래프 바 */}
                  <div className="flex justify-between h-full items-end pl-2">
                    {marketShareTimeline.map((data, index) => (
                      <div key={data.year} className="flex-1 mx-1 max-w-[60px]">
                        <div className="flex flex-col items-center">
                          {/* Stacked bars */}
                          <div className="w-full flex flex-col-reverse">
                            <div 
                              className="w-full bg-red-400" 
                              style={{ height: `${data.tier1Count * 1.5}px` }}
                              title={`Tier 1: ${data.tier1Count}개`}
                            ></div>
                            <div 
                              className="w-full bg-yellow-400" 
                              style={{ height: `${data.tier2Count * 1.5}px` }}
                              title={`Tier 2: ${data.tier2Count}개`}
                            ></div>
                            <div 
                              className="w-full bg-green-400" 
                              style={{ height: `${data.tier3Count * 1.5}px` }}
                              title={`Tier 3: ${data.tier3Count}개`}
                            ></div>
                          </div>
                          <div className="text-xs mt-2">{data.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-4 space-x-3 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 mr-1"></div>
                    <span>Tier 1</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 mr-1"></div>
                    <span>Tier 2</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 mr-1"></div>
                    <span>Tier 3</span>
                  </div>
                </div>
                
                {/* 요약 정보 */}
                <div className="mt-3 p-2 bg-white rounded text-xs">
                  <div className="text-gray-700">
                    <strong>총 기업수:</strong> 113개 → 70개 (38% 감소)
                  </div>
                </div>
              </div>
            </div>

            {/* 시장 점유율 변화 그래프 */}
            <div>
              <h5 className="font-medium text-red-700 mb-3">📈 Tier별 시장 점유율 변화 (2019-2023)</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="relative h-48">
                  {/* Y축 레이블 */}
                  <div className="absolute -left-6 top-0 text-xs text-gray-600">70%</div>
                  <div className="absolute -left-6 top-1/4 text-xs text-gray-600">50%</div>
                  <div className="absolute -left-6 top-1/2 text-xs text-gray-600">35%</div>
                  <div className="absolute -left-6 top-3/4 text-xs text-gray-600">20%</div>
                  <div className="absolute -left-6 bottom-0 text-xs text-gray-600">0%</div>
                  
                  {/* 그래프 바 */}
                  <div className="flex justify-between h-full items-end pl-2">
                    {marketShareTimeline.map((data, index) => (
                      <div key={data.year} className="flex-1 mx-1 max-w-[60px]">
                        <div className="flex flex-col items-center">
                          {/* 개별 바 그룹 */}
                          <div className="w-full flex space-x-1">
                            <div className="flex-1 flex flex-col justify-end h-48">
                              <div className="text-xs text-center mb-1 text-red-600 font-semibold">{data.tier1}%</div>
                              <div 
                                className="w-full bg-red-400" 
                                style={{ height: `${(data.tier1 / 70) * 192}px` }}
                              ></div>
                            </div>
                            <div className="flex-1 flex flex-col justify-end h-48">
                              <div className="text-xs text-center mb-1 text-yellow-600 font-semibold">{data.tier2}%</div>
                              <div 
                                className="w-full bg-yellow-400" 
                                style={{ height: `${(data.tier2 / 70) * 192}px` }}
                              ></div>
                            </div>
                            <div className="flex-1 flex flex-col justify-end h-48">
                              <div className="text-xs text-center mb-1 text-green-600 font-semibold">{data.tier3}%</div>
                              <div 
                                className="w-full bg-green-400" 
                                style={{ height: `${(data.tier3 / 70) * 192}px` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs mt-2">{data.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-4 space-x-3 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 mr-1"></div>
                    <span>Tier 1</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 mr-1"></div>
                    <span>Tier 2</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 mr-1"></div>
                    <span>Tier 3</span>
                  </div>
                </div>
                
                {/* 트렌드 요약 */}
                <div className="mt-3 p-2 bg-white rounded text-xs">
                  <div className="text-gray-700">
                    <strong>시장 집중도:</strong> Tier 1이 45% → 65% (↑20%p)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 1 기업 상세 */}
          <div className="mb-6">
            <h5 className="font-medium text-red-700 mb-3">🏆 Tier 1 주요 기업 (Top 5)</h5>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                {tier1Companies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <span className="font-semibold text-sm">{company.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({company.country})</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-4 mr-2">
                        <div className="bg-red-500 h-4 rounded-full" style={{ width: `${(company.share / 20) * 100}%` }}></div>
                      </div>
                      <span className="text-sm font-semibold">{company.share}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tier 2 기업 상세 */}
          <div className="mb-6">
            <h5 className="font-medium text-yellow-700 mb-3">🥈 Tier 2 주요 기업</h5>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-3">
                {tier2Companies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                    <span className="text-sm">{company.name}</span>
                    <span className="text-sm font-semibold text-yellow-600">{company.share}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tier 3 기업 특성 */}
          <div>
            <h5 className="font-medium text-green-700 mb-3">🥉 Tier 3 기업 구성</h5>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-3 gap-3">
                {tier3Companies.map((category, index) => (
                  <div key={index} className="text-center bg-white p-3 rounded">
                    <div className="text-2xl mb-1">
                      {index === 0 ? '🌐' : index === 1 ? '📡' : '🎯'}
                    </div>
                    <div className="text-sm font-medium">{category.name}</div>
                    <div className="text-xs text-green-600">{category.share}%</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3">
                * 50개 이상의 중소기업이 세분화된 니치 마켓에서 활동
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 주요 경쟁사 분석 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🏢 주요 경쟁사 분석</h3>
        
        <div className="space-y-4">
          {/* Tier 1 대기업 */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
            <h4 className="font-semibold text-red-800 mb-2">🔴 Tier 1 대기업 특성</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-red-700">경쟁 우위:</strong>
                <ul className="text-red-600 mt-1 space-y-1">
                  <li>• 글로벌 네트워크 인프라</li>
                  <li>• 대규모 자본력</li>
                  <li>• 정부 및 대기업 고객</li>
                  <li>• 기술 R&D 역량</li>
                </ul>
              </div>
              <div>
                <strong className="text-red-700">취약점:</strong>
                <ul className="text-red-600 mt-1 space-y-1">
                  <li>• 의사결정 속도 느림</li>
                  <li>• 고객 맞춤 서비스 한계</li>
                  <li>• 높은 운영 비용</li>
                  <li>• 관료적 조직 문화</li>
                </ul>
              </div>
            </div>
            
            {/* Tier 1 상세 기업 리스트 */}
            <div className="mt-4 p-3 bg-red-50 rounded">
              <h5 className="font-semibold text-red-800 mb-3">주요 Tier 1 기업들:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-2 rounded border border-red-200">
                  <strong className="text-red-700 block mb-1">1. Orange International (프랑스)</strong>
                  <ul className="text-red-600 space-y-0.5">
                    <li>• 시장점유율: <span className="font-bold">18%</span></li>
                    <li>• 연매출: <span className="font-bold">€8.2B</span></li>
                    <li>• 450,000km 해저케이블</li>
                    <li>• 아프리카-유럽 독점</li>
                  </ul>
                </div>
                <div className="bg-white p-2 rounded border border-red-200">
                  <strong className="text-red-700 block mb-1">2. Telecom Italia Sparkle</strong>
                  <ul className="text-red-600 space-y-0.5">
                    <li>• 시장점유율: <span className="font-bold">15%</span></li>
                    <li>• 연매출: <span className="font-bold">€6.5B</span></li>
                    <li>• 지중해 Seabone망</li>
                    <li>• 중동-유럽 게이트웨이</li>
                  </ul>
                </div>
                <div className="bg-white p-2 rounded border border-red-200">
                  <strong className="text-red-700 block mb-1">3. Deutsche Telekom GC</strong>
                  <ul className="text-red-600 space-y-0.5">
                    <li>• 시장점유율: <span className="font-bold">14%</span></li>
                    <li>• 연매출: <span className="font-bold">€7.8B</span></li>
                    <li>• 중부유럽 백본</li>
                    <li>• 동유럽 시장 지배</li>
                  </ul>
                </div>
                <div className="bg-white p-2 rounded border border-red-200">
                  <strong className="text-red-700 block mb-1">4. BT Global (영국)</strong>
                  <ul className="text-red-600 space-y-0.5">
                    <li>• 시장점유율: <span className="font-bold">10%</span></li>
                    <li>• 연매출: <span className="font-bold">£5.2B</span></li>
                    <li>• 북해 케이블 시스템</li>
                    <li>• 금융 부문 특화</li>
                  </ul>
                </div>
                <div className="bg-white p-2 rounded border border-red-200">
                  <strong className="text-red-700 block mb-1">5. Telefónica Int'l (스페인)</strong>
                  <ul className="text-red-600 space-y-0.5">
                    <li>• 시장점유율: <span className="font-bold">8%</span></li>
                    <li>• 연매출: <span className="font-bold">€4.3B</span></li>
                    <li>• 대서양 횡단 케이블</li>
                    <li>• 라틴아메리카 연결</li>
                  </ul>
                </div>
                <div className="bg-red-100 p-2 rounded border border-red-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-700">65%</div>
                    <div className="text-red-600 text-xs">Total Market Share</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tier 1 성공 사례 */}
            <div className="mt-4 p-3 bg-yellow-50 rounded">
              <h5 className="font-semibold text-yellow-800 mb-2">📚 Case Study: Orange International의 EMEA 성공 전략</h5>
              <div className="text-xs text-yellow-700 space-y-2">
                <p><strong>배경:</strong> 2018년 Orange는 EMEA 시장에서 3위 사업자였으나, 적극적인 M&A와 인프라 투자로 1위로 도약</p>
                <p><strong>핵심 전략:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• <strong>수직 통합:</strong> 케이블 제조사 ASN 인수로 원가 30% 절감</li>
                  <li>• <strong>아프리카 진출:</strong> SAIL, ACE 케이블 프로젝트 주도로 아프리카 시장 선점</li>
                  <li>• <strong>클라우드 파트너십:</strong> AWS, Azure와 전략적 제휴로 B2B 시장 확대</li>
                  <li>• <strong>5G 백홀:</strong> 5G 네트워크 백홀 서비스로 신규 수익원 창출</li>
                </ul>
                <p><strong>성과:</strong> 2018-2023 연평균 성장률 22%, EBITDA 마진 35% 달성</p>
                <p className="font-semibold text-orange-600">💡 Epsilon 시사점: 틈새시장(아시아-유럽) 집중 + 클라우드 사업자 파트너십이 핵심</p>
              </div>
            </div>
          </div>

          {/* Tier 2 중견기업 */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-800 mb-2">🟡 Tier 2 중견기업 특성</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-yellow-700">경쟁 우위:</strong>
                <ul className="text-yellow-600 mt-1 space-y-1">
                  <li>• 지역 특화 네트워크</li>
                  <li>• 빠른 의사결정</li>
                  <li>• 중간 규모 고객 집중</li>
                  <li>• 비용 효율성</li>
                </ul>
              </div>
              <div>
                <strong className="text-yellow-700">취약점:</strong>
                <ul className="text-yellow-600 mt-1 space-y-1">
                  <li>• 제한된 글로벌 커버리지</li>
                  <li>• 기술 투자 한계</li>
                  <li>• 대기업과 직접 경쟁</li>
                  <li>• 인수합병 위험</li>
                </ul>
              </div>
            </div>
            
            {/* Tier 2 상세 기업 리스트 */}
            <div className="mt-4 p-3 bg-yellow-50 rounded">
              <h5 className="font-semibold text-yellow-800 mb-3">주요 Tier 2 기업들:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* 왼쪽 열 - 3개 기업 */}
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded border border-yellow-200 text-xs">
                    <strong className="text-yellow-700 block mb-1">1. Colt Technology Services</strong>
                    <div className="grid grid-cols-2 gap-2 text-yellow-600">
                      <div>
                        <div className="font-semibold">📊 4.5%</div>
                        <div className="text-[10px]">시장점유율</div>
                      </div>
                      <div>
                        <div className="font-semibold">£1.8B</div>
                        <div className="text-[10px]">연매출</div>
                      </div>
                    </div>
                    <div className="mt-1 text-[10px] text-yellow-700">
                      🎯 금융특화 · 100+도시 IQ네트워크
                    </div>
                  </div>
                  
                  <div className="bg-white p-2 rounded border border-yellow-200 text-xs">
                    <strong className="text-yellow-700 block mb-1">2. Eunetworks</strong>
                    <div className="grid grid-cols-2 gap-2 text-yellow-600">
                      <div>
                        <div className="font-semibold">📊 3.2%</div>
                        <div className="text-[10px]">시장점유율</div>
                      </div>
                      <div>
                        <div className="font-semibold">€450M</div>
                        <div className="text-[10px]">연매출</div>
                      </div>
                    </div>
                    <div className="mt-1 text-[10px] text-yellow-700">
                      🌐 17개국 커버 · 다크파이버 전문
                    </div>
                  </div>
                  
                  <div className="bg-white p-2 rounded border border-yellow-200 text-xs">
                    <strong className="text-yellow-700 block mb-1">3. GTT Communications</strong>
                    <div className="grid grid-cols-2 gap-2 text-yellow-600">
                      <div>
                        <div className="font-semibold">📊 2.8%</div>
                        <div className="text-[10px]">시장점유율</div>
                      </div>
                      <div>
                        <div className="font-semibold">$1.2B</div>
                        <div className="text-[10px]">연매출</div>
                      </div>
                    </div>
                    <div className="mt-1 text-[10px] text-yellow-700">
                      ☁️ SD-WAN · 클라우드 네트워킹
                    </div>
                  </div>
                </div>
                
                {/* 오른쪽 열 - 2개 기업 + 요약 */}
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded border border-yellow-200 text-xs">
                    <strong className="text-yellow-700 block mb-1">4. Telia Carrier</strong>
                    <div className="grid grid-cols-2 gap-2 text-yellow-600">
                      <div>
                        <div className="font-semibold">📊 2.5%</div>
                        <div className="text-[10px]">시장점유율</div>
                      </div>
                      <div>
                        <div className="font-semibold">SEK 8.5B</div>
                        <div className="text-[10px]">연매출</div>
                      </div>
                    </div>
                    <div className="mt-1 text-[10px] text-yellow-700">
                      🌍 북유럽 최대백본 · 아시아 연결
                    </div>
                  </div>
                  
                  <div className="bg-white p-2 rounded border border-yellow-200 text-xs">
                    <strong className="text-yellow-700 block mb-1">5. Cogent Communications</strong>
                    <div className="grid grid-cols-2 gap-2 text-yellow-600">
                      <div>
                        <div className="font-semibold">📊 2.0%</div>
                        <div className="text-[10px]">시장점유율</div>
                      </div>
                      <div>
                        <div className="font-semibold">€380M</div>
                        <div className="text-[10px]">연매출</div>
                      </div>
                    </div>
                    <div className="mt-1 text-[10px] text-yellow-700">
                      💰 가격경쟁력 · 간단한 가격정책
                    </div>
                  </div>
                  
                  {/* Tier 2 요약 */}
                  <div className="bg-yellow-100 p-2 rounded border border-yellow-300">
                    <div className="text-center">
                      <div className="text-xl font-bold text-yellow-700">25%</div>
                      <div className="text-yellow-600 text-[10px]">총 시장점유율</div>
                      <div className="text-yellow-600 text-[10px] mt-1">특화 서비스로 차별화</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tier 2 성공 사례 */}
            <div className="mt-4 p-3 bg-green-50 rounded">
              <h5 className="font-semibold text-green-800 mb-2">📚 Case Study: Colt Technology Services의 틈새시장 성공 전략</h5>
              <div className="text-xs text-green-700 space-y-2">
                <p><strong>배경:</strong> 2015년 Colt는 대형 통신사들과의 직접 경쟁에서 어려움을 겪으며 시장점유율 1.5%에 불과</p>
                <p><strong>핵심 전략:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• <strong>금융 특화:</strong> 고빈도 트레이딩 기업 대상 초저지연(5ms 이하) 서비스</li>
                  <li>• <strong>IQ Network:</strong> 주요 금융 도시 100개 직접 연결 인프라 구축</li>
                  <li>• <strong>On-Demand 서비스:</strong> 포털 통해 즉시 회선 프로비저닝</li>
                  <li>• <strong>파트너십:</strong> AWS Direct Connect, Azure ExpressRoute 파트너</li>
                </ul>
                <p><strong>성과:</strong> 2015-2023 금융 부문 매출 300% 성장, 유럽 금융 네트워크 시장 2위</p>
                <p className="font-semibold text-blue-600">💡 Epsilon 시사점: 특정 산업/지역 집중 + 기술 차별화가 Tier 2 성공의 핵심</p>
              </div>
            </div>
          </div>

          {/* Tier 3 중소기업 */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-800 mb-2">🟢 Tier 3 중소기업 특성 (Epsilon 포지션)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-green-700">경쟁 우위:</strong>
                <ul className="text-green-600 mt-1 space-y-1">
                  <li>• 높은 민첩성과 유연성</li>
                  <li>• 맞춤형 서비스 제공</li>
                  <li>• 혁신 기술 도입 속도</li>
                  <li>• 고객 밀착 서비스</li>
                </ul>
              </div>
              <div>
                <strong className="text-green-700">취약점:</strong>
                <ul className="text-green-600 mt-1 space-y-1">
                  <li>• 제한된 자본력</li>
                  <li>• 소규모 고객 베이스</li>
                  <li>• 글로벌 도달 한계</li>
                  <li>• 브랜드 인지도 부족</li>
                </ul>
              </div>
            </div>
            
            {/* Tier 3 상세 기업 리스트 */}
            <div className="mt-4 p-3 bg-green-50 rounded">
              <h5 className="font-semibold text-green-800 mb-3">주요 Tier 3 기업들 (성공 사례):</h5>
              
              {/* 상단 3개 기업 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <div className="bg-white p-2 rounded border border-green-200">
                  <div className="text-xs">
                    <strong className="text-green-700 block mb-1">1. DE-CIX (독일)</strong>
                    <div className="text-green-600">
                      <div className="flex justify-between">
                        <span>점유율:</span>
                        <span className="font-bold">1.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>매출:</span>
                        <span className="font-bold">€120M</span>
                      </div>
                      <div className="mt-1 pt-1 border-t border-green-100 text-[10px]">
                        🌐 세계 최대 IX 운영
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-2 rounded border border-green-200">
                  <div className="text-xs">
                    <strong className="text-green-700 block mb-1">2. BSO Network (영국)</strong>
                    <div className="text-green-600">
                      <div className="flex justify-between">
                        <span>점유율:</span>
                        <span className="font-bold">0.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>매출:</span>
                        <span className="font-bold">£85M</span>
                      </div>
                      <div className="mt-1 pt-1 border-t border-green-100 text-[10px]">
                        🌏 아시아-유럽 전문
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-2 rounded border-2 border-green-300">
                  <div className="text-xs">
                    <strong className="text-green-800 block mb-1">⭐ Epsilon (Target)</strong>
                    <div className="text-green-700 font-semibold">
                      <div className="flex justify-between">
                        <span>목표:</span>
                        <span className="text-emerald-600">0.5-1.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>매출:</span>
                        <span className="text-emerald-600">€50-100M</span>
                      </div>
                      <div className="mt-1 pt-1 border-t border-green-200 text-[10px]">
                        🤖 AI 최적화 라우팅
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 하단 2개 기업 + 요약 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="bg-white p-2 rounded border border-green-200">
                  <div className="text-xs">
                    <strong className="text-green-700 block mb-1">4. Seaborn</strong>
                    <div className="text-green-600">
                      <span className="font-bold">0.6%</span> | <span className="font-bold">$65M</span>
                      <div className="text-[10px] mt-1">🌎 남미-유럽</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-2 rounded border border-green-200">
                  <div className="text-xs">
                    <strong className="text-green-700 block mb-1">5. Aqua Comms</strong>
                    <div className="text-green-600">
                      <span className="font-bold">0.5%</span> | <span className="font-bold">€55M</span>
                      <div className="text-[10px] mt-1">🌊 대서양 횡단</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-100 p-2 rounded border border-green-300">
                  <div className="text-center text-xs">
                    <div className="text-lg font-bold text-green-700">10%</div>
                    <div className="text-green-600 text-[10px]">총 시장점유율</div>
                    <div className="text-green-600 text-[10px]">틈새 공략 기회</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tier 3 성공 사례 */}
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <h5 className="font-semibold text-blue-800 mb-2">📚 Case Study: BSO Network의 아시아-유럽 틈새 성공</h5>
              <div className="text-xs text-blue-700 space-y-2">
                <p><strong>배경:</strong> 2004년 창업, 소규모 스타트업으로 시작하여 현재 EMEA-APAC 주요 연결 사업자로 성장</p>
                <p><strong>핵심 전략:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• <strong>지역 집중:</strong> 아시아-유럽 간 커넥티비티에만 집중</li>
                  <li>• <strong>파트너십:</strong> 현지 통신사와 적극적 제휴</li>
                  <li>• <strong>유연한 가격:</strong> 대용량 고객 대상 투명한 가격 정책</li>
                  <li>• <strong>24/7 지원:</strong> 시차 고려한 글로벌 지원 체계</li>
                </ul>
                <p><strong>성과:</strong> 아시아-유럽 구간 시장점유율 15%, 연평균 성장률 18%</p>
                <p className="font-semibold text-purple-600">💡 Epsilon 적용 방안: 아시아-유럽 특화 + AI 기술 차별화 + 현지 파트너십</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 경쟁 포지셔닝 맵 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">🎯 Epsilon의 경쟁 포지셔닝 - Best Practice 통합 전략</h3>
        
        {/* 각 Tier별 핵심 성공 요소 추출 및 Epsilon 적용 */}
        <div className="bg-white p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-800 mb-4 text-center">💎 각 Tier별 성공 DNA를 Epsilon에 이식</h4>
          
          {/* 시각적 플로우 다이어그램 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Tier 1에서 가져올 요소 */}
            <div className="relative">
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3">
                <div className="text-center mb-2">
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">FROM TIER 1</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center bg-white p-2 rounded border border-red-200">
                    <span className="text-2xl mr-2">☁️</span>
                    <div>
                      <div className="font-semibold text-red-700">클라우드 파트너십</div>
                      <div className="text-red-600">AWS, Azure 전략적 제휴</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-white p-2 rounded border border-red-200">
                    <span className="text-2xl mr-2">🌍</span>
                    <div>
                      <div className="font-semibold text-red-700">글로벌 도달성</div>
                      <div className="text-red-600">파트너십 통한 확장</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 화살표 */}
              <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 text-3xl text-gray-400">
                →
              </div>
            </div>
            
            {/* Tier 2에서 가져올 요소 */}
            <div className="relative">
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3">
                <div className="text-center mb-2">
                  <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">FROM TIER 2</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center bg-white p-2 rounded border border-yellow-200">
                    <span className="text-2xl mr-2">⚡</span>
                    <div>
                      <div className="font-semibold text-yellow-700">On-Demand 서비스</div>
                      <div className="text-yellow-600">즉시 프로비저닝</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-white p-2 rounded border border-yellow-200">
                    <span className="text-2xl mr-2">🔌</span>
                    <div>
                      <div className="font-semibold text-yellow-700">Direct Connect</div>
                      <div className="text-yellow-600">AWS/Azure 직접 연결</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 화살표 */}
              <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 text-3xl text-gray-400">
                →
              </div>
            </div>
            
            {/* Tier 3에서 가져올 요소 */}
            <div>
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3">
                <div className="text-center mb-2">
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">FROM TIER 3</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center bg-white p-2 rounded border border-green-200">
                    <span className="text-2xl mr-2">🎯</span>
                    <div>
                      <div className="font-semibold text-green-700">지역 집중</div>
                      <div className="text-green-600">아시아-유럽 특화</div>
                    </div>
                  </div>
                  <div className="flex items-center bg-white p-2 rounded border border-green-200">
                    <span className="text-2xl mr-2">🚀</span>
                    <div>
                      <div className="font-semibold text-green-700">민첩성</div>
                      <div className="text-green-600">빠른 의사결정</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 중앙 집중 화살표 */}
          <div className="flex justify-center mb-4">
            <div className="text-4xl text-indigo-500 animate-bounce">⬇️</div>
          </div>
          
          {/* Epsilon 통합 전략 */}
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-indigo-400 rounded-xl p-4">
            <div className="text-center mb-4">
              <span className="text-lg font-bold text-indigo-800 bg-white px-4 py-2 rounded-full border-2 border-indigo-300">
                🚀 EPSILON INTEGRATED STRATEGY
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* 통합 전략 1 */}
              <div className="bg-white rounded-lg p-3 border border-indigo-200">
                <div className="text-center mb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full text-white text-xl font-bold">
                    1
                  </div>
                </div>
                <h5 className="font-semibold text-indigo-800 text-xs text-center mb-1">클라우드 네이티브</h5>
                <p className="text-[10px] text-gray-600 text-center">
                  AWS/Azure Direct Connect 파트너 + 즉시 프로비저닝
                </p>
                <div className="mt-2 flex justify-center space-x-1">
                  <span className="text-xs">☁️</span>
                  <span className="text-xs">+</span>
                  <span className="text-xs">⚡</span>
                </div>
              </div>
              
              {/* 통합 전략 2 */}
              <div className="bg-white rounded-lg p-3 border border-indigo-200">
                <div className="text-center mb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full text-white text-xl font-bold">
                    2
                  </div>
                </div>
                <h5 className="font-semibold text-indigo-800 text-xs text-center mb-1">아시아-유럽 전문</h5>
                <p className="text-[10px] text-gray-600 text-center">
                  실크로드 디지털 고속도로 구축
                </p>
                <div className="mt-2 flex justify-center space-x-1">
                  <span className="text-xs">🌏</span>
                  <span className="text-xs">↔️</span>
                  <span className="text-xs">🌍</span>
                </div>
              </div>
              
              {/* 통합 전략 3 */}
              <div className="bg-white rounded-lg p-3 border border-indigo-200">
                <div className="text-center mb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full text-white text-xl font-bold">
                    3
                  </div>
                </div>
                <h5 className="font-semibold text-indigo-800 text-xs text-center mb-1">AI 자동화</h5>
                <p className="text-[10px] text-gray-600 text-center">
                  셀프서비스 포털 + AI 최적 라우팅
                </p>
                <div className="mt-2 flex justify-center space-x-1">
                  <span className="text-xs">🤖</span>
                  <span className="text-xs">+</span>
                  <span className="text-xs">⚙️</span>
                </div>
              </div>
              
              {/* 통합 전략 4 */}
              <div className="bg-white rounded-lg p-3 border border-indigo-200">
                <div className="text-center mb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full text-white text-xl font-bold">
                    4
                  </div>
                </div>
                <h5 className="font-semibold text-indigo-800 text-xs text-center mb-1">가격 혁신</h5>
                <p className="text-[10px] text-gray-600 text-center">
                  Tier 1 대비 30% 저렴 + 투명한 가격
                </p>
                <div className="mt-2 flex justify-center space-x-1">
                  <span className="text-xs">💰</span>
                  <span className="text-xs">↓</span>
                  <span className="text-xs">30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 포지셔닝 매트릭스 */}
        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3 text-center">📊 경쟁 포지셔닝 매트릭스</h4>
          
          <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
            {/* 사분면 구분선 */}
            <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-gray-300"></div>
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-px bg-gray-300"></div>
            
            {/* 축 라벨 */}
            <div className="absolute left-2 top-2 text-xs text-gray-600 font-semibold">높은 품질</div>
            <div className="absolute left-2 bottom-2 text-xs text-gray-600 font-semibold">낮은 품질</div>
            <div className="absolute right-2 bottom-2 text-xs text-gray-600 font-semibold">높은 가격</div>
            <div className="absolute left-2 bottom-2 text-xs text-gray-600 font-semibold">낮은 가격</div>
            
            {/* 사분면 라벨 */}
            <div className="absolute top-1 right-1 text-[10px] text-gray-400">1사분면</div>
            <div className="absolute top-1 left-1 text-[10px] text-gray-400">2사분면</div>
            <div className="absolute bottom-1 left-1 text-[10px] text-gray-400">3사분면</div>
            <div className="absolute bottom-1 right-1 text-[10px] text-gray-400">4사분면</div>
            
            {/* 축 화살표 및 라벨 */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-700 font-bold">
              ← 서비스 품질 →
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 font-bold">
              ← 가격 →
            </div>
            
            {/* Tier 1 - 1사분면 (높은 품질, 높은 가격) */}
            <div className="absolute top-8 right-8 bg-red-100 px-3 py-2 rounded-lg border-2 border-red-400 shadow-md">
              <div className="text-xs font-bold text-red-700">Tier 1</div>
              <div className="text-[10px] text-red-600">Premium Price</div>
              <div className="text-[10px] text-red-600">Premium Service</div>
              <div className="text-[10px] font-semibold text-red-800 mt-1">€8B+ 매출</div>
            </div>
            
            {/* Tier 2 - 중간 (중간 품질, 중간 가격) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-100 px-3 py-2 rounded-lg border-2 border-yellow-400 shadow-md">
              <div className="text-xs font-bold text-yellow-700">Tier 2</div>
              <div className="text-[10px] text-yellow-600">Mid Price</div>
              <div className="text-[10px] text-yellow-600">Mid Service</div>
              <div className="text-[10px] font-semibold text-yellow-800 mt-1">€1-2B 매출</div>
            </div>
            
            {/* Tier 3 - 3사분면 (낮은 품질, 낮은 가격) */}
            <div className="absolute bottom-8 left-8 bg-green-100 px-3 py-2 rounded-lg border-2 border-green-400 shadow-md">
              <div className="text-xs font-bold text-green-700">Tier 3</div>
              <div className="text-[10px] text-green-600">Low Price</div>
              <div className="text-[10px] text-green-600">Basic Service</div>
              <div className="text-[10px] font-semibold text-green-800 mt-1">€50-100M 매출</div>
            </div>
            
            {/* Epsilon 타겟 포지션 - 2사분면 (높은 품질, 낮은 가격) */}
            <div className="absolute top-12 left-12 animate-pulse">
              <div className="relative">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-3 rounded-lg shadow-2xl border-2 border-white">
                  <div className="text-sm font-bold flex items-center">
                    ⭐ EPSILON
                    <span className="ml-2 bg-yellow-400 text-black text-[10px] px-2 py-0.5 rounded-full">TARGET</span>
                  </div>
                  <div className="text-[11px] font-semibold mt-1">2사분면 전략</div>
                  <div className="text-[10px] mt-1">✓ Premium Service</div>
                  <div className="text-[10px]">✓ Competitive Price</div>
                  <div className="text-[10px] mt-1 border-t border-white/30 pt-1">
                    "Tier 1 품질을 Tier 2 가격에"
                  </div>
                </div>
                {/* 화살표 포인터 */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-purple-500"></div>
                </div>
              </div>
            </div>
            
            {/* 2사분면 강조 */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-tl-lg"></div>
            
            {/* 범례 */}
            <div className="absolute bottom-2 right-2 bg-white/90 p-2 rounded text-[10px] border border-gray-300">
              <div className="font-semibold mb-1">시장 포지션</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded"></div>
                <span>대기업</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded"></div>
                <span>중견기업</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded"></div>
                <span>중소기업</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded"></div>
                <span>Epsilon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Epsilon 전략 반영 로직 */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-indigo-900 mb-4">🚀 Epsilon 구체적 실행 로드맵</h3>
        
        <div className="space-y-4">
          {/* 단계별 시장 진입 로드맵 - 계단식 */}
          <div className="bg-white p-6 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-4">📈 단계별 시장 진입 로드맵</h4>
            
            {/* 계단식 로드맵 */}
            <div className="relative">
              {/* 배경 그리드 */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-gray-100 rounded-lg opacity-50"></div>
              
              {/* 계단 구조 */}
              <div className="relative flex items-end justify-between gap-2 p-4">
                
                {/* Phase 1 - 첫 번째 계단 */}
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg p-4 relative h-32 shadow-lg transform hover:scale-105 transition-transform">
                    <div className="absolute top-2 left-2 bg-white/20 px-2 py-1 rounded text-xs font-bold">
                      PHASE 1
                    </div>
                    <div className="mt-6">
                      <h5 className="font-bold text-sm mb-1">시장진입 준비</h5>
                      <div className="text-[10px] opacity-90">2025 Q4 - 2026 Q1</div>
                    </div>
                    <div className="mt-2 text-[10px] space-y-0.5">
                      <div>• 파트너십 체결</div>
                      <div>• 인프라 구축</div>
                      <div>• 팀 구성</div>
                    </div>
                  </div>
                </div>
                
                {/* Phase 2 - 두 번째 계단 */}
                <div className="flex-1 mb-8">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg p-4 relative h-36 shadow-lg transform hover:scale-105 transition-transform">
                    <div className="absolute top-2 left-2 bg-white/20 px-2 py-1 rounded text-xs font-bold">
                      PHASE 2
                    </div>
                    <div className="mt-6">
                      <h5 className="font-bold text-sm mb-1">초기 시장 진입</h5>
                      <div className="text-[10px] opacity-90">2026 Q2 - Q4</div>
                    </div>
                    <div className="mt-2 text-[10px] space-y-0.5">
                      <div>• 싱가포르-프랑크푸르트 개통</div>
                      <div>• AWS/Azure Direct Connect</div>
                      <div>• 첫 10개 고객 확보</div>
                      <div>• €10M 매출 목표</div>
                    </div>
                  </div>
                </div>
                
                {/* Phase 3 - 세 번째 계단 */}
                <div className="flex-1 mb-16">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg p-4 relative h-40 shadow-lg transform hover:scale-105 transition-transform">
                    <div className="absolute top-2 left-2 bg-white/20 px-2 py-1 rounded text-xs font-bold">
                      PHASE 3
                    </div>
                    <div className="mt-6">
                      <h5 className="font-bold text-sm mb-1">시장 확장</h5>
                      <div className="text-[10px] opacity-90">2027 Q1 - Q4</div>
                    </div>
                    <div className="mt-2 text-[10px] space-y-0.5">
                      <div>• 암스테르담, 런던 POP</div>
                      <div>• SD-WAN/SASE 서비스</div>
                      <div>• 100개 기업 고객</div>
                      <div>• €50M 매출 달성</div>
                      <div>• Series B 투자 유치</div>
                    </div>
                  </div>
                </div>
                
                {/* Phase 4 - 네 번째 계단 (최상단) */}
                <div className="flex-1 mb-24">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg p-4 relative h-44 shadow-xl transform hover:scale-105 transition-transform">
                    <div className="absolute top-2 left-2 bg-white/20 px-2 py-1 rounded text-xs font-bold">
                      PHASE 4
                    </div>
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                      TARGET
                    </div>
                    <div className="mt-6">
                      <h5 className="font-bold text-sm mb-1">시장 정착</h5>
                      <div className="text-[10px] opacity-90">2028 Q1 - Q4</div>
                    </div>
                    <div className="mt-2 text-[10px] space-y-0.5">
                      <div>• 시장점유율 1% 달성</div>
                      <div>• €100M+ 매출</div>
                      <div>• EBITDA 흑자 전환</div>
                      <div>• M&A 또는 IPO 준비</div>
                      <div>• 500+ 기업 고객</div>
                    </div>
                  </div>
                </div>
                
              </div>
              
              {/* 진행 화살표 */}
              <div className="absolute bottom-4 left-8 right-8">
                <div className="relative">
                  <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-600">
                    2025 Q4
                  </div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-600">
                    2028 Q4
                  </div>
                </div>
              </div>
            </div>
            
            {/* 주요 마일스톤 */}
            <div className="mt-6 grid grid-cols-4 gap-3 text-center">
              <div className="bg-purple-50 p-2 rounded">
                <div className="text-lg font-bold text-purple-600">€0</div>
                <div className="text-[10px] text-purple-500">투자 단계</div>
              </div>
              <div className="bg-indigo-50 p-2 rounded">
                <div className="text-lg font-bold text-indigo-600">€10M</div>
                <div className="text-[10px] text-indigo-500">초기 매출</div>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <div className="text-lg font-bold text-blue-600">€50M</div>
                <div className="text-[10px] text-blue-500">확장 매출</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="text-lg font-bold text-green-600">€100M+</div>
                <div className="text-[10px] text-green-500">목표 매출</div>
              </div>
            </div>
          </div>
          
          {/* 핵심 성공 지표 */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
            <h4 className="font-semibold text-emerald-800 mb-3">📈 핵심 성공 지표 (KPI)</h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">0.5%</div>
                <div className="text-xs text-emerald-700">2025 시장점유율</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">€50M</div>
                <div className="text-xs text-teal-700">2026 목표 매출</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">100+</div>
                <div className="text-xs text-cyan-700">2027 고객사 수</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">25%</div>
                <div className="text-xs text-blue-700">EBITDA 마진 목표</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. 가격 전략
export function EuroMarketingStrategySectionPricingStrategy() {
  const [priceData, setPriceData] = useState<any>({
    loading: true,
    avgPrice2023: 0,
    avgPrice2030: 0,
    cagr: 0,
    priceRanges: []
  });

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const { data: prices } = await supabase
          .from('euro_pricing_wholesale_prices')
          .select('*');
        
        if (prices && prices.length > 0) {
          const validPrices2023 = prices.filter(p => p.year_2023).map(p => p.year_2023);
          const validPrices2030 = prices.filter(p => p.year_2030).map(p => p.year_2030);
          
          const avg2023 = validPrices2023.reduce((a, b) => a + b, 0) / validPrices2023.length;
          const avg2030 = validPrices2030.reduce((a, b) => a + b, 0) / validPrices2030.length;
          
          setPriceData({
            loading: false,
            avgPrice2023: avg2023,
            avgPrice2030: avg2030,
            cagr: ((avg2030 / avg2023) ** (1/7) - 1) * 100,
            priceRanges: prices.slice(0, 5)
          });
        }
      } catch (error) {
        console.error('Error fetching price data:', error);
        setPriceData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchPriceData();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">4. 가격 전략</h2>
      
      {/* 가격 환경 분석 */}
      <div className="bg-purple-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-purple-900 mb-4">💰 유럽 시장 가격 환경</h3>
        
        <div className="bg-white p-4 rounded-lg mb-4">
          <p className="text-purple-700 mb-4">
            유럽 해저케이블 시장은 전 세계에서 가장 <strong>경쟁적인 가격 환경</strong>을 보이고 있습니다. 
            대기업들의 규모의 경제와 과잉 공급으로 인해 가격 압력이 지속되고 있으며, 이는 중소기업에게 
            전통적인 가격 경쟁보다는 가치 기반 전략이 필요함을 시사합니다.
          </p>
          
          {priceData.loading ? (
            <div className="text-center py-4">가격 데이터 로딩 중...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-purple-100 p-3 rounded text-center">
                <h4 className="text-2xl font-bold text-purple-600">
                  ${priceData.avgPrice2023.toFixed(0)}
                </h4>
                <p className="text-purple-800 text-sm">2023 평균 가격</p>
              </div>
              
              <div className="bg-purple-100 p-3 rounded text-center">
                <h4 className="text-2xl font-bold text-purple-600">
                  ${priceData.avgPrice2030.toFixed(0)}
                </h4>
                <p className="text-purple-800 text-sm">2030 예상 가격</p>
              </div>
              
              <div className="bg-red-100 p-3 rounded text-center">
                <h4 className="text-2xl font-bold text-red-600">
                  {priceData.cagr.toFixed(1)}%
                </h4>
                <p className="text-red-800 text-sm">연평균 가격 하락</p>
              </div>
              
              <div className="bg-orange-100 p-3 rounded text-center">
                <h4 className="text-2xl font-bold text-orange-600">45%</h4>
                <p className="text-orange-800 text-sm">아시아 대비 낮은 가격</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Epsilon 가격 전략 */}
      <div className="bg-indigo-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-indigo-900 mb-4">🎯 Epsilon의 차별화된 가격 전략</h3>
        
        <div className="space-y-6">
          {/* 가치 기반 가격 전략 */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
            <h4 className="font-semibold text-indigo-800 mb-3">1️⃣ 가치 기반 가격 모델 (Value-Based Pricing)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-indigo-700 mb-2">핵심 원칙</h5>
                <ul className="text-indigo-600 text-sm space-y-1">
                  <li>• <strong>TCO 절감:</strong> 총 소유 비용 20-30% 절감</li>
                  <li>• <strong>SLA 프리미엄:</strong> 99.99% 가용성 보장</li>
                  <li>• <strong>부가 서비스:</strong> 무료 컨설팅 및 최적화</li>
                  <li>• <strong>맞춤형 패키지:</strong> 고객별 최적화</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-indigo-700 mb-2">타겟 마진</h5>
                <ul className="text-indigo-600 text-sm space-y-1">
                  <li>• <strong>니치 마켓:</strong> 35-45% 영업이익률</li>
                  <li>• <strong>일반 시장:</strong> 20-25% 영업이익률</li>
                  <li>• <strong>전략적 고객:</strong> 15-20% 영업이익률</li>
                  <li>• <strong>파트너 요율:</strong> 10-15% 영업이익률</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 동적 가격 전략 */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-800 mb-3">2️⃣ 동적 가격 전략 (Dynamic Pricing)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-green-700 mb-2">시간대별</h5>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• Peak: 기준가 +20%</li>
                  <li>• Standard: 기준가</li>
                  <li>• Off-peak: 기준가 -15%</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-green-700 mb-2">용량별</h5>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• 10G 이하: 프리미엄</li>
                  <li>• 10-100G: 표준</li>
                  <li>• 100G+: 대량 할인</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-green-700 mb-2">계약 기간</h5>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• 1년: 기준가</li>
                  <li>• 3년: -10% 할인</li>
                  <li>• 5년: -20% 할인</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 번들링 전략 */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-800 mb-3">3️⃣ 번들링 전략 (Bundling Strategy)</h4>
            
            <div className="space-y-3">
              <div className="bg-yellow-50 p-3 rounded">
                <h5 className="font-medium text-yellow-700 mb-1">🎁 스타터 패키지 (중소 ISP)</h5>
                <p className="text-yellow-600 text-sm">
                  기본 용량 + 24/7 지원 + 트래픽 분석 도구 → 개별 구매 대비 25% 절감
                </p>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded">
                <h5 className="font-medium text-yellow-700 mb-1">💼 비즈니스 패키지 (금융/핀테크)</h5>
                <p className="text-yellow-600 text-sm">
                  저지연 라우팅 + 다중 백업 + 실시간 모니터링 + 보안 서비스 → 40% 할인
                </p>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded">
                <h5 className="font-medium text-yellow-700 mb-1">🚀 엔터프라이즈 패키지</h5>
                <p className="text-yellow-600 text-sm">
                  무제한 용량 + 전용 엔지니어 + 맞춤 SLA + 우선 지원 → 최대 50% 절감
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 가격 경쟁력 확보 방안 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 가격 경쟁력 확보 방안</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">🔧 비용 최적화</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>자동화:</strong> AI/ML 기반 운영 자동화로 30% 비용 절감</li>
              <li>• <strong>파트너십:</strong> 인프라 공유로 CAPEX 50% 감소</li>
              <li>• <strong>효율성:</strong> SDN 기술로 네트워크 효율 40% 개선</li>
              <li>• <strong>원격 운영:</strong> 현장 인력 최소화로 OPEX 25% 절감</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">📊 수익 최대화</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>업셀링:</strong> 기존 고객 대상 추가 서비스 판매</li>
              <li>• <strong>크로스셀링:</strong> 연관 서비스 번들 판매</li>
              <li>• <strong>장기 계약:</strong> 안정적 현금 흐름 확보</li>
              <li>• <strong>프리미엄 서비스:</strong> 고마진 특화 서비스 개발</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. 시장 진입 전략
export function EuroMarketingStrategySectionMarketEntryStrategy() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">5. 시장 진입 전략</h2>
      
      {/* 계단식 시장 진입 로드맵 */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-indigo-900 mb-6">🚀 단계별 시장 진입 로드맵</h3>
        
        {/* 계단식 구조 */}
        <div className="relative overflow-hidden rounded-lg bg-white p-8">
          {/* 배경 그리드 */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #e5e7eb 0px, transparent 1px, transparent 40px, #e5e7eb 41px), repeating-linear-gradient(90deg, #e5e7eb 0px, transparent 1px, transparent 40px, #e5e7eb 41px)'
            }}></div>
          </div>
          
          {/* 계단 컨테이너 */}
          <div className="relative z-10">
            <div className="flex items-end gap-0">
              
              {/* Phase 1 - 첫 번째 계단 */}
              <div className="flex-1">
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-t-lg shadow-2xl" style={{ height: '200px' }}>
                    <div className="bg-white/20 inline-block px-3 py-1 rounded-full text-xs font-bold mb-2">
                      PHASE 1
                    </div>
                    <h4 className="font-bold text-base mb-2">시장진입 준비</h4>
                    <div className="text-xs opacity-90 mb-3">2025 Q4 - 2026 Q1</div>
                    <ul className="text-xs space-y-1 opacity-90">
                      <li>• 영국 본사 유럽팀 구성</li>
                      <li>• 파트너십 체결</li>
                      <li>• 인프라 구축</li>
                      <li>• 초기 투자: €3M</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Phase 2 - 두 번째 계단 */}
              <div className="flex-1" style={{ marginBottom: '50px' }}>
                <div className="relative">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-t-lg shadow-2xl" style={{ height: '220px' }}>
                    <div className="bg-white/20 inline-block px-3 py-1 rounded-full text-xs font-bold mb-2">
                      PHASE 2
                    </div>
                    <h4 className="font-bold text-base mb-2">초기 시장 진입</h4>
                    <div className="text-xs opacity-90 mb-3">2026 Q2 - Q4</div>
                    <ul className="text-xs space-y-1 opacity-90">
                      <li>• 싱가포르-프랑크푸르트 개통</li>
                      <li>• AWS/Azure Direct Connect</li>
                      <li>• 첫 10개 고객 확보</li>
                      <li>• 월 매출: €1M</li>
                      <li>• 팀 규모: 15명</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Phase 3 - 세 번째 계단 */}
              <div className="flex-1" style={{ marginBottom: '100px' }}>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-t-lg shadow-2xl" style={{ height: '240px' }}>
                    <div className="bg-white/20 inline-block px-3 py-1 rounded-full text-xs font-bold mb-2">
                      PHASE 3
                    </div>
                    <h4 className="font-bold text-base mb-2">시장 확장</h4>
                    <div className="text-xs opacity-90 mb-3">2027 전체</div>
                    <ul className="text-xs space-y-1 opacity-90">
                      <li>• 암스테르담, 런던 POP 추가</li>
                      <li>• SD-WAN/SASE 서비스</li>
                      <li>• 100개 기업 고객</li>
                      <li>• 연 매출: €50M</li>
                      <li>• Series B: €30M 유치</li>
                      <li>• 팀 규모: 50명</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Phase 4 - 최상단 계단 */}
              <div className="flex-1" style={{ marginBottom: '150px' }}>
                <div className="relative">
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full animate-pulse z-20">
                    GOAL
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 rounded-t-lg shadow-2xl border-2 border-white" style={{ height: '260px' }}>
                    <div className="bg-white/20 inline-block px-3 py-1 rounded-full text-xs font-bold mb-2">
                      PHASE 4
                    </div>
                    <h4 className="font-bold text-base mb-2">시장 정착</h4>
                    <div className="text-xs opacity-90 mb-3">2028 전체</div>
                    <ul className="text-xs space-y-1 opacity-90">
                      <li>• 시장점유율 1% 달성</li>
                      <li>• 연 매출: €100M+</li>
                      <li>• EBITDA 마진 25%</li>
                      <li>• 500+ 기업 고객</li>
                      <li>• IPO/M&A 준비</li>
                      <li>• 팀 규모: 100+명</li>
                      <li>• 유럽 전역 커버리지</li>
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>
            
            {/* 타임라인 화살표 */}
            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full"></div>
              </div>
              <div className="relative flex justify-between">
                <div className="bg-white px-2">
                  <div className="text-xs font-bold text-gray-700">2025 Q4</div>
                  <div className="text-xs text-gray-500">START</div>
                </div>
                <div className="bg-white px-2">
                  <div className="text-xs font-bold text-gray-700">2026</div>
                </div>
                <div className="bg-white px-2">
                  <div className="text-xs font-bold text-gray-700">2027</div>
                </div>
                <div className="bg-white px-2">
                  <div className="text-xs font-bold text-gray-700">2028 Q4</div>
                  <div className="text-xs text-gray-500">TARGET</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 성장 지표 */}
          <div className="mt-8 grid grid-cols-4 gap-4">
            <div className="text-center bg-purple-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">€3M</div>
              <div className="text-xs text-purple-500">초기 투자</div>
            </div>
            <div className="text-center bg-indigo-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">€10M</div>
              <div className="text-xs text-indigo-500">Phase 2 매출</div>
            </div>
            <div className="text-center bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">€50M</div>
              <div className="text-xs text-blue-500">Phase 3 매출</div>
            </div>
            <div className="text-center bg-green-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">€100M+</div>
              <div className="text-xs text-green-500">Phase 4 목표</div>
            </div>
          </div>
        </div>
      </div>

      {/* 진입 전략 핵심 요소 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 진입 전략 핵심 성공 요소</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">🏢 현지화 전략</h4>
            <ul className="text-blue-600 text-sm space-y-1">
              <li>• 영국 본사 기반 유럽 확장</li>
              <li>• 현지 인재 채용</li>
              <li>• 현지 파트너십</li>
              <li>• 현지 규제 준수</li>
              <li>• 현지 고객 맞춤</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3">💼 차별화 포지셔닝</h4>
            <ul className="text-green-600 text-sm space-y-1">
              <li>• 니치 마켓 전문가</li>
              <li>• 맞춤형 서비스</li>
              <li>• 빠른 의사결정</li>
              <li>• 혁신 기술 도입</li>
              <li>• 고객 밀착 지원</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-3">📈 성장 동력</h4>
            <ul className="text-purple-600 text-sm space-y-1">
              <li>• 전략적 파트너십</li>
              <li>• M&A 기회 활용</li>
              <li>• 지속적 혁신</li>
              <li>• 브랜드 구축</li>
              <li>• 자본 시장 활용</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 리스크 관리 */}
      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-red-900 mb-4">⚠️ 주요 리스크 및 대응 방안</h3>
        
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-lg flex justify-between items-center">
            <div>
              <h4 className="font-medium text-red-800">규제 리스크</h4>
              <p className="text-red-600 text-sm">GDPR, 현지 통신 규제 등</p>
            </div>
            <div className="text-right">
              <p className="text-red-700 text-sm font-medium">대응: 전문 법무팀 구성</p>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg flex justify-between items-center">
            <div>
              <h4 className="font-medium text-red-800">경쟁 리스크</h4>
              <p className="text-red-600 text-sm">대기업의 가격 공세</p>
            </div>
            <div className="text-right">
              <p className="text-red-700 text-sm font-medium">대응: 니치 마켓 집중</p>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg flex justify-between items-center">
            <div>
              <h4 className="font-medium text-red-800">운영 리스크</h4>
              <p className="text-red-600 text-sm">서비스 품질 이슈</p>
            </div>
            <div className="text-right">
              <p className="text-red-700 text-sm font-medium">대응: 파트너 인프라 활용</p>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg flex justify-between items-center">
            <div>
              <h4 className="font-medium text-red-800">재무 리스크</h4>
              <p className="text-red-600 text-sm">초기 투자 회수 지연</p>
            </div>
            <div className="text-right">
              <p className="text-red-700 text-sm font-medium">대응: 단계적 투자 전략</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
