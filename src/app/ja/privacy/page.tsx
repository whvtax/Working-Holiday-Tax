import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'Working Holiday Taxのプライバシーポリシー。お客様の個人情報の収集、利用、保護方法について説明します。',
  alternates: {
    canonical: '/ja/privacy',
    languages: {
      'en-AU': '/privacy',
      'de': '/de/privacy',
      'ja': '/ja/privacy',
      'x-default': '/privacy',
    },
  },
}

type Section = {
  title: string
  body?: string
  items?: string[]
}

const sections: Section[] = [
  {
    title: '1. はじめに',
    body: 'このプライバシーポリシーは、Working Holiday Tax（以下「当社」「私たち」）が、Privacy Act 1988（Cth）、Australian Privacy Principles（APPs）、およびNotifiable Data Breaches（NDB）スキームに従い、お客様の個人情報をどのように収集・利用・開示・保護するかを説明するものです。また、ATOおよび関係規制当局に対する、厳格な守秘義務を含むすべての義務を遵守しています。当社のウェブサイトを利用する、またはサービスをご利用いただくことで、本ポリシーに記載された方法での個人情報の収集および利用に同意したものとみなされます。',
  },
  {
    title: '2. 一般情報の免責事項',
    body: '当社ウェブサイト上の情報は一般的な情報提供のみを目的としており、個別の税務アドバイスを構成するものではありません。お客様個別の状況に応じたアドバイスについては、税理士または資格を持つ専門家にご相談ください。',
  },
  {
    title: '3. 収集する情報',
    body: 'サービス提供に必要な個人情報を収集します。これには以下が含まれます：',
    items: [
      '氏名および連絡先情報（メール、電話、住所）。',
      'タックスファイルナンバー（TFN）およびATO関連の通信記録。',
      '所得、雇用、財務情報。',
      '本人確認書類（パスポートや運転免許証など）。',
      '銀行口座情報（還付金の振込に必要）。',
      'フォーム、メール、電話、またはウェブサイトを通じて提供された情報。',
      'IPアドレス、ブラウザの種類、閲覧ページなどの非識別情報。',
    ],
  },
  {
    title: '4. 情報の利用方法',
    body: 'お客様の個人情報は以下の目的で利用されます：',
    items: [
      'オーストラリア国税局（ATO）へのタックスリターン準備および提出。',
      '本人確認、法的義務および規制上の義務の遵守。',
      '税務関連サービスおよびサポートの提供。',
      '税務に関するお客様とのコミュニケーション。',
      'サービスおよびお客様体験の改善。',
      'サービス関連の更新通知の送信（マーケティング通信はいつでも配信停止可能）。',
    ],
  },
  {
    title: '5. データセキュリティ',
    body: 'お客様の個人情報を不正利用、紛失、不正アクセスから保護するため、合理的な措置を講じています：',
    items: [
      '暗号化されたウェブサイト接続（SSL）。',
      'アクセス制限付きの安全なストレージシステム。',
      '権限を持つ担当者のみがアクセスできる管理体制。',
      '全スタッフおよび外部委託先に対する守秘義務。',
    ],
  },
  {
    title: '6. クッキーおよびウェブサイトトラッキング',
    body: 'ウェブサイトの利用状況把握、ユーザー体験の向上、パフォーマンスおよびトラフィックの監視のため、クッキーおよび解析ツール（Google Analyticsを含む）を使用しています。ブラウザの設定でクッキーを無効化することができます。当ウェブサイトを継続して利用することにより、本ポリシーに従ったクッキーの使用に同意したものとみなされます。',
  },
  {
    title: '7. 第三者への開示',
    body: 'お客様の個人情報を販売または取引することはありません。以下に限られた情報を共有する場合があります：',
    items: [
      '業務やコミュニケーションを支援する信頼できるサービスプロバイダー。',
      'ATOなど、法律で要求される規制当局。',
    ],
  },
  {
    title: '8. データの保管期間',
    body: 'オーストラリアの税法および規制要件に従い、個人および税務関連の記録を最低5年から7年間保管します。この期間の後、継続的な法的、コンプライアンス、またはサービス上の義務のために必要な場合を除き、情報は安全に廃棄または非識別化されます。',
  },
  {
    title: '9. お客様の権利',
    body: 'お客様には以下の権利があります：',
    items: [
      '当社が保有するお客様の個人情報へのアクセス。',
      '不正確な情報の訂正の請求。',
      '法的義務に従い、情報の削除を請求すること。',
      'マーケティング通信のいつでもの配信停止。',
    ],
  },
  {
    title: '10. 苦情および紛争解決',
    body: '個人情報の取り扱いに関するご懸念がある場合、書面でご連絡ください。30日以内に対応いたします。当社の対応にご満足いただけない場合、Office of the Australian Information Commissioner（OAIC）に苦情を申し立てることができます：www.oaic.gov.au。',
  },
  {
    title: '11. お問い合わせ',
    body: '本プライバシーポリシーまたはお客様の情報の取り扱いに関するご質問は、以下までお問い合わせください：',
    items: [
      '電話：0424 513 998',
      `メール：${EMAIL}`,
    ],
  },
]

export default function JapanesePrivacyPage() {
  return (
    <>
      <PageHeader
        kicker="法的情報"
        title="プライバシーポリシー"
        titleEm=""
        sub={<><span className="hidden lg:inline">最終更新日：2026年5月。お客様のプライバシー保護に努めています。</span><span className="lg:hidden">最終更新日：2026年5月。<br />お客様のプライバシー保護に努めています。</span></>}
        breadcrumbs={[{ label: 'ホーム', href: '/ja' }, { label: 'プライバシーポリシー' }]}
      />

      <section className="pt-0 pb-10 lg:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl">

            <p className="text-[13px] font-light text-body leading-[1.75] mb-8">
              当社はお客様のプライバシー保護に努め、個人情報を責任を持って取り扱います。
            </p>

            {sections.map((s, i) => (
              <div key={i} className={`mb-8 reveal delay-${(i % 4) + 1}`}>
                <h2 className="font-serif text-[16px] font-bold text-ink mb-2">{s.title}</h2>
                {s.body && (
                  <p className="text-[13px] font-light text-body leading-[1.75] mb-2">{s.body}</p>
                )}
                {s.items && (
                  <ul className="mt-2 space-y-1.5">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="mt-[7px] flex-shrink-0 rounded-full" style={{ width: '5px', height: '5px', minWidth: '5px', background: '#0B5240' }} />
                        <span className="text-[13px] font-light text-body leading-[1.75]">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  )
}
