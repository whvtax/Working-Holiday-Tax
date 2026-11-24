# r01-en-tax-return: WHT English /tax-return and the refund guides that feed it

Scope: /tax-return (src/app/(site)/tax-return/page.tsx, 638 lines as of v69 base20) and the EN refund guides in
src/app/(site)/blog/data.ts: tax-back-australia-working-holiday (line 9318), average-tax-refund-working-holiday (9379),
past-years-tax-returns-working-holiday (7767), late-tax-return-penalty-working-holiday (7703),
how-to-lodge-tax-return-from-overseas (1464), plus how-long-does-tax-refund-take-australia (3698) and
how-to-lodge-tax-return-working-holiday (1195), because they carry the same intent.
Data: S/gsc24/wht (3 months to 21 Nov), wht-1102, wht-1021, Bing AI CSVs. SERPs: 15 WebSearch queries on 24 Nov
(US based tool, a rough proxy for Google AU; our domain is under-represented in that index, see a16 F1). The tool's
search budget ran out after these 15, so a few facts below rely on ATO pages fetched today and on ATO pages already
cited in existing guides (marked).
Read before proposing: current page and guides after Phase 1 (docs/SEO_AI_PHASE1_V68_2026-11-24.md, plan2/impl-en.md).

## 1. Findings

### F1. /tax-return is not moving; the queries are, slowly (fact)
- Page rows (Pages.csv): wht-1021 `/tax-return,13,1200,1.08%,30.84`; wht-1102 `12,1079,1.11%,31.44`; now `7,760,0.92%,30.15`.
- Core cluster (queries with working holiday / whv / backpacker / 417 / 462 plus return / refund / tax back, super and TFN
  excluded), impression weighted position: wht-1021 644 impr @31.6; wht-1102 661 @28.9; now 589 @24.2, 18 clicks.
- Top rows now: `working holiday visa tax return,0,129,0%,27.17`; `working holiday tax return,5,72,6.94%,17.58`;
  `working holiday visa tax refund,0,59,0%,24.14`; `australian working holiday tax return,0,35,0%,54.6`;
  `tax refund australia working holiday visa,0,30,0%,16.57`; `tax return australia working holiday visa,0,30,0%,19.3`;
  `tax back australia working holiday visa,1,27,3.7%,12.67`; `tax refund for backpackers,0,23,0%,21.48`;
  `working holiday tax refund,2,22,9.09%,23.18`; `backpacker tax return,0,16,0%,30.31`; `whv tax return calculator,4,13,30.77%,7.23`.
- Inference: query positions (17 to 24) are better than the page average (30), so another URL (most likely the homepage,
  title "Working Holiday Tax Australia | WHV Tax Return & Refund", frozen) takes part of the cluster. a02 R2 asked Jo to
  confirm in GSC (filter query, Pages tab); still unconfirmed. Homepage title cannot change before 7 Dec.

### F2. Late / past-years intent grew 8x since October (fact)
- Late cluster: wht-1021 42 impr @17.8; wht-1102 119 @15.0; now 343 @20.7, 0 clicks. Rows: `lodge late tax return,0,28,22.54`;
  `overdue tax returns,0,27,19.15`; `late tax return,0,25,24.32`; `lodging tax return late,0,24,19.29`;
  `overdue tax return,0,24,21.17`; `late tax return australia,0,21,29.29`; `tax return late fee,0,13,17.92`;
  `penalty for late tax return,0,12,25.42`.
- Pages: `/blog/late-tax-return-penalty-working-holiday,6,672,0.89%,14.45`; past-years guide not in Pages.csv yet (dated
  5 Nov, indexing requested 24 Nov).
- SERP (search 6 and 9): H&R Block (3 URLs), ITP, Lawpath (5 paginated URLs, business focus), etax, finder, moneymag, SBS,
  ATO media. These are generic Australian late-lodger pages; none is written for someone who has left Australia.

### F3. Overseas / leaving / timing intent is small but problem-shaped (fact)
- Overseas and leaving: 75 impr @34.9 (`australian tax return from overseas,0,19,45.32`; `tax refund leaving australia,0,9,30.56`;
  `tax return when leaving australia permanently,1,7,28.57`). Timing: 80 impr @28.8 (`tax refund timeline 2026,0,11`;
  `how long does it take for tax refund to arrive,0,8`). Guides: `/blog/how-to-lodge-tax-return-from-overseas,1,168,0.6%,12.24`;
  `/blog/how-long-does-tax-refund-take-australia,4,2756,0.15%,12.97` (big impressions, very low CTR, title frozen).
- SERPs: "australian tax return from overseas" = ATO "lodge from outside Australia" + Wise + etax. "tax return when leaving
  Australia permanently" = ATO pages + 5 community.ato.gov.au threads. "lodge tax return without myGov overseas" = ATO + 10
  community threads + Wise. "tax refund Australia closed bank account left Australia" = ATO "missing tax return refunds" +
  9 community threads + university pages. Inference: exactly the weak, thread-only SERPs Jo described; no commercial page
  answers them.

### F4. Head-term SERPs (fact, searches 1 to 5, 11)
- "working holiday visa tax return" and "working holiday tax return": almost only ATO myTax "working holiday maker"
  instruction pages (2021 to 2026 versions) plus goabroad. Intent Google reads: how do I fill in the WHM part of the return.
- "working holiday visa tax refund", "backpacker tax return", "tax back Australia WHV", "tax refund for backpackers":
  Taxback (5 to 8 URLs each), backpackerjobboard /claim-tax-back, goabroad, hostelworld, etax, oneclicklife, ITP,
  austaxai, londonerinsydney ("The average backpacker tax refund is $2600").
- What the competitors are (WebFetch): goabroad, about 1,700 words, 15 FAQ, no tables, written by a Taxback employee,
  updated Apr 2026, recommends Taxback. backpackerjobboard /claim-tax-back, about 600 words, one rate table, and it still
  shows 32.5% (outdated) and a 2025 refund form. Inference: /tax-return (about 3,000 words, 15 FAQ, sourced key figures
  table) already beats them on depth. The gap is (a) the WHM-myTax informational intent that the ATO owns, (b) problem
  questions no one answers well, (c) internal link weight inside the refund cluster, (d) brand authority, which we cannot
  fix on page.

### F5. Bing AI grounding queries for refunds point at /tax-return and the tax-back guide (fact)
- Grounding queries: `how to get a tax refund if i am on a working holiday visa,110 citations,19.23%`;
  `tax back from working holiday,84,29.68%`; `tax return for working holiday,74,22.49%`; `tax back for working holiday,49,32.24%`.
- Page citations: `/blog/tax-return-without-tfn-australia,102`; `/tax-return,81`; `early-tax-return-leaving-australia,6`.
  Phase 1 already added the step-by-step H2 to /tax-return and to the tax-back guide.

### F6. The refund guides barely link to each other (fact, link count script on data.ts)
- tax-back-australia-working-holiday: 1 link to another guide (late penalty). average-tax-refund: 1 (TFN declaration).
  what-is-a-tax-refund-australia: 2. how-long-does-tax-refund-take: 2. trs-tourist-refund-scheme (1,250 impr @13.09): 0 guide
  links. None of the five refund guides links average, tax-back or what-is-a-tax-refund to each other.
- /tax-return GUIDES list (line 290) has 8 entries but not past-years, average-tax-refund, tax-back, early-tax-return or
  what-is-a-tax-refund. Past-years is linked only in body copy.
- Anchors into /tax-return from guides: 100x "working holiday tax return", 51x "tax return", 1x "working holiday visa tax
  return". Healthy; no change needed.

### F7. Factual inconsistencies in the refund guides (fact)
- "about 12 business days" appears 8 times (data.ts lines 1244, 1501, 3681, 3702 description, 3703 seoTitle, 3708, 3712,
  3747); /tax-return says 10. ATO today: "Most returns lodged online process within 10 business days"
  (ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return, modified 14 Jun 2026) and
  "Manual processing for online lodgments generally takes up to 30 calendar days" (.../check-the-progress-of-your-tax-return/status-of-your-tax-return,
  last updated 3 Nov 2026). The tax-back guide line 9363 also says "about 12 business days". The how-long seoTitle and
  description carry the wrong figure; IMPL_RULES allows a title fix for a factual error.
- how-to-lodge-tax-return-from-overseas line 1495: "A return lodged ... under a registered tax agent generally falls under a
  concessional date well into the following year, so an October deadline missed from another continent is rarely the
  problem it appears." Misleading: the agent program applies only if you were on the agent's list before 31 October
  (stated correctly in the late penalty guide line 7718 and the deadline guide line 7871).
- how-to-lodge-tax-return-working-holiday line 1220 (a DIY guide) says "so we can review the levy as part of your return":
  reads oddly in a lodge-it-yourself list (wording, not a rule breach).

### F8. Facts verified today for the proposals (fact, URL and page date)
- Refunds only into accounts in Australia: "We'll only pay tax refunds into recognised financial institution accounts
  located in Australia." "If you don't provide your financial institution details, you may be unable to lodge your tax
  return online using myTax." ato.gov.au/.../mytax-instructions/supporting-documents-for-my-tax/financial-institution-details (19 May 2026).
- Refund paid to a closed account: "your refund will be returned to us by the Reserve Bank of Australia. This can take up to
  10 days."; "If there are no updated bank account details, we'll re-issue your refund by cheque."; "From January 2025 we
  have started holding some cheque refunds for up to 90 days while we ask for bank details."; "You should update your bank
  details so we can re-issue the refund to your current account." ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds (27 Apr 2026).
- From outside Australia: myTax needs "a myGov account with an active link to the ATO"; other routes are a registered tax
  agent or a paper return; "have an Australian bank account you can use to receive any refund amounts"; deadline is the
  normal 1 July to 31 October period, agents may offer a later date. ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia (24 Apr 2026).
- Early return: paper form only, "Processing for early lodgments is 50 business days." .../lodge-your-tax-return-before-leaving-australia (15 Jun 2026).
- myGov abroad: the myGov help page says people who sign in with the myGov app, a passkey, a Digital ID or secret questions
  need no account changes before travel; SMS codes need planning. my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas (24 Jan 2025).
- myTax WHM section 2025-26: "Complete this section if at any time during 2025-26 you earned income while in Australia on a
  subclass 417 or 462 visa"; WHM net income is "the income you earned from an Australian source while you were on a 417 or
  462 working holiday visa" less related deductions; myTax "may have populated Yes if all your income is at Salary, wages,
  allowances, tips, bonuses"; wages show income type "H" at income statements; residents who are nationals of Chile,
  Finland, Germany, Israel, Japan, Norway, Turkey or the United Kingdom pay resident rates.
  ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/2026/adjustments/working-holiday-maker (published 1 Jun 2026).
- Not re-fetched today (search budget), already cited in live copy and verified in Phase 1: prior year routes (myTax 2016+),
  failure to lodge penalty, penalty unit $364 (ATO URLs in past-years guide lines 7780, 7819, 7821).

## 2. Proposals

### P1-A. /tax-return: new section "Locked out of myGov, or your Australian number has gone?" (problem first, Jo's idea)
File: src/app/(site)/tax-return/page.tsx. Insert a new `<Section>` directly after the `missed-deadline` section (line 487),
before key figures. id `mygov-problems`, eyebrow "No myGov needed", tone default.
Ready text:
- H2: "Can I get my tax refund without myGov?"
- P1: "Yes. myGov is only needed if you lodge the return yourself in myTax. The ATO also accepts a return lodged through a
  registered tax agent or on paper, and both work from outside Australia."
- P2: "That matters if you have gone home and the SMS code still goes to an Australian number you no longer have, if you are
  locked out after too many attempts, if the ATO link in myGov keeps failing, or if the identity check will not accept a
  foreign passport. None of these changes what you are owed. They only block one way of lodging."
- P3: "With us you do not need myGov at all. We deal with the ATO directly, you read and sign the return on your phone, and
  it is reviewed and signed off by a registered tax agent before it is lodged with the ATO. What you still need is an
  Australian bank account for the refund, because the ATO only pays refunds into accounts located in Australia."
- Small source line: "Source: ATO, lodge your tax return from outside Australia (24 April 2026), and financial institution
  details (19 May 2026), checked November 2026." with the two URLs from F8.
- Button: `waUrl({ topic: 'tax-return', lang: 'en', detail: 'cannot get into myGov' })`, label "Message us on WhatsApp".
- If the myGov guides proposed in another plan3 report go live, add one line under P2 linking each problem to its guide.
Why: the "without myGov" and "after leaving" SERPs are ATO + community threads only (F3); this puts the money page itself
on the problem query and converts it. Do not mention passwords beyond the existing "we never ask" notice.

### P1-B. /tax-return: new section "Your Australian bank account is closed" plus FAQ
Same file, insert after P1-A. id `bank-closed`, tone pale, eyebrow "Refund problems".
- H2: "What happens to my tax refund if my Australian bank account is closed?"
- P1: "The ATO only pays tax refunds into accounts located in Australia, so an overseas account cannot receive it. If a
  refund is paid into an account that has already been closed, the Reserve Bank returns it to the ATO, which the ATO says
  can take up to 10 days, and the refund is then re-issued to updated bank details or, if there are none, by cheque."
- P2: "The ATO also says it may hold some cheque refunds for up to 90 days while it asks for bank details. So the simplest
  order is: keep one Australian account open until the refund has landed, and if yours is already closed, tell us in the
  first message so the bank details are settled before anything is lodged."
- Source line: ATO missing tax return refunds (27 April 2026) and financial institution details (19 May 2026), URLs F8.
- Link: "The full answer, step by step: [your tax refund with a closed Australian bank account](/blog/tax-refund-australian-bank-account-closed)" (new guide P1-D).
- Keep RULES card 1 (line 201) as is; this section replaces nothing.
Add 2 FAQs to FAQS (line 212), schema follows automatically:
- Q "Can I get my tax refund without myGov?" A "Yes. myGov is only needed to lodge it yourself in myTax. A return can also
  be lodged through a registered tax agent or on paper, from Australia or from overseas. With us you never log in to
  myGov: we deal with the ATO directly, and the return is reviewed and signed off by a registered tax agent before it is
  lodged with the ATO."
- Q "My Australian bank account is closed. Can I still get my refund?" A "Often, yes, but not into an overseas account. The
  ATO only pays refunds into accounts located in Australia. If a refund goes to a closed account it comes back to the ATO
  and is re-issued to updated bank details or by cheque.\n\nTell us at the start, so the bank details are sorted before the
  return is lodged rather than after."

### P1-C. /tax-return: table "Your working holiday dates and the returns they need"
Same file, inside the `missed-deadline` section, after line 475 (below the existing two paragraphs, before the links).
Reuse `cellStyle`, `<table>` with caption, like KEY_FIGURES. Ready content:
Caption: "One return per financial year (1 July to 30 June). Due 31 October after the year ends if you lodge yourself; a late
return can still be lodged. Checked against ato.gov.au, November 2026."
| You worked | Returns needed | Due if you lodge yourself | Can it still be lodged? |
|---|---|---|---|
| November 2025 to May 2026 | 1: 2025-26 | 31 October 2026 | Yes, now late |
| March 2025 to February 2026 | 2: 2024-25 and 2025-26 | 31 October 2025 and 31 October 2026 | Yes, both late |
| March to September 2026 | 2: 2025-26 and 2026-27 | 31 October 2026 and 31 October 2027 | 2025-26 now late; 2026-27 from 1 July 2027 |
| A working holiday in 2019 to 2021 | 1 per financial year touched | Each 31 October after its year | Yes, myTax takes 2016 and later years |
Facts: rows 1 and 3 are the examples in tax-return-deadline guide (line 7863-7864); row 2 is the existing FAQ (line 226);
myTax 2016+ from ATO lodge a prior year tax return (already cited on the page, line 484). Why: a quotable table for "late",
"previous years", "which year" queries (F2) and for AI answers; nothing like it on the competing pages (F4).

### P1-D. New guide: tax-refund-australian-bank-account-closed
File: src/app/(site)/blog/data.ts, category "Tax Return", date "December 2026 go-live date", readTime 4.
- slug: tax-refund-australian-bank-account-closed (no clash: grep of src, next.config.js, llms.txt)
- title (48): "Tax refund with a closed Australian bank account"
- description (149): "The ATO only pays refunds into Australian accounts. What happens if yours is closed, how a refund comes back,
  and what to do before or after you leave Australia."
- Opening: "The ATO only pays tax refunds into accounts located in Australia, so a closed Australian account or an overseas
  account cannot receive one. If a refund is paid into an account that has already been closed, it is returned to the
  ATO and re-issued to updated bank details or by cheque. The easiest fix is to keep one Australian account open until
  your refund has landed."
- H2 "Can the ATO pay my tax refund into an overseas bank account?" A: No. Quote the ATO line (financial institution details,
  F8). Superannuation is different: a DASP can be paid overseas if the fund offers it (link /superannuation).
- H2 "What happens if the refund goes to an account that is already closed?" A: RBA returns it to the ATO, up to 10 days;
  re-issued to updated details, otherwise by cheque; some cheque refunds held up to 90 days while the ATO asks for bank
  details (missing tax return refunds, F8).
- H2 "Can I lodge online without Australian bank details?" A: the ATO says that without financial institution details you may
  be unable to lodge online with myTax, and lists other lodgement options (F8 URLs).
- H2 "What should I do before I close my account and leave?" A: list: keep one account open with low fees until the notice
  of assessment and refund have arrived; check the BSB and account number on the return; keep online banking access that
  works from overseas (inference, phrased as advice, no fact claim); note super is separate.
- H2 "My account is already closed. What now?" A: say so before lodging; the return can still be lodged; the refund is
  re-issued once bank details are updated (ATO). Do not claim we can open accounts or receive refunds for the client.
- Internal links: /tax-return (anchor "working holiday tax return", and #bank-closed), /superannuation,
  /blog/how-to-lodge-tax-return-from-overseas, /blog/how-long-does-tax-refund-take-australia,
  /blog/opening-bank-account-australia-working-holiday, /blog/transferring-money-overseas-australia-tax.
- Closing CTA: "Already home and not sure where your refund would go? Message us on WhatsApp with roughly where and when you
  worked. We deal with the ATO directly, and the return is reviewed and signed off by a registered tax agent before it is
  lodged with the ATO."
- Inbound links: add one sentence each in how-to-lodge-tax-return-from-overseas (after line 1491 "The bank account is the
  irreplaceable item...") "What happens if it is already closed: [tax refund with a closed Australian bank account](...)",
  and in how-long-does-tax-refund-take-australia under "Why does an incorrect bank account cause so much trouble?".
Why: SERP is ATO + 9 community threads (F3), every leaving WHM hits it, and it ends in our service.

### P1-E. Fix the processing time and the agent-deadline error (F7)
- data.ts lines 1244, 1501, 3681, 3708, 3712, 3747, 9363: "about 12 business days" -> "within about 10 business days" with
  the ATO wording "The ATO says most returns lodged online process within 10 business days, and manual processing generally
  takes up to 30 calendar days." Source: status-of-your-tax-return (3 Nov 2026). Line 9363 is in the frozen tax-back guide
  but below its opening: allowed (factual fix, not the opening).
- how-long guide description and seoTitle (3702, 3703): factual error, so allowed under IMPL_RULES: seoTitle "How long does a
  tax refund take in Australia? About 10 business days" (55); description: "The ATO says most online returns process within
  10 business days; manual processing can take up to 30 days. What stalls a refund and why." (150). Flag to Jo as a forced
  title change inside the measurement window; keep the rest of the guide.
- Line 1501 paper/50 days claims: "Paper can take up to 50 business days" (line 3702/3708) is verified only for early
  lodgments (F8); reword to "an early paper return takes 50 business days, the ATO says" or leave unchanged until checked.
- how-to-lodge-tax-return-from-overseas line 1495, replace the second sentence with: "A registered tax agent's lodgement
  program can allow a later date, but only if you were on that agent's client list before 31 October. A deadline already
  missed is not extended, although a late return can still be lodged, and the ATO generally does not issue a failure to
  lodge penalty when a late return results in a refund or nil result." (ATO failure-to-lodge URL already in line 7732.)

### P1-F. Refund cluster link mesh (F6)
All in data.ts, one sentence each, below openings (tax-back opening is frozen: add only lower down).
- tax-back-australia-working-holiday, end of "How much should you expect?" (after line 9357): "What makes a refund large or small
  is set out in [how much tax refund backpackers get](/blog/average-tax-refund-working-holiday)." End of "Can you claim for years
  you have already left?" (after 9369): "[Lodging past years' tax returns](/blog/past-years-tax-returns-working-holiday) covers how
  far back you can go." In "When and how do you lodge?" after the overseas sentence: "If your Australian account is closed:
  [tax refund with a closed Australian bank account](/blog/tax-refund-australian-bank-account-closed)."
- average-tax-refund-working-holiday: after line 9387 add the approved sentence "Refunds for our clients range from a few
  hundred dollars to several thousand." plus "[Tax back on a working holiday](/blog/tax-back-australia-working-holiday) walks
  through how the claim itself works." In "How do you get a realistic number?" link
  [what a tax refund actually is](/blog/what-is-a-tax-refund-australia).
- what-is-a-tax-refund-australia and how-long-does-tax-refund-take-australia: each link average and tax-back once.
- trs-tourist-refund-scheme-australia (1,250 impr @13.09, 0 guide links): one sentence after its opening: "The TRS refunds GST
  on goods you take home. It is not your income tax refund, which comes from lodging a [working holiday tax return](/tax-return);
  [tax back on a working holiday](/blog/tax-back-australia-working-holiday) explains the difference." (No new facts.)
- /tax-return GUIDES (line 290): add 3 rows, keep the 8: past-years ("Earlier years you never lodged", "How far back, and what
  the ATO needs for each year."), average-tax-refund ("How much backpackers get back", "What makes a refund large or small."),
  tax-refund-australian-bank-account-closed ("A closed Australian bank account", "Where the refund goes, and how to fix it.").

### P2-A. DIY guide: answer the WHM myTax intent the ATO owns (F4)
File: data.ts, how-to-lodge-tax-return-working-holiday, new H2 after "How do you lodge it yourself on myGov?" (after line 1234).
- H2: "How do you fill in the working holiday maker section of myTax?"
- Text: "It sits under adjustments, and the ATO says to complete it if at any time in the year you earned income in Australia
  on a 417 or 462 visa. Working holiday maker net income is the Australian income you earned while on that visa, less the
  deductions that relate to it. Wages earned on the visa show income type H on your income statement, and myTax may
  already have answered Yes if all your income is salary and wages."
- "Nationality changes the rates for some. If you were an Australian resident for tax purposes and a national of Chile,
  Finland, Germany, Israel, Japan, Norway, Turkey or the United Kingdom, the ATO says you pay resident rates. Whether you were
  a resident that year depends on its facts and is for the ATO to decide."
- Source line with the 2026 WHM myTax URL (F8). Then: "If you would rather not work through it, our
  [working holiday visa tax return](/tax-return) covers it."
- Also fix step 4 (line 1230) "Answer the residency questions, including that you held a 417 or 462 visa during the year" ->
  "Answer the residency questions, then the working holiday maker section under adjustments."
- On /tax-return add one sentence under "Two ways to lodge" (after line 554): "Lodging yourself, the part people get stuck on
  is the working holiday maker section of myTax: [how to fill it in](/blog/how-to-lodge-tax-return-working-holiday)."
Why: the two biggest queries (129 and 72 impr) show ATO WHM instruction pages; the guide (70 impr @23.66) can take that
informational slot and pass weight to /tax-return.

### P2-B. /tax-return: "What each withholding rate takes from $1,000 of pay" table
File: tax-return/page.tsx, inside "Backpacker tax refund explained" (after line 527, before the "None of these" paragraph).
| Withholding applied | Taken from $1,000 of pay | Why it happens |
|---|---|---|
| 15% | $150 | Employer registered for working holiday makers, TFN on file |
| 30% | $300 | Employer not registered for working holiday makers |
| 45% | $450 | No TFN on file and no declaration that one is on its way |
Caption: "Arithmetic on the rates only. It is not an estimate of any refund: what comes back depends on the whole year and is
settled when the return is assessed." Facts are the rates already on the page (KEY_FIGURES and REFUND_SOURCES, ATO).
Why: a quotable table on the "how much" question without naming any refund amount (rival londonerinsydney quotes "$2,600").

### P2-C. late-tax-return-penalty-working-holiday: catch the 343 impression late cluster (F2)
Not frozen. Add after the opening (line 7712), H2 "What should you do if your return is late?":
"1. Find out which years are open: income statements for each year are in ATO online services. 2. Lodge the oldest year
first, each year as its own return, online with myTax, through a registered tax agent or on paper. 3. Check an Australian
bank account is open for any refund. 4. If a year ends in a debt, look at payment plans before the due date on the notice."
Then: "Already left Australia, or locked out of myGov? You can still lodge: see [what we do for late and earlier
years](/tax-return#missed-deadline)." Facts from the ATO prior-year and outside-Australia pages (F8). Convert the
penalty list (lines 7724 to 7728) into a 3-column table (days late, units, amount at $364): same figures, more quotable.

### P2-D. Category hub anchor (F6)
src/app/(site)/blog/category/[slug]/page.tsx line 136: label "What we go through on every tax return" ->
"How a working holiday visa tax return works with us". /blog/category/tax-return ranks 10.88 on 342 impr, better than the
money page; give it the exact phrase as anchor. Not a title change.

### P3-A. New guide (coordinate with the myGov report): lodge-tax-return-without-mygov-working-holiday
Only if no other plan3 report proposes a myGov-and-tax-return guide (check slugs before building; keep one).
- title (49): "Tax return without myGov on a working holiday"
- description (152): "Lost your Australian number, locked out of myGov or can't link the ATO? How a working holiday tax return
  can still be lodged from overseas, and what you need instead."
- Opening: "You do not need myGov to get a working holiday tax refund. myGov is only needed to lodge the return yourself in
  myTax; the ATO also accepts returns lodged through a registered tax agent or on paper, from inside or outside Australia.
  What you do need is your tax file number and an Australian bank account for the refund."
- H2s: "Why does myGov stop working once you leave Australia?" (SMS to an old number; myGov help page on sign-in options
  that work overseas, F8); "Which ways of lodging do not need myGov?" (agent, paper; ATO outside-Australia page);
  "What do you still need without myGov?" (TFN, bank account in Australia, details of where you worked);
  "Is a paper return slower?" (only the early-return 50 business days figure is verified; say that, nothing more);
  "Can someone else lodge it for me?" (ATO: a power of attorney if a friend or family member signs on your behalf, F8).
- Links: /tax-return#mygov-problems, past-years, how-to-lodge-tax-return-from-overseas, bank-closed guide, /superannuation.
- CTA: "Message us on WhatsApp. We deal with the ATO directly, you never log in to myGov, and the return is reviewed and
  signed off by a registered tax agent before it is lodged with the ATO."

### P3-B. how-long-does-tax-refund-take-australia: status table
Add under "What does it mean when a return is under review?" a table of the ATO statuses (Processing, Balancing account,
Information pending, Under review, Issued) with the ATO's one-line meaning (status-of-your-tax-return, 3 Nov 2026), plus a
link to /tax-return. 2,756 impressions @12.97 with 0.15% CTR: a table may win the snippet; title stays.

## 3. Measurement (7 Dec and 28 days after go-live)
/tax-return page row (baseline 7 / 760 / 0.92% / 30.15); core cluster weighted position (24.2 on 589 impr); late cluster
(343 @20.7); `/blog/late-tax-return-penalty-working-holiday` (14.45); new guide rows; Bing grounding citations for /tax-return (81).

## 4. What NOT to do
- No changes to titles/descriptions of /tax-return, the homepage or the refund guides before 7 Dec, except the how-long
  seoTitle/description factual fix (P1-E), which Jo should approve knowingly. Do not touch the tax-back guide opening (frozen).
- No refund figures or averages (no "$2,600" style lines); the only size sentence is the approved range. The P2-B table is
  rate arithmetic with an explicit "not an estimate" caption; drop it if Jo reads it as an amount.
- Do not write "we lodge", "we are a tax agent", "we get your refund paid", "we can receive your refund". "We deal with the ATO
  directly" and the sign-off sentence only. No prices added (the fee line stays only where it already is).
- Do not promise the ATO will pay to a closed account or by cheque overseas: the ATO page says it re-issues by cheque but
  does not say where; keep the wording to what F8 quotes.
- Do not create separate pages for "tax refund timeline", "average refund" or "what is a tax refund": existing guides
  (how-long, average, what-is-a-tax-refund, tax-back) already split that intent four ways; link them, do not add a fifth.
- Do not add a second "past years" or "late tax return" guide: past-years and late-penalty exist; P1-C and P2-C strengthen
  them instead. Do not add a "lodge from overseas" guide: how-to-lodge-tax-return-from-overseas exists (/guides/ variant
  301s to it in next.config.js line 307).
- Do not change existing H2s (Phase 1 rule); all proposals add sections.
- No dashes in any added text; no mention of the other brand; no AI wording.
