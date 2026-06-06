import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { CalculatorClient } from './CalculatorClient'

export const metadata: Metadata = {
  title: 'タックスリターン 還付金 計算機 - ワーキングホリデー オーストラリア',
  description: 'ワーキングホリデー（417・462ビザ）のオーストラリア タックスリターン還付金を無料で見積もり。2025-26年度のWHM税率使用。あなたの還付金がいくらか即時計算 - 登録不要。',
  keywords: [
    // Refund-focused
    'タックスリターン 還付金 計算機',
    'タックスリターン 還付金 計算',
    'オーストラリア タックスリターン 還付金 計算',
    'オーストラリア 還付金 計算 ワーホリ',
    'ワーキングホリデー 還付金 計算',
    'ワーホリ 還付金 いくら シミュレーション',
    'ワーホリ 還付金 シミュレーション',
    'WHV 還付金 計算機',
    'バックパッカー 還付金 計算 オーストラリア',
    '417ビザ 還付金 計算',
    '462ビザ 還付金 計算',
    'オーストラリア タックスリターン 還付 見積もり',
    'オーストラリア 税金 戻る 計算',
    // Adjacent
    '税金 計算機 オーストラリア',
    'ワーキングホリデー 税金 計算',
    'バックパッカー 税金 シミュレーター',
    '417ビザ 税金 計算',
    '462ビザ 税金 計算',
    'WHM 税率 計算機',
    'オーストラリア 還付金 見積もり',
    'オーストラリア 税金 計算 無料',
    'タックスリターン 還付金 計算 日本語',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/calculator`,
    languages: {
      'en-AU': `${SITE_URL}/calculator`,
      'de': `${SITE_URL}/de/calculator`,
      'ja': `${SITE_URL}/ja/calculator`,
      'x-default': `${SITE_URL}/calculator`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/calculator`,
    siteName: 'Working Holiday Tax',
    title: 'タックスリターン 還付金 計算機 - ワーキングホリデー オーストラリア',
    description: 'ワーキングホリデーのオーストラリア タックスリターン還付金を無料で見積もり。即時・登録不要。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'タックスリターン 還付金 計算機 - ワーホリ オーストラリア',
    description: 'ワーホリのオーストラリア タックスリターン還付金を無料で見積もり。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'この計算機はどのくらい正確ですか？',
    answer: 'この計算機は2025-26年度のワーキングホリデーメーカーおよびオーストラリア税務居住者の税率を使用しています。入力したデータに基づいて見積もりを提供します。実際の還付額は控除可能な経費、税額控除、その他の要因によって異なる場合があります。正確な計算には、私たちがタックスリターンを行います。',
  },
  {
    question: 'この計算機はどの税率を使用していますか？',
    answer: 'ワーキングホリデーメーカー：最初の$45,000まで15%、$45,001〜$135,000は30%、$135,001〜$190,000は37%、$190,000超は45%。オーストラリア税務居住者：$18,200まで非課税、$45,000まで16%、$135,000まで30%、$190,000まで37%、それ以上は45%。',
  },
  {
    question: '収入と源泉徴収額はどこで確認できますか？',
    answer: 'どちらの数字も、雇用主が税年度末に発行するPAYG Payment SummaryまたはIncome Statementに記載されています。ATOアカウントをお持ちの方は、そちらでも確認できます。',
  },
  {
    question: '還付金が出る結果になりました。次はどうすればいいですか？',
    answer: 'WhatsAppでご連絡ください。タックスリターンを代行し、すべての控除可能な経費を申請します。多くの場合、ここでの見積もりよりも高額な還付金を取り戻せます。',
  },
  {
    question: '追加納税の結果になりました。どうすればいいですか？',
    answer: 'すぐにご相談ください。状況を確認し、見逃された控除を見つけ、タックスリターンを正しく提出します。多くの場合、適切な控除を申請することで、追加納税を減らしたり、完全に避けることができます。',
  },
  {
    question: '日本に帰国後でもこの計算機を使えますか？',
    answer: 'はい。この計算機は出身国や現在の居住地に関係なく利用できます。税率はビザの種類（417または462）とオーストラリアで得た収入に基づいており、現在どこに住んでいるかは関係ありません。日本に帰国された後でも、この見積もりは有効です。',
  },
  {
    question: 'この計算機にメディケア税は含まれていますか？',
    answer: 'この計算機は所得税に焦点を当てています。メディケア税は別途2%の課税ですが、ほとんどのワーキングホリデーメーカーは免除対象です。当社がタックスリターンを提出する際、対象資格があれば免除申請を行います。そのため実際の還付金は計算機の見積もりより高くなる場合があります。',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'ja',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: '税金計算機', item: `${SITE_URL}/ja/calculator` },
  ],
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ワーキングホリデー税金計算機',
  description: 'オーストラリアのワーキングホリデービザ保持者向け無料税金計算機。',
  url: `${SITE_URL}/ja/calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  inLanguage: 'ja',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'AUD',
  },
}

export default function JapaneseCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
