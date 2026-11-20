# Japanese (ja) language review, 18 Nov

Reviewer: native Japanese reviewer (agent). Brief: docs/engineering/language-review-18nov/BRIEF.md.

## Strings checked

1. Fixed messages: all 43 keys of `docs/engineering/templates-i18n/ja.json` against `SOURCE.json` (en), and the generated `template-translations.generated.ts`. Button labels for ja in `channel.ts` (FORM, RESIDENCY, MEDICARE, REVIEW).
2. Free replies: `docs/engineering/language-blocks/ja.md` against `en.md`; every approved phrase quoted in the block checked against the code (`instant-choice.ts` PRICE_ML / REVIEW_ML / MYGOV_REASSURANCE, `approved-messages.ts` AGENT_PHRASES, `judgement.ts` SIGNATURE_FIRST, `price-flow-variant.ts`, the i18n.ts keys built from ja.json). Japanese parts of `playbook.ts` (agent wording, Japanese customers, /ja/start). `svt-fixed-texts.ts` has no Japanese.
3. Forms: all 207 ja keys in `src/lib/formStrings.ts`; ja blocks of `ResidencyStep.tsx`, `ResidencyDeclaration.tsx`, `ResidencyFixPanel.tsx`; `JA_RES` in `form-residency-copy.ts` (used by `form-brand-svt.tsx`).

Overall the fixed messages are accurate, natural and identical in meaning to the English: placeholders, links, emoji positions and line breaks match; prices only as in the English; no dashes; no AI/bot words; no 税理士 or agent claim; TFN, ABN, ATO, Medicare, myGov, BSB, DASP in English.

## Changes made

### docs/engineering/templates-i18n/ja.json (regenerated with build-template-translations.mjs)

| Key | Before | After | Why |
|---|---|---|---|
| EXPENSES_INTAKE_MSG | 制服や保護具 | 制服や防護服 | "protective clothing": 保護具 means protective equipment in general (helmets, gloves, goggles), wider than the English. |
| _notes (not sent) | notes said the block lists メディケア and has the typo "Service Australia" | updated to the current state | Notes were out of date after the block fix. |

### docs/engineering/language-blocks/ja.md (regenerated with build-language-rules.mjs)

| Section | Before | After | Why |
|---|---|---|---|
| 2 | Follow-ups open with 「こんにちは、{{1}}さん。」 | 「こんにちは、{{1}}さん😊」 | The approved follow-up texts use the emoji, not 。; the quoted phrase did not match the code. |
| 2 | (missing) | 私 only for own actions; warm not gushing; complaints with no emoji and no ！ and none of the three blame phrases; one closing line after a no; benefit once | Same tone rules as en.md section 2 and 6. |
| 3 | Medicare → メディケア, Medicare levy → メディケア・レビー, Superannuation → スーパーアニュエーション（DASP） | Medicare in English; Medicare levy and Medicare Levy Exemption in English with （メディケア・レビー）/（メディケア税免除） once; superannuation（スーパーアニュエーション、DASP） | BRIEF: keep Medicare and DASP in English; matches the fixed texts. |
| 3 | (missing) | myGov row, lodge only after signature, DASP never "soon" or priced, fee never 無料チェック/リスクなし | Same as en.md section 3. |
| 4 | LODGED_CONFIRMATION_MSG usable whole | First sentence only in free replies | en.md: the second sentence is a day count, which is forbidden in free text. |
| 4 | SIGNATURE_FIRST quoted as 「申告書はまだ提出されていません。」 | 「まだ提出されていません。」 | Still matches the code, and keeps matching after the タックスリターン fix proposed below. |
| 4 | Agent phrases only when asked who reviews the return | Also for legitimacy questions; open with 「もちろんです。」, never 「はい」 | en.md: "Open every agent answer with Of course". |
| 4 | (missing rows) | NOT_OUR_PRICE, COUPLE, BANK_DOCUMENT, OWN_ACCOUNT, MEDICARE_MSG, PAYMENT_LINK, PAYMENT_RECEIVED (only after a matched screenshot), FORM_RECEIVED, DOCUMENTS_RECEIVED, HANDOFF_BUMP, SIGNATURE_MSG, LODGED_PAYABLE | en.md lists these; every quoted phrase checked against the generated ja text. |
| 4 | Foreign income: "no approved Japanese block exists" | Points to the approved price flow (PRICES_FOREIGN_MSG, PRICE_FLOW_STEPS), no guarantee | The ja price flow now exists. |
| 6 | "The only time line allowed is 通常1営業日以内" | The three day counts en.md allows: handoff 1 business day, ATO payment email within 14 days, fee refund within 14 days of having details; plus no team timelines (すぐに, 本日中, 24時間以内...) and no deadline wording | The old rule contradicted LODGED_PAYABLE_MSG and the playbook; now identical to en.md. |
| 6 | (missing) | No TPB/agent number; guarantee never widened or applied to ABN/foreign/review, claims go to the team; no 円 conversion, IBAN or SWIFT; $330 always labelled; social proof and own-words Google review ask banned; customers who owe tax: no refund wording, never "call the ATO"; AI/システム/ソフトウェア added | Same forbidden content as en.md section 6. |
| 7, 8 | (missing) | ~450 character prose limit, no restating, shorter after payment, never invent a fact, handoff cases, "are you a bot" goes to a person with no draft | Same as en.md sections 7 and 8. |
| 6 | "...DASHES..., plus 〜" | wave dash mentioned by name, no 〜 character in the file | 〜 is not in DASHES; the block itself now contains no dash-like character. |

Nothing in the block limits Japanese to one brand.

## Shared-file changes for another agent (exact)

1. `src/lib/will/instant-choice.ts`, PRICE_ML.ja.hello
   - Current: `(name) => (name ? \`こんにちは、${name}さん😊 ご連絡ありがとうございます。\` : 'こんにちは😊 ご連絡ありがとうございます。')`
   - Corrected: `(name) => (name ? \`こんにちは、${name}さん！😊 喜んでお手伝いします。\` : 'こんにちは！😊 喜んでお手伝いします。')`
   - Why: English is "Hey {name}! 😊 Happy to help."; ご連絡ありがとうございます means "thanks for contacting us" and is the long opening the ja block discourages. Matches APPROVED.opening ja 「喜んでお手伝いします」.
2. `src/lib/will/instant-choice.ts`, PRICE_ML.ja.tfnBody and abnBody: replace `メディケア` with `Medicare` (both strings).
   - Current: `税務上の居住区分、メディケア、控除を確認したうえで、...` / `税務上の居住区分、メディケア、控除を確認し、ABNの...`
   - Corrected: `税務上の居住区分、Medicare、控除を確認したうえで、...` / `税務上の居住区分、Medicare、控除を確認し、ABNの...`
   - Why: BRIEF keeps Medicare in English; APPROVED.prices ja already writes Medicare.
3. `src/lib/will/instant-choice.ts`, PRICE_ML.ja.guarantee
   - Current: `還付がない場合は、料金全額をいただきます。`
   - Corrected: `還付がない場合は、料金の全額をご負担いただきます。`
   - Why: same meaning, but identical to PRICE_FLOW_STEPS_TFN ja, so the customer sees one guarantee wording. Optional.
4. `src/lib/will/instant-choice.ts`, REVIEW_ML.ja (meaning gap)
   - Current: `` (amount) => `喜んでお手伝いいたします。すでに申告済みのため、今回は新規の申告ではなく、提出済みの申告内容の確認・修正となります。料金は確認作業に対して$${amount}で、結果にかかわらず同じです。` ``
   - Corrected: `` (amount) => amount === 440 ? `すでに提出済みのタックスリターンの確認も承ります。\n\nすでに提出済みのため、今回は新しいタックスリターンではなく、既存のタックスリターンの確認となります。料金は確認作業に対して$440（GST込み）で、結果にかかわらず同じです。` : `すでに提出済みのタックスリターンの確認も承ります。\n\nすでに提出済みのため、今回は新しいタックスリターンではなく、既存のタックスリターンの確認となります。料金は確認作業に対して$330で、結果にかかわらず同じです。必要な場合は、修正したタックスリターンの提出も含まれます。` ``
   - Why: English price_tfn_review says the $330 covers lodging the amended return if needed, and price_tfn_abn_review says $440 includes GST; the ja text says neither, and 確認・修正 promises an amendment in every case. 申告 replaced by タックスリターン (block term). Keep 「確認作業に対して」 and 「結果にかかわらず同じです」 (engine.ts and policy-guard.ts match on them). The German REVIEW_ML has the same gap.
5. `src/lib/will/judgement.ts`, SIGNATURE_FIRST.ja
   - Current: `申告書はまだ提出されていません。メールでお送りした書類にご署名いただいたら、ATOに提出し、こちらでお知らせします。`
   - Corrected: `タックスリターンはまだ提出されていません。メールでお送りした書類にご署名いただいたら、ATOに提出し、こちらでお知らせします。`
   - Why: term consistency (タックスリターン everywhere). Meaning already identical.
6. `src/lib/will/channel.ts`, RESIDENCY_BUTTON_LABEL.ja
   - Current: `ページを開く` ("Open the page")
   - Corrected: `税務上の居住者テスト`
   - Why: English is "Tax residency test". 10 characters, under the 20 limit. (de/es/fr/it/pt/zh/vi also say "open the page"; decide for all languages together.)
7. `src/lib/will/channel.ts`, MEDICARE_BUTTON_LABEL.ja
   - Current: `動画を見る` ("Watch the video")
   - Corrected: `申請方法を見る`
   - Why: English is "How to apply". Same note as 6 for the other languages. FORM (フォームを開く) and REVIEW (レビューを書く) labels are fine.
8. `src/lib/formStrings.ts`
   - `stepRefund.ja`: `内容を確認し、ATOに提出します` → `タックスリターンを確認し、ATOに提出します` (English names "your return").
   - `workingHolidayMakerTax.ja`: `税法上のワーキングホリデーメーカー` → `税務上のワーキングホリデーメーカー` (税務上 everywhere else in the form and messages).
   - `registeredAgentNo.ja`: `監督するタックスエージェントの登録番号` → `監督する登録タックスエージェントの番号` (matches AGENT_PHRASES 「登録タックスエージェント」; "registered" belongs to the agent, not the number).
9. `src/components/ui/ResidencyStep.tsx`, ja block
   - `compareFoot`: `$2,462が手元に残ります` → `$2,462多く手元に残ります` (English: "$2,462 more in your pocket"; without 多く it reads as if only $2,462 is left).
   - `conditions[3]`: `住居、継続的な仕事、個人的なつながりなど、オーストラリアとの結びつきがあること。` → `住居、継続的な仕事、個人的なつながりなど、オーストラリアとの継続的な結びつきがあること。` ("ongoing ties").
   - `yearNote`: `以下の項目は、今回申告する課税年度についてお答えください。` → `以下の項目は、今回提出する課税年度が対象です。` (English is a statement, "These apply to the tax year you're lodging", not an instruction).
   - `nonNdaResult`: `...最大$700を受けられる可能性があります。` → `...それでも最大$700を受けられる可能性があります。` ("You may still be entitled").
   - `warn.title`: `重要：必ずお読みください` → `よくお読みください` (English "Please read this carefully"; 重要 and 必ず add emphasis not in the English).
10. `src/components/ui/ResidencyDeclaration.tsx`, COPY.ja.confirmLead
   - Current: `...として提出されます。以下の内容を理解したうえでお進みください：`
   - Corrected: `...として提出されます。この内容を理解していることをご確認ください：`
   - Why: English asks the customer to confirm they understand; the ja asks them to proceed.
11. `src/components/ui/ResidencyFixPanel.tsx`, RESIDENCY_FIX_COPY.ja.intro
   - Current: `最も当てはまるものをお選びください。申告書の作成時に当チームが確認し、最終的な判断はATOが行います。`
   - Corrected: `最も当てはまるものをお選びください。タックスリターンの作成時に当チームが確認し、最終的な判断はATOが行います。`
   - Why: term consistency.
12. `src/components/svt/form-residency-copy.ts`, JA_RES.questions[2]
   - Current: `申告する年度中、普段の住まいがオーストラリアにある`
   - Corrected: `その年度中、普段の住まいがオーストラリアにある`
   - Why: English is "during the year"; 申告する adds wording.

## For Jo

- `i18n.ts` still holds old Japanese in tables marked "no longer sent" (REVIEW_REQUEST_MSG ja uses 確定申告, HANDOFF_APOLOGY_MSG ja, LODGED_NEUTRAL_MSG ja uses 確定申告書, the removed follow-ups use 申告書). They are not sent, so they were not changed; if any is ever reused it needs the タックスリターン wording first.
- RESIDENCY_CHECK_MSG ja keeps the English link (`/y8vwp4bf7`) exactly as the English. A Japanese page `/ja/y8vwp4bf7` exists; if you want Japanese customers sent to it, that is a code decision for all languages.
- REVIEW_ASK_SHORT_MSG ends with the link variable, as the English does (Meta may reject a template that ends with a variable).
- Two test failures in the run are from other languages being edited at the same time, not ja: `templates-nine-languages-18nov` "detection of our own messages › fr" (FORM_RECEIVED_MSG fr no longer detected) and `form-nine-languages-18nov` "each new block says it was not checked by a native speaker" (it.ts header changed by the Italian reviewer). All ja tests pass (`-t ja`: 13 passed), `npx tsc --noEmit -p .` is clean.

## Verdict

Japanese fixed messages and forms: ready, identical in meaning to the English, with one wording fix applied (防護服). The language block now carries the same rules, terms and forbidden content as en.md, and every phrase it quotes matches the code. Twelve small shared-file corrections are listed above; the two that change meaning are 4 (review fee: amended return and GST missing) and 1 (price greeting says "thanks for contacting us" instead of "happy to help").

## Applied 18 Nov

Applied:
1. PRICE_ML.ja.hello: the approved opening's greeting line, 「こんにちは、Minamiさん！喜んでお手伝いします😊」 (no name: 「こんにちは！喜んでお手伝いします😊」).
2. PRICE_ML.ja tfnBody/abnBody: Medicare in Latin letters; guarantee 「料金の全額をご負担いただきます」 (same as the price flow); fit 「…のプランが合いそうです。料金は$220です。」; screenshot without すぐに (no time promise beyond the English).
3. REVIEW_ML.ja: the opening line, タックスリターン, 「（GST込み）」 on $440 and the amended-return sentence on $330; 確認・修正 removed.
4. SIGNATURE_FIRST.ja (judgement.ts) タックスリターン.
5. channel.ts: RESIDENCY 「税務上の居住者テスト」, MEDICARE 「申請方法を見る」, FORM 「ここから始める」 ("Start here"); REVIEW unchanged.
6. formStrings.ts stepRefund.ja, workingHolidayMakerTax.ja, registeredAgentNo.ja; ResidencyStep ja compareFoot, conditions[3], yearNote, nonNdaResult, warn.title; ResidencyDeclaration ja confirmLead; ResidencyFixPanel ja intro; JA_RES.questions[2].
7. PRICE_FLOW_PAYMENT_DETAILS ja: すぐに removed.

Not applied: the legacy i18n.ts tables (never sent; removed messages are not reintroduced); the Japanese residency link (localizeOwnLinks already sends /ja/); REVIEW_ASK_SHORT_MSG ending with the link (Will-only free text, Jo).
Checks after applying: `npx tsc --noEmit -p .` clean; full `npx jest --forceExit` passing except the two security suites that need `.env.example`.
