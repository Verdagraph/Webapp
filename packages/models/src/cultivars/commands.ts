import { z } from 'zod';

import { commonFields } from '../commands.js';
import {
	CultivarAttributesUpdateCommandSchema,
	attributesSchemas
} from './attributes/index.js';
import { CultivarCollectionVisibilityEnumOptions } from './schema.js';

/** Field specifications. */
const cultivarNameSchema = z
	.string()
	.trim()
	.min(3, 'Must be at least 3 characters.')
	.max(30, 'May be at most 30 characters.')
	.regex(
		/^[0-9A-Za-z _-]+$/,
		'Must contain only letters, numbers, spaces, hyphens, and underscores.'
	)
	.describe('A common name of this plant species.');
const cultivarNamesSchema = z
	.array(cultivarNameSchema)
	.min(1, 'Must contain at least 1 name.')
	.max(10, 'May contain at most 10 names.')
	.describe('A set of common names associated with this plant species.');
const cultivarAbbreviationSchema = z
	.string()
	.trim()
	.min(1, 'Must be at least 1 character.')
	.max(6, 'May be at most 6 characters.')
	.regex(/^[0-9A-Za-z]+$/, 'Must contain only alphanumeric characters.')
	.describe('A very short abbreviation for this plant species.');

const cultivarScientificNameSchema = z
	.string()
	.trim()
	.max(60, 'May be at most 60 characters.')
	.describe('The scientific name of this plant species.');

const cultivarDescriptionSchema = commonFields.descriptionSchema.describe(
	'Optional description.'
);

const cultivarCollectionNameSchema = commonFields.nameSchema.describe(
	'The name of the collection.'
);

const cultivarCollectionDescriptionSchema = commonFields.descriptionSchema.describe(
	'Optional description.'
);

const cultivarCollectionVisibilitySchema = z
	.enum(CultivarCollectionVisibilityEnumOptions)
	.describe(
		'Public collections may be viewed by anyone and are publicly searchable. \
            Unlisted collections may be viewed by anyone with the link. \
            Private collections may only be accessed by the creator or members of the associated garden.'
	);

const cultivarCollectionTagSchema = z
	.string()
	.trim()
	.max(150, 'Must be at most 150 characters.')
	.regex(/^[0-9A-Za-z ]+$/, 'Must contain only alphanumeric characters and spaces.')
	.describe('A metadata tag.');

const cultivarCollectionTagsSchema = z
	.array(cultivarCollectionTagSchema)
	.max(150, 'Must contain at most 150 tags.')
	.describe('A set of metadata tags.');
export const cultivarFields = {
	cultivarNameSchema,
	cultivarNamesSchema,
	cultivarAbbreviationSchema,
	cultivarScientificNameSchema,
	cultivarDescriptionSchema,
	cultivarCollectionNameSchema,
	cultivarCollectionDescriptionSchema,
	cultivarCollectionVisibilitySchema,
	cultivarCollectionTagSchema,
	cultivarCollectionTagsSchema,
	...attributesSchemas
};

/**
 * Command to create a new cultivar.
 */
export const CultivarCreateCommandSchema = z.object({
	collectionId: z.string(),
	name: cultivarNameSchema,
	abbreviation: cultivarAbbreviationSchema,
	scientificName: cultivarScientificNameSchema.optional(),
	description: cultivarDescriptionSchema.default(''),
	parentId: z.string().optional(),
	attributes: CultivarAttributesUpdateCommandSchema.optional()
});
export type CultivarCreateCommand = z.infer<typeof CultivarCreateCommandSchema>;

/**
 * Command to update a cultivar. A null parentId removes the parent.
 * Attributes, if present, replace the stored attributes entirely.
 */
export const CultivarUpdateCommandSchema = z.object({
	name: cultivarNameSchema.optional(),
	abbreviation: cultivarAbbreviationSchema.optional(),
	scientificName: cultivarScientificNameSchema.optional(),
	description: cultivarDescriptionSchema.optional(),
	parentId: z.string().nullable().optional(),
	attributes: CultivarAttributesUpdateCommandSchema.optional()
});
export type CultivarUpdateCommand = z.infer<typeof CultivarUpdateCommandSchema>;

/**
 * Command to create a new cultivar collection.
 * Owned by the garden if one is given, otherwise by the user.
 */
export const CultivarCollectionCreateCommandSchema = z
	.object({
		name: cultivarCollectionNameSchema,
		visibility: cultivarCollectionVisibilitySchema.default('HIDDEN'),
		description: cultivarCollectionDescriptionSchema.default(''),
		tags: cultivarCollectionTagsSchema.default([]),
		parentId: z.string().optional(),
		gardenId: z.string().optional(),
		userId: z.string().optional()
	})
	.refine((data) => data.gardenId || data.userId, {
		message: 'A cultivar collection must be connected to a garden or a user.',
		path: ['gardenId']
	});
export type CultivarCollectionCreateCommand = z.infer<
	typeof CultivarCollectionCreateCommandSchema
>;

/**
 * Command to update a cultivar collection. A null parentId removes the parent.
 */
export const CultivarCollectionUpdateCommandSchema = z.object({
	name: cultivarCollectionNameSchema.optional(),
	visibility: cultivarCollectionVisibilitySchema.optional(),
	description: cultivarCollectionDescriptionSchema.optional(),
	tags: cultivarCollectionTagsSchema.optional(),
	parentId: z.string().nullable().optional()
});
export type CultivarCollectionUpdateCommand = z.infer<
	typeof CultivarCollectionUpdateCommandSchema
>;
