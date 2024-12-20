<script lang="ts">
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { userConfirmPasswordReset } from '$data/users/commands';
	import { useAsync } from '$components/forms';

	type Props = {
		/** Set to true once the form has been submitted and received a 200 response. */
		succeeded: boolean;
	};
	let { succeeded = $bindable(false) }: Props = $props();

	let formHandler = useAsync(userConfirmPasswordReset.mutation, {
		onSuccess: () => {
			succeeded = true;
		}
	});
	const initialData = {
		userId: $page.params.userId,
		token: $page.params.confirmationToken,
		password1: '',
		password2: ''
	};
	const form = superForm(defaults(initialData, zod(userConfirmPasswordReset.schema)), {
		SPA: true,
		validators: zod(userConfirmPasswordReset.schema),
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

<form method="POST" autocomplete="off" use:enhance>
	<!-- New Password1 -->
	<Form.Field {form} name="password1">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={userConfirmPasswordReset.schema.innerType().shape.password1
						.description}
					optional={userConfirmPasswordReset.schema
						.innerType()
						.shape.password1.isOptional()}>New Password</Form.Label
				>
				<Input {...props} type="password" bind:value={$formData.password1} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={formHandler.fieldErrors?.password1} />
	</Form.Field>

	<!-- Password2 -->
	<Form.Field {form} name="password2">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={userConfirmPasswordReset.schema.innerType().shape.password2
						.description}
					optional={userConfirmPasswordReset.schema
						.innerType()
						.shape.password2.isOptional()}>Confirm Password</Form.Label
				>
				<Input {...props} type="password" bind:value={$formData.password2} />
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
