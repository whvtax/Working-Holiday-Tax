export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'what-does-tax-withheld-mean-payslip': {
    title: "Tax withheld in busta paga: il 15% è giusto?",
    description: "Con il visto working holiday è circa il 15% della paga lorda. Dividi tax withheld per gross: se esce 0,30 o 0,45, ecco cosa è andato storto.",
    body: `
Il tax withheld è l'imposta sul reddito che il datore di lavoro versa all'ATO prelevandola dalla tua paga lorda, prima che il resto arrivi sul tuo conto. Con un visto working holiday l'aliquota di ritenuta di riferimento è il 15% del guadagno lordo fino a 45.000 $ AUD, ma l'importo finale dipende dai fatti del tuo anno. Se la percentuale della tua busta paga ti sembra diversa, lo vediamo insieme quando prepariamo la tua tax return.

## Quali sono i tre numeri di una payslip e come si collegano?

Ogni payslip australiana in regola mostra gross pay, tax withheld e net pay: il primo meno il secondo dà il terzo. Il gross è quello che hai guadagnato, il tax withheld è quello che il datore di lavoro ha inviato all'ATO, il net è quello che ti arriva sul conto.

Il tax withheld è un acconto, non il conto finale. È una stima raccolta busta paga dopo busta paga, a fronte di un'imposta che viene calcolata una volta sola, a fine anno fiscale, su tutto il tuo reddito. Se è stato trattenuto troppo, ottieni un rimborso. Se è stato trattenuto troppo poco, devi pagare la differenza.

## Come controlli che l'aliquota sia giusta?

Dividi il tax withheld per il gross pay su una qualsiasi payslip. Un working holiday maker con la Tax File Number Declaration compilata bene e un datore di lavoro registrato correttamente dovrebbe ottenere un valore vicino a 0,15.

- Lordo di 600 $ a settimana: circa 90 $ trattenuti
- Lordo di 900 $ a settimana: circa 135 $ trattenuti
- Lordo di 1.200 $ a settimana: circa 180 $ trattenuti
- Lordo di 2.000 $ a settimana: circa 300 $ trattenuti

Fallo su più di una payslip e per ogni datore di lavoro separatamente. Di solito non succede che tutte le buste paga siano sbagliate: succede che un datore di lavoro sia a posto e un altro sbagli in silenzio per mesi.

## Cosa significa ogni percentuale sbagliata?

La percentuale ti dice quale regola è saltata, e ognuna ha una causa e una soluzione diverse.

**Intorno al 45%.** La tua Tax File Number Declaration non è arrivata all'ufficio paghe, oppure la finestra dei 28 giorni è scaduta senza il tuo TFN. È il caso più costoso e anche il più comune. Si risolve nel momento in cui la dichiarazione è registrata, dalla busta paga successiva in poi.

**Intorno al 30% o poco sopra.** Il datore di lavoro non è registrato presso l'ATO come datore di lavoro di working holiday maker, quindi applica le aliquote da non residente. Non è un tuo errore e sul modulo di dichiarazione non c'è niente da correggere. L'eccedenza si può recuperare con la tax return.

**Nettamente sotto il 15%, o quasi zero su una paga normale.** Può dipendere da come è stata compilata la dichiarazione di ritenuta, ad esempio da una risposta sulla tax free threshold. In questo caso per tutto l'anno può essere stato trattenuto troppo poco, e la differenza emerge al momento dell'assessment. Cosa vale nel tuo caso lo vediamo noi quando prepariamo la dichiarazione.

**Niente, e nessuna riga di super.** Ti pagano fuori dalla payroll, comunque la chiamino. Non c'è niente da recuperare e nessun income statement da cui presentare la dichiarazione, ma il reddito va comunque dichiarato.

## Dove vanno i soldi una volta trattenuti?

Il datore di lavoro li tiene per poco tempo e li versa all'ATO secondo il proprio ciclo di reporting, poi a fine anno chiude i totali con il tuo income statement. È quel documento, non le buste paga, la base della tua tax return.

Se un datore di lavoro non finalizza mai, oppure finalizza con cifre che non corrispondono a quanto ti hanno pagato, le payslip sono l'unica prova della differenza. Tutto il senso di conservarle sta qui.

## Perché conservare le payslip se l'ATO ha già i dati?

Perché l'ATO ha quello che il datore di lavoro ha dichiarato, che non sempre è quello che ti è stato pagato. Con le payslip si risolve una discrepanza, e sono l'unico documento che mostra la super separata dalle tasse, la riga che più spesso manca del tutto.

Gli errori in payroll sui salari dei backpacker non sono rari e di solito non sono dolosi. Si concentrano nelle piccole attività con una sola sede, nelle farm e nei packing shed che durante il raccolto usano sistemi cartacei improvvisati, e nei locali dove una sola persona fa la payroll tra mille altre cose. Tenere le payslip ricevute via email in una sola cartella chiarisce la questione più avanti.

## Perché la tua payslip dice qualcosa di diverso?

Il 15% è il valore di riferimento per un working holiday maker, quindi una payslip con un valore diverso ti sta dicendo qualcosa sulla tua situazione. Queste circostanze producono percentuali diverse, e non vanno tutte nella stessa direzione.

- Quanti datori di lavoro hai avuto. Ognuno ha una dichiarazione, un'aliquota e un income statement a sé, e la trattenuta in eccesso di solito si concentra in uno solo.
- Se qualche datore di lavoro non era registrato come datore di lavoro di working holiday maker: in quel caso viene applicata la ritenuta da non residente, e non puoi correggerla dal tuo lato.
- Come è stata compilata la dichiarazione di ritenuta, comprese le risposte sulla tax free threshold, che possono cambiare molto la ritenuta.
- Se una parte del reddito veniva da lavoro con ABN, dove non viene trattenuto niente e l'imposta si regola tutta all'assessment.
- Se per un periodo il tuo TFN non era ancora registrato, cosa che mette un blocco di buste paga al 45% e concentra lì il tuo rimborso.

Quello che è stato trattenuto in più rispetto a quanto dovevi davvero si può recuperare con la tua [working holiday tax return](/tax-return), e puoi [stimare il tuo rimborso](/calculator) partendo dalle cifre dell'anno finora.
`,
  },
  'what-is-an-income-statement': {
    title: "Cos'è l'income statement in Australia?",
    description: "L'income statement ha sostituito il payment summary cartaceo. Lo invia il datore di lavoro ed è definitivo solo quando risulta tax ready.",
    body: `
L'income statement è il riepilogo annuale che ogni datore di lavoro comunica all'ATO tramite la Single Touch Payroll, con la tua paga lorda e il tax withheld dell'anno fiscale: sono i due numeri su cui si costruisce la tua tax return. Ne ricevi uno per ogni datore di lavoro e per ogni anno fiscale. È il successore digitale del PAYG payment summary che arrivava su carta. Oggi nessuno te lo consegna: sta nei sistemi dell'ATO, e un anno di working holiday con cinque datori di lavoro ne produce cinque.

## Da dove arriva un income statement?

Arriva dal software paghe del datore di lavoro, non da un modulo che qualcuno compila a fine anno. Con la Single Touch Payroll ogni pagamento stipendi comunica all'ATO, in tempo reale, la tua paga lorda, l'imposta trattenuta e la tua super, e l'income statement è il totale accumulato.

Il record quindi appartiene ai sistemi dell'ATO e non al tuo ex datore di lavoro. Una farm a Mildura che non risponde più alle email ha già dichiarato i tuoi stipendi, e le cifre si possono recuperare senza di loro.

## Quando diventa utilizzabile?

L'anno fiscale finisce il 30 giugno e i datori di lavoro devono finalizzare i dati entro il 14 luglio, anche se alcuni arrivano in ritardo. Finché un datore di lavoro non finalizza, il documento mostra cifre year to date non ancora dichiarate complete. Quando lo fa, lo stato diventa tax ready.

Presentare la dichiarazione su un documento che non è tax ready è un modo sicuro per ottenere un assessment sbagliato e doverlo poi correggere. Le cifre possono ancora cambiare, e a quel punto la tua tax return non coincide più con quello che ha l'ATO. Aspettare che tutti i datori di lavoro abbiano finalizzato è meglio che presentare la prima settimana di luglio.

## Quali sono i tre numeri da controllare?

Gross payments, tax withheld e la super mostrata accanto. Questi tre ti dicono se il tuo anno è stato tassato come doveva.

- **Gross payments.** Confrontali con il tuo totale progressivo preso dalle payslip. Una differenza significa un periodo di paga mancante oppure una paga inferiore al dovuto.
- **Tax withheld.** Dividilo per il lordo. Intorno al 15% è giusto per un working holiday maker presso un datore di lavoro registrato. Molto di più indica un periodo senza il tuo TFN registrato, oppure un datore di lavoro che non si è mai registrato.
- **Super.** Dal 1° luglio 2026 i contributi arrivano in genere entro sette giorni lavorativi dal giorno di paga (prima erano trimestrali), quindi una cifra che sembra bassa può semplicemente non essere ancora stata versata.

## Cosa fai se manca un datore di lavoro?

Un datore di lavoro mancante è il difetto più comune e ha tre cause. Può darsi che non abbia ancora finalizzato, e in quel caso basta aspettare. Può averti dichiarato con un nome o una data di nascita sbagliati, quindi il record esiste ma non è collegato a te. Oppure può non aver mai dichiarato gli stipendi, ed è il caso del lavoro pagato in contanti.

In ogni caso, il reddito che hai guadagnato è tassabile e va nella tax return che esista o no un documento per quel lavoro. La nostra guida su come [presentare la tax return con reddito in contanti](/blog/cash-in-hand-tax-return) spiega come ricostruire un periodo per cui non è stato dichiarato niente.

## Cosa fai se le cifre sono sbagliate?

Gli errori nell'income statement li corregge il datore di lavoro, non si sistema la tax return per farla coincidere con le tue payslip. I più comuni sono un totale lordo che non torna, una trattenuta che riflette uno stato di residenza sbagliato e periodi di paga duplicati dopo il cambio del sistema paghe.

Quando il datore di lavoro risponde, la correzione di solito arriva nel giro di un ciclo di paga o due. Quando non risponde, la tax return si può presentare su una stima ben documentata e poi correggere appena il reporting è sistemato, entro la finestra di due anni. Quello che non funziona è usare di nascosto una cifra che l'ATO non ha: è proprio questa discrepanza che manda una tax return in revisione manuale.

## Cosa decide quanto è completa la tua tax return?

Se tutti i datori di lavoro dell'anno sono stati individuati, e nient'altro conta quanto questo. Un anno di working holiday arriva spesso a tre, quattro o cinque datori di lavoro in due stati e spesso in due anni fiscali, e quello dimenticato è quasi sempre quello breve: tre settimane di packing a febbraio, due settimane di lavoro promozionale, un turno tramite agenzia.

Presentare senza considerarli tutti è l'errore più comune di chi fa la dichiarazione da solo, e può andare in tutte e due le direzioni. Un datore di lavoro dimenticato con una forte trattenuta è un rimborso che non hai mai chiesto. Uno dimenticato con un reddito che non hai dichiarato è una correzione e degli interessi più avanti. Quando prepariamo una [tax return](/tax-return), l'elenco completo viene preso prima di tutto dai sistemi dell'ATO, perché la memoria è inaffidabile dopo un anno passato a spostarsi.

## Cosa devi conservare tu?

Conserva le payslip, gli estratti conto che mostrano l'arrivo degli stipendi e tutto quello che hai per iscritto sulla tua paga oraria. L'income statement ti dice cosa è stato dichiarato. Solo i tuoi documenti ti dicono se quello che è stato dichiarato è quello che ti spettava.

Conta soprattutto nel lavoro agricolo e nella ristorazione, dove la cifra dichiarata può essere perfettamente corretta come registro di una paga troppo bassa. La tax return viene preparata comunque sulle cifre dichiarate, ma la differenza va conosciuta, perché recuperarla tramite Fair Work è un procedimento a parte e gratuito.
`,
  },
  'what-is-the-ato': {
    title: "Cos'è l'ATO? Guida per backpacker",
    description: "L'ATO assegna il TFN, riceve i report dei datori di lavoro, paga il rimborso e sblocca la super. Quattro contatti con te, un solo numero.",
    body: `
L'Australian Taxation Office è l'ente federale che gestisce il sistema fiscale australiano. Per un working holiday maker fa quattro cose: assegna il TFN, riceve quello che datori di lavoro e fondi super comunicano su di te, elabora la tua tax return e paga il rimborso, e sblocca la super dopo che te ne sei andato.

## Cosa fa davvero l'ATO che ti riguarda?

Tutto passa dal tuo Tax File Number. L'ATO lo assegna e poi lo usa come filo che collega ogni report di stipendio, ogni contributo super, ogni pagamento di interessi bancari e ogni tax return che presenti.

Le sue competenze più ampie comprendono l'imposta sul reddito, la GST, il registro delle imprese e il sistema della superannuation guarantee. Quasi niente di questo tocca direttamente un backpacker.

## Come fa l'ATO a sapere quanto hai guadagnato?

Lo sa prima ancora che tu gli dica qualcosa. I datori di lavoro comunicano stipendi e tax withheld a ogni paga tramite la single touch payroll, i fondi super comunicano i contributi versati per te, le banche comunicano gli interessi sui conti australiani e i registri azionari comunicano i dividendi.

Per questo una tax return si può presentare da un altro paese senza una sola payslip. È anche il motivo per cui un datore di lavoro che non ha mai finalizzato il suo reporting crea un problema vero: il reddito esiste, tu lo sai, ma nei registri dell'ATO non risulta. Sono le tue payslip a colmare quel buco.

## Quando l'ATO ti contatta?

La maggior parte dei working holiday maker non sente mai niente. I motivi sono pochi: servono più informazioni per elaborare la tax return, le cifre non coincidono con quanto dichiarato, c'è un'imposta dovuta e non pagata, la verifica dell'identità sta bloccando un rimborso o, raramente, è stata aperta una revisione.

Il contatto legittimo arriva per posta all'indirizzo registrato, oppure tramite un tax agent che agisce per te. Per questo un indirizzo non aggiornato conta: una lettera che non hai mai visto è comunque una lettera che si considera ricevuta.

## Come distingui un contatto vero da una truffa?

Da cosa ti viene chiesto e con quale urgenza. L'ATO non telefona chiedendo un pagamento immediato, non accetta pagamenti in gift card o criptovalute, non minaccia arresto o espulsione e non ti chiede di restare in linea mentre vai in un negozio.

I working holiday maker sono presi di mira in modo specifico: sei nuovo nel paese, non sai cosa è normale, e la minaccia di un problema con il visto è credibile per te in un modo che non lo sarebbe per un australiano. Riattacca e verifica per conto tuo.

## Che ruolo ha l'ATO nel recupero della tua super?

Nella maggior parte dei casi fa da controllore, non da pagatore. Quando viene richiesto un Departing Australia Superannuation Payment, l'ATO verifica che il tuo visto sia cessato e che tu sia partito, poi la richiesta passa al tuo fondo super, che applica la ritenuta del 65% e sblocca il saldo.

L'eccezione è la super che l'ATO ha già in mano. Quando un fondo ha perso i contatti con te, il saldo viene trasferito all'ATO come unclaimed super e la paga direttamente l'ATO. Chi è partito da più di sei mesi senza aggiornare l'indirizzo ha buone probabilità di trovarsi in questa situazione. Entrambe le strade sono spiegate dove puoi [richiedere la tua super dopo aver lasciato l'Australia](/superannuation).

## Cosa decide se i contatti con l'ATO vanno lisci?

Quello che decide se questi quattro contatti di routine vanno lisci è lo stato dei dati che l'ATO ha su di te.

- Se l'indirizzo e le coordinate bancarie che l'ATO ha sono aggiornati.
- Se ogni datore di lavoro ha finalizzato il suo reporting.
- Se hai ancora accesso agli account online che hai creato, cosa che diventa un problema una volta all'estero.
- Se la tua super è in uno o più fondi oppure è già stata trasferita all'ATO come unclaimed.
- Se hai anni precedenti mai presentati, che nei registri dell'ATO risultano comunque.

La tua riconciliazione annuale con l'ATO è la tua [working holiday tax return](/tax-return), e puoi [stimare il tuo rimborso](/calculator) prima di presentare qualsiasi cosa.
`,
  },
  'gross-pay-vs-net-pay-australia': {
    title: "Gross vs net pay: dove vanno i soldi",
    description: "Il gross è prima delle tasse, il net è quello che arriva sul conto. Con il visto WHV in mezzo c'è circa il 15%, e la super si paga in più.",
    body: `
Il gross pay è quello che hai guadagnato prima delle tasse. Il net pay è quello che arriva sul tuo conto in banca. Con un visto working holiday e un TFN registrato, tra i due c'è circa il 15% del lordo. La superannuation non fa parte di questa differenza: si paga in aggiunta al tuo stipendio, in un fondo, e non viene sottratta da essa.

## Cosa significano davvero i numeri della tua payslip?

Una payslip australiana separa quattro cifre, e confonderne due è il modo in cui si arriva a pensare di essere stati pagati meno quando non è vero.

- **Gross pay**: il totale dei guadagni prima di qualsiasi trattenuta
- **Tax withheld**: il PAYG inviato all'ATO a tuo nome
- **Net pay**: il gross meno il tax withheld, l'importo che ti viene accreditato
- **Super**: una riga a parte, versata dal datore di lavoro nel tuo fondo

Su 1.000 $ di paga lorda presso un datore di lavoro registrato per i working holiday maker, 150 $ vengono trattenuti al 15%, 850 $ arrivano sul tuo conto e 120 $ di super al 12% vanno al tuo fondo. La super non compare mai negli 850 $ e non deve comparirci.

## Perché la super non è una trattenuta?

La superannuation è un costo del datore di lavoro che si aggiunge alla tua paga, non una fetta di essa. Si calcola sul tuo guadagno lordo ordinario al 12% e si versa in un fondo a tuo nome, e il tuo gross pay resta lo stesso, che il datore di lavoro la versi o no. È l'equivoco più frequente nella lettura di una payslip australiana.

Se una payslip mostra la super sottratta dal lordo per arrivare a un lordo più basso, non è una stranezza di presentazione. Significa un errore in payroll, oppure un datore di lavoro che tratta una paga come se includesse già la super, e questo cambia quanto ti spetta. La nostra guida sulla [super non pagata](/blog/super-employer-not-paying-what-to-do) spiega cosa fare.

## Quale cifra usa la tua tax return?

La tua tax return e il tuo income statement usano entrambi il gross pay, mai il net. L'ATO calcola l'imposta sul lordo, poi accredita quella già trattenuta, e la differenza, in un senso o nell'altro, è il tuo rimborso o l'importo da pagare. Il net pay non compare da nessuna parte nel calcolo.

Ci cade chi segue l'anno con l'app della banca. La cifra che arriva sul conto è circa l'85% del numero che userà l'ATO, quindi dal lato della banca l'anno sembra sempre più piccolo.

## Cosa decide quanto del tuo lordo ti resta davvero?

Tre fatti sul tuo anno decidono la differenza. L'aliquota di trattenuta è il fattore più grande: 15% con il TFN registrato presso un datore di lavoro registrato per i working holiday maker, 45% senza, e aliquote da non residente se il datore di lavoro non si è mai registrato. Ognuna produce un netto molto diverso sullo stesso lordo.

- **Se il tuo TFN era registrato dal primo giorno.** Le settimane al 45% prima che il modulo di dichiarazione venisse elaborato si vedono come un netto molto più magro, e l'eccedenza si può recuperare con la tax return, non nella busta paga.
- **Se il datore di lavoro è registrato presso l'ATO per assumere working holiday maker.** Uno non registrato trattiene con le aliquote da non residente, più alte del 15% dal primo dollaro.
- **Se maggiorazioni, casual loading e indennità sono state pagate.** Una tariffa casual che omette in silenzio la maggiorazione del 25% abbassa il lordo prima ancora che entri in gioco la trattenuta, e quella perdita non torna con un rimborso.

## Come verifichi che il lordo sia giusto?

Ricostruire il lordo da zero richiede circa cinque minuti, e vale la pena farlo una volta per ogni datore di lavoro finché ricordi ancora i turni.

1. Ore ordinarie moltiplicate per la tua paga oraria
2. Più le maggiorazioni per turni nel weekend, serali e nei giorni festivi
3. Più le indennità, come divisa, attrezzi o trasporto
4. Più gli straordinari alla tariffa corretta
5. Confronta il totale con la riga del gross sulla payslip

Quando i numeri non tornano, di solito la causa è un inquadramento di un livello troppo basso nell'award, non un furto voluto. Segnalalo per iscritto all'ufficio paghe, perché è la versione che i datori di lavoro sistemano in fretta.

## Quando smette di essere una questione di payslip?

Smette di esserlo nel momento in cui la differenza tra lordo e netto dipende dalla tua posizione fiscale e non dall'aritmetica. Una trattenuta in eccesso al 45%, un datore di lavoro non registrato, una Medicare levy addebitata a chi non ha diritto a Medicare e una valutazione sbagliata sulla residenza possono ridurre il netto durante l'anno, e si recuperano, oppure no, a seconda del caso, con la tax return.

La payslip mostra quanto è stato prelevato e non dice niente su se andava prelevato. Capire quale di queste situazioni riguarda il tuo anno è il compito di una [tax return](/tax-return), ed è il motivo per cui due backpacker con lo stesso lordo possono finire a migliaia di dollari di distanza.
`,
  },
  'do-working-holiday-makers-pay-tax-on-tips': {
    title: "Le mance sono tassabili in Australia? Sì",
    description: "Mance in contanti e con carta contano come reddito imponibile. Come passano dalle payslip, cosa si aspetta l'ATO che tu dichiari e quali registri bastano.",
    body: `
Sì. Le mance sono reddito imponibile in Australia in qualsiasi forma arrivino, e sono tassate con l'aliquota del working holiday maker, il 15% sui primi 45.000 $ AUD, insieme al tuo stipendio. Cambia chi dichiara i soldi, e dipende da come la mancia è arrivata a te.

## Quali mance sono già dichiarate per te?

Tutto quello che passa dalla cassa del locale. Le mance con carta, i service charge aggiunti al conto e le mance messe in comune e distribuite con un sistema tronc passano dalla payroll: il PAYG viene trattenuto al momento e gli importi compaiono nel tuo income statement di fine anno insieme al resto dello stipendio.

Su quella parte la dichiarazione e le tasse sono già a posto. Guarda una payslip: un locale che dice di distribuire le mance e non mostra niente su nessuna busta paga merita una domanda.

## Quali mance devi dichiarare tu?

I contanti che ti passano direttamente. Nessuno li registra, non viene trattenuto nessun PAYG e non compaiono nel tuo income statement. L'obbligo di dichiararli a fine anno fiscale è tuo.

L'importo decide quanto conta. Un bar tranquillo di periferia genera quasi niente in mance contanti e la questione è accademica. Un bar affollato del centro il venerdì e il sabato sera può generare una somma significativa nell'arco di una stagione, e lì diventa denaro vero nella [tax return](/tax-return).

- Mance in contanti dai clienti: è una tua responsabilità, nessuna imposta trattenuta al momento
- Mance divise in contanti a fine turno: stesso trattamento, vanno comunque dichiarate
- Mance con carta e tronc: dichiarate tramite la payroll, non c'è altro da fare

## Che registri ti servono davvero?

Un totale progressivo. L'ATO non si aspetta che tu annoti ogni singola mancia. Una cifra settimanale scritta da qualche parte di durevole, con la data e il locale, soddisfa l'obbligo di tenuta dei registri.

L'alternativa è tirare a indovinare a ottobre su una stagione finita a marzo. Chi non dichiara niente raramente è disonesto: non ha idea di quale fosse la cifra e zero sembra la scelta più sicura. Una nota sul telefono risolve il problema.

## Cosa succede se non dichiari le mance in contanti?

Non arriva una lettera di controllo la settimana dopo la presentazione. La ristorazione è un settore in cui i dati vengono incrociati, e il reddito non dichiarato emerge più tardi attraverso i report dei singoli locali e i movimenti dei depositi bancari.

Quando emerge, la conseguenza è l'imposta che avresti dovuto pagare più una sanzione per l'importo mancante e gli interessi, applicati all'anno in questione. L'imposta al 15% su una stagione di mance dichiarate è più piccola di quanto la maggior parte delle persone pensi. Per chi pensa a un secondo o terzo anno, una posizione irrisolta con l'ATO è un nodo in sospeso in ogni futuro rapporto con i sistemi del governo australiano.

## La super si paga sulle mance?

A volte, e dipende dalla stessa distinzione. Le mance distribuite tramite la payroll del datore di lavoro possono far parte dei guadagni in ordinary time, e in quel caso su di esse è dovuto il 12% di [super](/superannuation). I contanti consegnati da un cliente non li paga il datore di lavoro, quindi non c'è nessun obbligo di super.

Dove ricade il tuo caso dipende dall'award e da come il locale ha classificato i pagamenti, cosa che una payslip non ti dice. Il controllo utile è verificare se i tuoi contributi super sono coerenti con i guadagni totali, comprese le distribuzioni del tronc, perché una differenza lì è lo stesso discorso di qualsiasi altro caso di [super non pagata](/blog/super-employer-not-paying-what-to-do).
`,
  },
  'tax-obligations-after-leaving-australia': {
    title: "Tasse dopo aver lasciato l'Australia: cosa resta",
    description: "Lasciare l'Australia non chiude la tua posizione fiscale. Tax return finale, richiesta della super e cancellazione dell'ABN si fanno a distanza.",
    body: `
Una carta d'imbarco non è un evento fiscale. Tutto quello che hai accumulato lavorando in Australia resta all'ATO dopo la tua partenza: una tax return per ogni anno fiscale in cui hai avuto reddito, un saldo di super che nessuno richiede al posto tuo, un ABN che resta registrato finché non lo cancelli. Niente di tutto questo richiede che tu sia nel paese, e niente scade perché te ne sei andato.

## Cosa resta da fare dopo la partenza?

Quattro cose, indipendenti tra loro, quindi farne una non chiude le altre. Va presentata la [tax return finale](/it/dichiarazione-redditi-australia), richiesta la [super](/superannuation), cancellato l'eventuale [ABN](/abn), e l'ATO deve avere dei recapiti che ti raggiungono ancora.

- Presenta una tax return per ogni anno fiscale australiano in cui hai avuto reddito
- Richiedi la super con il Departing Australia Superannuation Payment
- Cancella l'ABN che hai registrato come sole trader
- Tieni un indirizzo email e un conto in banca che funzionano ancora

L'ATO ha i tuoi dati di reddito di ogni datore di lavoro a prescindere da dove ti trovi, quindi un anno non presentato non passa inosservato. Resta aperto.

## Come funziona presentare la tax return dall'estero?

La stessa tax return, preparata allo stesso modo, da un altro codice postale. Gli income statement arrivano dai sistemi dell'ATO e non dai tuoi ex datori di lavoro, e conta, perché rincorrere da Berlino un packing shed del Queensland per avere dei documenti non è un piano realistico.

La scadenza standard è il 31 ottobre successivo alla fine dell'anno fiscale. Le tax return presentate tramite un agente registrato hanno in genere una scadenza prorogata fino a maggio dell'anno dopo, se eri già tra i clienti dell'agente prima del 31 ottobre. Per il 2025-26 il 31 ottobre 2026 è passato, ma una dichiarazione in ritardo si può ancora presentare. La nostra guida su come [presentare la tax return dall'estero](/blog/how-to-lodge-tax-return-from-overseas) spiega la procedura.

## Quando puoi richiedere la super?

La richiesta della DASP si apre quando sono vere entrambe le condizioni: il tuo visto ha cessato di essere valido e hai lasciato l'Australia. Non una o l'altra. Se parti mentre il visto è ancora valido, devi aspettare che scada o venga cancellato prima che la richiesta possa andare avanti.

Il pagamento viene trattenuto al 65% per i contributi dei working holiday maker, quindi un saldo di 10.000 $ ne paga circa 3.500. L'ATO dice che il pagamento arriva in genere entro 28 giorni dalla ricezione di una domanda completa, e l'importo netto può essere pagato su un conto australiano o estero a seconda del fondo. La nostra [guida al superannuation](/superannuation) spiega la procedura e i documenti.

## Cosa succede se lasci la super lì?

Passati almeno sei mesi da quando hai lasciato l'Australia e il visto è cessato, il fondo trasferisce il saldo che non hai richiesto all'ATO come unclaimed super. I soldi restano tuoi, ma la richiesta diventa una richiesta all'ATO invece che al fondo, con una documentazione diversa.

Quello che fa davvero perdere soldi alle persone è avere più fondi e richiedere solo quello che ricordano. Quattro datori di lavoro in un anno spesso significano più di un fondo, ognuno con un saldo separato che richiede una richiesta separata. La nostra guida su come [ritrovare la super persa](/blog/how-to-find-lost-superannuation) spiega come rintracciarli.

## Puoi presentare prima del 30 giugno se te ne vai per sempre?

Sì, e quasi nessuno lo sa. Chi lascia l'Australia in modo definitivo a metà anno fiscale può presentare una tax return anticipata per quella parte d'anno invece di aspettare luglio. Condizioni, le due strade per presentarla e la scadenza del 15 giugno per i tax agent sono nella guida alla [tax return anticipata prima di lasciare l'Australia](/blog/early-tax-return-leaving-australia).

Non è automaticamente la scelta migliore. Una tax return anticipata viene preparata quando i dati precompilati in genere non sono ancora disponibili, e l'ATO avverte che le payslip non bastano, perché possono non mostrare i pagamenti finali: se il datore di lavoro usa la Single Touch Payroll, il riferimento è l'income statement in myGov. Se torni in Australia più avanti nello stesso anno, va corretta. Si adatta a una partenza pulita con documenti completi.

## Cosa decide se sarà semplice o complicato?

Tre fatti su come hai lasciato il Paese. Se il tuo conto australiano è ancora aperto, perché sia il rimborso sia il pagamento DASP arrivano su un conto e riaprirne uno dall'estero è davvero difficile. Se conosci tutti i datori di lavoro dell'anno, dato che un lavoro dimenticato è la causa solita di una correzione mesi dopo. E se il visto è effettivamente scaduto, cosa che sblocca la richiesta della super.

Il conto è la parte che fa il danno vero. Molti chiudono tutto la settimana prima di partire, e un rimborso semplice diventa una pratica di mesi per ristabilire i dati di pagamento da un altro continente. Tienilo aperto per tre o quattro mesi dopo la partenza, finché rimborso e super non sono arrivati entrambi.

## Cambia qualcosa se non presenti la tax return?

Conta più avanti che adesso. Un anno non presentato resta in archivio a tempo indeterminato e, dove spettava un rimborso, semplicemente non viene pagato: è l'esito più comune e il più silenzioso.

Dove invece c'era imposta da pagare, maturano interessi e il debito segue la posizione fiscale e non la persona, ricomparendo quando c'è un motivo per guardare, compresa una futura domanda di visto australiano. La nostra guida sulle [tax return in ritardo e le sanzioni](/blog/late-tax-return-penalty-working-holiday) spiega dove le sanzioni pesano davvero, che raramente è dove la gente teme. [Contattaci](/contact) se hai lasciato l'Australia con un anno in sospeso.
`,
  },
  'tax-residency-working-holiday-makers': {
    title: "Sei residente fiscale in Australia?",
    description: "La residenza può cambiare le aliquote di tutto il tuo anno. Non si risolve con una checklist ed è facile sbagliare in entrambe le direzioni.",
    body: `
Dipende dai fatti del tuo anno: un visto 417 o 462 da solo non decide se sei residente fiscale in Australia, e la risposta si valuta caso per caso. La residenza fiscale è la domanda con la portata più ampia in una tax return da working holiday. Può cambiare le aliquote applicate a tutto il tuo anno, ed è la voce a cui si risponde più spesso in modo sbagliato da persone sicure della propria risposta.

Da che parte della linea ti trovi non si può stabilire da questa pagina, da un calcolatore o dall'esperienza di un amico. È una valutazione sul tuo anno, e ogni tax return preparata qui viene rivista e approvata da un agente fiscale registrato prima di essere presentata all'ATO.

## Cosa cambia la residenza fiscale?

Più di quanto la maggior parte delle persone si aspetti. Può cambiare le aliquote applicate al tuo stipendio, le deduzioni a cui hai accesso, il modo in cui vengono trattati i redditi da investimenti e i redditi esteri, e l'entità del risultato finale. Per alcuni la differenza è rilevante. Per altri cambia poco o niente. Da fuori nessuno può dire quale caso sia il tuo.

## Perché non puoi stabilirlo per conto tuo?

Perché non è una domanda con una sola risposta. Mette insieme molti elementi della tua situazione, compresi aspetti a cui la maggior parte delle persone non pensa mai di guardare, e nessun fatto singolo e nessuna regola pratica lo risolve. Due viaggiatori con anni quasi identici possono essere valutati correttamente in modo diverso.

## Lo decide il tuo visto?

No, il visto da solo non basta. Avere un visto 417 o 462 dice molto poco su come verrà valutato il tuo anno, e rispondere d'istinto alla domanda sulla residenza in un modulo è il modo in cui le tax return finiscono sbagliate, in entrambe le direzioni.

## Cosa succede se la risposta è sbagliata?

O rivendichi una posizione che non puoi sostenere, e questo può portare più avanti a un assessment rettificato, oppure paghi in silenzio più del dovuto perché una posizione migliore non è mai stata considerata. Entrambi i casi sono comuni, ed entrambi sono evitabili.

## Chi dovrebbe controllarlo per te?

Un agente fiscale registrato che esamina il tuo anno per intero prima che venga presentata qualsiasi cosa. È così che la residenza viene gestita in ogni [working holiday tax return](/tax-return) preparata qui. [Contattaci](/contact) e la vediamo insieme a te.
`,
  },
  'how-to-update-address-with-ato': {
    title: "Perché il tuo indirizzo ATO conta",
    description: "Un indirizzo vecchio ritarda la lettera del TFN, gli avvisi della super e le lettere dell'ATO. Ecco cosa va storto e quale indirizzo dare.",
    body: `
L'indirizzo che l'ATO ha per te decide dove vanno la lettera del TFN, gli avvisi di assessment e la corrispondenza sulla super. La posta già in viaggio segue il vecchio indirizzo, quindi un cambio serve solo per ciò che viene spedito dopo. Se prepariamo noi la tua [tax return](/tax-return), controlliamo anche che l'indirizzo che l'ATO ha per te sia quello giusto prima che la dichiarazione venga presentata.

## Come si aggiorna l'indirizzo con l'ATO?

Dai servizi online dell'ATO collegati a myGov, nella sezione dei tuoi dati personali, oppure per telefono al 13 28 61 (dall'estero +61 2 6216 1111) dopo la verifica dell'identità. Puoi indicare separatamente un indirizzo postale e uno di residenza, anche estero.

## Perché l'ATO ha un indirizzo se i rimborsi vanno su un conto in banca?

Perché diverse cose che decidono se vieni pagato viaggiano ancora per posta. La lettera del TFN viene spedita solo per posta. La corrispondenza per la verifica dell'identità viene spedita per posta. Gli avvisi di assessment, le lettere di modifica e qualsiasi richiesta di informazioni vanno all'indirizzo registrato, e una lettera che non hai mai visto è comunque una lettera che si considera ricevuta.

I rimborsi in sé vengono pagati per via elettronica su un conto bancario australiano quasi sempre, quindi un indirizzo vecchio di solito non blocca i soldi. Blocca tutto quello che deve succedere prima dei soldi.

## Cosa va storto davvero con un indirizzo vecchio?

Il guasto più costoso è la lettera del [TFN](/tfn), perché una lettera restituita fa ripartire l'attesa di 28 giorni mentre magari lavori al 45% invece che al 15%.

Il secondo è il superannuation. Il tuo fondo e l'ATO hanno entrambi un indirizzo per te, e un fondo che non riesce a raggiungerti alla fine segnala il conto come non reclamato e lo trasferisce all'ATO. Quei soldi sono ancora tuoi e ancora richiedibili, ma ora sono un passaggio più lontani da te, nel momento esatto in cui stai lasciando il paese.

Il terzo è quello silenzioso. Una lettera dell'ATO che pone una domanda sulla tua tax return, rimasta senza risposta perché è andata a un ostello di Byron che hai lasciato a marzo, diventa un assessment fatto senza il tuo contributo.

## Quale indirizzo dai se ti sposti ogni poche settimane?

Un posto che tra quattro settimane terrà ancora la tua posta, che raramente è dove dormi stanotte. Raccolti e ristorazione spostano le persone più in fretta di quanto la posta sposti le lettere.

- L'indirizzo australiano stabile di un amico o di un parente è la risposta migliore, anche se non ci vai mai.
- Un ostello per soggiorni lunghi funziona se tiene davvero la posta degli ospiti partiti, cosa che molti non fanno.
- Una casella postale è accettata ed è l'opzione più affidabile per chi passa una stagione a spostarsi tra una farm e l'altra.
- Un ostello che lasci venerdì è la risposta peggiore, ed è quella che la maggior parte delle persone dà.

L'ATO registra separatamente un indirizzo postale e un indirizzo di residenza. Se usi un indirizzo che custodisce la posta, imposta quello come indirizzo postale e lascia l'indirizzo di residenza dove vivi davvero, perché la lettera del TFN segue l'indirizzo postale.

## L'indirizzo conta anche dopo aver lasciato l'Australia?

Sì, ed è il punto in cui la maggior parte delle persone smette di pensarci. All'ATO si può registrare un indirizzo estero, e andrebbe fatto, perché la corrispondenza dopo la partenza è esattamente quella che non puoi permetterti di perdere: un rimborso sotto revisione, un Departing Australia Superannuation Payment, una richiesta di confermare la tua identità.

Le coordinate bancarie contano altrettanto. Un rimborso diretto a un conto australiano che hai chiuso mentre andavi in aeroporto non sparisce, ma torna indietro e diventa un credito fermo sul tuo conto ATO finché qualcuno non dice all'ATO dove mandarlo.

## Per te è una formalità o è urgente?

Aggiornare l'indirizzo è lo stesso compito per tutti, ma l'urgenza no.

- Se stai ancora aspettando la lettera del TFN. Se sì, è urgente ed è l'unica cosa di questa pagina con un costo settimanale.
- Se hai del superannuation in un fondo con un vecchio indirizzo. I conti irraggiungibili finiscono trasferiti all'ATO come unclaimed super.
- Se stai per lasciare l'Australia. Sia l'indirizzo sia il conto in banca devono essere giusti prima del volo, non dopo.
- Se hai più di un fondo super per più di un datore di lavoro. Ogni fondo ha il proprio indirizzo, e aggiornare l'ATO non aggiorna i fondi.

Se parti con della super ancora in Australia, l'indirizzo è uno dei dettagli che decidono quanto sarà semplice [richiedere la tua super dopo aver lasciato l'Australia](/superannuation), e puoi [stimare il tuo rimborso](/calculator) prima di presentare qualsiasi cosa.
`,
  },
}
