<script lang="ts">
	import { Button, Card, Dialog } from '@vdg-webapp/ui';
	import RegistrationForm from './RegistrationForm.svelte';
	/** Set to true on form success. */
	let succeeded: boolean = $state(false);

	/** Stores the email the form sent to. */
	let registeredEmail: string = $state('');
</script>

<svelte:head>
	<title>Register - Verdagraph</title>
</svelte:head>

<Card.Root class="m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3">
	<Card.Header>
		<Card.Title>Create an account</Card.Title>
		<Card.Description>
			<Button.Root variant="link" class="text-neutral-11 p-0" href="/login"
				>Already have one?</Button.Root
			>
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<RegistrationForm bind:succeeded bind:registeredEmail />
	</Card.Content>

	<Dialog.Root open={succeeded}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title
					>An email confirmation has been sent to {registeredEmail}</Dialog.Title
				>
				<Dialog.Description>
					If you don't receive it, <Button.Root
						variant="link"
						class="text-neutral-11 p-0"
						href="/register/request-email-verification"
						>request another through this link.</Button.Root
					>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</Card.Root>
