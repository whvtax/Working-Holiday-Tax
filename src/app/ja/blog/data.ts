/**
 * Japanese blog data
 *
 * Contains Japanese translations for:
 *   - UI strings (search, pagination, "Read more", etc.)
 *   - Category metadata (titles, descriptions, intros, FAQs)
 *   - Per-post translations (title, description, optionally body)
 *
 * Posts without Japanese body translations fall back to English with a notice.
 *
 * Strategy: SEO-optimized for the Japanese WHV community search patterns.
 * - "タックスリターン" not "確定申告" (community standard)
 * - "オーストラリア税務署" not "国税局"
 * - "メディケア税" not "メディケア・レビー"
 * - "スーパー返金" / "スーパーアニュエーション返金"
 */
import type { Category, CategoryMeta, Guide } from '@/app/blog/data'
import { categoryMeta as enCategoryMeta, guides as enGuides } from '@/app/blog/data'

// ─── UI STRINGS ────────────────────────────────────────────────────────────
export const blogUI = {
  // Hero
  breadcrumbHome:      'ホーム',
  breadcrumbBlog:      'ブログ',
  blogLabel:           'ブログ',
  h1Line1:             'オーストラリアの税金のことを',
  h1Line2:             'まるごと解説',
  description:         'TFN、タックスリターン、スーパー返金、ABN — ワーキングホリデーで役立つ実用記事を、わかりやすくお届けします。',

  // Stats
  statsArticles:       '記事数',
  statsCategories:     'カテゴリー',
  statsCountries:      '対応国',
  statsBackpackers:    'サポート実績',

  // Search & filters
  searchPlaceholder:   '記事を検索...',
  clearSearch:         '検索をクリア',
  allArticles:         'すべての記事',
  noResults:           '該当する記事が見つかりませんでした：',
  showingResults:      '',
  resultsMatching:     '件の記事 検索ワード：',
  matching:            '検索ワード：',
  tryDifferent:        '別のキーワードでお試しください。すべての記事もご覧いただけます。',
  noArticlesCategory:  'このカテゴリーにはまだ記事がありません。',

  // Article card
  minRead:             '分で読めます',
  readMore:            '続きを読む',

  // Pagination
  showing:             '表示中：',
  of:                  '/',
  article:             '記事',
  articles:            '記事',

  // Article page
  backToBlog:          '← ブログ一覧に戻る',
  publishedOn:         '公開日',
  updatedOn:           '更新日',
  inThisArticle:       'この記事の目次',
  shareArticle:        '記事をシェア',
  relatedArticles:     '関連記事',
  needHelp:            'お手伝いが必要ですか？',
  needHelpBody:        '登録税理士のチームが、ワーキングホリデーのTFN申請、タックスリターン、スーパー返金、ABN登録までサポートします。',
  contactCTA:          'お問い合わせはこちら →',

  // Translation notice (when post body is still English)
  englishOnlyNotice:   'この記事はまだ日本語版が用意されておりません。以下は英語版です。ご質問はお気軽に日本語でお送りください。',
} as const

// ─── CATEGORY METADATA TRANSLATIONS ────────────────────────────────────────
type JaCategoryMeta = {
  category: Category
  slug: string
  title: string
  description: string
  intro: string
  faq: Array<{ question: string; answer: string }>
  relatedServicePath: string
  relatedServiceLabel: string
}

export const jaCategoryMeta: JaCategoryMeta[] = [
  // TFN
  {
    category: 'TFN',
    slug: 'tfn',
    title: 'TFN（タックスファイルナンバー）の記事 - ワーキングホリデー向け',
    description: 'ワーキングホリデー保持者が知っておくべきタックスファイルナンバー（TFN）のすべて。申請方法、発行までの期間、トラブル対処法まで解説します。',
    intro: 'タックスファイルナンバー（TFN）は、オーストラリアで収入を得るすべての人にATO（オーストラリア税務署）が発行する9桁の納税者番号です。ワーキングホリデーで働き始める前に必ず取得しておきましょう。TFNがないと雇用主は45%の最高税率で源泉徴収しなければなりません。本来のワーホリ税率は15%なので、その差は大きいです。このカテゴリーでは、初めてのTFN申請から、発行が遅れたとき、紛失したとき、セカンドビザで再渡豪したときまで、TFNにまつわるあらゆるケースを解説します。',
    faq: [
      { question: 'ワーキングホリデーでもTFNは必要ですか？', answer: 'はい。オーストラリアで収入を得るすべてのワーキングホリデー保持者にTFNが必要です。雇用主にTFNを登録していない場合、法律によりワーホリ税率の15%ではなく45%の最高税率で源泉徴収されます。' },
      { question: 'TFNが届くまでどのくらいかかりますか？', answer: 'ATO（オーストラリア税務署）はTFN申請を28日以内に処理します。TFNはオーストラリアの郵送先住所に郵便で届きます。多くの場合、2週間程度で受け取れます。' },
      { question: 'TFN申請は無料ですか？', answer: 'はい。TFNの申請は無料です。政府手数料はかかりません。オンライン申請は10分ほどで完了します。' },
      { question: 'TFNを持たずにオーストラリアで働き始められますか？', answer: 'はい、TFNなしでも働き始めることはできますが、雇用主はTFNが届くまで45%の税率で源泉徴収します。払い過ぎた税金はタックスリターンで取り戻せます。' },
    ],
    relatedServicePath: '/ja/tfn',
    relatedServiceLabel: 'TFNを申請する',
  },
  // ABN
  {
    category: 'ABN',
    slug: 'abn',
    title: 'ABN（オーストラリア事業者番号）の記事 - ワーキングホリデー向け',
    description: 'バックパッカーが知っておくべきABN（Australian Business Number）のすべて。必要なケース、登録方法、税金への影響を解説します。',
    intro: 'ABN（Australian Business Number）は、オーストラリアで個人事業主（Sole Trader）や独立した請負業者として働く場合に必要な11桁の事業者番号です。給与明細をもらう形ではなく、自分で請求書を発行してクライアントから報酬を受け取る場合に必要になります。このカテゴリーでは、ABN登録、ABNが適切な働き方かどうかの判断、ABNで働く場合の税金・スーパー・権利への影響を解説します。Uber Eatsやフードデリバリーなど、ワーホリでABNを使う仕事も多くあります。',
    faq: [
      { question: 'ワーキングホリデーでABNは必要ですか？', answer: '請負業者や個人事業主として働く場合（給与明細ではなく請求書で報酬を受け取る場合）はABNが必要です。通常の雇用形態で働くワーキングホリデー保持者の多くは、ABNは不要です。' },
      { question: 'ABNの取得費用はいくらですか？', answer: 'オーストラリア政府（ABR）でのABN登録は無料です。登録自体に料金を請求する業者は、無料の政府手続きにお金を取っているということです。' },
      { question: 'TFNとABNの違いは何ですか？', answer: 'TFNは個人としてATOに対する納税者番号です。ABNは事業者や個人事業主としての識別番号です。TFNは必ず必要ですが、ABNは個人事業として働く場合のみ必要です。' },
      { question: 'ABNで働くとスーパーはもらえますか？', answer: '通常はもらえません。ABN（請負業者）として働く場合、スーパーの積立は自分で行います。TFNで雇用される場合は、雇用主が給与の12%をスーパーに積み立ててくれます。' },
    ],
    relatedServicePath: '/ja/abn',
    relatedServiceLabel: 'ABNを登録する',
  },
  // Tax Return
  {
    category: 'Tax Return',
    slug: 'tax-return',
    title: 'タックスリターン（確定申告）の記事 - ワーキングホリデー向け',
    description: 'オーストラリアのタックスリターンのすべて：提出時期、控除可能な経費、還付金を最大化する方法を解説します。',
    intro: 'タックスリターン（日本でいう確定申告）は、あなたとATO（オーストラリア税務署）の間で行う年次の精算です。年間の収入と控除可能な経費を申告し、給与から源泉徴収済みの税金と照合します。ワーキングホリデー保持者の多くは年間で税金を払い過ぎており、数千ドルの還付金を受け取れます。このカテゴリーでは、提出期限、控除の種類、よくあるミス、還付金を最大化する方法を解説します。',
    faq: [
      { question: 'オーストラリアのタックスリターンはいつ提出しますか？', answer: 'オーストラリアの会計年度は7月1日〜6月30日です。自分で申告する場合は10月31日が締切。登録税理士に依頼する場合は翌年5月まで延長されます。' },
      { question: 'ワーキングホリデーで控除できる経費は何ですか？', answer: '業務関連の経費が控除可能です：作業着（防護服、制服など）、工具・機材、RSAやWhite Cardなどのライセンス、作業着の洗濯費用、勤務地間の移動費（通勤は除く）、登録チャリティへの寄付金などです。' },
      { question: 'ワーホリの平均的な還付金はいくらですか？', answer: 'ワーキングホリデー保持者の平均還付金は$2,000〜$3,500です。収入、ビザのステータス、控除可能な経費によって変わります。多くの方が年間を通じて税金を払い過ぎています。' },
      { question: 'オーストラリアを離れた後でもタックスリターンできますか？', answer: 'はい。世界のどこからでもタックスリターンを提出できます。オーストラリアを離れた後でも問題ありません。還付金はオーストラリアの口座にも海外の口座にも振り込み可能です。' },
    ],
    relatedServicePath: '/ja/tax-return',
    relatedServiceLabel: 'タックスリターンを依頼する',
  },
  // Super
  {
    category: 'Super',
    slug: 'super',
    title: 'スーパー（年金）返金の記事 - ワーキングホリデー向け',
    description: 'スーパーアニュエーション（Super）のすべて：仕組み、返金される条件、オーストラリア出国時のDASP申請方法を解説します。',
    intro: 'スーパーアニュエーション（Super）は、オーストラリアの強制年金制度です。法律により、雇用主は給与とは別に給与の12%をスーパーファンドに積み立てます。ワーキングホリデー保持者は、オーストラリアを離れる際にこのお金を受け取れます。これをDASP（Departing Australia Superannuation Payment）と呼びます。多くのバックパッカーで$2,000〜$5,000ほどの金額になります。このカテゴリーでは、スーパーの仕組み、ファンドの見つけ方、正しい返金申請の方法を解説します。',
    faq: [
      { question: '雇用主は私のスーパーをいくら積み立てますか？', answer: 'オーストラリアでは、雇用主は給与とは別に、税引前給与の12%をスーパーに積み立てる義務があります。週給$1,000なら、$120がスーパーファンドに積み立てられます。' },
      { question: 'オーストラリアを離れたらスーパーは返金されますか？', answer: 'はい。ワーキングホリデー保持者は、オーストラリアを離れてビザが失効または取り消されると、DASP（Departing Australia Superannuation Payment）を申請できます。返金には65%の税金がかかりますが、残り35%は確実にあなたのものになります。' },
      { question: 'DASP返金にはどのくらいかかりますか？', answer: 'DASP申請を提出してから、通常2〜4週間で支払われます。お金は直接、ご指定の銀行口座（オーストラリアまたは海外）に振り込まれます。' },
      { question: '複数のスーパー口座があるのですが、どうすればいいですか？', answer: '複数の雇用主で働いた場合、スーパー口座が複数になっていることがあります。すべての口座を見つけて統合し、まとめてDASP申請できます。' },
    ],
    relatedServicePath: '/ja/superannuation',
    relatedServiceLabel: 'スーパー返金を申請する',
  },
  // Work Rights
  {
    category: 'Work Rights',
    slug: 'work-rights',
    title: '労働者の権利の記事 - ワーキングホリデー向け',
    description: 'オーストラリアでの労働者の権利：最低賃金、休憩、残業、解雇、雇用主にだまされた場合の対処法を解説します。',
    intro: 'ワーキングホリデー保持者にも、オーストラリア人と同じ労働者の権利があります。最低賃金、休憩時間、残業手当、不当な扱いからの保護が法律で守られています。残念ながら、ファームやレストランなどではバックパッカーが搾取されることもあります。このカテゴリーでは、あなたの権利、トラブルへの対処法、詐欺から身を守る方法を解説します。',
    faq: [
      { question: 'オーストラリアの最低賃金はいくらですか？', answer: 'オーストラリアの全国最低賃金は時給$24.95（税引前、2025年7月1日時点）です。カジュアル雇用には25%の上乗せがあります。飲食・農業など特定業種は独自の最低賃金が定められた賃金協定（Award）があります。' },
      { question: 'カジュアル・ローディングとは何ですか？', answer: 'カジュアル・ローディングとは、カジュアル雇用の時給に25%上乗せされる手当のことです。カジュアル雇用には有給休暇や病気休暇がない代わりに支払われます。雇用主がローディングを支払わない場合、法律違反の可能性があります。' },
      { question: '勤務中の休憩は権利として認められていますか？', answer: 'はい。4〜5時間のシフトには10分の無給休憩、5〜7時間には30分の無給休憩、9時間以上には追加の休憩が認められます。詳細は各業種の賃金協定（Award）で定められています。' },
      { question: '雇用主が給料を払わない場合はどうすればいいですか？', answer: 'まずすべてを記録してください（労働時間、給与明細、メッセージなど）。最初に雇用主に直接話し合いましょう。それでも解決しない場合は、Fair Work Ombudsman（公正労働オンブズマン）に通報できます。無料の政府機関です。税理士にも相談できます。' },
    ],
    relatedServicePath: '/ja/contact',
    relatedServiceLabel: '労働者の権利についてお問い合わせ',
  },
  // Medicare & Other
  {
    category: 'Medicare & Other',
    slug: 'medicare',
    title: 'メディケアその他の記事 - ワーキングホリデー向け',
    description: 'メディケア、メディケア税免除、税務居住、二重課税など、ワーキングホリデーに関わる税務トピックを解説します。',
    intro: 'メディケア（Medicare）は、オーストラリアの公的医療制度です。課税所得から自動的に2%のメディケア税が控除され、制度の一部財源となっています。ワーキングホリデー保持者の多くはメディケアの対象外なので、免除を申請するべきです。日本は社会保険協定（RHCA）非締結国のため、日本人ワーホリは通常メディケアの対象外です。このカテゴリーでは、メディケア対象資格、メディケア税免除、RHCA、その他の重要な税務トピックを解説します。',
    faq: [
      { question: '日本人のワーキングホリデーはメディケアの対象になりますか？', answer: 'いいえ。日本はオーストラリアと社会保険協定（RHCA）を結んでいないため、日本人ワーキングホリデーはメディケアの対象外です。代わりに、タックスリターンでメディケア税の免除を申請しましょう。' },
      { question: 'メディケア税免除とは何ですか？', answer: 'メディケアの対象外（ほとんどのワーキングホリデービザ保持者）の場合、タックスリターンでメディケア税（2%）の免除を申請できます。所得によっては数百〜数千ドルの節約になります。' },
      { question: 'どの国がオーストラリアとRHCA（社会保険協定）を結んでいますか？', answer: '現在RHCAを結んでいるのは：イギリス、ニュージーランド、アイルランド、スウェーデン、オランダ、フィンランド、ベルギー、イタリア、マルタ、ノルウェー、スロベニアです。日本は含まれていません。' },
      { question: 'オーストラリアでプライベート医療保険は必要ですか？', answer: '法律で義務付けられているわけではありませんが、メディケア対象外のワーキングホリデー保持者には強くおすすめします。自費負担となる医療費をカバーできます。メディケア税とは別の話です。' },
    ],
    relatedServicePath: '/ja/medicare',
    relatedServiceLabel: 'メディケア対象を確認する',
  },
]

// ─── PER-POST TRANSLATIONS ─────────────────────────────────────────────────
/**
 * Map from English slug → Japanese translation (partial).
 * When `body` is missing, the English body is shown with a notice.
 *
 * Format:
 *   'english-slug': {
 *     title: 'Japanese title',
 *     description: 'Japanese description',
 *     body: '...full Japanese Markdown body...',  // optional
 *   }
 *
 * NOTE: This is currently empty. Posts will display the English body
 * with a Japanese notice at the top. Translations will be added incrementally.
 */
export const jaPostTranslations: Record<string, { title: string; description: string; body?: string }> = {
  // ─── TFN (5 articles - batch 1) ──────────────────────────────────────────

  'what-is-a-tfn': {
    title: 'TFNとは？オーストラリアで働く前に必ず取得すべき理由',
    description: 'タックスファイルナンバー（TFN）は、オーストラリアで働き始める前に最初に必要な番号です。TFNがないと給料の約半分が源泉徴収されてしまいます。',
  },

  'how-to-apply-for-a-tfn': {
    title: 'ワーキングホリデーのTFN申請方法【ステップ別解説】',
    description: 'オーストラリアでのTFN申請は無料でシンプル。ワーキングホリデービザ保持者が知っておくべき申請手順をわかりやすく解説します。',
  },

  'how-long-does-it-take-to-get-a-tfn': {
    title: 'TFNが届くまでの期間は？28日以内が目安',
    description: 'TFN申請は通常28日以内に処理されます。届くまでの目安と、待っている間にできることをまとめました。',
    },

  'can-you-start-work-without-a-tfn': {
    title: 'TFNなしでオーストラリアで働き始められる？',
    description: 'TFNなしでも働き始めることはできますが、税金面で大きな影響があります。最初のシフトの前に知っておくべきポイントを解説します。',
  },

  'what-happens-without-your-tfn': {
    title: '雇用主にTFNを提出しないとどうなる？45%の高税率に注意',
    description: '雇用主がTFNを保有していない場合、給与から45%が源泉徴収されます。これが給料に与える影響と対処法を詳しく解説します。',
  },

  'tfn-vs-abn-difference': {
    title: 'TFNとABNの違いは？どちらが必要か簡単チェック',
    description: 'TFNとABNはまったく別の役割を持つ番号です。ワーキングホリデーで必要なのはどちらか、両方必要なケースもわかりやすく解説します。',
  },

  'apply-for-tfn-before-arriving': {
    title: 'オーストラリア到着前にTFN申請できる？条件と注意点',
    description: '多くの場合、オーストラリア到着前からTFN申請が可能です。事前申請のメリットと、いつから申請できるかを詳しく説明します。',
  },

  'tfn-application-delayed': {
    title: 'TFN申請が28日経っても届かない時の対処法',
    description: 'TFNが28日経っても届かない場合、何を確認すべきか、ATO（オーストラリア税務署）への問い合わせ方法をまとめました。',
  },

  'do-you-need-new-tfn-second-visa': {
    title: 'セカンドワーホリビザで再渡豪する時、新しいTFNは必要？',
    description: '結論：不要です。TFNは一生有効。セカンドビザで戻ってきた時に確認すべきポイントを解説します。',
  },

  'how-to-find-lost-tfn': {
    title: 'TFNを忘れた・紛失した時に番号を確認する5つの方法',
    description: 'TFNを紛失してもATOへ連絡する前に確認できる方法があります。給与明細、myGov、銀行記録など、見つかる場所をまとめました。',
  },

  'how-to-update-address-with-ato': {
    title: 'ATOへの住所変更手続き：オーストラリア国内で引越したら',
    description: 'オーストラリア国内で住所が変わったら、ATOへの登録を更新しましょう。TFN関連の書類や還付金の通知が届くために重要です。',
  },

  'tfn-reference-number-before-tfn-arrives': {
    title: 'TFN参照番号（リファレンスナンバー）とは？届く前に働くには',
    description: 'TFN申請後、番号が届くまでに使える参照番号について。雇用主への提出方法と注意点を詳しく解説します。',
  },

  'tax-free-threshold-working-holiday-visa': {
    title: 'ワーホリで非課税枠（Tax-Free Threshold）は申請できる？',
    description: '非課税枠は節税できそうに見えますが、ワーキングホリデー保持者が申請すると思わぬ追加納税のリスクがあります。正しい判断を解説します。',
  },

  'tfn-application-rejected': {
    title: 'TFN申請が却下された時に確認すべきポイント',
    description: 'TFN申請が却下される原因は、ビザ情報の不一致、本人確認書類の問題、登録ミスなどです。よくある却下理由と再申請方法を解説します。',
  },

  'tfn-identity-documents-required': {
    title: 'TFN申請に必要な本人確認書類リスト【完全版】',
    description: 'TFN申請にはパスポート、ビザグラント、オーストラリアの住所など、特定の書類が必要です。準備すべきもののチェックリストです。',
  },

  'tfn-security-protect-from-fraud': {
    title: 'TFN詐欺・なりすまし被害を防ぐ7つのポイント',
    description: 'TFNはオーストラリアで最も重要な個人情報の一つです。詐欺やID窃盗から守るために知っておくべきセキュリティ対策を解説します。',
  },

  'who-can-ask-for-your-tfn': {
    title: 'TFNを聞いていいのは誰？聞いてはいけない人を見分ける',
    description: 'TFNを正当に要求できるのはごく限られた組織のみです。雇用主・銀行・スーパーファンドなど、誰がTFNを求められるかを明確に解説します。',
  },

  'tfn-australian-address-no-fixed-address': {
    title: '住所が決まっていない時のTFN申請方法（ホステル・キャンパー）',
    description: 'ホステル、キャンパーバン、ファーム住み込みなど、固定住所がない場合のTFN申請方法を、ワーホリの実情に合わせて解説します。',
  },

  // ─── ABN (14 articles) ───────────────────────────────────────────────────

  'what-is-an-abn': {
    title: 'ABNとは？ワーホリでABNが必要なケースを徹底解説',
    description: 'ABNはオーストラリアで請負業者として働く場合に必要な事業者番号です。ワーキングホリデーで必要かどうかの判断ポイントを解説します。',
  },

  'how-to-register-for-an-abn': {
    title: 'ABN登録方法：オーストラリアで個人事業主になるステップ',
    description: 'ABNの登録は無料、オンラインで15分ほど。ワーキングホリデーバックパッカー向けに、申請手順をわかりやすく解説します。',
  },

  'farm-work-and-abns': {
    title: 'ファーム仕事でABNが必要？知っておくべきこと',
    description: 'ファーム仕事はワーキングホリデーでABNが必要になるケースの代表例です。仕組み、注意点、よくあるトラブルを解説します。',
  },

  'employee-vs-contractor-australia': {
    title: '従業員と請負業者（コントラクター）の違いとは？',
    description: '従業員と請負業者の区別は、税金、スーパー、労働者の権利に大きく影響します。判断基準とよくある誤解を解説します。',
  },

  'can-you-have-tfn-and-abn': {
    title: 'TFNとABNを両方持てる？ワーホリで両方使うケース',
    description: 'はい、両方持てます。多くのワーキングホリデー保持者が両方持っています。それぞれをいつ使うのかを詳しく説明します。',
  },

  'how-to-cancel-your-abn': {
    title: 'ABNのキャンセル方法：帰国前に必ず手続きを',
    description: 'オーストラリアを離れる際、ABNを使わなくなるなら必ずキャンセルしましょう。簡単なオンライン手続きを解説します。',
  },

  'gst-and-abn-for-working-holiday-makers': {
    title: 'GST（消費税）登録は必要？ABN保持者の判断基準',
    description: '年間売上$75,000未満のワーホリABN保持者はGST登録不要です。GSTの仕組みと、いつ登録すべきかを明確に解説します。',
  },

  'vehicle-logbook-abn-working-holiday': {
    title: '車を仕事で使うなら：ABN保持者のログブック（運転記録）作成法',
    description: 'ABNで仕事に車を使うなら、車両費用を経費として申請できる可能性があります。ログブック作成方法と申告のコツを解説します。',
  },

  'small-business-tax-offset-working-holiday-abn': {
    title: 'Small Business Tax Offset（小規模事業者税控除）はワーホリも使える？',
    description: 'ABNで個人事業主として収入を得るワーホリは、Small Business Tax Offsetを利用できる可能性があります。条件と申請方法を解説します。',
  },

  'sole-trader-vs-company-australia-working-holiday': {
    title: '個人事業主（Sole Trader）と法人（Company）の違い：ワーホリ向け解説',
    description: 'ほとんどのワーホリは個人事業主として活動しますが、法人との違いを理解しておくと税務上有利な判断ができます。',
  },

  'profit-loss-vs-personal-services-income-australia': {
    title: 'PSI（個人サービス所得）とは？ABN保持者は要チェック',
    description: 'ATOはPersonal Services Income（PSI）と通常の事業所得を区別します。ワーホリのABN保持者にとって重要なルールを解説します。',
  },

  'abn-invoicing-requirements-australia': {
    title: 'ABNでのタックスインボイス（請求書）の正しい書き方',
    description: 'ABNを使った請求書には、特定の情報が必要です。法的に有効なタックスインボイスの書き方を、テンプレート付きで解説します。',
  },

  'abn-deductions-business-expenses': {
    title: 'ABN保持者が経費として申請できるもの【完全リスト】',
    description: 'ABNで収入を得るワーキングホリデー保持者は、業務関連の経費を申請して税金を減らせます。控除可能な項目を網羅的に解説します。',
  },

  'uber-doordash-rideshare-abn-working-holiday': {
    title: 'Uber・DoorDash・配車サービスで働く：ABNと税金のルール',
    description: '配車サービスやフードデリバリーは請負契約となるため、ABNが必須です。Uber・DoorDashで働くワーホリの税金ルールを解説します。',
  },

  // ─── Tax Return (30 articles) ────────────────────────────────────────────

  'how-does-australian-tax-year-work': {
    title: 'オーストラリアの会計年度（7月〜6月）の仕組み：日本との違い',
    description: 'オーストラリアの会計年度は7月1日〜6月30日です。日本の暦年とは違うので、タックスリターンへの影響をワーホリ向けに解説します。',
  },

  'backpacker-tax-rate-australia': {
    title: 'バックパッカー税率15%とは？オーストラリアのワーホリ税金',
    description: 'ワーキングホリデー保持者の所得には15%のフラット税率が適用されます。仕組み、計算方法、知っておくべき例外を解説します。',
  },

  'how-to-lodge-tax-return-working-holiday': {
    title: 'ワーホリのタックスリターン提出方法：ステップ別ガイド',
    description: 'オーストラリアのタックスリターンは思ったよりシンプル。ワーキングホリデー保持者向けに、必要書類から提出までを徹底解説します。',
  },

  'what-is-payg-payment-summary': {
    title: 'PAYGペイメントサマリーとは？タックスリターンに必須の書類',
    description: 'PAYGペイメントサマリー（インカムステートメント）は年間の収入と源泉徴収税額を示す書類。タックスリターンの基本となります。',
  },

  'tax-deductions-working-holiday-makers': {
    title: 'ワーホリが申請できる経費控除リスト【還付金を最大化】',
    description: 'ワーキングホリデー保持者も、業務関連の経費を控除できます。作業着、工具、ライセンス費用など、申請可能な項目を網羅します。',
  },

  'do-you-need-to-lodge-tax-return-short-stay': {
    title: '短期間しか働かなかった場合もタックスリターンは必要？',
    description: '数週間しか働いていなくても、タックスリターン提出が必要なケースがあります。判断基準と還付金を逃さない方法を解説します。',
  },

  'how-to-lodge-tax-return-from-overseas': {
    title: '帰国後に海外からオーストラリアのタックスリターンを提出する方法',
    description: 'オーストラリアを離れてもタックスリターンの義務は残ります。日本帰国後でもオンラインで簡単に提出できる方法を解説します。',
  },

  'what-is-a-tax-agent': {
    title: '税理士（Tax Agent）に依頼するメリット：ワーホリ向け解説',
    description: '登録税理士は代理でタックスリターンを準備・提出します。ワーホリが税理士を利用すべき理由と、選び方のポイントを解説します。',
  },

  'how-does-payg-withholding-work': {
    title: 'PAYG源泉徴収の仕組み：給料からの天引きを理解する',
    description: 'PAYG源泉徴収は雇用主が給与から税金を天引きする仕組みです。年間の還付金や追加納税にどう影響するかを解説します。',
  },

  'australian-financial-year-dates': {
    title: 'オーストラリアの会計年度：7月1日〜6月30日の重要日程',
    description: 'オーストラリアの会計年度は暦年とは異なります。タックスリターンの提出期限、重要な日程をまとめました。',
  },

  'cash-in-hand-tax-return': {
    title: '現金払い（キャッシュインハンド）の収入もタックスリターンが必要？',
    description: '現金で給料を受け取っても税金の義務はなくなりません。申告すべき内容と、申告しない場合のリスクを解説します。',
  },

  'tax-residency-working-holiday-makers': {
    title: 'ワーホリは税務上の居住者？日本人が知っておくべきNDA国の特典',
    description: '税務居住区分はワーホリの税率に大きく影響します。日本はNDA国なので、居住者として扱われる可能性があります。条件と判断基準を解説します。',
  },

  'what-is-a-tax-refund-australia': {
    title: 'タックスリフォンド（還付金）とは？もらえるか確認する方法',
    description: '還付金は年間で税金を払い過ぎていた場合にATOが返してくれるお金です。ワーホリの平均還付金額と確認方法を解説します。',
  },

  'how-long-does-tax-refund-take-australia': {
    title: '還付金の受け取りまでにかかる期間：オーストラリアの目安',
    description: 'タックスリターン提出後、還付金は通常2週間以内に振り込まれます。期間に影響する要素と、遅れた時の対処法を解説します。',
  },

  'transferring-money-overseas-australia-tax': {
    title: '帰国前の海外送金に税金はかかる？オーストラリアからの送金ルール',
    description: '貯金を母国へ送金する前に知っておくべきこと。ワーホリの海外送金に関する税金、申告義務、注意点を解説します。',
  },

  'low-income-tax-offset-working-holiday': {
    title: 'Low Income Tax Offset（低所得者税控除）はワーホリも使える？',
    description: 'Low Income Tax Offsetは最大$700の税控除です。ワーホリの対象条件、申請方法、計算例を詳しく解説します。',
  },

  'appealing-ato-decision-australia': {
    title: 'ATOの決定に不服がある時：異議申し立ての方法',
    description: 'ATOのタックスアセスメントや決定に同意できない場合、異議申し立ての権利があります。手続きの流れと期限を解説します。',
  },

  'amending-tax-return-australia': {
    title: 'タックスリターン提出後にミスを発見：修正申告の方法',
    description: 'タックスリターン提出後にミスに気づいたら、Amendment（修正申告）で訂正できます。期限と申請方法を詳しく解説します。',
  },

  'ato-payment-plan-tax-debt-australia': {
    title: '税金が払えない時のATO支払い計画（ペイメントプラン）',
    description: 'ATOからの税金請求が一度に払えない場合、分割払いの相談ができます。申請方法と注意点をワーホリ向けに解説します。',
  },

  'backpacker-tax-history-australia': {
    title: 'バックパッカー税の歴史：制度の変遷と現在のルール',
    description: 'バックパッカー税はオーストラリアで議論の多い政策の一つでした。導入の経緯、過去の判例、現在の税率を解説します。',
  },

  'tax-return-without-tfn-australia': {
    title: 'TFNなしで働いていた場合のタックスリターン提出方法',
    description: 'TFNなしで働いていた期間は45%で源泉徴収されています。タックスリターンで取り戻す方法と必要書類を解説します。',
  },

  'multiple-jobs-tax-return-working-holiday': {
    title: '複数の仕事を掛け持ちした場合のタックスリターン手続き',
    description: '飲食店・農場など、複数の雇用主で働くワーホリは少なくありません。複数収入の正しい申告方法と注意点を解説します。',
  },

  'second-third-year-visa-tax-implications': {
    title: 'セカンド・サードワーホリビザの税金は変わる？',
    description: 'セカンド・サードビザで戻ってきても税率は変わりません。会計年度の扱い、TFN、税務居住の判断について解説します。',
  },

  'late-tax-return-penalty-working-holiday': {
    title: 'タックスリターンの提出遅延ペナルティ：1件$222',
    description: '提出期限を過ぎるとFailure to Lodgeペナルティが課されます。1ペナルティユニット$222から。期限と回避方法を解説します。',
  },

  'understating-income-ato-penalty-working-holiday': {
    title: '収入を少なく申告した場合のATOペナルティ：最大75%',
    description: '収入の過少申告が発覚すると、行政罰として未払税額の25%〜75%が課されます。正しい申告の重要性を解説します。',
  },

  'tools-equipment-under-300-instant-deduction-whv': {
    title: '$300以下の工具・備品は即時控除：ワーホリの節税テクニック',
    description: '$300未満の作業用工具や備品は、購入年度に全額即時控除できます。具体例と申請方法を解説します。',
  },

  '1000-dollar-instant-deduction-rule-2026': {
    title: '2026年7月から新ルール：$1,000即時控除でワーホリも節税',
    description: '2026年7月1日から、ワーホリも$1,000の業務経費を即時控除できるようになります。新ルールの内容と適用方法を解説します。',
  },

  'bicycle-motorcycle-vehicle-deductions-working-holiday': {
    title: '自転車・バイクの経費控除：車以外の移動手段も対象',
    description: '車だけが控除対象ではありません。Uber Eatsなどで使う自転車・バイクも経費として申請できます。条件と計算方法を解説します。',
  },

  'bringing-money-into-australia-10000-reporting-threshold': {
    title: 'オーストラリアへの持ち込み・送金$10,000ルール',
    description: '現金または送金で$10,000以上を動かす場合、申告義務があります。ワーホリが知っておくべきAUSTRAC（連邦警察）への報告基準を解説します。',
  },

  'ato-tax-debt-failure-to-pay-penalty-australia': {
    title: 'ATO税金未払いのペナルティ：GICとFailure to Pay',
    description: 'ATO税金が期日までに支払われないとGeneral Interest Charge（GIC）が加算されます。利息計算と回避策を詳しく解説します。',
  },

  // ─── Super (20 articles) ─────────────────────────────────────────────────

  'what-is-superannuation': {
    title: 'スーパーアニュエーション（年金）とは？ワーホリも対象？',
    description: 'スーパーアニュエーションはオーストラリアの強制年金制度です。ワーキングホリデー保持者も対象になります。仕組みと帰国時の返金（DASP）を解説します。',
  },

  'how-much-super-should-employer-pay': {
    title: '雇用主が支払うべきスーパー額：給料の12%【2025年〜】',
    description: '2025年7月から、雇用主は給与の12%をスーパーファンドに積み立てる義務があります。正しく支払われているか確認する方法を解説します。',
  },

  'what-is-dasp-super-withdrawal': {
    title: 'DASPとは？スーパー返金の仕組みをワーホリ向けに解説',
    description: 'DASP（Departing Australia Superannuation Payment）は、ワーホリが帰国時にスーパーを返金してもらう公式手続きです。仕組みを詳しく解説します。',
  },

  'how-to-apply-for-super-back': {
    title: 'スーパー返金（DASP）の申請方法：ステップ別ガイド',
    description: 'DASPの申請方法を、ファンドの探し方から振込までステップ別に解説します。日本帰国後でも申請可能です。',
  },

  'how-long-does-dasp-take': {
    title: 'DASP（スーパー返金）の処理期間：通常28日以内',
    description: 'DASP申請は通常28日以内に処理されます。期間に影響する要素と、遅れた時の確認方法をまとめました。',
  },

  'tax-on-super-withdrawal-backpacker': {
    title: 'スーパー返金時の税金65%：DASPの実質受取額',
    description: 'ワーホリのDASP返金には65%の源泉徴収税がかかります。仕組みと、それでも申請する価値がある理由を解説します。',
  },

  'what-happens-to-unclaimed-super': {
    title: '申請せずに残ったスーパーはどうなる？ATOに移管後も返金可能',
    description: '申請しないスーパーは消滅せず、ATOへ移管されます。何年経っても返金申請できる仕組みを詳しく解説します。',
  },

  'can-you-withdraw-super-in-australia': {
    title: '滞在中にスーパーを引き出せる？ワーホリの制限について',
    description: '通常、ワーホリビザでオーストラリア滞在中にスーパーを引き出すことはできません。理由と例外的なケースを解説します。',
  },

  'how-to-find-lost-superannuation': {
    title: 'なくしたスーパーを探す方法：ATO・myGovで簡単検索',
    description: '複数のファンドやATO移管などで、スーパーが分散していることがあります。すべての口座を見つける方法を解説します。',
  },

  'how-to-choose-super-fund': {
    title: 'スーパーファンドの選び方：手数料・運用成績で比較',
    description: '初めて働く時、自分でスーパーファンドを選べます。ワーホリにおすすめの選び方と、確認すべきポイントを解説します。',
  },

  'super-for-casual-and-part-time-workers': {
    title: 'カジュアル・パートタイマーもスーパーがもらえる？',
    description: 'はい、カジュアル・パートタイマーも雇用形態にかかわらずスーパーの対象です。条件と確認方法を解説します。',
  },

  'how-to-check-super-balance-working-holiday': {
    title: 'スーパー残高を確認する方法：帰国前に必ずチェック',
    description: 'いくらスーパーが積み立てられているか把握しておきましょう。myGov、ファンドのアプリ、ATOでの確認方法を解説します。',
  },

  'dasp-documents-required': {
    title: 'DASP申請に必要な書類リスト【完全版】',
    description: 'DASP申請にはパスポート、ビザ情報、銀行口座情報など、特定の書類が必要です。準備すべきもののチェックリストです。',
  },

  'dasp-tax-rate-65-percent-explained': {
    title: 'なぜDASPには65%の税金？高税率の理由と背景',
    description: 'ワーホリのDASP返金には65%の税金が課されます。なぜこんなに高いのか、政策の背景と政府の意図を詳しく解説します。',
  },

  'super-multiple-funds-consolidation': {
    title: '複数のスーパーファンドがある時の統合方法',
    description: '複数の雇用主で働くと、スーパーファンドが3〜4つに分かれることがあります。統合してまとめて申請する方法を解説します。',
  },

  'dasp-rejected-what-to-do': {
    title: 'DASP申請が却下された時の対処法',
    description: 'DASP申請がビザ情報の不一致、本人確認の問題などで却下されることがあります。よくある却下理由と再申請方法を解説します。',
  },

  'super-employer-not-paying-what-to-do': {
    title: '雇用主がスーパーを払っていない時の対処法',
    description: '雇用主には給与の12%をスーパーに積み立てる法的義務があります。未払いを発見した時の対応とATOへの通報方法を解説します。',
  },

  'super-stapling-rule-australia': {
    title: 'スーパー・スタプリング・ルール：ワーホリへの影響は？',
    description: 'スーパー・スタプリングは、転職してもスーパーファンドが追従する仕組みです。ワーホリの実情に合わせた対応を解説します。',
  },

  'dasp-vs-leaving-super-in-australia-pros-cons': {
    title: 'DASP申請する？オーストラリアに残す？メリット比較',
    description: '帰国時にDASP（65%の税金）で受け取るか、将来のために残しておくか。それぞれのメリット・デメリットを詳しく比較します。',
  },

  'super-rate-12-percent-2025-2026-increase': {
    title: 'スーパー率が12%に引き上げ（2025年7月〜）',
    description: '2025年7月1日から、スーパー保証率が11.5%から12%に引き上げられました。ワーホリの返金額にどう影響するかを解説します。',
  },

  // ─── Work Rights (43 articles) ───────────────────────────────────────────

  'minimum-wage-australia-2025-26': {
    title: 'オーストラリアの最低賃金（2025-26年）：時給$24.95',
    description: 'オーストラリアの最低賃金は世界トップクラス。2025年7月1日からの最新時給と、ワーホリへの影響を詳しく解説します。',
  },

  'how-many-hours-can-you-work-on-whv': {
    title: 'ワーホリビザで働ける時間制限はある？同一雇用主6ヶ月ルール',
    description: 'ワーホリビザの労働時間と雇用主に関する規則について。以前は同一雇用主で6ヶ月制限がありましたが、現在のルールを解説します。',
  },

  'penalty-rates-australia': {
    title: 'ペナルティレート（割増賃金）：週末・祝日は給料アップ',
    description: 'ペナルティレートは土日・祝日・深夜勤務の割増賃金です。ワーホリも対象。業種別の割増率と確認方法を解説します。',
  },

  'can-your-employer-pay-you-cash-in-hand': {
    title: '現金払い（キャッシュインハンド）は合法？税金面のリスク',
    description: '現金払いは一部の業界で一般的ですが、税金やワーホリの権利保護に影響します。注意点とリスクを詳しく解説します。',
  },

  'fair-work-act-working-holiday-makers': {
    title: 'Fair Work Act（公正労働法）：ワーホリも守られる労働者の権利',
    description: 'Fair Work Actはオーストラリアの主要な労働法。ワーキングホリデー保持者にも適用される権利を解説します。',
  },

  'employer-not-paying-correctly': {
    title: '給料が正しく支払われていない時の対処法',
    description: '雇用主による賃金未払いはオーストラリアでも深刻な問題です。証拠の集め方からFair Workへの相談まで詳しく解説します。',
  },

  'leave-entitlements-working-holiday-visa': {
    title: 'ワーホリで有給休暇・病気休暇は取れる？雇用形態別解説',
    description: 'ワーホリ保持者にも休暇取得の権利があります。フルタイム・パートタイム・カジュアルで異なる条件を解説します。',
  },

  'what-is-a-tax-invoice': {
    title: 'タックスインボイス（請求書）とは？ABNで仕事をするなら必須',
    description: 'ABNを使った請負業務には、正しい請求書（タックスインボイス）の発行が必要です。書き方と注意点を解説します。',
  },

  'can-you-work-for-multiple-employers': {
    title: 'ワーホリで複数の雇用主と同時に働ける？',
    description: 'はい、ワーキングホリデー保持者は複数の雇用主と同時に働けます。気をつけるべき税金・スーパー・労働時間のポイントを解説します。',
  },

  'full-time-part-time-casual-australia': {
    title: 'フルタイム・パートタイム・カジュアルの違い【オーストラリア】',
    description: '雇用形態は時給、有給休暇、税金に影響します。ワーホリ向けに3つの形態の違いを表でわかりやすく解説します。',
  },

  'employer-asking-you-to-work-more-than-visa-allows': {
    title: 'ビザの労働制限を超えて働かされそうな時の対処法',
    description: 'ビザの労働制限を超えて働くとビザ自体が危険にさらされます。雇用主からのプレッシャーへの対処法を解説します。',
  },

  'farm-work-rights-working-holiday-australia': {
    title: 'ファーム仕事中の労働者の権利：ワーホリも法的保護対象',
    description: 'ファーム仕事はワーホリで最も一般的な仕事の一つ。最低賃金、休憩、安全面など、法的に守られる権利を解説します。',
  },

  'white-card-australia-working-holiday': {
    title: 'White Cardとは？建設現場で働くなら必須の資格',
    description: 'オーストラリアの建設業で働くにはWhite Card（建設業安全資格）が必要です。取得方法、費用、有効期間を詳しく解説します。',
  },

  'rsa-certificate-australia-working-holiday': {
    title: 'RSA証明書とは？オーストラリアのバー・パブで働くなら必須',
    description: 'バー、パブ、酒販店で働くにはRSA（責任あるアルコール提供）証明書が必要です。取得方法と費用、有効期間を解説します。',
  },

  'wwcc-working-with-children-check-australia': {
    title: 'WWCC（児童関連業務チェック）とは？子供と関わる仕事に必須',
    description: '子供と関わる仕事（チャイルドケア、教育補助など）にはWWCC（Working With Children Check）が必要です。取得方法を解説します。',
  },

  'public-holidays-australia-working-holiday': {
    title: 'オーストラリアの祝日：給料アップとワーホリの権利',
    description: 'オーストラリアの祝日には高い割増賃金が適用されます。州ごとの祝日リストと、雇用形態別の権利を解説します。',
  },

  'casual-shift-cancellation-rules-australia': {
    title: 'カジュアル雇用：シフトの突然キャンセルは合法？',
    description: 'カジュアル雇用でもシフトのキャンセルには法的ルールがあります。雇用主が守るべき手続きと、ワーホリの権利を解説します。',
  },

  'six-month-employer-rule-working-holiday-visa': {
    title: 'ワーホリの6ヶ月ルール：同一雇用主の制限を徹底解説',
    description: 'ワーホリビザでは原則として同一雇用主で6ヶ月までしか働けません。例外規定と、ルールの正しい理解を解説します。',
  },

  'piece-rates-farm-work-working-holiday': {
    title: 'ピースレート（出来高制）：フルーツピッキングの給料計算',
    description: 'ファーム仕事ではピースレート（出来高制）が一般的。仕組み、注意点、最低賃金との関係を詳しく解説します。',
  },

  'labour-hire-agencies-working-holiday-australia': {
    title: 'レイバーハイヤー（人材派遣）でのワーホリ仕事',
    description: 'レイバーハイヤーは仕事を素早く見つける方法として人気です。仕組み、リスク、トラブル対処法を解説します。',
  },

  'how-to-read-a-payslip-australia-working-holiday': {
    title: 'オーストラリアの給与明細（ペイスリップ）の見方',
    description: '給与明細には正しく支払われているか確認するための情報がすべて記載されています。チェックすべきポイントを解説します。',
  },

  'wage-theft-working-holiday-australia': {
    title: '賃金詐欺（ウェッジセフト）：ワーホリが過少支払いを受けた時',
    description: 'バックパッカーが多い業界では賃金詐欺が問題になっています。気づき方、証拠の集め方、解決方法を解説します。',
  },

  'workplace-injury-working-holiday-rights': {
    title: '労災（仕事中の怪我）：ワーホリも労災保険の対象',
    description: 'オーストラリアで仕事中に怪我をした場合、ワーホリもWorkers Compensation（労災保険）の対象です。請求方法を解説します。',
  },

  'unfair-dismissal-working-holiday-australia': {
    title: '不当解雇された時：Fair Work Commissionへの申し立て方法',
    description: 'ワーホリもFair Work Commissionに不当解雇の申し立てができます。条件、期限、手続きの流れを詳しく解説します。',
  },

  'bullying-harassment-workplace-working-holiday': {
    title: '職場でのいじめ・ハラスメントを受けた時の対処法',
    description: '職場でのいじめ・セクハラはオーストラリアでは違法です。連邦・州法による保護と、相談先・申し立て方法を解説します。',
  },

  'unpaid-trial-shifts-australia-legal': {
    title: '無給トライアル（試用シフト）は合法？ワーホリが知っておくべきルール',
    description: 'ほとんどの無給トライアルはオーストラリアでは違法です。正当なトライアルと違法な未払い労働の境界線を解説します。',
  },

  'uniform-laundry-deductions-illegal-australia': {
    title: '制服代・洗濯代を給料から天引きされた：これは合法？',
    description: 'オーストラリアでは、給料からの天引きはごく限られたケースでのみ合法です。違法な天引きの見分け方と対処法を解説します。',
  },

  'hospitality-award-working-holiday-makers': {
    title: 'Hospitality Award（飲食業賃金協定）：ワーホリへの適用',
    description: 'Hospitality Award（MA000009）は飲食業の最低賃金・割増賃金を定めます。ワーホリのカフェ・レストラン勤務に重要なルールです。',
  },

  'horticulture-award-working-holiday-makers': {
    title: 'Horticulture Award（園芸業賃金協定）：ファーム仕事の最低条件',
    description: 'Horticulture Award（MA000028）はファーム仕事の最低賃金と条件を定めます。フルーツピッキングのワーホリは要確認です。',
  },

  'restaurant-industry-award-working-holiday': {
    title: 'Restaurant Industry Award（レストラン業賃金協定）',
    description: 'Restaurant Industry Award（MA000119）は独立系レストラン・カフェに適用されます。ワーホリへの影響を解説します。',
  },

  'award-classifications-working-holiday-australia': {
    title: '自分の仕事にどのAward（賃金協定）が適用されるか調べる方法',
    description: 'ほとんどのワーホリの仕事にはModern Award（現代賃金協定）が適用されます。自分のAwardを見つける方法を解説します。',
  },

  'fruit-picking-jobs-working-holiday-australia': {
    title: 'フルーツピッキングの仕事：セカンドビザの88日条件にも',
    description: 'フルーツピッキングはセカンドワーホリビザの規制地域88日労働として最も人気の選択肢。仕事内容・給料・注意点を解説します。',
  },

  'farm-hand-jobs-working-holiday-australia': {
    title: 'ファームハンドの仕事：給料・条件・セカンドビザ対象',
    description: 'ファームハンドはフルーツピッキング以外の農業全般を含みます。家畜世話、機械操作など、仕事内容と給料を解説します。',
  },

  'bartender-jobs-working-holiday-australia': {
    title: 'バーテンダーの仕事：RSA・給料・チップの実態',
    description: 'バーテンダーはワーホリで人気の飲食業の一つ。RSA取得、給料、チップ、ペナルティレートを詳しく解説します。',
  },

  'barista-coffee-shop-working-holiday-australia': {
    title: 'バリスタの仕事：オーストラリアのコーヒー文化と給料',
    description: 'オーストラリアのコーヒー文化は世界一。バリスタ経験のあるワーホリは需要が高い。給料、トレーニング、勤務条件を解説します。',
  },

  'waiter-waitress-working-holiday-australia': {
    title: 'ウェイター・ウェイトレスの仕事：レストラン・カフェの実態',
    description: 'レストラン・カフェのフロアサービスはワーホリで最も一般的な仕事の一つ。給料、ペナルティレート、勤務環境を解説します。',
  },

  'kitchen-hand-working-holiday-australia': {
    title: 'キッチンハンドの仕事：英語に自信がなくても始めやすい',
    description: 'キッチンハンドは飲食業で最も入りやすい職種。英語スキルや経験を問われず、ワーホリ初心者にも人気の仕事です。',
  },

  'construction-laborer-working-holiday-australia': {
    title: '建設業の労働者：高時給とWhite Card',
    description: '建設業はワーホリでも高時給の入門職種。White Card取得が必須。給料、勤務条件、注意点を詳しく解説します。',
  },

  'uber-eats-delivery-rider-working-holiday-australia': {
    title: 'Uber Eats・フードデリバリーで働く：自転車・原付配達',
    description: '自転車・E-bike・原付でのフードデリバリーは請負業務扱い。ABNが必要です。収入、税金、保険の注意点を解説します。',
  },

  'uber-driver-working-holiday-australia': {
    title: 'Uber・配車サービスドライバー：ABN・GST・BASの義務',
    description: 'オーストラリアの配車サービスドライバーはABN必須、GST登録は売上1ドルから必要、BAS四半期申告も。注意点を解説します。',
  },

  'ski-resort-jobs-working-holiday-australia': {
    title: 'スキーリゾートの仕事：6月〜9月のシーズン雇用',
    description: 'オーストラリアのスキーリゾートは6月〜9月。ビクトリア州・NSW州のリゾート求人について、給料・条件を解説します。',
  },

  'supermarket-work-coles-woolworths-working-holiday': {
    title: 'Coles・Woolworths・ALDIスーパーマーケットの仕事',
    description: '大手スーパーマーケットチェーンはワーホリを採用しています。レジ、品出し、デリ、夜勤など、職種と給料を解説します。',
  },

  'station-hand-cattle-station-working-holiday-australia': {
    title: '牧場（ステーション）の仕事：アウトバックでのワーホリ',
    description: '内陸の牛牧場（カトルステーション）の仕事はアウトバック体験ができる人気の選択肢。仕事内容、給料、暮らしを解説します。',
  },

  // ─── Medicare & Other (18 articles) ──────────────────────────────────────

  'what-is-medicare-working-holiday-makers': {
    title: 'メディケアとは？ワーホリも加入対象？',
    description: 'メディケアはオーストラリアの公的医療制度です。ほとんどのワーキングホリデー保持者は対象外。日本人ワーホリの状況を解説します。',
  },

  'countries-with-medicare-agreement-australia': {
    title: 'メディケア協定国（RHCA）：どの国がオーストラリアと協定？',
    description: 'オーストラリアと相互医療協定（RHCA）を結んでいる国の国民は、メディケアに加入できます。対象国リストと日本の状況を解説します。',
  },

  'medicare-levy-working-holiday-makers': {
    title: 'メディケア税（2%）はワーホリも払う？免除申請の方法',
    description: 'メディケア税は所得の2%。ほとんどのワーホリは免除申請ができます。日本人を含む対象外国民の免除手続きを解説します。',
  },

  'tax-file-number-declaration-form': {
    title: 'TFN宣言書（TFN Declaration Form）の正しい書き方',
    description: 'TFN宣言書は新しい仕事を始める際に雇用主に提出する重要な書類です。正しい記入方法と注意点を解説します。',
  },

  'what-does-tax-withheld-mean-payslip': {
    title: 'Tax Withheld（源泉徴収）とは？給与明細の見方',
    description: 'Tax Withheldは雇用主が給与から差し引く税金のことです。仕組み、計算方法、タックスリターンとの関係を解説します。',
  },

  'what-is-an-income-statement': {
    title: 'インカムステートメントとは？myGovで確認する方法',
    description: 'インカムステートメントは年間の給与・源泉徴収税額を示す書類。タックスリターンに必須です。myGovでの確認方法を解説します。',
  },

  'what-is-the-ato': {
    title: 'ATO（オーストラリア税務署）とは？役割と問い合わせ方',
    description: 'ATO（Australian Taxation Office）はオーストラリアの税務署。ワーホリが知っておくべきATOの役割と問い合わせ方法を解説します。',
  },

  'gross-pay-vs-net-pay-australia': {
    title: 'グロス給与とネット給与の違い：オーストラリアの給与計算',
    description: 'グロスは控除前、ネットは実際の受取額。給与明細を理解するための基本用語を、計算例とともに解説します。',
  },

  'do-working-holiday-makers-pay-tax-on-tips': {
    title: 'チップにも税金がかかる？ワーホリの申告義務',
    description: 'はい、雇用関係で受け取るチップは課税所得です。チップの正しい申告方法と注意点を解説します。',
  },

  'tax-obligations-after-leaving-australia': {
    title: '帰国後のオーストラリア税務義務：まだ終わっていない',
    description: 'オーストラリアを離れても税金の義務は残ります。タックスリターン、DASP、ATOからの通知について解説します。',
  },

  'what-is-superannuation-guarantee-charge': {
    title: 'Superannuation Guarantee Charge（SGC）とは？',
    description: '雇用主がスーパーを正しく支払わない場合、ATOが課す追加料金がSGCです。仕組みと、未払いスーパーを取り戻す方法を解説します。',
  },

  'opening-bank-account-australia-working-holiday': {
    title: 'オーストラリアで銀行口座を開設する方法【ワーホリ向け】',
    description: '給料を受け取るには現地銀行口座が必須。Commonwealth、ANZ、Westpacなど、ワーホリにおすすめの銀行と開設手順を解説します。',
  },

  'trs-tourist-refund-scheme-australia': {
    title: 'TRS（観光客還付制度）：帰国時にGST10%を取り戻す方法',
    description: '$300以上の買い物にはTRSで10%のGST還付を申請できます。空港での手続き、対象商品、注意点を詳しく解説します。',
  },

  'uk-medicare-reciprocal-agreement-australia': {
    title: 'イギリス国民のメディケア協定：UK-オーストラリアRHCA',
    description: 'イギリス国民はオーストラリアとのRHCAでメディケアに加入できます。日本人にはない特典の内容を比較解説します。',
  },

  'german-european-health-insurance-australia-working-holiday': {
    title: 'ドイツ・欧州のワーホリ保険事情：日本人との比較',
    description: 'ドイツはオーストラリアとRHCAを結んでいないため、メディケア対象外。欧州のワーホリの医療保険事情を日本人視点で解説します。',
  },

  'private-health-insurance-working-holiday-australia': {
    title: 'プライベート医療保険はワーホリに必要？',
    description: 'ワーホリビザの一部の条件として医療保険加入が義務。日本人ワーホリにおすすめの保険プランと費用を解説します。',
  },

  'emergency-medical-care-working-holiday-no-medicare': {
    title: 'メディケアなしで医療緊急時：費用と対処法',
    description: 'メディケア対象外のワーホリでも緊急医療は受けられます。費用、保険請求、日本人がよく直面するケースを解説します。',
  },

  'travel-insurance-vs-health-insurance-working-holiday': {
    title: '旅行保険 vs 医療保険：ワーホリに必要なのはどっち？',
    description: '旅行保険とオーストラリア医療保険はカバー範囲が違います。それぞれの違いと、ワーホリに最適な組み合わせを解説します。',
  },
}

// ─── HELPERS ───────────────────────────────────────────────────────────────
export function getJapaneseGuide(slug: string): { guide: Guide; isTranslated: boolean } | undefined {
  const enGuide = enGuides.find(g => g.slug === slug)
  if (!enGuide) return undefined

  const translation = jaPostTranslations[slug]
  if (translation) {
    return {
      guide: {
        ...enGuide,
        title: translation.title,
        description: translation.description,
        body: translation.body ?? enGuide.body,
      },
      isTranslated: !!translation.body,
    }
  }

  return { guide: enGuide, isTranslated: false }
}

export function getJapaneseGuides(): Guide[] {
  // Return all guides with Japanese title/description if available, else English
  return enGuides.map(g => {
    const t = jaPostTranslations[g.slug]
    if (t) return { ...g, title: t.title, description: t.description, body: t.body ?? g.body }
    return g
  })
}

export function getJapaneseCategoryMeta(slug: string): JaCategoryMeta | undefined {
  return jaCategoryMeta.find(c => c.slug === slug)
}

// Re-export English helpers we still need
export { enCategoryMeta, enGuides }
export type { Category, CategoryMeta, Guide }
