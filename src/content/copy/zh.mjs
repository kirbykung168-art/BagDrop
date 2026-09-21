/**
 * Simplified Chinese copy — DRAFT, PENDING NATIVE REVIEW.
 *
 * Scope: traveller-facing pages only — Home, How it works, Pricing and 404.
 * Venue partners, Company and Legal are B2B or legal text and stay EN/TH; on a
 * Chinese page their links open the English version. So this file has no
 * `venues`, `company` or `legal` page sections; every other key matches en.mjs.
 * docs/zh-copy-sheet.md pairs every string with its English source for review.
 * Facts are substituted through `{token}` slots exactly as in en.mjs.
 */
export default {
  code: 'zh',
  htmlLang: 'zh-Hans',
  label: '中文',
  shortLabel: '中文',

  nav: {
    home: '首页',
    how: '使用方法',
    pricing: '价格',
    venues: '场地合作',
    company: '公司信息',
    legal: '条款',
    legalFooter: '条款与隐私',
  },

  ui: {
    skip: '跳到主要内容',
    menuLabel: '主菜单',
    menuOpen: '打开菜单',
    langLabel: '语言',
    lineChat: 'LINE 咨询',
    lineChatAt: 'LINE 咨询 · {line}',
    lineAt: 'LINE {line}',
    line: 'LINE',
    call: '致电',
    email: '邮箱',
    callDirector: '致电董事',
    howItWorks: '使用方法 →',
    seePricing: '查看价格 →',
    fullPricing: '查看完整价格 →',
    walkthrough: '查看完整流程 →',
    venueBrief: '查看场地合作说明（英文）→',
    profilePdf: '公司简介（PDF，英文）',
    profilePdfSize: '公司简介（PDF，{size}）',
    lineQrAlt: '二维码：在 LINE 上添加 BagDrop，{line}',
    lineQrHint: '用手机扫码，在 LINE 上添加我们',
    downloadPdf: '下载 PDF · {size}',
    requestPrint: '索取印刷版',
    terms: '阅读使用条款（英文）→',
    termsShort: '条款（英文）→',
    refundTerms: '退款条款（英文）→',
    companyRecord: '完整公司信息（英文）→',
    backHome: '返回首页',
    openDbd: '打开 DBD 登记记录 ↗',
    perHour: '每小时',
    perHourShort: '/ 小时',
    maxPerDay: '每日封顶',
    maxPerDayShort: '每日封顶',
    stickyRate: '{hour} / 小时',
    stickyCap: '每日最高 {cap}',
    illustrative: '示意图',
  },

  status: 'BagDrop 正在与场地方洽谈合作。柜点安装完成后将在此公布。',
  statusNow: '目前正在与场地方洽谈合作。柜点安装完成后将在此公布。',
  statusShort: '正在与场地方洽谈。柜点安装后在此公布。',

  footer: {
    tagline: '曼谷购物中心的自助行李寄存柜。在曼谷，轻松解放双手。',
    registered: '注册公司',
    contact: '联系方式',
    site: '网站',
    regNo: '注册号',
    verifyDbd: '在 DBD 核实',
    vatPending: '增值税登记：申请办理中',
    copyright: '© {year} {company} BagDrop 是 {company} 的商号',
    mobileReg: '注册号 {reg} · 增值税登记办理中',
  },

  diagrams: {
    /* Alt text for the illustrations in src/content/images.mjs. */
    images: {
      tag: '示意图',
      hero: '示意图：一位旅客在购物中心里，站在打开的 BagDrop 柜位前放置青绿色行李箱，旁边是触摸屏终端。',
      stepStart: '示意图：旅客点击寄存柜终端的触摸屏，选择柜位。',
      stepPay: '示意图：她把手机对准终端，用自己的银行应用通过 PromptPay 付款。',
      stepStore: '示意图：她把行李箱推入打开的柜位。',
      stepCollect: '示意图：她在触摸屏上输入 PIN 码，行李箱就放在旁边打开的柜位里。',
      venueFloor: '示意图：购物中心内的一组 BagDrop 寄存柜，位于绿植和座椅之间，顾客从旁经过。',
    },
    locker: {
      aria: 'BagDrop 寄存柜的等轴示意图：二十个大号柜位、一台支付终端，以及一扇打开的柜门，里面放着一个行李箱。',
      wordmark: 'BagDrop',
      illustrative: '示意图',
      callouts: [
        { t: '20 个大号柜位', s: '每个都能放下大号行李箱' },
        { t: '终端', s: '触摸屏 · 银行卡 · PromptPay' },
        { t: '4G · 全天 24 小时监控', s: '每扇柜门、每把锁、每台终端' },
        { t: '占地 5–7 平方米', s: '一个 220V 插座 · 低于 1 千瓦' },
      ],
    },
    plan: {
      aria: '设备占地俯视图：约 {length} × {depth} 米，一个插座，前方为顾客使用区。',
      title: '平面图 · 示意',
      zone: '顾客使用区',
      outlet: '220V',
      length: '≈ {length} 米',
      depth: '≈ {depth} 米',
      caption: '含顾客使用区共 5–7 平方米 · 独立放置',
    },
    fits: {
      aria: '柜内尺寸 {w} × {h} 厘米，深 {d} 厘米，可放下一个大号行李箱。',
      width: '{w} 厘米',
      height: '{h} 厘米',
      depth: '深 {d} 厘米',
      interior: '柜内',
      suitcase: '大号行李箱',
    },
    chart: {
      aria: '图表：费用每小时增加 {hour}，从第六小时起停在 {cap}。',
      max: '每日封顶 · {cap}',
      axis: '寄存小时数',
      hour: '{n} 小时',
    },
    empty: { aria: '一个打开的空柜位。', tag: '柜位 404' },
    app: {
      bank: '柜组',
      storeTitle: '寄存行李',
      largeLocker: '大号柜位',
      fitsSuitcase: '可放下大号行李箱',
      available: '空闲 {n} 个',
      rate: '费率',
      rateValue: '{hour} / 小时',
      dailyMax: '每日封顶',
      continue: '继续',
      back: '返回',
      payTitle: '付款',
      mobileLabel: '接收 PIN 码的手机号',
      card: '银行卡',
      firstHour: '第一小时',
      extraTime: '超出时间',
      onCollection: '取件时支付',
      pay: '支付 {amount}',
      openTitle: '{n} 号柜已打开',
      openHint: '放入行李后关上柜门。',
      yourPin: '您的 PIN 码',
      smsTo: '同时已短信发送至',
      reopen: '再次开柜',
      inUse: '{n} 号柜 · 使用中',
      welcome: '请输入 PIN 码',
      stored: '已寄存 {t}',
      openLocker: '开柜',
    },
    profile: { label: '公司简介 · {year}', title: '面向购物中心的自助行李寄存服务' },
  },

  /* ------------------------------------------------------------ HOME */
  home: {
    title: 'BagDrop — 曼谷购物中心行李寄存柜',
    description:
      '曼谷购物中心的自助行李寄存柜。在柜体触摸屏上用银行卡或 PromptPay 付款，再用 PIN 码锁好行李。每小时 {hour}，每日最高 {cap}。由 {company} 运营，注册号 {reg}。',
    eyebrow: '自助行李寄存柜 · 曼谷',
    h1: '曼谷购物中心的行李寄存柜',
    lead: '在触摸屏上选择柜位，用银行卡或 PromptPay 付款，行李就锁在只有您的 PIN 码才能打开的柜门后。从点击屏幕到锁好，大约九十秒。',
    leadShort: '点击屏幕，用银行卡或 PromptPay 付款，再用 PIN 码锁好行李。大约九十秒。',
    facts: [
      { h: '约 90 秒', s: '从点击屏幕到锁好', icon: 'clock' },
      { h: '银行卡或 PromptPay', s: '不收现金', icon: 'card' },
      { h: 'PIN 码开柜', s: '没有钥匙可丢', icon: 'lock' },
      { h: '全天 24 小时监控', hShort: '24 小时监控', s: '每扇柜门、每把锁', icon: 'eye' },
    ],
    statement: '在曼谷解放双手。放下行李，尽享这一天。',
    statementTag: 'BagDrop · {company}',

    pricing: {
      eyebrow: '价格',
      h2: '统一费率，简单明了。',
      perHour: '每小时',
      perHourNote: '不足一小时按一小时计。',
      dailyMax: '每日封顶',
      dailyMaxNote: '无论寄存多久，一天都不会超过这个价格。',
      examples: '示例',
      rows: [
        { k: '1 小时', hours: 1 },
        { k: '3 小时', hours: 3 },
        { k: '9 小时', hours: 9 },
      ],
      bullets: ['不收现金', '无需账号', '无需应用', '可随时多次开柜'],
      bulletsShort: '不收现金 · 无需账号 · 无需应用',
    },

    how: {
      eyebrow: '使用方法',
      h2: '四个步骤，大约九十秒。',
      lead: '不用排队，没有柜台，也没有钥匙可丢。一切都在寄存柜的触摸屏上完成。',
      steps: [
        { n: '01', h: '开始', p: '点击寄存柜上的触摸屏并选择语言。无需应用，无需账号。', short: '点击柜体上的屏幕。无需应用，无需账号。', icon: 'touch' },
        { n: '02', h: '付款', p: '输入手机号，再用国际银行卡或 PromptPay 付款。第一小时在寄存时支付。', short: '银行卡或 PromptPay，不收现金。', icon: 'pay' },
        { n: '03', h: '寄存', p: '一个大号柜位自动打开。放入行李并关上柜门，柜门会自动上锁。', short: '放入行李，关上柜门，自动上锁。', icon: 'suitcase', on: true },
        { n: '04', h: '用 PIN 码再次开柜', p: 'PIN 码会显示在屏幕上，并通过短信发送给您。输入 PIN 码即可开柜，次数不限。', short: '短信和屏幕同时提供，次数不限。', icon: 'pin' },
      ],
      screens: [
        { n: '01 · 开始', p: '在屏幕上选择柜位。' },
        { n: '02 · 付款', p: '银行卡或 PromptPay，不收现金。' },
        { n: '03 · 寄存', p: '您的 PIN 码可随时再次开柜。' },
      ],
    },

    who: {
      eyebrow: '适合谁',
      h2: '为还有行程要赶的人而设。',
      cards: [
        { h: '退房后到深夜航班之间', p: '中午退房，午夜起飞。逛街、用餐、游览城市，都不必拖着行李箱。', short: '游览城市，不必拖着行李箱。', spot: 'flight', icon: 'suitcase' },
        { h: '满手购物袋的顾客', p: '把上午买的东西先存起来，继续逛。离开时一并取走。', short: '先存起来，继续逛。', spot: 'shopping', icon: 'bag', warm: true },
        { h: '晚餐、电影与活动', p: '带着行李到场，先存在门口，安心享受夜晚。', short: '安心享受夜晚。', spot: 'evening', icon: 'ticket' },
      ],
    },

    unit: {
      eyebrow: '设备',
      h2: '为繁忙的零售空间而设计。',
      p: '一组独立放置的寄存柜，含二十个大号柜位，自带终端、电源和 4G 连接。外观低调，适合高端零售环境。',
      rows: [
        { k: '柜位', v: '20 个大号' },
        { k: '可放', v: '大号行李箱', mobileOnly: true },
        { k: '开柜方式', v: 'PIN 码，短信与屏幕同时提供', vShort: 'PIN 码：短信 + 屏幕' },
        { k: '界面语言', v: 'English · ไทย · 中文', langs: true },
        { k: '网络', v: '4G', desktopOnly: true },
        { k: '电源', v: '220V，低于 1 千瓦', desktopOnly: true },
      ],
    },

    fits: {
      eyebrow: '能放什么',
      h2: '能托运的，就能放进 BagDrop。',
      p: '每个柜位都能放下一个大号托运行李箱。登机箱、背包和购物袋放进去绰绰有余。',
      tiles: [
        { h: '托运行李箱', s: '最重 {kg} 公斤' },
        { h: '登机箱', s: '外加一个小背包' },
        { h: '背包', s: '最大 {litres} 升' },
        { h: '购物袋', s: '可同时放多个' },
      ],
    },

    ops: {
      eyebrow: '运营承诺',
      h2: '每一天，每一小时，都有人值守。',
      lead: '每扇柜门、每把锁和每台终端都持续上报状态。多数故障在顾客反馈之前就已被发现。',
      nodes: [
        { h: '柜组', s: '柜门、锁具与终端传感器', icon: 'grid' },
        { h: '实时状态', s: '持续上报', icon: 'bars' },
        { h: '24 小时监控', s: '每扇柜门、每把锁', icon: 'eye', on: true },
        { h: '工程师到场', s: '营业时间内 4 小时内', icon: 'wrench' },
      ],
      links: ['4G', '', '≤ 4 小时'],
      stats: [
        { n: '24 小时', h: '远程监控', p: '每扇柜门、每把锁、每台终端，全天不间断。' },
        { n: '4 小时', h: '到场响应', p: '营业时间内，工程师四小时内到场。' },
        { n: '0', h: '工作人员接触行李', p: '只有您的 PIN 码能打开您的柜门。' },
        { n: '100%', h: '无现金', p: '每笔付款、每次开柜都有数字记录。' },
      ],
    },

    venues: {
      eyebrow: '场地合作',
      h2: '让闲置空间产生收入。',
      h2Short: '让闲置空间产生收入。',
      checks: ['新增收入', '零资本投入', '一个标准插座', '5–7 平方米，独立放置', '不占用员工时间', '顾客停留更久'],
    },

    rules: {
      eyebrow: '规则与保障',
      h2: '规则清楚，提前说明。',
      notPermitted: '禁止存放的物品',
      itemsShort: ['禁止危险品', '禁止易腐物品', '禁止现金和贵重物品', '禁止动物'],
      icons: ['flame', 'leaf', 'gem', 'paw'],
      rows: [
        { h: '赔偿责任', p: '寄存物品的保障上限为每个柜位 {liability}。' },
        { h: '退款', p: '如果柜门无法打开或上锁，您无需付费。' },
        { h: '无人认领的物品', p: '寄存超过 {maxDays} 天的行李，将按我们公布的流程处理。' },
      ],
      mobileNote: '每个柜位保障上限 {liability}。柜位出现故障，您无需付费。',
    },

    faq: {
      eyebrow: '常见问题',
      h2: '使用须知。',
      p: '还有其他问题？在 LINE 上给我们留言，会有真人回复。',
      items: [
        { q: '需要下载应用吗？', a: '不需要。没有应用，也不用下载任何东西。一切都在寄存柜的触摸屏上完成，也无需注册账号。' },
        { q: 'PIN 码丢了怎么办？', a: '付款时 PIN 码已通过短信发送给您。如果短信找不到了，请在 LINE 上联系我们，并提供柜号和时间；我们核实身份后会重新发送。' },
        { q: '可以多次开柜吗？', a: '可以。在您最后一次取走行李之前，同一个 PIN 码可以反复打开同一扇柜门。' },
        { q: '有时间限制吗？', a: '最长可寄存 {maxDays} 天。不足一小时按一小时计，每个自然日最高 {cap}。' },
        { q: '可以付现金吗？', a: '不可以。BagDrop 只接受国际银行卡和 PromptPay，因此柜点无需人员值守，现场也没有现金。' },
        { q: '柜门打不开怎么办？', a: '每扇柜门都有远程监控，多数故障在有人反馈之前就已被发现。在 LINE 上给我们留言，我们可以远程为您开门；如果做不到，工程师会在营业时间内四小时内到场。' },
        { q: '哪些东西不能存？', a: '危险品或易燃物、易腐物品、现金和贵重物品、动物、武器以及任何违法物品。完整清单见使用条款。' },
      ],
    },

    operator: {
      statusEyebrow: '状态',
      statusH: '即将进驻曼谷的购物中心。',
      eyebrow: '运营方',
      h2: '一家在泰国注册的公司。',
      rows: { name: '注册名称', reg: '注册号', alsoTax: '同时为税号', director: '董事' },
      mobileReg: '注册号 ',
      mobileDirector: '董事：',
    },

    contact: {
      h2: '联系我们。',
      lead: '旅客、场地方、合作伙伴：都会有真人回复。',
    },
  },

  /* ---------------------------------------------------------- HOW */
  how: {
    title: 'BagDrop 使用方法 — 点击屏幕、付款、寄存、用 PIN 码再次开柜',
    description:
      '在触摸屏上选择柜位，用银行卡或 PromptPay 付款，存好行李，之后用 PIN 码随时开柜，次数不限。以及出现问题时的处理方法。',
    eyebrow: '使用方法',
    h1: '从点击屏幕到锁好，大约九十秒。',
    lead: '不用排队，没有柜台，也没有钥匙可丢。一切都在寄存柜的触摸屏上完成。',
    pills: ['无需应用', '无需账号', '不收现金'],
    stepsEyebrow: '分步说明',
    stepsH2: '四个步骤，全部在柜体屏幕上完成。',
    steps: [
      { n: '01', h: '点击屏幕', p: '在首屏选择英语、泰语或中文，再选择柜位。无需应用，无需账号。', screen: 'store' },
      { n: '02', h: '用银行卡或 PromptPay 付款', p: '输入手机号，以便通过短信接收 PIN 码，然后付款。第一小时在寄存时支付，超出的时间在取件时结算，每日最高 {cap}。', screen: 'pay' },
      { n: '03', h: '存放行李', p: '一个大号柜位自动打开。放入行李并关上柜门，柜门会自动上锁。PIN 码会显示在屏幕上，并通过短信发送给您。', screen: 'open' },
      { n: '04', h: '用 PIN 码再次开柜', p: '在触摸屏上输入 PIN 码。可随时多次开柜，准备好了再取走行李。', screen: 'welcome' },
    ],
    wrongEyebrow: '如果出现问题',
    wrongH2: '发一条消息，就有真人帮您。',
    wrong: [
      { h: 'PIN 码丢了', p: 'PIN 码在您的短信里。如果短信找不到了，请在 LINE 上联系我们，我们核实身份后会重新发送。', icon: 'chat' },
      { h: '柜门打不开', p: '我们可以远程查看每扇柜门，并为您远程开门。如有需要，工程师会在四小时内到场。', icon: 'lock' },
      { h: '想多存一会儿', p: '无需任何操作。超出的时间会自动累计，每日最高 {cap}，最长可寄存 {maxDays} 天。', icon: 'clock' },
    ],
    langs: {
      words: { en: 'Hello', th: 'สวัสดี', zh: '你好' },
      names: { en: 'English', th: 'ไทย', zh: '中文' },
      p: '寄存柜界面支持三种语言。在首屏选择您的语言即可。',
    },
    cta: { h2: '每小时 {hour}，每日最高 {cap}。' },
  },

  /* ------------------------------------------------------ PRICING */
  pricing: {
    title: 'BagDrop 价格 — 每小时 {hour}，每日最高 {cap}',
    description:
      'BagDrop 每小时收费 {hour}，每个自然日最高 {cap}。支持银行卡或 PromptPay，不收现金。每次使用均有收据。柜位出现故障可退款。',
    eyebrow: '价格',
    h1: '统一费率，每个柜点都一样。',
    perHour: '每小时',
    maxPerDay: '每日封顶',
    how: {
      eyebrow: '计费方式',
      h2: '计费到 {cap} 就停。',
      p: '不足一小时按一小时计。满六小时后，当天剩余时间不再收费。封顶按每个自然日计算。',
    },
    examples: {
      eyebrow: '示例',
      h2: '您需要付多少。',
      head: { k: '寄存时长', ex: '示例', v: '合计' },
      rows: [
        { k: '1 小时', ex: '吃一顿简单的午餐', hours: 1 },
        { k: '3 小时', ex: '逛一个下午', hours: 3 },
        { k: '9 小时', ex: '退房后到夜间航班', hours: 9 },
        { k: '2 天', ex: '去外府短途游', hours: 48 },
      ],
    },
    cards: {
      payment: { eyebrow: '付款方式', h3: '银行卡或 PromptPay，不收现金。' },
      receipts: { eyebrow: '收据', h3: '每次使用都有收据。', p: '通过短信发送，附 PDF 下载链接。可按需开具公司抬头收据。' },
      refunds: { eyebrow: '退款', h3: '柜位出现故障，您无需付费。', p: '退款将原路退回付款所用的银行卡或 PromptPay 账户。' },
    },
  },

  /* ---------------------------------------------------------- 404 */
  notFound: {
    title: '页面未找到 — BagDrop',
    description: 'bagdrop.co.th 上没有这个页面。请返回首页，或在 LINE 上给我们留言。',
    eyebrow: '错误 404',
    h1: '这个柜位是空的。',
    lead: '您要找的页面不在这里。请返回首页，或在 LINE 上给我们留言。',
  },
};
