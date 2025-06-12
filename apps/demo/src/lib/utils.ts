/**
 * Adds a period to a date.
 */
export function addToDate(
	date: Date,
	days: number = 0,
	months: number = 0,
	years: number = 0
): Date {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + days);
	newDate.setMonth(newDate.getMonth() + months);
	newDate.setFullYear(newDate.getFullYear() + years);
	return newDate;
}
