import { Schema as S } from '@triplit/client';
import { z } from 'zod';

import * as AnnualLifeCycle from './annualLifeCycle';
import * as FrostDatePlantingWindows from './frostDatePlantingWindows';
import * as Origin from './origin';

export const CultivarAttributes = S.Record({
	annualLifeCycle: S.Optional(AnnualLifeCycle.AnnualLifeCycleProfile),
	frostDatePlantingWindows: S.Optional(
		FrostDatePlantingWindows.FrostDatePlantingWindowsProfile
	),
	origin: S.Optional(Origin.OriginProfile)
});

export const CultivarAttributesUpdateCommandSchema = z.object({
	annualLifeCycle: AnnualLifeCycle.AnnualLifecycleUpdateCommandSchema.optional(),
	frostDatePlantingWindows:
		FrostDatePlantingWindows.FrostDatePlantingWindowsUpdateCommandSchema.optional(),
	origin: Origin.OriginUpdateCommandSchema.optional()
});
export type CultivarAttributesUpdateCommand = z.infer<
	typeof CultivarAttributesUpdateCommandSchema
>;
