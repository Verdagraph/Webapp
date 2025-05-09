import { type CalendarContext } from './context.svelte';
import { type TimelineSelection } from '../timeline';
type Props = {
    timeline: TimelineSelection;
    context: CalendarContext<any>;
};
declare const RangeCalendar: import("svelte").Component<Props, {}, "">;
type RangeCalendar = ReturnType<typeof RangeCalendar>;
export default RangeCalendar;
//# sourceMappingURL=RangeCalendar.svelte.d.ts.map