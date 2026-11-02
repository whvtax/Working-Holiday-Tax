import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { CalculatorClient } from './CalculatorClient'
import { MobileCta } from '@/components/ui/MobileCta'

export const metadata: Metadata = {
  title: { absolute: 'ワーホリのタックスリターン計算ツール（2025-26年度）' },
  description:
    'オーストラリアの還付金と、65%のDASP税を引いた後のスーパー受取額を試算します。417・462ビザの最新の税率を使った、あくまで目安です。',
  keywords: [
    'タックスリターン 還付金 計算',
    'オーストラリア タックスリターン 還付金 計算',
    'ワーキングホリデー 還付金 計算',
    'ワーホリ 還付金 いくら シミュレーション',
    '417ビザ 還付金 計算',
    '462ビザ 還付金 計算',
    'オーストラリア 税金 戻る 計算',
    'ワーホリ 税金 計算',
    'WHM 税率 計算',
    'スーパー受取 計算 DASP',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/calculator`,
    languages: {
      'en-AU': `${SITE_URL}/calculator`,
      'de': `${SITE_URL}/de/calculator`,
      'ja': `${SITE_URL}/ja/calculator`,
      ...newLocaleLanguages('/calculator'),
      'x-default': `${SITE_URL}/calculator`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/calculator`,
    siteName: 'Working Holiday Tax',
    title: 'ワーホリのタックスリターン計算ツール（2025-26年度）',
    description: '還付金の目安と、65%のDASP税を引いた後のスーパー受取額を試算します。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'ワーホリのタックスリターン計算ツール',
    description: '還付金の目安と、65%のDASP税を引いた後のスーパー受取額。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: '金額は分かりました。自分で提出してはいけないのですか？',
    answer:
      'ご自身で提出できますし、提出は簡単な部分です。ただし、この計算ツールでは、金額を左右する判断までは再現できません。手元にある数字を当てはめているだけだからです。\n\n実際の結果を決める判断は3つあり、そのどれもこのページの入力欄にはありません。どちらの居住区分が本当に当てはまるか、メディケア税がそもそも課されるべきだったか、そしてあなたの職種で何を控除できるかです。',
  },
  {
    question: 'この計算ツールはどのくらい正確ですか？',
    answer:
      '入力された数字に対する計算としては正確ですが、それ以上のことはできません。2025-26年度のワーキングホリデーメーカーおよびオーストラリア税務居住者の税率を、入力された収入と源泉徴収額に当てはめているだけです。最終的な答えではなく、相談の出発点としてお使いください。',
  },
  {
    question: 'どの税率を使っていますか？',
    answer:
      'ワーキングホリデーメーカー向けの税率表と、オーストラリア税務居住者向けの税率表の両方で計算できます。どちらが当てはまるかは設定ではなく、その年のご本人の事情を踏まえた判断で、最終的な判断はATOが行います。当社が1年の実態を確認します。',
  },
  {
    question: 'なぜメディケア税が含まれていないのですか？',
    answer:
      'この計算ツールを使う方の多くは、そもそも支払う義務がないからです。メディケア税は課税所得の2%で、日本のように相互協定を結んでいない国のワーキングホリデーメーカーは、免除証明書によって外すことができます。\n\n最初から含めてしまうと、多数派には還付額を低く見せることになります。そのため、実際の対象資格を確認できる段階で扱っています。',
  },
  {
    question: '追加納税と表示されました。これで確定ですか？',
    answer:
      'たいていは確定ではありません。納税と表示される場合、源泉徴収がほとんどされていない収入、たとえばABNでの仕事が含まれているか、控除を入力する欄がないために控除がまったく反映されていないかのどちらかです。\n\n控除は課税所得を下げるため、納税が還付に変わることもあります。この数字を最終と考えず、一度確認することをおすすめします。',
  },
  {
    question: '日本に帰国した後でも使えますか？',
    answer:
      '使えます。オーストラリアの税務上の立場は、現在の居住地ではなく、オーストラリアで得た収入と、その時に保持していたビザで決まります。\n\n東京からでもシドニーからでも計算結果は同じで、タックスリターンも海外から提出できます。帰国後に変わるのは、スーパーもDASPとして受け取れるようになる点です。',
  },
  {
    question: 'スーパー残高はどのように計算されますか？',
    answer:
      '入力された残高にDASPの税率を当てはめ、口座に届く金額を表示します。417・462ビザを一度でも保持した方は課税対象部分に65%が適用されるため、10,000ドルの残高なら受取額は約3,500ドルです。\n\nスーパーの受け取りはタックスリターンとは別の申請で、オーストラリアを出国し、ビザが失効または取り消された後にのみ可能です。',
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
    { '@type': 'ListItem', position: 2, name: '計算ツール', item: `${SITE_URL}/ja/calculator` },
  ],
}

// offersブロックは置きません。料金は本文にもスキーマにも載せず、この計算
// ツール自体を売り物として前面に出さない方針です。
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ワーホリのタックスリターン計算ツール',
  description:
    'ワーキングホリデービザ保持者向けに、オーストラリアの還付金とDASPスーパー受取額の目安を2025-26年度の税率で試算します。',
  url: `${SITE_URL}/ja/calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  inLanguage: 'ja',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/calculator#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/ja/calculator`,
}

export default function JapaneseCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CalculatorClient faqs={faqs} photo={<PagePhoto page="calculator" locale="ja" />} />
      <MobileCta href={waUrl({ topic: 'calculator', lang: 'ja' })} lang="ja" topic="calculator" />
    </>
  )
}
