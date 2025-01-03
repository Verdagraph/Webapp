import * as Resizable from '$components/ui/resizable';
import { isMobile } from '$state/isMobile.svelte';
import { localStore } from '$state/localStore.svelte';
import { plantingAreaCreate } from '$data/workspaces/commands';
import { useAsync } from '$components/forms';
import { superForm, defaults } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const workspaceLayoutCanvasId = 'workspaceLayoutCanvas';
export const workspaceContextId = 'workspaceContext';

/** Disable the tree by default on small devices. */
const defaultTreeEnabled = isMobile() ? false : true;
/** Organize content panes vertically on narrow screens. */
const defaultContentPaneDirection = isMobile() ? 'vertical' : 'horizontal';

type WorkspaceConfig = {
	/** Whether the tree pane is open. */
	treeEnabled: boolean;
	layoutEnabled: boolean;
	contentPaneDirection: Resizable.Direction;
};

/**
 * Holds context for the actively opened workspace.
 */
export function createWorkspaceContext() {
	/** The ID of the active workspace. */
	let activeWorkspaceId = $state<string | null>(null);
	/** If true, the workspace is being edited by the user. */
	let editing = $state<boolean>(false);
	let config = localStore<WorkspaceConfig>('workspaceConfig', {
		treeEnabled: defaultTreeEnabled,
		layoutEnabled: true,
		contentPaneDirection: defaultContentPaneDirection
	});

	/** Forms. */
	const plantingAreaCreateHandler = useAsync(plantingAreaCreate.mutation);
	const plantingAreaCreateSuperform = superForm(
		defaults(zod(plantingAreaCreate.schema)),
		{
			SPA: true,
			dataType: 'json',
			validators: zod(plantingAreaCreate.schema),
			onUpdate({ form }) {
				if (form.valid) {
					plantingAreaCreateHandler.execute(form.data);
				}
			},
			onChange() {
				plantingAreaCreateHandler.reset();
			}
		}
	);

	function reset() {
		activeWorkspaceId = null;
		editing = false;
		plantingAreaCreateSuperform.reset();
	}

	return {
		/* Getters. */
		get id(): string | null {
			return activeWorkspaceId;
		},
		get editing(): boolean {
			return editing;
		},
		get treeEnabled(): boolean {
			return config.value.treeEnabled;
		},
		get layoutEnabled(): boolean {
			return config.value.layoutEnabled;
		},
		get contentPaneDirection(): Resizable.Direction {
			return config.value.contentPaneDirection;
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
			if (newVal == false && config.value.layoutEnabled == false) {
				return;
			}

			config.value.treeEnabled = newVal;
		},
		set layoutEnabled(newVal: boolean) {
			/* Only allow disabling the content if other content is enabled. */
			if (newVal == false && config.value.treeEnabled == false) {
				return;
			}

			config.value.layoutEnabled = newVal;
		},
		set contentPaneDirection(newVal: Resizable.Direction) {
			config.value.contentPaneDirection = newVal;
		},

		plantingAreaCreateForm: {
			handler: plantingAreaCreateHandler,
			form: plantingAreaCreateSuperform
		},
		reset
	};
}
export type WorkspaceContext = ReturnType<typeof createWorkspaceContext>;
