import React, { useEffect, useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';

interface NavSection {
  id: string;
  title: string;
  subsections?: {
    id: string;
    title: string;
  }[];
}

const navigationStructure: NavSection[] = [
  {
    id: 'johor-singapore-dc',
    title: '1. 조호바르-싱가포르 DC',
    subsections: [
      { id: 'johor-overview', title: '투자 개요' },
      { id: 'johor-market', title: '시장 분석' },
      { id: 'johor-location', title: '최적 입지 분석' },
      { id: 'johor-financial', title: '재무 분석' },
      { id: 'johor-risk', title: '위험 관리' },
      { id: 'johor-appendix-1', title: '별첨 1: 기술 용어' },
      { id: 'johor-appendix-2', title: '별첨 2: 시장 상세' },
      { id: 'johor-appendix-3', title: '별첨 3: 재무 모델링' },
      { id: 'johor-appendix-4', title: '별첨 4: 규제 환경' },
      { id: 'johor-appendix-5', title: '별첨 5: 실행 로드맵' }
    ]
  },
  {
    id: 'sea-cable-direct',
    title: '2. SEA-H2X Cable Direct',
    subsections: [
      { id: 'seacable-overview', title: '투자 개요' },
      { id: 'seacable-route', title: '케이블 루트 분석' },
      { id: 'seacable-landing', title: 'Landing Party 전략' },
      { id: 'seacable-financial', title: '재무 분석' },
      { id: 'seacable-risk', title: '위험 관리' },
      { id: 'seacable-appendix-1', title: '별첨 1: 기술 용어' },
      { id: 'seacable-appendix-2', title: '별첨 2: 경쟁 환경' },
      { id: 'seacable-appendix-3', title: '별첨 3: 재무 모델링' },
      { id: 'seacable-appendix-4', title: '별첨 4: 법적 규제' }
    ]
  },
  {
    id: 'sea-pop-expansion',
    title: '3. 동남아 PoP 확장',
    subsections: [
      { id: 'pop-overview', title: '확장 개요' },
      { id: 'pop-thailand', title: '태국 PoP' },
      { id: 'pop-vietnam', title: '베트남 PoP' },
      { id: 'pop-indonesia', title: '인도네시아 PoP' },
      { id: 'pop-financial', title: '통합 재무 분석' },
      { id: 'pop-risk', title: '위험 관리' },
      { id: 'pop-appendix-1', title: '별첨 1: 기술 용어' },
      { id: 'pop-appendix-2', title: '별첨 2: 국가별 시장' },
      { id: 'pop-appendix-3', title: '별첨 3: 재무 모델링' },
      { id: 'pop-appendix-4', title: '별첨 4: 규제 환경' },
      { id: 'pop-appendix-5', title: '별첨 5: 실행 로드맵' }
    ]
  },
  {
    id: 'singapore-europe-iru',
    title: '4. 싱가포르-유럽 IRU',
    subsections: [
      { id: 'iru-overview', title: '투자 개요' },
      { id: 'iru-marseille', title: '마르세유 전략' },
      { id: 'iru-route', title: '케이블 루트 분석' },
      { id: 'iru-financial', title: '재무 분석' },
      { id: 'iru-risk', title: '위험 관리' },
      { id: 'iru-appendix-1', title: '별첨 1: 기술 용어' },
      { id: 'iru-appendix-2', title: '별첨 2: 마르세유 vs 런던' },
      { id: 'iru-appendix-3', title: '별첨 3: 재무 모델링' },
      { id: 'iru-appendix-4', title: '별첨 4: 법적 규제' },
      { id: 'iru-appendix-5', title: '별첨 5: NTT 현황 분석' },
      { id: 'iru-appendix-6', title: '별첨 6: 실행 로드맵' }
    ]
  },
  {
    id: 'australia-cable-iru',
    title: '5. 호주 케이블 IRU',
    subsections: [
      { id: 'aus-overview', title: '투자 개요' },
      { id: 'aus-perth', title: '퍼스 전략' },
      { id: 'aus-cable', title: '케이블 시스템 분석' },
      { id: 'aus-financial', title: '재무 분석' },
      { id: 'aus-risk', title: '위험 관리' },
      { id: 'aus-appendix-1', title: '별첨 1: 기술 용어' },
      { id: 'aus-appendix-2', title: '별첨 2: 경쟁사 분석' },
      { id: 'aus-appendix-3', title: '별첨 3: 재무 모델링' },
      { id: 'aus-appendix-4', title: '별첨 4: 법적 규제' },
      { id: 'aus-appendix-5', title: '별첨 5: 실행 로드맵' }
    ]
  },
  {
    id: 'data-references',
    title: '6. 데이터 참조',
    subsections: [
      { id: 'ref-sources', title: '주요 데이터 출처' },
      { id: 'ref-methodology', title: '분석 방법론' },
      { id: 'ref-glossary', title: '용어 정의' },
      { id: 'ref-updates', title: '최신 업데이트' }
    ]
  }
];

interface SidebarNavigationProps {
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
  viewMode: 'section' | 'all';
}

export function SidebarNavigation({ 
  currentSection, 
  onSectionChange, 
  viewMode 
}: SidebarNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubsection, setActiveSubsection] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<string[]>([currentSection]);

  useEffect(() => {
    if (viewMode === 'all') {
      // 전체 보기 모드에서는 스크롤 스파이 기능 활성화
      const handleScroll = () => {
        const sections = document.querySelectorAll('[data-section-id]');
        let currentSectionId = '';
        
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            currentSectionId = section.getAttribute('data-section-id') || '';
          }
        });
        
        if (currentSectionId) {
          setActiveSubsection(currentSectionId);
          // 해당 섹션의 부모 챕터 찾기
          const parentChapter = navigationStructure.find(chapter => 
            chapter.subsections?.some(sub => sub.id === currentSectionId)
          );
          if (parentChapter && !expandedSections.includes(parentChapter.id)) {
            setExpandedSections(prev => [...prev, parentChapter.id]);
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [viewMode, expandedSections]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleNavClick = (sectionId: string, subsectionId?: string) => {
    if (viewMode === 'section') {
      onSectionChange(sectionId);
    } else {
      // 전체 보기 모드에서는 앵커로 스크롤
      const element = document.getElementById(subsectionId || sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* 모바일 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 사이드바 */}
      <div className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white shadow-xl z-40
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">목차</h3>
          
          <nav className="space-y-2">
            {navigationStructure.map((section) => (
              <div key={section.id} className="border-b border-gray-200 pb-2">
                <div
                  className={`
                    flex items-center justify-between p-2 rounded-lg cursor-pointer
                    hover:bg-gray-100 transition-colors
                    ${currentSection === section.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                  `}
                  onClick={() => {
                    toggleSection(section.id);
                    handleNavClick(section.id);
                  }}
                >
                  <span className="font-medium text-sm">{section.title}</span>
                  <ChevronRight 
                    size={16} 
                    className={`
                      transition-transform
                      ${expandedSections.includes(section.id) ? 'rotate-90' : ''}
                    `}
                  />
                </div>
                
                {/* 하위 섹션 */}
                {expandedSections.includes(section.id) && section.subsections && (
                  <div className="ml-4 mt-1 space-y-1">
                    {section.subsections.map((subsection) => (
                      <div
                        key={subsection.id}
                        className={`
                          p-2 pl-4 text-sm cursor-pointer rounded
                          hover:bg-gray-100 transition-colors
                          ${activeSubsection === subsection.id ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600' : 'text-gray-600'}
                        `}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavClick(section.id, subsection.id);
                          setActiveSubsection(subsection.id);
                        }}
                      >
                        {subsection.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* 오버레이 (모바일) */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}