/**
 * How a plant was created. Kept in its own file so cultivar attributes can use it
 * without importing the plant schema, which itself imports cultivar attributes.
 */
export const OriginEnumOptions = [
	'DIRECT_SEED',
	'SEED_TO_TRANSPLANT',
	'SEEDLING_TO_TRANSPLANT'
] as const;
export type Origin = (typeof OriginEnumOptions)[number];
