<script lang="ts">
	import { onMount } from 'svelte';

	import { Button, Card } from '@vdg-webapp/ui';

	import { goto } from '$app/navigation';
	import auth from '$state/auth.svelte';

	import LoginForm from './LoginForm.svelte';

	onMount(() => {
		if (auth.isAuthenticated) {
			goto('/');
		}
	});
</script>

<svelte:head>
	<title>Login - Verdagraph</title>
</svelte:head>

<Card.Root class="m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3">
	<Card.Header>
		<Card.Title>Login</Card.Title>
		<Card.Description>
			<Button.Root
				variant="link"
				class="text-neutral-11 p-0"
				href="/login/request-password-reset">Forgot your password?</Button.Root
			>
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<LoginForm />
	</Card.Content>
</Card.Root>
