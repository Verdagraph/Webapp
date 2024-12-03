<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { useQuery } from '@triplit/svelte';
	import iconIds from '$lib/assets/icons';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as Popover from '$components/ui/popover';
	import auth from '$state/auth.svelte';
	import GardenThumbnailScrollable from './GardenThumbnailScrollable.svelte';
	import GardenInviteScrollable from './GardenInviteScrollable.svelte';
	import {
		adminGardensQuery,
		editorGardensQuery,
		viewerGardensQuery,
		favoriteMembershipsQuery,
		acceptancePendingMembershipsQuery
	} from '$data/garden/queries';
	import triplit from '$data/triplit';
	import type { Garden } from '@vdt-webapp/common';

	/** Queries */
	let favoriteMemberships = useQuery(triplit, favoriteMembershipsQuery);
	let adminGardens = useQuery(triplit, adminGardensQuery);
	let editorGardens = useQuery(triplit, editorGardensQuery);
	let viewerGardens = useQuery(triplit, viewerGardensQuery);
	let pendingAcceptanceMemberships = useQuery(
		triplit,
		acceptancePendingMembershipsQuery
	);

	console.log(adminGardens)

	/**
	 * If a non-authenticated user accesses this page,
	 * redirect to public discovery page.
	 */
	onMount(() => {
		if (!auth.isAuthenticated) {
			goto('gardens/discover');
		}
	});
</script>

<svelte:head>
	<title>Gardens - VerdanTech</title>
</svelte:head>

<!-- Top bar -->
<div
	class="border-neutral-5 bg-neutral-1 sticky top-0 z-50 flex h-10 w-full flex-row items-center justify-between overflow-hidden border-b"
>
	<span class="ml-8">Gardens</span>
	<ul class="flex h-full flex-row items-center">
		<!-- Discovery page link. -->
		<li class="h-full">
			<Button variant="ghost" href="gardens/discover" class="rounded-none">
				<Icon icon={iconIds.gardensDiscoverIcon} width="1.5rem" class="mx-2" />
				<span class="mx-2 hidden sm:block">Discovery</span>
			</Button>
		</li>
		<li class="h-full">
			<Popover.Root>
				<Popover.Trigger>
					<Button variant="ghost" class="rounded-none">
						<Icon icon={iconIds.gardensInviteIcon} width="1.5rem" class="mx-2" />
						<span class="mx-2 hidden sm:block">Invites</span>
						<div class="border-neutral-9 h-6 w-6 rounded-2xl border">
							{#if pendingAcceptanceMemberships.fetching}
								?
							{:else if pendingAcceptanceMemberships.error}
								?
							{:else if pendingAcceptanceMemberships.results}
								{pendingAcceptanceMemberships.results.length}
							{/if}
						</div>
					</Button>
				</Popover.Trigger>
				<Popover.Content>
					{#if pendingAcceptanceMemberships.fetching}
						<Icon
							icon={iconIds.defaultSpinnerIcon}
							width="1.5rem"
							class="animate-spin"
						/>
					{:else if pendingAcceptanceMemberships.results}
						<GardenInviteScrollable invites={pendingAcceptanceMemberships.results} />
					{/if}
				</Popover.Content>
			</Popover.Root>
		</li>
		<li class="h-full">
			<Button variant="default" href="gardens/create" class="rounded-none">
				<Icon icon={iconIds.gardensCreateIcon} width="1.5rem" class="mx-2" />
				<span class="mx-2 hidden sm:block">Create</span>
			</Button>
		</li>
	</ul>
</div>

{#snippet gardenCategory(label: string, gardens: Garden[])}
	{#if gardens.length > 0}
	<div>
		<!-- Label -->
		<span class="text-xl">
			{label}
		</span>
		<GardenThumbnailScrollable {gardens} />
		<Separator class="bg-neutral-7 mb-4 mt-12 w-full" />
	</div>
	{/if}
{/snippet}

<!-- Content -->
<div class="bg-neutral-1 h-full w-full p-8">
	<!-- Favorite gardens. -->
	{#if favoriteMemberships.fetching}
		<!-- TODO: Skeleton loading. -->
		Loading...
	{:else if favoriteMemberships.error}
		Error!
	{:else if favoriteMemberships.results}
		{@render gardenCategory(
			'Favorites',
			favoriteMemberships.results
				.map((membership) => membership.garden)
				.filter((garden) => garden != null)
		)}
	{/if}

	<!-- Admin gardens. -->
	{#if adminGardens.fetching}
		<!-- TODO: Skeleton loading. -->
		Loading...
	{:else if adminGardens.error}
		Error!
	{:else if adminGardens.results}
		{@render gardenCategory('Admins', adminGardens.results)}
	{/if}

	<!-- Editor gardens. -->
	{#if editorGardens.fetching}
		<!-- TODO: Skeleton loading. -->
		Loading...
	{:else if editorGardens.error}
		Error!
	{:else if editorGardens.results}
		{@render gardenCategory('Editors', editorGardens.results)}
	{/if}

	<!-- Viewer gardens. -->
	{#if viewerGardens.fetching}
		<!-- TODO: Skeleton loading. -->
		Loading...
	{:else if viewerGardens.error}
		Error!
	{:else if viewerGardens.results}
		{@render gardenCategory('Viewers', viewerGardens.results)}
	{/if}
</div>
