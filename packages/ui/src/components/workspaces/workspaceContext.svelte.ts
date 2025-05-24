import { getContext, setContext } from 'svelte';
import { defaults, superForm } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import {
	type CanvasContext,
	Resizable,
	createCanvasContext,
	createSelectionManager,
	createTimelineSelection,
	isMobile,
	localStore
} from '@vdg-webapp/ui';

import { plantingAreaCreate } from '$data/workspaces/commands';
import { createPaneSettings } from '$state';
import createCommandHandler from '$state/commandHandler.svelte';

import { workspaceToolbox } from './tools';

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
 * Holds context for a workspace editor.
 */
export function createWorkspaceContext() {
	const toolbox = workspaceToolbox();
	const paneSettings = createPaneSettings<['tree', 'layout']>(
		'workspacePaneSettings',
		defaultTreeEnabled ? ['tree', 'layout'] : ['tree', 'layout'],
		defaultContentPaneDirection
	);
	/** If true, the workspace is being edited by the user. */
	let editing: boolean = $state(false);
	/** Selected entities. */
	const selections = createSelectionManager(['plantingArea', 'environment']);

	/** Timeline. */
	const timelineSelection = createTimelineSelection();

	/** Forms. */
	const plantingAreaCreateHandler = createCommandHandler(plantingAreaCreate.mutation, {
		onSuccess: () => {
			toolbox.deactivate('plantingAreaCreate');
		}
	});
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
		editing = false;
		selections.resetAll();
		plantingAreaCreateSuperform.reset();

		/** Reset the canvas. */
		const canvas = getContext<CanvasContext>(workspaceLayoutCanvasContextId);
		if (canvas) {
			canvas.destroy();
			setContext(workspaceLayoutCanvasContextId, null);
		}
	}

	return {
		/* Getters. */
		get editing(): boolean {
			return editing;
		},
		get layoutCanvasContext() {
			return getContext<CanvasContext>(workspaceLayoutCanvasContextId);
		},

		/* Setters. */
		toolbox,
		paneSettings,
		set editing(newVal: boolean) {
			editing = newVal;
		},
		timelineSelection,
		selections,
		plantingAreaCreateForm: {
			handler: plantingAreaCreateHandler,
			form: plantingAreaCreateSuperform
		},
		reset
	};
}
export type WorkspaceContext = ReturnType<typeof createWorkspaceContext>;

export function setWorkspaceContext() {
	return setContext(workspaceContextId, createWorkspaceContext());
}

export function getWorkspaceContext() {
	return getContext<WorkspaceContext>(workspaceContextId);
}
