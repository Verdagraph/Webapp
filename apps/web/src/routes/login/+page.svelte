<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$components/ui/button';
	import LoginForm from './LoginForm.svelte';
	import auth from '$state/auth.svelte';

	onMount(() => {
		if (auth.isAuthenticated) {
			goto('/app');
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
			<Button
				variant="link"
				class="text-neutral-11 p-0"
				href="/login/request-password-reset">Forgot your password?</Button
			>
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<LoginForm />
	</Card.Content>
</Card.Root>
