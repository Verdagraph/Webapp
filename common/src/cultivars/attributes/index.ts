import { Schema as S } from '@triplit/client';
import { z } from 'zod';

import * as AnnualLifeCycle from './annualLifeCycle';

export const CultivarAttributes = S.Record({
	annualLifeCycle: S.Optional(AnnualLifeCycle.profile)
});

export const CultivarAttributesUpdateCommand = z.object({
	annualLifeCycle: AnnualLifeCycle.command.optional()
});
