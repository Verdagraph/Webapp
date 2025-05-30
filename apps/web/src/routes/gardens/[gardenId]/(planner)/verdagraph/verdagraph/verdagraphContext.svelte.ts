import { getContext, setContext } from 'svelte';

import {
	Resizable,
	createTimelineSelection,
	isMobile,
	localStore
} from '@vdg-webapp/ui';

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
	const timeline = createTimelineSelection();

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
		timeline
	};
}
export type VerdagraphContext = ReturnType<typeof createVerdagraphContext>;

export function setVerdagraphContext() {
	return setContext(verdagraphContextId, createVerdagraphContext());
}

export function getVerdagraphContext() {
	return getContext<VerdagraphContext>(verdagraphContextId);
}
