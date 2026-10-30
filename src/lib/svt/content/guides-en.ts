/**
 * Student Visa Tax guide pages (English).
 *
 * Every factual claim here is listed with its source in
 * docs/content/svt-facts-2026-10.md. Change a fact there first, then here.
 *
 * Wording rules (CLAUDE.md, tested in guides-en-26oct.test.ts):
 *   - "operates under the supervision of a registered tax agent" and
 *     "Reviewed and signed off by a registered tax agent before it is lodged
 *     with the ATO" are the only ways we describe the agent.
 *   - No AI, no refund promises, residency is always "may be".
 *   - Sentence case headings. Plain English a second-language reader follows.
 */
import type { FaqItem } from '@/components/svt/Faq'

export type GuideBlock =
  | { p: string }
  | { list: readonly string[] }
  | { note: string }

export interface GuideSection {
  id: string
  title: string
  blocks: readonly GuideBlock[]
}

/** The answer box at the top of a page (decision 005). `mark` is a substring
 *  of `answer` set with the highlighter. A page may add either a ticked form
 *  (rows answered yes or no) or up to three key figures, never both. */
export interface ShortAnswer {
  answer: string
  mark?: string
  form?: { question: string; rows: ReadonlyArray<{ label: string; sub?: string; answer: 'yes' | 'no' }> }
  facts?: ReadonlyArray<{ figure: string; label: string }>
}

export interface GuideContent {
  slug: string
  /** Short label for menus and related links. */
  label: string
  meta: { title: string; description: string }
  h1: { before: string; mark: string; after?: string }
  lead: string
  sections: readonly GuideSection[]
  faq?: readonly FaqItem[]
  /** Official pages the reader can check us against. */
  sources: ReadonlyArray<{ label: string; href: string }>
  related: readonly string[]
  /** Decision 005: every page opens with this. */
  short?: ShortAnswer
  /** ISO dates. `updated` changes when a fact or a section changes. */
  published: string
  updated: string
}

const ATO = 'https://www.ato.gov.au'

export const GUIDES_EN: readonly GuideContent[] = [
  {
    slug: 'pricing',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Price',
    meta: {
      title: 'Student tax return price: from $220, incl. GST',
      description: '$220 for a tax return with TFN jobs, $385 with ABN work such as Uber Eats. GST included. If your refund is smaller than our fee, we pay you the difference.',
    },
    h1: { before: 'Your price, ', mark: 'confirmed before you pay' },
    lead: 'Two prices, both including GST. We confirm which one is yours on WhatsApp before you pay anything.',
    sections: [
      {
        id: 'prices',
        title: 'What it costs',
        blocks: [
          { list: [
            '$220 for a tax return when all your work was jobs with a TFN: café, retail, warehouse, cleaning, tutoring on a payslip.',
            '$385 when you also had ABN work: Uber Eats, DoorDash, Menulog, cleaning on invoices, or any other work where you sent an invoice and nothing was taken out for tax.',
          ] },
          { p: 'Both prices include GST. The fee is fixed, never a percentage of your refund.' },
          { p: 'Each financial year is its own tax return. If you have earlier years to catch up on, tell us which years and we confirm the price for each before you pay.' },
        ],
      },
      {
        id: 'guarantee',
        title: 'If your refund is smaller than our fee',
        blocks: [
          { p: 'We pay you the difference. If our fee is $220 and your refund is $150, we send you back $70.' },
          { p: 'We pay it once the ATO issues your notice of assessment, because that is the document that shows the final refund.' },
          { note: 'If there is no refund, or you owe tax, the full fee applies. Claiming the tax-free threshold from two jobs, or delivery work on an ABN, are the usual reasons a student owes tax.' },
        ],
      },
      {
        id: 'paying',
        title: 'How you pay',
        blocks: [
          { p: 'By bank transfer to The Accounting Academy, after we have confirmed your price. Send us a screenshot of the transfer on WhatsApp and we start.' },
          { p: 'We never ask for your myGov password, and we never take the fee out of your refund.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Lodge your tax return with a registered tax agent', href: `${ATO}/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-with-a-registered-tax-agent` },
    ],
    related: ['how-it-works', 'abn-delivery', 'blog/tax-return-deadline-31-october'],
    short: {"answer": "Student Visa Tax charges $220 for a return when all your work was jobs with a TFN, $385 if you also had ABN work. Both include GST, and we confirm your price on WhatsApp before you pay.", "mark": "we confirm your price", "facts": [{"figure": "$220", "label": "jobs with a TFN only"}, {"figure": "$385", "label": "with ABN work, such as delivery"}]},
  },
  {
    slug: 'how-it-works',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'How it works',
    meta: {
      title: 'Student tax return online: how it works',
      description: 'Message us on WhatsApp, pay by bank transfer, fill in a short form, sign online. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.',
    },
    h1: { before: 'From first message ', mark: 'to lodged' },
    lead: 'Everything happens on WhatsApp and one online form. You do not need to come to an office or share your myGov login.',
    sections: [
      {
        id: 'steps',
        title: 'The steps',
        blocks: [
          { list: [
            'You message us on WhatsApp. We ask about your visa and your work, and confirm your price.',
            'You pay by bank transfer to The Accounting Academy and send us a screenshot. We send you a tax invoice once the payment comes through.',
            'You fill in a short online form and upload what it asks for.',
            'We review everything within about 24 hours and send you an estimate.',
            'You read the return and sign it online.',
            'It is reviewed and signed off by a registered tax agent before it is lodged with the ATO.',
          ] },
        ],
      },
      {
        id: 'what-you-need',
        title: 'What to have ready',
        blocks: [
          { list: [
            'Your passport and your visa details.',
            'Your tax file number (TFN).',
            'Your Australian bank account details, for any refund.',
            'If you had ABN work: what you earned from each app or client, and your work costs, such as phone, bike or car.',
          ] },
          { p: 'Your income statements come straight from your employers to the ATO. We wait until they are marked "Tax ready", which usually happens in July.' },
        ],
      },
      {
        id: 'timing',
        title: 'How long it takes',
        blocks: [
          { p: 'We review your form within about 24 hours. Two things can make the whole process longer: an employer who has not finalised your income statement, and a Medicare Entitlement Statement, which can take weeks to arrive.' },
          { p: 'The ATO then processes the return. We tell you when it is lodged and when the notice of assessment arrives.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Accessing your income statement', href: `${ATO}/individuals-and-families/jobs-and-employment-types/working-as-an-employee/access-your-income-statement` },
    ],
    related: ['pricing', 'medicare', 'do-i-need-to-lodge'],
    short: {"answer": "Message us on WhatsApp, pay by bank transfer, fill in one short form and sign online. Your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.", "mark": "WhatsApp", "facts": [{"figure": "24 hours", "label": "about how long we take to review your form"}]},
  },
  {
    slug: 'tax-residency',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Tax residency',
    meta: {
      title: 'Are international students tax residents?',
      description: 'If your course is 6 months or longer you may be an Australian resident for tax purposes. What that means for the tax-free threshold and your income from home.',
    },
    h1: { before: 'Are you a ', mark: 'tax resident', after: '?' },
    lead: 'Your visa does not decide this on its own. The length of your course and how you live here also matter. The answer changes how much tax you pay.',
    sections: [
      {
        id: 'six-months',
        title: 'The 6-month course rule',
        blocks: [
          { p: 'The ATO says that if you are an overseas student enrolled in a course that lasts 6 months or more, you may be an Australian resident for tax purposes.' },
          { p: '"May be" matters. Residency is decided by tests about where you live and for how long, so we look at your dates and your situation before we lodge anything.' },
        ],
      },
      {
        id: 'why-it-matters',
        title: 'Why it matters',
        blocks: [
          { list: [
            'Residents pay no tax on the first $18,200 of their income for the year. This is called the tax-free threshold.',
            'In the year you arrive or leave, you may get only part of the threshold.',
            'Residents pay lower rates on most income than foreign residents, who pay tax from the first dollar.',
          ] },
          { p: 'Your employer takes tax from each pay as if you earn that amount every week of the year. A second job is taxed at a higher rate. If you worked only part of the year, too much tax may have been taken. Your tax return works out the correct amount.' },
        ],
      },
      {
        id: 'income-from-home',
        title: 'Money from home',
        blocks: [
          { p: 'Most students are also temporary residents, because they hold a temporary visa. If you are a temporary resident and also a resident for tax purposes, Australia generally does not tax most of your foreign income, such as interest on savings at home.' },
          { p: 'You still declare all your Australian income, and some income for work done overseas.' },
        ],
      },
      {
        id: 'graduate',
        title: 'After you graduate',
        blocks: [
          { p: 'On a 485 graduate visa you are usually living and working here full time, so the same residency questions apply. We check each year on its own.' },
        ],
      },
    ],
    faq: [
      { q: 'My course is shorter than 6 months. Am I a resident?', a: 'Probably not, but it depends on how long you stay and how you live here. Tell us your dates and we check.' },
      { q: 'I moved from a working holiday visa to a student visa. Does that change things?', a: 'Yes. The two periods can be taxed differently in the same year. Tell us both visas and the dates.' },
    ],
    sources: [
      { label: 'ATO: Studying in Australia', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia` },
      { label: 'ATO: Australian resident for tax purposes', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/your-tax-residency/australian-resident-for-tax-purposes` },
    ],
    related: ['medicare', 'blog/tfn-declaration-two-jobs', 'blog/low-income-tax-offset-students'],
    short: {"answer": "An international student in Australia enrolled in a course of 6 months or more may be an Australian resident for tax purposes. Residents get the tax-free threshold, $18,200 in 2025-26, or part of it in the year they arrive or leave.", "mark": "may be an Australian resident", "facts": [{"figure": "6 months", "label": "course length that may make you a resident"}, {"figure": "$18,200", "label": "tax-free threshold for residents"}]},
  },
  {
    slug: 'medicare',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Medicare levy',
    meta: {
      title: 'Medicare levy exemption for international students',
      description: 'Students on overseas student health cover can often claim the Medicare levy exemption. You need a Medicare Entitlement Statement first. How to get it and when.',
    },
    h1: { before: 'The Medicare levy and your ', mark: 'student health cover' },
    lead: 'If you are a resident for tax purposes, the Medicare levy of 2% is usually added to your tax. If you were not entitled to Medicare, you can usually claim an exemption, but only with the right statement.',
    sections: [
      {
        id: 'mes',
        title: 'The Medicare Entitlement Statement',
        blocks: [
          { p: 'To claim the exemption you need a Medicare Entitlement Statement (MES) from Services Australia. It shows the part of the year you were not entitled to Medicare. Your health insurer does not send it; you apply for it.' },
          { list: [
            'Applications open on 1 July, for the year that just ended.',
            'You apply online through your myGov account.',
            'The ATO says processing can take up to 8 weeks.',
            'You need a new statement for each year you claim the exemption.',
          ] },
          { note: 'The ATO says you must wait for your MES before you lodge. This is the most common reason a student return is lodged later than a friend\'s.' },
        ],
      },
      {
        id: 'not-automatic',
        title: 'Having a statement is not the whole test',
        blocks: [
          { p: 'An MES does not on its own make you exempt. Your dependants (people who rely on you, including your partner) must also be exempt. If your partner was entitled to Medicare, you may not be able to claim.' },
          { p: 'Some countries have a health care agreement with Australia, and students from some of those countries are entitled to Medicare. If you were, you cannot get an MES. Tell us your passport country and we check.' },
        ],
      },
      {
        id: 'foreign-resident',
        title: 'If you are not a resident for tax purposes',
        blocks: [
          { p: 'Foreign residents for the whole year do not pay the Medicare levy at all, so no statement is needed for that year.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Not entitled to Medicare benefits', href: `${ATO}/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-exemption/not-entitled-to-medicare-benefits` },
      { label: 'Services Australia: Medicare Entitlement Statement', href: 'https://www.servicesaustralia.gov.au/medicare-entitlement-statement' },
    ],
    related: ['tax-residency', 'blog/work-deductions-students', 'pricing'],
    faq: [
      { q: 'Does my student health cover send me the statement?', a: 'No. Your health insurer does not send it. You apply to Services Australia yourself, online through your myGov account, from 1 July.' },
      { q: 'Do I need a new statement every year?', a: 'Yes. You need a new Medicare Entitlement Statement for each year you claim the exemption.' },
    ],
    short: {"answer": "If you are an international student, a resident for tax purposes and not entitled to Medicare, you can usually claim the Medicare levy exemption, but only with a Medicare Entitlement Statement from Services Australia. Wait for it before you lodge.", "mark": "Medicare Entitlement Statement", "facts": [{"figure": "2%", "label": "Medicare levy for residents"}, {"figure": "8 weeks", "label": "the longest processing time, says the ATO"}]},
  },
  {
    slug: 'abn-delivery',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Uber Eats and ABN work',
    meta: {
      title: 'Uber Eats tax on a student visa: ABN and GST',
      description: 'ABN income has no tax taken out. How delivery work goes on your return, which costs you can claim, GST, and why riders sometimes owe tax. $385 return.',
    },
    h1: { before: 'Uber Eats, DoorDash and ', mark: 'ABN work' },
    lead: 'When you work on an ABN, nobody takes tax out of what you earn. That is the big difference from a job, and it is why ABN work needs more care at tax time.',
    sections: [
      {
        id: 'how-it-works',
        title: 'How ABN income is taxed',
        blocks: [
          { p: 'Your earnings from the app go on your return as business income. Your work costs come off it, and tax is worked out on what is left, together with any wages from your jobs.' },
          { p: 'Because no tax was taken out during the year, ABN work can turn a refund into an amount you owe. Knowing this early helps: we can give you an estimate before you sign.' },
        ],
      },
      {
        id: 'costs',
        title: 'Costs you can usually claim',
        blocks: [
          { list: [
            'The work part of your phone and mobile data.',
            'Bike, e-bike or scooter running costs and repairs, and delivery bags.',
            'Car costs, if you deliver by car, with records of your work kilometres.',
          ] },
          { p: 'The cents per kilometre method (a set amount for each work kilometre) is for cars only. Motorbikes, scooters and bicycles are claimed on actual costs, so keep receipts.' },
          { p: 'Keep your records for 5 years from the day you lodge.' },
        ],
      },
      {
        id: 'gst',
        title: 'GST',
        blocks: [
          { p: 'For food and parcel delivery, you only have to register for GST once your turnover (the total you earn, before costs) reaches $75,000 a year. Most student riders never get close.' },
          { note: 'Driving passengers is different. For ride-sourcing, such as Uber rides, the ATO says you must register for GST before your first trip, even if you earn very little.' },
        ],
      },
      {
        id: 'price',
        title: 'What it costs with us',
        blocks: [
          { p: 'A return with ABN work is $385, including GST, whether you had only delivery work or delivery plus a job.' },
        ],
      },
    ],
    faq: [
      { q: 'Can I use the free Tax Help program for delivery work?', a: 'No. The ATO Tax Help program is not for people who worked as a contractor or ran a business, which includes ABN delivery work.' },
      { q: 'I did not keep receipts. Can I still claim?', a: 'Some costs can be worked out from bank statements and app records. Tell us what you have and we check what can be claimed properly.' },
    ],
    sources: [
      { label: 'ATO: Ride-sourcing registrations', href: `${ATO}/businesses-and-organisations/income-deductions-and-concessions/sharing-economy-and-tax/ride-sourcing/registrations` },
      { label: 'ATO: Records you need to keep', href: `${ATO}/individuals-and-families/income-deductions-offsets-and-records/records-you-need-to-keep` },
      { label: 'ATO: Tax Help program', href: `${ATO}/individuals-and-families/your-tax-return/help-and-support-to-lodge-your-tax-return/tax-help-program` },
    ],
    related: ['blog/what-is-an-abn-students', 'blog/tax-payment-plan', 'pricing'],
    short: {"answer": "Nobody takes tax out of ABN income. It goes on your return as business income, minus your work costs, which is why delivery work can turn a refund into tax to pay.", "mark": "Nobody takes tax out", "facts": [{"figure": "$385", "label": "a return with ABN work"}, {"figure": "$75,000", "label": "turnover before GST for delivery"}]},
  },
  {
    slug: 'do-i-need-to-lodge',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Do I need to lodge?',
    meta: {
      title: 'Do international students need to lodge a tax return?',
      description: 'If you worked in Australia and tax was taken from your pay, you usually lodge a return. Deadlines, what happens if you do not, and when free help is the better choice.',
    },
    h1: { before: 'Do I need to ', mark: 'lodge a tax return', after: '?' },
    lead: 'Usually yes, if you worked in Australia and tax was taken from your pay. If too much tax was taken, lodging is how you get it back. Sometimes it shows you owe tax.',
    sections: [
      {
        id: 'who',
        title: 'Who usually lodges',
        blocks: [
          { list: [
            'Anyone who had tax taken from their pay during the year.',
            'Anyone with ABN income, such as delivery work.',
            'Anyone who wants to claim the Medicare levy exemption or work costs.',
          ] },
          { p: 'The Australian financial year runs from 1 July to 30 June. Each year is its own return.' },
        ],
      },
      {
        id: 'deadline',
        title: 'The deadline',
        blocks: [
          { p: 'If you lodge yourself, the usual deadline is 31 October after the year ends.' },
          { p: 'Registered tax agents have a lodgment program that allows later dates for their clients. To be part of it, the ATO says you should contact the agent before 31 October. Your exact due date depends on your situation.' },
          { note: 'If an earlier year was still not lodged on 30 June, your return is due on 31 October, even with a tax agent. Tell us about every year you worked.' },
        ],
      },
      {
        id: 'free-help',
        title: 'When free help is the better choice',
        blocks: [
          { p: 'If you earn around $70,000 or less and your tax is simple, the ATO Tax Help program and some university clinics can help you for free. It is not for ABN work or business income.' },
          { p: 'If you want someone to check residency, the Medicare exemption or delivery costs for you, that is what we do.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Lodge your tax return with a registered tax agent', href: `${ATO}/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-with-a-registered-tax-agent` },
      { label: 'ATO: Tax Help program', href: `${ATO}/individuals-and-families/your-tax-return/help-and-support-to-lodge-your-tax-return/tax-help-program` },
      { label: 'ATO: Due dates in the agent lodgment program', href: `${ATO}/tax-and-super-professionals/for-tax-professionals/prepare-and-lodge/registered-agent-lodgment-program-2025-26/due-dates-for-tax-returns-by-client-type/individuals-and-trusts` },
    ],
    related: ['blog/apply-for-tfn-student-visa', 'blog/income-statement-tax-ready', 'past-years'],
    short: {"answer": "Usually yes, if you worked in Australia and tax was taken from your pay, or you had ABN income. Each financial year, 1 July to 30 June, is its own return.", "mark": "Usually yes"},
  },
  {
    slug: 'past-years',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Past years',
    meta: {
      title: 'Lodging a past year\'s tax return as a student',
      description: 'Missed a tax return from an earlier year? You can still lodge it. What to do, what we need, and why it is better to start now.',
    },
    h1: { before: 'Missed a year? ', mark: 'You can still lodge it' },
    lead: 'Many students only find out about tax returns in their second or third year. Earlier years can still be lodged, one return for each year.',
    sections: [
      {
        id: 'how',
        title: 'How we catch up',
        blocks: [
          { list: [
            'Tell us which financial years you worked in Australia, and your visa for each.',
            'We confirm the price for each year before you pay.',
            'Old payslips, bank statements and app records help us complete each year.',
            'Each year is its own return, reviewed and signed off by a registered tax agent before it is lodged with the ATO.',
          ] },
        ],
      },
      {
        id: 'why-now',
        title: 'Why it is worth doing now',
        blocks: [
          { p: 'Any refund from an earlier year is still yours to claim. If a year shows tax owing, the ATO can charge penalties and interest for lodging late, so it is better to deal with it soon.' },
          { p: 'If an earlier year was still not lodged on 30 June, your current return is due on 31 October, even with a tax agent.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Lodge your tax return with a registered tax agent', href: `${ATO}/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-with-a-registered-tax-agent` },
      { label: 'ATO: Due dates in the agent lodgment program', href: `${ATO}/tax-and-super-professionals/for-tax-professionals/prepare-and-lodge/registered-agent-lodgment-program-2025-26/due-dates-for-tax-returns-by-client-type/individuals-and-trusts` },
    ],
    related: ['blog/late-lodgment', 'blog/amend-tax-return', 'blog/tax-return-deadline-31-october'],
    short: {"answer": "Yes. Earlier years can still be lodged, one return for each year, and any refund from an earlier year is still yours to claim. If a year shows tax owing, sooner is better.", "mark": "one return for each year"},
  },
  {
    slug: 'leaving-australia',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Leaving Australia',
    meta: {
      title: 'Leaving Australia after your course: tax and super',
      description: 'You can lodge your last Australian tax return from overseas, after 30 June. What to sort out before you fly, and how to claim your super once you have left.',
    },
    h1: { before: 'Finishing your course and ', mark: 'going home' },
    lead: 'Leaving does not end your Australian tax for the year. You can lodge your last return from overseas, and claim your super once you have left.',
    sections: [
      {
        id: 'before',
        title: 'Before you fly',
        blocks: [
          { list: [
            'Keep your Australian bank account open until any refund is paid, and until your super is paid if you want it paid there.',
            'Most employers report your pay straight to the ATO. If one does not, ask them for a payment summary before you go. The ATO says they must give it to you within 14 days.',
            'Save your payslips, and your app earnings if you did delivery work.',
            'Note the email and phone number you will use overseas, and keep WhatsApp.',
          ] },
        ],
      },
      {
        id: 'last-return',
        title: 'Your last tax return',
        blocks: [
          { p: 'Your final return is normally lodged after 30 June, when the financial year has ended. You can do it from overseas; we work with you on WhatsApp the same way.' },
          { p: 'If you leave permanently before 30 June, it is possible to lodge early, but only on paper, which the ATO takes longer to process. For most people, waiting is simpler.' },
        ],
      },
      {
        id: 'super',
        title: 'Your super',
        blocks: [
          { p: 'Super your employers paid can be claimed as a departing Australia superannuation payment (DASP) after your visa has ended and you have left. We can help you claim it.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Returning to your home country', href: `${ATO}/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/returning-to-your-home-country` },
    ],
    related: ['superannuation', 'blog/lodge-from-overseas', 'blog/cancel-abn-before-leaving'],
    short: {"answer": "Lodge your last return after 30 June from wherever you are, and claim your super as a DASP once you have left and your visa has ended. Keep your Australian bank account open until any refund is paid.", "mark": "Keep your Australian bank account open", "facts": [{"figure": "14 days", "label": "for an employer to give a payment summary you ask for"}]},
  },
  {
    slug: 'superannuation',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'Super (DASP)',
    meta: {
      title: 'Claim your super when you leave Australia (DASP)',
      description: 'How international students and graduates claim their Australian super after leaving: who is eligible, the tax rates, and what happens if you wait more than 6 months.',
    },
    h1: { before: 'Getting your ', mark: 'super back', after: ' after you leave' },
    lead: 'Your employers paid super on top of your wages. Once you have left Australia and your visa has ended, you can claim it as a departing Australia superannuation payment (DASP).',
    sections: [
      {
        id: 'eligible',
        title: 'Who can claim',
        blocks: [
          { list: [
            'You earned the super while working here on a temporary visa (a student or graduate visa counts).',
            'Your visa has ended, by expiry or cancellation.',
            'You have left Australia and do not hold any other active Australian visa.',
            'You are not an Australian or New Zealand citizen, or a permanent resident.',
          ] },
        ],
      },
      {
        id: 'tax',
        title: 'The tax taken from it',
        blocks: [
          { p: 'Your fund takes tax out before paying you. If you have never held a working holiday visa, the usual rates are 35% on most super (the taxed element) and 45% on any untaxed element.' },
          { note: 'If you also held a working holiday visa (417 or 462), and the payment includes super from that time, the ATO applies 65% to the whole amount.' },
        ],
      },
      {
        id: 'six-months',
        title: 'If you wait more than 6 months',
        blocks: [
          { p: 'Six months after you leave, once your visa has ended, your fund sends unclaimed super to the ATO. It is not lost: you may still be able to claim it from the ATO.' },
        ],
      },
      {
        id: 'with-us',
        title: 'Claiming with us',
        blocks: [
          { p: 'The ATO\'s own online application is free. If you would rather we handle it, we check your funds, your visa dates and the forms, and we confirm the price on WhatsApp before you pay.' },
        ],
      },
    ],
    sources: [
      { label: 'ATO: Departing Australia superannuation payment', href: `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp` },
    ],
    related: ['blog/dasp-documents-and-timing', 'blog/find-and-check-your-super', 'leaving-australia'],
    faq: [
      { q: 'Can I claim my super while I am still in Australia?', a: 'No. You can start the application before you leave, but it can only be submitted once you have left Australia and your visa has ended.' },
      { q: 'I am moving to a 485 graduate visa. Can I claim my super now?', a: 'No. You cannot claim it while you hold any active Australian visa, including a 485. Your super stays in your fund until you leave and your visa ends.' },
    ],
    short: {"answer": "Once you have left Australia and your visa has ended, you can claim your super as a departing Australia superannuation payment (DASP). Your fund takes tax out first.", "mark": "departing Australia superannuation payment (DASP)", "facts": [{"figure": "35%", "label": "usual rate on most super, if never on a working holiday visa"}, {"figure": "6 months", "label": "after you leave and your visa ends, unclaimed super goes to the ATO"}]},
  },
  {
    slug: 'about',
    published: '2026-10-26', updated: '2026-10-26',
    label: 'About us',
    meta: {
      title: 'About us: tax returns for student visas',
      description: 'Tax returns for people on student and graduate visas, and nothing else. Operates under the supervision of a registered tax agent.',
    },
    h1: { before: 'Only ', mark: 'student visas' },
    lead: 'Student Visa Tax does tax returns for people on student (500) and graduate (485) visas in Australia, and nothing else.',
    sections: [
      {
        id: 'why',
        title: 'Why only students',
        blocks: [
          { p: 'Student tax has its own questions: the 6-month course rule, the Medicare Entitlement Statement, two casual jobs at once, delivery work on an ABN, and what to do with your super when you go home. These are the only questions we work on, so you do not have to explain your situation from the start.' },
          { p: 'You can ask us in English, 中文 or Tiếng Việt.' },
        ],
      },
      {
        id: 'who-checks',
        title: 'Who checks your return',
        blocks: [
          { p: 'Student Visa Tax operates under the supervision of a registered tax agent, The Accounting Academy Services Pty Limited. Every return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.' },
          { p: 'We never ask for your myGov password.' },
        ],
      },
    ],
    sources: [
      { label: 'Tax Practitioners Board: public register', href: 'https://www.tpb.gov.au/registrations_search?number=26233096' },
    ],
    related: ['how-it-works', 'pricing'],
    short: {"answer": "Student Visa Tax does tax returns only for people on student and graduate visas in Australia, in English, Chinese and Vietnamese. It operates under the supervision of a registered tax agent.", "mark": "only"},
  },
]

export const guideBySlug = (slug: string) => GUIDES_EN.find(g => g.slug === slug)
