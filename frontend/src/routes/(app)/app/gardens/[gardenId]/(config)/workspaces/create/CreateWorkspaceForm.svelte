<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { workspaceCreate } from '$data/workspaces/commands';
	import createMutationHandler from '$state/mutationHandler.svelte';

	let formHandler = createMutationHandler(workspaceCreate.mutation, {
		onSuccess: (workspace) => {
			const workspaceHref = `/app/gardens/${$page.params.gardenId}/workspaces/${workspace.slug}`;
			goto(workspaceHref);
		}
	});
	const form = superForm(defaults(zod(workspaceCreate.schema)), {
		SPA: true,
		resetForm: false,
		validators: zod(workspaceCreate.schema),
		onUpdate({ form }) {
			if (form.valid) {
				formHandler.execute(form.data);
			}
		},
		onChange() {
			formHandler.reset();
		}
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<!-- Name. -->
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={workspaceCreate.schema.shape.name.description}
					optional={workspaceCreate.schema.shape.name.isOptional()}>Name</Form.Label
				>
				<Input
					{...props}
					type="text"
					placeholder="Backyard"
					bind:value={$formData.name}
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
					description={workspaceCreate.schema.shape.description.description}
					optional={workspaceCreate.schema.shape.description.isOptional()}
					>Description</Form.Label
				>
				<Textarea {...props} bind:value={$formData.description} />
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
