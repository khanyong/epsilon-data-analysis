#!/usr/bin/env python3
"""
누락된 데이터 확인 및 SQL 생성
"""

import pandas as pd

def check_missing_data():
    """CSV 파일과 입력된 데이터 비교"""
    
    # CSV 파일 읽기
    csv_path = 'D:/Dev/epsilon-data-analyzer/data/gtm/Global_Sales_cleaned.csv'
    df = pd.read_csv(csv_path)
    
    print(f"Total rows in CSV: {len(df)}")
    
    # service_id가 없는 행 확인
    missing_service_id = df[df['service_id'].isna() | (df['service_id'] == '')]
    print(f"\nRows without service_id: {len(missing_service_id)}")
    
    # 중복 service_id 확인
    duplicates = df[df.duplicated(subset=['service_id'], keep=False)]
    if len(duplicates) > 0:
        print(f"\nDuplicate service_ids found: {len(duplicates)} rows")
        print("Sample duplicates:")
        print(duplicates[['service_id', 'customer_name']].head(10))
    
    # 각 service_id별 행 수
    service_counts = df.groupby('service_id').size()
    multiple_rows = service_counts[service_counts > 1]
    if len(multiple_rows) > 0:
        print(f"\nService IDs with multiple rows: {len(multiple_rows)}")
        print(multiple_rows.head(10))
    
    # 누락된 데이터를 위한 SQL 생성 (501번째부터)
    start_row = 953
    remaining_df = df[start_row:]
    
    print(f"\nGenerating SQL for rows {start_row + 1} to {len(df)}")
    print(f"Remaining rows: {len(remaining_df)}")
    
    # SQL 파일 생성
    sql_file = 'D:/Dev/epsilon-data-analyzer/scripts/insert_remaining_data.sql'
    
    with open(sql_file, 'w', encoding='utf-8') as f:
        f.write(f"-- Insert remaining {len(remaining_df)} rows\n")
        f.write(f"-- Rows {start_row + 1} to {len(df)}\n\n")
        
        # 100개씩 배치로 나누기
        batch_size = 100
        
        for batch_start in range(0, len(remaining_df), batch_size):
            batch_end = min(batch_start + batch_size, len(remaining_df))
            batch = remaining_df.iloc[batch_start:batch_end]
            
            f.write(f"\n-- Batch {batch_start//batch_size + 1}\n")
            f.write("INSERT INTO gtm_sales (\n")
            f.write("    division, settlement_type, bm_manager, settlement_manager, customer_name,\n")
            f.write("    domestic_overseas, channel, customer_group, service_type, service_id,\n")
            f.write("    pop, capacity, capacity_unit,\n")
            f.write("    revenue_2506, revenue_2505, revenue_2504, revenue_2503, revenue_2502,\n")
            f.write("    revenue_2501, revenue_2412, revenue_2411, revenue_2410, revenue_2409, revenue_2408\n")
            f.write(") VALUES\n")
            
            values_list = []
            
            for idx, row in batch.iterrows():
                values = []
                
                # 텍스트 필드들
                for col in ['division', 'settlement_type', 'bm_manager', 'settlement_manager', 
                           'customer_name', 'domestic_overseas', 'channel', 'customer_group',
                           'service_type', 'service_id', 'pop', 'capacity', 'capacity_unit']:
                    val = row[col]
                    if pd.isna(val) or val == '' or val == 'nan':
                        values.append('NULL')
                    else:
                        # SQL escape
                        escaped = str(val).replace("'", "''")
                        values.append(f"'{escaped}'")
                
                # 숫자 필드들
                for col in ['revenue_2506', 'revenue_2505', 'revenue_2504', 'revenue_2503',
                           'revenue_2502', 'revenue_2501', 'revenue_2412', 'revenue_2411',
                           'revenue_2410', 'revenue_2409', 'revenue_2408']:
                    val = row[col]
                    if pd.isna(val):
                        values.append('NULL')
                    else:
                        values.append(str(val))
                
                values_str = f"({', '.join(values)})"
                values_list.append(values_str)
            
            f.write(',\n'.join(values_list))
            f.write(";\n")
    
    print(f"\nSQL file created: {sql_file}")
    print("\nTo add remaining data:")
    print("1. Open Supabase SQL Editor")
    print("2. Run insert_remaining_data.sql")
    
    # 데이터 검증
    print("\n=== Data Verification ===")
    print(f"Rows 1-953: Already in database")
    print(f"Rows 954-{len(df)}: Need to be added ({len(remaining_df)} rows)")
    
    return sql_file

if __name__ == "__main__":
    check_missing_data()