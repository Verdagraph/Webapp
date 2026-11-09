import { Schema as S } from '@triplit/client';

import { RangeProfile } from '../range.js';

/** Schema. Temperatures are in degrees Celsius. */
export const GerminationProfile = S.Record({
	soilTemp: S.Optional(RangeProfile),
	needsLight: S.Optional(S.Boolean()),
	stratificationDays: S.Optional(S.Number()),
	soakHours: S.Optional(S.Number())
});
