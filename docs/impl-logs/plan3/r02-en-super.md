# r02 en-super: English /superannuation and English super/DASP guides (WHT)

Agent 02, 24 Nov 2026. Read only. Code: /home/claude/v68/base20. GSC: S/gsc24/wht (3 months to 21 Nov), wht-1021, wht-1105.
Note: the shared WebSearch budget ran out during this task; SERPs below come from 7 searches plus 6 page fetches. Facts that
I could not verify on an official page are marked and kept out of the proposed text.

## 1. Findings

F1 (fact, GSC Pages). /superannuation: 41 clicks, 9,457 impressions, position 16.65. Trend over the overlapping exports:
22.0 (wht-1021) to 19.91 (wht-1105) to 16.65 (wht). It is moving the right way, slowly. Rows:
`/superannuation,26.0,8580.0,0.003,22.0` / `,36.0,9403.0,0.0038,19.91` / `,41,9457,0.43%,16.65`.

F2 (fact, GSC Queries). The big super rows all sit at 16 to 40 and do not move much between exports:
`claim superannuation,0,348,0%,38.41` (was 37.67), `superannuation claim,0,315,0%,23.13`,
`super tax working holiday maker,0,311,0%,16.53`, `superannuation working holiday visa,0,301,0%,26.71` (was 28.77),
`claim superannuation australia,0,292,0%,20.47`, `417 visa super claim,0,287,0%,25.41`, `superannuation working holiday,0,270,0%,32.22`,
`how to claim superannuation,0,192,0%,50.69`, `working holiday superannuation,0,140,0%,28.49`, `superannuation backpacker,0,112,0%,34.69`,
`how do i claim my superannuation when i leave australia,0,100,0%,40.36`, `superannuation refund,0,75,0%,37.09`.
Where we already rank on page 1: `dasp,1,288,0.35%,7.44`, `ato dasp,0,89,0%,5.38`, `how long does dasp payment take,0,90,0%,6.78`,
`dasp processing time,0,40,0%,9.2`, `why is dasp tax so high,0,19,0%,8`, `dasp tax rate,0,10,0%,8.7`.
Inference: we win the specific DASP questions (guides at 5.8 to 10) and lose the generic "claim super" head terms.

F3 (fact, SERPs 24 Nov). "claim superannuation working holiday visa 417" and "how do i claim my superannuation when i leave
australia": ATO pages (5 to 8 URLs of the same DASP page), then the super funds' own DASP pages (AustralianSuper PDF, Aware,
Rest, ART, HESTA, QSuper), canstar, PALM scheme PDFs. "super refund backpacker DASP": canstar plus ATO only.
"super tax working holiday maker 65% DASP": ATO FAQ plus about 14 community.ato.gov.au threads.
Problem searches ("DASP online application visa still active can't submit", "DASP ATO held super closed Australian bank
account", "DASP claim without myGov TFN unknown fund not found"): community.ato.gov.au threads and ATO help pages only,
no commercial site and no guide. Same pattern as the TFN and myGov wins in BRIEF.md.
Inference: generic "claim superannuation" is a fund and ATO SERP (the funds hold the money and rank on authority). We cannot
outrank the ATO there; we can reach the lower half of page 1 for the WHV-qualified versions ("417 visa super claim",
"superannuation working holiday visa") and own the problem queries outright.

F4 (fact, fetch). What the ranking non-ATO pages look like:
- Rest, "Earning super on a working holiday or temporary visa" (https://rest.com.au/super/learn/employment/working-holiday-or-temporary-visa):
  about 1,300 words, 12 question H2s covering the whole lifecycle: do WHMs get super, how much, check it is paid, leaving,
  DASP, tax. It never states 65%.
- ART DASP page (https://australianretirementtrust.com.au/superannuation/early-access/dasp): about 280 words, H1 "Claim
  superannuation when leaving Australia", accepts Australian or international bank accounts, "We aim to pay you within
  20 days of receiving your form and documents from the ATO."
- backpackerjobboard /super-refund (https://www.backpackerjobboard.com.au/super-refund/): about 230 words plus a calculator
  and "Apply online"; it says 35% tax (wrong for WHMs). Thin; ranks on domain strength.
Inference: depth is not our gap (our page is about 2,500 words with a 65% table, 6 steps, 12 FAQs). Our gaps are (a) the
"do WHMs get super at all" half of the WHV intent, which Rest covers and we answer only in one sentence, (b) no answer to the
myGov / online system problems that the SERPs leave to community threads, (c) weak link flow from our biggest pages.

F5 (fact, code). Link flow. data.ts has 79 links to /superannuation, but the three EN guides with the most impressions have
none: how-long-does-it-take-to-get-a-tfn (0 links; 24,037 impressions), casual-shift-cancellation-rules-australia (0 links;
18,779 impressions at 6.15), countries-with-medicare-agreement-australia (0). Anchors are mostly "super" (14) and "claim
your superannuation after leaving Australia" (12); "417", "462" or "working holiday visa" appear in no anchor to /superannuation.

F6 (fact, code). Most "missing" guides in the task already exist and rank:
how-long-does-dasp-take (1,905 impr, 6.38; Bing AI 60 citations), dasp-tax-rate-65-percent-explained (867, 10.15, has the
$5,000 / $10,000 / $20,000 worked example), dasp-rejected-what-to-do (963, 5.8), dasp-documents-required, what-happens-to-unclaimed-super,
tax-on-super-withdrawal-backpacker, dasp-vs-leaving-super-in-australia-pros-cons (1,348 at 23.78), how-to-find-lost-superannuation
(875 at 36.32), super-for-casual-and-part-time-workers (979 at 23.8). The step by step guides were deliberately merged:
next.config.js lines 298 to 300 redirect best-way-to-claim-super-leaving-australia, how-to-apply-for-super-back and
what-is-dasp-super-withdrawal to /superannuation.
So a new "DASP step by step", "65% worked example" or "how long DASP takes" guide would cannibalise. Not proposed.

F7 (fact, ATO). What the ATO's DASP online system needs and where it breaks, from
https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
(last updated 11 Oct 2024):
- Needs name, date of birth, personal details, email, passport country and number, fund details including the fund's ABN.
  TFN optional: "If you don't provide your TFN, you'll need to provide the details of your super accounts."
- Lost TFN: phone the ATO (verification needed) or the TFN application form for individuals living outside Australia.
- Fund not found: "Add application" and start it with the ABN of the fund; find the ABN in the system's search, on Super
  Fund Lookup or from the fund.
- Re-entry uses a shared secret question and answer you create; three chances; forgotten answer means phoning the ATO.
- "Make sure you enter the same details exactly as they appear on your passport"; different passport details let you create a
  new application but not view existing ones.
- "you won't be able to submit your DASP application if your temporary resident visa is still active"; check with VEVO; if the
  visa information shown is wrong, do not submit and email DASPmail@ato.gov.au.
- Statuses: submitted, rejected, new application, not to be forwarded, transferred. The system cannot show whether the fund
  has processed it; ask the fund. Changes after submitting go through the fund.
- ATO-held super shows as "Payment of unclaimed superannuation money", "Superannuation guarantee" or "Superannuation holding
  accounts reserve" instead of a fund name.
- Phone: 13 10 20 (8 am to 6 pm Mon to Fri) in Australia; +61 2 6216 1111 from overseas (8 am to 5 pm AEST/AEDT) then ask for 13 10 20.
Inference, not stated by the ATO in these words: the DASP online application is not a myGov service (the ATO's list of what it
needs has no myGov sign in, and it runs on its own address, https://applicant.tr.super.ato.gov.au). Implementer must open that
address once and confirm there is no myGov sign in before publishing the sentence "You do not sign in with myGov".

F8 (fact, ATO DASP page, https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp,
last updated 21 Apr 2026): online application free; paper NAT 7204 to the fund, NAT 74880 for ATO-held super; start and save
before leaving; submit only once you have left and do not hold an active visa; certified ID may be asked at $5,000 or more;
generally paid within 28 days of a completed application; fund pays by Australian EFT, AUD cheque or IMT (not all funds);
ATO-held super by EFT to an Australian account in your name or by cheque, no IMT; do not include a DASP in your tax return;
WHM rate 65% applies "if the DASP includes contributions made while you held a 417 or 462 visa", and then to the whole payment.
APRA FAQ (https://ato.gov.au/super/apra-regulated-funds/in-detail/apra-resources/questions-and-answers/dasp-and-working-holiday-makers-changes---frequently-asked-questions):
"The law does not allow for apportionment."

F9 (fact, ATO employer course, https://www.ato.gov.au/businesses-and-organisations/super-for-employers/quarterly-super-to-30-june-2026/super-guarantee-employer-obligations-online-course/module-2-working-out-if-you-have-to-pay-super,
last updated 29 Apr 2026): SG must be paid for employees who work "full time, part time or on a casual basis" and for an employee who
"is a temporary resident", "regardless of how much they get paid" since 1 July 2022 (under 18s: more than 30 hours a week).

F10 (fact, code, precision issue). /superannuation line 172 and line 399 say the 65% rate applies to "anyone who has ever held a
subclass 417 or 462 visa, even if you later moved to a different visa". The ATO test is whether the DASP includes contributions
made while you held a 417 or 462 visa (F8). Someone who held a 417 but earned no super on it is outside the 65% rule. Not a title
or description, so it may be corrected.

F11 (fact, code). Unverified claims in dasp-rejected-what-to-do (data.ts about lines 6621 to 6640): "movement record ...
typically updates within 7 to 14 days", "Visa cessation records update the day after expiry", "If more than 30 days have
passed ... raising with Home Affairs, which is part of what we handle". I found no official source for the day counts.

F12 (fact). /superannuation shows no visible "last updated" date (only dateModified 2026-11-05 in the speakable JSON-LD);
/tax-return shows one. The EN /superannuation gets no Bing AI citations at all, while ja/superannuation gets 18 and
how-long-does-dasp-take 60 (S/gsc24/bing AIPageStats).

## 2. Proposals

### P1-1 /superannuation: answer the myGov question and link the new problem guides
File: src/app/(site)/superannuation/page.tsx. Insert a new `<Answer>` directly after the `how-to-claim` section (before
`key-figures`). H1, title, description untouched.

```
<Answer id="no-mygov" heading="Do you need myGov to claim your super?" tone="pale">
  <p>No. The ATO's DASP online application is separate from myGov. You identify yourself with your name, date of birth,
  passport details and an email address, and you set your own secret question to get back into a saved application.
  Your tax file number is optional: with it the system can look up your accounts, without it you enter each fund's
  details yourself.</p>
  <p>So an old Australian mobile number, a locked myGov account or an ATO link you never set up does not stop a super
  claim. What does stop one is a visa that still shows as active, passport details typed differently from last time, or
  a fund the system cannot find. Each of those has a fix, set out in
  <Link href="/blog/dasp-online-application-problems">DASP online application problems</Link> and
  <Link href="/blog/claim-super-without-mygov">claiming your super without myGov</Link>.</p>
  <p className={blocks.small}>Source: ATO, Help with the DASP online application system, checked November 2026.</p>
</Answer>
```
Sources: help page URL in F7 (requirements, TFN optional, shared secret, visa active). "Separate from myGov": F7 inference,
verify on https://applicant.tr.super.ato.gov.au first; if it cannot be confirmed, replace sentence 2 with "It asks for your
name, date of birth, passport details and an email address, not a myGov sign in." only after the same check, otherwise drop it.
Also add one FAQ to `faqs` (keeps FAQPage in sync with the visible accordion):
Q "Can I claim my super if I cannot get into myGov?"
A "Yes. The DASP online application asks for your passport details, an email address and your super fund details, and your tax file number is optional. If the system does not find a fund, you can add it using the fund's ABN, which you can look up on Super Fund Lookup."
Expected effect: answers the problem intent no competitor answers (F3); gives AI answers a quotable passage on our money page.

### P1-2 New guide: claim-super-without-mygov
File: src/app/(site)/blog/data.ts, new entry in category "Super" (slug checked: unused in all languages and in next.config.js).
- slug: claim-super-without-mygov
- title (46): Claim your super without myGov: the DASP route
- description (155): No myGov, no SMS code, no Australian number? A DASP claim does not need any of them. What the ATO's online application asks for and how to find your funds.
- Opening (answer first):
  You can claim your super without myGov. The ATO's DASP online application asks for your name, date of birth, passport
  details and an email address, and your tax file number is optional, so a locked myGov account or an old Australian phone
  number does not block the claim. What you do need is a visa that has ceased, to be outside Australia, and the details of
  each fund holding your super.
- H2 What does the DASP online application ask for?
  Your name, date of birth and other personal details, an email address, your passport country and number, and the details
  of each super account, including the fund's ABN. You can add your TFN, and with it the system can look for your accounts.
  Type your passport details exactly as they appear on the passport, because the same details are how the system recognises
  you when you come back. (ATO help page, F7)
- H2 Why does myGov not matter here?
  myGov is how you reach ATO online services such as your tax return and the super search. The DASP application is its own
  system: you get back into it with a secret question and answer you set the first time, not with an SMS code. If you have
  lost access to myGov after leaving, that problem can stay unsolved and the super claim can still go ahead. (F7; the
  "own system" sentence needs the F7 check)
- H2 How do you find your funds without myGov?
  Give the application your TFN and it can look for accounts held in your name. If it does not find a fund you know you had,
  choose "Add application" and start one with that fund's ABN, which you can find through the system's own search, on Super
  Fund Lookup, or by asking the fund. Super a fund has already passed to the ATO shows as "Payment of unclaimed superannuation
  money", "Superannuation guarantee" or "Superannuation holding accounts reserve" instead of a fund name. (F7)
- H2 What if you have lost your TFN as well?
  You can still apply, but you then need each fund's details yourself. To recover the number, the ATO offers a phone check
  with identity questions, or the TFN application for people living outside Australia. Our guide to
  [finding a lost TFN](/blog/how-to-find-lost-tfn) explains both. (F7)
- H2 Can you start before you leave Australia?
  Yes, and the ATO strongly recommends it. You can save the application in Australia and finish it after you have left, but
  you can only submit it once you are outside Australia and no longer hold an active visa. Certifying ID copies is also much
  easier while you are still here. (F8)
- H2 Who can you call if the system will not let you in?
  The ATO on 13 10 20 inside Australia, 8 am to 6 pm Monday to Friday, or +61 2 6216 1111 from overseas, 8 am to 5 pm
  Australian Eastern time, asking for 13 10 20. For a forgotten secret answer this is the only route. (F7)
- Internal links: /superannuation (anchor "claim super on a 417 or 462 visa"), /blog/dasp-online-application-problems,
  /blog/how-to-find-lost-superannuation, /blog/how-to-find-lost-tfn, /blog/dasp-documents-required, /tax-return (anchor
  "working holiday tax return", in the closing: the tax return is a separate claim).
- Closing CTA: "Message us on WhatsApp with where and roughly when you worked. We deal with the ATO directly, so you do not
  need myGov for your super claim or for your [working holiday tax return](/tax-return), which is reviewed and signed off by a
  registered tax agent before it is lodged with the ATO."
- readTime 4, date "24 November 2026". Add to GUIDES on /superannuation (label "Claiming your super without myGov").

### P1-3 New guide: dasp-online-application-problems
Same file, category "Super". Slug unused. Distinct from dasp-rejected-what-to-do (that one is after a fund rejects a submitted
claim; this one is before and during the online application). Cross link both ways.
- slug: dasp-online-application-problems
- title (52): DASP online application problems and how to fix them
- description (160): Visa still shows active, forgot your secret answer, cannot see a saved claim or the fund is missing. The common DASP online problems and the ATO's fix for each.
- Opening: Most DASP online problems are one of five things: a visa that is still active, a forgotten secret answer, passport
  details typed differently from last time, a fund the system does not list, or a status you cannot read. Each has a known fix,
  and none of them means your super is lost.
- H2 Why will it not let you submit?
  Because your temporary visa still shows as active. You can only submit once you have left Australia and no longer hold an
  active visa. Check your status in VEVO. If the visa information the application shows you is wrong, do not submit; email
  DASPmail@ato.gov.au instead. (F7, F8) Link: /superannuation#while-in-australia.
- H2 What if you forgot your secret answer?
  You get three tries. After that, or if you have forgotten it, phone the ATO: 13 10 20 in Australia or +61 2 6216 1111 from
  overseas, then ask for 13 10 20. (F7)
- H2 Why can you not see the application you saved?
  The system finds your earlier applications through the details you entered the first time. If your passport number or
  country is typed even slightly differently, you can start a new application but you will not see the old ones. A renewed
  passport is the usual cause. (F7; the renewed passport sentence is inference, label it "often" or drop it)
- H2 What if your fund is not on the list?
  Choose "Add application" and start one with the fund's ABN. The system's search, Super Fund Lookup or the fund itself will
  give you the ABN. Your payslips name the fund your employer paid into. (F7) Link: /blog/how-to-find-lost-superannuation.
- H2 What do the statuses mean?
  The ATO lists five: submitted, rejected, new application, not to be forwarded and transferred. The system cannot show whether
  your fund has processed the claim, so for progress, or to change something after submitting, contact the fund. The ATO's
  service standard is 28 days from a completed application. (F7) Links: /blog/how-long-does-dasp-take, /blog/dasp-rejected-what-to-do.
- H2 Why does the ATO say it will only pay into an Australian account?
  Because that part of your super is already held by the ATO, not a fund. The ATO pays it by transfer to an Australian bank
  account in your name or by cheque; it does not make international transfers. A fund can, if it offers them. Keep your
  Australian account open until every payment has landed. (F8) Link: /blog/what-happens-to-unclaimed-super.
- H2 Should you use the paper form instead?
  Only if the online route is blocked. For super in a fund, the paper form NAT 7204 goes to the fund; for super the ATO holds,
  NAT 74880 goes to the ATO. On paper, a fund may ask for certified ID where it holds $5,000 or more and for a Certification of
  Immigration Status from Home Affairs, which has a fee. Online, your immigration status is checked for you. (F8)
- Internal links: /superannuation (anchor "superannuation working holiday visa claim" or "claim your super on a working holiday
  visa"), /blog/claim-super-without-mygov, /blog/dasp-rejected-what-to-do, /blog/how-long-does-dasp-take,
  /blog/dasp-documents-required, /blog/what-happens-to-unclaimed-super.
- Closing CTA: "Stuck on a screen that will not move? Message us on WhatsApp with what it says. We deal with the ATO directly,
  and we check what each fund will ask for before you apply."
- readTime 5, date "24 November 2026". Add to GUIDES on /superannuation (label "DASP online application problems, fixed").

### P1-4 Link flow from the three biggest EN guides to /superannuation (add only, below the openings)
File: src/app/(site)/blog/data.ts.
- how-long-does-it-take-to-get-a-tfn (frozen opening; add at the end of the body, after the existing /tax-return sentence):
  "Your TFN also ties together the super every employer pays for you, which you [claim on a 417 or 462 visa](/superannuation)
  once you have left Australia."
- casual-shift-cancellation-rules-australia, section "What should you keep if you think you are owed money?", after the
  payslip paragraph:
  "Check the super line on the same payslip. Casual employees are owed super whatever they earn, and as a working holiday
  maker you [claim that super back after you leave Australia](/superannuation)."
  Source for "whatever they earn": ATO employer course (F9).
- countries-with-medicare-agreement-australia (frozen opening; add one closing line):
  "Medicare is one of three things to sort before you fly home, with your [tax return](/tax-return) and the
  [super you claim on a working holiday visa](/superannuation)."
Expected effect: link equity from 45,000+ impressions of pages ranking 6 to 8 into /superannuation, with WHV anchors (F5).

### P2-1 /superannuation: a short "Do working holiday makers get super?" section
File: superannuation/page.tsx. New `<Answer id="do-whm-get-super">` placed before `who-can-claim`. Targets
"superannuation working holiday visa" (301 at 26.71), "working holiday superannuation" (140 at 28.49), "superannuation
backpacker" (112 at 34.69), the half of the intent Rest's page wins (F4).
Text:
"Yes. Your employer has to pay super for you as a temporary resident, whether you work full time, part time or casual, and
however little you earn. It is 12% of your ordinary time earnings, paid on top of your wages into a super fund, and since
1 July 2026 most employers pay it each payday. You cannot take it out while you are in Australia; it becomes yours to claim as
a DASP once you have left and your visa has ceased. If it is missing from your payslips or your fund, see
[what to do if your employer is not paying super](/blog/super-employer-not-paying-what-to-do)."
Sources: F9 (temporary residents, casual, regardless of pay); 12% and Payday Super are already on the page's key figures
(ATO); preservation and DASP: F8. Also add the jump link "Do working holiday makers get super?" if the page has a jump nav.

### P2-2 /superannuation: precise 65% wording (F10)
- Line 172 FAQ answer, replace the first sentence with: "The 65% rate is set in law for super contributed while you held a
  subclass 417 or 462 visa. If any part of your payment comes from that time, 65% applies to the whole taxable component,
  because the law does not allow it to be split."
- Line 399, replace "The rate is fixed in law for anyone who has held a 417 or 462 visa, and no agent or waiting can reduce
  it." with "The rate is fixed in law for super contributed while you held a 417 or 462 visa, it applies to the whole taxable
  component, and no agent or waiting can reduce it."
Sources: F8 ATO DASP page and APRA FAQ ("The law does not allow for apportionment").

### P2-3 /superannuation: visible date and freshness
Add "Last updated 24 November 2026" under the hero (same component and wording pattern as /tax-return) and set speakable
`dateModified` to the deploy date. Effect: freshness signal for AI answers (F12). Effort S.

### P2-4 how-to-find-lost-superannuation (875 impressions at 36): add the overseas route
File: data.ts, add an H2 after "Where exactly do you search?":
"## How do you find lost super from overseas without myGov?
Through the DASP online application. Give it your TFN and it can look for accounts held in your name; if a fund you had is
missing, add it with the fund's ABN from Super Fund Lookup. Super already passed to the ATO appears under a heading such as
'Payment of unclaimed superannuation money' rather than a fund name. More in [claiming your super without myGov](/blog/claim-super-without-mygov)."
Source: F7.

### P2-5 Anchor diversification
In data.ts, change 5 of the 14 bare "[super](/superannuation)" anchors (pick those in WHV context sentences) to
"[claim super on a 417 or 462 visa](/superannuation)" or "[superannuation on a working holiday visa](/superannuation)".
No other change to those sentences.

### P2-6 how-long-does-dasp-take: one fund level fact
Add under "How long does the money take to arrive once it is paid?":
"Funds also set their own targets. Australian Retirement Trust, for example, says it aims to pay within 20 days of receiving
your form and documents from the ATO."
Source: https://australianretirementtrust.com.au/superannuation/early-access/dasp (fund's own process page). This guide is our
most AI-cited super page (60 Bing citations); a dated, named fact strengthens it. Do not touch its opening, title or description.

### P3-1 Verify or soften dasp-rejected-what-to-do (F11)
The "7 to 14 days", "the day after expiry" and "30 days ... part of what we handle" lines have no official source I could find.
Either source them (Home Affairs) or rewrite as "can take some days to update" and remove the service claim if Jo does not
actually raise movement records with Home Affairs. Jo to confirm the service point.

### P3-2 super-for-casual-and-part-time-workers (979 impressions at 23.8)
The casual queries ("do casuals get super" 89 at 21, "do casual employees get super" 88 at 28, about 700 impressions in all)
are general Australian intent, low value for WHT. Only add the ATO source line (F9) under the opening. No new page.

### P3-3 Later, not now: a visa cancellation guide
"Leaving before your visa expires: cancelling it to claim your super" fits the problem strategy, but I could not verify the
Home Affairs process on an official page (the ATO only links to Home Affairs, form page last updated 2020:
https://www.ato.gov.au/forms-and-instructions/departing-australia-super-payment-application/more-information). Research the
Home Affairs page first; do not publish process steps from memory.

## 3. What NOT to do
- Do not create "DASP step by step", "how to claim super when leaving", "what is DASP" or "how to apply for super back" guides:
  those slugs were merged into /superannuation by 301 (next.config.js 298 to 300) and the steps are its H2. Recreating them
  splits the page we want on page 1.
- Do not create a 65% worked example guide or a DASP timing guide: dasp-tax-rate-65-percent-explained and
  how-long-does-dasp-take already hold those queries at 6 to 10.
- Do not add a /super-refund page or a super refund calculator. A second money page cannibalises /superannuation, and a
  calculator shows amounts (rules: no refund amounts or promises beyond the existing illustrative 65% figures).
- Do not change the /superannuation H1, title, meta description or the openings of frozen guides (how-long-does-it-take-to-get-a-tfn,
  countries-with-medicare-agreement-australia, how-to-find-lost-tfn): P1-4 only adds lines below.
- Do not write "we lodge your DASP" or imply we are a tax agent. The ATO says tax agents can apply online for a client; that
  is not us. Keep "we prepare each application", "we deal with the ATO directly"; the sign-off sentence only for the tax return.
- Do not chase generic Australian queries with the money page ("find lost super", "check super balance", "does gross salary
  include super", "combining super funds"): resident intent, no DASP.
- Do not quote backpackerjobboard's 35% figure or any rival text; their rate is wrong for WHMs.
- Do not state "You do not sign in with myGov" until the applicant site has been checked (F7 inference).
- Do not use the ATO's 13 28 61 number in super text; the DASP help page gives 13 10 20 for super.
- Dash check: all proposed text above is free of em and en dashes; keep it that way when pasting.
