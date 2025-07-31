import os
from supabase import create_client, Client
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

def check_chennai_companies():
    """첸나이 기업 수 변화 원인을 확인하는 함수"""
    
    # Supabase 설정
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        print("❌ Supabase 환경변수가 설정되지 않았습니다.")
        return
    
    # Supabase 클라이언트 생성
    supabase: Client = create_client(supabase_url, supabase_key)
    
    print("=== 첸나이 기업 수 변화 원인 확인 ===")
    
    # 1. 전체 기업 수 확인
    print("\n1️⃣ 전체 기업 수 확인...")
    try:
        all_result = supabase.table('kotra').select('*').execute()
        all_companies = all_result.data
        print(f"✅ 전체 기업 수: {len(all_companies)}개")
        
    except Exception as e:
        print(f"❌ 전체 기업 조회 중 오류: {str(e)}")
        return
    
    # 2. 첸나이 관련 기업들 확인
    print("\n2️⃣ 첸나이 관련 기업들 확인...")
    
    chennai_companies = []
    chennai_office_companies = []
    chennai_trade_companies = []
    
    for company in all_companies:
        office = company.get('office', '') or ''
        company_name = company.get('company_name_kr', '') or ''
        company_name_en = company.get('company_name_en', '') or ''
        
        # office가 '첸나이'인 기업
        if office == '첸나이':
            chennai_office_companies.append(company)
            chennai_companies.append(company)
        
        # office가 '첸나이무역관'인 기업
        elif office == '첸나이무역관':
            chennai_trade_companies.append(company)
            chennai_companies.append(company)
        
        # 기업명에 '첸나이'가 포함된 기업 (office가 다른 경우)
        elif ('첸나이' in company_name or 
              'Chennai' in company_name_en or
              'chennai' in company_name.lower()):
            chennai_companies.append(company)
    
    print(f"📊 첸나이 관련 기업 분류:")
    print(f"  - office='첸나이': {len(chennai_office_companies)}개")
    print(f"  - office='첸나이무역관': {len(chennai_trade_companies)}개")
    print(f"  - 기업명에 '첸나이' 포함: {len(chennai_companies) - len(chennai_office_companies) - len(chennai_trade_companies)}개")
    print(f"  - 총 첸나이 관련: {len(chennai_companies)}개")
    
    # 3. 기존 하드코딩된 데이터와 비교
    print("\n3️⃣ 기존 하드코딩된 데이터와 비교...")
    
    original_chennai_count = 205  # 사용자가 언급한 수
    current_chennai_count = len(chennai_office_companies)  # office='첸나이'만
    
    print(f"📊 비교:")
    print(f"  - 기존 하드코딩된 첸나이 기업: {original_chennai_count}개")
    print(f"  - 현재 Supabase office='첸나이': {current_chennai_count}개")
    print(f"  - 차이: {original_chennai_count - current_chennai_count}개")
    
    # 4. 가능한 원인 분석
    print("\n4️⃣ 가능한 원인 분석...")
    
    if current_chennai_count < original_chennai_count:
        print("🔍 첸나이 기업 수가 줄어든 가능한 원인:")
        print("  1. 일부 기업이 '첸나이무역관'으로 분류됨")
        print("  2. 데이터 정제 과정에서 중복 제거됨")
        print("  3. CSV 업로드 시 일부 데이터가 누락됨")
        print("  4. 기존 하드코딩된 데이터에 오류가 있었을 수 있음")
        
        # office='첸나이'가 아닌 기업들 중 첸나이 관련 확인
        other_chennai = [c for c in all_companies if c.get('office') not in ['첸나이', '첸나이무역관']]
        chennai_in_name = [c for c in other_chennai if '첸나이' in (c.get('company_name_kr') or '')]
        
        if chennai_in_name:
            print(f"\n📋 office가 '첸나이'가 아니지만 기업명에 '첸나이'가 포함된 기업들:")
            for i, company in enumerate(chennai_in_name[:10], 1):
                print(f"  {i}. {company.get('company_name_kr', '')} (office: '{company.get('office', '')}')")
    
    # 5. 권장사항
    print("\n5️⃣ 권장사항...")
    print("💡 타겟 리스트에 포함할 기업 범위:")
    print("  - Option 1: office='첸나이'만 (현재: 175개)")
    print("  - Option 2: office='첸나이' + '첸나이무역관' (총: 202개)")
    print("  - Option 3: 모든 첸나이 관련 기업 (총: {len(chennai_companies)}개)")
    
    print(f"\n🎯 현재 설정: office='첸나이'만 ({current_chennai_count}개)")
    print(f"   이는 기존 하드코딩된 {original_chennai_count}개보다 {original_chennai_count - current_chennai_count}개 적습니다.")

if __name__ == "__main__":
    check_chennai_companies() 