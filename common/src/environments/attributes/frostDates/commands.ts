import { type } from 'arktype';

/** Field specifications. */
export const environmentLastFrostDateSchema = type('Date').configure({
	details:
		'The date within the environment when the last frost of the year is expected to occur.'
});
export const environmentFirstFrostDateSchema = type('Date').configure({
	details:
		'The date within the environment when the first frost of the year is expected to occur.'
});

/** Update command. */
export const FrostDateUpdateCommandSchema = type({
	lastFrostDate: environmentLastFrostDateSchema.optional(),
	firstFrostDate: environmentFirstFrostDateSchema.optional()
}).configure({
	details: 'Describes the date of the last and first frosts for this environment.'
});
export type FrostDateUpdateCommand = typeof FrostDateUpdateCommandSchema.infer;
