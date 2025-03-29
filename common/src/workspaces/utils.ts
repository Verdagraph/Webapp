import type { Geometry } from './schema';

/**
 * Checks whether two dates are on the same day or not.
 * Dates must be in the same timezone.
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
	geometry: Omit<Geometry, 'id' | 'gardenId' | 'linesCoordinateIds' | 'date'>
): number {
	switch (geometry.type) {
		case 'RECTANGLE':
			return (geometry.rectangleWidth / 2) * geometry.scaleFactor;

		case 'POLYGON':
			return geometry.polygonRadius * geometry.scaleFactor;

		case 'ELLIPSE':
			return (geometry.ellipseWidth / 2) * geometry.scaleFactor;

		case 'LINES':
			return (
				Math.max(...geometry.linesCoordinates.map((coordinate) => coordinate.y)) *
				geometry.scaleFactor
			);
	}
}
