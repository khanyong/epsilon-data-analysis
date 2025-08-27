# -*- coding: utf-8 -*-
import os
import sys
from supabase import create_client
from dotenv import load_dotenv

# UTF-8 encoding
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

load_dotenv()

url = os.environ.get("VITE_SUPABASE_URL")
service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not service_key:
    print("Missing Supabase credentials")
    exit(1)

try:
    supabase = create_client(url, service_key)
    
    # Try different possible KOTRA table names
    tables_to_check = [
        'kotra_companies',
        'kotra_data', 
        'kotra',
        'overseas_companies',
        'global_companies',
        'export_companies'
    ]
    
    print("Checking for KOTRA-related tables...")
    print("=" * 60)
    
    found_table = None
    for table_name in tables_to_check:
        try:
            result = supabase.table(table_name).select('*').limit(1).execute()
            if result.data is not None:
                print(f"✅ Found table: {table_name}")
                print(f"   Fields: {list(result.data[0].keys()) if result.data else 'Empty table'}")
                found_table = table_name
                break
        except Exception as e:
            if "42P01" not in str(e):  # Not a "table doesn't exist" error
                print(f"❌ Error checking {table_name}: {e}")
    
    if not found_table:
        # List all tables to find the right one
        print("\nListing all available tables...")
        query = """
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        ORDER BY table_name;
        """
        
        # Use RPC or raw query if available
        print("\nTrying to fetch all tables from database...")
        # Since we can't run raw SQL directly, let's try known tables
        known_tables = ['gtm_customers', 'gtm_sales_master', 'gtm_sales_revenues']
        print("\nKnown tables:")
        for table in known_tables:
            print(f"  - {table}")
        
        print("\n⚠️ KOTRA table not found. It may need to be created or imported.")
        print("\nTo create a KOTRA companies table, run this SQL in Supabase Studio:")
        print("-" * 60)
        print("""
CREATE TABLE IF NOT EXISTS kotra_companies (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    region VARCHAR(100),
    industry_category VARCHAR(100),
    business_type VARCHAR(50),
    annual_revenue DECIMAL(15, 2),
    employee_count INTEGER,
    export_countries TEXT[],
    main_products TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    website VARCHAR(255),
    potential_score INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
        """)
        
except Exception as e:
    print(f"Error: {e}")