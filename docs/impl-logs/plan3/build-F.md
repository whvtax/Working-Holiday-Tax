# build-F (Spanish, WHT) 24 Nov 2026

Owner: src/app/(es)/ only. Not touched: src/lib/locale-guide-slugs.ts (lead), components, legal, Will, tracking,
titles/descriptions/H1s of existing pages (only the factual "12" in the ES refund-time guide description changed).

## Verification
- `npx tsc --noEmit -p .`: clean.
- Full `npx jest`: 9 failed suites = the 8 known (form-start-lang-18nov + 7 Will suites) + new-locales-sitemap.
  new-locales-sitemap fails ONLY on `LOCALE_GUIDE_SLUGS.{fr,it,es} matches the chunk data` (lead list). ES needs these 5
  added to LOCALE_GUIDE_SLUGS.es (149 ES guides in chunk data now):
  "claim-super-without-mygov", "mygov-account-locked-out", "mygov-sms-code-not-received-overseas",
  "tax-refund-closed-australian-bank-account", "tax-return-without-mygov"
- locale-blog.test (ES chunks keyed by real EN slugs, no dashes, no AI / "somos agente"): pass. EN twins found in
  src/app/(site)/blog/data-mygov.ts and data-problems.ts.
- `__tests__/wht-copy-compliance-6-languages.test.ts` does not exist in this repo (only __tests__/setup.js); not run.
- Dash grep (– — ― ——) on chunks/20.ts and every edited line: none. Rule grep (presentamos, somos, usted, vosotros, vos,
  AUD amounts, Microsoft, Code Generator, linking code): none in new text.

## 1. New guides: src/app/(es)/es/blog/chunks/20.ts (new) + import c20 in src/app/(es)/es/blog/data.ts
Slugs exactly per BUILD (not r07's no-mygov-access-tax-return). Title / description length; body words; internal / external links:
| slug | title (chars) | desc | words | int | ext |
|---|---|---|---|---|---|
| mygov-sms-code-not-received-overseas | No me llega el código SMS de myGov: qué hacer desde fuera (57) | 153 | 842 | 5 | 6 |
| mygov-account-locked-out | Cuenta de myGov bloqueada: desbloquearla o crear otra (53) | 158 | 673 | 5 | 4 |
| tax-return-without-mygov | Tax return sin myGov: las vías que siguen funcionando (53) | 149 | 783 | 8 | 5 |
| claim-super-without-mygov | Recuperar tu super sin myGov: el DASP no lo necesita (52) | 155 | 782 | 5 | 2 |
| tax-refund-closed-australian-bank-account | Devolución de impuestos y cuenta australiana cerrada (52) | 160 | 697 | 6 | 4 |
Structure: answer-first opening (no links), question H2s, numbered steps or lists (tables are not rendered by the guide
renderer, so none), internal links never in paragraph 1 and never in the first paragraph under an H2 (except the closing CTA).
Link plan (r17 P1-2): the ES set has no mygov-problems hub, so tax-return-without-mygov acts as parent of the SMS and
locked guides (they link it once + one sibling); closed-account links its parent how-long-does-tax-refund-take-australia;
claim-super links how-to-find-lost-superannuation, dasp-rejected-what-to-do, how-long-does-dasp-take. Links only to guides
that exist in ES (no links to cant-link-ato / myid guides, which would fall back to English). Money page: flagship once +
/tax-return (or /superannuation) once in the CTA.
Closing CTA uses existing ES approved wording: "Nosotros tratamos con la ATO" (es/page.tsx COMPARISON), "Revisado y aprobado
por un agente fiscal registrado antes de presentarse ante la ATO", WhatsApp; super CTA copies the /es/superannuation
"with-us" service list and "Working Holiday Tax opera bajo la supervisión de un agente fiscal registrado"
(es/blog/[slug]/page.tsx). "Nunca te pedimos tu contraseña" = existing claim (flagship FAQ, /es/tax-return notice).
Facts and sources (all VERIFIED in r16 / r11 / r12 / r13; two myGov pages re-fetched today):
- SMS only to registered number, roaming, supported network; number changed inside the account:
  https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-a-code-sent-by-sms (fetched 24 Nov)
- SMS checklist, alternatives (Digital ID, passkey, app), lockout, unlock steps, forgot username (2 letters 6 numbers) /
  password, secret questions, new account + helpdesk releases email:
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help (fetched 24 Nov; r16 J3, J5, J6)
- ATO: SMS only with an Australian mobile; overseas use myID, passkey or authenticator; secret questions not accepted, ATO
  unlinked: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato (r16 J1, r11 F9)
- Recovery needs Strong myID, same name/DOB/email; else new account:
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account (r16 J7)
- Strong = photo check with Australian document; temp residents outside Australia cannot verify visa:
  https://www.myid.gov.au/verifying-your-id-in-myid (r16 J8, J9; "normalmente" = r16 J14 inference, worded as such)
- Helpdesk +61 1300 169 468 option 1, hours: https://my.gov.au/en/about/help/contact (r16 J12)
- Authenticator only while signed in; Google Authenticator, Apple Passwords, 1Password (Microsoft not named):
  https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-an-authenticator (r16 J4)
- Linking questions (bank account, super account, NOA, payslip): r16 J11 URL information-you-need-to-link-mygov-to-the-ato
- Three ways to lodge, only registered agents may charge: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return (r11 F14)
- 10 business days online, 30 calendar days manual, 90 business days paper:
  https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return (r16 H4, H5)
- Paper pack, GPO Box 9845 Sydney NSW 2001 from overseas: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-a-paper-tax-return (r11 F15, fetched 24 Nov)
- Overseas lodging, myID recommended: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia (r16 J2, I1)
- DASP three ways, NAT 7204/74880, written authority, 65 %, 28 days, payment methods, ATO-held only AU account or cheque:
  https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp (r16 E1, E4, E7, E8, E9)
- DASP online: passport, email, fund ABN, TFN optional, shared secret, add application with ABN, VEVO, DASPmail@ato.gov.au,
  status not shown, +61 2 6216 1111 ask for 13 10 20:
  https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system (r16 E10, r13 F3 to F7)
- Refunds only to an Australian account: https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details (r16 I1, r12)
- No bank details may block myTax: https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/supporting-documents-for-my-tax/financial-institution-details (r12)
- Closed account: RBA return up to 10 days, reissue, cheque, some cheques held up to 90 days since Jan 2025, wrong account
  over 28 days / known account not retrievable: https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds (r16 I2 to I4)
- Lodging without AU account: refund held up to 90 days, contact by letter/email/myGov:
  https://www.ato.gov.au/forms-and-instructions/individual-tax-return-2026-instructions/completing-the-individual-tax-return-2026/completing-individual-information-in-your-tax-return-2026 (r12)
- ATO from overseas +61 2 6216 1111, 8 am to 5 pm AET weekdays: https://www.ato.gov.au/about-ato/contact-us/ (r12)

## 2. r07 P1-D money pages (no title, description or H1 change)
- src/app/(es)/es/tax-return/page.tsx: new FAQ (feeds FAQPage JSON-LD) "No puedo entrar a myGov y no me llega el código SMS.
  ¿Puedo hacer el tax return igual?" after "¿Qué tengo que hacer yo exactamente?"; new text paragraph under the FAQ with
  links to tax-return-without-mygov and tax-refund-closed-australian-bank-account (guideHref/guideText).
- src/app/(es)/es/devolucion-impuestos-australia/page.tsx (flagship): new FAQ "Ya no puedo entrar a myGov desde mi país.
  ¿Puedo hacer igual el tax return?" after "¿Puedo presentar el tax return yo mismo en myGov?"; abroad section: new
  paragraph linking mygov-sms-code-not-received-overseas and tax-return-without-mygov.
- src/app/(es)/es/superannuation/page.tsx: new FAQ "¿Necesito myGov para recuperar mi super?" after "¿Puedo reclamar mi super
  por mi cuenta?". Source: ATO DASP page (above).

## 3. r17 P1-3 GUIDES (hub to spoke)
- Flagship GUIDES (fr/it/es rule: flagship, not twin): + amending-tax-return-australia "Corregir un tax return ya presentado";
  + tax-return-without-mygov "¿myGov no funciona?" (ES stand-in for the mygov-problems hub, which ES does not have).
  tax-back and tax-obligations-after-leaving were already in the flagship list (titles left as they were).
- /es/superannuation GUIDES: + super-for-casual-and-part-time-workers "La super en trabajos casual y de medio tiempo",
  + how-to-check-super-balance-working-holiday "Revisar tu saldo antes de reclamar", + claim-super-without-mygov.

## 4. Inbound links to the new guides (appended sentences, no opening touched)
- chunks/03 how-to-lodge-tax-return-from-overseas: SMS guide (after the dead-SIM sentence) and closed-account guide.
- chunks/08 how-long-does-tax-refund-take-australia: closed-account guide (r12 P1-B).
- chunks/18 tax-back-australia-working-holiday (frozen opening untouched): new paragraph after the step list, link to
  tax-return-without-mygov (r07 P2-C).
- chunks/19 past-years-tax-returns-working-holiday: link to tax-return-without-mygov (r07 P2-C).
- chunks/05 how-to-find-lost-superannuation: link to claim-super-without-mygov (r07 P2-C).
Link counts after: overseas 7, how-long 4 int + 1 ext, tax-back 7, past-years 6, lost-super 5 (cap 8).

## 5. Fact fixes
Refund time "12/14 días hábiles" to the ATO's 10 business days (manual up to 30 días corridos; paper up to 90) (source
r16 H4/H5 URL above; "about 14" was UNVERIFIED r16 H9/W7):
- tax-return/page.tsx: openGraph and twitter description (social, not the meta description), SEQUENCE step 07,
  PROCESS_FIGURES "Procesamiento de la ATO", FAQ "¿Cuánto tarda un tax return...?", FAQ "¿Cuánto tarda la ATO en pagar si
  presento desde mi país?" (early-lodgment 50 kept).
- devolucion-impuestos-australia/page.tsx: KEY figure "Procesamiento: 10 días hábiles" body, FAQ "¿Cuánto tarda la devolución?".
- chunks/08 how-long-does-tax-refund-take-australia: description number only (12 to 10, "unos" dropped; title has no number);
  opening = r14 ES text (removes the unsourced "desde que puede cruzarlas" clause, paper 50 to 90); "7 a 21 días" paragraph
  replaced with the ATO figures and "the ATO can't speed this up" (r12 F1 status page); "Pasados los 28 días" to 30 días
  corridos (r14 P1-1). chunks/08 what-is-a-tax-refund line 41: 12 to 10.
- chunks/03 lines 214, 451 (12 to 10; manual 30 días corridos); chunks/18 tax-back step 4 (14) and line 202 (12).
- blog/data.ts Tax Return category FAQ: "unas dos semanas" to the ATO 10 business days.
Early-lodgment 50 business days left as is everywhere (r16 W2 list).
Closed Australian bank account (r12 / r16 I2, I3, missing-tax-return-refunds URL):
- chunks/08 how-long H2 (refund "queda como crédito" was wrong) rewritten with RBA return up to 10 days, reissue, cheque,
  90-day hold; "4 a 6 semanas" replaced by "hasta que haya llegado todo".
- chunks/07 tax-obligations-after-leaving line ~408 ("queda como un crédito"), chunks/02 line 32 ("queda pendiente"),
  chunks/03 overseas "queda evaluada pero sin entregar": all now RBA return, reissue or cheque.
DASP payment (r16 E9: fund may pay internationally only if it offers it; ATO-held only AU account or cheque):
- tax-return/page.tsx FROM_HOME card and RULES card; flagship FAQ "¿Puedo hacerlo si ya salí de Australia?" and abroad
  section paragraph; es/page.tsx home FAQ; es/contact/page.tsx FAQ; chunks/15 line 451. All said "DASP sí se puede pagar en
  el extranjero" unqualified.
"Into the following May" agent line, replaced with r14 V3 ATO wording, no implication that our clients get more time
(https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-with-a-registered-tax-agent):
- chunks/15 tax-return-deadline-31-october H2 "¿El plazo es más largo si la presenta un agente fiscal registrado?" body =
  r14 P1-3 ES text (incl. prior-year limit, r14 V4) + existing link to what-is-a-tax-agent kept.
- chunks/15 late-tax-return-penalty line 364; chunks/18 lines 200 and 311; chunks/07 line 282; chunks/03 lines 84, 404 and
  overseas "bien entrado el año siguiente"; chunks/04 what-is-a-tax-agent line 36 ("plazo especial bastante posterior").
- blog/data.ts Tax Return category FAQ "el plazo puede ampliarse" now the ATO sentence.
SVT 2 November: not applicable (WHT only).

## 6. For Jo / the lead (not changed)
- Sidebar blurb src/app/(es)/es/blog/[slug]/page.tsx line ~107 (Super): "Encontramos cada cuenta con tu TFN y presentamos el
  reclamo una sola vez". Left as is per instructions; Jo decides (r07 section 3 suggests "te guiamos en el reclamo" if WHT
  does not act as the authorised representative). r19 1.6 lists the same in shared components (GuideCta "presentamos la
  solicitud", inline "presentemos el reclamo"), not ES-owned files.
- Not in this task's fix list, still in ES files (r16 W7 / r13 1.4): "15 de junio" agent cut-off for early returns
  (chunks/07 line ~298, chunks/04 line 138, 18); "7 a 14 días" movement records (chunks/04 ~298, chunks/13 ~293, ~311);
  /es/superannuation FAQ "Cualquier fondo puede pedirte además copias certificadas ... sea cual sea el saldo" (r13: online
  under 5,000 AUD usually not); chunks/08 "Normalmente se resuelve en una o dos semanas más" (unsourced);
  what-is-a-tax-agent opening "un plazo de presentación más largo" (opening/description left).
- Medicare rows on the ES money pages still tie the exemption to a Medicare Entitlement Statement for Spanish/LatAm passports
  (r16 W3: foreign residents claim category 2 without an MES). Not in this task; flag.
