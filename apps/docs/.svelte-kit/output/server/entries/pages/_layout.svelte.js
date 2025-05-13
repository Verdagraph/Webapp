import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

import { I as Icon, h as html, t as tick } from '../../chunks/Icon.js';
import {
	q as assign_payload,
	e as attr,
	d as bind_props,
	g as clsx$1,
	n as copy_payload,
	t as ensure_array_like,
	u as escape_html,
	l as getAllContexts,
	k as getContext$1,
	j as hasContext,
	h as head,
	o as once,
	c as pop,
	p as push,
	s as setContext$1,
	f as spread_attributes,
	m as spread_props
} from '../../chunks/index2.js';
import { d as derived, g as get$1, w as writable } from '../../chunks/index.js';
import { w as fallback } from '../../chunks/runtime.js';

var commonjsGlobal =
	typeof globalThis !== 'undefined'
		? globalThis
		: typeof window !== 'undefined'
			? window
			: typeof global !== 'undefined'
				? global
				: typeof self !== 'undefined'
					? self
					: {};
let timeoutAction;
let timeoutEnable;
function withoutTransition(action) {
	if (typeof document === 'undefined') return;
	clearTimeout(timeoutAction);
	clearTimeout(timeoutEnable);
	const style = document.createElement('style');
	const css = document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);
	style.appendChild(css);
	const disable = () => document.head.appendChild(style);
	const enable = () => document.head.removeChild(style);
	if (typeof window.getComputedStyle !== 'undefined') {
		disable();
		action();
		window.getComputedStyle(style).opacity;
		enable();
		return;
	}
	if (typeof window.requestAnimationFrame !== 'undefined') {
		disable();
		action();
		window.requestAnimationFrame(enable);
		return;
	}
	disable();
	timeoutAction = window.setTimeout(() => {
		action();
		timeoutEnable = window.setTimeout(enable, 120);
	}, 120);
}
function sanitizeClassNames(classNames) {
	return classNames.filter((className) => className.length > 0);
}
const noopStorage = {
	getItem: (_key) => null,
	setItem: (_key, _value) => {}
};
const isBrowser$1 = typeof document !== 'undefined';
const modes = ['dark', 'light', 'system'];
const modeStorageKey = writable('mode-watcher-mode');
const themeStorageKey = writable('mode-watcher-theme');
const userPrefersMode = createUserPrefersMode();
const systemPrefersMode = createSystemMode();
const themeColors = writable(void 0);
const theme = createCustomTheme();
const disableTransitions = writable(true);
const darkClassNames = writable([]);
const lightClassNames = writable([]);
createDerivedMode();
createDerivedTheme();
function createUserPrefersMode() {
	const defaultValue = 'system';
	const storage = isBrowser$1 ? localStorage : noopStorage;
	const initialValue = storage.getItem(getModeStorageKey());
	let value = isValidMode(initialValue) ? initialValue : defaultValue;
	function getModeStorageKey() {
		return get$1(modeStorageKey);
	}
	const { subscribe, set: _set } = writable(value, () => {
		if (!isBrowser$1) return;
		const handler = (e) => {
			if (e.key !== getModeStorageKey()) return;
			const newValue = e.newValue;
			if (isValidMode(newValue)) {
				_set((value = newValue));
			} else {
				_set((value = defaultValue));
			}
		};
		addEventListener('storage', handler);
		return () => removeEventListener('storage', handler);
	});
	function set(v) {
		_set((value = v));
		storage.setItem(getModeStorageKey(), value);
	}
	return {
		subscribe,
		set
	};
}
function createCustomTheme() {
	const storage = isBrowser$1 ? localStorage : noopStorage;
	const initialValue = storage.getItem(getThemeStorageKey());
	let value = initialValue === null || initialValue === void 0 ? '' : initialValue;
	function getThemeStorageKey() {
		return get$1(themeStorageKey);
	}
	const { subscribe, set: _set } = writable(value, () => {
		if (!isBrowser$1) return;
		const handler = (e) => {
			if (e.key !== getThemeStorageKey()) return;
			const newValue = e.newValue;
			if (newValue === null) {
				_set((value = ''));
			} else {
				_set((value = newValue));
			}
		};
		addEventListener('storage', handler);
		return () => removeEventListener('storage', handler);
	});
	function set(v) {
		_set((value = v));
		storage.setItem(getThemeStorageKey(), value);
	}
	return {
		subscribe,
		set
	};
}
function createSystemMode() {
	const defaultValue = void 0;
	let track = true;
	const { subscribe, set } = writable(defaultValue, () => {
		if (!isBrowser$1) return;
		const handler = (e) => {
			if (!track) return;
			set(e.matches ? 'light' : 'dark');
		};
		const mediaQueryState = window.matchMedia('(prefers-color-scheme: light)');
		mediaQueryState.addEventListener('change', handler);
		return () => mediaQueryState.removeEventListener('change', handler);
	});
	function query() {
		if (!isBrowser$1) return;
		const mediaQueryState = window.matchMedia('(prefers-color-scheme: light)');
		set(mediaQueryState.matches ? 'light' : 'dark');
	}
	function tracking(active) {
		track = active;
	}
	return {
		subscribe,
		query,
		tracking
	};
}
function createDerivedMode() {
	const { subscribe } = derived(
		[
			userPrefersMode,
			systemPrefersMode,
			themeColors,
			disableTransitions,
			darkClassNames,
			lightClassNames
		],
		([
			$userPrefersMode,
			$systemPrefersMode,
			$themeColors,
			$disableTransitions,
			$darkClassNames,
			$lightClassNames
		]) => {
			if (!isBrowser$1) return void 0;
			const derivedMode =
				$userPrefersMode === 'system' ? $systemPrefersMode : $userPrefersMode;
			const sanitizedDarkClassNames = sanitizeClassNames($darkClassNames);
			const sanitizedLightClassNames = sanitizeClassNames($lightClassNames);
			function update() {
				const htmlEl = document.documentElement;
				const themeColorEl = document.querySelector('meta[name="theme-color"]');
				if (derivedMode === 'light') {
					if (sanitizedDarkClassNames.length)
						htmlEl.classList.remove(...sanitizedDarkClassNames);
					if (sanitizedLightClassNames.length)
						htmlEl.classList.add(...sanitizedLightClassNames);
					htmlEl.style.colorScheme = 'light';
					if (themeColorEl && $themeColors) {
						themeColorEl.setAttribute('content', $themeColors.light);
					}
				} else {
					if (sanitizedLightClassNames.length)
						htmlEl.classList.remove(...sanitizedLightClassNames);
					if (sanitizedDarkClassNames.length)
						htmlEl.classList.add(...sanitizedDarkClassNames);
					htmlEl.style.colorScheme = 'dark';
					if (themeColorEl && $themeColors) {
						themeColorEl.setAttribute('content', $themeColors.dark);
					}
				}
			}
			if ($disableTransitions) {
				withoutTransition(update);
			} else {
				update();
			}
			return derivedMode;
		}
	);
	return {
		subscribe
	};
}
function createDerivedTheme() {
	const { subscribe } = derived(
		[theme, disableTransitions],
		([$theme, $disableTransitions]) => {
			if (!isBrowser$1) return void 0;
			function update() {
				const htmlEl = document.documentElement;
				htmlEl.setAttribute('data-theme', $theme);
			}
			if ($disableTransitions) {
				withoutTransition(update);
			} else {
				update();
			}
			return $theme;
		}
	);
	return {
		subscribe
	};
}
function isValidMode(value) {
	if (typeof value !== 'string') return false;
	return modes.includes(value);
}
function defineConfig(config) {
	return config;
}
function setInitialMode({
	defaultMode,
	themeColors: themeColors2,
	darkClassNames: darkClassNames2 = ['dark'],
	lightClassNames: lightClassNames2 = [],
	defaultTheme = ''
}) {
	const rootEl = document.documentElement;
	const mode = localStorage.getItem('mode-watcher-mode') || defaultMode;
	const theme2 = localStorage.getItem('mode-watcher-theme') || defaultTheme;
	const light =
		mode === 'light' ||
		(mode === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);
	if (light) {
		if (darkClassNames2.length) rootEl.classList.remove(...darkClassNames2);
		if (lightClassNames2.length) rootEl.classList.add(...lightClassNames2);
	} else {
		if (lightClassNames2.length) rootEl.classList.remove(...lightClassNames2);
		if (darkClassNames2.length) rootEl.classList.add(...darkClassNames2);
	}
	rootEl.style.colorScheme = light ? 'light' : 'dark';
	if (themeColors2) {
		const themeMetaEl = document.querySelector('meta[name="theme-color"]');
		if (themeMetaEl) {
			themeMetaEl.setAttribute(
				'content',
				mode === 'light' ? themeColors2.light : themeColors2.dark
			);
		}
	}
	if (theme2) {
		rootEl.setAttribute('data-theme', theme2);
		localStorage.setItem('mode-watcher-theme', theme2);
	}
	localStorage.setItem('mode-watcher-mode', mode);
}
function Mode_watcher($$payload, $$props) {
	push();
	let trueNonce;
	let track = fallback($$props['track'], true);
	let defaultMode = fallback($$props['defaultMode'], 'system');
	let themeColors$1 = fallback($$props['themeColors'], () => void 0, true);
	let disableTransitions$1 = fallback($$props['disableTransitions'], true);
	let darkClassNames$1 = fallback($$props['darkClassNames'], () => ['dark'], true);
	let lightClassNames$1 = fallback($$props['lightClassNames'], () => [], true);
	let defaultTheme = fallback($$props['defaultTheme'], '');
	let nonce = fallback($$props['nonce'], '');
	let themeStorageKey$1 = fallback($$props['themeStorageKey'], 'mode-watcher-theme');
	let modeStorageKey$1 = fallback($$props['modeStorageKey'], 'mode-watcher-mode');
	const initConfig = defineConfig({
		defaultMode,
		themeColors: themeColors$1,
		darkClassNames: darkClassNames$1,
		lightClassNames: lightClassNames$1,
		defaultTheme,
		modeStorageKey: modeStorageKey$1,
		themeStorageKey: themeStorageKey$1
	});
	disableTransitions.set(disableTransitions$1);
	themeColors.set(themeColors$1);
	darkClassNames.set(darkClassNames$1);
	lightClassNames.set(lightClassNames$1);
	modeStorageKey.set(modeStorageKey$1);
	themeStorageKey.set(themeStorageKey$1);
	trueNonce = typeof window === 'undefined' ? nonce : '';
	head($$payload, ($$payload2) => {
		if (themeColors$1) {
			$$payload2.out += '<!--[-->';
			$$payload2.out += `<meta name="theme-color"${attr('content', themeColors$1.dark)}>`;
		} else {
			$$payload2.out += '<!--[!-->';
		}
		$$payload2.out += `<!--]--> `;
		if (trueNonce) {
			$$payload2.out += '<!--[-->';
			$$payload2.out += `${html(`<script nonce=${trueNonce}>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`)}`;
		} else {
			$$payload2.out += '<!--[!-->';
			$$payload2.out += `${html(`<script>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`)}`;
		}
		$$payload2.out += `<!--]-->`;
	});
	bind_props($$props, {
		track,
		defaultMode,
		themeColors: themeColors$1,
		disableTransitions: disableTransitions$1,
		darkClassNames: darkClassNames$1,
		lightClassNames: lightClassNames$1,
		defaultTheme,
		nonce,
		themeStorageKey: themeStorageKey$1,
		modeStorageKey: modeStorageKey$1
	});
	pop();
}
const externalLinks = {
	project: 'https://github.com/Verdagraph'
};
function Logo($$payload, $$props) {
	let { size: size2 = '6rem' } = $$props;
	$$payload.out += `<svg${attr('width', size2)}${attr('height', size2)} viewBox="0 0 185.3 195" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><defs><clipPath clipPathUnits="userSpaceOnUse" id="b"><path style="display:inline;fill:#4db24d;fill-opacity:1;stroke-width:.264583" d="M14.2 147.4s13.3 92 78 92.5c.2 0 1.4-12.4-4.6-18-1-.7-16.8 3.4-29.7-13.3h21.2s-5-13-39.3-42.3c0-.2 48.8 15.4 60 50.9.2 1.8 0 30.1 0 30.1l5.2.1V195s-14.6-47.2-90.8-47.5zm181.6 0s-13.3 92-78 92.5c-.2 0-1.4-12.4 4.6-18 1-.7 16.8 3.4 29.7-13.3h-21.2s5-13 39.3-42.3c0-.2-48.8 15.4-60 50.9-.2 1.8 0 30.1 0 30.1l-5.2.1V195s14.6-47.2 90.8-47.5z"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="c"><path style="display:inline;fill:#4db24d;fill-opacity:1;stroke-width:.264583" d="M14.2 147.4s13.3 92 78 92.5c.2 0 1.4-12.4-4.6-18-1-.7-16.8 3.4-29.7-13.3h21.2s-5-13-39.3-42.3c0-.2 48.8 15.4 60 50.9.2 1.8 0 30.1 0 30.1l5.2.1V195s-14.6-47.2-90.8-47.5zm181.6 0s-13.3 92-78 92.5c-.2 0-1.4-12.4 4.6-18 1-.7 16.8 3.4 29.7-13.3h-21.2s5-13 39.3-42.3c0-.2-48.8 15.4-60 50.9-.2 1.8 0 30.1 0 30.1l-5.2.1V195s14.6-47.2 90.8-47.5z"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="a"><path d="M205 147.4a100 100 0 1 1-200 0 100 100 0 0 1 200 0zm-200 0a100 100 0 1 0 200 0 100 100 0 0 0-200 0zm0 0a100 100 0 1 0 200 0 100 100 0 0 0-200 0zm200 0a100 100 0 1 1-200 0 100 100 0 0 1 200 0z" style="display:inline;fill:#000;stroke-width:.234257"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="d"><circle style="display:inline;fill:#000;stroke-width:.269395" cx="122.3" cy="167.1" r="115"></circle></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="f"><path d="M205 147.4a100 100 0 0 1-100 100 100 100 0 0 1-100-100 100 100 0 0 1 100-100 100 100 0 0 1 100 100z" style="display:inline;fill:#000;stroke-width:.234257"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="e"><circle style="display:inline;fill:navy;stroke-width:.128841" cx="105" cy="147.4" r="55"></circle></clipPath></defs><g style="display:inline"><path style="display:inline;fill:#4db24d;fill-opacity:1;stroke-width:.264583" d="M14.2 147.4s13.3 92 78 92.5c.2 0 1.4-12.4-4.6-18-1-.7-16.8 3.4-29.7-13.3h21.2s-5-13-39.3-42.3c0-.2 48.8 15.4 60 50.9.2 1.8 0 30.1 0 30.1l5.2.1V195s-14.6-47.2-90.8-47.5zm181.6 0s-13.3 92-78 92.5c-.2 0-1.4-12.4 4.6-18 1-.7 16.8 3.4 29.7-13.3h-21.2s5-13 39.3-42.3c0-.2-48.8 15.4-60 50.9-.2 1.8 0 30.1 0 30.1l-5.2.1V195s14.6-47.2 90.8-47.5z" transform="translate(-12.3 -52.4)"></path><path style="display:inline;opacity:1;fill:#1f5723;fill-opacity:1;stroke-width:.264583" d="M14 156.2s25.6 78.3 77.6 73.3c1.3 0 4.4 27.4 4.4 27.4l9 .3v8.7l-78.3-37.6Zm182 0s-25.6 78.3-77.6 73.3c-1.3 0-4.4 27.4-4.4 27.4l-9 .3v8.7l78.3-37.6z" clip-path="url(#b)" transform="translate(-12.3 -52.4)"></path><path style="display:inline;opacity:1;fill:#60ce3c;fill-opacity:1;stroke-width:.264583" d="M26 147.9c-68.9-11.4 72-7.3 72.4-7.9.4-.5 6.6-.2 6.6-.2v62c-7-2.3-2.8-41.3-79-54zm158 0c68.9-11.4-72-7.3-72.4-7.9-.4-.5-6.6-.2-6.6-.2v62c7-2.3 2.8-41.3 79-54z" clip-path="url(#c)" transform="translate(-12.3 -52.4)"></path></g><g style="display:inline"><path style="display:inline;fill:red;fill-opacity:1;stroke-width:.264583" d="M78.2 147.4s11.9-13 26.8-13v29zm53.6 0s-11.9-13-26.8-13v29z" transform="translate(-12.3 -52.4)"></path><path style="display:inline;fill:red;stroke-width:.222544" d="M34.5 83.7a94.7 94.7 0 0 0-22.2 42.8l9.3 2.2a85.3 85.3 0 0 1 20.3-39zm141 0-7.4 6a85.3 85.3 0 0 1 20.3 39l9.3-2.2a94.7 94.7 0 0 0-22.2-42.8Z" transform="translate(-12.3 -52.4)"></path><path style="display:inline;fill:red;fill-opacity:1;stroke-width:.264583" d="M105 52.4a94.7 94.7 0 0 0-33.6 6.2l3.4 8.8a85.3 85.3 0 0 1 60.3 0h.1l3.4-8.8a94.7 94.7 0 0 0-33.6-6.2Z" transform="translate(-12.3 -52.4)"></path><path style="display:inline;fill:red;stroke-width:.222251" d="m77.2 61.2-5 2-4.5 2.7 10.2 18.9 2.3 4.2 2.1 4 7-3.4a84.4 84.4 0 0 1 22.5-6.2L110.5 73A94.9 94.9 0 0 0 85.2 80zm90 0L159.4 80c-8-3.5-16.6-5.8-25.3-6.9l-1.3 10.4a83.8 83.8 0 0 1 29.5 9.6l2.1-4 2.3-4.2 10.2-19-4.6-2.6zM48.6 78.8l-5.4 2.5-2.6 4.9L55 100.5c-5.2 5.2-9.7 11-13.5 17.1l8.8 5.4c5.2-8.6 12-15 12.1-15.1 2-2 3.9-3.7 5.9-5.4l-1.1-1.3-5-5.9zm147.5 0-13.8 16.5-2.7 3.2-2.2 2.7-1 1.3c2 1.7 3.9 3.5 5.8 5.4.3.3 6.9 6.5 12.1 15.1l8.8-5.4c-3.8-6.1-8.3-11.9-13.5-17.1L204 86.2l-2.6-5z" transform="matrix(.86957 0 0 .86957 -13.6 -50.3)" clip-path="url(#d)"></path><path style="display:inline;fill:red;stroke-width:.264583" d="M90.2 91.9v15.5l5.8 5.8v9.8l9 4V92.4ZM82 97.5l-9.2 2.6-7 6.7 15.7 15.6v8h10.2v-12.8l-9.9-9zm-20.7 16.3-4.7 2.6L71.2 131v3.9h3.9v-7.4zm-7.8 11L49 135.2l21.5 7.3zm66.3-33v15.6l-5.8 5.8v9.8l-9 4V92.4Zm8.2 5.7 9.2 2.6 7 6.7-15.7 15.6v8h-10.2v-12.8l9.9-9zm20.7 16.3 4.7 2.6-14.6 14.6v3.9h-3.9v-7.4zm7.8 11 4.5 10.3-21.5 7.3z" clip-path="url(#e)" transform="translate(-12.3 -52.4)"></path><path clip-path="url(#f)" style="display:inline;fill:red;stroke-width:.264583" d="M52.7 62.2 48.5 64 45 67.5l18.7 24.9a69 69 0 0 0-25.9 39.9l6.7 1.5a62 62 0 0 1 121 0l6.7-1.5a69 69 0 0 0-25.9-40L165 67.6l-3.5-3.6-4.2-1.7L141 88.7a68.5 68.5 0 0 0-72 0Z" transform="translate(-12.3 -52.4)"></path></g></svg>`;
}
const iconIds = {
	/* Generic */
	dropdownMenuIcon: 'material-symbols-light:menu-rounded'
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
const buttonVariants = tv({
	base: 'ring-offset-background focus-visible:ring-primary-7 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	variants: {
		variant: {
			default: 'bg-primary-3 hover:bg-primary-4 active:bg-primary-5 text-primary-12',
			destructive:
				'bg-destructive-3 hover:bg-destructive-4 active:bg-destructive-5 text-destructive-12',
			outline:
				'border-neutral-7 hover:bg-accent-3 active:bg-accent-4 hover:text-accent-12 border',
			secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
			ghost: 'hover:bg-accent-3 active:bg-accent-4 hover:text-accent-12',
			link: 'text-neutral-12 underline-offset-4 hover:underline hover:opacity-90'
		},
		size: {
			default: 'h-10 px-4 py-2',
			xsm: 'h-6 w-6 rounded-[8px] px-2',
			sm: 'h-9 rounded-md px-3',
			lg: 'h-11 rounded-md px-8',
			icon: 'h-10 w-10'
		}
	},
	defaultVariants: { variant: 'default', size: 'default' }
});
function Button($$payload, $$props) {
	push();
	let {
		class: className,
		variant = 'default',
		size: size2 = 'default',
		ref = null,
		href = void 0,
		type = 'button',
		children,
		$$slots,
		$$events,
		...restProps
	} = $$props;
	if (href) {
		$$payload.out += '<!--[-->';
		$$payload.out += `<a${spread_attributes({
			class: clsx$1(cn(buttonVariants({ variant, size: size2 }), className)),
			href,
			...restProps
		})}>`;
		children?.($$payload);
		$$payload.out += `<!----></a>`;
	} else {
		$$payload.out += '<!--[!-->';
		$$payload.out += `<button${spread_attributes({
			class: clsx$1(cn(buttonVariants({ variant, size: size2 }), className)),
			type,
			...restProps
		})}>`;
		children?.($$payload);
		$$payload.out += `<!----></button>`;
	}
	$$payload.out += `<!--]-->`;
	bind_props($$props, { ref });
	pop();
}
function isFunction(value) {
	return typeof value === 'function';
}
function isObject(value) {
	return value !== null && typeof value === 'object';
}
const BoxSymbol = Symbol('box');
const isWritableSymbol = Symbol('is-writable');
function isBox(value) {
	return isObject(value) && BoxSymbol in value;
}
function isWritableBox(value) {
	return box.isBox(value) && isWritableSymbol in value;
}
function box(initialValue) {
	let current = initialValue;
	return {
		[BoxSymbol]: true,
		[isWritableSymbol]: true,
		get current() {
			return current;
		},
		set current(v) {
			current = v;
		}
	};
}
function boxWith(getter, setter) {
	const derived2 = getter();
	if (setter) {
		return {
			[BoxSymbol]: true,
			[isWritableSymbol]: true,
			get current() {
				return derived2;
			},
			set current(v) {
				setter(v);
			}
		};
	}
	return {
		[BoxSymbol]: true,
		get current() {
			return getter();
		}
	};
}
function boxFrom(value) {
	if (box.isBox(value)) return value;
	if (isFunction(value)) return box.with(value);
	return box(value);
}
function boxFlatten(boxes) {
	return Object.entries(boxes).reduce((acc, [key, b]) => {
		if (!box.isBox(b)) {
			return Object.assign(acc, { [key]: b });
		}
		if (box.isWritableBox(b)) {
			Object.defineProperty(acc, key, {
				get() {
					return b.current;
				},
				set(v) {
					b.current = v;
				}
			});
		} else {
			Object.defineProperty(acc, key, {
				get() {
					return b.current;
				}
			});
		}
		return acc;
	}, {});
}
function toReadonlyBox(b) {
	if (!box.isWritableBox(b)) return b;
	return {
		[BoxSymbol]: true,
		get current() {
			return b.current;
		}
	};
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
function composeHandlers(...handlers) {
	return function (e) {
		for (const handler of handlers) {
			if (!handler) continue;
			if (e.defaultPrevented) return;
			if (typeof handler === 'function') {
				handler.call(this, e);
			} else {
				handler.current?.call(this, e);
			}
		}
	};
}
var cjs = {};
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
var NEWLINE_REGEX = /\n/g;
var WHITESPACE_REGEX = /^\s*/;
var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
var COLON_REGEX = /^:\s*/;
var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
var SEMICOLON_REGEX = /^[;\s]*/;
var TRIM_REGEX = /^\s+|\s+$/g;
var NEWLINE = '\n';
var FORWARD_SLASH = '/';
var ASTERISK = '*';
var EMPTY_STRING = '';
var TYPE_COMMENT = 'comment';
var TYPE_DECLARATION = 'declaration';
var inlineStyleParser = function (style, options) {
	if (typeof style !== 'string') {
		throw new TypeError('First argument must be a string');
	}
	if (!style) return [];
	options = options || {};
	var lineno = 1;
	var column = 1;
	function updatePosition(str) {
		var lines = str.match(NEWLINE_REGEX);
		if (lines) lineno += lines.length;
		var i = str.lastIndexOf(NEWLINE);
		column = ~i ? str.length - i : column + str.length;
	}
	function position() {
		var start = { line: lineno, column };
		return function (node) {
			node.position = new Position(start);
			whitespace();
			return node;
		};
	}
	function Position(start) {
		this.start = start;
		this.end = { line: lineno, column };
		this.source = options.source;
	}
	Position.prototype.content = style;
	function error(msg) {
		var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg);
		err.reason = msg;
		err.filename = options.source;
		err.line = lineno;
		err.column = column;
		err.source = style;
		if (options.silent);
		else {
			throw err;
		}
	}
	function match(re) {
		var m = re.exec(style);
		if (!m) return;
		var str = m[0];
		updatePosition(str);
		style = style.slice(str.length);
		return m;
	}
	function whitespace() {
		match(WHITESPACE_REGEX);
	}
	function comments(rules) {
		var c;
		rules = rules || [];
		while ((c = comment())) {
			if (c !== false) {
				rules.push(c);
			}
		}
		return rules;
	}
	function comment() {
		var pos = position();
		if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
		var i = 2;
		while (
			EMPTY_STRING != style.charAt(i) &&
			(ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))
		) {
			++i;
		}
		i += 2;
		if (EMPTY_STRING === style.charAt(i - 1)) {
			return error('End of comment missing');
		}
		var str = style.slice(2, i - 2);
		column += 2;
		updatePosition(str);
		style = style.slice(i);
		column += 2;
		return pos({
			type: TYPE_COMMENT,
			comment: str
		});
	}
	function declaration() {
		var pos = position();
		var prop = match(PROPERTY_REGEX);
		if (!prop) return;
		comment();
		if (!match(COLON_REGEX)) return error("property missing ':'");
		var val = match(VALUE_REGEX);
		var ret = pos({
			type: TYPE_DECLARATION,
			property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
			value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
		});
		match(SEMICOLON_REGEX);
		return ret;
	}
	function declarations() {
		var decls = [];
		comments(decls);
		var decl;
		while ((decl = declaration())) {
			if (decl !== false) {
				decls.push(decl);
				comments(decls);
			}
		}
		return decls;
	}
	whitespace();
	return declarations();
};
function trim(str) {
	return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}
var __importDefault =
	(commonjsGlobal && commonjsGlobal.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(cjs, '__esModule', { value: true });
var _default = (cjs.default = StyleToObject);
var inline_style_parser_1 = __importDefault(inlineStyleParser);
function StyleToObject(style, iterator) {
	var styleObject = null;
	if (!style || typeof style !== 'string') {
		return styleObject;
	}
	var declarations = (0, inline_style_parser_1.default)(style);
	var hasIterator = typeof iterator === 'function';
	declarations.forEach(function (declaration) {
		if (declaration.type !== 'declaration') {
			return;
		}
		var property = declaration.property,
			value = declaration.value;
		if (hasIterator) {
			iterator(property, value, declaration);
		} else if (value) {
			styleObject = styleObject || {};
			styleObject[property] = value;
		}
	});
	return styleObject;
}
const parse = _default.default || _default;
const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ['-', '_', '/', '.'];
function isUppercase(char = '') {
	if (NUMBER_CHAR_RE.test(char)) return void 0;
	return char !== char.toLowerCase();
}
function splitByCase(str) {
	const parts = [];
	let buff = '';
	let previousUpper;
	let previousSplitter;
	for (const char of str) {
		const isSplitter = STR_SPLITTERS.includes(char);
		if (isSplitter === true) {
			parts.push(buff);
			buff = '';
			previousUpper = void 0;
			continue;
		}
		const isUpper = isUppercase(char);
		if (previousSplitter === false) {
			if (previousUpper === false && isUpper === true) {
				parts.push(buff);
				buff = char;
				previousUpper = isUpper;
				continue;
			}
			if (previousUpper === true && isUpper === false && buff.length > 1) {
				const lastChar = buff.at(-1);
				parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
				buff = lastChar + char;
				previousUpper = isUpper;
				continue;
			}
		}
		buff += char;
		previousUpper = isUpper;
		previousSplitter = isSplitter;
	}
	parts.push(buff);
	return parts;
}
function pascalCase(str) {
	if (!str) return '';
	return splitByCase(str)
		.map((p) => upperFirst(p))
		.join('');
}
function camelCase(str) {
	return lowerFirst(pascalCase(str || ''));
}
function upperFirst(str) {
	return str ? str[0].toUpperCase() + str.slice(1) : '';
}
function lowerFirst(str) {
	return str ? str[0].toLowerCase() + str.slice(1) : '';
}
function cssToStyleObj(css) {
	if (!css) return {};
	const styleObj = {};
	function iterator(name, value) {
		if (
			name.startsWith('-moz-') ||
			name.startsWith('-webkit-') ||
			name.startsWith('-ms-') ||
			name.startsWith('-o-')
		) {
			styleObj[pascalCase(name)] = value;
			return;
		}
		if (name.startsWith('--')) {
			styleObj[name] = value;
			return;
		}
		styleObj[camelCase(name)] = value;
	}
	parse(css, iterator);
	return styleObj;
}
function executeCallbacks(...callbacks) {
	return (...args) => {
		for (const callback of callbacks) {
			if (typeof callback === 'function') {
				callback(...args);
			}
		}
	};
}
function createParser(matcher, replacer) {
	const regex = RegExp(matcher, 'g');
	return (str) => {
		if (typeof str !== 'string') {
			throw new TypeError(`expected an argument of type string, but got ${typeof str}`);
		}
		if (!str.match(regex)) return str;
		return str.replace(regex, replacer);
	};
}
const camelToKebab = createParser(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
function styleToCSS(styleObj) {
	if (!styleObj || typeof styleObj !== 'object' || Array.isArray(styleObj)) {
		throw new TypeError(
			`expected an argument of type object, but got ${typeof styleObj}`
		);
	}
	return Object.keys(styleObj)
		.map((property) => `${camelToKebab(property)}: ${styleObj[property]};`)
		.join('\n');
}
function styleToString(style = {}) {
	return styleToCSS(style).replace('\n', ' ');
}
const srOnlyStyles = {
	position: 'absolute',
	width: '1px',
	height: '1px',
	padding: '0',
	margin: '-1px',
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	borderWidth: '0',
	transform: 'translateX(-100%)'
};
styleToString(srOnlyStyles);
function isEventHandler(key) {
	return key.length > 2 && key.startsWith('on') && key[2] === key[2]?.toLowerCase();
}
function mergeProps(...args) {
	const result = { ...args[0] };
	for (let i = 1; i < args.length; i++) {
		const props = args[i];
		for (const key in props) {
			const a = result[key];
			const b = props[key];
			const aIsFunction = typeof a === 'function';
			const bIsFunction = typeof b === 'function';
			if (aIsFunction && typeof bIsFunction && isEventHandler(key)) {
				const aHandler = a;
				const bHandler = b;
				result[key] = composeHandlers(aHandler, bHandler);
			} else if (aIsFunction && bIsFunction) {
				result[key] = executeCallbacks(a, b);
			} else if (key === 'class' && typeof a === 'string' && typeof b === 'string') {
				result[key] = clsx(a, b);
			} else if (key === 'style') {
				const aIsObject = typeof a === 'object';
				const bIsObject = typeof b === 'object';
				const aIsString = typeof a === 'string';
				const bIsString = typeof b === 'string';
				if (aIsObject && bIsObject) {
					result[key] = { ...a, ...b };
				} else if (aIsObject && bIsString) {
					const parsedStyle = cssToStyleObj(b);
					result[key] = { ...a, ...parsedStyle };
				} else if (aIsString && bIsObject) {
					const parsedStyle = cssToStyleObj(a);
					result[key] = { ...parsedStyle, ...b };
				} else if (aIsString && bIsString) {
					const parsedStyleA = cssToStyleObj(a);
					const parsedStyleB = cssToStyleObj(b);
					result[key] = { ...parsedStyleA, ...parsedStyleB };
				} else if (aIsObject) {
					result[key] = a;
				} else if (bIsObject) {
					result[key] = b;
				}
			} else {
				result[key] = b !== void 0 ? b : a;
			}
		}
	}
	if (typeof result.style === 'object') {
		result.style = styleToString(result.style).replaceAll('\n', ' ');
	}
	if (result.hidden !== true) {
		result.hidden = void 0;
	}
	if (result.disabled !== true) {
		result.disabled = void 0;
	}
	return result;
}
function useRefById({
	id,
	ref,
	deps = () => true,
	onRefChange = () => {},
	getRootNode = () => (typeof document !== 'undefined' ? document : void 0)
}) {
	(() => deps())();
	(() => getRootNode())();
}
function afterTick(fn) {
	tick().then(fn);
}
class ElementSize {
	#size = { width: 0, height: 0 };
	constructor(node, options = { box: 'border-box' }) {
		this.#size = {
			width: options.initialSize?.width ?? 0,
			height: options.initialSize?.height ?? 0
		};
	}
	get width() {
		return this.#size.width;
	}
	get height() {
		return this.#size.height;
	}
}
function getDataOpenClosed(condition) {
	return condition ? 'open' : 'closed';
}
function getAriaExpanded(condition) {
	return condition ? 'true' : 'false';
}
function getAriaOrientation(orientation) {
	return orientation;
}
function getAriaHidden(condition) {
	return condition ? 'true' : void 0;
}
function getDataOrientation(orientation) {
	return orientation;
}
const ENTER = 'Enter';
const ESCAPE = 'Escape';
const SPACE = ' ';
const TAB = 'Tab';
const isBrowser = typeof document !== 'undefined';
function isHTMLElement$1(element) {
	return element instanceof HTMLElement;
}
function isElement$1(element) {
	return element instanceof Element;
}
function isNotNull(value) {
	return value !== null;
}
function isSelectableInput(element) {
	return element instanceof HTMLInputElement && 'select' in element;
}
function isElementHidden(node, stopAt) {
	if (getComputedStyle(node).visibility === 'hidden') return true;
	while (node) {
		if (stopAt !== void 0 && node === stopAt) return false;
		if (getComputedStyle(node).display === 'none') return true;
		node = node.parentElement;
	}
	return false;
}
function setContext(key, value) {
	return setContext$1(key, value);
}
function getContext(key, fallback2) {
	const trueKey = typeof key === 'symbol' ? key : key;
	const description = typeof key === 'symbol' ? key.description : key;
	if (!hasContext(trueKey)) {
		if (fallback2 === void 0) {
			throw new Error(
				`Missing context dependency: ${description} and no fallback was provided.`
			);
		}
		return fallback2;
	}
	return getContext$1(key);
}
function getSymbolDescription(providerComponentName, contextName) {
	if (typeof providerComponentName === 'string' && contextName === void 0) {
		return `${providerComponentName}Context`;
	} else if (Array.isArray(providerComponentName) && contextName === void 0) {
		return `${providerComponentName[0]}Context`;
	} else {
		return `${providerComponentName}Context`;
	}
}
function createContext(providerComponentName, contextName, useSymbol = true) {
	const symbolDescription = getSymbolDescription(providerComponentName, contextName);
	const symbol = Symbol.for(`bits-ui.${symbolDescription}`);
	const key = symbolDescription;
	function getCtx(fallback2) {
		const context = getContext(useSymbol ? symbol : key, fallback2);
		if (context === void 0) {
			throw new Error(
				`Context \`${symbolDescription}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(', ')}` : `\`${providerComponentName}\``}`
			);
		}
		if (context === null) return context;
		return context;
	}
	function setCtx(value) {
		if (useSymbol) {
			return setContext(symbol, value);
		} else {
			return setContext(key, value);
		}
	}
	return [setCtx, getCtx];
}
globalThis.bitsIdCounter ??= { current: 0 };
function useId(prefix = 'bits') {
	globalThis.bitsIdCounter.current++;
	return `${prefix}-${globalThis.bitsIdCounter.current}`;
}
function noop() {}
function useStateMachine(initialState, machine) {
	const state = box(initialState);
	function reducer(event) {
		const nextState = machine[state.current][event];
		return nextState ?? state.current;
	}
	const dispatch = (event) => {
		state.current = reducer(event);
	};
	return { state, dispatch };
}
function usePresence(present, id) {
	const initialState = present.current ? 'mounted' : 'unmounted';
	const { state } = useStateMachine(initialState, {
		mounted: {
			UNMOUNT: 'unmounted',
			ANIMATION_OUT: 'unmountSuspended'
		},
		unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
		unmounted: { MOUNT: 'mounted' }
	});
	const isPresentDerived = ['mounted', 'unmountSuspended'].includes(state.current);
	return {
		get current() {
			return isPresentDerived;
		}
	};
}
function Presence_layer($$payload, $$props) {
	push();
	let { present, forceMount, presence, id } = $$props;
	const isPresent = usePresence(
		box.with(() => present),
		box.with(() => id)
	);
	if (forceMount || present || isPresent.current) {
		$$payload.out += '<!--[-->';
		presence?.($$payload, { present: isPresent });
		$$payload.out += `<!---->`;
	} else {
		$$payload.out += '<!--[!-->';
	}
	$$payload.out += `<!--]-->`;
	pop();
}
function Portal($$payload, $$props) {
	push();
	let { to = 'body', children, disabled } = $$props;
	getAllContexts();
	getTarget();
	function getTarget() {
		if (!isBrowser || disabled) return null;
		let localTarget = null;
		if (typeof to === 'string') {
			localTarget = document.querySelector(to);
		} else if (to instanceof HTMLElement || to instanceof DocumentFragment) {
			localTarget = to;
		} else;
		return localTarget;
	}
	if (disabled) {
		$$payload.out += '<!--[-->';
		children?.($$payload);
		$$payload.out += `<!---->`;
	} else {
		$$payload.out += '<!--[!-->';
	}
	$$payload.out += `<!--]-->`;
	pop();
}
function addEventListener$1(target, event, handler, options) {
	const events = Array.isArray(event) ? event : [event];
	events.forEach((_event) => target.addEventListener(_event, handler, options));
	return () => {
		events.forEach((_event) => target.removeEventListener(_event, handler, options));
	};
}
function debounce(fn, wait = 500) {
	let timeout = null;
	const debounced = (...args) => {
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			fn(...args);
		}, wait);
	};
	debounced.destroy = () => {
		if (timeout !== null) {
			clearTimeout(timeout);
			timeout = null;
		}
	};
	return debounced;
}
function isOrContainsTarget(node, target) {
	return node === target || node.contains(target);
}
function getOwnerDocument(el) {
	return el?.ownerDocument ?? document;
}
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
class DismissibleLayerState {
	#interactOutsideProp;
	#behaviorType;
	#interceptedEvents = { pointerdown: false };
	#isResponsibleLayer = false;
	node = box(null);
	#documentObj = void 0;
	#enabled;
	#isFocusInsideDOMTree = false;
	#onFocusOutside;
	currNode = null;
	#isValidEventProp;
	#unsubClickListener = noop;
	constructor(props) {
		this.#enabled = props.enabled;
		this.#isValidEventProp = props.isValidEvent;
		useRefById({
			id: props.id,
			ref: this.node,
			deps: () => this.#enabled.current,
			onRefChange: (node) => {
				this.currNode = node;
			}
		});
		this.#behaviorType = props.interactOutsideBehavior;
		this.#interactOutsideProp = props.onInteractOutside;
		this.#onFocusOutside = props.onFocusOutside;
	}
	#handleFocus = (event) => {
		if (event.defaultPrevented) return;
		if (!this.currNode) return;
		afterTick(() => {
			if (!this.currNode || this.#isTargetWithinLayer(event.target)) return;
			if (event.target && !this.#isFocusInsideDOMTree) {
				this.#onFocusOutside.current?.(event);
			}
		});
	};
	#addEventListeners() {
		return executeCallbacks(
			/**
			 * CAPTURE INTERACTION START
			 * mark interaction-start event as intercepted.
			 * mark responsible layer during interaction start
			 * to avoid checking if is responsible layer during interaction end
			 * when a new floating element may have been opened.
			 */
			addEventListener$1(
				this.#documentObj,
				'pointerdown',
				executeCallbacks(this.#markInterceptedEvent, this.#markResponsibleLayer),
				true
			),
			/**
			 * BUBBLE INTERACTION START
			 * Mark interaction-start event as non-intercepted. Debounce `onInteractOutsideStart`
			 * to avoid prematurely checking if other events were intercepted.
			 */
			addEventListener$1(
				this.#documentObj,
				'pointerdown',
				executeCallbacks(this.#markNonInterceptedEvent, this.#handleInteractOutside)
			),
			/**
			 * HANDLE FOCUS OUTSIDE
			 */
			addEventListener$1(this.#documentObj, 'focusin', this.#handleFocus)
		);
	}
	#handleDismiss = (e) => {
		let event = e;
		if (event.defaultPrevented) {
			event = createWrappedEvent(e);
		}
		this.#interactOutsideProp.current(e);
	};
	#handleInteractOutside = debounce((e) => {
		if (!this.currNode) {
			this.#unsubClickListener();
			return;
		}
		const isEventValid =
			this.#isValidEventProp.current(e, this.currNode) ||
			isValidEvent(e, this.currNode);
		if (!this.#isResponsibleLayer || this.#isAnyEventIntercepted() || !isEventValid) {
			this.#unsubClickListener();
			return;
		}
		let event = e;
		if (event.defaultPrevented) {
			event = createWrappedEvent(event);
		}
		if (
			this.#behaviorType.current !== 'close' &&
			this.#behaviorType.current !== 'defer-otherwise-close'
		) {
			this.#unsubClickListener();
			return;
		}
		if (e.pointerType === 'touch') {
			this.#unsubClickListener();
			this.#unsubClickListener = addEventListener$1(
				this.#documentObj,
				'click',
				this.#handleDismiss,
				{ once: true }
			);
		} else {
			this.#interactOutsideProp.current(event);
		}
	}, 10);
	#markInterceptedEvent = (e) => {
		this.#interceptedEvents[e.type] = true;
	};
	#markNonInterceptedEvent = (e) => {
		this.#interceptedEvents[e.type] = false;
	};
	#markResponsibleLayer = () => {
		if (!this.node.current) return;
		this.#isResponsibleLayer = isResponsibleLayer(this.node.current);
	};
	#isTargetWithinLayer = (target) => {
		if (!this.node.current) return false;
		return isOrContainsTarget(this.node.current, target);
	};
	#resetState = debounce(() => {
		for (const eventType in this.#interceptedEvents) {
			this.#interceptedEvents[eventType] = false;
		}
		this.#isResponsibleLayer = false;
	}, 20);
	#isAnyEventIntercepted() {
		const i = Object.values(this.#interceptedEvents).some(Boolean);
		return i;
	}
	#onfocuscapture = () => {
		this.#isFocusInsideDOMTree = true;
	};
	#onblurcapture = () => {
		this.#isFocusInsideDOMTree = false;
	};
	props = {
		onfocuscapture: this.#onfocuscapture,
		onblurcapture: this.#onblurcapture
	};
}
function useDismissibleLayer(props) {
	return new DismissibleLayerState(props);
}
function getTopMostLayer(layersArr) {
	return layersArr.findLast(
		([_, { current: behaviorType }]) =>
			behaviorType === 'close' || behaviorType === 'ignore'
	);
}
function isResponsibleLayer(node) {
	const layersArr = [...globalThis.bitsDismissableLayers];
	const topMostLayer = getTopMostLayer(layersArr);
	if (topMostLayer) return topMostLayer[0].node.current === node;
	const [firstLayerNode] = layersArr[0];
	return firstLayerNode.node.current === node;
}
function isValidEvent(e, node) {
	if ('button' in e && e.button > 0) return false;
	const target = e.target;
	if (!isElement$1(target)) return false;
	const ownerDocument = getOwnerDocument(target);
	const isValid =
		ownerDocument.documentElement.contains(target) && !isOrContainsTarget(node, target);
	return isValid;
}
function createWrappedEvent(e) {
	const capturedCurrentTarget = e.currentTarget;
	const capturedTarget = e.target;
	let newEvent;
	if (e instanceof PointerEvent) {
		newEvent = new PointerEvent(e.type, e);
	} else {
		newEvent = new PointerEvent('pointerdown', e);
	}
	let isPrevented = false;
	const wrappedEvent = new Proxy(newEvent, {
		get: (target, prop) => {
			if (prop === 'currentTarget') {
				return capturedCurrentTarget;
			}
			if (prop === 'target') {
				return capturedTarget;
			}
			if (prop === 'preventDefault') {
				return () => {
					isPrevented = true;
					if (typeof target.preventDefault === 'function') {
						target.preventDefault();
					}
				};
			}
			if (prop === 'defaultPrevented') {
				return isPrevented;
			}
			if (prop in target) {
				return target[prop];
			}
			return e[prop];
		}
	});
	return wrappedEvent;
}
function Dismissible_layer($$payload, $$props) {
	push();
	let {
		interactOutsideBehavior = 'close',
		onInteractOutside = noop,
		onFocusOutside = noop,
		id,
		children,
		enabled,
		isValidEvent: isValidEvent2 = () => false
	} = $$props;
	const dismissibleLayerState = useDismissibleLayer({
		id: box.with(() => id),
		interactOutsideBehavior: box.with(() => interactOutsideBehavior),
		onInteractOutside: box.with(() => onInteractOutside),
		enabled: box.with(() => enabled),
		onFocusOutside: box.with(() => onFocusOutside),
		isValidEvent: box.with(() => isValidEvent2)
	});
	children?.($$payload, { props: dismissibleLayerState.props });
	$$payload.out += `<!---->`;
	pop();
}
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
class EscapeLayerState {
	#onEscapeProp;
	#behaviorType;
	#enabled;
	constructor(props) {
		this.#behaviorType = props.escapeKeydownBehavior;
		this.#onEscapeProp = props.onEscapeKeydown;
		this.#enabled = props.enabled;
	}
	#addEventListener = () => {
		return addEventListener$1(document, 'keydown', this.#onkeydown, { passive: false });
	};
	#onkeydown = (e) => {
		if (e.key !== ESCAPE || !isResponsibleEscapeLayer(this)) return;
		const clonedEvent = new KeyboardEvent(e.type, e);
		e.preventDefault();
		const behaviorType = this.#behaviorType.current;
		if (behaviorType !== 'close' && behaviorType !== 'defer-otherwise-close') return;
		this.#onEscapeProp.current(clonedEvent);
	};
}
function useEscapeLayer(props) {
	return new EscapeLayerState(props);
}
function isResponsibleEscapeLayer(instance) {
	const layersArr = [...globalThis.bitsEscapeLayers];
	const topMostLayer = layersArr.findLast(
		([_, { current: behaviorType }]) =>
			behaviorType === 'close' || behaviorType === 'ignore'
	);
	if (topMostLayer) return topMostLayer[0] === instance;
	const [firstLayerNode] = layersArr[0];
	return firstLayerNode === instance;
}
function Escape_layer($$payload, $$props) {
	push();
	let {
		escapeKeydownBehavior = 'close',
		onEscapeKeydown = noop,
		children,
		enabled
	} = $$props;
	useEscapeLayer({
		escapeKeydownBehavior: box.with(() => escapeKeydownBehavior),
		onEscapeKeydown: box.with(() => onEscapeKeydown),
		enabled: box.with(() => enabled)
	});
	children?.($$payload);
	$$payload.out += `<!---->`;
	pop();
}
function createFocusScopeAPI() {
	let paused = false;
	return {
		id: useId(),
		get paused() {
			return paused;
		},
		pause() {
			paused = true;
		},
		resume() {
			paused = false;
		}
	};
}
function focus(element, { select = false } = {}) {
	if (!(element && element.focus)) return;
	const previouslyFocusedElement = document.activeElement;
	element.focus({ preventScroll: true });
	if (element !== previouslyFocusedElement && isSelectableInput(element) && select) {
		element.select();
	}
}
function findVisible(elements, container) {
	for (const element of elements) {
		if (!isElementHidden(element, container)) return element;
	}
}
function getTabbableCandidates(container) {
	const nodes = [];
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
		// eslint-disable-next-line ts/no-explicit-any
		acceptNode: (node) => {
			const isHiddenInput = node.tagName === 'INPUT' && node.type === 'hidden';
			if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
			return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
		}
	});
	while (walker.nextNode()) nodes.push(walker.currentNode);
	return nodes;
}
function getTabbableEdges(container) {
	const candidates = getTabbableCandidates(container);
	const first = findVisible(candidates, container);
	const last = findVisible(candidates.reverse(), container);
	return [first, last];
}
function useFocusScope({
	id,
	loop,
	enabled,
	onOpenAutoFocus,
	onCloseAutoFocus,
	forceMount
}) {
	const focusScope = createFocusScopeAPI();
	const ref = box(null);
	useRefById({ id, ref, deps: () => enabled.current });
	function handleKeydown(e) {
		if (!enabled.current) return;
		if (!loop.current && !enabled.current) return;
		if (focusScope.paused) return;
		const isTabKey = e.key === TAB && !e.ctrlKey && !e.altKey && !e.metaKey;
		const focusedElement = document.activeElement;
		if (!(isTabKey && focusedElement)) return;
		const container = ref.current;
		if (!container) return;
		const [first, last] = getTabbableEdges(container);
		const hasTabbableElementsInside = first && last;
		if (!hasTabbableElementsInside) {
			if (focusedElement === container) {
				e.preventDefault();
			}
		} else {
			if (!e.shiftKey && focusedElement === last) {
				e.preventDefault();
				if (loop.current) focus(first, { select: true });
			} else if (e.shiftKey && focusedElement === first) {
				e.preventDefault();
				if (loop.current) focus(last, { select: true });
			}
		}
	}
	const props = (() => ({
		id: id.current,
		tabindex: -1,
		onkeydown: handleKeydown
	}))();
	return {
		get props() {
			return props;
		}
	};
}
function Focus_scope($$payload, $$props) {
	push();
	let {
		id,
		trapFocus = false,
		loop = false,
		onCloseAutoFocus = noop,
		onOpenAutoFocus = noop,
		focusScope,
		forceMount = false
	} = $$props;
	const focusScopeState = useFocusScope({
		enabled: box.with(() => trapFocus),
		loop: box.with(() => loop),
		onCloseAutoFocus: box.with(() => onCloseAutoFocus),
		onOpenAutoFocus: box.with(() => onOpenAutoFocus),
		id: box.with(() => id),
		forceMount: box.with(() => forceMount)
	});
	focusScope?.($$payload, { props: focusScopeState.props });
	$$payload.out += `<!---->`;
	pop();
}
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
class TextSelectionLayerState {
	#id;
	#onPointerDownProp;
	#onPointerUpProp;
	#enabled;
	#unsubSelectionLock = noop;
	#ref = box(null);
	constructor(props) {
		this.#id = props.id;
		this.#enabled = props.preventOverflowTextSelection;
		this.#onPointerDownProp = props.onPointerDown;
		this.#onPointerUpProp = props.onPointerUp;
		useRefById({
			id: this.#id,
			ref: this.#ref,
			deps: () => this.#enabled.current
		});
	}
	#addEventListeners() {
		return executeCallbacks(
			addEventListener$1(document, 'pointerdown', this.#pointerdown),
			addEventListener$1(
				document,
				'pointerup',
				composeHandlers(this.#resetSelectionLock, this.#onPointerUpProp)
			)
		);
	}
	#pointerdown = (e) => {
		const node = this.#ref.current;
		const target = e.target;
		if (!isHTMLElement$1(node) || !isHTMLElement$1(target) || !this.#enabled.current)
			return;
		if (!isHighestLayer(this) || !isOrContainsTarget(node, target)) return;
		this.#onPointerDownProp.current(e);
		if (e.defaultPrevented) return;
		this.#unsubSelectionLock = preventTextSelectionOverflow(node);
	};
	#resetSelectionLock = () => {
		this.#unsubSelectionLock();
		this.#unsubSelectionLock = noop;
	};
}
function useTextSelectionLayer(props) {
	return new TextSelectionLayerState(props);
}
const getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node) {
	const body = document.body;
	const originalBodyUserSelect = getUserSelect(body);
	const originalNodeUserSelect = getUserSelect(node);
	setUserSelect(body, 'none');
	setUserSelect(node, 'text');
	return () => {
		setUserSelect(body, originalBodyUserSelect);
		setUserSelect(node, originalNodeUserSelect);
	};
}
function setUserSelect(node, value) {
	node.style.userSelect = value;
	node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
	const layersArr = [...globalThis.bitsTextSelectionLayers];
	if (!layersArr.length) return false;
	const highestLayer = layersArr.at(-1);
	if (!highestLayer) return false;
	return highestLayer[0] === instance;
}
function Text_selection_layer($$payload, $$props) {
	push();
	let {
		preventOverflowTextSelection = true,
		onPointerDown = noop,
		onPointerUp = noop,
		id,
		children,
		enabled
	} = $$props;
	useTextSelectionLayer({
		id: box.with(() => id),
		preventOverflowTextSelection: box.with(() => preventOverflowTextSelection),
		onPointerDown: box.with(() => onPointerDown),
		onPointerUp: box.with(() => onPointerUp),
		enabled: box.with(() => enabled)
	});
	children?.($$payload);
	$$payload.out += `<!---->`;
	pop();
}
function createSharedHook(factory) {
	let state = void 0;
	return (...args) => {
		return state;
	};
}
const useBodyLockStackCount = createSharedHook();
function useBodyScrollLock(initialState, restoreScrollDelay = () => null) {
	const id = useId();
	const countState = useBodyLockStackCount();
	restoreScrollDelay();
	countState.map.set(id, initialState ?? false);
	const locked = box.with(
		() => countState.map.get(id) ?? false,
		(v) => countState.map.set(id, v)
	);
	return locked;
}
function Scroll_lock($$payload, $$props) {
	push();
	let { preventScroll = true, restoreScrollDelay = null } = $$props;
	useBodyScrollLock(preventScroll, () => restoreScrollDelay);
	pop();
}
const sides = ['top', 'right', 'bottom', 'left'];
const min = Math.min;
const max = Math.max;
const round = Math.round;
const createCoords = (v) => ({
	x: v,
	y: v
});
const oppositeSideMap = {
	left: 'right',
	right: 'left',
	bottom: 'top',
	top: 'bottom'
};
const oppositeAlignmentMap = {
	start: 'end',
	end: 'start'
};
function clamp(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
	return placement.split('-')[0];
}
function getAlignment(placement) {
	return placement.split('-')[1];
}
function getOppositeAxis(axis) {
	return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
	return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
	return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) {
		rtl = false;
	}
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide =
		alignmentAxis === 'x'
			? alignment === (rtl ? 'end' : 'start')
				? 'right'
				: 'left'
			: alignment === 'start'
				? 'bottom'
				: 'top';
	if (rects.reference[length] > rects.floating[length]) {
		mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	}
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.replace(
		/start|end/g,
		(alignment) => oppositeAlignmentMap[alignment]
	);
}
function getSideList(side, isStart, rtl) {
	const lr = ['left', 'right'];
	const rl = ['right', 'left'];
	const tb = ['top', 'bottom'];
	const bt = ['bottom', 'top'];
	switch (side) {
		case 'top':
		case 'bottom':
			if (rtl) return isStart ? rl : lr;
			return isStart ? lr : rl;
		case 'left':
		case 'right':
			return isStart ? tb : bt;
		default:
			return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === 'start', rtl);
	if (alignment) {
		list = list.map((side) => side + '-' + alignment);
		if (flipAlignment) {
			list = list.concat(list.map(getOppositeAlignmentPlacement));
		}
	}
	return list;
}
function getOppositePlacement(placement) {
	return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...padding
	};
}
function getPaddingObject(padding) {
	return typeof padding !== 'number'
		? expandPaddingObject(padding)
		: {
				top: padding,
				right: padding,
				bottom: padding,
				left: padding
			};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === 'y';
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case 'top':
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case 'bottom':
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case 'right':
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case 'left':
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default:
			coords = {
				x: reference.x,
				y: reference.y
			};
	}
	switch (getAlignment(placement)) {
		case 'start':
			coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
			break;
		case 'end':
			coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
			break;
	}
	return coords;
}
const computePosition$1 = async (reference, floating, config) => {
	const {
		placement = 'bottom',
		strategy = 'absolute',
		middleware = [],
		platform: platform2
	} = config;
	const validMiddleware = middleware.filter(Boolean);
	const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
	let rects = await platform2.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let middlewareData = {};
	let resetCount = 0;
	for (let i = 0; i < validMiddleware.length; i++) {
		const { name, fn } = validMiddleware[i];
		const {
			x: nextX,
			y: nextY,
			data,
			reset
		} = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platform2,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData = {
			...middlewareData,
			[name]: {
				...middlewareData[name],
				...data
			}
		};
		if (reset && resetCount <= 50) {
			resetCount++;
			if (typeof reset === 'object') {
				if (reset.placement) {
					statefulPlacement = reset.placement;
				}
				if (reset.rects) {
					rects =
						reset.rects === true
							? await platform2.getElementRects({
									reference,
									floating,
									strategy
								})
							: reset.rects;
				}
				({ x, y } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
};
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) {
		options = {};
	}
	const { x, y, platform: platform2, rects, elements, strategy } = state;
	const {
		boundary = 'clippingAncestors',
		rootBoundary = 'viewport',
		elementContext = 'floating',
		altBoundary = false,
		padding = 0
	} = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const altContext = elementContext === 'floating' ? 'reference' : 'floating';
	const element = elements[altBoundary ? altContext : elementContext];
	const clippingClientRect = rectToClientRect(
		await platform2.getClippingRect({
			element: (
				(_await$platform$isEle = await (platform2.isElement == null
					? void 0
					: platform2.isElement(element))) != null
					? _await$platform$isEle
					: true
			)
				? element
				: element.contextElement ||
					(await (platform2.getDocumentElement == null
						? void 0
						: platform2.getDocumentElement(elements.floating))),
			boundary,
			rootBoundary,
			strategy
		})
	);
	const rect =
		elementContext === 'floating'
			? {
					x,
					y,
					width: rects.floating.width,
					height: rects.floating.height
				}
			: rects.reference;
	const offsetParent = await (platform2.getOffsetParent == null
		? void 0
		: platform2.getOffsetParent(elements.floating));
	const offsetScale = (await (platform2.isElement == null
		? void 0
		: platform2.isElement(offsetParent)))
		? (await (platform2.getScale == null
				? void 0
				: platform2.getScale(offsetParent))) || {
				x: 1,
				y: 1
			}
		: {
				x: 1,
				y: 1
			};
	const elementClientRect = rectToClientRect(
		platform2.convertOffsetParentRelativeRectToViewportRelativeRect
			? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
					elements,
					rect,
					offsetParent,
					strategy
				})
			: rect
	);
	return {
		top:
			(clippingClientRect.top - elementClientRect.top + paddingObject.top) /
			offsetScale.y,
		bottom:
			(elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) /
			offsetScale.y,
		left:
			(clippingClientRect.left - elementClientRect.left + paddingObject.left) /
			offsetScale.x,
		right:
			(elementClientRect.right - clippingClientRect.right + paddingObject.right) /
			offsetScale.x
	};
}
const arrow$1 = (options) => ({
	name: 'arrow',
	options,
	async fn(state) {
		const {
			x,
			y,
			placement,
			rects,
			platform: platform2,
			elements,
			middlewareData
		} = state;
		const { element, padding = 0 } = evaluate(options, state) || {};
		if (element == null) {
			return {};
		}
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform2.getDimensions(element);
		const isYAxis = axis === 'y';
		const minProp = isYAxis ? 'top' : 'left';
		const maxProp = isYAxis ? 'bottom' : 'right';
		const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
		const endDiff =
			rects.reference[length] +
			rects.reference[axis] -
			coords[axis] -
			rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = await (platform2.getOffsetParent == null
			? void 0
			: platform2.getOffsetParent(element));
		let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
		if (
			!clientSize ||
			!(await (platform2.isElement == null
				? void 0
				: platform2.isElement(arrowOffsetParent)))
		) {
			clientSize = elements.floating[clientProp] || rects.floating[length];
		}
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
		const min$1 = minPadding;
		const max2 = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset2 = clamp(min$1, center, max2);
		const shouldAddOffset =
			!middlewareData.arrow &&
			getAlignment(placement) != null &&
			center !== offset2 &&
			rects.reference[length] / 2 -
				(center < min$1 ? minPadding : maxPadding) -
				arrowDimensions[length] / 2 <
				0;
		const alignmentOffset = shouldAddOffset
			? center < min$1
				? center - min$1
				: center - max2
			: 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset2,
				centerOffset: center - offset2 - alignmentOffset,
				...(shouldAddOffset && {
					alignmentOffset
				})
			},
			reset: shouldAddOffset
		};
	}
});
const flip$1 = function (options) {
	if (options === void 0) {
		options = {};
	}
	return {
		name: 'flip',
		options,
		async fn(state) {
			var _middlewareData$arrow, _middlewareData$flip;
			const {
				placement,
				middlewareData,
				rects,
				initialPlacement,
				platform: platform2,
				elements
			} = state;
			const {
				mainAxis: checkMainAxis = true,
				crossAxis: checkCrossAxis = true,
				fallbackPlacements: specifiedFallbackPlacements,
				fallbackStrategy = 'bestFit',
				fallbackAxisSideDirection = 'none',
				flipAlignment = true,
				...detectOverflowOptions
			} = evaluate(options, state);
			if (
				(_middlewareData$arrow = middlewareData.arrow) != null &&
				_middlewareData$arrow.alignmentOffset
			) {
				return {};
			}
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform2.isRTL == null
				? void 0
				: platform2.isRTL(elements.floating));
			const fallbackPlacements =
				specifiedFallbackPlacements ||
				(isBasePlacement || !flipAlignment
					? [getOppositePlacement(initialPlacement)]
					: getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
				fallbackPlacements.push(
					...getOppositeAxisPlacements(
						initialPlacement,
						flipAlignment,
						fallbackAxisSideDirection,
						rtl
					)
				);
			}
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData =
				((_middlewareData$flip = middlewareData.flip) == null
					? void 0
					: _middlewareData$flip.overflows) || [];
			if (checkMainAxis) {
				overflows.push(overflow[side]);
			}
			if (checkCrossAxis) {
				const sides2 = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
			}
			overflowsData = [
				...overflowsData,
				{
					placement,
					overflows
				}
			];
			if (!overflows.every((side2) => side2 <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex =
					(((_middlewareData$flip2 = middlewareData.flip) == null
						? void 0
						: _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					var _overflowsData$;
					const ignoreCrossAxisOverflow =
						checkCrossAxis === 'alignment'
							? initialSideAxis !== getSideAxis(nextPlacement)
							: false;
					const hasInitialMainAxisOverflow =
						((_overflowsData$ = overflowsData[0]) == null
							? void 0
							: _overflowsData$.overflows[0]) > 0;
					if (!ignoreCrossAxisOverflow || hasInitialMainAxisOverflow) {
						return {
							data: {
								index: nextIndex,
								overflows: overflowsData
							},
							reset: {
								placement: nextPlacement
							}
						};
					}
				}
				let resetPlacement =
					(_overflowsData$filter = overflowsData
						.filter((d) => d.overflows[0] <= 0)
						.sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null
						? void 0
						: _overflowsData$filter.placement;
				if (!resetPlacement) {
					switch (fallbackStrategy) {
						case 'bestFit': {
							var _overflowsData$filter2;
							const placement2 =
								(_overflowsData$filter2 = overflowsData
									.filter((d) => {
										if (hasFallbackAxisSideDirection) {
											const currentSideAxis = getSideAxis(d.placement);
											return (
												currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
												// reading directions favoring greater width.
												currentSideAxis === 'y'
											);
										}
										return true;
									})
									.map((d) => [
										d.placement,
										d.overflows
											.filter((overflow2) => overflow2 > 0)
											.reduce((acc, overflow2) => acc + overflow2, 0)
									])
									.sort((a, b) => a[1] - b[1])[0]) == null
									? void 0
									: _overflowsData$filter2[0];
							if (placement2) {
								resetPlacement = placement2;
							}
							break;
						}
						case 'initialPlacement':
							resetPlacement = initialPlacement;
							break;
					}
				}
				if (placement !== resetPlacement) {
					return {
						reset: {
							placement: resetPlacement
						}
					};
				}
			}
			return {};
		}
	};
};
function getSideOffsets(overflow, rect) {
	return {
		top: overflow.top - rect.height,
		right: overflow.right - rect.width,
		bottom: overflow.bottom - rect.height,
		left: overflow.left - rect.width
	};
}
function isAnySideFullyClipped(overflow) {
	return sides.some((side) => overflow[side] >= 0);
}
const hide$1 = function (options) {
	if (options === void 0) {
		options = {};
	}
	return {
		name: 'hide',
		options,
		async fn(state) {
			const { rects } = state;
			const { strategy = 'referenceHidden', ...detectOverflowOptions } = evaluate(
				options,
				state
			);
			switch (strategy) {
				case 'referenceHidden': {
					const overflow = await detectOverflow(state, {
						...detectOverflowOptions,
						elementContext: 'reference'
					});
					const offsets = getSideOffsets(overflow, rects.reference);
					return {
						data: {
							referenceHiddenOffsets: offsets,
							referenceHidden: isAnySideFullyClipped(offsets)
						}
					};
				}
				case 'escaped': {
					const overflow = await detectOverflow(state, {
						...detectOverflowOptions,
						altBoundary: true
					});
					const offsets = getSideOffsets(overflow, rects.floating);
					return {
						data: {
							escapedOffsets: offsets,
							escaped: isAnySideFullyClipped(offsets)
						}
					};
				}
				default: {
					return {};
				}
			}
		}
	};
};
async function convertValueToCoords(state, options) {
	const { placement, platform: platform2, elements } = state;
	const rtl = await (platform2.isRTL == null
		? void 0
		: platform2.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === 'y';
	const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } =
		typeof rawValue === 'number'
			? {
					mainAxis: rawValue,
					crossAxis: 0,
					alignmentAxis: null
				}
			: {
					mainAxis: rawValue.mainAxis || 0,
					crossAxis: rawValue.crossAxis || 0,
					alignmentAxis: rawValue.alignmentAxis
				};
	if (alignment && typeof alignmentAxis === 'number') {
		crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
	}
	return isVertical
		? {
				x: crossAxis * crossAxisMulti,
				y: mainAxis * mainAxisMulti
			}
		: {
				x: mainAxis * mainAxisMulti,
				y: crossAxis * crossAxisMulti
			};
}
const offset$1 = function (options) {
	if (options === void 0) {
		options = 0;
	}
	return {
		name: 'offset',
		options,
		async fn(state) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (
				placement ===
					((_middlewareData$offse = middlewareData.offset) == null
						? void 0
						: _middlewareData$offse.placement) &&
				(_middlewareData$arrow = middlewareData.arrow) != null &&
				_middlewareData$arrow.alignmentOffset
			) {
				return {};
			}
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
};
const shift$1 = function (options) {
	if (options === void 0) {
		options = {};
	}
	return {
		name: 'shift',
		options,
		async fn(state) {
			const { x, y, placement } = state;
			const {
				mainAxis: checkMainAxis = true,
				crossAxis: checkCrossAxis = false,
				limiter = {
					fn: (_ref) => {
						let { x: x2, y: y2 } = _ref;
						return {
							x: x2,
							y: y2
						};
					}
				},
				...detectOverflowOptions
			} = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(getSide(placement));
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			if (checkMainAxis) {
				const minSide = mainAxis === 'y' ? 'top' : 'left';
				const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
				const min2 = mainAxisCoord + overflow[minSide];
				const max2 = mainAxisCoord - overflow[maxSide];
				mainAxisCoord = clamp(min2, mainAxisCoord, max2);
			}
			if (checkCrossAxis) {
				const minSide = crossAxis === 'y' ? 'top' : 'left';
				const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
				const min2 = crossAxisCoord + overflow[minSide];
				const max2 = crossAxisCoord - overflow[maxSide];
				crossAxisCoord = clamp(min2, crossAxisCoord, max2);
			}
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
};
const limitShift$1 = function (options) {
	if (options === void 0) {
		options = {};
	}
	return {
		options,
		fn(state) {
			const { x, y, placement, rects, middlewareData } = state;
			const {
				offset: offset2 = 0,
				mainAxis: checkMainAxis = true,
				crossAxis: checkCrossAxis = true
			} = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const rawOffset = evaluate(offset2, state);
			const computedOffset =
				typeof rawOffset === 'number'
					? {
							mainAxis: rawOffset,
							crossAxis: 0
						}
					: {
							mainAxis: 0,
							crossAxis: 0,
							...rawOffset
						};
			if (checkMainAxis) {
				const len = mainAxis === 'y' ? 'height' : 'width';
				const limitMin =
					rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
				const limitMax =
					rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
				if (mainAxisCoord < limitMin) {
					mainAxisCoord = limitMin;
				} else if (mainAxisCoord > limitMax) {
					mainAxisCoord = limitMax;
				}
			}
			if (checkCrossAxis) {
				var _middlewareData$offse, _middlewareData$offse2;
				const len = mainAxis === 'y' ? 'width' : 'height';
				const isOriginSide = ['top', 'left'].includes(getSide(placement));
				const limitMin =
					rects.reference[crossAxis] -
					rects.floating[len] +
					(isOriginSide
						? ((_middlewareData$offse = middlewareData.offset) == null
								? void 0
								: _middlewareData$offse[crossAxis]) || 0
						: 0) +
					(isOriginSide ? 0 : computedOffset.crossAxis);
				const limitMax =
					rects.reference[crossAxis] +
					rects.reference[len] +
					(isOriginSide
						? 0
						: ((_middlewareData$offse2 = middlewareData.offset) == null
								? void 0
								: _middlewareData$offse2[crossAxis]) || 0) -
					(isOriginSide ? computedOffset.crossAxis : 0);
				if (crossAxisCoord < limitMin) {
					crossAxisCoord = limitMin;
				} else if (crossAxisCoord > limitMax) {
					crossAxisCoord = limitMax;
				}
			}
			return {
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			};
		}
	};
};
const size$1 = function (options) {
	if (options === void 0) {
		options = {};
	}
	return {
		name: 'size',
		options,
		async fn(state) {
			var _state$middlewareData, _state$middlewareData2;
			const { placement, rects, platform: platform2, elements } = state;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
			const overflow = await detectOverflow(state, detectOverflowOptions);
			const side = getSide(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === 'y';
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === 'top' || side === 'bottom') {
				heightSide = side;
				widthSide =
					alignment ===
					((await (platform2.isRTL == null
						? void 0
						: platform2.isRTL(elements.floating)))
						? 'start'
						: 'end')
						? 'left'
						: 'right';
			} else {
				widthSide = side;
				heightSide = alignment === 'end' ? 'top' : 'bottom';
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(
				height - overflow[heightSide],
				maximumClippingHeight
			);
			const overflowAvailableWidth = min(
				width - overflow[widthSide],
				maximumClippingWidth
			);
			const noShift = !state.middlewareData.shift;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if (
				(_state$middlewareData = state.middlewareData.shift) != null &&
				_state$middlewareData.enabled.x
			) {
				availableWidth = maximumClippingWidth;
			}
			if (
				(_state$middlewareData2 = state.middlewareData.shift) != null &&
				_state$middlewareData2.enabled.y
			) {
				availableHeight = maximumClippingHeight;
			}
			if (noShift && !alignment) {
				const xMin = max(overflow.left, 0);
				const xMax = max(overflow.right, 0);
				const yMin = max(overflow.top, 0);
				const yMax = max(overflow.bottom, 0);
				if (isYAxis) {
					availableWidth =
						width -
						2 *
							(xMin !== 0 || xMax !== 0
								? xMin + xMax
								: max(overflow.left, overflow.right));
				} else {
					availableHeight =
						height -
						2 *
							(yMin !== 0 || yMax !== 0
								? yMin + yMax
								: max(overflow.top, overflow.bottom));
				}
			}
			await apply({
				...state,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform2.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) {
				return {
					reset: {
						rects: true
					}
				};
			}
			return {};
		}
	};
};
function hasWindow() {
	return typeof window !== 'undefined';
}
function getNodeName(node) {
	if (isNode(node)) {
		return (node.nodeName || '').toLowerCase();
	}
	return '#document';
}
function getWindow(node) {
	var _node$ownerDocument;
	return (
		(node == null || (_node$ownerDocument = node.ownerDocument) == null
			? void 0
			: _node$ownerDocument.defaultView) || window
	);
}
function getDocumentElement(node) {
	var _ref;
	return (_ref =
		(isNode(node) ? node.ownerDocument : node.document) || window.document) == null
		? void 0
		: _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) {
		return false;
	}
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) {
		return false;
	}
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) {
		return false;
	}
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === 'undefined') {
		return false;
	}
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return (
		/auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
		!['inline', 'contents'].includes(display)
	);
}
function isTableElement(element) {
	return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isTopLayer(element) {
	return [':popover-open', ':modal'].some((selector) => {
		try {
			return element.matches(selector);
		} catch (e) {
			return false;
		}
	});
}
function isContainingBlock(elementOrCss) {
	const webkit = isWebKit();
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return (
		['transform', 'translate', 'scale', 'rotate', 'perspective'].some((value) =>
			css[value] ? css[value] !== 'none' : false
		) ||
		(css.containerType ? css.containerType !== 'normal' : false) ||
		(!webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false)) ||
		(!webkit && (css.filter ? css.filter !== 'none' : false)) ||
		['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'].some(
			(value) => (css.willChange || '').includes(value)
		) ||
		['paint', 'layout', 'strict', 'content'].some((value) =>
			(css.contain || '').includes(value)
		)
	);
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) {
			return currentNode;
		} else if (isTopLayer(currentNode)) {
			return null;
		}
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (typeof CSS === 'undefined' || !CSS.supports) return false;
	return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
	return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement(element)) {
		return {
			scrollLeft: element.scrollLeft,
			scrollTop: element.scrollTop
		};
	}
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === 'html') {
		return node;
	}
	const result =
		// Step into the shadow DOM of the parent of a slotted node.
		node.assignedSlot || // DOM Element detected.
		node.parentNode || // ShadowRoot detected.
		(isShadowRoot(node) && node.host) || // Fallback.
		getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) {
		return node.ownerDocument ? node.ownerDocument.body : node.body;
	}
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
		return parentNode;
	}
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) {
		list = [];
	}
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody =
		scrollableAncestor ===
		((_node$ownerDocument2 = node.ownerDocument) == null
			? void 0
			: _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		getFrameElement(win);
		return list.concat(
			win,
			win.visualViewport || [],
			isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
			[]
		);
	}
	return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, []));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement(element) {
	return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
	const domElement = unwrapElement(element);
	if (!isHTMLElement(domElement)) {
		return createCoords(1);
	}
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) {
		x = 1;
	}
	if (!y || !Number.isFinite(y)) {
		y = 1;
	}
	return {
		x,
		y
	};
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) {
		return noOffsets;
	}
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) {
		isFixed = false;
	}
	if (
		!floatingOffsetParent ||
		(isFixed && floatingOffsetParent !== getWindow(element))
	) {
		return false;
	}
	return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) {
		includeScale = false;
	}
	if (isFixedStrategy === void 0) {
		isFixedStrategy = false;
	}
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement(element);
	let scale = createCoords(1);
	if (includeScale) {
		if (offsetParent) {
			if (isElement(offsetParent)) {
				scale = getScale(offsetParent);
			}
		} else {
			scale = getScale(element);
		}
	}
	const visualOffsets = shouldAddVisualOffsets(
		domElement,
		isFixedStrategy,
		offsetParent
	)
		? getVisualOffsets(domElement)
		: createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement) {
		const win = getWindow(domElement);
		const offsetWin =
			offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetParent && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left =
				iframeRect.left +
				(currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top =
				iframeRect.top +
				(currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) {
		return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	}
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
	if (ignoreScrollbarX === void 0) {
		ignoreScrollbarX = false;
	}
	const htmlRect = documentElement.getBoundingClientRect();
	const x =
		htmlRect.left +
		scroll.scrollLeft -
		(ignoreScrollbarX
			? 0
			: // RTL <body> scrollbar.
				getWindowScrollBarX(documentElement, htmlRect));
	const y = htmlRect.top + scroll.scrollTop;
	return {
		x,
		y
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === 'fixed';
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || (topLayer && isFixed)) {
		return rect;
	}
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
		if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
			scroll = getNodeScroll(offsetParent);
		}
		if (isHTMLElement(offsetParent)) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset =
		documentElement && !isOffsetParentAnElement && !isFixed
			? getHTMLOffset(documentElement, scroll, true)
			: createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
	const html2 = getDocumentElement(element);
	const scroll = getNodeScroll(element);
	const body = element.ownerDocument.body;
	const width = max(
		html2.scrollWidth,
		html2.clientWidth,
		body.scrollWidth,
		body.clientWidth
	);
	const height = max(
		html2.scrollHeight,
		html2.clientHeight,
		body.scrollHeight,
		body.clientHeight
	);
	let x = -scroll.scrollLeft + getWindowScrollBarX(element);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === 'rtl') {
		x += max(html2.clientWidth, body.clientWidth) - width;
	}
	return {
		width,
		height,
		x,
		y
	};
}
function getViewportRect(element, strategy) {
	const win = getWindow(element);
	const html2 = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html2.clientWidth;
	let height = html2.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		const visualViewportBased = isWebKit();
		if (!visualViewportBased || (visualViewportBased && strategy === 'fixed')) {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	return {
		width,
		height,
		x,
		y
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
	const width = element.clientWidth * scale.x;
	const height = element.clientHeight * scale.y;
	const x = left * scale.x;
	const y = top * scale.y;
	return {
		width,
		height,
		x,
		y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === 'viewport') {
		rect = getViewportRect(element, strategy);
	} else if (clippingAncestor === 'document') {
		rect = getDocumentRect(getDocumentElement(element));
	} else if (isElement(clippingAncestor)) {
		rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	} else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
	const parentNode = getParentNode(element);
	if (
		parentNode === stopNode ||
		!isElement(parentNode) ||
		isLastTraversableNode(parentNode)
	) {
		return false;
	}
	return (
		getComputedStyle$1(parentNode).position === 'fixed' ||
		hasFixedPositionAncestor(parentNode, stopNode)
	);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) {
		return cachedResult;
	}
	let result = getOverflowAncestors(element, []).filter(
		(el) => isElement(el) && getNodeName(el) !== 'body'
	);
	let currentContainingBlockComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
			currentContainingBlockComputedStyle = null;
		}
		const shouldDropCurrentNode = elementIsFixed
			? !currentNodeIsContaining && !currentContainingBlockComputedStyle
			: (!currentNodeIsContaining &&
					computedStyle.position === 'static' &&
					!!currentContainingBlockComputedStyle &&
					['absolute', 'fixed'].includes(
						currentContainingBlockComputedStyle.position
					)) ||
				(isOverflowElement(currentNode) &&
					!currentNodeIsContaining &&
					hasFixedPositionAncestor(element, currentNode));
		if (shouldDropCurrentNode) {
			result = result.filter((ancestor) => ancestor !== currentNode);
		} else {
			currentContainingBlockComputedStyle = computedStyle;
		}
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const elementClippingAncestors =
		boundary === 'clippingAncestors'
			? isTopLayer(element)
				? []
				: getClippingElementAncestors(element, this._c)
			: [].concat(boundary);
	const clippingAncestors = [...elementClippingAncestors, rootBoundary];
	const firstClippingAncestor = clippingAncestors[0];
	const clippingRect = clippingAncestors.reduce(
		(accRect, clippingAncestor) => {
			const rect = getClientRectFromClippingAncestor(
				element,
				clippingAncestor,
				strategy
			);
			accRect.top = max(rect.top, accRect.top);
			accRect.right = min(rect.right, accRect.right);
			accRect.bottom = min(rect.bottom, accRect.bottom);
			accRect.left = max(rect.left, accRect.left);
			return accRect;
		},
		getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy)
	);
	return {
		width: clippingRect.right - clippingRect.left,
		height: clippingRect.bottom - clippingRect.top,
		x: clippingRect.left,
		y: clippingRect.top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === 'fixed';
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	function setLeftRTLScrollbarOffset() {
		offsets.x = getWindowScrollBarX(documentElement);
	}
	if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
		if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
			scroll = getNodeScroll(offsetParent);
		}
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(
				offsetParent,
				true,
				isFixed,
				offsetParent
			);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		} else if (documentElement) {
			setLeftRTLScrollbarOffset();
		}
	}
	if (isFixed && !isOffsetParentAnElement && documentElement) {
		setLeftRTLScrollbarOffset();
	}
	const htmlOffset =
		documentElement && !isOffsetParentAnElement && !isFixed
			? getHTMLOffset(documentElement, scroll)
			: createCoords(0);
	const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
	const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
	return {
		x,
		y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === 'static';
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
		return null;
	}
	if (polyfill) {
		return polyfill(element);
	}
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) {
		rawOffsetParent = rawOffsetParent.ownerDocument.body;
	}
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) {
		return win;
	}
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
				return svgOffsetParent;
			}
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (
		offsetParent &&
		isTableElement(offsetParent) &&
		isStaticPositioned(offsetParent)
	) {
		offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	}
	if (
		offsetParent &&
		isLastTraversableNode(offsetParent) &&
		isStaticPositioned(offsetParent) &&
		!isContainingBlock(offsetParent)
	) {
		return win;
	}
	return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function (data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(
			data.reference,
			await getOffsetParentFn(data.floating),
			data.strategy
		),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === 'rtl';
}
const platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
const offset = offset$1;
const shift = shift$1;
const flip = flip$1;
const size = size$1;
const hide = hide$1;
const arrow = arrow$1;
const limitShift = limitShift$1;
const computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = {
		platform,
		...options
	};
	const platformWithCache = {
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
function get(valueOrGetValue) {
	return typeof valueOrGetValue === 'function' ? valueOrGetValue() : valueOrGetValue;
}
function getDPR(element) {
	if (typeof window === 'undefined') return 1;
	const win = element.ownerDocument.defaultView || window;
	return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
	const dpr = getDPR(element);
	return Math.round(value * dpr) / dpr;
}
function getFloatingContentCSSVars(name) {
	return {
		[`--bits-${name}-content-transform-origin`]: `var(--bits-floating-transform-origin)`,
		[`--bits-${name}-content-available-width`]: `var(--bits-floating-available-width)`,
		[`--bits-${name}-content-available-height`]: `var(--bits-floating-available-height)`,
		[`--bits-${name}-anchor-width`]: `var(--bits-floating-anchor-width)`,
		[`--bits-${name}-anchor-height`]: `var(--bits-floating-anchor-height)`
	};
}
function useFloating(options) {
	get(options.open) ?? true;
	const middlewareOption = get(options.middleware);
	const transformOption = get(options.transform) ?? true;
	const placementOption = get(options.placement) ?? 'bottom';
	const strategyOption = get(options.strategy) ?? 'absolute';
	const reference = options.reference;
	let x = 0;
	let y = 0;
	const floating = box(null);
	let strategy = strategyOption;
	let placement = placementOption;
	let middlewareData = {};
	let isPositioned = false;
	const floatingStyles = (() => {
		const initialStyles = { position: strategy, left: '0', top: '0' };
		if (!floating.current) {
			return initialStyles;
		}
		const xVal = roundByDPR(floating.current, x);
		const yVal = roundByDPR(floating.current, y);
		if (transformOption) {
			return {
				...initialStyles,
				transform: `translate(${xVal}px, ${yVal}px)`,
				...(getDPR(floating.current) >= 1.5 && { willChange: 'transform' })
			};
		}
		return {
			position: strategy,
			left: `${xVal}px`,
			top: `${yVal}px`
		};
	})();
	function update() {
		if (reference.current === null || floating.current === null) return;
		computePosition(reference.current, floating.current, {
			middleware: middlewareOption,
			placement: placementOption,
			strategy: strategyOption
		}).then((position) => {
			x = position.x;
			y = position.y;
			strategy = position.strategy;
			placement = position.placement;
			middlewareData = position.middlewareData;
			isPositioned = true;
		});
	}
	return {
		floating,
		reference,
		get strategy() {
			return strategy;
		},
		get placement() {
			return placement;
		},
		get middlewareData() {
			return middlewareData;
		},
		get isPositioned() {
			return isPositioned;
		},
		get floatingStyles() {
			return floatingStyles;
		},
		get update() {
			return update;
		}
	};
}
const OPPOSITE_SIDE = {
	top: 'bottom',
	right: 'left',
	bottom: 'top',
	left: 'right'
};
class FloatingRootState {
	anchorNode = box(null);
	customAnchorNode = box(null);
	triggerNode = box(null);
	constructor() {}
}
class FloatingContentState {
	// state
	root;
	// nodes
	contentRef = box(null);
	wrapperRef = box(null);
	arrowRef = box(null);
	// ids
	arrowId = box(useId());
	id;
	wrapperId;
	style;
	#transformedStyle = once(() => {
		if (typeof this.style === 'string') return cssToStyleObj(this.style);
		if (!this.style) return {};
	});
	#dir;
	#side;
	#sideOffset;
	#align;
	#alignOffset;
	#arrowPadding;
	#avoidCollisions;
	#collisionBoundary;
	#collisionPadding;
	#sticky;
	#hideWhenDetached;
	#strategy;
	#updatePositionStrategy = void 0;
	onPlaced;
	enabled;
	#arrowSize = new ElementSize(() => this.arrowRef.current ?? void 0);
	#arrowWidth = once(() => this.#arrowSize?.width ?? 0);
	#arrowHeight = once(() => this.#arrowSize?.height ?? 0);
	#desiredPlacement = once(
		() =>
			this.#side?.current +
			(this.#align.current !== 'center' ? `-${this.#align.current}` : '')
	);
	#boundary = once(() =>
		Array.isArray(this.#collisionBoundary.current)
			? this.#collisionBoundary.current
			: [this.#collisionBoundary.current]
	);
	#hasExplicitBoundaries = once(() => this.#boundary().length > 0);
	get hasExplicitBoundaries() {
		return this.#hasExplicitBoundaries();
	}
	#detectOverflowOptions = once(() => ({
		padding: this.#collisionPadding.current,
		boundary: this.#boundary().filter(isNotNull),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return this.#detectOverflowOptions();
	}
	#availableWidth = void 0;
	#availableHeight = void 0;
	#anchorWidth = void 0;
	#anchorHeight = void 0;
	#middleware = once(() =>
		[
			offset({
				mainAxis: this.#sideOffset.current + this.#arrowHeight(),
				alignmentAxis: this.#alignOffset.current
			}),
			this.#avoidCollisions.current &&
				shift({
					mainAxis: true,
					crossAxis: false,
					limiter: this.#sticky.current === 'partial' ? limitShift() : void 0,
					...this.detectOverflowOptions
				}),
			this.#avoidCollisions.current && flip({ ...this.detectOverflowOptions }),
			size({
				...this.detectOverflowOptions,
				apply: ({ rects, availableWidth, availableHeight }) => {
					const { width: anchorWidth, height: anchorHeight } = rects.reference;
					this.#availableWidth = availableWidth;
					this.#availableHeight = availableHeight;
					this.#anchorWidth = anchorWidth;
					this.#anchorHeight = anchorHeight;
				}
			}),
			this.arrowRef.current &&
				arrow({
					element: this.arrowRef.current,
					padding: this.#arrowPadding.current
				}),
			transformOrigin({
				arrowWidth: this.#arrowWidth(),
				arrowHeight: this.#arrowHeight()
			}),
			this.#hideWhenDetached.current &&
				hide({
					strategy: 'referenceHidden',
					...this.detectOverflowOptions
				})
		].filter(Boolean)
	);
	get middleware() {
		return this.#middleware();
	}
	floating;
	#placedSide = once(() => getSideFromPlacement(this.floating.placement));
	get placedSide() {
		return this.#placedSide();
	}
	#placedAlign = once(() => getAlignFromPlacement(this.floating.placement));
	get placedAlign() {
		return this.#placedAlign();
	}
	#arrowX = once(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return this.#arrowX();
	}
	#arrowY = once(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return this.#arrowY();
	}
	#cannotCenterArrow = once(
		() => this.floating.middlewareData.arrow?.centerOffset !== 0
	);
	get cannotCenterArrow() {
		return this.#cannotCenterArrow();
	}
	contentZIndex;
	#arrowBaseSide = once(() => OPPOSITE_SIDE[this.placedSide]);
	get arrowBaseSide() {
		return this.#arrowBaseSide();
	}
	#wrapperProps = once(() => ({
		id: this.wrapperId.current,
		'data-bits-floating-content-wrapper': '',
		style: {
			...this.floating.floatingStyles,
			// keep off page when measuring
			transform: this.floating.isPositioned
				? this.floating.floatingStyles.transform
				: 'translate(0, -200%)',
			minWidth: 'max-content',
			zIndex: this.contentZIndex,
			'--bits-floating-transform-origin': `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			'--bits-floating-available-width': `${this.#availableWidth}px`,
			'--bits-floating-available-height': `${this.#availableHeight}px`,
			'--bits-floating-anchor-width': `${this.#anchorWidth}px`,
			'--bits-floating-anchor-height': `${this.#anchorHeight}px`,
			// hide the content if using the hide middleware and should be hidden
			...(this.floating.middlewareData.hide?.referenceHidden && {
				visibility: 'hidden',
				'pointer-events': 'none'
			}),
			...this.#transformedStyle()
		},
		// Floating UI calculates logical alignment based the `dir` attribute
		dir: this.#dir.current
	}));
	get wrapperProps() {
		return this.#wrapperProps();
	}
	#props = once(() => ({
		'data-side': this.placedSide,
		'data-align': this.placedAlign,
		style: styleToString({
			...this.#transformedStyle()
			// if the FloatingContent hasn't been placed yet (not all measurements done)
		})
	}));
	get props() {
		return this.#props();
	}
	#arrowStyle = once(() => ({
		position: 'absolute',
		left: this.arrowX ? `${this.arrowX}px` : void 0,
		top: this.arrowY ? `${this.arrowY}px` : void 0,
		[this.arrowBaseSide]: 0,
		'transform-origin': {
			top: '',
			right: '0 0',
			bottom: 'center 0',
			left: '100% 0'
		}[this.placedSide],
		transform: {
			top: 'translateY(100%)',
			right: 'translateY(50%) rotate(90deg) translateX(-50%)',
			bottom: 'rotate(180deg)',
			left: 'translateY(50%) rotate(-90deg) translateX(50%)'
		}[this.placedSide],
		visibility: this.cannotCenterArrow ? 'hidden' : void 0
	}));
	get arrowStyle() {
		return this.#arrowStyle();
	}
	constructor(props, root) {
		this.id = props.id;
		this.#side = props.side;
		this.#sideOffset = props.sideOffset;
		this.#align = props.align;
		this.#alignOffset = props.alignOffset;
		this.#arrowPadding = props.arrowPadding;
		this.#avoidCollisions = props.avoidCollisions;
		this.#collisionBoundary = props.collisionBoundary;
		this.#collisionPadding = props.collisionPadding;
		this.#sticky = props.sticky;
		this.#hideWhenDetached = props.hideWhenDetached;
		this.#updatePositionStrategy = props.updatePositionStrategy;
		this.onPlaced = props.onPlaced;
		this.#strategy = props.strategy;
		this.#dir = props.dir;
		this.style = props.style;
		this.root = root;
		this.enabled = props.enabled;
		this.wrapperId = props.wrapperId;
		if (props.customAnchor) {
			this.root.customAnchorNode.current = props.customAnchor.current;
		}
		useRefById({
			id: this.wrapperId,
			ref: this.wrapperRef,
			deps: () => this.enabled.current
		});
		useRefById({
			id: this.id,
			ref: this.contentRef,
			deps: () => this.enabled.current
		});
		this.floating = useFloating({
			strategy: () => this.#strategy.current,
			placement: () => this.#desiredPlacement(),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			open: () => this.enabled.current
		});
	}
}
class FloatingAnchorState {
	ref = box(null);
	constructor(props, root) {
		if (props.virtualEl && props.virtualEl.current) {
			root.triggerNode = box.from(props.virtualEl.current);
		} else {
			useRefById({
				id: props.id,
				ref: this.ref,
				onRefChange: (node) => {
					root.triggerNode.current = node;
				}
			});
		}
	}
}
const [setFloatingRootContext, getFloatingRootContext] = createContext('Floating.Root');
const [setFloatingContentContext, getFloatingContentContext] =
	createContext('Floating.Content');
function useFloatingRootState() {
	return setFloatingRootContext(new FloatingRootState());
}
function useFloatingContentState(props) {
	return setFloatingContentContext(
		new FloatingContentState(props, getFloatingRootContext())
	);
}
function useFloatingAnchorState(props) {
	return new FloatingAnchorState(props, getFloatingRootContext());
}
function transformOrigin(options) {
	return {
		name: 'transformOrigin',
		options,
		fn(data) {
			const { placement, rects, middlewareData } = data;
			const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
			const isArrowHidden = cannotCenterArrow;
			const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
			const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
			const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
			const noArrowAlign = { start: '0%', center: '50%', end: '100%' }[placedAlign];
			const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
			const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
			let x = '';
			let y = '';
			if (placedSide === 'bottom') {
				x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
				y = `${-arrowHeight}px`;
			} else if (placedSide === 'top') {
				x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
				y = `${rects.floating.height + arrowHeight}px`;
			} else if (placedSide === 'right') {
				x = `${-arrowHeight}px`;
				y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
			} else if (placedSide === 'left') {
				x = `${rects.floating.width + arrowHeight}px`;
				y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
			}
			return { data: { x, y } };
		}
	};
}
function getSideAndAlignFromPlacement(placement) {
	const [side, align = 'center'] = placement.split('-');
	return [side, align];
}
function getSideFromPlacement(placement) {
	return getSideAndAlignFromPlacement(placement)[0];
}
function getAlignFromPlacement(placement) {
	return getSideAndAlignFromPlacement(placement)[1];
}
function Floating_layer($$payload, $$props) {
	push();
	let { children } = $$props;
	useFloatingRootState();
	children?.($$payload);
	$$payload.out += `<!---->`;
	pop();
}
function Floating_layer_anchor($$payload, $$props) {
	push();
	let { id, children, virtualEl } = $$props;
	useFloatingAnchorState({
		id: box.with(() => id),
		virtualEl: box.with(() => virtualEl)
	});
	children?.($$payload);
	$$payload.out += `<!---->`;
	pop();
}
function Floating_layer_content($$payload, $$props) {
	push();
	let {
		content,
		side = 'bottom',
		sideOffset = 0,
		align = 'center',
		alignOffset = 0,
		id,
		arrowPadding = 0,
		avoidCollisions = true,
		collisionBoundary = [],
		collisionPadding = 0,
		hideWhenDetached = false,
		onPlaced = () => {},
		sticky = 'partial',
		updatePositionStrategy = 'optimized',
		strategy = 'fixed',
		dir = 'ltr',
		style = {},
		wrapperId = useId(),
		customAnchor = null
	} = $$props;
	const contentState = useFloatingContentState({
		side: box.with(() => side),
		sideOffset: box.with(() => sideOffset),
		align: box.with(() => align),
		alignOffset: box.with(() => alignOffset),
		id: box.with(() => id),
		arrowPadding: box.with(() => arrowPadding),
		avoidCollisions: box.with(() => avoidCollisions),
		collisionBoundary: box.with(() => collisionBoundary),
		collisionPadding: box.with(() => collisionPadding),
		hideWhenDetached: box.with(() => hideWhenDetached),
		onPlaced: box.with(() => onPlaced),
		sticky: box.with(() => sticky),
		updatePositionStrategy: box.with(() => updatePositionStrategy),
		strategy: box.with(() => strategy),
		dir: box.with(() => dir),
		style: box.with(() => style),
		enabled: box.with(() => false),
		wrapperId: box.with(() => wrapperId),
		customAnchor: box.with(() => customAnchor)
	});
	const mergedProps = mergeProps(contentState.wrapperProps, {
		style: { pointerEvents: 'auto' }
	});
	content?.($$payload, {
		props: contentState.props,
		wrapperProps: mergedProps
	});
	$$payload.out += `<!---->`;
	pop();
}
function Floating_layer_content_static($$payload, $$props) {
	push();
	let { content } = $$props;
	content?.($$payload, { props: {}, wrapperProps: {} });
	$$payload.out += `<!---->`;
	pop();
}
const ROOT_ATTR = 'data-separator-root';
class SeparatorRootState {
	#id;
	#ref;
	#orientation;
	#decorative;
	constructor(props) {
		this.#orientation = props.orientation;
		this.#decorative = props.decorative;
		this.#id = props.id;
		this.#ref = props.ref;
		useRefById({ id: this.#id, ref: this.#ref });
	}
	#props = once(() => ({
		id: this.#id.current,
		role: this.#decorative.current ? 'none' : 'separator',
		'aria-orientation': getAriaOrientation(this.#orientation.current),
		'aria-hidden': getAriaHidden(this.#decorative.current),
		'data-orientation': getDataOrientation(this.#orientation.current),
		[ROOT_ATTR]: ''
	}));
	get props() {
		return this.#props();
	}
}
function useSeparatorRoot(props) {
	return new SeparatorRootState(props);
}
function Separator$1($$payload, $$props) {
	push();
	let {
		id = useId(),
		ref = null,
		child,
		children,
		decorative = false,
		orientation = 'horizontal',
		$$slots,
		$$events,
		...restProps
	} = $$props;
	const rootState = useSeparatorRoot({
		ref: box.with(
			() => ref,
			(v) => (ref = v)
		),
		id: box.with(() => id),
		decorative: box.with(() => decorative),
		orientation: box.with(() => orientation)
	});
	const mergedProps = mergeProps(restProps, rootState.props);
	if (child) {
		$$payload.out += '<!--[-->';
		child($$payload, { props: mergedProps });
		$$payload.out += `<!---->`;
	} else {
		$$payload.out += '<!--[!-->';
		$$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
		children?.($$payload);
		$$payload.out += `<!----></div>`;
	}
	$$payload.out += `<!--]-->`;
	bind_props($$props, { ref });
	pop();
}
function Popper_content($$payload, $$props) {
	let {
		content,
		isStatic = false,
		onPlaced,
		$$slots,
		$$events,
		...restProps
	} = $$props;
	if (isStatic) {
		$$payload.out += '<!--[-->';
		Floating_layer_content_static($$payload, { content });
	} else {
		$$payload.out += '<!--[!-->';
		Floating_layer_content($$payload, spread_props([{ content, onPlaced }, restProps]));
	}
	$$payload.out += `<!--]-->`;
}
function Popper_layer_inner($$payload, $$props) {
	push();
	let {
		popper,
		onEscapeKeydown,
		escapeKeydownBehavior,
		preventOverflowTextSelection,
		id,
		onPointerDown,
		onPointerUp,
		side,
		sideOffset,
		align,
		alignOffset,
		arrowPadding,
		avoidCollisions,
		collisionBoundary,
		collisionPadding,
		sticky,
		hideWhenDetached,
		updatePositionStrategy,
		strategy,
		dir,
		preventScroll,
		wrapperId,
		style,
		onPlaced,
		onInteractOutside,
		onCloseAutoFocus,
		onOpenAutoFocus,
		onFocusOutside,
		interactOutsideBehavior = 'close',
		loop,
		trapFocus = true,
		isValidEvent: isValidEvent2 = () => false,
		customAnchor = null,
		isStatic = false,
		enabled,
		$$slots,
		$$events,
		...restProps
	} = $$props;
	{
		let content = function ($$payload2, { props: floatingProps, wrapperProps }) {
			if (restProps.forceMount && enabled) {
				$$payload2.out += '<!--[-->';
				Scroll_lock($$payload2, { preventScroll });
			} else if (!restProps.forceMount) {
				$$payload2.out += '<!--[1-->';
				Scroll_lock($$payload2, { preventScroll });
			} else {
				$$payload2.out += '<!--[!-->';
			}
			$$payload2.out += `<!--]--> `;
			{
				let focusScope = function ($$payload3, { props: focusScopeProps }) {
					Escape_layer($$payload3, {
						onEscapeKeydown,
						escapeKeydownBehavior,
						enabled,
						children: ($$payload4) => {
							{
								let children = function ($$payload5, { props: dismissibleProps }) {
									Text_selection_layer($$payload5, {
										id,
										preventOverflowTextSelection,
										onPointerDown,
										onPointerUp,
										enabled,
										children: ($$payload6) => {
											popper?.($$payload6, {
												props: mergeProps(
													restProps,
													floatingProps,
													dismissibleProps,
													focusScopeProps,
													{ style: { pointerEvents: 'auto' } }
												),
												wrapperProps
											});
											$$payload6.out += `<!---->`;
										}
									});
								};
								Dismissible_layer($$payload4, {
									id,
									onInteractOutside,
									onFocusOutside,
									interactOutsideBehavior,
									isValidEvent: isValidEvent2,
									enabled,
									children
								});
							}
						}
					});
				};
				Focus_scope($$payload2, {
					id,
					onOpenAutoFocus,
					onCloseAutoFocus,
					loop,
					trapFocus: enabled && trapFocus,
					forceMount: restProps.forceMount,
					focusScope
				});
			}
			$$payload2.out += `<!---->`;
		};
		Popper_content($$payload, {
			isStatic,
			id,
			side,
			sideOffset,
			align,
			alignOffset,
			arrowPadding,
			avoidCollisions,
			collisionBoundary,
			collisionPadding,
			sticky,
			hideWhenDetached,
			updatePositionStrategy,
			strategy,
			dir,
			wrapperId,
			style,
			onPlaced,
			customAnchor,
			content,
			$$slots: { content: true }
		});
	}
	pop();
}
function Popper_layer($$payload, $$props) {
	let {
		popper,
		present,
		onEscapeKeydown,
		escapeKeydownBehavior,
		preventOverflowTextSelection,
		id,
		onPointerDown,
		onPointerUp,
		side,
		sideOffset,
		align,
		alignOffset,
		arrowPadding,
		avoidCollisions,
		collisionBoundary,
		collisionPadding,
		sticky,
		hideWhenDetached,
		updatePositionStrategy,
		strategy,
		dir,
		preventScroll,
		wrapperId,
		style,
		onPlaced,
		onInteractOutside,
		onCloseAutoFocus,
		onOpenAutoFocus,
		onFocusOutside,
		interactOutsideBehavior = 'close',
		loop,
		trapFocus = true,
		isValidEvent: isValidEvent2 = () => false,
		customAnchor = null,
		isStatic = false,
		$$slots,
		$$events,
		...restProps
	} = $$props;
	{
		let presence = function ($$payload2, { present: present2 }) {
			Popper_layer_inner(
				$$payload2,
				spread_props([
					{
						popper,
						onEscapeKeydown,
						escapeKeydownBehavior,
						preventOverflowTextSelection,
						id,
						onPointerDown,
						onPointerUp,
						side,
						sideOffset,
						align,
						alignOffset,
						arrowPadding,
						avoidCollisions,
						collisionBoundary,
						collisionPadding,
						sticky,
						hideWhenDetached,
						updatePositionStrategy,
						strategy,
						dir,
						preventScroll,
						wrapperId,
						style,
						onPlaced,
						customAnchor,
						isStatic,
						enabled: present2.current,
						onInteractOutside,
						onCloseAutoFocus,
						onOpenAutoFocus,
						interactOutsideBehavior,
						loop,
						trapFocus,
						isValidEvent: isValidEvent2,
						onFocusOutside,
						forceMount: false
					},
					restProps
				])
			);
		};
		Presence_layer(
			$$payload,
			spread_props([
				{ id, present },
				restProps,
				{ presence, $$slots: { presence: true } }
			])
		);
	}
}
function Popper_layer_force_mount($$payload, $$props) {
	let {
		popper,
		onEscapeKeydown,
		escapeKeydownBehavior,
		preventOverflowTextSelection,
		id,
		onPointerDown,
		onPointerUp,
		side,
		sideOffset,
		align,
		alignOffset,
		arrowPadding,
		avoidCollisions,
		collisionBoundary,
		collisionPadding,
		sticky,
		hideWhenDetached,
		updatePositionStrategy,
		strategy,
		dir,
		preventScroll,
		wrapperId,
		style,
		onPlaced,
		onInteractOutside,
		onCloseAutoFocus,
		onOpenAutoFocus,
		onFocusOutside,
		interactOutsideBehavior = 'close',
		loop,
		trapFocus = true,
		isValidEvent: isValidEvent2 = () => false,
		customAnchor = null,
		isStatic = false,
		enabled,
		$$slots,
		$$events,
		...restProps
	} = $$props;
	Popper_layer_inner(
		$$payload,
		spread_props([
			{
				popper,
				onEscapeKeydown,
				escapeKeydownBehavior,
				preventOverflowTextSelection,
				id,
				onPointerDown,
				onPointerUp,
				side,
				sideOffset,
				align,
				alignOffset,
				arrowPadding,
				avoidCollisions,
				collisionBoundary,
				collisionPadding,
				sticky,
				hideWhenDetached,
				updatePositionStrategy,
				strategy,
				dir,
				preventScroll,
				wrapperId,
				style,
				onPlaced,
				customAnchor,
				isStatic,
				enabled,
				onInteractOutside,
				onCloseAutoFocus,
				onOpenAutoFocus,
				interactOutsideBehavior,
				loop,
				trapFocus,
				isValidEvent: isValidEvent2,
				onFocusOutside
			},
			restProps,
			{ forceMount: true }
		])
	);
}
class PopoverRootState {
	open;
	contentNode = null;
	contentId = void 0;
	triggerNode = null;
	constructor(props) {
		this.open = props.open;
	}
	toggleOpen() {
		this.open.current = !this.open.current;
	}
	handleClose() {
		if (!this.open.current) return;
		this.open.current = false;
	}
}
class PopoverTriggerState {
	#id;
	#ref;
	#disabled;
	#root;
	constructor(props, root) {
		this.#id = props.id;
		this.#root = root;
		this.#ref = props.ref;
		this.#disabled = props.disabled;
		useRefById({
			id: this.#id,
			ref: this.#ref,
			onRefChange: (node) => {
				this.#root.triggerNode = node;
			}
		});
		this.onclick = this.onclick.bind(this);
		this.onpointerdown = this.onpointerdown.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		if (this.#disabled.current) return;
		if (e.button !== 0) return;
		this.#root.toggleOpen();
	}
	onpointerdown(e) {
		if (this.#disabled.current) return;
		if (e.button !== 0) return;
		e.preventDefault();
	}
	onkeydown(e) {
		if (this.#disabled.current) return;
		if (!(e.key === ENTER || e.key === SPACE)) return;
		e.preventDefault();
		this.#root.toggleOpen();
	}
	#getAriaControls() {
		if (this.#root.open.current && this.#root.contentId) {
			return this.#root.contentId;
		}
		return void 0;
	}
	#props = once(() => ({
		id: this.#id.current,
		'aria-haspopup': 'dialog',
		'aria-expanded': getAriaExpanded(this.#root.open.current),
		'data-state': getDataOpenClosed(this.#root.open.current),
		'aria-controls': this.#getAriaControls(),
		'data-popover-trigger': '',
		disabled: this.#disabled.current,
		//
		onpointerdown: this.onpointerdown,
		onkeydown: this.onkeydown,
		onclick: this.onclick
	}));
	get props() {
		return this.#props();
	}
}
class PopoverContentState {
	#id;
	#ref;
	root;
	constructor(props, root) {
		this.#id = props.id;
		this.root = root;
		this.#ref = props.ref;
		useRefById({
			id: this.#id,
			ref: this.#ref,
			deps: () => this.root.open.current,
			onRefChange: (node) => {
				this.root.contentNode = node;
				this.root.contentId = node?.id;
			}
		});
	}
	#snippetProps = once(() => ({ open: this.root.open.current }));
	get snippetProps() {
		return this.#snippetProps();
	}
	#props = once(() => ({
		id: this.#id.current,
		tabindex: -1,
		'data-state': getDataOpenClosed(this.root.open.current),
		'data-popover-content': '',
		style: { pointerEvents: 'auto' }
	}));
	get props() {
		return this.#props();
	}
}
const [setPopoverRootContext, getPopoverRootContext] = createContext('Popover.Root');
function usePopoverRoot(props) {
	return setPopoverRootContext(new PopoverRootState(props));
}
function usePopoverTrigger(props) {
	return new PopoverTriggerState(props, getPopoverRootContext());
}
function usePopoverContent(props) {
	return new PopoverContentState(props, getPopoverRootContext());
}
function Popover_content$1($$payload, $$props) {
	push();
	let {
		child,
		children,
		ref = null,
		id = useId(),
		forceMount = false,
		onCloseAutoFocus = noop,
		onEscapeKeydown = noop,
		onInteractOutside = noop,
		trapFocus = true,
		preventScroll = false,
		$$slots,
		$$events,
		...restProps
	} = $$props;
	const contentState = usePopoverContent({
		id: box.with(() => id),
		ref: box.with(
			() => ref,
			(v) => (ref = v)
		)
	});
	const mergedProps = mergeProps(restProps, contentState.props);
	function handleInteractOutside(e) {
		onInteractOutside(e);
		if (e.defaultPrevented) return;
		if (isHTMLElement$1(e.target) && e.target.closest('[data-popover-trigger')) return;
		contentState.root.handleClose();
	}
	function handleEscapeKeydown(e) {
		onEscapeKeydown(e);
		if (e.defaultPrevented) return;
		contentState.root.handleClose();
	}
	function handleCloseAutoFocus(e) {
		onCloseAutoFocus(e);
		if (e.defaultPrevented) return;
		e.preventDefault();
		contentState.root.triggerNode?.focus();
	}
	if (forceMount) {
		$$payload.out += '<!--[-->';
		{
			let popper = function ($$payload2, { props, wrapperProps }) {
				const finalProps = mergeProps(props, {
					style: getFloatingContentCSSVars('popover')
				});
				if (child) {
					$$payload2.out += '<!--[-->';
					child($$payload2, {
						props: finalProps,
						wrapperProps,
						...contentState.snippetProps
					});
					$$payload2.out += `<!---->`;
				} else {
					$$payload2.out += '<!--[!-->';
					$$payload2.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...finalProps })}>`;
					children?.($$payload2);
					$$payload2.out += `<!----></div></div>`;
				}
				$$payload2.out += `<!--]-->`;
			};
			Popper_layer_force_mount(
				$$payload,
				spread_props([
					mergedProps,
					{
						enabled: contentState.root.open.current,
						id,
						onInteractOutside: handleInteractOutside,
						onEscapeKeydown: handleEscapeKeydown,
						onCloseAutoFocus: handleCloseAutoFocus,
						trapFocus,
						preventScroll,
						loop: true,
						forceMount: true,
						popper,
						$$slots: { popper: true }
					}
				])
			);
		}
	} else if (!forceMount) {
		$$payload.out += '<!--[1-->';
		{
			let popper = function ($$payload2, { props, wrapperProps }) {
				const finalProps = mergeProps(props, {
					style: getFloatingContentCSSVars('popover')
				});
				if (child) {
					$$payload2.out += '<!--[-->';
					child($$payload2, {
						props: finalProps,
						wrapperProps,
						...contentState.snippetProps
					});
					$$payload2.out += `<!---->`;
				} else {
					$$payload2.out += '<!--[!-->';
					$$payload2.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...finalProps })}>`;
					children?.($$payload2);
					$$payload2.out += `<!----></div></div>`;
				}
				$$payload2.out += `<!--]-->`;
			};
			Popper_layer(
				$$payload,
				spread_props([
					mergedProps,
					{
						present: contentState.root.open.current,
						id,
						onInteractOutside: handleInteractOutside,
						onEscapeKeydown: handleEscapeKeydown,
						onCloseAutoFocus: handleCloseAutoFocus,
						trapFocus,
						preventScroll,
						loop: true,
						forceMount: false,
						popper,
						$$slots: { popper: true }
					}
				])
			);
		}
	} else {
		$$payload.out += '<!--[!-->';
	}
	$$payload.out += `<!--]-->`;
	bind_props($$props, { ref });
	pop();
}
function Popover_trigger($$payload, $$props) {
	push();
	let {
		children,
		child,
		id = useId(),
		ref = null,
		type = 'button',
		disabled = false,
		$$slots,
		$$events,
		...restProps
	} = $$props;
	const triggerState = usePopoverTrigger({
		id: box.with(() => id),
		ref: box.with(
			() => ref,
			(v) => (ref = v)
		),
		disabled: box.with(() => Boolean(disabled))
	});
	const mergedProps = mergeProps(restProps, triggerState.props, { type });
	Floating_layer_anchor($$payload, {
		id,
		children: ($$payload2) => {
			if (child) {
				$$payload2.out += '<!--[-->';
				child($$payload2, { props: mergedProps });
				$$payload2.out += `<!---->`;
			} else {
				$$payload2.out += '<!--[!-->';
				$$payload2.out += `<button${spread_attributes({ ...mergedProps })}>`;
				children?.($$payload2);
				$$payload2.out += `<!----></button>`;
			}
			$$payload2.out += `<!--]-->`;
		}
	});
	bind_props($$props, { ref });
	pop();
}
function Popover($$payload, $$props) {
	push();
	let { open = false, onOpenChange = noop, controlledOpen = false, children } = $$props;
	usePopoverRoot({
		open: box.with(
			() => open,
			(v) => {
				if (controlledOpen) {
					onOpenChange(v);
				} else {
					open = v;
					onOpenChange(v);
				}
			}
		)
	});
	Floating_layer($$payload, {
		children: ($$payload2) => {
			children?.($$payload2);
			$$payload2.out += `<!---->`;
		}
	});
	bind_props($$props, { open });
	pop();
}
function useTimeoutFn(cb, interval, options = {}) {
	const { immediate = true } = options;
	const isPending = box(false);
	let timer;
	function clear() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}
	function stop() {
		isPending.current = false;
		clear();
	}
	function start(...args) {
		clear();
		isPending.current = true;
		timer = setTimeout(() => {
			isPending.current = false;
			timer = null;
			cb(...args);
		}, interval);
	}
	if (immediate) {
		isPending.current = true;
		if (isBrowser) start();
	}
	return {
		isPending: box.readonly(isPending),
		start,
		stop
	};
}
class TooltipProviderState {
	delayDuration;
	disableHoverableContent;
	disableCloseOnTriggerClick;
	disabled;
	ignoreNonKeyboardFocus;
	skipDelayDuration;
	isOpenDelayed = true;
	isPointerInTransit = box(false);
	#timerFn;
	constructor(props) {
		this.delayDuration = props.delayDuration;
		this.disableHoverableContent = props.disableHoverableContent;
		this.disableCloseOnTriggerClick = props.disableCloseOnTriggerClick;
		this.disabled = props.disabled;
		this.ignoreNonKeyboardFocus = props.ignoreNonKeyboardFocus;
		this.skipDelayDuration = props.skipDelayDuration;
		this.#timerFn = useTimeoutFn(
			() => {
				this.isOpenDelayed = true;
			},
			this.skipDelayDuration.current,
			{ immediate: false }
		);
	}
	#startTimer = () => {
		this.#timerFn.start();
	};
	#clearTimer = () => {
		this.#timerFn.stop();
	};
	onOpen = () => {
		this.#clearTimer();
		this.isOpenDelayed = false;
	};
	onClose = () => {
		this.#startTimer();
	};
}
const [setTooltipProviderContext, getTooltipProviderContext] =
	createContext('Tooltip.Provider');
createContext('Tooltip.Root');
function useTooltipProvider(props) {
	return setTooltipProviderContext(new TooltipProviderState(props));
}
function Tooltip_provider($$payload, $$props) {
	push();
	let {
		children,
		delayDuration = 700,
		disableCloseOnTriggerClick = false,
		disableHoverableContent = false,
		disabled = false,
		ignoreNonKeyboardFocus = false,
		skipDelayDuration = 300
	} = $$props;
	useTooltipProvider({
		delayDuration: box.with(() => delayDuration),
		disableCloseOnTriggerClick: box.with(() => disableCloseOnTriggerClick),
		disableHoverableContent: box.with(() => disableHoverableContent),
		disabled: box.with(() => disabled),
		ignoreNonKeyboardFocus: box.with(() => ignoreNonKeyboardFocus),
		skipDelayDuration: box.with(() => skipDelayDuration)
	});
	children?.($$payload);
	$$payload.out += `<!---->`;
	pop();
}
const Provider = Tooltip_provider;
function Popover_content($$payload, $$props) {
	push();
	let {
		ref = null,
		class: className,
		sideOffset = 4,
		align = 'center',
		$$slots,
		$$events,
		...restProps
	} = $$props;
	let $$settled = true;
	let $$inner_payload;
	function $$render_inner($$payload2) {
		$$payload2.out += `<!---->`;
		Portal($$payload2, {
			children: ($$payload3) => {
				$$payload3.out += `<!---->`;
				Popover_content$1(
					$$payload3,
					spread_props([
						{
							sideOffset,
							align,
							class: cn(
								'bg-neutral-3 text-neutral-11 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-none',
								className
							)
						},
						restProps,
						{
							get ref() {
								return ref;
							},
							set ref($$value) {
								ref = $$value;
								$$settled = false;
							}
						}
					])
				);
				$$payload3.out += `<!---->`;
			}
		});
		$$payload2.out += `<!---->`;
	}
	do {
		$$settled = true;
		$$inner_payload = copy_payload($$payload);
		$$render_inner($$inner_payload);
	} while (!$$settled);
	assign_payload($$payload, $$inner_payload);
	bind_props($$props, { ref });
	pop();
}
const Root = Popover;
const Trigger = Popover_trigger;
function Separator($$payload, $$props) {
	push();
	let {
		ref = null,
		class: className,
		orientation = 'horizontal',
		$$slots,
		$$events,
		...restProps
	} = $$props;
	let $$settled = true;
	let $$inner_payload;
	function $$render_inner($$payload2) {
		$$payload2.out += `<!---->`;
		Separator$1(
			$$payload2,
			spread_props([
				{
					class: cn(
						'bg-neutral-7 shrink-0',
						orientation === 'horizontal' ? 'h-[1px] w-full' : 'min-h-full w-[1px]',
						className
					),
					orientation
				},
				restProps,
				{
					get ref() {
						return ref;
					},
					set ref($$value) {
						ref = $$value;
						$$settled = false;
					}
				}
			])
		);
		$$payload2.out += `<!---->`;
	}
	do {
		$$settled = true;
		$$inner_payload = copy_payload($$payload);
		$$render_inner($$inner_payload);
	} while (!$$settled);
	assign_payload($$payload, $$inner_payload);
	bind_props($$props, { ref });
	pop();
}
function Nav($$payload, $$props) {
	push();
	let navLinks = [
		{ url: '/demo', label: 'Demonstration' },
		{ url: '/guides', label: 'Documentation' },
		{ url: externalLinks.project, label: 'About' }
	];
	const each_array = ensure_array_like(navLinks);
	$$payload.out += `<header class="border-neutral-7 sticky left-0 top-0 w-full rounded-none border-b-2 drop-shadow-md"><nav class="bg-neutral-2 flex items-center justify-around py-4"><div><ul class="flex items-center gap-6 p-2 text-lg"><li><a href="/">`;
	Logo($$payload, { size: '4rem' });
	$$payload.out += `<!----></a></li> <li><a href="/" class="hidden lg:block"><span class="font-semibold">Verdagraph</span></a></li></ul></div> <ul class="hidden gap-4 md:flex md:gap-8 lg:gap-12"><!--[-->`;
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let link = each_array[$$index];
		$$payload.out += `<li>`;
		Button($$payload, {
			href: link.url,
			variant: 'ghost',
			children: ($$payload2) => {
				$$payload2.out += `<!---->${escape_html(link.label)}`;
			},
			$$slots: { default: true }
		});
		$$payload.out += `<!----></li>`;
	}
	$$payload.out += `<!--]--></ul> <div class="flex md:hidden">`;
	Root($$payload, {
		children: ($$payload2) => {
			Trigger($$payload2, {
				children: ($$payload3) => {
					Icon($$payload3, { icon: iconIds.dropdownMenuIcon, width: '3rem' });
				},
				$$slots: { default: true }
			});
			$$payload2.out += `<!----> `;
			Popover_content($$payload2, {
				class: 'w-auto',
				children: ($$payload3) => {
					function menuLink($$payload4, url, label) {
						Button($$payload4, {
							href: url,
							variant: 'link',
							children: ($$payload5) => {
								$$payload5.out += `<!---->${escape_html(label)}`;
							},
							$$slots: { default: true }
						});
					}
					const each_array_1 = ensure_array_like(navLinks);
					$$payload3.out += `<ul class="flex flex-col"><!--[-->`;
					for (
						let $$index_1 = 0, $$length = each_array_1.length;
						$$index_1 < $$length;
						$$index_1++
					) {
						let link = each_array_1[$$index_1];
						$$payload3.out += `<li>`;
						menuLink($$payload3, link.url, link.label);
						$$payload3.out += `<!----></li>`;
					}
					$$payload3.out += `<!--]--> `;
					Separator($$payload3, { class: 'bg-neutral-6 w-full opacity-50' });
					$$payload3.out += `<!----> <li>`;
					menuLink($$payload3, '/register', 'Get Started');
					$$payload3.out += `<!----></li></ul>`;
				},
				$$slots: { default: true }
			});
			$$payload2.out += `<!---->`;
		},
		$$slots: { default: true }
	});
	$$payload.out += `<!----></div> <ul class="hidden gap-8 text-lg md:flex"><li class="hidden lg:block">`;
	Button($$payload, {
		href: '/login',
		variant: 'default',
		children: ($$payload2) => {
			$$payload2.out += `<!---->Get Started`;
		},
		$$slots: { default: true }
	});
	$$payload.out += `<!----></li></ul></nav></header>`;
	pop();
}
function _layout($$payload, $$props) {
	let { children } = $$props;
	Mode_watcher($$payload, {});
	$$payload.out += `<!----> <div class="h-screen w-screen overflow-hidden"><!---->`;
	Provider($$payload, {
		delayDuration: 500,
		children: ($$payload2) => {
			Nav($$payload2);
			$$payload2.out += `<!----> `;
			children($$payload2);
			$$payload2.out += `<!---->`;
		}
	});
	$$payload.out += `<!----></div>`;
}
export { _layout as default };
