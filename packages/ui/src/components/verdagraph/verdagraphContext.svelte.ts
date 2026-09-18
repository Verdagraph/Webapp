import { useQuery } from '@triplit/svelte';
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
	 * Every open (uncommitted) draft bucket in this garden - every plan
	 * currently under consideration by any user, not just this one. Drives
	 * both the Add Plants tool's bucket switcher and the Layout/Calendar
	 * ghost-visibility toggle.
	 */
	const openDraftBucketsQuery = $derived(
		useQuery(
			ctx.controller.triplit,
			ctx.controller.triplit
				.query('draftBuckets')
				.Where('gardenId', '=', ctx.garden.id)
				.Where('committed', '=', false)
				.Include('creator')
		)
	);
	const draftBucketsList = $derived(openDraftBucketsQuery.results ?? []);

	/** The bucket the Add Plants tool is currently staging new stamps into. */
	let activeDraftBucketId: string | null = $state(null);
	const activeDraftBucket = $derived(
		draftBucketsList.find((bucket) => bucket.id === activeDraftBucketId) ?? null
	);

	/**
	 * Which buckets' plants should render as ghosts in Layout/Calendar,
	 * besides the active bucket (which always renders regardless of this
	 * set - you should never lose sight of what you're actively placing).
	 * Seeded automatically the first time a bucket you created is seen, so
	 * your own plans show by default; other users' plans need an explicit
	 * opt-in, so their drafts don't clutter your view uninvited.
	 */
	let visibleDraftBucketIds = $state(new Set<string>());
	const autoVisibilitySeenBucketIds = new Set<string>();
	$effect(() => {
		const myProfileId = ctx.client.profile?.id;
		if (!myProfileId) {
			return;
		}
		const next = new Set(visibleDraftBucketIds);
		let changed = false;
		for (const bucket of draftBucketsList) {
			if (autoVisibilitySeenBucketIds.has(bucket.id)) {
				continue;
			}
			autoVisibilitySeenBucketIds.add(bucket.id);
			if (bucket.creatorId === myProfileId) {
				next.add(bucket.id);
				changed = true;
			}
		}
		if (changed) {
			visibleDraftBucketIds = next;
		}
	});

	function isDraftBucketVisible(bucketId: string): boolean {
		return bucketId === activeDraftBucketId || visibleDraftBucketIds.has(bucketId);
	}
	function toggleDraftBucketVisibility(bucketId: string) {
		const next = new Set(visibleDraftBucketIds);
		if (next.has(bucketId)) {
			next.delete(bucketId);
		} else {
			next.add(bucketId);
		}
		visibleDraftBucketIds = next;
	}

	function setActiveDraftBucket(bucketId: string | null) {
		activeDraftBucketId = bucketId;
	}

	/** Starts a brand new draft bucket and makes it active. */
	async function createDraftBucket(name = 'Draft'): Promise<DraftBucket> {
		const created = await draftBucketCreate({ gardenId: ctx.garden.id, name }, ctx.controller);
		activeDraftBucketId = created.id;
		return created;
	}

	/**
	 * Ensures a bucket is active before staging a stamp: reuses this user's
	 * own open bucket if one already exists and none is explicitly active
	 * yet (so reopening the tool resumes where you left off), otherwise
	 * starts a fresh one.
	 */
	async function ensureActiveDraftBucket(): Promise<DraftBucket> {
		if (activeDraftBucket) {
			return activeDraftBucket;
		}

		const myProfileId = (await ctx.controller.getClientOrError()).profile.id;
		const mine = draftBucketsList.find((bucket) => bucket.creatorId === myProfileId);
		if (mine) {
			activeDraftBucketId = mine.id;
			return mine;
		}

		return createDraftBucket();
	}

	async function commitDraftBucket(bucketId: string) {
		await draftBucketCommit(bucketId, ctx.controller);
		if (activeDraftBucketId === bucketId) {
			activeDraftBucketId = null;
		}
	}
	async function discardDraftBucket(bucketId: string) {
		await draftBucketDiscard(bucketId, ctx.controller);
		if (activeDraftBucketId === bucketId) {
			activeDraftBucketId = null;
		}
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
		/**
		 * Stamp-style continuation: the next stamp starts as a copy of the one
		 * just submitted (same cultivar, same geometry, same location), so
		 * placing a run of the same plant is drag-to-nudge rather than
		 * re-pick/re-place/re-size from scratch every time. Only the dates
		 * are refreshed to the current timeline focus, since the submitted
		 * ones belong to the plant that just got created.
		 */
		onUpdated({ form }) {
			if (form.valid && plantsCreateHandler.isSuccess && form.data.mode === 'SINGLE') {
				const submitted = form.data.plants[0];
				const focusedDay = timeline.focusUtc;
				const carriedGeometry = submitted?.geometryHistory?.geometries[0];
				const carriedLocation = submitted?.locationHistory?.locations[0];
				plantsCreateSuperform.form.update((data) => {
					data.plants = [
						defaultSinglePlant({
							cultivarName: submitted?.cultivarName,
							geometryHistory: carriedGeometry
								? {
										gardenId: ctx.garden.id,
										geometries: [{ ...carriedGeometry, date: focusedDay }]
									}
								: undefined,
							locationHistory: carriedLocation
								? {
										gardenId: ctx.garden.id,
										locations: [{ ...carriedLocation, date: focusedDay }]
									}
								: undefined
						})
					];
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
		draftBuckets: {
			get list() {
				return draftBucketsList;
			},
			get active() {
				return activeDraftBucket;
			},
			/**
			 * The active bucket's id, set as soon as it's chosen (create/switch),
			 * even before that bucket's own data has round-tripped through the
			 * live list query. Distinguishing "an id is chosen" from "active is
			 * resolved" matters: a consumer that treats a momentarily-null
			 * `active` as "nothing chosen yet" would re-trigger ensureActive()
			 * during that gap and stomp right back onto whatever bucket it
			 * resumes, undoing a just-made switch/create.
			 */
			get activeId() {
				return activeDraftBucketId;
			},
			setActive: setActiveDraftBucket,
			ensureActive: ensureActiveDraftBucket,
			createNew: createDraftBucket,
			commit: commitDraftBucket,
			discard: discardDraftBucket,
			isVisible: isDraftBucketVisible,
			toggleVisible: toggleDraftBucketVisibility
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
