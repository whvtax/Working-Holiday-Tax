import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep, RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'FIFOの税金控除ガイド：交通費・PPE・Zone Offsetの誤解（オーストラリア）',
  description: 'ワーキングホリデービザでFIFO（フライ・イン・フライ・アウト）勤務をする人が確定申告で経費計上できるものを解説：PPEと工具、資格・免許の更新費用、携帯電話と自己啓発費用。さらに、典型的なFIFOロースターでZone Tax Offsetが通常適用されない理由と、雇用主が提供するキャンプの宿泊・食事がタックスリターンにどう影響するかも説明します。',
  keywords: [
    'FIFO 税金控除',
    'フライ・イン・フライ・アウト 税金',
    'FIFO 確定申告 オーストラリア',
    'Zone Tax Offset FIFO',
    'ゾーン税額控除 ワーキングホリデー',
    'FIFO キャンプ 宿泊 税金',
    '鉱山キャンプ 食事 FBT 非課税',
    'バックパッカー FIFO 仕事 税金',
    '417 462ビザ FIFO 税金控除',
    'High Risk Work Licence 税金控除',
    'Working at Heights ticket 控除',
    'FIFO ロースター 税金',
    '遠隔地 現場作業員 税金控除',
    'FIFO PPE 税金控除',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/expenses/fifo`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/fifo`,
      'de': `${SITE_URL}/de/expenses/fifo`,
      'ja': `${SITE_URL}/ja/expenses/fifo`,
      'x-default': `${SITE_URL}/expenses/fifo`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/expenses/fifo`,
    siteName: 'Working Holiday Tax',
    title: 'FIFOの税金控除ガイド：交通費・PPE・Zone Offsetの誤解（オーストラリア）',
    description: 'FIFO勤務者が確定申告で実際に経費計上できるものと、典型的なFIFOロースターでZone Tax Offsetが通常適用されない理由を解説。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'FIFOの税金控除ガイド：交通費・PPE・Zone Offsetの誤解（オーストラリア）',
    description: 'FIFO勤務者が確定申告で実際に経費計上できるものと、典型的なFIFOロースターでZone Tax Offsetが通常適用されない理由を解説。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const REALISTIC_ROLES = [
  {
    t: 'キャンプサービス（現実的な入り口）',
    d: 'キャンプの食堂でのケータリングやキッチンハンドの仕事、清掃やハウスキーピング、ランドリー業務、キャンプや現場事務所でのフロント業務・事務、そして現場の売店や小売業務。ワーキングホリデーメーカーがFIFOの仕事に就く場合、実際にはほとんどがここに行き着きます。',
  },
  {
    t: '技術職・鉱山関連の専門職',
    d: '鉱山やプラントで直接作業するオペレーター、職人、技術職の仕事もありますが、通常は特定の職業資格やチケット、あるいは数年単位の経験が求められ、現場の技術職ではオーストラリア国籍者や永住権保持者を優先する雇用主も少なくありません。不可能ではありませんが、ほとんどのワーキングホリデーメーカーにとっては現実的な出発点とは言いにくいでしょう。',
  },
]

const CAMP_PROVIDED_ROWS = [
  ['スウィング中の宿泊', '雇用主が直接手配・負担'],
  ['スウィング中の食事', '雇用主が直接手配・負担'],
  ['FBTの扱い', '雇用主側は通常非課税'],
  ['タックスリターンで控除できる？', 'いいえ、自分で支払っていないため'],
]

const ON_YOUR_OWN_ROWS = [
  ['PPEと安全装備', 'つなぎ、ブーツ、手袋、ゴーグル、マスクなど、自分で購入した場合'],
  ['工具・機材', '$300未満は全額控除、$300以上は減価償却'],
  ['チケット・免許の更新', 'すでにその職に就いて働いている場合'],
  ['携帯電話・インターネット', '仕事で使用した割合のみ'],
]

const BULKY_TOOLS_CONDITIONS = [
  'その工具が、その日行っている作業に欠かせないこと。',
  '工具が本当にかさばること、持ち運びに車両が必要なのは単なる利便性ではなく、実際のサイズや重量が理由であること。',
  '現場に安全に保管できる場所がなく、自宅まで持ち帰らざるを得ないこと。',
]

const UNDER_300_ROWS = [
  ['申請方法', '全額を即時申請'],
  ['いつ申請するか', '購入した年'],
  ['例', '$190の先芯入り安全靴'],
]

const OVER_300_ROWS = [
  ['申請方法', '耐用年数にわたって分割申請'],
  ['いつ申請するか', '所有している各年に一部ずつ'],
  ['例', '現場作業用の$600の工具セット'],
]

const FIRST_TICKET_ROWS = [
  ['内容', 'その職種で初めて取得するチケットや免許'],
  ['必要だった理由', 'そもそもその仕事に就く資格を得るため'],
  ['控除できる？', 'いいえ、私的な支出'],
]

const RENEWAL_TICKET_ROWS = [
  ['内容', 'すでに持っているチケットや免許の更新'],
  ['必要な理由', 'すでに現場で働いており、有効な状態を保つ必要があるため'],
  ['控除できる？', 'はい'],
]

const faqs = [
  {
    question: 'スウィング前の空港までの移動は経費にできますか？',
    answer: '通常はできません。スウィングのために自宅から空港や出発地点まで移動する区間は、フライトがどれだけ早朝であっても、自宅が空港からどれだけ離れていても、他の誰もが行う職場までの移動、つまり通常の私的な通勤と同じ扱いになります。本当にかさばる必須の工具を運ぶ必要があり、職場に安全に保管できる場所がない場合に限り狭い例外が認められますが、ほとんどのFIFOの仕事、特にキャンプサービス系の仕事ではこの例外は適用されません。',
  },
  {
    question: 'FIFO勤務者はZone Tax Offsetを受けられますか？',
    answer: '通常は受けられません。これはFIFOの税金に関する最大の誤解です。2015年の法改正以降、対象になるかどうかは、実際にどこで働いているかではなく、あなたの通常の居住地がどこにあるかによって決まります。あなたの通常の居住地そのものが、指定された辺境ゾーンに年間183日を超えて所在している必要があります。ゾーン内のロースターで働くために飛行機で通っていても、あなたの通常の居住地——パースやブリスベンなど、スウィングの合間の拠点であるシェアハウスや賃貸物件——がそのゾーンの外にある場合、たとえ1年の大半を現場で過ごしていたとしても、この基準は満たされません。FIFOの仕事をするほとんどのワーキングホリデーメーカーにとって、これはつまりこのオフセットが単純に適用されないということです。',
  },
  {
    question: 'キャンプの宿泊費や食費は経費にできますか？',
    answer: 'できません。現場での宿泊と食事は雇用主が直接手配して費用を負担しており、本当に遠隔地の現場であれば、通常はあなたへの追加所得としてではなく、雇用主にとっての非課税のフリンジベネフィットとして扱われます。いずれにしても、あなたが部屋や食事の代金を自分で支払ったことは一度もないため、控除として申請できる経費がそもそも存在しません。控除は、あなたが実際に自分で使ったお金しか取り戻すことができません。',
  },
  {
    question: '工具やPPEに関する$300ルールとは何ですか？',
    answer: '仕事のために工具、機材、保護具を自分で購入し、雇用主から支給も払い戻しも受けていない場合、$300未満の品物は購入した年に全額を申請できます。$300以上の品物は、一度に全額ではなく、耐用年数にわたって少しずつ減価償却して申請します。これはこのサイトで紹介しているすべての職業に共通する、同じ基準・同じルールであり、FIFOの仕事に限った特別なものではありません。',
  },
  {
    question: 'High Risk Work LicenceやWorking at Heightsのチケットは経費にできますか？',
    answer: 'それが初めての取得か更新かによって異なります。High Risk Work Licence、Working at Heightsのチケット、フォークリフト免許などを初めて取得する費用は、初めての運転免許証の取得と同様に私的な支出として扱われます。そもそもその職に就く資格を得るためのものだからです。すでにその仕事をしていて、働き続けるためにチケットの更新が必要になった場合、更新費用は控除の対象になります。これは建設業のWhite Cardにも当てはまる、初回取得と更新を区別する同じ考え方です。',
  },
  {
    question: 'ロースター中の携帯電話とインターネットの費用は経費にできますか？',
    answer: 'できます。ただし仕事に関連する部分のみです。ロースターの確認、タイムシートの提出、必須のオンライン導入研修や訓練の受講など、仕事のために携帯電話や自宅のインターネットを実際に使用している場合、その利用分を請求できます。実際に仕事で使用している割合について、公平で正直な見積もりが必要です。日常生活にも使っている携帯電話の請求額を全額申請することは正当化できません。',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: '経費', item: `${SITE_URL}/ja/expenses` },
    { '@type': 'ListItem', position: 3, name: 'FIFO', item: `${SITE_URL}/ja/expenses/fifo` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'FIFOの税金控除ガイド：交通費・PPE・Zone Offsetの誤解（オーストラリア）',
  description: 'ワーキングホリデービザでFIFO勤務をする人がオーストラリアの確定申告で経費計上できるものを解説：PPEと工具、資格・免許の更新費用、携帯電話と自己啓発費用、そして典型的なフライ・イン・フライ・アウトのロースターでZone Tax Offsetが通常適用されない理由。',
  url: `${SITE_URL}/ja/expenses/fifo`,
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
  '@id': `${SITE_URL}/ja/expenses/fifo#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/ja/expenses/fifo`,
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

export default function FifoExpensesPageJA() {
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
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>FIFO</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '27ch' }}>
                FIFOの税金控除：ロースターとキャンプ、そして<span style={{ color: '#0B5240' }}>Zone Offsetの誤解</span>
              </h1>
              <p className="font-semibold mx-auto hero-sub" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '56ch' }}>
                2週間勤務・1週間休み——現場まで飛行機で向かい、スウィングをこなし、また飛行機で家に帰る。キャンプでの宿泊と食事は、通常あなたではなく雇用主が負担します。FIFOのロースターで実際に何を経費にできるか、そして多くのFIFO勤務者が当然もらえると思い込んでいるZone Tax Offsetの真実を、ここで正確にお伝えします。
              </p>
            </div>
          </div>
        </section>

        {/* ── REALISTIC FIFO ROLES ─────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                ワーキングホリデーメーカーが実際に就けるFIFOの仕事とは？
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '62ch' }}>
                FIFO（フライ・イン・フライ・アウト）とは、遠隔地の鉱山や資源開発プロジェクトへ、決められた期間——スウィングやロースターと呼ばれ、一般的には2週間勤務・1週間休みのような形——だけ飛行機で向かい、次の勤務が始まるまでまた飛行機で家に帰る働き方です。れっきとした仕事であり、ワーキングホリデーメーカーが実際にFIFOの仕事に就くこともありますが、現実的にはFIFOの仕事の中でも特定の一部に限られることがほとんどです。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 max-w-[840px] mx-auto">
              {REALISTIC_ROLES.map((c, i) => (
                <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#F7FBF9', border: '1.5px solid #E2EFE9' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '8px' }}>{c.t}</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CAMP LIFE: THE UNIQUE HOOK ───────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                キャンプでの生活：雇用主が負担するものと、自己負担になるもの
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '60ch' }}>
                FIFOのロースターには、他のバックパッカーの仕事にはあまりない特徴があります。現場にいる間の宿泊と食事を、雇用主が直接手配して負担してくれることです。
              </p>
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginBottom: '26px' }}>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                スウィング中、キャンプの部屋も食堂での食事も、あなたではなく会社が予約し、費用を負担しています。本当に遠隔地にある現場であれば、この種の宿泊と食事は通常、FBT（フリンジベネフィット税）のリモートエリア規則のもとで、あなたへの課税対象所得としてではなく、雇用主にとっての非課税のフリンジベネフィットとして扱われます。いずれにしても、タックスリターンにおける結論はシンプルです。あなたが部屋や食事の代金を自分のポケットから支払ったことは一度もないため、控除として申請できる費用がそもそも存在しないということです。控除は、あなたが実際に自分で使ったお金しか取り戻すことができません。
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="雇用主が負担するもの" rows={CAMP_PROVIDED_ROWS} highlight />
              <CompareTable label="自分で負担するもの" rows={ON_YOUR_OWN_ROWS} />
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginTop: '30px' }}>
              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
                現場までの移動
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                現場までのフライト自体は、通常ロースターの一部として雇用主が手配し、費用を負担します。対象外なのは、自宅から空港や出発地点までの、あなた自身の移動です。これは他の誰もが行う職場までの移動と同じ、通常の私的な通勤にあたり、フライトがどれだけ早朝であっても、自宅が空港からどれだけ離れていても控除の対象にはなりません。
              </p>

              <div className="flex flex-col gap-3" style={{ marginBottom: '14px' }}>
                {BULKY_TOOLS_CONDITIONS.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
              <p className="font-light" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6, marginBottom: '22px' }}>
                その移動が控除の対象になるには、この3つの条件すべてに当てはまる必要があります。実際には、これは自分の工具一式を持って現場入りする職人にとってより意味のある狭い例外であり、ほとんどのキャンプサービス系の仕事では、通常はそこまでかさばるものがなかったり、現場に安全に保管できない理由がなかったりします。
              </p>

              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
                FIFOの仕事に就くための引っ越し
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                たとえばパースやブリスベンなど、FIFOの仕事のために拠点を置く目的で移住する場合、その引っ越し自体にかかる費用——航空券、貨物輸送費、生活が落ち着くまでの一時的な宿泊費など——は、仕事に関連する控除ではなく、私的な引っ越し費用として扱われます。その引っ越しが仕事に就くことと明らかに関係していたとしても、この点は変わりません。ATOは、新しい仕事のために引っ越す費用を、収入を得られる立場に自分を置くための費用とみなし、実際にそこで収入を得るための費用とはみなさないためです。
              </p>
            </div>
          </div>
        </section>

        {/* ── ZONE TAX OFFSET: PROMINENT MYTH-CORRECTION (unique hook) ────── */}
        <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <span className="section-label">FIFOの税金に関する最大の誤解</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 18px' }}>
              Zone Tax Offset：ゾーンで働くことと、ゾーンに住むことは同じではありません
            </h2>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              遠隔地の鉱山や資源開発現場にフライ・イン・フライ・アウトで通っているというだけで、その現場がATOの指定する辺境ゾーンの中にあるからといって、自動的にZone Tax Offsetの対象になると考えている人は少なくありません。しかし典型的なFIFOの勤務形態では、この思い込みは通常誤りです。
            </p>

            <div className="rounded-2xl" style={{ padding: '20px 22px', background: '#FDF0D5', border: '1.5px solid #F9D88A', borderLeft: '4px solid #E9A020', margin: '22px 0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                大切なのは、どこに住んでいるかであって、どこへ飛行機で向かうかではありません。
              </p>
              <p className="font-light" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.75 }}>
                2015年の法改正以降、この基準はもはや、ゾーン内で実際に何日働いたかだけで判断されるものではありません。対象となるためには、あなたの通常の居住地——単に出勤して働いている場所ではなく、実際に生活している場所——そのものが、その会計年度中に183日を超えて指定ゾーン内に所在している必要があります。ゾーン内のロースターで働くために飛行機で通っていても、あなたの通常の居住地がそのゾーンの外にある場合、たとえ複数のスウィングを通じて年間183日をはるかに超えて現場で過ごしていたとしても、この基準は満たされません。
              </p>
            </div>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              FIFOの仕事をしているほとんどのワーキングホリデーメーカーにとって、これによってオフセットの対象外となります。ワーキングホリデー中のあなたの通常の居住地は、鉱山のキャンプではありません。キャンプでの宿泊は一時的なもので、ロースターに紐づいており、その週にもし現場にいなければ本来生活していたはずの場所ではないからです。あなたの通常の居住地は、スウィングの合間に実際に拠点としている場所——パース、ブリスベン、ダーウィン、カラサ、あるいはワーキングホリデー中にあなたが「自宅」と呼ぶその他のどこか——です。その拠点そのものが指定ゾーンの中にない限り、現場がどれだけ遠隔地にあっても、年に何回スウィングをこなしても、飛行機で仕事に通うだけではオフセットを受けることはできません。
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              もしご自身の状況が実際に異なる場合——たとえば、ワーキングホリデー中の実際の拠点が指定ゾーンの中にある場合——は、どちらとも決めつけずに、タックスリターンを作成する際に確認しておく価値があります。
            </p>
          </div>
        </section>

        {/* ── PPE, TOOLS & THE $300 RULE ───────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                PPE、工具と$300ルール
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                仕事のために実際に自分で購入し、払い戻しを受けていないものは控除の対象になります。どのように申請するかは、それが何であるか、そしていくらであるかによって変わります。
              </p>
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginBottom: '24px' }}>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                自分で購入する個人保護具——つなぎ、先芯入りの安全靴、手袋、保護メガネ、マスクなど——は、単に持っていると便利だからではなく、現場での特定のリスクからあなたを守るものであるため控除の対象になります。その装備を自分で洗濯する費用も控除の対象です。これは、雇用主がストアから支給したり、貸与したり、払い戻したりしたものには一切当てはまりません。控除できるのは、実際に自分のポケットから出たものだけです。
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                普通のズボン、Tシャツ、現場の寒い朝のためのセーターといった普段着は、スウィングの間にどれだけ傷んだり汚れたりしても、控除の対象には一切なりません。対象となるには、上記のPPEのように実際の保護機能を持っている必要があり、単に仕事にふさわしい服装であるというだけでは不十分です。
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="$300未満" rows={UNDER_300_ROWS} highlight />
              <CompareTable label="$300以上" rows={OVER_300_ROWS} />
            </div>
            <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '62ch', marginTop: '18px' }}>
              複数の工具をまとめてセットとして購入し、合計金額が$300以上になる場合は、個々の工具が単体では$300未満であっても、セット全体を耐用年数にわたって減価償却します。
            </p>
          </div>
        </section>

        {/* ── TICKETS & LICENCES: FIRST VS RENEWAL ─────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                チケットと免許：初回取得と更新の違い
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                High Risk Work Licence、Working at Heightsのチケット、フォークリフト免許——そのどれが控除の対象になるかは、同じ一つの違いによって決まります。
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="最初のチケットや免許" rows={FIRST_TICKET_ROWS} />
              <CompareTable label="すでに持っているチケットの更新" rows={RENEWAL_TICKET_ROWS} highlight />
            </div>

            <p className="font-light mx-auto text-center" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.7, maxWidth: '64ch', marginTop: '20px' }}>
              これは、このサイトが建設業のWhite Cardに適用しているのと同じ考え方であり、ATOが運転免許証に適用しているのと同じ考え方でもあります。ある職に就くために必要な資格や許可を初めて取得する費用は私的な支出ですが、すでに仕事で使っている資格を維持する費用は控除の対象になります。初めて取得するHigh Risk Work Licence、Working at Heightsのチケット、フォークリフト免許は私的な支出であり、すでに現場でそれを使って働いている状態で更新する費用は控除の対象になります。
            </p>
          </div>
        </section>

        {/* ── PHONE, SELF-EDUCATION, TESTING & RECORDS ─────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                携帯電話、研修、検査、そして記録の保管
              </h2>
            </div>

            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8, marginBottom: '16px' }}>
                仕事に関連する通話は控除の対象になり、ロースターの確認、タイムシートの提出、必須のオンライン導入研修や訓練モジュールの受講など、仕事のために実際に必要としている場合は、携帯電話とインターネットプランの按分された部分も控除の対象になります。請求額の全額を申請するのではなく、仕事で使用している割合について公平で正直な見積もりをつけておきましょう。
              </p>
              <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8, marginBottom: '16px' }}>
                すでに従事している仕事に直接関連する短期コースやTAFEの単位は控除の対象になり、これはこのサイトで紹介しているすべての職業に共通する自己啓発費用の基準と同じです。雇用主からセミナーや研修の受講のために出張を求められ、通常の拠点を離れて滞在する必要がある場合、その交通費と宿泊費も控除の対象になります。最初のCertificate IIのように、そもそもその職に就く資格を得るためだけに受講する入門レベルのコースは、最初のチケットと同じ扱いになります。つまり、すでに就いている仕事をするための費用ではなく、その仕事に就く資格を得るための私的な費用です。
              </p>
              <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8 }}>
                多くのFIFOの雇用主は、現場で働くための条件として健康診断や薬物・アルコール検査を求めます。すでに就いている職のために雇用主がこれを求めており、その費用を自分で支払う必要がある場合、その費用は控除の対象になります。
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
          heading="FIFOの経費、いくらになるか確認しましょう"
          body="無料の計算ツールで手軽に概算するか、直接メッセージをお送りいただければ、あなたのロースターやチケット、キャンプでの取り決めを一つひとつ確認します。"
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
                  FIFOの控除に関するご質問
                </h2>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  ご自身のロースターや現場について質問がありますか？お気軽に直接メッセージをお送りください。
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
            { label: 'TFN申請', desc: '初めてのスウィングの前にタックスファイルナンバーを取得しておきましょう。', href: '/ja/tfn' },
            { label: 'タックスリターン', desc: '申告書を提出し、FIFOの仕事の経費を申請しましょう。', href: '/ja/tax-return' },
            { label: 'スーパーアニュエーション（DASP）', desc: 'オーストラリア出国後にスーパーを取り戻しましょう。', href: '/ja/superannuation' },
            { label: '職業別の控除ガイド', desc: 'FIFOだけでなく、あらゆるバックパッカーの仕事の控除を確認できます。', href: '/ja/expenses' },
          ]}
        />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              これは一般的な情報であり、個別の税務アドバイスではありません。ロースター、現場、キャンプでの取り決めは一人ひとり少しずつ異なり、特にZone Tax Offsetは、ロースターでどこへ行くかではなく、あなた自身の通常の居住地によって判断されます。当社にご依頼いただいた場合、タックスリターンはワーホリ専門のチームによって作成され、お客様の具体的なロースター、チケット、状況を確認したうえで、請求できるものはすべて、請求できないものは一切含めないようにいたします。
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
