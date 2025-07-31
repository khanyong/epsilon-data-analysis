import json
import re

def normalize_company_name(name):
    """기업명을 정규화하는 함수"""
    if not name:
        return ''
    
    # 소문자로 변환
    name = str(name).lower()
    
    # 특수문자 제거 (하이픈, 점, 괄호 등)
    name = re.sub(r'[^\w\s]', ' ', name)
    
    # 여러 공백을 하나로
    name = re.sub(r'\s+', ' ', name).strip()
    
    # 일반적인 제거할 단어들
    remove_words = ['pvt', 'ltd', 'limited', 'corporation', 'corp', 'company', 'co', 'inc', '인도법인', '법인']
    words = name.split()
    words = [word for word in words if word not in remove_words]
    
    return ' '.join(words)

def find_sales_division(company_name, sales_division_data):
    """기업명에 해당하는 영업조직을 찾는 함수"""
    normalized_company = normalize_company_name(company_name)
    
    for record in sales_division_data:
        # 한국어 기업명 매칭
        normalized_kr = normalize_company_name(record['company_name_kr'])
        if normalized_company == normalized_kr:
            return record['sales_division']
        
        # 영어 기업명 매칭
        normalized_en = normalize_company_name(record['company_name_en'])
        if normalized_company == normalized_en:
            return record['sales_division']
    
    return ''

def add_sales_division_to_target_list():
    """타겟 리스트에 영업조직 정보를 추가하는 함수"""
    
    # 영업조직 데이터 로드
    with open('data/supabase_upload_data.json', 'r', encoding='utf-8') as f:
        sales_division_data = json.load(f)
    
    print(f"영업조직 데이터 로드: {len(sales_division_data)}개 레코드")
    
    # 타겟 리스트 파일 읽기
    with open('src/pages/MarketingReport/BusinessFeasibilitySections4.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 뭄바이 기업 리스트에서 영업조직 정보 추가
    mumbai_pattern = r'const mumbaiCompanies = \[(.*?)\];'
    mumbai_match = re.search(mumbai_pattern, content, re.DOTALL)
    
    if mumbai_match:
        mumbai_companies_str = mumbai_match.group(1)
        
        # 각 기업 객체에 영업조직 정보 추가
        lines = mumbai_companies_str.split('\n')
        updated_lines = []
        
        for line in lines:
            line = line.strip()
            if line.startswith('{') and line.endswith('},'):
                # 기업명 추출
                name_match = re.search(r"name: '([^']+)'", line)
                if name_match:
                    company_name = name_match.group(1)
                    sales_division = find_sales_division(company_name, sales_division_data)
                    
                    if sales_division:
                        # 영업조직 정보 추가
                        if 'description:' in line:
                            # description 앞에 salesDivision 추가
                            line = line.replace(
                                "description: '",
                                f"salesDivision: '{sales_division}', description: '"
                            )
                        else:
                            # description이 없는 경우 추가
                            line = line.replace(
                                "},",
                                f", salesDivision: '{sales_division}'}},"
                            )
                
                updated_lines.append(line)
            else:
                updated_lines.append(line)
        
        # 업데이트된 뭄바이 기업 리스트로 교체
        updated_mumbai_companies = 'const mumbaiCompanies = [\n' + '\n'.join(updated_lines) + '\n  ];'
        content = re.sub(mumbai_pattern, updated_mumbai_companies, content, flags=re.DOTALL)
    
    # 첸나이 기업 리스트에서 영업조직 정보 추가
    chennai_pattern = r'const chennaiCompanies = \[(.*?)\];'
    chennai_match = re.search(chennai_pattern, content, re.DOTALL)
    
    if chennai_match:
        chennai_companies_str = chennai_match.group(1)
        
        # 각 기업 객체에 영업조직 정보 추가
        lines = chennai_companies_str.split('\n')
        updated_lines = []
        
        for line in lines:
            line = line.strip()
            if line.startswith('{') and line.endswith('},'):
                # 기업명 추출
                name_match = re.search(r"name: '([^']+)'", line)
                if name_match:
                    company_name = name_match.group(1)
                    sales_division = find_sales_division(company_name, sales_division_data)
                    
                    if sales_division:
                        # 영업조직 정보 추가
                        if 'description:' in line:
                            # description 앞에 salesDivision 추가
                            line = line.replace(
                                "description: '",
                                f"salesDivision: '{sales_division}', description: '"
                            )
                        else:
                            # description이 없는 경우 추가
                            line = line.replace(
                                "},",
                                f", salesDivision: '{sales_division}'}},"
                            )
                
                updated_lines.append(line)
            else:
                updated_lines.append(line)
        
        # 업데이트된 첸나이 기업 리스트로 교체
        updated_chennai_companies = 'const chennaiCompanies = [\n' + '\n'.join(updated_lines) + '\n  ];'
        content = re.sub(chennai_pattern, updated_chennai_companies, content, flags=re.DOTALL)
    
    # 테이블 헤더에 영업조직 컬럼 추가
    header_pattern = r'<th className="border border-gray-300 px-4 py-2 text-left font-semibold">설명</th>'
    updated_header = '''<th className="border border-gray-300 px-4 py-2 text-left font-semibold">영업조직</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">설명</th>'''
    content = re.sub(header_pattern, updated_header, content)
    
    # 테이블 행에 영업조직 컬럼 추가
    row_pattern = r'<td className="border border-gray-300 px-4 py-2 text-center">\s*\{company\.isTarget \? \'✓\' : \'-\'\}\s*</td>\s*<td className="border border-gray-300 px-4 py-2 text-sm">\{company\.description\}</td>'
    updated_row = '''<td className="border border-gray-300 px-4 py-2 text-center">
                      {company.isTarget ? '✓' : '-'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{company.salesDivision || '-'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{company.description}</td>'''
    content = re.sub(row_pattern, updated_row, content)
    
    # 업데이트된 파일 저장
    with open('src/pages/MarketingReport/BusinessFeasibilitySections4.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ 타겟 리스트에 영업조직 컬럼이 추가되었습니다!")
    
    # 매칭 결과 통계
    mumbai_matched = 0
    chennai_matched = 0
    
    for record in sales_division_data:
        company_name = record['company_name_kr']
        # 뭄바이 기업 리스트에서 확인
        if f"name: '{company_name}'" in content:
            mumbai_matched += 1
        # 첸나이 기업 리스트에서 확인
        if f"name: '{company_name}'" in content:
            chennai_matched += 1
    
    print(f"📊 매칭 결과:")
    print(f"   - 뭄바이 기업 매칭: {mumbai_matched}개")
    print(f"   - 첸나이 기업 매칭: {chennai_matched}개")

if __name__ == "__main__":
    add_sales_division_to_target_list() 