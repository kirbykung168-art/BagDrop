# BagDrop website

Static, bilingual (English / Thai) website for **BagDrop**, the trading name of
**8Venture Co., Ltd.** (บริษัท 8เวนเจอร์ จำกัด), juristic person registration
number **0105569178707**.

The site does two jobs: it tells a traveller what BagDrop is and what it costs
inside ninety seconds, and it lets a commercial property professional establish,
on a phone the night before a meeting, that a registered Thai company stands
behind it and who to call.

**No locker is in service yet.** Every page says so plainly.

---

## Quick start

```bash
npm install          # only puppeteer-core, for screenshots, OG cards and audits
npm run build        # → public/
npm run serve        # → http://localhost:3000
npm run check        # 44 correctness, fact, contrast and accessibility assertions
```

There is **no CMS, no framework and no client-side JavaScript**. `build.mjs` is a
~150-line generator with zero runtime dependencies; the production CSP has no
`script-src` at all.

## Commands

| Command | Does |
|---|---|
| `npm run build` | Renders `public/` — 14 HTML pages, sitemap, robots, redirects |
| `npm run serve` | Serves `public/` on :3000 with gzip, production headers and real 404s |
| `npm run check` | Facts, hreflang, links, font coverage, contrast, a11y scaffolding, weight, placeholders |
| `npm run lighthouse` | Lighthouse mobile on every page; fails below 95 in any category |
| `npm run fonts` | Re-subsets the webfonts (needs Python + network once) |
| `npm run shot -- <url> [label] [mobile\|desktop]` | Screenshot to `temporary screenshots/` |
| `node tools/audit.mjs` | In-browser check at 320px and 390px: overflow, 44px targets |
| `node tools/verify-headers.mjs` | Loads pages under the production CSP and fails on violations |
| `node tools/make-assets.mjs` | Regenerates OG cards and PNG icons |
| `node tools/copy-sheet.mjs` | Regenerates the Thai review sheet |

## Structure

```
src/content/facts.mjs           ← SINGLE SOURCE OF TRUTH for every company/product fact
src/content/placeholders.mjs    ← every unconfirmed value, marked PLACEHOLDER (see CONTENT_TODO.md)
src/content/copy/{en,th}.mjs    ← all prose, one module per language (zh.mjs kept for later)
src/lib/render.mjs              ← <head>, header, footer, sticky bar, JSON-LD, {token} filling
src/lib/components.mjs          ← buttons, icons, phone mockups and every SVG illustration
src/lib/pages.mjs               ← one function per page
src/styles/site.css             ← the design system (inlined into each page)
build.mjs                       ← the generator
tools/                          ← QA, Lighthouse, audit, fonts, assets
static/                         ← SOURCE assets: fonts, favicon, OG images, placeholder PDF
public/                         ← BUILD OUTPUT (git-ignored)
CONTENT_TODO.md                 ← what each placeholder is and what replaces it
docs/                           ← editing guide, client inputs, Thai copy sheet
```

**No page hardcodes a fact.** Copy strings carry `{tokens}` (`{hour}`, `{cap}`,
`{reg}`, `{liability}` …) that `render.mjs` fills from `facts.mjs` and
`placeholders.mjs` at build time, so a number is typed once and the Thai
reviewer still sees whole sentences.

## Pages

| URL | EN | TH |
|---|---|---|
| `/` | redirects to `/en/` | |
| `…/` Home | ✅ | ✅ |
| `…/how-it-works/` | ✅ | ✅ |
| `…/pricing/` | ✅ | ✅ |
| `…/venue-partners/` | ✅ | ✅ |
| `…/company/` | ✅ | ✅ |
| `…/legal/` | ✅ | ✅ |
| `…/404.html` | ✅ | ✅ |

The language toggle keeps the reader on the equivalent page; every page carries
reciprocal `hreflang` plus `x-default` (English). Chinese appears only as a
language sample on How it works; `src/content/copy/zh.mjs` is kept for when
those pages are completed.

## Design

Built from the approved mockups in the `bagdrop-handoff/design` package. The
memorable element is the price set as typography — 112–160px Inter Tight
numerals — with full-bleed teal and ink bands and stylised isometric line
drawings instead of photography.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#14282C` | Text, dark sections |
| `--ink-deep` | `#0E1E21` | Footer, text on teal |
| `--teal` | `#00B2A9` | Fills, primary buttons, large numerals on dark. **2.64:1 on white — never text on white**; `npm run check` enforces it |
| `--teal-text` | `#007A74` | Links and eyebrows on light surfaces (5.2:1) |
| `--muted` | `#4A5F62` | Secondary text on white (6.8:1) |
| `--warm` / `--teal-pale` | `#F7F6F2` / `#E8F6F5` | Alternate section fills |
| `--line-green` | `#06C755` | LINE buttons only, with `#0B2A14` text |

Type: **Inter Tight** (600/700) for headings, numerals and the wordmark;
**Inter** (400/600) for body; **IBM Plex Sans Thai** (400/600) for Thai. Latin
headings are tracked to −0.045em; Thai is never tightened and Thai body sits at
1.7 line-height. All self-hosted and subset — seven faces total **84 KB**.

Interactive pieces are native: the accordion and the mobile menu are
`<details>`, so they work by keyboard with no script. The condensing header and
the diagram draw-in are CSS scroll-driven animations; the hero door loop is a
CSS keyframe. Everything is disabled under `prefers-reduced-motion`.

## Performance

Lighthouse **mobile** against `npm run serve` (which gzips, as a real host does):

| Page | Perf | A11y | Best practices | SEO | CLS |
|---|---|---|---|---|---|
| `/en/` | 98 | 96 | 100 | 100 | 0 |
| `/th/` | 100 | 96 | 100 | 100 | 0 |
| `/en/how-it-works/` | 100 | 96 | 100 | 100 | 0 |
| `/en/pricing/` | 100 | 96 | 100 | 100 | 0 |
| `/en/venue-partners/` | 100 | 96 | 100 | 100 | 0 |
| `/en/company/` | 100 | 95 | 100 | 100 | 0 |
| `/en/legal/` | 100 | 95 | 100 | 100 | 0 |

Heaviest page including fonts: **183 KB** (Thai Home) against a 700 KB budget;
heaviest HTML gzipped **21 KB**; every diagram SVG under 40 KB.

How: zero JavaScript; CSS inlined; fonts declared with `unicode-range` so an
English page never fetches the Thai face; the `<h1>` face preloaded because it
is the LCP element; inline SVG for every illustration.

## Deployment

Pre-built static output. **`public/` is not committed** — the host runs the
build. It needs only Node.

| Host | Config | Build command | Output |
|---|---|---|---|
| **Vercel** | `vercel.json` | `node build.mjs` | `public` |
| **Netlify** | `netlify.toml` | `npm run build` | `public` |

Source assets live in `static/` and the build writes to `public/`, which is the
directory Vercel serves by default when no framework is detected — so the
deployment is correct even if `vercel.json` is not applied. `/` 301s to `/en/`;
trailing slashes are canonical; unmatched URLs return `public/404.html` with a
real 404 status.

Headers set HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy` and a CSP of `default-src 'none'`
allowing only inline styles and same-origin fonts and images.
`node serve.mjs` sends the identical set and `node tools/verify-headers.mjs`
fails on any violation.

No analytics is installed. If one is added it must be cookieless or gated
behind consent (PDPA), and the privacy section in `copy/*.mjs → legal` must be
updated first.

## Before launch

See **`CONTENT_TODO.md`** for every placeholder and **`docs/INPUTS-REQUIRED.md`**
for what the client still owes. In short: a domain email and LINE OA ID; native
Thai review of `copy/th.mjs`; legal sign-off on the terms, liability limit,
prohibited items and storage period; the real company-profile PDF; official
payment-brand artwork; the founder's portrait.
