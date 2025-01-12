/**
 * Stores the active garden's key
 */
let _rune: string | null = $state(null);

/** TODO: Add storage of the client's role in the garden, for use in templates. */

/* Exported state methods. */
export const activeGardenId = {
	/* Getter. */
	get value(): string | null {
		return _rune;
	},

	/* Setter. */
	set value(newVal: string) {
		_rune = newVal;
	}
};
export default activeGardenId;
