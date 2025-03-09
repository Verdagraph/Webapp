import { z } from 'zod';

/** Field specifications. */
export const cultivarLastFrostWindowOpenSchema = z.number().describe(
	'The amount of days between the last frost and the beginning of the planting window. \
			Positive values indicate the window begins after the last frost date. \
			For example, a value of -15 indicates the cultivar may be planted 15 days before the last frost date.'
);
export const cultivarLastFrostWindowCloseSchema = z.number().describe(
	'The amount of days between the last frost and the end of the planting window. \
			Positive values indicate the window begins after the last frost date. \
			For example, a value of 15 indicates the cultivar must be planted before 15 days after the last frost date.'
);
export const cultivarFirstFrostWindowOpenSchema = z.number().describe(
	'The amount of days between the first frost and the beginning of the planting window. \
			Positive values indicate the window begins after the first frost date. \
			For example, a value of -15 indicates the cultivar may be planted 15 days before the first frost date.'
);
export const cultivarFirstFrostWindowCloseSchema = z.number().describe(
	'The amount of days between the first frost and the end of the planting window. \
			Positive values indicate the window begins after the first frost date. \
			For example, a value of 15 indicates the cultivar must be planted before 15 days after the first frost date.'
);

/** Update command. */
export const FrostDatePlantingWindowsUpdateCommandSchema = z
	.object({
		lastFrostWindowOpen: cultivarLastFrostWindowOpenSchema.optional(),
		lastFrostWindowClose: cultivarLastFrostWindowCloseSchema.optional(),
		firstFrostWindowOpen: cultivarFirstFrostWindowOpenSchema.optional(),
		firstFrostWindowClose: cultivarFirstFrostWindowCloseSchema.optional()
	})
	.describe(
		'A planting window defines a period of time within an environment that a cultivar should be planted. \
		These attributes define an allowed planting window of time relative to the first and last frost dates. \
		These planting windows are used for incdicating within the Verdagraph when plants are suggested to be planted.'
	);
export type FrostDatePlantingWindowsUpdateCommand = z.infer<
	typeof FrostDatePlantingWindowsUpdateCommandSchema
>;
