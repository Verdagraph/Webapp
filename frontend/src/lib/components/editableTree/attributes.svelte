<script lang="ts" module>
	export { editableStringAttribute, editableNumberAttribute };
</script>

<script lang="ts">
	import { Input } from '$components/ui/input/index.js';
</script>

{#snippet defaultStaticValue(value: any)}
	<span>
		{value}
	</span>
{/snippet}

{#snippet editableStringAttribute(
	value: string,
	editing: boolean,
	onChange: (changeOver: boolean, newData: string) => void
)}
	{#if !editing}
		{@render defaultStaticValue(value)}
	{:else}
		<Input
			{value}
			class="select-none"
			oninput={(
				event: Event & {
					currentTarget: EventTarget & HTMLInputElement;
				}
			) => {
				event.stopPropagation()
				event.preventDefault()
				if (!(event.target instanceof HTMLInputElement) || !event.target.value) {
					return;
				}
				onChange(false, event.target.value);
			}}
		/>
	{/if}
{/snippet}

{#snippet editableNumberAttribute(
	value: number,
	editing: boolean,
	onChange: (changeOver: boolean, newData: number) => void
)}
	a
{/snippet}
