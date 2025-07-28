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
  BusinessFeasibilitySectionTargetCustomers,
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
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">사업성 분석 보고서</h2>
      {viewMode === 'all' ? (
        <div className="space-y-16">
          <BusinessFeasibilitySectionOverview />
          <BusinessFeasibilitySectionAms />
          <BusinessFeasibilitySectionMumbai />
          <BusinessFeasibilitySectionChennai />
          <BusinessFeasibilitySectionInvestment />
          <BusinessFeasibilitySectionRevenue />
          <BusinessFeasibilitySectionDcf />
          <BusinessFeasibilitySectionMarketing />
          <BusinessFeasibilitySectionRisk />
          <BusinessFeasibilitySectionConclusion />
          <BusinessFeasibilitySectionTargetCustomers />
          <BusinessFeasibilitySectionAppendix />
        </div>
      ) : (
        <>
          {sectionId === 'overview' && <BusinessFeasibilitySectionOverview />}
          {sectionId === 'ams' && <BusinessFeasibilitySectionAms />}
          {sectionId === 'mumbai' && <BusinessFeasibilitySectionMumbai />}
          {sectionId === 'chennai' && <BusinessFeasibilitySectionChennai />}
          {sectionId === 'investment' && <BusinessFeasibilitySectionInvestment />}
          {sectionId === 'revenue' && <BusinessFeasibilitySectionRevenue />}
          {sectionId === 'dcf' && <BusinessFeasibilitySectionDcf />}
          {sectionId === 'marketing' && <BusinessFeasibilitySectionMarketing />}
          {sectionId === 'risk' && <BusinessFeasibilitySectionRisk />}
          {sectionId === 'conclusion' && <BusinessFeasibilitySectionConclusion />}
          {sectionId === 'target-customers' && <BusinessFeasibilitySectionTargetCustomers />}
          {sectionId === 'appendix' && <BusinessFeasibilitySectionAppendix />}
        </>
      )}
    </div>
  );
}
