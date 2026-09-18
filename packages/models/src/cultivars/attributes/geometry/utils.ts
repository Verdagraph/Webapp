import {
	type GeometryCreateCommand,
	GeometryCreateCommandSchema,
	type GeometryType
} from '../../../workspaces/index.js';

/**
 * The subset of a Cultivar's ExpectedGeometryProfile needed for a starter
 * geometry. Fields are nullable, not just optional, matching how Triplit's
 * S.Optional resolves in its generated entity types.
 */
export type ExpectedGeometryProfileLike = {
	geometryType?: GeometryType | null;
	peakSize?: number | null;
	seedlingScaleFactor?: number | null;
};

/**
 * Builds a starter Geometry for a freshly-placed Plant of a Cultivar, sized
 * at its seedling stage. peakSize means different things per geometry type
 * (diameter for ELLIPSE, width for RECTANGLE, radius for POLYGON - see
 * ExpectedGeometryProfile's peakSize doc comment) - applied to whichever
 * dimension(s) that type actually uses; the schema's own defaults cover
 * every other field a shape doesn't need. LINES has no representable
 * conversion (the profile carries no coordinates), so it falls back to the
 * schema's default lines shape entirely.
 */
export function starterGeometryFromExpectedProfile(
	profile: ExpectedGeometryProfileLike | null | undefined,
	date: Date
): GeometryCreateCommand {
	const base = GeometryCreateCommandSchema.parse({ date });
	const geometryType = profile?.geometryType ?? base.type;
	const peakSize = profile?.peakSize ?? 1;
	const scaleFactor = profile?.seedlingScaleFactor ?? 1;

	const sized: Partial<GeometryCreateCommand> = { type: geometryType, scaleFactor };
	switch (geometryType) {
		case 'ELLIPSE':
			sized.ellipseLength = peakSize;
			sized.ellipseWidth = peakSize;
			break;
		case 'RECTANGLE':
			sized.rectangleLength = peakSize;
			sized.rectangleWidth = peakSize;
			break;
		case 'POLYGON':
			sized.polygonRadius = peakSize;
			break;
		case 'LINES':
			break;
	}

	return { ...base, ...sized };
}
