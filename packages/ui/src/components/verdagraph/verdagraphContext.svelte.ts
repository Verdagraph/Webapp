import { mode } from 'mode-watcher';
import { getContext, setContext } from 'svelte';

import {
	type CanvasContext,
	createCanvasContext,
	createSelectionManager
} from '$components';
import { createTimelineSelection } from '$components';
import { createPaneSettings, isMobile } from '$state';
import { getAppContext } from '$state/application';

import { createDraftBucketsState } from './draftBucketsState.svelte';
import { createPlantsCreateFormState } from './plantsCreateFormState.svelte';
import { verdagraphToolbox } from './tools';

const verdagraphContextId = 'verdagraphEditorContext';
const verdagraphLayoutCanvasContextId = 'verdagraphLayoutCanvas';

/**
 * TODO: Disable the tree by default on small devices.
 * Once the Layout has achieved feature parity with the Tree,
 * including editing the geometry of plantings, this may be done.
 */
const defaultTreeEnabled = isMobile() ? true : true;

/** Organize content panes vertically on narrow screens. */
const defaultContentPaneDirection = isMobile() ? 'vertical' : 'horizontal';

export type VerdagraphContextParams = {
	defaultSelectedWorkspaceId: string;
};

export function createVerdagraphContext(params: VerdagraphContextParams) {
	/** Controller reference. */
	const ctx = getAppContext();

	const paneSettings = createPaneSettings<['tree', 'calendar', 'layout']>(
		'verdagraphPaneSettings',
		defaultTreeEnabled ? ['tree', 'calendar', 'layout'] : ['calendar', 'layout'],
		defaultContentPaneDirection
	);
	const toolbox = verdagraphToolbox();
	/** Timeline. */
	const timeline = createTimelineSelection(ctx.timeline);
	/** Selected entities. */
	const selections = createSelectionManager(['workspace', 'plantingArea', 'plants']);
	selections.select('workspace', params.defaultSelectedWorkspaceId);

	/** Editing. */
	const editing = $derived(
		ctx.garden.role == 'ADMIN' || ctx.garden.role == 'EDITOR' ? true : false
	);

	/** Canvas context. */
	setContext(
		verdagraphLayoutCanvasContextId,
		createCanvasContext(
			verdagraphLayoutCanvasContextId,
			params.defaultSelectedWorkspaceId,
			mode
		)
	);

	/** Forms. */
	const plantsCreateForm = createPlantsCreateFormState(ctx, () => timeline.focusUtc);

	/** Draft buckets. */
	const draftBuckets = createDraftBucketsState(ctx, ctx.garden.id, () =>
		plantsCreateForm.resetActiveStamp()
	);

	return {
		/* Getters. */
		get layoutCanvasContext() {
			return getContext<CanvasContext>(verdagraphLayoutCanvasContextId);
		},
		get editing() {
			return editing;
		},

		/** Setters. */
		paneSettings,
		timeline,
		selections,
		toolbox,
		plantsCreateForm,
		draftBuckets
	};
}
export type VerdagraphContext = ReturnType<typeof createVerdagraphContext>;

export function setVerdagraphContext(params: VerdagraphContextParams) {
	return setContext(verdagraphContextId, createVerdagraphContext(params));
}

export function getVerdagraphContext() {
	return getContext<VerdagraphContext>(verdagraphContextId);
}
