/**
 * pages.mjs — one function per page, following the mockups in
 * bagdrop-handoff/design section by section.
 */
import { COPY, company, product, placeholders, esc, money, tFor, hrefFor, thb } from './render.mjs';
import {
  icon, eyebrow, btn, link, statusLine, row, paymentMarks, accordion,
  illustration, lockerIllustration, floorPlan, whatFits, priceCapChart, emptyLocker, kiosk, profileDoc, monogram,
} from './components.mjs';

const ph = placeholders;
const wrap = (inner, cls = '') => `<div class="wrap${cls ? ' ' + cls : ''}">${inner}</div>`;
const section = (cls, inner, wrapCls = '') => `<section class="section ${cls}">${wrap(inner, wrapCls)}</section>`;

/** Section head: eyebrow + heading (+ lead) (+ link on the right). */
function head({ eyebrow: e, h2, lead, cls = 'h2', link: l, mod = '', leadCls = 'lead', max = 'measure' }) {
  const text = `<div class="sec-head__text ${max}">${eyebrow(e, mod)}<h2 class="${cls}">${esc(h2)}</h2>${lead ? `<p class="${leadCls}">${esc(lead)}</p>` : ''}</div>`;
  return `<div class="sec-head${l ? ' sec-head--row' : ''}">${text}${l || ''}</div>`;
}

/** "Who it's for" cards: the scene behind each one. Decorative — the heading says it. */
const WHO_IMG = { flight: 'whoFlight', shopping: 'whoShopping', evening: 'whoEvening' };

const priceRow = (k, v) => `<div class="row"><span>${esc(k)}</span><span class="num row__v">${esc(v)}</span></div>`;

/* ---------------------------------------------------------------- HOME */
export function home(lang) {
  const c = COPY[lang], p = c.home, t = tFor(lang), m = (n) => money(lang, n);
  const price = product.price;
  const locker = { ...c.diagrams.locker };
  const im = c.diagrams.images;

  /* 1 — Hero + fact strip */
  const facts = p.facts.map((f) => `<div class="fact"><span class="ic">${icon(f.icon)}</span><div><div class="fact__h"><span class="hide-m">${esc(f.h)}</span><span class="hide-d">${esc(f.hShort || f.h)}</span></div><div class="fact__s">${esc(f.s)}</div></div></div>`).join('');
  const hero = `<section class="hero-sec">${wrap(`
<div class="hero">
  ${eyebrow(p.eyebrow)}
  <h1 class="h1">${esc(p.h1)}</h1>
  <p class="lead"><span class="hide-m">${esc(p.lead)}</span><span class="hide-d">${esc(p.leadShort)}</span></p>
  <div class="chip"><span class="num">${esc(m(price.hourly))}</span><span class="small">${esc(c.ui.perHour)}</span><span class="chip__sep" aria-hidden="true"></span><span class="num"><span class="hide-m">${esc(m(price.dailyCap))}</span><span class="hide-d">${thb(price.dailyCap)}</span></span><span class="small"><span class="hide-m">${esc(c.ui.maxPerDay)}</span><span class="hide-d">${esc(c.ui.maxPerDayShort)}</span></span></div>
  <div class="btn-row">${btn(t(c.ui.lineChat), company.lineUrl, 'primary', { rel: 'noopener' })}${btn(c.ui.howItWorks, hrefFor(lang, 'how'), 'outline')}</div>
  <div class="status-wrap"><span class="hide-m">${statusLine(c.statusNow)}</span><span class="hide-d">${statusLine(c.statusShort)}</span></div>
  <div class="fig fig--tall fig--cover">${illustration('hero', { alt: im.hero, tag: im.tag, eager: true, sizes: '(min-width: 64rem) 44vw, 100vw' })}</div>
</div>
<div class="facts">${facts}</div>`)}</section>`;

  /* 2 — Statement band */
  const statement = `<section class="section--teal section--s statement-sec">${wrap(`<div class="statement"><p class="statement__text">${esc(p.statement)}</p><p class="statement__tag">${esc(t(p.statementTag))}</p></div>`)}</section>`;

  /* 3 — Pricing */
  const pr = p.pricing;
  const exRows = pr.rows.map((r) => priceRow(r.k, m(Math.min(r.hours * price.hourly, price.dailyCap)))).join('');
  const pricing = section('', `
<div class="stack stack--xl">
${head({ eyebrow: pr.eyebrow, h2: pr.h2, link: link(c.ui.fullPricing, hrefFor(lang, 'pricing')) })}
<div class="grid grid--3">
  <div class="price price--ink"><div class="price__side"><span class="price__label">${esc(pr.perHour)}</span><span class="price__fig"><span class="num price__num">${thb(price.hourly)}</span><span class="price__cur hide-m">${lang === 'th' ? 'บาท' : 'THB'}</span></span><span class="price__note">${esc(pr.perHourNote)}</span></div><span class="price__cur hide-d">${lang === 'th' ? 'บาท' : 'THB'}</span></div>
  <div class="price price--pale"><div class="price__side"><span class="price__label">${esc(pr.dailyMax)}</span><span class="price__fig"><span class="num price__num">${thb(price.dailyCap)}</span><span class="price__cur hide-m">${lang === 'th' ? 'บาท' : 'THB'}</span></span><span class="price__note">${esc(pr.dailyMaxNote)}</span></div><span class="price__cur hide-d">${lang === 'th' ? 'บาท' : 'THB'}</span></div>
  <div class="card card--l hide-m examples">${eyebrow(pr.examples)}<div class="rows rows--ex">${exRows}</div><div style="margin-top:auto">${paymentMarks(ph.paymentMarks)}</div></div>
  <div class="hide-d">${paymentMarks(ph.paymentMarks)}</div>
</div>
<p class="bullets hide-m">${pr.bullets.map((b) => `<span>${esc(b)}</span>`).join('<span class="bullets__sep" aria-hidden="true">·</span>')}</p>
<p class="strong hide-d" style="font-size:.875rem">${esc(pr.bulletsShort)}</p>
</div>`);

  /* 4 — How it works */
  const hw = p.how;
  const steps = hw.steps.map((s) => `<div class="journey__step"><span class="journey__ico${s.on ? ' journey__ico--on' : ''}">${icon(s.icon, { stroke: 1.5 })}</span><div class="journey__body"><span class="journey__n num">${esc(s.n)}</span><h3 class="h3">${esc(s.h)}</h3><p class="body journey__p-l">${esc(s.p)}</p><p class="body journey__p-s" style="font-size:.9375rem">${esc(s.short)}</p></div></div>`).join('');
  const kioskArgs = { s: c.diagrams.app, app: ph.app, money: m, lang, t };
  const kiosks = ['store', 'pay', 'open'].map((k, i) => `<div class="kiosk-wrap${i < 2 ? ' hide-m' : ''}">${kiosk(k, kioskArgs)}<p class="kiosk-cap"><strong>${esc(hw.screens[i].n)}</strong> ${esc(hw.screens[i].p)}</p></div>`).join('');
  const how = section('section--warm', `
<div class="stack stack--xl">
${head({ eyebrow: hw.eyebrow, h2: hw.h2, lead: hw.lead, link: link(c.ui.walkthrough, hrefFor(lang, 'how')) })}
<div class="journey">${steps}</div>
<div class="kiosks">${kiosks}</div>
</div>`);

  /* 5 — Who it's for */
  const who = section('', `
<div class="stack stack--xl">
${head({ eyebrow: p.who.eyebrow, h2: p.who.h2 })}
<div class="grid grid--3">${p.who.cards.map((k) => `<div class="card card--l who"><div class="card__ill${k.warm ? ' card__ill--warm' : ''} hide-m">${illustration(WHO_IMG[k.spot], { sizes: '24rem' })}</div><div class="who__row"><span class="ic ic--l hide-d">${icon(k.icon, { stroke: 1.6 })}</span><div class="stack stack--s"><h3 class="h3">${esc(k.h)}</h3><p class="body"><span class="hide-m">${esc(k.p)}</span><span class="hide-d">${esc(k.short)}</span></p></div></div></div>`).join('')}</div>
</div>`);

  /* 6 — The unit */
  const un = p.unit;
  const unitRows = un.rows.map((r) => {
    const cls = r.mobileOnly ? ' hide-d' : r.desktopOnly ? ' hide-m' : '';
    const v = r.langs ? 'English · <span lang="th">ไทย</span> · <span lang="zh-Hans">中文</span>' : r.vShort ? `<span class="hide-m">${esc(r.v)}</span><span class="hide-d">${esc(r.vShort)}</span>` : esc(r.v);
    return `<div class="row${cls}"><span class="row__k">${esc(r.k)}</span><span class="row__v">${v}</span></div>`;
  }).join('');
  const unit = section('section--pale', `
<div class="grid grid--12 center">
  <div class="c1-7 fig fig--white fig--tall hide-m">${lockerIllustration({ labels: locker, callouts: true, id: 'unit', draw: true })}</div>
  <div class="c9-12 stack stack--l">${eyebrow(un.eyebrow)}<h2 class="h2 h2--s">${esc(un.h2)}</h2><p class="body hide-m">${esc(un.p)}</p><div class="rows rows--pale">${unitRows}</div></div>
</div>`);

  /* 7 — What fits */
  const ft = p.fits;
  const fitsLabels = Object.fromEntries(Object.entries(c.diagrams.fits).map(([k, v]) => [k, t(v)]));
  const fits = section('', `
<div class="grid grid--12 center">
  <div class="c1-5 stack stack--l">${eyebrow(ft.eyebrow)}<h2 class="h2 h2--s">${esc(ft.h2)}</h2><p class="body">${esc(ft.p)}</p>
    <div class="tiles">${ft.tiles.map((x) => `<div class="tile tile--fill"><strong>${esc(x.h)}</strong><br><span class="small">${esc(t(x.s))}</span></div>`).join('')}</div></div>
  <div class="c7-12 fig fig--outline fig--tall hide-m">${whatFits({ labels: fitsLabels, id: 'fits' })}</div>
</div>`);

  /* 8 — Operating commitments */
  const op = p.ops;
  const nodes = op.nodes.map((n, i) => `<div class="monitor__node"><span class="monitor__ico${n.on ? ' monitor__ico--on' : ''}">${icon(n.icon, { stroke: 1.5 })}</span><div><div class="monitor__h">${esc(n.h)}</div><div class="monitor__s">${esc(n.s)}</div></div></div>${i < 3 ? `<div class="monitor__link" aria-hidden="true">${op.links[i] ? `<span class="monitor__tag">${esc(op.links[i])}</span>` : ''}</div>` : ''}`).join('');
  const ops = section('section--ink', `
<div class="stack stack--xl">
${head({ eyebrow: op.eyebrow, h2: op.h2, lead: op.lead, mod: 'light' })}
<div class="monitor hide-m">${nodes}</div>
<div class="stats">${op.stats.map((s) => `<div class="stat"><span class="stat__n num">${esc(s.n)}</span><span class="stat__h">${esc(s.h)}</span><span class="stat__p">${esc(s.p)}</span></div>`).join('')}</div>
</div>`);

  /* 9 — Venue partners */
  const vn = p.venues;
  const planLabels = Object.fromEntries(Object.entries(c.diagrams.plan).map(([k, v]) => [k, t(v)]));
  const venues = section('section--teal', `
<div class="grid grid--12 center">
  <div class="c1-6 stack stack--l">${eyebrow(vn.eyebrow, 'ink')}<h2 class="h2"><span class="hide-m">${esc(vn.h2)}</span><span class="hide-d">${esc(vn.h2Short)}</span></h2>
    <ul class="checks checks--mobile-4">${vn.checks.map((x) => `<li>${icon('check', { size: 20, stroke: 2.2 })}${esc(x)}</li>`).join('')}</ul>
    <div class="btn-row btn-row--stack">${btn(c.ui.venueBrief, hrefFor(lang, 'venues'), 'deep')}${btn(c.ui.profilePdf, ph.profile.href, 'outline', { cls: 'hide-m', attrs: 'download' })}</div></div>
  <div class="c8-12 fig fig--white fig--tall hide-m">${floorPlan({ labels: planLabels, id: 'home' })}</div>
</div>`);

  /* 10 — Rules and protection */
  const ru = p.rules;
  const items = (ph.prohibited[lang] || ph.prohibited.en);
  const rules = section('', `
<div class="grid grid--12" style="row-gap:2.5rem">
  <div class="c1-8 sec-head__text measure">${eyebrow(ru.eyebrow)}<h2 class="h2">${esc(ru.h2)}</h2></div>
  <div class="c1-6 stack stack--l" style="grid-row:2"><h3 class="h3 hide-m">${esc(ru.notPermitted)}</h3>
    <div class="tiles">${items.map((x, i) => `<div class="tile"><span class="ic ic--red">${icon(ru.icons[i])}</span><span class="hide-m">${esc(x)}</span><span class="hide-d">${esc(ru.itemsShort[i])}</span></div>`).join('')}</div></div>
  <div class="c8-12 hide-m" style="grid-row:2"><div class="rows rows--list">${ru.rows.map((r) => `<div class="row"><span class="row__h">${esc(r.h)}</span><span class="row__p">${esc(t(r.p))}</span></div>`).join('')}</div><p style="margin-top:1.5rem">${link(c.ui.terms, hrefFor(lang, 'legal'))}</p></div>
  <p class="body hide-d" style="font-size:.9375rem">${esc(t(ru.mobileNote))} <a href="${hrefFor(lang, 'legal')}">${esc(c.ui.termsShort)}</a></p>
</div>`);

  /* 11 — Questions */
  const fq = p.faq;
  const faq = section('section--warm', `
<div class="grid grid--12" style="row-gap:2rem">
  <div class="c1-4 stack">${eyebrow(fq.eyebrow)}<h2 class="h2 h2--s">${esc(fq.h2)}</h2><p class="body hide-m">${esc(fq.p)}</p></div>
  <div class="c6-12">${accordion(fq.items.map((q) => ({ q: q.q, a: t(q.a) })))}</div>
</div>`);

  /* 12 — Status + operator */
  const opr = p.operator;
  const operator = section('', `
<div class="grid grid--12" style="row-gap:2rem">
  <div class="c1-5 card card--pale card--l hide-m" style="padding:3rem"><div style="display:flex;align-items:center;gap:.625rem"><span class="dot dot--l" aria-hidden="true"></span>${eyebrow(opr.statusEyebrow)}</div><h3 class="h2--xs" style="font-family:var(--font-head)">${esc(opr.statusH)}</h3><p class="body">${esc(c.status)}</p></div>
  <div class="c7-12 stack stack--l">${eyebrow(opr.eyebrow)}<h2 class="h2--xs">${esc(opr.h2)}</h2>
    <div class="rows rows--grid hide-m">
      ${row(opr.rows.name, `<span lang="en">${esc(company.legalNameEn)}</span><br><span lang="th">${esc(company.legalNameTh)}</span>`, { raw: true })}
      ${row(opr.rows.reg, `<span class="tnum">${esc(company.regNo)}</span> · ${esc(opr.rows.alsoTax)}`, { raw: true })}
      ${row(opr.rows.director, `${esc(company.director.name)}, ${esc(company.director.role[lang] || company.director.role.en)}`, { raw: true })}
    </div>
    <div class="stack stack--s hide-d" style="font-size:.9375rem;line-height:1.5"><span class="strong" lang="en">${esc(company.legalNameEn)}</span><span class="strong" lang="th">${esc(company.legalNameTh)}</span><span class="muted">${esc(opr.mobileReg)}<span class="tnum ink">${esc(company.regNo)}</span></span><span class="muted">${esc(opr.mobileDirector)}${esc(company.director.name)}</span></div>
    <p class="hide-m">${link(c.ui.companyRecord, hrefFor(lang, 'company'))}</p></div>
</div>`);

  /* 13 — Contact band */
  const ct = p.contact;
  const contact = `<section class="section--ink section--s">${wrap(`<div class="contact-band"><div class="stack" style="--stack-gap:1rem"><h2 class="h2">${esc(ct.h2)}</h2><p class="lead hide-m">${esc(ct.lead)}</p></div><div class="btn-row btn-row--stack">${btn(t(c.ui.lineChat), company.lineUrl, 'line', { cls: 'btn--lg', rel: 'noopener' })}${btn(company.tel.display[lang] || company.tel.display.en, company.tel.href, 'outline', { cls: 'btn--lg' })}${btn(company.email, `mailto:${company.email}`, 'outline', { cls: 'btn--lg hide-m' })}</div></div>`)}</section>`;

  return [hero, statement, pricing, how, who, unit, fits, ops, venues, rules, faq, operator, contact].join('\n');
}

/* ----------------------------------------------------------- HOW IT WORKS */
export function how(lang) {
  const c = COPY[lang], p = c.how, t = tFor(lang), m = (n) => money(lang, n);
  const kioskArgs = { s: c.diagrams.app, app: ph.app, money: m, lang, t };

  const hero = section('section--warm section--s', `
<div class="grid grid--12 center" style="row-gap:2rem">
  <div class="c1-6 stack stack--l">${eyebrow(p.eyebrow)}<h1 class="h1 h1--s">${esc(p.h1)}</h1><p class="lead measure-s">${esc(p.lead)}</p><div class="pills">${p.pills.map((x) => `<span class="pill">${esc(x)}</span>`).join('')}</div></div>
  <div class="c7-12 fig fig--white fig--tall">${lockerIllustration({ labels: c.diagrams.locker, callouts: false, hero: true, id: 'how' })}</div>
</div>`);

  const im = c.diagrams.images;
  const scenes = ['stepStart', 'stepPay', 'stepStore', 'stepCollect'];
  const steps = section('', `
<div class="stack stack--xl">
${head({ eyebrow: p.stepsEyebrow, h2: p.stepsH2 })}
<div class="kiosks kiosks--4">${p.steps.map((s, i) => `<div class="kiosk-wrap">${illustration(scenes[i], { alt: im[scenes[i]], tag: im.tag, cls: 'ill--scene', sizes: '(min-width: 64rem) 20rem, (min-width: 48rem) 46vw, 100vw' })}${kiosk(s.screen, kioskArgs)}<div class="stack stack--s"><span class="journey__n num" style="font-size:.9375rem">${esc(s.n)}</span><h3 class="h3">${esc(s.h)}</h3><p class="body">${esc(t(s.p))}</p></div></div>`).join('')}</div>
</div>`);

  const wrong = section('section--pale', `
<div class="stack stack--xl">
${head({ eyebrow: p.wrongEyebrow, h2: p.wrongH2 })}
<div class="grid grid--3">${p.wrong.map((w) => `<div class="card card--white"><span class="ic">${icon(w.icon)}</span><h3 class="h3">${esc(w.h)}</h3><p class="body">${esc(t(w.p))}</p></div>`).join('')}</div>
</div>`);

  const L = p.langs;
  const langs = section('section--s', `
<div class="stack stack--l">
<div class="langs3">
  <div class="stack stack--s"><span class="langs3__word langs3__word--en" lang="en">${esc(L.words.en)}</span>${eyebrow(L.names.en)}</div>
  <div class="stack stack--s"><span class="langs3__word langs3__word--th" lang="th">${esc(L.words.th)}</span><p class="eyebrow" lang="th">${esc(L.names.th)}</p></div>
  <div class="stack stack--s"><span class="langs3__word langs3__word--zh" lang="zh-Hans">${esc(L.words.zh)}</span><p class="eyebrow" lang="zh-Hans">${esc(L.names.zh)}</p></div>
</div>
<p class="body">${esc(L.p)}</p>
</div>`);

  const cta = `<section class="section--ink section--s">${wrap(`<div class="contact-band"><h2 class="h2 h2--s">${esc(t(p.cta.h2))}</h2>${btn(c.ui.seePricing, hrefFor(lang, 'pricing'), 'primary')}</div>`)}</section>`;

  return [hero, steps, wrong, langs, cta].join('\n');
}

/* ---------------------------------------------------------------- PRICING */
export function pricing(lang) {
  const c = COPY[lang], p = c.pricing, t = tFor(lang), m = (n) => money(lang, n);
  const price = product.price;
  const cur = lang === 'th' ? 'บาท' : 'THB';

  const hero = section('section--s', `
<div class="stack stack--xl">
<div class="stack stack--l measure">${eyebrow(p.eyebrow)}<h1 class="h1">${esc(p.h1)}</h1></div>
<div class="grid grid--2">
  <div class="price price--ink price--hero"><div class="price__side"><span class="price__label">${esc(p.perHour)}</span><span class="num price__num">${thb(price.hourly)}</span></div><span class="price__cur">${cur}</span></div>
  <div class="price price--teal price--hero"><div class="price__side"><span class="price__label">${esc(p.maxPerDay)}</span><span class="num price__num">${thb(price.dailyCap)}</span></div><span class="price__cur">${cur}</span></div>
</div>
</div>`);

  const chartLabels = { aria: t(c.diagrams.chart.aria), max: t(c.diagrams.chart.max), axis: t(c.diagrams.chart.axis) };
  const hourWord = (h) => t(c.diagrams.chart.hour, { n: h });
  const howSec = section('section--warm section--s', `
<div class="grid grid--12 center" style="row-gap:2rem">
  <div class="c1-4 stack stack--l">${eyebrow(p.how.eyebrow)}<h2 class="h2 h2--s">${esc(t(p.how.h2))}</h2><p class="body">${esc(p.how.p)}</p></div>
  <div class="c6-12 fig fig--white" style="min-height:0">${priceCapChart({ labels: chartLabels, hourly: price.hourly, cap: price.dailyCap, hourWord })}</div>
</div>`);

  const total = (h) => {
    const days = Math.ceil(h / 24);
    const perDay = (hrs) => Math.min(hrs * price.hourly, price.dailyCap);
    let sum = 0, left = h;
    for (let i = 0; i < days; i++) { sum += perDay(Math.min(left, 24)); left -= 24; }
    return sum;
  };
  const examples = section('', `
<div class="grid grid--12" style="row-gap:2rem">
  <div class="c1-4 stack stack--l">${eyebrow(p.examples.eyebrow)}<h2 class="h2 h2--s">${esc(p.examples.h2)}</h2></div>
  <div class="c6-12 rows rows--3">
    <div class="row row--head"><span>${esc(p.examples.head.k)}</span><span class="row__ex">${esc(p.examples.head.ex)}</span><span class="row__v">${esc(p.examples.head.v)}</span></div>
    ${p.examples.rows.map((r) => `<div class="row"><span>${esc(r.k)}</span><span class="row__ex">${esc(r.ex)}</span><span class="row__v num">${esc(m(total(r.hours)))}</span></div>`).join('')}
  </div>
</div>`);

  const k = p.cards;
  const cards = section('section--pale section--s', `
<div class="grid grid--3">
  <div class="card card--white">${eyebrow(k.payment.eyebrow)}<h3 class="h3">${esc(k.payment.h3)}</h3>${paymentMarks(ph.paymentMarks)}</div>
  <div class="card card--white">${eyebrow(k.receipts.eyebrow)}<h3 class="h3">${esc(k.receipts.h3)}</h3><p class="body">${esc(k.receipts.p)}</p></div>
  <div class="card card--white">${eyebrow(k.refunds.eyebrow)}<h3 class="h3">${esc(k.refunds.h3)}</h3><p class="body">${esc(k.refunds.p)} <a href="${hrefFor(lang, 'legal')}#refunds">${esc(c.ui.refundTerms)}</a></p></div>
</div>`);

  return [hero, howSec, examples, cards].join('\n');
}

/* --------------------------------------------------------- VENUE PARTNERS */
export function venues(lang) {
  const c = COPY[lang], p = c.venues, t = tFor(lang);
  const planLabels = Object.fromEntries(Object.entries(c.diagrams.plan).map(([k, v]) => [k, t(v)]));

  const hero = section('section--ink section--s', `
<div class="grid grid--12 center" style="row-gap:2rem">
  <div class="c1-6 stack stack--l">${eyebrow(p.eyebrow, 'light')}<h1 class="h1 h1--s">${esc(p.h1)}</h1><p class="punch">${esc(p.punch)}</p><p class="lead measure-s">${esc(p.lead)}</p>
    <div class="btn-row btn-row--stack">${btn(c.ui.callDirector, company.tel.href, 'primary')}${btn(t(c.ui.profilePdfSize), ph.profile.href, 'outline', { attrs: 'download' })}</div>
    ${statusLine(c.status)}</div>
  <div class="c7-12 fig fig--white fig--tall"><div class="hide-m fig__in">${lockerIllustration({ labels: c.diagrams.locker, callouts: true, id: 'venue', draw: true })}</div><div class="hide-d fig__in">${lockerIllustration({ labels: c.diagrams.locker, callouts: false, id: 'venue-m' })}</div></div>
</div>`);

  const strip = `<div class="section--ink-deep">${wrap(`<div class="stats stats--strip">${p.strip.map((s) => `<div class="stat stat--flat"><span class="stat__n num">${esc(t(s.n))}</span><span class="stat__h">${esc(s.s)}</span></div>`).join('')}</div>`)}</div>`;

  const offer = section('', `
<div class="stack stack--xl">
${head({ eyebrow: p.offer.eyebrow, h2: p.offer.h2 })}
${illustration('venueFloor', { alt: c.diagrams.images.venueFloor, tag: c.diagrams.images.tag, cls: 'ill--banner', sizes: '(min-width: 80rem) 76rem, 100vw' })}
<div class="grid grid--3">${p.offer.cards.map((k) => `<div class="card"><span class="ic${k.on ? ' ic--teal' : ''}">${icon(k.icon)}</span><h3 class="h3">${esc(k.h)}</h3><p class="body">${esc(k.p)}</p></div>`).join('')}</div>
</div>`);

  const install = section('section--warm', `
<div class="grid grid--12 center" style="row-gap:2.5rem">
  <div class="c1-6 fig fig--white fig--tall">${floorPlan({ labels: planLabels, id: 'venue' })}</div>
  <div class="c8-12 stack stack--xl">${head({ eyebrow: p.install.eyebrow, h2: p.install.h2, lead: p.install.lead, cls: 'h2 h2--s' })}
    <div class="timeline">${p.install.steps.map((s, i) => `<div class="timeline__step"><span class="timeline__n num${s.on ? ' timeline__n--on' : ''}">0${i + 1}</span><div class="stack stack--s" style="--stack-gap:.25rem"><div class="timeline__h">${esc(s.h)}</div><p class="body">${esc(s.p)}</p></div></div>`).join('')}</div></div>
</div>`);

  const why = section('section--teal section--s', `
<div class="grid grid--12" style="row-gap:2.5rem">
  <div class="c1-7 stack stack--l">${eyebrow(p.why.eyebrow, 'ink')}<p class="statement__text" style="font-size:clamp(2rem,1.2rem + 3.4vw,3.25rem)">${esc(p.why.statement)}</p></div>
  <div class="c9-12 stack stack--l" style="justify-content:flex-end;font-size:1.0625rem;line-height:1.5">${p.why.points.map((x) => `<div style="padding-top:1.125rem;border-top:1.5px solid var(--ink-deep)"><strong>${esc(x.h)}</strong> ${esc(x.p)}</div>`).join('')}</div>
</div>`);

  const spec = section('', `
<div class="grid grid--12" style="row-gap:2rem">
  <div class="c1-4 stack stack--l">${eyebrow(p.spec.eyebrow)}<h2 class="h2 h2--s">${esc(p.spec.h2)}</h2><p class="body">${esc(p.spec.p)}</p></div>
  <div class="c6-12 rows rows--grid rows--spec">${p.spec.rows.map((r) => row(r.k, t(r.v))).join('')}</div>
</div>`);

  const profile = section('section--pale', `
<div class="grid grid--12 center" style="row-gap:2rem">
  <div class="c1-5">${profileDoc({ labels: { label: t(c.diagrams.profile.label), title: c.diagrams.profile.title }, regNo: company.regNo, legalName: company.legalNameEn })}</div>
  <div class="c7-12 stack stack--l">${eyebrow(p.profile.eyebrow)}<h2 class="h2 h2--s">${esc(p.profile.h2)}</h2><p class="body">${esc(p.profile.p)}</p>
    <div class="btn-row btn-row--stack">${btn(t(c.ui.downloadPdf), ph.profile.href, 'dark', { attrs: 'download' })}${btn(c.ui.requestPrint, `mailto:${company.email}?subject=${encodeURIComponent('BagDrop company profile')}`, 'outline')}</div></div>
</div>`);

  const director = section('section--ink', `
<div class="grid grid--12 end" style="row-gap:2.5rem">
  <div class="c1-6 stack stack--l">${eyebrow(p.director.eyebrow, 'light')}<h2 class="h2">${esc(p.director.h2)}</h2><p class="lead">${esc(p.director.lead)}</p></div>
  <div class="c8-12 stack" style="--stack-gap:1rem">
    <div class="h3" style="font-size:1.75rem;letter-spacing:-.02em">${esc(company.director.name)}</div>
    <div class="small" style="color:var(--muted-dark);margin-top:-.5rem">${esc(t(p.director.role))}</div>
    <a class="btn btn--primary btn--split" href="${company.tel.href}"><span>${esc(c.ui.call)}</span><span class="num">${esc(company.tel.display[lang] || company.tel.display.en)}</span></a>
    <a class="btn btn--split btn--split-outline" href="mailto:${esc(company.email)}"><span>${esc(c.ui.email)}</span><span>${esc(company.email)}</span></a>
    <a class="btn btn--split btn--split-outline" href="${company.lineUrl}" rel="noopener"><span>LINE</span><span>${esc(company.lineOaId)}</span></a>
  </div>
</div>`);

  return [hero, strip, offer, install, why, spec, profile, director].join('\n');
}

/* --------------------------------------------------------------- COMPANY */
export function companyPage(lang) {
  const c = COPY[lang], p = c.company, t = tFor(lang), r = p.rows;
  const addr = (company.addressLines[lang] || company.addressLines.en).map(esc).join('<br>');

  const hero = section('section--s', `
<div class="grid grid--12 end" style="row-gap:1.5rem;padding-bottom:0">
  <div class="c1-8 stack stack--l">${eyebrow(p.eyebrow)}<h1 class="h1">${esc(p.h1)}</h1></div>
  <p class="c10-12 body body--l">${esc(p.lead)}</p>
</div>`);

  const table = `<section class="section" style="padding-top:0">${wrap(`
<div class="grid grid--12 start" style="row-gap:2rem">
  <div class="c1-8 rows rows--grid rows--company">
    ${row(r.nameEn, `<span lang="en">${esc(company.legalNameEn)}</span>`, { raw: true })}
    ${row(r.nameTh, `<span lang="th">${esc(company.legalNameTh)}</span>`, { raw: true })}
    ${row(r.reg, `<span class="reg">${esc(company.regNo)}</span><br><span class="body">${esc(r.regNote)}</span>`, { raw: true })}
    ${row(r.registered, company.registeredDate[lang] || company.registeredDate.en)}
    ${row(r.capital, company.registeredCapital[lang] || company.registeredCapital.en)}
    ${row(r.office, `<span lang="${lang === 'th' ? 'th' : 'en'}">${addr}</span>`, { raw: true })}
    ${company.vatPending ? row(r.vat, r.vatValue) : ''}
    ${row(r.trading, 'BagDrop')}
  </div>
  <div class="c10-12"><div class="card card--pale" style="padding:2rem"><span class="ic ic--teal" style="width:3rem;height:3rem;border-radius:14px">${icon('shield')}</span><h2 class="h3">${esc(p.verify.h3)}</h2><p class="body small">${esc(p.verify.p)}</p>${btn(c.ui.openDbd, company.dbdUrl, 'dark', { cls: 'btn--sm', rel: 'noopener' })}</div></div>
</div>`)}</section>`;

  const director = section('section--ink', `
<div class="grid grid--12 center" style="row-gap:2.5rem">
  <div class="c1-4">${monogram(company.director.name)}</div>
  <div class="c5-12 stack stack--l">${eyebrow(p.director.eyebrow, 'light')}<h2 class="h2">${esc(company.director.name)}</h2><p class="lead" style="margin-top:-.75rem">${esc(company.director.role[lang] || company.director.role.en)}</p><p class="lead measure-m" style="color:#D5E0DF">${esc(p.director.p)}</p>
    <div class="btn-row btn-row--stack">${btn(company.tel.display[lang] || company.tel.display.en, company.tel.href, 'primary')}${btn(company.email, `mailto:${company.email}`, 'outline')}${btn(t(c.ui.lineAt), company.lineUrl, 'line', { rel: 'noopener' })}</div></div>
</div>`);

  return [hero, table, director].join('\n');
}

/* ----------------------------------------------------------------- LEGAL */
export function legal(lang) {
  const c = COPY[lang], p = c.legal, t = tFor(lang);

  const ids = p.sections.map((s) => s.id);
  const toc = p.sections.map((s, i) => `<a href="#${s.id}" style="animation-timeline:--sec-${s.id}">${i + 1}. ${esc(s.h)}</a>`).join('');
  // Each section publishes a view timeline; its contents link animates on it
  // (site.css → .toc). Browsers without scroll-driven animations fall back to
  // :target, so the link you clicked is the one marked.
  const sections = p.sections.map((s, i) => `<section class="legal-sec" id="${s.id}" style="view-timeline-name:--sec-${s.id}">${eyebrow(t(p.sectionWord, { n: i + 1 }))}<h2>${esc(s.h)}</h2>${s.paras.map((x) => `<p>${esc(t(x))}</p>`).join('')}</section>`).join('');
  const fallback = `<style>@supports not (timeline-scope: --a){${ids.map((id) => `.legal-grid:has(#${id}:target) .toc a[href="#${id}"]{color:var(--ink);border-left-color:var(--teal);font-weight:600}`).join('')}.legal-grid:has(:target) .toc a:first-of-type:not(:hover){color:var(--muted);border-left-color:var(--line-soft);font-weight:400}}</style>`;

  const hero = `<section class="section--warm" style="padding:clamp(3rem,2rem + 4vw,6rem) 0 clamp(2.5rem,2rem + 2vw,4rem)">${wrap(`<div class="stack">${eyebrow(p.eyebrow)}<h1 class="h1 h1--s">${esc(p.h1)}</h1><p class="body">${esc(t(p.updated))}</p></div>`)}</section>`;

  const body = `<section class="section" style="padding-top:clamp(2.5rem,2rem + 2vw,4rem)">${fallback}${wrap(`
<div class="grid grid--12 start legal-grid" style="row-gap:2.5rem;timeline-scope:${ids.map((id) => '--sec-' + id).join(',')}">
  <nav class="c1-4 toc" aria-label="${esc(p.contents)}"><span class="eyebrow" style="margin-bottom:1rem">${esc(p.contents)}</span>${toc}</nav>
  <div class="c5-12">${sections}</div>
</div>`)}</section>`;

  return [hero, body].join('\n');
}

/* ------------------------------------------------------------------- 404 */
export function notFound(lang) {
  const c = COPY[lang], p = c.notFound, t = tFor(lang);
  return wrap(`
<div class="nf">
  <div class="c1-6 stack stack--l">${eyebrow(p.eyebrow)}<h1 class="nf__h1">${esc(p.h1)}</h1><p class="lead">${esc(p.lead)}</p>
    <div class="btn-row btn-row--stack">${btn(c.ui.backHome, hrefFor(lang, 'home'), 'primary')}${btn(t(c.ui.lineChat), company.lineUrl, 'outline', { rel: 'noopener' })}</div></div>
  <div class="c8-12 nf__fig">${emptyLocker({ labels: c.diagrams.empty, id: '404' })}</div>
</div>`);
}

export const RENDERERS = { home, how, pricing, venues, company: companyPage, legal, notFound };
/** Pages that carry the mobile sticky price bar. */
export const STICKY = new Set(['home', 'how', 'pricing', 'venues', 'company']);
