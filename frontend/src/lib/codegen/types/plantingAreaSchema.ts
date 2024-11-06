/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * VerdanTech-Backend
 * Backend API of the VerdanTech software project.
 * OpenAPI spec version: 0.1.0
 */
import type { PlantingAreaSchemaDepth } from './plantingAreaSchemaDepth';
import type { GeometricHistorySchema } from './geometricHistorySchema';
import type { LocationHistorySchema } from './locationHistorySchema';

export interface PlantingAreaSchema {
	depth?: PlantingAreaSchemaDepth;
	description: string;
	geometries: GeometricHistorySchema;
	id: string;
	location_history: LocationHistorySchema;
	movable: boolean;
	name: string;
}
