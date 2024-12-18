import * as Resizable from '$components/ui/resizable';
import { isMobile } from '$state/isMobile.svelte';
import { localStore } from '$state/localStore.svelte';

export const workspaceLayoutCanvasId = 'workspaceLayout'

/** Disable the tree by default on small devices. */
const defaultTreeEnabled = isMobile() ? false : true;
/** Organize content panes vertically on narrow screens. */
const defaultContentPaneDirection = isMobile() ? 'vertical' : 'horizontal';

/** The ID of the active workspace. */
let activeWorkspaceId = $state<string | null>(null);
/** If true, the workspace is being edited by the user. */
let editing = $state<boolean>(false);
/** Whether the tree pane is open. */
let treeEnabled = localStore<boolean>('workspaceTreeEnabled', defaultTreeEnabled);
/** Wether the layout pane is open. */
let layoutEnabled = localStore<boolean>('workspaceLayoutEnabled', true);
/** Controls the orientation between the content panes. */
let contentPaneDirection = localStore<Resizable.Direction>(
	'workspaceContentDirection',
	defaultContentPaneDirection
);

/* Exported state methods. */
export const activeWorkspace = {
	/* Getters. */
	get id(): string | null {
		return activeWorkspaceId;
	},
	get editing(): boolean {
		return editing;
	},
	get treeEnabled(): boolean {
		return treeEnabled.value;
	},
	get layoutEnabled(): boolean {
		return layoutEnabled.value;
	},
	get contentPaneDirection(): Resizable.Direction {
		return contentPaneDirection.value;
	},

	/* Setters. */
	set id(newVal: string | null) {
		activeWorkspaceId = newVal;
	},
	set editing(newVal: boolean) {
		editing = newVal;
	},
	set treeEnabled(newVal: boolean) {
		/* Only allow disabling the content if other content is enabled. */
		if (newVal == false && layoutEnabled.value == false) {
			return;
		}

		treeEnabled.value = newVal;
	},
	set layoutEnabled(newVal: boolean) {
		/* Only allow disabling the content if other content is enabled. */
		if (newVal == false && treeEnabled.value == false) {
			return;
		}

		layoutEnabled.value = newVal;
	},
	set contentPaneDirection(newVal: Resizable.Direction) {
		contentPaneDirection.value = newVal;
	}
};
export default activeWorkspace;
