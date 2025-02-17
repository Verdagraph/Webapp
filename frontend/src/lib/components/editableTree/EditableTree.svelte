<script lang="ts">
	import { Tree, type TreeItem } from 'melt/builders';
	import { type Snippet } from 'svelte';
	import Icon from '@iconify/svelte';
	import iconIds from '$lib/assets/icons';

	/** Describes the structure of an item in the tree. */
	type Item = TreeItem & {
		/** Label for the item. */
		label: string;
		/** Description. Displayed in a popover. */
		description?: string;
		/** Icon for the item. */
		icon?: string;
		/**
		 * The value of the item. Must be defined to render it.
		 * Mutually exclusive with the item having children.
		 */
		value?: any;
		/** The change callback to use for changing the item. */
		onChange?: (changeOver: boolean, newData: any) => void;
		/**
		 * Must be defined to render an editable value for the item value.
		 * The snippet can render any type of value, becomes editable if
		 * the editable argument changes, and propogates any editing
		 * via the onChange callback.
		 */
		valueSnippet?: Snippet<
			[
				value: any,
				editing: boolean,
				onChange: (changeOver: boolean, newData: any) => void
			]
		>;
		/**
		 * The children of the item.
		 * Mutually exclusive with rendering a value for the item.
		 */
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

<!-- Snippet for rendering a tree item. Allows arbitrary nesting. -->
{#snippet treeItems(items: (typeof tree)['children'], depth: number = 0)}
	{#each items as item (item.id)}
		<!-- Item element. -->
		<li {...item.attrs} class="cursor-pointer py-3">
			<!-- Item row. -->
			<div class="flex justify-between">
				<!-- Left of the item row. -->
				<div class="flex items-center">
					{#if item.item.icon}
						<Icon icon={item.item.icon} width="1.25rem" />
					{/if}
					<span class="px-1">
						{item.item.label}
					</span>
				</div>

				<!-- Right of the item row. -->
				<!-- Open/close chevron. -->
				{#if item.children?.length}
					<Icon
						icon={iconIds.chevronRight}
						width="1.25rem"
						class={item.expanded ? 'rotate-90' : ''}
					/>

					<!-- Editable value. -->
				{:else if item.item.value && item.item.valueSnippet && item.item.onChange}
					<div
						onclick={(e) => e.stopPropagation()}
						onkeydown={(e) => e.stopPropagation()}
						role="none"
					>
						{@render item.item.valueSnippet(
							item.item.value,
							editing,
							item.item.onChange
						)}
					</div>
				{/if}
			</div>

			<!-- Item children. -->
			{#if item.children?.length && !item.item.value}
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

<ul {...tree.root} class="px-2">
	{@render treeItems(tree.children)}
</ul>
