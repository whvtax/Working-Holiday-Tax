// 24 Nov 2026 (plan 3): guide su myGov e sul conto chiuso. Ogni fatto viene da una pagina ufficiale
// (ato.gov.au, my.gov.au, myid.gov.au); fonti e URL nel log di build E.
export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'tax-return-without-mygov': {
    title: "Tax return australiana senza myGov: come si fa",
    description: "Niente più accesso a myGov, codice SMS su un vecchio numero, ATO che non si collega? La tax return si può presentare lo stesso, anche dall'Italia.",
    body: `
Sì, la tax return australiana si può presentare senza entrare in myGov. myGov serve solo per presentarla da solo online con myTax: l'ATO accetta anche una dichiarazione presentata da un agente fiscale registrato, oppure una dichiarazione cartacea spedita per posta, anche dall'estero. Se dopo il rientro il tuo accesso a myGov non funziona più, la tua tax return non è bloccata.

## Perché tanti working holiday maker restano fuori da myGov dopo il rientro?

Perché l'accesso di solito dipende da un numero australiano. Per i servizi online dell'ATO il codice SMS funziona solo con un cellulare australiano, e a chi è all'estero l'ATO consiglia myID, una passkey o un'app di autenticazione. Basta una SIM prepagata scaduta dopo la partenza per restare chiuso fuori.

I blocchi sono quasi sempre tre: il codice SMS che arriva al vecchio numero, l'account bloccato dopo troppi tentativi e l'ATO che non si lascia collegare a un account nuovo. Ognuno ha la sua soluzione ufficiale, qui sotto.

## Quali sono i modi per presentarla senza il tuo account?

L'ATO ne indica tre, e solo uno passa dal tuo myGov:

1. Online con myTax: serve un account myGov collegato all'ATO e un accesso che funzioni dall'estero.
2. Tramite un agente fiscale registrato: prepara e presenta la dichiarazione, e tu non devi entrare in myGov.
3. Su carta: compili il modulo e lo spedisci per posta.

Le tre strade sono descritte nella pagina dell'ATO su [come presentare la tax return](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return) (in inglese). Solo gli agenti fiscali registrati possono farsi pagare per preparare una dichiarazione, e la loro iscrizione si controlla nel registro del Tax Practitioners Board. Non dare a nessuno la password di myGov: a un agente non serve.

## E la dichiarazione cartacea dall'estero?

Si può fare, ma è lenta. Ordini il modulo cartaceo online o per telefono, lo compili e lo spedisci a GPO Box 9845, SYDNEY NSW 2001, AUSTRALIA. Secondo l'ATO una dichiarazione cartacea può richiedere fino a 90 giorni lavorativi, mentre la maggior parte di quelle online viene elaborata entro 10 giorni lavorativi.

Ti servono anche le cifre di ogni datore di lavoro. Senza accesso agli income statement in myGov, sulla carta è spesso la parte più faticosa.

## Che cosa ti serve con noi?

Molto meno che per sistemare myGov. Bastano tre cose: passaporto e visto, un conto bancario australiano per l'eventuale rimborso e più o meno dove e quando hai lavorato. Le payslip non servono: i datori di lavoro hanno già comunicato i tuoi redditi all'ATO.

Il conto bancario è l'unico punto che non si aggira, perché l'ATO paga i rimborsi solo su un conto australiano. Se il tuo è già chiuso, leggi [rimborso tasse e conto australiano chiuso](/blog/tax-refund-closed-australian-bank-account).

## E la super, senza myGov?

La domanda online del DASP dell'ATO non ti chiede di entrare in myGov. Ci entri con i tuoi dati personali, il passaporto e una domanda segreta che scegli tu, e il TFN è facoltativo.

La super è una richiesta separata dalla tax return, con i suoi tempi. Tutti i dettagli sono in [richiedere la super senza myGov](/blog/claim-super-without-mygov).

## Conviene comunque sistemare l'accesso a myGov?

Per la tax return no. Serve se vuoi vedere da solo la tua posizione ATO o presentare da solo gli anni successivi, e conviene farlo finché sei ancora in Australia.

A seconda del blocco: [il codice SMS di myGov che non arriva dall'estero](/blog/mygov-sms-code-not-received-overseas), [account myGov bloccato](/blog/mygov-account-locked-out), oppure il quadro completo dei [problemi con myGov e delle soluzioni](/blog/mygov-problems-tax-return-super) (in inglese).

## E se preferisci non occupartene?

Non devi mai entrare in myGov, collegare un documento australiano o capire quale modulo è quale. Ce la vediamo direttamente noi con l'ATO, e ogni tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata all'ATO.

Scrivici su WhatsApp le città in cui hai lavorato e più o meno quali mesi, dall'Australia o da casa. Come funziona è spiegato nella pagina sulla [dichiarazione dei redditi in Australia](/it/dichiarazione-redditi-australia).
`,
  },
  'mygov-sms-code-not-received-overseas': {
    title: "Codice SMS di myGov che non arriva dall'estero: cosa fare",
    description: "myGov manda il codice SMS solo al numero australiano registrato. Se la SIM è scaduta, ecco le strade ufficiali e perché per la tax return myGov non serve.",
    body: `
Se il codice SMS di myGov non arriva perché il tuo numero australiano non è più attivo, da quel numero non arriverà più: myGov lo manda solo al cellulare registrato nell'account, e il numero si cambia solo dopo aver fatto l'accesso. Le strade ufficiali sono due, accedere con un'identità digitale come myID oppure creare un nuovo account myGov e collegarlo di nuovo all'ATO. Per la tax return, però, myGov non è indispensabile.

## Perché il codice SMS di myGov non arriva in Italia?

Perché myGov lo manda al numero registrato nel tuo account, e a nessun altro. Dall'estero funziona solo se usi la stessa SIM australiana con il roaming internazionale attivo, su una rete supportata dal tuo operatore. Una SIM prepagata scaduta o disattivata non riceve più niente.

Se invece la SIM è ancora attiva, myGov suggerisce i controlli di base: segnale, modalità aereo, memoria del telefono, messaggi bloccati o finiti nello spam e un riavvio. I dettagli sono nella pagina di myGov sui [codici via SMS](https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms) (in inglese).

## Posso mettere un numero italiano?

Solo se riesci ancora ad accedere, e non risolve tutto. Il numero si cambia da Account settings, poi Contact details, dopo aver fatto l'accesso. Ma per i servizi online dell'ATO il codice SMS funziona solo con un cellulare australiano.

Per l'ATO dall'estero la vera soluzione è quindi un metodo che non dipende da un numero: myID, una passkey o un'app di autenticazione, come l'ATO consiglia a chi è all'estero.

## Quali altri modi di accesso esistono?

L'app myGov, una passkey, un'app di autenticazione e myID. Si attivano da un account aperto, in Account settings, poi Sign in settings: conviene farlo prima di lasciare l'Australia, finché il vecchio numero riceve ancora i codici.

Non contare sull'app myGov Code Generator: non si può più scaricare e verrà dismessa il 28 febbraio 2027. La guida di myGov ai [problemi di accesso](https://my.gov.au/content/mygov/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help) (in inglese) elenca le alternative ancora valide.

## E se sei già tornato e non hai nessun accesso?

Restano due strade, in quest'ordine:

1. Nella pagina di accesso scegli «I didn't get my code», poi «Continue with Digital ID». Serve un myID di livello Strong, con lo stesso nome, la stessa data di nascita e la stessa email dell'account myGov.
2. Altrimenti crei un nuovo account myGov e lo colleghi di nuovo all'ATO.

La prima strada di solito è chiusa per chi ha fatto il working holiday: il livello Strong richiede documenti australiani, per esempio un passaporto australiano, e dall'estero un visto non si può verificare in myID. Per quasi tutti resta quindi un nuovo account. Per riusare la stessa email, l'assistenza myGov deve prima liberarla.

Collegare l'ATO al nuovo account vuol dire rispondere a domande sui dati che l'ATO ha su di te, spiegate nella guida su [come collegare l'ATO a myGov](/blog/cant-link-ato-to-mygov) (in inglese).

## Chi posso chiamare dall'Italia?

- Assistenza myGov: +61 1300 169 468, opzione 1, dal lunedì al venerdì dalle 7 alle 22 e nel fine settimana dalle 10 alle 17, ora australiana
- ATO: +61 2 6216 1111, dal lunedì al venerdì dalle 8 alle 17, ora dell'Australia orientale, in inglese

Con il fuso orario, in Italia questi orari cadono spesso di notte. Prima di chiamare tieni a portata di mano il TFN, il nome come compare sul passaporto e la data di nascita. I numeri sono nella pagina dei [contatti di myGov](https://my.gov.au/en/about/help/contact) (in inglese).

## Serve sistemare tutto per fare la tax return?

No. myGov serve solo per presentarla da solo con myTax, e nessuno di serio ti chiederà la password di myGov.

La tax return si può presentare anche tramite un agente fiscale registrato o su carta: vedi [tax return australiana senza myGov](/blog/tax-return-without-mygov). Se invece il problema è l'account bloccato, leggi [account myGov bloccato](/blog/mygov-account-locked-out), e per tutti gli altri casi i [problemi con myGov e le soluzioni](/blog/mygov-problems-tax-return-super) (in inglese).

## E se preferisci non occupartene?

Non devi mai entrare in myGov, collegare un documento australiano o capire quale modulo è quale. Ce la vediamo direttamente noi con l'ATO, e ogni tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata all'ATO.

Scrivici su WhatsApp anche se non hai più nessun accesso a myGov, oppure leggi prima la pagina sulla [dichiarazione dei redditi in Australia](/it/dichiarazione-redditi-australia).
`,
  },
  'mygov-account-locked-out': {
    title: "Account myGov bloccato o password persa: cosa fare",
    description: "Account myGov bloccato, password dimenticata o servizi ATO che non si aprono: i passaggi ufficiali per sbloccarlo dall'Italia e cosa fare se non ci riesci.",
    body: `
Se myGov ti dice che l'account è bloccato, lo sblocchi da solo con il nome utente e la password attuale: dalla pagina di accesso scegli Unlock your account now, inserisci il codice di sicurezza, rispondi alla domanda segreta e imposti una nuova password. Se non hai più nessun metodo di accesso che funzioni, myGov prevede un nuovo account. La tax return, però, non ha bisogno di questo account.

## Perché myGov blocca l'account?

Perché i dati di accesso sono stati inseriti in modo sbagliato troppe volte. myGov ti manda allora un'email all'indirizzo registrato con il tuo nome utente, e l'account resta bloccato finché non lo sblocchi.

Finché è bloccato non funzionano nemmeno Digital ID, le passkey e l'app myGov. Lo spiega la guida di myGov ai [problemi di accesso](https://my.gov.au/content/mygov/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help) (in inglese).

## Come si sblocca l'account?

In quattro passaggi, nella pagina di accesso di myGov:

1. Inserisci il nome utente e la password attuale.
2. Scegli Unlock your account now.
3. Inserisci il codice di sicurezza e rispondi alla domanda segreta.
4. Scegli una nuova password e confermala.

## Ho dimenticato la password o il nome utente: cosa faccio?

Con Forgot password inserisci i tuoi dati di accesso, scegli dove ricevere il codice, poi inserisci il codice e una nuova password. Con Forgot username myGov ti manda il nome utente per email: sono due lettere e sei cifre.

Se myGov ha rilevato un'attività di accesso insolita, può disattivare l'email e il cellulare come nome utente: in quel caso si entra con il nome utente myGov. E se il codice dovrebbe arrivare a una SIM australiana ormai scaduta, segui la guida sul [codice SMS di myGov che non arriva](/blog/mygov-sms-code-not-received-overseas).

## E se non ricordo le domande segrete?

myGov propone di accedere con Digital ID, una passkey o l'app myGov, se li avevi attivati. Le domande segrete comunque non valgono per i servizi dell'ATO.

Per l'ATO l'accesso passa da myID, una passkey, un'app di autenticazione o un codice SMS a un numero australiano.

## Sono entrato in myGov, ma i servizi dell'ATO non si aprono: perché?

Dipende dal messaggio. Se non riesci proprio ad accedere ai servizi online dell'ATO, secondo l'ATO la causa può essere una violazione di dati o una misura di protezione sul tuo record fiscale, e in quel caso devi contattarla.

L'errore 002 di solito dipende da un ad blocker o da un'estensione del browser. Con un errore di sistema come A927.06 l'ATO consiglia di aspettare un'ora, chiudere tutte le finestre del browser e riprovare.

## E se non ho nessun metodo di accesso che funzioni?

Allora myGov prevede di creare un nuovo account e collegarci di nuovo i tuoi servizi. La vecchia email resta legata al vecchio account finché l'assistenza myGov non la libera.

Dal cellulare estero l'assistenza myGov risponde al +61 1300 169 468, opzione 1, dal lunedì al venerdì dalle 7 alle 22 e nel fine settimana dalle 10 alle 17, ora australiana ([contatti di myGov](https://my.gov.au/en/about/help/contact), in inglese). Poi colleghi l'ATO rispondendo a domande sui tuoi dati: lo spiega la guida su [come collegare l'ATO a myGov](/blog/cant-link-ato-to-mygov) (in inglese).

## Un messaggio ti propone di sbloccare l'account?

Fai attenzione. Nessuno di serio ti chiede la password di myGov o di cliccare su un link ricevuto via SMS per «sbloccare» un account.

La guida sulla [sicurezza del tuo TFN](/blog/tfn-security-protect-from-fraud) elenca le truffe più comuni.

## Serve myGov per fare la tax return?

No. myGov serve solo per presentarla da solo con myTax, e l'ATO accetta anche una dichiarazione presentata da un agente fiscale registrato o su carta.

Le tre strade sono messe a confronto in [tax return australiana senza myGov](/blog/tax-return-without-mygov).

## E se preferisci non occupartene?

Non devi mai entrare in myGov, collegare un documento australiano o capire quale modulo è quale. Ce la vediamo direttamente noi con l'ATO, e ogni tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata all'ATO.

Scrivici su WhatsApp anche con l'account bloccato, oppure leggi la pagina sulla [dichiarazione dei redditi in Australia](/it/dichiarazione-redditi-australia).
`,
  },
  'claim-super-without-mygov': {
    title: "Richiedere la super senza myGov: cosa serve davvero",
    description: "La domanda online del DASP dell'ATO non passa da myGov e il TFN è facoltativo. Che cosa chiede, e cosa fare se non trovi il tuo fondo della super.",
    body: `
La domanda online del DASP dell'ATO non passa da myGov: ci entri con i tuoi dati personali, il passaporto e una domanda segreta che scegli al primo accesso, e il TFN è facoltativo. Un account myGov bloccato, un vecchio numero australiano che non riceve più i codici o un ATO mai collegato quindi non bloccano la richiesta della super. La domanda online è gratuita.

## Dove entra myGov, allora?

Solo nel ritrovare la super. myGov collegato all'ATO elenca ogni conto in Super, poi Fund details, compresa la super già passata all'ATO. È comodo, ma non è la domanda vera e propria.

La domanda del DASP passa da un sistema separato dell'ATO, che fa la stessa ricerca se inserisci il TFN. Se non hai idea di quali fondi avevi, [come trovare la super persa](/blog/how-to-find-lost-superannuation) spiega da dove partire.

## Che cosa chiede la domanda online?

Nome e data di nascita, un indirizzo email, il Paese e il numero del passaporto e, per ogni conto, l'ABN del fondo e se ce l'hai il numero di socio. Il sistema mostra poi i dati del visto che trova, e può trovare l'ABN di un fondo partendo dal nome.

Il TFN è facoltativo: senza, inserisci tu ogni conto. Con il TFN il sistema cerca i tuoi conti e crea una domanda per ognuno. Il passaporto va inserito con lo stesso numero e lo stesso Paese ogni volta che rientri, anche se nel frattempo è scaduto. Tutto è descritto nella guida dell'ATO alla [domanda DASP online](https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system) (in inglese).

## E se non trovi il tuo fondo?

Parti dai posti in cui hai lavorato: ogni datore di lavoro versava la super in un fondo, e di solito il nome è sulle payslip. Se il sistema non mostra un fondo che sai di aver avuto, scegli Add application e inizia una domanda con l'ABN di quel fondo.

Se hai dimenticato la risposta alla domanda segreta per riaprire una domanda salvata, devi chiamare l'ATO.

## Che cosa deve essere vero prima di inviarla?

Tre cose insieme: hai lasciato l'Australia, il visto 417 o 462 è scaduto o è stato annullato e non hai un altro visto australiano attivo. Puoi iniziare la domanda e salvarla prima di partire, e inviarla quando sei partito.

Finché il visto è attivo, la domanda non si può inviare: controllalo su VEVO. Se la schermata del visto mostra dati sbagliati, non inviarla online: l'ATO chiede di scrivere a DASPmail@ato.gov.au. Gli altri motivi di rifiuto sono nella guida su [cosa fare se il DASP viene respinto](/blog/dasp-rejected-what-to-do).

## Posso chiamare l'ATO dall'estero?

Sì. Dall'estero l'ATO risponde al +61 2 6216 1111, dal lunedì al venerdì dalle 8 alle 17, ora dell'Australia orientale: chiedi di essere trasferito al 13 10 20. Se preferisci l'italiano, il servizio interpreti TIS National risponde al +61 3 9268 8332.

## Come viene pagata la super?

La super ancora in un fondo può arrivare su un conto australiano, con un assegno in dollari australiani o, se il fondo lo prevede, con un bonifico internazionale. La super già passata all'ATO viene pagata solo su un conto australiano a tuo nome o con assegno.

Secondo l'ATO il pagamento arriva in genere entro 28 giorni dal ricevimento della domanda completa. Le regole sono nella pagina dell'ATO sul [DASP](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp) (in inglese).

## E la tax return, senza myGov?

È una pratica separata, con un pagamento a parte che arriva solo su un conto australiano.

Anche quella si può fare senza myGov: vedi [tax return australiana senza myGov](/blog/tax-return-without-mygov).

## E se preferisci affidarla a noi?

La domanda di DASP in sé non richiede myGov. Quello che porta via tempo è tutto il resto, ed è la parte di cui ci occupiamo noi. Working Holiday Tax opera sotto la supervisione di un agente fiscale registrato.

Quello che ci affidi è la ricerca su ogni conto collegato al tuo tax file number, super tenuta dall'ATO compresa, le copie autenticate organizzate dall'estero, una domanda per ogni conto e i solleciti quando un fondo tace. Scrivici su WhatsApp il visto, la data di partenza e i lavori che hai fatto, oppure leggi prima [come riavere la tua superannuation](/superannuation).
`,
  },
  'tax-refund-closed-australian-bank-account': {
    title: "Rimborso tasse e conto australiano chiuso: cosa succede",
    description: "Hai chiuso il conto australiano prima che arrivasse il rimborso? L'ATO paga solo su conti australiani. Che fine fanno i soldi e come riaverli.",
    body: `
L'ATO paga i rimborsi fiscali solo su un conto bancario australiano, mai su un conto estero. Se il conto che hai indicato è stato chiuso, il rimborso torna all'ATO, che lo paga di nuovo quando le dai coordinate australiane aggiornate; senza, lo riemette con un assegno. I soldi non sono persi, ma restano fermi finché le coordinate non sono a posto.

## L'ATO può pagare il rimborso su un conto italiano?

No. L'ATO lo scrive chiaramente: può pagare i rimborsi solo su un conto bancario australiano. Senza coordinate bancarie può essere persino impossibile presentare online con myTax.

È la differenza con la super: un fondo può pagare il DASP con un bonifico internazionale, se lo prevede. Un rimborso fiscale, mai. La regola è nella pagina dell'ATO sulle [coordinate bancarie](https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details) (in inglese).

## Che fine fa un rimborso pagato su un conto chiuso?

La Reserve Bank of Australia lo restituisce all'ATO, e possono volerci fino a 10 giorni. Appena aggiorni le coordinate bancarie, l'ATO lo paga sul nuovo conto.

Se non dai nuove coordinate, l'ATO riemette il rimborso con un assegno. Da gennaio 2025 trattiene alcuni assegni fino a 90 giorni, mentre ti chiede le coordinate bancarie. È tutto nella pagina dell'ATO sui [rimborsi mancanti](https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds) (in inglese).

## E se la dichiarazione viene presentata senza un conto australiano?

L'ATO può trattenere il rimborso fino a 90 giorni da quando è dovuto, e ti contatta per lettera, per email o nella casella di myGov per chiederti un conto australiano valido. Indicare le coordinate già nella dichiarazione evita questa attesa.

## E se i soldi sono finiti sul conto sbagliato?

Dipende dal conto. Se è un conto che non ha niente a che fare con te, contatta l'ATO, che prova a recuperare la somma: possono volerci più di 28 giorni. Se è un conto che conosci, come un tuo vecchio conto o quello del partner, di solito l'ATO non può recuperarlo, e la questione va risolta con il titolare del conto.

## Come si danno all'ATO le nuove coordinate?

Online in myGov: ATO, poi My profile, poi Financial institution details. Il conto deve essere tra l'altro intestato a te, da solo o cointestato, con un BSB di 6 cifre e un numero di conto di massimo 9 cifre.

Senza accesso a myGov puoi anche chiamare l'ATO con il TFN a portata di mano: +61 2 6216 1111 dall'estero, dal lunedì al venerdì dalle 8 alle 17, ora dell'Australia orientale. Se il blocco è proprio myGov, leggi [tax return australiana senza myGov](/blog/tax-return-without-mygov).

## Conviene tenere il conto australiano dopo la partenza?

Sì, finché non è arrivato tutto quello che ti spetta. Il rimborso di un anno di lavoro può arrivare solo in Australia, ed è anche il conto più semplice per seguire la super.

I tempi di elaborazione sono spiegati in [quanto ci mette il rimborso](/blog/how-long-does-tax-refund-take-australia), e il resto della lista prima della partenza in [tasse dopo aver lasciato l'Australia](/blog/tax-obligations-after-leaving-australia).

## E se preferisci non occupartene?

Non devi mai entrare in myGov, collegare un documento australiano o capire quale modulo è quale. Ce la vediamo direttamente noi con l'ATO, e ogni tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata all'ATO.

Se il tuo conto australiano è già chiuso, scrivicelo nel primo messaggio. Scrivici su WhatsApp, oppure leggi prima la pagina sulla [dichiarazione dei redditi in Australia](/it/dichiarazione-redditi-australia).
`,
  },
}
