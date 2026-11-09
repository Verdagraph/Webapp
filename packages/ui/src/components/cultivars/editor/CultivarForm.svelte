<script lang="ts">
	import type { z } from 'zod';

	import {
		type Cultivar,
		CultivarAttributesUpdateCommandSchema,
		CultivarCategoryEnumOptions,
		cultivarFields
	} from '@vdg-webapp/models';

	import { Form, Input, Select, Textarea } from '$core';
	import type { ControlProps } from '$core';
	import type { AnyCommandHandler, FormState } from '$state/form';

	import SchemaFields from './SchemaFields.svelte';

	/** Value of the parent select option which clears the parent. */
	const NO_PARENT = '__none';

	type Props = {
		/** Create or update form: both share these fields. */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		form: FormState<z.ZodTypeAny, any, AnyCommandHandler>;
		/** Cultivars which may be chosen as the parent. */
		parentOptions: Pick<Cultivar, 'id' | 'name'>[];
		submitLabel: string;
	};
	let { form, parentOptions, submitLabel }: Props = $props();
	const handler = $derived(form.handler);

	const parentName = $derived(
		parentOptions.find((option) => option.id === form.data.parentId)?.name ?? 'None'
	);
</script>

<form onsubmit={form.submit} oninput={() => handler.reset()} class="space-y-4">
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label description={cultivarFields.cultivarNameSchema.description}
					>Name</Form.Label
				>
				<Input.Root {...props} type="text" bind:value={form.data.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.name} />
	</Form.Field>

	<Form.Field {form} name="names">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label
					description={cultivarFields.cultivarNamesSchema.description}
					optional={true}>Other names (comma separated)</Form.Label
				>
				<Input.Root
					{...props}
					type="text"
					value={(form.data.names ?? []).join(', ')}
					oninput={(event) => {
						form.data.names = event.currentTarget.value
							.split(',')
							.map((name) => name.trim())
							.filter((name) => name.length > 0);
					}}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.names} />
	</Form.Field>

	<Form.Field {form} name="category">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label
					description={cultivarFields.cultivarCategorySchema.description}
					optional={true}>Category</Form.Label
				>
				<Select.Root
					type="single"
					value={form.data.category ?? NO_PARENT}
					onValueChange={(selected) =>
						(form.data.category = selected === NO_PARENT ? undefined : selected)}
				>
					<Select.Trigger class="w-full" {...props}>
						{form.data.category
							? form.data.category.replace('_', ' ').toLowerCase()
							: 'Same as parent'}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Item value={NO_PARENT} label="Same as parent"
								>Same as parent</Select.Item
							>
							{#each CultivarCategoryEnumOptions as option (option)}
								<Select.Item
									value={option}
									label={option.replace('_', ' ').toLowerCase()}
									>{option.replace('_', ' ').toLowerCase()}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.category} />
	</Form.Field>

	<Form.Field {form} name="tags">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label
					description={cultivarFields.cultivarTagsSchema.description}
					optional={true}>Tags (comma separated)</Form.Label
				>
				<Input.Root
					{...props}
					type="text"
					value={(form.data.tags ?? []).join(', ')}
					oninput={(event) => {
						form.data.tags = event.currentTarget.value
							.split(',')
							.map((tag) => tag.trim())
							.filter((tag) => tag.length > 0);
					}}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.tags} />
	</Form.Field>

	<Form.Field {form} name="abbreviation">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label description={cultivarFields.cultivarAbbreviationSchema.description}
					>Abbreviation</Form.Label
				>
				<Input.Root {...props} type="text" bind:value={form.data.abbreviation} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.abbreviation} />
	</Form.Field>

	<Form.Field {form} name="scientificName">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label
					description={cultivarFields.cultivarScientificNameSchema.description}
					optional={true}>Scientific name</Form.Label
				>
				<Input.Root
					{...props}
					type="text"
					value={form.data.scientificName ?? ''}
					oninput={(event) => {
						form.data.scientificName = event.currentTarget.value || undefined;
					}}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.scientificName} />
	</Form.Field>

	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label
					description={cultivarFields.cultivarDescriptionSchema.description}
					optional={true}>Description</Form.Label
				>
				<Textarea.Root {...props} bind:value={form.data.description} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.description} />
	</Form.Field>

	<Form.Field {form} name="parentId">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label
					description="A cultivar in this collection, or one it inherits, which this cultivar is a variety of."
					optional={true}>Variety of</Form.Label
				>
				<Select.Root
					type="single"
					value={form.data.parentId ?? NO_PARENT}
					onValueChange={(selected) =>
						(form.data.parentId = selected === NO_PARENT ? undefined : selected)}
				>
					<Select.Trigger class="w-full" {...props}>{parentName}</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Item value={NO_PARENT} label="None">None</Select.Item>
							{#each parentOptions as option (option.id)}
								<Select.Item value={option.id} label={option.name}
									>{option.name}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.parentId} />
	</Form.Field>

	<!-- Attribute profiles: generated from the attributes command schema. -->
	<div class="space-y-2">
		<span class="font-medium">Attributes</span>
		<SchemaFields
			{form}
			schema={CultivarAttributesUpdateCommandSchema}
			path="attributes"
		/>
	</div>

	<Form.NonFieldErrors handlerErrors={handler.nonFieldErrors} />
	<Form.Button loading={handler.isLoading} class="w-full">{submitLabel}</Form.Button>
</form>
