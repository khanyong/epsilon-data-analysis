#!/usr/bin/env python3
"""
기업명에 '첸나이'가 포함된 다른 지역 기업을 찾아서 첸나이로 이동시키는 스크립트
"""

import os
from dotenv import load_dotenv
from supabase import create_client, Client

def find_chennai_companies():
    """기업명에 '첸나이'가 포함된 다른 지역 기업을 찾는 함수"""
    
    # Supabase 설정
    load_dotenv()
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        print("❌ Supabase 환경변수가 설정되지 않았습니다.")
        return
    
    supabase: Client = create_client(supabase_url, supabase_key)
    
    print("=== 기업명에 '첸나이' 포함된 다른 지역 기업 찾기 ===\n")
    
    try:
        # 모든 기업 데이터 조회
        all_data = supabase.table('kotra').select('*').execute()
        
        if all_data.data:
            # 기업명에 '첸나이'가 포함된 다른 지역 기업 찾기
            chennai_in_name = [c for c in all_data.data 
                             if c.get('office') not in ['첸나이', '첸나이무역관'] 
                             and '첸나이' in (c.get('company_name_kr') or '')]
            
            print(f"📋 기업명에 '첸나이' 포함된 다른 지역 기업: {len(chennai_in_name)}개")
            print()
            
            if chennai_in_name:
                print("🔍 발견된 기업들:")
                for i, company in enumerate(chennai_in_name, 1):
                    print(f"{i:2d}. {company.get('company_name_kr', '')}")
                    print(f"     - 영문명: {company.get('company_name_en', '')}")
                    print(f"     - 현재 office: {company.get('office', '')}")
                    print(f"     - 영업조직: {company.get('sales_division', '없음')}")
                    print()
                
                # 이동할 기업 선택 (상위 3개)
                companies_to_move = chennai_in_name[:3]
                
                print(f"🎯 이동 대상 기업 (상위 3개):")
                for i, company in enumerate(companies_to_move, 1):
                    print(f"{i}. {company.get('company_name_kr', '')} (현재: {company.get('office', '')} → 첸나이)")
                
                print()
                print("💡 다음 단계:")
                print("1. 위 3개 기업의 office를 '첸나이'로 변경")
                print("2. 영업조직 매칭 추가 작업")
                print("3. 뭄바이 기업 수 조정")
                
                return companies_to_move
            else:
                print("❌ 기업명에 '첸나이'가 포함된 다른 지역 기업이 없습니다.")
                print("💡 대안: 수동으로 3개 기업을 추가하거나 목표 수치를 조정해야 합니다.")
                
        else:
            print("❌ 데이터를 가져올 수 없습니다.")
            
    except Exception as e:
        print(f"❌ 오류 발생: {e}")

if __name__ == "__main__":
    find_chennai_companies() 