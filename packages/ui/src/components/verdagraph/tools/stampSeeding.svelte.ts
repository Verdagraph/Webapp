import {
	type AnnualLifecycleMilestone,
	type GeometryCreateCommand,
	type LocationCreateCommand,
	type Origin,
	addDays,
	annualMilestonesForOrigin,
	daysBetween,
	generateExpectedHistories
} from '@vdg-webapp/models';

import { getAppContext } from '$state/application';

import { getVerdagraphContext } from '../verdagraphContext.svelte';

/**
 * Keeps one stamp slot's (`plants[plantIndex]`) expected geometry history
 * and single anchored location in sync with the cultivar, Origin, anchor
 * milestone, and the timeline's focused day. Parameterized by `plantIndex`
 * rather than hardcoding `plants[0]` so Group/Pattern modes can eventually
 * call this once per plant slot instead of duplicating the logic.
 *
 * Two distinct things can change, and they're handled differently:
 * - Cultivar/Origin/anchor change what the stamp *represents* - the whole
 *   expected chain is regenerated fresh from the Cultivar's profile
 *   (`regenerateStamp`).
 * - The focused day alone changes only *when* the same stamp is happening -
 *   every existing date is shifted by the same delta instead
 *   (`translateStamp`), preserving every other field, including a manual
 *   drag/resize, exactly.
 */
export function createStampSeeding(plantIndex: number) {
	const ctx = getAppContext();
	const verdagraphContext = getVerdagraphContext();
	const form = verdagraphContext.plantsCreateForm.form;

	function currentPlant() {
		return form.data.plants[plantIndex];
	}

	/**
	 * Which lifecycle stage the plant is at "today" (the currently focused
	 * timeline day) - the rest of its expected history is computed backward/
	 * forward from that pin. Kept in sync with the current Origin, since not
	 * every milestone is valid for every Origin.
	 */
	let anchorMilestoneOptions = $derived(
		annualMilestonesForOrigin(currentPlant()?.origin ?? 'DIRECT_SEED')
	);
	let anchorMilestone: AnnualLifecycleMilestone = $state('SEED');
	$effect(() => {
		if (!anchorMilestoneOptions.includes(anchorMilestone)) {
			anchorMilestone = anchorMilestoneOptions[0];
		}
	});

	/**
	 * 'workspace' is a single-select slot on the same SelectionManager used
	 * for plants/plantingAreas elsewhere in this context (see
	 * verdagraphContext.svelte.ts) - an existing convention for "the
	 * workspace currently being worked in," not a multi-select of workspaces
	 * to bulk-operate on the way 'plants' is used by Observe/Translate/Delete.
	 */
	function resolveWorkspaceId(): string | null {
		return verdagraphContext.selections.get('workspace').values().next().value ?? null;
	}

	/** The existing dragged/generated coordinate if there is one, else the viewport center - so regenerating never snaps away a position already placed. */
	function resolveCoordinate(): { x: number; y: number } {
		const existing = currentPlant()?.locationHistory?.locations?.[0]?.coordinate;
		return (
			existing ?? verdagraphContext.layoutCanvasContext.transform.viewportCenterModel()
		);
	}

	function regenerateStamp(cultivarName: string, origin: Origin) {
		const cultivar = ctx.cultivars.getCultivar(cultivarName);
		const workspaceId = resolveWorkspaceId();
		if (!workspaceId) {
			return;
		}

		const { geometries, location } = generateExpectedHistories({
			expectedGeometryProfile: cultivar?.attributes?.expectedGeometry,
			annualLifecycleProfile: cultivar?.attributes?.annualLifeCycle,
			origin,
			anchorMilestone,
			anchorDate: verdagraphContext.timeline.focusUtc,
			gardenId: ctx.garden.id,
			workspaceId,
			coordinate: resolveCoordinate()
		});

		const plant = form.data.plants[plantIndex];
		plant.geometryHistory = { gardenId: ctx.garden.id, geometries };
		plant.locationHistory = { gardenId: ctx.garden.id, locations: [location] };
	}

	function translateStamp(deltaDays: number) {
		const plant = form.data.plants[plantIndex];
		const geometries: GeometryCreateCommand[] =
			plant?.geometryHistory?.geometries ?? [];
		const locations: LocationCreateCommand[] = plant?.locationHistory?.locations ?? [];

		plant.geometryHistory = {
			gardenId: ctx.garden.id,
			geometries: geometries.map((geometry) => ({
				...geometry,
				date: addDays(geometry.date, deltaDays)
			}))
		};
		plant.locationHistory = {
			gardenId: ctx.garden.id,
			locations: locations.map((location) => ({
				...location,
				date: addDays(location.date, deltaDays)
			}))
		};
	}

	let previousStructuralKey: string | null = $state(null);
	let previousFocusedDay: Date | null = $state(null);
	$effect(() => {
		const cultivarName = currentPlant()?.cultivarName;
		if (!cultivarName || !ctx.cultivars.cultivarNames.has(cultivarName)) {
			previousStructuralKey = null;
			previousFocusedDay = null;
			return;
		}

		const origin = currentPlant()?.origin ?? 'DIRECT_SEED';
		const focusedDay = verdagraphContext.timeline.focusUtc;
		const structuralKey = `${cultivarName}|${origin}|${anchorMilestone}`;
		const alreadySeeded =
			(currentPlant()?.geometryHistory?.geometries?.length ?? 0) > 0;

		/**
		 * This effect reads geometryHistory.geometries.length (via
		 * alreadySeeded) to tell whether the current stamp still needs
		 * seeding - and regenerateStamp/translateStamp both write
		 * geometryHistory. That's a genuine, direct dependency (not an
		 * artifact of coarse-grained store notifications), so without this
		 * guard the write below would re-trigger this same effect
		 * indefinitely. The `alreadySeeded` half re-opens it whenever a
		 * fresh stamp's history has been cleared (post-Create carry-forward
		 * still counts as "already seeded" here, since it's non-empty).
		 */
		const structureUnchanged = structuralKey === previousStructuralKey && alreadySeeded;
		if (structureUnchanged) {
			const dayChanged =
				previousFocusedDay !== null &&
				focusedDay.getTime() !== previousFocusedDay.getTime();
			if (dayChanged && previousFocusedDay !== null) {
				const deltaDays = daysBetween(previousFocusedDay, focusedDay);
				if (deltaDays !== 0) {
					translateStamp(deltaDays);
				}
			}
			previousFocusedDay = focusedDay;
			return;
		}

		previousStructuralKey = structuralKey;
		previousFocusedDay = focusedDay;
		regenerateStamp(cultivarName, origin);
	});

	/**
	 * Discards the current stamp's placement (carried forward from the last
	 * Create, or dragged/resized by hand) and falls back to the cultivar's
	 * generated default - emptying both histories here just re-opens the
	 * guard above, so the next effect run regenerates from scratch.
	 */
	function resetPlacement() {
		const plant = form.data.plants[plantIndex];
		plant.geometryHistory = { gardenId: ctx.garden.id, geometries: [] };
		plant.locationHistory = { gardenId: ctx.garden.id, locations: [] };
	}

	return {
		get anchorMilestoneOptions() {
			return anchorMilestoneOptions;
		},
		get anchorMilestone() {
			return anchorMilestone;
		},
		set anchorMilestone(value: AnnualLifecycleMilestone) {
			anchorMilestone = value;
		},
		resetPlacement
	};
}
