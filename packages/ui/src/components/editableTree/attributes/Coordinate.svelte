<script lang="ts">
	import { CoordinateInput, CoordinateSpan } from '$components/units';

	import { type EditableAttributeProps } from './types';

	type Position = { x: number; y: number };

	let { value, editing, onChange }: EditableAttributeProps<Position> = $props();
</script>

{#if editing}
	<CoordinateInput
		x={value.x}
		y={value.y}
		onValueChange={(value) => {
			onChange(value);
		}}
	/>
{:else}
	<CoordinateSpan x={value.x} y={value.y} />
{/if}
