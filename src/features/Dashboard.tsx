import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { NavigationHub } from './NavigationHub';
import { RFQAnalysis } from './RFQAnalysis';
import { SOFAnalysis } from './SOFAnalysis';
import { KOTRAAnalysis } from './KOTRAAnalysis';
import { ComprehensiveInvestmentReport } from './InvestmentStrategyReport/ComprehensiveInvestmentReport';
import { NewYorkDiscountReport } from './NewYorkDiscountReport/NewYorkDiscountReport';
import { nyDiscountToc } from './NewYorkDiscountReport/NYDiscountTocData';
import { EpsilonFactbook, toc as factbookToc } from './EpsilonFactbook/EpsilonFactbook';
import { BusinessFeasibilityReport } from './MarketingReport/BusinessFeasibilityReport';
import { businessFeasibilityToc } from './MarketingReport/BusinessFeasibilityTocData';
import { investmentStrategyToc } from './InvestmentStrategyReport/InvestmentStrategyTocData';
import { SynergySales, toc as synergySalesToc } from './SynergySales/SynergySales';
import { EuroMarketingStrategy } from './EuroMarketingStrategy/EuroMarketingStrategy';
import { euroMarketingStrategyToc } from './EuroMarketingStrategy/EuroMarketingStrategyTocData';
import { Home, ArrowLeft } from 'lucide-react';

type MenuType =
  | 'RFQ'
  | 'SOF'
  | 'KOTRA'
  | 'EPSILON_POPS'
  | 'INVEST_REPORT'
  | 'MARKETING_REPORT'
  | 'NY_DISCOUNT_REPORT'
  | 'EPSILON_FACTBOOK'
  | 'SYNERGY_SALES'
  | 'EURO_MARKETING_STRATEGY';

// URL parameter to MenuType mapping
const viewToMenuType: Record<string, MenuType> = {
  'rfq': 'RFQ',
  'sof': 'SOF',
  'kotra': 'KOTRA',
  'epsilon-pop': 'EPSILON_POPS',
  'investment': 'INVEST_REPORT',
  'business': 'MARKETING_REPORT',
  'ny-discount': 'NY_DISCOUNT_REPORT',
  'factbook': 'EPSILON_FACTBOOK',
  'synergy': 'SYNERGY_SALES',
  'euro-marketing': 'EURO_MARKETING_STRATEGY'
};

export function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const view = searchParams.get('view');
  const [showHub, setShowHub] = useState(!view);
  
  // Set initial menu based on URL parameter
  const initialMenu = view && viewToMenuType[view] ? viewToMenuType[view] : 'RFQ';
  const [selectedMenu, setSelectedMenu] = useState<MenuType>(initialMenu);
  
  // Update selected menu when URL parameter changes
  useEffect(() => {
    if (view && viewToMenuType[view]) {
      setSelectedMenu(viewToMenuType[view]);
      setShowHub(false);
    } else {
      setShowHub(true);
    }
  }, [view]);
  // Factbook 상태
  const [factbookOpen, setFactbookOpen] = useState(true);
  const [factbookSection, setFactbookSection] = useState('company');
  const [factbookViewMode, setFactbookViewMode] = useState<'section' | 'all'>('section');
  // 뉴욕법인 할인율 보고서 상태
  const [nyDiscountOpen, setNyDiscountOpen] = useState(true);
  const [nyDiscountSection, setNyDiscountSection] = useState('intro');
  const [nyDiscountViewMode, setNyDiscountViewMode] = useState<'section' | 'all'>('section');
  // 사업성 분석 보고서 상태
  const [businessFeasibilityOpen, setBusinessFeasibilityOpen] = useState(true);
  const [businessFeasibilitySection, setBusinessFeasibilitySection] = useState('overview');
  const [businessFeasibilityViewMode, setBusinessFeasibilityViewMode] = useState<'section' | 'all'>('section');
  const [investmentStrategyOpen, setInvestmentStrategyOpen] = useState(true);
  const [investmentStrategySection, setInvestmentStrategySection] = useState('preprocessing');
  const [investmentStrategyViewMode, setInvestmentStrategyViewMode] = useState<'section' | 'all'>('section');
  // 시너지 매출 보고서 상태
  const [synergySalesOpen, setSynergySalesOpen] = useState(true);
  const [synergySalesSection, setSynergySalesSection] = useState('overview');
  const [synergySalesViewMode, setSynergySalesViewMode] = useState<'section' | 'all' | 'dashboard'>('dashboard');
  // 유럽 마케팅 전략 보고서 상태
  const [euroMarketingStrategyOpen, setEuroMarketingStrategyOpen] = useState(true);
  const [euroMarketingStrategySection, setEuroMarketingStrategySection] = useState('executive-summary');
  const [euroMarketingStrategyViewMode, setEuroMarketingStrategyViewMode] = useState<'section' | 'all'>('section');
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'RFQ':
        return <RFQAnalysis />;
      case 'SOF':
        return <SOFAnalysis />;
      case 'KOTRA':
        return <KOTRAAnalysis />;
      case 'EPSILON_POPS':
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <h3 className="text-yellow-800 font-medium">Epsilon PoP 현황</h3>
            <p className="text-yellow-600 text-sm mt-1">페이지 준비중입니다.</p>
          </div>
        );
      case 'INVEST_REPORT':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setInvestmentStrategyViewMode(v => v === 'all' ? 'section' : 'all')}
                className="px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 border border-blue-300"
              >
                {investmentStrategyViewMode === 'all' ? '목차별 보기' : '전체 보기'}
              </button>
            </div>
            <ComprehensiveInvestmentReport
              sectionId={investmentStrategySection}
              viewMode={investmentStrategyViewMode}
            />
          </>
        );
      case 'MARKETING_REPORT':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setBusinessFeasibilityViewMode(v => v === 'all' ? 'section' : 'all')}
                className="px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 border border-blue-300"
              >
                {businessFeasibilityViewMode === 'all' ? '목차별 보기' : '전체 보기'}
              </button>
            </div>
            <BusinessFeasibilityReport
              sectionId={businessFeasibilitySection}
              viewMode={businessFeasibilityViewMode}
            />
          </>
        );
      case 'NY_DISCOUNT_REPORT':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setNyDiscountViewMode(v => v === 'all' ? 'section' : 'all')}
                className="px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 border border-blue-300"
              >
                {nyDiscountViewMode === 'all' ? '목차별 보기' : '전체 보기'}
              </button>
            </div>
            <NewYorkDiscountReport sectionId={nyDiscountSection} viewMode={nyDiscountViewMode} />
          </>
        );
      case 'EPSILON_FACTBOOK':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setFactbookViewMode(v => v === 'all' ? 'section' : 'all')}
                className="px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 border border-blue-300"
              >
                {factbookViewMode === 'all' ? '목차별 보기' : '전체 보기'}
              </button>
            </div>
            <EpsilonFactbook sectionId={factbookSection} viewMode={factbookViewMode} />
          </>
        );
      case 'SYNERGY_SALES':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setSynergySalesViewMode(v => {
                  if (v === 'dashboard') return 'section';
                  if (v === 'section') return 'all';
                  return 'dashboard';
                })}
                className="px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 border border-blue-300"
              >
                {synergySalesViewMode === 'dashboard' ? '목차별 보기' : 
                 synergySalesViewMode === 'section' ? '전체 보기' : '대시보드'}
              </button>
            </div>
            <SynergySales sectionId={synergySalesSection} viewMode={synergySalesViewMode} />
          </>
        );
      case 'EURO_MARKETING_STRATEGY':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setEuroMarketingStrategyViewMode(v => v === 'all' ? 'section' : 'all')}
                className="px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 border border-blue-300"
              >
                {euroMarketingStrategyViewMode === 'all' ? '목차별 보기' : '전체 보기'}
              </button>
            </div>
            <EuroMarketingStrategy
              sectionId={euroMarketingStrategySection}
              viewMode={euroMarketingStrategyViewMode}
            />
          </>
        );
      default:
        return <RFQAnalysis />;
    }
  };

  // If no view parameter, show NavigationHub content
  if (showHub) {
    return <NavigationHub />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-800 shadow-lg border-b border-slate-700">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center pl-4 space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 hover:text-white rounded-lg transition-all border border-slate-600"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm">Hub</span>
            </button>
            <h1 className="text-xl font-light text-white tracking-wider">EPSILON ANALYTICS</h1>
          </div>
          {/* 사용자 정보 및 로그아웃 */}
          <div className="flex items-center space-x-4 mr-4">
            <div className="text-sm text-gray-400">
              <span>{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* 사이드바 */}
      <aside className="w-80 bg-slate-700 text-gray-200 flex flex-col fixed left-0 top-16 h-full overflow-y-auto border-r border-slate-600">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* 데이터 분석 */}
          <div className="text-gray-500 text-xs mb-2 uppercase tracking-wider">Data Analysis</div>
          <ul className="space-y-1 mb-6">
            <li
              className={`rounded-lg px-3 py-2 transition-all ${selectedMenu === 'RFQ' ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' : 'hover:bg-slate-600 cursor-pointer'}`}
              onClick={() => setSelectedMenu('RFQ')}
            >
              RFQ 분석
            </li>
            <li
              className={`rounded-lg px-3 py-2 transition-all ${selectedMenu === 'SOF' ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' : 'hover:bg-slate-600 cursor-pointer'}`}
              onClick={() => setSelectedMenu('SOF')}
            >
              SOF 분석
            </li>
            <li
              className={`rounded-lg px-3 py-2 transition-all ${selectedMenu === 'KOTRA' ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' : 'hover:bg-slate-600 cursor-pointer'}`}
              onClick={() => setSelectedMenu('KOTRA')}
            >
              KOTRA 분석
            </li>
            <li className={`rounded-lg px-3 py-2 opacity-50 cursor-not-allowed`}>
              Epsilon PoP 현황 (준비중)
            </li>
          </ul>
          {/* 보고서 */}
          <div className="text-gray-500 text-xs mb-2 uppercase tracking-wider">Reports</div>
          <ul className="space-y-1 mb-6">
            {/* 투자 전략 보고서 */}
            <li>
              <button
                className={`rounded-lg px-3 py-2 flex justify-between items-center w-full whitespace-nowrap transition-all ${
                  selectedMenu === 'INVEST_REPORT'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'hover:bg-slate-600 text-gray-200'
                }`}
                onClick={() => {
                  setSelectedMenu('INVEST_REPORT');
                  setInvestmentStrategyOpen((v) => (selectedMenu === 'INVEST_REPORT' ? !v : true));
                }}
                aria-expanded={selectedMenu === 'INVEST_REPORT' && investmentStrategyOpen}
                aria-controls="investmentstrategy-toc-list"
                style={{ maxWidth: '100%' }}
              >
                <span className="whitespace-nowrap overflow-hidden text-ellipsis block" style={{ maxWidth: '200px' }}>
                  투자 전략 보고서
                </span>
                <span className="ml-2">{selectedMenu === 'INVEST_REPORT' && investmentStrategyOpen ? '▲' : '▼'}</span>
              </button>
              {selectedMenu === 'INVEST_REPORT' && investmentStrategyOpen && (
                <ul id="investmentstrategy-toc-list" className="pl-4 mt-1 space-y-1">
                  {investmentStrategyToc.map((item) => (
                    <li key={item.id}>
                      <button
                        className={`block px-2 py-1 rounded hover:bg-slate-600 text-sm text-gray-300 hover:text-white transition-colors w-full text-left ${investmentStrategySection === item.id ? 'font-bold text-emerald-400' : ''}`}
                        onClick={() => {
                          setInvestmentStrategySection(item.id);
                          setInvestmentStrategyViewMode('section');
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {/* 사업성 분석 보고서 */}
            <li>
              <button
                className={`rounded px-3 py-2 font-semibold flex justify-between items-center w-full whitespace-nowrap ${
                  selectedMenu === 'MARKETING_REPORT'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'hover:bg-slate-600 text-gray-200'
                }`}
                onClick={() => {
                  setSelectedMenu('MARKETING_REPORT');
                  setBusinessFeasibilityOpen((v) => (selectedMenu === 'MARKETING_REPORT' ? !v : true));
                }}
                aria-expanded={selectedMenu === 'MARKETING_REPORT' && businessFeasibilityOpen}
                aria-controls="businessfeasibility-toc-list"
                style={{ maxWidth: '100%' }}
              >
                <span className="whitespace-nowrap overflow-hidden text-ellipsis block" style={{ maxWidth: '200px' }}>
                  사업성 분석 보고서 <span className="text-xs text-gray-500">(ugly kevin)</span>
                </span>
                <span className="ml-2">{selectedMenu === 'MARKETING_REPORT' && businessFeasibilityOpen ? '▲' : '▼'}</span>
              </button>
              {selectedMenu === 'MARKETING_REPORT' && businessFeasibilityOpen && (
                <ul id="businessfeasibility-toc-list" className="pl-4 mt-1 space-y-1">
                  {businessFeasibilityToc.map((item) => (
                    <li key={item.id}>
                      <button
                        className={`block px-2 py-1 rounded hover:bg-slate-600 text-sm text-gray-300 hover:text-white transition-colors w-full text-left ${
                          businessFeasibilitySection === item.id ? 'font-bold text-emerald-400' : ''
                        }`}
                        onClick={() => setBusinessFeasibilitySection(item.id)}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {/* 뉴욕법인 할인율 보고서 */}
            <li>
              <button
                className={`rounded px-3 py-2 font-semibold flex justify-between items-center w-full whitespace-nowrap ${
                  selectedMenu === 'NY_DISCOUNT_REPORT'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'hover:bg-slate-600 text-gray-200'
                }`}
                onClick={() => {
                  setSelectedMenu('NY_DISCOUNT_REPORT');
                  setNyDiscountOpen((v) => (selectedMenu === 'NY_DISCOUNT_REPORT' ? !v : true));
                }}
                aria-expanded={selectedMenu === 'NY_DISCOUNT_REPORT' && nyDiscountOpen}
                aria-controls="nydiscount-toc-list"
                style={{ maxWidth: '100%' }}
              >
                <span className="whitespace-nowrap overflow-hidden text-ellipsis block" style={{ maxWidth: '200px' }}>
                  뉴욕법인 할인율 보고서
                </span>
                <span className="ml-2">{selectedMenu === 'NY_DISCOUNT_REPORT' && nyDiscountOpen ? '▲' : '▼'}</span>
              </button>
              {selectedMenu === 'NY_DISCOUNT_REPORT' && nyDiscountOpen && (
                <ul id="nydiscount-toc-list" className="pl-4 mt-1 space-y-1">
                  {nyDiscountToc.map((item) => (
                    <li key={item.id}>
                      <button
                        className={`block px-2 py-1 rounded hover:bg-slate-600 text-sm text-gray-300 hover:text-white transition-colors w-full text-left ${
                          nyDiscountSection === item.id ? 'font-bold text-emerald-400' : ''
                        }`}
                        onClick={() => setNyDiscountSection(item.id)}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {/* Epsilon Factbook */}
            <li>
              <button
                className={`rounded px-3 py-2 font-semibold flex justify-between items-center w-full ${
                  selectedMenu === 'EPSILON_FACTBOOK'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'hover:bg-slate-600 text-gray-200'
                }`}
                onClick={() => {
                  setSelectedMenu('EPSILON_FACTBOOK');
                  setFactbookOpen((v) => (selectedMenu === 'EPSILON_FACTBOOK' ? !v : true));
                }}
                aria-expanded={selectedMenu === 'EPSILON_FACTBOOK' && factbookOpen}
                aria-controls="factbook-toc-list"
              >
                <span>Epsilon Factbook</span>
                <span className="ml-2">
                  {selectedMenu === 'EPSILON_FACTBOOK' && factbookOpen ? '▲' : '▼'}
                </span>
              </button>
              {selectedMenu === 'EPSILON_FACTBOOK' && factbookOpen && (
                <ul id="factbook-toc-list" className="pl-4 mt-1 space-y-1">
                  {factbookToc.map((item) => (
                    <li key={item.id}>
                      <button
                        className={`block px-2 py-1 rounded hover:bg-slate-600 text-sm text-gray-300 hover:text-white transition-colors w-full text-left ${
                          factbookSection === item.id ? 'font-bold text-emerald-400' : ''
                        }`}
                        onClick={() => setFactbookSection(item.id)}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {/* Synergy Sales */}
            <li>
              <button
                className={`rounded px-3 py-2 font-semibold flex justify-between items-center w-full ${
                  selectedMenu === 'SYNERGY_SALES'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'hover:bg-slate-600 text-gray-200'
                }`}
                onClick={() => {
                  setSelectedMenu('SYNERGY_SALES');
                  setSynergySalesOpen((v) => (selectedMenu === 'SYNERGY_SALES' ? !v : true));
                }}
                aria-expanded={selectedMenu === 'SYNERGY_SALES' && synergySalesOpen}
                aria-controls="synergysales-toc-list"
              >
                <span>Synergy Sales</span>
                <span className="ml-2">
                  {selectedMenu === 'SYNERGY_SALES' && synergySalesOpen ? '▲' : '▼'}
                </span>
              </button>
              {selectedMenu === 'SYNERGY_SALES' && synergySalesOpen && (
                <ul id="synergysales-toc-list" className="pl-4 mt-1 space-y-1">
                  {synergySalesToc.map((item) => (
                    <li key={item.id}>
                      <button
                        className={`block px-2 py-1 rounded hover:bg-slate-600 text-sm text-gray-300 hover:text-white transition-colors w-full text-left ${
                          synergySalesSection === item.id ? 'font-bold text-emerald-400' : ''
                        }`}
                        onClick={() => {
                          console.log('🔍 메뉴 클릭:', item.id, item.label);
                          if (item.id === 'db-analysis') {
                            console.log('🔄 2번 메뉴 클릭 - DB Analysis로 이동');
                            setSelectedMenu('SYNERGY_SALES');
                            setSynergySalesSection('db-analysis');
                            setSynergySalesViewMode('section');
                            setSynergySalesOpen(true);
                          } else if (item.id === 'annual-data') {
                            console.log('🔄 3번 메뉴 클릭 - Annual Data로 이동');
                            setSelectedMenu('SYNERGY_SALES');
                            setSynergySalesSection('annual-data');
                            setSynergySalesViewMode('section');
                            setSynergySalesOpen(true);
                          } else {
                            console.log('🔄 일반 메뉴 클릭:', item.id);
                            setSynergySalesSection(item.id);
                          }
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {/* Euro Marketing Strategy */}
            <li>
              <button
                className={`rounded px-3 py-2 font-semibold flex justify-between items-center w-full ${
                  selectedMenu === 'EURO_MARKETING_STRATEGY'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'hover:bg-slate-600 text-gray-200'
                }`}
                onClick={() => {
                  setSelectedMenu('EURO_MARKETING_STRATEGY');
                  setEuroMarketingStrategyOpen((v) => (selectedMenu === 'EURO_MARKETING_STRATEGY' ? !v : true));
                }}
                aria-expanded={selectedMenu === 'EURO_MARKETING_STRATEGY' && euroMarketingStrategyOpen}
                aria-controls="euromarketingstrategy-toc-list"
              >
                <span>Euro Marketing Strategy</span>
                <span className="ml-2">
                  {selectedMenu === 'EURO_MARKETING_STRATEGY' && euroMarketingStrategyOpen ? '▲' : '▼'}
                </span>
              </button>
              {selectedMenu === 'EURO_MARKETING_STRATEGY' && euroMarketingStrategyOpen && (
                <ul id="euromarketingstrategy-toc-list" className="pl-4 mt-1 space-y-1">
                  {euroMarketingStrategyToc.map((item) => (
                    <li key={item.id}>
                      <button
                        className={`block px-2 py-1 rounded hover:bg-slate-600 text-sm text-gray-300 hover:text-white transition-colors w-full text-left ${
                          euroMarketingStrategySection === item.id ? 'font-bold text-emerald-400' : ''
                        }`}
                        onClick={() => {
                          setEuroMarketingStrategySection(item.id);
                          setEuroMarketingStrategyViewMode('section');
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 ml-80 mt-16 p-8 bg-gray-50">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
} 