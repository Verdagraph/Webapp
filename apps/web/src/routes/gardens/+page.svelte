<script lang="ts">
	import Icon from '@iconify/svelte';

	import { type Garden } from '@vdg-webapp/models';
	import { Button, Popover, Separator, iconIds } from '@vdg-webapp/ui';

	import { goto } from '$app/navigation';
	import auth from '$state/auth.svelte';
	import { createGardenMembershipLists } from '$state/gardenMemberships.svelte';

	import GardenInviteScrollable from './GardenInviteScrollable.svelte';
	import GardenThumbnailScrollable from './GardenThumbnailScrollable.svelte';

	/**
	 * If a non-authenticated user accesses this page,
	 * redirect to public discovery page.
	 */
	if (!auth.isAuthenticated) {
		goto('gardens/discover');
	}

	/** Queries */
	const memberships = createGardenMembershipLists();
</script>

<svelte:head>
	<title>Gardens - Verdagraph</title>
</svelte:head>

<!-- Top bar -->
<div
	class="border-neutral-5 bg-neutral-1 sticky top-0 z-50 flex h-10 w-full flex-row items-center justify-between overflow-hidden border-b"
>
	<span class="ml-8">Gardens</span>
	<ul class="flex h-full flex-row items-center">
		<!-- Discovery page link. -->
		<li class="h-full">
			<Button.Root variant="ghost" href="gardens/discover" class="rounded-none">
				<Icon icon={iconIds.gardensDiscoverIcon} width="1.5rem" class="mx-2" />
				<span class="mx-2 hidden sm:block">Discovery</span>
			</Button.Root>
		</li>
		<li class="h-full">
			<Popover.Root>
				<Popover.Trigger>
					<Button.Root variant="ghost" class="rounded-none">
						<Icon icon={iconIds.gardensInviteIcon} width="1.5rem" class="mx-2" />
						<span class="mx-2 hidden sm:block">Invites</span>
						<div class="border-neutral-9 h-6 w-6 rounded-2xl border">
							{#if memberships.pendingInvitesLoading}
								?
							{:else}
								{memberships.pendingInvites.length}
							{/if}
						</div>
					</Button.Root>
				</Popover.Trigger>
				<Popover.Content>
					{#if memberships.pendingInvitesLoading}
						<Icon
							icon={iconIds.defaultSpinnerIcon}
							width="1.5rem"
							class="animate-spin"
						/>
					{:else}
						<GardenInviteScrollable invites={memberships.pendingInvites} />
					{/if}
				</Popover.Content>
			</Popover.Root>
		</li>
		<li class="h-full">
			<Button.Root variant="default" href="gardens/create" class="rounded-none">
				<Icon icon={iconIds.gardensCreateIcon} width="1.5rem" class="mx-2" />
				<span class="mx-2 hidden sm:block">Create</span>
			</Button.Root>
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
			<Separator.Root class="bg-neutral-7 mb-4 mt-12 w-full" />
		</div>
	{/if}
{/snippet}

<!-- Content -->
<div class="bg-neutral-1 h-full w-full p-8">
	<!-- Favorite gardens. -->
	{@render gardenCategory('Favorites', memberships.favoriteGardens)}

	<!-- Admin gardens. -->
	{@render gardenCategory('Admins', memberships.adminGardens)}

	<!-- Editor gardens. -->
	{@render gardenCategory('Editors', memberships.editorGardens)}

	<!-- Viewer gardens. -->
	{@render gardenCategory('Viewers', memberships.viewerGardens)}
</div>
