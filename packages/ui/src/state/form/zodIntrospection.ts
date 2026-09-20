import { z } from 'zod';

/**
 * Like Partial, but recurses into nested objects. Used for seeding a form
 * with values the schema itself has no `.default()` for (e.g. route params).
 */
export type DeepPartial<T> = T extends Date
	? T
	: T extends readonly (infer Element)[]
		? DeepPartial<Element>[]
		: T extends object
			? { [K in keyof T]?: DeepPartial<T[K]> }
			: T;

/** Unwraps refinements (`.refine()`/`.superRefine()`) to reach the underlying object schema. */
function unwrapEffects(schema: z.ZodTypeAny): z.ZodTypeAny {
	return schema instanceof z.ZodEffects ? unwrapEffects(schema._def.schema) : schema;
}

/** Unwraps refinements/optional/nullable/default wrappers to reach the node they describe. */
function unwrapForTraversal(schema: z.ZodTypeAny): z.ZodTypeAny {
	if (schema instanceof z.ZodEffects) return unwrapForTraversal(schema._def.schema);
	if (schema instanceof z.ZodOptional) return unwrapForTraversal(schema._def.innerType);
	if (schema instanceof z.ZodNullable) return unwrapForTraversal(schema._def.innerType);
	if (schema instanceof z.ZodDefault) return unwrapForTraversal(schema._def.innerType);
	return schema;
}

/**
 * Recursively derives a reasonable initial value for one schema node:
 * - ZodDefault -> a fresh clone of the default (zod's `.default()` closes over
 *   one shared reference, so cloning is required to avoid two forms, or two
 *   `reset()` calls, aliasing the same array/object)
 * - ZodOptional/ZodNullable (no default) -> undefined
 * - ZodObject -> recurse per key
 * - ZodArray (no default) -> []
 * - primitives (no default) -> a type-appropriate empty value, so a bound
 *   input never sees `undefined` on a field the schema requires
 */
function deriveNode(schema: z.ZodTypeAny): unknown {
	if (schema instanceof z.ZodDefault) {
		return structuredClone(schema._def.defaultValue());
	}
	if (schema instanceof z.ZodOptional || schema instanceof z.ZodNullable) {
		return undefined;
	}
	if (schema instanceof z.ZodEffects) {
		return deriveNode(schema._def.schema);
	}
	if (schema instanceof z.ZodObject) {
		const shape = schema.shape as Record<string, z.ZodTypeAny>;
		const result: Record<string, unknown> = {};
		for (const key of Object.keys(shape)) {
			result[key] = deriveNode(shape[key]);
		}
		return result;
	}
	if (schema instanceof z.ZodArray) {
		return [];
	}
	if (schema instanceof z.ZodEnum) {
		return schema._def.values[0];
	}
	if (schema instanceof z.ZodString) return '';
	if (schema instanceof z.ZodNumber) return 0;
	if (schema instanceof z.ZodBoolean) return false;
	if (schema instanceof z.ZodDate) return new Date();
	return undefined;
}

function mergeDeep(base: unknown, overrides: unknown): unknown {
	if (overrides === undefined) return base;
	if (
		typeof base !== 'object' ||
		base === null ||
		Array.isArray(base) ||
		base instanceof Date ||
		typeof overrides !== 'object' ||
		overrides === null
	) {
		return overrides;
	}
	const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
	for (const key of Object.keys(overrides as Record<string, unknown>)) {
		result[key] = mergeDeep(result[key], (overrides as Record<string, unknown>)[key]);
	}
	return result;
}

/**
 * Derives an initial value object from a zod schema, optionally merging an
 * explicit `overrides` object over the schema-derived defaults (needed only
 * where the schema itself has no default for a value the caller already has,
 * e.g. route params).
 */
export function deriveInitialValues<Schema extends z.ZodTypeAny>(
	schema: Schema,
	overrides?: DeepPartial<z.infer<Schema>>
): z.infer<Schema> {
	const base = deriveNode(unwrapEffects(schema));
	return (
		overrides === undefined ? base : mergeDeep(base, overrides)
	) as z.infer<Schema>;
}

/** Walks `schema` along a dot/bracket path to the zod node describing that field. */
function getFieldSchema(schema: z.ZodTypeAny, path: string): z.ZodTypeAny | undefined {
	const segments = path.split(/[[\].]/).filter(Boolean);
	let current: z.ZodTypeAny | undefined = schema;
	for (const segment of segments) {
		if (!current) return undefined;
		current = unwrapForTraversal(current);
		if (/^\d+$/.test(segment)) {
			if (!(current instanceof z.ZodArray)) return undefined;
			current = current._def.type;
		} else {
			if (!(current instanceof z.ZodObject)) return undefined;
			current = (current.shape as Record<string, z.ZodTypeAny>)[segment];
		}
	}
	return current;
}

/**
 * True unless the field at `path` is wrapped (at its own level) in
 * ZodOptional/ZodNullable/ZodDefault. Drives `aria-required` only - no
 * min/max/pattern constraint object is derived, since nothing in the app
 * consumes one beyond this.
 */
export function isFieldRequired(schema: z.ZodTypeAny, path: string): boolean {
	const field = getFieldSchema(schema, path);
	if (!field) return false;
	return !(
		field instanceof z.ZodOptional ||
		field instanceof z.ZodNullable ||
		field instanceof z.ZodDefault
	);
}

function joinPath(path: (string | number)[]): string {
	return path.reduce<string>((acc, segment) => {
		if (typeof segment === 'number') return `${acc}[${segment}]`;
		return acc === '' ? segment : `${acc}.${segment}`;
	}, '');
}

/**
 * Converts zod's SafeParseError issues into the app's FieldErrors shape
 * (packages/models/src/errors.ts), keyed by the same dot/bracket convention
 * server-side errors already use (e.g. "geometry.linesCoordinates[2]").
 */
export function zodIssuesToFieldErrors(issues: z.ZodIssue[]): Record<string, string[]> {
	const fieldErrors: Record<string, string[]> = {};
	for (const issue of issues) {
		const key = joinPath(issue.path);
		(fieldErrors[key] ??= []).push(issue.message);
	}
	return fieldErrors;
}
