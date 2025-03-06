import { Schema as S } from '@triplit/client';
import { type } from 'arktype';

import * as FrostDates from './frostDates';
import * as AnnualTemperature from './annualTemperature';

export const EnvironmentAttributes = S.Record({
	frostDates: S.Optional(FrostDates.FrostDateProfile),
	annualTemperature: S.Optional(AnnualTemperature.AnnualTemperatureProfile)
});

export const EnvironmentAttributesUpdateCommandSchema = type({
	frostDates: FrostDates.FrostDateUpdateCommandSchema.optional(),
	annualTemperature: AnnualTemperature.AnnualTemperatureUpdateCommandSchema.optional()
});
export const EnvironmentAttributesUpdateCommand =
	typeof EnvironmentAttributesUpdateCommandSchema.infer;
