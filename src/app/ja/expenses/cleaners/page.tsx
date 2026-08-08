import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep, RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: '清掃員の税金控除ガイド：ABN・機材・現場間の移動（オーストラリア）',
  description: '個人宅の清掃、退去時清掃、Airtasker経由の仕事は通常ABN個人事業主としての収入にあたります。清掃会社にシフトとして配置される商業・オフィス清掃は、通常Cleaning Services Awardのもと、TFN雇用として扱われます。どちらの立場でも機材、制服、洗濯代、現場間の移動について何が経費にできるか、そしていつGST登録が必要になるかを解説します。',
  keywords: [
    '清掃員 税金控除 オーストラリア',
    'ハウスクリーナー 税金 ABN',
    '退去時清掃 税金控除',
    '商業清掃 税金 オーストラリア',
    'オフィス清掃 税金控除',
    'Airtasker 清掃 ワーホリ 税金',
    'Cleaning Services Award 税金',
    '清掃員 ABN TFN 違い',
    '清掃用品 税金控除 ATO',
    'ワーキングホリデー 清掃 税金',
    '417 462ビザ 清掃 税金',
    'バックパッカー 清掃 タックスリターン',
    '住宅清掃 税金控除',
    '清掃用洗剤 税金控除',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/expenses/cleaners`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/cleaners`,
      'de': `${SITE_URL}/de/expenses/cleaners`,
      'ja': `${SITE_URL}/ja/expenses/cleaners`,
      'x-default': `${SITE_URL}/expenses/cleaners`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/expenses/cleaners`,
    siteName: 'Working Holiday Tax',
    title: '清掃員の税金控除ガイド：ABN・機材・現場間の移動（オーストラリア）',
    description: '個人宅の清掃やアプリ経由の仕事は通常ABN個人事業主の収入、会社にシフトとして配置される商業清掃は通常TFN雇用です。それぞれの立場で税金面から何が経費にできるかを解説します。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: '清掃員の税金控除ガイド：ABN・機材・現場間の移動（オーストラリア）',
    description: '個人宅の清掃やアプリ経由の仕事は通常ABN個人事業主の収入、会社にシフトとして配置される商業清掃は通常TFN雇用です。それぞれの立場で税金面から何が経費にできるかを解説します。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const UNDER_300_ROWS = [
  ['申請方法', '全額を即時申請'],
  ['いつ申請するか', '購入した年'],
  ['例', '$70のモップ、バケツ、モップ絞り器のセット'],
]

const OVER_300_ROWS = [
  ['申請方法', '耐用年数にわたって分割申請'],
  ['いつ申請するか', '所有している各年に一部ずつ'],
  ['例', '$450の業務用掃除機'],
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

const TRAVEL_CONDITIONS = [
  'その道具が、その日行っている清掃の仕事に欠かせないこと。',
  '本当にかさばること。車両が必要なのは単なる利便性ではなく、実際のサイズや重量が理由であること。',
  '職場に安全に保管できる場所がなく、自宅まで持ち帰らざるを得ないこと。',
]

const INVOICE_CHECKLIST = [
  'あなたの氏名、または登録した屋号。ABNに登録されているとおりの表記で。',
  'あなたのABN。送るすべての請求書にはっきりと記載すること。',
  'クライアントの氏名。清掃を依頼した個人または事業者。',
  '請求書の日付。清掃を行った日が異なる場合はその日付も。',
  '作業内容の説明。物件、清掃の種類、おおよその所要時間。',
  '請求する合計金額。GSTに登録している場合のみ、GSTを別の項目として記載。',
]

type CleanerType = {
  emoji: string
  kind: string
  title: string
  subtitle: string
  signals: string[]
  ctaLabel: string
  ctaHref: string
}

const FORK_CARDS: CleanerType[] = [
  {
    emoji: '🧽',
    kind: 'ABN',
    title: '個人宅・直接契約・アプリ経由の清掃',
    subtitle: '個人宅の清掃、退去時清掃、Airtasker',
    signals: [
      '自分でクライアントを見つける。口コミ、またはAirtaskerのようなアプリを通じて',
      '給与明細ではなく、請求書やアプリからの支払いで報酬を受け取る',
      '口座に入金される前に税金は源泉徴収されない',
      '料金、稼働時間、引き受ける仕事を自分で決める',
      '収入に上乗せしてスーパーアニュエーションが支払われることはない',
    ],
    ctaLabel: 'まずはこちらから：ABNを登録する →',
    ctaHref: '/ja/abn',
  },
  {
    emoji: '🏢',
    kind: 'TFN',
    title: '清掃会社にシフトとして配置される',
    subtitle: '商業・オフィス清掃、Cleaning Services Award',
    signals: [
      '清掃会社が特定の現場とシフトにあなたを割り当てる',
      '税金がすでに源泉徴収された給与明細を受け取る',
      '会社があなたの時給、稼働時間、仕事の進め方を決める',
      '給与に上乗せしてスーパーアニュエーションが支払われる',
      '働き始める際にTFN宣言書に記入した',
    ],
    ctaLabel: 'まずはこちらから：TFNを申請する →',
    ctaHref: '/ja/tfn',
  },
]

const faqs = [
  {
    question: '清掃員として、私はABN個人事業主ですか、それともTFN従業員ですか？',
    answer: 'これは仕事の呼び方ではなく、誰のために掃除をしていて、どうやってその仕事を得たかで決まります。自分で見つけた個人のクライアントのために掃除をしている、退去する入居者のための退去時清掃をしている、あるいはAirtaskerのようなアプリ経由で予約された仕事をしている場合、ほぼ間違いなくABN個人事業主です。料金を自分で決め、仕事に対して請求書を発行し、税金は源泉徴収されません。清掃会社によって特定の現場やシフトに配置されている場合、ほぼ間違いなくTFN従業員です。通常はCleaning Services Award 2020の対象となり、給与明細から税金が源泉徴収され、それに加えてスーパーが支払われます。オーストラリアの清掃業界で働く人のうち約28%が個人事業主として働いており、これはあらゆる業界の中でも特に高い割合です。思い込みで判断せず、自分がどちらに当てはまるか確認する価値は十分にあります。',
  },
  {
    question: 'どんな清掃用品や機材を経費にできますか？',
    answer: '自分で購入し、払い戻しを受けていないもの、モップ、バケツ、スクレーパー、替刃、モップ絞り器、洗剤や清掃用品などは控除の対象になります。$300以下のものは、購入した年に全額を申請できます。業務用掃除機や床用バフ機のような$300以上のものは、一度に全額ではなく、耐用年数にわたって少しずつ減価償却して申請します。',
  },
  {
    question: '制服や保護具、そのクリーニング代は経費にできますか？',
    answer: '雇用主やクライアントが支給してくれない義務付けられた制服、そして先芯入りの安全靴、エプロン、手袋、保護メガネ、フェイスシールドといった本当に安全機能を持つ保護具は対象になります。一方、無地の黒いパンツや無地のTシャツのような普通の衣類は、清掃の仕事のためだけに購入したものであっても対象外です。ATOはこれを制服ではなく一般的な衣類として扱います。控除対象の作業着の洗濯は、ATOの標準的な料金に従います。仕事用の衣類のみの場合は1回あたり$1、普段着と一緒に洗う場合は1回あたり50セントです。年間の洗濯代の申請額の合計が$150を超えたら、いつ何を洗ったかの簡単な記録をつけておきましょう。',
  },
  {
    question: '清掃の仕事の間の移動は経費にできますか？',
    answer: 'はい。1日に3軒、4軒と異なる住宅やオフィスを掃除する場合、それぞれの現場間の移動は控除の対象になり、1kmあたりの定額法またはログブックを使って計算します。控除の対象にならないのは、その日最初の現場への自宅からの移動で、これはどの職業でも同じく通常の通勤にあたります。ただし、仕事に欠かせない本当にかさばる清掃道具を運んでいて、どの現場にも安全に保管できる場所がない場合は、その移動も対象に含めることができます。',
  },
  {
    question: 'ABNを持つ清掃員として、GST登録は必要ですか？',
    answer: '清掃の仕事による年間売上が$75,000を超えた時だけです。パートタイムで、個人で、あるいはアプリを通じて清掃をしているほとんどのワーキングホリデーメーカーは、この金額にはまったく届きません。本当に大規模な清掃事業を営んでいない限り、GSTは気にせず、GSTの項目なしでそのまま請求書を発行して構いません。',
  },
  {
    question: 'クライアントが決まる前に清掃用品や洗剤を購入しました。それでも経費にできますか？',
    answer: '一般的にはできます。ただし、その購入が、クライアント向けに清掃を始めるための準備として本当に行われたものである必要があります。例えば、ABNを登録し、アプリに自分を掲載したり仕事の宣伝を始めたりしたのとほぼ同じ時期に、モップやバケツ、洗剤を購入した場合などです。ATOが見るのは、その時点で本当に事業として活動を始めていたかどうかであり、請求書がすでに届いていたかどうかだけではありません。そのため、レシートと、いつABNを登録していつ仕事を探し始めたかの簡単なメモを残しておきましょう。道具を購入してから実際に誰かのために清掃を始めるまでの間に長い空白期間がある場合は、その時期の扱いについて、頼る前に個別に確認してもらうことをおすすめします。',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: '経費', item: `${SITE_URL}/ja/expenses` },
    { '@type': 'ListItem', position: 3, name: '清掃業', item: `${SITE_URL}/ja/expenses/cleaners` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '清掃員の税金控除：ABN個人事業主 vs TFN従業員（オーストラリア）',
  description: 'オーストラリアで清掃の仕事をする人が税金で何を控除できるか。個人やアプリ経由でABN個人事業主として清掃をしている場合と、商業清掃会社にTFN従業員としてシフト配置されている場合の両方を解説。',
  url: `${SITE_URL}/ja/expenses/cleaners`,
  inLanguage: 'ja-JP',
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/expenses/cleaners#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/ja/expenses/cleaners`,
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

function ForkCard({ f }: { f: CleanerType }) {
  return (
    <div className="exp-card">
      <div className="exp-card-head">
        <span className="exp-card-emoji" aria-hidden="true">{f.emoji}</span>
        <div>
          <h3 className="exp-card-title">{f.title}</h3>
          <p className="exp-card-subtitle">{f.subtitle}</p>
        </div>
      </div>
      <p className="font-semibold" style={{ fontSize: '11.5px', color: '#0B5240', margin: '14px 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        必要なもの：{f.kind}
      </p>
      <div className="exp-card-section">
        <p className="exp-card-label" style={{ color: '#587066' }}>当てはまるサイン</p>
        <ul className="exp-card-list">
          {f.signals.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
      <Link href={f.ctaHref} className="inline-flex items-center justify-center font-semibold"
        style={{ marginTop: '18px', height: '42px', padding: '0 20px', background: '#0B5240', color: '#fff', borderRadius: '100px', fontSize: '13px', textDecoration: 'none', width: '100%' }}>
        {f.ctaLabel}
      </Link>
    </div>
  )
}

export default function CleanersExpensesPageJA() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

            <nav aria-label="Breadcrumb" className="mb-4 lg:mb-5">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li><Link href="/ja" style={{ color: '#587066' }}>ホーム</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li><Link href="/ja/expenses" style={{ color: '#587066' }}>経費</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>清掃業</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '25ch' }}>
                清掃の仕事の税金：<span style={{ color: '#0B5240' }}>ABN個人事業主か、TFN従業員か？</span>
              </h1>
              <p className="font-semibold mx-auto hero-sub" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '56ch' }}>
                個人宅の清掃、退去時清掃、Airtaskerのようなアプリ経由の仕事を請け負っているなら、ほぼ間違いなくABN個人事業主です。商業清掃会社にシフトとして配置されているなら、ほぼ間違いなくTFN従業員です。ここでは、自分がどちらに当てはまるかの見分け方と、どちらの場合も実際に何が控除できるかを詳しく解説します。
              </p>
            </div>
          </div>
        </section>

        {/* ── THE ABN / TFN FORK (this page's unique hook) ────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                誰のために清掃をしていて、どうやってその仕事を得ましたか？
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '62ch' }}>
                オーストラリアの清掃業界で働く人のうち約28%が個人事業主として働いており、これはあらゆる業界の中でも特に高い割合です。この2つは課税のされ方がまったく異なるため、まず自分が実際にどちら側なのかを確認しましょう。
              </p>
            </div>

            <div className="exp-grid">
              {FORK_CARDS.map((f, i) => <ForkCard key={i} f={f} />)}
            </div>

            <div className="max-w-[680px] mx-auto text-center" style={{ marginTop: '8px' }}>
              <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7, marginBottom: '10px' }}>
                1年の中で両方を掛け持ちする清掃員も少なくありません。TFNで商業清掃会社の数シフトをこなしながら、副業としてABNでAirtasker経由の個人宅清掃を請け負う、といった具合です。これはまったく普通のことで、両方の所得の種類を同じタックスリターンで申告するだけです。理想的には、それぞれ別々に記録を残しておきましょう。
              </p>
              <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7 }}>
                一つ注意点があります。清掃会社があなたのシフトを組み、業務を監督し、清掃用品や機材まで提供しているにもかかわらず、ABNの取得を求めてくる場合、その契約形態は本当の請負ではなく、偽装された雇用である可能性があります。ABNという名前がついているからといってそれで確定と思い込まず、登録する前に確認しておく価値があります。
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <div className="taxres-savings-box">
                <div>
                  <p className="taxres-savings-heading">清掃会社にTFNで雇用される場合</p>
                  <p className="taxres-savings-body">
                    記入するTFN宣言書には、非課税枠についての質問があります。ワーキングホリデーメーカーとしての正しい答えは、働くすべての清掃の雇用主に対して常に「いいえ」です。417・462ビザでは、同時にいくつシフト制の清掃の仕事を掛け持ちしていても、そもそもどの雇用主からも非課税枠が一切適用されません。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT CLEANERS CAN CLAIM ──────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                清掃員が実際に経費にできるもの
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                ABN・TFNどちらの側であっても、判断基準は同じです。自分で支払ったこと、清掃の仕事に直接関係していること、そしてその記録を示せることです。
              </p>
            </div>

            {/* Equipment */}
            <h3 className="font-serif font-black text-ink text-center" style={{ fontSize: 'clamp(18px,1.9vw,22px)', letterSpacing: '-0.015em', marginBottom: '10px' }}>
              清掃用品・機材：$300のルール
            </h3>
            <p className="font-light mx-auto text-center" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', maxWidth: '680px', marginBottom: '20px' }}>
              自分で道具を購入し、払い戻しを受けていない場合、その費用は控除の対象になります。申請方法は価格によって異なります。
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="$300未満" rows={UNDER_300_ROWS} highlight />
              <CompareTable label="$300以上" rows={OVER_300_ROWS} />
            </div>

            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginTop: '22px' }}>
                実際には、清掃員の道具のほとんどは$300未満に収まり、そのまま全額を申請できます。モップ、バケツ、スクレーパー、替刃、モップ絞り器、そして仕事のたびに使う洗剤や清掃用品などです。$300のラインを超えて減価償却の対象になるのは、業務用掃除機、床用バフ機、高圧洗浄機といった、より大きく、頻繁には購入しないものです。
              </p>
              <div className="info-block">
                <p>
                  道具をセットで購入する場合は扱いが変わります。清掃用品の卸業者からモップ、バケツ、道具入れ、洗剤のスターターキットを購入するなど、複数のアイテムをまとめてセットとして購入し、合計金額が$300以上になる場合、個々のアイテムを単体で買えばそれぞれ$300未満だったとしても、セット全体を時間をかけて減価償却する必要があります。
                </p>
              </div>
            </div>

            {/* Uniform, PPE, laundry */}
            <h3 className="font-serif font-black text-ink text-center" style={{ fontSize: 'clamp(18px,1.9vw,22px)', letterSpacing: '-0.015em', margin: '34px 0 10px' }}>
              制服、保護具、そのクリーニング代
            </h3>
            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                クライアントや雇用主が特定の制服を義務付けていて、それを支給してくれない場合、その費用は控除の対象になります。本当に安全機能を持つ保護具も同様です。先芯入りの安全靴、エプロン、手袋、保護メガネ、強い薬品やほこりを扱う仕事のためのフェイスシールドなどです。これらが対象になるのは、あなたを守る、あるいは正式な制服要件を満たすという具体的な役割を果たしているからであり、たまたま清掃の仕事中に着用しているからではありません。
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                対象にならないのは、無地の黒いパンツ、無地のポロシャツ、ジョガーパンツといった、ごく普通の一般的な衣類です。清掃の仕事のためだけに購入したものであっても、クライアントが特定の色を指定していても変わりません。ATOの判断基準は、なぜそれを購入したかではなく、そのアイテムが実際に何であるかです。誰でもどこでも着られる服は、誰かに義務付けられたからといって制服になるわけではありません。
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                控除対象の作業着（義務付けられた制服や本当の保護具）を洗濯する場合、ATOの標準的な洗濯料金が適用されます。仕事用の衣類のみを洗濯する場合は1回あたり$1、普段着と一緒に洗う場合は1回あたり50セントです。年間の洗濯代の申請額の合計が$150を超えた場合、ATOのガイダンスでは、目安の金額に頼るのではなく、いつ何を洗ったかの簡単な記録をつけておくよう求めています。
              </p>
            </div>

            {/* Travel */}
            <h3 className="font-serif font-black text-ink text-center" style={{ fontSize: 'clamp(18px,1.9vw,22px)', letterSpacing: '-0.015em', margin: '34px 0 10px' }}>
              清掃の仕事の間の移動
            </h3>
            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                ほとんどの清掃員にとって、実際にまとまった金額になるのはここです。1日に3軒、4軒と異なる住宅やオフィスを掃除する場合、ある現場から次の現場への移動は控除の対象になります。決まった一つの職場への通勤ではなく、2つの職場の間の移動だからです。除外されるのは、その日最初の現場への自宅からの移動と、最後の現場からの帰宅の移動だけで、これはどの職業でも同じです。
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '18px' }}>
                自宅から決まった職場までの運転は、通常は私的な通勤にあたり、清掃を仕事にしているからといって変わりません。ただし狭い例外があり、以下の3つの条件すべてに当てはまる必要があります。
              </p>
            </div>

            <div className="max-w-[680px] mx-auto mb-6">
              <div className="flex flex-col gap-3">
                {TRAVEL_CONDITIONS.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
              <p className="font-light mx-auto" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch', marginTop: '16px', textAlign: 'center' }}>
                いずれかの職場に道具を安全に保管できる場所がある場合、または持ち運ぶものが普通のバッグに収まる場合、その移動は通常の通勤のままであり、控除の対象にはなりません。
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="1kmあたりの定額法" rows={CAR_METHOD_ROWS} highlight />
              <CompareTable label="ログブック法" rows={LOGBOOK_ROWS} />
            </div>
            <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '64ch', marginTop: '18px' }}>
              毎週クライアントの間で走行距離が多くなる場合、ログブック法の方が実際のコストをより多く反映できることが一般的ですが、12週間分のログブックと、燃料代・整備費のすべての領収書を保管する必要があります。
            </p>

            {/* Can't claim */}
            <div className="max-w-[680px] mx-auto">
              <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#B54708', letterSpacing: '-0.015em', margin: '34px 0 8px', lineHeight: 1.3 }}>
                控除できないもの
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                ABN・TFNどちらの側であっても、清掃員がつまずきやすいポイントがいくつかあります。無地の黒いパンツ、無地のポロシャツ、ジョガーパンツといった、ごく普通の一般的な衣類は、清掃の仕事のためだけに購入したものであっても、仕事で汚れてしまっても控除の対象にはなりません。ATOはこれを制服ではなく普段着として扱います。その日最初の現場への自宅からの移動、そして最後の現場からの帰宅の移動は、上記のかさばる道具の例外が本当に当てはまらない限り、どの職業でも同じく通常の通勤にあたります。また、クライアントや雇用主から払い戻しを受けたもの、あるいは洗剤、機材、制服などをそのまま支給されたものは、自分のタックスリターンで再度申請することはできません。
              </p>
            </div>
          </div>
        </section>

        {/* ── GST, INVOICING & RECORD-KEEPING ──────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                GST、請求書発行、記録の保管
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                事務的な側面は、あなたがどちら側にいるかによって異なります。
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <div className="taxres-savings-box" style={{ marginTop: 0, marginBottom: '26px' }}>
                <div>
                  <p className="taxres-savings-heading">GSTは売上が高い場合にのみ関係します</p>
                  <p className="taxres-savings-body">
                    ABNで清掃の仕事をしている場合、GST登録が義務になるのは、清掃の仕事による年間売上が$75,000を超えた時だけです。これは清掃業に特有のルールではなく、ABNの個人事業主すべてに適用される同じ基準です。個人で、数人の常連クライアントのために、あるいはAirtaskerのようなアプリを通じて清掃をしているほとんどのワーキングホリデーメーカーは、この金額にはまったく届きません。清掃の事業が本当に大規模でない限り、GSTは気にせず、GSTの項目なしで請求書を発行して構いません。
                  </p>
                </div>
              </div>

              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3 }}>
                個人・アプリ経由のクライアント向け、ルールに沿った請求書
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '16px' }}>
                ABN個人事業主として送るすべての請求書には、以下を記載する必要があります：
              </p>
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginBottom: '28px' }}>
              <div className="flex flex-col gap-3">
                {INVOICE_CHECKLIST.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-[680px] mx-auto">
              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3 }}>
                どちらの場合も記録を保管する
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                控除を申請する予定のものについては、レシート、請求書、または銀行明細を保管してください。スマートフォンで撮った写真でも構いませんが、5年間提示できる状態にしておく必要があります。ABN個人事業主の場合、これには発行したすべての請求書のコピーを保管することも含まれます。TFN従業員の場合、清掃会社があなたの給与をATOに直接報告するため、やるべきことはよりシンプルです。給与明細を保管し、確定申告の時期に表示されるインカムステートメントと照らし合わせて確認しましょう。
              </p>
            </div>
          </div>
        </section>

        {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
        <NextStep
          eyebrow="次のステップ"
          heading="自分がどちら側か分かりましたか？それなら準備万端です。"
          body="ABNまたはTFNの手続きが済み、道具、制服、移動費の記録がそろったら、次のステップはそれらすべてを一つにまとめてタックスリターンを提出することです。"
          cta="タックスリターンに進む →"
          href="/ja/tax-return"
        />

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">よくあるご質問</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  清掃の仕事の税金に関するご質問
                </h2>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  他にもご質問があれば、お気軽に直接メッセージをお送りください。
                </p>
              </div>
              <div className="max-w-[700px]">
                <Accordion items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ─────────────────────────────────────────────── */}
        <RelatedServices label="関連サービス" items={[
          { label: 'ABNを登録する', desc: '個人・アプリ経由の清掃の仕事に合わせて正しく登録', href: '/ja/abn' },
          { label: 'TFNを申請する', desc: '最初のシフトが始まる前に手続きを済ませておきましょう', href: '/ja/tfn' },
          { label: 'タックスリターンを提出する', desc: 'ABNとTFN、両方の清掃の収入をまとめて申告', href: '/ja/tax-return' },
          { label: 'すべての職業を見る', desc: '清掃業だけでなく、あらゆるバックパッカーの仕事の控除を確認できます', href: '/ja/expenses' },
        ]} />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              これは一般的な情報であり、個別の税務アドバイスではありません。請負業者か従業員か、そして実際に何を経費にできるかは、あなたの働き方の具体的な事実によって決まります。当社にご依頼いただいた場合、登録税理士の監督のもとで申告書を作成し、あなたの清掃の収入、ABNまたはTFNの状況、道具や移動にかかった費用を一つひとつ確認したうえで、請求できるものはすべて、請求できないものは一切含めないようにいたします。
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
