import pandas as pd
import os
import json
from supabase import create_client, Client
from dotenv import load_dotenv
import logging

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# .env 파일 로드
load_dotenv()

def upload_euro_pricing_data():
    """Euro Pricing 데이터를 Supabase에 업로드하는 함수"""
    
    # Supabase 설정
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        logger.error("❌ Supabase 환경변수가 설정되지 않았습니다.")
        logger.info("다음 환경변수를 설정해주세요:")
        logger.info("- VITE_SUPABASE_URL")
        logger.info("- VITE_SUPABASE_KEY")
        return
    
    # Supabase 클라이언트 생성
    supabase: Client = create_client(supabase_url, supabase_key)
    
    # Excel 파일 경로
    excel_file_path = "data/euro_pricing_table/q2_all_data.xlsx"
    
    if not os.path.exists(excel_file_path):
        logger.error(f"❌ Excel 파일을 찾을 수 없습니다: {excel_file_path}")
        return
    
    logger.info("=== Euro Pricing 데이터 Supabase 업로드 ===")
    
    try:
        # Excel 파일의 모든 시트 읽기
        excel_file = pd.ExcelFile(excel_file_path)
        sheet_names = excel_file.sheet_names
        
        logger.info(f"📊 발견된 시트: {sheet_names}")
        
        for sheet_name in sheet_names:
            logger.info(f"\n🔄 시트 '{sheet_name}' 처리 중...")
            
            try:
                # 시트 데이터 읽기
                df = pd.read_excel(excel_file_path, sheet_name=sheet_name)
                
                logger.info(f"  - 데이터 형태: {df.shape}")
                logger.info(f"  - 컬럼: {list(df.columns)}")
                
                # 데이터 전처리
                df_cleaned = preprocess_dataframe(df, sheet_name)
                
                if df_cleaned.empty:
                    logger.warning(f"  ⚠️ 시트 '{sheet_name}'에 유효한 데이터가 없습니다.")
                    continue
                
                # Supabase에 업로드
                table_name = f"euro_pricing_{sheet_name.lower().replace(' ', '_').replace('-', '_')}"
                upload_to_supabase(supabase, df_cleaned, table_name, sheet_name)
                
            except Exception as e:
                logger.error(f"  ❌ 시트 '{sheet_name}' 처리 중 오류: {str(e)}")
                continue
        
        logger.info("\n✅ 모든 시트 처리 완료!")
        
    except Exception as e:
        logger.error(f"❌ Excel 파일 읽기 오류: {str(e)}")

def preprocess_dataframe(df, sheet_name):
    """데이터프레임 전처리"""
    
    # 빈 행/열 제거
    df = df.dropna(how='all').dropna(axis=1, how='all')
    
    if df.empty:
        return df
    
    # 시트별 특별 처리
    if 'Country Routes' in sheet_name:
        # Country Routes 시트는 실제 데이터가 있는 시트
        # 헤더 행 찾기 (숫자 연도가 있는 행)
        header_row = None
        for idx, row in df.iterrows():
            if any(str(cell).isdigit() and len(str(cell)) == 4 for cell in row if pd.notna(cell)):
                header_row = idx
                break
        
        if header_row is not None:
            # 헤더 행을 컬럼명으로 설정
            df = df.iloc[header_row:].reset_index(drop=True)
            df.columns = df.iloc[0]
            df = df.iloc[1:].reset_index(drop=True)
            
            # 실제 데이터만 필터링 (국가명이 있는 행)
            df = df[df.iloc[:, 0].notna() & (df.iloc[:, 0] != '')]
    
    elif any(keyword in sheet_name for keyword in ['Trans-Atlantic', 'Trans-Pacific', 'US-Latin America', 'Intra-Asia', 'Europe-']):
        # 지역별 배포/가격/수익 시트
        # 헤더 행 찾기
        header_row = None
        for idx, row in df.iterrows():
            if any(str(cell).isdigit() and len(str(cell)) == 4 for cell in row if pd.notna(cell)):
                header_row = idx
                break
        
        if header_row is not None:
            # 헤더 행을 컬럼명으로 설정
            df = df.iloc[header_row:].reset_index(drop=True)
            df.columns = df.iloc[0]
            df = df.iloc[1:].reset_index(drop=True)
            
            # 실제 데이터만 필터링
            df = df[df.iloc[:, 0].notna() & (df.iloc[:, 0] != '')]
    
    elif 'Wholesale Prices' in sheet_name:
        # 가격 데이터 시트
        # 헤더 행 찾기
        header_row = None
        for idx, row in df.iterrows():
            if any(str(cell).isdigit() and len(str(cell)) == 4 for cell in row if pd.notna(cell)):
                header_row = idx
                break
        
        if header_row is not None:
            df = df.iloc[header_row:].reset_index(drop=True)
            df.columns = df.iloc[0]
            df = df.iloc[1:].reset_index(drop=True)
            
            # 실제 데이터만 필터링
            df = df[df.iloc[:, 0].notna() & (df.iloc[:, 0] != '')]
    
    elif 'Lease-IRU Calculator' in sheet_name:
        # 계산기 시트는 간단한 구조
        df = df.dropna(how='all')
        if not df.empty:
            # 컬럼 수에 맞게 조정
            if len(df.columns) >= 4:
                df.columns = ['parameter', 'value', 'unit', 'note']
            elif len(df.columns) == 3:
                df.columns = ['parameter', 'value', 'unit']
            else:
                df.columns = ['parameter', 'value']
    
    else:
        # 기타 시트들은 기본 처리
        # 첫 번째 유효한 행을 헤더로 사용
        for idx, row in df.iterrows():
            if any(pd.notna(cell) and str(cell).strip() != '' for cell in row):
                df = df.iloc[idx:].reset_index(drop=True)
                df.columns = df.iloc[0]
                df = df.iloc[1:].reset_index(drop=True)
                break
    
    # 컬럼명 정리 (공백 제거, 소문자 변환, 특수문자 처리)
    if not df.empty:
        # 컬럼명을 문자열로 변환하고 정리
        new_columns = []
        for col in df.columns:
            if pd.isna(col) or col == '':
                new_columns.append(f'unnamed_{len(new_columns)}')
            else:
                clean_col = str(col).strip().lower().replace(' ', '_').replace('-', '_').replace('(', '').replace(')', '').replace('.', '_').replace(':', '_').replace('/', '_').replace('&', 'and')
                new_columns.append(clean_col)
        
        df.columns = new_columns
        
        # 데이터 타입 변환 및 JSON 호환성 처리
        for col in df.columns:
            try:
                if df[col].dtype == 'object':
                    # 문자열 컬럼에서 NaN을 빈 문자열로 변환
                    df[col] = df[col].fillna('').astype(str)
                    # 'nan' 문자열도 빈 문자열로 변환
                    df[col] = df[col].replace(['nan', 'NaN', 'None'], '')
                else:
                    # 숫자 컬럼 처리
                    # 먼저 무한대와 매우 큰/작은 값들을 None으로 변환
                    df[col] = df[col].replace([float('inf'), float('-inf')], None)
                    # 매우 큰 값들도 처리 (JSON 안전 범위)
                    mask_large = df[col].abs() > 1e308
                    df[col] = df[col].where(~mask_large, None)
                    # NaN을 None으로 변환
                    df[col] = df[col].where(pd.notna(df[col]), None)
            except Exception as e:
                logger.warning(f"  ⚠️ 컬럼 '{col}' 처리 중 오류: {str(e)}")
                # 오류가 있는 컬럼은 문자열로 처리
                df[col] = df[col].fillna('').astype(str)
    
    return df

def upload_to_supabase(supabase, df, table_name, sheet_name):
    """Supabase에 데이터 업로드"""
    
    try:
        # 데이터를 딕셔너리 리스트로 변환
        records = df.to_dict('records')
        
        if not records:
            logger.warning(f"  ⚠️ 시트 '{sheet_name}'에 업로드할 데이터가 없습니다.")
            return
        
        # JSON 호환성을 위한 추가 처리
        cleaned_records = []
        for record in records:
            cleaned_record = {}
            for key, value in record.items():
                # 무한대 값과 NaN 값 처리
                if pd.isna(value) or value is None:
                    cleaned_record[key] = None
                elif isinstance(value, (int, float)) and (value == float('inf') or value == float('-inf')):
                    cleaned_record[key] = None
                else:
                    cleaned_record[key] = value
            cleaned_records.append(cleaned_record)
        
        logger.info(f"  📤 {len(cleaned_records)}개 레코드를 '{table_name}' 테이블에 업로드 중...")
        
        # Supabase에 데이터 삽입
        result = supabase.table(table_name).insert(cleaned_records).execute()
        
        if result.data:
            logger.info(f"  ✅ 시트 '{sheet_name}' 업로드 성공: {len(result.data)}개 레코드")
        else:
            logger.warning(f"  ⚠️ 시트 '{sheet_name}' 업로드 결과가 없습니다.")
            
    except Exception as e:
        logger.error(f"  ❌ 시트 '{sheet_name}' 업로드 실패: {str(e)}")
        
        # 테이블이 존재하지 않는 경우 테이블 생성 시도
        if "relation" in str(e).lower() and "does not exist" in str(e).lower():
            logger.info(f"  🔧 테이블 '{table_name}' 생성 시도...")
            create_table_from_dataframe(supabase, df, table_name, sheet_name)

def create_table_from_dataframe(supabase, df, table_name, sheet_name):
    """데이터프레임 구조를 기반으로 테이블 생성"""
    
    try:
        # 컬럼 타입 매핑
        column_types = {}
        for col in df.columns:
            try:
                if df[col].dtype == 'object':
                    column_types[col] = 'text'
                elif df[col].dtype in ['int64', 'int32']:
                    column_types[col] = 'integer'
                elif df[col].dtype in ['float64', 'float32']:
                    column_types[col] = 'numeric'
                else:
                    column_types[col] = 'text'
            except:
                column_types[col] = 'text'
        
        # SQL 테이블 생성 쿼리 생성
        columns_sql = []
        for col, col_type in column_types.items():
            # 컬럼명을 SQL 안전한 형태로 변환
            safe_col = col.replace(' ', '_').replace('-', '_').lower()
            columns_sql.append(f'"{safe_col}" {col_type}')
        
        create_table_sql = f"""
        CREATE TABLE IF NOT EXISTS {table_name} (
            id SERIAL PRIMARY KEY,
            {', '.join(columns_sql)}
        );
        """
        
        logger.info(f"  🔧 테이블 생성 SQL: {create_table_sql}")
        
        # 테이블 생성 (Supabase SQL 실행)
        result = supabase.rpc('exec_sql', {'sql': create_table_sql}).execute()
        
        logger.info(f"  ✅ 테이블 '{table_name}' 생성 완료")
        
        # 다시 데이터 업로드 시도
        upload_to_supabase(supabase, df, table_name, sheet_name)
        
    except Exception as e:
        logger.error(f"  ❌ 테이블 생성 실패: {str(e)}")

def analyze_excel_structure():
    """Excel 파일 구조 분석"""
    
    excel_file_path = "data/euro_pricing_table/q2_all_data.xlsx"
    
    if not os.path.exists(excel_file_path):
        logger.error(f"❌ Excel 파일을 찾을 수 없습니다: {excel_file_path}")
        return
    
    try:
        excel_file = pd.ExcelFile(excel_file_path)
        sheet_names = excel_file.sheet_names
        
        logger.info("=== Excel 파일 구조 분석 ===")
        logger.info(f"📊 총 시트 수: {len(sheet_names)}")
        
        for i, sheet_name in enumerate(sheet_names, 1):
            logger.info(f"\n{i}. 시트: '{sheet_name}'")
            
            try:
                df = pd.read_excel(excel_file_path, sheet_name=sheet_name)
                logger.info(f"   - 행 수: {df.shape[0]}")
                logger.info(f"   - 열 수: {df.shape[1]}")
                logger.info(f"   - 컬럼: {list(df.columns)}")
                
                # 데이터 샘플
                if not df.empty:
                    logger.info(f"   - 첫 3행 샘플:")
                    for idx, row in df.head(3).iterrows():
                        logger.info(f"     {idx}: {dict(row)}")
                
            except Exception as e:
                logger.error(f"   ❌ 시트 읽기 오류: {str(e)}")
                
    except Exception as e:
        logger.error(f"❌ Excel 파일 분석 오류: {str(e)}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "analyze":
        analyze_excel_structure()
    else:
        upload_euro_pricing_data() 