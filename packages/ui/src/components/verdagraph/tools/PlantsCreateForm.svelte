<script lang="ts">
	import { toast } from 'svelte-sonner';

	import {
		AppError,
		type PlantsCreateFormMode,
		plantsCreateFormModeSchema
	} from '@vdg-webapp/models';

	import { Form, Resizable, Select } from '$core';
	import { getAppContext } from '$state/application';

	import { getVerdagraphContext } from '../verdagraphContext.svelte';
	import DraftBucketTree from './DraftBucketTree.svelte';
	import PlantsCreateFormModeSingle from './PlantsCreateFormModeSingle.svelte';

	const ctx = getAppContext();
	const verdagraphContext = getVerdagraphContext();
	const form = verdagraphContext.plantsCreateForm.form;
	const handler = verdagraphContext.plantsCreateForm.handler;
	const { form: formData, enhance } = form;

	$effect(() => {
		if (!verdagraphContext) {
			toast.error('Error retrieving verdagraph context.');
			throw new AppError('Error retrieving verdagraph context.');
		}

		$formData.gardenId = ctx.garden.id;
	});

	/**
	 * The bucket this session's stamps are staged into. Resolved once on mount
	 * (reusing an existing uncommitted bucket if this user already had one
	 * going in this garden) and kept for as long as the tool stays open.
	 */
	$effect(() => {
		if (!verdagraphContext.draftBucket.current) {
			verdagraphContext.draftBucket.ensure();
		} else {
			$formData.draftBucketId = verdagraphContext.draftBucket.current.id;
		}
	});

	/** Seeds default form data for the active mode. */
	function seedFormForMode(mode: PlantsCreateFormMode) {
		switch (mode) {
			case 'SINGLE':
				$formData.plants = [];
				$formData.plants[0] = {
					cultivarName: 'undefined',
					origin: 'DIRECT_SEED',
					aggregate: false,
					locationHistory: { gardenId: '', locations: [] },
					geometryHistory: { gardenId: '', geometries: [] },
					cultivarOverride: {}
				};
				break;
			case 'GROUP':
				break;
			case 'PATTERN':
				break;
			case 'COMBINED':
				break;
		}
	}

	/** Reseed the form when the mode changes. */
	let previousFormMode = $state('None');
	$effect(() => {
		if ($formData.mode === previousFormMode) {
			return;
		}
		seedFormForMode($formData.mode as PlantsCreateFormMode);
		previousFormMode = $formData.mode;
	});

	/**
	 * Reseed the form after each successful stamp, so the tool stays open and
	 * ready for the next one instead of closing - all stamps in a session
	 * accumulate into the same draft bucket.
	 */
	$effect(() => {
		if (handler.isSuccess) {
			seedFormForMode($formData.mode as PlantsCreateFormMode);
			/** Consume the success signal so this effect doesn't refire on its own reseed write. */
			handler.reset();
		}
	});

	/* Defines the labels for the mode enum options. */
	const modeOptions: {
		value: PlantsCreateFormMode;
		label: string;
	}[] = [
		{ value: 'SINGLE', label: 'Single' },
		{ value: 'GROUP', label: 'Group' },
		{ value: 'PATTERN', label: 'Pattern' },
		{ value: 'COMBINED', label: 'Combined' }
	];
	const modeSelectTrigger = $derived(
		modeOptions.find((option) => option.value === $formData.mode) ?? {
			label: 'Select a mode',
			icon: null
		}
	);
</script>

<Resizable.PaneGroup direction="vertical">
	<Resizable.Pane defaultSize={65} minSize={20}>
		<form method="POST" autocomplete="off" use:enhance class="mx-4 mt-4 mb-8">
			<!-- Form mode -->
			<Form.Field {form} name="mode">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label
							description={plantsCreateFormModeSchema.description}
							optional={false}>Mode</Form.Label
						>
						<Select.Root
							{...props}
							type="single"
							items={modeOptions}
							bind:value={$formData.mode}
						>
							<Select.Trigger>
								<div class="item-center flex">
									<span>
										{modeSelectTrigger.label}
									</span>
								</div>
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.GroupHeading>Form Mode</Select.GroupHeading>
									{#each modeOptions as modeOption}
										<Select.Item value={modeOption.value} label={modeOption.label}
											>{modeOption.label}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors handlerErrors={handler.errors?.fieldErrors?.mode} />
			</Form.Field>

			{#if $formData.mode === 'SINGLE'}
				<PlantsCreateFormModeSingle></PlantsCreateFormModeSingle>
			{:else if $formData.mode === 'GROUP'}{:else if $formData.mode === 'PATTERN'}{:else if $formData.mode === 'COMBINED'}{/if}

			<!-- Submit button -->
			<Form.Button
				disabled={!verdagraphContext.draftBucket.current}
				loading={handler.isLoading}
				variant="default"
				class="mt-4 w-full">Create</Form.Button
			>
		</form>
	</Resizable.Pane>
	<Resizable.Handle withHandle={false} />
	<Resizable.Pane defaultSize={35} minSize={10}>
		<DraftBucketTree />
	</Resizable.Pane>
</Resizable.PaneGroup>
