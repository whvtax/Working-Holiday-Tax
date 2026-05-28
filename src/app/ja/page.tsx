import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL, SITE_URL, AGENT_NAME } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'

// ─── METADATA - rich SEO + AI optimized for Japanese market ─────────────
export const metadata: Metadata = {
  title: 'オーストラリア タックスリターン 還付金 | ワーホリ専門の登録税理士',
  description:
    'オーストラリア タックスリターン 還付金を、ワーキングホリデー（417・462ビザ）専門の登録税理士が手続き代行。TFN申請、スーパーアニュエーション返金（DASP）、ABN登録まで日本語でオンライン完結。帰国後の申請にも対応します。',
  keywords: [
    // Primary refund-focused terms (core service)
    'オーストラリア タックスリターン 還付金',
    'オーストラリア タックスリターン',
    'ワーキングホリデー タックスリターン 還付',
    'ワーホリ タックスリターン 還付金',
    'ワーホリ タックスリターン',
    'ワーホリ 還付金',
    'オーストラリア 税金 還付 ワーホリ',
    'オーストラリア 税金 戻ってくる',
    'オーストラリア 税金 返金 ワーホリ',
    'ワーホリ 還付金 いくら',
    'バックパッカー 税還付 オーストラリア',
    '417ビザ タックスリターン 還付',
    '462ビザ タックスリターン 還付',
    'WHV 還付金 オーストラリア',
    'オーストラリア タックスリターン 日本語',
    'オーストラリア タックスリターン やり方',
    'オーストラリア タックスリターン いつ',
    'オーストラリア タックスリターン 期限',
    'ワーホリ 帰国後 タックスリターン 還付',
    'ワーホリ 帰国後 タックスリターン',
    'タックスリターン 帰国後 オーストラリア',
    'オーストラリア 税金 取り戻す ワーホリ',
    'オーストラリア 確定申告 ワーホリ',
    // Adjacent services
    'オーストラリア ワーホリ タックスリターン',
    'ワーホリ 税金 オーストラリア',
    'TFN 申請 オーストラリア',
    'TFN 申請 ワーホリ',
    'ABN 登録 ワーホリ',
    'スーパーアニュエーション 返金',
    'スーパー 返金 オーストラリア',
    'スーパーアニュエーション 帰国後',
    'DASP 申請',
    'DASP 還付',
    'DASP 申請 日本',
    '417ビザ 税金',
    '462ビザ 税金',
    'バックパッカー 税金 オーストラリア',
    'オーストラリア 税理士 日本人',
    'オーストラリア 税務代理人 ワーホリ',
    'メディケア税 免除',
    'メディケア税 還付',
    'ワーホリ 帰国後 税金',
    // Treaty / long-tail
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
    title: 'オーストラリア タックスリターン 還付金 | ワーホリ専門の登録税理士',
    description: 'オーストラリアのワーホリ（417・462ビザ）専門の登録税理士。タックスリターン還付金、TFN申請、スーパーアニュエーション返金（DASP）まで日本語ですべてオンライン。帰国後も対応。',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'オーストラリア タックスリターン 還付金 - ワーホリ（417・462ビザ）専門の登録税理士',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'オーストラリア タックスリターン 還付金 | ワーホリ専門',
    description: 'オーストラリアのワーホリ専門の登録税理士。タックスリターン還付金を日本語で代行申請。帰国後でも対応。',
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

// ─── ICONS - relevant per service ───────────────────────────────────────
const IconTFN     = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="10.5" x2="11" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="13.5" x2="9" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>)
const IconABN     = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 8l7-5 7 5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7.5 17v-6h5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconReturn  = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v12M6 10l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 16v1a1 1 0 001 1h12a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>)
const IconSuper   = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 5.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const IconMedicare = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 17.5s-6-3.5-6-8.5a3 3 0 016-2 3 3 0 016 2c0 5-6 8.5-6 8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><line x1="10" y1="7" x2="10" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="7.5" y1="9.5" x2="12.5" y2="9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconStar    = () => (<svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>)
const CheckIcon   = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M3.5 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>)

// ─── TESTIMONIALS - Japanese WHV reviews ─────────────────────────────────
const TESTIMONIALS = [
  { name: '佐藤 健太', from: '日本 · WHV 417', quote: '何から始めればいいか分からず不安でしたが、日本語で丁寧に対応してもらえて、知らなかった控除も取り戻してくれました。', amount: '$4,100', initials: '佐' },
  { name: '田中 美咲', from: '日本 · WHV 462', quote: 'ファームジョブで複数の雇用主のもとで働いたので複雑でしたが、すべて整理してタックスリターンを提出してくれました。', amount: '$2,450', initials: '田' },
  { name: '山本 翔太', from: '日本 · WHV 417', quote: '帰国後にスーパーアニュエーション返金（DASP）を依頼。日本の口座に振り込んでもらえて本当に楽でした。', amount: '$3,200', initials: '山' },
]

const STEPS = [
  { n: '1', title: 'ご相談・状況の確認',     body: 'TFN、ABN、ワーホリ タックスリターン、スーパー受取など、必要なサービスを最初にご案内します。' },
  { n: '2', title: '必要書類のご準備',       body: 'シンプルなチェックリストに沿って情報をお送りいただくだけ。複雑な書類作業は不要です。' },
  { n: '3', title: '当社が手続きを代行',     body: '登録税理士が、書類作成からATO（オーストラリア税務署）への申請まですべて代行します。' },
  { n: '4', title: 'ATOからの結果通知',     body: 'ATOによるタックスリターン処理が完了次第、還付金が発生する場合はご指定のオーストラリアの銀行口座へ直接お振り込みします。' },
]

const SERVICES = [
  { n: '01', href: '/ja/tfn',            icon: <IconTFN />,      title: 'TFN申請',         desc: '初日からワーキングホリデーの正しい税率で働くために必要なタックスファイルナンバーを取得します。' },
  { n: '02', href: '/ja/abn',            icon: <IconABN />,      title: 'ABN登録',         desc: '個人事業主として働き、正しく請求書を発行するためのABNを登録します。' },
  { n: '03', href: '/ja/tax-return',     icon: <IconReturn />,   title: 'タックスリターン', desc: '年次のワーホリ タックスリターンを提出し、受け取るべき還付金を漏れなく申請します。' },
  { n: '04', href: '/ja/superannuation', icon: <IconSuper />,    title: 'スーパー受取',     desc: '帰国時に、積み立てたスーパーアニュエーションをDASPで申請・受け取ります。' },
  { n: '05', href: '/ja/medicare',       icon: <IconMedicare />, title: 'メディケア税免除', desc: '対象外の方は、所得の2%にあたるメディケア税の免除を申請できます。' },
]

const FAQS = [
  {
    question: 'オーストラリア タックスリターンの還付金はどのような仕組みですか？',
    answer: '417・462ビザでオーストラリアで働いていた場合、雇用主は毎回の給与から税金を源泉徴収しています。会計年度末（6月30日）の後にATO（オーストラリア税務署）へタックスリターンを提出すると、払いすぎていた分が還付金としてあなたに戻ってきます。還付金の金額は、所得、税務上の居住者ステータス、申告可能な控除、雇用主がワーキングホリデーメーカー雇用主として登録されていたかなど、個々の状況によって異なります。登録税理士が状況を確認し、正しく申告手続きを行います。',
  },
  {
    question: 'サービスの料金はいくらですか？',
    answer: '初回のご相談とお見積もりは無料です。料金はサービスごとに定額制で、タックスリターンの場合は還付金から差し引いてお支払いいただくことも可能です。事前のお支払いは必要ありません。作業を始める前に必ず料金にご納得いただいてから進めます。',
  },
  {
    question: '返信はどのくらいで来ますか？',
    answer: '営業時間内（月〜金、シドニー時間9〜18時／日本時間10〜19時）は通常1時間以内にご返信します。営業時間外のお問い合わせには、翌営業日の朝一番にご対応いたします。',
  },
  {
    question: '帰国後でもタックスリターンや還付金の申請はできますか？',
    answer: 'はい、もちろん対応いたします。すでにオーストラリアを離れて日本に帰国された方のワーホリ タックスリターンや、スーパーアニュエーション返金（DASP）も、日本からオンラインで申請可能です。タックスリターンの還付金はオーストラリアの銀行口座への振込のみ可能です（ATOのルール）。スーパー返金（DASP）は日本の口座でもお受け取りいただけます。',
  },
  {
    question: 'ワーキングホリデーメーカーの税率はいくらですか？',
    answer: 'ワーキングホリデーメーカー（417・462ビザ保持者）には、年収45,000ドルまで一律15%、45,001〜135,000ドルは30%、135,001〜190,000ドルは37%、190,001ドル以上は45%の税率が適用されます。オーストラリア居住者向けの非課税枠（タックスフリースレッショルド）は適用されません。雇用主にTFNを提出しない場合は最高税率の45%で源泉徴収されるため、これがワーホリ参加者が還付金を受け取る最も多い理由の一つです。',
  },
  {
    question: 'タックスリターンの還付金はいくらもらえますか？',
    answer: '還付金の金額は、収入、源泉徴収された税額、税務上の居住者ステータス、ビザの種類、申告可能な控除など、個人の状況によって大きく異なります。具体的な金額をお約束することはできませんが、当社では正確にタックスリターンを提出し、お客様が受け取るべき控除を漏れなく申告することをお約束いたします。',
  },
  {
    question: 'タックスリターンだけのサービスですか？',
    answer: 'いいえ、税務に関するすべてのサービスを提供しています。TFN申請、ABN登録、年次のワーホリ タックスリターン、スーパーアニュエーション返金（DASP）、メディケア税免除まで、417・462ビザのワーキングホリデーメーカーに必要な手続きをワンストップでサポートいたします。',
  },
]

export default function JapaneseHomePage() {

  // ─── Schema.org for Japanese page ───
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/ja/#webpage`,
    url: `${SITE_URL}/ja`,
    name: 'オーストラリア タックスリターン 還付金 | ワーホリ専門の登録税理士',
    description: '417・462ビザのワーキングホリデーメーカー専門の登録税理士。タックスリターン還付金、TFN、スーパー（DASP）、ABNまで日本語ですべてオンライン。',
    inLanguage: 'ja',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/ja/#service`,
    name: 'ワーキングホリデー向け税務サービス（オーストラリア）',
    description: 'オーストラリアのワーキングホリデービザ保持者向け税務サービス。',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: 'AU',
    inLanguage: 'ja',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '300',
      bestRating: '5',
      worstRating: '1',
    },
  }

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

  // Organization schema with full service catalog - critical for AI search
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService', 'AccountingService'],
    '@id': `${SITE_URL}/#organization`,
    name: 'Working Holiday Tax',
    legalName: AGENT_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    description: 'オーストラリアの登録税理士事務所。ワーキングホリデーメーカー（ビザサブクラス417・462）専門。日本語・英語・ドイツ語対応。',
    foundingDate: '2020',
    knowsLanguage: ['en', 'de', 'ja'],
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    audience: {
      '@type': 'Audience',
      name: 'オーストラリアのワーキングホリデービザ保持者（サブクラス417・462）',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '300',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ワーキングホリデーメーカー向け税務・会計サービス',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'TFN（タックスファイルナンバー）取得代行',
            description: 'ワーキングホリデーメーカーのためのTFN取得申請。',
            url: `${SITE_URL}/ja/tfn`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'ABN（事業者番号）登録代行',
            description: '個人事業主としてのABN登録。',
            url: `${SITE_URL}/ja/abn`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'タックスリターン（確定申告）代行',
            description: 'ATOへの年次タックスリターンの準備と提出。',
            url: `${SITE_URL}/ja/tax-return`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'スーパーアニュエーション返金（DASP）申請',
            description: '帰国後のスーパーアニュエーション（DASP）申請代行。',
            url: `${SITE_URL}/ja/superannuation`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'メディケア税免除（Medicare Levy Exemption）申請',
            description: 'ワーキングホリデーメーカー向けメディケア税免除証明書の申請。',
            url: `${SITE_URL}/ja/medicare`,
          },
        },
      ],
    },
    sameAs: [
      'https://www.tpb.gov.au/public-register',
    ],
    knowsAbout: [
      'オーストラリア税法',
      'ワーキングホリデービザ サブクラス417',
      'ワーキングホリデービザ サブクラス462',
      'タックスファイルナンバー（TFN）',
      'オーストラリアビジネスナンバー（ABN）',
      'スーパーアニュエーション・DASP',
      'メディケア税免除',
      'フェアワーク（Fair Work Australia）',
      'PAYG源泉徴収',
      'バックパッカー税率',
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 pt-12 pb-10 lg:pt-14 lg:pb-12 text-center">

          <div className="inline-flex items-center gap-2 mb-4 lg:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(11,82,64,0.65)' }}>ワーホリ専門の税務サポート</span>
          </div>

          <h1 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize: 'clamp(22px, 5vw, 42px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px' }}>
            {/* Desktop */}
            <span className="hidden lg:block">
              <span style={{ display: 'block' }}>オーストラリアの</span>
              <span style={{ display: 'block', color: '#0B5240' }}>タックスリターン、</span>
              <span style={{ display: 'block' }}>おまかせください。</span>
            </span>
            {/* Mobile */}
            <span className="lg:hidden">
              <span style={{ display: 'block' }}>ワーホリ向け</span>
              <span style={{ display: 'block', color: '#0B5240' }}>タックスリターン</span>
            </span>
          </h1>

          <p className="font-light mx-auto"
            style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.55)', maxWidth: '54ch', marginBottom: '10px' }}>
            <span className="hidden lg:inline"><span style={{ whiteSpace: 'nowrap' }}>417・462ビザ</span>のワーキングホリデーメーカー専門の税務サポート。<br />TFN・ABN・タックスリターン・スーパー</span>
            <span className="lg:hidden">TFN・ABN・タックスリターン・スーパー</span>
          </p>

          <div style={{ marginTop: '24px', marginBottom: '16px' }} className="lg:mt-8 lg:mb-4">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', maxWidth: '320px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              タックスリターンを依頼する →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 mx-auto">
            {['1,200名以上をサポート', '4.9★（300件以上の口コミ）', '45カ国以上に対応', '1時間以内に返信'].map((label, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                style={{ fontSize: '12px', color: 'rgba(10,15,13,0.5)' }}>
                <CheckIcon />{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24" style={{ background: '#F5F9F7' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 text-center">

          <span className="section-label center">選ばれる理由</span>

          <h2 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.12, letterSpacing: '-0.025em', maxWidth: '28ch', marginTop: '10px', marginBottom: '10px' }}>
            417・462ビザのワーキングホリデー専門だから安心
          </h2>

          <p className="font-light text-muted mx-auto"
            style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.7, maxWidth: '40ch', marginBottom: '32px', textAlign: 'center' }}>
            専門は、ただひとつ。<br />お客様が受け取るべきタックスリターン還付金を、漏れなく申告します。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10" style={{ marginBottom: '36px' }}>
            {[
              { title: 'ワーホリ税務の専門家', body: '417・462ビザのワーキングホリデーメーカーの税務だけを専門に扱う登録税理士。ルールを熟知しています。' },
              { title: 'ATO登録税理士', body: 'オーストラリア税務署（ATO）に登録された税理士が監督。ATOの最新ルールに完全準拠して申告します。' },
              { title: '日本語で完全対応', body: '専門用語はわかりやすく説明。複雑な書類もこちらで代行するので、日本語だけで完結します。' },
              { title: 'すべておまかせ', body: '面倒な書類仕事はゼロ。TFN取得からタックスリターン還付金の受け取りまで、すべて代行。帰国後も対応。' },
            ].map((item, i) => (
              <div key={i} className="pt-4 lg:pt-6 text-center" style={{ borderTop: '1px solid #E2EFE9' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: 'clamp(13px, 1.2vw, 13.5px)', marginBottom: '6px', lineHeight: 1.35 }}>{item.title}</h3>
                <p className="font-light text-muted leading-[1.7]" style={{ fontSize: 'clamp(12px, 1.1vw, 13px)' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '8px' }} className="lg:mt-4">
            <Link href="#how-it-works" className="btn-ghost-dark inline-flex" style={{ height: '44px', padding: '0 24px', fontSize: '13.5px' }}>
              タックスリターンを依頼する →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '28px' }}>
            <span className="section-label center">お客様の声</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', maxWidth: '30ch' }}>
              ワーホリ参加者からのお声
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.06)' }}>
                <div className="flex gap-0.5" style={{ marginBottom: '10px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                <p className="font-light text-body flex-1 line-clamp-3 lg:line-clamp-none"
                  style={{ fontSize: '13px', lineHeight: 1.7, marginBottom: '12px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between" style={{ paddingTop: '10px', borderTop: '1px solid #E2EFE9' }}>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                      style={{ width: '30px', height: '30px', fontSize: '11px', background: '#EAF6F1', color: '#0B5240' }}>{t.initials}</div>
                    <div>
                      <p className="font-semibold text-ink" style={{ fontSize: '12px', lineHeight: 1.2 }}>{t.name}</p>
                      <p className="text-subtle" style={{ fontSize: '10.5px', marginTop: '1px' }}>{t.from}</p>
                    </div>
                  </div>
                  <span className="font-serif font-black text-forest-500 flex-shrink-0"
                    style={{ fontSize: 'clamp(18px, 2vw, 22px)', letterSpacing: '-0.03em' }}>{t.amount}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #E2EFE9' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-8">
              {[
                { n: '4.9★',    l: '300件以上の口コミ' },
                { n: '1,200+',  l: 'サポート実績' },
                { n: '1時間以内', l: 'スピード返信' },
                { n: '100%',    l: '完全オンライン対応' },
              ].map((s, i) => (
                <div key={i} className="text-center py-2 lg:py-3">
                  <p className="font-serif font-black text-forest-500"
                    style={{ fontSize: 'clamp(18px, 2.8vw, 28px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</p>
                  <p className="text-subtle"
                    style={{ fontSize: 'clamp(11px, 1.1vw, 12.5px)', marginTop: '5px', lineHeight: 1.4 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-12 lg:py-24" style={{ background: '#F4F9F6' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">ご利用の流れ</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px', maxWidth: '30ch' }}>
              4ステップでタックスリターン還付金を申請
            </h2>
            <p className="font-light text-muted mx-auto"
            style={{ fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.7, maxWidth: '40ch', marginBottom: '4px' }}>
              <em className="not-italic text-forest-400">シンプルなプロセス。ワーホリの還付金を、正しく申請。</em>
            </p>
          </div>

          {/* Desktop 4-step horizontal */}
          <div className="hidden lg:block" style={{ marginBottom: '56px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-5 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 25%, #0B5240 75%, #C8EAE0 100%)' }}
                aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-4" style={{ zIndex: 1 }}>
                  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ width: '40px', height: '40px', background: '#0B5240', fontSize: '15px', marginBottom: '20px', boxShadow: '0 0 0 5px #fff, 0 0 0 6px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="font-semibold text-ink text-center"
                    style={{ fontSize: '14px', marginBottom: '8px', lineHeight: 1.3 }}>{s.title}</p>
                  <p className="font-light text-muted text-center"
                    style={{ fontSize: '12.5px', lineHeight: 1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '32px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '24px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="rounded-full flex items-center justify-center font-bold text-white"
                    style={{ width: '30px', height: '30px', background: '#0B5240', fontSize: '13px', flexShrink: 0 }}>
                    {s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 w-px mt-2"
                      style={{ minHeight: '22px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }}
                      aria-hidden="true" />
                  )}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.7 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '8px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '320px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              タックスリターンを依頼する →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#2FA880' }}>
              無料相談&nbsp;&bull;&nbsp;事前支払い不要&nbsp;&bull;&nbsp;日本語で安心サポート
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24" style={{ background: '#EEF7F2' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '28px' }}>
            <span className="section-label center">サービス一覧</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px', maxWidth: '30ch' }}>
              ワーホリの税務をトータルサポート<br />
              <em className="not-italic font-normal text-forest-400">オーストラリアで安心。</em>
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', textAlign: 'center', lineHeight: 1.7, maxWidth: '44ch' }}>
              オーストラリアでの最初の仕事から、帰国後のタックスリターン還付金まで。<br />すべて当社にお任せください。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4">
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href}
                className="group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg"
                style={{ padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <span className="font-medium uppercase text-subtle" style={{ fontSize: '10px', letterSpacing: '0.1em', marginBottom: '10px' }}>{s.n}</span>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white flex-shrink-0"
                  style={{ marginBottom: '10px' }}>{s.icon}</span>
                <h3 className="font-semibold text-ink service-card-title" style={{ fontSize: '13.5px', marginBottom: '5px' }}>{s.title}</h3>
                <p className="font-light text-muted leading-[1.65] flex-1" style={{ fontSize: '12px', marginBottom: '12px' }}>{s.desc}</p>
                <span className="flex items-center gap-1.5 font-medium text-forest-600 transition-all group-hover:gap-3" style={{ fontSize: '12px' }}>
                  詳しく見る →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-8">
            <span className="section-label center">よくあるご質問</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px' }}>
              すぐにわかる答え
            </h2>
          </div>

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

          <p className="text-center" style={{ marginTop: '28px', fontSize: '14px', color: '#587066' }}>
            その他のご質問は <Link href="/ja/contact" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>こちらからお問い合わせください</Link>
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="今すぐ始める"
        heading="日本からでも、"
        headingEm="オーストラリアの税金対応します。"
        sub={<>TFN・タックスリターン・スーパー受取・ABN<span className="hidden sm:inline">まで、</span><br className="sm:hidden" />ワンストップで全部サポート。</>}
        primaryLabel="タックスリターンを依頼する"
        trustLine=""
        clipTop
      />
    </>
  )
}
