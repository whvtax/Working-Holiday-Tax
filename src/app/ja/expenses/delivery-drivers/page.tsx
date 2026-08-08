import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: '配達ドライバーの税金｜Uber Eats・DoorDashのABNとTFN雇用',
  description: 'Uber Eats、DoorDash、Menulog、Amazon Flexのドライバーは従業員ではなく、ABNを持つ個人事業主として働きます。一方、TFNで給与を受け取る配達の仕事もあります。ワーキングホリデーメーカーが請求できるもの、1kmあたりの定額法とログブック法、そして自分がどちらに当てはまるかの見分け方を解説します。',
  keywords: [
    '配達ドライバー 税金 オーストラリア',
    'Uber Eats 税金 ワーホリ',
    'DoorDash 税金 オーストラリア',
    'DoorDash ABN ワーホリ',
    'Menulog 配達ドライバー 税金',
    'Amazon Flex 税金 オーストラリア',
    'フードデリバリー 経費 控除',
    'ABN TFN 配達ドライバー',
    '配達ドライバー ABN ワーホリ',
    'ギグエコノミー 税金 オーストラリア',
    '走行距離控除 配達ドライバー',
    '配達ドライバー 車両費',
    'シェアリングエコノミー ATO 報告',
    'ライドシェア 配達 税金控除',
    '417 462ビザ 配達ドライバー 税金',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/expenses/delivery-drivers`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/delivery-drivers`,
      'de': `${SITE_URL}/de/expenses/delivery-drivers`,
      'ja': `${SITE_URL}/ja/expenses/delivery-drivers`,
      'x-default': `${SITE_URL}/expenses/delivery-drivers`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/expenses/delivery-drivers`,
    siteName: 'Working Holiday Tax',
    title: '配達ドライバーの税金｜Uber Eats・DoorDashのABNとTFN雇用',
    description: 'Uber Eats、DoorDash、Amazon FlexはABNの請負業務で、TFNの雇用ではありません。その違いと、配達ドライバーが税金で請求できるものを解説します。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: '配達ドライバーの税金｜Uber Eats・DoorDashのABNとTFN雇用',
    description: 'Uber Eats、DoorDash、Amazon FlexはABNの請負業務で、TFNの雇用ではありません。その違いと、配達ドライバーが税金で請求できるものを解説します。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

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

type DriverType = {
  emoji: string
  kind: string
  title: string
  subtitle: string
  signals: string[]
  ctaLabel: string
  ctaHref: string
}

const FORK_CARDS: DriverType[] = [
  {
    emoji: '🛵',
    kind: 'ABN',
    title: 'プラットフォーム・アプリ配達',
    subtitle: 'Uber Eats、DoorDash、Menulog、Amazon Flex',
    signals: [
      'シフト表ではなく、アプリで仕事を受けて働いている',
      '給与明細ではなく、週次の明細書や請求書で支払いを受けている',
      '入金前に税金が源泉徴収されることはない',
      '勤務時間は自分で決められ、好きなときにログオン・ログオフできる',
      '収入に上乗せしてスーパーが支払われることはない',
    ],
    ctaLabel: 'まずはこちら：ABNを登録する →',
    ctaHref: '/ja/abn',
  },
  {
    emoji: '🍕',
    kind: 'TFN',
    title: '1つのレストランや店舗に雇用されている',
    subtitle: '通常はシフト制で、給与を直接支払われる',
    signals: [
      '1つのレストラン、テイクアウト店、または企業で決まったシフト勤務をしている',
      '税金が源泉徴収済みであることを示す給与明細を受け取っている',
      '会社が給与額、勤務時間、仕事の進め方を決めている',
      '給与に加えてスーパーが支払われる',
      '働き始めるときにTFN宣言書に記入した',
    ],
    ctaLabel: 'まずはこちら：TFNを申請する →',
    ctaHref: '/ja/tfn',
  },
]

const faqs = [
  {
    question: 'ワーキングホリデービザでUber Eatsの配達をするにはABNが必要ですか？',
    answer: 'はい。Uber Eats、DoorDash、Menulog、Amazon Flexはいずれもドライバーを従業員ではなく請負業者として契約するため、登録して報酬を受け取る前にABNが必要です。まずTFNが必要で、ABNはそれに代わるものではありません。その上で、配達の仕事のためにABNを登録します。',
  },
  {
    question: '配達ドライバーは携帯電話代を経費として請求できますか？',
    answer: '携帯電話とデータプランのうち、仕事で使用した割合、つまり配達アプリ、GPSナビ、仕事の依頼を受けるために実際に使っている部分を請求できます。ほとんどの人がそうであるように、私的な通話やネット閲覧にも同じ携帯電話を使っている場合、請求額の全体を計上することはできません。請求する割合には、公正で正直な根拠が必要です。',
  },
  {
    question: 'プラットフォームではなく、1つのレストランの従業員として配達をしている場合はどうなりますか？',
    answer: '1つのテイクアウト店、レストラン、またはピザ店でシフト勤務をしており、税金が源泉徴収済みの給与明細を受け取っている場合、あなたは請負業者ではなく従業員です。必要なのはABNではなくTFNで、自宅からその職場までの通常の移動は、他のどんな仕事とも同様に、控除の対象にならない私的な通勤として扱われます。',
  },
  {
    question: '配達ドライバーはどちらの車両費の計算方法を使うべきですか？',
    answer: '仕事でどれだけ運転するかによります。年間の仕事関連の走行距離が5,000km未満であれば、領収書が不要で、走行距離の算出方法を合理的に記録するだけでよい1kmあたりの定額法の方が、通常は簡単です。それを超える場合や、実際の維持費が高い場合は、5年間有効な12週間のログブックを使うログブック法の方が、大きな控除額になることが多いですが、請求するすべての費用について領収書が必要です。',
  },
  {
    question: 'Uber EatsやDoorDashは私の収入をATOに報告していますか？',
    answer: 'はい。ATOのシェアリングエコノミー報告制度のもと、UberやDoorDashを含むプラットフォームはドライバーの収入データを直接ATOに報告しています。あなたが申告するかどうかにかかわらず、配達で得た収入はすでにATOに把握されているため、金額がどれだけ少なく、不規則に感じられても、タックスリターンに含める必要があります。',
  },
  {
    question: '車ではなく自転車やeスクーターで配達をしていますが、それでも何か請求できますか？',
    answer: 'はい。自転車やeスクーターにも、車と同じ「仕事で使った分」という考え方が適用されます。維持費や修理費のうち仕事で使った部分に加えて、ヘルメットや高視認性ウェアなどの安全装備についても、配達での使用と私的な使用の割合に応じて請求できます。',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: '経費', item: `${SITE_URL}/ja/expenses` },
    { '@type': 'ListItem', position: 3, name: '配達ドライバー', item: `${SITE_URL}/ja/expenses/delivery-drivers` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '配達ドライバーの税金｜Uber Eats・DoorDashのABNとTFN雇用',
  description: '配達の仕事がABNの請負業務なのか、TFNの雇用なのか、そしてどちらの場合でも税金で何を請求できるかを解説。',
  url: `${SITE_URL}/ja/expenses/delivery-drivers`,
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

function ForkCard({ f }: { f: DriverType }) {
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

export default function DeliveryDriversExpensesPageJA() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

            <nav aria-label="パンくずリスト" className="mb-4 lg:mb-5">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li><Link href="/ja" style={{ color: '#587066' }}>ホーム</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li><Link href="/ja/expenses" style={{ color: '#587066' }}>経費</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>配達ドライバー</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '22ch' }}>
                配達ドライバーの税金：<span style={{ color: '#0B5240' }}>ABN、TFN、それとも両方？</span>
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '50ch' }}>
                Uber Eats、DoorDash、Amazon FlexはABNのもとで行うギグワークです。1つのレストランでシフト制で運転する場合は、通常はTFNの一般的な仕事になります。ここでは両者の見分け方と、どちらの場合でも具体的に何を請求できるかを解説します。
              </p>
            </div>
          </div>
        </section>

        {/* ── THE ABN / TFN FORK (this page's unique hook) ────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                ABNかTFNか：まず自分がどちらに当てはまるかを確認する
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                ワーキングホリデービザでの配達の仕事の多くは、ABNのもとで行うギグワークです。一部は、TFNのもとで行う通常の従業員としての仕事にあたります。この2つは課税のされ方がまったく異なるため、最初に正しく見極めておくべきポイントです。
              </p>
            </div>

            <div className="exp-grid">
              {FORK_CARDS.map((f, i) => <ForkCard key={i} f={f} />)}
            </div>

            <div className="max-w-[680px] mx-auto text-center" style={{ marginTop: '8px' }}>
              <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7, marginBottom: '10px' }}>
                1年の中でその両方を行う人は珍しくありません。TFNでのシフト制の仕事と、副業としてのUber EatsやDoorDashをABNで組み合わせるパターンです。これはごく普通のことで、両方の収入種別を同じタックスリターンで申告すればよく、それぞれについて別々に記録を残しておくのが理想的です。
              </p>
              <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7 }}>
                1つ注意点があります。1つのレストランや店舗が、シフトを指定し、あなたの仕事を監督し、配達バッグや自転車まで支給しているにもかかわらずABNの取得を求めてくる場合、その契約形態は本来の請負ではなく、偽装請負（雇用を請負に見せかけたもの）である可能性があります。ABNというラベルだけで判断せず、登録前に一度確認しておく価値があります。
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU CAN / CAN'T CLAIM ───────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                配達ドライバーが実際に請求できるもの
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '56ch' }}>
                考え方はすべて共通しています。経費のうち仕事に関連する部分だけが対象になり、請求するものについては記録が必要です。
              </p>
            </div>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '0 0 8px', lineHeight: 1.3 }}>
              車両費・維持費
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              何に乗っていても、これは通常どのドライバーにとっても最大の控除項目です。車両のうち仕事に関連する部分を、1kmあたりの定額法かログブック法のいずれか（下記で詳しく比較）で請求します。対象になるのは、実際に仕事の一部である運転のみで、私的な移動は含まれません。
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              従業員として働く配達ドライバーの場合、通勤に関するルールは他のどんな仕事とも同じです。自宅から出勤先のレストランや店舗までの行き、シフト終了後の帰りの移動は私的な移動であり、控除の対象にはなりません。シフトに入ってから、店舗と配達先の間で行う運転のみが仕事関連として認められます。
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              ABNのもとで運転している場合は、少し事情が異なります。運転は単なる通勤手段ではなく、仕事そのものだからです。配達収入を得ることに直接かつ明らかに関係する移動は、従業員の通勤のように自動的に対象外となるわけではありません。例えば、自宅からその日最初の配達先までの移動が対象になるかどうかなど、線引きがどこにあるかは、実際の働き方の具体的な事実関係によって変わります。すべての走行距離が控除対象だと決めつけず、自分の状況について個別にアドバイスを受ける価値があります。
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              携帯電話・データ通信費
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              配達の仕事はアプリを通じて行われるため、携帯電話とデータプランのうち仕事に関連する割合は控除の対象になります。これは、Uber、DoorDash、Menulogのドライバーアプリ、GPSナビ、仕事に関するメッセージのやり取りに実際に使っている部分です。この割合については、公正で正直な見積もりが必要です。日常生活にも使っている携帯電話の料金全体を請求することは正当化できません。
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              駐車料金と罰金
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              仕事中に支払う駐車料金、例えばショッピングセンターで注文の準備を待っている間の駐車料金は控除の対象になります。一方、駐車違反やスピード違反の罰金はまったく別の話です。配達中に発生したものであっても、どんな事情があっても控除の対象にはなりません。
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              自転車・eスクーターで配達する場合
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              フードデリバリーは、4輪ではなく2輪で行われることが増えています。考え方は同じで、自転車やeスクーターの維持費・修理費のうち仕事に関連する部分に加えて、ヘルメットや高視認性ウェアなど仕事に必要な安全装備についても、配達での使用と私的な使用の割合に応じて請求できます。
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              車両を清潔に保つ
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              食品や荷物を運ぶのにふさわしい状態を保つための洗車代は、仕事に関連する部分について控除の対象になります。これは、乗客を乗せるライドシェアドライバーにも当てはまるのと同じ考え方です。
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              請求できないもの
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              毎年、何人かのドライバーがつまずくポイントがいくつかあります。移動のうち私的な部分、例えば配達先へ向かう途中で個人的な用事を済ませる場合は控除の対象になりません。従業員が自宅と決まった職場との間を移動する通常の通勤も同様です。駐車違反やスピード違反の罰金は、どのような経緯で発生したものであっても控除の対象にはなりません。また、給油代など、プラットフォームや雇用主からすでに払い戻しを受けているものについては、タックスリターンで再度請求することはできません。同じ費用を二重に請求することになってしまうからです。
            </p>
          </div>
        </section>

        {/* ── GST & SHARING ECONOMY REPORTING ──────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '34px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', letterSpacing: '-0.02em' }}>
                プラットフォームドライバーが知っておくべき2つのこと
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="taxres-savings-box">
                <div>
                  <p className="taxres-savings-heading">GSTが関係するのは売上が一定額を超えてから</p>
                  <p className="taxres-savings-body">
                    ABNのもとで働いていて、配達の仕事による年間売上が75,000ドルを超えると、GST登録が義務になります。フードデリバリーアプリでパートタイムとして働くワーキングホリデーメーカーのほとんどはこの金額には遠く及びませんが、勤務時間や収入が増えるにつれて、この基準が存在することを知っておく価値はあります。
                  </p>
                </div>
              </div>
              <div className="taxres-savings-box">
                <div>
                  <p className="taxres-savings-heading">プラットフォームはすでに収入をATOに報告している</p>
                  <p className="taxres-savings-body">
                    Uber、DoorDashなどのプラットフォームは、ATOの「シェアリングエコノミー報告制度（Sharing Economy Reporting Regime）」の対象であり、ドライバーの収入データを直接ATOに報告しています。あなたが申告するかどうかにかかわらず、配達で得た収入はATOに把握されているため、プラットフォームでの収入がひっそりと見逃されるということはあり得ません。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CAR EXPENSE METHODS ──────────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                車両費を請求する2つの方法
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '54ch' }}>
                ABNかTFNかにかかわらず、車両費については同じ2つの方法が適用されます。1台の車につき、1年で使える方法は1つだけです。
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="1kmあたりの定額法" rows={CAR_METHOD_ROWS} highlight />
              <CompareTable label="ログブック法" rows={LOGBOOK_ROWS} />
            </div>
            <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '60ch', marginTop: '18px' }}>
              配達の仕事での年間走行距離が5,000kmを超える場合、通常はログブック法の方が実際の費用をより多く反映できますが、12週間のログブックと、ガソリン代・整備費・車両登録費用などすべての領収書を保管する必要があります。
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">よくあるご質問</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  配達ドライバーの税金に関するご質問
                </h2>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  掲載されていないご質問もお気軽にお問い合わせください。
                </p>
              </div>
              <div className="max-w-[700px]">
                <Accordion items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
        <NextStep
          eyebrow="次のステップ"
          heading="ABNかTFNか、状況は把握できましたか？"
          body="配達の収入と経費が整理できたら、次はワーキングホリデーのタックスリターンを提出する番です。"
          cta="タックスリターンに進む →"
          href="/ja/tax-return"
        />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              これは一般的な情報であり、個別の税務アドバイスではありません。あなたが請負業者に当たるか従業員に当たるか、そして具体的に何を請求できるかは、実際の働き方の詳細によって変わります。当社でお手続きいただく際には、配達による収入、車・自転車・スクーターの経費、そしてABNかTFNかという状況を確認し、請求できるものはすべて、請求できないものは含めないようにサポートします。
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
