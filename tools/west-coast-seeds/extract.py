import gzip, html, json, re, sys

def clean(fragment: str) -> str:
    text = re.sub(r'<br\s*/?>', '\n', fragment)
    text = re.sub(r'</(p|li|div|tr|h\d)>', '\n', text)
    text = re.sub(r'<[^>]+>', '', text)
    text = html.unescape(text).replace('\xa0', ' ')
    text = re.sub(r'[ \t]+', ' ', text)
    return re.sub(r'\n\s*\n+', '\n', text).strip()

def sections(page: str) -> dict:
    """The labelled accordion panels of the All About block."""
    result = {}
    for block in re.split(r'<div class=accordion-container-htg>', page)[1:]:
        label = re.search(r'<div class="accordion">(.*?)</div>', block, re.S)
        panel = re.search(r'<div class="content-wrap">(.*?)</div>\s*</div>', block, re.S)
        if not label or not panel:
            continue
        name = clean(label.group(1))
        body = clean(panel.group(1))
        # The panel repeats its label as the first line.
        if body.lower().startswith(name.lower()):
            body = body[len(name):].strip()
        result[name] = body
    return result

def quick_facts(page: str) -> list:
    m = re.search(r'Quick Facts:?(.*?)(?:NOTIFY ME|<form|add-to-cart)', page, re.S | re.I)
    if not m:
        return []
    return [line for line in clean(m.group(1)).split('\n') if line.strip()][:12]

def parse(page: str) -> dict:
    title = re.search(r'<h1[^>]*>(.*?)</h1>', page, re.S)
    heading = re.search(r'All About ([^<]+)</h3>', page)
    return {
        'title': clean(title.group(1)) if title else None,
        'allAbout': html.unescape(heading.group(1)).strip() if heading else None,
        'quickFacts': quick_facts(page),
        'sections': sections(page),
    }

if __name__ == '__main__':
    for path in sys.argv[1:]:
        opener = gzip.open if path.endswith('.gz') else open
        page = opener(path, 'rt', encoding='utf8').read()
        print(path); print(json.dumps(parse(page), indent=1, ensure_ascii=False)[:3000]); print('------')
