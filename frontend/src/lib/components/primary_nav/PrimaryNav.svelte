<script lang="ts">
	import Logo from '$lib/assets/logo.svelte';
	import { Separator } from '$lib/components/ui/separator/index';
	import { Button } from 'bits-ui';
	import { useQuery } from '@triplit/svelte';
	import PrimaryNavSidebarTab from './PrimaryNavSidebarTab.svelte';
	import PrimaryNavBottomTabDropdown from './PrimaryNavBottomTab.svelte';
	import PrimaryNavBottomDrawer from './PrimaryNavBottomDrawer.svelte';
	import activeGardenKey from '$state/activeGarden.svelte';

	import {
		getGardenSpecifcTabs,
		getGardensTab,
		getNonGardenSpecificTabs
	} from './primaryNavTabs';
	import type { PrimaryTabSpec } from './primaryNavTabs';

	import {
		adminGardensQuery,
		editorGardensQuery,
		viewerGardensQuery,
		favoriteMembershipsQuery
	} from '$data/garden/queries';
	import triplit from '$data/triplit';

	/* Settings. */
	const MAX_GARDENS_IN_TAB_SIDEBAR = 10; /* The maximum amount of gardens listed on the Gardens tab. */

	/* Queries */
	let favoriteMemberships = useQuery(triplit, favoriteMembershipsQuery);
	let adminGardens = useQuery(triplit, adminGardensQuery);
	let editorGardens = useQuery(triplit, editorGardensQuery);
	let viewerGardens = useQuery(triplit, viewerGardensQuery);

	/* Tab categories. */
	/* Gives quick access to other gardens. */
	let gardensTab = $derived.by(() => {
		const mostRelevantGardens = [];
		if (favoriteMemberships.results) {
			mostRelevantGardens.push(
				favoriteMemberships.results
					.map((membership) => membership.garden)
					.filter((garden) => garden != null) ?? []
			);
		}

		mostRelevantGardens.push(adminGardens.results ?? []);
		mostRelevantGardens.push(editorGardens.results ?? []);
		mostRelevantGardens.push(viewerGardens.results ?? []);
		mostRelevantGardens.length = MAX_GARDENS_IN_TAB_SIDEBAR;
		return getGardensTab(mostRelevantGardens);
	});

	const nonGardenSpecificTabs: PrimaryTabSpec[] =
		getNonGardenSpecificTabs(); /* Points to static pages. */
	let gardenTabs: PrimaryTabSpec[] =
		[]; /* Allows accessing all features in a Garden. */

	/* Get mobile specific tabs. */
	let traitsTab = nonGardenSpecificTabs.find((t) => t.id === 'traits');
	let profileTab = nonGardenSpecificTabs.find((t) => t.id === 'profile');
	let resourcesTab = nonGardenSpecificTabs.find((t) => t.id === 'resources');

	/* Retrieve the garden tabs if there is an active garden. */
	if (activeGardenKey.value !== null) {
		gardenTabs = getGardenSpecifcTabs(activeGardenKey.value);
	}
</script>

<!--
@component
Primary navigation between different feature domains
in the Garden as well as non-garden related app resources.

Shown to authenticated users everywhere in the app, and non-authenticated
users in a Garden context.
-->

<!-- Small screens bottom bar. -->
<nav
	class="border-neutral-6 bg-neutral-3 fixed bottom-0 flex h-16 w-full flex-row items-center justify-around border lg:h-0 first:lg:hidden"
>
	{#if profileTab}
		<PrimaryNavBottomTabDropdown spec={profileTab} />
	{/if}
	{#if resourcesTab}
		<PrimaryNavBottomTabDropdown spec={resourcesTab} />
	{/if}
	{#if traitsTab}
		<PrimaryNavBottomTabDropdown spec={traitsTab} />
	{/if}
	<PrimaryNavBottomTabDropdown spec={gardensTab} />
	{#if activeGardenKey.value !== null}
		<PrimaryNavBottomDrawer specs={gardenTabs} />
	{/if}
</nav>

<!-- Large screens sidebar. -->
<nav
	class="border-neutral-6 bg-neutral-3 fixed top-0 z-10 hidden h-full w-16 flex-col items-center justify-between border-r lg:flex"
>
	<!-- Links displayed at the top. -->
	<ul class="flex w-full flex-col">
		<!-- VerdanTech logo. -->
		<li>
			<Button.Root
				href="/"
				class="bg-neutral-3 hover:bg-neutral-4 inline-flex h-16 w-full items-center justify-center whitespace-nowrap rounded-none transition-colors"
			>
				<Logo size="3rem" />
			</Button.Root>
		</li>

		<!-- Gardens tab. -->
		<li class="flex items-center">
			<PrimaryNavSidebarTab spec={gardensTab} />
		</li>

		<Separator class="bg-neutral-6" />

		<!-- Garden specific links. -->
		{#each gardenTabs as tab}
			<li>
				<PrimaryNavSidebarTab spec={tab} />
			</li>
		{/each}
	</ul>

	<!-- Links displayed at the bottom. -->
	<ul class="flex w-full flex-col">
		{#each nonGardenSpecificTabs as tab}
			<li>
				<PrimaryNavSidebarTab spec={tab} flipped={true} />
			</li>
		{/each}
	</ul>
</nav>
