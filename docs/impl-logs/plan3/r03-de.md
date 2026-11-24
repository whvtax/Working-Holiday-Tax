# r03-de: German tax return and super (WHT /de), 24 Nov 2026

Scope: /de/tax-return, /de/superannuation, German refund and super guides, German myGov problem queries.
Read only. Code base: /home/claude/v68/base20. Data: S/gsc24/wht (3 months to 21 Nov), wht-1105, wht-1021.
SERP checks: WebSearch (US index, not google.de; order is not a Google position).

## 1. Findings

F1 (fact, GSC). German demand in our export is small but real. Germany is the third market: 165 clicks, 6,972 impr,
pos 6.17 (Countries.csv); Austria 410 impr, Switzerland 315. German money queries (Queries.csv, 21 Nov):
"superannuation zurück" 35 impr pos 13.17 (47 / 14.11 on 21 Oct, 39 / 13.72 on 5 Nov: stuck);
"superannuation australien zurück bekommen" 34 impr pos 4.59 (16 / 6.94 on 5 Nov: rising);
"steuererklärung australien work and travel" 19 impr pos 6.63, 1 click; "superannuation australien" 17 pos 8.94;
"steuererklärung australien" 8 pos 10.75; "steuerjahr australien" 14 pos 5.21; "steuerrecht australien" 12 pos 22.5.
No German myGov query appears in any export (top 1,000 rows only). So German myGov demand is an INFERENCE from the
English pattern and from Jo's observation, not a measured number.

F2 (fact, GSC Pages.csv). /de/superannuation 1,097 impr pos 7.47, 20 clicks (CTR 1.82 %); /de 969 impr pos 7.93,
41 clicks; /de/tax-return 170 impr pos 6.94, 4 clicks; /de/blog/average-tax-refund-working-holiday 115 pos 6.97;
/de/blog/amending-tax-return-australia 101 pos 5.77; /de/blog/how-to-apply-for-super-back 65 impr pos 8.12 (this
URL is a 301 to /de/superannuation, next.config.js line 299: the old "how to apply" guide was merged into the money
page on purpose, which matters for any new DASP walkthrough guide, see section 3).

F3 (fact, SERP 24 Nov). German myGov problem searches return no German page at all:
"myGov kein Zugriff Code SMS australische Nummer Ausland Steuererklärung" and "myGov Zugang verloren Work and Travel
Steuern zurück ohne myGov" return only my.gov.au help pages, ato.gov.au and community.ato.gov.au threads (English).
"Steuererklärung Australien nach Rückkehr myGov funktioniert nicht Deutschland" adds only wise.com (English) and
citiesinsider.com/de. "DASP Antrag Schritt für Schritt Anleitung" returns only ATO pages and AustralianSuper.
a17 F2/F3 found the German refund layer is old blogs (check24 2016, reiseuhu 2019, work-and-travel-australien.org
Feb 2025, dieweltenwanderer DASP walkthrough Apr 2024). Inference: a German myGov problem guide would be the only
German answer on the page and has a realistic path to position 1 to 3.

F4 (fact, repo). What already exists in German, so it is NOT proposed again:
- /de/tax-return (`src/app/(de)/de/tax-return/page.tsx`): title "Steuererklärung Australien für Work and Travel,
  ohne myGov"; lead "Keine Payslips, kein myGov-Konto" (line 417); compare table "Selbst über myGov" vs us (line 488);
  5-step refund list (lines 317 to 323); 14 FAQs incl. "Geht das auch, wenn ich Australien schon verlassen habe?";
  myGov password warning (line 552). No FAQ or guide link about a broken myGov login.
- /de/superannuation: answer-first lead, "Schritt für Schritt" Answer block (line 346), documents, online vs paper
  (line 400, NAT 7204 / NAT 74880 / form 1194), 28 days, find your fund, from overseas, 14 FAQs, "Du musst dich nie
  bei myGov einloggen" (line 298). Missing: what the DASP online system actually asks (shared secret, fund ABN,
  VEVO), and an FAQ "Brauche ich myGov für den DASP-Antrag?".
- Guides touching myGov only in passing: how-to-lodge-tax-return-from-overseas (line 1639 "Ein myGov-Konto an einer
  toten australischen SIM empfängt seine Codes nicht"), tfn-security-protect-from-fraud (3070), early-tax-return-
  leaving-australia (9023, 9031), past-years-tax-returns-working-holiday (9133). None tells the reader what to do.
- 144 DE guide translations exist; none is about myGov access, myID or the DASP online form.

F5 (fact, code). A German guide can only exist if an ENGLISH guide with the same slug exists:
`getGermanGuide()` (data.ts line 9144) returns undefined when `enGuides` has no such slug, and sitemap.ts line 186
lists /de/blog/<slug> only when `dePostTranslations[slug].body` exists. So every new DE guide below needs its EN twin
in `src/app/(site)/blog/data.ts` (same slug) from the EN workstream, or the DE page 404s.

F6 (fact, official sources, all checked 24 Nov). The facts the German texts below rely on:
- SMS code abroad: only to the number registered in myGov, with international roaming; changing the number needs
  access to the current number; without it: sign in with Digital ID or create a new myGov account; the myGov helpdesk
  can release your email address. https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms
- Overseas: myGov app, passkey, Digital ID and secret questions need no change before travel; codes must be checked.
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas
- Locked out without backup: recover with a Strong myID (name, date of birth, email must match myGov; select "I
  didn't get my code", then "Continue with Digital ID"), otherwise create a new myGov account and link the ATO again.
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account
- myID: Standard = any 2 documents incl. "visa (using your foreign passport)"; the passport option means an
  Australian passport; Strong is set up with a passport or a WA driver licence; that this passport must be Australian is our reading of the same page (it says the passport must be Australian), confirm before publishing. https://www.myid.gov.au/set-up
- Linking the ATO: identity questions from your ATO records, you can skip any; list incl. a recent payslip, bank
  account that received an ATO refund or earned interest in the last 2 financial years, active super account, notice
  of assessment (5 years), travel document if the TFN was applied for as a temporary visitor, TFN application receipt
  reference. https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato
  Sign-in options for linking; overseas use myID, passkey or authenticator rather than SMS: https://www.ato.gov.au/linktomygov
- Lodging from outside Australia: myTax needs myGov with an active ATO link; alternatives: registered tax agent,
  paper return, a friend or family member with power of attorney; Australian bank account for the refund.
  https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia
- Registered tax agents: check on the TPB public register; most have a lodgment program past 31 October if engaged
  before 31 October. https://www.ato.gov.au/Individuals/Your-tax-return/How-to-lodge-your-tax-return/Lodge-your-tax-return-with-a-registered-tax-agent/
- DASP online system: personal details, eligibility check about 45 seconds, a shared secret (question and answer,
  1 to 20 characters, three tries), one application per account found, about 30 minutes; "Add application" with the
  fund ABN if not found; can be saved before eligible, submitted only after leaving and with no active visa (check
  VEVO); submitted applications cannot be changed (contact the fund); system does not show processing; 28 days;
  wrong visa data: do not submit, email DASPmail@ato.gov.au; forgot the answer: phone the ATO; from overseas
  +61 2 6216 1111, 8:00 to 17:00 Mon to Fri Australian Eastern time. The page never mentions myGov.
  https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
- Refunds only to Australian accounts: already quoted in DE past-years guide (data.ts ~line 9110) with
  https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/supporting-documents-for-my-tax/financial-institution-details
NOT verified, left out of all text: whether the ATO can issue a linking code by phone to someone overseas; whether
myID accepts a foreign passport on its own; any myGov helpdesk overseas number.

## 2. Proposals

### P1-1. New German guide: myGov problems (the hub Jo asked for)
EN twin required (F5): slug `mygov-access-problems-working-holiday` in `src/app/(site)/blog/data.ts`, category
Tax Return. If the EN workstream picks a different slug, use theirs; DE keys must equal the EN slug.
DE file: `src/app/(de)/de/blog/data.ts`, new key in `dePostTranslations` (place after
'past-years-tax-returns-working-holiday').

title (50): `Kein Zugriff auf myGov? Code, Sperre, ATO und myID`
description (148): `Kein SMS-Code, alte australische Nummer, Konto gesperrt, ATO nicht verknüpft: was laut ATO hilft und wie Steuererklärung und Super ohne myGov gehen.`

body (ready, Markdown, du):

Kommt dein myGov-Code nicht mehr an, weil er an deine alte australische Nummer geht, oder ist dein Konto gesperrt,
gibt es laut ATO zwei Wege zurück: das Konto mit einer myID wiederherstellen oder ein neues myGov-Konto anlegen und
das ATO neu verknüpfen. Aus Deutschland, Österreich oder der Schweiz ist beides mühsam. Für deine Steuererklärung
und deine Super brauchst du myGov aber nicht: Ein registrierter Tax Agent, die Abgabe auf Papier und der
DASP-Online-Antrag des ATO kommen ohne aus.

## Warum kommt der myGov-Code nicht an?

Weil myGov den SMS-Code nur an die Nummer schickt, die in deinem Konto hinterlegt ist. Laut [myGov](https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms)
brauchst du im Ausland genau diese australische Nummer mit aktiviertem Roaming. Eine neue Nummer kannst du nur
eintragen, wenn du dich noch anmelden kannst, also mit Zugriff auf die alte.

Ist die australische SIM schon abgelaufen, bleiben laut myGov zwei Möglichkeiten: dich mit einer Digital ID wie myID
anmelden oder ein neues myGov-Konto anlegen. Willst du dafür dieselbe E-Mail-Adresse nutzen, muss der myGov-Helpdesk
sie erst freigeben.

## Wie kommst du wieder in ein gesperrtes myGov-Konto?

Mit einer myID auf der Stufe Strong, sonst nur über ein neues Konto. Das [ATO](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account)
beschreibt den Weg so: Name, Geburtsdatum und E-Mail in der myID müssen zu deinem myGov-Konto passen. Auf der
Anmeldeseite gibst du Benutzername und Passwort ein, wählst "I didn't get my code" und dann "Continue with Digital ID".

Klappt das nicht, legst du ein neues myGov-Konto an und verknüpfst es danach wieder mit dem ATO. Damit dir das nicht
noch einmal passiert, empfiehlt das ATO eine zweite Anmeldeoption in den Kontoeinstellungen.

## Geht myID mit einem deutschen Pass?

Nur eingeschränkt. Laut [myID](https://www.myid.gov.au/set-up) brauchst du für die Stufe Standard zwei Dokumente
von einer Liste, und dein ausländischer Pass zählt dort nur über dein australisches Visum. Das zweite Dokument muss
australisch sein, etwa ein Führerschein. Die Stufe Strong, die für die Wiederherstellung gesperrter Konten nötig ist,
richtet myID mit einem australischen Pass oder einem Führerschein aus Western Australia ein.

Für die meisten Work and Traveller aus Deutschland, Österreich oder der Schweiz ist der Weg über myID damit versperrt,
und es bleibt das neue myGov-Konto.

## Wie verknüpfst du das ATO wieder mit myGov?

Indem du Fragen zu deinen eigenen ATO-Daten beantwortest. Welche Fragen kommen, hängt davon ab, was das ATO über dich
hat, und unsichere kannst du überspringen. Auf der [ATO-Liste](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato)
stehen unter anderem:

- Eine aktuelle Payslip, in der Regel die letzte
- Ein Bankkonto, auf das in den letzten zwei Steuerjahren eine ATO-Erstattung oder Zinsen geflossen sind
- Die Daten eines aktiven Superkontos
- Ein Notice of Assessment aus den letzten fünf Jahren
- Dein Reisepass, wenn du die TFN als Besucher mit befristetem Visum beantragt hast
- Die Referenznummer deines TFN-Antrags

Kannst du deine Identität online nicht bestätigen, sagt dir das ATO, wie es weitergeht.

## Was stellst du vor dem Abflug ein?

Eine Anmeldung, die nicht an deiner australischen SIM hängt. Laut [myGov](https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas)
musst du nichts ändern, wenn du dich mit der myGov-App, einem Passkey, einer Digital ID oder Sicherheitsfragen
anmeldest. Nur wer Codes per SMS bekommt, muss vorher prüfen, ob sie im Ausland ankommen. Für die Anmeldung aus dem
Ausland nennt das [ATO](https://www.ato.gov.au/linktomygov) myID, einen Passkey oder eine Authenticator-App statt SMS.
Was du sonst vor der Abreise klären solltest, steht im Guide zur [vorgezogenen Steuererklärung](/de/blog/early-tax-return-leaving-australia).

## Kommt deine Steuererklärung ohne myGov zum ATO?

Ja. Online über myTax brauchst du laut [ATO](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia)
ein myGov-Konto mit aktiver ATO-Verknüpfung. Ohne myGov nennt das ATO drei Wege: einen registrierten Tax Agent,
die Erklärung auf Papier oder Freunde oder Familie, die mit einer Vollmacht für dich unterschreiben.

Mit uns brauchst du weder myGov noch einen Code: Wir regeln das direkt mit dem ATO, und jede Erklärung wird von einem
registrierten Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird. So läuft die
[Steuererklärung ohne myGov](/de/tax-return). Eines ändert sich nicht: Die Erstattung geht nur auf ein australisches
Bankkonto, also lass es offen, bis alles angekommen ist. Offene Jahre aus früheren Reisen holst du genauso nach,
siehe [frühere Jahre nachreichen](/de/blog/past-years-tax-returns-working-holiday).

## Brauchst du myGov für deine Super?

Nein. Den DASP-Antrag stellst du im eigenen Online-System des ATO. Laut [ATO-Hilfeseite](https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system)
meldest du dich dort mit deinen persönlichen Daten, deiner Passnummer und einer selbst gewählten Sicherheitsfrage an,
nicht mit myGov. Vergisst du die Antwort, hilft das ATO am Telefon, aus dem Ausland unter +61 2 6216 1111, Montag bis
Freitag von 8 bis 17 Uhr australischer Ostküstenzeit.

Wie der Antrag abläuft und was er kostet: [Superannuation zurückholen](/de/superannuation). Weißt du nicht, bei
welchem Fonds dein Geld liegt: [verlorene Super finden](/de/blog/how-to-find-lost-superannuation).

## Wer darf nach deinen myGov-Zugangsdaten fragen?

Niemand. Ein registrierter Tax Agent erreicht deine Daten über seinen eigenen Beraterkanal und braucht dein
myGov-Passwort nie. Wer danach fragt, ob per Nachricht, Anruf oder in einer Facebook-Gruppe, arbeitet nicht als Tax
Agent. Ob jemand registriert ist, zeigt das [öffentliche Register des TPB](https://www.tpb.gov.au/public-register).
Was du tust, wenn deine Daten schon herausgegeben sind: [TFN vor Betrug schützen](/de/blog/tfn-security-protect-from-fraud).

## Was ist der schnellste Weg, wenn du nicht mehr reinkommst?

Schreib uns auf WhatsApp, in welchen Orten du gearbeitet hast und ungefähr wann. Du brauchst myGov dafür nicht: Wir
regeln das direkt mit dem ATO, für die Steuererklärung und für den Super-Antrag. Jede Erklärung wird von einem
registrierten Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.

Notes for the implementer: the "Beraterkanal / password" paragraph reuses existing DE wording (data.ts lines 1714,
3127); "TPB register" URL is linked from the ATO tax agent page (F6). If the guide template has no WhatsApp button
in the body, the last H2 still works with the template CTA; do not add a price.
Inbound links (add one sentence each, below any opening; none of these is on the freeze list):
- how-to-lodge-tax-return-from-overseas, end of the paragraph at ~line 1639: `Was bei einem gesperrten Konto oder
  einem Code an eine alte Nummer hilft, steht in unserem Guide [Kein Zugriff auf myGov](/de/blog/mygov-access-problems-working-holiday).`
- past-years-tax-returns-working-holiday, bullet at ~line 9133 becomes: `- Ob deine myGov-Anmeldung aus dem Ausland
  noch funktioniert, und wenn nicht, [was bei myGov-Problemen hilft](/de/blog/mygov-access-problems-working-holiday)`
- tfn-security-protect-from-fraud, bullet at ~line 3070: append ` Was dann hilft: [Kein Zugriff auf myGov](/de/blog/mygov-access-problems-working-holiday).`
- early-tax-return-leaving-australia, after the bullet at ~line 9031: same anchor.
- tax-back-australia-working-holiday (FROZEN opening): only a link below the opening, in the Phase 1 five-step list.
Why P1: the only German answer to a whole problem cluster (F3); feeds both money pages; Jo's stated priority.
Measure: GSC impressions for the new URL and any query containing "mygov" from DE/AT/CH; WhatsApp clicks topic.

### P1-2. /de/tax-return: one FAQ and one guide row for the myGov problem
File `src/app/(de)/de/tax-return/page.tsx`. Titles, H1, lead and existing H2s unchanged.
a) FAQS array: insert after "Geht das auch, wenn ich Australien schon verlassen habe?" (the array feeds FAQPage
JSON-LD; plain text, no links):
question: `Ich komme nicht mehr in mein myGov-Konto. Geht die Steuererklärung trotzdem?`
answer: `Ja. Für die Erklärung mit uns brauchst du kein myGov-Konto, keinen SMS-Code und keine myID. Wir regeln das direkt mit dem ATO, und jede Erklärung wird von einem registrierten Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.\n\nWillst du dein eigenes Konto zurück, nennt das ATO zwei Wege: die Wiederherstellung mit einer myID auf der Stufe Strong oder ein neues myGov-Konto, das du danach wieder mit dem ATO verknüpfst. Mit einem ausländischen Pass ist die Stufe Strong meist nicht erreichbar.`
Sources: ATO can't-sign-in page and myid.gov.au/set-up (F6).
b) GUIDES array: add as first row (keeps the guide internally linked from the money page):
`{ href: '/de/blog/mygov-access-problems-working-holiday', title: 'Kein Zugriff auf myGov', desc: 'Code kommt nicht, Konto gesperrt, ATO nicht verknüpft: was hilft.' }`
Only after P1-1 ships (otherwise a broken link).

### P1-3. /de/superannuation: myGov FAQ and the DASP online form, on the money page
File `src/app/(de)/de/superannuation/page.tsx`. H1 frozen and untouched.
a) FAQ (array at line ~100), insert after "Brauche ich meine TFN, um meine Super zu beantragen?":
question: `Brauche ich myGov für den DASP-Antrag?`
answer: `Nein. Der DASP-Online-Antrag läuft in einem eigenen System des ATO. Du meldest dich dort mit deinen persönlichen Daten, deiner Passnummer und einer selbst gewählten Sicherheitsfrage an. Vergisst du die Antwort, hilft das ATO am Telefon, aus dem Ausland unter +61 2 6216 1111. Mit uns musst du dich gar nicht einloggen.`
b) Answer block "how-to-apply" (line 400): add after the first paragraph a short list, so the page itself answers
"DASP Schritt für Schritt" at form level (a17 R6, dieweltenwanderer's only advantage):
`<p>So läuft der Online-Antrag laut ATO ab:</p>` then an ordered list:
1. `Persönliche Daten und Passnummer eingeben. Die Prüfung, ob du antragsberechtigt bist, dauert etwa 45 Sekunden.`
2. `Eine Sicherheitsfrage mit Antwort festlegen (1 bis 20 Zeichen). Damit kommst du später zurück in deinen Antrag.`
3. `Das System sucht deine Superkonten und legt für jedes Konto einen eigenen Antrag an. Fehlt ein Fonds, fügst du ihn mit seiner ABN hinzu.`
4. `Jeden Antrag ergänzen und absenden, insgesamt etwa 30 Minuten. Absenden geht erst, wenn du ausgereist bist und kein Visum mehr aktiv ist, prüfen kannst du das über VEVO.`
5. `Nach dem Absenden lässt sich ein Antrag nicht mehr ändern, Änderungen laufen über den Fonds. Stimmen deine Visumdaten nicht, sende nicht ab, sondern schreib an DASPmail@ato.gov.au.`
Source line under it: the ATO help page URL in F6. Also add the hub guide (P1-1) to the related guide list at
line 258: `{ href: '/de/blog/mygov-access-problems-working-holiday', label: 'Kein Zugriff auf myGov: was für Steuer und Super hilft' }`.
Why on the money page and not a new guide: "superannuation zurück" (pos 13.17) and "superannuation australien
zurück bekommen" (pos 4.59) land on /de/superannuation; Jo already merged the old "how to apply" guide into it (F2).
Measure: those two queries' positions; /de/superannuation CTR (1.82 %).

### P2-1. New German guide: Steuererklärung nach der Rückkehr, wenn das australische Konto geschlossen ist
Only if the EN workstream creates an EN twin; otherwise fold into P1-1 as one more H2 (the text below works as an H2).
slug `closed-australian-bank-account-tax-refund`; title (47) `Australisches Konto geschlossen: Steuern zurück?`;
description (138) `Das ATO zahlt Steuererstattungen nur auf australische Konten. Was das für dich nach der Rückkehr heißt und was du vor dem Einreichen klärst.`
Opening: `Das ATO zahlt eine Steuererstattung nur auf ein Konto bei einem anerkannten Finanzinstitut in Australien, nicht auf dein deutsches Konto. Ist dein australisches Konto schon geschlossen, klär das, bevor die Erklärung eingereicht wird, nicht danach. Für deine Super gilt etwas anderes: Liegt sie noch beim Fonds, kann sie ins Ausland überwiesen werden.`
H2s: "Wohin zahlt das ATO die Erstattung?" (ATO financial institution details URL, F6); "Was ist bei der Super
anders?" (reuse the /de/superannuation from-overseas wording: fund can pay abroad; ATO-held super only to an
Australian account or by cheque; already on the page with ATO DASP source); "Was klärst du vor dem Einreichen?"
(check the account is open; keep it open until everything has arrived). CTA as P1-1 last H2.
NOT verified and therefore NOT in the text: what happens to a refund sent to a closed account. Do not guess.
Links: /de/tax-return, /de/superannuation, /de/blog/opening-bank-account-australia-working-holiday (617 impr).

### P2-2. Separate DASP walkthrough guide (only if the lead wants one beside P1-3)
slug `dasp-online-application-step-by-step` (EN twin required); title (54) `DASP online beantragen: der Antrag Schritt für Schritt`;
description (149) `Der DASP-Online-Antrag des ATO Schritt für Schritt: was du vorher brauchst, wie die Sicherheitsfrage funktioniert und was nach dem Absenden passiert.`
Opening: `Den DASP-Antrag stellst du nach der Ausreise im kostenlosen Online-System des ATO, ohne myGov: persönliche Daten und Passnummer eingeben, eine Sicherheitsfrage festlegen, für jedes gefundene Superkonto einen Antrag ergänzen und absenden. Das dauert laut ATO etwa 30 Minuten. Bezahlt wird meist innerhalb von 28 Tagen, nachdem der Antrag vollständig ist.`
H2s with answers = the five P1-3 steps expanded, plus "Was brauchst du, bevor du anfängst?" (name, date of birth,
email, passport country and number, TFN optional but without it you enter fund details yourself, fund ABN via the
system, Super Fund Lookup or the fund; member number and join date if available) and "Was passiert nach dem
Absenden?" (cannot change, contact fund, system shows no processing status, 28 days). All from the ATO help page (F6).
Links: /de/superannuation (anchor "Superannuation zurückholen"), /de/blog/dasp-documents-required,
/de/blog/how-long-does-dasp-take, /de/blog/dasp-tax-rate-65-percent-explained.
Risk: cannibalises /de/superannuation for "DASP Schritt für Schritt" and reverses the earlier merge (F2). My
recommendation: do P1-3 first, add P2-2 only if the December data shows /de/superannuation not moving on
"superannuation zurück".

### P3-1. "Steuern zurück" wording on /de/tax-return
GSC shows no "steuern zurück" row yet, but it is the term the German blogs use (a17 F3, work-and-travel-australien.org
/steuern-zurueck). Add one FAQ (after "Wie viel bekomme ich zurück?"):
question: `Wie bekomme ich nach Work and Travel meine Steuern aus Australien zurück?`
answer: `Über die australische Steuererklärung für jedes Steuerjahr, in dem du gearbeitet hast, ab Juli und auch aus Deutschland. Zu viel einbehaltene Steuer kommt nur über sie zurück, und das ATO zahlt eine Erstattung nur auf ein australisches Bankkonto. Deine Super ist davon getrennt und kommt mit einem eigenen DASP-Antrag zurück.`
All facts already on the page (lead, line 185, line 323). No amount, no promise.

### P3-2. Off-site (unchanged from a17 R8)
Offer the partner guide to work-and-travel-australien.org, dieweltenwanderer.de, australien-backpackersguide.com
with the myGov problem guide as the hook: their pages do not cover it.

## 3. What NOT to do
- Do not create any DE guide without its EN twin (F5): the DE URL would 404 and never enter the sitemap.
- Do not change the titles or descriptions of /de/tax-return ("ohne myGov") or /de/superannuation (frozen until
  7 Dec), or the /de/superannuation H1. The new guide uses "Kein Zugriff auf myGov", not "ohne myGov", so it does
  not compete with the /de/tax-return title; it links there with the anchor "Steuererklärung ohne myGov".
- Do not resurrect `how-to-apply-for-super-back` as a slug; it is a 301 to /de/superannuation (next.config.js 299).
- Do not write "wir reichen ein", "als Tax Agent", "Steuerberater" for us; use only the approved sign-off sentence and
  "Wir regeln das direkt mit dem ATO". No refund amounts, no prices, no "garantiert" beyond the existing guarantee box.
- Do not tell readers the ATO will give them a linking code by phone from overseas, that myID works with a German
  passport alone, or what happens to a refund paid to a closed account: none of this was verifiable (F6).
- Do not link community.ato.gov.au threads as sources (not official guidance; the brief allows official pages only).
- No em or en dashes in any of the texts above; German nouns capitalised; sentence case headings; du throughout.
- WHT only: nothing here mentions Student Visa Tax.
