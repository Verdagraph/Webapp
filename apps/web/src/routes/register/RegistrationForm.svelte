<script lang="ts">
	import { userFields } from '@vdg-webapp/models';
	import { type ControlProps, Form, Input, createForm } from '@vdg-webapp/ui';

	import { userCreate } from '$data/users/commands';
	import createCommandHandler from '$state/commandHandler.svelte';

	type Props = {
		/** Set to true once the form has been submitted and received a 200 response. */
		succeeded: boolean;
		/** Set to the registered email after success. */
		registeredEmail: string;
	};

	let { succeeded = $bindable(false), registeredEmail = $bindable('') }: Props =
		$props();

	let formHandler = createCommandHandler(userCreate.mutation, {
		onSuccess: () => {
			succeeded = true;
		}
	});
	const form = createForm(userCreate.schema, {
		onSubmit: (data) => {
			registeredEmail = data.email;
			return formHandler.execute(data);
		}
	});
</script>

<form onsubmit={form.submit} oninput={() => formHandler.reset()}>
	<!-- Username -->
	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label description={userFields.usernameSchema.description}
					>Username</Form.Label
				>
				<Input.Root
					{...props}
					type="text"
					placeholder="username"
					bind:value={form.data.username}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={formHandler.fieldErrors?.username} />
	</Form.Field>

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

	<!-- Password1 -->
	<Form.Field {form} name="password1">
		<Form.Control>
			{#snippet children({ props }: { props: ControlProps })}
				<Form.Label description={userFields.passwordSchema.description}
					>Password</Form.Label
				>
				<Input.Root {...props} type="password" bind:value={form.data.password1} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={formHandler.fieldErrors?.password1} />
	</Form.Field>

	<!-- Password2 -->
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
