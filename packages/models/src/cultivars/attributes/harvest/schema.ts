import { Schema as S } from '@triplit/client';

import { RangeProfile } from '../range.js';

export const HarvestPartEnumOptions = [
	'LEAF',
	'STEM',
	'ROOT',
	'BULB',
	'FRUIT',
	'FLOWER',
	'SEED',
	'WHOLE_PLANT'
] as const;

/** Schema. */
export const HarvestProfile = S.Record({
	part: S.Optional(S.String({ enum: [...HarvestPartEnumOptions] })),
	storageDays: S.Optional(RangeProfile)
});
