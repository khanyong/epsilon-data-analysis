import pandas as pd
import numpy as np
from difflib import SequenceMatcher
import re

def normalize_company_name(name):
    """기업명을 정규화하는 함수"""
    if pd.isna(name) or name == '':
        return ''
    
    # 소문자로 변환
    name = str(name).lower()
    
    # 특수문자 제거 (하이픈, 점, 괄호 등)
    name = re.sub(r'[^\w\s]', ' ', name)
    
    # 여러 공백을 하나로
    name = re.sub(r'\s+', ' ', name).strip()
    
    # 일반적인 제거할 단어들
    remove_words = ['pvt', 'ltd', 'limited', 'corporation', 'corp', 'company', 'co', 'inc']
    words = name.split()
    words = [word for word in words if word not in remove_words]
    
    return ' '.join(words)

def calculate_similarity(name1, name2):
    """두 기업명의 유사도를 계산하는 함수"""
    if pd.isna(name1) or pd.isna(name2) or name1 == '' or name2 == '':
        return 0
    
    norm1 = normalize_company_name(name1)
    norm2 = normalize_company_name(name2)
    
    if norm1 == norm2:
        return 1.0
    
    # SequenceMatcher를 사용한 유사도 계산
    similarity = SequenceMatcher(None, norm1, norm2).ratio()
    
    return similarity

def safe_string_contains(text, substring):
    """안전한 문자열 포함 여부 확인"""
    if pd.isna(text) or pd.isna(substring):
        return False
    
    try:
        return str(substring) in str(text)
    except:
        return False

def match_companies(sales_division_df, kotra_df, similarity_threshold=0.8):
    """기업명을 매칭하는 함수"""
    
    # 매칭 결과를 저장할 리스트
    matches = []
    
    # 영업조직 데이터에서 기업명 추출
    for idx, row in sales_division_df.iterrows():
        company_kr = row['기업명(국문)']
        company_en = row['기업명(영문)']
        sales_division = row['영업조직']
        
        if pd.isna(sales_division) or sales_division == '':
            continue
            
        best_match = None
        best_similarity = 0
        
        # kotra 데이터와 비교
        for kotra_idx, kotra_row in kotra_df.iterrows():
            kotra_company_kr = kotra_row.get('company_name_kr', '')
            kotra_company_en = kotra_row.get('company_name_en', '')
            kotra_local_address = kotra_row.get('local_address', '')
            
            # 한국어 기업명 매칭
            if company_kr and kotra_company_kr:
                similarity_kr = calculate_similarity(company_kr, kotra_company_kr)
                if similarity_kr > best_similarity and similarity_kr >= similarity_threshold:
                    best_similarity = similarity_kr
                    best_match = {
                        'kotra_index': kotra_idx,
                        'kotra_company_kr': kotra_company_kr,
                        'kotra_company_en': kotra_company_en,
                        'kotra_local_address': kotra_local_address,
                        'sales_division_company_kr': company_kr,
                        'sales_division_company_en': company_en,
                        'sales_division': sales_division,
                        'similarity': similarity_kr,
                        'match_type': 'korean_name'
                    }
            
            # 영어 기업명 매칭
            if company_en and kotra_company_en:
                similarity_en = calculate_similarity(company_en, kotra_company_en)
                if similarity_en > best_similarity and similarity_en >= similarity_threshold:
                    best_similarity = similarity_en
                    best_match = {
                        'kotra_index': kotra_idx,
                        'kotra_company_kr': kotra_company_kr,
                        'kotra_company_en': kotra_company_en,
                        'kotra_local_address': kotra_local_address,
                        'sales_division_company_kr': company_kr,
                        'sales_division_company_en': company_en,
                        'sales_division': sales_division,
                        'similarity': similarity_en,
                        'match_type': 'english_name'
                    }
            
            # 주소에서 기업명 추출하여 매칭 (간단한 방법)
            if kotra_local_address and company_kr:
                # 주소에서 기업명이 포함되어 있는지 확인
                if safe_string_contains(kotra_local_address, company_kr):
                    similarity_addr = 0.9  # 주소 매칭은 높은 점수
                    if similarity_addr > best_similarity:
                        best_similarity = similarity_addr
                        best_match = {
                            'kotra_index': kotra_idx,
                            'kotra_company_kr': kotra_company_kr,
                            'kotra_company_en': kotra_company_en,
                            'kotra_local_address': kotra_local_address,
                            'sales_division_company_kr': company_kr,
                            'sales_division_company_en': company_en,
                            'sales_division': sales_division,
                            'similarity': similarity_addr,
                            'match_type': 'address'
                        }
        
        if best_match:
            matches.append(best_match)
    
    return matches

def update_kotra_with_sales_division(kotra_df, matches):
    """kotra 데이터프레임에 영업조직 컬럼을 추가하는 함수"""
    
    # 영업조직 컬럼 추가
    kotra_df['sales_division'] = ''
    kotra_df['sales_division_match_type'] = ''
    kotra_df['sales_division_similarity'] = 0.0
    
    # 매칭된 결과를 kotra 데이터프레임에 반영
    for match in matches:
        kotra_idx = match['kotra_index']
        kotra_df.loc[kotra_idx, 'sales_division'] = match['sales_division']
        kotra_df.loc[kotra_idx, 'sales_division_match_type'] = match['match_type']
        kotra_df.loc[kotra_idx, 'sales_division_similarity'] = match['similarity']
    
    return kotra_df

def main():
    """메인 함수"""
    
    # CSV 파일 읽기
    print("CSV 파일을 읽는 중...")
    sales_division_df = pd.read_csv('data/kotra_mumbai_chennai_linkde_salesdivision.csv')
    kotra_df = pd.read_csv('data/kotra.csv')
    
    print(f"영업조직 데이터: {len(sales_division_df)}개 행")
    print(f"KOTRA 데이터: {len(kotra_df)}개 행")
    
    # kotra 데이터프레임의 컬럼명 확인
    print("KOTRA 데이터 컬럼:", kotra_df.columns.tolist())
    
    # 매칭 실행
    print("기업명 매칭을 시작합니다...")
    matches = match_companies(sales_division_df, kotra_df, similarity_threshold=0.7)
    
    print(f"매칭된 기업 수: {len(matches)}개")
    
    # 매칭 결과 출력
    for match in matches[:10]:  # 처음 10개만 출력
        print(f"매칭: {match['sales_division_company_kr']} -> {match['kotra_company_kr']} (유사도: {match['similarity']:.2f})")
    
    # kotra 데이터프레임 업데이트
    print("KOTRA 데이터프레임을 업데이트합니다...")
    updated_kotra_df = update_kotra_with_sales_division(kotra_df, matches)
    
    # 결과 저장
    output_file = 'data/kotra_with_sales_division.csv'
    updated_kotra_df.to_csv(output_file, index=False, encoding='utf-8-sig')
    print(f"업데이트된 데이터를 {output_file}에 저장했습니다.")
    
    # 통계 출력
    matched_count = len(updated_kotra_df[updated_kotra_df['sales_division'] != ''])
    print(f"영업조직이 매칭된 기업 수: {matched_count}개")
    print(f"매칭률: {matched_count/len(updated_kotra_df)*100:.1f}%")

if __name__ == "__main__":
    main() 