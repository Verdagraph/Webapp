import { type TreeItem } from 'melt/builders';
import { type Component } from 'svelte';

/** Describes the structure of an item in the tree. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Item<ValueT = any> = TreeItem & {
	id: string;
	/** Label for the item. */
	label: string;
	/** Description. Displayed in a popover. */
	description?: string;
	/** Icon for the item. */
	icon?: string;
	/**
	 * The value of the item.
	 * Mutually exclusive with the item having children.
	 */
	value?: ValueT;
	/** The change callback to use for changing the item. */
	onChange?: (newData: ValueT) => void;
	/**
	 * Must be defined to render an editable value for the item value.
	 * The snippet can render any type of value, becomes editable if
	 * the editable argument changes, and propogates any editing
	 * via the onChange callback.
	 */
	valueComponent?: Component<{
		value: ValueT;
		editing: boolean;
		onChange: (newData: ValueT) => void;
		errors: boolean;
	}>;
	/**
	 * The children of the item.
	 * Mutually exclusive with rendering a value for the item.
	 */
	children?: Item[];
};
