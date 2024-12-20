<script lang="ts">
	import { getContext } from 'svelte';
	import Icon from '@iconify/svelte';
	import * as Form from '$lib/components/ui/form';
	import * as Textarea from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import UnitAwareInput from '$components/units/UnitAwareInput.svelte';
	import { Input } from '$lib/components/ui/input';
	import { plantingAreaCreateFormId } from '../activeWorkspace.svelte';
	import { plantingAreaCreate } from '$data/workspaces/commands';
	import type { PlantingAreaCreateForm } from '../[workspaceSlug]/forms';
	import { GeometryTypeEnum } from '@vdt-webapp/common';
	import iconIds from '$lib/assets/icons';

	const { handler, form } = getContext<PlantingAreaCreateForm>(
		plantingAreaCreateFormId
	);
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
</script>

<form method="POST" autocomplete="off" use:enhance class="mx-4 my-8">
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
	<fieldset>
		<div class="my-2 flex items-center">
			<span class="text-neutral-11 mr-2"> Position </span>
			<span class="w-full">
				<Separator class="w-full" />
			</span>
		</div>

		<!-- X Coordinate. -->
		<Form.Field {form} name="location.coordinate.x">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label
						description={plantingAreaCreate.schema.shape.location.shape.coordinate.shape
							.x.description}
						optional={plantingAreaCreate.schema.shape.location.shape.coordinate.shape.x.isOptional()}
						>X</Form.Label
					>
					<UnitAwareInput
						{...props}
						quantityType="distance"
						bind:value={$formData.location.coordinate.x}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors
				handlerErrors={handler.fieldErrors?.['location.coordinate.x']}
			/>
		</Form.Field>

		<!-- Y Coordinate. -->
		<Form.Field {form} name="location.coordinate.y">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label
						description={plantingAreaCreate.schema.shape.location.shape.coordinate.shape
							.y.description}
						optional={plantingAreaCreate.schema.shape.location.shape.coordinate.shape.y.isOptional()}
						>Y</Form.Label
					>
					<UnitAwareInput
						{...props}
						quantityType="distance"
						bind:value={$formData.location.coordinate.y}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors
				handlerErrors={handler.fieldErrors?.['location.coordinate.y']}
			/>
		</Form.Field>

		<!-- Date -->
		Date
	</fieldset>

	<!-- Geometry. -->
	<fieldset>
		<div class="my-2 flex items-center">
			<span class="text-neutral-11 mr-2"> Geometry </span>
			<span class="w-full">
				<Separator class="w-full" />
			</span>
		</div>

		<!-- Type. -->
		<Form.Field {form} name="location.coordinate.x">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label
						description={plantingAreaCreate.schema.shape.geometry.innerType().shape.type
							.description}
						optional={plantingAreaCreate.schema.shape.geometry
							.innerType()
							.shape.type.isOptional()}>Type</Form.Label
					>
					<Select.Root
						{...props}
						type="single"
						name="geometryType"
						bind:value={$formData.geometry.type}
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
				handlerErrors={handler.fieldErrors?.['location.coordinate.x']}
			/>
		</Form.Field>

		<!-- Scale factor. -->
		Scale factor

		<!-- Rotation. -->
		Rotation

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
							quantityType="distance"
							bind:value={$formData.geometry.rectangleAttributes.width}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors
					handlerErrors={handler.fieldErrors?.['geometry.rectangleAttributes.width']}
				/>
			</Form.Field>
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
							bind:value={$formData.geometry.polygonAttributes.numSides}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors
					handlerErrors={handler.fieldErrors?.['geometry.polygonAttributes.numSides']}
				/>
			</Form.Field>

			<!-- Side length. -->
			<Form.Field {form} name="geometry.polygonAttributes.sideLength">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							description={plantingAreaCreate.schema.shape.geometry.innerType().shape
								.polygonAttributes.shape.sideLength.description}
							optional={plantingAreaCreate.schema.shape.geometry
								.innerType()
								.shape.polygonAttributes.shape.sideLength.isOptional()}
							>Side Length</Form.Label
						>
						<UnitAwareInput
							{...props}
							quantityType="distance"
							bind:value={$formData.geometry.polygonAttributes.sideLength}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors
					handlerErrors={handler.fieldErrors?.['geometry.polygonAttributes.sideLength']}
				/>
			</Form.Field>
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
		{:else if $formData.geometry.type === 'LINES'}
			<!-- Coordinate add button. -->
			<Button
				onclick={() => {
					$formData.geometry.linesAttributes.coordinates = [
						...$formData.geometry.linesAttributes.coordinates,
						{ x: 0, y: 0 }
					];
					console.log($formData.geometry.linesAttributes.coordinates);
				}}
				variant="outline"
				class="mb-4 flex w-full items-center justify-between"
			>
				<span> Add Point </span>
				<Icon icon={iconIds.addIcon} width="1.5rem" />
			</Button>

			<!-- Coordinate. -->
			{#each $formData.geometry.linesAttributes.coordinates as coordinate, index (index)}
				<!-- X Coordinate. -->
				<Form.Field {form} name={`geometry.linesAttributes.coordinates[${index}]`}>
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label
								description={plantingAreaCreate.schema.shape.geometry.innerType().shape
									.linesAttributes.shape.coordinates._def.type.shape.x.description}
								optional={plantingAreaCreate.schema.shape.geometry
									.innerType()
									.shape.linesAttributes.shape.coordinates._def.type.shape.x.isOptional()}
								>X-{index}</Form.Label
							>
							<UnitAwareInput
								{...props}
								quantityType="distance"
								bind:value={$formData.geometry.linesAttributes.coordinates[index].x}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors
						handlerErrors={handler.fieldErrors?.[
							`geometry.linesAttributes.coordinates[${index}].x`
						]}
					/>
				</Form.Field>

				<!-- Y Coordinate. -->
				<Form.Field {form} name={`geometry.linesAttributes.coordinates[${index}]`}>
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label
								description={plantingAreaCreate.schema.shape.geometry.innerType().shape
									.linesAttributes.shape.coordinates._def.type.shape.y.description}
								optional={plantingAreaCreate.schema.shape.geometry
									.innerType()
									.shape.linesAttributes.shape.coordinates._def.type.shape.y.isOptional()}
								>Y-{index}</Form.Label
							>
							<UnitAwareInput
								{...props}
								quantityType="distance"
								bind:value={$formData.geometry.linesAttributes.coordinates[index].y}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors
						handlerErrors={handler.fieldErrors?.[
							`geometry.linesAttributes.coordinates[${index}]`
						]}
					/>
				</Form.Field>
			{/each}
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

		<!-- Row Count. -->
		Number of Rows
		<!-- Column Count. -->
		Number of Columns
	</fieldset>

	<!-- Other. -->
	<fieldset>
		<div class="my-2 flex items-center">
			<span class="text-neutral-11 mr-2"> Other </span>
			<span class="w-full">
				<Separator class="w-full" />
			</span>
		</div>

		<!-- Movable. -->
		Movable
		<!-- Depth. -->
		Depth
	</fieldset>

	<!-- Submit button -->
	<Form.Button
		disabled={false}
		loading={handler.isLoading}
		variant="default"
		class="mt-4 w-full">Create</Form.Button
	>
</form>
