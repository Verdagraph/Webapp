<script lang="ts">
	import Nav from '$components/nav/Nav.svelte';

	import Demo from './Demo.svelte';
</script>

<svelte:head>
	<title>Demo - Verdagraph</title>
</svelte:head>

<div class="flex h-screen w-full flex-col">
	<Nav />
	<Demo />
</div>
