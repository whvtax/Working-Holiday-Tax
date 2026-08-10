import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: '農場労働・フルーツピッキングの税金控除ガイド｜オーストラリア',
  description: 'ワーキングホリデーメーカーが農場労働・フルーツピッキングの仕事で経費計上できるもの、日焼け対策やブーツ、現場間の移動費などを解説。季節労働・出来高制・複数雇用主の給与が確定申告でどう扱われるか、そして農場労働とビザの関係についても説明します。',
  keywords: [
    '農場労働 税金控除',
    'フルーツピッキング 税金',
    'ワーホリ 農場 タックス',
    'バックパッカー 農場 税金',
    '果物摘み 確定申告',
    '季節労働 税金 オーストラリア',
    'ピースレート 税金 オーストラリア',
    '複数雇用主 タックスリターン',
    'ワーキングホリデーメーカー 農場雇用主',
    '地方 就労 ビザ 税金',
    '417ビザ 農場労働',
    '462ビザ 農場労働',
    '収穫期 タックスリターン',
    '農場間 移動 車両費控除',
    '指定労働 税金 オーストラリア',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/expenses/farm-work`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/farm-work`,
      'de': `${SITE_URL}/de/expenses/farm-work`,
      'ja': `${SITE_URL}/ja/expenses/farm-work`,
      'x-default': `${SITE_URL}/expenses/farm-work`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/expenses/farm-work`,
    siteName: 'Working Holiday Tax',
    title: '農場労働・フルーツピッキングの税金控除ガイド｜オーストラリア',
    description: '日焼け対策やブーツ、現場間の移動費は控除の対象になりますが、普段着やその日最初の移動は対象外です。農場労働・フルーツピッキングがタックスリターンとビザにどう関わるかを解説します。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: '農場労働・フルーツピッキングの税金控除ガイド｜オーストラリア',
    description: 'バックパッカーが農場労働・フルーツピッキングで経費計上できるもの、そしてワーキングホリデービザとの関係を解説します。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WHY_DIFFERENT = [
  {
    t: '季節労働',
    d: '収穫期は年間を通してではなく、数週間単位で続きます。多くのピッカーは一つの仕事にとどまらず、季節を追って地域から地域へ、作物から作物へと移動します。',
  },
  {
    t: '転々とする働き方',
    d: '複数の区画やシェッド、農園をまたいで働くことが多く、同じ日に複数の場所で作業することも珍しくありません。「決まった一つの職場」と呼べる場所がないのが実情です。',
  },
  {
    t: '出来高制の給与',
    d: '給与は時給制ではなく、ビン、バケツ、トレイ、または摘んだキロ数単位で計算されることがよくあります。計算方法が違うだけで、れっきとした賃金であることに変わりはありません。',
  },
  {
    t: '複数の雇用主',
    d: '一つのシーズンの中で、複数の異なる農場、請負業者、レイバーハイヤー（人材派遣）会社で働くことも珍しくなく、税務上はそれぞれが別々の雇用主として扱われます。',
  },
]

const faqs = [
  {
    question: '今年3つの農場で働きました。タックスリターンは別々に提出する必要がありますか？',
    answer: 'いいえ、必要ありません。1回のタックスリターンで、その会計年度（7月1日〜翌年6月30日）全体をカバーします。その間に何軒の農場や雇用主で働いたかは関係ありません。それぞれの雇用主が給与と源泉徴収税を個別にATOへ報告し、タックスリターンではそれらすべてがまとめて1つの申告になります。短期の仕事をいくつも掛け持ちした場合の一番のリスクは、そのうちの一つ、特に1週間程度の短い仕事を申告し忘れてしまうことです。ワーホリ専門チームが、提出前にまさにこの点を確認しています。',
  },
  {
    question: '農場間を車で移動する際のガソリン代や車両費は経費にできますか？',
    answer: 'はい、できます。同じ勤務日のうちに2つの異なる農場や作業現場の間を移動する場合が対象です。農場労働は「決まった一つの職場」を持たない転々とした働き方として扱われることが多いためです。控除の対象にならないのは、その日最初の移動、つまり自宅から最初に向かう農場までの移動で、これはどんな仕事でも同じく通常の通勤とみなされます。控除額の計算には1kmあたりの定額法、またはログブック法を使います。詳しくは経費ページをご覧ください。',
  },
  {
    question: '出来高制の給与は税金の扱いが違いますか？',
    answer: 'いいえ、変わりません。ビン単位、バケツ単位、トレイ単位、あるいは時給制、どのように計算されていても、銀行口座に振り込まれた時点でそれは通常の賃金です。雇用主はその合計額をATOへ報告し、ワーキングホリデーメーカー税率のもとで源泉徴収を行い、タックスリターン提出時には他の給与と同じようにあなたの総所得に合算されます。',
  },
  {
    question: '農場労働はセカンド（またはサード）ワーキングホリデービザの条件に含まれますか？',
    answer: '多くのワーキングホリデーメーカーにとって、答えはイエスです。オーストラリアの地方地域で指定労働を完了することは、さらなる417・462ビザを申請するための主な方法の一つであり、農場労働はその指定労働として最もよく選ばれる仕事の一つです。ただし、具体的にどの仕事、どの地域、どの期間が対象になるかを定めているのは当社ではなく内務省（Department of Home Affairs）であり、これまでにルールが変更されたこともあります。特定の仕事が条件を満たすと決めてかかる前に、必ず最新の公式情報を確認するか、登録移民代理人にご相談ください。当社がサポートできるのは、その仕事で得た収入が正しく課税・申告されるようにする部分です。',
  },
  {
    question: '農場の雇用主がワーキングホリデーメーカー雇用主として登録されているかどうかは、どうすれば分かりますか？',
    answer: '働き始めるときに直接聞いてみてください。ごく自然な質問ですし、たいていの農場は聞かれ慣れています。登録済みの雇用主は、最初の1ドルから正しい15%のワーキングホリデーメーカー税率で源泉徴収を行います。一方、未登録の雇用主は、代わりに30%を超えるより高い外国居住者税率で源泉徴収することが法律で義務付けられています。いずれの場合も、多く引かれすぎた分はタックスリターンを提出すれば戻ってきますが、シーズン中に毎週手元に残る金額には実際の差が出ますので、新しい農場の雇用主には直接確認しておく価値があります。',
  },
  {
    question: '働いたすべての農場の給与明細（ペイスリップ）が手元にありません。問題になりますか？',
    answer: '通常は問題ありません。ほとんどの雇用主はSingle Touch Payrollを通じてATOに給与を報告しているため、給与明細を受け取っていなかったり保管していなくても、所得明細として記録に残っています。とはいえ、どの農場で、いつ、だいたいいくら支払われたかを簡単にメモしておくと役立ちます。特に短期の仕事をいくつも掛け持ちしたシーズンでは、後で金額を照合するための手がかりになります。',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: '経費', item: `${SITE_URL}/ja/expenses` },
    { '@type': 'ListItem', position: 3, name: '農場労働', item: `${SITE_URL}/ja/expenses/farm-work` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '農場労働・フルーツピッキングの税金控除ガイド｜オーストラリア',
  description: 'ワーキングホリデーメーカーが農場労働・フルーツピッキングの仕事で経費計上できるもの、季節労働・出来高制・複数雇用主の給与が確定申告でどう扱われるか、そして農場労働とさらなるワーキングホリデービザとの関係を解説する記事です。',
  url: `${SITE_URL}/ja/expenses/farm-work`,
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

export default function FarmWorkExpensesPageJA() {
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
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>農場労働</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '26ch' }}>
                農場労働の税金控除、そしてあなたの<span style={{ color: '#0B5240' }}>ビザ</span>とのつながり
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '54ch' }}>
                フルーツピッキングや農場労働には、他のバックパッカーの仕事ではあまり出てこない税金の疑問がつきものです。季節労働、出来高制の給与、1年間で複数の雇用主、そして多くのワーキングホリデーメーカーにとっては、ビザとの本当のつながりもあります。
              </p>
            </div>
          </div>
        </section>

        {/* ── WHY FARM WORK IS DIFFERENT ──────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                農場労働の税金の扱いが少し違う理由
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '56ch' }}>
                農場労働やフルーツピッキングに特有で、他のバックパッカーの仕事ではあまり出てこない4つのポイントです。
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {WHY_DIFFERENT.map((c, i) => (
                <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#F7FBF9', border: '1.5px solid #E2EFE9' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '8px' }}>{c.t}</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE VISA CONNECTION (unique hook for this page) ─────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <span className="section-label">ビザとのつながり</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 18px' }}>
              農場労働と、さらなるワーキングホリデービザ
            </h2>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              農場労働は、他のバックパッカーの仕事にはほとんどない特別なもの、つまりビザそのものとつながっています。オーストラリアの地方地域で指定労働を完了することは、417または462ビザのワーキングホリデーメーカーが、さらなるワーキングホリデービザを申請できるようになるための主な方法の一つです。そして、その指定労働の多くは、農場や果樹園、そして農業・園芸分野で行われています。これが、多くのワーキングホリデーメーカーが滞在中に一度は農場の仕事を経験する大きな理由です。
            </p>

            <div className="rounded-2xl" style={{ padding: '20px 22px', background: '#FDF0D5', border: '1.5px solid #F9D88A', borderLeft: '4px solid #E9A020', margin: '22px 0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                これは税務ではなく、移民に関する事項です。
              </p>
              <p className="font-light" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.75 }}>
                具体的にどの業種、どの郵便番号や地域、どの期間が指定労働として認められるか、そして何日必要かを定めているのは税法ではなく内務省（Department of Home Affairs）であり、これまでに何度もルールが変更されてきました。こうした移民関連の詳細を追跡することは、ワーホリ専門チームが行う当社の税務サービスの範囲には含まれません。特定の仕事がビザの条件を満たすと決めてかかる前に、
                <a href="https://immi.homeaffairs.gov.au/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#0B5240' }}>内務省（Department of Home Affairs）のウェブサイト</a>
                で最新の公式情報を確認するか、登録移民代理人にご相談ください。
              </p>
            </div>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              当社がサポートできるのは、その仕事の税務面です。ビザの条件として最終的に何が認められるとしても、そこから得た収入は正しく申告・課税される必要があります。どの農場で、いつ、いくら稼いだかを簡単に記録しておくことは、いずれにせよタックスリターンに役立ちますし、後でどの仕事をいつ行ったかを証明する必要が生じたときにも、そのまま便利な記録として使えることが多いです。
            </p>
          </div>
        </section>

        {/* ── SEASONAL, ITINERANT, PIECE-RATE: THE TAX DETAIL ─────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                季節労働、転々とする働き方、そしてビン単位の給与
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                これらはオーストラリアの税金の基本的な仕組みを変えるものではありませんが、正しく処理する難易度には影響します。
              </p>
            </div>

            <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
              農場が変わるたびに必要な、新しいTFN Declaration
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '24px' }}>
              新しく働く農場、請負業者、レイバーハイヤー会社はそれぞれ別の雇用主にあたり、雇用主が変わるたびに新しいTFN Declaration（タックスファイルナンバー宣言書）の提出が必要です。前の職場で一度提出したからといって、TFNが自動的に引き継がれるわけではありません。この宣言書では、ワーキングホリデーメーカーは居住区分で「working holiday maker」を選択し、免税枠（tax-free threshold）の質問には「いいえ」を選ぶ必要があります。この免税枠はオーストラリアの居住者向けの制度であり、その年に何人の雇用主で働いたとしても、ワーキングホリデーメーカー税率が適用される収入には一切適用されません。この書類を毎回よく確認せずに記入してしまい、免税枠の質問に「はい」と答えてしまったり、いつもの癖で居住区分を間違って選んでしまったりすることは、思わぬ税金の請求が届く実によくある原因です。1シーズンのうちに複数の農場でこの手続きを繰り返していると、そのミスはなおさら起こりやすくなります。毎回正しく宣言書を提出する方法については、<Link href="/ja/tfn" style={{ color: '#0B5240', textDecoration: 'underline' }}>TFNページ</Link>をご覧ください。
            </p>

            <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
              出来高制の給与も、あくまで賃金
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '24px' }}>
              時給制ではなく、ビン単位、バケツ単位、トレイ単位、キロ単位で給与が計算されても、税金の扱いが変わることはありません。合計金額がいくらであっても、雇用主はそれをATO（オーストラリア税務署）へ報告し、時給制の給与と同じようにワーキングホリデーメーカー税率のもとで源泉徴収を行い、タックスリターン提出時には他の給与と同様にあなたの所得に合算されます。出来高制の仕事で実際に変わってくるのは、記録管理の面です。日によって給与額が変わり、シーズン中に複数の農場を移動することも多いため、どの農場で、いつ、だいたいいくら支払われたかを自分でも簡単にメモしておくと、後で所得明細と照らし合わせる際に役立ちます。
            </p>

            <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
              その農場が登録済みのワーキングホリデーメーカー雇用主か確認する
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '8px' }}>
              雇用主がATOにワーキングホリデーメーカーの雇用主として登録されているかどうかによって、シーズン中に給与から引かれる税額が変わってきます。登録済みの雇用主は、最初の1ドルから正しい15%のワーキングホリデーメーカー税率で源泉徴収を行います。未登録の雇用主は、代わりに30%を超えるより高い外国居住者税率を適用することが義務付けられています。いずれの場合も、多く引かれすぎた分はタックスリターンを提出すれば戻ってくるため、最終的に損をし続けるわけではありませんが、毎週実際に手元に残る金額には確かな差が出ます。新しい農場で働き始めるたびに、直接確認しておく価値があります。
            </p>

            <div className="taxres-savings-box" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div>
                <p className="taxres-savings-heading">作業の合間に、簡単な記録をつけておく</p>
                <p className="taxres-savings-body">
                  農場名、働いた日付、そしてだいたいの支払額をその都度メモしておくだけで、更新には1分もかかりませんが、後々の手間を大きく省いてくれます。所得明細の金額が合っているか確認するときも、届かなかった給与明細を探すときも、確定申告の時期になってどの農場で働いたか思い出そうとするときも、この記録が役立ちます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU CAN / CANNOT CLAIM ──────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                経費にできるもの、できないもの
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                ここでもATOの2つの基準はどんな職業でも共通です。自分自身で支払い、雇用主から払い戻しを受けていないこと。そして、どのみち買っていたであろう私的な支出ではなく、収入を得ることに本当に関係していることです。
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6" style={{ marginBottom: '20px', alignItems: 'stretch' }}>

              <div className="exp-card">
                <p className="exp-card-label exp-card-label-yes">✓ 控除できる可能性があるもの</p>

                <div style={{ marginBottom: '18px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>日焼け対策</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    収穫や剪定、あるいは屋根のないシェッドでの梱包作業など、1日の全部または一部を屋外で過ごす仕事であれば、つばの広い帽子、日焼け止め、サングラスが控除の対象になります。ATOがこれらを認めているのは、その仕事が継続的で直接的な紫外線を浴びる環境を生み出しているからであり、休日に使う日焼け止めを買うのとは事情が異なります。
                  </p>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>保護用手袋・ブーツ</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    とげ、薬品、泥、農産物の取り扱い、足場の悪い地面など、その仕事特有の危険から身を守るための摘み取り用手袋、ゴム長靴、その他の保護用ブーツは、仕事上必要な保護具として控除の対象になります。
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>農場・現場間の移動</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    同じ勤務日のうちに異なる区画やシェッド、農園の間を移動することは控除の対象になります。農場労働は転々とした働き方であることが多く、「決まった一つの職場」と呼べる場所がほとんどないためです。この控除額は1kmあたりの定額法、またはログブック法で計算します。それぞれの仕組みについては<Link href="/ja/expenses" style={{ color: '#0B5240', textDecoration: 'underline' }}>経費ガイド</Link>をご覧ください。
                  </p>
                </div>
              </div>

              <div className="exp-card">
                <p className="exp-card-label exp-card-label-no">✕ 通常、控除できないもの</p>

                <div style={{ marginBottom: '18px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>普段着</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    ジーンズ、Tシャツ、朝の寒さ対策のセーターなど、普段着は一日中フルーツピッキングや農産物の取り扱いで破れたり、汚れたり、傷んだりしても、控除の対象には一切なりません。ATOは普段着の通常の摩耗や劣化を、他のどんな仕事とも同様に私的な支出として扱います。ただ服が汚れるという理由だけで、農場労働に特別な例外が認められることはありません。
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>その日最初の移動</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    毎日、自宅からその日最初に向かう農場や現場までの移動は、どれだけ距離があっても、どれだけ早い時間に出発しても、通常の通勤とみなされます。これは農場労働に限らず、どんな仕事でも同じです。控除の対象になるのは、すでに仕事に出た後の現場間の移動だけであり、そこにたどり着くまでの最初の移動が対象になることはありません。
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── WHAT'S NEXT (internal links) ─────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <span className="section-label center">次のステップ</span>
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
              何を控除できるか分かったら
            </h2>
            <p className="font-light text-muted max-w-[640px] mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '20px' }}>
              多くの農場労働者・季節労働者が次に確認する内容はこちらです。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[900px] mx-auto">
              <Link href="/ja/expenses" className="block rounded-xl border border-ink/10 p-4 text-[13.5px] font-light text-ink leading-[1.5] transition-colors hover:border-forest-500 hover:text-forest-500">
                他のバックパッカーの仕事の経費控除も確認する
              </Link>
              <Link href="/ja/tfn" className="block rounded-xl border border-ink/10 p-4 text-[13.5px] font-light text-ink leading-[1.5] transition-colors hover:border-forest-500 hover:text-forest-500">
                新しい農場の仕事に備えてTFNを取得する
              </Link>
              <Link href="/ja/tax-return" className="block rounded-xl border border-ink/10 p-4 text-[13.5px] font-light text-ink leading-[1.5] transition-colors hover:border-forest-500 hover:text-forest-500">
                シーズン全体を1回のタックスリターンにまとめる
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">よくあるご質問</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  農場労働の税金に関するご質問
                </h2>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  その他にご不明な点があれば、お気軽にお問い合わせください。
                </p>
              </div>
              <div className="max-w-[700px]">
                <Accordion items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ── DISCLAIMER ───────────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '8px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7 }}>
              これは一般的な情報であり、個別の税務アドバイスではありません。また、移民や渡航に関するアドバイスでもありません。農場でのシーズンは、どの雇用主で働くか、どの地域か、ビザとの関わり方まで、一人ひとり少しずつ異なります。当社にご依頼いただいた場合、タックスリターンはワーホリ専門のチームによって作成され、お客様の具体的な雇用主や状況を確認したうえで、請求できるものはすべて、請求できないものは含めないようにいたします。
            </p>
          </div>
        </section>

        {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
        <NextStep
          eyebrow="準備ができたらいつでも"
          heading="すべての農場、すべての給与明細を1回の申告にまとめて"
          body="長い収穫期を1件だけ経験した場合でも、3つの州にまたがる5つの短期の仕事を掛け持ちした場合でも、すべての雇用主の所得明細をまとめ、源泉徴収額もあわせて確認します。"
          cta="タックスリターンを始める →"
          href="/ja/tax-form"
        />

      </main>
      <MobileCta href="/ja/tax-form" lang="ja" />
    </>
  )
}
