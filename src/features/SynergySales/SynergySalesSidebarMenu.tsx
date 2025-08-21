import React from 'react';
import { synergySalesToc } from './SynergySalesTocData';

interface SynergySalesSidebarMenuProps {
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
  onToggle?: () => void;
}

export function SynergySalesSidebarMenu({
  currentSection,
  onSectionChange,
  onToggle,
}: SynergySalesSidebarMenuProps) {
  return (
    <div className="w-64 bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">목차</h3>
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-1.5 hover:bg-gray-200 rounded-md transition-colors"
            aria-label="사이드바 닫기"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
      </div>
      <nav className="space-y-2">
        {synergySalesToc.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              currentSection === item.id
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
} 