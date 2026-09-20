import { Schema as S } from '@triplit/client';

import { GeometryTypeEnumOptions } from '../../../workspaces/schema.js';

/** Schema. */
export const ExpectedGeometryProfile = S.Record({
	geometryType: S.Optional(S.String({ enum: GeometryTypeEnumOptions })),
	seedSize: S.Optional(S.Number()),
	seedlingSize: S.Optional(S.Number()),
	firstHarvestSize: S.Optional(S.Number()),
	lastHarvestSize: S.Optional(S.Number()),
	expirySize: S.Optional(S.Number()),
	exitDormancySize: S.Optional(S.Number()),
	enterDormancySize: S.Optional(S.Number())
});
