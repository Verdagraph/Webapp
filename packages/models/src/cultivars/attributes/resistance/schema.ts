import { Schema as S } from '@triplit/client';

/** Schema. Entries are the names of pests and diseases. */
export const ResistanceProfile = S.Record({
	resistances: S.Optional(S.Set(S.String())),
	susceptibilities: S.Optional(S.Set(S.String()))
});
