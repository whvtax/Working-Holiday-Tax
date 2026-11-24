# r15 ai-citations: make the tax return and super pages the source AI answers cite (24 Nov 2026)

Data: Bing AI Performance WHT (S/gsc24/bing: AIPageStatsReport, AISearchQueriesReport, AIPerformanceOverviewStats,
20 Oct to 21 Nov 2026); GSC S/gsc24/wht and svt (Queries.csv, Pages.csv, 3 months to 21 Nov); code /home/claude/v68/base20
(HEAD ed53337 = Phase 1; baseline 87ab210 = what is live and what Bing saw). 17 web searches and 9 official page fetches
on 24 Nov. The search budget for this session ran out after 17 searches, so the panel below is smaller than planned.
F = fact (data row or URL given), I = inference.

## 1. Findings

F1. Refund and super pages get a small share of our AI citations, and super gets almost none.
The page report sums to 5,888 citations on 99 pages (overview file: 6,621 incl. pages below the export cut). Grouped by URL:
TFN pages 2,654 (45.1%), Medicare 1,014 (17.2%), work rights 913 (15.5%), refund / tax return 884 (15.0%), super 114 (1.9%).
Refund pages: tax-back-australia-working-holiday 267, tax-return-without-tfn-australia 102, australian-financial-year-dates
102, working-holiday-visa-tax-guide-417-462 92, /tax-return 81, what-does-tax-withheld-mean-payslip 43.
Super pages: how-long-does-dasp-take 60, /ja/superannuation 18, tax-on-super-withdrawal-backpacker 13,
/ja/blog/what-is-superannuation 12, what-happens-to-unclaimed-super 7, /de/superannuation 1, dasp-tax-rate 1.
/superannuation (EN): 0. FR/IT/ES tax return and super pages: 0.

F2. Copilot does ground refund questions on us; it does not ground any super question on us.
Refund grounding queries (AISearchQueriesReport): "how to get a tax refund if i am on a working holiday visa" 110 citations,
19.23% share; "tax back from working holiday" 84, 29.68%; "tax return for working holiday" 74, 22.49%; "tax back for
working holiday" 49, 32.24%; "tax refund how many days australia" 4, 50.00%. Together 321 citations.
Super: no super, DASP or superannuation grounding query appears among the 29 rows (the export lists queries with 4 or more
citations). I: our super citations come from many small long-tail prompts (mainly "how long does a DASP take").

F3. /superannuation is not failing on page structure. The LIVE version (baseline 87ab210; Phase 1 only added the "What is
DASP?" box and FAQs 10 to 12, `git diff 87ab210` = 25 added lines) already had an answer-first lead, a 6-step ordered list,
a dated key figures list, a DASP rate table with an ATO link, and 12 question H2s. That is the same template the cited
guides use (p2-ai section 1). Yet: GSC /superannuation 9,457 impr, position 16.6; head super queries at 20 to 50
("claim superannuation" 348 impr @38.4, "superannuation claim" 315 @23.1, "how to claim superannuation" 192 @50.7, "how do i
claim my superannuation when i leave australia" 100 @40.4). The only super page in Google's top 10 for its own query family
is how-long-does-dasp-take (1,905 impr @6.4; "how long does dasp payment take" 90 @6.78; "ato dasp" 89 @5.38), and it is the
only super page with real Bing citations (60).
I (high confidence): AI engines cite pages that already rank top 10 in their own index for the grounding query. For generic
"how do I claim super" prompts, the index is full of the source itself. Web search, 24 Nov, "how to claim superannuation after
leaving Australia working holiday visa": ato.gov.au (8 results incl. ato.gov.au/dasp), QSuper, Media Super, Aware (2),
expatica, community.ato.gov.au. "international student superannuation withdraw leaving Australia DASP": ato.gov.au (6),
community.ato.gov.au (7), AMP (2), Rest (2), Hostplus, Australian Retirement Trust. No independent guide site at all.
Another format change on /superannuation will not beat ato.gov.au and the funds for "how to claim super".

F4. /tax-return got 81 citations from Bing while ranking 30.1 on Google (760 impr). I: Bing rates it far better than Google
does, and its live version (slogan H1, no question H2, "What is a working holiday tax return?" section and key figures table)
was enough. Phase 1 adds the H2 "How do I get a tax refund on a working holiday visa?" worded exactly as the 110-citation
grounding query, so this page should gain share once deployed. Nothing more is needed on its structure; it needs reasons
to be cited for questions it does not answer yet (F6).

F5. What the cited refund / super pages have that /superannuation (and the generic half of /tax-return) do not.
| Trait | tax-back (267) | how-long-dasp (60) | tax-return-without-tfn (102) | /superannuation (0) |
|---|---|---|---|---|
| One narrow question per page, worded as typed | yes | yes | yes | no: hub of 15 questions |
| Answer sentence 1 carries the number/date | "after 30 June" | "About 28 days" | "45% instead of 15%" | yes (65%, 28 days) |
| Says something the ATO page does not say in one place | WHM refund causes | why claims run past 28 days | late TFN year | mostly ATO restated |
| Head term owned by ATO or funds | no (ATO has no WHM refund guide) | partly | no | yes |
| Google position for its query family | 6 to 13 | 6.4 | 5 to 8 | 16.6 page, 20 to 50 head terms |
I: the winning pattern is a WHM-specific PROBLEM or consequence the ATO covers only in fragments. This matches Jo's idea and
the 24 Nov searches: problem prompts return almost only community.ato.gov.au threads and ATO pages:
- "can't access myGov after leaving Australia tax return SMS code old number": 19 of 19 results community.ato.gov.au.
- "myID foreign passport can't verify identity link ATO to myGov overseas": 19 of 19 community.ato.gov.au.
- "DASP visa not ceased cannot apply bridging visa super": 16 community.ato.gov.au, 3 ato.gov.au.
- "tax refund Australia bank account closed after leaving overseas": community.ato.gov.au (5), ato.gov.au missing refunds,
  universities (Adelaide, Curtin), taxback, wise, widen.
- "how to get a tax refund on a working holiday visa Australia": hostelworld, goabroad, backpackerjobboard, taxback (6),
  bigworldsmallpockets, people2people, H&R Block, community.ato.gov.au. No ato.gov.au: this is why we win 19 to 32% share.
- DE "superannuation australien zurückbekommen work and travel": ato.gov.au (7), studymelbourne, QSuper, Rest, SBS German,
  barcats, ANZ. No German-language independent guide.
- JA "ワーホリ スーパーアニュエーション 返金 帰国後 申請": ATO's own Japanese DASP page, plus Japanese nenkin pages (wrong
  topic). JA "オーストラリア タックスリターン いつまで ワーホリ 帰国後": ATO EN/JA pages, pvtistes EN, a Rakuten blog.
- FR "remboursement impôts australie pvt tax return": pvt.fr (2), pvtistes.net (11). Owned by the community.
- "workingholidaytax.com.au" (brand): we do not appear in the first 10 (ATO, H&R Block, Forvis Mazars). Repeats a18 F5.
Note: this search tool is not Bing; treat it as "who an AI index sees", not as Copilot's ranking.

F6. A factual inconsistency on our most cited refund pages. ATO, "Check the progress of your tax return" (last updated
14 June 2026): "Most returns lodged online process within 10 business days."
https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return
/tax-return (Phase 1) says 10. But EN guides say "about 12 business days": tax-back-australia-working-holiday (267 citations,
data.ts line 9363), how-long-does-tax-refund-take-australia (title, seoTitle, description and opening, data.ts 3698 to 3712),
data.ts 1244 and 3747; the same "12" is in DE/JA data.ts, FR/IT/ES chunks 03, 08, 18, and SVT blog-en.ts 140 to 181,
home-en.ts 93, long/en batch-01, 04, 11. I: an engine that sees 10 and 12 on the same domain picks one or neither; the
Bing grounding query "tax refund how many days australia" already gives us 50% share, so the figure is quoted.

F7. Official facts verified 24 Nov for the proposals below (only these are used in proposed text):
- DASP (ATO, last updated 21 April 2026): claim when the visa has ceased (expired or cancelled), you have left Australia and
  hold no other active visa; "generally be paid within 28 days of your completed application being received"; certified
  copies may be needed at $5,000 or more; payment by EFT to an Australian account, AUD cheque, or international money transfer
  "only for applications to super funds"; "For ATO-held super, you can only choose EFT to an Australian bank account in your
  name or a cheque"; unclaimed super moves to the ATO once 6 months have passed since you left and the visa has ceased;
  the online system is free. https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp
- DASP online help (ATO, last updated 11 Oct 2024): you cannot submit while your temporary visa is still active, check it in
  VEVO; enter details exactly as on the passport; when you return you must use the same passport number and country as the
  first time, even if that passport has expired; a fund not found can be added with "Add application" and the fund's ABN; a
  saved application needs your shared secret, 3 attempts, then phone the ATO; visa cancellation is a Home Affairs matter.
  https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
- ATO Japanese DASP page (last updated 17 June 2026): 65% for WHM, "DASPは通常、記入済みの申請書を受理してから28日以内に支払われます".
  https://www.ato.gov.au/other-languages/japanese/departing-australia-superannuation-payment-dasp-for-temporary-residents-japanese
- Missing refunds (ATO, last updated 27 April 2026): a refund paid to a closed account "will be returned to us by the Reserve
  Bank of Australia", which "can take up to 10 days"; update your bank details so the ATO can re-issue it; with no updated
  details the ATO re-issues by cheque; "From January 2025 we have started holding some cheque refunds for up to 90 days while
  we ask for bank details." https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds
- Lodge before leaving (ATO, last updated 15 June 2026): early return on paper; "Processing for early lodgments is 50 business
  days"; lodging from overseas "You'll also need an Australian bank account you can use to receive any refund amounts."
  https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-before-leaving-australia
- ATO contact (last updated 8 Oct 2026): from outside Australia +61 2 6216 1111, 8:00 am to 5:00 pm Monday to Friday,
  Australian Eastern time. https://www.ato.gov.au/about-ato/contact-us
- myGov SMS codes (my.gov.au, last updated 17 Dec 2025): overseas you need the same registered Australian number with
  international roaming; if you cannot access your old number "you can sign in to myGov using Digital ID or create a new myGov
  account". https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-a-code-sent-by-sms
- myGov Code Generator app (my.gov.au, last updated 19 Nov 2026): download it before you travel; the SMS backup "mobile number
  must be an Australian mobile number". https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-the-mygov-code-generator-app
- Accessing myGov while overseas (my.gov.au, last updated 24 Jan 2025): if you cannot sign in, you may need to create a new
  account and link your services again. https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas
NOT verified (leave out of text): whether a new myGov account can be linked to the ATO from overseas without an Australian
phone; myID rules for foreign passports; any IMT fee amount.

F8. Other gaps (code, read 24 Nov):
- /superannuation EN: no visible "Last updated" line (tax-return has one); speakable `dateModified: '2026-11-05'` though Phase 1
  changed the page on 24 Nov. Key figures rows say "Source: ATO." without a link or ATO date.
- /ja/superannuation (18 citations, pos 7.5, 2.87% CTR) and /ja/tax-return: 0 links to ato.gov.au; key figures say 出典：ATO
  as plain text. The hero's first sentence (給与から引かれたお金ではなく...) is a slogan; the answer is in sentence 2.
- /fr/superannuation, /it/superannuation, /es/superannuation: no "checked/updated" line and no dateModified.
- public/llms.txt: key facts contain no refund-timing, refund-bank-account or DASP-process facts (only the 65% rate); guide
  lines are titles only (lines 132 to 193), while SVT's llms.txt gives a one-sentence answer plus source per guide
  (src/lib/svt/llms.ts `line()`). The generator script is not in this zip (Phase 1 doc), so edits are by hand.
- No EN guide mentions myGov SMS codes, the Code Generator app or Digital ID (grep data.ts: 0 hits).
- SVT: no Bing AI data; refund queries at 22 to 57, super at 50 to 91 (svt/Queries.csv). Only "退税时间" 4 impr @9.0 and
  "2026报税截止日期" 5 @9.2 are near page one. I: no realistic AI citation for SVT refund/super pages before they rank.

## 2. Proposals

### P1-1. One refund timing figure everywhere: 10 business days (fix, all languages, both sites)
Files: src/app/(site)/blog/data.ts (lines 1244, 3747, 9363; how-long-does-tax-refund-take-australia title, seoTitle,
description and opening, which the freeze allows to change because the figure is a factual error), src/app/(de)/de/blog/data.ts,
src/app/(ja)/ja/blog/data.ts, src/app/(fr|it|es)/<l>/blog/chunks/03.ts, 08.ts, 18.ts, src/lib/svt/content/blog-en.ts
(140 to 181 incl. the short answer facts), home-en.ts 93, long/en/batch-01, 04, 11, plus zh/vi twins (grep "12").
Change "about 12 business days" / "within 12 business days" to the ATO wording, keep everything else:
- EN: "The ATO says most returns lodged online process within 10 business days."
- seoTitle EN: "How long does a tax refund take in Australia? About 10 business days" (title: "How long does a tax refund
  take in Australia in 2026?" stays). Description: "The ATO says most online returns process within 10 business days;
  paper can take up to 50 business days. What stalls a refund and why." (138 chars)
- DE "Laut ATO werden die meisten online eingereichten Steuererklärungen innerhalb von 10 Werktagen bearbeitet."
- JA 「ATOによると、オンラインで提出された申告の多くは10営業日以内に処理されます。」
- FR « Selon l'ATO, la plupart des déclarations déposées en ligne sont traitées en 10 jours ouvrés. »
- IT «Secondo l'ATO, la maggior parte delle dichiarazioni presentate online viene elaborata entro 10 giorni lavorativi.»
- ES «Según la ATO, la mayoría de las declaraciones presentadas en línea se procesan en un plazo de 10 días hábiles.»
- ZH 「ATO表示，大多数网上递交的报税表会在10个工作日内处理完毕。」 VI "Theo ATO, phần lớn tờ khai nộp trực tuyến được xử lý
  trong vòng 10 ngày làm việc."
Source: ATO check the progress of your tax return (F6 URL). Keep "about 14 business days" for the refund landing on /tax-return
(it is our own observation sentence, already approved). Effort S. Lead: re-open the ATO page on the day of the edit.

### P1-2. /tax-return (EN, then 5 languages): a "problems that stop a refund" answer table
Why: F2/F5. /tax-return already wins the generic refund prompts; it has no answer for the problem prompts where competition is
only community threads. A table of problem / official rule / what to do is the most quotable block type and routes to WhatsApp.
File: src/app/(site)/tax-return/page.tsx. Insert a new Section after `#missed-deadline` (before `#key-figures`), id
`refund-problems`, eyebrow "When something is in the way", H2 (question, as typed):
"What can stop a working holiday tax refund, and what do you do?"
Opening: "Most refunds that stall are held up by one of five things, and none of them means the money is lost. Each row below
gives the official rule and the fix."
| Problem | What the official rule says | What to do |
|---|---|---|
| No myGov SMS code since you left Australia | myGov sends codes to the registered Australian mobile; overseas it needs international roaming. Without that number you can sign in with Digital ID or create a new myGov account. | Use roaming, the Code Generator app or Digital ID, or skip myGov: we deal with the ATO directly. |
| Your Australian bank account is closed | The ATO needs an Australian account for a refund. A refund sent to a closed account goes back to the ATO and can then be re-issued by cheque. | Keep the account open until the refund lands. If it has closed, give the ATO new Australian bank details. |
| An income statement is not "tax ready" | Your employer has not finalised it yet. | Wait, or ask the employer to finalise it; a return lodged before that may need fixing later. |
| You worked before your TFN arrived | Without a TFN on file your employer had to withhold 45% instead of 15%. | That year still needs a return; you need a TFN first, and it can be found or applied for after you leave. |
| You need to call the ATO from overseas | The ATO's number from outside Australia is +61 2 6216 1111, 8 am to 5 pm, Monday to Friday, Australian Eastern time. | Call with your TFN ready, or let us deal with the ATO for you. |
Source line under the table (small): "Sources: my.gov.au, use a code sent by SMS; ATO, missing tax return refunds; ATO, lodge
your tax return before leaving Australia; ATO, contact us. Checked November 2026." (link each; URLs in F7.) Row 3 and 4 use
facts already on the site (tax-back step 2; /tax-return REFUND_SOURCES). Then: WaButton detail "refund problem",
label "Tell us what is in the way". Link the rows to the new guides from P1-4 once they exist.
Other languages: same table in /de/tax-return, /ja/tax-return, /fr/tax-return-australie-pvt, /it/dichiarazione-redditi-australia,
/es/devolucion-impuestos-australia, written natively by the language agents from the same facts; JA heading
「還付が止まる原因と対処法は？」, DE "Was kann deine Steuererstattung aufhalten, und was tust du dann?",
FR « Qu'est-ce qui peut bloquer votre remboursement, et que faire ? », IT «Cosa può bloccare il tuo rimborso, e cosa fare?»,
ES «¿Qué puede frenar tu devolución y qué puedes hacer?». Effort M.

### P1-3. /superannuation (EN, then JA/DE/FR/IT/ES): add a "DASP online blockers" table, sourced row by row; no rewrite
Why: F3. The page is already built right; what it lacks is something ato.gov.au and the funds do not put in one place, in
problem form. The ATO's own help page is the source but reads as a help desk list (updated 2024).
File: src/app/(site)/superannuation/page.tsx. New Answer section after `#how-long`, id `dasp-online-problems`,
heading "Why can you not submit your DASP application?" Opening (answer first):
"Usually because your visa still shows as active, or because the details you typed do not match your passport. The ATO's
online DASP application will not accept a claim while your temporary visa is in effect, and it finds you only by the exact
passport details you used the first time."
| What you see | Why | What to do |
|---|---|---|
| The application will not submit | Your temporary visa is still active in Home Affairs records | Check your visa in VEVO. Cancelling a visa after you have left is a Home Affairs matter |
| Your saved application is not there | Different personal details from the first time | Use the same passport number and country as before, even if that passport has expired |
| A fund is missing | The search did not find it | Add it with "Add application" and the fund's ABN |
| The shared secret is rejected | Three attempts are allowed | Phone the ATO: +61 2 6216 1111 from overseas |
| Super the ATO holds cannot go overseas | ATO-held super is paid only by EFT to an Australian account in your name, or by cheque | Keep your Australian account open, or claim from the fund before the balance moves to the ATO |
Under it: "Source: ATO, help with the DASP online application system, and Departing Australia superannuation payment (DASP).
Checked November 2026." + link to dasp-rejected-what-to-do ("If the fund rejected a claim you did submit") and WaButton
"Ask us why yours is stuck". Also: add `<p className={blocks.small}>Last updated 24 November 2026.</p>` under the hero
answer and set speakable `dateModified` to the deploy date (F8). Key figures: turn "Source: ATO." into a link to ATO_DASP.
H1, hero lead and existing H2s unchanged (freeze). Effort S (EN), M (5 languages).
JA (/ja/superannuation): heading 「DASPのオンライン申請が送信できないのはなぜ？」; opening 「多くの場合、ビザがまだ有効と表示されているか、
入力した情報がパスポートと一致していないためです。一時滞在ビザが有効な間はATOのDASPオンライン申請を送信できず、初回と同じパスポート情報で
しか本人が特定されません。」 Same five rows natively. Also JA-only: link 出典 to the ATO Japanese DASP page (F7) in KEY_FIGURES and
put the answer paragraph (line 292) before the slogan Lead (line 291), wording unchanged.
DE (/de/superannuation): "Warum lässt sich dein DASP-Antrag nicht absenden?" / "Meist, weil dein Visum noch als gültig
geführt wird oder deine Angaben nicht genau zu deinem Reisepass passen. Solange dein befristetes Visum gilt, nimmt der
Online-Antrag der ATO keinen DASP an, und er findet dich nur über dieselben Passdaten wie beim ersten Mal."
FR/IT/ES: same structure, native, vous / tu / tú.

### P1-4. New problem guides built to be cited (EN first; then DE, JA, FR, IT, ES)
Chosen because (a) the 24 Nov searches return only community.ato.gov.au threads for them (F5), (b) each has a verifiable
official rule to quote (F7), (c) none overlaps an existing slug (checked against S/plan3/en_slugs.txt: no mygov, sms or
closed-account slug; dasp-rejected covers fund rejections after submission, not the online system). Each guide: answer in
the first 2 sentences with the official rule, 4 to 6 question H2s, one table, visible sources with dates, link to the money
page, approved CTA. Category Tax Return / Super. File: src/app/(site)/blog/data.ts (new Guide objects), then
(de|ja)/blog/data.ts and fr/it/es chunks. Add each to /tax-return GUIDES or /superannuation GUIDES and to llms.txt.
If another plan3 report (myGov topic) drafts guide A in full, use that draft and only add the citation elements listed here.

A) slug `mygov-sms-code-overseas`
Title: "No myGov SMS code overseas? What you can do" (45)
Description: "Left Australia and no longer get the myGov SMS code? The official options: roaming, the Code Generator app,
Digital ID or a new account, and lodging without myGov." (152)
Opening: "myGov only sends sign-in codes by SMS to the Australian mobile number on your account, so overseas you need
that number with international roaming. If you no longer have it, myGov's own options are to sign in with Digital ID or to
create a new myGov account and link your services again. Your tax return does not have to wait for any of that."
H2s and answers:
- "Can myGov send the code to an overseas number?" No. myGov says the backup number for SMS codes must be an Australian
  mobile number, and overseas it only works with international roaming on that number.
- "What if I no longer have my Australian SIM?" myGov says you can sign in with Digital ID or create a new myGov account.
  A new account starts empty: you link the ATO to it again, which needs an identity check.
- "Does the myGov Code Generator app work instead?" It replaces the SMS code, but myGov advises downloading it before you
  travel, which means setting it up while you can still sign in.
- "Can I phone the ATO from overseas?" Yes: +61 2 6216 1111, 8 am to 5 pm Monday to Friday, Australian Eastern time.
- "Do I need myGov to get my tax refund?" No. myGov is one way to lodge, not a requirement for a refund. [closing CTA]
Table: "Your situation / the official route / time it takes you" (roaming; Code Generator app; Digital ID; new account;
no myGov at all).
Sources line: my.gov.au use a code sent by SMS; my.gov.au Code Generator app; my.gov.au accessing myGov while overseas;
ATO contact us (F7). Links: /tax-return ("working holiday visa tax return"), how-to-lodge-tax-return-from-overseas,
past-years-tax-returns-working-holiday, how-to-find-lost-tfn.
Closing CTA (approved wording): "You don't need myGov for us to do your return. We deal with the ATO directly, and your
return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message us on WhatsApp with
the years you worked." Never ask for, or suggest sharing, a myGov password (keep the /tax-return warning line).
Native openings:
- DE (`/de/blog/mygov-sms-code-overseas`), title "Kein myGov-SMS-Code im Ausland? Deine Optionen": "myGov schickt
  Anmeldecodes per SMS nur an die australische Handynummer in deinem Konto. Im Ausland brauchst du also genau diese Nummer
  mit Roaming. Hast du sie nicht mehr, nennt myGov zwei Wege: Anmeldung mit Digital ID oder ein neues myGov-Konto, mit dem
  du deine Dienste neu verknüpfst. Deine Steuererklärung muss darauf nicht warten."
- JA (`/ja/blog/mygov-sms-code-overseas`), title 「帰国後にmyGovのSMSコードが届かないときの対処法」: 「myGovのSMSコードは、
  アカウントに登録されたオーストラリアの携帯番号にしか届きません。海外ではその番号で国際ローミングが必要です。番号を手放した場合、myGovが
  案内している方法は、Digital IDでのログインか、新しいmyGovアカウントを作って各サービスをつなぎ直すことです。タックスリターンはそれを
  待つ必要はありません。」
- FR (vous), title « Plus de code SMS myGov depuis l'étranger ? Vos options » ; IT (tu) «Niente codice SMS myGov
  dall'estero? Le tue opzioni»; ES (tú) «¿No te llega el código SMS de myGov fuera de Australia?». Same facts, native body.

B) slug `tax-refund-closed-bank-account`
Title: "Tax refund and a closed Australian bank account" (47)
Description: "Closed your Australian account before the ATO refund arrived? What happens to the money, how it is re-issued,
and why the account should stay open." (142)
Opening: "The money is not lost. A refund sent to a closed account is returned to the ATO by the Reserve Bank of
Australia, which can take up to 10 days, and the ATO re-issues it once you give it current bank details, or by cheque if
you give none. The simplest fix is to keep your Australian account open until the refund has landed."
H2s: "Can the ATO pay my refund into an overseas bank account?" (it needs an Australian bank account to receive a refund,
ATO lodge-before-leaving page) / "What happens to a refund sent to a closed account?" (RBA returns it; up to 10 days) /
"How do I get it re-issued?" (update bank details; otherwise cheque; since January 2025 some cheques are held up to 90 days
while the ATO asks for bank details) / "Should I close my account before I fly home?" (no; and for super, ATO-held super is
also paid only to an Australian account or by cheque, link /superannuation) / "Can I still lodge if I have already closed
it?" (yes; say so at the start, link /tax-return).
Table: "Where the refund goes / what happens next" (open account: paid; closed account: returned by RBA, re-issue on new
details; no details: cheque, possibly held up to 90 days).
Sources: ATO missing tax return refunds; ATO lodge your tax return before leaving Australia (F7).
Closing CTA: "Tell us your account has closed in your first WhatsApp message. We deal with the ATO directly, and your return
is reviewed and signed off by a registered tax agent before it is lodged with the ATO." No promise of timing or amount.
DE title "Steuererstattung und geschlossenes australisches Konto"; JA 「オーストラリアの銀行口座を解約した後の還付金」.

C) slug `dasp-online-application-problems`
Title: "DASP online application problems and how to fix them" (52)
Description: "Cannot submit your DASP or find your saved claim? The ATO's rules on an active visa, passport details, missing
funds and the shared secret, and what to do." (147)
Opening: "Most DASP online problems come from two things: a temporary visa that is still active, or personal details that
differ from the first time you used the system. The ATO will not accept a DASP while your visa is in effect, and it only finds
your saved application with the same passport number and country you entered first, even if that passport has expired."
H2s: "Why will my DASP application not submit?" / "Why can I not see my saved application?" / "What if a super fund does not
show up?" / "What if I forgot my shared secret?" / "How long does it take once it goes in?" (generally within 28 days of a
complete application; link how-long-does-dasp-take) / "My claim was submitted and then rejected" (link dasp-rejected-what-to-do).
Table: same 5 rows as P1-3 (the guide is the long version; /superannuation keeps the short table).
Sources: ATO DASP; ATO help with the DASP online application system (F7).
Closing CTA (super): "Tell us where you worked and roughly when. We deal with the ATO directly and check each fund before
you apply. Message us on WhatsApp." (no tax agent claim, no amounts; super consolidation is not offered on SVT, n/a here.)
I: of the three, C is the most likely to be cited by Copilot (super long-tail is where our 114 super citations come from,
and how-long-does-dasp-take, its neighbour, already earns 60); A is the most valuable for Jo's funnel.
Effort: M each (EN), M per language.

### P2-1. llms.txt: refund and super facts plus short problem answers
File: public/llms.txt (hand edit; also llms-full.txt; and the generator when it is back in the repo).
a) Add to "Key facts, with effective dates" (after the 31 October line):
- "Tax refunds: the ATO says most returns lodged online process within 10 business days. A refund needs an Australian bank
  account; a refund paid to a closed account is returned to the ATO and re-issued on new details or by cheque. Early returns
  before leaving Australia are paper only and take 50 business days. Source: ATO"
- "DASP: claim once your temporary visa has ceased and you have left Australia; generally paid within 28 days of a complete
  application; the ATO's online DASP application is free; certified ID may be needed at $5,000 or more; super the ATO holds is
  paid only to an Australian account in your name or by cheque. Unclaimed super moves to the ATO 6 months after you left and
  your visa ceased. Source: ATO"
b) New section "## Refunds and super: common problems" (one line each, answer then URL): no myGov SMS code overseas
(guide A); closed Australian bank account (guide B); DASP will not submit (guide C); how long a DASP takes
(/blog/how-long-does-dasp-take); missed 31 October or earlier years (/tax-return#missed-deadline); worked before the TFN
arrived (/blog/tax-return-without-tfn-australia). End each with "Updated November 2026."
c) Guide lines in the Tax Return and Super categories: add the guide's first sentence after the title, as SVT's llms.txt
does. No prices (WHT rule). Effort S.
SVT: src/lib/svt/llms.ts key facts already has DASP 28 days; change any "12 business days" (P1-1); add "A refund is paid
into an Australian bank account" with the ATO source. Effort S.

### P2-2. Sources and dates on the language money pages (add only)
- /ja/tax-return and /ja/superannuation: link 出典 to ato.gov.au (JA DASP page for super; F7 URLs for refunds); add
  「最終更新：2026年11月」 line where missing; set dateModified on /ja/superannuation.
- /fr/superannuation, /it/superannuation, /es/superannuation: add dateModified and one line under the key figures:
  FR « Vérifié auprès de l'ATO (Departing Australia superannuation payment), novembre 2026. » IT «Verificato sulle pagine
  dell'ATO sulla DASP, novembre 2026.» ES «Comprobado con la información de la ATO sobre la DASP, noviembre de 2026.» with
  the ATO_DASP link. Effort S.

### P2-3. Bing first: confirm /superannuation is in Bing's index
Fact: 0 Bing citations on a page Google shows 9,457 times. Jo: Bing Webmaster Tools > URL Inspection for /superannuation,
/de/superannuation, /fr/superannuation, /it/superannuation, /es/superannuation and /tax-return; submit any not indexed and run
IndexNow after the December deploy (with the new guides). Effort S. If indexed and still 0 in January, that confirms F3:
put effort into the problem guides, not the hub.

### P3-1. Measurement (adds to p2-ai section 6)
Add these prompts to the monthly panel (ChatGPT search, Perplexity, Copilot, Google): "can't get myGov code overseas tax
return"; "tax refund closed australian bank account"; "dasp application won't submit visa"; "how long does a tax refund
take australia"; DE "myGov Code kommt nicht Ausland"; JA 「myGov SMS 届かない 帰国後」. Bing AI report monthly: track the
refund grounding queries' share (baseline F2) and super citations (baseline 114, 1.9%).

### P3-2. SVT
Only P1-1 (10 business days) and P2-1 SVT line now. SVT refund/super pages rank 22 to 91; citation work waits until they
rank. If a zh/vi problem guide is wanted later, guide B (closed account) suits international students too; write it
SVT-native, never mentioning the other brand.

## 3. What NOT to do
- Do not rewrite the /superannuation H1, hero lead or existing H2s to "win AI": F3 shows the structure was already right;
  the gap is ranking against the ATO and the funds. Add the table and dates only.
- Do not create new "how to claim super" / "superannuation refund" pages: they would compete with /superannuation and the
  existing super guides (dasp-vs-leaving, best-way-to-claim-super-leaving-australia, what-is-dasp-super-withdrawal). Same for
  "how to get a tax refund": /tax-return and tax-back-australia-working-holiday already own it (267 + 81 citations).
- Do not touch the openings of tax-back-australia-working-holiday beyond the "12" to "10" figure in the body (it is in the
  frozen top-12 list; the 12-day sentence is in a lower section, line 9363, not the opening).
- Do not say we lodge, or that we are a tax agent; the CTA is "We deal with the ATO directly" plus the sign-off sentence.
  JA never 税理士 for us. No refund amounts or timing promises beyond the ATO wording. No prices in llms.txt or new pages.
- Do not write that a new myGov account can be linked to the ATO from overseas without an Australian phone, or any myID rule
  for foreign passports: not verified (F7). Do not tell readers to share myGov logins or codes with anyone.
- Do not state that super can always be paid overseas: only fund applications can use international money transfer, and only
  where the fund offers it; ATO-held super cannot.
- Do not cite community.ato.gov.au threads as a source; cite ATO and my.gov.au pages only.
- No AI or bot wording on pages; no em/en dashes; sentence case headings; SVT residency "may be"/"usually".
