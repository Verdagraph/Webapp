import { PlantsCreateCommandSchema, addDays, daysBetween } from '@vdg-webapp/models';

import { type AppContext } from '$state/application';
import createCommandHandler from '$state/commandHandler.svelte';
import { createForm } from '$state/form';

import { defaultSinglePlant } from './tools/plantsCreateFormDefaults';

/**
 * Owns the Add Plants tool's form: submission, the stamp-style
 * carry-forward to the next stamp after a successful Create, and resetting
 * to a blank stamp on request (used when a DraftBucket the active stamp
 * belonged to gets committed/discarded - see draftBucketsState.svelte.ts's
 * `onActiveBucketEnded` callback, which verdagraphContext.svelte.ts wires to
 * `resetActiveStamp` below).
 */
export function createPlantsCreateFormState(ctx: AppContext, getFocusUtc: () => Date) {
	const plantsCreateHandler = createCommandHandler(ctx.controller.plants.create, {
		/**
		 * Stamp-style continuation: the next stamp starts as a copy of the one
		 * just submitted (same cultivar, same geometry, same location), so
		 * placing a run of the same plant is drag-to-nudge rather than
		 * re-pick/re-place/re-size from scratch every time. The whole staged
		 * milestone chain is carried forward and shifted by a single delta
		 * (the same day-translation stampSeeding's translateStamp applies),
		 * not just its first entry - carrying only one entry collapsed the
		 * next stamp down to a single day instead of the cultivar's full
		 * expected date range. Runs from the handler's own onSuccess - which
		 * fires strictly after the real mutation resolves - so there's no
		 * resync race to work around here.
		 */
		onSuccess: () => {
			if (plantsCreateForm.data.mode !== 'SINGLE') {
				return;
			}
			const submitted = plantsCreateForm.data.plants[0];
			const focusedDay = getFocusUtc();
			const submittedGeometries = submitted?.geometryHistory?.geometries ?? [];
			const submittedLocations = submitted?.locationHistory?.locations ?? [];
			const submittedExpectedObservations = submitted?.expectedObservations ?? [];
			const deltaDays = submittedGeometries[0]
				? daysBetween(submittedGeometries[0].date, focusedDay)
				: 0;
			plantsCreateForm.data.plants = [
				defaultSinglePlant({
					cultivarName: submitted?.cultivarName,
					origin: submitted?.origin,
					geometryHistory:
						submittedGeometries.length > 0
							? {
									gardenId: ctx.garden.id,
									geometries: submittedGeometries.map((geometry) => ({
										...geometry,
										date: addDays(geometry.date, deltaDays)
									}))
								}
							: undefined,
					locationHistory:
						submittedLocations.length > 0
							? {
									gardenId: ctx.garden.id,
									locations: submittedLocations.map((location) => ({
										...location,
										date: addDays(location.date, deltaDays)
									}))
								}
							: undefined,
					expectedObservations: submittedExpectedObservations.map((observation) => ({
						...observation,
						date: addDays(observation.date, deltaDays)
					}))
				})
			];
		}
	});

	const plantsCreateForm = createForm(PlantsCreateCommandSchema, {
		initialValues: { plants: [defaultSinglePlant()] },
		onSubmit: (data) => plantsCreateHandler.execute(data)
	});

	/**
	 * Committing or discarding ends a DraftBucket's staging session - unlike
	 * a plain Create (which intentionally carries the stamp forward, see
	 * onSuccess above), any stamp still sitting in the form at that point is
	 * stale: it either belongs to a bucket that no longer accepts new plants
	 * (committed) or references geometry/location data that's about to be
	 * deleted (discarded). Reset it to a blank stamp rather than leaving it
	 * showing something no longer valid to submit.
	 */
	function resetActiveStamp() {
		plantsCreateForm.data.plants = [defaultSinglePlant()];
	}

	return {
		handler: plantsCreateHandler,
		form: plantsCreateForm,
		resetActiveStamp
	};
}
export type PlantsCreateFormState = ReturnType<typeof createPlantsCreateFormState>;
