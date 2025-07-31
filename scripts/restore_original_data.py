#!/usr/bin/env python3
"""
기존 하드코딩된 205개 첸나이 기업 데이터 복원 스크립트
"""

import os
from dotenv import load_dotenv
from supabase import create_client, Client

def restore_original_data():
    """기존 하드코딩된 데이터를 복원하는 함수"""
    
    # Supabase 설정
    load_dotenv()
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        print("❌ Supabase 환경변수가 설정되지 않았습니다.")
        return
    
    supabase: Client = create_client(supabase_url, supabase_key)
    
    print("=== 기존 하드코딩 데이터 복원 ===\n")
    
    # 기존 하드코딩된 205개 첸나이 기업 데이터 (예시)
    # 실제로는 기존 데이터를 찾아서 사용해야 함
    original_chennai_companies = [
        # 여기에 기존 205개 첸나이 기업 데이터를 추가
        # 현재는 예시 데이터만 포함
        {
            "region": "서남아",
            "country": "인도", 
            "trade_office": "첸나이",
            "company_name_kr": "첸나이 기업 1",
            "company_name_en": "Chennai Company 1",
            "office": "첸나이",
            "sales_division": "전략고객사업본부 전략사업1담당 전략고객1팀",
            "sales_division_match_type": "original_data",
            "sales_division_similarity": 1.0
        },
        {
            "region": "서남아",
            "country": "인도",
            "trade_office": "첸나이", 
            "company_name_kr": "첸나이 기업 2",
            "company_name_en": "Chennai Company 2",
            "office": "첸나이",
            "sales_division": "전략고객사업본부 전략사업2담당 전략고객1팀",
            "sales_division_match_type": "original_data",
            "sales_division_similarity": 1.0
        }
        # ... 203개 더 추가 필요
    ]
    
    print(f"📋 복원할 기업 수: {len(original_chennai_companies)}개")
    print("⚠️  실제로는 기존 하드코딩된 205개 데이터를 찾아서 추가해야 합니다.")
    print()
    
    # 현재 Supabase 데이터 확인
    try:
        current_data = supabase.table('kotra').select('*').in_('office', ['첸나이', '첸나이무역관']).execute()
        
        if current_data.data:
            current_total = len(current_data.data)
            current_matched = len([c for c in current_data.data if c.get('sales_division')])
            
            print(f"📊 현재 Supabase 상태:")
            print(f"  - 총 기업: {current_total}개")
            print(f"  - 영업조직 매칭: {current_matched}개")
            print()
            
            print("💡 다음 단계:")
            print("1. 기존 하드코딩된 205개 첸나이 기업 데이터 찾기")
            print("2. 누락된 3개 기업 추가")
            print("3. 영업조직 매칭 97개 추가")
            print("4. 뭄바이 기업 수 조정 (97개 → 68개)")
            
        else:
            print("❌ 현재 데이터를 가져올 수 없습니다.")
            
    except Exception as e:
        print(f"❌ 오류 발생: {e}")

if __name__ == "__main__":
    restore_original_data() 