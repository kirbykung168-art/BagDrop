/**
 * Generates the Open Graph cards and the PNG icon sizes.
 *
 * OG card (brief §8): wordmark + locker illustration on teal, 1200 × 630, one
 * per language. Drawn with the site's own fonts and SVG so a shared link looks
 * like the page it opens. Icons are rendered from static/favicon.svg.
 *
 *   node tools/make-assets.mjs     (run after tools/build-fonts.sh)
 */
import puppeteer from 'puppeteer-core';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { company, product, site } from '../src/content/facts.mjs';
import { COPY, money, tFor } from '../src/lib/render.mjs';
import { lockerIllustration } from '../src/lib/components.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PUB = join(ROOT, 'static');

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].find((p) => existsSync(p));
if (!CHROME) { console.error('No Chrome found.'); process.exit(1); }

const b64 = async (f) => (await readFile(join(PUB, 'fonts', f))).toString('base64');
const face = (fam, w, data) =>
  `@font-face{font-family:'${fam}';font-weight:${w};font-style:normal;src:url(data:font/woff2;base64,${data}) format('woff2');}`;

const fonts = [
  face('Inter', 400, await b64('inter-400.woff2')),
  face('Inter', 600, await b64('inter-600.woff2')),
  face('Inter Tight', 600, await b64('intertight-600.woff2')),
  face('Inter Tight', 700, await b64('intertight-700.woff2')),
  face('IBM Plex Sans Thai', 400, await b64('thai-400.woff2')),
  face('IBM Plex Sans Thai', 600, await b64('thai-600.woff2')),
].join('');

function card(lang) {
  const c = COPY[lang];
  const t = tFor(lang);
  const th = lang === 'th';
  const price = `${money(lang, product.price.hourly)} ${c.ui.perHour} · ${money(lang, product.price.dailyCap)} ${c.ui.maxPerDay}`;
  const svg = lockerIllustration({ labels: c.diagrams.locker, callouts: false, id: 'og' })
    // The card is teal, so the drawing's dotted paper and dashed floor go ink-on-teal.
    .replace(/fill="url\(#dots-og\)"/, 'fill="none"');
  return `<!doctype html><html lang="${c.htmlLang}"><head><meta charset="utf-8"><style>
${fonts}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#00B2A9;color:#0E1E21;overflow:hidden;position:relative;
  font-family:${th ? "'IBM Plex Sans Thai','Inter'" : "'Inter'"},sans-serif;-webkit-font-smoothing:antialiased}
.text{position:absolute;left:72px;top:64px;width:600px;display:flex;flex-direction:column;gap:28px}
.mark{font-family:'Inter Tight','Inter',sans-serif;font-weight:700;font-size:40px;letter-spacing:-.03em}
.eyebrow{font-size:16px;font-weight:600;letter-spacing:${th ? '.06em' : '.16em'};text-transform:${th ? 'none' : 'uppercase'}}
h1{font-family:${th ? "'IBM Plex Sans Thai'" : "'Inter Tight'"},'Inter',sans-serif;font-weight:600;font-size:${th ? 60 : 66}px;line-height:${th ? 1.2 : 1};letter-spacing:${th ? 0 : '-.045em'};max-width:560px}
.price{font-family:'Inter Tight','Inter',sans-serif;font-weight:600;font-size:26px;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.foot{position:absolute;left:72px;bottom:56px;font-size:18px;display:flex;gap:18px;align-items:baseline}
.reg{font-variant-numeric:tabular-nums;letter-spacing:.04em;font-weight:600}
.art{position:absolute;right:-20px;top:40px;width:600px;height:560px}
.art svg{width:100%;height:100%}
</style></head><body>
<div class="text">
  <div class="mark">BagDrop</div>
  <div class="eyebrow">${c.home.eyebrow}</div>
  <h1>${c.home.h1}</h1>
  <div class="price">${price}</div>
</div>
<div class="foot"><span>${company.legalNameEn}</span><span class="reg">${company.regNo}</span><span>${site.origin.replace('https://', '')}</span></div>
<div class="art">${svg}</div>
</body></html>`;
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--font-render-hinting=none'] });
const page = await browser.newPage();

await mkdir(join(PUB, 'og'), { recursive: true });
for (const lang of site.langs) {
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(card(lang), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(PUB, 'og', `og-${lang}.png`), type: 'png' });
  console.log(`  og/og-${lang}.png`);
}

// PNG icon sizes from the same outline as favicon.svg.
const svg = await readFile(join(PUB, 'favicon.svg'), 'utf8');
for (const [file, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180]]) {
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  await page.setContent(
    `<!doctype html><style>*{margin:0;padding:0}html,body{width:${size}px;height:${size}px;overflow:hidden}svg{width:${size}px;height:${size}px;display:block}</style>${svg}`,
    { waitUntil: 'load' }
  );
  await page.screenshot({ path: join(PUB, file), type: 'png' });
  console.log(`  ${file}`);
}

await browser.close();
