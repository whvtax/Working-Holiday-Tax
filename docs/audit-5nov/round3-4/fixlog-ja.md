# Round 4 fix log: JA service pages

Files: src/app/(ja)/ja/{tfn,abn,tax-return,superannuation}/page.tsx only. Scripts: scratchpad/fixja/*.py.

## Applied

### /ja/tfn (svc-tfn-ja.json, all P1 and P2)
- Title, OG/Twitter title -> 'ワーホリのTFN申請｜届くまでの日数と45%対策'; new description (28-day rule stated correctly); keywords +5 / -2.
- Hero lede replaced with answer-first 28-day text; dated source line '2026年11月更新。出典：ATO' added. H1 and kicker unchanged.
- gap-title paragraph rewritten (TFN申告書, 申請中, 28 days); Figures now 無料 / 28日 / 15% / 45% + source line.
- New section how-title 'ワーホリのTFN申請方法（5ステップ）' (HOW_TO_APPLY via Steps) + WaButton (topic tfn).
- WHAT_WE_DO[4], FAQS[0], FAQS[2], FAQS[4] reference-number framing corrected to the declaration rule.
- New FAQs: 28日たっても届かない (13 28 61, +61 2 6216 1111, TIS 13 14 50), 住所変更, 必要なもの. FAQS = 10, FAQPage maps FAQS.
- FAQS[6] '通常9桁'. FAILURE_POINTS[2] tied to IAR eligibility.
- GUIDES -> 5 guides (all slugs verified in ja/blog/data.ts); section title 'TFNの申請と28日の期間をさらに詳しく'.
- next-title -> LinkRows to tax-return, abn, superannuation (LinkButton import removed as unused).
- cta-title text = 3 things to send on WhatsApp.
- trust-title: supervision sentence + passive sign-off + 'ATOとのやり取りは当社が直接行います'.
- webPageLd name/description/dateModified 2026-11-05; serviceLd description.
- Extra (rule, not in plan): FAQS[1] said 45% applies until the employer has the number; rewritten to the 28-day / no-declaration rule.
- Extra (rule: no "we lodge"): OG description '準備して提出します' -> '準備します'; serviceLd '提出します' -> '準備します'; trust '提出するTFN申請' -> '当社が準備するTFN申請'.

### /ja/abn (svc-abn-ja.json, all P1 and P2 except EN item)
- Title/OG/Twitter 'ワーホリのABN申請｜必要か、登録、税金まで'; description; keywords +6; kicker 'ワーホリのABN申請・登録｜417・462ビザ'; answer-first hero lede; hero WA label 'ABNが必要か、WhatsAppで確認する'.
- split-title intro carries the old lede idea.
- New facts-title section (8 rows) and need-title section (6 rows) rendered with existing RateTable (CountryBlocks) as 2-column tables; need table merges 'ABNは' and 'ポイント' into the second column ("不要。..."). Mid-page WaButton (topic abn).
- TFN-first claim corrected in work-title paragraph and FAQ (ABR: TFN speeds processing, not mandatory).
- New steps-title section (HOW_IT_WORKS, Steps) + link to /ja/blog/how-to-register-for-an-abn.
- trust-title: approved supervision + sign-off sentences.
- 4 new FAQs, GST FAQ wording ('最初の乗車の前に'), FAQ order as planned (11 items), FAQ title 'ワーホリのABNでよくある質問'.
- GUIDES -> 6 (slugs verified); guides title updated. next-title: + /ja/tfn and /ja/superannuation buttons (LinkButton has no secondary variant, all size md).
- CTA 4-point checklist. webPageLd name/description/dateModified/mainEntity; serviceLd description; breadcrumb + Crumbs 'ABN申請・登録'.

### /ja/tax-return (svc-tax-return-ja.json, all P1 and P2)
- Lodging lines fixed: SEQUENCE[4] '何も提出されません', SEQUENCE[5] approved sign-off, FAQS[3] 'ATOとのやり取りは当社が直接行います', FAQS[4] 'お手伝いする', serviceLd sign-off. Extra: FAQS[6] '提出することはありません' -> '提出されることはありません'.
- Title/description/OG/Twitter per plan; kicker 'オーストラリアのタックスリターン代行｜帰国後の日本からも対応' (H1 main line kept).
- New answer-first section (.answer-first, in speakable) and key-figures section (PlainRows KEY_FIGURES, 6 rows).
- who-title rewritten (税理士 only as role definition, approved supervision + sign-off, link to what-is-a-tax-agent, WaButton topic tax-return) and moved after the refund section; tones rebalanced (refund section now white).
- 5 new FAQs appended (12 total). Fee FAQ: added '保証の対象は、TFN所得のあるタックスリターンに限られます' so the guarantee is not overstated.
- Refund section closing links to /ja/tfn and /ja/medicare. GUIDES -> 5 (slugs verified). CTA example sentence added.
- howToLd.totalTime removed; webPageLd name, dateModified, speakable ['h1','.answer-first','.hero-lede']; SEQUENCE[6] title 'ATOが査定し、還付金を支払う'.

### /ja/superannuation (svc-superannuation-ja.json all P1/P2 + dasp-plan JA fact fixes)
- how-much small print: 65% on taxed and untaxed elements for WHM (fact fix F5).
- FAQ 65% vs 35%: ATO wording + mixed-visa note. FAQ[0] and howToSchema step 5: ATO-held super only to an Australian account or cheque.
- Hero .hero-sub: ATO-held payout rule added; first sentence unchanged.
- #documents: 5,000ドル wording aligned to ATO ('may'), certify in Australia; WhatsApp CTA added.
- New #key-figures (8 rows, sources line, added to speakable) and #before-you-leave (5 rows) sections; who-can-claim retoned white, before-you-leave pale.
- #from-overseas: IMT only for fund applications, ATO-held to AU account/cheque, keep AU account; '日本の税理士' replaced with '日本の税務署や専門家'.
- 3 new FAQs (5,000ドル, ATO移管と日本の口座, 何年も前). FAQ TFN: online-application TFN sentence. 11 FAQs.
- Contextual links to how-to-find-lost-superannuation and what-happens-to-unclaimed-super; 3 guides added; next-title links to /ja/tfn and /ja/abn.
- Objection section moved, unchanged, to directly before #with-us.
- Title (absolute)/OG/Twitter 'スーパーアニュエーション返金｜帰国後に受け取る方法（DASP）'; description updated.
- dasp-plan S4: #how-long '申請が承認されてから' -> 'ATOによると、完了した申請が届いてから通常28日以内'.
- dasp-plan not_verified: never-claimed '手数料もかからず' -> 'ファンドの手数料や保険料が引かれない形で'; FAQ 'later visa' claim removed (now: tax return not affected; check Home Affairs for future visas).

## Skipped (why)
- ABN P2 item for src/app/(site)/abn/page.tsx (EN): not my file. Flag to EN owner: EN says the ABN application is "matched against" the TFN; ABR only says a TFN makes processing faster.
- ABN Q4 FAQ inline link to /ja/superannuation: Accordion answers are plain strings; kept text-only (schema = visible), link provided by the next-title button instead.
- dasp-plan S3 (visible steps + delete howToSchema): round 4 plan supersedes with the before-you-leave checklist and keeps howToSchema (step 5 corrected). Lead may still delete howToSchema (tech-001).
- dasp-plan '5,000ドル FAQ' Certification of Immigration Status fee wording: used the round 4 ATO 'may require certified copies' answer instead.
- TFN kicker 'TFN申請代行' in H1 kept (plan: H1 stays). Flag: '代行' could be read as lodging on the client's behalf; lead to judge.

## Facts used (source)
- TFN: IAR eligibility, no documents, posted to AU address, 28 days, do not reapply (ATO foreign passport holders TFN application page); 28-day declaration rule (ATO employee declarations); free, usually 9 digits, for life (ATO What is a TFN); 13 28 61 8:00 to 18:00 weekdays, +61 2 6216 1111, TIS 13 14 50 (ATO phone us); 15% to 45,000, 45% no-TFN (llms.txt).
- ABN: 11 digits, free, documents, 20 business days, TFN speeds processing (business.gov.au, abr.gov.au/node/28); entitlement (ABR ABN entitlement); ride-sourcing GST before first trip (ATO); 47% no-ABN withholding (ATO); super for labour contractors (ATO); GST 75,000, SG 12% (llms.txt).
- Tax return: rates, no tax-free threshold, 45%, Medicare 2%, Japan not RHCA, 31 Oct deadlines (llms.txt); MES before lodging (ATO Medicare exemption page); registered agents only can charge, TPB register (ATO lodge with an agent); AU account for refunds (ATO lodge from outside Australia); early lodgement, 50 business days (ATO lodge before leaving).
- Super: 65% taxed and untaxed for WHM, 35/45 otherwise, mixed visas decided by fund (ATO DASP WHM FAQ); 65% from 1 July 2017, SG 12%, Payday Super (llms.txt); 28 days, IMT only for fund applications, ATO-held AU account or cheque, start and save before leaving, page updated 21 Apr 2026 (ATO DASP page); 5,000 certified copies, certify in Australia, 6 months transfer, free online system with TFN (ATO super info for temporary residents departing).

## Verify
- npx tsc --noEmit -p .: clean.
- jest wht-copy-compliance-6-languages + seo-legal-og: 7/7 pass. Full jest run: 454 suites passed (6182 passed, 1 skipped).
- No U+2013/U+2014/U+2015/U+301C/U+FF5E/NBSP in the four files.
