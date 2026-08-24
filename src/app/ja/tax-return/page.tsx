import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/HomeWa'

// ─── METADATA ───────────────────────────────────────────────────────────
// このページが答えるのは「依頼したら何が起きるか」です。「自分でやらない
// 理由」はトップページが扱うので、ヒーロー、3つの数字、myGovとの比較は
// ここでは繰り返しません。料金は記載せず、当社自身が登録税理士であるとも
// 書きません。
export const metadata: Metadata = {
  // ルートレイアウトが " | Working Holiday Tax" を付与するため、
  // タイトルはモバイルの検索結果に収まる長さにしています。
  title: 'タックスリターン代行｜417・462ビザ',
  description:
    'パスポートとオーストラリアの銀行口座だけ。給与明細は不要です。ATOの記録から作成し、還付金は約14営業日で届きます。',
  keywords: [
    'タックスリターン 代行 オーストラリア',
    'オーストラリア タックスリターン 申請',
    'ワーホリ タックスリターン 代行',
    'ワーホリ 帰国後 タックスリターン',
    'オーストラリア タックスリターン 日本から',
    '417ビザ タックスリターン 提出',
    '462ビザ タックスリターン 提出',
    'オーストラリア 還付金 いつ 入金',
    'タックスリターン 給与明細 なくした',
    'インカムステートメント ATO 取得',
    'オーストラリア 過去の年度 タックスリターン',
    'タックスリターン オーストラリア 日本語',
    'タックスリターン 流れ オーストラリア',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/tax-return`,
    languages: {
      'en-AU': `${SITE_URL}/tax-return`,
      de: `${SITE_URL}/de/tax-return`,
      ja: `${SITE_URL}/ja/tax-return`,
      'x-default': `${SITE_URL}/tax-return`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'ワーキングホリデーのタックスリターン代行' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/tax-return`,
    siteName: 'Working Holiday Tax',
    title: 'タックスリターン代行の流れ｜417・462ビザ',
    description:
      'パスポートと銀行口座だけ。ATOの記録を確認して申告書を作成し、あなたが署名したうえで提出します。還付金は提出から約14営業日で届きます。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'タックスリターン代行の流れ｜417・462ビザ',
    description: 'パスポートと口座だけ。給与明細は不要。提出から約14営業日で還付金が届きます。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── ICONS ──────────────────────────────────────────────────────────────
const IconWhatsApp = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.3-.9-2.8-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2 .9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
  </svg>
)

// ─── COPY ───────────────────────────────────────────────────────────────

/** ご用意いただくもの。3つだけで、それ以上はありません。 */
const NEEDED = [
  {
    label: 'パスポートとビザの情報',
    body: 'どの国のパスポートで、どのサブクラスだったか。ここからすべてが決まるので、最初に伺います。',
  },
  {
    label: 'オーストラリアの銀行口座',
    body: '還付金はオーストラリアの口座にのみ支払われます。解約済みの場合は最初に教えてください。',
  },
  {
    label: 'いつどこで働いたかのおおよそ',
    body: '町の名前、仕事の種類、だいたいの月。ATOの記録と突き合わせ、足りない部分は当社が埋めます。',
  },
]

/** 実際に進む順序。待ち時間もそのまま書いています。 */
const SEQUENCE = [
  {
    n: '01',
    title: 'ご相談',
    body: 'WhatsAppで、説明しやすい言語で書いてください。その言語のままお返事します。1年の様子をざっと教えていただければ、いまどういう状況かをお伝えします。作業を始める前に料金も確定します。営業時間内であれば、おおむね1時間以内に返信しています。',
  },
  {
    n: '02',
    title: '質問票、10分ほど',
    body: 'パスポートとビザの情報、銀行口座、働いた町と仕事の種類。あなたが記入する書類はこれだけで、記入は1回きりです。その年に当てはまらない項目は空欄のままで構いません。必要ならこちらから確認します。',
  },
  {
    n: '03',
    title: 'ATOの記録を開きます',
    body: 'あなたを報告したすべての雇用主、すべてのインカムステートメント、源泉徴収された金額、そして未提出のまま残っている過去の年度。忘れていた仕事や最高税率で引かれていた期間は、記憶の中ではなく、ほぼ必ずここで見つかります。',
  },
  {
    n: '04',
    title: '金額を動かす判断',
    body: 'その年の居住区分、TFNが雇用主に届く前の期間、メディケア税がそもそもあなたのものだったのか、そしてあなたの仕事で何が控除できるのか。ここが時間のかかる部分であり、費用をいただいているのもこの部分です。',
  },
  {
    n: '05',
    title: '内容を確認して署名',
    body: 'できあがった申告書を、数字ごとに普通の言葉で説明したうえでお送りします。読んで署名いただくまで、ATOには何も送りません。署名は電子的に行うので、地球の反対側からスマートフォンだけでも完結します。',
  },
  {
    n: '06',
    title: '提出',
    body: '当社のチームが作成し、登録税理士が確認・承認したうえでATOに提出します。提出そのものは数分で終わり、そのときにあなたが起きている必要はありません。',
  },
  {
    n: '07',
    title: 'ATOから入金',
    body: '還付金は提出からおおむね14営業日で、ご指定のオーストラリアの口座に入金されます。先にATOから確認が入った場合は当社が対応し、何を聞かれたのかもお伝えします。どちらの場合も必ずご連絡します。',
  },
]

/** 進める順番が変わる2つのルール。だから手順01より前に置いています。 */
const RULES = [
  {
    label: '還付金はオーストラリアの口座にしか入りません',
    body: 'スーパーアニュエーション（DASP）は海外の口座でも受け取れますが、タックスリターンの還付金は受け取れません。オーストラリアの口座を解約する予定なら、還付金が入るまで待つか、事前に教えてください。',
  },
  {
    label: '過去の年度もまだ請求できます',
    body: '提出しないままの年度が、黙って消えるわけではありません。年度ごとに別の申告であり、別の還付です。古い年度から順に進めるので、途中で止まったままの年度は残りません。',
  },
]

const FAQS = [
  {
    question: 'タックスリターンはどれくらい時間がかかりますか。',
    answer:
      '質問票をいただいた日から、複雑でない1年であれば作成と確認に数日です。提出後は、ATOがおおむね14営業日で還付金を支払います。雇用主が5社ある年、ABNで請求した収入がある年、居住区分を根拠づける必要がある年は、当社側の作業が長くなります。どれに当たるのかは、想像させずにこちらからお伝えします。',
  },
  {
    question: '給与明細は必要ですか。',
    answer:
      '必要ありません。ここがいちばん驚かれる点です。給与として支払った雇用主は、インカムステートメントをATOに報告しており、申告書はその記録から組み立てます。明細をなくした、仕事の名前を思い出せない、その会社がもう存在しない。どれもよくある出発点です。',
  },
  {
    question: '自分がやることは何ですか。',
    answer:
      '3つです。質問票に1回答えること、お送りする申告書を読むこと、そして署名すること。あなたの側はこれで全部です。政府のアカウントを作る必要も、オーストラリアの本人確認を通す必要も、ATOの書式を読み解く必要もありません。提出は当社を通して行うためです。',
  },
  {
    question: '帰国後でも依頼できますか。',
    answer:
      'はい。当社が提出する申告のかなりの部分は、すでに日本に戻られた方のものです。質問票も署名も提出もすべてオンラインで完結します。唯一持ち帰れないのが還付金そのもので、ATOはオーストラリアの銀行口座にしか支払えません。スーパーアニュエーション（DASP）は海外の口座で受け取れます。オーストラリアの口座をすでに解約している場合は、最初のメッセージで教えてください。',
  },
  {
    question: '過去の年度を提出していない場合はどうなりますか。',
    answer:
      'いまからでも提出できます。年度ごとに独立した申告であり、独立した還付です。どの年度が未提出かはATOの記録で確認できます。古い年度から順に進めます。遅れて出すこと自体はATOにとって問題ではなく、ワーキングホリデーの年度であれば、最終的に受け取る側になることがほとんどです。',
  },
  {
    question: '還付ではなく納税になった場合はどうなりますか。',
    answer:
      'まれにあります。多いのは、ABNで請求した収入があり、その分が源泉徴収されていなかった場合です。提出前にその金額をお見せし、どこから生じたのか、ATOにどんな支払い方法があるのかもあわせて説明します。あなたの署名なしに提出することはないので、後から知らされるという事態は起きません。',
  },
]

const GUIDES = [
  {
    href: '/ja/blog/how-to-lodge-tax-return-from-overseas',
    title: '帰国後の申告',
    desc: '日本からでもできること、そして見落とされがちな口座のルール。',
  },
  {
    href: '/ja/blog/tax-residency-working-holiday-makers',
    title: '税務上の居住者かどうか',
    desc: '手順04の判断を、そのまま詳しく書いたものです。',
  },
  {
    href: '/ja/blog/tax-deductions-working-holiday-makers',
    title: '何が控除できるのか',
    desc: '一般論ではなく、仕事の種類ごとの控除です。',
  },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'ja' })

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
const BODY: CSSProperties = { fontSize: '15px', lineHeight: 1.85 }
const LEDE: CSSProperties = { fontSize: '16.5px', lineHeight: 1.9 }

export default function TaxReturnPageJA() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/ja/tax-return#webpage`,
    url: `${SITE_URL}/ja/tax-return`,
    name: 'タックスリターン代行の流れ（417・462ビザ）',
    description:
      '417・462ビザのタックスリターンを提出するまでの流れ。ご用意いただくもの、当社が確認すること、署名の仕方、そして還付金が届く時期。',
    inLanguage: 'ja',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/ja/tax-return#service`,
    name: 'ワーキングホリデー向けタックスリターン代行',
    serviceType: 'タックスリターンの作成と提出',
    description:
      '417・462ビザ保持者のオーストラリアのタックスリターン。当社のチームが作成し、登録税理士が確認・承認したうえでATOに提出します。帰国後の日本からのご依頼にも対応します。',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'オーストラリア' },
    audience: { '@type': 'Audience', audienceType: 'ワーキングホリデーメーカー（サブクラス417・462）' },
    availableLanguage: ['ja', 'en', 'de'],
    inLanguage: 'ja',
  }

  // 7つの手順を機械可読で。これはこのページ固有のスキーマです。
  // トップページはHowToを名乗りません。
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}/ja/tax-return#howto`,
    name: 'ワーキングホリデーのタックスリターンを提出するまでの流れ',
    description:
      '417・462ビザのタックスリターンを作成し提出するまでの順序。最初のメッセージから還付金の入金まで。',
    inLanguage: 'ja',
    totalTime: 'P14D',
    step: SEQUENCE.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ja',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
      { '@type': 'ListItem', position: 2, name: 'タックスリターン', item: `${SITE_URL}/ja/tax-return` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F2FAF7 100%)' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 pt-8 pb-11 lg:pt-12 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2" style={{ fontSize: '13px', color: '#4C6459', marginBottom: '10px' }}>
            <Link href="/ja" className="inline-flex items-center transition-colors hover:text-forest-500" style={{ minHeight: '44px' }}>ホーム</Link>
            <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
            <span aria-current="page">タックスリターン</span>
          </nav>

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '14px' }}>
            ワーキングホリデービザ 417・462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(26px, 4.4vw, 38px)', lineHeight: 1.36, letterSpacing: '-0.01em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>パスポートと銀行口座だけ。</span>
            <span style={{ display: 'block', color: '#0B5240' }}>あとは当社が進めます。</span>
          </h1>

          <p className="hero-lede hero-animate-delay" style={{ ...LEDE, color: '#4C6459', maxWidth: '40ch', marginBottom: '26px' }}>
            給与明細も、myGovのアカウントも、読み解く書式もありません。質問票に1回答えて、1回署名するだけです。還付金は提出から約14営業日で届きます。
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_TR} position="hero" topic="tax-return" lang="ja"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{ height: '54px', padding: '0 30px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '330px', width: '100%' }}>
              <IconWhatsApp />
              WhatsAppで相談する
            </WaLink>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              約1時間で返信します。
            </p>
          </div>

          <div className="flex" style={{ marginTop: '20px' }}>
            <GoogleRating variant="pill" lang="ja" />
          </div>
        </div>
      </section>

      {/* ── 2. ご用意いただくもの ────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>あなたの側</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', maxWidth: '24ch', marginBottom: '12px' }}>
            ご用意いただくもの
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '44ch', marginBottom: '30px' }}>
            3つだけで、これが全部です。書類一式を揃えなければと構えて来られる方が多いのですが、手続きを止めていたのは書類ではありません。
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {NEEDED.map((item) => (
              <div key={item.label} style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15.5px', lineHeight: 1.6, marginBottom: '8px' }}>{item.label}</h3>
                <p style={{ ...BODY, color: '#2A3C34' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[14px]" style={{ marginTop: '26px', padding: '20px 22px', background: '#F2FAF7', border: '1px solid #CDE3DB' }}>
            <p className="font-serif" style={{ fontSize: '18px', lineHeight: 1.75, color: '#0B5240', fontWeight: 700, marginBottom: '10px', maxWidth: '28ch' }}>
              給与明細は必要ありません。
            </p>
            <p style={{ ...BODY, color: '#2A3C34', maxWidth: '46ch' }}>
              給与として支払った雇用主は、あなたのTFNに紐づくインカムステートメントをすでにATOへ報告しています。申告書はそこから組み立てます。ATOを通して、当社にはすべて見えています。書類の山も、なくした携帯も、名前をきちんと覚えていないホステルの仕事も、何ひとつ手続きを止めません。探す価値があるのは仕事に関する支出の領収書だけで、それも無い場合は、どんな仕事だったかを教えていただければ、領収書なしで何が控除できるかをお伝えします。
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. 進む順序 ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>最初から最後まで</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
            どんな順序で進むのか
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '44ch', marginBottom: '30px' }}>
            手順は7つ。あなたが登場するのは、最初と、署名のときの2回だけです。その間はこちらの仕事なので、進んでいる間は普段どおりの生活で構いません。
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {SEQUENCE.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-serif font-black flex-shrink-0"
                  style={{ fontSize: '15px', color: '#16775C', width: '28px', paddingTop: '4px' }}
                  aria-hidden="true">{s.n}</span>
                <div>
                  <h3 className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '6px' }}>{s.title}</h3>
                  <p style={{ ...BODY, color: '#2A3C34' }}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p style={{ ...BODY, color: '#4C6459', marginTop: '24px', maxWidth: '44ch' }}>
            収入の一部を給与ではなく請求で受け取っていた場合は{' '}
            <Link href="/ja/abn" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>ABNで何が変わるか</Link>
            もご覧ください。
          </p>
        </div>
      </section>

      {/* ── 4. 先に知っておく2つのルール ─────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', maxWidth: '26ch', marginBottom: '14px' }}>
            2つのルールが、進める順番を変えます
          </h2>
          <p style={{ ...LEDE, color: '#4C6459', maxWidth: '42ch', marginBottom: '26px' }}>
            どちらも途中で気づくより、最初に片づけたほうが簡単です。
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {RULES.map((r) => (
              <div key={r.label} className="rounded-[14px]" style={{ padding: '20px 22px', border: '1px solid #E2EFE9', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(7,58,45,.06)' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15.5px', lineHeight: 1.6, marginBottom: '8px' }}>{r.label}</h3>
                <p style={{ ...BODY, color: '#2A3C34' }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. 保証 ──────────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-14" style={{ background: '#0B5240' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 text-center reveal">
          <p style={{ ...KICKER, color: '#F9D88A', marginBottom: '14px' }}>当社の保証</p>
          <p className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(21px, 2.8vw, 28px)', lineHeight: 1.6, letterSpacing: '-0.01em', maxWidth: '24ch' }}>
            還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。
          </p>
          <p className="mx-auto" style={{ ...BODY, color: 'rgba(255,255,255,0.72)', maxWidth: '40ch', marginTop: '16px' }}>
            ATOから届く金額から差し引くことは一切ありません。金額は手順01の前にWhatsAppで確定するので、質問票が届く時点で交渉の余地は残っていません。
          </p>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', maxWidth: '26ch', marginBottom: '14px' }}>
            フォームではなく、メッセージから始めてください
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '42ch', marginBottom: '24px' }}>
            働いた町、だいたいの月、そしてABNで請求したことがあるかどうか。それだけで、どの年度が未提出なのか、あなたの側の作業がどれくらいかをお伝えできます。2年前に帰国された方でも変わりません。
          </p>
          <WaLink href={WA_TR} position="section" topic="tax-return" lang="ja"
            className="btn-primary inline-flex items-center justify-center gap-2"
            style={{ height: '54px', padding: '0 30px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '330px', width: '100%' }}>
            <IconWhatsApp />
            WhatsAppで相談する
          </WaLink>
          <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
            約1時間で返信します。
          </p>
        </div>
      </section>

      {/* ── 7. 信頼 ──────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
            ワーキングホリデーの税金だけを扱っています。
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '44ch', marginBottom: '28px' }}>
            質問票も、確認する項目も、上の順序も、たった1種類のビザの1年のために組み立てたものです。だからあなたにお願いすることが少なく、面倒な事例も当社にとっては想定内です。
          </p>

          <GoogleReviews lang="ja" />

          <div className="rounded-[12px] flex gap-3" style={{ marginTop: '28px', padding: '16px 18px', background: '#FDF0D5', border: '1px solid #F9D88A' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M12 2L2 22h20L12 2z" stroke="#B8770C" strokeWidth="1.8" strokeLinejoin="round" />
              <line x1="12" y1="10" x2="12" y2="15" stroke="#B8770C" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="18" x2="12.01" y2="18" stroke="#B8770C" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p style={{ ...BODY, color: '#2A3C34' }}>
              <strong style={{ color: '#080F0D' }}>まともな相手であれば、myGovのパスワードを尋ねることはありません。</strong>
              当社はどの手順でも尋ねません。上の流れに必要ないからです。それを尋ねてくるメッセージは、当社からのものではありません。
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. よくある質問 ──────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '20px' }}>
            依頼する前によく聞かれること
          </h2>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="tax-return-faq-ja" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer" style={{ fontSize: '15px', lineHeight: 1.85 }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. ガイド ────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">
          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>ガイド</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(21px, 2.4vw, 28px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
            難しい手順の詳しい版
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '44ch', marginBottom: '24px' }}>
            何かを預ける前に理屈のほうを確認したい方のために、全部書いてあります。
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {GUIDES.map((g) => (
              <Link key={g.href} href={g.href}
                className="group bg-white rounded-[12px] transition-all hover:shadow-lg"
                style={{ padding: '16px 18px', border: '1px solid #E2EFE9', display: 'block' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '4px', lineHeight: 1.6 }}>{g.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#4C6459' }}>{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NextStep
        eyebrow="次のステップ"
        heading="スーパーアニュエーションを置いていかないでください"
        body="オーストラリアで働いている間、雇用主は給与とは別にスーパーアニュエーションを積み立てています。完全に帰国するときに受け取ることができ、これは申告とは別の手続きです。"
        cta="スーパー受取の流れ →"
        href="/ja/superannuation"
      />

      <MobileCta href={WA_TR} lang="ja" topic="tax-return" />
    </>
  )
}
