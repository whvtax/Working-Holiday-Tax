/**
 * Home page copy (English), as locked in the "Student Visa Tax: final design"
 * canvas. Chinese and Vietnamese versions are written natively in milestone 6;
 * keep the shape identical so the page can switch dictionaries.
 *
 * Wording rules (CLAUDE.md): supervision wording only, no AI, no refund promise.
 */
import type { ChatStep } from '@/components/svt/ChatThread'
import type { DocketRow } from '@/components/svt/Docket'
import type { FaqItem } from '@/components/svt/Faq'

export const homeEn = {
  meta: {
    title: 'International student tax returns',
    description: 'Tax returns for 500 and 485 visa holders: $220, or $385 with ABN work, incl. GST. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.',
  },
  hero: {
    titleBefore: 'Tax returns for ',
    titleMark: 'student visas',
    lead: 'For 500 and 485 visa holders. All on WhatsApp and one short online form. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.',
    price: { amount: '$220', unit: 'per return', sub: '$385 with ABN work. GST included.' },
    cta: 'Start your return on WhatsApp',
  },
  priceCheck: { title: 'Which price fits me?' },
  guarantee: {
    title: 'If your refund is smaller than our fee, we pay you the difference',
    docketLabel: 'Example: fee $220, refund $150, we send you back $70',
    docket: [
      { label: 'Our fee', value: '$220' },
      { label: 'Your refund', value: '$150' },
      { label: 'We send you back', value: '$70', total: true },
    ] satisfies DocketRow[],
    terms: 'We pay it once the ATO issues your notice of assessment. If there is no refund, or you owe tax, the full fee applies.',
    why: 'Claiming the tax-free threshold from two jobs, or delivery work on an ABN, are the usual reasons a student owes tax.',
    cta: 'Message us on WhatsApp',
  },
  flow: {
    title: 'From first message to lodged',
    label: 'Example conversation, step by step',
    steps: [
      { from: 'them', text: 'You message us on WhatsApp and we confirm your price.' },
      { from: 'us', text: 'You pay by bank transfer to The Accounting Academy and send us a screenshot.' },
      { from: 'them', text: 'You fill in a short online form.' },
      { from: 'us', text: 'We review everything within about 24 hours and send your estimate.' },
      { from: 'them', text: 'You sign online.' },
      { from: 'us', text: 'Your return is lodged with the ATO.' },
    ] satisfies ChatStep[],
    note: 'Example, not a real chat.',
  },
  payslip: {
    title: 'Your payslip, line by line',
    lead: 'Tap a line. Sample payslip, made-up employer.',
  },
  story: {
    title: 'Only student visas',
    lead: 'Student Visa Tax does tax returns for people on student and graduate visas, and nothing else. So we already know the questions you are about to ask.',
    points: [
      'A course of 6 months or more, and what that does to your tax.',
      'The Medicare Entitlement Statement, which you have to apply for yourself.',
      'Two casual jobs at once, and why that can leave you owing.',
      'Uber Eats or DoorDash on an ABN.',
      'Finishing your course, going home, and what happens to your super.',
    ],
    languages: 'Ask us in English, 中文 or Tiếng Việt.',
  },
  faq: {
    title: 'Questions',
    items: [
      { q: 'Do I need to lodge a tax return?', a: 'Usually yes, if you worked in Australia and tax was taken from your pay. If too much tax was taken, lodging is how you get it back. Sometimes it shows you owe tax.' },
      { q: 'Am I a tax resident on a student visa?', a: 'If your course is 6 months or longer, you may be a resident for tax purposes. Residents get the $18,200 tax-free threshold, or part of it in the year you arrive or leave. We check this for you before anything is lodged.' },
      { q: 'Do I pay the Medicare levy?', a: 'If you are a resident for tax purposes and on overseas student health cover, you can usually claim an exemption. You need a Medicare Entitlement Statement, and we tell you how to get one.' },
      { q: 'I deliver for Uber Eats. Is that different?', a: 'Yes. Delivery apps pay you as a business, using an ABN (Australian business number), so no tax is taken out. That income goes on your return as business income, minus your work costs. That return is $385.' },
      { q: 'I am leaving Australia. What happens to my tax and super?', a: 'You can still lodge from overseas, and we can help you claim your super once you have left.' },
      { q: 'Can I do it myself, or get free help?', a: 'Yes. You can lodge yourself online with myTax. If you earn around $70,000 or less and your return is simple, the ATO Tax Help program and some university clinics can help for free. Students usually come to us to have residency, the Medicare levy exemption, two jobs or ABN delivery work checked.' },
    ] satisfies FaqItem[],
  },
  images: {
    hero: { id: 'IMG-01', subject: 'student on a café shift', alt: 'A student in a café apron behind the counter during a shift' },
    flow: { id: 'IMG-02', subject: 'delivery bike at night', alt: 'A delivery rider\'s bike with an insulated bag, parked on a city street at night' },
  },
} as const

/** The shape every language's home copy follows (zh and vi in home-zh.ts,
 *  home-vi.ts). */
export interface HomeCopy {
  meta: { title: string; description: string }
  hero: { titleBefore: string; titleMark: string; titleAfter?: string; lead: string; price: { amount: string; unit: string; sub: string }; cta: string }
  priceCheck: { title: string }
  guarantee: { title: string; docketLabel: string; docket: readonly DocketRow[]; terms: string; why: string; cta: string }
  flow: { title: string; label: string; steps: readonly ChatStep[]; note: string }
  payslip: { title: string; lead: string }
  story: { title: string; lead: string; points: readonly string[]; languages: string }
  faq: { title: string; items: readonly FaqItem[] }
  images: { hero: { id: string; subject: string; alt: string }; flow: { id: string; subject: string; alt: string } }
}

// Compile-time check that the English copy has the shared shape.
const _shape: HomeCopy = homeEn
void _shape
