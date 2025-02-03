import { Schema as S } from '@triplit/client';
import { z } from 'zod';

/** Schema. */
export const FrostDateProfile = S.Record({
	lastFrostDate: S.Optional(S.Date()),
	firstFrostDate: S.Optional(S.Date())
});

/** Field specifications. */
export const fields = {
	lastFrostDate: z
		.date()
		.describe(
			'The date within the environment when the last frost of the year is expected to occur.'
		),
	firstFrostDate: z
		.date()
		.describe(
			'The date within the environment when the first frost of the year is expected to occur.'
		)
};

/** Update command. */
export const FrostDateUpdateCommand = z
	.object({
		lastFrostDate: fields.lastFrostDate.optional(),
		firstFrostDate: fields.firstFrostDate.optional()
	})
	.describe(
		'Defines when the first and last frost are expected to occur within a year.'
	);
