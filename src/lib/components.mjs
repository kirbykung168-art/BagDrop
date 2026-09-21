/**
 * components.mjs — shared UI pieces and the SVG illustrations.
 *
 * Every label inside a diagram is passed in from the copy module so that no
 * text is baked into an SVG (brief §5). Illustrations take an `id` suffix so a
 * page can use the same drawing twice without duplicate <pattern> ids.
 */
import { esc, fill } from './util.mjs';
import { IMAGES, sizeOf } from '../content/images.mjs';

/* ------------------------------------------------------------ Icons */
/* One stroke set, Lucide-style: 24 viewBox, currentColor, 1.75 stroke, round caps. */
const ICON = {
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  qr: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3z M20 14v7 M14 20h3" stroke="#00B2A9"/>',
  pay: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20" stroke="#00B2A9"/><path d="M6 15h4"/>',
  suitcase: '<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V4h6v3 M9 11v6 M15 11v6"/>',
  pin: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/><circle cx="12" cy="16" r="1.4" fill="#00B2A9" stroke="#00B2A9"/>',
  unlock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
  check: '<path d="M5 12l4 4 10-10"/>',
  grid: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18 M3 15h18 M9 3v18 M15 3v18"/>',
  bars: '<path d="M4 20v-3 M9 20v-7 M14 20V9 M19 20V5"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5.5.5 1.5 1.5 2 2.5 2 0-2.5-.5-4.5 0-6.5z"/>',
  leaf: '<path d="M12 21c-4 0-7-3-7-7 0-5 4-8 7-8s7 3 7 8c0 4-3 7-7 7z"/><path d="M12 6c0-2 1-3 3-3"/>',
  gem: '<path d="M6 4h12l3 5-9 11L3 9z"/><path d="M3 9h18"/>',
  paw: '<circle cx="7" cy="9" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="17" cy="9" r="2"/><path d="M8 17c0-3 2-5 4-5s4 2 4 5c0 2-2 3-4 3s-4-1-4-3z"/>',
  chat: '<path d="M4 5h16v11H10l-6 4z"/>',
  menu: '<path d="M4 7h16 M4 12h16 M4 17h16"/>',
  close: '<path d="M6 6l12 12 M18 6L6 18"/>',
  zero: '<circle cx="12" cy="12" r="8"/><path d="M9 12h6"/><path d="M4 4l16 16"/>',
  plug: '<path d="M9 2v6 M15 2v6 M6 8h12v4a6 6 0 0 1-12 0z M12 18v4"/>',
  footprint: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h6 M15 3v6 M9 21v-6"/>',
  unstaffed: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M3 3l18 18"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  erase: '<path d="M21 5H9l-6 7 6 7h12z"/><path d="M12 9.5l5 5 M17 9.5l-5 5"/>',
  touch: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 6h6"/><circle cx="12" cy="13" r="2.5" stroke="#00B2A9"/><path d="M12 18v.01" stroke="#00B2A9"/>',
  ticket: '<path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z"/><path d="M15 7v10" stroke-dasharray="2 2"/>',
};

/** Inline icon. Decorative by default; pass a label to make it meaningful. */
export function icon(name, { size = 24, stroke = 1.75, label = '' } = {}) {
  const body = ICON[name];
  if (!body) throw new Error(`unknown icon: ${name}`);
  const a11y = label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${body}</svg>`;
}

/* --------------------------------------------------------- Primitives */
export const eyebrow = (t, mod = '') => `<p class="eyebrow${mod ? ' eyebrow--' + mod : ''}">${esc(t)}</p>`;

/** Button. kind: primary | dark | deep | outline | line. */
export function btn(label, href, kind = 'primary', { cls = '', icon: ic = '', rel = '', attrs = '' } = {}) {
  const r = rel ? ` rel="${rel}"` : '';
  return `<a class="btn btn--${kind}${cls ? ' ' + cls : ''}" href="${esc(href)}"${r}${attrs ? ' ' + attrs : ''}>${ic ? icon(ic, { size: 18, stroke: 2 }) : ''}${esc(label)}</a>`;
}

export const link = (label, href, attrs = '') => `<a class="link" href="${esc(href)}"${attrs ? ' ' + attrs : ''}>${esc(label)}</a>`;

export function statusLine(text, { large = false } = {}) {
  return `<p class="status"><span class="dot${large ? ' dot--l' : ''}" aria-hidden="true"></span><span>${esc(text)}</span></p>`;
}

/** Label / value row. */
export const row = (k, v, { raw = false } = {}) =>
  `<div class="row"><span class="row__k">${esc(k)}</span><span class="row__v">${raw ? v : esc(v)}</span></div>`;

/** Typed payment marks — PLACEHOLDER until official assets are supplied. */
export function paymentMarks(names, { dark = false } = {}) {
  const items = names.map((n) => {
    if (/visa/i.test(n)) return `<li class="mark mark--visa">VISA</li>`;
    if (/master/i.test(n)) return `<li class="mark"><span class="mark__mc" aria-hidden="true"><i></i><i></i></span>${esc(n)}</li>`;
    if (/prompt/i.test(n)) return `<li class="mark mark--pp">${esc(n)}</li>`;
    return `<li class="mark">${esc(n)}</li>`;
  });
  return `<ul class="marks${dark ? ' marks--dark' : ''}" aria-label="${esc(names.join(', '))}">${items.join('')}</ul>`;
}

/** Accordion, native <details> so it works without a script. */
export function accordion(items) {
  return `<div class="faq">${items
    .map((it, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(it.q)}</summary><div class="faq__a"><p class="body">${esc(it.a)}</p></div></details>`)
    .join('')}</div>`;
}

/* --------------------------------------------------------------- Intro */
/**
 * The opening sequence on the home page: the locker bank, door 12 swings open,
 * and the camera goes into the lit interior, which is the page's own white.
 * CSS only (site.css → .intro) — the site runs no script. Decorative, so it is
 * hidden from assistive technology, and invisible unless its animation runs.
 * Twenty doors and a terminal, as on the unit; 12 is the locker the terminal
 * mockups open, in the same place as the open door in lockerIllustration().
 */
export function intro() {
  const OPEN = 12;
  const slots = Array.from({ length: 20 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    if (i + 1 !== OPEN) return `<div class="intro__slot"><i>${n}</i></div>`;
    return `<div class="intro__slot intro__slot--open"><div class="intro__cavity"><div class="intro__light"></div></div><div class="intro__hinge"><div class="intro__door"><div class="intro__face"><i>${n}</i><b></b></div><div class="intro__back"></div></div></div><div class="intro__flood"></div></div>`;
  }).join('');
  return `<div class="intro" aria-hidden="true"><div class="intro__cam"><div class="intro__bank"><div class="intro__grid">${slots}<div class="intro__term"><span></span><span></span></div></div><div class="intro__plinth"></div><div class="intro__mark">BagDrop<span></span></div></div></div></div>`;
}

/* ------------------------------------------------------- Illustrations */
/**
 * A handoff illustration from src/content/images.mjs.
 * alt: '' marks it decorative. sizes: the CSS width it is laid out at.
 * eager: only for the image above the fold; everything else loads lazily.
 * tag: the "illustration" label — nothing here is a photograph of a real unit.
 */
export function illustration(slot, { alt = '', sizes, eager = false, tag = '', cls = '' }) {
  const { widths } = IMAGES[slot];
  const { width, height } = sizeOf(slot, widths[0]);
  const srcset = widths.map((w) => `/img/${slot}-${w}.webp ${w}w`).join(', ');
  const load = eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"';
  const img = `<img src="/img/${slot}-${widths[0]}.webp" srcset="${srcset}" sizes="${esc(sizes)}" width="${width}" height="${height}" alt="${esc(alt)}" ${load}>`;
  return `<figure class="ill${cls ? ' ' + cls : ''}">${img}${tag ? `<figcaption class="ill__tag">${esc(tag)}</figcaption>` : ''}</figure>`;
}

/* ------------------------------------------------------ Draw-in helper */
/* Adds pathLength="1" to stroked shapes so CSS can animate stroke-dashoffset
   without knowing each path's real length. Text is left alone. */
const drawable = (svg) => svg.replace(/<(path|rect|circle|line|polyline)\b(?![^>]*pathLength)([^>]*?)\/?>/g, (m, tag, rest) =>
  /stroke="none"/.test(rest) ? m : `<${tag} pathLength="1"${rest}${m.endsWith('/>') ? '/>' : '>'}`);

/* --------------------------------------------------- Locker illustration */
/**
 * Isometric locker bank. labels: { aria, callouts:[{t,s}×4], illustrative, wordmark }
 * callouts: whether to draw the four leader-line callouts.
 * hero: adds the door-swing animation.
 */
export function lockerIllustration({ labels, callouts = true, hero = false, id = 'a', draw = false }) {
  const c = labels.callouts;
  // Callouts get a gutter each side so their text never crosses the drawing.
  const L = callouts ? -84 : 8, R = callouts ? 724 : 628;
  const vb = callouts ? { x: -96, w: 832 } : { x: 0, w: 640 };
  const calloutGroup = callouts
    ? `<g font-family="Inter, system-ui, sans-serif" fill="#14282C">
<path d="M206 262 L140 196 H${L}" fill="none" stroke="#14282C" stroke-width="1"/>
<circle cx="206" cy="262" r="3.5" fill="#00B2A9" stroke="#14282C" stroke-width="1"/>
<text x="${L}" y="186" font-size="11" font-weight="600" letter-spacing="1.4">${esc(c[0].t)}</text>
<text x="${L}" y="212" font-size="12" fill="#4A5F62">${esc(c[0].s)}</text>
<path d="M386 250 L500 106 H${R}" fill="none" stroke="#14282C" stroke-width="1"/>
<circle cx="386" cy="250" r="3.5" fill="#00B2A9" stroke="#14282C" stroke-width="1"/>
<text x="${R}" y="96" font-size="11" font-weight="600" letter-spacing="1.4" text-anchor="end">${esc(c[1].t)}</text>
<text x="${R}" y="124" font-size="12" fill="#4A5F62" text-anchor="end">${esc(c[1].s)}</text>
<path d="M470 190 L520 214 H${R}" fill="none" stroke="#14282C" stroke-width="1"/>
<circle cx="470" cy="190" r="3.5" fill="#00B2A9" stroke="#14282C" stroke-width="1"/>
<text x="${R}" y="204" font-size="11" font-weight="600" letter-spacing="1.4" text-anchor="end">${esc(c[2].t)}</text>
<text x="${R}" y="232" font-size="12" fill="#4A5F62" text-anchor="end">${esc(c[2].s)}</text>
<path d="M505 452 H${R}" fill="none" stroke="#14282C" stroke-width="1"/>
<circle cx="505" cy="452" r="3.5" fill="#00B2A9" stroke="#14282C" stroke-width="1"/>
<text x="${R}" y="442" font-size="11" font-weight="600" letter-spacing="1.4" text-anchor="end">${esc(c[3].t)}</text>
<text x="${R}" y="470" font-size="12" fill="#4A5F62" text-anchor="end">${esc(c[3].s)}</text>
</g>`
    : '';

  const cells = [];
  for (const y of [10, 70, 130, 190]) for (const x of [8, 56, 104, 152, 200]) {
    if (y === 130 && x === 56) continue; // the open locker
    cells.push(`<rect x="${x}" y="${y}" width="44" height="56"/>`);
  }
  const handles = [];
  for (const y of [32, 92, 152, 212]) for (const x of [46, 94, 142, 190, 238]) {
    if (y === 152 && x === 94) continue;
    handles.push(`M${x} ${y} V${y + 12}`);
  }

  const svg = `<svg viewBox="${vb.x} 0 ${vb.w} 520" width="${vb.w}" height="520" role="img" aria-label="${esc(labels.aria)}" class="${draw ? 'draw' : ''}">
<defs>
<pattern id="dots-${id}" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#14282C" opacity="0.10"/></pattern>
<marker id="arrow-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#14282C"/></marker>
</defs>
<rect x="${vb.x}" width="${vb.w}" height="520" fill="url(#dots-${id})" stroke="none"/>
<g transform="matrix(0.866 0.5 0.866 -0.5 150 347)">
<rect x="-10" y="-10" width="320" height="110" fill="#E8F6F5" fill-opacity="0.6" stroke="#00B2A9" stroke-width="1.5" stroke-dasharray="6 5" vector-effect="non-scaling-stroke"/>
</g>
<g transform="matrix(0.866 -0.5 0 1 410 217)" stroke="#14282C" stroke-linejoin="round">
<rect x="0" y="0" width="90" height="280" fill="#E9F0EF" stroke-width="2" vector-effect="non-scaling-stroke"/>
<rect x="0" y="250" width="90" height="5" fill="#00B2A9" stroke="none"/>
<rect x="0" y="256" width="90" height="24" fill="#D6E9E7" stroke-width="1" vector-effect="non-scaling-stroke"/>
<path d="M20 30 H70 M20 38 H70 M20 46 H70" stroke-width="1" vector-effect="non-scaling-stroke" opacity="0.5"/>
</g>
<g transform="matrix(0.866 0.5 0.866 -0.5 150 67)" stroke="#14282C" stroke-linejoin="round">
<rect x="0" y="0" width="300" height="90" fill="#FFFFFF" stroke-width="2" vector-effect="non-scaling-stroke"/>
<rect x="258" y="62" width="18" height="14" fill="#E8F6F5" stroke-width="1" vector-effect="non-scaling-stroke"/>
</g>
<g transform="matrix(0.866 0.5 0 1 150 67)" stroke="#14282C" stroke-linejoin="round">
<rect x="0" y="0" width="300" height="280" fill="#FFFFFF" stroke-width="2" vector-effect="non-scaling-stroke"/>
<g fill="#FFFFFF" stroke-width="1" vector-effect="non-scaling-stroke">${cells.join('')}</g>
<path d="${handles.join(' ')}" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
<rect x="56" y="130" width="44" height="56" fill="#CDEDEA" stroke-width="1" vector-effect="non-scaling-stroke"/>
<path d="M72 146 V139 H84 V146" fill="none" stroke-width="1.5" vector-effect="non-scaling-stroke"/>
<rect x="64" y="146" width="28" height="36" rx="3" fill="#00B2A9" stroke-width="1.5" vector-effect="non-scaling-stroke"/>
<path d="M72 152 V176 M84 152 V176" stroke="#0E1E21" stroke-width="1" opacity="0.6" vector-effect="non-scaling-stroke"/>
<rect x="250" y="10" width="44" height="236" fill="#F7F6F2" stroke-width="1" vector-effect="non-scaling-stroke"/>
<rect x="256" y="24" width="32" height="44" rx="2" fill="#14282C" stroke-width="1" vector-effect="non-scaling-stroke"/>
<rect x="261" y="38" width="22" height="3" fill="#00B2A9" stroke="none"/>
<rect x="261" y="46" width="14" height="2" fill="#6F8F8D" stroke="none"/>
<rect x="261" y="84" width="22" height="22" fill="#FFFFFF" stroke-width="1" vector-effect="non-scaling-stroke"/>
<path d="M264 87 h5 v5 h-5 z M275 87 h5 v5 h-5 z M264 98 h5 v5 h-5 z M275 98 h2 v2 h-2 z M278 101 h2 v2 h-2 z" fill="#14282C" stroke="none"/>
<path d="M262 124 H282" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
<rect x="0" y="250" width="300" height="5" fill="#00B2A9" stroke="none"/>
<rect x="0" y="256" width="300" height="24" fill="#E8F6F5" stroke-width="1" vector-effect="non-scaling-stroke"/>
<text x="12" y="273" font-family="Inter Tight, Inter, sans-serif" font-weight="700" font-size="12" letter-spacing="-0.3" fill="#14282C" stroke="none">${esc(labels.wordmark)}</text>
</g>
<g transform="matrix(-0.866 0.5 0 1 198.5 225)" stroke="#14282C" stroke-linejoin="round">
<g class="${hero ? 'door' : ''}">
<rect x="0" y="0" width="40" height="56" fill="#FFFFFF" stroke-width="1.5" vector-effect="non-scaling-stroke"/>
<path d="M34 22 V34" stroke="#00B2A9" stroke-width="2.5" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
</g>
</g>
<path d="M52 470 C 70 380, 120 318, 196 286" fill="none" stroke="#14282C" stroke-width="1.5" stroke-dasharray="4 5" marker-end="url(#arrow-${id})"/>
<g transform="translate(30 470)" stroke="#14282C" stroke-width="1.5" fill="#FFFFFF" stroke-linejoin="round">
<rect x="0" y="6" width="34" height="38" rx="4"/>
<path d="M11 6 V1 H23 V6" fill="none"/>
<path d="M11 14 V36 M23 14 V36" fill="none"/>
</g>
${calloutGroup}
<text x="${R - 4}" y="512" font-family="Inter, system-ui, sans-serif" font-size="10" letter-spacing="1.2" fill="#7E9392" text-anchor="end">${esc(labels.illustrative)}</text>
</svg>`;
  return draw ? drawable(svg) : svg;
}

/* --------------------------------------------------------- Floor plan */
/** labels: { aria, title, zone, outlet, length, depth, caption } */
export function floorPlan({ labels, id = 'p' }) {
  return drawable(`<svg viewBox="0 0 460 440" width="460" height="440" fill="none" stroke-linejoin="round" stroke-linecap="round" role="img" aria-label="${esc(labels.aria)}" class="draw">
<defs><pattern id="pd-${id}" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#14282C" opacity="0.08"/></pattern>
<pattern id="ph-${id}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 V8" stroke="#00B2A9" stroke-width="1.5" opacity="0.5"/></pattern></defs>
<rect width="460" height="440" fill="url(#pd-${id})" stroke="none"/>
<text x="30" y="40" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" letter-spacing="1.4" fill="#007A74">${esc(labels.title)}</text>
<rect x="70" y="90" width="320" height="100" fill="#FFFFFF" stroke="#14282C" stroke-width="2"/>
<path d="M70 190 H390" stroke="#00B2A9" stroke-width="4"/>
<path d="M134 90 V190 M198 90 V190 M262 90 V190 M326 90 V190" stroke="#14282C" stroke-width="1"/>
<rect x="70" y="190" width="320" height="120" fill="url(#ph-${id})" stroke="#00B2A9" stroke-width="1.5" stroke-dasharray="6 5"/>
<text x="230" y="256" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="600" letter-spacing="1.2" fill="#14282C">${esc(labels.zone)}</text>
<circle cx="398" cy="80" r="9" fill="#FFFFFF" stroke="#14282C" stroke-width="1.5"/>
<path d="M395 77 V83 M401 77 V83" stroke="#14282C" stroke-width="1.5"/>
<text x="412" y="74" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="#14282C">${esc(labels.outlet)}</text>
<path d="M70 348 H390 M70 340 V356 M390 340 V356" stroke="#14282C" stroke-width="1"/>
<text x="230" y="378" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600" fill="#14282C">${esc(labels.length)}</text>
<path d="M40 90 V310 M32 90 H48 M32 310 H48" stroke="#14282C" stroke-width="1"/>
<text x="30" y="206" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600" fill="#14282C" transform="rotate(-90 30 206)" text-anchor="middle">${esc(labels.depth)}</text>
<text x="230" y="412" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" fill="#4A5F62">${esc(labels.caption)}</text>
</svg>`);
}

/* ------------------------------------------------------ What fits */
/** labels: { aria, width, height, depth, interior, suitcase } */
export function whatFits({ labels, id = 'f' }) {
  return drawable(`<svg viewBox="0 0 560 500" width="560" height="500" fill="none" stroke-linejoin="round" stroke-linecap="round" role="img" aria-label="${esc(labels.aria)}" class="draw">
<defs><pattern id="fd-${id}" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#14282C" opacity="0.08"/></pattern></defs>
<rect width="560" height="500" fill="url(#fd-${id})" stroke="none"/>
<rect x="150" y="40" width="276" height="391" fill="#F2FAF9" stroke="#14282C" stroke-width="2"/>
<rect x="162" y="52" width="252" height="367" stroke="#14282C" stroke-width="1" stroke-dasharray="4 4"/>
<path d="M258 90 V70 H318 V90" stroke="#14282C" stroke-width="2"/>
<rect x="188" y="90" width="200" height="315" rx="14" fill="#00B2A9" stroke="#14282C" stroke-width="2"/>
<path d="M238 110 V385 M338 110 V385" stroke="#0E1E21" stroke-width="1.5" opacity="0.5"/>
<circle cx="208" cy="415" r="8" fill="#FFFFFF" stroke="#14282C" stroke-width="2"/>
<circle cx="368" cy="415" r="8" fill="#FFFFFF" stroke="#14282C" stroke-width="2"/>
<path d="M150 462 H426 M150 454 V470 M426 454 V470" stroke="#14282C" stroke-width="1"/>
<text x="288" y="490" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600" fill="#14282C">${esc(labels.width)}</text>
<path d="M456 40 V431 M448 40 H464 M448 431 H464" stroke="#14282C" stroke-width="1"/>
<text x="474" y="240" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600" fill="#14282C">${esc(labels.height)}</text>
<text x="474" y="260" font-family="Inter, system-ui, sans-serif" font-size="12" fill="#4A5F62">${esc(labels.depth)}</text>
<path d="M40 150 H150" stroke="#14282C" stroke-width="1"/>
<circle cx="150" cy="150" r="3.5" fill="#00B2A9" stroke="#14282C" stroke-width="1"/>
<text x="40" y="138" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" letter-spacing="1.4" fill="#14282C">${esc(labels.interior)}</text>
<text x="40" y="172" font-family="Inter, system-ui, sans-serif" font-size="12" fill="#4A5F62">${esc(labels.suitcase)}</text>
</svg>`);
}

/* ---------------------------------------------------- Price cap chart */
/** labels: { aria, max, axis }; hourly, cap: numbers; hours: [1,2,3,4,5,6,8,12,24] */
export function priceCapChart({ labels, hourly, cap, hours = [1, 2, 3, 4, 5, 6, 8, 12, 24], hourWord = (h) => `${h}h` }) {
  const baseY = 340, capY = 90, span = baseY - capY;
  const bars = hours.map((h, i) => {
    const amount = Math.min(h * hourly, cap);
    const height = Math.round((amount / cap) * span);
    const y = baseY - height;
    const x = 80 + i * 66;
    const capped = amount >= cap;
    const fill = h === 24 ? '#14282C' : capped ? '#00B2A9' : '#CDEDEA';
    const label = capped ? '' : `<text x="${x + 24}" y="${y - 10}" fill="#14282C" font-weight="600" stroke="none">${amount}</text>`;
    return `<rect x="${x}" y="${y}" width="48" height="${height}" rx="6" fill="${fill}" stroke="none"/><text x="${x + 24}" y="362" stroke="none">${esc(hourWord(h))}</text>${label}`;
  });
  return `<svg viewBox="0 0 700 400" width="700" height="400" fill="none" role="img" aria-label="${esc(labels.aria)}">
<path d="M60 340 H680" stroke="#14282C" stroke-width="1.5"/>
<path d="M60 90 H680" stroke="#00B2A9" stroke-width="1.5" stroke-dasharray="6 5"/>
<text x="680" y="78" text-anchor="end" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" letter-spacing="1.4" fill="#007A74">${esc(labels.max)}</text>
<g font-family="Inter, system-ui, sans-serif" font-size="12" fill="#4A5F62" text-anchor="middle">${bars.join('')}</g>
<text x="60" y="390" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" letter-spacing="1.4" fill="#4A5F62">${esc(labels.axis)}</text>
</svg>`;
}

/* --------------------------------------------------- Empty locker (404) */
export function emptyLocker({ labels, id = 'n' }) {
  return `<svg viewBox="0 0 420 520" width="420" height="520" fill="none" stroke-linejoin="round" stroke-linecap="round" role="img" aria-label="${esc(labels.aria)}">
<defs><pattern id="nd-${id}" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#14282C" opacity="0.10"/></pattern></defs>
<rect width="420" height="520" fill="url(#nd-${id})"/>
<g transform="matrix(0.866 0.5 0 1 110 70)" stroke="#14282C">
<rect x="0" y="0" width="200" height="300" fill="#FFFFFF" stroke-width="2" vector-effect="non-scaling-stroke"/>
<rect x="16" y="16" width="168" height="268" fill="#CDEDEA" stroke-width="1.5" vector-effect="non-scaling-stroke"/>
<path d="M16 16 L40 40 V260 L16 284" stroke-width="1" opacity="0.4" vector-effect="non-scaling-stroke"/>
</g>
<g transform="matrix(0.866 -0.5 0 1 283 170)" stroke="#14282C"><rect x="0" y="0" width="60" height="300" fill="#E9F0EF" stroke-width="2" vector-effect="non-scaling-stroke"/></g>
<g transform="matrix(0.866 0.5 0.866 -0.5 110 70)" stroke="#14282C"><rect x="0" y="0" width="200" height="60" fill="#FFFFFF" stroke-width="2" vector-effect="non-scaling-stroke"/></g>
<g transform="matrix(-0.866 0.5 0 1 124 94)" stroke="#14282C"><rect x="0" y="0" width="110" height="268" fill="#FFFFFF" stroke-width="2" vector-effect="non-scaling-stroke"/><path d="M96 120 V150" stroke="#00B2A9" stroke-width="3" vector-effect="non-scaling-stroke"/></g>
<text x="210" y="505" text-anchor="middle" font-family="Inter Tight, Inter, sans-serif" font-size="14" font-weight="600" letter-spacing="2" fill="#007A74">${esc(labels.tag)}</text>
</svg>`;
}

/* ------------------------------------------- "Who it's for" spot drawings */
export const spot = {
  flight: `<svg viewBox="0 0 160 120" width="160" height="120" fill="none" stroke="#14282C" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><rect x="30" y="30" width="54" height="74" rx="8" fill="#FFFFFF"/><path d="M47 30V18h20v12"/><path d="M44 44v48 M70 44v48"/><circle cx="40" cy="110" r="4" fill="#FFFFFF"/><circle cx="74" cy="110" r="4" fill="#FFFFFF"/><g transform="rotate(-8 118 66)"><rect x="92" y="44" width="54" height="42" rx="4" fill="#00B2A9"/><path d="M126 44v42" stroke-dasharray="3 3"/><path d="M100 56h18 M100 64h12"/><path d="M132 60l6 5-6 5"/></g></svg>`,
  shopping: `<svg viewBox="0 0 160 120" width="160" height="120" fill="none" stroke="#14282C" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M28 46h50l-5 62H33z" fill="#FFFFFF"/><path d="M42 46v-8a11 11 0 0 1 22 0v8"/><path d="M72 58h56l-6 50H78z" fill="#00B2A9"/><path d="M88 58v-8a12 12 0 0 1 24 0v8"/><path d="M112 34h26l-3 34" fill="#FFFFFF"/><path d="M120 34v-6a5 5 0 0 1 10 0v6"/></svg>`,
  evening: `<svg viewBox="0 0 160 120" width="160" height="120" fill="none" stroke="#14282C" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><g transform="rotate(-10 80 60)"><path d="M30 40h100v12a8 8 0 0 0 0 16v12H30V68a8 8 0 0 0 0-16z" fill="#FFFFFF"/><path d="M104 40v40" stroke-dasharray="3 4"/><path d="M44 54h40 M44 64h28"/><circle cx="117" cy="60" r="6" fill="#00B2A9"/></g></svg>`,
};

/* -------------------------------------------------- Terminal screens */
/**
 * The four screens of the locker's own touchscreen. There is no phone app:
 * everything happens on the machine, so these are drawn as a kiosk — a portrait
 * screen in a rigid bezel with the card reader below it — with large targets
 * and a full keypad. `s` is the screen copy; `app` is placeholders.app; `money`
 * formats an amount for the language.
 */
export function kiosk(kind, { s, app, money, lang, t = (x, v = {}) => fill(x, v) }) {
  const dark = kind === 'open';
  let inner = '';
  if (kind === 'store') {
    inner = `<div class="screen__top"><span class="screen__mark">BagDrop</span><span class="screen__langs"><b>EN</b><span lang="th">ไทย</span><span lang="zh-Hans">中文</span></span></div>
<span class="screen__label">${esc(s.bank)} ${esc(app.bankId)}</span>
<span class="screen__title">${esc(s.storeTitle)}</span>
<div class="screen__opt screen__opt--on"><strong>${esc(s.largeLocker)}</strong><span class="small">${esc(s.fitsSuitcase)}</span><span class="teal">${esc(t(s.available, { n: app.available }))}</span></div>
<div class="screen__kv"><span>${esc(s.rate)}</span><span>${esc(t(s.rateValue))}</span></div>
<div class="screen__kv screen__kv--b"><span>${esc(s.dailyMax)}</span><span>${esc(money(300))}</span></div>
<div class="screen__cta screen__cta--teal">${esc(s.continue)}</div>`;
  } else if (kind === 'pay') {
    inner = `<span class="screen__back">← ${esc(s.back)}</span>
<span class="screen__title">${esc(s.payTitle)}</span>
<div class="screen__field"><span class="screen__label">${esc(s.mobileLabel)}</span><span class="num">${esc(app.maskedPhone)}</span></div>
<div class="screen__pair"><div class="screen__opt screen__opt--on"><span class="radio radio--on" aria-hidden="true"></span><strong>${esc(s.card)}</strong><span class="mark mark--visa screen__mark-s">VISA</span></div>
<div class="screen__opt"><span class="radio" aria-hidden="true"></span><strong>PromptPay</strong><span class="mark mark--pp screen__mark-s">QR</span></div></div>
<div class="screen__box"><div><span>${esc(s.firstHour)}</span><span>${esc(money(50))}</span></div><div><span>${esc(s.extraTime)}</span><span>${esc(s.onCollection)}</span></div></div>
<div class="screen__cta screen__cta--ink">${esc(t(s.pay, { amount: money(50) }))}</div>`;
  } else if (kind === 'open') {
    inner = `<div class="screen__done"><div class="screen__tick">${icon('check', { stroke: 2.2 })}</div><span class="screen__title">${esc(t(s.openTitle, { n: app.lockerNo }))}</span></div>
<span class="screen__hint">${esc(s.openHint)}</span>
<div class="screen__pin"><span class="screen__label">${esc(s.yourPin)}</span><span class="num">${esc(app.pin)}</span></div>
<span class="screen__hint screen__hint--s">${esc(s.smsTo)} ${esc(app.maskedPhone)}</span>
<div class="screen__cta screen__cta--outline">${esc(s.reopen)}</div>`;
  } else if (kind === 'welcome') {
    // Three of four digits entered: the keypad is the whole screen, as on a cash machine.
    const typed = app.pin.slice(0, 3).split('');
    const dots = [0, 1, 2, 3].map((i) => `<span${typed[i] ? ' class="dot--in"' : ''}>${typed[i] ? '•' : ''}</span>`).join('');
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'erase', '0', 'check'].map((k) =>
      k.length > 1 ? `<span class="key--fn">${icon(k, { size: 20, stroke: 2 })}</span>` : `<span${k === app.pin[3] ? ' class="key--on"' : ''}>${k}</span>`).join('');
    inner = `<span class="screen__label">${esc(t(s.inUse, { n: app.lockerNo }))}</span>
<span class="screen__title">${esc(s.welcome)}</span>
<div class="screen__dots" aria-hidden="true">${dots}</div>
<div class="screen__keys" aria-hidden="true">${keys}</div>
<div class="screen__box screen__box--row"><span>${esc(t(s.stored, { t: app.storedFor[lang] || app.storedFor.en }))}</span><span>${esc(money(app.storedTotal))}</span></div>`;
  }
  return `<div class="kiosk" aria-hidden="true"><div class="screen${dark ? ' screen--dark' : ''}">${inner}</div><div class="kiosk__chin"><span class="kiosk__reader"></span><span class="kiosk__led"></span></div></div>`;
}

/* ------------------------------------------------ Director monogram */
/** Locker-door grid with the director's initials on the one teal door. */
export function monogram(name) {
  const initials = name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const doors = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
    const on = r === 1 && c === 1;
    const x = 20 + c * 68, y = 20 + r * 66;
    doors.push(`<rect x="${x}" y="${y}" width="64" height="62" rx="6" fill="${on ? '#00B2A9' : '#1D3538'}" stroke="${on ? '#00B2A9' : '#2E4A4C'}"/>${on ? '' : `<path d="M${x + 54} ${y + 25}v12" stroke="#3E5E60" stroke-width="2" stroke-linecap="round"/>`}`);
  }
  return `<svg class="monogram" viewBox="0 0 240 300" width="240" height="300" aria-hidden="true"><rect width="240" height="300" rx="24" fill="#172F33"/>${doors.join('')}<text x="120" y="126" text-anchor="middle" font-family="Inter Tight, Inter, sans-serif" font-weight="700" font-size="26" letter-spacing="-0.5" fill="#0E1E21">${esc(initials)}</text></svg>`;
}

/* ------------------------------------------------- Profile document */
export function profileDoc({ labels, regNo, legalName }) {
  return `<div class="doc-wrap" aria-hidden="true"><div class="doc">
<div class="doc__band"></div>
<div class="doc__body">
<span class="doc__mark">BagDrop</span>
<span class="doc__label">${esc(labels.label)}</span>
<span class="doc__title">${esc(labels.title)}</span>
<div class="doc__lines"><span style="width:80%"></span><span style="width:60%"></span><span style="width:70%"></span></div>
<span class="doc__foot">${esc(legalName)} · ${esc(regNo)}</span>
</div></div></div>`;
}
