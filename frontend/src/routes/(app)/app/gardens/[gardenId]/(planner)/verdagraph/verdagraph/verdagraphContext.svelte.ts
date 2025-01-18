import { isMobile } from '$state/isMobile.svelte';
import { setContext, getContext } from 'svelte';
import { createTimelineSelection } from '$components/timeline';

const verdagraphContextId = 'workspaceEditorContext';
const verdagraphLayoutCanvasContextId = 'workspaceLayoutCanvas';

/**
 * TODO: Disable the tree by default on small devices.
 * Once the Layout has achieved feature parity with the Tree,
 * including editing the geometry of plantings, this may be done.
 */
const defaultTreeEnabled = isMobile() ? true : true;

/** Organize content panes vertically on narrow screens. */
const defaultContentPaneDirection = isMobile() ? 'vertical' : 'horizontal';

/**
 * Holds context for the verdagraph.
 */
function createVerdagraphContext() {
	/** Selected entities. */
	const selectedPlantIds: Set<string> = $state(new Set());

	/** Timeline. */
	const timelineSelection = createTimelineSelection();

	/** Forms. */

	return {
		timelineSelection
	};
}
export type VerdagraphContext = ReturnType<typeof createVerdagraphContext>;

export function setVerdagraphContext() {
	return setContext(verdagraphContextId, createVerdagraphContext());
}

export function geVerdagraphContext() {
	return getContext<VerdagraphContext>(verdagraphContextId);
}
