export default {
  code: 'en',
  htmlLang: 'en',
  label: 'English',
  shortLabel: 'EN',
  dateNote: null,

  // Short category labels for the accent-rule eyebrow. Kept distinct from the
  // section heading beneath it: an eyebrow that repeats its own <h2> is noise.
  labels: {
    operator: 'The operator', steps: 'Using it', site: 'Site requirements',
    offer: 'The offer', benefit: 'Why it works', spec: 'Specification',
    documents: 'Documents', contact: 'Contact', examples: 'Worked examples',
    payment: 'Payment', refunds: 'Refunds', support: 'Support',
    registry: 'Registry', verify: 'Verification',
  },

  nav: {
    home: 'Home',
    how: 'How it works',
    pricing: 'Pricing',
    venues: 'Venue partners',
    company: 'Company',
    legal: 'Legal',
  },

  ui: {
    skip: 'Skip to main content',
    langLabel: 'Language',
    menuLabel: 'Sections',
    lineCta: 'Contact us on LINE',
    lineShort: 'LINE',
    callCta: 'Call the director',
    emailCta: 'Email',
    backHome: 'Back to the homepage',
    onThisPage: 'On this page',
    currentPage: 'Current page',
  },

  status: 'BagDrop is in discussions with venue partners. Locations will be listed here once installed.',

  footer: {
    registeredOffice: 'Registered office',
    registration: 'Juristic person registration number',
    alsoTaxId: 'also the tax identification number',
    vatPending: 'VAT registration: application in progress',
    director: 'Director',
    contact: 'Contact',
    legalNote: 'BagDrop is a trading name of 8Venture Co., Ltd.',
    copyright: (y) => `© ${y} 8Venture Co., Ltd.`,
  },

  home: {
    title: 'BagDrop — Unstaffed luggage lockers for Bangkok shopping centres',
    description:
      'BagDrop is a bank of 20 app-controlled luggage lockers sized for full-size suitcases. THB 50 per hour, capped at THB 300 per day. Operated by 8Venture Co., Ltd., registration 0105569178707.',
    h1: 'Unstaffed luggage lockers for shopping centres.',
    lede:
      'A BagDrop bank holds 20 large lockers, each sized for a full-size suitcase. A customer scans a QR code, pays by card or PromptPay, and opens the door with a PIN. There is no app to download, no account to create, and no cash to collect.',

    priceLabel: 'Price to the customer',
    priceCaption: 'The same rate at every location. Published, not negotiated.',

    stepsTitle: 'Three steps, about ninety seconds',
    stepsMore: 'Read how it works in full',

    companyTitle: 'The company behind it',
    companyLede:
      'BagDrop is operated by a Thai limited company. The registration number below is the juristic person number issued by the Department of Business Development, and is also the tax identification number. It can be checked against the public register.',
    companyMore: 'See the full company record',

    specTitle: 'What a site requires',
    specLede:
      'One standard outlet and a 4G signal. The unit is freestanding, so there is no fit-out, no construction and no capital cost to the venue.',
    specMore: 'Read the venue partner brief',

    venueTitle: 'For venue partners',
    venueLede:
      'BagDrop is looking for locations in Bangkok shopping centres. The unit is unstaffed and cashless, every door is monitored around the clock, and a fault brings an engineer on site within four hours of trading.',
    venueCta: 'Read the venue partner brief',
  },

  how: {
    title: 'How BagDrop works — three steps, no app, no account',
    description:
      'Scan the QR code, pay by card or PromptPay, and receive a PIN by SMS. The PIN reopens the locker door at any time. What to do if something goes wrong.',
    h1: 'How it works',
    lede:
      'BagDrop is designed to be used once, by someone in a hurry, holding a suitcase. There is nothing to install and nothing to remember except a PIN, which is also sent by SMS.',

    steps: [
      {
        n: '1',
        h: 'Find and scan',
        p: 'Each locker bank carries a QR code. Scanning it opens the BagDrop web app in the phone browser. There is nothing to download and no account to create. The interface is available in English, Thai and Simplified Chinese.',
      },
      {
        n: '2',
        h: 'Pay and receive a PIN',
        p: 'Choose a free locker and pay by international card or PromptPay. BagDrop does not accept cash. A PIN appears on screen and is sent to the phone number given, by SMS, so it survives a closed browser tab or a flat battery on someone else’s phone.',
      },
      {
        n: '3',
        h: 'Return and open',
        p: 'Enter the PIN on the locker keypad. The door opens. The same PIN opens the same door as many times as needed, so a bag can be checked during the day and the locker kept until the end of it.',
      },
    ],

    troubleTitle: 'If something goes wrong',
    trouble: [
      {
        h: 'The door will not open',
        p: 'Every door, lock and terminal is monitored remotely, 24 hours a day, so a fault is usually seen before it is reported. Contact us on LINE or by phone and the door can be released remotely. If it cannot, an engineer attends on site within four hours during the venue’s trading hours.',
      },
      {
        h: 'The PIN did not arrive by SMS',
        p: 'The PIN is also shown on screen at the moment of payment. If both are lost, contact us on LINE or by phone with the payment reference and the locker number.',
      },
      {
        h: 'The payment did not complete',
        p: 'A locker is only assigned once payment is confirmed. If a card is charged without a locker being assigned, contact us with the payment reference. Refund conditions are set out in the legal terms.',
      },
      {
        h: 'A bag is left past the paid period',
        p: 'Storage is subject to a maximum period, after which property is treated as abandoned and handled under the procedure in the legal terms.',
      },
    ],

    prohibitedNote:
      'Some items may not be left in a BagDrop locker, including hazardous goods, perishable food, live animals and high-value items. The full list forms part of the terms of use.',
    prohibitedCta: 'Read the terms of use',
  },

  pricing: {
    title: 'BagDrop pricing — THB 50 per hour, capped at THB 300 per day',
    description:
      'BagDrop costs THB 50 per hour, capped at THB 300 per day. Pay by international card or PromptPay. No cash. The same published rate at every location.',
    h1: 'Pricing',
    lede:
      'One rate, published, the same at every location. There is no membership, no deposit and no size tier: every locker in a bank is a large locker, sized for a full-size suitcase.',

    perUnit: { hour: 'hour', day: 'day' },
    hourLabel: 'Per hour',
    capLabel: 'Daily cap',
    capNote: 'A day of storage never costs more than the cap, however long it runs.',

    examplesTitle: 'Worked examples',
    examplesHead: { duration: 'Duration', calc: 'Calculation', total: 'Total' },
    examplesNote: 'Once the daily cap is reached, further hours in that day cost nothing.',
    hoursWord: (n) => `${n} hours`,

    payTitle: 'Accepted payment',
    payLede:
      'Payment is taken in the browser at the moment of booking. BagDrop does not handle cash at any point, which is why the unit needs no staff and no cash collection.',
    payNote: 'Card details are handled by the payment processor. BagDrop does not store card numbers.',

    refundTitle: 'Refunds',
    refundLede:
      'If a locker cannot be opened and the fault is ours, the booking is refunded. Refund conditions, the maximum storage period and the treatment of unopened bookings are set out in full in the legal terms.',
    refundCta: 'Read the refund and storage terms',
  },

  venues: {
    title: 'BagDrop for venue partners — zero capital cost, 5–7 sqm, unstaffed',
    description:
      'BagDrop installs at zero capital cost to the venue. One standard outlet, 5–7 sqm, freestanding and relocatable, unstaffed and cashless, with remote monitoring and a 4-hour on-site fault response.',
    h1: 'Venue partners',
    lede:
      'BagDrop is a self-contained, unstaffed unit. It arrives complete, plugs into one standard outlet, and can be moved to another part of the centre without construction. The venue carries no capital cost and no operating burden.',

    propositionTitle: 'What the venue provides, and what it does not',
    proposition: [
      { h: 'Zero capital cost', p: 'BagDrop funds, installs, owns and maintains the unit. The venue contributes space.' },
      { h: 'One standard outlet', p: 'Single-phase 220V drawing under 1 kW — less than a vending machine. Connectivity is over 4G, so no data cabling is required.' },
      { h: '5–7 sqm, freestanding', p: 'No fixed fit-out, no construction, no penetration of floor or wall. The unit is relocatable if the centre changes its layout.' },
      { h: 'Unstaffed and cashless', p: 'No staff on site, no cash on site, no cash collection. Every transaction is by card or PromptPay.' },
      { h: 'Monitored around the clock', p: 'Every door, lock and terminal reports its state continuously, 24 hours a day. Most faults are seen before a customer reports them.' },
      { h: 'Four-hour fault response', p: 'If a fault needs a person, an engineer attends on site within four hours during the centre’s trading hours.' },
    ],

    benefitTitle: 'Why it is worth the floor space',
    benefitBody:
      'A shopper carrying luggage leaves early. A shopper who has put luggage down stays, eats, and carries more. BagDrop converts a small, low-value footprint into longer dwell time, and removes the luggage that concierge desks and retail staff are otherwise asked to mind.',

    specTitle: 'Technical specification',
    specHead: { item: 'Item', value: 'Specification' },
    specRows: {
      lockers: 'Lockers per bank',
      lockersValue: '20 large slots, each sized for a full-size suitcase',
      footprint: 'Footprint',
      power: 'Power',
      connectivity: 'Connectivity',
      install: 'Installation',
      monitoring: 'Monitoring',
      faultResponse: 'Fault response',
      payment: 'Payment',
      paymentValue: 'International card and PromptPay. No cash accepted at any point.',
      interface: 'Customer interface',
      interfaceValue: 'Browser-based. No download, no account. English, Thai and Simplified Chinese.',
      access: 'Access control',
      accessValue: 'PIN issued at payment, shown on screen and sent by SMS. Reopens the door for the paid period.',
      tariff: 'Tariff to the customer',
    },

    profileTitle: 'Company profile',
    profileBody:
      'A printed company profile covering the unit specification, the operating model and the commercial terms is available on request.',
    profileCta: 'Request the company profile',

    contactTitle: 'Speak to the director directly',
    contactBody:
      'Leasing enquiries go to the director, not to a form or an inbox. There is no contact form on this site by design.',
  },

  company: {
    title: 'Company — 8Venture Co., Ltd., registration 0105569178707',
    description:
      'BagDrop is operated by 8Venture Co., Ltd. (บริษัท 8เวนเจอร์ จำกัด), juristic person registration number 0105569178707, registered in Bangkok with capital of THB 1,000,000.',
    h1: 'Company',
    lede:
      'BagDrop is the trading name of 8Venture Co., Ltd., a private limited company registered in Thailand. The details below are the registered particulars and can be checked against the public register held by the Department of Business Development.',

    tableTitle: 'Registered particulars',
    rows: {
      legalNameEn: 'Registered name (English)',
      legalNameTh: 'Registered name (Thai)',
      tradingName: 'Trading name',
      regNo: 'Juristic person registration number',
      regNoNote: 'This number is also the tax identification number.',
      registered: 'Date of registration',
      capital: 'Registered capital',
      office: 'Registered office',
      director: 'Director',
      vat: 'VAT registration',
      vatValue: 'Application in progress. No VAT number is published until it is issued.',
    },

    verifyTitle: 'How to verify this',
    verifyBodyLive:
      'The registration number links to the company record on the Department of Business Development DataWarehouse, the public register of Thai juristic persons.',
    verifyBodyPending:
      'The company was registered on 18 September 2026. Records can take time to appear on the Department of Business Development DataWarehouse, the public register of Thai juristic persons. Until the record is published there, the registration number above can be searched directly on the DBD register, or a copy of the certificate of incorporation can be requested.',
    verifyCta: 'Search the DBD public register',

    contactTitle: 'Contact',
    contactBody: 'Enquiries reach the director directly.',
  },

  legal: {
    title: 'Legal — terms of use, prohibited items and privacy',
    description:
      'BagDrop terms of use, prohibited items, limitation of liability, abandoned property procedure, refunds, and the PDPA privacy notice of 8Venture Co., Ltd.',
    h1: 'Legal',
    lede:
      'These terms govern the use of BagDrop lockers operated by 8Venture Co., Ltd. They are published here so that they can be read before use, rather than presented at the point of payment.',

    reviewNotice:
      'No BagDrop locker is yet in service. These terms are in final review with the company’s Thai legal adviser and will be confirmed before the first locker is installed. Where an amount or a period is still to be fixed, that is stated plainly below rather than filled with a number.',

    toc: 'On this page',

    sections: [
      {
        id: 'terms',
        h: '1. Terms of use',
        paras: [
          'By placing property in a BagDrop locker, the customer accepts these terms. The contract is between the customer and 8Venture Co., Ltd.',
          'A locker is made available for the period paid for. Payment is taken in advance, in the browser, by international card or PromptPay. BagDrop does not accept cash.',
          'A PIN is issued at the moment of payment, shown on screen and sent by SMS to the number given. The PIN opens the assigned door for the duration of the paid period. The customer is responsible for keeping the PIN confidential; anyone holding the PIN can open the door.',
          'The customer confirms that the property placed in the locker is theirs to store, and that it is not a prohibited item.',
        ],
      },
      {
        id: 'prohibited',
        h: '2. Prohibited items',
        paras: ['The following may not be placed in a BagDrop locker:'],
        list: [
          'Hazardous, flammable, explosive or corrosive goods, including compressed gas and lithium batteries outside a device',
          'Perishable food and any item liable to leak, smell or attract pests',
          'Live animals',
          'Cash, jewellery, precious metals and other high-value items',
          'Firearms, ammunition, weapons and controlled drugs',
          'Anything the possession of which is unlawful in Thailand',
        ],
        after:
          'This list is to be confirmed in full by the company’s legal adviser before the first locker enters service. BagDrop may open a locker without notice where there is reasonable cause to believe a prohibited item is inside, or where required by the venue, the police or another authority.',
      },
      {
        id: 'liability',
        h: '3. Limitation of liability',
        paras: [
          'BagDrop insures and limits its liability for loss of or damage to stored property to a fixed maximum amount per item.',
          'That amount is being set with the company’s legal adviser and insurer and will be published here before the first locker enters service. It is not stated here as a placeholder, because a liability figure that later changes is worse than one not yet given.',
          'BagDrop is not liable for loss arising from a prohibited item, from property that was not the customer’s to store, or from a PIN disclosed by the customer to another person.',
        ],
      },
      {
        id: 'abandoned',
        h: '4. Abandoned property',
        paras: [
          'Storage is subject to a maximum period, after which property remaining in a locker is treated as abandoned.',
          'That maximum period is to be confirmed. When property is treated as abandoned, BagDrop will open the locker in the presence of a second member of staff, record the contents, hold the property securely for a defined period, and attempt to contact the customer on the phone number given at booking.',
          'Property not claimed within the holding period will be disposed of, donated or handed to the police, as appropriate to the item. Perishable items and items presenting a hazard may be removed sooner.',
        ],
      },
      {
        id: 'refunds',
        h: '5. Refunds',
        paras: [
          'Where a locker cannot be opened and the cause is a fault in the BagDrop unit, the booking is refunded in full.',
          'Refunds are made to the original payment method. The treatment of a booking that is paid for but never opened, and of a booking ended early, is to be confirmed with the company’s legal adviser and will be published here before service begins.',
        ],
      },
      {
        id: 'privacy',
        h: '6. Privacy notice (PDPA)',
        paras: [
          'This notice is given under the Personal Data Protection Act B.E. 2562 (2019).',
        ],
        subs: [
          {
            h: 'Data controller',
            p: '8Venture Co., Ltd. (บริษัท 8เวนเจอร์ จำกัด), juristic person registration number 0105569178707, of the registered office given in the footer of this page.',
          },
          {
            h: 'What is collected',
            p: 'A mobile telephone number, in order to send the PIN by SMS. Payment data, which is collected and processed by the payment processor; BagDrop does not receive or store card numbers. A record of the locker used, the times of opening and closing, and the amount paid. If website analytics are used, aggregate usage data as described below.',
          },
          {
            h: 'Why it is collected',
            p: 'To deliver the PIN and so provide the service contracted for; to take and reconcile payment; to operate and secure the lockers, including investigating faults and misuse; and to meet accounting and tax obligations.',
          },
          {
            h: 'How long it is kept',
            p: 'Operational records are kept only as long as needed to run and account for the service. Accounting records are kept for the period required by Thai law. The retention period for each category is to be confirmed with the company’s legal adviser.',
          },
          {
            h: 'Who it is shared with',
            p: 'The payment processor, the SMS provider, and professional advisers or authorities where the law requires it. Personal data is not sold and is not used for advertising.',
          },
          {
            h: 'Website analytics',
            p: 'This website sets no cookies and carries no third-party tracking scripts. If analytics are introduced, a cookieless tool will be used, or consent will be requested before any non-essential cookie is set, and this notice will be updated first.',
          },
          {
            h: 'Rights of the data subject',
            p: 'Under the PDPA a data subject may request access to their personal data, correction, erasure, restriction or objection to processing, and portability, and may withdraw consent where processing rests on consent. Requests are made to the contact address below and are answered within the statutory period.',
          },
          {
            h: 'Contact for data requests',
            p: 'Requests and complaints about personal data should be addressed to the director at the email address and telephone number in the footer of this page.',
          },
        ],
      },
    ],
  },

  notFound: {
    title: 'Page not found — BagDrop',
    description: 'That page does not exist on bagdrop.co.th.',
    h1: 'Page not found',
    lede: 'That address does not exist on this site. It may have been mistyped, or the page may have been removed.',
    helpTitle: 'Try one of these',
  },
};
