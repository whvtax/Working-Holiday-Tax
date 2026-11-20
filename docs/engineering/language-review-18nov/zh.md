# Language review, Simplified Chinese (zh), 18 Nov

Reviewer: the zh review agent (native-level Simplified Chinese). Note: this is an agent review, not a human native speaker, so the `// written by an agent, not checked by a native speaker` header in `src/lib/form-i18n/zh.ts` is kept (the form test also pins it).

## 1. Strings checked

- Fixed messages: all 43 keys of `docs/engineering/templates-i18n/zh.json` against `SOURCE.json` `en` (meaning, placeholders `{{1}}` `{{AMOUNT}}` `${AMOUNT}`, links, line breaks, emoji, prices, guarantee only in TFN texts, TFN/ABN/ATO/Medicare/BSB/DASP kept in English).
- Button labels in `src/lib/will/channel.ts`: FORM, RESIDENCY, MEDICARE, REVIEW (zh).
- Free-reply rules: `docs/engineering/language-blocks/zh.md` against `en.md`; every quoted approved phrase checked against the generated templates, `svt-fixed-texts.ts` and `account-name.ts`.
- `src/lib/will/svt-fixed-texts.ts` zh block (thanks, later_plan x4, price_tfn, price_tfn_abn, price_tfn_review, price_tfn_abn_review, each with @first) against `approved-messages.ts` and `later-plan.ts`.
- `src/lib/will/instant-choice.ts` and `playbook.ts`: no Chinese texts; zh-relevant gaps listed in section 3.
- Forms: all 87 keys of `src/lib/form-i18n/zh.ts` against `formStrings.ts` `en`; zh blocks of `ResidencyStep.tsx`, `ResidencyDeclaration.tsx`, `ResidencyFixPanel.tsx`, `FormStepper.tsx`, `submit-tax-form.ts` FIELD_LABELS, `form-brand-svt.tsx` (ZH, ZH_RES). `form-residency-copy.ts` has no zh.

Result: the fixed messages are accurate and natural; one wording fix. The language block had stale cross-references, a wrong description of the opening, and was missing several English rules; fixed. The form had 税号 for TFN (forbidden by the block) and a few small drifts; fixed.

## 2. Changes made

### templates-i18n/zh.json (regenerated with `node scripts/build-template-translations.mjs`)

| Key | Before | After | Why |
|---|---|---|---|
| PAYMENT_LINK_OFFER | 没问题！要不要改用银行卡，通过付款链接来付款？在任何国家都能用。 | 没问题！你想通过付款链接刷卡付款吗？在任何国家都能用。 | English is "pay by card"; 银行卡 reads as a debit/bank card and 改用 ("switch to") is not in the English. 刷卡 covers any card. |
| `_notes` | referenced block items that no longer exist (4.13, 4.10, 4.6, "Chinese is SVT only") | rewritten to the current block | internal notes only, not sent |

### language-blocks/zh.md (regenerated with `node scripts/build-language-rules.mjs`)

- 2.3: said the opening reads 嗨 {{name}}！😊; the real OPENING_MSG is 嗨！很乐意帮你😊 and `withGreetingName` makes 嗨 Name！很乐意帮你😊. Corrected; added "use the name once, never repeat it" (en 2).
- Added from en.md, missing in zh: 我们 is the business / 我 for own actions; match length; exclamation marks sparingly; calm with money worries; benefit once; one closing line after a clear no (2.5a to 2.5d). Complaints: no exclamation marks and the three forbidden phrases (2.10).
- Terms table and 6.1: added 注册税务师 (the mainland registered title) to the forbidden list; no TPB or agent number; agent answers open with 当然。, never 是的 or 绝对 (en 6).
- Section 4: PAYMENT_LINK_MSG.offer quote updated to the new text (matches code). PAYMENT_RECEIVED_MSG only after the screenshot is matched; HANDOFF_HOLDING_MSG is the only time promise. The "no fixed text exists for... the one-message price texts and the review price texts" line contradicted 4.1 (they exist in svt-fixed-texts.ts); now lists what really has no zh text: agent phrases, legitimacy, objections, myGov reassurance, price_tfn_foreign, price_tfn_abn_foreign.
- 4.2: aligned to English: guarantee also when the customer asks about it; never widened; never for ABN, foreign income or a lodged return; customer claiming it goes to the team.
- 6.3: "the sentence in 4.13" pointed to nothing; now 4.2. New 6.3a: date and day-count promises (马上, 今天, 尽快, 24 小时内, 明天, 我去查一下; only the playbook's 14-day sentences and the one business day; deadline wording).
- 6.4: added no troubleshooting, no 你可以自己报税, no Medicare exemption steps, "never need to sign in".
- 6.5: added 自动化, 系统, 软件 (en: automation, system, software).
- New 6.9 money (approved amounts only, $330 always labelled, no 人民币, no conversion, no IBAN/SWIFT), 6.10 social proof and no own-words review ask, 6.11 customers who owe tax.
- 7.3/7.3a: one to three short sentences; fixed texts not padded or shortened; no restating, no repeating; shorter after payment. 7.5: "as in 4.6" pointed to nothing; now PRICE_FLOW_PAYMENT_DETAILS_TEXT.
- 8.1/8.1a: never invent a link, date, status, amount or name; handoff cases and the holding line.

### src/lib/form-i18n/zh.ts

| Key | Before | After | Why |
|---|---|---|---|
| tfn | 税号（TFN） | Tax File Number（TFN） | Block section 3 forbids 税号; brief keeps TFN in English; matches the English label. |
| invalidTfn | 税号（TFN）应为 8 位或 9 位数字 | TFN 是 8 位或 9 位数字 | Same; English "A TFN is 8 or 9 digits". |
| timeEstimate | ⏱ 大约 1 分钟 | ⏱ 大约需要 1 分钟 | English "Takes about 1 minute"; the verb was missing. |
| invoicesHint | 最多可以免费上传 10 张收据或发票。 | 最多可以免费添加 10 张发票。 | English "Add up to 10 invoices for free."; 收据 was added. |
| stepRefund | 审核你的报税表并提交给 ATO | 你的报税经过审核后提交给 ATO | English is passive ("Your return is reviewed and lodged"); 报税 is the block term, not 报税表. |

Kept on purpose: localized placeholders (+86 number, 例如 WEI / ZHANG, 小红书, China) and （请用英文填写） hints, same pattern as the approved Japanese block; 国家或地区 for "country" is the standard Chinese form wording.

Checks: `npx tsc --noEmit -p .` clean. The three test files: all zh tests pass (language-rules-loader passes in full). Two failures at the time of writing belong to other languages being edited in parallel: `detection of our own messages works in every language > fr`, and `each new block says it was not checked by a native speaker` (es, it, pt, vi changed their header line; zh keeps it).

## 3. Shared-file changes for another agent

1. `src/lib/will/channel.ts`, RESIDENCY_BUTTON_LABEL `zh`: current `打开页面`; corrected `税务居民身份测试`. Why: English is "Tax residency test"; "Open page" is a different meaning (8 characters, under the 20 limit). Same drift in de/ja/es/fr/it/pt/vi, Jo to decide for all.
2. `src/lib/will/channel.ts`, MEDICARE_BUTTON_LABEL `zh`: current `观看视频`; corrected `如何申请`. Why: English is "How to apply". Same drift in the other languages.
3. `src/lib/will/channel.ts`, REVIEW_BUTTON_LABEL `zh`: current `写评价`; corrected `留下评价`. Why: closer to "Leave a review" (optional, both are fine).
4. `src/lib/will/svt-fixed-texts.ts`, zh `price_tfn`, `price_tfn@first`, `price_tfn_abn`, `price_tfn_abn@first`, `price_tfn_review`, `price_tfn_review@first`, `price_tfn_abn_review`, `price_tfn_abn_review@first`: last line current `付款后发个截图给我们，我们就马上开始！`; corrected `付款后发个截图给我们，我们就开始处理！`. Why: English "we'll get started!" has no "right away"; 马上 is a time promise, and the zh price flow template already uses 我们就开始处理！.
5. `src/components/ui/ResidencyStep.tsx`, `zh.quizIntro`, and `src/components/svt/form-brand-svt.tsx`, `ZH_RES.quizIntro`, second paragraph: current `最终由 ATO 在我们为你提交报税后，决定你的居民身份。`; corrected `在我们为你提交报税后，由 ATO 最终决定你的居民身份。`. Why: the comma splits subject and verb; ungrammatical-sounding. Meaning unchanged.
6. `src/components/svt/form-brand-svt.tsx`, `ZH_RES.confirmLead`, last sentence: current `在向 ATO 递交之前，我们会再帮你核实一遍。`; corrected `在提交任何内容之前，我们会核实你的回答。`. Why: English "We check your answer before anything is lodged."; 再 ("again") is added and the object (your answer) is missing.
7. `src/lib/will/instant-choice.ts`, MYGOV_REASSURANCE: no `zh` entry, so a Chinese customer who mentions myGov gets no reassurance. Suggested addition: `zh: '不用担心 myGov：你不需要关联任何东西，也不需要自己登录。我们会直接和 ATO 处理所有事情，如果有退税，会直接打进你的澳洲银行账户。'`. Why: identical meaning to the English line.
8. `src/lib/will/playbook.ts`, line 256 (AGENT WORDING IN GERMAN AND JAPANESE): add `Chinese: never 注册税务师, 税务师, 报税师 or 会计师 for us; 注册税务代理人 only to describe the supervising agent.` Why: the playbook names forbidden titles for de and ja only; zh relies on the language block alone.

## 4. For Jo

- `form-brand-svt.tsx` ZH.hasMedicare adds "（留学生健康保险 OSHC 不是 Medicare。）" and ZH.phJob uses a student example; the English SVT form shows neither (the code comment says English keeps a student job example, but `text` has no `en` key). Either add the same to the English SVT form or accept it as a student-only extra.
- The four button labels in all eight languages say "Open page" / "Watch video" instead of the English "Tax residency test" / "How to apply" (items 1 and 2).
- REVIEW_ASK_SHORT_MSG ends with `{{1}}` in English and every language; a Meta template body should not end with a variable.
- No zh texts exist for the legitimacy answer, objections, agent phrases, myGov line and the foreign-income one-message prices; the model writes these from the English meaning under the rules (block section 4 and 8).

## 5. Verdict

Chinese fixed messages: good, identical in meaning to the English after one fix. Language block: now matches the English rules and the code. Customer form: good after five fixes. Ready, subject to the eight shared-file items above.

## Applied 18 Nov

Applied:
1. channel.ts: RESIDENCY 税务居民身份测试, MEDICARE 如何申请, FORM 从这里开始, REVIEW 留下评价.
2. svt-fixed-texts.ts: 马上 removed from all eight price texts (我们就开始处理！); the @first greeting adds 很乐意帮你。 as the English "Happy to help".
3. ResidencyStep zh.quizIntro and ZH_RES.quizIntro word order; ZH_RES.confirmLead "在提交任何内容之前，我们会核实你的回答。"
4. MYGOV_REASSURANCE.zh added; AGENT_PHRASES.zh (registered tax agent kept in English: 注册税务代理人 contains 税务代理, which the guard refuses).
5. playbook.ts: Chinese forbidden titles (注册税务师, 税务师, 报税师, 会计师, 注册税务代理人).
6. OSHC note and student job example now in every language of the student form, English included (Jo, decision 9).
7. Names: a Chinese name in Latin letters that starts with a common family name gets no name (text-normalize.ts firstNameOf, scheduler greetingName), with tests.

Not applied: Traditional Chinese replies (Jo: Simplified stays).
Checks after applying: `npx tsc --noEmit -p .` clean; full `npx jest --forceExit` passing except the two security suites that need `.env.example`.
