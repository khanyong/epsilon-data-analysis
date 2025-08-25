import pandas as pd
import numpy as np
import json

def analyze_gtm_data():
    # Read the Excel file
    df_raw = pd.read_excel('D:/Dev/epsilon-data-analyzer/data/gtm/GTM-data-active.xlsx', header=None)
    
    print('=== GTM Active Customer Data Analysis ===\n')
    
    # Extract data from specific cells
    # The data appears to be in two sections side by side
    
    # Process left section (columns 0-2, rows 5+)
    left_customers = []
    for i in range(5, len(df_raw)):
        category = df_raw.iloc[i, 0]
        count = df_raw.iloc[i, 1]
        amount = df_raw.iloc[i, 2]
        
        if pd.notna(category) and pd.notna(count):
            try:
                # Handle encoding issues - convert to string first
                category_str = str(category)
                
                # Check if count is numeric
                if isinstance(count, (int, float)):
                    left_customers.append({
                        'category': category_str,
                        'company_count': int(count),
                        'total_amount': float(amount) if pd.notna(amount) and isinstance(amount, (int, float)) else 0
                    })
            except:
                continue
    
    # Process right section (columns 7-11, rows 5+)
    right_customers = []
    for i in range(5, len(df_raw)):
        category = df_raw.iloc[i, 7]
        count = df_raw.iloc[i, 8]
        amount = df_raw.iloc[i, 9]
        amount_billions = df_raw.iloc[i, 10]
        avg_per_company = df_raw.iloc[i, 11]
        
        if pd.notna(category) and pd.notna(count):
            try:
                category_str = str(category)
                
                # Check if count is numeric
                if isinstance(count, (int, float)):
                    right_customers.append({
                        'category': category_str,
                        'company_count': int(count),
                        'total_amount': float(amount) if pd.notna(amount) and isinstance(amount, (int, float)) else 0,
                        'amount_billions': float(amount_billions) if pd.notna(amount_billions) and isinstance(amount_billions, (int, float)) else 0,
                        'avg_per_company_billions': float(avg_per_company) if pd.notna(avg_per_company) and isinstance(avg_per_company, (int, float)) else 0
                    })
            except:
                continue
    
    # Create DataFrames
    left_df = pd.DataFrame(left_customers)
    right_df = pd.DataFrame(right_customers)
    
    # Display left section
    print('=== SECTION 1: Customer Categories (Left) ===')
    if not left_df.empty:
        print(f"\nTotal entries: {len(left_df)}")
        print(f"Total companies: {left_df['company_count'].sum()}")
        print(f"Total amount: {left_df['total_amount'].sum():,.0f} KRW")
        print(f"Total amount (billions): {left_df['total_amount'].sum()/1_000_000_000:.2f}B KRW")
        
        print("\nTop 10 categories by amount:")
        top_left = left_df.nlargest(10, 'total_amount')
        for idx, row in top_left.iterrows():
            print(f"  {row['category']}: {row['company_count']} companies, {row['total_amount']/1_000_000_000:.2f}B KRW")
    
    # Display right section
    print('\n=== SECTION 2: Customer Categories (Right) ===')
    if not right_df.empty:
        valid_right = right_df[right_df['amount_billions'] > 0]
        print(f"\nTotal entries: {len(valid_right)}")
        print(f"Total companies: {valid_right['company_count'].sum()}")
        print(f"Total amount: {valid_right['total_amount'].sum():,.0f} KRW")
        
        print("\nTop 10 categories by amount (billions):")
        top_right = valid_right.nlargest(10, 'amount_billions')
        for idx, row in top_right.iterrows():
            print(f"  {row['category']}: {row['company_count']} companies, {row['amount_billions']:.2f}B KRW, Avg: {row['avg_per_company_billions']:.2f}B")
    
    # Aggregate by category (combine both sections if they have the same categories)
    print('\n=== COMBINED CATEGORY ANALYSIS ===')
    
    # Map of potential category translations/mappings
    category_map = {
        'AX': 'AX',
        'CP': 'Content Provider',
        'IT': 'IT Services',
        'Telco': 'Telecommunications',
        '게임': 'Gaming',
        '금융': 'Finance',
        '물류': 'Logistics',
        '미디어': 'Media',
        '보안': 'Security',
        '부동산': 'Real Estate',
        '서비스': 'Services',
        '에너지': 'Energy',
        '유통': 'Distribution',
        '의료': 'Healthcare',
        '제조': 'Manufacturing',
        '기타': 'Other',
        '합계': 'Total'
    }
    
    # Create summary
    all_categories = {}
    
    for idx, row in left_df.iterrows():
        cat = row['category']
        if cat not in all_categories:
            all_categories[cat] = {'count': 0, 'amount': 0}
        all_categories[cat]['count'] += row['company_count']
        all_categories[cat]['amount'] += row['total_amount']
    
    # Sort by amount
    sorted_categories = sorted(all_categories.items(), key=lambda x: x[1]['amount'], reverse=True)
    
    print("\nAll Categories Summary:")
    total_count = 0
    total_amount = 0
    for cat, data in sorted_categories[:15]:  # Top 15
        eng_name = category_map.get(cat, cat)
        print(f"  {cat} ({eng_name}): {data['count']} companies, {data['amount']/1_000_000_000:.2f}B KRW")
        total_count += data['count']
        total_amount += data['amount']
    
    print(f"\nGrand Total: {total_count} companies, {total_amount/1_000_000_000:.2f}B KRW")
    
    # Save to JSON for web application use
    output_data = {
        'categories': [],
        'total': {
            'company_count': total_count,
            'total_amount': total_amount,
            'total_amount_billions': total_amount / 1_000_000_000
        }
    }
    
    for cat, data in sorted_categories:
        eng_name = category_map.get(cat, cat)
        output_data['categories'].append({
            'name_kr': cat,
            'name_en': eng_name,
            'company_count': data['count'],
            'total_amount': data['amount'],
            'total_amount_billions': data['amount'] / 1_000_000_000,
            'avg_per_company': data['amount'] / data['count'] if data['count'] > 0 else 0,
            'avg_per_company_billions': (data['amount'] / data['count'] / 1_000_000_000) if data['count'] > 0 else 0
        })
    
    # Save to JSON file
    with open('D:/Dev/epsilon-data-analyzer/data/gtm/gtm_active_customers.json', 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    
    print("\nData saved to: data/gtm/gtm_active_customers.json")
    
    return output_data

if __name__ == "__main__":
    data = analyze_gtm_data()