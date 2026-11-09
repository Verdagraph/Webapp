# West Coast Seeds import

Builds the default cultivar collection in `packages/models/src/cultivars/defaults` from westcoastseeds.com.

Python 3 standard library and `curl` only. Nothing here calls a language model: the one piece of judgement is the hand-curated table of crops (`curated_veg.py`, `curated_flowers.py`).

## Run

From this folder, with `packages/models` built (`pnpm --filter @vdg-webapp/models build`):

```sh
python3 fetch_catalog.py   # the public product list, about seven requests
python3 crawl.py           # product pages, one request every two seconds, resumable (about an hour)
python3 build_raw.py       # combine the catalog and pages into .cache/raw.json
python3 mkgroups.py        # group products by identical growing text into .cache/groups.json
python3 build.py           # write the collection
node validate.mjs          # check the output against the project's own import schema
```

`.cache` is not committed. If you only change the schema or `build.py`, start from `build.py`.

## How it works

The growing text on a product page (timing, sowing depth, spacing, pH, companions) is identical for every variety of a crop, so products are grouped by that text (`mkgroups.py`) and each group is a crop. `curated_veg.py` and `curated_flowers.py` hold what was read from each group by hand: germination days, seedling age, depth, spacing, sun, whether it transplants, and what the days to maturity count from. `curated_windows.py` holds the frost-anchored sowing windows the text states, by crop. `build.py` combines that with patterns for the labelled sections (pH, seed information, family, companions) and the store's tags (pollination type, colour, subtypes), and writes crop, subtype and variety cultivars.

A new crop on the site has no table entry: `build.py` skips it and reports it as `uncurated`. Add an entry to the right curated file (the group id is in `.cache/groups.json`).

## Courtesy

Requests identify themselves as an automated, read-only client, are spaced two seconds apart, and back off on `429` or server errors. The site's `robots.txt` and `agents.md` were checked; they ask for identifiable requests, and for server-to-server clients to sign them (Web Bot Auth), which this tool does not do, so keep the volume low.
