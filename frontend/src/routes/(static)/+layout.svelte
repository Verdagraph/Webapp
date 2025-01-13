<script>
	import PrimaryNav from '$components/primaryNav';
	import auth from '$state/auth.svelte';
	import AnonStaticNav from './AnonStaticNav.svelte';

	let { children } = $props();
</script>

<!-- If the user is authenticated, show the PrimaryNav component. Otherwise, the AnonStaticNav. -->
{#if auth.isAuthenticated}
	<PrimaryNav {children}></PrimaryNav>
{:else}
	<AnonStaticNav />
	{@render children()}
{/if}
