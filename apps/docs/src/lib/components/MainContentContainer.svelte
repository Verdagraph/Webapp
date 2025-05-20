<script lang="ts">
	import { ScrollArea } from '@vdg-webapp/ui';

	import Tree from './nav/Tree.svelte';

	let { children } = $props();
</script>

<div class="mx-auto mb-12 mt-12 flex flex-row justify-center gap-8 px-4 md:px-8">
	<div class="sticky top-20 hidden h-full md:block">
		<ScrollArea.Root class="h-screen">
			<Tree />
		</ScrollArea.Root>
	</div>
	<div class="flex flex-col md:flex-row">
		<div class="prose dark:prose-invert">
			{@render children()}
		</div>
		<div class="order-first md:order-last">toc</div>
	</div>
</div>
