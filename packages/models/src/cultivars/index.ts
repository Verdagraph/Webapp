export * from './schema.js';
export * from './commands.js';
export * from './controller.js';
/**
 * Named (not wildcard) re-export: the attribute submodules are namespace-
 * imported internally (attributes/index.ts) rather than wildcard-exported,
 * since several of them define similarly-named internal fields/constants
 * that would collide if all exported at once. Export just what's actually
 * needed elsewhere.
 */
export {
	type ExpectedGeometryProfileLike,
	starterGeometryFromExpectedProfile
} from './attributes/geometry/index.js';
