<script lang="ts">
	import Icon from '@iconify/svelte';
	import { useQuery } from '@triplit/svelte';
	import { useId } from 'bits-ui';
	import { tick } from 'svelte';
	import { toast } from 'svelte-sonner';

	import {
		type AnnualLifecycleMilestone,
		AnnualLifecycleMilestoneLabels,
		AppError,
		type GeometryCreateCommand,
		type LocationCreateCommand,
		addDays,
		annualMilestonesForOrigin,
		generateExpectedHistories,
		plantsCreateCommandSinglePlantSchema
	} from '@vdg-webapp/models';

	import { iconIds } from '$assets';
	import { CoordinateInput, GeometrySelect, UnitAwareInput } from '$components';
	import { Command, Form, Input, Popover, Select, Separator, Textarea } from '$core';
	import { Button, buttonVariants } from '$core/button/index.js';
	import { getAppContext } from '$state/application';
	import { cn } from '$utils';

	import { getVerdagraphContext } from '../verdagraphContext.svelte';

	const ctx = getAppContext();
	const verdagraphContext = getVerdagraphContext();
	const form = verdagraphContext.plantsCreateForm.form;
	const handler = verdagraphContext.plantsCreateForm.handler;
	const { form: formData, enhance } = form;

	let plant = $derived($formData.plants[0] || null);

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

	/**
	 * Which lifecycle stage the plant is at "today" (the currently focused
	 * timeline day) - the rest of its expected history is computed backward/
	 * forward from that pin. Kept in sync with the current Origin below,
	 * since not every milestone is valid for every Origin.
	 */
	let anchorMilestoneOptions = $derived(
		annualMilestonesForOrigin($formData.plants[0]?.origin ?? 'DIRECT_SEED')
	);
	let anchorMilestone: AnnualLifecycleMilestone = $state('SEED');
	$effect(() => {
		if (!anchorMilestoneOptions.includes(anchorMilestone)) {
			anchorMilestone = anchorMilestoneOptions[0];
		}
	});

	/**
	 * Generates the preview's whole expected geometry history and its single
	 * anchored location once a real cultivar is picked, so CreatePlantContainer
	 * (reading this same form data) has something to render immediately.
	 * Fully regenerates from the Cultivar's profile whenever the cultivar,
	 * Origin, or anchor milestone changes - those change *what* the stamp
	 * represents, so a fresh chain is correct. A focused-day change alone is
	 * different: the anchor is pinned to the focused day, but the stamp's
	 * shape hasn't changed, only *when* it's happening - so that case only
	 * translates every existing date by the same delta, preserving every
	 * other field (including a manually dragged/resized entry) exactly. The
	 * existing coordinate is also preserved across a full regeneration so
	 * switching anchor/cultivar doesn't snap away a position already dragged
	 * into place; only "Reset Placement" below discards it.
	 */
	let previousStructuralKey: string | null = $state(null);
	let previousFocusedDay: Date | null = $state(null);
	$effect(() => {
		const cultivarName = $formData.plants[0]?.cultivarName;
		if (!cultivarName || !ctx.cultivars.cultivarNames.has(cultivarName)) {
			previousStructuralKey = null;
			previousFocusedDay = null;
			return;
		}

		const origin = $formData.plants[0]?.origin ?? 'DIRECT_SEED';
		const focusedDay = verdagraphContext.timeline.focusUtc;
		/**
		 * Without this guard, the write below re-triggers this same effect
		 * indefinitely: $formData is a superforms store, which notifies on
		 * any write to it regardless of which property changed, so
		 * assigning geometryHistory would itself cause this effect (which
		 * reads cultivarName/origin off the same store) to run again -
		 * forever, since the condition it reruns under never stops being
		 * true. The geometries.length check re-opens the guard whenever a
		 * fresh stamp's history has been cleared (post-Create carry-forward
		 * still counts as "already seeded" here, since it's non-empty).
		 */
		const structuralKey = `${cultivarName}|${origin}|${anchorMilestone}`;
		const alreadySeeded = ($formData.plants[0]?.geometryHistory?.geometries?.length ?? 0) > 0;

		if (structuralKey === previousStructuralKey && alreadySeeded) {
			if (previousFocusedDay && focusedDay.getTime() !== previousFocusedDay.getTime()) {
				const deltaDays = Math.round(
					(focusedDay.getTime() - previousFocusedDay.getTime()) / (24 * 60 * 60 * 1000)
				);
				if (deltaDays !== 0) {
					const currentGeometries: GeometryCreateCommand[] =
						$formData.plants[0]?.geometryHistory?.geometries ?? [];
					const currentLocations: LocationCreateCommand[] =
						$formData.plants[0]?.locationHistory?.locations ?? [];
					$formData.plants[0].geometryHistory = {
						gardenId: ctx.garden.id,
						geometries: currentGeometries.map((geometry: GeometryCreateCommand) => ({
							...geometry,
							date: addDays(geometry.date, deltaDays)
						}))
					};
					$formData.plants[0].locationHistory = {
						gardenId: ctx.garden.id,
						locations: currentLocations.map((location: LocationCreateCommand) => ({
							...location,
							date: addDays(location.date, deltaDays)
						}))
					};
				}
			}
			previousFocusedDay = focusedDay;
			return;
		}
		previousStructuralKey = structuralKey;
		previousFocusedDay = focusedDay;

		const cultivar = [...ctx.cultivars.cultivars].find((c) => c.name === cultivarName);
		const workspaceId = verdagraphContext.selections.get('workspace').values().next().value;
		if (!workspaceId) {
			return;
		}

		const existingCoordinate = $formData.plants[0]?.locationHistory?.locations?.[0]?.coordinate;
		const coordinate = existingCoordinate
			? { x: existingCoordinate.x, y: existingCoordinate.y }
			: verdagraphContext.layoutCanvasContext.transform.viewportCenterModel();

		const { geometries, location } = generateExpectedHistories({
			expectedGeometryProfile: cultivar?.attributes?.expectedGeometry,
			annualLifecycleProfile: cultivar?.attributes?.annualLifeCycle,
			origin,
			anchorMilestone,
			anchorDate: focusedDay,
			gardenId: ctx.garden.id,
			workspaceId,
			coordinate
		});

		$formData.plants[0].geometryHistory = { gardenId: ctx.garden.id, geometries };
		$formData.plants[0].locationHistory = { gardenId: ctx.garden.id, locations: [location] };
	});

	/**
	 * Discards the current stamp's placement (carried forward from the last
	 * Create, or dragged/resized by hand) and falls back to the cultivar's
	 * generated default - the same seed the very first stamp of a cultivar
	 * gets, since emptying both histories here just re-opens the guard above.
	 */
	function resetPlacement() {
		$formData.plants[0].geometryHistory = { gardenId: ctx.garden.id, geometries: [] };
		$formData.plants[0].locationHistory = { gardenId: ctx.garden.id, locations: [] };
	}
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
							!$formData.plants[0].cultivarName && 'text-neutral-11'
						)}
						role="combobox"
						{...props}
					>
						{ctx.cultivars.cultivarNames.has($formData.plants[0].cultivarName)
							? $formData.plants[0].cultivarName
							: 'Select a cultivar'}
						<Icon
							icon={iconIds.caretUpDownIcon}
							width="1.5rem"
							class="ml-2 size-4 shrink-0 opacity-50"
						/>
					</Popover.Trigger>
					<input hidden value={$formData.plants[0].cultivarName} name={props.name} />
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
									$formData.plants[0].cultivarName = name;
									closeAndFocusTrigger(triggerId);
								}}
							>
								{name}
								<Icon
									icon={iconIds.checkmarkIconUnfilled}
									width="1.5rem"
									class="ml-auto {name !== $formData.plants[0].cultivarName &&
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
		<span class="text-sm font-medium">Anchor</span>
		<Select.Root
			type="single"
			items={anchorMilestoneOptions.map((milestone) => ({
				value: milestone,
				label: AnnualLifecycleMilestoneLabels[milestone]
			}))}
			value={anchorMilestone}
			onValueChange={(value) => {
				if (value) {
					anchorMilestone = value as AnnualLifecycleMilestone;
				}
			}}
		>
			<Select.Trigger class="w-full">
				<span>{AnnualLifecycleMilestoneLabels[anchorMilestone]}</span>
			</Select.Trigger>
			<Select.Content>
				{#each anchorMilestoneOptions as milestone}
					<Select.Item value={milestone} label={AnnualLifecycleMilestoneLabels[milestone]}>
						{AnnualLifecycleMilestoneLabels[milestone]}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<Button variant="outline" class="w-full" onclick={resetPlacement}>
		Reset Placement
	</Button>

	<!-- Aggregate. -->
	<!-- Not yet a real field on PlantsCreateCommandSchema - re-add once it is. -->
	<!-- Origin. -->
	<!-- Locations. -->
	<!-- Geometries. -->
	<!-- Cultivar Attributes. -->
{/if}
