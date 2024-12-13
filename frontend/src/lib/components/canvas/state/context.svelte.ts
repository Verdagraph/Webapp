import createCanvasContainer from './container.svelte';
import createCanvasTransform from './transform.svelte';
import createCanvasGrid from './grid.svelte';

export * from './transform.svelte';

export function createCanvasContext(canvasId: string) {
	/** Sub-contexts. */
	const container = createCanvasContainer(canvasId);
	const transform = createCanvasTransform(container);
	const grid = createCanvasGrid(container, transform);

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
		grid,
		initialize
	};
}
export default createCanvasContext;

export type CanvasContext = ReturnType<typeof createCanvasContext>;
