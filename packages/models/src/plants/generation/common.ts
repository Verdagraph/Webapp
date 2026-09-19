import { type GeometryCreateCommand, type GeometryType } from '../../workspaces/index.js';

export function addDays(date: Date, days: number): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

/**
 * The geometry-type-specific field(s) that represent a single "size" in
 * meters - e.g. an ellipse's length/width are the same value, forming a
 * circle, while a polygon only has a radius.
 */
export function dimensionOverridesForSize(
	geometryType: GeometryType,
	size: number
): Partial<GeometryCreateCommand> {
	switch (geometryType) {
		case 'ELLIPSE':
			return { ellipseLength: size, ellipseWidth: size };
		case 'RECTANGLE':
			return { rectangleLength: size, rectangleWidth: size };
		case 'POLYGON':
			return { polygonRadius: size };
		case 'LINES':
			return {};
	}
}

/**
 * Derives the next history entry from the previous one, overriding only
 * what actually changes between milestones (date, size) - avoids every
 * caller having to hand-retype every other field just to move one forward.
 */
export function deriveGeometry(
	previous: GeometryCreateCommand,
	overrides: Partial<GeometryCreateCommand>
): GeometryCreateCommand {
	return { ...previous, scaleFactor: 1, ...overrides };
}
