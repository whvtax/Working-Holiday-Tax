import { jsonLdHtml } from '@/lib/json-ld-html'
import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaButton } from '@/components/wht/WaButton'
import { WaLink } from '@/app/(site)/HomeWa'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Steps, LinkRows, Compare, blocks } from '@/components/wht/Blocks'
import { AGENT_TPB } from '@/lib/agent'
import { Crumb, PhotoFrame, PlainRows } from '@/components/wht/CoreBlocks'
import { Accordion } from '@/components/ui/Accordion'

// ─── METADATA ───────────────────────────────────────────────────────────
// This page answers the transactional query: someone who has already decided
// they want help and wants to know what happens next. The homepage owns the
// informational side ("why not do this myself"), so nothing here repeats its
// hero, its three figures or the myGov comparison block. No price in the
// title, the description or the schema, and no claim to be a registered agent.
export const metadata: Metadata = {
  // The root layout appends " | Working Holiday Tax", so the base title is kept
  // short enough that the whole thing still fits a mobile SERP.
  title: 'Working holiday visa tax return (417 & 462)',
  description:
    'Tax return and refund for 417 and 462 visas: no payslips, no myGov, works from overseas. Any refund usually lands about 14 business days after lodgement.',
  keywords: [
    'working holiday visa tax return',
    'working holiday tax refund',
    'tax refund working holiday visa',
    'backpacker tax refund',
    'claim tax back Australia working holiday',
    'lodge tax return Australia backpacker',
    'working holiday tax return service',
    'lodge tax return from overseas',
    'tax return 417 visa',
    'tax return 462 visa',
    'how to lodge Australian tax return working holiday',
    'tax return help working holiday maker',
    'tax refund after leaving Australia',
    'previous year tax return Australia',
    'Australian tax return without payslips',
    'income statement ATO working holiday',
    'how long does an Australian tax refund take',
    'working holiday tax return UK',
    'working holiday tax return Germany',
    'working holiday tax return Japan',
  ],
  alternates: {
    canonical: '/tax-return',
    languages: {
      'en': '/tax-return', 'en-AU': '/tax-return',
      de: '/de/tax-return',
      ja: '/ja/tax-return',
      ...newLocaleLanguages('/tax-return'),
      'x-default': '/tax-return',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tax-return.png`, width: 1200, height: 630, alt: 'Lodging a working holiday tax return for 417 and 462 visa holders in Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/tax-return`,
    siteName: 'Working Holiday Tax',
    title: 'Working holiday visa tax return (417 & 462)',
    description:
      'Your details and where to deposit your refund. We read the ATO record, prepare the return and you sign it. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Working holiday visa tax return (417 & 462)',
    description: 'Passport, bank details, no payslips. Signed by you, and reviewed and signed off by a registered tax agent before it is lodged with the ATO.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Everything the visitor has to supply. Three items, and nothing else. */
const NEEDED = [
  {
    label: 'Your passport and visa',
    body: 'Which passport you hold and which subclass you were on.',
  },
  {
    label: 'An Australian bank account',
    body: 'The ATO pays refunds into an Australian account only. If yours is already closed, say so at the start.',
  },
  {
    label: 'Roughly where and when you worked',
    body: 'A town, the kind of work, rough months. We match it against the ATO record and fill in the rest.',
  },
]

/** The sequence, in the order it happens, with the waiting written in. */
const SEQUENCE = [
  {
    n: '01',
    title: 'You message us',
    body: 'WhatsApp, in English, German, Japanese, French, Italian or Spanish. You tell us what the year looked like, we tell you where you stand, and the fee is agreed before any work begins.',
  },
  {
    n: '02',
    title: 'One questionnaire, about ten minutes',
    body: 'Passport and visa details, bank details, the towns and the kind of work. It is the only form you fill in. Leave anything that does not apply and we will ask.',
  },
  {
    n: '03',
    title: 'Your ATO record is checked',
    body: 'Every employer who reported you, every income statement, every dollar withheld, and any earlier year still open. Forgotten jobs and weeks taxed at the top rate surface here, not in what you remember.',
  },
  {
    n: '04',
    title: 'The judgements that move the number',
    body: 'Residency for the year, the weeks withheld before your tax file number arrived, whether the Medicare levy was ever yours to pay, and what your line of work can claim. This is the slow part, and the part you are paying for.',
  },
  {
    n: '05',
    title: 'You read it and sign',
    body: 'We send you the finished return with each figure explained, and nothing goes to the ATO until you have read it and signed the declaration. Signing is electronic, so it works from a phone in another hemisphere.',
  },
  {
    n: '06',
    title: 'It is lodged',
    body: 'Reviewed and signed off by a registered tax agent before it is lodged with the ATO. Lodgement itself takes minutes.',
  },
  {
    n: '07',
    title: 'The ATO assesses it',
    body: 'Any refund usually lands about 14 business days after lodgement, into the Australian account you gave us. If the ATO queries something, we answer it and tell you what was asked.',
  },
]

/**
 * Where a working holiday refund comes from (Oct 2026). This page ranked around
 * 30 for "working holiday tax return" with nothing on it that explained why a
 * refund exists at all, which is the question the query carries. Every item is a
 * mechanism already stated elsewhere on the site; no amount is promised. The one
 * range sentence in the lede is the owner-approved wording.
 */
const REFUND_SOURCES = [
  {
    "label": "Weeks taxed at 45% before your TFN arrived",
    "body": "Without your tax file number on file, and without a declaration recording that your application is in progress, your employer must withhold 45% instead of 15%. Payslips in that gap may have been over-withheld, and that is only settled on a lodged return.",
    "href": "/tfn",
    "linkText": "Getting a TFN before your first shift"
  },
  {
    "label": "A second job without its own declaration",
    "body": "Every employer needs its own Tax File Number Declaration. A second job running without one withholds at 45% for as long as nobody notices, often for months.",
    "href": "/blog/multiple-jobs-tax-return-working-holiday",
    "linkText": "Tax returns with more than one job"
  },
  {
    "label": "An employer not registered for working holiday makers",
    "body": "The 15% rate needs the employer to be registered with the ATO as an employer of working holiday makers. If they were not, they had to withhold at the foreign resident rate, which starts at 30 cents in the dollar."
  },
  {
    "label": "A Medicare levy that was never yours",
    "body": "The 2% levy is applied by default. Whether it was owed depends on your entitlement to Medicare, and the right certificate is needed to take it off.",
    "href": "/medicare",
    "linkText": "The Medicare levy exemption"
  },
  {
    "label": "Work expenses nobody claimed",
    "body": "Shoes, uniforms, tools, licences and travel between sites can reduce your taxable income where they relate to the work you did. At the 15% rate, every $100 of genuine deductions takes $15 off the tax.",
    "href": "/blog/tax-deductions-working-holiday-makers",
    "linkText": "What working holiday makers can deduct"
  },
  {
    "label": "Your residency position and your passport",
    "body": "The ATO's 2025-26 instructions say a working holiday maker who was an Australian resident for tax purposes and is a national of Chile, Finland, Germany, Israel, Japan, Norway, Turkey or the United Kingdom is taxed at resident rates. Whether you were a resident that year depends on its facts, is for the ATO to decide, and is part of our review.",
    "href": "/blog/tax-residency-working-holiday-makers",
    "linkText": "Tax residency and working holiday makers"
  }
]

/** Key figures for a 417 or 462 return, each with its official source. */
const KEY_FIGURES = [
  { what: 'Financial year a return covers', figure: '1 July to 30 June. Each year is its own return.', source: 'ATO' },
  { what: 'Working holiday maker tax rates (2025-26, unchanged from 1 July 2026)', figure: '15% up to $45,000, 30% from $45,001 to $135,000, 37% from $135,001 to $190,000, 45% above $190,000. No tax-free threshold.', source: 'ATO' },
  { what: 'Withholding with no TFN on file', figure: '45%', source: 'ATO' },
  { what: 'Medicare levy', figure: '2% of taxable income for residents for tax purposes. Foreign residents, which most working holiday makers are, do not pay it and claim the exemption in the return. A resident who is not entitled to Medicare needs a Medicare Entitlement Statement to claim it.', source: 'ATO, Services Australia' },
  { what: 'Deadline if you lodge yourself', figure: '31 October after the year ends. For 2025-26 that was 31 October 2026, which has passed. A late return can still be lodged.', source: 'ATO' },
  { what: 'Where a refund is paid', figure: 'Only into a financial institution account located in Australia.', source: 'ATO' },
  { what: 'Lodging early, before leaving Australia permanently', figure: 'Paper return only. The ATO says early lodgements take 50 business days to process.', source: 'ATO' },
  { what: 'Processing of returns lodged online', figure: 'The ATO says most process within 10 business days. A return that needs a manual check can take up to 30 calendar days, and a paper return up to 90 business days.', source: 'ATO' },
]

const cellStyle = { padding: '10px 12px', borderTop: '1px solid var(--wht-line)', textAlign: 'left' as const, verticalAlign: 'top' as const }

/**
 * Dec 2026 (plan 3): the problems that hold a refund up, each with the official
 * rule and what to do. The problem queries return only ATO pages and community
 * threads, so the money page answers them itself. Facts: my.gov.au sign in help
 * (19 Nov 2026), ATO create a myGov account and link it (21 Jul 2026), myID
 * verifying your ID (9 Dec 2025), ATO missing tax return refunds (27 Apr 2026),
 * ATO check the progress of your tax return (14 Jun 2026), ATO contact us
 * (8 Oct 2026). The Code Generator app is deliberately not offered as a fix: it
 * retires on 28 February 2027.
 */
const REFUND_PROBLEMS: { problem: string; rule: string; todo: React.ReactNode }[] = [
  {
    problem: 'No myGov SMS code since you left Australia',
    rule: 'myGov sends SMS codes only to an Australian mobile number. If you are overseas or no longer have that number, the ATO suggests signing in with myID, a passkey or an authenticator app instead.',
    todo: <>Still have the number? Turn on international roaming. If not, you do not need myGov for us: we deal with the ATO directly. More in <Link href="/blog/mygov-sms-code-not-received-overseas" className={blocks.textLink}>myGov SMS code not arriving overseas</Link>.</>,
  },
  {
    problem: 'Locked out of myGov, or the ATO will not link',
    rule: 'myGov locks an account after too many wrong attempts. Recovering it with myID needs a Strong myID, which needs an Australian passport or a WA driver licence. Otherwise myGov says to create a new account and link the ATO again by answering questions from your ATO records.',
    todo: <>Your return does not have to wait for any of that. If you want to fix myGov anyway: <Link href="/blog/mygov-account-locked-out" className={blocks.textLink}>locked out of myGov</Link> and <Link href="/blog/cant-link-ato-to-mygov" className={blocks.textLink}>can&apos;t link the ATO to myGov</Link>.</>,
  },
  {
    problem: 'Your Australian bank account is closed',
    rule: 'The ATO pays refunds only into an Australian account. A refund paid to a closed account is returned by the Reserve Bank of Australia, which can take up to 10 days, then re-issued to updated bank details or by cheque. Some cheques are held for up to 90 days while the ATO asks for bank details.',
    todo: <>Keep the account open until the refund lands. If it has already closed, say so at the start, so the bank details are settled before anything is lodged. More in <Link href="/blog/tax-refund-closed-australian-bank-account" className={blocks.textLink}>tax refund with a closed Australian bank account</Link>.</>,
  },
  {
    problem: 'An income statement is not "tax ready"',
    rule: 'Your employer has not finalised it yet, so the figures in the ATO record can still change.',
    todo: <>Wait for it, or ask the employer to finalise it. A return lodged before then may need to be amended later.</>,
  },
  {
    problem: 'You worked before your TFN arrived',
    rule: 'Without your tax file number on file, and without a declaration that your application is in progress, your employer must withhold 45% instead of 15%.',
    todo: <>That year still needs a return: tax over-withheld is only settled on a lodged return. More in <Link href="/blog/tax-return-without-tfn-australia" className={blocks.textLink}>a tax return after working without a TFN</Link>.</>,
  },
  {
    problem: 'Your return has been processing for weeks',
    rule: 'The ATO says most returns lodged online process within 10 business days, a return that needs a manual check can take up to 30 calendar days, and a paper return up to 90 business days. From outside Australia the ATO is on +61 2 6216 1111, 8 am to 5 pm Monday to Friday, Australian Eastern time.',
    todo: <>Check the status before you call. What each status means is in <Link href="/blog/ato-tax-return-status-meaning" className={blocks.textLink}>your ATO tax return status explained</Link>, or let us deal with the ATO for you.</>,
  },
]

/** The verdict of the problem section, also given to the FAQPage with a deep link (r18 P1-1). */
const REFUND_PROBLEMS_Q = 'What can stop a working holiday tax refund, and what do you do?'
const REFUND_PROBLEMS_A = 'Most refunds that stall are held up by one of six things: no myGov SMS code abroad, a locked myGov account, a closed Australian bank account, an income statement that is not tax ready, weeks worked before your TFN arrived, or a return still processing. None of them means the money is lost.'

/**
 * Dec 2026 (plan 3, r01 P1-C): which returns a working holiday needs, by dates.
 * Rows 1 and 3 are the examples in the tax return deadline guide, row 2 is the
 * FAQ below, row 4 rests on ATO "lodge a prior year tax return" (myTax from 2016).
 */
const RETURNS_BY_DATES = [
  { worked: 'November 2025 to May 2026', returns: '1: 2025-26', due: '31 October 2026', still: 'Yes, now late' },
  { worked: 'March 2025 to February 2026', returns: '2: 2024-25 and 2025-26', due: '31 October 2025 and 31 October 2026', still: 'Yes, both now late' },
  { worked: 'March to September 2026', returns: '2: 2025-26 and 2026-27', due: '31 October 2026 and 31 October 2027', still: '2025-26 now late; 2026-27 from 1 July 2027' },
  { worked: 'A working holiday in 2019 to 2021', returns: 'One for each financial year it touched', due: '31 October after each year', still: 'Yes, myTax takes returns for 2016 and later years' },
]

const RULES = [
  {
    label: 'The refund can only go to an Australian account',
    body: 'Superannuation (DASP) still held by your fund can be paid overseas if the fund offers it. A tax refund cannot. If you are about to close your Australian bank account, wait until the refund has landed, or tell us first.',
  },
  {
    label: 'Earlier years can often still be claimed',
    body: 'A financial year you never lodged for may still be open. Each year is its own return, and we work through them oldest first.',
  },
]

// Answers past about 55 words carry a blank line, and the FAQ below renders one
// <p> per paragraph. faqLd still uses the raw string, so the schema is unchanged.
const FAQS = [
  {
    question: 'How long does a working holiday tax return take?',
    answer:
      'From the day your questionnaire is in, a straightforward year takes a few days to prepare and check, and the ATO usually pays the refund about 14 business days after lodgement.\n\nFive employers, income invoiced under an ABN, or a residency position that has to be argued takes longer at our end, and we tell you which yours is.',
  },
  {
    question: 'When is a working holiday tax return due?',
    answer:
      'If you lodge it yourself, 31 October after the financial year ends, so a 2025-26 return was due 31 October 2026, which has now passed. A year past its deadline is late rather than lost, and it can still be lodged.\n\nA return can be lodged from 1 July, once the financial year has ended. If you are leaving Australia permanently before 30 June, it can often be lodged early, before the year ends.',
  },
  {
    question: 'Which financial year does my tax return cover?',
    answer:
      'The Australian financial year runs from 1 July to 30 June, and each one needs its own return. If you worked from March 2025 to February 2026, that is two returns: 2024-25 for March to June 2025, and 2025-26 for July 2025 to February 2026.',
  },
  {
    question: 'Do you need my payslips?',
    answer:
      'No. Every employer who paid you through a payroll reported an income statement to the ATO, and that record is what a return is built from. Lost payslips and an employer who has shut down are normal starting points.\n\nThe only paperwork worth digging out is receipts for work expenses. If you do not have those, describe the work and we will tell you what is claimable without them.',
  },
  {
    question: 'What do I actually have to do?',
    answer:
      'Three things. Answer the questionnaire once, read the return we send back, and sign it. There is no government account to set up and no ATO form to interpret, because the return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.',
  },
  {
    question: 'Can my return be lodged after I have already left Australia?',
    answer:
      'Yes, and many of the returns we prepare belong to people already home in the UK, Germany or Japan. The questionnaire, the signature and the lodgement are all online.\n\nThe refund itself does not travel: the ATO can only pay it into an Australian bank account, while superannuation (DASP) can be paid overseas if your fund offers it. If your Australian account is already closed, tell us in the first message.',
  },
  {
    // Dec 2026 (plan 3): the myGov problem queries return only ATO pages and community threads.
    question: 'Can I get my tax refund without myGov?',
    answer:
      'Yes. myGov is only needed if you lodge the return yourself in myTax. The ATO also accepts a return lodged through a registered tax agent or on paper, and both work from outside Australia.\n\nWith us you never log in to myGov: we deal with the ATO directly, and the return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. What you still need is an Australian bank account for the refund.',
  },
  {
    question: 'My Australian bank account is closed. Can I still get my refund?',
    answer:
      'Often, yes, but not into an overseas account: the ATO only pays refunds into accounts located in Australia. A refund paid into a closed account is returned to the ATO by the Reserve Bank of Australia, which the ATO says can take up to 10 days, and is then re-issued to updated bank details or, if there are none, by cheque.\n\nThe ATO also says it may hold some cheque refunds for up to 90 days while it asks for bank details. Tell us at the start, so the bank details are sorted before the return is lodged rather than after.',
  },
  {
    question: 'What if my employer was not registered for working holiday makers?',
    answer:
      'The 15% rate depends on the employer being registered with the ATO as an employer of working holiday makers. If yours was not, tax was withheld at the foreign resident rate, which starts at 30 cents in the dollar. Your return is assessed at the working holiday maker rates, so the difference is settled when it is lodged.',
  },
  {
    question: 'What if I never lodged for an earlier year?',
    answer:
      'It can often still be lodged now. Each financial year stands on its own, with its own return, and the ATO record shows which years are still open.\n\nWhether a year ends in a refund or a balance owing depends on the facts of that year, and we will tell you which way yours looks.',
  },
  {
    question: 'What happens if the return says I owe money instead?',
    answer:
      'Occasionally it does, most often where income was invoiced under an ABN and nothing was withheld.\n\nYou see that figure before anything is lodged, with an explanation of where it came from and what the ATO payment options are. Nothing is sent without your signature.',
  },
  {
    question: 'Do working holiday makers have to lodge a tax return?',
    answer:
      'Usually, yes. If tax was withheld from your pay in Australia, you will generally need to lodge a return for that financial year, and a lodged return is the only way tax withheld at the wrong rate is settled. If you earned no Australian income at all in a year, there is nothing to lodge for it.',
  },
  {
    question: 'Can I do my working holiday tax return myself?',
    answer:
      'Yes. Lodging through myGov is free, and for a simple year, with one employer and your TFN on file from the first shift, it can be straightforward. Residency, the Medicare levy and deductions are the questions to take care over, because the form accepts whatever answer you give.',
  },
  {
    question: 'How much tax refund will I get on a working holiday visa?',
    answer:
      'Nobody can say before your ATO record has been read. A refund is the gap between what was withheld and what you owed, so it depends on whether any weeks were taxed at 45%, whether the Medicare levy was charged when it should not have been, and what your work lets you deduct. The calculator on this site gives an indicative figure on your own numbers.',
  },
  {
    question: 'What is backpacker tax?',
    answer:
      'Backpacker tax is the everyday name for the working holiday maker rates: 15% on the first $45,000 of income, then 30% up to $135,000, 37% up to $190,000 and 45% above $190,000. Whether those rates apply to your year depends on its facts and is for the ATO to decide.',
  },
  {
    question: 'Can I lodge my tax return before I leave Australia?',
    answer:
      'Only in one situation. If you are leaving Australia permanently before 30 June and will not earn any more Australian income that year, other than interest, dividends or royalties, the ATO accepts an early return before the year ends. An early return has to be lodged on paper, and the ATO says early lodgements take 50 business days to process.\n\nIf you leave without lodging, nothing is lost: the return can be lodged online after 30 June, from wherever you are, and is usually processed much faster.',
  },
  {
    question: 'Is a registered tax agent involved?',
    answer:
      'Yes. Working Holiday Tax operates under the supervision of a registered tax agent, and every return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.',
  },
]

const GUIDES = [
  {
    href: '/blog/diy-tax-return-vs-tax-agent-working-holiday',
    title: 'Doing it yourself or getting help',
    desc: 'Which years are simple enough to lodge alone.',
  },
  {
    href: '/blog/tax-return-deadline-31-october-working-holiday',
    title: 'The 31 October deadline',
    desc: 'Who it applies to, and what happens once it has passed.',
  },
  {
    href: '/blog/medicare-levy-working-holiday-makers',
    title: 'The Medicare levy on a working holiday',
    desc: 'When the 2% is yours to pay, and how the exemption works.',
  },
  {
    href: '/blog/how-to-lodge-tax-return-working-holiday',
    title: 'Lodging it yourself',
    desc: 'The steps on myGov, and what to check first.',
  },
  {
    href: '/blog/late-tax-return-penalty-working-holiday',
    title: 'A return lodged late',
    desc: 'What changes once a year has passed its deadline.',
  },
  {
    href: '/blog/how-long-does-tax-refund-take-australia',
    title: 'How long a refund takes',
    desc: 'From lodgement to the money in your account.',
  },
  {
    href: '/blog/how-to-lodge-tax-return-from-overseas',
    title: 'Lodging after you have left',
    desc: 'What still works from home, and the bank account rule that catches people out.',
  },
  {
    href: '/blog/tax-residency-working-holiday-makers',
    title: 'Tax residency and working holiday makers',
    desc: 'Why step 04 is looked at case by case.',
  },
  // Dec 2026 (plan 3, hub to spoke): existing guides the hub did not list, then the new problem guides.
  {
    href: '/blog/tax-back-australia-working-holiday',
    title: 'Getting your tax back, step by step',
    desc: 'From your last payslip to the refund in your account.',
  },
  {
    href: '/blog/amending-tax-return-australia',
    title: 'Fixing a return already lodged',
    desc: 'When an amendment is worth it, and how long it can wait.',
  },
  {
    href: '/blog/tax-obligations-after-leaving-australia',
    title: 'What is still owed after you leave',
    desc: 'The return, your super and the bank account, in order.',
  },
  {
    href: '/blog/mygov-problems-tax-return-super',
    title: 'myGov not working?',
    desc: 'Locked out, no SMS code abroad, or the ATO will not link.',
  },
  {
    href: '/blog/tax-refund-closed-australian-bank-account',
    title: 'A closed Australian bank account',
    desc: 'Where the refund goes, and how it is re-issued.',
  },
  {
    href: '/blog/ato-tax-return-status-meaning',
    title: 'What your ATO return status means',
    desc: 'Processing, under review, issued: what each one tells you.',
  },
]

/**
 * The neutral comparison for people still deciding (money audit, Nov 2026).
 * Different rows from the home page comparison, which is approved copy and is
 * not repeated here. No criticism of myGov or the ATO.
 */
const TWO_WAYS = [
  { left: 'Free.', right: 'A flat fee agreed on WhatsApp before any work starts, never a percentage of the refund.' },
  { left: 'A myGov account linked to the ATO, which needs an identity check.', right: 'Your passport and visa details, an Australian bank account and roughly where you worked.' },
  { left: 'Income statements pre-fill once each employer has finalised them.', right: 'Your ATO record is read and checked against every job you remember.' },
  { left: 'You answer the residency, working holiday maker income and Medicare levy questions yourself.', right: 'Each of those is reviewed against the facts of your year before anything is lodged.' },
  { left: 'You enter the deductions you know about.', right: 'We ask what your work involved, then claim what belongs to it.' },
  { left: 'You lodge it yourself, due 31 October after the year ends.', right: 'You read and sign it. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.' },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'en' })

export default function TaxReturnPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/tax-return#webpage`,
    url: `${SITE_URL}/tax-return`,
    name: 'Working holiday visa tax return (417 and 462)',
    description:
      'How an Australian tax return is lodged for a 417 or 462 working holiday visa holder: what we ask you for, what we check, how you sign it, and when the refund arrives.',
    inLanguage: 'en-AU',
    dateModified: '2026-11-24',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede', '.what-lede', '.key-figures'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/tax-return#service`,
    name: 'Working Holiday Tax Return Preparation',
    serviceType: 'Tax return preparation',
    description:
      'Australian tax returns for holders of 417 and 462 working holiday visas. Reviewed and signed off by a registered tax agent before lodgement with the ATO, including from overseas.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 and 462)' },
    availableLanguage: ['en', 'de', 'ja', 'fr', 'it', 'es'],
    inLanguage: 'en-AU',
  }

  // The seven steps, published as a machine readable procedure. This is the
  // page's own schema type: the homepage does not claim a HowTo.
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}/tax-return#howto`,
    name: 'How a working holiday tax return is lodged',
    description:
      'The order a 417 or 462 tax return is prepared and lodged in, from the first message to the refund arriving.',
    inLanguage: 'en-AU',
    step: SEQUENCE.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'en-AU',
    mainEntity: [
      ...FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
      // The visible problem section, not repeated in the accordion (r18 P1-1).
      {
        '@type': 'Question',
        name: REFUND_PROBLEMS_Q,
        acceptedAnswer: { '@type': 'Answer', text: REFUND_PROBLEMS_A, url: `${SITE_URL}/tax-return#refund-problems` },
      },
    ],
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tax return', item: `${SITE_URL}/tax-return` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(breadcrumbLd) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Home" current="Tax return" label="Breadcrumb" href="/" />
        <Hero
          title={<>Working holiday visa tax return <span style={{ whiteSpace: 'nowrap' }}>(417 &amp; 462)</span></>}
        >
          {/* Dec 2026: the H1 carries the target phrase; the slogan is kept as the subtitle. */}
          <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>Your details and where to deposit your refund. <Mark>We take it from there.</Mark></p>
          <div className="hero-lede" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Lead>A working holiday visa tax return is lodged for each Australian financial year (1 July to 30 June) you worked on a 417 or 462 visa. It settles the tax withheld against the tax you owed, and any refund usually lands about 14 business days after lodgement.</Lead>
            <Lead>No payslips, no myGov account, no form to decipher. One questionnaire and one signature, from Australia or from home.</Lead>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="en">Message us on WhatsApp</WaButton>
          <p className={heroStyles.note}>Replies in about an hour.</p>
          <GoogleRating variant="pill" lang="en" />
        </Hero>
      </div>

      <Section eyebrow="The short answer" title="What is a working holiday tax return?" titleId="what-title">
        <p className={blocks.text}>To get your tax back after a working holiday in Australia, you lodge a tax return for each financial year you worked. The ATO then pays any refund into an Australian bank account, usually about 14 business days after lodgement, and you can lodge from Australia or from home.</p>
        <p className={`${blocks.text} what-lede`}>A working holiday tax return is the Australian income tax return lodged by someone on a 417 or 462 working holiday visa (WHV). It covers one financial year, 1 July to 30 June, and settles the difference between the tax your employers withheld and the tax you actually owed for that year.</p>
        <p className={blocks.text}>If tax was withheld from your pay, you will usually need to lodge, and a lodged return is the only way tax withheld at the wrong rate is settled. The 2025-26 return was due on 31 October 2026 if you lodge it yourself. A late return can still be lodged, and earlier years you never lodged for can often still be lodged too. How far back you can go, and what the ATO needs, is in our guide to{' '}
          <Link href="/blog/past-years-tax-returns-working-holiday" className={blocks.textLink}>lodging past years&apos; tax returns</Link>.</p>
        <p className={blocks.text}>
          <Link href="/blog/backpacker-tax-rate-australia" className={blocks.textLink}>Backpacker tax</Link> is the everyday name for the working holiday maker rates: 15% on the first $45,000, then 30% up to $135,000, 37% up to $190,000 and 45% above that. You can lodge your own return through myGov, or have it prepared for you. Both routes are{' '}
          <a href="#two-ways" className={blocks.textLink}>compared below</a>.
        </p>
        <p className={blocks.small}>Last updated 24 November 2026.</p>
      </Section>

      {/* Dec 2026: question H2 worded as typed (Bing grounding query, 110 citations), answer first. */}
      <Section id="get-a-refund" tone="pale" eyebrow="Step by step" title="How do I get a tax refund on a working holiday visa?" titleId="get-refund-title">
        <p className={blocks.text}>To get a tax refund on a working holiday visa, you lodge an Australian tax return for each financial year you worked, once it ends on 30 June. The ATO compares the tax withheld with the tax you owed and pays any refund into an Australian bank account, usually about 14 business days after lodgement.</p>
        <ol className={blocks.text} style={{ paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <li><strong>Wait for the year to end.</strong> A return covers 1 July to 30 June and can be lodged from 1 July. Leaving Australia permanently before 30 June is the one case for an early return, on paper only.</li>
          <li><strong>Check your income statements.</strong> Each employer reports one to the ATO, visible in ATO online services through myGov. One not marked tax ready is one your employer has not finished.</li>
          <li><strong>Lodge the return.</strong> The ATO accepts it online through myTax, through a registered tax agent, or on paper, from Australia or from overseas.</li>
          <li><strong>Keep an Australian bank account open.</strong> The ATO only pays refunds into accounts located in Australia, so close yours only after the money has landed.</li>
          <li><strong>Wait for the notice of assessment.</strong> The ATO says most online returns process within 10 business days, and the assessment shows whether you get money back or owe some.</li>
        </ol>
        <p className={blocks.small}>
          Source: ATO,{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return" target="_blank" rel="noopener" className={blocks.textLink}>how to lodge your tax return</a>,{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia" target="_blank" rel="noopener" className={blocks.textLink}>lodge your tax return from outside Australia</a> (the Australian bank account for refunds) and{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return" target="_blank" rel="noopener" className={blocks.textLink}>check the progress of your tax return</a>, checked November 2026.
        </p>
        <p className={blocks.text}>Rather not do steps 2 to 5 yourself? That is the service on this page: you answer one questionnaire and sign, and <a href="#how-it-works" className={blocks.textLink}>the seven steps below</a> are the order it happens in.</p>
      </Section>

      {/* Dec 2026: late and past-years returns grow after 31 October (late cluster about 244 impressions at 23.8). */}
      <Section id="missed-deadline" eyebrow="Late or earlier years" title="Missed 31 October, or never lodged an earlier year?" titleId="missed-deadline-title">
        <p className={blocks.text}>You can still lodge. The 31 October deadline applies if you lodge yourself, so the 2025-26 return was due on 31 October 2026, but there is no cut off date for a return that was never filed. The ATO says it generally does not issue a failure to lodge penalty when a late return results in a refund or nil result, with exceptions such as a penalty applied before you lodged.</p>
        <p className={blocks.text}>Where a late return produces a debt, the penalty is one penalty unit for each 28 days overdue, capped at five units, and a unit is $364 from 1 July 2026. Earlier years from 2016 onwards can go in through myTax, each year as its own return, and any refund still goes only to an Australian bank account.</p>
        <div style={{ overflowX: 'auto' }} tabIndex={0} role="region" aria-label="Table, scrolls sideways">
          <table className={blocks.text} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <caption className={blocks.small} style={{ textAlign: 'left', captionSide: 'top', paddingBottom: 10 }}>
              Your working holiday dates and the returns they need. One return per financial year (1 July to 30 June), due 31 October after the year ends if you lodge yourself; a late return can still be lodged. Leaving Australia for good before 30 June is the one case for an early return, on paper. Checked against ato.gov.au, November 2026.
            </caption>
            <thead>
              <tr>
                <th scope="col" style={cellStyle}>You worked</th>
                <th scope="col" style={cellStyle}>Returns that cover it</th>
                <th scope="col" style={cellStyle}>Due if you lodge yourself</th>
                <th scope="col" style={cellStyle}>Can it still be lodged?</th>
              </tr>
            </thead>
            <tbody>
              {RETURNS_BY_DATES.map((r) => (
                <tr key={r.worked}>
                  <th scope="row" style={cellStyle}>{r.worked}</th>
                  <td style={cellStyle}>{r.returns}</td>
                  <td style={cellStyle}>{r.due}</td>
                  <td style={cellStyle}>{r.still}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={blocks.text}>
          How far back you can go and what the ATO needs for each year:{' '}
          <Link href="/blog/past-years-tax-returns-working-holiday" className={blocks.textLink}>tax returns for past years after a working holiday</Link>. How the penalty builds up:{' '}
          <Link href="/blog/late-tax-return-penalty-working-holiday" className={blocks.textLink}>the late tax return penalty</Link>.
        </p>
        <p className={blocks.small}>
          Source: ATO,{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/paying-the-ato/interest-and-penalties/penalties/failure-to-lodge-on-time-penalty" target="_blank" rel="noopener" className={blocks.textLink}>failure to lodge on time penalty</a> and{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-a-prior-year-tax-return" target="_blank" rel="noopener" className={blocks.textLink}>lodge a prior year tax return</a>, checked November 2026.
        </p>
        <WaButton href={waUrl({ topic: 'tax-return', lang: 'en', detail: 'missed the deadline or earlier years' })} position="section" topic="tax-return" lang="en">Ask which of your years are still open</WaButton>
      </Section>

      {/* Dec 2026 (plan 3): problem answers on the money page, visible and anchored (r15 P1-2, r18 P1-1). */}
      <Section id="refund-problems" tone="pale" eyebrow="When something is in the way" title={REFUND_PROBLEMS_Q} titleId="refund-problems-title">
        <p className={blocks.text}>{REFUND_PROBLEMS_A} Each row gives the official rule and what to do about it.</p>
        <div style={{ overflowX: 'auto' }} tabIndex={0} role="region" aria-label="Table, scrolls sideways">
          <table className={blocks.text} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <caption className={blocks.small} style={{ textAlign: 'left', captionSide: 'top', paddingBottom: 10 }}>
              What holds a working holiday tax refund up, the official rule, and the fix.
            </caption>
            <thead>
              <tr>
                <th scope="col" style={cellStyle}>Problem</th>
                <th scope="col" style={cellStyle}>What the official rule says</th>
                <th scope="col" style={cellStyle}>What to do</th>
              </tr>
            </thead>
            <tbody>
              {REFUND_PROBLEMS.map((p) => (
                <tr key={p.problem}>
                  <th scope="row" style={cellStyle}>{p.problem}</th>
                  <td style={cellStyle}>{p.rule}</td>
                  <td style={cellStyle}>{p.todo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={blocks.small}>
          Sources: my.gov.au,{' '}
          <a href="https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help" target="_blank" rel="noopener" className={blocks.textLink}>myGov sign in help</a>; ATO,{' '}
          <a href="https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato" target="_blank" rel="noopener" className={blocks.textLink}>create a myGov account and link it to the ATO</a>; myID,{' '}
          <a href="https://www.myid.gov.au/verifying-your-id-in-myid" target="_blank" rel="noopener" className={blocks.textLink}>verifying your ID</a>; ATO,{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds" target="_blank" rel="noopener" className={blocks.textLink}>missing tax return refunds</a>,{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return" target="_blank" rel="noopener" className={blocks.textLink}>how to track the progress of your tax return</a> and{' '}
          <a href="https://www.ato.gov.au/about-ato/contact-us" target="_blank" rel="noopener" className={blocks.textLink}>contact us</a>. Checked November 2026.
        </p>
        <p className={blocks.text}>
          You do not need myGov for us to help. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Every myGov problem, with its fix, is in{' '}
          <Link href="/blog/mygov-problems-tax-return-super" className={blocks.textLink}>myGov not working? Fixes for your tax return and super</Link>.
        </p>
        <WaButton href={waUrl({ topic: 'tax-return', lang: 'en', detail: 'something is holding up my refund' })} position="section" topic="tax-return" lang="en">Tell us what is in the way</WaButton>
      </Section>

      <Section id="key-figures" eyebrow="Key figures" title="Working holiday tax return key figures for 2025-26" titleId="key-figures-title">
        <div style={{ overflowX: 'auto' }} tabIndex={0} role="region" aria-label="Table, scrolls sideways">
          <table className={`${blocks.text} key-figures`} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <caption className={blocks.small} style={{ textAlign: 'left', captionSide: 'top', paddingBottom: 10 }}>
              The figures a 417 or 462 tax return turns on. Checked against ato.gov.au and servicesaustralia.gov.au, November 2026.
            </caption>
            <thead>
              <tr>
                <th scope="col" style={cellStyle}>What</th>
                <th scope="col" style={cellStyle}>Figure</th>
                <th scope="col" style={cellStyle}>Source</th>
              </tr>
            </thead>
            <tbody>
              {KEY_FIGURES.map((k) => (
                <tr key={k.what}>
                  <th scope="row" style={cellStyle}>{k.what}</th>
                  <td style={cellStyle}>{k.figure}</td>
                  <td style={cellStyle}>{k.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <PhotoFrame page="tax-return" locale="en" />

      <Section tone="pale" eyebrow="Where a refund comes from" title="Backpacker tax refund explained" titleId="refund-title">
        <p className={`${blocks.text} ${blocks.muted}`}>A backpacker tax refund, or working holiday tax refund, is not a bonus for being a backpacker. It is the gap between what your employers withheld and what you actually owed, and on a working holiday year that gap usually comes from the places below. Refunds for our clients range from a few hundred dollars to several thousand, depending on which of them applied.</p>
        <div className={blocks.cards}>
          {REFUND_SOURCES.map((r) => (
            <div key={r.label} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
              {r.href && <Link href={r.href} className={blocks.textLink}>{r.linkText}</Link>}
            </div>
          ))}
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          None of these is automatic and none is assumed. Each one is checked against your ATO record before anything is lodged.{' '}
          <Link href="/calculator" className={blocks.textLink}>See an indicative estimate in the calculator</Link>.
        </p>
      </Section>

      <Section eyebrow="Before you message anyone" title="How much tax will I get back?" titleId="how-much-title">
        <p className={blocks.text}>Nobody can give you a figure before your ATO record has been read. What you get back is what was withheld minus the tax you actually owed for the year, so it turns on the weeks taxed at 45%, the Medicare levy and the deductions your work allows.</p>
        <p className={blocks.text}>
          To claim tax back you lodge a return for that year; there is no separate refund application. For an indicative figure on your own numbers, use the{' '}
          <Link href="/calculator" className={blocks.textLink}>working holiday tax calculator</Link>, then send us the towns and months and we will tell you which of the items above apply.
        </p>
      </Section>

      <Section eyebrow="Your side of it" title="What we need from you" titleId="needed-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Three things, and that is the list.</p>
        <PlainRows items={NEEDED} />
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>You do not need payslips.</p>
          <p className={blocks.text}>Every employer who put you on a payroll has already reported an income statement against your tax file number, and that is what a return is built from. Receipts for work expenses are the one thing worth looking for, and if there are none, tell us what the work involved instead.</p>
        </div>
      </Section>

      <Section id="two-ways" tone="pale" eyebrow="Deciding" title="Two ways to lodge a working holiday tax return" titleId="two-ways-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Both are legitimate. Which suits you depends on how simple your year was.</p>
        <Compare rows={TWO_WAYS} leftLabel="Lodging it yourself on myGov" rightLabel="With Working Holiday Tax" />
        <p className={blocks.text}>Doing it yourself suits a simple year: one employer registered for working holiday makers, your TFN on file from the first shift, no ABN income and no Medicare levy question.</p>
        <p className={blocks.text}>
          Help is worth more when the year was irregular: weeks at 45% before your TFN arrived, several employers, ABN income, a departure part way through the year, or a Medicare levy exemption to claim.{' '}
          <Link href="/blog/diy-tax-return-vs-tax-agent-working-holiday" className={blocks.textLink}>The full comparison</Link>.
        </p>
        <p className={blocks.text}>Not sure which side of the table your year falls on? Send the towns you worked in, roughly which months, and whether you ever invoiced under an ABN, and we will tell you which way suits it, even if the answer is myGov.</p>
        <WaButton href={waUrl({ topic: 'tax-return', lang: 'en', detail: 'not sure whether to lodge it myself' })} position="section" topic="tax-return" lang="en">Ask which way suits your year</WaButton>
      </Section>

      <Section title="Two rules change the order you do this in" titleId="rules-title">
        <div className={blocks.cards}>
          {RULES.map((r) => (
            <div key={r.label} className={`${blocks.palePanel} ${blocks.stack}`}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
        <p className={blocks.text}>
          Leaving Australia for good? Your super is a separate claim, and a fund that offers international transfers can pay it overseas:{' '}
          <Link href="/superannuation" className={blocks.textLink}>how the DASP works</Link>.
        </p>
      </Section>

      <Section id="how-it-works" tone="pale" eyebrow="The sequence" title="The order it happens in" titleId="sequence-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Seven steps. You appear in two of them, at the start and again to sign.</p>
        <Steps items={SEQUENCE} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          More on step 04:{' '}
          <Link href="/abn" className={blocks.textLink}>what an ABN changes</Link>{' '}if any of your income was invoiced rather than paid through a payroll.
        </p>
      </Section>

      <Section tone="amber" title="Our guarantee" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies. The guarantee covers returns with TFN income only.
        </p>
        <p className={blocks.text}>Nothing is ever taken out of what the ATO sends you. The amount is settled with you on WhatsApp before step 01.</p>
      </Section>

      <Section tone="pale" title="Working holiday tax is the only thing we do." titleId="trust-title">
        <p className={blocks.text}>The questionnaire, the checks and the order above were built around one visa year and nothing else. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.</p>
        <p className={blocks.small}>
          Working Holiday Tax operates under the supervision of a registered tax agent, Tax Agent Number {AGENT_TPB}.{' '}
          <a href={`https://www.tpb.gov.au/registrations_search?number=${AGENT_TPB}`} className={blocks.textLink} target="_blank" rel="noopener noreferrer">Check it on the Tax Practitioners Board register</a>.
        </p>
        <GoogleReviewsServer lang="en" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Nobody legitimate will ask you for your myGov password.</strong>{' '}
          We never ask for it, because the lodgement route above does not use it. If a message asks for those details, it did not come from us.
        </p>
      </Section>

      <Section eyebrow="What people ask before they send anything" title="Working holiday tax return questions" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
        <p className={blocks.text}>
          Your question is not here? <WaLink href={WA_TR} position="inline" topic="tax-return" lang="en" className={blocks.textLink}>Ask it on WhatsApp</WaLink> and you will get a straight answer before anything else happens.
        </p>
      </Section>

      <Section tone="pale" eyebrow="Guides" title="The longer version of the hard steps" titleId="guides-title">
        <LinkRows items={GUIDES} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          Passport by passport:{' '}
          <Link href="/uk-working-holiday-tax" className={blocks.textLink}>UK passport holders</Link> and{' '}
          <Link href="/german-working-holiday-tax" className={blocks.textLink}>German passport holders</Link>.
        </p>
      </Section>

      <Section eyebrow="What is next" title="Do not leave your super behind" titleId="next-title">
        <p className={blocks.text}>Your employer paid superannuation on top of your wages while you worked here. When you leave Australia for good it can be claimed, separately from the return.</p>
        <LinkButton href="/superannuation">How the super claim works →</LinkButton>
        <p className={blocks.text}>
          Leaving soon, or already home? The tax return and the super claim, in the order that works, are on one page:{' '}
          <Link href="/leaving-australia" className={blocks.textLink}>leaving Australia, before and after you go</Link>.
        </p>
      </Section>

      <Section tone="forest" title="Start with a message, not a form" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Send the towns you worked in, roughly which months, and whether you ever invoiced under an ABN. That is enough to say which years are open and what your side looks like. Two years since you flew home makes no difference.</p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="en" tone="light">Message us on WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Replies in about an hour.</p>
      </Section>

      <MobileCta href={WA_TR} lang="en" topic="tax-return" />
    </>
  )
}
