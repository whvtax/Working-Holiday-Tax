# build2-SVT2 (Student Visa Tax en/zh/vi), 24 Nov 2026

Files: src/lib/svt/content/** only. No title/description/H1 of existing pages changed. No components or app routes touched.

## Facts verified today (official URL each)
- Payday Super from 1 July 2026: contributions "must be received by your employees' super funds within 7 business days
  after paying your employees"; "some exceptions ... such as for new employees"; SG "still 12%"; "qualifying earnings,
  which is a new term that brings together ordinary time earnings and other payments".
  https://www.ato.gov.au/businesses-and-organisations/super-for-employers/about-payday-super (updated 10 Aug 2026)
- "From 1 July 2026, your super will be paid each payday." "Your employer used to pay your super every 3 months."
  "You can see the amount of super for each pay on your payslip."
  https://www.ato.gov.au/about-ato/using-our-website/easier-to-read-information/payday-super-easier-to-read (2 May 2026)
- DASP online system: details needed (incl. fund ABN), TFN optional, 45 second check, about 30 minutes, secret answer
  1 to 20 chars and 3 tries (forgot: phone ATO), saved application needs identical TFN/name/passport/DOB, Add application
  with fund ABN (Super Fund Lookup), ATO-held super shown as "Payment of unclaimed superannuation money", visa screen wrong:
  do not submit, DASPmail@ato.gov.au, cannot submit while temporary visa active even after leaving (VEVO), submitted
  application viewable not changeable (contact fund via Submitted applications), statuses, 28 day standard,
  +61 2 6216 1111 8 to 5 Mon to Fri AEST/AEDT ask for 13 10 20, TIS +61 3 9268 8332.
  https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system (11 Oct 2024)
- myGov before travel, Digital ID (J2), Australian account for refunds (I1): ATO lodge from outside Australia (r16).
- "usual 31 October deadline" (H1): ATO lodge with a registered tax agent; 2026 weekend extension: ATO media release
  19 Oct 2026 (r14 V2). 31 Oct 2027 = Sunday, 1 Jul 2027 = Thursday (computed with `date`).

## (1) r08 P2-2: Graduating section + leaving pages link the 4 problem guides (lists <= 6)
- guides-en/zh/vi.ts leaving-australia: new section `graduating` after `before` (p + list of 4: myGov sign in settings
  and Digital ID, keep Australian account, last super payment within 7 business days under Payday Super, note funds and
  member numbers for the DASP). 485/bridging visa wording reused from /superannuation; TFN for life from services-en.
  3 sources added (ATO lodge from outside Australia, About Payday Super, DASP) + zh/vi sourceLabels. updated 2026-11-24.
  related (6): home, superannuation, mygov-sms, claim-super-without-mygov, closed-account, lodge-from-overseas
  (cancel-abn-before-leaving moved off; still linked from lodge-from-overseas and LONG_ALSO).
- blog-en lodge-from-overseas related (6): superannuation swapped for cant-link-ato-mygov.
- long/en/links.ts: lodging-tax-return-after-going-home -> [mygov-sms, cant-link, lodge-from-overseas];
  tax-after-leaving -> [leaving-australia, closed-account, claim-super-without-mygov]. All 4 guides now linked from leaving pages.

## (2) r14 P3-1: 2026-27 dates
- blog-en/zh/vi tax-return-deadline-31-october: new section `next` (2026-27 year, lodge from 1 July 2027, usual deadline
  31 October 2027, a Sunday, check ATO announcement as in 2026) + FAQ "deadline in 2027" (FAQ 3 -> 4 in all 3 languages);
  source "Lodge your tax return with a registered tax agent" + zh/vi labels (approved forms). updated 2026-11-24.
- long en/zh/vi tax-deadline-final-week-checklist-students: new H2 "When is the next deadline?" before the checklist.
- long en/zh/vi australian-financial-year-dates-international-students: one sentence on 31 October 2027 (Sunday);
  EN sources + media release and agent page.

## (3) Payday Super sentences (no new page)
- services-en/zh/vi /superannuation: FAQ 14 -> 15 "When should my last super payment reach my fund?" + source About
  Payday Super (+ labels). updated 2026-11-24.
- blog-en/zh/vi how-much-super-employer-pays: qualifying earnings sentence in `rate` p; + About Payday Super source.
- blog find-and-check-your-super: new p in `see` (paid each payday instead of every 3 months; amount on payslip),
  source Payday Super easier to read (+ labels).
- blog dasp-documents-and-timing: `need` p adds "check your last super payment has arrived" (7 business days);
  source About Payday Super; related gets dasp-online-application-problems (r17 P1-6), 6 entries.
- Existing long articles already had Payday Super timing (checked, unchanged).

## (4) Remaining r08/r09/r10 P1/P2 items built
- r10 P2-A / r17 registry: NEW long guide dasp-online-application-problems-international-students (Super), en/zh/vi,
  appended to long/{en,zh,vi}/batch-13-problems.ts. EN title 52 chars, description 153, 10 question H2s, 3 FAQs each
  language, answer first, no body links, closing = /superannuation service wording + supervision line. zh title uses
  ATO's term 离澳退休公积金支取 in body (r09 F4). vi title 50, description 145.
  LONG_ALSO: new -> [dasp-rejected, claim-super-without-mygov, dasp-documents-and-timing]; added to how-long-does-dasp-take,
  dasp-rejected, dasp-or-leave-super, tax-on-super-withdrawal (r10 P2-C); hub related after claim-super-without-mygov.
- r09 P2-D: what-happens-to-unclaimed-super -> claim-super-without-mygov (LONG_ALSO).
- r10 P2-C: what-is-the-ato -> mygov-sms-code guide.
- r09 P2-D / r10 P1-C: zh/vi lodging-tax-return-after-going-home: mirror of the EN round 1 myGov sentence (Digital ID,
  passkey, app, new account; DASP lists no myGov sign in).
- Not built: r09 P2-A / r10 P3-A SVT myID guide (r10 holds it to December; myID facts thin for students), r10 P2-B TRS
  FAQ (TRS page not re-verified), r09 P2-C zh hub note (zh term already used in the zh DASP guides), r17 P1-7 visible
  crumb (not an r08 to r10 item).

## (5) Qualifying earnings (r16 W5, G3)
- "12% of (your) ordinary (time) earnings/wages" -> "12% of (your) qualifying earnings" in services-en FAQ (with a
  definition clause) and long/en batch-01, 03, 05, 06, 09, 10, 11; batch-03 and batch-05 explanatory sentences reworded.
- zh: 普通收入/普通工资/正常收入/正常工时收入/普通工时收入 (12% base) -> 合格收入（qualifying earnings）, same batches + services-zh.
- vi: thu nhập thông thường / thu nhập (giờ làm) thông thường (ordinary time earnings) -> thu nhập tính super
  (qualifying earnings) (term already used in vi batch-02), same batches + services-vi.

## Verify
- npx tsc --noEmit -p . : only error is src/app/(es)/es/blog/data.ts missing './chunks/21' (another agent, in progress).
- jest src/lib/svt + launch-gate + wht-copy-compliance + new-locales-sitemap: 731 pass, 1 fail
  ("every /es allowlisted route has a page file", ES agent's files). Other suites importing SVT content: 201 pass.
- Dash grep (U+2012 to U+2015, U+2E3A/B, "——") over src/lib/svt/content: 0. Rule grep (Code Generator, linking code,
  backpacker, Working Holiday Tax, 会计, 税务师, 我们报税, kế toán, chúng tôi nộp): 0 in changed files.
- Related lists checked with longToGuide(): all <= 6, new guide reachable from 6 pages + hub + blog.
