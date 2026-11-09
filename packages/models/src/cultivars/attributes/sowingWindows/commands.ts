import { z } from 'zod';

/** Field specifications. */
const sowingWindow = (description: string) =>
	z
		.object({
			open: z
				.number()
				.min(-365)
				.max(365)
				.describe(
					'The day the window opens, relative to the frost date. Negative values are before it.'
				),
			close: z
				.number()
				.min(-365)
				.max(365)
				.optional()
				.describe(
					'The day the window closes, relative to the frost date. Leave empty if the window stays open.'
				)
		})
		.refine((window) => window.close === undefined || window.open <= window.close, {
			message: 'The window may not close before it opens.',
			path: ['close']
		})
		.describe(description);

/** The windows of one way of starting a plant. */
const frostWindows = (what: string) =>
	z
		.object({
			lastFrost: sowingWindow(
				`When ${what}, measured from the last frost date. This is the spring window.`
			).optional(),
			firstFrost: sowingWindow(
				`When ${what}, measured from the first frost date. This is the fall window.`
			).optional()
		})
		.describe(`When ${what}.`);

const directSeedSchema = frostWindows(
	'seeds may be sown outdoors where the plant will grow'
);
const indoorStartSchema = frostWindows(
	'seeds may be sown indoors, to be transplanted later'
);
const transplantOutSchema = frostWindows(
	'seedlings, started indoors or bought, may be planted outdoors'
);
export const fields = { directSeedSchema, indoorStartSchema, transplantOutSchema };

/** Update command. */
export const SowingWindowsUpdateCommandSchema = z
	.object({
		directSeed: directSeedSchema.optional(),
		indoorStart: indoorStartSchema.optional(),
		transplantOut: transplantOutSchema.optional()
	})
	.describe(
		'Sowing windows define when a cultivar may be started, relative to the last and first frost dates, for each way of starting it.'
	);
export type SowingWindowsUpdateCommand = z.infer<
	typeof SowingWindowsUpdateCommandSchema
>;
