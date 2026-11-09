import { Schema as S } from '@triplit/client';

import { RangeProfile } from '../range.js';

/** What a packet's "days to maturity" is counted from. */
export const MaturityBasisEnumOptions = [
	'SOWING',
	'GERMINATION',
	'TRANSPLANT'
] as const;
export type MaturityBasis = (typeof MaturityBasisEnumOptions)[number];

/** Schema. All durations are in days. */
export const AnnualLifeCycleProfile = S.Record({
	sowToGerm: S.Optional(RangeProfile),
	germToTransplant: S.Optional(RangeProfile),
	germToFirstHarvest: S.Optional(RangeProfile),
	firstToLastHarvest: S.Optional(RangeProfile),
	lastHarvestToExpiry: S.Optional(RangeProfile),
	maturityDays: S.Optional(RangeProfile),
	maturityBasis: S.Optional(S.String({ enum: [...MaturityBasisEnumOptions] }))
});
