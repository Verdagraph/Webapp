import { Schema as S } from '@triplit/client';

/** Schema. */
export const InterplantingProfile = S.Record({
	minimumDistance: S.Optional(S.Number())
});
