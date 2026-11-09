import { Schema as S } from '@triplit/client';

import { RangeProfile } from '../range.js';

/** Allowed values of the sun exposure field. */
export const SunExposureEnumOptions = ['FULL_SUN', 'PARTIAL_SHADE', 'SHADE'] as const;
export type SunExposure = (typeof SunExposureEnumOptions)[number];

/** Schema. Lengths are in meters. */
export const SowingProfile = S.Record({
	sunExposure: S.Optional(S.Set(S.String())),
	plantingDepth: S.Optional(RangeProfile),
	inRowSpacing: S.Optional(RangeProfile),
	rowSpacing: S.Optional(RangeProfile),
	thinTo: S.Optional(RangeProfile),
	seedsPerHole: S.Optional(S.Number()),
	successionIntervalDays: S.Optional(S.Number())
});
