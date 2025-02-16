<script lang="ts">
	import { Tree, type TreeItem } from 'melt/builders';
	import { type Snippet } from 'svelte';
	import Icon from '@iconify/svelte';

	type Item = TreeItem & {
		label: string;
		description?: string;
		icon?: string;
		valueSnippet?: Snippet<
			[
				value: any,
				editing: boolean,
				onChange: (changeOver: boolean, newData: any) => void
			]
		>;
		value?: any;
		onChange?: (changeOver: boolean, newData: any) => void;
		children?: Item[];
	};
	type Props = {
		items: Item[];
		editing: boolean;
	};
	let { items, editing }: Props = $props();

	const tree = new Tree({
		items: () => items,
		expandOnClick: true,
		multiple: true
	});
</script>

{#snippet treeItems(items: (typeof tree)['children'], depth: number = 0)}
	{#each items as item (item.id)}
		<li {...item.attrs} class="cursor-pointer">
			<div class="flex justify-between">
				<div class="flex">
					{#if item.item.icon}
						<Icon icon={item.item.icon} width="1.25rem" />
					{/if}
					<span>
						{item.item.label}
					</span>
				</div>
				
				<div onclickcapture={(e) => {e.stopPropagation(); e.preventDefault()}} onfocuscapture={(e) => {e.stopPropagation(); e.preventDefault()}} onkeydowncapture={(e) => {e.stopPropagation(); e.preventDefault()}}>
					{#if item.item.value && item.item.valueSnippet && item.item.onChange}
					{@render item.item.valueSnippet(item.item.value, editing, item.item.onChange)}
					{/if}
				</div>
			</div>

			{#if item.children?.length}
				<ul
					{...tree.group}
					class={item.expanded ? 'h-auto opacity-100' : 'h-0 opacity-0'}
				>
					{@render treeItems(item.children, depth + 1)}
				</ul>
			{/if}
		</li>
	{/each}
{/snippet}

<ul {...tree.root}>
	{@render treeItems(tree.children)}
</ul>
