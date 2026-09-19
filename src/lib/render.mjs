import { company, product, site, thb, placeholders } from '../content/facts.mjs';
import en from '../content/copy/en.mjs';
import th from '../content/copy/th.mjs';
import { esc, fill } from './util.mjs';
import { icon, btn, paymentMarks } from './components.mjs';

export const COPY = { en, th };
export { company, product, site, thb, placeholders, esc, fill };

/** Page registry. `langs` drives routing, the nav, hreflang and the sitemap. */
export const PAGES = [
  { key: 'home',    slug: '',                langs: ['en', 'th'] },
  { key: 'how',     slug: 'how-it-works',    langs: ['en', 'th'] },
  { key: 'pricing', slug: 'pricing',         langs: ['en', 'th'] },
  { key: 'venues',  slug: 'venue-partners',  langs: ['en', 'th'] },
  { key: 'company', slug: 'company',         langs: ['en', 'th'] },
  { key: 'legal',   slug: 'legal',           langs: ['en', 'th'] },
];

export const pageByKey = (k) => PAGES.find((p) => p.key === k);
export const urlFor = (lang, slug) => `/${lang}/${slug ? slug + '/' : ''}`;
export function hrefFor(lang, key) {
  const p = pageByKey(key);
  return p.langs.includes(lang) ? urlFor(lang, p.slug) : urlFor('en', p.slug);
}

/* Fonts that paint the first screen. The <h1> is the LCP element, so its face
   is preloaded alongside the body face and the wordmark. */
export const PRELOAD = {
  en: ['intertight-600', 'inter-400', 'inter-600', 'intertight-700'],
  th: ['thai-600', 'thai-400', 'intertight-600', 'intertight-700'],
};

/** Currency reads differently in each language; the numeral never changes. */
export function money(lang, n) {
  return lang === 'th' ? `${thb(n)} บาท` : `THB ${thb(n)}`;
}
export const moneyText = money;

/** The substitution set every copy string may draw on. */
export function vars(lang) {
  const ph = placeholders;
  return {
    hour: money(lang, product.price.hourly),
    cap: money(lang, product.price.dailyCap),
    zero: money(lang, 0),
    company: company.legalNameEn,
    companyTh: company.legalNameTh,
    reg: company.regNo,
    email: company.email,
    tel: company.tel.display[lang] || company.tel.display.en,
    line: company.lineOaId,
    address: company.address[lang] || company.address.en,
    year: 2026,
    liability: money(lang, ph.liabilityThb),
    maxDays: ph.storage.maxDays,
    maxDaysWord: lang === 'th' ? 'สาม' : 'three',
    heldDays: ph.storage.heldDays,
    w: ph.interior.widthCm, d: ph.interior.depthCm, h: ph.interior.heightCm, kg: ph.interior.maxKg,
    litres: ph.fits.backpackLitres,
    length: ph.footprint.lengthM, depth: ph.footprint.depthM,
    size: ph.profile.sizeLabel,
    date: ph.legalUpdated[lang] || ph.legalUpdated.en,
  };
}

/** t(str) — fill a copy string with this language's facts. */
export const tFor = (lang) => {
  const v = vars(lang);
  return (s, extra = {}) => fill(s, { ...v, ...extra });
};

/* ------------------------------------------------------------ Header */
function header(lang, copy, currentKey, switchLinks) {
  const t = tFor(lang);
  const items = PAGES.filter((p) => p.key !== 'home').map((p) => {
    const cur = p.key === currentKey ? ' aria-current="page"' : '';
    return `<a href="${urlFor(lang, p.slug)}"${cur}>${esc(copy.nav[p.key])}</a>`;
  });
  const other = site.langs.find((l) => l !== lang);
  const oc = COPY[other];
  const lineLabel = t(copy.ui.lineChat);

  return `<header class="hdr">
  <div class="wrap">
    <div class="hdr__bar">
      <a class="wordmark" href="${urlFor(lang, '')}">BagDrop</a>
      <nav class="nav" aria-label="${esc(copy.ui.menuLabel)}">
        ${items.join('\n        ')}
      </nav>
      <div class="hdr__right">
        <nav class="lang" aria-label="${esc(copy.ui.langLabel)}">
          <span aria-current="true" lang="${copy.htmlLang}">${esc(copy.shortLabel)}</span>
          <span class="lang__sep" aria-hidden="true">/</span>
          <a href="${switchLinks[other]}" lang="${oc.htmlLang}" hreflang="${oc.htmlLang}">${esc(oc.shortLabel)}</a>
        </nav>
        ${btn(lineLabel, company.lineUrl, 'line', { cls: 'btn--sm hdr__line', icon: 'chat', rel: 'noopener' })}
        <details class="menu">
          <summary aria-label="${esc(copy.ui.menuOpen)}"><span class="i-menu">${icon('menu', { size: 20, stroke: 2 })}</span><span class="i-close">${icon('close', { size: 20, stroke: 2 })}</span></summary>
          <nav class="menu__panel" aria-label="${esc(copy.ui.menuLabel)}">
            <a href="${urlFor(lang, '')}"${currentKey === 'home' ? ' aria-current="page"' : ''}>${esc(copy.nav.home)}</a>
            ${items.join('\n            ')}
            ${btn(lineLabel, company.lineUrl, 'line', { cls: 'btn--sm', icon: 'chat', rel: 'noopener' })}
          </nav>
        </details>
      </div>
    </div>
  </div>
</header>`;
}

/* ---------------------------------------------------- Mobile sticky bar */
function stickyBar(lang, copy) {
  const t = tFor(lang);
  return `<div class="stickybar" aria-label="${esc(copy.nav.pricing)}">
  <div class="stickybar__price">
    <span class="num">${esc(t(copy.ui.stickyRate))}</span>
    <span class="small">${esc(t(copy.ui.stickyCap))}</span>
  </div>
  ${btn(t(copy.ui.lineChat), company.lineUrl, 'line', { rel: 'noopener' })}
</div>`;
}

/* ------------------------------------------------------------ Footer */
function footer(lang, copy) {
  const t = tFor(lang);
  const f = copy.footer;
  const tel = company.tel.display[lang] || company.tel.display.en;
  const reg = company.dbdRecordLive
    ? `<a class="foot__reg" href="${company.dbdUrl}" rel="noopener">${esc(company.regNo)}</a>`
    : `<span class="foot__reg">${esc(company.regNo)}</span>`;
  const siteLinks = PAGES.filter((p) => p.key !== 'home')
    .map((p) => `<a href="${urlFor(lang, p.slug)}">${esc(p.key === 'legal' ? copy.nav.legalFooter : copy.nav[p.key])}</a>`)
    .join('\n      ');

  return `<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div class="foot__col">
        <span class="foot__mark">BagDrop</span>
        <p class="foot__tag">${esc(f.tagline)}</p>
        ${btn(t(copy.ui.lineChatAt), company.lineUrl, 'line', { cls: 'btn--sm', rel: 'noopener' })}
      </div>
      <div class="foot__col">
        <span class="foot__h">${esc(f.registered)}</span>
        <span class="foot__name" lang="th">${esc(company.legalNameTh)}</span>
        <span class="foot__name" lang="en">${esc(company.legalNameEn)}</span>
        <address class="foot__mutedtext" lang="${lang === 'th' ? 'th' : 'en'}">${esc(company.address[lang] || company.address.en)}</address>
        <span class="foot__mutedtext">${esc(f.regNo)} ${reg} · <a href="${company.dbdUrl}" rel="noopener">${esc(f.verifyDbd)}</a></span>
        ${company.vatPending ? `<span class="foot__mutedtext">${esc(f.vatPending)}</span>` : ''}
      </div>
      <div class="foot__col">
        <span class="foot__h">${esc(f.contact)}</span>
        <span class="foot__name">${esc(company.director.name)}</span>
        <span class="foot__mutedtext">${esc(company.director.role[lang] || company.director.role.en)}</span>
        <a href="${company.tel.href}">${esc(tel)}</a>
        <a href="mailto:${esc(company.email)}">${esc(company.email)}</a>
        <a href="${company.lineUrl}" rel="noopener">${esc(t(copy.ui.lineAt))}</a>
      </div>
      <div class="foot__col foot__site">
        <span class="foot__h">${esc(f.site)}</span>
        ${siteLinks}
      </div>
    </div>
    <div class="foot__bottom">
      ${paymentMarks(placeholders.paymentMarks, { dark: true })}
      <span class="foot__copy">${esc(t(f.copyright))}</span>
    </div>
  </div>
</footer>`;
}

/* ----------------------------------------------------------- JSON-LD */
function jsonLd(lang) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BagDrop',
    legalName: [company.legalNameEn, company.legalNameTh],
    alternateName: company.legalNameTh,
    identifier: company.regNo,
    taxID: company.regNo,
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
    founder: { '@type': 'Person', name: company.director.name, jobTitle: company.director.role.en },
    areaServed: { '@type': 'City', name: 'Bangkok' },
  };
  return JSON.stringify(data);
}

/* ------------------------------------------------------------ Layout */
export function layout({ lang, pageKey, main, css, altLinks, switchLinks, canonicalPath, sticky = true }) {
  const copy = COPY[lang];
  const t = tFor(lang);
  const page = copy[pageKey];
  const ogLocale = { en: 'en_US', th: 'th_TH' }[lang];
  const title = t(page.title);
  const description = t(page.description);

  const alts = Object.entries(altLinks)
    .map(([l, href]) => `<link rel="alternate" hreflang="${COPY[l].htmlLang}" href="${site.origin}${href}">`)
    .join('\n');

  return `<!doctype html>
<html lang="${copy.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${site.origin}${canonicalPath}">
${alts}
<link rel="alternate" hreflang="x-default" href="${site.origin}${altLinks[site.defaultLang] || canonicalPath}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="BagDrop">
<meta property="og:locale" content="${ogLocale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${site.origin}${canonicalPath}">
<meta property="og:image" content="${site.origin}/og/og-${lang}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${site.origin}/og/og-${lang}.png">
<meta name="theme-color" content="#00B2A9">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
${PRELOAD[lang].map((f) => `<link rel="preload" as="font" type="font/woff2" href="/fonts/${f}.woff2" crossorigin>`).join('\n')}
<style>${css}</style>
<script type="application/ld+json">${jsonLd(lang)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(copy.ui.skip)}</a>
${header(lang, copy, pageKey, switchLinks)}
<main id="main">
${main}
</main>
${footer(lang, copy)}
${sticky ? stickyBar(lang, copy) : ''}
</body>
</html>
`;
}
