<script lang="ts">
	import { Button, Card, Dialog } from '@vdg-webapp/ui';

	import PasswordResetForm from './PasswordResetForm.svelte';

	/** Set to true on form success. */
	let succeeded: boolean = $state(false);
</script>

<svelte:head>
	<title>Reset Password - Verdagraph</title>
</svelte:head>

<Card.Root class="m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3">
	<Card.Header>
		<Card.Title>Choose a new password</Card.Title>
	</Card.Header>
	<Card.Content>
		<PasswordResetForm bind:succeeded />
	</Card.Content>

	<Dialog.Root open={succeeded}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Password has been successfully reset</Dialog.Title>
				<Dialog.Description>
					<Button.Root variant="link" class="text-neutral-11 p-0" href="/login"
						>Proceed to Login</Button.Root
					>
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</Card.Root>
