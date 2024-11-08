<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { userRequestPasswordReset } from '$lib/dataNew/user/commands';
	import { createFormErrors } from '$state/formErrors.svelte';
	import type { AxiosError } from 'axios';
	import type { ServerErrorResponse } from '@vdt-webapp/common/src/errors';
	type Props = {
		/** Set to true once the form has been submitted and received a 200 response. */
		succeeded: boolean;
	};

	let { succeeded = $bindable(false) }: Props = $props();

	/* Form mutation. */
	const mutation = userRequestPasswordReset.mutation();
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
	const form = superForm(defaults(zod(userRequestPasswordReset.schema)), {
		SPA: true,
		validators: zod(userRequestPasswordReset.schema),
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
	<!-- Email address -->
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label
				description={userRequestPasswordReset.schema.shape['email']?._def.description}
				optional={false}>Email</Form.Label
			>
			<Input
				{...attrs}
				type="email"
				placeholder="email@example.com"
				bind:value={$formData.email}
			/>
		</Form.Control>
		<Form.FieldErrors serverErrors={formErrors.fieldErrors?.email?} />
	</Form.Field>

	<!-- Submit button -->
	<Form.Button
		disabled={false}
		loading={$mutation.isLoading}
		variant="default"
		class="mt-4 w-full">Submit</Form.Button
	>
</form>
