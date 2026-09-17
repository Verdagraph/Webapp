import { mode } from 'mode-watcher';
import { getContext, setContext } from 'svelte';
import { defaults, superForm } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import {
	type DraftBucket,
	PlantsCreateCommandSchema,
	draftBucketCommit,
	draftBucketCreate,
	draftBucketDiscard,
	plantsCreate
} from '@vdg-webapp/models';

import {
	type CanvasContext,
	createCanvasContext,
	createSelectionManager
} from '$components';
import { createTimelineSelection } from '$components';
import { createPaneSettings, isMobile } from '$state';
import { getAppContext } from '$state/application';
import createCommandHandler from '$state/commandHandler.svelte';

import { defaultSinglePlant } from './tools/plantsCreateFormDefaults';
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

/**
 * Holds context for the verdagraph.
 */
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

	/**
	 * The draft bucket the Add Plants tool is currently staging plants into.
	 * Lazily resolved: reuses whatever uncommitted bucket this user already
	 * started in this garden (so it survives navigation/reload), or creates
	 * one on first use.
	 */
	let draftBucket = $state<DraftBucket | null>(null);
	async function ensureDraftBucket(): Promise<DraftBucket> {
		if (draftBucket) {
			return draftBucket;
		}

		const client = await ctx.controller.getClientOrError();
		const existing = await ctx.controller.triplit.fetchOne(
			ctx.controller.triplit
				.query('draftBuckets')
				.Where('gardenId', '=', ctx.garden.id)
				.Where('creatorId', '=', client.profile.id)
				.Where('committed', '=', false)
		);
		if (existing) {
			draftBucket = existing;
			return existing;
		}

		draftBucket = await draftBucketCreate(
			{ gardenId: ctx.garden.id, name: 'Draft' },
			ctx.controller
		);
		return draftBucket;
	}
	async function commitDraftBucket() {
		if (!draftBucket) {
			return;
		}
		await draftBucketCommit(draftBucket.id, ctx.controller);
		draftBucket = null;
	}
	async function discardDraftBucket() {
		if (!draftBucket) {
			return;
		}
		await draftBucketDiscard(draftBucket.id, ctx.controller);
		draftBucket = null;
	}

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
	const plantsCreateHandler = createCommandHandler(plantsCreate);
	const plantsCreateSuperform = superForm(defaults(zod(PlantsCreateCommandSchema)), {
		SPA: true,
		dataType: 'json',
		validators: zod(PlantsCreateCommandSchema),
		/**
		 * Superforms pushes the just-validated form data back onto the store
		 * itself (independent of resetForm) once onUpdate resolves, as part of
		 * its own post-submit lifecycle - so reseeding plants[0] can't happen
		 * inside/right after onUpdate without racing that. onUpdate is made
		 * async and awaits the real plantsCreate call so that superforms' own
		 * lifecycle (including that resync) only proceeds once it's actually
		 * done; onUpdated fires strictly after that resync completes, making
		 * it the reliable place to reseed - see Form_updateFromValidation in
		 * sveltekit-superforms' client/superForm.js (rebind() runs, then
		 * onUpdated handlers are called, never the other way around).
		 */
		resetForm: false,
		async onUpdate({ form }) {
			if (form.valid) {
				await plantsCreateHandler.execute(form.data, ctx.controller);
			}
		},
		onUpdated({ form }) {
			if (form.valid && plantsCreateHandler.isSuccess && form.data.mode === 'SINGLE') {
				plantsCreateSuperform.form.update((data) => {
					data.plants = [defaultSinglePlant()];
					return data;
				});
			}
		},
		onChange() {
			plantsCreateHandler.reset();
		}
	});

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
		plantsCreateForm: {
			handler: plantsCreateHandler,
			form: plantsCreateSuperform
		},
		draftBucket: {
			get current() {
				return draftBucket;
			},
			ensure: ensureDraftBucket,
			commit: commitDraftBucket,
			discard: discardDraftBucket
		}
	};
}
export type VerdagraphContext = ReturnType<typeof createVerdagraphContext>;

export function setVerdagraphContext(params: VerdagraphContextParams) {
	return setContext(verdagraphContextId, createVerdagraphContext(params));
}

export function getVerdagraphContext() {
	return getContext<VerdagraphContext>(verdagraphContextId);
}
