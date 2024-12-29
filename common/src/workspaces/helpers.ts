import { AppError } from '../errors';
import type {
	Coordinate,
	Geometry,
	GeometryAttributesMap,
	LocationHistory,
	Location
} from './schema';

/**
 * Returns the attributs from the geometry based on its type.
 * Throws an error if the attributes are undefined.
 * @param geometry The geometry to extract from.
 * @returns The attributes.
 */
export function getGeometryAttributes<T extends Geometry['type']>(
	geometry: Extract<Geometry, { type: T }>
): GeometryAttributesMap[T] {
	switch (geometry.type) {
		case 'RECTANGLE':
			if (!geometry.rectangleAttributes) {
				throw new AppError('Rectangle geometry undefined.');
			}
			return geometry.rectangleAttributes as GeometryAttributesMap[T];

		case 'POLYGON':
			if (!geometry.polygonAttributes) {
				throw new AppError('Polygon geometry undefined.');
			}
			return geometry.polygonAttributes as GeometryAttributesMap[T];

		case 'ELLIPSE':
			if (!geometry.ellipseAttributes) {
				throw new AppError('Ellipse geometry undefined.');
			}
			return geometry.ellipseAttributes as GeometryAttributesMap[T];
		case 'LINES':
			if (!geometry.linesAttributes) {
				throw new AppError('Lines geometry undefined.');
			}
			return geometry.linesAttributes as GeometryAttributesMap[T];
	}

	/** Should not reach here. */
	throw new AppError('Geometry type undefined.');
}

/**
 * Given a location history, return the location at a given date.
 * @param locations a list of locations to search. Assumed to be unsorted.
 * @param date The date at which to retrieve the location at.
 * @returns The location at the given date.
 */
export function getLocationAtDate(
	locations: Array<Location>,
	date: Date
): Location | null {
	if (locations.length === 0) {
		return null;
	}

	const time = date.getTime();

	/** Sort locations in ascending order. */
	const sortedLocations = locations.sort((a, b) => a.date.getTime() - b.date.getTime());

	/** If the requested date is before the earliest location, return null. */
	if (time < sortedLocations[0].date.getTime()) {
		return null;
	}

	/** If the requested date is after the latest location, return the latest location. */
	if (time >= sortedLocations[sortedLocations.length - 1].date.getTime()) {
		return sortedLocations[sortedLocations.length - 1];
	}

	/** Find the location where the date falls between it and the next. */
	for (let i = 0; i < sortedLocations.length - 1; i++) {
		const currentTime = sortedLocations[i].date.getTime();
		const nextTime = sortedLocations[i + 1].date.getTime();

		if (time >= currentTime && time < nextTime) {
			return sortedLocations[i];
		}
	}

	/** Fallback to null. */
	return null;
}
