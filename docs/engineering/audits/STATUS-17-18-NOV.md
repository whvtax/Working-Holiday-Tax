# Will audit: status on 18 Nov 2026

This file says what is done and what is not. It does not say the audit is finished.

## Audit reports

Five read-only reports are in this folder (will-audit-1 to will-audit-5). Together they list about 130 findings, 23 of them high severity.

## Changed in code (18 Nov)

| Change | File | Basis |
|---|---|---|
| Opening "Yes, absolutely!" replaced by "Of course." | src/lib/will/approved-messages.ts (legitimacy) | Playbook: never open this answer with "Yes" or "Absolutely" |
| Japanese follow-up greetings やあ changed to こんにちは (fu_pre_24h, fu_pre_3d) | src/lib/will/i18n.ts | Follow-up doc: Japanese opens with こんにちは |
| German "Sie" changed to "du" in the pre-signature line | src/lib/will/judgement.ts | Rule: German uses du |
| A kanji-only message from a stored-Japanese customer is no longer flagged as Chinese | src/lib/will/language-30oct.ts | Audit F-03 |

Tests: 397 suites and 4,478 tests pass (`npx jest src/lib/will`). Type check passes (`npx tsc --noEmit`).

Not changed: the holding line ("usually within one business day"). The playbook forbids it, but tests pin it as Jo's approved text. Waiting for Jo's decision.

## Still open (high severity)

- Done 18 Nov: price path no longer sends English prices to customers whose language is not English (L-1, service.ts). They now go to the model. Done 18 Nov: the English "already checked" clause is added only to English customers (L-2, engine.ts). No new tests were added for these two changes; the existing suite passes.
- Lodged message: 14 business days sent to customers who owe tax (D-4, F08). Meta template must be re-approved first.
- Follow-up wording in the doc differs from the code (D-1). Meta template text must be checked.
- Done 18 Nov: Chinese and Vietnamese guard rules added for residency, refund promises and agent claims (F1, F9 in part). Tests in src/lib/will/__tests__/zh-vi-guard.test.ts. Not covered yet: DIY instructions, emoji and bullet rules in zh and vi.
- Done 18 Nov: Vietnamese without diacritics, and Vietnamese-only words, are now detected (F-05, i18n.ts unsupportedScript). No test added for this yet.
- Done 18 Nov: the guarantee is barred on approve-draft and Autopilot paths too, using the same rule as the engine (F2, new file guarantee-barred.ts). Tests: guarantee-barred-approve.test.ts.
- Done 18 Nov (F3, Jo's decision: the guard blocks it too): a task's "Send Reply" now runs the Policy Guard on the text and returns an error with the violation names if it fails. The 24h window message is still handled by the send itself. Still open: the guard-blocked draft is still shown as the task's suggested reply, so the owner can see it; the composer send in the chat is not changed.
- SVT follow-up approval always false (SVT F-01, latent until twins launch).
- DASP presented as an offered service on site pages (F01). Playbook and ATO say it is claimed by registered tax agents.
- Residency result stated to the customer (F04).
- Response times on the site differ from the playbook (F07).
- SVT offers guarantee for ABN work (F10).
- Medicare wording says we handle the exemption (F11).

## Needs Jo

1. Holding line: keep "usually within one business day" or use the wording the playbook allows?
2. Whether Meta templates for lodged, estimate and follow-ups are re-approved after text changes.
3. Guarantee: keep the "14 days" payment promise or remove it?
4. Legal wording: cancellation, GST position, registered-agent answer.

## Language rules (method)

Nine rule files and five-message pilots exist in docs/engineering/language-rules/.

Done 18 Nov: the rule file for the customer's own language is added to the system prompt (playbook.ts, buildSystemPrompt). The files are copied into src/lib/will/language-rules.generated.ts by `node scripts/build-language-rules.mjs`, so the app does not read docs at runtime. Test: language-rules-loader.test.ts (12 checks, including that the generated copy matches the docs).

Still open for the nine languages:
- The playbook still contains its own German and Japanese language blocks, so the model may get two sets of rules for those customers. Remove them only after comparing them with the rule files.
- The rule files contain status lines for Jo (for example "DRAFT", "Nothing here is live"). Those lines are sent to the model too. Strip them or move them out before relying on the prompt.
- Fixed texts for es, fr, it and pt: review link, handoff rows, estimate, lodged and objection texts are still missing (see the texts audit, F-08, C-1 to C-8). Until they exist, the model writes those replies from the rule file.
- Chinese and Vietnamese: the rule files exist, but the model's replies in these languages are checked only by the new guard rules for residency, refund promises and agent claims.

## Language blocks (18 Nov, final step)

- Nine clean blocks are in docs/engineering/language-blocks/ (en, de, es, fr, it, pt, ja, zh, vi). Each has the same nine sections. Draft notes and status lines are removed.
- The generator reads that folder: scripts/build-language-rules.mjs. The generated module is checked by language-rules-loader.test.ts.
- The old drafts are moved, not deleted: docs/engineering/archive/language-rules-drafts-18nov/.
- Italian form term changed to "modulo" in i18n.ts and system-message-guard.ts, to match the block.

Not done yet:
- The playbook still has its own German and Japanese language blocks. Compare them with the blocks and remove the duplicates.
- Portuguese wording in i18n.ts and payment-proof.ts is still European Portuguese (lines listed in pt.md, section 9 of the block).
- Japanese site pages still use 税理士 (rule says never).
- Guard checks still missing for Italian and French agent titles and for emoji and bullet rules in every language.
- Playbook conflicts for Jo: guarantee in ABN price message (playbook around line 563 vs TFN only); registration questions in Portuguese (hand over vs answer with supervision fact).

"100 percent correct" here means: one block per language, same structure, checked against the code and the tests. It is not a native-speaker review.

## 18 Nov, second part (done in code, tests added)

- SVT routing: Mia answers in every language. English approved texts are for English chats only; other languages (except zh and vi, which keep their own SVT wording) go to the model, checked by the guard (engine.ts, svtEnglishOnly). Test: svt-all-languages-18nov.test.ts.
- Approved price wording for es, fr, it, pt is live for the reply to a track choice (approved-es/fr/it/pt.ts via approvedPriceIn in instant-choice.ts). First contact still goes to the model (needs a greeting). The English "new flow" no longer applies to other languages (service.ts). Test: approved-price-es-fr-it-pt-18nov.test.ts.
- Follow-up reminders (fu_pre_24h, fu_pre_3d, fu_price_sent, fu_form_6h/3d/7d, fu_sig_24h/3d/7d) written in es, fr, it, pt (i18n.ts FOLLOWUP_MSG). Meta templates for these names are still to be submitted by Jo.
- Portuguese: European strings in i18n.ts and payment-proof.ts changed to Brazilian.
- Guard: protected titles for fr, it, es, pt (expert-comptable, commercialista, asesor fiscal, contador registrado, and others). The approved supervision phrases stay allowed. Test: protected-titles-fr-it-es-pt-18nov.test.ts.
- Questionnaire-received detection: Portuguese "recebemos o seu formulário" added.
- Playbook: only one language block is loaded now (LANGUAGE_RULES). No other duplicated German or Japanese block was found; the expense templates list de and ja on purpose.
- Japanese site pages (tax-return, tfn, abn, blog): 税理士 appears only in comparison copy and does not claim registration. Left unchanged; Jo to confirm.
- Emoji cap applies to every language through text-normalize.ts. Dash bullets are removed; the Portuguese ABN question list keeps its approved "•" bullets.

Not done, waiting on Jo: Meta templates for es, fr, it, pt (price, guarantee, reminders); the SVT follow-up template approval bug (will-audit-5 F-01, paused); the Jo decisions (holding line, guarantee in the ABN price message, Portuguese registration question, 14-day payment promise, GST position, re-approval of templates after text changes, blocked text shown to the owner).

## 18 Nov, third part (review by 22 agents, then fixes)

Done in code, each with a test:
- Templates tab below Message Library (FreeTextTemplates.tsx, template-free-text.ts): free-text messages by language.
- TFN and bank_details sealed at rest (field-seal.ts on top of field-crypto.ts; db.ts createTask and the task mapper). Needs FIELD_ENC_KEYS and FIELD_ENC_ACTIVE in Vercel; without them values are stored as before. Old rows: scripts/seal-legacy-task-fields.mjs (dry run by default, --apply writes).
- Webhook: retry count kept in the store when Redis is absent; no retry once a reply was stored (no duplicate reply); media path retries up to 3 times, then an URGENT task.
- Timed reply: at most five re-arms per customer per hour after a retryable Meta error.
- Track choice (instant-choice.ts): unsure and negated ABN wording, "second job" with employer words, Spanish, French, Italian, Portuguese "no ABN".
- Policy guard: Unicode fold, refund figures (fixed fee or bare number in a refund sentence), refund verbs in de/es/zh/vi, card details per sentence plus Visa/Mastercard, "file it yourself", GPT/LLM/computer program, zh/vi price words, agent claims and titles.
- zh/vi refund_not_yet: the promise to check back is removed (matches Jo's English line of 9 Nov). The "2 to 4 weeks" and "shortly" stay: both are in Jo's English wording.
- en language block: the holding line now matches the approved text ("usually within one business day"); code, tests, scheduler bump and the Meta template all use it.
- SVT: the WHT /start form link becomes the student form /jhd7hp9xd.
- Smaller: unhandled rejection in the per-customer queue; messages over 4000 characters are refused, not cut; Chinese and Vietnamese named in the prompt.

Checked and left as is: the guarantee bar does not read the stored profile income (a customer who has just said "TFN" overrides an older TFN + ABN profile; test audit-72h-fixes pins this).

Open, needs Jo or a deploy step:
- Run migration 049 in Supabase (RLS on will_ai_usage).
- Set FORM_TOKEN_ENFORCE=true in Vercel (public tax form can otherwise trigger a WhatsApp to any number).
- Set FIELD_ENC_KEYS / FIELD_ENC_ACTIVE, then run the backfill script once.
- WhatsApp token is stored unencrypted in will_settings.
- Restore .env.example (two security tests fail without it).
- Webhook 60 second ceiling: a slow model day can exceed it mid-message.
- English opening can still reach a non-English first contact (engine.ts ~1136).
- "within 14 business days" in the lodged confirmation; guarantee sentence inside seven objection replies; language blocks missing the legitimacy answer in seven languages.
- Model prompts and the JSON export carry raw customer text (TFNs pasted in chat are not redacted).
- Meta templates for es, fr, it, pt.
