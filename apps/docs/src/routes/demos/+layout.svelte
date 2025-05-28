<script lang="ts">
	import Nav from '$components/nav/Nav.svelte';

	let { children } = $props();
</script>

<div class="flex h-screen w-full flex-col">
	<Nav />

	{@render children()}
</div>
