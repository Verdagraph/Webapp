<script lang="ts">
	import Icon from '@iconify/svelte';
	import { useQuery } from '@triplit/svelte';
	import { useId } from 'bits-ui';
	import { tick } from 'svelte';
	import { toast } from 'svelte-sonner';

	import {
		AnnualLifecycleMilestoneLabels,
		AppError,
		type AnnualLifecycleMilestone,
		type Origin,
		OriginEnumLabels,
		OriginEnumOptions,
		plantsCreateCommandSinglePlantSchema
	} from '@vdg-webapp/models';

	import { iconIds } from '$assets';
	import { CoordinateInput, GeometrySelect, UnitAwareInput } from '$components';
	import { Command, Form, Input, Popover, Select, Separator, Textarea } from '$core';
	import { Button, buttonVariants } from '$core/button/index.js';
	import { getAppContext } from '$state/application';
	import { cn } from '$utils';

	import { getVerdagraphContext } from '../verdagraphContext.svelte';
	import { createStampSeeding } from './stampSeeding.svelte';

	const ctx = getAppContext();
	const verdagraphContext = getVerdagraphContext();
	const form = verdagraphContext.plantsCreateForm.form;
	const handler = verdagraphContext.plantsCreateForm.handler;

	let plant = $derived(form.data.plants[0] || null);

	let cultivarNameComboboxOpen = $state(false);

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		cultivarNameComboboxOpen = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	const triggerId = useId();

	/** Keeps plants[0]'s expected geometry/location in sync with cultivar/Origin/anchor/focused day - see stampSeeding.svelte.ts for the regenerate-vs-translate split. */
	const stamp = createStampSeeding(0);
</script>

{#if plant}
	<!-- Cultivar. -->
	<Form.Field {form} name="plants[0].cultivarName">
		<Popover.Root bind:open={cultivarNameComboboxOpen}>
			<Form.Control id={triggerId}>
				{#snippet children({ props })}
					<Form.Label>Cultivar</Form.Label>
					<Popover.Trigger
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-full justify-between',
							!form.data.plants[0].cultivarName && 'text-neutral-11'
						)}
						role="combobox"
						{...props}
					>
						{ctx.cultivars.cultivarNames.has(form.data.plants[0].cultivarName)
							? form.data.plants[0].cultivarName
							: 'Select a cultivar'}
						<Icon
							icon={iconIds.caretUpDownIcon}
							width="1.5rem"
							class="ml-2 size-4 shrink-0 opacity-50"
						/>
					</Popover.Trigger>
					<input hidden value={form.data.plants[0].cultivarName} name={props.name} />
				{/snippet}
			</Form.Control>
			<!-- TODO: Add handler errors -->
			<Form.FieldErrors />
			<Popover.Content class="w-full p-0">
				<Command.Root>
					<Command.Input autofocus placeholder="Search cultivars..." class="h-9" />
					<Command.Empty>No cultivar found.</Command.Empty>
					<Command.Group value="cultivarNames">
						{#each [...ctx.cultivars.cultivarNames] as name}
							<Command.Item
								value={name}
								onSelect={() => {
									form.data.plants[0].cultivarName = name;
									closeAndFocusTrigger(triggerId);
								}}
							>
								{name}
								<Icon
									icon={iconIds.checkmarkIconUnfilled}
									width="1.5rem"
									class="ml-auto {name !== form.data.plants[0].cultivarName &&
										'text-transparent'}"
								/>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	</Form.Field>

	<div class="flex flex-col gap-1.5">
		<span class="text-sm font-medium">Origin</span>
		<Select.Root
			type="single"
			items={OriginEnumOptions.map((origin) => ({
				value: origin,
				label: OriginEnumLabels[origin]
			}))}
			value={form.data.plants[0].origin}
			onValueChange={(value) => {
				if (value) {
					form.data.plants[0].origin = value as Origin;
				}
			}}
		>
			<Select.Trigger class="w-full">
				<span>{OriginEnumLabels[form.data.plants[0].origin]}</span>
			</Select.Trigger>
			<Select.Content>
				{#each OriginEnumOptions as origin}
					<Select.Item value={origin} label={OriginEnumLabels[origin]}>
						{OriginEnumLabels[origin]}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="flex flex-col gap-1.5">
		<span class="text-sm font-medium">Anchor</span>
		<Select.Root
			type="single"
			items={stamp.anchorMilestoneOptions.map((milestone) => ({
				value: milestone,
				label: AnnualLifecycleMilestoneLabels[milestone]
			}))}
			value={stamp.anchorMilestone}
			onValueChange={(value) => {
				if (value) {
					stamp.anchorMilestone = value as AnnualLifecycleMilestone;
				}
			}}
		>
			<Select.Trigger class="w-full">
				<span>{AnnualLifecycleMilestoneLabels[stamp.anchorMilestone]}</span>
			</Select.Trigger>
			<Select.Content>
				{#each stamp.anchorMilestoneOptions as milestone}
					<Select.Item value={milestone} label={AnnualLifecycleMilestoneLabels[milestone]}>
						{AnnualLifecycleMilestoneLabels[milestone]}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<Button variant="outline" class="w-full" onclick={stamp.resetPlacement}>
		Reset Placement
	</Button>

	<!-- Aggregate. -->
	<!-- Not yet a real field on PlantsCreateCommandSchema - re-add once it is. -->
	<!-- Locations. -->
	<!-- Geometries. -->
	<!-- Cultivar Attributes. -->
{/if}
