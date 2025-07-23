import { marked } from 'marked';

/**
 * 마크다운을 HTML로 변환
 */
export function markdownToHTML(markdown: string): string {
  const html = marked(markdown);
  
  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>테이블 정의서</title>
      <style>
        /* 기본 스타일 */
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        /* 제목 스타일 */
        h1, h2, h3 {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
          page-break-after: avoid;
        }
        
        /* 테이블 스타일 */
        table {
          border-collapse: collapse;
          width: 100%;
          margin: 20px 0;
          page-break-inside: avoid;
        }
        
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
          font-size: 12px;
        }
        
        th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #2c3e50;
        }
        
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        /* 코드 스타일 */
        code {
          background-color: #f4f4f4;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        
        pre {
          background-color: #f4f4f4;
          padding: 15px;
          border-radius: 5px;
          overflow-x: auto;
          page-break-inside: avoid;
        }
        
        /* 인용구 스타일 */
        blockquote {
          border-left: 4px solid #3498db;
          margin: 0;
          padding-left: 20px;
          color: #666;
        }
        
        /* 하이라이트 스타일 */
        .highlight {
          background-color: #fff3cd;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ffeaa7;
        }
        
        /* 페이지 나누기 최적화 */
        .page-break {
          page-break-before: always;
        }
        
        /* PDF 인쇄 최적화 */
        @media print {
          body {
            font-size: 11pt;
            line-height: 1.4;
            margin: 1in;
          }
          
          h1 {
            font-size: 18pt;
            margin-top: 0;
          }
          
          h2 {
            font-size: 16pt;
          }
          
          h3 {
            font-size: 14pt;
          }
          
          table {
            font-size: 10pt;
          }
          
          th, td {
            padding: 8px;
          }
          
          /* 페이지 나누기 방지 */
          h1, h2, h3 {
            page-break-after: avoid;
          }
          
          table {
            page-break-inside: avoid;
          }
          
          /* 헤더/푸터 숨김 */
          @page {
            margin: 1in;
            size: A4;
          }
        }
        
        /* 문서 헤더 */
        .document-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #3498db;
        }
        
        .document-title {
          font-size: 24pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        
        .document-meta {
          color: #666;
          font-size: 12pt;
        }
        
        /* 테이블 섹션 */
        .table-section {
          margin-bottom: 40px;
          page-break-inside: avoid;
        }
        
        .table-title {
          font-size: 16pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 15px;
          background-color: #ecf0f1;
          padding: 10px;
          border-radius: 5px;
        }
        
        /* 요약 정보 */
        .summary-info {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
          border-left: 4px solid #3498db;
        }
        
        .summary-info h3 {
          margin-top: 0;
          border-bottom: none;
          color: #2c3e50;
        }
        
        /* 푸터 */
        .document-footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          text-align: center;
          color: #666;
          font-size: 10pt;
        }
      </style>
    </head>
    <body>
      <div class="document-header">
        <div class="document-title">📊 Strategic Data Analyzer - 테이블 정의서</div>
        <div class="document-meta">
          생성일: ${new Date().toLocaleDateString('ko-KR')} | 
          프로젝트: Strategic Data Analyzer | 
          데이터베이스: Supabase (PostgreSQL)
        </div>
      </div>
      
      ${html}
      
      <div class="document-footer">
        <p>이 문서는 자동 생성된 스키마 정보와 수동 검증된 정보를 기반으로 작성되었습니다.</p>
        <p>문서 버전: 1.0 | 최종 업데이트: ${new Date().toLocaleDateString('ko-KR')}</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * 마크다운을 PDF로 변환 (브라우저 인쇄 기능 활용)
 */
export function markdownToPDF(markdown: string, filename: string = '테이블_정의서.pdf'): void {
  const html = markdownToHTML(markdown);
  
  // 새 창에서 HTML 열기
  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(html);
    newWindow.document.close();
    
    // 인쇄 다이얼로그 열기 (PDF로 저장 가능)
    setTimeout(() => {
      newWindow.print();
    }, 1000); // 로딩 시간 증가
  }
}

/**
 * 마크다운을 다운로드 가능한 HTML 파일로 변환
 */
export function downloadMarkdownAsHTML(markdown: string, filename: string = '테이블_정의서.html'): void {
  const html = markdownToHTML(markdown);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
} 