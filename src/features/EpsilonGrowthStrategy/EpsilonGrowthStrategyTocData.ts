interface TocItem {
  id: string;
  label: string;
  subsections?: {
    id: string;
    label: string;
  }[];
}

export const epsilonGrowthStrategyToc: TocItem[] = [
  { 
    id: 'johor-singapore-dc', 
    label: '1. 조호바르DC/싱가포르 DC 구축',
    subsections: [
      { id: 'johor-overview', label: '투자 개요' },
      { id: 'johor-market', label: '시장 분석' },
      { id: 'johor-location', label: '최적 입지 분석' },
      { id: 'johor-financial', label: '재무 분석' },
      { id: 'johor-risk', label: '위험 관리' },
      { id: 'johor-appendix-1', label: '별첨 1: 기술 용어' },
      { id: 'johor-appendix-2', label: '별첨 2: 시장 상세' },
      { id: 'johor-appendix-3', label: '별첨 3: 재무 모델링' },
      { id: 'johor-appendix-4', label: '별첨 4: 규제 환경' },
      { id: 'johor-appendix-5', label: '별첨 5: 실행 로드맵' }
    ]
  },
  { 
    id: 'sea-cable-direct', 
    label: '2. 동남아 해저케이블 직접 구축',
    subsections: [
      { id: 'seacable-overview', label: '투자 개요' },
      { id: 'seacable-route', label: '케이블 루트 분석' },
      { id: 'seacable-landing', label: 'Landing Party 전략' },
      { id: 'seacable-financial', label: '재무 분석' },
      { id: 'seacable-risk', label: '위험 관리' },
      { id: 'seacable-appendix-1', label: '별첨 1: 기술 용어' },
      { id: 'seacable-appendix-2', label: '별첨 2: 경쟁 환경' },
      { id: 'seacable-appendix-3', label: '별첨 3: 재무 모델링' },
      { id: 'seacable-appendix-4', label: '별첨 4: 법적 규제' }
    ]
  },
  { 
    id: 'sea-pop-expansion', 
    label: '3. 동남아 PoP 확대 구축',
    subsections: [
      { id: 'pop-overview', label: '확장 개요' },
      { id: 'pop-thailand', label: '태국 PoP' },
      { id: 'pop-vietnam', label: '베트남 PoP' },
      { id: 'pop-indonesia', label: '인도네시아 PoP' },
      { id: 'pop-financial', label: '통합 재무 분석' },
      { id: 'pop-risk', label: '위험 관리' },
      { id: 'pop-appendix-1', label: '별첨 1: 기술 용어' },
      { id: 'pop-appendix-2', label: '별첨 2: 국가별 시장' },
      { id: 'pop-appendix-3', label: '별첨 3: 재무 모델링' },
      { id: 'pop-appendix-4', label: '별첨 4: 규제 환경' },
      { id: 'pop-appendix-5', label: '별첨 5: 실행 로드맵' }
    ]
  },
  { 
    id: 'singapore-europe-iru', 
    label: '4. 싱가포르-유럽 관련 IRU',
    subsections: [
      { id: 'iru-overview', label: '투자 개요' },
      { id: 'iru-marseille', label: '마르세유 전략' },
      { id: 'iru-route', label: '케이블 루트 분석' },
      { id: 'iru-financial', label: '재무 분석' },
      { id: 'iru-risk', label: '위험 관리' },
      { id: 'iru-appendix-1', label: '별첨 1: 기술 용어' },
      { id: 'iru-appendix-2', label: '별첨 2: 마르세유 vs 런던' },
      { id: 'iru-appendix-3', label: '별첨 3: 재무 모델링' },
      { id: 'iru-appendix-4', label: '별첨 4: 법적 규제' },
      { id: 'iru-appendix-5', label: '별첨 5: NTT 현황 분석' },
      { id: 'iru-appendix-6', label: '별첨 6: 실행 로드맵' }
    ]
  },
  { 
    id: 'australia-cable-iru', 
    label: '5. 호주 해저케이블 IRU/리스',
    subsections: [
      { id: 'aus-overview', label: '투자 개요' },
      { id: 'aus-perth', label: '퍼스 전략' },
      { id: 'aus-cable', label: '케이블 시스템 분석' },
      { id: 'aus-financial', label: '재무 분석' },
      { id: 'aus-risk', label: '위험 관리' },
      { id: 'aus-appendix-1', label: '별첨 1: 기술 용어' },
      { id: 'aus-appendix-2', label: '별첨 2: 경쟁사 분석' },
      { id: 'aus-appendix-3', label: '별첨 3: 재무 모델링' },
      { id: 'aus-appendix-4', label: '별첨 4: 법적 규제' },
      { id: 'aus-appendix-5', label: '별첨 5: 실행 로드맵' }
    ]
  },
  { 
    id: 'data-references', 
    label: '6. 근거 자료 및 세부 데이터',
    subsections: [
      { id: 'ref-sources', label: '주요 데이터 출처' },
      { id: 'ref-methodology', label: '분석 방법론' },
      { id: 'ref-glossary', label: '용어 정의' },
      { id: 'ref-updates', label: '최신 업데이트' }
    ]
  },
  {
    id: 'europe-datacenter-market',
    label: '[추가] 유럽 DC 시장 분석',
    subsections: [
      { id: 'europe-overview', label: 'Executive Summary' },
      { id: 'europe-market-structure', label: '시장 구조 변화' },
      { id: 'europe-ix-ecosystem', label: 'IX 생태계 분석' },
      { id: 'europe-connectivity', label: 'Connectivity 사업자' },
      { id: 'europe-bridge', label: '아시아-유럽 Bridge' },
      { id: 'europe-strategy', label: 'KT 진입 전략' },
      { id: 'europe-financial', label: '재무 분석' },
      { id: 'europe-risk', label: '위험 관리' },
      { id: 'europe-roadmap', label: '실행 로드맵' }
    ]
  }
];