import { Schema as S } from '@triplit/client';

import { RangeProfile } from '../range.js';

export const RootTypeEnumOptions = ['TAP', 'FIBROUS', 'SHALLOW', 'TUBEROUS'] as const;
export const NutrientRoleEnumOptions = [
	'HEAVY_FEEDER',
	'MODERATE_FEEDER',
	'LIGHT_FEEDER',
	'NITROGEN_FIXER'
] as const;

/** Schema. Depths are in meters. */
export const EcologyProfile = S.Record({
	rootDepth: S.Optional(RangeProfile),
	rootType: S.Optional(S.String({ enum: [...RootTypeEnumOptions] })),
	nutrientRole: S.Optional(S.String({ enum: [...NutrientRoleEnumOptions] }))
});
