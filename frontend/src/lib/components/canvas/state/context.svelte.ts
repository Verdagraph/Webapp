import createCanvasContainer from './container.svelte';
import createCanvasTransform from './transform.svelte';
import createCanvasGridManager from './grid.svelte';

export * from './transform.svelte';

/**
 * The Canvas Context provides access to all canvas state
 * that must be shared amongst components.
 * @param canvasId Unique identifier for this canvas.
 * @returns The canvas contexts.
 */
export function createCanvasContext(canvasId: string) {
	/** Sub-contexts. */
	const container = createCanvasContainer(canvasId);
	const transform = createCanvasTransform(container);
	const gridManager = createCanvasGridManager(container, transform);

	/**
	 * Initialize sub-contexts.
	 * Where applicable, sub-contexts are initialized by their
	 * associated component. Otherwise, they are initialized here.
	 */
	function initialize() {
		container.initialize();
		transform.initialize();
	}

	return {
		transform,
		container,
		gridManager,
		initialize
	};
}
export default createCanvasContext;

export type CanvasContext = ReturnType<typeof createCanvasContext>;
