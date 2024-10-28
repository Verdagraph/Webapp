<script lang="ts">
	import Icon from '@iconify/svelte';
	import iconIds from '$lib/assets/icons';
	import { useQueryClient } from '@sveltestack/svelte-query';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import type {
		GardenMembershipFullSchemaRole,
		GardenPendingInviteSchema
	} from '$codegen/types';
	import {
		gardenMembershipAccept,
		gardenMembershipDelete
	} from '$data/garden/commands';

	const queryClient = useQueryClient();

	type Props = {
		invites: GardenPendingInviteSchema[];
	};

	let { invites }: Props = $props();

	/** Mutations. */
	const inviteAcceptMutation = gardenMembershipAccept.mutation();
	const inviteDeleteMutation = gardenMembershipDelete.mutation();
</script>

<!-- Pending invites list. -->
{#snippet pendingInvite(
	gardenName: string,
	gardenKey: string,
	inviterUsername: string | undefined,
	role: GardenMembershipFullSchemaRole,
	expiryCountdownHours: number
)}
	<li class="flex flex-row">
		<div class="mr-8 flex flex-col">
			<div class="mb-4 flex max-w-64 flex-col overflow-hidden text-wrap">
				<span class="mb-1 break-words font-semibold">
					{gardenName}
				</span>
				<span
					class="bg-primary-3 text-primary-11 w-fit break-all rounded-md p-1 text-sm italic"
				>
					{gardenKey}
				</span>
			</div>
			<div class="my-0.5">
				<span class="text-neutral-11 text-sm">Invited by:</span>
				<span class="bg-neutral-4 text-neutral-11 rounded-lg p-1 text-sm italic">
					{#if inviterUsername}
						inviterUsername
					{:else}
						unknown
					{/if}
				</span>
			</div>
			<div class="my-0.5">
				<span class="text-neutral-11 text-sm">Role:</span>
				<span class="text-neutral-11 text-sm italic">{role}</span>
			</div>
			<div class="my-0.5">
				<span class="text-neutral-11 text-sm">Expires in:</span>
				<span class="text-neutral-11 text-sm italic">{expiryCountdownHours} hours</span>
			</div>
		</div>
		<div class="flex flex-col justify-evenly">
			<Button
				variant="default"
				on:click={() => {
					$inviteAcceptMutation.mutate(
						{ garden_key: gardenKey },
						{
							onSuccess: () => {
								queryClient.invalidateQueries('pendingInvites');
							}
						}
					);
				}}
			>
				<Icon icon={iconIds.gardenInviteAcceptIcon} width="1.5rem" />
			</Button>
			<Button
				variant="destructive"
				on:click={() => {
					$inviteDeleteMutation.mutate(
						{ garden_key: gardenKey },
						{
							onSuccess: () => {
								queryClient.invalidateQueries('pendingInvites');
							}
						}
					);
				}}><Icon width="1.5rem" icon={iconIds.gardenInviteRejectIcon} /></Button
			>
		</div>
	</li>
	<li class="mb-4 mt-2 last:hidden">
		<Separator class="bg-neutral-5 w-full" />
	</li>
{/snippet}
<ScrollArea
	type="auto"
	orientation="vertical"
	class="w-auto {invites.length > 1 ? 'h-96' : 'h-48'}"
>
	<ul class="p-4">
		{#each invites as invite}
			{@render pendingInvite(
				invite.garden.name,
				invite.garden.key,
				/** TODO: Add a query to get the username of the inviter user. */
				undefined,
				invite.invite.role,
				invite.expiry_countdown_hours
			)}
		{/each}
	</ul>
</ScrollArea>
