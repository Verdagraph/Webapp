import { z } from 'zod';
import { CultivarCollectionVisibilityEnum } from './schema';

/** Field specifications. */
export const cultivarFields = {
	cultivarNames: z
		.array(
			z
				.string()
				.trim()
				.min(3, 'Must be at least 3 characters.')
				.max(30, 'May be at most 30 characters.')
				.regex(
					/^[0-9A-Za-z _-]+$/,
					'Must contain only alphanumeric characters, spaces, hyphens, and underscores.'
				)
				.describe(
					'A common name of this plant species. \
                Must be between 3 and 30 characters long and contain \
                only alphanumeric characters, spaces, hyphens, and underscores.'
				)
		)
		.min(1, 'Must contain at least 1 name.')
		.max(10, 'May contain at most 10 names.')
		.describe(
			'A set of common names associated with this plant species. \
            Each name must be between 3 and 30 characters long and contain \
            only alphanumeric characters, spaces, hyphens, and underscores. \
            A maximum of 10 names are supported.'
		),

	cultivarAbbreviation: z
		.string()
		.trim()
		.min(1, 'Must be at least 1 character.')
		.max(6, 'May be at most 6 characters.')
		.regex(/^[0-9A-Za-z]+$/, 'Must contain only alphanumeric characters.')
		.describe(
			'A very short abbreviation for this plant species. \
            Must be between 1 and 6 characters long and contain only alphanumeric characters.'
		),

	cultivarScientificName: z
		.string()
		.trim()
		.max(60, 'May be at most 60 characters.')
		.describe(
			'The scientific name of this plant species. May be at most 60 characters.'
		),

	cultivarDescription: z
		.string()
		.trim()
		.max(1400, 'May be at most 1400 characters.')
		.describe('A description of this plant species. May be at most 1400 characters.'),

	cultivarCollectionName: z
		.string()
		.trim()
		.min(3, 'Must be at least 3 characters.')
		.max(50, 'May be at most 50 characters.')
		.regex(
			/^[0-9A-Za-z _-]+$/,
			'Must contain only alphanumeric characters, spaces, hyphens, and underscores.'
		)
		.describe(
			'The name of the collection. Must be between 3 and 50 characters long and contain \
            only alphanumeric characters, spaces, hyphens, and underscores.'
		),

	cultivarCollectionDescription: z
		.string()
		.trim()
		.max(1400, 'May be at most 1400 characters.')
		.describe('The description of the collection. Must be at most 1400 characters.'),

	cultivarCollectionVisibility: z.enum(CultivarCollectionVisibilityEnum).describe(
		'Public collections may be viewed by anyone and are publicly searchable. \
            Unlisted collections may be viewed by anyone with the link. \
            Private collections may only be accessed by the creator or members of the associated garden.'
	),

	cultivarCollectionTags: z
		.array(
			z
				.string()
				.trim()
				.max(150, 'Must be at most 150 characters.')
				.regex(
					/^[0-9A-Za-z ]+$/,
					'Must contain only alphanumeric characters and spaces.'
				)
				.describe(
					'A metadata tag. Must be at most 150 characters and contain only alphanumeric characters and spaces.'
				)
		)
		.max(150, 'Must contain at most 150 tags.')
		.describe(
			'A set of metadata tags. Each tag must be at most 150 characters long and contain only alphanumeric characters and spaces.'
		)
};

/**
 * Command to create a new cultivar.
 */
export const CultivarCreateCommand = z.object({
	collectionId: z.string(),
	names: cultivarFields.cultivarNames,
	abbreviation: cultivarFields.cultivarAbbreviation,
	scientificName: cultivarFields.cultivarScientificName.optional(),
	description: cultivarFields.cultivarDescription.optional(),
	parentId: z.string().optional()
});

/**
 * Command to create a new cultivar collection.
 */
export const CultivarCollectionCreateCommand = z
	.object({
		name: cultivarFields.cultivarCollectionName,
		visibility: cultivarFields.cultivarCollectionVisibility.default('HIDDEN'),
		description: cultivarFields.cultivarCollectionDescription.optional(),
		tags: cultivarFields.cultivarCollectionTags.default([]),
		parentId: z.string().optional(),
		gardenId: z.string().optional(),
		userId: z.string().optional()
	})
	.refine((data) => data.gardenId && data.parentId, {
		message: 'A cultivar collection must be connected to a garden or a user..',
		path: ['gardenId', 'userId']
	});
