# Independent review: plan 3 new content (24 Nov 2026)

Scope: `git diff HEAD` (scanned for figures and rule terms) plus the untracked files: data-mygov.ts, data-problems.ts,
fr/it/es chunks/20.ts, SVT long/{en,zh,vi}/batch-13-problems.ts, and the new DE (data.ts 9144-9576) and JA
(data.ts 9464-10024) guides. Official pages were re-read on 24 Nov 2026 (my.gov.au sign-in help, SMS, overseas, Digital ID
recovery, contact; ATO link, link information, help and support error codes, when you can't sign in, DASP, DASP online
help, missing refunds, financial institution details, 2026 return instructions, lodge from outside Australia, paper
return, status and tracking pages, data matching, scams, FTL, offsetting, DASP form certifiers, ATO contact numbers,
ATO media release on the 2 November 2026 deadline; myid.gov.au verifying your ID and set up).

## Result

High: 0. Medium: 3. Low: 12.

No rule breaches found. No "we lodge", no tax agent or accountant claim for us in any language (DE "Tax Agent", JA
登録タックスエージェント, ZH 注册税务代理人, VI đại lý thuế đã đăng ký are always the third party reviewer or a general
route), no refund promise, no new price (SVT "we confirm the price on WhatsApp" is existing SVT wording), no AI mention,
no cross brand mention, Code Generator only named as retired and not a fix, no linking code by phone, refunds always
Australian account only. DASP service wording in EN, DE, FR, IT, ES, JA matches each language's existing /superannuation
page; SVT DASP help line matches services-en.ts:246.

Verified correct (no action): SMS overseas (same Australian number, roaming, compatible network); ATO SMS needs an
Australian mobile; overseas recommendation myID/passkey/authenticator; secret questions unlink the ATO; Code Generator
retires 28 Feb 2027; locked account blocks Digital ID, passkey and app; Strong myID recovery conditions and the
"I didn't get my code" / "Continue with Digital ID" labels (ATO page); new account and email release; helpdesk
132 307 / +61 1300 169 468 option 1 and hours; Strong needs Australian passport or WA licence plus photo; visa cannot be
verified by a temporary resident outside Australia; Standard needs 2 documents, Medicare card only after another;
DASP online fields, TFN optional, shared secret 1 to 20 characters and 3 attempts, same passport details even if expired,
five statuses, submitted cannot be changed, VEVO, DASPmail, ATO-held super labels, +61 2 6216 1111 then 13 10 20, TIS
+61 3 9268 8332; ATO-held super paid only to an Australian account in your name or by cheque; fund international transfer
only for fund applications; 28 days; "Claiming a DASP will not affect any future visa applications"; certifier order
outside Australia; closed account (RBA up to 10 days, reissue, cheque, cheques held up to 90 days from Jan 2025); refund
held up to 90 days without Australian details; 6 digit BSB, up to 9 digit account; 10 business days / 30 calendar days /
90 business days paper / 7 weeks; early lodgment 50 business days; 11:59 pm local time Monday 2 November 2026 for self
lodgers (ATO media release); agent program wording; FTL $364 and $1,820, refund or nil result, warning first; data
matching 21 days and payment plans for $100,000 or less; calls show as No Caller ID; 13 28 61 8 am to 6 pm.

## Medium

M1. src/app/(site)/blog/data-mygov.ts:265
Text: "- **Error 001 or 002:** often an ad blocker or browser add on. Turn them off and retry."
Why: ATO help page: 001 "An error has occurred (001)" means check minimum system requirements, try another device or try
later; only 002 is the ad blocker / add-on / anti-virus error.
Fix: "- **Error 001:** check your device meets the minimum system requirements, or try another device or later. **Error 002:** an ad blocker, browser add on or anti-virus software is blocking the page; allow ato.gov.au or try another browser."

M2. src/app/(de)/de/blog/data.ts:9557 (and the same claim in src/app/(site)/blog/data-problems.ts:549)
Text DE: "Eine praktische Folge hat die Auszahlung trotzdem: Die ausgezahlten Superkonten werden geschlossen. ... Quelle: [ATO, Departing Australia superannuation payment](...)"
Text EN: "Once a fund pays a DASP, that account is closed, so if you come back to work later your new employer pays into a new account."
Why: The ATO DASP page (updated 21 Apr 2026, read today) does not say accounts are closed after payment. In DE the
sentence is directly attributed to that ATO page (misattributed source); in EN it is an unsourced fact.
Fix DE: "Eine praktische Folge hat die Auszahlung trotzdem: Ist ein Konto ganz ausgezahlt, ist dort kein Guthaben mehr. Arbeitest du bei einem späteren Aufenthalt wieder, zahlt dein Arbeitgeber in den Fonds ein, den du dann angibst." (and drop the "Quelle" for this sentence, or keep it only after the visa sentence).
Fix EN: "Once a fund has paid out your whole balance, there is nothing left in that account, so if you come back to work later your employer pays into whichever fund you then choose."

M3. Pre-existing misleading Medicare sentence left in lines this diff edited (only "12" was changed to "10"):
src/app/(de)/de/blog/data.ts:389, src/app/(es)/es/blog/chunks/18.ts:204, src/app/(fr)/fr/blog/chunks/18.ts:199
Text DE: "... und die Medicare-Levy-Befreiung, die ein Wochen vorher bestelltes Medicare Entitlement Statement braucht und kein Häkchen."
Why: Same problem as facts W3, which EN already fixed in the twin sentence ("the Medicare levy position, which depends
on your individual situation and supporting documents"). Most WHMs are foreign residents, do not pay the levy and claim
exemption category 2 without a Medicare Entitlement Statement (ATO foreign residents exemption page).
Fix DE: "... und die Medicare Levy, die von deiner persönlichen Situation und deinen Unterlagen abhängt."
Fix ES: "... y la situación del Medicare levy, que depende de tu caso y de tus documentos."
Fix FR: "... et la situation au regard de la Medicare levy, qui dépend de votre cas et de vos justificatifs."

## Low

L1. src/app/(site)/blog/data-mygov.ts:17
Text: "Nearly all of them come from one of two set ups that stop working for the ATO once you have gone home: an account built around an Australian phone number, or an account that only has secret questions."
Why: A secret-questions-only account does not work for the ATO at any time (ATO link page), not only after going home.
Fix: "Nearly all of them come from one of two set ups: an account built around an Australian phone number, which stops working once the SIM lapses, or an account that only has secret questions, which the ATO never accepts."

L2. src/app/(site)/blog/data-mygov.ts:166
Text: "The security code goes to your email or mobile, so the unlock only works if you can still receive one of them."
Why: The myGov sign-in help page does not say where the unlock security code is sent.
Fix: "The unlock asks for a security code, so it only works if you can still receive the code myGov sends."

L3. src/app/(site)/blog/data-mygov.ts:227
Text: "the ATO tells you what to do next, which is usually a call on 13 28 61 or +61 2 6216 1111 from overseas."
Why: ATO only says "we'll guide you on what to do next"; "usually a call" is not on the page (only some codes say contact us).
Fix: "the ATO tells you what to do next, and for some error codes that means contacting it on 13 28 61, or +61 2 6216 1111 from overseas."

L4. src/app/(site)/blog/data-mygov.ts:393 vs src/app/(site)/blog/data.ts:3452
Text: "An early return before the end of the financial year has to be on the paper form anyway"
Why: Internal conflict: data.ts:3452 (edited in this diff) says the ATO accepts early returns lodged electronically by a
registered tax agent before 30 June. The ATO paper-form rule applies to lodging it yourself.
Fix: "If you lodge an early return yourself before the end of the financial year, it has to be on the paper form, and the ATO quotes 50 business days for those."

L5. src/app/(site)/blog/data-problems.ts:164
Text: "Where another government agency took part of the refund, expect a letter from that agency as well."
Why: The ATO offsetting page names only the statement of account / ATO online services; no letter is mentioned.
Fix: "The ATO says you can check this on your statement of account or in ATO online services."

L6. src/app/(site)/blog/data-problems.ts:381 (same idea in DE 9515, JA 9884 is already correct)
Text: "so after 28 days ask the fund, or the ATO if it holds the money."
Why: DASP online help says for ATO-held super "we can't always meet the service standard" and suggests waiting a little longer before contacting the ATO.
Fix: "so after 28 days ask the fund. For super the ATO holds, the ATO says it cannot always meet 28 days, so allow a little longer before you call."

L7. src/app/(site)/blog/data-problems.ts:481 and :485
Text: "Some refuse certifications more than 12 months old, faxed or emailed copies ..." / "One fund may accept a foreign notary public and Australian consular staff but not other certifiers licensed only outside Australia ..."
Why: Fund-specific rules with no official source cited (rules: facts only from existing pages or official sites).
Fix: "Funds can add their own rules on top, for example on how recent a certification must be or whether a translation is needed, so read your fund's claim form before you book anyone." and "Because funds differ, and the fund is the one paying: one fund's accepted list can be narrower than the ATO's."

L8. src/lib/svt/content/long/en/batch-13-problems.ts:200
Text: "- the bank details where the money should be paid"
Why: Not on the ATO list of what the online system needs (help page lists personal details, email, passport, optional TFN, fund details incl. ABN).
Fix: delete the bullet, or "- how you want to be paid (the fund then pays by the method it offers)" only if sourced.

L9. "Visa details" listed as something you enter: src/app/(fr)/fr/blog/chunks/20.ts:180 ("les détails de votre visa"), src/app/(it)/it/blog/chunks/20.ts:190 ("i dati del visto"), src/app/(de)/de/blog/data.ts:9403 ("deine Visumdaten"), src/app/(ja)/ja/blog/data.ts:9816 ("ビザの情報")
Why: The DASP help page does not list visa details as an input; the system shows a Visa information screen and forwards it to the fund.
Fix FR: "Vos nom et date de naissance, une adresse e-mail, le pays et le numéro de votre passeport, et pour chaque compte l'ABN du fund et, si vous l'avez, votre numéro de membre. Le système affiche ensuite les informations de visa qu'il trouve." (same pattern in IT/DE/JA: move visa to "the system shows").

L10. src/app/(de)/de/blog/data.ts:9165
Text: "Unabhängig von deiner australischen Nummer sind ein Passkey, eine Authenticator-App, die myGov-App und myID. Für die Anmeldung aus dem Ausland ... empfiehlt das ATO genau diese Wege statt SMS."
Why: The ATO recommends myID, passkey or authenticator; it does not list the myGov app.
Fix: "... empfiehlt das ATO myID, einen Passkey oder eine Authenticator-App statt SMS."

L11. src/app/(de)/de/blog/data.ts:9307
Text: "- Dein Reisepass, wenn du die TFN als Besucher mit befristetem Visum beantragt hast"
Why: ATO limits this to the most recent TFN application within the past 4 years; other languages include it.
Fix: "- Dein Reisepass, wenn du die TFN in den letzten vier Jahren als Besucher mit befristetem Visum beantragt hast"

L12. src/app/(ja)/ja/blog/data.ts:9846
Text: "本人のmyGovや個人用のオンラインサービスを使って代理請求することは認められていません。"
Why: The DASP page says agents use the DASP online intermediary system with written authority; it does not state this prohibition.
Fix: "登録タックスエージェントが代理で請求する場合は、エージェント用のDASPオンラインシステムを使い、本人からの書面による委任が必要だとATOは案内しています。本人のmyGovのパスワードは必要ありません。"

## Notes (not defects)
- ATO pages disagree on paper processing: the tracking page says "up to 90 business days", the paper-return page says
  "most refunds issue within 50 business days". The new content follows the tracking page and the facts file (fine).
- "last 2 years" for the bank account question (EN data-mygov.ts:248, SVT EN :131, ZH/VI :98, JA 9659): ATO says "past 2
  financial years"; DE already says Steuerjahre. Optional precision fix.
