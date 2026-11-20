# Vietnamese (vi) language review, 18 Nov

Reviewer: native Vietnamese reviewer. Brief: `BRIEF.md` in this folder. English source never changed.

## 1. Strings checked

| Area | File | Checked |
|---|---|---|
| Fixed messages | `docs/engineering/templates-i18n/vi.json` against `SOURCE.json` `en` (generated into `src/lib/will/template-translations.generated.ts`) | 43 keys, every line |
| Button labels | `src/lib/will/channel.ts` FORM / RESIDENCY / MEDICARE / REVIEW_BUTTON_LABEL `vi` | 4 |
| Free-reply rules | `docs/engineering/language-blocks/vi.md` against `en.md` | whole block, sections 1 to 9 |
| Other vi texts | `svt-fixed-texts.ts` `vi` (12 keys), `account-name.ts` `vi`, `instant-choice.ts` (no vi text; the vi words in PRICE_ASK_RE), `playbook.ts` (only LANG_NAMES; the block and the vi approved texts are injected), `policy-guard.ts` vi rules | all |
| Customer form | `src/lib/form-i18n/vi.ts` against `formStrings.ts` `en` | 86 keys |
| Residency step | `ResidencyStep.tsx`, `ResidencyDeclaration.tsx`, `ResidencyFixPanel.tsx`, `FormStepper.tsx` (vi), `form-brand-svt.tsx` (VI, VI_RES) | about 70 strings |

Checks after editing: `npx tsc --noEmit -p .` clean (exit 0). `npx jest --forceExit` on the three required suites: 3 suites, 269 tests passed. `zh-vi-guard.test.ts` also passes (7/7). Both generators were run: `node scripts/build-template-translations.mjs` and `node scripts/build-language-rules.mjs`. (The template generator also picked up other reviewers' edits to their own `<lang>.json`, as it rebuilds all eight languages.)

Hard rules verified in everything I edited: no em or en dash, no AI or bot mention, no claim that we are a registered tax agent, no new refund promise, figure or time promise, prices unchanged, TFN / ABN / ATO / Medicare / myGov / BSB / DASP in English, placeholders, links, emoji positions and line breaks identical to the English.

## 2. Changes made

### 2.1 `docs/engineering/templates-i18n/vi.json` (regenerated)

| Key | Before | After | Why |
|---|---|---|---|
| PRE_PAYMENT_CHECK_MSG | ...trước khi nộp hồ sơ thuế của bạn **cho ATO**, nên bạn cứ để bên mình lo nhé. 😊 | ...trước khi nộp hồ sơ thuế của bạn, nên bạn cứ để bên mình lo nhé. 😊 | "cho ATO" is not in the English ("before we lodge your tax return"). Nothing added. |
| SIGNATURE_MSG | Mình đã gửi email để bạn xem lại và ký, để bên mình có thể nộp cho ATO. | Mình đã gửi hồ sơ qua email để bạn xem lại và ký, để bên mình có thể nộp. | The object ("it" = the return) was missing, and "cho ATO" was added. English: "I've emailed it to you to review and sign so we can lodge it." |
| NO_DASP_MSG | ...hiện **chưa có**... | ...hiện tại không có... | "chưa có" means "not yet", which hints at a later launch; en.md forbids "soon / later / maybe in the future". English: "isn't available at the moment". |
| RESIDENCY_CHECK_MSG | ...được tính là **cư dân thuế Úc**... | ...được tính là người cư trú thuế Úc... | The form's residency step (the page this message links to) says "Người cư trú thuế Úc"; the customer now sees the same term in both. Same meaning. |
| APPROVED.opening | ...cho **chủ thuê** (TFN)... | ...cho chủ lao động (TFN)... | "chủ thuê" is not standard Vietnamese for "employer"; "chủ lao động" is the normal word (and the one the SVT site uses). |
| MEDICARE_MSG | Nếu đơn không được duyệt, khoản **levy này** vẫn được tính. | Nếu đơn không được duyệt, khoản Medicare levy vẫn được tính. | A bare English "levy" inside Vietnamese is unclear; "Medicare levy" is the term the block and MEDICARE_CANT_HELP_MSG use. Same meaning ("the levy still applies"). |
| _notes | stale notes saying Vietnamese chat is SVT-only and that foreign prices have no Vietnamese text | current notes | The block has been both-brand since 18 Nov; the stale notes contradicted it. |

All other 37 keys match the English in meaning, order, lines, emoji and placeholders. No change.

### 2.2 `docs/engineering/language-blocks/vi.md` (regenerated into `language-rules.generated.ts`)

| Section | Before | After | Why |
|---|---|---|---|
| 2.1 | Open with "Chào {{name}}!"... | Greet on the first message only; use the first name once, do not repeat it | en.md section 2 ("Greet on the first message only... Never repeat the name"). |
| 2.4 | The team speaks as "bên mình". | Adds: "mình" alone = the assistant's own actions; never "mình" for the customer | en.md "We" vs "I". "khoản nào mình được hưởng" (found in svt-fixed-texts) reads as "what *we* are entitled to". |
| 2.6 | not signed as Mia; whether Will is a bot | not signed as Will or Mia; whether Will or Mia is a bot | Removed the one-brand wording. |
| 2.7 / 2.7a | answer first, one question | adds: match their length, calm with money anxiety, sparing exclamation marks, the benefit line once, one warm line after a clear no | Missing en.md section 2 rules. |
| 2.11 | complaints: no emoji, one apology | adds no exclamation marks and the three forbidden complaint phrases | en.md section 6, complaints. |
| 3 Terms: fee, Medicare, DASP, registered tax agent, assistant | see file | fee: "$330 always with its label", never "không rủi ro"; Medicare: adds Medicare Levy Exemption, no steps, no "thử lại"; DASP: "hiện tại không có", never "chưa có / sắp có / sau này"; agent: "registered tax agent" in English, only inside the supervision / sign-off meaning; assistant: adds "hệ thống", "phần mềm" | Same terms and the same "never use" column as en.md. |
| 4 | PRE_PAYMENT_CHECK_MSG and NO_DASP_MSG quotes | updated to the new texts; foreign-income price flow steps listed; HANDOFF_HOLDING marked as the only time promise | Approved phrases quoted in the block must match the code exactly. |
| 5.4 | "Bên mình sẽ kiểm tra và báo lại bạn ở đây." | "Bên mình nhận được rồi, cảm ơn bạn đã gửi nhé." | The old phrase is an "I'll check" promise, which en.md section 6 forbids. The new one is en.md phrase 2 ("Got it, thanks for sending that through"). |
| 6.1 | Never say in chat that we operate under a registered agent's supervision; hand every registration question to the team | Same title ban, plus: no TPB number; when asked, the AGENT_PHRASES.supervision meaning only, opening "Tất nhiên rồi.", with "registered tax agent" in English as a third party, plus the client agreement link; sign-off meaning given in Vietnamese; any other registration question goes to the team | The block contradicted itself (section 4 said to write AGENT_PHRASES in Vietnamese, 6.1 forbade it) and differed from en.md (the legitimacy answer) and zh.md 8.2. Now the same rule as English. See section 4 below. |
| 6.3 | guarantee only in TFN texts | adds: never for a return already lodged; only when asked; never widened; a customer who claims it goes to the team | en.md section 6. |
| 6.9 | prices only | adds: $330 never without its label; no other currency (VND), no conversion, no IBAN / SWIFT | en.md "Money". |
| 6.10 (new) | none | Date and day-count promises, with Vietnamese examples ("sớm", "ngay", "hôm nay", "trong 24 giờ"...) and the only allowed day counts | Missing from vi; en.md section 6. |
| 6.11, 6.12 (new) | none | Social proof; customers who owe tax | Missing from vi; en.md section 6. |
| 7.5 to 7.7 (new) | none | default length (about 40 English words), the 450-character guard, approved texts not padded or shortened, one emoji, no restating, shorter after payment | Missing from vi; en.md section 7. |
| 8.2 | guard checks "chúng tôi là..." | adds: the guard does not check the same sentences with "bên mình", so the model must keep 6.1 and 6.3 itself | Accurate description of `policy-guard.ts`. |
| 8.4 / 8.6 | every registration or supervision question to the team | registration questions beyond the supervision meaning; new 8.6 = en.md 8.5 and 8.6 (handoff cases, holding line only) | Same handoff rules as English. |

Nothing in the block limits Vietnamese to one brand.

### 2.3 `src/lib/form-i18n/vi.ts`

| Key | Before | After | Why |
|---|---|---|---|
| registeredAgentNo | Hoạt động dưới sự giám sát của đại lý thuế đã đăng ký, số đăng ký | Số đăng ký của registered tax agent giám sát | English is a label, "Supervising registered tax agent no.", followed by the number (`FormClient.tsx` alt text). The old text added "operates" and used the local title "đại lý thuế đã đăng ký", which the brief and the chat block forbid. It now matches es ("registered tax agent" in English) and the chat block. It still contains "giám sát" (test pinned). |
| stepRefund | ...rồi nộp **lên** ATO | ...rồi nộp cho ATO | Same lodging term as the chat ("nộp cho ATO"). |
| header comment | | a second line pointing to this review | The test pins the original first line, so it stays. |

All other keys: same meaning as the English (checked one by one; a previous form review already fixed 14 of them). Kept on purpose (same practice as zh and es; Jo may decide): `phGiven` "Viết không dấu, đúng như trên hộ chiếu", `phLast` "ví dụ NGUYEN", `phJob` / `phCountry` "(vui lòng ghi bằng tiếng Anh)", `phCountry` example "Vietnam", `phHowHeard` "Facebook" instead of "Instagram", `phWaNumber` / `invalidPhone` with +84. These are local placeholder examples, not new facts.

## 3. Shared-file changes for another agent (exact)

| # | File | Key or line | Current text | Corrected text | Why |
|---|---|---|---|---|---|
| 1 | `src/lib/will/svt-fixed-texts.ts` | `vi` `price_tfn`, `price_tfn@first`, `price_tfn_abn`, `price_tfn_abn@first` | `để bạn không bỏ sót khoản nào mình được hưởng` | `để bạn không bỏ sót khoản nào bạn được hưởng` | In this voice "mình" is us: it now reads "anything *we* are entitled to". English: "you're entitled to". The templates already say "bạn được hưởng". |
| 2 | same file | `vi` all eight price and review keys (`price_tfn`, `price_tfn_abn`, `price_tfn_review`, `price_tfn_abn_review` and their `@first`) | `Bạn chuyển khoản xong thì gửi ảnh chụp màn hình, bên mình bắt đầu làm ngay nhé!` | `Bạn chuyển khoản xong thì gửi ảnh chụp màn hình, bên mình sẽ bắt đầu làm nhé!` | "ngay" (immediately) is a time promise the English does not make ("we'll get started"). Matches PRICE_FLOW_PAYMENT_DETAILS. |
| 3 | same file | `vi` `price_tfn`, `price_tfn_abn` (first words) | `Dạ, vậy là gói TFN, $220.` / `Dạ, vậy là gói TFN + ABN, $385.` | `Mình hiểu rồi, vậy là gói TFN, $220.` / `Mình hiểu rồi, vậy là gói TFN + ABN, $385.` | English "Got it, so that's the ... option". "Dạ" is an opener the vi block forbids (6.2), and the price flow texts use "Mình hiểu rồi". |
| 4 | same file | `vi` `price_tfn`, `price_tfn@first` | `Nếu không có tiền hoàn thuế thì phí vẫn giữ nguyên.` | `Nếu không có tiền hoàn thuế, phí đầy đủ của bên mình vẫn được áp dụng.` | English "our full fee applies"; identical wording to PRICE_FLOW_STEPS_TFN. "phí vẫn giữ nguyên" ("the fee stays the same") is vaguer. |
| 5 | same file | `vi` `price_tfn_review`, `price_tfn_review@first` | `nộp lại tờ khai đã sửa` | `nộp lại hồ sơ thuế đã sửa` | Term table: return = "hồ sơ thuế". |
| 6 | `src/lib/will/channel.ts` | RESIDENCY_BUTTON_LABEL `vi` | `Mở trang` | `Kiểm tra cư trú thuế` (20 characters) | English "Tax residency test"; "Mở trang" means "Open page". Note: de, ja, es, fr, it, pt, zh all say "open page" too; Jo to decide for all. |
| 7 | same file | MEDICARE_BUTTON_LABEL `vi` | `Xem video` | `Cách nộp đơn` | English "How to apply"; "Xem video" means "Watch video". Same pattern in the other languages; Jo to decide. |
| 8 | same file | FORM_BUTTON_LABEL `vi` (optional) | `Bắt đầu` | `Bắt đầu tại đây` | English "Start here"; 15 characters. |
| 9 | same file | REVIEW_BUTTON_LABEL `vi` (optional) | `Viết đánh giá` | `Để lại đánh giá` | English "Leave a review"; matches REVIEW_ASK_SHORT_MSG ("để lại ... đánh giá"). |
| 10 | `src/components/ui/ResidencyFixPanel.tsx` | `vi.intro` | `Bạn vui lòng chọn mục đúng nhất với mình.` | `Bạn vui lòng chọn mục đúng nhất với bạn.` | "mình" can read as "us". English "the option that best describes you". |
| 11 | `src/components/svt/form-brand-svt.tsx` | `VI_RES.confirmLead`, last sentence | `Chúng tôi sẽ kiểm tra lại trước khi nộp.` | `Chúng tôi sẽ kiểm tra lại câu trả lời của bạn trước khi nộp bất cứ điều gì.` | English "We check your answer before anything is lodged": the object was missing. |
| 12 | `src/components/ui/ResidencyStep.tsx` | `vi.introEmph` (optional) | `Điều này không phụ thuộc vào tình trạng visa của bạn.` | `Tình trạng này tách biệt với tình trạng di trú (visa) của bạn.` | English "It is separate from your immigration status". Current text is close; this is exact. |
| 13 | `src/lib/will/instant-choice.ts` | PRICE_ASK_RE, the last alternative | `\|chi ph[ií]/i` | `\|chi ph[ií] (?:là )?bao nhi[eê]u/i` | "chi phí" means any cost or expense ("chi phí đi lại", "chi phí công việc"), so a Vietnamese customer talking about work expenses is read as asking our price. |
| 14 | `src/lib/will/policy-guard.ts` (not on the brief's list, for engineering) | the vi agent-claim pattern; ZH_VI_REFUND_PROMISE; AI_MENTION | only `chúng tôi là ...`, `chúng tôi sẽ hoàn lại ...`; AI_MENTION has no Vietnamese "virtual assistant" | add `(?:bên\s+mình\|mình)` as an alternative to `chúng\s+tôi` in both vi patterns; add `trợ lý ảo\|người máy` to AI_MENTION | The vi voice is "bên mình", so "bên mình là đại lý thuế" and "bên mình sẽ hoàn lại phí" pass the guard today. Free vi replies are held for a person, so the risk is low, but the guard should match the voice. |
| 15 | `src/lib/will/instant-choice.ts` (optional) | MYGOV_REASSURANCE: add `vi` | (none: a vi customer gets no reassurance) | `vi: 'Bạn không cần lo về myGov: bạn không phải liên kết gì hay tự đăng nhập. Bên mình làm việc trực tiếp với ATO, và tiền hoàn thuế (nếu có) sẽ được chuyển thẳng vào tài khoản ngân hàng Úc của bạn.'` | Same meaning as the English line. de and ja have one. |

## 4. For Jo

1. **Agent question in Vietnamese (block 6.1).** Before, a Vietnamese "are you registered / legit?" always went to the team with no draft, while English answers "Of course. We operate under the supervision of a registered tax agent." plus the client agreement link. The block also contradicted itself. I aligned it with English and Chinese: the supervision meaning only when asked, "registered tax agent" kept in English as a third party, no local title ("đại lý thuế") and no number. Free Vietnamese replies are still held for a person before sending. If you want Vietnamese to keep handing these to the team, revert 6.1 and 8.4.
2. **Button labels** (table rows 6 and 7): in all eight languages the residency and Medicare buttons say "Open page" / "Watch video", not "Tax residency test" / "How to apply". Please decide for all languages together.
3. **SVT Medicare question** (`form-brand-svt.tsx` VI and ZH `hasMedicare`): Vietnamese and Chinese students see an extra sentence, "(OSHC is not Medicare)", that the English SVT form does not have. Either add it to English or remove it from vi and zh.
4. **Register on forms vs chat:** the forms say "chúng tôi" and "tờ khai" (the site's convention); the chat says "bên mình" and "form". Both are normal Vietnamese for their medium, so I left them. Tell me if you want one wording everywhere.
5. Still open from the translators: REVIEW_ASK_SHORT_MSG ends with `{{1}}` (Meta template rule), and EXPENSES_INTAKE_MSG is over 1024 characters (both also true in English).

## 5. Verdict

Fixed messages: good. They are natural, warm and identical in meaning to the English after six small fixes (two additions removed, one "not yet" hint removed, one missing object, two word choices).
Free-reply rules: now the same rules, tone and forbidden content as en.md, for both brands. Before this review, the date-promise, money, social-proof, owe-tax and length rules were missing, and the agent rule contradicted itself.
Forms and residency step: identical in meaning, apart from the deliberate local placeholder examples listed in 2.3. One local agent title was removed.
The remaining issues are in shared files (section 3). The most important are rows 1 to 2 ("mình được hưởng" and "ngay" in the old one-message price texts) and row 13 (the price-question regex).

## Applied 18 Nov

Applied:
1. svt-fixed-texts.ts: "bạn được hưởng"; "bên mình sẽ bắt đầu làm nhé!" (no "ngay"); "Mình hiểu rồi" instead of "Dạ"; the guarantee as in the price flow; "hồ sơ thuế đã sửa".
2. channel.ts: RESIDENCY "Kiểm tra cư trú thuế" (20 characters), MEDICARE "Cách nộp đơn", FORM "Bắt đầu tại đây", REVIEW "Để lại đánh giá".
3. ResidencyFixPanel vi.intro "với bạn"; VI_RES.confirmLead (with "Bên mình"); ResidencyStep vi.introEmph.
4. instant-choice.ts PRICE_ASK_RE: "chi phí" alone is no longer a price question, only "chi phí (là) bao nhiêu".
5. policy-guard.ts: "bên mình"/"mình" in the agent-claim and refund-promise checks; "trợ lý ảo" and "người máy" as AI words. Tests with your sentences.
6. MYGOV_REASSURANCE.vi added; AGENT_PHRASES.vi (supervision, signed off, "Tất nhiên rồi." legitimacy).
7. Forms vs chat (Jo, decision 10): the vi form and residency pages say "bên mình" and "form" (not "chúng tôi", "tờ khai"), except the signed declaration ("tôi").
8. Names: Vietnamese greets with the given name, the last word of the profile name (chat, follow-ups and the form's thank-you screen), with tests.

Not applied: nothing else open in this report.
Checks after applying: `npx tsc --noEmit -p .` clean; full `npx jest --forceExit` passing except the two security suites that need `.env.example`.
