import { Schema as S } from '@triplit/client';

/** Schema. */
export const WebResourceProfile = S.Record({
	sourceUrl: S.Optional(S.String()),
	retrievedAt: S.Optional(S.String()),
	referenceUrls: S.Optional(S.Set(S.String()))
});
