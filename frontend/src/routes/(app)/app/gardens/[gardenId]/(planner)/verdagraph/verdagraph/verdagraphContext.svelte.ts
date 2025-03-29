import { setContext, getContext } from 'svelte';
import { isMobile } from '$state/isMobile.svelte';
import { localStore } from '$state/localStore.svelte';
import * as Resizable from '$components/ui/resizable';
import { createTimelineSelection } from '$components/timeline';

/** Verdagraph view config persisted to local storage. */
export type VerdagraphViewSettings = {
	/** Whether the tree pane is open. */
	treeEnabled: boolean;
	/** Whether the calendar pane is open. */
	calendarEnabled: boolean;
	/** Whether the layout pane is open. */
	layoutEnabled: boolean;

	/** Controls the orientation between the content panes. */
	contentPaneDirection: Resizable.Direction;
};

const verdagraphContextId = 'verdagraphEditorContext';
// const verdagraphLayoutCanvasContextId = 'verdagraphLayoutCanvas';

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
	/** Timeline. */
	const timelineSelection = createTimelineSelection();

	/** Persisted config. */
	const config = localStore<VerdagraphViewSettings>('verdagraphConfig', {
		treeEnabled: defaultTreeEnabled,
		calendarEnabled: true,
		layoutEnabled: true,
		contentPaneDirection: defaultContentPaneDirection
	});

	return {
		/* Getters. */
		get treeEnabled(): boolean {
			return config.value.treeEnabled;
		},
		get calendarEnabled(): boolean {
			return config.value.calendarEnabled;
		},
		get layoutEnabled(): boolean {
			return config.value.layoutEnabled;
		},
		get contentPaneDirection(): Resizable.Direction {
			return config.value.contentPaneDirection;
		},

		/** Setters. */
		set treeEnabled(newVal: boolean) {
			/* Only allow disabling the content if other content is enabled. */
			if (
				newVal == false &&
				config.value.layoutEnabled == false &&
				config.value.calendarEnabled == false
			) {
				return;
			}

			config.value.treeEnabled = newVal;
		},
		set calendarEnabled(newVal: boolean) {
			/* Only allow disabling the content if other content is enabled. */
			if (
				newVal == false &&
				config.value.treeEnabled == false &&
				config.value.layoutEnabled == false
			) {
				return;
			}

			config.value.calendarEnabled = newVal;
		},
		set layoutEnabled(newVal: boolean) {
			/* Only allow disabling the content if other content is enabled. */
			if (
				newVal == false &&
				config.value.treeEnabled == false &&
				config.value.calendarEnabled == false
			) {
				return;
			}

			config.value.layoutEnabled = newVal;
		},
		set contentPaneDirection(newVal: Resizable.Direction) {
			config.value.contentPaneDirection = newVal;
		},
		timelineSelection
	};
}
export type VerdagraphContext = ReturnType<typeof createVerdagraphContext>;

export function setVerdagraphContext() {
	return setContext(verdagraphContextId, createVerdagraphContext());
}

export function getVerdagraphContext() {
	return getContext<VerdagraphContext>(verdagraphContextId);
}
