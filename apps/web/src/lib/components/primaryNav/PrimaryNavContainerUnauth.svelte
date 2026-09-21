<script lang="ts">
	import { useQuery } from '@triplit/svelte';
	import type { Snippet } from 'svelte';

	import { getAppContext } from '@vdg-webapp/ui';

	import { gardenQuery } from '$data/gardens/queries';
	import triplit from '$data/triplit';

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
	let activeGarden = useQuery(triplit, gardenQuery.Vars({ id: ctx.garden.id }));

	/** Retrieve the tabs. */
	let gardensTab = getGardensAnonTab();

	let gardenTabs = $derived.by(() => {
		if (activeGarden.results && activeGarden.results.length > 0) {
			return getGardenSpecifcTabs(activeGarden.results[0]);
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
