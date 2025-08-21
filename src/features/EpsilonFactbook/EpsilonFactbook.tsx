import React from 'react';
import {
  FactbookSectionCompany,
  FactbookSectionOwnership,
  FactbookSectionFinance,
  FactbookSectionValuation,
  FactbookSectionInstrument,
  FactbookSectionExit,
  FactbookSectionMarket,
  FactbookSectionGlobal,
  FactbookSectionNY,
  FactbookSectionVem,
  FactbookSectionFbo,
  FactbookSectionInfra,
  FactbookSectionKt,
  FactbookSectionGrowth,
} from './FactbookSections';
import { PDFExportButton } from '../../components/PDFExportButton';

export const toc = [
  { id: 'company', label: '1. 회사 개요' },
  { id: 'ownership', label: '2. 지배구조 및 주주 정보' },
  { id: 'finance', label: '3. 재무 정보' },
  { id: 'valuation', label: '4. 손실평가' },
  { id: 'instrument', label: '5. 증자과제 분석' },
  { id: 'exit', label: '6. Exit Plan 및 IPO 관련 정보' },
  { id: 'market', label: '7. 시장 정보' },
  { id: 'global', label: '8. 글로벌 데이터 시장' },
  { id: 'ny', label: '9. 뉴욕 법인 정보' },
  { id: 'vem', label: '10. VEM 법인 추진 현황' },
  { id: 'fbo', label: '11. FBO 관련' },
  { id: 'infra', label: '12. Epsilon 인프라 현황' },
  { id: 'kt', label: '13. KT 시너지 사업 효과' },
  { id: 'growth', label: '14. Epsilon 성장 및 TF 조직 이력' },
];

export function EpsilonFactbook({ sectionId, viewMode }: { sectionId: string, viewMode?: 'section' | 'all' }) {
  return (
    <div className="relative">
      {/* PDF 다운로드 버튼 */}
      <div className="flex justify-end mb-4">
        <PDFExportButton 
          elementId="factbook-content"
          filename={viewMode === 'all' ? "Epsilon_Factbook.pdf" : `Epsilon_Factbook_${sectionId}.pdf`}
          buttonText={viewMode === 'all' ? "전체 Factbook PDF 다운로드" : "현재 섹션 PDF 다운로드"}
          variant="primary"
          size="md"
        />
      </div>
      
      <div id="factbook-content" className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Epsilon Factbook</h2>
      {viewMode === 'all' ? (
        <>
          <FactbookSectionCompany />
          <FactbookSectionOwnership />
          <FactbookSectionFinance />
          <FactbookSectionValuation />
          <FactbookSectionInstrument />
          <FactbookSectionExit />
          <FactbookSectionMarket />
          <FactbookSectionGlobal />
          <FactbookSectionNY />
          <FactbookSectionVem />
          <FactbookSectionFbo />
          <FactbookSectionInfra />
          <FactbookSectionKt />
          <FactbookSectionGrowth />
        </>
      ) : (
        <>
          {sectionId === 'company' && <FactbookSectionCompany />}
          {sectionId === 'ownership' && <FactbookSectionOwnership />}
          {sectionId === 'finance' && <FactbookSectionFinance />}
          {sectionId === 'valuation' && <FactbookSectionValuation />}
          {sectionId === 'instrument' && <FactbookSectionInstrument />}
          {sectionId === 'exit' && <FactbookSectionExit />}
          {sectionId === 'market' && <FactbookSectionMarket />}
          {sectionId === 'global' && <FactbookSectionGlobal />}
          {sectionId === 'ny' && <FactbookSectionNY />}
          {sectionId === 'vem' && <FactbookSectionVem />}
          {sectionId === 'fbo' && <FactbookSectionFbo />}
          {sectionId === 'infra' && <FactbookSectionInfra />}
          {sectionId === 'kt' && <FactbookSectionKt />}
          {sectionId === 'growth' && <FactbookSectionGrowth />}
        </>
      )}
      </div>
    </div>
  );
} 