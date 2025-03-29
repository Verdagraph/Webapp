import { Schema as S } from '@triplit/client';

/** Schema. */
export const AnnualLifeCycleProfile = S.Record({
	sowToGerm: S.Optional(S.Number()),
	germToTransplant: S.Optional(S.Number()),
	germToFirstHarvest: S.Optional(S.Number()),
	firstToLastHarvest: S.Optional(S.Number())
});
