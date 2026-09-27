import { getDb, getSession } from 'jazz-tools/svelte';

import type { GeometryCreateCommand } from '@vdg-webapp/models';
import {
	type ControllerContext,
	app,
	createController,
	plantsCreate
} from '@vdg-webapp/models';

const DEMO_GARDEN_SLUG = 'garden';
const DEMO_USERNAME = 'Demo User';

/**
 * Fixed row ids for every entity this seed creates, upserted rather than
 * inserted with an auto-generated id. Every visitor logs in as the same
 * identity (see apps/demo/src/lib/data/jazz.ts) and this function has no
 * reliable single-page-load-only guard against concurrent or repeated
 * seeding: a brand new Jazz connection's very first query can return stale
 * results before its initial sync catches up, so two page loads (or the
 * same one retried) can both decide "nothing exists yet" and proceed. With
 * auto-generated ids that produced real duplicate rows (confirmed
 * empirically - 4-5x duplication after repeated testing). Fixed ids make
 * every attempt converge on the same rows instead, since Jazz enforces id
 * uniqueness natively regardless of how many callers race to write them.
 */
const ids = {
	garden: '00000000-0000-4000-8000-000000000001',
	creatorMembership: '00000000-0000-4000-8000-000000000002',
	environment: '00000000-0000-4000-8000-000000000003',
	workspace: '00000000-0000-4000-8000-000000000004',
	cultivarCollection: '00000000-0000-4000-8000-000000000005',
	cultivar: '00000000-0000-4000-8000-000000000006'
} as const;

/** Fixed ids per planting area: geometry, location, locationHistory, the area itself, and (Corner only) 6 coordinates. */
function areaIds(index: number) {
	const base = 0x100 + index * 0x10;
	return {
		geometry: fixedId(base + 1),
		location: fixedId(base + 2),
		locationHistory: fixedId(base + 3),
		plantingArea: fixedId(base + 4),
		coordinates: [5, 6, 7, 8, 9, 10].map((offset) => fixedId(base + offset))
	};
}

function fixedId(n: number): string {
	return `00000000-0000-4000-8000-${n.toString(16).padStart(12, '0')}`;
}

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
 * Builds a controller for the demo's shared Jazz session, self-provisioning
 * a public profile row (see packages/models/src/users/schema.ts) keyed by
 * this session's account id if one doesn't exist yet.
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
 * Guards against seedDemoGarden() running twice concurrently within the
 * same page (observed in dev under Vite HMR / a double onMount). Every
 * write below is also independently idempotent via fixed ids (see `ids`
 * above), since this guard alone doesn't cover separate page loads.
 */
let seedPromise: Promise<string> | null = null;

/**
 * Seeds the shared demo garden with a workspace, planting areas, a
 * cultivar collection, and a plant, using the real ported Jazz controllers
 * where the entity doesn't need a fixed id, and direct fixed-id upserts
 * (matching what those same controllers write) where it does.
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
	const client = await ctx.getClientOrError();

	await ctx.db
		.upsert(app.gardens, ids.garden, {
			slug: DEMO_GARDEN_SLUG,
			name: 'Garden',
			description: '',
			visibility: 'PUBLIC',
			creatorId: client.profile.id,
			adminIds: [client.profile.id]
		})
		.wait({ tier: 'edge' });

	await ctx.db
		.upsert(app.gardenMemberships, ids.creatorMembership, {
			gardenId: ids.garden,
			userId: client.profile.id,
			role: 'ADMIN',
			status: 'ACCEPTED',
			acceptedAt: new Date()
		})
		.wait({ tier: 'edge' });

	await ctx.db
		.upsert(app.environments, ids.environment, {
			gardenId: ids.garden,
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

	await ctx.db
		.upsert(app.workspaces, ids.workspace, {
			gardenId: ids.garden,
			name: 'Workspace',
			slug: 'workspace',
			description: ''
		})
		.wait({ tier: 'edge' });

	for (const [index, area] of plantingAreaSeeds.entries()) {
		const entityIds = areaIds(index);

		await ctx.db.transaction(async (tx) => {
			const coordinateIds: string[] = [];
			if (area.geometry.type === 'LINES') {
				for (const [pointIndex, point] of area.geometry.linesCoordinates.entries()) {
					const coordinateId = entityIds.coordinates[pointIndex];
					tx.upsert(app.coordinates, coordinateId, {
						gardenId: ids.garden,
						x: point.x,
						y: point.y
					});
					coordinateIds.push(coordinateId);
				}
			}

			tx.upsert(app.geometries, entityIds.geometry, {
				gardenId: ids.garden,
				name: area.geometry.name ?? undefined,
				type: area.geometry.type,
				date: area.geometry.date,
				scaleFactor: area.geometry.scaleFactor,
				rotation: area.geometry.rotation,
				rectangleLength: area.geometry.rectangleLength,
				rectangleWidth: area.geometry.rectangleWidth,
				polygonNumSides: area.geometry.polygonNumSides,
				polygonRadius: area.geometry.polygonRadius,
				ellipseLength: area.geometry.ellipseLength,
				ellipseWidth: area.geometry.ellipseWidth,
				linesCoordinateIds: coordinateIds,
				linesClosed: area.geometry.linesClosed
			});

			tx.upsert(app.locations, entityIds.location, {
				gardenId: ids.garden,
				workspaceId: ids.workspace,
				x: area.coordinate.x,
				y: area.coordinate.y,
				date: earlyDate
			});
			tx.upsert(app.locationHistories, entityIds.locationHistory, {
				gardenId: ids.garden,
				locationIds: [entityIds.location],
				workspaceIds: [ids.workspace]
			});

			tx.upsert(app.plantingAreas, entityIds.plantingArea, {
				gardenId: ids.garden,
				name: area.name,
				description: '',
				depth: 0,
				geometryId: entityIds.geometry,
				locationHistoryId: entityIds.locationHistory
			});
		});
	}

	await ctx.db
		.upsert(app.cultivarCollections, ids.cultivarCollection, {
			gardenId: ids.garden,
			name: 'West Coast Seeds',
			slug: 'west-coast-seeds',
			visibility: 'HIDDEN'
		})
		.wait({ tier: 'edge' });
	await ctx.db
		.upsert(app.cultivars, ids.cultivar, {
			collectionId: ids.cultivarCollection,
			gardenId: ids.garden,
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

	/**
	 * Plants aren't given fixed ids (plantsCreate's write shape is deep
	 * enough - lifespans, geometry/location histories - that replicating it
	 * manually isn't worth it for one demo plant); a plain existence check
	 * is enough to keep this idempotent instead.
	 */
	const existingPlant = await ctx.db.one(
		app.plants.where({ gardenId: ids.garden, cultivarName: 'lettuce' })
	);
	if (existingPlant) {
		return DEMO_GARDEN_SLUG;
	}

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
						gardenId: ids.garden,
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
						gardenId: ids.garden,
						locations: [
							{
								gardenId: ids.garden,
								workspaceId: ids.workspace,
								coordinate: { x: 5, y: 5 },
								date: new Date(2026, 1, 1)
							},
							{
								gardenId: ids.garden,
								workspaceId: ids.workspace,
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
		app.plants.where({ gardenId: ids.garden, cultivarName: 'lettuce' })
	);
	if (plant) {
		await ctx.db
			.insert(app.observations, {
				gardenId: ids.garden,
				type: 'plant-seed',
				entityIds: [plant.expectedLifespanId],
				date: new Date(2026, 2, 1)
			})
			.wait({ tier: 'edge' });
		await ctx.db
			.insert(app.observations, {
				gardenId: ids.garden,
				type: 'plant-expiry',
				entityIds: [plant.expectedLifespanId],
				date: new Date(2026, 6, 1)
			})
			.wait({ tier: 'edge' });
	}

	return DEMO_GARDEN_SLUG;
}
