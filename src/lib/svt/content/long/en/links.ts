/**
 * Onward links for the long-form articles (round 4, 5 Nov 2026).
 *
 * Bodies cannot carry links (see ../types.ts), so the related list does the
 * work: every article first points to the service page for its topic, then to
 * any page that answers a neighbouring question (pairs that used to compete
 * for the same search now point at each other), then to nearby articles.
 *
 * Values are related slugs: a guide ('superannuation') or 'blog/<slug>'.
 */
import type { LongCategory } from '../types'

/** Service pages per topic, in order of preference. The first one that
 *  exists is used, so 'tfn' takes over automatically once that page exists.
 *  Where a topic lists two pages, articles alternate between them so the
 *  links do not all read the same. */
export const LONG_SERVICE: Readonly<Record<LongCategory, readonly (readonly string[])[]>> = {
  TFN: [['tfn', 'blog/apply-for-tfn-student-visa']],
  'Tax return': [['pricing'], ['how-it-works']],
  Deductions: [['pricing'], ['blog/work-deductions-students']],
  Work: [['pricing'], ['blog/payslip-what-to-check']],
  ABN: [['abn-delivery']],
  Super: [['superannuation']],
  Medicare: [['medicare']],
}

/** Pages that answer the question next to this one. */
export const LONG_ALSO: Readonly<Record<string, readonly string[]>> = {
  // Super and DASP: rates, net amount, paperwork and timing each have one page.
  'dasp-tax-rate-international-students': ['blog/tax-on-super-withdrawal-international-students', 'blog/dasp-documents-and-timing'],
  'super-for-casual-student-workers': ['blog/how-much-super-should-employer-pay-international-students', 'blog/employer-not-paying-super', 'blog/how-much-super-employer-pays'],
  // zh/vi own "super 12%" on the short post; the long one keeps the worked example.
  'how-much-super-should-employer-pay-international-students': ['blog/how-much-super-employer-pays', 'blog/super-for-casual-student-workers'],
  'how-to-find-lost-super-international-students': ['blog/super-multiple-funds-international-students', 'blog/employer-not-paying-super'],
  'super-multiple-funds-international-students': ['blog/how-to-find-lost-super-international-students'],
  'tax-on-super-withdrawal-international-students': ['blog/dasp-tax-rate-international-students', 'blog/dasp-or-leave-super-international-students'],
  'dasp-documents-checklist-international-students': ['blog/dasp-documents-and-timing', 'blog/how-long-does-dasp-take-international-students'],
  'how-long-does-dasp-take-international-students': ['blog/dasp-documents-and-timing', 'blog/dasp-rejected-international-students'],
  'dasp-rejected-international-students': ['blog/dasp-documents-checklist-international-students'],
  'dasp-or-leave-super-international-students': ['blog/dasp-tax-rate-international-students', 'blog/what-happens-to-unclaimed-super-international-students'],
  'report-unpaid-super-international-students': ['blog/employer-not-paying-super', 'blog/super-guarantee-charge-international-students'],
  'super-guarantee-charge-international-students': ['blog/employer-not-paying-super', 'blog/report-unpaid-super-international-students'],
  // Tax return
  'several-jobs-in-one-year-student-tax': ['blog/multiple-jobs-tax-return-student-visa', 'blog/tfn-declaration-two-jobs'],
  'multiple-jobs-tax-return-student-visa': ['blog/several-jobs-in-one-year-student-tax', 'blog/tfn-declaration-two-jobs'],
  'australian-tax-year-international-students': ['blog/australian-financial-year-dates-international-students', 'blog/tax-return-deadline-31-october'],
  'australian-financial-year-dates-international-students': ['blog/australian-tax-year-international-students'],
  'fix-tax-return-mistakes-international-students': ['blog/amend-tax-return'],
  'what-is-a-tax-agent-international-students': ['blog/diy-tax-return-vs-tax-agent-international-students', 'about'],
  'diy-tax-return-vs-tax-agent-international-students': ['blog/what-is-a-tax-agent-international-students'],
  'late-tax-return-penalty-dollars-students': ['blog/late-lodgment', 'past-years'],
  'tax-deadline-final-week-checklist-students': ['blog/late-tax-return-penalty-dollars-students', 'past-years'],
  'student-visa-tax-guide-500-485': ['tax-residency', 'medicare'],
  'tax-rates-international-students-2025-26': ['blog/student-visa-tax-guide-500-485', 'tax-residency'],
  'how-to-lodge-tax-return-international-students': ['do-i-need-to-lodge', 'blog/tax-back-australia-international-students'],
  // Refund: tax back owns the refund question, the others keep their own.
  'what-is-a-tax-refund-international-students': ['blog/tax-back-australia-international-students'],
  'average-tax-refund-international-students': ['blog/tax-back-australia-international-students', 'blog/what-is-a-tax-refund-international-students'],
  'tax-refund-delays-international-students': ['blog/how-long-does-a-tax-refund-take', 'blog/tax-back-australia-international-students'],
  'tax-back-australia-international-students': ['do-i-need-to-lodge', 'blog/how-long-does-a-tax-refund-take'],
  // The airport GST refund is not the DASP or the income tax refund (vi "hoàn thuế xuất cảnh").
  'tourist-refund-scheme-international-students': ['superannuation', 'blog/tax-back-australia-international-students'],
  // Debt: payment plan owns instalments, owe-the-ato owns the debt; interest keeps interest only.
  'ato-tax-debt-interest-international-students': ['blog/tax-payment-plan', 'blog/owe-the-ato-international-students'],
  // Leaving: lodge-from-overseas owns the how to, tax-after-leaving owns what is still owed.
  'lodging-tax-return-after-going-home-students': ['blog/lodge-from-overseas', 'blog/tax-after-leaving-australia-international-students'],
  'tax-after-leaving-australia-international-students': ['blog/lodge-from-overseas', 'leaving-australia'],
  // ABN
  'what-is-an-abn-international-students': ['blog/what-is-an-abn-students', 'blog/how-to-register-for-an-abn-students'],
  'how-to-register-for-an-abn-students': ['blog/what-is-an-abn-international-students', 'blog/tfn-vs-abn-international-students'],
  'cancel-abn-when-you-stop-working-students': ['blog/cancel-abn-before-leaving'],
  'employee-vs-contractor-test-international-students': ['blog/employee-or-contractor', 'blog/what-is-an-abn-international-students'],
  'invoices-with-an-abn-international-students': ['blog/abn-invoicing-international-students'],
  'abn-invoicing-international-students': ['blog/invoices-with-an-abn-international-students'],
  // Work
  'unpaid-trial-shift-recover-pay-student-visa': ['blog/unpaid-trial-shifts'],
  'minimum-wage-australia-2026-27-international-students': ['blog/minimum-wage-students', 'blog/penalty-rates-student-visa'],
  'workplace-rights-international-students': ['blog/underpaid-student-visa'],
  // TFN
  'how-to-apply-for-a-tfn-international-students': ['blog/apply-for-tfn-student-visa', 'blog/tfn-application-delayed-students'],
  'what-is-a-tfn-international-students': ['blog/how-to-apply-for-a-tfn-international-students'],
  'tfn-documents-international-students': ['blog/how-to-apply-for-a-tfn-international-students'],
  // Working without a TFN: start-work owns it; the others keep the waiting period and the 47% rate.
  'start-work-without-a-tfn-students': ['blog/working-before-tfn-arrives-international-students', 'blog/no-tfn-tax-withheld-students'],
  'working-before-tfn-arrives-international-students': ['blog/start-work-without-a-tfn-students', 'blog/no-tfn-tax-withheld-students'],
  'no-tfn-tax-withheld-students': ['blog/start-work-without-a-tfn-students', 'blog/working-before-tfn-arrives-international-students'],
  // TFN not received: the delayed page owns day 29; the timing page keeps normal timing.
  'how-long-does-a-tfn-take-students': ['blog/tfn-application-delayed-students'],
  'tfn-application-delayed-students': ['blog/how-long-does-a-tfn-take-students'],
}
