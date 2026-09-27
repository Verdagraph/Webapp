<script lang="ts">
	import { QuerySubscriptionOne } from 'jazz-tools/svelte';
	import type { Snippet } from 'svelte';

	import { app } from '@vdg-webapp/models';
	import { getAppContext } from '@vdg-webapp/ui';

	import PrimaryNav from './PrimaryNav.svelte';
	import {
		getAnonProfileTab,
		getGardenSpecifcTabs,
		getGardensAnonTab,
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

	/** Retrieve the tabs. */
	let gardensTab = getGardensAnonTab();

	let gardenTabs = $derived.by(() => {
		if (activeGardenQuery.current) {
			return getGardenSpecifcTabs(activeGardenQuery.current);
		} else {
			return [];
		}
	});

	let profileTab = $derived.by(() => {
		return getAnonProfileTab();
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
