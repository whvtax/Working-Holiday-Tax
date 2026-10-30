import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from '@/app/(site)/3cw5w5hcx/FormClient'

export const metadata: Metadata = {
  title: 'ABN申請フォーム｜Working Holiday Tax',
  description: 'ABN（Australian Business Number）の申請に必要な情報をお送りください。ATOへの登録手続きを正確かつスピーディに代行します。',
  keywords: [
    'ABN 申請 フォーム',
    'ABN オンライン 申請',
    'ABN フォーム ワーキングホリデー',
    'ABN 申請 送信',
    'Australian Business Number 登録',
    'ABN フリーランス 日本語',
    'Sole Trader ABN 申請',
    'ABN 登録 フォーム',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/3cw5w5hcx`,
    languages: {
      'en-AU': `${SITE_URL}/3cw5w5hcx`,
      'de': `${SITE_URL}/de/3cw5w5hcx`,
      'ja': `${SITE_URL}/ja/3cw5w5hcx`,
      'x-default': `${SITE_URL}/3cw5w5hcx`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/3cw5w5hcx`,
    siteName: 'Working Holiday Tax',
    title: 'ABN申請フォーム',
    description: 'ABN登録に必要な情報をお送りください。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`], card: 'summary', title: 'ABN申請フォーム', description: 'ABN登録に必要な情報をお送りください。' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  inLanguage: 'ja',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: 'ABN', item: `${SITE_URL}/ja/abn` },
    { '@type': 'ListItem', position: 3, name: '申請フォーム', item: `${SITE_URL}/ja/3cw5w5hcx` },
  ],
}

export default function JapaneseABNFormPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FormClient defaultLang="ja" />
    </>
  )
}
