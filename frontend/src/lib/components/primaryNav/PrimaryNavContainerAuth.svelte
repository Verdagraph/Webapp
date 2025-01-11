<script lang="ts">
	import { useQuery } from '@triplit/svelte';
	import {
		getGardenSpecifcTabs,
		getGardensAuthTab,
		getTraitsTab,
		getResourcesTab,
		getAuthProfileTab
	} from './tabs.svelte';
	import type { Garden } from '@vdt-webapp/common';
	import triplit from '$data/triplit';
	import {
		activeGardenQuery,
		adminGardensQuery,
		editorGardensQuery,
		viewerGardensQuery,
		favoriteMembershipsQuery
	} from '$data/gardens/queries';
	import activeGardenId from '$state/activeGarden.svelte';
	import PrimaryNav from './PrimaryNav.svelte';

	let { children } = $props();

	/* Queries */
	let activeGarden = useQuery(
		triplit,
		activeGardenQuery.vars({ activeGardenId: activeGardenId })
	);
	let favoriteMemberships = useQuery(triplit, favoriteMembershipsQuery);
	let adminGardens = useQuery(triplit, adminGardensQuery);
	let editorGardens = useQuery(triplit, editorGardensQuery);
	let viewerGardens = useQuery(triplit, viewerGardensQuery);

	/** Retrieve the tabs. */
	let gardensTab = $derived.by(() => {
		/** Include all associated gardens ordered from favorites to viewerships. */
		const mostRelevantGardens: Garden[] = [];
		if (favoriteMemberships.results) {
			mostRelevantGardens.push(
				...(favoriteMemberships.results
					.map((membership) => membership.garden)
					.filter((garden) => garden != null) ?? [])
			);
		}
		if (adminGardens.results) {
			mostRelevantGardens.push(...adminGardens.results);
		}
		if (editorGardens.results) {
			mostRelevantGardens.push(...editorGardens.results);
		}
		if (viewerGardens.results) {
			mostRelevantGardens.push(...viewerGardens.results);
		}
		return getGardensAuthTab(mostRelevantGardens);
	});

	let gardenTabs = $derived.by(() => {
		if (activeGarden.results && activeGarden.results.length > 0) {
			return getGardenSpecifcTabs(activeGarden.results[0]);
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
