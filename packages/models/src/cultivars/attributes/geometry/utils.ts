import { type GeometryType } from '../../../workspaces/index.js';

/**
 * The subset of a Cultivar's ExpectedGeometryProfile needed to generate an
 * expected geometry history. Fields are nullable, not just optional,
 * matching how Triplit's S.Optional resolves in its generated entity types.
 */
export type ExpectedGeometryProfileLike = {
	geometryType?: GeometryType | null;
	seedSize?: number | null;
	seedlingSize?: number | null;
	firstHarvestSize?: number | null;
	lastHarvestSize?: number | null;
	expirySize?: number | null;
	exitDormancySize?: number | null;
	enterDormancySize?: number | null;
};
