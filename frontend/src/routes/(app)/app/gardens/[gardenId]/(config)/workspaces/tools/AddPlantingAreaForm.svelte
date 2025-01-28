<script lang="ts">
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import * as Form from '$lib/components/ui/form';
	import * as Textarea from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import { UnitAwareInput, CoordinateInput } from '$components/units';
	import { Input } from '$lib/components/ui/input';
	import { plantingAreaCreate } from '$data/workspaces/commands';
	import iconIds from '$lib/assets/icons';
	import Checkbox from '$components/ui/checkbox/checkbox.svelte';
	import { getWorkspaceContext } from '../activeWorkspace.svelte';
	import { toast } from 'svelte-sonner';
	import { AppError } from '@vdt-webapp/common/src/errors';

	const workspaceContext = getWorkspaceContext();
	const form = workspaceContext.plantingAreaCreateForm.form;
	const handler = workspaceContext.plantingAreaCreateForm.handler;
	const { form: formData, enhance } = form;

	const geometryTypeOptions = [
		{ value: 'RECTANGLE', label: 'Rectangle', icon: iconIds.rectangleIcon },
		{ value: 'POLYGON', label: 'Polygon', icon: iconIds.polygonIcon },
		{ value: 'ELLIPSE', label: 'Ellipse', icon: iconIds.ellipseIcon },
		{ value: 'LINES', label: 'Lines', icon: iconIds.linesIcon }
	];
	const geometryTypeSelectTrigger = $derived(
		geometryTypeOptions.find((option) => option.value === $formData.geometry.type) ?? {
			label: 'Select a type',
			icon: null
		}
	);

	$effect(() => {
		if (!workspaceContext.id) {
			toast.error('Error retrieving workspace context.');
			throw new AppError('Error retrieving workspace contxet.');
		}

		$formData.gardenId = page.params.gardenId;
		$formData.workspaceId = workspaceContext.id;
		$formData.geometry.date = workspaceContext.timelineSelection.focusUtc;
		$formData.location.date = workspaceContext.timelineSelection.focusUtc;
	});

	let generateGridSpacing: number = $state(0.3048);
</script>

<form method="POST" autocomplete="off" use:enhance class="mx-4 mb-8 mt-4">
	<!-- Name. -->
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={plantingAreaCreate.schema.shape.name.description}
					optional={plantingAreaCreate.schema.shape.name.isOptional()}>Name</Form.Label
				>
				<Input
					{...props}
					type="text"
					placeholder="Big Bed"
					bind:value={$formData.name}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.name} />
	</Form.Field>

	<!-- Description. -->
	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={plantingAreaCreate.schema.shape.description.description}
					optional={plantingAreaCreate.schema.shape.description.isOptional()}
					>Description</Form.Label
				>
				<Textarea.Root {...props} bind:value={$formData.description} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.description} />
	</Form.Field>

	<!-- Position. -->
	<Form.Field {form} name="location">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={plantingAreaCreate.schema.shape.location.description}
					optional={plantingAreaCreate.schema.shape.location.isOptional()}
					>Position</Form.Label
				>
				<CoordinateInput
					{...props}
					bind:x={$formData.location.coordinate.x}
					bind:y={$formData.location.coordinate.y}
				/>
			{/snippet}
		</Form.Control>
	</Form.Field>

	<!-- Geometry. -->
	<fieldset>
		<div class="my-2 flex items-center">
			<span class="text-neutral-11 mr-2"> Geometry </span>
			<span class="w-full">
				<Separator class="w-full" />
			</span>
		</div>

		<!-- Type. -->
		<Form.Field {form} name="geometry.type">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label
						description={plantingAreaCreate.schema.shape.geometry.innerType().shape.type
							.description}
						optional={plantingAreaCreate.schema.shape.geometry
							.innerType()
							.shape.type.isOptional()}>Type</Form.Label
					>
					<Select.Root {...props} type="single" bind:value={$formData.geometry.type}>
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
												<Icon
													icon={option.icon}
													width="1rem"
													class="text-neutral-11 ml-4"
												/>
											{/if}
										</div>
									</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors
				handlerErrors={handler.fieldErrors?.['geometry.type']}
			/>
		</Form.Field>

		<!-- Rotation. -->
		<Form.Field {form} name="geometry.rotation">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label
						description={plantingAreaCreate.schema.shape.geometry.innerType().shape
							.rotation.description}
						optional={plantingAreaCreate.schema.shape.geometry
							.innerType()
							.shape.rotation.isOptional()}>Rotation</Form.Label
					>
					<Input {...props} type="number" bind:value={$formData.geometry.rotation} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors handlerErrors={handler.fieldErrors?.['geometry.rotation']} />
		</Form.Field>

		<!-- RECTANGLE GEOMETRY. -->
		{#if $formData.geometry.type === 'RECTANGLE'}
			<!-- Length. -->
			<Form.Field {form} name="geometry.rectangleAttributes.length">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							description={plantingAreaCreate.schema.shape.geometry.innerType().shape
								.rectangleAttributes.shape.length.description}
							optional={plantingAreaCreate.schema.shape.geometry
								.innerType()
								.shape.rectangleAttributes.shape.length.isOptional()}>Length</Form.Label
						>
						<UnitAwareInput
							{...props}
							min={0}
							quantityType="distance"
							bind:value={$formData.geometry.rectangleAttributes.length}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors
					handlerErrors={handler.fieldErrors?.['geometry.rectangleAttributes.length']}
				/>
			</Form.Field>

			<!-- Width. -->
			<Form.Field {form} name="geometry.rectangleAttributes.width">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							description={plantingAreaCreate.schema.shape.geometry.innerType().shape
								.rectangleAttributes.shape.width.description}
							optional={plantingAreaCreate.schema.shape.geometry
								.innerType()
								.shape.rectangleAttributes.shape.width.isOptional()}>Width</Form.Label
						>
						<UnitAwareInput
							{...props}
							min={0}
							quantityType="distance"
							bind:value={$formData.geometry.rectangleAttributes.width}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors
					handlerErrors={handler.fieldErrors?.['geometry.rectangleAttributes.width']}
				/>
			</Form.Field>

		<!-- POLYGON GEOMETRY. -->
		{:else if $formData.geometry.type === 'POLYGON'}
			<!-- Side count. -->
			<Form.Field {form} name="geometry.polygonAttributes.numSides">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							description={plantingAreaCreate.schema.shape.geometry.innerType().shape
								.polygonAttributes.shape.numSides.description}
							optional={plantingAreaCreate.schema.shape.geometry
								.innerType()
								.shape.polygonAttributes.shape.numSides.isOptional()}
							>Side Count</Form.Label
						>
						<Input
							{...props}
							type="number"
							min={3}
							bind:value={$formData.geometry.polygonAttributes.numSides}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors
					handlerErrors={handler.fieldErrors?.['geometry.polygonAttributes.numSides']}
				/>
			</Form.Field>

			<!-- Radius. -->
			<Form.Field {form} name="geometry.polygonAttributes.radius">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							description={plantingAreaCreate.schema.shape.geometry.innerType().shape
								.polygonAttributes.shape.radius.description}
							optional={plantingAreaCreate.schema.shape.geometry
								.innerType()
								.shape.polygonAttributes.shape.radius.isOptional()}>Radius</Form.Label
						>
						<UnitAwareInput
							{...props}
							quantityType="distance"
							min={0}
							bind:value={$formData.geometry.polygonAttributes.radius}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors
					handlerErrors={handler.fieldErrors?.['geometry.polygonAttributes.radius']}
				/>
			</Form.Field>

		<!-- ELLIPSE GEOMETRY. -->
		{:else if $formData.geometry.type === 'ELLIPSE'}
			<!-- Length diameter. -->
			<Form.Field {form} name="geometry.ellipseAttributes.lengthDiameter">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							description={plantingAreaCreate.schema.shape.geometry.innerType().shape
								.ellipseAttributes.shape.lengthDiameter.description}
							optional={plantingAreaCreate.schema.shape.geometry
								.innerType()
								.shape.ellipseAttributes.shape.lengthDiameter.isOptional()}
							>Length Diameter</Form.Label
						>
						<UnitAwareInput
							{...props}
							min={0}
							quantityType="distance"
							bind:value={$formData.geometry.ellipseAttributes.lengthDiameter}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors
					handlerErrors={handler.fieldErrors?.[
						'geometry.ellipseAttributes.lengthDiameter'
					]}
				/>
			</Form.Field>

			<!-- Width diameter. -->
			<Form.Field {form} name="geometry.ellipseAttributes.widthDiameter">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							description={plantingAreaCreate.schema.shape.geometry.innerType().shape
								.ellipseAttributes.shape.widthDiameter.description}
							optional={plantingAreaCreate.schema.shape.geometry
								.innerType()
								.shape.ellipseAttributes.shape.widthDiameter.isOptional()}
							>Width Diameter</Form.Label
						>
						<UnitAwareInput
							{...props}
							min={0}
							quantityType="distance"
							bind:value={$formData.geometry.ellipseAttributes.widthDiameter}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors
					handlerErrors={handler.fieldErrors?.[
						'geometry.ellipseAttributes.widthDiameter'
					]}
				/>
			</Form.Field>

		<!-- LINES GEOMETRY. -->
		{:else if $formData.geometry.type === 'LINES'}
		<!-- Coordinate. -->
		{#each $formData.geometry.linesAttributes.coordinates as coordinate, index}
		<Form.Field {form} name={`geometry.linesAttributes.coordinates[${index}]`}>
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label
								description={plantingAreaCreate.schema.shape.geometry
									.innerType()
									.shape.linesAttributes.shape.coordinates._def.innerType._def.description}
								optional={plantingAreaCreate.schema.shape.geometry
									.innerType()
									.shape.linesAttributes.shape.coordinates._def.innerType._def.type.isOptional()}>Coordinate {index}</Form.Label
							>
							<CoordinateInput {...props} bind:x={$formData.geometry.linesAttributes.coordinates[index].x} bind:y={$formData.geometry.linesAttributes.coordinates[index].y} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors
					handlerErrors={handler.fieldErrors?.[
							`geometry.linesAttributes.coordinates[${index}]`
						]}
					/>
				</Form.Field>
				{/each}

				<!-- Coordinate add button. -->
				<Button
					onclick={() => {
						$formData.geometry.linesAttributes.coordinates = [
							...$formData.geometry.linesAttributes.coordinates,
							{ x: 0, y: 0 }
						];
					}}
					variant="outline"
					class="mb-4 flex w-full items-center justify-between"
				>
					<span> Add Point </span>
					<Icon icon={iconIds.addIcon} width="1.5rem" />
				</Button>
		{/if}
	</fieldset>

	<!-- Grid. -->
	<fieldset>
		<div class="my-2 flex items-center">
			<span class="text-neutral-11 mr-2"> Grid </span>
			<span class="w-full">
				<Separator class="w-full" />
			</span>
		</div>

		<Form.Field {form} name="includeGrid">
			<Form.Control>
				{#snippet children({ props })}
					<div class="flex items-center justify-between">
						<Form.Label
							description={plantingAreaCreate.schema.shape.includeGrid.description}
							optional={plantingAreaCreate.schema.shape.includeGrid.isOptional()}
							>Include Grid</Form.Label
						>
						<Checkbox {...props} bind:checked={$formData.includeGrid} />
					</div>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors handlerErrors={handler.fieldErrors?.['includeGrid']} />
		</Form.Field>

		{#if $formData.includeGrid}
			<!-- Grid generate button. -->
			<div class="mb-4 flex flex-col gap-4">
				<span class="text-sm"> Grid Spacing </span>
				<UnitAwareInput
					min={0}
					quantityType="distance"
					bind:value={generateGridSpacing}
				/>
				<Button onclick={() => {}} variant="outline" class="w-full">
					Generate Grid
				</Button>
			</div>

			<!-- Row count. -->
			<Form.Field {form} name="grid.numRows">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							description={plantingAreaCreate.schema.shape.grid.shape.numRows
								.description}
							optional={plantingAreaCreate.schema.shape.grid.shape.numRows.isOptional()}
							>Number of Rows</Form.Label
						>
						<Input
							{...props}
							type="number"
							step="1"
							min={2}
							bind:value={$formData.grid.numRows}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors handlerErrors={handler.fieldErrors?.['grid.numRows']} />
			</Form.Field>

			<!-- Column count. -->
			<Form.Field {form} name="grid.numColumns">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							description={plantingAreaCreate.schema.shape.grid.shape.numColumns
								.description}
							optional={plantingAreaCreate.schema.shape.grid.shape.numColumns.isOptional()}
							>Number of Columns</Form.Label
						>
						<Input
							{...props}
							type="number"
							step="1"
							min={2}
							bind:value={$formData.grid.numColumns}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors handlerErrors={handler.fieldErrors?.['grid.numColumns']} />
			</Form.Field>
		{/if}
	</fieldset>

	<!-- Other. -->
	<fieldset>
		<div class="my-2 flex items-center">
			<span class="text-neutral-11 mr-2"> Other </span>
			<span class="w-full">
				<Separator class="w-full" />
			</span>
		</div>

		<!-- Depth. -->
		<Form.Field {form} name={`depth`}>
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label
						description={plantingAreaCreate.schema.shape.depth.description}
						optional={plantingAreaCreate.schema.shape.depth.isOptional()}
						>Depth</Form.Label
					>
					<UnitAwareInput
						{...props}
						min={0}
						quantityType="distance"
						bind:value={$formData.depth}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors handlerErrors={handler.fieldErrors?.['depth']} />
		</Form.Field>
	</fieldset>

	<!-- Submit button -->
	<Form.Button
		disabled={false}
		loading={handler.isLoading}
		variant="default"
		class="mt-4 w-full">Create</Form.Button
	>
</form>
