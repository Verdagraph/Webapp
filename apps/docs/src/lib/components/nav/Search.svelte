<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	import { Button, Dialog, Input, ScrollArea, iconIds } from '@vdg-webapp/ui';

	import { createPostsIndex, searchPostsIndex } from '$lib/search';

	let search: 'loading' | 'ready' = $state('loading');
	let searchTerm = $state('');
	let results = $derived.by(() => {
		if (search === 'ready') {
			return searchPostsIndex(searchTerm);
		} else {
			return [];
		}
	});

	onMount(async () => {
		const posts = await fetch('/search.json').then((res) => res.json());

		createPostsIndex(posts);
		search = 'ready';
	});
</script>

<Dialog.Root>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button.Root {...props} variant="ghost" class="flex justify-between py-1">
				<Icon icon={iconIds.searchIcon} />
				<span>Search</span>
			</Button.Root>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="p-0">
		<Input.Root class="rounded-b-none" bind:value={searchTerm} />

		<ScrollArea.Root class="">
			<ul class="flex flex-col p-4">
				{#if results.length > 0}
					{#each results as result}
						<li class="w-full py-2">
							<a href={result.url} class="text-neutral-10 text-lg">
								{@html result.title}
							</a>
							<p class="text-neutral-11">{@html result.content}</p>
						</li>
					{/each}
				{:else}
					<li class="text-neutral-11">No results found.</li>
				{/if}
			</ul>
		</ScrollArea.Root>
	</Dialog.Content>
</Dialog.Root>
