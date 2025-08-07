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

def find_header_row_with_years(df):
    """년도가 포함된 헤더 행 찾기"""
    for idx, row in df.iterrows():
        year_count = 0
        for cell in row:
            if pd.notna(cell):
                cell_str = str(cell).replace('.0', '')
                if cell_str.isdigit() and len(cell_str) == 4 and 2015 <= int(cell_str) <= 2035:
                    year_count += 1
        if year_count >= 5:  # 최소 5개 이상의 연도가 있으면 헤더 행
            return idx
    return None

def extract_year_columns(df, start_col=1):
    """연도 컬럼들 추출하고 매핑"""
    year_mapping = {}
    change_mapping = {}
    
    header_row = df.iloc[0] if len(df) > 0 else None
    if header_row is None:
        return year_mapping, change_mapping
    
    for i, cell in enumerate(header_row):
        if i < start_col:
            continue
            
        if pd.notna(cell):
            cell_str = str(cell).replace('.0', '')
            if cell_str.isdigit() and len(cell_str) == 4:
                year = cell_str
                col_name = df.columns[i]
                year_mapping[col_name] = f"year_{year}"
            elif 'CAGR' in str(cell) or '2023-30' in str(cell):
                col_name = df.columns[i]
                year_mapping[col_name] = "cagr_2023_30"
    
    return year_mapping, change_mapping

def upload_wholesale_prices(supabase, excel_file_path):
    """Wholesale Prices 시트 업로드"""
    logger.info("🔄 Wholesale Prices 시트 처리 중...")
    
    try:
        df = pd.read_excel(excel_file_path, sheet_name='Wholesale Prices')
        
        # 헤더 행 찾기 (년도가 있는 행)
        header_row = find_header_row_with_years(df)
        if header_row is not None:
            # 데이터 시작점 찾기 (실제 경로명이 있는 행)
            data_start = None
            for idx in range(header_row + 1, len(df)):
                if pd.notna(df.iloc[idx, 0]) and str(df.iloc[idx, 0]).strip() not in ['', 'nan']:
                    # 경로명 같은 실제 데이터인지 확인
                    cell_value = str(df.iloc[idx, 0]).strip()
                    if '-' in cell_value or 'London' in cell_value or 'New York' in cell_value:
                        data_start = idx
                        break
            
            if data_start is not None:
                # 헤더 설정
                df = df.iloc[data_start:].reset_index(drop=True)
                
                # 년도 컬럼 매핑 생성
                year_mapping = {}
                
                # 원본 헤더에서 년도 정보 추출
                original_header = pd.read_excel(excel_file_path, sheet_name='Wholesale Prices').iloc[header_row]
                for i, cell in enumerate(original_header):
                    if pd.notna(cell):
                        cell_str = str(cell).replace('.0', '')
                        if cell_str.isdigit() and len(cell_str) == 4 and 2015 <= int(cell_str) <= 2035:
                            if i < len(df.columns):
                                year_mapping[df.columns[i]] = f"year_{cell_str}"
                        elif 'CAGR' in str(cell) or '2023-30' in str(cell):
                            if i < len(df.columns):
                                year_mapping[df.columns[i]] = "cagr_2023_30"
                
                # 레코드 생성
                records = []
                for _, row in df.iterrows():
                    if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() != '':
                        record = {
                            "route_name": str(row.iloc[0]).strip()
                        }
                        
                        # 년도 데이터 추가
                        for col, target_col in year_mapping.items():
                            if col in row.index and pd.notna(row[col]):
                                try:
                                    record[target_col] = float(row[col]) if str(row[col]).replace('.', '').replace('-', '').isdigit() else None
                                except:
                                    record[target_col] = None
                            else:
                                record[target_col] = None
                        
                        # 기본 년도 컬럼들 추가 (누락된 경우)
                        for year in ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]:
                            if f"year_{year}" not in record:
                                record[f"year_{year}"] = None
                        
                        if "cagr_2023_30" not in record:
                            record["cagr_2023_30"] = None
                        
                        records.append(record)
                
                if records:
                    logger.info(f"  📤 {len(records)}개 레코드를 업로드 중...")
                    result = supabase.table("euro_pricing_wholesale_prices").insert(records).execute()
                    logger.info(f"  ✅ Wholesale Prices 완료: {len(records)}개 레코드 업로드")
                else:
                    logger.warning("  ⚠️ 업로드할 데이터가 없습니다.")
            else:
                logger.warning("  ⚠️ 데이터 시작점을 찾을 수 없습니다.")
        else:
            logger.warning("  ⚠️ 헤더 행을 찾을 수 없습니다.")
            
    except Exception as e:
        logger.error(f"❌ Wholesale Prices 처리 오류: {str(e)}")

def upload_regional_sheet(supabase, excel_file_path, sheet_name, table_name):
    """지역별 시트 업로드 (Trans-Atlantic, Trans-Pacific 등)"""
    logger.info(f"🔄 {sheet_name} 시트 처리 중...")
    
    try:
        df = pd.read_excel(excel_file_path, sheet_name=sheet_name)
        
        # 헤더 행 찾기
        header_row = find_header_row_with_years(df)
        if header_row is not None:
            # 데이터 시작점 찾기 (메트릭명이 있는 행)
            data_start = None
            for idx in range(header_row + 1, len(df)):
                if pd.notna(df.iloc[idx, 0]) and str(df.iloc[idx, 0]).strip() not in ['', 'nan']:
                    cell_value = str(df.iloc[idx, 0]).strip()
                    if any(keyword in cell_value for keyword in ['Capacity', 'Used', 'Lit', 'Potential', 'Revenue', 'Price']):
                        data_start = idx
                        break
            
            if data_start is not None:
                # 데이터 설정
                df = df.iloc[data_start:].reset_index(drop=True)
                
                # 년도 컬럼 매핑
                year_mapping = {}
                change_mapping = {}
                
                # 원본 헤더에서 정보 추출
                original_header = pd.read_excel(excel_file_path, sheet_name=sheet_name).iloc[header_row]
                for i, cell in enumerate(original_header):
                    if pd.notna(cell):
                        cell_str = str(cell).replace('.0', '')
                        if cell_str.isdigit() and len(cell_str) == 4 and 2015 <= int(cell_str) <= 2035:
                            if i < len(df.columns):
                                year_mapping[df.columns[i]] = f"year_{cell_str}"
                        elif 'CAGR' in str(cell) or '2023-30' in str(cell):
                            if i < len(df.columns):
                                year_mapping[df.columns[i]] = "cagr_2023_30"
                
                # 레코드 생성
                records = []
                for _, row in df.iterrows():
                    if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() != '':
                        record = {
                            "metric_name": str(row.iloc[0]).strip()
                        }
                        
                        # 년도 데이터 추가
                        for col, target_col in year_mapping.items():
                            if col in row.index and pd.notna(row[col]):
                                try:
                                    record[target_col] = float(row[col]) if str(row[col]).replace('.', '').replace('-', '').isdigit() else None
                                except:
                                    record[target_col] = None
                            else:
                                record[target_col] = None
                        
                        # 기본 컬럼들 추가
                        for year in ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]:
                            if f"year_{year}" not in record:
                                record[f"year_{year}"] = None
                        
                        if "cagr_2023_30" not in record:
                            record["cagr_2023_30"] = None
                        
                        records.append(record)
                
                if records:
                    logger.info(f"  📤 {len(records)}개 레코드를 업로드 중...")
                    result = supabase.table(table_name).insert(records).execute()
                    logger.info(f"  ✅ {sheet_name} 완료: {len(records)}개 레코드 업로드")
                else:
                    logger.warning("  ⚠️ 업로드할 데이터가 없습니다.")
            else:
                logger.warning("  ⚠️ 데이터 시작점을 찾을 수 없습니다.")
        else:
            logger.warning("  ⚠️ 헤더 행을 찾을 수 없습니다.")
            
    except Exception as e:
        logger.error(f"❌ {sheet_name} 처리 오류: {str(e)}")

def main():
    """메인 함수"""
    # Supabase 설정
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        logger.error("❌ Supabase 환경변수가 설정되지 않았습니다.")
        return
    
    supabase: Client = create_client(supabase_url, supabase_key)
    excel_file_path = "data/euro_pricing_table/q2_all_data.xlsx"
    
    if not os.path.exists(excel_file_path):
        logger.error(f"❌ Excel 파일을 찾을 수 없습니다: {excel_file_path}")
        return
    
    logger.info("=== 추가 Euro Pricing 시트 업로드 ===")
    
    # 주요 시트들 업로드
    upload_wholesale_prices(supabase, excel_file_path)
    
    # 지역별 시트들
    regional_sheets = [
        ("Trans-Atlantic", "euro_pricing_trans_atlantic"),
        ("Trans-Pacific", "euro_pricing_trans_pacific"),
        ("US-Latin America", "euro_pricing_us_latin_america"),
        ("Intra-Asia", "euro_pricing_intra_asia"),
        ("Europe-Middle East & Egypt", "euro_pricing_europe_middle_east_and_egypt"),
        ("Europe-East Asia", "euro_pricing_europe_east_asia"),
        ("Europe-South Asia", "euro_pricing_europe_south_asia"),
        ("East Asia-South Asia", "euro_pricing_east_asia_south_asia"),
        ("Europe-Sub-Saharan Africa", "euro_pricing_europe_sub_saharan_africa")
    ]
    
    for sheet_name, table_name in regional_sheets:
        upload_regional_sheet(supabase, excel_file_path, sheet_name, table_name)
    
    logger.info("✅ 추가 시트 업로드 완료!")

if __name__ == "__main__":
    main()