import gzip, html, json, os, re
from extract import clean, sections

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, '.cache')
items = json.load(open(os.path.join(CACHE, 'catalog.json')))
TYPES = ('Vegetable Seeds', 'Herb Seeds', 'Flower Seeds', 'Microgreens', 'Cover Crops', 'Seed Garlic', 'Flower Bulbs', '')

def split_tags(tags):
    out = {'collections': [], 'filters': [], 'color': None, 'maturityDaysUnder': None, 'other': []}
    for tag in tags:
        low = tag.lower()
        if low.startswith('collection:'):
            out['collections'].append(tag.split(':', 1)[1].strip())
        elif low.startswith('filter:'):
            out['filters'].append(tag.split(':', 1)[1].strip())
        elif low.startswith('color:'):
            out['color'] = tag.split(':', 1)[1].strip()
        elif low.startswith('maturity_days_under:'):
            out['maturityDaysUnder'] = tag.split(':', 1)[1].strip()
        else:
            out['other'].append(tag)
    return out

def catalog_quick_facts(body_html):
    m = re.search(r'\[quickfacts action="start quickfacts"\](.*?)\[quickfacts action="end quickfacts"\]', body_html or '', re.S)
    if not m:
        return []
    return [clean(li) for li in re.findall(r'<li[^>]*>(.*?)</li>', m.group(1), re.S) if clean(li)]

raw = []
for item in items:
    if item['product_type'] not in TYPES:
        continue
    path = os.path.join(CACHE, "html", f"{item['handle']}.html.gz")
    page_sections, allabout = {}, None
    if os.path.exists(path):
        page = gzip.open(path, 'rt', encoding='utf8').read()
        page_sections = sections(page)
        m = re.search(r'All About ([^<]+)</h3>', page)
        allabout = html.unescape(m.group(1)).strip() if m else None
    tags = split_tags(item['tags'])
    raw.append({
        'handle': item['handle'],
        'url': f"https://www.westcoastseeds.com/products/{item['handle']}",
        'title': item['title'],
        'productType': item['product_type'],
        'quickFacts': catalog_quick_facts(item['body_html']),
        'packSizes': [v['title'] for v in item['variants']],
        'fetched': os.path.exists(path),
        'sections': page_sections,
        **tags,
    })
json.dump(raw, open(os.path.join(CACHE, 'raw.json'), 'w'), ensure_ascii=False, indent=0)
fetched = [r for r in raw if r['fetched']]
print(len(raw), 'products;', len(fetched), 'with pages;', sum(1 for r in fetched if r['sections']), 'with sections')
