import type { Metadata } from 'next'
import { SITE_URL, AGENT_NAME } from '@/lib/constants'

/**
 * Japanese section layout.
 * Wraps all /ja/* pages. Provides default Japanese metadata, OpenGraph, hreflang.
 * Pages can override these in their own metadata exports.
 *
 * NOTE: The lang attribute on <html> is set dynamically by a script in the
 * root layout (src/app/layout.tsx) based on the URL pathname.
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
    default: 'ワーキングホリデー オーストラリア 税金・スーパー・TFN 専門',
    template: '%s | Working Holiday Tax',
  },
  description:
    'オーストラリアのワーキングホリデー（サブクラス417・462）専門の登録税理士。TFN申請、タックスリターン、スーパー受取（DASP）、ABN登録まで、すべてオンラインでサポート。',
  keywords: [
    // Core Japanese keywords - high search volume
    'オーストラリア ワーキングホリデー 税金',
    'ワーホリ オーストラリア 税金',
    'オーストラリア タックスリターン ワーホリ',
    'TFN 申請 オーストラリア',
    'ABN 登録 ワーホリ',
    'スーパーアニュエーション 受取',
    'DASP 申請',
    // Visa-specific
    '417ビザ 税金',
    '462ビザ 税金',
    'ワーキングホリデービザ 税金',
    // Refund-focused (high intent)
    'オーストラリア 税金 還付',
    'ワーホリ 税金 戻る',
    'バックパッカー 税金 オーストラリア',
    // Professional service
    '登録税理士 オーストラリア 日本語',
    'オーストラリア 税理士 ワーホリ',
    // Medicare / specific topics
    'メディケア レビー 免除',
    'オーストラリア タックスリターン やり方',
    // Long-tail
    'ワーホリ 帰国後 税金',
    'オーストラリア 帰国 スーパー',
  ],
  authors: [{ name: AGENT_NAME }],
  creator: AGENT_NAME,
  publisher: AGENT_NAME,
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
    title: 'ワーキングホリデー オーストラリア 税金・スーパー・TFN 専門',
    description: 'オーストラリアのワーキングホリデー専門の登録税理士。TFN、タックスリターン、スーパー、ABNまで、すべてお任せください。',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Working Holiday Tax - オーストラリアのワーホリ向け税務サービス',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ワーキングホリデー オーストラリア 税金・スーパー専門',
    description: 'オーストラリアのワーキングホリデー専門の登録税理士。',
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
