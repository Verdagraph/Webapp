<script lang="ts">
	import { userFields } from '@vdg-webapp/models';
	import { type ControlProps, Form, Input, createForm } from '@vdg-webapp/ui';

	import { userRequestEmailConfirmation } from '$data/users/commands';
	import createCommandHandler from '$state/commandHandler.svelte';

	type Props = {
		/** Set to true once the form has been submitted and received a 200 response. */
		succeeded: boolean;
		/** Set to the registered email after success. */
		registeredEmail: string;
	};

	let { succeeded = $bindable(false), registeredEmail = $bindable('') }: Props =
		$props();

	let formHandler = createCommandHandler(userRequestEmailConfirmation.mutation, {
		onSuccess: () => {
			succeeded = true;
		}
	});
	const form = createForm(userRequestEmailConfirmation.schema, {
		onSubmit: (data) => {
			registeredEmail = data.email;
			return formHandler.execute(data);
		}
	});
</script>

<form onsubmit={form.submit} oninput={() => formHandler.reset()}>
	<!-- Email address -->
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label description={userFields.emailSchema.description}>Email</Form.Label>
				<Input.Root
					{...props}
					type="email"
					placeholder="email@example.com"
					bind:value={form.data.email}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={formHandler.fieldErrors?.email} />
	</Form.Field>

	<!-- Submit button -->
	<Form.Button
		disabled={false}
		loading={formHandler.isLoading}
		variant="default"
		class="mt-4 w-full">Submit</Form.Button
	>
</form>
