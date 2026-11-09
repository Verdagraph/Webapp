#!/usr/bin/env python3
"""Downloads the product pages of seed and plant products into .cache/html, skipping pages already
downloaded, so an interrupted run resumes. One request every two seconds, compressed, and it backs off
on 429 or 5xx responses (honouring Retry-After) and stops after five failures in a row."""
import gzip, json, os, subprocess, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, '.cache')
USER_AGENT = 'verdagraph-research-agent/0.1 (automated; read-only; catalog research for an open-source garden planner)'
ORDER = ['Vegetable Seeds', 'Herb Seeds', 'Flower Seeds', 'Microgreens', 'Cover Crops', 'Seed Garlic', 'Flower Bulbs', '']

os.makedirs(os.path.join(CACHE, 'html'), exist_ok=True)
items = json.load(open(os.path.join(CACHE, 'catalog.json')))
wanted = [i for t in ORDER for i in items if i['product_type'] == t]
print(len(wanted), 'pages to consider', flush=True)

delay, failures = 2.0, 0
for n, item in enumerate(wanted):
    path = os.path.join(CACHE, 'html', f"{item['handle']}.html.gz")
    if os.path.exists(path) or os.path.exists(path + '.status'):
        continue
    url = f"https://www.westcoastseeds.com/products/{item['handle']}"
    out = subprocess.run(['curl', '-sS', '-m', '60', '--compressed', '-A', USER_AGENT, '-D', '-', '-o', '-', url], capture_output=True)
    head, _, body = out.stdout.partition(b'\r\n\r\n')
    status_line = head.split(b'\r\n')[0].decode(errors='replace')
    code = int(status_line.split()[1]) if len(status_line.split()) > 1 else 0
    if code == 429 or code >= 500:
        retry = 60
        for line in head.split(b'\r\n'):
            if line.lower().startswith(b'retry-after:'):
                retry = int(line.split(b':')[1].strip() or 60)
        failures += 1
        print(f'{code} on {item["handle"]}; backing off {retry}s (failures={failures})', flush=True)
        if failures >= 5:
            print('too many failures, stopping', flush=True)
            sys.exit(1)
        time.sleep(retry)
        delay = min(delay * 2, 30)
        continue
    failures = 0
    if code == 200:
        with gzip.open(path, 'wb') as f:
            f.write(body)
    else:
        with open(path + '.status', 'w') as f:
            f.write(str(code))
    if n % 25 == 0:
        print(f'{n}/{len(wanted)} last={item["handle"]} code={code}', flush=True)
    time.sleep(delay)
print('done', flush=True)
