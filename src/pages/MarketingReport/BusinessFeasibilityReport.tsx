import React from 'react';
import {
  BusinessFeasibilitySectionOverview,
  BusinessFeasibilitySectionMumbai,
  BusinessFeasibilitySectionChennai,
  BusinessFeasibilitySectionAms,
  BusinessFeasibilitySectionInvestment,
  BusinessFeasibilitySectionRevenue,
  BusinessFeasibilitySectionDcf,
  BusinessFeasibilitySectionMarketing,
  BusinessFeasibilitySectionRisk,
  BusinessFeasibilitySectionConclusion,
  BusinessFeasibilitySectionAppendix,
} from './BusinessFeasibilitySections';

export function BusinessFeasibilityReport({
  sectionId,
  viewMode,
}: {
  sectionId: string;
  viewMode?: 'section' | 'all';
}) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">사업성 분석 보고서</h2>
      {viewMode === 'all' ? (
        <div className="space-y-16">
          <BusinessFeasibilitySectionOverview />
          <BusinessFeasibilitySectionMumbai />
          <BusinessFeasibilitySectionChennai />
          <BusinessFeasibilitySectionAms />
          <BusinessFeasibilitySectionInvestment />
          <BusinessFeasibilitySectionRevenue />
          <BusinessFeasibilitySectionDcf />
          <BusinessFeasibilitySectionMarketing />
          <BusinessFeasibilitySectionRisk />
          <BusinessFeasibilitySectionConclusion />
          <BusinessFeasibilitySectionAppendix />
        </div>
      ) : (
        <>
          {sectionId === 'overview' && <BusinessFeasibilitySectionOverview />}
          {sectionId === 'mumbai' && <BusinessFeasibilitySectionMumbai />}
          {sectionId === 'chennai' && <BusinessFeasibilitySectionChennai />}
          {sectionId === 'ams' && <BusinessFeasibilitySectionAms />}
          {sectionId === 'investment' && <BusinessFeasibilitySectionInvestment />}
          {sectionId === 'revenue' && <BusinessFeasibilitySectionRevenue />}
          {sectionId === 'dcf' && <BusinessFeasibilitySectionDcf />}
          {sectionId === 'marketing' && <BusinessFeasibilitySectionMarketing />}
          {sectionId === 'risk' && <BusinessFeasibilitySectionRisk />}
          {sectionId === 'conclusion' && <BusinessFeasibilitySectionConclusion />}
          {sectionId === 'appendix' && <BusinessFeasibilitySectionAppendix />}
        </>
      )}
    </div>
  );
}
