/**
 * Crops, resizes and encodes the handoff illustrations to WebP.
 *
 * Reads src/content/images.mjs and writes static/img/<slot>-<width>.webp.
 * Encoding is done by the Chrome already on this machine (canvas → WebP), the
 * same way make-assets.mjs draws the OG cards, so there is no image library to
 * install.
 *
 *   node tools/make-images.mjs                      (sources in ~/Downloads/bagdrop-handoff)
 *   HANDOFF=/path/to/folder node tools/make-images.mjs
 */
import puppeteer from 'puppeteer-core';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { IMAGES } from '../src/content/images.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(ROOT, 'static', 'img');
const SRC = process.env.HANDOFF || join(homedir(), 'Downloads', 'bagdrop-handoff');
const QUALITY = 0.8;

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].find((p) => existsSync(p));
if (!CHROME) { console.error('No Chrome found.'); process.exit(1); }

await mkdir(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();

for (const [slot, { src, crop, widths }] of Object.entries(IMAGES)) {
  const file = join(SRC, src);
  if (!existsSync(file)) { console.error(`missing source: ${file}`); process.exitCode = 1; continue; }
  const dataUrl = `data:image/png;base64,${(await readFile(file)).toString('base64')}`;

  for (const width of widths) {
    const b64 = await page.evaluate(async (dataUrl, crop, width, quality) => {
      const img = new Image();
      img.src = dataUrl;
      await img.decode();
      const [sx, sy, sw, sh] = crop || [0, 0, img.naturalWidth, img.naturalHeight];
      const height = Math.round((width * sh) / sw);
      const bmp = await createImageBitmap(img, sx, sy, sw, sh, { resizeWidth: width, resizeHeight: height, resizeQuality: 'high' });
      const canvas = new OffscreenCanvas(width, height);
      canvas.getContext('2d').drawImage(bmp, 0, 0);
      const blob = await canvas.convertToBlob({ type: 'image/webp', quality });
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let s = '';
      for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      return btoa(s);
    }, dataUrl, crop || null, width, QUALITY);

    const buf = Buffer.from(b64, 'base64');
    await writeFile(join(OUT, `${slot}-${width}.webp`), buf);
    console.log(`  ${slot}-${width}.webp  ${(buf.length / 1024).toFixed(1)} KB`);
  }
}

await browser.close();
