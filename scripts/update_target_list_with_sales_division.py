import csv
import os
import json
from supabase import create_client, Client
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

def update_target_list_with_sales_division():
    """타겟 리스트를 Supabase의 최신 sales_division 데이터로 업데이트하는 함수"""
    
    # Supabase 설정
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        print("❌ Supabase 환경변수가 설정되지 않았습니다.")
        print("다음 환경변수를 설정해주세요:")
        print("- VITE_SUPABASE_URL")
        print("- VITE_SUPABASE_KEY")
        return
    
    # Supabase 클라이언트 생성
    supabase: Client = create_client(supabase_url, supabase_key)
    
    print("=== 타겟 리스트 sales_division 업데이트 ===")
    
    # 1단계: Supabase에서 뭄바이, 첸나이 기업 데이터 조회
    print("\n1️⃣ Supabase에서 뭄바이, 첸나이 기업 데이터 조회 중...")
    try:
        # 뭄바이 기업 조회
        mumbai_result = supabase.table('kotra').select('*').eq('office', '뭄바이').execute()
        mumbai_companies = mumbai_result.data
        
        # 첸나이 기업 조회
        chennai_result = supabase.table('kotra').select('*').eq('office', '첸나이').execute()
        chennai_companies = chennai_result.data
        
        print(f"✅ 뭄바이 기업: {len(mumbai_companies)}개")
        print(f"✅ 첸나이 기업: {len(chennai_companies)}개")
        
    except Exception as e:
        print(f"❌ Supabase 조회 중 오류: {str(e)}")
        return
    
    # 2단계: 타겟 리스트 데이터 구조 생성
    print("\n2️⃣ 타겟 리스트 데이터 구조 생성 중...")
    
    def create_company_data(company, region, company_id):
        """기업 데이터를 타겟 리스트 형식으로 변환"""
        return {
            'id': company_id,
            'name': company.get('company_name_kr', ''),
            'industry': company.get('industry_major', ''),
            'entryType': company.get('entry_type', ''),
            'entryYear': '2024',  # 기본값
            'isTarget': bool(company.get('sales_division')),  # sales_division이 있으면 타겟
            'salesDivision': company.get('sales_division', ''),
            'description': f"{company.get('industry_minor', '')} {company.get('entry_type', '')}".strip(),
            'region': region
        }
    
    # 뭄바이 기업 데이터 변환
    mumbai_target_data = []
    for i, company in enumerate(mumbai_companies, 1):
        company_data = create_company_data(company, 'mumbai', i)
        mumbai_target_data.append(company_data)
    
    # 첸나이 기업 데이터 변환
    chennai_target_data = []
    for i, company in enumerate(chennai_companies, 1):
        company_data = create_company_data(company, 'chennai', i)
        chennai_target_data.append(company_data)
    
    # 3단계: 타겟 통계 계산
    print("\n3️⃣ 타겟 통계 계산 중...")
    
    def calculate_target_stats(companies, region_name):
        total = len(companies)
        with_sales_division = len([c for c in companies if c.get('salesDivision')])
        without_sales_division = total - with_sales_division
        
        print(f"📊 {region_name} 통계:")
        print(f"  - 총 기업 수: {total}개")
        print(f"  - sales_division 있음: {with_sales_division}개")
        print(f"  - sales_division 없음: {without_sales_division}개")
        print(f"  - 타겟 비율: {(with_sales_division/total*100):.1f}%")
        
        return {
            'total': total,
            'with_sales_division': with_sales_division,
            'without_sales_division': without_sales_division,
            'target_ratio': with_sales_division/total
        }
    
    mumbai_stats = calculate_target_stats(mumbai_companies, "뭄바이")
    chennai_stats = calculate_target_stats(chennai_companies, "첸나이")
    
    # 4단계: TypeScript 파일 생성
    print("\n4️⃣ TypeScript 파일 생성 중...")
    
    # 타겟 리스트 TypeScript 코드 생성
    ts_code = f"""// 타겟 리스트 데이터 (Supabase에서 자동 생성)
// 생성일: 2025-01-27
// 목적: sales_division 정보가 포함된 최신 타겟 리스트

export const mumbaiCompanies = [
"""
    
    # 뭄바이 기업 데이터 추가
    for company in mumbai_target_data:
        sales_division = company['salesDivision'].replace("'", "\\'") if company['salesDivision'] else ''
        description = company['description'].replace("'", "\\'") if company['description'] else ''
        
        ts_code += f"""  {{ 
    id: {company['id']}, 
    name: '{company['name']}', 
    industry: '{company['industry']}', 
    entryType: '{company['entryType']}', 
    entryYear: '{company['entryYear']}', 
    isTarget: {str(company['isTarget']).lower()}, 
    salesDivision: '{sales_division}', 
    description: '{description}' 
  }},
"""
    
    ts_code += """];

export const chennaiCompanies = [
"""
    
    # 첸나이 기업 데이터 추가
    for company in chennai_target_data:
        sales_division = company['salesDivision'].replace("'", "\\'") if company['salesDivision'] else ''
        description = company['description'].replace("'", "\\'") if company['description'] else ''
        
        ts_code += f"""  {{ 
    id: {company['id']}, 
    name: '{company['name']}', 
    industry: '{company['industry']}', 
    entryType: '{company['entryType']}', 
    entryYear: '{company['entryYear']}', 
    isTarget: {str(company['isTarget']).lower()}, 
    salesDivision: '{sales_division}', 
    description: '{description}' 
  }},
"""
    
    ts_code += """];

// 타겟 통계
export const targetStats = {
  mumbai: {
    total: """ + str(mumbai_stats['total']) + """,
    withSalesDivision: """ + str(mumbai_stats['with_sales_division']) + """,
    withoutSalesDivision: """ + str(mumbai_stats['without_sales_division']) + """,
    targetRatio: """ + f"{mumbai_stats['target_ratio']:.3f}" + """
  },
  chennai: {
    total: """ + str(chennai_stats['total']) + """,
    withSalesDivision: """ + str(chennai_stats['with_sales_division']) + """,
    withoutSalesDivision: """ + str(chennai_stats['without_sales_division']) + """,
    targetRatio: """ + f"{chennai_stats['target_ratio']:.3f}" + """
  }
};
"""
    
    # 5단계: 파일 저장
    print("\n5️⃣ 파일 저장 중...")
    
    # TypeScript 파일 저장
    with open('src/data/targetListData.ts', 'w', encoding='utf-8') as f:
        f.write(ts_code)
    
    print(f"✅ TypeScript 파일 저장 완료: src/data/targetListData.ts")
    
    # JSON 파일도 저장 (백업용)
    json_data = {
        'mumbai': mumbai_target_data,
        'chennai': chennai_target_data,
        'stats': {
            'mumbai': mumbai_stats,
            'chennai': chennai_stats
        },
        'generated_at': '2025-01-27',
        'source': 'Supabase kotra table'
    }
    
    with open('data/target_list_backup.json', 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ JSON 백업 파일 저장 완료: data/target_list_backup.json")
    
    # 6단계: 요약 출력
    print(f"\n📋 최종 요약:")
    print(f"  - 뭄바이 총 기업: {mumbai_stats['total']}개")
    print(f"  - 뭄바이 타겟: {mumbai_stats['with_sales_division']}개")
    print(f"  - 첸나이 총 기업: {chennai_stats['total']}개")
    print(f"  - 첸나이 타겟: {chennai_stats['with_sales_division']}개")
    print(f"  - 전체 타겟: {mumbai_stats['with_sales_division'] + chennai_stats['with_sales_division']}개")
    
    print(f"\n🎯 다음 단계:")
    print(f"  1. src/data/targetListData.ts 파일을 BusinessFeasibilitySections4.tsx에 import")
    print(f"  2. 기존 하드코딩된 데이터를 새로운 데이터로 교체")
    print(f"  3. 타겟 리스트가 최신 sales_division 정보로 업데이트됨")

if __name__ == "__main__":
    update_target_list_with_sales_division() 