/**
 * 首页文案（简体中文）。按中文读者的习惯重新写成，不是逐句翻译。
 * 法律表述必须保持原意：
 *   "在注册税务代理人的监督下运营"
 *   "在提交给 ATO 之前，由注册税务代理人审核并签字确认"
 * 税务居民身份一律用"可能"，不承诺退税。
 */
import type { HomeCopy } from './home-en'

export const homeZh: HomeCopy = {
  meta: {
    title: '澳洲留学生报税（退税）：500 和 485 签证',
    description: '为持 500 和 485 签证的留学生办理澳洲报税。每份 $220，有 ABN 工作 $385，均含 GST。在提交给 ATO 之前，由注册税务代理人审核并签字确认。',
  },
  hero: {
    titleBefore: '专为',
    titleMark: '学生签证',
    titleAfter: '持有人办理报税',
    lead: '适用于 500 和 485 签证持有人。全程用 WhatsApp 和一份简短的在线表格完成。在提交给 ATO 之前，由注册税务代理人审核并签字确认。',
    price: { amount: '$220', unit: '每份报税', sub: '有 ABN 工作 $385。均含 GST。' },
    cta: '在 WhatsApp 上开始报税',
  },
  priceCheck: { title: '哪个价格适合我？' },
  guarantee: {
    title: '如果你的退税比我们的费用少，差额我们退给你',
    docketLabel: '示例：费用 $220，退税 $150，我们退还你 $70',
    docket: [
      { label: '我们的费用', value: '$220' },
      { label: '你的退税', value: '$150' },
      { label: '我们退还你', value: '$70', total: true },
    ],
    terms: '差额会在 ATO 发出税务评估通知（notice of assessment）之后支付。如果没有退税，或者你需要补税，则按全额收费。',
    why: '同时向两个雇主申报免税额度，或者用 ABN 送外卖，是留学生最后需要补税的常见原因。',
    cta: '在 WhatsApp 上联系我们',
  },
  flow: {
    title: '从第一条消息到完成提交',
    label: '对话示例，一步一步',
    steps: [
      { from: 'them', text: '你在 WhatsApp 上给我们发消息，我们和你确认价格。' },
      { from: 'us', text: '你通过银行转账付款给 The Accounting Academy，并把转账截图发给我们。' },
      { from: 'them', text: '你填写一份简短的在线表格。' },
      { from: 'us', text: '我们会在大约 24 小时内审核完所有资料，把预估结果发给你。' },
      { from: 'them', text: '你在线签字。' },
      { from: 'us', text: '你的报税就提交给 ATO 了。' },
    ],
    note: '仅为示例，并非真实对话。',
  },
  payslip: {
    title: '一行一行看懂你的工资单',
    lead: '点一下任意一行。这是一张示例工资单，雇主是虚构的。',
  },
  story: {
    title: '只做学生签证',
    lead: 'Student Visa Tax 只为持学生签证和毕业生签证的人办理报税，别的都不做。所以你想问的问题，我们早就很熟悉了。',
    points: [
      '在澳洲读 6 个月或以上的课程，对你的税有什么影响。',
      'Medicare Entitlement Statement：学生保险公司不会寄给你，要你自己申请。',
      '同时打两份零工，为什么最后可能要补税。',
      '用 ABN 跑 Uber Eats 或 DoorDash。',
      '毕业回国之后，你的养老金（super）怎么办。',
    ],
    languages: '可以用 English、中文或 Tiếng Việt 问我们。',
  },
  faq: {
    title: '常见问题',
    items: [
      { q: '我需要报税吗？', a: '如果你在澳洲工作过，工资里也扣过税，一般就需要。如果多扣了税，报税时可以拿回来；有时也会发现你需要补税。' },
      { q: '持学生签证算税务居民吗？', a: '如果你的课程是 6 个月或以上，你可能是税务居民。税务居民每年前 $18,200 的收入免税，来澳或离澳的那一年可能只能享受其中一部分。提交之前，我们会帮你确认。' },
      { q: '我需要交 Medicare 税吗？', a: '如果你是税务居民，并持有海外学生保险（OSHC），通常可以申请免除。你需要一份 Medicare Entitlement Statement，我们会告诉你怎么申请。' },
      { q: '我在送 Uber Eats，有什么不一样吗？', a: '有。ABN 收入没有预扣税，所以要连同你的工作开支一起，按营业收入申报。这种报税是 $385。' },
      { q: '我要离开澳洲了，我的税和养老金怎么办？', a: '你在海外也可以报税；你离开澳洲之后，我们还可以帮你申领养老金（super）。' },
      { q: '我可以自己报，或者找免费帮助吗？', a: '可以。你可以自己用 myTax 在网上报税。如果你的收入大约在 $70,000 或以下，而且报税情况简单，ATO 的 Tax Help 项目和一些大学的咨询处可以免费帮你。留学生来找我们，通常是想让人帮忙确认税务居民身份、Medicare 免除、两份工或者 ABN 外卖收入。' },
    ],
  },
  images: {
    hero: { id: 'IMG-01', subject: 'student on a café shift', alt: '一名留学生系着咖啡店围裙，在柜台后上班' },
    flow: { id: 'IMG-02', subject: 'delivery bike at night', alt: '夜晚的城市街边，停着一辆挂着保温外卖包的自行车' },
  },
}
