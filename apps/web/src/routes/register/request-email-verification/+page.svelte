<script lang="ts">
	import { Button, Card, Dialog, externalLinks } from '@vdg-webapp/ui';

	import RequestEmailConfirmationForm from './RequestEmailConfirmationForm.svelte';

	/** Set to true on form success. */
	let succeeded: boolean = $state(false);

	/** Stores the email the form sent to. */
	let registeredEmail: string = $state('');
</script>

<svelte:head>
	<title>Verify Email - Verdagraph</title>
</svelte:head>

<Card.Root class="m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3">
	<Card.Header>
		<Card.Title>Request an email confirmation</Card.Title>
	</Card.Header>
	<Card.Content>
		<RequestEmailConfirmationForm bind:succeeded bind:registeredEmail />
	</Card.Content>

	<Dialog.Root
		open={succeeded}
		onOpenChange={(open) => {
			if (!open) {
				succeeded = false;
			}
		}}
	>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title
					>An email confirmation has been sent to {registeredEmail}</Dialog.Title
				>
				<Dialog.Description>
					If the email remains unsent, <Button.Root
						variant="link"
						class="text-neutral-11 inline p-0"
						href={externalLinks.discord}>try reaching out to our community.</Button.Root
					>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</Card.Root>
