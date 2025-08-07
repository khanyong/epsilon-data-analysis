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

def get_table_column_mapping():
    """각 테이블별 정확한 컬럼 매핑"""
    return {
        "euro_pricing_country_routes": {
            "source_columns": ["country1", "country2", "subregion1", "subregion2", "region1", "region2", 
                             "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", 
                             "2025", "2026", "2027", "2028", "2029", "2030", "2023-30"],
            "target_columns": ["country1", "country2", "subregion1", "subregion2", "region1", "region2",
                             "year_2017", "year_2018", "year_2019", "year_2020", "year_2021", "year_2022", 
                             "year_2023", "year_2024", "year_2025", "year_2026", "year_2027", "year_2028", 
                             "year_2029", "year_2030", "cagr_2023_30"]
        },
        "euro_pricing_wholesale_prices": {
            "source_columns": ["wholesale_prices", "2017", "2018", "2019", "2020", "2021", "2022", "2023", 
                             "2024", "2025", "2026", "2027", "2028", "2029", "2030", "cagr_2023_30"],
            "target_columns": ["route_name", "year_2017", "year_2018", "year_2019", "year_2020", 
                             "year_2021", "year_2022", "year_2023", "year_2024", "year_2025", 
                             "year_2026", "year_2027", "year_2028", "year_2029", "year_2030", "cagr_2023_30"]
        },
        "euro_pricing_trans_atlantic": {
            "source_columns": ["trans_atlantic_deployments_prices_and_revenues", "2017", "2018", "2019", "2020", "2021", "2022", "2023", 
                             "2024", "2025", "2026", "2027", "2028", "2029", "2030", "cagr_2023_30"],
            "target_columns": ["metric_name", "year_2017", "year_2018", "year_2019", "year_2020", 
                             "year_2021", "year_2022", "year_2023", "year_2024", "year_2025", 
                             "year_2026", "year_2027", "year_2028", "year_2029", "year_2030", "cagr_2023_30"]
        },
        "euro_pricing_trans_pacific": {
            "source_columns": ["trans_pacific_deployments_prices_and_revenues", "2017", "2018", "2019", "2020", "2021", "2022", "2023", 
                             "2024", "2025", "2026", "2027", "2028", "2029", "2030", "cagr_2023_30"],
            "target_columns": ["metric_name", "year_2017", "year_2018", "year_2019", "year_2020", 
                             "year_2021", "year_2022", "year_2023", "year_2024", "year_2025", 
                             "year_2026", "year_2027", "year_2028", "year_2029", "year_2030", "cagr_2023_30"]
        },
        "euro_pricing_lease_iru_calculator": {
            "source_columns": ["parameter", "value", "unit", "note"],
            "target_columns": ["parameter", "value", "unit", "note"]
        }
    }

def upload_country_routes(supabase, excel_file_path):
    """Country Routes 시트 업로드"""
    logger.info("🔄 Country Routes 시트 처리 중...")
    
    try:
        df = pd.read_excel(excel_file_path, sheet_name='Country Routes')
        
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
            df = df[df.iloc[:, 0].notna() & (df.iloc[:, 0] != '')]
        
        # 컬럼 매핑
        column_map = {}
        expected_cols = ["Country1", "Country2", "Subregion1", "Subregion2", "Region1", "Region2"]
        
        for i, col in enumerate(df.columns[:6]):
            if i < len(expected_cols):
                column_map[col] = expected_cols[i]
        
        # 년도 컬럼 처리
        year_columns = []
        for col in df.columns[6:]:
            if pd.notna(col) and str(col).replace('.0', '').isdigit():
                year = str(col).replace('.0', '')
                column_map[col] = year
                year_columns.append(year)
        
        # CAGR 컬럼 (마지막 컬럼)
        if len(df.columns) > 20:
            column_map[df.columns[-1]] = "CAGR"
        
        # 데이터프레임 변환
        df_renamed = df.rename(columns=column_map)
        
        # Supabase 업로드용 데이터 준비
        records = []
        for _, row in df_renamed.iterrows():
            record = {
                "country1": str(row.get("Country1", "")),
                "country2": str(row.get("Country2", "")),
                "subregion1": str(row.get("Subregion1", "")),
                "subregion2": str(row.get("Subregion2", "")),
                "region1": str(row.get("Region1", "")),
                "region2": str(row.get("Region2", ""))
            }
            
            # 년도 데이터 추가
            for year in ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]:
                if year in row.index and pd.notna(row[year]):
                    try:
                        record[f"year_{year}"] = float(row[year]) if str(row[year]).replace('.', '').replace('-', '').isdigit() else None
                    except:
                        record[f"year_{year}"] = None
                else:
                    record[f"year_{year}"] = None
            
            # CAGR 추가
            if "CAGR" in row.index:
                record["cagr_2023_30"] = str(row["CAGR"]) if pd.notna(row["CAGR"]) else None
            else:
                record["cagr_2023_30"] = None
            
            records.append(record)
        
        logger.info(f"  📤 {len(records)}개 레코드를 업로드 중...")
        
        # 배치 업로드 (1000개씩)
        batch_size = 1000
        total_uploaded = 0
        
        for i in range(0, len(records), batch_size):
            batch = records[i:i+batch_size]
            try:
                result = supabase.table("euro_pricing_country_routes").insert(batch).execute()
                total_uploaded += len(batch)
                logger.info(f"  ✅ {len(batch)}개 레코드 업로드 완료 (총 {total_uploaded}/{len(records)})")
            except Exception as e:
                logger.error(f"  ❌ 배치 업로드 실패: {str(e)}")
        
        logger.info(f"  🎉 Country Routes 완료: 총 {total_uploaded}개 레코드 업로드")
        
    except Exception as e:
        logger.error(f"❌ Country Routes 처리 오류: {str(e)}")

def upload_lease_calculator(supabase, excel_file_path):
    """Lease-IRU Calculator 시트 업로드"""
    logger.info("🔄 Lease-IRU Calculator 시트 처리 중...")
    
    try:
        df = pd.read_excel(excel_file_path, sheet_name='Lease-IRU Calculator')
        
        # 데이터 정리
        df = df.dropna(how='all')
        
        records = []
        for _, row in df.iterrows():
            if pd.notna(row.iloc[0]) and str(row.iloc[0]).strip() != '':
                record = {
                    "parameter": str(row.iloc[0]) if pd.notna(row.iloc[0]) else "",
                    "value": str(row.iloc[1]) if len(row) > 1 and pd.notna(row.iloc[1]) else "",
                    "unit": str(row.iloc[2]) if len(row) > 2 and pd.notna(row.iloc[2]) else "",
                    "note": str(row.iloc[3]) if len(row) > 3 and pd.notna(row.iloc[3]) else ""
                }
                records.append(record)
        
        if records:
            logger.info(f"  📤 {len(records)}개 레코드를 업로드 중...")
            result = supabase.table("euro_pricing_lease_iru_calculator").insert(records).execute()
            logger.info(f"  ✅ Lease Calculator 완료: {len(records)}개 레코드 업로드")
        else:
            logger.warning("  ⚠️ 업로드할 데이터가 없습니다.")
            
    except Exception as e:
        logger.error(f"❌ Lease Calculator 처리 오류: {str(e)}")

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
    
    logger.info("=== 수정된 Euro Pricing 데이터 업로드 ===")
    
    # 주요 시트들만 업로드
    upload_country_routes(supabase, excel_file_path)
    upload_lease_calculator(supabase, excel_file_path)
    
    logger.info("✅ 업로드 완료!")

if __name__ == "__main__":
    main()