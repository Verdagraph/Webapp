import { type ControllerContext } from '../controller.js';
import { AppError } from '../errors.js';
import { type ObservationUpdateCommand } from '../index.js';

export class ObservationController {
	constructor(private ctx: ControllerContext) {}

	update = async (data: ObservationUpdateCommand) => {
		/** Retrieve client and authorize. */
		//await this.ctx.requireRole(gardenId, 'ObservationUpdate');

		const obs = await this.ctx.triplit.fetchOne(
			this.ctx.triplit.query('observations').Id(data.id)
		);

		/** Update the observation. */
		await this.ctx.triplit.update('observations', data.id, (observation) => {
			if (data.entityIds) {
				observation.entityIds = data.entityIds;
			}
			if (data.date) {
				observation.date = data.date;
			}
			if (data.data) {
				observation.data = data.data;
			}
		});
	};

	/** Deletes an observation. */
	delete = async (id: string) => {
		const observation = await this.ctx.triplit.fetchOne(
			this.ctx.triplit.query('observations').Id(id)
		);
		if (!observation) {
			throw new AppError('Observation does not exist.', {
				nonFormErrors: ['Failed to delete observation.']
			});
		}

		await this.ctx.triplit.delete('observations', id);
	};
}
