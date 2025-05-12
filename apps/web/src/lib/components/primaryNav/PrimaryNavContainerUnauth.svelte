<script lang="ts">
	import { useQuery } from '@triplit/svelte';
	import type { Snippet } from 'svelte';

	import { gardenQuery } from '$data/gardens/queries';
	import triplit from '$data/triplit';
	import gardenContext from '$state/gardenContext.svelte';

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

	/* Queries */
	let activeGarden = useQuery(triplit, gardenQuery.Vars({ id: gardenContext.id }));

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
