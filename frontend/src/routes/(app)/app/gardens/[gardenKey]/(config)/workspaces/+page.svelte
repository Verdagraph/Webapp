<script lang="ts">
	import { onMount } from 'svelte';
	import activeWorkspace from './activeWorkspace.svelte';

	onMount(() => {
		/** CLear the active workspace. */
		if (activeWorkspace.id) {
			activeWorkspace.id = null;
			activeWorkspace.editing = false;
		}
	});
</script>

<svelte:head>
	<title>Workspaces - VerdanTech</title>
</svelte:head>

worskpace list
