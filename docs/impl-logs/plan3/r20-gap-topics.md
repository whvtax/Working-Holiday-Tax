# r20 gap topics: refund and super questions we do not answer yet (WHT 6 languages, SVT 3 languages)

Agent 20, 24 Nov 2026. Research only, no repo edits. Code checked: /home/claude/v68/base20.
Slug lists extracted to S/plan3/r20/{wht_en,de,ja,fr,it,es,svt}.txt (WHT: 150 slugs, identical set in all 6 languages;
SVT: 184 slugs across content/long, blog, guides).

Limits of this run (read first): the shared WebSearch budget for this turn ran out after 13 of my searches. Done:
community.ato.gov.au (34 thread titles read one by one), pvtistes forum, backpackerjobboard, Etax, Taxback blog, JA and
DE SERP samples, ATO fact pages. NOT done: tabipack and ezytaxsolutionsjapan (no fetchable URL surfaced), People Also
Ask, Reddit beyond what Google returned. A follow-up run can fill those; nothing below depends on them.

## 1. Findings

F1 (fact) Coverage is already very deep. Almost every refund or super problem I found on community.ato.gov.au is
answered somewhere, usually inside a section of a longer guide: mixed visa DASP rate (WHT data.ts line 1926 and 6544;
SVT batch-02, batch-08, batch-10, batch-11), late final contribution under Payday Super (data.ts 1688 to 1797), ATO held
super with no time limit (data.ts 1932 to 1977), refunds offset against debts (7752, 7954), income statement not tax
ready (1207, 1286), employer closed down (6706), non-lodgment advice (1096, 1429), renewed passport (611), DASP
rejected (dasp-rejected-what-to-do), "claim super back" timing (how-long-does-dasp-take). So most of the "gap" is not
missing content. Two problem clusters have no owner page in either brand: F2 and F3.

F2 (fact) "Refund or super with no Australian bank account" has no page. Mentions only: data.ts 619, 1240, 3407, 4677
(TRS), 7833 ("keep the account open"), /superannuation FAQ "Can my super be paid into an overseas bank account?" (line
135, super only); SVT batch-00 789, batch-02 226 and 478, batch-09 922 and 931 (all "keep your account open"). Nothing
explains what happens when the account is already closed, how the cheque works, the 90 day cheque hold, or a refund
that went to the wrong account. Demand evidence (community.ato.gov.au thread titles, all from people who have left):
- "how do i file tax return without bank detail?" https://community.ato.gov.au/s/question/a0JRF000002DZ6s/p00330585
- "Can I cash an ATO check in France?" https://community.ato.gov.au/s/question/a0JRF000001NAan/p00294823
- "How can I get refund from income tax account outside Australia" https://community.ato.gov.au/s/question/a0JRF000002HPth/p00333704
- "How to correct names in tax return checks" (local banks will not take AUD cheques) https://community.ato.gov.au/s/question/a0JRF0000010Xt3/p00282982
- "Do I need a bank account in Australia to receive my ATO-held superannuation?" https://community.ato.gov.au/s/question/a0JRF000000lsUn2AI/p00274918
- "How to Reclaim Super and Tax from overseas?" https://community.ato.gov.au/s/question/a0JMo0000059w6j/p00420571
- "Where can I ask for my unclaimed money? (Overseas Resident)" https://community.ato.gov.au/s/question/a0JRF000004y7h4/p00414979
The SERP for these returned only community.ato.gov.au and ATO pages (same weak competition pattern as the myGov
problems in the brief). GSC: no query rows yet (inference: the long tail is too thin per phrase to pass the export
threshold, and we have no page that could earn impressions).

F3 (fact) "Can I claim my super if I am coming back / hold another visa?" has no page and no section. Grep for visitor
visa, tourist visa, ETA, subclass 600, "come back", "return to Australia" near DASP/super in WHT data.ts and
/superannuation: 0 relevant hits (the /superannuation FAQ line 142 only says you can start the online application in
Australia). Thread titles:
- "DASP and tourist visa conflict" https://community.ato.gov.au/s/question/a0JRF0000031foz/p00363605
- "Claiming the Departing Australia Superannuation Payment (DASP) while on a Subclass 600 Visitor Visa" https://community.ato.gov.au/s/question/a0JRF000002pbxF/p00356374
- "Australian superannuation (super) after leaving on a Working Holiday Visa (WHV)" https://community.ato.gov.au/s/question/a0JRF000003yCML/p00401319
- pvtistes forum "superannuation remboursement sous WHV et visa etudiant" https://pvtistes.net/forum/les-impots-australiens-superannuation/143963-superannuation-remboursement-sous-whv-et-visa-etudiant.html
The ATO answer is short and checkable (F5). Very relevant to WHMs between a first and second or third WHV, and to
students who go home and come back on a visitor visa for graduation or start a 485.

F4 (fact) Secondary threads already answered by existing pages (no new guide): "How do I claim ATO held super if my
DASP is already completed?" (a0JMo000004kLdRMAU), "How to claim my super if it was returned to the ATO?"
(a0JRF000002XIRd), "Claiming historic DASP (left australia 12 years ago)" (a0JRF000001AwBp), "It's been more than two
months since I applied for DASP" (a0JRF000000oOrx2AE), "How is DASP taxed if I held different visa types?"
(a0JMo000005aisTMAQ), "WHV tax on DASP for visa held years ago" (a0JRF000002CsUv), "Do WHM get tax return after visa
expired" (a0JRF0000021OS9), "working holiday visa overpaid taxes." (a0JRF000001FDdt). Only the first one shows a small
section gap (P2-C below): money that reaches the ATO after the DASP was paid.

F5 (fact, official) ATO DASP page (final URL https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp):
eligibility "your visa has ceased to be in effect (expired or cancelled)"; "you have left Australia and you do not hold
any other active Australian visa"; "you're not an Australian or New Zealand citizen, or a permanent resident of
Australia"; "Claiming a DASP will not affect any future visa applications."; payment by "electronic funds transfer (EFT)
to an Australian bank account", Australian dollar cheque, or "international money transfer (IMT) - only for
applications to super funds"; "For ATO-held super, you can only choose EFT to an Australian bank account in your name or
a cheque."; ATO held super claimed after returning permanently "is still considered a DASP".

F6 (fact, official) ATO "Missing tax return refunds"
(https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds):
closed account: the Reserve Bank returns the refund to the ATO, "This can take up to 10 days", update your details, and
if none are given the refund is re-issued by cheque; wrong or unrelated account: "contact us and we'll attempt to recover
the refund on your behalf", which "can take over 28 days"; a known account (old, related party): "we can't retrieve the
funds for you"; "From January 2025 we have started holding some cheque refunds for up to 90 days" while the ATO asks for
bank details. ATO "Update your financial institution details"
(https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details):
"We can only pay refunds into an Australian bank account."; "You or a nominated representative can update your
financial institution details over the phone."

F7 (fact) Competitor coverage: backpackerjobboard /superannuation has 8 generic questions, none on bank accounts or
returning (https://backpackerjobboard.com.au/superannuation). Etax backpacker page has no FAQ
(https://www.etax.com.au/australian-backpacker-tax/). pvtistes forum f432 shows only generic threads ("Tax return",
"Superannuation", "TaxReturn un devoir ?") (https://pvtistes.net/forum/f432.html). Taxback's oz-tax-guide URL now
serves Irish content (https://taxback.com/blog/oz-tax-guide). Inference: no competitor owns F2 or F3 in any language.

F8 (fact, GSC 3 months) Super questions with weak positions that existing pages should already answer, so they are
ranking tasks, not new guides: "does gross pay include super" 14@25.6 and variants ("does gross salary include super"
25@38.3, "does gross income include super" 26@30.9, "gross salary include super" 15@37.5): answered in data.ts 1626 and
846; "is super payable on overtime for casuals" 23@15.5: answered in data.ts 1791 and 1829; "permanent resident leaving
australia superannuation" 14@22: not our audience (PR cannot claim DASP, F5). JA "スーパーアニュエーション 返金
どれくらい" 5@12.2 and DE "superannuation australien zurück bekommen" 34@4.6 are served by /superannuation.

F9 (inference) Other refund topics seen in threads but outside our audience or unverifiable this run: Australian bank
interest after leaving (non-resident withholding) "Interest Earned in An Australian Bank Account whilst a resident in
Canada" (a0JMo000004AXlB) and "Claiming Refund for Over-withheld Tax on Interest Income for Non-Resident"
(a0JRF000001uTEr); scholarship withholding for students (a0JRF000001ksGC, already a20 SVT #6); JA "ワーホリ 扶養" 5@43.8
(Japanese tax law, not ATO).

## 2. Proposals

Ranking: P1 = no owner page anywhere, problem intent, official facts verified, all languages. Approved closing wording
taken from the repo (EN/DE/JA/FR/IT/ES/ZH/VI strings found by grep). Search phrases marked (GSC) are real rows; the rest
are inferred native phrasings for the title and H2s, not volume checked.

### P1-A WHT guide: tax refund without an Australian bank account (en, de, ja, fr, it, es)

Slug (same in all 6, matches repo convention): `tax-refund-without-australian-bank-account` (checked: not in any slug list).
Files: EN src/app/(site)/blog/data.ts; DE/JA src/app/(de|ja)/<l>/blog/data.ts; FR/IT/ES a new entry in the last
src/app/(<l>)/<l>/blog/chunks/*.ts. Category: tax return. Add to llms and sitemap the same way the generator picks guides.

EN
- title (45): Tax refund without an Australian bank account
- description (151): Left Australia and closed your account? The ATO only pays refunds into Australian accounts. What happens to your refund, the cheque route and your super.
- opening: The ATO can only pay a tax refund into an Australian bank account, so a refund cannot go straight to your bank
  at home. If your Australian account is closed or missing, the refund is re-issued as an Australian dollar cheque to
  the postal address the ATO holds, and some cheque refunds are held for up to 90 days while the ATO asks for bank
  details. Super is different: a fund can pay your DASP by international transfer, the ATO cannot.
- H2 Can the ATO pay my refund into an overseas account? No. The ATO says "We can only pay refunds into an Australian
  bank account." Keeping your Australian account open until the refund and your super have landed is the simplest
  route. [F6 URL 2]
- H2 What happens if my Australian account is already closed? The Reserve Bank returns the payment to the ATO, which can
  take up to 10 days. If you give the ATO a current Australian account it re-issues the refund there; if not, it is
  re-issued by cheque. [F6 URL 1]
- H2 How does the cheque work, and why can it take months? The cheque is in Australian dollars and goes to the postal
  address on your ATO record, so update your address first (link how-to-update-address-with-ato). Since January 2025
  the ATO holds some cheque refunds for up to 90 days while it asks for bank details. Ask your bank at home whether it
  accepts Australian dollar cheques before you rely on one. [F6 URL 1]
- H2 What if the refund went into the wrong account? If it went to an account that is not yours or not related to you,
  the ATO will try to recover it, which can take over 28 days. If it went to an account you know, such as an old account
  or a partner's, the ATO cannot retrieve it and it is between you and the account holder. [F6 URL 1]
- H2 Who can change the bank details? You can in ATO online services, or you or a nominated representative can by phone.
  No myGov? You do not need it to use us: we deal with the ATO directly. [F6 URL 2]
- H2 Is it the same for my super? Not quite. A DASP from a super fund can be paid by international money transfer.
  Super the ATO already holds can only go by transfer to an Australian bank account in your name or by cheque. Link
  /superannuation and what-happens-to-unclaimed-super. [F5]
- Internal links: /tax-return, /superannuation, how-to-update-address-with-ato, how-long-does-tax-refund-take-australia,
  how-to-lodge-tax-return-from-overseas, tax-obligations-after-leaving-australia, what-happens-to-unclaimed-super.
  Add a reciprocal link from how-long-does-tax-refund-take-australia ("Why does an incorrect bank account cause so much
  trouble?") and from tax-obligations-after-leaving-australia (both are not on the frozen list; add below the opening).
- CTA (approved): "We deal with the ATO directly, so you do not need myGov. Your return is reviewed and signed off by a
  registered tax agent before it is lodged with the ATO. Message us on WhatsApp."
- Search phrases EN: tax refund no australian bank account; ato refund cheque overseas; ato refund closed bank account;
  can ato pay refund to overseas account; tax refund after leaving australia bank account.

DE (du)
- title (50): Steuererstattung ohne australisches Konto: so geht's
- description (150): Konto in Australien schon geschlossen? Das ATO zahlt nur auf australische Konten. Was mit deiner Erstattung passiert, wie der Scheck läuft und was für Super gilt.
- opening: Das ATO überweist Steuererstattungen nur auf ein australisches Bankkonto, nicht auf dein Konto in Deutschland.
  Ist dein australisches Konto schon zu, bekommst du die Erstattung als Scheck in australischen Dollar an die Postadresse,
  die das ATO von dir hat, und manche Schecks hält das ATO bis zu 90 Tage zurück. Bei Super ist es anders: Der Fonds darf
  international überweisen, das ATO nicht.
- Phrases: steuererstattung australien deutsches konto; australisches konto geschlossen steuererstattung; ato scheck einlösen deutschland; superannuation auf deutsches konto.
- CTA: existing DE line "von einem registrierten Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird" plus WhatsApp. Links /de/tax-return, /de/superannuation.

JA
- title (32 chars): オーストラリアの口座がなくてもタックスリターンの還付は受け取れる？
- description (≈80 JA chars, equals 120 to 160 by the site's JA convention; check the JA length test): 帰国して口座を解約した方へ。ATOの還付はオーストラリアの口座にしか振り込まれません。口座がない場合の小切手、日本の口座、スーパーアニュエーションの受け取り方を解説します。
- opening: ATOはタックスリターンの還付金をオーストラリアの銀行口座にしか振り込みません。日本の口座には直接入金されません。口座を解約済みの場合、還付金はATOに登録された住所へオーストラリアドル建ての小切手で送られ、2025年1月からは銀行情報を確認するため最長90日保留されることがあります。スーパーアニュエーションは別で、ファンドからは海外送金で受け取れます。
- Phrases: タックスリターン 還付金 日本の口座; オーストラリア 口座 解約 タックスリターン; ATO 小切手 換金; スーパーアニュエーション 日本の口座.
- CTA: JA string "提出前に登録タックスエージェントが確認し署名します" (never 税理士 for us) plus WhatsApp; links /ja/tax-return, /ja/superannuation.

FR (vous)
- title (52): Remboursement d'impôt sans compte bancaire australien
- description (155): Vous avez fermé votre compte avant de partir ? L'ATO ne verse les remboursements que sur un compte australien. Chèque, délais, et ce qui change pour la super.
- opening: L'ATO ne verse un remboursement d'impôt que sur un compte bancaire australien, jamais directement sur votre
  compte en France. Si votre compte australien est fermé, le remboursement est réémis par chèque en dollars australiens à
  l'adresse postale connue de l'ATO, et certains chèques sont retenus jusqu'à 90 jours. Pour la superannuation, votre
  fonds peut faire un virement international, l'ATO non.
- Phrases: remboursement impôt australie compte français; tax return sans compte australien; chèque ATO encaisser en France (matches thread a0JRF000001NAan); superannuation virement compte français.
- CTA: FR string "vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO" (re-check exact repo string) plus WhatsApp; links /fr/tax-return-australie-pvt (or the target _blog-links.ts uses), /fr/superannuation.

IT (tu)
- title (46): Rimborso tasse senza conto bancario australiano
- description (150): Hai chiuso il conto prima di partire? L'ATO paga i rimborsi solo su conti australiani. Cosa succede al tuo rimborso, come funziona l'assegno e la super.
- opening: L'ATO versa il rimborso solo su un conto bancario australiano, non sul tuo conto in Italia. Se il conto australiano
  è chiuso, il rimborso viene riemesso con un assegno in dollari australiani all'indirizzo che l'ATO ha in archivio, e
  alcuni assegni restano fermi fino a 90 giorni. Per la superannuation è diverso: il fondo può fare un bonifico
  internazionale, l'ATO no.
- Phrases: rimborso tasse australia conto italiano; conto australiano chiuso rimborso; assegno ATO incassare in italia.
- CTA: IT string "controllata e firmata da un agente fiscale registrato prima di essere presentata all'ATO" (exact repo
  wording) plus WhatsApp; links /it/dichiarazione-redditi-australia, /it/superannuation.

ES (tú)
- title (54): Devolución de impuestos sin cuenta bancaria australiana
- description (152): ¿Cerraste tu cuenta antes de irte? La ATO solo paga devoluciones en cuentas australianas. Qué pasa con tu devolución, cómo funciona el cheque y tu super.
- opening: La ATO solo paga la devolución en una cuenta bancaria australiana, no en tu cuenta de España o Latinoamérica. Si tu
  cuenta australiana ya está cerrada, la devolución se vuelve a emitir como cheque en dólares australianos a la dirección
  postal que tiene la ATO, y algunos cheques quedan retenidos hasta 90 días. Con la superannuation es distinto: el fondo
  puede hacer una transferencia internacional, la ATO no.
- Phrases: devolución impuestos australia cuenta española; cuenta australiana cerrada devolución; cheque ATO cobrar.
- CTA: ES string "la revisa y la firma un tax agent registrado antes de presentarla ante la ATO" plus WhatsApp; links
  /es/devolucion-impuestos-australia, /es/superannuation.

### P1-B WHT guide: claiming super when you might come back to Australia (en, de, ja, fr, it, es)

Slug: `claim-super-if-coming-back-to-australia` (checked: none). Category super. Not cannibalising /superannuation
(which owns "how to claim"); this owns "can I claim if / will it affect my visa".
- EN title (49): Claiming super if you plan to come back to Australia
- description (156): Thinking of a second or third working holiday, or a visit? When you can claim your super (DASP), why another active visa blocks it, and whether it affects visas.
- opening: You can claim your super as a DASP only once you have left Australia, your working holiday visa has ceased, and
  you do not hold any other active Australian visa. Claiming does not count against you later: the ATO says claiming a
  DASP will not affect any future visa applications. [F5]
- H2 Can I claim my super between my first and second working holiday visa? Only while you hold no active Australian
  visa. Once a second or third working holiday visa has been granted, it is an active visa, so the claim waits until it
  has ceased (inference from the F5 rule; have Jo confirm wording before publishing).
- H2 Can I claim while I hold a visitor visa? The rule is the same: any other active Australian visa blocks the claim
  (F5; threads F3). Do NOT name the ETA or eVisitor in the text until homeaffairs.gov.au is checked (not verified in
  this run).
- H2 Will claiming my super hurt a future visa application? No, quote F5.
- H2 What if I leave the super and come back for good later? Super moved to the ATO is still paid as a DASP at the DASP
  rate, quote F5. Link what-happens-to-unclaimed-super, dasp-vs-leaving-super-in-australia-pros-cons.
- H2 Should I wait or claim now? Decision points only (fund fees and insurance on small balances, already in data.ts
  1977), no advice to choose. Link how-to-check-super-balance-working-holiday.
- Internal links: /superannuation, /tax-return, dasp-documents-required, dasp-tax-rate-65-percent-explained,
  second-third-year-visa-tax-implications, dasp-vs-leaving-super-in-australia-pros-cons.
- CTA: "We deal with the ATO directly and help you claim your super once you are eligible. Message us on WhatsApp."
  plus the sign off line on any mention of the tax return.
- Native titles: DE "Super zurückholen, wenn du wiederkommen willst" (45); JA "またオーストラリアに戻る予定でもスーパー
  アニュエーションは返金できる？"; FR "Récupérer sa super si vous comptez revenir en Australie" (54); IT "Recuperare la
  super se pensi di tornare in Australia" (48); ES "Recuperar tu super si piensas volver a Australia" (48).
- Phrases: EN can i claim super if i come back to australia; dasp second working holiday visa; dasp visitor visa; does
  claiming dasp affect future visa. DE superannuation zurückholen zweites work and travel visum. JA セカンドビザ
  スーパーアニュエーション 返金; 再渡航 スーパーアニュエーション. FR récupérer superannuation deuxième PVT; super
  visa touriste. IT recuperare super secondo working holiday. ES recuperar superannuation segunda working holiday.
- Openings in DE/JA/FR/IT/ES: write natively from the EN facts above (same three conditions and the visa sentence);
  writer to follow the P1-A pattern.

### P1-C SVT article: tax refund with no Australian bank account (en, zh, vi)

Slug: `tax-refund-no-australian-bank-account-international-students` (checked: none; existing
bank-account-and-tax-international-students is about the account while studying, link to it). File: a new entry in the
newest src/lib/svt/content/long/en batch plus zh and vi texts; related list in long/en/links.ts:
['leaving-australia', 'blog/lodge-from-overseas', 'blog/tax-refund-delays-international-students', 'superannuation',
'blog/bank-account-and-tax-international-students']. Body has no links (sources go in `sources`: the two F6 URLs and F5).
- EN title (52): Tax refund with no Australian bank account (students)
- description (150): Graduated and closed your account? The ATO only pays refunds into Australian accounts. What happens to your refund, the cheque and your super after you go home.
- answer: The ATO only pays refunds into an Australian bank account. If yours is closed, the refund is usually re-issued
  as an Australian dollar cheque to your address on ATO records, and some cheques are held for up to 90 days.
- H2s as P1-A, written for students (graduation timing, 485 holders keeping the account), DASP rate wording "usually
  35%" only where batch-08 already says so; no residency statement without "may be".
- ZH title: 没有澳洲银行账户，退税怎么收？ description: 毕业回国前把账户关了？ATO 只把退税打进澳洲银行账户。账户关闭后退税会怎样处理、支票怎么用、养老金能否汇到国内，一篇讲清楚。
  answer: ATO 只会把退税打进澳洲银行账户，不能直接汇到国内账户。账户已关闭的话，退税通常会改成澳元支票寄到 ATO 记录的地址，部分支票可能会被保留最长 90 天。
  phrases: 澳洲退税 没有澳洲账户; 澳洲银行卡注销 退税; ATO 支票 国内兑现; 养老金 汇回国内.
  CTA: "在提交给 ATO 之前，由注册税务代理人审核并签字确认" plus WhatsApp.
- VI title: Nhận hoàn thuế Úc khi không còn tài khoản ngân hàng Úc. description: Đã đóng tài khoản trước khi về nước? ATO chỉ trả hoàn thuế vào tài khoản ngân hàng Úc. Điều gì xảy ra với khoản hoàn thuế, séc và tiền super của bạn.
  answer: ATO chỉ trả tiền hoàn thuế vào tài khoản ngân hàng tại Úc. Nếu tài khoản đã đóng, khoản hoàn thuế thường được phát hành lại bằng séc đô la Úc gửi đến địa chỉ ATO đang lưu, và một số séc có thể bị giữ đến 90 ngày.
  phrases: hoàn thuế úc không có tài khoản úc; đóng tài khoản ngân hàng úc hoàn thuế; nhận super về việt nam.
  CTA: "Được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO" plus WhatsApp.

### P2-A SVT article: claiming super when you might come back (en, zh, vi)

Slug: `claim-super-if-returning-to-australia-international-students` (checked: none). Same F5 facts as P1-B, angled to
students: visiting for graduation, starting a 485 (an active visa, so no DASP; inference from F5), applying for a new
student visa. SVT does not consolidate super (Jo's decision): say nothing about consolidating. Related:
['superannuation', 'leaving-australia', 'blog/dasp-or-leave-super-international-students',
'blog/student-to-graduate-visa-485-tax']. ZH phrases: 回国后 还会回澳洲 养老金 能取吗; 485 签证 养老金 DASP. VI: có
thể rút super nếu quay lại úc không; visa 485 rút super.

### P2-B Section, not a guide: "Can the ATO pay into my bank at home?" FAQ on WHT /tax-return (6 languages)

Add one FAQ item (answer 2 sentences from F6 URL 2) linking to P1-A. Money page FAQ only; title and H1 untouched. Gives
the money page the problem phrase without creating a second owner.

### P2-C Section in what-happens-to-unclaimed-super (WHT 6 languages) and what-happens-to-unclaimed-super-international-students (SVT)

H2 "Money arrived after your DASP was paid": a late contribution or a rollover can leave a small balance after the
claim; claim it the same way, ATO held super only by EFT to an Australian account in your name or cheque (F5). Thread
a0JMo000004kLdRMAU. The timing of when a fund transfers a leftover balance to the ATO is NOT verified here: leave it out.

### P3 (verify first, then decide)
- P3-A Australian bank interest after you leave (non-resident withholding), WHT and SVT (F9). Needs the ATO
  non-resident interest page checked; no ready text.
- P3-B FAQ on dasp-tax-rate-65-percent-explained: "Does a separate fund avoid the 65%?" ATO fund FAQ
  (https://ato.gov.au/super/apra-regulated-funds/in-detail/apra-resources/questions-and-answers/dasp-and-working-holiday-makers-changes---frequently-asked-questions)
  says "The law does not allow for apportionment" and that only the payment from the account containing WHM amounts is
  affected when a fund pays per account. My fetch returned partial quotes only; read the page in full before writing.
- P3-C Re-run the missing sources (tabipack, ezytaxsolutionsjapan, People Also Ask in en/de/ja/fr) with a fresh search
  budget; add any new problem topic to this list.

## 3. What NOT to do

- No new guide for topics already owned (F1, F4, F8): mixed visa DASP rate, late final contribution, ATO held super,
  DASP delays, "does gross pay include super", "super on overtime". Those are ranking or snippet tasks on existing pages.
- Do not name Wise, Revolut or any bank as a way to receive refunds: not verified against ATO, and brand mention risk.
- Do not say a tax agent's trust account can receive the refund, and do not say "we receive your refund": we are not a
  tax agent and add no fees or payment flows.
- Do not write that the ETA or eVisitor blocks a DASP until homeaffairs.gov.au confirms they are visas held "in effect"
  for this purpose; P1-B uses the ATO sentence only.
- No myGov how-to beyond one sentence (owned by another agent); no deadline content (owned elsewhere).
- No refund amounts or promises; no "you will get your refund in X days" beyond quoting ATO timeframes for the ATO steps.
- Brands separate: P1-A and P1-C, P1-B and P2-A are twins in topic only; write each natively, different structure, no
  cross links.
- Japanese tax after return (確定申告, 扶養, 住民税): not an ATO topic, out of scope and outside allowed sources.
- Frozen pages: how-to-update-address-with-ato and tax-back-australia-working-holiday may only get links added below the
  opening, never edits to title, description or opening.
- No dashes in any new text (the drafts above use none); sentence case headings; DE nouns capitalised.
