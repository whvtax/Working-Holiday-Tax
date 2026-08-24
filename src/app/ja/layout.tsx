import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'

/**
 * Japanese section layout.
 * Wraps all /ja/* pages. Provides default Japanese metadata, OpenGraph, hreflang.
 * Pages can override these in their own metadata exports.
 *
 * NOTE: The <html lang> attribute is server-rendered per locale by middleware
 * (x-locale header) in the root layout (src/app/layout.tsx); a small client
 * script keeps it correct during in-app navigation.
 *
 * SEO STRATEGY for Japanese market:
 * - Target audience: Japanese Working Holiday Maker visa holders (417/462) in Australia
 * - Keywords mix Japanese phrases with English tax terms (TFN, ABN, DASP) since
 *   these are the actual terms used in the Japanese WHV community.
 * - Friendly tone (です/ます-form), aimed at millennials/young adults.
 * - hreflang "ja" (no region) targets all Japanese speakers worldwide - relevant
 *   because users may be in Japan (pre-trip), Australia (during), or back home (post-trip).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'オーストラリア タックスリターン 還付金｜ワーキングホリデー専門',
    // The Latin brand suffix costs about 200px of the roughly 580px Google
    // renders, and on a Japanese title that is a third of the line spent on a
    // name the reader already sees in the URL. Japanese pages carry their own
    // full title instead.
    template: '%s',
  },
  description:
    'オーストラリアのワーキングホリデー（417・462ビザ）専門。タックスリターン還付金の受取、TFN申請、スーパー受取（DASP）、ABN登録までオンラインで完結。',
  keywords: [
    // Refund-focused (HIGH INTENT - primary service)
    'オーストラリア タックスリターン 還付金',
    'ワーキングホリデー 税金 還付',
    'ワーホリ タックスリターン 還付',
    'オーストラリア 税金 戻ってくる',
    'オーストラリア 税金 返金',
    'バックパッカー 税還付 オーストラリア',
    'ワーホリ 還付金 いくら',
    'オーストラリア 税金 取り戻す',
    '417ビザ タックスリターン',
    '462ビザ タックスリターン',
    'WHV 還付金 オーストラリア',
    'ワーホリ 帰国後 タックスリターン',
    'オーストラリア タックスリターン 日本語',
    'オーストラリア タックスリターン やり方',
    'タックスリターン 還付 申請方法',
    // Core Japanese keywords - high search volume
    'オーストラリア ワーキングホリデー 税金',
    'ワーホリ オーストラリア 税金',
    'TFN 申請 オーストラリア',
    'ABN 登録 ワーホリ',
    'スーパーアニュエーション 受取',
    'スーパー 返金 オーストラリア',
    'DASP 申請',
    'DASP 還付',
    // Visa-specific
    '417ビザ 税金',
    '462ビザ 税金',
    'ワーキングホリデービザ 税金',
    'バックパッカー 税金 オーストラリア',
    // Professional service
    'ワーホリ 税金 専門 日本語',
    'オーストラリア 税理士 ワーホリ',
    'オーストラリア 税務代理人 日本人',
    // Medicare / specific topics
    'メディケア レビー 免除',
    'メディケア税 還付',
    // Long-tail
    'ワーホリ 帰国後 税金',
    'オーストラリア 帰国 スーパー',
    'ワーホリ タックスリターン 期限',
    'オーストラリア 会計年度 タックスリターン',
  ],
  authors: [{ name: 'Working Holiday Tax' }],
  creator: 'Working Holiday Tax',
  publisher: 'Working Holiday Tax',
  category: '税務サービス',
  alternates: {
    canonical: `${SITE_URL}/ja`,
    languages: {
      'en-AU': SITE_URL,
      'de': `${SITE_URL}/de`,
      'ja': `${SITE_URL}/ja`,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    alternateLocale: ['en_AU', 'de_DE'],
    url: `${SITE_URL}/ja`,
    siteName: 'Working Holiday Tax',
    title: 'オーストラリア タックスリターン 還付金｜ワーキングホリデー専門',
    description: 'オーストラリアのワーホリ（417・462ビザ）専門。タックスリターン還付金、TFN、スーパー受取（DASP）まですべてオンライン。',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'オーストラリア タックスリターン 還付金｜ワーキングホリデー専門',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'オーストラリア タックスリターン 還付金｜ワーホリ専門',
    description: 'オーストラリアのワーホリ専門。タックスリターン還付金を最大化。',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

export default function JapaneseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
