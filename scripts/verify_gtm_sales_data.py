#!/usr/bin/env python3
"""
GTM Sales 데이터 검증 및 통계 확인 스크립트
"""

import pandas as pd
import os
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

# Supabase 클라이언트 설정
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise ValueError("SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY가 필요합니다.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

def verify_data_completeness():
    """데이터 완전성 검증"""
    
    print("=" * 60)
    print("GTM Sales 데이터 검증 보고서")
    print("=" * 60)
    
    # 1. 기본 통계
    print("\n1. 기본 통계")
    print("-" * 40)
    
    # 서비스 수
    services = supabase.table('gtm_global_sales').select('*').execute()
    print(f"총 서비스 수: {len(services.data)}개")
    
    # 고객 수
    customers = set([s['customer_name'] for s in services.data if s['customer_name']])
    print(f"총 고객 수: {len(customers)}개사")
    
    # 서비스 유형별 분포
    service_types = {}
    for s in services.data:
        stype = s.get('service_type', 'Unknown')
        service_types[stype] = service_types.get(stype, 0) + 1
    
    print("\n서비스 유형별 분포:")
    for stype, count in sorted(service_types.items(), key=lambda x: x[1], reverse=True):
        print(f"  - {stype}: {count}개")
    
    # 2. 월별 데이터 완전성
    print("\n2. 월별 매출 데이터 완전성")
    print("-" * 40)
    
    revenue_data = supabase.table('gtm_monthly_revenue').select('*').execute()
    
    # 월별 데이터 수집
    monthly_stats = {}
    for rev in revenue_data.data:
        month = rev['revenue_month']
        if month not in monthly_stats:
            monthly_stats[month] = {
                'count': 0,
                'total': 0,
                'zero_count': 0,
                'non_zero_count': 0
            }
        
        monthly_stats[month]['count'] += 1
        monthly_stats[month]['total'] += rev['revenue_amount'] or 0
        
        if rev['revenue_amount'] == 0 or rev['revenue_amount'] is None:
            monthly_stats[month]['zero_count'] += 1
        else:
            monthly_stats[month]['non_zero_count'] += 1
    
    print(f"\n총 월별 레코드 수: {len(revenue_data.data)}개")
    print(f"데이터가 있는 월 수: {len(monthly_stats)}개월")
    
    print("\n월별 상세 현황:")
    print(f"{'월':<12} | {'레코드수':<8} | {'0값':<6} | {'실제값':<8} | {'총매출액':<15}")
    print("-" * 60)
    
    for month in sorted(monthly_stats.keys()):
        stats = monthly_stats[month]
        print(f"{month:<12} | {stats['count']:<8} | {stats['zero_count']:<6} | "
              f"{stats['non_zero_count']:<8} | {stats['total']:>15,.0f}")
    
    # 3. 데이터 품질 검증
    print("\n3. 데이터 품질 검증")
    print("-" * 40)
    
    # 서비스별 월 데이터 완전성 체크
    expected_months = sorted(monthly_stats.keys())
    incomplete_services = []
    
    for service in services.data:
        service_id = service['service_id']
        service_revenues = [r for r in revenue_data.data if r['service_id'] == service_id]
        service_months = set([r['revenue_month'] for r in service_revenues])
        
        missing_months = set(expected_months) - service_months
        if missing_months:
            incomplete_services.append({
                'service_id': service_id,
                'customer': service['customer_name'],
                'missing_months': missing_months
            })
    
    if incomplete_services:
        print(f"\n⚠️  불완전한 데이터가 있는 서비스: {len(incomplete_services)}개")
        print("\n처음 5개 서비스의 누락된 월:")
        for item in incomplete_services[:5]:
            print(f"  - {item['service_id']} ({item['customer']}): "
                  f"{len(item['missing_months'])}개월 누락")
    else:
        print("✅ 모든 서비스가 전체 월에 대한 데이터를 가지고 있습니다.")
    
    # 4. 매출 통계
    print("\n4. 매출 통계")
    print("-" * 40)
    
    total_revenue = sum([r['revenue_amount'] or 0 for r in revenue_data.data])
    non_zero_revenues = [r['revenue_amount'] for r in revenue_data.data 
                         if r['revenue_amount'] and r['revenue_amount'] > 0]
    
    if non_zero_revenues:
        avg_revenue = sum(non_zero_revenues) / len(non_zero_revenues)
        max_revenue = max(non_zero_revenues)
        min_revenue = min(non_zero_revenues)
        
        print(f"총 매출액: {total_revenue:,.0f}원")
        print(f"평균 매출액 (0 제외): {avg_revenue:,.0f}원")
        print(f"최대 매출액: {max_revenue:,.0f}원")
        print(f"최소 매출액 (0 제외): {min_revenue:,.0f}원")
    
    # 5. 고객별 Top 10
    print("\n5. 고객별 총 매출 Top 10")
    print("-" * 40)
    
    customer_revenue = {}
    for service in services.data:
        customer = service['customer_name']
        if customer:
            service_revenues = [r['revenue_amount'] or 0 for r in revenue_data.data 
                              if r['service_id'] == service['service_id']]
            customer_revenue[customer] = customer_revenue.get(customer, 0) + sum(service_revenues)
    
    top_customers = sorted(customer_revenue.items(), key=lambda x: x[1], reverse=True)[:10]
    
    for i, (customer, revenue) in enumerate(top_customers, 1):
        percentage = (revenue / total_revenue * 100) if total_revenue > 0 else 0
        print(f"{i:2}. {customer:<30} {revenue:>15,.0f}원 ({percentage:5.1f}%)")
    
    # 6. 권장사항
    print("\n6. 권장사항")
    print("-" * 40)
    
    if incomplete_services:
        print("⚠️  일부 서비스의 월별 데이터가 누락되어 있습니다.")
        print("   → import_gtm_sales.py를 다시 실행하여 데이터를 완전히 입력하세요.")
    
    zero_ratio = sum([1 for r in revenue_data.data if r['revenue_amount'] == 0]) / len(revenue_data.data)
    if zero_ratio > 0.3:
        print(f"⚠️  전체 데이터의 {zero_ratio*100:.1f}%가 0값입니다.")
        print("   → 원본 데이터를 확인하여 실제 0인지 누락된 데이터인지 검증하세요.")
    
    if len(monthly_stats) < 12:
        print(f"ℹ️  현재 {len(monthly_stats)}개월의 데이터만 있습니다.")
        print("   → 추가 월별 데이터가 있다면 CSV 파일을 확인하세요.")
    
    print("\n" + "=" * 60)
    print("검증 완료")
    print("=" * 60)

if __name__ == "__main__":
    verify_data_completeness()