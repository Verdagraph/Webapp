import { Schema as S } from '@triplit/client';

import { OriginEnumOptions } from '../../../plants/origin.js';

/** How well the cultivar tolerates being transplanted. */
export const TransplantToleranceEnumOptions = ['POOR', 'FAIR', 'GOOD'] as const;
export type TransplantTolerance = (typeof TransplantToleranceEnumOptions)[number];

/** Schema. */
export const OriginProfile = S.Record({
	preferred: S.Optional(S.String({ enum: [...OriginEnumOptions] })),
	allowed: S.Optional(S.Set(S.String())),
	transplantTolerance: S.Optional(
		S.String({ enum: [...TransplantToleranceEnumOptions] })
	),
	transplantShockDays: S.Optional(S.Number()),
	minNightTempToTransplant: S.Optional(S.Number())
});
