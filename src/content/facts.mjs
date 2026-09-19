/**
 * facts.mjs — SINGLE SOURCE OF TRUTH.
 *
 * Every company (§3) and product (§4) fact on the site is read from here.
 * No page may hardcode any of these values. If a fact changes, change it once here.
 *
 * Items marked PLACEHOLDER are tracked in docs/INPUTS-REQUIRED.md and MUST be
 * replaced before launch. Nothing in this file is invented: values are either
 * supplied by the client or an explicitly-flagged placeholder.
 */

export const company = {
  legalNameEn: '8Venture Co., Ltd.',
  legalNameTh: 'บริษัท 8เวนเจอร์ จำกัด',

  // Juristic person registration number — also the tax ID.
  regNo: '0105569178707',
  // Grouped purely for display; the canonical string above is never altered.
  regNoGrouped: '0 1055 69178 70 7',

  registeredDate: { en: '18 September 2026', th: '18 กันยายน 2569', zh: '2026 年 9 月 18 日' },
  registeredCapital: { en: 'THB 1,000,000', th: '1,000,000 บาท', zh: '1,000,000 泰铢' },

  address: {
    en: '52/88 Tower Park Building, 17A Floor, Soi Sukhumvit 3 (Nana Nuea), Khlong Toei Nuea, Watthana, Bangkok 10110',
    // TO VERIFY by client — Thai rendering of the registered address (docs/INPUTS-REQUIRED.md).
    th: '52/88 อาคารทาวเวอร์ปาร์ค ชั้น 17A ซอยสุขุมวิท 3 (นานาเหนือ) แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110',
  },
  addressLines: {
    en: ['52/88 Tower Park Building, 17A Floor', 'Soi Sukhumvit 3 (Nana Nuea)', 'Khlong Toei Nuea, Watthana', 'Bangkok 10110, Thailand'],
    th: ['52/88 อาคารทาวเวอร์ปาร์ค ชั้น 17A', 'ซอยสุขุมวิท 3 (นานาเหนือ)', 'แขวงคลองเตยเหนือ เขตวัฒนา', 'กรุงเทพมหานคร 10110'],
  },

  // Director's name is kept in Latin script on all pages: the Thai spelling was not
  // supplied and must not be guessed. Tracked in docs/INPUTS-REQUIRED.md.
  director: { name: 'Pijak Tangsawatdumrong', role: { en: 'Founder & Director', th: 'ผู้ก่อตั้งและกรรมการ', zh: '创始人兼董事' } },

  tel: { display: { en: '+66 97 792 9922', th: '097-792-9922', zh: '+66 97 792 9922' }, href: 'tel:+66977929922' },

  // PLACEHOLDER — client to supply a domain address. Never a Gmail address.
  email: 'hello@bagdrop.co.th',

  // PLACEHOLDER — client to supply the LINE Official Account ID.
  // The account the official QR (brand_assets/line-qr.jpeg → lin.ee/sl6Wpin) opens.
  lineOaId: '@130keaga',
  lineUrl: 'https://line.me/R/ti/p/@130keaga',

  // VAT: application in progress. No number is displayed. Client to confirm wording.
  vatPending: true,

  // DBD DataWarehouse. The company registered 18 Sep 2026, so the public record may
  // not have propagated. Kept false until the client confirms the record is live —
  // a dead verification link on a credibility page is worse than none.
  dbdRecordLive: false,
  dbdUrl: 'https://datawarehouse.dbd.go.th/',
};

export const product = {
  price: { hourly: 50, dailyCap: 300, currency: 'THB', currencyTh: 'บาท', symbol: '฿' },

  // Worked examples given explicitly in the brief (§5).
  examples: [
    { hours: 3, total: 150 },
    { hours: 6, total: 300, capped: false },
    { hours: 9, total: 300, capped: true },
  ],

  slotsPerBank: 20,
  languages: { en: 'English, Thai and Simplified Chinese', th: 'อังกฤษ ไทย และจีนตัวย่อ', zh: '英语、泰语和简体中文' },

  spec: {
    footprint: { en: '5–7 sqm', th: '5–7 ตร.ม.', zh: '5–7 平方米' },
    power: { en: 'Single-phase 220V, under 1 kW', th: 'ไฟฟ้าเฟสเดียว 220V ใช้กำลังไฟต่ำกว่า 1 กิโลวัตต์', zh: '单相 220V，功率低于 1 千瓦' },
    connectivity: { en: '4G', th: '4G', zh: '4G' },
    monitoring: { en: 'Every door, lock and terminal, 24 hours', th: 'ตรวจสอบทุกประตู ล็อก และตู้ ตลอด 24 ชั่วโมง', zh: '全天 24 小时监控每个柜门、锁具与终端' },
    faultResponse: { en: 'On site within 4 hours during trading hours', th: 'เข้าพื้นที่ภายใน 4 ชั่วโมง ในเวลาทำการของศูนย์', zh: '营业时间内 4 小时内到场' },
    install: { en: 'Freestanding and relocatable. No fixed fit-out.', th: 'ตั้งอิสระ เคลื่อนย้ายได้ ไม่มีงานตกแต่งติดตรึง', zh: '独立放置、可迁移，无固定装修' },
  },
};

/** Payment marks. Typed stand-ins until official assets arrive — see placeholders.mjs. */
export { placeholders } from './placeholders.mjs';
export const paymentMarks = ['Visa', 'Mastercard', 'PromptPay'];

export const site = {
  origin: 'https://bagdrop.co.th',
  defaultLang: 'en', // x-default → /en/ (client decision)
  // English and Thai only (brief §5). Chinese copy stays in src/content/copy/zh.mjs
  // for when those pages are completed; until then it is neither built nor linked.
  langs: ['en', 'th'],
};

/** Formats a THB amount with grouping, for tabular-figure display. */
export const thb = (n) => n.toLocaleString('en-US');
