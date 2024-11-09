<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { userLogin } from '$lib/dataNew/user/auth';
	import authentication from '$state/authentication.svelte';
	import useAsync from '$state/asyncHandler.svelte';

	let formHandler = useAsync(userLogin.mutation, {onSuccess: () => {
		authentication.login();
		goto('/app');
	}})
	const form = superForm(defaults(zod(userLogin.schema)), {
		SPA: true,
		validators: zod(userLogin.schema),
		onUpdate({ form }) {
			if (form.valid) {
				formHandler.execute(form.data)
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
		<Form.FieldErrors serverErrors={formHandler.fieldErrors?.email} />
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
		<Form.FieldErrors serverErrors={formHandler.fieldErrors?.password} />
	</Form.Field>

	<!-- Submit button -->
	<Form.Button
		disabled={false}
		loading={formHandler.isLoading}
		variant="default"
		class="mt-4 w-full">Submit</Form.Button
	>
</form>
