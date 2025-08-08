import React from 'react';
import {
  EuroMarketingStrategySectionExecutiveSummary,
  EuroMarketingStrategySectionMarketAnalysis,
  EuroMarketingStrategySectionCompetitiveLandscape,
  EuroMarketingStrategySectionPricingStrategy,
  EuroMarketingStrategySectionMarketEntryStrategy
} from './sections/EuroMarketingStrategySections';
import {
  EuroMarketingStrategySectionStrategicPartnerships,
  EuroMarketingStrategySectionNicheMarketFocus
} from './sections/EuroMarketingStrategySectionsExtended';
import {
  EuroMarketingStrategySectionRiskAnalysis,
  EuroMarketingStrategySectionFinancialProjection,
  EuroMarketingStrategySectionExecutionRoadmap,
  EuroMarketingStrategySectionConclusion
} from './sections/EuroMarketingStrategySectionsFinal';
import { EuroMarketingStrategyDataAppendix } from './components/DataAppendix';

interface EuroMarketingStrategyProps {
  sectionId: string;
  viewMode: 'section' | 'all';
}

export function EuroMarketingStrategy({ sectionId, viewMode }: EuroMarketingStrategyProps) {
  if (viewMode === 'all') {
    return (
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">유럽 시장 진출 전략 보고서</h1>
          <p className="text-xl text-gray-600 mb-2">Epsilon 글로벌 데이터 사업 확장을 위한 종합 전략</p>
          <p className="text-gray-500">Euro Market Entry Strategy Report for Epsilon</p>
        </div>
        
        <div className="space-y-16">
          <EuroMarketingStrategySectionExecutiveSummary />
          <EuroMarketingStrategySectionMarketAnalysis />
          <EuroMarketingStrategySectionCompetitiveLandscape />
          <EuroMarketingStrategySectionPricingStrategy />
          <EuroMarketingStrategySectionMarketEntryStrategy />
          <EuroMarketingStrategySectionStrategicPartnerships />
          <EuroMarketingStrategySectionNicheMarketFocus />
          <EuroMarketingStrategySectionRiskAnalysis />
          <EuroMarketingStrategySectionFinancialProjection />
          <EuroMarketingStrategySectionExecutionRoadmap />
          <EuroMarketingStrategySectionConclusion />
          <EuroMarketingStrategyDataAppendix />
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (sectionId) {
      case 'executive-summary':
        return <EuroMarketingStrategySectionExecutiveSummary />;
      case 'market-analysis':
        return <EuroMarketingStrategySectionMarketAnalysis />;
      case 'competitive-landscape':
        return <EuroMarketingStrategySectionCompetitiveLandscape />;
      case 'pricing-strategy':
        return <EuroMarketingStrategySectionPricingStrategy />;
      case 'market-entry-strategy':
        return <EuroMarketingStrategySectionMarketEntryStrategy />;
      case 'strategic-partnerships':
        return <EuroMarketingStrategySectionStrategicPartnerships />;
      case 'niche-market-focus':
        return <EuroMarketingStrategySectionNicheMarketFocus />;
      case 'risk-analysis':
        return <EuroMarketingStrategySectionRiskAnalysis />;
      case 'financial-projection':
        return <EuroMarketingStrategySectionFinancialProjection />;
      case 'execution-roadmap':
        return <EuroMarketingStrategySectionExecutionRoadmap />;
      case 'conclusion':
        return <EuroMarketingStrategySectionConclusion />;
      case 'appendix':
        return <EuroMarketingStrategyDataAppendix />;
      default:
        return (
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-blue-700 mb-4">유럽 시장 진출 전략 보고서</h1>
              <p className="text-xl text-gray-600 mb-2">Epsilon 글로벌 데이터 사업 확장을 위한 종합 전략</p>
              <p className="text-gray-500">Euro Market Entry Strategy Report for Epsilon</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">📋 보고서 개요</h2>
              <p className="text-blue-700 mb-4">
                본 보고서는 <strong>Epsilon</strong>의 유럽 해저케이블 시장 진출을 위한 종합적인 전략을 제시합니다. 
                극도로 경쟁적인 유럽 시장에서 중소기업이 성공할 수 있는 차별화된 접근법을 데이터 분석을 
                바탕으로 제안합니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">🎯 핵심 전략</h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• 니치 마켓 집중 공략</li>
                    <li>• 전략적 파트너십 활용</li>
                    <li>• 기술 혁신 기반 차별화</li>
                    <li>• 단계적 시장 확장</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">📊 데이터 기반 분석</h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• 2,054개 국가별 라우트 분석</li>
                    <li>• 120개 도매 가격 데이터</li>
                    <li>• 13개 지역별 세부 메트릭</li>
                    <li>• 2023-2030 성장 예측</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-green-900 mb-2">1. 경영진 요약</h3>
                <p className="text-green-700 text-xs">핵심 전략과 기회 요약</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-blue-900 mb-2">2. 시장 현황</h3>
                <p className="text-blue-700 text-xs">유럽 시장 분석</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-red-900 mb-2">3. 경쟁 환경</h3>
                <p className="text-red-700 text-xs">대기업 중심 재편 분석</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-purple-900 mb-2">4. 가격 전략</h3>
                <p className="text-purple-700 text-xs">경쟁적 가격 환경 대응</p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-indigo-900 mb-2">5. 진입 전략</h3>
                <p className="text-indigo-700 text-xs">단계적 시장 진입</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-yellow-900 mb-2">6. 파트너십</h3>
                <p className="text-yellow-700 text-xs">전략적 제휴 방안</p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-orange-900 mb-2">7. 니치 마켓</h3>
                <p className="text-orange-700 text-xs">특화 시장 집중</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-gray-900 mb-2">12. 부록</h3>
                <p className="text-gray-700 text-xs">데이터 및 참조자료</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return <div className="space-y-8">{renderSection()}</div>;
}