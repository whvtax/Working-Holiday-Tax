import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '../../HomeWa'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'

/*
 * Japanese mirror of the rebuilt superannuation answer hub. Same structure as
 * /superannuation: every H2 is a question, answered immediately in a complete
 * paragraph, sales layer underneath the answer rather than instead of it.
 * Community terminology kept: スーパー受取, タックスリターン.
 */

const WA = waUrl({ topic: 'super', lang: 'ja' })

export const metadata: Metadata = {
  title: { absolute: 'オーストラリアのスーパーを帰国後に受け取る方法（DASP）' },
  description:
    '417・462ビザで働いた方は、帰国後にDASPでスーパーを受け取れます。対象条件、65%の税率、必要書類、かかる期間まで日本語で解説。',
  keywords: [
    'スーパー 返金 オーストラリア',
    'スーパーアニュエーション 返金',
    'スーパー受取 申請方法',
    'スーパー 帰国後 返金',
    'DASP 申請',
    'DASP 還付',
    'ワーキングホリデー スーパー 返金',
    '417ビザ スーパー 返金',
    '462ビザ スーパー 返金',
    'バックパッカー スーパー 返金',
    'オーストラリア 帰国 スーパー',
    'スーパー いくら戻る',
    'スーパーアニュエーション 日本の口座',
    'Departing Australia Superannuation Payment 日本語',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/superannuation`,
    languages: {
      'en-AU': `${SITE_URL}/superannuation`,
      'de': `${SITE_URL}/de/superannuation`,
      'ja': `${SITE_URL}/ja/superannuation`,
      'x-default': `${SITE_URL}/superannuation`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'オーストラリアのスーパーを帰国後に受け取る方法（DASP）',
    description: '対象条件、65%課税後の受取額、必要書類、かかる期間を日本語で解説します。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'オーストラリアのスーパーを帰国後に受け取る方法（DASP）',
    description: '対象条件、65%の税率、必要書類、期間、複数ファンドの探し方。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const JUMP = [
  { id: 'who-can-claim',      label: '対象条件' },
  { id: 'how-much',           label: '受取額' },
  { id: 'documents',          label: '必要書類' },
  { id: 'how-long',           label: 'かかる期間' },
  { id: 'find-your-fund',     label: 'ファンド探し' },
  { id: 'from-overseas',      label: '帰国後の申請' },
  { id: 'dasp-vs-leaving',    label: '受取か据え置きか' },
  { id: 'while-in-australia', label: '滞在中は' },
  { id: 'never-claimed',      label: '申請しないと' },
  { id: 'with-us',            label: '自分か当社か' },
]

/**
 * 誰もが抱えたまま来る反論を、スーパーに即して答える。
 *
 * ページ下部の最終セクションで詳しく展開しているため、ここは高い位置に置く簡潔版。
 * 読者はこの反論を持って来るからである。各行はDASPの話に限定した。申請は1つずつしか
 * 扱えず、しかも自分で名前を挙げられるファンドだけが対象になる。ATOの仕組みが
 * 悪いとは書いていない。役割が違うだけである。
 */
const MYGOV = [
  {
    mygov: '申請はファンドを1つずつ扱い、しかもあなたが把握しているものだけが対象です。',
    us: 'タックスファイルナンバーに紐づく口座をすべて探します。雇用主が断りなく開設した口座も含みます。',
  },
  {
    mygov: '残高がすでにファンドを離れ、未請求スーパーとしてATOに移っていても、そのことは分かりません。',
    us: 'ビザ失効から半年ほどでそこへ移るため、当社はATO側も確認します。',
  },
  {
    mygov: '申請はビザの記録と照合され、失効していないビザがあるとその時点で止まります。',
    us: '3つの条件を先に確認するので、まだ支払われない申請に何週間もかける必要がありません。',
  },
  {
    mygov: 'スーパーとタックスリターンは別々の申請で、両者が自動でつながることはありません。',
    us: '金額が大きいのはたいていタックスリターンの側です。両方を扱うので、どちらも取り残されません。',
  },
]

const faqs = [
  {
    question: 'スーパーはmyGovで自分で請求してはいけないのですか。',
    answer:
      'ご自身でできますし、ファンドが1つだけで、書類が揃っていて、追加の照会もないのであれば、それが合理的です。その場合はそうお伝えします。実際にはそう単純にならない理由は、短期や季節の仕事によってスーパーが本人も覚えていない口座に分散するからです。申請はファンドを1つずつしか扱わず、しかも自分で名前を挙げられるものだけが対象になります。残高がすでに未請求スーパーとしてATOに移っていることも教えてくれません。ビザ失効から半年ほどでそこへ移ります。海外からの書類認証、古いパスポート番号、2年前に離れた住所といったものが申請を振り出しに戻すことも案内されません。さらに、この申請はタックスリターンとつながりません。金額が大きいのはたいていそちら側です。提出は簡単な部分です。ご依頼いただく場合はTFNから口座を洗い出すところから始めるため、ご自身でファンド名を思い出していただく必要はありません。',
  },
  {
    question: 'ABN（事業者番号）で働いていた場合もスーパーはもらえますか。',
    answer:
      '基本的にはもらえません。スーパーアニュエーションの拠出は雇用主の義務で、PAYG雇用に紐づくものです。ギグワーク、ライドシェア、フリーランスなどABNで請求した仕事には通常適用されません。例外は、名目上は請負でも実態は従業員に近い働き方だった場合です。勤務時間が決められ、道具は雇用主から支給され、他の人に代わってもらうことができなかったのであれば、スーパーの権利が認められることがあります。思い込みで諦めず確認する価値があります。',
  },
  {
    question: 'DASPによるスーパー受取とタックスリターンの還付金は同じものですか。',
    answer:
      '別のものです。財源も手続きも異なります。タックスリターンの還付金は、給与から源泉徴収された税額と実際に納めるべき税額との差額で、申告後にATOから支払われます。DASP（Departing Australia Superannuation Payment）は、雇用主が給与とは別に積み立てた老後資金の払い出しで、スーパーファンドから支払われます。ワーキングホリデーの方の多くは両方を受け取る資格があり、それぞれ別に申請します。',
  },
  {
    question: 'スーパーを受け取るのにTFN（納税者番号）は必要ですか。',
    answer:
      '氏名、生年月日、パスポート情報からファンド側で本人確認できることが多いため、TFNが分からなくても申請自体は止まりません。ただし実務上TFNは重要です。ATOはTFNを使ってすべてのスーパー口座をあなたに紐づけているため、忘れている口座を確実に見つける唯一の手段がTFNです。紛失した場合は再確認できますので、ファンドを一つずつ探すより先に取り戻すほうが早く進みます。',
  },
  {
    question: 'なぜワーキングホリデーは65%で、他のビザは35%なのですか。',
    answer:
      '65%という税率は、417・462ビザを保持したことがある人に対して法律で定められたものです。ワーキングホリデービザを一度も持っていない一時滞在者、たとえば学生ビザや多くのスポンサービザの方は、課税済み部分に35%が適用されます。滞在中の一時期でもワーキングホリデービザを保持していれば、支払い全体に高いほうの税率がかかります。最後に持っていたビザではなく、ビザの履歴で決まる仕組みで、代理人が下げられるものではありません。',
  },
  {
    question: '雇用主がスーパーを一度も払っていなかった場合はどうなりますか。',
    answer:
      '受け取れるのは実際にファンドへ入金された分だけです。本来払うべき雇用主が拠出していなかった場合は、未払いのスーパーアニュエーション・ギャランティーの問題として、ATOが調査し回収できることがあります。DASP申請とは別の手続きで、時間もかなりかかります。口座を閉じた後に拠出が入ると申請をもう一度やり直すことになるため、受け取り前に相談しておく価値があります。',
  },
  {
    question: 'スーパーを受け取ると、タックスリターンや将来のビザに影響しますか。',
    answer:
      'どちらにも影響しません。DASPの支払い前に差し引かれる税金は最終的な課税であり、オーストラリアでの課税所得にはならないため、タックスリターンに記載する必要はありません。将来のビザ申請にも関係しません。実務上の影響は、受け取りによってスーパー口座が閉鎖されることだけです。再びオーストラリアで働く場合は、新しいファンドで一から積み立てが始まります。',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'ja',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: 'スーパー受取', item: `${SITE_URL}/ja/superannuation` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/ja/superannuation#service`,
  name: 'スーパー受取（DASP）代行サービス',
  serviceType: 'Departing Australia Superannuation Payment 申請',
  description:
    '417・462ビザ保持者のスーパー受取（DASP）代行。TFNに紐づくすべてのファンドの調査から、日本またはオーストラリアの口座への入金までを日本語で対応します。',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 / 462) 帰国済みの方' },
  inLanguage: 'ja',
  url: `${SITE_URL}/ja/superannuation`,
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/ja/superannuation#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/ja/superannuation`,
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  inLanguage: 'ja',
  name: 'オーストラリア出国後にスーパー（DASP）を受け取る方法',
  description:
    '417・462ビザのワーキングホリデーメーカーがDASPでスーパーを受け取るまでの手順。対象条件の確認から入金まで。',
  totalTime: 'P28D',
  step: [
    { name: '対象条件を確認する', text: 'ビザが失効または取り消されており、かつオーストラリアを恒久的に出国していること。両方が同時に満たされている必要があります。' },
    { name: '必要な情報をそろえる', text: 'パスポート、オーストラリアのTFN、ビザ情報、各スーパーファンドの名称と会員番号、入金先の銀行口座。' },
    { name: 'すべてのファンドを探す', text: 'TFNに紐づくスーパー口座を、ATOへ移管済みの未請求残高も含めてすべて調べます。' },
    { name: '各ファンドへ申請する', text: '残高のあるファンドごとに個別のDASP申請を行います。ATOへ移管済みの残高はATOへ申請します。' },
    { name: '源泉徴収が行われる', text: 'ワーキングホリデーメーカーは課税対象部分に65%が課され、ファンドが差し引いてATOへ納付します。' },
    { name: '入金を受け取る', text: '通常、承認から28日以内にオーストラリアまたは海外の銀行口座へ入金されます。' },
  ].map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
}

const H2: React.CSSProperties = {
  fontSize: 'clamp(20px,2.5vw,29px)',
  lineHeight: 1.3,
  letterSpacing: '-0.015em',
  marginBottom: '12px',
  scrollMarginTop: '84px',
}
const BODY: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.85,
  color: '#2A3C34',
  marginBottom: '14px',
}

function Answer({
  id, heading, children, tint = false,
}: { id: string; heading: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className="py-8 lg:py-11" style={{ background: tint ? '#F5F9F7' : '#fff' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="max-w-[680px]">
          <h2 className="font-serif font-black text-ink" style={H2}>{heading}</h2>
          {children}
        </div>
      </div>
    </section>
  )
}

export default function JapaneseSuperannuationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="パンくずリスト" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '13px', color: '#4C6459' }}>
            <Link href="/ja" className="transition-colors hover:text-forest-500">ホーム</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">スーパー受取</span>
          </nav>

          <div className="max-w-[680px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                スーパー受取 &middot; DASP
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(26px,3.2vw,42px)', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              オーストラリアを離れた後にスーパーを受け取る方法
            </h1>

            <p className="hero-sub font-semibold text-ink"
              style={{ fontSize: 'clamp(16px,1.6vw,18px)', lineHeight: 1.6, marginBottom: '12px' }}>
              給与から引かれたお金ではなく、雇用主が上乗せで積み立てたお金です。いまもオーストラリアに残っています。
            </p>

            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop: '24px', marginBottom: '22px', maxWidth: '480px' }}>
              <WaLink href={WA} position="hero" topic="super" lang="ja"
                className="btn-primary inline-flex justify-center"
                style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                スーパーについて相談する
              </WaLink>
              <a href="#who-can-claim"
                className="inline-flex btn-ghost-dark justify-center items-center"
                style={{ minHeight: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                対象条件から読む
              </a>
            </div>

            <p style={{ fontSize: '13px', color: '#4C6459' }}>
              返信は約1時間以内。まず質問だけでも大丈夫です。
            </p>
          </div>
        </div>
      </section>

      {/* ── JUMP NAV ───────────────────────────────────────────────────────── */}
      <nav aria-label="このページの目次"
        style={{ background: '#0B5240', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-[1280px] mx-auto">
          <ul style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '12px 20px', margin: 0, listStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            {JUMP.map(j => (
              <li key={j.id} style={{ flex: '0 0 auto' }}>
                <a href={`#${j.id}`} className="inline-flex items-center"
                  style={{ minHeight: '44px', padding: '0 16px', borderRadius: '999px', fontSize: '13.5px', whiteSpace: 'nowrap', color: '#EAF6F1', border: '1px solid rgba(200,234,224,0.35)' }}>
                  {j.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── 反論への回答、スーパーに即して ─────────────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px]">

            <p className="font-medium uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#16775C', marginBottom: '12px' }}>
              自分でやる場合
            </p>

            <h2 className="font-serif font-black text-ink" style={H2}>
              <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>申請画面のファンド欄は1つ。</span>
              <span style={{ display: 'block' }}>カジュアルの仕事が4つなら、口座も4つです。</span>
            </h2>

            <p style={{ ...BODY, color: '#4C6459', maxWidth: '42ch', marginBottom: '20px' }}>
              そのうち2つは、あなたが選ばないまま開設されたものです。画面のどこにも、その存在は出てきません。
            </p>

            <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                  <div style={{ padding: '15px 18px', background: '#FFFFFF' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#4C6459', marginBottom: '5px' }}>
                      ATOの申請画面
                    </p>
                    <p style={{ ...BODY, marginBottom: 0, overflowWrap: 'break-word' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                    style={{ padding: '15px 18px', background: '#F2FAF7' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240', marginBottom: '5px' }}>
                      当社の場合
                    </p>
                    <p style={{ ...BODY, color: '#080F0D', fontWeight: 500, marginBottom: 0, overflowWrap: 'break-word' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-serif" style={{ fontSize: '17px', lineHeight: 1.75, color: '#0B5240', marginTop: '22px', maxWidth: '36ch', fontWeight: 700 }}>
              myGovにログインすることも、IDを連携することも、どの書類がどれかを調べることもありません。ATOとは当社が直接やり取りします。
            </p>
          </div>
        </div>
      </section>

      <Answer id="who-can-claim" heading="DASPでスーパーを受け取れるのは誰ですか。">
        <p style={BODY}>
          一時滞在ビザでオーストラリアで働き、そのビザが失効または取り消され、かつ恒久的に出国している方がDASPを申請できます。この3つが同時に満たされている必要があります。417・462ビザのワーキングホリデーメーカーは対象で、学生ビザやスポンサービザなど他の一時滞在ビザの方も多くは対象になります。オーストラリアとニュージーランドの国籍者、永住権保持者は対象外で、スーパーは退職まで引き出せません。
        </p>
        <p style={BODY}>
          ビザの状況は申請時に内務省（Department of Home Affairs）の記録と照合されるため、別途証明を用意する必要はありません。ブリッジングビザで滞在中の場合や、有効なビザでまだ国内にいる場合は、状況が変わるまでは申請できません。
        </p>
      </Answer>

      <Answer id="how-much" heading="スーパーは実際にいくら戻ってきますか。" tint>
        <p style={BODY}>
          ワーキングホリデーメーカーの場合、DASPの課税対象部分に65%の源泉徴収がかかるため、手元に届くのはおおよそ1ドルにつき35セントです。残高10,000ドルなら受取額は約3,500ドルになります。この税率は法律で定められており、417・462ビザを一度でも保持した人に適用され、代理人でも、待つことでも下げられません。金額を変えられるのは、忘れていた口座を見つけることと、手数料や保険料が残高を削る前に申請することです。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ margin: '20px 0 14px' }}>
          {[
            { bal: '$3,000', net: '$1,050', note: '数か月のカジュアル勤務' },
            { bal: '$6,000', net: '$2,100', note: 'フルタイムで約半年' },
            { bal: '$10,000', net: '$3,500', note: 'ワーホリ1年分' },
          ].map((r, i) => (
            <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #E2EFE9', textAlign: 'center' }}>
              <p className="font-medium" style={{ fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4C6459', marginBottom: '6px' }}>
                スーパー残高
              </p>
              <p className="font-semibold text-ink" style={{ fontSize: '17px', marginBottom: '10px' }}>{r.bal}</p>
              <p className="font-serif font-black" style={{ fontSize: 'clamp(26px,3vw,33px)', color: '#0B5240', lineHeight: 1, marginBottom: '8px' }}>
                {r.net}
              </p>
              <p style={{ fontSize: '13px', color: '#4C6459', lineHeight: 1.7 }}>
                受取額 &middot; {r.note}
              </p>
            </div>
          ))}
        </div>

        <p style={{ ...BODY, fontSize: '13px', color: '#4C6459' }}>
          ATOが定める65%のDASP源泉徴収後の金額で、残高がすべて課税済み拠出である場合の例です。一部のファンドが保有する未課税部分にはより高い税率が適用されます。見積もりではなく目安としてご覧ください。
        </p>
      </Answer>

      <Answer id="documents" heading="DASP申請にはどの書類が必要ですか。">
        <p style={BODY}>
          パスポート、オーストラリアのTFN（納税者番号）、ビザ情報、各スーパーファンドの名称、手元にあれば会員番号が必要です。加えて入金先の銀行口座情報が要ります。口座はオーストラリアでも日本でも構いません。会員番号が分からなくても致命的ではなく、通常はTFNと生年月日でファンド側が照合できます。
        </p>
        <p style={BODY}>
          申請が止まりやすいのは認証（certification）の部分です。1つのファンドの残高が5,000ドル以上になると、写真ではなくパスポートとビザの認証済みコピーを求められるのが一般的で、日本から手配すると想像より時間がかかります。最初の申請が却下されてから慌てるのではなく、事前に整えておくかどうかが、1か月で終わる申請と半年かかる申請の分かれ目です。
        </p>
      </Answer>

      <Answer id="how-long" heading="DASPの入金までどのくらいかかりますか。" tint>
        <p style={BODY}>
          通常、申請が承認されてから28日以内に入金されます。この28日は、申請を送った時点ではなく、ファンドまたはATOが必要なものをすべて受け取った時点から数え始めます。認証済み書類が欠けていたり、住所がファンドの記録と一致しなかったりすると、28日が始まる前に何週間も止まることがあります。
        </p>
        <p style={BODY}>
          お金が複数のファンドに分かれている場合、全体の速さは一番遅いファンドに合わせられます。各ファンドがそれぞれ審査し、それぞれ送金するためです。すでにATOへ移管された残高はATOへ申請する形になり、期間の目安は同じです。
        </p>
      </Answer>

      <Answer id="find-your-fund" heading="どのスーパーファンドだったか分からない場合は。">
        <p style={BODY}>
          それが普通の状態で、問題にはなりません。雇用主が拠出したファンドはすべてTFNに紐づいているため、雇用主名もファンド名も会員番号も思い出せなくても、TFNから口座をたどれます。ファンドがすでにATOへ引き渡した残高も、同じ検索で見つかります。
        </p>
        <p style={BODY}>
          自動ではないのは申請そのものです。口座が見つかっても申請したことにはならず、ファンドごとに書類をそろえた個別の申請が必要になります。見落とされるのはたいてい、スーパーが何かを知る前に始めた最初の仕事です。
        </p>
      </Answer>

      <Answer id="from-overseas" heading="日本に帰国した後でも申請できますか。" tint>
        <p style={BODY}>
          できますし、むしろ帰国後でなければ申請できません。DASPはオーストラリアを出国した後にしか行えない手続きなので、すべての申請は国外からのものです。いま日本に住んでいることが不利になることはありません。手続きは書類のやり取りで完結し、日本から進められます。
        </p>
        <p style={BODY}>
          オーストラリアの銀行口座を解約する前に、片づけておくことが2つあります。海外口座への電子送金に対応していないファンドもあり、その場合は小切手が郵送されます。入金が遅く、換金の手間もかかります。また、受け取った金額を日本側でどう扱うかは日本の税制の問題で、オーストラリアの制度とは別です。こちらは日本の税理士にご確認ください。
        </p>
      </Answer>

      <Answer id="dasp-vs-leaving" heading="今受け取るか、オーストラリアに残しておくか。">
        <p style={BODY}>
          ワーキングホリデーの方のほとんどにとっては、受け取るほうが有利です。残したままの残高には新しい拠出が入らない一方で、口座管理手数料と、多くのファンドでは海外にいる間は使えない保険料が引かれ続けます。ビザ失効と出国からおよそ6か月後には、ファンドは残額をATOへ移管する義務があります。ATOでは手数料はかかりませんが、運用もされません。
        </p>
        <p style={BODY}>
          残す理由は限られます。オーストラリアに戻って定住して働く予定がある場合だけで、そのときは口座に再び拠出が入るからです。待っても65%は下がりませんし、残高も増えません。
          <Link href="/ja/blog/dasp-vs-leaving-super-in-australia-pros-cons" className="font-semibold"
            style={{ color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            詳しい比較はこちら
          </Link>
          。
        </p>
      </Answer>

      <Answer id="while-in-australia" heading="オーストラリア滞在中にスーパーを受け取れますか。" tint>
        <p style={BODY}>
          受け取れません。有効なビザを持って国内にいる間、スーパーはロックされています。ワーキングホリデービザでは、仕事を辞めた、帰りの航空券を買いたい、生活が苦しいといった理由での早期引き出しもできません。出国していること、そして働いていたビザが失効または取り消されていること、この2つが同時に必要です。
        </p>
        <p style={BODY}>
          ビザの期限よりかなり早く帰国する場合、残りの期間を待つ必要はありません。出国後に内務省へビザの取り消しを申請すれば、数か月待たずにその時点で対象になります。
        </p>
      </Answer>

      <Answer id="never-claimed" heading="スーパーを受け取らないままだとどうなりますか。">
        <p style={BODY}>
          なくなるわけではなく、期限もありません。ビザ失効と出国からおよそ6か月後、未請求の残高はファンドからATOへ移管されます。そこではあなたの名義のまま手数料もかからず、請求できる状態が続きます。帰国から数年後にDASPを申請して受け取っている方も実際にいますし、税率は同じ65%です。
        </p>
        <p style={BODY}>
          失われるのは、移管されるまでの数か月に口座管理手数料と保険料が残高から引いた分です。残高が小さいほど割合として重く、これは後から誰にも取り戻せません。早めに申請すべき理由はここだけですが、理由としては十分です。
        </p>
      </Answer>

      <Answer id="with-us" heading="自分で申請するか、当社に任せるか。" tint>
        <p style={BODY}>
          DASPはATOのオンライン申請システムから自分で申請できますし、費用はかかりません。ファンドが1つで、書類がそろっていて、追加の照会がなければ、それが合理的な方法です。そう申し上げます。このページの内容も、何かの登録の後ろに隠していません。
        </p>
        <p style={BODY}>
          当社が引き受けるのは、そうならない部分です。ATO保有分も含めてTFNに紐づくすべての口座を探すこと。日本からの認証書類を手配すること。返答が止まったファンドを追いかけること。古いパスポート番号や、もう住んでいない住所のせいで申請が振り出しに戻らないようにすること。ワーホリの税務だけを扱っているので、どれも初めてではありません。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ margin: '22px 0' }}>
          <div className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #E2EFE9' }}>
            <p className="font-semibold" style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#4C6459', marginBottom: '14px' }}>
              自分で行う場合
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                '4つ5つの仕事分のファンドを自力で特定する',
                '認証済みコピーを日本から手配する',
                'ファンドごとに別々の申請',
                '返答が止まったファンドを追う相手がいない',
              ].map((t, i) => (
                <li key={i} style={{ fontSize: '14px', lineHeight: 1.8, color: '#2A3C34' }}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl" style={{ padding: '20px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
            <p className="font-semibold" style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#0B5240', marginBottom: '14px' }}>
              当社に任せる場合
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'TFNに紐づく全ファンドを調査。ATO保有分も含みます',
                '提出前に書類をすべて確認',
                'すべてのファンドの窓口が一本化',
                '入金されるまで日本語で対応',
              ].map((t, i) => (
                <li key={i} className="font-semibold" style={{ fontSize: '14px', lineHeight: 1.8, color: '#080F0D' }}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #C8EAE0', marginBottom: '20px' }}>
          <p className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.7, marginBottom: '8px' }}>
            還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#4C6459' }}>
            当社のチームが作成し、ATOへ提出する前に登録税理士が確認して承認します。
          </p>
        </div>

        <WaLink href={WA} position="section" topic="super" lang="ja"
          className="btn-primary flex justify-center"
          style={{ minHeight: '54px', width: '100%', maxWidth: '360px', fontSize: '15px', borderRadius: '100px' }}>
          WhatsAppで相談する
        </WaLink>
        <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '10px' }}>
          返信は約1時間以内。まず質問だけでも大丈夫です。
        </p>
      </Answer>

      <section className="py-10 lg:py-14" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[760px]">
            <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '18px' }}>
              スーパー受取についてのその他の質問
            </h2>
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '16px' }}>
            申請の一部をさらに詳しく
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px]">
            {[
              { href: '/ja/blog/how-long-does-dasp-take', label: 'DASP申請にかかる期間を段階ごとに' },
              { href: '/ja/blog/dasp-documents-required', label: 'DASP申請に必要な書類の一覧' },
              { href: '/ja/blog/dasp-tax-rate-65-percent-explained', label: 'なぜDASPは65%課税なのか、手元に残る額は' },
              { href: '/ja/blog/dasp-rejected-what-to-do', label: 'DASP申請が却下されたときの対処' },
              { href: '/ja/blog/super-multiple-funds-consolidation', label: 'スーパーが複数のファンドに分かれている場合' },
              { href: '/ja/blog/dasp-vs-leaving-super-in-australia-pros-cons', label: '今受け取るか据え置くか、比較して考える' },
            ].map(g => (
              <Link key={g.href} href={g.href}
                className="block rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '16px', fontSize: '14px', lineHeight: 1.7, color: '#080F0D', minHeight: '44px' }}>
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NextStep
        eyebrow="次のステップ"
        heading="2%のメディケア税も、ほとんど誰も取り戻していません"
        body="417・462ビザの多くは、そもそも支払う義務がありません。ほとんど誰も申請しない証明書で外せます。"
        cta="メディケア税免除について読む"
        href="/ja/medicare"
      />

      <MobileCta href={WA} lang="ja" topic="super" />
    </>
  )
}
