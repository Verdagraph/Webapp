import type { Vector2d } from 'konva/lib/types';
import { type GeometryUpdateCommand, type Geometry } from '@vdg-webapp/models';
type Props = {
	/** The ID of the canvas. */
	canvasId: string;
	/** The ID of the layer which holds the planting areas. */
	plantingAreaLayerId: string;
	/** Name of the planting area. Can be disabled */
	name: string;
	showName: boolean;
	/** The current position of the planting area in the workspace, in model quantity (meters). */
	position: Vector2d | null;
	/** The geometry of the planting area. */
	geometry: Omit<Geometry, 'id' | 'gardenId' | 'linesCoordinateIds'>;
	/** If true, the planting area may be moved and resized. */
	editable: boolean;
	/** If true, the planting area is selected. */
	selected: boolean;
	/** The grid attributes of the planting area. */
	grid?: {
		numRows: number;
		numCols: number;
	};
	/** Called when the position is moved in the canvas. */
	onTranslate?: (
		/** The new position, in canvas quantity (pixels). */
		newPos: Vector2d,
		/** If true, the movement has ended (dragend).*/
		movementOver: boolean
	) => void;
	/** Called when the geometry is transformed in the canvas. */
	onTransform?: (
		/** The updated geometry attributes after transformation. */
		newGeometry: GeometryUpdateCommand,
		/** If true, the transform has ended.*/
		transformOver: boolean
	) => void;
	/** Called when the planting area is clicked. */
	onClick?: () => void;
};
declare const PlantingArea: import('svelte').Component<Props, {}, ''>;
type PlantingArea = ReturnType<typeof PlantingArea>;
export default PlantingArea;
//# sourceMappingURL=PlantingArea.svelte.d.ts.map
