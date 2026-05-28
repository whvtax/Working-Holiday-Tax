import type { Metadata } from 'next'
import BlogClient from '@/app/blog/BlogClient'
import { getJapaneseGuides, jaCategoryMeta, blogUI } from './data'

export const metadata: Metadata = {
  title: 'オーストラリア タックスリターン 還付金 ブログ - ワーホリ完全ガイド',
  description: 'オーストラリアのワーキングホリデーで知っておきたいタックスリターン還付金、TFN、ABN、スーパー返金（DASP）、労働者の権利を実用的に解説。還付金を取り戻すための情報を網羅。',
  keywords: [
    // Refund-focused
    'オーストラリア タックスリターン 還付金 ブログ',
    'ワーホリ 還付金 解説',
    'オーストラリア 税金 戻ってくる 方法',
    'ワーキングホリデー 還付金 ガイド',
    'バックパッカー 税還付 オーストラリア 解説',
    'オーストラリア タックスリターン 還付 やり方',
    'WHV 還付金 ブログ',
    // Adjacent
    'オーストラリア ワーホリ 税金 ブログ',
    'ワーキングホリデー オーストラリア 情報',
    '417ビザ 税金',
    '462ビザ 税金',
    'バックパッカー 税金 オーストラリア',
    'WHM 税金 解説',
    'DASP スーパーアニュエーション',
    'オーストラリア タックスリターン 日本語',
    'オーストラリア スーパー 返金 ブログ',
    'オーストラリア TFN ABN 解説',
  ],
  alternates: {
    canonical: 'https://workingholidaytax.com.au/ja/blog',
    languages: {
      'en-AU': 'https://workingholidaytax.com.au/blog',
      'de': 'https://workingholidaytax.com.au/de/blog',
      'ja': 'https://workingholidaytax.com.au/ja/blog',
      'x-default': 'https://workingholidaytax.com.au/blog',
    },
  },
  openGraph: {
    title: 'オーストラリア タックスリターン 還付金 ブログ - ワーホリ完全ガイド',
    description: 'オーストラリアのワーキングホリデーのタックスリターン還付金、TFN、ABN、スーパー返金まで、実用情報をわかりやすくお届けします。',
    url: 'https://workingholidaytax.com.au/ja/blog',
    siteName: 'Working Holiday Tax',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'オーストラリア タックスリターン 還付金 ブログ - ワーホリ',
    description: 'オーストラリアのワーホリのタックスリターン還付金まで、実用情報をわかりやすく。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
}

export default function JapaneseBlogPage() {
  const guides = getJapaneseGuides()

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Working Holiday Tax ブログ（日本語）',
    description: 'オーストラリアでワーキングホリデーをする方向けの税金ブログ',
    url: 'https://workingholidaytax.com.au/ja/blog',
    inLanguage: 'ja',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Working Holiday Tax',
      url: 'https://workingholidaytax.com.au',
    },
    about: {
      '@type': 'Thing',
      name: 'オーストラリアのワーキングホリデーの税金',
    },
    audience: {
      '@type': 'Audience',
      name: 'オーストラリアのワーキングホリデービザ保持者（サブクラス417・462）',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: jaCategoryMeta.length,
      itemListElement: jaCategoryMeta.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://workingholidaytax.com.au/ja/blog/category/${c.slug}`,
        name: c.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://workingholidaytax.com.au/ja' },
      { '@type': 'ListItem', position: 2, name: 'ブログ', item: 'https://workingholidaytax.com.au/ja/blog' },
    ],
  }

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Working Holiday Tax',
    url: 'https://workingholidaytax.com.au',
    logo: 'https://workingholidaytax.com.au/icon-512.png',
    description: 'オーストラリアのワーキングホリデー保持者向け税務サービス。登録税理士の監督のもと、TFN申請、タックスリターン、DASPスーパー返金、ABN登録を提供しています。',
    areaServed: { '@type': 'Country', name: 'Australia' },
    knowsAbout: [
      'タックスファイルナンバー（TFN）申請',
      'オーストラリア事業者番号（ABN）登録',
      'ワーキングホリデー年次タックスリターン',
      'Departing Australia Superannuation Payment（DASP）',
      'メディケア税免除',
      'ワーキングホリデー労働者の権利',
      'サブクラス417ビザ',
      'サブクラス462ビザ',
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <main style={{ background: '#fff', minHeight: '100vh' }}>
        <BlogClient
          guides={guides}
          lang="ja"
          ui={blogUI}
          blogBasePath="/ja/blog"
          homePath="/ja"
        />
      </main>
    </>
  )
}
