import { type ControllerContext } from '../controller.js';
import { AppError } from '../errors.js';
import { geometryCreate } from '../workspaces/controller.js';
import { historyGetRange } from '../workspaces/utils.js';
import {
	type DraftBucketCreateCommand,
	type LifespanUpdateCommand,
	type PlantUpdateCommand,
	type PlantsCreateCommand
} from './commands.js';
import { type DraftBucket } from './schema.js';

async function plantsCreateSingle(data: PlantsCreateCommand, ctx: ControllerContext) {
	const { garden } = await ctx.requireRole(data.gardenId, 'PlantsCreate');

	await ctx.db.transaction(async (tx) => {
		for (const plantData of data.plants) {
			/** Persist the expected geometry history. */
			const geometryIds: string[] = [];
			for (const geometryData of plantData.geometryHistory.geometries) {
				const geometry = geometryCreate(garden.id, geometryData, ctx, tx);
				geometryIds.push(geometry.id);
			}
			const geometryHistory = tx.insert(ctx.jazz.geometryHistories, {
				gardenId: garden.id,
				geometryIds
			});

			/** Persist the expected location history. */
			const locationIds: string[] = [];
			const workspaceIds: string[] = [];
			for (const locationData of plantData.locationHistory.locations) {
				const location = tx.insert(ctx.jazz.locations, {
					gardenId: garden.id,
					workspaceId: locationData.workspaceId,
					x: locationData.coordinate.x,
					y: locationData.coordinate.y,
					date: locationData.date
				});
				locationIds.push(location.id);
				workspaceIds.push(locationData.workspaceId);
			}
			const locationHistory = tx.insert(ctx.jazz.locationHistories, {
				gardenId: garden.id,
				locationIds,
				workspaceIds
			});

			/** Bound the plant's dates by whichever geometries/locations were supplied. */
			const dateRange = historyGetRange([
				...plantData.geometryHistory.geometries,
				...plantData.locationHistory.locations
			]);
			const beginDate = dateRange?.min.date ?? new Date();
			const endDate = dateRange?.max.date ?? new Date();

			/** Persist the expected lifespan and an empty recorded lifespan. */
			const expectedLifespan = tx.insert(ctx.jazz.lifespans, {
				gardenId: garden.id,
				origin: plantData.origin,
				geometryHistoryId: geometryHistory.id,
				locationHistoryId: locationHistory.id
			});
			const recordedLifespan = tx.insert(ctx.jazz.lifespans, {
				gardenId: garden.id,
				origin: plantData.origin
			});

			/** Persist the plant, staged into its draft bucket. */
			tx.insert(ctx.jazz.plants, {
				gardenId: garden.id,
				cultivarName: plantData.cultivarName,
				cultivarAttributes: plantData.cultivarOverride,
				expectedLifespanId: expectedLifespan.id,
				recordedLifespanId: recordedLifespan.id,
				beginDate,
				endDate,
				quantity: plantData.quantity,
				draftBucketId: data.draftBucketId
			});
		}
	});
}

export async function plantsCreate(data: PlantsCreateCommand, ctx: ControllerContext) {
	switch (data.mode) {
		case 'SINGLE':
			return plantsCreateSingle(data, ctx);
		case 'GROUP':
			break;
		case 'PATTERN':
			break;
		case 'COMBINED':
			break;
		default:
			break;
	}
}

/** Creates a draft bucket to stage plants into. */
export async function draftBucketCreate(
	data: DraftBucketCreateCommand,
	ctx: ControllerContext
): Promise<DraftBucket> {
	const { client } = await ctx.requireRole(data.gardenId, 'DraftBucketCreate');

	const write = ctx.db.insert(ctx.jazz.draftBuckets, {
		gardenId: data.gardenId,
		name: data.name,
		creatorId: client.profile.id,
		committed: false
	});
	return write.wait({ tier: 'edge' });
}

/**
 * Accepts a draft bucket's plan. Its plants are unchanged and keep referencing
 * the bucket - this only flips `committed`, which is enough for official reads
 * to stop excluding them.
 */
export async function draftBucketCommit(id: string, ctx: ControllerContext) {
	const draftBucket = await ctx.db.one(ctx.jazz.draftBuckets.where({ id }));
	if (!draftBucket) {
		throw new AppError('Draft bucket does not exist.', {
			nonFormErrors: ['Failed to commit draft bucket.']
		});
	}

	await ctx.requireRoleForGardenId(draftBucket.gardenId, 'DraftBucketCommit');

	ctx.db.update(ctx.jazz.draftBuckets, id, { committed: true });
}

/** Discards a draft bucket's plan, deleting it along with every plant staged in it. */
export async function draftBucketDiscard(id: string, ctx: ControllerContext) {
	const draftBucket = await ctx.db.one(ctx.jazz.draftBuckets.where({ id }));
	if (!draftBucket) {
		throw new AppError('Draft bucket does not exist.', {
			nonFormErrors: ['Failed to discard draft bucket.']
		});
	}

	await ctx.requireRoleForGardenId(draftBucket.gardenId, 'DraftBucketDiscard');

	await ctx.db.transaction(async (tx) => {
		const draftPlants = await ctx.db.all(ctx.jazz.plants.where({ draftBucketId: id }));
		for (const plant of draftPlants) {
			tx.delete(ctx.jazz.plants, plant.id);
		}
		tx.delete(ctx.jazz.draftBuckets, id);
	});
}

/** Updates a plant. */
export async function plantUpdate(
	id: string,
	data: PlantUpdateCommand,
	ctx: ControllerContext
) {
	const plant = await ctx.db.one(ctx.jazz.plants.where({ id }));
	if (!plant) {
		throw new AppError('Plant does not exist.', {
			nonFormErrors: ['Failed to update plant.']
		});
	}

	await ctx.requireRoleForGardenId(plant.gardenId, 'PlantUpdate');

	ctx.db.update(ctx.jazz.plants, id, {
		...(data.cultivarName ? { cultivarName: data.cultivarName } : {}),
		...(data.quantity ? { quantity: data.quantity } : {})
	});
}

/** Updates a lifespan. */
export async function lifespanUpdate(
	id: string,
	data: LifespanUpdateCommand,
	ctx: ControllerContext
) {
	const lifespan = await ctx.db.one(ctx.jazz.lifespans.where({ id }));
	if (!lifespan) {
		throw new AppError('Lifespan does not exist.', {
			nonFormErrors: ['Failed to update lifespan.']
		});
	}

	await ctx.requireRoleForGardenId(lifespan.gardenId, 'PlantUpdate');

	ctx.db.update(ctx.jazz.lifespans, id, {
		...(data.origin ? { origin: data.origin } : {})
	});
}
