/**
 * build.mjs — zero-dependency static site generator.
 *
 * Deliberately not Astro/Eleventy (§9 names those as examples): the whole site
 * is 16 documents with no client JavaScript, so a build with no node_modules is
 * faster, has no supply chain, and stays readable for whoever edits it next.
 *
 *   node build.mjs          → writes ./dist
 */
import { readFile, writeFile, mkdir, rm, cp, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { gzipSync } from 'node:zlib';

import { layout, PAGES, COPY, site, urlFor } from './src/lib/render.mjs';
import { RENDERERS } from './src/lib/pages.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');

const write = async (rel, contents) => {
  const out = join(DIST, rel);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, contents);
  return { rel, bytes: Buffer.byteLength(contents) };
};

/** Minify the stylesheet enough to matter, without a dependency. */
function squeezeCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

async function main() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  const css = squeezeCss(await readFile(join(ROOT, 'src/styles/site.css'), 'utf8'));
  const written = [];

  for (const page of PAGES) {
    // hreflang may only claim languages this page genuinely exists in.
    const altLinks = Object.fromEntries(page.langs.map((l) => [l, urlFor(l, page.slug)]));

    for (const lang of page.langs) {
      // The toggle offers every language: the equivalent page where there is
      // one, that language's homepage where there is not (§6).
      const switchLinks = Object.fromEntries(
        site.langs.map((l) => [l, page.langs.includes(l) ? urlFor(l, page.slug) : urlFor(l, '')])
      );
      const canonicalPath = urlFor(lang, page.slug);
      const html = layout({
        lang,
        pageKey: page.key,
        main: RENDERERS[page.key](lang),
        css,
        altLinks,
        switchLinks,
        canonicalPath,
      });
      written.push(await write(join(canonicalPath.slice(1), 'index.html'), html));
    }
  }

  // 404 — one per language, plus a root copy for hosts that serve a single file.
  for (const lang of site.langs) {
    const switchLinks = Object.fromEntries(site.langs.map((l) => [l, `/${l}/404.html`]));
    const html = layout({
      lang,
      pageKey: 'notFound',
      main: RENDERERS.notFound(lang),
      css,
      altLinks: {},
      switchLinks,
      canonicalPath: `/${lang}/404.html`,
    });
    written.push(await write(`${lang}/404.html`, html));
    if (lang === site.defaultLang) written.push(await write('404.html', html));
  }

  // Root: send the bare domain to the default language (x-default).
  const rootRedirect = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>BagDrop</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${site.origin}${urlFor(site.defaultLang, '')}">
<meta http-equiv="refresh" content="0; url=${urlFor(site.defaultLang, '')}">
</head>
<body>
<p><a href="${urlFor('en', '')}">English</a> &middot; <a href="${urlFor('th', '')}">ไทย</a> &middot; <a href="${urlFor('zh', '')}">中文</a></p>
</body>
</html>
`;
  written.push(await write('index.html', rootRedirect));

  // Netlify-style host redirect, so the bare domain 301s rather than meta-refreshes.
  written.push(await write('_redirects', `/  ${urlFor(site.defaultLang, '')}  301\n`));

  // sitemap.xml — every real page, with its alternates.
  const urls = [];
  for (const page of PAGES) {
    for (const lang of page.langs) {
      const alts = page.langs
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${COPY[l].htmlLang}" href="${site.origin}${urlFor(l, page.slug)}"/>`)
        .join('\n');
      urls.push(`  <url>
    <loc>${site.origin}${urlFor(lang, page.slug)}</loc>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${site.origin}${urlFor(site.defaultLang, page.slug)}"/>
  </url>`);
    }
  }
  written.push(await write('sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`));

  written.push(await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`));

  // Static assets (fonts, favicons, og images).
  const pub = join(ROOT, 'public');
  if (existsSync(pub)) await cp(pub, DIST, { recursive: true });

  // ---- Report ----------------------------------------------------------
  const pages = written.filter((w) => w.rel.endsWith('.html'));
  const biggest = pages.slice().sort((a, b) => b.bytes - a.bytes)[0];
  let assetBytes = 0;
  const walk = async (d) => {
    for (const e of await readdir(d, { withFileTypes: true })) {
      const f = join(d, e.name);
      if (e.isDirectory()) await walk(f);
      else if (!f.endsWith('.html')) assetBytes += (await stat(f)).size;
    }
  };
  await walk(DIST);

  const gz = (b) => gzipSync(b).length;
  const biggestHtml = await readFile(join(DIST, biggest.rel));

  console.log(`\n  built ${pages.length} pages + ${written.length - pages.length} support files`);
  console.log(`  largest page : ${biggest.rel}  ${(biggest.bytes / 1024).toFixed(1)} KB  (${(gz(biggestHtml) / 1024).toFixed(1)} KB gzipped)`);
  console.log(`  assets total : ${(assetBytes / 1024).toFixed(1)} KB`);
  console.log(`  worst-case first load ≈ ${((biggest.bytes + assetBytes) / 1024).toFixed(1)} KB uncompressed\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
