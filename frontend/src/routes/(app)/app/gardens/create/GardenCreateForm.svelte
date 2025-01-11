<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { gardenCreate } from '$data/gardens/commands';
	import iconIds from '$lib/assets/icons';
	import { GardenVisibilityEnum } from '@vdt-webapp/common';
	import GardenCreateFormUserTagsInput from './GardenCreateFormUserTagsInput.svelte';
	import { generateGardenId } from '$data/gardens/utils';
	import useAsync from '$state/asyncHandler.svelte';

	/* Defines the labels for the visibility enum options. */
	const visibilityOptions: {
		value: (typeof GardenVisibilityEnum)[number];
		label: string;
	}[] = [
		{
			value: 'HIDDEN',
			label: 'Hidden'
		},
		{
			value: 'UNLISTED',
			label: 'Unlisted'
		},
		{
			value: 'PUBLIC',
			label: 'Public'
		}
	];
	const visibilitySelectTrigger = $derived(
		visibilityOptions.find((option) => option.value === $formData.visibility) ?? {
			label: 'Select a type',
			icon: null
		}
	);

	/** Garden creation form. */
	let gardenCreateHandler = useAsync(gardenCreate.mutation, {
		onSuccess: (data) => {
			goto('/app/gardens/' + data.id);
		}
	});
	const form = superForm(defaults(zod(gardenCreate.schema)), {
		SPA: true,
		validators: zod(gardenCreate.schema),
		onUpdate({ form }) {
			if (form.valid) {
				gardenCreateHandler.execute(form.data);
			}
		},
		onChange() {
			gardenCreateHandler.reset();
		}
	});
	const { form: formData, enhance } = form;

	/** Garden ID generation handler. */
	let gardenIdGenerationHandler = useAsync(generateGardenId, {
		onSuccess: (generatedId) => {
			$formData.id = generatedId;
		}
	});
</script>

<form method="POST" use:enhance>
	<!-- Garden name -->
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={gardenCreate.schema.shape.name.description}
					optional={gardenCreate.schema.shape.name.isOptional()}>Name</Form.Label
				>
				<Input
					{...props}
					type="text"
					placeholder="Gardens of Adonis"
					bind:value={$formData.name}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors handlerErrors={gardenCreateHandler.errors?.fieldErrors?.name} />
	</Form.Field>

	<!-- Garden ID -->
	<Form.Field {form} name="id">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={gardenCreate.schema.shape.id.description}
					optional={gardenCreate.schema.shape.id.isOptional()}>ID</Form.Label
				>
				<span class="flex">
					<Input
						{...props}
						type="text"
						placeholder="lettuce123"
						class="rounded-r-none"
						bind:value={$formData.id}
					/>
					<Button
						variant="outline"
						onclick={() => {
							gardenIdGenerationHandler.execute();
						}}
						type="button"
						class="bg-neutral-1 hover:bg-neutral-2 border-neutral-7 flex items-center rounded-l-none border-l-0"
					>
						<Icon
							icon={iconIds.defaultRefreshIcon}
							width="1.5rem"
							class={gardenIdGenerationHandler.isLoading
								? 'animate-spin'
								: 'animate-none'}
						/>
					</Button>
				</span>
			{/snippet}
		</Form.Control>
		<Form.Description>Readable identifier, used in URLs.</Form.Description>
		<Form.FieldErrors handlerErrors={gardenCreateHandler.errors?.fieldErrors?.id} />
	</Form.Field>

	<!-- Garden visibility -->
	<Form.Field {form} name="visibility">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={gardenCreate.schema.shape.visibility.description}
					optional={gardenCreate.schema.shape.visibility.isOptional()}
					>Visibility</Form.Label
				>
				<Select.Root
					{...props}
					type="single"
					items={visibilityOptions}
					bind:value={$formData.visibility}
				>
					<Select.Trigger>
						<div class="item-center flex">
							<span>
								{visibilitySelectTrigger.label}
							</span>
						</div>
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Garden Visibility</Select.GroupHeading>
							{#each visibilityOptions as visibilityOption}
								<Select.Item
									value={visibilityOption.value}
									label={visibilityOption.label}>{visibilityOption.label}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.Description
			>Hidden gardens can only be viewed by members. Unlisted gardens can be viewed by
			anyone with a link. Public gardens are searchable.</Form.Description
		>
		<Form.FieldErrors
			handlerErrors={gardenCreateHandler.errors?.fieldErrors?.visibility}
		/>
	</Form.Field>

	<!-- Garden description -->
	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={gardenCreate.schema.shape.description.description}
					optional={gardenCreate.schema.shape.description.isOptional()}
					>Description</Form.Label
				>
				<Textarea {...props} bind:value={$formData.description} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors
			handlerErrors={gardenCreateHandler.errors?.fieldErrors?.description}
		/>
	</Form.Field>

	<!-- Admins to invite -->
	<Form.Field {form} name="adminInvites">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={gardenCreate.schema.shape.adminInvites.description}
					optional={gardenCreate.schema.shape.adminInvites.isOptional()}
					>Admin Invites</Form.Label
				>
				<GardenCreateFormUserTagsInput
					{...props}
					bind:tagsInput={$formData.adminInvites}
					maxTags={gardenCreate.schema.shape.adminInvites._def.innerType._def.maxLength
						?.value}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description>Admins have full control over the garden.</Form.Description>
		<Form.FieldErrors
			handlerErrors={gardenCreateHandler.errors?.fieldErrors?.adminInvites}
		/>
	</Form.Field>

	<!-- Editors to invite -->
	<Form.Field {form} name="editorInvites">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={gardenCreate.schema.shape.editorInvites.description}
					optional={gardenCreate.schema.shape.editorInvites.isOptional()}
					>Editor Invites</Form.Label
				>
				<GardenCreateFormUserTagsInput
					{...props}
					bind:tagsInput={$formData.editorInvites}
					maxTags={gardenCreate.schema.shape.editorInvites._def.innerType._def.maxLength
						?.value}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description
			>Editors have limited write access but cannot change garden configuration.</Form.Description
		>
		<Form.FieldErrors
			handlerErrors={gardenCreateHandler.errors?.fieldErrors?.editorInvites}
		/>
	</Form.Field>

	<!-- Viewers to invite -->
	<Form.Field {form} name="viewerInvites">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label
					description={gardenCreate.schema.shape.viewerInvites.description}
					optional={gardenCreate.schema.shape.viewerInvites.isOptional()}
					>Viewer Invites</Form.Label
				>
				<GardenCreateFormUserTagsInput
					{...props}
					bind:tagsInput={$formData.viewerInvites}
					maxTags={gardenCreate.schema.shape.viewerInvites._def.innerType._def.maxLength
						?.value}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description
			>Viewers can make no changes but can view everything.</Form.Description
		>
		<Form.FieldErrors
			handlerErrors={gardenCreateHandler.errors?.fieldErrors?.viewerInvites}
		/>
	</Form.Field>

	<!-- Submit button -->
	<Form.Button
		disabled={false}
		loading={gardenCreateHandler.isLoading}
		variant="default"
		class="mt-4 w-full">Create</Form.Button
	>
</form>
