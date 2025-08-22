import React from 'react';
import { ExternalLink, FileText } from 'lucide-react';

interface DataLinkProps {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
}

export function DataLink({ href, children, isExternal = false }: DataLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isExternal && href.startsWith('#')) {
      // 현재 페이지의 URL 파라미터 가져오기
      const currentUrl = new URL(window.location.href);
      
      // view와 sectionId 파라미터 설정
      currentUrl.searchParams.set('view', 'epsilon-growth');
      currentUrl.searchParams.set('sectionId', 'data-references');
      
      // 브라우저 히스토리 업데이트 (페이지 리로드 없이)
      window.history.pushState(null, '', currentUrl.toString());
      
      // React 라우터가 있는 경우를 위해 이벤트 발생
      window.dispatchEvent(new PopStateEvent('popstate'));
      
      // 잠시 대기 후 해당 요소로 스크롤
      setTimeout(() => {
        const targetId = href.substring(1); // # 제거
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn(`Element with id "${targetId}" not found`);
        }
      }, 300);
    }
  };

  if (isExternal) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
      >
        {children}
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }

  return (
    <a 
      href={href}
      onClick={handleClick}
      className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
    >
      {children}
      <FileText className="w-3 h-3" />
    </a>
  );
}