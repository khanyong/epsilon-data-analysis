import React, { useState } from 'react';
import { nyDiscountToc } from './NYDiscountTocData';
import {
  NYDiscountSectionIntro,
  NYDiscountSectionMacro,
  NYDiscountSectionRiskFree,
  NYDiscountSectionMarketPremium,
  NYDiscountSectionBeta,
  NYDiscountSectionCapitalStructure,
  NYDiscountSectionTaxRate,
  NYDiscountSectionWaccCalculation,
  NYDiscountSectionConclusion,
} from './NYDiscountSections';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { PDFExportButton } from '../../components/PDFExportButton';

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">×</button>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
}

export function NewYorkDiscountReport({ sectionId, viewMode }: { sectionId: string, viewMode?: 'section' | 'all' }) {
  const [modal, setModal] = useState(null);
  return (
    <div className="relative">
      {/* PDF 다운로드 버튼 */}
      <div className="flex justify-end mb-4">
        <PDFExportButton 
          elementId="ny-discount-content"
          filename={viewMode === 'all' ? "NY_Discount_Report.pdf" : `NY_Discount_${sectionId}.pdf`}
          buttonText={viewMode === 'all' ? "전체 보고서 PDF 다운로드" : "현재 섹션 PDF 다운로드"}
          variant="primary"
          size="md"
        />
      </div>
      
      <div id="ny-discount-content" className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6">뉴욕법인 할인율(WACC) 산정 보고서</h1>
      {viewMode === 'all' ? (
        <>
          <NYDiscountSectionIntro />
          <NYDiscountSectionMacro />
          <NYDiscountSectionRiskFree />
          <NYDiscountSectionMarketPremium />
          <NYDiscountSectionBeta />
          <NYDiscountSectionCapitalStructure />
          <NYDiscountSectionTaxRate />
          <NYDiscountSectionWaccCalculation />
          <NYDiscountSectionConclusion />
        </>
      ) : (
        <>
          {sectionId === 'intro' && <NYDiscountSectionIntro />}
          {sectionId === 'macro' && <NYDiscountSectionMacro />}
          {sectionId === 'risk-free' && <NYDiscountSectionRiskFree />}
          {sectionId === 'market-premium' && <NYDiscountSectionMarketPremium />}
          {sectionId === 'beta' && <NYDiscountSectionBeta />}
          {sectionId === 'capital-structure' && <NYDiscountSectionCapitalStructure />}
          {sectionId === 'tax-rate' && <NYDiscountSectionTaxRate />}
          {sectionId === 'wacc-calculation' && <NYDiscountSectionWaccCalculation />}
          {sectionId === 'conclusion' && <NYDiscountSectionConclusion />}
        </>
      )}
        {/* Modal 등 부가 기능은 그대로 유지 */}
        <Modal open={modal === 'rf'} onClose={() => setModal(null)} title="미국 국채 실시간 금리 (Bloomberg)">
          <img src="/attachments/appendix_rf.png" alt="미국 국채 실시간 금리" className="mb-2 rounded shadow" />
          <a href="https://www.bloomberg.com/markets/rates-bonds/government-bonds/us/" className="text-blue-600 underline inline-flex items-center" target="_blank">
            Bloomberg US Treasury <FaExternalLinkAlt className="ml-1" />
          </a>
        </Modal>
      </div>
    </div>
  );
} 