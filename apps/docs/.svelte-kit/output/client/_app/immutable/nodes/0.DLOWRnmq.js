import { i as vi } from '../chunks/B1d5rMd0.js';
import { h as vo, I as wo } from '../chunks/BRBqP9qL.js';
import { u as Xr, s as jn, m as yo } from '../chunks/BRpxm6ve.js';
import { o as gi } from '../chunks/C1QID_m_.js';
import { c as Un } from '../chunks/C8R_MN5o.js';
import { e as qr } from '../chunks/C86kfYSN.js';
import { e as Hn, s as V, B as Wn, c as hi } from '../chunks/Cy8X8so-.js';
import { r as Ct, s as Nt, p as b, i as ot } from '../chunks/Cz8mIVZI.js';
import {
	c as $i,
	x as D,
	Y as E,
	an as F,
	p as Gi,
	aP as Ji,
	w as K,
	N as Kt,
	al as M,
	B as Mn,
	F as N,
	b as Qi,
	A as U,
	h as Ur,
	t as W,
	a as Xi,
	aA as Z,
	aO as Zi,
	aM as ao,
	I as at,
	a8 as br,
	y as dt,
	a4 as eo,
	am as fi,
	P as h,
	aR as io,
	aL as no,
	aS as oo,
	z as q,
	aN as qi,
	ac as qt,
	aQ as ro,
	aT as so,
	d as to,
	C as yt,
	ab as zt
} from '../chunks/DgmMHYUv.js';
import {
	m as Dn,
	t as In,
	b as Rn,
	h as Vn,
	d as Vr,
	s as Yr,
	u as co,
	f as fo,
	p as go,
	g as ho,
	a as jr,
	c as lo,
	i as pe,
	e as uo,
	j as zn,
	l as zr
} from '../chunks/Dl94qWna.js';
import { j as R, f as T, d as Yi, e as kn, t as tt } from '../chunks/HWDk4eir.js';
import { a as Zt, s as mi, c as mo } from '../chunks/UaJBEsuX.js';

var Ui = Object.defineProperty;
var Vi = Object.getPrototypeOf;
var zi = Reflect.get;
var Kr = (e) => {
	throw TypeError(e);
};
var ji = (e, t, n) =>
	t in e
		? Ui(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
		: (e[t] = n);
var k = (e, t, n) => ji(e, typeof t != 'symbol' ? t + '' : t, n),
	wr = (e, t, n) => t.has(e) || Kr('Cannot ' + n);
var a = (e, t, n) => (wr(e, t, 'read from private field'), n ? n.call(e) : t.get(e)),
	w = (e, t, n) =>
		t.has(e)
			? Kr('Cannot add the same private member more than once')
			: t instanceof WeakSet
				? t.add(e)
				: t.set(e, n),
	_ = (e, t, n, r) => (
		wr(e, t, 'write to private field'), r ? r.call(e, n) : t.set(e, n), n
	),
	lt = (e, t, n) => (wr(e, t, 'access private method'), n);
var yr = (e, t, n, r) => ({
		set _(o) {
			_(e, t, o, n);
		},
		get _() {
			return a(e, t, r);
		}
	}),
	Hr = (e, t, n) => zi(Vi(e), n, t);

function po(e, t, n) {
	Ur && Xi();
	var r = e,
		o = eo,
		i,
		s = qi() ? Zi : Ji;
	Qi(() => {
		s(o, (o = t())) && (i && Gi(i), (i = $i(() => n(r))));
	}),
		Ur && (r = to);
}
var gt, mt, xt, Gt, Kn;
const Mr = class Mr extends Map {
	constructor(n) {
		super();
		w(this, Gt);
		w(this, gt, new Map());
		w(this, mt, qt(0));
		w(this, xt, qt(0));
		if (n) {
			for (var [r, o] of n) super.set(r, o);
			a(this, xt).v = super.size;
		}
	}
	has(n) {
		var r = a(this, gt),
			o = r.get(n);
		if (o === void 0) {
			var i = super.get(n);
			if (i !== void 0) (o = qt(0)), r.set(n, o);
			else return h(a(this, mt)), !1;
		}
		return h(o), !0;
	}
	forEach(n, r) {
		lt(this, Gt, Kn).call(this), super.forEach(n, r);
	}
	get(n) {
		var r = a(this, gt),
			o = r.get(n);
		if (o === void 0) {
			var i = super.get(n);
			if (i !== void 0) (o = qt(0)), r.set(n, o);
			else {
				h(a(this, mt));
				return;
			}
		}
		return h(o), super.get(n);
	}
	set(n, r) {
		var g;
		var o = a(this, gt),
			i = o.get(n),
			s = super.get(n),
			c = super.set(n, r),
			l = a(this, mt);
		if (i === void 0) o.set(n, qt(0)), E(a(this, xt), super.size), pe(l);
		else if (s !== r) {
			pe(i);
			var u = l.reactions === null ? null : new Set(l.reactions),
				d = u === null || !((g = i.reactions) != null && g.every((v) => u.has(v)));
			d && pe(l);
		}
		return c;
	}
	delete(n) {
		var r = a(this, gt),
			o = r.get(n),
			i = super.delete(n);
		return (
			o !== void 0 &&
				(r.delete(n), E(a(this, xt), super.size), E(o, -1), pe(a(this, mt))),
			i
		);
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var n = a(this, gt);
			E(a(this, xt), 0);
			for (var r of n.values()) E(r, -1);
			pe(a(this, mt)), n.clear();
		}
	}
	keys() {
		return h(a(this, mt)), super.keys();
	}
	values() {
		return lt(this, Gt, Kn).call(this), super.values();
	}
	entries() {
		return lt(this, Gt, Kn).call(this), super.entries();
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return h(a(this, xt)), super.size;
	}
};
(gt = new WeakMap()),
	(mt = new WeakMap()),
	(xt = new WeakMap()),
	(Gt = new WeakSet()),
	(Kn = function () {
		h(a(this, mt));
		var n = a(this, gt);
		if (a(this, xt).v !== n.size)
			for (var r of Hr(Mr.prototype, this, 'keys').call(this))
				n.has(r) || n.set(r, qt(0));
		for (var [, o] of a(this, gt)) h(o);
	});
let xr = Mr;
function bo(e) {
	co.current = e;
}
function xo(e) {
	lo.current = e;
}
function So({
	defaultMode: e = 'system',
	themeColors: t,
	darkClassNames: n = ['dark'],
	lightClassNames: r = [],
	defaultTheme: o = '',
	modeStorageKey: i = 'mode-watcher-mode',
	themeStorageKey: s = 'mode-watcher-theme'
}) {
	const c = document.documentElement,
		l = localStorage.getItem(i) ?? e,
		u = localStorage.getItem(s) ?? o,
		d =
			l === 'light' ||
			(l === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);
	if (
		(d
			? (n.length && c.classList.remove(...n.filter(Boolean)),
				r.length && c.classList.add(...r.filter(Boolean)))
			: (r.length && c.classList.remove(...r.filter(Boolean)),
				n.length && c.classList.add(...n.filter(Boolean))),
		(c.style.colorScheme = d ? 'light' : 'dark'),
		t)
	) {
		const g = document.querySelector('meta[name="theme-color"]');
		g && g.setAttribute('content', l === 'light' ? t.light : t.dark);
	}
	u && (c.setAttribute('data-theme', u), localStorage.setItem(s, u)),
		localStorage.setItem(i, l);
}
var Po = tt('<meta name="theme-color">');
function Oo(e, t) {
	W(t, !0);
	var n = R(),
		r = D(n);
	{
		var o = (i) => {
			var s = Po();
			yt(() => mi(s, 'content', t.themeColors.dark)), T(i, s);
		};
		ot(r, (i) => {
			t.themeColors && i(o);
		});
	}
	T(e, n), K();
}
var Ao = tt('<meta name="theme-color">'),
	Eo = tt('<!> <!>', 1);
function Co(e, t) {
	W(t, !0);
	let n = b(t, 'trueNonce', 3, '');
	Yi((r) => {
		var o = Eo(),
			i = D(o);
		{
			var s = (l) => {
				var u = Ao();
				yt(() => mi(u, 'content', t.themeColors.dark)), T(l, u);
			};
			ot(i, (l) => {
				t.themeColors && l(s);
			});
		}
		var c = dt(i, 2);
		vo(
			c,
			() =>
				`<script${n() ? ` nonce=${n()}` : ''}>(` +
				So.toString() +
				')(' +
				JSON.stringify(t.initConfig) +
				');<\/script>'
		),
			T(r, o);
	}),
		K();
}
function To(e, t) {
	W(t, !0);
	let n = b(t, 'track', 3, !0),
		r = b(t, 'defaultMode', 3, 'system'),
		o = b(t, 'disableTransitions', 3, !0),
		i = b(t, 'darkClassNames', 19, () => ['dark']),
		s = b(t, 'lightClassNames', 19, () => []),
		c = b(t, 'defaultTheme', 3, ''),
		l = b(t, 'nonce', 3, ''),
		u = b(t, 'themeStorageKey', 3, 'mode-watcher-theme'),
		d = b(t, 'modeStorageKey', 3, 'mode-watcher-mode'),
		g = b(t, 'disableHeadScriptInjection', 3, !1);
	(Dn.current = d()),
		(In.current = u()),
		(Vr.current = i()),
		(zr.current = s()),
		(jr.current = o()),
		(Rn.current = t.themeColors),
		Kt(() => {
			jr.current = o();
		}),
		Kt(() => {
			Rn.current = t.themeColors;
		}),
		Kt(() => {
			Vr.current = i();
		}),
		Kt(() => {
			zr.current = s();
		}),
		Kt(() => {
			Dn.current = d();
		}),
		Kt(() => {
			In.current = u();
		}),
		Kt(() => {
			uo.current, Dn.current, In.current, fo.current;
		}),
		gi(() => {
			Yr.tracking(n()), Yr.query();
			const P = localStorage.getItem(Dn.current);
			bo(ho(P) ? P : r());
			const O = localStorage.getItem(In.current);
			xo(O || c());
		});
	const v = {
			defaultMode: r(),
			themeColors: t.themeColors,
			darkClassNames: i(),
			lightClassNames: s(),
			defaultTheme: c(),
			modeStorageKey: d(),
			themeStorageKey: u()
		},
		m = F(() => (typeof window > 'u' ? l() : ''));
	var f = R(),
		y = D(f);
	{
		var x = (P) => {
				Oo(P, {
					get themeColors() {
						return Rn.current;
					}
				});
			},
			S = (P) => {
				Co(P, {
					get trueNonce() {
						return h(m);
					},
					initConfig: v,
					get themeColors() {
						return Rn.current;
					}
				});
			};
		ot(y, (P) => {
			g() ? P(x) : P(S, !1);
		});
	}
	T(e, f), K();
}
const _o = { dropdownMenuIcon: 'material-symbols-light:menu-rounded' };
function Fo(e) {
	return typeof e == 'function';
}
function Do(e) {
	return e !== null && typeof e == 'object';
}
const Se = Symbol('box'),
	Cr = Symbol('is-writable');
function Io(e) {
	return Do(e) && Se in e;
}
function Ro(e) {
	return p.isBox(e) && Cr in e;
}
function p(e) {
	let t = M(zt(e));
	return {
		[Se]: !0,
		[Cr]: !0,
		get current() {
			return h(t);
		},
		set current(n) {
			E(t, n, !0);
		}
	};
}
function Lo(e, t) {
	const n = F(e);
	return t
		? {
				[Se]: !0,
				[Cr]: !0,
				get current() {
					return h(n);
				},
				set current(r) {
					t(r);
				}
			}
		: {
				[Se]: !0,
				get current() {
					return e();
				}
			};
}
function No(e) {
	return p.isBox(e) ? e : Fo(e) ? p.with(e) : p(e);
}
function Bo(e) {
	return Object.entries(e).reduce(
		(t, [n, r]) =>
			p.isBox(r)
				? (p.isWritableBox(r)
						? Object.defineProperty(t, n, {
								get() {
									return r.current;
								},
								set(o) {
									r.current = o;
								}
							})
						: Object.defineProperty(t, n, {
								get() {
									return r.current;
								}
							}),
					t)
				: Object.assign(t, { [n]: r }),
		{}
	);
}
function ko(e) {
	return p.isWritableBox(e)
		? {
				[Se]: !0,
				get current() {
					return e.current;
				}
			}
		: e;
}
p.from = No;
p.with = Lo;
p.flatten = Bo;
p.readonly = ko;
p.isBox = Io;
p.isWritableBox = Ro;
function wi(...e) {
	return function (t) {
		var n;
		for (const r of e)
			if (r) {
				if (t.defaultPrevented) return;
				typeof r == 'function'
					? r.call(this, t)
					: (n = r.current) == null || n.call(this, t);
			}
	};
}
const Mo = /\d/,
	Wo = ['-', '_', '/', '.'];
function Ko(e = '') {
	if (!Mo.test(e)) return e !== e.toLowerCase();
}
function Ho(e) {
	const t = [];
	let n = '',
		r,
		o;
	for (const i of e) {
		const s = Wo.includes(i);
		if (s === !0) {
			t.push(n), (n = ''), (r = void 0);
			continue;
		}
		const c = Ko(i);
		if (o === !1) {
			if (r === !1 && c === !0) {
				t.push(n), (n = i), (r = c);
				continue;
			}
			if (r === !0 && c === !1 && n.length > 1) {
				const l = n.at(-1);
				t.push(n.slice(0, Math.max(0, n.length - 1))), (n = l + i), (r = c);
				continue;
			}
		}
		(n += i), (r = c), (o = s);
	}
	return t.push(n), t;
}
function yi(e) {
	return e
		? Ho(e)
				.map((t) => Vo(t))
				.join('')
		: '';
}
function Uo(e) {
	return zo(yi(e || ''));
}
function Vo(e) {
	return e ? e[0].toUpperCase() + e.slice(1) : '';
}
function zo(e) {
	return e ? e[0].toLowerCase() + e.slice(1) : '';
}
function xe(e) {
	if (!e) return {};
	const t = {};
	function n(r, o) {
		if (
			r.startsWith('-moz-') ||
			r.startsWith('-webkit-') ||
			r.startsWith('-ms-') ||
			r.startsWith('-o-')
		) {
			t[yi(r)] = o;
			return;
		}
		if (r.startsWith('--')) {
			t[r] = o;
			return;
		}
		t[Uo(r)] = o;
	}
	return go(e, n), t;
}
function Jt(...e) {
	return (...t) => {
		for (const n of e) typeof n == 'function' && n(...t);
	};
}
function jo(e, t) {
	const n = RegExp(e, 'g');
	return (r) => {
		if (typeof r != 'string')
			throw new TypeError(`expected an argument of type string, but got ${typeof r}`);
		return r.match(n) ? r.replace(n, t) : r;
	};
}
const Yo = jo(/[A-Z]/, (e) => `-${e.toLowerCase()}`);
function Xo(e) {
	if (!e || typeof e != 'object' || Array.isArray(e))
		throw new TypeError(`expected an argument of type object, but got ${typeof e}`);
	return Object.keys(e).map((t) => `${Yo(t)}: ${e[t]};`).join(`
`);
}
function Tr(e = {}) {
	return Xo(e).replace(
		`
`,
		' '
	);
}
const qo = {
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
Tr(qo);
function Zo(e) {
	var t;
	return (
		e.length > 2 &&
		e.startsWith('on') &&
		e[2] === ((t = e[2]) == null ? void 0 : t.toLowerCase())
	);
}
function jt(...e) {
	const t = { ...e[0] };
	for (let n = 1; n < e.length; n++) {
		const r = e[n];
		for (const o in r) {
			const i = t[o],
				s = r[o],
				c = typeof i == 'function',
				l = typeof s == 'function';
			if (c && Zo(o)) {
				const u = i,
					d = s;
				t[o] = wi(u, d);
			} else if (c && l) t[o] = Jt(i, s);
			else if (o === 'class' && typeof i == 'string' && typeof s == 'string')
				t[o] = mo(i, s);
			else if (o === 'style') {
				const u = typeof i == 'object',
					d = typeof s == 'object',
					g = typeof i == 'string',
					v = typeof s == 'string';
				if (u && d) t[o] = { ...i, ...s };
				else if (u && v) {
					const m = xe(s);
					t[o] = { ...i, ...m };
				} else if (g && d) {
					const m = xe(i);
					t[o] = { ...m, ...s };
				} else if (g && v) {
					const m = xe(i),
						f = xe(s);
					t[o] = { ...m, ...f };
				} else u ? (t[o] = i) : d && (t[o] = s);
			} else t[o] = s !== void 0 ? s : i;
		}
	}
	return (
		typeof t.style == 'object' &&
			(t.style = Tr(t.style).replaceAll(
				`
`,
				' '
			)),
		t.hidden !== !0 && (t.hidden = void 0),
		t.disabled !== !0 && (t.disabled = void 0),
		t
	);
}
function Ot({
	id: e,
	ref: t,
	deps: n = () => !0,
	onRefChange: r = () => {},
	getRootNode: o = () => (typeof document < 'u' ? document : void 0)
}) {
	const i = F(() => n()),
		s = F(() => o());
	N(
		() => (
			e.current,
			h(i),
			h(s),
			at(() => {
				var l;
				const c = (l = h(s)) == null ? void 0 : l.getElementById(e.current);
				c ? (t.current = c) : (t.current = null), r(t.current);
			})
		)
	),
		N(() => () => {
			(t.current = null), r(null);
		});
}
function pi(e) {
	N(() => () => {
		e();
	});
}
function bi(e, t) {
	setTimeout(t, e);
}
function fr(e) {
	fi().then(e);
}
var $t, Ee, _t, Ht, Mt, Sr, Pr;
class Jo {
	constructor(t, n) {
		w(this, Mt);
		w(this, $t, M());
		w(this, Ee);
		w(this, _t, 0);
		w(this, Ht, null);
		E(a(this, $t), t, !0), _(this, Ee, n);
	}
	get current() {
		return (
			no()
				? N(
						() => (
							yr(this, _t)._++,
							a(this, _t) === 1 && lt(this, Mt, Sr).call(this, !0),
							() => {
								fi().then(() => {
									yr(this, _t)._--, a(this, _t) === 0 && lt(this, Mt, Pr).call(this);
								});
							}
						)
					)
				: a(this, _t) === 0 &&
					(lt(this, Mt, Sr).call(this, !1), lt(this, Mt, Pr).call(this)),
			h(a(this, $t))
		);
	}
}
($t = new WeakMap()),
	(Ee = new WeakMap()),
	(_t = new WeakMap()),
	(Ht = new WeakMap()),
	(Mt = new WeakSet()),
	(Sr = function (t) {
		_(
			this,
			Ht,
			a(this, Ee).call(
				this,
				(n) => {
					E(a(this, $t), n, !0);
				},
				t
			) ?? null
		);
	}),
	(Pr = function () {
		a(this, Ht) !== null && (a(this, Ht).call(this), _(this, Ht, null));
	});
new Jo(null, (e, t) => {
	function n() {
		e(document.activeElement);
	}
	if ((n(), !!t))
		return (
			document.addEventListener('focusin', n),
			document.addEventListener('focusout', n),
			() => {
				document.removeEventListener('focusin', n),
					document.removeEventListener('focusout', n);
			}
		);
});
function Qo(e) {
	return typeof e == 'function';
}
function Go(e) {
	return Qo(e) ? e() : e;
}
var Ft;
class $o {
	constructor(t, n = { box: 'border-box' }) {
		w(this, Ft, M(zt({ width: 0, height: 0 })));
		var r, o;
		E(
			a(this, Ft),
			{
				width: ((r = n.initialSize) == null ? void 0 : r.width) ?? 0,
				height: ((o = n.initialSize) == null ? void 0 : o.height) ?? 0
			},
			!0
		),
			N(() => {
				const i = Go(t);
				if (!i) return;
				const s = new ResizeObserver((c) => {
					for (const l of c) {
						const u = n.box === 'content-box' ? l.contentBoxSize : l.borderBoxSize,
							d = Array.isArray(u) ? u : [u];
						(h(a(this, Ft)).width = d.reduce((g, v) => Math.max(g, v.inlineSize), 0)),
							(h(a(this, Ft)).height = d.reduce((g, v) => Math.max(g, v.blockSize), 0));
					}
				});
				return (
					s.observe(i),
					() => {
						s.disconnect();
					}
				);
			});
	}
	get width() {
		return h(a(this, Ft)).width;
	}
	get height() {
		return h(a(this, Ft)).height;
	}
}
Ft = new WeakMap();
var Ce, Te;
class ts {
	constructor(t) {
		w(this, Ce, M());
		w(this, Te);
		N(() => {
			E(a(this, Ce), a(this, Te), !0), _(this, Te, t());
		});
	}
	get current() {
		return h(a(this, Ce));
	}
}
(Ce = new WeakMap()), (Te = new WeakMap());
function xi(e) {
	return e ? 'open' : 'closed';
}
function es(e) {
	return e ? 'true' : 'false';
}
function ns(e) {
	return e ? 'true' : void 0;
}
const rs = 'Enter',
	is = 'Escape',
	os = ' ',
	ss = 'Tab',
	hr = typeof document < 'u',
	Zr = as();
function as() {
	var e, t;
	return (
		hr &&
		((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) &&
		(/iP(ad|hone|od)/.test(window.navigator.userAgent) ||
			(((t = window == null ? void 0 : window.navigator) == null
				? void 0
				: t.maxTouchPoints) > 2 &&
				/iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent)))
	);
}
function Pe(e) {
	return e instanceof HTMLElement;
}
function cs(e) {
	return e instanceof Element;
}
function ls(e) {
	return e !== null;
}
function us(e) {
	return e instanceof HTMLInputElement && 'select' in e;
}
function ds(e, t) {
	if (getComputedStyle(e).visibility === 'hidden') return !0;
	for (; e; ) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === 'none') return !0;
		e = e.parentElement;
	}
	return !1;
}
function Jr(e, t) {
	return ro(e, t);
}
function fs(e, t) {
	const n = e,
		r = typeof e == 'symbol' ? e.description : e;
	if (!io(n)) {
		if (t === void 0)
			throw new Error(`Missing context dependency: ${r} and no fallback was provided.`);
		return t;
	}
	return oo(e);
}
function hs(e, t) {
	return typeof e == 'string' && t === void 0
		? `${e}Context`
		: Array.isArray(e) && t === void 0
			? `${e[0]}Context`
			: `${e}Context`;
}
function _n(e, t, n = !0) {
	const r = hs(e, t),
		o = Symbol.for(`bits-ui.${r}`),
		i = r;
	function s(l) {
		const u = fs(n ? o : i, l);
		if (u === void 0)
			throw new Error(
				`Context \`${r}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(', ')}` : `\`${e}\``}`
			);
		return u;
	}
	function c(l) {
		return Jr(n ? o : i, l);
	}
	return [c, s];
}
globalThis.bitsIdCounter ?? (globalThis.bitsIdCounter = { current: 0 });
function Xt(e = 'bits') {
	return globalThis.bitsIdCounter.current++, `${e}-${globalThis.bitsIdCounter.current}`;
}
function nt() {}
function gs(e, t) {
	const n = p(e);
	function r(i) {
		return t[n.current][i] ?? n.current;
	}
	return {
		state: n,
		dispatch: (i) => {
			n.current = r(i);
		}
	};
}
function ms(e, t) {
	let n = M(zt({})),
		r = M('none');
	const o = e.current ? 'mounted' : 'unmounted';
	let i = M(null);
	const s = new ts(() => e.current);
	N(() => {
		t.current &&
			e.current &&
			fr(() => {
				E(i, document.getElementById(t.current), !0);
			});
	});
	const { state: c, dispatch: l } = gs(o, {
		mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
		unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
		unmounted: { MOUNT: 'mounted' }
	});
	N(() => {
		const v = e.current;
		at(() => {
			if (
				(h(i) || E(i, document.getElementById(t.current), !0),
				!h(i) || !(v !== s.current))
			)
				return;
			const f = h(r),
				y = Ln(h(i));
			v
				? l('MOUNT')
				: y === 'none' || h(n).display === 'none'
					? l('UNMOUNT')
					: l(s && f !== y ? 'ANIMATION_OUT' : 'UNMOUNT');
		});
	});
	function u(v) {
		if ((h(i) || E(i, document.getElementById(t.current), !0), !h(i))) return;
		const m = Ln(h(i)),
			f = m.includes(v.animationName) || m === 'none';
		v.target === h(i) && f && l('ANIMATION_END');
	}
	function d(v) {
		h(i) || E(i, document.getElementById(t.current), !0),
			h(i) && v.target === h(i) && E(r, Ln(h(i)), !0);
	}
	N(() => {
		c.current,
			at(() => {
				if ((h(i) || E(i, document.getElementById(t.current), !0), !h(i))) return;
				const v = Ln(h(i));
				E(r, c.current === 'mounted' ? v : 'none', !0);
			});
	}),
		N(() => {
			if (h(i))
				return (
					E(n, getComputedStyle(h(i)), !0),
					h(i).addEventListener('animationstart', d),
					h(i).addEventListener('animationcancel', u),
					h(i).addEventListener('animationend', u),
					() => {
						var v, m, f;
						(v = h(i)) == null || v.removeEventListener('animationstart', d),
							(m = h(i)) == null || m.removeEventListener('animationcancel', u),
							(f = h(i)) == null || f.removeEventListener('animationend', u);
					}
				);
		});
	const g = F(() => ['mounted', 'unmountSuspended'].includes(c.current));
	return {
		get current() {
			return h(g);
		}
	};
}
function Ln(e) {
	return (e && getComputedStyle(e).animationName) || 'none';
}
function vs(e, t) {
	W(t, !0);
	const n = ms(
		p.with(() => t.present),
		p.with(() => t.id)
	);
	var r = R(),
		o = D(r);
	{
		var i = (s) => {
			var c = R(),
				l = D(c);
			V(
				l,
				() => t.presence ?? Z,
				() => ({ present: n })
			),
				T(s, c);
		};
		ot(o, (s) => {
			(t.forceMount || t.present || n.current) && s(i);
		});
	}
	T(e, r), K();
}
function ws(e, t) {
	var n = R(),
		r = D(n);
	po(
		r,
		() => t.children,
		(o) => {
			var i = R(),
				s = D(i);
			V(s, () => t.children ?? Z), T(o, i);
		}
	),
		T(e, n);
}
function ys(e, t) {
	W(t, !0);
	let n = b(t, 'to', 3, 'body');
	const r = so();
	let o = F(i);
	function i() {
		if (!hr || t.disabled) return null;
		let d = null;
		return (
			typeof n() == 'string'
				? (d = document.querySelector(n()))
				: (n() instanceof HTMLElement || n() instanceof DocumentFragment) && (d = n()),
			d
		);
	}
	let s;
	N(() => {
		if (!h(o) || t.disabled) {
			s && (Xr(s), (s = null));
			return;
		}
		return (
			at(
				() =>
					(s = yo(ws, { target: h(o), props: { children: t.children }, context: r }))
			),
			() => {
				s && (Xr(s), (s = null));
			}
		);
	});
	var c = R(),
		l = D(c);
	{
		var u = (d) => {
			var g = R(),
				v = D(g);
			V(v, () => t.children ?? Z), T(d, g);
		};
		ot(l, (d) => {
			t.disabled && d(u);
		});
	}
	T(e, c), K();
}
function vt(e, t, n, r) {
	const o = Array.isArray(t) ? t : [t];
	return (
		o.forEach((i) => e.addEventListener(i, n, r)),
		() => {
			o.forEach((i) => e.removeEventListener(i, n, r));
		}
	);
}
function Qr(e, t = 500) {
	let n = null;
	const r = (...o) => {
		n !== null && clearTimeout(n),
			(n = setTimeout(() => {
				e(...o);
			}, t));
	};
	return (
		(r.destroy = () => {
			n !== null && (clearTimeout(n), (n = null));
		}),
		r
	);
}
function _r(e, t) {
	return e === t || e.contains(t);
}
function Si(e) {
	return (e == null ? void 0 : e.ownerDocument) ?? document;
}
globalThis.bitsDismissableLayers ?? (globalThis.bitsDismissableLayers = new Map());
var te,
	Ut,
	Dt,
	ee,
	It,
	ne,
	re,
	_e,
	Fe,
	De,
	St,
	Zn,
	ve,
	Pi,
	Jn,
	ie,
	Qn,
	Gn,
	$n,
	tr,
	Ie,
	Oi,
	er,
	nr;
class ps {
	constructor(t) {
		w(this, ve);
		w(this, te);
		w(this, Ut);
		w(this, Dt, { pointerdown: !1 });
		w(this, ee, !1);
		k(this, 'node', p(null));
		w(this, It);
		w(this, ne);
		w(this, re, M(!1));
		w(this, _e);
		w(this, Fe, M(null));
		w(this, De);
		w(this, St, nt);
		w(this, Zn, (t) => {
			t.defaultPrevented ||
				(this.currNode &&
					fr(() => {
						var n, r;
						!this.currNode ||
							a(this, tr).call(this, t.target) ||
							(t.target &&
								!h(a(this, re)) &&
								((r = (n = a(this, _e)).current) == null || r.call(n, t)));
					}));
		});
		w(this, Jn, (t) => {
			let n = t;
			n.defaultPrevented && (n = Gr(t)), a(this, te).current(t);
		});
		w(
			this,
			ie,
			Qr((t) => {
				if (!this.currNode) {
					a(this, St).call(this);
					return;
				}
				const n = a(this, De).current(t, this.currNode) || Ps(t, this.currNode);
				if (!a(this, ee) || lt(this, ve, Oi).call(this) || !n) {
					a(this, St).call(this);
					return;
				}
				let r = t;
				if (
					(r.defaultPrevented && (r = Gr(r)),
					a(this, Ut).current !== 'close' &&
						a(this, Ut).current !== 'defer-otherwise-close')
				) {
					a(this, St).call(this);
					return;
				}
				t.pointerType === 'touch'
					? (a(this, St).call(this),
						_(this, St, vt(a(this, It), 'click', a(this, Jn), { once: !0 })))
					: a(this, te).current(r);
			}, 10)
		);
		w(this, Qn, (t) => {
			a(this, Dt)[t.type] = !0;
		});
		w(this, Gn, (t) => {
			a(this, Dt)[t.type] = !1;
		});
		w(this, $n, () => {
			this.node.current && _(this, ee, Ss(this.node.current));
		});
		w(this, tr, (t) => (this.node.current ? _r(this.node.current, t) : !1));
		w(
			this,
			Ie,
			Qr(() => {
				for (const t in a(this, Dt)) a(this, Dt)[t] = !1;
				_(this, ee, !1);
			}, 20)
		);
		w(this, er, () => {
			E(a(this, re), !0);
		});
		w(this, nr, () => {
			E(a(this, re), !1);
		});
		k(this, 'props', { onfocuscapture: a(this, er), onblurcapture: a(this, nr) });
		_(this, ne, t.enabled),
			_(this, De, t.isValidEvent),
			Ot({
				id: t.id,
				ref: this.node,
				deps: () => a(this, ne).current,
				onRefChange: (o) => {
					this.currNode = o;
				}
			}),
			_(this, Ut, t.interactOutsideBehavior),
			_(this, te, t.onInteractOutside),
			_(this, _e, t.onFocusOutside),
			N(() => {
				_(this, It, Si(this.currNode));
			});
		let n = nt;
		const r = () => {
			a(this, Ie).call(this),
				globalThis.bitsDismissableLayers.delete(this),
				a(this, ie).destroy(),
				n();
		};
		N(
			() => (
				a(this, ne).current &&
					this.currNode &&
					bi(1, () => {
						this.currNode &&
							(globalThis.bitsDismissableLayers.set(
								this,
								at(() => a(this, Ut))
							),
							n(),
							(n = lt(this, ve, Pi).call(this)));
					}),
				() => {
					r();
				}
			)
		),
			pi(() => {
				a(this, Ie).destroy(),
					globalThis.bitsDismissableLayers.delete(this),
					a(this, ie).destroy(),
					a(this, St).call(this),
					n();
			});
	}
	get currNode() {
		return h(a(this, Fe));
	}
	set currNode(t) {
		E(a(this, Fe), t, !0);
	}
}
(te = new WeakMap()),
	(Ut = new WeakMap()),
	(Dt = new WeakMap()),
	(ee = new WeakMap()),
	(It = new WeakMap()),
	(ne = new WeakMap()),
	(re = new WeakMap()),
	(_e = new WeakMap()),
	(Fe = new WeakMap()),
	(De = new WeakMap()),
	(St = new WeakMap()),
	(Zn = new WeakMap()),
	(ve = new WeakSet()),
	(Pi = function () {
		return Jt(
			vt(a(this, It), 'pointerdown', Jt(a(this, Qn), a(this, $n)), !0),
			vt(a(this, It), 'pointerdown', Jt(a(this, Gn), a(this, ie))),
			vt(a(this, It), 'focusin', a(this, Zn))
		);
	}),
	(Jn = new WeakMap()),
	(ie = new WeakMap()),
	(Qn = new WeakMap()),
	(Gn = new WeakMap()),
	($n = new WeakMap()),
	(tr = new WeakMap()),
	(Ie = new WeakMap()),
	(Oi = function () {
		return Object.values(a(this, Dt)).some(Boolean);
	}),
	(er = new WeakMap()),
	(nr = new WeakMap());
function bs(e) {
	return new ps(e);
}
function xs(e) {
	return e.findLast(([t, { current: n }]) => n === 'close' || n === 'ignore');
}
function Ss(e) {
	const t = [...globalThis.bitsDismissableLayers],
		n = xs(t);
	if (n) return n[0].node.current === e;
	const [r] = t[0];
	return r.node.current === e;
}
function Ps(e, t) {
	if ('button' in e && e.button > 0) return !1;
	const n = e.target;
	return cs(n) ? Si(n).documentElement.contains(n) && !_r(t, n) : !1;
}
function Gr(e) {
	const t = e.currentTarget,
		n = e.target;
	let r;
	e instanceof PointerEvent
		? (r = new PointerEvent(e.type, e))
		: (r = new PointerEvent('pointerdown', e));
	let o = !1;
	return new Proxy(r, {
		get: (s, c) =>
			c === 'currentTarget'
				? t
				: c === 'target'
					? n
					: c === 'preventDefault'
						? () => {
								(o = !0), typeof s.preventDefault == 'function' && s.preventDefault();
							}
						: c === 'defaultPrevented'
							? o
							: c in s
								? s[c]
								: e[c]
	});
}
function Os(e, t) {
	W(t, !0);
	let n = b(t, 'interactOutsideBehavior', 3, 'close'),
		r = b(t, 'onInteractOutside', 3, nt),
		o = b(t, 'onFocusOutside', 3, nt),
		i = b(t, 'isValidEvent', 3, () => !1);
	const s = bs({
		id: p.with(() => t.id),
		interactOutsideBehavior: p.with(() => n()),
		onInteractOutside: p.with(() => r()),
		enabled: p.with(() => t.enabled),
		onFocusOutside: p.with(() => o()),
		isValidEvent: p.with(() => i())
	});
	var c = R(),
		l = D(c);
	V(
		l,
		() => t.children ?? Z,
		() => ({ props: s.props })
	),
		T(e, c),
		K();
}
globalThis.bitsEscapeLayers ?? (globalThis.bitsEscapeLayers = new Map());
var Re, oe, Le, rr, ir;
class As {
	constructor(t) {
		w(this, Re);
		w(this, oe);
		w(this, Le);
		w(this, rr, () => vt(document, 'keydown', a(this, ir), { passive: !1 }));
		w(this, ir, (t) => {
			if (t.key !== is || !Cs(this)) return;
			const n = new KeyboardEvent(t.type, t);
			t.preventDefault();
			const r = a(this, oe).current;
			(r !== 'close' && r !== 'defer-otherwise-close') || a(this, Re).current(n);
		});
		_(this, oe, t.escapeKeydownBehavior),
			_(this, Re, t.onEscapeKeydown),
			_(this, Le, t.enabled);
		let n = nt;
		N(
			() => (
				a(this, Le).current &&
					(globalThis.bitsEscapeLayers.set(
						this,
						at(() => a(this, oe))
					),
					(n = a(this, rr).call(this))),
				() => {
					n(), globalThis.bitsEscapeLayers.delete(this);
				}
			)
		);
	}
}
(Re = new WeakMap()),
	(oe = new WeakMap()),
	(Le = new WeakMap()),
	(rr = new WeakMap()),
	(ir = new WeakMap());
function Es(e) {
	return new As(e);
}
function Cs(e) {
	const t = [...globalThis.bitsEscapeLayers],
		n = t.findLast(([o, { current: i }]) => i === 'close' || i === 'ignore');
	if (n) return n[0] === e;
	const [r] = t[0];
	return r === e;
}
function Ts(e, t) {
	W(t, !0);
	let n = b(t, 'escapeKeydownBehavior', 3, 'close'),
		r = b(t, 'onEscapeKeydown', 3, nt);
	Es({
		escapeKeydownBehavior: p.with(() => n()),
		onEscapeKeydown: p.with(() => r()),
		enabled: p.with(() => t.enabled)
	});
	var o = R(),
		i = D(o);
	V(i, () => t.children ?? Z), T(e, o), K();
}
const _s = p([]);
function Fs() {
	const e = _s;
	return {
		add(t) {
			const n = e.current[0];
			t.id !== (n == null ? void 0 : n.id) && (n == null || n.pause()),
				(e.current = $r(e.current, t)),
				e.current.unshift(t);
		},
		remove(t) {
			var n;
			(e.current = $r(e.current, t)), (n = e.current[0]) == null || n.resume();
		}
	};
}
function Ds() {
	let e = M(!1);
	return {
		id: Xt(),
		get paused() {
			return h(e);
		},
		pause() {
			E(e, !0);
		},
		resume() {
			E(e, !1);
		}
	};
}
function $r(e, t) {
	return [...e].filter((n) => n.id !== t.id);
}
function Is(e) {
	return e.filter((t) => t.tagName !== 'A');
}
function Tt(e, { select: t = !1 } = {}) {
	if (!(e && e.focus)) return;
	const n = document.activeElement;
	e.focus({ preventScroll: !0 }), e !== n && us(e) && t && e.select();
}
function Rs(e, { select: t = !1 } = {}) {
	const n = document.activeElement;
	for (const r of e)
		if ((Tt(r, { select: t }), document.activeElement !== n)) return !0;
}
function ti(e, t) {
	for (const n of e) if (!ds(n, t)) return n;
}
function Ai(e) {
	const t = [],
		n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
			acceptNode: (r) => {
				const o = r.tagName === 'INPUT' && r.type === 'hidden';
				return r.disabled || r.hidden || o
					? NodeFilter.FILTER_SKIP
					: r.tabIndex >= 0
						? NodeFilter.FILTER_ACCEPT
						: NodeFilter.FILTER_SKIP;
			}
		});
	for (; n.nextNode(); ) t.push(n.currentNode);
	return t;
}
function Ls(e) {
	const t = Ai(e),
		n = ti(t, e),
		r = ti(t.reverse(), e);
	return [n, r];
}
const Ns = 'focusScope.autoFocusOnMount',
	Bs = 'focusScope.autoFocusOnDestroy',
	ei = { bubbles: !1, cancelable: !0 };
function ks({
	id: e,
	loop: t,
	enabled: n,
	onOpenAutoFocus: r,
	onCloseAutoFocus: o,
	forceMount: i
}) {
	const s = Fs(),
		c = Ds(),
		l = p(null);
	Ot({ id: e, ref: l, deps: () => n.current });
	let u = M(null);
	N(() => {
		const f = l.current;
		if (!f || !n.current) return;
		function y(P) {
			if (c.paused || !f) return;
			const O = P.target;
			Pe(O) && (f.contains(O) ? E(u, O, !0) : Tt(h(u), { select: !0 }));
		}
		function x(P) {
			if (c.paused || !f) return;
			const O = P.relatedTarget;
			Pe(O) && O !== null && (f.contains(O) || Tt(h(u), { select: !0 }));
		}
		function S(P) {
			(f == null ? void 0 : f.contains(h(u))) || Tt(f);
		}
		return at(() => {
			const P = Jt(vt(document, 'focusin', y), vt(document, 'focusout', x)),
				O = new MutationObserver(S);
			return (
				O.observe(f, { childList: !0, subtree: !0 }),
				() => {
					P(), O.disconnect();
				}
			);
		});
	}),
		N(() => {
			if (i.current) return;
			let f = l.current;
			const y = document.activeElement;
			return (
				at(() => {
					d(f, y);
				}),
				() => {
					f && g(y);
				}
			);
		}),
		N(() => {
			if (!i.current) return;
			n.current;
			const f = l.current,
				y = document.activeElement;
			return (
				at(() => {
					d(f, y);
				}),
				() => {
					f && g(y);
				}
			);
		});
	function d(f, y) {
		if ((f || (f = document.getElementById(e.current)), !f)) return;
		if ((s.add(c), !f.contains(y))) {
			const S = new CustomEvent(Ns, ei);
			r.current(S),
				S.defaultPrevented ||
					fr(() => {
						f && (Rs(Is(Ai(f)), { select: !0 }), document.activeElement === y && Tt(f));
					});
		}
	}
	function g(f) {
		const y = new CustomEvent(Bs, ei);
		o.current(y),
			setTimeout(() => {
				!y.defaultPrevented && f && Tt(f ?? document.body, { select: !0 }), s.remove(c);
			}, 0);
	}
	function v(f) {
		if (!n.current || (!t.current && !n.current) || c.paused) return;
		const y = f.key === ss && !f.ctrlKey && !f.altKey && !f.metaKey,
			x = document.activeElement;
		if (!(y && x)) return;
		const S = l.current;
		if (!S) return;
		const [P, O] = Ls(S);
		P && O
			? !f.shiftKey && x === O
				? (f.preventDefault(), t.current && Tt(P, { select: !0 }))
				: f.shiftKey &&
					x === P &&
					(f.preventDefault(), t.current && Tt(O, { select: !0 }))
			: x === S && f.preventDefault();
	}
	const m = F(() => ({ id: e.current, tabindex: -1, onkeydown: v }));
	return {
		get props() {
			return h(m);
		}
	};
}
function Ms(e, t) {
	W(t, !0);
	let n = b(t, 'trapFocus', 3, !1),
		r = b(t, 'loop', 3, !1),
		o = b(t, 'onCloseAutoFocus', 3, nt),
		i = b(t, 'onOpenAutoFocus', 3, nt),
		s = b(t, 'forceMount', 3, !1);
	const c = ks({
		enabled: p.with(() => n()),
		loop: p.with(() => r()),
		onCloseAutoFocus: p.with(() => o()),
		onOpenAutoFocus: p.with(() => i()),
		id: p.with(() => t.id),
		forceMount: p.with(() => s())
	});
	var l = R(),
		u = D(l);
	V(
		u,
		() => t.focusScope ?? Z,
		() => ({ props: c.props })
	),
		T(e, l),
		K();
}
globalThis.bitsTextSelectionLayers ?? (globalThis.bitsTextSelectionLayers = new Map());
var Ne, Be, ke, Rt, se, Me, or, Ei, sr, We;
class Ws {
	constructor(t) {
		w(this, or);
		w(this, Ne);
		w(this, Be);
		w(this, ke);
		w(this, Rt);
		w(this, se, nt);
		w(this, Me, p(null));
		w(this, sr, (t) => {
			const n = a(this, Me).current,
				r = t.target;
			!Pe(n) ||
				!Pe(r) ||
				!a(this, Rt).current ||
				!Us(this) ||
				!_r(n, r) ||
				(a(this, Be).current(t), !t.defaultPrevented && _(this, se, Hs(n)));
		});
		w(this, We, () => {
			a(this, se).call(this), _(this, se, nt);
		});
		_(this, Ne, t.id),
			_(this, Rt, t.preventOverflowTextSelection),
			_(this, Be, t.onPointerDown),
			_(this, ke, t.onPointerUp),
			Ot({ id: a(this, Ne), ref: a(this, Me), deps: () => a(this, Rt).current });
		let n = nt;
		N(
			() => (
				a(this, Rt).current &&
					(globalThis.bitsTextSelectionLayers.set(
						this,
						at(() => a(this, Rt))
					),
					(n = lt(this, or, Ei).call(this))),
				() => {
					n(), a(this, We).call(this), globalThis.bitsTextSelectionLayers.delete(this);
				}
			)
		);
	}
}
(Ne = new WeakMap()),
	(Be = new WeakMap()),
	(ke = new WeakMap()),
	(Rt = new WeakMap()),
	(se = new WeakMap()),
	(Me = new WeakMap()),
	(or = new WeakSet()),
	(Ei = function () {
		return Jt(
			vt(document, 'pointerdown', a(this, sr)),
			vt(document, 'pointerup', wi(a(this, We), a(this, ke)))
		);
	}),
	(sr = new WeakMap()),
	(We = new WeakMap());
function Ks(e) {
	return new Ws(e);
}
const ni = (e) => e.style.userSelect || e.style.webkitUserSelect;
function Hs(e) {
	const t = document.body,
		n = ni(t),
		r = ni(e);
	return (
		Nn(t, 'none'),
		Nn(e, 'text'),
		() => {
			Nn(t, n), Nn(e, r);
		}
	);
}
function Nn(e, t) {
	(e.style.userSelect = t), (e.style.webkitUserSelect = t);
}
function Us(e) {
	const t = [...globalThis.bitsTextSelectionLayers];
	if (!t.length) return !1;
	const n = t.at(-1);
	return n ? n[0] === e : !1;
}
function Vs(e, t) {
	W(t, !0);
	let n = b(t, 'preventOverflowTextSelection', 3, !0),
		r = b(t, 'onPointerDown', 3, nt),
		o = b(t, 'onPointerUp', 3, nt);
	Ks({
		id: p.with(() => t.id),
		preventOverflowTextSelection: p.with(() => n()),
		onPointerDown: p.with(() => r()),
		onPointerUp: p.with(() => o()),
		enabled: p.with(() => t.enabled)
	});
	var i = R(),
		s = D(i);
	V(s, () => t.children ?? Z), T(e, i), K();
}
function zs(e) {
	let t = 0,
		n = M(void 0),
		r;
	function o() {
		(t -= 1), r && t <= 0 && (r(), E(n, void 0), (r = void 0));
	}
	return (...i) => (
		(t += 1),
		h(n) === void 0 &&
			(r = ao(() => {
				E(n, e(...i), !0);
			})),
		N(() => () => {
			o();
		}),
		h(n)
	);
}
const js = zs(() => {
	const e = new xr(),
		t = F(() => {
			for (const i of e.values()) if (i) return !0;
			return !1;
		});
	let n = zt({}),
		r = null;
	function o() {
		hr &&
			((document.body.style.paddingRight = n.paddingRight ?? ''),
			(document.body.style.marginRight = n.marginRight ?? ''),
			(document.body.style.pointerEvents = n.pointerEvents ?? ''),
			document.body.style.removeProperty('--scrollbar-width'),
			(document.body.style.overflow = n.overflow ?? ''),
			Zr && (r == null || r()));
	}
	return (
		N(() => {
			const i = h(t);
			return at(() => {
				if (!i) return;
				const s = getComputedStyle(document.body);
				(n.overflow = s.overflow),
					(n.paddingRight = s.paddingRight),
					(n.marginRight = s.marginRight),
					(n.pointerEvents = s.pointerEvents);
				const c = window.innerWidth - document.documentElement.clientWidth,
					u = {
						padding: Number.parseInt(n.paddingRight ?? '0', 10) + c,
						margin: Number.parseInt(n.marginRight ?? '0', 10)
					};
				c > 0 &&
					((document.body.style.paddingRight = `${u.padding}px`),
					(document.body.style.marginRight = `${u.margin}px`),
					document.body.style.setProperty('--scrollbar-width', `${c}px`),
					(document.body.style.overflow = 'hidden')),
					Zr &&
						(r = vt(
							document,
							'touchmove',
							(d) => {
								d.target === document.documentElement &&
									(d.touches.length > 1 || d.preventDefault());
							},
							{ passive: !1 }
						)),
					fr(() => {
						(document.body.style.pointerEvents = 'none'),
							(document.body.style.overflow = 'hidden');
					});
			});
		}),
		N(() => () => {
			r == null || r();
		}),
		{
			get map() {
				return e;
			},
			resetBodyStyle: o
		}
	);
});
function Ys(e, t = () => null) {
	const n = Xt(),
		r = js(),
		o = F(t);
	r.map.set(n, e ?? !1);
	const i = p.with(
		() => r.map.get(n) ?? !1,
		(s) => r.map.set(n, s)
	);
	return (
		N(() => () => {
			r.map.delete(n),
				!Xs(r.map) &&
					(h(o) === null
						? requestAnimationFrame(() => r.resetBodyStyle())
						: bi(h(o), () => r.resetBodyStyle()));
		}),
		i
	);
}
function Xs(e) {
	for (const [t, n] of e) if (n) return !0;
	return !1;
}
function ri(e, t) {
	W(t, !0);
	let n = b(t, 'preventScroll', 3, !0),
		r = b(t, 'restoreScrollDelay', 3, null);
	Ys(n(), () => r()), K();
}
const qs = ['top', 'right', 'bottom', 'left'],
	Bt = Math.min,
	st = Math.max,
	Yn = Math.round,
	Bn = Math.floor,
	wt = (e) => ({ x: e, y: e }),
	Zs = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' },
	Js = { start: 'end', end: 'start' };
function Or(e, t, n) {
	return st(e, Bt(t, n));
}
function At(e, t) {
	return typeof e == 'function' ? e(t) : e;
}
function Et(e) {
	return e.split('-')[0];
}
function we(e) {
	return e.split('-')[1];
}
function Fr(e) {
	return e === 'x' ? 'y' : 'x';
}
function Dr(e) {
	return e === 'y' ? 'height' : 'width';
}
function Pt(e) {
	return ['top', 'bottom'].includes(Et(e)) ? 'y' : 'x';
}
function Ir(e) {
	return Fr(Pt(e));
}
function Qs(e, t, n) {
	n === void 0 && (n = !1);
	const r = we(e),
		o = Ir(e),
		i = Dr(o);
	let s =
		o === 'x'
			? r === (n ? 'end' : 'start')
				? 'right'
				: 'left'
			: r === 'start'
				? 'bottom'
				: 'top';
	return t.reference[i] > t.floating[i] && (s = Xn(s)), [s, Xn(s)];
}
function Gs(e) {
	const t = Xn(e);
	return [Ar(e), t, Ar(t)];
}
function Ar(e) {
	return e.replace(/start|end/g, (t) => Js[t]);
}
function $s(e, t, n) {
	const r = ['left', 'right'],
		o = ['right', 'left'],
		i = ['top', 'bottom'],
		s = ['bottom', 'top'];
	switch (e) {
		case 'top':
		case 'bottom':
			return n ? (t ? o : r) : t ? r : o;
		case 'left':
		case 'right':
			return t ? i : s;
		default:
			return [];
	}
}
function ta(e, t, n, r) {
	const o = we(e);
	let i = $s(Et(e), n === 'start', r);
	return o && ((i = i.map((s) => s + '-' + o)), t && (i = i.concat(i.map(Ar)))), i;
}
function Xn(e) {
	return e.replace(/left|right|bottom|top/g, (t) => Zs[t]);
}
function ea(e) {
	return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function Ci(e) {
	return typeof e != 'number' ? ea(e) : { top: e, right: e, bottom: e, left: e };
}
function qn(e) {
	const { x: t, y: n, width: r, height: o } = e;
	return {
		width: r,
		height: o,
		top: n,
		left: t,
		right: t + r,
		bottom: n + o,
		x: t,
		y: n
	};
}
function ii(e, t, n) {
	let { reference: r, floating: o } = e;
	const i = Pt(t),
		s = Ir(t),
		c = Dr(s),
		l = Et(t),
		u = i === 'y',
		d = r.x + r.width / 2 - o.width / 2,
		g = r.y + r.height / 2 - o.height / 2,
		v = r[c] / 2 - o[c] / 2;
	let m;
	switch (l) {
		case 'top':
			m = { x: d, y: r.y - o.height };
			break;
		case 'bottom':
			m = { x: d, y: r.y + r.height };
			break;
		case 'right':
			m = { x: r.x + r.width, y: g };
			break;
		case 'left':
			m = { x: r.x - o.width, y: g };
			break;
		default:
			m = { x: r.x, y: r.y };
	}
	switch (we(t)) {
		case 'start':
			m[s] -= v * (n && u ? -1 : 1);
			break;
		case 'end':
			m[s] += v * (n && u ? -1 : 1);
			break;
	}
	return m;
}
const na = async (e, t, n) => {
	const {
			placement: r = 'bottom',
			strategy: o = 'absolute',
			middleware: i = [],
			platform: s
		} = n,
		c = i.filter(Boolean),
		l = await (s.isRTL == null ? void 0 : s.isRTL(t));
	let u = await s.getElementRects({ reference: e, floating: t, strategy: o }),
		{ x: d, y: g } = ii(u, r, l),
		v = r,
		m = {},
		f = 0;
	for (let y = 0; y < c.length; y++) {
		const { name: x, fn: S } = c[y],
			{
				x: P,
				y: O,
				data: A,
				reset: C
			} = await S({
				x: d,
				y: g,
				initialPlacement: r,
				placement: v,
				strategy: o,
				middlewareData: m,
				rects: u,
				platform: s,
				elements: { reference: e, floating: t }
			});
		(d = P ?? d),
			(g = O ?? g),
			(m = { ...m, [x]: { ...m[x], ...A } }),
			C &&
				f <= 50 &&
				(f++,
				typeof C == 'object' &&
					(C.placement && (v = C.placement),
					C.rects &&
						(u =
							C.rects === !0
								? await s.getElementRects({ reference: e, floating: t, strategy: o })
								: C.rects),
					({ x: d, y: g } = ii(u, v, l))),
				(y = -1));
	}
	return { x: d, y: g, placement: v, strategy: o, middlewareData: m };
};
async function Oe(e, t) {
	var n;
	t === void 0 && (t = {});
	const { x: r, y: o, platform: i, rects: s, elements: c, strategy: l } = e,
		{
			boundary: u = 'clippingAncestors',
			rootBoundary: d = 'viewport',
			elementContext: g = 'floating',
			altBoundary: v = !1,
			padding: m = 0
		} = At(t, e),
		f = Ci(m),
		x = c[v ? (g === 'floating' ? 'reference' : 'floating') : g],
		S = qn(
			await i.getClippingRect({
				element:
					(n = await (i.isElement == null ? void 0 : i.isElement(x))) == null || n
						? x
						: x.contextElement ||
							(await (i.getDocumentElement == null
								? void 0
								: i.getDocumentElement(c.floating))),
				boundary: u,
				rootBoundary: d,
				strategy: l
			})
		),
		P =
			g === 'floating'
				? { x: r, y: o, width: s.floating.width, height: s.floating.height }
				: s.reference,
		O = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(c.floating)),
		A = (await (i.isElement == null ? void 0 : i.isElement(O)))
			? (await (i.getScale == null ? void 0 : i.getScale(O))) || { x: 1, y: 1 }
			: { x: 1, y: 1 },
		C = qn(
			i.convertOffsetParentRelativeRectToViewportRelativeRect
				? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: c,
						rect: P,
						offsetParent: O,
						strategy: l
					})
				: P
		);
	return {
		top: (S.top - C.top + f.top) / A.y,
		bottom: (C.bottom - S.bottom + f.bottom) / A.y,
		left: (S.left - C.left + f.left) / A.x,
		right: (C.right - S.right + f.right) / A.x
	};
}
const ra = (e) => ({
		name: 'arrow',
		options: e,
		async fn(t) {
			const {
					x: n,
					y: r,
					placement: o,
					rects: i,
					platform: s,
					elements: c,
					middlewareData: l
				} = t,
				{ element: u, padding: d = 0 } = At(e, t) || {};
			if (u == null) return {};
			const g = Ci(d),
				v = { x: n, y: r },
				m = Ir(o),
				f = Dr(m),
				y = await s.getDimensions(u),
				x = m === 'y',
				S = x ? 'top' : 'left',
				P = x ? 'bottom' : 'right',
				O = x ? 'clientHeight' : 'clientWidth',
				A = i.reference[f] + i.reference[m] - v[m] - i.floating[f],
				C = v[m] - i.reference[m],
				L = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
			let I = L ? L[O] : 0;
			(!I || !(await (s.isElement == null ? void 0 : s.isElement(L)))) &&
				(I = c.floating[O] || i.floating[f]);
			const et = A / 2 - C / 2,
				z = I / 2 - y[f] / 2 - 1,
				B = Bt(g[S], z),
				j = Bt(g[P], z),
				Q = B,
				G = I - y[f] - j,
				rt = I / 2 - y[f] / 2 + et,
				H = Or(Q, rt, G),
				J =
					!l.arrow &&
					we(o) != null &&
					rt !== H &&
					i.reference[f] / 2 - (rt < Q ? B : j) - y[f] / 2 < 0,
				$ = J ? (rt < Q ? rt - Q : rt - G) : 0;
			return {
				[m]: v[m] + $,
				data: { [m]: H, centerOffset: rt - H - $, ...(J && { alignmentOffset: $ }) },
				reset: J
			};
		}
	}),
	ia = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: 'flip',
				options: e,
				async fn(t) {
					var n, r;
					const {
							placement: o,
							middlewareData: i,
							rects: s,
							initialPlacement: c,
							platform: l,
							elements: u
						} = t,
						{
							mainAxis: d = !0,
							crossAxis: g = !0,
							fallbackPlacements: v,
							fallbackStrategy: m = 'bestFit',
							fallbackAxisSideDirection: f = 'none',
							flipAlignment: y = !0,
							...x
						} = At(e, t);
					if ((n = i.arrow) != null && n.alignmentOffset) return {};
					const S = Et(o),
						P = Pt(c),
						O = Et(c) === c,
						A = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)),
						C = v || (O || !y ? [Xn(c)] : Gs(c)),
						L = f !== 'none';
					!v && L && C.push(...ta(c, y, f, A));
					const I = [c, ...C],
						et = await Oe(t, x),
						z = [];
					let B = ((r = i.flip) == null ? void 0 : r.overflows) || [];
					if ((d && z.push(et[S]), g)) {
						const H = Qs(o, s, A);
						z.push(et[H[0]], et[H[1]]);
					}
					if (((B = [...B, { placement: o, overflows: z }]), !z.every((H) => H <= 0))) {
						var j, Q;
						const H = (((j = i.flip) == null ? void 0 : j.index) || 0) + 1,
							J = I[H];
						if (J) {
							var G;
							const Y = g === 'alignment' ? P !== Pt(J) : !1,
								X = ((G = B[0]) == null ? void 0 : G.overflows[0]) > 0;
							if (!Y || X)
								return { data: { index: H, overflows: B }, reset: { placement: J } };
						}
						let $ =
							(Q = B.filter((Y) => Y.overflows[0] <= 0).sort(
								(Y, X) => Y.overflows[1] - X.overflows[1]
							)[0]) == null
								? void 0
								: Q.placement;
						if (!$)
							switch (m) {
								case 'bestFit': {
									var rt;
									const Y =
										(rt = B.filter((X) => {
											if (L) {
												const it = Pt(X.placement);
												return it === P || it === 'y';
											}
											return !0;
										})
											.map((X) => [
												X.placement,
												X.overflows
													.filter((it) => it > 0)
													.reduce((it, Wt) => it + Wt, 0)
											])
											.sort((X, it) => X[1] - it[1])[0]) == null
											? void 0
											: rt[0];
									Y && ($ = Y);
									break;
								}
								case 'initialPlacement':
									$ = c;
									break;
							}
						if (o !== $) return { reset: { placement: $ } };
					}
					return {};
				}
			}
		);
	};
function oi(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function si(e) {
	return qs.some((t) => e[t] >= 0);
}
const oa = function (e) {
	return (
		e === void 0 && (e = {}),
		{
			name: 'hide',
			options: e,
			async fn(t) {
				const { rects: n } = t,
					{ strategy: r = 'referenceHidden', ...o } = At(e, t);
				switch (r) {
					case 'referenceHidden': {
						const i = await Oe(t, { ...o, elementContext: 'reference' }),
							s = oi(i, n.reference);
						return { data: { referenceHiddenOffsets: s, referenceHidden: si(s) } };
					}
					case 'escaped': {
						const i = await Oe(t, { ...o, altBoundary: !0 }),
							s = oi(i, n.floating);
						return { data: { escapedOffsets: s, escaped: si(s) } };
					}
					default:
						return {};
				}
			}
		}
	);
};
async function sa(e, t) {
	const { placement: n, platform: r, elements: o } = e,
		i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)),
		s = Et(n),
		c = we(n),
		l = Pt(n) === 'y',
		u = ['left', 'top'].includes(s) ? -1 : 1,
		d = i && l ? -1 : 1,
		g = At(t, e);
	let {
		mainAxis: v,
		crossAxis: m,
		alignmentAxis: f
	} = typeof g == 'number'
		? { mainAxis: g, crossAxis: 0, alignmentAxis: null }
		: {
				mainAxis: g.mainAxis || 0,
				crossAxis: g.crossAxis || 0,
				alignmentAxis: g.alignmentAxis
			};
	return (
		c && typeof f == 'number' && (m = c === 'end' ? f * -1 : f),
		l ? { x: m * d, y: v * u } : { x: v * u, y: m * d }
	);
}
const aa = function (e) {
		return (
			e === void 0 && (e = 0),
			{
				name: 'offset',
				options: e,
				async fn(t) {
					var n, r;
					const { x: o, y: i, placement: s, middlewareData: c } = t,
						l = await sa(t, e);
					return s === ((n = c.offset) == null ? void 0 : n.placement) &&
						(r = c.arrow) != null &&
						r.alignmentOffset
						? {}
						: { x: o + l.x, y: i + l.y, data: { ...l, placement: s } };
				}
			}
		);
	},
	ca = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: 'shift',
				options: e,
				async fn(t) {
					const { x: n, y: r, placement: o } = t,
						{
							mainAxis: i = !0,
							crossAxis: s = !1,
							limiter: c = {
								fn: (x) => {
									let { x: S, y: P } = x;
									return { x: S, y: P };
								}
							},
							...l
						} = At(e, t),
						u = { x: n, y: r },
						d = await Oe(t, l),
						g = Pt(Et(o)),
						v = Fr(g);
					let m = u[v],
						f = u[g];
					if (i) {
						const x = v === 'y' ? 'top' : 'left',
							S = v === 'y' ? 'bottom' : 'right',
							P = m + d[x],
							O = m - d[S];
						m = Or(P, m, O);
					}
					if (s) {
						const x = g === 'y' ? 'top' : 'left',
							S = g === 'y' ? 'bottom' : 'right',
							P = f + d[x],
							O = f - d[S];
						f = Or(P, f, O);
					}
					const y = c.fn({ ...t, [v]: m, [g]: f });
					return {
						...y,
						data: { x: y.x - n, y: y.y - r, enabled: { [v]: i, [g]: s } }
					};
				}
			}
		);
	},
	la = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				options: e,
				fn(t) {
					const { x: n, y: r, placement: o, rects: i, middlewareData: s } = t,
						{ offset: c = 0, mainAxis: l = !0, crossAxis: u = !0 } = At(e, t),
						d = { x: n, y: r },
						g = Pt(o),
						v = Fr(g);
					let m = d[v],
						f = d[g];
					const y = At(c, t),
						x =
							typeof y == 'number'
								? { mainAxis: y, crossAxis: 0 }
								: { mainAxis: 0, crossAxis: 0, ...y };
					if (l) {
						const O = v === 'y' ? 'height' : 'width',
							A = i.reference[v] - i.floating[O] + x.mainAxis,
							C = i.reference[v] + i.reference[O] - x.mainAxis;
						m < A ? (m = A) : m > C && (m = C);
					}
					if (u) {
						var S, P;
						const O = v === 'y' ? 'width' : 'height',
							A = ['top', 'left'].includes(Et(o)),
							C =
								i.reference[g] -
								i.floating[O] +
								((A && ((S = s.offset) == null ? void 0 : S[g])) || 0) +
								(A ? 0 : x.crossAxis),
							L =
								i.reference[g] +
								i.reference[O] +
								(A ? 0 : ((P = s.offset) == null ? void 0 : P[g]) || 0) -
								(A ? x.crossAxis : 0);
						f < C ? (f = C) : f > L && (f = L);
					}
					return { [v]: m, [g]: f };
				}
			}
		);
	},
	ua = function (e) {
		return (
			e === void 0 && (e = {}),
			{
				name: 'size',
				options: e,
				async fn(t) {
					var n, r;
					const { placement: o, rects: i, platform: s, elements: c } = t,
						{ apply: l = () => {}, ...u } = At(e, t),
						d = await Oe(t, u),
						g = Et(o),
						v = we(o),
						m = Pt(o) === 'y',
						{ width: f, height: y } = i.floating;
					let x, S;
					g === 'top' || g === 'bottom'
						? ((x = g),
							(S =
								v ===
								((await (s.isRTL == null ? void 0 : s.isRTL(c.floating)))
									? 'start'
									: 'end')
									? 'left'
									: 'right'))
						: ((S = g), (x = v === 'end' ? 'top' : 'bottom'));
					const P = y - d.top - d.bottom,
						O = f - d.left - d.right,
						A = Bt(y - d[x], P),
						C = Bt(f - d[S], O),
						L = !t.middlewareData.shift;
					let I = A,
						et = C;
					if (
						((n = t.middlewareData.shift) != null && n.enabled.x && (et = O),
						(r = t.middlewareData.shift) != null && r.enabled.y && (I = P),
						L && !v)
					) {
						const B = st(d.left, 0),
							j = st(d.right, 0),
							Q = st(d.top, 0),
							G = st(d.bottom, 0);
						m
							? (et = f - 2 * (B !== 0 || j !== 0 ? B + j : st(d.left, d.right)))
							: (I = y - 2 * (Q !== 0 || G !== 0 ? Q + G : st(d.top, d.bottom)));
					}
					await l({ ...t, availableWidth: et, availableHeight: I });
					const z = await s.getDimensions(c.floating);
					return f !== z.width || y !== z.height ? { reset: { rects: !0 } } : {};
				}
			}
		);
	};
function gr() {
	return typeof window < 'u';
}
function ye(e) {
	return Ti(e) ? (e.nodeName || '').toLowerCase() : '#document';
}
function ct(e) {
	var t;
	return (
		(e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
	);
}
function bt(e) {
	var t;
	return (t = (Ti(e) ? e.ownerDocument : e.document) || window.document) == null
		? void 0
		: t.documentElement;
}
function Ti(e) {
	return gr() ? e instanceof Node || e instanceof ct(e).Node : !1;
}
function ft(e) {
	return gr() ? e instanceof Element || e instanceof ct(e).Element : !1;
}
function pt(e) {
	return gr() ? e instanceof HTMLElement || e instanceof ct(e).HTMLElement : !1;
}
function ai(e) {
	return !gr() || typeof ShadowRoot > 'u'
		? !1
		: e instanceof ShadowRoot || e instanceof ct(e).ShadowRoot;
}
function Fn(e) {
	const { overflow: t, overflowX: n, overflowY: r, display: o } = ht(e);
	return (
		/auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
		!['inline', 'contents'].includes(o)
	);
}
function da(e) {
	return ['table', 'td', 'th'].includes(ye(e));
}
function mr(e) {
	return [':popover-open', ':modal'].some((t) => {
		try {
			return e.matches(t);
		} catch {
			return !1;
		}
	});
}
function Rr(e) {
	const t = Lr(),
		n = ft(e) ? ht(e) : e;
	return (
		['transform', 'translate', 'scale', 'rotate', 'perspective'].some((r) =>
			n[r] ? n[r] !== 'none' : !1
		) ||
		(n.containerType ? n.containerType !== 'normal' : !1) ||
		(!t && (n.backdropFilter ? n.backdropFilter !== 'none' : !1)) ||
		(!t && (n.filter ? n.filter !== 'none' : !1)) ||
		['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'].some((r) =>
			(n.willChange || '').includes(r)
		) ||
		['paint', 'layout', 'strict', 'content'].some((r) => (n.contain || '').includes(r))
	);
}
function fa(e) {
	let t = kt(e);
	for (; pt(t) && !me(t); ) {
		if (Rr(t)) return t;
		if (mr(t)) return null;
		t = kt(t);
	}
	return null;
}
function Lr() {
	return typeof CSS > 'u' || !CSS.supports
		? !1
		: CSS.supports('-webkit-backdrop-filter', 'none');
}
function me(e) {
	return ['html', 'body', '#document'].includes(ye(e));
}
function ht(e) {
	return ct(e).getComputedStyle(e);
}
function vr(e) {
	return ft(e)
		? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
		: { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function kt(e) {
	if (ye(e) === 'html') return e;
	const t = e.assignedSlot || e.parentNode || (ai(e) && e.host) || bt(e);
	return ai(t) ? t.host : t;
}
function _i(e) {
	const t = kt(e);
	return me(t)
		? e.ownerDocument
			? e.ownerDocument.body
			: e.body
		: pt(t) && Fn(t)
			? t
			: _i(t);
}
function Ae(e, t, n) {
	var r;
	t === void 0 && (t = []), n === void 0 && (n = !0);
	const o = _i(e),
		i = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
		s = ct(o);
	if (i) {
		const c = Er(s);
		return t.concat(s, s.visualViewport || [], Fn(o) ? o : [], c && n ? Ae(c) : []);
	}
	return t.concat(o, Ae(o, [], n));
}
function Er(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Fi(e) {
	const t = ht(e);
	let n = parseFloat(t.width) || 0,
		r = parseFloat(t.height) || 0;
	const o = pt(e),
		i = o ? e.offsetWidth : n,
		s = o ? e.offsetHeight : r,
		c = Yn(n) !== i || Yn(r) !== s;
	return c && ((n = i), (r = s)), { width: n, height: r, $: c };
}
function Nr(e) {
	return ft(e) ? e : e.contextElement;
}
function Qt(e) {
	const t = Nr(e);
	if (!pt(t)) return wt(1);
	const n = t.getBoundingClientRect(),
		{ width: r, height: o, $: i } = Fi(t);
	let s = (i ? Yn(n.width) : n.width) / r,
		c = (i ? Yn(n.height) : n.height) / o;
	return (
		(!s || !Number.isFinite(s)) && (s = 1),
		(!c || !Number.isFinite(c)) && (c = 1),
		{ x: s, y: c }
	);
}
const ha = wt(0);
function Di(e) {
	const t = ct(e);
	return !Lr() || !t.visualViewport
		? ha
		: { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function ga(e, t, n) {
	return t === void 0 && (t = !1), !n || (t && n !== ct(e)) ? !1 : t;
}
function Yt(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	const o = e.getBoundingClientRect(),
		i = Nr(e);
	let s = wt(1);
	t && (r ? ft(r) && (s = Qt(r)) : (s = Qt(e)));
	const c = ga(i, n, r) ? Di(i) : wt(0);
	let l = (o.left + c.x) / s.x,
		u = (o.top + c.y) / s.y,
		d = o.width / s.x,
		g = o.height / s.y;
	if (i) {
		const v = ct(i),
			m = r && ft(r) ? ct(r) : r;
		let f = v,
			y = Er(f);
		for (; y && r && m !== f; ) {
			const x = Qt(y),
				S = y.getBoundingClientRect(),
				P = ht(y),
				O = S.left + (y.clientLeft + parseFloat(P.paddingLeft)) * x.x,
				A = S.top + (y.clientTop + parseFloat(P.paddingTop)) * x.y;
			(l *= x.x),
				(u *= x.y),
				(d *= x.x),
				(g *= x.y),
				(l += O),
				(u += A),
				(f = ct(y)),
				(y = Er(f));
		}
	}
	return qn({ width: d, height: g, x: l, y: u });
}
function Br(e, t) {
	const n = vr(e).scrollLeft;
	return t ? t.left + n : Yt(bt(e)).left + n;
}
function Ii(e, t, n) {
	n === void 0 && (n = !1);
	const r = e.getBoundingClientRect(),
		o = r.left + t.scrollLeft - (n ? 0 : Br(e, r)),
		i = r.top + t.scrollTop;
	return { x: o, y: i };
}
function ma(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: o } = e;
	const i = o === 'fixed',
		s = bt(r),
		c = t ? mr(t.floating) : !1;
	if (r === s || (c && i)) return n;
	let l = { scrollLeft: 0, scrollTop: 0 },
		u = wt(1);
	const d = wt(0),
		g = pt(r);
	if ((g || (!g && !i)) && ((ye(r) !== 'body' || Fn(s)) && (l = vr(r)), pt(r))) {
		const m = Yt(r);
		(u = Qt(r)), (d.x = m.x + r.clientLeft), (d.y = m.y + r.clientTop);
	}
	const v = s && !g && !i ? Ii(s, l, !0) : wt(0);
	return {
		width: n.width * u.x,
		height: n.height * u.y,
		x: n.x * u.x - l.scrollLeft * u.x + d.x + v.x,
		y: n.y * u.y - l.scrollTop * u.y + d.y + v.y
	};
}
function va(e) {
	return Array.from(e.getClientRects());
}
function wa(e) {
	const t = bt(e),
		n = vr(e),
		r = e.ownerDocument.body,
		o = st(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
		i = st(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
	let s = -n.scrollLeft + Br(e);
	const c = -n.scrollTop;
	return (
		ht(r).direction === 'rtl' && (s += st(t.clientWidth, r.clientWidth) - o),
		{ width: o, height: i, x: s, y: c }
	);
}
function ya(e, t) {
	const n = ct(e),
		r = bt(e),
		o = n.visualViewport;
	let i = r.clientWidth,
		s = r.clientHeight,
		c = 0,
		l = 0;
	if (o) {
		(i = o.width), (s = o.height);
		const u = Lr();
		(!u || (u && t === 'fixed')) && ((c = o.offsetLeft), (l = o.offsetTop));
	}
	return { width: i, height: s, x: c, y: l };
}
function pa(e, t) {
	const n = Yt(e, !0, t === 'fixed'),
		r = n.top + e.clientTop,
		o = n.left + e.clientLeft,
		i = pt(e) ? Qt(e) : wt(1),
		s = e.clientWidth * i.x,
		c = e.clientHeight * i.y,
		l = o * i.x,
		u = r * i.y;
	return { width: s, height: c, x: l, y: u };
}
function ci(e, t, n) {
	let r;
	if (t === 'viewport') r = ya(e, n);
	else if (t === 'document') r = wa(bt(e));
	else if (ft(t)) r = pa(t, n);
	else {
		const o = Di(e);
		r = { x: t.x - o.x, y: t.y - o.y, width: t.width, height: t.height };
	}
	return qn(r);
}
function Ri(e, t) {
	const n = kt(e);
	return n === t || !ft(n) || me(n) ? !1 : ht(n).position === 'fixed' || Ri(n, t);
}
function ba(e, t) {
	const n = t.get(e);
	if (n) return n;
	let r = Ae(e, [], !1).filter((c) => ft(c) && ye(c) !== 'body'),
		o = null;
	const i = ht(e).position === 'fixed';
	let s = i ? kt(e) : e;
	for (; ft(s) && !me(s); ) {
		const c = ht(s),
			l = Rr(s);
		!l && c.position === 'fixed' && (o = null),
			(
				i
					? !l && !o
					: (!l &&
							c.position === 'static' &&
							!!o &&
							['absolute', 'fixed'].includes(o.position)) ||
						(Fn(s) && !l && Ri(e, s))
			)
				? (r = r.filter((d) => d !== s))
				: (o = c),
			(s = kt(s));
	}
	return t.set(e, r), r;
}
function xa(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: o } = e;
	const s = [
			...(n === 'clippingAncestors' ? (mr(t) ? [] : ba(t, this._c)) : [].concat(n)),
			r
		],
		c = s[0],
		l = s.reduce(
			(u, d) => {
				const g = ci(t, d, o);
				return (
					(u.top = st(g.top, u.top)),
					(u.right = Bt(g.right, u.right)),
					(u.bottom = Bt(g.bottom, u.bottom)),
					(u.left = st(g.left, u.left)),
					u
				);
			},
			ci(t, c, o)
		);
	return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}
function Sa(e) {
	const { width: t, height: n } = Fi(e);
	return { width: t, height: n };
}
function Pa(e, t, n) {
	const r = pt(t),
		o = bt(t),
		i = n === 'fixed',
		s = Yt(e, !0, i, t);
	let c = { scrollLeft: 0, scrollTop: 0 };
	const l = wt(0);
	function u() {
		l.x = Br(o);
	}
	if (r || (!r && !i))
		if (((ye(t) !== 'body' || Fn(o)) && (c = vr(t)), r)) {
			const m = Yt(t, !0, i, t);
			(l.x = m.x + t.clientLeft), (l.y = m.y + t.clientTop);
		} else o && u();
	i && !r && o && u();
	const d = o && !r && !i ? Ii(o, c) : wt(0),
		g = s.left + c.scrollLeft - l.x - d.x,
		v = s.top + c.scrollTop - l.y - d.y;
	return { x: g, y: v, width: s.width, height: s.height };
}
function pr(e) {
	return ht(e).position === 'static';
}
function li(e, t) {
	if (!pt(e) || ht(e).position === 'fixed') return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return bt(e) === n && (n = n.ownerDocument.body), n;
}
function Li(e, t) {
	const n = ct(e);
	if (mr(e)) return n;
	if (!pt(e)) {
		let o = kt(e);
		for (; o && !me(o); ) {
			if (ft(o) && !pr(o)) return o;
			o = kt(o);
		}
		return n;
	}
	let r = li(e, t);
	for (; r && da(r) && pr(r); ) r = li(r, t);
	return r && me(r) && pr(r) && !Rr(r) ? n : r || fa(e) || n;
}
const Oa = async function (e) {
	const t = this.getOffsetParent || Li,
		n = this.getDimensions,
		r = await n(e.floating);
	return {
		reference: Pa(e.reference, await t(e.floating), e.strategy),
		floating: { x: 0, y: 0, width: r.width, height: r.height }
	};
};
function Aa(e) {
	return ht(e).direction === 'rtl';
}
const Ea = {
	convertOffsetParentRelativeRectToViewportRelativeRect: ma,
	getDocumentElement: bt,
	getClippingRect: xa,
	getOffsetParent: Li,
	getElementRects: Oa,
	getClientRects: va,
	getDimensions: Sa,
	getScale: Qt,
	isElement: ft,
	isRTL: Aa
};
function Ni(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ca(e, t) {
	let n = null,
		r;
	const o = bt(e);
	function i() {
		var c;
		clearTimeout(r), (c = n) == null || c.disconnect(), (n = null);
	}
	function s(c, l) {
		c === void 0 && (c = !1), l === void 0 && (l = 1), i();
		const u = e.getBoundingClientRect(),
			{ left: d, top: g, width: v, height: m } = u;
		if ((c || t(), !v || !m)) return;
		const f = Bn(g),
			y = Bn(o.clientWidth - (d + v)),
			x = Bn(o.clientHeight - (g + m)),
			S = Bn(d),
			O = {
				rootMargin: -f + 'px ' + -y + 'px ' + -x + 'px ' + -S + 'px',
				threshold: st(0, Bt(1, l)) || 1
			};
		let A = !0;
		function C(L) {
			const I = L[0].intersectionRatio;
			if (I !== l) {
				if (!A) return s();
				I
					? s(!1, I)
					: (r = setTimeout(() => {
							s(!1, 1e-7);
						}, 1e3));
			}
			I === 1 && !Ni(u, e.getBoundingClientRect()) && s(), (A = !1);
		}
		try {
			n = new IntersectionObserver(C, { ...O, root: o.ownerDocument });
		} catch {
			n = new IntersectionObserver(C, O);
		}
		n.observe(e);
	}
	return s(!0), i;
}
function Ta(e, t, n, r) {
	r === void 0 && (r = {});
	const {
			ancestorScroll: o = !0,
			ancestorResize: i = !0,
			elementResize: s = typeof ResizeObserver == 'function',
			layoutShift: c = typeof IntersectionObserver == 'function',
			animationFrame: l = !1
		} = r,
		u = Nr(e),
		d = o || i ? [...(u ? Ae(u) : []), ...Ae(t)] : [];
	d.forEach((S) => {
		o && S.addEventListener('scroll', n, { passive: !0 }),
			i && S.addEventListener('resize', n);
	});
	const g = u && c ? Ca(u, n) : null;
	let v = -1,
		m = null;
	s &&
		((m = new ResizeObserver((S) => {
			let [P] = S;
			P &&
				P.target === u &&
				m &&
				(m.unobserve(t),
				cancelAnimationFrame(v),
				(v = requestAnimationFrame(() => {
					var O;
					(O = m) == null || O.observe(t);
				}))),
				n();
		})),
		u && !l && m.observe(u),
		m.observe(t));
	let f,
		y = l ? Yt(e) : null;
	l && x();
	function x() {
		const S = Yt(e);
		y && !Ni(y, S) && n(), (y = S), (f = requestAnimationFrame(x));
	}
	return (
		n(),
		() => {
			var S;
			d.forEach((P) => {
				o && P.removeEventListener('scroll', n),
					i && P.removeEventListener('resize', n);
			}),
				g == null || g(),
				(S = m) == null || S.disconnect(),
				(m = null),
				l && cancelAnimationFrame(f);
		}
	);
}
const _a = aa,
	Fa = ca,
	Da = ia,
	Ia = ua,
	Ra = oa,
	La = ra,
	Na = la,
	Ba = (e, t, n) => {
		const r = new Map(),
			o = { platform: Ea, ...n },
			i = { ...o.platform, _c: r };
		return na(e, t, { ...o, platform: i });
	};
function be(e) {
	return typeof e == 'function' ? e() : e;
}
function Bi(e) {
	return typeof window > 'u'
		? 1
		: (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ui(e, t) {
	const n = Bi(e);
	return Math.round(t * n) / n;
}
function di(e) {
	return {
		[`--bits-${e}-content-transform-origin`]: 'var(--bits-floating-transform-origin)',
		[`--bits-${e}-content-available-width`]: 'var(--bits-floating-available-width)',
		[`--bits-${e}-content-available-height`]: 'var(--bits-floating-available-height)',
		[`--bits-${e}-anchor-width`]: 'var(--bits-floating-anchor-width)',
		[`--bits-${e}-anchor-height`]: 'var(--bits-floating-anchor-height)'
	};
}
function ka(e) {
	const t = e.whileElementsMounted,
		n = F(() => be(e.open) ?? !0),
		r = F(() => be(e.middleware)),
		o = F(() => be(e.transform) ?? !0),
		i = F(() => be(e.placement) ?? 'bottom'),
		s = F(() => be(e.strategy) ?? 'absolute'),
		c = e.reference;
	let l = M(0),
		u = M(0);
	const d = p(null);
	let g = M(zt(h(s))),
		v = M(zt(h(i))),
		m = M(zt({})),
		f = M(!1);
	const y = F(() => {
		const C = { position: h(g), left: '0', top: '0' };
		if (!d.current) return C;
		const L = ui(d.current, h(l)),
			I = ui(d.current, h(u));
		return h(o)
			? {
					...C,
					transform: `translate(${L}px, ${I}px)`,
					...(Bi(d.current) >= 1.5 && { willChange: 'transform' })
				}
			: { position: h(g), left: `${L}px`, top: `${I}px` };
	});
	let x;
	function S() {
		c.current === null ||
			d.current === null ||
			Ba(c.current, d.current, {
				middleware: h(r),
				placement: h(i),
				strategy: h(s)
			}).then((C) => {
				E(l, C.x, !0),
					E(u, C.y, !0),
					E(g, C.strategy, !0),
					E(v, C.placement, !0),
					E(m, C.middlewareData, !0),
					E(f, !0);
			});
	}
	function P() {
		typeof x == 'function' && (x(), (x = void 0));
	}
	function O() {
		if ((P(), t === void 0)) {
			S();
			return;
		}
		c.current === null || d.current === null || (x = t(c.current, d.current, S));
	}
	function A() {
		h(n) || E(f, !1);
	}
	return (
		N(S),
		N(O),
		N(A),
		N(() => P),
		{
			floating: d,
			reference: c,
			get strategy() {
				return h(g);
			},
			get placement() {
				return h(v);
			},
			get middlewareData() {
				return h(m);
			},
			get isPositioned() {
				return h(f);
			},
			get floatingStyles() {
				return h(y);
			},
			get update() {
				return S;
			}
		}
	);
}
const Ma = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };
class Wa {
	constructor() {
		k(this, 'anchorNode', p(null));
		k(this, 'customAnchorNode', p(null));
		k(this, 'triggerNode', p(null));
		N(() => {
			this.customAnchorNode.current
				? typeof this.customAnchorNode.current == 'string'
					? (this.anchorNode.current = document.querySelector(
							this.customAnchorNode.current
						))
					: (this.anchorNode.current = this.customAnchorNode.current)
				: (this.anchorNode.current = this.triggerNode.current);
		});
	}
}
var Ke,
	He,
	Ue,
	Ve,
	ae,
	ze,
	je,
	ce,
	Vt,
	Ye,
	Xe,
	qe,
	Ze,
	Je,
	Qe,
	ar,
	Ge,
	cr,
	$e,
	tn,
	en,
	nn,
	rn,
	on,
	sn,
	an,
	cn,
	ln,
	un,
	dn,
	fn,
	hn,
	gn,
	mn,
	vn,
	wn;
class Ka {
	constructor(t, n) {
		k(this, 'root');
		k(this, 'contentRef', p(null));
		k(this, 'wrapperRef', p(null));
		k(this, 'arrowRef', p(null));
		k(this, 'arrowId', p(Xt()));
		k(this, 'id');
		k(this, 'wrapperId');
		k(this, 'style');
		w(
			this,
			Ke,
			F(() => {
				if (typeof this.style == 'string') return xe(this.style);
				if (!this.style) return {};
			})
		);
		w(this, He);
		w(this, Ue);
		w(this, Ve);
		w(this, ae);
		w(this, ze);
		w(this, je);
		w(this, ce);
		w(this, Vt);
		w(this, Ye);
		w(this, Xe);
		w(this, qe);
		w(this, Ze);
		w(this, Je);
		k(this, 'onPlaced');
		k(this, 'enabled');
		w(this, Qe, new $o(() => this.arrowRef.current ?? void 0));
		w(
			this,
			ar,
			F(() => {
				var t;
				return ((t = a(this, Qe)) == null ? void 0 : t.width) ?? 0;
			})
		);
		w(
			this,
			Ge,
			F(() => {
				var t;
				return ((t = a(this, Qe)) == null ? void 0 : t.height) ?? 0;
			})
		);
		w(
			this,
			cr,
			F(() => {
				var t;
				return (
					((t = a(this, Ue)) == null ? void 0 : t.current) +
					(a(this, ae).current !== 'center' ? `-${a(this, ae).current}` : '')
				);
			})
		);
		w(
			this,
			$e,
			F(() =>
				Array.isArray(a(this, Vt).current) ? a(this, Vt).current : [a(this, Vt).current]
			)
		);
		w(
			this,
			tn,
			F(() => h(a(this, $e)).length > 0)
		);
		w(
			this,
			en,
			F(() => ({
				padding: a(this, Ye).current,
				boundary: h(a(this, $e)).filter(ls),
				altBoundary: this.hasExplicitBoundaries
			}))
		);
		w(this, nn, M(void 0));
		w(this, rn, M(void 0));
		w(this, on, M(void 0));
		w(this, sn, M(void 0));
		w(
			this,
			an,
			F(() =>
				[
					_a({
						mainAxis: a(this, Ve).current + h(a(this, Ge)),
						alignmentAxis: a(this, ze).current
					}),
					a(this, ce).current &&
						Fa({
							mainAxis: !0,
							crossAxis: !1,
							limiter: a(this, Xe).current === 'partial' ? Na() : void 0,
							...this.detectOverflowOptions
						}),
					a(this, ce).current && Da({ ...this.detectOverflowOptions }),
					Ia({
						...this.detectOverflowOptions,
						apply: ({ rects: t, availableWidth: n, availableHeight: r }) => {
							const { width: o, height: i } = t.reference;
							E(a(this, nn), n, !0),
								E(a(this, rn), r, !0),
								E(a(this, on), o, !0),
								E(a(this, sn), i, !0);
						}
					}),
					this.arrowRef.current &&
						La({ element: this.arrowRef.current, padding: a(this, je).current }),
					Xa({ arrowWidth: h(a(this, ar)), arrowHeight: h(a(this, Ge)) }),
					a(this, qe).current &&
						Ra({ strategy: 'referenceHidden', ...this.detectOverflowOptions })
				].filter(Boolean)
			)
		);
		k(this, 'floating');
		w(
			this,
			cn,
			F(() => qa(this.floating.placement))
		);
		w(
			this,
			ln,
			F(() => Za(this.floating.placement))
		);
		w(
			this,
			un,
			F(() => {
				var t;
				return ((t = this.floating.middlewareData.arrow) == null ? void 0 : t.x) ?? 0;
			})
		);
		w(
			this,
			dn,
			F(() => {
				var t;
				return ((t = this.floating.middlewareData.arrow) == null ? void 0 : t.y) ?? 0;
			})
		);
		w(
			this,
			fn,
			F(() => {
				var t;
				return (
					((t = this.floating.middlewareData.arrow) == null
						? void 0
						: t.centerOffset) !== 0
				);
			})
		);
		w(this, hn, M());
		w(
			this,
			gn,
			F(() => Ma[this.placedSide])
		);
		w(
			this,
			mn,
			F(() => {
				var t, n, r;
				return {
					id: this.wrapperId.current,
					'data-bits-floating-content-wrapper': '',
					style: {
						...this.floating.floatingStyles,
						transform: this.floating.isPositioned
							? this.floating.floatingStyles.transform
							: 'translate(0, -200%)',
						minWidth: 'max-content',
						zIndex: this.contentZIndex,
						'--bits-floating-transform-origin': `${(t = this.floating.middlewareData.transformOrigin) == null ? void 0 : t.x} ${(n = this.floating.middlewareData.transformOrigin) == null ? void 0 : n.y}`,
						'--bits-floating-available-width': `${h(a(this, nn))}px`,
						'--bits-floating-available-height': `${h(a(this, rn))}px`,
						'--bits-floating-anchor-width': `${h(a(this, on))}px`,
						'--bits-floating-anchor-height': `${h(a(this, sn))}px`,
						...(((r = this.floating.middlewareData.hide) == null
							? void 0
							: r.referenceHidden) && {
							visibility: 'hidden',
							'pointer-events': 'none'
						}),
						...h(a(this, Ke))
					},
					dir: a(this, He).current
				};
			})
		);
		w(
			this,
			vn,
			F(() => ({
				'data-side': this.placedSide,
				'data-align': this.placedAlign,
				style: Tr({ ...h(a(this, Ke)) })
			}))
		);
		w(
			this,
			wn,
			F(() => ({
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
			}))
		);
		(this.id = t.id),
			_(this, Ue, t.side),
			_(this, Ve, t.sideOffset),
			_(this, ae, t.align),
			_(this, ze, t.alignOffset),
			_(this, je, t.arrowPadding),
			_(this, ce, t.avoidCollisions),
			_(this, Vt, t.collisionBoundary),
			_(this, Ye, t.collisionPadding),
			_(this, Xe, t.sticky),
			_(this, qe, t.hideWhenDetached),
			_(this, Je, t.updatePositionStrategy),
			(this.onPlaced = t.onPlaced),
			_(this, Ze, t.strategy),
			_(this, He, t.dir),
			(this.style = t.style),
			(this.root = n),
			(this.enabled = t.enabled),
			(this.wrapperId = t.wrapperId),
			t.customAnchor && (this.root.customAnchorNode.current = t.customAnchor.current),
			N(() => {
				t.customAnchor.current,
					at(() => {
						this.root.customAnchorNode.current = t.customAnchor.current;
					});
			}),
			Ot({
				id: this.wrapperId,
				ref: this.wrapperRef,
				deps: () => this.enabled.current
			}),
			Ot({ id: this.id, ref: this.contentRef, deps: () => this.enabled.current }),
			(this.floating = ka({
				strategy: () => a(this, Ze).current,
				placement: () => h(a(this, cr)),
				middleware: () => this.middleware,
				reference: this.root.anchorNode,
				whileElementsMounted: (...r) => {
					var i;
					return Ta(...r, {
						animationFrame:
							((i = a(this, Je)) == null ? void 0 : i.current) === 'always'
					});
				},
				open: () => this.enabled.current
			})),
			N(() => {
				var r;
				this.floating.isPositioned && ((r = this.onPlaced) == null || r.current());
			}),
			N(() => {
				const r = this.contentRef.current;
				r &&
					at(() => {
						this.contentZIndex = window.getComputedStyle(r).zIndex;
					});
			}),
			N(() => {
				this.floating.floating.current = this.wrapperRef.current;
			});
	}
	get hasExplicitBoundaries() {
		return h(a(this, tn));
	}
	set hasExplicitBoundaries(t) {
		E(a(this, tn), t);
	}
	get detectOverflowOptions() {
		return h(a(this, en));
	}
	set detectOverflowOptions(t) {
		E(a(this, en), t);
	}
	get middleware() {
		return h(a(this, an));
	}
	set middleware(t) {
		E(a(this, an), t);
	}
	get placedSide() {
		return h(a(this, cn));
	}
	set placedSide(t) {
		E(a(this, cn), t);
	}
	get placedAlign() {
		return h(a(this, ln));
	}
	set placedAlign(t) {
		E(a(this, ln), t);
	}
	get arrowX() {
		return h(a(this, un));
	}
	set arrowX(t) {
		E(a(this, un), t);
	}
	get arrowY() {
		return h(a(this, dn));
	}
	set arrowY(t) {
		E(a(this, dn), t);
	}
	get cannotCenterArrow() {
		return h(a(this, fn));
	}
	set cannotCenterArrow(t) {
		E(a(this, fn), t);
	}
	get contentZIndex() {
		return h(a(this, hn));
	}
	set contentZIndex(t) {
		E(a(this, hn), t, !0);
	}
	get arrowBaseSide() {
		return h(a(this, gn));
	}
	set arrowBaseSide(t) {
		E(a(this, gn), t);
	}
	get wrapperProps() {
		return h(a(this, mn));
	}
	set wrapperProps(t) {
		E(a(this, mn), t);
	}
	get props() {
		return h(a(this, vn));
	}
	set props(t) {
		E(a(this, vn), t);
	}
	get arrowStyle() {
		return h(a(this, wn));
	}
	set arrowStyle(t) {
		E(a(this, wn), t);
	}
}
(Ke = new WeakMap()),
	(He = new WeakMap()),
	(Ue = new WeakMap()),
	(Ve = new WeakMap()),
	(ae = new WeakMap()),
	(ze = new WeakMap()),
	(je = new WeakMap()),
	(ce = new WeakMap()),
	(Vt = new WeakMap()),
	(Ye = new WeakMap()),
	(Xe = new WeakMap()),
	(qe = new WeakMap()),
	(Ze = new WeakMap()),
	(Je = new WeakMap()),
	(Qe = new WeakMap()),
	(ar = new WeakMap()),
	(Ge = new WeakMap()),
	(cr = new WeakMap()),
	($e = new WeakMap()),
	(tn = new WeakMap()),
	(en = new WeakMap()),
	(nn = new WeakMap()),
	(rn = new WeakMap()),
	(on = new WeakMap()),
	(sn = new WeakMap()),
	(an = new WeakMap()),
	(cn = new WeakMap()),
	(ln = new WeakMap()),
	(un = new WeakMap()),
	(dn = new WeakMap()),
	(fn = new WeakMap()),
	(hn = new WeakMap()),
	(gn = new WeakMap()),
	(mn = new WeakMap()),
	(vn = new WeakMap()),
	(wn = new WeakMap());
class Ha {
	constructor(t, n) {
		k(this, 'ref', p(null));
		t.virtualEl && t.virtualEl.current
			? (n.triggerNode = p.from(t.virtualEl.current))
			: Ot({
					id: t.id,
					ref: this.ref,
					onRefChange: (r) => {
						n.triggerNode.current = r;
					}
				});
	}
}
const [Ua, ki] = _n('Floating.Root'),
	[Va, rl] = _n('Floating.Content');
function za() {
	return Ua(new Wa());
}
function ja(e) {
	return Va(new Ka(e, ki()));
}
function Ya(e) {
	return new Ha(e, ki());
}
function Xa(e) {
	return {
		name: 'transformOrigin',
		options: e,
		fn(t) {
			var x, S, P;
			const { placement: n, rects: r, middlewareData: o } = t,
				s = ((x = o.arrow) == null ? void 0 : x.centerOffset) !== 0,
				c = s ? 0 : e.arrowWidth,
				l = s ? 0 : e.arrowHeight,
				[u, d] = kr(n),
				g = { start: '0%', center: '50%', end: '100%' }[d],
				v = (((S = o.arrow) == null ? void 0 : S.x) ?? 0) + c / 2,
				m = (((P = o.arrow) == null ? void 0 : P.y) ?? 0) + l / 2;
			let f = '',
				y = '';
			return (
				u === 'bottom'
					? ((f = s ? g : `${v}px`), (y = `${-l}px`))
					: u === 'top'
						? ((f = s ? g : `${v}px`), (y = `${r.floating.height + l}px`))
						: u === 'right'
							? ((f = `${-l}px`), (y = s ? g : `${m}px`))
							: u === 'left' &&
								((f = `${r.floating.width + l}px`), (y = s ? g : `${m}px`)),
				{ data: { x: f, y } }
			);
		}
	};
}
function kr(e) {
	const [t, n = 'center'] = e.split('-');
	return [t, n];
}
function qa(e) {
	return kr(e)[0];
}
function Za(e) {
	return kr(e)[1];
}
function Ja(e, t) {
	W(t, !0), za();
	var n = R(),
		r = D(n);
	V(r, () => t.children ?? Z), T(e, n), K();
}
function Qa(e, t) {
	W(t, !0), Ya({ id: p.with(() => t.id), virtualEl: p.with(() => t.virtualEl) });
	var n = R(),
		r = D(n);
	V(r, () => t.children ?? Z), T(e, n), K();
}
function Ga(e, t) {
	W(t, !0);
	let n = b(t, 'side', 3, 'bottom'),
		r = b(t, 'sideOffset', 3, 0),
		o = b(t, 'align', 3, 'center'),
		i = b(t, 'alignOffset', 3, 0),
		s = b(t, 'arrowPadding', 3, 0),
		c = b(t, 'avoidCollisions', 3, !0),
		l = b(t, 'collisionBoundary', 19, () => []),
		u = b(t, 'collisionPadding', 3, 0),
		d = b(t, 'hideWhenDetached', 3, !1),
		g = b(t, 'onPlaced', 3, () => {}),
		v = b(t, 'sticky', 3, 'partial'),
		m = b(t, 'updatePositionStrategy', 3, 'optimized'),
		f = b(t, 'strategy', 3, 'fixed'),
		y = b(t, 'dir', 3, 'ltr'),
		x = b(t, 'style', 19, () => ({})),
		S = b(t, 'wrapperId', 19, Xt),
		P = b(t, 'customAnchor', 3, null);
	const O = ja({
			side: p.with(() => n()),
			sideOffset: p.with(() => r()),
			align: p.with(() => o()),
			alignOffset: p.with(() => i()),
			id: p.with(() => t.id),
			arrowPadding: p.with(() => s()),
			avoidCollisions: p.with(() => c()),
			collisionBoundary: p.with(() => l()),
			collisionPadding: p.with(() => u()),
			hideWhenDetached: p.with(() => d()),
			onPlaced: p.with(() => g()),
			sticky: p.with(() => v()),
			updatePositionStrategy: p.with(() => m()),
			strategy: p.with(() => f()),
			dir: p.with(() => y()),
			style: p.with(() => x()),
			enabled: p.with(() => !1),
			wrapperId: p.with(() => S()),
			customAnchor: p.with(() => P())
		}),
		A = F(() => jt(O.wrapperProps, { style: { pointerEvents: 'auto' } }));
	var C = R(),
		L = D(C);
	V(
		L,
		() => t.content ?? Z,
		() => ({ props: O.props, wrapperProps: h(A) })
	),
		T(e, C),
		K();
}
function $a(e, t) {
	W(t, !0),
		gi(() => {
			var o;
			(o = t.onPlaced) == null || o.call(t);
		});
	var n = R(),
		r = D(n);
	V(
		r,
		() => t.content ?? Z,
		() => ({ props: {}, wrapperProps: {} })
	),
		T(e, n),
		K();
}
const tc = 'data-separator-root';
var le, yn, ue, de, pn;
class ec {
	constructor(t) {
		w(this, le);
		w(this, yn);
		w(this, ue);
		w(this, de);
		w(
			this,
			pn,
			F(() => ({
				id: a(this, le).current,
				role: a(this, de).current ? 'none' : 'separator',
				'aria-orientation': a(this, ue).current,
				'aria-hidden': ns(a(this, de).current),
				'data-orientation': a(this, ue).current,
				[tc]: ''
			}))
		);
		_(this, ue, t.orientation),
			_(this, de, t.decorative),
			_(this, le, t.id),
			_(this, yn, t.ref),
			Ot({ id: a(this, le), ref: a(this, yn) });
	}
	get props() {
		return h(a(this, pn));
	}
	set props(t) {
		E(a(this, pn), t);
	}
}
(le = new WeakMap()),
	(yn = new WeakMap()),
	(ue = new WeakMap()),
	(de = new WeakMap()),
	(pn = new WeakMap());
function nc(e) {
	return new ec(e);
}
var rc = tt('<div><!></div>');
function ic(e, t) {
	W(t, !0);
	let n = b(t, 'id', 19, Xt),
		r = b(t, 'ref', 15, null),
		o = b(t, 'decorative', 3, !1),
		i = b(t, 'orientation', 3, 'horizontal'),
		s = Ct(t, [
			'$$slots',
			'$$events',
			'$$legacy',
			'id',
			'ref',
			'child',
			'children',
			'decorative',
			'orientation'
		]);
	const c = nc({
			ref: p.with(
				() => r(),
				(m) => r(m)
			),
			id: p.with(() => n()),
			decorative: p.with(() => o()),
			orientation: p.with(() => i())
		}),
		l = F(() => jt(s, c.props));
	var u = R(),
		d = D(u);
	{
		var g = (m) => {
				var f = R(),
					y = D(f);
				V(
					y,
					() => t.child,
					() => ({ props: h(l) })
				),
					T(m, f);
			},
			v = (m) => {
				var f = rc();
				let y;
				var x = q(f);
				V(x, () => t.children ?? Z),
					U(f),
					yt(() => (y = Zt(f, y, { ...h(l) }))),
					T(m, f);
			};
		ot(d, (m) => {
			t.child ? m(g) : m(v, !1);
		});
	}
	T(e, u), K();
}
function oc(e, t) {
	let n = b(t, 'isStatic', 3, !1),
		r = Ct(t, ['$$slots', '$$events', '$$legacy', 'content', 'isStatic', 'onPlaced']);
	var o = R(),
		i = D(o);
	{
		var s = (l) => {
				$a(l, {
					get content() {
						return t.content;
					},
					get onPlaced() {
						return t.onPlaced;
					}
				});
			},
			c = (l) => {
				Ga(
					l,
					Nt(
						{
							get content() {
								return t.content;
							},
							get onPlaced() {
								return t.onPlaced;
							}
						},
						() => r
					)
				);
			};
		ot(i, (l) => {
			n() ? l(s) : l(c, !1);
		});
	}
	T(e, o);
}
var sc = tt('<!> <!>', 1);
function Mi(e, t) {
	W(t, !0);
	let n = b(t, 'interactOutsideBehavior', 3, 'close'),
		r = b(t, 'trapFocus', 3, !0),
		o = b(t, 'isValidEvent', 3, () => !1),
		i = b(t, 'customAnchor', 3, null),
		s = b(t, 'isStatic', 3, !1),
		c = Ct(t, [
			'$$slots',
			'$$events',
			'$$legacy',
			'popper',
			'onEscapeKeydown',
			'escapeKeydownBehavior',
			'preventOverflowTextSelection',
			'id',
			'onPointerDown',
			'onPointerUp',
			'side',
			'sideOffset',
			'align',
			'alignOffset',
			'arrowPadding',
			'avoidCollisions',
			'collisionBoundary',
			'collisionPadding',
			'sticky',
			'hideWhenDetached',
			'updatePositionStrategy',
			'strategy',
			'dir',
			'preventScroll',
			'wrapperId',
			'style',
			'onPlaced',
			'onInteractOutside',
			'onCloseAutoFocus',
			'onOpenAutoFocus',
			'onFocusOutside',
			'interactOutsideBehavior',
			'loop',
			'trapFocus',
			'isValidEvent',
			'customAnchor',
			'isStatic',
			'enabled'
		]);
	oc(e, {
		get isStatic() {
			return s();
		},
		get id() {
			return t.id;
		},
		get side() {
			return t.side;
		},
		get sideOffset() {
			return t.sideOffset;
		},
		get align() {
			return t.align;
		},
		get alignOffset() {
			return t.alignOffset;
		},
		get arrowPadding() {
			return t.arrowPadding;
		},
		get avoidCollisions() {
			return t.avoidCollisions;
		},
		get collisionBoundary() {
			return t.collisionBoundary;
		},
		get collisionPadding() {
			return t.collisionPadding;
		},
		get sticky() {
			return t.sticky;
		},
		get hideWhenDetached() {
			return t.hideWhenDetached;
		},
		get updatePositionStrategy() {
			return t.updatePositionStrategy;
		},
		get strategy() {
			return t.strategy;
		},
		get dir() {
			return t.dir;
		},
		get wrapperId() {
			return t.wrapperId;
		},
		get style() {
			return t.style;
		},
		get onPlaced() {
			return t.onPlaced;
		},
		get customAnchor() {
			return i();
		},
		content: (u, d) => {
			let g = () => (d == null ? void 0 : d().props),
				v = () => (d == null ? void 0 : d().wrapperProps);
			var m = sc(),
				f = D(m);
			{
				var y = (O) => {
						ri(O, {
							get preventScroll() {
								return t.preventScroll;
							}
						});
					},
					x = (O, A) => {
						{
							var C = (L) => {
								ri(L, {
									get preventScroll() {
										return t.preventScroll;
									}
								});
							};
							ot(
								O,
								(L) => {
									t.forceMount || L(C);
								},
								A
							);
						}
					};
				ot(f, (O) => {
					t.forceMount && t.enabled ? O(y) : O(x, !1);
				});
			}
			var S = dt(f, 2);
			const P = F(() => t.enabled && r());
			Ms(S, {
				get id() {
					return t.id;
				},
				get onOpenAutoFocus() {
					return t.onOpenAutoFocus;
				},
				get onCloseAutoFocus() {
					return t.onCloseAutoFocus;
				},
				get loop() {
					return t.loop;
				},
				get trapFocus() {
					return h(P);
				},
				get forceMount() {
					return t.forceMount;
				},
				focusScope: (A, C) => {
					let L = () => (C == null ? void 0 : C().props);
					Ts(A, {
						get onEscapeKeydown() {
							return t.onEscapeKeydown;
						},
						get escapeKeydownBehavior() {
							return t.escapeKeydownBehavior;
						},
						get enabled() {
							return t.enabled;
						},
						children: (I, et) => {
							Os(I, {
								get id() {
									return t.id;
								},
								get onInteractOutside() {
									return t.onInteractOutside;
								},
								get onFocusOutside() {
									return t.onFocusOutside;
								},
								get interactOutsideBehavior() {
									return n();
								},
								get isValidEvent() {
									return o();
								},
								get enabled() {
									return t.enabled;
								},
								children: (B, j) => {
									let Q = () => (j == null ? void 0 : j().props);
									Vs(B, {
										get id() {
											return t.id;
										},
										get preventOverflowTextSelection() {
											return t.preventOverflowTextSelection;
										},
										get onPointerDown() {
											return t.onPointerDown;
										},
										get onPointerUp() {
											return t.onPointerUp;
										},
										get enabled() {
											return t.enabled;
										},
										children: (G, rt) => {
											var H = R(),
												J = D(H),
												$ = br(() => ({
													props: jt(c, g(), Q(), L(), {
														style: { pointerEvents: 'auto' }
													}),
													wrapperProps: v()
												}));
											V(
												J,
												() => t.popper ?? Z,
												() => h($)
											),
												T(G, H);
										},
										$$slots: { default: !0 }
									});
								},
								$$slots: { default: !0 }
							});
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { focusScope: !0 }
			}),
				T(u, m);
		},
		$$slots: { content: !0 }
	}),
		K();
}
function ac(e, t) {
	let n = b(t, 'interactOutsideBehavior', 3, 'close'),
		r = b(t, 'trapFocus', 3, !0),
		o = b(t, 'isValidEvent', 3, () => !1),
		i = b(t, 'customAnchor', 3, null),
		s = b(t, 'isStatic', 3, !1),
		c = Ct(t, [
			'$$slots',
			'$$events',
			'$$legacy',
			'popper',
			'present',
			'onEscapeKeydown',
			'escapeKeydownBehavior',
			'preventOverflowTextSelection',
			'id',
			'onPointerDown',
			'onPointerUp',
			'side',
			'sideOffset',
			'align',
			'alignOffset',
			'arrowPadding',
			'avoidCollisions',
			'collisionBoundary',
			'collisionPadding',
			'sticky',
			'hideWhenDetached',
			'updatePositionStrategy',
			'strategy',
			'dir',
			'preventScroll',
			'wrapperId',
			'style',
			'onPlaced',
			'onInteractOutside',
			'onCloseAutoFocus',
			'onOpenAutoFocus',
			'onFocusOutside',
			'interactOutsideBehavior',
			'loop',
			'trapFocus',
			'isValidEvent',
			'customAnchor',
			'isStatic'
		]);
	vs(
		e,
		Nt(
			{
				get id() {
					return t.id;
				},
				get present() {
					return t.present;
				}
			},
			() => c,
			{
				presence: (u, d) => {
					let g = () => (d == null ? void 0 : d().present);
					Mi(
						u,
						Nt(
							{
								get popper() {
									return t.popper;
								},
								get onEscapeKeydown() {
									return t.onEscapeKeydown;
								},
								get escapeKeydownBehavior() {
									return t.escapeKeydownBehavior;
								},
								get preventOverflowTextSelection() {
									return t.preventOverflowTextSelection;
								},
								get id() {
									return t.id;
								},
								get onPointerDown() {
									return t.onPointerDown;
								},
								get onPointerUp() {
									return t.onPointerUp;
								},
								get side() {
									return t.side;
								},
								get sideOffset() {
									return t.sideOffset;
								},
								get align() {
									return t.align;
								},
								get alignOffset() {
									return t.alignOffset;
								},
								get arrowPadding() {
									return t.arrowPadding;
								},
								get avoidCollisions() {
									return t.avoidCollisions;
								},
								get collisionBoundary() {
									return t.collisionBoundary;
								},
								get collisionPadding() {
									return t.collisionPadding;
								},
								get sticky() {
									return t.sticky;
								},
								get hideWhenDetached() {
									return t.hideWhenDetached;
								},
								get updatePositionStrategy() {
									return t.updatePositionStrategy;
								},
								get strategy() {
									return t.strategy;
								},
								get dir() {
									return t.dir;
								},
								get preventScroll() {
									return t.preventScroll;
								},
								get wrapperId() {
									return t.wrapperId;
								},
								get style() {
									return t.style;
								},
								get onPlaced() {
									return t.onPlaced;
								},
								get customAnchor() {
									return i();
								},
								get isStatic() {
									return s();
								},
								get enabled() {
									return g().current;
								},
								get onInteractOutside() {
									return t.onInteractOutside;
								},
								get onCloseAutoFocus() {
									return t.onCloseAutoFocus;
								},
								get onOpenAutoFocus() {
									return t.onOpenAutoFocus;
								},
								get interactOutsideBehavior() {
									return n();
								},
								get loop() {
									return t.loop;
								},
								get trapFocus() {
									return r();
								},
								get isValidEvent() {
									return o();
								},
								get onFocusOutside() {
									return t.onFocusOutside;
								},
								forceMount: !1
							},
							() => c
						)
					);
				},
				$$slots: { presence: !0 }
			}
		)
	);
}
function cc(e, t) {
	let n = b(t, 'interactOutsideBehavior', 3, 'close'),
		r = b(t, 'trapFocus', 3, !0),
		o = b(t, 'isValidEvent', 3, () => !1),
		i = b(t, 'customAnchor', 3, null),
		s = b(t, 'isStatic', 3, !1),
		c = Ct(t, [
			'$$slots',
			'$$events',
			'$$legacy',
			'popper',
			'onEscapeKeydown',
			'escapeKeydownBehavior',
			'preventOverflowTextSelection',
			'id',
			'onPointerDown',
			'onPointerUp',
			'side',
			'sideOffset',
			'align',
			'alignOffset',
			'arrowPadding',
			'avoidCollisions',
			'collisionBoundary',
			'collisionPadding',
			'sticky',
			'hideWhenDetached',
			'updatePositionStrategy',
			'strategy',
			'dir',
			'preventScroll',
			'wrapperId',
			'style',
			'onPlaced',
			'onInteractOutside',
			'onCloseAutoFocus',
			'onOpenAutoFocus',
			'onFocusOutside',
			'interactOutsideBehavior',
			'loop',
			'trapFocus',
			'isValidEvent',
			'customAnchor',
			'isStatic',
			'enabled'
		]);
	Mi(
		e,
		Nt(
			{
				get popper() {
					return t.popper;
				},
				get onEscapeKeydown() {
					return t.onEscapeKeydown;
				},
				get escapeKeydownBehavior() {
					return t.escapeKeydownBehavior;
				},
				get preventOverflowTextSelection() {
					return t.preventOverflowTextSelection;
				},
				get id() {
					return t.id;
				},
				get onPointerDown() {
					return t.onPointerDown;
				},
				get onPointerUp() {
					return t.onPointerUp;
				},
				get side() {
					return t.side;
				},
				get sideOffset() {
					return t.sideOffset;
				},
				get align() {
					return t.align;
				},
				get alignOffset() {
					return t.alignOffset;
				},
				get arrowPadding() {
					return t.arrowPadding;
				},
				get avoidCollisions() {
					return t.avoidCollisions;
				},
				get collisionBoundary() {
					return t.collisionBoundary;
				},
				get collisionPadding() {
					return t.collisionPadding;
				},
				get sticky() {
					return t.sticky;
				},
				get hideWhenDetached() {
					return t.hideWhenDetached;
				},
				get updatePositionStrategy() {
					return t.updatePositionStrategy;
				},
				get strategy() {
					return t.strategy;
				},
				get dir() {
					return t.dir;
				},
				get preventScroll() {
					return t.preventScroll;
				},
				get wrapperId() {
					return t.wrapperId;
				},
				get style() {
					return t.style;
				},
				get onPlaced() {
					return t.onPlaced;
				},
				get customAnchor() {
					return i();
				},
				get isStatic() {
					return s();
				},
				get enabled() {
					return t.enabled;
				},
				get onInteractOutside() {
					return t.onInteractOutside;
				},
				get onCloseAutoFocus() {
					return t.onCloseAutoFocus;
				},
				get onOpenAutoFocus() {
					return t.onOpenAutoFocus;
				},
				get interactOutsideBehavior() {
					return n();
				},
				get loop() {
					return t.loop;
				},
				get trapFocus() {
					return r();
				},
				get isValidEvent() {
					return o();
				},
				get onFocusOutside() {
					return t.onFocusOutside;
				}
			},
			() => c,
			{ forceMount: !0 }
		)
	);
}
var bn, xn, Sn;
class lc {
	constructor(t) {
		k(this, 'open');
		w(this, bn, M(null));
		w(this, xn, M(void 0));
		w(this, Sn, M(null));
		this.open = t.open;
	}
	get contentNode() {
		return h(a(this, bn));
	}
	set contentNode(t) {
		E(a(this, bn), t, !0);
	}
	get contentId() {
		return h(a(this, xn));
	}
	set contentId(t) {
		E(a(this, xn), t, !0);
	}
	get triggerNode() {
		return h(a(this, Sn));
	}
	set triggerNode(t) {
		E(a(this, Sn), t, !0);
	}
	toggleOpen() {
		this.open.current = !this.open.current;
	}
	handleClose() {
		this.open.current && (this.open.current = !1);
	}
}
(bn = new WeakMap()), (xn = new WeakMap()), (Sn = new WeakMap());
var fe, Pn, Lt, ut, lr, Wi, On;
class uc {
	constructor(t, n) {
		w(this, lr);
		w(this, fe);
		w(this, Pn);
		w(this, Lt);
		w(this, ut);
		w(
			this,
			On,
			F(() => ({
				id: a(this, fe).current,
				'aria-haspopup': 'dialog',
				'aria-expanded': es(a(this, ut).open.current),
				'data-state': xi(a(this, ut).open.current),
				'aria-controls': lt(this, lr, Wi).call(this),
				'data-popover-trigger': '',
				disabled: a(this, Lt).current,
				onpointerdown: this.onpointerdown,
				onkeydown: this.onkeydown,
				onclick: this.onclick
			}))
		);
		_(this, fe, t.id),
			_(this, ut, n),
			_(this, Pn, t.ref),
			_(this, Lt, t.disabled),
			Ot({
				id: a(this, fe),
				ref: a(this, Pn),
				onRefChange: (r) => {
					a(this, ut).triggerNode = r;
				}
			}),
			(this.onclick = this.onclick.bind(this)),
			(this.onpointerdown = this.onpointerdown.bind(this)),
			(this.onkeydown = this.onkeydown.bind(this));
	}
	onclick(t) {
		a(this, Lt).current || (t.button === 0 && a(this, ut).toggleOpen());
	}
	onpointerdown(t) {
		a(this, Lt).current || (t.button === 0 && t.preventDefault());
	}
	onkeydown(t) {
		a(this, Lt).current ||
			((t.key === rs || t.key === os) &&
				(t.preventDefault(), a(this, ut).toggleOpen()));
	}
	get props() {
		return h(a(this, On));
	}
	set props(t) {
		E(a(this, On), t);
	}
}
(fe = new WeakMap()),
	(Pn = new WeakMap()),
	(Lt = new WeakMap()),
	(ut = new WeakMap()),
	(lr = new WeakSet()),
	(Wi = function () {
		if (a(this, ut).open.current && a(this, ut).contentId) return a(this, ut).contentId;
	}),
	(On = new WeakMap());
var he, An, En, Cn;
class dc {
	constructor(t, n) {
		w(this, he);
		w(this, An);
		k(this, 'root');
		w(
			this,
			En,
			F(() => ({ open: this.root.open.current }))
		);
		w(
			this,
			Cn,
			F(() => ({
				id: a(this, he).current,
				tabindex: -1,
				'data-state': xi(this.root.open.current),
				'data-popover-content': '',
				style: { pointerEvents: 'auto' }
			}))
		);
		_(this, he, t.id),
			(this.root = n),
			_(this, An, t.ref),
			Ot({
				id: a(this, he),
				ref: a(this, An),
				deps: () => this.root.open.current,
				onRefChange: (r) => {
					(this.root.contentNode = r),
						(this.root.contentId = r == null ? void 0 : r.id);
				}
			});
	}
	get snippetProps() {
		return h(a(this, En));
	}
	set snippetProps(t) {
		E(a(this, En), t);
	}
	get props() {
		return h(a(this, Cn));
	}
	set props(t) {
		E(a(this, Cn), t);
	}
}
(he = new WeakMap()), (An = new WeakMap()), (En = new WeakMap()), (Cn = new WeakMap());
const [fc, Ki] = _n('Popover.Root');
function hc(e) {
	return fc(new lc(e));
}
function gc(e) {
	return new uc(e, Ki());
}
function mc(e) {
	return new dc(e, Ki());
}
var vc = tt('<div><div><!></div></div>'),
	wc = tt('<div><div><!></div></div>');
function yc(e, t) {
	W(t, !0);
	let n = b(t, 'ref', 15, null),
		r = b(t, 'id', 19, Xt),
		o = b(t, 'forceMount', 3, !1),
		i = b(t, 'onCloseAutoFocus', 3, nt),
		s = b(t, 'onEscapeKeydown', 3, nt),
		c = b(t, 'onInteractOutside', 3, nt),
		l = b(t, 'trapFocus', 3, !0),
		u = b(t, 'preventScroll', 3, !1),
		d = Ct(t, [
			'$$slots',
			'$$events',
			'$$legacy',
			'child',
			'children',
			'ref',
			'id',
			'forceMount',
			'onCloseAutoFocus',
			'onEscapeKeydown',
			'onInteractOutside',
			'trapFocus',
			'preventScroll'
		]);
	const g = mc({
			id: p.with(() => r()),
			ref: p.with(
				() => n(),
				(A) => n(A)
			)
		}),
		v = F(() => jt(d, g.props));
	function m(A) {
		c()(A),
			!A.defaultPrevented &&
				((Pe(A.target) && A.target.closest('[data-popover-trigger')) ||
					g.root.handleClose());
	}
	function f(A) {
		s()(A), !A.defaultPrevented && g.root.handleClose();
	}
	function y(A) {
		var C;
		i()(A),
			!A.defaultPrevented &&
				(A.preventDefault(), (C = g.root.triggerNode) == null || C.focus());
	}
	var x = R(),
		S = D(x);
	{
		var P = (A) => {
				cc(
					A,
					Nt(() => h(v), {
						get enabled() {
							return g.root.open.current;
						},
						get id() {
							return r();
						},
						onInteractOutside: m,
						onEscapeKeydown: f,
						onCloseAutoFocus: y,
						get trapFocus() {
							return l();
						},
						get preventScroll() {
							return u();
						},
						loop: !0,
						forceMount: !0,
						popper: (L, I) => {
							let et = () => (I == null ? void 0 : I().props),
								z = () => (I == null ? void 0 : I().wrapperProps);
							var B = R();
							const j = F(() => jt(et(), { style: di('popover') }));
							var Q = D(B);
							{
								var G = (H) => {
										var J = R(),
											$ = D(J),
											Y = br(() => ({
												props: h(j),
												wrapperProps: z(),
												...g.snippetProps
											}));
										V(
											$,
											() => t.child,
											() => h(Y)
										),
											T(H, J);
									},
									rt = (H) => {
										var J = vc();
										let $;
										var Y = q(J);
										let X;
										var it = q(Y);
										V(it, () => t.children ?? Z),
											U(Y),
											U(J),
											yt(() => {
												($ = Zt(J, $, { ...z() })), (X = Zt(Y, X, { ...h(j) }));
											}),
											T(H, J);
									};
								ot(Q, (H) => {
									t.child ? H(G) : H(rt, !1);
								});
							}
							T(L, B);
						},
						$$slots: { popper: !0 }
					})
				);
			},
			O = (A, C) => {
				{
					var L = (I) => {
						ac(
							I,
							Nt(() => h(v), {
								get present() {
									return g.root.open.current;
								},
								get id() {
									return r();
								},
								onInteractOutside: m,
								onEscapeKeydown: f,
								onCloseAutoFocus: y,
								get trapFocus() {
									return l();
								},
								get preventScroll() {
									return u();
								},
								loop: !0,
								forceMount: !1,
								popper: (z, B) => {
									let j = () => (B == null ? void 0 : B().props),
										Q = () => (B == null ? void 0 : B().wrapperProps);
									var G = R();
									const rt = F(() => jt(j(), { style: di('popover') }));
									var H = D(G);
									{
										var J = (Y) => {
												var X = R(),
													it = D(X),
													Wt = br(() => ({
														props: h(rt),
														wrapperProps: Q(),
														...g.snippetProps
													}));
												V(
													it,
													() => t.child,
													() => h(Wt)
												),
													T(Y, X);
											},
											$ = (Y) => {
												var X = wc();
												let it;
												var Wt = q(X);
												let Wr;
												var Hi = q(Wt);
												V(Hi, () => t.children ?? Z),
													U(Wt),
													U(X),
													yt(() => {
														(it = Zt(X, it, { ...Q() })),
															(Wr = Zt(Wt, Wr, { ...h(rt) }));
													}),
													T(Y, X);
											};
										ot(H, (Y) => {
											t.child ? Y(J) : Y($, !1);
										});
									}
									T(z, G);
								},
								$$slots: { popper: !0 }
							})
						);
					};
					ot(
						A,
						(I) => {
							o() || I(L);
						},
						C
					);
				}
			};
		ot(S, (A) => {
			o() ? A(P) : A(O, !1);
		});
	}
	T(e, x), K();
}
var pc = tt('<button><!></button>');
function bc(e, t) {
	W(t, !0);
	let n = b(t, 'id', 19, Xt),
		r = b(t, 'ref', 15, null),
		o = b(t, 'type', 3, 'button'),
		i = b(t, 'disabled', 3, !1),
		s = Ct(t, [
			'$$slots',
			'$$events',
			'$$legacy',
			'children',
			'child',
			'id',
			'ref',
			'type',
			'disabled'
		]);
	const c = gc({
			id: p.with(() => n()),
			ref: p.with(
				() => r(),
				(u) => r(u)
			),
			disabled: p.with(() => !!i())
		}),
		l = F(() => jt(s, c.props, { type: o() }));
	Qa(e, {
		get id() {
			return n();
		},
		children: (u, d) => {
			var g = R(),
				v = D(g);
			{
				var m = (y) => {
						var x = R(),
							S = D(x);
						V(
							S,
							() => t.child,
							() => ({ props: h(l) })
						),
							T(y, x);
					},
					f = (y) => {
						var x = pc();
						let S;
						var P = q(x);
						V(P, () => t.children ?? Z),
							U(x),
							yt(() => (S = Zt(x, S, { ...h(l) }))),
							T(y, x);
					};
				ot(v, (y) => {
					t.child ? y(m) : y(f, !1);
				});
			}
			T(u, g);
		},
		$$slots: { default: !0 }
	}),
		K();
}
function xc(e, t) {
	W(t, !0);
	let n = b(t, 'open', 15, !1),
		r = b(t, 'onOpenChange', 3, nt),
		o = b(t, 'controlledOpen', 3, !1);
	hc({
		open: p.with(
			() => n(),
			(i) => {
				o() || n(i), r()(i);
			}
		)
	}),
		Ja(e, {
			children: (i, s) => {
				var c = R(),
					l = D(c);
				V(l, () => t.children ?? Z), T(i, c);
			},
			$$slots: { default: !0 }
		}),
		K();
}
function Sc(e, t, n = {}) {
	const { immediate: r = !0 } = n,
		o = p(!1);
	let i;
	function s() {
		i && (clearTimeout(i), (i = null));
	}
	function c() {
		(o.current = !1), s();
	}
	function l(...u) {
		s(),
			(o.current = !0),
			(i = setTimeout(() => {
				(o.current = !1), (i = null), e(...u);
			}, t));
	}
	return (
		r && ((o.current = !0), hr && l()),
		pi(() => {
			c();
		}),
		{ isPending: p.readonly(o), start: l, stop: c }
	);
}
var Tn, ge, ur, dr;
class Pc {
	constructor(t) {
		k(this, 'delayDuration');
		k(this, 'disableHoverableContent');
		k(this, 'disableCloseOnTriggerClick');
		k(this, 'disabled');
		k(this, 'ignoreNonKeyboardFocus');
		k(this, 'skipDelayDuration');
		w(this, Tn, M(!0));
		k(this, 'isPointerInTransit', p(!1));
		w(this, ge);
		w(this, ur, () => {
			a(this, ge).start();
		});
		w(this, dr, () => {
			a(this, ge).stop();
		});
		k(this, 'onOpen', () => {
			a(this, dr).call(this), (this.isOpenDelayed = !1);
		});
		k(this, 'onClose', () => {
			a(this, ur).call(this);
		});
		(this.delayDuration = t.delayDuration),
			(this.disableHoverableContent = t.disableHoverableContent),
			(this.disableCloseOnTriggerClick = t.disableCloseOnTriggerClick),
			(this.disabled = t.disabled),
			(this.ignoreNonKeyboardFocus = t.ignoreNonKeyboardFocus),
			(this.skipDelayDuration = t.skipDelayDuration),
			_(
				this,
				ge,
				Sc(
					() => {
						this.isOpenDelayed = !0;
					},
					this.skipDelayDuration.current,
					{ immediate: !1 }
				)
			);
	}
	get isOpenDelayed() {
		return h(a(this, Tn));
	}
	set isOpenDelayed(t) {
		E(a(this, Tn), t, !0);
	}
}
(Tn = new WeakMap()), (ge = new WeakMap()), (ur = new WeakMap()), (dr = new WeakMap());
const [Oc, il] = _n('Tooltip.Provider');
_n('Tooltip.Root');
function Ac(e) {
	return Oc(new Pc(e));
}
function Ec(e, t) {
	W(t, !0);
	let n = b(t, 'delayDuration', 3, 700),
		r = b(t, 'disableCloseOnTriggerClick', 3, !1),
		o = b(t, 'disableHoverableContent', 3, !1),
		i = b(t, 'disabled', 3, !1),
		s = b(t, 'ignoreNonKeyboardFocus', 3, !1),
		c = b(t, 'skipDelayDuration', 3, 300);
	Ac({
		delayDuration: p.with(() => n()),
		disableCloseOnTriggerClick: p.with(() => r()),
		disableHoverableContent: p.with(() => o()),
		disabled: p.with(() => i()),
		ignoreNonKeyboardFocus: p.with(() => s()),
		skipDelayDuration: p.with(() => c())
	});
	var l = R(),
		u = D(l);
	V(u, () => t.children ?? Z), T(e, l), K();
}
const Cc = Ec;
function Tc(e, t) {
	W(t, !0);
	let n = b(t, 'ref', 15, null),
		r = b(t, 'sideOffset', 3, 4),
		o = b(t, 'align', 3, 'center'),
		i = Ct(t, [
			'$$slots',
			'$$events',
			'$$legacy',
			'ref',
			'class',
			'sideOffset',
			'align'
		]);
	var s = R(),
		c = D(s);
	Un(
		c,
		() => ys,
		(l, u) => {
			u(l, {
				children: (d, g) => {
					var v = R(),
						m = D(v);
					const f = F(() =>
						hi(
							'bg-neutral-3 text-neutral-11 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-none',
							t.class
						)
					);
					Un(
						m,
						() => yc,
						(y, x) => {
							x(
								y,
								Nt(
									{
										get sideOffset() {
											return r();
										},
										get align() {
											return o();
										},
										get class() {
											return h(f);
										}
									},
									() => i,
									{
										get ref() {
											return n();
										},
										set ref(S) {
											n(S);
										}
									}
								)
							);
						}
					),
						T(d, v);
				},
				$$slots: { default: !0 }
			});
		}
	),
		T(e, s),
		K();
}
const _c = xc,
	Fc = bc;
function Dc(e, t) {
	W(t, !0);
	let n = b(t, 'ref', 15, null),
		r = b(t, 'orientation', 3, 'horizontal'),
		o = Ct(t, ['$$slots', '$$events', '$$legacy', 'ref', 'class', 'orientation']);
	var i = R(),
		s = D(i);
	const c = F(() =>
		hi(
			'bg-neutral-7 shrink-0',
			r() === 'horizontal' ? 'h-[1px] w-full' : 'min-h-full w-[1px]',
			t.class
		)
	);
	Un(
		s,
		() => ic,
		(l, u) => {
			u(
				l,
				Nt(
					{
						get class() {
							return h(c);
						},
						get orientation() {
							return r();
						}
					},
					() => o,
					{
						get ref() {
							return n();
						},
						set ref(d) {
							n(d);
						}
					}
				)
			);
		}
	),
		T(e, i),
		K();
}
var Ic = tt('<li><!></li>'),
	Rc = tt(
		'<ul class="flex flex-col"><span class="text-neutral-10 mb-4 text-sm"> </span> <!></ul>'
	),
	Lc = tt(
		'<footer class="bg-neutral-2 border-neutral-6 mt-8 flex w-full justify-around border-t py-12"></footer>'
	);
function Nc(e, t) {
	W(t, !1);
	const n = [
		{
			label: 'Project',
			links: [
				{ label: 'Documentation', href: '/docs' },
				{ label: 'About', href: '/about' },
				{ label: 'Source Code', href: qr.repository }
			]
		},
		{
			label: 'Application',
			links: [
				{ label: 'Start the application', href: Hn.APP_URL },
				{ label: 'View the Demonstration', href: '/demo' },
				{ label: 'Self-hosting Instructions', href: '/docs' }
			]
		},
		{
			label: 'Contact',
			links: [
				{ label: 'Blog', href: '/blog' },
				{ label: 'Newsletter', href: Hn.NEWSLETTER_URL },
				{ label: 'Email', href: 'mailto:contact@verdagraph.org' },
				{ label: 'Support the Project', href: '/support' },
				{ label: 'Liberapay', href: qr.donation },
				{ label: 'Contributing', href: '' }
			]
		}
	];
	vi();
	var r = Lc();
	Vn(
		r,
		5,
		() => n,
		zn,
		(o, i) => {
			var s = Rc(),
				c = q(s),
				l = q(c, !0);
			U(c);
			var u = dt(c, 2);
			Vn(
				u,
				1,
				() => h(i).links,
				zn,
				(d, g) => {
					var v = Ic(),
						m = q(v);
					Wn(m, {
						variant: 'link',
						get href() {
							return h(g).href;
						},
						class: 'text-neutral-11 h-8 p-0 text-xs',
						children: (f, y) => {
							Mn();
							var x = kn();
							yt(() => jn(x, h(g).label)), T(f, x);
						},
						$$slots: { default: !0 }
					}),
						U(v),
						T(d, v);
				}
			),
				U(s),
				yt(() => jn(l, h(i).label)),
				T(o, s);
		}
	),
		U(r),
		T(e, r),
		K();
}
var Bc = tt('<li><!></li>'),
	kc = tt('<li><!></li>'),
	Mc = tt('<ul class="flex flex-col"><!> <!> <li><!></li></ul>'),
	Wc = tt('<!> <!>', 1),
	Kc =
		tt(`<header class="border-neutral-6 sticky left-0 top-0 w-full rounded-none border-b
		drop-shadow-md"><nav class="bg-neutral-2 flex items-center justify-between px-8 py-2"><div><ul class="flex items-center gap-6 p-2 text-lg"><li><a href="/"><span class="font-semibold">Verdagraph</span></a></li></ul></div> <ul class="hidden gap-4 md:flex md:gap-8 lg:gap-12"></ul> <div class="flex lg:hidden"><!></div> <ul class="hidden gap-8 text-lg md:flex"><li class="hidden lg:block"><!></li></ul></nav></header>`);
function Hc(e, t) {
	W(t, !1);
	let n = [
		{ url: '/demo', label: 'Demo' },
		{ url: '/docs', label: 'Docs' },
		{ url: '/blog', label: 'Blog' },
		{ url: '/about', label: 'About' },
		{ url: '/support', label: 'Support' }
	];
	vi();
	var r = Kc(),
		o = q(r),
		i = dt(q(o), 2);
	Vn(
		i,
		5,
		() => n,
		zn,
		(g, v) => {
			var m = Bc(),
				f = q(m);
			Wn(f, {
				get href() {
					return h(v).url;
				},
				variant: 'ghost',
				children: (y, x) => {
					Mn();
					var S = kn();
					yt(() => jn(S, h(v).label)), T(y, S);
				},
				$$slots: { default: !0 }
			}),
				U(m),
				T(g, m);
		}
	),
		U(i);
	var s = dt(i, 2),
		c = q(s);
	_c(c, {
		children: (g, v) => {
			var m = Wc(),
				f = D(m);
			Fc(f, {
				children: (x, S) => {
					wo(x, {
						get icon() {
							return _o.dropdownMenuIcon;
						},
						width: '3rem'
					});
				},
				$$slots: { default: !0 }
			});
			var y = dt(f, 2);
			Tc(y, {
				class: 'w-auto',
				children: (x, S) => {
					var P = Mc();
					{
						const I = (et, z = Z, B = Z) => {
							Wn(et, {
								get href() {
									return z();
								},
								variant: 'link',
								children: (j, Q) => {
									Mn();
									var G = kn();
									yt(() => jn(G, B())), T(j, G);
								},
								$$slots: { default: !0 }
							});
						};
						var O = q(P);
						Vn(
							O,
							1,
							() => n,
							zn,
							(et, z) => {
								var B = kc(),
									j = q(B);
								I(
									j,
									() => h(z).url,
									() => h(z).label
								),
									U(B),
									T(et, B);
							}
						);
						var A = dt(O, 2);
						Dc(A, { class: 'bg-neutral-6 my-2 w-full opacity-50' });
						var C = dt(A, 2),
							L = q(C);
						I(
							L,
							() => Hn.APP_URL,
							() => 'Start the Application'
						),
							U(C),
							U(P);
					}
					T(x, P);
				},
				$$slots: { default: !0 }
			}),
				T(g, m);
		},
		$$slots: { default: !0 }
	}),
		U(s);
	var l = dt(s, 2),
		u = q(l),
		d = q(u);
	Wn(d, {
		get href() {
			return Hn.APP_URL;
		},
		variant: 'default',
		children: (g, v) => {
			Mn();
			var m = kn('Get Started');
			T(g, m);
		},
		$$slots: { default: !0 }
	}),
		U(u),
		U(l),
		U(o),
		U(r),
		T(e, r),
		K();
}
var Uc = tt(
		'<div class="flex flex-col"><!> <div class="min-h-screen"><!></div> <!></div>'
	),
	Vc = tt('<!> <div class="h-screen w-screen"><!></div>', 1);
function ol(e, t) {
	var n = Vc(),
		r = D(n);
	To(r, {});
	var o = dt(r, 2),
		i = q(o);
	Un(
		i,
		() => Cc,
		(s, c) => {
			c(s, {
				delayDuration: 500,
				children: (l, u) => {
					var d = Uc(),
						g = q(d);
					Hc(g, {});
					var v = dt(g, 2),
						m = q(v);
					V(m, () => t.children), U(v);
					var f = dt(v, 2);
					Nc(f, {}), U(d), T(l, d);
				},
				$$slots: { default: !0 }
			});
		}
	),
		U(o),
		T(e, n);
}
export { ol as component };
