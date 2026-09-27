import { QuerySubscription, getDb, getSession } from 'jazz-tools/svelte';

import { type Garden, type GardenMembership, app } from '@vdg-webapp/models';

/**
 * Every garden this session's account has favorited, administers, edits, or
 * views, plus this account's pending (non-accepted) garden membership
 * invites - the data both the gardens list page and the primary nav need to
 * render garden categories and the invites popover.
 */
export function createGardenMembershipLists() {
	const db = getDb();
	const session = getSession();
	const accountId = $derived(session.current?.user.account ?? null);

	const favoriteMembershipsQuery = new QuerySubscription(() =>
		accountId
			? app.gardenMemberships.where({ favorite: true, userId: accountId })
			: undefined
	);
	const rawFavoriteMemberships = $derived(favoriteMembershipsQuery.current ?? []);

	/**
	 * Jazz has no relation-include like Triplit's `.Include('garden')`, so
	 * each favorited membership's garden is resolved manually.
	 */
	let favoriteGardens: Garden[] = $state([]);
	$effect(() => {
		const memberships = rawFavoriteMemberships;
		if (memberships.length === 0) {
			favoriteGardens = [];
			return;
		}
		Promise.all(
			memberships.map((membership) =>
				db.one(app.gardens.where({ id: membership.gardenId }))
			)
		).then((gardens) => {
			favoriteGardens = gardens.filter((garden): garden is Garden => garden != null);
		});
	});

	const adminGardensQuery = new QuerySubscription(() =>
		accountId ? app.gardens.where({ adminIds: { contains: accountId } }) : undefined
	);
	const editorGardensQuery = new QuerySubscription(() =>
		accountId ? app.gardens.where({ editorIds: { contains: accountId } }) : undefined
	);
	const viewerGardensQuery = new QuerySubscription(() =>
		accountId ? app.gardens.where({ viewerIds: { contains: accountId } }) : undefined
	);

	const pendingInvitesQuery = new QuerySubscription(() =>
		accountId
			? app.gardenMemberships.where({
					userId: accountId,
					status: { ne: 'ACCEPTED' }
				})
			: undefined
	);

	return {
		get favoriteGardens(): Garden[] {
			return favoriteGardens;
		},
		get adminGardens(): Garden[] {
			return adminGardensQuery.current ?? [];
		},
		get editorGardens(): Garden[] {
			return editorGardensQuery.current ?? [];
		},
		get viewerGardens(): Garden[] {
			return viewerGardensQuery.current ?? [];
		},
		get pendingInvites(): GardenMembership[] {
			return pendingInvitesQuery.current ?? [];
		},
		get pendingInvitesLoading(): boolean {
			return pendingInvitesQuery.isLoading;
		}
	};
}
export type GardenMembershipLists = ReturnType<typeof createGardenMembershipLists>;
