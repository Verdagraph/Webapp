import { Schema as S } from '@triplit/client';
import { z } from 'zod';

import * as FrostDates from './frostDates';
import * as AnnualTemperature from './annualTemperature';

export const EnvironmentAttributes = S.Record({
	frostDates: S.Optional(FrostDates.profile),
	annualTemperature: S.Optional(AnnualTemperature.profile)
});

export const EnvironmentAttributesUpdateCommand = z.object({
	frostDates: FrostDates.command.optional(),
	annualTemperature: AnnualTemperature.command.optional()
});
