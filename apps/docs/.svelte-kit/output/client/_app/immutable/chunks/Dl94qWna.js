import {
	aL as $t,
	aC as Ae,
	a as At,
	r as Bt,
	k as Ct,
	e as Dt,
	P as E,
	M as Ft,
	L as Gt,
	a2 as He,
	F as Ht,
	a1 as It,
	aI as Lt,
	ac as Me,
	p as Mt,
	aE as Ne,
	aF as Nt,
	Y as O,
	aH as Oe,
	n as Ot,
	h as P,
	an as Pe,
	aG as Pt,
	Z as Rt,
	s as Se,
	b as St,
	j as Te,
	aK as Vt,
	g as Wt,
	d as X,
	v as Xe,
	c as ct,
	I as dt,
	aJ as ft,
	N as ht,
	aD as je,
	J as kt,
	o as lt,
	am as qt,
	al as se,
	a3 as ut,
	ab as we,
	a8 as xt,
	aM as ze,
	aB as zt
} from './DgmMHYUv.js';
import { q } from './HWDk4eir.js';

var qe = (t) => {
	throw TypeError(t);
};
var be = (t, e, r) => e.has(t) || qe('Cannot ' + r);
var s = (t, e, r) => (be(t, e, 'read from private field'), r ? r.call(t) : e.get(t)),
	d = (t, e, r) =>
		e.has(t)
			? qe('Cannot add the same private member more than once')
			: e instanceof WeakSet
				? e.add(t)
				: e.set(t, r),
	b = (t, e, r, n) => (
		be(t, e, 'write to private field'), n ? n.call(t, r) : e.set(t, r), r
	),
	A = (t, e, r) => (be(t, e, 'access private method'), r);

function Xr(t, e) {
	return e;
}
function Xt(t, e, r, n) {
	for (var o = [], u = e.length, a = 0; a < u; a++) Nt(e[a].e, o, !0);
	var l = u > 0 && o.length === 0 && r !== null;
	if (l) {
		var m = r.parentNode;
		Ot(m), m.append(r), n.clear(), N(t, e[0].prev, e[u - 1].next);
	}
	Pt(o, () => {
		for (var p = 0; p < u; p++) {
			var w = e[p];
			l || (n.delete(w.k), N(t, w.prev, w.next)), zt(w.e, !l);
		}
	});
}
function jr(t, e, r, n, o, u = null) {
	var a = t,
		l = { flags: e, items: new Map(), first: null },
		m = (e & ft) !== 0;
	if (m) {
		var p = t;
		a = P ? Te(Wt(p)) : p.appendChild(Bt());
	}
	P && At();
	var w = null,
		M = !1,
		f = xt(() => {
			var _ = r();
			return kt(_) ? _ : _ == null ? [] : lt(_);
		});
	St(() => {
		var _ = E(f),
			i = _.length;
		if (M && i === 0) return;
		M = i === 0;
		let c = !1;
		if (P) {
			var v = a.data === It;
			v !== (i === 0) && ((a = He()), Te(a), Se(!1), (c = !0));
		}
		if (P) {
			for (var T = null, I, S = 0; S < i; S++) {
				if (X.nodeType === 8 && X.data === Ct) {
					(a = X), (c = !0), Se(!1);
					break;
				}
				var h = _[S],
					g = n(h, S);
				(I = mt(X, l, T, null, h, g, S, o, e, r)), l.items.set(g, I), (T = I);
			}
			i > 0 && Te(He());
		}
		P || jt(_, l, a, o, e, n, r),
			u !== null &&
				(i === 0
					? w
						? ut(w)
						: (w = ct(() => u(a)))
					: w !== null &&
						Mt(w, () => {
							w = null;
						})),
			c && Se(!0),
			E(f);
	}),
		P && (a = X);
}
function jt(t, e, r, n, o, u, a) {
	var Be, Fe, Ve, $e;
	var l = (o & Vt) !== 0,
		m = (o & (Oe | Ne)) !== 0,
		p = t.length,
		w = e.items,
		M = e.first,
		f = M,
		_,
		i = null,
		c,
		v = [],
		T = [],
		I,
		S,
		h,
		g;
	if (l)
		for (g = 0; g < p; g += 1)
			(I = t[g]),
				(S = u(I, g)),
				(h = w.get(S)),
				h !== void 0 &&
					((Be = h.a) == null || Be.measure(), (c ?? (c = new Set())).add(h));
	for (g = 0; g < p; g += 1) {
		if (((I = t[g]), (S = u(I, g)), (h = w.get(S)), h === void 0)) {
			var bt = f ? f.e.nodes_start : r;
			(i = mt(bt, e, i, i === null ? e.first : i.next, I, S, g, n, o, a)),
				w.set(S, i),
				(v = []),
				(T = []),
				(f = i.next);
			continue;
		}
		if (
			(m && Yt(h, I, g, o),
			h.e.f & Ae &&
				(ut(h.e),
				l && ((Fe = h.a) == null || Fe.unfix(), (c ?? (c = new Set())).delete(h))),
			h !== f)
		) {
			if (_ !== void 0 && _.has(h)) {
				if (v.length < T.length) {
					var oe = T[0],
						k;
					i = oe.prev;
					var We = v[0],
						Ee = v[v.length - 1];
					for (k = 0; k < v.length; k += 1) Ye(v[k], oe, r);
					for (k = 0; k < T.length; k += 1) _.delete(T[k]);
					N(e, We.prev, Ee.next),
						N(e, i, We),
						N(e, Ee, oe),
						(f = oe),
						(i = Ee),
						(g -= 1),
						(v = []),
						(T = []);
				} else
					_.delete(h),
						Ye(h, f, r),
						N(e, h.prev, h.next),
						N(e, h, i === null ? e.first : i.next),
						N(e, i, h),
						(i = h);
				continue;
			}
			for (v = [], T = []; f !== null && f.k !== S; )
				f.e.f & Ae || (_ ?? (_ = new Set())).add(f), T.push(f), (f = f.next);
			if (f === null) continue;
			h = f;
		}
		v.push(h), (i = h), (f = h.next);
	}
	if (f !== null || _ !== void 0) {
		for (var H = _ === void 0 ? [] : lt(_); f !== null; )
			f.e.f & Ae || H.push(f), (f = f.next);
		var ye = H.length;
		if (ye > 0) {
			var Tt = o & ft && p === 0 ? r : null;
			if (l) {
				for (g = 0; g < ye; g += 1) (Ve = H[g].a) == null || Ve.measure();
				for (g = 0; g < ye; g += 1) ($e = H[g].a) == null || $e.fix();
			}
			Xt(e, H, Tt, w);
		}
	}
	l &&
		Ft(() => {
			var Ge;
			if (c !== void 0) for (h of c) (Ge = h.a) == null || Ge.apply();
		}),
		(Xe.first = e.first && e.first.e),
		(Xe.last = i && i.e);
}
function Yt(t, e, r, n) {
	n & Oe && je(t.v, e), n & Ne ? je(t.i, r) : (t.i = r);
}
function mt(t, e, r, n, o, u, a, l, m, p) {
	var w = (m & Oe) !== 0,
		M = (m & Lt) === 0,
		f = w ? (M ? Rt(o) : Me(o)) : o,
		_ = m & Ne ? Me(a) : a,
		i = { i: _, v: f, k: u, a: null, e: null, prev: r, next: n };
	try {
		return (
			(i.e = ct(() => l(t, f, _, p), P)),
			(i.e.prev = r && r.e),
			(i.e.next = n && n.e),
			r === null ? (e.first = i) : ((r.next = i), (r.e.next = i.e)),
			n !== null && ((n.prev = i), (n.e.prev = i.e)),
			i
		);
	} finally {
	}
}
function Ye(t, e, r) {
	for (
		var n = t.next ? t.next.e.nodes_start : r,
			o = e ? e.e.nodes_start : r,
			u = t.e.nodes_start;
		u !== n;

	) {
		var a = Dt(u);
		o.before(u), (u = a);
	}
}
function N(t, e, r) {
	e === null ? (t.first = r) : ((e.next = r), (e.e.next = r && r.e)),
		r !== null && ((r.prev = e), (r.e.prev = e && e.e));
}
function Jt(t) {
	O(t, t.v + 1);
}
function _e(t) {
	let e = 0,
		r = Me(0),
		n;
	return () => {
		$t() &&
			(E(r),
			Gt(
				() => (
					e === 0 && (n = dt(() => t(() => Jt(r)))),
					(e += 1),
					() => {
						qt().then(() => {
							(e -= 1), e === 0 && (n == null || n(), (n = void 0));
						});
					}
				)
			));
	};
}
const pt = typeof window < 'u' ? window : void 0;
function Kt(t) {
	let e = t.activeElement;
	for (; e != null && e.shadowRoot; ) {
		const r = e.shadowRoot.activeElement;
		if (r === e) break;
		e = r;
	}
	return e;
}
var Y, J;
class Ut {
	constructor(e, r) {
		d(this, Y);
		d(this, J);
		b(this, Y, e), b(this, J, _e(r));
	}
	get current() {
		return s(this, J).call(this), s(this, Y).call(this);
	}
}
(Y = new WeakMap()), (J = new WeakMap());
const Qt = /\(.+\)/;
class Zt extends Ut {
	constructor(e, r) {
		let n = Qt.test(e) ? e : `(${e})`;
		const o = window.matchMedia(n);
		super(
			() => o.matches,
			(u) => q(o, 'change', u)
		);
	}
}
var F, K, ot;
let er =
	((ot = class {
		constructor(e = {}) {
			d(this, F);
			d(this, K);
			const { window: r = pt, document: n = r == null ? void 0 : r.document } = e;
			r !== void 0 &&
				(b(this, F, n),
				b(
					this,
					K,
					_e((o) => {
						const u = q(r, 'focusin', o),
							a = q(r, 'focusout', o);
						return () => {
							u(), a();
						};
					})
				));
		}
		get current() {
			var e;
			return (
				(e = s(this, K)) == null || e.call(this), s(this, F) ? Kt(s(this, F)) : null
			);
		}
	}),
	(F = new WeakMap()),
	(K = new WeakMap()),
	ot);
new er();
function tr(t, e) {
	switch (t) {
		case 'post':
			Ht(e);
			break;
		case 'pre':
			ht(e);
			break;
	}
}
function vt(t, e, r, n = {}) {
	const { lazy: o = !1 } = n;
	let u = !o,
		a = Array.isArray(t) ? [] : void 0;
	tr(e, () => {
		const l = Array.isArray(t) ? t.map((p) => p()) : t();
		if (!u) {
			(u = !0), (a = l);
			return;
		}
		const m = dt(() => r(l, a));
		return (a = l), m;
	});
}
function Le(t, e, r) {
	vt(t, 'post', e, r);
}
function rr(t, e, r) {
	vt(t, 'pre', e, r);
}
Le.pre = rr;
function nr(t, e) {
	switch (t) {
		case 'local':
			return e.localStorage;
		case 'session':
			return e.sessionStorage;
	}
}
var L, R, V, D, U, x, fe, C, ce, le;
class gt {
	constructor(e, r, n = {}) {
		d(this, C);
		d(this, L);
		d(this, R);
		d(this, V);
		d(this, D);
		d(this, U);
		d(this, x, se(0));
		d(this, fe, (e) => {
			e.key !== s(this, R) ||
				e.newValue === null ||
				(b(this, L, A(this, C, ce).call(this, e.newValue)),
				O(s(this, x), E(s(this, x)) + 1));
		});
		const {
			storage: o = 'local',
			serializer: u = { serialize: JSON.stringify, deserialize: JSON.parse },
			syncTabs: a = !0,
			window: l = pt
		} = n;
		if ((b(this, L, r), b(this, R, e), b(this, V, u), l === void 0)) return;
		const m = nr(o, l);
		b(this, D, m);
		const p = m.getItem(e);
		p !== null
			? b(this, L, A(this, C, ce).call(this, p))
			: A(this, C, le).call(this, r),
			a &&
				o === 'local' &&
				b(
					this,
					U,
					_e(() => q(l, 'storage', s(this, fe)))
				);
	}
	get current() {
		var o, u;
		(o = s(this, U)) == null || o.call(this), E(s(this, x));
		const e =
				A(this, C, ce).call(
					this,
					(u = s(this, D)) == null ? void 0 : u.getItem(s(this, R))
				) ?? s(this, L),
			r = new WeakMap(),
			n = (a) => {
				if (
					a === null ||
					(a == null ? void 0 : a.constructor.name) === 'Date' ||
					typeof a != 'object'
				)
					return a;
				let l = r.get(a);
				return (
					l ||
						((l = new Proxy(a, {
							get: (m, p) => (E(s(this, x)), n(Reflect.get(m, p))),
							set: (m, p, w) => (
								O(s(this, x), E(s(this, x)) + 1),
								Reflect.set(m, p, w),
								A(this, C, le).call(this, e),
								!0
							)
						})),
						r.set(a, l)),
					l
				);
			};
		return n(e);
	}
	set current(e) {
		A(this, C, le).call(this, e), O(s(this, x), E(s(this, x)) + 1);
	}
}
(L = new WeakMap()),
	(R = new WeakMap()),
	(V = new WeakMap()),
	(D = new WeakMap()),
	(U = new WeakMap()),
	(x = new WeakMap()),
	(fe = new WeakMap()),
	(C = new WeakSet()),
	(ce = function (e) {
		try {
			return s(this, V).deserialize(e);
		} catch (r) {
			console.error(
				`Error when parsing "${e}" from persisted store "${s(this, R)}"`,
				r
			);
			return;
		}
	}),
	(le = function (e) {
		var r;
		try {
			e != null &&
				((r = s(this, D)) == null || r.setItem(s(this, R), s(this, V).serialize(e)));
		} catch (n) {
			console.error(
				`Error when writing value from persisted store "${s(this, R)}" to ${s(this, D)}`,
				n
			);
		}
	});
function Je(t) {
	return t.filter((e) => e.length > 0);
}
const wt = { getItem: (t) => null, setItem: (t, e) => {} },
	ae = typeof document < 'u';
function ir(t) {
	return typeof t == 'function';
}
function sr(t) {
	return t !== null && typeof t == 'object';
}
const j = Symbol('box'),
	De = Symbol('is-writable');
function ar(t) {
	return sr(t) && j in t;
}
function or(t) {
	return y.isBox(t) && De in t;
}
function y(t) {
	let e = se(we(t));
	return {
		[j]: !0,
		[De]: !0,
		get current() {
			return E(e);
		},
		set current(r) {
			O(e, r, !0);
		}
	};
}
function ur(t, e) {
	const r = Pe(t);
	return e
		? {
				[j]: !0,
				[De]: !0,
				get current() {
					return E(r);
				},
				set current(n) {
					e(n);
				}
			}
		: {
				[j]: !0,
				get current() {
					return t();
				}
			};
}
function cr(t) {
	return y.isBox(t) ? t : ir(t) ? y.with(t) : y(t);
}
function lr(t) {
	return Object.entries(t).reduce(
		(e, [r, n]) =>
			y.isBox(n)
				? (y.isWritableBox(n)
						? Object.defineProperty(e, r, {
								get() {
									return n.current;
								},
								set(o) {
									n.current = o;
								}
							})
						: Object.defineProperty(e, r, {
								get() {
									return n.current;
								}
							}),
					e)
				: Object.assign(e, { [r]: n }),
		{}
	);
}
function fr(t) {
	return y.isWritableBox(t)
		? {
				[j]: !0,
				get current() {
					return t.current;
				}
			}
		: t;
}
y.from = cr;
y.with = ur;
y.flatten = lr;
y.readonly = fr;
y.isBox = ar;
y.isWritableBox = or;
var Ke =
	typeof globalThis < 'u'
		? globalThis
		: typeof window < 'u'
			? window
			: typeof global < 'u'
				? global
				: typeof self < 'u'
					? self
					: {};
function Jr(t) {
	return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default')
		? t.default
		: t;
}
var _t = {},
	Ue = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
	dr = /\n/g,
	hr = /^\s*/,
	mr = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
	pr = /^:\s*/,
	vr = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
	gr = /^[;\s]*/,
	wr = /^\s+|\s+$/g,
	_r = `
`,
	Qe = '/',
	Ze = '*',
	z = '',
	Er = 'comment',
	yr = 'declaration',
	br = function (t, e) {
		if (typeof t != 'string') throw new TypeError('First argument must be a string');
		if (!t) return [];
		e = e || {};
		var r = 1,
			n = 1;
		function o(i) {
			var c = i.match(dr);
			c && (r += c.length);
			var v = i.lastIndexOf(_r);
			n = ~v ? i.length - v : n + i.length;
		}
		function u() {
			var i = { line: r, column: n };
			return function (c) {
				return (c.position = new a(i)), p(), c;
			};
		}
		function a(i) {
			(this.start = i), (this.end = { line: r, column: n }), (this.source = e.source);
		}
		a.prototype.content = t;
		function l(i) {
			var c = new Error(e.source + ':' + r + ':' + n + ': ' + i);
			if (
				((c.reason = i),
				(c.filename = e.source),
				(c.line = r),
				(c.column = n),
				(c.source = t),
				!e.silent)
			)
				throw c;
		}
		function m(i) {
			var c = i.exec(t);
			if (c) {
				var v = c[0];
				return o(v), (t = t.slice(v.length)), c;
			}
		}
		function p() {
			m(hr);
		}
		function w(i) {
			var c;
			for (i = i || []; (c = M()); ) c !== !1 && i.push(c);
			return i;
		}
		function M() {
			var i = u();
			if (!(Qe != t.charAt(0) || Ze != t.charAt(1))) {
				for (
					var c = 2;
					z != t.charAt(c) && (Ze != t.charAt(c) || Qe != t.charAt(c + 1));

				)
					++c;
				if (((c += 2), z === t.charAt(c - 1))) return l('End of comment missing');
				var v = t.slice(2, c - 2);
				return (n += 2), o(v), (t = t.slice(c)), (n += 2), i({ type: Er, comment: v });
			}
		}
		function f() {
			var i = u(),
				c = m(mr);
			if (c) {
				if ((M(), !m(pr))) return l("property missing ':'");
				var v = m(vr),
					T = i({
						type: yr,
						property: et(c[0].replace(Ue, z)),
						value: v ? et(v[0].replace(Ue, z)) : z
					});
				return m(gr), T;
			}
		}
		function _() {
			var i = [];
			w(i);
			for (var c; (c = f()); ) c !== !1 && (i.push(c), w(i));
			return i;
		}
		return p(), _();
	};
function et(t) {
	return t ? t.replace(wr, z) : z;
}
var Tr =
	(Ke && Ke.__importDefault) ||
	function (t) {
		return t && t.__esModule ? t : { default: t };
	};
Object.defineProperty(_t, '__esModule', { value: !0 });
var tt = (_t.default = Ar),
	Sr = Tr(br);
function Ar(t, e) {
	var r = null;
	if (!t || typeof t != 'string') return r;
	var n = (0, Sr.default)(t),
		o = typeof e == 'function';
	return (
		n.forEach(function (u) {
			if (u.type === 'declaration') {
				var a = u.property,
					l = u.value;
				o ? e(a, l, u) : l && ((r = r || {}), (r[a] = l));
			}
		}),
		r
	);
}
const Kr = tt.default || tt;
function xr(t, e) {
	const r = RegExp(t, 'g');
	return (n) => {
		if (typeof n != 'string')
			throw new TypeError(`expected an argument of type string, but got ${typeof n}`);
		return n.match(r) ? n.replace(r, e) : n;
	};
}
const Ir = xr(/[A-Z]/, (t) => `-${t.toLowerCase()}`);
function Cr(t) {
	if (!t || typeof t != 'object' || Array.isArray(t))
		throw new TypeError(`expected an argument of type object, but got ${typeof t}`);
	return Object.keys(t).map((e) => `${Ir(e)}: ${t[e]};`).join(`
`);
}
function Mr(t = {}) {
	return Cr(t).replace(
		`
`,
		' '
	);
}
const Rr = {
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
Mr(Rr);
const kr = typeof window < 'u' ? window : void 0;
function Nr(t) {
	let e = t.activeElement;
	for (; e != null && e.shadowRoot; ) {
		const r = e.shadowRoot.activeElement;
		if (r === e) break;
		e = r;
	}
	return e;
}
var $, Q;
class Or {
	constructor(e = {}) {
		d(this, $);
		d(this, Q);
		const { window: r = kr, document: n = r == null ? void 0 : r.document } = e;
		r !== void 0 &&
			(b(this, $, n),
			b(
				this,
				Q,
				_e((o) => {
					const u = q(r, 'focusin', o),
						a = q(r, 'focusout', o);
					return () => {
						u(), a();
					};
				})
			));
	}
	get current() {
		var e;
		return (e = s(this, Q)) == null || e.call(this), s(this, $) ? Nr(s(this, $)) : null;
	}
}
($ = new WeakMap()), (Q = new WeakMap());
new Or();
const xe = y('mode-watcher-mode'),
	Ie = y('mode-watcher-theme'),
	Pr = ['dark', 'light', 'system'];
function rt(t) {
	return typeof t != 'string' ? !1 : Pr.includes(t);
}
var Z, de, ee, he, W, te, Re;
class zr {
	constructor() {
		d(this, te);
		d(this, Z, 'system');
		d(this, de, ae ? localStorage : wt);
		d(this, ee, s(this, de).getItem(xe.current));
		d(this, he, rt(s(this, ee)) ? s(this, ee) : s(this, Z));
		d(this, W, se(we(A(this, te, Re).call(this))));
		ze(() =>
			Le.pre(
				() => xe.current,
				(e, r) => {
					const n = E(s(this, W)).current;
					O(s(this, W), A(this, te, Re).call(this, n), !0),
						r && localStorage.removeItem(r);
				}
			)
		);
	}
	get current() {
		return E(s(this, W)).current;
	}
	set current(e) {
		E(s(this, W)).current = e;
	}
}
(Z = new WeakMap()),
	(de = new WeakMap()),
	(ee = new WeakMap()),
	(he = new WeakMap()),
	(W = new WeakMap()),
	(te = new WeakSet()),
	(Re = function (e = s(this, he)) {
		return new gt(xe.current, e, {
			serializer: { serialize: (r) => r, deserialize: (r) => (rt(r) ? r : s(this, Z)) }
		});
	});
var me, re, ne, pe;
class Lr {
	constructor() {
		d(this, me);
		d(this, re, !0);
		d(this, ne, se(we(s(this, me))));
		d(
			this,
			pe,
			typeof window < 'u' && typeof window.matchMedia == 'function'
				? new Zt('prefers-color-scheme: light')
				: { current: !1 }
		);
		ze(() => {
			ht(() => {
				s(this, re) && this.query();
			});
		}),
			(this.query = this.query.bind(this)),
			(this.tracking = this.tracking.bind(this));
	}
	query() {
		ae && O(s(this, ne), s(this, pe).current ? 'light' : 'dark', !0);
	}
	tracking(e) {
		b(this, re, e);
	}
	get current() {
		return E(s(this, ne));
	}
}
(me = new WeakMap()), (re = new WeakMap()), (ne = new WeakMap()), (pe = new WeakMap());
const nt = new zr(),
	Dr = new Lr();
var ve, G, ge, B, ie, ke;
class Wr {
	constructor() {
		d(this, ie);
		d(this, ve, ae ? localStorage : wt);
		d(this, G, s(this, ve).getItem(Ie.current));
		d(this, ge, s(this, G) === null || s(this, G) === void 0 ? '' : s(this, G));
		d(this, B, se(we(A(this, ie, ke).call(this))));
		ze(() =>
			Le.pre(
				() => Ie.current,
				(e, r) => {
					const n = E(s(this, B)).current;
					O(s(this, B), A(this, ie, ke).call(this, n), !0),
						r && localStorage.removeItem(r);
				}
			)
		);
	}
	get current() {
		return E(s(this, B)).current;
	}
	set current(e) {
		E(s(this, B)).current = e;
	}
}
(ve = new WeakMap()),
	(G = new WeakMap()),
	(ge = new WeakMap()),
	(B = new WeakMap()),
	(ie = new WeakSet()),
	(ke = function (e = s(this, ge)) {
		return new gt(Ie.current, e, {
			serializer: {
				serialize: (r) => (typeof r != 'string' ? '' : r),
				deserialize: (r) => r
			}
		});
	});
const Ce = new Wr();
let it,
	st,
	at = !1;
function Et(t) {
	if (typeof document > 'u') return;
	if (!at) {
		(at = !0), t();
		return;
	}
	clearTimeout(it), clearTimeout(st);
	const e = document.createElement('style'),
		r = document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);
	e.appendChild(r);
	const n = () => document.head.appendChild(e),
		o = () => document.head.removeChild(e);
	if (typeof window.getComputedStyle < 'u') {
		n(), t(), window.getComputedStyle(e).opacity, o();
		return;
	}
	if (typeof window.requestAnimationFrame < 'u') {
		n(), t(), window.requestAnimationFrame(o);
		return;
	}
	n(),
		(it = window.setTimeout(() => {
			t(), (st = window.setTimeout(o, 120));
		}, 120));
}
const ue = y(void 0),
	yt = y(!0),
	Br = y([]),
	Fr = y([]);
function Vr() {
	const t = Pe(() => {
		if (!ae) return;
		const e = nt.current === 'system' ? Dr.current : nt.current,
			r = Je(Br.current),
			n = Je(Fr.current);
		function o() {
			const u = document.documentElement,
				a = document.querySelector('meta[name="theme-color"]');
			e === 'light'
				? (r.length && u.classList.remove(...r),
					n.length && u.classList.add(...n),
					(u.style.colorScheme = 'light'),
					a && ue.current && a.setAttribute('content', ue.current.light))
				: (n.length && u.classList.remove(...n),
					r.length && u.classList.add(...r),
					(u.style.colorScheme = 'dark'),
					a && ue.current && a.setAttribute('content', ue.current.dark));
		}
		return yt.current ? Et(o) : o(), e;
	});
	return {
		get current() {
			return E(t);
		}
	};
}
function $r() {
	const t = Pe(() => {
		if ((Ce.current, !ae)) return;
		function e() {
			document.documentElement.setAttribute('data-theme', Ce.current);
		}
		return yt.current ? Et(e) : e(), Ce.current;
	});
	return {
		get current() {
			return E(t);
		}
	};
}
const Ur = Vr(),
	Qr = $r();
export {
	yt as a,
	ue as b,
	Ce as c,
	Br as d,
	Ur as e,
	Qr as f,
	rt as g,
	jr as h,
	Jt as i,
	Xr as j,
	Ke as k,
	Fr as l,
	xe as m,
	Jr as n,
	Kr as p,
	Dr as s,
	Ie as t,
	nt as u
};
