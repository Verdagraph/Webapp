<script lang="ts">
	import Icon from '@iconify/svelte';
	import { QuerySubscriptionOne } from 'jazz-tools/svelte';

	import { type GardenMembership, app } from '@vdg-webapp/models';
	import { Button, Separator, getAppContext, iconIds } from '@vdg-webapp/ui';

	import createCommandHandler from '$state/commandHandler.svelte';

	type Props = {
		invite: GardenMembership;
	};
	let { invite }: Props = $props();

	const ctx = getAppContext();

	const gardenQuery = new QuerySubscriptionOne(() =>
		app.gardens.where({ id: invite.gardenId })
	);
	const garden = $derived(gardenQuery.current ?? null);

	const inviterQuery = new QuerySubscriptionOne(() =>
		invite.inviterId ? app.users.where({ id: invite.inviterId }) : undefined
	);
	const inviter = $derived(inviterQuery.current ?? null);

	/** Mutations. */
	const gardenMembershipAcceptHandler = createCommandHandler(
		ctx.controller.gardenMembershipAccept
	);
	const gardenMembershipDeleteHandler = createCommandHandler(
		ctx.controller.gardenMembershipDelete
	);
</script>

<li class="flex flex-row">
	<div class="mr-8 flex flex-col">
		<div class="mb-4 flex max-w-64 flex-col overflow-hidden text-wrap">
			<span class="mb-1 break-words font-semibold">
				{garden?.name ?? 'Error - garden not found.'}
			</span>
			<span
				class="bg-primary-3 text-primary-11 w-fit break-all rounded-md p-1 text-sm italic"
			>
				{garden?.slug ?? invite.gardenId}
			</span>
		</div>
		<div class="my-0.5">
			<span class="text-neutral-11 text-sm">Invited by: </span>
			<span class="bg-neutral-4 text-neutral-11 rounded-lg p-1 text-sm italic">
				{#if inviterQuery.isLoading}
					?
				{:else if inviter}
					{inviter.username}
				{:else}
					<i>unknown</i>
				{/if}
			</span>
		</div>
		<div class="my-0.5">
			<span class="text-neutral-11 text-sm">Role:</span>
			<span class="text-neutral-11 text-sm italic">{invite.role}</span>
		</div>
	</div>
	<div class="flex flex-col justify-evenly">
		<Button.Root
			variant="default"
			disabled={!garden}
			onclick={() => {
				if (garden) {
					gardenMembershipAcceptHandler.execute({ gardenId: garden.slug });
				}
			}}
		>
			<Icon icon={iconIds.gardenInviteAcceptIcon} width="1.5rem" />
		</Button.Root>
		<Button.Root
			variant="destructive"
			disabled={!garden}
			onclick={() => {
				if (garden) {
					gardenMembershipDeleteHandler.execute({ gardenId: garden.slug });
				}
			}}><Icon width="1.5rem" icon={iconIds.gardenInviteRejectIcon} /></Button.Root
		>
	</div>
</li>
<li class="mb-4 mt-2 last:hidden">
	<Separator.Root class="bg-neutral-5 w-full" />
</li>
