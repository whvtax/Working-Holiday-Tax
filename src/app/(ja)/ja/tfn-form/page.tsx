import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from '@/app/(site)/tfn-form/FormClient'

export const metadata: Metadata = {
  title: 'TFN申請フォーム | Working Holiday Tax',
  description: 'TFN（タックスファイルナンバー）申請に必要な情報をお送りください。初回で正しく申請。通常28日以内に発行されます。',
  keywords: [
    'TFN 申請 フォーム',
    'TFN オンライン 申請',
    'TFN フォーム ワーキングホリデー',
    'TFN 申請 送信',
    'タックスファイルナンバー 申請',
    'TFN 日本人 ワーホリ',
    'オーストラリア 税番号 申請',
    'TFN 申請書 オーストラリア',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/tfn-form`,
    languages: {
      'en-AU': `${SITE_URL}/tfn-form`,
      'de': `${SITE_URL}/de/tfn-form`,
      'ja': `${SITE_URL}/ja/tfn-form`,
      'x-default': `${SITE_URL}/tfn-form`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/tfn-form`,
    siteName: 'Working Holiday Tax',
    title: 'TFN申請フォーム',
    description: 'TFN申請に必要な情報をお送りください。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`], card: 'summary', title: 'TFN申請フォーム', description: 'TFN申請に必要な情報をお送りください。' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  inLanguage: 'ja',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: 'TFN', item: `${SITE_URL}/ja/tfn` },
    { '@type': 'ListItem', position: 3, name: '申請フォーム', item: `${SITE_URL}/ja/tfn-form` },
  ],
}

export default function JapaneseTFNFormPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FormClient defaultLang="ja" />
    </>
  )
}
