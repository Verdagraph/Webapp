import { AppError } from '../../errors.js';
import { type ObservationUpdateCommand } from '../../observations/commands.js';
import { type ControllerContext } from '../controller.js';

export async function observationUpdate(
	data: ObservationUpdateCommand,
	ctx: ControllerContext
) {
	const observation = await ctx.db.one(ctx.jazz.observations.where({ id: data.id }));
	if (!observation) {
		throw new AppError('Observation does not exist.', {
			nonFormErrors: ['Failed to update observation.']
		});
	}

	ctx.db.update(ctx.jazz.observations, data.id, {
		...(data.entityIds ? { entityIds: [...data.entityIds] } : {}),
		...(data.date ? { date: data.date } : {}),
		...(data.data ? { data: data.data } : {})
	});
}

/** Deletes an observation. */
export async function observationDelete(id: string, ctx: ControllerContext) {
	const observation = await ctx.db.one(ctx.jazz.observations.where({ id }));
	if (!observation) {
		throw new AppError('Observation does not exist.', {
			nonFormErrors: ['Failed to delete observation.']
		});
	}

	ctx.db.delete(ctx.jazz.observations, id);
}
