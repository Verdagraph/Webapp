import { Schema as S } from '@triplit/client';

/** Schema. */
export const FrostDateProfile = S.Record({
	lastFrostDate: S.Optional(S.Date()),
	firstFrostDate: S.Optional(S.Date())
});
