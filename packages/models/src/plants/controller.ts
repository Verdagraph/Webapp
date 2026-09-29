import { type ControllerContext } from '../controller.js';
import { AppError } from '../errors.js';
import { geometryCreate, historyGetRange } from '../workspaces/index.js';
import {
	type DraftBucket,
	type DraftBucketCreateCommand,
	type LifespanUpdateCommand,
	type PlantUpdateCommand,
	type PlantsCreateCommand
} from './index.js';

export class PlantController {
	constructor(private ctx: ControllerContext) {}

	async #createSingle(data: PlantsCreateCommand) {
		/** Retrieve client and authorize. */
		const { garden } = await this.ctx.requireRole(data.gardenId, 'PlantsCreate');

		await this.ctx.triplit.transact(async (transaction) => {
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

	create = async (data: PlantsCreateCommand) => {
		switch (data.mode) {
			case 'SINGLE':
				return this.#createSingle(data);
			case 'GROUP':
				break;
			case 'PATTERN':
				break;
			case 'COMBINED':
				break;
			default:
				break;
		}
	};

	/** Creates a draft bucket to stage plants into. */
	draftBucketCreate = async (data: DraftBucketCreateCommand): Promise<DraftBucket> => {
		const { client } = await this.ctx.requireRole(data.gardenId, 'DraftBucketCreate');

		return await this.ctx.triplit.insert('draftBuckets', {
			gardenId: data.gardenId,
			name: data.name,
			creatorId: client.profile.id,
			committed: false
		});
	};

	/**
	 * Accepts a draft bucket's plan. Its plants are unchanged and keep referencing
	 * the bucket - this only flips `committed`, which is enough for official reads
	 * to stop excluding them.
	 */
	draftBucketCommit = async (id: string) => {
		const draftBucket = await this.ctx.triplit.fetchOne(
			this.ctx.triplit.query('draftBuckets').Id(id)
		);
		if (!draftBucket) {
			throw new AppError('Draft bucket does not exist.', {
				nonFormErrors: ['Failed to commit draft bucket.']
			});
		}

		await this.ctx.requireRole(draftBucket.gardenId, 'DraftBucketCommit');

		await this.ctx.triplit.update('draftBuckets', id, (draftBucket) => {
			draftBucket.committed = true;
		});
	};

	/** Discards a draft bucket's plan, deleting it along with every plant staged in it. */
	draftBucketDiscard = async (id: string) => {
		const draftBucket = await this.ctx.triplit.fetchOne(
			this.ctx.triplit.query('draftBuckets').Id(id)
		);
		if (!draftBucket) {
			throw new AppError('Draft bucket does not exist.', {
				nonFormErrors: ['Failed to discard draft bucket.']
			});
		}

		await this.ctx.requireRole(draftBucket.gardenId, 'DraftBucketDiscard');

		const draftPlantsQuery = this.ctx.triplit
			.query('plants')
			.Where('draftBucketId', '=', id);
		await this.ctx.triplit.transact(async (transaction) => {
			const draftPlants = await transaction.fetch(draftPlantsQuery);
			for (const plant of draftPlants) {
				await transaction.delete('plants', plant.id);
			}
			await transaction.delete('draftBuckets', id);
		});
	};

	/** Updates a plant. */
	update = async (id: string, data: PlantUpdateCommand) => {
		const plant = await this.ctx.triplit.fetchOne(
			this.ctx.triplit.query('plants').Id(id)
		);
		if (!plant) {
			throw new AppError('Plant does not exist.', {
				nonFormErrors: ['Failed to update plant.']
			});
		}

		await this.ctx.requireRole(plant.gardenId, 'PlantUpdate');

		await this.ctx.triplit.update('plants', id, (plant) => {
			if (data.cultivarName) {
				plant.cultivarName = data.cultivarName;
			}
			if (data.quantity) {
				plant.quantity = data.quantity;
			}
		});
	};

	/** Updates a lifespan. */
	lifespanUpdate = async (id: string, data: LifespanUpdateCommand) => {
		const lifespan = await this.ctx.triplit.fetchOne(
			this.ctx.triplit.query('lifespans').Id(id)
		);
		if (!lifespan) {
			throw new AppError('Lifespan does not exist.', {
				nonFormErrors: ['Failed to update lifespan.']
			});
		}

		await this.ctx.requireRole(lifespan.gardenId, 'PlantUpdate');

		await this.ctx.triplit.update('lifespans', id, (lifespan) => {
			if (data.origin) {
				lifespan.origin = data.origin;
			}
		});
	};
}
