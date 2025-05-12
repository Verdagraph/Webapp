<script lang="ts">
	import { useQuery } from '@triplit/svelte';
	import type { Snippet } from 'svelte';

	import type { Garden } from '@vdg-webapp/models';

	import {
		adminGardensQuery,
		editorGardensQuery,
		favoriteMembershipsQuery,
		gardenQuery,
		viewerGardensQuery
	} from '$data/gardens/queries';
	import triplit from '$data/triplit';
	import gardenContext from '$state/gardenContext.svelte';

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

	/* Queries */
	let activeGarden = $derived(
		useQuery(triplit, gardenQuery.Vars({ id: gardenContext.id }))
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
		if (activeGarden.results && activeGarden.results[0]) {
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
