<script lang="ts">
	import { QuerySubscriptionOne } from 'jazz-tools/svelte';
	import type { Snippet } from 'svelte';

	import { app } from '@vdg-webapp/models';
	import { getAppContext } from '@vdg-webapp/ui';

	import { createGardenMembershipLists } from '$state/gardenMemberships.svelte';

	import PrimaryNav from './PrimaryNav.svelte';
	import {
		getAuthProfileTab,
		getGardenSpecifcTabs,
		getGardensAuthTab,
		getResourcesTab,
		getTraitsTab
	} from './tabs.svelte';

	type Props = {
		children: Snippet;
	};
	let { children }: Props = $props();

	const ctx = getAppContext();

	/* Queries */
	const activeGardenQuery = new QuerySubscriptionOne(() =>
		ctx.garden.id ? app.gardens.where({ slug: ctx.garden.id }) : undefined
	);
	const memberships = createGardenMembershipLists();

	/** Retrieve the tabs. */
	let gardensTab = $derived.by(() => {
		/** Include all associated gardens ordered from favorites to viewerships. */
		const mostRelevantGardens = [
			...memberships.favoriteGardens,
			...memberships.adminGardens,
			...memberships.editorGardens,
			...memberships.viewerGardens
		];
		return getGardensAuthTab(mostRelevantGardens);
	});

	let gardenTabs = $derived.by(() => {
		if (activeGardenQuery.current) {
			return getGardenSpecifcTabs(activeGardenQuery.current);
		} else {
			return [];
		}
	});

	let profileTab = $derived.by(() => {
		return getAuthProfileTab();
	});

	const traitsTab = getTraitsTab();
	const resourcesTab = getResourcesTab();
</script>

<PrimaryNav
	{gardensTab}
	{gardenTabs}
	{profileTab}
	{traitsTab}
	{resourcesTab}
	{children}
/>
