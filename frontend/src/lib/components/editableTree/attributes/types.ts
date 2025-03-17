export type EditableAttributeProps<TData> = {
	value: TData;
	editing: boolean;
	onChange: (changeOver: boolean, newData: TData) => void;
	errors: boolean;
};
