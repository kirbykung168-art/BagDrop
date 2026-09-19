/**
 * English copy. Prose only: every company or product fact is substituted at
 * render time from facts.mjs / placeholders.mjs through `{token}` slots, so
 * a number never has to be typed twice.
 */
export default {
  code: 'en',
  htmlLang: 'en',
  label: 'English',
  shortLabel: 'EN',

  nav: {
    home: 'Home',
    how: 'How it works',
    pricing: 'Pricing',
    venues: 'Venue partners',
    company: 'Company',
    legal: 'Legal',
    legalFooter: 'Terms & privacy',
  },

  ui: {
    skip: 'Skip to main content',
    menuLabel: 'Main',
    menuOpen: 'Open menu',
    langLabel: 'Language',
    lineChat: 'Chat on LINE',
    lineChatAt: 'Chat on LINE · {line}',
    lineAt: 'LINE {line}',
    line: 'LINE',
    call: 'Call',
    email: 'Email',
    callDirector: 'Call the director',
    howItWorks: 'How it works →',
    seePricing: 'See pricing →',
    fullPricing: 'See full pricing →',
    walkthrough: 'The full walkthrough →',
    venueBrief: 'Read the venue brief →',
    profilePdf: 'Company profile (PDF)',
    profilePdfSize: 'Company profile (PDF, {size})',
    downloadPdf: 'Download PDF · {size}',
    requestPrint: 'Request a printed copy',
    terms: 'Read the terms of use →',
    termsShort: 'Terms →',
    refundTerms: 'Refund terms →',
    companyRecord: 'Full company record →',
    backHome: 'Back to home',
    openDbd: 'Open DBD record ↗',
    perHour: 'per hour',
    perHourShort: '/ hour',
    maxPerDay: 'maximum per day',
    maxPerDayShort: 'max / day',
    stickyRate: '{hour} / hour',
    stickyCap: 'Max {cap} per day',
    illustrative: 'ILLUSTRATIVE',
  },

  // The one sentence about status, verbatim from the brief (§6).
  status: 'BagDrop is in discussions with venue partners. Locations will be listed here once installed.',
  statusNow: 'Now in discussions with venue partners. Locations will be listed here once installed.',
  statusShort: 'In discussions with venue partners. Locations listed here once installed.',

  footer: {
    tagline: "Self-service luggage lockers for Bangkok's shopping centres. Hands free in Bangkok.",
    registered: 'Registered company',
    contact: 'Contact',
    site: 'Site',
    regNo: 'Registration no.',
    verifyDbd: 'verify on DBD',
    vatPending: 'VAT registration: application in progress',
    copyright: '© {year} {company} BagDrop is a trading name of {company}',
    mobileReg: 'Registration no. {reg} · VAT registration in progress',
  },

  diagrams: {
    /* Alt text for the illustrations in src/content/images.mjs. */
    images: {
      tag: 'ILLUSTRATION',
      hero: 'Illustration: a traveller with a teal suitcase and her phone beside a BagDrop locker bank. One locker door is open.',
      stepScan: 'Illustration: a traveller holds her phone up to the locker terminal to scan the QR code.',
      stepPay: 'Illustration: she chooses a locker and pays on the terminal screen.',
      stepStore: 'Illustration: she slides her suitcase into the open locker.',
      stepCollect: 'Illustration: a traveller lifts his suitcase out of the locker he has reopened.',
      venueFloor: 'Illustration: a BagDrop locker bank on a shopping-centre floor, between planters and seating, as shoppers pass.',
    },
    locker: {
      aria: 'Illustrative isometric drawing of a BagDrop locker bank: twenty large lockers, a payment terminal, and one open door with a suitcase inside.',
      wordmark: 'BagDrop',
      illustrative: 'ILLUSTRATIVE',
      callouts: [
        { t: '20 LARGE LOCKERS', s: 'Each fits a full-size suitcase' },
        { t: 'TERMINAL', s: 'QR · card · PromptPay' },
        { t: '4G · MONITORED 24 H', s: 'Every door, lock and terminal' },
        { t: '5–7 SQM FOOTPRINT', s: 'One 220V outlet · under 1 kW' },
      ],
    },
    plan: {
      aria: 'Top-down plan of the unit footprint: about {length} by {depth} metres, with one outlet and a customer zone in front.',
      title: 'PLAN VIEW · ILLUSTRATIVE',
      zone: 'CUSTOMER ZONE',
      outlet: '220V',
      length: '≈ {length} m',
      depth: '≈ {depth} m',
      caption: '5–7 sqm including customer zone · freestanding',
    },
    fits: {
      aria: 'Locker interior {w} by {h} centimetres, {d} centimetres deep, holding a full-size suitcase.',
      width: '{w} cm',
      height: '{h} cm',
      depth: '{d} cm deep',
      interior: 'INTERIOR',
      suitcase: 'Full-size suitcase',
    },
    chart: {
      aria: 'Chart: cost rises {hour} per hour and stops at {cap} from the sixth hour.',
      max: 'DAILY MAXIMUM · {cap}',
      axis: 'HOURS STORED',
      hour: '{n}h',
    },
    empty: { aria: 'An open, empty locker.', tag: 'LOCKER 404' },
    app: {
      bank: 'LOCKER BANK',
      storeTitle: 'Store a bag',
      largeLocker: 'Large locker',
      fitsSuitcase: 'Fits a full-size suitcase',
      available: '{n} available',
      rate: 'Rate',
      rateValue: '{hour} / hour',
      dailyMax: 'Daily maximum',
      continue: 'Continue',
      back: 'Back',
      payTitle: 'Payment',
      card: 'Card',
      firstHour: 'First hour',
      extraTime: 'Extra time',
      onCollection: 'on collection',
      pay: 'Pay {amount}',
      openTitle: 'Locker {n} is open',
      openHint: 'Put your bag inside and close the door.',
      yourPin: 'YOUR PIN',
      smsTo: 'Also sent by SMS to',
      reopen: 'Reopen locker',
      inUse: 'LOCKER {n} · IN USE',
      welcome: 'Welcome back',
      stored: 'Stored {t}',
      openLocker: 'Open locker',
    },
    profile: { label: 'COMPANY PROFILE · {year}', title: 'Self-service luggage storage for shopping centres' },
  },

  /* ------------------------------------------------------------ HOME */
  home: {
    title: 'BagDrop — Luggage lockers for Bangkok shopping centres',
    description:
      'Self-service luggage lockers for Bangkok shopping centres. Scan, pay by card or PromptPay, lock your bag behind a PIN. {hour} per hour, never more than {cap} a day. Operated by {company}, registration {reg}.',
    eyebrow: 'Self-service luggage lockers · Bangkok',
    h1: "Luggage lockers for Bangkok's shopping centres.",
    lead: 'Scan the QR code, pay by card or PromptPay, and lock your bag away behind a door only your PIN can open. From scan to locked in about ninety seconds.',
    leadShort: 'Scan, pay by card or PromptPay, and lock your bag away with a PIN. About ninety seconds.',
    facts: [
      { h: 'About 90 seconds', s: 'From scan to locked', icon: 'clock' },
      { h: 'Card or PromptPay', s: 'Never cash', icon: 'card' },
      { h: 'PIN access', s: 'No key to lose', icon: 'lock' },
      { h: 'Monitored 24 hours', hShort: 'Monitored 24 h', s: 'Every door, every lock', icon: 'eye' },
    ],
    statement: 'Hands free in Bangkok. Leave the bag, keep the day.',
    statementTag: 'BagDrop · {company}',

    pricing: {
      eyebrow: 'Pricing',
      h2: 'One simple rate.',
      perHour: 'Per hour',
      perHourNote: 'Charged per started hour.',
      dailyMax: 'Daily maximum',
      dailyMaxNote: 'However long you stay, a day never costs more.',
      examples: 'Examples',
      rows: [
        { k: '1 hour', hours: 1 },
        { k: '3 hours', hours: 3 },
        { k: '9 hours', hours: 9 },
      ],
      bullets: ['No cash', 'No account', 'No download', 'Reopen as often as you like'],
      bulletsShort: 'No cash · No account · No download',
    },

    how: {
      eyebrow: 'How it works',
      h2: 'Four steps. About ninety seconds.',
      lead: 'No queue, no counter, no key to lose. Everything happens on your phone and the locker door.',
      steps: [
        { n: '01', h: 'Scan', p: 'Scan the QR code on the locker, or open the web app. No download, no account.', short: 'QR code on the locker. No download, no account.', icon: 'qr' },
        { n: '02', h: 'Pay', p: 'Pay by international card or PromptPay. The first hour is charged at drop-off.', short: 'Card or PromptPay. Never cash.', icon: 'pay' },
        { n: '03', h: 'Store', p: 'A large locker opens. Put your bag inside and close the door. It locks automatically.', short: 'Bag in, door closed. It locks itself.', icon: 'suitcase', on: true },
        { n: '04', h: 'Reopen with your PIN', p: 'Your PIN arrives by SMS and on screen. Enter it to reopen the door as often as you like.', short: 'By SMS and on screen. As often as you like.', icon: 'pin' },
      ],
      phones: [
        { n: '01 · Scan.', p: 'The locker bank opens in your browser.' },
        { n: '02 · Pay.', p: 'Card or PromptPay. Never cash.' },
        { n: '03 · Store.', p: 'Your PIN reopens the door any time.' },
      ],
    },

    who: {
      eyebrow: "Who it's for",
      h2: 'Built for people with somewhere to be.',
      cards: [
        { h: 'Between checkout and a late flight', p: 'Check out at noon, fly at midnight. Shop, eat and see the city without a suitcase in tow.', short: 'See the city without a suitcase in tow.', spot: 'flight', icon: 'suitcase' },
        { h: 'Shoppers with full hands', p: "Drop the morning's shopping and keep going. Collect everything on the way out.", short: 'Drop the shopping, keep going.', spot: 'shopping', icon: 'bag', warm: true },
        { h: 'Dinner, cinema and events', p: 'Arrive with luggage, leave it at the door, and enjoy the evening properly.', short: 'Enjoy the evening properly.', spot: 'evening', icon: 'ticket' },
      ],
    },

    unit: {
      eyebrow: 'The unit',
      h2: 'Engineered for busy retail floors.',
      p: 'A freestanding bank of twenty large lockers with its own terminal, power and 4G connection. Designed to sit quietly in premium retail environments.',
      rows: [
        { k: 'Lockers', v: '20 large' },
        { k: 'Fits', v: 'Full-size suitcase', mobileOnly: true },
        { k: 'Access', v: 'PIN by SMS and on screen', vShort: 'PIN, SMS + screen' },
        { k: 'Interface', v: 'English · ไทย · 中文', langs: true },
        { k: 'Connectivity', v: '4G', desktopOnly: true },
        { k: 'Power', v: '220V, under 1 kW', desktopOnly: true },
      ],
    },

    fits: {
      eyebrow: 'What fits',
      h2: 'If it fits in the hold, it fits in BagDrop.',
      p: 'Every locker takes a full-size check-in suitcase. Carry-ons, backpacks and shopping bags fit with room to spare.',
      tiles: [
        { h: 'Check-in suitcase', s: 'Up to {kg} kg' },
        { h: 'Carry-on', s: 'Plus a daypack' },
        { h: 'Backpacks', s: 'Up to {litres} L' },
        { h: 'Shopping bags', s: 'Several at once' },
      ],
    },

    ops: {
      eyebrow: 'Operating commitments',
      h2: 'Watched every hour of every day.',
      lead: 'Every door, lock and terminal reports its status continuously. Most faults are seen before a customer reports them.',
      nodes: [
        { h: 'Locker bank', s: 'Door, lock and terminal sensors', icon: 'grid' },
        { h: 'Live status', s: 'Reported continuously', icon: 'bars' },
        { h: 'Monitoring, 24 h', s: 'Every door, every lock', icon: 'eye', on: true },
        { h: 'Engineer on site', s: 'Within 4 hours of trading', icon: 'wrench' },
      ],
      links: ['4G', '', '≤ 4 HRS'],
      stats: [
        { n: '24 h', h: 'Remote monitoring', p: 'Every door, lock and terminal, around the clock.' },
        { n: '4 h', h: 'On-site response', p: 'An engineer on site within four hours during trading hours.' },
        { n: '0', h: 'Staff handling bags', p: 'Only your PIN opens your door.' },
        { n: '100%', h: 'Cashless', p: 'A digital record of every payment and every opening.' },
      ],
    },

    venues: {
      eyebrow: 'For venue partners',
      h2: 'A service that costs the venue nothing but floor space.',
      h2Short: 'Costs the venue nothing but floor space.',
      checks: ['Zero capital cost', 'One standard outlet', '5–7 sqm, freestanding', 'Installed in a day', 'No staff time, ever', 'Longer dwell time'],
    },

    rules: {
      eyebrow: 'Rules and protection',
      h2: 'Clear rules, stated up front.',
      notPermitted: 'Not permitted in a locker',
      itemsShort: ['No hazardous goods', 'No perishables', 'No cash or valuables', 'No animals'],
      icons: ['flame', 'leaf', 'gem', 'paw'],
      rows: [
        { h: 'Liability', p: 'Stored goods are covered up to {liability} per locker.' },
        { h: 'Refunds', p: "If a locker fails to open or lock, you don't pay for it." },
        { h: 'Abandoned property', p: 'Bags left longer than {maxDays} days are handled under our published procedure.' },
      ],
      mobileNote: "Covered up to {liability} per locker. If a locker fails, you don't pay.",
    },

    faq: {
      eyebrow: 'Questions',
      h2: 'Good to know.',
      p: 'Anything else? Message us on LINE and a person replies.',
      items: [
        { q: 'Do I need to download an app?', a: "No. Scan the QR code on the locker and everything happens in your phone's browser. No account either." },
        { q: 'What if I lose my PIN?', a: 'It was sent to you by SMS at payment. If the message is gone, contact us on LINE with the locker number and the time; we verify you and reissue it.' },
        { q: 'Can I open my locker more than once?', a: 'Yes. The same PIN opens the same door as often as you like until you collect for the last time.' },
        { q: 'Is there a time limit?', a: 'You can store for up to {maxDays} days. Time is charged per started hour and never more than {cap} in a calendar day.' },
        { q: 'Can I pay with cash?', a: 'No. BagDrop takes international cards and PromptPay only, which is why the unit needs no staff and holds no cash.' },
        { q: "What if the door won't open?", a: 'Every door is monitored remotely, so most faults are seen before they are reported. Message us on LINE and we can release the door from our side; if not, an engineer attends within four hours during trading hours.' },
        { q: "What can't I store?", a: 'Hazardous or flammable goods, perishables, cash and valuables, animals, weapons and anything illegal. The full list is in the terms of use.' },
      ],
    },

    operator: {
      statusEyebrow: 'Status',
      statusH: "Coming to Bangkok's shopping centres.",
      eyebrow: 'The operator',
      h2: 'A registered Thai company.',
      rows: { name: 'Registered name', reg: 'Registration no.', alsoTax: 'also the tax ID', director: 'Director' },
      mobileReg: 'Registration no. ',
      mobileDirector: 'Director: ',
    },

    contact: {
      h2: 'Talk to us.',
      lead: 'Travellers, venues, partners: a person replies.',
    },
  },

  /* ---------------------------------------------------------- HOW */
  how: {
    title: 'How BagDrop works — scan, pay, store, reopen with your PIN',
    description:
      'Scan the QR code, pay by card or PromptPay, store your bag and reopen the door with your PIN as often as you like. What to do if something goes wrong.',
    eyebrow: 'How it works',
    h1: 'From scan to locked in about ninety seconds.',
    lead: 'No queue, no counter, no key to lose. Everything happens on your phone and the locker door.',
    pills: ['No download', 'No account', 'No cash'],
    stepsEyebrow: 'Step by step',
    stepsH2: 'Four steps on your phone.',
    steps: [
      { n: '01', h: 'Scan the QR code', p: 'On the terminal, or open the web app. It opens in your browser in English, Thai or Chinese.', screen: 'store' },
      { n: '02', h: 'Pay by card or PromptPay', p: 'The first hour is charged at drop-off. Any extra time is settled when you collect, never more than {cap} a day.', screen: 'pay' },
      { n: '03', h: 'Store your bag', p: 'A large locker opens. Put your bag inside and close the door: it locks automatically. Your PIN arrives by SMS and on screen.', screen: 'open' },
      { n: '04', h: 'Reopen with your PIN', p: 'Enter your PIN on the terminal or your phone. Reopen as often as you like; collect when you are ready.', screen: 'welcome' },
    ],
    wrongEyebrow: 'If something goes wrong',
    wrongH2: 'A person is one message away.',
    wrong: [
      { h: 'Lost your PIN', p: 'It is in your SMS. If the message is gone, contact us on LINE and we will verify you and reissue it.', icon: 'chat' },
      { h: "Door won't open", p: 'We can see every door remotely and can open yours from our side. If needed, an engineer is on site within four hours.', icon: 'lock' },
      { h: 'Staying longer', p: 'Nothing to do. Extra time is added automatically, capped at {cap} per day, for up to {maxDays} days.', icon: 'clock' },
    ],
    langs: {
      words: { en: 'Hello', th: 'สวัสดี', zh: '你好' },
      names: { en: 'English', th: 'ไทย', zh: '中文' },
      p: 'The locker interface speaks three languages. Choose yours on the first screen.',
    },
    cta: { h2: '{hour} an hour. Never more than {cap} a day.' },
  },

  /* ------------------------------------------------------ PRICING */
  pricing: {
    title: 'BagDrop pricing — {hour} per hour, never more than {cap} a day',
    description:
      'BagDrop costs {hour} per hour, capped at {cap} per calendar day. Pay by card or PromptPay, never cash. A receipt for every use, refunds if a locker fails.',
    eyebrow: 'Pricing',
    h1: 'One simple rate, at every location.',
    perHour: 'Per hour',
    maxPerDay: 'Maximum per day',
    how: {
      eyebrow: 'How the charge works',
      h2: 'The meter stops at {cap}.',
      p: 'Charged per started hour. After six hours, the rest of the day is free. The cap applies to each calendar day.',
    },
    examples: {
      eyebrow: 'Examples',
      h2: "What you'll pay.",
      head: { k: 'Stored for', ex: 'Example', v: 'Total' },
      rows: [
        { k: '1 hour', ex: 'A quick lunch', hours: 1 },
        { k: '3 hours', ex: "An afternoon's shopping", hours: 3 },
        { k: '9 hours', ex: 'Checkout to a night flight', hours: 9 },
        { k: '2 days', ex: 'A side trip out of town', hours: 48 },
      ],
    },
    cards: {
      payment: { eyebrow: 'Payment', h3: 'Card or PromptPay. Never cash.' },
      receipts: { eyebrow: 'Receipts', h3: 'A receipt for every use.', p: 'Sent by SMS with a link to download a PDF. Business receipts on request.' },
      refunds: { eyebrow: 'Refunds', h3: "If a locker fails, you don't pay.", p: 'Refunds go back to the card or PromptPay account used.' },
    },
  },

  /* ------------------------------------------------------- VENUES */
  venues: {
    title: 'BagDrop for venue partners — zero capital cost, 5–7 sqm, unstaffed',
    description:
      'A luggage service that costs the venue nothing but floor space. Freestanding, 5–7 sqm, one standard outlet, unstaffed and cashless, monitored 24 hours with a four-hour on-site fault response.',
    eyebrow: 'Venue partners',
    h1: 'A luggage service that costs the venue nothing but floor space.',
    lead: 'BagDrop is a self-contained, unstaffed unit. It arrives complete, plugs into one standard outlet, and can move to another part of the centre without construction.',
    strip: [
      { n: '{zero}', s: 'Capital cost to the venue' },
      { n: '5–7 sqm', s: 'Footprint, freestanding' },
      { n: '1 outlet', s: '220V, under 1 kW' },
      { n: '4 hrs', s: 'On-site fault response' },
    ],
    offer: {
      eyebrow: 'The offer',
      h2: 'What the venue provides, and what it does not.',
      cards: [
        { h: 'Zero capital cost', p: 'BagDrop funds, installs, owns and maintains the unit. The venue contributes space.', icon: 'zero', on: true },
        { h: 'One standard outlet', p: 'Single-phase 220V drawing under 1 kW, less than a vending machine. Connectivity is over 4G, so no data cabling is required.', icon: 'plug' },
        { h: '5–7 sqm, freestanding', p: 'No fixed fit-out, no construction, no penetration of floor or wall. Relocatable if the centre changes its layout.', icon: 'footprint' },
        { h: 'Unstaffed and cashless', p: 'No staff on site, no cash on site, no cash collection. Every transaction is by card or PromptPay.', icon: 'unstaffed' },
        { h: 'Monitored around the clock', p: 'Every door, lock and terminal reports its state continuously. Most faults are seen before a customer reports them.', icon: 'eye' },
        { h: 'Four-hour fault response', p: "If a fault needs a person, an engineer attends on site within four hours during the centre's trading hours.", icon: 'wrench' },
      ],
    },
    install: {
      eyebrow: 'Installation',
      h2: 'Installed in a day. Removed in a day.',
      steps: [
        { h: 'Agree the position', p: 'A short walk-through with the centre to choose a spot near an outlet.' },
        { h: 'Deliver and place', p: 'The unit arrives complete, outside trading hours.' },
        { h: 'Plug in, connect', p: 'One outlet for power, 4G for data. No venue IT involved.' },
        { h: 'Live', p: 'Monitored from the first minute. No staff time from the venue, ever.', on: true },
      ],
    },
    why: {
      eyebrow: 'Why it is worth the floor space',
      statement: 'A shopper carrying luggage leaves early. A shopper who has put it down stays, eats, and buys more.',
      points: [
        { h: 'Longer dwell time.', p: 'Visitors stay for the next shop, the meal, the film.' },
        { h: 'Fewer bags at the desk.', p: 'Frees concierge and retail staff from minding luggage.' },
        { h: 'A visible amenity.', p: 'Designed to sit quietly in premium retail environments.' },
      ],
    },
    spec: {
      eyebrow: 'Specification',
      h2: 'Technical specification.',
      p: 'Everything a leasing, facilities or operations team needs to assess the unit.',
      rows: [
        { k: 'Lockers per bank', v: '20 large, each sized for a full-size suitcase' },
        { k: 'Locker interior', v: '{w} × {d} × {h} cm, up to {kg} kg' },
        { k: 'Footprint', v: '5–7 sqm' },
        { k: 'Power', v: 'Single-phase 220V, under 1 kW' },
        { k: 'Connectivity', v: '4G' },
        { k: 'Installation', v: 'Freestanding and relocatable. No fixed fit-out.' },
        { k: 'Monitoring', v: 'Every door, lock and terminal, 24 hours' },
        { k: 'Fault response', v: 'On site within 4 hours during trading hours' },
        { k: 'Payment', v: 'International card and PromptPay. No cash at any point.' },
        { k: 'Customer interface', v: 'Browser-based. No download, no account. English, ไทย, 中文.' },
        { k: 'Access control', v: 'PIN shown on screen and sent by SMS. Reopens the door any time.' },
        { k: 'Tariff to the customer', v: '{hour} per hour, maximum {cap} per day' },
      ],
    },
    profile: {
      eyebrow: 'Documents',
      h2: 'The company profile.',
      p: 'Unit specification, the operating model and the commercial terms in one document.',
    },
    director: {
      eyebrow: 'Contact',
      h2: 'Speak to the director directly.',
      lead: 'Leasing enquiries go to the director, not to a form or an inbox. A single contract, a single point of contact.',
      role: 'Founder & Director, {company}',
    },
  },

  /* ------------------------------------------------------ COMPANY */
  company: {
    title: 'Company — {company}, registration {reg}',
    description:
      'BagDrop is operated by {company} ({companyTh}), juristic person registration number {reg}, registered in Bangkok. Every figure can be checked against the DBD public register.',
    eyebrow: 'Company',
    h1: 'BagDrop is operated by a registered Thai company.',
    lead: "Every figure below can be checked against the Department of Business Development's public register.",
    rows: {
      nameEn: 'Registered name (English)',
      nameTh: 'Registered name (Thai)',
      reg: 'Juristic person registration no.',
      regNote: 'Also the tax identification number.',
      registered: 'Registered',
      capital: 'Registered capital',
      office: 'Registered office',
      vat: 'VAT registration',
      vatValue: 'Application in progress',
      trading: 'Trading name',
    },
    verify: {
      h3: 'Verify us on DBD',
      p: "Search the registration number on the DBD DataWarehouse to see the company's official record.",
    },
    director: {
      eyebrow: 'Director',
      role: 'Founder & Director',
      p: 'BagDrop is run by its founder. Venue partners deal with him directly, from the first conversation to the day the unit goes live.',
    },
  },

  /* -------------------------------------------------------- LEGAL */
  legal: {
    title: 'Legal — terms, rules and privacy',
    description:
      'Plain-language terms for using BagDrop: terms of use, prohibited items, liability, abandoned property, refunds, the PDPA privacy notice and how to contact {company}.',
    eyebrow: 'Legal',
    h1: 'Terms, rules and privacy.',
    updated: 'Plain-language terms for using BagDrop. Last updated {date}.',
    contents: 'Contents',
    sectionWord: 'Section {n}',
    sections: [
      {
        id: 'terms',
        h: 'Terms of use',
        paras: [
          'BagDrop lockers are operated by {company} (registration no. {reg}). By paying for a locker you agree to these terms. A locker is rented for storage only; it is not a safe-deposit box and BagDrop does not take possession of its contents.',
          'You pay {hour} for each started hour, up to {cap} per calendar day. The first hour is charged at drop-off and any further time on collection.',
        ],
      },
      {
        id: 'prohibited',
        h: 'Prohibited items',
        paras: [
          'Do not store hazardous, flammable or explosive goods; perishable food; cash, jewellery or other valuables; animals; weapons; or anything illegal. BagDrop may open a locker, with the police where required, if it reasonably believes a prohibited item is inside.',
        ],
      },
      {
        id: 'liability',
        h: 'Liability',
        paras: [
          "If goods are lost or damaged while stored because of BagDrop's fault, our liability is limited to {liability} per locker. We are not liable for prohibited items or for loss caused by sharing your PIN.",
        ],
      },
      {
        id: 'abandoned',
        h: 'Abandoned property',
        paras: [
          'Items left for more than {maxDaysWord} days are removed and held for a further {heldDays} days. We contact you using the phone number given at payment. Unclaimed items after that period are disposed of in line with Thai law.',
        ],
      },
      {
        id: 'refunds',
        h: 'Refunds',
        paras: [
          'If a locker fails to open, lock or accept your bag, you are refunded in full to the card or PromptPay account used. Contact us on LINE with your locker number and time.',
        ],
      },
      {
        id: 'privacy',
        h: 'Privacy (PDPA)',
        paras: [
          '{company} is the data controller. We collect your phone number to send your PIN and receipts, and payment details through our payment processor. We keep records for as long as required by law, and never sell your data. You may ask to see, correct or delete your data at {email}.',
        ],
      },
      {
        id: 'contact',
        h: 'Contact',
        paras: ['{company}, {address}. Telephone {tel}. Email {email}.'],
      },
    ],
  },

  /* ---------------------------------------------------------- 404 */
  notFound: {
    title: 'Page not found — BagDrop',
    description: 'That page does not exist on bagdrop.co.th. Try the homepage, or message us on LINE.',
    eyebrow: 'ERROR 404',
    h1: 'This locker is empty.',
    lead: "The page you were looking for isn't here. Try the homepage, or message us on LINE.",
  },
};
