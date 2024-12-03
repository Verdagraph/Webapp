<script lang="ts">
	import { useQuery } from '@triplit/svelte';
	import {
		getGardenSpecifcTabs,
		getGardensTab,
		getTraitsTab,
		getResourcesTab,
		getProfileTab
	} from './tabs.svelte';
	import type { Garden } from '@vdt-webapp/common';
	import Sidebar from './Sidebar.svelte';
	import Bottombar from './Bottombar.svelte';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import triplit from '$data/triplit';
	import {
		activeGardenQuery,
		adminGardensQuery,
		editorGardensQuery,
		viewerGardensQuery,
		favoriteMembershipsQuery
	} from '$data/garden/queries';
	import activeGardenKey from '$state/activeGarden.svelte';
	import {gardensTab, gardenTabs, profileTab} from './tabs.svelte'

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
