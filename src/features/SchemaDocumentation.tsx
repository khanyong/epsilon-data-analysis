import React, { useState, useEffect } from 'react';
import { getAllTableSchemas, generateSchemaMarkdown, generateSchemaCSV, TableSchema } from '../utils/schemaExtractor';
import { downloadMarkdownAsHTML, markdownToPDF } from '../utils/pdfConverter';
import { marked } from 'marked';

// 수동 테이블 정의서 데이터
const MANUAL_SCHEMA_DATA = `# 📊 Strategic Data Analyzer - 테이블 정의서

**생성일**: ${new Date().toLocaleDateString('ko-KR')}  
**프로젝트**: Strategic Data Analyzer  
**데이터베이스**: Supabase (PostgreSQL)

---

## 📋 테이블 목록

### 1. rfq_middlemile
- **설명**: RFQ(견적) 데이터 - 중간마일 분석용
- **용도**: 견적 데이터의 국가별, 도시별 분석

### 2. sof_middlemile  
- **설명**: SOF(주문) 데이터 - 중간마일 분석용
- **용도**: 주문 데이터의 상태별, 제품별 분석

### 3. kotra
- **설명**: KOTRA 수출입 데이터
- **용도**: 국가별, 품목별 수출입 현황 분석

### 4. hyundai_motors
- **설명**: Hyundai Motor Group 글로벌 법인 및 시설 정보
- **용도**: 글로벌 법인 위치 및 기능 분석

### 5. vpn_connections
- **설명**: VPN 연결 정보 및 고객사 해외 주소 데이터
- **용도**: VPN 연결 현황 및 고객사 위치 분석

### 6. epsilon_pops
- **설명**: Epsilon PoP(Point of Presence) 데이터
- **용도**: 네트워크 인프라 분석

### 7. kt_pops
- **설명**: KT PoP(Point of Presence) 데이터  
- **용도**: KT 네트워크 인프라 분석

---

## 📊 상세 스키마

### 1. hyundai_motors

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | 설명 |
|--------|-------------|-----------|--------|------|
| id | UUID | NO | gen_random_uuid() | 기본키 |
| company_name | TEXT | NO | - | 회사명 (Hyundai Motors, Kia Motors, etc.) |
| group_subsidiary | TEXT | YES | - | 그룹/계열사 구분 |
| entity_name_code | TEXT | YES | - | 법인명/코드 |
| function | TEXT | YES | - | 기능 (Sales Entity, Production entity, Laboratory, etc.) |
| region | TEXT | YES | - | 지역 (Asia, Europe, Americas, etc.) |
| region_detail | TEXT | YES | - | 세부 지역 |
| country | TEXT | NO | - | 국가 |
| city | TEXT | NO | - | 도시 |
| postal_address | TEXT | YES | - | 우편 주소 |
| created_at | TIMESTAMP WITH TIME ZONE | YES | NOW() | 생성일시 |
| updated_at | TIMESTAMP WITH TIME ZONE | YES | NOW() | 수정일시 |

**인덱스**:
- idx_hyundai_motors_country
- idx_hyundai_motors_city  
- idx_hyundai_motors_region
- idx_hyundai_motors_company
- idx_hyundai_motors_function

---

### 2. vpn_connections

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | 설명 |
|--------|-------------|-----------|--------|------|
| id | UUID | NO | gen_random_uuid() | 기본키 |
| customer | TEXT | NO | - | 고객사명 |
| customer_name | TEXT | NO | - | 고객사 상세명 |
| a_end_pop | TEXT | YES | - | A-end 해외사업자 연동 PoP |
| b_end_address | TEXT | YES | - | B-end 고객사 해외 주소 |
| country | TEXT | NO | - | 국가 |
| city | TEXT | YES | - | 도시 |
| created_at | TIMESTAMP WITH TIME ZONE | YES | NOW() | 생성일시 |
| updated_at | TIMESTAMP WITH TIME ZONE | YES | NOW() | 수정일시 |

**인덱스**:
- idx_vpn_connections_customer
- idx_vpn_connections_country
- idx_vpn_connections_city
- idx_vpn_connections_pop

---

### 3. kt_pops

| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | 설명 |
|--------|-------------|-----------|--------|------|
| id | UUID | NO | gen_random_uuid() | 기본키 |
| pop_name | TEXT | NO | - | PoP 이름 |
| country | TEXT | NO | - | 국가 |
| city | TEXT | NO | - | 도시 |
| address | TEXT | YES | - | 주소 |
| created_at | TIMESTAMP WITH TIME ZONE | YES | NOW() | 생성일시 |

**인덱스**:
- idx_kt_pops_country
- idx_kt_pops_city

---

## 🔒 보안 설정

### Row Level Security (RLS)
모든 테이블에 RLS가 활성화되어 있으며, 다음 정책이 적용됩니다:

1. **읽기 정책**: 모든 사용자가 읽기 가능
2. **쓰기 정책**: 인증된 사용자만 삽입/수정/삭제 가능

---

## 📈 데이터 분석 기능

### 피벗 테이블 분석
- **다단계 피벗**: 최대 N단계까지 계층적 그룹화
- **드래그앤드롭**: 컬럼 순서 변경 가능
- **값 필터링**: 각 컬럼별로 특정 값만 선택하여 분석
- **동적 통계**: 총 건수, 금액, 국가 수 등 실시간 계산

### 지원 데이터 소스
- **RFQ (견적 데이터)**: Country A/B, 도시, 금액 분석
- **SOF (주문 데이터)**: 주문 상태, 제품별 분석  
- **KOTRA (수출입 데이터)**: 국가별, 품목별 수출입 현황

---

## 🛠 기술 스택

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Charts**: Recharts
- **Backend**: Supabase (PostgreSQL)
- **Build Tool**: Vite

---

## 📝 참고사항

1. **데이터 로딩**: 페이지네이션을 통한 대용량 데이터 처리 (5,000개씩 분할)
2. **성능 최적화**: 컬럼별 인덱스 생성으로 조회 성능 향상
3. **보안**: RLS 정책으로 데이터 접근 제어
4. **확장성**: 새로운 테이블 추가 시 자동 스키마 감지 지원

---

*이 문서는 자동 생성된 스키마 정보와 수동 검증된 정보를 기반으로 작성되었습니다.*`;

export function SchemaDocumentation() {
  const [schemas, setSchemas] = useState<TableSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useManualData, setUseManualData] = useState(false);

  // 스키마 정보 로드
  const loadSchemas = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getAllTableSchemas();
      setSchemas(data);
      setUseManualData(false);
    } catch (err) {
      console.warn('Supabase 연결 실패, 수동 데이터 사용:', err);
      setError(err instanceof Error ? err.message : '스키마 정보를 불러오는데 실패했습니다.');
      setUseManualData(true);
    } finally {
      setLoading(false);
    }
  };

  // 마크다운 다운로드
  const downloadMarkdown = () => {
    const markdown = useManualData ? MANUAL_SCHEMA_DATA : generateSchemaMarkdown(schemas);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `테이블_정의서_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // CSV 다운로드
  const downloadCSV = () => {
    if (!useManualData && schemas.length === 0) {
      alert('다운로드할 스키마 정보가 없습니다.');
      return;
    }

    const csv = useManualData ? 
      '테이블명,컬럼명,데이터타입,NULL허용,기본값,설명\n' +
      'hyundai_motors,id,UUID,NO,gen_random_uuid(),기본키\n' +
      'hyundai_motors,company_name,TEXT,NO,-,회사명\n' +
      'hyundai_motors,country,TEXT,NO,-,국가\n' +
      'vpn_connections,id,UUID,NO,gen_random_uuid(),기본키\n' +
      'vpn_connections,customer,TEXT,NO,-,고객사명\n' +
      'kt_pops,id,UUID,NO,gen_random_uuid(),기본키\n' +
      'kt_pops,pop_name,TEXT,NO,-,PoP 이름' :
      generateSchemaCSV(schemas);
      
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `테이블_정의서_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // HTML 다운로드 (웹 브라우저에서 바로 열 수 있음)
  const downloadHTML = () => {
    const markdown = useManualData ? MANUAL_SCHEMA_DATA : generateSchemaMarkdown(schemas);
    downloadMarkdownAsHTML(markdown, `테이블_정의서_${new Date().toISOString().split('T')[0]}.html`);
  };

  // PDF 변환 (브라우저 인쇄 기능 활용)
  const convertToPDF = () => {
    const markdown = useManualData ? MANUAL_SCHEMA_DATA : generateSchemaMarkdown(schemas);
    markdownToPDF(markdown, `테이블_정의서_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  useEffect(() => {
    loadSchemas();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          📊 데이터베이스 테이블 정의서
        </h1>
        <p className="text-gray-600 mb-6">
          현재 데이터베이스의 모든 테이블 스키마 정보를 확인하고 다양한 형식으로 다운로드할 수 있습니다.
        </p>
        
        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={loadSchemas}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '로딩 중...' : '🔄 새로고침'}
          </button>
          
          <button
            onClick={downloadMarkdown}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            📄 마크다운 다운로드
          </button>
          
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            📊 CSV 다운로드
          </button>

          <button
            onClick={downloadHTML}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            🌐 HTML 다운로드
          </button>

          <button
            onClick={convertToPDF}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            📋 PDF 변환
          </button>
        </div>

        {/* 데이터 소스 표시 */}
        {useManualData && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">⚠️ 수동 데이터 사용 중</h3>
            <p className="text-sm text-yellow-800">
              Supabase 연결에 실패하여 기존 SQL 파일을 기반으로 한 수동 테이블 정의서를 사용합니다.
              PDF 변환 기능은 정상적으로 작동합니다.
            </p>
          </div>
        )}

        {/* 문서 전달 가이드 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📤 문서 전달 가이드</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>📄 마크다운:</strong> 개발자나 기술 문서 작성자에게 전달 (GitHub, GitLab 등)</p>
            <p><strong>📊 CSV:</strong> 엑셀에서 분석하거나 데이터베이스 관리자에게 전달</p>
            <p><strong>🌐 HTML:</strong> 웹 브라우저에서 바로 열어볼 수 있어 누구에게나 전달 가능</p>
            <p><strong>📋 PDF:</strong> 공식 문서나 프레젠테이션용으로 전달 (인쇄 가능)</p>
          </div>
        </div>

        {error && !useManualData && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>오류:</strong> {error}
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">스키마 정보를 불러오는 중...</p>
        </div>
      )}

      {!loading && useManualData && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📋 수동 테이블 정의서 미리보기
          </h2>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: marked(MANUAL_SCHEMA_DATA) }} />
          </div>
        </div>
      )}

      {!loading && schemas.length > 0 && !useManualData && (
        <div className="space-y-6">
          {schemas.map((schema) => (
            <div key={schema.table_name} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  📋 {schema.table_name}
                </h2>
                <span className="text-sm text-gray-500">
                  총 {schema.row_count.toLocaleString()}개 행
                </span>
              </div>
              
              {schema.description && (
                <p className="text-gray-600 mb-4">{schema.description}</p>
              )}
              
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                        컬럼명
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                        데이터 타입
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                        NULL 허용
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700">
                        기본값
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {schema.columns.map((column, index) => {
                      const dataType = column.character_maximum_length 
                        ? `${column.data_type}(${column.character_maximum_length})`
                        : column.numeric_precision 
                        ? `${column.data_type}(${column.numeric_precision},${column.numeric_scale || 0})`
                        : column.data_type;
                        
                      return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">
                            {column.column_name}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-gray-700">
                            {dataType}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-gray-700">
                            <span className={`px-2 py-1 rounded text-xs ${
                              column.is_nullable === 'YES' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {column.is_nullable === 'YES' ? '허용' : '불허'}
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-gray-700">
                            {column.column_default || '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && schemas.length === 0 && !error && !useManualData && (
        <div className="text-center py-8">
          <p className="text-gray-600">테이블 정보를 찾을 수 없습니다.</p>
        </div>
      )}
    </div>
  );
} 