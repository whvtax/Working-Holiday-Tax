# Round 4 guide log: JA

File: src/app/(ja)/ja/blog/data.ts only. Script: scratchpad/plan/round4/guides4ja/apply.py (68 exact-once replacements). Backup: guides4ja/data.ts.bak.
State at start: JA data.ts was untouched by the earlier agent (mtime before the brief, no guidelog-ja), so everything below is new; nothing duplicated.

## Applied
Bridges to /ja/superannuation placed early (anchors all different):
- what-happens-to-unclaimed-super: H2 '移ったあとでも請求できるのか？' para 1 ('DASPの請求のしかた') (P1, previously no route to the hub).
- how-long-does-dasp-take: end of 'お金が動く前に何が起きているのか？' ('DASPの請求のしくみ').
- dasp-vs-leaving: end of '請求するのが明らかに正しいのはどんなときか？' para 1 ('出国後にスーパーを請求する手順').
- dasp-rejected: end of '五つの理由とは何か？' ('DASPの請求').
- dasp-tax-rate-65: end of 'そのレートでも請求する価値はあるのか？' ('DASPとして請求する').
- tax-on-super: '請求はいつ出すべきなのか？' ('出国後にスーパーを請求するページ').
- how-much-super-should-employer-pay, how-to-find-lost-superannuation, dasp-documents-required: bridge in the first H2 where the claim comes up.
Tax return bridges (gap list): how-much-super, how-to-choose-super-fund, dasp-tax-rate-65, super-multiple-funds, dasp-rejected, dasp-vs-leaving (varied sentences in the closing section).
DASP fact fixes:
- 28 days from a completed application (not approval): how-long (para + H2 retitled), tax-on-super, how-to-choose, super-for-casual, how-to-find-lost, how-to-check-balance, working-holiday-visa-tax-guide, category FAQ.
- 65% on taxed AND untaxed element for WHM; others 35%/45%; mixed visa history -> whole payment 65%: dasp-tax-rate-65 (lead, H2 1, last list), tax-on-super (rate section, list), dasp-vs-leaving (second visa H2). Rate date 1 July 2017 (was '2017年1月1日' in tax-on-super).
- ATO-held super paid only to an Australian account or cheque: how-long, unclaimed, dasp-rejected, what-is-the-ato, category FAQ (also 'Japanese account' now fund dependent).
- $5,000 = Home Affairs Certification of Immigration Status on paper applications; certified ID at any balance: dasp-documents (para + list), category FAQ.
- One application per account: how-long, dasp-documents.
- Cannot claim before leaving / leaving before visa ends is fine: dasp-documents (removed 'must leave after visa ends' and the 'departure before expiry' failure); online application can be started and saved before leaving (tax-on-super).
- 6 month transfer from the later of leaving and visa ceasing, 30 April / 31 October reporting days: unclaimed (lead + first H2 rewritten), tax-on-super, dasp-tax-rate, dasp-vs-leaving, dasp-documents, dasp-rejected, tax-obligations, what-is-the-ato.
- Unclaimed guide: interest sentence removed; 'fee free' -> out of reach of fund fees and insurance; unverified 'ATO route is faster' claims removed (here and in how-long, dasp-rejected).
- how-to-find-lost (C4 owner): added the two official search routes (DASP online by TFN; myGov Super > Fund details, ATO-held shown, 'Contact fund').
- Online eligibility is checked automatically against Home Affairs records (dasp-documents).
Intent split (no merge/redirect/slug change):
- tax-on-super retitled 'スーパーはいくら戻る？65%差し引き後の手取りと帰国後の税金' + description; its 'why so high' H2 replaced by a short rate-by-visa section linking to dasp-tax-rate-65.
- dasp-tax-rate-65 keeps 'why'; links to tax-on-super for take-home and after-tax questions.
- dasp-vs-leaving retitled 'スーパーはオーストラリアに残す？請求する？待つと失うもの' (leads with the leave-it half) + description.
Section changes (new-guides.json):
- casual-shift-cancellation: new 2nd H2 on notice in both directions (FWO: no firm commitment, can accept or reject work, generally no notice to resign unless award/agreement/contract says otherwise; check the award for rostered shifts); retitled with 通知; description.
- tax-obligations-after-leaving-australia: early lodgement H2 shortened and corrected (ATO conditions, paper only when lodging yourself, pre-fill generally unavailable, payslips not sufficient, use the myGov income statement). Same payslip/early-return correction in do-you-need-to-lodge-tax-return-short-stay (also removed 'refund arrives months earlier').
Leftovers:
- Part-year over-withholding claim removed: short-stay guide (description, lead, H2 rewritten to 'flat 15% per pay'; real causes kept: 45% before TFN, unregistered employer), transferring-money-overseas, leave-entitlements (lump sum 'annualised' claim).
- Medicare: descriptions already consistent; body fixes so the levy is calculated at assessment: short-stay guide, what-is-a-tax-refund list item.

## Skipped
- what-is-a-tax-agent section: JA excluded by the plan (already covered). New guide early-tax-return-leaving-australia: EN only; no JA inbound links added.
- C4 trimming of how-to-check-super-balance 'どのファンドにいるか分からない' section: not listed in the brief inputs; left.
- Bare 'スーパー' lead links (super-multiple-funds, super-employer-not-paying, how-to-check-balance): anchor rule was EN only; left.
- Unverified figures outside the plan (records update 7 to 14 days, fee ranges in dasp-vs-leaving, 'DASP offset against ATO debt'): untouched, flag for a later fact pass.

## Handoffs
- None needed for registration (no new JA guide).

## Facts + sources
- F1, F3, F4, F6, F7, F8, F9, F5 from dasp-plan.json (ATO DASP page, DASP online help, payments-from-super rate table, USM protocol, keeping-track-of-super-online, Home Affairs form 1194).
- Early lodgement: ATO 'lodge your tax return before leaving Australia' and PLS future-year lodgments (new-guides.json key_facts).
- Casual notice: FWO 'Your guide to casual employment' (new-guides.json).
- WHM withholding 15% to $45,000; 45% without TFN: public/llms.txt Key facts.

## Verify
- npx tsc --noEmit -p . : clean.
- jest wht-copy-compliance-6-languages, new-locales-sitemap, locale-blog, brand-isolation-round2, brand-routing-26oct, frontend-security, supabase-schema-guards: 7 suites, 196 tests passed.
- No U+2013/U+2014/U+2015 in the file.
