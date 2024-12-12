import createCanvasContainer from './container.svelte';
import createCanvasTransform from './transform.svelte';
import createCanvasGrid from './grid.svelte';

export * from './transform.svelte';

export function createCanvasContext(canvasId: string) {
	/** Sub-contexts. */
	const container = createCanvasContainer(canvasId);
	const transform = createCanvasTransform(container);
	const grid = createCanvasGrid(container);

	return {
		transform,
		container,
		grid
	};
}
export default createCanvasContext;

export type CanvasContext = ReturnType<typeof createCanvasContext>;
