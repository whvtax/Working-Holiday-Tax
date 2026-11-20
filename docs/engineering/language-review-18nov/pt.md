# Language review: Portuguese (pt-BR), 18 Nov

Reviewer: pt-BR language review agent (an agent, not a human native speaker). Brief: `BRIEF.md` in this folder.

## 1. Strings checked

- Fixed messages: all 43 keys of `docs/engineering/templates-i18n/SOURCE.json` against `pt.json` (and so `src/lib/will/template-translations.generated.ts`), line by line for meaning, placeholders (`{{1}}`, `{{AMOUNT}}`, `${AMOUNT}`), links, emoji positions, line breaks, prices and the guarantee (TFN steps only).
- Button labels in `src/lib/will/channel.ts`: FORM_BUTTON_LABEL, RESIDENCY_BUTTON_LABEL, MEDICARE_BUTTON_LABEL, REVIEW_BUTTON_LABEL (pt).
- Free replies: `docs/engineering/language-blocks/pt.md` against `en.md`, section by section. Also the pt parts of `playbook.ts` (only the language label, nothing to fix), `instant-choice.ts` (pt uses `approved-pt.ts`, reviewed), `svt-fixed-texts.ts` (zh and vi only, no pt), the pt legacy tables in `i18n.ts`, and the pt patterns in `policy-guard.ts` (probed with sample sentences).
- Forms: `src/lib/form-i18n/pt.ts` (all 87 keys against the English in `formStrings.ts`), pt in `ResidencyStep.tsx`, `ResidencyDeclaration.tsx`, `ResidencyFixPanel.tsx`, `form-residency-copy.ts` (PT_RES), `form-brand-svt.tsx` (wires PT_RES, no text).

Overall the fixed messages were already good: natural Brazilian Portuguese, "você" throughout, no European forms, no added or missing content, prices, placeholders and links identical. The language block was the weak part (it differed from the English rules in several places).

## 2. Changes made

### 2a. `docs/engineering/templates-i18n/pt.json` (regenerated with `node scripts/build-template-translations.mjs`)

| Key | Before | After | Why |
|---|---|---|---|
| RESIDENCY_CHECK_MSG | "Algumas pessoas com esse visto são consideradas residentes fiscais na Austrália, e isso muda..." | "Algumas pessoas com esse visto, na verdade, são consideradas residentes fiscais na Austrália, e isso muda..." | The English "instead" (rather than Working Holiday Maker) was missing. |
| REQUEST_ABN_MSG | "Você tem faturas ou registros do que ganhou?" | "Você tem notas fiscais ou registros do que ganhou?" | One word for "invoices" everywhere; the form already says "notas fiscais", the natural pt-BR word. |
| EXPENSES_INTAKE_MSG | "envie as faturas do aluguel" | "envie as notas fiscais do aluguel" | Same term as above. |
| `_notes` | note said "obrigado/obrigada only when the gender is clear" | corrected; review note added | See 2b (thanks rule). Notes are not sent. |

### 2b. `docs/engineering/language-blocks/pt.md` (regenerated with `node scripts/build-language-rules.mjs`)

Rewritten so it carries the same rules as `en.md`. Main points, before / after / why:

1. Legitimacy question. Before: "whether anyone is registered, supervised or a tax agent" went to the team with no answer, and section 6 banned any yes/no on supervision. After: answered directly, as in English and `playbook.ts` (the agent/TPB question is "NOT a handoff"): "Claro. Operamos sob a supervisão de um registered tax agent. Você encontra mais detalhes aqui: https://workingholidaytax.com.au/client-agreement", opened with "Claro.", never "Sim". Signed-off phrase given too. The title stays in English: in Brazil "agente fiscal" is a government tax inspector, so "agente fiscal registrado" stays forbidden.
2. Handoff time. Before: "say the team will reply here, and give no timing". After: use HANDOFF_HOLDING_MSG ("em até um dia útil"), the only time promise allowed, as in English.
3. "obrigado/obrigada". Before: "only when the customer's name makes the gender clear". That is wrong Portuguese: the word agrees with the speaker, not the customer. Since Will and Mia send the same texts, the block now asks for neutral forms ("Agradeço!", "Agradecemos!", "Recebi, tudo certo.").
4. Money. Before: "Once per conversation, add 'dólares australianos'... 'Os valores são em dólares australianos.'" (a rule the English does not have; "dólares" is also a currency word in the guard). After: "$" with the amount as in English; say "dólares australianos" only if the customer asks which currency; never convert.
5. ATO gloss. Before: "a ATO, o órgão de impostos da Austrália" forced on first mention (not in English, and the fixed texts do not do it). After: "a ATO" (feminine), explained only if asked; "o ATO" listed as wrong.
6. Emoji. Before: "only in the first message of the conversation. No emoji after that." After: Jo's rule: one emoji at the start, later only where it clearly fits, at most one per reply.
7. Added from `en.md`, missing before: answer first; name once (back only in reminders); "nós" vs "eu"; exclamation marks sparingly, none in complaints; match length; benefit once; one closing line after a no; guarantee rules (TFN only, never widened, never for ABN, foreign or lodged returns); allowed day counts (fee refund 14 days, ATO payment email 14 days); no "hoje / amanhã / o quanto antes / vou verificar"; allowed prices and "$330 never without its label"; no IBAN/SWIFT; social proof ban; customers who owe tax; complaint wording ban; default length (1 to 3 sentences, under 40 words, about 450 characters); never restate; "Você é um robô?" goes to a person with no draft; payment confirmed only after the screenshot is matched.
8. Terms table: added rows for TFN/ABN, income from abroad ("renda do exterior"), invoices ("notas fiscais"), Medicare, DASP, myGov ("Você não precisa entrar em nada para isso. Nós tratamos diretamente com a ATO.").
9. Section 4: added PRICE_FLOW_STEPS foreign variants and the `approved-pt.ts` price texts that the code sends; corrected the false line "No fixed text exists for... the one-message price texts". Every quoted phrase was checked by script against `pt.json` / `approved-pt.ts`: all match exactly.
10. Section 5: phrases rewritten to mirror the English list (none promises anything).

Nothing in the block limits pt to one brand.

### 2c. `src/lib/form-i18n/pt.ts`

| Key | Before | After | Why |
|---|---|---|---|
| registeredAgentNo | "...registered tax agent, n.º" | "...registered tax agent, nº" | "n.º" is European; Brazil writes "nº". |
| invoicesHint | "Adicione até 10 recibos ou notas fiscais, sem custo." | "Adicione até 10 notas fiscais, sem custo." | English is "Add up to 10 invoices for free."; "recibos ou" was added. |
| submitTax | "Enviar a declaração →" | "Enviar a declaração de imposto →" | English "Submit Tax Return". "a declaração" alone is mixed up with the "Declaração" (Declaration) section just above it. |
| fileTooLarge | "...tente comprimir ou tire uma foto do documento." | "...tente comprimir o arquivo ou tirar uma foto do documento." | Grammar (parallel infinitives). |
| stepRefund | "...enviada ao ATO" | "...enviada à ATO" | "a ATO" is feminine in every other pt text. |
| header | (marker kept) | added a line saying the pt review checked it | The test requires the marker "written by an agent, not checked by a native speaker (18 Nov 2026)", so it stays. |

## 3. Shared-file changes for another agent (exact)

1. `src/components/ui/ResidencyDeclaration.tsx`, pt block, `intro`: current "Depois de ler esta página e as informações relevantes do ATO, declaro que sou:" corrected "Depois de ler esta página e as informações relevantes da ATO, declaro que sou:". Why: "a ATO" is feminine everywhere else.
2. Same file, pt, `confirmP2strong`: "não tem direito à faixa isenta de $18.200" corrected "não tem direito à faixa de isenção de $18.200". Why: "faixa de isenção" is the normal pt-BR term for a tax-free threshold.
3. Same file, pt, `confirmNote`: "Pessoas do seu país às vezes podem ser consideradas residentes fiscais australianas e manter a faixa isenta. Se esse pode ser o seu caso, reveja suas respostas antes." corrected "Pessoas do seu país às vezes podem ser consideradas residentes fiscais australianas e manter a faixa de isenção. Se isso puder se aplicar a você, reveja suas respostas antes." Why: wrong mood ("Se esse pode" needs the subjunctive) and the same term as above.
4. `src/components/svt/form-residency-copy.ts`, PT_RES, `confirmLead`: "...a faixa isenta de $18.200 e o Low Income Tax Offset não se aplicam..." corrected "...a faixa de isenção de $18.200 e o Low Income Tax Offset não se aplicam...". Why: same term.
5. `src/components/ui/ResidencyStep.tsx`, pt, `introEmph`: "Ela não tem a ver com a sua situação migratória." corrected "Ela é independente da sua situação migratória." Why: English "It is separate from your immigration status."; "não tem a ver" ("has nothing to do with") is stronger and more casual.
6. `src/components/ui/ResidencyStep.tsx`, pt, `quizIntro`, last sentence, and PT_RES `quizIntro` in `form-residency-copy.ts`, the same sentence: "Quem decide no fim é a ATO, depois que enviarmos a sua declaração." corrected "A decisão final sobre a sua residência é da ATO, depois que enviarmos a sua declaração." Why: English "makes the final decision on your residency"; "on your residency" was missing.
7. `src/lib/will/channel.ts`, RESIDENCY_BUTTON_LABEL.pt: "Abrir a página" corrected "Teste de residência" (19 characters). Why: English "Tax residency test". Low priority; de/es/fr/it took the same "open the page" freedom, so Jo may prefer to keep them all alike.
8. `src/lib/will/channel.ts`, MEDICARE_BUTTON_LABEL.pt: "Ver o vídeo" corrected "Como solicitar". Why: English "How to apply". Same low-priority note as 7.
9. `src/lib/will/channel.ts`, FORM_BUTTON_LABEL.pt: "Começar" may stay; the closest to "Start here" is "Comece aqui". Optional.
10. `src/lib/will/approved-pt.ts`: (a) `price_tfn_foreign` and `price_tfn_abn_foreign`: "renda estrangeira" (twice each) corrected "renda do exterior". Why: the fixed texts say "renda do exterior"; one term. (b) `price_tfn` and `guarantee`: "Se a sua restituição de imposto for menor que o nosso valor, devolveremos a diferença. Se não houver restituição, o nosso valor integral se aplica." corrected "Se a sua restituição for menor que o nosso valor, nós devolvemos a diferença. Se não houver restituição, o nosso valor integral é cobrado." and `no_refund_line` "Se não houver restituição, o nosso valor integral é cobrado.". Why: same guarantee wording as PRICE_FLOW_STEPS_TFN ("se aplica" is a calque). (c) header comment: add that the pt review checked it on 18 Nov. Meaning, prices and guarantee scope were otherwise correct.
11. `src/lib/will/policy-guard.ts` (not in the brief's list, reported because it affects how safely pt replies are checked). The Portuguese patterns are European, so pt-BR wording passes. Probed with `lastCustomerMsgAt` set and not paid: "Somos um registered tax agent." allowed; "Acesse o myGov, clique em Impostos e selecione Declaração." allowed; "A equipe responde em breve." allowed. (Every pt sentence is flagged `unguardedLanguage`, so Autopilot holds it for review; that is the only safety net.) Suggested additions:
    - AGENT_CLAIM, Portuguese line: also match `\b(?:somos|sou)\s+(?:um\s+|uma\s+)?registered\s+tax\s+agent`.
    - MYGOV_STEP_CUE_ML: add pt-BR "você" imperatives: `acesse|entre (?:no|na|em)|fa[çc]a (?:o )?login|clique|selecione|digite|abra|crie (?:um|uma)|redefina|vincule|conecte`.
    - DIY_INSTRUCTIONS_ML: add `voc[êe] mesmo pode enviar|envie voc[êe] mesmo|fa[çc]a voc[êe] mesmo`.
    - MYGOV_REASSURANCE_ML, Portuguese: add `\bn[ãa]o precisa\b`, `\bnunca precisa\b`, `\bn[óo]s tratamos\b`, `\ba gente cuida\b`.
    - A team-timeline check for pt: `em breve|ainda hoje|at[ée] amanh[ãa]|o quanto antes|em 24 horas` (the English patterns do not see them).
12. `src/lib/will/i18n.ts`, REVIEW_REQUEST_MSG.pt (legacy, no longer sent; only if it is ever revived): "Muito obrigado por confiar em nós com a sua declaração de imposto!" corrected "Muito obrigado por nos confiar a sua declaração de imposto!". Why: "confiar em nós com" is an English calque.

## 4. For Jo

- Agent wording in pt: the block now has the supervision and signed-off phrases with "registered tax agent" kept in English ("Operamos sob a supervisão de um registered tax agent"). In Brazil "agente fiscal" means a government tax inspector, so a Portuguese title would mislead. There is no pt entry in AGENT_PHRASES; if you want one in the code, use the two sentences in section 4 of `pt.md`.
- Thanks: "obrigado" is said by a man and "obrigada" by a woman. Because Will and Mia send identical texts, all pt texts use "agradeço / agradecemos". Please keep it that way in any new pt text.
- The policy guard reads pt as European Portuguese (item 11 above). Until it is extended, pt replies depend on the Autopilot hold for unguarded languages.
- RESIDENCY_CHECK_MSG and PAYMENT_RECEIVED_MSG links: `localizeOwnLinks` adds the /pt/ path where one exists; nothing to change in the text.

## 5. Checks

- `npx tsc --noEmit -p .`: clean.
- `npx jest --forceExit` on the three suites: 267 of 269 passed. Both failures belong to other languages, not pt: "detection of our own messages works in every language > fr" (French FORM_RECEIVED_MSG no longer detected) and "each new block says it was not checked by a native speaker" (`src/lib/form-i18n/vi.ts` lost the marker; pt keeps it). Every pt case passes.

## 6. Verdict

Fixed messages: correct and identical in meaning to the English after three small fixes. Forms: correct after five small fixes in `pt.ts`; six wording fixes left for another agent in the shared residency files and button labels. Language block: now carries the same rules, tone and forbidden content as `en.md` and works for both brands. Ready, once the shared-file items above are applied; item 11 (guard) is the most important for safety.

## Applied 18 Nov

Applied:
1. ResidencyDeclaration pt intro "da ATO", confirmP2strong and confirmNote ("faixa de isenção", subjunctive); PT_RES.confirmLead; ResidencyStep pt introEmph; quizIntro in both files ("A decisão final sobre a sua residência é da ATO").
2. channel.ts: RESIDENCY "Teste de residência", MEDICARE "Como solicitar", FORM "Comece aqui".
3. approved-pt.ts: "renda do exterior"; guarantee and no_refund_line as in the price flow ("nós devolvemos", "é cobrado"); "para você não perder nada" instead of "garantindo"; screenshot line as in the price flow.
4. policy-guard.ts: "Somos um registered tax agent" and similar are AGENT_CLAIM; pt-BR myGov step verbs; "você mesmo pode enviar" is DIY; a new TEAM_TIME_PROMISE check for pt-BR ("em breve", "hoje mesmo", "o quanto antes"). Tests: `policy-guard-languages-18nov.test.ts` with your sentences.
5. Numbers as the English ($18,200). fu_pre_24h "Oi {{1}}😊" (culture PT-10). Older form review: "moradia habitual", stepper "Etapa".
6. Culture PT-1, PT-2, PT-4: "Sempre que precisar", later-plan lines in você, "Enquanto isso", "Agradeço", "O valor é", "me mande".
7. AGENT_PHRASES.pt in the code (the block's two sentences); MYGOV_REASSURANCE.pt added.

Not applied: the MYGOV_REASSURANCE_ML additions (they would let more sentences past the myGov check; the approved pt reassurance is not caught by the new step verbs, so nothing needs excusing); REVIEW_REQUEST_MSG.pt (removed message, never sent).
Checks after applying: `npx tsc --noEmit -p .` clean; full `npx jest --forceExit` passing except the two security suites that need `.env.example`.
