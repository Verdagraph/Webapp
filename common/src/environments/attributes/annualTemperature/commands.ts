import { type } from 'arktype';

/** Field specifications. */
export const environmentMinimumTemperatureSchema = type('number').configure({
	details:
		'The minimum temperature that is expected to occur within a year in the environment.'
});
export const environmentMaximumTemperatureSchema = type('number').configure({
	details:
		'The maxmium temperature that is expected to occur within a year in the environment.'
});

/** Update command. */
export const AnnualTemperatureUpdateCommandSchema = type({
	minimum: environmentMinimumTemperatureSchema.optional(),
	maximum: environmentMaximumTemperatureSchema.optional()
}).configure({
	details: 'Defines the expected range of temperatures over a year.'
});
export type AnnualTemperatureProfileUpdateCommand =
	typeof AnnualTemperatureUpdateCommandSchema.infer;
