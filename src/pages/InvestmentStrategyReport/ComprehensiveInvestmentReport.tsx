import React from 'react';
import {
  InvestmentStrategySectionPreprocessing,
  InvestmentStrategySectionComparison,
  InvestmentStrategySectionCandidateAnalysis,
  InvestmentStrategySectionExcludeKtpop,
  InvestmentStrategySectionCandidateSelection,
  InvestmentStrategySectionFinalRecommendation,
  InvestmentStrategySectionExecutionRoadmap,
  InvestmentStrategySectionTop40Table,
  InvestmentStrategySectionTop100Table,
} from './InvestmentStrategySections';

export function ComprehensiveInvestmentReport({ sectionId, viewMode }: { sectionId: string; viewMode?: 'section' | 'all' }) {
  return (
    <div className="max-w-7xl mx-auto p-8 bg-white space-y-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">7개 데이터 통합 투자전략분석 보고서</h1>
      {viewMode === 'all' ? (
        <>
          <InvestmentStrategySectionPreprocessing />
          <InvestmentStrategySectionComparison />
          <InvestmentStrategySectionCandidateAnalysis />
          <InvestmentStrategySectionExcludeKtpop />
          <InvestmentStrategySectionCandidateSelection />
          <InvestmentStrategySectionFinalRecommendation />
          <InvestmentStrategySectionExecutionRoadmap />
          <InvestmentStrategySectionTop40Table />
          <InvestmentStrategySectionTop100Table />
        </>
      ) : (
        <>
          {sectionId === 'preprocessing' && <InvestmentStrategySectionPreprocessing />}
          {sectionId === 'comparison' && <InvestmentStrategySectionComparison />}
          {sectionId === 'candidate-analysis' && <InvestmentStrategySectionCandidateAnalysis />}
          {sectionId === 'exclude-ktpop' && <InvestmentStrategySectionExcludeKtpop />}
          {sectionId === 'candidate-selection' && <InvestmentStrategySectionCandidateSelection />}
          {sectionId === 'final-recommendation' && <InvestmentStrategySectionFinalRecommendation />}
          {sectionId === 'execution-roadmap' && <InvestmentStrategySectionExecutionRoadmap />}
          {sectionId === 'top40-table' && <InvestmentStrategySectionTop40Table />}
          {sectionId === 'top100-table' && <InvestmentStrategySectionTop100Table />}
        </>
      )}
    </div>
  );
}