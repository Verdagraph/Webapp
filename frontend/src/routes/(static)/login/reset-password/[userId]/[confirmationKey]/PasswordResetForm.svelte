<script lang="ts">
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { userConfirmPasswordReset } from '$lib/dataNew/user/commands';
	import { createFormErrors } from '$state/formErrors.svelte';
	import type { AxiosError } from 'axios';
	import type { ServerErrorResponse } from '@vdt-webapp/common/src/errors';
	type Props = {
		/** Set to true once the form has been submitted and received a 200 response. */
		succeeded: boolean;
	};

	let { succeeded = $bindable(false) }: Props = $props();

	/* Form mutation. */
	const mutation = userConfirmPasswordReset.mutation();
	/* Form error state. */
	const formErrors = createFormErrors();

	/**
	 * Standard form configuration:
	 * - SPA: True disables server-side functionality.
	 * - validators: Zod schema specifies form validation.
	 * - onUpdate: Submission handler. Activates svelte-query mutation,
	 *  executes success task, and sets server errors on failure.
	 * - onChange: Reset server errors.
	 */
	const initialData = {
		userId: $page.params.userId,
		token: $page.params.confirmationKey,
		password1: '',
		password2: ''
	};
	const form = superForm(defaults(initialData, zod(userConfirmPasswordReset.schema)), {
		SPA: true,
		validators: zod(userConfirmPasswordReset.schema),
		onUpdate({ form }) {
			if (form.valid) {
				$mutation.mutate(form.data, {
					onSuccess: () => {
						succeeded = true;
					},
					onError: (error) => {
						formErrors.setServerErrors(error as AxiosError<ServerErrorResponse>);
					}
				});
			}
		},
		onChange() {
			formErrors.reset();
		}
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" autocomplete="off" use:enhance>
	<!-- New Password1 -->
	<Form.Field {form} name="password1">
		<Form.Control let:attrs>
			<Form.Label
				description={userConfirmPasswordReset.schema.innerType().shape.password1
					.description}
				optional={userConfirmPasswordReset.schema
					.innerType()
					.shape.password1.isOptional()}>New Password</Form.Label
			>
			<Input {...attrs} type="password" bind:value={$formData.password1} />
		</Form.Control>
		<Form.FieldErrors serverErrors={formErrors.fieldErrors?.password1?} />
	</Form.Field>

	<!-- Password2 -->
	<Form.Field {form} name="password2">
		<Form.Control let:attrs>
			<Form.Label
				description={userConfirmPasswordReset.schema.innerType().shape.password2
					.description}
				optional={userConfirmPasswordReset.schema
					.innerType()
					.shape.password2.isOptional()}>Confirm Password</Form.Label
			>
			<Input {...attrs} type="password" bind:value={$formData.password2} />
		</Form.Control>
		<Form.FieldErrors serverErrors={formErrors.fieldErrors?.password2?} />
	</Form.Field>

	<!-- Submit button -->
	<Form.Button
		disabled={false}
		loading={$mutation.isLoading}
		variant="default"
		class="mt-4 w-full">Submit</Form.Button
	>
</form>
