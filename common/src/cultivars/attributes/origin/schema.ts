import { Schema as S } from '@triplit/client';
import { z } from 'zod';

/** Schema. */
export const OriginProfile = S.Record({
	transplantable: S.Optional(S.Boolean())
});

/** Field specifications. */
export const fields = {
	transplantable: z.boolean().describe(
		"Defines whether a plant may be started as a seed in one location and transplanted to another. \
		Some plants, such as carrots, don't tolerate transplants, and so must be started directly."
	)
};

/** Update command. */
export const OriginUpdateCommand = z
	.object({
		transplantable: fields.transplantable.optional()
	})
	.describe('The origin refers to the method used to create plants.');
