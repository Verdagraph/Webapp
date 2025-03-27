/**
 * Retrieves an oninput handler for an input.
 * @param onChange The callback function that handles the change.
 */
export function getOninputString<
	ElementT extends HTMLInputElement | HTMLTextAreaElement
>(onChange: (newData: any) => void) {
	return (
		event: Event & {
			currentTarget: EventTarget & ElementT;
		}
	) => {
		const target = event.target as ElementT;
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
export function getOninputNumber<
	ElementT extends HTMLInputElement | HTMLTextAreaElement
>(onChange: (newData: any) => void) {
	return (
		event: Event & {
			currentTarget: EventTarget & ElementT;
		}
	) => {
		const target = event.target as ElementT;
		if (!target?.value) {
			return;
		}
		onChange(Number(target.value));
	};
}
