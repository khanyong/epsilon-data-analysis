#!/usr/bin/env python3
"""
CSV를 여러 개의 작은 SQL INSERT 문으로 분할하여 생성
Supabase에서 직접 실행 가능
"""

import pandas as pd
import math

def create_batch_sql():
    """CSV를 배치 SQL로 변환"""
    
    # 정리된 CSV 파일 읽기
    csv_path = 'D:/Dev/epsilon-data-analyzer/data/gtm/Global_Sales_cleaned.csv'
    df = pd.read_csv(csv_path)
    
    print(f"Total rows: {len(df)}")
    
    # 배치 크기 (한 번에 처리할 행 수)
    batch_size = 100
    num_batches = math.ceil(len(df) / batch_size)
    
    print(f"Creating {num_batches} SQL files ({batch_size} rows each)")
    
    for batch_num in range(num_batches):
        start_idx = batch_num * batch_size
        end_idx = min((batch_num + 1) * batch_size, len(df))
        batch_df = df[start_idx:end_idx]
        
        # SQL 파일 생성
        sql_file = f'D:/Dev/epsilon-data-analyzer/scripts/batch_insert_{batch_num + 1:03d}.sql'
        
        with open(sql_file, 'w', encoding='utf-8') as f:
            f.write(f"-- Batch {batch_num + 1} of {num_batches}\n")
            f.write(f"-- Rows {start_idx + 1} to {end_idx}\n\n")
            
            f.write("INSERT INTO gtm_sales (\n")
            f.write("    division, settlement_type, bm_manager, settlement_manager, customer_name,\n")
            f.write("    domestic_overseas, channel, customer_group, service_type, service_id,\n")
            f.write("    pop, capacity, capacity_unit,\n")
            f.write("    revenue_2506, revenue_2505, revenue_2504, revenue_2503, revenue_2502,\n")
            f.write("    revenue_2501, revenue_2412, revenue_2411, revenue_2410, revenue_2409, revenue_2408\n")
            f.write(") VALUES\n")
            
            values_list = []
            
            for idx, row in batch_df.iterrows():
                values = []
                
                # 텍스트 필드들
                for col in ['division', 'settlement_type', 'bm_manager', 'settlement_manager', 
                           'customer_name', 'domestic_overseas', 'channel', 'customer_group',
                           'service_type', 'service_id', 'pop', 'capacity', 'capacity_unit']:
                    val = row[col]
                    if pd.isna(val) or val == '':
                        values.append('NULL')
                    else:
                        # SQL escape
                        escaped = str(val).replace("'", "''")
                        values.append(f"'{escaped}'")
                
                # 숫자 필드들 (revenue)
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
        
        print(f"Created: batch_insert_{batch_num + 1:03d}.sql")
    
    # 마스터 실행 파일 생성
    with open('D:/Dev/epsilon-data-analyzer/scripts/run_all_batches.sql', 'w', encoding='utf-8') as f:
        f.write("-- Execute all batch inserts\n")
        f.write("-- Run each file in Supabase SQL Editor\n\n")
        for i in range(num_batches):
            f.write(f"-- Batch {i+1}: batch_insert_{i+1:03d}.sql\n")
    
    print(f"\nCreated {num_batches} SQL files")
    print("\nTo import data:")
    print("1. Open Supabase SQL Editor")
    print("2. Run each batch_insert_XXX.sql file")
    print("3. Start with batch_insert_001.sql")
    
    return num_batches

if __name__ == "__main__":
    num_batches = create_batch_sql()
    print(f"\nTotal batches created: {num_batches}")