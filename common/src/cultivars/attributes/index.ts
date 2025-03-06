import { Schema as S } from '@triplit/client';

import * as AnnualLifeCycle from './annualLifeCycle';
import * as FrostDatePlantingWindows from './frostDatePlantingWindows';
import * as Origin from './origin';
import { type } from 'arktype';

export const CultivarAttributes = S.Record({
	annualLifeCycle: S.Optional(AnnualLifeCycle.AnnualLifeCycleProfile),
	frostDatePlantingWindows: S.Optional(
		FrostDatePlantingWindows.FrostDatePlantingWindowsProfile
	),
	origin: S.Optional(Origin.OriginProfile)
});

export const CultivarAttributesUpdateCommandSchema = type({
	annualLifeCycle: AnnualLifeCycle.AnnualLifecycleUpdateCommandSchema.optional(),
	frostDatePlantingWindows:
		FrostDatePlantingWindows.FrostDatePlantingWindowsUpdateCommandSchema.optional(),
	origin: Origin.OriginUpdateCommandSchema.optional()
});
export type CultivarAttributesUpdateCommand =
	typeof CultivarAttributesUpdateCommandSchema.infer;
