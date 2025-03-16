<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { userLogin } from '$data/users/auth';
	import createMutationHandler from '$state/mutationHandler.svelte';
	import { userFields } from '@vdt-webapp/common';

	let formHandler = createMutationHandler(userLogin.mutation, {
		onSuccess: () => {
			goto('/app');
		}
	});
	const form = superForm(defaults(zod(userLogin.schema)), {
		SPA: true,
		resetForm: false,
		validators: zod(userLogin.schema),
		onUpdate({ form }) {
			console.log(form.valid);
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
	<!-- Email address -->
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label description={userFields.emailSchema.description}>Email</Form.Label>
				<Input
					{...props}
					type="email"
					placeholder="email@example.com"
					bind:value={$formData.email}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={formHandler.fieldErrors?.email} />
	</Form.Field>

	<!-- Password -->
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label description={userFields.passwordSchema.description}
					>Password</Form.Label
				>
				<Input {...props} type="password" bind:value={$formData.password} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={formHandler.fieldErrors?.password} />
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
