# r09 svt-zh: Student Visa Tax, Simplified Chinese (/zh): tax return, super, myGov problems

Research agent, 24 Nov 2026. Code read only: /home/claude/v68/base20. No repo edits.
Limits: the shared WebSearch budget ran out after 9 searches, so the Chinese SERP sample is small (6 zh queries). Xiaohongshu was
used only as a source of topic ideas, never for facts. Every fact in the proposed text comes from my.gov.au, ato.gov.au or
myid.gov.au. The URLs are in section 4.

## 1. Findings

F1 (fact) zh demand is small, and pages rank on page one for long tail questions. GSC svt Queries.csv has 6 CJK queries:
2026报税截止日期 5 impr @9.2, 退税时间 4 @9, 澳洲退稅多久入帳 2 @7.5 (Traditional), 如何获取smsf中的养老金储蓄 3 @57,
澳洲最低时薪2026 1 @9, 澳洲 个人 报税 时间 1 @11. Pages.csv: /zh/blog/how-long-does-a-tax-refund-take 83 impr @6.1 (1 click),
/zh/blog/minimum-wage-students 63 @4.6, /zh/blog/tax-return-deadline-31-october 28 @7.3, /zh/blog/amend-tax-return 23 @6.3,
/zh/blog/dasp-or-leave-super-international-students 7 @3.4 (1 click). Countries: HK 29 @10.5, China 23 @4.1, TW 19 @6.5.

F2 (fact) On Chinese SERPs for myGov problems, Google shows only English pages: community.ato.gov.au threads, my.gov.au
help pages and an Australian High Commission page. No Chinese page answers the question.
- "myGov 收不到验证码 回国 澳洲 手机号": 6 community.ato.gov.au threads, uk.embassy.gov.au/lhlh/mygovhelp.html, my.gov.au
  "Use a code sent by SMS".
- "myGov 登录不了 海外 怎么办 澳洲税务局": community.ato.gov.au threads and articles, my.gov.au "Accessing myGov while overseas".
- "myID 外国护照 中国护照 能用吗 myGov 关联 ATO": ato.gov.au myID pages, myid.gov.au, community threads.
Inference: these are the weakest SERPs in our market. A native zh page that answers the question first could reach
the top 3, the same way our TFN pages beat community threads in English.

F3 (fact) For head terms, the zh SERP has commercial and editorial competitors:
- "澳洲留学生报税 退税 2026": liuxue.xdf.cn blogs and austaxai.com.au zh guides (an "AI" branded agent).
- "澳洲退税 回国后 没有myGov 怎么报税 留学生": the same sites plus vocus.cc. None of them is built around the myGov problem.
- "DASP 申请 攻略": ATO's own Simplified Chinese DASP page ranks first. baronaccounting.com (cn post) and
  firstmigrationservice.com (zh-tw) follow.
Inference: we will not take 报税/退税 head terms soon. The "回国后 + 没有 myGov" problem angle is open.

F4 (fact) ATO's own Chinese uses different terms from ours. The ATO Simplified Chinese DASP page calls super
"退休公积金" and DASP "离澳退休公积金支取". Our zh content uses 养老金 and 退休金 (services-zh.ts has 退休金 7 times).
"公积金" appears 0 times in src/lib/svt/content. Inference: a student who copies ATO wording into Google gets no match on our pages.

F5 (fact, code) No zh page answers a myGov problem. The only coverage is in passing:
- long/zh/batch-01.ts lodging-tax-return-after-going-home-students has the H2 "如果你已经没法登录自己的账户" (3 sentences).
- long/zh/batch-02.ts what-happens-to-unclaimed-super says "澳洲手机号可能停用了，收不到验证码".
- long/zh/batch-04.ts has the address article.
- blog-zh.ts lodge-from-overseas says "ATO 建议你更新登录设置".
The EN and VI libraries have no myGov guide either. Candidate slugs below: grep in src returns 0 hits.

F6 (fact, code) Constraints that shape the proposals:
(a) A zh long article is published only if an English LongArticle has the same slug (library.ts longIn).
    long-articles-27oct.test.ts requires the EN body to have at least 600 words, at least 4 sections and at least 1 official source.
    The zh body needs at least 3 sections.
(b) zh blog, guide and service hub texts must match the EN block kinds and FAQ count (guides-i18n.ts checkTexts, lines 34 to 44).
    So a zh-only FAQ on /zh/superannuation or /zh/blog/* is NOT possible. The only zh-only change there is text inside an
    existing block.
(c) home-zh.ts is independent (EN has 15 `{ q:`, zh 14). A zh-only home FAQ is fine.
(d) LONG_ALSO in long/en/links.ts is shared by all languages. relatedLinks (pages.ts:82) drops targets that do not exist
    in a language, so it is safe.

F7 (fact) Official answers to the myGov problems (URLs in section 4):
- SMS codes go only to the number registered to the account, and you need access to that number.
- If you cannot access your old number, sign in with Digital ID or create a new myGov account [S1].
- Recovery with a Strong myID: choose "I didn't get my code", then "Continue with Digital ID". If that fails, create a
  new account and relink the ATO. A new account can use a different email. To keep the old email, myGov must release it.
  If you cannot set up a Strong myID, ATO recommends a Standard myID [S2].
- Linking the ATO means answering questions from ATO records, for example: the TFN application receipt number, the travel
  document from a temporary visitor TFN application in the last 4 years, a recent payslip, an active super account, and an
  account that received an ATO refund. Skipping every question counts as a failed attempt [S3].
- myID Standard needs any 2 documents, and a "visa (using your foreign passport)" counts as one. Strong needs Australian
  documents plus a photo. Only personal details, or a single document, gives Basic [S4]. ATO wants Standard or Strong [S5].
- ATO says to use myID, a passkey or an authenticator if you have no Australian mobile number or you are overseas [S6].
- Lodge from overseas: myTax needs myGov linked to the ATO. A registered tax agent can lodge for you, or you can lodge
  on paper. You need an Australian bank account for a refund [S7]. ATO pays refunds only into Australian accounts [S8].
- DASP: the online system is free. If you are unsure where your super is, ATO lists three ways to find it: the DASP online
  system (if eligible and you have a TFN), ATO online services (needs a linked myGov) or phoning the ATO.
  Payment options: EFT to an Australian account, an AUD cheque, or an international money transfer. The international
  transfer is offered by some funds only, and fees may apply. ATO-held super is paid by EFT or cheque only.
  A balance above $5,000 needs a certified ID copy. You can authorise a registered tax agent [S9].
- Phone lines: myGov helpdesk 132 307 (option 1). From overseas: +61 1300 169 468 (option 1). Hours: weekdays 7am to 10pm,
  weekends 10am to 5pm, Australian time. It helps only with the myGov account [S10]. ATO from overseas: +61 2 6216 1111,
  weekdays 8am to 5pm AEDT. ATO in Australia: 13 28 61 [S11].
Not verified, so kept out of the text: whether myGov accepts a Chinese mobile number for SMS codes; what the ATO does with a
refund when there is no Australian account; the ATO linking code by phone; whether the DASP online application ever asks
for myGov (S9 lists it as separate from myGov, see risk R4).

## 2. Proposals

### P1-A New zh guide: myGov 收不到验证码 (old Australian number). Highest value.
Files: long/en/batch-13-mygov.ts (new EN twin) plus long/zh/batch-13-mygov.ts (new). Then regenerate both index.ts files
with scripts/svt-long-index.mjs. Add the links.ts entries listed in P2-D.
slug: mygov-code-not-received-international-students   category: 'Tax return'
EN twin (for the SVT EN writer, at least 600 words): title "myGov code not coming? Your Australian number is off. Here is what works";
description "Back home and your Australian SIM is gone, so the myGov SMS code never arrives. The official ways back in, and how
to lodge or claim super without fixing myGov first." Sources: S1, S2, S3, S7, S10, S11.
zh title (28): myGov 收不到验证码？澳洲手机号停了，回国后这样处理
zh description (92): 回国后澳洲手机号停用，myGov 短信验证码收不到，报税和领养老金还能办吗？myGov 和 ATO 官方给的办法：用 myID 找回、新建账户重新关联 ATO，或者不经过 myGov。
answer: myGov 的短信验证码只会发到你账户里登记的那个手机号。号码停用以后，myGov 给的办法是用 Digital ID（myID）登录，或者新建一个 myGov 账户，再重新关联 ATO。如果你只是想把最后一份报税交上去，或者领回养老金，不一定要先把 myGov 修好。
body (ready, Markdown subset, no links):
```
回国以后，很多留学生都会遇到同一件事：打开 myGov，输入密码，然后等一条永远不会来的短信。原因通常很简单：验证码发到的是你在澳洲用的手机号，而那张卡已经停了。

## 为什么收不到 myGov 验证码？

myGov 说明，短信验证码只发到你账户里登记的手机号，你必须能用这个号码才能收到。人在海外的话，还要给这个登记号码开通国际漫游。澳洲的预付卡停用或过期之后，验证码就没有地方可去了。

## 能不能直接换成国内手机号？

改手机号要先登录 myGov，在账户设置的联系方式里修改。已经登录不进去，就改不了。对这种情况，myGov 给的办法只有两个：用 Digital ID 登录，或者新建一个 myGov 账户。

## 办法一：用 myID 找回原来的账户

ATO 说明，如果你原来用短信验证码、密保问题、passkey 或验证器 app 登录，可以先把 myID app 设置到 Strong 身份强度，然后在 myGov 登录页选择“I didn't get my code”，再选“Continue with Digital ID”。myID 里的姓名、出生日期和邮箱要和 myGov 账户一致。

要注意的是，myID 网站说明，Strong 需要用澳洲身份证件核验，再核验照片。只持外国护照的留学生，多数做不到这一步，可以直接看办法二。

## 办法二：新建 myGov 账户，再重新关联 ATO

ATO 说明，用 Strong myID 也找不回账户的话，就要新建一个 myGov 账户。新账户可以用另一个邮箱；想继续用原来的邮箱，要先联系 myGov 客服把它释放出来。

新账户建好之后，重新关联 ATO。ATO 会根据它手上的记录问你几个问题，比如申请 TFN 时拿到的收据号、你申请 TFN 时用的护照、最近一张工资单，或者一个还在用的养老金账户。不确定的问题可以跳过，但全部跳过算一次失败。

注册新账户时，换一个不依赖澳洲手机号的登录方式。myGov 说明，用 myGov app、passkey、Digital ID 或密保问题登录的人，出国前不需要做任何调整。

## 打电话求助：号码和时间

- myGov 客服：在澳洲拨 132 307，按 1；在海外用手机拨 +61 1300 169 468，按 1。周一到周五 7:00 至 22:00，周六周日 10:00 至 17:00，均为澳洲当地时间。myGov 客服只处理 myGov 账户本身的问题。
- ATO：在澳洲拨 13 28 61；在海外拨 +61 2 6216 1111，周一到周五 8:00 至 17:00（AEDT）。

## 只是想报税或领养老金？不一定要 myGov

ATO 列出的报税方式有三种：用 myTax 自己网上报（需要已经关联 ATO 的 myGov 账户）、找注册税务代理人，或者交纸质报税表。领养老金（DASP）也有 ATO 自己的网上申请系统。所以，如果你只是想把最后一份报税交上去，不必先把 myGov 修好。

有一件事要先确认：ATO 只把退税打进澳洲的金融机构账户。退税到账之前，先别注销你的澳洲银行卡。

## 下次出国前：三分钟设置

- 在 myGov 的登录设置里，改用 myGov app 或 passkey，不再只靠短信。
- 有条件的话，设置 myID。
- 把 TFN、澳洲银行账户和养老金基金的会员号记在一个安全的地方。

找 Student Visa Tax 办理，你不需要 myGov：我们直接和 ATO 沟通，你的报税在提交给 ATO 之前，由注册税务代理人审核并签字确认。在 WhatsApp 上给我们发消息就行。
```
faq:
- 收不到 myGov 验证码，会影响我拿退税吗？ / 不会直接影响。报税可以交给注册税务代理人，也可以交纸质报税表，不一定要用 myGov。退税只会打进澳洲的银行账户，所以退税到账之前先别注销澳洲银行卡。
- 新建 myGov 账户，以前的税务记录会丢吗？ / 不会。你的税务记录保存在 ATO。新账户重新关联 ATO 之后，就能再用 ATO 的网上服务。
- 在国内打 myGov 客服电话，号码是多少？ / 用手机拨 +61 1300 169 468，然后按 1。服务时间是澳洲当地时间周一到周五 7:00 至 22:00，周六周日 10:00 至 17:00，可能会产生国际话费。
Internal links: automatic (home, as category 'Tax return'; /superannuation, because the EN text mentions leaving Australia)
plus LONG_ALSO (P2-D) to P1-B, lodging-tax-return-after-going-home-students and P1-C.

### P1-B New zh guide: myGov 关联不了 ATO (identity questions)
slug: link-mygov-to-ato-problems-international-students   category: 'Tax return'
EN twin: "Can't link myGov to the ATO? The identity questions, for students"; description "Linking the ATO asks
questions from your ATO records. Which records students can actually answer, why skipping all counts as a fail, and who
to call." Sources: S3, S2, S5, S7, S10, S11.
zh title (29): myGov 关联不了 ATO？留学生身份问题答不上来怎么办
zh description (91): 关联 ATO 时要回答身份问题，很多留学生答不上来。ATO 会问哪些记录，TFN 申请收据号和护照为什么最有用，全部跳过算失败，失败以后打哪个电话，以及不用 myGov 的报税办法。
answer: 把 myGov 关联到 ATO 时，ATO 会用它手上的记录问你几个问题来核实身份。对留学生来说，最容易答的通常是 TFN 申请收据号、申请 TFN 时用的护照和最近一张工资单。实在关联不上，报税也可以不经过 myGov。
body:
```
在 myGov 里点“关联 ATO”，接着是几道身份问题：你的税务评估通知上的数字、某个银行账户的号码、某张工资总结上的金额。很多留学生在这一步卡住，因为这些东西要么从来没有过，要么早就找不到了。

## 为什么关联 ATO 要回答问题？

ATO 说明，关联时它会请你提供一些信息来确认身份，问题都来自 ATO 已有的记录。你不需要每一类都答得上来，答对其中几项就可以。

## ATO 可能会问哪些记录？

- 收到过 ATO 退税的银行账户，或者近 2 个财年有利息收入的账户。
- 一个还在使用的养老金账户。
- 近 5 年内的税务评估通知（notice of assessment）。
- 近 2 个财年的 PAYG 工资总结（payment summary）。
- 旅行证件：如果你以临时访客身份申请过 TFN，指最近 4 年内那次申请用的证件。
- 申请 TFN 时拿到的收据号。
- 近 2 年个人报税的退税金额。
- 最近一张工资单。

## 留学生最容易答的是哪几项？

大多数留学生申请 TFN 时用的是护照，所以旅行证件这一项往往最好答，前提是那次申请在最近 4 年内。TFN 申请收据号、最近一张工资单和养老金账户也比较常见。动手之前，先把护照、工资单和养老金基金的对账单放在手边。

## 不会答的题，可以跳过吗？

可以。不确定的问题可以跳过，但全部跳过算一次失败。宁可跳过，也不要猜。

## 关联失败了怎么办？

ATO 说明，如果你没法在网上确认身份，系统会告诉你下一步怎么做。你也可以打电话给 ATO：在澳洲拨 13 28 61，在海外拨 +61 2 6216 1111，周一到周五 8:00 至 17:00（AEDT）。

如果问题出在 myGov 账户本身，比如登录不进去，那是 myGov 客服的事：在海外用手机拨 +61 1300 169 468，按 1。

## 用 myID 登录会不会简单一点？

ATO 推荐用 myID 登录，身份强度要达到 Standard 或 Strong。但 myID 也要核验证件：只持外国护照的话，往往只能到 Basic，用不了 ATO 的网上服务。

## 关联不上，还能报税吗？

能。ATO 列出的报税方式里，只有 myTax 需要关联 ATO 的 myGov 账户。你也可以找注册税务代理人，或者交纸质报税表。

找 Student Visa Tax 办理，你不需要 myGov：我们直接和 ATO 沟通，你的报税在提交给 ATO 之前，由注册税务代理人审核并签字确认。在 WhatsApp 上给我们发消息就行。
```
faq:
- 我从来没报过税，关联 ATO 时答不上来怎么办？ / 第一次报税的人通常没有税务评估通知，这很正常。可以试试 TFN 申请收据号、申请 TFN 时用的护照或者最近一张工资单。都答不上来的话，打电话给 ATO，或者不经过 myGov 报税。
- 关联失败几次会被锁吗？ / ATO 的页面没有写具体次数。它说明的是：全部跳过算一次失败；网上确认不了身份时，系统会告诉你下一步怎么做。
(The second FAQ is deliberately cautious, because the attempt limit is not on an official page. If the implementer prefers,
drop it and keep one FAQ plus the long body. The test needs at least 2 FAQs for EN, while zh FAQs follow the zh text.)

### P1-C New zh guide: 回国后没有 myGov，养老金照样能领 (DASP without myGov)
slug: claim-super-without-mygov-international-students   category: 'Super'
EN twin: "Claim your super after leaving Australia, even without myGov"; description "Locked out of myGov and not sure
which fund holds your super? The free DASP online system can find it, then the payment options, documents and ATO-held super."
Sources: S9 (EN DASP page in the EN entry), S8.
zh title (25): 回国后没有 myGov，养老金（DASP）照样能领
zh description (83): 回国后登录不了 myGov，也不记得是哪个养老金基金？ATO 说明可以用 DASP 网上申请系统查找账户。付款能不能打到国内账户、要什么材料、钱转到 ATO 怎么办。
answer: 领回养老金（DASP，ATO 中文页面叫“离澳退休公积金支取”）不用先修好 myGov。ATO 说明，不确定养老金在哪个基金时，可以用免费的 DASP 网上申请系统查找（符合条件、有 TFN 的话），也可以打电话问 ATO。
body:
```
已经回国，想把澳洲的养老金（super，也有人叫退休金）领回来，却发现 myGov 登录不了，基金叫什么也想不起来。这种情况很常见，也有办法。

## 申请 DASP 一定要用 myGov 吗？

不一定。ATO 的 DASP 网上申请系统是一个单独的免费系统。myGov 只是查找养老金账户的其中一种办法。

## 不记得是哪个基金？ATO 说的三种查法

- 用 DASP 网上申请系统查找，前提是你符合申请条件、有 TFN。
- 登录 ATO 网上服务或 ATO app 查看，这一种需要已经关联 ATO 的 myGov 账户。
- 打电话给 ATO：在海外拨 +61 2 6216 1111，周一到周五 8:00 至 17:00（AEDT）。

## 什么时候可以申请？

你的签证已经结束（到期或被取消），你已经离开澳洲，并且没有持有其他有效的澳洲签证，就可以申请。ATO 建议在离开之前就开始填写，并记好填过的信息，离开后要用同样的信息继续提交。

## 余额超过 $5,000：准备核证副本

ATO 说明，养老金超过 $5,000 时，基金会要求一份经过认证的身份证件副本。在澳洲找人认证比较容易，所以最好走之前就办好。

## 钱能打到国内的银行账户吗？

ATO 列出的付款方式有三种：转账到澳洲银行账户、澳元支票，或者国际汇款。国际汇款只有部分基金提供，可能收手续费，也可能有汇率损失。已经转到 ATO 的养老金，只能转账到澳洲账户或者用支票付款。

## 离开超过 6 个月：钱在 ATO，也能领

你离开澳洲满 6 个月、签证也已经结束时，基金会把没领的养老金转给 ATO。钱不会丢，仍然可以按 DASP 向 ATO 申请。

## 可以请别人帮我申请吗？

可以。ATO 说明，你可以授权注册税务代理人在网上或用纸质表格帮你申请，也可以用纸质表格授权其他人。被授权的人可以代你更新信息，所以要选你信得过的人。

离开澳洲后领养老金，不需要 myGov。如果你想有人帮忙，我们会和你一起核对基金、签证日期和材料，并在你付款之前，在 WhatsApp 上和你确认价格。
```
faq:
- DASP 的钱能直接打到中国的银行卡吗？ / 有些基金提供国际汇款，但不是所有基金都有，可能收手续费。ATO 保管的养老金只能打进澳洲账户或者用支票付款。
- 离澳退休公积金支取和 DASP 是一回事吗？ / 是。ATO 的中文页面把 DASP 叫作“离澳退休公积金支取”，就是离开澳洲后把养老金（退休金）领回来。
Internal links: /zh/superannuation (automatic, category Super), home (automatic only if the EN text says "tax return", so
add one EN sentence on the final tax return), plus LONG_ALSO.
Cannibalisation: /zh/superannuation keeps "DASP 怎么申请 / 扣多少税", so this title avoids both phrases.
what-happens-to-unclaimed-super keeps "没申请会怎样". how-to-find-lost-super keeps "失联". This page owns "没有 myGov",
"回国后" and "打到国内账户".

### P1-D /zh home: one FAQ for the myGov problem (zh-only change is allowed, F6c)
File: src/lib/svt/content/home-zh.ts, faq.items. Insert it after "我要离开澳洲了，我的税和养老金怎么办？":
{ q: '回国后 myGov 收不到验证码、登录不了，还能报税吗？', a: '能。ATO 列出的报税方式里，只有自己用 myTax 报税需要 myGov。找我们办理，你不需要 myGov：我们直接和 ATO 沟通，你的报税在提交给 ATO 之前，由注册税务代理人审核并签字确认。退税只会打进澳洲的银行账户，所以先别注销澳洲银行卡。' }
Sources: S7, S8. The title and description stay as they are (frozen). This is the only home change.
If the page carries FAQPage data, check that it is still Organization schema only (rule).

### P2-A New zh guide: myID 能用中国护照注册吗
slug: myid-foreign-passport-international-students   category: 'Tax return'
zh title (25): myID 能用中国护照注册吗？留学生的身份强度说明
zh description (84): 只有中国护照和澳洲签证，myID 通常只能到 Basic。为什么登录 ATO 要 Standard 或 Strong，第二份证件可以用什么，缺证件时报税和养老金怎么办。
answer: 能注册，但只有外国护照和澳洲签证的话，通常只算一份证件，myID 停在 Basic。ATO 的网上服务要 Standard 或 Strong；Standard 需要两份证件，比如签证（用外国护照核验）加澳洲驾照。
H2s, each answered in 2 to 4 sentences:
1. myID 的三种身份强度是什么？ Basic means only personal details or one document; Standard means any 2 documents;
   Strong means Australian documents plus a photo [S4].
2. 中国护照算哪一份证件？ "Visa, using your foreign passport" counts as one document, and the page does not say the
   passport works on its own [S4].
3. 第二份证件可以用什么？ Australian driver's licence or learner permit, ImmiCard, Australian birth or citizenship
   certificate. A Medicare card only counts after one of these [S4]. Write it so that most students' realistic second
   document is a state driver's licence or learner permit.
4. 为什么 Basic 登录不了 ATO？ ATO asks for Standard or Strong [S5].
5. 没有第二份证件，报税和养老金怎么办？ myTax needs myGov linked to the ATO, but an agent or paper also works [S7], and
   DASP has its own online system [S9].
CTA: the same approved sentence as P1-A. Links: LONG_ALSO to P1-B and P1-A.
Lower priority than P1 because myID questions are more often asked by students still in Australia.

### P2-B /zh/leaving-australia: pre-departure myGov item, inside existing blocks only (F6b)
File: guides-zh.ts 'leaving-australia', sections.before list. The list has 4 items. Add the sentence to item 4, because a
new item would change list4 to list5 and fail checkTexts unless EN and VI change too. New item 4:
'记好你在海外要用的邮箱和电话号码，WhatsApp 也别删。出发前把 myGov 的登录方式改成 myGov app、passkey 或 myID，不要只靠澳洲手机号收短信验证码。'
Source: S6 and the my.gov.au overseas page [S12]. Better still: propose the same new list item in EN/VI to the EN agent.

### P2-C /zh/superannuation: ATO's Chinese term inside an existing block (F4)
File: services-zh.ts superannuation.sections.apply, which has a note block. Append this to the note:
'ATO 的中文页面把 DASP 叫作“离澳退休公积金支取”，说的是同一件事。'
Source: S9. Title, H1 and description are not touched (frozen). Add the same sentence to the zh body of
dasp-or-leave-super-international-students, the zh page with 1 click @3.4 (a long article, so it can be edited freely).

### P2-D Related links (long/en/links.ts, LONG_ALSO; shared, safe per F6d)
- 'mygov-code-not-received-international-students': ['blog/link-mygov-to-ato-problems-international-students', 'blog/claim-super-without-mygov-international-students', 'blog/lodging-tax-return-after-going-home-students']
- 'link-mygov-to-ato-problems-international-students': ['blog/mygov-code-not-received-international-students', 'blog/myid-foreign-passport-international-students']
- 'myid-foreign-passport-international-students': ['blog/link-mygov-to-ato-problems-international-students', 'blog/mygov-code-not-received-international-students']
- 'claim-super-without-mygov-international-students': ['blog/what-happens-to-unclaimed-super-international-students', 'blog/dasp-documents-checklist-international-students']
- Add or extend for existing pages:
  - 'lodging-tax-return-after-going-home-students': append 'blog/mygov-code-not-received-international-students'
  - new 'what-happens-to-unclaimed-super-international-students': ['blog/claim-super-without-mygov-international-students']
  - 'how-to-find-lost-super-international-students': append 'blog/claim-super-without-mygov-international-students'
  relatedOf slices to 6 after the money links and the service page, so check that the new link survives the cut.
Also edit the zh body of lodging-tax-return-after-going-home-students. Its H2 "如果你已经没法登录自己的账户" becomes
"回国后 myGov 收不到验证码怎么办". Add one sentence: "myGov 说明，号码停用后可以用 Digital ID 登录，或者新建账户再关联 ATO。" [S1].
This is a long article, so a zh-only edit is fine. The H2 is not frozen for SVT long articles, but if the lead considers
existing H2s frozen (Phase 1 note), add the sentence only.

### P3-A Traditional Chinese refund timing (F1: 澳洲退稅多久入帳 2 @7.5; HK and TW impressions)
The zh body of a long article can take one natural sentence; blog-zh blocks cannot change kind (F6b). Put the sentence in
tax-refund-delays-international-students (long): "在香港和台湾，很多人会问“退稅多久入帳”，答案一样：ATO 表示大多数网上提交的报税在 12 个工作日内处理完。"
Source: ATO processing times, as already cited on the page. Measure before doing more. No zh-Hant pages (no new languages).

### P3-B EN and VI twins
The SVT EN writer must produce the 4 EN twins (at least 600 words each, F6a) before the zh texts can go live. VI versions
can follow with the same slugs; P1-A is just as relevant for Vietnamese students.

## 3. What NOT to do
R1. No zh-only FAQ or extra block on /zh/superannuation, /zh/leaving-australia or /zh/blog/*. It fails checkTexts (faq count, block kinds).
R2. Do not change titles or descriptions of existing zh pages (frozen to 7 Dec), and do not touch the /superannuation H1.
R3. Never 会计, 税务师 or 我们报税/我们提交 for us. Use "我们直接和 ATO 沟通" and "由注册税务代理人审核并签字确认".
    For DASP, do not say we submit: say we 核对 (check) with the student. No prices in new text. The DASP CTA keeps the existing
    "付款之前在 WhatsApp 上确认价格" pattern.
R4. Do not write "DASP 不需要 myGov" as an absolute ATO statement. The ATO page lists the DASP system as separate from
    myGov but does not say "no myGov needed". The text above says "不用先修好 myGov / myGov 只是其中一种办法".
    Before publishing, open the ATO DASP online application page and confirm it has no myGov sign-in step.
R5. Do not tell students to register a Chinese mobile number for codes (not verified), or that the ATO sends refunds
    overseas or by cheque (S8 says Australian accounts only).
R6. Do not promise that we can see records or lodge without the student's authority. Approved lines only. No refund amounts.
R7. Cannibalisation:
    - P1-C must not use "DASP 怎么申请" or "扣多少税" (owned by /zh/superannuation and dasp-tax-rate).
    - P1-A and P1-B must stay split: P1-A owns 验证码/手机号, P1-B owns 关联 ATO/身份问题.
    - Do not create a third "回国后报税" page: 4 exist already (lodge-from-overseas, lodging-tax-return-after-going-home-students,
      tax-after-leaving-australia-international-students, /zh/leaving-australia).
R8. Do not mention super consolidation as a service (Jo: SVT does not consolidate). No AI wording. No dashes (the drafts
    use none). Residency is not discussed in these guides.
R9. Do not cite community.ato.gov.au threads as sources. Use official ATO, myGov and myID pages only.

## 4. Sources (all opened 24 Nov 2026)
S1 myGov, Use a code sent by SMS: https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms
S2 ATO, When you can't sign in to your myGov account: https://ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account
S3 ATO, Information you need to link myGov to the ATO: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato
S4 myID, Set up: https://www.myid.gov.au/set-up
S5 ATO, Increase your online security with myID: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/increase-your-online-security-with-myid
S6 ATO, Create a myGov account and link it to the ATO: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato
S7 ATO, Lodge your tax return from outside Australia: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia
S8 ATO, Financial institution details (myTax): https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/supporting-documents-for-my-tax/financial-institution-details
S9 ATO, DASP for temporary residents (Simplified Chinese): https://www.ato.gov.au/other-languages/simplified-chinese/departing-australia-superannuation-payment-dasp-for-temporary-residents-chinese
S10 myGov, Contact us: https://my.gov.au/en/about/help/contact
S11 ATO, Contact us: https://www.ato.gov.au/about-ato/contact-us
S12 myGov, Accessing myGov while overseas: https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas
Also: ATO, How to lodge your tax return (three ways): https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return
SERP sources: liuxue.xdf.cn, austaxai.com.au, baronaccounting.com, firstmigrationservice.com, community.ato.gov.au (observed, not cited).
