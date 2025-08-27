# -*- coding: utf-8 -*-
import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv
import json

# UTF-8 인코딩 설정
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Load environment variables
load_dotenv()

# Supabase 연결 (Service Role Key 사용)
url = os.environ.get("VITE_SUPABASE_URL")
service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not service_key:
    print("Error: Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
    exit(1)

print("GTM Customers 테이블 구조 확인")
print("=" * 60)

try:
    # Service Role Key로 연결 (더 많은 권한)
    supabase: Client = create_client(url, service_key)
    print(f"Supabase 연결 성공: {url}")
    print()
    
    # RPC를 통해 테이블 컬럼 정보 조회
    query = """
    SELECT 
        column_name,
        data_type,
        character_maximum_length,
        column_default,
        is_nullable
    FROM information_schema.columns
    WHERE table_name = 'gtm_customers'
    ORDER BY ordinal_position;
    """
    
    # 테이블 구조를 확인하기 위해 한 행만 조회
    result = supabase.table('gtm_customers').select('*').limit(1).execute()
    
    if result.data and len(result.data) > 0:
        print("현재 gtm_customers 테이블 필드:")
        print("-" * 60)
        for key in result.data[0].keys():
            # 새로 추가해야 할 필드 체크
            if key in ['annual_revenue', 'revenue_year', 'revenue_currency', 
                      'industry_category', 'industry_subcategory', 'business_type', 
                      'employee_count', 'establishment_year']:
                print(f"  ✅ {key} - 존재함")
            else:
                print(f"     {key}")
    else:
        # 데이터가 없어도 테이블 구조는 확인 가능
        print("테이블에 데이터가 없어 구조 확인이 어렵습니다.")
        print("\n더미 데이터를 삽입하여 확인합니다...")
        
        # 테스트 데이터 삽입
        test_data = {
            'customer_id': 'TEST001',
            'customer_name': '테스트 고객',
            'headquarters': '서울',
            'team': '테스트팀',
            'overseas_presence_2025': False,
            'kt_global_data_usage_2025': False,
            'other_global_data_usage': False
        }
        
        insert_result = supabase.table('gtm_customers').insert(test_data).execute()
        
        if insert_result.data:
            print("\n테스트 데이터 삽입 성공")
            print("\n현재 필드:")
            print("-" * 60)
            for key in insert_result.data[0].keys():
                if key in ['annual_revenue', 'revenue_year', 'revenue_currency', 
                          'industry_category', 'industry_subcategory', 'business_type', 
                          'employee_count', 'establishment_year']:
                    print(f"  ✅ {key} - 존재함")
                else:
                    print(f"     {key}")
            
            # 테스트 데이터 삭제
            supabase.table('gtm_customers').delete().eq('customer_id', 'TEST001').execute()
            print("\n테스트 데이터 삭제됨")
    
    print("\n" + "=" * 60)
    print("필수 필드 체크 결과:")
    print("-" * 60)
    
    required_fields = {
        'annual_revenue': '연간 매출액 (억원)',
        'revenue_currency': '매출 통화',
        'revenue_year': '매출 기준년도',
        'industry_category': '산업 분류',
        'industry_subcategory': '산업 세부분류',
        'business_type': '사업 유형 (B2B/B2C 등)',
        'employee_count': '직원 수',
        'establishment_year': '설립 연도'
    }
    
    # 필드 존재 여부 확인
    if result.data and len(result.data) > 0:
        existing_fields = list(result.data[0].keys())
    elif insert_result.data and len(insert_result.data) > 0:
        existing_fields = list(insert_result.data[0].keys())
    else:
        existing_fields = []
    
    missing_fields = []
    for field, description in required_fields.items():
        if field in existing_fields:
            print(f"✅ {field}: {description}")
        else:
            print(f"❌ {field}: {description} - 없음")
            missing_fields.append(field)
    
    if missing_fields:
        print("\n⚠️ 누락된 필드가 있습니다!")
        print("\nSupabase Studio에서 다음 SQL을 실행하세요:")
        print("-" * 60)
        print("ALTER TABLE gtm_customers")
        for field in missing_fields:
            if field == 'annual_revenue':
                print(f"ADD COLUMN IF NOT EXISTS {field} DECIMAL(15, 2),")
            elif field in ['revenue_year', 'employee_count', 'establishment_year']:
                print(f"ADD COLUMN IF NOT EXISTS {field} INTEGER,")
            elif field == 'revenue_currency':
                print(f"ADD COLUMN IF NOT EXISTS {field} VARCHAR(10) DEFAULT 'KRW',")
            else:
                print(f"ADD COLUMN IF NOT EXISTS {field} VARCHAR(100),")
        print("ADD COLUMN IF NOT EXISTS revenue_notes TEXT;")
        print("-" * 60)
        print("\nSupabase Studio URL: https://supabase.com/dashboard/project/iklsghevdtqqkjuaympc/editor")
    else:
        print("\n✅ 모든 필드가 정상적으로 존재합니다!")
        print("\nGTM 데이터 관리 페이지에서 데이터를 입력할 수 있습니다:")
        print("http://localhost:5173/?view=gtm-data-management")
        
except Exception as e:
    print(f"\n오류 발생: {str(e)}")
    print("\n디버깅 정보:")
    print(f"URL: {url}")
    print(f"Service Key 존재: {'Yes' if service_key else 'No'}")