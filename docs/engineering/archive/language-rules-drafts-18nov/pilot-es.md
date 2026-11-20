# Will Spanish (es): decision log and pilot

Written in English so Jo can read it. The rules themselves are in es.md (Spanish). Each decision has a one-line reason. Items marked LEGAL REVIEW must not go live without sign-off.

## Part 1: Decision table

| # | Question | Decision | Reason |
|---|---|---|---|
| 1 | Supervision and signed-off phrases | Spanish rendering written and used in chat only when the customer asks who reviews or signs. Site sentence "agente fiscal registrado" not used in chat. LEGAL REVIEW. | The site term clashes with decision 4 and the forbidden-title list. |
| 2 | Guarantee wording | Two approved sentences in Spanish, TFN only, in the TFN price message and when asked. No added conditions. LEGAL REVIEW. | Strictly the approved meaning; the 14-day and Notice of Assessment terms are playbook conditions, not approved wording. |
| 3 | Fee term | "tarifa" for our charge; "precio" only when the customer says it. | The site uses "tarifa"; "precio" reads like a shop price. |
| 4 | Tax agent term | "tax agent registrado", English title kept. LEGAL REVIEW. | A Spanish title ("agente fiscal", "contador") could imply a status the approved English does not claim. |
| 5 | Superannuation and DASP | Keep "superannuation" and "DASP". Line says "por el momento". LEGAL REVIEW of the site's DASP page. | "por el momento" matches the approved "at the moment"; "por ahora" was never approved. |
| 6 | Variety | Neutral Spanish with tú. No vos, no vosotros, no usted unless the customer uses it. | Every approved Spanish text and the site use tú. |
| 7 | myGov and ATO, overseas | Playbook wording in Spanish, no steps added. LEGAL REVIEW. | The playbook gives the wording; any extra step would be DIY advice. |
| 8 | Bot question | Hand over with no draft. No Spanish line. | Playbook rule 8 says leave the draft empty; Jo decides any exact line. |
| 9 | "no reembolsable" | Not used in chat. Point-blank answer uses the full-fee sentence. LEGAL REVIEW (conflict below). | en.md bans "non-refundable"; playbook line 220 uses it for a system-only sentence. |
| 9b | "Quedo atento" | Not used. | It is a formal closing; the closing is the next step. |
| 10 | Currency | "AUD" after each figure in Spanish. Figures unchanged. | In Latin America "$" reads as the local currency. |
| 11 | Greeting | "¡Hola, Ana! 😊 Con gusto te ayudo." | Spanish version of the approved "Hey! 😊 Happy to help." |
| 12 | Complaints | No emoji, no exclamation marks. | en.md section 2 says the same for complaints. |

Conflicts found while deciding (for Jo):
- The Spanish site (src/app/(es)/es/superannuation/page.tsx) is a full DASP how-to with the 65 % rate and a 28-day deadline. The approved meaning says DASP is not available. LEGAL REVIEW.
- The Spanish site says "agente fiscal registrado" and "te devolvemos la diferencia" on several pages (for example es/page.tsx and es/tax-return/page.tsx). Chat and site must match, so Jo should choose one term. LEGAL REVIEW.
- Playbook line 220 replaces the guarantee with an English "non-refundable" sentence for some customers. A Spanish customer would receive English text unless the system translates it. LEGAL REVIEW.

## Part 2: Pilot

Each customer message is a realistic one. The reply follows es.md. The self-check is one line.

### P1: plain question

Customer: "Hola! Quiero hacer mi declaración de impuestos en Australia, ¿cómo funciona?"

Reply:
"¡Hola! 😊 Con gusto te ayudo. Revisamos tu situación y después preparamos y presentamos tu declaración de impuestos. Para indicarte la opción correcta, una pregunta: ¿trabajaste solo para empleadores con TFN, o también con ABN?"

Self-check: the answer comes first, there is one question and one emoji, and it uses tú.

### P2: price question

Customer: "¿Cuánto cuesta?"

Reply:
"Tenemos dos opciones:

*TFN: $220 AUD*
Revisamos tu residencia fiscal, Medicare y deducciones, y después preparamos y presentamos tu declaración de impuestos, para que no se te pase nada de lo que te corresponde.

*TFN + ABN: $385 AUD*
Todo lo de la opción TFN, más una sección de negocio para tus ingresos y gastos con ABN.

¿Cuál opción te conviene más?"

Self-check: it uses the approved menu, the two approved figures and AUD, with one question at the end.

### P3: payment claim

Customer: "Ya hice la transferencia"

Reply:
"¡Genial, gracias por avisar! ¿Me mandas una captura de la transferencia? 😊"

Self-check: it asks for a screenshot and does not treat the words as proof of payment, which matches the playbook.

Gap found: es.md had no Spanish line for a payment claim, so the reply was improvised. Fixed: added the "Pago declarado" line to es.md section 4 and the rule to section 9.

### P4: complaint

Customer: "Llevo tres días esperando respuesta y ya pagué los 220. Esto es una estafa."

First reply (draft, failed the check):
"Lamento que no hayas tenido respuesta antes 😊 Se lo he pasado al equipo. Te responderán aquí, normalmente en un día hábil."

Self-check: FAIL. The emoji breaks the complaint rule in es.md section 6, and the approved handoff line carries an emoji that the rule forbids here.

Gap found: es.md did not say which handoff text to use in a complaint. Fixed: added a version with no emoji to section 4 and a rule to section 6.

Final reply:
"Lamento que no hayas tenido respuesta antes. Se lo he pasado al equipo. Te responderán aquí, normalmente en un día hábil."

Final self-check: no emoji, no promise, no new date, no argument with the customer.

### P5: yes or no question

Customer: "Solo trabajé con TFN. Si no me sale devolución, ¿igual pago los 220?"

Reply:
"Si no hay devolución, sí: se aplica la tarifa completa, que es de $220 AUD. Si tu devolución de impuestos es menor que nuestra tarifa, te devolvemos la diferencia. Cuando quieras seguir, te paso los datos para el pago."

Self-check: the answer comes first, the guarantee is quoted only because the customer said TFN only, and there is no "no reembolsable" and no new figure.

Gap found while checking the variant of this message where the customer has not said their option yet: the guarantee cannot be quoted for an unknown option. Fixed: added a rule to es.md section 9 to ask about TFN first.

## Part 3: Result

- Five messages, five replies.
- Three gaps found and fixed in es.md: payment claim, complaint handoff without emoji, guarantee with unknown option.
- Replies use only approved figures ($220, $385 AUD).
- No dashes in the replies or in es.md.
