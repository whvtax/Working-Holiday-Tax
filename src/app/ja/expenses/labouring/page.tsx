import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'レイバーハイヤー・倉庫作業の税金控除ガイド｜オーストラリア ワーホリ',
  description: 'レイバーハイヤー（人材派遣）会社やスタッフィングエージェンシーを通じて働くバックパッカーが確定申告で経費にできるものを解説。倉庫作業、引っ越し、造園、工場、イベントの仕事に対応し、複数のエージェンシーに登録している場合に何が変わるかも説明します。',
  keywords: [
    'レイバーハイヤー 税金控除',
    '倉庫 バイト 税金 控除',
    '人材派遣 ワーホリ 税金',
    'スタッフィングエージェンシー 税金 オーストラリア',
    '引っ越し バイト 税金控除',
    'ワーホリ 倉庫 確定申告',
    '複数 雇用主 非課税枠 オーストラリア',
    'フォークリフト免許 確定申告',
    '417ビザ 倉庫 税金',
    'WHV 労務 タックスリターン',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/expenses/labouring`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/labouring`,
      'de': `${SITE_URL}/de/expenses/labouring`,
      'ja': `${SITE_URL}/ja/expenses/labouring`,
      'x-default': `${SITE_URL}/expenses/labouring`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/expenses/labouring`,
    siteName: 'Working Holiday Tax',
    title: 'レイバーハイヤー・倉庫作業の税金控除ガイド｜オーストラリア ワーホリ',
    description: 'レイバーハイヤーやスタッフィングエージェンシーを通じて働くバックパッカーが確定申告で経費にできるものと、複数のエージェンシーに登録した場合に変わることを解説。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'レイバーハイヤー・倉庫作業の税金控除ガイド｜オーストラリア ワーホリ',
    description: 'レイバーハイヤーやスタッフィングエージェンシーを通じて働くバックパッカーが確定申告で経費にできるものと、複数のエージェンシーに登録した場合に変わることを解説。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const CAN_CLAIM = [
  {
    title: '保護服・安全装備',
    body: '安全靴（先芯入り）、手袋、高視認性の作業着、保護メガネは、派遣先の具体的な仕事内容でそれらの着用が求められる場合に控除の対象になります。ATOが判断基準にしているのは、その仕事がどれだけ肉体的にきついかではなく、その用品がその仕事における具体的な負傷リスクからあなたを守るものかどうかです。そのため、何を経費にできるかは、倉庫作業でも造園チームでもイベントの設営作業でも、その日実際に派遣先で行っていた仕事の内容によって決まります。',
  },
  {
    title: '初めての取得ではなく、更新する資格・免許',
    body: 'フォークリフト免許やEWP（高所作業車）の資格など、特定の操作資格が求められる仕事で、すでにその資格を持っていてその仕事のために使用している場合、資格の更新費用は控除の対象になります。一方、その資格を初めて取得する費用は控除できません。これは、すでに就いている仕事にかかる費用ではなく、そもそもその仕事に応募する資格を得るための費用だからです。これは、初めての運転免許や、建設業で働き始める人が最初に取得するWhite Card（建設従事者証）と同じ考え方です。',
  },
  {
    title: '自分で購入する工具・機材',
    body: 'レイバーハイヤーの仕事の中には、基本的な工具を自分で用意することが求められるものもあります。自分で購入し、払い戻しを受けていないものはすべて控除の対象になります。1点あたり$300以下のものは購入した年に全額を控除でき、$300を超えるものは一度に全額ではなく、耐用年数にわたって少しずつ減価償却して控除します。',
  },
]

const CANNOT_CLAIM_TEXT = 'その週にどのエージェンシーや現場で働いているかにかかわらず、いくつか勘違いしやすいポイントがあります。普通の作業ズボン、Tシャツ、特殊な機能のないブーツといった普段着は、仕事で汚れたり、破れたり、傷んだりしても控除の対象にはなりません。ATOはこれを、仕事特有の費用ではなく、誰もが負担する普通の衣類費用とみなします。自宅から決まった一つの職場への移動は、たとえ長距離の運転であっても、上で説明した「転々とする」移動ではなく通常の通勤にあたります。また、エージェンシーから払い戻しを受けたもの、あるいは制服・安全装備・工具などをそのまま支給されたものは、タックスリターンで再度請求することはできません。控除できるのは、実際に自分のポケットから支払った分だけです。'

const faqs = [
  {
    question: '同時に2〜3社のレイバーハイヤー会社に登録しています。税金について何を知っておくべきですか？',
    answer: 'それぞれのエージェンシーは法律上、別々の雇用主として扱われるため、派遣先の現場が重なっていたとしても、確定申告の際にはエージェンシーごとに別々のTFN Declarationと別々の所得明細書（Income Statement）が必要になります。ワーキングホリデーメーカーとしての給与は通常、居住者向けの非課税枠ではなく、ワーキングホリデーメーカー税率で課税されるため、「非課税枠は1つの支払者にしか申請できない」という一般的な問題は、実際の源泉徴収額にはあまり影響しません。複数のエージェンシーが同時に動いている場合に本当に重要なのは、もっとシンプルなことです。どのエージェンシーで、どの現場で、いつ働いたかを記録しておき、タックスリターン作成時に何も見落とされないようにすることです。',
  },
  {
    question: '異なる現場間の移動は経費にできますか？',
    answer: 'ほとんどの場合、できます。自宅から決まった一つの職場への通常の移動とは異なり、2つ以上の異なる勤務先の間の移動、たとえばエージェンシーから午前中はある倉庫、午後は別の現場に派遣されるようなケースは控除の対象になります。働き方が本当に「転々とする」パターンに近いほど（決まった拠点がなく、週の中で派遣先が定期的に変わるほど）、より多くの移動を経費として請求できる根拠が強くなりますが、実際のシフト表の内容によって判断が変わります。',
  },
  {
    question: '税金の観点で、レイバーハイヤーと建設業の違いは何ですか？',
    answer: '控除の基本的な判断基準は同じですが、具体的に何を経費にできるかは異なります。建設現場の仕事では通常White Cardと、安全靴や高視認性の作業着といった現場標準のPPE（保護具）が必要です。一方、一般的なレイバーハイヤーは倉庫作業、引っ越し、造園、イベント、製造ラインなど、はるかに幅広い現場をカバーしており、必要な装備は実際に派遣された仕事の内容によって決まります。仕事が実際に建設現場でない限り、White Cardは通常必要ありません。派遣先が建設現場に特化している場合は、建設業ページで詳しく解説しています。',
  },
  {
    question: '倉庫作業にはフォークリフト免許が必要ですか？また、その費用は経費にできますか？',
    answer: 'すべての倉庫作業に必要というわけではありませんが、多くの現場で求められます。すでにフォークリフト免許や同様の操作資格を持っていて、その仕事のために使用している場合、更新費用は控除の対象になります。初めて免許を取得する費用は、通常控除できません。これは、すでに就いている仕事にかかる費用ではなく、そもそもその仕事に応募する資格を得るための費用だからです。',
  },
  {
    question: 'レイバーハイヤーのさまざまな仕事で、どのような保護装備を経費にできますか？',
    answer: '安全靴（先芯入り）、手袋、高視認性の作業着、保護メガネは、実際に派遣された仕事でそれらの着用が求められる場合、通常は控除の対象になります。判断基準は、その用品がその仕事における具体的な負傷リスクからあなたを守るものかどうかだからです。普通の作業ズボンやTシャツのような普段着は、仕事でどれだけ汚れたり傷んだりしても、どれだけ肉体的にきつい仕事であっても、ATOのルール上、控除の対象にはなりません。また、エージェンシーから払い戻しを受けたり、装備自体を支給されたりした場合は、自分のタックスリターンで再度請求することはできません。',
  },
  {
    question: 'エージェンシー経由で数回のカジュアルシフトしか働いていません。それでも控除を申請する価値はありますか？',
    answer: '多くの場合、価値があります。実際に自分でお金を支払い、払い戻しを受けていないことが条件です。シフトが数回であっても、ブーツ、手袋、資格の更新費用、現場間の移動費など、実際にかかった費用はあり、それらはすべて納税額の計算上、税負担を減らします。条件はシフト数にかかわらず同じです。仕事に関連していること、払い戻しを受けていないこと、そして記録を示せることです。',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: '経費', item: `${SITE_URL}/ja/expenses` },
    { '@type': 'ListItem', position: 3, name: 'レイバーハイヤー・倉庫作業', item: `${SITE_URL}/ja/expenses/labouring` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'レイバーハイヤー・倉庫作業の税金控除ガイド：オーストラリア',
  description: 'レイバーハイヤーやスタッフィングエージェンシーを通じて働くバックパッカーが確定申告で経費にできるものと、複数のエージェンシーに登録した場合に変わることを解説。',
  url: `${SITE_URL}/ja/expenses/labouring`,
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

export default function LabouringExpensesPageJA() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>レイバーハイヤー・倉庫作業</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '27ch' }}>
                レイバーハイヤー・倉庫作業で働く人が<span style={{ color: '#0B5240' }}>経費にできるもの</span>とは？
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '58ch' }}>
                倉庫作業、引っ越し、造園、工場でのライン作業、イベントの設営・撤去まで、レイバーハイヤー（人材派遣）会社やスタッフィングエージェンシーがバックパッカーを派遣する仕事はさまざまです。ここでは何を経費にできるか、そして複数のエージェンシーに登録した場合に税金がどう扱われるかを解説します。
              </p>
            </div>
          </div>
        </section>

        {/* ── MULTIPLE AGENCIES, MULTIPLE WORKSITES (unique hook) ─────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                複数のエージェンシー、複数の現場
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                レイバーハイヤーが通常の一つの仕事と本質的に違う点と、それが実際の税金にどう影響するかを解説します。
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '18px', letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3 }}>
                仕事の内容が同じでも、エージェンシーごとに別の雇用主として扱われます
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                レイバーハイヤー会社やスタッフィングエージェンシーに登録すると、TFN Declaration（タックスファイルナンバー宣言書）はそのエージェンシー（派遣元）に対して提出するのであって、実際の派遣先企業に対してではありません。法律上、雇用主はあくまでエージェンシーであり、倉庫、引っ越し会社、イベント会場といった派遣先企業は、その日エージェンシーから送り込まれて働く場所にすぎません。シフトを埋めるために2社目、3社目のエージェンシーにも登録すると、それぞれが別々のTFN Declarationと別々のPAYG源泉徴収の関係になります。感覚としては一つの仕事がずっと続いているように感じられても、税務上はそうではありません。
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '22px' }}>
                どのTFN Declarationにも、tax-free threshold（非課税枠）を適用するかどうかを尋ねる項目があり、通常のルールでは、これを同時に適用できるのは1つの支払者に対してのみです。ほとんどのワーキングホリデーメーカーにとって、この点は、2つの仕事を掛け持ちするオーストラリア居住者ほど重要ではありません。417・462ビザ保持者の給与は通常、居住者向けの非課税枠ではなく、ワーキングホリデーメーカー税率（$45,000までは一律15%）で課税されるため、この回答によってどのエージェンシーの源泉徴収額が変わることも通常はありません。2つ、3つのエージェンシーが同時に動いている場合に本当に重要なのは、もっと基本的なことです。それぞれが所得明細書（Income Statement）に正しく反映されていること、それぞれがワーキングホリデーメーカーとして正しい税率で源泉徴収していること、そしてタックスリターン作成時に何も見落とされないことです。TFN Declarationと源泉徴収税率の実際の仕組みについては、<Link href="/ja/tfn" style={{ color: '#0B5240', textDecoration: 'underline' }}>TFNページ</Link>をご覧ください。
              </p>

              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '18px', letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3 }}>
                派遣先間の移動は経費になることがあります、通常の通勤は対象外です
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                ATOの一般的なルールでは、自宅から決まった一つの職場までの移動は通常の通勤とみなされ、どれだけ距離が長くても控除の対象にはなりません。しかし、レイバーハイヤーの仕事はこのパターンに当てはまらないことがよくあります。エージェンシーが午前中はある現場、午後は別の現場へ派遣する場合や、決まった拠点がなく、週の中で倉庫から倉庫へ、イベントからイベントへ、クライアントからクライアントへと本当に転々と現場が変わる場合は、その現場間の移動、つまり自宅からの最初の移動を除いた部分は、通常控除の対象になります。
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                働き方が本当に「転々とする（itinerant）」パターンに近いほど、より多くの移動を経費として請求できる根拠が強くなります。現場がどれくらいの頻度で変わるか、戻ってくる主な拠点があるかどうか、仕事が実際にどう組まれているか、これらすべてが判断材料になるため、自動的に認められるものではなく、実際のシフト表の内容次第で変わります。日付、現場、移動距離を簡単にメモしておくとよいでしょう。車両費自体は1kmあたりの定額法かログブック法で計算します。その仕組みについては<Link href="/ja/expenses" style={{ color: '#0B5240', textDecoration: 'underline' }}>経費ガイド</Link>をご覧ください。
              </p>
            </div>

            <div className="taxres-savings-box" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto' }}>
              <div>
                <p className="taxres-savings-heading">複数のエージェンシーに登録するなら身につけたい習慣</p>
                <p className="taxres-savings-body">
                  どのエージェンシーで、どの現場で、いつ働いたかを簡単にメモしておき、自己負担した装備品、資格の更新費用、移動費のレシートも保管しておきましょう。エージェンシーが1社だけならほとんど気にする必要はありません。しかし同じ会計年度に2社、3社と並行して登録している場合、これが所得明細書の見落としや、あとからタックスリターンを訂正する事態を防いでくれます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU CAN / CAN'T CLAIM ───────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                経費にできるもの・できないもの
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                このサイトで紹介しているすべての肉体労働に共通するルールを、倉庫作業、引っ越し、造園、工場のライン作業、イベントの仕事に当てはめて解説します。
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '24px' }}>
                このページのすべての控除に共通するのは、次の3つのテストです。自分で支払い、払い戻しを受けていないこと。実際に行っていた仕事に直接関係していること。そして、その記録を示せることです。（この3つのテストについては<Link href="/ja/expenses" style={{ color: '#0B5240', textDecoration: 'underline' }}>経費ガイド</Link>で詳しく解説しています。レイバーハイヤーに限らず、すべての職種に共通するルールです。）倉庫作業、引っ越し、造園、工場、イベントの仕事に当てはめると、実際に認められやすいもの・認められにくいものは次のとおりです。
              </p>

              <p className="exp-card-label exp-card-label-yes" style={{ marginBottom: '12px' }}>✓ 通常、控除できるもの</p>
              {CAN_CLAIM.map((item, i) => (
                <div key={i} style={{ marginBottom: '18px' }}>
                  <h3 className="font-serif font-bold text-ink" style={{ fontSize: '16.5px', letterSpacing: '-0.01em', marginBottom: '6px', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                    {item.body}
                  </p>
                </div>
              ))}

              <p className="exp-card-label exp-card-label-no" style={{ marginTop: '8px', marginBottom: '12px' }}>✕ 通常、控除できないもの</p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '22px' }}>
                {CANNOT_CLAIM_TEXT}
              </p>

              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                もし派遣先が一般的なレイバーハイヤーではなく、建設現場や工事現場に特化している場合は、<Link href="/ja/expenses/construction" style={{ color: '#0B5240', textDecoration: 'underline' }}>建設業ページ</Link>でWhite Cardの費用や現場特有のPPE（保護具）について詳しく解説しています。
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">よくあるご質問</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  レイバーハイヤーの税金に関するご質問
                </h2>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  エージェンシーの登録状況がタックスリターンにどう影響するか、まだ不安な方は、お気軽に直接メッセージをお送りください。
                </p>
              </div>
              <div className="max-w-[700px]">
                <Accordion items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED PAGES ────────────────────────────────────────────────── */}
        <RelatedServices label="関連サービス" items={[
          { label: 'すべての職業を見る', desc: '職業別に、バックパッカーが何を経費にできるかを解説', href: '/ja/expenses' },
          { label: 'TFNを申請する', desc: 'TFN Declarationと源泉徴収税率の仕組みを解説', href: '/ja/tfn' },
          { label: 'タックスリターンを提出する', desc: '海外からでも、申告書の作成から提出まで代行', href: '/ja/tax-return' },
          { label: '建設現場で働いていますか？', desc: 'White Cardの費用と建設現場特有の装備を解説', href: '/ja/expenses/construction' },
        ]} />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              これは一般的な情報であり、個別の税務アドバイスではありません。登録しているレイバーハイヤー会社、派遣先の組まれ方、そして実際にどれだけ現場を転々としているかによって、経費にできるものは変わります。そのため、このページの例はあくまで出発点としてご参考にしていただき、最終的な答えとして受け取らないようにしてください。当社にご依頼いただいた場合、タックスリターンはワーホリ専門のチームによって作成され、実際に登録されているレイバーハイヤー会社、現場、レシートを確認したうえで、請求できるものはすべて、請求できないものは含めないようにいたします。
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
