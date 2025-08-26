import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateSectionPDF = async (
  elementId: string,
  fileName: string,
  setIsGenerating: (value: boolean) => void
) => {
  setIsGenerating(true);
  
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Report element not found');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;
    const contentWidth = pageWidth - (margin * 2);
    const contentHeight = pageHeight - (margin * 2);

    // 각 섹션을 순회하며 PDF에 추가
    const sections = element.querySelectorAll('.pdf-section');
    let isFirstPage = true;

    if (sections.length === 0) {
      // pdf-section 클래스가 없으면 전체 요소를 캡처
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200
      });

      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * contentWidth) / imgProps.width;
      
      // 이미지가 페이지보다 크면 여러 페이지로 분할
      if (imgHeight > contentHeight) {
        let position = 0;
        while (position < imgHeight) {
          if (position > 0) {
            pdf.addPage();
          }
          pdf.addImage(imgData, 'PNG', margin, margin - position, contentWidth, imgHeight);
          position += contentHeight;
        }
      } else {
        pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, imgHeight);
      }
    } else {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        
        if (!isFirstPage) {
          pdf.addPage();
        }
        
        const canvas = await html2canvas(section, {
          scale: 2,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 1200
        });

        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * contentWidth) / imgProps.width;
        
        // 이미지가 페이지보다 크면 여러 페이지로 분할
        if (imgHeight > contentHeight) {
          let position = 0;
          while (position < imgHeight) {
            if (position > 0) {
              pdf.addPage();
            }
            pdf.addImage(imgData, 'PNG', margin, margin - position, contentWidth, imgHeight);
            position += contentHeight;
          }
        } else {
          pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, imgHeight);
        }
        
        isFirstPage = false;
      }
    }

    // PDF 저장
    pdf.save(fileName);

  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('PDF 생성 중 오류가 발생했습니다.');
  } finally {
    setIsGenerating(false);
  }
};