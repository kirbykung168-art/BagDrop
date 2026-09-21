/**
 * audit.mjs — in-browser checks that static analysis cannot make.
 * Measures the real rendered page at phone widths (§7: mobile-first, sunlight,
 * one-handed). Requires `node serve.mjs` to be running.
 *
 *   node tools/audit.mjs
 */
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].find((p) => existsSync(p));

const BASE = process.env.BASE || 'http://localhost:3000';
const PATHS = [
  '/en/', '/en/how-it-works/', '/en/pricing/', '/en/venue-partners/', '/en/company/', '/en/legal/',
  '/th/', '/th/how-it-works/', '/th/pricing/', '/th/venue-partners/', '/th/company/', '/th/legal/',
  '/zh/', '/zh/how-it-works/', '/zh/pricing/',
  '/en/404.html', '/th/404.html', '/zh/404.html',
];
// 320px is the narrowest width WCAG 2.2 reflow (1.4.10) requires support for.
const WIDTHS = [320, 390];

let fail = 0;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();

for (const width of WIDTHS) {
  console.log(`\n=== ${width}px ===`);
  await page.setViewport({ width, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  for (const path of PATHS) {
    await page.goto(BASE + path, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);

    const r = await page.evaluate(() => {
      const out = { overflow: null, small: [], tiny: [], bodyPx: 0, wideEls: [] };
      out.bodyPx = parseFloat(getComputedStyle(document.body).fontSize);

      // Horizontal overflow makes a page unusable one-handed in sunlight.
      if (document.documentElement.scrollWidth > window.innerWidth + 1) {
        out.overflow = { doc: document.documentElement.scrollWidth, vw: window.innerWidth };
        for (const el of document.querySelectorAll('body *')) {
          const b = el.getBoundingClientRect();
          if (b.width > window.innerWidth + 1 && !el.closest('.table-scroll')) {
            out.wideEls.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} ${Math.round(b.width)}px`);
          }
        }
      }

      // §3: minimum 44px touch target everywhere.
      for (const el of document.querySelectorAll('a[href], button, summary')) {
        const b = el.getBoundingClientRect();
        if (b.width === 0 && b.height === 0) continue;
        if (el.closest('.foot')) continue; // footer text links sit in running text
        const label = (el.textContent || '').trim().slice(0, 28);
        // Inline links inside running prose are exempt (WCAG 2.5.8 exception).
        const inProse = !!el.closest('p, .legal-sec, .row__v, .row__p, address, .faq__a');
        if (b.height < 44 && !inProse) out.small.push(`${label} ${Math.round(b.width)}x${Math.round(b.height)}`);
        if (b.height < 24 && !inProse) out.tiny.push(`${label} ${Math.round(b.height)}px`);
      }
      // A table wider than its wrapper is clipped/side-scrolling. On a phone
      // that is effectively invisible content, so treat it as a failure.
      out.clipped = [];
      for (const t of document.querySelectorAll('table')) {
        const wrap = t.parentElement;
        if (t.scrollWidth > wrap.clientWidth + 1) {
          out.clipped.push(`${t.className || 'table'} ${t.scrollWidth}>${wrap.clientWidth}`);
        }
      }
      return out;
    });

    const problems = [];
    if (r.overflow) problems.push(`H-SCROLL ${r.overflow.doc}>${r.overflow.vw} [${[...new Set(r.wideEls)].slice(0, 3).join(', ')}]`);
    if (r.bodyPx < 16) problems.push(`body ${r.bodyPx}px < 16px`);
    if (r.clipped?.length) problems.push(`CLIPPED TABLE: ${r.clipped.join(', ')}`);
    if (r.small.length) problems.push(`${r.small.length} target(s) <44px: ${[...new Set(r.small)].slice(0, 3).join(' | ')}`);

    if (problems.length) { fail++; console.log(`  ✗ ${path}\n      ${problems.join('\n      ')}`); }
    else console.log(`  ✓ ${path}  body ${r.bodyPx}px, no overflow, targets ok`);
  }
}

await browser.close();
console.log(`\n  ${fail === 0 ? 'all pages pass at 320px and 390px' : fail + ' page/width combinations with issues'}\n`);
process.exit(fail ? 1 : 0);
