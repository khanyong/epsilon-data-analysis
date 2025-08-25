import os
from supabase import create_client, Client
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# Supabase 클라이언트 초기화
url = os.getenv("VITE_SUPABASE_URL")
key = os.getenv("VITE_SUPABASE_ANON_KEY")

if not url or not key:
    print("Supabase URL 또는 Key가 설정되지 않았습니다.")
    exit(1)

supabase: Client = create_client(url, key)

print("=== GTM 테이블/뷰 구조 확인 ===\n")

# SQL 쿼리로 직접 확인
queries = [
    {
        "name": "테이블과 뷰 목록 확인",
        "query": """
        SELECT 
            schemaname,
            tablename as name,
            'table' as type
        FROM pg_tables 
        WHERE tablename LIKE 'gtm%'
        UNION ALL
        SELECT 
            schemaname,
            viewname as name,
            'view' as type
        FROM pg_views 
        WHERE viewname LIKE 'gtm%'
        ORDER BY type, name
        """
    },
    {
        "name": "gtm_customers 레코드 수",
        "query": "SELECT COUNT(*) as count FROM gtm_customers"
    },
    {
        "name": "gtm_active_customers 레코드 수",
        "query": "SELECT COUNT(*) as count FROM gtm_active_customers"
    },
    {
        "name": "gtm_customers 샘플 데이터",
        "query": "SELECT id, customer_name, customer_id FROM gtm_customers LIMIT 3"
    },
    {
        "name": "gtm_active_customers 샘플 데이터",
        "query": "SELECT id, customer_name, customer_id FROM gtm_active_customers LIMIT 3"
    }
]

for q in queries:
    print(f"\n{q['name']}:")
    print("-" * 40)
    try:
        # RPC 함수를 통해 SQL 실행
        result = supabase.rpc('execute_sql', {'query': q['query']}).execute()
        if result.data:
            for row in result.data:
                print(f"  {row}")
        else:
            print("  결과 없음")
    except Exception as e:
        # 직접 쿼리 시도
        try:
            if "gtm_customers" in q['query'] and "COUNT" in q['query']:
                result = supabase.table('gtm_customers').select("*", count='exact', head=True).execute()
                print(f"  count: {result.count}")
            elif "gtm_active_customers" in q['query'] and "COUNT" in q['query']:
                result = supabase.table('gtm_active_customers').select("*", count='exact', head=True).execute()
                print(f"  count: {result.count}")
            elif "gtm_customers" in q['query']:
                result = supabase.table('gtm_customers').select("id, customer_name, customer_id").limit(3).execute()
                for row in result.data:
                    print(f"  {row}")
            elif "gtm_active_customers" in q['query']:
                result = supabase.table('gtm_active_customers').select("id, customer_name, customer_id").limit(3).execute()
                for row in result.data:
                    print(f"  {row}")
            else:
                print(f"  오류: {str(e)}")
        except Exception as e2:
            print(f"  대체 쿼리도 실패: {str(e2)}")

print("\n" + "="*50)
print("\n직접 테이블 접근 테스트:\n")

# gtm_customers 직접 접근
print("1. gtm_customers 테이블:")
try:
    customers = supabase.table('gtm_customers').select("customer_name").limit(5).execute()
    print(f"   - 접근 성공")
    print(f"   - 레코드 수: {len(customers.data)}")
    if customers.data:
        print(f"   - 첫 번째 고객: {customers.data[0].get('customer_name', 'N/A')}")
except Exception as e:
    print(f"   - 접근 실패: {str(e)}")

# gtm_active_customers 직접 접근
print("\n2. gtm_active_customers:")
try:
    active = supabase.table('gtm_active_customers').select("customer_name").limit(5).execute()
    print(f"   - 접근 성공")
    print(f"   - 레코드 수: {len(active.data)}")
    if active.data:
        print(f"   - 첫 번째 고객: {active.data[0].get('customer_name', 'N/A')}")
except Exception as e:
    print(f"   - 접근 실패: {str(e)}")