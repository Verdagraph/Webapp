import { Schema as S } from '@triplit/client';
import { z } from 'zod';

/**
 * A measurement given as a span, as seed packets give most of them
 * ("sprouts in 7-14 days", "space 45-60cm"). Either end may be omitted.
 * The expected value used for planning is the midpoint (see rangeExpected).
 */
export const RangeProfile = S.Record({
	min: S.Optional(S.Number()),
	max: S.Optional(S.Number())
});

/**
 * Builds the Zod schema of a range whose ends follow a number schema.
 * @param value The schema each end must satisfy.
 * @returns The range schema, rejecting a minimum above the maximum.
 */
export function rangeSchema(value: z.ZodNumber) {
	return z
		.object({ min: value.optional(), max: value.optional() })
		.refine(
			(range) =>
				range.min === undefined || range.max === undefined || range.min <= range.max,
			{ message: 'The minimum may not exceed the maximum.', path: ['min'] }
		);
}

/** A stored or submitted range. Ends are null when Triplit reads an unset field. */
export type RangeValue = { min?: number | null; max?: number | null };

/**
 * The single value to plan with: the midpoint of a closed range, or the one end present.
 * @param range The range, if any.
 * @returns The expected value, or undefined if the range has no ends.
 */
export function rangeExpected(
	range: RangeValue | null | undefined
): number | undefined {
	const min = range?.min ?? undefined;
	const max = range?.max ?? undefined;
	if (min !== undefined && max !== undefined) return (min + max) / 2;
	return min ?? max;
}

/** A range with the same value at both ends, for a figure given as a single number. */
export function exactRange(value: number): { min: number; max: number } {
	return { min: value, max: value };
}
