import { company, product, site, thb, paymentMarks } from '../content/facts.mjs';
import en from '../content/copy/en.mjs';
import th from '../content/copy/th.mjs';
import zh from '../content/copy/zh.mjs';

export const COPY = { en, th, zh };
export { company, product, site, thb, paymentMarks };

/** Page registry. `langs` lists the languages a page actually exists in —
 *  this drives both routing and hreflang, so the two can never disagree. */
export const PAGES = [
  { key: 'home',    slug: '',                langs: ['en', 'th', 'zh'] },
  { key: 'how',     slug: 'how-it-works',    langs: ['en', 'th', 'zh'] },
  { key: 'pricing', slug: 'pricing',         langs: ['en', 'th', 'zh'] },
  { key: 'venues',  slug: 'venue-partners',  langs: ['en', 'th'] },
  { key: 'company', slug: 'company',         langs: ['en', 'th'] },
  { key: 'legal',   slug: 'legal',           langs: ['en', 'th'] },
];

export const pageByKey = (k) => PAGES.find((p) => p.key === k);
export const urlFor = (lang, slug) => `/${lang}/${slug ? slug + '/' : ''}`;

/** Where a given language should send a user for a page, falling back to
 *  English when that page has no version in their language. */
export function hrefFor(lang, key) {
  const p = pageByKey(key);
  return p.langs.includes(lang) ? urlFor(lang, p.slug) : urlFor('en', p.slug);
}

/* Fonts needed to paint the first screen. Preloading the BOLD face matters as
   much as the regular one: the <h1> is the LCP element, and discovering its
   font late is what produced the layout shift on Thai pages. The wordmark is
   Latin on every page, so Inter 700 is always included. */
export const PRELOAD = {
  en: ['inter-400', 'inter-700'],
  th: ['thai-400', 'thai-700', 'inter-700'],
  zh: ['sc-400', 'sc-700', 'inter-700'],
};

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Currency reads differently in each language; the numeral never changes. */
export function money(lang, n) {
  const num = thb(n);
  if (lang === 'en') return { pre: 'THB', num, post: '' };
  if (lang === 'th') return { pre: '', num, post: 'บาท' };
  return { pre: '', num, post: '泰铢' };
}

export function moneyText(lang, n) {
  const m = money(lang, n);
  return [m.pre, m.num, m.post].filter(Boolean).join(' ');
}

/** A tariff figure: currency word, tabular numeral, unit. */
export function tariffCell(lang, label, amount, unit, extraClass = '') {
  const m = money(lang, amount);
  return `<div class="tariff__cell ${extraClass}">
        <div class="tariff__label">${esc(label)}</div>
        <p class="tariff__fig">
          ${m.pre ? `<span class="tariff__cur">${esc(m.pre)}</span>` : ''}
          <span class="tariff__num">${esc(m.num)}</span>
          ${m.post ? `<span class="tariff__cur">${esc(m.post)}</span>` : ''}
          ${unit ? `<span class="tariff__unit">${esc(unit)}</span>` : ''}
        </p>
      </div>`;
}

export const eyebrow = (t) => `<div class="eyebrow"><span>${esc(t)}</span></div>`;

/** Definition row — the site's core information pattern. */
export const row = (k, v, note = '', numeric = false) =>
  `<div class="dl__row">
      <dt class="dl__k">${esc(k)}</dt>
      <dd class="dl__v${numeric ? ' dl__v--num' : ''}">${v}${note ? `<span class="dl__note">${esc(note)}</span>` : ''}</dd>
    </div>`;

function navItems(lang, copy, currentKey) {
  return PAGES.map((p) => {
    const native = p.langs.includes(lang);
    const href = native ? urlFor(lang, p.slug) : urlFor('en', p.slug);
    return { href, label: copy.nav[p.key], key: p.key, foreign: !native, current: p.key === currentKey && native };
  });
}

function masthead(lang, copy, currentKey, switchLinks) {
  const items = navItems(lang, copy, currentKey)
    .map((i) => {
      const cur = i.current ? ' aria-current="page"' : '';
      const foreign = i.foreign ? ' hreflang="en" lang="en"' : '';
      const tag = i.foreign ? ` <span class="small muted" aria-hidden="true">EN</span>` : '';
      return `<li><a href="${i.href}"${cur}${foreign}>${esc(i.label)}${tag}</a></li>`;
    })
    .join('\n          ');

  // Language switcher keeps the reader on the equivalent page (§6).
  const langLinks = site.langs
    .map((l) => {
      const c = COPY[l];
      const target = switchLinks[l];
      if (l === lang) return `<span aria-current="true" lang="${c.htmlLang}">${esc(c.shortLabel)}</span>`;
      if (!target) return '';
      return `<a href="${target}" lang="${c.htmlLang}" hreflang="${c.htmlLang}">${esc(c.shortLabel)}</a>`;
    })
    .filter(Boolean)
    .join('<span class="langs__sep" aria-hidden="true">/</span>');

  return `<header class="masthead">
    <div class="wrap">
      <div class="masthead__bar">
        <a class="wordmark" href="${urlFor(lang, '')}">BagDrop</a>
        <div class="masthead__right">
          <a class="btn btn--ghost" href="${company.lineUrl}" rel="noopener">${esc(copy.ui.lineShort)}</a>
        </div>
      </div>
    </div>
    <div class="nav">
      <div class="wrap">
        <div class="nav__row">
          <nav aria-label="${esc(copy.ui.menuLabel)}">
            <ul>
            ${items}
            </ul>
          </nav>
          <nav class="langs" aria-label="${esc(copy.ui.langLabel)}">${langLinks}</nav>
        </div>
      </div>
    </div>
  </header>`;
}

function footer(lang, copy) {
  const f = copy.footer;
  const addr = (company.addressLines[lang] || company.addressLines.en).map(esc).join('<br>');
  const tel = company.tel.display[lang] || company.tel.display.en;
  const year = 2026;

  // The registration number is the single most checkable fact on the site,
  // so it is set in tabular figures and given its own row (§3).
  const regBlock = company.dbdRecordLive
    ? `<a class="foot__reg" href="${company.dbdUrl}" rel="noopener">${esc(company.regNo)}</a>`
    : `<span class="foot__reg">${esc(company.regNo)}</span>`;

  return `<footer class="foot">
    <div class="wrap">
      <div class="foot__grid">
        <div>
          <div class="foot__h">${esc(f.registeredOffice)}</div>
          <p class="foot__name" lang="th">${esc(company.legalNameTh)}</p>
          <p class="foot__name" lang="en">${esc(company.legalNameEn)}</p>
          <address>${addr}</address>
        </div>
        <div>
          <div class="foot__h">${esc(f.registration)}</div>
          <p>${regBlock}</p>
          <p class="small muted">${esc(f.alsoTaxId)}</p>
          ${company.vatPending ? `<p class="small muted">${esc(f.vatPending)}</p>` : ''}
          <div class="foot__h" style="margin-top:var(--s-5)">${esc(f.director)}</div>
          <p>${esc(company.director.name)}<span class="dl__note">${esc(company.director.role[lang] || company.director.role.en)}</span></p>
        </div>
        <div>
          <div class="foot__h">${esc(f.contact)}</div>
          <p><a href="${company.tel.href}">${esc(tel)}</a></p>
          <p><a href="mailto:${esc(company.email)}">${esc(company.email)}</a></p>
          <p><a href="${company.lineUrl}" rel="noopener">${esc(copy.ui.lineCta)}</a></p>
        </div>
      </div>
      <div class="foot__bottom">
        <span>${esc(f.copyright(year))}</span>
        <span>${esc(f.legalNote)}</span>
      </div>
    </div>
  </footer>`;
}

function jsonLd(lang) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BagDrop',
    legalName: company.legalNameEn,
    alternateName: company.legalNameTh,
    identifier: company.regNo,
    taxID: company.regNo,
    vatID: undefined,
    url: site.origin + urlFor(lang, ''),
    foundingDate: '2026-09-18',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '52/88 Tower Park Building, 17A Floor, Soi Sukhumvit 3 (Nana Nuea)',
      addressLocality: 'Khlong Toei Nuea, Watthana',
      addressRegion: 'Bangkok',
      postalCode: '10110',
      addressCountry: 'TH',
    },
    telephone: '+66977929922',
    email: company.email,
    founder: { '@type': 'Person', name: company.director.name },
    areaServed: { '@type': 'City', name: 'Bangkok' },
  };
  return JSON.stringify(data, (k, v) => (v === undefined ? undefined : v));
}

/**
 * Full document. CSS is inlined: the whole stylesheet is a few KB gzipped and
 * inlining removes the only render-blocking request on the page (§9).
 */
export function layout({ lang, pageKey, main, css, altLinks, switchLinks, canonicalPath }) {
  const copy = COPY[lang];
  const page = copy[pageKey];
  const ogLocale = { en: 'en_US', th: 'th_TH', zh: 'zh_CN' }[lang];

  // hreflang covers only the languages this page genuinely exists in.
  const alts = Object.entries(altLinks)
    .map(([l, href]) => `<link rel="alternate" hreflang="${COPY[l].htmlLang}" href="${site.origin}${href}">`)
    .join('\n  ');

  return `<!doctype html>
<html lang="${COPY[lang].htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${site.origin}${canonicalPath}">
${alts}
<link rel="alternate" hreflang="x-default" href="${site.origin}${altLinks[site.defaultLang] || canonicalPath}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="BagDrop">
<meta property="og:locale" content="${ogLocale}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${site.origin}${canonicalPath}">
<meta property="og:image" content="${site.origin}/og/og-${lang}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${site.origin}/og/og-${lang}.png">
<meta name="theme-color" content="#14282C">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
${PRELOAD[lang].map((f) => `<link rel="preload" as="font" type="font/woff2" href="/fonts/${f}.woff2" crossorigin>`).join('\n')}
<style>${css}</style>
<script type="application/ld+json">${jsonLd(lang)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(copy.ui.skip)}</a>
${masthead(lang, copy, pageKey, switchLinks)}
<main id="main">
${main}
</main>
${footer(lang, copy)}
</body>
</html>
`;
}
