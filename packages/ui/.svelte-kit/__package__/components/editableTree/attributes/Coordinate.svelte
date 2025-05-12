<script lang="ts">
	import { type Position } from '@vdg-webapp/models';

	import { CoordinateInput, CoordinateSpan } from '../../units';

	import { type EditableAttributeProps } from './types';

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
