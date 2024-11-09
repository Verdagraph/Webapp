<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { userConfirmEmailConfirmation } from '$lib/dataNew/user/commands';
	import Icon from '@iconify/svelte';
	import iconIds from '$lib/assets/icons';
	import useAsync from '$state/asyncHandler.svelte';
	import { UserConfirmEmailConfirmationCommand } from '@vdt-webapp/common';
	import z from 'zod';

	/* Initialize the mutation on page load with url parameter. */
	const confirmationToken = $page.params.confirmationToken;

	let formHandler = useAsync(userConfirmEmailConfirmation.mutation, {
		onSuccess: () => {
			goto('/login');
		}
	});
	formHandler.execute({ token: confirmationToken } satisfies z.infer<
		typeof UserConfirmEmailConfirmationCommand
	>);
</script>

<svelte:head>
	<title>Email Confirmed - VerdanTech</title>
</svelte:head>

<Card.Root class="m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3">
	{#if formHandler.isLoading}
		<Card.Header>
			<Card.Title
				>Confirming your email <Icon
					icon={iconIds.defaultSpinnerIcon}
					width="1.5rem"
					class="inline animate-spin"
				/></Card.Title
			>
		</Card.Header>
	{:else if formHandler.isError}
		<Card.Header>
			<Card.Title>Something went wrong...</Card.Title>
			<Card.Content class="text-md text-warning-11 w-full px-0 pb-0 pt-4 font-medium">
				<ul>
					{#each formHandler.fieldErrors?.token ?? [] as error}
						<li
							class="border-warning-7 bg-warning-3 border-x p-1 first:rounded-t-md first:border-t last:rounded-b-md last:border-b"
						>
							{error}
						</li>
					{/each}
				</ul>
			</Card.Content>
		</Card.Header>
	{:else if formHandler.isSuccess}
		<Card.Header>
			<Card.Title>Confirmed!</Card.Title>
			<Card.Description>Redirecting to the login page.</Card.Description>
		</Card.Header>
	{/if}
</Card.Root>
