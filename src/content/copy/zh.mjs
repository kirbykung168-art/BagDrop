/**
 * Simplified Chinese copy — DRAFT, PENDING NATIVE REVIEW.
 *
 * Scope: traveller-facing pages only (Home, How it works, Pricing, 404), per brief §6.
 * Venue partners is CPN-facing and Legal requires the client's Thai legal adviser,
 * so those remain EN/TH; Chinese pages link through to the English versions.
 * docs/zh-copy-sheet.md pairs every string with its English source for review.
 */
export default {
  code: 'zh',
  htmlLang: 'zh-Hans',
  label: '中文',
  shortLabel: '中文',
  dateNote: null,

  // Traveller-facing pages exist in Chinese; the rest link to English.
  scope: ['home', 'how', 'pricing', 'notFound'],

  labels: {
    operator: '运营方', steps: '使用', site: '场地要求',
    offer: '合作方案', benefit: '价值', spec: '规格',
    documents: '资料', contact: '联系', examples: '计价示例',
    payment: '付款', refunds: '退款', support: '支持',
    registry: '登记信息', verify: '查验',
  },

  nav: {
    home: '首页',
    how: '使用方法',
    pricing: '价格',
    venues: '场地合作',
    company: '公司信息',
    legal: '条款与隐私',
  },

  ui: {
    skip: '跳至主要内容',
    langLabel: '语言',
    menuLabel: '栏目',
    lineCta: '通过 LINE 联系我们',
    lineShort: 'LINE',
    callCta: '致电董事',
    emailCta: '电子邮件',
    backHome: '返回首页',
    onThisPage: '本页内容',
    currentPage: '当前页面',
    inEnglish: '英文版',
    englishOnlyNote: '以下页面目前仅提供英文和泰文版本。',
  },

  status: 'BagDrop 正在与场地合作方洽谈。设点完成后，地点将在本页公布。',

  footer: {
    registeredOffice: '注册地址',
    registration: '法人注册号',
    alsoTaxId: '同时为纳税识别号',
    vatPending: '增值税登记：申请办理中',
    director: '董事',
    contact: '联系方式',
    legalNote: 'BagDrop 是 8Venture Co., Ltd. 的商号。',
    copyright: (y) => `© ${y} 8Venture Co., Ltd.`,
  },

  // Chinese has no Company page, but the homepage still carries the §3
  // credibility block, so it needs these row labels.
  company: {
    rows: {
      legalNameEn: '注册名称（英文）',
      legalNameTh: '注册名称（泰文）',
      tradingName: '商号',
      regNo: '法人注册号',
      regNoNote: '该号码同时为纳税识别号。',
      director: '董事',
    },
  },

  // Likewise the homepage spec summary; the full Venue Partners page is EN/TH.
  venues: {
    specRows: {
      footprint: '占地面积',
      power: '电力',
      faultResponse: '故障响应',
    },
  },

  home: {
    title: 'BagDrop — 曼谷商场自助行李寄存柜',
    description:
      'BagDrop 是一组 20 个通过网页应用控制的行李寄存柜，可容纳大号行李箱。每小时 50 泰铢，每日封顶 300 泰铢。由 8Venture Co., Ltd. 运营，注册号 0105569178707。',
    h1: '商场自助行李寄存柜',
    lede:
      '每组 BagDrop 有 20 个大号柜位，每个柜位可放下一个大号行李箱。扫描二维码，用银行卡或 PromptPay 付款，再用 PIN 码开柜。无需下载应用，无需注册账号，全程不收现金。',

    priceLabel: '用户价格',
    priceCaption: '所有地点统一价格，公开标示，无需议价。',

    stepsTitle: '三个步骤，约九十秒',
    stepsMore: '查看完整使用方法',

    companyTitle: '运营公司',
    companyLede:
      'BagDrop 由一家在泰国注册的有限公司运营。下方的注册号是泰国商业发展厅签发的法人注册号，同时也是纳税识别号，可在公开登记系统中查询。',
    companyMore: '查看完整公司信息（英文）',

    specTitle: '场地需要提供什么',
    specLede: '一个标准电源插座和 4G 信号。机柜独立放置，无需装修、无需施工，场地无需投入资金。',
    specMore: '查看场地合作说明（英文）',

    venueTitle: '场地合作',
    venueLede:
      'BagDrop 正在曼谷各商场寻找合适地点。机柜无人值守、不收现金，每个柜门全天受到监控，出现故障时工程师会在营业时间内四小时内到场。',
    venueCta: '查看场地合作说明（英文）',
  },

  how: {
    title: 'BagDrop 使用方法 — 三个步骤，无需应用，无需账号',
    description: '扫描二维码，用银行卡或 PromptPay 付款，通过短信接收 PIN 码。PIN 码可随时重新开柜。以及出现问题时的处理方法。',
    h1: '使用方法',
    lede: 'BagDrop 是为拎着行李、赶时间的人设计的一次性服务。无需安装任何东西，只需记住 PIN 码，而 PIN 码也会通过短信发送。',

    steps: [
      {
        n: '1',
        h: '找到并扫码',
        p: '每组柜体上都有二维码。扫码后会在手机浏览器中打开 BagDrop 网页应用，无需下载，也无需注册账号。界面支持英语、泰语和简体中文。',
      },
      {
        n: '2',
        h: '付款并获取 PIN 码',
        p: '选择一个空柜，用国际银行卡或 PromptPay 付款。BagDrop 不收现金。PIN 码会显示在屏幕上，并通过短信发送到您填写的手机号，即使关闭网页也不会丢失。',
      },
      {
        n: '3',
        h: '返回并开柜',
        p: '在柜体键盘上输入 PIN 码，柜门即打开。同一个 PIN 码可以多次打开同一个柜门，因此白天可以随时取物，并继续寄存到当天结束。',
      },
    ],

    troubleTitle: '如果出现问题',
    trouble: [
      {
        h: '柜门打不开',
        p: '每个柜门、锁具和终端都受到全天 24 小时远程监控，故障通常在用户反映之前就已被发现。请通过 LINE 或电话联系我们，我们可以远程开锁。若无法远程处理，工程师会在场地营业时间内四小时内到场。',
      },
      {
        h: '没有收到 PIN 短信',
        p: '付款时 PIN 码也会显示在屏幕上。若两者都遗失，请通过 LINE 或电话联系我们，并提供付款参考号和柜号。',
      },
      {
        h: '付款未完成',
        p: '只有在付款确认后系统才会分配柜位。若已扣款但未分配柜位，请提供付款参考号与我们联系。退款条件载于条款中。',
      },
      {
        h: '超过已付时段仍未取物',
        p: '寄存设有最长期限，超过期限后物品将按无人认领处理，并依条款所载程序办理。',
      },
    ],

    prohibitedNote: '部分物品不得存放于 BagDrop 柜内，包括危险品、生鲜食品、活体动物和高价值物品。完整清单属于条款的一部分。',
    prohibitedCta: '查看条款（英文）',
  },

  pricing: {
    title: 'BagDrop 价格 — 每小时 50 泰铢，每日封顶 300 泰铢',
    description: 'BagDrop 每小时 50 泰铢，每日封顶 300 泰铢。支持国际银行卡和 PromptPay，不收现金。所有地点统一价格。',
    h1: '价格',
    lede: '单一价格，公开标示，所有地点一致。没有会员费，没有押金，也不分柜型：每组柜内每个柜位都是可放下大号行李箱的大柜。',

    perUnit: { hour: '小时', day: '天' },
    hourLabel: '每小时',
    capLabel: '每日封顶',
    capNote: '无论寄存多久，一天的费用都不会超过封顶金额。',

    examplesTitle: '计价示例',
    examplesHead: { duration: '时长', calc: '计算方式', total: '合计' },
    examplesNote: '达到每日封顶后，当天剩余时间不再产生费用。',
    hoursWord: (n) => `${n} 小时`,

    payTitle: '支持的付款方式',
    payLede: '在预订时通过浏览器完成付款。BagDrop 在任何环节都不收现金，因此机柜无需人员值守，也无需现金清点。',
    payNote: '银行卡信息由支付服务商处理，BagDrop 不存储卡号。',

    refundTitle: '退款',
    refundLede: '若柜门无法打开且责任在我方，该笔订单全额退款。退款条件、最长寄存期限以及已付款但未开柜的处理方式，均在条款中完整载明。',
    refundCta: '查看退款与寄存条款（英文）',
  },

  notFound: {
    title: '找不到页面 — BagDrop',
    description: 'BagDrop 网站上找不到该页面。请检查网址是否输入有误，或从下方列表中选择要访问的页面。',
    h1: '找不到页面',
    lede: '本网站不存在该地址。可能是输入有误，或该页面已被移除。',
    helpTitle: '您可以前往',
  },
};
