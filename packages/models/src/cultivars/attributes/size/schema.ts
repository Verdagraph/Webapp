import { Schema as S } from '@triplit/client';

import { RangeProfile } from '../range.js';

/** Schema. Lengths are in meters. */
export const SizeProfile = S.Record({
	height: S.Optional(RangeProfile),
	spread: S.Optional(RangeProfile)
});
