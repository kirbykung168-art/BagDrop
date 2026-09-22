/**
 * placeholders.mjs — every value on the site that the client has not yet
 * confirmed, in one place (brief §7).
 *
 * Each entry is marked PLACEHOLDER so `grep -r PLACEHOLDER src` finds them all,
 * and CONTENT_TODO.md at the repo root lists where each one appears and what
 * confirmed information replaces it. Nothing on the rendered page says these
 * are placeholders: the values below are the ones used in the approved design.
 */

export const placeholders = {
  // PLACEHOLDER — payment timing. Design: first hour paid at drop-off, extra time on collection.
  paymentTiming: {
    en: { first: 'First hour paid at drop-off', extra: 'Extra time on collection' },
    th: { first: 'ชั่วโมงแรกชำระตอนฝาก', extra: 'เวลาส่วนเกินชำระตอนรับคืน' },
  },

  // PLACEHOLDER — billing rule. Design: per started hour; THB 300 cap per calendar day.
  billing: {
    perStartedHour: true,
    capPerCalendarDay: true,
  },

  // PLACEHOLDER — maximum storage period, then abandoned-property procedure.
  storage: {
    maxDays: 3,
    heldDays: 30,
  },

  // PLACEHOLDER — locker interior dimensions and load.
  interior: {
    widthCm: 60,
    depthCm: 45,
    heightCm: 85,
    maxKg: 32,
  },

  // PLACEHOLDER — what-fits capacities shown on the Home page tiles.
  fits: {
    backpackLitres: 70,
  },

  // PLACEHOLDER — liability limit per locker.
  liabilityThb: 5000,

  // PLACEHOLDER — prohibited items (short list for the Home page; full list in Legal).
  prohibited: {
    en: ['Hazardous goods', 'Perishables', 'Cash and valuables', 'Animals'],
    th: ['วัตถุอันตราย', 'ของสด', 'เงินสดและของมีค่า', 'สัตว์'],
    zh: ['危险品', '易腐物品', '现金和贵重物品', '动物'],
  },

  // PLACEHOLDER — floor plan dimensions, including the customer zone.
  footprint: {
    lengthM: 3.4,
    depthM: 1.8,
  },

  // PLACEHOLDER — sample values on the terminal's touchscreen mockups (there is no phone app).
  app: {
    bankId: 'BD-01',
    lockerNo: 12,
    pin: '4827',
    available: 14,
    maskedPhone: '+66 •• ••• 1234',
    storedFor: { en: '3 h 12 min', th: '3 ชม. 12 นาที', zh: '3 小时 12 分钟' },
    storedTotal: 200,
  },

  // The company profile: the real 8-page document (September 2026), supplied by
  // the founder on 22 September 2026. Update sizeLabel when it is replaced.
  profile: {
    href: '/company-profile.pdf',
    sizeLabel: '55 KB',
    year: 2026,
  },

  // PLACEHOLDER — director portrait. A locker-door monogram stands in until the founder supplies one.
  portrait: null,

  // PLACEHOLDER — payment marks are typed stand-ins until official Visa,
  // Mastercard and PromptPay assets are supplied and used per brand guidelines.
  paymentMarks: ['Visa', 'Mastercard', 'PromptPay'],

  // PLACEHOLDER — legal "last updated" date shown on the Legal page.
  legalUpdated: { en: '19 September 2026', th: '19 กันยายน 2569' },
};

export default placeholders;
