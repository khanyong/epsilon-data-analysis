import React, { useState } from 'react';
import { factbookToc } from './FactbookTocData';

export function FactbookSidebarMenu() {
  // Factbook 메뉴 자체의 펼침/접힘 상태
  const [open, setOpen] = useState(true); // 기본은 펼쳐진 상태로 시작
  // 각 챕터별 펼침/접힘 상태
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleFactbook = () => setOpen(v => !v);
  const toggle = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(openId => openId !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white border-t border-gray-300 shadow-inner rounded-t-xl p-2 mt-2">
      <button
        className={`w-full flex items-center justify-between px-2 py-2 rounded hover:bg-blue-50 text-base font-bold text-blue-800 transition-colors ${open ? 'bg-blue-100' : ''}`}
        onClick={toggleFactbook}
        aria-expanded={open}
        aria-controls="factbook-toc-list"
      >
        <span>📖 Epsilon Factbook</span>
        <span className="ml-2">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ul id="factbook-toc-list" className="space-y-1 mt-2">
          {factbookToc.map(item => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center justify-between px-2 py-1 rounded hover:bg-blue-50 text-sm text-blue-700 transition-colors ${openIds.includes(item.id) ? 'font-bold bg-blue-100' : ''}`}
                onClick={() => toggle(item.id)}
                aria-expanded={openIds.includes(item.id)}
                aria-controls={`factbook-section-${item.id}`}
              >
                <span>{item.label}</span>
                <span className="ml-2">{openIds.includes(item.id) ? '▲' : '▼'}</span>
              </button>
              {/* 펼쳐진 경우 하위 내용 표시 (예시: 바로가기) */}
              {openIds.includes(item.id) && (
                <div id={`factbook-section-${item.id}`} className="pl-4 py-1">
                  <a
                    href={`#${item.id}`}
                    className="text-blue-600 underline text-xs hover:text-blue-900"
                    onClick={() => {
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    해당 섹션으로 이동
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
