#!/usr/bin/env python3
"""
GTM Sales 데이터를 유연한 구조로 Supabase에 입력하는 스크립트
새로운 월이 추가되어도 스키마 변경 없이 처리 가능
"""

import pandas as pd
import os
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv
import re

# 환경 변수 로드
load_dotenv()

# Supabase 클라이언트 설정
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise ValueError("SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY가 필요합니다.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

def parse_revenue_amount(value):
    """매출액 문자열을 숫자로 변환"""
    if pd.isna(value) or value == '' or value == 0:
        return None
    
    if isinstance(value, str):
        # 쉼표와 공백 제거
        value = value.replace(',', '').replace(' ', '').replace('"', '')
        # 음수 처리
        if value.startswith('-'):
            value = '-' + value[1:].replace('-', '')
        try:
            return float(value)
        except:
            return None
    return float(value)

def import_flexible_structure():
    """CSV를 유연한 구조로 import"""
    
    # CSV 파일 읽기
    csv_path = 'D:/Dev/epsilon-data-analyzer/data/gtm/Global_Sales.csv'
    df = pd.read_csv(csv_path, encoding='utf-8-sig')
    
    print(f"총 {len(df)} 행의 데이터를 처리합니다.")
    
    success_count = 0
    error_count = 0
    errors = []
    
    # 매출액 컬럼 자동 감지 (숫자4자리 + "매출액" 패턴)
    revenue_columns = []
    for col in df.columns:
        if '매출액' in col:
            match = re.search(r'(\d{4})\s*매출액', col)
            if match:
                revenue_columns.append((col, match.group(1)))
    
    print(f"감지된 매출 컬럼: {len(revenue_columns)}개")
    for col, month in revenue_columns:
        print(f"  - {col} -> {month}")
    
    for index, row in df.iterrows():
        try:
            # 서비스ID가 없으면 건너뛰기
            if pd.isna(row['서비스ID']) or row['서비스ID'] == '':
                continue
            
            service_id = str(row['서비스ID'])
            
            # 1. 마스터 데이터 입력/업데이트
            master_data = {
                'division': str(row['구분']) if pd.notna(row['구분']) else None,
                'settlement_type': str(row['결산구분']) if pd.notna(row['결산구분']) else None,
                'bm_manager': str(row['BM담당']) if pd.notna(row['BM담당']) else None,
                'settlement_manager': str(row['정산담당']) if pd.notna(row['정산담당']) else None,
                'customer_name': str(row['통합고객명']) if pd.notna(row['통합고객명']) else 'Unknown',
                'domestic_overseas': str(row['국내/해외']) if pd.notna(row['국내/해외']) else None,
                'channel': str(row['채널']) if pd.notna(row['채널']) else None,
                'customer_group': str(row['고객군']) if pd.notna(row['고객군']) else None,
                'service_type': str(row['서비스유형']) if pd.notna(row['서비스유형']) else None,
                'service_id': service_id,
                'pop': str(row['POP']) if pd.notna(row['POP']) else None,
                'capacity': str(row['용량']) if pd.notna(row['용량']) else None,
                'capacity_unit': str(row['용량단위']) if pd.notna(row['용량단위']) else None
            }
            
            # 마스터 테이블에 UPSERT
            supabase.table('gtm_sales_master').upsert(
                master_data,
                on_conflict='service_id'
            ).execute()
            
            # 2. 월별 매출 데이터 입력
            for col_name, month_code in revenue_columns:
                revenue_amount = parse_revenue_amount(row[col_name])
                
                # NULL이 아닌 경우만 입력 (0도 저장)
                if revenue_amount is not None:
                    revenue_data = {
                        'service_id': service_id,
                        'revenue_month': month_code,
                        'revenue_amount': revenue_amount
                    }
                    
                    supabase.table('gtm_sales_revenues').upsert(
                        revenue_data,
                        on_conflict='service_id,revenue_month'
                    ).execute()
            
            success_count += 1
            if (success_count % 10) == 0:
                print(f"처리 완료: {success_count}개")
                
        except Exception as e:
            error_count += 1
            error_msg = f"행 {index} 처리 중 오류: {str(e)}"
            errors.append(error_msg)
            print(error_msg)
    
    # 결과 출력
    print("\n=== 데이터 입력 완료 ===")
    print(f"성공: {success_count}개")
    print(f"실패: {error_count}개")
    
    if errors:
        print("\n=== 오류 상세 ===")
        for error in errors[:10]:  # 처음 10개만 출력
            print(error)
    
    # 통계 출력
    print("\n=== 데이터 통계 ===")
    
    # 마스터 테이블 통계
    master_count = supabase.table('gtm_sales_master').select('count', count='exact').execute()
    print(f"총 서비스 수: {master_count.count}개")
    
    # 매출 데이터 통계
    revenue_count = supabase.table('gtm_sales_revenues').select('count', count='exact').execute()
    print(f"총 매출 레코드 수: {revenue_count.count}개")
    
    # 월별 데이터 수
    months = supabase.table('gtm_sales_revenues').select('revenue_month').execute()
    unique_months = set([r['revenue_month'] for r in months.data])
    print(f"데이터가 있는 월 수: {len(unique_months)}개월")
    print(f"월 목록: {sorted(unique_months)}")
    
    return success_count, error_count

def add_new_month_data(csv_path, month_code):
    """새로운 월 데이터만 추가하는 함수"""
    
    df = pd.read_csv(csv_path, encoding='utf-8-sig')
    
    # 특정 월 컬럼 찾기
    target_col = None
    for col in df.columns:
        if month_code in col and '매출액' in col:
            target_col = col
            break
    
    if not target_col:
        print(f"월 코드 {month_code}에 해당하는 컬럼을 찾을 수 없습니다.")
        return
    
    print(f"처리할 컬럼: {target_col}")
    
    success_count = 0
    for index, row in df.iterrows():
        if pd.isna(row['서비스ID']) or row['서비스ID'] == '':
            continue
        
        service_id = str(row['서비스ID'])
        revenue_amount = parse_revenue_amount(row[target_col])
        
        if revenue_amount is not None:
            revenue_data = {
                'service_id': service_id,
                'revenue_month': month_code,
                'revenue_amount': revenue_amount
            }
            
            supabase.table('gtm_sales_revenues').upsert(
                revenue_data,
                on_conflict='service_id,revenue_month'
            ).execute()
            
            success_count += 1
    
    print(f"{month_code} 월 데이터 {success_count}개 추가 완료")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == '--add-month':
        # 특정 월만 추가
        if len(sys.argv) < 3:
            print("사용법: python import_gtm_sales_flexible.py --add-month 2507")
            sys.exit(1)
        
        month_code = sys.argv[2]
        csv_path = 'D:/Dev/epsilon-data-analyzer/data/gtm/Global_Sales.csv'
        add_new_month_data(csv_path, month_code)
    else:
        # 전체 데이터 import
        success, errors = import_flexible_structure()
        print(f"\n최종 결과: 성공 {success}개, 실패 {errors}개")