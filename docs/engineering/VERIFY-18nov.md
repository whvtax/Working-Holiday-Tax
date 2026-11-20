# Independent verification, 18 Nov 2026 (templates, nine languages, both brands)

Scope: Jo's decisions in `docs/engineering/templates-review/DECISIONS.md` and decision 018. Nothing was sent to anyone, nothing was committed, nothing was installed. No locked English text was changed. Scratch tests used during the check were run in a temporary folder and deleted afterwards.

Summary: 7 of 9 checks pass as built. Check 5 failed on one path and check 8 failed on myGov steps; both are fixed, with tests. Two safety gaps are left open because they are too big to fix locally (see Open items 1 and 2).

## 1. Locked English equals what the code sends: PASS

Evidence: I compared every locked text in DECISIONS.md with the code, character by character, and found no drift:
- opening, prices, prices_foreign: `approved-messages.ts:31, 38, 90`.
- payment_received: `approved-messages.ts:200`, `i18n.ts:396`.
- form_received: `i18n.ts:178`. residency_check: `i18n.ts:777`. medicare: `i18n.ts:539`, `approved-messages.ts:267`.
- estimate refund and payable: `i18n.ts:561, 569`, `approved-messages.ts:314`.
- signature: `i18n.ts:596`, `approved-messages.ts:279`.
- lodged refund and payable: `i18n.ts:619, 627`.
- handoff holding and bump: `i18n.ts:434, 443`.
- documents received: `i18n.ts:492`. ABN questions: `i18n.ts:516`.
- couple: `i18n.ts:253`. no_dasp: `i18n.ts:346`. medicare_cant_help: `i18n.ts:334`. card payment link (3 lines): `i18n.ts:320-322`.
- the five follow-ups: `i18n.ts:691-695`.
- refund_checkin, review ask, refund_not_yet: `review-asks.ts:169, 176, 224`.
- price flow messages 1 and 2, and the foreign-income version: `price-flow-variant.ts:49-84, 104`.

`template-translations.generated.ts` holds only the eight translations; English is added from the code (`nineLanguages`, `i18n.ts:36`).

Drift outside the locked tables (recommended, not changed):
- The English language block that Will reads (`language-rules.generated.ts`, source in `docs/engineering/language-blocks/`) still quotes the old Medicare phrase "you may be eligible to apply for a Medicare Levy Exemption". Its payment_received quote is "Payment received." where the locked text says "Payment received, thank you!".
- The Library seed still offers two older wordings that a person can send by hand: `estimate` (APPROVED.estimate_ready, "Hey! We've now gone through...") and `lodged` ("lodged successfully! 🎉 ... refund should arrive"), at `seed.ts:151, 154`. The second is refund wording, and nothing stops it being picked for a customer who owes tax.

## 2. Nine languages, both brands, faithful translations: PASS (minor notes)

Evidence:
- All 43 keys in `template-translations.generated.ts` have de ja es fr it pt zh vi, none empty.
- No em dash, en dash, horizontal bar or Chinese double dash appears in any translation (regex scan over all 43 keys x 8 languages).
- No AI or bot word appears. My scan's hits were false positives: "j'ai", "hai", "lại".
- For both brands, every nine-language table goes through `rebrandText(...,'svt')` with no `brandLeaks`. The SVT links resolve to `studentvisatax.com.au/<lang>/jhd7hp9xd` and `.../jhd7hp9xd/w3rp42fav`. The WHT texts have no SVT marks.
- Back-translation: I read every message in every language, more than 30 per language. Checked: the follow-ups, refund check-in, payment received, form received, residency check, Medicare, estimate, signature, lodged (both), handoff (both), ABN questions, prices, the price flow steps and details, couple, DASP, payment link and more.
- No added or missing content. No time promise beyond the English: "one business day" and "14 business days / 14 days" only. No refund promise beyond the TFN guarantee, which appears only in the domestic TFN steps. No registered-agent claim.

Minor notes; meaning kept, no change needed:
- ESTIMATE_PAYABLE de, es and zh render "walk you through" as "step by step" ("Schritt für Schritt", "paso a paso", "一步步").
- PRICE_FLOW_STEPS step 3 reads "send it to you for review and signature" in de, es, fr, ja, zh and vi, where the English says "send it for review and signature".
- PRICE_FLOW_PAYMENT_DETAILS.zh keeps the labels "Account" and "Amount" in English.

## 3. Removed items stay removed: PASS (one note)

Evidence:
- `fu_form_3d/7d` and `fu_sig_3d/7d` survive only as `LegacyTable` history in `i18n.ts:698-733`. They are not in FLOW_TEMPLATES (`state-machine.ts:112-118`), REAL cadence (`config.ts:38-41`), EXPECTED_META_TEMPLATES or the meta dump.
- 48h apology: an old stage 2 job closes without sending (`scheduler.ts:960-961`). It is not on the Meta list.
- lodged_neutral: never sent. Mark Lodged answers 409 `outcome_required` when nothing on record says refund or payable, and stores the team's choice (`actions/route.ts:1496-1502`).
- Signature check-back: `signaturePromisedKey` is written (`service.ts:392`) but nothing reads it. It is dead, so no check-back is sent. Recommend deleting the write.
- Invoice in the estimate: `HIDE_INVOICE_IN_ESTIMATE = true` (`estimate-send.ts:84`), the invoice link is optional, and the template sends one parameter.

Note on the form check-back: a date the customer names at Form Pending still sets `formPromisedKey` (`service.ts:380-386`). It defers the single 6h reminder to that day (`scheduler.ts:1931-1938`). Because fu_form_6h is free text only, it is skipped if the window is closed by then. In practice it rarely sends, but it is still a "named day" deferral. Jo to decide whether the deferral should also go (recommendation: remove `service.ts:380-386`).

## 4. Timing rules: PASS

Evidence:
- First pre-payment nudge: `FIRST_NUDGE_MIN_MS` 20h and `MAX` 23h, evening 17 to 23 Sydney, daytime 7 to 17 as late as possible, otherwise the end of the band (`config.ts:210-237`). It is armed from the last customer message (`scheduler.ts:208-215`). It is not held for the 7pm window while inside the free window (`scheduler.ts:1920-1927`). fu_price_sent takes its slot (`scheduler.ts:1965-1983`).
- Handoff bump: 23h after the last message (`scheduler.ts:488-494`), moved if the customer writes again (`:962-964`). It is free text only via `deliverOut` with `{system:true}` and no template (`:969`). It is skipped when the window is closed; the threshold is 23h50 (`:965`).
- Form reminder: 6h (`config.ts:40`). Will-only, skipped when the window is closed (`scheduler.ts:2124-2133`).
- Signature reminder: 18h after the notice (`config.ts:32`, `scheduler.ts:196`). Nothing is armed before the notice (`:195`).
- Refund check-in: 14 days, refunds only (`review-asks.ts:28`, `actions/route.ts:1543-1548`). The send-time gate also applies (`scheduler.ts:1001-1006`).
- Payment details: 180 to 300 s after the yes (`config.ts:196-198`, `service.ts:729-732`).

## 5. Free text first at every template send: FAIL, fixed

Evidence:
- Every template object literal has `fallbackToText: true` or is built only when `send.outsideWindow` (signature and lodged). `free-text-first-18nov.test.ts` passes.
- The estimate is built only outside the window, with fallbackToText (`actions/route.ts:1390-1392`).
- `deliverOut` sends free text while the window is open (`channel.ts:696-709`).
- The paid-aware sender (`scheduler.ts:452-472`) tries the button inside the window.

Defect: `approve_message` (`actions/route.ts`, approving a held draft) sent the template stored on the draft whatever the window. It used `sendWhatsAppTemplate` directly, which the literal-scanning test does not see. Every draft made in approval mode (follow-ups, form received, ABN questions, Medicare, residency check, payment confirmation) therefore cost a paid template when approved inside the 24h window.

Fix made: when the draft's template carries `fallbackToText`, approve now sends free text inside the window, with the form or residency link on its button. It uses the template only after the window closes, or if Meta refuses the text. A template without `fallbackToText` is unchanged. Test: `src/lib/will/__tests__/approve-free-text-first-18nov.test.ts` (5 cases).

## 6. Meta names, EXPECTED_META_TEMPLATES, meta-dump, parameters: PASS (one recommendation)

Evidence: I ran a copy of `/home/claude/tools/meta-dump.test.ts` with its output sent to /tmp. Its current version calls `refundCheckinTemplateKey` from review-asks.
- The 162 dump rows are exactly the 144 EXPECTED names plus 18 SVT twins: `payment_received[_<lang>]_svt` and `residency_check[_<lang>]_svt`.
- Every name the send paths build is in EXPECTED and vice versa.
- `svtTemplateName` (`brand-voice.ts:192-203`, applied centrally in `sendWhatsAppTemplate`, `channel.ts:444-447`) keeps the 14 brand-neutral bases and renames only payment_received and residency_check.
- Parameters, as code sends them and as EXPECTED and the dump declare:
  - follow-ups and refund_checkin: `[firstName]`.
  - residency_check: `[link]` (`scheduler.ts:1422`).
  - estimate_invoice and estimate_payable: `[amount]`.
  - all others: `[]`.
  - EXPECTED and the dump agree with these counts.

Recommendation: EXPECTED_META_TEMPLATES has no `_svt` twins, so the health panel will not flag a missing SVT twin for Mia. They would be optional notes. Doc drift: decision 018 "Not wired" items 1, 3 and 4 are already wired (flow B in 'will' mode via `priceFlowNew`, the residency check with one parameter, the estimate with one parameter). Fixed a stale comment at `channel.ts:975`.

## 7. Will and Mia the same except number, brand, links and student answers: PASS

Evidence:
- No brand plus language gate is left in engine, service, scheduler, playbook or the language blocks. A scan of all nine blocks for "WHT only", "SVT only", "line only" and similar found nothing.
- The remaining brand branches are the allowed ones:
  - residency quiz keys off for SVT (`engine.ts:398, 761`);
  - `isSvtEnquiry` hands an SVT chat on the WHT number to a person (`service.ts:473, 2175`);
  - SVT template twins;
  - the SVT review link (`review-asks.ts:160`, used at `service.ts:1391, 1413`, `scheduler.ts:1690`).

Note: the partial-answer hold line (`engine.ts:407-411`) exists in en, de and ja only. In other languages a draft with a [TEAM:] point goes whole to the team. This applies to both brands alike, so it is not a brand gate.

## 8. Policy guard in every language: FAIL, partly fixed

Evidence (policyGuard, unpaid, PRICE_SENT, free text):

| Rule | Result |
|---|---|
| Registered-agent claim | blocked in all nine |
| Refund figure ($1,500) before payment | blocked in all nine (FORBIDDEN_AMOUNT) |
| AI words | blocked in all nine |
| Dashes | blocked in all nine |
| myGov DIY steps | blocked in en de es fr it pt; **passed in ja, zh, vi** |

Cause: the Japanese cues sit behind an ASCII `\b`, which never fires between two Japanese characters, and Chinese and Vietnamese had no step cues.

Fixes made:
- `policy-guard.ts`: new `MYGOV_STEP_CUE_CJK_VI` (Japanese and Chinese without `\b`, Vietnamese with letter lookarounds), still only in a clause that names myGov or the ATO.
- Chinese and Vietnamese reassurance phrases added to `MYGOV_REASSURANCE_ML`.
- The approved Brazilian Portuguese myGov reassurance (`instant-choice.ts`, "você não precisa vincular nada nem entrar") was itself blocked as MYGOV_TROUBLESHOOTING before this change. The reassurance list had only the European "não precisas"; "você não precisa" is added.
- Test: `src/lib/will/__tests__/guard-mygov-cjk-vi-18nov.test.ts` (17 cases). The existing nine-language guard test over every fixed text still passes.

Open, not fixed:
- A refund promise without a figure ("You'll definitely get a refund") is blocked in English (TAX_DETERMINATION) but passes in all eight other languages.
- A Vietnamese residency determination ("Bạn là người cư trú thuế Úc") passes.
- `unguardedLanguage` no longer holds a reply (`engine.ts:1488-1498`), so on Autopilot such a model-written sentence would be sent.

## 9. Build and tests: PASS

- `npx tsc --noEmit -p .`: exit 0, before and after the fixes.
- `npx eslint --quiet` on the changed files: clean.
- `npx jest --forceExit` after the fixes: 519 suites, 7068 passed, 2 skipped, 2 failed. The two failures are the known ones (`__tests__/security/sec2-supply-ir.test.ts` and `__tests__/security/supply-chain-secrets.test.js`, missing `.env.example`).
- The first run also failed `src/lib/__tests__/form-translate-18nov.test.ts` once (2114 ms against a 2000 ms limit, while another jest ran at the same time). It passed 3 of 3 times on its own and in the full run after the fixes. This is a load-sensitive timing test.

## Fixes made

1. `src/app/api/will/actions/route.ts`, `approve_message`: free text first for drafts whose template has `fallbackToText`. Test: `approve-free-text-first-18nov.test.ts`.
2. `src/lib/will/policy-guard.ts`: myGov step cues for ja, zh and vi, zh and vi reassurance, and the Brazilian Portuguese reassurance. Test: `guard-mygov-cjk-vi-18nov.test.ts`.
3. `src/lib/will/channel.ts:975`: stale comment only.

## Open items (recommended, for Jo or a follow-up)

1. Guard: a figure-free refund promise and a tax determination are refused in English only (Vietnamese residency too). Add a multilingual certainty + refund rule, run it over every fixed text for false positives, or hold free non-English replies that mention a refund.
2. Remove or relabel the Library rows `estimate` and `lodged` (older wording, sendable by hand) and refresh the quotes in the English language block (Medicare and payment received).
3. Decide whether a named day at Form Pending should still defer the 6h form reminder (`service.ts:380-386`). Delete the unused `signaturePromisedKey` write (`service.ts:389-395`).
4. Add the 18 `_svt` twins to EXPECTED_META_TEMPLATES (optional) so the health panel reports them for Mia.
5. Update decision 018 "Not wired" 1, 3 and 4 (already wired).
6. The partial-answer hold line has en, de and ja only (`engine.ts:407-411`).
7. Live Library rows keep their pre-18-Nov wording until "Sync library from file" is run (decision 018). The estimate's old invoice lines are stripped at send, but other old de/ja wording would still go out.

## Closed 18 Nov

Open items 1 to 5 are fixed, with tests; decision 018 records them and marks "Not wired" 1, 3 and 4 as wired (open item 5). Nothing was sent, committed or installed; no locked English text changed.

1. Guard: a figure-free refund promise ("You'll definitely get a refund", "you will get money back", "guaranteed refund", the last one also new in English) and the residency and Medicare determinations (Vietnamese "Bạn là người cư trú thuế Úc" included) are refused in all nine languages. Chinese and Vietnamese also have the DIY, discount, hedge, non-refundable and Medicare-script rules. No rule weakened; every approved fixed text in every language passes (about 1,900 texts). A free reply in a language outside the nine (Korean, Thai, Arabic, Russian, Hindi, Hebrew) waits for a person; Chinese and Vietnamese, now covered, are no longer held for their language alone. Test: `guard-refund-residency-nine-18nov.test.ts`.
2. Library rows `estimate` and `lodged` removed (and marked obsolete so Sync deletes them); the team's send buttons refuse refund wording for a customer who owes tax; `language-blocks/en.md` quotes the locked Medicare and payment received wording, regenerated. Test: `library-old-estimate-lodged-18nov.test.ts`.
3. A named day at Form Pending skips the 6-hour reminder instead of moving it; the signature named-day write is deleted. Test: `form-named-day-skip-18nov.test.ts`.
4. The 18 `_svt` twins are on EXPECTED_META_TEMPLATES (optional, same parameters), so the health panel reports a missing Mia template. Test: `meta-svt-twins-health-18nov.test.ts`.
5. The partial-answer line exists in all nine languages, no time promise. Test: `partial-hold-line-nine-18nov.test.ts`.

Still open: item 7 (live Library rows keep their older wording until "Sync library from file" is run; that run now also deletes `estimate` and `lodged`).
