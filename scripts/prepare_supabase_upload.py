import pandas as pd
import json

def prepare_supabase_upload():
    """Supabase 업로드를 위한 데이터를 준비하는 함수"""
    
    # 업데이트된 데이터 읽기
    print("업데이트된 데이터를 읽는 중...")
    df = pd.read_csv('data/kotra_with_sales_division.csv', low_memory=False)
    
    # 영업조직이 매칭된 데이터만 필터링
    matched_df = df[df['sales_division'].notna() & (df['sales_division'] != '')]
    
    print(f"매칭된 데이터: {len(matched_df)}개 행")
    
    # Supabase 업로드용 데이터 준비
    upload_data = []
    
    for idx, row in matched_df.iterrows():
        upload_record = {
            'id': row.get('id', None),  # Supabase 테이블의 ID
            'company_name_kr': row.get('company_name_kr', ''),
            'company_name_en': row.get('company_name_en', ''),
            'sales_division': row.get('sales_division', ''),
            'sales_division_match_type': row.get('sales_division_match_type', ''),
            'sales_division_similarity': float(row.get('sales_division_similarity', 0.0))
        }
        upload_data.append(upload_record)
    
    # JSON 파일로 저장 (Supabase 업로드용)
    with open('data/supabase_upload_data.json', 'w', encoding='utf-8') as f:
        json.dump(upload_data, f, ensure_ascii=False, indent=2)
    
    # CSV 파일로도 저장 (백업용)
    upload_df = pd.DataFrame(upload_data)
    upload_df.to_csv('data/supabase_upload_data.csv', index=False, encoding='utf-8-sig')
    
    print(f"업로드 데이터를 준비했습니다:")
    print(f"- JSON 파일: data/supabase_upload_data.json")
    print(f"- CSV 파일: data/supabase_upload_data.csv")
    
    # 업로드용 SQL 스크립트 생성
    create_columns_sql = """
-- 1. 새로운 컬럼 추가
ALTER TABLE kotra 
ADD COLUMN IF NOT EXISTS sales_division TEXT,
ADD COLUMN IF NOT EXISTS sales_division_match_type TEXT,
ADD COLUMN IF NOT EXISTS sales_division_similarity FLOAT;

-- 2. 컬럼 설명 추가
COMMENT ON COLUMN kotra.sales_division IS '영업조직 정보';
COMMENT ON COLUMN kotra.sales_division_match_type IS '매칭 타입 (korean_name, english_name, address)';
COMMENT ON COLUMN kotra.sales_division_similarity IS '매칭 유사도 (0.0 ~ 1.0)';
"""
    
    with open('data/create_columns.sql', 'w', encoding='utf-8') as f:
        f.write(create_columns_sql)
    
    print(f"- SQL 스크립트: data/create_columns.sql")
    
    # 업데이트용 SQL 예시 생성
    update_example_sql = """
-- 매칭된 데이터 업데이트 예시
UPDATE kotra 
SET 
    sales_division = '전략고객사업본부 전략사업2담당 전략고객1팀',
    sales_division_match_type = 'korean_name',
    sales_division_similarity = 1.0
WHERE company_name_kr = '현대자동차';
"""
    
    with open('data/update_example.sql', 'w', encoding='utf-8') as f:
        f.write(update_example_sql)
    
    print(f"- 업데이트 예시: data/update_example.sql")
    
    # 통계 출력
    print(f"\n=== 업로드 준비 완료 ===")
    print(f"총 업로드할 레코드: {len(upload_data)}개")
    
    # 영업조직별 통계
    sales_division_counts = matched_df['sales_division'].value_counts()
    print(f"\n영업조직별 분포:")
    for division, count in sales_division_counts.head(5).items():
        print(f"  {division}: {count}개")
    
    return upload_data

def generate_update_sql():
    """업데이트용 SQL 스크립트를 생성하는 함수"""
    
    # 업로드 데이터 읽기
    with open('data/supabase_upload_data.json', 'r', encoding='utf-8') as f:
        upload_data = json.load(f)
    
    # SQL 스크립트 생성
    sql_statements = []
    
    for record in upload_data:
        company_name_kr = record['company_name_kr'].replace("'", "''")  # SQL 인젝션 방지
        sales_division = record['sales_division'].replace("'", "''")
        match_type = record['sales_division_match_type']
        similarity = record['sales_division_similarity']
        
        sql = f"""UPDATE kotra 
SET 
    sales_division = '{sales_division}',
    sales_division_match_type = '{match_type}',
    sales_division_similarity = {similarity}
WHERE company_name_kr = '{company_name_kr}';"""
        
        sql_statements.append(sql)
    
    # SQL 파일로 저장
    with open('data/update_kotra_sales_division.sql', 'w', encoding='utf-8') as f:
        f.write("-- KOTRA 테이블 영업조직 정보 업데이트\n")
        f.write("-- 생성일: " + pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S") + "\n\n")
        f.write("\n".join(sql_statements))
    
    print(f"업데이트 SQL 스크립트가 생성되었습니다: data/update_kotra_sales_division.sql")
    print(f"총 {len(sql_statements)}개의 UPDATE 문이 포함되어 있습니다.")

if __name__ == "__main__":
    # 업로드 데이터 준비
    upload_data = prepare_supabase_upload()
    
    # SQL 스크립트 생성
    generate_update_sql()
    
    print("\n=== 다음 단계 ===")
    print("1. Supabase 연결을 확인하세요")
    print("2. data/create_columns.sql을 실행하여 컬럼을 생성하세요")
    print("3. data/update_kotra_sales_division.sql을 실행하여 데이터를 업데이트하세요")
    print("4. 또는 data/supabase_upload_data.json을 사용하여 프로그래밍 방식으로 업로드하세요") 