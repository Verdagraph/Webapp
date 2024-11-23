<script>
	import PrimaryNav from '$components/primaryNav';
	import auth from '$state/auth.svelte';
	import UnauthStaticNav from './UnauthStaticNav.svelte';

	let { children } = $props();
</script>

<!-- If the user is authenticated, show the PrimaryNav component. Otherwise, the UnauthStaticNav. -->
{#if auth.isAuthenticated}
	<PrimaryNav {children}></PrimaryNav>
{:else}
	<UnauthStaticNav />
	{@render children()}
{/if}
