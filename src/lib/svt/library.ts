/**
 * The SVT library (decision 005): every guide and article belongs to one topic,
 * in reading order. Position ("2 of 3"), previous and next are computed from
 * this list, so adding a page means adding its slug here (tested).
 *
 * Slugs are the language-free paths without the leading slash: a guide is
 * 'medicare', an article is 'blog/tfn-declaration-two-jobs'. Service pages
 * (pricing, how-it-works, about) are not in the library.
 */
export type TopicId = 'TFN' | 'Tax return' | 'Work' | 'ABN' | 'Super'

export const LIBRARY: ReadonlyArray<{ topic: TopicId; pages: readonly string[] }> = [
  { topic: 'TFN', pages: ['blog/apply-for-tfn-student-visa', 'blog/tfn-declaration-two-jobs', 'tax-residency'] },
  {
    topic: 'Tax return',
    pages: [
      'do-i-need-to-lodge', 'blog/tax-return-deadline-31-october', 'blog/income-statement-tax-ready', 'blog/work-deductions-students',
      'blog/low-income-tax-offset-students', 'medicare', 'blog/cash-in-hand-and-tips',
      'blog/how-long-does-a-tax-refund-take', 'blog/amend-tax-return', 'blog/late-lodgment',
      'blog/tax-payment-plan', 'past-years', 'leaving-australia', 'blog/lodge-from-overseas',
    ],
  },
  { topic: 'Work', pages: ['blog/minimum-wage-students', 'blog/payslip-what-to-check', 'blog/unpaid-trial-shifts', 'blog/underpaid-student-visa', 'blog/employee-or-contractor'] },
  { topic: 'ABN', pages: ['blog/what-is-an-abn-students', 'abn-delivery', 'blog/cancel-abn-before-leaving'] },
  { topic: 'Super', pages: ['blog/how-much-super-employer-pays', 'blog/find-and-check-your-super', 'blog/employer-not-paying-super', 'superannuation', 'blog/dasp-documents-and-timing'] },
]

/** Pages that are about the service, not a topic. */
export const SERVICE_PAGES: readonly string[] = ['pricing', 'how-it-works', 'about']

export interface Place {
  topic: TopicId
  index: number
  total: number
  prev?: string
  next?: string
}

export function placeOf(page: string): Place | null {
  for (const { topic, pages } of LIBRARY) {
    const i = pages.indexOf(page)
    if (i >= 0) return { topic, index: i + 1, total: pages.length, prev: pages[i - 1], next: pages[i + 1] }
  }
  return null
}

/** Minutes to read, for second-language readers: about 150 words a minute
 *  (Latin scripts) or 300 characters a minute (Chinese). At least 1. */
export function readingMinutes(text: string, cjk: boolean): number {
  const n = cjk ? text.replace(/\s/g, '').length / 300 : text.split(/\s+/).filter(Boolean).length / 150
  return Math.max(1, Math.round(n))
}
