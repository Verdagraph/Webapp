import z from 'zod';

/** Field specifications. */
export const commonNameSchema = z
	.string()
	.trim()
	.min(2, 'Must be at least 3 characters.')
	.max(50, 'May be at most 50 characters.')
	.regex(
		/[0-9A-Za-z _-]+/,
		'Must contain only letters, numbers, spaces, underscores, and hyphens.'
	);
export const commonDescriptionSchema = z
	.string()
	.max(1400, 'May be at most 1400 characters.');
