# Inputs required from the client

Tracking list for brief §10, plus every placeholder currently in the build.
**Nothing on this list is invented data.** Where a value was not supplied, the
site either omits it or carries a neutral placeholder recorded below.

Status: 🔴 blocks launch · 🟠 blocks a page · 🟢 supplied

---

## Blocking launch

| # | Input | Blocks | Where it lives | Status |
|---|---|---|---|---|
| 1 | **Domain email address** (not Gmail) | Footer on every page; Company; Venue Partners | `src/content/facts.mjs` → `company.email` | 🔴 placeholder `hello@bagdrop.co.th` |
| 2 | **LINE Official Account ID** | Header + footer on every page (§8) | `src/content/facts.mjs` → `company.lineOaId`, `company.lineUrl` | 🔴 placeholder `@bagdrop` |
| 3 | **Official LINE button asset** | Header/footer button (§8 requires the official asset) | currently a text button, `.btn--ghost` | 🔴 not supplied |
| 4 | **Legal review of Terms and PDPA policy** | `/legal/` in both languages | `src/content/copy/{en,th}.mjs` → `legal` | 🔴 drafted, unreviewed |
| 5 | **Liability limit per item** | Legal §3 | `copy → legal.sections[liability]` | 🔴 stated as "to be set", no number invented |
| 6 | **Full prohibited-items list** | Legal §2 | `copy → legal.sections[prohibited]` | 🔴 draft list, marked for confirmation |
| 7 | **Maximum storage period** before property is abandoned | Legal §4; How it works | `copy → legal.sections[abandoned]` | 🔴 stated as "to be confirmed" |
| 8 | **Native Thai copy reviewer** | Every Thai page (§6) | `docs/th-copy-sheet.md` | 🔴 226 strings awaiting review |
| 9 | **Native Simplified Chinese reviewer** | Chinese traveller pages | `docs/zh-copy-sheet.md` | 🔴 121 strings awaiting review |
| 10 | **Domain + registrar access in client's name** | Launch (§12) | — | 🔴 `bagdrop.co.th` preferred; a .co.th requires company documents, which is itself a credibility signal |
| 11 | **Repository / hosting in client's name** | Handover (§12) | — | 🟠 see README "Handover" |

## Blocking a specific page

| # | Input | Blocks | Where it lives | Status |
|---|---|---|---|---|
| 12 | **Pricing rules** — billing per started hour or per minute; cap resets per calendar day or per 24h; charge for an unopened booking; refund conditions | `/pricing/` may not ship without these (§4) | `copy → pricing`, `legal.sections[refunds]` | 🔴 page built; states only the rate, the cap and the worked examples from the brief. No billing granularity is claimed. |
| 13 | **Company profile PDF** | Visual matching; Venue Partners download with file size shown (§5) | Venue Partners "Company profile" section | 🔴 currently "available on request" with a mailto, rather than a dead download link |
| 14 | **Unit dimensions** | Optional dimensioned line drawing (§7) | — | 🟠 not supplied, so **no drawing was produced**. §7 says to ask first. |
| 15 | **Photography** | Replacing typographic placeholders | — | 🟠 none used; the site uses no images at all |
| 16 | **Thai rendering of the registered address** | Thai pages, footer | `facts.mjs` → `company.addressLines.th` | 🟠 **rendered from the English address, unverified** — must be checked against the registration document |
| 17 | **Thai spelling of the director's name** | Thai pages | `facts.mjs` → `company.director.name` | 🟠 shown in Latin script on all pages; not guessed |
| 18 | **VAT wording** | Footer, Company | `facts.mjs` → `company.vatPending` | 🟠 currently shows "VAT registration: application in progress". No VAT number displayed. Set `vatPending: false` to hide the line. |
| 19 | **Payment brand assets** (Visa, Mastercard, PromptPay) | `/pricing/` payment marks (§8 requires official assets, used per each brand's guidelines) | `.marks` list | 🟠 rendered as plain text; trademarks were **not** redrawn |

## Decided

| # | Input | Decision | Status |
|---|---|---|---|
| 20 | **Default language / `x-default`** | English. `/` redirects to `/en/`. | 🟢 confirmed by client |
| 21 | **Simplified Chinese** | In scope now, traveller-facing pages only (Home, How it works, Pricing, 404) per §6 scoping | 🟢 confirmed by client |
| 22 | **Wordmark** | The word "BagDrop" as live text in Inter Bold. Matches the supplied `brand_assets/bagdrop logo.jpeg`, whose ink samples at `#14272B` ≈ the brief's `#14282C`. No icon or logo mark created. | 🟢 per §7 |
| 23 | **Favicon** | Text-only "B", drawn from the real Inter Bold outline as an SVG path (`static/favicon.svg`). **Proposed for approval** — §7 warns it must not become a de facto logo mark. | 🟠 awaiting approval |

---

## DBD verification link

The company was registered **18 September 2026**. New registrations take time to
appear on the DBD DataWarehouse, so the registration number is currently
displayed as plain text rather than linked to a record that may 404 — a dead
verification link on a credibility page is worse than none.

**Once the record is live**, set `company.dbdRecordLive = true` in
`src/content/facts.mjs`. The footer will then link the registration number to the
register, and the Company page will switch to the shorter "how to verify" wording
automatically. Both language versions change together.
