import { type Cultivar } from './cultivars/index.js';
import {
	type AnnualLifecycleMilestone,
	type Origin,
	type PlantExpectedObservationCommand,
	type PlantObservationId,
	addDays,
	generateExpectedHistories
} from './plants/index.js';
import { type Position, historyGetRange } from './workspaces/index.js';

/**
 * A representative slice of a real garden - three cultivars across three
 * origins, and six plants spanning already-growing, already-expired,
 * not-yet-started, mid-harvest, and still-drafted - shared by
 * packages/models/triplit/seeds/seed.ts (the local dev Triplit server
 * apps/web connects to) and apps/demo's own in-browser seed (apps/demo/src/
 * lib/seeds/). Both need the same cultivar/plant/draft-bucket content; they
 * differ only in the garden/user/workspace scaffolding around it (the dev
 * seed also exercises multiple gardens and membership roles that the
 * single-user demo has no use for), so only that shared slice lives here -
 * each caller still builds its own garden/workspace/user rows.
 */

const cultivarCollectionId = 'west-coast-seeds';

/** Id of the seeded West Coast Seeds cultivar collection. */
export const westCoastSeedsCollectionId = cultivarCollectionId;

export const lettuce: Cultivar = {
	id: 'lettuce',
	collectionId: cultivarCollectionId,
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
export const tomato: Cultivar = {
	id: 'tomato',
	collectionId: cultivarCollectionId,
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
export const carrot: Cultivar = {
	id: 'carrot',
	collectionId: cultivarCollectionId,
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

/** Fills the fields every West Coast Seeds cultivar shares. */
function westCoastCultivar(
	cultivar: Omit<Cultivar, 'collectionId' | 'createdAt'>
): Cultivar {
	return { ...cultivar, collectionId: cultivarCollectionId, createdAt: new Date() };
}

/**
 * Additional cultivars for the West Coast Seeds collection, so the cultivar
 * editor has varieties (parentId chains) and a spread of lifecycles and
 * frost windows to show. Values are representative, not copied from packets.
 */
export const romaTomato = westCoastCultivar({
	id: 'roma-tomato',
	name: 'Roma Tomato',
	abbreviation: 'Ro',
	parentId: 'tomato',
	description: 'A paste tomato variety with dense, meaty fruit.',
	attributes: {
		annualLifeCycle: { germToFirstHarvest: 85, firstToLastHarvest: 45 },
		color: { baseColor: '#CD2B31', outlineColor: '#FF9592', textColor: '#641723' }
	}
});
export const cherryTomato = westCoastCultivar({
	id: 'cherry-tomato',
	name: 'Cherry Tomato',
	abbreviation: 'Ch',
	parentId: 'tomato',
	description: 'A prolific, early variety with small sweet fruit.',
	attributes: {
		annualLifeCycle: { germToFirstHarvest: 62, firstToLastHarvest: 75 },
		expectedGeometry: { firstHarvestSize: 0.5, lastHarvestSize: 0.55, expirySize: 0.5 }
	}
});
export const romaineLettuce = westCoastCultivar({
	id: 'romaine-lettuce',
	name: 'Romaine Lettuce',
	abbreviation: 'Rm',
	parentId: 'lettuce',
	description: 'An upright, heat-tolerant lettuce forming tall heads.',
	attributes: { annualLifeCycle: { germToFirstHarvest: 55, firstToLastHarvest: 14 } }
});
export const spinach = westCoastCultivar({
	id: 'spinach',
	name: 'Spinach',
	abbreviation: 'Sp',
	scientificName: 'Spinacia oleracea',
	description: 'A cold-hardy leafy green that bolts in summer heat.',
	attributes: {
		annualLifeCycle: {
			sowToGerm: 7,
			germToFirstHarvest: 40,
			firstToLastHarvest: 15,
			lastHarvestToExpiry: 7
		},
		color: { baseColor: '#30A46C', outlineColor: '#6CCB97', textColor: '#193B2D' },
		frostDatePlantingWindows: {
			lastFrostWindowOpen: -42,
			lastFrostWindowClose: 14,
			firstFrostWindowOpen: -56,
			firstFrostWindowClose: -21
		},
		origin: { transplantable: false },
		expectedGeometry: {
			geometryType: 'ELLIPSE',
			seedSize: 0.005,
			seedlingSize: 0.03,
			firstHarvestSize: 0.2,
			lastHarvestSize: 0.25,
			expirySize: 0.2
		}
	}
});
export const kale = westCoastCultivar({
	id: 'kale',
	name: 'Kale',
	abbreviation: 'Ka',
	scientificName: 'Brassica oleracea',
	description: 'A hardy brassica harvested leaf by leaf into the winter.',
	attributes: {
		annualLifeCycle: {
			sowToGerm: 7,
			germToTransplant: 28,
			germToFirstHarvest: 55,
			firstToLastHarvest: 90,
			lastHarvestToExpiry: 14
		},
		color: { baseColor: '#3E63DD', outlineColor: '#8DA4EF', textColor: '#182449' },
		frostDatePlantingWindows: {
			lastFrostWindowOpen: -28,
			lastFrostWindowClose: 28,
			firstFrostWindowOpen: -90,
			firstFrostWindowClose: -45
		},
		origin: { transplantable: true },
		expectedGeometry: {
			geometryType: 'ELLIPSE',
			seedSize: 0.01,
			seedlingSize: 0.06,
			firstHarvestSize: 0.45,
			lastHarvestSize: 0.6,
			expirySize: 0.5
		}
	}
});
export const radish = westCoastCultivar({
	id: 'radish',
	name: 'Radish',
	abbreviation: 'Ra',
	scientificName: 'Raphanus sativus',
	description: 'A very fast direct-seeded root, suited to succession sowing.',
	attributes: {
		annualLifeCycle: {
			sowToGerm: 4,
			germToFirstHarvest: 25,
			firstToLastHarvest: 7,
			lastHarvestToExpiry: 5
		},
		color: { baseColor: '#E93D82', outlineColor: '#F3A0C0', textColor: '#5F1B35' },
		frostDatePlantingWindows: {
			lastFrostWindowOpen: -35,
			lastFrostWindowClose: 35,
			firstFrostWindowOpen: -50,
			firstFrostWindowClose: -21
		},
		origin: { transplantable: false },
		expectedGeometry: {
			geometryType: 'ELLIPSE',
			seedSize: 0.003,
			seedlingSize: 0.015,
			firstHarvestSize: 0.04,
			lastHarvestSize: 0.05,
			expirySize: 0.04
		}
	}
});
export const bushBean = westCoastCultivar({
	id: 'bush-bean',
	name: 'Bush Bean',
	abbreviation: 'Bb',
	scientificName: 'Phaseolus vulgaris',
	description: 'A frost-tender, direct-seeded legume with a compact habit.',
	attributes: {
		annualLifeCycle: {
			sowToGerm: 8,
			germToFirstHarvest: 55,
			firstToLastHarvest: 21,
			lastHarvestToExpiry: 10
		},
		color: { baseColor: '#12A594', outlineColor: '#53B9AB', textColor: '#0D3D38' },
		frostDatePlantingWindows: {
			lastFrostWindowOpen: 7,
			lastFrostWindowClose: 49,
			firstFrostWindowOpen: -75,
			firstFrostWindowClose: -56
		},
		origin: { transplantable: false },
		expectedGeometry: {
			geometryType: 'ELLIPSE',
			seedSize: 0.01,
			seedlingSize: 0.05,
			firstHarvestSize: 0.35,
			lastHarvestSize: 0.4,
			expirySize: 0.35
		}
	}
});
export const zucchini = westCoastCultivar({
	id: 'zucchini',
	name: 'Zucchini',
	abbreviation: 'Zu',
	scientificName: 'Cucurbita pepo',
	description: 'A productive summer squash that sprawls across the bed.',
	attributes: {
		annualLifeCycle: {
			sowToGerm: 7,
			germToTransplant: 21,
			germToFirstHarvest: 50,
			firstToLastHarvest: 60,
			lastHarvestToExpiry: 14
		},
		color: { baseColor: '#FFC53D', outlineColor: '#FFE770', textColor: '#4F3422' },
		frostDatePlantingWindows: {
			lastFrostWindowOpen: 14,
			lastFrostWindowClose: 49,
			firstFrostWindowOpen: -110,
			firstFrostWindowClose: -70
		},
		origin: { transplantable: true },
		expectedGeometry: {
			geometryType: 'ELLIPSE',
			seedSize: 0.015,
			seedlingSize: 0.1,
			firstHarvestSize: 0.9,
			lastHarvestSize: 1,
			expirySize: 0.9
		}
	}
});
const westCoastSeedsCultivars = [
	lettuce,
	tomato,
	carrot,
	romaTomato,
	cherryTomato,
	romaineLettuce,
	spinach,
	kale,
	radish,
	bushBean,
	zucchini
];

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
	gardenId: string;
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
		gardenId: input.gardenId,
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
		gardenId: input.gardenId,
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
			gardenId: input.gardenId,
			type: observation.type,
			entityIds: new Set([expectedLifespanId]),
			date: observation.date
		})),
		...recordedObservations.map((observation, index) => ({
			id: `${input.plantId}-recorded-observation-${index}`,
			gardenId: input.gardenId,
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
			gardenId: input.gardenId,
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
				gardenId: input.gardenId,
				origin: input.origin,
				geometryHistoryId,
				locationHistoryId
			},
			{ id: recordedLifespanId, gardenId: input.gardenId, origin: input.origin }
		],
		geometryHistories: [
			{
				id: geometryHistoryId,
				gardenId: input.gardenId,
				geometryIds: new Set(geometryRows.map((geometry) => geometry.id))
			}
		],
		geometries: geometryRows,
		locationHistories: [
			{
				id: locationHistoryId,
				gardenId: input.gardenId,
				locationIds: new Set([locationId]),
				workspaceIds: new Set([input.workspaceId])
			}
		],
		locations: [
			{
				id: locationId,
				gardenId: input.gardenId,
				workspaceId: location.workspaceId,
				x: location.coordinate.x,
				y: location.coordinate.y,
				date: location.date
			}
		],
		observations: observationRows
	};
}

/**
 * The shared six-plant slice - everything a caller needs to spread into its
 * own BulkInsert, scoped to its own garden/workspace/draft-bucket-creator.
 * `draftBucketId` defaults to a fixed id since both current callers run
 * against entirely separate databases (a local dev server vs. an in-browser
 * demo instance), so there's no real collision risk in reusing it.
 */
export function buildSeedGardenPlants(params: {
	gardenId: string;
	workspaceId: string;
	draftBucketCreatorId: string;
	draftBucketId?: string;
	/** Defaults to the real current day, so the seeded Timeline/Calendar show a relevant mix whenever this actually runs. */
	today?: Date;
}) {
	const today = params.today ?? new Date();
	const draftBucketId = params.draftBucketId ?? 'draft-bucket-fall-succession';

	const lettuceGrowing = buildSeedPlant({
		plantId: 'lettuce-growing',
		gardenId: params.gardenId,
		workspaceId: params.workspaceId,
		cultivar: lettuce,
		origin: 'DIRECT_SEED',
		anchorMilestone: 'GERMINATION',
		anchorDate: addDays(today, -20),
		coordinate: { x: 2, y: 2 }
	});
	const tomatoTransplanted = buildSeedPlant({
		plantId: 'tomato-transplanted',
		gardenId: params.gardenId,
		workspaceId: params.workspaceId,
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
			return seedDate
				? [{ type: 'plant-seed' as const, date: addDays(seedDate, 2) }]
				: [];
		}
	});
	const carrotExpired = buildSeedPlant({
		plantId: 'carrot-expired',
		gardenId: params.gardenId,
		workspaceId: params.workspaceId,
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
		gardenId: params.gardenId,
		workspaceId: params.workspaceId,
		cultivar: lettuce,
		origin: 'DIRECT_SEED',
		anchorMilestone: 'SEED',
		anchorDate: addDays(today, 7),
		coordinate: { x: 6, y: -4 }
	});
	const tomatoHarvesting = buildSeedPlant({
		plantId: 'tomato-harvesting',
		gardenId: params.gardenId,
		workspaceId: params.workspaceId,
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
		gardenId: params.gardenId,
		workspaceId: params.workspaceId,
		cultivar: lettuce,
		origin: 'DIRECT_SEED',
		anchorMilestone: 'SEED',
		anchorDate: today,
		coordinate: { x: -1, y: -6 },
		draftBucketId
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
		cultivarCollections: [
			{
				id: cultivarCollectionId,
				gardenId: params.gardenId,
				name: 'West Coast Seeds',
				slug: 'west-coast-seeds',
				description: 'Cultivars suited to a coastal temperate climate.',
				tags: new Set(['seed company', 'temperate']),
				visibility: 'HIDDEN' as const
			}
		],
		cultivars: westCoastSeedsCultivars,
		plants: seedPlants.map((seedPlant) => seedPlant.plant),
		lifespans: seedPlants.flatMap((seedPlant) => seedPlant.lifespans),
		geometryHistories: seedPlants.flatMap((seedPlant) => seedPlant.geometryHistories),
		geometries: seedPlants.flatMap((seedPlant) => seedPlant.geometries),
		locationHistories: seedPlants.flatMap((seedPlant) => seedPlant.locationHistories),
		locations: seedPlants.flatMap((seedPlant) => seedPlant.locations),
		observations: seedPlants.flatMap((seedPlant) => seedPlant.observations),
		draftBuckets: [
			{
				id: draftBucketId,
				gardenId: params.gardenId,
				name: 'Fall lettuce succession',
				creatorId: params.draftBucketCreatorId,
				committed: false
			}
		]
	};
}
