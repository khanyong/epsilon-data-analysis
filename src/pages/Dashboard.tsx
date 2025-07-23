import React, { useState } from 'react';
import { RFQAnalysis } from './RFQAnalysis';
import { SOFAnalysis } from './SOFAnalysis';
import { KOTRAAnalysis } from './KOTRAAnalysis';
// import { EpsilonPoPAnalysis } from './EpsilonPoPAnalysis';
import { ComprehensiveInvestmentReport } from '../components/ComprehensiveInvestmentReport';
import { MarketingReport } from './MarketingReport';

type MenuType = 'RFQ' | 'SOF' | 'KOTRA' | 'EPSILON_POPS' | 'INVEST_REPORT' | 'MARKETING_REPORT';

export function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState<MenuType>('RFQ');

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 사이드바 */}
      <aside className="w-64 bg-[#222] text-white flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-lg bg-green-600">
          <span>Strategic Data Analyzer</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* 데이터 분석 */}
          <div className="text-gray-400 text-xs mb-2">데이터 분석</div>
          <ul className="space-y-1 mb-6">
            <li className={`rounded px-3 py-2 font-semibold ${selectedMenu === 'RFQ' ? 'bg-green-700' : 'hover:bg-gray-700 cursor-pointer'}`}
                onClick={() => setSelectedMenu('RFQ')}>
              RFQ 분석
            </li>
            <li className={`rounded px-3 py-2 font-semibold ${selectedMenu === 'SOF' ? 'bg-green-700' : 'hover:bg-gray-700 cursor-pointer'}`}
                onClick={() => setSelectedMenu('SOF')}>
              SOF 분석
            </li>
            <li className={`rounded px-3 py-2 font-semibold ${selectedMenu === 'KOTRA' ? 'bg-green-700' : 'hover:bg-gray-700 cursor-pointer'}`}
                onClick={() => setSelectedMenu('KOTRA')}>
              KOTRA 분석
            </li>
            <li className={`rounded px-3 py-2 font-semibold opacity-50 cursor-not-allowed`}>
              Epsilon PoP 현황 (준비중)
            </li>
          </ul>
          {/* 보고서 */}
          <div className="text-gray-400 text-xs mb-2">보고서</div>
          <ul className="space-y-1">
            <li className={`rounded px-3 py-2 font-semibold ${selectedMenu === 'INVEST_REPORT' ? 'bg-blue-700' : 'hover:bg-gray-700 cursor-pointer'}`}
                onClick={() => setSelectedMenu('INVEST_REPORT')}>
              투자 전략 보고서
            </li>
            <li className={`rounded px-3 py-2 font-semibold ${selectedMenu === 'MARKETING_REPORT' ? 'bg-blue-700' : 'hover:bg-gray-700 cursor-pointer'}`}
                onClick={() => setSelectedMenu('MARKETING_REPORT')}>
              사업성 분석 보고서
            </li>
          </ul>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-8">
        {/* RFQ 분석 */}
        {selectedMenu === 'RFQ' && <RFQAnalysis />}
        
        {/* SOF 분석 */}
        {selectedMenu === 'SOF' && <SOFAnalysis />}
        
        {/* KOTRA 분석 */}
        {selectedMenu === 'KOTRA' && <KOTRAAnalysis />}
        
        {/* Epsilon PoP 분석 - 임시 비활성화 */}
        {selectedMenu === 'EPSILON_POPS' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <h3 className="text-yellow-800 font-medium">Epsilon PoP 현황</h3>
            <p className="text-yellow-600 text-sm mt-1">페이지 준비중입니다.</p>
          </div>
        )}
        
        {/* 종합 투자전략보고서 */}
        {selectedMenu === 'INVEST_REPORT' && <ComprehensiveInvestmentReport />}
        
        {/* 사업성 분석 보고서 */}
        {selectedMenu === 'MARKETING_REPORT' && <MarketingReport />}
      </main>
    </div>
  );
} 