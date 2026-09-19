# BagDrop website

Static, trilingual website for **BagDrop**, the trading name of
**8Venture Co., Ltd.** (บริษัท 8เวนเจอร์ จำกัด), juristic person registration
number **0105569178707**.

The site is a **credibility instrument**, not a marketing site. Its job is that a
commercial property professional looking up "BagDrop" the night before a meeting
can establish, within sixty seconds on a phone: what the product physically is,
what it costs, that a registered Thai company stands behind it and how to check
that, who to call, and that someone competent built it.

**No locker is in service yet.** The site states this plainly on the Home and
Venue Partners pages rather than implying an operating network.

---

## Quick start

```bash
npm install          # only puppeteer-core, for screenshots and OG images
npm run build        # → dist/
npm run serve        # → http://localhost:3000
npm run check        # 32 correctness/accessibility assertions
```

There is **no CMS, no framework and no client-side JavaScript**. `build.mjs` is a
~150-line generator with zero runtime dependencies.

## Commands

| Command | Does |
|---|---|
| `npm run build` | Renders `dist/` — 20 HTML pages, sitemap, robots, redirects |
| `npm run serve` | Static server on :3000, with gzip and real 404 status codes |
| `npm run check` | Fact, hreflang, contrast, link, font-coverage and weight assertions |
| `npm run fonts` | Re-subsets the webfonts. **Required after any Chinese copy change** |
| `npm run shot -- <url> [label] [mobile\|desktop]` | Screenshot to `temporary screenshots/` |
| `node tools/audit.mjs` | In-browser check at 320px and 390px: overflow, tap targets, clipped tables |
| `node tools/copy-sheet.mjs` | Regenerates the Thai and Chinese review sheets |
| `node tools/verify-headers.mjs` | Loads every page under the production CSP and fails on violations |
| `node tools/make-assets.mjs` | Regenerates OG cards and PNG icons |

## Structure

```
src/content/facts.mjs        ← SINGLE SOURCE OF TRUTH for every company/product fact
src/content/copy/{en,th,zh}.mjs   ← all prose, one module per language
src/lib/render.mjs           ← layout, <head>, masthead, footer, JSON-LD
src/lib/pages.mjs            ← one function per page
src/styles/site.css          ← the whole design system (inlined into each page)
build.mjs                    ← the generator
tools/                       ← QA, audit, fonts, copy sheets, asset generation
public/                      ← fonts, favicons, OG images, _headers
docs/INPUTS-REQUIRED.md      ← what the client still owes, and what is a placeholder
docs/EDITING.md              ← how to change copy, pricing, and add a location
docs/{th,zh}-copy-sheet.md   ← every translated string beside its English source
```

**No page hardcodes a company or product fact.** Everything comes from
`facts.mjs`, so the registration number cannot drift between pages or languages.
`npm run check` asserts this on all 15 content pages.

## Pages

| URL | EN | TH | ZH |
|---|---|---|---|
| `/` | redirects to `/en/` | | |
| `…/` (Home) | ✅ | ✅ | ✅ |
| `…/how-it-works/` | ✅ | ✅ | ✅ |
| `…/pricing/` | ✅ | ✅ | ✅ |
| `…/venue-partners/` | ✅ | ✅ | — |
| `…/company/` | ✅ | ✅ | — |
| `…/legal/` | ✅ | ✅ | — |
| `…/404.html` | ✅ | ✅ | ✅ |

Simplified Chinese covers the **traveller-facing** pages only, per brief §6.
Venue Partners is written for a property professional and Legal needs the
company's Thai legal adviser, so the Chinese pages link through to English and
label those links. `hreflang` only ever claims a language a page genuinely
exists in; the language toggle still offers all three, falling back to that
language's homepage.

## Design

**"Registry Editorial."** The page reads as a filed document: hairline rules,
label/value definition rows, tabular figures. No cards, no shadows, no rounded
corners, no gradients, no animation, no imagery — per brief §7, which bans all of
those. The single repeating motif is a short accent rule above a small-caps
section label.

| Token | Value | Notes |
|---|---|---|
| Ink | `#14282C` | Matches the supplied wordmark, which samples at `#14272B` |
| Paper | `#FFFFFF` | |
| Brand | `#00B2A9` | **2.64:1 on white — rules and borders only, never text.** `npm run check` enforces this |
| Link | `#007A73` | Darkened brand tint, 5.21:1, passes AA |
| Muted | `#5A6B6E` | 5.58:1, passes AA |

Type: **Inter** (Latin) and **Noto Sans Thai** and **Noto Sans SC**, self-hosted
and subset, two weights each. Latin headings are tracked to `-0.022em`; Thai and
Chinese are never tightened, and Thai body line-height is 1.75 to clear tone
marks. Thai is never justified.

The wordmark is the word "BagDrop" set in live Inter Bold text — no image, no
icon, no logo mark, per §7.

## Performance

Lighthouse **mobile**, measured locally against `npm run serve` (which gzips, as
a real host does):

| Page | Perf | A11y | Best practices | SEO | CLS |
|---|---|---|---|---|---|
| `/en/` | 100 | 100 | 100 | 100 | 0 |
| `/th/` | 100 | 100 | 100 | 100 | 0 |
| `/zh/` | 100 | 100 | 100 | 100 | 0 |
| `/th/legal/` | 100 | 100 | 100 | 100 | 0 |
| `/en/venue-partners/` | 100 | 100 | 100 | 100 | 0 |

Heaviest page including fonts: **~151 KB** against a 500 KB budget. Heaviest HTML
gzipped: **8.4 KB**.

How that is achieved:

- **Zero JavaScript.** The navigation wraps instead of hiding behind a menu button.
- **CSS inlined** into every page, so there is no render-blocking request at all.
- **Fonts declared with `unicode-range`**, so an English page never fetches the
  Thai or Chinese faces. Noto Sans SC is 17 MB at source and **50 KB** here,
  subset to exactly the characters the site renders.
- **A 0.9 KB micro-subset** serves the two characters "中文" in the language
  switcher, so English and Thai pages don't drag in the full Chinese face for a
  nav label.
- **Both weights preloaded** for each page's primary script. The `<h1>` is the LCP
  element; discovering its bold face late was what caused a 0.234 layout shift on
  Thai pages before this was fixed.

## Deployment

Pre-built static output. **`dist/` is not committed** — the host must run the
build. It needs only Node; no Python, no network and no browser are required, and
the webfonts are committed under `public/fonts/`.

| Host | Config file | Build command | Output directory |
|---|---|---|---|
| **Vercel** | `vercel.json` | `node build.mjs` | `dist` |
| **Netlify** | `netlify.toml` | `npm run build` | `dist` |

### Vercel

`vercel.json` sets everything, including the security headers — **Vercel ignores
`public/_headers`, which is Netlify's format.** Import the repository and deploy;
no dashboard configuration is needed.

If the deployment returns 404 or a blank page, the cause is almost always the
output directory. Vercel's default for a project with no detected framework is
`public/`, which here holds only fonts and icons and has **no `index.html`**. In
*Project → Settings → Build and Deployment*, make sure the **Build Command** and
**Output Directory** overrides are switched **off** so `vercel.json` applies, or
set them to `node build.mjs` and `dist`. Dashboard overrides win over
`vercel.json`, so an old override left from a first attempt will keep breaking it.

### Both hosts

- `/` is a **301** to `/en/` (x-default). `dist/index.html` is a meta-refresh
  fallback for hosts that cannot express a redirect.
- Trailing slashes are canonical (`/en/pricing/`), matching the `<link rel=canonical>`
  in every page.
- Unmatched URLs return `dist/404.html` with a real 404 status. It is the English
  404 and carries the language switcher. Netlify additionally serves per-language
  404s; Vercel would need a rewrite for that, which returns 200 and creates a soft
  404, so it is deliberately not configured.
- Headers set HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy` and a CSP of `default-src 'none'` allowing only inline
  styles and same-origin fonts and images — the site needs nothing else.
  `node serve.mjs` sends the identical header set, and
  `node tools/verify-headers.mjs` loads every page through it and fails on any CSP
  violation, blocked font or failed request. Run it before changing the policy: a
  CSP that breaks a page does so silently.

No analytics is installed. If one is added it must be cookieless or gated behind
consent, and `legal.sections[privacy]` must be updated **first** — the privacy
notice currently states that the site sets no cookies and carries no third-party
scripts, and `npm run check` asserts that this remains true.

## Before launch

See **`docs/INPUTS-REQUIRED.md`**. In short, the site cannot go live until:
a domain email and LINE OA ID replace their placeholders; the Thai and Chinese
copy is reviewed by native speakers; and the legal terms, the per-item liability
limit and the prohibited-items list are approved by the company's Thai legal
adviser. The pricing rules in §4 of the brief must also be confirmed before the
Pricing page ships.

## Handover

Per brief §12, the domain, hosting and repository must end up in the client's
name. This repository was pushed to an existing GitHub account; transfer
ownership (Settings → Danger Zone → Transfer) if that is not the client's own.
