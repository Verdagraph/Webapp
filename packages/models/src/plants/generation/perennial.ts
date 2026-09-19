/**
 * Perennial dormancy-cycle generation. Deliberately not built yet:
 * `ExpectedGeometryProfile` already has `exitDormancySize`/`enterDormancySize`
 * fields, but generating real dormancy-cycle dates needs calendar-seasonal
 * logic (recurring yearly, likely keyed off `FrostDatePlantingWindowsProfile`)
 * rather than the day-offset-from-one-anchor approach `annual.ts` uses for
 * the single linear Seed-to-Expiry chain - a materially different
 * and larger feature, tracked as a separate follow-up task.
 */
