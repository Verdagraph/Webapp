import { defaults, superForm } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { PlantsCreateCommandSchema, plantsCreate } from '@vdg-webapp/models';

import { type AppContext } from '$state/application';
import createCommandHandler from '$state/commandHandler.svelte';

import { defaultSinglePlant } from './tools/plantsCreateFormDefaults';

/**
 * Owns the Add Plants tool's superform: submission, the stamp-style
 * carry-forward to the next stamp after a successful Create, and resetting
 * to a blank stamp on request (used when a DraftBucket the active stamp
 * belonged to gets committed/discarded - see draftBucketsState.svelte.ts's
 * `onActiveBucketEnded` callback, which verdagraphContext.svelte.ts wires to
 * `resetActiveStamp` below). Split out of verdagraphContext.svelte.ts for
 * the same reason draftBucketsState.svelte.ts was: this is one of two
 * self-contained sub-domains that was on track to keep growing inside a
 * single already-large file, most notably once Group/Pattern modes need
 * their own form-handling additions.
 */
export function createPlantsCreateFormState(ctx: AppContext, getFocusUtc: () => Date) {
	const plantsCreateHandler = createCommandHandler(plantsCreate);
	const plantsCreateSuperform = superForm(defaults(zod(PlantsCreateCommandSchema)), {
		SPA: true,
		dataType: 'json',
		validators: zod(PlantsCreateCommandSchema),
		/**
		 * Superforms pushes the just-validated form data back onto the store
		 * itself (independent of resetForm) once onUpdate resolves, as part of
		 * its own post-submit lifecycle - so reseeding plants[0] can't happen
		 * inside/right after onUpdate without racing that. onUpdate is made
		 * async and awaits the real plantsCreate call so that superforms' own
		 * lifecycle (including that resync) only proceeds once it's actually
		 * done; onUpdated fires strictly after that resync completes, making
		 * it the reliable place to reseed - see Form_updateFromValidation in
		 * sveltekit-superforms' client/superForm.js (rebind() runs, then
		 * onUpdated handlers are called, never the other way around).
		 */
		resetForm: false,
		async onUpdate({ form }) {
			if (form.valid) {
				await plantsCreateHandler.execute(form.data, ctx.controller);
			}
		},
		/**
		 * Stamp-style continuation: the next stamp starts as a copy of the one
		 * just submitted (same cultivar, same geometry, same location), so
		 * placing a run of the same plant is drag-to-nudge rather than
		 * re-pick/re-place/re-size from scratch every time. Only the dates
		 * are refreshed to the current timeline focus, since the submitted
		 * ones belong to the plant that just got created.
		 */
		onUpdated({ form }) {
			if (form.valid && plantsCreateHandler.isSuccess && form.data.mode === 'SINGLE') {
				const submitted = form.data.plants[0];
				const focusedDay = getFocusUtc();
				const carriedGeometry = submitted?.geometryHistory?.geometries[0];
				const carriedLocation = submitted?.locationHistory?.locations[0];
				plantsCreateSuperform.form.update((data) => {
					data.plants = [
						defaultSinglePlant({
							cultivarName: submitted?.cultivarName,
							geometryHistory: carriedGeometry
								? {
										gardenId: ctx.garden.id,
										geometries: [{ ...carriedGeometry, date: focusedDay }]
									}
								: undefined,
							locationHistory: carriedLocation
								? {
										gardenId: ctx.garden.id,
										locations: [{ ...carriedLocation, date: focusedDay }]
									}
								: undefined
						})
					];
					return data;
				});
			}
		},
		onChange() {
			plantsCreateHandler.reset();
		}
	});

	/**
	 * Committing or discarding ends a DraftBucket's staging session - unlike
	 * a plain Create (which intentionally carries the stamp forward, see
	 * onUpdated above), any stamp still sitting in the form at that point is
	 * stale: it either belongs to a bucket that no longer accepts new plants
	 * (committed) or references geometry/location data that's about to be
	 * deleted (discarded). Reset it to a blank stamp rather than leaving it
	 * showing something no longer valid to submit.
	 */
	function resetActiveStamp() {
		plantsCreateSuperform.form.update((data) => {
			data.plants = [defaultSinglePlant()];
			return data;
		});
	}

	return {
		handler: plantsCreateHandler,
		form: plantsCreateSuperform,
		resetActiveStamp
	};
}
export type PlantsCreateFormState = ReturnType<typeof createPlantsCreateFormState>;
