import { BulkInsert } from '@triplit/client';

import {
	type AnnualLifecycleMilestone,
	type Cultivar,
	type Origin,
	type PlantExpectedObservationCommand,
	type PlantObservationId,
	type Position,
	addDays,
	generateExpectedHistories,
	historyGetRange
} from '../../src/index.js';
import { schema } from '../schema.js';

const gardenId = 'garden1';

/**
 * Cultivars seeded below, as plain objects (not inserted as-is - each is
 * split into a cultivarCollections/cultivars row pair) so buildSeedPlant can
 * read `.attributes` straight off them via generateExpectedHistories, the
 * same function the real Add Plants stamp uses. Three different crops with
 * three different origins (direct seed, seed-to-transplant,
 * seedling-to-transplant) so the seeded Plants below exercise a varied set
 * of milestone chains, not just one.
 */
const lettuce: Cultivar = {
	id: 'lettuce',
	collectionId: 'west-coast-seeds',
	name: 'lettuce',
	abbreviation: 'Le',
	description: 'A fast-growing, cold-hardy leafy green.',
	attributes: {
		annualLifeCycle: {
			sowToGerm: 5,
			germToTransplant: 20,
			germToFirstHarvest: 45,
			firstToLastHarvest: 20,
			lastHarvestToExpiry: 10
		},
		color: { baseColor: '#46A758', outlineColor: '#71D083', textColor: '#1A2E05' },
		frostDatePlantingWindows: {
			lastFrostWindowOpen: -14,
			lastFrostWindowClose: 21,
			firstFrostWindowOpen: -60,
			firstFrostWindowClose: -14
		},
		origin: { transplantable: true },
		expectedGeometry: {
			geometryType: 'ELLIPSE',
			seedSize: 0.01,
			seedlingSize: 0.05,
			firstHarvestSize: 0.3,
			lastHarvestSize: 0.35,
			expirySize: 0.3
		}
	},
	createdAt: new Date()
};
const tomato: Cultivar = {
	id: 'tomato',
	collectionId: 'west-coast-seeds',
	name: 'tomato',
	abbreviation: 'To',
	description: 'A frost-tender fruiting crop, started indoors and transplanted out.',
	attributes: {
		annualLifeCycle: {
			sowToGerm: 7,
			germToTransplant: 35,
			germToFirstHarvest: 80,
			firstToLastHarvest: 60,
			lastHarvestToExpiry: 20
		},
		color: { baseColor: '#E5484D', outlineColor: '#FF9592', textColor: '#641723' },
		frostDatePlantingWindows: {
			lastFrostWindowOpen: 14,
			lastFrostWindowClose: 42,
			firstFrostWindowOpen: -90,
			firstFrostWindowClose: -60
		},
		origin: { transplantable: true },
		expectedGeometry: {
			geometryType: 'RECTANGLE',
			seedSize: 0.02,
			seedlingSize: 0.08,
			firstHarvestSize: 0.6,
			lastHarvestSize: 0.65,
			expirySize: 0.6
		}
	},
	createdAt: new Date()
};
const carrot: Cultivar = {
	id: 'carrot',
	collectionId: 'west-coast-seeds',
	name: 'carrot',
	abbreviation: 'Ca',
	description: 'A direct-seeded root crop that does not transplant well.',
	attributes: {
		annualLifeCycle: {
			sowToGerm: 10,
			germToFirstHarvest: 70,
			firstToLastHarvest: 14,
			lastHarvestToExpiry: 7
		},
		color: { baseColor: '#F76B15', outlineColor: '#FFA057', textColor: '#582D1D' },
		frostDatePlantingWindows: {
			lastFrostWindowOpen: -7,
			lastFrostWindowClose: 28,
			firstFrostWindowOpen: -70,
			firstFrostWindowClose: -20
		},
		origin: { transplantable: false },
		expectedGeometry: {
			geometryType: 'ELLIPSE',
			seedSize: 0.005,
			seedlingSize: 0.02,
			firstHarvestSize: 0.05,
			lastHarvestSize: 0.06,
			expirySize: 0.05
		}
	},
	createdAt: new Date()
};

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
	workspaceId: string;
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
		gardenId,
		workspaceId: input.workspaceId,
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
		gardenId,
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
			gardenId,
			type: observation.type,
			entityIds: new Set([expectedLifespanId]),
			date: observation.date
		})),
		...recordedObservations.map((observation, index) => ({
			id: `${input.plantId}-recorded-observation-${index}`,
			gardenId,
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
			gardenId,
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
				gardenId,
				origin: input.origin,
				geometryHistoryId,
				locationHistoryId
			},
			{ id: recordedLifespanId, gardenId, origin: input.origin }
		],
		geometryHistories: [
			{
				id: geometryHistoryId,
				gardenId,
				geometryIds: new Set(geometryRows.map((geometry) => geometry.id))
			}
		],
		geometries: geometryRows,
		locationHistories: [
			{
				id: locationHistoryId,
				gardenId,
				locationIds: new Set([locationId]),
				workspaceIds: new Set([input.workspaceId])
			}
		],
		locations: [
			{
				id: locationId,
				gardenId,
				workspaceId: location.workspaceId,
				x: location.coordinate.x,
				y: location.coordinate.y,
				date: location.date
			}
		],
		observations: observationRows
	};
}

export default function seed(): BulkInsert<typeof schema> {
	/**
	 * Anchored to the real current day rather than a fixed past date, so the
	 * Timeline Selector/Calendar show a relevant mix (already-growing,
	 * already-expired, not-yet-started) whenever this is actually run,
	 * instead of drifting further into the past every year this seed goes
	 * untouched.
	 */
	const today = new Date();

	const lettuceGrowing = buildSeedPlant({
		plantId: 'lettuce-growing',
		workspaceId: 'workspace1',
		cultivar: lettuce,
		origin: 'DIRECT_SEED',
		anchorMilestone: 'GERMINATION',
		anchorDate: addDays(today, -20),
		coordinate: { x: 2, y: 2 }
	});
	const tomatoTransplanted = buildSeedPlant({
		plantId: 'tomato-transplanted',
		workspaceId: 'workspace1',
		cultivar: tomato,
		origin: 'SEED_TO_TRANSPLANT',
		anchorMilestone: 'TRANSPLANT',
		anchorDate: addDays(today, -10),
		coordinate: { x: -3, y: 6 },
		/** Sown two days later than planned - a small, realistic divergence between the plan and what actually happened. */
		recordedObservations: (expected) => {
			const seedDate = expected.find(
				(observation) => observation.type === 'plant-seed'
			)?.date;
			const germDate = expected.find(
				(observation) => observation.type === 'plant-germ'
			)?.date;
			return [
				...(seedDate
					? [{ type: 'plant-seed' as const, date: addDays(seedDate, 2) }]
					: []),
				...(germDate
					? [{ type: 'plant-germ' as const, date: addDays(germDate, 2) }]
					: [])
			];
		}
	});
	const carrotExpired = buildSeedPlant({
		plantId: 'carrot-expired',
		workspaceId: 'workspace2',
		cultivar: carrot,
		origin: 'DIRECT_SEED',
		anchorMilestone: 'EXPIRY',
		anchorDate: addDays(today, -5),
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
		workspaceId: 'workspace1',
		cultivar: lettuce,
		origin: 'DIRECT_SEED',
		anchorMilestone: 'SEED',
		anchorDate: addDays(today, 7),
		coordinate: { x: 6, y: -4 }
	});
	const tomatoHarvesting = buildSeedPlant({
		plantId: 'tomato-harvesting',
		workspaceId: 'workspace2',
		cultivar: tomato,
		origin: 'SEEDLING_TO_TRANSPLANT',
		anchorMilestone: 'FIRST_HARVEST',
		anchorDate: today,
		coordinate: { x: -6, y: 3 },
		/** A harvest with real recorded data, demonstrating the info point popup's data fields. */
		recordedObservations: () => [
			{
				type: 'plant-harvest',
				date: today,
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
		workspaceId: 'workspace1',
		cultivar: lettuce,
		origin: 'DIRECT_SEED',
		anchorMilestone: 'SEED',
		anchorDate: today,
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
		profiles: [
			{ id: 'user1', username: 'user1' },
			{ id: 'user2', username: 'user2' },
			{ id: 'user3', username: 'user3' },
			{ id: 'user4', username: 'user4' }
		],
		accounts: [
			{
				id: '6rc3xPda9UYit0MI36UyE',
				profileId: 'user1',
				/** Password is 'password'. */
				passwordHash: '$argon2i$v=19$m=16,t=2,p=1$MTIzNDU2Nzg5$e7G/IEd63Q/ZrZIiW6FUow',
				verifiedEmail: 'test@Verdagraph.com',
				unverifiedEmail: {
					address: null,
					token: null
				},
				passwordResetToken: null
			}
		],
		gardens: [
			{
				id: gardenId,
				name: "Nathaniel's Garden.",
				visibility: 'PUBLIC',
				description: 'This is the default seeded garden.',
				creatorId: 'user1',
				adminIds: new Set(['user1'])
			},
			{
				id: 'edit-garden',
				name: 'Editor Garden.',
				visibility: 'PUBLIC',
				creatorId: null,
				adminIds: new Set(),
				editorIds: new Set(['user1'])
			},
			{
				id: 'view-garden',
				name: 'Viewer Garden.',
				visibility: 'PUBLIC',
				creatorId: null,
				adminIds: new Set(),
				viewerIds: new Set(['user1'])
			}
		],
		gardenMemberships: [
			{
				gardenId: gardenId,
				userId: 'user1',
				role: 'ADMIN',
				inviterId: null,
				status: 'ACCEPTED',
				acceptedAt: new Date()
			},
			{
				gardenId: 'edit-garden',
				userId: 'user1',
				role: 'EDITOR',
				inviterId: 'user2',
				status: 'ACCEPTED',
				acceptedAt: new Date()
			},
			{
				gardenId: 'view-garden',
				userId: 'user1',
				role: 'EDITOR',
				inviterId: null,
				status: 'ACCEPTED',
				acceptedAt: new Date()
			}
		],
		workspaces: [
			{
				id: 'workspace1',
				gardenId: gardenId,
				name: 'Workspace 1',
				slug: 'workspace-1',
				description: 'This is the default seeded workspace.'
			},
			{
				id: 'workspace2',
				gardenId: gardenId,
				name: 'Workspace 2',
				slug: 'workspace-2'
			}
		],
		/**
		 * Garden-level frost dates, combined with each Cultivar's
		 * frostDatePlantingWindows profile above to compute the Calendar's
		 * PlantingWindows pane - not yet wired to real data there (see
		 * Calendar.svelte's hardcoded placeholder `windows`), but seeded
		 * correctly so that's a pure UI task whenever it happens.
		 */
		environments: [
			{
				id: 'garden1-environment',
				name: 'Garden',
				description: '',
				parentType: 'GARDEN',
				gardenId: gardenId,
				inherit: true,
				attributes: {
					frostDates: {
						lastFrostDate: new Date(2026, 3, 15),
						firstFrostDate: new Date(2026, 10, 1)
					},
					annualTemperature: { minimum: -12, maximum: 32 }
				}
			}
		],
		cultivarCollections: [
			{
				id: 'west-coast-seeds',
				gardenId: gardenId,
				name: 'West Coast Seeds',
				slug: 'west-coast-seeds',
				visibility: 'HIDDEN'
			}
		],
		cultivars: [lettuce, tomato, carrot],
		plants: seedPlants.map((seedPlant) => seedPlant.plant),
		lifespans: seedPlants.flatMap((seedPlant) => seedPlant.lifespans),
		/**
		 * One open, uncommitted plan - demonstrates DraftBucket ghosting and
		 * the Add Plants tool's "To Create" tree without needing to stage
		 * anything by hand first.
		 */
		draftBuckets: [
			{
				id: 'draft-bucket-fall-succession',
				gardenId: gardenId,
				name: 'Fall lettuce succession',
				creatorId: 'user1',
				committed: false
			}
		],
		plantingAreas: [
			{
				gardenId: gardenId,
				name: 'Rectangle Area',
				geometryId: 'rectangleAreaGeometry',
				locationHistoryId: 'rectangleGeometryLocations',
				description: 'Rectangle Description.'
			},
			{
				gardenId: gardenId,
				name: 'Ellipse Area',
				geometryId: 'ellipseAreaGeometry',
				locationHistoryId: 'ellipseGeometryLocations',
				description: 'Ellipse Description.'
			},
			{
				gardenId: gardenId,
				name: 'Polygon Area',
				geometryId: 'polygonAreaGeometry',
				locationHistoryId: 'polygonGeometryLocations',
				description: 'Polygon Description.'
			},
			{
				gardenId: gardenId,
				name: 'Lines Area',
				geometryId: 'linesAreaGeometry',
				locationHistoryId: 'linesGeometryLocations',
				description: 'Lines Description.'
			}
		],
		geometries: [
			{
				id: 'rectangleAreaGeometry',
				gardenId: gardenId,
				type: 'RECTANGLE',
				date: new Date(),
				rectangleLength: 2,
				rectangleWidth: 3
			},
			{
				id: 'ellipseAreaGeometry',
				gardenId: gardenId,
				type: 'ELLIPSE',
				date: new Date(),
				ellipseWidth: 1.5,
				ellipseLength: 2
			},
			{
				id: 'polygonAreaGeometry',
				gardenId: gardenId,
				type: 'POLYGON',
				date: new Date(),
				polygonNumSides: 5,
				polygonRadius: 0.4
			},
			{
				id: 'linesAreaGeometry',
				gardenId: gardenId,
				type: 'LINES',
				date: new Date(),
				linesCoordinateIds: new Set([
					'linesAreaCoord1',
					'linesAreaCoord2',
					'linesAreaCoord3',
					'linesAreaCoord4'
				]),
				linesClosed: true
			},
			...seedPlants.flatMap((seedPlant) => seedPlant.geometries)
		],
		geometryHistories: seedPlants.flatMap((seedPlant) => seedPlant.geometryHistories),
		locationHistories: [
			{
				id: 'rectangleGeometryLocations',
				gardenId: gardenId,
				locationIds: new Set([
					'rectangleAreaGeometryLocation1',
					'rectangleAreaGeometryLocation2'
				]),
				workspaceIds: new Set(['workspace1'])
			},
			{
				id: 'ellipseGeometryLocations',
				gardenId: gardenId,
				locationIds: new Set([
					'ellipseAreaGeometryLocation1',
					'ellipseAreaGeometryLocation2'
				]),
				workspaceIds: new Set(['workspace1'])
			},
			{
				id: 'polygonGeometryLocations',
				gardenId: gardenId,
				locationIds: new Set(['polygonAreaGeometryLocation1']),
				workspaceIds: new Set(['workspace1'])
			},
			{
				id: 'linesGeometryLocations',
				gardenId: gardenId,
				locationIds: new Set(['linesAreaGeometryLocation1']),
				workspaceIds: new Set(['workspace1'])
			},
			...seedPlants.flatMap((seedPlant) => seedPlant.locationHistories)
		],
		locations: [
			{
				id: 'rectangleAreaGeometryLocation1',
				gardenId: gardenId,
				workspaceId: 'workspace1',
				x: 5,
				y: 2,
				date: new Date(2024, 0, 8, 14, 30, 0)
			},
			{
				id: 'rectangleAreaGeometryLocation2',
				gardenId: gardenId,
				workspaceId: 'workspace1',
				x: 6,
				y: 8,
				date: new Date(2024, 0, 11, 14, 30, 0)
			},
			{
				id: 'ellipseAreaGeometryLocation1',
				gardenId: gardenId,
				workspaceId: 'workspace1',
				x: -3,
				y: 5,
				date: new Date(2024, 0, 12, 14, 30, 0)
			},
			{
				id: 'ellipseAreaGeometryLocation2',
				gardenId: gardenId,
				workspaceId: 'workspace1',
				x: 0,
				y: 10,
				date: new Date(2024, 0, 14, 14, 30, 0)
			},
			{
				id: 'polygonAreaGeometryLocation1',
				gardenId: gardenId,
				workspaceId: 'workspace1',
				x: -5,
				y: -5,
				date: new Date(2024, 0, 3, 14, 30, 0)
			},
			{
				id: 'linesAreaGeometryLocation1',
				gardenId: gardenId,
				workspaceId: 'workspace1',
				x: -8,
				y: 2,
				date: new Date(2024, 0, 3, 14, 30, 0)
			},
			...seedPlants.flatMap((seedPlant) => seedPlant.locations)
		],
		observations: seedPlants.flatMap((seedPlant) => seedPlant.observations),
		coordinates: [
			{
				id: 'linesAreaCoord1',
				gardenId: gardenId,
				x: -1,
				y: 0
			},
			{
				id: 'linesAreaCoord2',
				gardenId: gardenId,
				x: -4,
				y: 1
			},
			{
				id: 'linesAreaCoord3',
				gardenId: gardenId,
				x: 2,
				y: 1.5
			},
			{
				id: 'linesAreaCoord4',
				gardenId: gardenId,
				x: 0.5,
				y: -1
			}
		]
	};
}
