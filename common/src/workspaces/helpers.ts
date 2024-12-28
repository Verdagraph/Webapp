import { AppError } from '../errors';
import type { Coordinate, Geometry, GeometryAttributesMap, LocationHistory, Location } from './schema';


/**
 * Returns the attributs from the geometry based on its type.
 * Throws an error if the attributes are undefined.
 * @param geometry The geometry to extract from.
 * @returns The attributes.
 */
export function getGeometryAttributes<T extends Geometry['type']>(
	geometry: Extract<Geometry, {type: T}>
): GeometryAttributesMap[T] {
	switch (geometry.type) {
		case 'RECTANGLE':
			if (!geometry.rectangleAttributes) {
				throw new AppError('Rectangle geometry undefined.')
			}
			return geometry.rectangleAttributes as GeometryAttributesMap[T]

		case 'POLYGON':
			if (!geometry.polygonAttributes) {
				throw new AppError('Polygon geometry undefined.')
			}
			return geometry.polygonAttributes  as GeometryAttributesMap[T]

		case 'ELLIPSE':
			if (!geometry.ellipseAttributes) {
				throw new AppError('Ellipse geometry undefined.')
			}
			return geometry.ellipseAttributes  as GeometryAttributesMap[T]
		case 'LINES':
			if (!geometry.linesAttributes) {
				throw new AppError('Lines geometry undefined.')
			}
			return geometry.linesAttributes  as GeometryAttributesMap[T]
	}

	/** Should not reach here. */
	throw new AppError('Geometry type undefined.')
};

/**
 * Given a location history, return the location at a given date.  
 * @param locationHistory The location history to search.
 * @param date The date at which to retrieve the location at.
 * @returns The location at the given date.
 */
export function getLocationAtDate(locationHistory: LocationHistory, date: Date): Location {
}