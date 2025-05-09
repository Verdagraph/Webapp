import Konva from 'konva';
/**
 * Context which stores the Konva stage, container div sizing,
 * and layers.
 * @param canvasId The ID of the canvas context.
 * @returns The container context.
 */
export declare function createCanvasContainer(canvasId: string): {
	readonly containerId: string;
	readonly stage: import('konva/lib/Stage').Stage | null;
	readonly pixelsPerMeter: number;
	readonly initialized: boolean;
	width: number;
	height: number;
	initialize: () => void;
	addLayer: (layerId: string) => Konva.Layer;
	getLayer: (layerId: string) => Konva.Layer;
	onResize: () => void;
	addResizeFunction: (func: () => void) => void;
};
export default createCanvasContainer;
export type CanvasContainer = ReturnType<typeof createCanvasContainer>;
//# sourceMappingURL=container.svelte.d.ts.map
