/**
 * serve.mjs — static server for ./public on http://localhost:3000
 * Zero dependencies. Serves pretty URLs (/en/pricing/ → public/en/pricing/index.html)
 * and returns the real 404 page with a 404 status, so it can be checked too.
 */
import { createServer } from 'node:http';
import { gzipSync } from 'node:zlib';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'public');
const PORT = Number(process.env.PORT || 3000);

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon', '.pdf': 'application/pdf',
};

const tryFiles = async (p) => {
  try { const s = await stat(p); if (s.isFile()) return p; if (s.isDirectory()) return tryFiles(join(p, 'index.html')); }
  catch { /* fall through */ }
  return null;
};

createServer(async (req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);
  const safe = normalize(url).replace(/^(\.\.[/\\])+/, '');
  let file = await tryFiles(join(ROOT, safe));
  let status = 200;

  if (!file) { file = await tryFiles(join(ROOT, '404.html')); status = 404; }
  if (!file) { res.writeHead(404, { 'content-type': 'text/plain' }); return res.end('Not found'); }

  let body = await readFile(file);
  // Any real host compresses text. Do the same here so Lighthouse numbers
  // measured locally reflect production rather than an artificial penalty.
  const ext = extname(file);
  const compressible = ['.html', '.css', '.js', '.svg', '.xml', '.txt', '.json'].includes(ext);
  const wantsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '');
  const encoding = compressible && wantsGzip ? 'gzip' : null;
  if (encoding) body = gzipSync(body);

  res.writeHead(status, {
    'content-type': TYPES[extname(file)] || 'application/octet-stream',
    'content-length': body.length,
    ...(encoding ? { 'content-encoding': encoding, vary: 'Accept-Encoding' } : {}),
    // Mirror the headers the production host should set (see README).
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'referrer-policy': 'strict-origin-when-cross-origin',
    'permissions-policy': 'geolocation=(), camera=(), microphone=()',
    // Identical to the policy in vercel.json, so a CSP that would break the
    // live site breaks it here first.
    'content-security-policy':
      "default-src 'none'; style-src 'unsafe-inline'; font-src 'self'; img-src 'self'; " +
      "connect-src 'self'; form-action 'none'; frame-ancestors 'none'; base-uri 'none'",
    'cache-control': extname(file) === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
  });
  res.end(body);
}).listen(PORT, () => console.log(`serving ./dist on http://localhost:${PORT}`));
