/**
 * Generates the typographic Open Graph cards and the PNG icon sizes.
 * Purely typographic per §2 (no photography, no illustration) and drawn with
 * the same tokens as the site, so a shared link looks like the page it opens.
 *
 *   node tools/make-assets.mjs     (run after tools/build-fonts.sh)
 */
import puppeteer from 'puppeteer-core';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { company, product } from '../src/content/facts.mjs';
import { COPY, moneyText } from '../src/lib/render.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PUB = join(ROOT, 'public');

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
  face('Inter', 700, await b64('inter-700.woff2')),
  face('NotoTH', 400, await b64('thai-400.woff2')),
  face('NotoTH', 700, await b64('thai-700.woff2')),
  face('NotoSC', 400, await b64('sc-400.woff2')),
  face('NotoSC', 700, await b64('sc-700.woff2')),
].join('');

/** One OG card. Same hairline-and-tabular-figures language as the site. */
function card(lang) {
  const c = COPY[lang];
  const headline = c.home.h1;
  const price = `${moneyText(lang, product.price.hourly)} / ${c.pricing.hourLabel} · ${moneyText(lang, product.price.dailyCap)} / ${c.pricing.capLabel}`;
  const lh = lang === 'en' ? 1.08 : lang === 'th' ? 1.4 : 1.3;
  const track = lang === 'en' ? '-.028em' : '0';

  return `<!doctype html><html lang="${c.htmlLang}"><head><meta charset="utf-8"><style>
${fonts}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#fff;color:#14282C;
  font-family:Inter,NotoTH,NotoSC,sans-serif;display:flex;flex-direction:column;
  justify-content:space-between;padding:72px;-webkit-font-smoothing:antialiased}
.rule{width:72px;height:4px;background:#00B2A9}
.mark{font-family:Inter,sans-serif;font-weight:700;font-size:34px;letter-spacing:-.03em;margin-top:28px}
h1{font-weight:700;font-size:${lang === 'en' ? 68 : 58}px;line-height:${lh};letter-spacing:${track};margin-top:34px;max-width:19ch}
.price{margin-top:26px;font-size:28px;font-weight:700;color:#00726B;font-variant-numeric:tabular-nums}
footer{border-top:1px solid #D7DEDF;padding-top:22px;display:flex;justify-content:space-between;
  align-items:baseline;font-size:20px;color:#5A6B6E;gap:24px}
.reg{font-variant-numeric:tabular-nums;letter-spacing:.04em;font-weight:700;color:#14282C;white-space:nowrap}
</style></head><body>
<div>
  <div class="rule"></div>
  <div class="mark">BagDrop</div>
  <h1>${headline}</h1>
  <div class="price">${price}</div>
</div>
<footer>
  <span>${company.legalNameEn}</span>
  <span class="reg">${company.regNo}</span>
</footer>
</body></html>`;
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--font-render-hinting=none'] });
const page = await browser.newPage();

await mkdir(join(PUB, 'og'), { recursive: true });
for (const lang of ['en', 'th', 'zh']) {
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
