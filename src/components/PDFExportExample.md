# PDF Export 공통 모듈 사용 가이드

## 1. 기본 사용법

```typescript
import { PDFExportButton } from '@/components/PDFExportButton';

// 컴포넌트 내에서 사용
function MyReport() {
  return (
    <div>
      {/* PDF 다운로드 버튼 */}
      <PDFExportButton 
        elementId="my-report-content"
        filename="my-report.pdf"
      />
      
      {/* PDF로 변환될 콘텐츠 */}
      <div id="my-report-content">
        <h1>보고서 제목</h1>
        <p>보고서 내용...</p>
      </div>
    </div>
  );
}
```

## 2. 시너지 매출 페이지에 적용 예시

```typescript
// src/features/SynergySales/SynergySales.tsx
import { PDFExportButton } from '../../components/PDFExportButton';

export function SynergySales() {
  return (
    <div>
      {/* 상단에 PDF 다운로드 버튼 추가 */}
      <div className="flex justify-end mb-4">
        <PDFExportButton 
          elementId="synergy-sales-content"
          filename="Synergy_Sales_Report.pdf"
          buttonText="시너지 매출 보고서 다운로드"
          variant="primary"
          size="md"
        />
      </div>
      
      {/* 기존 콘텐츠를 div로 감싸고 id 추가 */}
      <div id="synergy-sales-content">
        {/* 기존 시너지 매출 콘텐츠 */}
      </div>
    </div>
  );
}
```

## 3. Epsilon Factbook에 적용 예시

```typescript
// src/features/EpsilonFactbook/EpsilonFactbook.tsx
import { PDFExportButton } from '../../components/PDFExportButton';

export function EpsilonFactbook({ sectionId, viewMode }) {
  return (
    <div>
      {/* 조건부 렌더링으로 전체보기/섹션별 다른 버튼 */}
      <div className="flex justify-end mb-4">
        <PDFExportButton 
          elementId="factbook-content"
          filename={viewMode === 'all' 
            ? "Epsilon_Factbook_Complete.pdf" 
            : `Epsilon_Factbook_${sectionId}.pdf`
          }
          buttonText={viewMode === 'all' 
            ? "전체 Factbook PDF 다운로드" 
            : "현재 섹션 PDF 다운로드"
          }
          variant="primary"
          showIcon={true}
        />
      </div>
      
      <div id="factbook-content">
        {/* Factbook 콘텐츠 */}
      </div>
    </div>
  );
}
```

## 4. 고급 사용법 - 콜백 함수 활용

```typescript
import { PDFExportButton } from '../../components/PDFExportButton';
import { useState } from 'react';

function AdvancedReport() {
  const [exportMessage, setExportMessage] = useState('');

  return (
    <div>
      <PDFExportButton 
        elementId="advanced-report"
        filename="advanced-report.pdf"
        buttonText="보고서 다운로드"
        variant="primary"
        size="lg"
        onBeforeExport={() => {
          console.log('PDF 생성 시작...');
          setExportMessage('PDF를 생성하고 있습니다...');
        }}
        onAfterExport={(success) => {
          if (success) {
            setExportMessage('PDF가 성공적으로 다운로드되었습니다!');
            // 3초 후 메시지 제거
            setTimeout(() => setExportMessage(''), 3000);
          } else {
            setExportMessage('PDF 생성에 실패했습니다. 다시 시도해주세요.');
          }
        }}
      />
      
      {exportMessage && (
        <div className="mt-2 p-2 bg-blue-100 text-blue-700 rounded">
          {exportMessage}
        </div>
      )}
      
      <div id="advanced-report">
        {/* 보고서 콘텐츠 */}
      </div>
    </div>
  );
}
```

## 5. 스타일 커스터마이징

```typescript
// 아웃라인 스타일의 작은 버튼
<PDFExportButton 
  elementId="content"
  filename="document.pdf"
  buttonText="PDF"
  variant="outline"
  size="sm"
  showIcon={false}
/>

// 큰 사이즈의 Secondary 버튼
<PDFExportButton 
  elementId="content"
  filename="report.pdf"
  buttonText="📄 보고서 내려받기"
  variant="secondary"
  size="lg"
  showIcon={false}
/>

// 커스텀 클래스 추가
<PDFExportButton 
  elementId="content"
  filename="custom.pdf"
  className="ml-auto shadow-xl"
  variant="primary"
/>
```

## 주요 Props 설명

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `elementId` | string | required | PDF로 변환할 HTML 요소의 ID |
| `filename` | string | 'document.pdf' | 저장될 PDF 파일명 |
| `buttonText` | string | 'PDF 다운로드' | 버튼에 표시될 텍스트 |
| `variant` | 'primary' \| 'secondary' \| 'outline' | 'primary' | 버튼 스타일 |
| `size` | 'sm' \| 'md' \| 'lg' | 'md' | 버튼 크기 |
| `showIcon` | boolean | true | 다운로드 아이콘 표시 여부 |
| `className` | string | '' | 추가 CSS 클래스 |
| `onBeforeExport` | () => void | undefined | PDF 생성 전 콜백 |
| `onAfterExport` | (success: boolean) => void | undefined | PDF 생성 후 콜백 |

## 주의사항

1. **elementId는 유일해야 함**: 페이지 내에서 중복되지 않는 ID를 사용하세요.
2. **콘텐츠 준비**: PDF로 변환할 콘텐츠가 DOM에 렌더링된 후에 버튼을 클릭해야 합니다.
3. **스타일 고려**: PDF 생성 시 일부 CSS가 제대로 적용되지 않을 수 있습니다.
4. **이미지 CORS**: 외부 이미지는 CORS 정책에 따라 PDF에 포함되지 않을 수 있습니다.