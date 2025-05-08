import createCanvasContainer from './container.svelte';
import createCanvasTransform from './transform.svelte';
import createSelectionGroup from './selectionGroup.svelte';
import createCanvasGridManager from './grid.svelte';

export * from './transform.svelte';

/**
 * The Canvas Context provides access to all canvas state
 * that must be shared amongst components.
 * Note that one canvas represents one workspace.
 * @param canvasId Unique identifier for this canvas.
 * @param canvasWorkspaceId The ID of the workspace represented in the canvas.
 * @returns The canvas contexts.
 */
export function createCanvasContext(
	canvasContextId: string,
	canvasWorkspaceId: string
) {
	const canvasId = canvasContextId;
	const workspaceId = canvasWorkspaceId;

	/** Sub-contexts. */
	const container = createCanvasContainer(canvasId);
	const transform = createCanvasTransform(container);
	const selectionGroup = createSelectionGroup(container);
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

	/**
	 * Destroy the canvas.
	 */
	function destroy() {
		if (container.stage) {
			container.stage.destroy();
		}
	}

	return {
		get canvasId() {
			return canvasId;
		},
		get workspaceId() {
			return workspaceId;
		},
		transform,
		container,
		selectionGroup,
		gridManager,
		initialize,
		destroy
	};
}
export default createCanvasContext;

export type CanvasContext = ReturnType<typeof createCanvasContext>;
