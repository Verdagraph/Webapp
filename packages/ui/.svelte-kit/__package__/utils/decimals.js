/**
 * Rounds a number to the specified amount of decimal places.
 * @param num The number to round.
 * @param places The number of decimal places.
 * @returns The rounded number.
 */
export function roundToDecimalPlaces(num, places) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
}
