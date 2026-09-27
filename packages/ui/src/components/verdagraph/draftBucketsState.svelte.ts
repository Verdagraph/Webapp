import { QuerySubscription, getDb } from 'jazz-tools/svelte';

import { type DraftBucket, app } from '@vdg-webapp/models';

import { type AppContext } from '$state/application';

export type ResolvedDraftBucket = DraftBucket & { creatorUsername: string | null };

/**
 * Owns the lifecycle of a garden's open DraftBuckets: the live list, which
 * one the Add Plants tool is actively staging into, and per-bucket ghost
 * visibility in Layout/Calendar.
 *
 * `onActiveBucketEnded` is a callback rather than a direct reference to the
 * plants-create form, so this file doesn't need to know that form exists -
 * verdagraphContext.svelte.ts wires the two together.
 */
export function createDraftBucketsState(
	ctx: AppContext,
	gardenId: string,
	onActiveBucketEnded: () => void
) {
	const db = getDb();

	/**
	 * Every open (uncommitted) draft bucket in this garden - every plan
	 * currently under consideration by any user, not just this one. Drives
	 * both the Add Plants tool's bucket switcher and the Layout/Calendar
	 * ghost-visibility toggle.
	 */
	const openDraftBucketsQuery = new QuerySubscription(() =>
		gardenId ? app.draftBuckets.where({ gardenId, committed: false }) : undefined
	);
	const rawDraftBuckets = $derived(openDraftBucketsQuery.current ?? []);

	/**
	 * Jazz has no relation-include like Triplit's `.Include('creator')`, so
	 * each bucket's creator username is resolved manually.
	 */
	let draftBucketsList: ResolvedDraftBucket[] = $state([]);
	$effect(() => {
		const buckets = rawDraftBuckets;
		if (buckets.length === 0) {
			draftBucketsList = [];
			return;
		}
		Promise.all(
			buckets.map(async (bucket): Promise<ResolvedDraftBucket> => {
				const creator = bucket.creatorId
					? await db.one(app.users.where({ id: bucket.creatorId }))
					: null;
				return { ...bucket, creatorUsername: creator?.username ?? null };
			})
		).then((resolved) => {
			draftBucketsList = resolved;
		});
	});

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
		const created = await ctx.controller.draftBucketCreate({ gardenId, name });
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
		await ctx.controller.draftBucketCommit(bucketId);
		if (activeDraftBucketId === bucketId) {
			activeDraftBucketId = null;
			onActiveBucketEnded();
		}
	}
	async function discardDraftBucket(bucketId: string) {
		await ctx.controller.draftBucketDiscard(bucketId);
		if (activeDraftBucketId === bucketId) {
			activeDraftBucketId = null;
			onActiveBucketEnded();
		}
	}

	return {
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
	};
}
export type DraftBucketsState = ReturnType<typeof createDraftBucketsState>;
