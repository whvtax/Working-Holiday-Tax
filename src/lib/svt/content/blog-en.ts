/**
 * Student Visa Tax blog (English). Topic map: docs/content/svt-topic-map.md.
 * Facts checked against the ATO on 26 Oct 2026; each article links its
 * official sources. Same wording rules as the guides (tested).
 *
 * Related entries: a guide slug ('medicare') or a blog slug ('blog/...').
 */
import type { GuideContent } from './guides-en'

export interface ArticleContent extends GuideContent {
  category: 'TFN' | 'Tax return' | 'Super' | 'ABN' | 'Work'
}

const ATO = 'https://www.ato.gov.au'

export const BLOG_EN: readonly ArticleContent[] = [
  {
    slug: 'tfn-declaration-two-jobs',
    category: 'TFN',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Two jobs and the tax-free threshold',
    meta: {
      title: 'Two jobs on a student visa: the tax-free threshold',
      description: 'Claim the tax-free threshold from one employer only. Why two casual jobs often leave students with a tax bill, and how to set up your TFN declaration so it does not.',
    },
    h1: { before: 'Two jobs and ', mark: 'one tax-free threshold' },
    lead: 'A café on weekdays and a warehouse at the weekend is a very normal student year. It is also the most common reason a student has to pay tax at the end of the year. It comes down to one question on a form.',
    sections: [
      {
        id: 'the-form', title: 'The question on your TFN declaration',
        blocks: [
          { p: 'When you start a job, you fill in a tax file number declaration. Two of its questions decide how much tax is taken from every pay:' },
          { list: [
            'Are you an Australian resident for tax purposes?',
            'Do you want to claim the tax-free threshold from this payer?',
          ] },
          { p: 'If you may be a resident (for example, your course is 6 months or longer), the tax-free threshold means no tax on the first $18,200 you earn in the year, or on part of it if you are a resident for only part of the year. Your employer withholds less tax because of it.' },
        ],
      },
      {
        id: 'one-payer', title: 'Claim it from one employer only',
        blocks: [
          { p: 'The ATO says you generally claim the tax-free threshold from one payer: usually the one who pays you the most. For your second job, answer no.' },
          { note: 'If you claim the threshold from more than one employer, each one takes out tax as if you had no other job. Too little tax is taken out in total, and the ATO says you may get a tax bill for the difference when you lodge.' },
        ],
      },
      {
        id: 'already-did', title: 'If you already claimed it twice',
        blocks: [
          { list: [
            'Give the second employer a new declaration that does not claim the threshold. From then on, they withhold at the higher rate.',
            'If you think too little tax is still being taken out, you can ask an employer to withhold more.',
            'Tell us at tax time. We check what was withheld against what you earned before you sign anything.',
          ] },
        ],
      },
    ],
    faq: [
      { q: 'My second job pays more now. Can I switch?', a: 'Yes. Give the new main employer a declaration that claims the threshold, and the other one a declaration that does not.' },
      { q: 'I am a foreign resident for tax purposes. Do I claim the threshold?', a: 'No. Foreign residents do not get the tax-free threshold, so the answer is no for every job.' },
    ],
    sources: [
      { label: 'ATO: Income from more than one job', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-from-more-than-one-job` },
      { label: 'ATO: Paying tax on multiple sources of income', href: `${ATO}/individuals-and-families/jobs-and-employment-types/tax-free-threshold/paying-tax-on-multiple-sources-of-income` },
    ],
    related: ['tax-residency', 'blog/income-statement-tax-ready', 'do-i-need-to-lodge'],
    short: {
      answer: 'If you may be a resident for tax purposes, claim the tax-free threshold from one employer only, usually the one who pays you the most. For every other job, answer no.',
      mark: 'one employer only',
      form: {
        question: 'On each TFN declaration: do you want to claim the tax-free threshold from this payer?',
        rows: [
          { label: 'Main job', sub: 'pays you the most', answer: 'yes' },
          { label: 'Second job', sub: 'and any other job', answer: 'no' },
        ],
      },
    },
  },
  {
    slug: 'apply-for-tfn-student-visa',
    category: 'TFN',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Getting a TFN on a student visa',
    meta: {
      title: 'How to get a TFN on a student visa',
      description: 'Apply online for your tax file number if your visa lets you work and you are in Australia. It is free, needs no documents, and arrives by post within 28 days.',
    },
    h1: { before: 'Getting your ', mark: 'TFN', after: ' on a student visa' },
    lead: 'Your tax file number (TFN) is yours for life. You need it for work, for super and for every tax return. Getting one is free and takes a few minutes online.',
    sections: [
      {
        id: 'who', title: 'Who can apply online',
        blocks: [
          { p: 'The ATO lets you apply online if you hold a valid visa with work rights and you are in Australia. If your visa has a no-work condition, the online form will not accept it.' },
        ],
      },
      {
        id: 'how', title: 'How it works',
        blocks: [
          { list: [
            'Apply on the ATO website with your passport details.',
            'It is free. Never pay a website to apply for you.',
            'You do not send any documents.',
            'Your TFN is posted to the Australian address you give, so use one where you will get your mail.',
          ] },
        ],
      },
      {
        id: 'wait', title: 'How long it takes',
        blocks: [
          { p: 'The ATO says you should receive your TFN within 28 days from when it receives your completed application. Do not apply again in that time. If nothing has arrived after 28 days, contact the ATO with your receipt number.' },
          { p: 'You can start work before it arrives: tell your employer you have applied. If you have not given them your TFN within 28 days, they must take tax out at the top rate plus the Medicare levy.' },
        ],
      },
      {
        id: 'keep-safe', title: 'Keep it safe',
        blocks: [
          { p: 'Give your TFN to your employer, your super fund and whoever does your tax return. Do not post it online or send it to someone you have not checked.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: TFN application for foreign passport holders and temporary visitors', href: `${ATO}/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application` },
      { label: 'ATO: Tax file number and withholding declarations (for employers)', href: `${ATO}/businesses-and-organisations/hiring-and-paying-your-workers/payg-withholding/payments-you-need-to-withhold-from/payments-to-employees/tax-file-number-and-withholding-declarations` },
    ],
    related: ['blog/tfn-declaration-two-jobs', 'how-it-works', 'do-i-need-to-lodge'],
    short: {"answer": "If your visa lets you work and you are in Australia, apply online with the ATO. It is free, needs no documents, and your TFN arrives by post within 28 days.", "mark": "It is free", "facts": [{"figure": "$0", "label": "to apply"}, {"figure": "28 days", "label": "to arrive by post"}]},
  },
  {
    slug: 'how-long-does-a-tax-refund-take',
    category: 'Tax return',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'How long a tax refund takes',
    meta: {
      title: 'How long does a tax refund take in Australia?',
      description: 'The ATO processes most online returns within 12 business days. Paper returns take up to 50 business days. Why a student return can start later, and how to check progress.',
    },
    h1: { before: 'How long does a ', mark: 'tax refund', after: ' take?' },
    lead: 'Once your return is lodged, the ATO does the rest. Most online returns are quick; a few things can make yours slower.',
    sections: [
      {
        id: 'times', title: 'ATO processing times',
        blocks: [
          { list: [
            'Online returns: most are processed within 12 business days.',
            'If a return needs a manual check: up to 30 calendar days.',
            'Paper returns: up to 50 business days, about 10 weeks.',
          ] },
          { p: 'When it is processed, the ATO issues your notice of assessment and pays any refund into the Australian bank account on your return.' },
        ],
      },
      {
        id: 'before', title: 'What comes before lodging',
        blocks: [
          { p: 'For many students the wait starts earlier. We lodge once your income statements are marked "Tax ready", and once your Medicare Entitlement Statement has arrived, if you are claiming the Medicare levy exemption.' },
        ],
      },
      {
        id: 'check', title: 'How to check progress',
        blocks: [
          { list: [
            'In myGov: open the ATO service and choose the tax return for that year.',
            'In the ATO app.',
            'Or ask us on WhatsApp.',
          ] },
          { note: 'Keep your Australian bank account open until any refund arrives, even after you leave.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: How to track the progress of your tax return', href: `${ATO}/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return` },
    ],
    related: ['medicare', 'blog/income-statement-tax-ready', 'how-it-works'],
    short: {"answer": "The ATO processes most online tax returns within 12 business days. One that needs a manual check can take up to 30 calendar days, and paper returns up to 50 business days.", "mark": "12 business days", "facts": [{"figure": "12", "label": "business days, most online returns"}, {"figure": "30", "label": "calendar days with a manual check"}, {"figure": "50", "label": "business days on paper"}]},
  },
  {
    slug: 'low-income-tax-offset-students',
    category: 'Tax return',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'The low income tax offset',
    meta: {
      title: 'Low income tax offset for international students',
      description: 'If you are a resident for tax purposes with a taxable income of $37,500 or less, you can get up to $700 off your tax. Worked out when you lodge, not paid as cash.',
    },
    h1: { before: 'Up to $700 off your tax: ', mark: 'the low income tax offset' },
    lead: 'Many students earn a small income from casual work. If you are a resident for tax purposes, a tax offset reduces what you pay, on top of the tax-free threshold.',
    sections: [
      {
        id: 'who', title: 'Who gets it',
        blocks: [
          { p: 'The ATO says you need to be an Australian resident for tax purposes, pay tax on your taxable income, and have a taxable income below $66,667. Foreign residents do not get it.' },
        ],
      },
      {
        id: 'how-much', title: 'How much',
        blocks: [
          { list: [
            'Taxable income of $37,500 or less: $700.',
            'Between $37,501 and $45,000: $700 minus 5 cents for every dollar above $37,500.',
            'Between $45,001 and $66,667: $325 minus 1.5 cents for every dollar above $45,000.',
          ] },
        ],
      },
      {
        id: 'how-it-works', title: 'How it works',
        blocks: [
          { p: 'You do not apply for it. The ATO works it out when you lodge your tax return.' },
          { note: 'It is not paid to you as money. It only reduces the tax you owe, down to zero, and any unused part is lost.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Low income tax offset', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset` },
    ],
    related: ['tax-residency', 'blog/tfn-declaration-two-jobs', 'pricing'],
    short: {"answer": "For 2025-26, if you are a resident for tax purposes with a taxable income of $37,500 or less, the low income tax offset takes up to $700 off your tax. It is worked out when you lodge, and it is not paid out as cash.", "mark": "up to $700 off your tax", "facts": [{"figure": "$700", "label": "at a taxable income of $37,500 or less"}, {"figure": "$66,667", "label": "taxable income where it ends"}]},
  },
  {
    slug: 'income-statement-tax-ready',
    category: 'Tax return',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Your income statement and "Tax ready"',
    meta: {
      title: 'Income statement not "Tax ready"? When to lodge',
      description: 'Your employer reports your pay, tax and super to the ATO. Employers have until 14 July to finalise it. Lodging before it says "Tax ready" can mean amending your return.',
    },
    h1: { before: 'Your income statement and ', mark: '"Tax ready"' },
    lead: 'You do not get a paper payment summary from most employers any more. Your pay, the tax taken out and your super are reported straight to the ATO, in your income statement.',
    sections: [
      {
        id: 'what', title: 'What it shows',
        blocks: [
          { p: 'Your income statement shows, for each employer, your salary and wages for the year, the tax withheld and your super. Employers send this to the ATO through a system called Single Touch Payroll.' },
        ],
      },
      {
        id: 'tax-ready', title: 'Why we wait for "Tax ready"',
        blocks: [
          { p: 'The ATO says most employers have until 14 July to finalise their data. When they do, your income statement is marked "Tax ready", and the ATO sends a message to your myGov inbox when all your statements are ready.' },
          { note: 'The ATO says that if you lodge before the statement is "Tax ready", you may have to amend your tax return. With two or three employers, one late employer is enough.' },
        ],
      },
      {
        id: 'see-it', title: 'Where to see it',
        blocks: [
          { list: [
            'In myGov: ATO, then Employment, then Income statement.',
            'In the ATO app, under Employment.',
            'You do not need to send us screenshots of it.',
          ] },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Access your income statement', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/access-your-income-statement` },
    ],
    related: ['blog/how-long-does-a-tax-refund-take', 'blog/amend-tax-return', 'blog/tax-return-deadline-31-october'],
    short: {"answer": "Wait until every income statement in myGov says \"Tax ready\" before you lodge. Employers have until 14 July to finalise them, and lodging earlier may mean amending your return.", "mark": "\"Tax ready\""},
  },
  // ── Batch 2 (26 Oct): ABN, contractors, deductions, leaving ──────────────
  {
    slug: 'what-is-an-abn-students',
    category: 'ABN',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Do students need an ABN?',
    meta: {
      title: 'What is an ABN, and do students need one?',
      description: 'An ABN is for running your own business, such as food delivery. It is not for a normal job. When a student needs one, how to apply for free, and what changes at tax time.',
    },
    h1: { before: 'What is an ', mark: 'ABN', after: ', and do you need one?' },
    lead: 'An Australian business number (ABN) is for working for yourself. Most student jobs are not that. Food delivery and some freelance work usually are.',
    sections: [
      {
        id: 'what', title: 'What an ABN is for',
        blocks: [
          { p: 'The Australian Business Register says you are entitled to an ABN if you run, or are starting, a business in Australia (the law calls it an enterprise). Delivering for an app, tutoring privately or freelancing for several clients can be that.' },
          { p: 'You are not entitled to an ABN for work you do as an employee, even if the business calls it contracting. An employer should not ask you to get an ABN as a condition of a job.' },
        ],
      },
      {
        id: 'apply', title: 'Getting one',
        blocks: [
          { list: [
            'Apply online with the Australian Business Register. It is free.',
            'You need your tax file number (TFN) to apply.',
            'Only apply if you are actually entitled: the register warns that a false application can lead to prosecution.',
          ] },
          { p: 'You keep your TFN. The ABN is an extra number for your business work; your jobs still use your TFN.' },
        ],
      },
      {
        id: 'tax-time', title: 'What changes at tax time',
        blocks: [
          { p: 'Nobody takes tax out of ABN income. It goes on your tax return as business income, your work costs come off it, and tax is worked out on the rest together with your wages.' },
          { note: 'This is why students with ABN work can owe tax at the end of the year. Putting some money aside from each payment helps.' },
        ],
      },
    ],
    faq: [
      { q: 'Can I have a job and an ABN at the same time?', a: 'Yes. Your job pays you as an employee, with tax taken out. The ABN covers only the work you do for yourself.' },
      { q: 'Does an ABN change what work my visa allows?', a: 'Your visa conditions are set by the Department of Home Affairs, not the tax system. Check them there; an ABN does not change them.' },
    ],
    sources: [
      { label: 'Australian Business Register: ABN entitlement', href: 'https://www.abr.gov.au/business-super-funds-charities/applying-abn/abn-entitlement' },
      { label: 'ATO Community: Your guide to getting an ABN', href: 'https://community.ato.gov.au/s/article/a07RF00000RWlGGYA1/your-guide-to-getting-an-abn' },
    ],
    related: ['abn-delivery', 'blog/employee-or-contractor', 'pricing'],
    short: {"answer": "An ABN is for working for yourself, such as delivering for an app. It is not for a job as an employee. Applying is free, and ABN income has no tax taken out.", "mark": "not for a job as an employee"},
  },
  {
    slug: 'employee-or-contractor',
    category: 'Work',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Employee or contractor?',
    meta: {
      title: 'Employee or contractor? What students should check',
      description: 'An ABN or a contract that says "contractor" does not make you one. How to tell if you are really an employee, and why it matters for your tax and super.',
    },
    h1: { before: 'Employee or ', mark: 'contractor', after: '?' },
    lead: 'Some businesses ask new staff for an ABN. That does not decide whether you are a contractor. The way you actually work does.',
    sections: [
      {
        id: 'difference', title: 'The difference',
        blocks: [
          { p: 'Business.gov.au puts it simply: employees work in someone else\'s business, and the business controls how, where and when they work. Contractors run their own business.' },
          { list: [
            'Contractors often use their own tools and methods.',
            'They may negotiate their own fees.',
            'They can work for more than one client.',
          ] },
          { p: 'No single sign decides it; several are weighed together.' },
        ],
      },
      {
        id: 'myths', title: 'What does not make you a contractor',
        blocks: [
          { list: [
            'Having an ABN.',
            'A contract that calls you a contractor.',
            'Short-term or casual work.',
            '"Everyone in this industry is a contractor."',
          ] },
          { p: 'The ATO says the terms of your real working arrangement decide it. A business cannot simply choose to treat an employee as a contractor.' },
        ],
      },
      {
        id: 'why', title: 'Why it matters',
        blocks: [
          { p: 'As an employee, your employer takes tax out of your pay and pays super for you. As a contractor, you handle your own tax. If a business treats an employee as a contractor, the ATO says the business can face penalties.' },
          { note: 'Telling an employee they are a contractor is called sham contracting, and it is illegal. If you think it is happening to you, the Fair Work Ombudsman can help.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Common myths about being a contractor', href: `${ATO}/individuals-and-families/jobs-and-employment-types/employee-or-independent-contractor-what-s-the-difference/common-myths-about-being-a-contractor` },
      { label: 'business.gov.au: Employee or contractor?', href: 'https://business.gov.au/People/Contractors/Employee-or-contractor' },
    ],
    related: ['blog/what-is-an-abn-students', 'superannuation', 'abn-delivery'],
    short: {"answer": "An ABN, or a contract that says \"contractor\", does not make you one. What decides it is how you actually work: employees work in someone else's business, which controls how, where and when they work.", "mark": "how you actually work"},
  },
  {
    slug: 'work-deductions-students',
    category: 'Tax return',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Work deductions for students',
    meta: {
      title: 'Work deductions for international students',
      description: 'What a student with a casual job can usually claim: tools, protective clothing and uniforms, laundry. What you cannot, including your course fees in most cases.',
    },
    h1: { before: 'What you can claim from ', mark: 'your job' },
    lead: 'Deductions lower the income you pay tax on. For a casual job they are usually small, but they are worth getting right, and some common claims are not allowed.',
    sections: [
      {
        id: 'rules', title: 'Three rules for every claim',
        blocks: [
          { list: [
            'You spent the money yourself and were not paid back.',
            'It directly relates to earning your income.',
            'You have a record, usually a receipt.',
          ] },
        ],
      },
      {
        id: 'tools', title: 'Tools and equipment',
        blocks: [
          { p: 'An item for work that cost $300 or less, and is not part of a set costing more than $300, can be claimed in the year you buy it. Above $300, it is claimed bit by bit over the years it lasts (its effective life). If you also use it privately, only the work part counts.' },
        ],
      },
      {
        id: 'clothing', title: 'Clothing and laundry',
        blocks: [
          { p: 'You can claim protective clothing, a compulsory uniform that identifies your employer, a registered non-compulsory uniform, and clothing specific to an occupation, like a chef\'s chequered pants.' },
          { note: 'Ordinary clothes are not claimable, even if your employer requires them. The ATO\'s own example: a bartender\'s black trousers and white shirt.' },
          { p: 'Washing claimable work clothes at home can be claimed at $1 a load, or 50 cents if the load is mixed with personal clothes. For 2025-26 and earlier, you need written evidence only if your work claims are over $300 and laundry is over $150. From 2026-27, the $150 laundry exception ends: the ATO says if you claim more than your standard deduction, you need written evidence for all your work-related expenses. For laundry worked out at $1 or 50 cents a load, that means a record of how many loads you washed. Also from 2026-27, residents with wage income automatically get a standard deduction of up to $1,000 without receipts, and any work costs you claim reduce it dollar for dollar.' },
        ],
      },
      {
        id: 'course', title: 'Your course fees',
        blocks: [
          { p: 'Study is only claimable when it has a close enough connection to the job you have now: it keeps up or improves the skills that job needs, or is likely to increase your income from it.' },
          { p: 'A degree that gets you into a new career is not claimable, and neither is study while you are not working. For most international students, course fees are not a deduction.' },
        ],
      },
    ],
    faq: [
      { q: 'Can I claim my phone?', a: 'Only the work part, and only if you use it for work. Tell us how you use it and we check what is reasonable.' },
    ],
    sources: [
      { label: 'ATO: Deductions for work expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/guides-for-occupations-and-industries/a-d/bus-drivers-income-and-work-related-deductions/deductions-for-work-expenses` },
      { label: 'ATO: Tools and equipment to perform your work', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/tools-computers-and-items-you-use-for-work/tools-and-equipment-to-perform-your-work` },
      { label: 'ATO: Clothing, laundry and dry-cleaning expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/clothes-and-items-you-wear-at-work/clothing-laundry-and-dry-cleaning-expenses` },
      { label: 'ATO: Self-education expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/education-training-and-seminars/self-education-expenses` },
      { label: 'ATO: Standard deduction for work-related expenses', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/work-related-deductions/standard-deduction-for-work-related-expenses` },
    ],
    related: ['abn-delivery', 'pricing', 'blog/low-income-tax-offset-students'],
    short: {"answer": "You can claim costs you paid yourself that directly relate to your job, with a record: tools, protective clothing, a compulsory uniform. Ordinary clothes are not claimable, and for most students neither are course fees.", "mark": "directly relate to your job", "facts": [{"figure": "$300", "label": "or less: claim a tool in the year you buy it"}]},
  },
  {
    slug: 'cancel-abn-before-leaving',
    category: 'ABN',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Cancelling your ABN',
    meta: {
      title: 'Cancel your ABN before you leave Australia',
      description: 'When your ABN work stops, cancel the ABN within 28 days. What cancelling does and does not do, and why your last tax return still has to include the business income.',
    },
    h1: { before: 'Stopped delivering? ', mark: 'Cancel your ABN' },
    lead: 'When you finish your course and stop your ABN work, do not leave the ABN open. Cancelling it is quick, but it does not close everything.',
    sections: [
      {
        id: 'when', title: 'When to cancel',
        blocks: [
          { p: 'Cancel your ABN when your business stops trading, for example when you stop delivering and leave Australia. The Australian Business Register says that if your business has stopped, you must cancel or update the ABN within 28 days.' },
        ],
      },
      {
        id: 'how', title: 'How',
        blocks: [
          { list: [
            'Online, using myID (the government\'s digital ID app), once myID is linked to your ABN in Relationship Authorisation Manager (RAM).',
            'Or a tax professional can cancel it for you.',
          ] },
          { p: 'Most registrations linked to the ABN, such as GST, are cancelled with it.' },
        ],
      },
      {
        id: 'still', title: 'What cancelling does not do',
        blocks: [
          { p: 'You still have to lodge your final tax return, with the business income from that year on it, and any activity statements that are due. Keep your records for 5 years from the day you lodge.' },
          { note: 'If you come back later and work for yourself again in the same way, you reapply and get the same ABN.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Cancelling business registrations', href: `${ATO}/businesses-and-organisations/starting-registering-or-closing-a-business/changing-selling-or-closing-your-business/cancelling-business-registrations` },
      { label: 'Australian Business Register: When should you cancel your ABN', href: 'https://abr.gov.au/media-centre/featured-news/business-super-funds-charities/when-should-you-cancel-your-abn' },
    ],
    related: ['leaving-australia', 'blog/lodge-from-overseas', 'abn-delivery'],
    short: {"answer": "When your ABN work stops, cancel the ABN within 28 days. You still have to lodge your final tax return with that year's business income.", "mark": "within 28 days"},
  },
  {
    slug: 'lodge-from-overseas',
    category: 'Tax return',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Lodging from overseas',
    meta: {
      title: 'Lodging your Australian tax return from overseas',
      description: 'Gone home before tax time? You can still lodge your Australian return online, or have it lodged for you. What to keep set up before you leave.',
    },
    h1: { before: 'Lodging your tax return ', mark: 'from overseas' },
    lead: 'Many students finish their course mid-year and fly home before tax time. Your Australian return can still be lodged from wherever you are.',
    sections: [
      {
        id: 'ways', title: 'Ways to lodge',
        blocks: [
          { list: [
            'Online yourself, with myTax through myGov.',
            'Through a service that lodges for you. Ours operates under the supervision of a registered tax agent.',
            'On paper, which is slower.',
          ] },
        ],
      },
      {
        id: 'set-up', title: 'Keep these set up',
        blocks: [
          { list: [
            'Your myGov sign-in: the ATO says to update your sign-in settings so you can use it from overseas.',
            'An Australian bank account, to receive any refund.',
            'An email address and phone number you will still use, so we and the ATO can reach you.',
          ] },
        ],
      },
      {
        id: 'when', title: 'When',
        blocks: [
          { p: 'The normal lodging period is 1 July to 31 October. Registered tax agents have a lodgment program that can allow a later date for their clients, as long as the agent is contacted before 31 October.' },
        ],
      },
    ],
    faq: [
      { q: 'Does it work the same with you if I have left?', a: 'Yes. We work with you on WhatsApp wherever you are, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.' },
    ],
    sources: [
      { label: 'ATO: Lodge your tax return from outside Australia', href: `${ATO}/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia` },
      { label: 'ATO: Due dates in the agent lodgment program', href: `${ATO}/tax-and-super-professionals/for-tax-professionals/prepare-and-lodge/registered-agent-lodgment-program-2025-26/due-dates-for-tax-returns-by-client-type/individuals-and-trusts` },
    ],
    related: ['leaving-australia', 'superannuation', 'blog/cancel-abn-before-leaving'],
    short: {"answer": "You can lodge your Australian return from overseas, online through myGov or through a service that lodges for you. Keep your myGov sign-in working and an Australian bank account open.", "mark": "from overseas"},
  },
  // ── Batch 3 (26 Oct): super ──────────────────────────────────────────────
  {
    slug: 'how-much-super-employer-pays',
    category: 'Super',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Super on a student visa',
    meta: {
      title: 'Super on a student visa: what your employer pays',
      description: 'Casual and part-time students on a temporary visa generally get super too. The 12% rate, the rule for under 18s, and the new Payday Super timing from 1 July 2026.',
    },
    h1: { before: 'Your employer pays ', mark: 'super', after: ' too' },
    lead: 'Super is money your employer pays into a retirement fund for you, on top of your wages. A student visa does not change that, and you can claim it back after you leave.',
    sections: [
      {
        id: 'who', title: 'Who gets it',
        blocks: [
          { p: 'The ATO says that generally all employees are eligible: full-time, part-time or casual, including temporary residents. That covers students.' },
          { list: [
            'If you are under 18, you get super only for weeks when you work more than 30 hours.',
            'If you work on an ABN but are paid mainly for your labour, you may still be eligible.',
          ] },
        ],
      },
      {
        id: 'rate', title: 'How much',
        blocks: [
          { p: 'The super guarantee rate is 12%. It is paid on top of your wages, not taken out of them.' },
        ],
      },
      {
        id: 'payday', title: 'When: Payday Super',
        blocks: [
          { p: 'From 1 July 2026, employers have to pay super at the same time as your wages, and it must reach your fund within 7 business days. For a new employee, the first payment can take up to 20 business days.' },
          { note: 'This makes it much easier to check: each pay should be followed by a super payment within about a week and a half.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
      { label: 'Fair Work Ombudsman: Payday Super', href: 'https://www.fairwork.gov.au/newsroom/news/payday-super-new-rules-starting-1-july-2026' },
    ],
    related: ['blog/employer-not-paying-super', 'superannuation', 'blog/find-and-check-your-super'],
    short: {"answer": "Casual, part-time and full-time employees, including students on temporary visas, generally get super at 12% on top of their wages. Since 1 July 2026 it must generally reach your fund within 7 business days of payday.", "mark": "12% on top of their wages", "facts": [{"figure": "12%", "label": "super guarantee rate"}, {"figure": "7", "label": "business days for it to reach your fund"}]},
  },
  {
    slug: 'find-and-check-your-super',
    category: 'Super',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Find and check your super',
    meta: {
      title: 'How to find and check your super as a student',
      description: 'Every new job can open a new super account. How to see all your accounts and what your employers paid in myGov, and what to check before you combine them.',
    },
    h1: { before: 'Find and check ', mark: 'your super' },
    lead: 'Three casual jobs can mean three super accounts. It is worth knowing where your super is before you leave, and much easier to check while you are still here.',
    sections: [
      {
        id: 'see', title: 'See it in myGov',
        blocks: [
          { p: 'In ATO online services, through myGov, you can:' },
          { list: [
            'See the super accounts the ATO knows about, including lost ones.',
            'See super held by the ATO (unclaimed super).',
            'See the super payments your employers reported.',
          ] },
          { p: 'Go to Super, then Fund details. Look at the "as at" date next to each balance: your fund may have a newer statement.' },
        ],
      },
      {
        id: 'missing', title: 'If an account is missing',
        blocks: [
          { p: 'Some accounts may not show, for example if the fund has not reported them yet or your details did not match. Your fund\'s member statement, or a call to the fund, will confirm it.' },
        ],
      },
      {
        id: 'combine', title: 'Combining accounts',
        blocks: [
          { p: 'You can move whole accounts into one in ATO online services: Super, then Manage, then Transfer super. Before you do:' },
          { list: [
            'Check insurance: the fund you leave may cover you for death, illness or injury.',
            'Check fees: the old fund may charge exit fees, and the new one entry fees.',
            'Tell your employer the fund you want: moving money does not change where they pay.',
          ] },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Keeping track of your super online', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/keeping-track-of-your-super-online` },
      { label: 'ATO: Transferring or consolidating your super', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/transferring-or-consolidating-your-super` },
    ],
    related: ['superannuation', 'blog/dasp-documents-and-timing', 'blog/how-much-super-employer-pays'],
    short: {"answer": "In myGov, ATO online services show your super accounts, super held by the ATO and what your employers paid. Check insurance and fees before you combine accounts.", "mark": "Check insurance and fees"},
  },
  {
    slug: 'employer-not-paying-super',
    category: 'Super',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Employer not paying super',
    meta: {
      title: 'Your employer is not paying your super: what to do',
      description: 'How to check whether your employer paid your super, how to ask, and how to report unpaid super to the ATO, even as a temporary visa holder.',
    },
    h1: { before: 'When your employer ', mark: 'does not pay super' },
    lead: 'If super is missing from your fund, it is easy to check, and there is an official way to report it.',
    sections: [
      {
        id: 'check', title: 'Check first',
        blocks: [
          { list: [
            'Look at your super fund\'s statements, or call the fund.',
            'In ATO online services through myGov, see the super payments your employer reported.',
            'Since 1 July 2026, super should reach your fund within 7 business days of each payday, or 20 for a new employee\'s first payment.',
          ] },
        ],
      },
      {
        id: 'ask', title: 'Ask your employer',
        blocks: [
          { p: 'If you feel comfortable, ask them when they last paid, which fund they pay into and how much. It may be going to an account you did not know about.' },
        ],
      },
      {
        id: 'report', title: 'Report it to the ATO',
        blocks: [
          { p: 'The ATO has an online tool to report unpaid super. Anyone can use it. You need your personal details, including your TFN, the period you are concerned about, and your employer\'s ABN.' },
          { p: 'The ATO confirms it has received your report, and tells you by letter or email if it can collect the super and pay it to your fund. This can take time, and not every report ends with the super being collected.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Report unpaid super contributions from my employer', href: `${ATO}/calculators-and-tools/super-report-unpaid-super-contributions-from-my-employer` },
      { label: 'ATO: Work out if you have to pay super', href: `${ATO}/businesses-and-organisations/super-for-employers/work-out-if-you-have-to-pay-super` },
    ],
    related: ['blog/how-much-super-employer-pays', 'blog/find-and-check-your-super', 'blog/employee-or-contractor'],
    short: {"answer": "Check your fund statements or myGov first, then ask your employer. If super is still missing, report it with the ATO's online tool: anyone can use it.", "mark": "report it with the ATO's online tool"},
  },
  {
    slug: 'dasp-documents-and-timing',
    category: 'Super',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'DASP: what you need',
    meta: {
      title: 'DASP application: documents and processing time',
      description: 'What the ATO asks for in a DASP application, why it cannot be submitted while your visa is still active, how long it takes, and what happens to super left unclaimed.',
    },
    h1: { before: 'Claiming your super: ', mark: 'what you need' },
    lead: 'You claim your super back with a departing Australia superannuation payment (DASP), after you have left and your visa has ended. The application itself is short if you have the details ready.',
    sections: [
      {
        id: 'need', title: 'What the application asks for',
        blocks: [
          { list: [
            'Your name, date of birth and email address.',
            'Your passport country and number.',
            'Your super fund details, including the fund\'s ABN, and your member number if you have it.',
            'Your TFN, which is optional.',
          ] },
          { p: 'Write these down before you fly. The ATO\'s online application is free.' },
        ],
      },
      {
        id: 'visa', title: 'Your visa must have ended',
        blocks: [
          { p: 'You can start the application before you leave. You can only submit it once you have left Australia and no longer hold an active visa. To check your visa status, use VEVO, the online visa check from the Department of Home Affairs.' },
        ],
      },
      {
        id: 'time', title: 'How long it takes',
        blocks: [
          { p: 'The ATO says the online application takes about 30 minutes, and its service standard for processing a DASP is 28 days from a complete application.' },
        ],
      },
      {
        id: 'unclaimed', title: 'If you do not claim it',
        blocks: [
          { p: 'Six months after you have left, once your visa has ended, your fund transfers the super to the ATO. It is not lost: you may still be able to claim it from the ATO as a DASP.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Help with the DASP online application system', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system` },
      { label: 'ATO: Departing Australia superannuation payment', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
    ],
    related: ['superannuation', 'leaving-australia', 'blog/find-and-check-your-super'],
    short: {"answer": "Claim your super as a DASP once you have left Australia and your visa has ended. Have your passport and fund details ready; the ATO's service standard is 28 days.", "mark": "once you have left Australia and your visa has ended", "facts": [{"figure": "$0", "label": "to apply online with the ATO"}, {"figure": "28 days", "label": "ATO service standard"}]},
  },
  // ── Batch 4 (26 Oct): pay and work rights ────────────────────────────────
  {
    slug: 'payslip-what-to-check',
    category: 'Work',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Reading your payslip',
    meta: {
      title: 'Your payslip: what it must show and what to check',
      description: 'Your employer must give you a payslip within 1 working day of payday. What it has to show, including your hourly rate and super, and what to check each time.',
    },
    h1: { before: 'Reading ', mark: 'your payslip' },
    lead: 'Your payslip is the easiest way to spot a problem with your pay, your tax or your super. It only takes a minute to check.',
    sections: [
      {
        id: 'when', title: 'When you get it',
        blocks: [
          { p: 'Fair Work says your employer must give you a payslip within 1 working day of payday, on paper or electronically.' },
        ],
      },
      {
        id: 'shows', title: 'What it must show',
        blocks: [
          { list: [
            'Your name, your employer\'s name, and their ABN if they have one.',
            'The pay period and the date you were paid.',
            'Your pay before and after tax (gross and net).',
            'Your hourly rate and the hours you worked at it.',
            'Any loadings, allowances or penalty rates.',
            'Each deduction, including the tax taken out.',
            'Your super, and the fund it was paid into.',
          ] },
        ],
      },
      {
        id: 'check', title: 'What to check',
        blocks: [
          { list: [
            'The hours match the hours you actually worked.',
            'Tax is being taken out, if you expect it to be.',
            'Super is listed, and later shows up in your fund.',
          ] },
          { note: 'An employer must not give you a payslip they know is false or misleading. Keep your payslips: they help at tax time and if there is ever a problem with your pay.' },
        ],
      },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Pay slips', href: 'https://www.fairwork.gov.au/pay-and-wages/paying-wages/pay-slips' },
    ],
    related: ['blog/employer-not-paying-super', 'blog/underpaid-student-visa', 'blog/minimum-wage-students'],
    short: {"answer": "Your employer must give you a payslip within 1 working day of payday. Check your hours, your hourly rate, the tax taken out and your super each time.", "mark": "within 1 working day"},
  },
  {
    slug: 'unpaid-trial-shifts',
    category: 'Work',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Unpaid trial shifts',
    meta: {
      title: 'Unpaid trial shifts: when they are allowed',
      description: 'A trial can only be unpaid if it is a short demonstration of your skills, under direct supervision. When a "trial" becomes work that must be paid.',
    },
    h1: { before: 'Is your trial shift ', mark: 'allowed to be unpaid', after: '?' },
    lead: 'Many cafés and restaurants ask for a trial before they hire. Some trials can be unpaid; others must be paid.',
    sections: [
      {
        id: 'allowed', title: 'When a trial can be unpaid',
        blocks: [
          { p: 'Fair Work says an unpaid trial is lawful only when all of these are true:' },
          { list: [
            'It is only a demonstration of the skills the job needs.',
            'It lasts no longer than needed to show those skills: from an hour up to one shift, depending on the job.',
            'You are under direct supervision the whole time.',
          ] },
        ],
      },
      {
        id: 'not', title: 'When it must be paid',
        blocks: [
          { p: 'A trial must be paid if it is more than a demonstration of your skills, if you are not under direct supervision, or if it lasts longer than needed. Then it is not a lawful unpaid trial, and the time must be paid at least at the minimum rate.' },
          { note: 'An employer who wants to see more of your work can hire you as a casual or on probation instead, and pay you.' },
        ],
      },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Unpaid trials', href: 'https://www.fairwork.gov.au/starting-employment/unpaid-work/unpaid-trials' },
    ],
    related: ['blog/underpaid-student-visa', 'blog/payslip-what-to-check', 'blog/employee-or-contractor'],
    short: {"answer": "A trial can be unpaid only if it is a short demonstration of your skills, under direct supervision, no longer than needed. Anything more must be paid at least the minimum rate.", "mark": "under direct supervision"},
  },
  {
    slug: 'underpaid-student-visa',
    category: 'Work',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Underpaid on a student visa',
    meta: {
      title: 'Underpaid on a student visa? Your rights and where to go',
      description: 'Visa holders have the same workplace rights as everyone else. Fair Work says your visa will not be cancelled for asking it for help. Who to call, in your language.',
    },
    h1: { before: 'Underpaid? ', mark: 'You have the same rights' },
    lead: 'Some students worry that complaining about pay could put their visa at risk. Here is what the Fair Work Ombudsman says.',
    sections: [
      {
        id: 'rights', title: 'Same rights as everyone',
        blocks: [
          { p: 'Fair Work says visa holders and migrant workers have the same workplace rights and protections as all other employees in Australia. That includes minimum pay and payslips.' },
        ],
      },
      {
        id: 'visa', title: 'Your visa',
        blocks: [
          { p: 'Fair Work says your visa will not be cancelled for contacting it for help, and that you can get help with your minimum entitlements even if you have breached a visa condition.' },
          { note: 'Fair Work also notes there may still be consequences under the Migration Act. Visa conditions are a matter for the Department of Home Affairs, not us.' },
        ],
      },
      {
        id: 'help', title: 'Getting help',
        blocks: [
          { list: [
            'Call the Fair Work Ombudsman on 13 13 94.',
            'For a free interpreter, call 13 14 50 first.',
            'You can also report a problem anonymously online.',
          ] },
        ],
      },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Visa holders and migrants', href: 'https://www.fairwork.gov.au/find-help-for/visa-holders-migrants' },
    ],
    related: ['blog/payslip-what-to-check', 'blog/unpaid-trial-shifts', 'blog/employer-not-paying-super'],
    short: {"answer": "Visa holders have the same workplace rights as everyone else. Fair Work says your visa will not be cancelled for asking it for help.", "mark": "the same workplace rights", "facts": [{"figure": "13 13 94", "label": "Fair Work Ombudsman"}, {"figure": "13 14 50", "label": "free interpreter, call first"}]},
  },
  {
    slug: 'cash-in-hand-and-tips',
    category: 'Tax return',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Cash pay and tips',
    meta: {
      title: 'Cash in hand and tips: do students declare them?',
      description: 'Yes. The ATO says cash income must be declared, and tips are income too. Why cash jobs can leave you owing tax, and what to keep a record of.',
    },
    h1: { before: 'Cash in hand and ', mark: 'tips' },
    lead: 'Being paid in cash does not make the money tax-free. Neither does a tip jar.',
    sections: [
      {
        id: 'cash', title: 'Cash is income',
        blocks: [
          { p: 'The ATO says that if you receive income as cash, you must declare it in your tax return. It does not matter that it never went through your bank account.' },
        ],
      },
      {
        id: 'tips', title: 'Tips are income too',
        blocks: [
          { p: 'The ATO lists tips, gratuities and other payments for your services as income you must declare.' },
        ],
      },
      {
        id: 'records', title: 'Keep a record',
        blocks: [
          { list: [
            'Write down the dates, hours and amounts each time you are paid in cash.',
            'Keep any payslip or message from the employer about your pay.',
            'Note tips you receive as well.',
          ] },
          { note: 'If no tax was taken out of cash pay, it can mean tax to pay when you lodge. Telling us early means fewer surprises.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Assessable income', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/income-you-must-declare/taxable-assessable-and-exempt-income` },
    ],
    related: ['blog/payslip-what-to-check', 'do-i-need-to-lodge', 'pricing'],
    short: {"answer": "Yes. Cash pay and tips are income, and the ATO says you must declare them. Keep a record of the dates, hours and amounts.", "mark": "you must declare them"},
  },
  // ── Batch 5 (26 Oct): after lodging ──────────────────────────────────────
  {
    slug: 'amend-tax-return',
    category: 'Tax return',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Fixing a lodged return',
    meta: {
      title: 'Made a mistake on your tax return? How to amend it',
      description: 'Forgot an income statement or a second job? Individuals generally have 2 years from the notice of assessment to amend a tax return. How it works.',
    },
    h1: { before: 'Fixing a return ', mark: 'after it is lodged' },
    lead: 'A late income statement, a second job you forgot, a deduction you missed: a lodged return can be corrected. It is called an amendment.',
    sections: [
      {
        id: 'when', title: 'How long you have',
        blocks: [
          { p: 'The ATO says individuals generally have 2 years to amend, starting the day after your notice of assessment is sent. From the 2024-25 year, sole traders, such as students with ABN delivery work, have 4 years. You can request more than one amendment in that time.' },
        ],
      },
      {
        id: 'how', title: 'How',
        blocks: [
          { list: [
            'If you lodged it yourself in myTax: go to Income tax history and choose Amend for that year.',
            'If we lodged it: message us on WhatsApp and we prepare the amendment with you.',
          ] },
        ],
      },
      {
        id: 'common', title: 'Common reasons for students',
        blocks: [
          { list: [
            'The return was lodged before an income statement was "Tax ready".',
            'A job, or ABN income, was left out.',
            'A deduction was missed, or claimed when it should not have been.',
          ] },
          { note: 'An amendment can increase or reduce your tax. It is always better to correct a mistake yourself than to wait for the ATO to find it.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Time limits on amendments', href: `${ATO}/individuals-and-families/your-tax-return/amend-your-tax-return/time-limits-on-amendments` },
      { label: 'ATO: Request an amendment (myTax)', href: `${ATO}/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/supporting-documents-for-my-tax/request-an-amendment` },
    ],
    related: ['blog/income-statement-tax-ready', 'past-years', 'blog/tfn-declaration-two-jobs'],
    short: {"answer": "A lodged return can be fixed: individuals generally have 2 years from the notice of assessment to amend it. In myTax, go to Income tax history and choose Amend.", "mark": "2 years"},
  },
  {
    slug: 'tax-return-deadline-31-october',
    category: 'Tax return',
    published: '2026-10-27', updated: '2026-10-27',
    label: 'The 31 October deadline',
    meta: {
      title: 'Tax return deadline 2026 for students: 31 October',
      description: 'Lodging your own 2025-26 return? The deadline is 11:59 pm on 31 October 2026. With a tax agent, 31 October is still the key date.',
    },
    h1: { before: 'The tax deadline is ', mark: '31 October 2026' },
    lead: 'Your 2025-26 return covers 1 July 2025 to 30 June 2026. If you lodge it yourself, it is due by 31 October 2026. Here is what the date means for you, and what happens if you miss it.',
    sections: [
      {
        id: 'when', title: 'When is my return due?',
        blocks: [
          { p: 'The ATO says people lodging their own return have until 11:59 pm local time on 31 October 2026.' },
          { p: 'The date is the same if you have already finished your course and gone home.' },
        ],
      },
      {
        id: 'agent', title: 'Is it later with a tax agent?',
        blocks: [
          { p: 'Registered tax agents have a lodgment program that usually lets them lodge for their clients after 31 October.' },
          { list: [
            'To use the later date, you need to be on the agent\'s client list by 31 October.',
            'If an earlier year was still not lodged on 30 June 2026, your return is due on 31 October, even with a tax agent.',
          ] },
        ],
      },
      {
        id: 'missed', title: 'What if I miss it?',
        blocks: [
          { p: 'Lodge as soon as you can. The ATO\'s failure to lodge penalty can reach $1,820, but the ATO says it generally does not apply it to an isolated late return, and it warns you first.' },
          { p: 'If you are owed a refund, lodging late does not cancel it. It only means you wait longer for your own money.' },
        ],
      },
      {
        id: 'check', title: 'Check before you lodge',
        blocks: [
          { list: [
            'Every income statement in myGov says "Tax ready".',
            'If you want the Medicare levy exemption, you have your Medicare Entitlement Statement.',
            'You know whether you may be a resident for tax purposes for the year.',
          ] },
          { note: 'A return lodged in a rush with one of these wrong has to be amended later, which takes longer than getting it right the first time.' },
        ],
      },
    ],
    faq: [
      { q: 'I only worked a few months. Do I still need to lodge?', a: 'Usually yes, if tax was taken from your pay or you had ABN income. Each financial year is its own return.' },
      { q: 'I already left Australia. Does the date change?', a: 'No. The due date is the same wherever you are. Keep your Australian bank account open until any refund is paid.' },
    ],
    sources: [
      { label: 'ATO: The final countdown, ATO reminds taxpayers to lodge now (19 Oct 2026)', href: `${ATO}/media-centre/the-final-countdown-ato-reminds-taxpayers-to-lodge-now` },
      { label: 'ATO: Due dates in the agent lodgment program', href: `${ATO}/tax-and-super-professionals/for-tax-professionals/prepare-and-lodge/registered-agent-lodgment-program-2025-26/due-dates-for-tax-returns-by-client-type/individuals-and-trusts` },
      { label: 'ATO: Failure to lodge on time penalty', href: `${ATO}/individuals-and-families/paying-the-ato/interest-and-penalties/penalties/failure-to-lodge-on-time-penalty` },
    ],
    related: ['blog/late-lodgment', 'blog/income-statement-tax-ready', 'pricing'],
    short: {"answer": "If you lodge your own 2025-26 return, it is due by 11:59 pm local time on 31 October 2026. To use a tax agent's later date, you need to be on their client list by 31 October.", "mark": "31 October 2026", "facts": [{"figure": "11:59 pm", "label": "local time, 31 October, for your own return"}, {"figure": "$1,820", "label": "the most the late lodgment penalty can reach"}]},
  },
  {
    slug: 'late-lodgment',
    category: 'Tax return',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Lodging late',
    meta: {
      title: 'Late tax return penalty: what the ATO does',
      description: 'How the ATO late-lodgment penalty works, why it is generally not applied in an isolated case, and why lodging as soon as you can is still the best move.',
    },
    h1: { before: 'Missed the deadline? ', mark: 'Lodge as soon as you can' },
    lead: 'A busy semester, exams, a trip home: it is easy to miss 31 October. You can still lodge, and it is better to do it soon.',
    sections: [
      {
        id: 'penalty', title: 'The penalty',
        blocks: [
          { p: 'The ATO\'s failure to lodge on time penalty is one penalty unit (a fixed dollar amount set by law) for every 28 days, or part of 28 days, a return is late, up to 5 penalty units for an individual.' },
          { p: 'The ATO says it generally does not apply penalties in isolated cases of late lodgment, and that it warns you by phone or in writing before it applies one.' },
        ],
      },
      {
        id: 'what-to-do', title: 'What to do',
        blocks: [
          { list: [
            'Lodge as soon as you can, even if it is late.',
            'If you have more than one year outstanding, each year is its own return.',
            'If you have received a penalty, you can ask the ATO to cancel or reduce it, once the overdue returns are lodged.',
          ] },
          { note: 'If you are owed a refund, lodging late only delays your own money.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Failure to lodge on time penalty', href: `${ATO}/individuals-and-families/paying-the-ato/interest-and-penalties/penalties/failure-to-lodge-on-time-penalty` },
    ],
    related: ['blog/tax-return-deadline-31-october', 'blog/tax-payment-plan', 'do-i-need-to-lodge'],
    short: {"answer": "Lodge as soon as you can. The ATO generally does not penalise an isolated late return, and warns you before it does. If you are owed a refund, lodging late only delays your own money.", "mark": "Lodge as soon as you can"},
  },
  {
    slug: 'tax-payment-plan',
    category: 'Tax return',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Owing tax: payment plans',
    meta: {
      title: 'Owe the ATO money? Setting up a payment plan',
      description: 'ABN work or two jobs can leave a student with a tax bill. If you cannot pay it at once, the ATO lets most people set up a payment plan online.',
    },
    h1: { before: 'Owe tax? ', mark: 'Pay it in parts' },
    lead: 'Not every student gets a refund. Delivery work, cash jobs or claiming the tax-free threshold from two jobs can leave you with tax to pay. If you cannot pay it all at once, there is an official way to spread it.',
    sections: [
      {
        id: 'plan', title: 'Setting up a plan',
        blocks: [
          { p: 'The ATO says that if you owe $200,000 or less, you may be able to set up a payment plan yourself online:' },
          { list: [
            'In myGov, linked to the ATO: Tax, then Payments, then Payment plans.',
            'Or by the ATO\'s self-help phone line.',
          ] },
          { p: 'The ATO guides you to pay what you owe in the shortest time you can, to save on interest.' },
        ],
      },
      {
        id: 'early', title: 'Act early',
        blocks: [
          { p: 'Setting up a plan before the due date is better than ignoring the bill. If you are leaving Australia, set up the plan or pay before you go.' },
          { note: 'We give you an estimate before you sign, so a bill should not come as a surprise.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: How to set up a payment plan', href: `${ATO}/individuals-and-families/paying-the-ato/help-with-paying/payment-plans/setting-up-a-payment-plan` },
    ],
    related: ['abn-delivery', 'blog/tfn-declaration-two-jobs', 'blog/cash-in-hand-and-tips'],
    short: {"answer": "If you owe $200,000 or less, you may be able to set up a payment plan yourself in myGov: Tax, then Payments, then Payment plans. Setting it up early is better than ignoring the bill.", "mark": "set up a payment plan yourself"},
  },
  // ── Batch 4b (26 Oct): minimum pay ────────────────────────────────────────
  {
    slug: 'minimum-wage-students',
    category: 'Work',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Minimum wage and penalty rates',
    meta: {
      title: 'Minimum wage and penalty rates for students in 2026',
      description: 'The national minimum wage is $26.44 an hour from 1 July 2026. How awards set your real minimum, when weekend and public holiday rates apply, and how to check.',
    },
    h1: { before: 'Your ', mark: 'minimum pay', after: ' in 2026' },
    lead: 'A student visa does not change what you must be paid. Here is the lowest legal rate, and why your real minimum is often higher.',
    sections: [
      {
        id: 'floor', title: 'The national minimum wage',
        blocks: [
          { p: 'Fair Work says that from the first full pay period starting on or after 1 July 2026, the national minimum wage is $26.44 an hour, or $1,004.90 for a 38-hour week.' },
        ],
      },
      {
        id: 'award', title: 'Your award sets your real minimum',
        blocks: [
          { p: 'Most jobs are covered by an award for the industry or the job, such as hospitality, retail or cleaning. The award has its own minimum rates, and from the same date most of them rose by 4.75%.' },
          { p: 'Fair Work\'s free Pay Calculator works out which award covers you and what it pays.' },
        ],
      },
      {
        id: 'penalty', title: 'Weekends, public holidays and late shifts',
        blocks: [
          { p: 'Penalty rates are higher rates of pay for particular hours or days. You may be entitled to them for:' },
          { list: [
            'Weekends.',
            'Public holidays.',
            'Overtime.',
            'Late night and early morning shifts.',
          ] },
          { p: 'How much extra depends on your award, or on your agreement if your workplace has one.' },
        ],
      },
      {
        id: 'visa', title: 'On a student visa',
        blocks: [
          { note: 'Fair Work says visa holders have the same workplace rights as everyone else, including minimum pay. If you think you are underpaid, it can help, and you can call through a free interpreter.' },
        ],
      },
    ],
    sources: [
      { label: 'Fair Work Ombudsman: Minimum wage increase starts today (1 July 2026)', href: 'https://www.fairwork.gov.au/newsroom/media-releases/2026-media-releases/july-2026/20260701-minimum-wage-increase-media-release' },
      { label: 'Fair Work Ombudsman: Penalty rates', href: 'https://www.fairwork.gov.au/pay-and-wages/penalty-rates-allowances-and-other-payments/penalty-rates' },
    ],
    related: ['blog/payslip-what-to-check', 'blog/underpaid-student-visa', 'blog/unpaid-trial-shifts'],
    short: {"answer": "Since the first full pay period starting on or after 1 July 2026, the national minimum wage is $26.44 an hour. Most jobs are covered by an award with its own minimum rates, plus higher rates for weekends and public holidays.", "mark": "$26.44 an hour", "facts": [{"figure": "$26.44", "label": "an hour, the national minimum wage"}, {"figure": "4.75%", "label": "rise in most award minimum rates"}]},
  },
]

export const articleBySlug = (slug: string) => BLOG_EN.find(a => a.slug === slug)
