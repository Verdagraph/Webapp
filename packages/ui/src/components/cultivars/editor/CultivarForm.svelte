<script lang="ts">
	import type { z } from 'zod';

	import {
		type Cultivar,
		CultivarAttributesUpdateCommandSchema,
		cultivarFields
	} from '@vdg-webapp/models';

	import { Form, Input, Select, Textarea } from '$core';
	import type { ControlProps } from '$core';
	import type createCommandHandler from '$state/commandHandler.svelte';
	import type { FormState } from '$state/form';

	import SchemaFields from './SchemaFields.svelte';

	/** Value of the parent select option which clears the parent. */
	const NO_PARENT = '__none';

	type Props = {
		/** Create or update form: both share these fields. */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		form: FormState<z.ZodTypeAny, any>;
		handler: ReturnType<typeof createCommandHandler<never[], unknown>>;
		/** Cultivars which may be chosen as the parent. */
		parentOptions: Pick<Cultivar, 'id' | 'name'>[];
		submitLabel: string;
	};
	let { form, handler, parentOptions, submitLabel }: Props = $props();

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
