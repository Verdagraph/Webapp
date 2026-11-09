import { z } from 'zod';

import {
	DifficultyEnumOptions,
	GrowthHabitEnumOptions,
	LifecycleEnumOptions,
	SeasonTypeEnumOptions
} from './schema.js';

/** Field specifications. */
const familySchema = z
	.string()
	.trim()
	.max(60)
	.describe('The botanical family, for example Solanaceae. Useful for crop rotation.');
const lifecycleSchema = z
	.enum(LifecycleEnumOptions)
	.describe(
		'How long a plant lives. Annuals complete their life in one year, biennials flower in their second, and perennials live for many years.'
	);
const seasonTypeSchema = z
	.enum(SeasonTypeEnumOptions)
	.describe(
		'The temperatures the cultivar grows best in: cool season, warm season or hot season.'
	);
const hardinessZoneSchema = z
	.number()
	.int('Must be a whole number.')
	.min(0)
	.max(13)
	.describe('The coldest hardiness zone the plant survives winter in.');
const difficultySchema = z
	.enum(DifficultyEnumOptions)
	.describe('How easy the cultivar is to grow.');
const habitSchema = z
	.enum(GrowthHabitEnumOptions)
	.describe(
		'The way the plant grows, for example bush or climbing, or determinate or indeterminate for tomatoes.'
	);
export const fields = {
	familySchema,
	lifecycleSchema,
	seasonTypeSchema,
	hardinessZoneSchema,
	difficultySchema,
	habitSchema
};

/** Update command. */
export const ClassificationUpdateCommandSchema = z
	.object({
		family: familySchema.optional(),
		lifecycle: lifecycleSchema.optional(),
		seasonType: seasonTypeSchema.optional(),
		hardinessZone: hardinessZoneSchema.optional(),
		difficulty: difficultySchema.optional(),
		habit: habitSchema.optional()
	})
	.describe('Botanical and horticultural classification of the cultivar.');
export type ClassificationUpdateCommand = z.infer<
	typeof ClassificationUpdateCommandSchema
>;
