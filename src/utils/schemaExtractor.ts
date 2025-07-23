import { supabase } from '../services/supabaseService';

/**
 * 테이블 스키마 정보를 추출하는 함수
 */
export interface ColumnInfo {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
  character_maximum_length?: number;
  numeric_precision?: number;
  numeric_scale?: number;
}

export interface TableSchema {
  table_name: string;
  columns: ColumnInfo[];
  row_count: number;
  description?: string;
}

/**
 * 특정 테이블의 스키마 정보를 가져옵니다
 */
export async function getTableSchema(tableName: string): Promise<TableSchema> {
  try {
    // 컬럼 정보 조회
    const { data: columns, error: columnError } = await supabase
      .rpc('get_table_schema', { table_name: tableName });

    if (columnError) {
      // RPC 함수가 없는 경우 직접 쿼리
      const { data: directColumns, error: directError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable, column_default, character_maximum_length, numeric_precision, numeric_scale')
        .eq('table_name', tableName)
        .eq('table_schema', 'public')
        .order('ordinal_position');

      if (directError) throw directError;
      
      // 행 수 조회
      const { count, error: countError } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;

      return {
        table_name: tableName,
        columns: directColumns || [],
        row_count: count || 0
      };
    }

    // 행 수 조회
    const { count, error: countError } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    return {
      table_name: tableName,
      columns: columns || [],
      row_count: count || 0
    };

  } catch (error) {
    console.error(`테이블 스키마 조회 실패 (${tableName}):`, error);
    throw error;
  }
}

/**
 * 모든 테이블의 스키마 정보를 가져옵니다
 */
export async function getAllTableSchemas(): Promise<TableSchema[]> {
  try {
    // 테이블 목록 조회
    const { data: tables, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_type', 'BASE TABLE');

    if (error) throw error;

    const schemas: TableSchema[] = [];
    
    for (const table of tables || []) {
      try {
        const schema = await getTableSchema(table.table_name);
        schemas.push(schema);
      } catch (err) {
        console.warn(`테이블 ${table.table_name} 스키마 조회 실패:`, err);
      }
    }

    return schemas;
  } catch (error) {
    console.error('전체 테이블 스키마 조회 실패:', error);
    throw error;
  }
}

/**
 * 스키마 정보를 마크다운 형식으로 변환
 */
export function generateSchemaMarkdown(schemas: TableSchema[]): string {
  let markdown = '# 📊 데이터베이스 테이블 정의서\n\n';
  markdown += `생성일: ${new Date().toLocaleDateString('ko-KR')}\n\n`;

  schemas.forEach(schema => {
    markdown += `## 📋 ${schema.table_name}\n\n`;
    markdown += `- **테이블 설명**: ${schema.description || '설명 없음'}\n`;
    markdown += `- **총 행 수**: ${schema.row_count.toLocaleString()}개\n\n`;
    
    markdown += '| 컬럼명 | 데이터 타입 | NULL 허용 | 기본값 | 설명 |\n';
    markdown += '|--------|-------------|-----------|--------|------|\n';
    
    schema.columns.forEach(col => {
      const dataType = col.character_maximum_length 
        ? `${col.data_type}(${col.character_maximum_length})`
        : col.numeric_precision 
        ? `${col.data_type}(${col.numeric_precision},${col.numeric_scale || 0})`
        : col.data_type;
        
      markdown += `| ${col.column_name} | ${dataType} | ${col.is_nullable} | ${col.column_default || '-'} | - |\n`;
    });
    
    markdown += '\n---\n\n';
  });

  return markdown;
}

/**
 * 스키마 정보를 CSV 형식으로 변환
 */
export function generateSchemaCSV(schemas: TableSchema[]): string {
  const headers = ['테이블명', '컬럼명', '데이터타입', 'NULL허용', '기본값', '설명'];
  const rows = [headers.join(',')];

  schemas.forEach(schema => {
    schema.columns.forEach(col => {
      const dataType = col.character_maximum_length 
        ? `${col.data_type}(${col.character_maximum_length})`
        : col.numeric_precision 
        ? `${col.data_type}(${col.numeric_precision},${col.numeric_scale || 0})`
        : col.data_type;
        
      rows.push([
        schema.table_name,
        col.column_name,
        dataType,
        col.is_nullable,
        col.column_default || '',
        ''
      ].join(','));
    });
  });

  return rows.join('\n');
} 