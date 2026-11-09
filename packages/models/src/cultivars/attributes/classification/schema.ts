import { Schema as S } from '@triplit/client';

export const LifecycleEnumOptions = ['ANNUAL', 'BIENNIAL', 'PERENNIAL'] as const;
export const SeasonTypeEnumOptions = ['COOL', 'WARM', 'HOT'] as const;
export const DifficultyEnumOptions = ['EASY', 'MODERATE', 'CHALLENGING'] as const;
export const GrowthHabitEnumOptions = [
	'DETERMINATE',
	'INDETERMINATE',
	'BUSH',
	'POLE',
	'VINE'
] as const;

/** Schema. */
export const ClassificationProfile = S.Record({
	family: S.Optional(S.String()),
	lifecycle: S.Optional(S.String({ enum: [...LifecycleEnumOptions] })),
	seasonType: S.Optional(S.String({ enum: [...SeasonTypeEnumOptions] })),
	hardinessZone: S.Optional(S.Number()),
	difficulty: S.Optional(S.String({ enum: [...DifficultyEnumOptions] })),
	habit: S.Optional(S.String({ enum: [...GrowthHabitEnumOptions] }))
});
