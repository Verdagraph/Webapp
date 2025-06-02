<script lang="ts">
	import Nav from '$components/nav/Nav.svelte';

	import DemoNav from './DemoNav.svelte';

	let { children } = $props();
</script>

<div class="flex h-screen w-full flex-col overflow-clip">
	<Nav />
	<DemoNav />

	{@render children()}
</div>
