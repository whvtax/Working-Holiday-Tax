# r04-ja: Japanese tax return and super (WHT), myGov problem guides

Date 24 Nov 2026. Research only, repository not edited. Code read: /home/claude/v68/base20 (v69 zip).
Data: S/gsc24/wht/Queries.csv, Pages.csv (22 Aug to 21 Nov); S/analysis/a07, a17; Phase 1 doc docs/SEO_AI_PHASE1_V68_2026-11-24.md.
Limit: the shared web search budget ran out during this task. Facts below are only those fetched from official pages; the
ATO overseas phone number and the "link ATO to myGov" identity questions could NOT be verified and are left out.

## Official sources used (URL keys used below)
- U1 my.gov.au SMS codes: https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms
  (overseas: keep the same Australian number with international roaming; no access to old number: sign in with Digital ID; you can create a new account)
- U2 my.gov.au sign in help: https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help
  (no SMS code: "you may be able to sign in with" Digital ID, passkey, myGov app; locked after too many wrong attempts, email sent, no Digital ID/passkey/app sign in while locked; unusual activity turns off email and mobile as usernames and reset codes stop)
- U3 my.gov.au overseas: https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas
  (no changes needed before going overseas if you use a passkey; SMS and code generator users must make sure they can get codes)
- U4 my.gov.au contact: https://my.gov.au/en/about/help/contact (from outside Australia +61 1300 169 468, option 1; Mon to Fri 7 am to 10 pm, Sat and Sun 10 am to 5 pm, local Australian time; closed national public holidays; charges may apply)
- U5 my.gov.au Code Generator: https://my.gov.au/en/about/help/mygov-account/help-using-your-account/sign-in-to-mygov/use-the-mygov-code-generator-app
  ("no longer available to download from app stores"; SMS backup "must be an Australian mobile number")
- U6 myID set up: https://www.myid.gov.au/set-up (Standard: any 2 Australian documents, incl. "visa (using your foreign passport)", ImmiCard, driver's licence, Medicare card only after another document; Strong: Australian documents plus photo)
- U7 ATO myID strength: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/increase-your-online-security-with-myid/strengthen-your-sign-in-with-myid ("To access ATO online services, you need either a Strong or Standard identity strength")
- U8 ATO lodge from outside Australia: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia (online needs "a myGov account with an active link to the ATO"; recommends a Digital ID such as myID; alternative: registered tax agent; have an Australian bank account for refunds)
- U9 ATO how to lodge: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return (myTax; registered tax agent, "the only people that can charge a fee"; paper, "most refunds issue within 50 business days")
- U10 ATO bank details: https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details ("We can only pay refunds into an Australian bank account")
- U11 ATO DASP online help: https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
  (name, date of birth, email, passport country and number; "You don't have to provide your Australian tax file number (TFN)", entering it lets the system search; if super is not found, start with the fund's ABN; about 30 minutes; service standard 28 days; contact the fund if unpaid after 28 days)
- U12 ATO DASP in Japanese (updated 17 Jun 2026): https://www.ato.gov.au/other-languages/japanese/departing-australia-superannuation-payment-dasp-for-temporary-residents-japanese
  (free online system; visa ceased and left Australia; WHM rate 65 %; usually paid within 28 days; payment by Australian EFT, AUD cheque, or IMT "退職年金基金への申請のみ"; tax agents can apply for you; transfer to ATO after 6 months and visa ceased)
- U13 ATO DASP: https://www.ato.gov.au/dasp ("You can only submit a DASP claim after you have left Australia and your visa has expired"; you can start before you leave)
- U14 ATO DASP system for agents: https://www.ato.gov.au/tax-and-super-professionals/digital-services/departing-australia-superannuation-payments-dasp-online-system
  (agents need an agreement and "written authority from each client"; agents may not use "myGov and ATO online services for individuals to claim a DASP on behalf of your client")

## 1. Findings

F1 (fact, Pages.csv). /ja/tax-return: 2 clicks, 27 impr, pos 24.89. /ja/superannuation: 66 clicks, 2,303 impr, pos 7.46, CTR 2.87 %.
The JA refund/super demand lands on guides: what-is-a-tax-agent 96 / 1,496 pos 6.65; how-long-does-tax-refund-take-australia 37 / 1,317 pos 6.29;
amending-tax-return-australia 36 / 379 pos 5.14; tax-obligations-after-leaving-australia 25 / 797 pos 7.82; how-to-lodge-tax-return-from-overseas 3 / 146 pos 9.93 (CTR 2.05 %);
how-long-does-dasp-take 5 / 84 pos 3.76; dasp-rejected-what-to-do 2 / 23; dasp-documents-required 0 / 11.

F2 (fact, Queries.csv; 100 JA rows, capped export). Tax return and super rows: オーストラリア タックスリターン 税理士 136 impr pos 7.12; いつまで 129 pos 7.73;
タックスリターン オーストラリア 46 pos 19.2 (0 clicks); スーパーアニュエーション 返金 42 pos 10.19; オーストラリア タックスリターン 帰国後 35 pos 9.26;
スーパー アニュ エーション 返金 5,000ドル以上 34 pos 5.88; dasp 申請 22 pos 5.91 + dasp申請 19 pos 5.79; オーストラリア タックスリターン 代行 26 pos 2.69 (CTR 15.38 %);
オーストラリア タックスリターン やり方 15 pos 17.33. No JA query with myGov, ログイン, SMS or myID appears (the export is capped at 1,000 rows, so absence is not proof of zero demand).

F3 (fact, repo). No guide about myGov problems exists in any language: no slug contains "mygov" in src/app/(site)/blog/data.ts (150 EN guides) or the 144 JA translations.
The topic is only touched in passing: how-to-lodge-tax-return-from-overseas H2 "出国した後に難しくなるのは何か？" (one paragraph on a cancelled SIM), past-years (4 mentions), early-tax-return (3).
/ja/superannuation already says "myGovへのログインもID連携も不要です。ATOとは当社が直接やり取りします。" and /ja/tax-return hero says "myGovのアカウントも…必要ありません".
/ja/tax-return has no section that answers "myGovにログインできない / SMSが届かない".

F4 (fact, code constraint). A JA guide only renders if an EN guide with the same slug exists: getJapaneseGuide() in src/app/(ja)/ja/blog/data.ts line 9464 returns undefined when
enGuides has no match, and localizedGuideStaticParams() builds params from EN guides. So every new JA guide below needs an EN entry (category, date, readTime, body) in
src/app/(site)/blog/data.ts with the SAME slug. Coordinate the slugs with the EN report (r01 or whoever owns EN myGov guides).

F5 (fact, JA SERP via WebSearch extended, US index; order is not a Google position). For "myGov ログインできない SMS 届かない 帰国後" and "myGov 海外 ログイン できない myID":
note.com/noko_travel ("日本帰国後にタックスリターン｜SMSが届かなくて困っている方へ"), blog.gcsgp.com, ketaiya.com (a SIM shop), yutoridiary.com (4 Jul 2025, ~800 chars, one H2,
only fix offered is a new myGov account plus the myGov Code Generator app), ameblo.jp, whv-guide-australia.com, kangoshigoto.com, curamaccounting.com.au, settleau.com.au (EN).
No ATO or my.gov.au page in Japanese, no tax practice page with a structured answer. Same pattern Jo saw in English: weak, blog-only competition.
F6 (fact). The most visible competitor advice is outdated: my.gov.au says the Code Generator app "is no longer available to download from app stores" (U5). A JA guide that says so, with the
official sign-in options (U2) and the overseas helpdesk number (U4), would be the only current, sourced Japanese answer found.
F7 (fact). The DASP online application for individuals asks for passport details, not myGov; TFN is optional (U11). Agents must use their own system with written authority and may not use the
client's myGov (U14). So "you don't need myGov for super" is fully backed by ATO, and it ties into the existing trust line "正規の窓口であれば、myGovのパスワードを尋ねることはありません".
F8 (fact). DASP payment to a Japanese account: IMT is offered only for applications to a fund; ATO-held super goes to an Australian account or cheque (U12). /ja/superannuation is precise on this,
but two other JA FAQs say flatly "スーパー（DASP）は海外の口座で受け取れます": /ja/tax-return line 206 and 226, /ja/page.tsx line 191. Inaccurate for ATO-held balances (fix in P1-4).
F9 (fact). The a17 R1 idea (a new "税理士の選び方" guide) would collide with the top JA URL: what-is-a-tax-agent's title is already "タックスリターンの代行を依頼する前に：登録タックスエージェントの選び方".
F10 (inference). /ja/tax-return pos 24.89 is not an internal-link problem: 169 links in JA guides already point to it (89 with anchor "ワーホリのタックスリターン"). Google prefers /ja and
what-is-a-tax-agent for the head and 税理士 terms. The realistic win for /ja/tax-return is problem queries (帰国後, myGov, 口座) that the home page does not answer, plus a link from new problem guides.

## 2. Proposals

### P1-1. New guide: myGov login and SMS code problems after returning (highest value)
EN dependency: an EN guide with slug `mygov-sms-code-not-received-overseas`, category "Tax Return" (F4).
File: src/app/(ja)/ja/blog/data.ts, new key in jaPostTranslations (place after 'how-to-lodge-tax-return-from-overseas').
- slug: mygov-sms-code-not-received-overseas
- title (33 chars): myGovにログインできない・SMSが届かない時の対処法【帰国後】
- description (124 chars): 帰国後にmyGovのSMSコードが届かないのは、登録したオーストラリアの番号が使えないためです。Digital IDやパスキーでの入り方、ロックされた時、日本からかけるヘルプデスク番号、myGovなしで申告とスーパー受取を進める方法まで解説します。
- body (Markdown, ready):

帰国後にmyGovのSMSコードが届かないのは、コードの送り先が登録済みのオーストラリアの携帯番号で、その番号がもう使えないからです。myGovは、古い番号が使えない場合のサインイン方法として、Digital ID（myIDなど）、パスキー、myGovアプリを案内しています。どれも用意がなくても、タックスリターンとスーパーの受け取りはmyGovなしで進められます。

## なぜ帰国するとSMSコードが届かなくなるのか？

myGovのSMSコードは、アカウントに登録した携帯番号に送られます。myGovは、海外でコードを受け取るには、同じオーストラリアの番号で国際ローミングを有効にしておくよう案内しています。出国前にプリペイドSIMを解約した、番号が失効した、という場合、コードはどこにも届きません。

日本の番号に替えれば済むと考えがちですが、myGovの案内では、バックアップとして使うSMSも「オーストラリアの携帯番号」であることが条件です。

## SMSが届かない時、myGovにはどう入ればいいのか？

myGovのヘルプは、SMSのコードが届かない場合、次の方法でサインインできる可能性があるとしています。

- myGovアカウントに接続済みのDigital ID（myIDなど）
- パスキー
- myGovアプリ

パスキーを使っている場合、出国前にアカウントの設定を変える必要はないとmyGovは案内しています。反対に、SMSしか登録していなかった場合、帰国後に使える手段はかなり限られます。

以前よく紹介されていた「myGov Code Generator」アプリは、現在アプリストアからダウンロードできません。古い記事の手順をたどっても、アプリを入れるところで止まります。

## アカウントがロックされた場合はどうなるのか？

サインイン情報を何度も間違えると、アカウントがロックされることがあり、登録メールアドレスにその知らせが届きます。ロック中は、Digital ID、パスキー、myGovアプリでもサインインできません。

また、myGovは普段と違うサインインを検知すると、メールアドレスと携帯番号をユーザー名として使えなくすることがあり、その間はパスワード再設定のコードも届きません。何度も試し続ける前に、いったん手を止めるのが安全です。

## myGovのヘルプデスクには日本から電話できるのか？

できます。オーストラリア国外からは +61 1300 169 468 に電話し、オプション1を選びます。受付はオーストラリアの現地時間で平日7時から22時、土日10時から17時で、全国共通の祝日は休みです。通話料がかかる場合があります。日本との時差は州と季節で変わるので、かける前に確認してください。

## 新しいmyGovアカウントを作り直せば解決するのか？

作り直すことはできます。myGovは、古い番号にアクセスできない場合、新しいアカウントを作る方法も案内しています。

ただ、新しいアカウントでタックスリターンを出すには、ATOとのリンクが必要です。ATOのオンラインサービスを使うには、Digital IDの強度がStandard以上でなければならず、myIDのStandardにはオーストラリアの書類が2点必要です。帰国後に止まりやすいのはここで、詳しくは[myIDと外国のパスポート](/ja/blog/myid-foreign-passport-link-ato)で説明しています。

## myGovに入れないと、タックスリターンは出せないのか？

出せます。myGovが必要になるのは、myTaxで自分で提出する場合です。ATOは提出方法として、myTax、登録タックスエージェント経由、紙の申告書の3つを挙げ、海外から提出する場合の別の方法として登録タックスエージェントを案内しています。紙の申告書の還付は、多くが50営業日以内とされています。

どの方法でも、還付金が支払われるのはオーストラリアの銀行口座だけです。

当社に依頼する場合、myGovへのログインは必要ありません。ATOとのやり取りは当社が直接行い、ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。帰国後の流れは[帰国後のタックスリターン代行](/ja/tax-return)にまとめています。

## スーパーの受け取り（DASP）にもmyGovは必要なのか？

必要ありません。ATOのDASPオンライン申請で入力するのは、氏名、生年月日、メールアドレス、パスポートの発行国と番号などで、TFNの入力は任意です。申請を出せるのは、オーストラリアを出国し、ビザが失効した後です。詳しくは[スーパー返金にmyGovは必要か](/ja/blog/dasp-without-mygov)と[スーパーアニュエーション返金](/ja/superannuation)をご覧ください。

## まだオーストラリアにいるなら、出国前に何をしておくべきか？

- myGovにパスキーを登録する。出国前の設定変更が不要な方法として案内されています
- Digital ID（myID）をmyGovアカウントに接続しておく
- ATOに登録している住所を更新する。手順は[ATOの住所変更](/ja/blog/how-to-update-address-with-ato)にあります
- 還付を受け取るオーストラリアの銀行口座を解約せずに残す

## myGovに入れないまま、どこから始めればいい？

myGovに入れない、SMSが届かない、どこから手をつけていいか分からない。その状態からで構いません。WhatsAppで、働いた時期と場所、いまどこにいるかを送ってください。myGovは必要ありません。ATOとのやり取りは当社が直接行い、申告書はATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。[ワーホリのタックスリターン](/ja/tax-return)も[スーパーアニュエーション返金](/ja/superannuation)も、日本から進められます。

Sources per section: SMS U1, U5; sign in options U2, U3, U5; locked U2; helpdesk U4; new account U1, U7, U6; lodging U9, U8, U10; DASP U11, U13; before leaving U3, U2, U10.
Internal links out: /ja/tax-return, /ja/superannuation, /ja/blog/myid-foreign-passport-link-ato, /ja/blog/dasp-without-mygov, /ja/blog/how-to-update-address-with-ato.
Links in (add one sentence each, below the openings): how-to-lodge-tax-return-from-overseas (end of H2 "出国した後に難しくなるのは何か？":
"SMSが届かない場合のサインイン方法は[myGovにログインできない時の対処法](/ja/blog/mygov-sms-code-not-received-overseas)にまとめています。"),
how-to-lodge-tax-return-working-holiday (H2 "海外から提出できるかどうかを決めるのは何か？"), past-years-tax-returns-working-holiday (H2 "海外から過去年度を提出できるのか？"),
tax-obligations-after-leaving-australia (H2 "海外からの申告は実際どう進むのか？"), early-tax-return-leaving-australia.
Measure: new URL impressions and position; JA queries containing mygov/ログイン/SMS in the January export; WhatsApp clicks with topic tax-return from this URL.

### P1-2. New guide: DASP without myGov
EN dependency: slug `dasp-without-mygov`, category "Super".
- title (31 chars): スーパー返金にmyGovは必要？帰国後のDASP申請と本人確認
- description (121 chars): DASPのオンライン申請にmyGovのログインは不要で、使うのはパスポートの情報です。TFNは任意であること、申請できる時期、28日の処理目安、65%の税率、日本の口座で受け取れる場合と受け取れない場合をATOの案内に沿って詳しく解説します。
- body (ready):

スーパーアニュエーションの返金（DASP）は、myGovにログインしなくても申請できます。ATOのDASPオンライン申請で使うのは、氏名や生年月日、パスポートの発行国と番号で、TFNの入力は任意です。myGovのSMSが届かないことは、スーパーの受け取りを止める理由になりません。

## DASPのオンライン申請では何を入力するのか？

ATOの案内では、氏名、生年月日、その他の個人情報、メールアドレス、パスポートの発行国と番号です。申請はおよそ30分で終わるとされ、利用は無料です。myGovへのサインインを求める手順はありません。

## TFNが分からなくても申請できるのか？

できます。TFNの入力は任意です。ただし入力すると、そのTFNに紐づくスーパー口座をシステムが検索してくれるので、忘れている口座を拾える可能性が上がります。スーパーがあるはずなのに見つからない場合は、ファンドのABNから申請を始めることもできます。TFNを探す方法は[なくしたTFNを確認する方法](/ja/blog/how-to-find-lost-tfn)、口座探しは[なくしたスーパーを探す方法](/ja/blog/how-to-find-lost-superannuation)にあります。

## いつから申請できるのか？

申請を提出できるのは、オーストラリアを出国し、ビザが失効した後です。申請の入力自体は出国前に始めておけます。ビザがまだ有効なまま出した申請は、その時点で止まります。

## 日本の口座で受け取れるのか？

場合によります。ATOが挙げる受け取り方は、オーストラリアの銀行口座への振込、豪ドル建ての小切手、国際送金（IMT）の3つで、国際送金はスーパーファンドへの申請に限られます。出国とビザ失効から6か月以上たつと、残高はファンドからATOへ移されることがあり、ATOが保有する分は日本の口座には送られません。オーストラリアの口座で受け取る場合、ATOは、その銀行が自国の口座へ送金できるか確認するよう勧めています。

## 税金はどれくらい引かれるのか？

ワーキングホリデービザ（417・462）で働いた期間の拠出を含むDASPには、65%が源泉徴収されます。ワーキングホリデービザを持ったことがない一時滞在者の通常税率は、課税済み部分35%、未課税部分45%です。計算の考え方は[DASPの65%課税](/ja/blog/dasp-tax-rate-65-percent-explained)で説明しています。

## 支払いまでどれくらいかかるのか？

ATOの処理目安は、記入済みの申請を受け付けてから28日です。ファンドが保有するスーパーで、28日を過ぎても支払いがない場合は、ファンドに直接問い合わせるよう案内されています。段階ごとの目安は[DASPにかかる期間](/ja/blog/how-long-does-dasp-take)をご覧ください。

## 代わりに申請してもらう場合も、myGovのパスワードを渡すのか？

渡しません。ATOは、登録タックスエージェントが代理でDASPを請求する場合、エージェント用のDASPオンラインシステムを使い、事前に本人から書面での委任を受けるよう定めています。本人のmyGovや個人用のオンラインサービスを使って代理請求することは認められていません。myGovのパスワードを尋ねてくる相手は、正規の窓口ではありません。

## 申請が通らない時はどうすればいい？

多いのは、ビザの記録、氏名の表記、ファンドの情報の食い違いです。原因の見分け方は[DASP申請が却下された時の対処法](/ja/blog/dasp-rejected-what-to-do)、そろえる書類は[DASP申請に必要な書類](/ja/blog/dasp-documents-required)にまとめています。

## myGovに入れなくても、スーパーは受け取れる？

受け取れます。WhatsAppで、働いた雇用主やスーパーファンドの名前を分かる範囲で送ってください。myGovは必要ありません。ATOとのやり取りは当社が直接行います。[スーパーアニュエーション返金](/ja/superannuation)の流れに加えて、まだなら[ワーホリのタックスリターン](/ja/tax-return)も、日本から進められます。

Sources: input U11; free U12; TFN and fund ABN U11; timing U13, U12; payment methods and ATO transfer U12; 65/35/45 % U12; 28 days U11, U12; agents U14.
Links in: /ja/superannuation GUIDES array (line 243): `{ href: '/ja/blog/dasp-without-mygov', label: 'myGovに入れなくてもスーパーは申請できる' }`;
dasp-documents-required, dasp-rejected-what-to-do, how-long-does-dasp-take (one sentence each, below the opening).
Scope guard: it must NOT become a DASP how-to; /ja/superannuation keeps "DASP 申請 / やり方" (dasp 申請 pos 5.91). The guide owns only the myGov and identity angle.

### P1-3. /ja/tax-return: add a myGov problem section (content only; title, description, H1 frozen)
File: src/app/(ja)/ja/tax-return/page.tsx. Insert a new Section right after the "帰国後でもオーストラリアのタックスリターンはできる？" Section (line 497 to 504), same markup pattern:
- Section title: myGovにログインできない・SMSが届かない場合は？ (titleId "mygov-title", tone default)
- p (blocks.text): myGovが必要なのは、myTaxで自分で提出する場合です。帰国後にオーストラリアの番号が使えずSMSコードが届かない、アカウントがロックされた、ATOとリンクできない。どの場合も、登録タックスエージェントを通せばタックスリターンは提出できます。ATOも、海外から提出する方法のひとつとして登録タックスエージェントを案内しています。
- p (blocks.text): 当社に依頼する場合、myGovへのログインは必要ありません。ATOとのやり取りは当社が直接行い、ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。還付金の振込先は、どの方法でもオーストラリアの銀行口座に限られます。
- p (muted, with Link): SMSが届かない時のサインイン方法とヘルプデスクの番号は[myGovにログインできない時の対処法](/ja/blog/mygov-sms-code-not-received-overseas)にまとめています。出典：ATO、myGov。2026年11月確認。
- WaButton (position "section", topic "tax-return", lang "ja"): myGovに入れないまま相談する
Sources: U8, U9, U10. Optional FAQ (append to FAQS; check the jest FAQ count tests first):
Q: myGovにログインできなくても依頼できますか？ A: はい。myGovが必要なのは、myTaxで自分で提出する場合です。当社に依頼する場合、myGovへのログインもATOとのリンクも必要ありません。ATOとのやり取りは当社が直接行い、ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。
Add the guide to GUIDES (line 246): `{ href: '/ja/blog/mygov-sms-code-not-received-overseas', title: 'myGovに入れない時', desc: 'SMSが届かない、ロックされた、ATOとリンクできない場合の道筋。' }`.
Effect: gives /ja/tax-return a problem answer the home page lacks (F10). Measure: /ja/tax-return impressions and position, オーストラリア タックスリターン 帰国後 (pos 9.26).

### P1-4. Accuracy fix: DASP to a Japanese account (3 FAQs)
Fact U12: IMT only for applications to a fund; ATO-held balances go to an Australian account or cheque. Current text says DASP can always be received abroad.
- src/app/(ja)/ja/tax-return/page.tsx line 206, replace "スーパーアニュエーション（DASP）は海外の口座で受け取れます。"
  with "スーパーアニュエーション（DASP）は、ファンドに申請する場合なら海外の口座で受け取れます。ATOに移管された分は、オーストラリアの口座か小切手での受け取りです。"
- same file line 226, replace "スーパーアニュエーション（DASP）は日本の口座でも受け取れます。"
  with "スーパーアニュエーション（DASP）は、ファンドに申請する場合なら日本の口座でも受け取れます。ATOに移管された分は除きます。"
- src/app/(ja)/ja/page.tsx line 191, replace "スーパー（DASP）は海外の口座で受け取れます。"
  with "スーパー（DASP）は、ファンドに申請する場合なら海外の口座で受け取れます（ATOに移管された分を除く）。"
FAQ JSON-LD uses the same strings, so schema follows automatically. Check: the same claim in DE/FR/IT/ES/EN (grep "overseas account" equivalents); likely the same issue there, flag to those agents.

### P2-1. New guide: myID with a foreign passport, can't link the ATO
EN dependency: slug `myid-foreign-passport-link-ato`, category "Tax Return".
- title (30 chars): myIDは外国のパスポートで作れる？ATOとリンクできない時
- description (121 chars): myIDのStandardにはオーストラリアの書類が2点必要で、日本のパスポートはビザ確認の1点にしかなりません。ATOとリンクできない理由、2点目になりうる書類、リンクできなくてもタックスリターンとスーパー受取を進める方法までを解説します。
- opening: 日本のパスポートだけでは、ATOのオンラインサービスに必要なmyIDのStandardには届きません。Standardにはオーストラリアの書類が2点必要で、日本のパスポートはビザの記録を確認する1点として使われるからです。2点目がなくても、タックスリターンとスーパーの受け取りはmyGovなしで進められます。
- H2 and answers:
  - myIDの強度にはどんな段階があるのか？ Basic、Standard、Strongの3つ。Basicは個人情報だけで書類の確認はなし。Standardはオーストラリアの書類2点。Strongはオーストラリアの書類に加えて顔写真の確認。(U6)
  - 外国のパスポートは何として数えられるのか？ 単独の書類ではなく「ビザ（外国のパスポートを使って確認）」として1点。(U6)
  - 2点目になりうる書類は何か？ オーストラリアの運転免許証または仮免許、ImmiCard、オーストラリアのパスポートや出生証明書など。メディケアカードは、ほかの書類を1点確認した後でなければ使えません。(U6)
  - ATOとリンクするにはどの強度が必要か？ ATOのオンラインサービスにはStandardかStrongが必要です。ATOは海外から提出する人にmyIDなどのDigital IDを勧めています。(U7, U8)
  - リンクできない場合、タックスリターンはどうなるのか？ 登録タックスエージェント経由か紙の申告書で提出できます。還付はオーストラリアの口座のみ。(U9, U8, U10) Link /ja/tax-return and /ja/blog/mygov-sms-code-not-received-overseas.
  - スーパーの受け取りにもmyIDは必要か？ DASPのオンライン申請はパスポートの情報で進み、myGovもmyIDも求められません。(U11) Link /ja/blog/dasp-without-mygov, /ja/superannuation.
- closing CTA: same approved block as P1-1 ("myGovは必要ありません。ATOとのやり取りは当社が直接行い、申告書はATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。")
Why P2: no JA query evidence yet (F2) and the linking questions route (answering ATO record questions instead of myID) could not be verified, so the guide must not claim myID is the only way to link.

### P2-2. how-to-lodge-tax-return-from-overseas: replace thin SIM paragraph with a pointer, add a short "3 routes" list
File: src/app/(ja)/ja/blog/data.ts, key 'how-to-lodge-tax-return-from-overseas' (line 2825; 146 impr, pos 9.93, CTR 2.05 %; owner of "帰国後" intent).
Below the existing paragraph "解約済みのオーストラリアのSIMに紐づいたアカウントは…" add:
"myGovを使って自分で提出するには、ATOとリンクしたmyGovアカウントが必要です。使えない場合の道は3つあります。

- myGovにDigital IDやパスキーでサインインし、myTaxで提出する
- 登録タックスエージェントを通して提出する
- 紙の申告書を郵送する。還付の多くは50営業日以内です

SMSが届かない時のサインイン方法は[myGovにログインできない時の対処法](/ja/blog/mygov-sms-code-not-received-overseas)にまとめています。"
Sources U8, U9, U2. Opening, title and description stay as they are.

### P2-3. Point the existing JA super guides at the new myGov answers
Add one sentence each (below the opening, no H2 changes): dasp-documents-required, dasp-rejected-what-to-do, how-long-does-dasp-take, what-happens-to-unclaimed-super:
"DASPのオンライン申請にmyGovのログインは必要ありません。詳しくは[スーパー返金にmyGovは必要か](/ja/blog/dasp-without-mygov)をご覧ください。" (U11)

### P3-1. Guide on a closed Australian bank account and the refund (blocked on facts)
Query evidence: オーストラリア タックスリターン 帰国後 35 impr pos 9.26; SERP has ozsans-inc.com, saitohdiary.com, wise.com/jp on 口座解約 (WebSearch, 24 Nov).
Verified so far only: "We can only pay refunds into an Australian bank account" (U10). What the ATO does when no Australian account is given (held refund, cheque, other) could not be verified in this
session, so no ready text. Before writing: fetch ATO guidance on refunds without an Australian account and on updating bank details from overseas. Candidate slug
`australian-bank-account-closed-tax-refund` (check against EN slugs then).

### P3-2. Visa still valid after leaving (DASP blocked)
Common JA problem (申請できない because the WHV has not ceased). U13 confirms claims need the visa to have expired; the route to have a visa cancelled after leaving was not verified on
homeaffairs.gov.au in this session. Add only after verification, as an H2 in dasp-rejected-what-to-do, not as a new guide.

## 3. What NOT to do
- Do not create a "税理士の選び方 / おすすめ / 安い" guide (a17 R1): what-is-a-tax-agent already owns 選び方 in its title and is the top JA URL (96 clicks) (F9). Never describe us as 税理士;
  the new guides above do not use the word at all.
- Do not change titles, descriptions or H1s of /ja/tax-return, /ja/superannuation or any existing guide (frozen to 7 Dec). P1-3 and P2-2 only add sections.
- Do not create a separate "myGovなしでタックスリターン" guide: P1-1 already answers it, a second page would split the same intent. Same for "DASP 申請 やり方": owned by /ja/superannuation.
- Do not recommend the myGov Code Generator app (no longer downloadable, U5) or a Japanese number for SMS backup (must be Australian, U5). Several JA blogs still do (F5, F6).
- Do not say we apply for myID, unlock myGov accounts or call the myGov helpdesk for clients; we only say the client does not need myGov because we deal with the ATO directly.
- Do not promise refund amounts or timing beyond ATO's published standards (28 days DASP, 50 business days paper "most refunds"); no prices; no em or en dashes (the drafts above use none; check "〜" is not introduced).
- Do not publish the JA guides before their EN slugs exist (F4): the JA page would 404 and the sitemap test would not list it.
- Do not add the ATO overseas phone number or the "answer questions from your tax records to link the ATO" route: not verified in this session.
