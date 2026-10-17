<script lang="ts">
	import type { z } from 'zod';

	import {
		type CultivarCollection,
		CultivarCollectionVisibilityEnumOptions,
		cultivarFields
	} from '@vdg-webapp/models';

	import { Form, Input, Select, Textarea } from '$core';
	import type { ControlProps } from '$core';
	import type createCommandHandler from '$state/commandHandler.svelte';
	import type { FormState } from '$state/form';

	/** Value of the parent select option which clears the parent. */
	const NO_PARENT = '__none';

	type Props = {
		/** Create or update form: both share these fields. */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		form: FormState<z.ZodTypeAny, any>;
		handler: ReturnType<typeof createCommandHandler<never[], unknown>>;
		/** Collections which may be chosen as the parent. */
		parentOptions: Pick<CultivarCollection, 'id' | 'name'>[];
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
				<Form.Label
					description={cultivarFields.cultivarCollectionNameSchema.description}
					>Name</Form.Label
				>
				<Input.Root {...props} type="text" bind:value={form.data.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.name} />
	</Form.Field>

	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label
					description={cultivarFields.cultivarCollectionDescriptionSchema.description}
					optional={true}>Description</Form.Label
				>
				<Textarea.Root {...props} bind:value={form.data.description} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.description} />
	</Form.Field>

	<Form.Field {form} name="visibility">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label
					description={cultivarFields.cultivarCollectionVisibilitySchema.description}
					optional={true}>Visibility</Form.Label
				>
				<Select.Root
					type="single"
					value={form.data.visibility}
					onValueChange={(selected) => (form.data.visibility = selected)}
				>
					<Select.Trigger class="w-full" {...props}
						>{form.data.visibility}</Select.Trigger
					>
					<Select.Content>
						<Select.Group>
							{#each CultivarCollectionVisibilityEnumOptions as option (option)}
								<Select.Item value={option} label={option}>{option}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={handler.fieldErrors?.visibility} />
	</Form.Field>

	<Form.Field {form} name="tags">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label
					description={cultivarFields.cultivarCollectionTagsSchema.description}
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

	<Form.Field {form} name="parentId">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label
					description="Inherits all cultivars of the parent collection, which this collection may override."
					optional={true}>Inherits from</Form.Label
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

	<Form.NonFieldErrors handlerErrors={handler.nonFieldErrors} />
	<Form.Button loading={handler.isLoading} class="w-full">{submitLabel}</Form.Button>
</form>
