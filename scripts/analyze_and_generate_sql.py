import csv
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

def analyze_and_generate_sql():
    """sales_division 기준으로 중복을 제거하고 SQL문을 생성하는 함수"""
    
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
    
    print("=== sales_division 기준 중복 제거 및 SQL 생성 ===")
    
    # 1단계: Supabase에서 sales_division이 있는 기업 목록 조회
    print("\n1️⃣ Supabase에서 sales_division이 있는 기업 조회 중...")
    try:
        result = supabase.table('kotra').select('company_name_kr, sales_division').execute()
        existing_companies = result.data
        
        # sales_division이 있는 기업들
        companies_with_sales_division = {
            record['company_name_kr']: record['sales_division'] 
            for record in existing_companies 
            if record.get('sales_division') and record['sales_division'].strip()
        }
        
        # sales_division이 없는 기업들
        companies_without_sales_division = [
            record['company_name_kr'] 
            for record in existing_companies 
            if not record.get('sales_division') or not record['sales_division'].strip()
        ]
        
        print(f"✅ sales_division이 있는 기업: {len(companies_with_sales_division)}개")
        print(f"✅ sales_division이 없는 기업: {len(companies_without_sales_division)}개")
        
    except Exception as e:
        print(f"❌ Supabase 조회 중 오류: {str(e)}")
        return
    
    # 2단계: CSV 파일 읽기
    print("\n2️⃣ CSV 파일 읽는 중...")
    csv_file_path = 'data/kotra_mumbai_chennai_linkde_salesdivision_v01.csv'
    
    if not os.path.exists(csv_file_path):
        print(f"❌ CSV 파일을 찾을 수 없습니다: {csv_file_path}")
        return
    
    csv_records = []
    try:
        with open(csv_file_path, 'r', encoding='utf-8') as f:
            csv_reader = csv.DictReader(f)
            # BOM 제거
            fieldnames = [field.strip('\ufeff') for field in csv_reader.fieldnames]
            print(f"📋 CSV 컬럼명: {fieldnames}")
            
            for row in csv_reader:
                # sales_division이 있는 레코드만 처리
                if row.get('영업본부') and row['영업본부'].strip():
                    csv_record = {
                        'region': row.get('지역', ''),
                        'country': row.get('진출국가', ''),
                        'office': row.get('관할무역관', ''),
                        'company_name_kr': row.get('기업명(국문)', ''),
                        'company_name_en': row.get('기업명(영문)', ''),
                        'company_name_cn': row.get('기업명(중문)', ''),
                        'local_address': row.get('주소', ''),
                        'local_zipcode': row.get('우편번호', ''),
                        'entry_type': row.get('진출형태', ''),
                        'investment_type': row.get('투자형태', ''),
                        'parent_company': row.get('모기업명', ''),
                        'industry_major': row.get('업종 대분류', ''),
                        'industry_minor': row.get('업종 중분류', ''),
                        'sales_division': row.get('영업본부', ''),
                        'sales_division_match_type': 'csv_import',
                        'sales_division_similarity': 1.0
                    }
                    csv_records.append(csv_record)
        
        print(f"✅ CSV에서 sales_division이 있는 레코드: {len(csv_records)}개")
        
    except Exception as e:
        print(f"❌ CSV 읽기 중 오류: {str(e)}")
        return
    
    # 3단계: 중복 제거 (sales_division 기준)
    print("\n3️⃣ sales_division 기준 중복 제거 중...")
    
    # CSV 내에서 중복 제거 (company_name_kr 기준)
    unique_csv_records = {}
    for record in csv_records:
        company_name = record['company_name_kr']
        if company_name not in unique_csv_records:
            unique_csv_records[company_name] = record
        else:
            # 이미 있는 경우, 더 완전한 정보를 가진 레코드 선택
            existing = unique_csv_records[company_name]
            existing_info_count = sum(1 for v in existing.values() if v and str(v).strip())
            new_info_count = sum(1 for v in record.values() if v and str(v).strip())
            
            if new_info_count > existing_info_count:
                unique_csv_records[company_name] = record
    
    csv_records = list(unique_csv_records.values())
    print(f"✅ CSV 내 중복 제거 후: {len(csv_records)}개")
    
    # Supabase에 이미 sales_division이 있는 기업 제거
    new_records = []
    update_records = []
    
    for record in csv_records:
        company_name = record['company_name_kr']
        
        if company_name in companies_with_sales_division:
            # 이미 sales_division이 있는 기업 → 제외
            print(f"⏭️  제외: {company_name} (이미 sales_division 있음)")
        elif company_name in companies_without_sales_division:
            # 기존 기업이지만 sales_division이 없음 → UPDATE
            update_records.append(record)
            print(f"🔄 UPDATE: {company_name}")
        else:
            # 신규 기업 → INSERT
            new_records.append(record)
            print(f"➕ INSERT: {company_name}")
    
    print(f"\n📊 처리 결과:")
    print(f"  - INSERT 대상 (신규 기업): {len(new_records)}개")
    print(f"  - UPDATE 대상 (기존 기업): {len(update_records)}개")
    
    # 4단계: SQL문 생성
    print("\n4️⃣ SQL문 생성 중...")
    
    sql_statements = []
    
    # INSERT 문 생성
    if new_records:
        sql_statements.append("-- 신규 기업 INSERT")
        sql_statements.append("INSERT INTO kotra (")
        sql_statements.append("  region, country, office, company_name_kr, company_name_en, company_name_cn,")
        sql_statements.append("  local_address, local_zipcode, entry_type, investment_type, parent_company,")
        sql_statements.append("  industry_major, industry_minor, sales_division, sales_division_match_type, sales_division_similarity")
        sql_statements.append(") VALUES")
        
        for i, record in enumerate(new_records):
            # SQL 인젝션 방지를 위한 이스케이프 처리
            company_name_kr = record['company_name_kr'].replace("'", "''")
            company_name_en = record['company_name_en'].replace("'", "''") if record['company_name_en'] else ''
            company_name_cn = record['company_name_cn'].replace("'", "''") if record['company_name_cn'] else ''
            local_address = record['local_address'].replace("'", "''") if record['local_address'] else ''
            parent_company = record['parent_company'].replace("'", "''") if record['parent_company'] else ''
            
            values = [
                f"'{record['region']}'",
                f"'{record['country']}'",
                f"'{record['office']}'",
                f"'{company_name_kr}'",
                f"'{company_name_en}'" if company_name_en else 'NULL',
                f"'{company_name_cn}'" if company_name_cn else 'NULL',
                f"'{local_address}'" if local_address else 'NULL',
                f"'{record['local_zipcode']}'" if record['local_zipcode'] else 'NULL',
                f"'{record['entry_type']}'" if record['entry_type'] else 'NULL',
                f"'{record['investment_type']}'" if record['investment_type'] else 'NULL',
                f"'{parent_company}'" if parent_company else 'NULL',
                f"'{record['industry_major']}'" if record['industry_major'] else 'NULL',
                f"'{record['industry_minor']}'" if record['industry_minor'] else 'NULL',
                f"'{record['sales_division']}'",
                f"'{record['sales_division_match_type']}'",
                f"{record['sales_division_similarity']}"
            ]
            
            sql_statements.append(f"  ({', '.join(values)})" + ("," if i < len(new_records) - 1 else ";"))
    
    # UPDATE 문 생성
    if update_records:
        if new_records:
            sql_statements.append("")
        sql_statements.append("-- 기존 기업 sales_division UPDATE")
        
        for record in update_records:
            company_name_kr = record['company_name_kr'].replace("'", "''")
            sql_statements.append(f"UPDATE kotra SET")
            sql_statements.append(f"  sales_division = '{record['sales_division']}',")
            sql_statements.append(f"  sales_division_match_type = '{record['sales_division_match_type']}',")
            sql_statements.append(f"  sales_division_similarity = {record['sales_division_similarity']}")
            sql_statements.append(f"WHERE company_name_kr = '{company_name_kr}';")
            sql_statements.append("")
    
    # 5단계: SQL 파일 저장
    print("\n5️⃣ SQL 파일 저장 중...")
    
    sql_content = "\n".join(sql_statements)
    
    with open('data/kotra_sales_division_update.sql', 'w', encoding='utf-8') as f:
        f.write("-- KOTRA 테이블 sales_division 업데이트\n")
        f.write("-- 생성일: 2025-01-27\n")
        f.write("-- 목적: CSV에서 sales_division 정보를 기존 DB에 추가\n\n")
        f.write(sql_content)
    
    print(f"✅ SQL 파일 저장 완료: data/kotra_sales_division_update.sql")
    print(f"📄 총 SQL문 수: {len([s for s in sql_statements if s.strip() and not s.startswith('--')])}개")
    
    # 6단계: 요약 출력
    print(f"\n📋 최종 요약:")
    print(f"  - CSV 총 레코드: {len(csv_records)}개")
    print(f"  - 중복 제거 (이미 sales_division 있음): {len([r for r in csv_records if r['company_name_kr'] in companies_with_sales_division])}개")
    print(f"  - INSERT 대상: {len(new_records)}개")
    print(f"  - UPDATE 대상: {len(update_records)}개")
    print(f"  - 예상 sales_division 증가: {len(new_records) + len(update_records)}개")

if __name__ == "__main__":
    analyze_and_generate_sql() 