/**
 * Retrieves an oninput handler for an input.
 * @param onChange The callback function that handles the change.
 */
export function getOninputString(onChange) {
    return (event) => {
        const target = event.target;
        if (!target?.value) {
            return;
        }
        onChange(target.value);
    };
}
/**
 * Retrieves an oninput handler for an input.
 * @param onChange The callback function that handles the change.
 */
export function getOninputNumber(onChange) {
    return (event) => {
        const target = event.target;
        if (!target?.value) {
            return;
        }
        onChange(Number(target.value));
    };
}
