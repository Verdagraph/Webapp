<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { userCreate } from '$lib/dataNew/user/commands';
	import useAsync from '$state/asyncHandler.svelte';

	type Props = {
		/** Set to true once the form has been submitted and received a 200 response. */
		succeeded: boolean;
		/** Set to the registered email after success. */
		registeredEmail: string;
	};

	let { succeeded = $bindable(false), registeredEmail = $bindable('') }: Props =
		$props();


	let formHandler = useAsync(userCreate.mutation, {onSuccess: () => {succeeded = true}})
	const form = superForm(defaults(zod(userCreate.schema)), {
		SPA: true,
		validators: zod(userCreate.schema),
		onUpdate({ form }) {
			if (form.valid) {
				registeredEmail = form.data.email;
				formHandler.execute(form.data)
			}
		},
		onChange() {
			formHandler.reset();
		}
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" autocomplete="off" use:enhance>
	<!-- Username -->
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label
				description={userCreate.schema.innerType().shape.username.description}
				optional={userCreate.schema.innerType().shape.username.isOptional()}
				>Username</Form.Label
			>
			<Input
				{...attrs}
				type="text"
				placeholder="username"
				bind:value={$formData.username}
			/>
		</Form.Control>
		<Form.FieldErrors serverErrors={formHandler.fieldErrors?.username} />
	</Form.Field>

	<!-- Email address -->
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label
				description={userCreate.schema.innerType().shape.email.description}
				optional={userCreate.schema.innerType().shape.email.isOptional()}
				>Email</Form.Label
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

	<!-- Password1 -->
	<Form.Field {form} name="password1">
		<Form.Control let:attrs>
			<Form.Label
				description={userCreate.schema.innerType().shape.password1.description}
				optional={userCreate.schema.innerType().shape.password1.isOptional()}
				>Password</Form.Label
			>
			<Input {...attrs} type="password" bind:value={$formData.password1} />
		</Form.Control>
		<Form.FieldErrors serverErrors={formHandler.fieldErrors?.password1} />
	</Form.Field>

	<!-- Password2 -->
	<Form.Field {form} name="password2">
		<Form.Control let:attrs>
			<Form.Label
				description={userCreate.schema.innerType().shape.password2.description}
				optional={userCreate.schema.innerType().shape.password2.isOptional()}
				>Confirm Password</Form.Label
			>
			<Input {...attrs} type="password" bind:value={$formData.password2} />
		</Form.Control>
		<Form.FieldErrors serverErrors={formHandler.fieldErrors?.password2} />
	</Form.Field>

	<!-- Submit button -->
	<Form.Button
		disabled={false}
		loading={formHandler.isLoading}
		variant="default"
		class="mt-4 w-full">Submit</Form.Button
	>
</form>
