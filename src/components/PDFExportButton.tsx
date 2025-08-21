import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { exportToPDF } from '../utils/pdfExport';

interface PDFExportButtonProps {
  /**
   * HTML 요소의 ID - PDF로 변환할 콘텐츠를 감싸는 요소의 ID
   */
  elementId: string;
  
  /**
   * 저장될 PDF 파일명 (기본값: document.pdf)
   */
  filename?: string;
  
  /**
   * 버튼 텍스트 (기본값: PDF 다운로드)
   */
  buttonText?: string;
  
  /**
   * 버튼 스타일 커스터마이징을 위한 className
   */
  className?: string;
  
  /**
   * 버튼 variant 스타일
   */
  variant?: 'primary' | 'secondary' | 'outline';
  
  /**
   * 버튼 크기
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * 아이콘 표시 여부
   */
  showIcon?: boolean;
  
  /**
   * PDF 생성 전 콜백
   */
  onBeforeExport?: () => void;
  
  /**
   * PDF 생성 후 콜백
   */
  onAfterExport?: (success: boolean) => void;
}

export function PDFExportButton({
  elementId,
  filename = 'document.pdf',
  buttonText = 'PDF 다운로드',
  className = '',
  variant = 'primary',
  size = 'md',
  showIcon = true,
  onBeforeExport,
  onAfterExport
}: PDFExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // 생성 전 콜백 실행
      if (onBeforeExport) {
        onBeforeExport();
      }
      
      // PDF 생성
      const success = await exportToPDF(elementId, filename);
      
      // 생성 후 콜백 실행
      if (onAfterExport) {
        onAfterExport(success);
      }
    } catch (error) {
      console.error('PDF export failed:', error);
      if (onAfterExport) {
        onAfterExport(false);
      }
    } finally {
      setIsExporting(false);
    }
  };

  // 버튼 스타일 결정
  const getButtonStyles = () => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    // 크기별 스타일
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5'
    };
    
    // 변형별 스타일
    const variantStyles = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg focus:ring-blue-500 disabled:bg-blue-400',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-lg focus:ring-gray-500 disabled:bg-gray-400',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 disabled:border-gray-400 disabled:text-gray-400'
    };
    
    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  };

  // 아이콘 크기 결정
  const getIconSize = () => {
    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };
    return iconSizes[size];
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={getButtonStyles()}
      aria-label={buttonText}
    >
      {isExporting ? (
        <>
          <svg 
            className={`${getIconSize()} animate-spin`} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>생성 중...</span>
        </>
      ) : (
        <>
          {showIcon && <Download className={getIconSize()} />}
          <span>{buttonText}</span>
        </>
      )}
    </button>
  );
}

/**
 * 사용 예시:
 * 
 * 1. 기본 사용법:
 * <PDFExportButton 
 *   elementId="content-to-export" 
 *   filename="my-report.pdf" 
 * />
 * 
 * 2. 커스터마이징:
 * <PDFExportButton 
 *   elementId="report-content"
 *   filename="sales-report-2024.pdf"
 *   buttonText="보고서 다운로드"
 *   variant="secondary"
 *   size="lg"
 *   showIcon={true}
 *   onBeforeExport={() => console.log('PDF 생성 시작')}
 *   onAfterExport={(success) => {
 *     if (success) {
 *       alert('PDF가 성공적으로 다운로드되었습니다.');
 *     }
 *   }}
 * />
 * 
 * 3. 스타일 커스터마이징:
 * <PDFExportButton 
 *   elementId="custom-content"
 *   filename="custom.pdf"
 *   className="ml-auto mr-4"
 *   variant="outline"
 *   size="sm"
 * />
 */