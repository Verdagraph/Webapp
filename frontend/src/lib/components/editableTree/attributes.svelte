<script lang="ts" module>
	export {
		editableStringAttribute,
		editableNumberAttribute,
		editableDistanceAttribute,
		editableTextareaAttribute
	};

	/**
	 * Retrieves an oninput handler for an input.
	 * @param onChange The callback function that handles the change.
	 */
	function getOninput<ElementT extends HTMLInputElement | HTMLTextAreaElement>(
		onChange: (changeOver: boolean, newData: any) => void
	) {
		return (
			event: Event & {
				currentTarget: EventTarget & ElementT;
			}
		) => {
			const target = event.target as ElementT;
			if (!target?.value) {
				return;
			}
			onChange(false, target.value);
		};
	}
</script>

<script lang="ts">
	import { Input } from '$components/ui/input/index.js';
	import UnitAwareInput from '$components/units/UnitAwareInput.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
</script>

<!-- The default display for a value when it is not being edited. -->
{#snippet defaultStaticValue(value: any)}
	<span
		class="{!value
			? 'italic'
			: ''} border-neutral-7 bg-neutral-1 ring-offset-neutral-1 focus-visible:ring-neutral-7 flex w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
	>
		{value || 'None'}
	</span>
{/snippet}

<!-- String attributes. -->
{#snippet editableStringAttribute(
	value: string,
	editing: boolean,
	onChange: (changeOver: boolean, newData: string) => void,
	errors: boolean
)}
	{#if editing}
		<Input
			{value}
			class="select-none"
			oninput={getOninput<HTMLInputElement>(onChange)}
		/>
	{:else}
		{@render defaultStaticValue(value)}
	{/if}
{/snippet}

<!-- Textarea attributes. -->
{#snippet editableTextareaAttribute(
	value: string,
	editing: boolean,
	onChange: (changeOver: boolean, newData: string) => void,
	errors: boolean
)}
	{#if editing}
		<Textarea
			{value}
			class="select-none"
			oninput={getOninput<HTMLTextAreaElement>(onChange)}
		/>
	{:else}
		{@render defaultStaticValue(value)}
	{/if}
{/snippet}

<!-- Number attributes. -->
{#snippet editableNumberAttribute(
	value: number,
	editing: boolean,
	onChange: (changeOver: boolean, newData: number) => void,
	errors: boolean
)}
	{#if editing}
		<Input
			{value}
			type="number"
			class="select-none"
			oninput={getOninput<HTMLInputElement>(onChange)}
		/>
	{:else}
		{@render defaultStaticValue(value)}
	{/if}
{/snippet}

<!-- Distance attributes. -->
{#snippet editableDistanceAttribute(
	value: number,
	editing: boolean,
	onChange: (changeOver: boolean, newData: number) => void,
	errors: boolean
)}
	{#if editing}
		<UnitAwareInput
			oninput={(newData) => {
				onChange(false, newData);
			}}
			{value}
			quantityType="distance"
		/>
	{:else}
		{@render defaultStaticValue(value)}
	{/if}
{/snippet}
