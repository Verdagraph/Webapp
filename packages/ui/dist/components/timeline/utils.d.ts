import { type DateValue } from '@internationalized/date';
declare const monthStrings: {
	1: string;
	2: string;
	3: string;
	4: string;
	5: string;
	6: string;
	7: string;
	8: string;
	9: string;
	10: string;
	11: string;
	12: string;
};
export type MonthNumber = keyof typeof monthStrings;
export declare function calendarDateToUtc(date: DateValue): Date;
export declare function calculateDeltaDays(current: DateValue, prev: DateValue): number;
export declare function getMonthString(monthNumber: MonthNumber): string;
export {};
//# sourceMappingURL=utils.d.ts.map
