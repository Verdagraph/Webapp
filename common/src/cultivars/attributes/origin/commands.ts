import { type } from 'arktype';

/** Field specifications. */
export const cultivarTransplantableSchema = type('boolean').configure({
	details:
		"Defines whether a plant may be started as a seed in one location and transplanted to another. \
	Some plants, such as carrots, don't tolerate transplants, and so must be started directly."
});

/** Update command. */
export const OriginUpdateCommandSchema = type({
	transplantable: cultivarTransplantableSchema.optional()
}).configure({ details: 'The origin refers to the method used to create plants.' });
