# Default cultivar collections

The default cultivar collection, compiled from [West Coast Seeds](https://www.westcoastseeds.com) product pages, retrieved 2026-10-17.

| File                           | Contents                                                          |
| ------------------------------ | ----------------------------------------------------------------- |
| `west-coast-seeds.json`        | 1,313 cultivars: crops, subtypes and varieties, in one collection |
| `west-coast-seeds.extras.json` | Facts the cultivar schema has no field for, and provenance        |
| `index.ts`                     | Loads the collection and turns it into rows to insert             |

Not included: sprouting seeds, microgreens, and non-plant products.

## Use

`index.ts` is a separate entry point, `@vdg-webapp/models/defaults`, so the data is only bundled where it is used.

- `defaultCultivarRows()` gives the collection row and its cultivar rows, with stable ids, owned by nobody (a system collection). Insert them with a service token: the development seed and the demo do, and `triplit seed run defaults` loads only these.
- A garden inherits the collection through its own collection: see `gardenCultivarCollectionRow`, which `GardenController.create` uses for every new garden.
- The JSON is also a cultivar collection export, so it can be loaded as a user's own collection with the editor's "Import JSON".

## Format and meaning

The file is a `CultivarCollectionExportSchema` export (`../exportImport.ts`). Cultivars form a tree through `parentName`: a crop (for example Tomato) holds the growing attributes shared by all its varieties and a `category`, optional subtypes (Cherry Tomato) group varieties, and each variety holds only what differs (days to maturity, colour, tags, size, resistances, and where it came from). Names and other names are unique once normalized.

The growing text on a West Coast Seeds page is the same for every variety of a crop, so it was read once per crop by hand (`tools/west-coast-seeds/curated_*.py`). Where the text gave a range it is stored as a range.

- Days to maturity are stored as stated, with what they count from (`maturityBasis`) on the crop. The Planner converts them for each way a plant is started, so a crop whose page does not say what they count from has an assumed basis, listed in the sidecar.
- Sowing windows are set only where the text gives them in relation to a frost date (`tools/west-coast-seeds/curated_windows.py`): 94 crops. Seasonal wording with no frost date, such as "late May", is left out. A window the text does not end has no close, and the Planner ends it where a plant can still be harvested.
- `sunExposure` lists every exposure on the page ("full sun to partial shade" is both).
- `origin.preferred` is the way the page puts first (direct sow or start indoors), and `allowed` follows from whether it can be transplanted. A crop whose page says it transplants poorly has `transplantTolerance` POOR.
- Scientific names are as listed on the pages, with obvious typos corrected; two crops had none (Tomato and Ornamental Millet) and were added. Common synonyms (Courgette for Zucchini, Rocket for Arugula) are general knowledge added as other names. Everything else comes from the page text or the store's tags.

## Source and licence

Only facts are recorded (names, timings, depths, spacings, tags, source URLs). The descriptive text on the site is not reproduced. Use of this data has not been cleared with West Coast Seeds; check with them before redistributing it outside this repository.

Pages were read with a descriptive User-Agent, one request every two seconds, after checking `robots.txt`. To rebuild the data, see `tools/west-coast-seeds`.
