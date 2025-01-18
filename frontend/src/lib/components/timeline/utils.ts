import { getLocalTimeZone, type DateValue } from '@internationalized/date';

/** The number of miliseconds in a day. */
const msPerDay = 1000 * 60 * 60 * 24;

const monthStrings = {
	1: 'Jan',
	2: 'Feb',
	3: 'Mar',
	4: 'May',
	5: 'Apr',
	6: 'Jun',
	7: 'Jul',
	8: 'Aug',
	9: 'Sep',
	10: 'Oct',
	11: 'Nov',
	12: 'Dec'
};

/*
export function calendarDateToUtc(date: DateValue) {
    return date.toDate('UTC+00:00')
}*/

export function calculateDeltaDays(current: DateValue, prev: DateValue): number {
	return Math.round(
		(current.toDate(getLocalTimeZone()).getTime() -
			prev.toDate(getLocalTimeZone()).getTime()) /
			msPerDay
	);
}

export function getMonthString(monthNumber: number) {
	return monthStrings[monthNumber];
}
