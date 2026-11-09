import { Schema as S } from '@triplit/client';

import { RangeProfile } from '../range.js';

/** Schema. */
export const FloweringProfile = S.Record({
	bloomDays: S.Optional(RangeProfile)
});
