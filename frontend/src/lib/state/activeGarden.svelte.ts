/**
 * Stores the active garden's key
 */
let _rune: string | null = $state(null);

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
