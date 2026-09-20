<script lang="ts">
	import {
		WorkspaceCreateCommandSchema,
		workspaceCreate,
		workspaceFields
	} from '@vdg-webapp/models';
	import { createForm, Form, Input, Textarea } from '@vdg-webapp/ui';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import controller from '$data/controller';
	import createCommandHandler from '$state/commandHandler.svelte';

	let formHandler = createCommandHandler(
		(data: Parameters<typeof workspaceCreate>[0]) => workspaceCreate(data, controller),
		{
			onSuccess: (workspace) => {
				const workspaceHref = `/gardens/${page.params.gardenId}/workspaces/${workspace.slug}`;
				goto(workspaceHref);
			}
		}
	);
	const form = createForm(WorkspaceCreateCommandSchema, {
		initialValues: { gardenId: page.params.gardenId },
		onSubmit: (data) => formHandler.execute(data)
	});
</script>

<form onsubmit={form.submit} oninput={() => formHandler.reset()}>
	<!-- Name. -->
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={workspaceFields.workspaceNameSchema.description}
					optional={false}>Name</Form.Label
				>
				<Input.Root
					{...props}
					type="text"
					placeholder="Backyard"
					bind:value={form.data.name}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={formHandler.fieldErrors?.name} />
	</Form.Field>

	<!-- Description. -->
	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={workspaceFields.workspaceDescriptionSchema.description}
					optional={true}>Description</Form.Label
				>
				<Textarea.Root {...props} bind:value={form.data.description} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={formHandler.fieldErrors?.description} />
	</Form.Field>

	<!-- Non-field errors. -->
	<Form.NonFieldErrors handlerErrors={formHandler.nonFieldErrors} />

	<!-- Submit button -->
	<Form.Button
		disabled={false}
		loading={formHandler.isLoading}
		variant="default"
		class="mt-2 w-full">Submit</Form.Button
	>
</form>
