<script lang="ts" module>
	export { editableStringAttribute, editableNumberAttribute };
	function getOninput(onChange: (changeOver: boolean, newData: any) => void) {
		return (
			event: Event & {
				currentTarget: EventTarget & HTMLInputElement;
			}
		) => {
			if (!(event.target instanceof HTMLInputElement) || !event.target.value) {
				return;
			}
			onChange(false, event.target.value);
		};
	}
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
		<Input {value} class="select-none" oninput={getOninput(onChange)} />
	{/if}
{/snippet}

{#snippet editableNumberAttribute(
	value: number,
	editing: boolean,
	onChange: (changeOver: boolean, newData: number) => void
)}
	a
{/snippet}
