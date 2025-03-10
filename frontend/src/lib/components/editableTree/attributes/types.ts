export type EditableAttributeProps = {
	value: any;
	editing: boolean;
	onChange: (changeOver: boolean, newData: any) => void;
	errors: boolean;
};
