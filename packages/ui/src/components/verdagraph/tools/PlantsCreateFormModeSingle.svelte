<script lang="ts">
	import Icon from '@iconify/svelte';
	import { useQuery } from '@triplit/svelte';
	import { useId } from 'bits-ui';
	import { tick } from 'svelte';
	import { toast } from 'svelte-sonner';

	import {
		AppError,
		plantsCreateCommandSinglePlantSchema,
		starterGeometryFromExpectedProfile
	} from '@vdg-webapp/models';

	import { iconIds } from '$assets';
	import { CoordinateInput, GeometrySelect, UnitAwareInput } from '$components';
	import {
		Button,
		Command,
		Form,
		Input,
		Popover,
		Separator,
		Textarea
	} from '$core';
	import { buttonVariants } from '$core/button/button.svelte';
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
	 * Seeds the preview's starter geometry/location once a real cultivar is
	 * picked, so CreatePlantContainer (reading this same form data) has
	 * something to render immediately. Size re-seeds every time the cultivar
	 * changes, matching whichever Cultivar is now selected; position is only
	 * seeded once (centered in the current Layout viewport) - re-seeding it
	 * on every cultivar change would snap away a position the user already
	 * dragged the preview to just because they changed their mind about
	 * which cultivar this stamp is.
	 */
	let previousSeededCultivarName: string | null = $state(null);
	$effect(() => {
		const cultivarName = $formData.plants[0]?.cultivarName;
		if (!cultivarName || !ctx.cultivars.cultivarNames.has(cultivarName)) {
			/**
			 * Cleared, not left as-is: a fresh stamp's cultivarName resets to
			 * '' after each successful create, so the next selection - even
			 * of the very same cultivar as the stamp before it - needs to be
			 * treated as new rather than matching a stale previous value.
			 */
			previousSeededCultivarName = null;
			return;
		}
		/**
		 * Without this guard, the write below re-triggers this same effect
		 * indefinitely: $formData is a superforms store, which notifies on
		 * any write to it regardless of which property changed, so
		 * assigning geometryHistory would itself cause this effect (which
		 * reads cultivarName off the same store) to run again - forever,
		 * since the condition it reruns under never stops being true.
		 */
		if (cultivarName === previousSeededCultivarName) {
			return;
		}
		previousSeededCultivarName = cultivarName;

		const cultivar = [...ctx.cultivars.cultivars].find((c) => c.name === cultivarName);
		const focusedDay = verdagraphContext.timeline.focusUtc;

		$formData.plants[0].geometryHistory = {
			gardenId: ctx.garden.id,
			geometries: [
				starterGeometryFromExpectedProfile(
					cultivar?.attributes?.expectedGeometry,
					focusedDay
				)
			]
		};

		if ($formData.plants[0].locationHistory.locations.length === 0) {
			const workspaceId = verdagraphContext.selections
				.get('workspace')
				.values()
				.next().value;
			if (!workspaceId) {
				return;
			}

			const center = verdagraphContext.layoutCanvasContext.transform.viewportCenterModel();
			$formData.plants[0].locationHistory = {
				gardenId: ctx.garden.id,
				locations: [
					{
						gardenId: ctx.garden.id,
						workspaceId,
						coordinate: center,
						date: focusedDay
					}
				]
			};
		}
	});
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

	<!-- Aggregate. -->
	<!-- Not yet a real field on PlantsCreateCommandSchema - re-add once it is. -->
	<!-- Origin. -->
	<!-- Locations. -->
	<!-- Geometries. -->
	<!-- Cultivar Attributes. -->
{/if}
