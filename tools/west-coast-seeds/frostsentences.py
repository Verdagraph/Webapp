import json, re, sys
exec(open('curated_veg.py').read()); v = dict(E)
exec(open('curated_flowers.py').read()); v.update(E); E = v
groups = {g['id']: g for g in json.load(open('.cache/groups.json'))}
lo, hi = int(sys.argv[1]), int(sys.argv[2])
items = sorted(E.items(), key=lambda kv: kv[1]['crop'])
for gid, c in items[lo:hi]:
    g = groups.get(gid)
    if not g: continue
    text = ' '.join([g['sections'].get('Timing', ''), g['sections'].get('Starting', '')]).replace('\n', ' ')
    sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z0-9])', text)
    keep = [s for s in sentences if re.search(r'frost|solstice|before planting out|weeks? (?:before|after)|transplant|direct|indoors|outdoors|spring|summer|autumn|fall|winter|march|april|may|june|july|august|september|october|february|january', s, re.I)]
    print(f"## {gid} {c['crop']} | curated windows: frost={c.get('frost')} indoor={c.get('indoorWeeksBeforeLastFrost')} out={c.get('indoorWeeksBeforePlantingOut')}")
    for s in keep[:6]:
        print('   -', s[:260])
