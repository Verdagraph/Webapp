/**
 * Leaf value types. A path never continues past one of these -
 * they terminate recursion in FormPath/FormPathLeaves below.
 */
type Primitive = string | number | boolean | bigint | Date | null | undefined;

/** Recursion fuel. Indexing by the current depth yields depth - 1, and
 * indexing past 0 yields `never`, which the `[D] extends [never]` checks
 * below use to stop generating deeper path arms. 9 levels is more headroom
 * than any real path in this app needs (the deepest today,
 * plants[0].geometryHistory.geometries[0].linesCoordinates[2].y, is 4). */
type Fuel = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * All valid dot/bracket paths through T, including paths that target an
 * intermediate object or array node (not just leaves) - e.g. both `location`
 * and `location.coordinate.x` are valid FormPaths of a type with a `location`
 * object field. Array segments accept any `${number}`, so both a literal
 * index ("plants[0].x") and a runtime-templated one (`plants[${i}].x`) type-check.
 */
export type FormPath<T, D extends number = 9> = [D] extends [never]
	? never
	: T extends Primitive
		? never
		: T extends readonly (infer Element)[]
			?
					| `[${number}]`
					| (Element extends Primitive
							? never
							: `[${number}].${FormPath<Element, Fuel[D]>}`)
			: {
					[K in Extract<keyof T, string>]:
						| (T[K] extends Primitive ? K : never)
						| (T[K] extends readonly (infer Element)[]
								?
										| `${K}[${number}]`
										| (Element extends Primitive
												? never
												: `${K}[${number}].${FormPath<Element, Fuel[D]>}`)
								: T[K] extends Primitive
									? never
									: K | `${K}.${FormPath<T[K], Fuel[D]>}`);
				}[Extract<keyof T, string>];

/**
 * Same shape as FormPath, but only emits a path when it resolves to a leaf
 * value - never a path that stops at an intermediate object/array node.
 */
export type FormPathLeaves<T, D extends number = 9> = [D] extends [never]
	? never
	: T extends Primitive
		? never
		: T extends readonly (infer Element)[]
			? Element extends Primitive
				? `[${number}]`
				: `[${number}].${FormPathLeaves<Element, Fuel[D]>}`
			: {
					[K in Extract<keyof T, string>]: T[K] extends Primitive
						? K
						: T[K] extends readonly (infer Element)[]
							? Element extends Primitive
								? `${K}[${number}]`
								: `${K}[${number}].${FormPathLeaves<Element, Fuel[D]>}`
							: `${K}.${FormPathLeaves<T[K], Fuel[D]>}`;
				}[Extract<keyof T, string>];

/**
 * Reads the value at a dot/bracket path (e.g. "plants[0].cultivarName") out
 * of a plain object/array. Mirrors the app's existing FieldErrors key
 * convention (packages/models/src/errors.ts), so the same path string
 * addresses both a field's live value and its error list.
 */
export function getValueAtPath(path: string, obj: unknown): unknown {
	const segments = path.split(/[[\].]/).filter(Boolean);
	let value: unknown = obj;
	for (const segment of segments) {
		if (typeof value !== 'object' || value === null) {
			return undefined;
		}
		value = (value as Record<string, unknown>)[segment];
	}
	return value;
}
