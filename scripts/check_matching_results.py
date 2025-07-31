import pandas as pd

def check_matching_results():
    """매칭 결과를 확인하는 함수"""
    
    # 업데이트된 데이터 읽기
    df = pd.read_csv('data/kotra_with_sales_division.csv', low_memory=False)
    
    # 영업조직이 매칭된 데이터만 필터링 (빈 문자열이 아닌 것)
    matched_df = df[df['sales_division'].notna() & (df['sales_division'] != '')]
    
    print(f"전체 데이터: {len(df)}개 행")
    print(f"매칭된 데이터: {len(matched_df)}개 행")
    print(f"매칭률: {len(matched_df)/len(df)*100:.1f}%")
    
    print("\n=== 매칭된 기업 목록 (처음 20개) ===")
    for idx, row in matched_df.head(20).iterrows():
        company_name = row.get('company_name_kr', 'N/A')
        sales_division = row.get('sales_division', 'N/A')
        match_type = row.get('sales_division_match_type', 'N/A')
        similarity = row.get('sales_division_similarity', 0)
        print(f"{company_name} -> {sales_division} (타입: {match_type}, 유사도: {similarity:.2f})")
    
    print("\n=== 매칭 타입별 통계 ===")
    match_type_counts = matched_df['sales_division_match_type'].value_counts()
    print(match_type_counts)
    
    print("\n=== 유사도 분포 ===")
    similarity_stats = matched_df['sales_division_similarity'].describe()
    print(similarity_stats)
    
    # 영업조직별 통계
    print("\n=== 영업조직별 기업 수 (상위 10개) ===")
    sales_division_counts = matched_df['sales_division'].value_counts()
    print(sales_division_counts.head(10))
    
    # 유사도가 높은 매칭만 필터링 (0.8 이상)
    high_similarity_df = matched_df[matched_df['sales_division_similarity'] >= 0.8]
    print(f"\n=== 높은 유사도 매칭 (0.8 이상): {len(high_similarity_df)}개 ===")
    
    for idx, row in high_similarity_df.head(10).iterrows():
        company_name = row.get('company_name_kr', 'N/A')
        sales_division = row.get('sales_division', 'N/A')
        similarity = row.get('sales_division_similarity', 0)
        print(f"{company_name} -> {sales_division} (유사도: {similarity:.2f})")

if __name__ == "__main__":
    check_matching_results() 