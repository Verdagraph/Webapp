import { getDb, getSession } from 'jazz-tools/svelte';

import type { GeometryCreateCommand } from '@vdg-webapp/models';
import {
	type ControllerContext,
	app,
	createController,
	gardenCreate,
	plantingAreaCreate,
	plantsCreate,
	workspaceCreate
} from '@vdg-webapp/models';

const DEMO_GARDEN_SLUG = 'garden';
const DEMO_USERNAME = 'Demo User';

/**
 * Polls until the local-first Jazz session has assigned this browser its
 * own account id. There is no login step to await here - local-first
 * identity creation happens automatically once <JazzProvider> mounts.
 */
async function waitForAccountId(): Promise<string> {
	const session = getSession();
	while (!session.current?.user.account) {
		await new Promise((resolve) => setTimeout(resolve, 20));
	}
	return session.current.user.account;
}

/**
 * Builds a controller for the demo's local-first Jazz session,
 * self-provisioning a public profile row (see
 * packages/models/src/jazz/users.ts) keyed by this session's own account
 * id if one doesn't exist yet - a local-first session has no prior signup
 * step to have created one.
 */
async function createDemoController(): Promise<ControllerContext> {
	const db = getDb();
	const accountId = await waitForAccountId();

	let profile = await db.one(app.users.where({ id: accountId }));
	if (!profile) {
		const write = db.upsert(app.users, accountId, { username: DEMO_USERNAME });
		await write.wait({ tier: 'edge' });
		profile = await db.one(app.users.where({ id: accountId }));
	}
	if (!profile) {
		throw new Error('Failed to provision the demo user profile.');
	}
	const resolvedProfile = profile;

	return createController({
		db,
		jazz: app,
		getClient: async () => ({ profile: resolvedProfile })
	});
}

const earlyDate = new Date(2020, 0, 1);

const plantingAreaSeeds: Array<{
	name: string;
	geometry: GeometryCreateCommand;
	coordinate: { x: number; y: number };
}> = [
	{
		name: 'Cedar 1',
		geometry: {
			type: 'RECTANGLE',
			date: earlyDate,
			scaleFactor: 1,
			rotation: 0,
			rectangleLength: 1,
			rectangleWidth: 1.5,
			polygonNumSides: 3,
			polygonRadius: 1,
			ellipseLength: 1,
			ellipseWidth: 1,
			linesCoordinates: [],
			linesClosed: true
		},
		coordinate: { x: 1.5, y: 3.5 }
	},
	{
		name: 'Cedar 2',
		geometry: {
			type: 'RECTANGLE',
			date: earlyDate,
			scaleFactor: 1,
			rotation: 0,
			rectangleLength: 1,
			rectangleWidth: 1.5,
			polygonNumSides: 3,
			polygonRadius: 1,
			ellipseLength: 1,
			ellipseWidth: 1,
			linesCoordinates: [],
			linesClosed: true
		},
		coordinate: { x: 3, y: 3.5 }
	},
	{
		name: 'Metal 1',
		geometry: {
			type: 'ELLIPSE',
			date: earlyDate,
			scaleFactor: 1,
			rotation: 90,
			rectangleLength: 1,
			rectangleWidth: 1,
			polygonNumSides: 3,
			polygonRadius: 1,
			ellipseLength: 1,
			ellipseWidth: 1.5,
			linesCoordinates: [],
			linesClosed: true
		},
		coordinate: { x: 5, y: 4.5 }
	},
	{
		name: 'Metal 2',
		geometry: {
			type: 'ELLIPSE',
			date: earlyDate,
			scaleFactor: 1,
			rotation: 0,
			rectangleLength: 1,
			rectangleWidth: 1,
			polygonNumSides: 3,
			polygonRadius: 1,
			ellipseLength: 1,
			ellipseWidth: 1.5,
			linesCoordinates: [],
			linesClosed: true
		},
		coordinate: { x: 6.5, y: 3 }
	},
	{
		name: 'Hexagonal Pot',
		geometry: {
			type: 'POLYGON',
			date: earlyDate,
			scaleFactor: 1,
			rotation: 0,
			rectangleLength: 1,
			rectangleWidth: 1,
			polygonNumSides: 6,
			polygonRadius: 0.25,
			ellipseLength: 1,
			ellipseWidth: 1,
			linesCoordinates: [],
			linesClosed: true
		},
		coordinate: { x: 4.5, y: 2 }
	},
	{
		name: 'Corner',
		geometry: {
			type: 'LINES',
			date: earlyDate,
			scaleFactor: 1,
			rotation: 0,
			rectangleLength: 1,
			rectangleWidth: 1,
			polygonNumSides: 3,
			polygonRadius: 1,
			ellipseLength: 1,
			ellipseWidth: 1,
			linesClosed: true,
			linesCoordinates: [
				{ x: 0, y: 0 },
				{ x: 0, y: 1 },
				{ x: 0.5, y: 1 },
				{ x: 0.5, y: 0.5 },
				{ x: 1, y: 0.5 },
				{ x: 1, y: 0 }
			]
		},
		coordinate: { x: 1, y: 1 }
	}
];

/**
 * Guards against seedDemoGarden() running twice concurrently (observed in
 * dev under Vite HMR / a double onMount): the garden-existence check inside
 * it is a plain query-then-insert, racy under concurrent callers, and two
 * overlapping calls could each pass the check and insert their own garden
 * with the same slug from two different accounts.
 */
let seedPromise: Promise<string> | null = null;

/**
 * Seeds a demo garden with a workspace, planting areas, a cultivar
 * collection, and a plant, using the real ported Jazz controllers -
 * mirroring how a real garden is actually built, rather than a raw bulk
 * insert of hand-picked ids (Jazz row ids are always server-generated,
 * unlike Triplit's). Idempotent: if the garden already exists (e.g. a page
 * reload against an already-seeded local Jazz store), seeding is skipped.
 * @returns The demo garden's slug.
 */
export function seedDemoGarden(): Promise<string> {
	if (!seedPromise) {
		seedPromise = seedDemoGardenInternal();
	}
	return seedPromise;
}

async function seedDemoGardenInternal(): Promise<string> {
	const ctx = await createDemoController();

	const existingGarden = await ctx.db.one(
		app.gardens.where({ slug: DEMO_GARDEN_SLUG })
	);
	if (existingGarden) {
		return DEMO_GARDEN_SLUG;
	}

	const garden = await gardenCreate(
		{
			id: DEMO_GARDEN_SLUG,
			name: 'Garden',
			description: '',
			visibility: 'PUBLIC',
			adminInvites: [],
			editorInvites: [],
			viewerInvites: []
		},
		ctx
	);

	await ctx.db
		.insert(app.environments, {
			gardenId: garden.id,
			name: 'Garden',
			description: '',
			parentType: 'GARDEN',
			inherit: true,
			attributes: {
				frostDates: {
					lastFrostDate: new Date(2020, 4, 1).toISOString(),
					firstFrostDate: new Date(2020, 11, 1).toISOString()
				},
				annualTemperature: { minimum: -10, maximum: 10 }
			}
		})
		.wait({ tier: 'edge' });

	const workspace = await workspaceCreate(
		{ gardenId: DEMO_GARDEN_SLUG, name: 'Workspace', description: '' },
		ctx
	);

	for (const area of plantingAreaSeeds) {
		await plantingAreaCreate(
			{
				gardenId: DEMO_GARDEN_SLUG,
				workspaceId: workspace.id,
				name: area.name,
				description: '',
				depth: 0,
				geometry: area.geometry,
				location: {
					gardenId: garden.id,
					workspaceId: workspace.id,
					coordinate: area.coordinate,
					date: earlyDate
				}
			},
			ctx
		);
	}

	const collection = await ctx.db
		.insert(app.cultivarCollections, {
			gardenId: garden.id,
			name: 'West Coast Seeds',
			slug: 'west-coast-seeds',
			visibility: 'HIDDEN'
		})
		.wait({ tier: 'edge' });
	await ctx.db
		.insert(app.cultivars, {
			collectionId: collection.id,
			gardenId: garden.id,
			name: 'lettuce',
			abbreviation: 'Le',
			createdAt: new Date(),
			attributes: {
				annualLifeCycle: {
					sowToGerm: 10,
					germToTransplant: 30,
					germToFirstHarvest: 120,
					firstToLastHarvest: 24,
					lastHarvestToExpiry: 14
				},
				color: { baseColor: '#46A758', outlineColor: '#71D083', textColor: '#C2F0C2' },
				frostDatePlantingWindows: {
					firstFrostWindowOpen: 60,
					firstFrostWindowClose: 60,
					lastFrostWindowOpen: 60,
					lastFrostWindowClose: 60
				},
				origin: { transplantable: true },
				expectedGeometry: {
					geometryType: 'ELLIPSE',
					seedSize: 0.01,
					seedlingSize: 0.045,
					firstHarvestSize: 0.405,
					lastHarvestSize: 0.45,
					expirySize: 0.45
				}
			}
		})
		.wait({ tier: 'edge' });

	await plantsCreate(
		{
			gardenId: DEMO_GARDEN_SLUG,
			mode: 'SINGLE',
			draftBucketId: undefined as unknown as string,
			plants: [
				{
					cultivarName: 'lettuce',
					origin: 'DIRECT_SEED',
					quantity: 1,
					cultivarOverride: {},
					geometryHistory: {
						gardenId: garden.id,
						geometries: [
							{
								type: 'ELLIPSE',
								date: new Date(2026, 1, 1),
								scaleFactor: 0.1,
								rotation: 0,
								rectangleLength: 1,
								rectangleWidth: 1,
								polygonNumSides: 3,
								polygonRadius: 1,
								ellipseLength: 0.45,
								ellipseWidth: 0.45,
								linesCoordinates: [],
								linesClosed: true
							},
							{
								type: 'ELLIPSE',
								date: new Date(2026, 4, 1),
								scaleFactor: 0.5,
								rotation: 0,
								rectangleLength: 1,
								rectangleWidth: 1,
								polygonNumSides: 3,
								polygonRadius: 1,
								ellipseLength: 0.45,
								ellipseWidth: 0.45,
								linesCoordinates: [],
								linesClosed: true
							},
							{
								type: 'ELLIPSE',
								date: new Date(2026, 9, 1),
								scaleFactor: 1,
								rotation: 0,
								rectangleLength: 1,
								rectangleWidth: 1,
								polygonNumSides: 3,
								polygonRadius: 1,
								ellipseLength: 0.45,
								ellipseWidth: 0.45,
								linesCoordinates: [],
								linesClosed: true
							}
						]
					},
					locationHistory: {
						gardenId: garden.id,
						locations: [
							{
								gardenId: garden.id,
								workspaceId: workspace.id,
								coordinate: { x: 5, y: 5 },
								date: new Date(2026, 1, 1)
							},
							{
								gardenId: garden.id,
								workspaceId: workspace.id,
								coordinate: { x: -2, y: 8 },
								date: new Date(2026, 6, 1)
							}
						]
					}
				}
			]
		},
		ctx
	);

	const plant = await ctx.db.one(
		app.plants.where({ gardenId: garden.id, cultivarName: 'lettuce' })
	);
	if (plant) {
		await ctx.db
			.insert(app.observations, {
				gardenId: garden.id,
				type: 'plant-seed',
				entityIds: [plant.expectedLifespanId],
				date: new Date(2026, 2, 1)
			})
			.wait({ tier: 'edge' });
		await ctx.db
			.insert(app.observations, {
				gardenId: garden.id,
				type: 'plant-expiry',
				entityIds: [plant.expectedLifespanId],
				date: new Date(2026, 6, 1)
			})
			.wait({ tier: 'edge' });
	}

	return DEMO_GARDEN_SLUG;
}
