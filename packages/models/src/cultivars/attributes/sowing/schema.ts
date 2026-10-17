import { Schema as S } from '@triplit/client';

/** Allowed values of the sun exposure field. */
export const SunExposureEnumOptions = ['FULL_SUN', 'PARTIAL_SHADE', 'SHADE'] as const;
export type SunExposure = (typeof SunExposureEnumOptions)[number];

/** Schema. */
export const SowingProfile = S.Record({
	sunExposure: S.Optional(S.String({ enum: [...SunExposureEnumOptions] })),
	plantingDepth: S.Optional(S.Number()),
	rowSpacing: S.Optional(S.Number())
});
