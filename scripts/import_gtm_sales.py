#!/usr/bin/env python3
"""
GTM Global Sales 데이터를 Supabase에 입력하는 스크립트
"""

import pandas as pd
import os
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv
import json
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
    
    # 문자열인 경우 처리
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

def parse_capacity(value, unit):
    """용량을 표준화된 숫자로 변환"""
    if pd.isna(value) or value == '':
        return None
    
    try:
        # 숫자만 추출
        if isinstance(value, str):
            numbers = re.findall(r'\d+\.?\d*', value)
            if numbers:
                return float(numbers[0])
        return float(value)
    except:
        return None

def import_sales_data():
    """CSV 데이터를 Supabase에 입력"""
    
    # CSV 파일 읽기
    csv_path = 'D:/Dev/epsilon-data-analyzer/data/gtm/Global_Sales.csv'
    df = pd.read_csv(csv_path, encoding='utf-8-sig')
    
    print(f"총 {len(df)} 행의 데이터를 처리합니다.")
    
    # 기존 데이터 삭제 (선택적)
    # print("기존 데이터를 삭제합니다...")
    # supabase.table('gtm_monthly_revenue').delete().neq('id', 0).execute()
    # supabase.table('gtm_global_sales').delete().neq('id', 0).execute()
    
    success_count = 0
    error_count = 0
    errors = []
    
    for index, row in df.iterrows():
        try:
            # 서비스ID가 없으면 건너뛰기
            if pd.isna(row['서비스ID']) or row['서비스ID'] == '':
                continue
            
            # 기본 정보 준비
            sales_data = {
                'division': str(row['구분']) if pd.notna(row['구분']) else None,
                'settlement_type': str(row['결산구분']) if pd.notna(row['결산구분']) else None,
                'bm_manager': str(row['BM담당']) if pd.notna(row['BM담당']) else None,
                'settlement_manager': str(row['정산담당']) if pd.notna(row['정산담당']) else None,
                'customer_name': str(row['통합고객명']) if pd.notna(row['통합고객명']) else 'Unknown',
                'domestic_overseas': str(row['국내/해외']) if pd.notna(row['국내/해외']) else None,
                'channel': str(row['채널']) if pd.notna(row['채널']) else None,
                'customer_group': str(row['고객군']) if pd.notna(row['고객군']) else None,
                'service_type': str(row['서비스유형']) if pd.notna(row['서비스유형']) else None,
                'service_id': str(row['서비스ID']),
                'pop': str(row['POP']) if pd.notna(row['POP']) else None,
                'capacity': parse_capacity(row['용량'], row.get('용량단위')),
                'capacity_unit': str(row['용량단위']) if pd.notna(row['용량단위']) else None
            }
            
            # gtm_global_sales 테이블에 입력 (UPSERT)
            result = supabase.table('gtm_global_sales').upsert(
                sales_data,
                on_conflict='service_id'
            ).execute()
            
            # 월별 매출 데이터 처리 - 모든 월 저장 (null 값 포함)
            revenue_columns = [col for col in df.columns if '매출액' in col]
            revenue_data = []
            
            for col in revenue_columns:
                # 컬럼명에서 년월 추출 (예: "2506 매출액" -> "2025-06")
                match = re.search(r'(\d{4})\s*매출액', col)
                if match:
                    year_month = match.group(1)
                    # 년도와 월 분리
                    if len(year_month) == 4:
                        year = '20' + year_month[:2]
                        month = year_month[2:]
                        revenue_month = f"{year}-{month}-01"
                        
                        revenue_amount = parse_revenue_amount(row[col])
                        # 0이거나 null이어도 저장 (데이터 완전성을 위해)
                        # 실제 0인 매출과 데이터 없음을 구분하기 위해
                        revenue_data.append({
                            'service_id': str(row['서비스ID']),
                            'revenue_month': revenue_month,
                            'revenue_amount': revenue_amount if revenue_amount is not None else 0
                        })
            
            # 월별 매출 데이터 입력
            if revenue_data:
                for rev_item in revenue_data:
                    supabase.table('gtm_monthly_revenue').upsert(
                        rev_item,
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
    
    return success_count, error_count

if __name__ == "__main__":
    success, errors = import_sales_data()
    print(f"\n최종 결과: 성공 {success}개, 실패 {errors}개")