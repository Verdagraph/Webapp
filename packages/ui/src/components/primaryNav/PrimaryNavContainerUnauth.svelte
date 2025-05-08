<script lang="ts">
	import { useQuery } from '@triplit/svelte';
	import {
		getGardenSpecifcTabs,
		getGardensAnonTab,
		getTraitsTab,
		getResourcesTab,
		getAnonProfileTab
	} from './tabs.svelte';
	import triplit from '$data/triplit';
	import { gardenQuery } from '$data/gardens/queries';
	import gardenContext from '$state/gardenContext.svelte';
	import PrimaryNav from './PrimaryNav.svelte';

	let { children } = $props();

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
