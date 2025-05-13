import {
	r as A,
	t as Bt,
	au as Gt,
	av as Jt,
	Q as K,
	a as Kt,
	g as M,
	Z as R,
	O as Vt,
	b as Wt,
	aw as Xt,
	f as Yt,
	c as Zt,
	ad as ce,
	P as ct,
	ay as ee,
	v as fe,
	_ as ft,
	aA as ie,
	h as it,
	E as k,
	x as le,
	p as ne,
	u as oe,
	d as ot,
	aB as q,
	az as re,
	F as se,
	s as st,
	ax as te
} from './BvF3OQQc.js';
import { l as ae, i as lt } from './Bx2UGga_.js';
import './CC_UwoEl.js';
import { o as be, a as ve, c as ye } from './CHDAeHIy.js';
import { t as Ht, b as N, e as Qt, a as nt, n as qt, c as rt } from './CNAEEddD.js';
import { c as de, e as ge, d as he, n as pe, b as ue } from './DYloJB2f.js';
import { i as me } from './EIGlRJae.js';

function we(t, n) {
	if (n) {
		const e = document.body;
		(t.autofocus = !0),
			Vt(() => {
				document.activeElement === e && t.focus();
			});
	}
}
function Ie(t, n, e = !1, i = !1, r = !1) {
	var o = t,
		s = '';
	K(() => {
		var c = Bt;
		if (s === (s = n() ?? '')) {
			A && it();
			return;
		}
		if (
			(c.nodes_start !== null &&
				(Gt(c.nodes_start, c.nodes_end), (c.nodes_start = c.nodes_end = null)),
			s !== '')
		) {
			if (A) {
				ot.data;
				for (var f = it(), l = f; f !== null && (f.nodeType !== 8 || f.data !== ''); )
					(l = f), (f = Kt(f));
				if (f === null) throw (Yt(), Wt);
				nt(ot, l), (o = Zt(f));
				return;
			}
			var a = s + '';
			e ? (a = `<svg>${a}</svg>`) : i && (a = `<math>${a}</math>`);
			var u = Qt(a);
			if (((e || i) && (u = M(u)), nt(M(u), u.lastChild), e || i))
				for (; M(u); ) o.before(M(u));
			else o.before(u);
		}
	});
}
function Tt(t) {
	var n,
		e,
		i = '';
	if (typeof t == 'string' || typeof t == 'number') i += t;
	else if (typeof t == 'object')
		if (Array.isArray(t)) {
			var r = t.length;
			for (n = 0; n < r; n++) t[n] && (e = Tt(t[n])) && (i && (i += ' '), (i += e));
		} else for (e in t) t[e] && (i && (i += ' '), (i += e));
	return i;
}
function Se() {
	for (var t, n, e = 0, i = '', r = arguments.length; e < r; e++)
		(t = arguments[e]) && (n = Tt(t)) && (i && (i += ' '), (i += n));
	return i;
}
function ke(t) {
	return typeof t == 'object' ? Se(t) : (t ?? '');
}
const at = [
	...` 	
\r\f \v\uFEFF`
];
function xe(t, n, e) {
	var i = t == null ? '' : '' + t;
	if (e) {
		for (var r in e)
			if (e[r]) i = i ? i + ' ' + r : r;
			else if (i.length)
				for (var o = r.length, s = 0; (s = i.indexOf(r, s)) >= 0; ) {
					var c = s + o;
					(s === 0 || at.includes(i[s - 1])) && (c === i.length || at.includes(i[c]))
						? (i = (s === 0 ? '' : i.substring(0, s)) + i.substring(c + 1))
						: (s = c);
				}
	}
	return i === '' ? null : i;
}
function ut(t, n = !1) {
	var e = n ? ' !important;' : ';',
		i = '';
	for (var r in t) {
		var o = t[r];
		o != null && o !== '' && (i += ' ' + r + ': ' + o + e);
	}
	return i;
}
function H(t) {
	return t[0] !== '-' || t[1] !== '-' ? t.toLowerCase() : t;
}
function Ae(t, n) {
	if (n) {
		var e = '',
			i,
			r;
		if ((Array.isArray(n) ? ((i = n[0]), (r = n[1])) : (i = n), t)) {
			t = String(t)
				.replaceAll(/\s*\/\*.*?\*\/\s*/g, '')
				.trim();
			var o = !1,
				s = 0,
				c = !1,
				f = [];
			i && f.push(...Object.keys(i).map(H)), r && f.push(...Object.keys(r).map(H));
			var l = 0,
				a = -1;
			const S = t.length;
			for (var u = 0; u < S; u++) {
				var d = t[u];
				if (
					(c
						? d === '/' && t[u - 1] === '*' && (c = !1)
						: o
							? o === d && (o = !1)
							: d === '/' && t[u + 1] === '*'
								? (c = !0)
								: d === '"' || d === "'"
									? (o = d)
									: d === '('
										? s++
										: d === ')' && s--,
					!c && o === !1 && s === 0)
				) {
					if (d === ':' && a === -1) a = u;
					else if (d === ';' || u === S - 1) {
						if (a !== -1) {
							var y = H(t.substring(l, a).trim());
							if (!f.includes(y)) {
								d !== ';' && u++;
								var I = t.substring(l, u).trim();
								e += ' ' + I + ';';
							}
						}
						(l = u + 1), (a = -1);
					}
				}
			}
		}
		return (
			i && (e += ut(i)), r && (e += ut(r, !0)), (e = e.trim()), e === '' ? null : e
		);
	}
	return t == null ? null : String(t);
}
function Te(t, n, e, i, r, o) {
	var s = t.__className;
	if (A || s !== e || s === void 0) {
		var c = xe(e, i, o);
		(!A || c !== t.getAttribute('class')) &&
			(c == null
				? t.removeAttribute('class')
				: n
					? (t.className = c)
					: t.setAttribute('class', c)),
			(t.__className = e);
	} else if (o && r !== o)
		for (var f in o) {
			var l = !!o[f];
			(r == null || l !== !!r[f]) && t.classList.toggle(f, l);
		}
	return o;
}
function V(t, n = {}, e, i) {
	for (var r in e) {
		var o = e[r];
		n[r] !== o &&
			(e[r] == null ? t.style.removeProperty(r) : t.style.setProperty(r, o, i));
	}
}
function _e(t, n, e, i) {
	var r = t.__style;
	if (A || r !== n) {
		var o = Ae(n, i);
		(!A || o !== t.getAttribute('style')) &&
			(o == null ? t.removeAttribute('style') : (t.style.cssText = o)),
			(t.__style = n);
	} else
		i &&
			(Array.isArray(i)
				? (V(t, e == null ? void 0 : e[0], i[0]),
					V(t, e == null ? void 0 : e[1], i[1], 'important'))
				: V(t, e, i));
	return i;
}
const O = Symbol('class'),
	P = Symbol('style'),
	_t = Symbol('is custom element'),
	Et = Symbol('is html');
function Ee(t, n) {
	n
		? t.hasAttribute('selected') || t.setAttribute('selected', '')
		: t.removeAttribute('selected');
}
function dt(t, n, e, i) {
	var r = Ct(t);
	(A &&
		((r[n] = t.getAttribute(n)),
		n === 'src' || n === 'srcset' || (n === 'href' && t.nodeName === 'LINK'))) ||
		(r[n] !== (r[n] = e) &&
			(n === 'loading' && (t[te] = e),
			e == null
				? t.removeAttribute(n)
				: typeof e != 'string' && Ot(t).includes(n)
					? (t[n] = e)
					: t.setAttribute(n, e)));
}
function ht(t, n, e, i, r = !1) {
	var o = Ct(t),
		s = o[_t],
		c = !o[Et];
	let f = A && s;
	f && st(!1);
	var l = n || {},
		a = t.tagName === 'OPTION';
	for (var u in n) u in e || (e[u] = null);
	e.class ? (e.class = ke(e.class)) : e[O] && (e.class = null),
		e[P] && (e.style ?? (e.style = null));
	var d = Ot(t);
	for (const p in e) {
		let m = e[p];
		if (a && p === 'value' && m == null) {
			(t.value = t.__value = ''), (l[p] = m);
			continue;
		}
		if (p === 'class') {
			var y = t.namespaceURI === 'http://www.w3.org/1999/xhtml';
			Te(t, y, m, i, n == null ? void 0 : n[O], e[O]), (l[p] = m), (l[O] = e[O]);
			continue;
		}
		if (p === 'style') {
			_e(t, m, n == null ? void 0 : n[P], e[P]), (l[p] = m), (l[P] = e[P]);
			continue;
		}
		var I = l[p];
		if (m !== I) {
			l[p] = m;
			var S = p[0] + p[1];
			if (S !== '$$')
				if (S === 'on') {
					const x = {},
						b = '$$' + p;
					let v = p.slice(2);
					var w = ge(v);
					if ((ue(v) && ((v = v.slice(0, -7)), (x.capture = !0)), !w && I)) {
						if (m != null) continue;
						t.removeEventListener(v, l[b], x), (l[b] = null);
					}
					if (m != null)
						if (w) (t[`__${v}`] = m), he([v]);
						else {
							let T = function (E) {
								l[p].call(this, E);
							};
							l[b] = de(v, t, T, x);
						}
					else w && (t[`__${v}`] = void 0);
				} else if (p === 'style') dt(t, p, m);
				else if (p === 'autofocus') we(t, !!m);
				else if (!s && (p === '__value' || (p === 'value' && m != null)))
					t.value = t.__value = m;
				else if (p === 'selected' && a) Ee(t, m);
				else {
					var g = p;
					c || (g = pe(g));
					var h = g === 'defaultValue' || g === 'defaultChecked';
					if (m == null && !s && !h)
						if (((o[p] = null), g === 'value' || g === 'checked')) {
							let x = t;
							const b = n === void 0;
							if (g === 'value') {
								let v = x.defaultValue;
								x.removeAttribute(g),
									(x.defaultValue = v),
									(x.value = x.__value = b ? v : null);
							} else {
								let v = x.defaultChecked;
								x.removeAttribute(g), (x.defaultChecked = v), (x.checked = b ? v : !1);
							}
						} else t.removeAttribute(p);
					else
						h || (d.includes(g) && (s || typeof m != 'string'))
							? (t[g] = m)
							: typeof m != 'function' && dt(t, g, m);
				}
		}
	}
	return f && st(!0), l;
}
function Ct(t) {
	return (
		t.__attributes ??
		(t.__attributes = { [_t]: t.nodeName.includes('-'), [Et]: t.namespaceURI === Jt })
	);
}
var pt = new Map();
function Ot(t) {
	var n = pt.get(t.nodeName);
	if (n) return n;
	pt.set(t.nodeName, (n = []));
	for (var e, i = t, r = Element.prototype; r !== i; ) {
		e = ee(i);
		for (var o in e) e[o].set && n.push(o);
		i = Xt(i);
	}
	return n;
}
const Pt = /^[a-z0-9]+(-[a-z0-9]+)*$/,
	U = (t, n, e, i = '') => {
		const r = t.split(':');
		if (t.slice(0, 1) === '@') {
			if (r.length < 2 || r.length > 3) return null;
			i = r.shift().slice(1);
		}
		if (r.length > 3 || !r.length) return null;
		if (r.length > 1) {
			const c = r.pop(),
				f = r.pop(),
				l = { provider: r.length > 0 ? r[0] : i, prefix: f, name: c };
			return n && !D(l) ? null : l;
		}
		const o = r[0],
			s = o.split('-');
		if (s.length > 1) {
			const c = { provider: i, prefix: s.shift(), name: s.join('-') };
			return n && !D(c) ? null : c;
		}
		if (e && i === '') {
			const c = { provider: i, prefix: '', name: o };
			return n && !D(c, e) ? null : c;
		}
		return null;
	},
	D = (t, n) => (t ? !!(((n && t.prefix === '') || t.prefix) && t.name) : !1),
	jt = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
	z = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
	Q = Object.freeze({ ...jt, ...z }),
	Y = Object.freeze({ ...Q, body: '', hidden: !1 });
function Ce(t, n) {
	const e = {};
	!t.hFlip != !n.hFlip && (e.hFlip = !0), !t.vFlip != !n.vFlip && (e.vFlip = !0);
	const i = ((t.rotate || 0) + (n.rotate || 0)) % 4;
	return i && (e.rotate = i), e;
}
function gt(t, n) {
	const e = Ce(t, n);
	for (const i in Y)
		i in z
			? i in t && !(i in e) && (e[i] = z[i])
			: i in n
				? (e[i] = n[i])
				: i in t && (e[i] = t[i]);
	return e;
}
function Oe(t, n) {
	const e = t.icons,
		i = t.aliases || Object.create(null),
		r = Object.create(null);
	function o(s) {
		if (e[s]) return (r[s] = []);
		if (!(s in r)) {
			r[s] = null;
			const c = i[s] && i[s].parent,
				f = c && o(c);
			f && (r[s] = [c].concat(f));
		}
		return r[s];
	}
	return Object.keys(e).concat(Object.keys(i)).forEach(o), r;
}
function Pe(t, n, e) {
	const i = t.icons,
		r = t.aliases || Object.create(null);
	let o = {};
	function s(c) {
		o = gt(i[c] || r[c], o);
	}
	return s(n), e.forEach(s), gt(t, o);
}
function Lt(t, n) {
	const e = [];
	if (typeof t != 'object' || typeof t.icons != 'object') return e;
	t.not_found instanceof Array &&
		t.not_found.forEach((r) => {
			n(r, null), e.push(r);
		});
	const i = Oe(t);
	for (const r in i) {
		const o = i[r];
		o && (n(r, Pe(t, r, o)), e.push(r));
	}
	return e;
}
const je = { provider: '', aliases: {}, not_found: {}, ...jt };
function B(t, n) {
	for (const e in n) if (e in t && typeof t[e] != typeof n[e]) return !1;
	return !0;
}
function Ft(t) {
	if (typeof t != 'object' || t === null) return null;
	const n = t;
	if (
		typeof n.prefix != 'string' ||
		!t.icons ||
		typeof t.icons != 'object' ||
		!B(t, je)
	)
		return null;
	const e = n.icons;
	for (const r in e) {
		const o = e[r];
		if (!r || typeof o.body != 'string' || !B(o, Y)) return null;
	}
	const i = n.aliases || Object.create(null);
	for (const r in i) {
		const o = i[r],
			s = o.parent;
		if (!r || typeof s != 'string' || (!e[s] && !i[s]) || !B(o, Y)) return null;
	}
	return n;
}
const mt = Object.create(null);
function Le(t, n) {
	return { provider: t, prefix: n, icons: Object.create(null), missing: new Set() };
}
function C(t, n) {
	const e = mt[t] || (mt[t] = Object.create(null));
	return e[n] || (e[n] = Le(t, n));
}
function Nt(t, n) {
	return Ft(n)
		? Lt(n, (e, i) => {
				i ? (t.icons[e] = i) : t.missing.add(e);
			})
		: [];
}
function Fe(t, n, e) {
	try {
		if (typeof e.body == 'string') return (t.icons[n] = { ...e }), !0;
	} catch {}
	return !1;
}
let F = !1;
function Mt(t) {
	return typeof t == 'boolean' && (F = t), F;
}
function Ne(t) {
	const n = typeof t == 'string' ? U(t, !0, F) : t;
	if (n) {
		const e = C(n.provider, n.prefix),
			i = n.name;
		return e.icons[i] || (e.missing.has(i) ? null : void 0);
	}
}
function Me(t, n) {
	const e = U(t, !0, F);
	if (!e) return !1;
	const i = C(e.provider, e.prefix);
	return n ? Fe(i, e.name, n) : (i.missing.add(e.name), !0);
}
function Re(t, n) {
	if (typeof t != 'object') return !1;
	if ((typeof n != 'string' && (n = t.provider || ''), F && !n && !t.prefix)) {
		let r = !1;
		return (
			Ft(t) &&
				((t.prefix = ''),
				Lt(t, (o, s) => {
					Me(o, s) && (r = !0);
				})),
			r
		);
	}
	const e = t.prefix;
	if (!D({ prefix: e, name: 'a' })) return !1;
	const i = C(n, e);
	return !!Nt(i, t);
}
const Rt = Object.freeze({ width: null, height: null }),
	Dt = Object.freeze({ ...Rt, ...z }),
	De = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
	$e = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function bt(t, n, e) {
	if (n === 1) return t;
	if (((e = e || 100), typeof t == 'number')) return Math.ceil(t * n * e) / e;
	if (typeof t != 'string') return t;
	const i = t.split(De);
	if (i === null || !i.length) return t;
	const r = [];
	let o = i.shift(),
		s = $e.test(o);
	for (;;) {
		if (s) {
			const c = parseFloat(o);
			isNaN(c) ? r.push(o) : r.push(Math.ceil(c * n * e) / e);
		} else r.push(o);
		if (((o = i.shift()), o === void 0)) return r.join('');
		s = !s;
	}
}
function ze(t, n = 'defs') {
	let e = '';
	const i = t.indexOf('<' + n);
	for (; i >= 0; ) {
		const r = t.indexOf('>', i),
			o = t.indexOf('</' + n);
		if (r === -1 || o === -1) break;
		const s = t.indexOf('>', o);
		if (s === -1) break;
		(e += t.slice(r + 1, o).trim()), (t = t.slice(0, i).trim() + t.slice(s + 1));
	}
	return { defs: e, content: t };
}
function Ue(t, n) {
	return t ? '<defs>' + t + '</defs>' + n : n;
}
function Qe(t, n, e) {
	const i = ze(t);
	return Ue(i.defs, n + i.content + e);
}
const qe = (t) => t === 'unset' || t === 'undefined' || t === 'none';
function He(t, n) {
	const e = { ...Q, ...t },
		i = { ...Dt, ...n },
		r = { left: e.left, top: e.top, width: e.width, height: e.height };
	let o = e.body;
	[e, i].forEach((S) => {
		const w = [],
			g = S.hFlip,
			h = S.vFlip;
		let p = S.rotate;
		g
			? h
				? (p += 2)
				: (w.push(
						'translate(' +
							(r.width + r.left).toString() +
							' ' +
							(0 - r.top).toString() +
							')'
					),
					w.push('scale(-1 1)'),
					(r.top = r.left = 0))
			: h &&
				(w.push(
					'translate(' +
						(0 - r.left).toString() +
						' ' +
						(r.height + r.top).toString() +
						')'
				),
				w.push('scale(1 -1)'),
				(r.top = r.left = 0));
		let m;
		switch ((p < 0 && (p -= Math.floor(p / 4) * 4), (p = p % 4), p)) {
			case 1:
				(m = r.height / 2 + r.top),
					w.unshift('rotate(90 ' + m.toString() + ' ' + m.toString() + ')');
				break;
			case 2:
				w.unshift(
					'rotate(180 ' +
						(r.width / 2 + r.left).toString() +
						' ' +
						(r.height / 2 + r.top).toString() +
						')'
				);
				break;
			case 3:
				(m = r.width / 2 + r.left),
					w.unshift('rotate(-90 ' + m.toString() + ' ' + m.toString() + ')');
				break;
		}
		p % 2 === 1 &&
			(r.left !== r.top && ((m = r.left), (r.left = r.top), (r.top = m)),
			r.width !== r.height && ((m = r.width), (r.width = r.height), (r.height = m))),
			w.length && (o = Qe(o, '<g transform="' + w.join(' ') + '">', '</g>'));
	});
	const s = i.width,
		c = i.height,
		f = r.width,
		l = r.height;
	let a, u;
	s === null
		? ((u = c === null ? '1em' : c === 'auto' ? l : c), (a = bt(u, f / l)))
		: ((a = s === 'auto' ? f : s),
			(u = c === null ? bt(a, l / f) : c === 'auto' ? l : c));
	const d = {},
		y = (S, w) => {
			qe(w) || (d[S] = w.toString());
		};
	y('width', a), y('height', u);
	const I = [r.left, r.top, f, l];
	return (d.viewBox = I.join(' ')), { attributes: d, viewBox: I, body: o };
}
const Ve = /\sid="(\S+)"/g,
	Be =
		'IconifyId' +
		Date.now().toString(16) +
		((Math.random() * 16777216) | 0).toString(16);
let Ge = 0;
function Ke(t, n = Be) {
	const e = [];
	let i;
	for (; (i = Ve.exec(t)); ) e.push(i[1]);
	if (!e.length) return t;
	const r = 'suffix' + ((Math.random() * 16777216) | Date.now()).toString(16);
	return (
		e.forEach((o) => {
			const s = typeof n == 'function' ? n(o) : n + (Ge++).toString(),
				c = o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			t = t.replace(
				new RegExp('([#;"])(' + c + ')([")]|\\.[a-z])', 'g'),
				'$1' + s + r + '$3'
			);
		}),
		(t = t.replace(new RegExp(r, 'g'), '')),
		t
	);
}
const W = Object.create(null);
function Ye(t, n) {
	W[t] = n;
}
function Z(t) {
	return W[t] || W[''];
}
function X(t) {
	let n;
	if (typeof t.resources == 'string') n = [t.resources];
	else if (((n = t.resources), !(n instanceof Array) || !n.length)) return null;
	return {
		resources: n,
		path: t.path || '/',
		maxURL: t.maxURL || 500,
		rotate: t.rotate || 750,
		timeout: t.timeout || 5e3,
		random: t.random === !0,
		index: t.index || 0,
		dataAfterTimeout: t.dataAfterTimeout !== !1
	};
}
const tt = Object.create(null),
	j = ['https://api.simplesvg.com', 'https://api.unisvg.com'],
	$ = [];
for (; j.length > 0; )
	j.length === 1 || Math.random() > 0.5 ? $.push(j.shift()) : $.push(j.pop());
tt[''] = X({ resources: ['https://api.iconify.design'].concat($) });
function We(t, n) {
	const e = X(n);
	return e === null ? !1 : ((tt[t] = e), !0);
}
function et(t) {
	return tt[t];
}
const Ze = () => {
	let t;
	try {
		if (((t = fetch), typeof t == 'function')) return t;
	} catch {}
};
let vt = Ze();
function Je(t, n) {
	const e = et(t);
	if (!e) return 0;
	let i;
	if (!e.maxURL) i = 0;
	else {
		let r = 0;
		e.resources.forEach((s) => {
			r = Math.max(r, s.length);
		});
		const o = n + '.json?icons=';
		i = e.maxURL - r - e.path.length - o.length;
	}
	return i;
}
function Xe(t) {
	return t === 404;
}
const tn = (t, n, e) => {
	const i = [],
		r = Je(t, n),
		o = 'icons';
	let s = { type: o, provider: t, prefix: n, icons: [] },
		c = 0;
	return (
		e.forEach((f, l) => {
			(c += f.length + 1),
				c >= r &&
					l > 0 &&
					(i.push(s),
					(s = { type: o, provider: t, prefix: n, icons: [] }),
					(c = f.length)),
				s.icons.push(f);
		}),
		i.push(s),
		i
	);
};
function en(t) {
	if (typeof t == 'string') {
		const n = et(t);
		if (n) return n.path;
	}
	return '/';
}
const nn = (t, n, e) => {
		if (!vt) {
			e('abort', 424);
			return;
		}
		let i = en(n.provider);
		switch (n.type) {
			case 'icons': {
				const o = n.prefix,
					c = n.icons.join(','),
					f = new URLSearchParams({ icons: c });
				i += o + '.json?' + f.toString();
				break;
			}
			case 'custom': {
				const o = n.uri;
				i += o.slice(0, 1) === '/' ? o.slice(1) : o;
				break;
			}
			default:
				e('abort', 400);
				return;
		}
		let r = 503;
		vt(t + i)
			.then((o) => {
				const s = o.status;
				if (s !== 200) {
					setTimeout(() => {
						e(Xe(s) ? 'abort' : 'next', s);
					});
					return;
				}
				return (r = 501), o.json();
			})
			.then((o) => {
				if (typeof o != 'object' || o === null) {
					setTimeout(() => {
						o === 404 ? e('abort', o) : e('next', r);
					});
					return;
				}
				setTimeout(() => {
					e('success', o);
				});
			})
			.catch(() => {
				e('next', r);
			});
	},
	rn = { prepare: tn, send: nn };
function on(t) {
	const n = { loaded: [], missing: [], pending: [] },
		e = Object.create(null);
	t.sort((r, o) =>
		r.provider !== o.provider
			? r.provider.localeCompare(o.provider)
			: r.prefix !== o.prefix
				? r.prefix.localeCompare(o.prefix)
				: r.name.localeCompare(o.name)
	);
	let i = { provider: '', prefix: '', name: '' };
	return (
		t.forEach((r) => {
			if (i.name === r.name && i.prefix === r.prefix && i.provider === r.provider)
				return;
			i = r;
			const o = r.provider,
				s = r.prefix,
				c = r.name,
				f = e[o] || (e[o] = Object.create(null)),
				l = f[s] || (f[s] = C(o, s));
			let a;
			c in l.icons
				? (a = n.loaded)
				: s === '' || l.missing.has(c)
					? (a = n.missing)
					: (a = n.pending);
			const u = { provider: o, prefix: s, name: c };
			a.push(u);
		}),
		n
	);
}
function $t(t, n) {
	t.forEach((e) => {
		const i = e.loaderCallbacks;
		i && (e.loaderCallbacks = i.filter((r) => r.id !== n));
	});
}
function sn(t) {
	t.pendingCallbacksFlag ||
		((t.pendingCallbacksFlag = !0),
		setTimeout(() => {
			t.pendingCallbacksFlag = !1;
			const n = t.loaderCallbacks ? t.loaderCallbacks.slice(0) : [];
			if (!n.length) return;
			let e = !1;
			const i = t.provider,
				r = t.prefix;
			n.forEach((o) => {
				const s = o.icons,
					c = s.pending.length;
				(s.pending = s.pending.filter((f) => {
					if (f.prefix !== r) return !0;
					const l = f.name;
					if (t.icons[l]) s.loaded.push({ provider: i, prefix: r, name: l });
					else if (t.missing.has(l))
						s.missing.push({ provider: i, prefix: r, name: l });
					else return (e = !0), !0;
					return !1;
				})),
					s.pending.length !== c &&
						(e || $t([t], o.id),
						o.callback(
							s.loaded.slice(0),
							s.missing.slice(0),
							s.pending.slice(0),
							o.abort
						));
			});
		}));
}
let cn = 0;
function fn(t, n, e) {
	const i = cn++,
		r = $t.bind(null, e, i);
	if (!n.pending.length) return r;
	const o = { id: i, icons: n, callback: t, abort: r };
	return (
		e.forEach((s) => {
			(s.loaderCallbacks || (s.loaderCallbacks = [])).push(o);
		}),
		r
	);
}
function ln(t, n = !0, e = !1) {
	const i = [];
	return (
		t.forEach((r) => {
			const o = typeof r == 'string' ? U(r, n, e) : r;
			o && i.push(o);
		}),
		i
	);
}
var an = {
	resources: [],
	index: 0,
	timeout: 2e3,
	rotate: 750,
	random: !1,
	dataAfterTimeout: !1
};
function un(t, n, e, i) {
	const r = t.resources.length,
		o = t.random ? Math.floor(Math.random() * r) : t.index;
	let s;
	if (t.random) {
		let b = t.resources.slice(0);
		for (s = []; b.length > 1; ) {
			const v = Math.floor(Math.random() * b.length);
			s.push(b[v]), (b = b.slice(0, v).concat(b.slice(v + 1)));
		}
		s = s.concat(b);
	} else s = t.resources.slice(o).concat(t.resources.slice(0, o));
	const c = Date.now();
	let f = 'pending',
		l = 0,
		a,
		u = null,
		d = [],
		y = [];
	typeof i == 'function' && y.push(i);
	function I() {
		u && (clearTimeout(u), (u = null));
	}
	function S() {
		f === 'pending' && (f = 'aborted'),
			I(),
			d.forEach((b) => {
				b.status === 'pending' && (b.status = 'aborted');
			}),
			(d = []);
	}
	function w(b, v) {
		v && (y = []), typeof b == 'function' && y.push(b);
	}
	function g() {
		return {
			startTime: c,
			payload: n,
			status: f,
			queriesSent: l,
			queriesPending: d.length,
			subscribe: w,
			abort: S
		};
	}
	function h() {
		(f = 'failed'),
			y.forEach((b) => {
				b(void 0, a);
			});
	}
	function p() {
		d.forEach((b) => {
			b.status === 'pending' && (b.status = 'aborted');
		}),
			(d = []);
	}
	function m(b, v, T) {
		const E = v !== 'success';
		switch (((d = d.filter((_) => _ !== b)), f)) {
			case 'pending':
				break;
			case 'failed':
				if (E || !t.dataAfterTimeout) return;
				break;
			default:
				return;
		}
		if (v === 'abort') {
			(a = T), h();
			return;
		}
		if (E) {
			(a = T), d.length || (s.length ? x() : h());
			return;
		}
		if ((I(), p(), !t.random)) {
			const _ = t.resources.indexOf(b.resource);
			_ !== -1 && _ !== t.index && (t.index = _);
		}
		(f = 'completed'),
			y.forEach((_) => {
				_(T);
			});
	}
	function x() {
		if (f !== 'pending') return;
		I();
		const b = s.shift();
		if (b === void 0) {
			if (d.length) {
				u = setTimeout(() => {
					I(), f === 'pending' && (p(), h());
				}, t.timeout);
				return;
			}
			h();
			return;
		}
		const v = {
			status: 'pending',
			resource: b,
			callback: (T, E) => {
				m(v, T, E);
			}
		};
		d.push(v), l++, (u = setTimeout(x, t.rotate)), e(b, n, v.callback);
	}
	return setTimeout(x), g;
}
function zt(t) {
	const n = { ...an, ...t };
	let e = [];
	function i() {
		e = e.filter((c) => c().status === 'pending');
	}
	function r(c, f, l) {
		const a = un(n, c, f, (u, d) => {
			i(), l && l(u, d);
		});
		return e.push(a), a;
	}
	function o(c) {
		return e.find((f) => c(f)) || null;
	}
	return {
		query: r,
		find: o,
		setIndex: (c) => {
			n.index = c;
		},
		getIndex: () => n.index,
		cleanup: i
	};
}
function yt() {}
const G = Object.create(null);
function dn(t) {
	if (!G[t]) {
		const n = et(t);
		if (!n) return;
		const e = zt(n),
			i = { config: n, redundancy: e };
		G[t] = i;
	}
	return G[t];
}
function hn(t, n, e) {
	let i, r;
	if (typeof t == 'string') {
		const o = Z(t);
		if (!o) return e(void 0, 424), yt;
		r = o.send;
		const s = dn(t);
		s && (i = s.redundancy);
	} else {
		const o = X(t);
		if (o) {
			i = zt(o);
			const s = t.resources ? t.resources[0] : '',
				c = Z(s);
			c && (r = c.send);
		}
	}
	return !i || !r ? (e(void 0, 424), yt) : i.query(n, r, e)().abort;
}
function wt() {}
function pn(t) {
	t.iconsLoaderFlag ||
		((t.iconsLoaderFlag = !0),
		setTimeout(() => {
			(t.iconsLoaderFlag = !1), sn(t);
		}));
}
function gn(t) {
	const n = [],
		e = [];
	return (
		t.forEach((i) => {
			(i.match(Pt) ? n : e).push(i);
		}),
		{ valid: n, invalid: e }
	);
}
function L(t, n, e) {
	function i() {
		const r = t.pendingIcons;
		n.forEach((o) => {
			r && r.delete(o), t.icons[o] || t.missing.add(o);
		});
	}
	if (e && typeof e == 'object')
		try {
			if (!Nt(t, e).length) {
				i();
				return;
			}
		} catch (r) {
			console.error(r);
		}
	i(), pn(t);
}
function It(t, n) {
	t instanceof Promise
		? t
				.then((e) => {
					n(e);
				})
				.catch(() => {
					n(null);
				})
		: n(t);
}
function mn(t, n) {
	t.iconsToLoad
		? (t.iconsToLoad = t.iconsToLoad.concat(n).sort())
		: (t.iconsToLoad = n),
		t.iconsQueueFlag ||
			((t.iconsQueueFlag = !0),
			setTimeout(() => {
				t.iconsQueueFlag = !1;
				const { provider: e, prefix: i } = t,
					r = t.iconsToLoad;
				if ((delete t.iconsToLoad, !r || !r.length)) return;
				const o = t.loadIcon;
				if (t.loadIcons && (r.length > 1 || !o)) {
					It(t.loadIcons(r, i, e), (a) => {
						L(t, r, a);
					});
					return;
				}
				if (o) {
					r.forEach((a) => {
						const u = o(a, i, e);
						It(u, (d) => {
							const y = d ? { prefix: i, icons: { [a]: d } } : null;
							L(t, [a], y);
						});
					});
					return;
				}
				const { valid: s, invalid: c } = gn(r);
				if ((c.length && L(t, c, null), !s.length)) return;
				const f = i.match(Pt) ? Z(e) : null;
				if (!f) {
					L(t, s, null);
					return;
				}
				f.prepare(e, i, s).forEach((a) => {
					hn(e, a, (u) => {
						L(t, a.icons, u);
					});
				});
			}));
}
const bn = (t, n) => {
	const e = ln(t, !0, Mt()),
		i = on(e);
	if (!i.pending.length) {
		let f = !0;
		return (
			n &&
				setTimeout(() => {
					f && n(i.loaded, i.missing, i.pending, wt);
				}),
			() => {
				f = !1;
			}
		);
	}
	const r = Object.create(null),
		o = [];
	let s, c;
	return (
		i.pending.forEach((f) => {
			const { provider: l, prefix: a } = f;
			if (a === c && l === s) return;
			(s = l), (c = a), o.push(C(l, a));
			const u = r[l] || (r[l] = Object.create(null));
			u[a] || (u[a] = []);
		}),
		i.pending.forEach((f) => {
			const { provider: l, prefix: a, name: u } = f,
				d = C(l, a),
				y = d.pendingIcons || (d.pendingIcons = new Set());
			y.has(u) || (y.add(u), r[l][a].push(u));
		}),
		o.forEach((f) => {
			const l = r[f.provider][f.prefix];
			l.length && mn(f, l);
		}),
		n ? fn(n, i, o) : wt
	);
};
function vn(t, n) {
	const e = { ...t };
	for (const i in n) {
		const r = n[i],
			o = typeof r;
		i in Rt
			? (r === null || (r && (o === 'string' || o === 'number'))) && (e[i] = r)
			: o === typeof e[i] && (e[i] = i === 'rotate' ? r % 4 : r);
	}
	return e;
}
const yn = /[\s,]+/;
function wn(t, n) {
	n.split(yn).forEach((e) => {
		switch (e.trim()) {
			case 'horizontal':
				t.hFlip = !0;
				break;
			case 'vertical':
				t.vFlip = !0;
				break;
		}
	});
}
function In(t, n = 0) {
	const e = t.replace(/^-?[0-9.]*/, '');
	function i(r) {
		for (; r < 0; ) r += 4;
		return r % 4;
	}
	if (e === '') {
		const r = parseInt(t);
		return isNaN(r) ? 0 : i(r);
	} else if (e !== t) {
		let r = 0;
		switch (e) {
			case '%':
				r = 25;
				break;
			case 'deg':
				r = 90;
		}
		if (r) {
			let o = parseFloat(t.slice(0, t.length - e.length));
			return isNaN(o) ? 0 : ((o = o / r), o % 1 === 0 ? i(o) : 0);
		}
	}
	return n;
}
function Sn(t, n) {
	let e =
		t.indexOf('xlink:') === -1 ? '' : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
	for (const i in n) e += ' ' + i + '="' + n[i] + '"';
	return '<svg xmlns="http://www.w3.org/2000/svg"' + e + '>' + t + '</svg>';
}
function kn(t) {
	return t
		.replace(/"/g, "'")
		.replace(/%/g, '%25')
		.replace(/#/g, '%23')
		.replace(/</g, '%3C')
		.replace(/>/g, '%3E')
		.replace(/\s+/g, ' ');
}
function xn(t) {
	return 'data:image/svg+xml,' + kn(t);
}
function An(t) {
	return 'url("' + xn(t) + '")';
}
const St = { ...Dt, inline: !1 },
	Tn = {
		xmlns: 'http://www.w3.org/2000/svg',
		'xmlns:xlink': 'http://www.w3.org/1999/xlink',
		'aria-hidden': !0,
		role: 'img'
	},
	_n = { display: 'inline-block' },
	J = { 'background-color': 'currentColor' },
	Ut = { 'background-color': 'transparent' },
	kt = { image: 'var(--svg)', repeat: 'no-repeat', size: '100% 100%' },
	xt = { '-webkit-mask': J, mask: J, background: Ut };
for (const t in xt) {
	const n = xt[t];
	for (const e in kt) n[t + '-' + e] = kt[e];
}
function En(t) {
	return t + (t.match(/^[-0-9.]+$/) ? 'px' : '');
}
function Cn(t, n) {
	const e = vn(St, n),
		i = n.mode || 'svg',
		r = i === 'svg' ? { ...Tn } : {};
	t.body.indexOf('xlink:') === -1 && delete r['xmlns:xlink'];
	let o = typeof n.style == 'string' ? n.style : '';
	for (let g in n) {
		const h = n[g];
		if (h !== void 0)
			switch (g) {
				case 'icon':
				case 'style':
				case 'onLoad':
				case 'mode':
				case 'ssr':
					break;
				case 'inline':
				case 'hFlip':
				case 'vFlip':
					e[g] = h === !0 || h === 'true' || h === 1;
					break;
				case 'flip':
					typeof h == 'string' && wn(e, h);
					break;
				case 'color':
					o =
						o +
						(o.length > 0 && o.trim().slice(-1) !== ';' ? ';' : '') +
						'color: ' +
						h +
						'; ';
					break;
				case 'rotate':
					typeof h == 'string' ? (e[g] = In(h)) : typeof h == 'number' && (e[g] = h);
					break;
				case 'ariaHidden':
				case 'aria-hidden':
					h !== !0 && h !== 'true' && delete r['aria-hidden'];
					break;
				default:
					if (g.slice(0, 3) === 'on:') break;
					St[g] === void 0 && (r[g] = h);
			}
	}
	const s = He(t, e),
		c = s.attributes;
	if ((e.inline && (o = 'vertical-align: -0.125em; ' + o), i === 'svg')) {
		Object.assign(r, c), o !== '' && (r.style = o);
		let g = 0,
			h = n.id;
		return (
			typeof h == 'string' && (h = h.replace(/-/g, '_')),
			{
				svg: !0,
				attributes: r,
				body: Ke(s.body, h ? () => h + 'ID' + g++ : 'iconifySvelte')
			}
		);
	}
	const { body: f, width: l, height: a } = t,
		u = i === 'mask' || (i === 'bg' ? !1 : f.indexOf('currentColor') !== -1),
		d = Sn(f, { ...c, width: l + '', height: a + '' }),
		I = { '--svg': An(d) },
		S = (g) => {
			const h = c[g];
			h && (I[g] = En(h));
		};
	S('width'), S('height'), Object.assign(I, _n, u ? J : Ut);
	let w = '';
	for (const g in I) w += g + ': ' + I[g] + ';';
	return (r.style = w + o), { svg: !1, attributes: r };
}
Mt(!0);
Ye('', rn);
if (typeof document < 'u' && typeof window < 'u') {
	const t = window;
	if (t.IconifyPreload !== void 0) {
		const n = t.IconifyPreload,
			e = 'Invalid IconifyPreload syntax.';
		typeof n == 'object' &&
			n !== null &&
			(n instanceof Array ? n : [n]).forEach((i) => {
				try {
					(typeof i != 'object' ||
						i === null ||
						i instanceof Array ||
						typeof i.icons != 'object' ||
						typeof i.prefix != 'string' ||
						!Re(i)) &&
						console.error(e);
				} catch {
					console.error(e);
				}
			});
	}
	if (t.IconifyProviders !== void 0) {
		const n = t.IconifyProviders;
		if (typeof n == 'object' && n !== null)
			for (let e in n) {
				const i = 'IconifyProviders[' + e + '] is invalid.';
				try {
					const r = n[e];
					if (typeof r != 'object' || !r || r.resources === void 0) continue;
					We(e, r) || console.error(i);
				} catch {
					console.error(i);
				}
			}
	}
}
function On(t, n, e, i, r) {
	function o() {
		n.loading && (n.loading.abort(), (n.loading = null));
	}
	if (typeof t == 'object' && t !== null && typeof t.body == 'string')
		return (n.name = ''), o(), { data: { ...Q, ...t } };
	let s;
	if (typeof t != 'string' || (s = U(t, !1, !0)) === null) return o(), null;
	const c = Ne(s);
	if (!c)
		return (
			e &&
				(!n.loading || n.loading.name !== t) &&
				(o(), (n.name = ''), (n.loading = { name: t, abort: bn([s], i) })),
			null
		);
	o(), n.name !== t && ((n.name = t), r && !n.destroyed && r(t));
	const f = ['iconify'];
	return (
		s.prefix !== '' && f.push('iconify--' + s.prefix),
		s.provider !== '' && f.push('iconify--' + s.provider),
		{ data: c, classes: f }
	);
}
function At(t, n) {
	return t ? Cn({ ...Q, ...t }, n) : null;
}
var Pn = qt('<svg><!></svg>'),
	jn = Ht('<span></span>');
function zn(t, n) {
	const e = ae(n, ['children', '$$slots', '$$events', '$$legacy']);
	ne(n, !1);
	const i = R({ name: '', loading: null, destroyed: !1 });
	let r = R(!1),
		o = R(0),
		s = R();
	const c = (d) => {
		typeof e.onLoad == 'function' && e.onLoad(d), ye()('load', { icon: d });
	};
	function f() {
		ce(o);
	}
	be(() => {
		ft(r, !0);
	}),
		ve(() => {
			q(i, (k(i).destroyed = !0)),
				k(i).loading && (k(i).loading.abort(), q(i, (k(i).loading = null)));
		}),
		re(
			() => (k(o), se(e), k(r), k(i), k(s), At),
			() => {
				k(o);
				const d = !!e.ssr || k(r),
					y = On(e.icon, k(i), d, f, c);
				ft(s, y ? At(y.data, e) : null),
					k(s) &&
						y.classes &&
						q(
							s,
							(k(s).attributes.class =
								(typeof e.class == 'string' ? e.class + ' ' : '') + y.classes.join(' '))
						);
			}
		),
		ie(),
		me();
	var l = rt(),
		a = ct(l);
	{
		var u = (d) => {
			var y = rt(),
				I = ct(y);
			{
				var S = (g) => {
						var h = Pn();
						let p;
						var m = fe(h);
						Ie(m, () => k(s).body, !0),
							le(h),
							K(() => (p = ht(h, p, { ...k(s).attributes }))),
							N(g, h);
					},
					w = (g) => {
						var h = jn();
						let p;
						K(() => (p = ht(h, p, { ...k(s).attributes }))), N(g, h);
					};
				lt(I, (g) => {
					k(s).svg ? g(S) : g(w, !1);
				});
			}
			N(d, y);
		};
		lt(a, (d) => {
			k(s) && d(u);
		});
	}
	N(t, l), oe();
}
export { zn as I, ht as a, Se as c, Ie as h, dt as s };
