# Culture and etiquette review: Spanish (es) and Brazilian Portuguese (pt)

Group: latin. Reviewer brief: `CULTURE-BRIEF.md` (Jo, 18 Nov). No file was edited. Every proposal keeps the English meaning, uses no em or en dash, does not mention AI or bots, and does not call us a registered tax agent.

Files read: `docs/engineering/language-blocks/en.md`, `es.md`, `pt.md`; `docs/engineering/templates-i18n/SOURCE.json`, `es.json`, `pt.json` (source of `template-translations.generated.ts`); `src/lib/form-i18n/es.ts`, `pt.ts`; `src/lib/formStrings.ts` (`thankYouHeading`); `src/lib/will/approved-es.ts`, `approved-pt.ts`, `approved-messages.ts` (`withGreetingName`), `text-normalize.ts` (`THANKS_REPLIES_ML`), `later-plan.ts`, `payment-proof.ts`, `account-name.ts`, `channel.ts` (button labels); `src/components/ui/ResidencyStep.tsx`, `ResidencyDeclaration.tsx`, `ResidencyFixPanel.tsx`, `src/components/svt/form-residency-copy.ts`.

Severity: HIGH = wrong register or wrong meaning a customer will notice; MEDIUM = inconsistent with English rules or with the rest of the language; LOW = polish.

---

## 1. Spanish (es)

### What is right

- Register is tú everywhere I checked: block, all fixed texts, form, residency step, fix panel, later-plan, payment-proof. No usted, no vosotros, no voseo. For young travellers from Spain and Latin America tú is the right choice; Argentines and Uruguayans read tú as neutral, not foreign.
- Inverted marks are used correctly (`¡Hola!`, `Pago recibido, ¡gracias!`, `¿Te parece bien?`).
- The block bans letter closings ("Atentamente", "Saludos cordiales") and the call-centre opener "¿En qué puedo ayudarte hoy?". Good: both read cold on WhatsApp.
- Slang ban covers both sides of the Atlantic (guay, mola, chido, wey, parce, bacán, chévere).
- Opening "¡Hola! Con gusto te ayudo😊" is warm and gender neutral (no "encantado/a"), so it works for Will and Mia.
- Saying no and apologising is well judged: "Lo siento, pero sí necesitamos...", "Lamentablemente, eso no es posible." are polite and firm without being cold.
- Money: prices stay as $220, $385 etc.; "tarifa" for our fee is neutral in Spain and Latin America; "devolución" for the tax refund is correct; "te devolvemos la diferencia" keeps the fee refund separate from the tax refund.
- Thanks reply `¡De nada! 😊` / `¡Cuando quieras! 😊` is natural.
- Review ask "¿Nos dejarías una reseña rápida en Google?🙏" uses the conditional, which is the polite form of a request. Good.
- Button labels in `channel.ts` (Empezar, Abrir la página, Ver el video, Dejar una reseña) are fine.

### Problems and proposals

**ES-1 (HIGH) Gendered adjective in a fixed text.** `templates-i18n/es.json`, `MEDICARE_MSG`.
- Current: "Como no estabas cubierto por Medicare, es posible que puedas obtener la Medicare Levy Exemption."
- Proposed: "Como no tenías cobertura de Medicare, es posible que puedas obtener la Medicare Levy Exemption."
- Why: "cubierto" is masculine and is sent to every woman as well. Many SVT and WHT customers are women; the Portuguese version already avoids this. Meaning unchanged.

**ES-2 (MEDIUM) Name use does not match Jo's rule.** `es.md` line 108.
- Current: "Greet only in the first message of a conversation, using the customer's first name if it is known. Later messages go straight to the answer."
- Proposed: "Greet only in the first message of a conversation. If a real name is on file, use the first given name once, in that greeting, and never again in the chat. The follow-up reminders carry the name themselves."
- Why: Jo: name once per conversation, again only in follow-up reminders. The English block says "Never repeat the name"; the Spanish block does not.

**ES-3 (MEDIUM) Comma before the name in the greeting.** `src/lib/will/approved-messages.ts`, `withGreetingName` (shared file, for another agent).
- Current output for es: "¡Hola Ana! Con gusto te ayudo😊"
- Proposed output: "¡Hola, Ana! Con gusto te ayudo😊" (insert ", " before the name when the language is es; the follow-up templates already write "Hola, {{1}}").
- Why: the vocative comma is standard written Spanish, and the opening should match the follow-ups the same customer receives.

**ES-4 (MEDIUM) Emoji rule does not match Jo's rule.** `es.md` line 97.
- Current: "Emoji: at most one per message. Price and bank-detail messages carry none."
- Proposed: "Emoji: one in the opening message. After that, at most one per message and only where a friendly person would clearly use one, such as a thank-you or good news. None in complaints, price or bank-detail messages. Fixed texts keep their own emoji."
- Why: Jo: one emoji at the start, afterwards only where it fits 100%. The current rule allows one in every message.

**ES-5 (MEDIUM) No complaint rule.** `es.md` section 6 (add after line 101).
- Current: nothing.
- Proposed: "Complaints and upset customers: no emoji, no exclamation marks, and no blame such as \"¿por qué nos escribiste?\", \"nunca pensaste usar el servicio\" or \"ya te dedicamos tiempo\". A short apology first, for example \"Lamento mucho la situación.\""
- Why: the English block has this rule (sections 2 and 6). Spanish chat culture is expressive, so without the rule the model will add "¡" and 😊 to apologies, which reads as not taking the customer seriously.

**ES-6 (MEDIUM) "Match excited with excited" invites gushing.** `es.md` line 20.
- Current: "Match the customer's length and energy. Calm with calm, excited with excited."
- Proposed: "Match the customer's length. Warm, never gushing: use exclamation marks sparingly, always with the opening ¡, and none in complaints."
- Why: English says "Warm, never gushing. Use exclamation marks sparingly". Mirroring a customer's "¡¡¡Gracias!!!" makes a tax service sound unprofessional.

**ES-7 (MEDIUM) Missing English rules on "no" and on agent answers.** `es.md` sections 2 and 6.
- Add to section 2: "After a clear no, one warm closing line, then stop, for example \"Sin problema. Si más adelante necesitas ayuda, aquí estamos.\""
- Add to section 6: "Open every answer about the registered tax agent with \"Claro.\", never with \"Sí\", \"Por supuesto que sí\" or \"Absolutamente\"."
- Why: both rules are in `en.md` (sections 2 and 6). Latin cultures expect a soft, friendly exit; one line, not a sales follow-up, is right.

**ES-8 (MEDIUM) Currency rule is ambiguous.** `es.md` line 100.
- Current: "Money: only \"$\" with AUD. Never convert to the customer's currency. The only fees are $220, $385, $330, $440 and $495 AUD."
- Proposed: "Money: write prices only as $220, $385, $330, $440 and $495, with no currency code after them. If the customer asks which currency, they are Australian dollars (\"dólares australianos\"). Never convert to the customer's currency."
- Why: "with AUD" can be read as "write $220 AUD", which the English and the fixed texts never do. In Mexico, Argentina, Chile and Colombia "$" is the local peso sign, so the one-line answer for "which currency?" is useful, but only when asked (Jo: prices stay as $220).

**ES-9 (LOW) Free phrase uses a different word for "review".** `es.md` line 80.
- Current: "Eso lo revisamos en el estudio de tu caso, que empieza con el pago."
- Proposed: "Eso lo vemos en la revisión de tu caso, que empieza una vez hecho el pago."
- Why: the fixed texts say "revisión" (REFUND_CHANCE_MSG: "esa revisión empieza una vez hecho el pago"); "estudio de tu caso" sounds like a lawyer's file. Same meaning as the English "covered in the review of your case, which starts once payment is made".

**ES-10 (LOW) Spain-only words in a block that promises neutral Spanish.** The block (line 12) says neutral Spanish, but several texts use words that are Spain-specific while others use Latin American words ("auto", "jeans"). Most Spanish-speaking customers are from Latin America (Argentina, Chile, Uruguay, Peru, Ecuador, Mexico, Colombia).
- `templates-i18n/es.json` `PAYMENT_RECEIVED_MSG`: "Rellena este formulario rápido" -> "Completa este formulario rápido". `FOLLOWUP_MSG.fu_form_6h`: "¿Ya pudiste rellenar el formulario?" -> "¿Ya pudiste completar el formulario?". `PRICE_FLOW_STEPS_*` step 2: "Rellena un formulario corto" -> "Completa un formulario corto".
- `src/lib/will/payment-proof.ts` line 375 (shared): "Mientras tanto puedes ir rellenando el formulario." -> "Mientras tanto puedes ir completando el formulario."
- `src/lib/form-i18n/es.ts` line 76 `invalidAuPhone`: "Escribe tu número de móvil australiano" -> "Escribe tu número de teléfono australiano" ("móvil" is Spain; "celular" is Latin America; "teléfono" is neutral).
- `templates-i18n/es.json` `MEDICARE_CANT_HELP_MSG`: "Vaya, lo siento." -> "Lo lamento." ("Vaya" as an interjection is Spanish from Spain and can sound flippant in Latin America; "Lo lamento" is neutral and warm, same meaning as "Sorry to hear that".)
- Why: "rellenar" is understood everywhere but marks the text as from Spain; "completar" is neutral. Note: fu_form_6h is a Meta template; changing it needs re-approval (see Jo section).

**ES-11 (LOW) "Insistido" sounds pushy.** `templates-i18n/es.json` `HANDOFF_BUMP_MSG`.
- Current: "Perdona la espera. Le he insistido al equipo por ti."
- Proposed: "Perdona la espera. Ya le volví a escribir al equipo por ti."
- Why: English is "I've followed up with the team for you". "Insistir" suggests nagging; "volver a escribir" is the plain follow-up. The preterite also reads more natural in Latin America.

**ES-12 (LOW) Awkward money phrase.** `src/lib/will/payment-proof.ts` line 317 (shared).
- Current: "La tarifa es mayor, así que falta un resto. Dime y te indico el importe exacto."
- Proposed: "La tarifa es mayor, así que falta una parte. Avísame y te indico el importe exacto."
- Why: "falta un resto" is not idiomatic; "Dime" alone is abrupt in a money message.

---

## 2. Brazilian Portuguese (pt)

### What is right

- The block chooses você, bans tu, teu, tua, contigo and "o senhor / a senhora". Right for young Brazilians: "o senhor" would be stiff, "tu" reads regional or European.
- "a gente" in everyday chat and "nós" in complaints and money matters is a good cultural call.
- "valor" instead of "taxa" for our fee is right: "taxa" sounds like a government charge.
- "restituição" for the ATO refund and "devolver a diferença" for the fee refund keep the two refunds apart, as Brazilians expect from their own IR vocabulary.
- "print" for screenshot, "Qualquer dúvida, é só chamar", "Que pena", "Desculpe a demora" are natural Brazilian WhatsApp style. Bans on "Atenciosamente", "Cordialmente" and on opening with praise are right.
- Most fixed texts are idiomatic Brazilian Portuguese with você and neutral gender ("Você não tinha cobertura do Medicare").
- Numbers: "5.000 km" and "$18.200" follow Brazilian convention.
- Button labels (Começar, Abrir a página, Ver o vídeo, Deixar avaliação) are fine.

### Problems and proposals

**PT-1 (HIGH) European Portuguese and tu forms in live chat lines.** All shared files, for another agent.
- `src/lib/will/text-normalize.ts` line 438, `THANKS_REPLIES_ML.pt[1]`: "Sempre que precisares! 😊" -> "Sempre que precisar! 😊". "precisares" is the tu form, European Portuguese; the block forbids it.
- `src/lib/will/later-plan.ts` line 54 (`FORM_LINE.pt`): "Sem problema 😊 Aqui está o link para quando puderes: ${FORM_URL}" -> "Sem problema 😊 Aqui está o link para quando você puder: ${FORM_URL}". "puderes" is tu.
- `src/lib/will/later-plan.ts` (`PAY_LINE.pt`): "Sem pressa 😊 Envia-me uma captura quando estiver feito." -> "Sem pressa 😊 Me mande um print quando estiver feito." "Envia-me" (tu imperative with enclisis) and "captura" are European; Brazilians say "me mande um print".
- `src/lib/will/later-plan.ts` (`ANY_LINE.pt`): "Sem pressa, quando te der jeito 😊" -> "Sem pressa, quando for melhor para você 😊". "dar jeito" in this sense is European Portuguese.
- Why: the channel sends pt as pt_BR and the block says European forms are wrong. A Brazilian receiving these will notice at once that the voice changed.

**PT-2 (HIGH) "Entretanto" means "however" in Brazil.** `src/lib/will/payment-proof.ts` line 376 (shared).
- Current: "Obrigado. Uma transferência internacional pode demorar alguns dias. Confirmo o pagamento assim que chegar à nossa conta. Entretanto você pode ir preenchendo o formulário."
- Proposed: "Agradeço. Uma transferência internacional pode demorar alguns dias. Confirmo o pagamento assim que chegar à nossa conta. Enquanto isso, você pode ir preenchendo o formulário."
- Why: "entretanto" = "meanwhile" only in Portugal; in Brazil it reads as "however", which changes the meaning. "Obrigado" -> "Agradeço": see PT-3.

**PT-3 (HIGH) The obrigado/obrigada rule is wrong.** `pt.md` line 21.
- Current: "Use \"obrigado\" or \"obrigada\" only when the customer's name makes the gender clear. Otherwise write \"Recebi, tudo certo.\""
- Proposed: "\"Obrigado\" or \"obrigada\" agrees with the person who is thanking, not with the customer. The same text is sent as Will and as Mia, so never write either in chat. Thank with \"Agradeço\" or \"Agradecemos\", or acknowledge with \"Recebi, tudo certo.\""
- Why: in Portuguese a man says "obrigado" and a woman says "obrigada", whatever the customer's gender. The current rule would make the model pick the form by the customer's name, which is a grammar error a Brazilian notices. The fixed texts already avoid the word ("agradecemos", "agradeço").
- Same problem in chat code (shared): `payment-proof.ts` line 319 and 320 "Obrigado, vejo um pagamento de ..." -> "Agradeço, vejo um pagamento de ...". On the website and form the business speaks as a company, where "Obrigado" is the normal default (`pt.ts` `thankYou`, `linkUsedBody`, `ResidencyFixPanel` `done`), so those can stay. See Jo item J2 for a more natural option.

**PT-4 (HIGH) "taxa" used for our fee.** `src/lib/will/payment-proof.ts` lines 319 and 320 (shared).
- Current: "A taxa é ${fee}, então faltam ${left}. Quando você enviar o restante, me manda um print e começamos logo." and "A taxa é maior, então falta um valor. Me diga e eu informo o valor exato."
- Proposed: "O valor é ${fee}, então faltam ${left}. Quando você enviar o restante, me mande um print e começamos logo." and "O nosso valor é maior, então falta uma parte. Me avise e eu informo o valor exato."
- Why: the block says "valor", never "taxa" (taxa reads as a government charge or a hidden fee, which is the wrong signal in a money message). "me manda" -> "me mande" for the você imperative the block requires.

**PT-5 (MEDIUM) "o ATO" (masculine) on the form.** The block and all fixed texts say "a ATO".
- `src/lib/form-i18n/pt.ts` line 102 `stepRefund`: "Sua declaração é revisada e enviada ao ATO" -> "Sua declaração é revisada e enviada à ATO".
- `src/components/ui/ResidencyDeclaration.tsx` line 140 `pt.intro` (shared): "Depois de ler esta página e as informações relevantes do ATO, declaro que sou:" -> "Depois de ler esta página e as informações relevantes da ATO, declaro que sou:".
- Why: the same customer sees "a ATO" in WhatsApp and "o ATO" on the form; it looks careless.

**PT-6 (MEDIUM) Guarantee sentence worded two ways.** `templates-i18n/pt.json` `PRICE_FLOW_STEPS_TFN` says "o nosso valor integral é cobrado"; `src/lib/will/approved-pt.ts` (`price_tfn`, `guarantee`, `no_refund_line`) says "o nosso valor integral se aplica" and "devolveremos" vs "nós devolvemos".
- Proposed (approved-pt.ts, shared): "Se a sua restituição for menor que o nosso valor, nós devolvemos a diferença. Se não houver restituição, o nosso valor integral é cobrado."
- Why: the guarantee is the most sensitive money sentence; it should read the same every time. "é cobrado" is clearer Brazilian Portuguese than the calque "se aplica". Spanish is already consistent.

**PT-7 (MEDIUM) "garantindo" next to a price.** `src/lib/will/approved-pt.ts`, all four price texts (shared).
- Current: "... preparamos e enviamos sua declaração de imposto, garantindo que você não deixe passar nada a que tem direito."
- Proposed: "... preparamos e enviamos sua declaração de imposto, para você não perder nada a que tem direito."
- Why: the block bans guarantee wording outside the TFN sentence; "garantindo" in a price message can be read as a promise. The proposed wording is the one PRICES_MSG already uses, and matches English "making sure you don't miss anything you're entitled to".

**PT-8 (MEDIUM) "renda estrangeira" vs "renda do exterior".** `approved-pt.ts` uses "renda estrangeira"; all fixed texts use "renda do exterior". Proposed: use "renda do exterior" in `approved-pt.ts` (shared). Why: one term per concept; "do exterior" is the usual Brazilian wording.

**PT-9 (MEDIUM) Name use missing from the block.** `pt.md` section 7 (add).
- Proposed: "Greet only in the first message of a conversation. If a real name is on file, use the first given name once, in that greeting, and never again in the chat. The follow-up reminders carry the name themselves."
- Why: Jo's rule and `en.md` section 2; `pt.md` says nothing about names.

**PT-10 (MEDIUM) Greeting word inconsistent.** `templates-i18n/pt.json` `FOLLOWUP_MSG.fu_pre_24h`.
- Current: "Olá {{1}}😊"
- Proposed: "Oi {{1}}😊"
- Why: English uses "Hey" here (the most casual greeting); every other pt follow-up and the opening use "Oi". "Olá" is the more formal word, so the most casual English line became the most formal Portuguese one. Meta template: needs re-approval.

**PT-11 (MEDIUM) Emoji rule is stricter than Jo's and contradicts the code.** `pt.md` line 101.
- Current: "Emoji: at most one emoji in a live reply, and only in the first message of the conversation. No emoji after that. ..."
- Proposed: "Emoji: one in the opening message. After that, at most one per message and only where a friendly person would clearly use one, such as a thank-you or good news. None in complaints. A message that states a price, fee or refund has at most one emoji. Fixed texts keep the emoji of their English text."
- Why: Jo allows a later emoji where it fits 100%, and the code already sends 😊 mid-chat in pt (thanks replies, later-plan lines). The block and the code should say the same.

**PT-12 (MEDIUM) No complaint rule.** `pt.md` section 6 (add).
- Proposed: "Complaints and upset customers: no emoji, no exclamation marks, use \"nós\", and no blame such as \"por que você entrou em contato\" or \"você nunca quis usar o serviço\". A short apology first, for example \"Sinto muito pelo transtorno.\""
- Why: `en.md` sections 2 and 6. "Sinto muito pelo transtorno" is the standard, sincere Brazilian service apology.

**PT-13 (MEDIUM) Agent and handoff behaviour differs from English.** `pt.md` lines 93 and 116 to 121.
- Current: "No yes or no answer about registration or supervision (see section 8)." and section 8 sends every question about registration or supervision to the team, and says the team will reply "and give no timing".
- Proposed line 93: "Agent titles and registration claims: no \"agente fiscal registrado\", \"contador\", \"contabilista\", \"CRC\", \"consultor tributário\" or \"técnico de contas\" as a description of us. Answer a legitimacy question with the approved meaning: open with \"Claro.\", never \"Sim\" or \"Com certeza\", then say we work under the supervision of a registered tax agent, with the client agreement link."
- Proposed section 8: remove the bullet "whether anyone is registered, supervised or a tax agent, including yes or no answers", and replace "give no timing" with "use the approved holding line (HANDOFF_HOLDING_MSG), which says normally within one business day; give no other time".
- Why: in English the legitimacy answer is approved wording and the handoff line includes "usually within one business day". Portuguese customers would get a less reassuring answer to "are you legit?", which in Brazilian culture (high wariness of online scams) costs trust.

**PT-14 (MEDIUM) Free phrase competes with the approved handoff line.** `pt.md` line 84.
- Current: "Entendi. Vou passar isso para a nossa equipe, e eles respondem aqui."
- Proposed: "Entendi, agradeço por explicar."
- Why: a free handoff sentence invites the model to skip HANDOFF_HOLDING_MSG, which carries the approved "normally within one business day". The replacement is a neutral acknowledgement with no gendered "obrigado".

**PT-15 (LOW) Free phrase sounds curt.** `pt.md` line 88.
- Current: "Qual é a sua dúvida exata?"
- Proposed: "Pode me contar qual é a sua dúvida?"
- Why: "dúvida exata" reads like an interrogation; the proposed line is the friendly Brazilian way to ask.

**PT-16 (MEDIUM) "dólares australianos" rule adds text the English does not have.** `pt.md` line 10.
- Current: "Once per conversation, add \"dólares australianos\" next to the first price, for example: \"Os valores são em dólares australianos.\""
- Proposed: "Write prices only as $220, $385, $330, $440 and $495. If the customer asks which currency, they are Australian dollars (\"dólares australianos\")."
- Why: Jo: prices stay as $220. Spanish has no such rule, so the two languages behave differently. Brazilians know R$ is the real, so "$" alone in an Australian context is clear. See J3 if Jo prefers the line in both languages.

**PT-17 (LOW) Stiff thanks in fixed texts.** `pt.json` `EXPENSES_INTAKE_MSG` ("Agradeço! Uma coisa rápida..."), `EXPENSES_DONE_MSG`, `DOCUMENTS_RECEIVED_MSG` ("Perfeito, recebi tudo, agradeço!"), `PAYMENT_LINK_READY` ("Agradeço!"), `PAYMENT_RECEIVED_MSG` and `FORM_RECEIVED_MSG` ("agradecemos!"). These are correct and gender neutral, but a standalone "Agradeço!" is more formal than the English "Thanks!". No change proposed until Jo decides J2.

---

## 3. For Jo

**J1. Spanish: European or neutral?** The block promises neutral Spanish, but fixed texts mix Spain words (rellenar, móvil, vaya, importe, he pasado) with Latin American ones (auto, jeans, centavos). Most Spanish-speaking customers are Latin American. My proposals in ES-10 and ES-11 move to neutral words. Please confirm neutral is the goal.

**J2. Portuguese thanks: "obrigado" for Will, "obrigada" for Mia?** Natural Brazilian chat says "obrigado/obrigada", not "agradeço". If `brand-voice.ts` can swap "obrigado" to "obrigada" in Portuguese SVT messages (it already swaps brand words on the way out), the fixed texts could use the warmer "Pagamento recebido, obrigado!" for Will and "obrigada" for Mia. Without that swap, "agradeço / agradecemos" (as now) is the only correct gender-neutral choice.

**J3. Currency line.** Decide one rule for es and pt: either never add anything to "$220" (my recommendation, matches your rule and the English), or add "dólares australianos" once in both languages. Note that in Mexico, Argentina, Chile and Colombia "$" is the peso sign.

**J4. Number format.** The estimate amount `{{AMOUNT}}` is formatted Australian style ("$1,234.56", `estimate-send.ts`), while the Spanish and Portuguese residency pages write "$18.200" and "$2.462". Brazil, Spain and Argentina use the dot; Mexico and Peru use the comma, so "$18.200" can look like eighteen dollars twenty to a Mexican. Recommendation: keep amounts in the Australian format in both languages, like the ATO and bank documents the customer sees. This is a decision, not a translation fix, so nothing is proposed above.

**J5. Meta templates.** `FOLLOWUP_MSG.*` and `REFUND_CHECKIN_MSG` are WhatsApp templates. ES-10 (fu_form_6h) and PT-10 (fu_pre_24h) change their text, which needs a new Meta approval. If that is not worth it now, apply them with the next template batch.

**J6. Registered tax agent term.** The Spanish block renders it as "agente fiscal registrado"; the Spanish and Portuguese forms and the Portuguese block keep "registered tax agent" in English. Pick one per language and use it everywhere. Keeping the English term avoids sounding like a local professional title.

**J7. Compound given names.** The greeting uses the first word of the name. Many Spanish and Brazilian customers go by two given names (María José, Juan Pablo, João Pedro, Ana Clara); "Hola, María" for María José is acceptable but slightly off. Low risk; mention only if you want the form's full given names used when there are two.

**J8. Native check.** Every Spanish and Portuguese file is marked "written by an agent, not checked by a native speaker". A short pass by one native speaker from Latin America and one from Brazil on the fixed texts would close the remaining risk, especially PT-1 and PT-2, which show earlier European Portuguese drafts got into code that the language blocks do not cover.

## Applied 18 Nov

Applied: ES-1 (already in es.json), ES-2, ES-3 ("¡Hola, Ana!", code and test), ES-4, ES-5 (already in es.md), ES-6 (already removed), ES-7 (already in es.md), ES-8 (prices with nothing added), ES-9 (already), ES-10 (rellenar, móvil, vaya: in es.json, payment-proof.ts and es.ts), ES-11 (es review's "He vuelto a avisar"), ES-12; PT-1, PT-2, PT-3 (block already correct; payment-proof "Agradeço"), PT-4, PT-5, PT-6, PT-7, PT-8, PT-9, PT-10 (fu_pre_24h "Oi"), PT-11, PT-12, PT-13, PT-14, PT-15 (already in pt.md after the pt review), PT-16. J3: prices never get anything added in either language (Jo). J4: amounts written as the English ($18,200) in every language (Jo). J6: Spanish keeps "agente fiscal registrado" (es review); Portuguese keeps "registered tax agent" in English.

Not applied: PT-17 (no change proposed); J2 (an obrigado/obrigada swap per brand: the neutral "agradeço/agradecemos" stays, Jo has not asked for a swap); J7 (compound given names: Jo's rule is one name word); J5 (the Meta templates fu_form_6h and fu_pre_24h need re-entering in WhatsApp Manager, for Jo).
