import { clsx as clsx$1 } from 'clsx';

const HYDRATION_START = '[';
const HYDRATION_END = ']';
const HYDRATION_ERROR = {};
const ELEMENT_IS_NAMESPACED = 1;
const ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
const UNINITIALIZED = Symbol();
function lifecycle_outside_component(name) {
	{
		throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
	}
}
const DOM_BOOLEAN_ATTRIBUTES = [
	'allowfullscreen',
	'async',
	'autofocus',
	'autoplay',
	'checked',
	'controls',
	'default',
	'disabled',
	'formnovalidate',
	'hidden',
	'indeterminate',
	'inert',
	'ismap',
	'loop',
	'multiple',
	'muted',
	'nomodule',
	'novalidate',
	'open',
	'playsinline',
	'readonly',
	'required',
	'reversed',
	'seamless',
	'selected',
	'webkitdirectory',
	'defer',
	'disablepictureinpicture',
	'disableremoteplayback'
];
function is_boolean_attribute(name) {
	return DOM_BOOLEAN_ATTRIBUTES.includes(name);
}
const PASSIVE_EVENTS = ['touchstart', 'touchmove'];
function is_passive_event(name) {
	return PASSIVE_EVENTS.includes(name);
}
const ATTR_REGEX = /[&"<]/g;
const CONTENT_REGEX = /[&<]/g;
function escape_html(value, is_attr) {
	const str = String(value ?? '');
	const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;
	let escaped = '';
	let last = 0;
	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped +=
			str.substring(last, i) + (ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;');
		last = i + 1;
	}
	return escaped + str.substring(last);
}
const replacements = {
	translate: /* @__PURE__ */ new Map([
		[true, 'yes'],
		[false, 'no']
	])
};
function attr(name, value, is_boolean = false) {
	if (value == null || (!value && is_boolean)) return '';
	const normalized = (name in replacements && replacements[name].get(value)) || value;
	const assignment = is_boolean ? '' : `="${escape_html(normalized, true)}"`;
	return ` ${name}${assignment}`;
}
function clsx(value) {
	if (typeof value === 'object') {
		return clsx$1(value);
	} else {
		return value ?? '';
	}
}
var current_component = null;
function getContext(key) {
	const context_map = get_or_init_context_map();
	const result =
		/** @type {T} */
		context_map.get(key);
	return result;
}
function setContext(key, context) {
	get_or_init_context_map().set(key, context);
	return context;
}
function hasContext(key) {
	return get_or_init_context_map().has(key);
}
function getAllContexts() {
	return get_or_init_context_map();
}
function get_or_init_context_map(name) {
	if (current_component === null) {
		lifecycle_outside_component();
	}
	return (current_component.c ??= new Map(
		get_parent_context(current_component) || void 0
	));
}
function push(fn) {
	current_component = { p: current_component, c: null, d: null };
}
function pop() {
	var component =
		/** @type {Component} */
		current_component;
	var ondestroy = component.d;
	if (ondestroy) {
		on_destroy.push(...ondestroy);
	}
	current_component = component.p;
}
function get_parent_context(component_context) {
	let parent = component_context.p;
	while (parent !== null) {
		const context_map = parent.c;
		if (context_map !== null) {
			return context_map;
		}
		parent = parent.p;
	}
	return null;
}
const BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
const BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
class HeadPayload {
	/** @type {Set<{ hash: string; code: string }>} */
	css = /* @__PURE__ */ new Set();
	out = '';
	uid = () => '';
	title = '';
	constructor(css = /* @__PURE__ */ new Set(), out = '', title = '', uid = () => '') {
		this.css = css;
		this.out = out;
		this.title = title;
		this.uid = uid;
	}
}
class Payload {
	/** @type {Set<{ hash: string; code: string }>} */
	css = /* @__PURE__ */ new Set();
	out = '';
	uid = () => '';
	head = new HeadPayload();
	constructor(id_prefix = '') {
		this.uid = props_id_generator(id_prefix);
		this.head.uid = this.uid;
	}
}
function copy_payload({ out, css, head: head2, uid }) {
	const payload = new Payload();
	payload.out = out;
	payload.css = new Set(css);
	payload.uid = uid;
	payload.head = new HeadPayload();
	payload.head.out = head2.out;
	payload.head.css = new Set(head2.css);
	payload.head.title = head2.title;
	payload.head.uid = head2.uid;
	return payload;
}
function assign_payload(p1, p2) {
	p1.out = p2.out;
	p1.css = p2.css;
	p1.head = p2.head;
	p1.uid = p2.uid;
}
function props_id_generator(prefix) {
	let uid = 1;
	return () => `${prefix}s${uid++}`;
}
const INVALID_ATTR_NAME_CHAR_REGEX =
	/[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
let on_destroy = [];
function render(component, options = {}) {
	const payload = new Payload(options.idPrefix ? options.idPrefix + '-' : '');
	const prev_on_destroy = on_destroy;
	on_destroy = [];
	payload.out += BLOCK_OPEN;
	if (options.context) {
		push();
		current_component.c = options.context;
	}
	component(payload, options.props ?? {}, {}, {});
	if (options.context) {
		pop();
	}
	payload.out += BLOCK_CLOSE;
	for (const cleanup of on_destroy) cleanup();
	on_destroy = prev_on_destroy;
	let head2 = payload.head.out + payload.head.title;
	for (const { hash, code } of payload.css) {
		head2 += `<style id="${hash}">${code}</style>`;
	}
	return {
		head: head2,
		html: payload.out,
		body: payload.out
	};
}
function head(payload, fn) {
	const head_payload = payload.head;
	head_payload.out += BLOCK_OPEN;
	fn(head_payload);
	head_payload.out += BLOCK_CLOSE;
}
function spread_attributes(attrs, css_hash, classes, styles, flags = 0) {
	if (attrs.class) {
		attrs.class = clsx(attrs.class);
	}
	let attr_str = '';
	let name;
	const is_html = (flags & ELEMENT_IS_NAMESPACED) === 0;
	const lowercase = (flags & ELEMENT_PRESERVE_ATTRIBUTE_CASE) === 0;
	for (name in attrs) {
		if (typeof attrs[name] === 'function') continue;
		if (name[0] === '$' && name[1] === '$') continue;
		if (INVALID_ATTR_NAME_CHAR_REGEX.test(name)) continue;
		var value = attrs[name];
		if (lowercase) {
			name = name.toLowerCase();
		}
		attr_str += attr(name, value, is_html && is_boolean_attribute(name));
	}
	return attr_str;
}
function spread_props(props) {
	const merged_props = {};
	let key;
	for (let i = 0; i < props.length; i++) {
		const obj = props[i];
		for (key in obj) {
			const desc = Object.getOwnPropertyDescriptor(obj, key);
			if (desc) {
				Object.defineProperty(merged_props, key, desc);
			} else {
				merged_props[key] = obj[key];
			}
		}
	}
	return merged_props;
}
function sanitize_props(props) {
	const { children, $$slots, ...sanitized } = props;
	return sanitized;
}
function bind_props(props_parent, props_now) {
	for (const key in props_now) {
		const initial_value = props_parent[key];
		const value = props_now[key];
		if (
			initial_value === void 0 &&
			value !== void 0 &&
			Object.getOwnPropertyDescriptor(props_parent, key)?.set
		) {
			props_parent[key] = value;
		}
	}
}
function ensure_array_like(array_like_or_iterator) {
	if (array_like_or_iterator) {
		return array_like_or_iterator.length !== void 0
			? array_like_or_iterator
			: Array.from(array_like_or_iterator);
	}
	return [];
}
function once(get_value) {
	let value =
		/** @type {V} */
		UNINITIALIZED;
	return () => {
		if (value === UNINITIALIZED) {
			value = get_value();
		}
		return value;
	};
}
export {
	HYDRATION_ERROR as H,
	UNINITIALIZED as U,
	HYDRATION_START as a,
	HYDRATION_END as b,
	pop as c,
	bind_props as d,
	attr as e,
	spread_attributes as f,
	clsx as g,
	head as h,
	is_passive_event as i,
	hasContext as j,
	getContext as k,
	getAllContexts as l,
	spread_props as m,
	copy_payload as n,
	once as o,
	push as p,
	assign_payload as q,
	render as r,
	setContext as s,
	ensure_array_like as t,
	escape_html as u,
	current_component as v,
	sanitize_props as w
};
