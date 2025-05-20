import { i as Ph } from '../chunks/B1d5rMd0.js';
import { I as B1 } from '../chunks/BRBqP9qL.js';
import { s as Ql } from '../chunks/BRpxm6ve.js';
import { L as U1 } from '../chunks/BYzBvHMH.js';
import { a as Rh, o as V1 } from '../chunks/C1QID_m_.js';
import { b as Ks } from '../chunks/CwnTrnkb.js';
import { e as Jl, s as Nt, c as Sr, B as gr, z as k } from '../chunks/Cy8X8so-.js';
import { s as Ki, p as Pe, r as er, i as kh } from '../chunks/Cz8mIVZI.js';
import {
	a3 as $1,
	aB as A1,
	an as At,
	aU as C1,
	aP as D1,
	C as Dt,
	g as E1,
	P as F,
	$ as F1,
	y as Fe,
	t as He,
	E as I1,
	aR as M1,
	aM as N1,
	p as O1,
	aQ as Oh,
	r as P1,
	Q as R1,
	v as T1,
	I as Th,
	aS as Vn,
	h as Vt,
	w as We,
	K as Ws,
	Y as Xe,
	s as Xl,
	a as Yl,
	aA as _r,
	a8 as cs,
	x as ct,
	F as et,
	A as fe,
	B as fr,
	z as ge,
	L as k1,
	ab as ls,
	d as oo,
	al as pr,
	j as ql,
	b as w1,
	c as x1
} from '../chunks/DgmMHYUv.js';
import { e as In, n as L1, h as Un, k as Wt, j as jn } from '../chunks/Dl94qWna.js';
import {
	d as S1,
	j as Zt,
	n as _1,
	u as b1,
	e as fn,
	f as pe,
	c as v1,
	t as wt,
	s as y1
} from '../chunks/HWDk4eir.js';
import { b as $h, d as Ah, s as G1, a as On } from '../chunks/UaJBEsuX.js';

var p1 = Object.defineProperty;
var Wl = (r) => {
	throw TypeError(r);
};
var m1 = (r, e, t) =>
	e in r
		? p1(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
		: (r[e] = t);
var xe = (r, e, t) => m1(r, typeof e != 'symbol' ? e + '' : e, t),
	io = (r, e, t) => e.has(r) || Wl('Cannot ' + t);
var it = (r, e, t) => (io(r, e, 'read from private field'), t ? t.call(r) : e.get(r)),
	Ar = (r, e, t) =>
		e.has(r)
			? Wl('Cannot add the same private member more than once')
			: e instanceof WeakSet
				? e.add(r)
				: e.set(r, t),
	ao = (r, e, t, n) => (
		io(r, e, 'write to private field'), n ? n.call(r, t) : e.set(r, t), t
	),
	Kl = (r, e, t) => (io(r, e, 'access private method'), t);

function j1(r, e, t, n, i, a) {
	let o = Vt;
	Vt && Yl();
	var s,
		l,
		c = null;
	Vt && oo.nodeType === 1 && ((c = oo), Yl());
	var u = Vt ? oo : r,
		f;
	w1(() => {
		const g = e() || null;
		var h = C1;
		g !== s &&
			(f &&
				(g === null
					? O1(f, () => {
							(f = null), (l = null);
						})
					: g === l
						? $1(f)
						: A1(f)),
			g &&
				g !== l &&
				(f = x1(() => {
					if (((c = Vt ? c : document.createElementNS(h, g)), v1(c, c), n)) {
						Vt && y1(g) && c.append(document.createComment(''));
						var d = Vt ? E1(c) : c.appendChild(P1());
						Vt && (d === null ? Xl(!1) : ql(d)), n(c, d);
					}
					(T1.nodes_end = c), u.before(c);
				})),
			(s = g),
			s && (l = s));
	}, I1),
		o && (Xl(!0), ql(u));
}
function z1(r, e, t) {
	Ws(() => {
		var n = Th(() => e(r, t == null ? void 0 : t()) || {});
		if (t && n != null && n.update) {
			var i = !1,
				a = {};
			k1(() => {
				var o = t();
				R1(o), i && D1(a, o) && ((a = o), n.update(o));
			}),
				(i = !0);
		}
		if (n != null && n.destroy) return () => n.destroy();
	});
}
var Ht, Ur, Gn, Hi, Dh;
const Wi = class Wi {
	constructor(e) {
		Ar(this, Hi);
		Ar(this, Ht, new WeakMap());
		Ar(this, Ur);
		Ar(this, Gn);
		ao(this, Gn, e);
	}
	observe(e, t) {
		var n = it(this, Ht).get(e) || new Set();
		return (
			n.add(t),
			it(this, Ht).set(e, n),
			Kl(this, Hi, Dh).call(this).observe(e, it(this, Gn)),
			() => {
				var i = it(this, Ht).get(e);
				i.delete(t),
					i.size === 0 && (it(this, Ht).delete(e), it(this, Ur).unobserve(e));
			}
		);
	}
};
(Ht = new WeakMap()),
	(Ur = new WeakMap()),
	(Gn = new WeakMap()),
	(Hi = new WeakSet()),
	(Dh = function () {
		return (
			it(this, Ur) ??
			ao(
				this,
				Ur,
				new ResizeObserver((e) => {
					for (var t of e) {
						Wi.entries.set(t.target, t);
						for (var n of it(this, Ht).get(t.target) || []) n(t);
					}
				})
			)
		);
	}),
	xe(Wi, 'entries', new WeakMap());
let ds = Wi;
var H1 = new ds({ box: 'border-box' });
function Zl(r, e, t) {
	var n = H1.observe(r, () => t(r[e]));
	Ws(() => (Th(() => t(r[e])), n));
}
var W1 = wt(
	'<div class="relative h-full w-full"><div class="absolute left-[0.5px] top-0 h-full w-full"><!></div> <div class="pointer-events-none absolute left-[0.5px] top-0 z-10 h-full w-full"><!></div></div>'
);
function K1(r, e) {
	He(e, !0);
	const t = Vn(e.canvasId);
	let n;
	V1(() => {
		t.initialize();
		const u = new ResizeObserver(t.container.onResize);
		return (
			u.observe(n),
			() => {
				u.unobserve(n), u.disconnect();
			}
		);
	});
	var i = W1(),
		a = ge(i),
		o = ge(a);
	{
		var s = (u) => {
			var f = Zt(),
				g = ct(f);
			Nt(g, () => e.children), pe(u, f);
		};
		kh(o, (u) => {
			t.container.initialized && u(s);
		});
	}
	fe(a),
		Ks(
			a,
			(u) => (n = u),
			() => n
		);
	var l = Fe(a, 2),
		c = ge(l);
	Nt(c, () => e.overlay),
		fe(l),
		fe(i),
		Dt(() => G1(a, 'id', e.canvasId)),
		Zl(i, 'clientWidth', (u) => (t.container.width = u)),
		Zl(i, 'clientHeight', (u) => (t.container.height = u)),
		pe(r, i),
		We();
}
const Y1 = {
		gray1: '#111111',
		gray2: '#191919',
		gray3: '#222222',
		gray4: '#2a2a2a',
		gray5: '#313131',
		gray6: '#3a3a3a',
		gray7: '#484848',
		gray8: '#606060',
		gray9: '#6e6e6e',
		gray10: '#7b7b7b',
		gray11: '#b4b4b4',
		gray12: '#eeeeee'
	},
	X1 = {
		mauve1: '#121113',
		mauve2: '#1a191b',
		mauve3: '#232225',
		mauve4: '#2b292d',
		mauve5: '#323035',
		mauve6: '#3c393f',
		mauve7: '#49474e',
		mauve8: '#625f69',
		mauve9: '#6f6d78',
		mauve10: '#7c7a85',
		mauve11: '#b5b2bc',
		mauve12: '#eeeef0'
	},
	q1 = {
		slate1: '#111113',
		slate2: '#18191b',
		slate3: '#212225',
		slate4: '#272a2d',
		slate5: '#2e3135',
		slate6: '#363a3f',
		slate7: '#43484e',
		slate8: '#5a6169',
		slate9: '#696e77',
		slate10: '#777b84',
		slate11: '#b0b4ba',
		slate12: '#edeef0'
	},
	Q1 = {
		sage1: '#101211',
		sage2: '#171918',
		sage3: '#202221',
		sage4: '#272a29',
		sage5: '#2e3130',
		sage6: '#373b39',
		sage7: '#444947',
		sage8: '#5b625f',
		sage9: '#63706b',
		sage10: '#717d79',
		sage11: '#adb5b2',
		sage12: '#eceeed'
	},
	ec = {
		olive1: '#111210',
		olive2: '#181917',
		olive3: '#212220',
		olive4: '#282a27',
		olive5: '#2f312e',
		olive6: '#383a36',
		olive7: '#454843',
		olive8: '#5c625b',
		olive9: '#687066',
		olive10: '#767d74',
		olive11: '#afb5ad',
		olive12: '#eceeec'
	},
	J1 = {
		sand1: '#111110',
		sand2: '#191918',
		sand3: '#222221',
		sand4: '#2a2a28',
		sand5: '#31312e',
		sand6: '#3b3a37',
		sand7: '#494844',
		sand8: '#62605b',
		sand9: '#6f6d66',
		sand10: '#7c7b74',
		sand11: '#b5b3ad',
		sand12: '#eeeeec'
	},
	tc = {
		tomato1: '#181111',
		tomato2: '#1f1513',
		tomato3: '#391714',
		tomato4: '#4e1511',
		tomato5: '#5e1c16',
		tomato6: '#6e2920',
		tomato7: '#853a2d',
		tomato8: '#ac4d39',
		tomato9: '#e54d2e',
		tomato10: '#ec6142',
		tomato11: '#ff977d',
		tomato12: '#fbd3cb'
	},
	Z1 = {
		red1: '#191111',
		red2: '#201314',
		red3: '#3b1219',
		red4: '#500f1c',
		red5: '#611623',
		red6: '#72232d',
		red7: '#8c333a',
		red8: '#b54548',
		red9: '#e5484d',
		red10: '#ec5d5e',
		red11: '#ff9592',
		red12: '#ffd1d9'
	},
	eg = {
		ruby1: '#191113',
		ruby2: '#1e1517',
		ruby3: '#3a141e',
		ruby4: '#4e1325',
		ruby5: '#5e1a2e',
		ruby6: '#6f2539',
		ruby7: '#883447',
		ruby8: '#b3445a',
		ruby9: '#e54666',
		ruby10: '#ec5a72',
		ruby11: '#ff949d',
		ruby12: '#fed2e1'
	},
	tg = {
		crimson1: '#191114',
		crimson2: '#201318',
		crimson3: '#381525',
		crimson4: '#4d122f',
		crimson5: '#5c1839',
		crimson6: '#6d2545',
		crimson7: '#873356',
		crimson8: '#b0436e',
		crimson9: '#e93d82',
		crimson10: '#ee518a',
		crimson11: '#ff92ad',
		crimson12: '#fdd3e8'
	},
	rg = {
		pink1: '#191117',
		pink2: '#21121d',
		pink3: '#37172f',
		pink4: '#4b143d',
		pink5: '#591c47',
		pink6: '#692955',
		pink7: '#833869',
		pink8: '#a84885',
		pink9: '#d6409f',
		pink10: '#de51a8',
		pink11: '#ff8dcc',
		pink12: '#fdd1ea'
	},
	ng = {
		plum1: '#181118',
		plum2: '#201320',
		plum3: '#351a35',
		plum4: '#451d47',
		plum5: '#512454',
		plum6: '#5e3061',
		plum7: '#734079',
		plum8: '#92549c',
		plum9: '#ab4aba',
		plum10: '#b658c4',
		plum11: '#e796f3',
		plum12: '#f4d4f4'
	},
	ig = {
		purple1: '#18111b',
		purple2: '#1e1523',
		purple3: '#301c3b',
		purple4: '#3d224e',
		purple5: '#48295c',
		purple6: '#54346b',
		purple7: '#664282',
		purple8: '#8457aa',
		purple9: '#8e4ec6',
		purple10: '#9a5cd0',
		purple11: '#d19dff',
		purple12: '#ecd9fa'
	},
	ag = {
		violet1: '#14121f',
		violet2: '#1b1525',
		violet3: '#291f43',
		violet4: '#33255b',
		violet5: '#3c2e69',
		violet6: '#473876',
		violet7: '#56468b',
		violet8: '#6958ad',
		violet9: '#6e56cf',
		violet10: '#7d66d9',
		violet11: '#baa7ff',
		violet12: '#e2ddfe'
	},
	og = {
		iris1: '#13131e',
		iris2: '#171625',
		iris3: '#202248',
		iris4: '#262a65',
		iris5: '#303374',
		iris6: '#3d3e82',
		iris7: '#4a4a95',
		iris8: '#5958b1',
		iris9: '#5b5bd6',
		iris10: '#6e6ade',
		iris11: '#b1a9ff',
		iris12: '#e0dffe'
	},
	sg = {
		indigo1: '#11131f',
		indigo2: '#141726',
		indigo3: '#182449',
		indigo4: '#1d2e62',
		indigo5: '#253974',
		indigo6: '#304384',
		indigo7: '#3a4f97',
		indigo8: '#435db1',
		indigo9: '#3e63dd',
		indigo10: '#5472e4',
		indigo11: '#9eb1ff',
		indigo12: '#d6e1ff'
	},
	lg = {
		blue1: '#0d1520',
		blue2: '#111927',
		blue3: '#0d2847',
		blue4: '#003362',
		blue5: '#004074',
		blue6: '#104d87',
		blue7: '#205d9e',
		blue8: '#2870bd',
		blue9: '#0090ff',
		blue10: '#3b9eff',
		blue11: '#70b8ff',
		blue12: '#c2e6ff'
	},
	cg = {
		cyan1: '#0b161a',
		cyan2: '#101b20',
		cyan3: '#082c36',
		cyan4: '#003848',
		cyan5: '#004558',
		cyan6: '#045468',
		cyan7: '#12677e',
		cyan8: '#11809c',
		cyan9: '#00a2c7',
		cyan10: '#23afd0',
		cyan11: '#4ccce6',
		cyan12: '#b6ecf7'
	},
	rc = {
		teal1: '#0d1514',
		teal2: '#111c1b',
		teal3: '#0d2d2a',
		teal4: '#023b37',
		teal5: '#084843',
		teal6: '#145750',
		teal7: '#1c6961',
		teal8: '#207e73',
		teal9: '#12a594',
		teal10: '#0eb39e',
		teal11: '#0bd8b6',
		teal12: '#adf0dd'
	},
	dg = {
		jade1: '#0d1512',
		jade2: '#121c18',
		jade3: '#0f2e22',
		jade4: '#0b3b2c',
		jade5: '#114837',
		jade6: '#1b5745',
		jade7: '#246854',
		jade8: '#2a7e68',
		jade9: '#29a383',
		jade10: '#27b08b',
		jade11: '#1fd8a4',
		jade12: '#adf0d4'
	},
	hg = {
		green1: '#0e1512',
		green2: '#121b17',
		green3: '#132d21',
		green4: '#113b29',
		green5: '#174933',
		green6: '#20573e',
		green7: '#28684a',
		green8: '#2f7c57',
		green9: '#30a46c',
		green10: '#33b074',
		green11: '#3dd68c',
		green12: '#b1f1cb'
	},
	nc = {
		grass1: '#0e1511',
		grass2: '#141a15',
		grass3: '#1b2a1e',
		grass4: '#1d3a24',
		grass5: '#25482d',
		grass6: '#2d5736',
		grass7: '#366740',
		grass8: '#3e7949',
		grass9: '#46a758',
		grass10: '#53b365',
		grass11: '#71d083',
		grass12: '#c2f0c2'
	},
	ug = {
		brown1: '#12110f',
		brown2: '#1c1816',
		brown3: '#28211d',
		brown4: '#322922',
		brown5: '#3e3128',
		brown6: '#4d3c2f',
		brown7: '#614a39',
		brown8: '#7c5f46',
		brown9: '#ad7f58',
		brown10: '#b88c67',
		brown11: '#dbb594',
		brown12: '#f2e1ca'
	},
	fg = {
		bronze1: '#141110',
		bronze2: '#1c1917',
		bronze3: '#262220',
		bronze4: '#302a27',
		bronze5: '#3b3330',
		bronze6: '#493e3a',
		bronze7: '#5a4c47',
		bronze8: '#6f5f58',
		bronze9: '#a18072',
		bronze10: '#ae8c7e',
		bronze11: '#d4b3a5',
		bronze12: '#ede0d9'
	},
	gg = {
		gold1: '#121211',
		gold2: '#1b1a17',
		gold3: '#24231f',
		gold4: '#2d2b26',
		gold5: '#38352e',
		gold6: '#444039',
		gold7: '#544f46',
		gold8: '#696256',
		gold9: '#978365',
		gold10: '#a39073',
		gold11: '#cbb99f',
		gold12: '#e8e2d9'
	},
	pg = {
		sky1: '#0d141f',
		sky2: '#111a27',
		sky3: '#112840',
		sky4: '#113555',
		sky5: '#154467',
		sky6: '#1b537b',
		sky7: '#1f6692',
		sky8: '#197cae',
		sky9: '#7ce2fe',
		sky10: '#a8eeff',
		sky11: '#75c7f0',
		sky12: '#c2f3ff'
	},
	ic = {
		mint1: '#0e1515',
		mint2: '#0f1b1b',
		mint3: '#092c2b',
		mint4: '#003a38',
		mint5: '#004744',
		mint6: '#105650',
		mint7: '#1e685f',
		mint8: '#277f70',
		mint9: '#86ead4',
		mint10: '#a8f5e5',
		mint11: '#58d5ba',
		mint12: '#c4f5e1'
	},
	ac = {
		lime1: '#11130c',
		lime2: '#151a10',
		lime3: '#1f2917',
		lime4: '#29371d',
		lime5: '#334423',
		lime6: '#3d522a',
		lime7: '#496231',
		lime8: '#577538',
		lime9: '#bdee63',
		lime10: '#d4ff70',
		lime11: '#bde56c',
		lime12: '#e3f7ba'
	},
	mg = {
		yellow1: '#14120b',
		yellow2: '#1b180f',
		yellow3: '#2d2305',
		yellow4: '#362b00',
		yellow5: '#433500',
		yellow6: '#524202',
		yellow7: '#665417',
		yellow8: '#836a21',
		yellow9: '#ffe629',
		yellow10: '#ffff57',
		yellow11: '#f5e147',
		yellow12: '#f6eeb4'
	},
	oc = {
		amber1: '#16120c',
		amber2: '#1d180f',
		amber3: '#302008',
		amber4: '#3f2700',
		amber5: '#4d3000',
		amber6: '#5c3d05',
		amber7: '#714f19',
		amber8: '#8f6424',
		amber9: '#ffc53d',
		amber10: '#ffd60a',
		amber11: '#ffca16',
		amber12: '#ffe7b3'
	},
	vg = {
		orange1: '#17120e',
		orange2: '#1e160f',
		orange3: '#331e0b',
		orange4: '#462100',
		orange5: '#562800',
		orange6: '#66350c',
		orange7: '#7e451d',
		orange8: '#a35829',
		orange9: '#f76b15',
		orange10: '#ff801f',
		orange11: '#ffa057',
		orange12: '#ffe0c2'
	},
	yg = {
		gray1: '#fcfcfc',
		gray2: '#f9f9f9',
		gray3: '#f0f0f0',
		gray4: '#e8e8e8',
		gray5: '#e0e0e0',
		gray6: '#d9d9d9',
		gray7: '#cecece',
		gray8: '#bbbbbb',
		gray9: '#8d8d8d',
		gray10: '#838383',
		gray11: '#646464',
		gray12: '#202020'
	},
	bg = {
		mauve1: '#fdfcfd',
		mauve2: '#faf9fb',
		mauve3: '#f2eff3',
		mauve4: '#eae7ec',
		mauve5: '#e3dfe6',
		mauve6: '#dbd8e0',
		mauve7: '#d0cdd7',
		mauve8: '#bcbac7',
		mauve9: '#8e8c99',
		mauve10: '#84828e',
		mauve11: '#65636d',
		mauve12: '#211f26'
	},
	_g = {
		slate1: '#fcfcfd',
		slate2: '#f9f9fb',
		slate3: '#f0f0f3',
		slate4: '#e8e8ec',
		slate5: '#e0e1e6',
		slate6: '#d9d9e0',
		slate7: '#cdced6',
		slate8: '#b9bbc6',
		slate9: '#8b8d98',
		slate10: '#80838d',
		slate11: '#60646c',
		slate12: '#1c2024'
	},
	Sg = {
		sage1: '#fbfdfc',
		sage2: '#f7f9f8',
		sage3: '#eef1f0',
		sage4: '#e6e9e8',
		sage5: '#dfe2e0',
		sage6: '#d7dad9',
		sage7: '#cbcfcd',
		sage8: '#b8bcba',
		sage9: '#868e8b',
		sage10: '#7c8481',
		sage11: '#5f6563',
		sage12: '#1a211e'
	},
	sc = {
		olive1: '#fcfdfc',
		olive2: '#f8faf8',
		olive3: '#eff1ef',
		olive4: '#e7e9e7',
		olive5: '#dfe2df',
		olive6: '#d7dad7',
		olive7: '#cccfcc',
		olive8: '#b9bcb8',
		olive9: '#898e87',
		olive10: '#7f847d',
		olive11: '#60655f',
		olive12: '#1d211c'
	},
	wg = {
		sand1: '#fdfdfc',
		sand2: '#f9f9f8',
		sand3: '#f1f0ef',
		sand4: '#e9e8e6',
		sand5: '#e2e1de',
		sand6: '#dad9d6',
		sand7: '#cfceca',
		sand8: '#bcbbb5',
		sand9: '#8d8d86',
		sand10: '#82827c',
		sand11: '#63635e',
		sand12: '#21201c'
	},
	lc = {
		tomato1: '#fffcfc',
		tomato2: '#fff8f7',
		tomato3: '#feebe7',
		tomato4: '#ffdcd3',
		tomato5: '#ffcdc2',
		tomato6: '#fdbdaf',
		tomato7: '#f5a898',
		tomato8: '#ec8e7b',
		tomato9: '#e54d2e',
		tomato10: '#dd4425',
		tomato11: '#d13415',
		tomato12: '#5c271f'
	},
	Ig = {
		red1: '#fffcfc',
		red2: '#fff7f7',
		red3: '#feebec',
		red4: '#ffdbdc',
		red5: '#ffcdce',
		red6: '#fdbdbe',
		red7: '#f4a9aa',
		red8: '#eb8e90',
		red9: '#e5484d',
		red10: '#dc3e42',
		red11: '#ce2c31',
		red12: '#641723'
	},
	xg = {
		ruby1: '#fffcfd',
		ruby2: '#fff7f8',
		ruby3: '#feeaed',
		ruby4: '#ffdce1',
		ruby5: '#ffced6',
		ruby6: '#f8bfc8',
		ruby7: '#efacb8',
		ruby8: '#e592a3',
		ruby9: '#e54666',
		ruby10: '#dc3b5d',
		ruby11: '#ca244d',
		ruby12: '#64172b'
	},
	Cg = {
		crimson1: '#fffcfd',
		crimson2: '#fef7f9',
		crimson3: '#ffe9f0',
		crimson4: '#fedce7',
		crimson5: '#facedd',
		crimson6: '#f3bed1',
		crimson7: '#eaacc3',
		crimson8: '#e093b2',
		crimson9: '#e93d82',
		crimson10: '#df3478',
		crimson11: '#cb1d63',
		crimson12: '#621639'
	},
	Eg = {
		pink1: '#fffcfe',
		pink2: '#fef7fb',
		pink3: '#fee9f5',
		pink4: '#fbdcef',
		pink5: '#f6cee7',
		pink6: '#efbfdd',
		pink7: '#e7acd0',
		pink8: '#dd93c2',
		pink9: '#d6409f',
		pink10: '#cf3897',
		pink11: '#c2298a',
		pink12: '#651249'
	},
	Pg = {
		plum1: '#fefcff',
		plum2: '#fdf7fd',
		plum3: '#fbebfb',
		plum4: '#f7def8',
		plum5: '#f2d1f3',
		plum6: '#e9c2ec',
		plum7: '#deade3',
		plum8: '#cf91d8',
		plum9: '#ab4aba',
		plum10: '#a144af',
		plum11: '#953ea3',
		plum12: '#53195d'
	},
	Tg = {
		purple1: '#fefcfe',
		purple2: '#fbf7fe',
		purple3: '#f7edfe',
		purple4: '#f2e2fc',
		purple5: '#ead5f9',
		purple6: '#e0c4f4',
		purple7: '#d1afec',
		purple8: '#be93e4',
		purple9: '#8e4ec6',
		purple10: '#8347b9',
		purple11: '#8145b5',
		purple12: '#402060'
	},
	Og = {
		violet1: '#fdfcfe',
		violet2: '#faf8ff',
		violet3: '#f4f0fe',
		violet4: '#ebe4ff',
		violet5: '#e1d9ff',
		violet6: '#d4cafe',
		violet7: '#c2b5f5',
		violet8: '#aa99ec',
		violet9: '#6e56cf',
		violet10: '#654dc4',
		violet11: '#6550b9',
		violet12: '#2f265f'
	},
	$g = {
		iris1: '#fdfdff',
		iris2: '#f8f8ff',
		iris3: '#f0f1fe',
		iris4: '#e6e7ff',
		iris5: '#dadcff',
		iris6: '#cbcdff',
		iris7: '#b8baf8',
		iris8: '#9b9ef0',
		iris9: '#5b5bd6',
		iris10: '#5151cd',
		iris11: '#5753c6',
		iris12: '#272962'
	},
	Ag = {
		indigo1: '#fdfdfe',
		indigo2: '#f7f9ff',
		indigo3: '#edf2fe',
		indigo4: '#e1e9ff',
		indigo5: '#d2deff',
		indigo6: '#c1d0ff',
		indigo7: '#abbdf9',
		indigo8: '#8da4ef',
		indigo9: '#3e63dd',
		indigo10: '#3358d4',
		indigo11: '#3a5bc7',
		indigo12: '#1f2d5c'
	},
	kg = {
		blue1: '#fbfdff',
		blue2: '#f4faff',
		blue3: '#e6f4fe',
		blue4: '#d5efff',
		blue5: '#c2e5ff',
		blue6: '#acd8fc',
		blue7: '#8ec8f6',
		blue8: '#5eb1ef',
		blue9: '#0090ff',
		blue10: '#0588f0',
		blue11: '#0d74ce',
		blue12: '#113264'
	},
	Rg = {
		cyan1: '#fafdfe',
		cyan2: '#f2fafb',
		cyan3: '#def7f9',
		cyan4: '#caf1f6',
		cyan5: '#b5e9f0',
		cyan6: '#9ddde7',
		cyan7: '#7dcedc',
		cyan8: '#3db9cf',
		cyan9: '#00a2c7',
		cyan10: '#0797b9',
		cyan11: '#107d98',
		cyan12: '#0d3c48'
	},
	cc = {
		teal1: '#fafefd',
		teal2: '#f3fbf9',
		teal3: '#e0f8f3',
		teal4: '#ccf3ea',
		teal5: '#b8eae0',
		teal6: '#a1ded2',
		teal7: '#83cdc1',
		teal8: '#53b9ab',
		teal9: '#12a594',
		teal10: '#0d9b8a',
		teal11: '#008573',
		teal12: '#0d3d38'
	},
	Dg = {
		jade1: '#fbfefd',
		jade2: '#f4fbf7',
		jade3: '#e6f7ed',
		jade4: '#d6f1e3',
		jade5: '#c3e9d7',
		jade6: '#acdec8',
		jade7: '#8bceb6',
		jade8: '#56ba9f',
		jade9: '#29a383',
		jade10: '#26997b',
		jade11: '#208368',
		jade12: '#1d3b31'
	},
	Ng = {
		green1: '#fbfefc',
		green2: '#f4fbf6',
		green3: '#e6f6eb',
		green4: '#d6f1df',
		green5: '#c4e8d1',
		green6: '#adddc0',
		green7: '#8eceaa',
		green8: '#5bb98b',
		green9: '#30a46c',
		green10: '#2b9a66',
		green11: '#218358',
		green12: '#193b2d'
	},
	dc = {
		grass1: '#fbfefb',
		grass2: '#f5fbf5',
		grass3: '#e9f6e9',
		grass4: '#daf1db',
		grass5: '#c9e8ca',
		grass6: '#b2ddb5',
		grass7: '#94ce9a',
		grass8: '#65ba74',
		grass9: '#46a758',
		grass10: '#3e9b4f',
		grass11: '#2a7e3b',
		grass12: '#203c25'
	},
	Mg = {
		brown1: '#fefdfc',
		brown2: '#fcf9f6',
		brown3: '#f6eee7',
		brown4: '#f0e4d9',
		brown5: '#ebdaca',
		brown6: '#e4cdb7',
		brown7: '#dcbc9f',
		brown8: '#cea37e',
		brown9: '#ad7f58',
		brown10: '#a07553',
		brown11: '#815e46',
		brown12: '#3e332e'
	},
	Fg = {
		bronze1: '#fdfcfc',
		bronze2: '#fdf7f5',
		bronze3: '#f6edea',
		bronze4: '#efe4df',
		bronze5: '#e7d9d3',
		bronze6: '#dfcdc5',
		bronze7: '#d3bcb3',
		bronze8: '#c2a499',
		bronze9: '#a18072',
		bronze10: '#957468',
		bronze11: '#7d5e54',
		bronze12: '#43302b'
	},
	Lg = {
		gold1: '#fdfdfc',
		gold2: '#faf9f2',
		gold3: '#f2f0e7',
		gold4: '#eae6db',
		gold5: '#e1dccf',
		gold6: '#d8d0bf',
		gold7: '#cbc0aa',
		gold8: '#b9a88d',
		gold9: '#978365',
		gold10: '#8c7a5e',
		gold11: '#71624b',
		gold12: '#3b352b'
	},
	Gg = {
		sky1: '#f9feff',
		sky2: '#f1fafd',
		sky3: '#e1f6fd',
		sky4: '#d1f0fa',
		sky5: '#bee7f5',
		sky6: '#a9daed',
		sky7: '#8dcae3',
		sky8: '#60b3d7',
		sky9: '#7ce2fe',
		sky10: '#74daf8',
		sky11: '#00749e',
		sky12: '#1d3e56'
	},
	hc = {
		mint1: '#f9fefd',
		mint2: '#f2fbf9',
		mint3: '#ddf9f2',
		mint4: '#c8f4e9',
		mint5: '#b3ecde',
		mint6: '#9ce0d0',
		mint7: '#7ecfbd',
		mint8: '#4cbba5',
		mint9: '#86ead4',
		mint10: '#7de0cb',
		mint11: '#027864',
		mint12: '#16433c'
	},
	uc = {
		lime1: '#fcfdfa',
		lime2: '#f8faf3',
		lime3: '#eef6d6',
		lime4: '#e2f0bd',
		lime5: '#d3e7a6',
		lime6: '#c2da91',
		lime7: '#abc978',
		lime8: '#8db654',
		lime9: '#bdee63',
		lime10: '#b0e64c',
		lime11: '#5c7c2f',
		lime12: '#37401c'
	},
	Bg = {
		yellow1: '#fdfdf9',
		yellow2: '#fefce9',
		yellow3: '#fffab8',
		yellow4: '#fff394',
		yellow5: '#ffe770',
		yellow6: '#f3d768',
		yellow7: '#e4c767',
		yellow8: '#d5ae39',
		yellow9: '#ffe629',
		yellow10: '#ffdc00',
		yellow11: '#9e6c00',
		yellow12: '#473b1f'
	},
	fc = {
		amber1: '#fefdfb',
		amber2: '#fefbe9',
		amber3: '#fff7c2',
		amber4: '#ffee9c',
		amber5: '#fbe577',
		amber6: '#f3d673',
		amber7: '#e9c162',
		amber8: '#e2a336',
		amber9: '#ffc53d',
		amber10: '#ffba18',
		amber11: '#ab6400',
		amber12: '#4f3422'
	},
	Vg = {
		orange1: '#fefcfb',
		orange2: '#fff7ed',
		orange3: '#ffefd6',
		orange4: '#ffdfb5',
		orange5: '#ffd19a',
		orange6: '#ffc182',
		orange7: '#f5ae73',
		orange8: '#ec9455',
		orange9: '#f76b15',
		orange10: '#ef5f00',
		orange11: '#cc4e00',
		orange12: '#582d1d'
	},
	li = {
		neutral: { radixId: 'olive', radixLightValue: sc, radixDarkValue: ec },
		primary: { radixId: 'grass', radixLightValue: dc, radixDarkValue: nc },
		secondary: { radixId: 'teal', radixLightValue: cc, radixDarkValue: rc },
		accent: { radixId: 'lime', radixLightValue: uc, radixDarkValue: ac },
		destructive: { radixId: 'tomato', radixLightValue: lc, radixDarkValue: tc },
		warning: { radixId: 'amber', radixLightValue: fc, radixDarkValue: oc },
		success: { radixId: 'mint', radixLightValue: hc, radixDarkValue: ic },
		gray: { radixId: 'gray', radixLightValue: yg, radixDarkValue: Y1 },
		mauve: { radixId: 'mauve', radixLightValue: bg, radixDarkValue: X1 },
		slate: { radixId: 'slate', radixLightValue: _g, radixDarkValue: q1 },
		sage: { radixId: 'sage', radixLightValue: Sg, radixDarkValue: Q1 },
		olive: { radixId: 'olive', radixLightValue: sc, radixDarkValue: ec },
		sand: { radixId: 'sand', radixLightValue: wg, radixDarkValue: J1 },
		tomato: { radixId: 'tomato', radixLightValue: lc, radixDarkValue: tc },
		red: { radixId: 'red', radixLightValue: Ig, radixDarkValue: Z1 },
		ruby: { radixId: 'ruby', radixLightValue: xg, radixDarkValue: eg },
		crimson: { radixId: 'crimson', radixLightValue: Cg, radixDarkValue: tg },
		pink: { radixId: 'pink', radixLightValue: Eg, radixDarkValue: rg },
		plum: { radixId: 'plum', radixLightValue: Pg, radixDarkValue: ng },
		purple: { radixId: 'purple', radixLightValue: Tg, radixDarkValue: ig },
		violet: { radixId: 'violet', radixLightValue: Og, radixDarkValue: ag },
		iris: { radixId: 'iris', radixLightValue: $g, radixDarkValue: og },
		indigo: { radixId: 'indigo', radixLightValue: Ag, radixDarkValue: sg },
		blue: { radixId: 'blue', radixLightValue: kg, radixDarkValue: lg },
		cyan: { radixId: 'cyan', radixLightValue: Rg, radixDarkValue: cg },
		teal: { radixId: 'teal', radixLightValue: cc, radixDarkValue: rc },
		jade: { radixId: 'jade', radixLightValue: Dg, radixDarkValue: dg },
		green: { radixId: 'green', radixLightValue: Ng, radixDarkValue: hg },
		grass: { radixId: 'grass', radixLightValue: dc, radixDarkValue: nc },
		bronze: { radixId: 'bronze', radixLightValue: Fg, radixDarkValue: fg },
		gold: { radixId: 'gold', radixLightValue: Lg, radixDarkValue: gg },
		brown: { radixId: 'brown', radixLightValue: Mg, radixDarkValue: ug },
		orange: { radixId: 'orange', radixLightValue: Vg, radixDarkValue: vg },
		amber: { radixId: 'amber', radixLightValue: fc, radixDarkValue: oc },
		yellow: { radixId: 'yellow', radixLightValue: Bg, radixDarkValue: mg },
		lime: { radixId: 'lime', radixLightValue: uc, radixDarkValue: ac },
		mint: { radixId: 'mint', radixLightValue: hc, radixDarkValue: ic },
		sky: { radixId: 'sky', radixLightValue: Gg, radixDarkValue: pg }
	};
function vt(r, e, t) {
	const n = `${li[r].radixId}${e}`;
	return t == 'light'
		? li[r].radixLightValue[n]
		: t == 'dark'
			? li[r].radixDarkValue[n]
			: li[r].radixLightValue[n];
}
function Pt(r, e) {
	const t = 10 ** e;
	return Math.round(r * t) / t;
}
var Ys = { exports: {} },
	Yi = {},
	Nh = {},
	Q = {};
(function (r) {
	Object.defineProperty(r, '__esModule', { value: !0 }),
		(r._registerNode = r.Konva = r.glob = void 0);
	const e = Math.PI / 180;
	function t() {
		return (
			typeof window < 'u' &&
			({}.toString.call(window) === '[object Window]' ||
				{}.toString.call(window) === '[object global]')
		);
	}
	(r.glob =
		typeof Wt < 'u'
			? Wt
			: typeof window < 'u'
				? window
				: typeof WorkerGlobalScope < 'u'
					? self
					: {}),
		(r.Konva = {
			_global: r.glob,
			version: '9.3.20',
			isBrowser: t(),
			isUnminified: /param/.test(function (i) {}.toString()),
			dblClickWindow: 400,
			getAngle(i) {
				return r.Konva.angleDeg ? i * e : i;
			},
			enableTrace: !1,
			pointerEventsEnabled: !0,
			autoDrawEnabled: !0,
			hitOnDragEnabled: !1,
			capturePointerEventsEnabled: !1,
			_mouseListenClick: !1,
			_touchListenClick: !1,
			_pointerListenClick: !1,
			_mouseInDblClickWindow: !1,
			_touchInDblClickWindow: !1,
			_pointerInDblClickWindow: !1,
			_mouseDblClickPointerId: null,
			_touchDblClickPointerId: null,
			_pointerDblClickPointerId: null,
			_fixTextRendering: !1,
			pixelRatio: (typeof window < 'u' && window.devicePixelRatio) || 1,
			dragDistance: 3,
			angleDeg: !0,
			showWarnings: !0,
			dragButtons: [0, 1],
			isDragging() {
				return r.Konva.DD.isDragging;
			},
			isTransforming() {
				var i;
				return (i = r.Konva.Transformer) === null || i === void 0
					? void 0
					: i.isTransforming();
			},
			isDragReady() {
				return !!r.Konva.DD.node;
			},
			releaseCanvasOnDestroy: !0,
			document: r.glob.document,
			_injectGlobal(i) {
				r.glob.Konva = i;
			}
		});
	const n = (i) => {
		r.Konva[i.prototype.getClassName()] = i;
	};
	(r._registerNode = n), r.Konva._injectGlobal(r.Konva);
})(Q);
var ye = {};
(function (r) {
	Object.defineProperty(r, '__esModule', { value: !0 }),
		(r.Util = r.Transform = void 0);
	const e = Q;
	class t {
		constructor(b = [1, 0, 0, 1, 0, 0]) {
			(this.dirty = !1), (this.m = (b && b.slice()) || [1, 0, 0, 1, 0, 0]);
		}
		reset() {
			(this.m[0] = 1),
				(this.m[1] = 0),
				(this.m[2] = 0),
				(this.m[3] = 1),
				(this.m[4] = 0),
				(this.m[5] = 0);
		}
		copy() {
			return new t(this.m);
		}
		copyInto(b) {
			(b.m[0] = this.m[0]),
				(b.m[1] = this.m[1]),
				(b.m[2] = this.m[2]),
				(b.m[3] = this.m[3]),
				(b.m[4] = this.m[4]),
				(b.m[5] = this.m[5]);
		}
		point(b) {
			const x = this.m;
			return { x: x[0] * b.x + x[2] * b.y + x[4], y: x[1] * b.x + x[3] * b.y + x[5] };
		}
		translate(b, x) {
			return (
				(this.m[4] += this.m[0] * b + this.m[2] * x),
				(this.m[5] += this.m[1] * b + this.m[3] * x),
				this
			);
		}
		scale(b, x) {
			return (
				(this.m[0] *= b), (this.m[1] *= b), (this.m[2] *= x), (this.m[3] *= x), this
			);
		}
		rotate(b) {
			const x = Math.cos(b),
				C = Math.sin(b),
				O = this.m[0] * x + this.m[2] * C,
				I = this.m[1] * x + this.m[3] * C,
				T = this.m[0] * -C + this.m[2] * x,
				w = this.m[1] * -C + this.m[3] * x;
			return (this.m[0] = O), (this.m[1] = I), (this.m[2] = T), (this.m[3] = w), this;
		}
		getTranslation() {
			return { x: this.m[4], y: this.m[5] };
		}
		skew(b, x) {
			const C = this.m[0] + this.m[2] * x,
				O = this.m[1] + this.m[3] * x,
				I = this.m[2] + this.m[0] * b,
				T = this.m[3] + this.m[1] * b;
			return (this.m[0] = C), (this.m[1] = O), (this.m[2] = I), (this.m[3] = T), this;
		}
		multiply(b) {
			const x = this.m[0] * b.m[0] + this.m[2] * b.m[1],
				C = this.m[1] * b.m[0] + this.m[3] * b.m[1],
				O = this.m[0] * b.m[2] + this.m[2] * b.m[3],
				I = this.m[1] * b.m[2] + this.m[3] * b.m[3],
				T = this.m[0] * b.m[4] + this.m[2] * b.m[5] + this.m[4],
				w = this.m[1] * b.m[4] + this.m[3] * b.m[5] + this.m[5];
			return (
				(this.m[0] = x),
				(this.m[1] = C),
				(this.m[2] = O),
				(this.m[3] = I),
				(this.m[4] = T),
				(this.m[5] = w),
				this
			);
		}
		invert() {
			const b = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]),
				x = this.m[3] * b,
				C = -this.m[1] * b,
				O = -this.m[2] * b,
				I = this.m[0] * b,
				T = b * (this.m[2] * this.m[5] - this.m[3] * this.m[4]),
				w = b * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
			return (
				(this.m[0] = x),
				(this.m[1] = C),
				(this.m[2] = O),
				(this.m[3] = I),
				(this.m[4] = T),
				(this.m[5] = w),
				this
			);
		}
		getMatrix() {
			return this.m;
		}
		decompose() {
			const b = this.m[0],
				x = this.m[1],
				C = this.m[2],
				O = this.m[3],
				I = this.m[4],
				T = this.m[5],
				w = b * O - x * C,
				P = { x: I, y: T, rotation: 0, scaleX: 0, scaleY: 0, skewX: 0, skewY: 0 };
			if (b != 0 || x != 0) {
				const $ = Math.sqrt(b * b + x * x);
				(P.rotation = x > 0 ? Math.acos(b / $) : -Math.acos(b / $)),
					(P.scaleX = $),
					(P.scaleY = w / $),
					(P.skewX = (b * C + x * O) / w),
					(P.skewY = 0);
			} else if (C != 0 || O != 0) {
				const $ = Math.sqrt(C * C + O * O);
				(P.rotation = Math.PI / 2 - (O > 0 ? Math.acos(-C / $) : -Math.acos(C / $))),
					(P.scaleX = w / $),
					(P.scaleY = $),
					(P.skewX = 0),
					(P.skewY = (b * C + x * O) / w);
			}
			return (P.rotation = r.Util._getRotation(P.rotation)), P;
		}
	}
	r.Transform = t;
	const n = '[object Array]',
		i = '[object Number]',
		a = '[object String]',
		o = '[object Boolean]',
		s = Math.PI / 180,
		l = 180 / Math.PI,
		c = '#',
		u = '',
		f = '0',
		g = 'Konva warning: ',
		h = 'Konva error: ',
		d = 'rgb(',
		m = {
			aliceblue: [240, 248, 255],
			antiquewhite: [250, 235, 215],
			aqua: [0, 255, 255],
			aquamarine: [127, 255, 212],
			azure: [240, 255, 255],
			beige: [245, 245, 220],
			bisque: [255, 228, 196],
			black: [0, 0, 0],
			blanchedalmond: [255, 235, 205],
			blue: [0, 0, 255],
			blueviolet: [138, 43, 226],
			brown: [165, 42, 42],
			burlywood: [222, 184, 135],
			cadetblue: [95, 158, 160],
			chartreuse: [127, 255, 0],
			chocolate: [210, 105, 30],
			coral: [255, 127, 80],
			cornflowerblue: [100, 149, 237],
			cornsilk: [255, 248, 220],
			crimson: [220, 20, 60],
			cyan: [0, 255, 255],
			darkblue: [0, 0, 139],
			darkcyan: [0, 139, 139],
			darkgoldenrod: [184, 132, 11],
			darkgray: [169, 169, 169],
			darkgreen: [0, 100, 0],
			darkgrey: [169, 169, 169],
			darkkhaki: [189, 183, 107],
			darkmagenta: [139, 0, 139],
			darkolivegreen: [85, 107, 47],
			darkorange: [255, 140, 0],
			darkorchid: [153, 50, 204],
			darkred: [139, 0, 0],
			darksalmon: [233, 150, 122],
			darkseagreen: [143, 188, 143],
			darkslateblue: [72, 61, 139],
			darkslategray: [47, 79, 79],
			darkslategrey: [47, 79, 79],
			darkturquoise: [0, 206, 209],
			darkviolet: [148, 0, 211],
			deeppink: [255, 20, 147],
			deepskyblue: [0, 191, 255],
			dimgray: [105, 105, 105],
			dimgrey: [105, 105, 105],
			dodgerblue: [30, 144, 255],
			firebrick: [178, 34, 34],
			floralwhite: [255, 255, 240],
			forestgreen: [34, 139, 34],
			fuchsia: [255, 0, 255],
			gainsboro: [220, 220, 220],
			ghostwhite: [248, 248, 255],
			gold: [255, 215, 0],
			goldenrod: [218, 165, 32],
			gray: [128, 128, 128],
			green: [0, 128, 0],
			greenyellow: [173, 255, 47],
			grey: [128, 128, 128],
			honeydew: [240, 255, 240],
			hotpink: [255, 105, 180],
			indianred: [205, 92, 92],
			indigo: [75, 0, 130],
			ivory: [255, 255, 240],
			khaki: [240, 230, 140],
			lavender: [230, 230, 250],
			lavenderblush: [255, 240, 245],
			lawngreen: [124, 252, 0],
			lemonchiffon: [255, 250, 205],
			lightblue: [173, 216, 230],
			lightcoral: [240, 128, 128],
			lightcyan: [224, 255, 255],
			lightgoldenrodyellow: [250, 250, 210],
			lightgray: [211, 211, 211],
			lightgreen: [144, 238, 144],
			lightgrey: [211, 211, 211],
			lightpink: [255, 182, 193],
			lightsalmon: [255, 160, 122],
			lightseagreen: [32, 178, 170],
			lightskyblue: [135, 206, 250],
			lightslategray: [119, 136, 153],
			lightslategrey: [119, 136, 153],
			lightsteelblue: [176, 196, 222],
			lightyellow: [255, 255, 224],
			lime: [0, 255, 0],
			limegreen: [50, 205, 50],
			linen: [250, 240, 230],
			magenta: [255, 0, 255],
			maroon: [128, 0, 0],
			mediumaquamarine: [102, 205, 170],
			mediumblue: [0, 0, 205],
			mediumorchid: [186, 85, 211],
			mediumpurple: [147, 112, 219],
			mediumseagreen: [60, 179, 113],
			mediumslateblue: [123, 104, 238],
			mediumspringgreen: [0, 250, 154],
			mediumturquoise: [72, 209, 204],
			mediumvioletred: [199, 21, 133],
			midnightblue: [25, 25, 112],
			mintcream: [245, 255, 250],
			mistyrose: [255, 228, 225],
			moccasin: [255, 228, 181],
			navajowhite: [255, 222, 173],
			navy: [0, 0, 128],
			oldlace: [253, 245, 230],
			olive: [128, 128, 0],
			olivedrab: [107, 142, 35],
			orange: [255, 165, 0],
			orangered: [255, 69, 0],
			orchid: [218, 112, 214],
			palegoldenrod: [238, 232, 170],
			palegreen: [152, 251, 152],
			paleturquoise: [175, 238, 238],
			palevioletred: [219, 112, 147],
			papayawhip: [255, 239, 213],
			peachpuff: [255, 218, 185],
			peru: [205, 133, 63],
			pink: [255, 192, 203],
			plum: [221, 160, 203],
			powderblue: [176, 224, 230],
			purple: [128, 0, 128],
			rebeccapurple: [102, 51, 153],
			red: [255, 0, 0],
			rosybrown: [188, 143, 143],
			royalblue: [65, 105, 225],
			saddlebrown: [139, 69, 19],
			salmon: [250, 128, 114],
			sandybrown: [244, 164, 96],
			seagreen: [46, 139, 87],
			seashell: [255, 245, 238],
			sienna: [160, 82, 45],
			silver: [192, 192, 192],
			skyblue: [135, 206, 235],
			slateblue: [106, 90, 205],
			slategray: [119, 128, 144],
			slategrey: [119, 128, 144],
			snow: [255, 255, 250],
			springgreen: [0, 255, 127],
			steelblue: [70, 130, 180],
			tan: [210, 180, 140],
			teal: [0, 128, 128],
			thistle: [216, 191, 216],
			transparent: [255, 255, 255, 0],
			tomato: [255, 99, 71],
			turquoise: [64, 224, 208],
			violet: [238, 130, 238],
			wheat: [245, 222, 179],
			white: [255, 255, 255],
			whitesmoke: [245, 245, 245],
			yellow: [255, 255, 0],
			yellowgreen: [154, 205, 5]
		},
		y = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
	let v = [];
	const S =
		(typeof requestAnimationFrame < 'u' && requestAnimationFrame) ||
		function (p) {
			setTimeout(p, 60);
		};
	r.Util = {
		_isElement(p) {
			return !!(p && p.nodeType == 1);
		},
		_isFunction(p) {
			return !!(p && p.constructor && p.call && p.apply);
		},
		_isPlainObject(p) {
			return !!p && p.constructor === Object;
		},
		_isArray(p) {
			return Object.prototype.toString.call(p) === n;
		},
		_isNumber(p) {
			return Object.prototype.toString.call(p) === i && !isNaN(p) && isFinite(p);
		},
		_isString(p) {
			return Object.prototype.toString.call(p) === a;
		},
		_isBoolean(p) {
			return Object.prototype.toString.call(p) === o;
		},
		isObject(p) {
			return p instanceof Object;
		},
		isValidSelector(p) {
			if (typeof p != 'string') return !1;
			const b = p[0];
			return b === '#' || b === '.' || b === b.toUpperCase();
		},
		_sign(p) {
			return p === 0 || p > 0 ? 1 : -1;
		},
		requestAnimFrame(p) {
			v.push(p),
				v.length === 1 &&
					S(function () {
						const b = v;
						(v = []),
							b.forEach(function (x) {
								x();
							});
					});
		},
		createCanvasElement() {
			const p = document.createElement('canvas');
			try {
				p.style = p.style || {};
			} catch {}
			return p;
		},
		createImageElement() {
			return document.createElement('img');
		},
		_isInDocument(p) {
			for (; (p = p.parentNode); ) if (p == document) return !0;
			return !1;
		},
		_urlToImage(p, b) {
			const x = r.Util.createImageElement();
			(x.onload = function () {
				b(x);
			}),
				(x.src = p);
		},
		_rgbToHex(p, b, x) {
			return ((1 << 24) + (p << 16) + (b << 8) + x).toString(16).slice(1);
		},
		_hexToRgb(p) {
			p = p.replace(c, u);
			const b = parseInt(p, 16);
			return { r: (b >> 16) & 255, g: (b >> 8) & 255, b: b & 255 };
		},
		getRandomColor() {
			let p = ((Math.random() * 16777215) << 0).toString(16);
			for (; p.length < 6; ) p = f + p;
			return c + p;
		},
		getRGB(p) {
			let b;
			return p in m
				? ((b = m[p]), { r: b[0], g: b[1], b: b[2] })
				: p[0] === c
					? this._hexToRgb(p.substring(1))
					: p.substr(0, 4) === d
						? ((b = y.exec(p.replace(/ /g, ''))),
							{ r: parseInt(b[1], 10), g: parseInt(b[2], 10), b: parseInt(b[3], 10) })
						: { r: 0, g: 0, b: 0 };
		},
		colorToRGBA(p) {
			return (
				(p = p || 'black'),
				r.Util._namedColorToRBA(p) ||
					r.Util._hex3ColorToRGBA(p) ||
					r.Util._hex4ColorToRGBA(p) ||
					r.Util._hex6ColorToRGBA(p) ||
					r.Util._hex8ColorToRGBA(p) ||
					r.Util._rgbColorToRGBA(p) ||
					r.Util._rgbaColorToRGBA(p) ||
					r.Util._hslColorToRGBA(p)
			);
		},
		_namedColorToRBA(p) {
			const b = m[p.toLowerCase()];
			return b ? { r: b[0], g: b[1], b: b[2], a: 1 } : null;
		},
		_rgbColorToRGBA(p) {
			if (p.indexOf('rgb(') === 0) {
				p = p.match(/rgb\(([^)]+)\)/)[1];
				const b = p.split(/ *, */).map(Number);
				return { r: b[0], g: b[1], b: b[2], a: 1 };
			}
		},
		_rgbaColorToRGBA(p) {
			if (p.indexOf('rgba(') === 0) {
				p = p.match(/rgba\(([^)]+)\)/)[1];
				const b = p
					.split(/ *, */)
					.map((x, C) =>
						x.slice(-1) === '%'
							? C === 3
								? parseInt(x) / 100
								: (parseInt(x) / 100) * 255
							: Number(x)
					);
				return { r: b[0], g: b[1], b: b[2], a: b[3] };
			}
		},
		_hex8ColorToRGBA(p) {
			if (p[0] === '#' && p.length === 9)
				return {
					r: parseInt(p.slice(1, 3), 16),
					g: parseInt(p.slice(3, 5), 16),
					b: parseInt(p.slice(5, 7), 16),
					a: parseInt(p.slice(7, 9), 16) / 255
				};
		},
		_hex6ColorToRGBA(p) {
			if (p[0] === '#' && p.length === 7)
				return {
					r: parseInt(p.slice(1, 3), 16),
					g: parseInt(p.slice(3, 5), 16),
					b: parseInt(p.slice(5, 7), 16),
					a: 1
				};
		},
		_hex4ColorToRGBA(p) {
			if (p[0] === '#' && p.length === 5)
				return {
					r: parseInt(p[1] + p[1], 16),
					g: parseInt(p[2] + p[2], 16),
					b: parseInt(p[3] + p[3], 16),
					a: parseInt(p[4] + p[4], 16) / 255
				};
		},
		_hex3ColorToRGBA(p) {
			if (p[0] === '#' && p.length === 4)
				return {
					r: parseInt(p[1] + p[1], 16),
					g: parseInt(p[2] + p[2], 16),
					b: parseInt(p[3] + p[3], 16),
					a: 1
				};
		},
		_hslColorToRGBA(p) {
			if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(p)) {
				const [b, ...x] = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(p),
					C = Number(x[0]) / 360,
					O = Number(x[1]) / 100,
					I = Number(x[2]) / 100;
				let T, w, P;
				if (O === 0)
					return (
						(P = I * 255),
						{ r: Math.round(P), g: Math.round(P), b: Math.round(P), a: 1 }
					);
				I < 0.5 ? (T = I * (1 + O)) : (T = I + O - I * O);
				const $ = 2 * I - T,
					N = [0, 0, 0];
				for (let M = 0; M < 3; M++)
					(w = C + (1 / 3) * -(M - 1)),
						w < 0 && w++,
						w > 1 && w--,
						6 * w < 1
							? (P = $ + (T - $) * 6 * w)
							: 2 * w < 1
								? (P = T)
								: 3 * w < 2
									? (P = $ + (T - $) * (2 / 3 - w) * 6)
									: (P = $),
						(N[M] = P * 255);
				return { r: Math.round(N[0]), g: Math.round(N[1]), b: Math.round(N[2]), a: 1 };
			}
		},
		haveIntersection(p, b) {
			return !(
				b.x > p.x + p.width ||
				b.x + b.width < p.x ||
				b.y > p.y + p.height ||
				b.y + b.height < p.y
			);
		},
		cloneObject(p) {
			const b = {};
			for (const x in p)
				this._isPlainObject(p[x])
					? (b[x] = this.cloneObject(p[x]))
					: this._isArray(p[x])
						? (b[x] = this.cloneArray(p[x]))
						: (b[x] = p[x]);
			return b;
		},
		cloneArray(p) {
			return p.slice(0);
		},
		degToRad(p) {
			return p * s;
		},
		radToDeg(p) {
			return p * l;
		},
		_degToRad(p) {
			return (
				r.Util.warn(
					'Util._degToRad is removed. Please use public Util.degToRad instead.'
				),
				r.Util.degToRad(p)
			);
		},
		_radToDeg(p) {
			return (
				r.Util.warn(
					'Util._radToDeg is removed. Please use public Util.radToDeg instead.'
				),
				r.Util.radToDeg(p)
			);
		},
		_getRotation(p) {
			return e.Konva.angleDeg ? r.Util.radToDeg(p) : p;
		},
		_capitalize(p) {
			return p.charAt(0).toUpperCase() + p.slice(1);
		},
		throw(p) {
			throw new Error(h + p);
		},
		error(p) {
			console.error(h + p);
		},
		warn(p) {
			e.Konva.showWarnings && console.warn(g + p);
		},
		each(p, b) {
			for (const x in p) b(x, p[x]);
		},
		_inRange(p, b, x) {
			return b <= p && p < x;
		},
		_getProjectionToSegment(p, b, x, C, O, I) {
			let T, w, P;
			const $ = (p - x) * (p - x) + (b - C) * (b - C);
			if ($ == 0) (T = p), (w = b), (P = (O - x) * (O - x) + (I - C) * (I - C));
			else {
				const N = ((O - p) * (x - p) + (I - b) * (C - b)) / $;
				N < 0
					? ((T = p), (w = b), (P = (p - O) * (p - O) + (b - I) * (b - I)))
					: N > 1
						? ((T = x), (w = C), (P = (x - O) * (x - O) + (C - I) * (C - I)))
						: ((T = p + N * (x - p)),
							(w = b + N * (C - b)),
							(P = (T - O) * (T - O) + (w - I) * (w - I)));
			}
			return [T, w, P];
		},
		_getProjectionToLine(p, b, x) {
			const C = r.Util.cloneObject(p);
			let O = Number.MAX_VALUE;
			return (
				b.forEach(function (I, T) {
					if (!x && T === b.length - 1) return;
					const w = b[(T + 1) % b.length],
						P = r.Util._getProjectionToSegment(I.x, I.y, w.x, w.y, p.x, p.y),
						$ = P[0],
						N = P[1],
						M = P[2];
					M < O && ((C.x = $), (C.y = N), (O = M));
				}),
				C
			);
		},
		_prepareArrayForTween(p, b, x) {
			const C = [],
				O = [];
			if (p.length > b.length) {
				const T = b;
				(b = p), (p = T);
			}
			for (let T = 0; T < p.length; T += 2) C.push({ x: p[T], y: p[T + 1] });
			for (let T = 0; T < b.length; T += 2) O.push({ x: b[T], y: b[T + 1] });
			const I = [];
			return (
				O.forEach(function (T) {
					const w = r.Util._getProjectionToLine(T, C, x);
					I.push(w.x), I.push(w.y);
				}),
				I
			);
		},
		_prepareToStringify(p) {
			let b;
			p.visitedByCircularReferenceRemoval = !0;
			for (const x in p)
				if (p.hasOwnProperty(x) && p[x] && typeof p[x] == 'object') {
					if (
						((b = Object.getOwnPropertyDescriptor(p, x)),
						p[x].visitedByCircularReferenceRemoval || r.Util._isElement(p[x]))
					)
						if (b.configurable) delete p[x];
						else return null;
					else if (r.Util._prepareToStringify(p[x]) === null)
						if (b.configurable) delete p[x];
						else return null;
				}
			return delete p.visitedByCircularReferenceRemoval, p;
		},
		_assign(p, b) {
			for (const x in b) p[x] = b[x];
			return p;
		},
		_getFirstPointerId(p) {
			return p.touches ? p.changedTouches[0].identifier : p.pointerId || 999;
		},
		releaseCanvas(...p) {
			e.Konva.releaseCanvasOnDestroy &&
				p.forEach((b) => {
					(b.width = 0), (b.height = 0);
				});
		},
		drawRoundedRectPath(p, b, x, C) {
			let O = 0,
				I = 0,
				T = 0,
				w = 0;
			typeof C == 'number'
				? (O = I = T = w = Math.min(C, b / 2, x / 2))
				: ((O = Math.min(C[0] || 0, b / 2, x / 2)),
					(I = Math.min(C[1] || 0, b / 2, x / 2)),
					(w = Math.min(C[2] || 0, b / 2, x / 2)),
					(T = Math.min(C[3] || 0, b / 2, x / 2))),
				p.moveTo(O, 0),
				p.lineTo(b - I, 0),
				p.arc(b - I, I, I, (Math.PI * 3) / 2, 0, !1),
				p.lineTo(b, x - w),
				p.arc(b - w, x - w, w, 0, Math.PI / 2, !1),
				p.lineTo(T, x),
				p.arc(T, x - T, T, Math.PI / 2, Math.PI, !1),
				p.lineTo(0, O),
				p.arc(O, O, O, Math.PI, (Math.PI * 3) / 2, !1);
		}
	};
})(ye);
var me = {},
	J = {},
	H = {};
Object.defineProperty(H, '__esModule', { value: !0 });
H.RGBComponent = Ug;
H.alphaComponent = jg;
H.getNumberValidator = zg;
H.getNumberOrArrayOfNumbersValidator = Hg;
H.getNumberOrAutoValidator = Wg;
H.getStringValidator = Kg;
H.getStringOrGradientValidator = Yg;
H.getFunctionValidator = Xg;
H.getNumberArrayValidator = qg;
H.getBooleanValidator = Qg;
H.getComponentValidator = Jg;
const Mt = Q,
	_e = ye;
function Ft(r) {
	return _e.Util._isString(r)
		? '"' + r + '"'
		: Object.prototype.toString.call(r) === '[object Number]' || _e.Util._isBoolean(r)
			? r
			: Object.prototype.toString.call(r);
}
function Ug(r) {
	return r > 255 ? 255 : r < 0 ? 0 : Math.round(r);
}
function jg(r) {
	return r > 1 ? 1 : r < 1e-4 ? 1e-4 : r;
}
function zg() {
	if (Mt.Konva.isUnminified)
		return function (r, e) {
			return (
				_e.Util._isNumber(r) ||
					_e.Util.warn(
						Ft(r) +
							' is a not valid value for "' +
							e +
							'" attribute. The value should be a number.'
					),
				r
			);
		};
}
function Hg(r) {
	if (Mt.Konva.isUnminified)
		return function (e, t) {
			let n = _e.Util._isNumber(e),
				i = _e.Util._isArray(e) && e.length == r;
			return (
				!n &&
					!i &&
					_e.Util.warn(
						Ft(e) +
							' is a not valid value for "' +
							t +
							'" attribute. The value should be a number or Array<number>(' +
							r +
							')'
					),
				e
			);
		};
}
function Wg() {
	if (Mt.Konva.isUnminified)
		return function (r, e) {
			var t = _e.Util._isNumber(r),
				n = r === 'auto';
			return (
				t ||
					n ||
					_e.Util.warn(
						Ft(r) +
							' is a not valid value for "' +
							e +
							'" attribute. The value should be a number or "auto".'
					),
				r
			);
		};
}
function Kg() {
	if (Mt.Konva.isUnminified)
		return function (r, e) {
			return (
				_e.Util._isString(r) ||
					_e.Util.warn(
						Ft(r) +
							' is a not valid value for "' +
							e +
							'" attribute. The value should be a string.'
					),
				r
			);
		};
}
function Yg() {
	if (Mt.Konva.isUnminified)
		return function (r, e) {
			const t = _e.Util._isString(r),
				n =
					Object.prototype.toString.call(r) === '[object CanvasGradient]' ||
					(r && r.addColorStop);
			return (
				t ||
					n ||
					_e.Util.warn(
						Ft(r) +
							' is a not valid value for "' +
							e +
							'" attribute. The value should be a string or a native gradient.'
					),
				r
			);
		};
}
function Xg() {
	if (Mt.Konva.isUnminified)
		return function (r, e) {
			return (
				_e.Util._isFunction(r) ||
					_e.Util.warn(
						Ft(r) +
							' is a not valid value for "' +
							e +
							'" attribute. The value should be a function.'
					),
				r
			);
		};
}
function qg() {
	if (Mt.Konva.isUnminified)
		return function (r, e) {
			const t = Int8Array ? Object.getPrototypeOf(Int8Array) : null;
			return (
				(t && r instanceof t) ||
					(_e.Util._isArray(r)
						? r.forEach(function (n) {
								_e.Util._isNumber(n) ||
									_e.Util.warn(
										'"' +
											e +
											'" attribute has non numeric element ' +
											n +
											'. Make sure that all elements are numbers.'
									);
							})
						: _e.Util.warn(
								Ft(r) +
									' is a not valid value for "' +
									e +
									'" attribute. The value should be a array of numbers.'
							)),
				r
			);
		};
}
function Qg() {
	if (Mt.Konva.isUnminified)
		return function (r, e) {
			var t = r === !0 || r === !1;
			return (
				t ||
					_e.Util.warn(
						Ft(r) +
							' is a not valid value for "' +
							e +
							'" attribute. The value should be a boolean.'
					),
				r
			);
		};
}
function Jg(r) {
	if (Mt.Konva.isUnminified)
		return function (e, t) {
			return (
				e == null ||
					_e.Util.isObject(e) ||
					_e.Util.warn(
						Ft(e) +
							' is a not valid value for "' +
							t +
							'" attribute. The value should be an object with properties ' +
							r
					),
				e
			);
		};
}
(function (r) {
	Object.defineProperty(r, '__esModule', { value: !0 }), (r.Factory = void 0);
	const e = ye,
		t = H,
		n = 'get',
		i = 'set';
	r.Factory = {
		addGetterSetter(a, o, s, l, c) {
			r.Factory.addGetter(a, o, s),
				r.Factory.addSetter(a, o, l, c),
				r.Factory.addOverloadedGetterSetter(a, o);
		},
		addGetter(a, o, s) {
			var l = n + e.Util._capitalize(o);
			a.prototype[l] =
				a.prototype[l] ||
				function () {
					const c = this.attrs[o];
					return c === void 0 ? s : c;
				};
		},
		addSetter(a, o, s, l) {
			var c = i + e.Util._capitalize(o);
			a.prototype[c] || r.Factory.overWriteSetter(a, o, s, l);
		},
		overWriteSetter(a, o, s, l) {
			var c = i + e.Util._capitalize(o);
			a.prototype[c] = function (u) {
				return (
					s && u !== void 0 && u !== null && (u = s.call(this, u, o)),
					this._setAttr(o, u),
					l && l.call(this),
					this
				);
			};
		},
		addComponentsGetterSetter(a, o, s, l, c) {
			const u = s.length,
				f = e.Util._capitalize,
				g = n + f(o),
				h = i + f(o);
			a.prototype[g] = function () {
				const m = {};
				for (let y = 0; y < u; y++) {
					const v = s[y];
					m[v] = this.getAttr(o + f(v));
				}
				return m;
			};
			const d = (0, t.getComponentValidator)(s);
			(a.prototype[h] = function (m) {
				const y = this.attrs[o];
				l && (m = l.call(this, m, o)), d && d.call(this, m, o);
				for (const v in m) m.hasOwnProperty(v) && this._setAttr(o + f(v), m[v]);
				return (
					m ||
						s.forEach((v) => {
							this._setAttr(o + f(v), void 0);
						}),
					this._fireChangeEvent(o, y, m),
					c && c.call(this),
					this
				);
			}),
				r.Factory.addOverloadedGetterSetter(a, o);
		},
		addOverloadedGetterSetter(a, o) {
			var s = e.Util._capitalize(o),
				l = i + s,
				c = n + s;
			a.prototype[o] = function () {
				return arguments.length ? (this[l](arguments[0]), this) : this[c]();
			};
		},
		addDeprecatedGetterSetter(a, o, s, l) {
			e.Util.error('Adding deprecated ' + o);
			const c = n + e.Util._capitalize(o),
				u =
					o +
					' property is deprecated and will be removed soon. Look at Konva change log for more information.';
			(a.prototype[c] = function () {
				e.Util.error(u);
				const f = this.attrs[o];
				return f === void 0 ? s : f;
			}),
				r.Factory.addSetter(a, o, l, function () {
					e.Util.error(u);
				}),
				r.Factory.addOverloadedGetterSetter(a, o);
		},
		backCompat(a, o) {
			e.Util.each(o, function (s, l) {
				const c = a.prototype[l],
					u = n + e.Util._capitalize(s),
					f = i + e.Util._capitalize(s);
				function g() {
					c.apply(this, arguments),
						e.Util.error(
							'"' +
								s +
								'" method is deprecated and will be removed soon. Use ""' +
								l +
								'" instead.'
						);
				}
				(a.prototype[s] = g), (a.prototype[u] = g), (a.prototype[f] = g);
			});
		},
		afterSetFilter() {
			this._filterUpToDate = !1;
		}
	};
})(J);
var st = {},
	Rt = {};
Object.defineProperty(Rt, '__esModule', { value: !0 });
Rt.HitContext = Rt.SceneContext = Rt.Context = void 0;
const Mh = ye,
	Zg = Q;
function e2(r) {
	const e = [],
		t = r.length,
		n = Mh.Util;
	for (let i = 0; i < t; i++) {
		let a = r[i];
		n._isNumber(a) ? (a = Math.round(a * 1e3) / 1e3) : n._isString(a) || (a = a + ''),
			e.push(a);
	}
	return e;
}
const gc = ',',
	t2 = '(',
	r2 = ')',
	n2 = '([',
	i2 = '])',
	a2 = ';',
	o2 = '()',
	s2 = '=',
	pc = [
		'arc',
		'arcTo',
		'beginPath',
		'bezierCurveTo',
		'clearRect',
		'clip',
		'closePath',
		'createLinearGradient',
		'createPattern',
		'createRadialGradient',
		'drawImage',
		'ellipse',
		'fill',
		'fillText',
		'getImageData',
		'createImageData',
		'lineTo',
		'moveTo',
		'putImageData',
		'quadraticCurveTo',
		'rect',
		'roundRect',
		'restore',
		'rotate',
		'save',
		'scale',
		'setLineDash',
		'setTransform',
		'stroke',
		'strokeText',
		'transform',
		'translate'
	],
	l2 = [
		'fillStyle',
		'strokeStyle',
		'shadowColor',
		'shadowBlur',
		'shadowOffsetX',
		'shadowOffsetY',
		'letterSpacing',
		'lineCap',
		'lineDashOffset',
		'lineJoin',
		'lineWidth',
		'miterLimit',
		'direction',
		'font',
		'textAlign',
		'textBaseline',
		'globalAlpha',
		'globalCompositeOperation',
		'imageSmoothingEnabled'
	],
	c2 = 100;
class Xi {
	constructor(e) {
		(this.canvas = e),
			Zg.Konva.enableTrace && ((this.traceArr = []), this._enableTrace());
	}
	fillShape(e) {
		e.fillEnabled() && this._fill(e);
	}
	_fill(e) {}
	strokeShape(e) {
		e.hasStroke() && this._stroke(e);
	}
	_stroke(e) {}
	fillStrokeShape(e) {
		e.attrs.fillAfterStrokeEnabled
			? (this.strokeShape(e), this.fillShape(e))
			: (this.fillShape(e), this.strokeShape(e));
	}
	getTrace(e, t) {
		let n = this.traceArr,
			i = n.length,
			a = '',
			o,
			s,
			l,
			c;
		for (o = 0; o < i; o++)
			(s = n[o]),
				(l = s.method),
				l
					? ((c = s.args),
						(a += l),
						e
							? (a += o2)
							: Mh.Util._isArray(c[0])
								? (a += n2 + c.join(gc) + i2)
								: (t && (c = c.map((u) => (typeof u == 'number' ? Math.floor(u) : u))),
									(a += t2 + c.join(gc) + r2)))
					: ((a += s.property), e || (a += s2 + s.val)),
				(a += a2);
		return a;
	}
	clearTrace() {
		this.traceArr = [];
	}
	_trace(e) {
		let t = this.traceArr,
			n;
		t.push(e), (n = t.length), n >= c2 && t.shift();
	}
	reset() {
		const e = this.getCanvas().getPixelRatio();
		this.setTransform(1 * e, 0, 0, 1 * e, 0, 0);
	}
	getCanvas() {
		return this.canvas;
	}
	clear(e) {
		const t = this.getCanvas();
		e
			? this.clearRect(e.x || 0, e.y || 0, e.width || 0, e.height || 0)
			: this.clearRect(0, 0, t.getWidth() / t.pixelRatio, t.getHeight() / t.pixelRatio);
	}
	_applyLineCap(e) {
		const t = e.attrs.lineCap;
		t && this.setAttr('lineCap', t);
	}
	_applyOpacity(e) {
		const t = e.getAbsoluteOpacity();
		t !== 1 && this.setAttr('globalAlpha', t);
	}
	_applyLineJoin(e) {
		const t = e.attrs.lineJoin;
		t && this.setAttr('lineJoin', t);
	}
	setAttr(e, t) {
		this._context[e] = t;
	}
	arc(e, t, n, i, a, o) {
		this._context.arc(e, t, n, i, a, o);
	}
	arcTo(e, t, n, i, a) {
		this._context.arcTo(e, t, n, i, a);
	}
	beginPath() {
		this._context.beginPath();
	}
	bezierCurveTo(e, t, n, i, a, o) {
		this._context.bezierCurveTo(e, t, n, i, a, o);
	}
	clearRect(e, t, n, i) {
		this._context.clearRect(e, t, n, i);
	}
	clip(...e) {
		this._context.clip.apply(this._context, e);
	}
	closePath() {
		this._context.closePath();
	}
	createImageData(e, t) {
		const n = arguments;
		if (n.length === 2) return this._context.createImageData(e, t);
		if (n.length === 1) return this._context.createImageData(e);
	}
	createLinearGradient(e, t, n, i) {
		return this._context.createLinearGradient(e, t, n, i);
	}
	createPattern(e, t) {
		return this._context.createPattern(e, t);
	}
	createRadialGradient(e, t, n, i, a, o) {
		return this._context.createRadialGradient(e, t, n, i, a, o);
	}
	drawImage(e, t, n, i, a, o, s, l, c) {
		const u = arguments,
			f = this._context;
		u.length === 3
			? f.drawImage(e, t, n)
			: u.length === 5
				? f.drawImage(e, t, n, i, a)
				: u.length === 9 && f.drawImage(e, t, n, i, a, o, s, l, c);
	}
	ellipse(e, t, n, i, a, o, s, l) {
		this._context.ellipse(e, t, n, i, a, o, s, l);
	}
	isPointInPath(e, t, n, i) {
		return n
			? this._context.isPointInPath(n, e, t, i)
			: this._context.isPointInPath(e, t, i);
	}
	fill(...e) {
		this._context.fill.apply(this._context, e);
	}
	fillRect(e, t, n, i) {
		this._context.fillRect(e, t, n, i);
	}
	strokeRect(e, t, n, i) {
		this._context.strokeRect(e, t, n, i);
	}
	fillText(e, t, n, i) {
		i ? this._context.fillText(e, t, n, i) : this._context.fillText(e, t, n);
	}
	measureText(e) {
		return this._context.measureText(e);
	}
	getImageData(e, t, n, i) {
		return this._context.getImageData(e, t, n, i);
	}
	lineTo(e, t) {
		this._context.lineTo(e, t);
	}
	moveTo(e, t) {
		this._context.moveTo(e, t);
	}
	rect(e, t, n, i) {
		this._context.rect(e, t, n, i);
	}
	roundRect(e, t, n, i, a) {
		this._context.roundRect(e, t, n, i, a);
	}
	putImageData(e, t, n) {
		this._context.putImageData(e, t, n);
	}
	quadraticCurveTo(e, t, n, i) {
		this._context.quadraticCurveTo(e, t, n, i);
	}
	restore() {
		this._context.restore();
	}
	rotate(e) {
		this._context.rotate(e);
	}
	save() {
		this._context.save();
	}
	scale(e, t) {
		this._context.scale(e, t);
	}
	setLineDash(e) {
		this._context.setLineDash
			? this._context.setLineDash(e)
			: 'mozDash' in this._context
				? (this._context.mozDash = e)
				: 'webkitLineDash' in this._context && (this._context.webkitLineDash = e);
	}
	getLineDash() {
		return this._context.getLineDash();
	}
	setTransform(e, t, n, i, a, o) {
		this._context.setTransform(e, t, n, i, a, o);
	}
	stroke(e) {
		e ? this._context.stroke(e) : this._context.stroke();
	}
	strokeText(e, t, n, i) {
		this._context.strokeText(e, t, n, i);
	}
	transform(e, t, n, i, a, o) {
		this._context.transform(e, t, n, i, a, o);
	}
	translate(e, t) {
		this._context.translate(e, t);
	}
	_enableTrace() {
		let e = this,
			t = pc.length,
			n = this.setAttr,
			i,
			a;
		const o = function (s) {
			let l = e[s],
				c;
			e[s] = function () {
				return (
					(a = e2(Array.prototype.slice.call(arguments, 0))),
					(c = l.apply(e, arguments)),
					e._trace({ method: s, args: a }),
					c
				);
			};
		};
		for (i = 0; i < t; i++) o(pc[i]);
		e.setAttr = function () {
			n.apply(e, arguments);
			const s = arguments[0];
			let l = arguments[1];
			(s === 'shadowOffsetX' || s === 'shadowOffsetY' || s === 'shadowBlur') &&
				(l = l / this.canvas.getPixelRatio()),
				e._trace({ property: s, val: l });
		};
	}
	_applyGlobalCompositeOperation(e) {
		const t = e.attrs.globalCompositeOperation;
		!t || t === 'source-over' || this.setAttr('globalCompositeOperation', t);
	}
}
Rt.Context = Xi;
l2.forEach(function (r) {
	Object.defineProperty(Xi.prototype, r, {
		get() {
			return this._context[r];
		},
		set(e) {
			this._context[r] = e;
		}
	});
});
class d2 extends Xi {
	constructor(e, { willReadFrequently: t = !1 } = {}) {
		super(e), (this._context = e._canvas.getContext('2d', { willReadFrequently: t }));
	}
	_fillColor(e) {
		const t = e.fill();
		this.setAttr('fillStyle', t), e._fillFunc(this);
	}
	_fillPattern(e) {
		this.setAttr('fillStyle', e._getFillPattern()), e._fillFunc(this);
	}
	_fillLinearGradient(e) {
		const t = e._getLinearGradient();
		t && (this.setAttr('fillStyle', t), e._fillFunc(this));
	}
	_fillRadialGradient(e) {
		const t = e._getRadialGradient();
		t && (this.setAttr('fillStyle', t), e._fillFunc(this));
	}
	_fill(e) {
		const t = e.fill(),
			n = e.getFillPriority();
		if (t && n === 'color') {
			this._fillColor(e);
			return;
		}
		const i = e.getFillPatternImage();
		if (i && n === 'pattern') {
			this._fillPattern(e);
			return;
		}
		const a = e.getFillLinearGradientColorStops();
		if (a && n === 'linear-gradient') {
			this._fillLinearGradient(e);
			return;
		}
		const o = e.getFillRadialGradientColorStops();
		if (o && n === 'radial-gradient') {
			this._fillRadialGradient(e);
			return;
		}
		t
			? this._fillColor(e)
			: i
				? this._fillPattern(e)
				: a
					? this._fillLinearGradient(e)
					: o && this._fillRadialGradient(e);
	}
	_strokeLinearGradient(e) {
		const t = e.getStrokeLinearGradientStartPoint(),
			n = e.getStrokeLinearGradientEndPoint(),
			i = e.getStrokeLinearGradientColorStops(),
			a = this.createLinearGradient(t.x, t.y, n.x, n.y);
		if (i) {
			for (let o = 0; o < i.length; o += 2) a.addColorStop(i[o], i[o + 1]);
			this.setAttr('strokeStyle', a);
		}
	}
	_stroke(e) {
		const t = e.dash(),
			n = e.getStrokeScaleEnabled();
		if (e.hasStroke()) {
			if (!n) {
				this.save();
				const a = this.getCanvas().getPixelRatio();
				this.setTransform(a, 0, 0, a, 0, 0);
			}
			this._applyLineCap(e),
				t &&
					e.dashEnabled() &&
					(this.setLineDash(t), this.setAttr('lineDashOffset', e.dashOffset())),
				this.setAttr('lineWidth', e.strokeWidth()),
				e.getShadowForStrokeEnabled() || this.setAttr('shadowColor', 'rgba(0,0,0,0)'),
				e.getStrokeLinearGradientColorStops()
					? this._strokeLinearGradient(e)
					: this.setAttr('strokeStyle', e.stroke()),
				e._strokeFunc(this),
				n || this.restore();
		}
	}
	_applyShadow(e) {
		var t, n, i;
		const a = (t = e.getShadowRGBA()) !== null && t !== void 0 ? t : 'black',
			o = (n = e.getShadowBlur()) !== null && n !== void 0 ? n : 5,
			s = (i = e.getShadowOffset()) !== null && i !== void 0 ? i : { x: 0, y: 0 },
			l = e.getAbsoluteScale(),
			c = this.canvas.getPixelRatio(),
			u = l.x * c,
			f = l.y * c;
		this.setAttr('shadowColor', a),
			this.setAttr('shadowBlur', o * Math.min(Math.abs(u), Math.abs(f))),
			this.setAttr('shadowOffsetX', s.x * u),
			this.setAttr('shadowOffsetY', s.y * f);
	}
}
Rt.SceneContext = d2;
class h2 extends Xi {
	constructor(e) {
		super(e), (this._context = e._canvas.getContext('2d', { willReadFrequently: !0 }));
	}
	_fill(e) {
		this.save(),
			this.setAttr('fillStyle', e.colorKey),
			e._fillFuncHit(this),
			this.restore();
	}
	strokeShape(e) {
		e.hasHitStroke() && this._stroke(e);
	}
	_stroke(e) {
		if (e.hasHitStroke()) {
			const t = e.getStrokeScaleEnabled();
			if (!t) {
				this.save();
				const a = this.getCanvas().getPixelRatio();
				this.setTransform(a, 0, 0, a, 0, 0);
			}
			this._applyLineCap(e);
			const n = e.hitStrokeWidth(),
				i = n === 'auto' ? e.strokeWidth() : n;
			this.setAttr('lineWidth', i),
				this.setAttr('strokeStyle', e.colorKey),
				e._strokeFuncHit(this),
				t || this.restore();
		}
	}
}
Rt.HitContext = h2;
Object.defineProperty(st, '__esModule', { value: !0 });
st.HitCanvas = st.SceneCanvas = st.Canvas = void 0;
const Ni = ye,
	Fh = Rt,
	Lh = Q;
let ci;
function u2() {
	if (ci) return ci;
	const r = Ni.Util.createCanvasElement(),
		e = r.getContext('2d');
	return (
		(ci = (function () {
			const t = Lh.Konva._global.devicePixelRatio || 1,
				n =
					e.webkitBackingStorePixelRatio ||
					e.mozBackingStorePixelRatio ||
					e.msBackingStorePixelRatio ||
					e.oBackingStorePixelRatio ||
					e.backingStorePixelRatio ||
					1;
			return t / n;
		})()),
		Ni.Util.releaseCanvas(r),
		ci
	);
}
class Xs {
	constructor(e) {
		(this.pixelRatio = 1), (this.width = 0), (this.height = 0), (this.isCache = !1);
		const n = (e || {}).pixelRatio || Lh.Konva.pixelRatio || u2();
		(this.pixelRatio = n),
			(this._canvas = Ni.Util.createCanvasElement()),
			(this._canvas.style.padding = '0'),
			(this._canvas.style.margin = '0'),
			(this._canvas.style.border = '0'),
			(this._canvas.style.background = 'transparent'),
			(this._canvas.style.position = 'absolute'),
			(this._canvas.style.top = '0'),
			(this._canvas.style.left = '0');
	}
	getContext() {
		return this.context;
	}
	getPixelRatio() {
		return this.pixelRatio;
	}
	setPixelRatio(e) {
		const t = this.pixelRatio;
		(this.pixelRatio = e), this.setSize(this.getWidth() / t, this.getHeight() / t);
	}
	setWidth(e) {
		(this.width = this._canvas.width = e * this.pixelRatio),
			(this._canvas.style.width = e + 'px');
		const t = this.pixelRatio;
		this.getContext()._context.scale(t, t);
	}
	setHeight(e) {
		(this.height = this._canvas.height = e * this.pixelRatio),
			(this._canvas.style.height = e + 'px');
		const t = this.pixelRatio;
		this.getContext()._context.scale(t, t);
	}
	getWidth() {
		return this.width;
	}
	getHeight() {
		return this.height;
	}
	setSize(e, t) {
		this.setWidth(e || 0), this.setHeight(t || 0);
	}
	toDataURL(e, t) {
		try {
			return this._canvas.toDataURL(e, t);
		} catch {
			try {
				return this._canvas.toDataURL();
			} catch (i) {
				return (
					Ni.Util.error(
						'Unable to get data URL. ' +
							i.message +
							' For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html.'
					),
					''
				);
			}
		}
	}
}
st.Canvas = Xs;
class f2 extends Xs {
	constructor(e = { width: 0, height: 0, willReadFrequently: !1 }) {
		super(e),
			(this.context = new Fh.SceneContext(this, {
				willReadFrequently: e.willReadFrequently
			})),
			this.setSize(e.width, e.height);
	}
}
st.SceneCanvas = f2;
class g2 extends Xs {
	constructor(e = { width: 0, height: 0 }) {
		super(e),
			(this.hitCanvas = !0),
			(this.context = new Fh.HitContext(this)),
			this.setSize(e.width, e.height);
	}
}
st.HitCanvas = g2;
var qi = {};
(function (r) {
	Object.defineProperty(r, '__esModule', { value: !0 }), (r.DD = void 0);
	const e = Q,
		t = ye;
	(r.DD = {
		get isDragging() {
			let n = !1;
			return (
				r.DD._dragElements.forEach((i) => {
					i.dragStatus === 'dragging' && (n = !0);
				}),
				n
			);
		},
		justDragged: !1,
		get node() {
			let n;
			return (
				r.DD._dragElements.forEach((i) => {
					n = i.node;
				}),
				n
			);
		},
		_dragElements: new Map(),
		_drag(n) {
			const i = [];
			r.DD._dragElements.forEach((a, o) => {
				const { node: s } = a,
					l = s.getStage();
				l.setPointersPositions(n),
					a.pointerId === void 0 && (a.pointerId = t.Util._getFirstPointerId(n));
				const c = l._changedPointerPositions.find((u) => u.id === a.pointerId);
				if (c) {
					if (a.dragStatus !== 'dragging') {
						const u = s.dragDistance();
						if (
							Math.max(
								Math.abs(c.x - a.startPointerPos.x),
								Math.abs(c.y - a.startPointerPos.y)
							) < u ||
							(s.startDrag({ evt: n }), !s.isDragging())
						)
							return;
					}
					s._setDragPosition(n, a), i.push(s);
				}
			}),
				i.forEach((a) => {
					a.fire('dragmove', { type: 'dragmove', target: a, evt: n }, !0);
				});
		},
		_endDragBefore(n) {
			const i = [];
			r.DD._dragElements.forEach((a) => {
				const { node: o } = a,
					s = o.getStage();
				if (
					(n && s.setPointersPositions(n),
					!s._changedPointerPositions.find((u) => u.id === a.pointerId))
				)
					return;
				(a.dragStatus === 'dragging' || a.dragStatus === 'stopped') &&
					((r.DD.justDragged = !0),
					(e.Konva._mouseListenClick = !1),
					(e.Konva._touchListenClick = !1),
					(e.Konva._pointerListenClick = !1),
					(a.dragStatus = 'stopped'));
				const c = a.node.getLayer() || (a.node instanceof e.Konva.Stage && a.node);
				c && i.indexOf(c) === -1 && i.push(c);
			}),
				i.forEach((a) => {
					a.draw();
				});
		},
		_endDragAfter(n) {
			r.DD._dragElements.forEach((i, a) => {
				i.dragStatus === 'stopped' &&
					i.node.fire('dragend', { type: 'dragend', target: i.node, evt: n }, !0),
					i.dragStatus !== 'dragging' && r.DD._dragElements.delete(a);
			});
		}
	}),
		e.Konva.isBrowser &&
			(window.addEventListener('mouseup', r.DD._endDragBefore, !0),
			window.addEventListener('touchend', r.DD._endDragBefore, !0),
			window.addEventListener('touchcancel', r.DD._endDragBefore, !0),
			window.addEventListener('mousemove', r.DD._drag),
			window.addEventListener('touchmove', r.DD._drag),
			window.addEventListener('mouseup', r.DD._endDragAfter, !1),
			window.addEventListener('touchend', r.DD._endDragAfter, !1),
			window.addEventListener('touchcancel', r.DD._endDragAfter, !1));
})(qi);
Object.defineProperty(me, '__esModule', { value: !0 });
me.Node = void 0;
const ee = ye,
	zn = J,
	gn = st,
	Ut = Q,
	Ze = qi,
	we = H,
	Ti = 'absoluteOpacity',
	di = 'allEventListeners',
	Ot = 'absoluteTransform',
	mc = 'absoluteScale',
	cr = 'canvas',
	p2 = 'Change',
	m2 = 'children',
	v2 = 'konva',
	hs = 'listening',
	vc = 'mouseenter',
	yc = 'mouseleave',
	bc = 'set',
	_c = 'Shape',
	Oi = ' ',
	Sc = 'stage',
	zt = 'transform',
	y2 = 'Stage',
	us = 'visible',
	b2 = [
		'xChange.konva',
		'yChange.konva',
		'scaleXChange.konva',
		'scaleYChange.konva',
		'skewXChange.konva',
		'skewYChange.konva',
		'rotationChange.konva',
		'offsetXChange.konva',
		'offsetYChange.konva',
		'transformsEnabledChange.konva'
	].join(Oi);
let _2 = 1;
class W {
	constructor(e) {
		(this._id = _2++),
			(this.eventListeners = {}),
			(this.attrs = {}),
			(this.index = 0),
			(this._allEventListeners = null),
			(this.parent = null),
			(this._cache = new Map()),
			(this._attachedDepsListeners = new Map()),
			(this._lastPos = null),
			(this._batchingTransformChange = !1),
			(this._needClearTransformCache = !1),
			(this._filterUpToDate = !1),
			(this._isUnderCache = !1),
			(this._dragEventId = null),
			(this._shouldFireChangeEvents = !1),
			this.setAttrs(e),
			(this._shouldFireChangeEvents = !0);
	}
	hasChildren() {
		return !1;
	}
	_clearCache(e) {
		(e === zt || e === Ot) && this._cache.get(e)
			? (this._cache.get(e).dirty = !0)
			: e
				? this._cache.delete(e)
				: this._cache.clear();
	}
	_getCache(e, t) {
		let n = this._cache.get(e);
		return (
			(n === void 0 || ((e === zt || e === Ot) && n.dirty === !0)) &&
				((n = t.call(this)), this._cache.set(e, n)),
			n
		);
	}
	_calculate(e, t, n) {
		if (!this._attachedDepsListeners.get(e)) {
			const i = t.map((a) => a + 'Change.konva').join(Oi);
			this.on(i, () => {
				this._clearCache(e);
			}),
				this._attachedDepsListeners.set(e, !0);
		}
		return this._getCache(e, n);
	}
	_getCanvasCache() {
		return this._cache.get(cr);
	}
	_clearSelfAndDescendantCache(e) {
		this._clearCache(e), e === Ot && this.fire('absoluteTransformChange');
	}
	clearCache() {
		if (this._cache.has(cr)) {
			const { scene: e, filter: t, hit: n } = this._cache.get(cr);
			ee.Util.releaseCanvas(e, t, n), this._cache.delete(cr);
		}
		return this._clearSelfAndDescendantCache(), this._requestDraw(), this;
	}
	cache(e) {
		const t = e || {};
		let n = {};
		(t.x === void 0 || t.y === void 0 || t.width === void 0 || t.height === void 0) &&
			(n = this.getClientRect({
				skipTransform: !0,
				relativeTo: this.getParent() || void 0
			}));
		let i = Math.ceil(t.width || n.width),
			a = Math.ceil(t.height || n.height),
			o = t.pixelRatio,
			s = t.x === void 0 ? Math.floor(n.x) : t.x,
			l = t.y === void 0 ? Math.floor(n.y) : t.y,
			c = t.offset || 0,
			u = t.drawBorder || !1,
			f = t.hitCanvasPixelRatio || 1;
		if (!i || !a) {
			ee.Util.error(
				'Can not cache the node. Width or height of the node equals 0. Caching is skipped.'
			);
			return;
		}
		const g = Math.abs(Math.round(n.x) - s) > 0.5 ? 1 : 0,
			h = Math.abs(Math.round(n.y) - l) > 0.5 ? 1 : 0;
		(i += c * 2 + g), (a += c * 2 + h), (s -= c), (l -= c);
		const d = new gn.SceneCanvas({ pixelRatio: o, width: i, height: a }),
			m = new gn.SceneCanvas({
				pixelRatio: o,
				width: 0,
				height: 0,
				willReadFrequently: !0
			}),
			y = new gn.HitCanvas({ pixelRatio: f, width: i, height: a }),
			v = d.getContext(),
			S = y.getContext();
		return (
			(y.isCache = !0),
			(d.isCache = !0),
			this._cache.delete(cr),
			(this._filterUpToDate = !1),
			t.imageSmoothingEnabled === !1 &&
				((d.getContext()._context.imageSmoothingEnabled = !1),
				(m.getContext()._context.imageSmoothingEnabled = !1)),
			v.save(),
			S.save(),
			v.translate(-s, -l),
			S.translate(-s, -l),
			(this._isUnderCache = !0),
			this._clearSelfAndDescendantCache(Ti),
			this._clearSelfAndDescendantCache(mc),
			this.drawScene(d, this),
			this.drawHit(y, this),
			(this._isUnderCache = !1),
			v.restore(),
			S.restore(),
			u &&
				(v.save(),
				v.beginPath(),
				v.rect(0, 0, i, a),
				v.closePath(),
				v.setAttr('strokeStyle', 'red'),
				v.setAttr('lineWidth', 5),
				v.stroke(),
				v.restore()),
			this._cache.set(cr, { scene: d, filter: m, hit: y, x: s, y: l }),
			this._requestDraw(),
			this
		);
	}
	isCached() {
		return this._cache.has(cr);
	}
	getClientRect(e) {
		throw new Error('abstract "getClientRect" method call');
	}
	_transformedRect(e, t) {
		const n = [
			{ x: e.x, y: e.y },
			{ x: e.x + e.width, y: e.y },
			{ x: e.x + e.width, y: e.y + e.height },
			{ x: e.x, y: e.y + e.height }
		];
		let i = 1 / 0,
			a = 1 / 0,
			o = -1 / 0,
			s = -1 / 0;
		const l = this.getAbsoluteTransform(t);
		return (
			n.forEach(function (c) {
				const u = l.point(c);
				i === void 0 && ((i = o = u.x), (a = s = u.y)),
					(i = Math.min(i, u.x)),
					(a = Math.min(a, u.y)),
					(o = Math.max(o, u.x)),
					(s = Math.max(s, u.y));
			}),
			{ x: i, y: a, width: o - i, height: s - a }
		);
	}
	_drawCachedSceneCanvas(e) {
		e.save(), e._applyOpacity(this), e._applyGlobalCompositeOperation(this);
		const t = this._getCanvasCache();
		e.translate(t.x, t.y);
		const n = this._getCachedSceneCanvas(),
			i = n.pixelRatio;
		e.drawImage(n._canvas, 0, 0, n.width / i, n.height / i), e.restore();
	}
	_drawCachedHitCanvas(e) {
		const t = this._getCanvasCache(),
			n = t.hit;
		e.save(),
			e.translate(t.x, t.y),
			e.drawImage(n._canvas, 0, 0, n.width / n.pixelRatio, n.height / n.pixelRatio),
			e.restore();
	}
	_getCachedSceneCanvas() {
		let e = this.filters(),
			t = this._getCanvasCache(),
			n = t.scene,
			i = t.filter,
			a = i.getContext(),
			o,
			s,
			l,
			c;
		if (e) {
			if (!this._filterUpToDate) {
				const u = n.pixelRatio;
				i.setSize(n.width / n.pixelRatio, n.height / n.pixelRatio);
				try {
					for (
						o = e.length,
							a.clear(),
							a.drawImage(n._canvas, 0, 0, n.getWidth() / u, n.getHeight() / u),
							s = a.getImageData(0, 0, i.getWidth(), i.getHeight()),
							l = 0;
						l < o;
						l++
					) {
						if (((c = e[l]), typeof c != 'function')) {
							ee.Util.error(
								'Filter should be type of function, but got ' +
									typeof c +
									' instead. Please check correct filters'
							);
							continue;
						}
						c.call(this, s), a.putImageData(s, 0, 0);
					}
				} catch (f) {
					ee.Util.error(
						'Unable to apply filter. ' +
							f.message +
							' This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.'
					);
				}
				this._filterUpToDate = !0;
			}
			return i;
		}
		return n;
	}
	on(e, t) {
		if ((this._cache && this._cache.delete(di), arguments.length === 3))
			return this._delegate.apply(this, arguments);
		let n = e.split(Oi),
			i = n.length,
			a,
			o,
			s,
			l,
			c;
		for (a = 0; a < i; a++)
			(o = n[a]),
				(s = o.split('.')),
				(l = s[0]),
				(c = s[1] || ''),
				this.eventListeners[l] || (this.eventListeners[l] = []),
				this.eventListeners[l].push({ name: c, handler: t });
		return this;
	}
	off(e, t) {
		let n = (e || '').split(Oi),
			i = n.length,
			a,
			o,
			s,
			l,
			c,
			u;
		if ((this._cache && this._cache.delete(di), !e))
			for (o in this.eventListeners) this._off(o);
		for (a = 0; a < i; a++)
			if (((s = n[a]), (l = s.split('.')), (c = l[0]), (u = l[1]), c))
				this.eventListeners[c] && this._off(c, u, t);
			else for (o in this.eventListeners) this._off(o, u, t);
		return this;
	}
	dispatchEvent(e) {
		const t = { target: this, type: e.type, evt: e };
		return this.fire(e.type, t), this;
	}
	addEventListener(e, t) {
		return (
			this.on(e, function (n) {
				t.call(this, n.evt);
			}),
			this
		);
	}
	removeEventListener(e) {
		return this.off(e), this;
	}
	_delegate(e, t, n) {
		const i = this;
		this.on(e, function (a) {
			const o = a.target.findAncestors(t, !0, i);
			for (let s = 0; s < o.length; s++)
				(a = ee.Util.cloneObject(a)), (a.currentTarget = o[s]), n.call(o[s], a);
		});
	}
	remove() {
		return (
			this.isDragging() && this.stopDrag(),
			Ze.DD._dragElements.delete(this._id),
			this._remove(),
			this
		);
	}
	_clearCaches() {
		this._clearSelfAndDescendantCache(Ot),
			this._clearSelfAndDescendantCache(Ti),
			this._clearSelfAndDescendantCache(mc),
			this._clearSelfAndDescendantCache(Sc),
			this._clearSelfAndDescendantCache(us),
			this._clearSelfAndDescendantCache(hs);
	}
	_remove() {
		this._clearCaches();
		const e = this.getParent();
		e &&
			e.children &&
			(e.children.splice(this.index, 1), e._setChildrenIndices(), (this.parent = null));
	}
	destroy() {
		return this.remove(), this.clearCache(), this;
	}
	getAttr(e) {
		const t = 'get' + ee.Util._capitalize(e);
		return ee.Util._isFunction(this[t]) ? this[t]() : this.attrs[e];
	}
	getAncestors() {
		let e = this.getParent(),
			t = [];
		for (; e; ) t.push(e), (e = e.getParent());
		return t;
	}
	getAttrs() {
		return this.attrs || {};
	}
	setAttrs(e) {
		return (
			this._batchTransformChanges(() => {
				let t, n;
				if (!e) return this;
				for (t in e)
					t !== m2 &&
						((n = bc + ee.Util._capitalize(t)),
						ee.Util._isFunction(this[n]) ? this[n](e[t]) : this._setAttr(t, e[t]));
			}),
			this
		);
	}
	isListening() {
		return this._getCache(hs, this._isListening);
	}
	_isListening(e) {
		if (!this.listening()) return !1;
		const n = this.getParent();
		return n && n !== e && this !== e ? n._isListening(e) : !0;
	}
	isVisible() {
		return this._getCache(us, this._isVisible);
	}
	_isVisible(e) {
		if (!this.visible()) return !1;
		const n = this.getParent();
		return n && n !== e && this !== e ? n._isVisible(e) : !0;
	}
	shouldDrawHit(e, t = !1) {
		if (e) return this._isVisible(e) && this._isListening(e);
		const n = this.getLayer();
		let i = !1;
		Ze.DD._dragElements.forEach((o) => {
			o.dragStatus === 'dragging' &&
				(o.node.nodeType === 'Stage' || o.node.getLayer() === n) &&
				(i = !0);
		});
		const a = !t && !Ut.Konva.hitOnDragEnabled && (i || Ut.Konva.isTransforming());
		return this.isListening() && this.isVisible() && !a;
	}
	show() {
		return this.visible(!0), this;
	}
	hide() {
		return this.visible(!1), this;
	}
	getZIndex() {
		return this.index || 0;
	}
	getAbsoluteZIndex() {
		let e = this.getDepth(),
			t = this,
			n = 0,
			i,
			a,
			o,
			s;
		function l(u) {
			for (i = [], a = u.length, o = 0; o < a; o++)
				(s = u[o]),
					n++,
					s.nodeType !== _c && (i = i.concat(s.getChildren().slice())),
					s._id === t._id && (o = a);
			i.length > 0 && i[0].getDepth() <= e && l(i);
		}
		const c = this.getStage();
		return t.nodeType !== y2 && c && l(c.getChildren()), n;
	}
	getDepth() {
		let e = 0,
			t = this.parent;
		for (; t; ) e++, (t = t.parent);
		return e;
	}
	_batchTransformChanges(e) {
		(this._batchingTransformChange = !0),
			e(),
			(this._batchingTransformChange = !1),
			this._needClearTransformCache &&
				(this._clearCache(zt), this._clearSelfAndDescendantCache(Ot)),
			(this._needClearTransformCache = !1);
	}
	setPosition(e) {
		return (
			this._batchTransformChanges(() => {
				this.x(e.x), this.y(e.y);
			}),
			this
		);
	}
	getPosition() {
		return { x: this.x(), y: this.y() };
	}
	getRelativePointerPosition() {
		const e = this.getStage();
		if (!e) return null;
		const t = e.getPointerPosition();
		if (!t) return null;
		const n = this.getAbsoluteTransform().copy();
		return n.invert(), n.point(t);
	}
	getAbsolutePosition(e) {
		let t = !1,
			n = this.parent;
		for (; n; ) {
			if (n.isCached()) {
				t = !0;
				break;
			}
			n = n.parent;
		}
		t && !e && (e = !0);
		const i = this.getAbsoluteTransform(e).getMatrix(),
			a = new ee.Transform(),
			o = this.offset();
		return (a.m = i.slice()), a.translate(o.x, o.y), a.getTranslation();
	}
	setAbsolutePosition(e) {
		const { x: t, y: n, ...i } = this._clearTransform();
		(this.attrs.x = t), (this.attrs.y = n), this._clearCache(zt);
		const a = this._getAbsoluteTransform().copy();
		return (
			a.invert(),
			a.translate(e.x, e.y),
			(e = {
				x: this.attrs.x + a.getTranslation().x,
				y: this.attrs.y + a.getTranslation().y
			}),
			this._setTransform(i),
			this.setPosition({ x: e.x, y: e.y }),
			this._clearCache(zt),
			this._clearSelfAndDescendantCache(Ot),
			this
		);
	}
	_setTransform(e) {
		let t;
		for (t in e) this.attrs[t] = e[t];
	}
	_clearTransform() {
		const e = {
			x: this.x(),
			y: this.y(),
			rotation: this.rotation(),
			scaleX: this.scaleX(),
			scaleY: this.scaleY(),
			offsetX: this.offsetX(),
			offsetY: this.offsetY(),
			skewX: this.skewX(),
			skewY: this.skewY()
		};
		return (
			(this.attrs.x = 0),
			(this.attrs.y = 0),
			(this.attrs.rotation = 0),
			(this.attrs.scaleX = 1),
			(this.attrs.scaleY = 1),
			(this.attrs.offsetX = 0),
			(this.attrs.offsetY = 0),
			(this.attrs.skewX = 0),
			(this.attrs.skewY = 0),
			e
		);
	}
	move(e) {
		let t = e.x,
			n = e.y,
			i = this.x(),
			a = this.y();
		return (
			t !== void 0 && (i += t),
			n !== void 0 && (a += n),
			this.setPosition({ x: i, y: a }),
			this
		);
	}
	_eachAncestorReverse(e, t) {
		let n = [],
			i = this.getParent(),
			a,
			o;
		if (!(t && t._id === this._id)) {
			for (n.unshift(this); i && (!t || i._id !== t._id); )
				n.unshift(i), (i = i.parent);
			for (a = n.length, o = 0; o < a; o++) e(n[o]);
		}
	}
	rotate(e) {
		return this.rotation(this.rotation() + e), this;
	}
	moveToTop() {
		if (!this.parent)
			return ee.Util.warn('Node has no parent. moveToTop function is ignored.'), !1;
		const e = this.index,
			t = this.parent.getChildren().length;
		return e < t - 1
			? (this.parent.children.splice(e, 1),
				this.parent.children.push(this),
				this.parent._setChildrenIndices(),
				!0)
			: !1;
	}
	moveUp() {
		if (!this.parent)
			return ee.Util.warn('Node has no parent. moveUp function is ignored.'), !1;
		const e = this.index,
			t = this.parent.getChildren().length;
		return e < t - 1
			? (this.parent.children.splice(e, 1),
				this.parent.children.splice(e + 1, 0, this),
				this.parent._setChildrenIndices(),
				!0)
			: !1;
	}
	moveDown() {
		if (!this.parent)
			return ee.Util.warn('Node has no parent. moveDown function is ignored.'), !1;
		const e = this.index;
		return e > 0
			? (this.parent.children.splice(e, 1),
				this.parent.children.splice(e - 1, 0, this),
				this.parent._setChildrenIndices(),
				!0)
			: !1;
	}
	moveToBottom() {
		if (!this.parent)
			return ee.Util.warn('Node has no parent. moveToBottom function is ignored.'), !1;
		const e = this.index;
		return e > 0
			? (this.parent.children.splice(e, 1),
				this.parent.children.unshift(this),
				this.parent._setChildrenIndices(),
				!0)
			: !1;
	}
	setZIndex(e) {
		if (!this.parent)
			return ee.Util.warn('Node has no parent. zIndex parameter is ignored.'), this;
		(e < 0 || e >= this.parent.children.length) &&
			ee.Util.warn(
				'Unexpected value ' +
					e +
					' for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to ' +
					(this.parent.children.length - 1) +
					'.'
			);
		const t = this.index;
		return (
			this.parent.children.splice(t, 1),
			this.parent.children.splice(e, 0, this),
			this.parent._setChildrenIndices(),
			this
		);
	}
	getAbsoluteOpacity() {
		return this._getCache(Ti, this._getAbsoluteOpacity);
	}
	_getAbsoluteOpacity() {
		let e = this.opacity();
		const t = this.getParent();
		return t && !t._isUnderCache && (e *= t.getAbsoluteOpacity()), e;
	}
	moveTo(e) {
		return this.getParent() !== e && (this._remove(), e.add(this)), this;
	}
	toObject() {
		let e = this.getAttrs(),
			t,
			n,
			i,
			a,
			o;
		const s = { attrs: {}, className: this.getClassName() };
		for (t in e)
			(n = e[t]),
				(o = ee.Util.isObject(n) && !ee.Util._isPlainObject(n) && !ee.Util._isArray(n)),
				!o &&
					((i = typeof this[t] == 'function' && this[t]),
					delete e[t],
					(a = i ? i.call(this) : null),
					(e[t] = n),
					a !== n && (s.attrs[t] = n));
		return ee.Util._prepareToStringify(s);
	}
	toJSON() {
		return JSON.stringify(this.toObject());
	}
	getParent() {
		return this.parent;
	}
	findAncestors(e, t, n) {
		const i = [];
		t && this._isMatch(e) && i.push(this);
		let a = this.parent;
		for (; a; ) {
			if (a === n) return i;
			a._isMatch(e) && i.push(a), (a = a.parent);
		}
		return i;
	}
	isAncestorOf(e) {
		return !1;
	}
	findAncestor(e, t, n) {
		return this.findAncestors(e, t, n)[0];
	}
	_isMatch(e) {
		if (!e) return !1;
		if (typeof e == 'function') return e(this);
		let t = e.replace(/ /g, '').split(','),
			n = t.length,
			i,
			a;
		for (i = 0; i < n; i++)
			if (
				((a = t[i]),
				ee.Util.isValidSelector(a) ||
					(ee.Util.warn(
						'Selector "' +
							a +
							'" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'
					),
					ee.Util.warn(
						'If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'
					),
					ee.Util.warn('Konva is awesome, right?')),
				a.charAt(0) === '#')
			) {
				if (this.id() === a.slice(1)) return !0;
			} else if (a.charAt(0) === '.') {
				if (this.hasName(a.slice(1))) return !0;
			} else if (this.className === a || this.nodeType === a) return !0;
		return !1;
	}
	getLayer() {
		const e = this.getParent();
		return e ? e.getLayer() : null;
	}
	getStage() {
		return this._getCache(Sc, this._getStage);
	}
	_getStage() {
		const e = this.getParent();
		return e ? e.getStage() : null;
	}
	fire(e, t = {}, n) {
		return (
			(t.target = t.target || this),
			n ? this._fireAndBubble(e, t) : this._fire(e, t),
			this
		);
	}
	getAbsoluteTransform(e) {
		return e
			? this._getAbsoluteTransform(e)
			: this._getCache(Ot, this._getAbsoluteTransform);
	}
	_getAbsoluteTransform(e) {
		let t;
		if (e)
			return (
				(t = new ee.Transform()),
				this._eachAncestorReverse(function (n) {
					const i = n.transformsEnabled();
					i === 'all'
						? t.multiply(n.getTransform())
						: i === 'position' && t.translate(n.x() - n.offsetX(), n.y() - n.offsetY());
				}, e),
				t
			);
		{
			(t = this._cache.get(Ot) || new ee.Transform()),
				this.parent ? this.parent.getAbsoluteTransform().copyInto(t) : t.reset();
			const n = this.transformsEnabled();
			if (n === 'all') t.multiply(this.getTransform());
			else if (n === 'position') {
				const i = this.attrs.x || 0,
					a = this.attrs.y || 0,
					o = this.attrs.offsetX || 0,
					s = this.attrs.offsetY || 0;
				t.translate(i - o, a - s);
			}
			return (t.dirty = !1), t;
		}
	}
	getAbsoluteScale(e) {
		let t = this;
		for (; t; ) t._isUnderCache && (e = t), (t = t.getParent());
		const i = this.getAbsoluteTransform(e).decompose();
		return { x: i.scaleX, y: i.scaleY };
	}
	getAbsoluteRotation() {
		return this.getAbsoluteTransform().decompose().rotation;
	}
	getTransform() {
		return this._getCache(zt, this._getTransform);
	}
	_getTransform() {
		var e, t;
		const n = this._cache.get(zt) || new ee.Transform();
		n.reset();
		const i = this.x(),
			a = this.y(),
			o = Ut.Konva.getAngle(this.rotation()),
			s = (e = this.attrs.scaleX) !== null && e !== void 0 ? e : 1,
			l = (t = this.attrs.scaleY) !== null && t !== void 0 ? t : 1,
			c = this.attrs.skewX || 0,
			u = this.attrs.skewY || 0,
			f = this.attrs.offsetX || 0,
			g = this.attrs.offsetY || 0;
		return (
			(i !== 0 || a !== 0) && n.translate(i, a),
			o !== 0 && n.rotate(o),
			(c !== 0 || u !== 0) && n.skew(c, u),
			(s !== 1 || l !== 1) && n.scale(s, l),
			(f !== 0 || g !== 0) && n.translate(-1 * f, -1 * g),
			(n.dirty = !1),
			n
		);
	}
	clone(e) {
		let t = ee.Util.cloneObject(this.attrs),
			n,
			i,
			a,
			o,
			s;
		for (n in e) t[n] = e[n];
		const l = new this.constructor(t);
		for (n in this.eventListeners)
			for (i = this.eventListeners[n], a = i.length, o = 0; o < a; o++)
				(s = i[o]),
					s.name.indexOf(v2) < 0 &&
						(l.eventListeners[n] || (l.eventListeners[n] = []),
						l.eventListeners[n].push(s));
		return l;
	}
	_toKonvaCanvas(e) {
		e = e || {};
		const t = this.getClientRect(),
			n = this.getStage(),
			i = e.x !== void 0 ? e.x : Math.floor(t.x),
			a = e.y !== void 0 ? e.y : Math.floor(t.y),
			o = e.pixelRatio || 1,
			s = new gn.SceneCanvas({
				width: e.width || Math.ceil(t.width) || (n ? n.width() : 0),
				height: e.height || Math.ceil(t.height) || (n ? n.height() : 0),
				pixelRatio: o
			}),
			l = s.getContext(),
			c = new gn.SceneCanvas({
				width: s.width / s.pixelRatio + Math.abs(i),
				height: s.height / s.pixelRatio + Math.abs(a),
				pixelRatio: s.pixelRatio
			});
		return (
			e.imageSmoothingEnabled === !1 && (l._context.imageSmoothingEnabled = !1),
			l.save(),
			(i || a) && l.translate(-1 * i, -1 * a),
			this.drawScene(s, void 0, c),
			l.restore(),
			s
		);
	}
	toCanvas(e) {
		return this._toKonvaCanvas(e)._canvas;
	}
	toDataURL(e) {
		e = e || {};
		const t = e.mimeType || null,
			n = e.quality || null,
			i = this._toKonvaCanvas(e).toDataURL(t, n);
		return e.callback && e.callback(i), i;
	}
	toImage(e) {
		return new Promise((t, n) => {
			try {
				const i = e == null ? void 0 : e.callback;
				i && delete e.callback,
					ee.Util._urlToImage(this.toDataURL(e), function (a) {
						t(a), i == null || i(a);
					});
			} catch (i) {
				n(i);
			}
		});
	}
	toBlob(e) {
		return new Promise((t, n) => {
			try {
				const i = e == null ? void 0 : e.callback;
				i && delete e.callback,
					this.toCanvas(e).toBlob(
						(a) => {
							t(a), i == null || i(a);
						},
						e == null ? void 0 : e.mimeType,
						e == null ? void 0 : e.quality
					);
			} catch (i) {
				n(i);
			}
		});
	}
	setSize(e) {
		return this.width(e.width), this.height(e.height), this;
	}
	getSize() {
		return { width: this.width(), height: this.height() };
	}
	getClassName() {
		return this.className || this.nodeType;
	}
	getType() {
		return this.nodeType;
	}
	getDragDistance() {
		return this.attrs.dragDistance !== void 0
			? this.attrs.dragDistance
			: this.parent
				? this.parent.getDragDistance()
				: Ut.Konva.dragDistance;
	}
	_off(e, t, n) {
		let i = this.eventListeners[e],
			a,
			o,
			s;
		for (a = 0; a < i.length; a++)
			if (
				((o = i[a].name),
				(s = i[a].handler),
				(o !== 'konva' || t === 'konva') && (!t || o === t) && (!n || n === s))
			) {
				if ((i.splice(a, 1), i.length === 0)) {
					delete this.eventListeners[e];
					break;
				}
				a--;
			}
	}
	_fireChangeEvent(e, t, n) {
		this._fire(e + p2, { oldVal: t, newVal: n });
	}
	addName(e) {
		if (!this.hasName(e)) {
			const t = this.name(),
				n = t ? t + ' ' + e : e;
			this.name(n);
		}
		return this;
	}
	hasName(e) {
		if (!e) return !1;
		const t = this.name();
		return t ? (t || '').split(/\s/g).indexOf(e) !== -1 : !1;
	}
	removeName(e) {
		const t = (this.name() || '').split(/\s/g),
			n = t.indexOf(e);
		return n !== -1 && (t.splice(n, 1), this.name(t.join(' '))), this;
	}
	setAttr(e, t) {
		const n = this[bc + ee.Util._capitalize(e)];
		return ee.Util._isFunction(n) ? n.call(this, t) : this._setAttr(e, t), this;
	}
	_requestDraw() {
		if (Ut.Konva.autoDrawEnabled) {
			const e = this.getLayer() || this.getStage();
			e == null || e.batchDraw();
		}
	}
	_setAttr(e, t) {
		const n = this.attrs[e];
		(n === t && !ee.Util.isObject(t)) ||
			(t == null ? delete this.attrs[e] : (this.attrs[e] = t),
			this._shouldFireChangeEvents && this._fireChangeEvent(e, n, t),
			this._requestDraw());
	}
	_setComponentAttr(e, t, n) {
		let i;
		n !== void 0 &&
			((i = this.attrs[e]),
			i || (this.attrs[e] = this.getAttr(e)),
			(this.attrs[e][t] = n),
			this._fireChangeEvent(e, i, n));
	}
	_fireAndBubble(e, t, n) {
		if (
			(t && this.nodeType === _c && (t.target = this),
			!(
				(e === vc || e === yc) &&
				((n && (this === n || (this.isAncestorOf && this.isAncestorOf(n)))) ||
					(this.nodeType === 'Stage' && !n))
			))
		) {
			this._fire(e, t);
			const a =
				(e === vc || e === yc) &&
				n &&
				n.isAncestorOf &&
				n.isAncestorOf(this) &&
				!n.isAncestorOf(this.parent);
			((t && !t.cancelBubble) || !t) &&
				this.parent &&
				this.parent.isListening() &&
				!a &&
				(n && n.parent
					? this._fireAndBubble.call(this.parent, e, t, n)
					: this._fireAndBubble.call(this.parent, e, t));
		}
	}
	_getProtoListeners(e) {
		var t, n, i;
		const a = (t = this._cache.get(di)) !== null && t !== void 0 ? t : {};
		let o = a == null ? void 0 : a[e];
		if (o === void 0) {
			o = [];
			let s = Object.getPrototypeOf(this);
			for (; s; ) {
				const l =
					(i = (n = s.eventListeners) === null || n === void 0 ? void 0 : n[e]) !==
						null && i !== void 0
						? i
						: [];
				o.push(...l), (s = Object.getPrototypeOf(s));
			}
			(a[e] = o), this._cache.set(di, a);
		}
		return o;
	}
	_fire(e, t) {
		(t = t || {}), (t.currentTarget = this), (t.type = e);
		const n = this._getProtoListeners(e);
		if (n) for (var i = 0; i < n.length; i++) n[i].handler.call(this, t);
		const a = this.eventListeners[e];
		if (a) for (var i = 0; i < a.length; i++) a[i].handler.call(this, t);
	}
	draw() {
		return this.drawScene(), this.drawHit(), this;
	}
	_createDragElement(e) {
		const t = e ? e.pointerId : void 0,
			n = this.getStage(),
			i = this.getAbsolutePosition();
		if (!n) return;
		const a = n._getPointerById(t) || n._changedPointerPositions[0] || i;
		Ze.DD._dragElements.set(this._id, {
			node: this,
			startPointerPos: a,
			offset: { x: a.x - i.x, y: a.y - i.y },
			dragStatus: 'ready',
			pointerId: t
		});
	}
	startDrag(e, t = !0) {
		Ze.DD._dragElements.has(this._id) || this._createDragElement(e);
		const n = Ze.DD._dragElements.get(this._id);
		(n.dragStatus = 'dragging'),
			this.fire('dragstart', { type: 'dragstart', target: this, evt: e && e.evt }, t);
	}
	_setDragPosition(e, t) {
		const n = this.getStage()._getPointerById(t.pointerId);
		if (!n) return;
		let i = { x: n.x - t.offset.x, y: n.y - t.offset.y };
		const a = this.dragBoundFunc();
		if (a !== void 0) {
			const o = a.call(this, i, e);
			o
				? (i = o)
				: ee.Util.warn(
						'dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.'
					);
		}
		(!this._lastPos || this._lastPos.x !== i.x || this._lastPos.y !== i.y) &&
			(this.setAbsolutePosition(i), this._requestDraw()),
			(this._lastPos = i);
	}
	stopDrag(e) {
		const t = Ze.DD._dragElements.get(this._id);
		t && (t.dragStatus = 'stopped'), Ze.DD._endDragBefore(e), Ze.DD._endDragAfter(e);
	}
	setDraggable(e) {
		this._setAttr('draggable', e), this._dragChange();
	}
	isDragging() {
		const e = Ze.DD._dragElements.get(this._id);
		return e ? e.dragStatus === 'dragging' : !1;
	}
	_listenDrag() {
		this._dragCleanup(),
			this.on('mousedown.konva touchstart.konva', function (e) {
				if (
					!(
						!(e.evt.button !== void 0) ||
						Ut.Konva.dragButtons.indexOf(e.evt.button) >= 0
					) ||
					this.isDragging()
				)
					return;
				let i = !1;
				Ze.DD._dragElements.forEach((a) => {
					this.isAncestorOf(a.node) && (i = !0);
				}),
					i || this._createDragElement(e);
			});
	}
	_dragChange() {
		if (this.attrs.draggable) this._listenDrag();
		else {
			if ((this._dragCleanup(), !this.getStage())) return;
			const t = Ze.DD._dragElements.get(this._id),
				n = t && t.dragStatus === 'dragging',
				i = t && t.dragStatus === 'ready';
			n ? this.stopDrag() : i && Ze.DD._dragElements.delete(this._id);
		}
	}
	_dragCleanup() {
		this.off('mousedown.konva'), this.off('touchstart.konva');
	}
	isClientRectOnScreen(e = { x: 0, y: 0 }) {
		const t = this.getStage();
		if (!t) return !1;
		const n = {
			x: -e.x,
			y: -e.y,
			width: t.width() + 2 * e.x,
			height: t.height() + 2 * e.y
		};
		return ee.Util.haveIntersection(n, this.getClientRect());
	}
	static create(e, t) {
		return ee.Util._isString(e) && (e = JSON.parse(e)), this._createNode(e, t);
	}
	static _createNode(e, t) {
		let n = W.prototype.getClassName.call(e),
			i = e.children,
			a,
			o,
			s;
		t && (e.attrs.container = t),
			Ut.Konva[n] ||
				(ee.Util.warn(
					'Can not find a node with class name "' + n + '". Fallback to "Shape".'
				),
				(n = 'Shape'));
		const l = Ut.Konva[n];
		if (((a = new l(e.attrs)), i))
			for (o = i.length, s = 0; s < o; s++) a.add(W._createNode(i[s]));
		return a;
	}
}
me.Node = W;
W.prototype.nodeType = 'Node';
W.prototype._attrsAffectingSize = [];
W.prototype.eventListeners = {};
W.prototype.on.call(W.prototype, b2, function () {
	if (this._batchingTransformChange) {
		this._needClearTransformCache = !0;
		return;
	}
	this._clearCache(zt), this._clearSelfAndDescendantCache(Ot);
});
W.prototype.on.call(W.prototype, 'visibleChange.konva', function () {
	this._clearSelfAndDescendantCache(us);
});
W.prototype.on.call(W.prototype, 'listeningChange.konva', function () {
	this._clearSelfAndDescendantCache(hs);
});
W.prototype.on.call(W.prototype, 'opacityChange.konva', function () {
	this._clearSelfAndDescendantCache(Ti);
});
const he = zn.Factory.addGetterSetter;
he(W, 'zIndex');
he(W, 'absolutePosition');
he(W, 'position');
he(W, 'x', 0, (0, we.getNumberValidator)());
he(W, 'y', 0, (0, we.getNumberValidator)());
he(W, 'globalCompositeOperation', 'source-over', (0, we.getStringValidator)());
he(W, 'opacity', 1, (0, we.getNumberValidator)());
he(W, 'name', '', (0, we.getStringValidator)());
he(W, 'id', '', (0, we.getStringValidator)());
he(W, 'rotation', 0, (0, we.getNumberValidator)());
zn.Factory.addComponentsGetterSetter(W, 'scale', ['x', 'y']);
he(W, 'scaleX', 1, (0, we.getNumberValidator)());
he(W, 'scaleY', 1, (0, we.getNumberValidator)());
zn.Factory.addComponentsGetterSetter(W, 'skew', ['x', 'y']);
he(W, 'skewX', 0, (0, we.getNumberValidator)());
he(W, 'skewY', 0, (0, we.getNumberValidator)());
zn.Factory.addComponentsGetterSetter(W, 'offset', ['x', 'y']);
he(W, 'offsetX', 0, (0, we.getNumberValidator)());
he(W, 'offsetY', 0, (0, we.getNumberValidator)());
he(W, 'dragDistance', void 0, (0, we.getNumberValidator)());
he(W, 'width', 0, (0, we.getNumberValidator)());
he(W, 'height', 0, (0, we.getNumberValidator)());
he(W, 'listening', !0, (0, we.getBooleanValidator)());
he(W, 'preventDefault', !0, (0, we.getBooleanValidator)());
he(W, 'filters', void 0, function (r) {
	return (this._filterUpToDate = !1), r;
});
he(W, 'visible', !0, (0, we.getBooleanValidator)());
he(W, 'transformsEnabled', 'all', (0, we.getStringValidator)());
he(W, 'size');
he(W, 'dragBoundFunc');
he(W, 'draggable', !1, (0, we.getBooleanValidator)());
zn.Factory.backCompat(W, {
	rotateDeg: 'rotate',
	setRotationDeg: 'setRotation',
	getRotationDeg: 'getRotation'
});
var wr = {};
Object.defineProperty(wr, '__esModule', { value: !0 });
wr.Container = void 0;
const Xr = J,
	so = me,
	Qi = H;
class Ir extends so.Node {
	constructor() {
		super(...arguments), (this.children = []);
	}
	getChildren(e) {
		if (!e) return this.children || [];
		const t = this.children || [],
			n = [];
		return (
			t.forEach(function (i) {
				e(i) && n.push(i);
			}),
			n
		);
	}
	hasChildren() {
		return this.getChildren().length > 0;
	}
	removeChildren() {
		return (
			this.getChildren().forEach((e) => {
				(e.parent = null), (e.index = 0), e.remove();
			}),
			(this.children = []),
			this._requestDraw(),
			this
		);
	}
	destroyChildren() {
		return (
			this.getChildren().forEach((e) => {
				(e.parent = null), (e.index = 0), e.destroy();
			}),
			(this.children = []),
			this._requestDraw(),
			this
		);
	}
	add(...e) {
		if (e.length === 0) return this;
		if (e.length > 1) {
			for (let n = 0; n < e.length; n++) this.add(e[n]);
			return this;
		}
		const t = e[0];
		return t.getParent()
			? (t.moveTo(this), this)
			: (this._validateAdd(t),
				(t.index = this.getChildren().length),
				(t.parent = this),
				t._clearCaches(),
				this.getChildren().push(t),
				this._fire('add', { child: t }),
				this._requestDraw(),
				this);
	}
	destroy() {
		return this.hasChildren() && this.destroyChildren(), super.destroy(), this;
	}
	find(e) {
		return this._generalFind(e, !1);
	}
	findOne(e) {
		const t = this._generalFind(e, !0);
		return t.length > 0 ? t[0] : void 0;
	}
	_generalFind(e, t) {
		const n = [];
		return (
			this._descendants((i) => {
				const a = i._isMatch(e);
				return a && n.push(i), !!(a && t);
			}),
			n
		);
	}
	_descendants(e) {
		let t = !1;
		const n = this.getChildren();
		for (const i of n) {
			if (((t = e(i)), t)) return !0;
			if (i.hasChildren() && ((t = i._descendants(e)), t)) return !0;
		}
		return !1;
	}
	toObject() {
		const e = so.Node.prototype.toObject.call(this);
		return (
			(e.children = []),
			this.getChildren().forEach((t) => {
				e.children.push(t.toObject());
			}),
			e
		);
	}
	isAncestorOf(e) {
		let t = e.getParent();
		for (; t; ) {
			if (t._id === this._id) return !0;
			t = t.getParent();
		}
		return !1;
	}
	clone(e) {
		const t = so.Node.prototype.clone.call(this, e);
		return (
			this.getChildren().forEach(function (n) {
				t.add(n.clone());
			}),
			t
		);
	}
	getAllIntersections(e) {
		const t = [];
		return (
			this.find('Shape').forEach((n) => {
				n.isVisible() && n.intersects(e) && t.push(n);
			}),
			t
		);
	}
	_clearSelfAndDescendantCache(e) {
		var t;
		super._clearSelfAndDescendantCache(e),
			!this.isCached() &&
				((t = this.children) === null ||
					t === void 0 ||
					t.forEach(function (n) {
						n._clearSelfAndDescendantCache(e);
					}));
	}
	_setChildrenIndices() {
		var e;
		(e = this.children) === null ||
			e === void 0 ||
			e.forEach(function (t, n) {
				t.index = n;
			}),
			this._requestDraw();
	}
	drawScene(e, t, n) {
		const i = this.getLayer(),
			a = e || (i && i.getCanvas()),
			o = a && a.getContext(),
			s = this._getCanvasCache(),
			l = s && s.scene,
			c = a && a.isCache;
		if (!this.isVisible() && !c) return this;
		if (l) {
			o.save();
			const u = this.getAbsoluteTransform(t).getMatrix();
			o.transform(u[0], u[1], u[2], u[3], u[4], u[5]),
				this._drawCachedSceneCanvas(o),
				o.restore();
		} else this._drawChildren('drawScene', a, t, n);
		return this;
	}
	drawHit(e, t) {
		if (!this.shouldDrawHit(t)) return this;
		const n = this.getLayer(),
			i = e || (n && n.hitCanvas),
			a = i && i.getContext(),
			o = this._getCanvasCache();
		if (o && o.hit) {
			a.save();
			const l = this.getAbsoluteTransform(t).getMatrix();
			a.transform(l[0], l[1], l[2], l[3], l[4], l[5]),
				this._drawCachedHitCanvas(a),
				a.restore();
		} else this._drawChildren('drawHit', i, t);
		return this;
	}
	_drawChildren(e, t, n, i) {
		var a;
		const o = t && t.getContext(),
			s = this.clipWidth(),
			l = this.clipHeight(),
			c = this.clipFunc(),
			u = (typeof s == 'number' && typeof l == 'number') || c,
			f = n === this;
		if (u) {
			o.save();
			const h = this.getAbsoluteTransform(n);
			let d = h.getMatrix();
			o.transform(d[0], d[1], d[2], d[3], d[4], d[5]), o.beginPath();
			let m;
			if (c) m = c.call(this, o, this);
			else {
				const y = this.clipX(),
					v = this.clipY();
				o.rect(y || 0, v || 0, s, l);
			}
			o.clip.apply(o, m),
				(d = h.copy().invert().getMatrix()),
				o.transform(d[0], d[1], d[2], d[3], d[4], d[5]);
		}
		const g =
			!f && this.globalCompositeOperation() !== 'source-over' && e === 'drawScene';
		g && (o.save(), o._applyGlobalCompositeOperation(this)),
			(a = this.children) === null ||
				a === void 0 ||
				a.forEach(function (h) {
					h[e](t, n, i);
				}),
			g && o.restore(),
			u && o.restore();
	}
	getClientRect(e = {}) {
		var t;
		const n = e.skipTransform,
			i = e.relativeTo;
		let a,
			o,
			s,
			l,
			c = { x: 1 / 0, y: 1 / 0, width: 0, height: 0 };
		const u = this;
		(t = this.children) === null ||
			t === void 0 ||
			t.forEach(function (h) {
				if (!h.visible()) return;
				const d = h.getClientRect({
					relativeTo: u,
					skipShadow: e.skipShadow,
					skipStroke: e.skipStroke
				});
				(d.width === 0 && d.height === 0) ||
					(a === void 0
						? ((a = d.x), (o = d.y), (s = d.x + d.width), (l = d.y + d.height))
						: ((a = Math.min(a, d.x)),
							(o = Math.min(o, d.y)),
							(s = Math.max(s, d.x + d.width)),
							(l = Math.max(l, d.y + d.height))));
			});
		const f = this.find('Shape');
		let g = !1;
		for (let h = 0; h < f.length; h++)
			if (f[h]._isVisible(this)) {
				g = !0;
				break;
			}
		return (
			g && a !== void 0
				? (c = { x: a, y: o, width: s - a, height: l - o })
				: (c = { x: 0, y: 0, width: 0, height: 0 }),
			n ? c : this._transformedRect(c, i)
		);
	}
}
wr.Container = Ir;
Xr.Factory.addComponentsGetterSetter(Ir, 'clip', ['x', 'y', 'width', 'height']);
Xr.Factory.addGetterSetter(Ir, 'clipX', void 0, (0, Qi.getNumberValidator)());
Xr.Factory.addGetterSetter(Ir, 'clipY', void 0, (0, Qi.getNumberValidator)());
Xr.Factory.addGetterSetter(Ir, 'clipWidth', void 0, (0, Qi.getNumberValidator)());
Xr.Factory.addGetterSetter(Ir, 'clipHeight', void 0, (0, Qi.getNumberValidator)());
Xr.Factory.addGetterSetter(Ir, 'clipFunc');
var Gh = {},
	tr = {};
Object.defineProperty(tr, '__esModule', { value: !0 });
tr.getCapturedShape = w2;
tr.createEvent = qs;
tr.hasPointerCapture = I2;
tr.setPointerCapture = x2;
tr.releaseCapture = Vh;
const S2 = Q,
	$n = new Map(),
	Bh = S2.Konva._global.PointerEvent !== void 0;
function w2(r) {
	return $n.get(r);
}
function qs(r) {
	return { evt: r, pointerId: r.pointerId };
}
function I2(r, e) {
	return $n.get(r) === e;
}
function x2(r, e) {
	Vh(r),
		e.getStage() &&
			($n.set(r, e),
			Bh && e._fire('gotpointercapture', qs(new PointerEvent('gotpointercapture'))));
}
function Vh(r, e) {
	const t = $n.get(r);
	if (!t) return;
	const n = t.getStage();
	n && n.content,
		$n.delete(r),
		Bh && t._fire('lostpointercapture', qs(new PointerEvent('lostpointercapture')));
}
(function (r) {
	Object.defineProperty(r, '__esModule', { value: !0 }), (r.Stage = r.stages = void 0);
	const e = ye,
		t = J,
		n = wr,
		i = Q,
		a = st,
		o = qi,
		s = Q,
		l = tr,
		c = 'Stage',
		u = 'string',
		f = 'px',
		g = 'mouseout',
		h = 'mouseleave',
		d = 'mouseover',
		m = 'mouseenter',
		y = 'mousemove',
		v = 'mousedown',
		S = 'mouseup',
		p = 'pointermove',
		b = 'pointerdown',
		x = 'pointerup',
		C = 'pointercancel',
		O = 'lostpointercapture',
		I = 'pointerout',
		T = 'pointerleave',
		w = 'pointerover',
		P = 'pointerenter',
		$ = 'contextmenu',
		N = 'touchstart',
		M = 'touchend',
		R = 'touchmove',
		B = 'touchcancel',
		K = 'wheel',
		te = 5,
		ce = [
			[m, '_pointerenter'],
			[v, '_pointerdown'],
			[y, '_pointermove'],
			[S, '_pointerup'],
			[h, '_pointerleave'],
			[N, '_pointerdown'],
			[R, '_pointermove'],
			[M, '_pointerup'],
			[B, '_pointercancel'],
			[d, '_pointerover'],
			[K, '_wheel'],
			[$, '_contextmenu'],
			[b, '_pointerdown'],
			[p, '_pointermove'],
			[x, '_pointerup'],
			[C, '_pointercancel'],
			[O, '_lostpointercapture']
		],
		j = {
			mouse: {
				[I]: g,
				[T]: h,
				[w]: d,
				[P]: m,
				[p]: y,
				[b]: v,
				[x]: S,
				[C]: 'mousecancel',
				pointerclick: 'click',
				pointerdblclick: 'dblclick'
			},
			touch: {
				[I]: 'touchout',
				[T]: 'touchleave',
				[w]: 'touchover',
				[P]: 'touchenter',
				[p]: R,
				[b]: N,
				[x]: M,
				[C]: B,
				pointerclick: 'tap',
				pointerdblclick: 'dbltap'
			},
			pointer: {
				[I]: I,
				[T]: T,
				[w]: w,
				[P]: P,
				[p]: p,
				[b]: b,
				[x]: x,
				[C]: C,
				pointerclick: 'pointerclick',
				pointerdblclick: 'pointerdblclick'
			}
		},
		ne = (Ie) =>
			Ie.indexOf('pointer') >= 0
				? 'pointer'
				: Ie.indexOf('touch') >= 0
					? 'touch'
					: 'mouse',
		V = (Ie) => {
			const E = ne(Ie);
			if (E === 'pointer') return i.Konva.pointerEventsEnabled && j.pointer;
			if (E === 'touch') return j.touch;
			if (E === 'mouse') return j.mouse;
		};
	function z(Ie = {}) {
		return (
			(Ie.clipFunc || Ie.clipWidth || Ie.clipHeight) &&
				e.Util.warn(
					'Stage does not support clipping. Please use clip for Layers or Groups.'
				),
			Ie
		);
	}
	const Y =
		'Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);';
	r.stages = [];
	class Ae extends n.Container {
		constructor(E) {
			super(z(E)),
				(this._pointerPositions = []),
				(this._changedPointerPositions = []),
				this._buildDOM(),
				this._bindContentEvents(),
				r.stages.push(this),
				this.on('widthChange.konva heightChange.konva', this._resizeDOM),
				this.on('visibleChange.konva', this._checkVisibility),
				this.on(
					'clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva',
					() => {
						z(this.attrs);
					}
				),
				this._checkVisibility();
		}
		_validateAdd(E) {
			const A = E.getType() === 'Layer',
				L = E.getType() === 'FastLayer';
			A || L || e.Util.throw('You may only add layers to the stage.');
		}
		_checkVisibility() {
			if (!this.content) return;
			const E = this.visible() ? '' : 'none';
			this.content.style.display = E;
		}
		setContainer(E) {
			if (typeof E === u) {
				if (E.charAt(0) === '.') {
					const L = E.slice(1);
					E = document.getElementsByClassName(L)[0];
				} else {
					var A;
					E.charAt(0) !== '#' ? (A = E) : (A = E.slice(1)),
						(E = document.getElementById(A));
				}
				if (!E) throw 'Can not find container in document with id ' + A;
			}
			return (
				this._setAttr('container', E),
				this.content &&
					(this.content.parentElement &&
						this.content.parentElement.removeChild(this.content),
					E.appendChild(this.content)),
				this
			);
		}
		shouldDrawHit() {
			return !0;
		}
		clear() {
			const E = this.children,
				A = E.length;
			for (let L = 0; L < A; L++) E[L].clear();
			return this;
		}
		clone(E) {
			return (
				E || (E = {}),
				(E.container = typeof document < 'u' && document.createElement('div')),
				n.Container.prototype.clone.call(this, E)
			);
		}
		destroy() {
			super.destroy();
			const E = this.content;
			E && e.Util._isInDocument(E) && this.container().removeChild(E);
			const A = r.stages.indexOf(this);
			return (
				A > -1 && r.stages.splice(A, 1),
				e.Util.releaseCanvas(this.bufferCanvas._canvas, this.bufferHitCanvas._canvas),
				this
			);
		}
		getPointerPosition() {
			const E = this._pointerPositions[0] || this._changedPointerPositions[0];
			return E ? { x: E.x, y: E.y } : (e.Util.warn(Y), null);
		}
		_getPointerById(E) {
			return this._pointerPositions.find((A) => A.id === E);
		}
		getPointersPositions() {
			return this._pointerPositions;
		}
		getStage() {
			return this;
		}
		getContent() {
			return this.content;
		}
		_toKonvaCanvas(E) {
			(E = E || {}),
				(E.x = E.x || 0),
				(E.y = E.y || 0),
				(E.width = E.width || this.width()),
				(E.height = E.height || this.height());
			const A = new a.SceneCanvas({
					width: E.width,
					height: E.height,
					pixelRatio: E.pixelRatio || 1
				}),
				L = A.getContext()._context,
				Z = this.children;
			return (
				(E.x || E.y) && L.translate(-1 * E.x, -1 * E.y),
				Z.forEach(function (U) {
					if (!U.isVisible()) return;
					const D = U._toKonvaCanvas(E);
					L.drawImage(
						D._canvas,
						E.x,
						E.y,
						D.getWidth() / D.getPixelRatio(),
						D.getHeight() / D.getPixelRatio()
					);
				}),
				A
			);
		}
		getIntersection(E) {
			if (!E) return null;
			const A = this.children,
				L = A.length,
				Z = L - 1;
			for (let U = Z; U >= 0; U--) {
				const D = A[U].getIntersection(E);
				if (D) return D;
			}
			return null;
		}
		_resizeDOM() {
			const E = this.width(),
				A = this.height();
			this.content &&
				((this.content.style.width = E + f), (this.content.style.height = A + f)),
				this.bufferCanvas.setSize(E, A),
				this.bufferHitCanvas.setSize(E, A),
				this.children.forEach((L) => {
					L.setSize({ width: E, height: A }), L.draw();
				});
		}
		add(E, ...A) {
			if (arguments.length > 1) {
				for (let Z = 0; Z < arguments.length; Z++) this.add(arguments[Z]);
				return this;
			}
			super.add(E);
			const L = this.children.length;
			return (
				L > te &&
					e.Util.warn(
						'The stage has ' +
							L +
							' layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.'
					),
				E.setSize({ width: this.width(), height: this.height() }),
				E.draw(),
				i.Konva.isBrowser && this.content.appendChild(E.canvas._canvas),
				this
			);
		}
		getParent() {
			return null;
		}
		getLayer() {
			return null;
		}
		hasPointerCapture(E) {
			return l.hasPointerCapture(E, this);
		}
		setPointerCapture(E) {
			l.setPointerCapture(E, this);
		}
		releaseCapture(E) {
			l.releaseCapture(E, this);
		}
		getLayers() {
			return this.children;
		}
		_bindContentEvents() {
			i.Konva.isBrowser &&
				ce.forEach(([E, A]) => {
					this.content.addEventListener(
						E,
						(L) => {
							this[A](L);
						},
						{ passive: !1 }
					);
				});
		}
		_pointerenter(E) {
			this.setPointersPositions(E);
			const A = V(E.type);
			A && this._fire(A.pointerenter, { evt: E, target: this, currentTarget: this });
		}
		_pointerover(E) {
			this.setPointersPositions(E);
			const A = V(E.type);
			A && this._fire(A.pointerover, { evt: E, target: this, currentTarget: this });
		}
		_getTargetShape(E) {
			let A = this[E + 'targetShape'];
			return A && !A.getStage() && (A = null), A;
		}
		_pointerleave(E) {
			const A = V(E.type),
				L = ne(E.type);
			if (!A) return;
			this.setPointersPositions(E);
			const Z = this._getTargetShape(L),
				U =
					!(i.Konva.isDragging() || i.Konva.isTransforming()) ||
					i.Konva.hitOnDragEnabled;
			Z && U
				? (Z._fireAndBubble(A.pointerout, { evt: E }),
					Z._fireAndBubble(A.pointerleave, { evt: E }),
					this._fire(A.pointerleave, { evt: E, target: this, currentTarget: this }),
					(this[L + 'targetShape'] = null))
				: U &&
					(this._fire(A.pointerleave, { evt: E, target: this, currentTarget: this }),
					this._fire(A.pointerout, { evt: E, target: this, currentTarget: this })),
				(this.pointerPos = null),
				(this._pointerPositions = []);
		}
		_pointerdown(E) {
			const A = V(E.type),
				L = ne(E.type);
			if (!A) return;
			this.setPointersPositions(E);
			let Z = !1;
			this._changedPointerPositions.forEach((U) => {
				const D = this.getIntersection(U);
				if (
					((o.DD.justDragged = !1),
					(i.Konva['_' + L + 'ListenClick'] = !0),
					!D || !D.isListening())
				) {
					this[L + 'ClickStartShape'] = void 0;
					return;
				}
				i.Konva.capturePointerEventsEnabled && D.setPointerCapture(U.id),
					(this[L + 'ClickStartShape'] = D),
					D._fireAndBubble(A.pointerdown, { evt: E, pointerId: U.id }),
					(Z = !0);
				const q = E.type.indexOf('touch') >= 0;
				D.preventDefault() && E.cancelable && q && E.preventDefault();
			}),
				Z ||
					this._fire(A.pointerdown, {
						evt: E,
						target: this,
						currentTarget: this,
						pointerId: this._pointerPositions[0].id
					});
		}
		_pointermove(E) {
			const A = V(E.type),
				L = ne(E.type);
			if (
				!A ||
				(i.Konva.isDragging() &&
					o.DD.node.preventDefault() &&
					E.cancelable &&
					E.preventDefault(),
				this.setPointersPositions(E),
				!(
					!(i.Konva.isDragging() || i.Konva.isTransforming()) ||
					i.Konva.hitOnDragEnabled
				))
			)
				return;
			const U = {};
			let D = !1;
			const q = this._getTargetShape(L);
			this._changedPointerPositions.forEach((le) => {
				const X = l.getCapturedShape(le.id) || this.getIntersection(le),
					Ne = le.id,
					Ce = { evt: E, pointerId: Ne },
					Ve = q !== X;
				if (
					(Ve &&
						q &&
						(q._fireAndBubble(A.pointerout, { ...Ce }, X),
						q._fireAndBubble(A.pointerleave, { ...Ce }, X)),
					X)
				) {
					if (U[X._id]) return;
					U[X._id] = !0;
				}
				X && X.isListening()
					? ((D = !0),
						Ve &&
							(X._fireAndBubble(A.pointerover, { ...Ce }, q),
							X._fireAndBubble(A.pointerenter, { ...Ce }, q),
							(this[L + 'targetShape'] = X)),
						X._fireAndBubble(A.pointermove, { ...Ce }))
					: q &&
						(this._fire(A.pointerover, {
							evt: E,
							target: this,
							currentTarget: this,
							pointerId: Ne
						}),
						(this[L + 'targetShape'] = null));
			}),
				D ||
					this._fire(A.pointermove, {
						evt: E,
						target: this,
						currentTarget: this,
						pointerId: this._changedPointerPositions[0].id
					});
		}
		_pointerup(E) {
			const A = V(E.type),
				L = ne(E.type);
			if (!A) return;
			this.setPointersPositions(E);
			const Z = this[L + 'ClickStartShape'],
				U = this[L + 'ClickEndShape'],
				D = {};
			let q = !1;
			this._changedPointerPositions.forEach((le) => {
				const X = l.getCapturedShape(le.id) || this.getIntersection(le);
				if (X) {
					if ((X.releaseCapture(le.id), D[X._id])) return;
					D[X._id] = !0;
				}
				const Ne = le.id,
					Ce = { evt: E, pointerId: Ne };
				let Ve = !1;
				i.Konva['_' + L + 'InDblClickWindow']
					? ((Ve = !0), clearTimeout(this[L + 'DblTimeout']))
					: o.DD.justDragged ||
						((i.Konva['_' + L + 'InDblClickWindow'] = !0),
						clearTimeout(this[L + 'DblTimeout'])),
					(this[L + 'DblTimeout'] = setTimeout(function () {
						i.Konva['_' + L + 'InDblClickWindow'] = !1;
					}, i.Konva.dblClickWindow)),
					X && X.isListening()
						? ((q = !0),
							(this[L + 'ClickEndShape'] = X),
							X._fireAndBubble(A.pointerup, { ...Ce }),
							i.Konva['_' + L + 'ListenClick'] &&
								Z &&
								Z === X &&
								(X._fireAndBubble(A.pointerclick, { ...Ce }),
								Ve && U && U === X && X._fireAndBubble(A.pointerdblclick, { ...Ce })))
						: ((this[L + 'ClickEndShape'] = null),
							i.Konva['_' + L + 'ListenClick'] &&
								this._fire(A.pointerclick, {
									evt: E,
									target: this,
									currentTarget: this,
									pointerId: Ne
								}),
							Ve &&
								this._fire(A.pointerdblclick, {
									evt: E,
									target: this,
									currentTarget: this,
									pointerId: Ne
								}));
			}),
				q ||
					this._fire(A.pointerup, {
						evt: E,
						target: this,
						currentTarget: this,
						pointerId: this._changedPointerPositions[0].id
					}),
				(i.Konva['_' + L + 'ListenClick'] = !1),
				E.cancelable && L !== 'touch' && L !== 'pointer' && E.preventDefault();
		}
		_contextmenu(E) {
			this.setPointersPositions(E);
			const A = this.getIntersection(this.getPointerPosition());
			A && A.isListening()
				? A._fireAndBubble($, { evt: E })
				: this._fire($, { evt: E, target: this, currentTarget: this });
		}
		_wheel(E) {
			this.setPointersPositions(E);
			const A = this.getIntersection(this.getPointerPosition());
			A && A.isListening()
				? A._fireAndBubble(K, { evt: E })
				: this._fire(K, { evt: E, target: this, currentTarget: this });
		}
		_pointercancel(E) {
			this.setPointersPositions(E);
			const A =
				l.getCapturedShape(E.pointerId) ||
				this.getIntersection(this.getPointerPosition());
			A && A._fireAndBubble(x, l.createEvent(E)), l.releaseCapture(E.pointerId);
		}
		_lostpointercapture(E) {
			l.releaseCapture(E.pointerId);
		}
		setPointersPositions(E) {
			const A = this._getContentPosition();
			let L = null,
				Z = null;
			(E = E || window.event),
				E.touches !== void 0
					? ((this._pointerPositions = []),
						(this._changedPointerPositions = []),
						Array.prototype.forEach.call(E.touches, (U) => {
							this._pointerPositions.push({
								id: U.identifier,
								x: (U.clientX - A.left) / A.scaleX,
								y: (U.clientY - A.top) / A.scaleY
							});
						}),
						Array.prototype.forEach.call(E.changedTouches || E.touches, (U) => {
							this._changedPointerPositions.push({
								id: U.identifier,
								x: (U.clientX - A.left) / A.scaleX,
								y: (U.clientY - A.top) / A.scaleY
							});
						}))
					: ((L = (E.clientX - A.left) / A.scaleX),
						(Z = (E.clientY - A.top) / A.scaleY),
						(this.pointerPos = { x: L, y: Z }),
						(this._pointerPositions = [
							{ x: L, y: Z, id: e.Util._getFirstPointerId(E) }
						]),
						(this._changedPointerPositions = [
							{ x: L, y: Z, id: e.Util._getFirstPointerId(E) }
						]));
		}
		_setPointerPosition(E) {
			e.Util.warn(
				'Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.'
			),
				this.setPointersPositions(E);
		}
		_getContentPosition() {
			if (!this.content || !this.content.getBoundingClientRect)
				return { top: 0, left: 0, scaleX: 1, scaleY: 1 };
			const E = this.content.getBoundingClientRect();
			return {
				top: E.top,
				left: E.left,
				scaleX: E.width / this.content.clientWidth || 1,
				scaleY: E.height / this.content.clientHeight || 1
			};
		}
		_buildDOM() {
			if (
				((this.bufferCanvas = new a.SceneCanvas({
					width: this.width(),
					height: this.height()
				})),
				(this.bufferHitCanvas = new a.HitCanvas({
					pixelRatio: 1,
					width: this.width(),
					height: this.height()
				})),
				!i.Konva.isBrowser)
			)
				return;
			const E = this.container();
			if (!E) throw 'Stage has no container. A container is required.';
			(E.innerHTML = ''),
				(this.content = document.createElement('div')),
				(this.content.style.position = 'relative'),
				(this.content.style.userSelect = 'none'),
				(this.content.className = 'konvajs-content'),
				this.content.setAttribute('role', 'presentation'),
				E.appendChild(this.content),
				this._resizeDOM();
		}
		cache() {
			return (
				e.Util.warn(
					'Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.'
				),
				this
			);
		}
		clearCache() {
			return this;
		}
		batchDraw() {
			return (
				this.getChildren().forEach(function (E) {
					E.batchDraw();
				}),
				this
			);
		}
	}
	(r.Stage = Ae),
		(Ae.prototype.nodeType = c),
		(0, s._registerNode)(Ae),
		t.Factory.addGetterSetter(Ae, 'container'),
		i.Konva.isBrowser &&
			document.addEventListener('visibilitychange', () => {
				r.stages.forEach((Ie) => {
					Ie.batchDraw();
				});
			});
})(Gh);
var Hn = {},
	Te = {};
(function (r) {
	Object.defineProperty(r, '__esModule', { value: !0 }), (r.Shape = r.shapes = void 0);
	const e = Q,
		t = ye,
		n = J,
		i = me,
		a = H,
		o = Q,
		s = tr,
		l = 'hasShadow',
		c = 'shadowRGBA',
		u = 'patternImage',
		f = 'linearGradient',
		g = 'radialGradient';
	let h;
	function d() {
		return h || ((h = t.Util.createCanvasElement().getContext('2d')), h);
	}
	r.shapes = {};
	function m(T) {
		const w = this.attrs.fillRule;
		w ? T.fill(w) : T.fill();
	}
	function y(T) {
		T.stroke();
	}
	function v(T) {
		const w = this.attrs.fillRule;
		w ? T.fill(w) : T.fill();
	}
	function S(T) {
		T.stroke();
	}
	function p() {
		this._clearCache(l);
	}
	function b() {
		this._clearCache(c);
	}
	function x() {
		this._clearCache(u);
	}
	function C() {
		this._clearCache(f);
	}
	function O() {
		this._clearCache(g);
	}
	class I extends i.Node {
		constructor(w) {
			super(w);
			let P;
			for (; (P = t.Util.getRandomColor()), !(P && !(P in r.shapes)); );
			(this.colorKey = P), (r.shapes[P] = this);
		}
		getContext() {
			return (
				t.Util.warn('shape.getContext() method is deprecated. Please do not use it.'),
				this.getLayer().getContext()
			);
		}
		getCanvas() {
			return (
				t.Util.warn('shape.getCanvas() method is deprecated. Please do not use it.'),
				this.getLayer().getCanvas()
			);
		}
		getSceneFunc() {
			return this.attrs.sceneFunc || this._sceneFunc;
		}
		getHitFunc() {
			return this.attrs.hitFunc || this._hitFunc;
		}
		hasShadow() {
			return this._getCache(l, this._hasShadow);
		}
		_hasShadow() {
			return (
				this.shadowEnabled() &&
				this.shadowOpacity() !== 0 &&
				!!(
					this.shadowColor() ||
					this.shadowBlur() ||
					this.shadowOffsetX() ||
					this.shadowOffsetY()
				)
			);
		}
		_getFillPattern() {
			return this._getCache(u, this.__getFillPattern);
		}
		__getFillPattern() {
			if (this.fillPatternImage()) {
				const P = d().createPattern(
					this.fillPatternImage(),
					this.fillPatternRepeat() || 'repeat'
				);
				if (P && P.setTransform) {
					const $ = new t.Transform();
					$.translate(this.fillPatternX(), this.fillPatternY()),
						$.rotate(e.Konva.getAngle(this.fillPatternRotation())),
						$.scale(this.fillPatternScaleX(), this.fillPatternScaleY()),
						$.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY());
					const N = $.getMatrix(),
						M =
							typeof DOMMatrix > 'u'
								? { a: N[0], b: N[1], c: N[2], d: N[3], e: N[4], f: N[5] }
								: new DOMMatrix(N);
					P.setTransform(M);
				}
				return P;
			}
		}
		_getLinearGradient() {
			return this._getCache(f, this.__getLinearGradient);
		}
		__getLinearGradient() {
			const w = this.fillLinearGradientColorStops();
			if (w) {
				const P = d(),
					$ = this.fillLinearGradientStartPoint(),
					N = this.fillLinearGradientEndPoint(),
					M = P.createLinearGradient($.x, $.y, N.x, N.y);
				for (let R = 0; R < w.length; R += 2) M.addColorStop(w[R], w[R + 1]);
				return M;
			}
		}
		_getRadialGradient() {
			return this._getCache(g, this.__getRadialGradient);
		}
		__getRadialGradient() {
			const w = this.fillRadialGradientColorStops();
			if (w) {
				const P = d(),
					$ = this.fillRadialGradientStartPoint(),
					N = this.fillRadialGradientEndPoint(),
					M = P.createRadialGradient(
						$.x,
						$.y,
						this.fillRadialGradientStartRadius(),
						N.x,
						N.y,
						this.fillRadialGradientEndRadius()
					);
				for (let R = 0; R < w.length; R += 2) M.addColorStop(w[R], w[R + 1]);
				return M;
			}
		}
		getShadowRGBA() {
			return this._getCache(c, this._getShadowRGBA);
		}
		_getShadowRGBA() {
			if (!this.hasShadow()) return;
			const w = t.Util.colorToRGBA(this.shadowColor());
			if (w)
				return (
					'rgba(' +
					w.r +
					',' +
					w.g +
					',' +
					w.b +
					',' +
					w.a * (this.shadowOpacity() || 1) +
					')'
				);
		}
		hasFill() {
			return this._calculate(
				'hasFill',
				[
					'fillEnabled',
					'fill',
					'fillPatternImage',
					'fillLinearGradientColorStops',
					'fillRadialGradientColorStops'
				],
				() =>
					this.fillEnabled() &&
					!!(
						this.fill() ||
						this.fillPatternImage() ||
						this.fillLinearGradientColorStops() ||
						this.fillRadialGradientColorStops()
					)
			);
		}
		hasStroke() {
			return this._calculate(
				'hasStroke',
				['strokeEnabled', 'strokeWidth', 'stroke', 'strokeLinearGradientColorStops'],
				() =>
					this.strokeEnabled() &&
					this.strokeWidth() &&
					!!(this.stroke() || this.strokeLinearGradientColorStops())
			);
		}
		hasHitStroke() {
			const w = this.hitStrokeWidth();
			return w === 'auto' ? this.hasStroke() : this.strokeEnabled() && !!w;
		}
		intersects(w) {
			const P = this.getStage();
			if (!P) return !1;
			const $ = P.bufferHitCanvas;
			return (
				$.getContext().clear(),
				this.drawHit($, void 0, !0),
				$.context.getImageData(Math.round(w.x), Math.round(w.y), 1, 1).data[3] > 0
			);
		}
		destroy() {
			return (
				i.Node.prototype.destroy.call(this),
				delete r.shapes[this.colorKey],
				delete this.colorKey,
				this
			);
		}
		_useBufferCanvas(w) {
			var P;
			if (!((P = this.attrs.perfectDrawEnabled) !== null && P !== void 0 ? P : !0))
				return !1;
			const N = w || this.hasFill(),
				M = this.hasStroke(),
				R = this.getAbsoluteOpacity() !== 1;
			if (N && M && R) return !0;
			const B = this.hasShadow(),
				K = this.shadowForStrokeEnabled();
			return !!(N && M && B && K);
		}
		setStrokeHitEnabled(w) {
			t.Util.warn(
				'strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead.'
			),
				w ? this.hitStrokeWidth('auto') : this.hitStrokeWidth(0);
		}
		getStrokeHitEnabled() {
			return this.hitStrokeWidth() !== 0;
		}
		getSelfRect() {
			const w = this.size();
			return {
				x: this._centroid ? -w.width / 2 : 0,
				y: this._centroid ? -w.height / 2 : 0,
				width: w.width,
				height: w.height
			};
		}
		getClientRect(w = {}) {
			let P = !1,
				$ = this.getParent();
			for (; $; ) {
				if ($.isCached()) {
					P = !0;
					break;
				}
				$ = $.getParent();
			}
			const N = w.skipTransform,
				M = w.relativeTo || (P && this.getStage()) || void 0,
				R = this.getSelfRect(),
				K = (!w.skipStroke && this.hasStroke() && this.strokeWidth()) || 0,
				te = R.width + K,
				ce = R.height + K,
				j = !w.skipShadow && this.hasShadow(),
				ne = j ? this.shadowOffsetX() : 0,
				V = j ? this.shadowOffsetY() : 0,
				z = te + Math.abs(ne),
				Y = ce + Math.abs(V),
				Ae = (j && this.shadowBlur()) || 0,
				Ie = z + Ae * 2,
				E = Y + Ae * 2,
				A = {
					width: Ie,
					height: E,
					x: -(K / 2 + Ae) + Math.min(ne, 0) + R.x,
					y: -(K / 2 + Ae) + Math.min(V, 0) + R.y
				};
			return N ? A : this._transformedRect(A, M);
		}
		drawScene(w, P, $) {
			const N = this.getLayer();
			let M = w || N.getCanvas(),
				R = M.getContext(),
				B = this._getCanvasCache(),
				K = this.getSceneFunc(),
				te = this.hasShadow(),
				ce,
				j;
			const ne = M.isCache,
				V = P === this;
			if (!this.isVisible() && !V) return this;
			if (B) {
				R.save();
				const Y = this.getAbsoluteTransform(P).getMatrix();
				return (
					R.transform(Y[0], Y[1], Y[2], Y[3], Y[4], Y[5]),
					this._drawCachedSceneCanvas(R),
					R.restore(),
					this
				);
			}
			if (!K) return this;
			if ((R.save(), this._useBufferCanvas() && !ne)) {
				ce = this.getStage();
				const Y = $ || ce.bufferCanvas;
				(j = Y.getContext()), j.clear(), j.save(), j._applyLineJoin(this);
				var z = this.getAbsoluteTransform(P).getMatrix();
				j.transform(z[0], z[1], z[2], z[3], z[4], z[5]),
					K.call(this, j, this),
					j.restore();
				const Ae = Y.pixelRatio;
				te && R._applyShadow(this),
					R._applyOpacity(this),
					R._applyGlobalCompositeOperation(this),
					R.drawImage(Y._canvas, 0, 0, Y.width / Ae, Y.height / Ae);
			} else {
				if ((R._applyLineJoin(this), !V)) {
					var z = this.getAbsoluteTransform(P).getMatrix();
					R.transform(z[0], z[1], z[2], z[3], z[4], z[5]),
						R._applyOpacity(this),
						R._applyGlobalCompositeOperation(this);
				}
				te && R._applyShadow(this), K.call(this, R, this);
			}
			return R.restore(), this;
		}
		drawHit(w, P, $ = !1) {
			if (!this.shouldDrawHit(P, $)) return this;
			const N = this.getLayer(),
				M = w || N.hitCanvas,
				R = M && M.getContext(),
				B = this.hitFunc() || this.sceneFunc(),
				K = this._getCanvasCache(),
				te = K && K.hit;
			if (
				(this.colorKey ||
					t.Util.warn(
						'Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()'
					),
				te)
			) {
				R.save();
				const j = this.getAbsoluteTransform(P).getMatrix();
				return (
					R.transform(j[0], j[1], j[2], j[3], j[4], j[5]),
					this._drawCachedHitCanvas(R),
					R.restore(),
					this
				);
			}
			if (!B) return this;
			if ((R.save(), R._applyLineJoin(this), !(this === P))) {
				const j = this.getAbsoluteTransform(P).getMatrix();
				R.transform(j[0], j[1], j[2], j[3], j[4], j[5]);
			}
			return B.call(this, R, this), R.restore(), this;
		}
		drawHitFromCache(w = 0) {
			const P = this._getCanvasCache(),
				$ = this._getCachedSceneCanvas(),
				N = P.hit,
				M = N.getContext(),
				R = N.getWidth(),
				B = N.getHeight();
			M.clear(), M.drawImage($._canvas, 0, 0, R, B);
			try {
				const K = M.getImageData(0, 0, R, B),
					te = K.data,
					ce = te.length,
					j = t.Util._hexToRgb(this.colorKey);
				for (let ne = 0; ne < ce; ne += 4)
					te[ne + 3] > w
						? ((te[ne] = j.r),
							(te[ne + 1] = j.g),
							(te[ne + 2] = j.b),
							(te[ne + 3] = 255))
						: (te[ne + 3] = 0);
				M.putImageData(K, 0, 0);
			} catch (K) {
				t.Util.error('Unable to draw hit graph from cached scene canvas. ' + K.message);
			}
			return this;
		}
		hasPointerCapture(w) {
			return s.hasPointerCapture(w, this);
		}
		setPointerCapture(w) {
			s.setPointerCapture(w, this);
		}
		releaseCapture(w) {
			s.releaseCapture(w, this);
		}
	}
	(r.Shape = I),
		(I.prototype._fillFunc = m),
		(I.prototype._strokeFunc = y),
		(I.prototype._fillFuncHit = v),
		(I.prototype._strokeFuncHit = S),
		(I.prototype._centroid = !1),
		(I.prototype.nodeType = 'Shape'),
		(0, o._registerNode)(I),
		(I.prototype.eventListeners = {}),
		I.prototype.on.call(
			I.prototype,
			'shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva',
			p
		),
		I.prototype.on.call(
			I.prototype,
			'shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva',
			b
		),
		I.prototype.on.call(
			I.prototype,
			'fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva',
			x
		),
		I.prototype.on.call(
			I.prototype,
			'fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva',
			C
		),
		I.prototype.on.call(
			I.prototype,
			'fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva',
			O
		),
		n.Factory.addGetterSetter(
			I,
			'stroke',
			void 0,
			(0, a.getStringOrGradientValidator)()
		),
		n.Factory.addGetterSetter(I, 'strokeWidth', 2, (0, a.getNumberValidator)()),
		n.Factory.addGetterSetter(I, 'fillAfterStrokeEnabled', !1),
		n.Factory.addGetterSetter(
			I,
			'hitStrokeWidth',
			'auto',
			(0, a.getNumberOrAutoValidator)()
		),
		n.Factory.addGetterSetter(I, 'strokeHitEnabled', !0, (0, a.getBooleanValidator)()),
		n.Factory.addGetterSetter(
			I,
			'perfectDrawEnabled',
			!0,
			(0, a.getBooleanValidator)()
		),
		n.Factory.addGetterSetter(
			I,
			'shadowForStrokeEnabled',
			!0,
			(0, a.getBooleanValidator)()
		),
		n.Factory.addGetterSetter(I, 'lineJoin'),
		n.Factory.addGetterSetter(I, 'lineCap'),
		n.Factory.addGetterSetter(I, 'sceneFunc'),
		n.Factory.addGetterSetter(I, 'hitFunc'),
		n.Factory.addGetterSetter(I, 'dash'),
		n.Factory.addGetterSetter(I, 'dashOffset', 0, (0, a.getNumberValidator)()),
		n.Factory.addGetterSetter(I, 'shadowColor', void 0, (0, a.getStringValidator)()),
		n.Factory.addGetterSetter(I, 'shadowBlur', 0, (0, a.getNumberValidator)()),
		n.Factory.addGetterSetter(I, 'shadowOpacity', 1, (0, a.getNumberValidator)()),
		n.Factory.addComponentsGetterSetter(I, 'shadowOffset', ['x', 'y']),
		n.Factory.addGetterSetter(I, 'shadowOffsetX', 0, (0, a.getNumberValidator)()),
		n.Factory.addGetterSetter(I, 'shadowOffsetY', 0, (0, a.getNumberValidator)()),
		n.Factory.addGetterSetter(I, 'fillPatternImage'),
		n.Factory.addGetterSetter(I, 'fill', void 0, (0, a.getStringOrGradientValidator)()),
		n.Factory.addGetterSetter(I, 'fillPatternX', 0, (0, a.getNumberValidator)()),
		n.Factory.addGetterSetter(I, 'fillPatternY', 0, (0, a.getNumberValidator)()),
		n.Factory.addGetterSetter(I, 'fillLinearGradientColorStops'),
		n.Factory.addGetterSetter(I, 'strokeLinearGradientColorStops'),
		n.Factory.addGetterSetter(I, 'fillRadialGradientStartRadius', 0),
		n.Factory.addGetterSetter(I, 'fillRadialGradientEndRadius', 0),
		n.Factory.addGetterSetter(I, 'fillRadialGradientColorStops'),
		n.Factory.addGetterSetter(I, 'fillPatternRepeat', 'repeat'),
		n.Factory.addGetterSetter(I, 'fillEnabled', !0),
		n.Factory.addGetterSetter(I, 'strokeEnabled', !0),
		n.Factory.addGetterSetter(I, 'shadowEnabled', !0),
		n.Factory.addGetterSetter(I, 'dashEnabled', !0),
		n.Factory.addGetterSetter(I, 'strokeScaleEnabled', !0),
		n.Factory.addGetterSetter(I, 'fillPriority', 'color'),
		n.Factory.addComponentsGetterSetter(I, 'fillPatternOffset', ['x', 'y']),
		n.Factory.addGetterSetter(I, 'fillPatternOffsetX', 0, (0, a.getNumberValidator)()),
		n.Factory.addGetterSetter(I, 'fillPatternOffsetY', 0, (0, a.getNumberValidator)()),
		n.Factory.addComponentsGetterSetter(I, 'fillPatternScale', ['x', 'y']),
		n.Factory.addGetterSetter(I, 'fillPatternScaleX', 1, (0, a.getNumberValidator)()),
		n.Factory.addGetterSetter(I, 'fillPatternScaleY', 1, (0, a.getNumberValidator)()),
		n.Factory.addComponentsGetterSetter(I, 'fillLinearGradientStartPoint', ['x', 'y']),
		n.Factory.addComponentsGetterSetter(I, 'strokeLinearGradientStartPoint', [
			'x',
			'y'
		]),
		n.Factory.addGetterSetter(I, 'fillLinearGradientStartPointX', 0),
		n.Factory.addGetterSetter(I, 'strokeLinearGradientStartPointX', 0),
		n.Factory.addGetterSetter(I, 'fillLinearGradientStartPointY', 0),
		n.Factory.addGetterSetter(I, 'strokeLinearGradientStartPointY', 0),
		n.Factory.addComponentsGetterSetter(I, 'fillLinearGradientEndPoint', ['x', 'y']),
		n.Factory.addComponentsGetterSetter(I, 'strokeLinearGradientEndPoint', ['x', 'y']),
		n.Factory.addGetterSetter(I, 'fillLinearGradientEndPointX', 0),
		n.Factory.addGetterSetter(I, 'strokeLinearGradientEndPointX', 0),
		n.Factory.addGetterSetter(I, 'fillLinearGradientEndPointY', 0),
		n.Factory.addGetterSetter(I, 'strokeLinearGradientEndPointY', 0),
		n.Factory.addComponentsGetterSetter(I, 'fillRadialGradientStartPoint', ['x', 'y']),
		n.Factory.addGetterSetter(I, 'fillRadialGradientStartPointX', 0),
		n.Factory.addGetterSetter(I, 'fillRadialGradientStartPointY', 0),
		n.Factory.addComponentsGetterSetter(I, 'fillRadialGradientEndPoint', ['x', 'y']),
		n.Factory.addGetterSetter(I, 'fillRadialGradientEndPointX', 0),
		n.Factory.addGetterSetter(I, 'fillRadialGradientEndPointY', 0),
		n.Factory.addGetterSetter(I, 'fillPatternRotation', 0),
		n.Factory.addGetterSetter(I, 'fillRule', void 0, (0, a.getStringValidator)()),
		n.Factory.backCompat(I, {
			dashArray: 'dash',
			getDashArray: 'getDash',
			setDashArray: 'getDash',
			drawFunc: 'sceneFunc',
			getDrawFunc: 'getSceneFunc',
			setDrawFunc: 'setSceneFunc',
			drawHitFunc: 'hitFunc',
			getDrawHitFunc: 'getHitFunc',
			setDrawHitFunc: 'setHitFunc'
		});
})(Te);
Object.defineProperty(Hn, '__esModule', { value: !0 });
Hn.Layer = void 0;
const Tt = ye,
	lo = wr,
	kr = me,
	Qs = J,
	wc = st,
	C2 = H,
	E2 = Te,
	P2 = Q,
	T2 = '#',
	O2 = 'beforeDraw',
	$2 = 'draw',
	Uh = [
		{ x: 0, y: 0 },
		{ x: -1, y: -1 },
		{ x: 1, y: -1 },
		{ x: 1, y: 1 },
		{ x: -1, y: 1 }
	],
	A2 = Uh.length;
class qr extends lo.Container {
	constructor(e) {
		super(e),
			(this.canvas = new wc.SceneCanvas()),
			(this.hitCanvas = new wc.HitCanvas({ pixelRatio: 1 })),
			(this._waitingForDraw = !1),
			this.on('visibleChange.konva', this._checkVisibility),
			this._checkVisibility(),
			this.on('imageSmoothingEnabledChange.konva', this._setSmoothEnabled),
			this._setSmoothEnabled();
	}
	createPNGStream() {
		return this.canvas._canvas.createPNGStream();
	}
	getCanvas() {
		return this.canvas;
	}
	getNativeCanvasElement() {
		return this.canvas._canvas;
	}
	getHitCanvas() {
		return this.hitCanvas;
	}
	getContext() {
		return this.getCanvas().getContext();
	}
	clear(e) {
		return this.getContext().clear(e), this.getHitCanvas().getContext().clear(e), this;
	}
	setZIndex(e) {
		super.setZIndex(e);
		const t = this.getStage();
		return (
			t &&
				t.content &&
				(t.content.removeChild(this.getNativeCanvasElement()),
				e < t.children.length - 1
					? t.content.insertBefore(
							this.getNativeCanvasElement(),
							t.children[e + 1].getCanvas()._canvas
						)
					: t.content.appendChild(this.getNativeCanvasElement())),
			this
		);
	}
	moveToTop() {
		kr.Node.prototype.moveToTop.call(this);
		const e = this.getStage();
		return (
			e &&
				e.content &&
				(e.content.removeChild(this.getNativeCanvasElement()),
				e.content.appendChild(this.getNativeCanvasElement())),
			!0
		);
	}
	moveUp() {
		if (!kr.Node.prototype.moveUp.call(this)) return !1;
		const t = this.getStage();
		return !t || !t.content
			? !1
			: (t.content.removeChild(this.getNativeCanvasElement()),
				this.index < t.children.length - 1
					? t.content.insertBefore(
							this.getNativeCanvasElement(),
							t.children[this.index + 1].getCanvas()._canvas
						)
					: t.content.appendChild(this.getNativeCanvasElement()),
				!0);
	}
	moveDown() {
		if (kr.Node.prototype.moveDown.call(this)) {
			const e = this.getStage();
			if (e) {
				const t = e.children;
				e.content &&
					(e.content.removeChild(this.getNativeCanvasElement()),
					e.content.insertBefore(
						this.getNativeCanvasElement(),
						t[this.index + 1].getCanvas()._canvas
					));
			}
			return !0;
		}
		return !1;
	}
	moveToBottom() {
		if (kr.Node.prototype.moveToBottom.call(this)) {
			const e = this.getStage();
			if (e) {
				const t = e.children;
				e.content &&
					(e.content.removeChild(this.getNativeCanvasElement()),
					e.content.insertBefore(
						this.getNativeCanvasElement(),
						t[1].getCanvas()._canvas
					));
			}
			return !0;
		}
		return !1;
	}
	getLayer() {
		return this;
	}
	remove() {
		const e = this.getNativeCanvasElement();
		return (
			kr.Node.prototype.remove.call(this),
			e && e.parentNode && Tt.Util._isInDocument(e) && e.parentNode.removeChild(e),
			this
		);
	}
	getStage() {
		return this.parent;
	}
	setSize({ width: e, height: t }) {
		return (
			this.canvas.setSize(e, t),
			this.hitCanvas.setSize(e, t),
			this._setSmoothEnabled(),
			this
		);
	}
	_validateAdd(e) {
		const t = e.getType();
		t !== 'Group' &&
			t !== 'Shape' &&
			Tt.Util.throw('You may only add groups and shapes to a layer.');
	}
	_toKonvaCanvas(e) {
		return (
			(e = e || {}),
			(e.width = e.width || this.getWidth()),
			(e.height = e.height || this.getHeight()),
			(e.x = e.x !== void 0 ? e.x : this.x()),
			(e.y = e.y !== void 0 ? e.y : this.y()),
			kr.Node.prototype._toKonvaCanvas.call(this, e)
		);
	}
	_checkVisibility() {
		this.visible()
			? (this.canvas._canvas.style.display = 'block')
			: (this.canvas._canvas.style.display = 'none');
	}
	_setSmoothEnabled() {
		this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
	}
	getWidth() {
		if (this.parent) return this.parent.width();
	}
	setWidth() {
		Tt.Util.warn(
			'Can not change width of layer. Use "stage.width(value)" function instead.'
		);
	}
	getHeight() {
		if (this.parent) return this.parent.height();
	}
	setHeight() {
		Tt.Util.warn(
			'Can not change height of layer. Use "stage.height(value)" function instead.'
		);
	}
	batchDraw() {
		return (
			this._waitingForDraw ||
				((this._waitingForDraw = !0),
				Tt.Util.requestAnimFrame(() => {
					this.draw(), (this._waitingForDraw = !1);
				})),
			this
		);
	}
	getIntersection(e) {
		if (!this.isListening() || !this.isVisible()) return null;
		let t = 1,
			n = !1;
		for (;;) {
			for (let i = 0; i < A2; i++) {
				const a = Uh[i],
					o = this._getIntersection({ x: e.x + a.x * t, y: e.y + a.y * t }),
					s = o.shape;
				if (s) return s;
				if (((n = !!o.antialiased), !o.antialiased)) break;
			}
			if (n) t += 1;
			else return null;
		}
	}
	_getIntersection(e) {
		const t = this.hitCanvas.pixelRatio,
			n = this.hitCanvas.context.getImageData(
				Math.round(e.x * t),
				Math.round(e.y * t),
				1,
				1
			).data,
			i = n[3];
		if (i === 255) {
			const a = Tt.Util._rgbToHex(n[0], n[1], n[2]),
				o = E2.shapes[T2 + a];
			return o ? { shape: o } : { antialiased: !0 };
		} else if (i > 0) return { antialiased: !0 };
		return {};
	}
	drawScene(e, t) {
		const n = this.getLayer(),
			i = e || (n && n.getCanvas());
		return (
			this._fire(O2, { node: this }),
			this.clearBeforeDraw() && i.getContext().clear(),
			lo.Container.prototype.drawScene.call(this, i, t),
			this._fire($2, { node: this }),
			this
		);
	}
	drawHit(e, t) {
		const n = this.getLayer(),
			i = e || (n && n.hitCanvas);
		return (
			n && n.clearBeforeDraw() && n.getHitCanvas().getContext().clear(),
			lo.Container.prototype.drawHit.call(this, i, t),
			this
		);
	}
	enableHitGraph() {
		return this.hitGraphEnabled(!0), this;
	}
	disableHitGraph() {
		return this.hitGraphEnabled(!1), this;
	}
	setHitGraphEnabled(e) {
		Tt.Util.warn(
			'hitGraphEnabled method is deprecated. Please use layer.listening() instead.'
		),
			this.listening(e);
	}
	getHitGraphEnabled(e) {
		return (
			Tt.Util.warn(
				'hitGraphEnabled method is deprecated. Please use layer.listening() instead.'
			),
			this.listening()
		);
	}
	toggleHitCanvas() {
		if (!this.parent || !this.parent.content) return;
		const e = this.parent;
		!!this.hitCanvas._canvas.parentNode
			? e.content.removeChild(this.hitCanvas._canvas)
			: e.content.appendChild(this.hitCanvas._canvas);
	}
	destroy() {
		return (
			Tt.Util.releaseCanvas(this.getNativeCanvasElement(), this.getHitCanvas()._canvas),
			super.destroy()
		);
	}
}
Hn.Layer = qr;
qr.prototype.nodeType = 'Layer';
(0, P2._registerNode)(qr);
Qs.Factory.addGetterSetter(qr, 'imageSmoothingEnabled', !0);
Qs.Factory.addGetterSetter(qr, 'clearBeforeDraw', !0);
Qs.Factory.addGetterSetter(qr, 'hitGraphEnabled', !0, (0, C2.getBooleanValidator)());
var Ji = {};
Object.defineProperty(Ji, '__esModule', { value: !0 });
Ji.FastLayer = void 0;
const k2 = ye,
	R2 = Hn,
	D2 = Q;
class Js extends R2.Layer {
	constructor(e) {
		super(e),
			this.listening(!1),
			k2.Util.warn(
				'Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.'
			);
	}
}
Ji.FastLayer = Js;
Js.prototype.nodeType = 'FastLayer';
(0, D2._registerNode)(Js);
var Qr = {};
Object.defineProperty(Qr, '__esModule', { value: !0 });
Qr.Group = void 0;
const N2 = ye,
	M2 = wr,
	F2 = Q;
class Zs extends M2.Container {
	_validateAdd(e) {
		const t = e.getType();
		t !== 'Group' &&
			t !== 'Shape' &&
			N2.Util.throw('You may only add groups and shapes to groups.');
	}
}
Qr.Group = Zs;
Zs.prototype.nodeType = 'Group';
(0, F2._registerNode)(Zs);
var Jr = {};
Object.defineProperty(Jr, '__esModule', { value: !0 });
Jr.Animation = void 0;
const co = Q,
	Ic = ye,
	ho = (function () {
		return co.glob.performance && co.glob.performance.now
			? function () {
					return co.glob.performance.now();
				}
			: function () {
					return new Date().getTime();
				};
	})();
class yt {
	constructor(e, t) {
		(this.id = yt.animIdCounter++),
			(this.frame = { time: 0, timeDiff: 0, lastTime: ho(), frameRate: 0 }),
			(this.func = e),
			this.setLayers(t);
	}
	setLayers(e) {
		let t = [];
		return e && (t = Array.isArray(e) ? e : [e]), (this.layers = t), this;
	}
	getLayers() {
		return this.layers;
	}
	addLayer(e) {
		const t = this.layers,
			n = t.length;
		for (let i = 0; i < n; i++) if (t[i]._id === e._id) return !1;
		return this.layers.push(e), !0;
	}
	isRunning() {
		const t = yt.animations,
			n = t.length;
		for (let i = 0; i < n; i++) if (t[i].id === this.id) return !0;
		return !1;
	}
	start() {
		return (
			this.stop(),
			(this.frame.timeDiff = 0),
			(this.frame.lastTime = ho()),
			yt._addAnimation(this),
			this
		);
	}
	stop() {
		return yt._removeAnimation(this), this;
	}
	_updateFrameObject(e) {
		(this.frame.timeDiff = e - this.frame.lastTime),
			(this.frame.lastTime = e),
			(this.frame.time += this.frame.timeDiff),
			(this.frame.frameRate = 1e3 / this.frame.timeDiff);
	}
	static _addAnimation(e) {
		this.animations.push(e), this._handleAnimation();
	}
	static _removeAnimation(e) {
		const t = e.id,
			n = this.animations,
			i = n.length;
		for (let a = 0; a < i; a++)
			if (n[a].id === t) {
				this.animations.splice(a, 1);
				break;
			}
	}
	static _runFrames() {
		const e = {},
			t = this.animations;
		for (let n = 0; n < t.length; n++) {
			const i = t[n],
				a = i.layers,
				o = i.func;
			i._updateFrameObject(ho());
			const s = a.length;
			let l;
			if ((o ? (l = o.call(i, i.frame) !== !1) : (l = !0), !!l))
				for (let c = 0; c < s; c++) {
					const u = a[c];
					u._id !== void 0 && (e[u._id] = u);
				}
		}
		for (const n in e) e.hasOwnProperty(n) && e[n].batchDraw();
	}
	static _animationLoop() {
		const e = yt;
		e.animations.length
			? (e._runFrames(), Ic.Util.requestAnimFrame(e._animationLoop))
			: (e.animRunning = !1);
	}
	static _handleAnimation() {
		this.animRunning ||
			((this.animRunning = !0), Ic.Util.requestAnimFrame(this._animationLoop));
	}
}
Jr.Animation = yt;
yt.animations = [];
yt.animIdCounter = 0;
yt.animRunning = !1;
var jh = {};
(function (r) {
	Object.defineProperty(r, '__esModule', { value: !0 }), (r.Easings = r.Tween = void 0);
	const e = ye,
		t = Jr,
		n = me,
		i = Q,
		a = { node: 1, duration: 1, easing: 1, onFinish: 1, yoyo: 1 },
		o = 1,
		s = 2,
		l = 3,
		c = ['fill', 'stroke', 'shadowColor'];
	let u = 0;
	class f {
		constructor(d, m, y, v, S, p, b) {
			(this.prop = d),
				(this.propFunc = m),
				(this.begin = v),
				(this._pos = v),
				(this.duration = p),
				(this._change = 0),
				(this.prevPos = 0),
				(this.yoyo = b),
				(this._time = 0),
				(this._position = 0),
				(this._startTime = 0),
				(this._finish = 0),
				(this.func = y),
				(this._change = S - this.begin),
				this.pause();
		}
		fire(d) {
			const m = this[d];
			m && m();
		}
		setTime(d) {
			d > this.duration
				? this.yoyo
					? ((this._time = this.duration), this.reverse())
					: this.finish()
				: d < 0
					? this.yoyo
						? ((this._time = 0), this.play())
						: this.reset()
					: ((this._time = d), this.update());
		}
		getTime() {
			return this._time;
		}
		setPosition(d) {
			(this.prevPos = this._pos), this.propFunc(d), (this._pos = d);
		}
		getPosition(d) {
			return (
				d === void 0 && (d = this._time),
				this.func(d, this.begin, this._change, this.duration)
			);
		}
		play() {
			(this.state = s),
				(this._startTime = this.getTimer() - this._time),
				this.onEnterFrame(),
				this.fire('onPlay');
		}
		reverse() {
			(this.state = l),
				(this._time = this.duration - this._time),
				(this._startTime = this.getTimer() - this._time),
				this.onEnterFrame(),
				this.fire('onReverse');
		}
		seek(d) {
			this.pause(), (this._time = d), this.update(), this.fire('onSeek');
		}
		reset() {
			this.pause(), (this._time = 0), this.update(), this.fire('onReset');
		}
		finish() {
			this.pause(), (this._time = this.duration), this.update(), this.fire('onFinish');
		}
		update() {
			this.setPosition(this.getPosition(this._time)), this.fire('onUpdate');
		}
		onEnterFrame() {
			const d = this.getTimer() - this._startTime;
			this.state === s
				? this.setTime(d)
				: this.state === l && this.setTime(this.duration - d);
		}
		pause() {
			(this.state = o), this.fire('onPause');
		}
		getTimer() {
			return new Date().getTime();
		}
	}
	class g {
		constructor(d) {
			const m = this,
				y = d.node,
				v = y._id,
				S = d.easing || r.Easings.Linear,
				p = !!d.yoyo;
			let b, x;
			typeof d.duration > 'u'
				? (b = 0.3)
				: d.duration === 0
					? (b = 0.001)
					: (b = d.duration),
				(this.node = y),
				(this._id = u++);
			const C = y.getLayer() || (y instanceof i.Konva.Stage ? y.getLayers() : null);
			C ||
				e.Util.error(
					'Tween constructor have `node` that is not in a layer. Please add node into layer first.'
				),
				(this.anim = new t.Animation(function () {
					m.tween.onEnterFrame();
				}, C)),
				(this.tween = new f(
					x,
					function (O) {
						m._tweenFunc(O);
					},
					S,
					0,
					1,
					b * 1e3,
					p
				)),
				this._addListeners(),
				g.attrs[v] || (g.attrs[v] = {}),
				g.attrs[v][this._id] || (g.attrs[v][this._id] = {}),
				g.tweens[v] || (g.tweens[v] = {});
			for (x in d) a[x] === void 0 && this._addAttr(x, d[x]);
			this.reset(),
				(this.onFinish = d.onFinish),
				(this.onReset = d.onReset),
				(this.onUpdate = d.onUpdate);
		}
		_addAttr(d, m) {
			const y = this.node,
				v = y._id;
			let S, p, b, x, C;
			const O = g.tweens[v][d];
			O && delete g.attrs[v][O][d];
			let I = y.getAttr(d);
			if (e.Util._isArray(m))
				if (
					((S = []),
					(p = Math.max(m.length, I.length)),
					d === 'points' &&
						m.length !== I.length &&
						(m.length > I.length
							? ((x = I), (I = e.Util._prepareArrayForTween(I, m, y.closed())))
							: ((b = m), (m = e.Util._prepareArrayForTween(m, I, y.closed())))),
					d.indexOf('fill') === 0)
				)
					for (let T = 0; T < p; T++)
						if (T % 2 === 0) S.push(m[T] - I[T]);
						else {
							const w = e.Util.colorToRGBA(I[T]);
							(C = e.Util.colorToRGBA(m[T])),
								(I[T] = w),
								S.push({ r: C.r - w.r, g: C.g - w.g, b: C.b - w.b, a: C.a - w.a });
						}
				else for (let T = 0; T < p; T++) S.push(m[T] - I[T]);
			else
				c.indexOf(d) !== -1
					? ((I = e.Util.colorToRGBA(I)),
						(C = e.Util.colorToRGBA(m)),
						(S = { r: C.r - I.r, g: C.g - I.g, b: C.b - I.b, a: C.a - I.a }))
					: (S = m - I);
			(g.attrs[v][this._id][d] = {
				start: I,
				diff: S,
				end: m,
				trueEnd: b,
				trueStart: x
			}),
				(g.tweens[v][d] = this._id);
		}
		_tweenFunc(d) {
			const m = this.node,
				y = g.attrs[m._id][this._id];
			let v, S, p, b, x, C, O, I;
			for (v in y) {
				if (((S = y[v]), (p = S.start), (b = S.diff), (I = S.end), e.Util._isArray(p)))
					if (((x = []), (O = Math.max(p.length, I.length)), v.indexOf('fill') === 0))
						for (C = 0; C < O; C++)
							C % 2 === 0
								? x.push((p[C] || 0) + b[C] * d)
								: x.push(
										'rgba(' +
											Math.round(p[C].r + b[C].r * d) +
											',' +
											Math.round(p[C].g + b[C].g * d) +
											',' +
											Math.round(p[C].b + b[C].b * d) +
											',' +
											(p[C].a + b[C].a * d) +
											')'
									);
					else for (C = 0; C < O; C++) x.push((p[C] || 0) + b[C] * d);
				else
					c.indexOf(v) !== -1
						? (x =
								'rgba(' +
								Math.round(p.r + b.r * d) +
								',' +
								Math.round(p.g + b.g * d) +
								',' +
								Math.round(p.b + b.b * d) +
								',' +
								(p.a + b.a * d) +
								')')
						: (x = p + b * d);
				m.setAttr(v, x);
			}
		}
		_addListeners() {
			(this.tween.onPlay = () => {
				this.anim.start();
			}),
				(this.tween.onReverse = () => {
					this.anim.start();
				}),
				(this.tween.onPause = () => {
					this.anim.stop();
				}),
				(this.tween.onFinish = () => {
					const d = this.node,
						m = g.attrs[d._id][this._id];
					m.points && m.points.trueEnd && d.setAttr('points', m.points.trueEnd),
						this.onFinish && this.onFinish.call(this);
				}),
				(this.tween.onReset = () => {
					const d = this.node,
						m = g.attrs[d._id][this._id];
					m.points && m.points.trueStart && d.points(m.points.trueStart),
						this.onReset && this.onReset();
				}),
				(this.tween.onUpdate = () => {
					this.onUpdate && this.onUpdate.call(this);
				});
		}
		play() {
			return this.tween.play(), this;
		}
		reverse() {
			return this.tween.reverse(), this;
		}
		reset() {
			return this.tween.reset(), this;
		}
		seek(d) {
			return this.tween.seek(d * 1e3), this;
		}
		pause() {
			return this.tween.pause(), this;
		}
		finish() {
			return this.tween.finish(), this;
		}
		destroy() {
			const d = this.node._id,
				m = this._id,
				y = g.tweens[d];
			this.pause();
			for (const v in y) delete g.tweens[d][v];
			delete g.attrs[d][m];
		}
	}
	(r.Tween = g),
		(g.attrs = {}),
		(g.tweens = {}),
		(n.Node.prototype.to = function (h) {
			const d = h.onFinish;
			(h.node = this),
				(h.onFinish = function () {
					this.destroy(), d && d();
				}),
				new g(h).play();
		}),
		(r.Easings = {
			BackEaseIn(h, d, m, y) {
				return m * (h /= y) * h * ((1.70158 + 1) * h - 1.70158) + d;
			},
			BackEaseOut(h, d, m, y) {
				return m * ((h = h / y - 1) * h * ((1.70158 + 1) * h + 1.70158) + 1) + d;
			},
			BackEaseInOut(h, d, m, y) {
				let v = 1.70158;
				return (h /= y / 2) < 1
					? (m / 2) * (h * h * (((v *= 1.525) + 1) * h - v)) + d
					: (m / 2) * ((h -= 2) * h * (((v *= 1.525) + 1) * h + v) + 2) + d;
			},
			ElasticEaseIn(h, d, m, y, v, S) {
				let p = 0;
				return h === 0
					? d
					: (h /= y) === 1
						? d + m
						: (S || (S = y * 0.3),
							!v || v < Math.abs(m)
								? ((v = m), (p = S / 4))
								: (p = (S / (2 * Math.PI)) * Math.asin(m / v)),
							-(
								v *
								Math.pow(2, 10 * (h -= 1)) *
								Math.sin(((h * y - p) * (2 * Math.PI)) / S)
							) + d);
			},
			ElasticEaseOut(h, d, m, y, v, S) {
				let p = 0;
				return h === 0
					? d
					: (h /= y) === 1
						? d + m
						: (S || (S = y * 0.3),
							!v || v < Math.abs(m)
								? ((v = m), (p = S / 4))
								: (p = (S / (2 * Math.PI)) * Math.asin(m / v)),
							v * Math.pow(2, -10 * h) * Math.sin(((h * y - p) * (2 * Math.PI)) / S) +
								m +
								d);
			},
			ElasticEaseInOut(h, d, m, y, v, S) {
				let p = 0;
				return h === 0
					? d
					: (h /= y / 2) === 2
						? d + m
						: (S || (S = y * (0.3 * 1.5)),
							!v || v < Math.abs(m)
								? ((v = m), (p = S / 4))
								: (p = (S / (2 * Math.PI)) * Math.asin(m / v)),
							h < 1
								? -0.5 *
										(v *
											Math.pow(2, 10 * (h -= 1)) *
											Math.sin(((h * y - p) * (2 * Math.PI)) / S)) +
									d
								: v *
										Math.pow(2, -10 * (h -= 1)) *
										Math.sin(((h * y - p) * (2 * Math.PI)) / S) *
										0.5 +
									m +
									d);
			},
			BounceEaseOut(h, d, m, y) {
				return (h /= y) < 1 / 2.75
					? m * (7.5625 * h * h) + d
					: h < 2 / 2.75
						? m * (7.5625 * (h -= 1.5 / 2.75) * h + 0.75) + d
						: h < 2.5 / 2.75
							? m * (7.5625 * (h -= 2.25 / 2.75) * h + 0.9375) + d
							: m * (7.5625 * (h -= 2.625 / 2.75) * h + 0.984375) + d;
			},
			BounceEaseIn(h, d, m, y) {
				return m - r.Easings.BounceEaseOut(y - h, 0, m, y) + d;
			},
			BounceEaseInOut(h, d, m, y) {
				return h < y / 2
					? r.Easings.BounceEaseIn(h * 2, 0, m, y) * 0.5 + d
					: r.Easings.BounceEaseOut(h * 2 - y, 0, m, y) * 0.5 + m * 0.5 + d;
			},
			EaseIn(h, d, m, y) {
				return m * (h /= y) * h + d;
			},
			EaseOut(h, d, m, y) {
				return -m * (h /= y) * (h - 2) + d;
			},
			EaseInOut(h, d, m, y) {
				return (h /= y / 2) < 1
					? (m / 2) * h * h + d
					: (-m / 2) * (--h * (h - 2) - 1) + d;
			},
			StrongEaseIn(h, d, m, y) {
				return m * (h /= y) * h * h * h * h + d;
			},
			StrongEaseOut(h, d, m, y) {
				return m * ((h = h / y - 1) * h * h * h * h + 1) + d;
			},
			StrongEaseInOut(h, d, m, y) {
				return (h /= y / 2) < 1
					? (m / 2) * h * h * h * h * h + d
					: (m / 2) * ((h -= 2) * h * h * h * h + 2) + d;
			},
			Linear(h, d, m, y) {
				return (m * h) / y + d;
			}
		});
})(jh);
(function (r) {
	Object.defineProperty(r, '__esModule', { value: !0 }), (r.Konva = void 0);
	const e = Q,
		t = ye,
		n = me,
		i = wr,
		a = Gh,
		o = Hn,
		s = Ji,
		l = Qr,
		c = qi,
		u = Te,
		f = Jr,
		g = jh,
		h = Rt,
		d = st;
	(r.Konva = t.Util._assign(e.Konva, {
		Util: t.Util,
		Transform: t.Transform,
		Node: n.Node,
		Container: i.Container,
		Stage: a.Stage,
		stages: a.stages,
		Layer: o.Layer,
		FastLayer: s.FastLayer,
		Group: l.Group,
		DD: c.DD,
		Shape: u.Shape,
		shapes: u.shapes,
		Animation: f.Animation,
		Tween: g.Tween,
		Easings: g.Easings,
		Context: h.Context,
		Canvas: d.Canvas
	})),
		(r.default = r.Konva);
})(Nh);
var Zi = {};
Object.defineProperty(Zi, '__esModule', { value: !0 });
Zi.Arc = void 0;
const ea = J,
	L2 = Te,
	xc = Q,
	ta = H,
	G2 = Q;
class Lt extends L2.Shape {
	_sceneFunc(e) {
		const t = xc.Konva.getAngle(this.angle()),
			n = this.clockwise();
		e.beginPath(),
			e.arc(0, 0, this.outerRadius(), 0, t, n),
			e.arc(0, 0, this.innerRadius(), t, 0, !n),
			e.closePath(),
			e.fillStrokeShape(this);
	}
	getWidth() {
		return this.outerRadius() * 2;
	}
	getHeight() {
		return this.outerRadius() * 2;
	}
	setWidth(e) {
		this.outerRadius(e / 2);
	}
	setHeight(e) {
		this.outerRadius(e / 2);
	}
	getSelfRect() {
		const e = this.innerRadius(),
			t = this.outerRadius(),
			n = this.clockwise(),
			i = xc.Konva.getAngle(n ? 360 - this.angle() : this.angle()),
			a = Math.cos(Math.min(i, Math.PI)),
			o = 1,
			s = Math.sin(Math.min(Math.max(Math.PI, i), (3 * Math.PI) / 2)),
			l = Math.sin(Math.min(i, Math.PI / 2)),
			c = a * (a > 0 ? e : t),
			u = o * t,
			f = s * (s > 0 ? e : t),
			g = l * (l > 0 ? t : e);
		return { x: c, y: n ? -1 * g : f, width: u - c, height: g - f };
	}
}
Zi.Arc = Lt;
Lt.prototype._centroid = !0;
Lt.prototype.className = 'Arc';
Lt.prototype._attrsAffectingSize = ['innerRadius', 'outerRadius', 'angle', 'clockwise'];
(0, G2._registerNode)(Lt);
ea.Factory.addGetterSetter(Lt, 'innerRadius', 0, (0, ta.getNumberValidator)());
ea.Factory.addGetterSetter(Lt, 'outerRadius', 0, (0, ta.getNumberValidator)());
ea.Factory.addGetterSetter(Lt, 'angle', 0, (0, ta.getNumberValidator)());
ea.Factory.addGetterSetter(Lt, 'clockwise', !1, (0, ta.getBooleanValidator)());
var ra = {},
	Wn = {};
Object.defineProperty(Wn, '__esModule', { value: !0 });
Wn.Line = void 0;
const na = J,
	B2 = Q,
	V2 = Te,
	zh = H;
function fs(r, e, t, n, i, a, o) {
	const s = Math.sqrt(Math.pow(t - r, 2) + Math.pow(n - e, 2)),
		l = Math.sqrt(Math.pow(i - t, 2) + Math.pow(a - n, 2)),
		c = (o * s) / (s + l),
		u = (o * l) / (s + l),
		f = t - c * (i - r),
		g = n - c * (a - e),
		h = t + u * (i - r),
		d = n + u * (a - e);
	return [f, g, h, d];
}
function Cc(r, e) {
	const t = r.length,
		n = [];
	for (let i = 2; i < t - 2; i += 2) {
		const a = fs(r[i - 2], r[i - 1], r[i], r[i + 1], r[i + 2], r[i + 3], e);
		isNaN(a[0]) ||
			(n.push(a[0]),
			n.push(a[1]),
			n.push(r[i]),
			n.push(r[i + 1]),
			n.push(a[2]),
			n.push(a[3]));
	}
	return n;
}
class rr extends V2.Shape {
	constructor(e) {
		super(e),
			this.on(
				'pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva',
				function () {
					this._clearCache('tensionPoints');
				}
			);
	}
	_sceneFunc(e) {
		let t = this.points(),
			n = t.length,
			i = this.tension(),
			a = this.closed(),
			o = this.bezier(),
			s,
			l,
			c;
		if (n) {
			if ((e.beginPath(), e.moveTo(t[0], t[1]), i !== 0 && n > 4)) {
				for (
					s = this.getTensionPoints(),
						l = s.length,
						c = a ? 0 : 4,
						a || e.quadraticCurveTo(s[0], s[1], s[2], s[3]);
					c < l - 2;

				)
					e.bezierCurveTo(s[c++], s[c++], s[c++], s[c++], s[c++], s[c++]);
				a || e.quadraticCurveTo(s[l - 2], s[l - 1], t[n - 2], t[n - 1]);
			} else if (o)
				for (c = 2; c < n; )
					e.bezierCurveTo(t[c++], t[c++], t[c++], t[c++], t[c++], t[c++]);
			else for (c = 2; c < n; c += 2) e.lineTo(t[c], t[c + 1]);
			a ? (e.closePath(), e.fillStrokeShape(this)) : e.strokeShape(this);
		}
	}
	getTensionPoints() {
		return this._getCache('tensionPoints', this._getTensionPoints);
	}
	_getTensionPoints() {
		return this.closed()
			? this._getTensionPointsClosed()
			: Cc(this.points(), this.tension());
	}
	_getTensionPointsClosed() {
		const e = this.points(),
			t = e.length,
			n = this.tension(),
			i = fs(e[t - 2], e[t - 1], e[0], e[1], e[2], e[3], n),
			a = fs(e[t - 4], e[t - 3], e[t - 2], e[t - 1], e[0], e[1], n),
			o = Cc(e, n);
		return [i[2], i[3]]
			.concat(o)
			.concat([a[0], a[1], e[t - 2], e[t - 1], a[2], a[3], i[0], i[1], e[0], e[1]]);
	}
	getWidth() {
		return this.getSelfRect().width;
	}
	getHeight() {
		return this.getSelfRect().height;
	}
	getSelfRect() {
		let e = this.points();
		if (e.length < 4) return { x: e[0] || 0, y: e[1] || 0, width: 0, height: 0 };
		this.tension() !== 0
			? (e = [
					e[0],
					e[1],
					...this._getTensionPoints(),
					e[e.length - 2],
					e[e.length - 1]
				])
			: (e = this.points());
		let t = e[0],
			n = e[0],
			i = e[1],
			a = e[1],
			o,
			s;
		for (let l = 0; l < e.length / 2; l++)
			(o = e[l * 2]),
				(s = e[l * 2 + 1]),
				(t = Math.min(t, o)),
				(n = Math.max(n, o)),
				(i = Math.min(i, s)),
				(a = Math.max(a, s));
		return { x: t, y: i, width: n - t, height: a - i };
	}
}
Wn.Line = rr;
rr.prototype.className = 'Line';
rr.prototype._attrsAffectingSize = ['points', 'bezier', 'tension'];
(0, B2._registerNode)(rr);
na.Factory.addGetterSetter(rr, 'closed', !1);
na.Factory.addGetterSetter(rr, 'bezier', !1);
na.Factory.addGetterSetter(rr, 'tension', 0, (0, zh.getNumberValidator)());
na.Factory.addGetterSetter(rr, 'points', [], (0, zh.getNumberArrayValidator)());
var Zr = {},
	Hh = {};
(function (r) {
	Object.defineProperty(r, '__esModule', { value: !0 }),
		(r.t2length =
			r.getQuadraticArcLength =
			r.getCubicArcLength =
			r.binomialCoefficients =
			r.cValues =
			r.tValues =
				void 0),
		(r.tValues = [
			[],
			[],
			[-0.5773502691896257, 0.5773502691896257],
			[0, -0.7745966692414834, 0.7745966692414834],
			[
				-0.33998104358485626, 0.33998104358485626, -0.8611363115940526,
				0.8611363115940526
			],
			[
				0, -0.5384693101056831, 0.5384693101056831, -0.906179845938664,
				0.906179845938664
			],
			[
				0.6612093864662645, -0.6612093864662645, -0.2386191860831969,
				0.2386191860831969, -0.932469514203152, 0.932469514203152
			],
			[
				0, 0.4058451513773972, -0.4058451513773972, -0.7415311855993945,
				0.7415311855993945, -0.9491079123427585, 0.9491079123427585
			],
			[
				-0.1834346424956498, 0.1834346424956498, -0.525532409916329, 0.525532409916329,
				-0.7966664774136267, 0.7966664774136267, -0.9602898564975363, 0.9602898564975363
			],
			[
				0, -0.8360311073266358, 0.8360311073266358, -0.9681602395076261,
				0.9681602395076261, -0.3242534234038089, 0.3242534234038089,
				-0.6133714327005904, 0.6133714327005904
			],
			[
				-0.14887433898163122, 0.14887433898163122, -0.4333953941292472,
				0.4333953941292472, -0.6794095682990244, 0.6794095682990244,
				-0.8650633666889845, 0.8650633666889845, -0.9739065285171717, 0.9739065285171717
			],
			[
				0, -0.26954315595234496, 0.26954315595234496, -0.5190961292068118,
				0.5190961292068118, -0.7301520055740494, 0.7301520055740494,
				-0.8870625997680953, 0.8870625997680953, -0.978228658146057, 0.978228658146057
			],
			[
				-0.1252334085114689, 0.1252334085114689, -0.3678314989981802,
				0.3678314989981802, -0.5873179542866175, 0.5873179542866175,
				-0.7699026741943047, 0.7699026741943047, -0.9041172563704749,
				0.9041172563704749, -0.9815606342467192, 0.9815606342467192
			],
			[
				0, -0.2304583159551348, 0.2304583159551348, -0.44849275103644687,
				0.44849275103644687, -0.6423493394403402, 0.6423493394403402,
				-0.8015780907333099, 0.8015780907333099, -0.9175983992229779,
				0.9175983992229779, -0.9841830547185881, 0.9841830547185881
			],
			[
				-0.10805494870734367, 0.10805494870734367, -0.31911236892788974,
				0.31911236892788974, -0.5152486363581541, 0.5152486363581541,
				-0.6872929048116855, 0.6872929048116855, -0.827201315069765, 0.827201315069765,
				-0.9284348836635735, 0.9284348836635735, -0.9862838086968123, 0.9862838086968123
			],
			[
				0, -0.20119409399743451, 0.20119409399743451, -0.3941513470775634,
				0.3941513470775634, -0.5709721726085388, 0.5709721726085388,
				-0.7244177313601701, 0.7244177313601701, -0.8482065834104272,
				0.8482065834104272, -0.937273392400706, 0.937273392400706, -0.9879925180204854,
				0.9879925180204854
			],
			[
				-0.09501250983763744, 0.09501250983763744, -0.2816035507792589,
				0.2816035507792589, -0.45801677765722737, 0.45801677765722737,
				-0.6178762444026438, 0.6178762444026438, -0.755404408355003, 0.755404408355003,
				-0.8656312023878318, 0.8656312023878318, -0.9445750230732326,
				0.9445750230732326, -0.9894009349916499, 0.9894009349916499
			],
			[
				0, -0.17848418149584785, 0.17848418149584785, -0.3512317634538763,
				0.3512317634538763, -0.5126905370864769, 0.5126905370864769,
				-0.6576711592166907, 0.6576711592166907, -0.7815140038968014,
				0.7815140038968014, -0.8802391537269859, 0.8802391537269859,
				-0.9506755217687678, 0.9506755217687678, -0.9905754753144174, 0.9905754753144174
			],
			[
				-0.0847750130417353, 0.0847750130417353, -0.2518862256915055,
				0.2518862256915055, -0.41175116146284263, 0.41175116146284263,
				-0.5597708310739475, 0.5597708310739475, -0.6916870430603532,
				0.6916870430603532, -0.8037049589725231, 0.8037049589725231,
				-0.8926024664975557, 0.8926024664975557, -0.9558239495713977,
				0.9558239495713977, -0.9915651684209309, 0.9915651684209309
			],
			[
				0, -0.16035864564022537, 0.16035864564022537, -0.31656409996362983,
				0.31656409996362983, -0.46457074137596094, 0.46457074137596094,
				-0.600545304661681, 0.600545304661681, -0.7209661773352294, 0.7209661773352294,
				-0.8227146565371428, 0.8227146565371428, -0.9031559036148179,
				0.9031559036148179, -0.96020815213483, 0.96020815213483, -0.9924068438435844,
				0.9924068438435844
			],
			[
				-0.07652652113349734, 0.07652652113349734, -0.22778585114164507,
				0.22778585114164507, -0.37370608871541955, 0.37370608871541955,
				-0.5108670019508271, 0.5108670019508271, -0.636053680726515, 0.636053680726515,
				-0.7463319064601508, 0.7463319064601508, -0.8391169718222188,
				0.8391169718222188, -0.912234428251326, 0.912234428251326, -0.9639719272779138,
				0.9639719272779138, -0.9931285991850949, 0.9931285991850949
			],
			[
				0, -0.1455618541608951, 0.1455618541608951, -0.2880213168024011,
				0.2880213168024011, -0.4243421202074388, 0.4243421202074388,
				-0.5516188358872198, 0.5516188358872198, -0.6671388041974123,
				0.6671388041974123, -0.7684399634756779, 0.7684399634756779,
				-0.8533633645833173, 0.8533633645833173, -0.9200993341504008,
				0.9200993341504008, -0.9672268385663063, 0.9672268385663063,
				-0.9937521706203895, 0.9937521706203895
			],
			[
				-0.06973927331972223, 0.06973927331972223, -0.20786042668822127,
				0.20786042668822127, -0.34193582089208424, 0.34193582089208424,
				-0.469355837986757, 0.469355837986757, -0.5876404035069116, 0.5876404035069116,
				-0.6944872631866827, 0.6944872631866827, -0.7878168059792081,
				0.7878168059792081, -0.8658125777203002, 0.8658125777203002, -0.926956772187174,
				0.926956772187174, -0.9700604978354287, 0.9700604978354287, -0.9942945854823992,
				0.9942945854823992
			],
			[
				0, -0.1332568242984661, 0.1332568242984661, -0.26413568097034495,
				0.26413568097034495, -0.3903010380302908, 0.3903010380302908,
				-0.5095014778460075, 0.5095014778460075, -0.6196098757636461,
				0.6196098757636461, -0.7186613631319502, 0.7186613631319502,
				-0.8048884016188399, 0.8048884016188399, -0.8767523582704416,
				0.8767523582704416, -0.9329710868260161, 0.9329710868260161,
				-0.9725424712181152, 0.9725424712181152, -0.9947693349975522, 0.9947693349975522
			],
			[
				-0.06405689286260563, 0.06405689286260563, -0.1911188674736163,
				0.1911188674736163, -0.3150426796961634, 0.3150426796961634,
				-0.4337935076260451, 0.4337935076260451, -0.5454214713888396,
				0.5454214713888396, -0.6480936519369755, 0.6480936519369755,
				-0.7401241915785544, 0.7401241915785544, -0.820001985973903, 0.820001985973903,
				-0.8864155270044011, 0.8864155270044011, -0.9382745520027328,
				0.9382745520027328, -0.9747285559713095, 0.9747285559713095,
				-0.9951872199970213, 0.9951872199970213
			]
		]),
		(r.cValues = [
			[],
			[],
			[1, 1],
			[0.8888888888888888, 0.5555555555555556, 0.5555555555555556],
			[
				0.6521451548625461, 0.6521451548625461, 0.34785484513745385, 0.34785484513745385
			],
			[
				0.5688888888888889, 0.47862867049936647, 0.47862867049936647,
				0.23692688505618908, 0.23692688505618908
			],
			[
				0.3607615730481386, 0.3607615730481386, 0.46791393457269104,
				0.46791393457269104, 0.17132449237917036, 0.17132449237917036
			],
			[
				0.4179591836734694, 0.3818300505051189, 0.3818300505051189, 0.27970539148927664,
				0.27970539148927664, 0.1294849661688697, 0.1294849661688697
			],
			[
				0.362683783378362, 0.362683783378362, 0.31370664587788727, 0.31370664587788727,
				0.22238103445337448, 0.22238103445337448, 0.10122853629037626,
				0.10122853629037626
			],
			[
				0.3302393550012598, 0.1806481606948574, 0.1806481606948574, 0.08127438836157441,
				0.08127438836157441, 0.31234707704000286, 0.31234707704000286,
				0.26061069640293544, 0.26061069640293544
			],
			[
				0.29552422471475287, 0.29552422471475287, 0.26926671930999635,
				0.26926671930999635, 0.21908636251598204, 0.21908636251598204,
				0.1494513491505806, 0.1494513491505806, 0.06667134430868814, 0.06667134430868814
			],
			[
				0.2729250867779006, 0.26280454451024665, 0.26280454451024665,
				0.23319376459199048, 0.23319376459199048, 0.18629021092773426,
				0.18629021092773426, 0.1255803694649046, 0.1255803694649046,
				0.05566856711617366, 0.05566856711617366
			],
			[
				0.24914704581340277, 0.24914704581340277, 0.2334925365383548,
				0.2334925365383548, 0.20316742672306592, 0.20316742672306592,
				0.16007832854334622, 0.16007832854334622, 0.10693932599531843,
				0.10693932599531843, 0.04717533638651183, 0.04717533638651183
			],
			[
				0.2325515532308739, 0.22628318026289723, 0.22628318026289723,
				0.2078160475368885, 0.2078160475368885, 0.17814598076194574,
				0.17814598076194574, 0.13887351021978725, 0.13887351021978725,
				0.09212149983772845, 0.09212149983772845, 0.04048400476531588,
				0.04048400476531588
			],
			[
				0.2152638534631578, 0.2152638534631578, 0.2051984637212956, 0.2051984637212956,
				0.18553839747793782, 0.18553839747793782, 0.15720316715819355,
				0.15720316715819355, 0.12151857068790319, 0.12151857068790319,
				0.08015808715976021, 0.08015808715976021, 0.03511946033175186,
				0.03511946033175186
			],
			[
				0.2025782419255613, 0.19843148532711158, 0.19843148532711158,
				0.1861610000155622, 0.1861610000155622, 0.16626920581699392,
				0.16626920581699392, 0.13957067792615432, 0.13957067792615432,
				0.10715922046717194, 0.10715922046717194, 0.07036604748810812,
				0.07036604748810812, 0.03075324199611727, 0.03075324199611727
			],
			[
				0.1894506104550685, 0.1894506104550685, 0.18260341504492358,
				0.18260341504492358, 0.16915651939500254, 0.16915651939500254,
				0.14959598881657674, 0.14959598881657674, 0.12462897125553388,
				0.12462897125553388, 0.09515851168249279, 0.09515851168249279,
				0.062253523938647894, 0.062253523938647894, 0.027152459411754096,
				0.027152459411754096
			],
			[
				0.17944647035620653, 0.17656270536699264, 0.17656270536699264,
				0.16800410215645004, 0.16800410215645004, 0.15404576107681028,
				0.15404576107681028, 0.13513636846852548, 0.13513636846852548,
				0.11188384719340397, 0.11188384719340397, 0.08503614831717918,
				0.08503614831717918, 0.0554595293739872, 0.0554595293739872,
				0.02414830286854793, 0.02414830286854793
			],
			[
				0.1691423829631436, 0.1691423829631436, 0.16427648374583273,
				0.16427648374583273, 0.15468467512626524, 0.15468467512626524,
				0.14064291467065065, 0.14064291467065065, 0.12255520671147846,
				0.12255520671147846, 0.10094204410628717, 0.10094204410628717,
				0.07642573025488905, 0.07642573025488905, 0.0497145488949698,
				0.0497145488949698, 0.02161601352648331, 0.02161601352648331
			],
			[
				0.1610544498487837, 0.15896884339395434, 0.15896884339395434,
				0.15276604206585967, 0.15276604206585967, 0.1426067021736066,
				0.1426067021736066, 0.12875396253933621, 0.12875396253933621,
				0.11156664554733399, 0.11156664554733399, 0.09149002162245, 0.09149002162245,
				0.06904454273764123, 0.06904454273764123, 0.0448142267656996,
				0.0448142267656996, 0.019461788229726478, 0.019461788229726478
			],
			[
				0.15275338713072584, 0.15275338713072584, 0.14917298647260374,
				0.14917298647260374, 0.14209610931838204, 0.14209610931838204,
				0.13168863844917664, 0.13168863844917664, 0.11819453196151841,
				0.11819453196151841, 0.10193011981724044, 0.10193011981724044,
				0.08327674157670475, 0.08327674157670475, 0.06267204833410907,
				0.06267204833410907, 0.04060142980038694, 0.04060142980038694,
				0.017614007139152118, 0.017614007139152118
			],
			[
				0.14608113364969041, 0.14452440398997005, 0.14452440398997005,
				0.13988739479107315, 0.13988739479107315, 0.13226893863333747,
				0.13226893863333747, 0.12183141605372853, 0.12183141605372853,
				0.10879729916714838, 0.10879729916714838, 0.09344442345603386,
				0.09344442345603386, 0.0761001136283793, 0.0761001136283793,
				0.057134425426857205, 0.057134425426857205, 0.036953789770852494,
				0.036953789770852494, 0.016017228257774335, 0.016017228257774335
			],
			[
				0.13925187285563198, 0.13925187285563198, 0.13654149834601517,
				0.13654149834601517, 0.13117350478706238, 0.13117350478706238,
				0.12325237681051242, 0.12325237681051242, 0.11293229608053922,
				0.11293229608053922, 0.10041414444288096, 0.10041414444288096,
				0.08594160621706773, 0.08594160621706773, 0.06979646842452049,
				0.06979646842452049, 0.052293335152683286, 0.052293335152683286,
				0.03377490158481415, 0.03377490158481415, 0.0146279952982722, 0.0146279952982722
			],
			[
				0.13365457218610619, 0.1324620394046966, 0.1324620394046966,
				0.12890572218808216, 0.12890572218808216, 0.12304908430672953,
				0.12304908430672953, 0.11499664022241136, 0.11499664022241136,
				0.10489209146454141, 0.10489209146454141, 0.09291576606003515,
				0.09291576606003515, 0.07928141177671895, 0.07928141177671895,
				0.06423242140852585, 0.06423242140852585, 0.04803767173108467,
				0.04803767173108467, 0.030988005856979445, 0.030988005856979445,
				0.013411859487141771, 0.013411859487141771
			],
			[
				0.12793819534675216, 0.12793819534675216, 0.1258374563468283,
				0.1258374563468283, 0.12167047292780339, 0.12167047292780339,
				0.1155056680537256, 0.1155056680537256, 0.10744427011596563,
				0.10744427011596563, 0.09761865210411388, 0.09761865210411388,
				0.08619016153195327, 0.08619016153195327, 0.0733464814110803,
				0.0733464814110803, 0.05929858491543678, 0.05929858491543678,
				0.04427743881741981, 0.04427743881741981, 0.028531388628933663,
				0.028531388628933663, 0.0123412297999872, 0.0123412297999872
			]
		]),
		(r.binomialCoefficients = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]);
	const e = (o, s, l) => {
		let c, u;
		const g = l / 2;
		c = 0;
		for (let h = 0; h < 20; h++)
			(u = g * r.tValues[20][h] + g), (c += r.cValues[20][h] * n(o, s, u));
		return g * c;
	};
	r.getCubicArcLength = e;
	const t = (o, s, l) => {
		l === void 0 && (l = 1);
		const c = o[0] - 2 * o[1] + o[2],
			u = s[0] - 2 * s[1] + s[2],
			f = 2 * o[1] - 2 * o[0],
			g = 2 * s[1] - 2 * s[0],
			h = 4 * (c * c + u * u),
			d = 4 * (c * f + u * g),
			m = f * f + g * g;
		if (h === 0)
			return l * Math.sqrt(Math.pow(o[2] - o[0], 2) + Math.pow(s[2] - s[0], 2));
		const y = d / (2 * h),
			v = m / h,
			S = l + y,
			p = v - y * y,
			b = S * S + p > 0 ? Math.sqrt(S * S + p) : 0,
			x = y * y + p > 0 ? Math.sqrt(y * y + p) : 0,
			C =
				y + Math.sqrt(y * y + p) !== 0 ? p * Math.log(Math.abs((S + b) / (y + x))) : 0;
		return (Math.sqrt(h) / 2) * (S * b - y * x + C);
	};
	r.getQuadraticArcLength = t;
	function n(o, s, l) {
		const c = i(1, l, o),
			u = i(1, l, s),
			f = c * c + u * u;
		return Math.sqrt(f);
	}
	const i = (o, s, l) => {
			const c = l.length - 1;
			let u, f;
			if (c === 0) return 0;
			if (o === 0) {
				f = 0;
				for (let g = 0; g <= c; g++)
					f +=
						r.binomialCoefficients[c][g] *
						Math.pow(1 - s, c - g) *
						Math.pow(s, g) *
						l[g];
				return f;
			} else {
				u = new Array(c);
				for (let g = 0; g < c; g++) u[g] = c * (l[g + 1] - l[g]);
				return i(o - 1, s, u);
			}
		},
		a = (o, s, l) => {
			let c = 1,
				u = o / s,
				f = (o - l(u)) / s,
				g = 0;
			for (; c > 0.001; ) {
				const h = l(u + f),
					d = Math.abs(o - h) / s;
				if (d < c) (c = d), (u += f);
				else {
					const m = l(u - f),
						y = Math.abs(o - m) / s;
					y < c ? ((c = y), (u -= f)) : (f /= 2);
				}
				if ((g++, g > 500)) break;
			}
			return u;
		};
	r.t2length = a;
})(Hh);
Object.defineProperty(Zr, '__esModule', { value: !0 });
Zr.Path = void 0;
const U2 = J,
	j2 = Te,
	z2 = Q,
	Rr = Hh;
class Ee extends j2.Shape {
	constructor(e) {
		super(e),
			(this.dataArray = []),
			(this.pathLength = 0),
			this._readDataAttribute(),
			this.on('dataChange.konva', function () {
				this._readDataAttribute();
			});
	}
	_readDataAttribute() {
		(this.dataArray = Ee.parsePathData(this.data())),
			(this.pathLength = Ee.getPathLength(this.dataArray));
	}
	_sceneFunc(e) {
		const t = this.dataArray;
		e.beginPath();
		let n = !1;
		for (let m = 0; m < t.length; m++) {
			const y = t[m].command,
				v = t[m].points;
			switch (y) {
				case 'L':
					e.lineTo(v[0], v[1]);
					break;
				case 'M':
					e.moveTo(v[0], v[1]);
					break;
				case 'C':
					e.bezierCurveTo(v[0], v[1], v[2], v[3], v[4], v[5]);
					break;
				case 'Q':
					e.quadraticCurveTo(v[0], v[1], v[2], v[3]);
					break;
				case 'A':
					var i = v[0],
						a = v[1],
						o = v[2],
						s = v[3],
						l = v[4],
						c = v[5],
						u = v[6],
						f = v[7],
						g = o > s ? o : s,
						h = o > s ? 1 : o / s,
						d = o > s ? s / o : 1;
					e.translate(i, a),
						e.rotate(u),
						e.scale(h, d),
						e.arc(0, 0, g, l, l + c, 1 - f),
						e.scale(1 / h, 1 / d),
						e.rotate(-u),
						e.translate(-i, -a);
					break;
				case 'z':
					(n = !0), e.closePath();
					break;
			}
		}
		!n && !this.hasFill() ? e.strokeShape(this) : e.fillStrokeShape(this);
	}
	getSelfRect() {
		let e = [];
		this.dataArray.forEach(function (l) {
			if (l.command === 'A') {
				const c = l.points[4],
					u = l.points[5],
					f = l.points[4] + u;
				let g = Math.PI / 180;
				if ((Math.abs(c - f) < g && (g = Math.abs(c - f)), u < 0))
					for (let h = c - g; h > f; h -= g) {
						const d = Ee.getPointOnEllipticalArc(
							l.points[0],
							l.points[1],
							l.points[2],
							l.points[3],
							h,
							0
						);
						e.push(d.x, d.y);
					}
				else
					for (let h = c + g; h < f; h += g) {
						const d = Ee.getPointOnEllipticalArc(
							l.points[0],
							l.points[1],
							l.points[2],
							l.points[3],
							h,
							0
						);
						e.push(d.x, d.y);
					}
			} else if (l.command === 'C')
				for (let c = 0; c <= 1; c += 0.01) {
					const u = Ee.getPointOnCubicBezier(
						c,
						l.start.x,
						l.start.y,
						l.points[0],
						l.points[1],
						l.points[2],
						l.points[3],
						l.points[4],
						l.points[5]
					);
					e.push(u.x, u.y);
				}
			else e = e.concat(l.points);
		});
		let t = e[0],
			n = e[0],
			i = e[1],
			a = e[1],
			o,
			s;
		for (let l = 0; l < e.length / 2; l++)
			(o = e[l * 2]),
				(s = e[l * 2 + 1]),
				isNaN(o) || ((t = Math.min(t, o)), (n = Math.max(n, o))),
				isNaN(s) || ((i = Math.min(i, s)), (a = Math.max(a, s)));
		return { x: t, y: i, width: n - t, height: a - i };
	}
	getLength() {
		return this.pathLength;
	}
	getPointAtLength(e) {
		return Ee.getPointAtLengthOfDataArray(e, this.dataArray);
	}
	static getLineLength(e, t, n, i) {
		return Math.sqrt((n - e) * (n - e) + (i - t) * (i - t));
	}
	static getPathLength(e) {
		let t = 0;
		for (let n = 0; n < e.length; ++n) t += e[n].pathLength;
		return t;
	}
	static getPointAtLengthOfDataArray(e, t) {
		let n,
			i = 0,
			a = t.length;
		if (!a) return null;
		for (; i < a && e > t[i].pathLength; ) (e -= t[i].pathLength), ++i;
		if (i === a) return (n = t[i - 1].points.slice(-2)), { x: n[0], y: n[1] };
		if (e < 0.01) return (n = t[i].points.slice(0, 2)), { x: n[0], y: n[1] };
		const o = t[i],
			s = o.points;
		switch (o.command) {
			case 'L':
				return Ee.getPointOnLine(e, o.start.x, o.start.y, s[0], s[1]);
			case 'C':
				return Ee.getPointOnCubicBezier(
					(0, Rr.t2length)(e, Ee.getPathLength(t), (m) =>
						(0, Rr.getCubicArcLength)(
							[o.start.x, s[0], s[2], s[4]],
							[o.start.y, s[1], s[3], s[5]],
							m
						)
					),
					o.start.x,
					o.start.y,
					s[0],
					s[1],
					s[2],
					s[3],
					s[4],
					s[5]
				);
			case 'Q':
				return Ee.getPointOnQuadraticBezier(
					(0, Rr.t2length)(e, Ee.getPathLength(t), (m) =>
						(0, Rr.getQuadraticArcLength)(
							[o.start.x, s[0], s[2]],
							[o.start.y, s[1], s[3]],
							m
						)
					),
					o.start.x,
					o.start.y,
					s[0],
					s[1],
					s[2],
					s[3]
				);
			case 'A':
				var l = s[0],
					c = s[1],
					u = s[2],
					f = s[3],
					g = s[4],
					h = s[5],
					d = s[6];
				return (
					(g += (h * e) / o.pathLength), Ee.getPointOnEllipticalArc(l, c, u, f, g, d)
				);
		}
		return null;
	}
	static getPointOnLine(e, t, n, i, a, o, s) {
		(o = o ?? t), (s = s ?? n);
		const l = this.getLineLength(t, n, i, a);
		if (l < 1e-10) return { x: t, y: n };
		if (i === t) return { x: o, y: s + (a > n ? e : -e) };
		const c = (a - n) / (i - t),
			u = Math.sqrt((e * e) / (1 + c * c)) * (i < t ? -1 : 1),
			f = c * u;
		if (Math.abs(s - n - c * (o - t)) < 1e-10) return { x: o + u, y: s + f };
		const g = ((o - t) * (i - t) + (s - n) * (a - n)) / (l * l),
			h = t + g * (i - t),
			d = n + g * (a - n),
			m = this.getLineLength(o, s, h, d),
			y = Math.sqrt(e * e - m * m),
			v = Math.sqrt((y * y) / (1 + c * c)) * (i < t ? -1 : 1),
			S = c * v;
		return { x: h + v, y: d + S };
	}
	static getPointOnCubicBezier(e, t, n, i, a, o, s, l, c) {
		function u(y) {
			return y * y * y;
		}
		function f(y) {
			return 3 * y * y * (1 - y);
		}
		function g(y) {
			return 3 * y * (1 - y) * (1 - y);
		}
		function h(y) {
			return (1 - y) * (1 - y) * (1 - y);
		}
		const d = l * u(e) + o * f(e) + i * g(e) + t * h(e),
			m = c * u(e) + s * f(e) + a * g(e) + n * h(e);
		return { x: d, y: m };
	}
	static getPointOnQuadraticBezier(e, t, n, i, a, o, s) {
		function l(h) {
			return h * h;
		}
		function c(h) {
			return 2 * h * (1 - h);
		}
		function u(h) {
			return (1 - h) * (1 - h);
		}
		const f = o * l(e) + i * c(e) + t * u(e),
			g = s * l(e) + a * c(e) + n * u(e);
		return { x: f, y: g };
	}
	static getPointOnEllipticalArc(e, t, n, i, a, o) {
		const s = Math.cos(o),
			l = Math.sin(o),
			c = { x: n * Math.cos(a), y: i * Math.sin(a) };
		return { x: e + (c.x * s - c.y * l), y: t + (c.x * l + c.y * s) };
	}
	static parsePathData(e) {
		if (!e) return [];
		let t = e;
		const n = [
			'm',
			'M',
			'l',
			'L',
			'v',
			'V',
			'h',
			'H',
			'z',
			'Z',
			'c',
			'C',
			'q',
			'Q',
			't',
			'T',
			's',
			'S',
			'a',
			'A'
		];
		t = t.replace(new RegExp(' ', 'g'), ',');
		for (var i = 0; i < n.length; i++) t = t.replace(new RegExp(n[i], 'g'), '|' + n[i]);
		const a = t.split('|'),
			o = [],
			s = [];
		let l = 0,
			c = 0;
		const u = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
		let f;
		for (i = 1; i < a.length; i++) {
			let I = a[i],
				T = I.charAt(0);
			for (I = I.slice(1), s.length = 0; (f = u.exec(I)); ) s.push(f[0]);
			const w = [];
			for (let P = 0, $ = s.length; P < $; P++) {
				if (s[P] === '00') {
					w.push(0, 0);
					continue;
				}
				const N = parseFloat(s[P]);
				isNaN(N) ? w.push(0) : w.push(N);
			}
			for (; w.length > 0 && !isNaN(w[0]); ) {
				let P = '',
					$ = [];
				const N = l,
					M = c;
				var g, h, d, m, y, v, S, p, b, x;
				switch (T) {
					case 'l':
						(l += w.shift()), (c += w.shift()), (P = 'L'), $.push(l, c);
						break;
					case 'L':
						(l = w.shift()), (c = w.shift()), $.push(l, c);
						break;
					case 'm':
						var C = w.shift(),
							O = w.shift();
						if (
							((l += C),
							(c += O),
							(P = 'M'),
							o.length > 2 && o[o.length - 1].command === 'z')
						) {
							for (let R = o.length - 2; R >= 0; R--)
								if (o[R].command === 'M') {
									(l = o[R].points[0] + C), (c = o[R].points[1] + O);
									break;
								}
						}
						$.push(l, c), (T = 'l');
						break;
					case 'M':
						(l = w.shift()), (c = w.shift()), (P = 'M'), $.push(l, c), (T = 'L');
						break;
					case 'h':
						(l += w.shift()), (P = 'L'), $.push(l, c);
						break;
					case 'H':
						(l = w.shift()), (P = 'L'), $.push(l, c);
						break;
					case 'v':
						(c += w.shift()), (P = 'L'), $.push(l, c);
						break;
					case 'V':
						(c = w.shift()), (P = 'L'), $.push(l, c);
						break;
					case 'C':
						$.push(w.shift(), w.shift(), w.shift(), w.shift()),
							(l = w.shift()),
							(c = w.shift()),
							$.push(l, c);
						break;
					case 'c':
						$.push(l + w.shift(), c + w.shift(), l + w.shift(), c + w.shift()),
							(l += w.shift()),
							(c += w.shift()),
							(P = 'C'),
							$.push(l, c);
						break;
					case 'S':
						(h = l),
							(d = c),
							(g = o[o.length - 1]),
							g.command === 'C' &&
								((h = l + (l - g.points[2])), (d = c + (c - g.points[3]))),
							$.push(h, d, w.shift(), w.shift()),
							(l = w.shift()),
							(c = w.shift()),
							(P = 'C'),
							$.push(l, c);
						break;
					case 's':
						(h = l),
							(d = c),
							(g = o[o.length - 1]),
							g.command === 'C' &&
								((h = l + (l - g.points[2])), (d = c + (c - g.points[3]))),
							$.push(h, d, l + w.shift(), c + w.shift()),
							(l += w.shift()),
							(c += w.shift()),
							(P = 'C'),
							$.push(l, c);
						break;
					case 'Q':
						$.push(w.shift(), w.shift()),
							(l = w.shift()),
							(c = w.shift()),
							$.push(l, c);
						break;
					case 'q':
						$.push(l + w.shift(), c + w.shift()),
							(l += w.shift()),
							(c += w.shift()),
							(P = 'Q'),
							$.push(l, c);
						break;
					case 'T':
						(h = l),
							(d = c),
							(g = o[o.length - 1]),
							g.command === 'Q' &&
								((h = l + (l - g.points[0])), (d = c + (c - g.points[1]))),
							(l = w.shift()),
							(c = w.shift()),
							(P = 'Q'),
							$.push(h, d, l, c);
						break;
					case 't':
						(h = l),
							(d = c),
							(g = o[o.length - 1]),
							g.command === 'Q' &&
								((h = l + (l - g.points[0])), (d = c + (c - g.points[1]))),
							(l += w.shift()),
							(c += w.shift()),
							(P = 'Q'),
							$.push(h, d, l, c);
						break;
					case 'A':
						(m = w.shift()),
							(y = w.shift()),
							(v = w.shift()),
							(S = w.shift()),
							(p = w.shift()),
							(b = l),
							(x = c),
							(l = w.shift()),
							(c = w.shift()),
							(P = 'A'),
							($ = this.convertEndpointToCenterParameterization(
								b,
								x,
								l,
								c,
								S,
								p,
								m,
								y,
								v
							));
						break;
					case 'a':
						(m = w.shift()),
							(y = w.shift()),
							(v = w.shift()),
							(S = w.shift()),
							(p = w.shift()),
							(b = l),
							(x = c),
							(l += w.shift()),
							(c += w.shift()),
							(P = 'A'),
							($ = this.convertEndpointToCenterParameterization(
								b,
								x,
								l,
								c,
								S,
								p,
								m,
								y,
								v
							));
						break;
				}
				o.push({
					command: P || T,
					points: $,
					start: { x: N, y: M },
					pathLength: this.calcLength(N, M, P || T, $)
				});
			}
			(T === 'z' || T === 'Z') &&
				o.push({ command: 'z', points: [], start: void 0, pathLength: 0 });
		}
		return o;
	}
	static calcLength(e, t, n, i) {
		let a, o, s, l;
		const c = Ee;
		switch (n) {
			case 'L':
				return c.getLineLength(e, t, i[0], i[1]);
			case 'C':
				return (0, Rr.getCubicArcLength)(
					[e, i[0], i[2], i[4]],
					[t, i[1], i[3], i[5]],
					1
				);
			case 'Q':
				return (0, Rr.getQuadraticArcLength)([e, i[0], i[2]], [t, i[1], i[3]], 1);
			case 'A':
				a = 0;
				var u = i[4],
					f = i[5],
					g = i[4] + f,
					h = Math.PI / 180;
				if (
					(Math.abs(u - g) < h && (h = Math.abs(u - g)),
					(o = c.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], u, 0)),
					f < 0)
				)
					for (l = u - h; l > g; l -= h)
						(s = c.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], l, 0)),
							(a += c.getLineLength(o.x, o.y, s.x, s.y)),
							(o = s);
				else
					for (l = u + h; l < g; l += h)
						(s = c.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], l, 0)),
							(a += c.getLineLength(o.x, o.y, s.x, s.y)),
							(o = s);
				return (
					(s = c.getPointOnEllipticalArc(i[0], i[1], i[2], i[3], g, 0)),
					(a += c.getLineLength(o.x, o.y, s.x, s.y)),
					a
				);
		}
		return 0;
	}
	static convertEndpointToCenterParameterization(e, t, n, i, a, o, s, l, c) {
		const u = c * (Math.PI / 180),
			f = (Math.cos(u) * (e - n)) / 2 + (Math.sin(u) * (t - i)) / 2,
			g = (-1 * Math.sin(u) * (e - n)) / 2 + (Math.cos(u) * (t - i)) / 2,
			h = (f * f) / (s * s) + (g * g) / (l * l);
		h > 1 && ((s *= Math.sqrt(h)), (l *= Math.sqrt(h)));
		let d = Math.sqrt(
			(s * s * (l * l) - s * s * (g * g) - l * l * (f * f)) /
				(s * s * (g * g) + l * l * (f * f))
		);
		a === o && (d *= -1), isNaN(d) && (d = 0);
		const m = (d * s * g) / l,
			y = (d * -l * f) / s,
			v = (e + n) / 2 + Math.cos(u) * m - Math.sin(u) * y,
			S = (t + i) / 2 + Math.sin(u) * m + Math.cos(u) * y,
			p = function (w) {
				return Math.sqrt(w[0] * w[0] + w[1] * w[1]);
			},
			b = function (w, P) {
				return (w[0] * P[0] + w[1] * P[1]) / (p(w) * p(P));
			},
			x = function (w, P) {
				return (w[0] * P[1] < w[1] * P[0] ? -1 : 1) * Math.acos(b(w, P));
			},
			C = x([1, 0], [(f - m) / s, (g - y) / l]),
			O = [(f - m) / s, (g - y) / l],
			I = [(-1 * f - m) / s, (-1 * g - y) / l];
		let T = x(O, I);
		return (
			b(O, I) <= -1 && (T = Math.PI),
			b(O, I) >= 1 && (T = 0),
			o === 0 && T > 0 && (T = T - 2 * Math.PI),
			o === 1 && T < 0 && (T = T + 2 * Math.PI),
			[v, S, s, l, C, T, u, o]
		);
	}
}
Zr.Path = Ee;
Ee.prototype.className = 'Path';
Ee.prototype._attrsAffectingSize = ['data'];
(0, z2._registerNode)(Ee);
U2.Factory.addGetterSetter(Ee, 'data');
Object.defineProperty(ra, '__esModule', { value: !0 });
ra.Arrow = void 0;
const ia = J,
	H2 = Wn,
	Wh = H,
	W2 = Q,
	Ec = Zr;
class xr extends H2.Line {
	_sceneFunc(e) {
		super._sceneFunc(e);
		const t = Math.PI * 2,
			n = this.points();
		let i = n;
		const a = this.tension() !== 0 && n.length > 4;
		a && (i = this.getTensionPoints());
		const o = this.pointerLength(),
			s = n.length;
		let l, c;
		if (a) {
			const g = [
					i[i.length - 4],
					i[i.length - 3],
					i[i.length - 2],
					i[i.length - 1],
					n[s - 2],
					n[s - 1]
				],
				h = Ec.Path.calcLength(i[i.length - 4], i[i.length - 3], 'C', g),
				d = Ec.Path.getPointOnQuadraticBezier(
					Math.min(1, 1 - o / h),
					g[0],
					g[1],
					g[2],
					g[3],
					g[4],
					g[5]
				);
			(l = n[s - 2] - d.x), (c = n[s - 1] - d.y);
		} else (l = n[s - 2] - n[s - 4]), (c = n[s - 1] - n[s - 3]);
		const u = (Math.atan2(c, l) + t) % t,
			f = this.pointerWidth();
		this.pointerAtEnding() &&
			(e.save(),
			e.beginPath(),
			e.translate(n[s - 2], n[s - 1]),
			e.rotate(u),
			e.moveTo(0, 0),
			e.lineTo(-o, f / 2),
			e.lineTo(-o, -f / 2),
			e.closePath(),
			e.restore(),
			this.__fillStroke(e)),
			this.pointerAtBeginning() &&
				(e.save(),
				e.beginPath(),
				e.translate(n[0], n[1]),
				a
					? ((l = (i[0] + i[2]) / 2 - n[0]), (c = (i[1] + i[3]) / 2 - n[1]))
					: ((l = n[2] - n[0]), (c = n[3] - n[1])),
				e.rotate((Math.atan2(-c, -l) + t) % t),
				e.moveTo(0, 0),
				e.lineTo(-o, f / 2),
				e.lineTo(-o, -f / 2),
				e.closePath(),
				e.restore(),
				this.__fillStroke(e));
	}
	__fillStroke(e) {
		const t = this.dashEnabled();
		t && ((this.attrs.dashEnabled = !1), e.setLineDash([])),
			e.fillStrokeShape(this),
			t && (this.attrs.dashEnabled = !0);
	}
	getSelfRect() {
		const e = super.getSelfRect(),
			t = this.pointerWidth() / 2;
		return { x: e.x, y: e.y - t, width: e.width, height: e.height + t * 2 };
	}
}
ra.Arrow = xr;
xr.prototype.className = 'Arrow';
(0, W2._registerNode)(xr);
ia.Factory.addGetterSetter(xr, 'pointerLength', 10, (0, Wh.getNumberValidator)());
ia.Factory.addGetterSetter(xr, 'pointerWidth', 10, (0, Wh.getNumberValidator)());
ia.Factory.addGetterSetter(xr, 'pointerAtBeginning', !1);
ia.Factory.addGetterSetter(xr, 'pointerAtEnding', !0);
var aa = {};
Object.defineProperty(aa, '__esModule', { value: !0 });
aa.Circle = void 0;
const K2 = J,
	Y2 = Te,
	X2 = H,
	q2 = Q;
class en extends Y2.Shape {
	_sceneFunc(e) {
		e.beginPath(),
			e.arc(0, 0, this.attrs.radius || 0, 0, Math.PI * 2, !1),
			e.closePath(),
			e.fillStrokeShape(this);
	}
	getWidth() {
		return this.radius() * 2;
	}
	getHeight() {
		return this.radius() * 2;
	}
	setWidth(e) {
		this.radius() !== e / 2 && this.radius(e / 2);
	}
	setHeight(e) {
		this.radius() !== e / 2 && this.radius(e / 2);
	}
}
aa.Circle = en;
en.prototype._centroid = !0;
en.prototype.className = 'Circle';
en.prototype._attrsAffectingSize = ['radius'];
(0, q2._registerNode)(en);
K2.Factory.addGetterSetter(en, 'radius', 0, (0, X2.getNumberValidator)());
var oa = {};
Object.defineProperty(oa, '__esModule', { value: !0 });
oa.Ellipse = void 0;
const el = J,
	Q2 = Te,
	Kh = H,
	J2 = Q;
class nr extends Q2.Shape {
	_sceneFunc(e) {
		const t = this.radiusX(),
			n = this.radiusY();
		e.beginPath(),
			e.save(),
			t !== n && e.scale(1, n / t),
			e.arc(0, 0, t, 0, Math.PI * 2, !1),
			e.restore(),
			e.closePath(),
			e.fillStrokeShape(this);
	}
	getWidth() {
		return this.radiusX() * 2;
	}
	getHeight() {
		return this.radiusY() * 2;
	}
	setWidth(e) {
		this.radiusX(e / 2);
	}
	setHeight(e) {
		this.radiusY(e / 2);
	}
}
oa.Ellipse = nr;
nr.prototype.className = 'Ellipse';
nr.prototype._centroid = !0;
nr.prototype._attrsAffectingSize = ['radiusX', 'radiusY'];
(0, J2._registerNode)(nr);
el.Factory.addComponentsGetterSetter(nr, 'radius', ['x', 'y']);
el.Factory.addGetterSetter(nr, 'radiusX', 0, (0, Kh.getNumberValidator)());
el.Factory.addGetterSetter(nr, 'radiusY', 0, (0, Kh.getNumberValidator)());
var sa = {};
Object.defineProperty(sa, '__esModule', { value: !0 });
sa.Image = void 0;
const uo = ye,
	Cr = J,
	Z2 = Te,
	ep = Q,
	Kn = H;
class tt extends Z2.Shape {
	constructor(e) {
		super(e),
			(this._loadListener = () => {
				this._requestDraw();
			}),
			this.on('imageChange.konva', (t) => {
				this._removeImageLoad(t.oldVal), this._setImageLoad();
			}),
			this._setImageLoad();
	}
	_setImageLoad() {
		const e = this.image();
		(e && e.complete) ||
			(e && e.readyState === 4) ||
			(e && e.addEventListener && e.addEventListener('load', this._loadListener));
	}
	_removeImageLoad(e) {
		e && e.removeEventListener && e.removeEventListener('load', this._loadListener);
	}
	destroy() {
		return this._removeImageLoad(this.image()), super.destroy(), this;
	}
	_useBufferCanvas() {
		const e = !!this.cornerRadius(),
			t = this.hasShadow();
		return e && t ? !0 : super._useBufferCanvas(!0);
	}
	_sceneFunc(e) {
		const t = this.getWidth(),
			n = this.getHeight(),
			i = this.cornerRadius(),
			a = this.attrs.image;
		let o;
		if (a) {
			const s = this.attrs.cropWidth,
				l = this.attrs.cropHeight;
			s && l
				? (o = [a, this.cropX(), this.cropY(), s, l, 0, 0, t, n])
				: (o = [a, 0, 0, t, n]);
		}
		(this.hasFill() || this.hasStroke() || i) &&
			(e.beginPath(),
			i ? uo.Util.drawRoundedRectPath(e, t, n, i) : e.rect(0, 0, t, n),
			e.closePath(),
			e.fillStrokeShape(this)),
			a && (i && e.clip(), e.drawImage.apply(e, o));
	}
	_hitFunc(e) {
		const t = this.width(),
			n = this.height(),
			i = this.cornerRadius();
		e.beginPath(),
			i ? uo.Util.drawRoundedRectPath(e, t, n, i) : e.rect(0, 0, t, n),
			e.closePath(),
			e.fillStrokeShape(this);
	}
	getWidth() {
		var e, t;
		return (e = this.attrs.width) !== null && e !== void 0
			? e
			: (t = this.image()) === null || t === void 0
				? void 0
				: t.width;
	}
	getHeight() {
		var e, t;
		return (e = this.attrs.height) !== null && e !== void 0
			? e
			: (t = this.image()) === null || t === void 0
				? void 0
				: t.height;
	}
	static fromURL(e, t, n = null) {
		const i = uo.Util.createImageElement();
		(i.onload = function () {
			const a = new tt({ image: i });
			t(a);
		}),
			(i.onerror = n),
			(i.crossOrigin = 'Anonymous'),
			(i.src = e);
	}
}
sa.Image = tt;
tt.prototype.className = 'Image';
(0, ep._registerNode)(tt);
Cr.Factory.addGetterSetter(
	tt,
	'cornerRadius',
	0,
	(0, Kn.getNumberOrArrayOfNumbersValidator)(4)
);
Cr.Factory.addGetterSetter(tt, 'image');
Cr.Factory.addComponentsGetterSetter(tt, 'crop', ['x', 'y', 'width', 'height']);
Cr.Factory.addGetterSetter(tt, 'cropX', 0, (0, Kn.getNumberValidator)());
Cr.Factory.addGetterSetter(tt, 'cropY', 0, (0, Kn.getNumberValidator)());
Cr.Factory.addGetterSetter(tt, 'cropWidth', 0, (0, Kn.getNumberValidator)());
Cr.Factory.addGetterSetter(tt, 'cropHeight', 0, (0, Kn.getNumberValidator)());
var jr = {};
Object.defineProperty(jr, '__esModule', { value: !0 });
jr.Tag = jr.Label = void 0;
const la = J,
	tp = Te,
	rp = Qr,
	tl = H,
	Yh = Q,
	Xh = [
		'fontFamily',
		'fontSize',
		'fontStyle',
		'padding',
		'lineHeight',
		'text',
		'width',
		'height',
		'pointerDirection',
		'pointerWidth',
		'pointerHeight'
	],
	np = 'Change.konva',
	ip = 'none',
	gs = 'up',
	ps = 'right',
	ms = 'down',
	vs = 'left',
	ap = Xh.length;
class rl extends rp.Group {
	constructor(e) {
		super(e),
			this.on('add.konva', function (t) {
				this._addListeners(t.child), this._sync();
			});
	}
	getText() {
		return this.find('Text')[0];
	}
	getTag() {
		return this.find('Tag')[0];
	}
	_addListeners(e) {
		let t = this,
			n;
		const i = function () {
			t._sync();
		};
		for (n = 0; n < ap; n++) e.on(Xh[n] + np, i);
	}
	getWidth() {
		return this.getText().width();
	}
	getHeight() {
		return this.getText().height();
	}
	_sync() {
		let e = this.getText(),
			t = this.getTag(),
			n,
			i,
			a,
			o,
			s,
			l,
			c;
		if (e && t) {
			switch (
				((n = e.width()),
				(i = e.height()),
				(a = t.pointerDirection()),
				(o = t.pointerWidth()),
				(c = t.pointerHeight()),
				(s = 0),
				(l = 0),
				a)
			) {
				case gs:
					(s = n / 2), (l = -1 * c);
					break;
				case ps:
					(s = n + o), (l = i / 2);
					break;
				case ms:
					(s = n / 2), (l = i + c);
					break;
				case vs:
					(s = -1 * o), (l = i / 2);
					break;
			}
			t.setAttrs({ x: -1 * s, y: -1 * l, width: n, height: i }),
				e.setAttrs({ x: -1 * s, y: -1 * l });
		}
	}
}
jr.Label = rl;
rl.prototype.className = 'Label';
(0, Yh._registerNode)(rl);
class Er extends tp.Shape {
	_sceneFunc(e) {
		const t = this.width(),
			n = this.height(),
			i = this.pointerDirection(),
			a = this.pointerWidth(),
			o = this.pointerHeight(),
			s = this.cornerRadius();
		let l = 0,
			c = 0,
			u = 0,
			f = 0;
		typeof s == 'number'
			? (l = c = u = f = Math.min(s, t / 2, n / 2))
			: ((l = Math.min(s[0] || 0, t / 2, n / 2)),
				(c = Math.min(s[1] || 0, t / 2, n / 2)),
				(f = Math.min(s[2] || 0, t / 2, n / 2)),
				(u = Math.min(s[3] || 0, t / 2, n / 2))),
			e.beginPath(),
			e.moveTo(l, 0),
			i === gs &&
				(e.lineTo((t - a) / 2, 0), e.lineTo(t / 2, -1 * o), e.lineTo((t + a) / 2, 0)),
			e.lineTo(t - c, 0),
			e.arc(t - c, c, c, (Math.PI * 3) / 2, 0, !1),
			i === ps &&
				(e.lineTo(t, (n - o) / 2), e.lineTo(t + a, n / 2), e.lineTo(t, (n + o) / 2)),
			e.lineTo(t, n - f),
			e.arc(t - f, n - f, f, 0, Math.PI / 2, !1),
			i === ms &&
				(e.lineTo((t + a) / 2, n), e.lineTo(t / 2, n + o), e.lineTo((t - a) / 2, n)),
			e.lineTo(u, n),
			e.arc(u, n - u, u, Math.PI / 2, Math.PI, !1),
			i === vs &&
				(e.lineTo(0, (n + o) / 2), e.lineTo(-1 * a, n / 2), e.lineTo(0, (n - o) / 2)),
			e.lineTo(0, l),
			e.arc(l, l, l, Math.PI, (Math.PI * 3) / 2, !1),
			e.closePath(),
			e.fillStrokeShape(this);
	}
	getSelfRect() {
		let e = 0,
			t = 0,
			n = this.pointerWidth(),
			i = this.pointerHeight(),
			a = this.pointerDirection(),
			o = this.width(),
			s = this.height();
		return (
			a === gs
				? ((t -= i), (s += i))
				: a === ms
					? (s += i)
					: a === vs
						? ((e -= n * 1.5), (o += n))
						: a === ps && (o += n * 1.5),
			{ x: e, y: t, width: o, height: s }
		);
	}
}
jr.Tag = Er;
Er.prototype.className = 'Tag';
(0, Yh._registerNode)(Er);
la.Factory.addGetterSetter(Er, 'pointerDirection', ip);
la.Factory.addGetterSetter(Er, 'pointerWidth', 0, (0, tl.getNumberValidator)());
la.Factory.addGetterSetter(Er, 'pointerHeight', 0, (0, tl.getNumberValidator)());
la.Factory.addGetterSetter(
	Er,
	'cornerRadius',
	0,
	(0, tl.getNumberOrArrayOfNumbersValidator)(4)
);
var Yn = {};
Object.defineProperty(Yn, '__esModule', { value: !0 });
Yn.Rect = void 0;
const op = J,
	sp = Te,
	lp = Q,
	cp = ye,
	dp = H;
class ca extends sp.Shape {
	_sceneFunc(e) {
		const t = this.cornerRadius(),
			n = this.width(),
			i = this.height();
		e.beginPath(),
			t ? cp.Util.drawRoundedRectPath(e, n, i, t) : e.rect(0, 0, n, i),
			e.closePath(),
			e.fillStrokeShape(this);
	}
}
Yn.Rect = ca;
ca.prototype.className = 'Rect';
(0, lp._registerNode)(ca);
op.Factory.addGetterSetter(
	ca,
	'cornerRadius',
	0,
	(0, dp.getNumberOrArrayOfNumbersValidator)(4)
);
var da = {};
Object.defineProperty(da, '__esModule', { value: !0 });
da.RegularPolygon = void 0;
const qh = J,
	hp = Te,
	Qh = H,
	up = Q;
class Pr extends hp.Shape {
	_sceneFunc(e) {
		const t = this._getPoints();
		e.beginPath(), e.moveTo(t[0].x, t[0].y);
		for (let n = 1; n < t.length; n++) e.lineTo(t[n].x, t[n].y);
		e.closePath(), e.fillStrokeShape(this);
	}
	_getPoints() {
		const e = this.attrs.sides,
			t = this.attrs.radius || 0,
			n = [];
		for (let i = 0; i < e; i++)
			n.push({
				x: t * Math.sin((i * 2 * Math.PI) / e),
				y: -1 * t * Math.cos((i * 2 * Math.PI) / e)
			});
		return n;
	}
	getSelfRect() {
		const e = this._getPoints();
		let t = e[0].x,
			n = e[0].y,
			i = e[0].x,
			a = e[0].y;
		return (
			e.forEach((o) => {
				(t = Math.min(t, o.x)),
					(n = Math.max(n, o.x)),
					(i = Math.min(i, o.y)),
					(a = Math.max(a, o.y));
			}),
			{ x: t, y: i, width: n - t, height: a - i }
		);
	}
	getWidth() {
		return this.radius() * 2;
	}
	getHeight() {
		return this.radius() * 2;
	}
	setWidth(e) {
		this.radius(e / 2);
	}
	setHeight(e) {
		this.radius(e / 2);
	}
}
da.RegularPolygon = Pr;
Pr.prototype.className = 'RegularPolygon';
Pr.prototype._centroid = !0;
Pr.prototype._attrsAffectingSize = ['radius'];
(0, up._registerNode)(Pr);
qh.Factory.addGetterSetter(Pr, 'radius', 0, (0, Qh.getNumberValidator)());
qh.Factory.addGetterSetter(Pr, 'sides', 0, (0, Qh.getNumberValidator)());
var ha = {};
Object.defineProperty(ha, '__esModule', { value: !0 });
ha.Ring = void 0;
const Jh = J,
	fp = Te,
	Zh = H,
	gp = Q,
	Pc = Math.PI * 2;
class Tr extends fp.Shape {
	_sceneFunc(e) {
		e.beginPath(),
			e.arc(0, 0, this.innerRadius(), 0, Pc, !1),
			e.moveTo(this.outerRadius(), 0),
			e.arc(0, 0, this.outerRadius(), Pc, 0, !0),
			e.closePath(),
			e.fillStrokeShape(this);
	}
	getWidth() {
		return this.outerRadius() * 2;
	}
	getHeight() {
		return this.outerRadius() * 2;
	}
	setWidth(e) {
		this.outerRadius(e / 2);
	}
	setHeight(e) {
		this.outerRadius(e / 2);
	}
}
ha.Ring = Tr;
Tr.prototype.className = 'Ring';
Tr.prototype._centroid = !0;
Tr.prototype._attrsAffectingSize = ['innerRadius', 'outerRadius'];
(0, gp._registerNode)(Tr);
Jh.Factory.addGetterSetter(Tr, 'innerRadius', 0, (0, Zh.getNumberValidator)());
Jh.Factory.addGetterSetter(Tr, 'outerRadius', 0, (0, Zh.getNumberValidator)());
var ua = {};
Object.defineProperty(ua, '__esModule', { value: !0 });
ua.Sprite = void 0;
const Or = J,
	pp = Te,
	mp = Jr,
	eu = H,
	vp = Q;
class It extends pp.Shape {
	constructor(e) {
		super(e),
			(this._updated = !0),
			(this.anim = new mp.Animation(() => {
				const t = this._updated;
				return (this._updated = !1), t;
			})),
			this.on('animationChange.konva', function () {
				this.frameIndex(0);
			}),
			this.on('frameIndexChange.konva', function () {
				this._updated = !0;
			}),
			this.on('frameRateChange.konva', function () {
				this.anim.isRunning() && (clearInterval(this.interval), this._setInterval());
			});
	}
	_sceneFunc(e) {
		const t = this.animation(),
			n = this.frameIndex(),
			i = n * 4,
			a = this.animations()[t],
			o = this.frameOffsets(),
			s = a[i + 0],
			l = a[i + 1],
			c = a[i + 2],
			u = a[i + 3],
			f = this.image();
		if (
			((this.hasFill() || this.hasStroke()) &&
				(e.beginPath(), e.rect(0, 0, c, u), e.closePath(), e.fillStrokeShape(this)),
			f)
		)
			if (o) {
				const g = o[t],
					h = n * 2;
				e.drawImage(f, s, l, c, u, g[h + 0], g[h + 1], c, u);
			} else e.drawImage(f, s, l, c, u, 0, 0, c, u);
	}
	_hitFunc(e) {
		const t = this.animation(),
			n = this.frameIndex(),
			i = n * 4,
			a = this.animations()[t],
			o = this.frameOffsets(),
			s = a[i + 2],
			l = a[i + 3];
		if ((e.beginPath(), o)) {
			const c = o[t],
				u = n * 2;
			e.rect(c[u + 0], c[u + 1], s, l);
		} else e.rect(0, 0, s, l);
		e.closePath(), e.fillShape(this);
	}
	_useBufferCanvas() {
		return super._useBufferCanvas(!0);
	}
	_setInterval() {
		const e = this;
		this.interval = setInterval(function () {
			e._updateIndex();
		}, 1e3 / this.frameRate());
	}
	start() {
		if (this.isRunning()) return;
		const e = this.getLayer();
		this.anim.setLayers(e), this._setInterval(), this.anim.start();
	}
	stop() {
		this.anim.stop(), clearInterval(this.interval);
	}
	isRunning() {
		return this.anim.isRunning();
	}
	_updateIndex() {
		const e = this.frameIndex(),
			t = this.animation(),
			n = this.animations(),
			i = n[t],
			a = i.length / 4;
		e < a - 1 ? this.frameIndex(e + 1) : this.frameIndex(0);
	}
}
ua.Sprite = It;
It.prototype.className = 'Sprite';
(0, vp._registerNode)(It);
Or.Factory.addGetterSetter(It, 'animation');
Or.Factory.addGetterSetter(It, 'animations');
Or.Factory.addGetterSetter(It, 'frameOffsets');
Or.Factory.addGetterSetter(It, 'image');
Or.Factory.addGetterSetter(It, 'frameIndex', 0, (0, eu.getNumberValidator)());
Or.Factory.addGetterSetter(It, 'frameRate', 17, (0, eu.getNumberValidator)());
Or.Factory.backCompat(It, {
	index: 'frameIndex',
	getIndex: 'getFrameIndex',
	setIndex: 'setFrameIndex'
});
var fa = {};
Object.defineProperty(fa, '__esModule', { value: !0 });
fa.Star = void 0;
const nl = J,
	yp = Te,
	il = H,
	bp = Q;
class ir extends yp.Shape {
	_sceneFunc(e) {
		const t = this.innerRadius(),
			n = this.outerRadius(),
			i = this.numPoints();
		e.beginPath(), e.moveTo(0, 0 - n);
		for (let a = 1; a < i * 2; a++) {
			const o = a % 2 === 0 ? n : t,
				s = o * Math.sin((a * Math.PI) / i),
				l = -1 * o * Math.cos((a * Math.PI) / i);
			e.lineTo(s, l);
		}
		e.closePath(), e.fillStrokeShape(this);
	}
	getWidth() {
		return this.outerRadius() * 2;
	}
	getHeight() {
		return this.outerRadius() * 2;
	}
	setWidth(e) {
		this.outerRadius(e / 2);
	}
	setHeight(e) {
		this.outerRadius(e / 2);
	}
}
fa.Star = ir;
ir.prototype.className = 'Star';
ir.prototype._centroid = !0;
ir.prototype._attrsAffectingSize = ['innerRadius', 'outerRadius'];
(0, bp._registerNode)(ir);
nl.Factory.addGetterSetter(ir, 'numPoints', 5, (0, il.getNumberValidator)());
nl.Factory.addGetterSetter(ir, 'innerRadius', 0, (0, il.getNumberValidator)());
nl.Factory.addGetterSetter(ir, 'outerRadius', 0, (0, il.getNumberValidator)());
var tn = {};
Object.defineProperty(tn, '__esModule', { value: !0 });
tn.Text = void 0;
tn.stringToArray = ur;
const ys = ye,
	Le = J,
	_p = Te,
	fo = Q,
	ar = H,
	Sp = Q;
function ur(r) {
	return [...r].reduce((e, t, n, i) => {
		if (new RegExp('\\p{Emoji}', 'u').test(t)) {
			const a = i[n + 1];
			a && new RegExp('\\p{Emoji_Modifier}|\\u200D', 'u').test(a)
				? (e.push(t + a), (i[n + 1] = ''))
				: e.push(t);
		} else
			new RegExp('\\p{Regional_Indicator}{2}', 'u').test(t + (i[n + 1] || ''))
				? e.push(t + i[n + 1])
				: n > 0 && new RegExp('\\p{Mn}|\\p{Me}|\\p{Mc}', 'u').test(t)
					? (e[e.length - 1] += t)
					: t && e.push(t);
		return e;
	}, []);
}
const Dr = 'auto',
	wp = 'center',
	tu = 'inherit',
	pn = 'justify',
	Ip = 'Change.konva',
	xp = '2d',
	Tc = '-',
	ru = 'left',
	Cp = 'text',
	Ep = 'Text',
	Pp = 'top',
	Tp = 'bottom',
	Oc = 'middle',
	nu = 'normal',
	Op = 'px ',
	hi = ' ',
	$p = 'right',
	$c = 'rtl',
	Ap = 'word',
	kp = 'char',
	Ac = 'none',
	go = '…',
	iu = [
		'direction',
		'fontFamily',
		'fontSize',
		'fontStyle',
		'fontVariant',
		'padding',
		'align',
		'verticalAlign',
		'lineHeight',
		'text',
		'width',
		'height',
		'wrap',
		'ellipsis',
		'letterSpacing'
	],
	Rp = iu.length;
function Dp(r) {
	return r
		.split(',')
		.map((e) => {
			e = e.trim();
			const t = e.indexOf(' ') >= 0,
				n = e.indexOf('"') >= 0 || e.indexOf("'") >= 0;
			return t && !n && (e = `"${e}"`), e;
		})
		.join(', ');
}
let ui;
function po() {
	return ui || ((ui = ys.Util.createCanvasElement().getContext(xp)), ui);
}
function Np(r) {
	r.fillText(this._partialText, this._partialTextX, this._partialTextY);
}
function Mp(r) {
	r.setAttr('miterLimit', 2),
		r.strokeText(this._partialText, this._partialTextX, this._partialTextY);
}
function Fp(r) {
	return (
		(r = r || {}),
		!r.fillLinearGradientColorStops &&
			!r.fillRadialGradientColorStops &&
			!r.fillPatternImage &&
			(r.fill = r.fill || 'black'),
		r
	);
}
class Se extends _p.Shape {
	constructor(e) {
		super(Fp(e)), (this._partialTextX = 0), (this._partialTextY = 0);
		for (let t = 0; t < Rp; t++) this.on(iu[t] + Ip, this._setTextData);
		this._setTextData();
	}
	_sceneFunc(e) {
		const t = this.textArr,
			n = t.length;
		if (!this.text()) return;
		let i = this.padding(),
			a = this.fontSize(),
			o = this.lineHeight() * a,
			s = this.verticalAlign(),
			l = this.direction(),
			c = 0,
			u = this.align(),
			f = this.getWidth(),
			g = this.letterSpacing(),
			h = this.fill(),
			d = this.textDecoration(),
			m = d.indexOf('underline') !== -1,
			y = d.indexOf('line-through') !== -1,
			v;
		l = l === tu ? e.direction : l;
		let S = o / 2,
			p = Oc;
		if (fo.Konva._fixTextRendering) {
			const $ = this.measureSize('M');
			(p = 'alphabetic'),
				(S = ($.fontBoundingBoxAscent - $.fontBoundingBoxDescent) / 2 + o / 2);
		}
		var b = 0,
			x = 0;
		for (
			l === $c && e.setAttr('direction', l),
				e.setAttr('font', this._getContextFont()),
				e.setAttr('textBaseline', p),
				e.setAttr('textAlign', ru),
				s === Oc
					? (c = (this.getHeight() - n * o - i * 2) / 2)
					: s === Tp && (c = this.getHeight() - n * o - i * 2),
				e.translate(i, c + i),
				v = 0;
			v < n;
			v++
		) {
			var b = 0,
				x = 0,
				C = t[v],
				O = C.text,
				I = C.width,
				T = C.lastInParagraph,
				w,
				P;
			if (
				(e.save(),
				u === $p ? (b += f - I - i * 2) : u === wp && (b += (f - I - i * 2) / 2),
				m)
			) {
				e.save(), e.beginPath();
				const M = fo.Konva._fixTextRendering ? Math.round(a / 4) : Math.round(a / 2),
					R = b,
					B = S + x + M;
				e.moveTo(R, B),
					(w = O.split(' ').length - 1),
					(P = u === pn && !T ? f - i * 2 : I),
					e.lineTo(R + Math.round(P), B),
					(e.lineWidth = a / 15);
				const K = this._getLinearGradient();
				(e.strokeStyle = K || h), e.stroke(), e.restore();
			}
			if (y) {
				e.save(), e.beginPath();
				const M = fo.Konva._fixTextRendering ? -Math.round(a / 4) : 0;
				e.moveTo(b, S + x + M),
					(w = O.split(' ').length - 1),
					(P = u === pn && !T ? f - i * 2 : I),
					e.lineTo(b + Math.round(P), S + x + M),
					(e.lineWidth = a / 15);
				const R = this._getLinearGradient();
				(e.strokeStyle = R || h), e.stroke(), e.restore();
			}
			if (l !== $c && (g !== 0 || u === pn)) {
				w = O.split(' ').length - 1;
				const M = ur(O);
				for (let R = 0; R < M.length; R++) {
					const B = M[R];
					B === ' ' && !T && u === pn && (b += (f - i * 2 - I) / w),
						(this._partialTextX = b),
						(this._partialTextY = S + x),
						(this._partialText = B),
						e.fillStrokeShape(this),
						(b += this.measureSize(B).width + g);
				}
			} else
				g !== 0 && e.setAttr('letterSpacing', `${g}px`),
					(this._partialTextX = b),
					(this._partialTextY = S + x),
					(this._partialText = O),
					e.fillStrokeShape(this);
			e.restore(), n > 1 && (S += o);
		}
	}
	_hitFunc(e) {
		const t = this.getWidth(),
			n = this.getHeight();
		e.beginPath(), e.rect(0, 0, t, n), e.closePath(), e.fillStrokeShape(this);
	}
	setText(e) {
		const t = ys.Util._isString(e) ? e : e == null ? '' : e + '';
		return this._setAttr(Cp, t), this;
	}
	getWidth() {
		return this.attrs.width === Dr || this.attrs.width === void 0
			? this.getTextWidth() + this.padding() * 2
			: this.attrs.width;
	}
	getHeight() {
		return this.attrs.height === Dr || this.attrs.height === void 0
			? this.fontSize() * this.textArr.length * this.lineHeight() + this.padding() * 2
			: this.attrs.height;
	}
	getTextWidth() {
		return this.textWidth;
	}
	getTextHeight() {
		return (
			ys.Util.warn(
				'text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.'
			),
			this.textHeight
		);
	}
	measureSize(e) {
		var t, n, i, a, o, s, l, c, u, f, g;
		let h = po(),
			d = this.fontSize(),
			m;
		h.save(), (h.font = this._getContextFont()), (m = h.measureText(e)), h.restore();
		const y = d / 100;
		return {
			actualBoundingBoxAscent:
				(t = m.actualBoundingBoxAscent) !== null && t !== void 0 ? t : 71.58203125 * y,
			actualBoundingBoxDescent:
				(n = m.actualBoundingBoxDescent) !== null && n !== void 0 ? n : 0,
			actualBoundingBoxLeft:
				(i = m.actualBoundingBoxLeft) !== null && i !== void 0 ? i : -7.421875 * y,
			actualBoundingBoxRight:
				(a = m.actualBoundingBoxRight) !== null && a !== void 0 ? a : 75.732421875 * y,
			alphabeticBaseline: (o = m.alphabeticBaseline) !== null && o !== void 0 ? o : 0,
			emHeightAscent: (s = m.emHeightAscent) !== null && s !== void 0 ? s : 100 * y,
			emHeightDescent: (l = m.emHeightDescent) !== null && l !== void 0 ? l : -20 * y,
			fontBoundingBoxAscent:
				(c = m.fontBoundingBoxAscent) !== null && c !== void 0 ? c : 91 * y,
			fontBoundingBoxDescent:
				(u = m.fontBoundingBoxDescent) !== null && u !== void 0 ? u : 21 * y,
			hangingBaseline:
				(f = m.hangingBaseline) !== null && f !== void 0 ? f : 72.80000305175781 * y,
			ideographicBaseline:
				(g = m.ideographicBaseline) !== null && g !== void 0 ? g : -21 * y,
			width: m.width,
			height: d
		};
	}
	_getContextFont() {
		return (
			this.fontStyle() +
			hi +
			this.fontVariant() +
			hi +
			(this.fontSize() + Op) +
			Dp(this.fontFamily())
		);
	}
	_addTextLine(e) {
		this.align() === pn && (e = e.trim());
		const n = this._getTextWidth(e);
		return this.textArr.push({ text: e, width: n, lastInParagraph: !1 });
	}
	_getTextWidth(e) {
		const t = this.letterSpacing(),
			n = e.length;
		return po().measureText(e).width + t * n;
	}
	_setTextData() {
		let e = this.text().split(`
`),
			t = +this.fontSize(),
			n = 0,
			i = this.lineHeight() * t,
			a = this.attrs.width,
			o = this.attrs.height,
			s = a !== Dr && a !== void 0,
			l = o !== Dr && o !== void 0,
			c = this.padding(),
			u = a - c * 2,
			f = o - c * 2,
			g = 0,
			h = this.wrap(),
			d = h !== Ac,
			m = h !== kp && d,
			y = this.ellipsis();
		(this.textArr = []), (po().font = this._getContextFont());
		const v = y ? this._getTextWidth(go) : 0;
		for (let S = 0, p = e.length; S < p; ++S) {
			let b = e[S],
				x = this._getTextWidth(b);
			if (s && x > u)
				for (; b.length > 0; ) {
					let C = 0,
						O = ur(b).length,
						I = '',
						T = 0;
					for (; C < O; ) {
						const w = (C + O) >>> 1,
							P = ur(b),
							$ = P.slice(0, w + 1).join(''),
							N = this._getTextWidth($);
						(y && l && g + i > f ? N + v : N) <= u
							? ((C = w + 1), (I = $), (T = N))
							: (O = w);
					}
					if (I) {
						if (m) {
							const $ = ur(b),
								N = ur(I),
								M = $[N.length],
								R = M === hi || M === Tc;
							let B;
							if (R && T <= u) B = N.length;
							else {
								const K = N.lastIndexOf(hi),
									te = N.lastIndexOf(Tc);
								B = Math.max(K, te) + 1;
							}
							B > 0 &&
								((C = B), (I = $.slice(0, C).join('')), (T = this._getTextWidth(I)));
						}
						if (
							((I = I.trimRight()),
							this._addTextLine(I),
							(n = Math.max(n, T)),
							(g += i),
							this._shouldHandleEllipsis(g))
						) {
							this._tryToAddEllipsisToLastLine();
							break;
						}
						if (
							((b = ur(b).slice(C).join('').trimLeft()),
							b.length > 0 && ((x = this._getTextWidth(b)), x <= u))
						) {
							this._addTextLine(b), (g += i), (n = Math.max(n, x));
							break;
						}
					} else break;
				}
			else
				this._addTextLine(b),
					(g += i),
					(n = Math.max(n, x)),
					this._shouldHandleEllipsis(g) &&
						S < p - 1 &&
						this._tryToAddEllipsisToLastLine();
			if (
				(this.textArr[this.textArr.length - 1] &&
					(this.textArr[this.textArr.length - 1].lastInParagraph = !0),
				l && g + i > f)
			)
				break;
		}
		(this.textHeight = t), (this.textWidth = n);
	}
	_shouldHandleEllipsis(e) {
		const t = +this.fontSize(),
			n = this.lineHeight() * t,
			i = this.attrs.height,
			a = i !== Dr && i !== void 0,
			o = this.padding(),
			s = i - o * 2;
		return !(this.wrap() !== Ac) || (a && e + n > s);
	}
	_tryToAddEllipsisToLastLine() {
		const e = this.attrs.width,
			t = e !== Dr && e !== void 0,
			n = this.padding(),
			i = e - n * 2,
			a = this.ellipsis(),
			o = this.textArr[this.textArr.length - 1];
		!o ||
			!a ||
			(t &&
				(this._getTextWidth(o.text + go) < i ||
					(o.text = o.text.slice(0, o.text.length - 3))),
			this.textArr.splice(this.textArr.length - 1, 1),
			this._addTextLine(o.text + go));
	}
	getStrokeScaleEnabled() {
		return !0;
	}
	_useBufferCanvas() {
		const e =
				this.textDecoration().indexOf('underline') !== -1 ||
				this.textDecoration().indexOf('line-through') !== -1,
			t = this.hasShadow();
		return e && t ? !0 : super._useBufferCanvas();
	}
}
tn.Text = Se;
Se.prototype._fillFunc = Np;
Se.prototype._strokeFunc = Mp;
Se.prototype.className = Ep;
Se.prototype._attrsAffectingSize = [
	'text',
	'fontSize',
	'padding',
	'wrap',
	'lineHeight',
	'letterSpacing'
];
(0, Sp._registerNode)(Se);
Le.Factory.overWriteSetter(Se, 'width', (0, ar.getNumberOrAutoValidator)());
Le.Factory.overWriteSetter(Se, 'height', (0, ar.getNumberOrAutoValidator)());
Le.Factory.addGetterSetter(Se, 'direction', tu);
Le.Factory.addGetterSetter(Se, 'fontFamily', 'Arial');
Le.Factory.addGetterSetter(Se, 'fontSize', 12, (0, ar.getNumberValidator)());
Le.Factory.addGetterSetter(Se, 'fontStyle', nu);
Le.Factory.addGetterSetter(Se, 'fontVariant', nu);
Le.Factory.addGetterSetter(Se, 'padding', 0, (0, ar.getNumberValidator)());
Le.Factory.addGetterSetter(Se, 'align', ru);
Le.Factory.addGetterSetter(Se, 'verticalAlign', Pp);
Le.Factory.addGetterSetter(Se, 'lineHeight', 1, (0, ar.getNumberValidator)());
Le.Factory.addGetterSetter(Se, 'wrap', Ap);
Le.Factory.addGetterSetter(Se, 'ellipsis', !1, (0, ar.getBooleanValidator)());
Le.Factory.addGetterSetter(Se, 'letterSpacing', 0, (0, ar.getNumberValidator)());
Le.Factory.addGetterSetter(Se, 'text', '', (0, ar.getStringValidator)());
Le.Factory.addGetterSetter(Se, 'textDecoration', '');
var ga = {};
Object.defineProperty(ga, '__esModule', { value: !0 });
ga.TextPath = void 0;
const mo = ye,
	dt = J,
	Lp = Te,
	mn = Zr,
	vo = tn,
	au = H,
	Gp = Q,
	Bp = '',
	ou = 'normal';
function su(r) {
	r.fillText(this.partialText, 0, 0);
}
function lu(r) {
	r.strokeText(this.partialText, 0, 0);
}
class Oe extends Lp.Shape {
	constructor(e) {
		super(e),
			(this.dummyCanvas = mo.Util.createCanvasElement()),
			(this.dataArray = []),
			this._readDataAttribute(),
			this.on('dataChange.konva', function () {
				this._readDataAttribute(), this._setTextData();
			}),
			this.on(
				'textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva fontSizeChange.konva fontFamilyChange.konva',
				this._setTextData
			),
			this._setTextData();
	}
	_getTextPathLength() {
		return mn.Path.getPathLength(this.dataArray);
	}
	_getPointAtLength(e) {
		if (!this.attrs.data) return null;
		const t = this.pathLength;
		return e - 1 > t ? null : mn.Path.getPointAtLengthOfDataArray(e, this.dataArray);
	}
	_readDataAttribute() {
		(this.dataArray = mn.Path.parsePathData(this.attrs.data)),
			(this.pathLength = this._getTextPathLength());
	}
	_sceneFunc(e) {
		e.setAttr('font', this._getContextFont()),
			e.setAttr('textBaseline', this.textBaseline()),
			e.setAttr('textAlign', 'left'),
			e.save();
		const t = this.textDecoration(),
			n = this.fill(),
			i = this.fontSize(),
			a = this.glyphInfo;
		t === 'underline' && e.beginPath();
		for (let o = 0; o < a.length; o++) {
			e.save();
			const s = a[o].p0;
			e.translate(s.x, s.y),
				e.rotate(a[o].rotation),
				(this.partialText = a[o].text),
				e.fillStrokeShape(this),
				t === 'underline' &&
					(o === 0 && e.moveTo(0, i / 2 + 1), e.lineTo(i, i / 2 + 1)),
				e.restore();
		}
		t === 'underline' && ((e.strokeStyle = n), (e.lineWidth = i / 20), e.stroke()),
			e.restore();
	}
	_hitFunc(e) {
		e.beginPath();
		const t = this.glyphInfo;
		if (t.length >= 1) {
			const n = t[0].p0;
			e.moveTo(n.x, n.y);
		}
		for (let n = 0; n < t.length; n++) {
			const i = t[n].p1;
			e.lineTo(i.x, i.y);
		}
		e.setAttr('lineWidth', this.fontSize()),
			e.setAttr('strokeStyle', this.colorKey),
			e.stroke();
	}
	getTextWidth() {
		return this.textWidth;
	}
	getTextHeight() {
		return (
			mo.Util.warn(
				'text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.'
			),
			this.textHeight
		);
	}
	setText(e) {
		return vo.Text.prototype.setText.call(this, e);
	}
	_getContextFont() {
		return vo.Text.prototype._getContextFont.call(this);
	}
	_getTextSize(e) {
		const n = this.dummyCanvas.getContext('2d');
		n.save(), (n.font = this._getContextFont());
		const i = n.measureText(e);
		return n.restore(), { width: i.width, height: parseInt(`${this.fontSize()}`, 10) };
	}
	_setTextData() {
		const { width: e, height: t } = this._getTextSize(this.attrs.text);
		if (
			((this.textWidth = e),
			(this.textHeight = t),
			(this.glyphInfo = []),
			!this.attrs.data)
		)
			return null;
		const n = this.letterSpacing(),
			i = this.align(),
			a = this.kerningFunc(),
			o = Math.max(this.textWidth + ((this.attrs.text || '').length - 1) * n, 0);
		let s = 0;
		i === 'center' && (s = Math.max(0, this.pathLength / 2 - o / 2)),
			i === 'right' && (s = Math.max(0, this.pathLength - o));
		const l = (0, vo.stringToArray)(this.text());
		let c = s;
		for (let u = 0; u < l.length; u++) {
			const f = this._getPointAtLength(c);
			if (!f) return;
			let g = this._getTextSize(l[u]).width + n;
			if (l[u] === ' ' && i === 'justify') {
				const S = this.text().split(' ').length - 1;
				g += (this.pathLength - o) / S;
			}
			const h = this._getPointAtLength(c + g);
			if (!h) return;
			const d = mn.Path.getLineLength(f.x, f.y, h.x, h.y);
			let m = 0;
			if (a)
				try {
					m = a(l[u - 1], l[u]) * this.fontSize();
				} catch {
					m = 0;
				}
			(f.x += m), (h.x += m), (this.textWidth += m);
			const y = mn.Path.getPointOnLine(m + d / 2, f.x, f.y, h.x, h.y),
				v = Math.atan2(h.y - f.y, h.x - f.x);
			this.glyphInfo.push({
				transposeX: y.x,
				transposeY: y.y,
				text: l[u],
				rotation: v,
				p0: f,
				p1: h
			}),
				(c += g);
		}
	}
	getSelfRect() {
		if (!this.glyphInfo.length) return { x: 0, y: 0, width: 0, height: 0 };
		const e = [];
		this.glyphInfo.forEach(function (c) {
			e.push(c.p0.x), e.push(c.p0.y), e.push(c.p1.x), e.push(c.p1.y);
		});
		let t = e[0] || 0,
			n = e[0] || 0,
			i = e[1] || 0,
			a = e[1] || 0,
			o,
			s;
		for (let c = 0; c < e.length / 2; c++)
			(o = e[c * 2]),
				(s = e[c * 2 + 1]),
				(t = Math.min(t, o)),
				(n = Math.max(n, o)),
				(i = Math.min(i, s)),
				(a = Math.max(a, s));
		const l = this.fontSize();
		return { x: t - l / 2, y: i - l / 2, width: n - t + l, height: a - i + l };
	}
	destroy() {
		return mo.Util.releaseCanvas(this.dummyCanvas), super.destroy();
	}
}
ga.TextPath = Oe;
Oe.prototype._fillFunc = su;
Oe.prototype._strokeFunc = lu;
Oe.prototype._fillFuncHit = su;
Oe.prototype._strokeFuncHit = lu;
Oe.prototype.className = 'TextPath';
Oe.prototype._attrsAffectingSize = ['text', 'fontSize', 'data'];
(0, Gp._registerNode)(Oe);
dt.Factory.addGetterSetter(Oe, 'data');
dt.Factory.addGetterSetter(Oe, 'fontFamily', 'Arial');
dt.Factory.addGetterSetter(Oe, 'fontSize', 12, (0, au.getNumberValidator)());
dt.Factory.addGetterSetter(Oe, 'fontStyle', ou);
dt.Factory.addGetterSetter(Oe, 'align', 'left');
dt.Factory.addGetterSetter(Oe, 'letterSpacing', 0, (0, au.getNumberValidator)());
dt.Factory.addGetterSetter(Oe, 'textBaseline', 'middle');
dt.Factory.addGetterSetter(Oe, 'fontVariant', ou);
dt.Factory.addGetterSetter(Oe, 'text', Bp);
dt.Factory.addGetterSetter(Oe, 'textDecoration', '');
dt.Factory.addGetterSetter(Oe, 'kerningFunc', void 0);
var pa = {};
Object.defineProperty(pa, '__esModule', { value: !0 });
pa.Transformer = void 0;
const de = ye,
	se = J,
	kc = me,
	Vp = Te,
	Up = Yn,
	Rc = Qr,
	at = Q,
	or = H,
	jp = Q,
	cu = 'tr-konva',
	zp = [
		'resizeEnabledChange',
		'rotateAnchorOffsetChange',
		'rotateEnabledChange',
		'enabledAnchorsChange',
		'anchorSizeChange',
		'borderEnabledChange',
		'borderStrokeChange',
		'borderStrokeWidthChange',
		'borderDashChange',
		'anchorStrokeChange',
		'anchorStrokeWidthChange',
		'anchorFillChange',
		'anchorCornerRadiusChange',
		'ignoreStrokeChange',
		'anchorStyleFuncChange'
	]
		.map((r) => r + `.${cu}`)
		.join(' '),
	Dc = 'nodesRect',
	Hp = [
		'widthChange',
		'heightChange',
		'scaleXChange',
		'scaleYChange',
		'skewXChange',
		'skewYChange',
		'rotationChange',
		'offsetXChange',
		'offsetYChange',
		'transformsEnabledChange',
		'strokeWidthChange'
	],
	Wp = {
		'top-left': -45,
		'top-center': 0,
		'top-right': 45,
		'middle-right': -90,
		'middle-left': 90,
		'bottom-left': -135,
		'bottom-center': 180,
		'bottom-right': 135
	},
	Kp = 'ontouchstart' in at.Konva._global;
function Yp(r, e, t) {
	if (r === 'rotater') return t;
	e += de.Util.degToRad(Wp[r] || 0);
	const n = ((de.Util.radToDeg(e) % 360) + 360) % 360;
	return de.Util._inRange(n, 315 + 22.5, 360) || de.Util._inRange(n, 0, 22.5)
		? 'ns-resize'
		: de.Util._inRange(n, 45 - 22.5, 45 + 22.5)
			? 'nesw-resize'
			: de.Util._inRange(n, 90 - 22.5, 90 + 22.5)
				? 'ew-resize'
				: de.Util._inRange(n, 135 - 22.5, 135 + 22.5)
					? 'nwse-resize'
					: de.Util._inRange(n, 180 - 22.5, 180 + 22.5)
						? 'ns-resize'
						: de.Util._inRange(n, 225 - 22.5, 225 + 22.5)
							? 'nesw-resize'
							: de.Util._inRange(n, 270 - 22.5, 270 + 22.5)
								? 'ew-resize'
								: de.Util._inRange(n, 315 - 22.5, 315 + 22.5)
									? 'nwse-resize'
									: (de.Util.error(
											'Transformer has unknown angle for cursor detection: ' + n
										),
										'pointer');
}
const Mi = [
	'top-left',
	'top-center',
	'top-right',
	'middle-right',
	'middle-left',
	'bottom-left',
	'bottom-center',
	'bottom-right'
];
function Xp(r) {
	return {
		x:
			r.x +
			(r.width / 2) * Math.cos(r.rotation) +
			(r.height / 2) * Math.sin(-r.rotation),
		y:
			r.y + (r.height / 2) * Math.cos(r.rotation) + (r.width / 2) * Math.sin(r.rotation)
	};
}
function du(r, e, t) {
	const n = t.x + (r.x - t.x) * Math.cos(e) - (r.y - t.y) * Math.sin(e),
		i = t.y + (r.x - t.x) * Math.sin(e) + (r.y - t.y) * Math.cos(e);
	return { ...r, rotation: r.rotation + e, x: n, y: i };
}
function qp(r, e) {
	const t = Xp(r);
	return du(r, e, t);
}
function Qp(r, e, t) {
	let n = e;
	for (let i = 0; i < r.length; i++) {
		const a = at.Konva.getAngle(r[i]),
			o = Math.abs(a - e) % (Math.PI * 2);
		Math.min(o, Math.PI * 2 - o) < t && (n = a);
	}
	return n;
}
let bs = 0;
class re extends Rc.Group {
	constructor(e) {
		super(e),
			(this._movingAnchorName = null),
			(this._transforming = !1),
			this._createElements(),
			(this._handleMouseMove = this._handleMouseMove.bind(this)),
			(this._handleMouseUp = this._handleMouseUp.bind(this)),
			(this.update = this.update.bind(this)),
			this.on(zp, this.update),
			this.getNode() && this.update();
	}
	attachTo(e) {
		return this.setNode(e), this;
	}
	setNode(e) {
		return (
			de.Util.warn(
				'tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead.'
			),
			this.setNodes([e])
		);
	}
	getNode() {
		return this._nodes && this._nodes[0];
	}
	_getEventNamespace() {
		return cu + this._id;
	}
	setNodes(e = []) {
		this._nodes && this._nodes.length && this.detach();
		const t = e.filter((i) =>
			i.isAncestorOf(this)
				? (de.Util.error(
						'Konva.Transformer cannot be an a child of the node you are trying to attach'
					),
					!1)
				: !0
		);
		return (
			(this._nodes = e = t),
			e.length === 1 && this.useSingleNodeRotation()
				? this.rotation(e[0].getAbsoluteRotation())
				: this.rotation(0),
			this._nodes.forEach((i) => {
				const a = () => {
					this.nodes().length === 1 &&
						this.useSingleNodeRotation() &&
						this.rotation(this.nodes()[0].getAbsoluteRotation()),
						this._resetTransformCache(),
						!this._transforming && !this.isDragging() && this.update();
				};
				if (i._attrsAffectingSize.length) {
					const o = i._attrsAffectingSize
						.map((s) => s + 'Change.' + this._getEventNamespace())
						.join(' ');
					i.on(o, a);
				}
				i.on(Hp.map((o) => o + `.${this._getEventNamespace()}`).join(' '), a),
					i.on(`absoluteTransformChange.${this._getEventNamespace()}`, a),
					this._proxyDrag(i);
			}),
			this._resetTransformCache(),
			!!this.findOne('.top-left') && this.update(),
			this
		);
	}
	_proxyDrag(e) {
		let t;
		e.on(`dragstart.${this._getEventNamespace()}`, (n) => {
			(t = e.getAbsolutePosition()),
				!this.isDragging() && e !== this.findOne('.back') && this.startDrag(n, !1);
		}),
			e.on(`dragmove.${this._getEventNamespace()}`, (n) => {
				if (!t) return;
				const i = e.getAbsolutePosition(),
					a = i.x - t.x,
					o = i.y - t.y;
				this.nodes().forEach((s) => {
					if (s === e || s.isDragging()) return;
					const l = s.getAbsolutePosition();
					s.setAbsolutePosition({ x: l.x + a, y: l.y + o }), s.startDrag(n);
				}),
					(t = null);
			});
	}
	getNodes() {
		return this._nodes || [];
	}
	getActiveAnchor() {
		return this._movingAnchorName;
	}
	detach() {
		this._nodes &&
			this._nodes.forEach((e) => {
				e.off('.' + this._getEventNamespace());
			}),
			(this._nodes = []),
			this._resetTransformCache();
	}
	_resetTransformCache() {
		this._clearCache(Dc),
			this._clearCache('transform'),
			this._clearSelfAndDescendantCache('absoluteTransform');
	}
	_getNodeRect() {
		return this._getCache(Dc, this.__getNodeRect);
	}
	__getNodeShape(e, t = this.rotation(), n) {
		const i = e.getClientRect({
				skipTransform: !0,
				skipShadow: !0,
				skipStroke: this.ignoreStroke()
			}),
			a = e.getAbsoluteScale(n),
			o = e.getAbsolutePosition(n),
			s = i.x * a.x - e.offsetX() * a.x,
			l = i.y * a.y - e.offsetY() * a.y,
			c = (at.Konva.getAngle(e.getAbsoluteRotation()) + Math.PI * 2) % (Math.PI * 2),
			u = {
				x: o.x + s * Math.cos(c) + l * Math.sin(-c),
				y: o.y + l * Math.cos(c) + s * Math.sin(c),
				width: i.width * a.x,
				height: i.height * a.y,
				rotation: c
			};
		return du(u, -at.Konva.getAngle(t), { x: 0, y: 0 });
	}
	__getNodeRect() {
		if (!this.getNode()) return { x: -1e8, y: -1e8, width: 0, height: 0, rotation: 0 };
		const t = [];
		this.nodes().map((c) => {
			const u = c.getClientRect({
					skipTransform: !0,
					skipShadow: !0,
					skipStroke: this.ignoreStroke()
				}),
				f = [
					{ x: u.x, y: u.y },
					{ x: u.x + u.width, y: u.y },
					{ x: u.x + u.width, y: u.y + u.height },
					{ x: u.x, y: u.y + u.height }
				],
				g = c.getAbsoluteTransform();
			f.forEach(function (h) {
				const d = g.point(h);
				t.push(d);
			});
		});
		const n = new de.Transform();
		n.rotate(-at.Konva.getAngle(this.rotation()));
		let i = 1 / 0,
			a = 1 / 0,
			o = -1 / 0,
			s = -1 / 0;
		t.forEach(function (c) {
			const u = n.point(c);
			i === void 0 && ((i = o = u.x), (a = s = u.y)),
				(i = Math.min(i, u.x)),
				(a = Math.min(a, u.y)),
				(o = Math.max(o, u.x)),
				(s = Math.max(s, u.y));
		}),
			n.invert();
		const l = n.point({ x: i, y: a });
		return {
			x: l.x,
			y: l.y,
			width: o - i,
			height: s - a,
			rotation: at.Konva.getAngle(this.rotation())
		};
	}
	getX() {
		return this._getNodeRect().x;
	}
	getY() {
		return this._getNodeRect().y;
	}
	getWidth() {
		return this._getNodeRect().width;
	}
	getHeight() {
		return this._getNodeRect().height;
	}
	_createElements() {
		this._createBack(),
			Mi.forEach((e) => {
				this._createAnchor(e);
			}),
			this._createAnchor('rotater');
	}
	_createAnchor(e) {
		const t = new Up.Rect({
				stroke: 'rgb(0, 161, 255)',
				fill: 'white',
				strokeWidth: 1,
				name: e + ' _anchor',
				dragDistance: 0,
				draggable: !0,
				hitStrokeWidth: Kp ? 10 : 'auto'
			}),
			n = this;
		t.on('mousedown touchstart', function (i) {
			n._handleMouseDown(i);
		}),
			t.on('dragstart', (i) => {
				t.stopDrag(), (i.cancelBubble = !0);
			}),
			t.on('dragend', (i) => {
				i.cancelBubble = !0;
			}),
			t.on('mouseenter', () => {
				const i = at.Konva.getAngle(this.rotation()),
					a = this.rotateAnchorCursor(),
					o = Yp(e, i, a);
				t.getStage().content && (t.getStage().content.style.cursor = o),
					(this._cursorChange = !0);
			}),
			t.on('mouseout', () => {
				t.getStage().content && (t.getStage().content.style.cursor = ''),
					(this._cursorChange = !1);
			}),
			this.add(t);
	}
	_createBack() {
		const e = new Vp.Shape({
			name: 'back',
			width: 0,
			height: 0,
			draggable: !0,
			sceneFunc(t, n) {
				const i = n.getParent(),
					a = i.padding();
				t.beginPath(),
					t.rect(-a, -a, n.width() + a * 2, n.height() + a * 2),
					t.moveTo(n.width() / 2, -a),
					i.rotateEnabled() &&
						i.rotateLineVisible() &&
						t.lineTo(
							n.width() / 2,
							-i.rotateAnchorOffset() * de.Util._sign(n.height()) - a
						),
					t.fillStrokeShape(n);
			},
			hitFunc: (t, n) => {
				if (!this.shouldOverdrawWholeArea()) return;
				const i = this.padding();
				t.beginPath(),
					t.rect(-i, -i, n.width() + i * 2, n.height() + i * 2),
					t.fillStrokeShape(n);
			}
		});
		this.add(e),
			this._proxyDrag(e),
			e.on('dragstart', (t) => {
				t.cancelBubble = !0;
			}),
			e.on('dragmove', (t) => {
				t.cancelBubble = !0;
			}),
			e.on('dragend', (t) => {
				t.cancelBubble = !0;
			}),
			this.on('dragmove', (t) => {
				this.update();
			});
	}
	_handleMouseDown(e) {
		if (this._transforming) return;
		this._movingAnchorName = e.target.name().split(' ')[0];
		const t = this._getNodeRect(),
			n = t.width,
			i = t.height,
			a = Math.sqrt(Math.pow(n, 2) + Math.pow(i, 2));
		(this.sin = Math.abs(i / a)),
			(this.cos = Math.abs(n / a)),
			typeof window < 'u' &&
				(window.addEventListener('mousemove', this._handleMouseMove),
				window.addEventListener('touchmove', this._handleMouseMove),
				window.addEventListener('mouseup', this._handleMouseUp, !0),
				window.addEventListener('touchend', this._handleMouseUp, !0)),
			(this._transforming = !0);
		const o = e.target.getAbsolutePosition(),
			s = e.target.getStage().getPointerPosition();
		(this._anchorDragOffset = { x: s.x - o.x, y: s.y - o.y }),
			bs++,
			this._fire('transformstart', { evt: e.evt, target: this.getNode() }),
			this._nodes.forEach((l) => {
				l._fire('transformstart', { evt: e.evt, target: l });
			});
	}
	_handleMouseMove(e) {
		let t, n, i;
		const a = this.findOne('.' + this._movingAnchorName),
			o = a.getStage();
		o.setPointersPositions(e);
		const s = o.getPointerPosition();
		let l = { x: s.x - this._anchorDragOffset.x, y: s.y - this._anchorDragOffset.y };
		const c = a.getAbsolutePosition();
		this.anchorDragBoundFunc() && (l = this.anchorDragBoundFunc()(c, l, e)),
			a.setAbsolutePosition(l);
		const u = a.getAbsolutePosition();
		if (c.x === u.x && c.y === u.y) return;
		if (this._movingAnchorName === 'rotater') {
			const x = this._getNodeRect();
			(t = a.x() - x.width / 2), (n = -a.y() + x.height / 2);
			let C = Math.atan2(-n, t) + Math.PI / 2;
			x.height < 0 && (C -= Math.PI);
			const I = at.Konva.getAngle(this.rotation()) + C,
				T = at.Konva.getAngle(this.rotationSnapTolerance()),
				P = Qp(this.rotationSnaps(), I, T) - x.rotation,
				$ = qp(x, P);
			this._fitNodesInto($, e);
			return;
		}
		const f = this.shiftBehavior();
		let g;
		f === 'inverted'
			? (g = this.keepRatio() && !e.shiftKey)
			: f === 'none'
				? (g = this.keepRatio())
				: (g = this.keepRatio() || e.shiftKey);
		var v = this.centeredScaling() || e.altKey;
		if (this._movingAnchorName === 'top-left') {
			if (g) {
				var h = v
					? { x: this.width() / 2, y: this.height() / 2 }
					: {
							x: this.findOne('.bottom-right').x(),
							y: this.findOne('.bottom-right').y()
						};
				i = Math.sqrt(Math.pow(h.x - a.x(), 2) + Math.pow(h.y - a.y(), 2));
				var d = this.findOne('.top-left').x() > h.x ? -1 : 1,
					m = this.findOne('.top-left').y() > h.y ? -1 : 1;
				(t = i * this.cos * d),
					(n = i * this.sin * m),
					this.findOne('.top-left').x(h.x - t),
					this.findOne('.top-left').y(h.y - n);
			}
		} else if (this._movingAnchorName === 'top-center')
			this.findOne('.top-left').y(a.y());
		else if (this._movingAnchorName === 'top-right') {
			if (g) {
				var h = v
					? { x: this.width() / 2, y: this.height() / 2 }
					: {
							x: this.findOne('.bottom-left').x(),
							y: this.findOne('.bottom-left').y()
						};
				i = Math.sqrt(Math.pow(a.x() - h.x, 2) + Math.pow(h.y - a.y(), 2));
				var d = this.findOne('.top-right').x() < h.x ? -1 : 1,
					m = this.findOne('.top-right').y() > h.y ? -1 : 1;
				(t = i * this.cos * d),
					(n = i * this.sin * m),
					this.findOne('.top-right').x(h.x + t),
					this.findOne('.top-right').y(h.y - n);
			}
			var y = a.position();
			this.findOne('.top-left').y(y.y), this.findOne('.bottom-right').x(y.x);
		} else if (this._movingAnchorName === 'middle-left')
			this.findOne('.top-left').x(a.x());
		else if (this._movingAnchorName === 'middle-right')
			this.findOne('.bottom-right').x(a.x());
		else if (this._movingAnchorName === 'bottom-left') {
			if (g) {
				var h = v
					? { x: this.width() / 2, y: this.height() / 2 }
					: { x: this.findOne('.top-right').x(), y: this.findOne('.top-right').y() };
				i = Math.sqrt(Math.pow(h.x - a.x(), 2) + Math.pow(a.y() - h.y, 2));
				var d = h.x < a.x() ? -1 : 1,
					m = a.y() < h.y ? -1 : 1;
				(t = i * this.cos * d), (n = i * this.sin * m), a.x(h.x - t), a.y(h.y + n);
			}
			(y = a.position()),
				this.findOne('.top-left').x(y.x),
				this.findOne('.bottom-right').y(y.y);
		} else if (this._movingAnchorName === 'bottom-center')
			this.findOne('.bottom-right').y(a.y());
		else if (this._movingAnchorName === 'bottom-right') {
			if (g) {
				var h = v
					? { x: this.width() / 2, y: this.height() / 2 }
					: { x: this.findOne('.top-left').x(), y: this.findOne('.top-left').y() };
				i = Math.sqrt(Math.pow(a.x() - h.x, 2) + Math.pow(a.y() - h.y, 2));
				var d = this.findOne('.bottom-right').x() < h.x ? -1 : 1,
					m = this.findOne('.bottom-right').y() < h.y ? -1 : 1;
				(t = i * this.cos * d),
					(n = i * this.sin * m),
					this.findOne('.bottom-right').x(h.x + t),
					this.findOne('.bottom-right').y(h.y + n);
			}
		} else
			console.error(
				new Error(
					'Wrong position argument of selection resizer: ' + this._movingAnchorName
				)
			);
		var v = this.centeredScaling() || e.altKey;
		if (v) {
			const x = this.findOne('.top-left'),
				C = this.findOne('.bottom-right'),
				O = x.x(),
				I = x.y(),
				T = this.getWidth() - C.x(),
				w = this.getHeight() - C.y();
			C.move({ x: -O, y: -I }), x.move({ x: T, y: w });
		}
		const S = this.findOne('.top-left').getAbsolutePosition();
		(t = S.x), (n = S.y);
		const p = this.findOne('.bottom-right').x() - this.findOne('.top-left').x(),
			b = this.findOne('.bottom-right').y() - this.findOne('.top-left').y();
		this._fitNodesInto(
			{ x: t, y: n, width: p, height: b, rotation: at.Konva.getAngle(this.rotation()) },
			e
		);
	}
	_handleMouseUp(e) {
		this._removeEvents(e);
	}
	getAbsoluteTransform() {
		return this.getTransform();
	}
	_removeEvents(e) {
		var t;
		if (this._transforming) {
			(this._transforming = !1),
				typeof window < 'u' &&
					(window.removeEventListener('mousemove', this._handleMouseMove),
					window.removeEventListener('touchmove', this._handleMouseMove),
					window.removeEventListener('mouseup', this._handleMouseUp, !0),
					window.removeEventListener('touchend', this._handleMouseUp, !0));
			const n = this.getNode();
			bs--,
				this._fire('transformend', { evt: e, target: n }),
				(t = this.getLayer()) === null || t === void 0 || t.batchDraw(),
				n &&
					this._nodes.forEach((i) => {
						var a;
						i._fire('transformend', { evt: e, target: i }),
							(a = i.getLayer()) === null || a === void 0 || a.batchDraw();
					}),
				(this._movingAnchorName = null);
		}
	}
	_fitNodesInto(e, t) {
		const n = this._getNodeRect(),
			i = 1;
		if (de.Util._inRange(e.width, -this.padding() * 2 - i, i)) {
			this.update();
			return;
		}
		if (de.Util._inRange(e.height, -this.padding() * 2 - i, i)) {
			this.update();
			return;
		}
		const a = new de.Transform();
		if (
			(a.rotate(at.Konva.getAngle(this.rotation())),
			this._movingAnchorName &&
				e.width < 0 &&
				this._movingAnchorName.indexOf('left') >= 0)
		) {
			const g = a.point({ x: -this.padding() * 2, y: 0 });
			(e.x += g.x),
				(e.y += g.y),
				(e.width += this.padding() * 2),
				(this._movingAnchorName = this._movingAnchorName.replace('left', 'right')),
				(this._anchorDragOffset.x -= g.x),
				(this._anchorDragOffset.y -= g.y);
		} else if (
			this._movingAnchorName &&
			e.width < 0 &&
			this._movingAnchorName.indexOf('right') >= 0
		) {
			const g = a.point({ x: this.padding() * 2, y: 0 });
			(this._movingAnchorName = this._movingAnchorName.replace('right', 'left')),
				(this._anchorDragOffset.x -= g.x),
				(this._anchorDragOffset.y -= g.y),
				(e.width += this.padding() * 2);
		}
		if (
			this._movingAnchorName &&
			e.height < 0 &&
			this._movingAnchorName.indexOf('top') >= 0
		) {
			const g = a.point({ x: 0, y: -this.padding() * 2 });
			(e.x += g.x),
				(e.y += g.y),
				(this._movingAnchorName = this._movingAnchorName.replace('top', 'bottom')),
				(this._anchorDragOffset.x -= g.x),
				(this._anchorDragOffset.y -= g.y),
				(e.height += this.padding() * 2);
		} else if (
			this._movingAnchorName &&
			e.height < 0 &&
			this._movingAnchorName.indexOf('bottom') >= 0
		) {
			const g = a.point({ x: 0, y: this.padding() * 2 });
			(this._movingAnchorName = this._movingAnchorName.replace('bottom', 'top')),
				(this._anchorDragOffset.x -= g.x),
				(this._anchorDragOffset.y -= g.y),
				(e.height += this.padding() * 2);
		}
		if (this.boundBoxFunc()) {
			const g = this.boundBoxFunc()(n, e);
			g
				? (e = g)
				: de.Util.warn(
						'boundBoxFunc returned falsy. You should return new bound rect from it!'
					);
		}
		const o = 1e7,
			s = new de.Transform();
		s.translate(n.x, n.y), s.rotate(n.rotation), s.scale(n.width / o, n.height / o);
		const l = new de.Transform(),
			c = e.width / o,
			u = e.height / o;
		this.flipEnabled() === !1
			? (l.translate(e.x, e.y),
				l.rotate(e.rotation),
				l.translate(e.width < 0 ? e.width : 0, e.height < 0 ? e.height : 0),
				l.scale(Math.abs(c), Math.abs(u)))
			: (l.translate(e.x, e.y), l.rotate(e.rotation), l.scale(c, u));
		const f = l.multiply(s.invert());
		this._nodes.forEach((g) => {
			var h;
			const d = g.getParent().getAbsoluteTransform(),
				m = g.getTransform().copy();
			m.translate(g.offsetX(), g.offsetY());
			const y = new de.Transform();
			y.multiply(d.copy().invert()).multiply(f).multiply(d).multiply(m);
			const v = y.decompose();
			g.setAttrs(v), (h = g.getLayer()) === null || h === void 0 || h.batchDraw();
		}),
			this.rotation(de.Util._getRotation(e.rotation)),
			this._nodes.forEach((g) => {
				this._fire('transform', { evt: t, target: g }),
					g._fire('transform', { evt: t, target: g });
			}),
			this._resetTransformCache(),
			this.update(),
			this.getLayer().batchDraw();
	}
	forceUpdate() {
		this._resetTransformCache(), this.update();
	}
	_batchChangeChild(e, t) {
		this.findOne(e).setAttrs(t);
	}
	update() {
		var e;
		const t = this._getNodeRect();
		this.rotation(de.Util._getRotation(t.rotation));
		const n = t.width,
			i = t.height,
			a = this.enabledAnchors(),
			o = this.resizeEnabled(),
			s = this.padding(),
			l = this.anchorSize(),
			c = this.find('._anchor');
		c.forEach((f) => {
			f.setAttrs({
				width: l,
				height: l,
				offsetX: l / 2,
				offsetY: l / 2,
				stroke: this.anchorStroke(),
				strokeWidth: this.anchorStrokeWidth(),
				fill: this.anchorFill(),
				cornerRadius: this.anchorCornerRadius()
			});
		}),
			this._batchChangeChild('.top-left', {
				x: 0,
				y: 0,
				offsetX: l / 2 + s,
				offsetY: l / 2 + s,
				visible: o && a.indexOf('top-left') >= 0
			}),
			this._batchChangeChild('.top-center', {
				x: n / 2,
				y: 0,
				offsetY: l / 2 + s,
				visible: o && a.indexOf('top-center') >= 0
			}),
			this._batchChangeChild('.top-right', {
				x: n,
				y: 0,
				offsetX: l / 2 - s,
				offsetY: l / 2 + s,
				visible: o && a.indexOf('top-right') >= 0
			}),
			this._batchChangeChild('.middle-left', {
				x: 0,
				y: i / 2,
				offsetX: l / 2 + s,
				visible: o && a.indexOf('middle-left') >= 0
			}),
			this._batchChangeChild('.middle-right', {
				x: n,
				y: i / 2,
				offsetX: l / 2 - s,
				visible: o && a.indexOf('middle-right') >= 0
			}),
			this._batchChangeChild('.bottom-left', {
				x: 0,
				y: i,
				offsetX: l / 2 + s,
				offsetY: l / 2 - s,
				visible: o && a.indexOf('bottom-left') >= 0
			}),
			this._batchChangeChild('.bottom-center', {
				x: n / 2,
				y: i,
				offsetY: l / 2 - s,
				visible: o && a.indexOf('bottom-center') >= 0
			}),
			this._batchChangeChild('.bottom-right', {
				x: n,
				y: i,
				offsetX: l / 2 - s,
				offsetY: l / 2 - s,
				visible: o && a.indexOf('bottom-right') >= 0
			}),
			this._batchChangeChild('.rotater', {
				x: n / 2,
				y: -this.rotateAnchorOffset() * de.Util._sign(i) - s,
				visible: this.rotateEnabled()
			}),
			this._batchChangeChild('.back', {
				width: n,
				height: i,
				visible: this.borderEnabled(),
				stroke: this.borderStroke(),
				strokeWidth: this.borderStrokeWidth(),
				dash: this.borderDash(),
				x: 0,
				y: 0
			});
		const u = this.anchorStyleFunc();
		u &&
			c.forEach((f) => {
				u(f);
			}),
			(e = this.getLayer()) === null || e === void 0 || e.batchDraw();
	}
	isTransforming() {
		return this._transforming;
	}
	stopTransform() {
		if (this._transforming) {
			this._removeEvents();
			const e = this.findOne('.' + this._movingAnchorName);
			e && e.stopDrag();
		}
	}
	destroy() {
		return (
			this.getStage() &&
				this._cursorChange &&
				this.getStage().content &&
				(this.getStage().content.style.cursor = ''),
			Rc.Group.prototype.destroy.call(this),
			this.detach(),
			this._removeEvents(),
			this
		);
	}
	toObject() {
		return kc.Node.prototype.toObject.call(this);
	}
	clone(e) {
		return kc.Node.prototype.clone.call(this, e);
	}
	getClientRect() {
		return this.nodes().length > 0
			? super.getClientRect()
			: { x: 0, y: 0, width: 0, height: 0 };
	}
}
pa.Transformer = re;
re.isTransforming = () => bs > 0;
function Jp(r) {
	return (
		r instanceof Array || de.Util.warn('enabledAnchors value should be an array'),
		r instanceof Array &&
			r.forEach(function (e) {
				Mi.indexOf(e) === -1 &&
					de.Util.warn(
						'Unknown anchor name: ' + e + '. Available names are: ' + Mi.join(', ')
					);
			}),
		r || []
	);
}
re.prototype.className = 'Transformer';
(0, jp._registerNode)(re);
se.Factory.addGetterSetter(re, 'enabledAnchors', Mi, Jp);
se.Factory.addGetterSetter(re, 'flipEnabled', !0, (0, or.getBooleanValidator)());
se.Factory.addGetterSetter(re, 'resizeEnabled', !0);
se.Factory.addGetterSetter(re, 'anchorSize', 10, (0, or.getNumberValidator)());
se.Factory.addGetterSetter(re, 'rotateEnabled', !0);
se.Factory.addGetterSetter(re, 'rotateLineVisible', !0);
se.Factory.addGetterSetter(re, 'rotationSnaps', []);
se.Factory.addGetterSetter(re, 'rotateAnchorOffset', 50, (0, or.getNumberValidator)());
se.Factory.addGetterSetter(re, 'rotateAnchorCursor', 'crosshair');
se.Factory.addGetterSetter(
	re,
	'rotationSnapTolerance',
	5,
	(0, or.getNumberValidator)()
);
se.Factory.addGetterSetter(re, 'borderEnabled', !0);
se.Factory.addGetterSetter(re, 'anchorStroke', 'rgb(0, 161, 255)');
se.Factory.addGetterSetter(re, 'anchorStrokeWidth', 1, (0, or.getNumberValidator)());
se.Factory.addGetterSetter(re, 'anchorFill', 'white');
se.Factory.addGetterSetter(re, 'anchorCornerRadius', 0, (0, or.getNumberValidator)());
se.Factory.addGetterSetter(re, 'borderStroke', 'rgb(0, 161, 255)');
se.Factory.addGetterSetter(re, 'borderStrokeWidth', 1, (0, or.getNumberValidator)());
se.Factory.addGetterSetter(re, 'borderDash');
se.Factory.addGetterSetter(re, 'keepRatio', !0);
se.Factory.addGetterSetter(re, 'shiftBehavior', 'default');
se.Factory.addGetterSetter(re, 'centeredScaling', !1);
se.Factory.addGetterSetter(re, 'ignoreStroke', !1);
se.Factory.addGetterSetter(re, 'padding', 0, (0, or.getNumberValidator)());
se.Factory.addGetterSetter(re, 'nodes');
se.Factory.addGetterSetter(re, 'node');
se.Factory.addGetterSetter(re, 'boundBoxFunc');
se.Factory.addGetterSetter(re, 'anchorDragBoundFunc');
se.Factory.addGetterSetter(re, 'anchorStyleFunc');
se.Factory.addGetterSetter(re, 'shouldOverdrawWholeArea', !1);
se.Factory.addGetterSetter(re, 'useSingleNodeRotation', !0);
se.Factory.backCompat(re, {
	lineEnabled: 'borderEnabled',
	rotateHandlerOffset: 'rotateAnchorOffset',
	enabledHandlers: 'enabledAnchors'
});
var ma = {};
Object.defineProperty(ma, '__esModule', { value: !0 });
ma.Wedge = void 0;
const va = J,
	Zp = Te,
	em = Q,
	hu = H,
	tm = Q;
class Gt extends Zp.Shape {
	_sceneFunc(e) {
		e.beginPath(),
			e.arc(0, 0, this.radius(), 0, em.Konva.getAngle(this.angle()), this.clockwise()),
			e.lineTo(0, 0),
			e.closePath(),
			e.fillStrokeShape(this);
	}
	getWidth() {
		return this.radius() * 2;
	}
	getHeight() {
		return this.radius() * 2;
	}
	setWidth(e) {
		this.radius(e / 2);
	}
	setHeight(e) {
		this.radius(e / 2);
	}
}
ma.Wedge = Gt;
Gt.prototype.className = 'Wedge';
Gt.prototype._centroid = !0;
Gt.prototype._attrsAffectingSize = ['radius'];
(0, tm._registerNode)(Gt);
va.Factory.addGetterSetter(Gt, 'radius', 0, (0, hu.getNumberValidator)());
va.Factory.addGetterSetter(Gt, 'angle', 0, (0, hu.getNumberValidator)());
va.Factory.addGetterSetter(Gt, 'clockwise', !1);
va.Factory.backCompat(Gt, {
	angleDeg: 'angle',
	getAngleDeg: 'getAngle',
	setAngleDeg: 'setAngle'
});
var ya = {};
Object.defineProperty(ya, '__esModule', { value: !0 });
ya.Blur = void 0;
const Nc = J,
	rm = me,
	nm = H;
function Mc() {
	(this.r = 0), (this.g = 0), (this.b = 0), (this.a = 0), (this.next = null);
}
const im = [
		512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454,
		405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454,
		428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404,
		388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454,
		441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291,
		284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404,
		396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297,
		292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454,
		447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359,
		354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291,
		287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480,
		475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404,
		400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344,
		341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297,
		294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259
	],
	am = [
		9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17,
		17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
		19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
		21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
		21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
		22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
		22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
		23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
		23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24,
		24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
		24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
		24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
		24, 24, 24
	];
function om(r, e) {
	const t = r.data,
		n = r.width,
		i = r.height;
	let a, o, s, l, c, u, f, g, h, d, m, y, v, S, p, b, x, C, O, I, T, w, P, $;
	const N = e + e + 1,
		M = n - 1,
		R = i - 1,
		B = e + 1,
		K = (B * (B + 1)) / 2,
		te = new Mc(),
		ce = im[e],
		j = am[e];
	let ne = null,
		V = te,
		z = null,
		Y = null;
	for (s = 1; s < N; s++) (V = V.next = new Mc()), s === B && (ne = V);
	for (V.next = te, f = u = 0, o = 0; o < i; o++) {
		for (
			b = x = C = O = g = h = d = m = 0,
				y = B * (I = t[u]),
				v = B * (T = t[u + 1]),
				S = B * (w = t[u + 2]),
				p = B * (P = t[u + 3]),
				g += K * I,
				h += K * T,
				d += K * w,
				m += K * P,
				V = te,
				s = 0;
			s < B;
			s++
		)
			(V.r = I), (V.g = T), (V.b = w), (V.a = P), (V = V.next);
		for (s = 1; s < B; s++)
			(l = u + ((M < s ? M : s) << 2)),
				(g += (V.r = I = t[l]) * ($ = B - s)),
				(h += (V.g = T = t[l + 1]) * $),
				(d += (V.b = w = t[l + 2]) * $),
				(m += (V.a = P = t[l + 3]) * $),
				(b += I),
				(x += T),
				(C += w),
				(O += P),
				(V = V.next);
		for (z = te, Y = ne, a = 0; a < n; a++)
			(t[u + 3] = P = (m * ce) >> j),
				P !== 0
					? ((P = 255 / P),
						(t[u] = ((g * ce) >> j) * P),
						(t[u + 1] = ((h * ce) >> j) * P),
						(t[u + 2] = ((d * ce) >> j) * P))
					: (t[u] = t[u + 1] = t[u + 2] = 0),
				(g -= y),
				(h -= v),
				(d -= S),
				(m -= p),
				(y -= z.r),
				(v -= z.g),
				(S -= z.b),
				(p -= z.a),
				(l = (f + ((l = a + e + 1) < M ? l : M)) << 2),
				(b += z.r = t[l]),
				(x += z.g = t[l + 1]),
				(C += z.b = t[l + 2]),
				(O += z.a = t[l + 3]),
				(g += b),
				(h += x),
				(d += C),
				(m += O),
				(z = z.next),
				(y += I = Y.r),
				(v += T = Y.g),
				(S += w = Y.b),
				(p += P = Y.a),
				(b -= I),
				(x -= T),
				(C -= w),
				(O -= P),
				(Y = Y.next),
				(u += 4);
		f += n;
	}
	for (a = 0; a < n; a++) {
		for (
			x = C = O = b = h = d = m = g = 0,
				u = a << 2,
				y = B * (I = t[u]),
				v = B * (T = t[u + 1]),
				S = B * (w = t[u + 2]),
				p = B * (P = t[u + 3]),
				g += K * I,
				h += K * T,
				d += K * w,
				m += K * P,
				V = te,
				s = 0;
			s < B;
			s++
		)
			(V.r = I), (V.g = T), (V.b = w), (V.a = P), (V = V.next);
		for (c = n, s = 1; s <= e; s++)
			(u = (c + a) << 2),
				(g += (V.r = I = t[u]) * ($ = B - s)),
				(h += (V.g = T = t[u + 1]) * $),
				(d += (V.b = w = t[u + 2]) * $),
				(m += (V.a = P = t[u + 3]) * $),
				(b += I),
				(x += T),
				(C += w),
				(O += P),
				(V = V.next),
				s < R && (c += n);
		for (u = a, z = te, Y = ne, o = 0; o < i; o++)
			(l = u << 2),
				(t[l + 3] = P = (m * ce) >> j),
				P > 0
					? ((P = 255 / P),
						(t[l] = ((g * ce) >> j) * P),
						(t[l + 1] = ((h * ce) >> j) * P),
						(t[l + 2] = ((d * ce) >> j) * P))
					: (t[l] = t[l + 1] = t[l + 2] = 0),
				(g -= y),
				(h -= v),
				(d -= S),
				(m -= p),
				(y -= z.r),
				(v -= z.g),
				(S -= z.b),
				(p -= z.a),
				(l = (a + ((l = o + B) < R ? l : R) * n) << 2),
				(g += b += z.r = t[l]),
				(h += x += z.g = t[l + 1]),
				(d += C += z.b = t[l + 2]),
				(m += O += z.a = t[l + 3]),
				(z = z.next),
				(y += I = Y.r),
				(v += T = Y.g),
				(S += w = Y.b),
				(p += P = Y.a),
				(b -= I),
				(x -= T),
				(C -= w),
				(O -= P),
				(Y = Y.next),
				(u += n);
	}
}
const sm = function (e) {
	const t = Math.round(this.blurRadius());
	t > 0 && om(e, t);
};
ya.Blur = sm;
Nc.Factory.addGetterSetter(
	rm.Node,
	'blurRadius',
	0,
	(0, nm.getNumberValidator)(),
	Nc.Factory.afterSetFilter
);
var ba = {};
Object.defineProperty(ba, '__esModule', { value: !0 });
ba.Brighten = void 0;
const Fc = J,
	lm = me,
	cm = H,
	dm = function (r) {
		const e = this.brightness() * 255,
			t = r.data,
			n = t.length;
		for (let i = 0; i < n; i += 4) (t[i] += e), (t[i + 1] += e), (t[i + 2] += e);
	};
ba.Brighten = dm;
Fc.Factory.addGetterSetter(
	lm.Node,
	'brightness',
	0,
	(0, cm.getNumberValidator)(),
	Fc.Factory.afterSetFilter
);
var _a = {};
Object.defineProperty(_a, '__esModule', { value: !0 });
_a.Contrast = void 0;
const Lc = J,
	hm = me,
	um = H,
	fm = function (r) {
		const e = Math.pow((this.contrast() + 100) / 100, 2),
			t = r.data,
			n = t.length;
		let i = 150,
			a = 150,
			o = 150;
		for (let s = 0; s < n; s += 4)
			(i = t[s]),
				(a = t[s + 1]),
				(o = t[s + 2]),
				(i /= 255),
				(i -= 0.5),
				(i *= e),
				(i += 0.5),
				(i *= 255),
				(a /= 255),
				(a -= 0.5),
				(a *= e),
				(a += 0.5),
				(a *= 255),
				(o /= 255),
				(o -= 0.5),
				(o *= e),
				(o += 0.5),
				(o *= 255),
				(i = i < 0 ? 0 : i > 255 ? 255 : i),
				(a = a < 0 ? 0 : a > 255 ? 255 : a),
				(o = o < 0 ? 0 : o > 255 ? 255 : o),
				(t[s] = i),
				(t[s + 1] = a),
				(t[s + 2] = o);
	};
_a.Contrast = fm;
Lc.Factory.addGetterSetter(
	hm.Node,
	'contrast',
	0,
	(0, um.getNumberValidator)(),
	Lc.Factory.afterSetFilter
);
var Sa = {};
Object.defineProperty(Sa, '__esModule', { value: !0 });
Sa.Emboss = void 0;
const Qt = J,
	wa = me,
	gm = ye,
	uu = H,
	pm = function (r) {
		const e = this.embossStrength() * 10,
			t = this.embossWhiteLevel() * 255,
			n = this.embossDirection(),
			i = this.embossBlend(),
			a = r.data,
			o = r.width,
			s = r.height,
			l = o * 4;
		let c = 0,
			u = 0,
			f = s;
		switch (n) {
			case 'top-left':
				(c = -1), (u = -1);
				break;
			case 'top':
				(c = -1), (u = 0);
				break;
			case 'top-right':
				(c = -1), (u = 1);
				break;
			case 'right':
				(c = 0), (u = 1);
				break;
			case 'bottom-right':
				(c = 1), (u = 1);
				break;
			case 'bottom':
				(c = 1), (u = 0);
				break;
			case 'bottom-left':
				(c = 1), (u = -1);
				break;
			case 'left':
				(c = 0), (u = -1);
				break;
			default:
				gm.Util.error('Unknown emboss direction: ' + n);
		}
		do {
			const g = (f - 1) * l;
			let h = c;
			f + h < 1 && (h = 0), f + h > s && (h = 0);
			const d = (f - 1 + h) * o * 4;
			let m = o;
			do {
				const y = g + (m - 1) * 4;
				let v = u;
				m + v < 1 && (v = 0), m + v > o && (v = 0);
				const S = d + (m - 1 + v) * 4,
					p = a[y] - a[S],
					b = a[y + 1] - a[S + 1],
					x = a[y + 2] - a[S + 2];
				let C = p;
				const O = C > 0 ? C : -C,
					I = b > 0 ? b : -b,
					T = x > 0 ? x : -x;
				if ((I > O && (C = b), T > O && (C = x), (C *= e), i)) {
					const w = a[y] + C,
						P = a[y + 1] + C,
						$ = a[y + 2] + C;
					(a[y] = w > 255 ? 255 : w < 0 ? 0 : w),
						(a[y + 1] = P > 255 ? 255 : P < 0 ? 0 : P),
						(a[y + 2] = $ > 255 ? 255 : $ < 0 ? 0 : $);
				} else {
					let w = t - C;
					w < 0 ? (w = 0) : w > 255 && (w = 255), (a[y] = a[y + 1] = a[y + 2] = w);
				}
			} while (--m);
		} while (--f);
	};
Sa.Emboss = pm;
Qt.Factory.addGetterSetter(
	wa.Node,
	'embossStrength',
	0.5,
	(0, uu.getNumberValidator)(),
	Qt.Factory.afterSetFilter
);
Qt.Factory.addGetterSetter(
	wa.Node,
	'embossWhiteLevel',
	0.5,
	(0, uu.getNumberValidator)(),
	Qt.Factory.afterSetFilter
);
Qt.Factory.addGetterSetter(
	wa.Node,
	'embossDirection',
	'top-left',
	void 0,
	Qt.Factory.afterSetFilter
);
Qt.Factory.addGetterSetter(
	wa.Node,
	'embossBlend',
	!1,
	void 0,
	Qt.Factory.afterSetFilter
);
var Ia = {};
Object.defineProperty(Ia, '__esModule', { value: !0 });
Ia.Enhance = void 0;
const Gc = J,
	mm = me,
	vm = H;
function yo(r, e, t, n, i) {
	const a = t - e,
		o = i - n;
	if (a === 0) return n + o / 2;
	if (o === 0) return n;
	let s = (r - e) / a;
	return (s = o * s + n), s;
}
const ym = function (r) {
	const e = r.data,
		t = e.length;
	let n = e[0],
		i = n,
		a,
		o = e[1],
		s = o,
		l,
		c = e[2],
		u = c,
		f;
	const g = this.enhance();
	if (g === 0) return;
	for (let C = 0; C < t; C += 4)
		(a = e[C + 0]),
			a < n ? (n = a) : a > i && (i = a),
			(l = e[C + 1]),
			l < o ? (o = l) : l > s && (s = l),
			(f = e[C + 2]),
			f < c ? (c = f) : f > u && (u = f);
	i === n && ((i = 255), (n = 0)),
		s === o && ((s = 255), (o = 0)),
		u === c && ((u = 255), (c = 0));
	let h, d, m, y, v, S, p, b, x;
	g > 0
		? ((d = i + g * (255 - i)),
			(m = n - g * (n - 0)),
			(v = s + g * (255 - s)),
			(S = o - g * (o - 0)),
			(b = u + g * (255 - u)),
			(x = c - g * (c - 0)))
		: ((h = (i + n) * 0.5),
			(d = i + g * (i - h)),
			(m = n + g * (n - h)),
			(y = (s + o) * 0.5),
			(v = s + g * (s - y)),
			(S = o + g * (o - y)),
			(p = (u + c) * 0.5),
			(b = u + g * (u - p)),
			(x = c + g * (c - p)));
	for (let C = 0; C < t; C += 4)
		(e[C + 0] = yo(e[C + 0], n, i, m, d)),
			(e[C + 1] = yo(e[C + 1], o, s, S, v)),
			(e[C + 2] = yo(e[C + 2], c, u, x, b));
};
Ia.Enhance = ym;
Gc.Factory.addGetterSetter(
	mm.Node,
	'enhance',
	0,
	(0, vm.getNumberValidator)(),
	Gc.Factory.afterSetFilter
);
var xa = {};
Object.defineProperty(xa, '__esModule', { value: !0 });
xa.Grayscale = void 0;
const bm = function (r) {
	const e = r.data,
		t = e.length;
	for (let n = 0; n < t; n += 4) {
		const i = 0.34 * e[n] + 0.5 * e[n + 1] + 0.16 * e[n + 2];
		(e[n] = i), (e[n + 1] = i), (e[n + 2] = i);
	}
};
xa.Grayscale = bm;
var Ca = {};
Object.defineProperty(Ca, '__esModule', { value: !0 });
Ca.HSL = void 0;
const zr = J,
	al = me,
	ol = H;
zr.Factory.addGetterSetter(
	al.Node,
	'hue',
	0,
	(0, ol.getNumberValidator)(),
	zr.Factory.afterSetFilter
);
zr.Factory.addGetterSetter(
	al.Node,
	'saturation',
	0,
	(0, ol.getNumberValidator)(),
	zr.Factory.afterSetFilter
);
zr.Factory.addGetterSetter(
	al.Node,
	'luminance',
	0,
	(0, ol.getNumberValidator)(),
	zr.Factory.afterSetFilter
);
const _m = function (r) {
	const e = r.data,
		t = e.length,
		n = 1,
		i = Math.pow(2, this.saturation()),
		a = Math.abs(this.hue() + 360) % 360,
		o = this.luminance() * 127,
		s = n * i * Math.cos((a * Math.PI) / 180),
		l = n * i * Math.sin((a * Math.PI) / 180),
		c = 0.299 * n + 0.701 * s + 0.167 * l,
		u = 0.587 * n - 0.587 * s + 0.33 * l,
		f = 0.114 * n - 0.114 * s - 0.497 * l,
		g = 0.299 * n - 0.299 * s - 0.328 * l,
		h = 0.587 * n + 0.413 * s + 0.035 * l,
		d = 0.114 * n - 0.114 * s + 0.293 * l,
		m = 0.299 * n - 0.3 * s + 1.25 * l,
		y = 0.587 * n - 0.586 * s - 1.05 * l,
		v = 0.114 * n + 0.886 * s - 0.2 * l;
	let S, p, b, x;
	for (let C = 0; C < t; C += 4)
		(S = e[C + 0]),
			(p = e[C + 1]),
			(b = e[C + 2]),
			(x = e[C + 3]),
			(e[C + 0] = c * S + u * p + f * b + o),
			(e[C + 1] = g * S + h * p + d * b + o),
			(e[C + 2] = m * S + y * p + v * b + o),
			(e[C + 3] = x);
};
Ca.HSL = _m;
var Ea = {};
Object.defineProperty(Ea, '__esModule', { value: !0 });
Ea.HSV = void 0;
const Hr = J,
	sl = me,
	ll = H,
	Sm = function (r) {
		const e = r.data,
			t = e.length,
			n = Math.pow(2, this.value()),
			i = Math.pow(2, this.saturation()),
			a = Math.abs(this.hue() + 360) % 360,
			o = n * i * Math.cos((a * Math.PI) / 180),
			s = n * i * Math.sin((a * Math.PI) / 180),
			l = 0.299 * n + 0.701 * o + 0.167 * s,
			c = 0.587 * n - 0.587 * o + 0.33 * s,
			u = 0.114 * n - 0.114 * o - 0.497 * s,
			f = 0.299 * n - 0.299 * o - 0.328 * s,
			g = 0.587 * n + 0.413 * o + 0.035 * s,
			h = 0.114 * n - 0.114 * o + 0.293 * s,
			d = 0.299 * n - 0.3 * o + 1.25 * s,
			m = 0.587 * n - 0.586 * o - 1.05 * s,
			y = 0.114 * n + 0.886 * o - 0.2 * s;
		let v, S, p, b;
		for (let x = 0; x < t; x += 4)
			(v = e[x + 0]),
				(S = e[x + 1]),
				(p = e[x + 2]),
				(b = e[x + 3]),
				(e[x + 0] = l * v + c * S + u * p),
				(e[x + 1] = f * v + g * S + h * p),
				(e[x + 2] = d * v + m * S + y * p),
				(e[x + 3] = b);
	};
Ea.HSV = Sm;
Hr.Factory.addGetterSetter(
	sl.Node,
	'hue',
	0,
	(0, ll.getNumberValidator)(),
	Hr.Factory.afterSetFilter
);
Hr.Factory.addGetterSetter(
	sl.Node,
	'saturation',
	0,
	(0, ll.getNumberValidator)(),
	Hr.Factory.afterSetFilter
);
Hr.Factory.addGetterSetter(
	sl.Node,
	'value',
	0,
	(0, ll.getNumberValidator)(),
	Hr.Factory.afterSetFilter
);
var Pa = {};
Object.defineProperty(Pa, '__esModule', { value: !0 });
Pa.Invert = void 0;
const wm = function (r) {
	const e = r.data,
		t = e.length;
	for (let n = 0; n < t; n += 4)
		(e[n] = 255 - e[n]), (e[n + 1] = 255 - e[n + 1]), (e[n + 2] = 255 - e[n + 2]);
};
Pa.Invert = wm;
var Ta = {};
Object.defineProperty(Ta, '__esModule', { value: !0 });
Ta.Kaleidoscope = void 0;
const Fi = J,
	fu = me,
	Bc = ye,
	gu = H,
	Im = function (r, e, t) {
		const n = r.data,
			i = e.data,
			a = r.width,
			o = r.height,
			s = t.polarCenterX || a / 2,
			l = t.polarCenterY || o / 2;
		let c = Math.sqrt(s * s + l * l),
			u = a - s,
			f = o - l;
		const g = Math.sqrt(u * u + f * f);
		c = g > c ? g : c;
		const h = o,
			d = a,
			m = ((360 / d) * Math.PI) / 180;
		for (let y = 0; y < d; y += 1) {
			const v = Math.sin(y * m),
				S = Math.cos(y * m);
			for (let p = 0; p < h; p += 1) {
				(u = Math.floor(s + ((c * p) / h) * S)),
					(f = Math.floor(l + ((c * p) / h) * v));
				let b = (f * a + u) * 4;
				const x = n[b + 0],
					C = n[b + 1],
					O = n[b + 2],
					I = n[b + 3];
				(b = (y + p * a) * 4),
					(i[b + 0] = x),
					(i[b + 1] = C),
					(i[b + 2] = O),
					(i[b + 3] = I);
			}
		}
	},
	xm = function (r, e, t) {
		const n = r.data,
			i = e.data,
			a = r.width,
			o = r.height,
			s = t.polarCenterX || a / 2,
			l = t.polarCenterY || o / 2;
		let c = Math.sqrt(s * s + l * l),
			u = a - s,
			f = o - l;
		const g = Math.sqrt(u * u + f * f);
		c = g > c ? g : c;
		const h = o,
			d = a,
			m = 0;
		let y, v;
		for (u = 0; u < a; u += 1)
			for (f = 0; f < o; f += 1) {
				const S = u - s,
					p = f - l,
					b = (Math.sqrt(S * S + p * p) * h) / c;
				let x = ((Math.atan2(p, S) * 180) / Math.PI + 360 + m) % 360;
				(x = (x * d) / 360), (y = Math.floor(x)), (v = Math.floor(b));
				let C = (v * a + y) * 4;
				const O = n[C + 0],
					I = n[C + 1],
					T = n[C + 2],
					w = n[C + 3];
				(C = (f * a + u) * 4),
					(i[C + 0] = O),
					(i[C + 1] = I),
					(i[C + 2] = T),
					(i[C + 3] = w);
			}
	},
	Cm = function (r) {
		const e = r.width,
			t = r.height;
		let n,
			i,
			a,
			o,
			s,
			l,
			c,
			u,
			f,
			g,
			h = Math.round(this.kaleidoscopePower());
		const d = Math.round(this.kaleidoscopeAngle()),
			m = Math.floor((e * (d % 360)) / 360);
		if (h < 1) return;
		const y = Bc.Util.createCanvasElement();
		(y.width = e), (y.height = t);
		const v = y.getContext('2d').getImageData(0, 0, e, t);
		Bc.Util.releaseCanvas(y), Im(r, v, { polarCenterX: e / 2, polarCenterY: t / 2 });
		let S = e / Math.pow(2, h);
		for (; S <= 8; ) (S = S * 2), (h -= 1);
		S = Math.ceil(S);
		let p = S,
			b = 0,
			x = p,
			C = 1;
		for (m + S > e && ((b = p), (x = 0), (C = -1)), i = 0; i < t; i += 1)
			for (n = b; n !== x; n += C)
				(a = Math.round(n + m) % e),
					(f = (e * i + a) * 4),
					(s = v.data[f + 0]),
					(l = v.data[f + 1]),
					(c = v.data[f + 2]),
					(u = v.data[f + 3]),
					(g = (e * i + n) * 4),
					(v.data[g + 0] = s),
					(v.data[g + 1] = l),
					(v.data[g + 2] = c),
					(v.data[g + 3] = u);
		for (i = 0; i < t; i += 1)
			for (p = Math.floor(S), o = 0; o < h; o += 1) {
				for (n = 0; n < p + 1; n += 1)
					(f = (e * i + n) * 4),
						(s = v.data[f + 0]),
						(l = v.data[f + 1]),
						(c = v.data[f + 2]),
						(u = v.data[f + 3]),
						(g = (e * i + p * 2 - n - 1) * 4),
						(v.data[g + 0] = s),
						(v.data[g + 1] = l),
						(v.data[g + 2] = c),
						(v.data[g + 3] = u);
				p *= 2;
			}
		xm(v, r, {});
	};
Ta.Kaleidoscope = Cm;
Fi.Factory.addGetterSetter(
	fu.Node,
	'kaleidoscopePower',
	2,
	(0, gu.getNumberValidator)(),
	Fi.Factory.afterSetFilter
);
Fi.Factory.addGetterSetter(
	fu.Node,
	'kaleidoscopeAngle',
	0,
	(0, gu.getNumberValidator)(),
	Fi.Factory.afterSetFilter
);
var Oa = {};
Object.defineProperty(Oa, '__esModule', { value: !0 });
Oa.Mask = void 0;
const Vc = J,
	Em = me,
	Pm = H;
function fi(r, e, t) {
	let n = (t * r.width + e) * 4;
	const i = [];
	return i.push(r.data[n++], r.data[n++], r.data[n++], r.data[n++]), i;
}
function vn(r, e) {
	return Math.sqrt(
		Math.pow(r[0] - e[0], 2) + Math.pow(r[1] - e[1], 2) + Math.pow(r[2] - e[2], 2)
	);
}
function Tm(r) {
	const e = [0, 0, 0];
	for (let t = 0; t < r.length; t++)
		(e[0] += r[t][0]), (e[1] += r[t][1]), (e[2] += r[t][2]);
	return (e[0] /= r.length), (e[1] /= r.length), (e[2] /= r.length), e;
}
function Om(r, e) {
	const t = fi(r, 0, 0),
		n = fi(r, r.width - 1, 0),
		i = fi(r, 0, r.height - 1),
		a = fi(r, r.width - 1, r.height - 1),
		o = e || 10;
	if (vn(t, n) < o && vn(n, a) < o && vn(a, i) < o && vn(i, t) < o) {
		const s = Tm([n, t, a, i]),
			l = [];
		for (let c = 0; c < r.width * r.height; c++) {
			const u = vn(s, [r.data[c * 4], r.data[c * 4 + 1], r.data[c * 4 + 2]]);
			l[c] = u < o ? 0 : 255;
		}
		return l;
	}
}
function $m(r, e) {
	for (let t = 0; t < r.width * r.height; t++) r.data[4 * t + 3] = e[t];
}
function Am(r, e, t) {
	const n = [1, 1, 1, 1, 0, 1, 1, 1, 1],
		i = Math.round(Math.sqrt(n.length)),
		a = Math.floor(i / 2),
		o = [];
	for (let s = 0; s < t; s++)
		for (let l = 0; l < e; l++) {
			const c = s * e + l;
			let u = 0;
			for (let f = 0; f < i; f++)
				for (let g = 0; g < i; g++) {
					const h = s + f - a,
						d = l + g - a;
					if (h >= 0 && h < t && d >= 0 && d < e) {
						const m = h * e + d,
							y = n[f * i + g];
						u += r[m] * y;
					}
				}
			o[c] = u === 255 * 8 ? 255 : 0;
		}
	return o;
}
function km(r, e, t) {
	const n = [1, 1, 1, 1, 1, 1, 1, 1, 1],
		i = Math.round(Math.sqrt(n.length)),
		a = Math.floor(i / 2),
		o = [];
	for (let s = 0; s < t; s++)
		for (let l = 0; l < e; l++) {
			const c = s * e + l;
			let u = 0;
			for (let f = 0; f < i; f++)
				for (let g = 0; g < i; g++) {
					const h = s + f - a,
						d = l + g - a;
					if (h >= 0 && h < t && d >= 0 && d < e) {
						const m = h * e + d,
							y = n[f * i + g];
						u += r[m] * y;
					}
				}
			o[c] = u >= 255 * 4 ? 255 : 0;
		}
	return o;
}
function Rm(r, e, t) {
	const n = [
			0.1111111111111111, 0.1111111111111111, 0.1111111111111111, 0.1111111111111111,
			0.1111111111111111, 0.1111111111111111, 0.1111111111111111, 0.1111111111111111,
			0.1111111111111111
		],
		i = Math.round(Math.sqrt(n.length)),
		a = Math.floor(i / 2),
		o = [];
	for (let s = 0; s < t; s++)
		for (let l = 0; l < e; l++) {
			const c = s * e + l;
			let u = 0;
			for (let f = 0; f < i; f++)
				for (let g = 0; g < i; g++) {
					const h = s + f - a,
						d = l + g - a;
					if (h >= 0 && h < t && d >= 0 && d < e) {
						const m = h * e + d,
							y = n[f * i + g];
						u += r[m] * y;
					}
				}
			o[c] = u;
		}
	return o;
}
const Dm = function (r) {
	const e = this.threshold();
	let t = Om(r, e);
	return (
		t &&
			((t = Am(t, r.width, r.height)),
			(t = km(t, r.width, r.height)),
			(t = Rm(t, r.width, r.height)),
			$m(r, t)),
		r
	);
};
Oa.Mask = Dm;
Vc.Factory.addGetterSetter(
	Em.Node,
	'threshold',
	0,
	(0, Pm.getNumberValidator)(),
	Vc.Factory.afterSetFilter
);
var $a = {};
Object.defineProperty($a, '__esModule', { value: !0 });
$a.Noise = void 0;
const Uc = J,
	Nm = me,
	Mm = H,
	Fm = function (r) {
		const e = this.noise() * 255,
			t = r.data,
			n = t.length,
			i = e / 2;
		for (let a = 0; a < n; a += 4)
			(t[a + 0] += i - 2 * i * Math.random()),
				(t[a + 1] += i - 2 * i * Math.random()),
				(t[a + 2] += i - 2 * i * Math.random());
	};
$a.Noise = Fm;
Uc.Factory.addGetterSetter(
	Nm.Node,
	'noise',
	0.2,
	(0, Mm.getNumberValidator)(),
	Uc.Factory.afterSetFilter
);
var Aa = {};
Object.defineProperty(Aa, '__esModule', { value: !0 });
Aa.Pixelate = void 0;
const jc = J,
	Lm = ye,
	Gm = me,
	Bm = H,
	Vm = function (r) {
		let e = Math.ceil(this.pixelSize()),
			t = r.width,
			n = r.height,
			i,
			a,
			o,
			s,
			l,
			c,
			u,
			f = Math.ceil(t / e),
			g = Math.ceil(n / e),
			h,
			d,
			m,
			y,
			v,
			S,
			p,
			b = r.data;
		if (e <= 0) {
			Lm.Util.error('pixelSize value can not be <= 0');
			return;
		}
		for (v = 0; v < f; v += 1)
			for (S = 0; S < g; S += 1) {
				for (
					s = 0,
						l = 0,
						c = 0,
						u = 0,
						h = v * e,
						d = h + e,
						m = S * e,
						y = m + e,
						p = 0,
						i = h;
					i < d;
					i += 1
				)
					if (!(i >= t))
						for (a = m; a < y; a += 1)
							a >= n ||
								((o = (t * a + i) * 4),
								(s += b[o + 0]),
								(l += b[o + 1]),
								(c += b[o + 2]),
								(u += b[o + 3]),
								(p += 1));
				for (s = s / p, l = l / p, c = c / p, u = u / p, i = h; i < d; i += 1)
					if (!(i >= t))
						for (a = m; a < y; a += 1)
							a >= n ||
								((o = (t * a + i) * 4),
								(b[o + 0] = s),
								(b[o + 1] = l),
								(b[o + 2] = c),
								(b[o + 3] = u));
			}
	};
Aa.Pixelate = Vm;
jc.Factory.addGetterSetter(
	Gm.Node,
	'pixelSize',
	8,
	(0, Bm.getNumberValidator)(),
	jc.Factory.afterSetFilter
);
var ka = {};
Object.defineProperty(ka, '__esModule', { value: !0 });
ka.Posterize = void 0;
const zc = J,
	Um = me,
	jm = H,
	zm = function (r) {
		const e = Math.round(this.levels() * 254) + 1,
			t = r.data,
			n = t.length,
			i = 255 / e;
		for (let a = 0; a < n; a += 1) t[a] = Math.floor(t[a] / i) * i;
	};
ka.Posterize = zm;
zc.Factory.addGetterSetter(
	Um.Node,
	'levels',
	0.5,
	(0, jm.getNumberValidator)(),
	zc.Factory.afterSetFilter
);
var Ra = {};
Object.defineProperty(Ra, '__esModule', { value: !0 });
Ra.RGB = void 0;
const Li = J,
	cl = me,
	Hm = H,
	Wm = function (r) {
		const e = r.data,
			t = e.length,
			n = this.red(),
			i = this.green(),
			a = this.blue();
		for (let o = 0; o < t; o += 4) {
			const s = (0.34 * e[o] + 0.5 * e[o + 1] + 0.16 * e[o + 2]) / 255;
			(e[o] = s * n), (e[o + 1] = s * i), (e[o + 2] = s * a), (e[o + 3] = e[o + 3]);
		}
	};
Ra.RGB = Wm;
Li.Factory.addGetterSetter(cl.Node, 'red', 0, function (r) {
	return (this._filterUpToDate = !1), r > 255 ? 255 : r < 0 ? 0 : Math.round(r);
});
Li.Factory.addGetterSetter(cl.Node, 'green', 0, function (r) {
	return (this._filterUpToDate = !1), r > 255 ? 255 : r < 0 ? 0 : Math.round(r);
});
Li.Factory.addGetterSetter(
	cl.Node,
	'blue',
	0,
	Hm.RGBComponent,
	Li.Factory.afterSetFilter
);
var Da = {};
Object.defineProperty(Da, '__esModule', { value: !0 });
Da.RGBA = void 0;
const An = J,
	Na = me,
	Km = H,
	Ym = function (r) {
		const e = r.data,
			t = e.length,
			n = this.red(),
			i = this.green(),
			a = this.blue(),
			o = this.alpha();
		for (let s = 0; s < t; s += 4) {
			const l = 1 - o;
			(e[s] = n * o + e[s] * l),
				(e[s + 1] = i * o + e[s + 1] * l),
				(e[s + 2] = a * o + e[s + 2] * l);
		}
	};
Da.RGBA = Ym;
An.Factory.addGetterSetter(Na.Node, 'red', 0, function (r) {
	return (this._filterUpToDate = !1), r > 255 ? 255 : r < 0 ? 0 : Math.round(r);
});
An.Factory.addGetterSetter(Na.Node, 'green', 0, function (r) {
	return (this._filterUpToDate = !1), r > 255 ? 255 : r < 0 ? 0 : Math.round(r);
});
An.Factory.addGetterSetter(
	Na.Node,
	'blue',
	0,
	Km.RGBComponent,
	An.Factory.afterSetFilter
);
An.Factory.addGetterSetter(Na.Node, 'alpha', 1, function (r) {
	return (this._filterUpToDate = !1), r > 1 ? 1 : r < 0 ? 0 : r;
});
var Ma = {};
Object.defineProperty(Ma, '__esModule', { value: !0 });
Ma.Sepia = void 0;
const Xm = function (r) {
	const e = r.data,
		t = e.length;
	for (let n = 0; n < t; n += 4) {
		const i = e[n + 0],
			a = e[n + 1],
			o = e[n + 2];
		(e[n + 0] = Math.min(255, i * 0.393 + a * 0.769 + o * 0.189)),
			(e[n + 1] = Math.min(255, i * 0.349 + a * 0.686 + o * 0.168)),
			(e[n + 2] = Math.min(255, i * 0.272 + a * 0.534 + o * 0.131));
	}
};
Ma.Sepia = Xm;
var Fa = {};
Object.defineProperty(Fa, '__esModule', { value: !0 });
Fa.Solarize = void 0;
const qm = function (r) {
	const e = r.data,
		t = r.width,
		n = r.height,
		i = t * 4;
	let a = n;
	do {
		const o = (a - 1) * i;
		let s = t;
		do {
			const l = o + (s - 1) * 4;
			let c = e[l],
				u = e[l + 1],
				f = e[l + 2];
			c > 127 && (c = 255 - c),
				u > 127 && (u = 255 - u),
				f > 127 && (f = 255 - f),
				(e[l] = c),
				(e[l + 1] = u),
				(e[l + 2] = f);
		} while (--s);
	} while (--a);
};
Fa.Solarize = qm;
var La = {};
Object.defineProperty(La, '__esModule', { value: !0 });
La.Threshold = void 0;
const Hc = J,
	Qm = me,
	Jm = H,
	Zm = function (r) {
		const e = this.threshold() * 255,
			t = r.data,
			n = t.length;
		for (let i = 0; i < n; i += 1) t[i] = t[i] < e ? 0 : 255;
	};
La.Threshold = Zm;
Hc.Factory.addGetterSetter(
	Qm.Node,
	'threshold',
	0.5,
	(0, Jm.getNumberValidator)(),
	Hc.Factory.afterSetFilter
);
Object.defineProperty(Yi, '__esModule', { value: !0 });
Yi.Konva = void 0;
const Wc = Nh,
	ev = Zi,
	tv = ra,
	rv = aa,
	nv = oa,
	iv = sa,
	Kc = jr,
	av = Wn,
	ov = Zr,
	sv = Yn,
	lv = da,
	cv = ha,
	dv = ua,
	hv = fa,
	uv = tn,
	fv = ga,
	gv = pa,
	pv = ma,
	mv = ya,
	vv = ba,
	yv = _a,
	bv = Sa,
	_v = Ia,
	Sv = xa,
	wv = Ca,
	Iv = Ea,
	xv = Pa,
	Cv = Ta,
	Ev = Oa,
	Pv = $a,
	Tv = Aa,
	Ov = ka,
	$v = Ra,
	Av = Da,
	kv = Ma,
	Rv = Fa,
	Dv = La;
Yi.Konva = Wc.Konva.Util._assign(Wc.Konva, {
	Arc: ev.Arc,
	Arrow: tv.Arrow,
	Circle: rv.Circle,
	Ellipse: nv.Ellipse,
	Image: iv.Image,
	Label: Kc.Label,
	Tag: Kc.Tag,
	Line: av.Line,
	Path: ov.Path,
	Rect: sv.Rect,
	RegularPolygon: lv.RegularPolygon,
	Ring: cv.Ring,
	Sprite: dv.Sprite,
	Star: hv.Star,
	Text: uv.Text,
	TextPath: fv.TextPath,
	Transformer: gv.Transformer,
	Wedge: pv.Wedge,
	Filters: {
		Blur: mv.Blur,
		Brighten: vv.Brighten,
		Contrast: yv.Contrast,
		Emboss: bv.Emboss,
		Enhance: _v.Enhance,
		Grayscale: Sv.Grayscale,
		HSL: wv.HSL,
		HSV: Iv.HSV,
		Invert: xv.Invert,
		Kaleidoscope: Cv.Kaleidoscope,
		Mask: Ev.Mask,
		Noise: Pv.Noise,
		Pixelate: Tv.Pixelate,
		Posterize: Ov.Posterize,
		RGB: $v.RGB,
		RGBA: Av.RGBA,
		Sepia: kv.Sepia,
		Solarize: Rv.Solarize,
		Threshold: Dv.Threshold
	}
});
var Nv = Ys.exports;
Object.defineProperty(Nv, '__esModule', { value: !0 });
const Mv = Yi;
Ys.exports = Mv.Konva;
var Fv = Ys.exports;
const ke = L1(Fv);
class Wr extends Error {
	constructor(t, n) {
		var e = (...KC) => (
			super(...KC),
			xe(this, 'defaultMessage', 'A failure has occurred.'),
			xe(this, 'details', {}),
			this
		);
		t ? e(t) : (e(''), (this.message = this.defaultMessage)),
			n &&
				(n.fieldErrors && (this.details.fieldErrors = n.fieldErrors),
				n.nonFieldErrors && (this.details.nonFieldErrors = n.nonFieldErrors),
				n.nonFormErrors && (this.details.nonFormErrors = n.nonFormErrors));
	}
}
function Lv(r) {
	const e = r;
	let t = pr(100),
		n = null;
	const i = {};
	let a = pr(!1),
		o = pr(0),
		s = pr(0);
	const l = [
		() => {
			n && (n.width(F(s)), n.height(F(o)));
		}
	];
	function c(d) {
		if (!n) throw new Wr('Attempted to add a layer when the canvas is uninitialized.');
		return (i[d] = new ke.Layer()), n.add(i[d]), i[d];
	}
	function u(d) {
		if (i[d]) return i[d];
		throw new Wr(`Attempted to retrieve layer '${d}' which does not exist.`);
	}
	function f() {
		l.forEach((d) => d());
	}
	function g(d) {
		l.push(d);
	}
	function h() {
		(n = new ke.Stage({ container: e, width: F(s), height: F(o) })), Xe(a, !0);
	}
	return {
		get containerId() {
			return e;
		},
		get stage() {
			return n;
		},
		get pixelsPerMeter() {
			return F(t);
		},
		get initialized() {
			return F(a);
		},
		get width() {
			return F(s);
		},
		get height() {
			return F(o);
		},
		set width(d) {
			Xe(s, d, !0);
		},
		set height(d) {
			Xe(o, d, !0);
		},
		set pixelsPerMeter(d) {
			Xe(t, d, !0);
		},
		initialize: h,
		addLayer: c,
		getLayer: u,
		onResize: f,
		addResizeFunction: g
	};
}
var Bn;
class pu {
	constructor(e, t) {
		Ar(this, Bn, pr());
		xe(this, '_key', '');
		(this._key = e), (this._rune = t);
		{
			const n = localStorage.getItem(e);
			n && (this._rune = this.deserialize(n));
		}
		N1(
			() => (
				et(() => {
					this.persist();
				}),
				() => {}
			)
		);
	}
	get _rune() {
		return F(it(this, Bn));
	}
	set _rune(e) {
		Xe(it(this, Bn), e, !0);
	}
	get value() {
		return this._rune;
	}
	set value(e) {
		this._rune = e;
	}
	persist() {
		localStorage.setItem(this._key, this.serialize(this._rune));
	}
	serialize(e) {
		return JSON.stringify(e);
	}
	deserialize(e) {
		return JSON.parse(e);
	}
}
Bn = new WeakMap();
function Gv(r, e) {
	return new pu(r, e);
}
const Bv = 768,
	Vv = () => window.innerWidth < Bv,
	Uv = Vv() ? 'br' : 'bl',
	gi = 0.1,
	pi = 10;
function jv(r, e, t) {
	let n = pr(ls({ x: 1, y: 1 })),
		i = pr(ls({ x: 0, y: 0 }));
	const a = new pu('layoutControls', { buttonsExpanded: !0, buttonsPosition: Uv }),
		o = [];
	function s() {
		return { x: 0, y: r.height };
	}
	function l(p) {
		return p * r.pixelsPerMeter;
	}
	function c(p) {
		return p / r.pixelsPerMeter;
	}
	function u(p) {
		return -p * r.pixelsPerMeter;
	}
	function f(p) {
		return -p / r.pixelsPerMeter;
	}
	function g(p) {
		return p * r.pixelsPerMeter;
	}
	function h(p) {
		return p / r.pixelsPerMeter;
	}
	function d() {
		Xe(n, { x: 1, y: 1 }, !0), Xe(i, s(), !0);
	}
	function m(p) {
		(F(i).x += p.x), (F(i).y += p.y);
	}
	function y(p) {
		if (
			p === 0 ||
			(F(n).x <= gi && p < 0) ||
			(F(n).x >= pi && p > 0) ||
			(F(n).y <= gi && p < 0) ||
			(F(n).y >= pi && p > 0)
		)
			return;
		const b = { x: r.width / 2, y: r.width / 2 },
			x = { x: (b.x - F(i).x) / F(n).x, y: (b.y - F(i).y) / F(n).y },
			C = {
				x: p < 0 ? Math.max(F(n).x + p, gi) : Math.min(F(n).x + p, pi),
				y: p < 0 ? Math.max(F(n).y + p, gi) : Math.min(F(n).y + p, pi)
			};
		Xe(n, C, !0), Xe(i, { x: b.x - x.x * F(n).x, y: b.y - x.y * F(n).y }, !0);
	}
	function v(p) {
		o.push(p);
	}
	function S() {
		if (!r.stage)
			throw new Wr(
				'Attempted to initialize canvas transform with uninitialized stage.'
			);
		Xe(i, s(), !0),
			r.stage.position(F(i)),
			r.stage.draggable(e),
			et(() => {
				r.stage && (r.stage.scale(F(n)), r.stage.position(F(i)), o.forEach((p) => p()));
			}),
			r.stage.on('dragmove', () => {
				r.stage && Xe(i, r.stage.position(), !0);
			});
	}
	return {
		get config() {
			return a.value;
		},
		get scaleFactor() {
			return F(n);
		},
		set scaleFactor(p) {
			Xe(n, p, !0);
		},
		get position() {
			return F(i);
		},
		get strokeScale() {
			return t;
		},
		set config(p) {
			a.value = p;
		},
		set position(p) {
			Xe(i, p, !0);
		},
		canvasXPos: l,
		modelXPos: c,
		canvasYPos: u,
		modelYPos: f,
		canvasDistance: g,
		modelDistance: h,
		translate: m,
		addScale: y,
		reset: d,
		addTransformFunction: v,
		initialize: S
	};
}
function mi(r, e) {
	return Math.round(r / e) * e;
}
function Yc(r, e) {
	return Math.floor(r / e) * e;
}
function zv(r, e) {
	let t = null,
		n = null;
	const i = Gv('layoutGridState', {
			snapToGrid: !0,
			rightAngleConstraint: !1,
			metersPerBackgroundGridline: 0.3048
		}),
		a = At(() => r.pixelsPerMeter * i.value.metersPerBackgroundGridline);
	function o() {
		(t = r.addLayer('gridlines')),
			(n = new ke.Group()),
			t.add(n),
			r.addResizeFunction(l),
			e.addTransformFunction(l),
			l();
	}
	function s(c) {
		return i.value.snapToGrid ? { x: mi(c.x, F(a) / 2), y: mi(c.y, F(a) / 2) } : c;
	}
	function l() {
		if (!t || !n) return;
		const c = {
				x: -e.position.x / e.scaleFactor.x,
				y: -e.position.y / e.scaleFactor.y
			},
			u = { x: c.x + r.width / e.scaleFactor.x, y: c.y + r.height / e.scaleFactor.y },
			f = { x: Yc(c.x, F(a)), y: Yc(c.y, F(a)) },
			g = { x: mi(u.x + F(a), F(a)), y: mi(u.y + F(a), F(a)) },
			h = { x: Math.round((g.y - f.y) / F(a)), y: Math.round((g.x - f.x) / F(a)) },
			d = { x: F(a), y: F(a) };
		n.destroyChildren();
		for (let m = 0; m <= h.x; m++) {
			const y = f.y + d.x * m;
			let v = vt('neutral', 3, In.current),
				S = 1;
			y == 0 && ((v = vt('neutral', 4, In.current)), (S = 2)),
				n.add(
					new ke.Line({
						points: [f.x, y, g.x, y],
						stroke: v,
						strokeWidth: S,
						strokeScaleEnabled: !1
					})
				);
		}
		for (let m = 0; m <= h.y; m++) {
			const y = f.x + d.y * m;
			let v = vt('neutral', 2, In.current),
				S = 1;
			y == 0 && ((v = vt('neutral', 3, In.current)), (S = 2)),
				n.add(
					new ke.Line({
						points: [y, f.y, y, g.y],
						stroke: v,
						strokeWidth: S,
						strokeScaleEnabled: !1
					})
				);
		}
	}
	return {
		get config() {
			return i.value;
		},
		set config(c) {
			i.value = c;
		},
		initialize: o,
		snapToGrid: s
	};
}
function Hv(r) {
	var n, i;
	new ke.Group();
	const e = 'pointer';
	(n = r.stage) == null ||
		n.on('mouseover', () => {
			t();
		}),
		(i = r.stage) == null ||
			i.on('mouseout', () => {
				document.body.style.cursor = 'default';
			});
	function t() {
		switch (e) {
			case 'pointer':
				document.body.style.cursor = 'default';
				break;
			case 'group':
				document.body.style.cursor = 'crosshair';
				break;
			case 'union':
				document.body.style.cursor = 'crosshair';
				break;
			case 'intersect':
				document.body.style.cursor = 'crosshair';
				break;
		}
	}
	return { setDocumentCursor: t };
}
function Wv(r, e, t, n = !0, i = !0) {
	const a = r,
		o = e,
		s = Lv(a),
		l = jv(s, n, i),
		c = Hv(s),
		u = zv(s, l);
	function f() {
		s.initialize(), l.initialize();
	}
	function g() {
		s.stage && s.stage.destroy();
	}
	return {
		get canvasId() {
			return a;
		},
		get workspaceId() {
			return o;
		},
		transform: l,
		container: s,
		selectionGroup: c,
		gridManager: u,
		initialize: f,
		destroy: g,
		mode: t
	};
}
var yn = function (r) {
		return r && r.Math === Math && r;
	},
	$e =
		yn(typeof globalThis == 'object' && globalThis) ||
		yn(typeof window == 'object' && window) ||
		yn(typeof self == 'object' && self) ||
		yn(typeof Wt == 'object' && Wt) ||
		yn(typeof Wt == 'object' && Wt) ||
		(function () {
			return this;
		})() ||
		Function('return this')(),
	Xn = {},
	Ke = function (r) {
		try {
			return !!r();
		} catch {
			return !0;
		}
	},
	Kv = Ke,
	ht = !Kv(function () {
		return (
			Object.defineProperty({}, 1, {
				get: function () {
					return 7;
				}
			})[1] !== 7
		);
	}),
	Yv = Ke,
	Ga = !Yv(function () {
		var r = function () {}.bind();
		return typeof r != 'function' || r.hasOwnProperty('prototype');
	}),
	Xv = Ga,
	vi = Function.prototype.call,
	ie = Xv
		? vi.bind(vi)
		: function () {
				return vi.apply(vi, arguments);
			},
	mu = {},
	vu = {}.propertyIsEnumerable,
	yu = Object.getOwnPropertyDescriptor,
	qv = yu && !vu.call({ 1: 2 }, 1);
mu.f = qv
	? function (e) {
			var t = yu(this, e);
			return !!t && t.enumerable;
		}
	: vu;
var dl = function (r, e) {
		return {
			enumerable: !(r & 1),
			configurable: !(r & 2),
			writable: !(r & 4),
			value: e
		};
	},
	bu = Ga,
	_u = Function.prototype,
	_s = _u.call,
	Qv = bu && _u.bind.bind(_s, _s),
	Je = bu
		? Qv
		: function (r) {
				return function () {
					return _s.apply(r, arguments);
				};
			},
	Su = Je,
	Jv = Su({}.toString),
	Zv = Su(''.slice),
	hl = function (r) {
		return Zv(Jv(r), 8, -1);
	},
	ey = Je,
	ty = Ke,
	ry = hl,
	bo = Object,
	ny = ey(''.split),
	iy = ty(function () {
		return !bo('z').propertyIsEnumerable(0);
	})
		? function (r) {
				return ry(r) === 'String' ? ny(r, '') : bo(r);
			}
		: bo,
	ul = function (r) {
		return r == null;
	},
	ay = ul,
	oy = TypeError,
	fl = function (r) {
		if (ay(r)) throw new oy("Can't call method on " + r);
		return r;
	},
	sy = iy,
	ly = fl,
	Ba = function (r) {
		return sy(ly(r));
	},
	_o = typeof document == 'object' && document.all,
	Re =
		typeof _o > 'u' && _o !== void 0
			? function (r) {
					return typeof r == 'function' || r === _o;
				}
			: function (r) {
					return typeof r == 'function';
				},
	cy = Re,
	Ye = function (r) {
		return typeof r == 'object' ? r !== null : cy(r);
	},
	So = $e,
	dy = Re,
	hy = function (r) {
		return dy(r) ? r : void 0;
	},
	ut = function (r, e) {
		return arguments.length < 2 ? hy(So[r]) : So[r] && So[r][e];
	},
	uy = Je,
	rn = uy({}.isPrototypeOf),
	fy = $e,
	Xc = fy.navigator,
	qc = Xc && Xc.userAgent,
	gy = qc ? String(qc) : '',
	wu = $e,
	wo = gy,
	Qc = wu.process,
	Jc = wu.Deno,
	Zc = (Qc && Qc.versions) || (Jc && Jc.version),
	ed = Zc && Zc.v8,
	ot,
	Gi;
ed && ((ot = ed.split('.')), (Gi = ot[0] > 0 && ot[0] < 4 ? 1 : +(ot[0] + ot[1])));
!Gi &&
	wo &&
	((ot = wo.match(/Edge\/(\d+)/)),
	(!ot || ot[1] >= 74) && ((ot = wo.match(/Chrome\/(\d+)/)), ot && (Gi = +ot[1])));
var py = Gi,
	td = py,
	my = Ke,
	vy = $e,
	yy = vy.String,
	Iu =
		!!Object.getOwnPropertySymbols &&
		!my(function () {
			var r = Symbol('symbol detection');
			return (
				!yy(r) || !(Object(r) instanceof Symbol) || (!Symbol.sham && td && td < 41)
			);
		}),
	by = Iu,
	xu = by && !Symbol.sham && typeof Symbol.iterator == 'symbol',
	_y = ut,
	Sy = Re,
	wy = rn,
	Iy = xu,
	xy = Object,
	Cu = Iy
		? function (r) {
				return typeof r == 'symbol';
			}
		: function (r) {
				var e = _y('Symbol');
				return Sy(e) && wy(e.prototype, xy(r));
			},
	Cy = String,
	qn = function (r) {
		try {
			return Cy(r);
		} catch {
			return 'Object';
		}
	},
	Ey = Re,
	Py = qn,
	Ty = TypeError,
	De = function (r) {
		if (Ey(r)) return r;
		throw new Ty(Py(r) + ' is not a function');
	},
	Oy = De,
	$y = ul,
	xt = function (r, e) {
		var t = r[e];
		return $y(t) ? void 0 : Oy(t);
	},
	Io = ie,
	xo = Re,
	Co = Ye,
	Ay = TypeError,
	ky = function (r, e) {
		var t, n;
		if (
			(e === 'string' && xo((t = r.toString)) && !Co((n = Io(t, r)))) ||
			(xo((t = r.valueOf)) && !Co((n = Io(t, r)))) ||
			(e !== 'string' && xo((t = r.toString)) && !Co((n = Io(t, r))))
		)
			return n;
		throw new Ay("Can't convert object to primitive value");
	},
	Eu = { exports: {} },
	Pu = !1,
	rd = $e,
	Ry = Object.defineProperty,
	gl = function (r, e) {
		try {
			Ry(rd, r, { value: e, configurable: !0, writable: !0 });
		} catch {
			rd[r] = e;
		}
		return e;
	},
	Dy = $e,
	Ny = gl,
	nd = '__core-js_shared__',
	id = (Eu.exports = Dy[nd] || Ny(nd, {}));
(id.versions || (id.versions = [])).push({
	version: '3.42.0',
	mode: 'global',
	copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru)',
	license: 'https://github.com/zloirock/core-js/blob/v3.42.0/LICENSE',
	source: 'https://github.com/zloirock/core-js'
});
var Va = Eu.exports,
	ad = Va,
	Tu = function (r, e) {
		return ad[r] || (ad[r] = e || {});
	},
	My = fl,
	Fy = Object,
	Qn = function (r) {
		return Fy(My(r));
	},
	Ly = Je,
	Gy = Qn,
	By = Ly({}.hasOwnProperty),
	rt =
		Object.hasOwn ||
		function (e, t) {
			return By(Gy(e), t);
		},
	Vy = Je,
	Uy = 0,
	jy = Math.random(),
	zy = Vy((1).toString),
	pl = function (r) {
		return 'Symbol(' + (r === void 0 ? '' : r) + ')_' + zy(++Uy + jy, 36);
	},
	Hy = $e,
	Wy = Tu,
	od = rt,
	Ky = pl,
	Yy = Iu,
	Xy = xu,
	Lr = Hy.Symbol,
	Eo = Wy('wks'),
	qy = Xy ? Lr.for || Lr : (Lr && Lr.withoutSetter) || Ky,
	Ge = function (r) {
		return od(Eo, r) || (Eo[r] = Yy && od(Lr, r) ? Lr[r] : qy('Symbol.' + r)), Eo[r];
	},
	Qy = ie,
	sd = Ye,
	ld = Cu,
	Jy = xt,
	Zy = ky,
	e5 = Ge,
	t5 = TypeError,
	r5 = e5('toPrimitive'),
	n5 = function (r, e) {
		if (!sd(r) || ld(r)) return r;
		var t = Jy(r, r5),
			n;
		if (t) {
			if ((e === void 0 && (e = 'default'), (n = Qy(t, r, e)), !sd(n) || ld(n)))
				return n;
			throw new t5("Can't convert object to primitive value");
		}
		return e === void 0 && (e = 'number'), Zy(r, e);
	},
	i5 = n5,
	a5 = Cu,
	Ou = function (r) {
		var e = i5(r, 'string');
		return a5(e) ? e : e + '';
	},
	o5 = $e,
	cd = Ye,
	Ss = o5.document,
	s5 = cd(Ss) && cd(Ss.createElement),
	$u = function (r) {
		return s5 ? Ss.createElement(r) : {};
	},
	l5 = ht,
	c5 = Ke,
	d5 = $u,
	Au =
		!l5 &&
		!c5(function () {
			return (
				Object.defineProperty(d5('div'), 'a', {
					get: function () {
						return 7;
					}
				}).a !== 7
			);
		}),
	h5 = ht,
	u5 = ie,
	f5 = mu,
	g5 = dl,
	p5 = Ba,
	m5 = Ou,
	v5 = rt,
	y5 = Au,
	dd = Object.getOwnPropertyDescriptor;
Xn.f = h5
	? dd
	: function (e, t) {
			if (((e = p5(e)), (t = m5(t)), y5))
				try {
					return dd(e, t);
				} catch {}
			if (v5(e, t)) return g5(!u5(f5.f, e, t), e[t]);
		};
var Ct = {},
	b5 = ht,
	_5 = Ke,
	ku =
		b5 &&
		_5(function () {
			return (
				Object.defineProperty(function () {}, 'prototype', { value: 42, writable: !1 })
					.prototype !== 42
			);
		}),
	S5 = Ye,
	w5 = String,
	I5 = TypeError,
	ae = function (r) {
		if (S5(r)) return r;
		throw new I5(w5(r) + ' is not an object');
	},
	x5 = ht,
	C5 = Au,
	E5 = ku,
	yi = ae,
	hd = Ou,
	P5 = TypeError,
	Po = Object.defineProperty,
	T5 = Object.getOwnPropertyDescriptor,
	To = 'enumerable',
	Oo = 'configurable',
	$o = 'writable';
Ct.f = x5
	? E5
		? function (e, t, n) {
				if (
					(yi(e),
					(t = hd(t)),
					yi(n),
					typeof e == 'function' &&
						t === 'prototype' &&
						'value' in n &&
						$o in n &&
						!n[$o])
				) {
					var i = T5(e, t);
					i &&
						i[$o] &&
						((e[t] = n.value),
						(n = {
							configurable: Oo in n ? n[Oo] : i[Oo],
							enumerable: To in n ? n[To] : i[To],
							writable: !1
						}));
				}
				return Po(e, t, n);
			}
		: Po
	: function (e, t, n) {
			if ((yi(e), (t = hd(t)), yi(n), C5))
				try {
					return Po(e, t, n);
				} catch {}
			if ('get' in n || 'set' in n) throw new P5('Accessors not supported');
			return 'value' in n && (e[t] = n.value), e;
		};
var O5 = ht,
	$5 = Ct,
	A5 = dl,
	nn = O5
		? function (r, e, t) {
				return $5.f(r, e, A5(1, t));
			}
		: function (r, e, t) {
				return (r[e] = t), r;
			},
	Ru = { exports: {} },
	ws = ht,
	k5 = rt,
	Du = Function.prototype,
	R5 = ws && Object.getOwnPropertyDescriptor,
	D5 = k5(Du, 'name'),
	N5 = D5 && (!ws || (ws && R5(Du, 'name').configurable)),
	M5 = { CONFIGURABLE: N5 },
	F5 = Je,
	L5 = Re,
	Is = Va,
	G5 = F5(Function.toString);
L5(Is.inspectSource) ||
	(Is.inspectSource = function (r) {
		return G5(r);
	});
var Nu = Is.inspectSource,
	B5 = $e,
	V5 = Re,
	ud = B5.WeakMap,
	U5 = V5(ud) && /native code/.test(String(ud)),
	j5 = Tu,
	z5 = pl,
	fd = j5('keys'),
	ml = function (r) {
		return fd[r] || (fd[r] = z5(r));
	},
	vl = {},
	H5 = U5,
	Mu = $e,
	W5 = Ye,
	K5 = nn,
	Ao = rt,
	ko = Va,
	Y5 = ml,
	X5 = vl,
	gd = 'Object already initialized',
	xs = Mu.TypeError,
	q5 = Mu.WeakMap,
	Bi,
	kn,
	Vi,
	Q5 = function (r) {
		return Vi(r) ? kn(r) : Bi(r, {});
	},
	J5 = function (r) {
		return function (e) {
			var t;
			if (!W5(e) || (t = kn(e)).type !== r)
				throw new xs('Incompatible receiver, ' + r + ' required');
			return t;
		};
	};
if (H5 || ko.state) {
	var gt = ko.state || (ko.state = new q5());
	(gt.get = gt.get),
		(gt.has = gt.has),
		(gt.set = gt.set),
		(Bi = function (r, e) {
			if (gt.has(r)) throw new xs(gd);
			return (e.facade = r), gt.set(r, e), e;
		}),
		(kn = function (r) {
			return gt.get(r) || {};
		}),
		(Vi = function (r) {
			return gt.has(r);
		});
} else {
	var Nr = Y5('state');
	(X5[Nr] = !0),
		(Bi = function (r, e) {
			if (Ao(r, Nr)) throw new xs(gd);
			return (e.facade = r), K5(r, Nr, e), e;
		}),
		(kn = function (r) {
			return Ao(r, Nr) ? r[Nr] : {};
		}),
		(Vi = function (r) {
			return Ao(r, Nr);
		});
}
var Jn = { set: Bi, get: kn, has: Vi, enforce: Q5, getterFor: J5 },
	yl = Je,
	Z5 = Ke,
	e3 = Re,
	bi = rt,
	Cs = ht,
	t3 = M5.CONFIGURABLE,
	r3 = Nu,
	Fu = Jn,
	n3 = Fu.enforce,
	i3 = Fu.get,
	pd = String,
	$i = Object.defineProperty,
	a3 = yl(''.slice),
	o3 = yl(''.replace),
	s3 = yl([].join),
	l3 =
		Cs &&
		!Z5(function () {
			return $i(function () {}, 'length', { value: 8 }).length !== 8;
		}),
	c3 = String(String).split('String'),
	d3 = (Ru.exports = function (r, e, t) {
		a3(pd(e), 0, 7) === 'Symbol(' &&
			(e = '[' + o3(pd(e), /^Symbol\(([^)]*)\).*$/, '$1') + ']'),
			t && t.getter && (e = 'get ' + e),
			t && t.setter && (e = 'set ' + e),
			(!bi(r, 'name') || (t3 && r.name !== e)) &&
				(Cs ? $i(r, 'name', { value: e, configurable: !0 }) : (r.name = e)),
			l3 &&
				t &&
				bi(t, 'arity') &&
				r.length !== t.arity &&
				$i(r, 'length', { value: t.arity });
		try {
			t && bi(t, 'constructor') && t.constructor
				? Cs && $i(r, 'prototype', { writable: !1 })
				: r.prototype && (r.prototype = void 0);
		} catch {}
		var n = n3(r);
		return bi(n, 'source') || (n.source = s3(c3, typeof e == 'string' ? e : '')), r;
	});
Function.prototype.toString = d3(function () {
	return (e3(this) && i3(this).source) || r3(this);
}, 'toString');
var Lu = Ru.exports,
	h3 = Re,
	u3 = Ct,
	f3 = Lu,
	g3 = gl,
	Zn = function (r, e, t, n) {
		n || (n = {});
		var i = n.enumerable,
			a = n.name !== void 0 ? n.name : e;
		if ((h3(t) && f3(t, a, n), n.global)) i ? (r[e] = t) : g3(e, t);
		else {
			try {
				n.unsafe ? r[e] && (i = !0) : delete r[e];
			} catch {}
			i
				? (r[e] = t)
				: u3.f(r, e, {
						value: t,
						enumerable: !1,
						configurable: !n.nonConfigurable,
						writable: !n.nonWritable
					});
		}
		return r;
	},
	Gu = {},
	p3 = Math.ceil,
	m3 = Math.floor,
	v3 =
		Math.trunc ||
		function (e) {
			var t = +e;
			return (t > 0 ? m3 : p3)(t);
		},
	y3 = v3,
	bl = function (r) {
		var e = +r;
		return e !== e || e === 0 ? 0 : y3(e);
	},
	b3 = bl,
	_3 = Math.max,
	S3 = Math.min,
	w3 = function (r, e) {
		var t = b3(r);
		return t < 0 ? _3(t + e, 0) : S3(t, e);
	},
	I3 = bl,
	x3 = Math.min,
	C3 = function (r) {
		var e = I3(r);
		return e > 0 ? x3(e, 9007199254740991) : 0;
	},
	E3 = C3,
	_l = function (r) {
		return E3(r.length);
	},
	P3 = Ba,
	T3 = w3,
	O3 = _l,
	$3 = function (r) {
		return function (e, t, n) {
			var i = P3(e),
				a = O3(i);
			if (a === 0) return !r && -1;
			var o = T3(n, a),
				s;
			if (r && t !== t) {
				for (; a > o; ) if (((s = i[o++]), s !== s)) return !0;
			} else for (; a > o; o++) if ((r || o in i) && i[o] === t) return r || o || 0;
			return !r && -1;
		};
	},
	A3 = { indexOf: $3(!1) },
	k3 = Je,
	Ro = rt,
	R3 = Ba,
	D3 = A3.indexOf,
	N3 = vl,
	md = k3([].push),
	Bu = function (r, e) {
		var t = R3(r),
			n = 0,
			i = [],
			a;
		for (a in t) !Ro(N3, a) && Ro(t, a) && md(i, a);
		for (; e.length > n; ) Ro(t, (a = e[n++])) && (~D3(i, a) || md(i, a));
		return i;
	},
	Sl = [
		'constructor',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'toLocaleString',
		'toString',
		'valueOf'
	],
	M3 = Bu,
	F3 = Sl,
	L3 = F3.concat('length', 'prototype');
Gu.f =
	Object.getOwnPropertyNames ||
	function (e) {
		return M3(e, L3);
	};
var Vu = {};
Vu.f = Object.getOwnPropertySymbols;
var G3 = ut,
	B3 = Je,
	V3 = Gu,
	U3 = Vu,
	j3 = ae,
	z3 = B3([].concat),
	H3 =
		G3('Reflect', 'ownKeys') ||
		function (e) {
			var t = V3.f(j3(e)),
				n = U3.f;
			return n ? z3(t, n(e)) : t;
		},
	vd = rt,
	W3 = H3,
	K3 = Xn,
	Y3 = Ct,
	X3 = function (r, e, t) {
		for (var n = W3(e), i = Y3.f, a = K3.f, o = 0; o < n.length; o++) {
			var s = n[o];
			!vd(r, s) && !(t && vd(t, s)) && i(r, s, a(e, s));
		}
	},
	q3 = Ke,
	Q3 = Re,
	J3 = /#|\.prototype\./,
	ei = function (r, e) {
		var t = e4[Z3(r)];
		return t === r4 ? !0 : t === t4 ? !1 : Q3(e) ? q3(e) : !!e;
	},
	Z3 = (ei.normalize = function (r) {
		return String(r).replace(J3, '.').toLowerCase();
	}),
	e4 = (ei.data = {}),
	t4 = (ei.NATIVE = 'N'),
	r4 = (ei.POLYFILL = 'P'),
	n4 = ei,
	_i = $e,
	i4 = Xn.f,
	a4 = nn,
	o4 = Zn,
	s4 = gl,
	l4 = X3,
	c4 = n4,
	oe = function (r, e) {
		var t = r.target,
			n = r.global,
			i = r.stat,
			a,
			o,
			s,
			l,
			c,
			u;
		if (
			(n ? (o = _i) : i ? (o = _i[t] || s4(t, {})) : (o = _i[t] && _i[t].prototype), o)
		)
			for (s in e) {
				if (
					((c = e[s]),
					r.dontCallGetSet ? ((u = i4(o, s)), (l = u && u.value)) : (l = o[s]),
					(a = c4(n ? s : t + (i ? '.' : '#') + s, r.forced)),
					!a && l !== void 0)
				) {
					if (typeof c == typeof l) continue;
					l4(c, l);
				}
				(r.sham || (l && l.sham)) && a4(c, 'sham', !0), o4(o, s, c, r);
			}
	},
	d4 = rn,
	h4 = TypeError,
	Uu = function (r, e) {
		if (d4(e, r)) return r;
		throw new h4('Incorrect invocation');
	},
	u4 = Ke,
	f4 = !u4(function () {
		function r() {}
		return (
			(r.prototype.constructor = null), Object.getPrototypeOf(new r()) !== r.prototype
		);
	}),
	g4 = rt,
	p4 = Re,
	m4 = Qn,
	v4 = ml,
	y4 = f4,
	yd = v4('IE_PROTO'),
	Es = Object,
	b4 = Es.prototype,
	ti = y4
		? Es.getPrototypeOf
		: function (r) {
				var e = m4(r);
				if (g4(e, yd)) return e[yd];
				var t = e.constructor;
				return p4(t) && e instanceof t ? t.prototype : e instanceof Es ? b4 : null;
			},
	ju = {},
	_4 = Bu,
	S4 = Sl,
	w4 =
		Object.keys ||
		function (e) {
			return _4(e, S4);
		},
	I4 = ht,
	x4 = ku,
	C4 = Ct,
	E4 = ae,
	P4 = Ba,
	T4 = w4;
ju.f =
	I4 && !x4
		? Object.defineProperties
		: function (e, t) {
				E4(e);
				for (var n = P4(t), i = T4(t), a = i.length, o = 0, s; a > o; )
					C4.f(e, (s = i[o++]), n[s]);
				return e;
			};
var O4 = ut,
	$4 = O4('document', 'documentElement'),
	A4 = ae,
	k4 = ju,
	bd = Sl,
	R4 = vl,
	D4 = $4,
	N4 = $u,
	M4 = ml,
	_d = '>',
	Sd = '<',
	Ps = 'prototype',
	Ts = 'script',
	zu = M4('IE_PROTO'),
	Do = function () {},
	Hu = function (r) {
		return Sd + Ts + _d + r + Sd + '/' + Ts + _d;
	},
	wd = function (r) {
		r.write(Hu('')), r.close();
		var e = r.parentWindow.Object;
		return (r = null), e;
	},
	F4 = function () {
		var r = N4('iframe'),
			e = 'java' + Ts + ':',
			t;
		return (
			(r.style.display = 'none'),
			D4.appendChild(r),
			(r.src = String(e)),
			(t = r.contentWindow.document),
			t.open(),
			t.write(Hu('document.F=Object')),
			t.close(),
			t.F
		);
	},
	Si,
	Ai = function () {
		try {
			Si = new ActiveXObject('htmlfile');
		} catch {}
		Ai = typeof document < 'u' ? (document.domain && Si ? wd(Si) : F4()) : wd(Si);
		for (var r = bd.length; r--; ) delete Ai[Ps][bd[r]];
		return Ai();
	};
R4[zu] = !0;
var wl =
		Object.create ||
		function (e, t) {
			var n;
			return (
				e !== null
					? ((Do[Ps] = A4(e)), (n = new Do()), (Do[Ps] = null), (n[zu] = e))
					: (n = Ai()),
				t === void 0 ? n : k4.f(n, t)
			);
		},
	Wu = $e,
	Ku = Va,
	Yu = Re,
	wi = ti,
	L4 = Zn,
	G4 = Ge,
	Id = 'USE_FUNCTION_CONSTRUCTOR',
	xd = G4('asyncIterator'),
	Cd = Wu.AsyncIterator,
	Ed = Ku.AsyncIteratorPrototype,
	Xt,
	No;
if (Ed) Xt = Ed;
else if (Yu(Cd)) Xt = Cd.prototype;
else if (Ku[Id] || Wu[Id])
	try {
		(No = wi(wi(wi(Function('return async function*(){}()')())))),
			wi(No) === Object.prototype && (Xt = No);
	} catch {}
Xt || (Xt = {});
Yu(Xt[xd]) ||
	L4(Xt, xd, function () {
		return this;
	});
var Ua = Xt,
	B4 = oe,
	V4 = Uu,
	U4 = ti,
	Xu = nn,
	qu = rt,
	j4 = Ge,
	qt = Ua,
	z4 = Pu,
	Pd = j4('toStringTag'),
	H4 = TypeError,
	Il = function () {
		if ((V4(this, qt), U4(this) === qt))
			throw new H4('Abstract class AsyncIterator not directly constructable');
	};
Il.prototype = qt;
qu(qt, Pd) || Xu(qt, Pd, 'AsyncIterator');
(!qu(qt, 'constructor') || qt.constructor === Object) && Xu(qt, 'constructor', Il);
B4({ global: !0, constructor: !0, forced: z4 }, { AsyncIterator: Il });
var be = function (r) {
		return { iterator: r, next: r.next, done: !1 };
	},
	W4 = RangeError,
	ja = function (r) {
		if (r === r) return r;
		throw new W4('NaN is not allowed');
	},
	K4 = bl,
	Y4 = RangeError,
	za = function (r) {
		var e = K4(r);
		if (e < 0) throw new Y4("The argument can't be less than 0");
		return e;
	},
	X4 = function (r) {
		try {
			return { error: !1, value: r() };
		} catch (e) {
			return { error: !0, value: e };
		}
	},
	q4 = Zn,
	xl = function (r, e, t) {
		for (var n in e) q4(r, n, e[n], t);
		return r;
	},
	sr = function (r, e) {
		return { value: r, done: e };
	},
	Q4 = ie,
	Td = ae,
	J4 = xt,
	Be = function (r, e, t) {
		var n, i;
		Td(r);
		try {
			if (((n = J4(r, 'return')), !n)) {
				if (e === 'throw') throw t;
				return t;
			}
			n = Q4(n, r);
		} catch (a) {
			(i = !0), (n = a);
		}
		if (e === 'throw') throw t;
		if (i) throw n;
		return Td(n), t;
	},
	Z4 = ie,
	Ii = X4,
	Od = ae,
	e6 = wl,
	t6 = nn,
	r6 = xl,
	n6 = Ge,
	Qu = Jn,
	i6 = ut,
	a6 = xt,
	o6 = Ua,
	Mo = sr,
	$d = Be,
	pt = i6('Promise'),
	s6 = n6('toStringTag'),
	Ju = 'AsyncIteratorHelper',
	Zu = 'WrapForValidAsyncIterator',
	l6 = Qu.set,
	ef = function (r) {
		var e = !r,
			t = Qu.getterFor(r ? Zu : Ju),
			n = function (i) {
				var a = Ii(function () {
						return t(i);
					}),
					o = a.error,
					s = a.value;
				return o || (e && s.done)
					? { exit: !0, value: o ? pt.reject(s) : pt.resolve(Mo(void 0, !0)) }
					: { exit: !1, value: s };
			};
		return r6(e6(o6), {
			next: function () {
				var a = n(this),
					o = a.value;
				if (a.exit) return o;
				var s = Ii(function () {
						return Od(o.nextHandler(pt));
					}),
					l = s.error,
					c = s.value;
				return l && (o.done = !0), l ? pt.reject(c) : pt.resolve(c);
			},
			return: function () {
				var i = n(this),
					a = i.value;
				if (i.exit) return a;
				a.done = !0;
				var o = a.iterator,
					s,
					l,
					c = Ii(function () {
						if (a.inner)
							try {
								$d(a.inner.iterator, 'normal');
							} catch (u) {
								return $d(o, 'throw', u);
							}
						return a6(o, 'return');
					});
				return (
					(s = l = c.value),
					c.error
						? pt.reject(l)
						: s === void 0
							? pt.resolve(Mo(void 0, !0))
							: ((c = Ii(function () {
									return Z4(s, o);
								})),
								(l = c.value),
								c.error
									? pt.reject(l)
									: r
										? pt.resolve(l)
										: pt.resolve(l).then(function (u) {
												return Od(u), Mo(void 0, !0);
											}))
				);
			}
		});
	},
	c6 = ef(!0),
	tf = ef(!1);
t6(tf, s6, 'Async Iterator Helper');
var an = function (r, e) {
		var t = function (i, a) {
			a ? ((a.iterator = i.iterator), (a.next = i.next)) : (a = i),
				(a.type = e ? Zu : Ju),
				(a.nextHandler = r),
				(a.counter = 0),
				(a.done = !1),
				l6(this, a);
		};
		return (t.prototype = e ? c6 : tf), t;
	},
	d6 = oe,
	h6 = ie,
	Os = ae,
	u6 = be,
	f6 = ja,
	g6 = za,
	p6 = an,
	Ad = sr,
	m6 = p6(function (r) {
		var e = this;
		return new r(function (t, n) {
			var i = function (o) {
					(e.done = !0), n(o);
				},
				a = function () {
					try {
						r.resolve(Os(h6(e.next, e.iterator))).then(function (o) {
							try {
								Os(o).done
									? ((e.done = !0), t(Ad(void 0, !0)))
									: e.remaining
										? (e.remaining--, a())
										: t(Ad(o.value, !1));
							} catch (s) {
								i(s);
							}
						}, i);
					} catch (o) {
						i(o);
					}
				};
			a();
		});
	});
d6(
	{ target: 'AsyncIterator', proto: !0, real: !0, forced: !0 },
	{
		drop: function (e) {
			Os(this);
			var t = g6(f6(+e));
			return new m6(u6(this), { remaining: t });
		}
	}
);
var v6 = TypeError,
	y6 = 9007199254740991,
	b6 = function (r) {
		if (r > y6) throw v6('Maximum allowed index exceeded');
		return r;
	},
	_6 = ie,
	S6 = ut,
	w6 = xt,
	ri = function (r, e, t, n) {
		try {
			var i = w6(r, 'return');
			if (i)
				return S6('Promise')
					.resolve(_6(i, r))
					.then(
						function () {
							e(t);
						},
						function (a) {
							n(a);
						}
					);
		} catch (a) {
			return n(a);
		}
		e(t);
	},
	I6 = ie,
	x6 = De,
	Fo = ae,
	C6 = Ye,
	E6 = b6,
	P6 = ut,
	T6 = be,
	Lo = ri,
	bn = function (r) {
		var e = r === 0,
			t = r === 1,
			n = r === 2,
			i = r === 3;
		return function (a, o, s) {
			Fo(a);
			var l = o !== void 0;
			(l || !e) && x6(o);
			var c = T6(a),
				u = P6('Promise'),
				f = c.iterator,
				g = c.next,
				h = 0;
			return new u(function (d, m) {
				var y = function (S) {
						Lo(f, m, S, m);
					},
					v = function () {
						try {
							if (l)
								try {
									E6(h);
								} catch (S) {
									y(S);
								}
							u.resolve(Fo(I6(g, f))).then(function (S) {
								try {
									if (Fo(S).done) e ? ((s.length = h), d(s)) : d(i ? !1 : n || void 0);
									else {
										var p = S.value;
										try {
											if (l) {
												var b = o(p, h),
													x = function (C) {
														if (t) v();
														else if (n) C ? v() : Lo(f, d, !1, m);
														else if (e)
															try {
																(s[h++] = C), v();
															} catch (O) {
																y(O);
															}
														else C ? Lo(f, d, i || p, m) : v();
													};
												C6(b) ? u.resolve(b).then(x, y) : x(b);
											} else (s[h++] = p), v();
										} catch (C) {
											y(C);
										}
									}
								} catch (C) {
									m(C);
								}
							}, m);
						} catch (S) {
							m(S);
						}
					};
				v();
			});
		};
	},
	on = { toArray: bn(0), forEach: bn(1), every: bn(2), some: bn(3), find: bn(4) },
	O6 = oe,
	$6 = on.every;
O6(
	{ target: 'AsyncIterator', proto: !0, real: !0, forced: !0 },
	{
		every: function (e) {
			return $6(this, e);
		}
	}
);
var A6 = oe,
	k6 = ie,
	R6 = De,
	$s = ae,
	D6 = Ye,
	N6 = be,
	M6 = an,
	kd = sr,
	F6 = ri,
	L6 = M6(function (r) {
		var e = this,
			t = e.iterator,
			n = e.predicate;
		return new r(function (i, a) {
			var o = function (c) {
					(e.done = !0), a(c);
				},
				s = function (c) {
					F6(t, o, c, o);
				},
				l = function () {
					try {
						r.resolve($s(k6(e.next, t))).then(function (c) {
							try {
								if ($s(c).done) (e.done = !0), i(kd(void 0, !0));
								else {
									var u = c.value;
									try {
										var f = n(u, e.counter++),
											g = function (h) {
												h ? i(kd(u, !1)) : l();
											};
										D6(f) ? r.resolve(f).then(g, s) : g(f);
									} catch (h) {
										s(h);
									}
								}
							} catch (h) {
								o(h);
							}
						}, o);
					} catch (c) {
						o(c);
					}
				};
			l();
		});
	});
A6(
	{ target: 'AsyncIterator', proto: !0, real: !0, forced: !0 },
	{
		filter: function (e) {
			return $s(this), R6(e), new L6(N6(this), { predicate: e });
		}
	}
);
var G6 = oe,
	B6 = on.find;
G6(
	{ target: 'AsyncIterator', proto: !0, real: !0, forced: !0 },
	{
		find: function (e) {
			return B6(this, e);
		}
	}
);
var V6 = Ge,
	U6 = V6('toStringTag'),
	rf = {};
rf[U6] = 'z';
var j6 = String(rf) === '[object z]',
	z6 = j6,
	H6 = Re,
	ki = hl,
	W6 = Ge,
	K6 = W6('toStringTag'),
	Y6 = Object,
	X6 =
		ki(
			(function () {
				return arguments;
			})()
		) === 'Arguments',
	q6 = function (r, e) {
		try {
			return r[e];
		} catch {}
	},
	Cl = z6
		? ki
		: function (r) {
				var e, t, n;
				return r === void 0
					? 'Undefined'
					: r === null
						? 'Null'
						: typeof (t = q6((e = Y6(r)), K6)) == 'string'
							? t
							: X6
								? ki(e)
								: (n = ki(e)) === 'Object' && H6(e.callee)
									? 'Arguments'
									: n;
			},
	nf = {},
	Q6 = Cl,
	Rd = xt,
	J6 = ul,
	Z6 = nf,
	eb = Ge,
	tb = eb('iterator'),
	ni = function (r) {
		if (!J6(r)) return Rd(r, tb) || Rd(r, '@@iterator') || Z6[Q6(r)];
	},
	Dd = ie,
	Nd = ae,
	rb = wl,
	nb = xt,
	ib = xl,
	af = Jn,
	ab = Be,
	ob = ut,
	sb = Ua,
	of = sr,
	As = ob('Promise'),
	sf = 'AsyncFromSyncIterator',
	lb = af.set,
	Md = af.getterFor(sf),
	Fd = function (r, e, t, n, i) {
		var a = r.done;
		As.resolve(r.value).then(
			function (o) {
				e(of(o, a));
			},
			function (o) {
				if (!a && i)
					try {
						ab(n, 'throw', o);
					} catch (s) {
						o = s;
					}
				t(o);
			}
		);
	},
	lf = function (e) {
		(e.type = sf), lb(this, e);
	};
lf.prototype = ib(rb(sb), {
	next: function () {
		var e = Md(this);
		return new As(function (t, n) {
			var i = Nd(Dd(e.next, e.iterator));
			Fd(i, t, n, e.iterator, !0);
		});
	},
	return: function () {
		var r = Md(this).iterator;
		return new As(function (e, t) {
			var n = nb(r, 'return');
			if (n === void 0) return e(of(void 0, !0));
			var i = Nd(Dd(n, r));
			Fd(i, e, t, r);
		});
	}
});
var Ha = lf,
	cb = ie,
	db = Re,
	Ld = ae,
	Gd = be,
	hb = ni,
	ub = xt,
	fb = Ge,
	gb = Ha,
	pb = fb('asyncIterator'),
	cf = function (r) {
		var e = Ld(r),
			t = !0,
			n = ub(e, pb),
			i;
		return (
			db(n) || ((n = hb(e)), (t = !1)),
			n !== void 0 ? (i = cb(n, e)) : ((i = e), (t = !0)),
			Ld(i),
			Gd(t ? i : new gb(Gd(i)))
		);
	},
	mb = oe,
	Bd = ie,
	vb = De,
	xn = ae,
	yb = Ye,
	bb = be,
	_b = an,
	Vd = sr,
	Sb = cf,
	wb = ri,
	Ib = _b(function (r) {
		var e = this,
			t = e.iterator,
			n = e.mapper;
		return new r(function (i, a) {
			var o = function (u) {
					(e.done = !0), a(u);
				},
				s = function (u) {
					wb(t, o, u, o);
				},
				l = function () {
					try {
						r.resolve(xn(Bd(e.next, t))).then(function (u) {
							try {
								if (xn(u).done) (e.done = !0), i(Vd(void 0, !0));
								else {
									var f = u.value;
									try {
										var g = n(f, e.counter++),
											h = function (d) {
												try {
													(e.inner = Sb(d)), c();
												} catch (m) {
													s(m);
												}
											};
										yb(g) ? r.resolve(g).then(h, s) : h(g);
									} catch (d) {
										s(d);
									}
								}
							} catch (d) {
								o(d);
							}
						}, o);
					} catch (u) {
						o(u);
					}
				},
				c = function () {
					var u = e.inner;
					if (u)
						try {
							r.resolve(xn(Bd(u.next, u.iterator))).then(function (f) {
								try {
									xn(f).done ? ((e.inner = null), l()) : i(Vd(f.value, !1));
								} catch (g) {
									s(g);
								}
							}, s);
						} catch (f) {
							s(f);
						}
					else l();
				};
			c();
		});
	});
mb(
	{ target: 'AsyncIterator', proto: !0, real: !0, forced: !0 },
	{
		flatMap: function (e) {
			return xn(this), vb(e), new Ib(bb(this), { mapper: e, inner: null });
		}
	}
);
var xb = oe,
	Cb = on.forEach;
xb(
	{ target: 'AsyncIterator', proto: !0, real: !0, forced: !0 },
	{
		forEach: function (e) {
			return Cb(this, e);
		}
	}
);
var Eb = ie,
	Pb = an,
	df = Pb(function () {
		return Eb(this.next, this.iterator);
	}, !0),
	Tb = oe,
	Ob = Qn,
	$b = rn,
	Ab = cf,
	kb = Ua,
	Rb = df;
Tb(
	{ target: 'AsyncIterator', stat: !0, forced: !0 },
	{
		from: function (e) {
			var t = Ab(typeof e == 'string' ? Ob(e) : e);
			return $b(kb, t.iterator) ? t.iterator : new Rb(t);
		}
	}
);
var Db = ie,
	Nb = De,
	ks = ae,
	Mb = Ye,
	Fb = be,
	Lb = an,
	Ud = sr,
	Gb = ri,
	Bb = Lb(function (r) {
		var e = this,
			t = e.iterator,
			n = e.mapper;
		return new r(function (i, a) {
			var o = function (l) {
					(e.done = !0), a(l);
				},
				s = function (l) {
					Gb(t, o, l, o);
				};
			r.resolve(ks(Db(e.next, t))).then(function (l) {
				try {
					if (ks(l).done) (e.done = !0), i(Ud(void 0, !0));
					else {
						var c = l.value;
						try {
							var u = n(c, e.counter++),
								f = function (g) {
									i(Ud(g, !1));
								};
							Mb(u) ? r.resolve(u).then(f, s) : f(u);
						} catch (g) {
							s(g);
						}
					}
				} catch (g) {
					o(g);
				}
			}, o);
		});
	}),
	hf = function (e) {
		return ks(this), Nb(e), new Bb(Fb(this), { mapper: e });
	},
	Vb = oe,
	Ub = hf;
Vb({ target: 'AsyncIterator', proto: !0, real: !0, forced: !0 }, { map: Ub });
var jb = oe,
	zb = ie,
	Hb = De,
	Go = ae,
	Wb = Ye,
	Kb = ut,
	Yb = be,
	Xb = ri,
	Bo = Kb('Promise'),
	qb = TypeError;
jb(
	{ target: 'AsyncIterator', proto: !0, real: !0, forced: !0 },
	{
		reduce: function (e) {
			Go(this), Hb(e);
			var t = Yb(this),
				n = t.iterator,
				i = t.next,
				a = arguments.length < 2,
				o = a ? void 0 : arguments[1],
				s = 0;
			return new Bo(function (l, c) {
				var u = function (g) {
						Xb(n, c, g, c);
					},
					f = function () {
						try {
							Bo.resolve(Go(zb(i, n))).then(function (g) {
								try {
									if (Go(g).done)
										a
											? c(new qb('Reduce of empty iterator with no initial value'))
											: l(o);
									else {
										var h = g.value;
										if (a) (a = !1), (o = h), f();
										else
											try {
												var d = e(o, h, s),
													m = function (y) {
														(o = y), f();
													};
												Wb(d) ? Bo.resolve(d).then(m, u) : m(d);
											} catch (y) {
												u(y);
											}
									}
									s++;
								} catch (y) {
									c(y);
								}
							}, c);
						} catch (g) {
							c(g);
						}
					};
				f();
			});
		}
	}
);
var Qb = oe,
	Jb = on.some;
Qb(
	{ target: 'AsyncIterator', proto: !0, real: !0, forced: !0 },
	{
		some: function (e) {
			return Jb(this, e);
		}
	}
);
var Zb = oe,
	jd = ie,
	uf = ae,
	e8 = be,
	t8 = ja,
	r8 = za,
	n8 = an,
	Vo = sr,
	i8 = n8(function (r) {
		var e = this,
			t = e.iterator,
			n;
		if (!e.remaining--) {
			var i = Vo(void 0, !0);
			return (
				(e.done = !0),
				(n = t.return),
				n !== void 0
					? r.resolve(jd(n, t, void 0)).then(function () {
							return i;
						})
					: i
			);
		}
		return r
			.resolve(jd(e.next, t))
			.then(function (a) {
				return uf(a).done ? ((e.done = !0), Vo(void 0, !0)) : Vo(a.value, !1);
			})
			.then(null, function (a) {
				throw ((e.done = !0), a);
			});
	});
Zb(
	{ target: 'AsyncIterator', proto: !0, real: !0, forced: !0 },
	{
		take: function (e) {
			uf(this);
			var t = r8(t8(+e));
			return new i8(e8(this), { remaining: t });
		}
	}
);
var a8 = oe,
	o8 = on.toArray;
a8(
	{ target: 'AsyncIterator', proto: !0, real: !0, forced: !0 },
	{
		toArray: function () {
			return o8(this, void 0, []);
		}
	}
);
var zd = Lu,
	s8 = Ct,
	ff = function (r, e, t) {
		return (
			t.get && zd(t.get, e, { getter: !0 }),
			t.set && zd(t.set, e, { setter: !0 }),
			s8.f(r, e, t)
		);
	},
	l8 = ht,
	c8 = Ct,
	d8 = dl,
	h8 = function (r, e, t) {
		l8 ? c8.f(r, e, d8(0, t)) : (r[e] = t);
	},
	u8 = Ke,
	f8 = Re,
	g8 = Ye,
	Hd = ti,
	p8 = Zn,
	m8 = Ge,
	Rs = m8('iterator'),
	vr,
	Uo,
	jo;
[].keys &&
	((jo = [].keys()),
	'next' in jo && ((Uo = Hd(Hd(jo))), Uo !== Object.prototype && (vr = Uo)));
var v8 =
	!g8(vr) ||
	u8(function () {
		var r = {};
		return vr[Rs].call(r) !== r;
	});
v8 && (vr = {});
f8(vr[Rs]) ||
	p8(vr, Rs, function () {
		return this;
	});
var Wa = { IteratorPrototype: vr },
	y8 = oe,
	b8 = $e,
	_8 = Uu,
	S8 = ae,
	w8 = Re,
	I8 = ti,
	x8 = ff,
	C8 = h8,
	E8 = Ke,
	El = rt,
	P8 = Ge,
	_t = Wa.IteratorPrototype,
	T8 = ht,
	zo = 'constructor',
	gf = 'Iterator',
	Wd = P8('toStringTag'),
	pf = TypeError,
	Ho = b8[gf],
	mf =
		!w8(Ho) ||
		Ho.prototype !== _t ||
		!E8(function () {
			Ho({});
		}),
	Pl = function () {
		if ((_8(this, _t), I8(this) === _t))
			throw new pf('Abstract class Iterator not directly constructable');
	},
	vf = function (r, e) {
		T8
			? x8(_t, r, {
					configurable: !0,
					get: function () {
						return e;
					},
					set: function (t) {
						if ((S8(this), this === _t))
							throw new pf("You can't redefine this property");
						El(this, r) ? (this[r] = t) : C8(this, r, t);
					}
				})
			: (_t[r] = e);
	};
El(_t, Wd) || vf(Wd, gf);
(mf || !El(_t, zo) || _t[zo] === Object) && vf(zo, Pl);
Pl.prototype = _t;
y8({ global: !0, constructor: !0, forced: mf }, { Iterator: Pl });
var O8 = ie,
	$8 = wl,
	A8 = nn,
	k8 = xl,
	R8 = Ge,
	yf = Jn,
	D8 = xt,
	N8 = Wa.IteratorPrototype,
	xi = sr,
	Wo = Be,
	M8 = R8('toStringTag'),
	bf = 'IteratorHelper',
	_f = 'WrapForValidIterator',
	F8 = yf.set,
	Sf = function (r) {
		var e = yf.getterFor(r ? _f : bf);
		return k8($8(N8), {
			next: function () {
				var n = e(this);
				if (r) return n.nextHandler();
				if (n.done) return xi(void 0, !0);
				try {
					var i = n.nextHandler();
					return n.returnHandlerResult ? i : xi(i, n.done);
				} catch (a) {
					throw ((n.done = !0), a);
				}
			},
			return: function () {
				var t = e(this),
					n = t.iterator;
				if (((t.done = !0), r)) {
					var i = D8(n, 'return');
					return i ? O8(i, n) : xi(void 0, !0);
				}
				if (t.inner)
					try {
						Wo(t.inner.iterator, 'normal');
					} catch (a) {
						return Wo(n, 'throw', a);
					}
				return n && Wo(n, 'normal'), xi(void 0, !0);
			}
		});
	},
	L8 = Sf(!0),
	wf = Sf(!1);
A8(wf, M8, 'Iterator Helper');
var sn = function (r, e, t) {
		var n = function (a, o) {
			o ? ((o.iterator = a.iterator), (o.next = a.next)) : (o = a),
				(o.type = e ? _f : bf),
				(o.returnHandlerResult = !!t),
				(o.nextHandler = r),
				(o.counter = 0),
				(o.done = !1),
				F8(this, o);
		};
		return (n.prototype = e ? L8 : wf), n;
	},
	G8 = $e,
	Et = function (r, e) {
		var t = G8.Iterator,
			n = t && t.prototype,
			i = n && n[r],
			a = !1;
		if (i)
			try {
				i.call(
					{
						next: function () {
							return { done: !0 };
						},
						return: function () {
							a = !0;
						}
					},
					-1
				);
			} catch (o) {
				o instanceof e || (a = !1);
			}
		if (!a) return i;
	},
	B8 = oe,
	Ds = ie,
	Ns = ae,
	V8 = be,
	U8 = ja,
	j8 = za,
	z8 = Be,
	H8 = sn,
	W8 = Et,
	Ko = W8('drop', RangeError),
	K8 = H8(function () {
		for (var r = this.iterator, e = this.next, t, n; this.remaining; )
			if ((this.remaining--, (t = Ns(Ds(e, r))), (n = this.done = !!t.done), n)) return;
		if (((t = Ns(Ds(e, r))), (n = this.done = !!t.done), !n)) return t.value;
	});
B8(
	{ target: 'Iterator', proto: !0, real: !0, forced: Ko },
	{
		drop: function (e) {
			Ns(this);
			var t;
			try {
				t = j8(U8(+e));
			} catch (n) {
				z8(this, 'throw', n);
			}
			return Ko ? Ds(Ko, this, t) : new K8(V8(this), { remaining: t });
		}
	}
);
var Y8 = hl,
	X8 = Je,
	q8 = function (r) {
		if (Y8(r) === 'Function') return X8(r);
	},
	Kd = q8,
	Q8 = De,
	J8 = Ga,
	Z8 = Kd(Kd.bind),
	If = function (r, e) {
		return (
			Q8(r),
			e === void 0
				? r
				: J8
					? Z8(r, e)
					: function () {
							return r.apply(e, arguments);
						}
		);
	},
	e9 = Ge,
	t9 = nf,
	r9 = e9('iterator'),
	n9 = Array.prototype,
	i9 = function (r) {
		return r !== void 0 && (t9.Array === r || n9[r9] === r);
	},
	a9 = ie,
	o9 = De,
	s9 = ae,
	l9 = qn,
	c9 = ni,
	d9 = TypeError,
	Tl = function (r, e) {
		var t = arguments.length < 2 ? c9(r) : e;
		if (o9(t)) return s9(a9(t, r));
		throw new d9(l9(r) + ' is not iterable');
	},
	h9 = If,
	u9 = ie,
	f9 = ae,
	g9 = qn,
	p9 = i9,
	m9 = _l,
	Yd = rn,
	v9 = Tl,
	y9 = ni,
	Xd = Be,
	b9 = TypeError,
	Ri = function (r, e) {
		(this.stopped = r), (this.result = e);
	},
	qd = Ri.prototype,
	ln = function (r, e, t) {
		var n = t && t.that,
			i = !!(t && t.AS_ENTRIES),
			a = !!(t && t.IS_RECORD),
			o = !!(t && t.IS_ITERATOR),
			s = !!(t && t.INTERRUPTED),
			l = h9(e, n),
			c,
			u,
			f,
			g,
			h,
			d,
			m,
			y = function (S) {
				return c && Xd(c, 'normal', S), new Ri(!0, S);
			},
			v = function (S) {
				return i ? (f9(S), s ? l(S[0], S[1], y) : l(S[0], S[1])) : s ? l(S, y) : l(S);
			};
		if (a) c = r.iterator;
		else if (o) c = r;
		else {
			if (((u = y9(r)), !u)) throw new b9(g9(r) + ' is not iterable');
			if (p9(u)) {
				for (f = 0, g = m9(r); g > f; f++)
					if (((h = v(r[f])), h && Yd(qd, h))) return h;
				return new Ri(!1);
			}
			c = v9(r, u);
		}
		for (d = a ? r.next : c.next; !(m = u9(d, c)).done; ) {
			try {
				h = v(m.value);
			} catch (S) {
				Xd(c, 'throw', S);
			}
			if (typeof h == 'object' && h && Yd(qd, h)) return h;
		}
		return new Ri(!1);
	},
	_9 = oe,
	S9 = ie,
	w9 = ln,
	I9 = De,
	x9 = ae,
	C9 = be,
	E9 = Be,
	P9 = Et,
	Yo = P9('every', TypeError);
_9(
	{ target: 'Iterator', proto: !0, real: !0, forced: Yo },
	{
		every: function (e) {
			x9(this);
			try {
				I9(e);
			} catch (i) {
				E9(this, 'throw', i);
			}
			if (Yo) return S9(Yo, this, e);
			var t = C9(this),
				n = 0;
			return !w9(
				t,
				function (i, a) {
					if (!e(i, n++)) return a();
				},
				{ IS_RECORD: !0, INTERRUPTED: !0 }
			).stopped;
		}
	}
);
var T9 = ae,
	O9 = Be,
	xf = function (r, e, t, n) {
		try {
			return n ? e(T9(t)[0], t[1]) : e(t);
		} catch (i) {
			O9(r, 'throw', i);
		}
	},
	$9 = oe,
	Cf = ie,
	A9 = De,
	Ef = ae,
	k9 = be,
	R9 = sn,
	D9 = xf,
	N9 = Be,
	M9 = Et,
	Xo = M9('filter', TypeError),
	F9 = R9(function () {
		for (var r = this.iterator, e = this.predicate, t = this.next, n, i, a; ; ) {
			if (((n = Ef(Cf(t, r))), (i = this.done = !!n.done), i)) return;
			if (((a = n.value), D9(r, e, [a, this.counter++], !0))) return a;
		}
	});
$9(
	{ target: 'Iterator', proto: !0, real: !0, forced: Xo },
	{
		filter: function (e) {
			Ef(this);
			try {
				A9(e);
			} catch (t) {
				N9(this, 'throw', t);
			}
			return Xo ? Cf(Xo, this, e) : new F9(k9(this), { predicate: e });
		}
	}
);
var L9 = oe,
	G9 = ie,
	B9 = ln,
	V9 = De,
	U9 = ae,
	j9 = be,
	z9 = Be,
	H9 = Et,
	qo = H9('find', TypeError);
L9(
	{ target: 'Iterator', proto: !0, real: !0, forced: qo },
	{
		find: function (e) {
			U9(this);
			try {
				V9(e);
			} catch (i) {
				z9(this, 'throw', i);
			}
			if (qo) return G9(qo, this, e);
			var t = j9(this),
				n = 0;
			return B9(
				t,
				function (i, a) {
					if (e(i, n++)) return a(i);
				},
				{ IS_RECORD: !0, INTERRUPTED: !0 }
			).result;
		}
	}
);
var W9 = ie,
	Qd = ae,
	K9 = be,
	Y9 = ni,
	Pf = function (r, e) {
		(!e || typeof r != 'string') && Qd(r);
		var t = Y9(r);
		return K9(Qd(t !== void 0 ? W9(t, r) : r));
	},
	X9 = oe,
	Ms = ie,
	q9 = De,
	Fs = ae,
	Q9 = be,
	J9 = Pf,
	Z9 = sn,
	Ls = Be,
	e7 = Et,
	Qo = e7('flatMap', TypeError),
	t7 = Z9(function () {
		for (var r = this.iterator, e = this.mapper, t, n; ; ) {
			if ((n = this.inner))
				try {
					if (((t = Fs(Ms(n.next, n.iterator))), !t.done)) return t.value;
					this.inner = null;
				} catch (i) {
					Ls(r, 'throw', i);
				}
			if (((t = Fs(Ms(this.next, r))), (this.done = !!t.done))) return;
			try {
				this.inner = J9(e(t.value, this.counter++), !1);
			} catch (i) {
				Ls(r, 'throw', i);
			}
		}
	});
X9(
	{ target: 'Iterator', proto: !0, real: !0, forced: Qo },
	{
		flatMap: function (e) {
			Fs(this);
			try {
				q9(e);
			} catch (t) {
				Ls(this, 'throw', t);
			}
			return Qo ? Ms(Qo, this, e) : new t7(Q9(this), { mapper: e, inner: null });
		}
	}
);
var r7 = oe,
	n7 = ie,
	i7 = ln,
	a7 = De,
	o7 = ae,
	s7 = be,
	l7 = Be,
	c7 = Et,
	Jo = c7('forEach', TypeError);
r7(
	{ target: 'Iterator', proto: !0, real: !0, forced: Jo },
	{
		forEach: function (e) {
			o7(this);
			try {
				a7(e);
			} catch (i) {
				l7(this, 'throw', i);
			}
			if (Jo) return n7(Jo, this, e);
			var t = s7(this),
				n = 0;
			i7(
				t,
				function (i) {
					e(i, n++);
				},
				{ IS_RECORD: !0 }
			);
		}
	}
);
var d7 = oe,
	h7 = ie,
	u7 = Qn,
	f7 = rn,
	g7 = Wa.IteratorPrototype,
	p7 = sn,
	m7 = Pf,
	v7 = Pu,
	y7 = p7(function () {
		return h7(this.next, this.iterator);
	}, !0);
d7(
	{ target: 'Iterator', stat: !0, forced: v7 },
	{
		from: function (e) {
			var t = m7(typeof e == 'string' ? u7(e) : e, !0);
			return f7(g7, t.iterator) ? t.iterator : new y7(t);
		}
	}
);
var b7 = oe,
	Tf = ie,
	_7 = De,
	Of = ae,
	S7 = be,
	w7 = sn,
	I7 = xf,
	x7 = Be,
	C7 = Et,
	Zo = C7('map', TypeError),
	E7 = w7(function () {
		var r = this.iterator,
			e = Of(Tf(this.next, r)),
			t = (this.done = !!e.done);
		if (!t) return I7(r, this.mapper, [e.value, this.counter++], !0);
	});
b7(
	{ target: 'Iterator', proto: !0, real: !0, forced: Zo },
	{
		map: function (e) {
			Of(this);
			try {
				_7(e);
			} catch (t) {
				x7(this, 'throw', t);
			}
			return Zo ? Tf(Zo, this, e) : new E7(S7(this), { mapper: e });
		}
	}
);
var P7 = Ga,
	$f = Function.prototype,
	Jd = $f.apply,
	Zd = $f.call,
	T7 =
		(typeof Reflect == 'object' && Reflect.apply) ||
		(P7
			? Zd.bind(Jd)
			: function () {
					return Zd.apply(Jd, arguments);
				}),
	O7 = oe,
	$7 = ln,
	A7 = De,
	k7 = ae,
	R7 = be,
	D7 = Be,
	N7 = Et,
	M7 = T7,
	F7 = Ke,
	Af = TypeError,
	kf = F7(function () {
		[].keys().reduce(function () {}, void 0);
	}),
	es = !kf && N7('reduce', Af);
O7(
	{ target: 'Iterator', proto: !0, real: !0, forced: kf || es },
	{
		reduce: function (e) {
			k7(this);
			try {
				A7(e);
			} catch (o) {
				D7(this, 'throw', o);
			}
			var t = arguments.length < 2,
				n = t ? void 0 : arguments[1];
			if (es) return M7(es, this, t ? [e] : [e, n]);
			var i = R7(this),
				a = 0;
			if (
				($7(
					i,
					function (o) {
						t ? ((t = !1), (n = o)) : (n = e(n, o, a)), a++;
					},
					{ IS_RECORD: !0 }
				),
				t)
			)
				throw new Af('Reduce of empty iterator with no initial value');
			return n;
		}
	}
);
var L7 = oe,
	G7 = ie,
	B7 = ln,
	V7 = De,
	U7 = ae,
	j7 = be,
	z7 = Be,
	H7 = Et,
	ts = H7('some', TypeError);
L7(
	{ target: 'Iterator', proto: !0, real: !0, forced: ts },
	{
		some: function (e) {
			U7(this);
			try {
				V7(e);
			} catch (i) {
				z7(this, 'throw', i);
			}
			if (ts) return G7(ts, this, e);
			var t = j7(this),
				n = 0;
			return B7(
				t,
				function (i, a) {
					if (e(i, n++)) return a();
				},
				{ IS_RECORD: !0, INTERRUPTED: !0 }
			).stopped;
		}
	}
);
var W7 = oe,
	Rf = ie,
	Df = ae,
	K7 = be,
	Y7 = ja,
	X7 = za,
	q7 = sn,
	Nf = Be,
	Q7 = Et,
	rs = Q7('take', RangeError),
	J7 = q7(function () {
		var r = this.iterator;
		if (!this.remaining--) return (this.done = !0), Nf(r, 'normal', void 0);
		var e = Df(Rf(this.next, r)),
			t = (this.done = !!e.done);
		if (!t) return e.value;
	});
W7(
	{ target: 'Iterator', proto: !0, real: !0, forced: rs },
	{
		take: function (e) {
			Df(this);
			var t;
			try {
				t = X7(Y7(+e));
			} catch (n) {
				Nf(this, 'throw', n);
			}
			return rs ? Rf(rs, this, t) : new J7(K7(this), { remaining: t });
		}
	}
);
var Z7 = oe,
	e_ = ae,
	t_ = ln,
	r_ = be,
	n_ = [].push;
Z7(
	{ target: 'Iterator', proto: !0, real: !0 },
	{
		toArray: function () {
			var e = [];
			return t_(r_(e_(this)), n_, { that: e, IS_RECORD: !0 }), e;
		}
	}
);
var i_ = oe,
	a_ = ae,
	o_ = Ha,
	s_ = df,
	eh = be;
i_(
	{ target: 'Iterator', proto: !0, real: !0, forced: !0 },
	{
		toAsync: function () {
			return new s_(eh(new o_(eh(a_(this)))));
		}
	}
);
var l_ = ie,
	c_ = hf,
	d_ = function (r, e) {
		return [e, r];
	},
	Mf = function () {
		return l_(c_, this, d_);
	},
	h_ = oe,
	u_ = Mf;
h_(
	{ target: 'AsyncIterator', name: 'indexed', proto: !0, real: !0, forced: !0 },
	{ asIndexedPairs: u_ }
);
var f_ = oe,
	g_ = Mf;
f_({ target: 'AsyncIterator', proto: !0, real: !0, forced: !0 }, { indexed: g_ });
var p_ = ie,
	m_ = Wa.IteratorPrototype.map,
	v_ = function (r, e) {
		return [e, r];
	},
	Ff = function () {
		return p_(m_, this, v_);
	},
	y_ = oe,
	b_ = Ff;
y_(
	{ target: 'Iterator', name: 'indexed', proto: !0, real: !0, forced: !0 },
	{ asIndexedPairs: b_ }
);
var __ = oe,
	S_ = Ff;
__({ target: 'Iterator', proto: !0, real: !0, forced: !0 }, { indexed: S_ });
var Lf = {},
	th = De,
	w_ = TypeError,
	I_ = function (r) {
		var e, t;
		(this.promise = new r(function (n, i) {
			if (e !== void 0 || t !== void 0) throw new w_('Bad Promise constructor');
			(e = n), (t = i);
		})),
			(this.resolve = th(e)),
			(this.reject = th(t));
	};
Lf.f = function (r) {
	return new I_(r);
};
var x_ = oe,
	C_ = Lf;
x_(
	{ target: 'Promise', stat: !0 },
	{
		withResolvers: function () {
			var e = C_.f(this);
			return { promise: e.promise, resolve: e.resolve, reject: e.reject };
		}
	}
);
var E_ = $e,
	P_ = E_,
	Ka = {},
	T_ = Ge;
Ka.f = T_;
var rh = P_,
	O_ = rt,
	$_ = Ka,
	A_ = Ct.f,
	Gf = function (r) {
		var e = rh.Symbol || (rh.Symbol = {});
		O_(e, r) || A_(e, r, { value: $_.f(r) });
	},
	k_ = $e,
	R_ = Gf,
	D_ = Ct.f,
	N_ = Xn.f,
	ns = k_.Symbol;
R_('asyncDispose');
if (ns) {
	var Ci = N_(ns, 'asyncDispose');
	Ci.enumerable &&
		Ci.configurable &&
		Ci.writable &&
		D_(ns, 'asyncDispose', {
			value: Ci.value,
			enumerable: !1,
			configurable: !1,
			writable: !1
		});
}
var M_ = Ka;
M_.f('asyncDispose');
var F_ = $e,
	L_ = Gf,
	G_ = Ct.f,
	B_ = Xn.f,
	is = F_.Symbol;
L_('dispose');
if (is) {
	var Ei = B_(is, 'dispose');
	Ei.enumerable &&
		Ei.configurable &&
		Ei.writable &&
		G_(is, 'dispose', {
			value: Ei.value,
			enumerable: !1,
			configurable: !1,
			writable: !1
		});
}
var V_ = Ka;
V_.f('dispose');
var U_ = Je,
	j_ = Ke,
	Bf = Re,
	z_ = Cl,
	H_ = ut,
	W_ = Nu,
	Vf = function () {},
	Uf = H_('Reflect', 'construct'),
	Ol = /^\s*(?:class|function)\b/,
	K_ = U_(Ol.exec),
	Y_ = !Ol.test(Vf),
	_n = function (e) {
		if (!Bf(e)) return !1;
		try {
			return Uf(Vf, [], e), !0;
		} catch {
			return !1;
		}
	},
	jf = function (e) {
		if (!Bf(e)) return !1;
		switch (z_(e)) {
			case 'AsyncFunction':
			case 'GeneratorFunction':
			case 'AsyncGeneratorFunction':
				return !1;
		}
		try {
			return Y_ || !!K_(Ol, W_(e));
		} catch {
			return !0;
		}
	};
jf.sham = !0;
var zf =
		!Uf ||
		j_(function () {
			var r;
			return (
				_n(_n.call) ||
				!_n(Object) ||
				!_n(function () {
					r = !0;
				}) ||
				r
			);
		})
			? jf
			: _n,
	X_ = ie,
	q_ = Ha,
	Q_ = ae,
	J_ = Tl,
	Z_ = be,
	eS = xt,
	tS = Ge,
	rS = tS('asyncIterator'),
	nS = function (r, e) {
		var t = arguments.length < 2 ? eS(r, rS) : e;
		return t ? Q_(X_(t, r)) : new q_(Z_(J_(r)));
	},
	iS = $e,
	aS = function (r, e) {
		var t = iS[r],
			n = t && t.prototype;
		return n && n[e];
	},
	oS = If,
	Hf = Je,
	sS = Qn,
	lS = zf,
	cS = nS,
	dS = Tl,
	hS = be,
	uS = ni,
	fS = xt,
	gS = ut,
	pS = aS,
	mS = Ge,
	vS = Ha,
	yS = on.toArray,
	bS = mS('asyncIterator'),
	Wf = Hf(pS('Array', 'values')),
	_S = Hf(Wf([]).next),
	SS = function () {
		return new Kf(this);
	},
	Kf = function (r) {
		this.iterator = Wf(r);
	};
Kf.prototype.next = function () {
	return _S(this.iterator);
};
var Yf = function (e) {
		var t = this,
			n = arguments.length,
			i = n > 1 ? arguments[1] : void 0,
			a = n > 2 ? arguments[2] : void 0;
		return new (gS('Promise'))(function (o) {
			var s = sS(e);
			i !== void 0 && (i = oS(i, a));
			var l = fS(s, bS),
				c = l ? void 0 : uS(s) || SS,
				u = lS(t) ? new t() : [],
				f = l ? cS(s, l) : new vS(hS(dS(s, c)));
			o(yS(f, i, u));
		});
	},
	wS = oe,
	IS = Yf,
	xS = Ke,
	nh = Array.fromAsync,
	CS =
		!nh ||
		xS(function () {
			var r = 0;
			return (
				nh.call(
					function () {
						return r++, [];
					},
					{ length: 0 }
				),
				r !== 1
			);
		});
wS({ target: 'Array', stat: !0, forced: CS }, { fromAsync: IS });
var ES = zf,
	PS = qn,
	TS = TypeError,
	OS = function (r) {
		if (ES(r)) return r;
		throw new TS(PS(r) + ' is not a constructor');
	},
	$S = typeof ArrayBuffer < 'u' && typeof DataView < 'u',
	AS = Je,
	kS = De,
	RS = function (r, e, t) {
		try {
			return AS(kS(Object.getOwnPropertyDescriptor(r, e)[t]));
		} catch {}
	},
	DS = Ye,
	NS = function (r) {
		return DS(r) || r === null;
	},
	MS = NS,
	FS = String,
	LS = TypeError,
	GS = function (r) {
		if (MS(r)) return r;
		throw new LS("Can't set " + FS(r) + ' as a prototype');
	},
	BS = RS,
	VS = Ye,
	US = fl,
	jS = GS,
	zS =
		Object.setPrototypeOf ||
		('__proto__' in {}
			? (function () {
					var r = !1,
						e = {},
						t;
					try {
						(t = BS(Object.prototype, '__proto__', 'set')),
							t(e, []),
							(r = e instanceof Array);
					} catch {}
					return function (i, a) {
						return US(i), jS(a), VS(i) && (r ? t(i, a) : (i.__proto__ = a)), i;
					};
				})()
			: void 0),
	HS = $S,
	Xf = ht,
	ze = $e,
	qf = Re,
	WS = Ye,
	Qf = rt,
	KS = Cl,
	YS = qn,
	XS = nn,
	ih = Zn,
	qS = ff,
	QS = rn,
	$l = ti,
	cn = zS,
	JS = Ge,
	ZS = pl,
	Jf = Jn,
	Zf = Jf.enforce;
Jf.get;
var Ui = ze.Int8Array,
	ah = Ui && Ui.prototype,
	oh = ze.Uint8ClampedArray,
	sh = oh && oh.prototype,
	kt = Ui && $l(Ui),
	Kt = ah && $l(ah),
	ew = Object.prototype,
	e0 = ze.TypeError,
	lh = JS('toStringTag'),
	ch = ZS('TYPED_ARRAY_TAG'),
	t0 = 'TypedArrayConstructor',
	yr = HS && !!cn && KS(ze.opera) !== 'Opera',
	je,
	Yt,
	Br,
	Kr = {
		Int8Array: 1,
		Uint8Array: 1,
		Uint8ClampedArray: 1,
		Int16Array: 2,
		Uint16Array: 2,
		Int32Array: 4,
		Uint32Array: 4,
		Float32Array: 4,
		Float64Array: 8
	},
	tw = { BigInt64Array: 8, BigUint64Array: 8 },
	rw = function (r) {
		if (qf(r) && (!cn || QS(kt, r))) return r;
		throw new e0(YS(r) + ' is not a typed array constructor');
	},
	nw = function (r, e, t) {
		var n, i;
		if (Xf) {
			if (cn) {
				if (t) {
					for (n in Kr)
						if (((i = ze[n]), i && Qf(i, r)))
							try {
								delete i[r];
							} catch {}
				}
				if (!kt[r] || t)
					try {
						return ih(kt, r, t ? e : (yr && kt[r]) || e);
					} catch {}
				else return;
			}
			for (n in Kr) (i = ze[n]), i && (!i[r] || t) && ih(i, r, e);
		}
	};
for (je in Kr)
	(Yt = ze[je]), (Br = Yt && Yt.prototype), Br ? (Zf(Br)[t0] = Yt) : (yr = !1);
for (je in tw) (Yt = ze[je]), (Br = Yt && Yt.prototype), Br && (Zf(Br)[t0] = Yt);
if (
	(!yr || !qf(kt) || kt === Function.prototype) &&
	((kt = function () {
		throw new e0('Incorrect invocation');
	}),
	yr)
)
	for (je in Kr) ze[je] && cn(ze[je], kt);
if ((!yr || !Kt || Kt === ew) && ((Kt = kt.prototype), yr))
	for (je in Kr) ze[je] && cn(ze[je].prototype, Kt);
yr && $l(sh) !== Kt && cn(sh, Kt);
if (Xf && !Qf(Kt, lh)) {
	qS(Kt, lh, {
		configurable: !0,
		get: function () {
			return WS(this) ? this[ch] : void 0;
		}
	});
	for (je in Kr) ze[je] && XS(ze[je], ch, je);
}
var iw = { aTypedArrayConstructor: rw, exportTypedArrayStaticMethod: nw },
	aw = _l,
	ow = function (r, e, t) {
		for (var n = 0, i = arguments.length > 2 ? t : aw(e), a = new r(i); i > n; )
			a[n] = e[n++];
		return a;
	},
	sw = ut,
	lw = OS,
	cw = Yf,
	r0 = iw,
	dw = ow,
	hw = r0.aTypedArrayConstructor,
	uw = r0.exportTypedArrayStaticMethod;
uw(
	'fromAsync',
	function (e) {
		var t = this,
			n = arguments.length,
			i = n > 1 ? arguments[1] : void 0,
			a = n > 2 ? arguments[2] : void 0;
		return new (sw('Promise'))(function (o) {
			lw(t), o(cw(e, i, a));
		}).then(function (o) {
			return dw(hw(t), o);
		});
	},
	!0
);
const n0 = {
	null: 'b',
	object: 'c',
	array: 'd',
	number: 'e',
	string: 'f',
	boolean: 'g'
};
new Map(
	Object.entries(n0)
		.sort((r, e) => (r[1] < e[1] ? -1 : 1))
		.map(([r], e) => [r, e])
);
Object.fromEntries(Object.entries(n0).map(([r, e]) => [e, r]));
function dh(r) {
	return {
		type: 'string',
		config: {
			enum: r == null ? void 0 : r.enum,
			nullable: r == null ? void 0 : r.nullable,
			default: r == null ? void 0 : r.default
		}
	};
}
function fw(r) {
	return {
		type: 'number',
		config: {
			nullable: r == null ? void 0 : r.nullable,
			default: r == null ? void 0 : r.default
		}
	};
}
function gw(r) {
	return {
		type: 'boolean',
		config: {
			nullable: r == null ? void 0 : r.nullable,
			default: r == null ? void 0 : r.default
		}
	};
}
function pw(r) {
	return {
		type: 'date',
		config: {
			nullable: r == null ? void 0 : r.nullable,
			default: r == null ? void 0 : r.default
		}
	};
}
function hh(r, e) {
	return {
		type: 'record',
		config: { nullable: e == null ? void 0 : e.nullable },
		properties: r
	};
}
function mw(r, e) {
	return {
		type: 'set',
		items: r,
		config: {
			nullable: e == null ? void 0 : e.nullable,
			default: e == null ? void 0 : e.default
		}
	};
}
function vw(r) {
	return {
		type: 'json',
		config: {
			nullable: r == null ? void 0 : r.nullable,
			default: r == null ? void 0 : r.default
		}
	};
}
const Ue = class Ue {
	static Schema(e) {
		return hh(e);
	}
	static get Default() {
		return {
			Set: { empty: () => ({ func: 'Set.empty', args: null }) },
			uuid: (e) => ({ func: 'uuid', args: e ? [e] : null }),
			now: () => ({ func: 'now', args: null })
		};
	}
	static Optional(e) {
		return {
			...e,
			config: e.config ? { ...e.config, optional: !0 } : { optional: !0 }
		};
	}
	static Collections(e) {
		return e;
	}
	static Filter(e) {
		return e;
	}
};
xe(Ue, 'Id', () => dh({ nullable: !1, default: Ue.Default.uuid() })),
	xe(Ue, 'String', dh),
	xe(Ue, 'Number', fw),
	xe(Ue, 'Boolean', gw),
	xe(Ue, 'Date', pw),
	xe(Ue, 'Record', hh),
	xe(Ue, 'Set', mw),
	xe(Ue, 'Json', vw),
	xe(Ue, 'RelationMany', (e, t) => ({
		query: { collectionName: e, ...t },
		cardinality: 'many'
	})),
	xe(Ue, 'RelationOne', (e, t) => ({
		query: { collectionName: e, ...t },
		cardinality: 'one'
	})),
	xe(Ue, 'RelationById', (e, t) => ({
		query: { collectionName: e, where: [['id', '=', t]] },
		cardinality: 'one'
	}));
let _ = Ue;
const i0 = Object.freeze(['string', 'number', 'boolean', 'date']),
	yw = new Set(i0),
	bw = Object.freeze(['string', 'number', 'boolean', 'date', 'set', 'json']),
	_w = new Set(bw),
	a0 = Object.freeze([...i0, 'set', 'json', 'record']);
new Set(a0);
const Sw = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
let uh = (r = 21) => {
	let e = '',
		t = crypto.getRandomValues(new Uint8Array((r |= 0)));
	for (; r--; ) e += Sw[t[r] & 63];
	return e;
};
const dn = ['isDefined'],
	Ya = ['=', '!=', '<', '>', '<=', '>='],
	o0 = ['has', '!has'],
	s0 = ['in', 'nin'],
	l0 = 'SET_',
	c0 = [...dn, ...Ya],
	ww = [...dn, ...Ya],
	d0 = [...dn, ...Ya, ...s0],
	h0 = [...dn],
	Iw = f0([...dn, ...o0], l0),
	u0 = [...dn, ...Ya, ...s0, 'like', 'nlike'],
	xw = Array.from(new Set([...c0, ...d0, ...u0, ...h0, ...o0])),
	dr = { boolean: c0, date: ww, json: xw, number: d0, record: h0, set: Iw, string: u0 };
function f0(r, e) {
	return r.map((t) => `${e}${t}`);
}
var ji;
(function (r) {
	function e(h) {
		switch (h.type) {
			case 'record':
				const d = {};
				for (const m in h.properties) d[m] = r.struct(h.properties[m]);
				return d;
			default:
				return;
		}
	}
	r.struct = e;
	function t(h) {
		if (Cw(h)) return Ew(h.config);
		if (h.type === 'record') {
			const d = {};
			for (const m in h.properties) d[m] = r.defaultValue(h.properties[m]);
			return d;
		}
	}
	r.defaultValue = t;
	function n(h, d, m) {
		switch (h.type) {
			case 'record':
				for (const y in h.properties) {
					const v = h.properties[y];
					if (hr(v) && $t(m[y])) {
						d[y] = m[y];
						continue;
					}
					d[y] = r.assign(v, d[y], m[y]);
				}
				return d;
			default:
				return m === void 0 ? r.defaultValue(h) : m;
		}
	}
	r.assign = n;
	function i(h, d) {
		var m, y;
		if (!(hr(h) && $t(d))) {
			switch (h.type) {
				case 'boolean':
					if (typeof d == 'boolean') return d;
					throw new jt('boolean', d);
				case 'date':
					if (d instanceof Date && !isNaN(d.getTime())) return d.toISOString();
					if (typeof d == 'string' && !Number.isNaN(Date.parse(d)))
						return new Date(d).toISOString();
					if (typeof d == 'number' && !Number.isNaN(d))
						return new Date(d).toISOString();
					throw new jt('date', d);
				case 'json':
					if (!$t(d)) return d;
					throw new jt('json', d);
				case 'number':
					if (typeof d == 'number') return d;
					throw new jt('number', d);
				case 'record':
					if (typeof d == 'object' && d !== null) {
						for (const v in d) {
							const S = h.properties[v];
							if (!S) throw new jt('record', d, `Unrecognized property: ${v}`);
							(hr(S) && $t(d[v])) || (d[v] = r.encode(S, d[v]));
						}
						return d;
					}
					throw new jt('record', d);
				case 'string':
					if (typeof d == 'string')
						if ((m = h.config) != null && m.enum) {
							if ((y = h.config) != null && y.enum.includes(d)) return d;
						} else return d;
					throw new jt('string', d);
				case 'set':
					if (Array.isArray(d))
						return Object.fromEntries(
							d.map((v) => [r.collectionKeyEncode(h.items, v), !0])
						);
					if (d instanceof Set)
						return Object.fromEntries(
							Array.from(d).map((v) => [r.collectionKeyEncode(h.items, v), !0])
						);
					if (typeof d == 'object' && d !== null) return d;
					throw new jt(`set<${h.items.type}>`, d);
			}
			throw new Pi(h.type, 'Failed to encode value');
		}
	}
	r.encode = i;
	function a(h, d, m) {
		switch (h.type) {
			case 'boolean':
				return typeof d == 'boolean'
					? { valid: !0 }
					: { valid: !1, error: Mr('boolean', d) };
			case 'date':
				return typeof d == 'string'
					? { valid: !0 }
					: { valid: !1, error: Mr('date', d) };
			case 'json':
				return typeof d < 'u' ? { valid: !0 } : { valid: !1, error: Mr('json', d) };
			case 'number':
				return typeof d == 'number'
					? { valid: !0 }
					: { valid: !1, error: Mr('number', d) };
			case 'record':
				for (const y in h.properties) {
					const v = h.properties[y];
					if ((hr(v) && $t(d[y])) || (m.partial && !(y in d))) continue;
					const S = r.validateEncoded(v, d[y], m);
					if (!S.valid) return S;
				}
				return { valid: !0 };
			case 'string':
				return typeof d == 'string'
					? { valid: !0 }
					: { valid: !1, error: Mr('string', d) };
			case 'set':
				return typeof d == 'object' && d !== null
					? { valid: !0 }
					: { valid: !1, error: Mr(`set<${h.items.type}>`, d) };
		}
		throw new Pi(h.type, 'Failed to validate value');
	}
	r.validateEncoded = a;
	function o(h, d) {
		switch (h.type) {
			case 'boolean':
				if (typeof d == 'boolean') return d;
				throw new Sn('boolean', d);
			case 'date':
				if (typeof d == 'string') return new Date(d);
				throw new Sn('date', d);
			case 'json':
				return d;
			case 'number':
				if (typeof d == 'number') return d;
				throw new Sn('number', d);
			case 'record':
				const m = {};
				for (const y in d) {
					const v = h.properties[y];
					if (v) {
						if (hr(v) && $t(d[y])) {
							d[y] === null && (m[y] = null);
							continue;
						}
						m[y] = r.decode(v, d[y]);
					}
				}
				return m;
			case 'string':
				if (typeof d == 'string') return d;
				throw new Sn('string', d);
			case 'set':
				if (typeof d == 'object')
					return new Set(
						Object.entries(d)
							.filter(([y, v]) => v)
							.map(([y, v]) => r.collectionKeyDecode(h.items, y))
					);
				throw new Sn(`set<${h.items.type}>`, d);
		}
		throw new Pi(h.type, 'Failed to decode value');
	}
	r.decode = o;
	function s(h, d) {
		if (!fh(h)) throw new Qe('Cannot encode collection key for non-primitive type');
		return r.encode(h, d).toString();
	}
	r.collectionKeyEncode = s;
	function l(h, d) {
		if (!fh(h)) throw new Qe('Cannot decode collection key for non-primitive type');
		return h.type === 'number'
			? Number(d)
			: h.type === 'boolean'
				? d === 'true'
				: r.decode(h, d);
	}
	r.collectionKeyDecode = l;
	function c(h, d) {
		return h.type === 'boolean' && d.type === 'boolean'
			? Tw(h, d)
			: h.type === 'date' && d.type === 'date'
				? Ow(h, d)
				: h.type === 'number' && d.type === 'number'
					? $w(h, d)
					: h.type === 'record' && d.type === 'record'
						? Pw(h, d)
						: h.type === 'set' && d.type === 'set'
							? Aw(h, d)
							: h.type === 'string' && d.type === 'string'
								? kw(h, d)
								: !1;
	}
	r.equal = c;
	function u(h, d, m) {
		if (h.type === 'date') {
			if (m === 'encoded') return d;
			if (m === 'decoded') return r.encode(h, d);
			throw new Qe('Invalid data format: ' + m);
		}
		if (h.type === 'record') {
			const y = {};
			for (const v in d) {
				const S = h.properties[v];
				if (!S) throw new Mw('record', d, `Unrecognized property: ${v}`);
				(hr(S) && $t(d[v])) || (y[v] = r.serialize(S, d[v], m));
			}
			return y;
		}
		if (h.type === 'set') {
			if (m === 'encoded')
				return Object.entries(d)
					.filter(([y, v]) => v)
					.map(([y, v]) => r.serialize(h.items, r.collectionKeyDecode(h.items, y), m));
			if (m === 'decoded') {
				const y = [];
				for (const v of d) y.push(r.serialize(h.items, v, m));
				return y;
			}
			throw new Qe('Invalid data format: ' + m);
		}
		return d;
	}
	r.serialize = u;
	function f(h, d, m) {
		if (h.type === 'date') {
			if (m === 'encoded') return d;
			if (m === 'decoded') return r.decode(h, d);
			throw new Qe('Invalid data format: ' + m);
		}
		if (h.type === 'record') {
			for (const y in d) {
				const v = h.properties[y];
				if (!v) throw new Fw('record', d, `Unrecognized property: ${y}`);
				(hr(v) && $t(d[y])) || (d[y] = r.deserialize(v, d[y], m));
			}
			return d;
		}
		if (h.type === 'set') {
			if (m === 'encoded') {
				const y = {};
				for (const v of d) y[r.collectionKeyEncode(h.items, v)] = !0;
				return y;
			}
			if (m === 'decoded') {
				const y = [];
				for (const v of d) y.push(r.deserialize(h.items, v, m));
				return new Set(y);
			}
			throw new Qe('Invalid data format: ' + m);
		}
		return d;
	}
	r.deserialize = f;
	function g(h) {
		if (h.type === 'boolean') return dr.boolean;
		if (h.type === 'date') return dr.date;
		if (h.type === 'json') return dr.json;
		if (h.type === 'number') return dr.number;
		if (h.type === 'record') return dr.record;
		if (h.type === 'set') return [...dr.set, ...f0(r.supportedOperations(h.items), l0)];
		if (h.type === 'string') return dr.string;
		throw new Pi(h.type, 'Failed to get supported operations');
	}
	r.supportedOperations = g;
})(ji || (ji = {}));
function Cw(r) {
	return _w.has(r.type);
}
function fh(r) {
	return yw.has(r.type);
}
function Ew(r) {
	let e = r.default;
	if (!$t(e)) {
		if (typeof e != 'object' || e === null) return e;
		{
			const { args: t, func: n } = e;
			if (n === void 0) return e;
			if (n === 'uuid') return t && typeof t[0] == 'number' ? uh(t[0]) : uh();
			if (n === 'now') return new Date().toISOString();
			if (n === 'Set.empty') return {};
		}
	}
}
function $t(r) {
	return r == null;
}
function hr(r) {
	var e, t;
	return (
		((e = r.config) == null ? void 0 : e.optional) === !0 ||
		((t = r.config) == null ? void 0 : t.nullable) === !0
	);
}
function Mr(r, e) {
	return `Encoded value ${e} is not valid for type ${r}`;
}
function Pw(r, e) {
	return !!Rw(r.properties, e.properties);
}
function Tw(r, e) {
	return ii(r.config, e.config);
}
function Ow(r, e) {
	return ii(r.config, e.config);
}
function $w(r, e) {
	return ii(r.config, e.config);
}
function Aw(r, e) {
	return !(!ii(r.config, e.config) || !ji.equal(r.items, e.items));
}
function kw(r, e) {
	var t, n, i, a, o, s;
	if (
		((t = r.config) != null && t.enum && !((n = e.config) != null && n.enum)) ||
		(!((i = r.config) != null && i.enum) && (a = e.config) != null && a.enum)
	)
		return !1;
	if ((o = r.config) != null && o.enum && (s = e.config) != null && s.enum) {
		if (r.config.enum.length !== e.config.enum.length) return !1;
		for (const l of r.config.enum) if (!e.config.enum.includes(l)) return !1;
	}
	return ii(r.config, e.config);
}
function Rw(r, e) {
	const t = Object.keys(r),
		n = Object.keys(e);
	if (t.length !== n.length) return !1;
	for (const i of t) if (!e[i] || !ji.equal(r[i], e[i])) return !1;
	return !0;
}
function ii(r, e) {
	return !(
		!!(r != null && r.optional) != !!(e != null && e.optional) ||
		!!(r != null && r.nullable) != !!(e != null && e.nullable) ||
		!Dw(r == null ? void 0 : r.default, e == null ? void 0 : e.default)
	);
}
function Dw(r, e) {
	return typeof r != typeof e ? !1 : gh(r) && gh(e) ? Nw(r, e) : r === e;
}
function gh(r) {
	return typeof r == 'object' && r !== null && 'func' in r;
}
function Nw(r, e) {
	var t, n;
	if (
		r.func !== e.func ||
		((t = r.args) == null ? void 0 : t.length) !==
			((n = e.args) == null ? void 0 : n.length)
	)
		return !1;
	if (r.args && e.args) {
		for (let i = 0; i < r.args.length; i++) if (r.args[i] !== e.args[i]) return !1;
	}
	return !0;
}
const hn = { 'Bad Request': 400, 'Internal Server Error': 500 };
class Qe extends Error {
	constructor(t, ...n) {
		super(...n);
		xe(this, 'status', hn['Internal Server Error']);
		xe(this, 'baseMessage');
		xe(this, 'contextMessage');
		xe(this, '__isTriplitError', !0);
		(this.name = 'TriplitError'),
			(this.baseMessage = n[0] || 'Triplit Error'),
			(this.contextMessage = t);
	}
	get message() {
		return this.contextMessage
			? `${this.baseMessage} | Context: ${this.contextMessage}`
			: this.baseMessage;
	}
	toString() {
		return JSON.stringify(this.toJSON());
	}
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			baseMessage: this.baseMessage,
			status: this.status,
			contextMessage: this.contextMessage
		};
	}
	static fromJson(t) {
		const n = new Qe(t.contextMessage);
		return (
			t.baseMessage && (n.baseMessage = t.baseMessage),
			t.name && (n.name = t.name),
			t.status && (n.status = t.status),
			n
		);
	}
}
class jt extends Qe {
	constructor(e, t, ...n) {
		super(...n),
			(this.name = 'DBSerializationError'),
			(this.baseMessage = `There was an error serializing an input to an acceptable format. Could not transform the data: ${t} as type: ${e}`),
			(this.status = hn['Bad Request']);
	}
}
class Sn extends Qe {
	constructor(e, t, ...n) {
		super(...n),
			(this.name = 'DBDeserializationError'),
			(this.baseMessage = `There was an error deserializing an database value to JS. Could not tranform the data: ${t} as type: ${e}`),
			(this.status = hn['Bad Request']);
	}
}
class Mw extends Qe {
	constructor(e, t, ...n) {
		super(...n),
			(this.name = 'JSONSerializationError'),
			(this.baseMessage = `There was an error serializing an input to JSON. Could not tranform the data: ${e} as type: ${t}`),
			(this.status = hn['Bad Request']);
	}
}
class Fw extends Qe {
	constructor(e, t, ...n) {
		super(...n),
			(this.name = 'JSONDeserializationError'),
			(this.baseMessage = `There was an error deserializing a JSON value. Could not tranform the data: ${e} as type: ${t}`),
			(this.status = hn['Bad Request']);
	}
}
class Pi extends Qe {
	constructor(e, ...t) {
		super(...t),
			(this.name = 'UnrecognizedAttributeTypeError'),
			(this.baseMessage = `An attribute in the schema contains an unsupported type: ${e}. Valid types are ${[a0]}`),
			(this.status = hn['Bad Request']);
	}
}
const Lw = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
Object.fromEntries(Lw.map((r, e) => [r, e]));
function G(r) {
	return { mod: 'or', filters: r };
}
function nt(r, e = 2166136261) {
	let t = e;
	for (let n = 0; n < r.length; n++)
		(t ^= r.charCodeAt(n)), (t = Math.imul(t, 16777619));
	return t >>> 0;
}
nt('C');
nt('B');
nt('S');
nt('G');
nt('Q');
nt('F');
nt('O');
nt('o');
nt('P');
nt('I');
nt('A');
nt('L');
var bt = {},
	Gw =
		(Wt && Wt.__extends) ||
		(function () {
			var r = function (e, t) {
				return (
					(r =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (n, i) {
								n.__proto__ = i;
							}) ||
						function (n, i) {
							for (var a in i)
								Object.prototype.hasOwnProperty.call(i, a) && (n[a] = i[a]);
						}),
					r(e, t)
				);
			};
			return function (e, t) {
				if (typeof t != 'function' && t !== null)
					throw new TypeError(
						'Class extends value ' + String(t) + ' is not a constructor or null'
					);
				r(e, t);
				function n() {
					this.constructor = e;
				}
				e.prototype =
					t === null ? Object.create(t) : ((n.prototype = t.prototype), new n());
			};
		})();
Object.defineProperty(bt, '__esModule', { value: !0 });
bt.EmptyBTree = bt.asSet = bt.simpleComparator = bt.defaultComparator = void 0;
function g0(r, e) {
	if (Number.isFinite(r) && Number.isFinite(e)) return r - e;
	var t = typeof r,
		n = typeof e;
	if (t !== n) return t < n ? -1 : 1;
	if (t === 'object') {
		if (r === null) return e === null ? 0 : -1;
		if (e === null) return 1;
		if (((r = r.valueOf()), (e = e.valueOf()), (t = typeof r), (n = typeof e), t !== n))
			return t < n ? -1 : 1;
	}
	return r < e
		? -1
		: r > e
			? 1
			: r === e
				? 0
				: Number.isNaN(r)
					? Number.isNaN(e)
						? 0
						: -1
					: Number.isNaN(e)
						? 1
						: Array.isArray(r)
							? 0
							: Number.NaN;
}
bt.defaultComparator = g0;
function Bw(r, e) {
	return r > e ? 1 : r < e ? -1 : 0;
}
bt.simpleComparator = Bw;
var St = (function () {
		function r(e, t, n) {
			(this._root = os),
				(this._size = 0),
				(this._maxNodeSize = n >= 4 ? Math.min(n, 256) : 32),
				(this._compare = t || g0),
				e && this.setPairs(e);
		}
		return (
			Object.defineProperty(r.prototype, 'size', {
				get: function () {
					return this._size;
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(r.prototype, 'length', {
				get: function () {
					return this._size;
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(r.prototype, 'isEmpty', {
				get: function () {
					return this._size === 0;
				},
				enumerable: !1,
				configurable: !0
			}),
			(r.prototype.clear = function () {
				(this._root = os), (this._size = 0);
			}),
			(r.prototype.forEach = function (e, t) {
				var n = this;
				return (
					t !== void 0 && (e = e.bind(t)),
					this.forEachPair(function (i, a) {
						return e(a, i, n);
					})
				);
			}),
			(r.prototype.forEachPair = function (e, t) {
				var n = this.minKey(),
					i = this.maxKey();
				return this.forRange(n, i, !0, e, t);
			}),
			(r.prototype.get = function (e, t) {
				return this._root.get(e, t, this);
			}),
			(r.prototype.set = function (e, t, n) {
				this._root.isShared && (this._root = this._root.clone());
				var i = this._root.set(e, t, n, this);
				return i === !0 || i === !1 ? i : ((this._root = new Uw([this._root, i])), !0);
			}),
			(r.prototype.has = function (e) {
				return this.forRange(e, e, !0, void 0) !== 0;
			}),
			(r.prototype.delete = function (e) {
				return this.editRange(e, e, !0, ph) !== 0;
			}),
			(r.prototype.with = function (e, t, n) {
				var i = this.clone();
				return i.set(e, t, n) || n ? i : this;
			}),
			(r.prototype.withPairs = function (e, t) {
				var n = this.clone();
				return n.setPairs(e, t) !== 0 || t ? n : this;
			}),
			(r.prototype.withKeys = function (e, t) {
				for (var n = this.clone(), i = !1, a = 0; a < e.length; a++)
					i = n.set(e[a], void 0, !1) || i;
				return t && !i ? this : n;
			}),
			(r.prototype.without = function (e, t) {
				return this.withoutRange(e, e, !0, t);
			}),
			(r.prototype.withoutKeys = function (e, t) {
				var n = this.clone();
				return n.deleteKeys(e) || !t ? n : this;
			}),
			(r.prototype.withoutRange = function (e, t, n, i) {
				var a = this.clone();
				return a.deleteRange(e, t, n) === 0 && i ? this : a;
			}),
			(r.prototype.filter = function (e, t) {
				var n = this.greedyClone(),
					i;
				return (
					n.editAll(function (a, o, s) {
						if (!e(a, o, s)) return (i = m0);
					}),
					!i && t ? this : n
				);
			}),
			(r.prototype.mapValues = function (e) {
				var t = {},
					n = this.greedyClone();
				return (
					n.editAll(function (i, a, o) {
						return (t.value = e(a, i, o)), t;
					}),
					n
				);
			}),
			(r.prototype.reduce = function (e, t) {
				for (
					var n = 0, i = t, a = this.entries(this.minKey(), wn), o;
					!(o = a.next()).done;

				)
					i = e(i, o.value, n++, this);
				return i;
			}),
			(r.prototype.entries = function (e, t) {
				var n = this.findPath(e);
				if (n === void 0) return Fr();
				var i = n.nodequeue,
					a = n.nodeindex,
					o = n.leaf,
					s = t !== void 0 ? 1 : 0,
					l = e === void 0 ? -1 : o.indexOf(e, 0, this._compare) - 1;
				return Fr(function () {
					e: for (;;)
						switch (s) {
							case 0:
								if (++l < o.keys.length)
									return { done: !1, value: [o.keys[l], o.values[l]] };
								s = 2;
								continue;
							case 1:
								if (++l < o.keys.length)
									return (
										(t[0] = o.keys[l]), (t[1] = o.values[l]), { done: !1, value: t }
									);
								s = 2;
							case 2:
								for (var c = -1; ; ) {
									if (++c >= i.length) {
										s = 3;
										continue e;
									}
									if (++a[c] < i[c].length) break;
								}
								for (; c > 0; c--) (i[c - 1] = i[c][a[c]].children), (a[c - 1] = 0);
								(o = i[0][a[0]]), (l = -1), (s = t !== void 0 ? 1 : 0);
								continue;
							case 3:
								return { done: !0, value: void 0 };
						}
				});
			}),
			(r.prototype.entriesReversed = function (e, t, n) {
				if (e === void 0 && ((e = this.maxKey()), (n = void 0), e === void 0))
					return Fr();
				var i = this.findPath(e) || this.findPath(this.maxKey()),
					a = i.nodequeue,
					o = i.nodeindex,
					s = i.leaf;
				qe(!a[0] || s === a[0][o[0]], 'wat!');
				var l = s.indexOf(e, 0, this._compare);
				!n && l < s.keys.length && this._compare(s.keys[l], e) <= 0 && l++;
				var c = t !== void 0 ? 1 : 0;
				return Fr(function () {
					e: for (;;)
						switch (c) {
							case 0:
								if (--l >= 0) return { done: !1, value: [s.keys[l], s.values[l]] };
								c = 2;
								continue;
							case 1:
								if (--l >= 0)
									return (
										(t[0] = s.keys[l]), (t[1] = s.values[l]), { done: !1, value: t }
									);
								c = 2;
							case 2:
								for (var u = -1; ; ) {
									if (++u >= a.length) {
										c = 3;
										continue e;
									}
									if (--o[u] >= 0) break;
								}
								for (; u > 0; u--)
									(a[u - 1] = a[u][o[u]].children), (o[u - 1] = a[u - 1].length - 1);
								(s = a[0][o[0]]), (l = s.keys.length), (c = t !== void 0 ? 1 : 0);
								continue;
							case 3:
								return { done: !0, value: void 0 };
						}
				});
			}),
			(r.prototype.findPath = function (e) {
				var t = this._root,
					n,
					i;
				if (t.isLeaf) (n = mh), (i = mh);
				else {
					(n = []), (i = []);
					for (var a = 0; !t.isLeaf; a++) {
						if (
							((n[a] = t.children),
							(i[a] = e === void 0 ? 0 : t.indexOf(e, 0, this._compare)),
							i[a] >= n[a].length)
						)
							return;
						t = n[a][i[a]];
					}
					n.reverse(), i.reverse();
				}
				return { nodequeue: n, nodeindex: i, leaf: t };
			}),
			(r.prototype.diffAgainst = function (e, t, n, i) {
				if (e._compare !== this._compare)
					throw new Error('Tree comparators are not the same.');
				if (this.isEmpty || e.isEmpty)
					return this.isEmpty && e.isEmpty
						? void 0
						: this.isEmpty
							? n === void 0
								? void 0
								: r.stepToEnd(r.makeDiffCursor(e), n)
							: t === void 0
								? void 0
								: r.stepToEnd(r.makeDiffCursor(this), t);
				for (
					var a = this._compare,
						o = r.makeDiffCursor(this),
						s = r.makeDiffCursor(e),
						l = !0,
						c = !0,
						u = r.compare(o, s, a);
					l && c;

				) {
					var f = r.compare(o, s, a),
						g = o.leaf,
						h = o.internalSpine,
						d = o.levelIndices,
						m = s.leaf,
						y = s.internalSpine,
						v = s.levelIndices;
					if (g || m) {
						if (u !== 0) {
							if (f === 0) {
								if (g && m && i) {
									var S = g.values[d[d.length - 1]],
										p = m.values[v[v.length - 1]];
									if (!Object.is(S, p)) {
										var b = i(o.currentKey, S, p);
										if (b && b.break) return b.break;
									}
								}
							} else if (f > 0) {
								if (m && n) {
									var x = m.values[v[v.length - 1]],
										b = n(s.currentKey, x);
									if (b && b.break) return b.break;
								}
							} else if (t && g && u !== 0) {
								var S = g.values[d[d.length - 1]],
									b = t(o.currentKey, S);
								if (b && b.break) return b.break;
							}
						}
					} else if (!g && !m && f === 0) {
						var C = h.length - 1,
							O = y.length - 1,
							I = h[C][d[C]],
							T = y[O][v[O]];
						if (T === I) {
							(u = 0), (l = r.step(o, !0)), (c = r.step(s, !0));
							continue;
						}
					}
					(u = f), f < 0 ? (l = r.step(o)) : (c = r.step(s));
				}
				if (l && t) return r.finishCursorWalk(o, s, a, t);
				if (c && n) return r.finishCursorWalk(s, o, a, n);
			}),
			(r.finishCursorWalk = function (e, t, n, i) {
				var a = r.compare(e, t, n);
				if (a === 0) {
					if (!r.step(e)) return;
				} else a < 0 && qe(!1, 'cursor walk terminated early');
				return r.stepToEnd(e, i);
			}),
			(r.stepToEnd = function (e, t) {
				for (var n = !0; n; ) {
					var i = e.leaf,
						a = e.levelIndices,
						o = e.currentKey;
					if (i) {
						var s = i.values[a[a.length - 1]],
							l = t(o, s);
						if (l && l.break) return l.break;
					}
					n = r.step(e);
				}
			}),
			(r.makeDiffCursor = function (e) {
				var t = e._root,
					n = e.height;
				return {
					height: n,
					internalSpine: [[t]],
					levelIndices: [0],
					leaf: void 0,
					currentKey: t.maxKey()
				};
			}),
			(r.step = function (e, t) {
				var n = e.internalSpine,
					i = e.levelIndices,
					a = e.leaf;
				if (t === !0 || a) {
					var o = i.length;
					if (t === !0 || i[o - 1] === 0) {
						var s = n.length;
						if (s === 0) return !1;
						for (var l = s - 1, c = l; c >= 0; ) {
							if (i[c] > 0)
								return (
									c < o - 1 && ((e.leaf = void 0), i.pop()),
									c < l && (e.internalSpine = n.slice(0, c + 1)),
									(e.currentKey = n[c][--i[c]].maxKey()),
									!0
								);
							c--;
						}
						return !1;
					} else {
						var u = --i[o - 1];
						return (e.currentKey = a.keys[u]), !0;
					}
				} else {
					var f = n.length,
						g = f - 1,
						h = n[g][i[g]];
					if (h.isLeaf) {
						e.leaf = h;
						var u = (i[f] = h.values.length - 1);
						e.currentKey = h.keys[u];
					} else {
						var d = h.children;
						n[f] = d;
						var m = d.length - 1;
						(i[f] = m), (e.currentKey = d[m].maxKey());
					}
					return !0;
				}
			}),
			(r.compare = function (e, t, n) {
				var i = e.height,
					a = e.currentKey,
					o = e.levelIndices,
					s = t.height,
					l = t.currentKey,
					c = t.levelIndices,
					u = n(l, a);
				if (u !== 0) return u;
				var f = i < s ? i : s,
					g = o.length - (i - f),
					h = c.length - (s - f);
				return g - h;
			}),
			(r.prototype.keys = function (e) {
				var t = this.entries(e, wn);
				return Fr(function () {
					var n = t.next();
					return n.value && (n.value = n.value[0]), n;
				});
			}),
			(r.prototype.values = function (e) {
				var t = this.entries(e, wn);
				return Fr(function () {
					var n = t.next();
					return n.value && (n.value = n.value[1]), n;
				});
			}),
			Object.defineProperty(r.prototype, 'maxNodeSize', {
				get: function () {
					return this._maxNodeSize;
				},
				enumerable: !1,
				configurable: !0
			}),
			(r.prototype.minKey = function () {
				return this._root.minKey();
			}),
			(r.prototype.maxKey = function () {
				return this._root.maxKey();
			}),
			(r.prototype.clone = function () {
				this._root.isShared = !0;
				var e = new r(void 0, this._compare, this._maxNodeSize);
				return (e._root = this._root), (e._size = this._size), e;
			}),
			(r.prototype.greedyClone = function (e) {
				var t = new r(void 0, this._compare, this._maxNodeSize);
				return (t._root = this._root.greedyClone(e)), (t._size = this._size), t;
			}),
			(r.prototype.toArray = function (e) {
				e === void 0 && (e = 2147483647);
				var t = this.minKey(),
					n = this.maxKey();
				return t !== void 0 ? this.getRange(t, n, !0, e) : [];
			}),
			(r.prototype.keysArray = function () {
				var e = [];
				return (
					this._root.forRange(
						this.minKey(),
						this.maxKey(),
						!0,
						!1,
						this,
						0,
						function (t, n) {
							e.push(t);
						}
					),
					e
				);
			}),
			(r.prototype.valuesArray = function () {
				var e = [];
				return (
					this._root.forRange(
						this.minKey(),
						this.maxKey(),
						!0,
						!1,
						this,
						0,
						function (t, n) {
							e.push(n);
						}
					),
					e
				);
			}),
			(r.prototype.toString = function () {
				return this.toArray().toString();
			}),
			(r.prototype.setIfNotPresent = function (e, t) {
				return this.set(e, t, !1);
			}),
			(r.prototype.nextHigherPair = function (e, t) {
				return (
					(t = t || []),
					e === void 0
						? this._root.minPair(t)
						: this._root.getPairOrNextHigher(e, this._compare, !1, t)
				);
			}),
			(r.prototype.nextHigherKey = function (e) {
				var t = this.nextHigherPair(e, wn);
				return t && t[0];
			}),
			(r.prototype.nextLowerPair = function (e, t) {
				return (
					(t = t || []),
					e === void 0
						? this._root.maxPair(t)
						: this._root.getPairOrNextLower(e, this._compare, !1, t)
				);
			}),
			(r.prototype.nextLowerKey = function (e) {
				var t = this.nextLowerPair(e, wn);
				return t && t[0];
			}),
			(r.prototype.getPairOrNextLower = function (e, t) {
				return this._root.getPairOrNextLower(e, this._compare, !0, t || []);
			}),
			(r.prototype.getPairOrNextHigher = function (e, t) {
				return this._root.getPairOrNextHigher(e, this._compare, !0, t || []);
			}),
			(r.prototype.changeIfPresent = function (e, t) {
				return (
					this.editRange(e, e, !0, function (n, i) {
						return { value: t };
					}) !== 0
				);
			}),
			(r.prototype.getRange = function (e, t, n, i) {
				i === void 0 && (i = 67108863);
				var a = [];
				return (
					this._root.forRange(e, t, n, !1, this, 0, function (o, s) {
						return a.push([o, s]), a.length > i ? jw : void 0;
					}),
					a
				);
			}),
			(r.prototype.setPairs = function (e, t) {
				for (var n = 0, i = 0; i < e.length; i++) this.set(e[i][0], e[i][1], t) && n++;
				return n;
			}),
			(r.prototype.forRange = function (e, t, n, i, a) {
				var o = this._root.forRange(e, t, n, !1, this, a || 0, i);
				return typeof o == 'number' ? o : o.break;
			}),
			(r.prototype.editRange = function (e, t, n, i, a) {
				var o = this._root;
				o.isShared && (this._root = o = o.clone());
				try {
					var s = o.forRange(e, t, n, !0, this, a || 0, i);
					return typeof s == 'number' ? s : s.break;
				} finally {
					for (var l = void 0; o.keys.length <= 1 && !o.isLeaf; )
						l || (l = o.isShared),
							(this._root = o = o.keys.length === 0 ? os : o.children[0]);
					l && (o.isShared = !0);
				}
			}),
			(r.prototype.editAll = function (e, t) {
				return this.editRange(this.minKey(), this.maxKey(), !0, e, t);
			}),
			(r.prototype.deleteRange = function (e, t, n) {
				return this.editRange(e, t, n, ph);
			}),
			(r.prototype.deleteKeys = function (e) {
				for (var t = 0, n = 0; t < e.length; t++) this.delete(e[t]) && n++;
				return n;
			}),
			Object.defineProperty(r.prototype, 'height', {
				get: function () {
					for (var e = this._root, t = -1; e; )
						t++, (e = e.isLeaf ? void 0 : e.children[0]);
					return t;
				},
				enumerable: !1,
				configurable: !0
			}),
			(r.prototype.freeze = function () {
				var e = this;
				e.clear =
					e.set =
					e.editRange =
						function () {
							throw new Error('Attempted to modify a frozen BTree');
						};
			}),
			(r.prototype.unfreeze = function () {
				delete this.clear, delete this.set, delete this.editRange;
			}),
			Object.defineProperty(r.prototype, 'isFrozen', {
				get: function () {
					return this.hasOwnProperty('editRange');
				},
				enumerable: !1,
				configurable: !0
			}),
			(r.prototype.checkValid = function () {
				var e = this._root.checkValid(0, this, 0);
				qe(e === this.size, 'size mismatch: counted ', e, 'but stored', this.size);
			}),
			r
		);
	})(),
	as = (bt.default = St);
function Vw(r) {
	return r;
}
bt.asSet = Vw;
Symbol && Symbol.iterator && (St.prototype[Symbol.iterator] = St.prototype.entries);
St.prototype.where = St.prototype.filter;
St.prototype.setRange = St.prototype.setPairs;
St.prototype.add = St.prototype.set;
function Fr(r) {
	r === void 0 &&
		(r = function () {
			return { done: !0, value: void 0 };
		});
	var e = { next: r };
	return (
		Symbol &&
			Symbol.iterator &&
			(e[Symbol.iterator] = function () {
				return this;
			}),
		e
	);
}
var p0 = (function () {
		function r(e, t) {
			e === void 0 && (e = []),
				(this.keys = e),
				(this.values = t || Me),
				(this.isShared = void 0);
		}
		return (
			Object.defineProperty(r.prototype, 'isLeaf', {
				get: function () {
					return this.children === void 0;
				},
				enumerable: !1,
				configurable: !0
			}),
			(r.prototype.maxKey = function () {
				return this.keys[this.keys.length - 1];
			}),
			(r.prototype.indexOf = function (e, t, n) {
				for (var i = this.keys, a = 0, o = i.length, s = o >> 1; a < o; ) {
					var l = n(i[s], e);
					if (l < 0) a = s + 1;
					else if (l > 0) o = s;
					else {
						if (l === 0) return s;
						if (e === e) return i.length;
						throw new Error('BTree: NaN was used as a key');
					}
					s = (a + o) >> 1;
				}
				return s ^ t;
			}),
			(r.prototype.minKey = function () {
				return this.keys[0];
			}),
			(r.prototype.minPair = function (e) {
				if (this.keys.length !== 0)
					return (e[0] = this.keys[0]), (e[1] = this.values[0]), e;
			}),
			(r.prototype.maxPair = function (e) {
				if (this.keys.length !== 0) {
					var t = this.keys.length - 1;
					return (e[0] = this.keys[t]), (e[1] = this.values[t]), e;
				}
			}),
			(r.prototype.clone = function () {
				var e = this.values;
				return new r(this.keys.slice(0), e === Me ? e : e.slice(0));
			}),
			(r.prototype.greedyClone = function (e) {
				return this.isShared && !e ? this : this.clone();
			}),
			(r.prototype.get = function (e, t, n) {
				var i = this.indexOf(e, -1, n._compare);
				return i < 0 ? t : this.values[i];
			}),
			(r.prototype.getPairOrNextLower = function (e, t, n, i) {
				var a = this.indexOf(e, -1, t),
					o = a < 0 ? ~a - 1 : n ? a : a - 1;
				if (o >= 0) return (i[0] = this.keys[o]), (i[1] = this.values[o]), i;
			}),
			(r.prototype.getPairOrNextHigher = function (e, t, n, i) {
				var a = this.indexOf(e, -1, t),
					o = a < 0 ? ~a : n ? a : a + 1,
					s = this.keys;
				if (o < s.length) return (i[0] = s[o]), (i[1] = this.values[o]), i;
			}),
			(r.prototype.checkValid = function (e, t, n) {
				var i = this.keys.length,
					a = this.values.length;
				return (
					qe(
						this.values === Me ? i <= a : i === a,
						'keys/values length mismatch: depth',
						e,
						'with lengths',
						i,
						a,
						'and baseIndex',
						n
					),
					qe(e == 0 || i > 0, 'empty leaf at depth', e, 'and baseIndex', n),
					i
				);
			}),
			(r.prototype.set = function (e, t, n, i) {
				var a = this.indexOf(e, -1, i._compare);
				if (a < 0) {
					if (((a = ~a), i._size++, this.keys.length < i._maxNodeSize))
						return this.insertInLeaf(a, e, t, i);
					var o = this.splitOffRightSide(),
						s = this;
					return (
						a > this.keys.length && ((a -= this.keys.length), (s = o)),
						s.insertInLeaf(a, e, t, i),
						o
					);
				} else
					return (
						n !== !1 &&
							(t !== void 0 && this.reifyValues(),
							(this.keys[a] = e),
							(this.values[a] = t)),
						!1
					);
			}),
			(r.prototype.reifyValues = function () {
				return this.values === Me
					? (this.values = this.values.slice(0, this.keys.length))
					: this.values;
			}),
			(r.prototype.insertInLeaf = function (e, t, n, i) {
				if ((this.keys.splice(e, 0, t), this.values === Me)) {
					for (; Me.length < i._maxNodeSize; ) Me.push(void 0);
					if (n === void 0) return !0;
					this.values = Me.slice(0, this.keys.length - 1);
				}
				return this.values.splice(e, 0, n), !0;
			}),
			(r.prototype.takeFromRight = function (e) {
				var t = this.values;
				e.values === Me
					? t !== Me && t.push(void 0)
					: ((t = this.reifyValues()), t.push(e.values.shift())),
					this.keys.push(e.keys.shift());
			}),
			(r.prototype.takeFromLeft = function (e) {
				var t = this.values;
				e.values === Me
					? t !== Me && t.unshift(void 0)
					: ((t = this.reifyValues()), t.unshift(e.values.pop())),
					this.keys.unshift(e.keys.pop());
			}),
			(r.prototype.splitOffRightSide = function () {
				var e = this.keys.length >> 1,
					t = this.keys.splice(e),
					n = this.values === Me ? Me : this.values.splice(e);
				return new r(t, n);
			}),
			(r.prototype.forRange = function (e, t, n, i, a, o, s) {
				var l = a._compare,
					c,
					u;
				if (t === e) {
					if (!n || ((u = (c = this.indexOf(e, -1, l)) + 1), c < 0)) return o;
				} else
					(c = this.indexOf(e, 0, l)),
						(u = this.indexOf(t, -1, l)),
						u < 0 ? (u = ~u) : n === !0 && u++;
				var f = this.keys,
					g = this.values;
				if (s !== void 0)
					for (var h = c; h < u; h++) {
						var d = f[h],
							m = s(d, g[h], o++);
						if (m !== void 0) {
							if (i === !0) {
								if (d !== f[h] || this.isShared === !0)
									throw new Error('BTree illegally changed or cloned in editRange');
								m.delete
									? (this.keys.splice(h, 1),
										this.values !== Me && this.values.splice(h, 1),
										a._size--,
										h--,
										u--)
									: m.hasOwnProperty('value') && (g[h] = m.value);
							}
							if (m.break !== void 0) return m;
						}
					}
				else o += u - c;
				return o;
			}),
			(r.prototype.mergeSibling = function (e, t) {
				if ((this.keys.push.apply(this.keys, e.keys), this.values === Me)) {
					if (e.values === Me) return;
					this.values = this.values.slice(0, this.keys.length);
				}
				this.values.push.apply(this.values, e.reifyValues());
			}),
			r
		);
	})(),
	Uw = (function (r) {
		Gw(e, r);
		function e(t, n) {
			var i = this;
			if (!n) {
				n = [];
				for (var a = 0; a < t.length; a++) n[a] = t[a].maxKey();
			}
			return (i = r.call(this, n) || this), (i.children = t), i;
		}
		return (
			(e.prototype.clone = function () {
				for (var t = this.children.slice(0), n = 0; n < t.length; n++)
					t[n].isShared = !0;
				return new e(t, this.keys.slice(0));
			}),
			(e.prototype.greedyClone = function (t) {
				if (this.isShared && !t) return this;
				for (
					var n = new e(this.children.slice(0), this.keys.slice(0)), i = 0;
					i < n.children.length;
					i++
				)
					n.children[i] = n.children[i].greedyClone(t);
				return n;
			}),
			(e.prototype.minKey = function () {
				return this.children[0].minKey();
			}),
			(e.prototype.minPair = function (t) {
				return this.children[0].minPair(t);
			}),
			(e.prototype.maxPair = function (t) {
				return this.children[this.children.length - 1].maxPair(t);
			}),
			(e.prototype.get = function (t, n, i) {
				var a = this.indexOf(t, 0, i._compare),
					o = this.children;
				return a < o.length ? o[a].get(t, n, i) : void 0;
			}),
			(e.prototype.getPairOrNextLower = function (t, n, i, a) {
				var o = this.indexOf(t, 0, n),
					s = this.children;
				if (o >= s.length) return this.maxPair(a);
				var l = s[o].getPairOrNextLower(t, n, i, a);
				return l === void 0 && o > 0 ? s[o - 1].maxPair(a) : l;
			}),
			(e.prototype.getPairOrNextHigher = function (t, n, i, a) {
				var o = this.indexOf(t, 0, n),
					s = this.children,
					l = s.length;
				if (!(o >= l)) {
					var c = s[o].getPairOrNextHigher(t, n, i, a);
					return c === void 0 && o < l - 1 ? s[o + 1].minPair(a) : c;
				}
			}),
			(e.prototype.checkValid = function (t, n, i) {
				var a = this.keys.length,
					o = this.children.length;
				qe(
					a === o,
					'keys/children length mismatch: depth',
					t,
					'lengths',
					a,
					o,
					'baseIndex',
					i
				),
					qe(
						a > 1 || t > 0,
						'internal node has length',
						a,
						'at depth',
						t,
						'baseIndex',
						i
					);
				for (var s = 0, l = this.children, c = this.keys, u = 0, f = 0; f < o; f++)
					(s += l[f].checkValid(t + 1, n, i + s)),
						(u += l[f].keys.length),
						qe(s >= u, 'wtf', i),
						qe(
							f === 0 || l[f - 1].constructor === l[f].constructor,
							'type mismatch, baseIndex:',
							i
						),
						l[f].maxKey() != c[f] &&
							qe(
								!1,
								'keys[',
								f,
								'] =',
								c[f],
								'is wrong, should be ',
								l[f].maxKey(),
								'at depth',
								t,
								'baseIndex',
								i
							),
						f === 0 ||
							n._compare(c[f - 1], c[f]) < 0 ||
							qe(!1, 'sort violation at depth', t, 'index', f, 'keys', c[f - 1], c[f]);
				var g = u === 0;
				return (
					(g || u > n.maxNodeSize * o) &&
						qe(
							!1,
							g ? 'too few' : 'too many',
							'children (',
							u,
							s,
							') at depth',
							t,
							'maxNodeSize:',
							n.maxNodeSize,
							'children.length:',
							o,
							'baseIndex:',
							i
						),
					s
				);
			}),
			(e.prototype.set = function (t, n, i, a) {
				var o = this.children,
					s = a._maxNodeSize,
					l = a._compare,
					c = Math.min(this.indexOf(t, 0, l), o.length - 1),
					u = o[c];
				if ((u.isShared && (o[c] = u = u.clone()), u.keys.length >= s)) {
					var f;
					c > 0 && (f = o[c - 1]).keys.length < s && l(u.keys[0], t) < 0
						? (f.isShared && (o[c - 1] = f = f.clone()),
							f.takeFromRight(u),
							(this.keys[c - 1] = f.maxKey()))
						: (f = o[c + 1]) !== void 0 &&
							f.keys.length < s &&
							l(u.maxKey(), t) < 0 &&
							(f.isShared && (o[c + 1] = f = f.clone()),
							f.takeFromLeft(u),
							(this.keys[c] = o[c].maxKey()));
				}
				var g = u.set(t, n, i, a);
				if (g === !1) return !1;
				if (((this.keys[c] = u.maxKey()), g === !0)) return !0;
				if (this.keys.length < s) return this.insert(c + 1, g), !0;
				var h = this.splitOffRightSide(),
					d = this;
				return (
					l(g.maxKey(), this.maxKey()) > 0 && ((d = h), (c -= this.keys.length)),
					d.insert(c + 1, g),
					h
				);
			}),
			(e.prototype.insert = function (t, n) {
				this.children.splice(t, 0, n), this.keys.splice(t, 0, n.maxKey());
			}),
			(e.prototype.splitOffRightSide = function () {
				var t = this.children.length >> 1;
				return new e(this.children.splice(t), this.keys.splice(t));
			}),
			(e.prototype.takeFromRight = function (t) {
				this.keys.push(t.keys.shift()), this.children.push(t.children.shift());
			}),
			(e.prototype.takeFromLeft = function (t) {
				this.keys.unshift(t.keys.pop()), this.children.unshift(t.children.pop());
			}),
			(e.prototype.forRange = function (t, n, i, a, o, s, l) {
				var c = o._compare,
					u = this.keys,
					f = this.children,
					g = this.indexOf(t, 0, c),
					h = g,
					d = Math.min(n === t ? g : this.indexOf(n, 0, c), u.length - 1);
				if (a) {
					if (h <= d)
						try {
							for (; h <= d; h++) {
								f[h].isShared && (f[h] = f[h].clone());
								var m = f[h].forRange(t, n, i, a, o, s, l);
								if (((u[h] = f[h].maxKey()), typeof m != 'number')) return m;
								s = m;
							}
						} finally {
							var y = o._maxNodeSize >> 1;
							for (g > 0 && g--, h = d; h >= g; h--)
								f[h].keys.length <= y &&
									(f[h].keys.length !== 0
										? this.tryMerge(h, o._maxNodeSize)
										: (u.splice(h, 1), f.splice(h, 1)));
							f.length !== 0 && f[0].keys.length === 0 && qe(!1, 'emptiness bug');
						}
				} else
					for (; h <= d; h++) {
						var m = f[h].forRange(t, n, i, a, o, s, l);
						if (typeof m != 'number') return m;
						s = m;
					}
				return s;
			}),
			(e.prototype.tryMerge = function (t, n) {
				var i = this.children;
				return t >= 0 &&
					t + 1 < i.length &&
					i[t].keys.length + i[t + 1].keys.length <= n
					? (i[t].isShared && (i[t] = i[t].clone()),
						i[t].mergeSibling(i[t + 1], n),
						i.splice(t + 1, 1),
						this.keys.splice(t + 1, 1),
						(this.keys[t] = i[t].maxKey()),
						!0)
					: !1;
			}),
			(e.prototype.mergeSibling = function (t, n) {
				var i = this.keys.length;
				this.keys.push.apply(this.keys, t.keys);
				var a = t.children;
				if ((this.children.push.apply(this.children, a), t.isShared && !this.isShared))
					for (var o = 0; o < a.length; o++) a[o].isShared = !0;
				this.tryMerge(i - 1, n);
			}),
			e
		);
	})(p0),
	Me = [],
	m0 = { delete: !0 },
	ph = function () {
		return m0;
	},
	jw = { break: !0 },
	os = (function () {
		var r = new p0();
		return (r.isShared = !0), r;
	})(),
	mh = [],
	wn = [];
function qe(r) {
	for (var e = [], t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
	if (!r) throw (e.unshift('B+ tree'), new Error(e.join(' ')));
}
bt.EmptyBTree = (function () {
	var r = new St();
	return r.freeze(), r;
})();
'default' in as && as.default;
function zw(r) {
	switch (r.readyState) {
		case r.CONNECTING:
			return 'CONNECTING';
		case r.OPEN:
			return 'OPEN';
		case r.CLOSING:
			return 'CLOSING';
		case r.CLOSED:
		default:
			return 'CLOSED';
	}
}
if (typeof globalThis < 'u' && globalThis.WebSocket) {
	var Hw = new Proxy(globalThis.WebSocket, {
		construct: function (r, e) {
			const t = new r(...e);
			function n() {
				t.dispatchEvent(new Event('connectionchange')),
					t.onconnectionchange &&
						typeof t.onconnectionchange == 'function' &&
						t.onconnectionchange(zw(t));
			}
			setTimeout(() => {
				n();
			}, 0);
			const i = () => {
					n();
				},
				a = () => {
					n(), t.removeEventListener('open', i), t.removeEventListener('close', a);
				};
			return t.addEventListener('open', i), t.addEventListener('close', a), t;
		}
	});
	globalThis.WebSocket = Hw;
}
class Ww {
	constructor() {
		(this.keyToValue = new Map()), (this.valueToKey = new Map());
	}
	set(e, t) {
		this.keyToValue.set(e, t), this.valueToKey.set(t, e);
	}
	getByKey(e) {
		return this.keyToValue.get(e);
	}
	getByValue(e) {
		return this.valueToKey.get(e);
	}
	clear() {
		this.keyToValue.clear(), this.valueToKey.clear();
	}
}
class v0 {
	constructor(e) {
		(this.generateIdentifier = e), (this.kv = new Ww());
	}
	register(e, t) {
		this.kv.getByValue(e) || (t || (t = this.generateIdentifier(e)), this.kv.set(t, e));
	}
	clear() {
		this.kv.clear();
	}
	getIdentifier(e) {
		return this.kv.getByValue(e);
	}
	getValue(e) {
		return this.kv.getByKey(e);
	}
}
class Kw extends v0 {
	constructor() {
		super((e) => e.name), (this.classToAllowedProps = new Map());
	}
	register(e, t) {
		typeof t == 'object'
			? (t.allowProps && this.classToAllowedProps.set(e, t.allowProps),
				super.register(e, t.identifier))
			: super.register(e, t);
	}
	getAllowedProps(e) {
		return this.classToAllowedProps.get(e);
	}
}
function Yw(r) {
	if ('values' in Object) return Object.values(r);
	const e = [];
	for (const t in r) r.hasOwnProperty(t) && e.push(r[t]);
	return e;
}
function Xw(r, e) {
	const t = Yw(r);
	if ('find' in t) return t.find(e);
	const n = t;
	for (let i = 0; i < n.length; i++) {
		const a = n[i];
		if (e(a)) return a;
	}
}
function Yr(r, e) {
	Object.entries(r).forEach(([t, n]) => e(n, t));
}
function Di(r, e) {
	return r.indexOf(e) !== -1;
}
function vh(r, e) {
	for (let t = 0; t < r.length; t++) {
		const n = r[t];
		if (e(n)) return n;
	}
}
class qw {
	constructor() {
		this.transfomers = {};
	}
	register(e) {
		this.transfomers[e.name] = e;
	}
	findApplicable(e) {
		return Xw(this.transfomers, (t) => t.isApplicable(e));
	}
	findByName(e) {
		return this.transfomers[e];
	}
}
const Qw = (r) => Object.prototype.toString.call(r).slice(8, -1),
	y0 = (r) => typeof r > 'u',
	Jw = (r) => r === null,
	Rn = (r) =>
		typeof r != 'object' || r === null || r === Object.prototype
			? !1
			: Object.getPrototypeOf(r) === null
				? !0
				: Object.getPrototypeOf(r) === Object.prototype,
	Gs = (r) => Rn(r) && Object.keys(r).length === 0,
	Jt = (r) => Array.isArray(r),
	Zw = (r) => typeof r == 'string',
	eI = (r) => typeof r == 'number' && !isNaN(r),
	tI = (r) => typeof r == 'boolean',
	rI = (r) => r instanceof RegExp,
	Dn = (r) => r instanceof Map,
	Nn = (r) => r instanceof Set,
	b0 = (r) => Qw(r) === 'Symbol',
	nI = (r) => r instanceof Date && !isNaN(r.valueOf()),
	iI = (r) => r instanceof Error,
	yh = (r) => typeof r == 'number' && isNaN(r),
	aI = (r) => tI(r) || Jw(r) || y0(r) || eI(r) || Zw(r) || b0(r),
	oI = (r) => typeof r == 'bigint',
	sI = (r) => r === 1 / 0 || r === -1 / 0,
	lI = (r) => ArrayBuffer.isView(r) && !(r instanceof DataView),
	cI = (r) => r instanceof URL,
	_0 = (r) => r.replace(/\./g, '\\.'),
	ss = (r) => r.map(String).map(_0).join('.'),
	En = (r) => {
		const e = [];
		let t = '';
		for (let i = 0; i < r.length; i++) {
			let a = r.charAt(i);
			if (a === '\\' && r.charAt(i + 1) === '.') {
				(t += '.'), i++;
				continue;
			}
			if (a === '.') {
				e.push(t), (t = '');
				continue;
			}
			t += a;
		}
		const n = t;
		return e.push(n), e;
	};
function mt(r, e, t, n) {
	return { isApplicable: r, annotation: e, transform: t, untransform: n };
}
const S0 = [
	mt(
		y0,
		'undefined',
		() => null,
		() => {}
	),
	mt(
		oI,
		'bigint',
		(r) => r.toString(),
		(r) =>
			typeof BigInt < 'u'
				? BigInt(r)
				: (console.error('Please add a BigInt polyfill.'), r)
	),
	mt(
		nI,
		'Date',
		(r) => r.toISOString(),
		(r) => new Date(r)
	),
	mt(
		iI,
		'Error',
		(r, e) => {
			const t = { name: r.name, message: r.message };
			return (
				e.allowedErrorProps.forEach((n) => {
					t[n] = r[n];
				}),
				t
			);
		},
		(r, e) => {
			const t = new Error(r.message);
			return (
				(t.name = r.name),
				(t.stack = r.stack),
				e.allowedErrorProps.forEach((n) => {
					t[n] = r[n];
				}),
				t
			);
		}
	),
	mt(
		rI,
		'regexp',
		(r) => '' + r,
		(r) => {
			const e = r.slice(1, r.lastIndexOf('/')),
				t = r.slice(r.lastIndexOf('/') + 1);
			return new RegExp(e, t);
		}
	),
	mt(
		Nn,
		'set',
		(r) => [...r.values()],
		(r) => new Set(r)
	),
	mt(
		Dn,
		'map',
		(r) => [...r.entries()],
		(r) => new Map(r)
	),
	mt(
		(r) => yh(r) || sI(r),
		'number',
		(r) => (yh(r) ? 'NaN' : r > 0 ? 'Infinity' : '-Infinity'),
		Number
	),
	mt(
		(r) => r === 0 && 1 / r === -1 / 0,
		'number',
		() => '-0',
		Number
	),
	mt(
		cI,
		'URL',
		(r) => r.toString(),
		(r) => new URL(r)
	)
];
function Xa(r, e, t, n) {
	return { isApplicable: r, annotation: e, transform: t, untransform: n };
}
const w0 = Xa(
		(r, e) => (b0(r) ? !!e.symbolRegistry.getIdentifier(r) : !1),
		(r, e) => ['symbol', e.symbolRegistry.getIdentifier(r)],
		(r) => r.description,
		(r, e, t) => {
			const n = t.symbolRegistry.getValue(e[1]);
			if (!n) throw new Error('Trying to deserialize unknown symbol');
			return n;
		}
	),
	dI = [
		Int8Array,
		Uint8Array,
		Int16Array,
		Uint16Array,
		Int32Array,
		Uint32Array,
		Float32Array,
		Float64Array,
		Uint8ClampedArray
	].reduce((r, e) => ((r[e.name] = e), r), {}),
	I0 = Xa(
		lI,
		(r) => ['typed-array', r.constructor.name],
		(r) => [...r],
		(r, e) => {
			const t = dI[e[1]];
			if (!t) throw new Error('Trying to deserialize unknown typed array');
			return new t(r);
		}
	);
function x0(r, e) {
	return r != null && r.constructor
		? !!e.classRegistry.getIdentifier(r.constructor)
		: !1;
}
const C0 = Xa(
		x0,
		(r, e) => ['class', e.classRegistry.getIdentifier(r.constructor)],
		(r, e) => {
			const t = e.classRegistry.getAllowedProps(r.constructor);
			if (!t) return { ...r };
			const n = {};
			return (
				t.forEach((i) => {
					n[i] = r[i];
				}),
				n
			);
		},
		(r, e, t) => {
			const n = t.classRegistry.getValue(e[1]);
			if (!n)
				throw new Error(
					`Trying to deserialize unknown class '${e[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`
				);
			return Object.assign(Object.create(n.prototype), r);
		}
	),
	E0 = Xa(
		(r, e) => !!e.customTransformerRegistry.findApplicable(r),
		(r, e) => ['custom', e.customTransformerRegistry.findApplicable(r).name],
		(r, e) => e.customTransformerRegistry.findApplicable(r).serialize(r),
		(r, e, t) => {
			const n = t.customTransformerRegistry.findByName(e[1]);
			if (!n) throw new Error('Trying to deserialize unknown custom value');
			return n.deserialize(r);
		}
	),
	hI = [C0, w0, E0, I0],
	bh = (r, e) => {
		const t = vh(hI, (i) => i.isApplicable(r, e));
		if (t) return { value: t.transform(r, e), type: t.annotation(r, e) };
		const n = vh(S0, (i) => i.isApplicable(r, e));
		if (n) return { value: n.transform(r, e), type: n.annotation };
	},
	P0 = {};
S0.forEach((r) => {
	P0[r.annotation] = r;
});
const uI = (r, e, t) => {
		if (Jt(e))
			switch (e[0]) {
				case 'symbol':
					return w0.untransform(r, e, t);
				case 'class':
					return C0.untransform(r, e, t);
				case 'custom':
					return E0.untransform(r, e, t);
				case 'typed-array':
					return I0.untransform(r, e, t);
				default:
					throw new Error('Unknown transformation: ' + e);
			}
		else {
			const n = P0[e];
			if (!n) throw new Error('Unknown transformation: ' + e);
			return n.untransform(r, t);
		}
	},
	Gr = (r, e) => {
		if (e > r.size) throw new Error('index out of bounds');
		const t = r.keys();
		for (; e > 0; ) t.next(), e--;
		return t.next().value;
	};
function T0(r) {
	if (Di(r, '__proto__')) throw new Error('__proto__ is not allowed as a property');
	if (Di(r, 'prototype')) throw new Error('prototype is not allowed as a property');
	if (Di(r, 'constructor')) throw new Error('constructor is not allowed as a property');
}
const fI = (r, e) => {
		T0(e);
		for (let t = 0; t < e.length; t++) {
			const n = e[t];
			if (Nn(r)) r = Gr(r, +n);
			else if (Dn(r)) {
				const i = +n,
					a = +e[++t] == 0 ? 'key' : 'value',
					o = Gr(r, i);
				switch (a) {
					case 'key':
						r = o;
						break;
					case 'value':
						r = r.get(o);
						break;
				}
			} else r = r[n];
		}
		return r;
	},
	Bs = (r, e, t) => {
		if ((T0(e), e.length === 0)) return t(r);
		let n = r;
		for (let a = 0; a < e.length - 1; a++) {
			const o = e[a];
			if (Jt(n)) {
				const s = +o;
				n = n[s];
			} else if (Rn(n)) n = n[o];
			else if (Nn(n)) {
				const s = +o;
				n = Gr(n, s);
			} else if (Dn(n)) {
				if (a === e.length - 2) break;
				const l = +o,
					c = +e[++a] == 0 ? 'key' : 'value',
					u = Gr(n, l);
				switch (c) {
					case 'key':
						n = u;
						break;
					case 'value':
						n = n.get(u);
						break;
				}
			}
		}
		const i = e[e.length - 1];
		if ((Jt(n) ? (n[+i] = t(n[+i])) : Rn(n) && (n[i] = t(n[i])), Nn(n))) {
			const a = Gr(n, +i),
				o = t(a);
			a !== o && (n.delete(a), n.add(o));
		}
		if (Dn(n)) {
			const a = +e[e.length - 2],
				o = Gr(n, a);
			switch (+i == 0 ? 'key' : 'value') {
				case 'key': {
					const l = t(o);
					n.set(l, n.get(o)), l !== o && n.delete(o);
					break;
				}
				case 'value': {
					n.set(o, t(n.get(o)));
					break;
				}
			}
		}
		return r;
	};
function Vs(r, e, t = []) {
	if (!r) return;
	if (!Jt(r)) {
		Yr(r, (a, o) => Vs(a, e, [...t, ...En(o)]));
		return;
	}
	const [n, i] = r;
	i &&
		Yr(i, (a, o) => {
			Vs(a, e, [...t, ...En(o)]);
		}),
		e(n, t);
}
function gI(r, e, t) {
	return (
		Vs(e, (n, i) => {
			r = Bs(r, i, (a) => uI(a, n, t));
		}),
		r
	);
}
function pI(r, e) {
	function t(n, i) {
		const a = fI(r, En(i));
		n.map(En).forEach((o) => {
			r = Bs(r, o, () => a);
		});
	}
	if (Jt(e)) {
		const [n, i] = e;
		n.forEach((a) => {
			r = Bs(r, En(a), () => r);
		}),
			i && Yr(i, t);
	} else Yr(e, t);
	return r;
}
const mI = (r, e) => Rn(r) || Jt(r) || Dn(r) || Nn(r) || x0(r, e);
function vI(r, e, t) {
	const n = t.get(r);
	n ? n.push(e) : t.set(r, [e]);
}
function yI(r, e) {
	const t = {};
	let n;
	return (
		r.forEach((i) => {
			if (i.length <= 1) return;
			e || (i = i.map((s) => s.map(String)).sort((s, l) => s.length - l.length));
			const [a, ...o] = i;
			a.length === 0 ? (n = o.map(ss)) : (t[ss(a)] = o.map(ss));
		}),
		n ? (Gs(t) ? [n] : [n, t]) : Gs(t) ? void 0 : t
	);
}
const O0 = (r, e, t, n, i = [], a = [], o = new Map()) => {
	const s = aI(r);
	if (!s) {
		vI(r, i, e);
		const h = o.get(r);
		if (h) return n ? { transformedValue: null } : h;
	}
	if (!mI(r, t)) {
		const h = bh(r, t),
			d = h
				? { transformedValue: h.value, annotations: [h.type] }
				: { transformedValue: r };
		return s || o.set(r, d), d;
	}
	if (Di(a, r)) return { transformedValue: null };
	const l = bh(r, t),
		c = (l == null ? void 0 : l.value) ?? r,
		u = Jt(c) ? [] : {},
		f = {};
	Yr(c, (h, d) => {
		if (d === '__proto__' || d === 'constructor' || d === 'prototype')
			throw new Error(
				`Detected property ${d}. This is a prototype pollution risk, please remove it from your object.`
			);
		const m = O0(h, e, t, n, [...i, d], [...a, r], o);
		(u[d] = m.transformedValue),
			Jt(m.annotations)
				? (f[d] = m.annotations)
				: Rn(m.annotations) &&
					Yr(m.annotations, (y, v) => {
						f[_0(d) + '.' + v] = y;
					});
	});
	const g = Gs(f)
		? { transformedValue: u, annotations: l ? [l.type] : void 0 }
		: { transformedValue: u, annotations: l ? [l.type, f] : f };
	return s || o.set(r, g), g;
};
function $0(r) {
	return Object.prototype.toString.call(r).slice(8, -1);
}
function _h(r) {
	return $0(r) === 'Array';
}
function bI(r) {
	if ($0(r) !== 'Object') return !1;
	const e = Object.getPrototypeOf(r);
	return !!e && e.constructor === Object && e === Object.prototype;
}
function _I(r, e, t, n, i) {
	const a = {}.propertyIsEnumerable.call(n, e) ? 'enumerable' : 'nonenumerable';
	a === 'enumerable' && (r[e] = t),
		i &&
			a === 'nonenumerable' &&
			Object.defineProperty(r, e, {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0
			});
}
function Us(r, e = {}) {
	if (_h(r)) return r.map((i) => Us(i, e));
	if (!bI(r)) return r;
	const t = Object.getOwnPropertyNames(r),
		n = Object.getOwnPropertySymbols(r);
	return [...t, ...n].reduce((i, a) => {
		if (_h(e.props) && !e.props.includes(a)) return i;
		const o = r[a],
			s = Us(o, e);
		return _I(i, a, s, r, e.nonenumerable), i;
	}, {});
}
class ue {
	constructor({ dedupe: e = !1 } = {}) {
		(this.classRegistry = new Kw()),
			(this.symbolRegistry = new v0((t) => t.description ?? '')),
			(this.customTransformerRegistry = new qw()),
			(this.allowedErrorProps = []),
			(this.dedupe = e);
	}
	serialize(e) {
		const t = new Map(),
			n = O0(e, t, this, this.dedupe),
			i = { json: n.transformedValue };
		n.annotations && (i.meta = { ...i.meta, values: n.annotations });
		const a = yI(t, this.dedupe);
		return a && (i.meta = { ...i.meta, referentialEqualities: a }), i;
	}
	deserialize(e) {
		const { json: t, meta: n } = e;
		let i = Us(t);
		return (
			n != null && n.values && (i = gI(i, n.values, this)),
			n != null && n.referentialEqualities && (i = pI(i, n.referentialEqualities)),
			i
		);
	}
	stringify(e) {
		return JSON.stringify(this.serialize(e));
	}
	parse(e) {
		return this.deserialize(JSON.parse(e));
	}
	registerClass(e, t) {
		this.classRegistry.register(e, t);
	}
	registerSymbol(e, t) {
		this.symbolRegistry.register(e, t);
	}
	registerCustom(e, t) {
		this.customTransformerRegistry.register({ name: t, ...e });
	}
	allowErrorProps(...e) {
		this.allowedErrorProps.push(...e);
	}
}
ue.defaultInstance = new ue();
ue.serialize = ue.defaultInstance.serialize.bind(ue.defaultInstance);
ue.deserialize = ue.defaultInstance.deserialize.bind(ue.defaultInstance);
ue.stringify = ue.defaultInstance.stringify.bind(ue.defaultInstance);
ue.parse = ue.defaultInstance.parse.bind(ue.defaultInstance);
ue.registerClass = ue.defaultInstance.registerClass.bind(ue.defaultInstance);
ue.registerSymbol = ue.defaultInstance.registerSymbol.bind(ue.defaultInstance);
ue.registerCustom = ue.defaultInstance.registerCustom.bind(ue.defaultInstance);
ue.allowErrorProps = ue.defaultInstance.allowErrorProps.bind(ue.defaultInstance);
const SI = k
		.number()
		.min(0, 'May not be negative.')
		.describe('The expected amount of days from starting a seed to its germination.'),
	wI = k
		.number()
		.min(0, 'May not be negative.')
		.describe(
			'The expected amount of days from the germination of a seed to when it will be ready for transplant.             For cultivars which are not able to be transplanted, this value is unused.'
		),
	II = k
		.number()
		.min(0, 'May not be negative.')
		.describe(
			'The expected amount of days the germination of a seed to when it will be ready for a harvest.'
		),
	xI = k
		.number()
		.min(0, 'May not be negative.')
		.describe(
			'The expected amount of days the first and last harvest of a plant.             For plants which only have one harvest, this value is zero.'
		),
	CI = k
		.object({
			sowToGerm: SI.optional(),
			germToTransplant: wI.optional(),
			germToFirstHarvest: II.optional(),
			firstToLastHarvest: xI.optional()
		})
		.describe(
			'The annual lifecycle defines the length of the stages of life for annual plants.'
		),
	EI = _.Record({
		sowToGerm: _.Optional(_.Number()),
		germToTransplant: _.Optional(_.Number()),
		germToFirstHarvest: _.Optional(_.Number()),
		firstToLastHarvest: _.Optional(_.Number())
	}),
	PI = k
		.number()
		.describe(
			'The amount of days between the last frost and the beginning of the planting window. 			Positive values indicate the window begins after the last frost date. 			For example, a value of -15 indicates the cultivar may be planted 15 days before the last frost date.'
		),
	TI = k
		.number()
		.describe(
			'The amount of days between the last frost and the end of the planting window. 			Positive values indicate the window begins after the last frost date. 			For example, a value of 15 indicates the cultivar must be planted before 15 days after the last frost date.'
		),
	OI = k
		.number()
		.describe(
			'The amount of days between the first frost and the beginning of the planting window. 			Positive values indicate the window begins after the first frost date. 			For example, a value of -15 indicates the cultivar may be planted 15 days before the first frost date.'
		),
	$I = k
		.number()
		.describe(
			'The amount of days between the first frost and the end of the planting window. 			Positive values indicate the window begins after the first frost date. 			For example, a value of 15 indicates the cultivar must be planted before 15 days after the first frost date.'
		),
	AI = k
		.object({
			lastFrostWindowOpen: PI.optional(),
			lastFrostWindowClose: TI.optional(),
			firstFrostWindowOpen: OI.optional(),
			firstFrostWindowClose: $I.optional()
		})
		.describe(
			'A planting window defines a period of time within an environment that a cultivar should be planted. 		These attributes define an allowed planting window of time relative to the first and last frost dates. 		These planting windows are used for incdicating within the Verdagraph when plants are suggested to be planted.'
		),
	kI = _.Record({
		lastFrostWindowOpen: _.Optional(_.Number()),
		lastFrostWindowClose: _.Optional(_.Number()),
		firstFrostWindowOpen: _.Optional(_.Number()),
		firstFrostWindowClose: _.Optional(_.Number())
	}),
	RI = k
		.boolean()
		.describe(
			"Defines whether a plant may be started as a seed in one location and transplanted to another. 		Some plants, such as carrots, don't tolerate transplants, and so must be started directly."
		),
	DI = k
		.object({ transplantable: RI.optional() })
		.describe('The origin refers to the method used to create plants.'),
	NI = _.Record({ transplantable: _.Optional(_.Boolean()) }),
	A0 = _.Record({
		annualLifeCycle: _.Optional(EI),
		frostDatePlantingWindows: _.Optional(kI),
		origin: _.Optional(NI)
	});
k.object({
	annualLifeCycle: CI.optional(),
	frostDatePlantingWindows: AI.optional(),
	osrigin: DI.optional()
});
const MI = _.Collections({
		profiles: {
			schema: _.Schema({
				id: _.Id(),
				username: _.String(),
				createdAt: _.Date({ default: _.Default.now() })
			}),
			permissions: {
				anon: { read: { filter: [!0] } },
				user: { read: { filter: [!0] } }
			}
		},
		accounts: {
			schema: _.Schema({
				id: _.Id(),
				profileId: _.String(),
				passwordHash: _.String(),
				verifiedEmail: _.String({ nullable: !0 }),
				unverifiedEmail: _.Record({
					address: _.String({ nullable: !0, default: null }),
					token: _.String({ nullable: !0, default: null })
				}),
				passwordResetToken: _.String({ nullable: !0, default: null }),
				isActive: _.Boolean({ default: !0 })
			}),
			relationships: { profile: _.RelationById('profiles', '$profileId') },
			permissions: { user: { read: { filter: [['id', '=', '$role.accountId']] } } }
		}
	}),
	k0 = ['HIDDEN', 'UNLISTED', 'PUBLIC'],
	R0 = ['ADMIN', 'EDITOR', 'VIEWER'],
	FI = ['CREATED', 'PENDING', 'ACCEPTED'],
	LI = _.Collections({
		...MI,
		gardens: {
			schema: _.Schema({
				id: _.Id(),
				name: _.String(),
				visibility: _.String({ enum: [...k0] }),
				description: _.String({ nullable: !0, default: null }),
				isActive: _.Boolean({ default: !0 }),
				creatorId: _.String({ nullable: !0 }),
				adminIds: _.Set(_.String()),
				editorIds: _.Set(_.String(), { default: _.Default.Set.empty() }),
				viewerIds: _.Set(_.String(), { default: _.Default.Set.empty() }),
				createdAt: _.Date({ default: _.Default.now() })
			}),
			relationships: {
				creator: _.RelationById('profiles', '$creatorId'),
				adminMemberships: _.RelationMany('gardenMemberships', {
					where: [['userId', 'in', '$adminIds']]
				}),
				editorMemberships: _.RelationMany('gardenMemberships', {
					where: [['userId', 'in', '$adminIds']]
				}),
				viewerMemberships: _.RelationMany('gardenMemberships', {
					where: [['userId', 'in', '$adminIds']]
				})
			},
			permissions: {
				anon: { read: { filter: [['visibility', '!=', 'HIDDEN']] } },
				user: {
					read: {
						filter: [
							G([
								['visibility', '!=', 'HIDDEN'],
								['adminIds', 'has', '$role.profileId'],
								['editorIds', 'has', '$role.profileId'],
								['viewerIds', 'has', '$role.profileId']
							])
						]
					},
					insert: { filter: [['creatorId', '=', '$role.profileId']] },
					update: { filter: [['adminIds', 'has', '$role.profileId']] }
				}
			}
		},
		gardenMemberships: {
			schema: _.Schema({
				id: _.Id(),
				gardenId: _.String(),
				userId: _.String(),
				role: _.String({ enum: [...R0] }),
				inviterId: _.String({ nullable: !0 }),
				status: _.String({ enum: [...FI] }),
				acceptedAt: _.Date({ nullable: !0, default: null }),
				favorite: _.Boolean({ default: !1 })
			}),
			relationships: {
				garden: _.RelationById('gardens', '$gardenId'),
				user: _.RelationById('profiles', '$userId'),
				inviter: _.RelationById('profiles', '$inviterId')
			},
			permissions: {
				anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
				user: {
					read: {
						filter: [
							G([
								['garden.visibility', '!=', 'HIDDEN'],
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId'],
								['garden.viewerIds', 'has', '$role.profileId']
							])
						]
					},
					insert: { filter: [['garden.adminIds', 'has', '$role.profileId']] },
					update: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['userId', '=', '$role.profileId']
							])
						]
					},
					delete: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['userId', '=', '$role.accountId']
							])
						]
					}
				}
			}
		}
	}),
	GI = k
		.string()
		.trim()
		.min(2, 'Must be at least 3 characters.')
		.max(50, 'May be at most 50 characters.')
		.regex(
			/[0-9A-Za-z _-]+/,
			'Must contain only letters, numbers, spaces, underscores, and hyphens.'
		),
	BI = k.string().max(1400, 'May be at most 1400 characters.'),
	ft = { nameSchema: GI, descriptionSchema: BI },
	Al = k
		.string()
		.trim()
		.min(3, 'Must be at least 3 characters.')
		.max(50, 'May be at most 50 characters.')
		.regex(
			/^[a-zA-Z0-9-_]*$/,
			'Must contain only letters, numbers, hyphens, and underscores.'
		)
		.describe(
			'Unique username to identify yourself in the application. May be changed later.'
		),
	ai = k
		.string()
		.email('Must be a valid email address.')
		.describe('Must be a valid email address.'),
	mr = k
		.string()
		.min(6, 'Must be at least 6 characters.')
		.max(255, 'Must be at most 255 characters.')
		.describe('Must be between 6 and 255 characters long.'),
	VI = { usernameSchema: Al };
k.object({ email: ai, password: k.string() });
k.object({ email: ai, password1: mr, password2: mr, username: Al }).refine(
	(r) => r.password1 == r.password2,
	{ message: 'Passwords must match', path: ['password2'] }
);
k.object({
	newEmail: ai.optional(),
	newPassword1: mr.optional(),
	newPassword2: mr.optional(),
	newUsername: Al.optional(),
	password: mr
}).refine((r) => r.newPassword1 == r.newPassword2, {
	message: 'Passwords must match',
	path: ['newPassword2']
});
k.object({ email: ai });
k.object({ token: k.string() });
k.object({ email: ai });
k.object({
	userId: k.string().nanoid(),
	token: k.string(),
	password1: mr,
	password2: mr
}).refine((r) => r.password1 == r.password2, {
	message: 'Passwords must match',
	path: ['password2']
});
const UI = k
		.string()
		.trim()
		.toLowerCase()
		.min(4, 'Must be at least 4 characters.')
		.max(21, 'May be at most 21 characters.')
		.regex(/[0-9A-Za-z-]+/, 'Must contain only alphanumeric characters and hyphens.')
		.describe('Unique shorthand name for the garden used in URLs.'),
	jI = ft.nameSchema.describe('Name of the garden.'),
	zI = ft.descriptionSchema.describe('Optional description.'),
	HI = k.enum(k0),
	WI = k.enum(R0),
	Vr = k
		.array(VI.usernameSchema)
		.max(10, 'A maximum of 10 users can be invited at once.');
k.object({
	id: UI,
	name: jI,
	description: zI.default(''),
	visibility: HI.default('HIDDEN'),
	adminInvites: Vr.describe(
		'A list of usernames to invite as admins. A maximum of 10 users can be invited at once.'
	).default([]),
	editorInvites: Vr.describe(
		'A list of usernames to invite as editors. A maximum of 10 users can be invited at once.'
	).default([]),
	viewerInvites: Vr.describe(
		'A list of usernames to invite as viewers. A maximum of 10 users can be invited at once.'
	).default([])
});
k.object({
	gardenId: k.string(),
	adminInvites: Vr.describe('A list of usernames to invite as admins.').default([]),
	editorInvites: Vr.describe('A list of usernames to invite as editors.').default([]),
	viewerInvites: Vr.describe('A list of usernames to invite as viewers.').default([])
});
k.object({ gardenId: k.string() });
k.object({ gardenId: k.string() });
k.object({ gardenId: k.string(), profileId: k.string() });
k.object({ gardenId: k.string(), profileId: k.string(), newRole: WI });
const D0 = ['RECTANGLE', 'POLYGON', 'ELLIPSE', 'LINES'],
	KI = _.Collections({
		...LI,
		coordinates: {
			schema: _.Schema({
				id: _.Id(),
				gardenId: _.String(),
				x: _.Number(),
				y: _.Number(),
				z: _.Number({ nullable: !0, default: 0 }),
				createdAt: _.Date({ default: _.Default.now() })
			}),
			relationships: { garden: _.RelationById('gardens', '$gardenId') },
			permissions: {
				anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
				user: {
					read: {
						filter: [
							G([
								['garden.visibility', '!=', 'HIDDEN'],
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId'],
								['garden.viewerIds', 'has', '$role.profileId']
							])
						]
					},
					insert: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					},
					update: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					},
					delete: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					}
				}
			}
		},
		geometries: {
			schema: _.Schema({
				id: _.Id(),
				gardenId: _.String(),
				type: _.String({ enum: [...D0] }),
				date: _.Date(),
				scaleFactor: _.Number({ default: 1 }),
				rotation: _.Number({ default: 0 }),
				rectangleLength: _.Number({ default: 1 }),
				rectangleWidth: _.Number({ default: 1 }),
				polygonNumSides: _.Number({ default: 3 }),
				polygonRadius: _.Number({ default: 1 }),
				ellipseLength: _.Number({ default: 1 }),
				ellipseWidth: _.Number({ default: 1 }),
				linesCoordinateIds: _.Set(_.String(), { default: _.Default.Set.empty() }),
				linesClosed: _.Boolean({ default: !0 })
			}),
			relationships: {
				garden: _.RelationById('gardens', '$gardenId'),
				linesCoordinates: _.RelationMany('coordinates', {
					where: [['id', 'in', '$linesCoordinateIds']],
					order: [['createdAt', 'ASC']]
				})
			},
			permissions: {
				anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
				user: {
					read: {
						filter: [
							G([
								['garden.visibility', '!=', 'HIDDEN'],
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId'],
								['garden.viewerIds', 'has', '$role.profileId']
							])
						]
					},
					insert: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					},
					update: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					},
					delete: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					}
				}
			}
		},
		geometryHistories: {
			schema: _.Schema({
				id: _.Id(),
				gardenId: _.String(),
				geometryIds: _.Set(_.String())
			}),
			relationships: {
				garden: _.RelationById('gardens', '$gardenId'),
				geometries: _.RelationMany('geometries', {
					where: [['id', 'in', '$geometryIds']],
					order: [['date', 'ASC']]
				})
			},
			permissions: {
				anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
				user: {
					read: {
						filter: [
							G([
								['garden.visibility', '!=', 'HIDDEN'],
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId'],
								['garden.viewerIds', 'has', '$role.profileId']
							])
						]
					},
					insert: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					},
					update: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					},
					delete: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					}
				}
			}
		},
		locations: {
			schema: _.Schema({
				id: _.Id(),
				gardenId: _.String(),
				workspaceId: _.String(),
				x: _.Number(),
				y: _.Number(),
				z: _.Number({ nullable: !0, default: 0 }),
				date: _.Date()
			}),
			relationships: {
				garden: _.RelationById('gardens', '$gardenId'),
				workspace: _.RelationById('workspaces', '$workspaceId')
			},
			permissions: {
				anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
				user: {
					read: {
						filter: [
							G([
								['garden.visibility', '!=', 'HIDDEN'],
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId'],
								['garden.viewerIds', 'has', '$role.profileId']
							])
						]
					},
					insert: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					},
					update: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					},
					delete: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					}
				}
			}
		},
		locationHistories: {
			schema: _.Schema({
				id: _.Id(),
				gardenId: _.String(),
				locationIds: _.Set(_.String()),
				workspaceIds: _.Set(_.String())
			}),
			relationships: {
				garden: _.RelationById('gardens', '$gardenId'),
				locations: _.RelationMany('locations', {
					where: [['id', 'in', '$locationIds']],
					order: [['date', 'ASC']]
				})
			},
			permissions: {
				anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
				user: {
					read: {
						filter: [
							G([
								['garden.visibility', '!=', 'HIDDEN'],
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId'],
								['garden.viewerIds', 'has', '$role.profileId']
							])
						]
					},
					insert: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					},
					update: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					},
					delete: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					}
				}
			}
		},
		plantingAreas: {
			schema: _.Schema({
				id: _.Id(),
				gardenId: _.String(),
				name: _.String(),
				geometryId: _.String(),
				locationHistoryId: _.String(),
				depth: _.Number({ default: 0 }),
				description: _.String({ default: '' })
			}),
			relationships: {
				garden: _.RelationById('gardens', '$gardenId'),
				geometry: _.RelationById('geometries', '$geometryId'),
				locationHistory: _.RelationById('locationHistories', '$locationHistoryId')
			},
			permissions: {
				anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
				user: {
					read: {
						filter: [
							G([
								['garden.visibility', '!=', 'HIDDEN'],
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId'],
								['garden.viewerIds', 'has', '$role.profileId']
							])
						]
					},
					insert: { filter: [['garden.adminIds', 'has', '$role.profileId']] },
					update: { filter: [['garden.adminIds', 'has', '$role.profileId']] },
					delete: { filter: [['garden.adminIds', 'has', '$role.profileId']] }
				}
			}
		},
		workspaces: {
			schema: _.Schema({
				id: _.Id(),
				gardenId: _.String(),
				name: _.String(),
				slug: _.String(),
				description: _.String({ default: '' })
			}),
			relationships: { garden: _.RelationById('gardens', '$gardenId') },
			permissions: {
				anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
				user: {
					read: {
						filter: [
							G([
								['garden.visibility', '!=', 'HIDDEN'],
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId'],
								['garden.viewerIds', 'has', '$role.profileId']
							])
						]
					},
					insert: { filter: [['garden.adminIds', 'has', '$role.profileId']] },
					update: { filter: [['garden.adminIds', 'has', '$role.profileId']] },
					delete: { filter: [['garden.adminIds', 'has', '$role.profileId']] }
				}
			}
		}
	}),
	YI = k
		.number()
		.describe(
			'The minimum temperature that is expected to occur within a year in the environment.'
		),
	XI = k
		.number()
		.describe(
			'The maxmium temperature that is expected to occur within a year in the environment.'
		),
	qI = k
		.object({ minimum: YI.optional(), maximum: XI.optional() })
		.describe('Defines the expected range of temperatures over a year.'),
	QI = _.Record({ minimum: _.Optional(_.Number()), maximum: _.Optional(_.Number()) }),
	JI = k
		.date()
		.describe(
			'The date within the environment when the last frost of the year is expected to occur.'
		),
	ZI = k
		.date()
		.describe(
			'The date within the environment when the first frost of the year is expected to occur.'
		),
	ex = k
		.object({ lastFrostDate: JI.optional(), firstFrostDate: ZI.optional() })
		.describe(
			'Defines when the first and last frost are expected to occur within a year.'
		),
	tx = _.Record({
		lastFrostDate: _.Optional(_.Date()),
		firstFrostDate: _.Optional(_.Date())
	}),
	rx = _.Record({ frostDates: _.Optional(tx), annualTemperature: _.Optional(QI) });
k.object({ frostDates: ex.optional(), annualTemperature: qI.optional() });
const N0 = ['GARDEN', 'WORKSPACE', 'PLANTING_AREA', 'INDEPENDENT'],
	M0 = _.Collections({
		...KI,
		environments: {
			schema: _.Schema({
				id: _.Id(),
				name: _.String(),
				description: _.String({ default: '' }),
				parentType: _.String({ enum: [...N0], default: 'GARDEN' }),
				gardenId: _.String(),
				workspaceIds: _.Optional(_.Set(_.String())),
				plantingAreaIds: _.Optional(_.Set(_.String())),
				geometryHistoryId: _.Optional(_.String()),
				locationHistoryId: _.Optional(_.String()),
				inherit: _.Boolean({ default: !0 }),
				attributes: rx
			}),
			relationships: {
				garden: _.RelationById('gardens', '$gardenId'),
				workspaces: _.RelationMany('workspaces', {
					where: [['id', 'in', '$workspaceIds']]
				}),
				plantingAreas: _.RelationMany('plantingAreas', {
					where: [['id', 'in', '$plantingAreaIds']]
				}),
				geometriHistory: _.RelationById('geometryHistories', '$geometryHistoryId'),
				locationHistory: _.RelationById('locationHistories', '$locationHistoryId')
			},
			permissions: {
				anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
				user: {
					read: {
						filter: [
							G([
								['garden.visibility', '!=', 'HIDDEN'],
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId'],
								['garden.viewerIds', 'has', '$role.profileId']
							])
						]
					},
					insert: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					},
					update: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					},
					delete: {
						filter: [
							G([
								['garden.adminIds', 'has', '$role.profileId'],
								['garden.editorIds', 'has', '$role.profileId']
							])
						]
					}
				}
			}
		}
	}),
	nx = ['DIRECT_SEED', 'SEED_TO_TRANSPLANT', 'SEEDLING_TO_TRANSPLANT'],
	ix = ['COMPOST', 'LOW', 'MEDIUM', 'HIGH', 'PERFECT'];
_.Collections({
	...M0,
	harvests: {
		schema: _.Schema({
			id: _.Id(),
			gardenId: _.String(),
			date: _.Date(),
			mass: _.Optional(_.Number()),
			units: _.Optional(_.Number()),
			quality: _.Optional(_.String({ enum: [...ix] })),
			description: _.String({ default: '' })
		}),
		relationships: { garden: _.RelationById('gardens', '$gardenId') },
		permissions: {
			anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
			user: {
				read: {
					filter: [
						G([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					filter: [
						G([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					filter: [
						G([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					filter: [
						G([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	},
	lifespans: {
		schema: _.Schema({
			id: _.Id(),
			gardenId: _.String(),
			origin: _.String({ enum: [...nx] }),
			geometryHistoryId: _.Optional(_.String()),
			locationHistoryId: _.Optional(_.String()),
			dates: _.Record({
				seedDate: _.Optional(_.Date()),
				germDate: _.Optional(_.Date()),
				expiryDate: _.Optional(_.Date()),
				dormancyDates: _.Optional(_.Set(_.Date())),
				growthDates: _.Optional(_.Set(_.Date()))
			}),
			harvestIds: _.Set(_.String())
		}),
		relationships: {
			garden: _.RelationById('gardens', '$gardenId'),
			geometryHistory: _.RelationById('geometryHistories', '$geometryHistoryId'),
			locationHistory: _.RelationById('locationHistories', '$locationHistoryId'),
			harvests: _.RelationMany('harvests', { where: [['id', 'in', '$harvestIds']] })
		},
		permissions: {
			anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
			user: {
				read: {
					filter: [
						G([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					filter: [
						G([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					filter: [
						G([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					filter: [
						G([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	},
	plants: {
		schema: _.Schema({
			id: _.Id(),
			gardenId: _.String(),
			cultivarName: _.String(),
			cultivarAttributes: A0,
			expectedLifespanId: _.String(),
			recordedLifespanId: _.String(),
			aggregate: _.Boolean({ default: !1 })
		}),
		relationships: {
			garden: _.RelationById('gardens', '$gardenId'),
			expectedLifespan: _.RelationById('lifespans', '$expectedLifespanId'),
			recordedLifespan: _.RelationById('lifespans', '$recordedLifespanId')
		},
		permissions: {
			anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
			user: {
				read: {
					filter: [
						G([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					filter: [
						G([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					filter: [
						G([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					filter: [
						G([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	},
	plantGroups: {
		schema: _.Schema({
			id: _.Id(),
			gardenId: _.String(),
			name: _.String(),
			plantIds: _.Set(_.String()),
			description: _.String({ default: '' })
		}),
		relationships: {
			garden: _.RelationById('gardens', '$gardenId'),
			plants: _.RelationMany('plants', { where: [['id', 'in', '$plantIds']] })
		},
		permissions: {
			anon: { read: { filter: [['garden.visibility', '!=', 'HIDDEN']] } },
			user: {
				read: {
					filter: [
						G([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					filter: [
						G([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					filter: [
						G([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					filter: [
						G([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	}
});
const F0 = ft.nameSchema.describe(
		'Name of the workspace. Must be unique within a garden.'
	),
	L0 = ft.descriptionSchema.describe('Optional description.'),
	G0 = ft.nameSchema.describe('The name of the planting area.'),
	B0 = ft.descriptionSchema.describe('Optional description.'),
	V0 = k
		.number()
		.min(0, 'May not be negative')
		.max(1e3, 'May be at most 1000m.')
		.describe('The depth of the planting area.'),
	ax = k
		.number()
		.min(-1e6, 'Limited to 1 000 000 meters.')
		.max(1e6, 'Limited to 1 000 000 meters.')
		.describe('The horizontal X component of the coordinate.'),
	ox = k
		.number()
		.min(-1e6, 'Limited to 1 000 000 meters.')
		.max(1e6, 'Limited to 1 000 000 meters.')
		.describe('The vertical Y component of the coordinate.'),
	qa = k
		.object({ x: ax, y: ox })
		.describe('A position relative to the origin of a workspace or a geometry.'),
	kl = k.date().describe('The date at which the location applies.'),
	U0 = k
		.enum(D0)
		.describe(
			'Describes the type of geometry. Each type has a unique set of attributes associated with it.'
		),
	j0 = k.date().describe('The date at which the geometry applies to the object.'),
	z0 = k
		.number()
		.min(0.01, 'Must be at least 1%.')
		.max(100, 'May be at most 10000%')
		.describe(
			'Factor used to scale the geometry up or down. Must be within 1 and 1000 percent.'
		),
	H0 = k
		.number()
		.min(-360, 'Must be at least negative 360 degrees.')
		.max(360, 'May be at most 360 degrees.')
		.describe(
			'The rotation of the geometry in degrees. Must be between 0 and 360 degrees.'
		),
	W0 = k
		.number()
		.min(0.01, 'May not be negative or zero.')
		.max(1e3, 'May be at most 1000m')
		.describe('The horizontal, or x-axis length of the rectangle.'),
	K0 = k
		.number()
		.min(0.01, 'May not be negative or zero.')
		.max(1e3, 'May be at most 1000m')
		.describe('The vertical, or y-axis width of the rectangle.'),
	Y0 = k
		.number()
		.min(3, 'Must have at least 3 sides.')
		.max(20, 'May have at most 20 sides.')
		.describe('The amount of sides the polygon has.'),
	X0 = k
		.number()
		.min(0.01, 'May not be negative or zero.')
		.max(1e3, 'May be at most 1000m')
		.describe('The distance from the center to any vertex of the polygon.'),
	q0 = k
		.number()
		.min(0.01, 'May not be negative or zero.')
		.max(1e3, 'May be at most 1000m.')
		.describe('The horizontal, or x-axis diameter of the ellipse.'),
	Q0 = k
		.number()
		.min(0.01, 'May not be negative or zero.')
		.max(1e3, 'May be at most 1000m')
		.describe(
			'The vertical, or y-axis diameter of the ellipse. Must be between 0 and 1000 meters.'
		),
	J0 = k
		.array(qa)
		.min(3, 'Must have at least 3 points.')
		.describe(
			'A list of coordinates relative to the position of the geometry which define an irregular polygonal.'
		),
	Z0 = k.boolean().describe('If true, the line segments form a closed shape.'),
	sx = k.object({
		gardenId: k.string(),
		workspaceId: k.string(),
		coordinate: qa,
		date: kl
	});
k.object({ id: k.string(), workspaceId: k.string(), coordinate: qa, date: kl });
k.object({
	coordinate: qa.optional(),
	date: kl.optional(),
	workspaceId: k.string().optional(),
	delete: k.boolean().optional()
});
const lx = k.object({
	type: U0.default('RECTANGLE'),
	date: j0,
	scaleFactor: z0.default(1),
	rotation: H0.default(0),
	rectangleLength: W0.default(1),
	rectangleWidth: K0.default(1),
	polygonNumSides: Y0.default(3),
	polygonRadius: X0.default(1),
	ellipseLength: q0.default(1),
	ellipseWidth: Q0.default(1),
	linesCoordinates: J0.default([
		{ x: -1, y: 0 },
		{ x: 0, y: 1 },
		{ x: 1, y: 0 }
	]),
	linesClosed: Z0.default(!0)
});
k.object({
	type: U0.optional(),
	date: j0.optional(),
	scaleFactor: z0.optional(),
	rotation: H0.optional(),
	rectangleLength: W0.optional(),
	rectangleWidth: K0.optional(),
	polygonNumSides: Y0.optional(),
	polygonRadius: X0.optional(),
	ellipseLength: q0.optional(),
	ellipseWidth: Q0.optional(),
	linesCoordinates: J0.optional(),
	linesClosed: Z0.optional(),
	delete: k.boolean().optional()
});
k.object({ gardenId: k.string(), name: F0, description: L0.optional() });
k.object({ name: F0.optional(), description: L0.optional() });
k.object({
	gardenId: k.string(),
	workspaceId: k.string(),
	name: G0,
	description: B0.default(''),
	location: sx,
	geometry: lx,
	depth: V0.default(0)
});
k.object({ name: G0.optional(), description: B0.optional(), depth: V0.optional() });
function Sh(r) {
	switch (r.type) {
		case 'RECTANGLE':
			return (r.rectangleWidth / 2) * r.scaleFactor;
		case 'POLYGON':
			return r.polygonRadius * r.scaleFactor;
		case 'ELLIPSE':
			return (r.ellipseWidth / 2) * r.scaleFactor;
		case 'LINES':
			return Math.max(...r.linesCoordinates.map((e) => e.y)) * r.scaleFactor;
	}
}
const e1 = ['HIDDEN', 'UNLISTED', 'PUBLIC'];
_.Collections({
	...M0,
	cultivarCollections: {
		schema: _.Schema({
			id: _.Id(),
			name: _.String(),
			slug: _.String(),
			visibility: _.String({ enum: [...e1] }),
			userId: _.String(),
			gardenId: _.String(),
			description: _.String({ default: '' }),
			parentId: _.String({ nullable: !0, default: null })
		}),
		relationships: {
			user: _.RelationById('profiles', 'userId'),
			garden: _.RelationById('gardens', '$gardenId'),
			parent: _.RelationById('cultivarCollections', '$parentId')
		},
		permissions: {
			anon: { read: { filter: [['visibility', '!=', 'HIDDEN']] } },
			user: {
				read: {
					filter: [
						G([
							['visibility', '!=', 'HIDDEN'],
							['userId', '=', '$role.profileId'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					filter: [
						G([
							['userId', '=', '$role.profileId'],
							['garden.adminIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					filter: [
						G([
							['userId', '=', '$role.profileId'],
							['garden.adminIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					filter: [
						G([
							['userId', '=', '$role.profileId'],
							['garden.adminIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	},
	cultivars: {
		schema: _.Schema({
			id: _.Id(),
			collectionId: _.String(),
			names: _.Set(_.String()),
			abbreviation: _.String(),
			scientificName: _.Optional(_.String()),
			description: _.String({ default: '' }),
			parentId: _.String({ nullable: !0, default: null }),
			attributes: A0
		}),
		relationships: {
			collection: _.RelationById('cultivarCollections', '$collectionId'),
			parent: _.RelationById('cultivars', '$parentId')
		},
		permissions: {
			anon: { read: { filter: [['collection.visibility', '!=', 'HIDDEN']] } },
			user: {
				read: {
					filter: [
						G([
							['collection.visibility', '!=', 'HIDDEN'],
							['collection.userId', '=', '$role.profileId'],
							['collection.garden.adminIds', 'has', '$role.profileId'],
							['collection.garden.editorIds', 'has', '$role.profileId'],
							['collection.garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					filter: [
						G([
							['collection.userId', '=', '$role.profileId'],
							['collection.garden.adminIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					filter: [
						G([
							['collection.userId', '=', '$role.profileId'],
							['collection.garden.adminIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					filter: [
						G([
							['collection.userId', '=', '$role.profileId'],
							['collection.garden.adminIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	}
});
const cx = k
		.string()
		.trim()
		.min(3, 'Must be at least 3 characters.')
		.max(30, 'May be at most 30 characters.')
		.regex(
			/^[0-9A-Za-z _-]+$/,
			'Must contain only letters, numbers, spaces, hyphens, and underscores.'
		)
		.describe('A common name of this plant species.'),
	dx = k
		.array(cx)
		.min(1, 'Must contain at least 1 name.')
		.max(10, 'May contain at most 10 names.')
		.describe('A set of common names associated with this plant species.'),
	hx = k
		.string()
		.trim()
		.min(1, 'Must be at least 1 character.')
		.max(6, 'May be at most 6 characters.')
		.regex(/^[0-9A-Za-z]+$/, 'Must contain only alphanumeric characters.')
		.describe('A very short abbreviation for this plant species.'),
	ux = k
		.string()
		.trim()
		.max(60, 'May be at most 60 characters.')
		.describe('The scientific name of this plant species.'),
	fx = ft.descriptionSchema.describe('Optional description.'),
	gx = ft.descriptionSchema.describe('The name of the collection.'),
	px = ft.descriptionSchema.describe('Optional description.'),
	mx = k
		.enum(e1)
		.describe(
			'Public collections may be viewed by anyone and are publicly searchable.             Unlisted collections may be viewed by anyone with the link.             Private collections may only be accessed by the creator or members of the associated garden.'
		),
	vx = k
		.string()
		.trim()
		.max(150, 'Must be at most 150 characters.')
		.regex(/^[0-9A-Za-z ]+$/, 'Must contain only alphanumeric characters and spaces.')
		.describe('A metadata tag.'),
	yx = k
		.array(vx)
		.max(150, 'Must contain at most 150 tags.')
		.describe('A set of metadata tags.');
k.object({
	collectionId: k.string(),
	names: dx,
	abbreviation: hx,
	scientificName: ux.optional(),
	description: fx.default(''),
	parentId: k.string().optional()
});
k.object({
	name: gx,
	visibility: mx.default('HIDDEN'),
	description: px.default(''),
	tags: yx.default([]),
	parentId: k.string().optional(),
	gardenId: k.string().optional(),
	userId: k.string().optional()
}).refine((r) => r.gardenId && r.parentId, {
	message: 'A cultivar collection must be connected to a garden or a user..',
	path: ['gardenId', 'userId']
});
const bx = ft.nameSchema.describe('Name of the environment. Must be unique.'),
	_x = ft.descriptionSchema.describe('Optional description.'),
	Sx = k.enum(N0);
k.object({
	gardenId: k.string(),
	parendId: k.string(),
	parentType: Sx.default('GARDEN'),
	name: bx,
	description: _x.default('')
});
function wx(r) {
	switch (r.type) {
		case 'RECTANGLE': {
			const e = r.rectangleLength / 2,
				t = r.rectangleWidth / 2;
			return [
				{ x: -e, y: t },
				{ x: 0, y: t },
				{ x: e, y: t },
				{ x: e, y: 0 },
				{ x: e, y: -t },
				{ x: 0, y: -t },
				{ x: -e, y: -t },
				{ x: -e, y: 0 }
			];
		}
		case 'POLYGON':
			return [{ x: 0, y: r.polygonRadius }];
		case 'ELLIPSE': {
			const e = r.ellipseLength / 2,
				t = r.ellipseWidth / 2;
			return [
				{ x: 0, y: t },
				{ x: e, y: 0 },
				{ x: 0, y: -t },
				{ x: -e, y: 0 }
			];
		}
		case 'LINES':
			return r.linesCoordinates.map((e) => ({ x: e.x, y: e.y }));
	}
}
function Ix(r, e) {
	He(e, !0);
	const t = 2,
		n = Vn(e.canvasId);
	let i = new ke.Group();
	e.geometryGroup.add(i), i.moveToTop();
	let a = [],
		o = e.geometry.type,
		s = 0;
	function l(c) {
		const u = {};
		switch (e.geometry.type) {
			case 'RECTANGLE': {
				if (c % 2 === 0) {
					const f = Math.abs(a[c].x()) * 2,
						g = Math.abs(a[c].y()) * 2;
					(u.rectangleLength = Pt(n.transform.modelDistance(f), t)),
						(u.rectangleWidth = Pt(n.transform.modelDistance(g), t));
				} else if (c === 1 || c === 5) {
					a[c].x(0);
					const f = Math.abs(a[c].y()) * 2;
					u.rectangleWidth = Pt(n.transform.modelDistance(f), t);
				} else {
					a[c].y(0);
					const f = Math.abs(a[c].x()) * 2;
					u.rectangleLength = Pt(n.transform.modelDistance(f), t);
				}
				break;
			}
			case 'POLYGON': {
				a[c].x(0);
				const f = Math.abs(a[c].y());
				u.polygonRadius = Pt(n.transform.modelDistance(f), t);
				break;
			}
			case 'ELLIPSE': {
				if (c % 2 === 0) {
					a[c].x(0);
					const f = Math.abs(a[c].y()) * 2;
					u.ellipseWidth = Pt(n.transform.modelDistance(f), t);
				} else {
					a[c].y(0);
					const f = Math.abs(a[c].x()) * 2;
					u.ellipseLength = Pt(n.transform.modelDistance(f), t);
				}
				break;
			}
			case 'LINES': {
				u.linesCoordinates = a.map((f) => ({
					x: Pt(n.transform.modelXPos(f.x()), t),
					y: Pt(n.transform.modelYPos(f.y()), t)
				}));
				break;
			}
		}
		return u;
	}
	et(() => {
		const c = wx(e.geometry);
		s === 0 || o != e.geometry.type || s != c.length
			? ((a = []),
				i.destroyChildren(),
				c.forEach((u, f) => {
					const g = new ke.Circle({
						radius: 6,
						strokeWidth: 3,
						x: n.transform.canvasXPos(u.x),
						y: n.transform.canvasYPos(u.y),
						draggable: !0,
						stroke: e.strokeColor,
						fill: e.fillColor
					});
					g.on('mouseover', (h) => {
						(document.body.style.cursor = 'grab'), (h.cancelBubble = !0);
					}),
						g.on('mouseout', (h) => {
							(document.body.style.cursor = 'default'), (h.cancelBubble = !0);
						}),
						g.on('dragmove', (h) => {
							e.onTransform && e.onTransform(l(f), !1), (h.cancelBubble = !0);
						}),
						g.on('dragend', (h) => {
							e.onTransform && e.onTransform(l(f), !0), (h.cancelBubble = !0);
						}),
						a.push(g),
						i.add(g);
				}))
			: c.forEach((u, f) => {
					if (a[f])
						a[f].x(n.transform.canvasXPos(u.x)), a[f].y(n.transform.canvasYPos(u.y));
					else throw new Wr('Geometry resize points caught in an invalid state.');
				}),
			i.moveToTop(),
			(o = e.geometry.type),
			(s = c.length);
	}),
		et(() => {
			a.forEach((c) => {
				c.stroke(e.strokeColor), c.fill(e.fillColor);
			});
		}),
		Rh(() => {
			i.destroy();
		}),
		We();
}
function xx(r, e, t = !1, n, i) {
	const a = {
		x: r.transform.canvasXPos(0),
		y: r.transform.canvasYPos(0),
		strokeScaleEnabled: r.transform.strokeScale,
		...n
	};
	switch (e.type) {
		case 'RECTANGLE':
			return new ke.Rect({
				width: r.transform.canvasDistance(e.rectangleLength),
				height: r.transform.canvasDistance(e.rectangleWidth),
				offset: {
					x: r.transform.canvasDistance(e.rectangleLength) / 2,
					y: r.transform.canvasDistance(e.rectangleWidth) / 2
				},
				...a
			});
		case 'POLYGON':
			return new ke.RegularPolygon({
				sides: e.polygonNumSides,
				radius: r.transform.canvasDistance(e.polygonRadius),
				...a
			});
		case 'ELLIPSE':
			return new ke.Ellipse({
				radiusX: r.transform.canvasDistance(e.ellipseLength / 2),
				radiusY: r.transform.canvasDistance(e.ellipseWidth / 2),
				...a
			});
		case 'LINES':
			return new ke.Line({
				points: e.linesCoordinates.reduce(
					(o, s) => (
						o.push(r.transform.canvasXPos(s.x), r.transform.canvasYPos(s.y)), o
					),
					[]
				),
				closed: e.linesClosed || t,
				...a
			});
	}
	throw new Wr('Geometry type undefined.');
}
function Cx(r, e, t, n) {
	return xx(r, e, !0, t);
}
function wh(r, e, t) {
	if (t instanceof ke.Rect)
		e.rectangleLength &&
			(t.width(r.transform.canvasDistance(e.rectangleLength)),
			t.offsetX(r.transform.canvasDistance(e.rectangleLength) / 2)),
			e.rectangleWidth &&
				(t.height(r.transform.canvasDistance(e.rectangleWidth)),
				t.offsetY(r.transform.canvasDistance(e.rectangleWidth) / 2));
	else if (t instanceof ke.RegularPolygon)
		e.polygonNumSides && t.sides(e.polygonNumSides),
			e.polygonRadius && t.radius(r.transform.canvasDistance(e.polygonRadius));
	else if (t instanceof ke.Ellipse)
		e.ellipseLength && t.radiusX(r.transform.canvasDistance(e.ellipseLength / 2)),
			e.ellipseWidth && t.radiusY(r.transform.canvasDistance(e.ellipseWidth / 2));
	else if (t instanceof ke.Line)
		e.linesCoordinates &&
			t.points(
				e.linesCoordinates.reduce(
					(n, i) => (
						n.push(r.transform.canvasXPos(i.x), r.transform.canvasYPos(i.y)), n
					),
					[]
				)
			),
			e.linesClosed && t.closed(e.linesClosed);
	else throw new Wr('Geometry shape of an unsupported type.');
}
function Ex(r, e) {
	He(e, !0);
	let t = Pe(e, 'showName', 3, !0),
		n = Pe(e, 'labelTranslate', 19, () => ({ x: 0, y: 0 }));
	const i = 10,
		a = Vn(e.canvasId),
		o = a.container.getLayer(e.plantingAreaLayerId),
		s = new ke.Group({ draggable: e.editable });
	o.add(s);
	let l = null,
		c = new ke.Text({
			fontFamily: 'sans',
			fontSize: 15,
			opacity: 0.7,
			text: e.name,
			visible: t()
		});
	s.add(c);
	let u = e.geometry.type,
		f = At(() =>
			e.selected ? vt('accent', 8, a.mode.current) : vt('brown', 10, a.mode.current)
		),
		g = At(() =>
			e.selected ? vt('accent', 5, a.mode.current) : vt('brown', 3, a.mode.current)
		),
		h = At(() => (e.selected ? 3 : 2)),
		d = At(() =>
			e.selected ? vt('accent', 11, a.mode.current) : vt('brown', 11, a.mode.current)
		);
	et(() => {
		e.geometry.type !== u || !l
			? (l == null || l.destroy(),
				(l = Cx(a, e.geometry, { stroke: F(f), fill: F(g), strokeWidth: F(h) })),
				l &&
					(s.add(l),
					s.rotation(e.geometry.rotation),
					c.y(a.transform.canvasYPos(Sh(e.geometry) + n().y)),
					c.x(a.transform.canvasXPos(n().x))))
			: (wh(a, e.geometry, l),
				c.y(a.transform.canvasYPos(Sh(e.geometry) + n().y)),
				c.x(a.transform.canvasXPos(n().x))),
			(u = e.geometry.type);
	}),
		et(() => {
			e.position
				? (s.position({
						x: a.transform.canvasXPos(e.position.x),
						y: a.transform.canvasYPos(e.position.y)
					}),
					s.visible(!0))
				: s.visible(!1);
		}),
		et(() => {
			l == null || l.fill(F(g)),
				l == null || l.stroke(F(f)),
				l == null || l.strokeWidth(F(h)),
				c.fill(F(d));
		}),
		et(() => {
			c.text(e.name), c.offsetX(c.width() / 2), c.offsetY(c.height() + i);
		}),
		et(() => {
			e.editable
				? (s.draggable(!0),
					l == null ||
						l.on('mouseover', () => {
							document.body.style.cursor = 'move';
						}),
					l == null ||
						l.on('mouseout', () => {
							a.selectionGroup.setDocumentCursor();
						}),
					s.on('dragmove', () => {
						e.onTranslate && e.onTranslate({ x: s.x(), y: s.y() }, !1);
					}),
					s.on('dragend', () => {
						s.position(a.gridManager.snapToGrid(s.position())),
							e.onTranslate && e.onTranslate({ x: s.x(), y: s.y() }, !0);
					}),
					s.on('pointerclick', () => {
						e.onClick && e.onClick();
					}))
				: (s.draggable(!1), s.off('mouseover mouseout dragmove dragend pointerclick'));
		});
	function m(p, b) {
		l && wh(a, p, l), e.onTransform && e.onTransform(p, b);
	}
	Rh(() => {
		s.destroy();
	});
	var y = Zt(),
		v = ct(y);
	{
		var S = (p) => {
			Ix(p, {
				get canvasId() {
					return e.canvasId;
				},
				get geometry() {
					return e.geometry;
				},
				get strokeColor() {
					return F(f);
				},
				get fillColor() {
					return F(g);
				},
				geometryGroup: s,
				onTransform: m
			});
		};
		kh(v, (p) => {
			e.editable && p(S);
		});
	}
	pe(r, y), We();
}
function Px(r, e) {
	He(e, !0), Vn(e.canvasId).container.addLayer(e.plantingAreaLayerId);
	var n = Zt(),
		i = ct(n);
	Nt(i, () => e.children), pe(r, n), We();
}
function Tx(r) {
	return Object.prototype.toString.call(r) === '[object Object]';
}
function Ih(r) {
	return Tx(r) || Array.isArray(r);
}
function Ox() {
	return !!(typeof window < 'u' && window.document && window.document.createElement);
}
function Rl(r, e) {
	const t = Object.keys(r),
		n = Object.keys(e);
	if (t.length !== n.length) return !1;
	const i = JSON.stringify(Object.keys(r.breakpoints || {})),
		a = JSON.stringify(Object.keys(e.breakpoints || {}));
	return i !== a
		? !1
		: t.every((o) => {
				const s = r[o],
					l = e[o];
				return typeof s == 'function'
					? `${s}` == `${l}`
					: !Ih(s) || !Ih(l)
						? s === l
						: Rl(s, l);
			});
}
function xh(r) {
	return r
		.concat()
		.sort((e, t) => (e.name > t.name ? 1 : -1))
		.map((e) => e.options);
}
function $x(r, e) {
	if (r.length !== e.length) return !1;
	const t = xh(r),
		n = xh(e);
	return t.every((i, a) => {
		const o = n[a];
		return Rl(i, o);
	});
}
function Dl(r) {
	return typeof r == 'number';
}
function js(r) {
	return typeof r == 'string';
}
function Qa(r) {
	return typeof r == 'boolean';
}
function Ch(r) {
	return Object.prototype.toString.call(r) === '[object Object]';
}
function ve(r) {
	return Math.abs(r);
}
function Nl(r) {
	return Math.sign(r);
}
function Pn(r, e) {
	return ve(r - e);
}
function Ax(r, e) {
	if (r === 0 || e === 0 || ve(r) <= ve(e)) return 0;
	const t = Pn(ve(r), ve(e));
	return ve(t / r);
}
function kx(r) {
	return Math.round(r * 100) / 100;
}
function Mn(r) {
	return Fn(r).map(Number);
}
function lt(r) {
	return r[oi(r)];
}
function oi(r) {
	return Math.max(0, r.length - 1);
}
function Ml(r, e) {
	return e === oi(r);
}
function Eh(r, e = 0) {
	return Array.from(Array(r), (t, n) => e + n);
}
function Fn(r) {
	return Object.keys(r);
}
function t1(r, e) {
	return [r, e].reduce(
		(t, n) => (
			Fn(n).forEach((i) => {
				const a = t[i],
					o = n[i],
					s = Ch(a) && Ch(o);
				t[i] = s ? t1(a, o) : o;
			}),
			t
		),
		{}
	);
}
function zs(r, e) {
	return typeof e.MouseEvent < 'u' && r instanceof e.MouseEvent;
}
function Rx(r, e) {
	const t = { start: n, center: i, end: a };
	function n() {
		return 0;
	}
	function i(l) {
		return a(l) / 2;
	}
	function a(l) {
		return e - l;
	}
	function o(l, c) {
		return js(r) ? t[r](l) : r(e, l, c);
	}
	return { measure: o };
}
function Ln() {
	let r = [];
	function e(i, a, o, s = { passive: !0 }) {
		let l;
		if ('addEventListener' in i)
			i.addEventListener(a, o, s), (l = () => i.removeEventListener(a, o, s));
		else {
			const c = i;
			c.addListener(o), (l = () => c.removeListener(o));
		}
		return r.push(l), n;
	}
	function t() {
		r = r.filter((i) => i());
	}
	const n = { add: e, clear: t };
	return n;
}
function Dx(r, e, t, n) {
	const i = Ln(),
		a = 1e3 / 60;
	let o = null,
		s = 0,
		l = 0;
	function c() {
		i.add(r, 'visibilitychange', () => {
			r.hidden && d();
		});
	}
	function u() {
		h(), i.clear();
	}
	function f(y) {
		if (!l) return;
		o || ((o = y), t(), t());
		const v = y - o;
		for (o = y, s += v; s >= a; ) t(), (s -= a);
		const S = s / a;
		n(S), l && (l = e.requestAnimationFrame(f));
	}
	function g() {
		l || (l = e.requestAnimationFrame(f));
	}
	function h() {
		e.cancelAnimationFrame(l), (o = null), (s = 0), (l = 0);
	}
	function d() {
		(o = null), (s = 0);
	}
	return { init: c, destroy: u, start: g, stop: h, update: t, render: n };
}
function Nx(r, e) {
	const t = e === 'rtl',
		n = r === 'y',
		i = n ? 'y' : 'x',
		a = n ? 'x' : 'y',
		o = !n && t ? -1 : 1,
		s = u(),
		l = f();
	function c(d) {
		const { height: m, width: y } = d;
		return n ? m : y;
	}
	function u() {
		return n ? 'top' : t ? 'right' : 'left';
	}
	function f() {
		return n ? 'bottom' : t ? 'left' : 'right';
	}
	function g(d) {
		return d * o;
	}
	return {
		scroll: i,
		cross: a,
		startEdge: s,
		endEdge: l,
		measureSize: c,
		direction: g
	};
}
function br(r = 0, e = 0) {
	const t = ve(r - e);
	function n(c) {
		return c < r;
	}
	function i(c) {
		return c > e;
	}
	function a(c) {
		return n(c) || i(c);
	}
	function o(c) {
		return a(c) ? (n(c) ? r : e) : c;
	}
	function s(c) {
		return t ? c - t * Math.ceil((c - e) / t) : c;
	}
	return {
		length: t,
		max: e,
		min: r,
		constrain: o,
		reachedAny: a,
		reachedMax: i,
		reachedMin: n,
		removeOffset: s
	};
}
function r1(r, e, t) {
	const { constrain: n } = br(0, r),
		i = r + 1;
	let a = o(e);
	function o(g) {
		return t ? ve((i + g) % i) : n(g);
	}
	function s() {
		return a;
	}
	function l(g) {
		return (a = o(g)), f;
	}
	function c(g) {
		return u().set(s() + g);
	}
	function u() {
		return r1(r, s(), t);
	}
	const f = { get: s, set: l, add: c, clone: u };
	return f;
}
function Mx(r, e, t, n, i, a, o, s, l, c, u, f, g, h, d, m, y, v, S) {
	const { cross: p, direction: b } = r,
		x = ['INPUT', 'SELECT', 'TEXTAREA'],
		C = { passive: !1 },
		O = Ln(),
		I = Ln(),
		T = br(50, 225).constrain(h.measure(20)),
		w = { mouse: 300, touch: 400 },
		P = { mouse: 500, touch: 600 },
		$ = d ? 43 : 25;
	let N = !1,
		M = 0,
		R = 0,
		B = !1,
		K = !1,
		te = !1,
		ce = !1;
	function j(D) {
		if (!S) return;
		function q(X) {
			(Qa(S) || S(D, X)) && Ie(X);
		}
		const le = e;
		O.add(le, 'dragstart', (X) => X.preventDefault(), C)
			.add(le, 'touchmove', () => {}, C)
			.add(le, 'touchend', () => {})
			.add(le, 'touchstart', q)
			.add(le, 'mousedown', q)
			.add(le, 'touchcancel', A)
			.add(le, 'contextmenu', A)
			.add(le, 'click', L, !0);
	}
	function ne() {
		O.clear(), I.clear();
	}
	function V() {
		const D = ce ? t : e;
		I.add(D, 'touchmove', E, C)
			.add(D, 'touchend', A)
			.add(D, 'mousemove', E, C)
			.add(D, 'mouseup', A);
	}
	function z(D) {
		const q = D.nodeName || '';
		return x.includes(q);
	}
	function Y() {
		return (d ? P : w)[ce ? 'mouse' : 'touch'];
	}
	function Ae(D, q) {
		const le = f.add(Nl(D) * -1),
			X = u.byDistance(D, !d).distance;
		return d || ve(D) < T ? X : y && q ? X * 0.5 : u.byIndex(le.get(), 0).distance;
	}
	function Ie(D) {
		const q = zs(D, n);
		(ce = q),
			(te = d && q && !D.buttons && N),
			(N = Pn(i.get(), o.get()) >= 2),
			!(q && D.button !== 0) &&
				(z(D.target) ||
					((B = !0),
					a.pointerDown(D),
					c.useFriction(0).useDuration(0),
					i.set(o),
					V(),
					(M = a.readPoint(D)),
					(R = a.readPoint(D, p)),
					g.emit('pointerDown')));
	}
	function E(D) {
		if (!zs(D, n) && D.touches.length >= 2) return A(D);
		const le = a.readPoint(D),
			X = a.readPoint(D, p),
			Ne = Pn(le, M),
			Ce = Pn(X, R);
		if (!K && !ce && (!D.cancelable || ((K = Ne > Ce), !K))) return A(D);
		const Ve = a.pointerMove(D);
		Ne > m && (te = !0),
			c.useFriction(0.3).useDuration(0.75),
			s.start(),
			i.add(b(Ve)),
			D.preventDefault();
	}
	function A(D) {
		const le = u.byDistance(0, !1).index !== f.get(),
			X = a.pointerUp(D) * Y(),
			Ne = Ae(b(X), le),
			Ce = Ax(X, Ne),
			Ve = $ - 10 * Ce,
			Bt = v + Ce / 50;
		(K = !1),
			(B = !1),
			I.clear(),
			c.useDuration(Ve).useFriction(Bt),
			l.distance(Ne, !d),
			(ce = !1),
			g.emit('pointerUp');
	}
	function L(D) {
		te && (D.stopPropagation(), D.preventDefault(), (te = !1));
	}
	function Z() {
		return B;
	}
	return { init: j, destroy: ne, pointerDown: Z };
}
function Fx(r, e) {
	let n, i;
	function a(f) {
		return f.timeStamp;
	}
	function o(f, g) {
		const d = `client${(g || r.scroll) === 'x' ? 'X' : 'Y'}`;
		return (zs(f, e) ? f : f.touches[0])[d];
	}
	function s(f) {
		return (n = f), (i = f), o(f);
	}
	function l(f) {
		const g = o(f) - o(i),
			h = a(f) - a(n) > 170;
		return (i = f), h && (n = f), g;
	}
	function c(f) {
		if (!n || !i) return 0;
		const g = o(i) - o(n),
			h = a(f) - a(n),
			d = a(f) - a(i) > 170,
			m = g / h;
		return h && !d && ve(m) > 0.1 ? m : 0;
	}
	return { pointerDown: s, pointerMove: l, pointerUp: c, readPoint: o };
}
function Lx() {
	function r(t) {
		const { offsetTop: n, offsetLeft: i, offsetWidth: a, offsetHeight: o } = t;
		return { top: n, right: i + a, bottom: n + o, left: i, width: a, height: o };
	}
	return { measure: r };
}
function Gx(r) {
	function e(n) {
		return r * (n / 100);
	}
	return { measure: e };
}
function Bx(r, e, t, n, i, a, o) {
	const s = [r].concat(n);
	let l,
		c,
		u = [],
		f = !1;
	function g(y) {
		return i.measureSize(o.measure(y));
	}
	function h(y) {
		if (!a) return;
		(c = g(r)), (u = n.map(g));
		function v(S) {
			for (const p of S) {
				if (f) return;
				const b = p.target === r,
					x = n.indexOf(p.target),
					C = b ? c : u[x],
					O = g(b ? r : n[x]);
				if (ve(O - C) >= 0.5) {
					y.reInit(), e.emit('resize');
					break;
				}
			}
		}
		(l = new ResizeObserver((S) => {
			(Qa(a) || a(y, S)) && v(S);
		})),
			t.requestAnimationFrame(() => {
				s.forEach((S) => l.observe(S));
			});
	}
	function d() {
		(f = !0), l && l.disconnect();
	}
	return { init: h, destroy: d };
}
function Vx(r, e, t, n, i, a) {
	let o = 0,
		s = 0,
		l = i,
		c = a,
		u = r.get(),
		f = 0;
	function g() {
		const C = n.get() - r.get(),
			O = !l;
		let I = 0;
		return (
			O
				? ((o = 0), t.set(n), r.set(n), (I = C))
				: (t.set(r), (o += C / l), (o *= c), (u += o), r.add(o), (I = u - f)),
			(s = Nl(I)),
			(f = u),
			x
		);
	}
	function h() {
		const C = n.get() - e.get();
		return ve(C) < 0.001;
	}
	function d() {
		return l;
	}
	function m() {
		return s;
	}
	function y() {
		return o;
	}
	function v() {
		return p(i);
	}
	function S() {
		return b(a);
	}
	function p(C) {
		return (l = C), x;
	}
	function b(C) {
		return (c = C), x;
	}
	const x = {
		direction: m,
		duration: d,
		velocity: y,
		seek: g,
		settled: h,
		useBaseFriction: S,
		useBaseDuration: v,
		useFriction: b,
		useDuration: p
	};
	return x;
}
function Ux(r, e, t, n, i) {
	const a = i.measure(10),
		o = i.measure(50),
		s = br(0.1, 0.99);
	let l = !1;
	function c() {
		return !(l || !r.reachedAny(t.get()) || !r.reachedAny(e.get()));
	}
	function u(h) {
		if (!c()) return;
		const d = r.reachedMin(e.get()) ? 'min' : 'max',
			m = ve(r[d] - e.get()),
			y = t.get() - e.get(),
			v = s.constrain(m / o);
		t.subtract(y * v),
			!h &&
				ve(y) < a &&
				(t.set(r.constrain(t.get())), n.useDuration(25).useBaseFriction());
	}
	function f(h) {
		l = !h;
	}
	return { shouldConstrain: c, constrain: u, toggleActive: f };
}
function jx(r, e, t, n, i) {
	const a = br(-e + r, 0),
		o = f(),
		s = u(),
		l = g();
	function c(d, m) {
		return Pn(d, m) <= 1;
	}
	function u() {
		const d = o[0],
			m = lt(o),
			y = o.lastIndexOf(d),
			v = o.indexOf(m) + 1;
		return br(y, v);
	}
	function f() {
		return t
			.map((d, m) => {
				const { min: y, max: v } = a,
					S = a.constrain(d),
					p = !m,
					b = Ml(t, m);
				return p ? v : b || c(y, S) ? y : c(v, S) ? v : S;
			})
			.map((d) => parseFloat(d.toFixed(3)));
	}
	function g() {
		if (e <= r + i) return [a.max];
		if (n === 'keepSnaps') return o;
		const { min: d, max: m } = s;
		return o.slice(d, m);
	}
	return { snapsContained: l, scrollContainLimit: s };
}
function zx(r, e, t) {
	const n = e[0],
		i = t ? n - r : lt(e);
	return { limit: br(i, n) };
}
function Hx(r, e, t, n) {
	const a = e.min + 0.1,
		o = e.max + 0.1,
		{ reachedMin: s, reachedMax: l } = br(a, o);
	function c(g) {
		return g === 1 ? l(t.get()) : g === -1 ? s(t.get()) : !1;
	}
	function u(g) {
		if (!c(g)) return;
		const h = r * (g * -1);
		n.forEach((d) => d.add(h));
	}
	return { loop: u };
}
function Wx(r) {
	const { max: e, length: t } = r;
	function n(a) {
		const o = a - e;
		return t ? o / -t : 0;
	}
	return { get: n };
}
function Kx(r, e, t, n, i) {
	const { startEdge: a, endEdge: o } = r,
		{ groupSlides: s } = i,
		l = f().map(e.measure),
		c = g(),
		u = h();
	function f() {
		return s(n)
			.map((m) => lt(m)[o] - m[0][a])
			.map(ve);
	}
	function g() {
		return n.map((m) => t[a] - m[a]).map((m) => -ve(m));
	}
	function h() {
		return s(c)
			.map((m) => m[0])
			.map((m, y) => m + l[y]);
	}
	return { snaps: c, snapsAligned: u };
}
function Yx(r, e, t, n, i, a) {
	const { groupSlides: o } = i,
		{ min: s, max: l } = n,
		c = u();
	function u() {
		const g = o(a),
			h = !r || e === 'keepSnaps';
		return t.length === 1
			? [a]
			: h
				? g
				: g.slice(s, l).map((d, m, y) => {
						const v = !m,
							S = Ml(y, m);
						if (v) {
							const p = lt(y[0]) + 1;
							return Eh(p);
						}
						if (S) {
							const p = oi(a) - lt(y)[0] + 1;
							return Eh(p, lt(y)[0]);
						}
						return d;
					});
	}
	return { slideRegistry: c };
}
function Xx(r, e, t, n, i) {
	const { reachedAny: a, removeOffset: o, constrain: s } = n;
	function l(d) {
		return d.concat().sort((m, y) => ve(m) - ve(y))[0];
	}
	function c(d) {
		const m = r ? o(d) : s(d),
			y = e
				.map((S, p) => ({ diff: u(S - m, 0), index: p }))
				.sort((S, p) => ve(S.diff) - ve(p.diff)),
			{ index: v } = y[0];
		return { index: v, distance: m };
	}
	function u(d, m) {
		const y = [d, d + t, d - t];
		if (!r) return d;
		if (!m) return l(y);
		const v = y.filter((S) => Nl(S) === m);
		return v.length ? l(v) : lt(y) - t;
	}
	function f(d, m) {
		const y = e[d] - i.get(),
			v = u(y, m);
		return { index: d, distance: v };
	}
	function g(d, m) {
		const y = i.get() + d,
			{ index: v, distance: S } = c(y),
			p = !r && a(y);
		if (!m || p) return { index: v, distance: d };
		const b = e[v] - S,
			x = d + u(b, 0);
		return { index: v, distance: x };
	}
	return { byDistance: g, byIndex: f, shortcut: u };
}
function qx(r, e, t, n, i, a, o) {
	function s(f) {
		const g = f.distance,
			h = f.index !== e.get();
		a.add(g),
			g && (n.duration() ? r.start() : (r.update(), r.render(1), r.update())),
			h && (t.set(e.get()), e.set(f.index), o.emit('select'));
	}
	function l(f, g) {
		const h = i.byDistance(f, g);
		s(h);
	}
	function c(f, g) {
		const h = e.clone().set(f),
			d = i.byIndex(h.get(), g);
		s(d);
	}
	return { distance: l, index: c };
}
function Qx(r, e, t, n, i, a, o, s) {
	const l = { passive: !0, capture: !0 };
	let c = 0;
	function u(h) {
		if (!s) return;
		function d(m) {
			if (new Date().getTime() - c > 10) return;
			o.emit('slideFocusStart'), (r.scrollLeft = 0);
			const S = t.findIndex((p) => p.includes(m));
			Dl(S) && (i.useDuration(0), n.index(S, 0), o.emit('slideFocus'));
		}
		a.add(document, 'keydown', f, !1),
			e.forEach((m, y) => {
				a.add(
					m,
					'focus',
					(v) => {
						(Qa(s) || s(h, v)) && d(y);
					},
					l
				);
			});
	}
	function f(h) {
		h.code === 'Tab' && (c = new Date().getTime());
	}
	return { init: u };
}
function Cn(r) {
	let e = r;
	function t() {
		return e;
	}
	function n(l) {
		e = o(l);
	}
	function i(l) {
		e += o(l);
	}
	function a(l) {
		e -= o(l);
	}
	function o(l) {
		return Dl(l) ? l : l.get();
	}
	return { get: t, set: n, add: i, subtract: a };
}
function n1(r, e) {
	const t = r.scroll === 'x' ? o : s,
		n = e.style;
	let i = null,
		a = !1;
	function o(g) {
		return `translate3d(${g}px,0px,0px)`;
	}
	function s(g) {
		return `translate3d(0px,${g}px,0px)`;
	}
	function l(g) {
		if (a) return;
		const h = kx(r.direction(g));
		h !== i && ((n.transform = t(h)), (i = h));
	}
	function c(g) {
		a = !g;
	}
	function u() {
		a || ((n.transform = ''), e.getAttribute('style') || e.removeAttribute('style'));
	}
	return { clear: u, to: l, toggleActive: c };
}
function Jx(r, e, t, n, i, a, o, s, l) {
	const u = Mn(i),
		f = Mn(i).reverse(),
		g = v().concat(S());
	function h(O, I) {
		return O.reduce((T, w) => T - i[w], I);
	}
	function d(O, I) {
		return O.reduce((T, w) => (h(T, I) > 0 ? T.concat([w]) : T), []);
	}
	function m(O) {
		return a.map((I, T) => ({ start: I - n[T] + 0.5 + O, end: I + e - 0.5 + O }));
	}
	function y(O, I, T) {
		const w = m(I);
		return O.map((P) => {
			const $ = T ? 0 : -t,
				N = T ? t : 0,
				M = T ? 'end' : 'start',
				R = w[P][M];
			return {
				index: P,
				loopPoint: R,
				slideLocation: Cn(-1),
				translate: n1(r, l[P]),
				target: () => (s.get() > R ? $ : N)
			};
		});
	}
	function v() {
		const O = o[0],
			I = d(f, O);
		return y(I, t, !1);
	}
	function S() {
		const O = e - o[0] - 1,
			I = d(u, O);
		return y(I, -t, !0);
	}
	function p() {
		return g.every(({ index: O }) => {
			const I = u.filter((T) => T !== O);
			return h(I, e) <= 0.1;
		});
	}
	function b() {
		g.forEach((O) => {
			const { target: I, translate: T, slideLocation: w } = O,
				P = I();
			P !== w.get() && (T.to(P), w.set(P));
		});
	}
	function x() {
		g.forEach((O) => O.translate.clear());
	}
	return { canLoop: p, clear: x, loop: b, loopPoints: g };
}
function Zx(r, e, t) {
	let n,
		i = !1;
	function a(l) {
		if (!t) return;
		function c(u) {
			for (const f of u)
				if (f.type === 'childList') {
					l.reInit(), e.emit('slidesChanged');
					break;
				}
		}
		(n = new MutationObserver((u) => {
			i || ((Qa(t) || t(l, u)) && c(u));
		})),
			n.observe(r, { childList: !0 });
	}
	function o() {
		n && n.disconnect(), (i = !0);
	}
	return { init: a, destroy: o };
}
function eC(r, e, t, n) {
	const i = {};
	let a = null,
		o = null,
		s,
		l = !1;
	function c() {
		(s = new IntersectionObserver(
			(d) => {
				l ||
					(d.forEach((m) => {
						const y = e.indexOf(m.target);
						i[y] = m;
					}),
					(a = null),
					(o = null),
					t.emit('slidesInView'));
			},
			{ root: r.parentElement, threshold: n }
		)),
			e.forEach((d) => s.observe(d));
	}
	function u() {
		s && s.disconnect(), (l = !0);
	}
	function f(d) {
		return Fn(i).reduce((m, y) => {
			const v = parseInt(y),
				{ isIntersecting: S } = i[v];
			return ((d && S) || (!d && !S)) && m.push(v), m;
		}, []);
	}
	function g(d = !0) {
		if (d && a) return a;
		if (!d && o) return o;
		const m = f(d);
		return d && (a = m), d || (o = m), m;
	}
	return { init: c, destroy: u, get: g };
}
function tC(r, e, t, n, i, a) {
	const { measureSize: o, startEdge: s, endEdge: l } = r,
		c = t[0] && i,
		u = d(),
		f = m(),
		g = t.map(o),
		h = y();
	function d() {
		if (!c) return 0;
		const S = t[0];
		return ve(e[s] - S[s]);
	}
	function m() {
		if (!c) return 0;
		const S = a.getComputedStyle(lt(n));
		return parseFloat(S.getPropertyValue(`margin-${l}`));
	}
	function y() {
		return t
			.map((S, p, b) => {
				const x = !p,
					C = Ml(b, p);
				return x ? g[p] + u : C ? g[p] + f : b[p + 1][s] - S[s];
			})
			.map(ve);
	}
	return { slideSizes: g, slideSizesWithGaps: h, startGap: u, endGap: f };
}
function rC(r, e, t, n, i, a, o, s, l) {
	const { startEdge: c, endEdge: u, direction: f } = r,
		g = Dl(t);
	function h(v, S) {
		return Mn(v)
			.filter((p) => p % S === 0)
			.map((p) => v.slice(p, p + S));
	}
	function d(v) {
		return v.length
			? Mn(v)
					.reduce((S, p, b) => {
						const x = lt(S) || 0,
							C = x === 0,
							O = p === oi(v),
							I = i[c] - a[x][c],
							T = i[c] - a[p][u],
							w = !n && C ? f(o) : 0,
							P = !n && O ? f(s) : 0,
							$ = ve(T - P - (I + w));
						return b && $ > e + l && S.push(p), O && S.push(v.length), S;
					}, [])
					.map((S, p, b) => {
						const x = Math.max(b[p - 1] || 0);
						return v.slice(x, S);
					})
			: [];
	}
	function m(v) {
		return g ? h(v, t) : d(v);
	}
	return { groupSlides: m };
}
function nC(r, e, t, n, i, a, o) {
	const {
			align: s,
			axis: l,
			direction: c,
			startIndex: u,
			loop: f,
			duration: g,
			dragFree: h,
			dragThreshold: d,
			inViewThreshold: m,
			slidesToScroll: y,
			skipSnaps: v,
			containScroll: S,
			watchResize: p,
			watchSlides: b,
			watchDrag: x,
			watchFocus: C
		} = a,
		O = 2,
		I = Lx(),
		T = I.measure(e),
		w = t.map(I.measure),
		P = Nx(l, c),
		$ = P.measureSize(T),
		N = Gx($),
		M = Rx(s, $),
		R = !f && !!S,
		B = f || !!S,
		{
			slideSizes: K,
			slideSizesWithGaps: te,
			startGap: ce,
			endGap: j
		} = tC(P, T, w, t, B, i),
		ne = rC(P, $, y, f, T, w, ce, j, O),
		{ snaps: V, snapsAligned: z } = Kx(P, M, T, w, ne),
		Y = -lt(V) + lt(te),
		{ snapsContained: Ae, scrollContainLimit: Ie } = jx($, Y, z, S, O),
		E = R ? Ae : z,
		{ limit: A } = zx(Y, E, f),
		L = r1(oi(E), u, f),
		Z = L.clone(),
		U = Mn(t),
		D = ({
			dragHandler: $r,
			scrollBody: ro,
			scrollBounds: no,
			options: { loop: si }
		}) => {
			si || no.constrain($r.pointerDown()), ro.seek();
		},
		q = (
			{
				scrollBody: $r,
				translate: ro,
				location: no,
				offsetLocation: si,
				previousLocation: s1,
				scrollLooper: l1,
				slideLooper: c1,
				dragHandler: d1,
				animation: h1,
				eventHandler: Bl,
				scrollBounds: u1,
				options: { loop: Vl }
			},
			Ul
		) => {
			const jl = $r.settled(),
				f1 = !u1.shouldConstrain(),
				zl = Vl ? jl : jl && f1,
				Hl = zl && !d1.pointerDown();
			Hl && h1.stop();
			const g1 = no.get() * Ul + s1.get() * (1 - Ul);
			si.set(g1),
				Vl && (l1.loop($r.direction()), c1.loop()),
				ro.to(si.get()),
				Hl && Bl.emit('settle'),
				zl || Bl.emit('scroll');
		},
		le = Dx(
			n,
			i,
			() => D(to),
			($r) => q(to, $r)
		),
		X = 0.68,
		Ne = E[L.get()],
		Ce = Cn(Ne),
		Ve = Cn(Ne),
		Bt = Cn(Ne),
		lr = Cn(Ne),
		un = Vx(Ce, Bt, Ve, lr, g, X),
		Za = Xx(f, E, Y, A, lr),
		eo = qx(le, L, Z, un, Za, lr, o),
		Fl = Wx(A),
		Ll = Ln(),
		a1 = eC(e, t, o, m),
		{ slideRegistry: Gl } = Yx(R, S, E, Ie, ne, U),
		o1 = Qx(r, t, Gl, eo, un, Ll, o, C),
		to = {
			ownerDocument: n,
			ownerWindow: i,
			eventHandler: o,
			containerRect: T,
			slideRects: w,
			animation: le,
			axis: P,
			dragHandler: Mx(
				P,
				r,
				n,
				i,
				lr,
				Fx(P, i),
				Ce,
				le,
				eo,
				un,
				Za,
				L,
				o,
				N,
				h,
				d,
				v,
				X,
				x
			),
			eventStore: Ll,
			percentOfView: N,
			index: L,
			indexPrevious: Z,
			limit: A,
			location: Ce,
			offsetLocation: Bt,
			previousLocation: Ve,
			options: a,
			resizeHandler: Bx(e, o, i, t, P, p, I),
			scrollBody: un,
			scrollBounds: Ux(A, Bt, lr, un, N),
			scrollLooper: Hx(Y, A, Bt, [Ce, Bt, Ve, lr]),
			scrollProgress: Fl,
			scrollSnapList: E.map(Fl.get),
			scrollSnaps: E,
			scrollTarget: Za,
			scrollTo: eo,
			slideLooper: Jx(P, $, Y, K, te, V, E, Bt, t),
			slideFocus: o1,
			slidesHandler: Zx(e, o, b),
			slidesInView: a1,
			slideIndexes: U,
			slideRegistry: Gl,
			slidesToScroll: ne,
			target: lr,
			translate: n1(P, e)
		};
	return to;
}
function iC() {
	let r = {},
		e;
	function t(c) {
		e = c;
	}
	function n(c) {
		return r[c] || [];
	}
	function i(c) {
		return n(c).forEach((u) => u(e, c)), l;
	}
	function a(c, u) {
		return (r[c] = n(c).concat([u])), l;
	}
	function o(c, u) {
		return (r[c] = n(c).filter((f) => f !== u)), l;
	}
	function s() {
		r = {};
	}
	const l = { init: t, emit: i, off: o, on: a, clear: s };
	return l;
}
const aC = {
	align: 'center',
	axis: 'x',
	container: null,
	slides: null,
	containScroll: 'trimSnaps',
	direction: 'ltr',
	slidesToScroll: 1,
	inViewThreshold: 0,
	breakpoints: {},
	dragFree: !1,
	dragThreshold: 10,
	loop: !1,
	skipSnaps: !1,
	duration: 25,
	startIndex: 0,
	active: !0,
	watchDrag: !0,
	watchResize: !0,
	watchSlides: !0,
	watchFocus: !0
};
function oC(r) {
	function e(a, o) {
		return t1(a, o || {});
	}
	function t(a) {
		const o = a.breakpoints || {},
			s = Fn(o)
				.filter((l) => r.matchMedia(l).matches)
				.map((l) => o[l])
				.reduce((l, c) => e(l, c), {});
		return e(a, s);
	}
	function n(a) {
		return a
			.map((o) => Fn(o.breakpoints || {}))
			.reduce((o, s) => o.concat(s), [])
			.map(r.matchMedia);
	}
	return { mergeOptions: e, optionsAtMedia: t, optionsMediaQueries: n };
}
function sC(r) {
	let e = [];
	function t(a, o) {
		return (
			(e = o.filter(({ options: s }) => r.optionsAtMedia(s).active !== !1)),
			e.forEach((s) => s.init(a, r)),
			o.reduce((s, l) => Object.assign(s, { [l.name]: l }), {})
		);
	}
	function n() {
		e = e.filter((a) => a.destroy());
	}
	return { init: t, destroy: n };
}
function zi(r, e, t) {
	const n = r.ownerDocument,
		i = n.defaultView,
		a = oC(i),
		o = sC(a),
		s = Ln(),
		l = iC(),
		{ mergeOptions: c, optionsAtMedia: u, optionsMediaQueries: f } = a,
		{ on: g, off: h, emit: d } = l,
		m = P;
	let y = !1,
		v,
		S = c(aC, zi.globalOptions),
		p = c(S),
		b = [],
		x,
		C,
		O;
	function I() {
		const { container: U, slides: D } = p;
		C = (js(U) ? r.querySelector(U) : U) || r.children[0];
		const le = js(D) ? C.querySelectorAll(D) : D;
		O = [].slice.call(le || C.children);
	}
	function T(U) {
		const D = nC(r, C, O, n, i, U, l);
		if (U.loop && !D.slideLooper.canLoop()) {
			const q = Object.assign({}, U, { loop: !1 });
			return T(q);
		}
		return D;
	}
	function w(U, D) {
		y ||
			((S = c(S, U)),
			(p = u(S)),
			(b = D || b),
			I(),
			(v = T(p)),
			f([S, ...b.map(({ options: q }) => q)]).forEach((q) => s.add(q, 'change', P)),
			p.active &&
				(v.translate.to(v.location.get()),
				v.animation.init(),
				v.slidesInView.init(),
				v.slideFocus.init(Z),
				v.eventHandler.init(Z),
				v.resizeHandler.init(Z),
				v.slidesHandler.init(Z),
				v.options.loop && v.slideLooper.loop(),
				C.offsetParent && O.length && v.dragHandler.init(Z),
				(x = o.init(Z, b))));
	}
	function P(U, D) {
		const q = ne();
		$(), w(c({ startIndex: q }, U), D), l.emit('reInit');
	}
	function $() {
		v.dragHandler.destroy(),
			v.eventStore.clear(),
			v.translate.clear(),
			v.slideLooper.clear(),
			v.resizeHandler.destroy(),
			v.slidesHandler.destroy(),
			v.slidesInView.destroy(),
			v.animation.destroy(),
			o.destroy(),
			s.clear();
	}
	function N() {
		y || ((y = !0), s.clear(), $(), l.emit('destroy'), l.clear());
	}
	function M(U, D, q) {
		!p.active ||
			y ||
			(v.scrollBody.useBaseFriction().useDuration(D === !0 ? 0 : p.duration),
			v.scrollTo.index(U, q || 0));
	}
	function R(U) {
		const D = v.index.add(1).get();
		M(D, U, -1);
	}
	function B(U) {
		const D = v.index.add(-1).get();
		M(D, U, 1);
	}
	function K() {
		return v.index.add(1).get() !== ne();
	}
	function te() {
		return v.index.add(-1).get() !== ne();
	}
	function ce() {
		return v.scrollSnapList;
	}
	function j() {
		return v.scrollProgress.get(v.offsetLocation.get());
	}
	function ne() {
		return v.index.get();
	}
	function V() {
		return v.indexPrevious.get();
	}
	function z() {
		return v.slidesInView.get();
	}
	function Y() {
		return v.slidesInView.get(!1);
	}
	function Ae() {
		return x;
	}
	function Ie() {
		return v;
	}
	function E() {
		return r;
	}
	function A() {
		return C;
	}
	function L() {
		return O;
	}
	const Z = {
		canScrollNext: K,
		canScrollPrev: te,
		containerNode: A,
		internalEngine: Ie,
		destroy: N,
		off: h,
		on: g,
		emit: d,
		plugins: Ae,
		previousScrollSnap: V,
		reInit: m,
		rootNode: E,
		scrollNext: R,
		scrollPrev: B,
		scrollProgress: j,
		scrollSnapList: ce,
		scrollTo: M,
		selectedScrollSnap: ne,
		slideNodes: L,
		slidesInView: z,
		slidesNotInView: Y
	};
	return w(e, t), setTimeout(() => l.emit('init'), 0), Z;
}
zi.globalOptions = void 0;
function Tn(r, e = { options: {}, plugins: [] }) {
	let t = e,
		n;
	return (
		Ox() &&
			((zi.globalOptions = Tn.globalOptions),
			(n = zi(r, t.options, t.plugins)),
			n.on('init', () => r.dispatchEvent(new CustomEvent('emblaInit', { detail: n })))),
		{
			destroy: () => {
				n && n.destroy();
			},
			update: (i) => {
				const a = !Rl(t.options, i.options),
					o = !$x(t.plugins, i.plugins);
				(!a && !o) || ((t = i), n && n.reInit(t.options, t.plugins));
			}
		}
	);
}
Tn.globalOptions = void 0;
const Hs = Symbol('EMBLA_CAROUSEL_CONTEXT');
function lC(r) {
	return Oh(Hs, r), r;
}
function Ja(r = 'This component') {
	if (!M1(Hs)) throw new Error(`${r} must be used within a <Carousel.Root> component`);
	return Vn(Hs);
}
var cC = wt('<div class="h-full w-full overflow-hidden"><div><!></div></div>');
function dC(r, e) {
	He(e, !0);
	let t = Pe(e, 'ref', 15, null),
		n = er(e, ['$$slots', '$$events', '$$legacy', 'ref', 'class', 'children']);
	const i = Ja('<Carousel.Content/>');
	var a = cC(),
		o = ge(a);
	let s;
	var l = ge(o);
	Nt(l, () => e.children ?? _r),
		fe(o),
		Ks(
			o,
			(c) => t(c),
			() => t()
		),
		fe(a),
		z1(
			a,
			(c, u) => (Tn == null ? void 0 : Tn(c, u)),
			() => ({
				options: {
					container: '[data-embla-container]',
					slides: '[data-embla-slide]',
					...i.options,
					axis: i.orientation === 'horizontal' ? 'x' : 'y'
				},
				plugins: i.plugins
			})
		),
		Ws(() =>
			b1('emblaInit', a, function (...c) {
				var u;
				(u = i.onInit) == null || u.apply(this, c);
			})
		),
		Dt(
			(c) => (s = On(o, s, { class: c, 'data-embla-container': '', ...n })),
			[
				() =>
					Sr(
						'flex',
						i.orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
						e.class
					)
			]
		),
		pe(r, a),
		We();
}
var hC = wt('<div><!></div>');
function uC(r, e) {
	He(e, !0);
	let t = Pe(e, 'ref', 15, null),
		n = er(e, ['$$slots', '$$events', '$$legacy', 'ref', 'class', 'children']);
	const i = Ja('<Carousel.Item/>');
	var a = hC();
	let o;
	var s = ge(a);
	Nt(s, () => e.children ?? _r),
		fe(a),
		Ks(
			a,
			(l) => t(l),
			() => t()
		),
		Dt(
			(l) =>
				(o = On(a, o, {
					role: 'group',
					'aria-roledescription': 'slide',
					class: l,
					'data-embla-slide': '',
					...n
				})),
			[
				() =>
					Sr(
						'min-w-0 shrink-0 grow-0 basis-full',
						i.orientation === 'horizontal' ? 'pl-4' : 'pt-4',
						e.class
					)
			]
		),
		pe(r, a),
		We();
}
/**
 * @license @lucide/svelte v0.510.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */ const fC = {
	xmlns: 'http://www.w3.org/2000/svg',
	width: 24,
	height: 24,
	viewBox: '0 0 24 24',
	fill: 'none',
	stroke: 'currentColor',
	'stroke-width': 2,
	'stroke-linecap': 'round',
	'stroke-linejoin': 'round'
};
var gC = _1('<svg><!><!></svg>');
function i1(r, e) {
	He(e, !0);
	const t = Pe(e, 'color', 3, 'currentColor'),
		n = Pe(e, 'size', 3, 24),
		i = Pe(e, 'strokeWidth', 3, 2),
		a = Pe(e, 'absoluteStrokeWidth', 3, !1),
		o = Pe(e, 'iconNode', 19, () => []),
		s = er(e, [
			'$$slots',
			'$$events',
			'$$legacy',
			'name',
			'color',
			'size',
			'strokeWidth',
			'absoluteStrokeWidth',
			'iconNode',
			'children'
		]);
	var l = gC();
	let c;
	var u = ge(l);
	Un(u, 17, o, jn, (g, h) => {
		let d = () => F(h)[0],
			m = () => F(h)[1];
		var y = Zt(),
			v = ct(y);
		j1(v, d, !0, (S, p) => {
			let b;
			Dt(() => (b = On(S, b, { ...m() })));
		}),
			pe(g, y);
	});
	var f = Fe(u);
	Nt(f, () => e.children ?? _r),
		fe(l),
		Dt(
			(g) =>
				(c = On(l, c, {
					...fC,
					...s,
					width: n(),
					height: n(),
					stroke: t(),
					'stroke-width': g,
					class: ['lucide-icon lucide', e.name && `lucide-${e.name}`, e.class]
				})),
			[() => (a() ? (Number(i()) * 24) / Number(n()) : i())]
		),
		pe(r, l),
		We();
}
function pC(r, e) {
	He(e, !0);
	let t = er(e, ['$$slots', '$$events', '$$legacy']);
	i1(
		r,
		Ki({ name: 'arrow-right' }, () => t, {
			iconNode: [
				['path', { d: 'M5 12h14' }],
				['path', { d: 'm12 5 7 7-7 7' }]
			],
			children: (i, a) => {
				var o = Zt(),
					s = ct(o);
				Nt(s, () => e.children ?? _r), pe(i, o);
			},
			$$slots: { default: !0 }
		})
	),
		We();
}
var mC = wt('<!> <span class="sr-only">Next slide</span>', 1);
function vC(r, e) {
	He(e, !0);
	let t = Pe(e, 'ref', 15, null),
		n = Pe(e, 'variant', 3, 'outline'),
		i = Pe(e, 'size', 3, 'icon'),
		a = er(e, ['$$slots', '$$events', '$$legacy', 'ref', 'class', 'variant', 'size']);
	const o = Ja('<Carousel.Next/>'),
		s = At(() =>
			Sr(
				'absolute size-8 touch-manipulation rounded-full',
				o.orientation === 'horizontal'
					? '-right-12 top-1/2 -translate-y-1/2'
					: '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
				e.class
			)
		),
		l = At(() => !o.canScrollNext);
	gr(
		r,
		Ki(
			{
				get variant() {
					return n();
				},
				get size() {
					return i();
				},
				get class() {
					return F(s);
				},
				get disabled() {
					return F(l);
				},
				get onclick() {
					return o.scrollNext;
				},
				get onkeydown() {
					return o.handleKeyDown;
				}
			},
			() => a,
			{
				get ref() {
					return t();
				},
				set ref(c) {
					t(c);
				},
				children: (c, u) => {
					var f = mC(),
						g = ct(f);
					pC(g, { class: 'size-4' }), fr(2), pe(c, f);
				},
				$$slots: { default: !0 }
			}
		)
	),
		We();
}
function yC(r, e) {
	He(e, !0);
	let t = er(e, ['$$slots', '$$events', '$$legacy']);
	i1(
		r,
		Ki({ name: 'arrow-left' }, () => t, {
			iconNode: [
				['path', { d: 'm12 19-7-7 7-7' }],
				['path', { d: 'M19 12H5' }]
			],
			children: (i, a) => {
				var o = Zt(),
					s = ct(o);
				Nt(s, () => e.children ?? _r), pe(i, o);
			},
			$$slots: { default: !0 }
		})
	),
		We();
}
var bC = wt('<!> <span class="sr-only">Previous slide</span>', 1);
function _C(r, e) {
	He(e, !0);
	let t = Pe(e, 'ref', 15, null),
		n = Pe(e, 'variant', 3, 'outline'),
		i = Pe(e, 'size', 3, 'icon'),
		a = er(e, ['$$slots', '$$events', '$$legacy', 'ref', 'class', 'variant', 'size']);
	const o = Ja('<Carousel.Previous/>'),
		s = At(() =>
			Sr(
				'absolute size-8 touch-manipulation rounded-full',
				o.orientation === 'horizontal'
					? '-left-12 top-1/2 -translate-y-1/2'
					: '-top-12 left-1/2 -translate-x-1/2 rotate-90',
				e.class
			)
		),
		l = At(() => !o.canScrollPrev);
	gr(
		r,
		Ki(
			{
				get variant() {
					return n();
				},
				get size() {
					return i();
				},
				get class() {
					return F(s);
				},
				get disabled() {
					return F(l);
				},
				get onclick() {
					return o.scrollPrev;
				},
				get onkeydown() {
					return o.handleKeyDown;
				}
			},
			() => a,
			{
				get ref() {
					return t();
				},
				set ref(c) {
					t(c);
				},
				children: (c, u) => {
					var f = bC(),
						g = ct(f);
					yC(g, { class: 'size-4' }), fr(2), pe(c, f);
				},
				$$slots: { default: !0 }
			}
		)
	),
		We();
}
var SC = wt('<div><!></div>');
function wC(r, e) {
	He(e, !0);
	let t = Pe(e, 'opts', 19, () => ({})),
		n = Pe(e, 'plugins', 19, () => []),
		i = Pe(e, 'setApi', 3, () => {}),
		a = Pe(e, 'orientation', 3, 'horizontal'),
		o = er(e, [
			'$$slots',
			'$$events',
			'$$legacy',
			'opts',
			'plugins',
			'setApi',
			'orientation',
			'class',
			'children'
		]),
		s = ls({
			api: void 0,
			scrollPrev: l,
			scrollNext: c,
			orientation: a(),
			canScrollNext: !1,
			canScrollPrev: !1,
			handleKeyDown: g,
			options: t(),
			plugins: n(),
			onInit: h,
			scrollSnaps: [],
			selectedIndex: 0,
			scrollTo: u
		});
	lC(s);
	function l() {
		var v;
		(v = s.api) == null || v.scrollPrev();
	}
	function c() {
		var v;
		(v = s.api) == null || v.scrollNext();
	}
	function u(v, S) {
		var p;
		(p = s.api) == null || p.scrollTo(v, S);
	}
	function f(v) {
		v &&
			((s.canScrollPrev = v.canScrollPrev()),
			(s.canScrollNext = v.canScrollNext()),
			(s.selectedIndex = v.selectedScrollSnap()));
	}
	et(() => {
		s.api && (f(s.api), s.api.on('select', f), s.api.on('reInit', f));
	});
	function g(v) {
		v.key === 'ArrowLeft'
			? (v.preventDefault(), l())
			: v.key === 'ArrowRight' && (v.preventDefault(), c());
	}
	et(() => {
		i()(s.api);
	});
	function h(v) {
		(s.api = v.detail), (s.scrollSnaps = s.api.scrollSnapList());
	}
	et(() => () => {
		var v;
		(v = s.api) == null || v.off('select', f);
	});
	var d = SC();
	let m;
	var y = ge(d);
	Nt(y, () => e.children ?? _r),
		fe(d),
		Dt(
			(v) =>
				(m = On(d, m, {
					class: v,
					role: 'region',
					'aria-roledescription': 'carousel',
					...o
				})),
			[() => Sr('relative', e.class)]
		),
		pe(r, d),
		We();
}
const IC = (r) => {};
function xC(r, e) {
	He(e, !1);
	const t = Wv('workspaceGeometryCanvasId', 'none', In, !1, !1);
	t.container.pixelsPerMeter = 1;
	const n = t.canvasId;
	Oh(n, t);
	let i = 1 / 0,
		a = 1 / 0,
		o = -1 / 0,
		s = -1 / 0;
	t.container.addResizeFunction(() => {
		var h;
		(t.transform.position = { x: t.container.width / 2, y: t.container.height / 2 }),
			(h = t.container.stage) == null ||
				h.getChildren().forEach((d) => {
					d.getChildren().forEach((m) => {
						const y = m.getClientRect();
						[
							{ x: y.x, y: y.y },
							{ x: y.x + y.width, y: y.y },
							{ x: y.x, y: y.y + y.height },
							{ x: y.x + y.width, y: y.y + y.height }
						].forEach((S) => {
							S.x < i && (i = S.x),
								S.y < a && (a = S.y),
								S.x > o && (o = S.x),
								S.y > s && (s = S.y);
						});
					});
				});
		const f = o - i,
			g = s - a;
		console.log(f),
			console.log(g),
			(t.transform.scaleFactor = {
				x: t.container.width / f - 0.3,
				y: t.container.width / f - 0.3
			});
	});
	const l = 'plantingAreas';
	function c(f) {
		return {
			type: f,
			rectangleLength: 100,
			rectangleWidth: 180,
			ellipseWidth: 100,
			ellipseLength: 180,
			polygonRadius: 29,
			polygonNumSides: 3,
			rotation: 0,
			scaleFactor: 1,
			linesClosed: !0,
			linesCoordinates: [
				{ x: 280, y: 0 },
				{ x: 180, y: 0 },
				{ x: 180, y: -100 },
				{ x: -270, y: -100 },
				{ x: -270, y: -160 },
				{ x: 280, y: -160 }
			]
		};
	}
	const u = [
		{ name: 'Garden Bed 1', position: { x: -220, y: 50 }, geometry: c('RECTANGLE') },
		{ name: 'Garden Bed 2', position: { x: -50, y: 50 }, geometry: c('RECTANGLE') },
		{ name: 'Garden Bed 3', position: { x: 200, y: 100 }, geometry: c('ELLIPSE') },
		{
			name: 'Garden Bed 4',
			position: { x: 0.5, y: 0.3 },
			geometry: c('LINES'),
			labelTranslate: { x: 0, y: -100 }
		}
	];
	Ph(),
		K1(r, {
			canvasId: n,
			overlay: IC,
			children: (f, g) => {
				Px(f, {
					canvasId: n,
					plantingAreaLayerId: l,
					children: (h, d) => {
						var m = Zt(),
							y = ct(m);
						Un(
							y,
							1,
							() => u,
							jn,
							(v, S) => {
								Ex(v, {
									canvasId: n,
									plantingAreaLayerId: l,
									get name() {
										return F(S).name;
									},
									showName: !0,
									get position() {
										return F(S).position;
									},
									get geometry() {
										return F(S).geometry;
									},
									editable: !1,
									selected: !1,
									get labelTranslate() {
										return F(S).labelTranslate;
									}
								});
							}
						),
							pe(h, m);
					},
					$$slots: { default: !0 }
				});
			},
			$$slots: { default: !0 }
		}),
		We();
}
const CC = [
	{
		name: 'Planting Areas',
		description: 'Garden beds, areas, and any geometry can be flexibly represented.',
		component: xC
	}
];
var EC = wt('<!> <!> <!>', 1);
function PC(r) {
	wC(r, {
		class: 'h-full w-full',
		children: (e, t) => {
			var n = EC(),
				i = ct(n);
			dC(i, {
				class: 'h-full w-full',
				children: (s, l) => {
					var c = Zt(),
						u = ct(c);
					Un(
						u,
						1,
						() => CC,
						jn,
						(f, g) => {
							uC(f, {
								class: 'h-full w-full',
								children: (h, d) => {
									F(g).component(h, {});
								},
								$$slots: { default: !0 }
							});
						}
					),
						pe(s, c);
				},
				$$slots: { default: !0 }
			});
			var a = Fe(i, 2);
			_C(a, {});
			var o = Fe(a, 2);
			vC(o, {}), pe(e, n);
		},
		$$slots: { default: !0 }
	});
}
const TC = (r, e = _r) => {
	var t = $C(),
		n = ge(t),
		i = ge(n),
		a = ge(i, !0);
	fe(i);
	var o = Fe(i, 2);
	Un(
		o,
		5,
		() => e().points,
		jn,
		(u, f) => {
			var g = OC(),
				h = ge(g, !0);
			fe(g), Dt(() => Ql(h, F(f))), pe(u, g);
		}
	),
		fe(o),
		fe(n);
	var s = Fe(n, 2),
		l = ge(s);
	const c = cs(() => e().iconClass || '');
	B1(l, {
		get icon() {
			return e().icon;
		},
		width: '6rem',
		get class() {
			return F(c);
		}
	}),
		fe(s),
		fe(t),
		Dt(
			(u) => {
				Ql(a, e().title), Ah(s, 1, u);
			},
			[
				() =>
					$h(
						Sr(
							e().iconContainerClass,
							'ml-6 flex items-center justify-center rounded-lg border p-4'
						)
					)
			],
			cs
		),
		pe(r, t);
};
var OC = wt('<li class="text-neutral-11 text-sm"> </li>'),
	$C = wt(
		'<div class="mt-8 flex justify-between"><div class="flex h-full flex-col"><h3 class="text-neutral-12 w-full text-lg font-semibold"> </h3> <ul class="mt-4 flex list-disc flex-col gap-4 rounded-lg p-4"></ul></div> <div><!></div></div>'
	),
	AC =
		wt(`<div class="flex h-full w-full justify-center"><div class="flex w-11/12 flex-col md:w-5/6 lg:w-3/4 2xl:w-1/2"><div class="mt-12 flex w-full items-center justify-between"><h1 class="text-left text-3xl font-bold">Eco-modelling tools for collaboratively organized agriculture</h1> <div class="ml-8"><!></div></div> <div class="mt-8 flex justify-between gap-4"><!> <!></div> <div class="border-neutral-6 bg-neutral-2 mt-6 aspect-video w-full rounded-lg border shadow-md"><!></div> <div class="mt-8 flex w-full flex-col gap-6"><div class="flex items-center justify-between"><h2 class="text-neutral-11 font-semibold">Project status:</h2> <div class="bg-neutral-6 mx-8 h-[1px] grow rounded-lg"></div> <span>Early development</span></div> <div class="mt-4 flex flex-col gap-4"><!></div> <div class="bg-neutral-6 mt-4 h-[1px] grow rounded-lg"></div> <div class="mt-4 flex flex-col gap-8"><p class="text-neutral-11 italic">Verdagraph is a collection of open source tools that seek to empower the
					collaborative planning, tracking, and automation of agro-ecological systems.
					It currently consists of a garden productivity application and a smart
					irrigation controller.</p> <!></div></div> <div class="mt-12 flex justify-between gap-4"><!> <!></div></div></div>`);
function HC(r, e) {
	He(e, !1);
	const t = [
			{
				title: 'A garden productivity tool and agro-ecological model',
				points: [
					'Maximize the use of space by simulating plants throughout space and time',
					'Tune recommendations for starting plants to local environmental conditions',
					'Compare multiple plans against estimated metrics of yield and eco benefit'
				],
				icon: 'mdi:plant-outline',
				iconContainerClass: 'bg-primary-8 border-primary-10',
				iconClass: 'text-primary-1'
			},
			{
				title:
					'A community hub for the coordination of labour and the distribution of produce',
				points: [
					'Edit gardens with other users in real time',
					'Generate tasks and assign responsibilities',
					'Record harvests and notify subscribers'
				],
				icon: 'mdi:handshake-outline',
				iconContainerClass: 'bg-secondary-8 border-secondary-10',
				iconClass: 'text-secondary-1'
			},
			{
				title:
					'An interface for external devices to send data to and receive commands from',
				points: [
					'Use environmental data to inform planning and update the model',
					'Use the model to intelligently control outputs such as irrigation'
				],
				icon: 'ant-design:control-outlined',
				iconContainerClass: 'bg-accent-8 border-accent-10',
				iconClass: 'text-accent-1'
			}
		],
		n = 'bg-crimson-5 border-crimson-6 text-crimson-12';
	Ph();
	var i = AC();
	S1((I) => {
		F1.title =
			'Verdagraph - Eco-modelling tools for collaboratively organized agriculture';
	});
	var a = ge(i),
		o = ge(a),
		s = Fe(ge(o), 2),
		l = ge(s);
	U1(l, { size: '8rem' }), fe(s), fe(o);
	var c = Fe(o, 2),
		u = ge(c);
	gr(u, {
		variant: 'default',
		href: '/demo',
		class: 'w-full',
		children: (I, T) => {
			fr();
			var w = fn('Try the Demonstration');
			pe(I, w);
		},
		$$slots: { default: !0 }
	});
	var f = Fe(u, 2);
	gr(f, {
		variant: 'default',
		get href() {
			return Jl.APP_URL;
		},
		class: 'w-full',
		children: (I, T) => {
			fr();
			var w = fn('Get Started');
			pe(I, w);
		},
		$$slots: { default: !0 }
	}),
		fe(c);
	var g = Fe(c, 2),
		h = ge(g);
	PC(h), fe(g);
	var d = Fe(g, 2),
		m = ge(d),
		y = Fe(ge(m), 4);
	fe(m);
	var v = Fe(m, 2),
		S = ge(v);
	gr(S, {
		variant: 'secondary',
		get href() {
			return Jl.NEWSLETTER_URL;
		},
		class: 'w-full',
		children: (I, T) => {
			fr();
			var w = fn('Join the newsletter for new features and progress updates');
			pe(I, w);
		},
		$$slots: { default: !0 }
	}),
		fe(v);
	var p = Fe(v, 4),
		b = Fe(ge(p), 2);
	Un(
		b,
		1,
		() => t,
		jn,
		(I, T) => {
			TC(I, () => F(T));
		}
	),
		fe(p),
		fe(d);
	var x = Fe(d, 2),
		C = ge(x);
	gr(C, {
		variant: 'outline',
		href: '/about',
		class: 'w-full',
		children: (I, T) => {
			fr();
			var w = fn('Read More');
			pe(I, w);
		},
		$$slots: { default: !0 }
	});
	var O = Fe(C, 2);
	gr(O, {
		variant: 'outline',
		href: '/support',
		class: 'w-full',
		children: (I, T) => {
			fr();
			var w = fn('Support the Project');
			pe(I, w);
		},
		$$slots: { default: !0 }
	}),
		fe(x),
		fe(a),
		fe(i),
		Dt(
			(I) => Ah(y, 1, I),
			[() => $h(Sr(n, 'rounded-lg border px-4 py-2 text-sm'))],
			cs
		),
		pe(r, i),
		We();
}
export { HC as component };
