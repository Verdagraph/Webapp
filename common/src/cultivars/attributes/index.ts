import { Schema as S } from '@triplit/client';
import { z } from 'zod';

import * as AnnualLifeCycle from './annualLifeCycle';
import * as FrostDatePlantingWindows from './frostDatePlantingWindows';
import * as Origin from './origin';

export const CultivarAttributes = S.Record({
	annualLifeCycle: S.Optional(AnnualLifeCycle.profile),
	frostDatePlantingWindows: S.Optional(FrostDatePlantingWindows.profile),
	origin: S.Optional(Origin.profile)
});

export const CultivarAttributesUpdateCommand = z.object({
	annualLifeCycle: AnnualLifeCycle.command.optional(),
	frostDatePlantingWindows: FrostDatePlantingWindows.command.optional(),
	origin: Origin.command.optional()
});
