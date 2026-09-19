/**
 * qa.mjs — automates the brief's QA checklist (§9) where a machine can judge.
 *
 *   node tools/qa.mjs      (after: node build.mjs)
 *
 * Deliberately strict: the whole purpose of this site is that its facts are
 * correct, so a single wrong character in the footer is a build failure.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { company, product, site, placeholders } from '../src/content/facts.mjs';
import { COPY, PAGES, urlFor } from '../src/lib/render.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, 'public');

let pass = 0, fail = 0;
const ok = (m) => { pass++; console.log(`  ✓ ${m}`); };
const bad = (m) => { fail++; console.log(`  ✗ ${m}`); };
const head = (m) => console.log(`\n${m}`);

const htmlFiles = [];
const walk = async (d) => {
  for (const e of await readdir(d, { withFileTypes: true })) {
    const f = join(d, e.name);
    if (e.isDirectory()) await walk(f); else if (f.endsWith('.html')) htmlFiles.push(f);
  }
};
await walk(DIST);
const docs = new Map();
for (const f of htmlFiles) docs.set('/' + relative(DIST, f).replace(/\\/g, '/'), await readFile(f, 'utf8'));
const pages = [...docs].filter(([p]) => !p.endsWith('404.html') && p !== '/index.html');
const css = await readFile(join(ROOT, 'src/styles/site.css'), 'utf8');

/* ---- 1. §6 legal footer facts, character by character, on every page ---- */
head('§6  Legal footer on every page');
{
  const required = [company.legalNameEn, company.legalNameTh, company.regNo, company.director.name, company.email,
    company.address.en, 'VAT registration', '© 2026 8Venture Co., Ltd. BagDrop is a trading name of 8Venture Co., Ltd.'];
  let bads = [];
  for (const [p, html] of docs) {
    if (p === '/index.html') continue;
    const lang = p.split('/')[1];
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    for (const r of required) {
      if (r.startsWith('©') && lang === 'th') continue; // Thai footer carries the Thai wording
      if (r === 'VAT registration' && lang === 'th') continue;
      if (r === company.address.en && lang === 'th') { if (!html.includes(company.address.th)) bads.push(`${p} missing Thai address`); continue; }
      if (!text.includes(r) && !html.includes(r)) bads.push(`${p} missing "${r.slice(0, 40)}"`);
    }
    const tel = company.tel.display[lang] || company.tel.display.en;
    if (!html.includes(tel)) bads.push(`${p} missing phone "${tel}"`);
    if (!html.includes('tel:+66977929922')) bads.push(`${p} missing tel: href`);
    if (!html.includes(company.lineUrl)) bads.push(`${p} missing LINE link`);
    if (!html.includes(company.dbdUrl)) bads.push(`${p} registration number not linked to DBD`);
  }
  bads.length ? bads.slice(0, 10).forEach(bad) : ok(`all ${docs.size - 1} pages carry the full legal block, phone, email, LINE, DBD link`);
}

/* ---- 2. §6 no invented facts, venues, stats, testimonials, photos ------- */
head('§6  No usage numbers, reviews, venue names or photos');
{
  const banned = [
    /lorem ipsum/i, /coming soon/i, /placehold\.co/i, /CentralWorld/i, /Central\s*Pattana/i, /Siam Paragon/i, /Icon\s*Siam/i,
    /\bCPN\b/, /TODO/, /\bFIXME\b/, /PLACEHOLDER/, /testimonial/i, /\d[\d,]*\s*bags? stored/i, /\d+\s*(happy|satisfied)\s*customers/i,
    /trusted by/i, /\bas seen (in|on)\b/i, /★|☆/, /lockers? (installed|in service) (across|at)/i,
  ];
  const hits = [];
  for (const [p, html] of docs) {
    const text = html.replace(/<style[\s\S]*?<\/style>/g, ' ');
    for (const re of banned) if (re.test(text)) hits.push(`${p} matches ${re}`);
  }
  hits.length ? hits.forEach(bad) : ok('no banned venue names, stats, testimonials or leaked placeholder markers');

  const imgs = [...docs].flatMap(([p, h]) => [...h.matchAll(/<img\b[^>]*>/g)].map((m) => `${p}: ${m[0]}`));
  imgs.length ? imgs.forEach(bad) : ok('no <img> anywhere: illustrations are inline SVG, no photography');
}

/* ---- 3. Status line ---------------------------------------------------- */
head('§6  Status line on Home and Venue Partners');
{
  let bads = [];
  for (const key of ['home', 'venues']) {
    const p = PAGES.find((x) => x.key === key);
    for (const lang of p.langs) {
      const html = docs.get(urlFor(lang, p.slug) + 'index.html');
      if (!html || !html.includes(COPY[lang].status)) bads.push(`${urlFor(lang, p.slug)} missing status line`);
    }
  }
  bads.length ? bads.forEach(bad) : ok('status line present, verbatim, in both languages');
}

/* ---- 4. Price published in numerals ------------------------------------ */
head('§4  Price published in numerals');
{
  let bads = [];
  for (const lang of site.langs) {
    const html = docs.get(urlFor(lang, 'pricing') + 'index.html');
    if (!html) { bads.push(`${lang} pricing page missing`); continue; }
    for (const n of ['50', '300', '150', '600']) if (!html.includes(n)) bads.push(`${lang} pricing missing ${n}`);
  }
  bads.length ? bads.forEach(bad) : ok('50 / 300 and every worked example appear in both languages');
}

/* ---- 5. Languages: EN + TH only, hreflang reciprocity, no 中文 toggle --- */
head('§5  Languages, hreflang, x-default, no Chinese toggle');
{
  let bads = [];
  if (existsSync(join(DIST, 'zh'))) bads.push('a /zh/ directory was built');
  for (const page of PAGES) {
    for (const lang of page.langs) {
      const path = urlFor(lang, page.slug);
      const html = docs.get(path + 'index.html');
      if (!html) { bads.push(`${path} missing`); continue; }
      if (!html.includes(`<html lang="${COPY[lang].htmlLang}">`)) bads.push(`${path} wrong <html lang>`);
      for (const other of page.langs) {
        const need = `hreflang="${COPY[other].htmlLang}" href="${site.origin}${urlFor(other, page.slug)}"`;
        if (!html.includes(need)) bads.push(`${path} missing hreflang -> ${other}`);
      }
      if (html.includes('hreflang="zh')) bads.push(`${path} claims a Chinese alternate`);
      if (!html.includes(`hreflang="x-default" href="${site.origin}${urlFor(site.defaultLang, page.slug)}"`)) bads.push(`${path} missing/incorrect x-default`);
      if (!html.includes(`<link rel="canonical" href="${site.origin}${path}">`)) bads.push(`${path} bad canonical`);
      // The toggle must land on the equivalent page in the other language.
      const other = page.langs.find((l) => l !== lang);
      const toggle = (html.match(/<nav class="lang"[\s\S]*?<\/nav>/) || [''])[0];
      if (!toggle.includes(`href="${urlFor(other, page.slug)}"`)) bads.push(`${path} toggle does not go to ${urlFor(other, page.slug)}`);
      if (toggle.includes('中文')) bads.push(`${path} still offers 中文 in the toggle`);
    }
  }
  bads.length ? bads.slice(0, 12).forEach(bad) : ok('EN/TH only; hreflang reciprocal; x-default -> en; toggle lands on the equivalent page');
}

/* ---- 6. Internal links resolve ------------------------------------------ */
head('Links resolve');
{
  const bads = new Set();
  for (const [p, html] of docs) {
    for (const m of html.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
      const t = m[1];
      if (/\.(woff2|png|svg|xml|txt|pdf)$/.test(t)) { if (!existsSync(join(DIST, t))) bads.add(`${p} -> ${t} (file missing)`); continue; }
      const target = t.endsWith('/') ? t + 'index.html' : t;
      if (!docs.has(target)) bads.add(`${p} -> ${t}`);
    }
    // Anchor links must point at an id on the same page.
    for (const m of html.matchAll(/href="#([^"]+)"/g)) {
      if (m[1] === 'main') continue;
      if (!html.includes(`id="${m[1]}"`)) bads.add(`${p} -> #${m[1]} (no such id)`);
    }
  }
  bads.size ? [...bads].slice(0, 10).forEach(bad) : ok('every internal link, file and anchor resolves');
}

/* ---- 7. Font coverage: no tofu ----------------------------------------- */
head('§3  Font subsets cover every rendered character');
{
  const { execFileSync } = await import('node:child_process');
  const py = join(ROOT, '.fontenv/bin/python');
  const script = `
import sys, json
from fontTools.ttLib import TTFont
out={}
for name,path in json.loads(sys.argv[1]).items():
    out[name]=sorted(TTFont(path).getBestCmap().keys())
print(json.dumps(out))
`;
  try {
    const map = {
      latin: join(ROOT, 'static/fonts/inter-400.woff2'),
      head: join(ROOT, 'static/fonts/intertight-600.woff2'),
      thai: join(ROOT, 'static/fonts/thai-400.woff2'),
      cjk: join(ROOT, 'static/fonts/sc-sample-500.woff2'),
    };
    const res = JSON.parse(execFileSync(py, ['-c', script, JSON.stringify(map)], { encoding: 'utf8' }));
    const sets = Object.fromEntries(Object.entries(res).map(([k, v]) => [k, new Set(v)]));
    const missing = { latin: new Set(), head: new Set(), thai: new Set(), cjk: new Set() };
    for (const [, html] of docs) {
      const text = html.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
      for (const ch of text) {
        const cp = ch.codePointAt(0);
        if (cp < 32) continue;
        const bucket = (cp >= 0x0e00 && cp <= 0x0e7f && cp !== 0x0e3f) ? 'thai'
          : ((cp >= 0x2e80 && cp <= 0x303f) || (cp >= 0x3400 && cp <= 0x4dbf) || (cp >= 0x4e00 && cp <= 0x9fff) || (cp >= 0xff00 && cp <= 0xffef)) ? 'cjk'
          : 'latin';
        if (!sets[bucket].has(cp)) missing[bucket].add(ch);
        if (bucket === 'latin' && !sets.head.has(cp)) missing.head.add(ch);
      }
    }
    let any = false;
    for (const [k, v] of Object.entries(missing)) {
      if (v.size) { any = true; bad(`${k} subset missing ${v.size} glyph(s): ${[...v].join(' ')}`); }
    }
    if (!any) ok('Inter, Inter Tight, IBM Plex Sans Thai and the 4-glyph Chinese sample cover every character');
  } catch (e) {
    bad('could not verify font coverage: ' + e.message.split('\n')[0]);
  }
}

/* ---- 8. Contrast --------------------------------------------------------- */
head('§8  WCAG 2.2 AA contrast of every token pair the design uses');
{
  const lum = (hex) => {
    const c = hex.replace('#', '').match(/../g).map((h) => parseInt(h, 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const checks = [
    ['ink on white', '#14282C', '#FFFFFF', 4.5],
    ['muted on white', '#4A5F62', '#FFFFFF', 4.5],
    ['muted on warm', '#4A5F62', '#F7F6F2', 4.5],
    ['muted on teal-pale', '#4A5F62', '#E8F6F5', 4.5],
    ['teal-text on white (links, eyebrows)', '#007A74', '#FFFFFF', 4.5],
    ['teal-text on warm', '#007A74', '#F7F6F2', 4.5],
    ['teal-text on teal-pale', '#007A74', '#E8F6F5', 4.5],
    ['ink-deep on teal (buttons, bands)', '#0E1E21', '#00B2A9', 4.5],
    ['white on ink', '#FFFFFF', '#14282C', 4.5],
    ['muted-dark on ink', '#A9B9B8', '#14282C', 4.5],
    ['muted-dark on ink-2 (monitor panel)', '#A9B9B8', '#172F33', 4.5],
    ['teal-soft on ink (eyebrows on dark)', '#7FDCD6', '#14282C', 4.5],
    ['teal numerals on ink (large text)', '#00B2A9', '#14282C', 3],
    ['teal numerals on ink-deep (large text)', '#00B2A9', '#0E1E21', 3],
    ['footer small print on ink-deep', '#7E9392', '#0E1E21', 4.5],
    ['LINE button text on LINE green', '#0B2A14', '#06C755', 4.5],
    ['focus ring on white', '#007A74', '#FFFFFF', 3],
  ];
  for (const [name, fg, bg, min] of checks) {
    const r = ratio(fg, bg);
    r >= min ? ok(`${name}: ${r.toFixed(2)}:1 (needs ${min})`) : bad(`${name}: ${r.toFixed(2)}:1 below ${min}`);
  }
  // Brand teal is 2.64:1 on white. It may be text only on dark surfaces:
  // enforce that every rule setting `color: var(--teal)` is one of the known dark-context selectors.
  const allowed = /(foot__h|stat__n|section--ink|screen--dark|screen__pin)/;
  const offenders = [];
  for (const m of css.matchAll(/([^{}]+)\{[^{}]*?(?:^|[;\s])color:\s*var\(--teal\)\s*[;}]/gms)) {
    const sel = m[1].trim().split('\n').pop().trim();
    if (!allowed.test(sel)) offenders.push(sel);
  }
  offenders.length ? offenders.forEach((s) => bad(`teal used as text outside a dark surface: ${s}`)) : ok('brand teal #00B2A9 is text only on dark surfaces, never on white');
  const inkOnTeal = ['.section--teal {', '.price--teal {', '.btn--primary {'].every((sel) => new RegExp(sel.replace(/[.{]/g, '\\$&') + '[^}]*color: var\\(--ink-deep\\)').test(css));
  inkOnTeal ? ok('teal surfaces and primary buttons use ink-deep text, never white') : bad('a teal surface does not use ink-deep text');
}

/* ---- 9. Accessibility scaffolding -------------------------------------- */
head('§8  Accessibility scaffolding');
{
  let bads = [];
  for (const [p, html] of docs) {
    if (p === '/index.html') continue;
    if (!html.includes('class="skip"')) bads.push(`${p} no skip link`);
    if (!html.includes('id="main"')) bads.push(`${p} no #main`);
    const h1 = (html.match(/<h1\b/g) || []).length;
    if (h1 !== 1) bads.push(`${p} has ${h1} <h1>`);
    if (!/<meta name="viewport"/.test(html)) bads.push(`${p} no viewport`);
    if (!/<meta name="description" content="[^"]{40,}"/.test(html)) bads.push(`${p} weak description`);
    // Every diagram is named.
    for (const m of html.matchAll(/<svg\b[^>]*role="img"[^>]*>/g)) if (!/aria-label="[^"]{8,}"/.test(m[0])) bads.push(`${p} diagram without aria-label`);
    for (const m of html.matchAll(/<svg\b[^>]*>/g)) if (!/aria-hidden="true"|role="img"/.test(m[0])) bads.push(`${p} svg neither decorative nor labelled`);
    if (!/<details class="menu">/.test(html)) bads.push(`${p} no mobile menu`);
    if (!/hreflang="/.test(html) && !p.endsWith('404.html')) bads.push(`${p} no hreflang`);
  }
  bads.length ? bads.slice(0, 10).forEach(bad) : ok('skip link, single <h1>, #main, viewport, description, labelled diagrams, mobile menu on every page');
  /prefers-reduced-motion/.test(css) && /animation:\s*none\s*!important/.test(css) ? ok('all motion disabled under prefers-reduced-motion') : bad('reduced-motion override missing');
  /:focus-visible/.test(css) ? ok('visible :focus-visible styles defined') : bad('no :focus-visible styles');
}

/* ---- 10. No third-party or blocking resources -------------------------- */
head('§8  No third-party scripts, no render-blocking resources');
{
  const bads = [];
  for (const [p, html] of docs) {
    for (const m of html.matchAll(/<script\b([^>]*)>/g)) if (!/type="application\/ld\+json"/.test(m[1])) bads.push(`${p} has executable <script>`);
    for (const m of html.matchAll(/<(?:script|img|iframe|source)\b[^>]*\bsrc="(https?:\/\/[^"]+)"/g)) bads.push(`${p} fetches ${m[1]}`);
    for (const m of html.matchAll(/<link\b[^>]*\brel="(?:stylesheet|preload|preconnect)"[^>]*\bhref="(https?:\/\/[^"]+)"/g)) bads.push(`${p} fetches ${m[1]}`);
    if (/<link[^>]+rel="stylesheet"/.test(html)) bads.push(`${p} has a blocking stylesheet`);
  }
  bads.length ? [...new Set(bads)].slice(0, 10).forEach(bad) : ok('zero JavaScript, zero third-party requests, CSS fully inlined');
}

/* ---- 11. Page weight ---------------------------------------------------- */
head('§8  Page weight (Home under ~700 KB incl. SVGs and fonts; diagrams under 40 KB)');
{
  const fsize = async (f) => (await stat(join(ROOT, 'static/fonts', f))).size;
  const fontBytes = {
    en: (await fsize('inter-400.woff2')) + (await fsize('inter-600.woff2')) + (await fsize('intertight-600.woff2')) + (await fsize('intertight-700.woff2')),
  };
  fontBytes.th = fontBytes.en + (await fsize('thai-400.woff2')) + (await fsize('thai-600.woff2'));
  let worst = 0, worstName = '';
  for (const [p, html] of pages) {
    const lang = p.split('/')[1];
    const total = Buffer.byteLength(html) + (fontBytes[lang] || fontBytes.en) + (await fsize('sc-sample-500.woff2'));
    if (total > worst) { worst = total; worstName = p; }
  }
  worst <= 700 * 1024 ? ok(`heaviest page ${worstName} = ${(worst / 1024).toFixed(1)} KB incl. fonts (budget 700 KB)`) : bad(`${worstName} = ${(worst / 1024).toFixed(1)} KB exceeds 700 KB`);
  const gz = Math.max(...pages.map(([, h]) => gzipSync(Buffer.from(h)).length));
  ok(`heaviest HTML gzipped: ${(gz / 1024).toFixed(1)} KB`);
  let bigSvg = [];
  for (const [p, html] of docs) for (const m of html.matchAll(/<svg\b[^>]*role="img"[\s\S]*?<\/svg>/g)) if (Buffer.byteLength(m[0]) > 40 * 1024) bigSvg.push(`${p} ${(Buffer.byteLength(m[0]) / 1024).toFixed(1)} KB`);
  bigSvg.length ? bigSvg.forEach(bad) : ok('every diagram SVG is under 40 KB');
}

/* ---- 12. schema.org ----------------------------------------------------- */
head('§8  Organization JSON-LD');
{
  const html = docs.get('/en/index.html');
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  try {
    const d = JSON.parse(m[1]);
    const checks = [
      ['legalName EN + TH', [].concat(d.legalName).includes(company.legalNameEn) && [].concat(d.legalName).includes(company.legalNameTh)],
      ['taxID', d.taxID === company.regNo],
      ['address', d.address?.postalCode === '10110' && d.address?.addressCountry === 'TH'],
      ['telephone', d.telephone === '+66977929922'],
      ['email', d.email === company.email],
      ['founder', d.founder?.name === company.director.name],
    ];
    for (const [n, good] of checks) good ? ok(`JSON-LD ${n}`) : bad(`JSON-LD ${n}`);
  } catch { bad('JSON-LD did not parse'); }
}

/* ---- 13. Placeholders are tracked --------------------------------------- */
head('§7  Every placeholder is listed in CONTENT_TODO.md');
{
  const todo = existsSync(join(ROOT, 'CONTENT_TODO.md')) ? await readFile(join(ROOT, 'CONTENT_TODO.md'), 'utf8') : '';
  const src = await readFile(join(ROOT, 'src/content/placeholders.mjs'), 'utf8');
  const marked = [...src.matchAll(/PLACEHOLDER[^\n]*\n\s*(\w+):/g)].map((m) => m[1]);
  const missing = marked.filter((k) => !todo.includes('`' + k + '`'));
  missing.length ? missing.forEach((k) => bad(`placeholders.${k} not in CONTENT_TODO.md`)) : ok(`${marked.length} PLACEHOLDER entries, all tracked in CONTENT_TODO.md`);
  // OG images exist per language, and the placeholder PDF is served.
  for (const lang of site.langs) existsSync(join(DIST, 'og', `og-${lang}.png`)) ? pass++ : bad(`og/og-${lang}.png missing`);
  existsSync(join(DIST, 'company-profile.pdf')) ? ok('og cards and placeholder company-profile.pdf present') : bad('company-profile.pdf missing');
}

console.log(`\n${'-'.repeat(58)}\n  ${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
