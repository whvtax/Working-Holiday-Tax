# A06 / A07 / A08: English content and editorial, marketing and conversion, advertising readiness

Audit of the Student Visa Tax (SVT) English surface at baseline d9dbac0. Read-only. Tax-law accuracy is A01's job; this report covers language, clarity, consistency, tone, claims, conversion and campaign readiness. Everything below is evidenced by file:line, a command output or a reading; anything not checked is marked NOT VERIFIED.

Severity scale: CRITICAL / HIGH / MEDIUM / LOW / INFO. "Unchanged OK?" is my honest answer to "is leaving it as is acceptable for launch?".

Method for the long articles: a parser extracted all 150 `LongArticle` entries from the 13 `batch-*.ts` files (150 parsed = 150 `slug:` occurrences, no duplicates), then automated passes ran over title, description, answer, body and FAQ (dashes, Americanisms, forbidden claims, AI filler, heading case, repeated sentences, cross-references, dates, meta lengths), and then every batch file was read in full by hand.

---

## Headline

- No CRITICAL findings in the English content. No em/en dashes, no "we are a registered tax agent", no AI/bot mention, no refund promise, no WHT brand leak in any English SVT text that was read.
- The English long-form library is unusually consistent and well edited for 150 articles. Findings are mostly LOW consistency and tone items, plus one time-bomb article (A06-2).
- The two items that matter most for launch sit in A07/A08: the WhatsApp number is still a placeholder (A08-1, documented, but every CTA on the site dead-ends until it is set) and the TPB "registered" seal alt text on the SVT footer and form reads as a claim that SVT is itself registered (A07-1).

---

## A06: English content and editorial (Australian English)

### Automated pass results (150 long articles + guides + blog)

| Check | Result |
|---|---|
| Em dash, en dash, horizontal bar, `--` | 0 occurrences in all 150 articles, guides-en, blog-en, home-en, i18n en, Contact en, SvtFormClosed, 404, llms.ts |
| Duplicate slugs | none; no slug shared between `BLOG_EN` and `LONG_EN` (both serve `/blog/[slug]`) |
| Title > 70 chars | 0 |
| Description outside 140-170 chars | 0 (guides/blog: 13 descriptions between 161 and 170, within tolerance) |
| "we are a registered tax agent" / "our tax agent" / "as your tax agent" | 0 |
| "guarantee(d)" | 59, all "super guarantee", "minimum wage guarantee" or "guaranteed income" in a scam warning; none about SVT |
| "AI", "bot", "chatbot", "automated" | 0 (6 hits on "assistant" are "education assistant") |
| Refund-promise patterns ("maximum refund", "you will get a refund", "no refund no fee") | 0 |
| WHT brand leak ("Working Holiday Tax", "whvtax", "backpacker") | 0 (417/462 is mentioned only as the DASP 65% rule and the "no 15% rate for students" point, which is correct and necessary) |
| Americanisms (-ize, color, license as noun, check, program, cell phone, etc.) | 0 real hits. "enrolled", "licensed" (verb), "program" (ATO/Fair Work usage), "apartment", "inquiry" are all acceptable Australian usage |
| AI filler ("delve", "navigate", "seamless", "peace of mind", "in conclusion", "unlock"...) | 8 hits: 6 x "The good news is", 1 x "Your peace of mind at tax time", 1 x "stress"-free style absent. See A06-6 |
| Headings not sentence case | 0 real hits (the 14 flagged are "Step 1: Find..." after a colon, or proper nouns: Tourist Refund Scheme, Horticulture Award, Medicare) |
| Body Markdown outside the allowed subset (links, HTML, ###, backticks) | 0 |
| Cross-references ("our guide on X", "our separate guide", "our rideshare guide") | 4, all targets exist (oshc-what-it-covers-international-students, chef-kitchen-hand-tax-deductions-students, rideshare-tax-deductions-students, tutor-childcare-tax-deductions-students). See A06-7 for the missing link |
| Years mentioned | 2025-26 x226, 2026 x110, 2026-27 x39, 2024-25 x4, 2027 x8, 2028 x1; older years only as legal start dates (28 April 2022, 1 July 2023, 1 Nov 2021, 2021-22) |

### Top repeated sentences across the 150 articles (distinct articles containing the exact sentence)

| n | Sentence |
|---|---|
| 24 | A student enrolled in a course of 6 months or more may be an Australian resident for tax purposes. |
| 7 | Keep everything for 5 years from the date you lodge. |
| 7 | Foreign residents pay 30% from the first dollar up to $135,000. |
| 6 | Visa holders have the same workplace rights as other employees. |
| 6 | From 1 July 2026, the national minimum wage is $26.44 an hour, and award minimum wages rose by 4.75%. |
| 6 | A student enrolled in a course of 6 months or more may be a resident. |
| 5 | You paid for it yourself and nobody paid you back. |
| 5 | The ATO says you should receive your TFN within 28 days from when it receives your completed application. |
| 5 | Fair Work says visa holders have the same workplace rights as all other employees. |
| 5 | Claim the tax-free threshold from one employer only. |
| 5 | Are you an Australian resident for tax purposes? |
| 5 | An employer should not ask you to get an ABN as a condition of a job. |
| 4 | You paid for it yourself and were not paid back. |
| 4 | The cents per kilometre method is for cars only. |
| 4 | Many students are not entitled to Medicare because they have OSHC. |
| 4 | If you may be an Australian resident for tax purposes, the tax-free threshold of $18,200 can apply. |
| 4 | If you lodge yourself, the usual deadline is 31 October. |
| 4 | From 2026-27, residents with wage income get a standard deduction of up to $1,000. |

52 sentences appear in 3 or more articles; only one appears in 10 or more. For a 150-article library built around the same five facts this is low. The repeated sentences are the fixed compliance wording (residency "may be") and the ATO's own phrasing; this is acceptable and arguably desirable. No whole paragraph is reused verbatim across articles. No finding beyond INFO.

### Findings

**A06-1 (MEDIUM) Footer and form TPB seal alt text reads as "SVT is TPB registered".**
Files: `src/lib/svt/i18n.ts:82` (`sealAlt: 'Tax Practitioners Board registered, Tax Agent Number {tpb}'`), rendered in `src/components/svt/Footer.tsx:32`; shared form `src/app/(site)/tax-form/FormClient.tsx:587-588` (`alt={\`${T('registeredAgentNo')} ${AGENT_TPB}\`}` with `src/lib/formStrings.ts:89` en = "Registered Tax Agent"), image `/svt-assets/img/tpb-registered.png` set in `src/components/svt/form-brand-svt.tsx:157`.
Evidence: the visible footer sentence correctly says "Operates under the supervision of a registered tax agent, {agent}, Tax Agent Number {tpb}" (i18n.ts:76), but the seal's accessible name and the form's alt say "Tax Practitioners Board registered, Tax Agent Number 26233096" / "Registered Tax Agent 26233096" with no subject. Screen readers, image search and anyone reading the alt will attribute the registration to Student Visa Tax. This is the English wording closest to the forbidden "we are a registered tax agent". (Whether SVT may display the TPB symbol at all is a TPB/legal question outside my scope; flagged to A01/legal.)
Smallest fix: `sealAlt: 'Tax Practitioners Board seal of the supervising registered tax agent, {agent}, Tax Agent Number {tpb}'` (and the same idea in zh/vi); on the shared form, give the SVT brand its own alt override or make `FormClient` use the brand's supervision sentence for the alt.
Verify: `npx jest` wording tests plus `document.querySelector('footer img').alt` on http://svt.localhost:3100.
Unchanged OK? No for the footer (it is live on every page). The form instance is dormant while the form is closed.

**A06-2 (MEDIUM) "Final week before the tax deadline" article is written in the present tense with no "date has passed" mechanism and goes stale on 3 November 2026.**
File: `src/lib/svt/content/long/en/batch-09.ts:902-988` (`tax-deadline-final-week-checklist-students`): "The tax deadline is close." (line 908), "you have until 11:59 pm local time on Monday 2 November 2026" (907, 912), "message Student Visa Tax on WhatsApp before 31 October" (976), description line 906.
Evidence: `src/components/svt/pages/blog-route.tsx:39-41` prepends `DEADLINE_PASSED_NOTE` only for `BLOG_EN` slug `tax-return-deadline-31-october`; long articles get no such treatment, and `deadline.ts` comments say the article and llms.txt regenerate daily, which covers only that one blog article. Related but milder: `late-tax-return-penalty-dollars-students` (batch-09:825, 858), `australian-tax-year-international-students` (batch-01:454), `diy-tax-return-vs-tax-agent-international-students` (batch-11:824) state the 2 November 2026 date in a way that reads fine after the date ("In 2026, 31 October is a Saturday, so...").
Smallest fix: extend the `deadlinePassed()` note to this slug in `blog-route.tsx` (one line in the condition), or rewrite the opening and the last CTA line so they read correctly after 2 November ("If the deadline has passed, lodge as soon as you can").
Verify: open `/blog/tax-deadline-final-week-checklist-students` with the clock set after 2026-11-03T00:00+08:00.
Unchanged OK? Not for more than a week. It is the most time-sensitive page on the site and the one most likely to be surfaced by search in early November.

**A06-3 (LOW) The hedge ", if any" has been bolted onto 17 sentences, 7 of them ungrammatically.**
Files/lines (from the scan): batch-03:69 "you may get some of that tax back, if any too much was taken"; batch-03:609 "You either get some tax back, if any too much was taken"; batch-03:443 "too much tax taken out may come back to you, if any"; batch-03:1105 "some may come back to you, if any."; batch-05:211 "the difference comes back to you, if any."; batch-05:310 "you get the difference back, if any."; batch-05:634 "you get the difference back, if any."; batch-07:908 (answer) "any amount above your real tax is refunded, if any."; batch-04:56 "It is corrected on your tax return, if any is owed back to you."; batch-04:322 "Any extra tax is worked out on your tax return, if any is owed back to you."; batch-09:335 "the tax you actually owe on your real income, if any is owed."
Evidence: the intent (no refund promise) is right, but "if any too much was taken" and "comes back to you, if any" are not English. The other 10 uses ("your refund, if any") are fine.
Smallest fix: replace with the pattern already used elsewhere in the library: "If more was withheld than you owe, the difference comes back to you. If less was withheld, you pay the difference." (batch-04:21-23 is a clean model.)
Unchanged OK? Yes, but it is the most visible editing seam in otherwise clean prose, and the answer box in batch-07:908 is quoted by AI engines verbatim.

**A06-4 (LOW) Terminology and spelling inconsistencies across the library.**
Counts from the 150 articles (exact string): "café" 74 vs "cafe" 12 (batch-12-deductions uses "cafe" throughout, batch-03/10 use "café"); "payslip" 301 vs "pay slip" 40 (batch-07 and batch-11 use "pay slip"; Fair Work's own spelling is "pay slip", the site's house style is "payslip"); "departing Australia superannuation payment" 10 vs "Departing Australia Superannuation Payment" 14 (guides-en.ts:452 uses lowercase; batch-01/02/07/08 capitalise); "white card" 13 (batch-05) vs "White Card" 9 (batch-10, batch-12); "Australian business number" 3 (guides) vs "Australian Business Number" 5 (batch-01/10); "ordinary time earnings" 7 vs "qualifying earnings" 6 vs "ordinary earnings" 12 for the super base (batch-02:364 explains qualifying earnings is the new term from 1 July 2026, others still use the old term in the same tax year); "two-year" 11 vs "two year" 6; Fair Work Ombudsman referred to as "it" (15) and "them" (10), sometimes in the same article (batch-05:19 vs :715).
Smallest fix: a one-pass find and replace per pair (house style: café, payslip, departing Australia superannuation payment (DASP), white card, Australian business number, qualifying earnings for 2026-27 statements, "it" for the Ombudsman).
Unchanged OK? Yes. None of these changes meaning; they are the kind of thing a second-language reader does not notice but a copy desk would fix.

**A06-5 (LOW) Second-person / third-person mix in one CTA sentence.**
File: `batch-03.ts:651` "If you had several jobs, students can message Student Visa Tax on WhatsApp to bring everything together in one return." Nine other articles close with "students can message..." in the third person after a body written in "you" (penalty-rates-student-visa:86, workplace-rights:261, leave-entitlements:453, casual-part-time:749, medicare-or-oshc:840, medicare-agreement-countries:927, medicare-levy-on-your-return:1028, tfn-declaration-form:1119, invoices-with-an-abn:551, how-to-ask-employer-for-back-pay:366, cancel-abn-when-you-stop-working:341).
Smallest fix: "If you had several jobs, you can message..."; optionally normalise the other nine to "you can message".
Unchanged OK? Yes.

**A06-6 (LOW) Six articles open a paragraph with "The good news is" and one uses "peace of mind".**
Files: batch-00:311 (start-work-without-a-tfn), batch-00:858 (find-lost-tfn), batch-01:622 (how-to-lodge), batch-04:444 (tax-after-leaving-australia), batch-07:909 (tax-return-no-tfn), batch-03:129 ("**Your peace of mind at tax time.**" in cash-in-hand-legal). These are the only generic-filler phrases the scan found in roughly 150,000 words.
Smallest fix: delete "The good news is that" (the sentence stands without it); rename the bullet "Your records at tax time".
Unchanged OK? Yes.

**A06-7 (LOW) In-body cross-references cannot be links, and "Related" on long articles ignores them.**
Files: `batch-09.ts:114` "Our guide on what OSHC covers goes through the details."; `batch-12-deductions.ts:126` "read our separate guide for kitchen hands and chefs."; `batch-12-deductions.ts:219` "read our rideshare guide too"; `batch-12-deductions.ts:530` "explained in our guide for tutors and childcare workers."; `batch-12-deductions.ts:20,34` "points you to the right job guide on this site" with a bulleted list of 11 jobs and no links.
Evidence: `src/lib/svt/content/long/types.ts:13-15` forbids links in the body; `src/lib/svt/content/long/library.ts:104-111` builds `related` purely as the five nearest articles in the same category, so the referenced article is often not in the sidebar (e.g. the European health cover article's Related list is other Medicare articles by position, which does include OSHC; the deductions hub lists 5 of its 11 job guides). The reader is told a guide exists and must find it.
Smallest fix: add an optional `related?: string[]` to `LongArticle` honoured by `longToGuide`, and set it on these five articles; or reword to "see the kitchen hand and chef deductions guide" plus rely on the Deductions header menu (`Header.tsx:8-21`), which does link all 11.
Unchanged OK? Yes for launch; the Deductions dropdown covers the hub's case.

**A06-8 (LOW) Two statements will read as wrong after 30 June 2027.**
Files: `batch-08.ts:1076` "This starts after the 2025-26 tax return, so it does not apply to the return you lodge now."; `batch-10.ts:117` "So if you are lodging your 2025-26 return now, the normal rules still apply."; `batch-10.ts:161-162` "For your 2025-26 return... From July 2026, keep receipts anyway." (the second clause is already in the past). Also `batch-11.ts:380` and others say "Many students... this year" in checklists (7 uses of "this year", all in "the jobs you did this year" sense, acceptable).
Smallest fix: "it does not apply to 2025-26 returns" (drop "now").
Unchanged OK? Yes until mid-2027; add to the annual July refresh list.

**A06-9 (INFO) Title does not match the slug on one article; two near-duplicate topic pairs.**
`batch-00.ts:945-948` slug `what-is-an-abn-international-students`, title "How ABN income is taxed for international students" (body matches the title, not the slug); blog `what-is-an-abn-students` (blog-en.ts:262) covers the "what is it / do I need one" angle. Other overlapping pairs: `australian-tax-year-international-students` (batch-01) vs `australian-financial-year-dates-international-students` (batch-02); `several-jobs-in-one-year-student-tax` (batch-03) vs `multiple-jobs-tax-return-student-visa` (batch-08); blog `low-income-tax-offset-students` vs long `low-income-tax-offset-examples...`. Each pair has a different angle and different worked examples, so this is not duplicate content, but search engines may cluster them.
Unchanged OK? Yes. Noted for A09/SEO if that agent exists.

**A06-10 (INFO) "The Accounting Academy" named as the payee on the home page and pricing guide.**
`home-en.ts:42` "You pay by bank transfer to The Accounting Academy and send us a screenshot."; `guides-en.ts:95, 123`. About page (guides-en.ts:541) explains that The Accounting Academy Services Pty Limited is the supervising agent, but the home page flow step and pricing page do not. A first-time reader sees a third name with no explanation, which is a small trust friction and a phishing-pattern lookalike ("pay a different company").
Smallest fix: "You pay by bank transfer to The Accounting Academy, the registered tax agent that supervises us, and send us a screenshot." (one clause, once).
Unchanged OK? Yes, but see A07-3.

**A06-11 (INFO) Minor copy points found on the hand read**
- `batch-07.ts:872` "**If you may be a foreign resident for tax purposes**": the "may be" hedge belongs to residency, not foreign residency; elsewhere the library says "If you are a foreign resident". Same in batch-10:163, 583, 670 "If you may not be entitled to Medicare" (fine) vs batch-07:872 (odd).
- `batch-09.ts:452` and `:537` write award codes as "[MA000009]" in the answer box; square brackets render as literal text in the ShortAnswer. Acceptable, but "(MA000009)" reads better.
- `global-not-found.tsx:28` "Let's get you back on track." is the only generic app-phrase on the SVT surface (Jo decided same words on both brands; left as INFO).
- `form-brand-svt.tsx:27-28` labels "Australian resident for tax" / "Foreign resident for tax" drop "purposes" where every other page says "for tax purposes". Minor, inside the closed form.
- `i18n.ts:97` blog lead "the questions students ask us most" is a soft claim for a brand with no history yet; harmless.
- `ContactPage.tsx:43` "Do I need my payslips? No..." vs guides-en.ts:124 "upload what it asks for", :396 "Old payslips... help us", leaving-australia:435 "Save your payslips". Not contradictory (ATO data vs helpful backup) but a reader may notice. Could add "They help as a backup" to the contact answer.
- `guides-en.ts:373, 412` and blog use the ATO's spelling "lodgment" in link labels; body text uses "lodging"/"lodge". Correct and consistent with ATO usage.

### Files in A06 scope reviewed with no finding
`src/lib/svt/content/home-en.ts` (clean; the guarantee wording matches CLAUDE.md), `src/lib/svt/content/guides-en.ts` (clean; all `related` slugs resolve), `src/lib/svt/content/blog-en.ts` (clean; all `related` slugs resolve; the deadline article has the deadline-passed note), `src/components/svt/SvtFormClosed.tsx` (clean), `src/lib/svt/llms.ts` (clean; supervision wording, fixed guarantee, deadline fact switches after the date), `src/lib/svt/i18n.ts` en strings (clean apart from A06-1), `src/components/svt/pages/ContactPage.tsx` en block (clean apart from A06-11), `src/lib/svt/payslip.ts` en, `src/lib/svt/price-check.ts` en.

---

## A07: Marketing and conversion

**Audience clarity.** Hero: "Tax returns for student visas. For 500 and 485 visa holders." (home-en.ts:18-20), meta title "International student tax returns" (:14), about page "Only student visas" (guides-en.ts:526-527), contact FAQ "We work only with student and graduate visas, 500 and 485" (ContactPage.tsx:52). A student knows in one screen who this is for. The price check widget offers exactly two visas (price-check.ts:27, "no Other", Jo 27 Oct). Pass.

**Value proposition and the 10-second test.** Hero shows "$220 per return. $385 with ABN work. GST included." under the headline (home-en.ts:21), the first section below the trust strip is "Which price fits me?" (HomePage.tsx:46-48), the guarantee section follows (:50-53), then "From first message to lodged" (:55-57). The CTA at the end of every guide repeats "$220 per return. $385 with ABN work. GST included. We confirm your price before you pay." (i18n.ts:88). Price, who, and how are all above the fold; the guarantee is a real differentiator and is stated precisely ("we pay you the difference... once the ATO issues your notice of assessment... no refund or tax owing, full fee applies"). Pass.

**Trust signals.** Supervision sentence in footer (i18n.ts:76), about page (guides-en.ts:541) with a TPB register link that includes the agent number (guides-en.ts:547), contact "Is this legitimate?" (ContactPage.tsx:45), llms.txt (llms.ts:33-35), JSON-LD description (jsonld.ts:31). "Reviewed and signed off..." in hero lead, how-it-works, past-years, lodge-from-overseas FAQ, tax-residency long article. Trust strip under the hero is the myGov warning only (TrustStrip.tsx, Jo 27 Oct). No `aggregateRating`, no review schema, no "5 stars", no testimonial anywhere in `src/components/svt` or `src/lib/svt` (grep for review/rating returned only the GBP URL constant and tax-sense uses). `SVT_PUBLIC.googleReviewUrl` (brand-public.ts:24) is defined but never rendered. Nothing claims reviews. Pass, with A07-1 below.

**CTA wording consistency.**
| Place | EN | ZH | VI | data-wa-pos |
|---|---|---|---|---|
| Hero | "Start your return on WhatsApp" (home-en.ts:22) | home-zh | home-vi | hero |
| Guarantee section | "Message us on WhatsApp" (home-en.ts:35) | | | guarantee |
| Header, sticky bar, guide end, contact, closed form | "Message us on WhatsApp" (i18n.ts:64; SvtFormClosed:8) | "在 WhatsApp 上联系我们" | "Nhắn tin qua WhatsApp" | nav / sticky / guide-end / contact / none |
| Footer brand column | "Ask us anything" (i18n.ts:80) | "有问题随时问我们" | "Cứ hỏi chúng tôi nhé" | footer |
| Footer connect list | "WhatsApp" | | | footer |
| Price check | "Send this on WhatsApp" (i18n.ts:93) | "在 WhatsApp 上发送" | "Gửi tin này qua WhatsApp" | none (A08-2) |
| 404 | "Contact us" (global-not-found.tsx:32) | same page both brands | | none (no GA on 404) |
Two primary wordings ("Start your return" once in the hero, "Message us" everywhere else) is a deliberate and reasonable split: the hero sells, the rest invite. Prefilled messages are consistent and polite in all three languages (`whatsappHello`, `whatsappAbout`, price-check `messageFor`). Pass.

**Friction in the WhatsApp-first journey.**
- Every WhatsApp link opens in the same tab on purpose (Button.tsx:11-12) so phones hand over; the 404 page opens in a new tab (`target="_blank"`, global-not-found.tsx:32). Inconsistent but harmless.
- `noWhatsapp` fallback "No WhatsApp? Email us at {email}." sits under the hero button (HomePage.tsx:35). Good.
- Contact page sets expectations: "Weekdays, 9am to 6pm Sydney time, most messages get an answer within the hour" (ContactPage.tsx:38) and meta "often within the hour" (:34). This is an operational promise; it should be true on day one or softened to "usually the same working day". NOT VERIFIED against staffing. See A07-2.
- The closed form page (SvtFormClosed.tsx) correctly routes to WhatsApp first and explains that the form link comes after the price is confirmed. Clear.
- Payment step names a third party (A06-10 / A07-3).

### Findings

**A07-1 (MEDIUM, same root as A06-1) The TPB "registered" seal in the SVT footer and on the SVT form carries alt text that attributes registration to SVT.** See A06-1 for files and fix. From a marketing-compliance angle this is the single most sensitive sentence on the site and it is currently the only one in the code that gets it wrong.

**A07-2 (LOW) Response-time promise on the contact page.**
`ContactPage.tsx:34, 38` ("Answers on weekdays, often within the hour"; "most messages get an answer within the hour"); zh:58, 62 and vi:82, 86 say the same. There is no evidence in the repo of staffing for this. If Will/Mia answers first (A-agents on `src/lib/will`), the promise may hold; if a human does, it is a commitment to check.
Smallest fix: "usually within a few hours on weekdays" unless the within-the-hour figure is a decision.
Unchanged OK? Yes if it is true. NOT VERIFIED.

**A07-3 (LOW) Payee name without context in the flow step.** See A06-10. On the home page chat flow, the step "You pay by bank transfer to The Accounting Academy" (home-en.ts:42) is the first time the reader meets that name. One added clause removes the "why am I paying someone else" moment.

**A07-4 (INFO) Price check preview is `svt-visually-hidden`-labelled but the result lacks a wa position (see A08-2); the widget copy itself is clear.** Labels "Your visa" / "Your work this year" / "Jobs with a TFN" / "Work with TFN + ABN" (price-check.ts:16-23) and the note "We confirm your price on WhatsApp before you pay." are good. "Your work this year" is slightly ambiguous in July-October (calendar year vs financial year); "Your work in the tax year" would be exact, but it is a widget, not a tax statement.

**A07-5 (INFO) No "reviews" surface exists yet and nothing pretends one does.** When GBP reviews arrive, `googleReviewUrl` is already defined. No action now.

---

## A08: Advertising and campaign readiness (Google Ads, Meta click-to-WhatsApp)

**Message match.** Likely ad copy ("International student tax return $220", "Student visa tax return on WhatsApp, 500 and 485", "Uber Eats tax return $385") lands on a home page whose H1, price tag and first three sections say exactly that. The pricing page H1 "Your price, confirmed before you pay" with the two figures in the answer box (guides-en.ts:67, 104) is a good ad landing page. The guarantee is stated with its conditions on the same page, which is what Google's financial-services reviewers look for. Pass.

**Conversion tracking.** `Analytics.tsx:92-101` listens for clicks on `a[data-wa-pos]` and fires `whatsapp_click` with `cta_position` and `language`; `analytics.ts:98-110` sends `page_path`, `cta_position`, `topic`, `language`, `tier`, optional `ai_source`. GA tag loaded only in `SvtDocument.tsx:27` with the SVT measurement ID `G-YHFJYVG620` (brand-public.ts:21), `waClicks` on, `untagged` = `/tax-form`, `/zh/tax-form`, `/vi/tax-form` (SvtDocument.tsx:9). `Analytics` returns `null` and loads no script on those paths and on `/crm`, `/complete` (Analytics.tsx:43-45, 103). The `/svt-site` internal prefix is stripped before matching (:42). The 404 page renders its own `<html>` with no Analytics. Pass, with A08-2.

**Event parameters.** Only path, position, topic slug, language, tier, has_abn yes/no, scroll depth and an AI referrer label are sent (analytics.ts:98-137). No name, phone, TFN, email, amounts or form state. `sessionStorage` key `wht_ai_source` holds only a vendor label. Pass. (The key name contains "wht"; it is invisible to users and not a brand leak in the customer-facing sense, but A12 may want it renamed.)

**Coverage of WhatsApp links by `data-wa-pos`** (grep of `svtWhatsappUrl|wa.me|whatsappHref` in `src/components/svt`, `src/app/(svt*)`):
- Tagged: Header nav, StickyWhatsApp sticky, Footer x2 footer, GuidePage guide-end, HomePage hero and guarantee, ContactPage contact.
- Not tagged: `PriceCheck.tsx:55` (the calculator result button), `SvtFormClosed.tsx:20` (on an untagged path, so irrelevant), `global-not-found.tsx:32` (no GA on that page, irrelevant).

### Findings

**A08-1 (HIGH for campaign launch, documented) Every WhatsApp CTA points to a placeholder number.**
`src/lib/svt/brand-public.ts:16-19`: `phone: '04123123123'`, `whatsappNumber: '614123123123'`, `whatsappIsPlaceholder: true`, comment "PLACEHOLDER until the new WhatsApp number exists (DEPLOYMENT_CHECKLIST.md)". `form-brand-svt.tsx:147` and `ContactPage.tsx:14` ("No phone while the SVT number is a placeholder") depend on it.
Impact: ads cannot run; any organic visitor today reaches a dead chat. This is known and tracked in the deployment checklist, so it is not a defect in the code, but it is the gate for everything in A07/A08.
Smallest fix: set the real number before any campaign; the `whatsappIsPlaceholder` flag could additionally gate a build-time warning.
Unchanged OK? No for launch. NOT VERIFIED that a check exists that fails the build or hides CTAs while the flag is true.

**A08-2 (MEDIUM) The price check result button is the only tracked-page WhatsApp link without `data-wa-pos`.**
`src/components/svt/PriceCheck.tsx:55` `<LinkButton href={r.whatsappHref} size="md">{t.send}</LinkButton>`. `analytics.ts:80-90` already defines a `'calculator-result'` position, and the click would be the highest-intent conversion on the home page (visa and work type already chosen). Today it is invisible in GA4, so campaign reporting will under-count conversions from the hero's most important section, and nothing records the tier chosen (`trackTier` exists at analytics.ts:113 but is unused on SVT).
Smallest fix: add `data-wa-pos="calculator-result"` to that `LinkButton` (one attribute). Optionally `data-wa-tier={work}` and read it in the click handler.
Verify: Playwright click on the button with gtag stubbed, assert a `whatsapp_click` with `cta_position: 'calculator-result'`.
Unchanged OK? No if ads are evaluated on GA4 conversions; otherwise LOW.

**A08-3 (LOW) Position values used on SVT are not all in the `WaPosition` union.**
`HomePage.tsx:52` uses `"guarantee"`, `ContactPage.tsx:131` uses `"contact"`; `analytics.ts:80-90` lists hero, inline, section, sticky, footer, guide-end, guide-inline, nav, calculator-result. The function accepts `string`, so nothing breaks, but the comment "Keep these values stable" is the only registry of valid positions and GA4 reports will show two unlisted values.
Smallest fix: add `'guarantee' | 'contact'` to the union.
Unchanged OK? Yes.

**A08-4 (LOW) Consent: GA4 is loaded on every SVT page with no consent banner and no Consent Mode defaults.**
`SvtDocument.tsx:27`, `Analytics.tsx:105-118` (`gtag('config', id)` straight after load). Facts: the site targets students physically in Australia; AU law (Privacy Act, APPs) does not require opt-in consent for analytics cookies, and GA4 with IP truncation is standard practice. EEA visitors will exist (German, Italian, Dutch students are explicitly targeted by `european-students-health-cover-australia`, `uk-students-medicare-reciprocal-agreement`), and GDPR/ePrivacy strictly requires prior consent for GA cookies regardless of where the business sits, but enforcement against a small AU business with no EU establishment is remote. Risk assessment: low actual risk, medium if Google Ads is used for EEA-located audiences, because Google's EU user consent policy requires Consent Mode v2 for personalised ads measurement in the EEA and will degrade or refuse conversion attribution there.
Smallest fix (only if EEA targeting is planned): default `gtag('consent','default',{analytics_storage:'denied', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied', region:['AT','BE',...]})` before config, with a minimal banner for those regions. For AU-only campaigns, state in the privacy policy that GA4 is used (A17 covers that text).
Unchanged OK? Yes for AU-targeted campaigns.

**A08-5 (INFO) Google Ads financial-services policy and Meta policy risks.**
Checked claims on home, pricing, how-it-works, about, contact, guide CTA, llms.txt:
- No "guaranteed refund", "maximum refund", "fast refund", "get $X back". The only "guarantee" is the fee guarantee, stated with its conditions on the same page. Google requires that prices and guarantees in ads be present on the landing page: they are.
- No claim to be a registered tax agent in visible text (the only risk is the alt text, A06-1/A07-1). Google Ads "Financial products and services" policy for tax preparation in AU does not require certification for the advertiser, but misrepresenting registration would breach "Misrepresentation". The supervision sentence and the TPB register link protect the account.
- Pricing is complete (GST included, two tiers, "each year is its own return"), so no "hidden fees" trigger.
- Meta: click-to-WhatsApp ads must land on a WhatsApp Business number; the placeholder (A08-1) blocks this. Meta's "personal attributes" rule: ad copy must not say "you are an international student"; the site copy is fine ("for 500 and 485 visa holders" is a product statement, not an attribute assertion), but ad creatives should be checked separately.
- Language: zh and vi landing pages exist with the same structure, so language-targeted ads have matching pages. Chinese and Vietnamese copy itself is A04/A05's scope.
- Nothing on the site would get an ad disapproved on its own once A06-1 and A08-1 are fixed.

**A08-6 (INFO) Images and OG.** OG images are per-language (`/svt-assets/og/og-{locale}.png`, page-meta.ts:24). Hero image slot alt texts are descriptive (home-en.ts:77-78). Not verified visually (no screenshot pass in this agent's scope).

---

## Coverage

Read in full:
- `src/lib/svt/content/home-en.ts`
- `src/lib/svt/content/guides-en.ts`
- `src/lib/svt/content/blog-en.ts`
- `src/lib/svt/content/long/en/batch-00.ts` through `batch-11.ts` and `batch-12-deductions.ts` (all 13 files, all 150 articles, by hand and by parser)
- `src/lib/svt/content/long/en/index.ts`, `src/lib/svt/content/long/types.ts`, `src/lib/svt/content/long/library.ts`
- `src/lib/svt/i18n.ts` (en strings in full; zh/vi skimmed only for CTA wording comparison)
- `src/components/svt/pages/ContactPage.tsx` (en block in full; zh/vi skimmed)
- `src/components/svt/form-brand-svt.tsx` (EN_RES and SVT_FORM_BRAND in full)
- `src/components/svt/SvtFormClosed.tsx`
- `src/app/global-not-found.tsx`
- `src/lib/svt/llms.ts`
- `src/lib/svt/deadline.ts`, `src/lib/svt/page-meta.ts`, `src/lib/svt/price-check.ts`, `src/lib/svt/brand-public.ts`
- `src/lib/analytics.ts`, `src/components/layout/Analytics.tsx`
- `src/components/svt/HomePage.tsx`, `GuidePage.tsx`, `Header.tsx`, `Footer.tsx`, `TrustStrip.tsx`, `StickyWhatsApp.tsx`, `PriceCheck.tsx`, `Payslip.tsx`, `Button.tsx`, `SvtDocument.tsx`, `pages/blog-route.tsx`

Read partially:
- `src/lib/svt/payslip.ts` (en lines only), `src/lib/svt/jsonld.ts` (grep for rating/review/description only), `src/app/(site)/tax-form/FormClient.tsx` (lines 570-600, the trust row), `src/lib/formStrings.ts` (four keys), `src/components/ui/form-brand.tsx` (grep only), `src/components/svt/pages/BlogHub.tsx` (grep only).

Not reviewed:
- Chinese and Vietnamese content files (`home-zh/vi`, `guides-zh/vi`, `blog-zh/vi`, `long/zh`, `long/vi`): other agents' scope.
- Rendered pages in a browser, OG images, screenshots: not done by this agent.
- `docs/engineering/DEPLOYMENT_CHECKLIST.md` beyond the placeholder reference.
- The WhatsApp assistant texts (`src/lib/will/svt-fixed-texts.ts`, `brand-voice.ts`): out of scope here.

Zero-finding files in scope: home-en.ts, guides-en.ts, blog-en.ts, SvtFormClosed.tsx, llms.ts, deadline.ts, page-meta.ts, analytics.ts (parameters), Analytics.tsx (untagged paths).
