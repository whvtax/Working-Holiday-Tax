import type { Metadata } from 'next'
import { Suspense } from 'react'
import { WhtFormProvider } from '@/components/ui/form-brand-wht'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from '@/app/(site)/start/FormClient'

export const metadata: Metadata = {
  title: 'タックスリターンフォーム｜Working Holiday Tax',
  description: 'ワーキングホリデーメーカーとしてのオーストラリアのタックスリターンをオンラインで申請。ATOへの提出前に、登録タックスエージェントが内容を確認し承認します。',
  keywords: [
    'タックスリターン 申請',
    'タックスリターン フォーム 日本語',
    'タックスリターン オンライン',
    '税金 還付 申請',
    'WHV タックスリターン 提出',
    'バックパッカー タックスリターン フォーム',
    'タックスリターン オーストラリア 日本語',
    'オーストラリア タックスリターン 申請',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/start`,
    languages: {
      'en-AU': `${SITE_URL}/start`,
      'de': `${SITE_URL}/de/start`,
      'ja': `${SITE_URL}/ja/start`,
      'x-default': `${SITE_URL}/start`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/start`,
    siteName: 'Working Holiday Tax',
    title: 'タックスリターンフォーム',
    description: 'タックスリターンに必要な情報をお送りください。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`], card: 'summary', title: 'タックスリターンフォーム', description: 'タックスリターンに必要な情報をお送りください。' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  inLanguage: 'ja',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: 'タックスリターン', item: `${SITE_URL}/ja/tax-return` },
    { '@type': 'ListItem', position: 3, name: '申請フォーム', item: `${SITE_URL}/ja/start` },
  ],
}

export default function JapaneseTaxFormPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <WhtFormProvider><Suspense fallback={null}><FormClient defaultLang="ja" /></Suspense></WhtFormProvider>
    </>
  )
}
