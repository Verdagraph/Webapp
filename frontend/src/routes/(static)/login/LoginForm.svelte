<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { userLogin } from '$lib/dataNew/user/auth';
	import { createServerErrors } from '$state/formServerErrors.svelte';
	import authentication from '$state/authentication.svelte';
	import type {AxiosError} from 'axios'
	/* Form mutation. */
	const mutation = userLogin.mutation();
	/* Server error state. */
	const serverErrors = createServerErrors();

	/**
	 * Standard form configuration:
	 * - SPA: True disables server-side functionality.
	 * - validators: Zod schema specifies form validation.
	 * - onUpdate: Submission handler. Activates svelte-query mutation,
	 *  executes success task, and sets server errors on failure.
	 * - onChange: Reset server errors.
	 */
	const form = superForm(defaults(zod(userLogin.schema)), {
		SPA: true,
		validators: zod(userLogin.schema),
		onUpdate({ form }) {
			if (form.valid) {
				$mutation.mutate(form.data, {
					onSuccess: (data) => {
						/**
						 * TODO: Move this state update to the data layer.
						 * It is here because having both onSuccess callbacks
						 * caused only the first to be run.
						 */
						authentication.login();
						goto('/app');
					},
					onError: (error) => {
						// @ts-ignore
						serverErrors.setErrors(error);
					}
				});
			}
		},
		onChange() {
			serverErrors.reset();
		}
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<!-- Email address -->
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label
				description={userLogin.schema.shape.email.description}
				optional={userLogin.schema.shape.email.isOptional()}>Email</Form.Label
			>
			<Input
				{...attrs}
				type="email"
				placeholder="email@example.com"
				bind:value={$formData.email}
			/>
		</Form.Control>
		<Form.FieldErrors serverErrors={serverErrors.errors['email']} />
	</Form.Field>

	<!-- Password -->
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label
				description={userLogin.schema.shape.password.description}
				optional={userLogin.schema.shape.password.isOptional()}>Password</Form.Label
			>
			<Input {...attrs} type="password" bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors serverErrors={serverErrors.errors['password']} />
	</Form.Field>

	<!-- Submit button -->
	<Form.Button
		disabled={false}
		loading={$mutation.isLoading}
		variant="default"
		class="mt-4 w-full">Submit</Form.Button
	>
</form>
