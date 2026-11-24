# build-D (Japanese), 24 Nov 2026

Owner: every file under src/app/(ja)/. No JA-only slug list exists (sitemap.ts and guide-alternates.ts read
jaPostTranslations directly, so new JA guides are picked up automatically once their EN twin exists).
Files changed: src/app/(ja)/ja/blog/data.ts, src/app/(ja)/ja/tax-return/page.tsx, src/app/(ja)/ja/page.tsx,
src/app/(ja)/ja/superannuation/page.tsx, src/app/(ja)/ja/contact/page.tsx.

## Sources (URL keys used below)
- A1 ATO create a myGov account and link it: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato (sign-in options, SMS needs Australian mobile, no secret questions, overseas: myID/passkey/authenticator)
- A2 ATO information you need to link: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato (identity questions, skipping all = failed attempt, "we will let you know what to do next")
- A3 ATO help and support for online services: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/help-and-support-for-online-services-individuals (error codes, View and link services, data breach note)
- A4 ATO when you can't sign in: https://ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account
- A5 ATO contact: https://www.ato.gov.au/about-ato/contact-us/ (+61 2 6216 1111, 8 am to 5 pm AEDT; TIS +61 3 9268 8332)
- M1 my.gov.au sign in help (updated 19 Nov 2026): https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help (SMS checklist, locked account steps, username format, Code Generator retires 28 Feb 2027 and no longer downloadable)
- M2 my.gov.au SMS codes: https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms
- M3 my.gov.au overseas: https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas
- M4 my.gov.au authenticator: https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-an-authenticator (Google Authenticator, Apple Passwords, 1Password)
- M5 my.gov.au recover with Digital ID: https://my.gov.au/en/about/help/digital-id/recover-your-account-using-digital-id (Strong, matching name/DOB/email, not already connected)
- M6 my.gov.au contact: https://my.gov.au/en/about/help/contact (+61 1300 169 468 option 1, hours)
- D1 myID set up: https://www.myid.gov.au/set-up ; D2 https://www.myid.gov.au/verifying-your-id-in-myid (Standard 2 docs incl. visa via foreign passport; Strong: Australian documents + photo; visa cannot be verified from outside Australia)
- L1 ATO how to lodge: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return (3 ways; only registered agents may charge)
- L2 ATO lodge from outside Australia: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia
- L3 ATO paper return: https://www.ato.gov.au/Individuals/Your-tax-return/How-to-lodge-your-tax-return/Lodge-a-paper-tax-return/ (GPO Box 9845 SYDNEY NSW 2001)
- P1 ATO check progress: https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return (10 business days)
- P2 ATO track progress (updated 10 Nov 2026): https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return (manual up to 30 calendar days, paper up to 90 business days, 7 weeks to show)
- P3 ATO early lodgment: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-before-leaving-australia (50 business days, kept)
- R1 ATO missing refunds: https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds (RBA return up to 10 days, cheque, some cheques held up to 90 days since Jan 2025, wrong account recovery over 28 days)
- R2 ATO financial institution details: https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details (Australian account only, how to update, BSB/account format, by phone)
- R3 ATO return instructions 2026: https://www.ato.gov.au/forms-and-instructions/individual-tax-return-2026-instructions/completing-the-individual-tax-return-2026/completing-individual-information-in-your-tax-return-2026 (refund held up to 90 days without Australian details)
- R4 myTax financial institution details: https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/supporting-documents-for-my-tax/financial-institution-details
- S1 ATO DASP: https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp (eligibility, 28 days, payment methods: IMT for fund applications only and not all funds, ATO-held super Australian account or cheque, 6 month transfer)
- S2 ATO DASP online help: https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system (inputs, TFN optional, Add application with ABN, shared secret, statuses, VEVO, DASPmail@ato.gov.au, +61 2 6216 1111 ask for 13 10 20)
- S3 ATO DASP for agents: https://www.ato.gov.au/tax-and-super-professionals/digital-services/departing-australia-superannuation-payments-dasp-online-system (written authority; agents may not use the client's myGov)
- T1 ATO final countdown release: https://www.ato.gov.au/media-centre/the-final-countdown-ato-reminds-taxpayers-to-lodge-now (2 Nov 2026 cut-off)
- T2 ATO lodge with a registered tax agent: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-with-a-registered-tax-agent
- T3 ATO agent lodgment program October 2026: https://www.ato.gov.au/tax-and-super-professionals/for-tax-professionals/prepare-and-lodge/registered-agent-lodgment-program/due-dates-by-month/october-2026
- T4 ATO FTL penalty and penalty units: https://www.ato.gov.au/individuals-and-families/paying-the-ato/interest-and-penalties/penalties/failure-to-lodge-on-time-penalty ; https://www.ato.gov.au/individuals-and-families/paying-the-ato/interest-and-penalties/penalties/penalty-units
- T5 ATO Payday Super: https://www.ato.gov.au/businesses-and-organisations/super-for-employers/about-payday-super

## 1. New JA guides (src/app/(ja)/ja/blog/data.ts, jaPostTranslations, inserted before HELPERS)
Slugs exactly per BUILD/r17 P1-1 (r04's own slugs myid-foreign-passport-link-ato and dasp-without-mygov NOT used).
Each: title <= 34 chars, description 121 to 132 chars, answer-first paragraph 1 with no link, question H2s,
no link in the first paragraph under any H2, <= 8 body links, closing H2 with approved JA wording and WhatsApp.
Tax-return closing: "myGovのアカウントは必要ありません" + "ATOとのやり取りは当社が直接行い" + "ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します" (existing /ja/tax-return wording).
Super closing: only what /ja/superannuation already says ("myGovへのログインもID連携も不要です", "ATOとは当社が直接やり取り", "タックスファイルナンバーに紐づく口座をすべて探します") + existing supervision sentence "Working Holiday Taxは、オーストラリアの登録タックスエージェントの監督のもとで運営しています".
| slug | links (body) | facts |
|---|---|---|
| mygov-problems-tax-return-super (hub) | 5 children + /ja/tax-return + claim-super + /ja/superannuation = 8 | A1, M1, M6, A5, L1, S2 |
| mygov-sms-code-not-received-overseas | myid, cant-link, hub, how-to-update-address, /ja/tax-return | M2, A1, M1, M3, M4, M5, D2, M6, L1, L2, R2 |
| mygov-account-locked-out | myid, cant-link, tfn-security, /ja/tax-return, hub | M1, A1, M5, D2, M6, A3 |
| cant-link-ato-to-mygov | myid, tax-return-without-mygov, /ja/tax-return, hub | A1, A2, A3, A5, L1 |
| myid-foreign-passport-working-holiday | cant-link, sms, hub, /ja/tax-return | D1, D2, A1, A4, M5, L1, S2 |
| tax-return-without-mygov | hub, past-years, sms, closed-account, /ja/tax-return | L1, L2, L3, P1, P2, R4 |
| claim-super-without-mygov (Super) | lost-super, dasp-online-application-problems, /ja/superannuation, hub | S1, S2, S3, A5 |
| dasp-online-application-problems (Super) | lost-super, how-long-dasp (sibling), dasp-rejected (parent), claim-super, /ja/superannuation | S2, S1 |
| tax-refund-closed-australian-bank-account | /ja/tax-return, ATO R1 link, hub, after-leaving, address, how-long refund (parent) | R1, R2, R3, R4, A5, S1 |
| tax-and-super-timeline-working-holiday | FY dates, late penalty, deadline, refund time, DASP time, unclaimed, /ja/tax-return, /ja/superannuation = 8 | T1, T2, T3, T4, T5, P2, P3, S1, S2 (r14 P2-1 JA text, ファンド instead of 基金, CTA swapped to approved wording) |
Never used: 税理士 for us, Code Generator as a fix (mentioned only as no longer downloadable and retiring 28 Feb 2027, M1),
ATO linking code by phone, Strong myID with a foreign passport (guides say the opposite, D2), refund to an overseas account,
Microsoft Authenticator, prices, dashes, refund promises. Paper returns are given as up to 90 business days (P2).

## 2. Fact fixes in existing JA guides (data.ts)
- how-long-does-tax-refund-take-australia: title number 12 to 10 only ("目安約10営業日と遅れる原因", factual-error exception);
  description 12 to 10 and paper 50 to 90 (factual error); opening rewritten to the r16/r14 wording (10 business days,
  manual up to 30 calendar days, paper up to 90); "約12営業日" to "10営業日以内" in body; H2 "12営業日を過ぎても" to
  "10営業日を過ぎても" (r16 P1); "28日を過ぎたら" to "30日（暦日）を過ぎたら" (ATO manual maximum, P2) and "当社を通じて提出した
  申告書" to "当社にご依頼いただいた申告書" (avoid implying we lodge); closed-account H2 replaced with R1 wording (RBA return up to
  10 days, reissue, cheque, some cheques held up to 90 days) and the unverified "4 to 6 weeks" removed; added links to
  tax-refund-closed-australian-bank-account, the deadline guide (r17 P1-6) and the timeline guide (8 links total). Sources P1, P2, R1.
- how-to-lodge-tax-return-working-holiday: "約12営業日" to "10営業日以内" (P1); linking-code-by-phone sentence (r16 W7/J13,
  BUILD "never") replaced with A2 wording "オンラインで本人確認ができない場合は、次に何をすればよいかをATOが案内します" + link to cant-link-ato-to-mygov.
- how-to-lodge-tax-return-from-overseas: "約12営業日" to "10営業日以内"; agent "grace date, missing October is not a big problem"
  replaced with T2 wording (agent can lodge after 31 Oct if contacted before 31 Oct; a passed date is not extended);
  r04 P1-1 link sentence to mygov-sms-code-not-received-overseas added (end of 2nd paragraph of "出国した後に難しくなるのは何か？").
- what-is-a-tax-refund-australia: "約12営業日" to "10営業日以内" (P1).
- May line (r14 P1-3, T2/T3), replaced without implying our clients get extra time:
  working-holiday-visa-tax-guide-417-462 ("翌年5月まで延長"), do-you-need-to-lodge-tax-return-short-stay ("翌年5月まで延長された期限"),
  late-tax-return-penalty-working-holiday (paragraph + checklist item), tax-obligations-after-leaving-australia ("翌年5月まで"),
  diy-tax-return-vs-tax-agent-working-holiday ("10月31日を超える延長された提出期限を持ち" right before our process sentence).
- tax-return-deadline-31-october-working-holiday: agent H2 body replaced with r14 P1-3 JA text (incl. prior-year exception, T2, T3);
  r14 P1-2 note added at the end of the first H2 (2 Nov 2026 cut-off, 31 Oct 2027 is a Sunday, T1) + link to the timeline guide.
- Inbound links (one sentence each, never paragraph 1 or first paragraph under an H2): how-to-find-lost-superannuation to
  claim-super-without-mygov (S2); how-long-does-dasp-take to dasp-online-application-problems and the timeline;
  australian-financial-year-dates to the timeline (r14 P2-1). All touched guides <= 8 body links.

## 3. Money pages
- /ja/tax-return (page.tsx): r04 P1-3 new Section "myGovにログインできない・SMSが届かない場合は？" (titleId mygov-title) after the
  after-return section, links to the SMS guide and the hub, WaButton "myGovに入れないまま相談する" (L1, L2, R2). No FAQ added
  (r04 marked it optional). r04 P1-4: FAQ answers "帰国後でも依頼できますか？" and "還付金を日本の銀行口座で受け取れますか？" and the
  RULES card (same claim, line 172) now say DASP reaches an overseas account only via a fund that offers international transfer,
  ATO-held super excluded (S1). r17 P1-3/P1-6: GUIDES + tax-back, how-long refund, amending, after-leaving, myGov hub.
  Deadline section links the timeline guide. webPage dateModified 2026-11-05 to 2026-11-24. Title, description, H1 untouched.
- /ja (page.tsx): r04 P1-4 FAQ "帰国後でも..." DASP sentence fixed (S1). r17 P1-6: new muted paragraph in the first text block
  after the hero with anchors "オーストラリアのタックスリターン代行" (/ja/tax-return) and "タックスリターンはいつまで" (deadline guide).
- /ja/contact (page.tsx): same DASP overseas-account claim fixed (S1).
- /ja/superannuation (page.tsx): GUIDES + super-for-casual, check-super-balance (r17 P1-3 labels), claim-super-without-mygov,
  dasp-online-application-problems, timeline. Nothing else changed (H1 frozen).

## 4. Verify
- npx tsc --noEmit -p . : clean.
- jest (full run): 9 failed suites = the 8 known Will/form-start-lang suites + src/lib/__tests__/new-locales-sitemap.test.ts,
  which fails only on LOCALE_GUIDE_SLUGS.fr/it/es vs chunk data (FR/IT/ES agents' files, not JA). All JA-related suites pass.
- __tests__/wht-copy-compliance-6-languages.test.ts does not exist in this repo (only __tests__/setup.js).
- Dash grep (U+2013, U+2014, U+2015, "——") on all 5 changed files: 0. 税理士: no new occurrence (existing ones are about
  Japanese 税理士, not us). No "12営業日" left; remaining "50営業日" are all early lodgment (P3).

## 5. Dependencies and flags for Jo / other agents
- The 10 new JA guides render only after the EN twins with the same slugs exist in src/app/(site)/blog/data.ts. Until then the
  new links on /ja/tax-return, /ja/superannuation and in JA guides point to pages that 404, and the sitemap omits them.
- NOT changed (outside the listed fixes, flag): /ja/tax-return "おおむね14営業日" in OG description, hero lede, SEQUENCE step 07 and
  the first FAQ (r16 W7: unverified, same as EN /tax-return); KEY_FIGURES Medicare row and the Medicare FAQ (r16 W3, MES wording,
  most WHMs are foreign residents); "6月15日の締切" in australian-financial-year-dates and early-tax-return (r16 W7);
  how-long-does-dasp-take "7日から14日" and bank clearing days (r13/r14 unverified); /ja/client-agreement line 199 overseas
  account (legal text, r16 W6). Optional r04 FAQ on /ja/tax-return not added.
