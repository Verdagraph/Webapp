import { type TreeItem } from 'melt/builders';
import { DateValue } from '@internationalized/date';
import { type Component } from 'svelte';

/** Describes an indicator with custom popup located on a calendar item. */
export type CalendarItemInfoPoint = {
	label: string;
	date: DateValue;
	icon?: string;
	popup?: Component;
};

/** Describes a row on the calendar. */
export type CalendarItem = TreeItem & {
	id: string;
	/** Label, always visible at the top. */
	label: string;
	/** Optional description above label. */
	description?: string;
	/** Start date the item is rendered at. */
	startDate: DateValue;
	/** End date the item is rendered at. Inclusive. */
	endDate: DateValue;
	/** Colors of the item. */
	fillColor: string;
	borderColor: string;
	itemColor: string;
	/** Info points located on the item. */
	infoPoints?: CalendarItemInfoPoint[];
	/** Optional children displayed under this one as a collapsible. */
	children?: CalendarItem[];
};
