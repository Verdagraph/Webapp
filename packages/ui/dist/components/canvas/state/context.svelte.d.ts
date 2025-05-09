export * from './transform.svelte';
/**
 * The Canvas Context provides access to all canvas state
 * that must be shared amongst components.
 * Note that one canvas represents one workspace.
 * @param canvasId Unique identifier for this canvas.
 * @param canvasWorkspaceId The ID of the workspace represented in the canvas.
 * @returns The canvas contexts.
 */
export declare function createCanvasContext(
	canvasContextId: string,
	canvasWorkspaceId: string
): {
	readonly canvasId: string;
	readonly workspaceId: string;
	transform: {
		config: {
			buttonsExpanded: boolean;
			buttonsPosition: 'tl' | 'tr' | 'br' | 'bl';
		};
		scaleFactor: import('konva/lib/types').Vector2d;
		position: import('konva/lib/types').Vector2d;
		canvasXPos: (modelPos: number) => number;
		modelXPos: (canvasPos: number) => number;
		canvasYPos: (modelPos: number) => number;
		modelYPos: (canvasPos: number) => number;
		canvasDistance: (modelDistance: number) => number;
		modelDistance: (canvasDistance: number) => number;
		translate: (translation: import('konva/lib/types').Vector2d) => void;
		addScale: (scale: number) => void;
		reset: () => void;
		addTransformFunction: (func: () => void) => void;
		initialize: () => void;
	};
	container: {
		readonly containerId: string;
		readonly stage: import('konva/lib/Stage').Stage | null;
		readonly pixelsPerMeter: number;
		readonly initialized: boolean;
		width: number;
		height: number;
		initialize: () => void;
		addLayer: (layerId: string) => import('konva').default.Layer;
		getLayer: (layerId: string) => import('konva').default.Layer;
		onResize: () => void;
		addResizeFunction: (func: () => void) => void;
	};
	selectionGroup: {
		setDocumentCursor: () => void;
	};
	gridManager: {
		config: {
			snapToGrid: boolean;
			rightAngleConstraint: boolean;
			metersPerBackgroundGridline: number;
		};
		initialize: () => void;
		snapToGrid: (
			pos: import('konva/lib/types').Vector2d
		) => import('konva/lib/types').Vector2d;
	};
	initialize: () => void;
	destroy: () => void;
};
export default createCanvasContext;
export type CanvasContext = ReturnType<typeof createCanvasContext>;
//# sourceMappingURL=context.svelte.d.ts.map
