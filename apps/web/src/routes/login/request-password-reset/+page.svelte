<script lang="ts">
	import { Button, Card, Dialog, externalLinks } from '@vdg-webapp/ui';

	import RequestPasswordResetForm from './RequestPasswordResetForm.svelte';

	/** Set to true on form success. */
	let succeeded: boolean = $state(false);
</script>

<svelte:head>
	<title>Request Password Reset - Verdagraph</title>
</svelte:head>

<Card.Root class="m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3">
	<Card.Header>
		<Card.Title>Request a password reset</Card.Title>
	</Card.Header>
	<Card.Content>
		<RequestPasswordResetForm bind:succeeded />
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
					>If the email exists, an email confirmation has been sent to it</Dialog.Title
				>
				<Dialog.Description>
					If the email remains unsent, try again or <Button.Root
						variant="link"
						class="text-neutral-11 inline p-0"
						href={externalLinks.discord}>try reaching out to our community.</Button.Root
					>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</Card.Root>
