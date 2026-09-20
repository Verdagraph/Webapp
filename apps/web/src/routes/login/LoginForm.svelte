<script lang="ts">
	import { userFields } from '@vdg-webapp/models';
	import { Form, Input, createForm } from '@vdg-webapp/ui';

	import { goto } from '$app/navigation';
	import { userLogin } from '$data/users/auth';
	import createCommandHandler from '$state/commandHandler.svelte';

	let formHandler = createCommandHandler(userLogin.mutation, {
		onSuccess: () => {
			goto('/');
		}
	});
	const form = createForm(userLogin.schema, {
		onSubmit: (data) => formHandler.execute(data)
	});
</script>

<form onsubmit={form.submit} oninput={() => formHandler.reset()}>
	<!-- Email address -->
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
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

	<!-- Password -->
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label description={userFields.passwordSchema.description}
					>Password</Form.Label
				>
				<Input.Root {...props} type="password" bind:value={form.data.password} />
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
