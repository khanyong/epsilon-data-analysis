#!/usr/bin/env python3
"""
목표 수치와 현재 Supabase 수치 비교 스크립트
"""

import os
from dotenv import load_dotenv
from supabase import create_client, Client

def check_target_numbers():
    """목표 수치와 현재 수치를 비교하는 함수"""
    
    # Supabase 설정
    load_dotenv()
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        print("❌ Supabase 환경변수가 설정되지 않았습니다.")
        return
    
    supabase: Client = create_client(supabase_url, supabase_key)
    
    print("=== 목표 수치 vs 현재 Supabase 수치 비교 ===\n")
    
    # 목표 수치 (이미지 기준)
    target_chennai_total = 205
    target_chennai_matched = 174
    target_mumbai_total = 68
    target_mumbai_matched = 10
    
    print("🎯 목표 수치 (이미지 기준):")
    print(f"  - 첸나이: 총 {target_chennai_total}개, 영업조직 매칭 {target_chennai_matched}개 ({target_chennai_matched/target_chennai_total*100:.1f}%)")
    print(f"  - 뭄바이: 총 {target_mumbai_total}개, 영업조직 매칭 {target_mumbai_matched}개 ({target_mumbai_matched/target_mumbai_total*100:.1f}%)")
    print()
    
    try:
        # 첸나이 관련 기업 조회 (첸나이 + 첸나이무역관)
        chennai_data = supabase.table('kotra').select('*').in_('office', ['첸나이', '첸나이무역관']).execute()
        
        # 뭄바이 기업 조회
        mumbai_data = supabase.table('kotra').select('*').eq('office', '뭄바이').execute()
        
        if chennai_data.data and mumbai_data.data:
            # 첸나이 통계
            chennai_total = len(chennai_data.data)
            chennai_matched = len([c for c in chennai_data.data if c.get('sales_division')])
            chennai_ratio = chennai_matched / chennai_total * 100 if chennai_total > 0 else 0
            
            # 뭄바이 통계
            mumbai_total = len(mumbai_data.data)
            mumbai_matched = len([c for c in mumbai_data.data if c.get('sales_division')])
            mumbai_ratio = mumbai_matched / mumbai_total * 100 if mumbai_total > 0 else 0
            
            print("📊 현재 Supabase 수치:")
            print(f"  - 첸나이: 총 {chennai_total}개, 영업조직 매칭 {chennai_matched}개 ({chennai_ratio:.1f}%)")
            print(f"  - 뭄바이: 총 {mumbai_total}개, 영업조직 매칭 {mumbai_matched}개 ({mumbai_ratio:.1f}%)")
            print()
            
            # 차이 분석
            print("🔍 차이 분석:")
            print(f"  - 첸나이 총 기업: {target_chennai_total}개 → {chennai_total}개 (차이: {chennai_total - target_chennai_total}개)")
            print(f"  - 첸나이 매칭: {target_chennai_matched}개 → {chennai_matched}개 (차이: {chennai_matched - target_chennai_matched}개)")
            print(f"  - 뭄바이 총 기업: {target_mumbai_total}개 → {mumbai_total}개 (차이: {mumbai_total - target_mumbai_total}개)")
            print(f"  - 뭄바이 매칭: {target_mumbai_matched}개 → {mumbai_matched}개 (차이: {mumbai_matched - target_mumbai_matched}개)")
            print()
            
            # 해결 방안
            print("💡 해결 방안:")
            if chennai_total < target_chennai_total:
                print(f"  - 첸나이 기업 {target_chennai_total - chennai_total}개 추가 필요")
            if chennai_matched < target_chennai_matched:
                print(f"  - 첸나이 영업조직 매칭 {target_chennai_matched - chennai_matched}개 추가 필요")
            if mumbai_total < target_mumbai_total:
                print(f"  - 뭄바이 기업 {target_mumbai_total - mumbai_total}개 추가 필요")
            if mumbai_matched < target_mumbai_matched:
                print(f"  - 뭄바이 영업조직 매칭 {target_mumbai_matched - mumbai_matched}개 추가 필요")
            
            if chennai_total == target_chennai_total and chennai_matched == target_chennai_matched and mumbai_total == target_mumbai_total and mumbai_matched == target_mumbai_matched:
                print("  ✅ 모든 수치가 목표와 일치합니다!")
                
        else:
            print("❌ 데이터를 가져올 수 없습니다.")
            
    except Exception as e:
        print(f"❌ 오류 발생: {e}")

if __name__ == "__main__":
    check_target_numbers() 