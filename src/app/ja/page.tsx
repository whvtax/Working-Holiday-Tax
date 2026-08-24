import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { getGoogleRating } from '@/lib/googleData'
import { waUrl } from '@/lib/wa'
import { WaLink } from '../HomeWa'

// ─── METADATA ───────────────────────────────────────────────────────────
// 用語はサイト全体と同じ「タックスリターン」で統一。料金は一切出さない。
export const metadata: Metadata = {
  // absolute, because a layout's title template applies to its child segments
  // and not to its own page, so this one route would otherwise keep the Latin
  // suffix every other Japanese page has dropped.
  title: { absolute: 'オーストラリア タックスリターン 還付金｜ワーホリ専門' },
  description:
    'ワーキングホリデー（417・462ビザ）専門のタックスリターン。居住区分、すべての雇用主、メディケア税の免除、控除を確認してから提出します。',
  keywords: [
    'オーストラリア タックスリターン 還付金',
    'オーストラリア タックスリターン',
    'ワーキングホリデー タックスリターン 還付',
    'ワーホリ タックスリターン 還付金',
    'ワーホリ タックスリターン',
    'ワーホリ 還付金',
    'オーストラリア 税金 還付 ワーホリ',
    'オーストラリア 税金 戻ってくる',
    'ワーホリ 還付金 いくら',
    'バックパッカー 税還付 オーストラリア',
    '417ビザ タックスリターン 還付',
    '462ビザ タックスリターン 還付',
    'WHV 還付金 オーストラリア',
    'オーストラリア タックスリターン 日本語',
    'オーストラリア タックスリターン やり方',
    'オーストラリア タックスリターン 期限',
    'ワーホリ 帰国後 タックスリターン 還付',
    'ワーホリ 帰国後 タックスリターン',
    'オーストラリア 税務上の居住者 ワーホリ',
    'オーストラリア ワーホリ タックスリターン',
    'ワーホリ 税金 オーストラリア',
    'TFN 申請 オーストラリア',
    'TFN 申請 ワーホリ',
    'ABN 登録 ワーホリ',
    'スーパーアニュエーション 返金',
    'スーパーアニュエーション 帰国後',
    'DASP 申請',
    'DASP 申請 日本',
    '417ビザ 税金',
    '462ビザ 税金',
    'メディケア税 免除',
    'ワーホリ 帰国後 税金',
    '日豪租税条約 ワーホリ',
    'Notice of Assessment 日本語',
    'タックスリターン 必要書類 ワーホリ',
    'PAYG Summary 見方',
  ],
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
    title: 'オーストラリア タックスリターン 還付金｜ワーホリ専門',
    description: '送信ボタンは誰でも押せます。大事なのはその前です。居住区分、すべての雇用主、メディケア税の免除、実際の仕事に対応する控除を確認したうえで提出します。',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'オーストラリア タックスリターン 還付金｜ワーホリ（417・462ビザ）専門',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'オーストラリア タックスリターン 還付金｜ワーホリ専門',
    description: 'ワーホリ専門のタックスリターン。居住区分、メディケア税の免除、控除まで確認してから提出します。帰国後でも対応。',
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

// ─── ICONS ──────────────────────────────────────────────────────────────
const IconTFN      = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="10.5" x2="11" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="13.5" x2="9" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>)
const IconABN      = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 8l7-5 7 5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7.5 17v-6h5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconReturn   = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v12M6 10l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 16v1a1 1 0 001 1h12a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>)
const IconSuper    = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 5.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const IconMedicare = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 17.5s-6-3.5-6-8.5a3 3 0 016-2 3 3 0 016 2c0 5-6 8.5-6 8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><line x1="10" y1="7" x2="10" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="7.5" y1="9.5" x2="12.5" y2="9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconWhatsApp = () => (<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.3-.9-2.8-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2 .9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" /></svg>)

// ─── COPY ───────────────────────────────────────────────────────────────

/** 2026年8月22日承認。書き換え不可。 */
const FIGURES = [
  {
    figure: '45%',
    body: 'TFNが雇用主に届く前の週は最高税率で源泉徴収。申請しない限り戻りません。',
  },
  {
    figure: '$18,200',
    body: '税務上の居住区分です。居住者と認められれば、非課税枠をまるごと使えます。',
  },
  {
    figure: '2%',
    body: '本来払う必要のなかったメディケア税です。証明書があれば外せますが、申請する人はほとんどいません。',
  },
]

const ANALYSIS = [
  {
    n: '01',
    title: '税務上の居住区分',
    body: '多くの人がチェックひとつで済ませる項目です。居住区分は高等裁判所のAddy判決でも争われた判断であり、このページで最も大きな金額が動く部分です。',
  },
  {
    n: '02',
    title: 'すべての雇用主と、すべての週',
    body: 'ワーホリの1年は複雑です。複数の雇用主、遅れた支払い、忘れていた仕事。記憶ではなくATOの公式記録と照らして、1年をまるごと組み立て直します。',
  },
  {
    n: '03',
    title: '該当する場合はメディケア税',
    body: '2%のメディケア税は、義務がなくても自動的に引かれます。それが本来あなたのものでなかった年を見抜き、外す手続きまで行うのが私たちの仕事です。',
  },
  {
    n: '04',
    title: '実際にした仕事に対応する控除',
    body: 'ファームとカフェとデリバリーでは、認められる経費が違います。仕事の中身を伺い、該当するものだけを正確に申請します。',
  },
  {
    n: '05',
    title: 'そして提出',
    body: '登録タックスエージェントが確認・承認したうえでATOに提出します。この部分は数分。金額を決めるのはその前の4つです。',
  },
]

const COMPARISON = [
  { mygov: '最初の1ドルから15%の税率がかかります',                 us: 'それが本当に正しいかを見極めます' },
  { mygov: 'メディケア税の免除については何も出てきません',   us: '対象であれば申請をサポートします' },
  { mygov: '控除欄は空白のまま',                             us: 'あなたの仕事で何が申請できるかを把握しています' },
  { mygov: 'アカウントと有効な電話番号が必要です',       us: 'あなたは何も必要ありません。ATOとは当社がやり取りします' },
]

const SERVICES = [
  { n: '01', href: '/ja/tfn',            icon: <IconTFN />,      title: 'TFN申請',         desc: '最初の給与より前に取得し、最高税率を避けます。' },
  { n: '02', href: '/ja/abn',            icon: <IconABN />,      title: 'ABN登録',         desc: '個人事業主として働くための登録。税金の話も先に。' },
  { n: '03', href: '/ja/tax-return',     icon: <IconReturn />,   title: 'タックスリターン', desc: '上記の確認をすべて行い、ATOへ提出します。' },
  { n: '04', href: '/ja/superannuation', icon: <IconSuper />,    title: 'スーパー受取',     desc: '全ファンドを探し、帰国時にDASPを申請します。' },
  { n: '05', href: '/ja/medicare',       icon: <IconMedicare />, title: 'メディケア税免除', desc: '条件を満たす年は、免除証明書を申請します。' },
]

const GUIDES = [
  { href: '/ja/blog/diy-tax-return-vs-tax-agent-working-holiday', title: '自分で申告するか、依頼するか', desc: 'それぞれ実際に何を失うのかを、正直に書いています。' },
  { href: '/ja/blog/tax-residency-working-holiday-makers',        title: '税務上の居住者かどうか',       desc: 'ワーホリの申告で最も大きな金額が動く問いです。' },
  { href: '/ja/blog/medicare-levy-working-holiday-makers',        title: 'メディケア税の免除',           desc: '2%を誰が払い、誰が払わないのか。外す手順まで。' },
  { href: '/ja/blog/tax-deductions-working-holiday-makers',       title: '何が控除できるのか',           desc: '一般論ではなく、仕事の種類ごとの控除です。' },
]

const FAQS = [
  {
    question: 'オーストラリアのタックスリターンの還付額は何で決まりますか？',
    answer: '大きく4つで決まります。その年の税務上の居住区分、TFNが雇用主に届く前に45%で源泉徴収された期間があるかどうか、メディケアの対象外なのに2%のメディケア税が引かれていたかどうか、そして実際にした仕事に対応する控除です。オーストラリアでまったく同じ金額を稼いだ2人でも、この4つによって還付額は大きく変わります。だからこそ提出そのものより確認作業のほうが重要で、当社は数字を1つ入力する前にこの4つを確認します。',
  },
  {
    question: 'myGovで自分で申告してはいけないのですか？',
    answer: '自分で申告することはできますし、提出自体は簡単な部分です。ただしmyGovは入力された内容をそのまま受け付けるだけで、あなたが税務上の居住者だったのか、雇用主が誤った税率で源泉徴収していたのか、メディケア税の免除証明書の対象になるのか、あなたの仕事で何が控除できるのかは教えてくれません。これらはあなた個人の1年についての判断であり、金額を決めるのはここです。自分で行う場合のリスクは提出ではなく、その中身にあります。',
  },
  {
    question: 'サービスの料金はいくらですか？',
    answer: '料金は定額制で、還付金に対する歩合ではありません。作業を始める前にWhatsAppで料金をご確認いただき、お支払いは前払いです。お支払い後に詳しい質問票をお送りし、作業を開始します。還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。',
  },
  {
    question: 'ワーキングホリデーメーカーの税率はいくらですか？',
    answer: 'ワーキングホリデーメーカーは、45,000ドルまで一律15%、135,000ドルまで30%、190,000ドルまで37%、それを超える部分は45%で課税されます。雇用主にTFNを提出していない場合は最高税率で源泉徴収されるため、これがワーホリ参加者に還付が生じる最も多い理由の一つです。',
  },
  {
    question: '帰国後でもタックスリターンの申請はできますか？',
    answer: 'はい。日本をはじめ多くの国から、帰国して何年も経ってからタックスリターンを提出し、スーパーアニュエーション（DASP）を申請している方と日常的にお仕事をしています。手続きはすべてオンラインです。1点だけ先に知っておいてください。ATOはタックスリターンの還付金をオーストラリアの銀行口座にしか支払えませんが、スーパー（DASP）は海外の口座で受け取れます。オーストラリアの口座をすでに解約している場合は、進める順番が変わるので早めにお知らせください。',
  },
  {
    question: 'どのくらいで返信がありますか？',
    answer: '営業時間内（月曜から金曜、オーストラリア東部時間の9時から18時）であれば、通常1時間以内に返信します。営業時間外の場合は翌朝いちばんにご連絡します。まず質問だけでも問題ありませんし、日本語で対応します。',
  },
  {
    question: 'タックスリターンだけのサービスですか？',
    answer: 'いいえ。TFN申請、ABN登録、スーパーアニュエーション（DASP）の申請、メディケア税の免除証明書も扱っており、417・462ビザで必要になる手続きはひととおりカバーしています。ワーキングホリデーの税金だけを扱っているため、すべて同じ担当が対応し、一般の会計事務所のように部署をまたいで回されることはありません。',
  },
]

const WA_TAX_RETURN = waUrl({ topic: 'tax-return', lang: 'ja' })

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '11px', letterSpacing: '0.1em', fontWeight: 500 }
const BODY: CSSProperties   = { fontSize: '15px', lineHeight: 1.8 }
const LEDE: CSSProperties   = { fontSize: '16.5px', lineHeight: 1.8 }

export default async function JapaneseHomePage() {
  const gRating = await getGoogleRating()

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/ja/#webpage`,
    url: `${SITE_URL}/ja`,
    name: 'オーストラリア タックスリターン 還付金｜ワーホリ専門',
    description: '417・462ビザ専門。税務上の居住区分、すべての雇用主、メディケア税の免除、実際の仕事に対応する控除を確認したうえでATOに提出します。',
    inLanguage: 'ja',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
  }

  // Only built when gRating.live、see googleData.ts. Never emit a fabricated
  // rating to Google as structured data.
  const serviceLd = gRating.live ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    description: 'オーストラリアのワーキングホリデービザ保持者向けタックスリターン。',
    url: SITE_URL,
    inLanguage: 'ja',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: gRating.rating.toFixed(1),
      reviewCount: gRating.count,
      bestRating: '5',
      worstRating: '1',
    },
  } : null

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ja',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    inLanguage: 'ja',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    ],
  }

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService', 'AccountingService'],
    '@id': `${SITE_URL}/#organization`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    telephone: '+61424513998',
    image: `${SITE_URL}/og-image.png`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    description: 'ワーキングホリデー（ビザサブクラス417・462）の税金だけを扱う税務サービス。お客様ご自身の言語で対応します。',
    foundingDate: '2020',
    knowsLanguage: ['en', 'de', 'ja'],
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: {
      '@type': 'Audience',
      name: 'オーストラリアのワーキングホリデービザ保持者（サブクラス417・462）',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ワーキングホリデーメーカー向け税務サービス',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'TFN（タックスファイルナンバー）取得代行', description: 'ワーキングホリデーメーカーのためのTFN取得申請。', url: `${SITE_URL}/ja/tfn` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ABN（事業者番号）登録代行', description: '個人事業主としてのABN登録。', url: `${SITE_URL}/ja/abn` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'タックスリターン代行', description: '居住区分、雇用主、メディケア税、控除を確認したうえでATOへ提出。', url: `${SITE_URL}/ja/tax-return` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'スーパーアニュエーション返金（DASP）申請', description: '帰国後のスーパーアニュエーション（DASP）申請代行。', url: `${SITE_URL}/ja/superannuation` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'メディケア税免除（Medicare Levy Exemption）申請', description: 'ワーキングホリデーメーカー向けメディケア税免除証明書の申請。', url: `${SITE_URL}/ja/medicare` } },
      ],
    },
    knowsAbout: [
      'オーストラリア税法',
      'ワーキングホリデーの税務上の居住区分',
      '日豪租税条約の無差別条項',
      'ワーキングホリデービザ サブクラス417',
      'ワーキングホリデービザ サブクラス462',
      'タックスファイルナンバー（TFN）',
      'オーストラリアビジネスナンバー（ABN）',
      'スーパーアニュエーション・DASP',
      'メディケア税免除',
      'PAYG源泉徴収',
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      {serviceLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F2FAF7 100%)' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 pt-11 pb-11 lg:pt-14 lg:pb-14 text-center">

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '16px' }}>
            ワーキングホリデービザ 417・462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(27px, 4.6vw, 40px)', lineHeight: 1.32, letterSpacing: '-0.01em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>送信ボタンは誰でも押せます。</span>
            <span style={{ display: 'block', color: '#0B5240' }}>大事なのはその前です。</span>
          </h1>

          <p className="mx-auto hero-animate-delay"
            style={{ ...LEDE, color: '#4C6459', maxWidth: '58ch', marginBottom: '26px' }}>
            還付額を決めるのは5つ。どれも自動では反映されません。
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_TAX_RETURN} position="hero" topic="tax-return" lang="ja"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{ height: '54px', padding: '0 30px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '330px', width: '100%' }}>
              <IconWhatsApp />
              WhatsAppで相談する
            </WaLink>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              約1時間で返信します。
            </p>
          </div>

          <div className="flex justify-center" style={{ marginTop: '20px' }}>
            <GoogleRating variant="pill" lang="ja" />
          </div>
        </div>
      </section>

      {/* ── 2. myGovとの比較 ─────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>みんなが聞くこと</p>

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.5vw, 29px)', lineHeight: 1.45, letterSpacing: '-0.01em', marginBottom: '14px' }}>
            <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>myGovは間違った申告も、</span>
            <span style={{ display: 'block' }}>正しい申告と同じように受け付けます。</span>
          </h2>

          <p style={{ ...LEDE, color: '#4C6459', maxWidth: '42ch', marginBottom: '26px' }}>
            居住者だったのか、メディケア税があなたの負担だったのか、その職種で何が控除できるのか。画面上でそれを確かめる人は誰もいません。
          </p>

          <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
            {COMPARISON.map((row, i) => (
              <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                <div style={{ padding: '15px 18px', background: '#FFFFFF' }}>
                  <p style={{ ...KICKER, color: '#4C6459', marginBottom: '5px' }}>myGovの場合</p>
                  <p style={{ ...BODY, color: '#2A3C34' }}>{row.mygov}</p>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                  style={{ padding: '15px 18px', background: '#F2FAF7' }}>
                  <p style={{ ...KICKER, color: '#0B5240', marginBottom: '5px' }}>当社の場合</p>
                  <p style={{ ...BODY, color: '#080F0D', fontWeight: 500 }}>{row.us}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-serif" style={{ fontSize: '18px', lineHeight: 1.75, color: '#0B5240', marginTop: '26px', maxWidth: '36ch', fontWeight: 700 }}>
            myGovにログインすることも、IDを連携することも、どの書類がどれかを調べることもありません。ATOとは当社が直接やり取りします。
          </p>

          <div style={{ marginTop: '22px' }}>
            <WaLink href={WA_TAX_RETURN} position="section" topic="tax-return" lang="ja"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{ height: '52px', padding: '0 28px', fontSize: '15px', borderRadius: '100px' }}>
              <IconWhatsApp />
              WhatsAppで相談する
            </WaLink>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '10px' }}>
              約1時間で返信します。
            </p>
          </div>
        </div>
      </section>
      {/* ── 3. 3つの数字 ─────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
            タックスリターンの還付額は何で決まりますか？
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '44ch', marginBottom: '30px' }}>
            多くの場合、次の3つです。
          </p>

          <div className="grid gap-5 sm:grid-cols-3">
            {FIGURES.map((f) => (
              <div key={f.figure} style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
                <p className="font-serif font-black text-forest-500"
                  style={{ fontSize: '33px', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>
                  {f.figure}
                </p>
                <p style={{ ...BODY, color: '#2A3C34' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. 保証 ──────────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-14" style={{ background: '#0B5240' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 text-center reveal">
          <p style={{ ...KICKER, color: '#F9D88A', marginBottom: '14px' }}>当社の保証</p>
          <p className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(21px, 2.8vw, 29px)', lineHeight: 1.5, letterSpacing: '-0.01em', maxWidth: '24ch' }}>
            還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。
          </p>
          <p className="mx-auto" style={{ ...BODY, color: 'rgba(255,255,255,0.72)', maxWidth: '40ch', marginTop: '16px' }}>
            料金は定額で、戻ってくる金額に対する歩合ではありません。
          </p>
        </div>
      </section>

      {/* ── 5. すべてのタックスリターンで確認すること ────────────────────── */}
      <section id="how-it-works" className="py-12 lg:py-16 bg-white">
        <div className="max-w-[780px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>実際の作業</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
            すべてのタックスリターンで確認していること
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '44ch', marginBottom: '30px' }}>
            仕事が1つでも6つでも、同じ5つのステップを確認します。そのうち4つは、タックスリターンに何かを入力する前に終わっています。
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {ANALYSIS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-serif font-black flex-shrink-0"
                  style={{ fontSize: '15px', color: '#16775C', width: '28px', paddingTop: '4px' }}
                  aria-hidden="true">{s.n}</span>
                <div>
                  <h3 className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.5, marginBottom: '6px' }}>{s.title}</h3>
                  <p style={{ ...BODY, color: '#2A3C34' }}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>


      {/* ── 6. TFNのみか、TFNとABNか ─────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
            あなたの1年はどちらでしたか？
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '44ch', marginBottom: '26px' }}>
            申告の中身が変わるので、話す前に知らせてほしい唯一の点です。当てはまる方を選ぶと、その内容がメッセージに入ります。
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white rounded-[14px] flex flex-col"
              style={{ padding: '22px 20px', border: '1px solid #E2EFE9', boxShadow: '0 1px 2px rgba(7,58,45,.06)' }}>
              <h3 className="font-semibold text-ink" style={{ fontSize: '16px', marginBottom: '8px' }}>TFNのみ</h3>
              <p style={{ ...BODY, color: '#2A3C34', marginBottom: '18px', flex: 1 }}>
                どの仕事も給与を通して支払われ、明細ごとに税金が引かれていました。
              </p>
              <WaLink href={waUrl({ topic: 'tax-return', lang: 'ja', tier: 'tfn' })} position="inline" topic="tax-return" lang="ja" tier="tfn"
                className="btn-primary inline-flex items-center justify-center gap-2"
                style={{ height: '48px', fontSize: '15px', borderRadius: '100px', width: '100%' }}>
                <IconWhatsApp />
                こちらでした
              </WaLink>
            </div>

            <div className="bg-white rounded-[14px] flex flex-col"
              style={{ padding: '22px 20px', border: '1px solid #E2EFE9', boxShadow: '0 1px 2px rgba(7,58,45,.06)' }}>
              <h3 className="font-semibold text-ink" style={{ fontSize: '16px', marginBottom: '8px' }}>TFNとABN</h3>
              <p style={{ ...BODY, color: '#2A3C34', marginBottom: '18px', flex: 1 }}>
                収入の一部がABN宛てで、そこからは何も源泉徴収されていません。
              </p>
              <WaLink href={waUrl({ topic: 'abn', lang: 'ja', tier: 'tfn-abn' })} position="inline" topic="abn" lang="ja" tier="tfn-abn"
                className="btn-primary inline-flex items-center justify-center gap-2"
                style={{ height: '48px', fontSize: '15px', borderRadius: '100px', width: '100%' }}>
                <IconWhatsApp />
                こちらでした
              </WaLink>
            </div>
          </div>

          <p style={{ fontSize: '14px', color: '#4C6459', marginTop: '18px', lineHeight: 1.8 }}>
            どちらか分からない場合は{' '}
            <WaLink href={waUrl({ topic: 'general', lang: 'ja', tier: 'unsure' })} position="inline" topic="general" lang="ja" tier="unsure"
              className="inline-flex items-center"
              style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline', minHeight: '44px' }}>
              どんな仕事だったか教えてください
            </WaLink>
          </p>
        </div>
      </section>

      {/* ── 7. サポート内容 ──────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>サポート内容</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '26px' }}>
            最初の給与明細から、帰国後についてくるお金まで
          </h2>

          <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href}
                className="group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg"
                style={{ padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <span className="text-muted" style={{ ...KICKER, marginBottom: '10px' }}>{s.n}</span>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white flex-shrink-0"
                  style={{ marginBottom: '10px' }}>{s.icon}</span>
                <h3 className="font-semibold text-ink service-card-title" style={{ fontSize: '15px', marginBottom: '5px' }}>{s.title}</h3>
                <p className="flex-1" style={{ fontSize: '13px', lineHeight: 1.75, color: '#4C6459', marginBottom: '12px' }}>{s.desc}</p>
                <span className="flex items-center gap-1.5 font-medium text-forest-600 transition-all group-hover:gap-3" style={{ fontSize: '13px' }}>
                  詳しく見る →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. 信頼 ──────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink text-center"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
            ワーキングホリデーの税金だけを扱っています。
          </h2>
          <p className="text-center mx-auto" style={{ ...BODY, color: '#2A3C34', maxWidth: '46ch', marginBottom: '28px' }}>
            作成するタックスリターンはすべて417・462ビザの方のもので、登録タックスエージェントが確認・承認したうえでATOに提出されます。
          </p>

          <GoogleReviews lang="ja" />

          <div className="rounded-[12px] flex gap-3 mx-auto"
            style={{ marginTop: '28px', padding: '16px 18px', background: '#FDF0D5', border: '1px solid #F9D88A', width: 'fit-content', maxWidth: '100%' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M12 2L2 22h20L12 2z" stroke="#B8770C" strokeWidth="1.8" strokeLinejoin="round" />
              <line x1="12" y1="10" x2="12" y2="15" stroke="#B8770C" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="18" x2="12.01" y2="18" stroke="#B8770C" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p style={{ ...BODY, color: '#2A3C34' }}>
              <strong style={{ color: '#080F0D' }}>税理士がmyGovのログイン情報を尋ねることは絶対にありません。</strong>
              尋ねてくる相手は当社ではありません。
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. よくある質問 ─────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '20px' }}>
            相談の前によく聞かれること
          </h2>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="ja-home-faq" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer">{f.answer}</p>
              </details>
            ))}
          </div>

          <p style={{ fontSize: '14px', color: '#4C6459', marginTop: '24px', lineHeight: 1.8 }}>
            ここにない質問は{' '}
            <Link href="/ja/contact" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>お問い合わせ</Link>
            からどうぞ。
          </p>
        </div>
      </section>

      {/* ── 10. ガイド ───────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>ガイド</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
            先に全部読んでおきたい方へ
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '44ch', marginBottom: '24px' }}>
            申告の結果を決める同じ4つの問いについて書いています。連絡させるために内容を出し惜しみすることはありません。
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {GUIDES.map((g) => (
              <Link key={g.href} href={g.href}
                className="group bg-white rounded-[12px] transition-all hover:shadow-lg"
                style={{ padding: '16px 18px', border: '1px solid #E2EFE9', display: 'block' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '4px' }}>{g.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.75, color: '#4C6459' }}>{g.desc}</p>
              </Link>
            ))}
          </div>

          <p style={{ marginTop: '18px' }}>
            <Link href="/ja/blog" className="inline-flex items-center"
              style={{ color: '#0B5240', fontWeight: 600, fontSize: '15px', textDecoration: 'underline', minHeight: '44px' }}>
              ガイド一覧 →
            </Link>
          </p>
        </div>
      </section>

      {/* ── 最後のCTA ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-12" style={{ background: '#0B5240' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 text-center reveal">
          <h2 className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(21px, 2.8vw, 29px)', lineHeight: 1.5, letterSpacing: '-0.01em', maxWidth: '24ch', marginBottom: '14px' }}>
            1年間の状況を教えてください
          </h2>
          <p className="mx-auto" style={{ ...BODY, color: 'rgba(255,255,255,0.72)', maxWidth: '38ch', marginBottom: '24px' }}>
            どこで働いたか、だいたいの時期、ABNで請求したことがあるかどうか。それだけあれば、今の状況をお伝えできます。
          </p>
          <WaLink href={WA_TAX_RETURN} position="footer" topic="tax-return" lang="ja"
            className="btn-primary inline-flex items-center justify-center gap-2"
            style={{ height: '54px', padding: '0 30px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '330px', width: '100%' }}>
            <IconWhatsApp />
            WhatsAppで相談する
          </WaLink>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', marginTop: '12px' }}>
            約1時間で返信します。
          </p>
        </div>
      </section>

      <MobileCta href={WA_TAX_RETURN} lang="ja" topic="tax-return" />
    </>
  )
}
