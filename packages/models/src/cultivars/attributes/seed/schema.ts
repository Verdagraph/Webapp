import { Schema as S } from '@triplit/client';

/** Schema. */
export const SeedProfile = S.Record({
	germinationPercent: S.Optional(S.Number()),
	seedLifeYears: S.Optional(S.Number()),
	seedsPerMeterRow: S.Optional(S.Number())
});
