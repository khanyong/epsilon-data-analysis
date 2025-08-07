import pandas as pd
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import logging

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# .env 파일 로드
load_dotenv()

def test_single_sheet():
    """단일 시트 테스트"""
    
    # Supabase 설정
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        logger.error("❌ Supabase 환경변수가 설정되지 않았습니다.")
        return
    
    # Supabase 클라이언트 생성
    supabase: Client = create_client(supabase_url, supabase_key)
    
    # Excel 파일 경로
    excel_file_path = "data/euro_pricing_table/q2_all_data.xlsx"
    
    try:
        # Country Routes 시트만 테스트
        sheet_name = 'Country Routes'
        logger.info(f"🔄 시트 '{sheet_name}' 처리 중...")
        
        df = pd.read_excel(excel_file_path, sheet_name=sheet_name)
        logger.info(f"  - 원본 데이터 형태: {df.shape}")
        
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
        
        logger.info(f"  - 처리된 데이터 형태: {df.shape}")
        logger.info(f"  - 컬럼: {list(df.columns[:5])}")  # 처음 5개만 표시
        
        # 간단한 테이블로 변환 (처음 몇 개 컬럼만)
        simple_df = df.iloc[:, :6].copy()  # 처음 6개 컬럼만
        
        # 컬럼명 정리
        new_columns = []
        for i, col in enumerate(simple_df.columns):
            if pd.isna(col) or col == '':
                new_columns.append(f'column_{i+1}')
            else:
                clean_col = str(col).strip().lower().replace(' ', '_').replace('-', '_').replace('(', '').replace(')', '').replace('.', '_')
                new_columns.append(clean_col)
        
        simple_df.columns = new_columns
        
        # 데이터 정리
        for col in simple_df.columns:
            if simple_df[col].dtype == 'object':
                simple_df[col] = simple_df[col].fillna('').astype(str)
            else:
                simple_df[col] = simple_df[col].fillna(0)
                simple_df[col] = simple_df[col].replace([float('inf'), float('-inf')], 0)
        
        logger.info(f"  - 최종 컬럼: {list(simple_df.columns)}")
        logger.info(f"  - 최종 데이터 형태: {simple_df.shape}")
        
        # 처음 3행 출력
        logger.info("  - 샘플 데이터:")
        for i in range(min(3, len(simple_df))):
            logger.info(f"    {dict(simple_df.iloc[i])}")
        
        # Supabase에 업로드 시도
        records = simple_df.head(5).to_dict('records')  # 테스트용으로 5개만
        logger.info(f"  📤 {len(records)}개 레코드를 테스트 테이블에 업로드 중...")
        
        # 테스트 테이블 이름
        table_name = "test_country_routes"
        
        try:
            result = supabase.table(table_name).insert(records).execute()
            logger.info(f"  ✅ 업로드 성공: {len(result.data)}개 레코드")
        except Exception as e:
            logger.error(f"  ❌ 업로드 실패: {str(e)}")
            
            # 테이블 생성해보기
            logger.info("  🔧 테이블 생성 시도...")
            # 간단한 테이블 생성
            create_sql = f"""
            CREATE TABLE IF NOT EXISTS {table_name} (
                id SERIAL PRIMARY KEY,
                {', '.join([f'"{col}" TEXT' for col in simple_df.columns])}
            );
            """
            logger.info(f"  SQL: {create_sql}")
            
    except Exception as e:
        logger.error(f"❌ 오류: {str(e)}")

if __name__ == "__main__":
    test_single_sheet()