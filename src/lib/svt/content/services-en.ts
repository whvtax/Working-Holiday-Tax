/**
 * English service hubs (round 4, svt-core): the TFN hub (/tfn, new) and the
 * DASP hub (/superannuation, rebuilt answer-first). They use the guide shape
 * and the guide template, so they look and behave like every other guide.
 *
 * /superannuation keeps its slug; in English this text replaces the guide
 * entry of the same slug (the Chinese and Vietnamese pages still come from
 * guides-zh.ts and guides-vi.ts until their own rebuild). /tfn exists in
 * English only for now, so it carries no hreflang alternates.
 *
 * Facts, checked on ato.gov.au on 5 Nov 2026:
 *   DASP: tax-free component nil; taxed element 35%; untaxed element 45%;
 *     65% on the taxable component if the super includes working holiday
 *     maker time; "generally paid within 28 days of your completed
 *     application being received"; online application free of charge;
 *     can be started in Australia, submitted only after leaving with no
 *     active visa; unclaimed super goes to the ATO 6 months after leaving.
 *   TFN: free; online for people in Australia with a valid work rights visa
 *     (not 8101, 8103, 8116); no documents sent; posted to the Australian
 *     address "within 28 days"; do not apply again while waiting; after 28
 *     days contact the ATO with the receipt ID. A payee who has applied has
 *     28 days to give the employer the TFN, then top rate withholding.
 *
 * Wording rules as in guides-en.ts: approved agent wording only, no AI, no
 * refund promises, residency is "may be", sentence case headings.
 */
import { GUIDES_EN, type GuideContent } from './guides-en'

const ATO = 'https://www.ato.gov.au'
const ATO_DASP = `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp`

export const TFN_HUB_EN: GuideContent = {
  slug: 'tfn',
  published: '2026-11-05', updated: '2026-11-05',
  label: 'TFN',
  meta: {
    title: 'TFN for international students: apply free with the ATO',
    description: 'How students on a 500 visa apply for a tax file number online with the ATO for free, starting work before it arrives, and what to do after 28 days.',
  },
  h1: { before: 'Your ', mark: 'tax file number', after: ' on a student visa' },
  lead: 'A tax file number (TFN) is your personal number for tax and super in Australia, and it stays yours for life. If your visa lets you work and you are in Australia, you can apply online with the ATO for free.',
  short: {
    answer: 'If your visa lets you work and you are in Australia, you can apply for a tax file number (TFN) online with the ATO, free, using your passport. You send no documents. The ATO says your TFN should arrive by post within 28 days of a completed application.',
    mark: 'online with the ATO, free',
    facts: [
      { figure: '$0', label: 'to apply with the ATO' },
      { figure: '28 days', label: 'for the TFN to arrive by post, says the ATO' },
    ],
  },
  sections: [
    {
      id: 'who',
      title: 'Who can apply online',
      blocks: [
        { p: 'The ATO online application is for people who are in Australia and hold a visa with work rights. A student visa (500) or a graduate visa (485) usually allows work. A visa with a no work condition (8101, 8103 or 8116) cannot use the online application.' },
        { list: [
          'You are in Australia on the day you apply.',
          'Your visa allows you to work and is linked to your passport.',
          'You have an Australian postal address where you will be for the next few weeks.',
        ] },
        { note: 'Not in Australia yet? The online application only works once you are here, so most students apply in their first weeks, often before their first shift.' },
      ],
    },
    {
      id: 'steps',
      title: 'How to apply, step by step',
      blocks: [
        { list: [
          'Open the ATO page for permanent migrants and temporary visitors and start the online application.',
          'Enter your passport details exactly as they appear in your passport.',
          'Give an Australian postal address where you can collect a letter.',
          'Submit the application and keep the receipt ID shown at the end.',
          'Wait for the letter. Do not apply a second time while you wait: the ATO says it can slow things down.',
        ] },
      ],
    },
    {
      id: 'not-arrived',
      title: 'If your TFN has not arrived after 28 days',
      blocks: [
        { p: 'Contact the ATO and give them the receipt ID from your application. If you have moved since you applied, tell them your new address. Do not send a second application.' },
      ],
    },
    {
      id: 'working',
      title: 'Starting work before your TFN arrives',
      blocks: [
        { p: 'You can start a job before the number arrives. Tell your employer you have applied. Once you have applied, you have 28 days to give your employer your TFN, and during that time tax is taken at the normal rate. If the employer still does not have it after 28 days, they must take tax at the top rate.' },
        { note: 'A student visa limits how many hours you can work while your course is in session. Check your visa conditions with Home Affairs before you take extra shifts.' },
      ],
    },
    {
      id: 'declaration',
      title: 'The TFN declaration and the tax-free threshold',
      blocks: [
        { p: 'When you start a job, you fill in a TFN declaration for your employer. It asks for your TFN, whether you are an Australian resident for tax purposes, and whether you claim the tax-free threshold.' },
        { p: 'A student may be a resident for tax purposes, usually when the course is 6 months or longer, but it depends on your situation and the ATO makes the final decision. Claim the tax-free threshold from one employer only: with two jobs, claiming it twice usually means too little tax is taken and you may owe tax after 30 June.' },
      ],
    },
    {
      id: 'tfn-or-abn',
      title: 'TFN or ABN: which one you need',
      blocks: [
        { p: 'Everyone who works in Australia needs a TFN. You need an ABN as well only if you work for yourself, for example delivering for Uber Eats or DoorDash. A normal job with payslips needs only your TFN.' },
      ],
    },
    {
      id: 'safe',
      title: 'Keep your TFN safe',
      blocks: [
        { p: 'Your TFN stays the same for life, even when you change visa. Give it to your employer, your bank, your super fund, the ATO and whoever prepares your tax return, and to no one else. Never post it online or send it to someone who contacts you out of the blue.' },
      ],
    },
    {
      id: 'with-us',
      title: 'Where we come in',
      blocks: [
        { p: 'Applying for a TFN is free and you do it yourself with the ATO; we do not charge for it, and you can ask us questions about it at no cost. After 30 June your TFN is what your tax return is built on. Student Visa Tax prepares tax returns for 500 and 485 visa holders, and every return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.' },
      ],
    },
  ],
  faq: [
    { q: 'Is it free to apply for a TFN?', a: 'Yes. The ATO does not charge for a TFN. Be careful with websites that ask for a fee to apply for you.' },
    { q: 'Can I apply for a TFN before I arrive in Australia?', a: 'Not online. The ATO online application is for people who are in Australia with a visa that allows work, so most students apply in their first weeks here.' },
    { q: 'Can I work without a TFN?', a: 'For a short time, yes. Tell your employer you have applied. You then have 28 days to give them the number before they must take tax at the top rate.' },
    { q: 'Do I need a new TFN when I move to a 485 visa?', a: 'No. Your TFN stays the same for life. Keep using the same number with your employer, your super fund and the ATO.' },
    { q: 'I lost my TFN. Should I apply again?', a: 'No. Look for it in your ATO online account, on a notice of assessment, an income statement, an ATO letter or a super statement. If you cannot find it, contact the ATO.' },
    { q: 'What documents do I need to apply for a TFN?', a: 'If you are in Australia on a visa with work rights, you send no documents: you enter your passport details and the ATO checks them electronically. You also need an Australian postal address where you can collect a letter.' },
    { q: 'How long does a TFN take to arrive?', a: 'The ATO says your TFN should arrive by post within 28 days of a completed application. If it has not arrived after 28 days, contact the ATO with your receipt ID instead of applying again.' },
  ],
  sources: [
    { label: 'ATO: Permanent migrants and temporary visitors, TFN application', href: `${ATO}/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application` },
    { label: 'ATO: Apply for a TFN', href: `${ATO}/individuals-and-families/tax-file-number/apply-for-a-tfn` },
    { label: 'ATO: TFN declaration, payer information and obligations', href: `${ATO}/forms-and-instructions/tfn-declaration/payer-information-and-obligations` },
  ],
  related: [
    'blog/apply-for-tfn-student-visa',
    'blog/how-long-does-a-tfn-take-students',
    'blog/tfn-application-delayed-students',
    'blog/working-before-tfn-arrives-international-students',
    'blog/tfn-declaration-two-jobs',
    'blog/tfn-vs-abn-international-students',
    'blog/find-lost-tfn-international-students',
    'blog/tfn-scams-international-students',
    'pricing',
  ],
}

export const SUPERANNUATION_HUB_EN: GuideContent = {
  slug: 'superannuation',
  published: '2026-10-26', updated: '2026-11-05',
  label: 'Super (DASP)',
  meta: {
    title: 'Claim super after leaving Australia: DASP for students',
    description: 'Claim super after leaving Australia on a student or graduate visa: who can claim a DASP, how to apply online free, the 35% and 45% tax, and the 28 days.',
  },
  h1: { before: 'Claim your super after you leave: ', mark: 'the DASP' },
  lead: 'A departing Australia superannuation payment (DASP) is how you get your Australian super paid out after you leave. The tax on a departing Australia superannuation payment is usually 35% on the taxed element, 45% on any untaxed element and nothing on the tax-free component.',
  short: {
    answer: 'Once you have left Australia and your visa has ended, you can claim your super as a departing Australia superannuation payment (DASP). Your fund takes the tax out first: usually 35% on the taxed element, 45% on any untaxed element and 0% on the tax-free component. The ATO says a DASP is generally paid within 28 days of a completed application.',
    mark: 'usually 35% on the taxed element',
    facts: [
      { figure: '35%', label: 'taxed element, the usual rate if you never held a working holiday visa' },
      { figure: '45%', label: 'untaxed element' },
      { figure: '28 days', label: 'usual ATO payment time from a completed application' },
    ],
  },
  sections: [
    {
      id: 'eligible',
      title: 'Who can claim a DASP',
      blocks: [
        { p: 'The ATO says you can generally claim a DASP when all of these apply:' },
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
      title: 'DASP tax rates',
      blocks: [
        { p: 'Your fund works out the parts of your balance and takes the tax before paying you. If you have never held a working holiday visa, the ATO rates are:' },
        { list: [
          'Tax-free component: 0%.',
          'Taxable component, taxed element: 35%. This is most super an employer pays.',
          'Taxable component, untaxed element: 45%.',
        ] },
        { note: 'If any of the super comes from time on a working holiday visa (417 or 462), the ATO rate is 65% on the taxable component, taxed and untaxed elements alike. The tax-free component stays at 0%.' },
      ],
    },
    {
      id: 'apply',
      title: 'How to apply online, free with the ATO',
      blocks: [
        { list: [
          'Find every super account you have: log in to each fund, or check ATO online services in myGov before you leave.',
          'Start the DASP online application on the ATO site. You can start and save it while you are still in Australia.',
          'Submit it once you have left Australia and your visa has ended. It cannot be submitted before then.',
          'Your fund checks the claim and pays the balance, less the tax, to the bank account you give.',
        ] },
        { note: 'The ATO online application is free of charge. You never need to pay to claim your own super.' },
      ],
    },
    {
      id: 'documents',
      title: 'Documents you need',
      blocks: [
        { list: [
          'Your passport and visa details, including the date your visa ended.',
          'The name of each super fund and your member number.',
          'The bank account where the fund should pay you.',
          'For a balance of $5,000 or more, the fund may ask for certified copies of your identity documents.',
        ] },
      ],
    },
    {
      id: 'timing',
      title: 'How long it takes',
      blocks: [
        { p: 'The ATO says a DASP is generally paid within 28 days of your completed application being received. It can take longer if the application is incomplete or the fund asks for more documents.' },
      ],
    },
    {
      id: 'six-months',
      title: 'If you wait more than 6 months',
      blocks: [
        { p: 'Six months after you leave, once your visa has ended, your fund sends unclaimed super to the ATO. It is not lost: you can still claim it from the ATO.' },
      ],
    },
    {
      id: 'graduate-visa',
      title: 'Moving to a 485 visa',
      blocks: [
        { p: 'You cannot claim while you hold any active Australian visa, including a 485 graduate visa or a bridging visa. Your super stays in your fund until you leave and your visa ends.' },
      ],
    },
    {
      id: 'with-us',
      title: 'Claiming with us',
      blocks: [
        { p: 'The ATO online application is free. If you would rather have help, we check your funds, your visa dates and the forms with you, and we confirm the price on WhatsApp before you pay.' },
        { p: 'Your last tax return is separate from your super. It covers your pay up to the day you leave and is lodged after 30 June, from wherever you are.' },
      ],
    },
  ],
  faq: [
    { q: 'How much tax is taken from a departing Australia superannuation payment?', a: 'If you never held a working holiday visa, usually 35% of the taxed element, 45% of any untaxed element and nothing on the tax-free component. Your fund works out the split and takes the tax before it pays you.' },
    { q: 'How long does a DASP take?', a: 'The ATO says a DASP is generally paid within 28 days of a completed application. Missing documents make it slower.' },
    { q: 'Can I claim my super while I am still in Australia?', a: 'No. You can start the application before you leave, but it can only be submitted once you have left Australia and your visa has ended.' },
    { q: 'I am moving to a 485 graduate visa. Can I claim my super now?', a: 'No. You cannot claim it while you hold any active Australian visa, including a 485. Your super stays in your fund until you leave and your visa ends.' },
    { q: 'Is my super lost if I forget to claim it?', a: 'No. Six months after you leave, once your visa has ended, the fund sends it to the ATO as unclaimed super, and you can still claim it from the ATO.' },
    { q: 'Do I have to pay to apply for a DASP?', a: 'No. The ATO online application is free, and you never need to pay to claim your own super. If you would rather have help, we confirm the price on WhatsApp before you pay.' },
    { q: 'How do I apply for a DASP online?', a: 'Find every super account you have, then start the free DASP online application on the ATO site; you can save it while you are still in Australia. Submit it once you have left and your visa has ended, and your fund pays the balance, less the tax, to the bank account you give.' },
    { q: 'Is a DASP the same as the tax refund at the airport?', a: 'No. A DASP pays out your super after you leave, while the Tourist Refund Scheme at the airport refunds GST on goods you take with you. Your yearly tax return is a third, separate thing.' },
  ],
  sources: [
    { label: 'ATO: Departing Australia superannuation payment (DASP)', href: ATO_DASP },
  ],
  related: [
    'blog/dasp-tax-rate-international-students',
    'blog/dasp-documents-and-timing',
    'blog/how-long-does-dasp-take-international-students',
    'blog/find-and-check-your-super',
    'blog/what-happens-to-unclaimed-super-international-students',
    'blog/dasp-documents-checklist-international-students',
    'blog/tourist-refund-scheme-international-students',
    'leaving-australia',
  ],
}

/** English hubs, by slug. */
export const SERVICE_HUBS_EN: readonly GuideContent[] = [TFN_HUB_EN, SUPERANNUATION_HUB_EN]

/** Hubs that exist in English only (no /zh or /vi page yet). */
export const EN_ONLY_HUBS: readonly string[] = SERVICE_HUBS_EN.filter(h => !GUIDES_EN.some(g => g.slug === h.slug)).map(h => h.slug)

export const serviceHubEn = (slug: string) => SERVICE_HUBS_EN.find(h => h.slug === slug)

/** Every English guide as it is served: the guide list with the hubs
 *  replacing their guide of the same slug, then the English-only hubs. */
export function liveGuidesEn(): readonly GuideContent[] {
  return [
    ...GUIDES_EN.map(g => serviceHubEn(g.slug) ?? g),
    ...SERVICE_HUBS_EN.filter(h => EN_ONLY_HUBS.includes(h.slug)),
  ]
}
