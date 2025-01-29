import type { Geometry } from '@vdt-webapp/common';

export function getGeometryResizePoints(
	geometry: Omit<Geometry, 'id' | 'gardenId' | 'date'>
): Array<{ x: number; y: number }> {}
