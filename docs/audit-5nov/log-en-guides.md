# Fix log: en-guides

File edited: `src/app/(site)/blog/data.ts` only. Edit scripts: `scratchpad/plan/fix/work-en-guides/e*.py`.
Checks: `npx tsc --noEmit -p .` passes. Jest passes: wht-copy-compliance-6-languages, locale-blog, new-locales-sitemap, frontend-security (67 tests). No U+2013, U+2014 or U+00A0 anywhere in data.ts.

## Applied
- en-guides-a-001 (P0): how-long-does-tax-refund-take: removed "Where we lodge ... on the client's behalf". Replaced with myGov / ATO phone status check plus the approved "reviewed and signed off by a registered tax agent" sentence.
- en-guides-a-002 + money-012 (P1): removed the claim that withholding annualises pay, in backpacker-tax-rate (2 places), do-you-need-to-lodge-short-stay (section rewritten around wrong-rate periods, Medicare and deductions), how-does-australian-tax-year-work, australian-financial-year-dates, average-tax-refund (bullet replaced with "declaration answered as a foreign resident, 30%"), full-time-part-time-casual and leave-entitlements. Also fixed the same wrong fact in what-is-a-tax-refund-australia, which the finding did not list: intro, H2 "Why can a working holiday year end up over withheld?", part-year bullet removed, "When you arrived" bullet, short-years paragraph, and the meta description, because it said "withholding assumes a full year", which is wrong.
- en-guides-a-003: backpacker-tax-rate "15% withheld correctly ... exception" replaced.
- en-guides-a-004: 2026-27 year runs to 30 June 2027, with a deadline of 31 October 2027. Also added the "on the agent's list before 31 October" condition to the agent-extension line in the intro.
- en-guides-a-006: how-to-update-address: answer-first lead (myGov, phone, agent) and new H2 "How do you change your address with the ATO?" (3 routes, postal and residential fields, super funds updated separately, ATO source link). The sales line was removed.
- en-guides-a-007 / money-014: casual-shift: /tax-return bridge added at the end of "What should you keep..." (money-014 wording). The closing line was kept as it was, to avoid a second link.
- en-guides-a-008 / money-011 (EN part): average-tax-refund: /tax-return sentence added. The second /superannuation link was unlinked.
- en-guides-a-009: bridges to /tax-return in all 13 job and pay guides. Where the closing line already said "reconciles at the end of the financial year", the link went into that line. Otherwise one sentence was added at the end. how-to-update-address is covered by money-018.
- en-guides-a-010: casual-shift: new H2 "How much notice does a casual have to give to cancel a shift?" (added, nothing rewritten; worded "generally").
- en-guides-a-011 (partial): the Cleaning Services Award bullet now says the minimum depends on the area cleaned, linked to FWO.
- en-guides-a-012: DASP and super guides: dasp-rejected, dasp-vs-leaving and dasp-tax-rate get a link in their existing closing sentence. how-much-super, check-balance, choose-fund, multiple-funds, super-employer-not-paying and SGC get the "Super and tax are separate claims" sentence.
- en-guides-a-013: myGov / ATO online services route added to lost-TFN (new first bullet, "Four places" changed to "Five"), lost-super (intro) and check-balance.
- en-guides-a-015: the "$500 on $25,000" example was removed from countries-with-medicare and from amending-tax-return. They now say the levy is 2% of taxable income.
- en-guides-a-016 (partial): in-body official links added: ATO TFN application page (how-long-tfn, can-you-start-work), Services Australia RHCA (countries-with-medicare), FWO Cleaning Award (casual-shift), ATO update contact details (address), ATO FTL penalty page (late-tax-return-penalty).
- en-guides-a-017 + b-011: categories changed. gross-pay-vs-net-pay, tips, tax-withheld-payslip, after-leaving and income-statement are now Tax Return. TFN-declaration-form is now TFN, SGC is now Super, tax-invoice is now ABN. Medicare & Other drops to 12 guides.
- en-guides-a-018: dasp-documents-required (2nd /superannuation link) and employee-vs-contractor (2nd /tfn and /abn links) unlinked.
- en-guides-b-001: STP finalisation is due by 14 July. Fixed in PAYG (2 sentences) and income-statement.
- en-guides-b-002: added the "on the agent's list before 31 October" condition in tax-back, after-leaving, what-is-a-tax-agent, do-you-need-to-lodge-short-stay (same issue) and diy-vs-agent (same issue).
- en-guides-b-003: tax-back: the "Leaving part way" bullet was deleted and "Five" changed to "Four".
- en-guides-b-004: SGC components dated. Pre-1 July 2026: shortfall + 10% nominal interest + admin fee, not deductible. From 1 July 2026: shortfall + notional earnings (GIC rate) + administrative uplift starting at 60% + choice loading. NOTE: the new charge IS deductible according to the ATO, so the finding's "still not deductible" was wrong and was not used. The intro "not tax deductible" claim was removed. The super-employer-not-paying summary was updated to match.
- en-guides-b-005: the "anyone charging must be registered" absolute was replaced with the supervision wording in what-is-a-tax-agent and super-employer-not-paying. The same issue in super-multiple-funds-consolidation was fixed too.
- en-guides-b-006: tax-free-threshold: answer-first "Generally no" opening.
- en-guides-b-007: LITO: answer-first "Generally not" opening.
- en-guides-b-008: tax-residency expanded with a definition lead, H2 on the four ATO tests, H2 on whether more than six months makes you a resident, and H2 on the Addy ruling (llms wording), plus links to the UK and German flagships.
- en-guides-b-009: uk-medicare: one-line answer at the end of paragraph 1 (most British WHMs pay the levy).
- en-guides-b-010: /tax-return bridges in without-TFN (replaces "Many people ... sizeable adjustment", which implied a typical refund), after-leaving (/contact changed to "lodge the outstanding return from overseas" linking /tax-return), who-can-ask, tfn-vs-abn, tfn-address, and the Work Rights pages (minimum wage, penalty rates, public holidays, trial shifts, restaurant award, supermarket, wage theft, unfair dismissal). The super pages are under a-012.
- en-guides-b-012: tfn-security opening rewritten around its own intent, with a link to who-can-ask.
- en-guides-b-014: white card: two-year refresher rule (intro and "Does it expire?").
- en-guides-b-015: what-is-the-ato: legitimate contact includes the myGov inbox, SMS and email.
- en-guides-b-018: tax-back FTL wording aligned with the deadline guide.
- money-009: how-to-lodge-tax-return-working-holiday: new H2 "How do you lodge it yourself on myGov?" with 6 numbered steps, closing with a /tax-return link ("how we prepare a working holiday tax return, with a registered tax agent signing it off"). Note: the title starts "How to", so page.tsx will now extract these steps as HowTo.
- money-013, 015, 016, 019, 020, 021, 022: mid-article /tax-return bridges added at the named sections. In what-is-medicare the existing "claimed on your return" sentence was linked (146 clicks, existing text kept).
- money-029: diy-vs-agent "agent can see every employer" replaced, and the deadline condition added.
- tech-012 (data.ts part): links to /uk-working-holiday-tax and /german-working-holiday-tax from backpacker-tax-history, uk-medicare (UK only), how-to-lodge-from-overseas, tax-obligations-after-leaving and tax-residency.
- Also: countries-with-medicare now says Italian and Maltese cover is narrower, with Italy up to six months (brief known fact).

## Skipped
- en-guides-a-011 (Restaurant Award line and Horticulture re-check): I could not reach the award text (awards.fairwork.gov.au and fwc.gov.au were blocked or disallowed). No Restaurant line was added and the Horticulture "2 hours" was left unverified. The lead should check it.
- en-guides-a-014 (merge how-does-australian-tax-year-work into australian-financial-year-dates + 301): needs a redirect in next.config / routing and an llms change, which I do not own. It is also a structural decision. The facts in both pages were fixed instead. See handoff.
- en-guides-b-013 (split the three Uber/gig guides): a P2 rewrite of three bodies, out of scope for a safe fix pass.
- en-guides-b-016 / a-016 remainder (visible source lines on minimum wage, logbook, DASP, TRS, penalty rates): I added only links I could verify (see Applied). The other official URLs were not verified at edit time.
- en-pages-020 (categoryMeta FAQ, condition 8501): I could not confirm against Home Affairs. The current hedged wording ("on some working holiday visas, so check your grant letter") matches 3 other EN guides (lines around 2804, 7005, 7009), and the finding's replacement also makes an unverified claim. Left as is.
- money-010: technical (URL Inspection, sitemap). No content change possible in data.ts.
- money-017: the finding itself says no change.
- money-011 DE and JA parts: those files are not mine (handoff).

## Handoff
- de-guides (`src/app/(de)/de/blog/data.ts`), average-tax-refund-working-holiday: append to the paragraph containing the calculator link: "Die echte Zahl gibt es erst, wenn deine [Steuererklärung](/de/tax-return) aus deinem ATO-Datensatz erstellt ist." Also check the DE and JA versions of the 7 annualisation guides (a-002 list + what-is-a-tax-refund-australia + tax-back-australia-working-holiday "Leaving part way" bullet) for the same false "withholding assumes the pay continues all year" claim, and the 14 July STP finalisation date (PAYG and income statement guides).
- ja-guides (`src/app/(ja)/ja/blog/data.ts`), average-tax-refund-working-holiday: append "実際の金額は、ATOの記録から[ワーホリのタックスリターン](/ja/tax-return)を作成して初めて分かります。" Same annualisation and STP checks as for DE.
- fr/it/es guides: the same annualisation claim probably exists in translated chunks of these slugs. Ask those fixers to grep.
- Lead / shared: a-014. If the merge is approved, add a 301 from /blog/how-does-australian-tax-year-work to /blog/australian-financial-year-dates and drop the old entry from the llms generator. The content in data.ts would then need the move (I can do it).
- Lead: regenerate llms (the categories of 8 guides changed, and so did the description of what-is-a-tax-refund-australia).
- tech-012 remainder (pages / shared): links from /tax-return to both passport flagships, and footer entries "UK passport holders" and "German passport holders".

## Facts checked
- New SG charge from 1 July 2026: shortfall, notional earnings (GIC rate), administrative uplift starting at 60% (can be reduced), choice loading 25%; deductible from QE days on or after 1 July 2026; quarterly rules for earnings up to 30 June 2026. Source: ato.gov.au "The new super guarantee charge" (businesses-and-organisations/super-for-employers/payday-super/missed-or-late-payday-super-payments/the-new-super-guarantee-charge).
- ATO address change path (myGov > Australian Taxation Office > My profile > Personal details > Contact details), phone with TFN for identity: ato.gov.au "Update your personal contact details".
- Cleaning Award minimum for casuals and part-timers varies with the size of the area cleaned: fairwork.gov.au "Entitlements for employees under the Cleaning Award".
- FTL penalty generally not issued where a late return results in a refund or nil: ato.gov.au "Failure to lodge on time penalty".
- ATO TFN application page URL (temporary visitors) and Services Australia RHCA URL: confirmed through search results. The Services Australia page is blocked to fetching (robots).
- WHM withholding flat 15% to $45,000, 45% without TFN, 30% unregistered employer (foreign resident), DASP 65%, RHCA list: public/llms.txt Key facts and the brief.
- ATO phone numbers 13 28 61 / +61 2 6216 1111: already used consistently in data.ts.
- STP finalisation due 14 July; agent lodgement program needs client on list before 31 October; Italy RHCA up to 6 months: brief "Known" facts and the finding evidence (not refetched).
- ATO residency tests (resides, domicile, 183 day with usual place of abode exception, Commonwealth super fund) and the White Card two-year re-induction rule (model WHS Regulations): from knowledge, not refetched. The lead may want to spot-check them.
- LITO not available on WHM-rate income: Working Holiday Maker Reform Act 2016 (ato.gov.au law 20160092), worded "Generally not" and not refetched.

## For the lead to check
- The deductibility of the new SGC contradicts the finding. The ATO page says it is deductible, and the page now says so.
- Other similar implied-refund lines I left untouched: what-is-medicare "on $25,000 of earnings that is about $500" (146 clicks), and backpacker-tax-history "For many people, the refund comes from over-withholding...".
- late-tax-return-penalty says the penalty unit is "$364 from 1 July 2026". I did not verify this, and the ATO FTL page does not state it.
