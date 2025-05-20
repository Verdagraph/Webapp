import {
	H as $,
	h as A,
	a0 as B,
	S as C,
	E as F,
	ae as G,
	a4 as J,
	I as K,
	s as L,
	b as M,
	a3 as N,
	a5 as O,
	ai as P,
	d as Q,
	a2 as V,
	a6 as W,
	a7 as X,
	c as Y,
	a as Z,
	ac as ae,
	aa as ee,
	ah as fe,
	ad as ie,
	a9 as j,
	a8 as k,
	ag as le,
	Z as ne,
	p as q,
	ab as re,
	Y as se,
	af as te,
	G as ue,
	P as v,
	T as x,
	j as y,
	a1 as z
} from './DgmMHYUv.js';

function be(e, r, [n, s] = [0, 0]) {
	A && n === 0 && Z();
	var a = e,
		u = null,
		t = null,
		d = J,
		I = n > 0 ? F : 0,
		f = !1;
	const m = (l, c = !0) => {
			(f = !0), _(c, l);
		},
		_ = (l, c) => {
			if (d === (d = l)) return;
			let b = !1;
			if (A && s !== -1) {
				if (n === 0) {
					const o = a.data;
					o === $
						? (s = 0)
						: o === z
							? (s = 1 / 0)
							: ((s = parseInt(o.substring(1))), s !== s && (s = d ? 1 / 0 : -1));
				}
				const S = s > n;
				!!d === S && ((a = V()), y(a), L(!1), (b = !0), (s = -1));
			}
			d
				? (u ? N(u) : c && (u = Y(() => c(a))),
					t &&
						q(t, () => {
							t = null;
						}))
				: (t ? N(t) : c && (t = Y(() => c(a, [n + 1, s]))),
					u &&
						q(u, () => {
							u = null;
						})),
				b && L(!0);
		};
	M(() => {
		(f = !1), r(m), f || _(null, null);
	}, I),
		A && (a = Q);
}
let R = !1;
function ce(e) {
	var r = R;
	try {
		return (R = !1), [e(), R];
	} finally {
		R = r;
	}
}
const oe = {
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
function he(e, r, n) {
	return new Proxy({ props: e, exclude: r }, oe);
}
const pe = {
	get(e, r) {
		if (!e.exclude.includes(r))
			return v(e.version), r in e.special ? e.special[r]() : e.props[r];
	},
	set(e, r, n) {
		return (
			r in e.special ||
				(e.special[r] = de(
					{
						get [r]() {
							return e.props[r];
						}
					},
					r,
					j
				)),
			e.special[r](n),
			B(e.version),
			!0
		);
	},
	getOwnPropertyDescriptor(e, r) {
		if (!e.exclude.includes(r) && r in e.props)
			return { enumerable: !0, configurable: !0, value: e.props[r] };
	},
	deleteProperty(e, r) {
		return e.exclude.includes(r) || (e.exclude.push(r), B(e.version)), !0;
	},
	has(e, r) {
		return e.exclude.includes(r) ? !1 : r in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((r) => !e.exclude.includes(r));
	}
};
function Pe(e, r) {
	return new Proxy({ props: e, exclude: r, special: {}, version: ae(0) }, pe);
}
const _e = {
	get(e, r) {
		let n = e.props.length;
		for (; n--; ) {
			let s = e.props[n];
			if ((P(s) && (s = s()), typeof s == 'object' && s !== null && r in s))
				return s[r];
		}
	},
	set(e, r, n) {
		let s = e.props.length;
		for (; s--; ) {
			let a = e.props[s];
			P(a) && (a = a());
			const u = O(a, r);
			if (u && u.set) return u.set(n), !0;
		}
		return !1;
	},
	getOwnPropertyDescriptor(e, r) {
		let n = e.props.length;
		for (; n--; ) {
			let s = e.props[n];
			if ((P(s) && (s = s()), typeof s == 'object' && s !== null && r in s)) {
				const a = O(s, r);
				return a && !a.configurable && (a.configurable = !0), a;
			}
		}
	},
	has(e, r) {
		if (r === C || r === G) return !1;
		for (let n of e.props) if ((P(n) && (n = n()), n != null && r in n)) return !0;
		return !1;
	},
	ownKeys(e) {
		const r = [];
		for (let n of e.props) {
			P(n) && (n = n());
			for (const s in n) r.includes(s) || r.push(s);
		}
		return r;
	}
};
function Ie(...e) {
	return new Proxy({ props: e }, _e);
}
function U(e) {
	var r;
	return ((r = e.ctx) == null ? void 0 : r.d) ?? !1;
}
function de(e, r, n, s) {
	var g;
	var a = (n & le) !== 0,
		u = !ue || (n & te) !== 0,
		t = (n & ie) !== 0,
		d = (n & fe) !== 0,
		I = !1,
		f;
	t ? ([f, I] = ce(() => e[r])) : (f = e[r]);
	var m = C in e || G in e,
		_ =
			(t &&
				(((g = O(e, r)) == null ? void 0 : g.set) ??
					(m && r in e && ((i) => (e[r] = i))))) ||
			void 0,
		l = s,
		c = !0,
		b = !1,
		S = () => ((b = !0), c && ((c = !1), d ? (l = K(s)) : (l = s)), l);
	f === void 0 && s !== void 0 && (_ && u && W(), (f = S()), _ && _(f));
	var o;
	if (u)
		o = () => {
			var i = e[r];
			return i === void 0 ? S() : ((c = !0), (b = !1), i);
		};
	else {
		var D = (a ? x : k)(() => e[r]);
		(D.f |= X),
			(o = () => {
				var i = v(D);
				return i !== void 0 && (l = void 0), i === void 0 ? l : i;
			});
	}
	if (!(n & j)) return o;
	if (_) {
		var H = e.$$legacy;
		return function (i, h) {
			return arguments.length > 0 ? ((!u || !h || H || I) && _(h ? o() : i), i) : o();
		};
	}
	var E = !1,
		T = ne(f),
		p = x(() => {
			var i = o(),
				h = v(T);
			return E ? ((E = !1), h) : (T.v = i);
		});
	return (
		t && v(p),
		a || (p.equals = ee),
		function (i, h) {
			if (arguments.length > 0) {
				const w = h ? v(p) : u && t ? re(i) : i;
				if (!p.equals(w)) {
					if (((E = !0), se(T, w), b && l !== void 0 && (l = w), U(p))) return i;
					K(() => v(p));
				}
				return i;
			}
			return U(p) ? p.v : v(p);
		}
	);
}
export { be as i, Pe as l, de as p, he as r, Ie as s };
