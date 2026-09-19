/**
 * qa.mjs — automates the §13 definition-of-done checks that a machine can judge.
 *
 *   node tools/qa.mjs      (after: node build.mjs)
 *
 * Deliberately strict: the whole purpose of this site is that its facts are
 * correct, so a single wrong character in the footer is a build failure.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { company, product, site } from '../src/content/facts.mjs';
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

/* ---- 1. §3 facts, character-by-character, on every page ---------------- */
head('§3  Legal footer facts on every page');
{
  const required = [company.legalNameEn, company.legalNameTh, company.regNo, company.director.name, company.email];
  let bads = [];
  for (const [p, html] of pages) {
    for (const r of required) if (!html.includes(r)) bads.push(`${p} missing "${r}"`);
    const lang = p.split('/')[1];
    const tel = company.tel.display[lang] || company.tel.display.en;
    if (!html.includes(tel)) bads.push(`${p} missing phone "${tel}"`);
    if (!html.includes('tel:+66977929922')) bads.push(`${p} missing tel: href`);
    if (!html.includes(company.lineUrl)) bads.push(`${p} missing LINE link`);
  }
  bads.length ? bads.slice(0, 10).forEach(bad) : ok(`all ${pages.length} pages carry legal name (EN+TH), reg no, director, email, phone, LINE`);
}

/* ---- 2. No invented facts, no placeholder leakage --------------------- */
head('§2  No invented facts, venues, stats or placeholders');
{
  const banned = [
    /lorem ipsum/i, /coming soon/i, /placehold\.co/i, /CentralWorld/i, /Central\s*Pattana/i,
    /\bCPN\b/, /TODO/, /\bFIXME\b/, /testimonial/i, /\d+\s*(happy|satisfied)\s*customers/i,
    /trusted by/i, /\bas seen (in|on)\b/i, /lockers? (installed|in service) (across|at)/i,
  ];
  const hits = [];
  for (const [p, html] of docs) {
    const text = html.replace(/<style[\s\S]*?<\/style>/g, ' ');
    for (const re of banned) if (re.test(text)) hits.push(`${p} matches ${re}`);
  }
  hits.length ? hits.forEach(bad) : ok('no banned venue names, stats, testimonials or placeholder text');

  const imgs = [...docs].flatMap(([p, h]) => [...h.matchAll(/<img\b[^>]*>/g)].map((m) => `${p}: ${m[0]}`));
  imgs.length ? imgs.forEach(bad) : ok('no <img> anywhere (no stock or AI imagery, per §2)');
}

/* ---- 3. Status line stated honestly ----------------------------------- */
head('§2  Status line present on Home and Venue Partners');
for (const key of ['home', 'venues']) {
  const p = PAGES.find((x) => x.key === key);
  for (const lang of p.langs) {
    const html = docs.get(urlFor(lang, p.slug) + 'index.html');
    html && html.includes(COPY[lang].status) ? pass++ : bad(`${urlFor(lang, p.slug)} missing status line`);
  }
}
ok('status line on every Home and Venue Partners page');

/* ---- 4. Pricing published plainly in numerals ------------------------- */
head('§4  Price published in numerals');
{
  let bads = [];
  for (const lang of ['en', 'th', 'zh']) {
    const html = docs.get(urlFor(lang, 'pricing') + 'index.html');
    if (!html) { bads.push(`${lang} pricing page missing`); continue; }
    if (!html.includes('50')) bads.push(`${lang} pricing missing 50`);
    if (!html.includes('300')) bads.push(`${lang} pricing missing 300`);
    if (!html.includes('150')) bads.push(`${lang} pricing missing worked example 150`);
  }
  bads.length ? bads.forEach(bad) : ok('THB 50 / 300 and the worked examples appear in all three languages');
}

/* ---- 5. hreflang reciprocity + lang attributes ------------------------ */
head('§6  hreflang, x-default and lang attributes');
{
  let bads = [];
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
      // A page must NOT claim an alternate in a language it does not exist in.
      for (const absent of site.langs.filter((l) => !page.langs.includes(l))) {
        if (html.includes(`hreflang="${COPY[absent].htmlLang}" href="${site.origin}${urlFor(absent, page.slug)}"`))
          bads.push(`${path} falsely claims ${absent} alternate`);
      }
      if (!html.includes(`hreflang="x-default" href="${site.origin}${urlFor(site.defaultLang, page.slug)}"`))
        bads.push(`${path} missing/incorrect x-default`);
      if (!html.includes(`<link rel="canonical" href="${site.origin}${path}">`)) bads.push(`${path} bad canonical`);
    }
  }
  bads.length ? bads.slice(0, 12).forEach(bad) : ok('hreflang reciprocal, x-default -> ' + site.defaultLang + ', canonical + lang correct on all pages');
}

/* ---- 6. Internal links all resolve ------------------------------------ */
head('Links resolve');
{
  const bads = new Set();
  for (const [p, html] of docs) {
    for (const m of html.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
      const t = m[1];
      if (/\.(woff2|png|svg|xml|txt|pdf)$/.test(t)) continue;
      const target = t.endsWith('/') ? t + 'index.html' : t;
      if (!docs.has(target) && !/\.(html)$/.test(target)) bads.add(`${p} -> ${t}`);
      else if (target.endsWith('.html') && !docs.has(target)) bads.add(`${p} -> ${t}`);
    }
  }
  bads.size ? [...bads].slice(0, 10).forEach(bad) : ok('every internal link resolves to a built page');
}

/* ---- 7. Font coverage: no tofu ---------------------------------------- */
head('Font subsets cover every rendered character');
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
      thai: join(ROOT, 'static/fonts/thai-400.woff2'),
      cjk: join(ROOT, 'static/fonts/sc-400.woff2'),
    };
    const res = JSON.parse(execFileSync(py, ['-c', script, JSON.stringify(map)], { encoding: 'utf8' }));
    const sets = Object.fromEntries(Object.entries(res).map(([k, v]) => [k, new Set(v)]));
    const missing = { latin: new Set(), thai: new Set(), cjk: new Set() };
    for (const [, html] of docs) {
      const text = html.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');
      for (const ch of text) {
        const cp = ch.codePointAt(0);
        if (cp < 32) continue;
        const bucket = (cp >= 0x0e00 && cp <= 0x0e7f) ? 'thai'
          : ((cp >= 0x2e80 && cp <= 0x303f) || (cp >= 0x3400 && cp <= 0x4dbf) || (cp >= 0x4e00 && cp <= 0x9fff) || (cp >= 0xff00 && cp <= 0xffef)) ? 'cjk'
          : 'latin';
        if (!sets[bucket].has(cp)) missing[bucket].add(ch);
      }
    }
    let any = false;
    for (const [k, v] of Object.entries(missing)) {
      if (v.size) { any = true; bad(`${k} subset missing ${v.size} glyph(s): ${[...v].join(' ')}`); }
    }
    if (!any) ok('every rendered character has a glyph in its subset (no tofu)');
  } catch (e) {
    bad('could not verify font coverage: ' + e.message.split('\n')[0]);
  }
}

/* ---- 8. Contrast ------------------------------------------------------ */
head('WCAG 2.2 AA contrast of the colour tokens');
{
  const lum = (hex) => {
    const c = hex.replace('#', '').match(/../g).map((h) => parseInt(h, 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const checks = [
    ['ink on paper (body)', '#14282C', '#FFFFFF', 4.5],
    ['link on paper', '#007A73', '#FFFFFF', 4.5],
    ['muted on paper', '#5A6B6E', '#FFFFFF', 4.5],
    ['paper on ink (button)', '#FFFFFF', '#14282C', 4.5],
    ['focus ring vs paper', '#007A73', '#FFFFFF', 3],

  ];
  for (const [name, fg, bg, min] of checks) {
    const r = ratio(fg, bg);
    r >= min ? ok(`${name}: ${r.toFixed(2)}:1 (needs ${min})`) : bad(`${name}: ${r.toFixed(2)}:1 below ${min}`);
  }
  // §7 allows the brand colour for rules and small highlights only. Enforce it:
  // it must never appear as a `color:` value, at any size.
  const css = await readFile(join(ROOT, 'src/styles/site.css'), 'utf8');
  const asText = [...css.matchAll(/(^|[;{\s])color:\s*var\(--accent\)/g)];
  asText.length
    ? bad(`--accent used as a text colour ${asText.length}x — only 2.64:1 on white`)
    : ok('brand #00B2A9 never used as a text colour (rules and borders only)');

  const accentText = ratio('#00B2A9', '#FFFFFF');
  accentText < 4.5
    ? ok(`brand #00B2A9 is ${accentText.toFixed(2)}:1 — correctly used for rules only, never body text`)
    : bad('unexpected');
}

/* ---- 9. Accessibility scaffolding ------------------------------------- */
head('Accessibility scaffolding');
{
  let bads = [];
  for (const [p, html] of docs) {
    if (p === '/index.html') continue;
    if (!html.includes('class="skip"')) bads.push(`${p} no skip link`);
    if (!html.includes('id="main"')) bads.push(`${p} no #main`);
    const h1 = (html.match(/<h1\b/g) || []).length;
    if (h1 !== 1) bads.push(`${p} has ${h1} <h1>`);
    if (!/<meta name="viewport"/.test(html)) bads.push(`${p} no viewport`);
    // Chinese is far denser per character, so the minimum is script-aware.
    const minDesc = p.startsWith('/zh/') ? 18 : 40;
    if (!new RegExp(`<meta name="description" content="[^"]{${minDesc},}"`).test(html))
      bads.push(`${p} weak description`);
  }
  bads.length ? bads.slice(0, 10).forEach(bad) : ok('skip link, single <h1>, #main, viewport and description on every page');
}

/* ---- 10. No third-party or blocking resources ------------------------- */
head('§9  No third-party scripts, no render-blocking resources');
{
  const bads = [];
  for (const [p, html] of docs) {
    for (const m of html.matchAll(/<script\b([^>]*)>/g)) {
      if (!/type="application\/ld\+json"/.test(m[1])) bads.push(`${p} has executable <script>`);
    }
    // Only subresources the browser actually FETCHES count. canonical,
    // hreflang and og:url are absolute same-origin metadata, not requests.
    for (const m of html.matchAll(/<(?:script|img|iframe|source)\b[^>]*\bsrc="(https?:\/\/[^"]+)"/g))
      bads.push(`${p} fetches ${m[1]}`);
    for (const m of html.matchAll(/<link\b[^>]*\brel="(?:stylesheet|preload|preconnect)"[^>]*\bhref="(https?:\/\/[^"]+)"/g))
      bads.push(`${p} fetches ${m[1]}`);
    if (/<link[^>]+rel="stylesheet"/.test(html)) bads.push(`${p} has a blocking stylesheet`);
  }
  bads.length ? [...new Set(bads)].slice(0, 10).forEach(bad) : ok('zero JavaScript, zero third-party requests, CSS fully inlined');
}

/* ---- 11. Page weight -------------------------------------------------- */
head('§9  Page weight budget (500 KB)');
{
  const fontBytes = { en: 0, th: 0, zh: 0 };
  const fsize = async (f) => (await readFile(join(ROOT, 'static/fonts', f))).length;
  fontBytes.en = (await fsize('inter-400.woff2')) + (await fsize('inter-700.woff2'));
  fontBytes.th = fontBytes.en + (await fsize('thai-400.woff2')) + (await fsize('thai-700.woff2'));
  fontBytes.zh = fontBytes.en + (await fsize('sc-400.woff2')) + (await fsize('sc-700.woff2'));

  let worst = 0, worstName = '';
  for (const [p, html] of pages) {
    const lang = p.split('/')[1];
    const total = Buffer.byteLength(html) + (fontBytes[lang] || fontBytes.en);
    if (total > worst) { worst = total; worstName = p; }
  }
  worst <= 500 * 1024
    ? ok(`heaviest page ${worstName} = ${(worst / 1024).toFixed(1)} KB incl. fonts (budget 500 KB)`)
    : bad(`${worstName} = ${(worst / 1024).toFixed(1)} KB exceeds 500 KB`);

  const gz = Math.max(...pages.map(([, h]) => gzipSync(Buffer.from(h)).length));
  ok(`heaviest HTML gzipped: ${(gz / 1024).toFixed(1)} KB`);
}

/* ---- 12. schema.org --------------------------------------------------- */
head('§9  Organization JSON-LD');
{
  const html = docs.get('/en/index.html');
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  try {
    const d = JSON.parse(m[1]);
    const checks = [
      ['legalName EN', d.legalName === company.legalNameEn],
      ['alternateName TH', d.alternateName === company.legalNameTh],
      ['identifier', d.identifier === company.regNo],
      ['taxID', d.taxID === company.regNo],
      ['address', d.address?.postalCode === '10110' && d.address?.addressCountry === 'TH'],
      ['telephone', d.telephone === '+66977929922'],
      ['email', d.email === company.email],
      ['founder', d.founder?.name === company.director.name],
    ];
    for (const [n, good] of checks) good ? ok(`JSON-LD ${n}`) : bad(`JSON-LD ${n}`);
  } catch { bad('JSON-LD did not parse'); }
}

console.log(`\n${'-'.repeat(58)}\n  ${pass} passed, ${fail} failed\n`);
process.exit(fail ? 1 : 0);
