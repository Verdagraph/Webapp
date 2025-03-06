import { type } from 'arktype';
import { CultivarCollectionVisibilityEnum } from './schema';
import { commonFields } from '@common/commands';

/** Field specifications. */
/** Cultivars. */
export const cultivarNameSchema = type('string.trim & /^[0-9A-Za-z _-]+$/')
	.to('3 <= string <= 30')
	.describe(
		'between 3 and 30 characters and contain only letters, numbers, spaces, underscores, or hyphens'
	)
	.configure({
		details:
			'A common name of this plant species. \
                Must be between 3 and 30 characters long and contain \
                only alphanumeric characters, spaces, hyphens, and underscores.'
	});
export const cultivarNamesSchema = cultivarNameSchema
	.array()
	.atLeastLength(1)
	.atMostLength(20)
	.configure({ details: 'A set of common names associated with this plant species' });
export const cultivarAbbreviationSchema = type('string.trim & /^[0-9A-Za-z]+$/')
	.to('1 <= string <= 6')
	.describe('between 1 and 6 characters and contain only letters and numbers')
	.configure({
		details:
			'A very short abbreviation for this plant species. \
            Must be between 1 and 6 characters long and contain only alphanumeric characters.'
	});
export const cultivarScientificNameSchema = type('string.trim')
	.to('string <= 60')
	.configure({ details: 'The scientific name of this plant species.' });
export const cultivarDescriptionSchema = commonFields.description;

/** Collections. */
export const cultivarCollectionNameSchema = commonFields.name;
export const cultivarCollectionDescriptionSchema = commonFields.description;
export const cultivarCollectionVisiblitySchema = type
	.enumerated(...CultivarCollectionVisibilityEnum)
	.configure({
		details:
			'Public collections may be viewed by anyone and are publicly searchable. \
            Unlisted collections may be viewed by anyone with the link. \
            Private collections may only be accessed by the creator or members of the associated garden.'
	});
export const cultivarCollectionTagSchema = type('string.trim & /^[0-9A-Za-z ]+$/')
	.to('string <= 150')
	.describe(
		'under 150 characters and contain only letters, numbers, hyphens, and spaces'
	)
	.configure({ details: 'A metadata tag for the collection.' });
export const cultivarCollectionTagsSchema = cultivarCollectionTagSchema
	.array()
	.atMostLength(150)
	.configure({ details: 'A set of metadata tags for the collection.p' });

/** Commands. */

/**
 * Command to create a new cultivar.
 */
export const CultivarCreateCommandSchema = type({
	collectionId: 'string',
	names: cultivarNamesSchema,
	abbreviation: cultivarAbbreviationSchema,
	scientificName: cultivarScientificNameSchema.optional(),
	description: cultivarDescriptionSchema.default(''),
	parentId: type('string').optional()
});
export type CultivarCreateCommand = typeof CultivarCreateCommandSchema.infer;

/**
 * Command to create a new cultivar collection.
 */
export const CultivarCollectionCreateCommandSchema = type({
	name: cultivarCollectionNameSchema,
	visibility: cultivarCollectionVisiblitySchema.default('HIDDEN'),
	description: cultivarCollectionDescriptionSchema.default(''),
	tags: cultivarCollectionTagsSchema.default(() => []),
	parentId: type('string').optional(),
	gardenId: type('string').optional(),
	userId: type('string').optional()
}).narrow((data, ctx) => {
	if ((!data.gardenId && !data.userId) || (data.gardenId && data.userId)) {
		ctx.mustBe('A cultivar collection must be connected to one garden or one user.');
	}
	return true;
});
export type CultivarCollectionCreateCommand =
	typeof CultivarCollectionCreateCommandSchema.infer;
