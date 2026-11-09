import json, collections, hashlib, os

CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.cache')
raw = [r for r in json.load(open(os.path.join(CACHE, 'raw.json'))) if r['sections']]
KEYS = ('Latin', 'Season', 'Season & Zone', 'Timing', 'Starting', 'Days to Maturity')
groups = collections.defaultdict(list)
for r in raw:
    groups[tuple(r['sections'].get(k, '') for k in KEYS)].append(r)
out = []
for key, members in groups.items():
    gid = hashlib.sha1('\x1f'.join(key).encode()).hexdigest()[:6]
    out.append({'id': gid, 'n': len(members), 'handles': [m['handle'] for m in members],
                'titles': [m['title'] for m in members][:6], 'productType': members[0]['productType'],
                'crops': members[0]['collections'], 'sections': {k: members[0]['sections'].get(k, '') for k in KEYS + ('Companion Planting', 'Seed Info', 'Growing', 'Difficulty', 'Exposure', 'Zone', 'Diseases & Pests', 'Harvest')}})
out.sort(key=lambda g: (-g['n'], g['id']))
json.dump(out, open(os.path.join(CACHE, 'groups.json'), 'w'), ensure_ascii=False, indent=1)
print(len(out), 'groups')
