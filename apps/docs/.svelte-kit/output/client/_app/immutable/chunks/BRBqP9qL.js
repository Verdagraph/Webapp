import { i as Oe } from './B1d5rMd0.js';
import { o as Be, c as Ke, a as We } from './C1QID_m_.js';
import { l as Ge, i as se } from './Cz8mIVZI.js';
import {
	W as $e,
	e as Ae,
	f as De,
	g as F,
	v as Fe,
	z as He,
	h as J,
	Z as L,
	V as Le,
	l as Me,
	t as Ne,
	w as Qe,
	j as Re,
	C as U,
	a0 as Ue,
	A as Ve,
	P as b,
	a as ee,
	x as ne,
	Y as oe,
	Q as qe,
	d as te,
	_ as z,
	X as ze
} from './DgmMHYUv.js';
import { g as Ce, t as Ee, f as O, n as Pe, c as X, j as Z } from './HWDk4eir.js';
import { a as re } from './UaJBEsuX.js';

function Ye(e, n, o = !1, s = !1, t = !1) {
	var r = e,
		i = '';
	U(() => {
		var c = Fe;
		if (i === (i = n() ?? '')) {
			J && ee();
			return;
		}
		if (
			(c.nodes_start !== null &&
				(Le(c.nodes_start, c.nodes_end), (c.nodes_start = c.nodes_end = null)),
			i !== '')
		) {
			if (J) {
				te.data;
				for (var l = ee(), a = l; l !== null && (l.nodeType !== 8 || l.data !== ''); )
					(a = l), (l = Ae(l));
				if (l === null) throw (Me(), De);
				X(te, a), (r = Re(l));
				return;
			}
			var f = i + '';
			o ? (f = `<svg>${f}</svg>`) : s && (f = `<math>${f}</math>`);
			var d = Ce(f);
			if (((o || s) && (d = F(d)), X(F(d), d.lastChild), o || s))
				for (; F(d); ) r.before(F(d));
			else r.before(d);
		}
	});
}
const ye = /^[a-z0-9]+(-[a-z0-9]+)*$/,
	R = (e, n, o, s = '') => {
		const t = e.split(':');
		if (e.slice(0, 1) === '@') {
			if (t.length < 2 || t.length > 3) return null;
			s = t.shift().slice(1);
		}
		if (t.length > 3 || !t.length) return null;
		if (t.length > 1) {
			const c = t.pop(),
				l = t.pop(),
				a = { provider: t.length > 0 ? t[0] : s, prefix: l, name: c };
			return n && !A(a) ? null : a;
		}
		const r = t[0],
			i = r.split('-');
		if (i.length > 1) {
			const c = { provider: s, prefix: i.shift(), name: i.join('-') };
			return n && !A(c) ? null : c;
		}
		if (o && s === '') {
			const c = { provider: s, prefix: '', name: r };
			return n && !A(c, o) ? null : c;
		}
		return null;
	},
	A = (e, n) => (e ? !!(((n && e.prefix === '') || e.prefix) && e.name) : !1),
	be = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
	D = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
	N = Object.freeze({ ...be, ...D }),
	H = Object.freeze({ ...N, body: '', hidden: !1 });
function Xe(e, n) {
	const o = {};
	!e.hFlip != !n.hFlip && (o.hFlip = !0), !e.vFlip != !n.vFlip && (o.vFlip = !0);
	const s = ((e.rotate || 0) + (n.rotate || 0)) % 4;
	return s && (o.rotate = s), o;
}
function ie(e, n) {
	const o = Xe(e, n);
	for (const s in H)
		s in D
			? s in e && !(s in o) && (o[s] = D[s])
			: s in n
				? (o[s] = n[s])
				: s in e && (o[s] = e[s]);
	return o;
}
function Ze(e, n) {
	const o = e.icons,
		s = e.aliases || Object.create(null),
		t = Object.create(null);
	function r(i) {
		if (o[i]) return (t[i] = []);
		if (!(i in t)) {
			t[i] = null;
			const c = s[i] && s[i].parent,
				l = c && r(c);
			l && (t[i] = [c].concat(l));
		}
		return t[i];
	}
	return Object.keys(o).concat(Object.keys(s)).forEach(r), t;
}
function Je(e, n, o) {
	const s = e.icons,
		t = e.aliases || Object.create(null);
	let r = {};
	function i(c) {
		r = ie(s[c] || t[c], r);
	}
	return i(n), o.forEach(i), ie(e, r);
}
function ve(e, n) {
	const o = [];
	if (typeof e != 'object' || typeof e.icons != 'object') return o;
	e.not_found instanceof Array &&
		e.not_found.forEach((t) => {
			n(t, null), o.push(t);
		});
	const s = Ze(e);
	for (const t in s) {
		const r = s[t];
		r && (n(t, Je(e, t, r)), o.push(t));
	}
	return o;
}
const et = { provider: '', aliases: {}, not_found: {}, ...be };
function Q(e, n) {
	for (const o in n) if (o in e && typeof e[o] != typeof n[o]) return !1;
	return !0;
}
function xe(e) {
	if (typeof e != 'object' || e === null) return null;
	const n = e;
	if (
		typeof n.prefix != 'string' ||
		!e.icons ||
		typeof e.icons != 'object' ||
		!Q(e, et)
	)
		return null;
	const o = n.icons;
	for (const t in o) {
		const r = o[t];
		if (!t || typeof r.body != 'string' || !Q(r, H)) return null;
	}
	const s = n.aliases || Object.create(null);
	for (const t in s) {
		const r = s[t],
			i = r.parent;
		if (!t || typeof i != 'string' || (!o[i] && !s[i]) || !Q(r, H)) return null;
	}
	return n;
}
const ce = Object.create(null);
function tt(e, n) {
	return { provider: e, prefix: n, icons: Object.create(null), missing: new Set() };
}
function S(e, n) {
	const o = ce[e] || (ce[e] = Object.create(null));
	return o[n] || (o[n] = tt(e, n));
}
function we(e, n) {
	return xe(n)
		? ve(n, (o, s) => {
				s ? (e.icons[o] = s) : e.missing.add(o);
			})
		: [];
}
function nt(e, n, o) {
	try {
		if (typeof o.body == 'string') return (e.icons[n] = { ...o }), !0;
	} catch {}
	return !1;
}
let P = !1;
function Ie(e) {
	return typeof e == 'boolean' && (P = e), P;
}
function ot(e) {
	const n = typeof e == 'string' ? R(e, !0, P) : e;
	if (n) {
		const o = S(n.provider, n.prefix),
			s = n.name;
		return o.icons[s] || (o.missing.has(s) ? null : void 0);
	}
}
function st(e, n) {
	const o = R(e, !0, P);
	if (!o) return !1;
	const s = S(o.provider, o.prefix);
	return n ? nt(s, o.name, n) : (s.missing.add(o.name), !0);
}
function rt(e, n) {
	if (typeof e != 'object') return !1;
	if ((typeof n != 'string' && (n = e.provider || ''), P && !n && !e.prefix)) {
		let t = !1;
		return (
			xe(e) &&
				((e.prefix = ''),
				ve(e, (r, i) => {
					st(r, i) && (t = !0);
				})),
			t
		);
	}
	const o = e.prefix;
	if (!A({ prefix: o, name: 'a' })) return !1;
	const s = S(n, o);
	return !!we(s, e);
}
const ke = Object.freeze({ width: null, height: null }),
	_e = Object.freeze({ ...ke, ...D }),
	it = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
	ct = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function le(e, n, o) {
	if (n === 1) return e;
	if (((o = o || 100), typeof e == 'number')) return Math.ceil(e * n * o) / o;
	if (typeof e != 'string') return e;
	const s = e.split(it);
	if (s === null || !s.length) return e;
	const t = [];
	let r = s.shift(),
		i = ct.test(r);
	for (;;) {
		if (i) {
			const c = parseFloat(r);
			isNaN(c) ? t.push(r) : t.push(Math.ceil(c * n * o) / o);
		} else t.push(r);
		if (((r = s.shift()), r === void 0)) return t.join('');
		i = !i;
	}
}
function lt(e, n = 'defs') {
	let o = '';
	const s = e.indexOf('<' + n);
	for (; s >= 0; ) {
		const t = e.indexOf('>', s),
			r = e.indexOf('</' + n);
		if (t === -1 || r === -1) break;
		const i = e.indexOf('>', r);
		if (i === -1) break;
		(o += e.slice(t + 1, r).trim()), (e = e.slice(0, s).trim() + e.slice(i + 1));
	}
	return { defs: o, content: e };
}
function at(e, n) {
	return e ? '<defs>' + e + '</defs>' + n : n;
}
function ft(e, n, o) {
	const s = lt(e);
	return at(s.defs, n + s.content + o);
}
const ut = (e) => e === 'unset' || e === 'undefined' || e === 'none';
function dt(e, n) {
	const o = { ...N, ...e },
		s = { ..._e, ...n },
		t = { left: o.left, top: o.top, width: o.width, height: o.height };
	let r = o.body;
	[o, s].forEach((I) => {
		const y = [],
			h = I.hFlip,
			u = I.vFlip;
		let v = I.rotate;
		h
			? u
				? (v += 2)
				: (y.push(
						'translate(' +
							(t.width + t.left).toString() +
							' ' +
							(0 - t.top).toString() +
							')'
					),
					y.push('scale(-1 1)'),
					(t.top = t.left = 0))
			: u &&
				(y.push(
					'translate(' +
						(0 - t.left).toString() +
						' ' +
						(t.height + t.top).toString() +
						')'
				),
				y.push('scale(1 -1)'),
				(t.top = t.left = 0));
		let w;
		switch ((v < 0 && (v -= Math.floor(v / 4) * 4), (v = v % 4), v)) {
			case 1:
				(w = t.height / 2 + t.top),
					y.unshift('rotate(90 ' + w.toString() + ' ' + w.toString() + ')');
				break;
			case 2:
				y.unshift(
					'rotate(180 ' +
						(t.width / 2 + t.left).toString() +
						' ' +
						(t.height / 2 + t.top).toString() +
						')'
				);
				break;
			case 3:
				(w = t.width / 2 + t.left),
					y.unshift('rotate(-90 ' + w.toString() + ' ' + w.toString() + ')');
				break;
		}
		v % 2 === 1 &&
			(t.left !== t.top && ((w = t.left), (t.left = t.top), (t.top = w)),
			t.width !== t.height && ((w = t.width), (t.width = t.height), (t.height = w))),
			y.length && (r = ft(r, '<g transform="' + y.join(' ') + '">', '</g>'));
	});
	const i = s.width,
		c = s.height,
		l = t.width,
		a = t.height;
	let f, d;
	i === null
		? ((d = c === null ? '1em' : c === 'auto' ? a : c), (f = le(d, l / a)))
		: ((f = i === 'auto' ? l : i),
			(d = c === null ? le(f, a / l) : c === 'auto' ? a : c));
	const p = {},
		m = (I, y) => {
			ut(y) || (p[I] = y.toString());
		};
	m('width', f), m('height', d);
	const x = [t.left, t.top, l, a];
	return (p.viewBox = x.join(' ')), { attributes: p, viewBox: x, body: r };
}
const pt = /\sid="(\S+)"/g,
	ht =
		'IconifyId' +
		Date.now().toString(16) +
		((Math.random() * 16777216) | 0).toString(16);
let gt = 0;
function mt(e, n = ht) {
	const o = [];
	let s;
	for (; (s = pt.exec(e)); ) o.push(s[1]);
	if (!o.length) return e;
	const t = 'suffix' + ((Math.random() * 16777216) | Date.now()).toString(16);
	return (
		o.forEach((r) => {
			const i = typeof n == 'function' ? n(r) : n + (gt++).toString(),
				c = r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			e = e.replace(
				new RegExp('([#;"])(' + c + ')([")]|\\.[a-z])', 'g'),
				'$1' + i + t + '$3'
			);
		}),
		(e = e.replace(new RegExp(t, 'g'), '')),
		e
	);
}
const V = Object.create(null);
function yt(e, n) {
	V[e] = n;
}
function G(e) {
	return V[e] || V[''];
}
function W(e) {
	let n;
	if (typeof e.resources == 'string') n = [e.resources];
	else if (((n = e.resources), !(n instanceof Array) || !n.length)) return null;
	return {
		resources: n,
		path: e.path || '/',
		maxURL: e.maxURL || 500,
		rotate: e.rotate || 750,
		timeout: e.timeout || 5e3,
		random: e.random === !0,
		index: e.index || 0,
		dataAfterTimeout: e.dataAfterTimeout !== !1
	};
}
const K = Object.create(null),
	j = ['https://api.simplesvg.com', 'https://api.unisvg.com'],
	M = [];
for (; j.length > 0; )
	j.length === 1 || Math.random() > 0.5 ? M.push(j.shift()) : M.push(j.pop());
K[''] = W({ resources: ['https://api.iconify.design'].concat(M) });
function bt(e, n) {
	const o = W(n);
	return o === null ? !1 : ((K[e] = o), !0);
}
function Y(e) {
	return K[e];
}
const vt = () => {
	let e;
	try {
		if (((e = fetch), typeof e == 'function')) return e;
	} catch {}
};
let ae = vt();
function xt(e, n) {
	const o = Y(e);
	if (!o) return 0;
	let s;
	if (!o.maxURL) s = 0;
	else {
		let t = 0;
		o.resources.forEach((i) => {
			t = Math.max(t, i.length);
		});
		const r = n + '.json?icons=';
		s = o.maxURL - t - o.path.length - r.length;
	}
	return s;
}
function wt(e) {
	return e === 404;
}
const It = (e, n, o) => {
	const s = [],
		t = xt(e, n),
		r = 'icons';
	let i = { type: r, provider: e, prefix: n, icons: [] },
		c = 0;
	return (
		o.forEach((l, a) => {
			(c += l.length + 1),
				c >= t &&
					a > 0 &&
					(s.push(i),
					(i = { type: r, provider: e, prefix: n, icons: [] }),
					(c = l.length)),
				i.icons.push(l);
		}),
		s.push(i),
		s
	);
};
function kt(e) {
	if (typeof e == 'string') {
		const n = Y(e);
		if (n) return n.path;
	}
	return '/';
}
const _t = (e, n, o) => {
		if (!ae) {
			o('abort', 424);
			return;
		}
		let s = kt(n.provider);
		switch (n.type) {
			case 'icons': {
				const r = n.prefix,
					c = n.icons.join(','),
					l = new URLSearchParams({ icons: c });
				s += r + '.json?' + l.toString();
				break;
			}
			case 'custom': {
				const r = n.uri;
				s += r.slice(0, 1) === '/' ? r.slice(1) : r;
				break;
			}
			default:
				o('abort', 400);
				return;
		}
		let t = 503;
		ae(e + s)
			.then((r) => {
				const i = r.status;
				if (i !== 200) {
					setTimeout(() => {
						o(wt(i) ? 'abort' : 'next', i);
					});
					return;
				}
				return (t = 501), r.json();
			})
			.then((r) => {
				if (typeof r != 'object' || r === null) {
					setTimeout(() => {
						r === 404 ? o('abort', r) : o('next', t);
					});
					return;
				}
				setTimeout(() => {
					o('success', r);
				});
			})
			.catch(() => {
				o('next', t);
			});
	},
	St = { prepare: It, send: _t };
function Tt(e) {
	const n = { loaded: [], missing: [], pending: [] },
		o = Object.create(null);
	e.sort((t, r) =>
		t.provider !== r.provider
			? t.provider.localeCompare(r.provider)
			: t.prefix !== r.prefix
				? t.prefix.localeCompare(r.prefix)
				: t.name.localeCompare(r.name)
	);
	let s = { provider: '', prefix: '', name: '' };
	return (
		e.forEach((t) => {
			if (s.name === t.name && s.prefix === t.prefix && s.provider === t.provider)
				return;
			s = t;
			const r = t.provider,
				i = t.prefix,
				c = t.name,
				l = o[r] || (o[r] = Object.create(null)),
				a = l[i] || (l[i] = S(r, i));
			let f;
			c in a.icons
				? (f = n.loaded)
				: i === '' || a.missing.has(c)
					? (f = n.missing)
					: (f = n.pending);
			const d = { provider: r, prefix: i, name: c };
			f.push(d);
		}),
		n
	);
}
function Se(e, n) {
	e.forEach((o) => {
		const s = o.loaderCallbacks;
		s && (o.loaderCallbacks = s.filter((t) => t.id !== n));
	});
}
function jt(e) {
	e.pendingCallbacksFlag ||
		((e.pendingCallbacksFlag = !0),
		setTimeout(() => {
			e.pendingCallbacksFlag = !1;
			const n = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
			if (!n.length) return;
			let o = !1;
			const s = e.provider,
				t = e.prefix;
			n.forEach((r) => {
				const i = r.icons,
					c = i.pending.length;
				(i.pending = i.pending.filter((l) => {
					if (l.prefix !== t) return !0;
					const a = l.name;
					if (e.icons[a]) i.loaded.push({ provider: s, prefix: t, name: a });
					else if (e.missing.has(a))
						i.missing.push({ provider: s, prefix: t, name: a });
					else return (o = !0), !0;
					return !1;
				})),
					i.pending.length !== c &&
						(o || Se([e], r.id),
						r.callback(
							i.loaded.slice(0),
							i.missing.slice(0),
							i.pending.slice(0),
							r.abort
						));
			});
		}));
}
let Ct = 0;
function Pt(e, n, o) {
	const s = Ct++,
		t = Se.bind(null, o, s);
	if (!n.pending.length) return t;
	const r = { id: s, icons: n, callback: e, abort: t };
	return (
		o.forEach((i) => {
			(i.loaderCallbacks || (i.loaderCallbacks = [])).push(r);
		}),
		t
	);
}
function Et(e, n = !0, o = !1) {
	const s = [];
	return (
		e.forEach((t) => {
			const r = typeof t == 'string' ? R(t, n, o) : t;
			r && s.push(r);
		}),
		s
	);
}
var Ot = {
	resources: [],
	index: 0,
	timeout: 2e3,
	rotate: 750,
	random: !1,
	dataAfterTimeout: !1
};
function Ft(e, n, o, s) {
	const t = e.resources.length,
		r = e.random ? Math.floor(Math.random() * t) : e.index;
	let i;
	if (e.random) {
		let g = e.resources.slice(0);
		for (i = []; g.length > 1; ) {
			const k = Math.floor(Math.random() * g.length);
			i.push(g[k]), (g = g.slice(0, k).concat(g.slice(k + 1)));
		}
		i = i.concat(g);
	} else i = e.resources.slice(r).concat(e.resources.slice(0, r));
	const c = Date.now();
	let l = 'pending',
		a = 0,
		f,
		d = null,
		p = [],
		m = [];
	typeof s == 'function' && m.push(s);
	function x() {
		d && (clearTimeout(d), (d = null));
	}
	function I() {
		l === 'pending' && (l = 'aborted'),
			x(),
			p.forEach((g) => {
				g.status === 'pending' && (g.status = 'aborted');
			}),
			(p = []);
	}
	function y(g, k) {
		k && (m = []), typeof g == 'function' && m.push(g);
	}
	function h() {
		return {
			startTime: c,
			payload: n,
			status: l,
			queriesSent: a,
			queriesPending: p.length,
			subscribe: y,
			abort: I
		};
	}
	function u() {
		(l = 'failed'),
			m.forEach((g) => {
				g(void 0, f);
			});
	}
	function v() {
		p.forEach((g) => {
			g.status === 'pending' && (g.status = 'aborted');
		}),
			(p = []);
	}
	function w(g, k, T) {
		const E = k !== 'success';
		switch (((p = p.filter((_) => _ !== g)), l)) {
			case 'pending':
				break;
			case 'failed':
				if (E || !e.dataAfterTimeout) return;
				break;
			default:
				return;
		}
		if (k === 'abort') {
			(f = T), u();
			return;
		}
		if (E) {
			(f = T), p.length || (i.length ? $() : u());
			return;
		}
		if ((x(), v(), !e.random)) {
			const _ = e.resources.indexOf(g.resource);
			_ !== -1 && _ !== e.index && (e.index = _);
		}
		(l = 'completed'),
			m.forEach((_) => {
				_(T);
			});
	}
	function $() {
		if (l !== 'pending') return;
		x();
		const g = i.shift();
		if (g === void 0) {
			if (p.length) {
				d = setTimeout(() => {
					x(), l === 'pending' && (v(), u());
				}, e.timeout);
				return;
			}
			u();
			return;
		}
		const k = {
			status: 'pending',
			resource: g,
			callback: (T, E) => {
				w(k, T, E);
			}
		};
		p.push(k), a++, (d = setTimeout($, e.rotate)), o(g, n, k.callback);
	}
	return setTimeout($), h;
}
function Te(e) {
	const n = { ...Ot, ...e };
	let o = [];
	function s() {
		o = o.filter((c) => c().status === 'pending');
	}
	function t(c, l, a) {
		const f = Ft(n, c, l, (d, p) => {
			s(), a && a(d, p);
		});
		return o.push(f), f;
	}
	function r(c) {
		return o.find((l) => c(l)) || null;
	}
	return {
		query: t,
		find: r,
		setIndex: (c) => {
			n.index = c;
		},
		getIndex: () => n.index,
		cleanup: s
	};
}
function fe() {}
const q = Object.create(null);
function Lt(e) {
	if (!q[e]) {
		const n = Y(e);
		if (!n) return;
		const o = Te(n),
			s = { config: n, redundancy: o };
		q[e] = s;
	}
	return q[e];
}
function At(e, n, o) {
	let s, t;
	if (typeof e == 'string') {
		const r = G(e);
		if (!r) return o(void 0, 424), fe;
		t = r.send;
		const i = Lt(e);
		i && (s = i.redundancy);
	} else {
		const r = W(e);
		if (r) {
			s = Te(r);
			const i = e.resources ? e.resources[0] : '',
				c = G(i);
			c && (t = c.send);
		}
	}
	return !s || !t ? (o(void 0, 424), fe) : s.query(n, t, o)().abort;
}
function ue() {}
function Mt(e) {
	e.iconsLoaderFlag ||
		((e.iconsLoaderFlag = !0),
		setTimeout(() => {
			(e.iconsLoaderFlag = !1), jt(e);
		}));
}
function Dt(e) {
	const n = [],
		o = [];
	return (
		e.forEach((s) => {
			(s.match(ye) ? n : o).push(s);
		}),
		{ valid: n, invalid: o }
	);
}
function C(e, n, o) {
	function s() {
		const t = e.pendingIcons;
		n.forEach((r) => {
			t && t.delete(r), e.icons[r] || e.missing.add(r);
		});
	}
	if (o && typeof o == 'object')
		try {
			if (!we(e, o).length) {
				s();
				return;
			}
		} catch (t) {
			console.error(t);
		}
	s(), Mt(e);
}
function de(e, n) {
	e instanceof Promise
		? e
				.then((o) => {
					n(o);
				})
				.catch(() => {
					n(null);
				})
		: n(e);
}
function Rt(e, n) {
	e.iconsToLoad
		? (e.iconsToLoad = e.iconsToLoad.concat(n).sort())
		: (e.iconsToLoad = n),
		e.iconsQueueFlag ||
			((e.iconsQueueFlag = !0),
			setTimeout(() => {
				e.iconsQueueFlag = !1;
				const { provider: o, prefix: s } = e,
					t = e.iconsToLoad;
				if ((delete e.iconsToLoad, !t || !t.length)) return;
				const r = e.loadIcon;
				if (e.loadIcons && (t.length > 1 || !r)) {
					de(e.loadIcons(t, s, o), (f) => {
						C(e, t, f);
					});
					return;
				}
				if (r) {
					t.forEach((f) => {
						const d = r(f, s, o);
						de(d, (p) => {
							const m = p ? { prefix: s, icons: { [f]: p } } : null;
							C(e, [f], m);
						});
					});
					return;
				}
				const { valid: i, invalid: c } = Dt(t);
				if ((c.length && C(e, c, null), !i.length)) return;
				const l = s.match(ye) ? G(o) : null;
				if (!l) {
					C(e, i, null);
					return;
				}
				l.prepare(o, s, i).forEach((f) => {
					At(o, f, (d) => {
						C(e, f.icons, d);
					});
				});
			}));
}
const Nt = (e, n) => {
	const o = Et(e, !0, Ie()),
		s = Tt(o);
	if (!s.pending.length) {
		let l = !0;
		return (
			n &&
				setTimeout(() => {
					l && n(s.loaded, s.missing, s.pending, ue);
				}),
			() => {
				l = !1;
			}
		);
	}
	const t = Object.create(null),
		r = [];
	let i, c;
	return (
		s.pending.forEach((l) => {
			const { provider: a, prefix: f } = l;
			if (f === c && a === i) return;
			(i = a), (c = f), r.push(S(a, f));
			const d = t[a] || (t[a] = Object.create(null));
			d[f] || (d[f] = []);
		}),
		s.pending.forEach((l) => {
			const { provider: a, prefix: f, name: d } = l,
				p = S(a, f),
				m = p.pendingIcons || (p.pendingIcons = new Set());
			m.has(d) || (m.add(d), t[a][f].push(d));
		}),
		r.forEach((l) => {
			const a = t[l.provider][l.prefix];
			a.length && Rt(l, a);
		}),
		n ? Pt(n, s, r) : ue
	);
};
function $t(e, n) {
	const o = { ...e };
	for (const s in n) {
		const t = n[s],
			r = typeof t;
		s in ke
			? (t === null || (t && (r === 'string' || r === 'number'))) && (o[s] = t)
			: r === typeof o[s] && (o[s] = s === 'rotate' ? t % 4 : t);
	}
	return o;
}
const zt = /[\s,]+/;
function Qt(e, n) {
	n.split(zt).forEach((o) => {
		switch (o.trim()) {
			case 'horizontal':
				e.hFlip = !0;
				break;
			case 'vertical':
				e.vFlip = !0;
				break;
		}
	});
}
function qt(e, n = 0) {
	const o = e.replace(/^-?[0-9.]*/, '');
	function s(t) {
		for (; t < 0; ) t += 4;
		return t % 4;
	}
	if (o === '') {
		const t = parseInt(e);
		return isNaN(t) ? 0 : s(t);
	} else if (o !== e) {
		let t = 0;
		switch (o) {
			case '%':
				t = 25;
				break;
			case 'deg':
				t = 90;
		}
		if (t) {
			let r = parseFloat(e.slice(0, e.length - o.length));
			return isNaN(r) ? 0 : ((r = r / t), r % 1 === 0 ? s(r) : 0);
		}
	}
	return n;
}
function Ut(e, n) {
	let o =
		e.indexOf('xlink:') === -1 ? '' : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
	for (const s in n) o += ' ' + s + '="' + n[s] + '"';
	return '<svg xmlns="http://www.w3.org/2000/svg"' + o + '>' + e + '</svg>';
}
function Ht(e) {
	return e
		.replace(/"/g, "'")
		.replace(/%/g, '%25')
		.replace(/#/g, '%23')
		.replace(/</g, '%3C')
		.replace(/>/g, '%3E')
		.replace(/\s+/g, ' ');
}
function Vt(e) {
	return 'data:image/svg+xml,' + Ht(e);
}
function Gt(e) {
	return 'url("' + Vt(e) + '")';
}
const pe = { ..._e, inline: !1 },
	Bt = {
		xmlns: 'http://www.w3.org/2000/svg',
		'xmlns:xlink': 'http://www.w3.org/1999/xlink',
		'aria-hidden': !0,
		role: 'img'
	},
	Wt = { display: 'inline-block' },
	B = { 'background-color': 'currentColor' },
	je = { 'background-color': 'transparent' },
	he = { image: 'var(--svg)', repeat: 'no-repeat', size: '100% 100%' },
	ge = { '-webkit-mask': B, mask: B, background: je };
for (const e in ge) {
	const n = ge[e];
	for (const o in he) n[e + '-' + o] = he[o];
}
function Kt(e) {
	return e + (e.match(/^[-0-9.]+$/) ? 'px' : '');
}
function Yt(e, n) {
	const o = $t(pe, n),
		s = n.mode || 'svg',
		t = s === 'svg' ? { ...Bt } : {};
	e.body.indexOf('xlink:') === -1 && delete t['xmlns:xlink'];
	let r = typeof n.style == 'string' ? n.style : '';
	for (let h in n) {
		const u = n[h];
		if (u !== void 0)
			switch (h) {
				case 'icon':
				case 'style':
				case 'onLoad':
				case 'mode':
				case 'ssr':
					break;
				case 'inline':
				case 'hFlip':
				case 'vFlip':
					o[h] = u === !0 || u === 'true' || u === 1;
					break;
				case 'flip':
					typeof u == 'string' && Qt(o, u);
					break;
				case 'color':
					r =
						r +
						(r.length > 0 && r.trim().slice(-1) !== ';' ? ';' : '') +
						'color: ' +
						u +
						'; ';
					break;
				case 'rotate':
					typeof u == 'string' ? (o[h] = qt(u)) : typeof u == 'number' && (o[h] = u);
					break;
				case 'ariaHidden':
				case 'aria-hidden':
					u !== !0 && u !== 'true' && delete t['aria-hidden'];
					break;
				default:
					if (h.slice(0, 3) === 'on:') break;
					pe[h] === void 0 && (t[h] = u);
			}
	}
	const i = dt(e, o),
		c = i.attributes;
	if ((o.inline && (r = 'vertical-align: -0.125em; ' + r), s === 'svg')) {
		Object.assign(t, c), r !== '' && (t.style = r);
		let h = 0,
			u = n.id;
		return (
			typeof u == 'string' && (u = u.replace(/-/g, '_')),
			{
				svg: !0,
				attributes: t,
				body: mt(i.body, u ? () => u + 'ID' + h++ : 'iconifySvelte')
			}
		);
	}
	const { body: l, width: a, height: f } = e,
		d = s === 'mask' || (s === 'bg' ? !1 : l.indexOf('currentColor') !== -1),
		p = Ut(l, { ...c, width: a + '', height: f + '' }),
		x = { '--svg': Gt(p) },
		I = (h) => {
			const u = c[h];
			u && (x[h] = Kt(u));
		};
	I('width'), I('height'), Object.assign(x, Wt, d ? B : je);
	let y = '';
	for (const h in x) y += h + ': ' + x[h] + ';';
	return (t.style = y + r), { svg: !1, attributes: t };
}
Ie(!0);
yt('', St);
if (typeof document < 'u' && typeof window < 'u') {
	const e = window;
	if (e.IconifyPreload !== void 0) {
		const n = e.IconifyPreload,
			o = 'Invalid IconifyPreload syntax.';
		typeof n == 'object' &&
			n !== null &&
			(n instanceof Array ? n : [n]).forEach((s) => {
				try {
					(typeof s != 'object' ||
						s === null ||
						s instanceof Array ||
						typeof s.icons != 'object' ||
						typeof s.prefix != 'string' ||
						!rt(s)) &&
						console.error(o);
				} catch {
					console.error(o);
				}
			});
	}
	if (e.IconifyProviders !== void 0) {
		const n = e.IconifyProviders;
		if (typeof n == 'object' && n !== null)
			for (let o in n) {
				const s = 'IconifyProviders[' + o + '] is invalid.';
				try {
					const t = n[o];
					if (typeof t != 'object' || !t || t.resources === void 0) continue;
					bt(o, t) || console.error(s);
				} catch {
					console.error(s);
				}
			}
	}
}
function Xt(e, n, o, s, t) {
	function r() {
		n.loading && (n.loading.abort(), (n.loading = null));
	}
	if (typeof e == 'object' && e !== null && typeof e.body == 'string')
		return (n.name = ''), r(), { data: { ...N, ...e } };
	let i;
	if (typeof e != 'string' || (i = R(e, !1, !0)) === null) return r(), null;
	const c = ot(i);
	if (!c)
		return (
			o &&
				(!n.loading || n.loading.name !== e) &&
				(r(), (n.name = ''), (n.loading = { name: e, abort: Nt([i], s) })),
			null
		);
	r(), n.name !== e && ((n.name = e), t && !n.destroyed && t(e));
	const l = ['iconify'];
	return (
		i.prefix !== '' && l.push('iconify--' + i.prefix),
		i.provider !== '' && l.push('iconify--' + i.provider),
		{ data: c, classes: l }
	);
}
function me(e, n) {
	return e ? Yt({ ...N, ...e }, n) : null;
}
var Zt = Pe('<svg><!></svg>'),
	Jt = Ee('<span></span>');
function cn(e, n) {
	const o = Ge(n, ['children', '$$slots', '$$events', '$$legacy']);
	Ne(n, !1);
	const s = L({ name: '', loading: null, destroyed: !1 });
	let t = L(!1),
		r = L(0),
		i = L();
	const c = (p) => {
		typeof o.onLoad == 'function' && o.onLoad(p), Ke()('load', { icon: p });
	};
	function l() {
		Ue(r);
	}
	Be(() => {
		oe(t, !0);
	}),
		We(() => {
			z(s, (b(s).destroyed = !0)),
				b(s).loading && (b(s).loading.abort(), z(s, (b(s).loading = null)));
		}),
		$e(
			() => (b(r), qe(o), b(t), b(s), b(i), me),
			() => {
				b(r);
				const p = !!o.ssr || b(t),
					m = Xt(o.icon, b(s), p, l, c);
				oe(i, m ? me(m.data, o) : null),
					b(i) &&
						m.classes &&
						z(
							i,
							(b(i).attributes.class =
								(typeof o.class == 'string' ? o.class + ' ' : '') + m.classes.join(' '))
						);
			}
		),
		ze(),
		Oe();
	var a = Z(),
		f = ne(a);
	{
		var d = (p) => {
			var m = Z(),
				x = ne(m);
			{
				var I = (h) => {
						var u = Zt();
						let v;
						var w = He(u);
						Ye(w, () => b(i).body, !0),
							Ve(u),
							U(() => (v = re(u, v, { ...b(i).attributes }))),
							O(h, u);
					},
					y = (h) => {
						var u = Jt();
						let v;
						U(() => (v = re(u, v, { ...b(i).attributes }))), O(h, u);
					};
				se(x, (h) => {
					b(i).svg ? h(I) : h(y, !1);
				});
			}
			O(p, m);
		};
		se(f, (p) => {
			b(i) && p(d);
		});
	}
	O(e, a), Qe();
}
export { cn as I, Ye as h };
