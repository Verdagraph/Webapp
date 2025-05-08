/**
 * Stores the current theme. Used to track the value of ModeWatcher's $mode
 * to make the store available in .svelte.ts files.
 */
let _theme: 'light' | 'dark' | undefined = $state('light');

/* Exported state methods. */
export const mode = {
	/* Getter. */
	get value(): 'light' | 'dark' | undefined {
		return _theme;
	},

	/* Setter. */
	set value(newVal: 'light' | 'dark' | undefined) {
		_theme = newVal;
	}
};
export default mode;
