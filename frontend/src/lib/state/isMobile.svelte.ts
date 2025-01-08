import { untrack } from 'svelte';

const MOBILE_BREAKPOINT = 768;

export const isMobile = (): boolean => {
	return window.innerWidth < MOBILE_BREAKPOINT;
};

export class IsMobile {
	#current: boolean = $state(false);

	constructor() {
		$effect(() => {
			return untrack(() => {
				const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
				const onChange = () => {
					this.#current = isMobile();
				};
				mql.addEventListener('change', onChange);
				onChange();
				return () => {
					mql.removeEventListener('change', onChange);
				};
			});
		});
	}

	get current() {
		return this.#current;
	}
}
