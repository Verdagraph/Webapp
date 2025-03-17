<script lang="ts">
	import { CoordinateInput, CoordinateSpan } from '$lib/components/units';
	import { type EditableAttributeProps } from './types';
	import { type Position } from '@vdt-webapp/common';

	let { value, editing, onChange, errors }: EditableAttributeProps<Position | null> =
		$props();
</script>

{#if editing}
	<CoordinateInput
		x={value ? value.x : NaN}
		y={value ? value.y : NaN}
		onValueChange={(value) => {
			onChange(false, value);
		}}
	/>
{:else}
	<CoordinateSpan x={value ? value.x : NaN} y={value ? value.y : NaN} />
{/if}
