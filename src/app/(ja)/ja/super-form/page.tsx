import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from '@/app/(site)/super-form/FormClient'

export const metadata: Metadata = {
  title: 'スーパー受取（DASP）申請フォーム | Working Holiday Tax',
  description: 'オーストラリアを離れた後にスーパー（DASP）を受け取るために必要な情報をお送りください。すべての手続きを代行します。',
  keywords: [
    'DASP 申請 フォーム',
    'スーパー 受取 申請',
    'スーパー オンライン 申請',
    'Departing Australia Superannuation 申請',
    'スーパー 返金 ワーキングホリデー',
    'バックパッカー スーパー 申請',
    'WHV スーパー 受取',
    'オーストラリア スーパー 返金 申請',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/super-form`,
    languages: {
      'en-AU': `${SITE_URL}/super-form`,
      'de': `${SITE_URL}/de/super-form`,
      'ja': `${SITE_URL}/ja/super-form`,
      'x-default': `${SITE_URL}/super-form`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/super-form`,
    siteName: 'Working Holiday Tax',
    title: 'スーパー受取（DASP）申請フォーム',
    description: 'スーパー受取に必要な情報をお送りください。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`], card: 'summary', title: 'スーパー受取（DASP）申請フォーム', description: 'スーパー受取に必要な情報をお送りください。' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  inLanguage: 'ja',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: 'スーパー受取', item: `${SITE_URL}/ja/superannuation` },
    { '@type': 'ListItem', position: 3, name: '申請フォーム', item: `${SITE_URL}/ja/super-form` },
  ],
}

export default function JapaneseSuperFormPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FormClient defaultLang="ja" />
    </>
  )
}
