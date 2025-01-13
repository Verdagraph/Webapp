import * as Resizable from '$components/ui/resizable';
import { isMobile } from '$state/isMobile.svelte';
import { localStore } from '$state/localStore.svelte';
import { plantingAreaCreate } from '$data/workspaces/commands';
import useAsync from '$state/asyncHandler.svelte';
import { superForm, defaults } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { type CanvasContext, createCanvasContext } from '$components/canvas';
import { setContext, getContext } from 'svelte';

/** Workspace config persisted to local storage. */
type WorkspaceConfig = {
	/** Whether the tree pane is open. */
	treeEnabled: boolean;
	/** Whether the layout pane is open. */
	layoutEnabled: boolean;
	/** The direction of the layout/tree/toolbox panes. */
	contentPaneDirection: Resizable.Direction;
};

const workspaceContextId = 'workspaceEditorContext';
const workspaceLayoutCanvasContextId = 'workspaceLayoutCanvas';

/**
 * TODO: Disable the tree by default on small devices.
 * Once the Layout has achieved feature parity with the Tree,
 * including editing the geometry of planting areas, this may be done.
 */
const defaultTreeEnabled = isMobile() ? true : true;

/** Organize content panes vertically on narrow screens. */
const defaultContentPaneDirection = isMobile() ? 'vertical' : 'horizontal';

/**
 * Holds context for the actively opened workspace.
 */
function createWorkspaceContext() {
	/** The ID of the active workspace. */
	let activeWorkspaceId: string | null = $state(null);
	/** If true, the workspace is being edited by the user. */
	let editing: boolean = $state(false);
	/** Selected entities. */
	const selectedPlantingAreaIds: Set<string> = $state(new Set());

	/** Persisted config. */
	const config = localStore<WorkspaceConfig>('workspaceConfig', {
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

	/**
	 * Resets the context to a null state.
	 */
	function reset() {
		activeWorkspaceId = null;
		editing = false;
		plantingAreaCreateSuperform.reset();

		/** Reset the canvas. */
		const canvas = getContext<CanvasContext>(workspaceLayoutCanvasContextId);
		if (canvas) {
			canvas.destroy();
			setContext(workspaceLayoutCanvasContextId, null);
		}
	}

	/** Set a new workspace as the active one. */
	function setWorkspace(id: string) {
		reset();
		activeWorkspaceId = id;
		setContext(
			workspaceLayoutCanvasContextId,
			createCanvasContext(workspaceLayoutCanvasContextId, id)
		);
	}

	function selectPlantingArea(plantingAreaId: string) {
		/** TODO: Listen for shift keyboard event, and if not, exclusive select. */
		if (selectedPlantingAreaIds.has(plantingAreaId)) {
			selectedPlantingAreaIds.delete(plantingAreaId);
		} else {
			selectedPlantingAreaIds.add(plantingAreaId);
		}
	}

	function isPlantingAreaSelected(plantingAreaId: string): boolean {
		if (selectedPlantingAreaIds.has(plantingAreaId)) {
			return true;
		} else {
			return false;
		}
	}

	return {
		/* Getters. */
		get id(): string | null {
			return activeWorkspaceId;
		},
		get editing(): boolean {
			return editing;
		},
		get selectedPlantingAreaIds() {
			return selectedPlantingAreaIds;
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
		get layoutCanvasContext() {
			return getContext<CanvasContext>(workspaceLayoutCanvasContextId);
		},

		/* Setters. */
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
		reset,
		setWorkspace,
		selectPlantingArea,
		isPlantingAreaSelected
	};
}
export type WorkspaceContext = ReturnType<typeof createWorkspaceContext>;

export function setWorkspaceContext() {
	return setContext(workspaceContextId, createWorkspaceContext());
}

export function getWorkspaceContext() {
	return getContext<WorkspaceContext>(workspaceContextId);
}
