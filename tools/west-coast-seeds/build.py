#!/usr/bin/env python3
"""Builds the West Coast Seeds default cultivar collection from the cached pages.

Reads .cache/raw.json and .cache/groups.json (see build_raw.py and mkgroups.py), the hand-curated crop
tables (curated_veg.py, curated_flowers.py), and writes one collection export plus a sidecar of the facts
the cultivar schema has no field for into packages/models/src/cultivars/defaults.

The growing text on a page is shared by every variety of a crop, so it becomes a crop cultivar, optional
subtypes group varieties, and each variety holds only what differs. Nothing here calls a model: the only
judgement is in the curated tables.
"""
import collections, datetime, json, os, re, sys, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, '.cache')
OUT = os.path.normpath(os.path.join(HERE, '..', '..', 'packages', 'models', 'src', 'cultivars', 'defaults'))
# Date the cached pages were fetched. Update when the cache is refreshed.
TODAY = '2026-10-20'
EXPORT_VERSION = 1
COLLECTION_NAME = 'West Coast Seeds'
COLLECTION_SLUG = 'west-coast-seeds'

# ---------------------------------------------------------------- loading
E, COMPANIONS, SKIP = {}, {}, set()
for module in ('curated_veg.py', 'curated_flowers.py'):
    namespace = {}
    exec(open(os.path.join(HERE, module)).read(), namespace)
    E.update(namespace['E'])
    COMPANIONS.update(namespace.get('COMPANIONS', {}))
    SKIP |= namespace.get('SKIP', set())
windows_namespace = {}
exec(open(os.path.join(HERE, 'curated_windows.py')).read(), windows_namespace)
WINDOWS = windows_namespace['W']

raw = json.load(open(os.path.join(CACHE, 'raw.json')))
groups = json.load(open(os.path.join(CACHE, 'groups.json')))
group_of = {handle: g['id'] for g in groups for handle in g['handles']}
group_by_id = {g['id']: g for g in groups}
by_handle = {r['handle']: r for r in raw}

GARDEN_TYPES = ('Vegetable Seeds', 'Herb Seeds', 'Flower Seeds', 'Cover Crops', 'Seed Garlic', 'Flower Bulbs')
NON_CROP_TAGS = {'All Seeds', 'Vegetable Seeds', 'Flower Seeds', 'Herb Seeds', 'Cover Crops Seeds', 'Microgreens Seeds', 'Wildflower Seeds', 'Fruit Seeds', 'Bird Seeds and Feeders', 'Seed Garlic', 'Sprouting'}


def is_crop_tag(tag):
    t = tag.strip()
    return t not in NON_CROP_TAGS and (t.endswith(('Seeds', 'Tomatoes', 'Peppers', 'Seed Blends')) or t in ('Eazyleaf lettuce', 'Celery and Celeriac'))


# Pages without growing sections are attached to the crop whose store collection they share.
own_tags = {}
for g in groups:
    counts = collections.Counter(t for h in g['handles'] for t in by_handle[h]['collections'] if is_crop_tag(t))
    own_tags[g['id']] = {t for t, n in counts.items() if n >= 0.7 * len(g['handles'])}
for r in raw:
    if r['sections'] or not r['fetched'] or r['productType'] not in GARDEN_TYPES:
        continue
    tags = [t for t in r['collections'] if is_crop_tag(t)]
    scored = sorted(((sum(1 for t in tags if t in own_tags[g['id']]), len(g['handles']), g['id']) for g in groups), reverse=True)
    if scored and scored[0][0] > 0 and scored[0][2] in E:
        group_of[r['handle']] = scored[0][2]
global_count = collections.Counter(t for r in raw for t in r['collections'] if is_crop_tag(t))

# ---------------------------------------------------------------- text helpers
def strip_accents(text):
    return ''.join(c for c in unicodedata.normalize('NFKD', text) if not unicodedata.combining(c))


def norm(name):
    """Mirrors normalizeCultivarName in packages/models/src/cultivars/names.ts."""
    t = strip_accents(name).lower().replace('’', '').replace("'", '')
    return re.sub(r'[\s_-]+', ' ', t).strip()


def sanitize(text, maxlen=40):
    """Reduces a title to what the cultivar name schema accepts."""
    t = unicodedata.normalize('NFC', text).replace('’', "'")
    t = re.sub(r'\(.*?\)', ' ', t)
    t = ''.join(c for c in t if unicodedata.category(c)[0] in 'LMN' or c in " '_-")
    t = re.sub(r'\s+', ' ', t).strip(" _-'")
    if len(t) > maxlen:
        t = t[:maxlen].rsplit(' ', 1)[0] if ' ' in t[:maxlen] else t[:maxlen]
    return t.strip(" _-'")


def abbreviation(name):
    words = [w for w in re.split(r'[\s_-]+', re.sub(r'\b(F[12]|Organic|Pelleted|Coated)\b', '', strip_accents(name))) if w]
    letters = ''.join(w[0] for w in words)[:3] if len(words) > 1 else (words[0] if words else name)[:2]
    letters = re.sub(r'[^0-9A-Za-z]', '', letters) or 'Xx'
    return letters[0].upper() + letters[1:].lower()


def strip_variant(title):
    t = title
    while True:
        n = re.sub(r'\s+(Organic|F1|F2|Pelleted|Coated|Certified)$', '', t, flags=re.I).strip()
        if n == t:
            return t
        t = n


def singular(word):
    if word.endswith('oes'):
        return word[:-2]
    if word.endswith('ies'):
        return word[:-3] + 'y'
    if word.endswith('s') and not word.endswith(('ss', 'us')):
        return word[:-1]
    return word


def tag_to_name(tag):
    words = re.sub(r'\s*(Seeds|Seed Blends)$', '', tag.strip()).split()
    words[-1] = singular(words[-1])
    return ' '.join(words)


def mid(v):
    return None if v is None else (sum(v) / 2 if isinstance(v, tuple) else v)


def rng(v, scale=1.0, digits=4):
    """A curated figure (a number or a (low, high) pair) as a range."""
    if v is None:
        return None
    low, high = (v if isinstance(v, tuple) else (v, v))
    return {'min': round(low * scale, digits), 'max': round(high * scale, digits)}


WORD_NUMBERS = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6}

# ---------------------------------------------------------------- facts read from page text
def parse_sun(text):
    t = re.sub(r'(some )?afternoon shade[^/\n.]*', '', text.lower())
    out = []
    for m in re.finditer(r'full[\s-]*sun|\bsun\b|part(?:ial|ly)?[\s-]*(?:shade|sun)|light shade|\bshade\b', t):
        word = m.group(0)
        value = 'PARTIAL_SHADE' if re.match(r'part|light', word) else ('SHADE' if word == 'shade' else 'FULL_SUN')
        if value not in out:
            out.append(value)
    if 'FULL_SUN' in out and 'SHADE' in out and 'PARTIAL_SHADE' not in out:
        out.insert(1, 'PARTIAL_SHADE')
    return out


def parse_germination(group):
    s = group['sections']
    text = ' '.join([s.get('Timing', ''), s.get('Starting', '')])
    result = {}
    m = re.search(r'(?:optimal|ideal)[^.:]*?(?:temperature|temp)[^.:\d]*[: ]\s*(\d+)(?:\s*[-–]\s*(\d+))?\s*°', text, re.I) or \
        re.search(r'soil temperature of (\d+)(?:\s*[-–]\s*(\d+))?\s*°?\s*C', text, re.I)
    if m:
        low = int(m.group(1)); high = int(m.group(2) or m.group(1))
        result['soilTemp'] = {'min': low, 'max': high}
    if re.search(r'(?:need|require)s? (?:some |bright )?light|light is required|require light', text, re.I):
        result['needsLight'] = True
    elif re.search(r'(?:total|complete) darkness|(?:need|require)s? darkness', text, re.I):
        result['needsLight'] = False
    m = re.search(r'refrigerat\w*[^.]{0,50}?(\d+|one|two|three|four)(?:\s*-\s*(\d+))?\s*weeks?', text, re.I)
    if m:
        low = WORD_NUMBERS.get(m.group(1).lower()) or int(m.group(1)); high = int(m.group(2) or low)
        result['stratificationDays'] = round((low + high) / 2 * 7)
    m = re.search(r'soak\w*[^.]{0,60}?(\d+)(?:\s*-\s*(\d+))?\s*hours?', text, re.I)
    if m:
        result['soakHours'] = round((int(m.group(1)) + int(m.group(2) or m.group(1))) / 2)
    elif re.search(r'soak\w*[^.]{0,30}overnight', text, re.I):
        result['soakHours'] = 12
    return result


def parse_min_night_temp(timing):
    m = re.search(r'night ?time[^.]{0,40}?(\d+)\s*°\s*C', timing, re.I)
    return int(m.group(1)) if m else None


def parse_seeds_per_hole(starting):
    m = re.search(r'(\d+)(?:\s*-\s*\d+)?\s+seeds\s+(?:in each|per pot|per cell|in each spot)', starting, re.I) or \
        re.search(r'(\d+)(?:\s*-\s*\d+)?\s+seeds\s+(?:in|per)\s+each', starting, re.I)
    return int(m.group(1)) if m else None


def tolerates_transplant_poorly(group):
    text = ' '.join([group['sections'].get('Timing', ''), group['sections'].get('Starting', '')])
    return bool(re.search(r"(?:do(?:es)?n['’]?t|not|poorly|dislikes?|difficult|resents?)[^.]{0,30}transplant|transplant[^.]{0,20}(?:poorly|not recommended)|root disturbance", text, re.I))


def preferred_origin(group, curated):
    if not curated.get('transplantable'):
        return 'DIRECT_SEED'
    if curated.get('basis') == 'transplant':
        return 'SEED_TO_TRANSPLANT'
    timing = group['sections'].get('Timing', '')
    direct = re.search(r'direct[\s-]*sow', timing, re.I)
    indoors = re.search(r'indoors?|start(?:ed)? (?:seeds )?inside', timing, re.I)
    if direct and (not indoors or direct.start() < indoors.start()):
        return 'DIRECT_SEED'
    return 'SEED_TO_TRANSPLANT' if indoors else 'DIRECT_SEED'


def page_facts(group):
    """Facts stated on the page, read with fixed patterns."""
    s = group['sections']
    facts = {}
    latin = s.get('Latin', '')
    fam = re.search(r'Family:\s*([A-Za-z]+)', latin) or re.search(r'([A-Z][a-z]+aceae)\s+family', latin)
    if fam:
        facts['family'] = fam.group(1)
    stated = ' '.join([s.get('Season & Zone', ''), s.get('Season', ''), latin]).lower()
    life = re.search(r'biennial|perennial|annual', stated)
    if life:
        facts['lifecycle'] = life.group(0).upper().replace('ANNUAL', 'ANNUAL')
    zone_text = ' '.join([s.get('Season & Zone', ''), s.get('Zone', '')])
    z = re.search(r'[Zz]one\s*:?\s*(?:[A-Za-z\s.]*?)(\d+)', zone_text)
    if z:
        facts['hardinessZone'] = int(z.group(1))
    exposure = re.search(r'Exposure:\s*([^\n]+)', ' '.join([s.get('Season & Zone', ''), s.get('Season', ''), s.get('Exposure', '')]))
    if exposure:
        facts['exposure'] = exposure.group(1).strip(' .')
    difficulty = s.get('Difficulty', '').strip(': ').lower()
    if difficulty:
        facts['difficulty'] = 'CHALLENGING' if difficulty.startswith(('challenging', 'difficult')) else 'MODERATE' if difficulty.startswith('moderate') else 'EASY' if difficulty.startswith('easy') else None
    ph = re.search(r'pH:?\s*(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)', s.get('Growing', ''))
    if ph:
        facts['ph'] = {'min': float(ph.group(1)), 'max': float(ph.group(2))}
    seed = s.get('Seed Info', '')
    m = re.search(r'(\d+)% of seeds', seed) or re.search(r'at least (\d+)%', seed, re.I)
    if m:
        facts['germinationPercent'] = int(m.group(1))
    m = re.search(r'seed life:\s*(\d+)', seed, re.I)
    if m:
        facts['seedLifeYears'] = int(m.group(1))
    m = re.search(r'row:\s*([\d,]+)\s*seeds', seed)
    if m:
        facts['seedsPerMeterRow'] = round(int(m.group(1).replace(',', '')) / 30.48, 1)
    comp = next((v for p, v in COMPANIONS.items() if s.get('Companion Planting', '').lstrip(': ').startswith(p)), None)
    if comp:
        facts['companions'] = comp
    return facts


# ---------------------------------------------------------------- variety facts from title, tags and quick facts
TRAIT_TAGS = {'Open pollinated': 'open-pollinated', 'Hybrid': 'hybrid', 'Heirloom': 'heirloom', 'Certified Organic': 'certified-organic', 'Certified-Organic': 'certified-organic',
              'Good for Containers': 'container-friendly', 'Good For Containers': 'container-friendly', 'Grows in containers': 'container-friendly', 'Attracts Pollinators': 'attracts-pollinators', 'Pollinator Friendly': 'attracts-pollinators',
              'Attracts Beneficial Insects': 'attracts-beneficial-insects', 'Deer-Resistant': 'deer-resistant', 'Cut-Flowers': 'cut-flower', 'Cut Flowers': 'cut-flower', 'Edible Flowers': 'edible-flower', 'Dried Flowers': 'dried-flower',
              'Xeriscaping': 'drought-tolerant', 'Super Food': 'superfood', 'Kid Friendly': 'kid-friendly', 'Good for Storage': 'stores-well', 'Nitrogen Fixer': 'nitrogen-fixer', 'Fragrant': 'fragrant',
              'AAS Winner': 'aas-winner', 'Winter Harvest': 'winter-harvest', 'Overwintering': 'overwintering', 'Heat Tolerant': 'heat-tolerant', 'Cold Tolerant': 'cold-tolerant',
              'Easy to Grow': 'easy-to-grow', 'Easy-to-Grow': 'easy-to-grow', 'Coated Seeds': 'coated-seed', 'Pelleted-Seeds': 'pelleted-seed', 'Blend': 'blend', 'Native': 'native', 'Bird Friendly': 'bird-friendly',
              'Grows In Part Shade': 'tolerates-part-shade', 'Greenhouse Performer': 'greenhouse', 'Greenhouse performer': 'greenhouse', 'Soil-Builder': 'soil-builder', 'Soil Builder': 'soil-builder', 'Loose-Leaf': 'loose-leaf',
              'Hot Peppers': 'hot', 'Sweet Peppers': 'sweet'}
COLOR_HEX = {'Red': '#E5484D', 'Pink': '#E93D82', 'Orange': '#F76B15', 'Yellow': '#FFC53D', 'White': '#F2F2F2', 'Blue': '#3E63DD', 'Purple': '#8E4EC6', 'Green': '#30A46C', 'Black': '#2B2B2B',
             'Brown': '#946A4B', 'Apricot': '#F9B572', 'Maroon': '#7B2D3B', 'Tan': '#D2B48C'}


def variety_tags(product):
    out = {TRAIT_TAGS[t] for t in product['filters'] + product['other'] if t in TRAIT_TAGS}
    if re.search(r'\bOrganic\b', product['title']):
        out.add('certified-organic')
    if re.search(r'\bF1\b', product['title']):
        out.add('hybrid')
    for fact in product['quickFacts']:
        if fact.lower().startswith(('open pollinated', 'open-pollinated')):
            out.add('open-pollinated')
    return sorted(out)


def variety_habit(product):
    habit = None
    for fact in product['quickFacts']:
        low = fact.lower()
        if 'indeterminate' in low:
            habit = 'INDETERMINATE'
        elif 'determinate' in low:
            habit = 'DETERMINATE'
        elif re.search(r'\bbush\b', low) and habit is None:
            habit = 'BUSH'
        elif re.search(r'\b(pole|climbing|vining)\b', low) and habit is None:
            habit = 'POLE'
    if habit is None:
        tagged = {t.lower() for t in product['filters']}
        habit = 'INDETERMINATE' if 'indeterminate' in tagged else 'DETERMINATE' if 'determinate' in tagged else None
    return habit


def variety_zone(product):
    for f in product['filters'] + product['quickFacts']:
        m = re.search(r'[Hh]ardy to [Zz]one (\d+)', f)
        if m:
            return int(m.group(1))
    return None


def variety_maturity(product):
    for fact in product['quickFacts']:
        m = re.search(r'(\d+)\s*(?:-|to)?\s*(\d+)?\s*days', fact, re.I)
        if m and re.search(r'matur|harvest|ready|days', fact, re.I):
            low = int(m.group(1)); high = int(m.group(2)) if m.group(2) else low
            if 5 <= low <= 400 and high >= low:
                return {'min': low, 'max': high}
    t = product.get('maturityDaysUnder')
    if t and re.fullmatch(r'\d{1,3}', t):
        return {'min': int(t), 'max': int(t)}
    return None


def variety_size(product):
    """Plant height ("Height to 4m", "grows 60-90cm tall") and spread. Sizes of fruit, roots and leaves are ignored."""
    out = {}
    for fact in product['quickFacts']:
        low = fact.lower()
        if re.search(r'fruit|root|leaves|leaf|pods?|heads?|bulb|blooms? ', low):
            continue
        kind = 'spread' if re.search(r'spread', low) else 'height' if re.search(r'height|\btall\b|\bhigh\b', low) else None
        if kind is None:
            continue
        m = re.search(r'(\d+(?:\.\d+)?)(?:\s*-\s*(\d+(?:\.\d+)?))?\s*(cm|m)\b', fact)
        if not m:
            continue
        scale = 0.01 if m.group(3) == 'cm' else 1.0
        first = float(m.group(1)) * scale
        second = float(m.group(2)) * scale if m.group(2) else None
        up_to = second is None and bool(re.search(r'\bto\s*$', fact[:m.start()].strip().lower() + ' '))
        value = {'max': round(first, 3)} if up_to else {'min': round(first, 3), 'max': round(second if second is not None else first, 3)}
        out.setdefault(kind, value)
    return out


def variety_resistances(product):
    out = []
    for fact in product['quickFacts']:
        m = re.search(r'(?:resistan(?:ce|t)|toleran(?:ce|t))\s+(?:to|of)\s+(.+)', fact, re.I)
        if not m:
            continue
        for part in re.split(r',|;|\band\b|&', m.group(1)):
            name = re.sub(r'\s+', ' ', part).strip(' .')
            if 2 <= len(name) <= 60 and name.lower() not in ('some', 'many', 'most'):
                out.append(name)
    return sorted(set(out))[:40]


# ---------------------------------------------------------------- attribute builders
def clean(value):
    """Drops empty values so only stated facts remain."""
    if isinstance(value, dict):
        cleaned = {k: clean(v) for k, v in value.items()}
        return {k: v for k, v in cleaned.items() if v not in (None, {}, [])}
    if isinstance(value, float) and value.is_integer():
        return int(value)
    return value


def seedling_age_from_germination(curated):
    """Packets give seedling age from sowing, but germToTransplant counts from germination, so the
    expected days to germinate are taken off. Left as stated where germination time is unknown."""
    age = curated.get('transplantAge')
    germ = curated.get('germ')
    if age is None or germ is None:
        return age
    germ_days = sum(germ) / 2 if isinstance(germ, tuple) else germ
    low, high = (age if isinstance(age, tuple) else (age, age))
    return (max(low - germ_days, 0), max(high - germ_days, 0))


def crop_attributes(curated, group, facts, override=None):
    c = {**curated, **(override or {})}
    attrs = {}
    life = {'sowToGerm': rng(c.get('germ'), digits=1), 'germToTransplant': rng(seedling_age_from_germination(c), digits=1)}
    basis = {'sowing': 'SOWING', 'transplant': 'TRANSPLANT', 'germination': 'GERMINATION'}.get(c.get('basis'))
    if basis:
        life['maturityBasis'] = basis
    attrs['annualLifeCycle'] = life

    transplantable = bool(c.get('transplantable'))
    preferred = preferred_origin(group, c) if group else ('SEED_TO_TRANSPLANT' if transplantable else 'DIRECT_SEED')
    origin = {'preferred': preferred, 'allowed': sorted(['DIRECT_SEED', 'SEED_TO_TRANSPLANT', 'SEEDLING_TO_TRANSPLANT'] if transplantable else ['DIRECT_SEED'])}
    if group and tolerates_transplant_poorly(group):
        origin['transplantTolerance'] = 'POOR'
    if group:
        origin['minNightTempToTransplant'] = parse_min_night_temp(group['sections'].get('Timing', ''))
    attrs['origin'] = origin

    sun = parse_sun(facts['exposure']) if facts.get('exposure') else []
    if not sun and c.get('sun'):
        sun = [c['sun']]
    sowing = {'sunExposure': sun, 'plantingDepth': rng(c.get('depth'), 0.01), 'inRowSpacing': rng(c.get('inrow'), 0.01), 'rowSpacing': rng(c.get('rows'), 0.01)}
    if group:
        sowing['seedsPerHole'] = parse_seeds_per_hole(group['sections'].get('Starting', ''))
    if c.get('successionWeeks') is not None:
        sowing['successionIntervalDays'] = round(mid(c['successionWeeks']) * 7)
    attrs['sowing'] = sowing
    if c.get('inrow') is not None:
        attrs['interplanting'] = {'minimumDistance': round(mid(c['inrow']) / 100, 4)}

    windows = {}
    for method, frosts in WINDOWS.get(c.get('crop'), {}).items():
        windows[method] = {frost: {'open': opened, 'close': closed} for frost, (opened, closed) in frosts.items()}
    attrs['sowingWindows'] = windows

    attrs['germination'] = parse_germination(group) if group else {}
    attrs['soil'] = {'ph': facts.get('ph')}
    attrs['seed'] = {k: facts.get(k) for k in ('germinationPercent', 'seedLifeYears', 'seedsPerMeterRow')}
    habit = {'Bush Bean': 'BUSH', 'Pole Bean': 'POLE', 'Runner Bean': 'POLE'}.get(c.get('crop'))
    attrs['classification'] = {'family': facts.get('family'), 'lifecycle': facts.get('lifecycle'), 'seasonType': (c.get('season') or '').upper() or None,
                               'hardinessZone': facts.get('hardinessZone'), 'difficulty': facts.get('difficulty'), 'habit': habit}
    if facts.get('companions'):
        attrs['companions'] = {'beneficial': facts['companions'][0], 'avoid': facts['companions'][1]}
    return clean(attrs)


def variety_attributes(product, curated):
    attrs = {}
    maturity = variety_maturity(product)
    if maturity:
        attrs['annualLifeCycle'] = {'maturityDays': maturity}
    color = COLOR_HEX.get((product.get('color') or '').strip().title())
    if color:
        attrs['color'] = {'baseColor': color}
    classification = {'habit': variety_habit(product), 'hardinessZone': variety_zone(product)}
    if 'Perennial' in product['filters'] + product['other']:
        classification['lifecycle'] = 'PERENNIAL'
    attrs['classification'] = classification
    attrs['size'] = variety_size(product)
    attrs['resistance'] = {'resistances': variety_resistances(product)}
    attrs['webResources'] = {'sourceUrl': product['url'], 'retrievedAt': TODAY}
    return clean(attrs)


# ---------------------------------------------------------------- collection assembly
CATEGORY_WORD = {'VEGETABLE': 'Vegetable', 'HERB': 'Herb', 'FLOWER': 'Flower', 'COVER_CROP': 'Cover Crop', 'FRUIT': 'Fruit', 'OTHER': 'Other'}
CATEGORY_OVERRIDE = {'Strawberry': 'FRUIT', 'Goji Berry': 'FRUIT'}
UMBRELLA = {'Bush Bean': 'Bean', 'Pole Bean': 'Bean', 'Runner Bean': 'Bean', 'Drying Bean': 'Bean', 'Broad Bean': 'Bean', 'Soya Bean': 'Bean', 'Zucchini': 'Squash', 'Pumpkin': 'Squash'}
# Common names a crop is also known by. These are general knowledge, not read from the site.
CROP_ALIASES = {
    'Zucchini': ['Courgette'], 'Bush Bean': ['Green Bean', 'Snap Bean', 'French Bean'], 'Pole Bean': ['Climbing Bean'],
    'Runner Bean': ['Scarlet Runner'], 'Soya Bean': ['Soybean', 'Edamame'], 'Broad Bean': ['Fava', 'Faba Bean'],
    'Cilantro': ['Coriander'], 'Arugula': ['Rocket'], 'Eggplant': ['Aubergine'], 'Swiss Chard': ['Chard', 'Silverbeet'],
    'Rutabaga': ['Swede'], 'Corn': ['Sweetcorn', 'Maize'], 'Pac Choi': ['Bok Choy', 'Pak Choi'], 'Beet': ['Beetroot'],
    'Tomatillo': ['Husk Tomato'], 'Brussels Sprouts': ['Brussels Sprout'], 'Lettuce': [], 'Pea': ['Garden Pea'],
    'Mustard Greens': ['Mustard'], 'Okra': ['Lady Finger'], 'Kohlrabi': ['German Turnip'], 'Endive': ['Chicory Endive'],
    'Chives': ['Chive'], 'Lemon Balm': ['Melissa'], 'Liquorice': ['Licorice'], 'Stinging Nettle': ['Nettle'],
    'Marjoram': ['Sweet Marjoram'], 'Gai Lan': ['Chinese Broccoli'], 'Corn Salad': ['Mache', 'Lambs Lettuce'],
    'Catmint': ['Nepeta'], 'Evening Primrose': ['Oenothera'], 'Soapwort': ['Saponaria'], 'Gypsophila': ['Babys Breath'],
}
BULB_FIX = {'Hyancith': 'Hyacinth', 'Eremus': 'Eremurus', 'Snowdrops': 'Snowdrop'}


def category_of(product):
    gid = group_of.get(product['handle'])
    c = E.get(gid) if gid else None
    kind = product['productType']
    if kind == 'Flower Bulbs':
        return 'FLOWER'
    if (c and c.get('cover')) or kind == 'Cover Crops' or 'Cover Crops Seeds' in product['collections']:
        return 'COVER_CROP'
    if kind == 'Herb Seeds':
        return 'HERB'
    if kind == 'Flower Seeds' or (kind == '' and c):
        return 'FLOWER'
    if kind in ('Vegetable Seeds', 'Seed Garlic') or (kind == 'Microgreens' and c):
        return 'VEGETABLE'
    return None


def build():
    cultivars, alternate_urls = [], {}
    claimed = {}

    def claim(name, aliases=()):
        key = norm(name)
        if key in claimed:
            return False
        claimed[key] = name
        for alias in aliases:
            claimed.setdefault(norm(alias), name)
        return True

    skipped = collections.Counter()
    buckets = collections.defaultdict(list)
    # A crop has one category, taken from the pages that carry its growing text.
    group_category = {}
    for g in groups:
        votes = collections.Counter(category_of(by_handle[h]) for h in g['handles'])
        votes.pop(None, None)
        if votes:
            group_category[g['id']] = votes.most_common(1)[0][0]
    for r in raw:
        if not r['fetched'] or r['productType'] == 'Flower Bulbs':
            continue
        gid = group_of.get(r['handle'])
        if gid in SKIP:
            skipped['skipped group'] += 1; continue
        if not r['sections'] and gid is None and r['productType'] not in ('Vegetable Seeds', 'Herb Seeds', 'Flower Seeds'):
            skipped['not a plant'] += 1; continue
        if r['sections'] and gid not in E:
            skipped['uncurated'] += 1; continue
        category = group_category.get(gid) or category_of(r)
        if category is None:
            skipped['no category'] += 1; continue
        buckets[category].append(r)

    nodes = {}
    for category in ('VEGETABLE', 'HERB', 'FLOWER', 'COVER_CROP'):
        products = buckets.get(category, [])
        by_group = collections.defaultdict(list)
        for p in products:
            by_group[group_of.get(p['handle'])].append(p)
        crop_gid = {E[g]['crop']: g for g in by_group if g is not None}
        group_names = {}

        def ensure_crop(gid):
            curated = E[gid]
            key = (category, curated['crop'])
            if key in nodes:
                return nodes[key]
            group = group_by_id[gid]
            facts = page_facts(group)
            parent_name = None
            umbrella = UMBRELLA.get(curated['crop'])
            if umbrella:
                if (category, umbrella) not in nodes and umbrella in crop_gid:
                    ensure_crop(crop_gid[umbrella])
                if (category, umbrella) not in nodes and claim(umbrella):
                    node = {'name': umbrella, 'names': [], 'category': category, 'tags': [], 'abbreviation': abbreviation(umbrella), 'description': '', 'attributes': {}}
                    nodes[(category, umbrella)] = node
                    cultivars.append(node)
                if (category, umbrella) in nodes:
                    parent_name = nodes[(category, umbrella)]['name']
            name = curated['crop']
            if not claim(name):
                name = f'Ornamental {name}' if category == 'FLOWER' else f'{name} {CATEGORY_WORD[category]}'
                if not claim(name):
                    name = f'{name} 2'; claim(name)
            sole = by_group[gid][0] if len(by_group[gid]) == 1 else None
            merged = sole is not None and norm(sanitize(sole['title'])) in (norm(curated['crop']), norm(curated['crop']) + 's')
            node = {'name': name, 'names': [], 'category': CATEGORY_OVERRIDE.get(curated['crop'], category), 'tags': [], 'abbreviation': curated['abbr'],
                    'description': '', 'attributes': crop_attributes(curated, group, facts)}
            if curated.get('sci'):
                node['scientificName'] = curated['sci']
            if parent_name:
                node['parentName'] = parent_name
            node['_merged'] = merged
            node['names'] = [a for a in CROP_ALIASES.get(curated['crop'], []) if claim(a)]
            nodes[key] = node
            cultivars.append(node)
            return node

        for gid, group_products in sorted(((g, v) for g, v in by_group.items() if g is not None), key=lambda kv: E[kv[0]]['crop']):
            curated = E[gid]
            crop_node = ensure_crop(gid)
            counts = collections.Counter(t for p in group_products for t in p['collections'] if is_crop_tag(t))
            own = {t for t, n in counts.items() if n >= 0.7 * len(group_products)}
            subtype_nodes = {}
            for p in sorted(group_products, key=lambda r: r['title'].lower()):
                title_name = sanitize(re.sub(r'\bSeed Tape\b|\(.*?\)|\b\d+\s*/?\s*pk\b', ' ', p['title'], flags=re.I))
                if len(title_name) < 3:
                    title_name = sanitize(p['title'] + ' ' + curated['crop'])
                if norm(title_name) in group_names.get(gid, {}):
                    alternate_urls.setdefault(group_names[gid][norm(title_name)], []).append(p['url'])
                    continue
                candidates = [t for t in p['collections'] if is_crop_tag(t) and t not in own]
                override_tags = [t for t in candidates if t in curated.get('overrides', {})]
                chosen = override_tags[0] if override_tags else None
                if chosen is None and candidates:
                    best = min(candidates, key=lambda t: global_count[t])
                    if counts[best] >= 3:
                        chosen = best
                sname = tag_to_name(chosen) if chosen else None
                if chosen and (norm(sname) == norm(crop_node['name']) or norm(sname) == norm(title_name)):
                    chosen = None
                parent = crop_node
                if chosen and not crop_node['_merged']:
                    if chosen not in subtype_nodes and claim(sname):
                        override = curated.get('overrides', {}).get(chosen)
                        base = crop_attributes(curated, group_by_id[gid], page_facts(group_by_id[gid]))
                        full = crop_attributes(curated, group_by_id[gid], page_facts(group_by_id[gid]), override) if override else base
                        diff = {k: v for k, v in full.items() if base.get(k) != v}
                        node = {'name': sname, 'names': [], 'tags': [], 'abbreviation': abbreviation(sname), 'description': '', 'attributes': diff, 'parentName': crop_node['name']}
                        subtype_nodes[chosen] = node
                        cultivars.append(node)
                    if chosen in subtype_nodes:
                        parent = subtype_nodes[chosen]

                name = title_name
                if not claim(name):
                    name = sanitize(f'{title_name} {curated["crop"]}')
                    if not claim(name):
                        name = sanitize(f'{title_name} {curated["crop"]} 2'); claim(name)
                alias = sanitize(strip_variant(p['title']))
                aliases = [alias] if alias and norm(alias) != norm(name) and len(alias) >= 3 and claim(alias) else []
                tags = variety_tags(p)
                attrs = variety_attributes(p, curated)
                bits = [t.replace('-', ' ') for t in tags if t in ('open-pollinated', 'hybrid', 'heirloom', 'certified-organic', 'determinate', 'indeterminate')]
                description = (', '.join(bits).capitalize() + '.') if bits else ''
                group_names.setdefault(gid, {})[norm(title_name)] = name
                if crop_node['_merged']:
                    for k, v in attrs.items():
                        crop_node['attributes'][k] = {**crop_node['attributes'].get(k, {}), **v}
                    crop_node['tags'] = sorted(set(crop_node['tags']) | set(tags))
                    crop_node['names'] = sorted(set(crop_node['names']) | set(aliases))
                    if description:
                        crop_node['description'] = description
                    key_name = crop_node['name']
                else:
                    cultivars.append({'name': name, 'names': aliases, 'tags': tags, 'abbreviation': abbreviation(strip_variant(p['title'])), 'description': description, 'attributes': attrs, 'parentName': parent['name']})
                    key_name = name
                group_names[gid][norm(title_name)] = key_name

        for p in sorted(by_group.get(None, []), key=lambda r: r['title'].lower()):
            name = sanitize(re.sub(r'\bSeed Tape\b|\(.*?\)', ' ', p['title']))
            if len(name) < 3 or not claim(name):
                continue
            tags = variety_tags(p)
            attrs = clean({'color': {'baseColor': COLOR_HEX.get((p.get('color') or '').strip().title())}, 'webResources': {'sourceUrl': p['url'], 'retrievedAt': TODAY}})
            bits = [t.replace('-', ' ') for t in tags if t in ('open-pollinated', 'hybrid', 'heirloom', 'certified-organic')]
            cultivars.append({'name': name, 'names': [], 'category': category, 'tags': tags, 'abbreviation': abbreviation(strip_variant(p['title'])), 'description': (', '.join(bits).capitalize() + '.') if bits else '', 'attributes': attrs})

    # Flower bulbs: one parent for planting depth, then a cultivar per genus.
    bulbs = [r for r in raw if r['fetched'] and r['productType'] == 'Flower Bulbs']
    bulb_group = next((v for v in E.values() if v.get('bulbs')), None)
    if bulbs and bulb_group and claim('Flower Bulb'):
        root = {'name': 'Flower Bulb', 'names': [], 'category': 'FLOWER', 'tags': [], 'abbreviation': 'Fl', 'description': '',
                'attributes': clean({'origin': {'preferred': 'DIRECT_SEED', 'allowed': ['DIRECT_SEED']}, 'sowing': {'plantingDepth': rng(bulb_group.get('depth'), 0.01)}})}
        cultivars.append(root)
        genus_nodes = {}
        for p in sorted(bulbs, key=lambda r: r['title']):
            words = re.sub(r'\s*\b\d+\s*/?\s*pk\b', '', p['title'], flags=re.I).strip().split()
            genus = BULB_FIX.get(words[0], words[0])
            rest = ' '.join(words[1:])
            if genus not in genus_nodes and claim(genus):
                genus_nodes[genus] = {'name': genus, 'names': [], 'tags': [], 'abbreviation': abbreviation(genus), 'description': '', 'attributes': {}, 'parentName': 'Flower Bulb'}
                cultivars.append(genus_nodes[genus])
            name = sanitize(f'{genus} {rest}'.strip())
            if not claim(name):
                continue
            alias = sanitize(rest)
            aliases = [alias] if len(alias) >= 3 and norm(alias) != norm(name) and claim(alias) else []
            attrs = variety_attributes(p, {})
            cultivars.append({'name': name, 'names': aliases, 'tags': variety_tags(p), 'abbreviation': abbreviation(rest or genus), 'description': '', 'attributes': attrs, 'parentName': genus if genus in genus_nodes else 'Flower Bulb'})

    out = []
    for cu in cultivars:
        d = {k: v for k, v in cu.items() if not k.startswith('_')}
        d['names'] = sorted(set(d.get('names', [])))
        d['tags'] = sorted(set(d.get('tags', [])))
        if d.get('category') is None:
            d.pop('category', None)
        if d['name'] in alternate_urls:
            d['attributes'].setdefault('webResources', {})['referenceUrls'] = sorted(set(alternate_urls[d['name']]))
        out.append(d)
    collection = {
        'name': COLLECTION_NAME, 'visibility': 'PUBLIC',
        'description': f'Seed packet growing details compiled from westcoastseeds.com (retrieved {TODAY}). Facts only: names, timings, depths and spacings.',
        'tags': ['West Coast Seeds'],
    }
    return {'version': EXPORT_VERSION, 'collection': collection, 'cultivars': out}, skipped


if __name__ == '__main__':
    data, skipped = build()
    out_dir = sys.argv[1] if len(sys.argv) > 1 else OUT
    os.makedirs(out_dir, exist_ok=True)
    json.dump(data, open(os.path.join(out_dir, f'{COLLECTION_SLUG}.json'), 'w'), indent=2, ensure_ascii=False)
    print(len(data['cultivars']), 'cultivars; skipped:', dict(skipped))
