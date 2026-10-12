import { type BulkInsert } from '@triplit/client';

import {
	type AnnualLifecycleMilestone,
	type Cultivar,
	type Origin,
	type PlantExpectedObservationCommand,
	type PlantObservationId,
	type Position,
	addDays,
	generateExpectedHistories,
	historyGetRange,
	schema
} from '@vdg-webapp/models';

import { carrot, lettuce, tomato } from './cultivars';
import { currentDay } from './dates';
import { garden } from './garden';
import { user } from './user';
import { workspace } from './workspace';

/**
 * Builds every row needed for one Plant - lifespans, geometry/location
 * history, and expected observations - by calling the same
 * generateExpectedHistories used by the real Add Plants stamp, rather than
 * hand-writing dates that would drift from the generation logic they're
 * meant to represent. `recordedObservations` is a function of the computed
 * expected observations (not a plain list) so a seeded recorded event can be
 * expressed relative to its expected counterpart - e.g. "sown two days later
 * than planned" - the way a real recordedLifespan eventually diverges from
 * its expectedLifespan.
 */
function buildSeedPlant(input: {
	plantId: string;
	cultivar: Cultivar;
	origin: Origin;
	anchorMilestone: AnnualLifecycleMilestone;
	anchorDate: Date;
	coordinate: Position;
	draftBucketId?: string;
	recordedObservations?: (
		expectedObservations: PlantExpectedObservationCommand[]
	) => { type: PlantObservationId; date: Date; data?: Record<string, unknown> }[];
}) {
	const { geometries, location, expectedObservations } = generateExpectedHistories({
		expectedGeometryProfile: input.cultivar.attributes.expectedGeometry,
		annualLifecycleProfile: input.cultivar.attributes.annualLifeCycle,
		origin: input.origin,
		anchorMilestone: input.anchorMilestone,
		anchorDate: input.anchorDate,
		gardenId: garden.id,
		workspaceId: workspace.id,
		coordinate: input.coordinate
	});
	const recordedObservations = input.recordedObservations?.(expectedObservations) ?? [];

	const expectedLifespanId = `${input.plantId}-expected`;
	const recordedLifespanId = `${input.plantId}-recorded`;
	const geometryHistoryId = `${input.plantId}-expected-geometry`;
	const locationHistoryId = `${input.plantId}-expected-location`;
	const locationId = `${input.plantId}-expected-location-1`;

	const geometryRows = geometries.map((geometry, index) => ({
		id: `${input.plantId}-expected-geometry-${index}`,
		gardenId: garden.id,
		name: geometry.name,
		type: geometry.type,
		date: geometry.date,
		scaleFactor: geometry.scaleFactor,
		rotation: geometry.rotation,
		rectangleLength: geometry.rectangleLength,
		rectangleWidth: geometry.rectangleWidth,
		polygonNumSides: geometry.polygonNumSides,
		polygonRadius: geometry.polygonRadius,
		ellipseLength: geometry.ellipseLength,
		ellipseWidth: geometry.ellipseWidth,
		linesCoordinateIds: new Set<string>(),
		linesClosed: geometry.linesClosed
	}));

	const observationRows = [
		...expectedObservations.map((observation, index) => ({
			id: `${input.plantId}-expected-observation-${index}`,
			gardenId: garden.id,
			type: observation.type,
			entityIds: new Set([expectedLifespanId]),
			date: observation.date
		})),
		...recordedObservations.map((observation, index) => ({
			id: `${input.plantId}-recorded-observation-${index}`,
			gardenId: garden.id,
			type: observation.type,
			entityIds: new Set([recordedLifespanId]),
			date: observation.date,
			data: observation.data
		}))
	];

	const dateRange = historyGetRange([
		...geometries,
		location,
		...expectedObservations,
		...recordedObservations
	]);

	return {
		plant: {
			id: input.plantId,
			gardenId: garden.id,
			cultivarName: input.cultivar.name,
			cultivarAttributes: {},
			expectedLifespanId,
			recordedLifespanId,
			beginDate: dateRange?.min.date ?? input.anchorDate,
			endDate: dateRange?.max.date ?? input.anchorDate,
			quantity: 1,
			draftBucketId: input.draftBucketId ?? null
		},
		lifespans: [
			{
				id: expectedLifespanId,
				gardenId: garden.id,
				origin: input.origin,
				geometryHistoryId,
				locationHistoryId
			},
			{ id: recordedLifespanId, gardenId: garden.id, origin: input.origin }
		],
		geometryHistories: [
			{
				id: geometryHistoryId,
				gardenId: garden.id,
				geometryIds: new Set(geometryRows.map((geometry) => geometry.id))
			}
		],
		geometries: geometryRows,
		locationHistories: [
			{
				id: locationHistoryId,
				gardenId: garden.id,
				locationIds: new Set([locationId]),
				workspaceIds: new Set([workspace.id])
			}
		],
		locations: [
			{
				id: locationId,
				gardenId: garden.id,
				workspaceId: location.workspaceId,
				x: location.coordinate.x,
				y: location.coordinate.y,
				date: location.date
			}
		],
		observations: observationRows
	};
}

export default function plantsSeed(): BulkInsert<typeof schema> {
	const lettuceGrowing = buildSeedPlant({
		plantId: 'lettuce-growing',
		cultivar: lettuce,
		origin: 'DIRECT_SEED',
		anchorMilestone: 'GERMINATION',
		anchorDate: addDays(currentDay, -20),
		coordinate: { x: 2, y: 2 }
	});
	const tomatoTransplanted = buildSeedPlant({
		plantId: 'tomato-transplanted',
		cultivar: tomato,
		origin: 'SEED_TO_TRANSPLANT',
		anchorMilestone: 'TRANSPLANT',
		anchorDate: addDays(currentDay, -10),
		coordinate: { x: -3, y: 6 },
		/** Sown two days later than planned - a small, realistic divergence between the plan and what actually happened. */
		recordedObservations: (expected) => {
			const seedDate = expected.find(
				(observation) => observation.type === 'plant-seed'
			)?.date;
			return seedDate
				? [{ type: 'plant-seed' as const, date: addDays(seedDate, 2) }]
				: [];
		}
	});
	const carrotExpired = buildSeedPlant({
		plantId: 'carrot-expired',
		cultivar: carrot,
		origin: 'DIRECT_SEED',
		anchorMilestone: 'EXPIRY',
		anchorDate: addDays(currentDay, -5),
		coordinate: { x: 4, y: -2 },
		/** A fully-lived plant: every expected milestone actually happened, right on schedule. */
		recordedObservations: (expected) =>
			expected.map((observation) => ({
				type: observation.type,
				date: observation.date
			}))
	});
	const lettuceUpcoming = buildSeedPlant({
		plantId: 'lettuce-upcoming',
		cultivar: lettuce,
		origin: 'DIRECT_SEED',
		anchorMilestone: 'SEED',
		anchorDate: addDays(currentDay, 7),
		coordinate: { x: 6, y: -4 }
	});
	const tomatoHarvesting = buildSeedPlant({
		plantId: 'tomato-harvesting',
		cultivar: tomato,
		origin: 'SEEDLING_TO_TRANSPLANT',
		anchorMilestone: 'FIRST_HARVEST',
		anchorDate: currentDay,
		coordinate: { x: -6, y: 3 },
		/** A harvest with real recorded data, demonstrating the info point popup's data fields. */
		recordedObservations: () => [
			{
				type: 'plant-harvest',
				date: currentDay,
				data: {
					mass: 1.2,
					quality: 'average',
					description: 'First cherry tomatoes of the season.'
				}
			}
		]
	});
	const lettuceDraft = buildSeedPlant({
		plantId: 'lettuce-draft',
		cultivar: lettuce,
		origin: 'DIRECT_SEED',
		anchorMilestone: 'SEED',
		anchorDate: currentDay,
		coordinate: { x: -1, y: -6 },
		draftBucketId: 'draft-bucket-fall-succession'
	});

	const seedPlants = [
		lettuceGrowing,
		tomatoTransplanted,
		carrotExpired,
		lettuceUpcoming,
		tomatoHarvesting,
		lettuceDraft
	];

	return {
		plants: seedPlants.map((seedPlant) => seedPlant.plant),
		lifespans: seedPlants.flatMap((seedPlant) => seedPlant.lifespans),
		geometryHistories: seedPlants.flatMap((seedPlant) => seedPlant.geometryHistories),
		geometries: seedPlants.flatMap((seedPlant) => seedPlant.geometries),
		locationHistories: seedPlants.flatMap((seedPlant) => seedPlant.locationHistories),
		locations: seedPlants.flatMap((seedPlant) => seedPlant.locations),
		observations: seedPlants.flatMap((seedPlant) => seedPlant.observations),
		/**
		 * One open, uncommitted plan - demonstrates DraftBucket ghosting and
		 * the Add Plants tool's "To Create" tree without needing to stage
		 * anything by hand first.
		 */
		draftBuckets: [
			{
				id: 'draft-bucket-fall-succession',
				gardenId: garden.id,
				name: 'Fall lettuce succession',
				creatorId: user.profile.id,
				committed: false
			}
		]
	};
}
