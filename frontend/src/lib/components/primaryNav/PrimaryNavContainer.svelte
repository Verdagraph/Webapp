<script lang="ts">
	import auth from '$state/auth.svelte';
	import PrimaryNavContainerAuth from './PrimaryNavContainerAuth.svelte';
	import PrimaryNavContainerUnauth from './PrimaryNavContainerUnauth.svelte';

	let { children } = $props();
</script>

{#if auth.isAuthenticated}
	<PrimaryNavContainerAuth {children} />
{:else}
	<PrimaryNavContainerUnauth {children} />
{/if}
