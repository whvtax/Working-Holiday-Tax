import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { WaButton } from '@/components/wht/WaButton'
import { jaPostTranslations } from '@/app/(ja)/ja/blog/data'
import {
  LeavingAustraliaPage, LinkList, SRC, StepList, StepTable, leavingLanguages, makeGuides,
} from '@/app/(site)/leaving-australia/LeavingAustraliaPage'

/*
 * JA ハブ：オーストラリア出国前と出国後（Plan 3 第2ラウンド、2026年11月24日）。
 * 事実は /leaving-australia と同じ（r16、r13、r14、r20）。ガイドは日本語版がある場合のみリンク。
 * 承認済みの文言のみ使用。
 */

const WA = waUrl({ topic: 'tax-return', lang: 'ja', detail: 'オーストラリアを出国します' })
const G = makeGuides('/ja', s => !!jaPostTranslations[s]?.body, '（英語）')

export const metadata: Metadata = {
  title: { absolute: 'ワーホリ帰国前と帰国後の手続き：タックスリターンとスーパーの順番' },
  description:
    'ワーホリでオーストラリアを出国する前にやること、帰国後に残る手続きを順番にまとめました。タックスリターンはいつ出すか、スーパー（DASP）はいつ請求できるか、銀行口座はいつ解約するか、myGovが使えない時の対処まで、ATOの情報をもとに解説します。',
  keywords: [
    'ワーホリ 帰国 手続き 税金',
    'ワーホリ 帰国前 やること オーストラリア',
    'タックスリターン 帰国後',
    'タックスリターン 帰国前',
    'スーパーアニュエーション 帰国後 請求',
    'DASP 帰国後',
    'オーストラリア 銀行口座 解約 帰国',
    'ワーホリ 帰国 スーパー 返金',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/leaving-australia`,
    languages: leavingLanguages(),
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/leaving-australia`,
    siteName: 'Working Holiday Tax',
    title: 'ワーホリ帰国前と帰国後：タックスリターンとスーパーの順番',
    description: '出国前にやること、帰国後に残る手続き、そしてその順番。',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'ワーホリ帰国前と帰国後の税金とスーパー',
    description: '出国前、帰国後、そして後回しにできること。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const src = (href: string, text: string) => (
  <a href={href} target="_blank" rel="noopener" className={blocks.textLink}>{text}</a>
)

const faqs = [
  {
    question: '帰国前にタックスリターンを提出できますか？',
    answer:
      '一つのケースだけです。オーストラリアを永久に離れ、利子・配当・ロイヤルティ以外のオーストラリアの収入がもうない場合、ATOは会計年度末の6月30日より前の提出を受け付けます。自分で提出する場合は紙の申告書のみで、ATOによると早期申告の処理には50営業日かかります。\n\nそれ以外の方は、7月1日以降にどこからでも提出します。待っても損をすることはありません。',
  },
  {
    question: '帰国後でもタックスリターンは提出できますか？',
    answer:
      'はい。タックスリターンは7月1日から6月30日までの1年分で、7月1日以降ならどの国からでも提出できます。自分で提出する場合の期限は10月31日で、ATOによるとオンライン申告の多くは10営業日以内に処理されます。還付金はオーストラリアの銀行口座に振り込まれます。',
  },
  {
    question: '帰国前にオーストラリアの銀行口座を解約すべきですか？',
    answer:
      'いいえ、還付金とスーパーが入金されるまでは解約しないでください。ATOが還付金を振り込むのはオーストラリアの銀行口座だけで、ATOが保管しているスーパーも、本人名義のオーストラリアの口座か小切手でしか支払われません。\n\nすでに解約している場合、振込は準備銀行（Reserve Bank）を通じてATOに戻り、これに最大10日かかります。新しいオーストラリアの口座情報を届ければそこへ再度振り込まれ、届けなければ小切手で再発行されます。ATOは口座情報を確認する間、一部の小切手を最大90日保留しています。',
  },
  {
    question: '帰国後、スーパーはいつ請求できますか？',
    answer:
      '次の3つがそろった時です。ビザが失効または取り消しで終了していること、オーストラリアを出国していること、ほかに有効なオーストラリアのビザがないこと。ATOのオンライン申請は出国前に作成できますが、提出できるのはその後です。ATOによると、DASPは完全な申請の受領から通常28日以内に支払われます。',
  },
  {
    question: 'スーパーを請求しないとどうなりますか？',
    answer:
      'なくなりはしません。出国から6か月以上たち、ビザも終了していると、ファンドは残高をATOに移します。その後もいつでもDASPとしてATOに請求できますが、ATOが支払うのは本人名義のオーストラリアの口座か小切手だけで、海外送金はできません。',
  },
  {
    question: '帰国後にmyGovは必要ですか？',
    answer:
      '当社にご依頼いただく場合は不要です。ATOとのやり取りは当社が直接行います。ATOのDASPオンライン申請もmyGovのログインを使いません。myGovが必要なのはmyTaxでご自身で提出する場合だけで、そのSMSコードはオーストラリアの携帯番号にしか届きません。',
  },
  {
    question: 'スーパーの請求と税金の還付は同じものですか？',
    answer:
      'いいえ、別々の支払いです。税金の還付は給与から多く源泉徴収された税金で、タックスリターンを提出した後にATOから支払われます。DASPは雇用主が給与とは別に積み立てたスーパーで、ビザ終了後に各ファンドから支払われます。両方が残っている方も多くいます。',
  },
  {
    question: '還付金を日本の口座で受け取れますか？',
    answer:
      'いいえ。ATOは税金の還付金をオーストラリアの銀行口座にしか振り込みません。スーパーは違い、ファンドが海外送金に対応していれば、DASPを日本の口座で受け取れることがあります。ただしATOが保管しているスーパーは、オーストラリアの口座か小切手のみです。',
  },
  {
    question: '何年も前に申告せずに帰国しました。もう遅いですか？',
    answer:
      '遅くありません。期限を過ぎたタックスリターンも提出でき、残したスーパーもATOに請求できます。ATOは提出の遅れにペナルティを科すことができますが、単発の遅れには通常科さないとしています。',
  },
]

const MYGOV_GUIDES = G.list([
  { slug: 'mygov-problems-tax-return-super', label: 'myGovが使えない時：タックスリターンとスーパーの対処法' },
  { slug: 'mygov-sms-code-not-received-overseas', label: '海外でmyGovのSMSコードが届かない' },
  { slug: 'mygov-account-locked-out', label: 'myGovがロックされた' },
  { slug: 'cant-link-ato-to-mygov', label: 'myGovにATOをリンクできない' },
  { slug: 'myid-foreign-passport-working-holiday', label: '外国のパスポートでmyIDを作る' },
  { slug: 'tax-return-without-mygov', label: 'myGovなしでタックスリターンを出す' },
  { slug: 'claim-super-without-mygov', label: 'myGovなしでスーパーを請求する' },
])

const GUIDES = G.list([
  { slug: 'tax-obligations-after-leaving-australia', label: '出国後に残る手続き' },
  { slug: 'early-tax-return-leaving-australia', label: '帰国前の早期申告' },
  { slug: 'how-to-lodge-tax-return-from-overseas', label: '日本からタックスリターンを提出する' },
  { slug: 'how-to-update-address-with-ato', label: 'ATOに登録した住所を変更する' },
  { slug: 'tax-refund-closed-australian-bank-account', label: '口座を解約した後の還付金' },
  { slug: 'tax-and-super-timeline-working-holiday', label: '税金とスーパーの年間スケジュール' },
  { slug: 'how-long-does-dasp-take', label: 'DASP申請にかかる期間' },
  { slug: 'dasp-online-application-problems', label: 'DASPオンライン申請がうまくいかないとき' },
  { slug: 'what-happens-to-unclaimed-super', label: 'ATOに移管されたスーパーを請求する' },
])

export default function LeavingAustraliaJaPage() {
  return (
    <LeavingAustraliaPage
      lang="ja"
      inLanguage="ja-JP"
      path="/ja/leaving-australia"
      homeHref="/ja"
      crumb={{ home: 'ホーム', current: '帰国前と帰国後の手続き', label: 'パンくずリスト' }}
      wa={WA}
      name="ワーホリ帰国前と帰国後：タックスリターンとスーパーの順番"
      hero={{
        eyebrow: <>帰国 &middot; タックスリターン &middot; スーパー</>,
        title: <>ワーホリ帰国前と帰国後：<Mark>タックスリターンとスーパー</Mark>の順番</>,
        lead: <>出国前には、オーストラリアの銀行口座を残し、ATOに登録した住所を変更し、スーパーの申請を作成しておきます。帰国後は、6月30日に会計年度が終わってからタックスリターンを提出し、ビザが終了してからスーパー（DASP）の申請を出します。当社にご依頼いただく場合はどちらもmyGovは不要で、すでに帰国していても手遅れではありません。</>,
        sub: <>タックスリターンとスーパーは、別々の手続きで、スケジュールも別です。税金の還付はATOから、オーストラリアの銀行口座にだけ振り込まれます。スーパーは各ファンドから、完全な申請から通常28日以内に支払われ、海外送金に対応しているファンドなら日本の口座でも受け取れます。</>,
        cta: '出国前に相談する',
        hint: '手続きの順番を見る',
        hintHref: '#order',
        note: '返信は約1時間以内。',
      }}
      sections={[
        {
          id: 'before-you-fly',
          title: '出国前にやっておくことは？',
          tone: 'pale',
          body: (
            <>
              <p className={blocks.text}>6つあります。ほとんどが数分で終わり、どれも日本に戻ってからより、オーストラリアにいるうちの方が簡単です。</p>
              <StepList items={[
                {
                  title: 'オーストラリアの銀行口座は残しておく。',
                  body: <>ATOは税金の還付金をオーストラリアの銀行口座にしか振り込まず、ATOが保管しているスーパーも、本人名義のオーストラリアの口座か小切手でしか支払いません。解約はすべて入金されてからにしましょう。すでに解約した方は{G.link('tax-refund-closed-australian-bank-account', '口座を解約した後の還付金')}をご覧ください。</>,
                },
                {
                  title: '最後の給与明細と、働いた職場の一覧を残す。',
                  body: <>給与計算で支払いを受けた職場はすべて、所得をATOに報告しているので、給与明細をなくしても大きな問題ではありません。ただ、どこでいつごろ働いたかの一覧があれば、抜けている仕事にすぐ気づけて、スーパーのファンドもすべて見つけられます。</>,
                },
                {
                  title: 'ATOに登録した住所を変更する。',
                  body: <>課税通知書（Notice of Assessment）や小切手などの郵便は、ATOに登録された住所に届きます。やり方は{G.link('how-to-update-address-with-ato', 'ATOの住所変更')}へ。当社でタックスリターンを作成する場合は、ATOの住所変更も当社で行います。</>,
                },
                {
                  title: '早期申告ができるか確認する。',
                  body: <>6月30日より前の提出をATOが受け付けるのは、オーストラリアを永久に離れ、利子・配当・ロイヤルティ以外のオーストラリアの収入がもうない場合だけです。自分で出すなら紙の申告書のみで、ATOによると処理には50営業日かかります。それ以外の方は7月1日以降に提出します。詳しくは{G.link('early-tax-return-leaving-australia', '帰国前の早期申告')}。</>,
                },
                {
                  title: 'スーパーの申請を作成しておく。',
                  body: <>ATOのDASPオンライン申請は出国前に作成・保存でき、出国してビザが終了したら提出できます。1つのファンドに5,000ドル以上ある場合、ファンドが本人確認書類の認証済みコピーを求めることがあり、その手配は日本からよりオーストラリアにいるうちの方が簡単です。</>,
                },
                {
                  title: 'myGovを自分で使うなら、海外からのログイン方法を整える。',
                  body: <>myGovのSMSコードはオーストラリアの携帯番号にしか届きません。海外にいる場合やオーストラリアの番号がない場合、ATOはmyID、パスキー、認証アプリを勧めています。当社にご依頼いただく場合は、どれも不要です。</>,
                },
              ]} />
              <p className={blocks.small}>
                出典：ATO {src(SRC.earlyLodge, '出国前の提出')}、{src(SRC.fromOverseas, '海外からの提出')}、{src(SRC.dasp, 'DASP')}、{src(SRC.mygov, 'myGovアカウントの作成とATOのリンク')}。2026年11月確認。
              </p>
            </>
          ),
        },
        {
          id: 'after-you-leave',
          title: '帰国後に残る手続きは？',
          body: (
            <>
              <p className={blocks.text}>3つです。出国した年度のタックスリターン、スーパー、そして6か月たっても請求していないスーパー。どれも日本から手続きできます。</p>
              <h3 className={blocks.cardTitle}>タックスリターン：6月30日のあと</h3>
              <p className={blocks.text}>
                オーストラリアの会計年度は6月30日に終わります。7月1日からはどの国からでも提出でき、自分で提出する場合の期限は10月31日です。ATOによるとオンライン申告の多くは10営業日以内に処理され、還付金はオーストラリアの口座に振り込まれます。ワーキングホリデーメーカーとしての給与以外の収入があった場合、課税所得が45,001ドル以上の場合、控除を申請したい場合は、提出が必要です。日本からの進め方は{' '}
                <Link href="/ja/tax-return" className={blocks.textLink}>タックスリターンの流れ</Link>と{G.link('how-to-lodge-tax-return-from-overseas', '日本からの提出')}をご覧ください。
              </p>
              <h3 className={blocks.cardTitle}>スーパー（DASP）：ビザが終了してから</h3>
              <p className={blocks.text}>
                ビザが失効または取り消しで終了し、オーストラリアを出国していて、ほかに有効なオーストラリアのビザがなければ請求できます。ファンドごとに別の申請で、完全な申請から通常28日以内に支払われ、ワーキングホリデーメーカーは課税対象部分の65%が源泉徴収されます。2026年7月1日以降の給与では、雇用主は給与支払いから7営業日以内に最後の拠出金をファンドに届ける必要があります（一部例外あり）。提出前にファンドの記録で入金を確認しましょう。手順は{' '}
                <Link href="/ja/superannuation" className={blocks.textLink}>スーパーアニュエーション返金のやり方</Link>、申請が進まない時は{G.link('dasp-online-application-problems', 'DASPオンライン申請がうまくいかないとき')}へ。
              </p>
              <h3 className={blocks.cardTitle}>ATOに移ったスーパー：6か月のあと</h3>
              <p className={blocks.text}>
                請求しないまま出国から6か月以上たち、ビザも終了していると、ファンドは残高をATOに移します。その後もいつでもDASPとして請求できますが、ATOが支払うのは本人名義のオーストラリアの口座か小切手だけです。詳しくは{G.link('what-happens-to-unclaimed-super', '未請求のスーパー')}。
              </p>
              <p className={blocks.small}>
                出典：ATO {src(SRC.progress, 'タックスリターンの処理状況')}、{src(SRC.dasp, 'DASP')}、{src(SRC.atoHeld, 'ATOが保管するスーパー')}、{src(SRC.paydaySuper, 'Payday Super')}。2026年11月確認。
              </p>
            </>
          ),
        },
        {
          id: 'order',
          title: 'どの順番で進めればいい？',
          tone: 'pale',
          body: (
            <>
              <p className={blocks.text}>出国前に作成できるスーパーが先、年度が終わってからタックスリターン、銀行口座の解約は最後です。</p>
              <StepTable
                head={['いつ', 'やること']}
                rows={[
                  { when: '最後の勤務の前', what: '働いた職場をすべて書き出し、最後の給与明細を残す。' },
                  { when: '出国前', what: 'ATOの住所を変更し、オーストラリアの口座を残し、DASP申請を作成・保存する。5,000ドル以上のファンドがあれば認証済みコピーを用意する。' },
                  { when: '最後の給与日から7営業日以内', what: '最後のスーパー拠出金がファンドに届くはず（Payday Super、2026年7月1日以降の給与、一部例外あり）。' },
                  { when: '出国してビザが終了した後', what: 'DASP申請を提出する。支払いはファンドごとに別々です。完全な申請から通常28日以内に支払い。' },
                  { when: '7月1日から', what: '出国した年度のタックスリターンを提出する。自分で出す場合の期限は10月31日。' },
                  { when: 'オンラインで提出した後', what: 'ATOによるとオンライン申告の多くは10営業日以内に処理。還付金はオーストラリアの口座へ。' },
                  { when: '出国から6か月以上、ビザ終了', what: '未請求のスーパーがATOに移る。請求は可能で、支払いはオーストラリアの口座か小切手のみ。' },
                  { when: 'すべて入金されたら', what: 'オーストラリアの銀行口座を解約する。' },
                ]}
                caption={<>6月30日より前に永久に出国し、その後オーストラリアの収入がない場合は、紙での早期申告もできます（ATOによると50営業日）。1年分の日付は{G.link('tax-and-super-timeline-working-holiday', '税金とスーパーの年間スケジュール')}にまとめています。</>}
              />
            </>
          ),
        },
        {
          id: 'no-mygov',
          title: '帰国後にmyGovは必要？',
          body: (
            <>
              <p className={blocks.text}>
                いいえ。当社にご依頼いただく場合、myGovへのログインは必要ありません。ATOとのやり取りは当社が直接行います。ATOのDASPオンライン申請もmyGovのログインを使わず、個人情報、パスポート、メールアドレスを入力するだけで、TFNの入力は任意です。
              </p>
              <p className={blocks.text}>
                myGovが関係するのは、myTaxでご自身で提出する場合だけです。つまずきの多くは、オーストラリアの携帯番号にしか届かないSMSコードから始まります。すでにログインできない方は、状況ごとのガイドをご覧ください。
              </p>
              <LinkList items={MYGOV_GUIDES} />
            </>
          ),
        },
        {
          id: 'with-us',
          title: '当社がお手伝いできること',
          tone: 'amber',
          body: (
            <>
              <p className={blocks.text}>
                どこで働いたか、いつ出国するかを送ってください。年度が終わったら{' '}
                <Link href="/ja/tax-return" className={blocks.textLink}>タックスリターン</Link>を作成し、ATOの住所も変更します。{' '}
                <Link href="/ja/superannuation" className={blocks.textLink}>スーパー</Link>については、TFNに紐づくファンドをすべて探し、申請内容を一緒に確認します。
              </p>
              <p className={blocks.text}>
                myGovは不要です。ATOとのやり取りは当社が直接行います。ATOへ提出する前に、登録タックスエージェントが確認・承認します。Working Holiday Taxは、オーストラリアの登録タックスエージェントの監督のもとで運営しています。
              </p>
              <div className={blocks.stack}>
                <WaButton href={WA} position="section" topic="tax-return" lang="ja" size="md">WhatsAppで相談する</WaButton>
                <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>返信は約1時間以内。</p>
              </div>
            </>
          ),
        },
      ]}
      faqTitle="帰国前と帰国後によくある質問"
      faqs={faqs}
      guidesTitle="手続きごとに詳しく"
      guides={GUIDES}
      cta={{
        title: '出国前に相談する',
        text: 'どこで働いたかと出国日を送ってください。今やっておくべきことと、帰国後でよいことをお伝えします。',
        button: 'WhatsAppで相談する',
        note: '返信は約1時間以内。',
      }}
    />
  )
}
