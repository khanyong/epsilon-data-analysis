#!/usr/bin/env python3
"""Query London PoPs from Supabase epsilon_pops table"""

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
    
    # Group by location
    locations = {}
    for pop in london_pops:
        location = pop.get('location', 'Unknown')
        if location not in locations:
            locations[location] = []
        locations[location].append(pop)
    
    print("London PoP Locations:")
    print("-" * 80)
    
    for location, pops in sorted(locations.items()):
        print(f"\n{location}: {len(pops)} PoPs")
        for pop in pops:
            print(f"  - {pop.get('pop_name', 'N/A')} ({pop.get('service_type', 'N/A')})")
            if pop.get('address'):
                print(f"    Address: {pop.get('address')}")
    
    # Summary by service type
    print("\n" + "="*80 + "\n")
    print("Summary by Service Type:")
    print("-" * 80)
    
    service_types = {}
    for pop in london_pops:
        service_type = pop.get('service_type', 'Unknown')
        if service_type not in service_types:
            service_types[service_type] = 0
        service_types[service_type] += 1
    
    for service_type, count in sorted(service_types.items()):
        print(f"{service_type}: {count}")
        
except Exception as e:
    print(f"Error querying Supabase: {e}")