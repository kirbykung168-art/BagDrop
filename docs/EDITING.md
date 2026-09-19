# Editing guide

For whoever maintains this site. It assumes no framework knowledge — only a text
editor and a terminal.

Every change follows the same shape:

```bash
# 1. edit a file under src/
npm run build     # regenerate public/
npm run check     # 44 assertions — must say "0 failed"
npm run serve     # look at http://localhost:3000
```

If `npm run check` fails it will name the page and the problem. Do not deploy a
build that fails it.

---

## 1. Changing wording

All prose lives in two files, one per language, with **identical shapes**:

```
src/content/copy/en.mjs     English
src/content/copy/th.mjs     Thai (draft, pending native review)
```

To change the English homepage headline, edit `en.mjs` → `home.h1`. The Thai
equivalent is `th.mjs` → `home.h1`. **Change both together.**

Strings may contain `{tokens}` — `{hour}`, `{cap}`, `{company}`, `{reg}`,
`{liability}`, `{maxDays}` and so on — which are filled at build time from
`facts.mjs` and `placeholders.mjs`. Keep the tokens when you rewrite a sentence;
never type the number itself. The full list is `vars()` in `src/lib/render.mjs`.

Diagram labels (the callouts on the locker drawing, the floor plan, the chart)
are ordinary strings under `diagrams` in the same files. Nothing is baked into
an SVG.

After editing Thai, regenerate the review sheet: `node tools/copy-sheet.mjs`.

If a Thai heading breaks in the middle of a word (the browser's dictionary
splits compounds such as ต่อ|รอง), add the word to
`src/content/thai-nobreak.mjs`. The build wraps it so it cannot break; the copy
itself is never changed.

## 2. Changing a company or product fact

**Never type a company fact into a page or a copy string.** Every one lives in
`src/content/facts.mjs`.

| To change | Edit |
|---|---|
| Email address | `company.email` |
| LINE Official Account | `company.lineOaId` **and** `company.lineUrl` |
| Telephone | `company.tel.display` (per language) and `company.tel.href` |
| Registered address | `company.address` and `company.addressLines` |
| Director | `company.director.name`, `company.director.role` |
| Hide the "VAT application in progress" line | `company.vatPending: false` |
| Link the registration number to the DBD record | `company.dbdRecordLive: true` |
| Price | `product.price.hourly`, `product.price.dailyCap` |

`npm run check` verifies the legal name (EN and TH), registration number,
director, address, email, phone and LINE link on **every** page, and that the
worked examples on the Pricing page still add up.

After changing the price, regenerate the share cards: `node tools/make-assets.mjs`.

## 3. Replacing a placeholder

Unconfirmed values (billing rule, storage period, locker dimensions, liability
limit, floor plan, app screens, PDF size …) live in
`src/content/placeholders.mjs`, each under a `PLACEHOLDER` comment.
`CONTENT_TODO.md` says where each appears and what should replace it. Edit the
value, rebuild, run the check.

## 4. Adding a location page, once a locker is installed

1. **Change the status line.** `copy/*.mjs` → `status`, `statusNow`, `statusShort` in both languages.
2. **Add the page** to `PAGES` in `src/lib/render.mjs`:
   ```js
   { key: 'locations', slug: 'locations', langs: ['en', 'th'] },
   ```
   `langs` drives routing, the nav, `hreflang` and the sitemap at once.
3. **Add copy** under `locations` in each language file, plus `nav.locations`.
4. **Add a renderer** in `src/lib/pages.mjs` and register it in `RENDERERS`
   (and in `STICKY` if the page should carry the mobile price bar).
5. `npm run build && npm run check`.

State only what is verifiable: the centre, the floor, the opening hours.

## 5. Photographs and the founder's portrait

The only raster images are the OG cards and the **handoff illustrations**: drawn
scenes of the planned unit, each labelled "Illustration" on the page because no
unit is installed yet. Which drawing fills which slot, and how it is cropped, is
one table in `src/content/images.mjs`; alt text is in the copy modules under
`diagrams.images`.

To change or add one:

1. Edit the slot in `src/content/images.mjs` (`src`, `crop` in source pixels,
   `widths`).
2. `npm run images` writes the WebP files to `static/img/`. Sources are read
   from `~/Downloads/bagdrop-handoff`, or set `HANDOFF=/path/to/folder`.
3. Place it with `illustration('<slot>', …)` from `components.mjs`, which adds
   `srcset`, dimensions and lazy loading.
4. `npm run check` fails any `<img>` that is not a local `/img/*.webp` with alt,
   dimensions and lazy loading, or that is over 150 KB.

When a real portrait or unit photograph exists it goes through the same table.
For the portrait, replace `monogram()` in `pages.mjs → companyPage`.

Never use stock photography or photorealistic renders, and never present a
drawing as a photograph of an installed unit. Do not use handoff images 13–16:
they show parcel collection under another brand.

## 6. The company profile PDF

`static/company-profile.pdf` is a one-page stand-in. Replace the file and set
`placeholders.profile.sizeLabel` to the real size; the buttons on Home and
Venue Partners update.

## 7. Fonts

Seven subset faces in `static/fonts/`. If copy introduces a character outside
Latin-1 / the Thai block, `npm run check` will say "subset missing N glyph(s)";
then run `npm run fonts` (Python 3 and network needed the first time). The
Chinese sample face contains only 你好 and 中文.

## 8. Design tokens

All colour, spacing and type values are CSS custom properties at the top of
`src/styles/site.css`. Change them there, never in a page.

Brand teal `#00B2A9` is only 2.64:1 against white. It is used for fills,
buttons (with ink-deep text) and large numerals on dark surfaces. For teal text
on white use `--teal-text` (`#007A74`). `npm run check` fails the build if
`--teal` is used as a text colour outside a dark surface, or if a teal surface
uses white text.

## 9. What not to add

Usage numbers, star ratings, reviews, testimonials, press or partner logos,
venue names, photographs or renders of lockers, malls or people, a blog, a
contact form, a location map, pop-ups, chat bubbles, parallax, video, gradients,
or any third-party script (analytics needs PDPA consent first).

Leasing enquiries go to the director by phone, email or LINE. That is
intentional and is stated on the Venue Partners page.
