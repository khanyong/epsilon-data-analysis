#!/usr/bin/env python3
"""
CSV 파일의 숫자에서 쉼표를 제거하여 Supabase import가 가능하도록 변환
"""

import pandas as pd

def clean_csv_numbers():
    """CSV 파일의 숫자 형식 정리"""
    
    # 파일 경로
    input_file = 'D:/Dev/epsilon-data-analyzer/data/gtm/Global_Sales.csv'
    output_file = 'D:/Dev/epsilon-data-analyzer/data/gtm/Global_Sales_cleaned.csv'
    
    # CSV 읽기
    df = pd.read_csv(input_file, encoding='utf-8-sig')
    
    print(f"Total rows: {len(df)}")
    print(f"Columns: {df.columns.tolist()}")
    
    # revenue로 시작하는 컬럼 찾기
    revenue_columns = [col for col in df.columns if col.startswith('revenue_')]
    print(f"\nFound {len(revenue_columns)} revenue columns")
    
    # 숫자 정리 함수
    def clean_numeric(value):
        if pd.isna(value):
            return None  # NULL로 처리
        
        # 문자열인 경우
        if isinstance(value, str):
            # 쉼표와 따옴표 제거
            cleaned = value.replace(',', '').replace('"', '').strip()
            if cleaned == '':
                return None
            try:
                # 숫자로 변환
                return float(cleaned)
            except:
                return None
        
        # 이미 숫자인 경우
        if isinstance(value, (int, float)):
            return value
            
        return None
    
    # 모든 revenue 컬럼 정리
    for col in revenue_columns:
        df[col] = df[col].apply(clean_numeric)
        non_null = df[col].notna().sum()
        print(f"  {col}: {non_null} non-null values")
    
    # capacity 컬럼도 숫자일 수 있으므로 확인
    if 'capacity' in df.columns:
        # capacity는 문자열로 유지 (10, 100 등의 값)
        df['capacity'] = df['capacity'].astype(str).replace('nan', '')
    
    # CSV로 저장
    df.to_csv(output_file, index=False, encoding='utf-8')
    
    print(f"\nCleaned file created: {output_file}")
    print("\nSample data (first 3 rows):")
    print(df[['service_id', 'customer_name', 'revenue_2506', 'revenue_2505']].head(3))
    
    return output_file

if __name__ == "__main__":
    output = clean_csv_numbers()
    print(f"\nImport this file to Supabase:")
    print(f"  {output}")
    print("\nSteps in Supabase:")
    print("1. Table Editor -> gtm_sales table")
    print("2. Import Data button")
    print("3. Select Global_Sales_cleaned.csv")
    print("4. Import")