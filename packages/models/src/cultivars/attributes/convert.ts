/**
 * Triplit stores sets, but commands, forms and JSON files carry them as arrays.
 * These helpers convert a whole attributes object either way, so no profile has to
 * know which of its fields are sets. Every array inside attributes is a set.
 */

function isPlainObject(value: unknown): value is Record<string, unknown> {
	if (value === null || typeof value !== 'object') return false;
	const prototype = Object.getPrototypeOf(value);
	return prototype === Object.prototype || prototype === null;
}

/**
 * Converts submitted attributes into the shape stored in Triplit.
 * Arrays become sets, and unset values are dropped.
 * @param attributes Attributes as submitted by a command.
 * @returns Attributes ready to insert.
 */
export function attributesToStored(attributes: unknown): Record<string, unknown> {
	function convert(value: unknown): unknown {
		if (Array.isArray(value)) return new Set(value);
		if (isPlainObject(value)) {
			const result: Record<string, unknown> = {};
			for (const [key, entry] of Object.entries(value)) {
				if (entry === undefined || entry === null) continue;
				result[key] = convert(entry);
			}
			return result;
		}
		return value;
	}
	return (convert(attributes ?? {}) ?? {}) as Record<string, unknown>;
}

/**
 * Converts stored attributes into plain data for forms, JSON and command validation.
 * Sets become sorted arrays, and unset (null) values are dropped.
 * @param attributes Attributes as read from Triplit.
 * @returns Plain attributes.
 */
export function attributesFromStored(attributes: unknown): Record<string, unknown> {
	function convert(value: unknown): unknown {
		if (value instanceof Set) return [...value].sort();
		if (isPlainObject(value)) {
			const result: Record<string, unknown> = {};
			for (const [key, entry] of Object.entries(value)) {
				if (entry === undefined || entry === null) continue;
				result[key] = convert(entry);
			}
			return result;
		}
		return value;
	}
	return (convert(attributes ?? {}) ?? {}) as Record<string, unknown>;
}
