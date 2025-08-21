import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF(elementId: string, filename: string = 'document.pdf') {
  try {
    // PDF 생성 중 표시할 로딩 인디케이터 생성
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 24px; height: 24px; border: 3px solid #3B82F6; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <span style="font-size: 16px; color: #374151;">PDF 생성 중...</span>
          </div>
        </div>
      </div>
      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
    document.body.appendChild(loadingDiv);

    // 내보낼 요소 찾기
    const element = document.getElementById(elementId);
    if (!element) {
      document.body.removeChild(loadingDiv);
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // 원본 스타일 저장 및 임시 컨테이너 생성
    const originalStyle = element.style.cssText;
    const originalParent = element.parentElement;
    const originalNextSibling = element.nextSibling;
    
    // 임시 컨테이너 생성 (화면에 보이지 않도록)
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '1200px';
    document.body.appendChild(tempContainer);
    
    // 요소를 임시 컨테이너로 이동
    tempContainer.appendChild(element);
    
    // PDF용 스타일 적용
    element.style.width = '1200px';
    element.style.maxWidth = 'none';
    element.style.padding = '20px';
    
    // 요소의 자식 요소들을 섹션별로 나누어 처리
    const sections = element.querySelectorAll('section, div.section, article');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - (margin * 2);
    const contentHeight = pageHeight - (margin * 2);
    
    let isFirstPage = true;
    let currentY = margin;
    
    // 섹션이 없으면 전체를 하나의 섹션으로 처리
    const elementsToProcess = sections.length > 0 ? Array.from(sections) : [element];
    
    for (const section of elementsToProcess) {
      try {
        // 각 섹션을 개별적으로 캔버스로 변환
        const canvas = await html2canvas(section as HTMLElement, {
          scale: 1.5, // 메모리 절약을 위해 scale 축소
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 1200,
          removeContainer: false
        });
        
        // 캔버스를 JPEG로 변환 (PNG보다 작은 크기)
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        
        // 이미지 크기 계산
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // 새 페이지가 필요한지 확인
        if (currentY + imgHeight > pageHeight - margin) {
          if (!isFirstPage) {
            pdf.addPage();
          }
          currentY = margin;
        }
        
        // 이미지가 한 페이지보다 크면 여러 페이지로 분할
        if (imgHeight > contentHeight) {
          const pagesNeeded = Math.ceil(imgHeight / contentHeight);
          
          for (let i = 0; i < pagesNeeded; i++) {
            if (!isFirstPage && i > 0) {
              pdf.addPage();
            }
            
            const yOffset = -i * contentHeight;
            pdf.addImage(
              imgData, 
              'JPEG', 
              margin, 
              margin + yOffset, 
              imgWidth, 
              imgHeight
            );
            
            isFirstPage = false;
          }
          currentY = margin;
        } else {
          // 이미지를 현재 페이지에 추가
          pdf.addImage(imgData, 'JPEG', margin, currentY, imgWidth, imgHeight);
          currentY += imgHeight + 5; // 섹션 간 간격
          isFirstPage = false;
        }
        
      } catch (sectionError) {
        console.warn('Failed to process section:', sectionError);
        // 섹션 처리 실패 시 계속 진행
      }
    }
    
    // 원본 위치로 요소 복원
    if (originalParent) {
      originalParent.insertBefore(element, originalNextSibling);
    }
    element.style.cssText = originalStyle;
    
    // 임시 컨테이너 제거
    document.body.removeChild(tempContainer);
    
    // PDF 저장
    pdf.save(filename);
    
    // 로딩 인디케이터 제거
    document.body.removeChild(loadingDiv);
    
    console.log(`PDF saved as ${filename}`);
    return true;
    
  } catch (error) {
    console.error('PDF export failed:', error);
    
    // 로딩 인디케이터 제거
    const loadingDiv = document.querySelector('div[style*="position: fixed"]');
    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }
    
    // 원본 상태 복원 시도
    const element = document.getElementById(elementId);
    if (element && element.parentElement?.style.position === 'absolute') {
      document.body.appendChild(element);
    }
    
    // 에러 알림
    alert(`PDF 생성에 실패했습니다: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}