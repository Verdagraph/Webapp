import { Schema as S } from '@triplit/client';
import { z } from 'zod';
import * as AnnualTemperature from './annualTemperature/index.js';
import * as FrostDates from './frostDates/index.js';
export const attributesSchemas = { ...FrostDates.fields, ...AnnualTemperature.fields };
export const EnvironmentAttributes = S.Record({
    frostDates: S.Optional(FrostDates.FrostDateProfile),
    annualTemperature: S.Optional(AnnualTemperature.AnnualTemperatureProfile)
});
export const EnvironmentAttributesUpdateCommandSchema = z.object({
    frostDates: FrostDates.FrostDatesUpdateCommandSchema.optional(),
    annualTemperature: AnnualTemperature.AnnualTemperatureUpdateCommandSchema.optional()
});
//# sourceMappingURL=index.js.map