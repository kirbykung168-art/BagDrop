/**
 * Walks dist/ and writes the exact character corpus per script, so the font
 * subsetter only keeps glyphs the site actually renders. Re-run after any copy
 * change (build.mjs does this for you).
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, 'public');
const OUT = join(ROOT, 'tools', 'charsets');

const files = [];
const walk = async (d) => {
  for (const e of await readdir(d, { withFileTypes: true })) {
    const f = join(d, e.name);
    if (e.isDirectory()) await walk(f);
    else if (f.endsWith('.html') || f.endsWith('.xml')) files.push(f);
  }
};
await walk(DIST);

const chars = new Set();
for (const f of files) {
  const raw = await readFile(f, 'utf8');
  // Drop tags/JSON-LD so we only count rendered text, plus keep attribute text
  // (titles, alt, meta descriptions) since those can surface in the browser UI.
  const text = raw.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');
  for (const ch of text) chars.add(ch);
}

const inRange = (c, lo, hi) => c.codePointAt(0) >= lo && c.codePointAt(0) <= hi;
const isThai = (c) => inRange(c, 0x0e00, 0x0e7f);
const isCJK = (c) =>
  inRange(c, 0x2e80, 0x303f) || inRange(c, 0x3400, 0x4dbf) ||
  inRange(c, 0x4e00, 0x9fff) || inRange(c, 0xff00, 0xffef);

const thai = [...chars].filter(isThai);
const cjk = [...chars].filter(isCJK);
const latin = [...chars].filter((c) => !isThai(c) && !isCJK(c) && c.codePointAt(0) > 31);

await mkdir(OUT, { recursive: true });
await writeFile(join(OUT, 'cjk.txt'), cjk.join(''));
await writeFile(join(OUT, 'thai.txt'), thai.join(''));
await writeFile(join(OUT, 'latin.txt'), latin.join(''));

console.log(`  glyph corpus from ${files.length} files`);
console.log(`    latin : ${latin.length} unique`);
console.log(`    thai  : ${thai.length} unique`);
console.log(`    cjk   : ${cjk.length} unique`);
