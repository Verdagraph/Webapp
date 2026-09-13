import { AppError } from '../errors.js';
import { ControllerContext } from '../index.js';
import { geometryCreate, historyGetRange } from '../workspaces/index.js';
import {
	type DraftBucket,
	type DraftBucketCreateCommand,
	type LifespanUpdateCommand,
	type PlantUpdateCommand,
	type PlantsCreateCommand
} from './index.js';

async function plantsCreateSingle(data: PlantsCreateCommand, ctx: ControllerContext) {
	/** Retrieve client and authorize. */
	const { garden } = await ctx.requireRole(data.gardenId, 'PlantsCreate');

	await ctx.triplit.transact(async (transaction) => {
		for (const plantData of data.plants) {
			/** Persist the expected geometry history. */
			const geometryIds = new Set<string>();
			for (const geometryData of plantData.geometryHistory.geometries) {
				const geometry = await geometryCreate(garden.id, geometryData, transaction);
				geometryIds.add(geometry.id);
			}
			const geometryHistory = await transaction.insert('geometryHistories', {
				gardenId: garden.id,
				geometryIds
			});

			/** Persist the expected location history. */
			const locationIds = new Set<string>();
			const workspaceIds = new Set<string>();
			for (const locationData of plantData.locationHistory.locations) {
				const location = await transaction.insert('locations', {
					gardenId: garden.id,
					workspaceId: locationData.workspaceId,
					x: locationData.coordinate.x,
					y: locationData.coordinate.y,
					date: locationData.date
				});
				locationIds.add(location.id);
				workspaceIds.add(locationData.workspaceId);
			}
			const locationHistory = await transaction.insert('locationHistories', {
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
			const expectedLifespan = await transaction.insert('lifespans', {
				gardenId: garden.id,
				origin: plantData.origin,
				geometryHistoryId: geometryHistory.id,
				locationHistoryId: locationHistory.id
			});
			const recordedLifespan = await transaction.insert('lifespans', {
				gardenId: garden.id,
				origin: plantData.origin
			});

			/** Persist the plant, staged into its draft bucket. */
			await transaction.insert('plants', {
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

	return await ctx.triplit.insert('draftBuckets', {
		gardenId: data.gardenId,
		name: data.name,
		creatorId: client.profile.id,
		committed: false
	});
}

/**
 * Accepts a draft bucket's plan. Its plants are unchanged and keep referencing
 * the bucket - this only flips `committed`, which is enough for official reads
 * to stop excluding them.
 */
export async function draftBucketCommit(id: string, ctx: ControllerContext) {
	const draftBucket = await ctx.triplit.fetchOne(ctx.triplit.query('draftBuckets').Id(id));
	if (!draftBucket) {
		throw new AppError('Draft bucket does not exist.', {
			nonFormErrors: ['Failed to commit draft bucket.']
		});
	}

	await ctx.requireRole(draftBucket.gardenId, 'DraftBucketCommit');

	await ctx.triplit.update('draftBuckets', id, (draftBucket) => {
		draftBucket.committed = true;
	});
}

/** Discards a draft bucket's plan, deleting it along with every plant staged in it. */
export async function draftBucketDiscard(id: string, ctx: ControllerContext) {
	const draftBucket = await ctx.triplit.fetchOne(ctx.triplit.query('draftBuckets').Id(id));
	if (!draftBucket) {
		throw new AppError('Draft bucket does not exist.', {
			nonFormErrors: ['Failed to discard draft bucket.']
		});
	}

	await ctx.requireRole(draftBucket.gardenId, 'DraftBucketDiscard');

	const draftPlantsQuery = ctx.triplit.query('plants').Where('draftBucketId', '=', id);
	await ctx.triplit.transact(async (transaction) => {
		const draftPlants = await transaction.fetch(draftPlantsQuery);
		for (const plant of draftPlants) {
			await transaction.delete('plants', plant.id);
		}
		await transaction.delete('draftBuckets', id);
	});
}

/** Updates a plant. */
export async function plantUpdate(
	id: string,
	data: PlantUpdateCommand,
	ctx: ControllerContext
) {
	const plant = await ctx.triplit.fetchOne(ctx.triplit.query('plants').Id(id));
	if (!plant) {
		throw new AppError('Plant does not exist.', {
			nonFormErrors: ['Failed to update plant.']
		});
	}

	await ctx.requireRole(plant.gardenId, 'PlantUpdate');

	await ctx.triplit.update('plants', id, (plant) => {
		if (data.cultivarName) {
			plant.cultivarName = data.cultivarName;
		}
		if (data.quantity) {
			plant.quantity = data.quantity;
		}
	});
}

/** Updates a lifespan. */
export async function lifespanUpdate(
	id: string,
	data: LifespanUpdateCommand,
	ctx: ControllerContext
) {
	const lifespan = await ctx.triplit.fetchOne(ctx.triplit.query('lifespans').Id(id));
	if (!lifespan) {
		throw new AppError('Lifespan does not exist.', {
			nonFormErrors: ['Failed to update lifespan.']
		});
	}

	await ctx.requireRole(lifespan.gardenId, 'PlantUpdate');

	await ctx.triplit.update('lifespans', id, (lifespan) => {
		if (data.origin) {
			lifespan.origin = data.origin;
		}
	});
}
