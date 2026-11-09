import { Schema as S } from '@triplit/client';

import { RangeProfile } from '../range.js';

/** Schema. */
export const SoilProfile = S.Record({
	ph: S.Optional(RangeProfile)
});
