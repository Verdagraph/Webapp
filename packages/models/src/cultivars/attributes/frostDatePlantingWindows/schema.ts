import { Schema as S } from '@triplit/client';

/** Schema. */
export const FrostDatePlantingWindowsProfile = S.Record({
	lastFrostWindowOpen: S.Optional(S.Number()),
	lastFrostWindowClose: S.Optional(S.Number()),
	firstFrostWindowOpen: S.Optional(S.Number()),
	firstFrostWindowClose: S.Optional(S.Number())
});
