# Content to confirm before launch

Every value below is a **placeholder** used so that the site could be built in
full (brief §7). All of them live in one file, `src/content/placeholders.mjs`,
each marked with a `PLACEHOLDER` comment; `grep -rn PLACEHOLDER src` lists the
same set. Nothing on the rendered page says these are placeholders.

To replace one: edit the value in `placeholders.mjs`, run `npm run build && npm run check`.
Where the confirmed information changes the *wording* rather than a number,
the copy string to edit is named too.

| Key in `placeholders.mjs` | Value used in the design | Where it appears | Replace with |
|---|---|---|---|
| `paymentTiming` | First hour paid at drop-off; extra time on collection | Home journey step 02; How it works step 02 and the payment phone screen; Legal §1 | The confirmed billing moment(s) from the payment provider set-up |
| `billing` | Per started hour; THB 300 cap per calendar day | Home pricing cards; Pricing "How the charge works" and chart; Legal §1; FAQ "Is there a time limit?" | Confirmed rounding rule (per started hour vs per minute) and whether the cap resets per calendar day or per 24 h |
| `storage` | Maximum 3 days, then abandoned-property procedure; held 30 days | Home rules; How it works "Staying longer"; FAQ; Legal §4 | The period agreed with the company's Thai legal adviser |
| `interior` | 60 × 45 × 85 cm, up to 32 kg | Home "What fits" diagram and tiles; Venue Partners spec table | Manufacturer's interior dimensions and load rating |
| `fits` | Backpacks up to 70 L | Home "What fits" tiles | Capacity the founder is comfortable stating, or remove the figure |
| `liabilityThb` | THB 5,000 per locker | Home rules; Legal §3 | The limit set with the legal adviser and insurer |
| `prohibited` | Hazardous goods, perishables, cash and valuables, animals (short list); weapons and illegal items in Legal | Home rules tiles; FAQ; Legal §2 | The full list approved by the legal adviser (edit `legal.sections[prohibited]` in `copy/en.mjs` and `copy/th.mjs`) |
| `footprint` | ≈ 3.4 × 1.8 m including customer zone | Floor plan on Home and Venue Partners | Measured footprint of the production unit |
| `app` | Locker bank "BD-01", locker 12, PIN 4827, 14 available, "+66 •• ••• 1234", stored 3 h 12 min / THB 200 | Phone mockups on Home and How it works | Screens from the real web app once built, or leave as illustrative |
| `profile` | `/company-profile.pdf` one-page stand-in, labelled "2.4 MB", dated 2026 | Home venue band; Venue Partners hero and "Documents" section | The real company profile PDF in `static/company-profile.pdf`; update `sizeLabel` to its actual size |
| `portrait` | Locker-door monogram with the director's initials (no placeholder wording) | Company page, Director section | A portrait supplied by the founder: add a slot in `src/content/images.mjs`, then swap `monogram()` for `illustration()` in `pages.mjs → companyPage` |
| `paymentMarks` | Typed "VISA", "Mastercard", "PromptPay" stand-ins | Footer on every page; Home pricing; Pricing page | Official Visa, Mastercard and PromptPay artwork used per each brand's guidelines (replace `paymentMarks()` in `components.mjs`) |
| `legalUpdated` | "Last updated 19 September 2026" | Legal page hero | The date the legal adviser signs off the terms |

## Not placeholders, but still owed by the client

These are tracked in `docs/INPUTS-REQUIRED.md` and are not invented anywhere on the site:

- Domain email address (`hello@bagdrop.co.th` is used throughout) and the LINE Official Account ID (`@bagdrop`).
- Native Thai review of every string in `src/content/copy/th.mjs` (see `docs/th-copy-sheet.md`).
- Legal review of the terms and PDPA notice, including the liability limit and prohibited-items list above.
- Confirmation that the DBD DataWarehouse record is live, then set `company.dbdRecordLive = true` in `facts.mjs`.
- The Thai rendering of the registered address and the Thai spelling of the director's name.

## Deliberately absent

No usage numbers, star ratings, reviews, testimonials, press or partner logos,
venue names, photographs or renders appear anywhere (brief §6). The status
line — "BagDrop is in discussions with venue partners. Locations will be listed
here once installed." — stays until the first unit is live.
