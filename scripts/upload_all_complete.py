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
        if year_count >= 5:
            return idx
    return None

def extract_years_from_header(original_df, header_row):
    """헤더에서 년도 정보 추출"""
    year_mapping = {}
    if header_row < len(original_df):
        header_data = original_df.iloc[header_row]
        for i, cell in enumerate(header_data):
            if pd.notna(cell):
                cell_str = str(cell).replace('.0', '')
                if cell_str.isdigit() and len(cell_str) == 4 and 2015 <= int(cell_str) <= 2035:
                    year_mapping[i] = f"year_{cell_str}"
                elif 'CAGR' in str(cell) or '2023-30' in str(cell):
                    year_mapping[i] = "cagr_2023_30"
    return year_mapping

def upload_country_routes(supabase, excel_file_path):
    """Country Routes 시트 업로드"""
    logger.info("🔄 Country Routes 시트 처리 중...")
    
    try:
        df = pd.read_excel(excel_file_path, sheet_name='Country Routes')
        
        # 헤더 행 찾기 (Country1이 있는 행)
        header_row = None
        for idx, row in df.iterrows():
            if any(str(cell) in ['Country1', 'Country2'] for cell in row if pd.notna(cell)):
                header_row = idx
                break
        
        if header_row is not None:
            df = df.iloc[header_row:].reset_index(drop=True)
            df.columns = df.iloc[0]
            df = df.iloc[1:].reset_index(drop=True)
            df = df[df.iloc[:, 0].notna() & (df.iloc[:, 0] != '')]
        
        # 레코드 생성
        records = []
        for _, row in df.iterrows():
            record = {
                "country1": str(row.iloc[0]) if pd.notna(row.iloc[0]) else "",
                "country2": str(row.iloc[1]) if len(row) > 1 and pd.notna(row.iloc[1]) else "",
                "subregion1": str(row.iloc[2]) if len(row) > 2 and pd.notna(row.iloc[2]) else "",
                "subregion2": str(row.iloc[3]) if len(row) > 3 and pd.notna(row.iloc[3]) else "",
                "region1": str(row.iloc[4]) if len(row) > 4 and pd.notna(row.iloc[4]) else "",
                "region2": str(row.iloc[5]) if len(row) > 5 and pd.notna(row.iloc[5]) else ""
            }
            
            # 년도 데이터 추가
            years = ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]
            for i, year in enumerate(years):
                col_idx = 6 + i
                if col_idx < len(row) and pd.notna(row.iloc[col_idx]):
                    try:
                        record[f"year_{year}"] = float(row.iloc[col_idx])
                    except:
                        record[f"year_{year}"] = None
                else:
                    record[f"year_{year}"] = None
            
            # CAGR 추가
            if len(row) > 20 and pd.notna(row.iloc[20]):
                record["cagr_2023_30"] = str(row.iloc[20])
            else:
                record["cagr_2023_30"] = None
            
            records.append(record)
        
        # 배치 업로드
        batch_size = 1000
        total_uploaded = 0
        for i in range(0, len(records), batch_size):
            batch = records[i:i+batch_size]
            result = supabase.table("euro_pricing_country_routes").insert(batch).execute()
            total_uploaded += len(batch)
            logger.info(f"  ✅ {len(batch)}개 레코드 업로드 완료 (총 {total_uploaded}/{len(records)})")
        
        logger.info(f"  🎉 Country Routes 완료: 총 {total_uploaded}개 레코드")
        
    except Exception as e:
        logger.error(f"❌ Country Routes 처리 오류: {str(e)}")

def upload_wholesale_prices(supabase, excel_file_path):
    """Wholesale Prices 시트 업로드"""
    logger.info("🔄 Wholesale Prices 시트 처리 중...")
    
    try:
        df = pd.read_excel(excel_file_path, sheet_name='Wholesale Prices')
        
        # 데이터 시작점 찾기
        data_start = None
        for idx in range(len(df)):
            if pd.notna(df.iloc[idx, 0]):
                cell_value = str(df.iloc[idx, 0]).strip()
                if '-' in cell_value and any(city in cell_value for city in ['London', 'New York', 'Tokyo', 'Frankfurt']):
                    data_start = idx
                    break
        
        if data_start is not None:
            df_data = df.iloc[data_start:].reset_index(drop=True)
            
            records = []
            for _, row in df_data.iterrows():
                if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() != '':
                    record = {"route_name": str(row.iloc[0]).strip()}
                    
                    # 년도 데이터 추가 (추정 위치)
                    years = ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]
                    for i, year in enumerate(years):
                        col_idx = 1 + i
                        if col_idx < len(row) and pd.notna(row.iloc[col_idx]):
                            try:
                                record[f"year_{year}"] = float(row.iloc[col_idx])
                            except:
                                record[f"year_{year}"] = None
                        else:
                            record[f"year_{year}"] = None
                    
                    record["cagr_2023_30"] = None
                    records.append(record)
            
            if records:
                result = supabase.table("euro_pricing_wholesale_prices").insert(records).execute()
                logger.info(f"  ✅ Wholesale Prices 완료: {len(records)}개 레코드")
            
    except Exception as e:
        logger.error(f"❌ Wholesale Prices 처리 오류: {str(e)}")

def upload_regional_sheet(supabase, excel_file_path, sheet_name, table_name):
    """지역별 시트 업로드"""
    logger.info(f"🔄 {sheet_name} 시트 처리 중...")
    
    try:
        df = pd.read_excel(excel_file_path, sheet_name=sheet_name)
        
        # 데이터 시작점 찾기
        data_start = None
        for idx in range(len(df)):
            if pd.notna(df.iloc[idx, 0]):
                cell_value = str(df.iloc[idx, 0]).strip()
                if any(keyword in cell_value for keyword in ['Capacity', 'Used', 'Lit', 'Revenue', 'Price', 'Deployed']):
                    data_start = idx
                    break
        
        if data_start is not None:
            df_data = df.iloc[data_start:].reset_index(drop=True)
            
            records = []
            for _, row in df_data.iterrows():
                if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() != '':
                    record = {"metric_name": str(row.iloc[0]).strip()}
                    
                    # 년도 데이터 추가
                    years = ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]
                    for i, year in enumerate(years):
                        col_idx = 1 + i
                        if col_idx < len(row) and pd.notna(row.iloc[col_idx]):
                            try:
                                record[f"year_{year}"] = float(row.iloc[col_idx])
                            except:
                                record[f"year_{year}"] = None
                        else:
                            record[f"year_{year}"] = None
                    
                    # Change 데이터 추가 (있는 경우)
                    change_years = ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]
                    for i, year in enumerate(change_years):
                        col_idx = 16 + i
                        if col_idx < len(row) and pd.notna(row.iloc[col_idx]):
                            try:
                                record[f"change_{year}"] = float(row.iloc[col_idx])
                            except:
                                record[f"change_{year}"] = None
                        else:
                            record[f"change_{year}"] = None
                    
                    record["cagr_2023_30"] = None
                    records.append(record)
            
            if records:
                result = supabase.table(table_name).insert(records).execute()
                logger.info(f"  ✅ {sheet_name} 완료: {len(records)}개 레코드")
            
    except Exception as e:
        logger.error(f"❌ {sheet_name} 처리 오류: {str(e)}")

def upload_regions(supabase, excel_file_path):
    """Regions 시트 업로드"""
    logger.info("🔄 Regions 시트 처리 중...")
    
    try:
        df = pd.read_excel(excel_file_path, sheet_name='Regions')
        
        # 지역명이 있는 데이터 찾기
        data_start = None
        for idx in range(len(df)):
            if pd.notna(df.iloc[idx, 0]):
                cell_value = str(df.iloc[idx, 0]).strip()
                if any(region in cell_value for region in ['Asia', 'Europe', 'America', 'Africa', 'Total']):
                    data_start = idx
                    break
        
        if data_start is not None:
            df_data = df.iloc[data_start:].reset_index(drop=True)
            
            records = []
            for _, row in df_data.iterrows():
                if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() != '':
                    record = {"region_name": str(row.iloc[0]).strip()}
                    
                    # Historical 데이터 (추정 위치: 1-7)
                    historical_years = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"]
                    for i, year in enumerate(historical_years):
                        col_idx = 1 + i
                        if col_idx < len(row) and pd.notna(row.iloc[col_idx]):
                            try:
                                record[f"historical_{year}"] = float(row.iloc[col_idx])
                            except:
                                record[f"historical_{year}"] = None
                        else:
                            record[f"historical_{year}"] = None
                    
                    # Forecast 데이터 (추정 위치: 8-14)
                    forecast_years = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"]
                    for i, year in enumerate(forecast_years):
                        col_idx = 8 + i
                        if col_idx < len(row) and pd.notna(row.iloc[col_idx]):
                            try:
                                record[f"forecast_{year}"] = float(row.iloc[col_idx])
                            except:
                                record[f"forecast_{year}"] = None
                        else:
                            record[f"forecast_{year}"] = None
                    
                    records.append(record)
            
            if records:
                result = supabase.table("euro_pricing_regions").insert(records).execute()
                logger.info(f"  ✅ Regions 완료: {len(records)}개 레코드")
            
    except Exception as e:
        logger.error(f"❌ Regions 처리 오류: {str(e)}")

def upload_countries(supabase, excel_file_path):
    """Countries 시트 업로드 (샘플만)"""
    logger.info("🔄 Countries 시트 처리 중...")
    
    try:
        df = pd.read_excel(excel_file_path, sheet_name='Countries')
        
        # 국가명이 있는 데이터 찾기
        data_start = None
        for idx in range(len(df)):
            if pd.notna(df.iloc[idx, 0]):
                cell_value = str(df.iloc[idx, 0]).strip()
                if len(cell_value) > 2 and cell_value.isalpha():
                    data_start = idx
                    break
        
        if data_start is not None:
            # 처음 50개만 처리
            df_data = df.iloc[data_start:data_start+50].reset_index(drop=True)
            
            records = []
            for _, row in df_data.iterrows():
                if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() != '':
                    record = {"country_name": str(row.iloc[0]).strip()}
                    
                    # 년도별 total bandwidth 데이터 추가
                    years = ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]
                    for i, year in enumerate(years):
                        # Total Bandwidth (추정 위치: 2-15)
                        col_idx = 2 + i
                        if col_idx < len(row) and pd.notna(row.iloc[col_idx]):
                            try:
                                record[f"total_bandwidth_{year}"] = float(row.iloc[col_idx])
                            except:
                                record[f"total_bandwidth_{year}"] = None
                        else:
                            record[f"total_bandwidth_{year}"] = None
                        
                        # Backbone Providers (추정 위치: 16-29)
                        col_idx = 16 + i
                        if col_idx < len(row) and pd.notna(row.iloc[col_idx]):
                            try:
                                record[f"backbone_providers_{year}"] = float(row.iloc[col_idx])
                            except:
                                record[f"backbone_providers_{year}"] = None
                        else:
                            record[f"backbone_providers_{year}"] = None
                        
                        # Content Providers (추정 위치: 31-44)
                        col_idx = 31 + i
                        if col_idx < len(row) and pd.notna(row.iloc[col_idx]):
                            try:
                                record[f"content_providers_{year}"] = float(row.iloc[col_idx])
                            except:
                                record[f"content_providers_{year}"] = None
                        else:
                            record[f"content_providers_{year}"] = None
                    
                    records.append(record)
            
            if records:
                result = supabase.table("euro_pricing_countries").insert(records).execute()
                logger.info(f"  ✅ Countries 완료: {len(records)}개 레코드")
            
    except Exception as e:
        logger.error(f"❌ Countries 처리 오류: {str(e)}")

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
    
    logger.info("=== 완전한 Euro Pricing 데이터 업로드 ===")
    
    # 1. 핵심 테이블들
    upload_country_routes(supabase, excel_file_path)
    upload_wholesale_prices(supabase, excel_file_path)
    
    # 2. 요약 테이블들
    upload_regions(supabase, excel_file_path)
    upload_countries(supabase, excel_file_path)
    
    # 3. 지역별 상세 테이블들
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
    
    logger.info("🎉 모든 Euro Pricing 데이터 업로드 완료!")

if __name__ == "__main__":
    main()