import { z } from 'zod';

/** Field specifications. */
const companionName = z
	.string()
	.trim()
	.min(2)
	.max(40)
	.regex(/^[\p{L}\p{M}\p{N} '’_-]+$/u, 'Contains characters a name may not.');
const beneficialSchema = z
	.array(companionName)
	.max(60)
	.describe('Plants which grow well beside this one, by cultivar name.');
const avoidSchema = z
	.array(companionName)
	.max(60)
	.describe('Plants which should not be grown beside this one, by cultivar name.');
export const fields = { beneficialSchema, avoidSchema };

/** Update command. */
export const CompanionsUpdateCommandSchema = z
	.object({ beneficial: beneficialSchema.optional(), avoid: avoidSchema.optional() })
	.describe('Companion planting: what grows well or badly beside the cultivar.');
export type CompanionsUpdateCommand = z.infer<typeof CompanionsUpdateCommandSchema>;
