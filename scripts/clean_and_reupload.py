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

def clear_and_recreate_tables(supabase):
    """기존 테이블 데이터 삭제"""
    tables_to_clear = [
        "euro_pricing_home",
        "euro_pricing_charts", 
        "euro_pricing_regions",
        "euro_pricing_countries",
        "euro_pricing_route_summary"
    ]
    
    for table in tables_to_clear:
        try:
            logger.info(f"🗑️ {table} 테이블 데이터 삭제 중...")
            result = supabase.table(table).delete().neq('id', 0).execute()
            logger.info(f"✅ {table} 삭제 완료")
        except Exception as e:
            logger.error(f"❌ {table} 삭제 실패: {str(e)}")

def upload_regions_properly(supabase, excel_file_path):
    """Regions 시트를 제대로 된 컬럼명으로 업로드"""
    logger.info("🔄 Regions 시트 처리 중...")
    
    try:
        df = pd.read_excel(excel_file_path, sheet_name='Regions')
        
        # 실제 데이터가 시작하는 행 찾기 (지역명이 있는 행)
        data_start = None
        for idx, row in df.iterrows():
            if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() not in ['', 'Used International Bandwidth by Region', '[HOME]']:
                # 지역명인지 확인
                cell_value = str(row.iloc[0]).strip()
                if any(region in cell_value for region in ['Asia', 'Europe', 'America', 'Africa', 'Middle East', 'Total']):
                    data_start = idx
                    break
        
        if data_start is not None:
            # 헤더 정보를 수동으로 설정
            df_data = df.iloc[data_start:].reset_index(drop=True)
            
            # 컬럼명 매핑
            column_mapping = {
                df_data.columns[0]: "region_name"
            }
            
            # 년도 컬럼들 찾기 (Historical과 Forecasts 섹션)
            year_cols = []
            col_idx = 1
            
            # Historical 년도들 (대략 2017-2023)
            historical_years = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"]
            for year in historical_years:
                if col_idx < len(df_data.columns):
                    column_mapping[df_data.columns[col_idx]] = f"historical_{year}"
                    col_idx += 1
            
            # Forecasts 년도들 (대략 2024-2030)
            forecast_years = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"]
            for year in forecast_years:
                if col_idx < len(df_data.columns):
                    column_mapping[df_data.columns[col_idx]] = f"forecast_{year}"
                    col_idx += 1
            
            # 남은 컬럼들은 기타 정보로 처리
            while col_idx < len(df_data.columns):
                column_mapping[df_data.columns[col_idx]] = f"additional_data_{col_idx}"
                col_idx += 1
            
            # 데이터 변환
            df_renamed = df_data.rename(columns=column_mapping)
            
            # 레코드 생성
            records = []
            for _, row in df_renamed.iterrows():
                if pd.notna(row['region_name']) and str(row['region_name']).strip() != '':
                    record = {"region_name": str(row['region_name']).strip()}
                    
                    # 나머지 컬럼들 추가
                    for col in df_renamed.columns[1:]:
                        if col in row.index and pd.notna(row[col]):
                            try:
                                record[col] = float(row[col]) if str(row[col]).replace('.', '').replace('-', '').isdigit() else str(row[col])
                            except:
                                record[col] = str(row[col]) if pd.notna(row[col]) else None
                        else:
                            record[col] = None
                    
                    records.append(record)
            
            if records:
                logger.info(f"  📤 {len(records)}개 레코드를 업로드 중...")
                result = supabase.table("euro_pricing_regions").insert(records).execute()
                logger.info(f"  ✅ Regions 완료: {len(records)}개 레코드 업로드")
            else:
                logger.warning("  ⚠️ 업로드할 데이터가 없습니다.")
        else:
            logger.warning("  ⚠️ 데이터 시작점을 찾을 수 없습니다.")
            
    except Exception as e:
        logger.error(f"❌ Regions 처리 오류: {str(e)}")

def upload_countries_properly(supabase, excel_file_path):
    """Countries 시트를 제대로 된 컬럼명으로 업로드"""
    logger.info("🔄 Countries 시트 처리 중...")
    
    try:
        df = pd.read_excel(excel_file_path, sheet_name='Countries')
        
        # 실제 데이터가 시작하는 행 찾기 (국가명이 있는 행)
        data_start = None
        for idx, row in df.iterrows():
            if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() not in ['', 'Used International Bandwidth by Country', '[HOME]']:
                # 국가명인지 확인 (알파벳으로 시작하고 적절한 길이)
                cell_value = str(row.iloc[0]).strip()
                if len(cell_value) > 2 and cell_value.replace(' ', '').isalpha():
                    data_start = idx
                    break
        
        if data_start is not None:
            # 데이터 처리 (처음 50개 레코드만 - 테이블이 너무 크므로)
            df_data = df.iloc[data_start:data_start+50].reset_index(drop=True)
            
            records = []
            for _, row in df_data.iterrows():
                if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() != '':
                    record = {
                        "country_name": str(row.iloc[0]).strip(),
                        "total_bandwidth_historical": str(row.iloc[2]) if len(row) > 2 and pd.notna(row.iloc[2]) else None,
                        "total_bandwidth_forecast": str(row.iloc[8]) if len(row) > 8 and pd.notna(row.iloc[8]) else None,
                        "backbone_providers_historical": str(row.iloc[16]) if len(row) > 16 and pd.notna(row.iloc[16]) else None,
                        "backbone_providers_forecast": str(row.iloc[23]) if len(row) > 23 and pd.notna(row.iloc[23]) else None,
                        "content_providers_historical": str(row.iloc[31]) if len(row) > 31 and pd.notna(row.iloc[31]) else None,
                        "content_providers_forecast": str(row.iloc[38]) if len(row) > 38 and pd.notna(row.iloc[38]) else None
                    }
                    records.append(record)
            
            if records:
                logger.info(f"  📤 {len(records)}개 레코드를 업로드 중...")
                result = supabase.table("euro_pricing_countries").insert(records).execute()
                logger.info(f"  ✅ Countries 완료: {len(records)}개 레코드 업로드")
            else:
                logger.warning("  ⚠️ 업로드할 데이터가 없습니다.")
        else:
            logger.warning("  ⚠️ 데이터 시작점을 찾을 수 없습니다.")
            
    except Exception as e:
        logger.error(f"❌ Countries 처리 오류: {str(e)}")

def upload_route_summary_properly(supabase, excel_file_path):
    """Route Summary 시트를 제대로 된 컬럼명으로 업로드"""
    logger.info("🔄 Route Summary 시트 처리 중...")
    
    try:
        df = pd.read_excel(excel_file_path, sheet_name='Route Summary')
        
        # 실제 데이터가 시작하는 행 찾기
        data_start = None
        for idx, row in df.iterrows():
            if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() not in ['', 'Submarine Cable Route Summary', '[HOME]', 'Used Bandwidth (Gbps)']:
                cell_value = str(row.iloc[0]).strip()
                if '-' in cell_value or any(region in cell_value for region in ['Trans-Atlantic', 'Trans-Pacific', 'US-', 'Europe-', 'Intra-']):
                    data_start = idx
                    break
        
        if data_start is not None:
            df_data = df.iloc[data_start:].reset_index(drop=True)
            
            records = []
            for _, row in df_data.iterrows():
                if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() != '':
                    record = {
                        "route_name": str(row.iloc[0]).strip(),
                        "historical_data": str(row.iloc[5]) if len(row) > 5 and pd.notna(row.iloc[5]) else None,
                        "forecast_data": str(row.iloc[8]) if len(row) > 8 and pd.notna(row.iloc[8]) else None,
                        "change_data": str(row.iloc[20]) if len(row) > 20 and pd.notna(row.iloc[20]) else None
                    }
                    records.append(record)
            
            if records:
                logger.info(f"  📤 {len(records)}개 레코드를 업로드 중...")
                result = supabase.table("euro_pricing_route_summary").insert(records).execute()
                logger.info(f"  ✅ Route Summary 완료: {len(records)}개 레코드 업로드")
            else:
                logger.warning("  ⚠️ 업로드할 데이터가 없습니다.")
        else:
            logger.warning("  ⚠️ 데이터 시작점을 찾을 수 없습니다.")
            
    except Exception as e:
        logger.error(f"❌ Route Summary 처리 오류: {str(e)}")

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
    
    logger.info("=== 기존 테이블 정리 및 재업로드 ===")
    
    # 1. 기존 데이터 삭제
    clear_and_recreate_tables(supabase)
    
    # 2. 제대로 된 컬럼명으로 재업로드
    upload_regions_properly(supabase, excel_file_path)
    upload_countries_properly(supabase, excel_file_path)
    upload_route_summary_properly(supabase, excel_file_path)
    
    logger.info("✅ 모든 테이블이 제대로 된 컬럼명으로 업데이트되었습니다!")

if __name__ == "__main__":
    main()