<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { type EditableAttributeProps } from './types';
	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import { type GeometryType } from '@vdt-webapp/common';
	import iconIds from '$lib/assets/icons';
	import Icon from '@iconify/svelte';

	let { value, editing, onChange, errors }: EditableAttributeProps<GeometryType> =
		$props();

	const geometryTypeOptions: { value: GeometryType; label: string; icon: string }[] = [
		{ value: 'RECTANGLE', label: 'Rectangle', icon: iconIds.rectangleIcon },
		{ value: 'POLYGON', label: 'Polygon', icon: iconIds.polygonIcon },
		{ value: 'ELLIPSE', label: 'Ellipse', icon: iconIds.ellipseIcon },
		{ value: 'LINES', label: 'Lines', icon: iconIds.linesIcon }
	];
	const geometryTypeSelectTrigger = $derived(
		geometryTypeOptions.find((option) => option.value === value) ?? {
			label: 'Select a type',
			icon: null
		}
	);
</script>

{#if editing}
	<Select.Root
		type="single"
		{value}
		items={geometryTypeOptions}
		onValueChange={(value) => {
			onChange(true, value as GeometryType);
		}}
	>
		<Select.Trigger class="w-full">
			<div class="item-center flex">
				<span>
					{geometryTypeSelectTrigger.label}
				</span>
				{#if geometryTypeSelectTrigger.icon}
					<Icon
						icon={geometryTypeSelectTrigger.icon}
						width="1.5rem"
						class="text-neutral-11 ml-4"
					/>
				{/if}
			</div>
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each geometryTypeOptions as option}
					<Select.Item value={option.value} label={option.label}>
						<div class="item-center flex">
							<span>
								{option.label}
							</span>
							{#if option.icon}
								<Icon icon={option.icon} width="1rem" class="text-neutral-11 ml-4" />
							{/if}
						</div>
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
{:else}
	<DefaultStaticValue value={geometryTypeSelectTrigger.label} />
{/if}
