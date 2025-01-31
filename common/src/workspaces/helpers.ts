import { AppError } from '../errors';
import type {
	Geometry,
	GeometryAttributesMap,
	GeometryTypeEnum,
	RectangleGeometry,
	EllipseGeometry,
	PolygonGeometry,
	LinesGeometry
} from './schema';

/**
 * Checks whether two dates are on the same day or not.
 * @param date1 The first date.
 * @param date2 The second date.
 * @returns If true, the two dates take place on the same day.
 */
export function isSameDay(date1: Date, date2: Date): boolean {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

/**
 * Returns the attributes from the geometry based on its type.
 * Throws an error if the attributes are undefined.
 * @param geometry The geometry to extract from.
 * @returns The attributes.
 */
export function getGeometryAttributes<T extends (typeof GeometryTypeEnum)[number]>(
	geometry: Extract<Geometry, { type: T }>
): GeometryAttributesMap[T] {
	switch (geometry.type) {
		case 'RECTANGLE':
			if (
				!geometry.rectangleAttributes ||
				!geometry.rectangleAttributes.length ||
				!geometry.rectangleAttributes.width
			) {
				throw new AppError('Rectangle geometry undefined.');
			}
			return { ...geometry.rectangleAttributes } as GeometryAttributesMap[T];

		case 'POLYGON':
			if (
				!geometry.polygonAttributes ||
				!geometry.polygonAttributes.numSides ||
				!geometry.polygonAttributes.radius
			) {
				throw new AppError('Polygon geometry undefined.');
			}
			return { ...geometry.polygonAttributes } as GeometryAttributesMap[T];

		case 'ELLIPSE':
			if (
				!geometry.ellipseAttributes ||
				!geometry.ellipseAttributes.lengthDiameter ||
				!geometry.ellipseAttributes.widthDiameter
			) {
				throw new AppError('Ellipse geometry undefined.');
			}
			return { ...geometry.ellipseAttributes } as GeometryAttributesMap[T];
		case 'LINES':
			/**
			 * TODO: Remove this once linesCoordinates can be moved to linesAttributes.coordinates
			 */
			if (
				!geometry.linesAttributes ||
				/** @ts-expect-error as linesCoordinates is a relation and not included in the Triplit generated type.*/
				(!geometry.linesAttributes?.coordinates && !geometry.linesCoordinates)
			) {
				console;
				throw new AppError('Lines geometry undefined.');
			}

			const attributes = { ...geometry.linesAttributes };
			if (!geometry.linesAttributes.coordinates) {
				/** @ts-expect-error as linesCoordinates is a relation and not included in the Triplit generated type. */
				attributes.coordinates = geometry.linesCoordinates;
			}

			if (!attributes.coordinates || attributes.coordinates.length < 3) {
				throw new AppError('Lines geometry undefined.');
			}

			return attributes as GeometryAttributesMap[T];
	}

	/** Should not reach here. */
	throw new AppError('Geometry type undefined.');
}

/**
 * Given a history, usually a geometric or location history,
 * return the item at a given date.
 * The date need not be the exact date of an item, an item
 * is considered valid at a given date as long as it is before
 * the next item.
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

/**
 * Given a history, usually a geometric or location history,
 * return the item at a given date.
 * An item will only be returned if one exists at the same
 * day as the given date.
 * @param items a list of items to search. Assumed to be unsorted.
 * @param date The date at which to retrieve the item at.
 * @returns The item at the given date.
 */
export function historySelectDay<T extends { date: Date }>(
	items: Array<T>,
	date: Date
): T | null {
	return [...items].find((item) => isSameDay(item.date, date)) || null;
}

/**
 * Given a geometry, returns the coordinate (in meters)
 * of its vertical extent, relative to the origin of the shape.
 * @param geometry The geometry to find the height for.
 * @returns The height, in meters, of the vertical extent of the shape.
 */
export function getGeometryHeight(
	geometry: Omit<Geometry, 'id' | 'gardenId' | 'date'>
): number {
	let attributes;
	switch (geometry.type) {
		case 'RECTANGLE':
			attributes = getGeometryAttributes<'RECTANGLE'>(geometry as RectangleGeometry);
			return attributes.width / 2;

		case 'POLYGON':
			attributes = getGeometryAttributes<'POLYGON'>(geometry as PolygonGeometry);
			return attributes.radius;

		case 'ELLIPSE':
			attributes = getGeometryAttributes<'ELLIPSE'>(geometry as EllipseGeometry);
			return attributes.widthDiameter / 2;

		case 'LINES':
			attributes = getGeometryAttributes<'LINES'>(geometry as LinesGeometry);
			return Math.max(...attributes.coordinates.map((coordinate) => coordinate.y));
	}
}
