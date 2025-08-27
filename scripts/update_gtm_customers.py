#!/usr/bin/env python3
"""
GTM Customers 테이블에 GTM-data-add.csv 파일의 데이터를 업데이트하는 스크립트
customer_id를 기준으로 매칭하여 빈 컬럼들을 채웁니다.
"""

import pandas as pd
import os
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv
import numpy as np

# 환경 변수 로드
load_dotenv()

# Supabase 클라이언트 설정
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('VITE_SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("SUPABASE_URL과 SUPABASE_KEY가 필요합니다.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def parse_boolean(value):
    """문자열 값을 Boolean으로 변환"""
    if pd.isna(value) or value == '':
        return None
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        value = value.strip().upper()
        if value in ['O', 'YES', 'TRUE', '1', 'Y']:
            return True
        elif value in ['X', 'NO', 'FALSE', '0', 'N']:
            return False
    return None

def parse_decimal(value):
    """문자열 값을 Decimal로 변환"""
    if pd.isna(value) or value == '':
        return None
    if isinstance(value, str):
        value = value.replace(',', '').replace(' ', '').strip()
        if value == '':
            return None
    try:
        return float(value)
    except:
        return None

def parse_date(value):
    """문자열 값을 Date로 변환"""
    if pd.isna(value) or value == '':
        return None
    if isinstance(value, str):
        try:
            # 다양한 날짜 형식 시도
            for fmt in ['%Y-%m-%d', '%Y/%m/%d', '%d/%m/%Y', '%d-%m-%Y', '%Y.%m.%d']:
                try:
                    return datetime.strptime(value, fmt).strftime('%Y-%m-%d')
                except:
                    continue
        except:
            return None
    return None

def update_gtm_customers():
    """GTM Customers 테이블 업데이트"""
    
    # CSV 파일 읽기
    csv_path = 'D:/Dev/epsilon-data-analyzer/data/gtm/GTM-data-add.csv'
    df = pd.read_csv(csv_path, encoding='utf-8-sig')
    
    print(f"CSV 파일에서 {len(df)} 행의 데이터를 읽었습니다.")
    
    # 컬럼 매핑 정의
    column_mapping = {
        'business_opportunity_type': 'business_opportunity_type',
        'customer_name': 'customer_name',
        'customer_id': 'customer_id',
        'parent_company': 'parent_company',
        'business_number': 'business_number',
        'headquarters': 'headquarters',
        'department_head': 'department_head',
        'division': 'division',
        'team': 'team',
        'team_leader': 'team_leader',
        'sales_representative': 'sales_representative',
        'revenue_2024': 'revenue_2024',
        'overseas_presence_2025': 'overseas_presence_2025',
        'kt_global_data_usage_2025': 'kt_global_data_usage_2025',
        'kt_contract_period': 'kt_contract_period',
        'kt_monthly_fee': 'kt_monthly_fee',
        'other_global_data_usage': 'other_global_data_usage',
        'other_provider_name': 'other_provider_name',
        'other_contract_period': 'other_contract_period',
        'other_monthly_fee': 'other_monthly_fee',
        'renewal_date': 'renewal_date',
        'usage_intl_dedicated_mpls': 'usage_intl_dedicated_mpls',
        'usage_sd_wan': 'usage_sd_wan',
        'usage_internet_vpn': 'usage_internet_vpn',
        'customer_needs': 'customer_needs',
        'notes': 'notes'
    }
    
    success_count = 0
    error_count = 0
    new_count = 0
    update_count = 0
    errors = []
    
    for index, row in df.iterrows():
        try:
            # customer_id가 없으면 건너뛰기
            if pd.isna(row['customer_id']) or row['customer_id'] == '':
                print(f"행 {index + 1}: customer_id가 없어 건너뜁니다.")
                continue
            
            customer_id = str(row['customer_id']).strip()
            
            # 기존 레코드 확인
            existing = supabase.table('gtm_customers').select('*').eq('customer_id', customer_id).execute()
            
            # 데이터 준비
            update_data = {}
            
            for csv_col, db_col in column_mapping.items():
                if csv_col in row.index:
                    value = row[csv_col]
                    
                    # 데이터 타입에 따른 변환
                    if db_col in ['overseas_presence_2025', 'kt_global_data_usage_2025', 
                                  'other_global_data_usage', 'usage_intl_dedicated_mpls', 
                                  'usage_sd_wan', 'usage_internet_vpn']:
                        # Boolean 필드
                        converted_value = parse_boolean(value)
                        if converted_value is not None:
                            update_data[db_col] = converted_value
                    
                    elif db_col in ['revenue_2024', 'kt_monthly_fee', 'other_monthly_fee']:
                        # Decimal 필드
                        converted_value = parse_decimal(value)
                        if converted_value is not None:
                            update_data[db_col] = converted_value
                    
                    elif db_col == 'renewal_date':
                        # Date 필드
                        converted_value = parse_date(value)
                        if converted_value is not None:
                            update_data[db_col] = converted_value
                    
                    else:
                        # 문자열 필드
                        if pd.notna(value) and str(value).strip() != '':
                            update_data[db_col] = str(value).strip()
            
            if existing.data and len(existing.data) > 0:
                # 기존 레코드가 있으면 업데이트
                # 빈 값만 업데이트 (기존 값이 있으면 유지)
                existing_record = existing.data[0]
                filtered_update = {}
                
                for key, value in update_data.items():
                    # 기존 값이 None이거나 빈 문자열인 경우에만 업데이트
                    if existing_record.get(key) is None or existing_record.get(key) == '':
                        filtered_update[key] = value
                
                if filtered_update:
                    # updated_at 추가
                    filtered_update['updated_at'] = datetime.now().isoformat()
                    
                    result = supabase.table('gtm_customers').update(
                        filtered_update
                    ).eq('customer_id', customer_id).execute()
                    
                    print(f"행 {index + 1}: {customer_id} - {len(filtered_update)}개 필드 업데이트됨")
                    update_count += 1
                else:
                    print(f"행 {index + 1}: {customer_id} - 업데이트할 필드 없음")
            else:
                # 새 레코드 삽입
                update_data['created_at'] = datetime.now().isoformat()
                update_data['status'] = 'active'
                
                result = supabase.table('gtm_customers').insert(update_data).execute()
                print(f"행 {index + 1}: {customer_id} - 새 레코드 생성됨")
                new_count += 1
            
            success_count += 1
            
        except Exception as e:
            error_count += 1
            error_msg = f"행 {index + 1} 처리 중 오류: {str(e)}"
            print(error_msg)
            errors.append(error_msg)
    
    # 결과 요약
    print("\n" + "="*50)
    print("업데이트 완료:")
    print(f"  - 성공: {success_count}개")
    print(f"    - 새로 생성: {new_count}개")
    print(f"    - 기존 업데이트: {update_count}개")
    print(f"  - 실패: {error_count}개")
    
    if errors:
        print("\n오류 목록:")
        for error in errors[:10]:  # 처음 10개만 출력
            print(f"  - {error}")
        if len(errors) > 10:
            print(f"  ... 그리고 {len(errors) - 10}개 더")
    
    return success_count, error_count

def verify_update():
    """업데이트 결과 검증"""
    print("\n업데이트 결과 검증 중...")
    
    # 전체 레코드 수 확인
    result = supabase.table('gtm_customers').select('count', count='exact').execute()
    total_count = result.count
    
    # 각 필드별 채워진 데이터 수 확인
    fields_to_check = [
        'business_opportunity_type',
        'parent_company',
        'business_number',
        'revenue_2024',
        'overseas_presence_2025',
        'kt_global_data_usage_2025',
        'other_global_data_usage',
        'renewal_date'
    ]
    
    print(f"\n총 레코드 수: {total_count}")
    print("\n주요 필드별 데이터 현황:")
    
    for field in fields_to_check:
        # NULL이 아닌 레코드 수 확인
        result = supabase.table('gtm_customers').select(field).not_.is_('', field).execute()
        filled_count = len([r for r in result.data if r[field] is not None and r[field] != ''])
        percentage = (filled_count / total_count * 100) if total_count > 0 else 0
        print(f"  - {field}: {filled_count}/{total_count} ({percentage:.1f}%)")

if __name__ == "__main__":
    print("GTM Customers 테이블 업데이트 시작...")
    print("="*50)
    
    try:
        # 업데이트 실행
        success, errors = update_gtm_customers()
        
        # 결과 검증
        if success > 0:
            verify_update()
        
    except Exception as e:
        print(f"\n스크립트 실행 중 오류 발생: {str(e)}")
        import traceback
        traceback.print_exc()