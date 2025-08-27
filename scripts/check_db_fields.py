# -*- coding: utf-8 -*-
import os
import sys
import json
from supabase import create_client, Client
from dotenv import load_dotenv

# UTF-8 인코딩 설정
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Load environment variables
load_dotenv()

# Initialize Supabase client
url = os.environ.get("VITE_SUPABASE_URL") or os.environ.get("SUPABASE_URL", "http://localhost:54321")
key = os.environ.get("VITE_SUPABASE_ANON_KEY") or os.environ.get("SUPABASE_ANON_KEY", "")

if not key:
    print("❌ Error: SUPABASE_ANON_KEY not found")
    exit(1)

print("🔍 GTM Customers 테이블 필드 확인")
print("=" * 60)

try:
    supabase: Client = create_client(url, key)
    print(f"✅ Supabase 연결 성공: {url}")
    
    # 1. gtm_customers 테이블 데이터 조회 (1개만)
    print("\n📊 GTM Customers 테이블 샘플 데이터:")
    print("-" * 60)
    
    response = supabase.table('gtm_customers').select('*').limit(1).execute()
    
    if response.data and len(response.data) > 0:
        customer = response.data[0]
        print("\n첫 번째 고객 데이터 필드들:")
        for key, value in customer.items():
            # 새로 추가된 필드 강조 표시
            if key in ['annual_revenue', 'revenue_year', 'revenue_currency', 
                      'industry_category', 'business_type', 'employee_count']:
                print(f"  ⭐ {key}: {value}")
            else:
                print(f"     {key}: {value}")
    else:
        print("⚠️ 테이블에 데이터가 없습니다.")
    
    # 2. 전체 고객 수 확인
    print("\n📈 통계:")
    print("-" * 60)
    
    count_response = supabase.table('gtm_customers').select('*', count='exact').execute()
    total_customers = count_response.count if hasattr(count_response, 'count') else len(count_response.data)
    print(f"전체 고객 수: {total_customers}개")
    
    # 3. 새 필드에 데이터가 있는 고객 확인
    revenue_check = supabase.table('gtm_customers').select('customer_name, annual_revenue, industry_category, business_type').not_.is_('annual_revenue', 'null').limit(5).execute()
    
    if revenue_check.data and len(revenue_check.data) > 0:
        print(f"\n✅ 매출 데이터가 있는 고객 ({len(revenue_check.data)}개 표시):")
        for customer in revenue_check.data:
            print(f"  - {customer.get('customer_name', 'N/A')}: "
                  f"연매출 {customer.get('annual_revenue', 0)}억, "
                  f"산업 {customer.get('industry_category', '-')}, "
                  f"유형 {customer.get('business_type', '-')}")
    else:
        print("\n⚠️ 아직 매출 데이터가 입력된 고객이 없습니다.")
        print("   GTM 데이터 관리 페이지에서 데이터를 입력해주세요.")
    
    # 4. 테이블 구조 확인 (RPC 호출로 컬럼 정보 확인)
    print("\n🔧 필수 필드 체크:")
    print("-" * 60)
    
    required_fields = [
        'annual_revenue',
        'revenue_currency', 
        'revenue_year',
        'industry_category',
        'industry_subcategory',
        'business_type',
        'employee_count',
        'establishment_year'
    ]
    
    if response.data and len(response.data) > 0:
        existing_fields = list(response.data[0].keys())
        
        for field in required_fields:
            if field in existing_fields:
                print(f"✅ {field} - 필드 존재")
            else:
                print(f"❌ {field} - 필드 없음 (마이그레이션 필요)")
    
    print("\n✨ 확인 완료!")
    print("\n📌 GTM 데이터 관리 페이지 접속:")
    print("   http://localhost:5173/?view=gtm-data-management")
    
except Exception as e:
    print(f"\n❌ 오류 발생: {str(e)}")
    print("\n💡 해결 방법:")
    print("1. Supabase가 실행 중인지 확인: npx supabase status")
    print("2. 환경변수 확인: .env 파일의 SUPABASE_URL과 SUPABASE_ANON_KEY")
    print("3. 마이그레이션 실행: Supabase Studio에서 SQL 실행")