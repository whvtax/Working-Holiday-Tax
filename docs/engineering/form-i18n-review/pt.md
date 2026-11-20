# Portuguese (pt-BR) review of the tax form, 18 Nov 2026

Verdict: **ready after shared-file fixes**. The form itself (`src/lib/form-i18n/pt.ts`) is ready now. Two shared-file items should be fixed before launch (S1, S2 below); the rest are polish.

## Scope

163 Portuguese strings checked against their English originals:

| Where | Strings |
|---|---|
| `src/lib/form-i18n/pt.ts` | 85 |
| `src/components/svt/form-residency-copy.ts` (`PT_RES`) | 20 |
| `src/components/ui/ResidencyStep.tsx` (`pt`) | 14 |
| `src/components/ui/ResidencyDeclaration.tsx` (`pt`) | 17 |
| `src/components/ui/ResidencyFixPanel.tsx` (`pt`) | 12 |
| `src/components/ui/FormStepper.tsx` (`pt` steps and "of") | 4 |
| `src/lib/submit-tax-form.ts` (`FIELD_LABELS.*.pt`) | 8 |
| `src/lib/form-lang.ts` (`Português`, `pt-BR`) | 1 |
| SVT `pt` page titles (`svt-site/pt/jhd7hp9xd/**`) | 2 |

General finding: the text is Brazilian Portuguese throughout ("você", "a gente", "celular", "arquivo", gerunds). No European forms, no accent or agreement errors, no em or en dashes, no mention of AI or bots, no claim that the business is a registered tax agent, no refund promise. TFN, ATO, Medicare, BSB, WHM, Low Income Tax Offset, Client Agreement and Privacy Policy stay in English. All placeholders (`{n}`, `{max}`, `{name}`, `{reason}`, `{link}`, `{ca}`, `{pp}`, `\n\n`) are intact. Prices and amounts ($18.200, $700, 4 MB, 15 minutos, 24 horas, 10 files) match the English.

## Changes made in `src/lib/form-i18n/pt.ts` (13)

| Key | Before | After | Why |
|---|---|---|---|
| `englishOnlyNotice` | Você pode ler o formulário no seu idioma, mas escreva suas respostas em inglês, por favor. | Escolha o seu idioma para ler as instruções, mas escreva suas respostas em inglês, por favor. | English says "Choose your language to see instructions"; the old text dropped the instruction to choose. |
| `timeEstimate` | ⏱ Leva mais ou menos 1 minuto | ⏱ Leva cerca de 1 minuto | Shorter and less vague for a badge. |
| `waHint` | Use o mesmo número da nossa conversa, assim ligamos o seu formulário ao chat. | Use o mesmo número pelo qual você está conversando com a gente, para associarmos o seu formulário à nossa conversa. | In Brazil "ligamos" reads first as "we phone"; a customer could think they will get a call. |
| `invoicesHint` | Você pode adicionar até 10 notas, sem custo. | Adicione até 10 recibos ou notas fiscais, sem custo. | "notas" alone is ambiguous (notes, banknotes, grades); now matches the field label. |
| `selfieHint` | ...é apagada logo depois da verificação. | ...é apagada imediatamente após a verificação. | Privacy commitment: English says "immediately", "logo depois" is weaker ("soon after"). |
| `declaration` | Li e aceito o {ca}...{/ca} e a {pp}...{/pp}. | Li e concordo com o {ca}...{/ca} e com a {pp}...{/pp}. | English is "read & agree to"; "concordo com" is the faithful declaration wording. Markers unchanged. |
| `mustAgree` | Você precisa aceitar para enviar | Você precisa concordar para enviar | Consistent with the declaration verb. |
| `fixBeforeSubmit` | Antes de enviar, corrija isto: | Antes de enviar, corrija o seguinte: | "corrija isto" sounds translated before a list. |
| `invalidTfn` | Um TFN tem 8 ou 9 dígitos | O TFN tem 8 ou 9 dígitos | Natural article. |
| `invalidAuPhone` | Digite o seu celular australiano, ex.: ... | Digite o número do seu celular australiano, ex.: ... | You type a number, not a phone. |
| `invalidPhone` | Digite um número válido com o código do país, ... | Digite um número de telefone válido com o código do país, ... | English says "phone number"; without it the error is unclear next to TFN errors. |
| `stepRefund` | Sua declaração é revisada e enviada à ATO | Sua declaração é revisada e enviada ao ATO | "o ATO" (o Australian Taxation Office) is the usual form among Brazilians in Australia and is what the rest of the repo's Portuguese uses. See doubt D1. |
| `etaLabel` | Normalmente respondemos em até 24 horas | Normalmente entramos em contato em até 24 horas | English is "we message you"; "respondemos" implies the customer must write first. |

The header comment "written by an agent, not checked by a native speaker (18 Nov 2026)" was left in place because the test pins it. No test string needed updating.

Checks: `npx tsc --noEmit -p .` clean; `npx jest --forceExit src/lib/__tests__/form-nine-languages-18nov` 42/42 pass.

## Proposed shared-file changes (not edited)

### Should fix before launch

**S1. `src/components/ui/ResidencyDeclaration.tsx`, `pt.intro`** (declaration, must be faithful)
- Current: `Depois de ler esta página e as informações da ATO, declaro que sou:`
- Proposed: `Depois de ler esta página e as informações relevantes do ATO, declaro que sou:`
- Why: English is "the relevant ATO information"; "relevant" was dropped.

**S2. `src/components/svt/form-residency-copy.ts`, `PT_RES.introEmph`**
- Current: `Ela não depende do seu visto.`
- Proposed: `É uma questão separada do seu visto.`
- Why: English is "It is separate from your visa." "Does not depend on" is a stronger factual statement than the source makes.

**S3. `quizIntro` in both `PT_RES` (`form-residency-copy.ts`) and `pt` (`ResidencyStep.tsx`)**: same text in both files
- Current: `...a maioria dos pontos abaixo precisa valer de verdade para você.\n\nSe for o caso, você pode escolher "Residente fiscal australiano". Quem decide no fim é a ATO, depois que enviarmos a sua declaração.`
- Proposed: `...a maioria dos pontos abaixo deve realmente se aplicar a você.\n\nSe for o caso, você pode escolher "Residente fiscal australiano". A decisão final sobre a sua residência é do ATO, depois que enviarmos a sua declaração.`
- Why: "should" was rendered as "must" ("precisa"), and "final decision on your residency" lost "on your residency". (First sentence up to "livres de imposto," is fine and unchanged.)

### ATO gender, for consistency with pt.ts (see D1)

- `ResidencyFixPanel.tsx`, `pt.intro`: `...e quem decide no fim é a ATO.` -> `...e a decisão final é do ATO.`
- `form-residency-copy.ts`, `PT_RES.declIntro`: `...as informações da ATO, declaro que, para fins fiscais, sou:` -> `...as informações do ATO, declaro que, para fins fiscais, sou:`
- S1 and S3 above already carry "do ATO".

### Polish

- `"faixa isenta"` -> `"faixa de isenção"` (the standard Brazilian tax term for a tax-free threshold):
  - `form-residency-copy.ts`, `PT_RES.confirmLead`: `...a faixa isenta de $18.200 e o Low Income Tax Offset não se aplicam, e que há imposto desde o primeiro dólar.` -> `...a faixa de isenção de $18.200 e o Low Income Tax Offset não se aplicam, e que o imposto incide desde o primeiro dólar.`
  - `ResidencyDeclaration.tsx`, `pt.confirmP2strong`: `não tem direito à faixa isenta de $18.200` -> `não tem direito à faixa de isenção de $18.200`
  - `ResidencyDeclaration.tsx`, `pt.confirmNote`: `...e manter a faixa isenta.` -> `...e manter a faixa de isenção.`
- `"casa habitual"` -> `"moradia habitual"` ("usual home"; "casa habitual" is not idiomatic):
  - `form-residency-copy.ts`, `PT_RES.questions[2]`: `Sua casa habitual durante o ano fica na Austrália` -> `Sua moradia habitual durante o ano fica na Austrália`
  - `ResidencyStep.tsx`, `pt.questions[1]`: `Sua casa habitual fica na Austrália` -> `Sua moradia habitual fica na Austrália`
- `ResidencyStep.tsx`, `pt.introEmph`: `Ela não tem a ver com a sua situação migratória.` -> `É uma questão separada da sua situação migratória.` (same reasoning as S2; lower priority since "não tem a ver" is close).
- `FormStepper.tsx`, `OF.pt`: `Passo ${s} de ${t}` -> `Etapa ${s} de ${t}` (optional; "Etapa" is the usual word in Brazilian forms, "Passo" is understood).

Everything else in the shared files is correct and natural as it stands (all four student questions other than the one above, all six WHT questions other than the one above, session-lost texts, labels, confirm buttons, fix panel, field labels, page titles).

## Doubts

- **D1. "o ATO" vs "a ATO".** Both exist in real Brazilian usage. I chose masculine because it is the more common form and matches the Portuguese already elsewhere in the repo. If the owner prefers feminine, revert `stepRefund` to "à ATO" and skip the gender-only proposals; what matters is one form everywhere. Until the shared files are aligned, the thank-you screen says "ao ATO" and the residency step says "a ATO".
- **D2. `registeredAgentNo`** (`Sob a supervisão de um registered tax agent, n.º`) is only the alt text of the seal image. It names supervision and does not claim the business is registered. Left as is.
- **D3. Gender.** "Obrigado", "considerado", "Residente fiscal australiano" use the generic masculine, standard in Brazilian forms; "Solteiro(a)" / "Casado(a)" carry both. Left as is.
- **D4. Examples.** `phWaNumber` and `invalidPhone` use a Brazilian example number (+55 11 ...) instead of the English UK one, and `phCountry` says "Brazil (em inglês)". This follows the German and Japanese pattern and is helpful, not a number change in the pricing sense.
- **D5. `checkResidency`** (`Continuar: residência fiscal →`, 30 chars vs 28 in English) fits the button; "Continuar para a residência fiscal →" would be more literal but longer.
- **D6.** `ResidencyStep.tsx` `pt` carries only the keys rendered today (per the code comment and the `StepCopy` type). The older English-only keys (`whyTitle`, `warn`, etc.) were not reviewed because they are not shown.

## Applied 18 Nov

S1 to S3 and the faixa de isenção items are in the code (18 Nov review). Applied now: "moradia habitual" (both files) and the stepper "Etapa". ATO gender: "a ATO" everywhere (Jo, decision 10), so the "do ATO" proposals are not applied.
