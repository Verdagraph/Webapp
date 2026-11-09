import { Schema as S } from '@triplit/client';
import { z } from 'zod';

import * as AnnualLifeCycle from './annualLifeCycle/index.js';
import * as Classification from './classification/index.js';
import * as Color from './color/index.js';
import * as Companions from './companions/index.js';
import * as Ecology from './ecology/index.js';
import * as Flowering from './flowering/index.js';
import * as ExpectedGeometry from './geometry/index.js';
import * as Germination from './germination/index.js';
import * as Harvest from './harvest/index.js';
import * as Interplanting from './interplanting/index.js';
import * as Origin from './origin/index.js';
import * as Resistance from './resistance/index.js';
import * as Seed from './seed/index.js';
import * as Size from './size/index.js';
import * as Soil from './soil/index.js';
import * as Sowing from './sowing/index.js';
import * as SowingWindows from './sowingWindows/index.js';
import * as WebResources from './webResources/index.js';

export * from './convert.js';
export * from './range.js';

export const attributesSchemas = {
	...AnnualLifeCycle.fields,
	...Color,
	...ExpectedGeometry.fields,
	...Origin.fields,
	...Sowing.fields,
	...SowingWindows.fields,
	...Interplanting.fields,
	...Germination.fields,
	...Soil.fields,
	...Seed.fields,
	...Classification.fields,
	...Size.fields,
	...Ecology.fields,
	...Companions.fields,
	...Resistance.fields,
	...Harvest.fields,
	...Flowering.fields,
	...WebResources.fields
};

export const CultivarAttributes = S.Record({
	annualLifeCycle: S.Optional(AnnualLifeCycle.AnnualLifeCycleProfile),
	origin: S.Optional(Origin.OriginProfile),
	sowingWindows: S.Optional(SowingWindows.SowingWindowsProfile),
	sowing: S.Optional(Sowing.SowingProfile),
	interplanting: S.Optional(Interplanting.InterplantingProfile),
	germination: S.Optional(Germination.GerminationProfile),
	soil: S.Optional(Soil.SoilProfile),
	seed: S.Optional(Seed.SeedProfile),
	classification: S.Optional(Classification.ClassificationProfile),
	size: S.Optional(Size.SizeProfile),
	ecology: S.Optional(Ecology.EcologyProfile),
	companions: S.Optional(Companions.CompanionsProfile),
	resistance: S.Optional(Resistance.ResistanceProfile),
	harvest: S.Optional(Harvest.HarvestProfile),
	flowering: S.Optional(Flowering.FloweringProfile),
	color: S.Optional(Color.ColorProfile),
	expectedGeometry: S.Optional(ExpectedGeometry.ExpectedGeometryProfile),
	webResources: S.Optional(WebResources.WebResourceProfile)
});

export const CultivarAttributesUpdateCommandSchema = z
	.object({
		annualLifeCycle: AnnualLifeCycle.AnnualLifecycleUpdateCommandSchema.optional(),
		origin: Origin.OriginUpdateCommandSchema.optional(),
		sowingWindows: SowingWindows.SowingWindowsUpdateCommandSchema.optional(),
		sowing: Sowing.SowingUpdateCommandSchema.optional(),
		interplanting: Interplanting.InterplantingUpdateCommandSchema.optional(),
		germination: Germination.GerminationUpdateCommandSchema.optional(),
		soil: Soil.SoilUpdateCommandSchema.optional(),
		seed: Seed.SeedUpdateCommandSchema.optional(),
		classification: Classification.ClassificationUpdateCommandSchema.optional(),
		size: Size.SizeUpdateCommandSchema.optional(),
		ecology: Ecology.EcologyUpdateCommandSchema.optional(),
		companions: Companions.CompanionsUpdateCommandSchema.optional(),
		resistance: Resistance.ResistanceUpdateCommandSchema.optional(),
		harvest: Harvest.HarvestUpdateCommandSchema.optional(),
		flowering: Flowering.FloweringUpdateCommandSchema.optional(),
		color: Color.ColorUpdateCommandSchema.optional(),
		expectedGeometry: ExpectedGeometry.ExpectedGeometryUpdateCommandSchema.optional(),
		webResources: WebResources.WebResourceUpdateCommandSchema.optional()
	})
	.describe('Contains all cultivar attributes');
export type CultivarAttributesUpdateCommand = z.infer<
	typeof CultivarAttributesUpdateCommandSchema
>;
