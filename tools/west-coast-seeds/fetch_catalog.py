#!/usr/bin/env python3
"""Downloads West Coast Seeds' public product list (Shopify products.json) into .cache/catalog.json.
About seven requests, three seconds apart."""
import json, os, subprocess, time

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, '.cache')
USER_AGENT = 'verdagraph-research-agent/0.1 (automated; read-only; catalog research for an open-source garden planner)'

os.makedirs(CACHE, exist_ok=True)
products = []
page = 1
while True:
    out = subprocess.run(
        ['curl', '-sS', '-m', '60', '--compressed', '-A', USER_AGENT,
         f'https://www.westcoastseeds.com/products.json?limit=250&page={page}'],
        capture_output=True, check=True)
    batch = json.loads(out.stdout)['products']
    if not batch:
        break
    products += batch
    print(f'page {page}: {len(batch)} products', flush=True)
    page += 1
    time.sleep(3)
json.dump(products, open(os.path.join(CACHE, 'catalog.json'), 'w'))
print(len(products), 'products')
