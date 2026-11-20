# Culture and etiquette review: German, French, Italian (group eu-north, 18 Nov)

Scope: `docs/engineering/language-blocks/de.md`, `fr.md`, `it.md`, the de/fr/it entries in `src/lib/will/template-translations.generated.ts` (generated from `docs/engineering/templates-i18n/`, so fixed text changes go into `docs/engineering/templates-i18n/<lang>.json`), the remaining de/fr/it strings in `src/lib/will/i18n.ts`, the German form strings in `src/lib/formStrings.ts`, and `src/lib/form-i18n/fr.ts` and `it.ts`. Reference: `en.md` and the English sources in `docs/engineering/templates-i18n/SOURCE.json`. No file was edited.

Priority key: **High** = breaks a rule from Jo or the English block, or reads wrong to a native speaker. **Medium** = inconsistency the model may act on. **Low** = polish.

---

## Shared findings (all three languages)

1. **Jo's emoji rule is written three different ways.** de: "at most one emoji, and only in the first message" (matches Jo). fr: "Will adds only 😊 itself" (no first message limit). it: "At most one emoji per message. 😊 is the default" (allows one in every message). Proposal: the same sentence in all three blocks (see per language items).
2. **Agent answer opening differs from English.** en.md section 6: "Open every agent answer with 'Of course.', never with 'Yes' or 'Absolutely'." fr.md forbids "Bien sûr" (the French for "Of course"); de.md and it.md say nothing. Proposal per language below.
3. **Fixed texts with an emoji later in the chat (for Jo).** `PRE_PAYMENT_CHECK_MSG` and `NO_REFUND_CASES_MSG` end with 😊 in all three languages, as in English. Under "afterwards only where it fits 100%", the 😊 at the end of `NO_REFUND_CASES_MSG` (a text that explains when the customer has tax to pay) does not fit well in any culture. This is an English source decision, so it is listed for Jo, not proposed per language.
4. **Name use is right in the fixed texts.** Openings get the name once through `withGreetingName` ("Hey Anna!", "Salut Anna !", "Ciao Anna!"), and only the follow ups and the refund check in carry `{{1}}` again. That matches Jo. The blocks need small fixes so the model does not repeat the name (de complaint greeting, it greeting rule).
5. **Register is consistent in fixed texts and forms:** du / tu / tu everywhere, no Sie, vous or Lei found in any fixed text or form string. The only conflict is the French block's vous rule (fr item 1).
6. **Prices** stay as `$220` etc. in all fixed texts. Good.

---

## German (de)

### What is right

- du everywhere: block, all fixed texts, all German form strings. Right for German, Austrian and Swiss backpackers and students on WhatsApp; Sie would read stiff and distant.
- "Hey" opener and "Hi {{1}}" follow ups are natural for this age group.
- Protected titles handled well: "Steuerberater" is banned and the agent is "registrierter australischer Tax Agent", which is the correct, honest choice in German.
- Terms are clean: Steuererklärung, Steuerrückerstattung, Gebühr, einreichen (with the useful warning that "anmelden" means log in), Werktag.
- Fixed texts read naturally and politely: "Tut mir leid, aber wir brauchen wirklich...", "Leider ist das nicht möglich.", "Entschuldige die Wartezeit." The no is clear, short and not cold.
- Number format in the expenses text is German ("5.000 km", "88 Cent"); date of birth hint "20.10.2000" is German.
- Emoji rule in section 6 matches Jo exactly.

### Problems and proposals

**de1 (High). `de.md` line 18, complaint greeting repeats the name and greets again.**
Current: "Complaints and refund questions: open with "Hallo {Vorname}," with no exclamation mark and no emoji. A casual "Hey" sounds flippant when the customer is upset."
Proposed: "Complaints and upset customers: no new greeting and no name (the name is used once per chat, in the first greeting). Start with a short apology, for example "Das tut mir leid, das ist wirklich ärgerlich." No exclamation mark and no emoji."
Why: Jo's rule is name once per conversation; line 16 of the same block says later replies start straight with the answer. A mid chat "Hallo Anna," also reads like the start of a formal letter. "refund questions" is dropped because the approved `NO_REFUND_CASES_MSG.de` itself carries 😊, so the rule contradicted a fixed text.

**de2 (Medium). `de.md` line 15, example does not match the fixed opening.**
Current: "Greet once per chat, for example "Hey Anna! 😊 Gerne helfe ich dir.""
Proposed: "Greet once per chat. The fixed opening becomes "Hey Anna! Gerne helfe ich dir😊" when a first name is known."
Why: the model should copy what the customer actually sees (`APPROVED.opening` de, generated file line 355, plus `withGreetingName`). Emoji position differs today.

**de3 (Medium). `de.md` section 2, no rule for the agent answer opening.**
Proposed addition: "An answer to "are you registered / are you an agent?" starts with "Natürlich." (the English "Of course.") or directly with the approved sentence, never with "Ja" or "Absolut"."
Why: matches en.md section 6 and playbook line 249. "Ja" reads as "yes, we are registered".

**de4 (Medium). `de.md` section 2, missing slang and closing rules that en.md has.**
Proposed addition: "Familiar, not slang. "Kein Problem", "Alles klar" and "Danke dir" are fine. Never "Digga", "Alter", "krass", "geil", "Bro", "lol" or "thx". After a clear no from the customer: one warm closing line, for example "Kein Problem. Wenn du später Hilfe brauchst, schreib mir einfach hier.", then stop. No letter closings such as "Mit freundlichen Grüßen" or "Viele Grüße"."
Why: en.md section 2 has the slang list and the "after a clear no" rule; de.md has neither, so the model has no guide for saying no or ending politely in German.

**de5 (Medium). `de.md` section 6/7, no date or number format.**
Proposed addition: "Dates as "31. Oktober" (never 10/31 or 31.10. in free text). Amounts as "$220", no "220 $", no "220,00", no "AUD"."
Why: fr.md and it.md give formats; de does not. German readers would naturally write "220 $" or "220,00 $", so the rule needs to be explicit to keep Jo's $220 format.

**de6 (Medium). `src/lib/formStrings.ts` line 103, `registeredAgentNo.de` differs from the approved agent phrase.**
Current: "Unter der Aufsicht eines registrierten Tax Agents, Nr."
Proposed: "Unter der Aufsicht eines registrierten australischen Tax Agent, Nr."
Why: `AGENT_PHRASES.supervision.de` is the only approved German agent wording ("registrierten australischen Tax Agent"). The form should use the same words as the chat.

**de7 (Low). Generated file line 25, `NO_REFUND_CASES_MSG.de`, anglicism.**
Current: "...gehört zu den Dingen, die wir in der Prüfung checken 😊"
Proposed: "...gehört zu den Dingen, die wir in der Prüfung klären 😊"
Why: "checken" is fine in speech but reads sloppy in an explanation about tax owed. "klären" is warm and exact. Same meaning.

**de8 (Low, Meta template, optional). Generated file line 355, `APPROVED.opening` de.**
Current: "Hey! Gerne helfe ich dir😊"
Proposed: "Hey! Ich helfe dir gerne😊"
Why: "Gerne helfe ich dir" is correct but sounds slightly scripted; "Ich helfe dir gerne" is how a German speaker texts. Only worth doing if the Meta template is re entered anyway. `withGreetingName` still works ("Hey Anna! Ich helfe dir gerne😊").

---

## French (fr)

### What is right

- tu in every fixed text and in the form (`form-i18n/fr.ts`). Right for young French, Belgian, Swiss and Canadian travellers on WhatsApp.
- "Salut" opener, "Pas de souci", "Ça marche": familiar but not slang. The slang and anglicism lists (no "chelou", "wesh", "checker", "booker") are well chosen.
- No sign off formula rule (no "Cordialement") is exactly right for WhatsApp.
- "Never write je vais vérifier" is a good French specific trap catch.
- Terms are sound: "déclaration d'impôts", "déposer", "honoraires" kept apart from "frais professionnels" to avoid confusion.
- The form uses non breaking spaces before ? ! : (correct French typography that does not wrap).
- Fixed texts say no politely: "Malheureusement, ce n'est pas possible." is clear and not cold.

### Problems and proposals

**fr1 (High). `fr.md` line 12, vous switching breaks consistency.**
Current: "Use tu. The approved French texts use tu ("ton questionnaire"). Use vous only when the customer writes vous in their first message, and keep vous to the end of the chat. Never switch in between."
Proposed: "Always tu, as in every fixed French text and the form. Use tu even when the customer writes vous, and do not comment on it. Two people in one chat: vous as a plural (as in COUPLE_MSG)."
Why: every fixed text (prices, payment details, follow ups, form) is tu, so a vous chat gets a vous/tu mix, which reads careless in French. de, it and es all use one register throughout. tu is normal for this audience on WhatsApp.

**fr2 (High). `fr.md` line 14, greeting tied to fr1.**
Current: "Greet only in the first message: "Salut {prénom} !" with tu, "Bonjour {prénom}," with vous, or "Salut !" when no name is known."
Proposed: "Greet only in the first message: "Salut {prénom} !" when a first name is known, otherwise "Salut !". The name is used once per chat, in that greeting."

**fr3 (High). Gender agreement for Mia in fixed texts.** French adjectives agree with the speaker. Every one of these is masculine, so for Student Visa Tax chats Mia speaks as a man, which a French reader notices at once.
- Generated file line 48, `BANK_DOCUMENT_MSG.fr`: "Désolé, mais nous avons vraiment besoin..."
- line 108, `MEDICARE_CANT_HELP_MSG.fr`: "Désolé de l'apprendre."
- line 118, `NO_DASP_MSG.fr`: "Désolé, notre service..."
- line 158, `HANDOFF_BUMP_MSG.fr`: "Désolé pour l'attente."
- line 288, `REVIEW_ASK_SHORT_MSG.fr`: "Ravi de l'apprendre !"
Proposed (gender neutral, same meaning, one text for both brands):
- "Malheureusement, nous avons vraiment besoin d'un document bancaire officiel..." (rest unchanged)
- "C'est vraiment dommage. L'exemption est gérée par Services Australia..." (rest unchanged)
- "Malheureusement, notre service de superannuation (DASP) n'est pas disponible pour le moment, mais nous nous occupons volontiers de ta déclaration d'impôts."
- "Pardon pour l'attente. Je viens de relancer l'équipe pour toi."
- "Super nouvelle ! Tu pourrais nous laisser un petit avis Google ?🙏"
Alternative for Jo: keep the texts and have `brand-voice.ts` swap "Désolé" to "Désolée" and "Ravi" to "Ravie" for SVT. The neutral wording is simpler and needs no code.
Why: Jo's rule is one product, both brands; the French texts only work for Will today. Italian and German fixed texts have no such agreement, checked.

**fr4 (High). `fr.md` section 2, add a gender rule for free replies.**
Proposed addition: "Write first person sentences without gendered adjectives ("Pardon pour l'attente", "Avec plaisir", not "Désolé" or "Ravi"), because the same text is sent by Will and by Mia. Do not use gendered adjectives for the customer either ("tu es inscrit"), unless the customer's own words make it clear."

**fr5 (High). `fr.md` line 87, section 5 phrase 8 promises a time.**
Current: ""On te répond ici dès que possible.""
Proposed: ""Pas de souci, prends ton temps.""
Why: "dès que possible" is "asap", which en.md section 6 forbids. The only time wording allowed is `HANDOFF_HOLDING_MSG`.

**fr6 (Medium). `fr.md` line 83, section 5 phrase 4 implies Will will look into it.**
Current: ""Tu veux qu'on regarde ça ensemble ?""
Proposed: ""Tu as d'autres questions avant de te lancer ?""
Why: the block itself (line 18) forbids "je regarde ça" because Will cannot check later.

**fr7 (Medium). `fr.md` line 86, section 5 phrase 7, gendered.**
Current: ""Désolé pour ça, je comprends que ce soit stressant.""
Proposed: ""Pardon pour ce souci, je comprends que ce soit stressant.""
Why: fr3/fr4. Note for use: no emoji and no exclamation mark in a complaint.

**fr8 (Medium). `fr.md` line 19, agent answer opening contradicts English.**
Current: "An answer to "are you an agent?" starts with the fact, never with "Oui", "Bien sûr" or "Absolument"."
Proposed: "An answer to "are you an agent?" starts with "Bien sûr." (the English "Of course.") or directly with the fact, never with "Oui" or "Absolument"."
Why: en.md section 6 and `legitimacy` open with "Of course."; the playbook (line 249) allows it. Forbidding the French equivalent makes the French behaviour differ from English.

**fr9 (Medium). `fr.md` line 97, emoji rule and a wrong fact.**
Current: "...Will adds only 😊 itself. ✅ and 🙏 appear only in the approved texts that carry them. No French text carries 🎉."
Proposed: "Free text gets at most one emoji, 😊, and only in the first message; afterwards only where it fits completely. No emoji in complaints. ✅, 🎉 and 🙏 appear only in the approved texts that carry them."
Why: Jo's emoji rule; and `SIGNATURE_MSG.fr` does carry 🎉 (the block quotes it on line 67).

**fr10 (Medium). Generated file line 8, `FORM_RECEIVED_MSG.fr`, wrong word for the form.**
Current: "Nous avons bien reçu ton questionnaire, merci !"
Proposed: "Nous avons bien reçu ton formulaire, merci !"
Why: the payment text, the follow up `fu_form_6h`, the price flow and the form page all say "formulaire"; the English source is "Got your form". Two words for one thing confuses the customer. Update `fr.md` line 12 and 58 to match.

**fr11 (Medium). Agent wording differs between chat and form.** `fr.md` line 31 uses "agent fiscal enregistré"; `src/lib/form-i18n/fr.ts` line 15 uses "registered tax agent" in English. Proposal for Jo: pick one. Recommended: the form's form, as German does, so section 4 can say: "For the agent meaning, write "sous la supervision d'un registered tax agent australien" and "vérifiée et validée par un registered tax agent australien avant d'être déposée auprès de l'ATO"." The English title cannot be mistaken for a French professional title (expert comptable) and never says that we are the agent.

**fr12 (Low). Generated file line 18, `PRE_PAYMENT_CHECK_MSG.fr`, clumsy "nous nous".**
Current: "...donc laisse-nous nous en occuper. 😊"
Proposed: "...donc laisse-nous gérer ça. 😊"
Why: same meaning ("leave that with us"), reads more naturally in a chat.

**fr13 (Low). Generated file line 308, `FOLLOWUP_MSG.fu_pre_24h` fr.**
Current: "Je voulais juste prendre des nouvelles au sujet de ta déclaration d'impôts."
Proposed: "Je voulais juste faire un petit point sur ta déclaration d'impôts."
Why: "prendre des nouvelles" is asked about a person, not a document; "faire un point" is the natural "check in".

**fr14 (Low, for Jo). Typography in fixed texts.** `fr.md` line 108 asks for "a space before ?, ! and :". The fixed texts use a normal space, so on a narrow phone screen "?" or "!" can wrap to its own line. The form already uses a non breaking space (U+00A0). Optional: use U+00A0 in the French fixed texts too. Invisible to the reader, no meaning change.

**fr15 (Low, for Jo). `fr.md` line 100 lists $110 and $165**, which en.md, de.md and it.md do not list. The guard allows both (`policy-guard.ts` line 303), but the lists should match across languages: either add them everywhere or remove them here.

---

## Italian (it)

### What is right

- tu everywhere: block, fixed texts and `form-i18n/it.ts`. "If the customer writes Lei, answer with tu and do not comment" is the right call for Italian travellers and students on WhatsApp.
- "Ciao" opener and "Ciao {{1}}" follow ups are natural.
- The no pressure list ("non perdere l'occasione", "affrettati") and the slang list ("Raga", "Figata", "Boh") fit Italian well.
- "modulo" is used consistently (block, fixed texts, form). "presentare" for lodge, "tariffa" for fee, "partita IVA" and "codice fiscale" banned for ABN and TFN: good, avoids false friends.
- Fixed texts are warm and natural: "Che bello!", "Hai avuto modo di...", "Purtroppo non è possibile.", "Scusa l'attesa." Saying no and apologising are well judged.
- Dates "31 ottobre" and numbers "5.000 km" are Italian format; "$220" kept.

### Problems and proposals

**it1 (High). `it.md` line 13 and line 83, first reply contradicts the fixed opening; name rule missing.**
Current: "Greeting: "Ciao", with the customer's name when we know it. First reply: "Ciao! Grazie per avermi scritto." Use "Buongiorno" or "Buonasera" only as the first greeting."
Proposed: "Greet only in the first message, with the fixed opening OPENING_MSG ("Ciao! Ti aiuto volentieri😊", which becomes "Ciao Giulia! Ti aiuto volentieri😊" when a first name is known). The name is used once per chat, in that greeting. Later replies start straight with the answer. No "Buongiorno" or "Buonasera"."
And remove section 5 phrase ""Ciao! Grazie per avermi scritto." (first reply)".
Why: the opening is a fixed text; a second free greeting would greet twice. Jo: name once per chat. "Buongiorno" next to tu and "Ciao" mixes registers.

**it2 (High). `it.md` line 14 and line 90, sign off conflicts with English and French.**
Current: "Close once, with "A presto" or "Buona giornata". Never "Cordiali saluti"." and section 5 ""Buona giornata." (closing, once per conversation)".
Proposed: "No sign off formula ("Cordiali saluti", "Buona giornata", "A presto"). The question or the next step ends the message. After a clear no from the customer: one warm closing line, for example "Nessun problema, se ti serve una mano più avanti scrivimi pure qui.", then stop."
Why: en.md and fr.md end with the next step; en.md has the "after a clear no" rule, it.md does not. A closing on top of a question reads like an email.

**it3 (High). `it.md` line 15 and line 87, "Tranquillo" is masculine.**
Current: "Allowed: ... "Tranquillo" (only to reassure, never about money or documents)." and section 5 ""Tranquillo, ci pensiamo noi.""
Proposed: remove "Tranquillo" from the allowed list and add: "No gendered adjectives about the customer ("tranquillo/a", "pronto/a", "sicuro/a") and none about yourself ("contento", "felice"), because the same text is sent by Will and by Mia and the customer's gender is unknown." Section 5 phrase: ""Nessun problema, ci pensiamo noi.""
Why: half the customers are women, and Mia is a woman; "Tranquillo" to a female customer reads careless.

**it4 (High). `it.md` line 107, emoji rule against Jo's rule, and wrong facts.**
Current: "At most one emoji per message. 😊 is the default. 🙏 only in the review request. ✅ and 🎉 only in confirmations of a received form or a lodged return."
Proposed: "Free text gets at most one emoji, 😊, and only in the first message; afterwards only where it fits completely. No emoji in complaints. ✅, 🎉 and 🙏 appear only in the approved texts that carry them (lodged return, return ready to sign, review request)."
Why: Jo: one emoji at the start of a conversation. Also FORM_RECEIVED_MSG.it carries no emoji, and 🎉 is the signature text, not a form confirmation.

**it5 (High). `it.md` sections 2 and 6, no complaint rule.**
Proposed addition to section 6: "Complaints and upset customers: no emoji, no exclamation marks, no "perché ci hai contattato", no "non avevi intenzione di usare il servizio", no "abbiamo già perso tempo". Start with a short apology, for example "Mi dispiace, capisco che sia frustrante.""
Why: en.md section 6 has this; it.md is the only one of the three with no complaint guidance at all.

**it6 (Medium). `it.md` section 2, no agent answer opening rule.**
Proposed addition: "An answer to "siete registrati? / siete un agente?" starts with "Certo." (the English "Of course.") or directly with the fact, never with "Sì" or "Assolutamente"."
Why: en.md section 6. "Sì" reads as "yes, we are registered".

**it7 (Medium). `it.md` section 6, time promises not listed.**
Proposed addition: "No team timelines in free text: "subito", "oggi", "a breve", "il prima possibile", "entro 24 ore", "domani", "controllo e ti faccio sapere". The only time wording is HANDOFF_HOLDING_MSG."
Why: en.md section 6 lists these; it.md only covers deadlines. (The fixed `PAYMENT_LINK_MSG.ready` "a breve" is the approved English "shortly" and stays.)

**it8 (Medium). Agent wording has no Italian rendering.** `it.md` line 77 asks the model to write the agent meaning itself, with no term given; the form (`form-i18n/it.ts` line 13) says "registered tax agent". Proposal for Jo: add to section 4: "For the agent meaning, write "sotto la supervisione di un registered tax agent australiano" and "controllata e approvata da un registered tax agent australiano prima di essere presentata all'ATO"." Same choice as German and as the form; it can never read as "commercialista" or as a claim about us.

**it9 (Medium). `it.md` section 6, missing items that en.md has.**
Proposed addition: "Never say AI, bot, automatico, sistema or software to the customer. If the customer asks whether they are talking to a bot or a person, the chat goes to the team with no reply. No ratings, review counts or "migliaia di clienti"; never ask for a Google review in your own words."
Why: en.md section 6 and section 8 point 7. it.md has the AI words only in section 3 and no bot question rule.

**it10 (Low). Generated file line 149, `HANDOFF_HOLDING_MSG.it`, punctuation.**
Current: "L'ho passato al team, e di solito ti rispondono qui entro un giorno lavorativo."
Proposed: "L'ho passato al team: di solito ti rispondono qui entro un giorno lavorativo."
Why: a comma before "e" is an English habit; Italian readers notice it. Same meaning.

---

## For Jo

1. **Decide Mia's French grammar** (fr3): neutral wording in the five French fixed texts (recommended, no code change) or a feminine swap in `brand-voice.ts`. Today French SVT customers see Mia write "Désolé" and "Ravi" in the masculine.
2. **French register** (fr1): confirm "always tu", like German, Italian and Spanish. Today the block allows vous while every fixed French text and the form use tu.
3. **Agent wording in French and Italian** (fr11, it8): approve one rendering each. German already has approved fixed agent phrases; French and Italian leave it to the model.
4. **Emoji on `NO_REFUND_CASES_MSG`** (shared item 3): the closing 😊 sits on a text about owing tax in all nine languages. Consider removing it in the English source and every translation.
5. **en.md itself** (noticed while comparing): en.md section 2 and 4 quote the opening as "Hey! 😊 Happy to help." but the approved text is "Hey! Happy to help😊"; and en.md section 4 quotes `FORM_RECEIVED_MSG.en` as "we've received your questionnaire" while the English source says "Got your form". Small, but the model copies the block.
6. **Money lists differ** (fr15): fr.md allows $110 and $165; en, de and it do not mention them.
7. The removed `HANDOFF_APOLOGY_MSG` in `src/lib/will/i18n.ts` (lines 446 to 454) contains "dès que possible", "so bald wie möglich", "il prima possibile" and the masculine "Tu es signalé". It is never sent, so no action, but it should not be restored as is.

## Applied 18 Nov

Applied: shared 1 (Jo's emoji rule written the same way in de, fr, it and en), shared 2 (agent answers open with "Natürlich." / "Bien sûr." / "Certo."); de1, de2, de3 (already in de.md), de4 (letter closings), de5 (dates and amounts as the English, "$18,200"), de6 (registeredAgentNo.de as the de review's label "Aufsichtführender registrierter Tax Agent, Nr."), de7 ("klären"); fr1 (always tu), fr2, fr3 and fr4 (gender-neutral, already in the fixed texts), fr5 to fr8, fr9 (emoji rule), fr10 ("formulaire", with the detector updated), fr11 ("registered tax agent" in English, AGENT_PHRASES.fr), fr12, fr13, fr15 ($110 and $165 removed from fr.md); it1, it2 (already in it.md), it3 ("Tranquillo" removed), it4 (emoji), it5 to it9 (already in it.md after the it review), it10.

Not applied: de8 (optional; the opening is a locked text and would need the Meta template re-entered); fr14 (fr.json already uses non-breaking spaces); For Jo 4 (the 😊 on NO_REFUND_CASES_MSG is the locked English source); For Jo 7 (HANDOFF_APOLOGY_MSG is removed and never sent).
