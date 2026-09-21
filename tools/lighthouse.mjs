/**
 * Runs Lighthouse (mobile) against the local server and prints the four
 * category scores per page. Brief §8: every category ≥ 95 on mobile.
 *
 *   node serve.mjs            (in another terminal)
 *   node tools/lighthouse.mjs [path ...]
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:3000';
const PATHS = process.argv.slice(2).length ? process.argv.slice(2) : ['/en/', '/th/', '/zh/', '/en/how-it-works/', '/en/pricing/', '/en/venue-partners/', '/en/company/', '/en/legal/'];
const CHROME = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium'].find((p) => existsSync(p));

let worst = 100;
console.log(`\n  ${'page'.padEnd(24)} perf  a11y  best  seo   CLS     LCP`);
for (const path of PATHS) {
  const out = execFileSync('npx', ['--yes', 'lighthouse', BASE + path, '--quiet', '--output=json', '--chrome-flags=--headless=new', '--only-categories=performance,accessibility,best-practices,seo', '--form-factor=mobile'],
    { encoding: 'utf8', env: { ...process.env, CHROME_PATH: CHROME }, maxBuffer: 64 * 1024 * 1024 });
  const r = JSON.parse(out);
  const s = (k) => Math.round(r.categories[k].score * 100);
  const row = [s('performance'), s('accessibility'), s('best-practices'), s('seo')];
  worst = Math.min(worst, ...row);
  const cls = r.audits['cumulative-layout-shift'].numericValue.toFixed(3);
  const lcp = (r.audits['largest-contentful-paint'].numericValue / 1000).toFixed(1) + 's';
  console.log(`  ${path.padEnd(24)} ${row.map((n) => String(n).padEnd(5)).join(' ')} ${cls.padEnd(7)} ${lcp}`);
}
console.log(`\n  ${worst >= 95 ? 'all categories ≥ 95' : 'lowest score ' + worst + ' — below the 95 target'}\n`);
process.exit(worst >= 95 ? 0 : 1);
