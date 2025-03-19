<script lang="ts">
	import Icon from '@iconify/svelte';
	import iconIds from '$lib/assets/icons';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import type { AcceptancePendingMembershipsQueryResult } from '$data/gardens/queries';
	import { userProfilesQuery } from '$data/users/queries';
	import {
		gardenMembershipAccept,
		gardenMembershipDelete
	} from '$data/gardens/commands';
	import { useQuery } from '@triplit/svelte';
	import triplit from '$data/triplit';
	import createCommandHandler from '$state/commandHandler.svelte';

	type Props = {
		invite: AcceptancePendingMembershipsQueryResult;
	};
	let { invite }: Props = $props();

	let inviterProfile = useQuery(
		triplit,
		userProfilesQuery.Vars({ profileIds: [invite.inviterId] })
	);

	/** Mutations. */
	const gardenMembershipAcceptHandler = createCommandHandler(
		gardenMembershipAccept.mutation
	);
	const gardenMembershipDeleteHandler = createCommandHandler(
		gardenMembershipDelete.mutation
	);
</script>

<li class="flex flex-row">
	<div class="mr-8 flex flex-col">
		<div class="mb-4 flex max-w-64 flex-col overflow-hidden text-wrap">
			<span class="mb-1 break-words font-semibold">
				{invite.garden?.name ?? 'Error - garden not found.'}
			</span>
			<span
				class="bg-primary-3 text-primary-11 w-fit break-all rounded-md p-1 text-sm italic"
			>
				{invite.gardenId}
			</span>
		</div>
		<div class="my-0.5">
			<span class="text-neutral-11 text-sm">Invited by: </span>
			<span class="bg-neutral-4 text-neutral-11 rounded-lg p-1 text-sm italic">
				{#if inviterProfile.fetching}
					?
				{:else if inviterProfile.error}
					<i>unknown</i>
				{:else if inviterProfile.results}
					{inviterProfile.results[0].username}
				{/if}
			</span>
		</div>
		<div class="my-0.5">
			<span class="text-neutral-11 text-sm">Role:</span>
			<span class="text-neutral-11 text-sm italic">{invite.role}</span>
		</div>
	</div>
	<div class="flex flex-col justify-evenly">
		<Button
			variant="default"
			onclick={() => {
				gardenMembershipAcceptHandler.execute({ gardenId: invite.gardenId });
			}}
		>
			<Icon icon={iconIds.gardenInviteAcceptIcon} width="1.5rem" />
		</Button>
		<Button
			variant="destructive"
			onclick={() => {
				gardenMembershipDeleteHandler.execute({ gardenId: invite.gardenId });
			}}><Icon width="1.5rem" icon={iconIds.gardenInviteRejectIcon} /></Button
		>
	</div>
</li>
<li class="mb-4 mt-2 last:hidden">
	<Separator class="bg-neutral-5 w-full" />
</li>
