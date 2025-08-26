#!/usr/bin/env python3
"""
CSV 파일을 SQL INSERT 문으로 변환하는 스크립트
"""

import pandas as pd
import re

def clean_value(value):
    """값을 SQL에 맞게 정제"""
    if pd.isna(value) or value == '':
        return 'NULL'
    
    # 숫자 처리 (매출액)
    if isinstance(value, (int, float)):
        return str(value)
    
    # 문자열에서 숫자 추출 (매출액 컬럼)
    if isinstance(value, str) and any(c.isdigit() for c in value):
        # 쉼표, 공백, 따옴표 제거
        cleaned = value.replace(',', '').replace(' ', '').replace('"', '')
        try:
            return str(float(cleaned))
        except:
            pass
    
    # 일반 문자열
    if isinstance(value, str):
        # SQL injection 방지를 위한 이스케이프
        escaped = value.replace("'", "''")
        return f"'{escaped}'"
    
    return 'NULL'

def csv_to_sql():
    """CSV를 SQL INSERT 문으로 변환"""
    
    # CSV 파일 읽기
    csv_path = 'D:/Dev/epsilon-data-analyzer/data/gtm/Global_Sales.csv'
    df = pd.read_csv(csv_path, encoding='utf-8-sig')
    
    # SQL 파일 생성
    sql_file = 'D:/Dev/epsilon-data-analyzer/scripts/gtm_sales_insert.sql'
    
    with open(sql_file, 'w', encoding='utf-8') as f:
        f.write("-- GTM Sales 데이터 INSERT 문\n")
        f.write("-- 생성 시간: " + pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S') + "\n\n")
        
        f.write("-- 기존 데이터 삭제 (선택적)\n")
        f.write("-- TRUNCATE TABLE gtm_sales;\n\n")
        
        f.write("-- 데이터 삽입\n")
        f.write("INSERT INTO gtm_sales (\n")
        f.write("    division, settlement_type, bm_manager, settlement_manager, customer_name,\n")
        f.write("    domestic_overseas, channel, customer_group, service_type, service_id,\n")
        f.write("    pop, capacity, capacity_unit,\n")
        f.write("    revenue_2408, revenue_2409, revenue_2410, revenue_2411, revenue_2412,\n")
        f.write("    revenue_2501, revenue_2502, revenue_2503, revenue_2504, revenue_2505, revenue_2506\n")
        f.write(") VALUES\n")
        
        values_list = []
        
        for index, row in df.iterrows():
            # 각 컬럼 값 처리
            values = []
            
            # 기본 정보
            values.append(clean_value(row.get('구분')))
            values.append(clean_value(row.get('결산구분')))
            values.append(clean_value(row.get('BM담당')))
            values.append(clean_value(row.get('정산담당')))
            values.append(clean_value(row.get('통합고객명')))
            values.append(clean_value(row.get('국내/해외')))
            values.append(clean_value(row.get('채널')))
            values.append(clean_value(row.get('고객군')))
            values.append(clean_value(row.get('서비스유형')))
            values.append(clean_value(row.get('서비스ID')))
            values.append(clean_value(row.get('POP')))
            values.append(clean_value(row.get('용량')))
            values.append(clean_value(row.get('용량단위')))
            
            # 월별 매출액
            values.append(clean_value(row.get('2408 매출액')))
            values.append(clean_value(row.get('2409 매출액')))
            values.append(clean_value(row.get('2410 매출액')))
            values.append(clean_value(row.get('2411 매출액')))
            values.append(clean_value(row.get('2412 매출액')))
            values.append(clean_value(row.get('2501 매출액')))
            values.append(clean_value(row.get('2502 매출액')))
            values.append(clean_value(row.get('2503 매출액')))
            values.append(clean_value(row.get('2504 매출액')))
            values.append(clean_value(row.get('2505 매출액')))
            values.append(clean_value(row.get('2506 매출액')))
            
            values_str = f"({', '.join(values)})"
            values_list.append(values_str)
        
        # VALUES 절 작성
        f.write(',\n'.join(values_list))
        f.write(";\n\n")
        
        # 통계 쿼리 추가
        f.write("-- 데이터 확인\n")
        f.write("SELECT COUNT(*) as total_records FROM gtm_sales;\n\n")
        
        f.write("-- 고객별 총 매출 Top 10\n")
        f.write("SELECT * FROM gtm_sales_customer_summary LIMIT 10;\n\n")
        
        f.write("-- 서비스 유형별 매출\n")
        f.write("SELECT * FROM gtm_sales_service_summary;\n")
    
    print(f"✅ SQL 파일 생성 완료: {sql_file}")
    print(f"   총 {len(df)} 개의 레코드를 INSERT 문으로 변환했습니다.")
    print("\n실행 방법:")
    print("1. Supabase SQL Editor를 엽니다")
    print("2. gtm_sales_insert.sql 파일 내용을 복사하여 붙여넣습니다")
    print("3. Run 버튼을 클릭합니다")

if __name__ == "__main__":
    csv_to_sql()