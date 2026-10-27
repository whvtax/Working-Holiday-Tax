import { svtWhatsappUrl } from '@/lib/svt/brand-public'
import type { SvtLocale } from '@/lib/svt/i18n'
import { LinkButton } from './Button'
import { Section } from './Section'
import { Lead, Mark } from './Type'

const T: Readonly<Record<SvtLocale, { before: string; mark: string; lead: string; hello: string; cta: string }>> = {
  en: { before: 'Your ', mark: 'tax form', lead: 'Message us on WhatsApp first. We confirm your price, then send you the link to your form.', hello: 'Hi, I would like to fill in my tax form.', cta: 'Message us on WhatsApp' },
  zh: { before: '你的', mark: '报税表', lead: '请先在 WhatsApp 上联系我们。我们确认价格后，会把表格链接发给你。', hello: '你好，我想填写报税表。', cta: '在 WhatsApp 上联系我们' },
  vi: { before: 'Tờ khai ', mark: 'thuế của bạn', lead: 'Bạn nhắn tin cho chúng tôi qua WhatsApp trước. Chúng tôi xác nhận giá, sau đó gửi cho bạn đường link tờ khai.', hello: 'Chào bạn, mình muốn điền tờ khai thuế.', cta: 'Nhắn tin qua WhatsApp' },
}

/** Shown on /tax-form until SVT_FORMS_ENABLED opens the form. */
export function SvtFormClosed({ locale }: { locale: SvtLocale }) {
  const t = T[locale]
  return (
    <Section>
      <h1 style={{ fontSize: 'var(--svt-h1)', lineHeight: 1.06, fontWeight: 700, letterSpacing: '-0.025em' }}>{t.before}<Mark>{t.mark}</Mark></h1>
      <Lead>{t.lead}</Lead>
      <LinkButton href={svtWhatsappUrl(t.hello)}>{t.cta}</LinkButton>
    </Section>
  )
}
