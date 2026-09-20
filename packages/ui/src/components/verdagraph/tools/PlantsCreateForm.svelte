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
	import { defaultSinglePlant } from './plantsCreateFormDefaults';

	const ctx = getAppContext();
	const verdagraphContext = getVerdagraphContext();
	const form = verdagraphContext.plantsCreateForm.form;
	const handler = verdagraphContext.plantsCreateForm.handler;

	$effect(() => {
		if (!verdagraphContext) {
			toast.error('Error retrieving verdagraph context.');
			throw new AppError('Error retrieving verdagraph context.');
		}

		form.data.gardenId = ctx.garden.id;
	});

	/**
	 * The bucket this session's stamps are staged into. Resolved once on mount
	 * (reusing an existing uncommitted bucket if this user already had one
	 * going in this garden, per ensureActiveDraftBucket) unless a specific
	 * bucket is already active (e.g. switched to via the bucket picker).
	 *
	 * Keyed off activeId, not active: right after creating/switching to a
	 * bucket, its id is set immediately but the bucket object itself may not
	 * have round-tripped through the live list query yet, so `active` can be
	 * momentarily null even though a real choice has already been made -
	 * re-running ensureActive() during that gap would resume some other
	 * bucket and undo the switch.
	 */
	$effect(() => {
		if (!verdagraphContext.draftBuckets.activeId) {
			verdagraphContext.draftBuckets.ensureActive();
		} else if (verdagraphContext.draftBuckets.active) {
			form.data.draftBucketId = verdagraphContext.draftBuckets.active.id;
		}
	});

	/** Seeds default form data for the active mode. */
	function seedFormForMode(mode: PlantsCreateFormMode) {
		switch (mode) {
			case 'SINGLE':
				form.data.plants = [defaultSinglePlant()];
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
		if (form.data.mode === previousFormMode) {
			return;
		}
		seedFormForMode(form.data.mode as PlantsCreateFormMode);
		previousFormMode = form.data.mode;
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
		modeOptions.find((option) => option.value === form.data.mode) ?? {
			label: 'Select a mode',
			icon: null
		}
	);
</script>

<Resizable.PaneGroup direction="vertical">
	<Resizable.Pane defaultSize={65} minSize={20}>
		<form
			onsubmit={form.submit}
			oninput={() => handler.reset()}
			autocomplete="off"
			class="mx-4 mb-8 mt-4"
		>
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
							bind:value={form.data.mode}
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

			{#if form.data.mode === 'SINGLE'}
				<PlantsCreateFormModeSingle></PlantsCreateFormModeSingle>
			{:else if form.data.mode === 'GROUP'}{:else if form.data.mode === 'PATTERN'}{:else if form.data.mode === 'COMBINED'}{/if}

			<!-- Submit button -->
			<Form.Button
				disabled={!verdagraphContext.draftBuckets.active}
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
