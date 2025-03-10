import { ZodType } from 'zod';

/**
 * Validates a single field against a schema.
 *
 */
export function validateField(value: any, schema: ZodType): string[] | undefined {
	const parseResult = schema.safeParse(value);
	if (parseResult.success) {
		return;
	}
	return parseResult.error.issues.map((error) => error.message);
}
