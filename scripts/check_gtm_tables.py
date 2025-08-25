import os
from supabase import create_client, Client
from dotenv import load_dotenv
import json

# .env 파일 로드
load_dotenv()

# Supabase 클라이언트 초기화
url = os.getenv("VITE_SUPABASE_URL")
key = os.getenv("VITE_SUPABASE_ANON_KEY")

if not url or not key:
    print("Supabase URL 또는 Key가 설정되지 않았습니다.")
    exit(1)

supabase: Client = create_client(url, key)

print("=== Supabase GTM 테이블 확인 ===\n")

try:
    # 1. gtm_customers 테이블 확인
    print("1. gtm_customers 테이블:")
    customers_response = supabase.table('gtm_customers').select("*").limit(5).execute()
    print(f"   - 데이터 존재: {len(customers_response.data) > 0}")
    print(f"   - 샘플 레코드 수: {len(customers_response.data)}")
    
    if len(customers_response.data) > 0:
        print(f"   - 컬럼: {list(customers_response.data[0].keys())[:10]}...")
        
    # 전체 레코드 수 확인 - count 파라미터 수정
    count_response = supabase.table('gtm_customers').select("id", count='exact').limit(1).execute()
    print(f"   - 전체 레코드 수: {count_response.count}")
    
    # 실제 데이터 확인
    if len(customers_response.data) == 0:
        print("   - 디버그: response.data가 비어있음")
        # 다른 방식으로 시도
        alt_response = supabase.table('gtm_customers').select("customer_name").limit(1).execute()
        print(f"   - 대체 쿼리 결과: {len(alt_response.data)} 레코드")
    
    print("\n" + "="*50 + "\n")
    
    # 2. gtm_active_customers 확인 (뷰일 수도 있고 테이블일 수도 있음)
    print("2. gtm_active_customers:")
    try:
        active_response = supabase.table('gtm_active_customers').select("*").limit(5).execute()
        print(f"   - 타입: 테이블 (직접 쿼리 가능)")
        print(f"   - 데이터 존재: {len(active_response.data) > 0}")
        if active_response.data:
            print(f"   - 샘플 레코드 수: {len(active_response.data)}")
            print(f"   - 컬럼: {list(active_response.data[0].keys())[:10]}...")
            
            # 전체 레코드 수 확인
            active_count_response = supabase.table('gtm_active_customers').select("*", count='exact').execute()
            print(f"   - 전체 레코드 수: {active_count_response.count}")
    except Exception as e:
        # 뷰인 경우 RPC 호출로 시도
        try:
            view_response = supabase.rpc('get_gtm_active_customers').execute()
            print(f"   - 타입: 뷰 (RPC로 접근)")
            print(f"   - 데이터 존재: {len(view_response.data) > 0}")
        except:
            print(f"   - 접근 오류: {str(e)}")
    
    print("\n" + "="*50 + "\n")
    
    # 3. 두 테이블의 데이터 비교
    print("3. 데이터 비교:")
    
    # 데이터가 있는지 다시 확인
    has_customers_data = len(customers_response.data) > 0
    has_active_data = 'active_response' in locals() and len(active_response.data) > 0
    
    if has_customers_data and has_active_data:
        # 첫 번째 레코드의 컬럼 비교
        customers_columns = set(customers_response.data[0].keys())
        active_columns = set(active_response.data[0].keys())
        
        print(f"   gtm_customers 컬럼 수: {len(customers_columns)}")
        print(f"   gtm_active_customers 컬럼 수: {len(active_columns)}")
        
        # 공통 컬럼
        common_columns = customers_columns.intersection(active_columns)
        print(f"   공통 컬럼 수: {len(common_columns)}")
        
        # 차이점
        only_in_customers = customers_columns - active_columns
        only_in_active = active_columns - customers_columns
        
        if only_in_customers:
            print(f"   gtm_customers에만 있는 컬럼: {list(only_in_customers)[:5]}...")
        if only_in_active:
            print(f"   gtm_active_customers에만 있는 컬럼: {list(only_in_active)[:5]}...")
        
        # ID로 동일 레코드 확인
        if 'id' in common_columns and customers_response.data:
            sample_id = customers_response.data[0]['id']
            
            # 같은 ID가 active_customers에도 있는지 확인
            active_match = supabase.table('gtm_active_customers').select("*").eq('id', sample_id).execute()
            if active_match.data:
                print(f"\n   동일한 ID 레코드 발견: {sample_id}")
                print("   → 두 테이블이 동일한 데이터를 가리킬 가능성 높음")
        
        # 데이터 내용 비교
        print("\n   데이터 샘플 비교:")
        print(f"   gtm_customers 첫 레코드 customer_name: {customers_response.data[0].get('customer_name', 'N/A')}")
        print(f"   gtm_active_customers 첫 레코드 customer_name: {active_response.data[0].get('customer_name', 'N/A')}")
        
        # 레코드 수 비교
        customers_count = supabase.table('gtm_customers').select("*", count='exact').execute().count
        active_count = supabase.table('gtm_active_customers').select("*", count='exact').execute().count
        
        print(f"\n   전체 레코드 수 비교:")
        print(f"   gtm_customers: {customers_count}개")
        print(f"   gtm_active_customers: {active_count}개")
        
        if customers_count == active_count:
            print("   → 레코드 수가 동일함 (같은 데이터일 가능성)")
        elif active_count < customers_count:
            print("   → active_customers가 더 적음 (필터링된 뷰일 가능성)")
    else:
        print(f"   비교할 수 없음 - gtm_customers 데이터: {has_customers_data}, gtm_active_customers 데이터: {has_active_data}")
        
    print("\n" + "="*50 + "\n")
    
    # 4. 다른 GTM 관련 테이블 확인
    print("4. 기타 GTM 관련 테이블 찾기:")
    
    # gtm_active_categories 확인
    try:
        categories_response = supabase.table('gtm_active_categories').select("*").limit(1).execute()
        print("   - gtm_active_categories: 존재함")
    except:
        print("   - gtm_active_categories: 존재하지 않음")
    
    # gtm_active_summary 확인
    try:
        summary_response = supabase.table('gtm_active_summary').select("*").limit(1).execute()
        print("   - gtm_active_summary: 존재함")
    except:
        print("   - gtm_active_summary: 존재하지 않음")
        
except Exception as e:
    print(f"오류 발생: {str(e)}")
    import traceback
    print(traceback.format_exc())