<script lang="ts">
	import DemoNav from './DemoNav.svelte';

	let { children } = $props();
</script>

<div class="flex h-screen w-screen flex-col overflow-clip">
	<DemoNav />
	{@render children()}
</div>
