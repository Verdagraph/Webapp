import { Schema as S } from '@triplit/client';
import { z } from 'zod';

import * as FrostDates from './frostDates';
import * as AnnualTemperature from './annualTemperature';

export const EnvironmentAttributes = S.Record({
	frostDates: S.Optional(FrostDates.FrostDateProfile),
	annualTemperature: S.Optional(AnnualTemperature.AnnualTemperatureProfile)
});

export const EnvironmentAttributesUpdateCommandSchema = z.object({
	frostDates: FrostDates.FrostDatesUpdateCommandSchema.optional(),
	annualTemperature: AnnualTemperature.AnnualTemperatureUpdateCommandSchema.optional()
});
export type EnvironmentAttributesUpdateCommand = z.infer<
	typeof EnvironmentAttributesUpdateCommandSchema
>;
