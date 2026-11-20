# Will audit 1: language detection

Read-only audit. No file under src/, the playbook, or other docs was changed.

**Scope.** src/lib/will/i18n.ts (detectLanguage, KEYWORDS, countMatches, unsupportedScript), src/lib/will/language-30oct.ts, and the callers that read the language: service.ts, engine.ts, channel.ts, scheduler.ts, will-decides.ts, and app/api/will/actions/route.ts. There is no src/lib/knowledge*.ts. The knowledge files are src/lib/will/knowledge*.ts, and none of them detects language (knowledge-seed.ts only hard-codes `"lang": "en"` data fields).

**Method.** Detector behaviour was run with Node 22 on verbatim copies of i18n.ts and language-30oct.ts in /tmp/will-audit (store import stubbed). Those copies are scratch files and are not part of the repo. "Tested" below means that run. "Read" means code reading only. Line numbers refer to the repo files.

## Findings

Severity: high = a customer receives, or the stored language becomes, the wrong language on an ordinary message.

| ID | Sev | file:line | What happens | Evidence | Suggested fix |
|---|---|---|---|---|---|
| F-01 | high | i18n.ts:88, :90; language-30oct.ts:73; service.ts:281 | A single non-English hit sets the language of a customer who has none (`enoughToSet`). Tokens shared with other lists are enough. | Tested: "Non so" → fr; "Mi chiamo Luca" → es; "para" → es; "que" → es; "porque" → pt; "dos" → pt; "ma" → fr; "non" → fr. Each is set when the stored language is null. | Allow the one-hit path only for tokens that appear in no other list. Remove non, ma, tu, mi, para, que, porque, dos, una from it. |
| F-02 | high | service.ts:281-285; language-30oct.ts:133-136; i18n.ts:89 | With a stored language, one confident read switches it. Shared words give the wrong language a lead of one. | Tested: "Por favor, como faço para enviar o reembolso? Que documentos preciso?" reads es 5 vs pt 4, confident. Stored pt, one message: resolveLanguage returns es. Italian "Ma non ho capito, tu puoi spiegare?" reads fr 3 vs it 1, confident; stored it, it switches to fr. Conditions: service.ts:281 uses only `confident` when a language is stored, and the switch is written at :283 before refresh runs. refreshCustomerLang (language-30oct.ts:133) reverts only if earlier clear votes outnumber the switch. With two earlier pt messages the chat stays pt. A tie goes to the new current language, so the wrong switch sticks. | Count a switch only on tokens unique to the target language. Require two unique hits. Never switch on a shared token. |
| F-03 | high | i18n.ts:56-57; language-30oct.ts:64, :167-168, :226; channel.ts:574-575; scheduler.ts:442-445 | Kanji-only Japanese is read as Chinese. For a stored ja customer whose latest message is kanji only, every template send is refused as a language error (channel.ts:574), and planFollowUp skips with a team task for paid customers. This lasts until the latest message contains kana. | Tested: stored ja, messages ["確定申告", "還付金"] gives {lang:'ja', unsupported:'zh'}. planFollowUp(fu_form_6h, ja, unsupported 'zh') gives skip, task:true. The same call without the flag gives template fu_form_6h_ja. | Do not set `unsupported` from Han-only text when a Japanese language is already stored. Han-only text should keep the stored language. |
| F-04 | medium | i18n.ts:65 | Any kana in a Chinese message makes the whole message Japanese with confidence. No unsupported flag is set, so there is no Chinese guard. | Tested: "我想问退税でしょうか" reads ja, confident, enoughToSet. A customer with no language is set to ja (service.ts:281) and gets Japanese templates. | Count kana against Han. Read ja only with at least two kana and a kana share above a threshold. |
| F-05 | medium | i18n.ts:58; language-30oct.ts:167-168 | Vietnamese is found only by a fixed set of letters (ă â đ ơ ư, dotted and hooked vowels, and some uppercase forms). Unaccented Vietnamese, and Vietnamese using only ô ê à á ó è é ì í ò ù ú, gets no language and no unsupported flag. English fixed texts and English templates then go out. | Tested: "toi muon hoi ve thue" gives lang null, unsupported null. "Tôi là khách" gives null/null. "TÔI MUỐN HỎI VỀ THUẾ" gives null/null. "Cảm ơn bạn" gives vi. englishToForeignReason(null, null, body) returns null, so English passes. | Add the missing letters and uppercase forms. Add a short Vietnamese word list (không, tôi, bạn, muốn, cảm ơn, thuế, hỏi, và). |
| F-06 | medium | i18n.ts:50-53; language-30oct.ts:44, :167; svt-fixed-texts.ts:4, :48; engine.ts:764-765, :1119 | The comments say zh and vi have no fixed wording. svt-fixed-texts.ts has about twenty zh and vi entries, and the student line uses them. On the Work Holiday line, channel.ts:574 refuses zh and vi template sends anyway. | Read: svt-fixed-texts.ts defines zh (line 4) and vi (line 48) with opening, price_tfn, bank_document, couple and others. | Correct the comments. Make the refusal brand-aware, or record it as deliberate. |
| F-07 | medium | will-decides.ts:126, :133-137; engine.ts:792-800 | review_link for es, fr, it and pt is the English line. renderApproved replaces the model's reply, so an English message goes to a customer who asks for the review link. | Read: reviewLinkMessage has branches for de and ja only. Every other language gets "Thank you so much, that means a lot to us!". | Add es, fr, it and pt lines, or return null so the model's own reply goes out. |
| F-08 | medium | i18n.ts:630-641, :655-664, :706-727, :110-112; route.ts:1329, :1391-1392, :1447-1452; service.ts:830, :1640, :1738, :1981; route.ts:370 | es, fr, it and pt customers get English for estimate, signature-ready and lodged messages, and English template names for payment and handoff messages outside the 24h window. | Read: these helpers use `lang in MAP ? lang : 'en'` over en/de/ja-only maps, and metaTemplateLang (i18n.ts:110) maps es to 'en'. route.ts:1386-1390 records this as Jo's decision on 17 Sep. | Jo to supply wording for the four languages, or accept and document it. |
| F-09 | medium | i18n.ts:758-816; language-30oct.ts:223-242 | There is no follow-up wording for es, fr, it or pt. Unpaid customers in those languages get no follow-up. Paid customers get one team task per step. Nothing is sent in English, but nothing is sent either. | Tested: planFollowUp(fu_form_6h, es, approved null, inside window) gives skip, task:false. | Add the four languages to FOLLOWUP_MSG, or state the gap in the Library. |
| F-10 | low | i18n.ts:28 | German `\w*` wildcards stop at umlauts, so a stem followed by ä, ö or ü does not match. Accent-only lists miss ASCII spellings. | Tested: "Steuererklärung" alone gives lang null. Not in any list: fuer, ueber, koennen, Rueckerstattung, declaracion (es), declaracao (pt), ou (fr). Sentences usually still read correctly through other words. | Use \p{L} with the u flag. Add ASCII spellings. |
| F-11 | low | i18n.ts:27, :28 | English "has" matches Spanish "has" (you have). English "will" matches German "will" (want). | Tested: "¿Has pagado ya?" gives en, unconfident. "Ich will das wissen" gives en, unconfident. Harmless now, because English never sets a language and a switch needs two hits. | Drop "has" and "will", or require a second English word. |
| F-12 | low | i18n.ts:62-73, :90 | On a tie, detectLanguage still returns a language chosen by object-key order. | Tested: "como" gives {lang:'es', confident:false, enoughToSet:false}. Every caller read checks the flags, so this is latent. | Return lang null on a tie. |
| F-13 | low | engine.ts:469-476; engine.ts:1118-1124 | On the student line, kanji-only Japanese replies are held for approval (469-476). When the first-turn draft carries BSB details, the Chinese opening replaces Will's text (1118-1124). | Read. Same root cause as F-03. | Fixed by the F-03 change. |
| F-14 | low | language-30oct.ts:88-110, :117-131; i18n.ts:11 | ko, th, ar, ru, hi and he are written to customer.lang although they are not in LANGS. No wording exists for them. | Read. Template sends are refused by bodyLooksEnglish (channel.ts:574), so a team task is created. | Document it, or name an explicit refusal reason. |

## Item 1: keywords shared between languages (i18n.ts:26-33)

Tokens are from the KEYWORDS lists. "Alone" means the result for that single word, tested.

| Token | Lists | Falsely favours | Alone |
|---|---|---|---|
| como | es, pt (:29, :32) | es for pt; pt for es | tie, nothing set |
| reembolso, por favor | es, pt (:29, :32) | es for pt; pt for es | tie, nothing set |
| para | es (:29); pt uses it too | es for pt | sets es |
| que | es (:29) | es for pt | sets es |
| porque | pt (:32); es uses it too | pt for es | sets pt |
| dos | pt (:32); es uses it too | pt for es | sets pt |
| quando | it, pt (:31, :32) | it for pt | unconfident |
| posso | it, pt (:31, :32) | it for pt | unconfident |
| una | es, it (:29, :31) | es for it | unconfident |
| mi | es (:29); it uses it too | es for it | sets es ("Mi chiamo Luca") |
| non, ma, tu | fr (:30); it uses non and ma; tu is also it and pt | fr for it and pt | sets fr |

"cuando" is not a shared token: it is Spanish only (:29). The shared form is Italian and Portuguese "quando" (:31, :32).

## Item 2: switching a stored language

Answered by F-01 (setting, no stored language) and F-02 (switching, stored language). The condition for F-02 is one confident read whose winning language shares its words with the message. It needs at least two hits and a lead of one over the true language. service.ts:281-285 applies it immediately, and a later refresh can revert it only when earlier clear votes outnumber it.

## Item 3: Japanese and Chinese by script

- Japanese with kanji only: read as Chinese (F-03). Not read as Japanese, because the detector looks for kana only (i18n.ts:65).
- Chinese with kana: read as Japanese, confidently (F-04).
- Chinese without kana: flagged 'zh' (i18n.ts:57). The effects are in F-06.

## Item 4: Vietnamese by diacritics

Unaccented Vietnamese is read as nothing (F-05). Vietnamese with only the common vowel marks is also read as nothing. Only the letters in i18n.ts:58 are recognised. The customer gets English fixed texts and English templates.

## Item 5: languages with no fixed wording

- en, de, ja: full wording for all keys.
- es, fr, it, pt: the Record<Lang> families have wording (FORM_RECEIVED, REVIEW_REQUEST, PRE_PAYMENT_CHECK, PAYMENT_RECEIVED, HANDOFF_*, DOCUMENTS_RECEIVED, REQUEST_ABN, MEDICARE). The following are different:
  - English: review_link (F-07), estimate, signature and lodged messages, and English template names (F-08).
  - The model's own reply, not Jo's wording: noRefundCases (i18n.ts:202-204), couple (:224-226), bankDocument, ownAccount (:260-266), refundChance (:284-287), paymentLink (:312-315), medicareCantHelp (:327-330), noDasp (:340-343), notOurPrice (:360-364). For a bank-document denial, engine.ts:1048-1056 creates a human task instead.
  - Nothing automatic: follow-ups (F-09).
- ko, th, ar, ru, hi, he: stored without wording (F-14).
- zh, vi: not in LANGS. The Work Holiday line refuses them (F-06). The student line has wording.

## Counts

High severity: 3 (F-01, F-02, F-03).
