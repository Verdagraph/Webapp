import { mode } from 'mode-watcher';
import { getContext, setContext } from 'svelte';

import {
	PlantingAreaCreateCommandSchema,
	plantingAreaCreate
} from '@vdg-webapp/models';

import {
	createSelectionManager,
	createTimelineSelection,
	getCanvasContext,
	resetCanvasContext,
	setCanvasContext
} from '$components';
import { getAppContext, isMobile } from '$state';
import { createPaneSettings } from '$state';
import createCommandHandler from '$state/commandHandler.svelte';
import { createForm } from '$state/form';

import { workspaceToolbox } from './tools';

const workspaceContextKey = 'workspaceContext';

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
export function createWorkspaceEditorContext(defaultId: string) {
	const ctx = getAppContext();

	let id = $state(defaultId);
	/** If true, the workspace is being edited by the user. */
	let editing: boolean = $state(false);
	/** Layout canvas. */
	let canvas = setCanvasContext('workspaceLayoutCanvas', defaultId, mode);
	/** Activated popout tools. */
	const toolbox = workspaceToolbox();
	/** Activated pane settings. */
	const paneSettings = createPaneSettings<['tree', 'layout']>(
		'workspacePaneSettings',
		defaultTreeEnabled ? ['tree', 'layout'] : ['layout'],
		defaultContentPaneDirection
	);
	/** Selected entities. */
	const selections = createSelectionManager(['plantingArea', 'environment']);
	/** Timeline. */
	const timelineSelection = createTimelineSelection(ctx.timeline);

	/** Forms. */
	const plantingAreaCreateHandler = createCommandHandler(plantingAreaCreate, {
		onSuccess: () => {
			toolbox.deactivate('plantingAreaCreate');
		}
	});
	const plantingAreaCreateForm = createForm(PlantingAreaCreateCommandSchema, {
		onSubmit: (data) => plantingAreaCreateHandler.execute(data, ctx.controller)
	});

	/**
	 * Resets the context to a null state.
	 */
	function reset() {
		editing = false;
		selections.resetAll();
		plantingAreaCreateForm.reset();
		canvas = resetCanvasContext('workspaceLayoutCanvas', id, mode);
	}

	return {
		get id() {
			return id;
		},
		set id(newVal) {
			id = newVal;
		},
		/* Getters. */
		get editing(): boolean {
			return editing;
		},
		get layoutCanvasContext() {
			return getCanvasContext('workspaceLayoutCanvas');
		},

		/* Setters. */
		canvas,
		toolbox,
		paneSettings,
		set editing(newVal: boolean) {
			editing = newVal;
		},
		timelineSelection,
		selections,
		plantingAreaCreateForm: {
			handler: plantingAreaCreateHandler,
			form: plantingAreaCreateForm
		},
		reset
	};
}
export type WorkspaceContext = ReturnType<typeof createWorkspaceEditorContext>;

export function setWorkspaceEditorContext(defaultId: string) {
	return setContext(workspaceContextKey, createWorkspaceEditorContext(defaultId));
}

export function getWorkspaceEditorContext() {
	return getContext<WorkspaceContext>(workspaceContextKey);
}
