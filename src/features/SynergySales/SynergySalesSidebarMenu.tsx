import React from 'react';
import { synergySalesToc } from './SynergySalesTocData';

interface SynergySalesSidebarMenuProps {
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function SynergySalesSidebarMenu({
  currentSection,
  onSectionChange,
}: SynergySalesSidebarMenuProps) {
  return (
    <div className="w-64 bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">목차</h3>
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