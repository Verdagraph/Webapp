import { z } from 'zod';

/** Field specifications. */
const pestName = z.string().trim().min(2).max(60);
const resistancesSchema = z
	.array(pestName)
	.max(40)
	.describe('Pests and diseases the cultivar resists, for example Late Blight.');
const susceptibilitiesSchema = z
	.array(pestName)
	.max(40)
	.describe('Pests and diseases the cultivar is prone to.');
export const fields = { resistancesSchema, susceptibilitiesSchema };

/** Update command. */
export const ResistanceUpdateCommandSchema = z
	.object({
		resistances: resistancesSchema.optional(),
		susceptibilities: susceptibilitiesSchema.optional()
	})
	.describe('Pest and disease resistance.');
export type ResistanceUpdateCommand = z.infer<typeof ResistanceUpdateCommandSchema>;
