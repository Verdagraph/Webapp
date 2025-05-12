<script lang="ts">
	import type { Snippet } from 'svelte';

	import auth from '$state/auth.svelte';

	import PrimaryNavContainerAuth from './PrimaryNavContainerAuth.svelte';
	import PrimaryNavContainerUnauth from './PrimaryNavContainerUnauth.svelte';

	type Props = {
		children: Snippet;
	};
	let { children }: Props = $props();
</script>

{#if auth.isAuthenticated}
	<PrimaryNavContainerAuth {children} />
{:else}
	<PrimaryNavContainerUnauth {children} />
{/if}
