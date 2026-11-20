# Culture and etiquette review: asia group (zh, vi)

Reviewer brief: `CULTURE-BRIEF.md` (Jo, 18 Nov). No file was edited. Files read: `docs/engineering/language-blocks/en.md`, `zh.md`, `vi.md`; `src/lib/will/template-translations.generated.ts` (zh and vi entries, compared with `docs/engineering/templates-i18n/SOURCE-current.json` English); `src/lib/will/svt-fixed-texts.ts`; `src/lib/form-i18n/zh.ts`, `vi.ts`, `index.ts`; `src/lib/formStrings.ts`; `src/lib/will/approved-messages.ts` (`withGreetingName`); `src/lib/will/text-normalize.ts` (`firstNameOf`, `cleanFirstName`); `src/lib/will/i18n.ts` (`unsupportedScript`).

Where a proposal touches a fixed text, the edit belongs in `docs/engineering/templates-i18n/<lang>.json` and the generated file is then rebuilt with `scripts/build-template-translations.mjs`. Block edits need `language-rules.generated.ts` rebuilt.

---

## 1. Simplified Chinese (zh)

Audience: mainland students and working holiday makers, plus Taiwan and Hong Kong readers, aged roughly 18 to 30.

### What is right

- 你 everywhere, never 您, 先生 or 女士 (block 2.1). For this age group in a chat app this is the natural register in all three regions, and it is used the same way in the block, every fixed text, `svt-fixed-texts.ts` and the form (`form-i18n/zh.ts`). Consistent.
- 嗨 as the greeting, 麻烦你 for requests, 谢谢 / 不客气 for thanks: warm and current, not salesy.
- The slang ban (2.9: 亲, 宝子, 家人们, yyds and so on) is exactly right. 亲 in particular reads as Taobao seller talk and would cheapen the service.
- Complaints with no emoji (2.10).
- Terms table: keeping TFN, ABN, Medicare, ATO in English is right; Chinese students in Australia use these words as is, and invented Chinese equivalents (税号, 医保) cause confusion.
- Full-width punctuation in prose, ASCII colons for bank lines (7.5).
- Money as `$220` with no cents (7.4).
- The guarantee sentence (如果你的退税比我们的费用少，差额我们退给你。如果没有退税，费用照常全额收取。) is clear, calm and exact to the English. 照常 softens "full fee applies" without changing it. Good.
- OWN_ACCOUNT, BANK_DOCUMENT and NO_DASP open with 抱歉 / 很抱歉 before the no: correct Chinese service etiquette.
- Form placeholders show family name and given name separately in passport order (WEI / ZHANG), which avoids the classic name-order mistake.
- 🙏 on the review ask is read as "please / thank you" in Chinese chat, not as prayer. Fine.

### Problems

**Z1. Name taken from the wrong end for pinyin names (code, affects greeting and every follow-up)**
- Where: `src/lib/will/text-normalize.ts` `firstNameOf` (line 164) takes the first word of the WhatsApp profile name; `withGreetingName` (`approved-messages.ts` line 393) then writes 嗨 {name}！. Follow-ups `FOLLOWUP_MSG.*` and `REFUND_CHECKIN_MSG` use the same {{1}}.
- Current result: profile "Wang Xiaoming" gives 嗨 Wang！; profile "王小明" gives 嗨 王小明！ (fine).
- Proposed: for a zh chat, when the profile name is Latin script and its first word is a common Chinese surname (Wang, Li, Zhang, Liu, Chen, Yang, Huang, Zhao, Wu, Zhou, Xu, Sun, Ma, Zhu, Hu, Guo, He, Lin, Luo, Gao, and the Taiwan / Hong Kong spellings Chang, Cheung, Chan, Wong, Lee, Lau, Ng, Ho, Tsai, Hsu), send the greeting with no name (嗨！很乐意帮你😊). Use a name only when it is a single word, or when the customer states it (我叫..., 我是...).
- Why: greeting someone by the family name alone, with no title, reads as odd or curt in Chinese. Leaving the name out is always polite.

**Z2. Name and emoji frequency rules do not reflect Jo's rule**
- Where: `zh.md` line 15 (2.2) and line 103 (6.8).
- Current 2.2: "Use a first name only when the code supplies one through {{name}}. Never guess a name."
- Proposed 2.2: "Use the name only when the code supplies one through {{name}}, once per conversation, in the greeting. Never repeat it in later replies; only the follow-up reminders use it again. Never guess a name."
- Current 6.8: "Free text has at most one 😊, at the end of a line."
- Proposed 6.8: "One emoji at the start of the conversation (the opening carries it). After that, free text has no emoji unless it fits completely, at most one 😊 at the end of a line. No emoji in money, refusal or complaint replies."
- Why: matches en.md 2 and 7 and Jo's rule; Chinese chat tolerates emoji, but repeated 😊 from a business reads as filler.

**Z3. Complaints: exclamation marks not forbidden, no apology phrase given**
- Where: `zh.md` line 23 (2.10) and section 5 (lines 83 to 92).
- Current 2.10: "Complaints and upset customers: plain and neutral, with no emoji."
- Proposed 2.10: "Complaints and upset customers: plain and neutral, with no emoji and no ！. One apology, then the next step. Never 你为什么联系我们, never blame the customer."
- Proposed new 5.10: 很抱歉给你带来了困扰。 "For a complaint or a frustrating delay. No emoji."
- Why: en.md forbids exclamation marks in complaints; zh does not. A Chinese customer expects a short clear 抱歉 plus what happens next; 很抱歉给你带来了困扰 is the standard, sincere form without being stiff.

**Z4. Saying no: one fixed text is blunter than the English**
- Where: `template-translations.generated.ts` line 61, key `OWN_ACCOUNT_MSG.zh`.
- Current: 很抱歉，这样是不行的。银行账户必须在你本人名下，并显示你的个人信息。
- Proposed: 很抱歉，这样没办法。银行账户必须在你本人名下，并显示你的个人信息。
- Why: 不行 is a flat "not allowed" and reads as a rule being enforced at the customer. 没办法 ("there is no way to do it") is the soft service no, closer to English "Unfortunately that's not possible". Meaning unchanged.

**Z5. Handoff bump repeats 跟 and reads clumsy**
- Where: line 161, `HANDOFF_BUMP_MSG.zh`.
- Current: 很抱歉让你久等了。我已经帮你跟团队跟进了。
- Proposed: 很抱歉让你久等了。我已经帮你再跟团队跟进了一下。
- Why: 跟...跟进 back to back sounds machine-written; 再...一下 is how a person writes "I've followed up for you". Same meaning (no time promise added).

**Z6. Fixed price texts add "right away" (a time promise)**
- Where: `svt-fixed-texts.ts` lines 18 to 25 (all zh `price_*` keys).
- Current ending: 付款后发个截图给我们，我们就马上开始！
- Proposed ending: 付款后发个截图给我们，我们就开始处理！
- Why: English is "Just send a screenshot once paid and we'll get started!" with no "immediately". 马上 is a timing promise that en.md 6 forbids and that the zh price flow message 2 already avoids (我们就开始处理！). This makes the two texts consistent.

**Z7. Form uses a term the block forbids**
- Where: `src/lib/form-i18n/zh.ts` line 25 `tfn` and line 74 `invalidTfn`.
- Current: 税号（TFN） / 税号（TFN）应为 8 位或 9 位数字
- Proposed: TFN（Tax File Number） / TFN 应为 8 位或 9 位数字
- Why: `zh.md` terms table says never 税号 for TFN. The chat says TFN; the form should match so the customer sees one word for one thing.

**Z8. Block text that does not match the code or points to missing sections**
- `zh.md` line 16 (2.3): says the opening reads 嗨 {{name}}！😊. The real opening is 嗨！很乐意帮你😊 and `withGreetingName` makes it 嗨 {{name}}！很乐意帮你😊. Proposed: "The approved opening reads 嗨！很乐意帮你😊. With a name, the code makes it 嗨 {{name}}！很乐意帮你😊. Do not add a greeting of your own to a fixed text." Why: the model may otherwise write a second greeting.
- `zh.md` line 98 (6.3): "The only guarantee is the sentence in 4.13." There is no 4.13. Proposed: "the sentence in 4.2."
- `zh.md` line 111 (7.5): "as in 4.6". There is no 4.6. Proposed: "as in PRICE_FLOW_PAYMENT_DETAILS_TEXT (section 4)."

**Z9. No guidance on dates and numbers**
- Where: `zh.md` section 7, add 7.6.
- Proposed 7.6: "Dates as 2026年11月18日 or 11月18日, never 11/18 or 18/11. Financial year as 2025-26 财年 (ASCII hyphen). Thousands with a comma: 5,000 公里. Money stays $220, $385 and so on; never 澳币 or 人民币 amounts, never a conversion."
- Why: slash dates are read month-first in mainland habit and day-first in Australia; the written form removes the doubt. Keeps the dash rule.

**Z10. Money questions: no polite way to decline bargaining**
- Where: `zh.md` section 5, add 5.11.
- Proposed 5.11: 我们的费用是固定的，不过里面包括了全面审核和提交报税。 "When asked for a discount (能便宜点吗, 有优惠吗). No discount, no pressure, say the fee once."
- Why: asking for a discount is normal and not rude in Chinese consumer culture; the reply should be calm and factual, not apologetic or defensive. Meaning is the same as NOT_OUR_PRICE_MSG.

**Z11. Missing English rules (consistency)**
- Where: `zh.md` section 6.
- Missing versus en.md: no team timelines with the zh words (马上, 很快, 今天, 尽快, 24 小时内, 明天, 我查一下); customers who owe tax get no refund wording and are never told to call the ATO; never ask for a Google review in free text; after a clear no, one warm closing line then stop (proposed phrase: 好的，明白了。以后需要的话随时找我。).
- Proposed: add these as 6.9 to 6.11 and 5.12, mirroring en.md.

**Z12. Minor punctuation**
- `PRE_PAYMENT_CHECK_MSG.zh` (line 21) ends 交给我们就好。 😊 (full stop then space then emoji); `NO_REFUND_CASES_MSG.zh` ends 之一 😊 with no full stop. Proposed: 交给我们就好 😊 for the first, to match. Cosmetic only.

### For Jo (zh)

1. **Traditional Chinese readers.** `unsupportedScript` treats any Han text as zh, so a Taiwan or Hong Kong customer writing 繁體 gets Simplified replies. They will understand, but some feel it is a mainland service. Options: (a) keep as is; (b) let the model answer free text in Traditional when the customer writes Traditional, fixed texts staying Simplified. Your call; I would at least allow (b) for free replies.
2. **Mainland vocabulary** in fixed texts (截图, 网约车, 外卖, 银行卡, 邮箱) is understood in Taiwan and Hong Kong. No change needed.
3. **$ sign.** Some mainland readers read $ as US dollars. The rule says prices stay $220, so I propose no change; the expenses text already says 澳分, which helps. Flagging only.
4. Z1 needs a small code change, not a text change.

---

## 2. Vietnamese (vi)

Audience: Vietnamese students (visa 500 and 485) and working holiday makers (462), mostly 18 to 30.

### What is right

- "bạn" for the customer and "bên mình" / "mình" for the team: the exact register Vietnamese online businesses use with young customers. Warm, respectful, not stiff. "chúng tôi" would sound like a bank letter.
- 2.3 forbids "mày", "tao", "cậu", "tớ" (too intimate or rude) and "ông", "bà" (too old or formal). Correct.
- 2.2 "never guess age from a name" is the right instinct for kinship pronouns.
- Sales slang ban (2.8: "chốt đơn", "ôm sale", "kẻo mất giá") and crude words (7.2) are exactly what to avoid; these phrases are tied to Facebook live sellers.
- Standard spelling, never "ko", "dc" (7.1).
- Payment claims and complaints with no emoji (2.10, 2.11).
- Refusals in fixed texts are soft and natural: "Rất tiếc là không được bạn ạ." (OWN_ACCOUNT) and "Xin lỗi bạn, nhưng..." (BANK_DOCUMENT). The particle "ạ" and "nhé" give exactly the polite softening Vietnamese expects.
- "visa du học" and "visa tốt nghiệp" instead of "visa sinh viên": right.
- Expenses intake writes 5.000 km (Vietnamese thousands separator) while prices stay $220. Correct split.

### Problems

**V1. Name taken from the family name (code, affects greeting and every follow-up)**
- Where: `text-normalize.ts` `firstNameOf` (line 164), `withGreetingName` (`approved-messages.ts` line 395), `svt-fixed-texts.ts` lines 34 and 36 ({{name}}), and every `FOLLOWUP_MSG.*` / `REFUND_CHECKIN_MSG` ({{1}}).
- Current result: profile "Nguyễn Văn An" or "Nguyen Thi Lan" gives "Chào Nguyễn!" / "Chào Nguyen😊".
- Proposed: for a vi chat, if the profile name has two or more words and the first is a common Vietnamese family name (Nguyễn, Trần, Lê, Phạm, Hoàng, Huỳnh, Phan, Vũ, Võ, Đặng, Bùi, Đỗ, Hồ, Ngô, Dương, Lý, with and without marks), use the last word ("Chào An!"). If unsure, send no name ("Chào bạn!").
- Why: Vietnamese address people by the given name, which is the last word. "Chào Nguyễn" is like greeting a whole country of people; about 40 percent of Vietnamese share it. This is the most visible cultural error found.

**V2. Kin-term rule is ambiguous and can make us talk down to the customer**
- Where: `vi.md` line 17 (2.2).
- Current: "If the customer uses a kin term ("anh", "chị", "em", "cô", "chú"), mirror it with the first name, for example "chị Lan". Never guess age from a name."
- Proposed: "If the customer calls themselves "anh" or "chị", address them the same way ("chị", or "chị Lan" in the greeting only). If they call themselves "em", keep "bạn": never call a customer "em". If they call themselves "cô" or "chú", address them that way and keep "bên mình" for the team. Never guess age from a name."
- Why: a customer who writes "em muốn hỏi" is being polite to us; answering "em" puts the business above the customer. The current wording ("mirror it") can be read either way. Also aligns with Jo's name-once rule.

**V3. Name and emoji frequency rules do not reflect Jo's rule**
- Where: `vi.md` line 15 (2.1) and line 127 (6.7).
- Current 2.1: "Default address is "bạn". Open with "Chào {{name}}!" when the first name is known, or "Chào bạn!" when it is not."
- Proposed 2.1: "Default address is "bạn". Open with "Chào {{name}}!" when the given name is known, or "Chào bạn!" when it is not. Use the name once per conversation, in that greeting; only follow-up reminders use it again."
- Current 6.7 starts: "At most one emoji in any free message that mentions money."
- Proposed: add at the start: "One emoji at the start of the conversation (the opening carries it). After that, an emoji only where it fits completely."
- Why: en.md 2 and 7, and Jo's rule.

**V4. Meaning error: final review is ours, not the customer's**
- Where: `template-translations.generated.ts` line 202 `ESTIMATE_INVOICE_MSG.vi` and line 212 `ESTIMATE_PAYABLE_MSG.vi`.
- Current: "Mình sẽ gửi hồ sơ thuế để bạn xem lại lần cuối, rồi sau đó gửi để bạn ký."
- Proposed: "Mình sẽ chuyển hồ sơ thuế đi kiểm tra lần cuối, rồi sau đó gửi để bạn ký."
- Why: English is "I'll send your tax return for final review and then for your signature": the final review is done by our side before signing. The Vietnamese says the customer will do a final review, which changes meaning and may make the customer think they must check the return themselves. zh is correct here.

**V5. "mình" used for the customer in fixed price texts**
- Where: `svt-fixed-texts.ts` lines 34 to 37 (`price_tfn@first`, `price_tfn`, `price_tfn_abn@first`, `price_tfn_abn`).
- Current: "...để bạn không bỏ sót khoản nào mình được hưởng."
- Proposed: "...để bạn không bỏ sót khoản nào bạn được hưởng."
- Why: everywhere else "mình" means us. Here it means the customer, so the sentence can be read as "anything we are entitled to". `APPROVED.prices.vi` already says "bạn được hưởng".

**V6. Fixed price texts add "right away" and word the guarantee differently**
- Where: `svt-fixed-texts.ts` lines 34 to 41.
- Current ending: "Bạn chuyển khoản xong thì gửi ảnh chụp màn hình, bên mình bắt đầu làm ngay nhé!"
- Proposed ending: "Bạn chuyển khoản xong thì gửi ảnh chụp màn hình, bên mình sẽ bắt đầu làm nhé!"
- Why: "ngay" (immediately) is a time promise the English does not make; the price flow message 2 already uses the proposed wording.
- Current guarantee second sentence (lines 34, 35): "Nếu không có tiền hoàn thuế thì phí vẫn giữ nguyên."
- Proposed: "Nếu không có tiền hoàn thuế, phí đầy đủ của bên mình vẫn được áp dụng."
- Why: "phí vẫn giữ nguyên" ("the fee stays the same") is vaguer than "our full fee applies" and differs from the price flow text (line 392). One guarantee, one wording.

**V7. "I'll check" phrase in the free-phrase list**
- Where: `vi.md` line 105 (5.4).
- Current: "Bên mình sẽ kiểm tra và báo lại bạn ở đây."
- Proposed: "Mình ghi nhận rồi nhé, cảm ơn bạn."
- Why: en.md 6 forbids "I'll check" and any implied team timeline; a question that needs checking goes to the handoff holding line. The proposed line acknowledges without promising.

**V8. Complaints: no exclamation rule and no apology phrase**
- Where: `vi.md` line 35 (2.11) and section 5.
- Current 2.11: "Complaints and refund requests: plain tone, no emoji, one apology, no excuses, no date. The team replies here."
- Proposed 2.11: "Complaints and refund requests: plain tone, no emoji, no exclamation marks, one apology, no excuses, no date. The team replies here."
- Proposed new 5.8: "Bên mình thành thật xin lỗi vì chuyện này đã làm bạn khó chịu." (For a complaint. No emoji.)
- Why: en.md 6; "thành thật xin lỗi" is the sincere service apology in Vietnamese, without the over-formal "chúng tôi vô cùng lấy làm tiếc".

**V9. Form uses "chúng tôi" while chat uses "bên mình"; and "tờ khai" for the form**
- Where: `src/lib/form-i18n/vi.ts`.
- Current, for example: line 9 `titleTax` "Cho chúng tôi biết một chút về bạn"; line 95 `linkUsedBody` "...chúng tôi đã có thông tin của bạn..."; line 103 `etaLabel` "Chúng tôi thường nhắn cho bạn trong vòng 24 giờ"; line 94 `linkUsedTitle` "Tờ khai này đã được gửi rồi"; line 105 `waPrefill` "Mình vừa gửi tờ khai xong 😊".
- Proposed: replace "chúng tôi" with "bên mình" in `titleTax`, `titleTaxSub`, `whatsapp`, `waHint`, `howHeard`, `somethingWrong`, `linkUsedBody`, `successNextLead`, `stepWhatsApp`, `etaLabel`, `msgWhatsApp` (for example `titleTax`: "Cho bên mình biết một chút về bạn"; `etaLabel`: "Bên mình thường nhắn cho bạn trong vòng 24 giờ"). Replace "tờ khai" with "form" in `waHint`, `linkUsedTitle` ("Form này đã được gửi rồi") and `waPrefill` ("Xin chào! Mình vừa gửi form xong 😊"). Keep "Tôi" in `declaration` (a signed statement is first person).
- Why: the brief asks for one register everywhere. The chat says "bên mình" and "form" (FORM_RECEIVED, PAYMENT_RECEIVED). "Tờ khai" also means a tax declaration, so a customer may think they just lodged their return.

**V10. Smaller wording points in fixed texts**
- Line 162 `HANDOFF_BUMP_MSG.vi`. Current: "Xin lỗi đã để bạn chờ. Mình đã nhắc lại đội ngũ giúp bạn rồi." Proposed: "Xin lỗi đã để bạn chờ. Mình đã nhắc lại với đội ngũ giúp bạn rồi." Why: "nhắc lại đội ngũ" reads as "repeated the team"; "nhắc lại với" is "followed up with".
- Line 152 `HANDOFF_HOLDING_MSG.vi`. Current: "...và thường họ sẽ trả lời bạn ở đây..." Proposed: "...và thường đội ngũ sẽ trả lời bạn ở đây..." Why: "họ" ("they") for our own team sounds distant, as if passing the customer to strangers.
- Line 222 `SIGNATURE_MSG.vi`. Current: "Mình đã gửi email để bạn xem lại và ký..." Proposed: "Mình đã gửi hồ sơ qua email để bạn xem lại và ký..." Why: the object (the return) is missing; English "I've emailed it to you".

**V11. Rules that differ from the English and from zh (consistency)**
- `vi.md` line 115 (6.1), line 52 (terms row "registered tax agent") and 8.4: Vietnamese chats may never say the service operates under the supervision of a registered tax agent; the question always goes to the team. en.md gives an approved line ("Of course. We operate under the supervision of a registered tax agent." plus the client agreement link) and zh 8.2 allows its meaning. The vi form itself shows "Hoạt động dưới sự giám sát của đại lý thuế đã đăng ký" (`vi.ts` line 13). See For Jo 1.
- `vi.md` line 25 (2.6): "Replies are not signed as Mia ... whether Will is a bot". Proposed: "Replies are not signed as Will or Mia ... whether Will or Mia is a bot". Why: both brands.
- Missing versus en.md, to add in section 6: no team timelines with the vi words ("sớm", "ngay", "hôm nay", "trong 24 giờ", "ngày mai", "để mình kiểm tra"); no social proof (rating, review count, "hàng nghìn khách"); never ask for a Google review in free text; customers who owe tax get no refund wording and are never told to call the ATO; after a clear no, one warm closing line then stop (proposed phrase: "Mình hiểu rồi. Sau này cần gì bạn cứ nhắn bên mình nhé.").

**V12. No guidance on dates and numbers**
- Where: `vi.md` section 7, add 7.5.
- Proposed 7.5: "Dates day first: ngày 18/11/2026 or 18 tháng 11. Financial year: năm tài chính 2025-26 (ASCII hyphen). Thousands with a dot and decimals with a comma in prose (5.000 km), but prices stay exactly $220, $385, $330, $440, $495: never $220.000, never "đô", never VND."
- Why: Vietnamese and English swap the dot and comma; without this the model may write $1.000 or convert to VND.

**V13. Money questions: no polite way to decline bargaining**
- Where: `vi.md` section 5, add 5.9.
- Proposed 5.9: "Phí của bên mình là cố định bạn nhé, đã gồm việc xem xét đầy đủ và nộp hồ sơ thuế cho bạn." (When asked "bớt được không", "có giảm giá không". No discount, say the fee once.)
- Why: asking "bớt" is normal in Vietnamese buying; a soft "bạn nhé" keeps it friendly and closes the topic without sounding defensive.

### For Jo (vi)

1. **Supervision line (V11).** Vietnamese is the only language that cannot say "we operate under the supervision of a registered tax agent" in chat. If that is deliberate (guard risk), keep it; if not, a safe wording would be "Tất nhiên rồi. Bên mình hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký." This does not claim we are the agent, but the guard's vi checks would need to allow it.
2. **V1 and V4 are the two most important vi fixes**: the name (code change) and the final review meaning (template change).
3. The "Dạ" opener in `svt-fixed-texts.ts` `price_tfn` ("Dạ, vậy là gói TFN") is fine and polite; it differs from the price flow ("Mình hiểu rồi") but both are natural. No change proposed.

---

## 3. Shared notes for both languages

- Both blocks quote the follow-ups with the name ({{1}}). That matches Jo's rule (name again only in follow-up reminders), as long as Z1 and V1 make the name correct.
- The comments in `form-i18n/zh.ts` and `vi.ts` say "not checked by a native speaker". The form texts read well apart from Z7 and V9, but a native check before launch is still advised.
- No proposal above mentions AI or bots, claims we are a registered tax agent, uses an em or en dash, or changes a price.

## Applied 18 Nov

Applied: Z1 (no name for a Latin-letter name with a common Chinese family name first; code and tests), Z2, Z3, Z4 (没办法), Z5, Z6 (马上 removed), Z7 (already in zh.ts), Z8, Z9 (dates and numbers), Z10 (discount phrase), Z11, Z12; V1 (given name = last word, chat, follow-ups and the form's thank-you screen; tests), V2 (kin terms, never "em"), V3, V4 (the estimate no longer says the customer does the final review), V5, V6, V7 (already in vi.md), V8, V9 (the form says "bên mình" and "form"), V10, V11 (supervision line with "registered tax agent" in English, AGENT_PHRASES.vi; the guard now reads "bên mình"), V12, V13.

Not applied: For Jo (zh) 1 (Traditional Chinese free replies: Jo, Simplified stays); For Jo (vi) 3 ("Dạ" opener: replaced anyway, per the vi language review, so the one-message price matches the price flow).
