/** Sample payslip for the home page explainer. Made-up employer and amounts;
 *  the page says so. Super is on top of pay, not deducted (Australian law).
 *  Line names stay in English in every language, because that is what an
 *  Australian payslip says; the explanation is in the reader's language. */
import type { SvtLocale } from '@/lib/svt/i18n'

export type PayslipLineId = 'gross' | 'tax' | 'super' | 'net'

const LINES: ReadonlyArray<{ id: PayslipLineId; label: string; amount: string }> = [
  { id: 'gross', label: 'Gross pay', amount: '$1,000.00' },
  { id: 'tax', label: 'PAYG withheld', amount: '$150.00' },
  { id: 'super', label: 'Super', amount: '$120.00' },
  { id: 'net', label: 'Net pay', amount: '$850.00' },
]

const EXPLAIN: Readonly<Record<SvtLocale, Record<PayslipLineId, string>>> = {
  en: {
    gross: 'What you earned before anything was taken out.',
    tax: 'Tax your employer sent to the ATO for you. Your tax return works out whether this was too much or too little.',
    super: 'Paid by your employer into your super fund, on top of your pay. It is not taken from your pay.',
    net: 'What landed in your bank account.',
  },
  zh: {
    gross: '扣掉任何款项之前，你挣到的钱。',
    tax: '雇主替你交给 ATO 的税。报税时会算清楚这笔税是交多了还是交少了。',
    super: '雇主在你的工资之外，另外存进你养老金（super）账户的钱，不是从工资里扣的。',
    net: '实际打进你银行账户的钱。',
  },
  vi: {
    gross: 'Số tiền bạn kiếm được trước khi bị trừ bất cứ khoản nào.',
    tax: 'Tiền thuế chủ lao động đã nộp cho ATO thay bạn. Khi khai thuế sẽ tính xem khoản này nộp thừa hay thiếu.',
    super: 'Tiền chủ lao động đóng vào quỹ super (quỹ hưu trí) của bạn, cộng thêm ngoài lương. Khoản này không bị trừ vào lương.',
    net: 'Số tiền thực sự vào tài khoản ngân hàng của bạn.',
  },
}

export const payslipLines = (l: SvtLocale) => LINES.map(x => ({ ...x, explain: EXPLAIN[l][x.id] }))
/** English, kept for existing callers and tests. */
export const PAYSLIP_LINES = payslipLines('en')
