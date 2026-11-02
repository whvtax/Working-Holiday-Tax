import type { Metadata } from 'next'
import { waUrl } from '@/lib/wa'
import { Hero } from '@/components/wht/Hero'
import { Lead } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { blocks } from '@/components/wht/Blocks'

/**
 * Where the retired questionnaire links lead (Jo, 29 Oct): no form, no
 * residency content, just what to do. The form link goes out in the chat once
 * the payment is confirmed.
 */
const TEXT = {
  en: {
    title: 'This link opens after payment',
    body: 'We send your form link here on WhatsApp as soon as your payment is confirmed. Already paid? Message us and we will send it again.',
    cta: 'Message us on WhatsApp',
    meta: 'Form link',
  },
  de: {
    title: 'Dieser Link ist nach der Zahlung verfügbar',
    body: 'Den Link zu deinem Formular schicken wir dir auf WhatsApp, sobald deine Zahlung bestätigt ist. Schon bezahlt? Schreib uns, dann senden wir ihn dir erneut.',
    cta: 'Per WhatsApp schreiben',
    meta: 'Formular-Link',
  },
  ja: {
    title: 'このリンクはお支払い後にご利用いただけます',
    body: 'お支払いの確認が取れ次第、WhatsAppでフォームのリンクをお送りします。すでにお支払い済みの場合は、メッセージをいただければ再度お送りします。',
    cta: 'WhatsAppでメッセージする',
    meta: 'フォームのリンク',
  },
} as const

export type LinkAfterPaymentLang = keyof typeof TEXT

export const linkAfterPaymentMetadata = (lang: LinkAfterPaymentLang): Metadata => ({
  title: TEXT[lang].meta,
  robots: { index: false, follow: false },
})

export function LinkAfterPayment({ lang }: { lang: LinkAfterPaymentLang }) {
  const t = TEXT[lang]
  return (
    <div className={blocks.underHeader}>
      <Hero title={t.title}>
        <Lead>{t.body}</Lead>
        <LinkButton href={waUrl({ topic: 'general', lang })} target="_blank" rel="noopener noreferrer">{t.cta}</LinkButton>
      </Hero>
    </div>
  )
}
