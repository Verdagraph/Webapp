<script lang="ts">
	import { userFields } from '@vdg-webapp/models';
	import { type ControlProps, Form, Input, createForm } from '@vdg-webapp/ui';

	import { page } from '$app/state';
	import { userConfirmPasswordReset } from '$data/users/commands';
	import createCommandHandler from '$state/commandHandler.svelte';

	type Props = {
		/** Set to true once the form has been submitted and received a 200 response. */
		succeeded: boolean;
	};
	let { succeeded = $bindable(false) }: Props = $props();

	let formHandler = createCommandHandler(userConfirmPasswordReset.mutation, {
		onSuccess: () => {
			succeeded = true;
		}
	});
	const form = createForm(userConfirmPasswordReset.schema, {
		initialValues: {
			userId: page.params.userId,
			token: page.params.confirmationToken
		},
		onSubmit: (data) => formHandler.execute(data)
	});
</script>

<form onsubmit={form.submit} oninput={() => formHandler.reset()}>
	<!-- New Password1 -->
	<Form.Field {form} name="password1">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label description={userFields.passwordSchema.description}
					>New Password</Form.Label
				>
				<Input.Root {...props} type="password" bind:value={form.data.password1} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={formHandler.fieldErrors?.password1} />
	</Form.Field>

	<!-- New Password2 -->
	<Form.Field {form} name="password2">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label description={userFields.passwordSchema.description}
					>Confirm Password</Form.Label
				>
				<Input.Root {...props} type="password" bind:value={form.data.password2} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={formHandler.fieldErrors?.password2} />
	</Form.Field>

	<!-- Submit button -->
	<Form.Button
		disabled={false}
		loading={formHandler.isLoading}
		variant="default"
		class="mt-4 w-full">Submit</Form.Button
	>
</form>
