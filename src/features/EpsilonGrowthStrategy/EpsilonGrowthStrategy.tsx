import React from 'react';
import { JohorSingaporeDC } from './sections/JohorSingaporeDC';
import { SEACableDirect } from './sections/SEACableDirect';
import { SEAPoPExpansion } from './sections/SEAPoPExpansion';
import { SingaporeEuropeIRU } from './sections/SingaporeEuropeIRU';
import { AustraliaCableIRU } from './sections/AustraliaCableIRU';
import { DataReferences } from './sections/DataReferences';
import { EuropeDataCenterMarket } from './sections/EuropeDataCenterMarket';
import { PDFExportButton } from '../../components/PDFExportButton';

interface EpsilonGrowthStrategyProps {
  sectionId?: string;
  viewMode?: 'section' | 'all';
}

export function EpsilonGrowthStrategy({ 
  sectionId = 'johor-singapore-dc', 
  viewMode = 'section' 
}: EpsilonGrowthStrategyProps) {

  const renderSection = (id: string) => {
    switch (id) {
      case 'johor-singapore-dc':
        return <JohorSingaporeDC />;
      case 'sea-cable-direct':
        return <SEACableDirect />;
      case 'sea-pop-expansion':
        return <SEAPoPExpansion />;
      case 'singapore-europe-iru':
        return <SingaporeEuropeIRU />;
      case 'australia-cable-iru':
        return <AustraliaCableIRU />;
      case 'data-references':
        return <DataReferences />;
      case 'europe-datacenter-market':
        return <EuropeDataCenterMarket />;
      default:
        return <JohorSingaporeDC />;
    }
  };

  if (viewMode === 'all') {
    return (
      <div className="relative">
        {/* PDF 다운로드 버튼 */}
        <div className="flex justify-end mb-4 max-w-7xl mx-auto px-4">
          <PDFExportButton 
            elementId="epsilon-growth-strategy-content"
            filename="Epsilon_Growth_Strategy_Report.pdf"
            buttonText="전체 보고서 PDF 다운로드"
            variant="primary"
            size="md"
          />
        </div>
        
        <div id="epsilon-growth-strategy-content" className="max-w-7xl mx-auto px-4 py-8 space-y-12">
          <div id="johor-singapore-dc" data-section-id="johor-singapore-dc">
            <JohorSingaporeDC />
          </div>
        <div className="border-t-2 border-gray-200 my-12"></div>
        
        <div id="sea-cable-direct" data-section-id="sea-cable-direct">
          <SEACableDirect />
        </div>
        <div className="border-t-2 border-gray-200 my-12"></div>
        
        <div id="sea-pop-expansion" data-section-id="sea-pop-expansion">
          <SEAPoPExpansion />
        </div>
        <div className="border-t-2 border-gray-200 my-12"></div>
        
        <div id="singapore-europe-iru" data-section-id="singapore-europe-iru">
          <SingaporeEuropeIRU />
        </div>
        <div className="border-t-2 border-gray-200 my-12"></div>
        
        <div id="australia-cable-iru" data-section-id="australia-cable-iru">
          <AustraliaCableIRU />
        </div>
        <div className="border-t-2 border-gray-200 my-12"></div>
        
        <div id="data-references" data-section-id="data-references">
          <DataReferences />
        </div>
        <div className="border-t-2 border-gray-200 my-12"></div>
        
          <div id="europe-datacenter-market" data-section-id="europe-datacenter-market">
            <EuropeDataCenterMarket />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* PDF 다운로드 버튼 */}
      <div className="flex justify-end mb-4 max-w-7xl mx-auto px-4">
        <PDFExportButton 
          elementId="epsilon-growth-strategy-section"
          filename={`Epsilon_Growth_Strategy_${sectionId}.pdf`}
          buttonText="현재 섹션 PDF 다운로드"
          variant="primary"
          size="md"
        />
      </div>
      
      <div id="epsilon-growth-strategy-section" className="max-w-7xl mx-auto px-4 py-8">
        {renderSection(sectionId)}
      </div>
    </div>
  );
}