import React from 'react';
import {
  BusinessFeasibilitySectionOverview,
  BusinessFeasibilitySectionAms,
  BusinessFeasibilitySectionMumbai,
  BusinessFeasibilitySectionChennai,
  BusinessFeasibilitySectionInvestment,
  BusinessFeasibilitySectionRevenue,
  BusinessFeasibilitySectionDcf,
  BusinessFeasibilitySectionMarketing,
  BusinessFeasibilitySectionSimulation,
  BusinessFeasibilitySectionConclusion,
  BusinessFeasibilitySectionRisk,
  BusinessFeasibilitySectionTargetCustomers,
  BusinessFeasibilitySectionAppendix,
} from './BusinessFeasibilitySections';
import { PDFExportButton } from '../../components/PDFExportButton';

export function BusinessFeasibilityReport({
  sectionId,
  viewMode,
}: {
  sectionId: string;
  viewMode?: 'section' | 'all';
}) {
  return (
    <div className="relative">
      {/* PDF 다운로드 버튼 */}
      <div className="flex justify-end mb-4">
        <PDFExportButton 
          elementId="business-feasibility-content"
          filename={viewMode === 'all' ? "Business_Feasibility_Report.pdf" : `Business_Feasibility_${sectionId}.pdf`}
          buttonText={viewMode === 'all' ? "전체 보고서 PDF 다운로드" : "현재 섹션 PDF 다운로드"}
          variant="primary"
          size="md"
        />
      </div>
      
      <div id="business-feasibility-content" className="max-w-7xl mx-auto bg-white rounded-xl shadow p-8">
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
          <BusinessFeasibilitySectionSimulation />
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
          {sectionId === 'simulation' && <BusinessFeasibilitySectionSimulation />}
        </>
      )}
      </div>
    </div>
  );
}
