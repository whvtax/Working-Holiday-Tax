import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Compare, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, PlainRows, TitleLinks, coreBlocks } from '@/components/wht/CoreBlocks'

/*
 * Japanese mirror of the rebuilt superannuation answer hub. Same structure as
 * /superannuation: every H2 is a question, answered immediately in a complete
 * paragraph, sales layer underneath the answer rather than instead of it.
 * Community terminology kept: スーパー受取, タックスリターン.
 */

const WA = waUrl({ topic: 'super', lang: 'ja' })

export const metadata: Metadata = {
  title: { absolute: 'スーパーアニュエーション返金のやり方｜帰国後DASPで日本から申請' },
  description:
    '帰国後はATOのDASPオンライン申請（無料）で請求し、書類がそろえば通常28日以内に支払われます。65%の税率、5,000ドル以上の認証、日本の口座で受け取れる場合も解説。',
  keywords: [
    'スーパー 返金 オーストラリア',
    'スーパーアニュエーション 返金',
    'スーパーアニュエーション 返金 やり方',
    'スーパーアニュエーション 申請方法 帰国後',
    'スーパー 返金 代行',
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
      ...newLocaleLanguages('/superannuation'),
      'x-default': `${SITE_URL}/superannuation`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'スーパーアニュエーション返金のやり方｜帰国後DASPで日本から申請',
    description: '対象条件、65%課税後の受取額、必要書類、かかる期間を日本語で解説します。',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'スーパーアニュエーション返金のやり方｜帰国後DASPで日本から申請',
    description: '対象条件、65%の税率、必要書類、期間、複数ファンドの探し方。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}


/**
 * 誰もが抱えたまま来る反論を、スーパーに即して答える。
 *
 * このページでこの議論を扱うのはここだけになった。同じ内容を繰り返していた
 * 最終セクションの2列リストは削除し、FAQでも言い直さないようにしている。
 * 各行はDASPの話に限定した。申請は1つずつしか扱えず、しかも自分で名前を
 * 挙げられるファンドだけが対象になる。ATOの仕組みが悪いとは書いていない。
 * 役割が違うだけである。
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
    us: '金額が大きいのはたいていタックスリターンの側なので、両方を扱います。',
  },
]

// Accordionは回答の空行を段落の区切りとして扱う。長い回答にだけ入れている。
// faqSchemaは元の文字列をそのまま使うので、構造化データは変わらない。
const faqs = [
  {
    question: '417・462のワーキングホリデービザでもスーパーは受け取れますか？',
    answer:
      'はい。オーストラリアを出国し、ワーキングホリデービザが失効した後に受け取れます。そのビザでまだ滞在している間は申請できません。申請はDASP（Departing Australia Superannuation Payment）で、課税対象部分の65%が源泉徴収されます。スーパーファンドからの支払いは海外の口座でも受け取れますが、ATOに移管された分はオーストラリアの本人名義口座か小切手に限られます。',
  },
  {
    question: 'スーパーの申請は自分でできますか？',
    answer:
      'できますし、申請自体は無料です。ファンドが1つで書類がそろっていれば、ご自身で進めるのが合理的だとお伝えします。\n\n難しくなるのは、スーパーが複数のファンドに分かれている場合、認証済みコピーを海外から求められる場合、そしてビザがまだ失効していない場合です。',
  },
  {
    question: 'スーパー残高が5,000ドル以上の場合、何が変わりますか？',
    answer:
      'ATOによると、スーパーの額が5,000ドル以上の場合、ファンドは本人確認書類の認証済みコピーを求めることがあります。認証できる人には決まりがあるため、オーストラリアにいるうちに用意しておくのが確実です。必要な書類はファンドごとに違います。',
  },
  {
    question: 'ATOに移管されたスーパーは日本の口座で受け取れますか？',
    answer:
      'いいえ。ATOが保有している残高は、本人名義のオーストラリアの銀行口座への振込か小切手でしか受け取れません。海外送金を選べるのは、スーパーファンドに申請する場合だけです。',
  },
  {
    question: '何年も前に帰国していても申請できますか？',
    answer:
      'できます。出国とビザ失効から6か月以上たった残高はATOへ移管されていることが多いですが、ATOに申請すれば受け取れます。ワーキングホリデー中の拠出には、何年後でも同じ65%がかかります。',
  },
  {
    question: 'ABN（事業者番号）で働いていた場合もスーパーはもらえますか？',
    answer:
      '基本的にはもらえません。スーパーアニュエーションの拠出は雇用主の義務で、PAYG雇用に紐づくため、ABNで請求した仕事には通常適用されません。ただし実態が従業員に近い働き方だった場合は、権利が認められることがあります。',
  },
  {
    question: 'DASPによるスーパー受取とタックスリターンの還付金は同じものですか？',
    answer:
      '別のものです。タックスリターンの還付金は、源泉徴収と実際の税額との差額で、申告後にATOから支払われます。\n\nDASPは雇用主が給与とは別に積み立てた老後資金の払い出しで、スーパーファンドから支払われます。多くの方は、両方の手続きの対象になります。',
  },
  {
    question: 'スーパーを受け取るのにTFN（納税者番号）は必要ですか？',
    answer:
      'TFNが分からなくても、氏名や生年月日、パスポート情報で本人確認できることが多く、申請自体は止まりません。\n\nただしATOはTFNですべてのスーパー口座を紐づけているため、忘れている口座を確実に見つける唯一の手段はTFNです。紛失した場合も再確認できます。\n\nATOのDASPオンライン申請でスーパーを検索するときも、TFNの入力が前提です。',
  },
  {
    question: 'なぜワーキングホリデーは65%で、他のビザは35%なのですか？',
    answer:
      'DASPにワーキングホリデービザで働いていた期間の拠出が含まれる場合、その課税対象部分には65%が源泉徴収されると法律で定められています。ワーキングホリデービザを持ったことがない一時滞在者には、課税済み部分に35%、未課税部分に45%の通常税率が適用されます。\n\n学生ビザなど別のビザでも働いていた場合は、どの拠出がどの期間のものかで税率が変わることがあり、その判断はファンドが行います。',
  },
  {
    question: '雇用主がスーパーを一度も払っていなかった場合はどうなりますか？',
    answer:
      '雇用主が拠出していなかった場合は、未払いのスーパーアニュエーション・ギャランティーとしてATOが調査し回収できることがあります。\n\nDASPとは別の手続きで時間もかかるため、受け取り前のご相談が安全です。',
  },
  {
    question: 'スーパーを受け取ると、タックスリターンや将来のビザに影響しますか？',
    answer:
      'タックスリターンには影響しません。DASPの税金は支払い前に差し引かれる最終的な課税で、タックスリターンに記載する必要はありません。将来のビザについては、ご自身の状況に合わせて内務省の案内をご確認ください。\n\n影響はスーパー口座が閉鎖されることだけで、再び働く場合は新しいファンドで積み立てが始まります。',
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
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub', '#key-figures'] },
  url: `${SITE_URL}/ja/superannuation`,
}

/*
 * DASPの請求が何から成り、どの順で進むのかを説明する構造化データ。ランディング
 * ページではなく情報源として読まれるためのもの。
 * 意図的に「手順書」にはしていない。以前の版は「必要な情報をそろえる」「各ファンド
 * へ申請する」と並べていたが、それは当社が受任している作業そのものの手引きであり、
 * 検索エンジンはこの種のデータをステップバイステップとして表示する。
 */
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  inLanguage: 'ja',
  name: 'スーパー（DASP）の請求はどう進むのか',
  description:
    '417・462ビザのワーキングホリデーメーカーのDASP請求が何から成るのか。対象条件から入金まで。',
  step: [
    { name: '対象条件が確認される', text: 'ビザが失効または取り消されており、かつオーストラリアを出国していること。両方が同時に満たされている必要があり、その前に出した請求は、最も多い無駄な申請の原因です。' },
    { name: 'すべてのファンドが特定される', text: '雇用先が複数あった1年は、たいていファンドも複数になります。すでにファンドからATOへ移管された未請求残高も含みます。請求が届くのは、請求先のファンドの資金だけです。' },
    { name: '各請求が準備され、証拠がそろえられる', text: '残高のあるファンドごとに、それぞれの本人確認・認証基準に沿って個別に請求します。あるファンドが受け付けた書類を、次のファンドが受け付けるとは限りません。' },
    { name: '源泉徴収が行われる', text: 'ワーキングホリデーメーカーのDASPは課税対象部分に65%が課されます。誰が請求しても、ファンドが差し引いてATOへ納付します。' },
    { name: '残高が支払われる', text: '残りの残高が支払われます。スーパーファンドからの支払いは海外の口座でも受け取れますが、ATOが保有する残高はオーストラリアの本人名義口座か小切手に限られます。' },
  ].map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
}

/* ── Section shell: every answer on the page is one Section ──────────────── */
function Answer({
  id, heading, children, tone = 'white',
}: { id: string; heading: string; children: React.ReactNode; tone?: 'white' | 'pale' | 'amber' }) {
  return (
    <Section id={id} tone={tone} title={heading} titleId={`${id}-title`}>
      {children}
    </Section>
  )
}

const GUIDES = [
  { href: '/ja/blog/how-long-does-dasp-take', label: 'DASP申請にかかる期間を段階ごとに' },
  { href: '/ja/blog/dasp-documents-required', label: 'DASP申請に必要な書類の一覧' },
  { href: '/ja/blog/dasp-tax-rate-65-percent-explained', label: 'なぜDASPは65%課税なのか、手元に残る額は' },
  { href: '/ja/blog/dasp-rejected-what-to-do', label: 'DASP申請が却下されたときの対処' },
  { href: '/ja/blog/super-multiple-funds-consolidation', label: 'スーパーが複数のファンドに分かれている場合' },
  { href: '/ja/blog/dasp-vs-leaving-super-in-australia-pros-cons', label: '今受け取るか据え置くか、比較して考える' },
  { href: '/ja/blog/how-to-find-lost-superannuation', label: 'なくしたスーパーを探す方法' },
  { href: '/ja/blog/what-happens-to-unclaimed-super', label: 'ATOに移管されたスーパーを請求する' },
  { href: '/ja/blog/super-employer-not-paying-what-to-do', label: '雇用主がスーパーを払っていなかったとき' },
]

/** DASPの主な数字。すべてATOの公開情報（2026年11月確認）。 */
const KEY_FIGURES = [
  { label: 'ワーホリの税率', body: 'ワーキングホリデービザで働いた期間の拠出の課税対象部分に65%。2017年7月1日から適用。出典：ATO' },
  { label: 'ほかの一時滞在ビザの税率', body: '課税済み部分35%、未課税部分45%。非課税部分はどちらも0%。出典：ATO' },
  { label: '支払いまでの目安', body: '申請が完了してから通常28日以内。追加書類を求められると延びます。出典：ATO' },
  { label: '認証済みコピーが必要になりうる額', body: 'スーパーの額が5,000ドル以上の場合、ファンドが本人確認書類の認証済みコピーを求めることがあります。出典：ATO' },
  { label: 'ATOへの移管', body: '出国し、ビザが失効してから6か月以上たつと、残高はファンドからATOへ移されます。移管後もATOに申請できます。出典：ATO' },
  { label: '受け取れる口座', body: 'ファンドへの申請なら海外送金も選べます（手数料がかかる場合あり）。ATOが保有する残高は、本人名義のオーストラリアの口座か小切手のみ。出典：ATO' },
  { label: '雇用主の拠出', body: '通常の労働時間分の給与の12%。2025年7月1日から12%で、2026-27年度も同じです。2026年7月1日からの「Payday Super」により、多くの雇用主は給料日から数日以内に払い込みます。出典：ATO' },
  { label: '申請費用', body: 'ATOのDASPオンライン申請は無料です。出典：ATO' },
]

/** 帰国前に済ませておくこと。DASPの提出は出国後だが、準備は国内のほうが簡単。 */
const BEFORE_YOU_LEAVE = [
  { label: '最後の給料日の分が入金されたか確認する', body: '2026年7月1日からのPayday Superで、多くの雇用主は給料日から数日以内にスーパーを払い込みます。最後の拠出が届く前に申請すると、その分は別の申請が必要になります。' },
  { label: '5,000ドル以上なら認証済みコピーを国内で用意する', body: '認証できる人には決まりがあり、ATOはオーストラリアにいるうちに済ませるよう勧めています。必要な書類はファンドごとに違います。' },
  { label: 'オーストラリアの銀行口座を残しておく', body: 'ATOに移管された残高は、本人名義のオーストラリアの口座への振込か小切手でしか受け取れません。' },
  { label: 'TFNと勤務先の一覧をメモする', body: '各ファンドの名称と会員番号、雇用主の名前と勤務期間。ファンド名が分からなくても、TFNから口座をたどれます。' },
  { label: 'オンライン申請は国内で始めておける', body: 'ATOのDASPオンライン申請は出国前に始めて保存でき、出国後に同じ情報で再開できます。' },
]

export default function JapaneseSuperannuationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className={blocks.underHeader}>
        <Crumb home="ホーム" current="スーパー受取" label="パンくずリスト" href="/ja" />
        <Hero
          title={<><span className={blocks.kicker}>スーパーアニュエーション返金（DASP）｜ワーホリ帰国後</span>オーストラリアを離れた後に<Mark>スーパーを受け取る</Mark>方法</>}
        >
          <div className="hero-sub">
            <Lead>給与から引かれたお金ではなく、雇用主が上乗せで積み立てたお金です。いまもオーストラリアに残っています。</Lead>
            <p className={blocks.text}>ワーホリ（417・462ビザ）のスーパーは、オーストラリアを出国し、ビザが失効または取り消された後に、DASP（Departing Australia Superannuation Payment）として申請します。課税対象部分から65%が源泉徴収され、スーパーファンドからの支払いは日本の口座でも受け取れます。ただしATOに移管された残高は、本人名義のオーストラリアの口座か小切手でしか受け取れません。必要書類がすべてそろってから、通常28日以内に支払われます。</p>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="super" lang="ja">スーパーについて相談する</WaButton>
            <a href="#who-can-claim" className={coreBlocks.hint}>対象条件から読む</a>
          </div>
          <p className={heroStyles.note}>返信は約1時間以内。</p>
        </Hero>
      </div>

      <PhotoFrame page="superannuation" locale="ja" />

      <Section id="key-figures" tone="pale" title="DASPの主な数字（2026年11月時点）" titleId="key-figures-title">
        <PlainRows items={KEY_FIGURES} />
        <p className={blocks.small}>出典：オーストラリア国税庁（ATO）「Departing Australia superannuation payment (DASP)」（2026年4月21日更新）、「Super information for temporary residents departing Australia」、「DASP and working holiday makers changes: frequently asked questions」。</p>
      </Section>


      <Answer id="who-can-claim" heading="DASPでスーパーを受け取れるのは誰ですか？" tone="white">
        <p className={blocks.text}>
          一時滞在ビザで働き、そのビザが失効または取り消され、かつ恒久的に出国した方がDASPを申請できます。3つとも同時に必要です。オーストラリアとニュージーランドの国民、永住者は申請できません。
        </p>
        <p className={blocks.text}>
          ビザの状況は内務省（Department of Home Affairs）の記録と照合されるため、別途証明を用意する必要はありません。ブリッジングビザや、有効なビザで国内にいる場合は申請できません。
        </p>
      </Answer>
      <Answer id="before-you-leave" heading="帰国前に済ませておくことは何ですか？" tone="pale">
        <p className={blocks.text}>DASPの提出は出国後ですが、準備の多くはオーストラリアにいる間のほうが簡単です。</p>
        <PlainRows items={BEFORE_YOU_LEAVE} />
        <p className={blocks.text}>提出できるのは、オーストラリアを出国し、ビザが失効した後です。</p>
      </Answer>
      <Answer id="how-much" heading="スーパーは実際にいくら受け取れますか？" tone="white">
        <p className={blocks.text}>ワーキングホリデーメーカーの場合、DASPの課税対象部分に65%の源泉徴収がかかり、手元に届くのは1ドルにつき約35セントです。この税率は法律で定められており、代理人でも待つことでも下げられません。</p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          残高ごとの手取りは<Link href="/ja/blog/tax-on-super-withdrawal-backpacker" className={blocks.textLink}>スーパーはいくら戻るか</Link>、税率の背景は<Link href="/ja/blog/dasp-tax-rate-65-percent-explained" className={blocks.textLink}>なぜDASPは65%なのか</Link>で詳しく説明しています。
        </p>
        <div className={coreBlocks.threeUp}>
          {[
            { bal: '3,000ドル', net: '1,050ドル', note: '数か月のカジュアル勤務' },
            { bal: '6,000ドル', net: '2,100ドル', note: 'フルタイムで約半年' },
            { bal: '10,000ドル', net: '3,500ドル', note: 'ワーホリ1年分' },
          ].map((r, i) => (
            <div key={i} className={coreBlocks.stat}>
              <p className={coreBlocks.statLabel}>スーパー残高</p>
              <p className={blocks.cardTitle}>{r.bal}</p>
              <p className={coreBlocks.statNet}>{r.net}</p>
              <p className={blocks.small}>受取額 &middot; {r.note}</p>
            </div>
          ))}
        </div>
        <p className={blocks.small}>ATOが定める65%のDASP源泉徴収後の金額です。ワーキングホリデー中の拠出には、課税済み部分（taxed element）にも未課税部分（untaxed element）にも同じ65%がかかり、源泉徴収なしで支払われるのは非課税部分（tax-free component）だけです。ワーホリの方の残高に非課税部分が含まれることはまれです。見積もりではなく目安としてご覧ください。</p>
      </Answer>
      <Answer id="documents" heading="DASP申請にはどの書類が必要ですか？" tone="pale">
        <p className={blocks.text}>
          パスポート、オーストラリアのTFN、ビザ情報、各スーパーファンドの名称と会員番号、入金先の銀行口座情報（オーストラリアでも日本でも構いません）が必要です。会員番号が分からなくても、通常はTFNと生年月日でファンド側が照合できます。
        </p>
        <p className={blocks.text}>
          申請が止まりやすいのは認証（certification）です。ATOによると、スーパーの額が5,000ドル以上の場合、ファンドは本人確認書類の認証済みコピー（certified copies）を求めることがあります。認証できる人には決まりがあるため、ATOはオーストラリアにいるうちに済ませておくよう勧めています。5,000ドル未満なら、出国とビザ失効の証明で足りることが多く、在留資格証明（Certification of Immigration Status）は通常不要ですが、ファンドが求める場合もあります。
        </p>
        <p className={blocks.text}>
          どのファンドに残高があるか分からなくても大丈夫です。TFNと勤務先の一覧をWhatsAppで送っていただければ、対象条件と必要書類を確認してお返事します。
        </p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="super" lang="ja" size="md">WhatsAppで相談する</WaButton>
          <p className={blocks.small}>返信は約1時間以内。</p>
        </div>
      </Answer>
      <Answer id="how-long" heading="DASPの入金までどのくらいかかりますか？" tone="white">
        <p className={blocks.text}>
          ATOによると、DASPは完了した申請が届いてから通常28日以内に支払われます。この28日は、ファンドまたはATOが必要なものをすべて受け取った時点から数え始めます。書類の不備や住所の不一致があると、28日が始まる前に何週間も止まることがあります。
        </p>
        <p className={blocks.text}>
          お金が複数のファンドに分かれている場合、全体の速さは一番遅いファンドに合わせられます。すでにATOへ移管された残高はATOへ申請する形になり、期間の目安は同じです。
        </p>
      </Answer>
      <Answer id="find-your-fund" heading="どのスーパーファンドだったか分からない場合はどうなりますか？" tone="pale">
        <p className={blocks.text}>
          それが普通の状態です。雇用主が拠出したファンドはすべてTFNに紐づいているため、ファンド名を思い出せなくても、TFNから口座をたどれます。ファンドがすでにATOへ引き渡した残高も、同じ検索で見つかります。
        </p>
        <p className={blocks.text}>
          自動ではないのは申請そのものです。口座が見つかっても申請したことにはならず、ファンドごとに書類をそろえた個別の申請が必要になります。見落とされるのはたいてい最初の仕事です。
          <Link href="/ja/blog/how-to-find-lost-superannuation" className={blocks.textLink}>なくしたスーパーを探す方法</Link>もご覧ください。
        </p>
      </Answer>
      <Answer id="from-overseas" heading="帰国後のスーパーアニュエーション申請方法は？日本からでもできますか？" tone="white">
        <p className={blocks.text}>
          できますし、むしろ帰国後でなければ申請できません。スーパーアニュエーション返金のやり方は、ATOのDASPオンライン申請（無料）を使い、ファンドに残っている分はファンドごとに、すでにATOへ移管された分はATOあてに申請する形です。DASPはオーストラリアを完全に出国した後にしか行えない手続きで、書類のやり取りで完結し、日本から進められます。
        </p>
        <p className={blocks.text}>
          スーパーファンドに申請する場合は、海外送金（international money transfer）で日本の口座に受け取れます。手数料がかかる場合があります。一方、すでにATOへ移管された残高は、本人名義のオーストラリアの銀行口座への振込か小切手しか選べません。受け取りが終わるまで、オーストラリアの口座は解約しないでおくのが安全です。受け取った金額の日本での扱いは、日本の税務署や専門家にご確認ください。
        </p>
      </Answer>
      <Answer id="dasp-vs-leaving" heading="今受け取るか、オーストラリアに残しておくか" tone="pale">
        <p className={blocks.text}>
          ワーキングホリデーの方のほとんどは、受け取るほうが有利です。残した残高には新しい拠出が入らない一方、手数料と保険料が引かれ続けます。残った分は最終的にATOへ移管され、運用もされません。
        </p>
        <p className={blocks.text}>
          残す理由があるのは、オーストラリアに戻って定住して働く予定がある場合だけです。待っても65%は下がりません。
          <Link href="/ja/blog/dasp-vs-leaving-super-in-australia-pros-cons" className={blocks.textLink}>
            詳しい比較はこちら
          </Link>
          。
        </p>
      </Answer>
      <Answer id="while-in-australia" heading="オーストラリア滞在中にスーパーを受け取れますか？" tone="white">
        <p className={blocks.text}>
          受け取れません。有効なビザで国内にいる間、スーパーはロックされており、生活が苦しいといった理由での早期引き出しもできません。
        </p>
        <p className={blocks.text}>
          ビザの期限よりかなり早く帰国する場合は、出国後に内務省が残りのビザを取り消すことができ、通常はそのぶん申請の時期が早まります。
        </p>
      </Answer>
      <Answer id="never-claimed" heading="スーパーを受け取らないままだとどうなりますか？" tone="pale">
        <p className={blocks.text}>
          なくなるわけではありません。ビザ失効と出国からおよそ6か月後、未請求の残高はファンドからATOへ移管され、ファンドの手数料や保険料が引かれない形で、名義のまま残ります。数年後の申請でも税率は同じ65%です。
          <Link href="/ja/blog/what-happens-to-unclaimed-super" className={blocks.textLink}>ATOに移管されたスーパーの請求について</Link>もご覧ください。
        </p>
        <p className={blocks.text}>
          失われるのは、移管されるまでの数か月に口座管理手数料と保険料として残高から引かれた分です。残高が小さいほど、割合としては重くなります。
        </p>
      </Answer>
      <Section eyebrow="自分でやる場合" title={<>申請画面のファンド欄は1つ。<Mark>カジュアルの仕事が4つなら、口座も4つです。</Mark></>} titleId="objection-title">
        <p className={`${blocks.text} ${blocks.muted}`}>そのうち2つは、あなたが選ばないまま開設されたものです。</p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="ATOの申請画面" rightLabel="当社の場合" />
        <p className={blocks.statement}>myGovへのログインもID連携も不要です。ATOとは当社が直接やり取りします。</p>
      </Section>
      <Answer id="with-us" heading="スーパーアニュエーション返金は自分で申請するか、代行に任せるか" tone="amber">
        <p className={blocks.text}>ご自身で進めることもできます。その場合に必要になるのは、タックスファイルナンバーに紐づく全口座の調査（ATOが保有している分も含みます）、日本から手配する認証済みコピー、ファンドごとに分かれた個別の申請、そして返答が止まったファンドへの催促です。</p>
        <p className={blocks.text}>
          なお、以下の保証は
          <Link href="/ja/tax-return" className={blocks.textLink}>タックスリターン</Link>
          を対象としたもので、スーパーの申請には適用されません。
        </p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          当社の保証：還付金が当社の料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金します。還付がない場合、またはATOへの納税が発生した場合は、料金の全額をいただきます。この保証の対象は、TFN所得のあるタックスリターンに限られます。
        </p>
        <p className={blocks.text}>ATOへ提出する前に、登録タックスエージェントが確認・承認します。</p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="super" lang="ja" size="md">WhatsAppで相談する</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>返信は約1時間以内。</p>
        </div>
      </Answer>

      <Section title="スーパー受取についてのその他の質問" titleId="faq-title">
        <Accordion items={faqs} />
      </Section>

      <Section tone="pale" title="申請の一部をさらに詳しく" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="次のステップ" title="スーパーと一緒に、タックスリターンも確認しましょう" titleId="next-title">
        <p className={blocks.text}>スーパー（DASP）とタックスリターンは別の手続きです。帰国後でも、未提出の年度のタックスリターンは日本から提出できます。TFNが届く前に45%で源泉徴収された期間などは、タックスリターンでしか精算されません。</p>
        <p className={blocks.text}>
          417・462ビザの方は、ご本人の事情によってはメディケア税を支払う義務がない場合もあります。
          <Link href="/ja/medicare" className={blocks.textLink}>メディケア税の免除について</Link>
          もあわせてご覧ください。
        </p>
        <p className={blocks.text}>
          TFNの番号が分からない場合は<Link href="/ja/tfn" className={blocks.textLink}>TFNのページ</Link>、ABNで請求していた仕事があった場合は<Link href="/ja/abn" className={blocks.textLink}>ABNのページ</Link>もあわせてご覧ください。
        </p>
        <LinkButton href="/ja/tax-return">タックスリターンの流れを見る</LinkButton>
      </Section>

      <Section tone="forest" title="スーパーについて相談する" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>給与から引かれたお金ではなく、雇用主が上乗せで積み立てたお金です。いまもオーストラリアに残っています。</p>
        <WaButton href={WA} position="footer" topic="super" lang="ja" tone="light">WhatsAppで相談する</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>返信は約1時間以内。</p>
      </Section>

      <MobileCta href={WA} lang="ja" topic="super" />
    </>
  )
}
