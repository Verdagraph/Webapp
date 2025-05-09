import { type DateValue } from '@internationalized/date';
type Props = {
	value: DateValue | undefined;
	compact?: boolean;
	minValue?: DateValue | undefined;
	maxValue?: DateValue | undefined;
	onValueChange?: (date: DateValue | undefined) => void;
	disabled?: boolean;
};
declare const DatePicker: import('svelte').Component<Props, {}, 'value'>;
type DatePicker = ReturnType<typeof DatePicker>;
export default DatePicker;
//# sourceMappingURL=DatePicker.svelte.d.ts.map
