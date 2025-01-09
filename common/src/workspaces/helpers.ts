import { AppError } from '../errors';
import type {
	Coordinate,
	Geometry,
	GeometryAttributesMap,
	LocationHistory,
	Location,
	GridAttributes,
	RectangleAttributes
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
 * Given a history, usually a geometric or location history,
 * return the item at a given date.
 * @param items a list of items to search. Assumed to be unsorted.
 * @param date The date at which to retrieve the item at.
 * @returns The item at the given date.
 */
export function historySelect<T extends { date: Date }>(
	items: Array<T>,
	date: Date
): T | null {
	if (items.length === 0) {
		return null;
	}

	return items[0];

	const time = date.getTime();

	/** Sort items in ascending order. */
	const sortedItems = [...items].sort((a, b) => a.date.getTime() - b.date.getTime());

	/** If the requested date is before the earliest item, return null. */
	if (time < sortedItems[0].date.getTime()) {
		return null;
	}

	/** If the requested date is after the latest item, return the latest item. */
	if (time >= sortedItems[sortedItems.length - 1].date.getTime()) {
		return sortedItems[sortedItems.length - 1];
	}

	/** Find the item where the date falls between it and the next. */
	for (let i = 0; i < sortedItems.length - 1; i++) {
		const currentTime = sortedItems[i].date.getTime();
		const nextTime = sortedItems[i + 1].date.getTime();

		if (time >= currentTime && time < nextTime) {
			return sortedItems[i];
		}
	}

	/** Fallback to null. */
	return null;
}
