# Editing guide

For whoever maintains this site. It assumes no framework knowledge — only a text
editor and a terminal.

Every change follows the same shape:

```bash
# 1. edit a file under src/
npm run build     # regenerate public/
npm run check     # 32 assertions — must say "0 failed"
npm run serve     # look at http://localhost:3000
```

If `npm run check` fails it will name the page and the problem. Do not deploy a
build that fails it.

---

## 1. Changing wording

All prose lives in three files, one per language:

```
src/content/copy/en.mjs     English
src/content/copy/th.mjs     Thai
src/content/copy/zh.mjs     Simplified Chinese
```

They have **identical shapes**. To change the English homepage lede, edit
`en.mjs` → `home.lede`. The Thai equivalent is `th.mjs` → `home.lede`.

> **Change both languages together.** A page in one language and not the other is
> the one thing the brief rules out. `npm run check` will catch a missing page,
> but it cannot tell you that Thai text is stale.

### After changing Chinese text

The Chinese font contains **only the characters the site currently uses** — that
is how a 17 MB font becomes 50 KB. New characters will not render until you
re-subset:

```bash
npm run fonts
```

`npm run check` fails with "cjk subset missing N glyph(s)" if you forget, and
names the exact characters.

## 2. Changing a company or product fact

**Never type a company fact into a page.** Every one lives in
`src/content/facts.mjs` and is read from there by all 15 pages in all languages.

| To change | Edit |
|---|---|
| Email address | `company.email` |
| LINE Official Account | `company.lineOaId` **and** `company.lineUrl` |
| Telephone | `company.tel.display` (per language) and `company.tel.href` |
| Registered address | `company.addressLines.en` / `.th` |
| Director | `company.director.name`, `company.director.role` |
| Hide the "VAT application in progress" line | `company.vatPending: false` |
| Link the registration number to the DBD record | `company.dbdRecordLive: true` |

`npm run check` verifies the legal name (EN and TH), registration number,
director, email, phone and LINE link appear on **every** page.

## 3. Changing the price

In `src/content/facts.mjs`:

```js
price: { hourly: 50, dailyCap: 300, ... }
examples: [ { hours: 3, total: 150 }, { hours: 6, total: 300 }, { hours: 9, total: 300, capped: true } ]
```

`hourly` and `dailyCap` drive the tariff blocks on Home and Pricing, the spec
table row on Venue Partners, and the OG share cards, in all three languages.

**The worked examples do not recalculate themselves** — this is deliberate, so
that a rounding or cap rule can be expressed exactly rather than assumed. If you
change the rate, update `examples` to match. `npm run check` verifies that 50,
300 and 150 appear on the pricing page in every language; it cannot check
arithmetic you have not stated.

After changing the price, regenerate the share cards:

```bash
node tools/make-assets.mjs
```

## 4. Adding a location page, once a locker is installed

The site deliberately has no map and no "find a locker" feature, and says
locations will be listed once installed. When the first one is live:

1. **Change the status line.** `copy/*.mjs` → `status`, in all three languages.
   It currently reads "in discussions with venue partners".
2. **Add the page** to the registry in `src/lib/render.mjs`:
   ```js
   export const PAGES = [
     ...
     { key: 'locations', slug: 'locations', langs: ['en', 'th', 'zh'] },
   ];
   ```
   `langs` drives routing, the nav, `hreflang` and the sitemap at once. Listing a
   language here without writing that language's copy will fail the build.
3. **Add copy** under `locations` in each language file, plus a `nav.locations` label.
4. **Add a renderer** in `src/lib/pages.mjs` and register it in `RENDERERS`.
   Copy the shape of `companyPage` — a lede plus `dl` definition rows.
5. `npm run build && npm run check`.

State only what is verifiable: the centre, the floor, the opening hours. Do not
add a map.

## 5. Replacing typographic placeholders with photographs

The site currently contains **no images at all**, by instruction. When real
photographs of an installed unit exist:

1. Put them in `static/photos/`, exported to **AVIF or WebP**.
2. Add them with explicit dimensions and real alt text:
   ```html
   <img src="/photos/unit-front.avif" width="1200" height="900" loading="lazy"
        decoding="async" alt="A BagDrop locker bank of twenty doors, seen from the front.">
   ```
3. Above the fold, drop `loading="lazy"` — it delays the LCP element.
4. Re-run `npm run check` (it asserts no `<img>` exists, so **that assertion will
   now fail and should be removed** — it is a guard against stock imagery, not
   against real photography) and re-run Lighthouse.

Never use stock photography or AI-generated images.

## 6. The company profile PDF

When supplied, put it in `static/` and replace the "available on request" mailto
in `src/lib/pages.mjs` → `venues()` with a real link. The brief requires the
**file size to be shown**:

```js
<a class="btn" href="/bagdrop-company-profile.pdf" download>
  ${esc(p.profileCta)} <span class="small muted">PDF, 2.4 MB</span></a>
```

## 7. Design tokens

All colour, spacing and type values are CSS custom properties at the top of
`src/styles/site.css`. Change them there, never in a page.

The brand colour `#00B2A9` is **only 2.64:1 against white** — too low for text at
any size. It is used for rules, borders and the left edge of the status block.
`npm run check` fails the build if it is ever used as a `color:` value. For teal
text use `var(--link)` (`#007A73`, 5.21:1).

## 8. What not to add

The brief rules these out: a blog, a careers page, a separate FAQ page (answers
belong in How it works), a contact form, a location map, a newsletter signup,
carousels, pop-ups, floating chat bubbles, scroll animation, hero video, parallax
and gradients.

Leasing enquiries go to the director by phone, email or LINE. That is intentional
and is stated on the Venue Partners page.
