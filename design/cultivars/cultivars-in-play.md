---
status: Proposal, ahead of the implementation. Nothing here exists yet. Planting windows currently use an interim rule, described in the Planner models.
---

# Cultivars in play

A Garden resolves every cultivar of the collections it inherits: over a thousand with the default collection. Most views need the handful a gardener actually works with. This note looks at what "in play" should mean, where it should be stored and who should consume it, and how it connects to a seed packet inventory.

## What needs it

- **Planting windows calendar:** one row per cultivar and environment. Unfiltered it lists every variety of every crop with identical bars, hundreds of rows.
- **Add Plants:** the cultivar picker lists all names. A garden of thirty varieties wants those first.
- **Generator:** `includePlants` and `excludePlants` are cultivar names. The defaults for both come from what is in play.
- **Inventory (future):** what seed the garden holds, and what it still needs to buy.
- **Companion suggestions (future):** companions of what is in play, not of everything.

## Three meanings

These are different and a design should pick, or combine, them deliberately:

1. **A view filter.** Which rows this one screen shows. Nothing else cares.
2. **Model scope.** The cultivars the Planner considers for the garden: the Generator, shopping lists, suggestions. A garden-wide fact, shared by its members.
3. **Held or intended seed.** In play because a packet is in the cupboard or on the list to buy.

Meaning 1 is a UI preference. Meanings 2 and 3 are garden data, and 3 is a source for 2.

## Options

| Option                              | Stored as                                                                   | For                                                                         | Against                                                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| A. Filter on each view              | Local to the view (browser storage)                                         | Nothing to design or migrate.                                               | Every view needs its own, they disagree, and members do not share them. Does not help the Generator or inventory. |
| B. A garden selection               | A new `GardenCultivar` record per cultivar name: garden, name, status, note | One shared source. Small. Cultivars can be chosen at any level of the tree. | A new entity, and a list to keep in step with plants.                                                             |
| C. Stubs in the garden's collection | A cultivar with no attributes of its own, whose parent is the inherited one | No new entity: the existing collection and editor are the list.             | Mixes "chosen" with "customised", pollutes the collection, and makes every choice an inheritance link.            |
| D. Derived from inventory           | Cultivars with a packet in stock, or planted                                | No separate choosing step.                                                  | Cannot say "I plan to grow this" before buying seed, and needs the whole inventory first.                         |
| E. Selection plus derived           | B, unioned with cultivars the garden has plants of and packets of           | One list that fills itself and can be curated.                              | The most to build, and "why is this in play?" needs answering in the UI.                                          |

### Recommendation

Build **B** now, shaped so that it grows into **E**. Concretely:

- `GardenCultivar { gardenId, cultivarName, status, note }`. The name is the cultivar's primary name, matched loosely like a Plant's `cultivarName`, so it survives a default collection being reseeded and an override being added.
- "In play" for the app is the union of the selection, the cultivars the garden has Plants of, and later the cultivars it has packets of. Adding a Plant of a cultivar puts it in play without a separate step.
- Choosing is done where the garden looks after its cultivars: **the cultivar collection viewer**, not the Planner. The tree gets an "In my garden" toggle on any crop or variety, and an "In play only" filter. Selection is garden data that every Planner view reads, not a setting of the calendar.
- The Planner reads one derived list from the cultivar context (`inPlay`) instead of each view deciding. The calendar keeps a "Show all" switch for discovery, which is a view filter (meaning 1) on top of the shared list.
- Editing the selection needs the editor role, since it changes what the garden's Planner shows. Choosing is cheap and reversible, so it does not need the admin role that changing collections does.

## Crops and varieties

A variety shares its crop's windows, so listing both repeats the bars. Two decisions:

- **Does choosing a crop choose its varieties?** Recommended no. Choosing "Tomato" puts the crop in play and shows one row. Choosing "Early Girl" puts that variety in play. The planting calendar shows a row per chosen cultivar, and merges rows whose windows are identical into one labeled with the crop and a count ("Tomato, 3 varieties"). This merge is useful whatever is chosen, and can be built first.
- **Do Plants imply the crop?** Yes for visibility: a Plant's cultivar is in play. It is not a choice, so it cannot be un-chosen while the Plant exists.

## Seed packet inventory

Inventory is the stronger reason to model this properly, and the cultivar data already carries what it needs: `seed.seedLifeYears`, `seed.germinationPercent`, `seed.seedsPerMeterRow`, `sowing.successionIntervalDays`, and a source URL for where to buy more.

A sketch, not a proposal to build yet:

- `SeedPacket { gardenId, cultivarName, source, packedFor (year), acquiredAt, quantity (amount and unit: seeds, grams or packets), remaining, storage, germinationTest (percent, date), note }`.
- **Viability:** `acquiredAt` or `packedFor` plus the cultivar's seed life gives "viable until". Old packets are flagged, and a germination test overrides the generic figure.
- **Use:** creating Plants from a packet reduces `remaining` by the seeds used, estimated from `seedsPerMeterRow` and the length of row planted.
- **Shopping:** the plants planned for a season, less the seed on hand, gives what to buy. This is the first real use of `seedsPerMeterRow`.
- **In play:** a packet in stock puts its cultivar in play (option E).

Choosing by name rather than by id matters here: a packet bought from another company for the same cultivar matches by name, which the default collection's other names (Courgette for Zucchini) make easier.

## Open questions

1. **Name or id?** Name matches how Plants refer to cultivars, but two inherited cultivars with the same name cannot both be chosen. Recommended name.
2. **One list per garden, or per member?** A shared list is simpler. A member may want their own view, which is option A on top of the shared list.
3. **Status values.** Just in play and not, or something like INTERESTED, PLANNED and GROWING? A planned status could feed the Generator and shopping lists. Recommended starting with two and adding more when a view needs them.
4. **Should an unused choice expire?** For example, drop a cultivar from play when it has had no plants for years. Recommended not, since it is the user's list.
5. **Inventory units.** Seeds, grams and packets are not interchangeable. Convert with a seeds-per-gram figure the cultivar does not have yet, or store the unit and never convert.
6. **Where do packets live in the UI?** Beside the cultivar in the collection viewer, or as their own page. Recommended beside the cultivar first, so "do I have this?" is answered where the garden already looks at cultivars.

## Suggested order

1. Merge rows with identical windows in the calendar. Needs no new data.
2. `GardenCultivar`, its permission and controller, and the toggle and filter in the collection viewer.
3. The `inPlay` list in the cultivar context, replacing the interim rule in the planting windows context; the calendar, Add Plants and Generator read it.
4. `SeedPacket`, viability and the shopping list.
