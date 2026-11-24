# r06-it: Italian WHT, tax return flagship, super page, myGov problem guides (24 Nov 2026)

Code read: /home/claude/v68/base20 (read only). Data: S/gsc24/wht (3 months to 21 Nov). Web: WebSearch (non-Google
engine; the shared search budget ran out before the Italian "non ricevo codice myGov" query) and WebFetch of official pages.

## Sources (every fact below cites one of these)
- S1 my.gov.au, codes by SMS: https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms
- S2 my.gov.au, sign-in help: https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help
- S3 my.gov.au, contact: https://my.gov.au/en/about/help/contact
- S4 ATO, create myGov and link ATO: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato
- S5 ATO, information you need to link: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato
- S6 ATO, help and support online services (error codes): https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/help-and-support-for-online-services-individuals
- S7 ATO, when you can't sign in to myGov: https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account
- S8 myID, identity strength: https://www.myid.gov.au/how-to-set-up-myid?path=increase-your-identity-strength
- S9 ATO, lodge from outside Australia: https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia
- S10 ATO, DASP: https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp
- S11 ATO, help with the DASP online application system: https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
- S12 ATO, contact us: https://www.ato.gov.au/about-ato/contact-us
- S13 ATO in Italian, DASP: https://www.ato.gov.au/other-languages/italian/departing-australia-superannuation-payment-dasp-for-temporary-residents-italian
- S14 ATO, check progress of your return: https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return
- S15 my.gov.au, authenticator: https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-an-authenticator

## 1. Findings

F1 (fact, GSC Queries.csv) Italian-language queries are almost absent: the only one is "tasse working holiday" 44 impr,
pos 20.5, 0 clicks. It already has its H2 on the flagship (added 24 Nov, line 423 of dichiarazione-redditi-australia).
F2 (fact, GSC Pages.csv) The IT pages that show are super: /it/blog/category/super 113 impr pos 8.04 (2 clicks),
/it/superannuation 95 impr pos 9.29 (1 click). /it/dichiarazione-redditi-australia and /it/tax-return have no row.
Italy country: 1,246 impr, 19 clicks, pos 8.27 (Countries.csv), up from 653 in the previous export (a08).
F3 (fact, SERPs 24 Nov) "rimborso tasse Australia working holiday", "recuperare superannuation Australia dall'Italia",
"DASP superannuation come richiedere italiano", "superannuation working holiday italiani": the results are ATO pages
(incl. the ATO Italian DASP page S13), INPS pension pages (wrong intent), fiscomania.com (Italian tax angle), SBS
Italian, pvtistes, hostelworld. No Italian page from Taxback, Etax or H&R Block. Weak, mostly off-intent competition.
F4 (fact, SERPs) "myGov codice SMS non arriva numero australiano dall'Italia" and "myGov account bloccato accesso
dall'estero tax return": only my.gov.au English help pages and about 15 community.ato.gov.au threads. Nobody answers
it in Italian. Same pattern Jo saw in English.
F5 (fact, repo) No IT page or guide is about a myGov problem. Mentions are one-liners: flagship FAQ "Mi serve un
account myGov?" (line 243), how-to-lodge-tax-return-from-overseas (03.ts line 432: "Una SIM australiana ormai spenta
non riceve i codici di verifica"), tfn-security-protect-from-fraud (12.ts line 117), how-to-lodge-tax-return-working-
holiday (03.ts line 221). The super page says "La domanda di DASP in sé non richiede myGov" (line 367) but no FAQ
answers it, and nothing explains the DASP online access (passport, secret question, status).
F6 (fact, code) IT guides are keyed by the ENGLISH slug: src/lib/locale-blog.ts lists a chunk entry only if the same
slug exists in src/app/(site)/blog/data.ts. IT already has all 144 EN guides with bodies (comm of slug lists: no
gap). So every new IT guide needs the EN guide first, plus the slug in src/lib/locale-guide-slugs.ts (test
new-locales-sitemap.test.ts fails otherwise).
F7 (fact, official) Key myGov facts for the guides:
- SMS codes go only to the number in the account; overseas you need that same number with roaming on (S1).
- The number can only be changed from Account settings once signed in; without the old number: Digital ID or a new
  account (S1). To reuse the same email on a new account the myGov helpdesk releases it (S1, S7).
- Linking the ATO accepts myID, passkey, authenticator app or SMS to an Australian mobile; overseas the ATO says to use
  myID, passkey or authenticator so no Australian mobile is needed (S4).
- Recovery with myID needs Strong (S7); Strong needs Australian identity documents and a photo; a foreign passport
  only counts as the visa for Standard, which needs any 2 Australian documents (Medicare card only after another) (S8).
- Identity questions for linking include the travel document from a TFN application in the last 4 years for temporary
  visitors, a recent payslip, a bank account that received an ATO refund, a notice of assessment from the last 5 years,
  an active super account; skipping all = failed attempt (S5).
- myGov Code Generator app retires 28 Feb 2027, no longer downloadable (S2).
- myGov helpdesk from an overseas mobile +61 1300 169 468 option 1 (S3); ATO from overseas +61 2 6216 1111, 8 am to
  5 pm AEDT, English; TIS +61 3 9268 8332 for other languages (S12).
- DASP online: no myGov; access with personal details and a secret question; TFN optional; passport number and country
  must be exactly as at first access; if the visa screen is wrong email DASPmail@ato.gov.au; status visible on re-entry
  but not whether the fund processed it (S11). Lodging from overseas: myTax, a registered tax agent, or paper (S9).
F8 (fact, inconsistency) Refund timing: flagship says "circa 14 giorni lavorativi", IT overseas guide (03.ts) says
"Circa 12 giorni lavorativi"; ATO now says "Most returns lodged online process within 10 business days" (S14).
F9 (inference) Italian demand is small but super-led and growing. The cheapest wins are problem guides with no Italian
competitor, linked to the super page and the flagship, which rank where Google already trusts /it super content.

## 2. Proposals

Rules applied: IT "tu"; no "we lodge / we are tax agents"; approved IT sign-off line as used on the site ("rivista e
approvata da un agente fiscale registrato prima di essere presentata all'ATO"); "We deal with the ATO directly" =
"Trattiamo direttamente con l'ATO" (new IT rendering: Jo to confirm); no amounts, no prices, no dashes. Chunk bodies
use straight apostrophes and no backticks; .tsx pages use the curly apostrophe as now. Internal links in chunk bodies
use the English path (/blog/<slug>, /superannuation), which the loader rewrites; the flagship is linked as
/it/dichiarazione-redditi-australia (as existing chunks do).

DEPENDENCY for all new guides: the EN guide with the SAME slug must exist in src/app/(site)/blog/data.ts first (F6). The
slugs below are my proposal; if the EN report picks other slugs, use those. Add each to the IT chunk (new file
chunks/20.ts, imported in src/app/(it)/it/blog/data.ts as c20) and to LOCALE_GUIDE_SLUGS.it.

### P1-1 New guide: codice SMS di myGov che non arriva (slug mygov-sms-code-not-received-overseas)
title: "Codice SMS di myGov che non arriva dall'estero: cosa fare" (57)
description: "myGov manda il codice SMS solo al numero australiano registrato. Se la SIM è scaduta, ecco le strade ufficiali e perché per tax return e super myGov non serve." (159)
body:
```
Se il codice SMS di myGov non arriva perché il tuo numero australiano non è più attivo, da quel numero non arriverà più: myGov lo manda solo al cellulare registrato nell'account. Le strade ufficiali sono due, accedere con myID oppure creare un nuovo account myGov e collegarlo di nuovo all'ATO. Per la [tax return australiana](/it/dichiarazione-redditi-australia) e per la [super](/superannuation), però, myGov non è indispensabile.

## Perché il codice SMS di myGov non arriva in Italia?

Perché myGov lo manda al numero registrato nel tuo account, e a nessun altro. Dall'estero funziona solo se usi la stessa SIM australiana con il roaming internazionale attivo, su una rete supportata dal tuo operatore. Una SIM prepagata scaduta o disattivata non riceve più niente.

Se invece la SIM è ancora attiva, myGov suggerisce i controlli di base: segnale, modalità aereo, memoria del telefono, messaggi bloccati o finiti nello spam, e un riavvio del telefono.

## Posso cambiare il numero senza entrare in myGov?

No. Il numero si cambia dalle impostazioni dell'account, quindi solo dopo aver fatto l'accesso. Per questo myGov consiglia di aggiornarlo finché il vecchio numero riceve ancora i codici. Se ormai non hai più quel numero, myGov indica due strade: accedere con un'identità digitale, cioè myID, oppure creare un nuovo account.

## Si può recuperare l'account con myID dall'Italia?

Con il solo passaporto italiano, di solito no. Il recupero dell'account con myID richiede il livello Strong, e il livello Strong si ottiene solo con documenti d'identità australiani e la verifica della foto. Il passaporto straniero myID lo usa soltanto per verificare il visto, e porta al massimo al livello Standard: lo spiega la guida su [myID con il passaporto italiano](/blog/myid-foreign-passport-australia).

Resta la seconda strada: un nuovo account myGov, poi il collegamento all'ATO. Puoi usare un'altra email. Per riusare la stessa devi chiedere all'assistenza myGov di liberarla: dal cellulare estero chiami il +61 1300 169 468 e scegli l'opzione 1.

## Come si collega l'ATO a un nuovo account dall'estero?

Accedi al nuovo account, scegli di collegare l'ATO, conferma i tuoi dati e rispondi alle domande con cui l'ATO verifica la tua identità. Per l'accesso l'ATO accetta myID, una passkey, un'app di autenticazione o il codice SMS a un numero australiano, e a chi è all'estero consiglia le prime tre, proprio perché non serve un cellulare australiano.

Le domande si basano su informazioni che l'ATO ha già. Per un working holiday maker le più utili di solito sono queste:

- il documento di viaggio usato per la richiesta del TFN, se è degli ultimi 4 anni
- una busta paga recente
- un conto bancario su cui è arrivato un rimborso dell'ATO
- una notice of assessment degli ultimi 5 anni
- un conto super attivo

Puoi saltare una domanda se non sei sicuro, ma saltarle tutte conta come tentativo fallito. Se la verifica online non va a buon fine, l'ATO ti dice come procedere. Gli errori più comuni li trovi nella guida sul [collegamento tra ATO e myGov](/blog/cant-link-ato-to-mygov).

## Come eviti che succeda di nuovo?

Aggiungi un secondo metodo di accesso che non dipenda dal numero australiano. Da My account, poi Account settings, poi Sign in settings, puoi attivare un'app di autenticazione o una passkey. Conviene farlo prima di lasciare l'Australia, finché il vecchio numero riceve ancora i codici.

Non contare sull'app myGov Code Generator: non si può più scaricare e verrà dismessa il 28 febbraio 2027.

## Serve davvero myGov per la tax return o per la super?

No. L'ATO indica myTax come la strada più semplice dall'estero, ma la tax return si può presentare anche tramite un agente fiscale registrato o su carta. La domanda online del DASP per la super non usa myGov: ci entri con i tuoi dati personali e una domanda segreta.

Con noi myGov non ti serve e non ti chiediamo mai la password. Trattiamo direttamente con l'ATO, e la tua tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata all'ATO. Scrivici su WhatsApp con più o meno dove e quando hai lavorato.
```
Facts: SIM/roaming S1; checks S2; number change S1; recovery Strong S7; Strong/Standard S8; email release S1, number S3;
linking S4; questions S5; sign-in settings path S7; Code Generator S2; lodging options S9; DASP access S11.
Links in: flagship (P1-3), /it/superannuation GUIDES (P1-4), 03.ts overseas guide, 12.ts security guide (P2-4).

### P1-2 New guide: account myGov bloccato (slug mygov-account-locked-out)
title: "Account myGov bloccato o password persa: cosa fare" (50)
description: "Account myGov bloccato, password dimenticata o servizi ATO che non si aprono: i passaggi ufficiali per sbloccarlo dall'Italia e cosa fare se non ci riesci." (155)
body:
```
Se myGov ti dice che l'account è bloccato, lo sblocchi da solo con il nome utente e la password attuale: dalla pagina di accesso scegli Unlock your account now, inserisci il codice di sicurezza, rispondi alla domanda segreta e imposti una nuova password. Se non hai più nessun metodo di accesso che funzioni, le strade ufficiali sono il recupero con myID o un nuovo account. Per la [tax return australiana](/it/dichiarazione-redditi-australia) con noi, myGov non serve.

## Perché myGov blocca l'account?

Perché i dati di accesso sono stati inseriti in modo sbagliato troppe volte. myGov ti manda un'email all'indirizzo registrato con il tuo nome utente. Non indica per quanto tempo l'account resta bloccato: si sblocca con la procedura descritta sopra.

## Ho dimenticato la password: cosa faccio?

Dalla pagina di accesso scegli Forgot password, inserisci i tuoi dati di accesso, scegli dove ricevere il codice, poi inserisci il codice e una nuova password. Se il codice dovrebbe arrivare a una SIM australiana ormai scaduta, segui la guida sul [codice SMS di myGov che non arriva](/blog/mygov-sms-code-not-received-overseas).

## Perché non posso più entrare con l'email o il cellulare?

Se myGov rileva un'attività di accesso insolita, disattiva l'email e il numero di cellulare come nome utente, e in quel caso non ricevi più i codici di ripristino per email o SMS. Si entra con il nome utente myGov univoco e la password attuale.

## Sono entrato in myGov, ma i servizi dell'ATO non si aprono: perché?

Dipende dal messaggio. Se non riesci proprio ad accedere ai servizi online dell'ATO, la causa può essere una violazione di dati o una misura di protezione sul tuo record fiscale, e in quel caso devi contattare l'ATO. L'errore 002 di solito dipende da un ad blocker, da un'estensione del browser o da un antivirus. Con un errore di sistema come A927.06 l'ATO consiglia di aspettare un'ora, chiudere tutte le finestre del browser e rientrare in myGov.

## E se non ho nessun metodo di accesso che funzioni?

Allora restano il recupero con myID, che però richiede il livello Strong e quindi documenti australiani, oppure un nuovo account myGov da collegare all'ATO. Come si fa dall'estero lo spiega la guida sul [codice SMS di myGov](/blog/mygov-sms-code-not-received-overseas).

## Chi posso chiamare dall'Italia?

Per l'account myGov c'è l'assistenza myGov: dal cellulare estero +61 1300 169 468, opzione 1, dal lunedì al venerdì dalle 7 alle 22 e nel fine settimana dalle 10 alle 17, ora australiana. Aiuta solo con il tuo account.

Per il record fiscale c'è l'ATO: +61 2 6216 1111, dal lunedì al venerdì dalle 8 alle 17 (AEDT), in inglese. Se preferisci l'italiano, chiama il servizio interpreti TIS al +61 3 9268 8332, che ti mette in contatto con l'ATO. Prima di parlare del tuo record l'ATO verifica la tua identità con domande sui dati che ha, quindi tieni pronto il TFN.

## Serve myGov per fare la tax return?

No. La tax return si può presentare anche tramite un agente fiscale registrato o su carta. Con noi non entri in myGov e non ti chiediamo mai la password: trattiamo direttamente con l'ATO, e la tua tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata all'ATO. Scrivici su WhatsApp.
```
Facts: lock and unlock S2; forgot password S2; unusual activity S2; ATO online errors S6; recovery S7, S8; numbers and
hours S3, S12; lodging options S9.

### P1-3 Flagship /it/dichiarazione-redditi-australia: myGov problem section + FAQ
File: src/app/(it)/it/dichiarazione-redditi-australia/page.tsx. Title, description, H1 untouched.
(a) New Section after the "two-ways" Section (after line 491), before "needed-title":
```
<Section eyebrow="myGov" title="Non riesci più ad accedere a myGov? La tax return si fa lo stesso" titleId="mygov-title">
  <p className={blocks.text}>
    Succede quasi sempre dopo la partenza: la SIM australiana è scaduta e il codice SMS non arriva più, l’account è
    bloccato o l’ATO non si lascia collegare. Per presentarla da solo con myTax ti servono un account myGov collegato
    all’ATO e un accesso che funzioni dall’estero: l’ATO consiglia myID, una passkey o un’app di autenticazione,
    perché il codice SMS arriva solo a un numero australiano.
  </p>
  <p className={blocks.text}>
    Con noi myGov non ti serve: non entriamo nel tuo account e trattiamo direttamente con l’ATO. Ogni tax return viene
    rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.
  </p>
  <p className={`${blocks.text} ${blocks.muted}`}>
    <Link href={itGuideHref('mygov-sms-code-not-received-overseas')} className={blocks.textLink}>Il codice SMS di myGov non arriva{itGuideSuffix('mygov-sms-code-not-received-overseas')}</Link>
    {' '}oppure{' '}
    <Link href={itGuideHref('mygov-account-locked-out')} className={blocks.textLink}>account myGov bloccato{itGuideSuffix('mygov-account-locked-out')}</Link>.
  </p>
  <WaButton href={WA_TR} position="inline" topic="tax-return" lang="it">Bloccato fuori da myGov? Scrivici su WhatsApp</WaButton>
</Section>
```
Facts: S9 (myGov linked + overseas access), S4 (SMS only to Australian mobile; overseas use myID, passkey, authenticator).
(b) New FAQ right after "Mi serve un account myGov?" (line 245); goes into faqLd automatically:
question: 'Il codice SMS di myGov non arriva più perché la SIM australiana è scaduta: posso fare la tax return?'
answer: 'Sì. Il codice SMS arriva solo al numero australiano registrato nell’account, quindi da una SIM scaduta non lo
riceverai più. Se la presenti da solo, le strade ufficiali sono accedere con myID oppure creare un nuovo account myGov
e collegarlo di nuovo all’ATO.\n\nCon noi myGov non serve: trattiamo direttamente con l’ATO, e la tax return viene
rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.' (S1, S7)
(c) GUIDES (line 264): add the 2 entries above as LinkRows. Only after the EN and IT guides are live (itGuideHref
falls back to /blog/<slug>, which 404s if the EN guide does not exist either).
(d) dateModified (line 325) to the deploy date.

### P1-4 /it/superannuation: "serve myGov?" FAQ + guide links
File: src/app/(it)/it/superannuation/page.tsx. H1, title, description untouched.
(a) New FAQ after "Mi serve il tax file number per richiedere la super?" (line 140):
question: 'Serve myGov per richiedere la super? E se il codice SMS non arriva più?'
answer: 'No. La domanda online del DASP non passa da myGov: ci entri con i tuoi dati personali e una domanda segreta
che scegli al primo accesso, quindi un numero australiano scaduto non la blocca. Il TFN è facoltativo, ma se lo
inserisci il sistema cerca i tuoi conti.\n\nAttento a due cose. Il numero e il Paese del passaporto vanno inseriti
esattamente come la prima volta, anche se il passaporto è scaduto. E la schermata del visto deve mostrare il visto
working holiday 417 o 462: se non lo mostra, l’ATO dice di non inviare la domanda online e di scrivere a
DASPmail@ato.gov.au.' (S11)
(b) GUIDES (line 238): add { href: itGuideHref('dasp-online-application-problems'), label: 'Domanda DASP online
bloccata: passaporto, visto e stato' + itGuideSuffix(...) } and the SMS guide { label: 'Il codice SMS di myGov non
arriva: cosa vuol dire per la super' }.

### P2-1 New guide: collegare l'ATO a myGov (slug cant-link-ato-to-mygov)
title: "Non riesci a collegare l'ATO a myGov? Cause e soluzioni" (55)
description: "Collegare l'ATO a myGov dall'estero: con quale accesso, quali domande fa l'ATO per verificarti e cosa vogliono dire gli errori più comuni, blocco compreso." (155)
Opening: "Se l'ATO non si collega al tuo myGov, di solito è per uno di tre motivi: un metodo di accesso che l'ATO non
accetta, dati che non corrispondono al tuo record o troppi tentativi falliti. Ognuno ha una soluzione ufficiale. Se ti
serve solo la [tax return australiana](/it/dichiarazione-redditi-australia), con noi il collegamento non serve."
H2 and answers:
- "Con quale accesso si collega l'ATO?" myID, passkey, app di autenticazione o SMS a un numero australiano; dall'estero
  l'ATO consiglia le prime tre (S4). Errore OVK.001: esci e rientra con myID di livello Standard o Strong (S6).
- "Quali domande fa l'ATO per verificarti?" The list from P1-1 (S5) plus: "saltarle tutte conta come tentativo fallito".
- "Cosa vogliono dire IDD.002, IDD.004 e IDD.006?" Nome, TFN o indirizzo non corrispondono al record ATO; controlla il
  nome e la data di nascita in My account, poi Profile; se sono sbagliati si correggono con Centrelink o Medicare, se
  sono giusti contatta l'ATO (S6).
- "Ho sbagliato troppe volte: quanto devo aspettare?" Con un errore LCK.001 a LCK.005 non puoi riprovare prima dell'ora
  indicata sullo schermo; l'ATO non indica una durata fissa (S6).
- "E con IDD.003, ICI.001 o OVK.002?" Non sei verificabile online: va contattata l'ATO, +61 2 6216 1111 dall'estero,
  in inglese, o TIS +61 3 9268 8332 (S6, S12).
- "Il pulsante per collegare l'ATO non c'è" Home di myGov, View and link services, Link; se risulta già collegato,
  Unlink, aspetta la conferma e poi Link (S6).
- Closing CTA: last paragraph of P1-2, unchanged.
Links: /blog/mygov-sms-code-not-received-overseas, /blog/myid-foreign-passport-australia, flagship.

### P2-2 New guide: myID con passaporto italiano (slug myid-foreign-passport-australia)
title: "myID con il passaporto italiano: cosa puoi fare davvero" (55)
description: "Con il passaporto italiano myID arriva al livello Standard solo con il visto e un altro documento australiano. Cosa vuol dire per myGov, l'ATO e la tax return." (159)
Opening: "Con il passaporto italiano puoi creare un myID, ma il livello dipende dai documenti australiani che hai. Il
passaporto straniero serve solo a verificare il visto, e per il livello Standard ci vuole un secondo documento
australiano, per esempio la tessera Medicare o una patente australiana. Il livello Strong richiede documenti
d'identità australiani e la foto, quindi con il solo passaporto italiano non lo raggiungi."
H2 and answers (all S8 unless marked):
- "Quali livelli ha myID e cosa serve per ognuno?" Basic: nessun documento. Standard: 2 documenti australiani tra
  passaporto australiano, patente o foglio rosa, certificato di nascita, visto (con il passaporto straniero), ImmiCard,
  certificato di cittadinanza, tessera Medicare (che compare solo dopo averne verificato un altro). Strong: documenti
  australiani e foto.
- "A cosa ti serve il livello Standard?" Per collegare l'ATO con myID serve Standard o Strong (S6); se non puoi avere
  Strong, l'ATO consiglia Standard perché semplifica il collegamento (S7).
- "Puoi recuperare un account myGov con myID Standard?" No, il recupero richiede Strong (S7). Link SMS guide.
- "Cosa serve per crearlo?" Uno smartphone, un'email personale non condivisa, almeno 15 anni.
- "Conviene farlo prima di partire?" Sì, finché hai a portata di mano tessera Medicare e visto. (Inference, written
  as advice; the official pages do not say whether the visa check works after the visa has ceased: leave that out.)
- Closing CTA: last paragraph of P1-2.

### P2-3 New guide: domanda DASP online bloccata (slug dasp-online-application-problems)
title: "Domanda DASP online bloccata: stato, visto e passaporto" (55)
description: "La domanda DASP online non usa myGov ma ha le sue trappole: passaporto da inserire identico, visto che risulta attivo, stato che non dice se il fondo ha pagato." (160)
Opening: "La domanda DASP online non passa da myGov: ci entri con i tuoi dati personali e una domanda segreta che scegli
al primo accesso. I blocchi più comuni sono altri: un passaporto inserito in modo diverso dalla prima volta, un visto
che risulta ancora attivo e uno stato «submitted» che non dice se il fondo ha già pagato." (S11)
H2 and answers (S11 unless marked):
- "Perché il sistema non ritrova la mia domanda?" Numero e Paese del passaporto devono essere identici al primo
  accesso, anche se il passaporto è scaduto. Servono gli stessi dati inseriti all'inizio anche per riprendere una
  domanda salvata prima di partire (S10).
- "Il visto risulta ancora attivo: cosa faccio?" Con un visto temporaneo attivo non puoi inviare; controlla lo stato su
  VEVO. Se la schermata del visto non mostra il 417 o 462, non inviare: scrivi a DASPmail@ato.gov.au. Link
  /blog/dasp-rejected-what-to-do and /blog/dasp-documents-required.
- "Come vedo a che punto è la domanda?" Rientrando vedi stati come submitted, rejected, transferred; non vedi se il fondo
  l'ha lavorata. In genere il pagamento arriva entro 28 giorni dalla domanda completa (S10); dopo, chiedi al fondo, o
  all'ATO per la super tenuta dall'ATO. Link /blog/how-long-does-dasp-take.
- "Il mio fondo non compare" Add application, poi l'ABN del fondo, che trovi nella ricerca del sistema, su Super Fund
  Lookup o chiedendolo al fondo.
- "Il DASP può arrivare su un conto italiano?" Solo per la super tenuta da un fondo e solo se il fondo offre il
  bonifico internazionale; la super tenuta dall'ATO va su un conto australiano a tuo nome o con assegno (S10). Link
  /superannuation.
- "Chi chiamo?" 13 10 20 in Australia; dall'estero +61 2 6216 1111, chiedendo il trasferimento al 13 10 20; TIS +61 3
  9268 8332.
- Closing: "Se preferisci non occupartene, lo facciamo noi: lavoriamo su ogni conto collegato al tuo TFN, super tenuta
  dall'ATO compresa, e sollecitiamo ogni fondo finché non paga. myGov non ti serve. Scrivici su WhatsApp con il visto, la
  data di partenza e i lavori che hai fatto." (wording taken from the live super page, lines 89, 93, 524)

### P2-4 Links from existing IT guides (after the new guides are live)
- 03.ts, how-to-lodge-tax-return-from-overseas: after "...e tutti bloccano le tax return." add: "Il codice SMS di myGov
  arriva solo al numero australiano registrato, e a chi è all'estero l'ATO consiglia myID, una passkey o un'app di
  autenticazione. Se la SIM è già scaduta, la guida sul [codice SMS di myGov che non arriva](/blog/mygov-sms-code-not-received-overseas)
  spiega le strade ufficiali." (S1, S4)
- 12.ts line 117 (tfn-security-protect-from-fraud, bullet on the expired SIM): append " Cosa fare se è già successo:
  [codice SMS di myGov che non arriva](/blog/mygov-sms-code-not-received-overseas)."
- 13.ts dasp-rejected-what-to-do, after the H2 "Come capisci quale hai?" answer: "Se il blocco è nella domanda online
  e non nel fondo, vedi [domanda DASP online bloccata](/blog/dasp-online-application-problems)."
- 05.ts how-to-find-lost-superannuation, after the myGov paragraph: "La domanda DASP online invece non usa myGov: [come
  funziona e dove si blocca](/blog/dasp-online-application-problems)." (S11)
- /it/tax-return FAQ (line 196 area): add the P1-3(b) FAQ with the question reworded to avoid an exact duplicate:
  'Ho perso l’accesso a myGov dopo il rientro: è un problema per la tax return?' Same answer.

### P3-1 Refund timing consistency (needs Jo, all languages)
F8: "circa 14 giorni lavorativi" (flagship hero, FAQ, how-it-works; /it/tax-return) vs "circa 12" (03.ts) vs ATO
"Most returns lodged online process within 10 business days" (S14). Not a promise breach, but inconsistent. Proposal:
make 03.ts say "circa 14 giorni lavorativi" like the money pages now, and let Jo decide sitewide whether to move to the
ATO's 10 business days (same sentence exists in EN, DE, JA, FR, ES).

### P3-2 Italian outreach angle (no code)
F3: Italian super SERPs show INPS and ATO only. The partner-guide-builder skill already exists; the two myGov guides and
the DASP online guide are good assets to pitch to Italian WHV groups and agencies as "risposte in italiano".

## 3. What NOT to do
- Do not add an IT guide without the EN guide of the same slug: the loader silently drops it (F6), and the
  LOCALE_GUIDE_SLUGS test fails if the list is not updated.
- No new IT guide on "rimborso tasse Australia" or "rimborso superannuation": the flagship, /it/superannuation and
  tax-back-australia-working-holiday own those; a new page would split them (cannibalisation). Problem guides only.
- Do not merge SMS and lockout into the flagship FAQ only: the queries are separate problems and need their own page;
  but keep P1-1 and P1-2 on different intents (number/SIM vs lock/password) and cross-link them.
- Do not write that SMS codes never work abroad (they do with roaming on the same number, S1), that the ATO gives a
  "linking code" by phone (not on the official pages fetched), that myID Strong is possible with an Italian passport,
  or that myID works overseas (not stated, S8). Do not suggest the myGov Code Generator (retiring, S2).
- Do not offer to recover the client's myGov account or ask for credentials: the helpdesk helps only the account owner
  (S3), and the site promises never to ask for the password.
- Do not say "presentiamo noi" or "siamo agenti fiscali"; use only the approved sign-off line and "Trattiamo
  direttamente con l'ATO" (Jo to confirm this IT rendering).
- No refund amounts or timing promises; no prices (the existing fee lines on the flagship stay exactly as they are).
- No Italian tax advice (Agenzia delle Entrate rule already on both pages).
- Do not touch titles, descriptions or H1s of the flagship, /it/tax-return or /it/superannuation (frozen to 7 Dec).
- Do not mention Student Visa Tax, AI, or use em/en dashes in any of the text above.
