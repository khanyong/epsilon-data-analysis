#!/usr/bin/env python3
"""
현재 Supabase 데이터 분석 및 목표 수치 달성 방안 스크립트
"""

import os
from dotenv import load_dotenv
from supabase import create_client, Client

def analyze_current_data():
    """현재 Supabase 데이터를 분석하는 함수"""
    
    # Supabase 설정
    load_dotenv()
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        print("❌ Supabase 환경변수가 설정되지 않았습니다.")
        return
    
    supabase: Client = create_client(supabase_url, supabase_key)
    
    print("=== 현재 Supabase 데이터 분석 ===\n")
    
    try:
        # 모든 기업 데이터 조회
        all_data = supabase.table('kotra').select('*').execute()
        
        if all_data.data:
            # 지역별 분류
            chennai_companies = [c for c in all_data.data if c.get('office') in ['첸나이', '첸나이무역관']]
            mumbai_companies = [c for c in all_data.data if c.get('office') == '뭄바이']
            
            # 첸나이 분석
            chennai_total = len(chennai_companies)
            chennai_matched = len([c for c in chennai_companies if c.get('sales_division')])
            chennai_ratio = chennai_matched / chennai_total * 100 if chennai_total > 0 else 0
            
            # 뭄바이 분석
            mumbai_total = len(mumbai_companies)
            mumbai_matched = len([c for c in mumbai_companies if c.get('sales_division')])
            mumbai_ratio = mumbai_matched / mumbai_total * 100 if mumbai_total > 0 else 0
            
            print("📊 현재 Supabase 데이터 현황:")
            print(f"  - 첸나이: 총 {chennai_total}개, 영업조직 매칭 {chennai_matched}개 ({chennai_ratio:.1f}%)")
            print(f"  - 뭄바이: 총 {mumbai_total}개, 영업조직 매칭 {mumbai_matched}개 ({mumbai_ratio:.1f}%)")
            print()
            
            # 목표 수치 (이미지 기준)
            target_chennai_total = 205
            target_chennai_matched = 174
            target_mumbai_total = 68
            target_mumbai_matched = 10
            
            print("🎯 목표 수치 (이미지 기준):")
            print(f"  - 첸나이: 총 {target_chennai_total}개, 영업조직 매칭 {target_chennai_matched}개 (85%)")
            print(f"  - 뭄바이: 총 {target_mumbai_total}개, 영업조직 매칭 {target_mumbai_matched}개 (15%)")
            print()
            
            # 해결 방안
            print("💡 해결 방안:")
            
            # 1. 첸나이 기업 3개 추가
            if chennai_total < target_chennai_total:
                needed_chennai = target_chennai_total - chennai_total
                print(f"  1️⃣ 첸나이 기업 {needed_chennai}개 추가 필요")
                
                # 기업명에 '첸나이'가 포함된 다른 지역 기업 찾기
                other_chennai = [c for c in all_data.data 
                               if c.get('office') not in ['첸나이', '첸나이무역관'] 
                               and '첸나이' in (c.get('company_name_kr') or '')]
                
                if other_chennai:
                    print(f"     - 기업명에 '첸나이' 포함된 다른 지역 기업: {len(other_chennai)}개")
                    for i, company in enumerate(other_chennai[:5], 1):
                        print(f"       {i}. {company.get('company_name_kr', '')} (office: {company.get('office', '')})")
                    if len(other_chennai) > 5:
                        print(f"       ... 외 {len(other_chennai) - 5}개")
            
            # 2. 첸나이 영업조직 매칭 97개 추가
            if chennai_matched < target_chennai_matched:
                needed_matches = target_chennai_matched - chennai_matched
                print(f"  2️⃣ 첸나이 영업조직 매칭 {needed_matches}개 추가 필요")
                
                # 영업조직이 없는 첸나이 기업들
                chennai_without_sales = [c for c in chennai_companies if not c.get('sales_division')]
                print(f"     - 영업조직이 없는 첸나이 기업: {len(chennai_without_sales)}개")
                
                if chennai_without_sales:
                    print("     - 영업조직 배정 대상 기업들:")
                    for i, company in enumerate(chennai_without_sales[:10], 1):
                        print(f"       {i}. {company.get('company_name_kr', '')}")
                    if len(chennai_without_sales) > 10:
                        print(f"       ... 외 {len(chennai_without_sales) - 10}개")
            
            # 3. 뭄바이 기업 수 조정
            if mumbai_total > target_mumbai_total:
                excess_mumbai = mumbai_total - target_mumbai_total
                print(f"  3️⃣ 뭄바이 기업 {excess_mumbai}개 제거 또는 필터링 필요")
                
                # 영업조직이 없는 뭄바이 기업들 (제거 후보)
                mumbai_without_sales = [c for c in mumbai_companies if not c.get('sales_division')]
                print(f"     - 영업조직이 없는 뭄바이 기업: {len(mumbai_without_sales)}개")
            
            print()
            print("🔧 권장 작업 순서:")
            print("1. 첸나이 기업 3개 추가 (기업명에 '첸나이' 포함된 다른 지역 기업)")
            print("2. 첸나이 영업조직 매칭 97개 추가")
            print("3. 뭄바이 기업 29개 제거 또는 필터링")
            print("4. 프론트엔드 목표 수치 업데이트")
            
        else:
            print("❌ 데이터를 가져올 수 없습니다.")
            
    except Exception as e:
        print(f"❌ 오류 발생: {e}")

if __name__ == "__main__":
    analyze_current_data() 