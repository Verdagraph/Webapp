import { Resizable } from '../../core';
/** Verdagraph view config persisted to local storage. */
export type VerdagraphViewSettings = {
    /** Whether the tree pane is open. */
    treeEnabled: boolean;
    /** Whether the calendar pane is open. */
    calendarEnabled: boolean;
    /** Whether the layout pane is open. */
    layoutEnabled: boolean;
    /** Controls the orientation between the content panes. */
    contentPaneDirection: Resizable.Direction;
};
/**
 * Holds context for the verdagraph.
 */
declare function createVerdagraphContext(): {
    treeEnabled: boolean;
    calendarEnabled: boolean;
    layoutEnabled: boolean;
    contentPaneDirection: Resizable.Direction;
    timeline: {
        readonly focus: import("@internationalized/date").DateValue;
        readonly beginSelection: import("@internationalized/date").DateValue;
        readonly endSelection: import("@internationalized/date").DateValue;
        readonly focusUtc: Date;
        readonly beginSelectionUtc: Date;
        readonly endSelectionUtc: Date;
        readonly minSliderValue: number;
        readonly maxSliderValue: number;
        readonly sliderValue: number[];
        readonly disabled: boolean;
        minSelectOffset: import("@internationalized/date").DateDuration;
        maxSelectOffset: import("@internationalized/date").DateDuration;
        reset: () => void;
        resetSliderRange: () => void;
        refocus: (newFocus: import("@internationalized/date").DateValue) => void;
        changeBeginSelection: (newBeginSelection: import("@internationalized/date").DateValue) => void;
        changeEndSelection: (newEndSelection: import("@internationalized/date").DateValue) => void;
        translate: (translation: import("@internationalized/date").DateDuration) => void;
        sliderValueToDateValue: (sliderValue: number) => import("@internationalized/date").DateValue;
        updateSlider: (newVal: number[]) => void;
        disable: () => void;
        enable: () => void;
    };
};
export type VerdagraphContext = ReturnType<typeof createVerdagraphContext>;
export declare function setVerdagraphContext(): {
    treeEnabled: boolean;
    calendarEnabled: boolean;
    layoutEnabled: boolean;
    contentPaneDirection: Resizable.Direction;
    timeline: {
        readonly focus: import("@internationalized/date").DateValue;
        readonly beginSelection: import("@internationalized/date").DateValue;
        readonly endSelection: import("@internationalized/date").DateValue;
        readonly focusUtc: Date;
        readonly beginSelectionUtc: Date;
        readonly endSelectionUtc: Date;
        readonly minSliderValue: number;
        readonly maxSliderValue: number;
        readonly sliderValue: number[];
        readonly disabled: boolean;
        minSelectOffset: import("@internationalized/date").DateDuration;
        maxSelectOffset: import("@internationalized/date").DateDuration;
        reset: () => void;
        resetSliderRange: () => void;
        refocus: (newFocus: import("@internationalized/date").DateValue) => void;
        changeBeginSelection: (newBeginSelection: import("@internationalized/date").DateValue) => void;
        changeEndSelection: (newEndSelection: import("@internationalized/date").DateValue) => void;
        translate: (translation: import("@internationalized/date").DateDuration) => void;
        sliderValueToDateValue: (sliderValue: number) => import("@internationalized/date").DateValue;
        updateSlider: (newVal: number[]) => void;
        disable: () => void;
        enable: () => void;
    };
};
export declare function getVerdagraphContext(): {
    treeEnabled: boolean;
    calendarEnabled: boolean;
    layoutEnabled: boolean;
    contentPaneDirection: Resizable.Direction;
    timeline: {
        readonly focus: import("@internationalized/date").DateValue;
        readonly beginSelection: import("@internationalized/date").DateValue;
        readonly endSelection: import("@internationalized/date").DateValue;
        readonly focusUtc: Date;
        readonly beginSelectionUtc: Date;
        readonly endSelectionUtc: Date;
        readonly minSliderValue: number;
        readonly maxSliderValue: number;
        readonly sliderValue: number[];
        readonly disabled: boolean;
        minSelectOffset: import("@internationalized/date").DateDuration;
        maxSelectOffset: import("@internationalized/date").DateDuration;
        reset: () => void;
        resetSliderRange: () => void;
        refocus: (newFocus: import("@internationalized/date").DateValue) => void;
        changeBeginSelection: (newBeginSelection: import("@internationalized/date").DateValue) => void;
        changeEndSelection: (newEndSelection: import("@internationalized/date").DateValue) => void;
        translate: (translation: import("@internationalized/date").DateDuration) => void;
        sliderValueToDateValue: (sliderValue: number) => import("@internationalized/date").DateValue;
        updateSlider: (newVal: number[]) => void;
        disable: () => void;
        enable: () => void;
    };
};
export {};
//# sourceMappingURL=verdagraphContext.svelte.d.ts.map