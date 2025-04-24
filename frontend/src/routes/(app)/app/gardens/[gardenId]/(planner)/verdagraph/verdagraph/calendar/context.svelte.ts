import { localStore } from '$state/localStore.svelte';

/** Calendar config persisted to local storage. */
export type ViewPanesOptions = 'plants' | 'plantingWindows' | 'actions';
export type CalendarConfig = {
	viewPanesSelect: ViewPanesOptions[];
};

export type SortByOptions = {
	plants: 'date' | 'alphabetical';
	plantingWindows: 'date' | 'alphabetical';
	actions: 'date';
};

export type GroupByOptions = {
	plants: 'plantGroup' | 'cultivar' | 'noGroup';
	plantingWindows: 'cultivar' | 'plantingArea' | 'noGroup';
	actions: 'noGroup';
};

/**
 * Holds context for the verdagraph.
 */
export function createCalendarContext() {
	/** Persisted config. */
	let config = localStore<CalendarConfig>('verdagraphCalendarConfig', {
		viewPanesSelect: ['plants', 'plantingWindows']
	});

	/** Value of the search bar state. */
	let search = $state('');

	/** Value of the sort by select state. */
	let sortBy: SortByOptions = $state({
		plants: 'date',
		plantingWindows: 'date',
		actions: 'date'
	});

	/** Value of the group by select state. */
	let groupBy: GroupByOptions = $state({
		plants: 'plantGroup',
		plantingWindows: 'cultivar',
		actions: 'noGroup'
	});

	return {
		/* Getters. */
		get config() {
			return config;
		},

		/** Setters. */
		set config(newVal) {
			if (newVal.value.viewPanesSelect.length <= 1) {
				return;
			}
			config = newVal;
		}
	};
}
export type CalendarContext = ReturnType<typeof createCalendarContext>;
