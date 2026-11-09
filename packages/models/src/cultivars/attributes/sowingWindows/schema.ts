import { Schema as S } from '@triplit/client';

/**
 * A window of time, in days relative to a frost date: negative values are before it.
 * The close may be left empty for a window which stays open (see the Planner's PlantingWindow).
 */
const SowingWindow = S.Record({
	open: S.Number(),
	close: S.Optional(S.Number())
});

/** A window measured from the last frost, for spring, and one from the first frost, for fall. */
const FrostWindows = S.Record({
	lastFrost: S.Optional(SowingWindow),
	firstFrost: S.Optional(SowingWindow)
});

/**
 * Schema. One set of windows per way of starting a plant, so the Planner can pick the
 * windows that match the origin a plant is created with.
 */
export const SowingWindowsProfile = S.Record({
	directSeed: S.Optional(FrostWindows),
	indoorStart: S.Optional(FrostWindows),
	transplantOut: S.Optional(FrostWindows)
});
