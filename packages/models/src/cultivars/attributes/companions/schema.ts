import { Schema as S } from '@triplit/client';

/** Schema. Entries are cultivar names, matched loosely like any other name. */
export const CompanionsProfile = S.Record({
	beneficial: S.Optional(S.Set(S.String())),
	avoid: S.Optional(S.Set(S.String()))
});
