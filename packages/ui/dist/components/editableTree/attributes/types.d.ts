/**
 * The props for an editable attribute.
 */
export type EditableAttributeProps<TData> = {
	/** The value of the attribute. */
	value: TData;
	/** If true, the attribute may be edited. */
	editing: boolean;
	/** The updater callback for when the attribute is updated. */
	onChange: (newData: TData) => void;
	/** If true, the current value of the field is in error. */
	errors: boolean;
};
/** The type of a value for a dynamic select attribute. */
export type DynamicSelectValue = {
	/** The ID of the currently selected item. */
	id: string;
	/** The options for the select. */
	options: {
		id: string;
		label: string;
	}[];
};
//# sourceMappingURL=types.d.ts.map
