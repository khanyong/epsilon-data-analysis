import json
import requests
import os
import csv
from supabase import create_client, Client
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

def check_and_remove_duplicates():
    """기존 DB에서 중복 데이터를 확인하고 제거하는 함수"""
    
    # Supabase 설정 (환경변수에서 가져오기)
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        print("Supabase 환경변수가 설정되지 않았습니다.")
        print("다음 환경변수를 설정해주세요:")
        print("- VITE_SUPABASE_URL")
        print("- VITE_SUPABASE_KEY")
        return
    
    # Supabase 클라이언트 생성
    supabase: Client = create_client(supabase_url, supabase_key)
    
    print("=== 중복 데이터 확인 및 제거 ===")
    
    try:
        # 모든 데이터 조회
        result = supabase.table('kotra').select('*').execute()
        all_records = result.data
        
        print(f"총 레코드 수: {len(all_records)}")
        
        # company_name_kr 기준으로 중복 확인
        company_counts = {}
        for record in all_records:
            company_name = record.get('company_name_kr', '')
            if company_name:
                if company_name in company_counts:
                    company_counts[company_name].append(record)
                else:
                    company_counts[company_name] = [record]
        
        # 중복이 있는 회사들 찾기
        duplicates = {name: records for name, records in company_counts.items() if len(records) > 1}
        
        if not duplicates:
            print("✅ 중복 데이터가 없습니다.")
            return
        
        print(f"중복이 발견된 회사 수: {len(duplicates)}")
        
        # 중복 제거 로직
        total_removed = 0
        
        for company_name, records in duplicates.items():
            print(f"\n📋 {company_name} - {len(records)}개 레코드")
            
            # 중복 제거 전략: 가장 완전한 데이터를 유지
            # 1. sales_division이 있는 레코드 우선
            # 2. 더 많은 정보가 있는 레코드 우선
            # 3. ID가 작은 레코드 우선 (더 오래된 데이터)
            
            # 유지할 레코드 선택
            keep_record = None
            remove_records = []
            
            for record in records:
                if not keep_record:
                    keep_record = record
                    continue
                
                # sales_division이 있는 레코드 우선
                current_has_sales = bool(keep_record.get('sales_division'))
                new_has_sales = bool(record.get('sales_division'))
                
                if new_has_sales and not current_has_sales:
                    remove_records.append(keep_record)
                    keep_record = record
                elif current_has_sales and not new_has_sales:
                    remove_records.append(record)
                else:
                    # 둘 다 sales_division이 있거나 둘 다 없는 경우
                    # 더 많은 정보가 있는 레코드 선택
                    current_info_count = sum(1 for v in keep_record.values() if v is not None and v != '')
                    new_info_count = sum(1 for v in record.values() if v is not None and v != '')
                    
                    if new_info_count > current_info_count:
                        remove_records.append(keep_record)
                        keep_record = record
                    else:
                        remove_records.append(record)
            
            print(f"  유지: ID {keep_record.get('id')} (sales_division: {keep_record.get('sales_division', '없음')})")
            
            # 중복 레코드 삭제
            for record in remove_records:
                try:
                    delete_result = supabase.table('kotra').delete().eq('id', record['id']).execute()
                    if delete_result.data:
                        total_removed += 1
                        print(f"  삭제: ID {record.get('id')}")
                    else:
                        print(f"  ❌ 삭제 실패: ID {record.get('id')}")
                except Exception as e:
                    print(f"  ❌ 삭제 오류: ID {record.get('id')} - {str(e)}")
        
        print(f"\n=== 중복 제거 완료 ===")
        print(f"총 삭제된 레코드: {total_removed}개")
        
        # 최종 데이터 수 확인
        final_result = supabase.table('kotra').select('*').execute()
        print(f"최종 레코드 수: {len(final_result.data)}")
        
    except Exception as e:
        print(f"❌ 중복 제거 중 오류 발생: {str(e)}")

def upload_csv_to_supabase():
    """CSV 파일의 내용을 Supabase kotra 테이블에 추가하는 함수"""
    
    # Supabase 설정 (환경변수에서 가져오기)
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        print("Supabase 환경변수가 설정되지 않았습니다.")
        print("다음 환경변수를 설정해주세요:")
        print("- VITE_SUPABASE_URL")
        print("- VITE_SUPABASE_KEY")
        return
    
    # Supabase 클라이언트 생성
    supabase: Client = create_client(supabase_url, supabase_key)
    
    # CSV 파일 읽기
    csv_file_path = 'data/kotra_mumbai_chennai_linkde_salesdivision_v01.csv'
    
    if not os.path.exists(csv_file_path):
        print(f"CSV 파일을 찾을 수 없습니다: {csv_file_path}")
        return
    
    print(f"CSV 파일을 읽는 중: {csv_file_path}")
    
    # CSV 데이터를 Supabase 형식으로 변환
    kotra_records = []
    
    with open(csv_file_path, 'r', encoding='utf-8') as f:
        csv_reader = csv.DictReader(f)
        
        # 컬럼명 정리 (BOM 제거)
        fieldnames = [field.strip('\ufeff') for field in csv_reader.fieldnames]
        print(f"컬럼명: {fieldnames}")
        
        for row in csv_reader:
            # CSV 컬럼을 Supabase 테이블 컬럼에 매핑
            kotra_record = {
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
            
            kotra_records.append(kotra_record)
    
    print(f"CSV에서 읽은 총 레코드 수: {len(kotra_records)}")
    
    # CSV 내에서 중복 제거
    print("=== CSV 내 중복 제거 ===")
    company_counts = {}
    for record in kotra_records:
        company_name = record.get('company_name_kr', '')
        if company_name:
            if company_name in company_counts:
                company_counts[company_name].append(record)
            else:
                company_counts[company_name] = [record]
    
    # 중복이 있는 회사들 찾기
    duplicates = {name: records for name, records in company_counts.items() if len(records) > 1}
    
    if duplicates:
        print(f"CSV 내 중복이 발견된 회사 수: {len(duplicates)}")
        
        # 중복 제거: sales_division이 있는 레코드 우선, 정보 완성도가 높은 레코드 우선
        deduplicated_records = []
        
        for company_name, records in company_counts.items():
            if len(records) == 1:
                # 중복이 없는 경우 그대로 추가
                deduplicated_records.append(records[0])
            else:
                # 중복이 있는 경우 가장 좋은 레코드 선택
                print(f"📋 {company_name} - {len(records)}개 레코드 중 1개 선택")
                
                # 가장 좋은 레코드 선택 (sales_division 우선, 정보 완성도 우선)
                best_record = records[0]
                for record in records[1:]:
                    current_has_sales = bool(best_record.get('sales_division'))
                    new_has_sales = bool(record.get('sales_division'))
                    
                    if new_has_sales and not current_has_sales:
                        best_record = record
                    elif current_has_sales == new_has_sales:
                        # 둘 다 sales_division이 있거나 둘 다 없는 경우
                        # 정보 완성도가 높은 레코드 선택
                        current_info_count = sum(1 for v in best_record.values() if v is not None and v != '')
                        new_info_count = sum(1 for v in record.values() if v is not None and v != '')
                        
                        if new_info_count > current_info_count:
                            best_record = record
                
                deduplicated_records.append(best_record)
                print(f"  선택: sales_division={best_record.get('sales_division', '없음')}")
    else:
        print("CSV 내 중복 데이터가 없습니다.")
        deduplicated_records = kotra_records
    
    print(f"중복 제거 후 레코드 수: {len(deduplicated_records)}")
    
    # 기존 데이터 확인 (중복 방지)
    existing_companies = set()
    try:
        existing_data = supabase.table('kotra').select('company_name_kr').execute()
        existing_companies = {record['company_name_kr'] for record in existing_data.data}
        print(f"기존 DB에 있는 기업 수: {len(existing_companies)}")
    except Exception as e:
        print(f"기존 데이터 조회 중 오류: {str(e)}")
    
    # 새로운 레코드만 필터링
    new_records = [record for record in deduplicated_records if record['company_name_kr'] not in existing_companies]
    
    if not new_records:
        print("추가할 새로운 레코드가 없습니다.")
        return
    
    print(f"새로 추가할 레코드: {len(new_records)}개")
    
    # 배치로 데이터 삽입
    batch_size = 10
    success_count = 0
    error_count = 0
    
    for i in range(0, len(new_records), batch_size):
        batch = new_records[i:i + batch_size]
        
        try:
            result = supabase.table('kotra').insert(batch).execute()
            
            if result.data:
                success_count += len(batch)
                print(f"✅ 배치 {i//batch_size + 1} 추가 성공: {len(batch)}개")
            else:
                error_count += len(batch)
                print(f"❌ 배치 {i//batch_size + 1} 추가 실패")
                
        except Exception as e:
            error_count += len(batch)
            print(f"❌ 배치 {i//batch_size + 1} 추가 오류: {str(e)}")
    
    print(f"\n=== CSV 업로드 완료 ===")
    print(f"성공: {success_count}개")
    print(f"실패: {error_count}개")
    print(f"총 처리: {len(new_records)}개")

def upload_to_supabase():
    """Supabase에 영업조직 데이터를 업로드하는 함수"""
    
    # Supabase 설정 (환경변수에서 가져오기)
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('VITE_SUPABASE_KEY')
    
    if not supabase_url or not supabase_key:
        print("Supabase 환경변수가 설정되지 않았습니다.")
        print("다음 환경변수를 설정해주세요:")
        print("- VITE_SUPABASE_URL")
        print("- VITE_SUPABASE_KEY")
        return
    
    # Supabase 클라이언트 생성
    supabase: Client = create_client(supabase_url, supabase_key)
    
    # 업로드 데이터 읽기
    with open('data/supabase_upload_data.json', 'r', encoding='utf-8') as f:
        upload_data = json.load(f)
    
    print(f"총 {len(upload_data)}개의 레코드를 업로드합니다...")
    
    # 각 레코드를 업데이트
    success_count = 0
    error_count = 0
    
    for record in upload_data:
        try:
            # company_name_kr로 매칭하여 업데이트
            result = supabase.table('kotra').update({
                'sales_division': record['sales_division'],
                'sales_division_match_type': record['sales_division_match_type'],
                'sales_division_similarity': record['sales_division_similarity']
            }).eq('company_name_kr', record['company_name_kr']).execute()
            
            if result.data:
                success_count += 1
                print(f"✅ {record['company_name_kr']} 업데이트 성공")
            else:
                error_count += 1
                print(f"❌ {record['company_name_kr']} 업데이트 실패 - 매칭되는 레코드 없음")
                
        except Exception as e:
            error_count += 1
            print(f"❌ {record['company_name_kr']} 업데이트 오류: {str(e)}")
    
    print(f"\n=== 업로드 완료 ===")
    print(f"성공: {success_count}개")
    print(f"실패: {error_count}개")

def create_columns_sql():
    """컬럼 생성 SQL을 반환하는 함수"""
    return """
-- KOTRA 테이블에 영업조직 컬럼 추가
ALTER TABLE kotra 
ADD COLUMN IF NOT EXISTS sales_division TEXT,
ADD COLUMN IF NOT EXISTS sales_division_match_type TEXT,
ADD COLUMN IF NOT EXISTS sales_division_similarity FLOAT;

-- 컬럼 설명 추가
COMMENT ON COLUMN kotra.sales_division IS '영업조직 정보';
COMMENT ON COLUMN kotra.sales_division_match_type IS '매칭 타입 (korean_name, english_name, address, csv_import)';
COMMENT ON COLUMN kotra.sales_division_similarity IS '매칭 유사도 (0.0 ~ 1.0)';
"""

def get_update_sql():
    """업데이트 SQL을 반환하는 함수"""
    with open('data/update_kotra_sales_division.sql', 'r', encoding='utf-8') as f:
        return f.read()

def get_duplicate_removal_sql():
    """중복 제거 SQL을 반환하는 함수"""
    return """
-- 중복 데이터 확인 및 제거 SQL
-- 1. 중복 확인
SELECT company_name_kr, COUNT(*) as count
FROM kotra 
WHERE company_name_kr IS NOT NULL AND company_name_kr != ''
GROUP BY company_name_kr 
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- 2. 중복 제거 (가장 오래된 레코드 유지, sales_division이 있는 레코드 우선)
WITH duplicates AS (
  SELECT id, company_name_kr, sales_division,
         ROW_NUMBER() OVER (
           PARTITION BY company_name_kr 
           ORDER BY 
             CASE WHEN sales_division IS NOT NULL AND sales_division != '' THEN 0 ELSE 1 END,
             id
         ) as rn
  FROM kotra 
  WHERE company_name_kr IS NOT NULL AND company_name_kr != ''
)
DELETE FROM kotra 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);
"""

if __name__ == "__main__":
    print("=== Supabase 업로드 도구 ===")
    print("1. 컬럼 생성 SQL")
    print("2. 데이터 업데이트")
    print("3. 프로그래밍 방식 업로드")
    print("4. CSV 파일에서 새 데이터 추가")
    print("5. 중복 데이터 확인 및 제거")
    print("6. 중복 제거 SQL")
    
    choice = input("\n선택하세요 (1-6): ")
    
    if choice == "1":
        print("\n=== 컬럼 생성 SQL ===")
        print(create_columns_sql())
        
    elif choice == "2":
        print("\n=== 데이터 업데이트 SQL ===")
        print(get_update_sql())
        
    elif choice == "3":
        upload_to_supabase()
        
    elif choice == "4":
        upload_csv_to_supabase()
        
    elif choice == "5":
        check_and_remove_duplicates()
        
    elif choice == "6":
        print("\n=== 중복 제거 SQL ===")
        print(get_duplicate_removal_sql())
        
    else:
        print("잘못된 선택입니다.") 