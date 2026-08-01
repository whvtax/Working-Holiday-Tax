import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'

export const metadata: Metadata = {
  title: 'バックパッカーの税金控除ガイド：オーストラリア完全版',
  description: 'バックパッカーがオーストラリアの確定申告で経費として計上できるものとは。飲食業、農場労働、建設業、キッチンハンド、ライドシェアドライバー、清掃業など職業別の控除例と、車両費の計算方法を解説。',
  keywords: [
    'バックパッカー 税金控除',
    'ワーキングホリデー 税金控除',
    'バックパッカー 確定申告 経費',
    'ATO 控除 ワーキングホリデーメーカー',
    '走行距離控除 ATO',
    'WHV 税金控除',
    '417ビザ 税金控除',
  ],
  alternates: { canonical: '/ja/expenses', languages: { 'en-AU': '/expenses', 'de': '/de/expenses', 'x-default': '/expenses' } },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/expenses`,
    siteName: 'Working Holiday Tax',
    title: 'バックパッカーの税金控除ガイド：オーストラリア完全版',
    description: 'バックパッカーが確定申告で実際に経費計上できるものを職業別に解説。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'バックパッカーの税金控除ガイド：オーストラリア完全版',
    description: 'バックパッカーが確定申告で実際に経費計上できるものを職業別に解説。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const GOLDEN_RULES = [
  'そのお金を自分で支払っており、雇用主から払い戻しを受けていないこと。',
  'その支出が収入を得ることに直接関係していること、私的・家庭的な支出ではないこと。',
  '証拠となる記録があること、何をいつ購入したかを示すレシート、請求書、または銀行明細。',
]

const CAR_METHOD_ROWS = [
  ['レート（2024-25・2025-26年度）', '1kmあたり88セント'],
  ['レート（2026-27年度、2026年7月1日から）', '1kmあたり91セント'],
  ['請求できる上限', '1台あたり年間5,000km'],
  ['領収書は必要？', '不要、ただし走行距離の算出方法を示せる必要あり'],
]

const LOGBOOK_ROWS = [
  ['仕組み', '実際にかかった費用のうち、仕事で使用した割合を請求'],
  ['ログブック記録期間', '連続12週間、5年間有効'],
  ['請求できる上限', '上限なし、実際の仕事使用率に基づく'],
  ['領収書は必要？', '必要、請求するすべての費用について'],
]

type Occupation = {
  emoji: string
  title: string
  subtitle: string
  can: string[]
  cannot: string[]
}

const OCCUPATIONS: Occupation[] = [
  {
    emoji: '🍸',
    title: '飲食・バーテンダー',
    subtitle: 'バー、カフェ、レストラン、ホテル',
    can: [
      'RSA（責任あるアルコール提供）資格とその更新費用',
      '滑り止め付きの保護靴',
      '雇用主のロゴが入った制服の必須クリーニング代',
      '職務上必要な応急処置資格',
    ],
    cannot: [
      'ロゴのない普通の黒い服や靴、職場で義務付けられていても、ATOはこれを制服ではなく普段着とみなします',
    ],
  },
  {
    emoji: '🌾',
    title: '農場労働・果物摘み',
    subtitle: '果樹園、ワイナリー、地方の農場労働',
    can: [
      '屋外作業のための日焼け対策：つばの広い帽子、日焼け止め、サングラス',
      '保護用手袋・ブーツ',
      '日中に異なる農場や作業場所間を移動する際の車両費',
    ],
    cannot: [
      '仕事で汚れたり傷んだりしても、ジーンズやTシャツなどの普段着',
      '自宅から最初の農場までの毎日の移動、これは通常の通勤とみなされます',
    ],
  },
  {
    emoji: '🏗️',
    title: '建設業',
    subtitle: '労務作業、専門工事、建設現場',
    can: [
      'White Card（建設従事者証）の更新費用',
      '安全靴（先芯入り）と高視認性の作業着',
      '工具・機材、$300未満は即時控除、$300以上は耐用年数にわたって減価償却',
      '屋外現場作業のための日焼け対策',
    ],
    cannot: [
      '現場で汚れたり傷んだりしても、普段着',
      'その仕事に就くために必要だった最初のWhite Card',
    ],
  },
  {
    emoji: '🔪',
    title: 'シェフ・キッチンハンド',
    subtitle: '商業用キッチン、レストラン',
    can: [
      '自分で購入したシェフナイフやその他の調理器具',
      'シェフコートやチェック柄のシェフパンツ、職業に特有の衣類として認められます',
      '滑り止め付きのキッチンシューズ',
      '職務上必要な食品安全管理者資格',
    ],
    cannot: [
      'シェフコートの下に着る普段着',
    ],
  },
  {
    emoji: '🚗',
    title: 'ライドシェア・配達',
    subtitle: 'Uber、Uber Eats、DoorDashなど',
    can: [
      '仕事に関連する運転部分の車両費、1kmあたりの定額法またはログブック法（下記参照）',
      '携帯電話プランのうち仕事で使用した割合',
      '乗客のために車を適切な状態に保つための洗車代',
      '仕事中に発生した駐車料金',
    ],
    cannot: [
      '各移動のうち私的な部分、または通常の通勤',
      '駐車違反やスピード違反の罰金、理由を問わず控除の対象にはなりません',
    ],
  },
  {
    emoji: '🧹',
    title: '清掃業',
    subtitle: '商業用・住宅用の清掃業務',
    can: [
      '自分で購入し払い戻しを受けていない清掃用品・機材',
      '保護用手袋',
      '日中に顧客先の間を移動する際の車両費',
    ],
    cannot: [
      '自宅から最初の現場までの毎日の移動',
      '清掃中に着用する普段着',
    ],
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: '経費', item: `${SITE_URL}/ja/expenses` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'バックパッカーの税金控除ガイド：オーストラリア完全版',
  description: 'バックパッカーが確定申告で経費計上できるものを職業別に解説。',
  url: `${SITE_URL}/ja/expenses`,
  inLanguage: 'ja-JP',
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

function CompareTable({ label, rows, highlight }: { label: string; rows: string[][]; highlight?: boolean }) {
  return (
    <div className="taxres-table-card" style={highlight ? { borderColor: '#0B5240', boxShadow: '0 8px 20px -8px rgba(11, 82, 64, 0.18)' } : {}}>
      <h3 className="taxres-table-title">{label}</h3>
      <table className="taxres-table">
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}><td>{row[0]}</td><td>{row[1]}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function OccupationCard({ o }: { o: Occupation }) {
  return (
    <div className="exp-card">
      <div className="exp-card-head">
        <span className="exp-card-emoji" aria-hidden="true">{o.emoji}</span>
        <div>
          <h3 className="exp-card-title">{o.title}</h3>
          <p className="exp-card-subtitle">{o.subtitle}</p>
        </div>
      </div>
      <div className="exp-card-section">
        <p className="exp-card-label exp-card-label-yes">✓ 控除できる可能性があるもの</p>
        <ul className="exp-card-list">
          {o.can.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
      <div className="exp-card-section">
        <p className="exp-card-label exp-card-label-no">✕ 通常、控除できないもの</p>
        <ul className="exp-card-list">
          {o.cannot.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default function ExpensesPageJA() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

            <nav aria-label="Breadcrumb" className="mb-4 lg:mb-5">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li><Link href="/ja" style={{ color: '#587066' }}>ホーム</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>経費</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(26px, 4.5vw, 40px)', lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: '14px', maxWidth: '24ch' }}>
                バックパッカーが実際に<span style={{ color: '#0B5240' }}>経費計上できるもの</span>とは？
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.8, color: '#0B5240', maxWidth: '46ch' }}>
                仕事に関連する控除は還付金に数百ドルを上乗せすることがあります、ただし、その支出が本当に条件を満たしている場合に限ります。職業別に、何が対象になるかを正確に解説します。
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <p className="font-bold mx-auto" style={{ fontSize: '14.5px', color: '#1A2822', lineHeight: 1.9, maxWidth: '54ch' }}>
                職業別の具体例の前に、すべての控除はこの3つのATOのテストをクリアする必要があります：
              </p>
            </div>
            <div className="max-w-[680px] mx-auto">
              <div className="flex flex-col gap-3">
                {GOLDEN_RULES.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: '#F5F9F7', paddingTop: '32px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="taxres-savings-box" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div>
                <p className="taxres-savings-heading">記録の保管について</p>
                <p className="taxres-savings-body">
                  請求を予定しているものについては、レシート、請求書、または銀行明細を保管してください、スマートフォンで撮った写真でも構いません。年間の仕事関連の請求合計が$300未満の場合、ATOは書面での証拠を求めませんが、その金額をどのように算出したかは説明できる必要があります。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.01em', marginBottom: '10px' }}>
                車両費：2つの計算方法
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.8, maxWidth: '54ch' }}>
                仕事に関連する運転のみが対象です、通常の通勤は含まれません。方法は2つあり、1台の車につき1年で1つの方法しか使えません。
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="1kmあたりの定額法" rows={CAR_METHOD_ROWS} highlight />
              <CompareTable label="ログブック法" rows={LOGBOOK_ROWS} />
            </div>
            <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.8, maxWidth: '60ch', marginTop: '18px' }}>
              年間の仕事関連の走行距離が5,000kmを超える場合、通常はログブック法の方が還付額が大きくなります、ただし12週間のログブックとすべての領収書の保管が必要です。
            </p>
          </div>
        </section>

        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.01em', marginBottom: '10px' }}>
                職業別の控除ガイド
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.8, maxWidth: '56ch' }}>
                バックパッカーがオーストラリアで従事する代表的な職業と、実際に対象になるもの・ならないものを解説します。
              </p>
            </div>
            <div className="exp-grid">
              {OCCUPATIONS.map((o, i) => <OccupationCard key={i} o={o} />)}
            </div>
          </div>
        </section>

        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.9, marginBottom: '26px' }}>
              これは一般的な情報であり、個別の税務アドバイスではありません、状況は人それぞれ異なります。当社でお手続きいただく際には、お客様の具体的な職業や状況を確認し、請求できるものはすべて、請求できないものは含めないようにサポートします。
            </p>
            <Link href="/ja/tax-form" className="inline-flex items-center justify-center font-semibold"
              style={{ minHeight: '52px', padding: '0 36px', background: '#0B5240', color: '#fff', borderRadius: '100px', fontSize: '15px', textDecoration: 'none' }}>
              税金の還付金を受け取る →
            </Link>
          </div>
        </section>

      </main>
      <MobileCta href="/ja/tax-form" lang="ja" />
    </>
  )
}
