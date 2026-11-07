import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { LinkButton } from '@/components/wht/Button'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'
import { RateTable } from '@/components/wht/CountryBlocks'

// ─── METADATA ───────────────────────────────────────────────────────────
// このページが扱うのは「収入の切り分け」です。ABNがタックスリターンの
// 中身をどう変えるか。料金は記載せず、当社自身が登録税理士であるとも
// 書きません。
export const metadata: Metadata = {
  // ルートレイアウトが " | Working Holiday Tax" を付与するため、
  // タイトルはモバイルの検索結果に収まる長さにしています。
  title: 'ワーホリのABN取得方法｜必要か、登録、税金まで',
  description:
    'ワーホリでもABNは取れますが、雇用の仕事には使えません。登録はABRで無料、11桁の番号です。必要かの判断、GST、タックスリターンへの影響まで、登録前に確認します。',
  keywords: [
    'ABN 登録 オーストラリア',
    'ABN ワーホリ',
    'ABN ワーキングホリデー',
    'ABN 申請 オーストラリア',
    'ワーホリ 個人事業主 オーストラリア',
    'ABN 417ビザ',
    'ABN 462ビザ',
    'ABN タックスリターン',
    'ABN TFN 違い',
    'ABN 必要 ワーホリ',
    'ABN 経費 ワーホリ',
    'GST 75000ドル ABN',
    'Uber ABN GST 登録',
    '雇用 個人事業主 違い オーストラリア',
    'ABN 取得 方法',
    'ABN 取り方 ワーホリ',
    'ABN 申請 代行',
    'ABN 登録 無料',
    'ABN 47% 源泉徴収',
    'Uber Eats ABN ワーホリ',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/abn`,
    languages: {
      'en-AU': `${SITE_URL}/abn`,
      de: `${SITE_URL}/de/abn`,
      ja: `${SITE_URL}/ja/abn`,
      ...newLocaleLanguages('/abn'),
      'x-default': `${SITE_URL}/abn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-abn.png`, width: 1200, height: 630, alt: 'ワーキングホリデーのABN登録' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/abn`,
    siteName: 'Working Holiday Tax',
    title: 'ワーホリのABN取得方法｜必要か、登録、税金まで',
    description:
      'ABNは仕事を変えません。変えるのはタックスリターンです。請求収入、必要経費、GST、そして雇用か個人事業主かという問い。',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-abn.png`],
    card: 'summary_large_image',
    title: 'ワーホリのABN取得方法｜必要か、登録、税金まで',
    description: 'ABNは仕事を変えません。変えるのはタックスリターンです。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

const THE_SPLIT = [
  {
    n: '01',
    title: '源泉徴収がないので、税金はあとから残ります',
    body: '給与は税金が引かれた状態で届きますが、請求書はそうではなく、税金は年度末に一度に精算します。同じ年でも、給与の側は還付に傾き、請求書の側は納税に傾きます。',
  },
  {
    n: '02',
    title: '控除は「必要経費」に変わり、ルールも変わります',
    body: '被雇用者は仕事関連の支出を控除し、個人事業主は事業の費用を差し引きます。範囲は広く、求められる記録は厳しくなります。',
  },
  {
    n: '03',
    title: 'GSTは手続きではなく、選んだ立場です',
    body: 'ほとんどのワーホリの方は売上75,000ドルの基準に届かないため、本来は登録しないのが自然です。例外がライドシェアです。立場を間違えると、不要なBASの義務が生じるか、必要な登録が抜けます。',
  },
  {
    n: '04',
    title: 'そもそも個人事業主だったのかどうか',
    body: 'この問いが他の3つを決めます。本当に請負だったかどうかは書類上の名目ではなく指揮命令で決まり、実態は雇用なのにABNで働くことが、ワーホリの申告がやり直しになる原因のひとつです。',
  },
]

const WHAT_WE_DO = [
  {
    title: '取得前に、そもそも必要かを確認します',
    body: '本来は雇用だった仕事のためにABNを登録している方が少なくありません。これはフォームではなく、会話で決めることです。',
  },
  {
    title: '実際の業務内容に合わせて登録を準備します',
    body: '登録した事業内容は、GST、控除、申告まで付いて回ります。',
  },
  {
    title: '取り分けておく金額をお伝えします',
    body: '請求収入に対して年度末にいくらかかるかの目安です。請求書を見て驚かないために。',
  },
  {
    title: '残しておくべき記録をお伝えします',
    body: 'あなたの仕事で控除を実際に裏づける記録はどれか、逆にもう集めなくていい領収書はどれか。',
  },
  {
    title: 'GSTの立場は意識的に決めます',
    body: 'ルールが求めるから登録する、求めないから登録しない。なんとなく、にはしません。',
  },
  {
    title: '両方の収入を1つの申告にまとめます',
    body: '請求収入にかかる税金と、給与からすでに引かれた税金は、同じ申告の中で合わせて計算されます。',
  },
]

// 55語を超える回答には空行を入れ、下のFAQは段落ごとに<p>を出す。faqLdは
// 元の文字列をそのまま使うので、構造化データは変わらない。
const FAQS = [
  {
    question: 'ワーキングホリデービザでもABNは取れますか？',
    answer:
      '取れます。ABRが示す資格の基準は、オーストラリアで事業を行っている、または始めようとしているかどうかです。ただし雇用されて行う仕事にABNを使う資格はなく、雇用主が雇用の条件としてABNを求めるべきでもありません。',
  },
  {
    question: 'ワーホリがABNで働くデメリットは何ですか？',
    answer:
      '請求書から税金が源泉徴収されないため、年度末に納税が残りやすくなります。雇用であれば付いてくる最低賃金や割増賃金、労災保険の保護も、請負には原則としてありません。\n\n加えて、必要経費の記録を自分で残し、GSTが必要かを判断し、事業をやめたらABNを取り消す手間が増えます。実態が雇用なのにABNを求められている場合は、登録する前にご相談ください。',
  },
  {
    question: 'ABNの登録にお金はかかりますか？',
    answer:
      '政府のABR（オーストラリア事業者登録簿）を通せば無料です。問題がなければ申請を終えた時点で11桁の番号が発行され、確認に回った場合はABRが20営業日以内の審査を目標にしています。',
  },
  {
    question: '普通のシフト勤務なのに雇用主からABNを求められました。正しいですか？',
    answer:
      'たいていは正しくありません。登録する前に確認する価値があります。シフトを組まれ、作業方法を指示され、道具を支給され、早く帰らされることがあるなら、書類上の名目がどうであれ、実態としては被雇用者として扱われています。\n\nABNに切り替えることでコストはあなたに移ります。源泉徴収なし、スーパーアニュエーションなし、労災保険なし、最低賃金や割増賃金の保護もなしです。何かを承諾する前に求人の詳細をお送りください。',
  },
  {
    question: 'ABNを持たずに請負で働くと、どうなりますか？',
    answer:
      '請求書にABNがないと、支払う側は原則として報酬の47%を源泉徴収します。差し引かれた分はタックスリターンで精算されますが、それまで手元のお金が大きく減ります。',
  },
  {
    question: 'ワーキングホリデービザでGSTの登録は必要ですか？',
    answer:
      '年間売上が75,000ドルに達する場合、またはライドシェアを運転する場合だけです。ほとんどのワーキングホリデーメーカーはこの金額に届きません。UberやDiDiなどの配車サービスを運転する方は、売上に関係なく、最初の乗車の前にGST登録が必要です。\n\nフードデリバリーや宅配の配達員にこのルールは適用されず、75,000ドルの基準になります。登録すると四半期ごとのBAS（事業活動報告）の提出義務が付いてきます。',
  },
  {
    question: 'TFNとABNの両方を持つことはできますか？',
    answer:
      'できますし、請負で働くワーキングホリデーメーカーの多くは最終的に両方を持っています。タックスファイルナンバーは被雇用者としてのあなたを、ABNは個人事業主としてのあなたをカバーします。\n\n申告が2つに分かれるわけではありません。1つの申告が1つの年度をカバーし、その中で両方を報告します。ABNの申請ではTFNがあると本人確認が早く進むため、先にTFNを取得しておくのがおすすめです。',
  },
  {
    question: 'ABNで働くと、スーパーはもらえなくなりますか？',
    answer:
      '必ずしもそうではありません。ATOは、主に労働の対価として支払われる請負契約なら、ABNがあってもスーパーの対象として被雇用者扱いになるとしています。帰国後の受け取りについては、スーパーアニュエーションのページをご覧ください。',
  },
  {
    question: 'ABNがあると、タックスリターンはどう変わりますか？',
    answer:
      '給与は税金が引かれた状態で支払われ、雇用主がインカムステートメントをATOに提出するため、この部分はおおむね自動的に整合します。\n\nABNで請求した収入は税引き前で入金され、事業収入として申告し、証拠を示せる費用の分だけ圧縮できます。そこにGSTの扱いと、「本当に請負だったのか」という問いが重なり、それでも両方が1つの申告に載ります。',
  },
  {
    question: 'ABNの必要経費として何が控除できますか？',
    answer:
      'その収入を得るためにかかった費用です。私用と兼用のものは正直に按分します。\n\n配達員であれば、きちんと記録した走行距離、自転車や車の維持費、携帯電話と通信費、保険、装備、そしてプラットフォームが差し引いた手数料が中心になります。建設現場の下請けであれば、工具、保護具、現場間の移動です。\n\n含まれないのは、オーストラリアへの渡航費、自宅から1か所の職場への通常の通勤、そして記録を示せないものすべてです。',
  },
  {
    question: 'オーストラリアを離れるとき、ABNはどうなりますか？',
    answer:
      '事業をやめた時点で取り消します。ABNが有効なままだと、ATOから見て事業を続けており、義務も続いている状態に見えるためです。\n\n取り消しても、働いた年度の申告義務がなくなるわけではなく、同じ期間の雇用収入から生じるスーパーアニュエーションの受け取りにも影響しません。帰国が近い場合は早めにお知らせください。取り消し、申告、スーパー申請の順番が重要になります。',
  },
  {
    question: '自分で申告することはできますか？',
    answer:
      'ご自身でできますし、1年間がすべて給与だけだったのなら簡単です。\n\nABNが入った時点で簡単ではなくなります。給与と請求収入の境界線をどこに引くのか、そもそも請負だったのか、どの費用を請求収入から差し引き、その裏づけに何を残すのか、そしてGSTの登録が必要だったのか。いずれも入力欄ではなく、あなたの1年についての判断です。',
  },
]

const GUIDES = [
  {
    href: '/ja/blog/how-to-register-for-an-abn',
    title: 'ABN登録の資格',
    desc: '資格があるのは誰か、申請が止まる理由、登録すべきでないとき。',
  },
  {
    href: '/ja/blog/employee-vs-contractor-australia',
    title: '雇用か、個人事業主か',
    desc: 'ATOが実際に使う判断基準と、間違った側にいる代償。',
  },
  {
    href: '/ja/blog/uber-doordash-rideshare-abn-working-holiday',
    title: 'Uber Eats・DoorDash・ライドシェアのABN',
    desc: '配達員とドライバーのABN、税金、GSTのルールの違い。',
  },
  {
    href: '/ja/blog/gst-and-abn-for-working-holiday-makers',
    title: 'GSTとABN',
    desc: '75,000ドルの基準、ライドシェアの例外、登録すると何が生じるか。',
  },
  {
    href: '/ja/blog/abn-deductions-business-expenses',
    title: 'ABNの必要経費',
    desc: '個人事業主が仕事の種類ごとに何を控除できるか、必要な記録まで。',
  },
  {
    href: '/ja/blog/how-to-cancel-your-abn',
    title: '帰国前のABN取り消し',
    desc: 'いつ、どこで取り消すか。申告とスーパーとの順番。',
  },
]

const KEY_FACTS: string[][] = [
  ['ABNの桁数', '11桁（出典：business.gov.au）'],
  ['登録費用', '政府のABR経由なら無料（出典：business.gov.au）'],
  ['発行までの時間', '問題がなければ申請完了時にすぐ発行。確認に回った場合、ABRは20営業日以内の審査を目標にしています（出典：ABR）'],
  ['申請に必要なもの', '事業形態、本人確認書類、事業内容の詳細。TFNがあると本人確認が早く進みます（出典：business.gov.au、ABR）'],
  ['GST登録の基準', '年間売上75,000ドル（出典：ATO）'],
  ['ライドシェア（Uber、DiDiなど）', '売上に関係なく、最初の乗車の前にGST登録が必要（出典：ATO）'],
  ['ABNを伝えずに請求した場合', '支払う側が報酬の47%を源泉徴収（出典：ATO）'],
  ['労働の対価が中心の請負契約', 'ABNがあってもスーパー（12%）の対象として被雇用者扱い（出典：ATO）'],
]

const NEED_TABLE: string[][] = [
  ['カフェ、レストラン、ホテルのシフト', '不要。ロスターを組まれ、指示を受けて働くなら被雇用者です'],
  ['ファームのピッキング、パッキング', '通常は不要。時給でも出来高でも、指示を受けて働くなら雇用です。ABNを求められたら登録前にご相談ください'],
  ['Uber、DiDiなどライドシェアの運転', '必要。ABNに加えて、最初の乗車の前にGST登録が必要です'],
  ['Uber Eatsなどフードデリバリー、宅配', '請負なら必要。GSTは年間売上75,000ドルの基準で判断します'],
  ['建設現場の下請け、清掃', '実態次第。時間、進め方、道具、リスクを誰が決めるかで判断します'],
  ['翻訳、デザインなど自分で受けるフリーランス', '対象になりうる。自分の事業として複数の取引先に請求しているかがポイントです'],
]

const HOW_IT_WORKS = [
  {
    n: '01',
    title: '仕事の内容をWhatsAppで送る',
    body: '誰に請求するのか、何をするのか、道具は誰が用意するのか、どう支払われると言われているか。',
  },
  {
    n: '02',
    title: 'ABNが本当に必要かを確認する',
    body: '実態が雇用なら、登録はおすすめしません。その場合は雇用として働くための次の一歩をお伝えします。',
  },
  {
    n: '03',
    title: '実際の業務内容でABRへの登録を準備する',
    body: '登録自体は無料です。登録した事業内容は、GST、控除、申告まで付いて回ります。',
  },
  {
    n: '04',
    title: '登録後の準備をそろえる',
    body: '請求書に載せる項目、残す記録、税金のために取り分けておく目安、GSTの立場を決めます。',
  },
  {
    n: '05',
    title: '帰国前に取り消しと申告の順番を決める',
    body: '事業をやめたらABNは取り消します。働いた年度のタックスリターンとスーパーの受け取りは、その後も続きます。',
  },
]

// ここにあったmyGovとの比較表は削除した。4行はそれぞれTHE_SPLITと
// WHAT_WE_DOの繰り返しで、請負か雇用かの行にいたっては独立した
// セクションがある。「myGovにログインすることはありません」という約束は、
// WHAT_WE_DOセクションの末尾に移した。

const WA_ABN = waUrl({ topic: 'abn', lang: 'ja' })

export default function ABNPageJA() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/ja/abn#webpage`,
    url: `${SITE_URL}/ja/abn`,
    name: 'ワーホリのABN取得方法：必要か、登録、税金への影響',
    description:
      'ワーキングホリデー（417・462ビザ）のABN申請。必要かどうかの判断、ABRでの無料登録、GSTの基準、源泉徴収のない収入とタックスリターンへの影響。',
    dateModified: '2026-11-05',
    mainEntity: { '@id': `${SITE_URL}/ja/abn#service` },
    inLanguage: 'ja',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/ja/abn#service`,
    name: 'ワーキングホリデー向けABN登録代行',
    serviceType: 'オーストラリアビジネスナンバー登録',
    description:
      '417・462ビザ保持者向けのABN登録サポート。ABNが本当に必要かを登録前に確認し、実際の業務内容に合わせてABRへの登録を準備し、GSTの立場、残す記録、取り分ける税金の目安、ABN所得のあるタックスリターンまでを整理します。',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'オーストラリア' },
    audience: { '@type': 'Audience', audienceType: '個人事業主として働くワーキングホリデーメーカー（サブクラス417・462）' },
    availableLanguage: ['ja', 'en', 'de', 'fr', 'it', 'es'],
    inLanguage: 'ja',
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
      { '@type': 'ListItem', position: 2, name: 'ABN申請・登録', item: `${SITE_URL}/ja/abn` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      {/* SEO (Oct 2026): the kicker sits inside the H1 so the heading carries the query words people type. */}
      <div className={blocks.underHeader}>
        <Crumbs homeHref="/ja" home="ホーム" current="ABN申請・登録" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>ワーホリのABN取得方法・登録｜417・462ビザ</span>
            ABNは仕事を変えません。<br />
            変えるのは<Mark>タックスリターン</Mark>です。
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              ABN（オーストラリアビジネスナンバー）は、個人事業主として請負で働く人が使う11桁の番号です。登録は政府のABR（オーストラリア事業者登録簿）で無料です。ただし雇用されて働く仕事にABNは使えません。取得すると、源泉徴収のない収入、必要経費、GSTの判断がタックスリターンに加わります。ABNの収入にも給与と同じワーキングホリデーメーカーの税率（45,000ドルまで15%）がかかり、請求書から源泉徴収されない分は年度末のタックスリターンで納めます。
            </Lead>
          </div>
          <WaButton href={WA_ABN} position="hero" topic="abn" lang="ja">ABNが必要か、WhatsAppで確認する</WaButton>
          <p className={heroStyles.note}>約1時間で返信します。</p>
          <GoogleRating variant="pill" lang="ja" />
        </Hero>
        <PhotoBand page="abn" locale="ja" />
      </div>

      <Section tone="pale" eyebrow="要点" title="ワーホリのABN、数字で見る要点（2026年11月時点）" titleId="facts-title">
        <RateTable caption="ABNの基本" rows={KEY_FACTS} />
        <p className={`${blocks.small} ${blocks.muted}`}>
          数字は各公的機関の公開情報にもとづき、2026年11月に確認しています。
        </p>
      </Section>

      <Section title="ワーホリにABNは必要？仕事別の早見表" titleId="need-title">
        <p className={blocks.text}>
          ABNが必要かどうかは、ビザではなく働き方で決まります。ABRは、雇用されて行う仕事にABNを使う資格はなく、雇用主が雇用の条件としてABNを求めるべきではないとしています。
        </p>
        <RateTable caption="仕事別：ABNは必要か" rows={NEED_TABLE} />
        <p className={blocks.text}>
          この表で判断がつかない場合は、仕事の内容をそのままWhatsAppで送ってください。必要かどうかをお伝えします。
        </p>
        <WaButton href={WA_ABN} position="section" topic="abn" lang="ja">WhatsAppで仕事の内容を送る</WaButton>
      </Section>

      <Section eyebrow="収入の切り分け" title="ABNを持つと、申告の何が変わりますか。" titleId="split-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          変わるのは4つで、互いに影響し合います。源泉徴収のない収入、必要経費、GSTの立場。その3つの下に、あなたは本当に個人事業主だったのかという問いがあります。
        </p>
        <Steps items={THE_SPLIT} />
      </Section>

      <Section title="ABNの税金はいくら？税率と取り分けておく金額" titleId="tax-title">
        <p className={blocks.text}>
          ABNで得た収入にも、給与と同じワーキングホリデーメーカーの税率がかかります。給与と合算した課税所得のうち45,000ドルまでが15%、45,001ドルから135,000ドルまでが30%です（2026-27年度、出典：ATO）。税率がかかるのは、請求した金額から事業の必要経費を差し引いたあとの所得です。
        </p>
        <p className={blocks.text}>
          違いは払うタイミングです。請求書の入金からは何も源泉徴収されないため、その分の税金は年度末のタックスリターンでまとめて精算します。入金のたびに一部を別の口座に取り分けておくと、査定のときに慌てずに済みます。どれくらい取り分けるかの目安は、仕事の内容と給与の有無によって変わるため、個別にお伝えします。
        </p>
      </Section>

      <Section tone="pale" title="雇用主に言われたという理由でABNを登録すべきですか。" titleId="warn-title">
        <p className={blocks.text}>
          
            誰かが仕事の中身を見るまでは、登録すべきではありません。実態は雇用なのにABNにすると、スーパーアニュエーションが積み立てられず、税金も源泉徴収されず、労災保険の対象から外れ、最低賃金や割増賃金の枠組みの外に出て、そのすべてがあなたの負担になります。ファーム、飲食、清掃、建設現場ではよくあることです。
          
        </p>
        <p className={blocks.text}>
          
            判断の基準は書類ではなく指揮命令です。働く時間を誰が決めるか、進め方を誰が指示するか、道具を誰が用意するか、うまくいかなかったときのリスクを誰が負うか。答えが相手を指しているなら、ABNは適切な手段ではありません。
          
        </p>
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>登録する前に、その仕事の内容をお送りください。</strong>
          作業の中身、誰が何を用意するか、どう支払われると言われているか。どちらに当たるかをお伝えします。
        </p>
      </Section>

      <Section eyebrow="当社の作業" title="当社が行うこと" titleId="work-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          登録そのものは無料で、数分で終わります。それがいくらの負担になるかを決めるのは、その前と後にあることです。
        </p>
        <div className={tb.pairs}>
          {WHAT_WE_DO.map(c => (
            <div key={c.title} className={blocks.palePanel}>
              <h3 className={blocks.cardTitle}>{c.title}</h3>
              <p className={blocks.text}>{c.body}</p>
            </div>
          ))}
        </div>
        <p className={blocks.statement}>
          myGovにログインすることも、IDを連携することも、どの書類がどれかを調べることもありません。ATOとは当社が直接やり取りします。
        </p>
        <p className={blocks.text}>
          ABNもTFNもまだお持ちでない場合は、
            <Link href="/ja/tfn" className={tb.inlineLink}>先にTFNを</Link>
            取得しておくのが近道です。ABRは、TFNで本人確認ができると申請の処理が早くなるとしています。
        </p>
      </Section>

      <Section tone="pale" eyebrow="流れ" title="ABNの取得方法と登録の流れ" titleId="steps-title">
        <Steps items={HOW_IT_WORKS} />
        <p className={`${blocks.small} ${blocks.muted}`}>
          そもそも登録する資格があるのか、登録すべきでないのはどんなときかは
          <Link href="/ja/blog/how-to-register-for-an-abn" className={tb.inlineLink}>ABN登録の資格と、登録すべきでないとき</Link>
          にまとめています。
        </p>
      </Section>

      {/* The one amber band: the guarantee. */}
      <Section tone="amber" title="当社の料金" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          ABN所得のあるタックスリターンの料金は、GST込みの定額385ドルです。返金保証の対象は、TFN所得のあるタックスリターンに限られます。
        </p>
        <p className={blocks.text}>料金は定額制で、還付額に対する歩合ではありません。</p>
      </Section>

      <Section tone="pale" title="ワーキングホリデーの税金だけを扱っています。" titleId="trust-title">
        <p className={blocks.text}>
          だからこそ、同じABNの形を何度も見ています。ファームの請負契約、配達プラットフォーム、全員を下請け扱いにする建設現場。
        </p>
        <p className={blocks.text}>
          当社は登録タックスエージェントの監督のもとで運営しています。当社では、当チームが申告書を作成し、提出前に登録タックスエージェントが確認し署名します。
        </p>
        <GoogleReviewsServer lang="ja" />
      </Section>

      <Section title="ワーホリのABNでよくある質問" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="ガイド" title="申請、請負、GST、帰国前の手続きをさらに詳しく" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="次のステップ" title="どちらの収入も1つの申告に載ります" titleId="next-title">
        <p className={blocks.text}>給与所得と請求収入は、同じ年度の同じタックスリターンに載せます。切り分けがきちんと行われるかどうかは、そこで決まります。</p>
        <div className={blocks.stack}>
          <LinkButton href="/ja/tax-return" size="md">タックスリターンの流れ →</LinkButton>
          <LinkButton href="/ja/tfn" size="md">TFN申請 →</LinkButton>
          <LinkButton href="/ja/superannuation" size="md">帰国後のスーパー受け取り →</LinkButton>
        </div>
      </Section>

      {/* Closing CTA, forest band. */}
      <Section tone="forest" title="その仕事の内容を教えてください" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          次の4つを送ってください。①誰に請求書を出すのか　②どんな仕事をするのか　③道具や車は誰が用意するのか　④時給、出来高、1件いくらなど、どう支払われると言われているか。それだけで、ABNが必要な話かどうか、必要ならGSTをどうするかまでお伝えできます。
        </p>
        <WaButton href={waUrl({ topic: 'abn', lang: 'ja', tier: 'tfn-abn' })} position="section" topic="abn" lang="ja" tier="tfn-abn" tone="light">WhatsAppで相談する</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>約1時間で返信します。</p>
      </Section>

      <MobileCta href={WA_ABN} lang="ja" topic="abn" />
    </>
  )
}
