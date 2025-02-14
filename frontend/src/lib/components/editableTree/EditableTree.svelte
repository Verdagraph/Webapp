<script lang="ts">
	import { Tree, type TreeItem } from 'melt/builders';
	import { type Snippet } from 'svelte';

	type Item = TreeItem & {
		label: string;
		description?: string;
		icon?: string;
		valueSnippet?: Snippet<[value: any, editing: boolean, (changeOver: boolean, newData: any) => void]>;
		children?: Item[];
	};
	type Props = {
		items: Item[];
	};
	let { items }: Props = $props();

	const tree = new Tree({
		items
	});
</script>


