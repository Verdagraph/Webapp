<script lang="ts">
	import * as Select from '../../ui/select/index.js';
	import { type EditableAttributeProps, type DynamicSelectValue } from './types';
	import DefaultStaticValue from './DefaultStaticValue.svelte';

	let { value, editing, onChange }: EditableAttributeProps<DynamicSelectValue> =
		$props();

	const selectTrigger = $derived(
		value.options.find((option) => option.id === value.id) ?? {
			label: 'Make a selection'
		}
	);
</script>

{#if editing}
	<Select.Root
		type="single"
		value={value.id}
		onValueChange={(selectValue) => {
			onChange({ id: selectValue, options: value.options });
		}}
	>
		<Select.Trigger class="w-full">
			<div class="item-center flex">
				<span>
					{selectTrigger.label}
				</span>
			</div>
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each value.options as option}
					<Select.Item value={option.id} label={option.label}>
						<div class="item-center flex">
							<span>
								{option.label}
							</span>
						</div>
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
{:else}
	<DefaultStaticValue value={selectTrigger.label} />
{/if}
