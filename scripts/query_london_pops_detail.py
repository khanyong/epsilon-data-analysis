#!/usr/bin/env python3
"""Query London PoPs from Supabase epsilon_pops table - detailed view"""

import os
import json
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
    
    # Print first London PoP to see structure
    if london_pops:
        print("Sample London PoP structure:")
        print(json.dumps(london_pops[0], indent=2, default=str))
        print("\n" + "="*80 + "\n")
    
    # List all London PoPs with all available fields
    print("All London PoPs:")
    print("-" * 80)
    
    for i, pop in enumerate(london_pops, 1):
        print(f"\n{i}. Location {pop.get('id', 'N/A')}:")
        print(f"   Address: {pop.get('address', 'N/A')}")
        print(f"   City: {pop.get('city', 'N/A')}")
        print(f"   Country: {pop.get('country', 'N/A')}")
        print(f"   Region: {pop.get('region', 'N/A')}")
        print(f"   Data Center: {pop.get('datacenter', 'N/A')}")
        print(f"   Provider: {pop.get('provider', 'N/A')}")
        print(f"   Status: {pop.get('status', 'N/A')}")
    
    # Get unique addresses
    print("\n" + "="*80 + "\n")
    print("Unique London Locations:")
    print("-" * 80)
    
    unique_addresses = {}
    for pop in london_pops:
        address = pop.get('address', 'Unknown')
        if address not in unique_addresses:
            unique_addresses[address] = 0
        unique_addresses[address] += 1
    
    for address, count in sorted(unique_addresses.items()):
        print(f"{address}")
        if count > 1:
            print(f"  (Multiple PoPs: {count})")
        
except Exception as e:
    print(f"Error querying Supabase: {e}")