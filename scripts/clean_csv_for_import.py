#!/usr/bin/env python3
"""
CSV 파일의 숫자 형식을 정리하여 Supabase import가 가능하도록 변환
"""

import pandas as pd
import re

def clean_csv_for_import():
    """CSV 파일의 숫자 형식 정리"""
    
    # 원본 파일 읽기
    input_file = 'D:/Dev/epsilon-data-analyzer/data/gtm/Global_Sales.csv'
    output_file = 'D:/Dev/epsilon-data-analyzer/data/gtm/Global_Sales_cleaned.csv'
    
    # CSV 읽기
    df = pd.read_csv(input_file, encoding='utf-8-sig')
    
    print(f"원본 데이터: {len(df)} 행")
    print("컬럼 목록:", df.columns.tolist())
    
    # 매출액 컬럼들 찾기
    revenue_columns = [col for col in df.columns if '매출액' in col]
    print(f"\n매출액 컬럼 {len(revenue_columns)}개 발견:")
    for col in revenue_columns:
        print(f"  - {col}")
    
    # 숫자 형식 정리 함수
    def clean_numeric(value):
        if pd.isna(value):
            return ''  # NULL로 처리
        if isinstance(value, (int, float)):
            return str(value)
        if isinstance(value, str):
            # 쉼표, 공백, 따옴표 제거
            cleaned = value.replace(',', '').replace(' ', '').replace('"', '').strip()
            if cleaned == '' or cleaned == '0':
                return cleaned
            try:
                # 숫자로 변환 가능한지 확인
                float(cleaned)
                return cleaned
            except:
                return ''
        return ''
    
    # 매출액 컬럼들 정리
    for col in revenue_columns:
        df[col] = df[col].apply(clean_numeric)
        print(f"정리 완료: {col}")
    
    # 용량 컬럼도 정리 (숫자일 수 있음)
    if '용량' in df.columns:
        df['용량'] = df['용량'].apply(lambda x: str(x) if pd.notna(x) else '')
    
    # 영문 헤더로 변경
    column_mapping = {
        '구분': 'division',
        '결산구분': 'settlement_type',
        'BM담당': 'bm_manager',
        '정산담당': 'settlement_manager',
        '통합고객명': 'customer_name',
        '국내/해외': 'domestic_overseas',
        '채널': 'channel',
        '고객군': 'customer_group',
        '서비스유형': 'service_type',
        '서비스ID': 'service_id',
        'POP': 'pop',
        '용량': 'capacity',
        '용량단위': 'capacity_unit',
        '2506 매출액': 'revenue_2506',
        '2505 매출액': 'revenue_2505',
        '2504 매출액': 'revenue_2504',
        '2503 매출액': 'revenue_2503',
        '2502 매출액': 'revenue_2502',
        '2501 매출액': 'revenue_2501',
        '2412 매출액': 'revenue_2412',
        '2411 매출액': 'revenue_2411',
        '2410 매출액': 'revenue_2410',
        '2409 매출액': 'revenue_2409',
        '2408 매출액': 'revenue_2408'
    }
    
    # 컬럼명 변경
    df = df.rename(columns=column_mapping)
    
    # CSV로 저장 (인덱스 제외)
    df.to_csv(output_file, index=False, encoding='utf-8-sig')
    
    print(f"\nCleaned file created: {output_file}")
    print("\nSample data (first 3 rows):")
    print(df[['service_id', 'customer_name', 'revenue_2506', 'revenue_2505']].head(3))
    
    # 통계 출력
    print("\n=== Data Statistics ===")
    for col in [c for c in df.columns if c.startswith('revenue_')]:
        non_empty = df[col].apply(lambda x: x != '').sum()
        print(f"{col}: {non_empty} records")
    
    return output_file

if __name__ == "__main__":
    output = clean_csv_for_import()
    print(f"\nNext file to import to Supabase:")
    print(f"  {output}")
    print("\nIn Supabase Table Editor:")
    print("1. Select gtm_sales table")
    print("2. Click Import Data")
    print("3. Select Global_Sales_cleaned.csv")
    print("4. Execute Import")