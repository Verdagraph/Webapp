import { localStore, LocalStore } from '$state/localStore.svelte';
import { CalendarItem } from './types';
import { type TimelineSelection } from '$components/timeline';

/** Calendar config persisted to local storage. */
export type ViewPanesOptions = 'plants' | 'plantingWindows' | 'actions';
export type CalendarConfig = {
	viewPanesSelect: ViewPanesOptions[];
	/** Height of the calendar sections in % of X pixels. */
	sectionHeight: number;
};

const DEFAULT_SECTION_HEIGHT = 30;

/**
 * Holds context for the calendar.
 */
export function createCalendarContext<const EntityTypes extends readonly string[]>(
	timeline: TimelineSelection,
	entityTypes: EntityTypes
) {
	type EntityType = EntityTypes[number];

	/** Persisted config. */
	let config = localStore<CalendarConfig>('verdagraphCalendarConfig', {
		viewPanesSelect: ['plants', 'plantingWindows'],
		sectionHeight: 100
	});

	$inspect(config.value);

	const container = createCalendarContainerContext(timeline, config);

	/**
	 * Stores each of the panes in its own key.
	 */
	const panes: Record<EntityType, CalendarPaneContext> = Object.fromEntries(
		entityTypes.map((entity) => [entity, createCalendarPaneContext(entity, container)])
	) as Record<EntityType, CalendarPaneContext>;

	/**
	 * Returns the selected entity IDs.
	 * @param entityType The type of entity to return the selection for.
	 * @returns The selected entity IDs.
	 */
	function getPane(entityType: EntityType): CalendarPaneContext {
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
export type CalendarContext<EntityTypes extends readonly string[]> = ReturnType<
	typeof createCalendarContext<EntityTypes>
>;

/**
 * Holds context for the calendar container characteristics.
 */
export function createCalendarContainerContext(
	timeline: TimelineSelection,
	config: LocalStore<CalendarConfig>
) {
	/** Calendar width in pixels. */
	let width: number = $state(0);
	let numSections = $derived(timeline.sliderValue[2] - timeline.sliderValue[0]);
	let sectionWidth = $derived(width / numSections);
	let sectionHeight = $derived(
		DEFAULT_SECTION_HEIGHT * (config.value.sectionHeight / 100)
	);
	let sections = $derived(Array.from({ length: numSections + 1 }, (_, index) => index));

	return {
		/* Getters. */
		get width() {
			return width;
		},
		get numSections() {
			return numSections;
		},
		get sectionWidth() {
			return sectionWidth;
		},
		get sectionHeight() {
			return sectionHeight;
		},
		get sections() {
			return sections;
		},

		set width(newVal) {
			width = newVal;
		}
	};
}
export type CalendarContainerContext = ReturnType<
	typeof createCalendarContainerContext
>;

/**
 * Holds context for the verdagraph.
 */
export function createCalendarPaneContext(
	paneId: string,
	container: CalendarContainerContext
) {
	let height = $state(0);

	/** Items. */
	let items: CalendarItem[] = $state([]);
	let expanded: string[] = $state([]);

	return {
		/* Getters. */
		get items() {
			return items;
		},
		get height() {
			return height;
		},
		set items(newVal) {
			items = newVal;
		},
		set height(newVal) {
			height = newVal;
		}
	};
}
export type CalendarPaneContext = ReturnType<typeof createCalendarPaneContext>;
