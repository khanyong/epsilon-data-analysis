import React, { useState } from 'react';
import { SynergySalesReport } from './SynergySalesReport';
import { SynergySalesSidebarMenu } from './SynergySalesSidebarMenu';
import { SynergySalesDashboard } from './SynergySalesDashboard';
import { synergySalesToc } from './SynergySalesTocData';

export function SynergySales({
  sectionId,
  viewMode,
}: {
  sectionId?: string;
  viewMode?: 'section' | 'all' | 'dashboard';
}) {
  const [currentSection, setCurrentSection] = useState(sectionId || 'overview');
  const [currentViewMode, setCurrentViewMode] = useState<'section' | 'all' | 'dashboard'>(viewMode || 'section');

  // props가 변경될 때 상태 업데이트
  React.useEffect(() => {
    if (viewMode) {
      setCurrentViewMode(viewMode);
    }
    if (sectionId) {
      setCurrentSection(sectionId);
      // 1번 대쉬보드일 때는 대시보드 모드로 강제 전환
      if (sectionId === 'overview') {
        setCurrentViewMode('dashboard');
      }
    }
  }, [viewMode, sectionId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg font-bold">S</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">시너지 매출</h1>
                  <p className="text-sm text-gray-500">시너지 효과 및 매출 분석</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentViewMode('dashboard')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentViewMode === 'dashboard'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  대시보드
                </button>
                <button
                  onClick={() => setCurrentViewMode('section')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentViewMode === 'section'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  목차별 보기
                </button>
                <button
                  onClick={() => setCurrentViewMode('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentViewMode === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  전체 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentViewMode === 'dashboard' && currentSection === 'overview' ? (
          <SynergySalesDashboard />
        ) : (
          <div className="flex gap-8">
            {currentViewMode === 'section' && currentSection !== 'db-analysis' && currentSection !== 'annual-data' && (
              <SynergySalesSidebarMenu
                currentSection={currentSection}
                onSectionChange={setCurrentSection}
              />
            )}
            <div className="flex-1">
              <SynergySalesReport
                sectionId={currentSection}
                viewMode={currentViewMode === 'dashboard' ? 'section' : currentViewMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { synergySalesToc as toc }; 