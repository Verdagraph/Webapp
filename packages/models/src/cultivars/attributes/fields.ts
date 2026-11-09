import { z } from 'zod';

import { rangeSchema } from './range.js';

/**
 * A range of numbers kept between two limits, for the measurements profiles store as ranges.
 * @param description Explains the field to the person filling it in.
 * @param limits The lowest and highest value either end may have, and the unit the messages name.
 * @returns The range schema.
 */
export function boundedRange(
	description: string,
	limits: { minimum: number; maximum: number; unit?: string }
) {
	const { minimum, maximum, unit = '' } = limits;
	return rangeSchema(
		z
			.number()
			.min(
				minimum,
				minimum === 0 ? 'May not be negative.' : `May be at least ${minimum}${unit}.`
			)
			.max(maximum, `May be at most ${maximum}${unit}.`)
	).describe(description);
}

/** A range of lengths in meters, from zero up to a maximum. */
export function lengthRange(description: string, maximum: number) {
	return boundedRange(description, { minimum: 0, maximum, unit: 'm' });
}

/** A range of durations in days, from zero up to a maximum (ten years unless given). */
export function daysRange(description: string, maximum = 3650) {
	return boundedRange(description, { minimum: 0, maximum, unit: ' days' });
}
