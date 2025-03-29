<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { userRequestEmailConfirmation } from '$data/users/commands';
	import createCommandHandler from '$state/commandHandler.svelte';
	import { userFields } from '@vdt-webapp/common';
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
	const form = superForm(defaults(zod(userRequestEmailConfirmation.schema)), {
		SPA: true,
		validators: zod(userRequestEmailConfirmation.schema),
		onUpdate({ form }) {
			if (form.valid) {
				registeredEmail = form.data.email;
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
	<!-- Email address -->
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label description={userFields.emailSchema.description}>Email</Form.Label>
				<Input
					{...props}
					type="email"
					placeholder="email@example.com"
					bind:value={$formData.email}
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
