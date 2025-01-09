<script lang="ts">
	import { useQuery } from '@triplit/svelte';
	import {
		getGardenSpecifcTabs,
		getGardensAuthTab,
		getGardensAnonTab,
		getTraitsTab,
		getResourcesTab,
		getAuthProfileTab,
		getAnonProfileTab
	} from './tabs.svelte';
	import type { Garden } from '@vdt-webapp/common';
	import Sidebar from './Sidebar.svelte';
	import Bottombar from './Bottombar.svelte';
	import { IsMobile } from '$lib/state/isMobile.svelte';
	import triplit from '$data/triplit';
	import {
		activeGardenQuery,
		adminGardensQuery,
		editorGardensQuery,
		viewerGardensQuery,
		favoriteMembershipsQuery
	} from '$data/gardens/queries';
	import activeGardenKey from '$state/activeGarden.svelte';
	import auth from '$state/auth.svelte';

	let { children } = $props();

	/* Queries */
	let activeGarden = useQuery(
		triplit,
		activeGardenQuery.vars({ activeGardenId: activeGardenKey })
	);
	let favoriteMemberships = useQuery(triplit, favoriteMembershipsQuery);
	let adminGardens = useQuery(triplit, adminGardensQuery);
	let editorGardens = useQuery(triplit, editorGardensQuery);
	let viewerGardens = useQuery(triplit, viewerGardensQuery);

	/** Retrieve the tabs. */
	let gardensTab = $derived.by(() => {
		if (!auth.isAuthenticated) {
			return getGardensAnonTab();
		}

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
		if (auth.isAuthenticated) {
			return getAuthProfileTab();
		} else {
			return getAnonProfileTab();
		}
	});

	const traitsTab = getTraitsTab();
	const resourcesTab = getResourcesTab();

	const isMobile = new IsMobile();
</script>

{#if isMobile.current}
	<div class="flex h-screen w-screen flex-col overflow-clip">
		<div class="mb-16 ml-0 h-auto w-full grow overflow-auto">
			{@render children()}
		</div>
		<Bottombar {gardensTab} {gardenTabs} {traitsTab} {resourcesTab} {profileTab} />
	</div>
{:else}
	<div class="flex h-screen w-screen flex-row overflow-clip">
		<Sidebar
			{gardensTab}
			{gardenTabs}
			bottomTabs={[traitsTab, resourcesTab]}
			{profileTab}
		/>
		<div class="mb-0 ml-14 h-auto w-full grow overflow-auto">
			{@render children()}
		</div>
	</div>
{/if}
