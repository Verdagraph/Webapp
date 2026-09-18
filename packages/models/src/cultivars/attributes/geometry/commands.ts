import { z } from 'zod';

import { workspaceFields } from '../../../workspaces/index.js';

/** Field specifications. */
const sizeDescription = (stage: string) =>
	`The size of the plant's geometry at its ${stage} in meters. \
	For ellipses, this is assumed to be the diameter. \
	For rectangles, this is assumed to be a width, forming a square. \
	For polygons, this is assumed to be the radius, forming a square. \
	For lines, this is assumed to be a width, forming a square.`;

const seedSizeSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe(sizeDescription('seed stage, immediately after sowing'));
const seedlingSizeSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe(sizeDescription('seedling stage'));
const firstHarvestSizeSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe(sizeDescription('first harvest'));
const lastHarvestSizeSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe(sizeDescription('last harvest'));
const expirySizeSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe(sizeDescription('expiry point'));
const exitDormancySizeSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe(sizeDescription("exit from a perennial's dormant stage"));
const enterDormancySizeSchema = z
	.number()
	.min(0, 'May not be negative.')
	.describe(sizeDescription("entry into a perennial's dormant stage"));

export const fields = {
	seedSizeSchema,
	seedlingSizeSchema,
	firstHarvestSizeSchema,
	lastHarvestSizeSchema,
	expirySizeSchema,
	exitDormancySizeSchema,
	enterDormancySizeSchema
};

/** Update command. */
export const ExpectedGeometryUpdateCommandSchema = z
	.object({
		geometryType: workspaceFields.geometryTypeSchema,
		seedSize: seedSizeSchema,
		seedlingSize: seedlingSizeSchema,
		firstHarvestSize: firstHarvestSizeSchema,
		lastHarvestSize: lastHarvestSizeSchema,
		expirySize: expirySizeSchema,
		exitDormancySize: exitDormancySizeSchema,
		enterDormancySize: enterDormancySizeSchema
	})
	.describe(
		'Determines the default geometric history when defining new instances of a cultivar.'
	);
export type ExpectedGeometryUpdateCommand = z.infer<
	typeof ExpectedGeometryUpdateCommandSchema
>;
