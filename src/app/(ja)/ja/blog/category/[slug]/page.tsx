/**
 * Japanese category hub. Template logic lives in LocaleCategoryPage; this
 * file carries the Japanese half of the config plus the per-category
 * introductions. Values reproduce the pre-merge page exactly (HTML
 * byte-compared).
 */
import type { Metadata } from 'next'
import { catLabelJa } from '@/lib/category-labels'
import { getJapaneseGuides, jaCategoryMeta, getJapaneseCategoryMeta } from '../../data'
import {
  LocalizedCategoryPage,
  buildCategoryMetadata,
  localizedCategoryStaticParams,
  type CategoryLocaleConfig,
  type CategoryIntro,
} from '@/components/blog/LocaleCategoryPage'

/* ── The category introduction ────────────────────────────────────────────
   Two paragraphs per category that stand on their own: what the category
   covers, and who it is for, ending on what decides the answer rather than
   on how to do it yourself. Then one link to the service page that owns the
   cluster. The copy lives here rather than in data.ts because another
   rewrite owns that file. */

const CATEGORY_INTRO: Record<string, CategoryIntro> = {
  'tfn': {
    paragraphs: [
      'Tax File Number（TFN）は、オーストラリア税務署（ATO）があなたを識別するための番号です。番号そのものに政府手数料はかかりません。お金がかかるのは番号がない期間で、給与は15%ではなく45%で源泉徴収されます。ここでは申請そのもの、番号を待っている間の就労、28日を超える遅延、番号を紛失した場合、必要な身分証明書、そしてセカンドビザで新しい番号が要るかどうかを扱っています。',
      '対象は、着いたばかりの人や、働き始めてから給与の15%ではなく45%が引かれていることに気づいた人です。お金の差が生まれるのはTFNそのものではありません。',
      '決め手になるのは、最初の週に雇用主から渡されるTax File Number Declarationという書類、申請日ではなく初出勤日から始まる28日間、そしてその雇用主がATOにワーキングホリデー雇用主として登録されているかどうかです。',
    ],
    service: { path: '/ja/tfn', label: 'TFNと申告フォームについて当社がすること' },
  },
  'abn': {
    paragraphs: [
      'Australian Business Number（ABN）は、雇用ではなく請負として支払いを受けるときに請求書に使う番号です。ここでは登録と抹消、GSTと年間売上7万5千ドルの基準、請求書の要件、事業経費、車両の走行記録、そして請求による収入が給与と同じ申告書の中でどう扱われるかを扱っています。',
      '対象は、ファームやデリバリーのプラットフォーム、飲食店などからABNを取るように言われた人と、すでに持っていて何が変わるのか分かっていない人です。重要な点は2つです。',
      'ABNでの支払いからは源泉徴収がなく、スーパーも支払われないため、税金は少しずつではなく年度末にまとめて来ます。そして区分は契約書の言葉ではなく、実際の働き方で判断されます。同じ仕事、同じ時間、同じ指示のまま給与から請求に切り替えられた場合が、まず読むべき内容です。',
    ],
    service: { path: '/ja/abn', label: 'ABNで請求していた場合に当社がすること' },
  },
  'tax-return': {
    paragraphs: [
      'オーストラリアの会計年度は7月1日から6月30日までで、この期間に収入があった人はタックスリターンを提出します。ここでは期限と加算税、控除と領収書、税務上の居住区分、提出済みの年の修正、帰国後の提出、そして還付額を実際に左右するものを扱っています。',
      '自分で提出するか任せるかを決める段階の人のためのカテゴリーです。ご本人の事情によって決まり、きちんと確認する必要がある税務上の居住区分。TFNが給与担当に届く前に45%で引かれていた期間。メディケア税の扱い。そして実際にした仕事に対応する控除。どれも表を見て調べられるものではありません。',
    ],
    service: { path: '/ja/tax-return', label: 'すべてのタックスリターンで当社が確認すること' },
  },
  'super': {
    paragraphs: [
      'スーパーアニュエーションは、給与とは別に雇用主が年金基金へ払い込むお金で、2026年7月1日からは12%です。オーストラリアを完全に離れるときに、Departing Australia Superannuation Payment（DASP）として受け取れます。ここでは積み立ての仕組み、残高の確認方法、見失った口座の探し方、DASPの手続き、必要書類、そして受取時の課税を扱っています。',
      '対象はワーキングホリデーの終わりにいる人、特に複数の雇用主でカジュアルとして働き、お金が複数の口座に分かれている可能性がある人です。',
      '金額と所要期間を決めるのは2点です。申請前にTFNに紐づくすべての口座を見つけたかどうか。申請では指定したファンドしか引き出せません。そして、ビザの終了に対していつ申請するかです。受取額にはワーキングホリデーの場合65%の税がかかり、これは法律で決まっていて動かせません。',
    ],
    service: { path: '/ja/superannuation', label: '出国前にスーパーについて当社がすること' },
  },
  'work-rights': {
    paragraphs: [
      'ワーキングホリデーで働く人にも、オーストラリアの他の労働者と同じ権利があります。最低賃金、割増賃金、休憩、休暇、シフトの取り消し、解雇は、Fair Work Commissionと業種ごとのAwardで定められています。ここでは何を受け取る権利があるか、給与明細の読み方、数字が合わないときにどうするか、一部の仕事で必要な資格を扱っています。',
      'シーズンの終わりではなく、途中にいる人に向けて書いています。ここにある内容の多くは税金の話ではありません。',
      'それでもこのサイトにあるのは、同じ1年が二度出てくるからです。賃金が不足していた雇用主、現金払いだった雇用主、スーパーを払っていなかった雇用主は、そのまま所得証明が実際の支払いと一致しない雇用主でもあります。それはタックスリターンの時にまた表面化します。',
    ],
    service: { path: '/ja/tax-return', label: 'すべてのタックスリターンで当社が確認すること' },
  },
  'medicare-and-other': {
    paragraphs: [
      'メディケア税は課税所得に対する2%の負担で、何もしなければ自動的に引かれます。417・462ビザ保持者の多くはメディケアの対象ではなく、本来支払う必要はありませんでした。ここでは対象になる人とならない人、相互医療協定を結んでいる国、免除の申請方法、滞在中の医療保険、そしてほかに分類できない事務的な問題を扱っています。',
      '年収2万5千ドルなら500ドルです。免除は自動ではなく、ATOが代わりに適用してくれることもありません。',
      '申告書で申請する必要があり、そのためにServices AustraliaのMedicare Entitlement Statementが必要で、これは自分で申請し、届くまで数週間かかるのが普通です。そもそも免除の対象になるかどうかはパスポートで決まります。',
    ],
    service: { path: '/ja/medicare', label: 'メディケア税について当社がすること' },
  },
}

const cfg: CategoryLocaleConfig = {
  locale: 'ja',
  basePath: '/ja',
  ogLocale: 'ja_JP',
  categoryMeta: jaCategoryMeta,
  getCategoryMeta: getJapaneseCategoryMeta,
  getGuides: getJapaneseGuides,
  catLabel: catLabelJa,
  categoryIntro: CATEGORY_INTRO,

  metaKeywords: (category) => [
    '\u30aa\u30fc\u30b9\u30c8\u30e9\u30ea\u30a2 \u30ef\u30fc\u30db\u30ea \u7a0e\u91d1',
    category,
    '\u30ef\u30fc\u30ad\u30f3\u30b0\u30db\u30ea\u30c7\u30fc\u30d3\u30b6',
    '417\u30d3\u30b6',
    '462\u30d3\u30b6',
    'WHM \u7a0e\u91d1',
  ],
  audienceName: '\u30aa\u30fc\u30b9\u30c8\u30e9\u30ea\u30a2\u306e\u30ef\u30fc\u30ad\u30f3\u30b0\u30db\u30ea\u30c7\u30fc\u30d3\u30b6\u4fdd\u6301\u8005\uff08\u30b5\u30d6\u30af\u30e9\u30b9417\u30fb462\uff09',

  homeLabel: '\u30db\u30fc\u30e0',
  blogLabel: '\u30d6\u30ed\u30b0',
  breadcrumbAriaLabel: '\u30d1\u30f3\u304f\u305a\u30ea\u30b9\u30c8',
  articleCount: (n) => `${n}\u4ef6\u306e\u8a18\u4e8b`,
  coversHeading: '\u3053\u306e\u30ab\u30c6\u30b4\u30ea\u30fc\u304c\u6271\u3046\u5185\u5bb9\u3068\u3001\u5bfe\u8c61\u306b\u306a\u308b\u4eba',
  gridHeading: (label, n) => `${label}\u306e\u8a18\u4e8b\u3092\u3059\u3079\u3066\u898b\u308b\uff08${n}\u4ef6\uff09`,
  readTimeLabel: (m) => `${m ?? ''}\u5206\u3067\u8aad\u3081\u307e\u3059`,
  readMoreLabel: '\u7d9a\u304d\u3092\u8aad\u3080',
  faqKickerLabel: '\u3088\u304f\u3042\u308b\u3054\u8cea\u554f',
  faqHeading: '\u3088\u304f\u3042\u308b\u3054\u8cea\u554f',
  otherCategoriesHeading: '\u4ed6\u306e\u30ab\u30c6\u30b4\u30ea\u30fc',
  allArticlesLabel: '\u3059\u3079\u3066\u306e\u8a18\u4e8b \u2192',

  styles: {
    countBadge: (color) => ({ fontSize: '13px', letterSpacing: '0.06em', color, fontWeight: 600 }),
    h1: { lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '760px' },
    introP: { lineHeight: 1.8, maxWidth: '680px' },
    coversHeadingLineHeight: 1.3,
    coversPLineHeight: 1.85,
    cardTitleLineHeight: 1.4,
    cardDescLineHeight: 1.75,
    faqKicker: (color) => ({ fontSize: '13px', fontWeight: 700, color, letterSpacing: '0.06em' }),
    faqHeadingLetterSpacing: '-0.02em',
    faqAnswerLineHeight: 1.85,
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return localizedCategoryStaticParams(cfg)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildCategoryMetadata(cfg, (await params).slug)
}

export default async function JapaneseCategoryPage({ params }: Props) {
  return <LocalizedCategoryPage cfg={cfg} slug={(await params).slug} />
}
