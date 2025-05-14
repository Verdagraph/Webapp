<script lang="ts">
	let { children } = $props();
</script>

<div class="prose dark:prose-invert mx-auto mt-12 w-11/12 md:w-3/4 lg:w-1/2 2xl:w-1/4">
	{@render children()}
</div>
