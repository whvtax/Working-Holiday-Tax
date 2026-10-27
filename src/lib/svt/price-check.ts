/**
 * The "Which price fits me?" check on the SVT home page.
 * Same fees as every brand (CLAUDE.md): $220 TFN, $385 with ABN, incl. GST.
 * Pure function, so the copy and the price can be tested without a browser.
 * The WhatsApp message is written in the reader's language.
 */
import { svtWhatsappUrl } from '@/lib/svt/brand-public'
import type { SvtLocale } from '@/lib/svt/i18n'

export type VisaId = '500' | '485' | 'other'
export type WorkId = 'tfn' | 'abn' | 'both'

const VISA_LABELS: Readonly<Record<SvtLocale, Record<VisaId, string>>> = {
  en: { '500': 'Student 500', '485': 'Graduate 485', other: 'Other' },
  zh: { '500': '学生签证 500', '485': '毕业生签证 485', other: '其他' },
  vi: { '500': 'Du học 500', '485': 'Tốt nghiệp 485', other: 'Khác' },
}
const WORK_LABELS: Readonly<Record<SvtLocale, Record<WorkId, string>>> = {
  en: { tfn: 'Jobs with a TFN', abn: 'Work with TFN + ABN', both: 'Both' },
  zh: { tfn: '有 TFN 的工作', abn: 'TFN + ABN 工作', both: '两种都有' },
  vi: { tfn: 'Việc làm có TFN', abn: 'Việc làm TFN + ABN', both: 'Cả hai' },
}

const VISA_IDS: readonly VisaId[] = ['500', '485'] // Jo, 27 Oct: no "Other"
// Jo, 27 Oct: two choices, "Jobs with a TFN" and "Work with TFN + ABN".
const WORK_IDS: readonly WorkId[] = ['tfn', 'abn']

export const visasFor = (l: SvtLocale) => VISA_IDS.map(id => ({ id, label: VISA_LABELS[l][id] }))
export const worksFor = (l: SvtLocale) => WORK_IDS.map(id => ({ id, label: WORK_LABELS[l][id] }))
/** English lists, kept for existing callers and tests. */
export const VISAS = visasFor('en')
export const WORKS = worksFor('en')

export const FEE_TFN = 220
export const FEE_ABN = 385

export interface PriceCheckResult {
  price: number
  priceLabel: string
  note: string
  message: string
  whatsappHref: string
}

const isVisa = (v: unknown): v is VisaId => VISA_IDS.includes(v as VisaId)
const isWork = (v: unknown): v is WorkId => WORK_IDS.includes(v as WorkId)

const NOTE: Readonly<Record<SvtLocale, { other: string; usual: string }>> = {
  en: { other: 'Tell us your visa and we will confirm the price before you pay.', usual: 'We confirm your price on WhatsApp before you pay.' },
  zh: { other: '告诉我们你的签证类型，付款前我们会先和你确认价格。', usual: '付款前，我们会先在 WhatsApp 上和你确认价格。' },
  vi: { other: 'Cho chúng tôi biết loại visa của bạn, chúng tôi sẽ xác nhận giá trước khi bạn thanh toán.', usual: 'Chúng tôi xác nhận giá với bạn qua WhatsApp trước khi bạn thanh toán.' },
}

function messageFor(l: SvtLocale, visa: VisaId, work: WorkId): string {
  if (l === 'zh') {
    const v = visa === 'other' ? '我是其他签证' : `我是 ${visa} 签证`
    const w = work === 'tfn' ? '今年只有 TFN 的工作' : '今年既有 TFN 工作，也有 ABN 工作'
    return `你好，${v}，${w}。想问下可以帮我报税吗？`
  }
  if (l === 'vi') {
    const v = visa === 'other' ? 'mình đang có loại visa khác' : `mình đang có visa ${visa}`
    const w = work === 'tfn' ? 'năm nay mình đi làm có TFN' : 'năm nay mình vừa đi làm có TFN vừa làm việc ABN'
    return `Chào bạn, ${v}, ${w}. Bên bạn khai thuế giúp mình được không ạ?`
  }
  const visaText = visa === 'other' ? 'another visa' : `a ${visa} visa`
  const workText = work === 'tfn' ? 'jobs with a TFN' : 'TFN jobs and ABN work'
  return `Hi, I am on ${visaText} and had ${workText} this year. Can you do my tax return?`
}

export function priceCheck(visaIn: VisaId, workIn: WorkId, locale: SvtLocale = 'en'): PriceCheckResult {
  const visa: VisaId = isVisa(visaIn) ? visaIn : '500'
  const work: WorkId = workIn === 'both' ? 'abn' : isWork(workIn) ? workIn : 'tfn'
  const price = work === 'tfn' ? FEE_TFN : FEE_ABN
  const note = visa === 'other' ? NOTE[locale].other : NOTE[locale].usual
  const message = messageFor(locale, visa, work)
  return { price, priceLabel: `$${price}`, note, message, whatsappHref: svtWhatsappUrl(message) }
}
