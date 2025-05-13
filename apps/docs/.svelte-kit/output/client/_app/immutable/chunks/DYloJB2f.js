import {
	X as S,
	aj as T,
	O as V,
	t as g,
	ag as l,
	ah as s,
	ai as y
} from './BvF3OQQc.js';

function B(t) {
	return (
		t.endsWith('capture') && t !== 'gotpointercapture' && t !== 'lostpointercapture'
	);
}
const A = [
	'beforeinput',
	'click',
	'change',
	'dblclick',
	'contextmenu',
	'focusin',
	'focusout',
	'input',
	'keydown',
	'keyup',
	'mousedown',
	'mousemove',
	'mouseout',
	'mouseover',
	'mouseup',
	'pointerdown',
	'pointermove',
	'pointerout',
	'pointerover',
	'pointerup',
	'touchend',
	'touchmove',
	'touchstart'
];
function D(t) {
	return A.includes(t);
}
const I = {
	formnovalidate: 'formNoValidate',
	ismap: 'isMap',
	nomodule: 'noModule',
	playsinline: 'playsInline',
	readonly: 'readOnly',
	defaultvalue: 'defaultValue',
	defaultchecked: 'defaultChecked',
	srcobject: 'srcObject',
	novalidate: 'noValidate',
	allowfullscreen: 'allowFullscreen',
	disablepictureinpicture: 'disablePictureInPicture',
	disableremoteplayback: 'disableRemotePlayback'
};
function M(t) {
	return (t = t.toLowerCase()), I[t] ?? t;
}
const L = ['touchstart', 'touchmove'];
function W(t) {
	return L.includes(t);
}
function O(t) {
	var e = y,
		a = g;
	l(null), s(null);
	try {
		return t();
	} finally {
		l(e), s(a);
	}
}
const P = new Set(),
	N = new Set();
function q(t, e, a, i = {}) {
	function o(r) {
		if ((i.capture || j.call(e, r), !r.cancelBubble))
			return O(() => (a == null ? void 0 : a.call(this, r)));
	}
	return (
		t.startsWith('pointer') || t.startsWith('touch') || t === 'wheel'
			? V(() => {
					e.addEventListener(t, o, i);
				})
			: e.addEventListener(t, o, i),
		o
	);
}
function C(t) {
	for (var e = 0; e < t.length; e++) P.add(t[e]);
	for (var a of N) a(t);
}
function j(t) {
	var b;
	var e = this,
		a = e.ownerDocument,
		i = t.type,
		o = ((b = t.composedPath) == null ? void 0 : b.call(t)) || [],
		r = o[0] || t.target,
		p = 0,
		_ = t.__root;
	if (_) {
		var f = o.indexOf(_);
		if (f !== -1 && (e === document || e === window)) {
			t.__root = e;
			return;
		}
		var h = o.indexOf(e);
		if (h === -1) return;
		f <= h && (p = f);
	}
	if (((r = o[p] || t.target), r !== e)) {
		S(t, 'currentTarget', {
			configurable: !0,
			get() {
				return r || a;
			}
		});
		var w = y,
			m = g;
		l(null), s(null);
		try {
			for (var u, v = []; r !== null; ) {
				var d = r.assignedSlot || r.parentNode || r.host || null;
				try {
					var c = r['__' + i];
					if (c != null && (!r.disabled || t.target === r))
						if (T(c)) {
							var [E, ...k] = c;
							E.apply(r, [t, ...k]);
						} else c.call(r, t);
				} catch (n) {
					u ? v.push(n) : (u = n);
				}
				if (t.cancelBubble || d === e || d === null) break;
				r = d;
			}
			if (u) {
				for (let n of v)
					queueMicrotask(() => {
						throw n;
					});
				throw u;
			}
		} finally {
			(t.__root = e), delete t.currentTarget, l(w), s(m);
		}
	}
}
export { P as a, B as b, q as c, C as d, D as e, j as h, W as i, M as n, N as r };
