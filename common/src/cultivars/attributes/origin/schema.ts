import { Schema as S } from '@triplit/client';

/** Schema. */
export const OriginProfile = S.Record({
	transplantable: S.Optional(S.Boolean())
});
