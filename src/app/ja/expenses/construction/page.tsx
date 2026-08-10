import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep, RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: '建設業の税金控除ガイド：工具・PPE・White Card（オーストラリア）',
  description: '建設業で働くワーキングホリデーメーカーが確定申告で経費計上できるものを解説。$300未満・以上の工具や機材、保護服とPPE、White Cardの更新費用と初回取得費用の違い、ユートなどの車両費、自己啓発費用まで、ATOの職人向けガイダンスに基づいて解説します。',
  keywords: [
    '建設業 税金控除',
    'ワーホリ 建設業 税金',
    'White Card 確定申告',
    'White Card 税金控除',
    '工具 税金控除 オーストラリア',
    'PPE 税金控除 建設業',
    'バックパッカー 建設業 確定申告',
    '417ビザ 建設業 控除',
    '建設現場 税金 控除',
    '職人 控除 ATO',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/expenses/construction`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/construction`,
      'de': `${SITE_URL}/de/expenses/construction`,
      'ja': `${SITE_URL}/ja/expenses/construction`,
      'x-default': `${SITE_URL}/expenses/construction`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/expenses/construction`,
    siteName: 'Working Holiday Tax',
    title: '建設業の税金控除ガイド：工具・PPE・White Card（オーストラリア）',
    description: 'ワーキングホリデーで建設業として働く人が実際に経費計上できるものとは。工具、PPE、White Cardの更新費用、車両費まで解説します。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: '建設業の税金控除ガイド：工具・PPE・White Card（オーストラリア）',
    description: 'ワーキングホリデーで建設業として働く人が実際に経費計上できるものとは。工具、PPE、White Cardの更新費用、車両費まで解説します。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const ATO_TRADIES_URL = 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/tradies-be-certain-about-what-you-can-claim'

const UNDER_300_ROWS = [
  ['申請方法', '全額を即時申請'],
  ['いつ申請するか', '購入した年'],
  ['例', '$180のコードレスドリル'],
]

const OVER_300_ROWS = [
  ['申請方法', '耐用年数にわたって分割申請'],
  ['いつ申請するか', '所有している各年に一部ずつ'],
  ['例', '$650のコンクリートミキサー'],
]

const FIRST_CARD_ROWS = [
  ['内容', '初めて取得するWhite Card'],
  ['必要だった理由', 'そもそも建設現場での仕事に就くための資格を得るため'],
  ['控除できる？', 'いいえ、私的な支出'],
]

const RENEWAL_CARD_ROWS = [
  ['内容', 'すでに持っているWhite Cardの更新'],
  ['必要な理由', 'すでに現場で働いており、有効な状態を保つ必要があるため'],
  ['控除できる？', 'はい'],
]

const CENTS_PER_KM_ROWS = [
  ['現在のレート（2026-27年度、2026年7月1日から）', '1kmあたり91セント'],
  ['以前のレート（2024-25・2025-26年度）', '1kmあたり88セント'],
  ['請求できる上限', '1台あたり年間5,000km'],
  ['ユート・バン（積載量1トン以上）', '対象外、ログブック法を使用'],
]

const LOGBOOK_ROWS = [
  ['仕組み', '実際にかかった費用のうち、仕事で使用した割合を請求'],
  ['ログブック記録期間', '連続12週間、5年間有効'],
  ['請求できる上限', '上限なし、実際の仕事使用率に基づく'],
  ['ユート・バンにも必要？', '必要、車両費を請求する場合は'],
]

const VEHICLE_CONDITIONS = [
  'その工具が、その日行っている作業に欠かせないこと。',
  '工具が本当にかさばること、持ち運びに車両が必要なのは単なる利便性ではなく、実際のサイズや重量が理由であること。',
  '現場に安全に保管できる場所がなく、自宅まで持ち帰らざるを得ないこと。',
]

type CardData = {
  emoji: string
  title: string
  subtitle: string
  can: string[]
  cannot: string[]
}

const TOOLS_CARD: CardData = {
  emoji: '\u{1F6E0}️',
  title: '工具・機材',
  subtitle: '仕事のために自分で購入するもの',
  can: [
    '自分で購入する手動・電動工具：ドリル、グラインダー、電動のこぎり、サンダー、釘打ち機',
    '自分で用意する大型の現場用機材（コンクリートミキサー、はしご、リーフブロワーなど）',
    '仕事のために購入した工具箱や作業灯',
  ],
  cannot: [
    '雇用主から支給・貸与された工具、または雇用主があなたに代わって購入した工具',
    '自分で支払った後に払い戻しを受けた工具',
  ],
}

const PPE_CARD: CardData = {
  emoji: '\u{1F9BA}',
  title: '保護服・PPE',
  subtitle: '実際に安全機能を持つ装備',
  can: [
    '高視認性のベストやシャツ、先芯入りの安全靴、保護メガネ、ヘルメット、耳当て（イヤーマフ）',
    '屋外での現場作業のための日焼け止め、サンハット、サングラス',
    '手指消毒液、フェイスマスク、作業用手袋',
  ],
  cannot: [
    'ジーンズやTシャツ、パーカーなどの普段着。現場作業で傷んだり擦り切れたりしても対象外',
    '仕事に実用的であっても、実際の保護機能を持たないもの',
  ],
}

const faqs = [
  {
    question: '最初のWhite Cardは控除できますか？',
    answer: 'いいえ。ATOは、あなたが初めて取得するWhite Card（正式名称：Construction Induction Card）を、初めて取得する運転免許証と同じように扱います。そもそもその仕事に就くための資格を得るために必要だった費用は、控除ではなく私的な支出です。すでに現場で働いていて、働き続けるためにカードの更新が必要になった場合、その更新費用は控除の対象になります。同じ考え方が、初めて取得するフォークリフトの資格や大型車両の許可証にも当てはまります。',
  },
  {
    question: '建設業の仕事では、どんな工具を控除できますか？',
    answer: '現場作業のために自分で購入した工具や機材は、雇用主から支給されたり払い戻しを受けたりしていない限り、控除の対象になります。ドリル、グラインダー、サンダー、手動工具など、1点あたり$300未満のものは、購入した年に全額を申請できます。大型の電動工具やコンクリートミキサーなど、1点$300以上のものは、一度に全額ではなく、耐用年数にわたって少しずつ申請します。',
  },
  {
    question: '複数の現場に移動するためのユートは控除できますか？',
    answer: '自宅から普段の職場までの運転は、その職場が建設現場であっても、通常は私的な通勤として扱われ、控除の対象になりません。ただし狭い例外があります。工具が本当にかさばり、仕事に欠かせず、現場に安全に保管できる場所がない場合、その工具を運ぶための移動は控除の対象になります。ほとんどのユートやパネルバンは積載量が1トン以上あるため、よりシンプルな1kmあたりの定額法の対象外となり、車両費を請求したい場合はログブックが必要になります。',
  },
  {
    question: '先芯入りの安全靴や高視認性の作業着は税金控除の対象になりますか？',
    answer: 'はい。先芯入りの安全靴、高視認性のベスト、保護メガネ、ヘルメット、耳当てなどの保護用品は、現場での特定の負傷リスクからあなたを守るものであるため控除の対象になります。これがATOの適用する基準です。日焼け止め、サンハット、サングラスなどの日焼け対策も、屋外で働く場合は控除の対象になります。',
  },
  {
    question: '現場で作業着が破れたり汚れたりした場合、控除できますか？',
    answer: 'いいえ。ジーンズやTシャツ、フランネルシャツなどの普段着は、建設現場で傷んだり、汚れたり、擦り切れたりしても、それだけで控除の対象にはなりません。ATOは普段着の通常の消耗を私的な支出として扱います。対象となるには、上記のPPEのような実際の保護機能があるか、義務付けられたロゴ入り制服である必要があります。',
  },
  {
    question: '職業訓練コースや研修は控除できますか？',
    answer: '自己啓発費用は、すでに従事している職種や役割に直接関連する場合、たとえば既存のスキルや資格をアップグレードする講座であれば控除の対象になります。別の職種への転向を目的とした講座は、たとえ建設関連であっても控除の対象になりません。今使っている資格を維持するのではなく、新しい資格を築くことになるためです。',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: '経費', item: `${SITE_URL}/ja/expenses` },
    { '@type': 'ListItem', position: 3, name: '建設業', item: `${SITE_URL}/ja/expenses/construction` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '建設業の税金控除ガイド：工具・PPE・White Card（オーストラリア）',
  description: 'ワーキングホリデーで建設業として働く人がオーストラリアの確定申告で経費計上できるものを解説：工具・機材、保護服とPPE、White Cardの更新費用、車両費、自己啓発費用。',
  url: `${SITE_URL}/ja/expenses/construction`,
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

function ClaimCard({ d }: { d: CardData }) {
  return (
    <div className="exp-card">
      <div className="exp-card-head">
        <span className="exp-card-emoji" aria-hidden="true">{d.emoji}</span>
        <div>
          <h3 className="exp-card-title">{d.title}</h3>
          <p className="exp-card-subtitle">{d.subtitle}</p>
        </div>
      </div>
      <div className="exp-card-section">
        <p className="exp-card-label exp-card-label-yes">✓ 控除できる可能性があるもの</p>
        <ul className="exp-card-list">
          {d.can.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
      <div className="exp-card-section">
        <p className="exp-card-label exp-card-label-no">✕ 通常、控除できないもの</p>
        <ul className="exp-card-list">
          {d.cannot.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default function ConstructionExpensesPageJA() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

          <nav aria-label="Breadcrumb" className="mb-4 lg:mb-5">
            <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
              <li><Link href="/ja" style={{ color: '#587066' }}>ホーム</Link></li>
              <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
              <li><Link href="/ja/expenses" style={{ color: '#587066' }}>経費</Link></li>
              <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
              <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>建設業</li>
            </ol>
          </nav>

          <div className="text-center">
            <h1 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '26ch' }}>
              <span style={{ color: '#0B5240' }}>建設現場で働く人</span>が実際に経費計上できるものとは？
            </h1>
            <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '52ch' }}>
              建設現場は、バックパッカーの仕事の中でもATOのガイダンスが最も詳細に定められている分野です。工具や保護具、White Card（建設従事者証）、そしてユートがいつ本当に対象になるか。ここでは、何が控除の対象になるのかを正確に解説します。
            </p>
          </div>
        </div>
      </section>

      {/* ── TOOLS & EQUIPMENT (centerpiece pt.1) ─────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              工具・機材：$300のルール
            </h2>
            <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
              現場作業のために自分で工具を購入し、雇用主から支給されたり払い戻しを受けたりしていない場合、その費用は控除の対象になります。申請方法は価格によって異なり、詳しくは{' '}
              <a href={ATO_TRADIES_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                ATOの職人向けガイダンス
              </a>
              をご覧ください。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <CompareTable label="$300未満" rows={UNDER_300_ROWS} highlight />
            <CompareTable label="$300以上" rows={OVER_300_ROWS} />
          </div>

          <div className="info-block" style={{ marginTop: '22px', marginBottom: '22px' }}>
            <p>
              工具をセットで購入する場合は扱いが変わります。複数の工具をまとめてセットとして購入し、合計金額が$300以上になる場合、個々の工具が単体では$300未満であっても、セット全体を耐用年数にわたって減価償却する必要があります。
            </p>
          </div>

          <div className="max-w-[560px] mx-auto">
            <ClaimCard d={TOOLS_CARD} />
          </div>
        </div>
      </section>

      {/* ── PPE & PROTECTIVE CLOTHING (centerpiece pt.2) ─────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              保護服とPPE（個人保護具）
            </h2>
            <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
              ATOが適用する基準は、それが現場で役立つかどうかではありません。その品物に、特定の負傷リスクからあなたを守る機能や特性があるかどうかです。
            </p>
          </div>

          <div className="max-w-[560px] mx-auto">
            <ClaimCard d={PPE_CARD} />
          </div>

          <div className="info-block" style={{ marginTop: '22px', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto' }}>
            <p>
              普段着が通常の使用で傷むのは私的な支出であり、現場でどれだけ本当にボロボロになったとしても変わりません。その品物は、単に仕事に耐えられるだけでなく、切り傷、日差し、騒音、粉じん、衝撃などから実際にあなたを守るものでなければなりません。
            </p>
          </div>
        </div>
      </section>

      {/* ── WHITE CARD & OTHER LICENCES ──────────────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              White Card：初回取得と更新の違い
            </h2>
            <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
              これは建設業の控除の中で最も誤解されやすいポイントで、たった一つの違いに集約されます。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <CompareTable label="最初のWhite Card" rows={FIRST_CARD_ROWS} />
            <CompareTable label="White Cardの更新" rows={RENEWAL_CARD_ROWS} highlight />
          </div>

          <p className="font-light mx-auto text-center" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.7, maxWidth: '62ch', marginTop: '20px' }}>
            これは、ATOが運転免許証に適用しているのと同じ考え方です。ある職業に就くために必要な資格や許可を初めて取得する費用は私的な支出ですが、すでに仕事で使っている資格を維持する費用は控除の対象になります。同じ考え方はフォークリフトの資格や大型車両の許可証にも当てはまり、最初の取得は私的な支出、すでに仕事で使っているものを更新する費用は控除の対象になります。
          </p>
        </div>
      </section>

      {/* ── VEHICLE EXPENSES ─────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              ユート・バン・車：いつ本当に対象になるか
            </h2>
            <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '60ch' }}>
              自宅から普段の職場まで運転するのは、通常は私的な通勤とみなされ、その職場が建設現場であっても変わりません。ただし一つだけ狭い例外があり、以下の3つの条件すべてに当てはまる必要があります。
            </p>
          </div>

          <div className="max-w-[680px] mx-auto mb-6">
            <div className="flex flex-col gap-3">
              {VEHICLE_CONDITIONS.map((c, i) => (
                <div key={i} className="taxres-condition-item">
                  <span className="taxres-condition-num">{i + 1}</span>
                  <p className="taxres-condition-text">{c}</p>
                </div>
              ))}
            </div>
            <p className="font-light mx-auto" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch', marginTop: '16px', textAlign: 'center' }}>
              現場に施錠できる工具小屋やコンテナ、ケージがある場合、または工具が普通のバッグに収まる場合は、その移動は通常の通勤とみなされ、控除の対象にはなりません。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <CompareTable label="1kmあたりの定額法" rows={CENTS_PER_KM_ROWS} highlight />
            <CompareTable label="ログブック法" rows={LOGBOOK_ROWS} />
          </div>
          <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '64ch', marginTop: '18px' }}>
            ユート、積載量1トン以上のパネルバン、9人以上乗車できるように作られたミニバンは、1kmあたりの定額法を一切使用できません。該当する車両で車両費を請求したい場合は、ログブック法だけが選択肢になります。
          </p>
        </div>
      </section>

      {/* ── SELF-EDUCATION, PHONE & RECORDS ──────────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              研修・携帯電話・記録の保管
            </h2>
          </div>

          <div className="max-w-[680px] mx-auto">
            <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8, marginBottom: '16px' }}>
              すでに従事している職種のスキルを維持するための講座、たとえば資格のアップグレードや現在の役割で使う技術を学ぶ講座は、控除の対象になります。別の職種への転向を目的とした講座は、たとえ建設関連であっても対象外です。今使っている資格を維持するのではなく、新しい資格を築くことになるためです。
            </p>
            <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8 }}>
              自分の携帯電話を使って現場監督に電話したり、予定を確認したり、シフトについてメッセージを送ったりする場合、携帯電話・インターネットプランのうち仕事で使用した部分は控除の対象になります。請求額の全額を申請するのではなく、仕事での使用割合についておおまかで正直な記録をつけておきましょう。
            </p>
          </div>

          <div className="taxres-savings-box" style={{ marginTop: '28px', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div>
              <p className="taxres-savings-heading">記録の保管について</p>
              <p className="taxres-savings-body">
                請求するすべての項目について、金額、日付、購入先、購入した物の説明が記載されたレシート、請求書、または銀行明細を保管してください。スマートフォンで撮った写真でも構いませんが、5年間提示できる状態にしておく必要があります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="準備ができたら"
        heading="現場の経費、いくらになるか確認しましょう"
        body="無料の計算ツールで手軽に概算するか、直接メッセージをお送りいただければ、あなたの工具やPPE、現場での仕事内容を一つひとつ確認します。"
        cta="計算ツールを試す →"
        href="/ja/calculator"
      />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
            <div className="text-center">
              <span className="section-label center">よくあるご質問</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                建設業の控除に関するご質問
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                ご自身の状況について質問がありますか？お気軽に直接メッセージをお送りください。
              </p>
            </div>
            <div className="max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────────────────────────── */}
      <RelatedServices
        label="関連サービス"
        items={[
          { label: 'TFN申請', desc: '初シフトの前にタックスファイルナンバーを取得しておきましょう。', href: '/ja/tfn' },
          { label: 'タックスリターン', desc: '申告書を提出し、建設業の経費を申請しましょう。', href: '/ja/tax-return' },
          { label: 'スーパーアニュエーション（DASP）', desc: 'オーストラリア出国後にスーパーを取り戻しましょう。', href: '/ja/superannuation' },
          { label: '職業別の控除ガイド', desc: '建設業だけでなく、あらゆるバックパッカーの仕事の控除を確認できます。', href: '/ja/expenses' },
        ]}
      />

      {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '48px' }}>
        <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
            これは一般的な情報であり、個別の税務アドバイスではありません。現場や役割によって状況は少しずつ異なります。当社にご依頼いただいた場合、ワーホリ専門のチームがお客様の申告書を作成し、あなたの工具、資格、現場での仕事内容を具体的に確認したうえで、請求できるものはすべて、請求できないものは一切含めないようにいたします。
          </p>
          <Link href="/ja/tax-form" className="inline-flex items-center justify-center font-semibold"
            style={{ minHeight: '52px', padding: '0 36px', background: '#0B5240', color: '#fff', borderRadius: '100px', fontSize: '15px', textDecoration: 'none' }}>
            税金の還付金を受け取る →
          </Link>
        </div>
      </section>

      <MobileCta href="/ja/tax-form" lang="ja" />
    </>
  )
}
