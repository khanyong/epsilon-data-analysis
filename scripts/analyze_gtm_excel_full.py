import pandas as pd
import numpy as np
import json
from datetime import datetime
import os

def analyze_full_gtm_data():
    """GTM Excel 파일의 모든 시트를 분석하고 통합 데이터 모델을 생성"""
    
    excel_file = 'D:/Dev/epsilon-data-analyzer/data/gtm/GTM-data-active.xlsx'
    
    print('=== GTM Excel 전체 분석 시작 ===\n')
    
    # Excel 파일의 모든 시트 이름 가져오기
    xl_file = pd.ExcelFile(excel_file)
    sheet_names = xl_file.sheet_names
    
    print(f"발견된 시트: {len(sheet_names)}개")
    for i, sheet in enumerate(sheet_names, 1):
        print(f"  {i}. {sheet}")
    
    print("\n" + "="*50 + "\n")
    
    # 각 시트별 데이터 분석
    all_data = {}
    
    for sheet_name in sheet_names:
        print(f"\n=== {sheet_name} 시트 분석 ===")
        
        try:
            # 시트 읽기 (header 위치를 자동으로 찾기)
            df = pd.read_excel(excel_file, sheet_name=sheet_name, header=None)
            
            # 데이터가 있는 첫 행 찾기
            first_data_row = 0
            for i in range(min(10, len(df))):
                row_data = df.iloc[i]
                non_null_count = row_data.notna().sum()
                if non_null_count > 3:  # 최소 3개 이상의 데이터가 있는 행
                    first_data_row = i
                    break
            
            # 헤더가 있을 가능성이 있는 경우 다시 읽기
            if first_data_row > 0:
                df = pd.read_excel(excel_file, sheet_name=sheet_name, header=first_data_row)
            
            print(f"  - 크기: {df.shape[0]} rows x {df.shape[1]} columns")
            print(f"  - 컬럼: {list(df.columns)[:10]}...")  # 처음 10개 컬럼만 표시
            
            # 데이터 타입 분석
            numeric_cols = df.select_dtypes(include=[np.number]).columns
            text_cols = df.select_dtypes(include=['object']).columns
            date_cols = df.select_dtypes(include=['datetime']).columns
            
            print(f"  - 숫자 컬럼: {len(numeric_cols)}개")
            print(f"  - 텍스트 컬럼: {len(text_cols)}개")
            print(f"  - 날짜 컬럼: {len(date_cols)}개")
            
            # 시트별 특별 처리
            sheet_data = {}
            
            if '매출' in sheet_name or 'revenue' in sheet_name.lower():
                print("  [매출 데이터 감지]")
                sheet_data = analyze_revenue_sheet(df, sheet_name)
                
            elif 'SD' in sheet_name or 'wan' in sheet_name.lower():
                print("  [SD-WAN 데이터 감지]")
                sheet_data = analyze_sdwan_sheet(df, sheet_name)
                
            elif '고객' in sheet_name or 'customer' in sheet_name.lower():
                print("  [고객 데이터 감지]")
                sheet_data = analyze_customer_sheet(df, sheet_name)
                
            elif '통합' in sheet_name or 'integrated' in sheet_name.lower():
                print("  [통합 데이터 감지]")
                sheet_data = analyze_integrated_sheet(df, sheet_name)
                
            else:
                # 일반 데이터 분석
                sheet_data = analyze_generic_sheet(df, sheet_name)
            
            all_data[sheet_name] = sheet_data
            
        except Exception as e:
            print(f"  오류 발생: {str(e)}")
            all_data[sheet_name] = {"error": str(e)}
    
    # 시트간 연계성 분석
    print("\n=== 시트간 데이터 연계성 분석 ===")
    relationships = analyze_sheet_relationships(all_data)
    
    # 통합 데이터 모델 생성
    integrated_model = create_integrated_model(all_data, relationships)
    
    # 결과 저장
    output_file = 'D:/Dev/epsilon-data-analyzer/data/gtm/gtm_full_analysis.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(integrated_model, f, ensure_ascii=False, indent=2, default=str)
    
    print(f"\n분석 완료. 결과 저장: {output_file}")
    
    return integrated_model

def analyze_revenue_sheet(df, sheet_name):
    """매출 시트 분석"""
    data = {
        "type": "revenue",
        "sheet_name": sheet_name,
        "metrics": {}
    }
    
    try:
        # 연도별/월별 매출 찾기
        year_columns = [col for col in df.columns if str(col).isdigit() and 2020 <= int(str(col)) <= 2030]
        month_columns = [col for col in df.columns if any(m in str(col) for m in ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'])]
        
        if year_columns:
            print(f"    연도별 데이터: {year_columns}")
            yearly_revenue = {}
            for year in year_columns:
                total = df[year].sum() if pd.api.types.is_numeric_dtype(df[year]) else 0
                yearly_revenue[str(year)] = float(total) if not pd.isna(total) else 0
            data["yearly_revenue"] = yearly_revenue
        
        if month_columns:
            print(f"    월별 데이터 발견: {len(month_columns)}개월")
            monthly_revenue = {}
            for month in month_columns:
                total = df[month].sum() if pd.api.types.is_numeric_dtype(df[month]) else 0
                monthly_revenue[str(month)] = float(total) if not pd.isna(total) else 0
            data["monthly_revenue"] = monthly_revenue
        
        # 고객별 매출 분석
        customer_col = None
        for col in df.columns:
            if '고객' in str(col) or 'customer' in str(col).lower() or '회사' in str(col):
                customer_col = col
                break
        
        if customer_col and len(year_columns) > 0:
            print(f"    고객별 매출 분석 가능")
            customer_revenue = []
            for idx, row in df.iterrows():
                if pd.notna(row[customer_col]):
                    customer_data = {
                        "customer": str(row[customer_col]),
                        "revenue": {}
                    }
                    for year in year_columns:
                        if pd.notna(row[year]):
                            customer_data["revenue"][str(year)] = float(row[year])
                    if customer_data["revenue"]:
                        customer_revenue.append(customer_data)
            
            data["customer_revenue"] = customer_revenue[:100]  # 상위 100개만
            data["total_customers"] = len(customer_revenue)
        
        # 총 매출 계산
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) > 0:
            total_revenue = df[numeric_cols].sum().sum()
            data["total_revenue"] = float(total_revenue) if not pd.isna(total_revenue) else 0
            data["metrics"]["total"] = data["total_revenue"]
            data["metrics"]["average"] = float(df[numeric_cols].mean().mean()) if len(df) > 0 else 0
        
    except Exception as e:
        print(f"    매출 분석 오류: {str(e)}")
        data["error"] = str(e)
    
    return data

def analyze_sdwan_sheet(df, sheet_name):
    """SD-WAN 시트 분석"""
    data = {
        "type": "sdwan",
        "sheet_name": sheet_name,
        "metrics": {}
    }
    
    try:
        # SD-WAN 관련 지표 찾기
        bandwidth_cols = [col for col in df.columns if 'bandwidth' in str(col).lower() or '대역폭' in str(col)]
        site_cols = [col for col in df.columns if 'site' in str(col).lower() or '사이트' in str(col)]
        
        if bandwidth_cols:
            for col in bandwidth_cols:
                if pd.api.types.is_numeric_dtype(df[col]):
                    data["metrics"][f"total_{col}"] = float(df[col].sum())
                    data["metrics"][f"avg_{col}"] = float(df[col].mean())
        
        # 사이트 수 계산
        if site_cols:
            for col in site_cols:
                unique_sites = df[col].nunique()
                data["metrics"][f"unique_{col}"] = int(unique_sites)
        
        # 전체 행 수 (SD-WAN 연결 수)
        data["total_connections"] = len(df)
        data["active_connections"] = len(df[df.notna().any(axis=1)])
        
    except Exception as e:
        print(f"    SD-WAN 분석 오류: {str(e)}")
        data["error"] = str(e)
    
    return data

def analyze_customer_sheet(df, sheet_name):
    """고객 시트 분석"""
    data = {
        "type": "customer",
        "sheet_name": sheet_name,
        "metrics": {}
    }
    
    try:
        # 고객 수
        data["total_customers"] = len(df)
        
        # 카테고리별 분석
        category_cols = [col for col in df.columns if '분류' in str(col) or 'category' in str(col).lower() or '업종' in str(col)]
        
        if category_cols:
            for col in category_cols:
                category_dist = df[col].value_counts().to_dict()
                data[f"distribution_{col}"] = {str(k): int(v) for k, v in category_dist.items()}
        
        # 지역별 분석
        region_cols = [col for col in df.columns if '지역' in str(col) or 'region' in str(col).lower() or '본사' in str(col)]
        
        if region_cols:
            for col in region_cols:
                region_dist = df[col].value_counts().head(20).to_dict()
                data[f"distribution_{col}"] = {str(k): int(v) for k, v in region_dist.items()}
        
        # 매출 관련 컬럼
        revenue_cols = [col for col in df.columns if '매출' in str(col) or 'revenue' in str(col).lower()]
        
        if revenue_cols:
            for col in revenue_cols:
                if pd.api.types.is_numeric_dtype(df[col]):
                    data["metrics"][f"total_{col}"] = float(df[col].sum())
                    data["metrics"][f"avg_{col}"] = float(df[col].mean())
        
    except Exception as e:
        print(f"    고객 분석 오류: {str(e)}")
        data["error"] = str(e)
    
    return data

def analyze_integrated_sheet(df, sheet_name):
    """통합 시트 분석"""
    data = {
        "type": "integrated",
        "sheet_name": sheet_name,
        "metrics": {}
    }
    
    try:
        # 통합 데이터의 주요 지표 추출
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        
        for col in numeric_cols:
            col_sum = df[col].sum()
            col_mean = df[col].mean()
            if not pd.isna(col_sum) and col_sum != 0:
                data["metrics"][f"total_{col}"] = float(col_sum)
                data["metrics"][f"avg_{col}"] = float(col_mean)
        
        # 고객 ID 또는 키 컬럼 찾기
        id_cols = [col for col in df.columns if 'id' in str(col).lower() or '코드' in str(col) or 'code' in str(col).lower()]
        
        if id_cols:
            data["key_columns"] = id_cols
            data["unique_records"] = int(df[id_cols[0]].nunique())
        
        data["total_records"] = len(df)
        
    except Exception as e:
        print(f"    통합 분석 오류: {str(e)}")
        data["error"] = str(e)
    
    return data

def analyze_generic_sheet(df, sheet_name):
    """일반 시트 분석"""
    data = {
        "type": "generic",
        "sheet_name": sheet_name,
        "shape": df.shape,
        "columns": list(df.columns)[:20],  # 처음 20개 컬럼만
        "metrics": {}
    }
    
    try:
        # 기본 통계
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        
        if len(numeric_cols) > 0:
            for col in numeric_cols[:10]:  # 처음 10개 숫자 컬럼만
                col_sum = df[col].sum()
                if not pd.isna(col_sum) and col_sum != 0:
                    data["metrics"][str(col)] = {
                        "sum": float(col_sum),
                        "mean": float(df[col].mean()),
                        "min": float(df[col].min()),
                        "max": float(df[col].max())
                    }
        
        data["total_rows"] = len(df)
        data["non_empty_rows"] = len(df.dropna(how='all'))
        
    except Exception as e:
        data["error"] = str(e)
    
    return data

def analyze_sheet_relationships(all_data):
    """시트간 연계성 분석"""
    relationships = []
    
    try:
        sheet_names = list(all_data.keys())
        
        for i, sheet1 in enumerate(sheet_names):
            for sheet2 in sheet_names[i+1:]:
                # 공통 컬럼 찾기
                if "columns" in all_data[sheet1] and "columns" in all_data[sheet2]:
                    cols1 = set(all_data[sheet1].get("columns", []))
                    cols2 = set(all_data[sheet2].get("columns", []))
                    common_cols = cols1.intersection(cols2)
                    
                    if common_cols:
                        relationships.append({
                            "sheet1": sheet1,
                            "sheet2": sheet2,
                            "common_columns": list(common_cols),
                            "relationship_type": "column_match"
                        })
                
                # 데이터 타입 연관성
                type1 = all_data[sheet1].get("type", "")
                type2 = all_data[sheet2].get("type", "")
                
                if type1 == "customer" and type2 == "revenue":
                    relationships.append({
                        "sheet1": sheet1,
                        "sheet2": sheet2,
                        "relationship_type": "customer_revenue"
                    })
                elif type1 == "sdwan" and (type2 == "customer" or type2 == "revenue"):
                    relationships.append({
                        "sheet1": sheet1,
                        "sheet2": sheet2,
                        "relationship_type": "service_linkage"
                    })
        
    except Exception as e:
        print(f"  관계 분석 오류: {str(e)}")
    
    return relationships

def create_integrated_model(all_data, relationships):
    """통합 데이터 모델 생성"""
    model = {
        "timestamp": datetime.now().isoformat(),
        "sheets": all_data,
        "relationships": relationships,
        "summary": {
            "total_sheets": len(all_data),
            "sheet_types": {}
        },
        "dashboard_config": {
            "primary_metrics": [],
            "charts": [],
            "filters": []
        }
    }
    
    # 시트 타입별 집계
    for sheet_name, sheet_data in all_data.items():
        sheet_type = sheet_data.get("type", "unknown")
        if sheet_type not in model["summary"]["sheet_types"]:
            model["summary"]["sheet_types"][sheet_type] = []
        model["summary"]["sheet_types"][sheet_type].append(sheet_name)
    
    # 주요 지표 추출
    for sheet_name, sheet_data in all_data.items():
        if sheet_data.get("type") == "revenue":
            if "total_revenue" in sheet_data:
                model["dashboard_config"]["primary_metrics"].append({
                    "name": "총 매출",
                    "value": sheet_data["total_revenue"],
                    "source": sheet_name,
                    "unit": "원"
                })
            
            if "yearly_revenue" in sheet_data:
                model["dashboard_config"]["charts"].append({
                    "type": "line",
                    "title": "연도별 매출 추이",
                    "data_source": sheet_name,
                    "data_field": "yearly_revenue"
                })
            
            if "monthly_revenue" in sheet_data:
                model["dashboard_config"]["charts"].append({
                    "type": "bar",
                    "title": "월별 매출 현황",
                    "data_source": sheet_name,
                    "data_field": "monthly_revenue"
                })
        
        elif sheet_data.get("type") == "customer":
            if "total_customers" in sheet_data:
                model["dashboard_config"]["primary_metrics"].append({
                    "name": "총 고객수",
                    "value": sheet_data["total_customers"],
                    "source": sheet_name,
                    "unit": "개사"
                })
            
            # 카테고리 분포 차트
            for key in sheet_data.keys():
                if key.startswith("distribution_"):
                    model["dashboard_config"]["charts"].append({
                        "type": "pie",
                        "title": key.replace("distribution_", "").replace("_", " ") + " 분포",
                        "data_source": sheet_name,
                        "data_field": key
                    })
        
        elif sheet_data.get("type") == "sdwan":
            if "total_connections" in sheet_data:
                model["dashboard_config"]["primary_metrics"].append({
                    "name": "SD-WAN 연결수",
                    "value": sheet_data["total_connections"],
                    "source": sheet_name,
                    "unit": "개"
                })
    
    # 필터 옵션 생성
    filter_candidates = ["고객", "지역", "서비스", "연도", "월"]
    for sheet_name, sheet_data in all_data.items():
        if "columns" in sheet_data:
            for col in sheet_data["columns"]:
                for candidate in filter_candidates:
                    if candidate in str(col):
                        model["dashboard_config"]["filters"].append({
                            "field": col,
                            "source": sheet_name,
                            "type": "select"
                        })
                        break
    
    # 중복 제거
    model["dashboard_config"]["filters"] = list({f["field"]: f for f in model["dashboard_config"]["filters"]}.values())
    
    return model

if __name__ == "__main__":
    result = analyze_full_gtm_data()
    
    print("\n=== 통합 모델 요약 ===")
    print(f"총 시트 수: {result['summary']['total_sheets']}")
    print(f"시트 타입별 분류: {result['summary']['sheet_types']}")
    print(f"발견된 관계: {len(result['relationships'])}개")
    print(f"주요 지표: {len(result['dashboard_config']['primary_metrics'])}개")
    print(f"차트 구성: {len(result['dashboard_config']['charts'])}개")
    print(f"필터 옵션: {len(result['dashboard_config']['filters'])}개")