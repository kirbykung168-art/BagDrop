/**
 * screenshot.mjs — capture a localhost URL to ./temporary screenshots/
 *
 *   node screenshot.mjs http://localhost:3000/en/            → screenshot-N.png
 *   node screenshot.mjs http://localhost:3000/en/ home-en    → screenshot-N-home-en.png
 *   node screenshot.mjs http://localhost:3000/en/ home desktop
 *
 * Uses the Chrome already installed on this machine via puppeteer-core, rather
 * than downloading a second copy. Never screenshot a file:// URL (CLAUDE.md).
 */
import puppeteer from 'puppeteer-core';
import { readdir, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIR = join(ROOT, 'temporary screenshots');

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].find((p) => existsSync(p));

const VIEWPORTS = {
  // The brief's primary scenario: a leasing manager on a phone at 10pm.
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2 },
};

const url = process.argv[2] || 'http://localhost:3000/';
const label = process.argv[3] || '';
const mode = process.argv[4] || 'mobile';

if (!CHROME) { console.error('No Chrome found.'); process.exit(1); }
if (url.startsWith('file://')) { console.error('Refusing file:// — serve on localhost.'); process.exit(1); }

await mkdir(DIR, { recursive: true });
const existing = (await readdir(DIR)).filter((f) => /^screenshot-(\d+)/.test(f));
const next = existing.reduce((m, f) => Math.max(m, Number(f.match(/^screenshot-(\d+)/)[1])), 0) + 1;
const name = `screenshot-${next}${label ? '-' + label : ''}.png`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--font-render-hinting=none'] });
const page = await browser.newPage();
await page.setViewport(VIEWPORTS[mode] || VIEWPORTS.mobile);
const resp = await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(DIR, name), fullPage: true });
await browser.close();

console.log(`${resp.status()}  ${url}  [${mode}]  →  temporary screenshots/${name}`);
