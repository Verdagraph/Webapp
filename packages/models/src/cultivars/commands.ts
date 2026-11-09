import { z } from 'zod';

import { commonFields } from '../commands.js';
import {
	CultivarAttributesUpdateCommandSchema,
	attributesSchemas
} from './attributes/index.js';
import { codePointLength } from './names.js';
import {
	CultivarCategoryEnumOptions,
	CultivarCollectionVisibilityEnumOptions
} from './schema.js';

/** Field specifications. */
/**
 * Letters and digits of any script, combining marks, spaces, apostrophes, underscores and hyphens.
 * Control, zero-width and direction-changing characters are not letters, so they are rejected,
 * which keeps look-alike duplicates out.
 */
const CULTIVAR_NAME_PATTERN = /^[\p{L}\p{M}\p{N} '\u2019_-]+$/u;
const MAX_CULTIVAR_NAME_LENGTH = 40;
const cultivarNameSchema = z
	.string()
	.trim()
	.refine((name) => codePointLength(name) >= 3, 'Must be at least 3 characters.')
	.refine(
		(name) => codePointLength(name) <= MAX_CULTIVAR_NAME_LENGTH,
		`May be at most ${MAX_CULTIVAR_NAME_LENGTH} characters.`
	)
	.refine(
		(name) => CULTIVAR_NAME_PATTERN.test(name),
		'Must contain only letters, numbers, spaces, apostrophes, hyphens, and underscores.'
	)
	.transform((name) => name.normalize('NFC'))
	.describe('The primary name of this plant. Plants are matched to cultivars by name.');
const cultivarNamesSchema = z
	.array(cultivarNameSchema)
	.max(10, 'May contain at most 10 other names.')
	.describe(
		'Other names this plant is known by, for example Courgette for Zucchini. \
            Names match loosely: case, accents, hyphens and spacing are ignored. \
            Each name must be unique among the names in the collection.'
	);
const cultivarCategorySchema = z
	.enum(CultivarCategoryEnumOptions)
	.describe(
		'The kind of plant. Varieties take the category of the crop they belong to unless they set their own.'
	);
const cultivarTagSchema = z
	.string()
	.trim()
	.toLowerCase()
	.min(2, 'Must be at least 2 characters.')
	.max(40, 'May be at most 40 characters.')
	.regex(
		/^[\p{L}\p{N}][\p{L}\p{N} -]*$/u,
		'Must contain only letters, numbers, spaces and hyphens.'
	)
	.describe('A label such as open-pollinated or cut-flower.');
const cultivarTagsSchema = z
	.array(cultivarTagSchema)
	.max(60, 'May contain at most 60 tags.')
	.describe(
		'Labels describing the cultivar, for searching and filtering. A variety also has the tags of the crop it belongs to.'
	);
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
	cultivarCategorySchema,
	cultivarTagSchema,
	cultivarTagsSchema,
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
	names: cultivarNamesSchema.default([]),
	category: cultivarCategorySchema.optional(),
	tags: cultivarTagsSchema.default([]),
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
	names: cultivarNamesSchema.optional(),
	category: cultivarCategorySchema.nullable().optional(),
	tags: cultivarTagsSchema.optional(),
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
