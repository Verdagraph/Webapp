import { z } from 'zod';

/** Field specifications. */
const sourceUrlSchema = z
	.string()
	.trim()
	.url('Must be a valid URL.')
	.max(500)
	.describe('The page the cultivar details were taken from.');
const retrievedAtSchema = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be a date like 2026-10-17.')
	.describe('The date the source page was read.');
const referenceUrlsSchema = z
	.array(z.string().trim().url('Must be a valid URL.').max(500))
	.max(20)
	.describe('Other pages with information about the cultivar.');
export const fields = { sourceUrlSchema, retrievedAtSchema, referenceUrlsSchema };

/** Update command. */
export const WebResourceUpdateCommandSchema = z
	.object({
		sourceUrl: sourceUrlSchema.optional(),
		retrievedAt: retrievedAtSchema.optional(),
		referenceUrls: referenceUrlsSchema.optional()
	})
	.describe('Where the cultivar details came from, and where to read more.');
export type WebResourceUpdateCommand = z.infer<typeof WebResourceUpdateCommandSchema>;
