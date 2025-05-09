import { type DateValue, type DateDuration } from '@internationalized/date';
export declare function createTimelineSelection(): {
	readonly focus: DateValue;
	readonly beginSelection: DateValue;
	readonly endSelection: DateValue;
	readonly focusUtc: Date;
	readonly beginSelectionUtc: Date;
	readonly endSelectionUtc: Date;
	readonly minSliderValue: number;
	readonly maxSliderValue: number;
	readonly sliderValue: number[];
	readonly disabled: boolean;
	minSelectOffset: DateDuration;
	maxSelectOffset: DateDuration;
	reset: () => void;
	resetSliderRange: () => void;
	refocus: (newFocus: DateValue) => void;
	changeBeginSelection: (newBeginSelection: DateValue) => void;
	changeEndSelection: (newEndSelection: DateValue) => void;
	translate: (translation: DateDuration) => void;
	sliderValueToDateValue: (sliderValue: number) => DateValue;
	updateSlider: (newVal: number[]) => void;
	disable: () => void;
	enable: () => void;
};
export type TimelineSelection = ReturnType<typeof createTimelineSelection>;
//# sourceMappingURL=timelineSelection.svelte.d.ts.map
