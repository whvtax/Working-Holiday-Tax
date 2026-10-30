import type { Metadata } from 'next'
import { waUrl } from '@/lib/wa'

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
    <div className="relative bg-white min-h-svh flex items-center justify-center pt-[68px]">
      <div className="max-w-xl mx-auto px-6 text-center py-20">
        <h1 className="font-serif font-black text-ink mb-3" style={{ fontSize: 'clamp(22px,3.5vw,34px)', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
          {t.title}
        </h1>
        <p className="font-light text-muted leading-[1.7] mb-8" style={{ fontSize: '14.5px' }}>{t.body}</p>
        <a href={waUrl({ topic: 'general', lang })} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '46px', padding: '0 24px', fontSize: '13.5px' }}>
          {t.cta}
        </a>
      </div>
    </div>
  )
}
