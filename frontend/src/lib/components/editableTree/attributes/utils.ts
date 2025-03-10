/**
 * Retrieves an oninput handler for an input.
 * @param onChange The callback function that handles the change.
 */
export function getOninput<ElementT extends HTMLInputElement | HTMLTextAreaElement>(
	onChange: (changeOver: boolean, newData: any) => void
) {
	return (
		event: Event & {
			currentTarget: EventTarget & ElementT;
		}
	) => {
		const target = event.target as ElementT;
		if (!target?.value) {
			return;
		}
		onChange(false, target.value);
	};
}
