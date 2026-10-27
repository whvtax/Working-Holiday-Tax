/**
 * Student Visa Tax languages: English, Simplified Chinese, Vietnamese.
 *
 * Chinese and Vietnamese are written natively (CLAUDE.md), never translated
 * line by line, and checked by a separate reviewer before release. The legal
 * wording keeps its meaning exactly in every language:
 *   "operates under the supervision of a registered tax agent"
 *   "Reviewed and signed off by a registered tax agent before it is lodged
 *    with the ATO"
 * Legal pages (Client Agreement, Privacy Policy) are English only, as on WHT.
 */
export type SvtLocale = 'en' | 'zh' | 'vi'

export const SVT_LOCALES: readonly SvtLocale[] = ['en', 'zh', 'vi'] as const

export const LOCALE_META: Readonly<Record<SvtLocale, { htmlLang: string; hreflang: string; ogLocale: string; prefix: string; label: string }>> = {
  en: { htmlLang: 'en-AU', hreflang: 'en-AU', ogLocale: 'en_AU', prefix: '', label: 'English' },
  zh: { htmlLang: 'zh-CN', hreflang: 'zh-Hans', ogLocale: 'zh_CN', prefix: '/zh', label: '中文' },
  vi: { htmlLang: 'vi', hreflang: 'vi', ogLocale: 'vi_VN', prefix: '/vi', label: 'Tiếng Việt' },
}

/** A public path in a language: ('zh', '/medicare') -> '/zh/medicare'. */
export function localePath(locale: SvtLocale, path: string): string {
  const prefix = LOCALE_META[locale].prefix
  if (path === '/' || path === '') return prefix || '/'
  return `${prefix}${path.startsWith('/') ? path : `/${path}`}`
}

/** The language-free path of a public path: '/vi/medicare' -> '/medicare'. */
export function basePath(path: string): string {
  const m = path.match(/^\/(zh|vi)(\/.*)?$/)
  return m ? (m[2] || '/') : path
}

export interface SvtUi {
  skip: string
  homeAria: string
  mainNav: string
  menu: string
  nav: { pricing: string; howItWorks: string; questions: string }
  whatsappCta: string
  /** Prefilled first message, so nobody faces an empty chat. */
  whatsappHello: string
  /** Prefilled message from a guide or article; {topic} is the page label. */
  whatsappAbout: string
  /** Shown under the hero button for people who cannot open WhatsApp. */
  noWhatsapp: string
  trust: { aria: string; supervision: string; check: string; checkHint: string; myGov: string }
  footer: { supervision: string; guidesAria: string; clientAgreement: string; privacy: string; legalEnglishOnly?: string; tagline: string; intro: string; askUs: string; learn: string; connect: string; email: string; copyright: string; about: string; sealAlt: string }
  languageAria: string
  guide: { home: string; questions: string; sources: string; newTab: string; onThisPage: string; more: string; ctaTitle: string; ctaPrice: string; related: string; allQuestions: string; readFullGuide: string; inShort: string; source: string; yes: string; no: string; minRead: string; position: string; next: string; previous: string }
  questionsPage: { title: string; titleMark: string; basics: string; metaTitle: string; metaDescription: string }
  priceCheck: { yourVisa: string; yourWork: string; perYear: string; messageWillOpen: string; send: string }
  payslipLegend: string
  blog: { nav: string; title: string; titleMark: string; titleAfter?: string; lead: string; intro: string; statArticles: string; statTopics: string; statTaxYear: string; statFree: string; statFreeNote: string; all: string; metaTitle: string; metaDescription: string; updated: string; categories: Record<'TFN' | 'Tax return' | 'Deductions' | 'Super' | 'ABN' | 'Work' | 'Medicare', string> }
}

export const UI: Readonly<Record<SvtLocale, SvtUi>> = {
  en: {
    skip: 'Skip to content',
    homeAria: 'Student Visa Tax, home',
    mainNav: 'Main',
    menu: 'Menu',
    nav: { pricing: 'Price', howItWorks: 'How it works', questions: 'Questions' },
    whatsappCta: 'Message us on WhatsApp',
    whatsappHello: 'Hi, I would like help with my tax return.',
    whatsappAbout: 'Hi, I read your page "{topic}" and have a question about my tax return.',
    noWhatsapp: 'No WhatsApp? Email us at {email}.',
    trust: {
      aria: 'Who reviews your return',
      supervision: 'Operates under the supervision of a registered tax agent, {agent}, Tax Agent Number {tpb}.',
      check: 'Check the register',
      checkHint: ' (opens the Tax Practitioners Board site in a new tab)',
      myGov: 'A registered tax agent will never ask for your myGov login details.',
    },
    footer: {
      supervision: 'Operates under the supervision of a registered tax agent, {agent}, Tax Agent Number {tpb}.',
      guidesAria: 'Guides', clientAgreement: 'Client Agreement', privacy: 'Privacy Policy',
      tagline: 'Student tax, sorted.',
      intro: 'Tax returns for people on student and graduate visas in Australia, in English, Chinese and Vietnamese.',
      askUs: 'Ask us anything', learn: 'Learn', connect: 'Connect', email: 'Email',
      copyright: 'Student Visa Tax. All rights reserved.', about: 'About us',
      sealAlt: 'Tax Practitioners Board registered, Tax Agent Number {tpb}',
    },
    languageAria: 'Language',
    guide: {
      home: 'Home', questions: 'Questions', sources: 'Check it yourself', newTab: ' (opens in a new tab)',
      onThisPage: 'On this page', more: 'More', ctaTitle: 'Ask us about your situation',
      ctaPrice: '$220 per return. $385 with ABN work. GST included. We confirm your price before you pay.', related: 'Related',
      allQuestions: 'All questions', readFullGuide: 'Read the full guide',
      inShort: 'In short', source: 'Source', yes: 'Yes', no: 'No', minRead: '{n} min read',
      position: '{i} of {n}', next: 'Next in {topic}', previous: 'Previous',
    },
    questionsPage: {
      title: 'Your ', titleMark: 'questions', basics: 'The basics',
      metaTitle: 'Questions about student tax returns',
      metaDescription: 'Answers to the questions international students ask most about Australian tax returns, residency, Medicare, ABN delivery work and super.',
    },
    priceCheck: { yourVisa: 'Your visa', yourWork: 'Your work this year', perYear: 'per year', messageWillOpen: 'Message we will open in WhatsApp: ', send: 'Send this on WhatsApp' },
    payslipLegend: 'Sample payslip lines',
    blog: {
      nav: 'Articles', title: 'Tax, explained for ', titleMark: 'students',
      lead: 'Short answers to the questions students ask us most, each checked against the ATO.',
      intro: 'Practical guides for international students on 500 and 485 visas: your TFN, two jobs and the tax-free threshold, refunds, payslips, super, and Uber Eats or other ABN work. Written for students and checked against the ATO and Fair Work.',
      statArticles: 'Articles', statTopics: 'Topics', statTaxYear: 'Tax year', statFree: 'Free', statFreeNote: 'No sign-up', all: 'All articles',
      metaTitle: 'Tax articles for international students',
      metaDescription: 'Plain answers about TFNs, two jobs, refunds, pay, super and ABN work for international students in Australia, checked against official sources.',
      updated: 'Updated', categories: { TFN: 'TFN', 'Tax return': 'Tax return', Deductions: 'Deductions', Super: 'Super', ABN: 'ABN', Work: 'Work', Medicare: 'Medicare and health' },
    },
  },
  zh: {
    skip: '跳到正文',
    homeAria: 'Student Visa Tax 首页',
    mainNav: '主导航',
    menu: '菜单',
    nav: { pricing: '价格', howItWorks: '办理流程', questions: '常见问题' },
    whatsappCta: '在 WhatsApp 上联系我们',
    whatsappHello: '你好，我想请你们帮我报税。',
    whatsappAbout: '你好，我看了你们关于“{topic}”的页面，想咨询一下我的报税。',
    noWhatsapp: '不用 WhatsApp？可以发邮件到 {email}。',
    trust: {
      aria: '谁来审核你的报税',
      supervision: '在注册税务代理人 {agent} 的监督下运营，税务代理人编号 {tpb}。',
      check: '查询注册信息',
      checkHint: '（在新标签页打开税务从业者委员会（TPB）网站）',
      myGov: '任何正规的报税服务都不会向你索要 myGov 登录信息。',
    },
    footer: {
      supervision: '在注册税务代理人 {agent} 的监督下运营，税务代理人编号 {tpb}。',
      guidesAria: '指南', clientAgreement: 'Client Agreement（客户协议）', privacy: 'Privacy Policy（隐私政策）',
      legalEnglishOnly: '客户协议和隐私政策仅有英文版。',
      tagline: '留学生报税，交给我们。',
      intro: '专为在澳大利亚持学生签证和毕业生签证的人办理报税，可以用英文、中文和越南文沟通。',
      askUs: '有问题随时问我们', learn: '文章与问答', connect: '联系我们', email: '电子邮件',
      copyright: 'Student Visa Tax 版权所有。', about: '关于我们',
      sealAlt: 'Tax Practitioners Board 注册标志，编号 {tpb}',
    },
    languageAria: '语言',
    guide: {
      home: '首页', questions: '常见问题', sources: '官方信息来源', newTab: '（在新标签页打开）',
      onThisPage: '本页内容', more: '更多', ctaTitle: '把你的情况告诉我们',
      ctaPrice: '每份报税 $220，有 ABN 工作 $385，均含 GST。付款前我们会先和你确认价格。', related: '相关指南',
      allQuestions: '全部问题', readFullGuide: '阅读完整指南',
      inShort: '简短回答', source: '来源', yes: '是', no: '否', minRead: '阅读约 {n} 分钟',
      position: '第 {i} 篇，共 {n} 篇', next: '{topic}类下一篇', previous: '上一篇',
    },
    questionsPage: {
      title: '你的', titleMark: '问题', basics: '基本问题',
      metaTitle: '留学生报税常见问题',
      metaDescription: '留学生最常问的澳洲报税问题：税务居民身份、Medicare 税、外卖 ABN 收入和养老金（super）。',
    },
    priceCheck: { yourVisa: '你的签证', yourWork: '你今年的工作', perYear: '/ 年', messageWillOpen: '会自动填入 WhatsApp 的消息：', send: '在 WhatsApp 上发送' },
    payslipLegend: '工资单示例',
    blog: {
      nav: '文章', title: '', titleMark: '留学生', titleAfter: '的报税问题，讲清楚',
      lead: '留学生最常问我们的问题，简短回答，每一篇都对照 ATO 核实过。',
      intro: '写给持 500 学生签证和 485 毕业生签证留学生的实用指南：税号（TFN）、两份工与免税额度、退税、工资单、养老金（super），以及 Uber Eats 等 ABN 工作。全部对照 ATO 和 Fair Work 的官方资料核实。',
      statArticles: '篇文章', statTopics: '个主题', statTaxYear: '税务年度', statFree: '免费', statFreeNote: '无需注册', all: '全部文章',
      metaTitle: '留学生报税文章',
      metaDescription: '用简单的话讲清楚税号、两份工、退税、工资、养老金（super）和 ABN 工作，写给在澳留学生，均对照官方资料核实。',
      updated: '更新于', categories: { TFN: '税号', 'Tax return': '报税', Deductions: '抵扣', Super: '养老金', ABN: 'ABN', Work: '工作', Medicare: '医保与健康' },
    },
  },
  vi: {
    skip: 'Chuyển đến nội dung',
    homeAria: 'Student Visa Tax, trang chủ',
    mainNav: 'Điều hướng chính',
    menu: 'Menu',
    nav: { pricing: 'Giá', howItWorks: 'Quy trình', questions: 'Câu hỏi' },
    whatsappCta: 'Nhắn tin qua WhatsApp',
    whatsappHello: 'Chào bạn, mình muốn nhờ bên bạn khai thuế giúp ạ.',
    whatsappAbout: 'Chào bạn, mình vừa đọc trang “{topic}” và muốn hỏi về hồ sơ thuế của mình ạ.',
    noWhatsapp: 'Không dùng WhatsApp? Gửi email cho chúng tôi tại {email}.',
    trust: {
      aria: 'Ai kiểm tra hồ sơ thuế của bạn',
      supervision: 'Hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký, {agent}, mã số đại lý thuế {tpb}.',
      check: 'Tra cứu sổ đăng ký',
      checkHint: ' (mở trang của Tax Practitioners Board trong thẻ mới)',
      myGov: 'Không dịch vụ khai thuế uy tín nào hỏi thông tin đăng nhập myGov của bạn.',
    },
    footer: {
      supervision: 'Hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký, {agent}, mã số đại lý thuế {tpb}.',
      guidesAria: 'Hướng dẫn', clientAgreement: 'Client Agreement (Thỏa thuận khách hàng)', privacy: 'Privacy Policy (Chính sách quyền riêng tư)',
      legalEnglishOnly: 'Thỏa thuận khách hàng và Chính sách quyền riêng tư chỉ có bản tiếng Anh.',
      tagline: 'Thuế cho du học sinh, gọn gàng.',
      intro: 'Khai thuế cho người có visa du học và visa tốt nghiệp tại Úc, bằng tiếng Anh, tiếng Trung và tiếng Việt.',
      askUs: 'Cứ hỏi chúng tôi nhé', learn: 'Bài viết', connect: 'Liên hệ', email: 'Email',
      copyright: 'Student Visa Tax. Bảo lưu mọi quyền.', about: 'Về chúng tôi',
      sealAlt: 'Đã đăng ký với Tax Practitioners Board, mã số {tpb}',
    },
    languageAria: 'Ngôn ngữ',
    guide: {
      home: 'Trang chủ', questions: 'Câu hỏi', sources: 'Tự kiểm tra tại nguồn chính thức', newTab: ' (mở trong thẻ mới)',
      onThisPage: 'Nội dung trang này', more: 'Xem thêm', ctaTitle: 'Hỏi chúng tôi về trường hợp của bạn',
      ctaPrice: '$220 mỗi hồ sơ. $385 nếu có việc ABN. Đã gồm GST. Chúng tôi xác nhận giá trước khi bạn thanh toán.', related: 'Bài liên quan',
      allQuestions: 'Tất cả câu hỏi', readFullGuide: 'Đọc toàn bộ hướng dẫn',
      inShort: 'Trả lời nhanh', source: 'Nguồn', yes: 'Có', no: 'Không', minRead: '{n} phút đọc',
      position: 'Bài {i}/{n}', next: 'Bài tiếp theo về {topic}', previous: 'Bài trước',
    },
    questionsPage: {
      title: 'Những ', titleMark: 'câu hỏi', basics: 'Những điều cơ bản',
      metaTitle: 'Câu hỏi về khai thuế cho du học sinh',
      metaDescription: 'Giải đáp những câu du học sinh hay hỏi nhất về khai thuế ở Úc: cư trú thuế, Medicare, giao đồ ăn bằng ABN và tiền super.',
    },
    priceCheck: { yourVisa: 'Visa của bạn', yourWork: 'Công việc của bạn năm nay', perYear: 'mỗi năm', messageWillOpen: 'Tin nhắn soạn sẵn trong WhatsApp: ', send: 'Gửi tin này qua WhatsApp' },
    payslipLegend: 'Ví dụ các dòng trên phiếu lương',
    blog: {
      nav: 'Bài viết', title: 'Chuyện thuế, nói dễ hiểu cho ', titleMark: 'du học sinh',
      lead: 'Trả lời ngắn gọn những câu du học sinh hỏi chúng tôi nhiều nhất, mỗi bài đều được đối chiếu với thông tin của ATO.',
      intro: 'Hướng dẫn thực tế cho du học sinh visa 500 và 485: TFN, làm hai việc và ngưỡng miễn thuế, hoàn thuế, phiếu lương, super và việc ABN như Uber Eats. Viết cho du học sinh, đối chiếu với ATO và Fair Work.',
      statArticles: 'Bài viết', statTopics: 'Chủ đề', statTaxYear: 'Năm thuế', statFree: 'Miễn phí', statFreeNote: 'Không cần đăng ký', all: 'Tất cả bài viết',
      metaTitle: 'Bài viết về thuế cho du học sinh',
      metaDescription: 'Giải đáp rõ ràng về TFN, làm hai việc, tiền hoàn thuế, tiền lương, super và việc ABN cho du học sinh ở Úc, đối chiếu với nguồn chính thức.',
      updated: 'Cập nhật', categories: { TFN: 'TFN', 'Tax return': 'Khai thuế', Deductions: 'Khấu trừ', Super: 'Super', ABN: 'ABN', Work: 'Việc làm', Medicare: 'Medicare và sức khỏe' },
    },
  },
}

/** Fill {name} slots. */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? `{${k}}`)
}
