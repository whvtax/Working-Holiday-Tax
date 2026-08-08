import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: '飲食業の税金控除：RSA資格・制服・チップの扱い（ワーホリ向け）',
  description: 'バー・カフェ・レストランで働くスタッフが確定申告で控除できるもの（RSA資格、滑り止め靴、制服のクリーニング代）を解説。あわせて、2つ・3つのカジュアルな仕事を掛け持ちするワーキングホリデーメーカーが陥りやすい非課税枠の間違いと、チップが課税対象になるかどうかも紹介します。',
  keywords: [
    '飲食業 税金控除 オーストラリア',
    'バーテンダー 税金控除',
    'ウェイトレス 確定申告 オーストラリア',
    'RSA資格 控除',
    '仕事の靴 税金 控除できる',
    'チップ 課税 オーストラリア',
    '掛け持ち 税金 オーストラリア',
    '非課税枠 複数雇用主',
    'ワーキングホリデー 飲食業 税金',
    '417 462ビザ 飲食業 税金',
    'バックパッカー バー 仕事 タックスリターン',
    'カジュアル 飲食業 税金控除',
  ],
  alternates: {
    canonical: `${SITE_URL}/ja/expenses/hospitality`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/hospitality`,
      'de': `${SITE_URL}/de/expenses/hospitality`,
      'ja': `${SITE_URL}/ja/expenses/hospitality`,
      'x-default': `${SITE_URL}/expenses/hospitality`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'ja_JP',
    url: `${SITE_URL}/ja/expenses/hospitality`,
    siteName: 'Working Holiday Tax',
    title: '飲食業の税金控除：RSA資格・制服・チップの扱い（ワーホリ向け）',
    description: '飲食業で働く人が控除できるものと、複数のカジュアル勤務を掛け持ちするワーキングホリデーメーカーが陥りやすい非課税枠の間違いを解説。',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: '飲食業の税金控除：RSA資格・制服・チップの扱い（ワーホリ向け）',
    description: '飲食業で働く人が控除できるものと、複数のカジュアル勤務を掛け持ちするワーキングホリデーメーカーが陥りやすい非課税枠の間違いを解説。',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const EMPLOYER_CHECKLIST = [
  'あなたのTFNと、その雇用主専用に記入したTax File Number Declaration（TFN宣言書）を提出すること。別の雇用主にすでに提出済みだからといって、自動的には引き継がれません。',
  '宣言書の居住区分で「Working Holiday Maker」を選択すること。雇用主の給与システムは、この選択をもとにワーキングホリデーメーカー向けの源泉徴収税率の対象かどうかを判断します。',
  '非課税枠の質問には、すべての雇用主に対して毎回「いいえ（No）」と答えること。最も収入の多い仕事であっても例外ではありません。',
]

const faqs = [
  {
    question: '黒い仕事用の靴やパンツは控除できますか？',
    answer: 'ロゴのない無地の黒い服や靴は、職場のドレスコードで義務付けられていても控除の対象になりません。ATOはこれを制服ではなく普段着とみなします。滑り止め付きの靴は別です。バーの濡れた床や忙しいキッチンパスで本当に必要な場合は保護靴として扱われ、色にかかわらず控除できます。',
  },
  {
    question: '2つのバーで同時に働いています。それぞれの雇用主に何を伝える必要がありますか？',
    answer: '各雇用主にTFNを伝え、雇用主ごとに個別のTax File Number Declaration（TFN宣言書）を記入してください。TFNは自動的には引き継がれません。どの宣言書でも居住区分は「Working Holiday Maker」を選択し、非課税枠の質問には「いいえ」と答えてください。メインの仕事だけでなく、すべての雇用主で同じです。ワーキングホリデーメーカーの税率は年収45,000ドルまで一律15%のため、どちらの仕事にも18,200ドルの居住者向け非課税枠を適用してはいけません。',
  },
  {
    question: 'チップは課税対象になりますか？',
    answer: 'はい、課税対象です。給与システムを通じて支払われるチップやサービス料（プールされたチップやトロンク制度によるものを含む）は給与の一部として扱われ、すでに課税済みで、インカムステートメントにも反映されています。お客様から直接手渡しされる現金のチップも同様に課税対象ですが、誰もそれを記録してくれません。ご自身で簡単な記録をつけ、合計額を申告する責任があります。',
  },
  {
    question: 'カジュアルの飲食業の仕事でもスーパーアニュエーションはもらえますか？',
    answer: 'はい、もらえます。カジュアルの仕事でも他の仕事と同様に、雇用主は最初の1ドルから給与に加えて12%のスーパーを支払う義務があります。毎月の最低収入基準は現在はありません。複数の職場で働く場合、それぞれの雇用主が独立してスーパーを支払うため、拠出先が複数のファンドに分かれることがあります。',
  },
  {
    question: 'ある雇用主だけ、他よりも税金が多く源泉徴収されています。なぜですか？',
    answer: '多くの場合、その雇用主がまだあなたのTax File Number Declaration（TFN宣言書）を受理していないか、ワーキングホリデーメーカー税率での源泉徴収登録をしていないことが原因です。いずれの場合も、状況が解消されるまでは通常よりも高い税率で源泉徴収することが義務付けられています。お金が失われるわけではありません。すべての雇用主からの収入がタックスリターン上で合算されると、総収入に対して正しい15%の税率が適用され、多く引かれていた分は還付されます。',
  },
  {
    question: 'RSA資格や応急処置資格の費用は控除できますか？',
    answer: 'はい、できます。職務上必要な場合、RSA（責任あるアルコール提供）資格の取得・更新費用は控除の対象になります。応急処置資格の保有が仕事の一部である場合も同様です。証拠として、研修機関発行のレシートを保管しておいてください。',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
    { '@type': 'ListItem', position: 2, name: '経費', item: `${SITE_URL}/ja/expenses` },
    { '@type': 'ListItem', position: 3, name: 'ホスピタリティ', item: `${SITE_URL}/ja/expenses/hospitality` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '飲食業の税金控除：RSA資格・制服・チップの扱い（ワーホリ向け）',
  description: '飲食業で働く人が控除できるものと、複数のカジュアル勤務を掛け持ちするワーキングホリデーメーカーが陥りやすい非課税枠の間違いを解説。',
  url: `${SITE_URL}/ja/expenses/hospitality`,
  inLanguage: 'ja',
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

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

const linkStyle = { color: '#0B5240', textDecoration: 'underline' }

export default function HospitalityExpensesPageJA() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

            <nav aria-label="パンくずリスト" className="mb-4 lg:mb-5">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li><Link href="/ja" style={{ color: '#587066' }}>ホーム</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li><Link href="/ja/expenses" style={{ color: '#587066' }}>経費</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>ホスピタリティ</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '24ch' }}>
                <span style={{ color: '#0B5240' }}>飲食業で働く人</span>が確定申告で控除できるものとは？
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '50ch' }}>
                バーやカフェ、レストランでの給与計算自体はシンプルです。ワーキングホリデーメーカーにとって本当の落とし穴は、2つ、3つのカジュアルな仕事を同時に掛け持ちすること。まず気をつけたいのが、TFN宣言書にある非課税枠（タックスフリースレッショルド）の質問です。
              </p>
            </div>
          </div>
        </section>

        {/* ── WORKING MORE THAN ONE JOB (this page's unique hook) ──────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                複数の飲食業の仕事を同時に掛け持ちする場合
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                飲食業では、同じ週に2つ、3つのカジュアルな仕事を掛け持ちするのは珍しくありません。あるカフェでのランチタイムのシフト、レストランでのディナータイムの仕事、週末のバーでのシフトといった具合です。これ自体はまったく普通のことで、何も問題はありません。大切なのは、メインの仕事だけでなく、すべての雇用主に対して1つの書類を正しく提出することです。
              </p>
            </div>

            <p className="font-semibold text-center" style={{ fontSize: '13px', color: '#0B5240', marginBottom: '16px' }}>
              新しい雇用主ごとに、次の3つが必要です：
            </p>
            <div className="max-w-[680px] mx-auto" style={{ marginBottom: '28px' }}>
              <div className="flex flex-col gap-3">
                {EMPLOYER_CHECKLIST.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-[680px] mx-auto">
              <div className="taxres-savings-box">
                <div>
                  <p className="taxres-savings-heading">オーストラリア居住者向けのルールとは異なります</p>
                  <p className="taxres-savings-body">
                    オーストラリア人の友人や同僚から、「非課税枠は一番収入が多い仕事だけで申請すればいい」と聞くことがあるかもしれません。しかしそれは税務上の居住者向けのアドバイスで、居住者は毎年最初の18,200ドルの所得が非課税になります。417・462ビザで働くあなたには当てはまりません。ワーキングホリデーメーカーには、そもそもどの雇用主からも非課税枠が一切適用されないため、記入するすべてのTFN宣言書で正しい答えは「いいえ」です。どんなに小さなシフトの仕事であっても「はい」と答えてしまうと、その雇用主の源泉徴収が不足し、タックスリターンを提出した時点でその不足分が納税額として請求されることになります。
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginTop: '22px' }}>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                ここで起こりうる問題は2種類あり、その場では同じようには感じられません。どこかで非課税枠の質問に「はい」と答えてしまうと、その雇用主ではその後も源泉徴収が不足したままとなり、<Link href="/ja/tax-return" style={linkStyle}>タックスリターン</Link>を提出した時点でその不足分が納税額として請求されます。逆に、新しい雇用主に宣言書を提出し忘れたり、ATOにワーキングホリデーメーカー税率での源泉徴収登録をしていない雇用主のもとで働いたりすると、反対のことが起こります。その仕事の分だけ税金が引かれすぎるのです。ただし、お金が失われるわけではありません。すべての雇用主のインカムステートメント（年間の収入報告書）がタックスリターン上で合算されると、総収入に対して正しい15%の税率が適用され、引かれすぎていた分は還付金の一部として戻ってきます。
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                スーパーアニュエーションは、これらとは完全に別の話です。カジュアルの飲食業の仕事でも、他の仕事と同様に、雇用主は最初の1ドルから給与に加えて<Link href="/ja/superannuation" style={linkStyle}>12%のスーパー</Link>を支払う義務があります。2022年7月以降、毎月の最低収入基準はありません。複数の職場で働いていると、スーパーが複数のファンドに分かれてしまうことも珍しくありませんが、それでもすべてあなたのお金であり、オーストラリアを離れる前に当社が見つけ出すお手伝いをします。
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                それぞれの職場でTFN宣言書が正しく設定されているか不安な場合は、当社の<Link href="/ja/tfn" style={linkStyle}>TFNページ</Link>で、各雇用主が何を必要としているのか、その理由も含めて詳しく解説しています。
              </p>
            </div>
          </div>
        </section>

        {/* ── TIPS, PENALTY RATES & CASUAL LOADING ─────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                チップ、ペナルティレート、カジュアルローディングは課税対象ですか？
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '54ch' }}>
                結論から言うと、はい、すべて課税対象です。飲食業の給与の種類ごとに、実際にどう扱われるかを見ていきましょう。
              </p>
            </div>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              カジュアルローディングや、夜間・週末・祝日のペナルティレートは、別枠やインフォーマルな支払いではありません。これらは通常の給与の一部であり、他の給与と同じように課税され、給与明細やインカムステートメントに記載されている総支給額にすでに含まれています。
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              チップやサービス料も同じ扱いです。お店がチップをプールしたり、会計にサービス料を上乗せしたりして給与システムを通じて支払う場合（トロンク制度と呼ばれることもあります）、その金額はあなたの給与の一部です。他の給与と同じように税金が源泉徴収され、インカムステートメントにもすでに反映されています。<Link href="/ja/tax-return" style={linkStyle}>タックスリターン</Link>を作成する際、それとは別に何かする必要はありません。
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              お客様から直接手渡しされる現金も課税対象です。ただ、それは誰も記録してくれません。日付とおおよその金額を簡単にメモしておく程度で構いませんので、ご自身で記録をつけ、タックスリターンの際に合計額を所得として申告する責任があります。
            </p>
          </div>
        </section>

        {/* ── WHAT YOU CAN / CAN'T CLAIM ───────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                控除できるもの・できないもの
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '56ch' }}>
                実際に控除できる、仕事に関連した経費を簡潔にまとめました。あわせて、職場で義務付けられていても無地の黒い仕事着が対象外になる理由も解説します。
              </p>
            </div>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              給与以外にも、飲食業で働く人が控除できる、仕事に関連した経費が実際にいくつかあります。判断基準はどの職業でも共通で、自分で支払ったこと、収入を得ることに直接関係していること、そしてレシートを提示できることです。衣類についてはさらに追加の基準があり、飲食業で働く人の多くがここでつまずきます。
            </p>

            <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#0B5240', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              RSA資格・応急処置資格
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              職務上、有効なRSA（責任あるアルコール提供）資格の保有が必要な場合、取得・更新にかかった費用は控除の対象になります。応急処置資格の保有が職務上必要な場合も同様です。どちらも、報酬を得ている仕事をするための資格を得るための直接的な費用であり、これはまさに控除の判断基準が求めているものです。どのみち身につけていたであろう一般的なスキルとは異なります。
            </p>

            <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#0B5240', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              滑り止め付きの保護靴
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              滑り止め付きのつま先を覆う靴は、仕事上本当に必要な場合、控除の対象になります。たとえば、バーの濡れた床、コーヒーマシン周りのこぼれた液体、キッチンパスで熱い皿を運ぶ場面などです。これらは普段の靴とは異なる「保護靴」というカテゴリーとして扱われます。ドレスコードを満たすためではなく、特定の安全上の役割を果たしているからです。
            </p>

            <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#0B5240', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              必須の制服のクリーニング代
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              雇用主のロゴが入った制服の着用が義務付けられている場合、そのクリーニング代は控除の対象になります。税務上、それを普段着ではなく「制服」たらしめているのはロゴの存在です。仕事以外では自分から選んで着ることのない、義務的かつ特徴的なアイテムだからです。
            </p>

            <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#B54708', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              控除できないもの
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              無地の黒いパンツ、無地の黒いシャツ、ロゴのない無地の黒い靴は、職場のドレスコードで義務付けられていても控除の対象にはなりません。これは最も多くの人がつまずくポイントです。仕事のためだけに購入した服で、普段なら全身黒でコーディネートすることもなかったはずなのに、不公平に感じられるからです。しかしATOが見ているのは、なぜそれを購入したかではなく、そのアイテムが実際に何であるかです。無地の黒い服は、雇用主のドレスコードの内容にかかわらず、誰でもどこでも着られる普通の普段着とみなされます。
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              控除対象の制服として認められるには、上記の滑り止め靴のように職業に特有であるか保護的な役割を持つか、あるいはロゴのように本当に特徴的な必須の制服である必要があります。雇用主がドレスコードに厳格であっても、それだけでアイテムのカテゴリーが変わるわけではありません。マネージャーがどれだけ強く求めても、無地の黒いシャツはあくまで無地の黒いシャツであり、誰がどこで着ても変わりません。
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              他の仕事も掛け持ちしている方、他の職業と比べてみたい方は、<Link href="/ja/expenses" style={linkStyle}>職業別の控除ガイド</Link>をご覧ください。
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }} className="lg:py-14">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">よくあるご質問</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  飲食業の税金に関するご質問
                </h2>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  掲載されていないご質問もお気軽にお問い合わせください。
                </p>
              </div>
              <div className="max-w-[700px]">
                <Accordion items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
        <NextStep
          eyebrow="次のステップ"
          heading="複数の仕事の掛け持ちでも大丈夫です。"
          body="すべての雇用主でTFN宣言書を正しく提出できたら、次のステップは飲食業の収入をすべてまとめてタックスリターンを提出することです。"
          cta="タックスリターンに進む →"
          href="/ja/tax-return"
        />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              これは一般的な情報であり、個別の税務アドバイスではありません。特に雇用主が複数になると、一人ひとりの状況は少しずつ異なります。当社でお手続きいただく際には、登録税理士の監督のもとで、お客様の給与明細やインカムステートメントを一つひとつ確認し、非課税枠の回答、控除、チップがすべて正しく反映されるようにいたします。
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
