import { LocalStore } from '$state/localStore.svelte';
import { CalendarItem } from './types';
import { type TimelineSelection } from '../timeline';
/** Calendar config persisted to local storage. */
export type ViewPanesOptions = 'plants' | 'plantingWindows' | 'actions';
export type CalendarConfig = {
    viewPanesSelect: ViewPanesOptions[];
    /** Height of the calendar sections in % of X pixels. */
    sectionHeight: number;
};
type CalendarPaneSpec = {
    entityType: string;
    items: () => CalendarItem[];
};
/**
 * Holds context for the calendar.
 *
 * @param timeline Reference to the timeline selection.
 * @param entityTypes Creates a calendar pane for each type of entity.
 */
export declare function createCalendarContext<const EntityTypes extends readonly string[]>(timeline: TimelineSelection, paneSpecs: CalendarPaneSpec[]): {
    config: any;
    getPane: (entityType: EntityTypes[number]) => CalendarPaneContext;
    container: {
        width: number;
        readonly numSections: number;
        readonly sectionHeight: number;
        readonly sections: number[];
    };
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
export type CalendarContext<EntityTypes extends readonly string[]> = ReturnType<typeof createCalendarContext<EntityTypes>>;
/**
 * Holds context for the calendar container characteristics.
 *
 * @param timeline Reference to the timeline selection.
 * @param config Reference to the configuration store.
 */
export declare function createCalendarContainerContext(timeline: TimelineSelection, config: LocalStore<CalendarConfig>): {
    width: number;
    readonly numSections: number;
    readonly sectionHeight: number;
    readonly sections: number[];
};
export type CalendarContainerContext = ReturnType<typeof createCalendarContainerContext>;
/**
 * Holds context for each calendar pane.
 *
 * @param paneId The ID of the pane in the context.
 */
export declare function createCalendarPaneContext(spec: CalendarPaneSpec, container: CalendarContainerContext): {
    /** Getters. */
    height: number;
    tree: any;
};
export type CalendarPaneContext = ReturnType<typeof createCalendarPaneContext>;
export {};
//# sourceMappingURL=context.svelte.d.ts.map