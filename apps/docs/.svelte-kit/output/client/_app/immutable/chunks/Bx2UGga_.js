import {
	S as $,
	r as A,
	C as B,
	ad as C,
	J as F,
	Z as G,
	_ as H,
	H as J,
	L as K,
	s as L,
	a0 as O,
	c as Q,
	U,
	h as V,
	R as W,
	T as X,
	o as Y,
	a4 as Z,
	ae as _e,
	a5 as ae,
	aa as ce,
	E as d,
	d as ee,
	a8 as fe,
	af as h,
	a3 as ie,
	a9 as j,
	V as k,
	a6 as le,
	X as ne,
	ab as oe,
	ac as pe,
	Y as q,
	W as re,
	a1 as se,
	a7 as te,
	a2 as ue,
	G as x,
	K as z
} from './BvF3OQQc.js';
import { s as de, g as ve } from './CHDAeHIy.js';

function Te(e, r, [s, n] = [0, 0]) {
	A && s === 0 && V();
	var u = e,
		i = null,
		l = null,
		v = k,
		I = s > 0 ? z : 0,
		f = !1;
	const E = (t, c = !0) => {
			(f = !0), _(c, t);
		},
		_ = (t, c) => {
			if (v === (v = t)) return;
			let b = !1;
			if (A && n !== -1) {
				if (s === 0) {
					const o = u.data;
					o === J
						? (n = 0)
						: o === W
							? (n = 1 / 0)
							: ((n = parseInt(o.substring(1))), n !== n && (n = v ? 1 / 0 : -1));
				}
				const S = n > s;
				!!v === S && ((u = X()), Q(u), L(!1), (b = !0), (n = -1));
			}
			v
				? (i ? U(i) : c && (i = Y(() => c(u))),
					l &&
						K(l, () => {
							l = null;
						}))
				: (l ? U(l) : c && (l = Y(() => c(u, [s + 1, n]))),
					i &&
						K(i, () => {
							i = null;
						})),
				b && L(!0);
		};
	F(() => {
		(f = !1), r(E), f || _(null, null);
	}, I),
		A && (u = ee);
}
let R = !1,
	D = Symbol();
function me(e, r, s) {
	const n = s[r] ?? (s[r] = { store: null, source: G(void 0), unsubscribe: q });
	if (n.store !== e && !(D in s))
		if ((n.unsubscribe(), (n.store = e ?? null), e == null))
			(n.source.v = void 0), (n.unsubscribe = q);
		else {
			var u = !0;
			(n.unsubscribe = de(e, (i) => {
				u ? (n.source.v = i) : H(n.source, i);
			})),
				(u = !1);
		}
	return e && D in s ? ve(e) : d(n.source);
}
function we() {
	const e = {};
	function r() {
		re(() => {
			for (var s in e) e[s].unsubscribe();
			ne(e, D, { enumerable: !1, value: !0 });
		});
	}
	return [e, r];
}
function be(e) {
	var r = R;
	try {
		return (R = !1), [e(), R];
	} finally {
		R = r;
	}
}
const Pe = {
	get(e, r) {
		if (!e.exclude.includes(r)) return e.props[r];
	},
	set(e, r) {
		return !1;
	},
	getOwnPropertyDescriptor(e, r) {
		if (!e.exclude.includes(r) && r in e.props)
			return { enumerable: !0, configurable: !0, value: e.props[r] };
	},
	has(e, r) {
		return e.exclude.includes(r) ? !1 : r in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((r) => !e.exclude.includes(r));
	}
};
function Ae(e, r, s) {
	return new Proxy({ props: e, exclude: r }, Pe);
}
const he = {
	get(e, r) {
		if (!e.exclude.includes(r))
			return d(e.version), r in e.special ? e.special[r]() : e.props[r];
	},
	set(e, r, s) {
		return (
			r in e.special ||
				(e.special[r] = Se(
					{
						get [r]() {
							return e.props[r];
						}
					},
					r,
					Z
				)),
			e.special[r](s),
			C(e.version),
			!0
		);
	},
	getOwnPropertyDescriptor(e, r) {
		if (!e.exclude.includes(r) && r in e.props)
			return { enumerable: !0, configurable: !0, value: e.props[r] };
	},
	deleteProperty(e, r) {
		return e.exclude.includes(r) || (e.exclude.push(r), C(e.version)), !0;
	},
	has(e, r) {
		return e.exclude.includes(r) ? !1 : r in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((r) => !e.exclude.includes(r));
	}
};
function Oe(e, r) {
	return new Proxy({ props: e, exclude: r, special: {}, version: te(0) }, he);
}
const Ie = {
	get(e, r) {
		let s = e.props.length;
		for (; s--; ) {
			let n = e.props[s];
			if ((h(n) && (n = n()), typeof n == 'object' && n !== null && r in n))
				return n[r];
		}
	},
	set(e, r, s) {
		let n = e.props.length;
		for (; n--; ) {
			let u = e.props[n];
			h(u) && (u = u());
			const i = O(u, r);
			if (i && i.set) return i.set(s), !0;
		}
		return !1;
	},
	getOwnPropertyDescriptor(e, r) {
		let s = e.props.length;
		for (; s--; ) {
			let n = e.props[s];
			if ((h(n) && (n = n()), typeof n == 'object' && n !== null && r in n)) {
				const u = O(n, r);
				return u && !u.configurable && (u.configurable = !0), u;
			}
		}
	},
	has(e, r) {
		if (r === $ || r === j) return !1;
		for (let s of e.props) if ((h(s) && (s = s()), s != null && r in s)) return !0;
		return !1;
	},
	ownKeys(e) {
		const r = [];
		for (let s of e.props) {
			h(s) && (s = s());
			for (const n in s) r.includes(n) || r.push(n);
		}
		return r;
	}
};
function De(...e) {
	return new Proxy({ props: e }, Ie);
}
function M(e) {
	var r;
	return ((r = e.ctx) == null ? void 0 : r.d) ?? !1;
}
function Se(e, r, s, n) {
	var N;
	var u = (s & pe) !== 0,
		i = !ce || (s & oe) !== 0,
		l = (s & fe) !== 0,
		v = (s & _e) !== 0,
		I = !1,
		f;
	l ? ([f, I] = be(() => e[r])) : (f = e[r]);
	var E = $ in e || j in e,
		_ =
			(l &&
				(((N = O(e, r)) == null ? void 0 : N.set) ??
					(E && r in e && ((a) => (e[r] = a))))) ||
			void 0,
		t = n,
		c = !0,
		b = !1,
		S = () => ((b = !0), c && ((c = !1), v ? (t = B(n)) : (t = n)), t);
	f === void 0 && n !== void 0 && (_ && i && se(), (f = S()), _ && _(f));
	var o;
	if (i)
		o = () => {
			var a = e[r];
			return a === void 0 ? S() : ((c = !0), (b = !1), a);
		};
	else {
		var g = (u ? x : ie)(() => e[r]);
		(g.f |= ue),
			(o = () => {
				var a = d(g);
				return a !== void 0 && (t = void 0), a === void 0 ? t : a;
			});
	}
	if (!(s & Z)) return o;
	if (_) {
		var y = e.$$legacy;
		return function (a, P) {
			return arguments.length > 0 ? ((!i || !P || y || I) && _(P ? o() : a), a) : o();
		};
	}
	var T = !1,
		m = G(f),
		p = x(() => {
			var a = o(),
				P = d(m);
			return T ? ((T = !1), P) : (m.v = a);
		});
	return (
		l && d(p),
		u || (p.equals = ae),
		function (a, P) {
			if (arguments.length > 0) {
				const w = P ? d(p) : i && l ? le(a) : a;
				if (!p.equals(w)) {
					if (((T = !0), H(m, w), b && t !== void 0 && (t = w), M(p))) return a;
					B(() => d(p));
				}
				return a;
			}
			return M(p) ? p.v : d(p);
		}
	);
}
export { me as a, De as b, Te as i, Oe as l, Se as p, Ae as r, we as s };
