<script lang="ts">
	import { useQuery } from '@triplit/svelte';
	import {
		getGardenSpecifcTabs,
		getGardensAnonTab,
		getTraitsTab,
		getResourcesTab,
		getAnonProfileTab,
	} from './tabs.svelte';
	import triplit from '$data/triplit';
	import {
		activeGardenQuery,
	} from '$data/gardens/queries';
	import activeGardenKey from '$state/activeGarden.svelte';
	import PrimaryNav from './PrimaryNav.svelte';

	let { children } = $props();

	/* Queries */
	let activeGarden = useQuery(
		triplit,
		activeGardenQuery.vars({ activeGardenId: activeGardenKey })
	);

	/** Retrieve the tabs. */
	let gardensTab = getGardensAnonTab()

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

<PrimaryNav {gardensTab} {gardenTabs} {profileTab} {traitsTab} {resourcesTab} {children} />