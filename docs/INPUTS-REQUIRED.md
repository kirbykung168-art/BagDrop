# Inputs required from the client

Tracking list of what the client still owes. Placeholder *values* used in the
build are listed separately in `CONTENT_TODO.md` at the repo root.
**Nothing on this list is invented data.** Where a value was not supplied, the
site either omits it or carries a neutral placeholder recorded below.

Status: 🔴 blocks launch · 🟠 blocks a page · 🟢 supplied

---

## Blocking launch

| # | Input | Blocks | Where it lives | Status |
|---|---|---|---|---|
| 1 | **Domain email address** (not Gmail) | Footer on every page; Company; Venue Partners | `src/content/facts.mjs` → `company.email` | 🔴 placeholder `hello@bagdrop.co.th` |
| 2 | **LINE Official Account ID** | Header + footer on every page (§8) | `src/content/facts.mjs` → `company.lineOaId`, `company.lineUrl` | 🔴 placeholder `@bagdrop` |
| 3 | **Official LINE button asset** | Header, footer, sticky bar and contact bands | currently a LINE-green pill with a chat icon, `.btn--line` | 🟠 not supplied; current button follows the mockups |
| 4 | **Legal review of Terms and PDPA policy** | `/legal/` in both languages | `src/content/copy/{en,th}.mjs` → `legal` | 🔴 drafted, unreviewed |
| 5 | **Liability limit per locker** | Home rules; Legal §3 | `placeholders.liabilityThb` | 🔴 THB 5,000 placeholder from the design (see CONTENT_TODO.md) |
| 6 | **Full prohibited-items list** | Home rules; Legal §2 | `placeholders.prohibited`, `copy → legal.sections[prohibited]` | 🔴 draft list from the design |
| 7 | **Maximum storage period** before property is abandoned | Home rules; How it works; Legal §4 | `placeholders.storage` | 🔴 3 days + 30 days held, placeholder from the design |
| 8 | **Native Thai copy reviewer** | Every Thai page (§5) | `docs/th-copy-sheet.md` | 🔴 521 strings awaiting review |
| 9 | **Native Simplified Chinese reviewer** | Chinese pages, when reinstated | `docs/zh-copy-sheet.md` | ⚪ deferred — Chinese pages are not built until complete (brief §5) |
| 10 | **Domain + registrar access in client's name** | Launch (§12) | — | 🔴 `bagdrop.co.th` preferred; a .co.th requires company documents, which is itself a credibility signal |
| 11 | **Repository / hosting in client's name** | Handover (§12) | — | 🟠 see README "Handover" |

## Blocking a specific page

| # | Input | Blocks | Where it lives | Status |
|---|---|---|---|---|
| 12 | **Pricing rules** — per started hour; cap per calendar day; first hour at drop-off, extra time on collection | `/pricing/`, Home, How it works, Legal §1 | `placeholders.billing`, `placeholders.paymentTiming` | 🔴 built with the rules shown in the design; confirm before launch |
| 13 | **Company profile PDF** | Home venue band; Venue Partners hero and Documents section | `static/company-profile.pdf`, `placeholders.profile` | 🔴 one-page stand-in labelled 2.4 MB |
| 14 | **Unit dimensions** and footprint | What-fits diagram, spec table, floor plan | `placeholders.interior`, `placeholders.footprint` | 🟠 60 × 45 × 85 cm / 32 kg and ≈ 3.4 × 1.8 m from the design |
| 15 | **Founder portrait** | Company page, Director section | `placeholders.portrait` | 🟠 initials monogram until supplied |
| 16 | **Thai rendering of the registered address** | Thai pages, footer | `facts.mjs` → `company.addressLines.th` | 🟠 **rendered from the English address, unverified** — must be checked against the registration document |
| 17 | **Thai spelling of the director's name** | Thai pages | `facts.mjs` → `company.director.name` | 🟠 shown in Latin script on all pages; not guessed |
| 18 | **VAT wording** | Footer, Company | `facts.mjs` → `company.vatPending` | 🟠 currently shows "VAT registration: application in progress". No VAT number displayed. Set `vatPending: false` to hide the line. |
| 19 | **Payment brand assets** (Visa, Mastercard, PromptPay) | Footer on every page; Home pricing; Pricing page | `components.mjs → paymentMarks()` | 🟠 typed stand-ins as in the mockups; official artwork to replace them |

## Decided

| # | Input | Decision | Status |
|---|---|---|---|
| 20 | **Default language / `x-default`** | English. `/` redirects to `/en/`. | 🟢 confirmed by client |
| 21 | **Simplified Chinese** | Toggle removed and pages not built until Chinese is complete (brief §5). Chinese survives only as the language sample on How it works. `copy/zh.mjs` is kept. | 🟢 per brief |
| 22 | **Wordmark** | The word "BagDrop" as live text in Inter Tight 700. No icon or logo mark. | 🟢 per brief §3 |
| 23 | **Favicon** | Text-only "B" from the Inter Tight Bold outline, ink on teal (`static/favicon.svg`), per brief §8. | 🟢 per brief |

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
