import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RFQAnalysis } from './RFQAnalysis';
import { SOFAnalysis } from './SOFAnalysis';
import { KOTRAAnalysis } from './KOTRAAnalysis';
import { MarketingReport } from './MarketingReport';
import { ComprehensiveInvestmentReport } from '../components/ComprehensiveInvestmentReport';

type MenuType = 'RFQ' | 'SOF' | 'KOTRA' | 'EPSILON_POPS' | 'INVEST_REPORT' | 'MARKETING_REPORT';

export function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState<MenuType>('RFQ');
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
        return <ComprehensiveInvestmentReport />;
      case 'MARKETING_REPORT':
        return <MarketingReport />;
      default:
        return <RFQAnalysis />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 헤더 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-green-400 shadow-sm">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center pl-4">
            <h1 className="text-xl font-bold text-white">Strategic Data Analyzer</h1>
          </div>
          {/* 사용자 정보 및 로그아웃 */}
          <div className="flex items-center space-x-4 mr-4">
            <div className="text-sm text-green-900">
              <span className="font-medium">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>

      {/* 사이드바 */}
      <aside className="w-64 bg-gray-200 text-gray-900 flex flex-col fixed left-0 top-16 h-full">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* 데이터 분석 */}
          <div className="text-gray-500 text-xs mb-2">데이터 분석</div>
          <ul className="space-y-1 mb-6">
            <li className={`rounded px-3 py-2 font-semibold ${selectedMenu === 'RFQ' ? 'bg-green-500 text-white' : 'hover:bg-gray-300 cursor-pointer'}`}
                onClick={() => setSelectedMenu('RFQ')}>
              RFQ 분석
            </li>
            <li className={`rounded px-3 py-2 font-semibold ${selectedMenu === 'SOF' ? 'bg-green-500 text-white' : 'hover:bg-gray-300 cursor-pointer'}`}
                onClick={() => setSelectedMenu('SOF')}>
              SOF 분석
            </li>
            <li className={`rounded px-3 py-2 font-semibold ${selectedMenu === 'KOTRA' ? 'bg-green-500 text-white' : 'hover:bg-gray-300 cursor-pointer'}`}
                onClick={() => setSelectedMenu('KOTRA')}>
              KOTRA 분석
            </li>
            <li className={`rounded px-3 py-2 font-semibold opacity-50 cursor-not-allowed`}>
              Epsilon PoP 현황 (준비중)
            </li>
          </ul>
          {/* 보고서 */}
          <div className="text-gray-500 text-xs mb-2">보고서</div>
          <ul className="space-y-1">
            <li className={`rounded px-3 py-2 font-semibold ${selectedMenu === 'INVEST_REPORT' ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 cursor-pointer'}`}
                onClick={() => setSelectedMenu('INVEST_REPORT')}>
              투자 전략 보고서
            </li>
            <li className={`rounded px-3 py-2 font-semibold ${selectedMenu === 'MARKETING_REPORT' ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 cursor-pointer'}`}
                onClick={() => setSelectedMenu('MARKETING_REPORT')}>
              사업성 분석 보고서
            </li>
          </ul>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 ml-64 mt-16 p-8">
        {renderContent()}
      </main>
    </div>
  );
} 