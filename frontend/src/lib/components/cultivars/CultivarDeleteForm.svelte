<script lang="ts">
	import { useQueryClient } from '@sveltestack/svelte-query';
	import * as Form from '$lib/components/ui/form';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { cultivarDelete } from '$lib/data/cultivar/commands';
	import { createFormErrors } from '$state/formErrors.svelte';

	type Props = {
		collectionId: string;
		cultivarId: string;
		onSuccess?: Function | undefined;
	};

	let { collectionId, cultivarId, onSuccess = undefined }: Props = $props();

	/* Form mutation. */
	const mutation = cultivarDelete.mutation();
	/* Form error state. */
	const formErrors = createFormErrors();

	const queryClient = useQueryClient();

	/**
	 * Standard form configuration:
	 * - SPA: True disables server-side functionality.
	 * - validators: Zod schema specifies form validation.
	 * - onUpdate: Submission handler. Activates svelte-query mutation,
	 *  executes success task, and sets server errors on failure.
	 * - onChange: Reset server errors.
	 */
	const initialData = {
		collection_ref: collectionId,
		cultivar_id: cultivarId
	};
	const form = superForm(defaults(initialData, zod(cultivarDelete.schema)), {
		SPA: true,
		validators: zod(cultivarDelete.schema),
		onUpdate({ form }) {
			if (form.valid) {
				$mutation.mutate(form.data, {
					onSuccess: () => {
						queryClient.invalidateQueries(['cultivarCollections', [collectionId]]);
						if (onSuccess) {
							onSuccess();
						}
					},
					onError: (error) => {
						// @ts-ignore
						formErrors.setServerErrors(error);
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

<form method="POST" use:enhance>
	<!-- Submit button -->
	<Form.Button
		disabled={false}
		loading={$mutation.isLoading}
		variant="destructive"
		class="mt-4 w-full">Delete</Form.Button
	>
</form>
