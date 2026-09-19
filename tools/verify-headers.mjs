/**
 * Loads pages through the production header set and fails on anything the CSP
 * blocks. A Content-Security-Policy that breaks a site fails silently in the
 * browser, so it must be exercised before it reaches a live domain.
 *
 *   node serve.mjs   (in another terminal)
 *   node tools/verify-headers.mjs
 */
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const CHROME = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium'].find((p) => existsSync(p));
const BASE = process.env.BASE || 'http://localhost:3000';
const PATHS = ['/en/', '/th/', '/zh/', '/en/venue-partners/', '/en/legal/', '/en/404.html'];

let fail = 0;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });

for (const path of PATHS) {
  const page = await browser.newPage();
  const problems = [];
  page.on('console', (m) => {
    const t = m.text();
    if (/Content Security Policy|Refused to/i.test(t)) problems.push('CSP: ' + t.slice(0, 120));
    else if (m.type() === 'error') problems.push('console: ' + t.slice(0, 120));
  });
  page.on('requestfailed', (r) => problems.push(`failed: ${r.url().replace(BASE, '')} (${r.failure()?.errorText})`));
  page.on('response', (r) => { if (r.status() >= 400 && !r.url().includes('404.html')) problems.push(`HTTP ${r.status()} ${r.url().replace(BASE, '')}`); });

  await page.goto(BASE + path, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  const state = await page.evaluate(() => {
    const cs = getComputedStyle(document.body);
    const h1 = document.querySelector('h1');
    return {
      // If the inlined <style> were blocked, the background would not be white
      // and the masthead rule would be absent.
      styled: cs.backgroundColor === 'rgb(255, 255, 255)' && cs.color === 'rgb(20, 40, 44)',
      fontsLoaded: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`),
      h1Font: h1 ? getComputedStyle(h1).fontFamily.split(',')[0].replace(/["']/g, '') : null,
      jsonLd: !!document.querySelector('script[type="application/ld+json"]')?.textContent?.length,
    };
  });

  if (!state.styled) problems.push('inline CSS not applied (CSP blocked style?)');
  if (!state.fontsLoaded.length) problems.push('no webfont loaded (CSP blocked font-src?)');
  if (!state.jsonLd) problems.push('JSON-LD missing');

  if (problems.length) { fail++; console.log(`  ✗ ${path}`); problems.forEach((p) => console.log(`      ${p}`)); }
  else console.log(`  ✓ ${path}  styled, ${state.fontsLoaded.length} font(s) [${state.h1Font}], JSON-LD ok`);
  await page.close();
}

await browser.close();
console.log(`\n  ${fail ? fail + ' page(s) with problems' : 'production headers break nothing'}\n`);
process.exit(fail ? 1 : 0);
