<script lang="ts">
	import Icon from '@iconify/svelte';
	import iconIds from '$lib/assets/icons';
	import FormInfoPopover from '$components/misc/FormInfoPopover.svelte';
	import FormErrorsPopover from '$components/misc/FormErrorsPopover.svelte';
	import type { EditableTree } from './tree.svelte';

	type Props = {
		/** The tree. */
		editableTree: EditableTree;
		/** If true the tree may be edited. */
		editing: boolean;
	};
	let { editableTree, editing }: Props = $props();
</script>

<!-- Snippet for rendering a tree item. Allows arbitrary nesting. -->
{#snippet treeItems(items: (typeof editableTree.tree)['children'], depth: number = 0)}
	{#each items as item (item.id)}
		<!-- Item element. -->
		<li {...item.attrs} class="cursor-pointer py-3">
			<!-- Item row. -->
			<div
				class="flex justify-between gap-4 rounded-md py-2 pr-2 {item.selected
					? 'bg-accent-4'
					: ''} {depth == 0 ? '' : 'pl-2'}"
				style="margin-left: {depth * 1}rem"
			>
				<!-- Left of the item row. -->
				<div class="flex items-center gap-2 pl-2">
					{#if item.item.icon}
						<Icon icon={item.item.icon} width="1.25rem" />
					{/if}
					<span>
						{item.item.label}
					</span>
					{#if item.item.description}
						<FormInfoPopover description={item.item.description} />
					{/if}
				</div>

				<!-- Right of the item row. -->
				<!-- Open/close chevron. -->
				{#if item.children?.length}
					<div class="flex grow items-center">
						<div
							class="h-[1px] w-full {item.selected
								? 'bg-accent-6'
								: 'bg-neutral-3'} mx-3"
						></div>
						<Icon
							icon={iconIds.chevronRight}
							width="1rem"
							class="{item.expanded
								? 'rotate-90'
								: ''} ml-2 h-6 w-8 rounded-md p-1  {item.selected
								? 'hover:bg-accent-5'
								: 'hover:bg-neutral-3'}"
						/>
					</div>

					<!-- Editable value. -->
				{:else if item.item.valueSnippet && item.item.onChange}
					<div
						onclick={(e) => e.stopPropagation()}
						onkeydown={(e) => e.stopPropagation()}
						role="none"
					>
						{#if Object.keys(editableTree.errors).includes(item.id)}
							<FormErrorsPopover errors={editableTree.errors[item.id]} />
						{/if}
						{@render item.item.valueSnippet(
							item.item.value,
							editing,
							item.item.onChange,
							Object.keys(editableTree.errors).includes(item.id)
						)}
					</div>
				{/if}
			</div>

			<!-- Item children. -->
			{#if item.children?.length && !item.item.value}
				<ul
					{...editableTree.tree.group}
					class="{item.expanded
						? 'h-auto opacity-100'
						: 'pointer-events-none h-0 opacity-0'} relative origin-left"
				>
					<div
						class="bg-neutral-5 absolute bottom-4 top-4 w-[1px]"
						style="left: {0.5 + depth * 1}rem"
					></div>
					{@render treeItems(item.children, depth + 1)}
				</ul>
			{/if}
		</li>
	{/each}
{/snippet}

<ul {...editableTree.tree.root} class="px-2">
	{@render treeItems(editableTree.tree.children)}
</ul>
