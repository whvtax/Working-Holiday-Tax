# Will audit 4: prices, legal wording, DASP, guarantee, myGov

Date: 2026-11-17 (UTC). Read-only. The only file written is this report. Paths are relative to `src/` unless shown otherwise. Line numbers are from the working tree on this date.

Not checked: external law (GST treatment, the 15 May 2027 due date, ATO processing times). Items marked **Jo** need the owner's decision.

Totals: 11 high, 14 medium, 8 low (33 findings).

## 1. Prices: every place a figure is written

The figures are the same everywhere. Mismatches are in GST labels, two price points the guard allows that the playbook says do not exist, and stale comments.

| Figure | Where written | Result |
|---|---|---|
| $220 TFN | approved-messages.ts:35, 51; playbook.ts:140, 185, 528; i18n.ts:350; svt/content/llms.ts:34; site client-agreement and devolucion pages (de, es, it, ja) | Amount matches. GST label differs (F14). |
| $385 TFN + ABN | approved-messages.ts:38, 60; playbook.ts:140, 185; (site)/abn/page.tsx:438; abn pages in de, es, fr, it, ja | Matches. |
| $330 foreign TFN | approved-messages.ts:70, 86; foreign-income.ts:11, 57; playbook.ts:245, 528 | Matches. foreign-income.ts:57 adds "GST included", approved text does not. |
| $495 foreign TFN + ABN | approved-messages.ts:77, 89; foreign-income.ts:11; playbook.ts:240, 528; knowledge-seed.ts:1435 | Matches. |
| $330 review, TFN | approved-messages.ts:103; instant-choice.ts:214-219; playbook.ts:270, 528 | Matches. Playbook says GST included, approved text does not. |
| $440 review, ABN | approved-messages.ts:112; instant-choice.ts:219; playbook.ts:270, 528; knowledge-seed.ts:2900 | Matches. |
| $360 (old review) | playbook.ts:270 forbids it; policy-guard.ts:277-280 | Not in use. instant-choice.ts:211 comment still says the review is $220 (F29). |
| $110 phone consultation | policy-guard.ts:269, 276 (allowed); payment-proof.ts:21 | MISMATCH. playbook.ts:528 says "There is no $110 consultation". F15. |
| $165 ABN upgrade | policy-guard.ts:276, 1485-1487 (allowed) | MISMATCH. No approved wording and no playbook rule. F15. |
| $150 refund, $70 back, $160 difference | playbook.ts:156; reviewer.ts:118; svt home-en.ts:45-49; home-vi.ts:25-29; home-zh.ts:26-30; guides-en.ts:86; guides-vi.ts:25 | Worked refund figures. F02, F13. |

Multi-year totals agree: quotes.ts:49 and reviewer.ts:120 ($660 for three $220 years).

## 2. Findings

| ID | Severity | file:line | Language | What is wrong | Evidence | Suggested fix |
|---|---|---|---|---|---|---|
| F01 | High | (site)/superannuation/page.tsx:103, 126, 136, 252, 281-282, 327-328; (site)/page.tsx:158, 188, 196, 251; (site)/rh84sez58/page.tsx:8; (site)/calculator/CalculatorClient.tsx:81, 127 | EN (same claims in de, es, fr, it, ja superannuation pages) | DASP is presented as a service we run and is available now: "We prepare each application", "it is free", a 65% rate table, 28-day processing, "If you would rather we handle steps 2 to 6, message us", DASP estimates in the calculator. | playbook.ts:162 "not available ... never quote a price, never offer it"; playbook.ts:528, 690; reviewer.ts:86; will-decides.ts:64; i18n.ts:336; seed.ts:346. | **Jo.** Replace the DASP pages with the no_dasp line, or remove the offer, rates, timing and CTA. Remove DASP from calculator and from the service list and schema at (site)/page.tsx:196, 251. |
| F02 | High | playbook.ts:156; reviewer.ts:118 | EN | Prompt tells Will to compute the shortfall and state it: "if the ATO refund comes to $60, we refund them the $160 difference". | Conflicts with playbook.ts:275 "Never calculate or estimate a refund", :524 "Do not say what the refund will be", :562 "never state or predict a refund figure". policy-guard.ts:263-265 removed the worked-example exemption. | Delete the example from the prompt and from reviewer.ts. Keep only the approved sentence. |
| F03 | High | approved-messages.ts:304 | EN | Registered-agent answer (the [legitimacy] text) opens "Yes, absolutely!", which reads as "yes, we are registered". | playbook.ts:248 says answer with [legitimacy]; :249 says never open this answer with "Yes" or "Absolutely"; policy-guard.ts:1045-1046 bans that opening; policy-guard.ts:1318 skips the check for approved templates, so it passes. Injected at playbook.ts:566. | **Jo.** Approve a new opening (for example "Of course." then the supervision sentence). Update seed.ts:134. |
| F04 | High | playbook.ts:136, 174, 217; residency-quiz.ts:15-18 | EN | Prompt and quiz tell the customer a residency result: "it looks like you count as a Working Holiday Maker for tax", "you count as an Australian tax resident". | Conflicts with playbook.ts:274 "never determine or imply residency", :475 "you cannot confirm it here", :505 "you never say which result applies". Thresholds conflict: playbook.ts:136 "4 or more of the 6" vs :173-174 "five questions ... 4 or 5"; residency-quiz.ts:14 uses six. | **Jo.** Choose team-only results or a neutral line. Fix the question count and threshold in one place. |
| F05 | High | approved-messages.ts:103; knowledge-seed.ts:2900 | EN | Review fee "covers lodging the amended return, if one is needed" (approved), "covers ... lodging the amended return, whatever the result" (Library). | playbook.ts:168: amendment is "for an additional fee". | **Jo.** Align approved text, Library and playbook. |
| F06 | High | approved-messages.ts:349; claude.ts:822; knowledge-seed.ts:1547 | EN | Holding line: "They'll reply here, usually within one business day." The judge prompt in claude.ts sends the same line. | playbook.ts:387 forbids exactly "no 'usually within one business day'". | Use "I've passed this to the team and they'll reply here." **Jo** to approve. |
| F07 | High | (site)/page.tsx:296, 314, 423; (site)/contact/page.tsx:11, 39, 49, 93; (site)/tfn/page.tsx:361; (site)/medicare/page.tsx:210; (site)/abn/page.tsx:340; (site)/superannuation/page.tsx:288; uk and german pages; knowledge-seed.ts:3681 | EN (site locales repeat it) | Public response times: "Replies in about an hour"; after hours "we get back to you first thing the next working morning"; Library: "within 24 hours". | playbook.ts:386 bans "within 24 hours" and "soon" for team actions. Conflicts with F06 "one business day". | **Jo.** State one response time and how it is measured. Use it on site, in Library and in the holding line. |
| F08 | High | approved-messages.ts:302, 339 (Meta template per :336-337); i18n.ts:676-677 (English Mark Lodged default); knowledge-seed.ts:27, 2502, 3182, 3522; (site)/tax-return/page.tsx:32, 73, 79, 137, 194, 216, 437 | EN, DE, JA, ES, IT | "Your refund should arrive ... within 14 business days" goes to every lodged customer, including those who owe. | playbook.ts:729 bans "14 business days" for owing customers. i18n.ts:681-683 says the owing variant was added after this reached customers with tax bills. | Send the neutral (i18n.ts:689-690) or payable (i18n.ts:684-685) variant by outcome. Remove the 14 business day claim from site and Library. |
| F09 | High | playbook.ts:562 (both halves are on that line); :433; :525; knowledge-seed.ts:4544, 4569 | EN | Prompt says "Two sentences, exactly those ... Never a different version", then describes a different version: after the Notice of Assessment, owing included, "paid within 14 days of it". The fee-refund "paid within 14 days" has no client-agreement basis. | approved-messages.ts:56 has neither NoA nor 14 days. legal-text.ts:70-71 has NoA and no 14 days. | **Jo.** Keep one guarantee text. Approve or drop the 14-day payment promise. |
| F10 | High | lib/svt/content/guides-en.ts:65, 88 (and home-en.ts:44-51, no TFN-only limit); guides-vi.ts:12 | EN, VI, ZH (SVT, shared playbook) | SVT copy offers the guarantee for "$385 with ABN work such as Uber Eats". | WHT rule: no guarantee with ABN or foreign income (playbook.ts:562, 245; abn-income.ts:2-13; legal-text.ts:70). | **Jo.** Add TFN-only and NoA conditions to SVT copy, or remove it for ABN. |
| F11 | High | (site)/page.tsx:196; (site)/medicare/page.tsx:93; knowledge-seed.ts:1011 | EN | Site: "We also handle ... Medicare levy exemption certificates" and "We help you apply for the statement". Library: "I'll guide you if it applies". | playbook.ts:286-287: Services Australia handles it, "not us"; never steps. | Say we include the exemption when the customer has the statement. Remove "handle", "apply" and "guide". |
| F12 | Medium | approved-messages.ts:56, 120-147 (o9 at :129 adds owing); instant-choice.ts:191, 201 | EN, DE, JA | Price-message guarantee has no NoA timing and no owing or TFN-only condition. Site and agreement have all three. | See section 3. | Use one canonical sentence. **Jo** to decide whether NoA belongs in the chat version. |
| F13 | Medium | lib/svt/content/home-en.ts:45-49; home-vi.ts:25-29; home-zh.ts:26-30; guides-en.ts:86; guides-vi.ts:25; llms.ts:34 | EN, VI, ZH | Public worked example ($220 fee, $150 refund, $70 back). llms.ts:34 says "Both include GST." | playbook.ts:275, 562 forbid refund figures in replies. | Label as illustration, or remove. Confirm GST wording with the agent. |
| F14 | Medium | approved-messages.ts:35, 51, 60, 70, 77, 86, 89, 103 (no GST) vs :112 ("GST included"); foreign-income.ts:57 ($330 "GST included"); playbook.ts:240, 270, 329, 528; knowledge-seed.ts:527, 1742; (site)/abn/page.tsx:438; abn pages de, es, fr, it, ja | Multi | GST is stated for some fees and not others. $220 is "GST included" on site and in Library, not in the approved price messages. | As listed. | **Jo and agent** to confirm the GST position once. Use the same label on every fee. |
| F15 | Medium | policy-guard.ts:276, 1485-1487; payment-proof.ts:21 | EN | Guard allows $110 (phone consultation) and $165 (ABN upgrade). Neither has approved wording. | playbook.ts:528 "There is no $110 consultation". No $165 rule in playbook. knowledge-seed.ts:1657 says "pay the difference". | Remove $110 from the allow list. Define the upgrade wording if it is a real price. |
| F16 | Medium | playbook.ts:149 vs :150; knowledge-seed.ts:1035 | EN | Earlier years: "Yes, it's not too late" (149), then "their return is due on 31 October, even with a tax agent" (150). | Internal contradiction. | **Jo** to pick one. |
| F17 | Medium | playbook.ts:147; reviewer.ts:116 | EN | Deadline script: "Returns we prepare are lodged by a registered tax agent". A third agent phrase that implies the business is registered. | playbook.ts:249; approved supervision sentence (approved-messages.ts:304, AGENT_PHRASES in :425-438). | Use the approved supervision wording. Keep "Yes" for the date only. |
| F18 | Medium | playbook.ts:147, 527 | EN | "the due date is usually 15 May 2027" is a date promise. Not on any site page or Library entry. | None in repo. | Agent to confirm before the prompt keeps it. |
| F19 | Medium | (site)/tax-return/page.tsx:286; (fr)/fr/tax-return/page.tsx:235 ("Oui.") | EN, FR | Site answers "Is a registered tax agent involved?" with "Yes." | playbook.ts:249 bans "Yes" for this answer. | Reword without the yes opener. |
| F20 | Medium | knowledge-seed.ts:1923 | EN | Answer to "Who is your registered tax agent? ... TPB number?" says "reviewed and signed off by a tax professional". No registered agent, no TPB detail. | playbook.ts:248 says answer with [legitimacy]. | Replace with the [legitimacy] text. |
| F21 | Medium | playbook.ts:555; knowledge-seed.ts:2953 | EN | "direct access to your details through our secure tax agent portal" and "we access your income and tax information directly through the ATO" can be read as the firm having account access. | playbook.ts:552-554 (no portal, no login). (site)/contact/page.tsx:76 "We deal with the ATO directly". | **Jo and legal** to confirm the access position. Say only "we lodge through the ATO". |
| F22 | Medium | scheduler.ts:1058 | EN | Draft to customer: "It should show within 2 business days." | playbook.ts:386. | Drop the timing sentence. |
| F23 | Medium | playbook.ts:525 (bans "refund in full"); lib/legal/legal-text.ts:188 ("the fee is refunded to you in full") | EN | Playbook bans a phrase the agreement uses for cancellation before work starts. | Both customer-facing. | **Jo and legal** to set cancellation wording. Align playbook. |
| F24 | Medium | playbook.ts:441, 485 | EN | "the team sends it here shortly"; "the return will be ready for their review soon". | playbook.ts:386 bans "shortly" and "soon" for team actions. | "the team will message you here when it's ready". |
| F25 | Medium | playbook.ts:185 vs :220; legal-text.ts:71 | EN | Playbook says do not use "non-refundable" unless asked. The approved already-checked clause and the agreement do use it. | Exception not stated at :185. | State the exception in the playbook. |
| F26 | Low | (site)/tax-return/page.tsx:266, 309 | EN | Public myGov self-lodge steps ("The steps on myGov"). | playbook.ts:276 (no DIY explanation). | **Jo** to decide whether DIY content stays public. |
| F27 | Low | legal-text.ts:190, 198, 287 | EN | Legal timelines: 10 business days cooling-off, 14 days to respond to complaints, 30 days for privacy. None in playbook. | Gap, not conflict. | Legal review. Add to the playbook date list. |
| F28 | Low | knowledge-seed.ts:1733 vs :1635 | EN | ATO timing: "usually pays within about two weeks" (1733) vs "within 14 days of lodging you will receive an email" (1635). | Different events, same chat context. | Check against ATO and keep one statement. |
| F29 | Low | instant-choice.ts:211; policy-guard.ts:263-265; form-link.ts:5 | Code comments | Stale: review "$220"; guarantee "retired" while live; "within 24 hours" confirmation retired. | As listed. | Update comments. |
| F30 | Low | playbook.ts:531 | EN | "repeated attempts from overseas can lock the account" is a security claim with no source in repo. | None in repo. | Verify with ATO before keeping. |
| F31 | Low | (site)/page.tsx:392-393 | EN | "A tax agent will never ask for your myGov login details. Anyone who asks for them is not us." Reads as agent identity. | Ambiguous. | "We never ask for your myGov login." |
| F32 | Low | claude.ts:756-757 | EN | Fallback path sends o9 (guarantee, owing) to every track. Production strip (engine.ts:540, 1305) covers ABN, not all paths. | Relies on code strip. | Make objection choice track-aware. |
| F33 | Low | claude.ts:769 | EN | Fallback path sends APPROVED.legitimacy (same "Yes, absolutely!" as F03). Non-production only (claude.ts:175). | As listed. | Fixed by F03. |

## 3. Guarantee: every version

Approved text (price message): "If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies."

| Version | Where | NoA timing | TFN only stated | Owing covered | Refund timing |
|---|---|---|---|---|---|
| A. Price message sentence | approved-messages.ts:56; playbook.ts:185 | No | Implied by track | No | None |
| B. Objections o1, o2, o3, o5, o6, o14 | approved-messages.ts:120-147 | No | No (code strips for ABN) | No | None |
| C. Objection o9 | approved-messages.ts:129 | No | No | Yes ("an amount to pay") | None |
| D. German and Japanese price tails | instant-choice.ts:191, 201 | No | TFN track only | No | None |
| E. Prompt "EVERYONE SAYS THE SAME" | playbook.ts:562; :433 | Yes | Yes | Yes | "paid within 14 days of it" |
| F. Fee-refund request | playbook.ts:525; knowledge-seed.ts:4544, 4569 | n/a | n/a | n/a | "paid within 14 days" |
| G. Site EN (home, tfn, tax-return, contact, about, medicare, calculator, uk, german, expenses) | (site)/page.tsx:330; tfn/page.tsx:482; tax-return/page.tsx:557; contact/page.tsx:109; about/page.tsx:173; medicare/page.tsx:288 | Yes | Yes | Yes | None |
| H. Site DE, ES, JA | (de)/de/page.tsx:298; (es)/es/page.tsx:289; (ja)/ja/page.tsx:294 | Yes | Yes | Yes | None |
| I. Site ABN page | (site)/abn/page.tsx:438 | No | "TFN only" | No | None |
| J. Client agreement clause 6 | lib/legal/legal-text.ts:70-71 | Yes | Yes (not ABN, foreign or review) | Yes ("non-refundable") | Clause 23 (:188): full refund before work starts |
| K. SVT home and guides | svt/content/home-en.ts:44-51; guides-en.ts:65, 83-88 | Yes | No (applies to $385 ABN) | Yes | None |
| L. Library | knowledge-seed.ts:1980 | No | No | Yes | None |

Differences that matter: NoA timing and owing appear in G, H, J and E, not in A, B or D. TFN-only appears in G, H, I and J, not in K (SVT). Only E and F carry a payment date.

## 4. DASP: code versus site

- Code says unavailable: playbook.ts:162, 528, 641, 690; reviewer.ts:86; will-decides.ts:64; i18n.ts:335-338; seed.ts:343-350; brand-voice.ts:28, 94; engine.ts:741.
- Site says available: the list in F01. The DE, ES, FR, IT and JA superannuation pages carry the same 65% and 28-day claims (16 to 19 matches of "65" each).
- Conflict in every row above: availability, offer, timing, rate, price ("free"). Only F01 needs changing for the conflict to close.

## 5. myGov and agent access (item 6)

- Possible account-access reading: F21 (playbook.ts:555; knowledge-seed.ts:2953).
- Medicare handled by us: F11.
- DIY myGov steps public: F26.
- Generic agent-login line: F31.
- Clean: contact/page.tsx:76, page.tsx:310 ("We deal with the ATO directly"), playbook.ts:324, 531.

## 6. Dates and day counts outside the playbook (item 7)

| Value | Where | Type |
|---|---|---|
| 14 business days (refund after lodgement) | approved-messages.ts:302, 339; i18n.ts:676; knowledge-seed.ts:27, 2502, 3182, 3522; (site)/tax-return/page.tsx:32, 73, 79, 137, 194, 216, 437 | Promise (F08) |
| Paid within 14 days (fee refund) | knowledge-seed.ts:4544, 4569; playbook.ts:525, 562 | Promise (F09) |
| Within one business day | approved-messages.ts:349; claude.ts:822; knowledge-seed.ts:1547 | Promise (F06) |
| Within 24 hours | knowledge-seed.ts:3681 | Promise (F07) |
| About an hour; next working morning | site pages listed in F07 | Promise (F07) |
| Within 2 business days | scheduler.ts:1058 | Promise in team draft (F22) |
| About two weeks (ATO payment) | knowledge-seed.ts:1733 | ATO timing (F28) |
| 15 May 2027 | playbook.ts:147, 527 | Promise (F18) |
| 31 October 2027 (2026-27 self-lodge) | (de)/de/tax-return/page.tsx:180, 235; (ja)/ja/tax-return/page.tsx:293 | ATO date, check |
| 10 business days (ATO processing) | (site)/tax-return/page.tsx:194 | ATO-sourced, reads as promise |
| 28 days (TFN, DASP) | (site)/tfn/page.tsx:147, 258, 374; (site)/superannuation/page.tsx:252, 282, 319, 430 | ATO-sourced; DASP one conflicts (F01) |
| 10 business days cooling-off; 14 days complaints; 30 days privacy | lib/legal/legal-text.ts:190, 198, 287 | Contract promise (F27) |
| A few days to prepare | (site)/tax-return/page.tsx:216 | Soft promise |
| 31 Oct 2026 has passed (2025-26 self-lodge) | (site)/tax-return/page.tsx:191, 221; svt blog-en.ts:1002 | Fact, consistent |
| 3 and 2 business days | stage-sync.ts:67, 101; scheduler.ts:1045-1047 | Internal reminders, not promises |

## 7. Suggested order for Jo

1. F01 (DASP), F03 (agent opening), F04 (residency result), F05 (amendment price).
2. F06, F07, F08 (response times and refund timing), since they contradict each other.
3. F09, F10, F12 (guarantee text, SVT ABN coverage).
4. F11 (Medicare), F14 (GST), F21 (access wording).
