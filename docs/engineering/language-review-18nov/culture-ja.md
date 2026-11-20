# Culture and etiquette review: Japanese (ja), 18 Nov

Scope: `docs/engineering/language-blocks/ja.md` (the block), the `ja` entries in `src/lib/will/template-translations.generated.ts` (fixed texts), the Japanese texts in `instant-choice.ts` (PRICE_ML, REVIEW_ML, MYGOV_REASSURANCE), `judgement.ts` (SIGNATURE_FIRST), `approved-messages.ts` (AGENT_PHRASES), and the `ja` strings in `src/lib/formStrings.ts` (Japanese has no file in `src/lib/form-i18n/`; it lives in `formStrings.ts`). Compared with `en.md` and the English source texts in `i18n.ts`, `approved-messages.ts`, `price-flow-variant.ts` and `review-asks.ts`. No file was edited.

## 1. What is right

- Register: です・ます everywhere, in the block, every fixed text and the form. Nothing slips into plain form (だ・である) or into stiff keigo such as 存じます or 賜ります. That suits young Japanese travellers: polite, not stiff.
- Address: さん is right for this audience. 様 would read as a bank or a department store, and ちゃん/くん would be over-familiar. The block bans both.
- The block bans やあ, だよ and じゃん, and it bans the long お問い合わせいただきありがとうございます opening. The opening 「こんにちは！喜んでお手伝いします😊」 is warm and natural.
- Cushion words are used where Japanese expects them: 恐れ入りますが (BANK_DOCUMENT_MSG), 申し訳ありませんが (NO_DASP_MSG), お待たせしてしまい、申し訳ありません (HANDOFF_BUMP_MSG). 「うまくいかなかったとのこと、残念です。」 (MEDICARE_CANT_HELP_MSG) shows the right empathy.
- Questions are asked gently: でしょうか, いただけますか, お済みでしょうか. The closing question 「振込先をお送りしましょうか？」 is natural and not pushy.
- RESIDENCY_CHECK_MSG ends with a positive question (「ご回答は今も正しいでしょうか？」). That avoids the Japanese yes/no confusion that a negative question (変更はありませんか？) would cause. Keep it.
- Punctuation: full-width 、。！？：, half-width digits, thousands commas (5,000km), prices as $220/$385/$330/$440/$495 with no yen or 豪ドル conversion. No em or en dashes in any Japanese text.
- Form: the date hint 「例：2000/10/20」 (year first) is right for Japanese readers. The code comment above dobHint says every customer country writes the day first, which is not true for Japan, but the Japanese string itself is correct. お客様 on the web form is the normal register for a web page, and it does not clash with さん in chat. When no name is typed, the heading becomes 「ありがとうございます！」 with no name, which is correct.
- Agent wording: AGENT_PHRASES ja (「オーストラリアの登録タックスエージェントの監督のもとで運営」, 「ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します」) keeps the English meaning and never makes us the agent. The block bans 税理士 and 税務代理人 correctly. 税理士 is a protected Japanese title and would mislead a Japanese reader.
- Brand: section 1 says Japanese is for both brands and never names the other brand. Nothing in the block ties Japanese to one brand.

## 2. Problems and proposals

### 2.1 Block, section 2, line 16: follow-up opening contradicts the real templates and section 4
- Current: 「Approved follow-up templates therefore open with 「こんにちは、{{1}}さん。」」
- The templates (FOLLOWUP_MSG.*, REFUND_CHECKIN_MSG) actually open with 「こんにちは、{{1}}さん😊」, and section 4 line 54 quotes that form.
- Proposed: 「Approved follow-up templates therefore open with 「こんにちは、{{1}}さん😊」」
- Why: the block contradicts itself. The model may "correct" a sent text, or copy 。 into free replies.

### 2.2 Block, section 2, lines 14 and 18: the rule to use the name once is missing, and name order is not covered
- Current line 14: 「Address the customer by first name + さん, for example 「Ayaさん」.」
- Current line 18: 「Free replies use the customer's real first name. {{1}} appears only inside approved templates.」
- Proposed line 14: 「Address the customer by name + さん. Use the name exactly as the code gives it (the first word of the profile name). For a Japanese customer this is often the family name (「田中さん」, 「Tanakaさん」), which is the normal polite form in Japanese: never "correct" it to a given name, and never add 様, ちゃん or くん.」
- Proposed line 18: 「Use the name once per conversation, in the first greeting. Do not use it again in later replies. It appears again only in the approved follow-up templates ({{1}}).」
- Why: en.md says to use the name once and never repeat it, and Jo set the same rule. The Japanese block has no such limit. Japanese writers tend to repeat 〜さん in every message, which reads as scripted. Japanese profile names are often written family name first (田中 彩, Tanaka Aya), so "first name + さん" is not what the code produces. Family name + さん is still polite and correct, so the block should allow it.

### 2.3 Block, section 6, line 92 and section 7: emoji and exclamation rules are looser than Jo's rule and en.md
- Current line 92: 「A free reply has at most one emoji, and it is 😊.」
- Proposed: 「The first message of a conversation carries one 😊. After that a free reply has no emoji unless it fits naturally (for example thanks for a payment), and then only 😊. No emoji and no ！ in a complaint, an apology, a no, or a money dispute. ✅, 🎉 and 🙏 appear only in approved fixed texts.」
- Add to section 7: 「Use ！ sparingly: at most one per free reply, never in a complaint or a no.」
- Why: Jo wants one emoji at the start and then only where it fits completely. en.md section 6 bans emoji and exclamation marks in complaints, and the Japanese block does not say this. In Japanese a smiley on a refusal or an apology reads as not taking the customer seriously.

### 2.4 Block, section 7, line 105: apology rule is too strict for Japanese and contradicts the fixed texts
- Current: 「Apologise once, and only when the team is late. Do not repeat 申し訳ありません.」
- Proposed: 「At most one apology per reply. Use a short cushion (恐れ入りますが, 申し訳ありませんが, あいにく) when you say no or ask for something. Use a full apology (お待たせしてしまい、申し訳ありません or ご不便をおかけして申し訳ありません) only when the team is late or the customer is upset. Never repeat it in the same reply.」
- Why: in Japanese, a refusal without a cushion word sounds curt. The fixed texts already use 申し訳ありませんが for a no (OWN_ACCOUNT_MSG, NO_DASP_MSG), which the current rule forbids. en.md lists "Sorry this has been frustrating." as a free phrase, so English allows an apology to an upset customer that is not about lateness.

### 2.5 Block, section 5 (phrases), and section 8: how to say no and how to handle money
- Add to section 5:
  - 10. 「恐れ入りますが、料金は固定のため、お値引きはしておりません。」 (discount request; en.md: "Our fee is fixed")
  - 11. 「ご不便をおかけしてしまい、申し訳ありません。担当チームに伝えましたので、こちらでご連絡します。」 (complaint; matches section 8 and en.md phrase 5)
- Add to section 2: 「Say no in three steps: a cushion word, the reason in one sentence, and what we can do instead. Never a bare できません.」
- Why: a Japanese customer expects an indirect, reasoned no with an alternative. The block has no guidance on refusals or discount requests, which are a common money question.

### 2.6 Block, section 5, phrase 5: close to a forbidden "I'll check" and a paraphrase of the handoff line
- Current: 「ありがとうございます。担当チームに確認して、こちらでお返事しますね。」
- Proposed: 「承知しました。お送りいただき、ありがとうございます。」 (en.md phrase 2, "Got it, thanks for sending that through.")
- Why: en.md section 6 forbids "I'll check", and section 8 of both blocks forbids paraphrasing the approved handoff line. A handoff must use HANDOFF_HOLDING_MSG.

### 2.7 Block, section 6: forbidden items in en.md that are missing in Japanese
- Add: 「Agent questions open with 「もちろんです。」, never with 「はい、」 alone (en.md: "Of course.", never "Yes").」
- Add: 「No time words in free replies: すぐに, 本日中, 明日までに, 24時間以内, 確認してみます. (The approved texts keep their own wording.)」
- Add: 「Never widen the guarantee: no 損はしません, no リスクなし.」
- Add: 「No social proof: no ratings, review counts or 多くのお客様が. Never ask for a Google review in a free reply.」
- Add: 「A customer who owes tax gets no refund wording and is never told to call the ATO.」
- Add to section 8: 「「ボットですか？」 and similar get no reply line. The chat goes to a person with no draft.」
- Why: en.md has the same rules for all languages. Without them, the Japanese block is looser than English.

### 2.8 Block, section 4, line 67: outdated
- Current: 「Foreign income: no approved Japanese block exists. Write it under section 8 ...」
- Proposed: 「Foreign income: use PRICES_FOREIGN_MSG ja and PRICE_FLOW_STEPS_TFN_FOREIGN / TFN_ABN_FOREIGN ja, $330 (TFNのみ) or $495 (TFN + ABN). Never state the difference between foreign and domestic prices.」
- Why: those Japanese texts now exist (and line 56 lists PRICES_FOREIGN_MSG ja). The current line tells the model to write free text where approved text exists.

### 2.9 Block, sections 2 and 6: dates, numbers and punctuation are not stated
- Add to section 2: 「Dates: 11月18日 (add 年 only when needed). Never 18/11 or 11/18. Numbers in half-width digits with thousands commas ($1,234). Prices stay $220 etc., never 220ドル, 豪ドル or a yen figure. Full-width 、。！？：. No space before an emoji.」
- Why: a slash date is read either way by a Japanese reader. The fixed texts are already correct, so this keeps free replies in line with them.

### 2.10 Fixed texts: space before the emoji is inconsistent
- PRE_PAYMENT_CHECK_MSG ja, current ending: 「…安心してお任せください 😊」. Proposed: 「…安心してお任せください😊」
- NO_REFUND_CASES_MSG ja, current ending: 「…確認する項目のひとつです 😊」. Proposed: 「…確認する項目のひとつです😊」
- Why: every other Japanese text (opening, follow-ups) puts the emoji right after the text. Japanese does not use a space there.

### 2.11 NO_REFUND_CASES_MSG ja: the first sentence is grammatically broken
- Current: 「多くの場合、年間を通じてお給料から差し引かれた税金が、納めるべき税額とすでに同じだったとき、または差し引かれた額が少なすぎたとき（たとえば2つ目の仕事など）で、その場合は還付ではなく納税が必要になります。ご自身がそれに当たるかどうかは、レビューの中で確認する項目のひとつです 😊」
- Proposed: 「還付がないのは、多くの場合、年間を通じてお給料から差し引かれた税金が、納めるべき税額とすでに同じだったときです。また、差し引かれた額が少なすぎたとき（たとえば2つ目の仕事など）は、還付ではなく納税が必要になります。ご自身がそれに当たるかどうかは、レビューの中で確認する項目のひとつです😊」
- Why: 「〜とき、…とき…で、その場合は」 has no subject and reads like a machine translation. The proposal keeps the English meaning (two cases; in the second, there is tax to pay).

### 2.12 OWN_ACCOUNT_MSG ja: the refusal is blunt
- Current: 「申し訳ありませんが、それはできません。銀行口座はご本人名義で、ご本人の情報が記載されている必要があります。」
- Proposed: 「申し訳ありませんが、そちらはお受けできません。銀行口座はご本人名義で、ご本人の情報が記載されている必要があります。」
- Why: 「それはできません」 is a flat "can't do that". 「お受けできません」 is the normal service form of the same no. The meaning is unchanged.

### 2.13 REFUND_NOT_YET_MSG ja: 大丈夫です can sound dismissive to a worried customer
- Current: 「大丈夫です。ATOの処理に、もう少し時間がかかることがあります。」
- Proposed: 「ご心配いりません。ATOの処理には、もう少し時間がかかることがあります。」
- Why: a customer whose refund has not arrived is anxious. A bare 大丈夫です can read as "that's fine (not our problem)". ご心配いりません is the accurate "No worries" here.

### 2.14 HANDOFF_HOLDING_MSG ja: チーム twice
- Current: 「チームに引き継ぎました。通常1営業日以内に、チームからこちらでご返信します。」
- Proposed: 「担当チームに引き継ぎました。通常1営業日以内に、こちらでご返信します。」
- Why: repeating チーム reads as a template. 担当チーム matches FORM_RECEIVED_MSG and PAYMENT_RECEIVED_MSG. The meaning and the only allowed time line (通常1営業日以内) are unchanged. The block quotes 「チームに引き継ぎました。」 in section 4, line 53, so update that quote too.

### 2.15 MEDICARE_MSG ja: imperative tone and English mixed in
- Current: 「…申請が済んだらスクリーンショットを送ってください。タックスリターンに反映します。\n\n承認されなかった場合は、Medicare levyが引き続きかかります。」
- Proposed: 「…申請がお済みになったら、スクリーンショットをお送りください。タックスリターンに反映します。\n\n承認されなかった場合は、メディケア・レビーが引き続きかかります。」
- Why: 「済んだら…送ってください」 is the only plain-request phrasing among the fixed texts (every other text says お送りください). The block's term table says メディケア・レビー.

### 2.16 Medicare spelled three ways
- Current: APPROVED.prices ja, prices_foreign ja and PRICE_FLOW_STEPS ja use 「Medicare」. PRICE_ML tfnBody/abnBody use 「メディケア」. MEDICARE_CANT_HELP_MSG ja uses 「Medicare levy（メディケア・レビー）」. NO_DASP_MSG ja uses 「superannuation（スーパーアニュエーション、DASP）」 while the block says 「スーパーアニュエーション（DASP）」.
- Proposed: pick one rule and write it in the block's term table: 「In fixed texts, Medicare may stay in Latin letters; in free replies write メディケア / メディケア・レビー」. Alternatively, align the fixed texts to the katakana. Either is fine culturally (Japanese WHMs see both). The point is that the block should not ban what the fixed texts send.
- Why: consistency between block and messages.

### 2.17 PRICE_ML ja (instant-choice.ts), hello: different meaning from the English and the opening
- Current: 「こんにちは、${name}さん😊 ご連絡ありがとうございます。」 / 「こんにちは😊 ご連絡ありがとうございます。」
- Proposed: 「こんにちは、${name}さん！喜んでお手伝いします😊」 / 「こんにちは！喜んでお手伝いします😊」
- Why: English is "Hey Sam! 😊 Happy to help." The Japanese says "thanks for contacting us" instead, and it differs from APPROVED.opening ja, so the same customer can get two different greetings.

### 2.18 PRICE_ML ja, fit: colon followed by 。
- Current: `${label}のプランが合いそうです：$${amount}。`
- Proposed: `${label}のプランが合いそうです。料金は$${amount}です。`
- Why: 「：$220。」 is awkward in Japanese. The meaning is unchanged.

### 2.19 Guarantee sentence: two different Japanese wordings
- PRICE_ML ja guarantee, current: 「…還付がない場合は、料金全額をいただきます。」
- PRICE_FLOW_STEPS_TFN ja, current: 「…還付がない場合は、料金の全額をご負担いただきます。」
- Proposed: use the flow wording in both places: 「還付金が当社の料金より少ない場合は、その差額を返金いたします。還付がない場合は、料金の全額をご負担いただきます。」 Update the block quote at section 4, line 44.
- Why: the guarantee is the only refund promise and must read the same everywhere. ご負担いただきます is the softer and more usual way to say a customer pays a fee.

### 2.20 REVIEW_ML ja (instant-choice.ts): meaning differs from the English, and the wrong term is used
- Current: `喜んでお手伝いいたします。すでに申告済みのため、今回は新規の申告ではなく、提出済みの申告内容の確認・修正となります。料金は確認作業に対して$${amount}で、結果にかかわらず同じです。`
- Proposed (by amount):
  - $330: 「もちろんです、すでに提出済みのタックスリターンの確認も承っています。すでに提出済みのため、今回は新しいタックスリターンではなく、提出済みのタックスリターンの確認となります。料金は確認作業に対して$330で、結果にかかわらず同じです。修正したタックスリターンの提出が必要な場合も、この料金に含まれます。」
  - $440: 「もちろんです、すでに提出済みのタックスリターンの確認も承っています。すでに提出済みのため、今回は新しいタックスリターンではなく、提出済みのタックスリターンの確認となります。料金は確認作業に対して$440（GST込み）で、結果にかかわらず同じです。」
- Why: (a) 「確認・修正」 promises a correction, which English does not. (b) The $330 text omits "covers lodging the amended return, if one is needed", and the $440 text omits "GST included". The block's section 4, line 68 says Japanese must keep both meanings. (c) 申告 is used instead of タックスリターン, which the block requires everywhere. (d) The opening repeats 喜んでお手伝い right after the hello line. The same gap exists in REVIEW_ML de; that is outside this review but worth checking.

### 2.21 SIGNATURE_FIRST ja (judgement.ts): wrong term
- Current: 「申告書はまだ提出されていません。メールでお送りした書類にご署名いただいたら、ATOに提出し、こちらでお知らせします。」
- Proposed: 「タックスリターンはまだ提出されていません。メールでお送りした書類にご署名いただいたら、ATOに提出し、こちらでお知らせします。」
- Why: the block says タックスリターン everywhere. Update the block quote at section 4, line 58 too.

### 2.22 Small wording points (optional)
- PAYMENT_LINK_OFFER ja: 「…ご希望ですか？」 → 「…ご希望でしょうか？」 (softer, matches the other questions).
- REQUEST_ABN_MSG ja: 「ABNの収入について、いくつか簡単な質問です：」 → 「ABNの収入について、いくつか簡単な質問をさせてください：」 (a full polite sentence; the list is unchanged).
- REVIEW_ASK_SHORT_MSG ja: 「よかったです！」 → 「それはよかったです！」 (more natural reply to good news).
- PRICE_FLOW_STEPS ja: 「承知しました、TFNのみのプランで承ります！」 doubles 承. It is acceptable; 「承知しました、TFNのみのプランですね！」 is lighter if Jo wants it.

## 3. For Jo

1. Bug that affects Japanese etiquette directly: `scheduler.ts` greetingName returns the English word `there` when no clean name is on file, and line 2024 puts it into {{1}}. Japanese follow-ups then read 「こんにちは、thereさん😊」. This is likely with Japanese profile names: a single kanji name (翔, 彩) fails the 2-character minimum in cleanFirstName, and emoji-only names also fail. Proposed: for ja (and probably every non-English language), when there is no name, send the template line without the name, 「こんにちは😊」, or use a name-free template variant. `i18n.ts` line 792 has the same `'there'` fallback.
2. Name order: the code takes the first word of the profile name. For many Japanese customers that is the family name. Family name + さん is polite and fine, so no code change is needed. Only the block wording (2.2) should change.
3. Form, all languages (not Japanese only): `formStrings.ts` etaLabel says 「通常24時間以内にご連絡します」 ("We usually message you within 24 hours"), while chat allows only "usually within one business day". And registeredTaxAgent says 「ワーホリ専門チーム」 ("Working holiday specialists"). If the form is also shown to SVT customers, that badge ties it to one brand.
4. The form labels the DASP form 「スーパー受取（DASP）」, while the block lists スーパー受取 under "never use (menu label)". This is fine for a form label, but the block line could say "menu and form labels only" to avoid confusion.
5. Legacy `LODGED_NEUTRAL_MSG.ja` in `i18n.ts` (marked removed, never sent) uses 「あなたの確定申告書」. あなた is cold in Japanese, and 確定申告 is banned. No action is needed while it stays unused, but it should not be revived as is.

## Applied 18 Nov

Applied: 2.1 (already), 2.2 (name as the code gives it, family name + さん fine, once per conversation), 2.3 (emoji and ！), 2.4 (apology rule), 2.5 (say no in three steps; phrase 10 for a discount), 2.6 (phrase 5), 2.7 and 2.8 (already in ja.md), 2.9 (dates and numbers), 2.10 (no space before the emoji), 2.11 (NO_REFUND_CASES_MSG grammar), 2.12 (お受けできません), 2.13 (ご心配いりません), 2.14 (担当チーム once, block quote updated), 2.15 (お送りください; "Medicare levy" stays in Latin letters as the ja review set in the block), 2.16 (PRICE_ML now writes Medicare, as every fixed text), 2.17 to 2.21 (instant-choice.ts and judgement.ts), 2.22 (all four small points). For Jo 1: with no usable name there is no name at all (「こんにちは😊」), never "there" or お客様: scheduler greetingName, fillNameSlot, residencyCheckMessage, the form's thank-you heading, with tests. A follow-up that needs the Meta template and has no name is skipped (audited) rather than sent with a stand-in word.

Not applied: For Jo 3 (the form's English etaLabel "within 24 hours" and the "Working holiday specialists" badge are locked English texts, for Jo); For Jo 4 (form label, fine as it is); For Jo 5 (removed message, never sent).
