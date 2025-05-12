import { Tree } from 'melt/builders';
import { LocalStore, localStore } from '../../state/localStore.svelte';
import {} from '../timeline';
import {} from './types';
const DEFAULT_SECTION_HEIGHT = 48;
/**
 * Holds context for the calendar.
 *
 * @param timeline Reference to the timeline selection.
 * @param entityTypes Creates a calendar pane for each type of entity.
 */
export function createCalendarContext(timeline, paneSpecs) {
    /** Persisted config. */
    let config = localStore('verdagraphCalendarConfig', {
        viewPanesSelect: ['plants', 'plantingWindows'],
        sectionHeight: 100
    });
    /** Sub context. */
    const container = createCalendarContainerContext(timeline, config);
    /**
     * Stores each of the panes in its own key.
     */
    const panes = Object.fromEntries(paneSpecs.map((pane) => [pane.entityType, createCalendarPaneContext(pane)]));
    /**
     * Returns the selected entity IDs.
     * @param entityType The type of entity to return the selection for.
     * @returns The selected entity IDs.
     */
    function getPane(entityType) {
        return panes[entityType];
    }
    return {
        /* Getters. */
        get config() {
            return config;
        },
        getPane,
        container,
        timeline,
        /** Setters. */
        set config(newVal) {
            if (newVal.value.viewPanesSelect.length <= 1) {
                return;
            }
            config = newVal;
        }
    };
}
/**
 * Holds context for the calendar container characteristics.
 *
 * @param timeline Reference to the timeline selection.
 * @param config Reference to the configuration store.
 */
export function createCalendarContainerContext(timeline, config) {
    /** Calendar width in pixels. */
    let width = $state(0);
    /** The number of days in the selected range. */
    const numSections = $derived(timeline.sliderValue[2] - timeline.sliderValue[0]);
    /** The height of the sections in the calendar. */
    const sectionHeight = $derived(DEFAULT_SECTION_HEIGHT * (config.value.sectionHeight / 100));
    /** Array representing the sections as they need to be rendered as ticks on the calendar. */
    const sections = $derived(Array.from({ length: numSections + 1 }, (_, index) => index));
    return {
        /* Getters. */
        get width() {
            return width;
        },
        get numSections() {
            return numSections;
        },
        get sectionHeight() {
            return sectionHeight;
        },
        get sections() {
            return sections;
        },
        /** Setters. */
        set width(newVal) {
            width = newVal;
        }
    };
}
/**
 * Holds context for each calendar pane.
 *
 * @param paneId The ID of the pane in the context.
 */
export function createCalendarPaneContext(spec) {
    let height = $state(0);
    /** The Melt-UI builder. */
    const tree = new Tree({
        items: spec.items,
        expandOnClick: true,
        multiple: true
        //onSelectedChange: onSelectedChangeHandler
    });
    return {
        /** Getters. */
        get height() {
            return height;
        },
        tree,
        /** Setters. */
        set height(newVal) {
            height = newVal;
        }
    };
}
