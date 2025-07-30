import React from 'react';
import {
  SynergySalesSectionOverview,
  SynergySalesSectionAnalysis,
  SynergySalesSectionForecast,
  SynergySalesSectionComparison,
  SynergySalesSectionStrategy,
  SynergySalesSectionImplementation,
  SynergySalesSectionMonitoring,
  SynergySalesSectionConclusion,
} from './SynergySalesSections';
import { SynergySalesDBAnalysis } from './SynergySalesDBAnalysis';
import { SynergySalesAnnualAnalysis } from './SynergySalesAnnualAnalysis';

export function SynergySalesReport({
  sectionId,
  viewMode,
}: {
  sectionId: string;
  viewMode?: 'section' | 'all';
}) {
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">시너지 매출 보고서</h2>
      {viewMode === 'all' ? (
        <div className="space-y-16">
          <SynergySalesSectionOverview />
          <SynergySalesSectionAnalysis />
          <SynergySalesSectionForecast />
          <SynergySalesSectionComparison />
          <SynergySalesSectionStrategy />
          <SynergySalesSectionImplementation />
          <SynergySalesSectionMonitoring />
          <SynergySalesSectionConclusion />
        </div>
      ) : (
        <>
          {sectionId === 'overview' && <SynergySalesSectionOverview />}
          {sectionId === 'analysis' && <SynergySalesSectionAnalysis />}
          {sectionId === 'forecast' && <SynergySalesSectionForecast />}
          {sectionId === 'comparison' && <SynergySalesSectionComparison />}
          {sectionId === 'strategy' && <SynergySalesSectionStrategy />}
          {sectionId === 'implementation' && <SynergySalesSectionImplementation />}
          {sectionId === 'monitoring' && <SynergySalesSectionMonitoring />}
          {sectionId === 'conclusion' && <SynergySalesSectionConclusion />}
          {sectionId === 'db-analysis' && <SynergySalesDBAnalysis />}
          {sectionId === 'annual-data' && <SynergySalesAnnualAnalysis />}
        </>
      )}
    </div>
  );
} 