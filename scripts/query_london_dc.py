#!/usr/bin/env python3
"""Query London PoPs from Supabase epsilon_pops table - DC analysis"""

import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

# Initialize Supabase client
url: str = os.environ.get("VITE_SUPABASE_URL", "")
key: str = os.environ.get("VITE_SUPABASE_ANON_KEY", "")

if not url or not key:
    print("Error: Supabase credentials not found in environment variables")
    exit(1)

supabase: Client = create_client(url, key)

try:
    # Query all PoPs
    all_pops = supabase.table('epsilon_pops').select("*").execute()
    
    # Filter London PoPs
    london_pops = [pop for pop in all_pops.data if 'London' in pop.get('city', '')]
    
    print(f"Total PoPs: {len(all_pops.data)}")
    print(f"London PoPs: {len(london_pops)}")
    print("\n" + "="*80 + "\n")
    
    # Group by DC
    dc_groups = {}
    for pop in london_pops:
        dc = pop.get('dc', 'Unknown DC')
        if dc not in dc_groups:
            dc_groups[dc] = []
        dc_groups[dc].append(pop)
    
    print("London PoPs by Data Center:")
    print("-" * 80)
    
    for dc, pops in sorted(dc_groups.items()):
        print(f"\n{dc}: {len(pops)} PoPs")
        for pop in pops:
            print(f"  - {pop.get('address', 'N/A')}")
    
    # Analyze geographical distribution
    print("\n" + "="*80 + "\n")
    print("Geographical Distribution (by postal code):")
    print("-" * 80)
    
    postal_groups = {}
    for pop in london_pops:
        address = pop.get('address', '')
        # Extract postal code patterns (E14, EC1V, EC2A, etc.)
        import re
        postal_match = re.search(r'\b([A-Z]{1,2}\d{1,2}[A-Z]?)\s*\d[A-Z]{2}\b', address)
        if postal_match:
            postal_area = postal_match.group(1)
            if postal_area not in postal_groups:
                postal_groups[postal_area] = []
            postal_groups[postal_area].append(pop)
    
    for postal, pops in sorted(postal_groups.items()):
        print(f"\n{postal} area: {len(pops)} PoPs")
        for pop in pops:
            print(f"  - {pop.get('dc', 'N/A')} | {pop.get('address', 'N/A')}")
        
except Exception as e:
    print(f"Error querying Supabase: {e}")