#!/usr/bin/env python3
"""
새로운 월 데이터를 GTM Sales에 추가하는 스크립트
"""

import pandas as pd
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise ValueError("Supabase credentials required")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

def add_new_month_from_csv(csv_path, month_code):
    """
    새로운 월 데이터 추가
    예: add_new_month_from_csv('Global_Sales.csv', '2507')
    """
    
    # CSV 읽기
    df = pd.read_csv(csv_path, encoding='utf-8-sig')
    print(f"Processing {len(df)} rows for month {month_code}")
    
    # 해당 월 컬럼 찾기
    revenue_col = f'revenue_{month_code}'
    if revenue_col not in df.columns:
        print(f"Column {revenue_col} not found in CSV")
        return
    
    success_count = 0
    
    for idx, row in df.iterrows():
        service_id = row['service_id']
        revenue = row[revenue_col]
        
        if pd.notna(service_id) and pd.notna(revenue):
            # 숫자 정리 (쉼표 제거)
            if isinstance(revenue, str):
                revenue = float(revenue.replace(',', '').replace('"', ''))
            
            # 매출 데이터 추가/업데이트
            data = {
                'service_id': service_id,
                'revenue_month': month_code,
                'revenue_amount': revenue
            }
            
            # UPSERT (있으면 업데이트, 없으면 추가)
            supabase.table('gtm_sales_revenues').upsert(
                data,
                on_conflict='service_id,revenue_month'
            ).execute()
            
            success_count += 1
    
    print(f"Added/Updated {success_count} records for month {month_code}")
    
    # 새로운 서비스가 있으면 마스터에도 추가
    update_master_from_csv(df)

def update_master_from_csv(df):
    """마스터 테이블 업데이트 (새로운 서비스만)"""
    
    for idx, row in df.iterrows():
        if pd.notna(row['service_id']):
            master_data = {
                'service_id': row['service_id'],
                'division': row.get('division'),
                'settlement_type': row.get('settlement_type'),
                'bm_manager': row.get('bm_manager'),
                'settlement_manager': row.get('settlement_manager'),
                'customer_name': row.get('customer_name', 'Unknown'),
                'domestic_overseas': row.get('domestic_overseas'),
                'channel': row.get('channel'),
                'customer_group': row.get('customer_group'),
                'service_type': row.get('service_type'),
                'pop': row.get('pop'),
                'capacity': str(row.get('capacity', '')),
                'capacity_unit': row.get('capacity_unit')
            }
            
            # UPSERT (기존 서비스는 업데이트, 새 서비스는 추가)
            supabase.table('gtm_sales_master').upsert(
                master_data,
                on_conflict='service_id'
            ).execute()

def update_all_months_from_csv(csv_path):
    """CSV의 모든 월 데이터 업데이트"""
    
    df = pd.read_csv(csv_path, encoding='utf-8-sig')
    
    # revenue로 시작하는 모든 컬럼 찾기
    revenue_cols = [col for col in df.columns if col.startswith('revenue_')]
    
    for col in revenue_cols:
        month_code = col.replace('revenue_', '')
        print(f"Processing month {month_code}")
        add_new_month_from_csv(csv_path, month_code)

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python add_new_month.py <csv_file> <month_code>")
        print("  python add_new_month.py Global_Sales.csv 2507")
        print("\nOr update all months:")
        print("  python add_new_month.py Global_Sales.csv --all")
        sys.exit(1)
    
    csv_file = sys.argv[1]
    
    if len(sys.argv) > 2 and sys.argv[2] == '--all':
        update_all_months_from_csv(csv_file)
    elif len(sys.argv) > 2:
        month_code = sys.argv[2]
        add_new_month_from_csv(csv_file, month_code)
    else:
        print("Please specify month code or --all")