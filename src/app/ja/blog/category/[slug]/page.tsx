import { SITE_URL } from '@/lib/constants'
import { catLabelJa } from '@/lib/category-labels'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryColor } from '@/app/blog/data'
import CategoryHero from '@/app/blog/[slug]/CategoryHero'
import { getJapaneseGuides, jaCategoryMeta, getJapaneseCategoryMeta } from '../../data'
import { MobileCta } from '@/components/ui/MobileCta'
import { waUrl } from '@/lib/wa'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return jaCategoryMeta.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = getJapaneseCategoryMeta(params.slug)
  if (!meta) return {}
  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      'オーストラリア ワーホリ 税金',
      meta.category,
      'ワーキングホリデービザ',
      '417ビザ',
      '462ビザ',
      'WHM 税金',
    ],
    alternates: {
      canonical: `${SITE_URL}/ja/blog/category/${meta.slug}`,
      languages: {
        // EN uses a different slug for the Medicare category (medicare-and-other)
        'en-AU': `${SITE_URL}/blog/category/${meta.slug === 'medicare' ? 'medicare-and-other' : meta.slug}`,
        'de': `${SITE_URL}/de/blog/category/${meta.slug}`,
        'ja': `${SITE_URL}/ja/blog/category/${meta.slug}`,
        'x-default': `${SITE_URL}/blog/category/${meta.slug === 'medicare' ? 'medicare-and-other' : meta.slug}`,
      },
    },
    openGraph: {
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/ja/blog/category/${meta.slug}`,
      siteName: 'Working Holiday Tax',
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      images: [`${SITE_URL}/og-image.png`],
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
  }
}

/* ── The category introduction ────────────────────────────────────────────
   Same rewrite as the English category pages. A category page is the natural
   hub for its cluster and these were one sentence of throat clearing above a
   grid of cards. Two paragraphs per category that stand on their own: what
   the category covers, and who it is for, ending on what decides the answer
   rather than on how to do it yourself. Then one link to the service page
   that owns the cluster, which the localised category meta never carried.

   The copy lives here rather than in data.ts because another rewrite owns
   that file.                                                               */

interface CategoryIntro {
  paragraphs: string[]
  service: { path: string; label: string } | null
}

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

export default function JapaneseCategoryPage({ params }: Props) {
  const meta = getJapaneseCategoryMeta(params.slug)
  if (!meta) notFound()

  const allGuides = getJapaneseGuides()
  const articles = allGuides.filter(g => g.category === meta.category)
  const colors = getCategoryColor(meta.category)
  const intro = CATEGORY_INTRO[meta.slug]

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/ja/blog/category/${meta.slug}`,
    inLanguage: 'ja',
    isPartOf: { '@type': 'WebSite', name: 'Working Holiday Tax', url: `${SITE_URL}` },
    about: { '@type': 'Thing', name: meta.category },
    audience: { '@type': 'Audience', name: 'オーストラリアのワーキングホリデービザ保持者（サブクラス417・462）' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/ja/blog/${g.slug}`,
        name: g.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
      { '@type': 'ListItem', position: 2, name: 'ブログ', item: `${SITE_URL}/ja/blog` },
      { '@type': 'ListItem', position: 3, name: meta.category, item: `${SITE_URL}/ja/blog/category/${meta.slug}` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ja',
    mainEntity: meta.faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '68px' }}>

        <section style={{ background: colors.bg }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px 48px' }}>

            <nav aria-label="パンくずリスト" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#4C6459', marginBottom: '16px' }}>
              <Link href="/ja" style={{ color: 'inherit', textDecoration: 'none' }}>ホーム</Link>
              <span aria-hidden="true">/</span>
              <Link href="/ja/blog" style={{ color: 'inherit', textDecoration: 'none' }}>ブログ</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" style={{ color: colors.text }}>{catLabelJa(meta.category)}</span>
            </nav>

            <div className="inline-flex items-center gap-2" style={{ marginBottom: '12px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.text, display: 'inline-block' }} aria-hidden="true" />
              <span style={{ fontSize: '13px', letterSpacing: '0.06em', color: colors.text, fontWeight: 600 }}>
                {articles.length}件の記事
              </span>
            </div>

            <h1 className="font-serif font-black" style={{ fontSize: 'clamp(26px, 4vw, 42px)', lineHeight: 1.2, letterSpacing: '-0.02em', color: '#080F0D', marginBottom: '12px', maxWidth: '760px' }}>
              {meta.title}
            </h1>

            <p style={{ fontSize: 'clamp(16px, 1.3vw, 17px)', lineHeight: 1.8, color: '#2A3C34', maxWidth: '680px', fontWeight: 400, marginBottom: '24px' }}>
              {meta.intro}
            </p>

            {meta.relatedServicePath && (
              <Link
                href={meta.relatedServicePath}
                className="topic-pill"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '100px', background: '#0B5240', color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}
              >
                {meta.relatedServiceLabel} →
              </Link>
            )}

          </div>
        </section>

        {/* What this category covers, and who it is for */}
        {intro && (
          <section style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 20px 8px' }}>
            <h2 className="font-serif" style={{ fontSize: 'clamp(21px, 2.4vw, 26px)', fontWeight: 700, color: '#0B5240', letterSpacing: '-0.022em', lineHeight: 1.3, marginBottom: '16px' }}>
              このカテゴリーが扱う内容と、対象になる人
            </h2>
            {/* 68ch は「0」の幅を基準にするため、日本語では約34文字。英語版と同じ
                値でも、日本語として読みやすい行長になる。指定がないと1行が48文字
                前後まで伸びる。 */}
            {intro.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: '15.5px', color: '#2A3C34', lineHeight: 1.85, fontWeight: 400, marginBottom: '1rem', maxWidth: '68ch' }}>
                {p}
              </p>
            ))}
            {intro.service && (
              <p style={{ fontSize: '15.5px', lineHeight: 1.85, fontWeight: 400, marginBottom: 0 }}>
                <Link
                  href={intro.service.path}
                  style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  {intro.service.label}
                </Link>
              </p>
            )}
          </section>
        )}

        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px 24px' }}>

          <h2 className="font-serif" style={{ fontSize: '20px', fontWeight: 700, color: '#080F0D', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            {catLabelJa(meta.category)}の記事をすべて見る（{articles.length}件）
          </h2>

          <div className="category-grid">
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`/ja/blog/${article.slug}`}
                className="category-card"
                style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '0', background: '#fff', textDecoration: 'none', borderRadius: '16px', border: '1px solid #E2EFE9' }}
              >
                <div className="blog-card-hero" style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
                  <CategoryHero category={article.category} title={article.title} slug={article.slug} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px 22px 22px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '13px',
                      padding: '4px 11px',
                      borderRadius: '100px',
                      background: colors.bg,
                      color: colors.text,
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      border: `1px solid ${colors.border}`,
                    }}>
                      {catLabelJa(article.category)}
                    </span>
                    <span style={{ color: '#CDE3DB' }}>·</span>
                    <span style={{ fontSize: '13px', color: '#4C6459' }}>{article.readTime}分で読めます</span>
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', lineHeight: 1.4, letterSpacing: '-0.015em', margin: 0 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#4C6459', lineHeight: 1.75, margin: 0, fontWeight: 400, flex: 1 }}>
                    {article.description}
                  </p>
                  <span style={{ fontSize: '14px', color: '#0B5240', fontWeight: 600, marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    続きを読む <span className="read-arrow">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 20px 60px', borderTop: '1px solid #E2EFE9', marginTop: '48px' }}>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: colors.text, letterSpacing: '0.06em', marginBottom: '8px' }}>
              よくあるご質問
            </p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 700, color: '#0B5240', marginBottom: '0', letterSpacing: '-0.02em' }}>
              よくあるご質問
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {meta.faq.map((f, i) => (
              <details key={i} className="faq-item" style={{ borderBottom: '1px solid #E2EFE9', padding: '16px 0', cursor: 'pointer' }}>
                <summary className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', letterSpacing: '-0.015em', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span style={{ flexShrink: 0, color: colors.text, fontSize: '20px', fontWeight: 300, lineHeight: 1 }}>+</span>
                </summary>
                {/* 段落ごとに1つの<p>。長い回答がスマホで1つの塊にならない
                    ようにする。上の faqLd は元の f.answer を使うため、構造化
                    データは変わらない。回答自体は data.ts にあり、別の作業の
                    担当範囲。 */}
                {f.answer.split('\n\n').map((para, j) => (
                  <p key={j} style={{ fontSize: '15px', color: '#2A3C34', lineHeight: 1.85, fontWeight: 400, marginTop: '12px', marginBottom: 0 }}>
                    {para}
                  </p>
                ))}
              </details>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px 80px' }}>
          <h2 className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', marginBottom: '16px', letterSpacing: '-0.015em' }}>
            他のカテゴリー
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {jaCategoryMeta
              .filter(c => c.slug !== meta.slug)
              .map(c => {
                const cColors = getCategoryColor(c.category)
                return (
                  <Link
                    key={c.slug}
                    href={`/ja/blog/category/${c.slug}`}
                    className="topic-pill"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '100px',
                      border: `1px solid ${cColors.border}`,
                      background: cColors.bg,
                      fontSize: '13px',
                      color: cColors.text,
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    {catLabelJa(c.category)}
                  </Link>
                )
              })}
            <Link
              href="/ja/blog"
              className="topic-pill"
              style={{ padding: '8px 16px', borderRadius: '100px', border: '1px solid #0B5240', background: '#0B5240', fontSize: '13px', color: '#fff', textDecoration: 'none', fontWeight: 600 }}
            >
              すべての記事 →
            </Link>
          </div>
        </section>

      </main>
      <MobileCta href={waUrl({ topic: "guide", lang: "ja" })} lang="ja" topic="guide" />
    </>
  )
}
