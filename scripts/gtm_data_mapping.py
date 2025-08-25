import pandas as pd
import numpy as np
from supabase import create_client
import os
from dotenv import load_dotenv
import json
from difflib import SequenceMatcher

load_dotenv()

# Supabase 클라이언트 초기화
url = os.getenv("VITE_SUPABASE_URL")
key = os.getenv("VITE_SUPABASE_ANON_KEY")
supabase = create_client(url, key)

def analyze_data_mapping():
    """Excel과 Supabase 데이터 매핑 분석"""
    
    print("=== GTM 데이터 매핑 분석 ===\n")
    
    # 1. Excel 데이터 로드
    excel_file = 'D:/Dev/epsilon-data-analyzer/data/gtm/GTM-data-active.xlsx'
    xl = pd.ExcelFile(excel_file)
    
    print("1. Excel 시트별 데이터 분석")
    print("-" * 50)
    
    excel_data = {}
    for sheet_name in xl.sheet_names:
        df = pd.read_excel(excel_file, sheet_name=sheet_name)
        excel_data[sheet_name] = df
        print(f"  {sheet_name}: {len(df)} rows x {len(df.columns)} columns")
    
    # 2. Supabase 데이터 로드
    print("\n2. Supabase 데이터 로드")
    print("-" * 50)
    
    # gtm_customers 데이터 가져오기 (샘플)
    try:
        # 먼저 전체 개수 확인
        count_response = supabase.table('gtm_customers').select("*", count='exact', head=True).execute()
        total_count = count_response.count
        print(f"  gtm_customers 전체: {total_count} 레코드")
        
        # 실제 데이터 가져오기
        customers_response = supabase.table('gtm_customers').select("*").limit(1000).execute()
        
        if customers_response.data:
            supabase_customers = pd.DataFrame(customers_response.data)
            print(f"  샘플 로드: {len(supabase_customers)} 레코드")
        else:
            print("  데이터 로드 실패, 다시 시도")
            # 페이지네이션으로 시도
            customers_response = supabase.table('gtm_customers').select("*").range(0, 999).execute()
            supabase_customers = pd.DataFrame(customers_response.data)
            print(f"  샘플 로드 (range): {len(supabase_customers)} 레코드")
            
    except Exception as e:
        print(f"  오류 발생: {str(e)}")
        supabase_customers = pd.DataFrame()  # 빈 DataFrame
    
    # 3. 고객명 매핑 분석
    print("\n3. 고객명 매핑 분석")
    print("-" * 50)
    
    # Excel에서 고객 데이터 추출 (고객현황 시트)
    if '고객현황' in excel_data:
        excel_customers = excel_data['고객현황']
        # 고객명 컬럼 찾기
        customer_col = None
        for col in excel_customers.columns:
            if '고객' in str(col) or '회사' in str(col) or 'customer' in str(col).lower():
                customer_col = col
                break
        
        if customer_col:
            excel_customer_names = excel_customers[customer_col].dropna().unique()
            print(f"  Excel 고객수: {len(excel_customer_names)}")
            
            # Supabase 고객명과 매칭
            if not supabase_customers.empty and 'customer_name' in supabase_customers.columns:
                supabase_customer_names = supabase_customers['customer_name'].unique()
                print(f"  Supabase 고객수: {len(supabase_customer_names)}")
            else:
                print(f"  Supabase 데이터 없음 또는 customer_name 컬럼 없음")
                print(f"  사용 가능한 컬럼: {list(supabase_customers.columns[:10]) if not supabase_customers.empty else 'None'}")
                supabase_customer_names = []
            
            # 정확한 매칭 찾기
            exact_matches = []
            partial_matches = []
            no_matches = []
            
            for excel_name in excel_customer_names[:50]:  # 처음 50개만 테스트
                excel_name_str = str(excel_name).strip()
                
                # 정확한 매칭
                if excel_name_str in supabase_customer_names:
                    exact_matches.append(excel_name_str)
                else:
                    # 부분 매칭 찾기
                    best_match = None
                    best_score = 0
                    
                    for supabase_name in supabase_customer_names:
                        score = SequenceMatcher(None, excel_name_str, str(supabase_name)).ratio()
                        if score > best_score and score > 0.8:  # 80% 이상 유사도
                            best_score = score
                            best_match = supabase_name
                    
                    if best_match:
                        partial_matches.append({
                            'excel': excel_name_str,
                            'supabase': best_match,
                            'score': best_score
                        })
                    else:
                        no_matches.append(excel_name_str)
            
            print(f"\n  매칭 결과 (샘플 50개):")
            print(f"    - 정확한 매칭: {len(exact_matches)}개")
            print(f"    - 유사 매칭: {len(partial_matches)}개")
            print(f"    - 매칭 없음: {len(no_matches)}개")
            
            if partial_matches:
                print(f"\n  유사 매칭 예시 (상위 5개):")
                for match in partial_matches[:5]:
                    print(f"    Excel: {match['excel']}")
                    print(f"    → Supabase: {match['supabase']} (유사도: {match['score']:.2%})")
    
    # 4. 카테고리 데이터 분석
    print("\n4. 카테고리 데이터 분석")
    print("-" * 50)
    
    # Sheet1에서 카테고리 데이터 추출
    if 'Sheet1' in excel_data:
        sheet1 = excel_data['Sheet1']
        
        # 카테고리 정보 추출 (첫 번째 컬럼이 카테고리명일 가능성)
        categories = []
        for idx, row in sheet1.iterrows():
            if pd.notna(row.iloc[0]) and isinstance(row.iloc[0], str):
                # 숫자 데이터가 있는 행 찾기
                if pd.notna(row.iloc[1]) and isinstance(row.iloc[1], (int, float)):
                    categories.append({
                        'name': row.iloc[0],
                        'count': row.iloc[1] if pd.notna(row.iloc[1]) else 0,
                        'amount': row.iloc[2] if pd.notna(row.iloc[2]) else 0
                    })
        
        print(f"  발견된 카테고리: {len(categories)}개")
        for cat in categories[:10]:
            print(f"    - {cat['name']}: {cat['count']}개사")
    
    # 5. 매출 데이터 분석
    print("\n5. 매출 데이터 구조")
    print("-" * 50)
    
    if '매출집계' in excel_data:
        revenue_df = excel_data['매출집계']
        
        # 연도 컬럼 찾기
        year_cols = [col for col in revenue_df.columns if str(col).isdigit() and 2020 <= int(str(col)) <= 2030]
        month_cols = [col for col in revenue_df.columns if '월' in str(col)]
        
        print(f"  연도별 컬럼: {year_cols}")
        print(f"  월별 컬럼 수: {len(month_cols)}")
        
        # 총 매출 계산
        if year_cols:
            for year in year_cols[:3]:  # 처음 3개 연도만
                if pd.api.types.is_numeric_dtype(revenue_df[year]):
                    total = revenue_df[year].sum()
                    print(f"    {year}년 총 매출: {total:,.0f}원")
    
    # 6. 통합 전략 제안
    print("\n6. 데이터 통합 전략 제안")
    print("-" * 50)
    
    recommendations = {
        "카테고리 통합": {
            "action": "새 테이블 생성 (gtm_categories)",
            "data_source": "Excel Sheet1",
            "records": len(categories) if 'categories' in locals() else 0
        },
        "고객 매핑": {
            "action": "매핑 테이블 생성 또는 customer_name 업데이트",
            "exact_matches": len(exact_matches) if 'exact_matches' in locals() else 0,
            "partial_matches": len(partial_matches) if 'partial_matches' in locals() else 0,
            "new_records": len(no_matches) if 'no_matches' in locals() else 0
        },
        "매출 이력": {
            "action": "gtm_revenue_history 테이블 생성",
            "data_source": "Excel 매출집계/매출 시트",
            "time_range": f"{year_cols[0]}-{year_cols[-1]}" if 'year_cols' in locals() and year_cols else "N/A"
        }
    }
    
    print(json.dumps(recommendations, indent=2, ensure_ascii=False))
    
    # 7. 결과 저장
    output = {
        "analysis_date": pd.Timestamp.now().isoformat(),
        "excel_sheets": {name: {"rows": len(df), "columns": len(df.columns)} 
                        for name, df in excel_data.items()},
        "supabase_customers": len(supabase_customers),
        "mapping_results": {
            "exact_matches": exact_matches if 'exact_matches' in locals() else [],
            "partial_matches": partial_matches if 'partial_matches' in locals() else [],
            "no_matches": no_matches if 'no_matches' in locals() else []
        },
        "categories": categories if 'categories' in locals() else [],
        "recommendations": recommendations
    }
    
    with open('D:/Dev/epsilon-data-analyzer/data/gtm/mapping_analysis.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2, default=str)
    
    print("\n분석 결과 저장: data/gtm/mapping_analysis.json")
    
    return output

if __name__ == "__main__":
    result = analyze_data_mapping()