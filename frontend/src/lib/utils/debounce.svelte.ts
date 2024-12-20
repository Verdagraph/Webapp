/**
 * Returns a debounced version of the provided callback function.
 * Taken from https://www.okupter.com/blog/svelte-debounce
 */
export const debounce = (callback: Function, wait = 300) => {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback(...args), wait);
	};
};
export default debounce;

export function debounceRune(callback: Function, wait = 300) {
	let debouncedValue = $state(callback());

	$effect.pre(() => {
		const value = callback();
		const timeout = setTimeout(() => {
			debouncedValue = value;
		}, wait);

		return () => clearTimeout(timeout);
	});

	return () => debouncedValue;
}
