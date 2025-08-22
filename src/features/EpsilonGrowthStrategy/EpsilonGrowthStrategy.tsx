import React from 'react';
import { JohorSingaporeDC } from './sections/JohorSingaporeDC';
import { SEACableDirect } from './sections/SEACableDirect';
import { SEAPoPExpansion } from './sections/SEAPoPExpansion';
import { SingaporeEuropeIRU } from './sections/SingaporeEuropeIRU';
import { AustraliaCableIRU } from './sections/AustraliaCableIRU';
import { DataReferences } from './sections/DataReferences';

interface EpsilonGrowthStrategyProps {
  sectionId?: string;
  viewMode?: 'section' | 'all';
}

export function EpsilonGrowthStrategy({ sectionId = 'johor-singapore-dc', viewMode = 'section' }: EpsilonGrowthStrategyProps) {
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
      default:
        return <JohorSingaporeDC />;
    }
  };

  if (viewMode === 'all') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <JohorSingaporeDC />
        <div className="border-t-2 border-gray-200 my-12"></div>
        <SEACableDirect />
        <div className="border-t-2 border-gray-200 my-12"></div>
        <SEAPoPExpansion />
        <div className="border-t-2 border-gray-200 my-12"></div>
        <SingaporeEuropeIRU />
        <div className="border-t-2 border-gray-200 my-12"></div>
        <AustraliaCableIRU />
        <div className="border-t-2 border-gray-200 my-12"></div>
        <DataReferences />
      </div>
    );
  }

  return <div className="max-w-7xl mx-auto px-4 py-8">{renderSection(sectionId)}</div>;
}