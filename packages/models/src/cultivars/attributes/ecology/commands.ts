import { z } from 'zod';

import { lengthRange } from '../fields.js';
import { NutrientRoleEnumOptions, RootTypeEnumOptions } from './schema.js';

/** Field specifications. */
const rootDepthSchema = lengthRange(
	'The depth in meters the roots of a mature plant reach. Plants with different root depths can share soil.',
	30
);
const rootTypeSchema = z
	.enum(RootTypeEnumOptions)
	.describe(
		'The shape of the root system: a deep tap root, a spreading fibrous mat, a shallow system, or tubers.'
	);
const nutrientRoleSchema = z
	.enum(NutrientRoleEnumOptions)
	.describe(
		'How the plant uses soil nutrients. Heavy feeders deplete the soil, and nitrogen fixers add to it.'
	);
export const fields = { rootDepthSchema, rootTypeSchema, nutrientRoleSchema };

/** Update command. */
export const EcologyUpdateCommandSchema = z
	.object({
		rootDepth: rootDepthSchema.optional(),
		rootType: rootTypeSchema.optional(),
		nutrientRole: nutrientRoleSchema.optional()
	})
	.describe(
		'How the plant lives alongside others, used to judge how closely plants can be grown together.'
	);
export type EcologyUpdateCommand = z.infer<typeof EcologyUpdateCommandSchema>;
