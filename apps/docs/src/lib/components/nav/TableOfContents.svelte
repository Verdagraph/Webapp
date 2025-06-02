<script lang="ts">
	import {
		type TableOfContentsElements,
		type TableOfContentsItem,
		melt
	} from '@melt-ui/svelte';

	import Self from './TableOfContents.svelte';

	type Props = {
		tree: TableOfContentsItem[];
		activeHeadingIdxs: number[];
		item: TableOfContentsElements['item'];
		level?: number;
	};
	let { tree = [], activeHeadingIdxs, item, level = 1 }: Props = $props();
</script>

<!--
@component The table of contents. 
-->
<ul class="m-0 list-none {level !== 1 ? 'pl-4' : ''}">
	{#if tree && tree.length}
		{#each tree as heading, i (i)}
			<li class="mt-0 pt-2">
				<a
					href="#{heading.id}"
					use:melt={$item(heading.id)}
					class="hover:text-neutral-11 data-[active]:text-neutral-11 text-neutral-10 inline-flex items-center justify-center gap-1 no-underline transition-colors"
				>
					<!--
                        Along with the heading title, the original heading node
                        is also passed down, so you can display headings
                        however you want.
                    -->
					{@html heading.node.innerHTML}
				</a>
				{#if heading.children && heading.children.length}
					<Self tree={heading.children} level={level + 1} {activeHeadingIdxs} {item} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>
