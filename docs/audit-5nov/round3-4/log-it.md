# Revisione nativa IT (tu), solo testo aggiunto oggi

Modifiche: 48 sostituzioni in 21 file sotto src/app/(it)/. tsc pulito, i 2 test jest passano (27/27). Nessun trattino lungo o medio. Frasi approvate (approvazione dell'agente fiscale registrato, garanzia, forbice dei rimborsi) intatte. Titoli invariati; toccate 2 meta description solo per il genere.

## 10 esempi principali (prima -> dopo)
1. about: "presentata da una camera a Bari o a Torino ... per noi è un martedì qualunque" -> "fatta dalla propria cameretta a Bari o a Torino ... per noi è ordinaria amministrazione" (calco dall'inglese).
2. Frase su myGov ripetuta in 6 pagine ("Non dovrai mai entrare in myGov, collegare un documento/ID ... quale modulo sia quale. Alla pratica pensiamo noi.") -> 6 varianti diverse; "collegare un ID" -> "verificare un documento d'identità" (abn, tfn, expenses, contact, calculator, superannuation).
3. Frase ponte "si riconcilia nella tax return ... a partire dai dati/dalle cifre dell'anno finora" (calco di year-to-date) in 12 guide -> riscritta e variata ("si conguaglia", "torna nei conti della", "con i dati da inizio anno", "il calcolatore ti dà una stima..."); link invariati.
4. "Prima di chiedere la DASP conviene chiudere la tax return dell'ultimo anno: si basano sugli stessi..." (3 guide) -> 3 formulazioni diverse, con il maschile "il DASP" prevalente nel sito.
5. "Gli arretrati recuperati sono reddito dell'anno in cui li ricevi e finiscono nella tua tax return, insieme alle imposte trattenute su di essi." (4 volte, chunk 11 e 14) -> 4 varianti.
6. 03: "i guadagni di un anno parziale sono trattenuti in eccesso" (x2) -> "sui guadagni di un anno parziale si tende a trattenere troppo" / "la ritenuta è sistematicamente troppo alta"; sistemata anche la doppia incidentale "e le deduzioni, e se ne hai diritto l'esenzione..., vengono applicate".
7. 04 description: "Il 12% del tuo ordinary time earnings" -> "delle tue ordinary time earnings" (genere, come nel resto del sito); 08 description: "Il tax-free threshold" -> "La tax-free threshold" (femminile prevalente).
8. tfn / tax-return: "le prime buste paga non vengano trattenute al 45%", "ogni busta paga ... è stata trattenuta in eccesso" -> "sulle prime buste paga non venga trattenuto il 45%", "su ogni busta paga ... è stato trattenuto troppo" (si trattiene l'imposta, non la busta paga). Stessa cosa in 04: "i saldi ... vengono trattenuti al 65%" -> "sui saldi ... si applica una ritenuta del 65%".
9. "anno finanziario" -> "anno fiscale" (16, 17; termine dominante); "a ogni payday" -> "a ogni giorno di paga"; "non ha diritto al Medicare" -> "a Medicare"; "la nostra squadra" -> "il nostro team".
10. Calchi vari: "presto e non tardi" -> "il prima possibile"; "È uno schema no fault" -> "È un sistema no fault, cioè senza colpa"; "una richiesta a parte che puoi stimare da sola" -> "una pratica a parte, con un rimborso che puoi stimare separatamente"; "lo rende un bersaglio" -> "la rende" (riferito a "richiesta"); "Se hai fatto l'iscrizione e quando" -> "Se e quando ti sei iscritto a Medicare".

## Fatti dubbi (NON modificati)
- 03 (anno fiscale e due tax return): dice che i guadagni di un anno parziale sono "sistematicamente" trattenuti in eccesso. Per un WHM con aliquota piatta al 15% dal primo dollaro, l'effetto dell'anno parziale di solito non c'è (vale per chi ha la soglia esente da residente). Da verificare.
- 15: penalty unit a 364 $ dal 1° luglio 2026 (prima 330 $), massimo 1.820 $: da confermare con l'indicizzazione ufficiale.
- 03 / 16 / 17: deduzione standard da 1.000 $ "dal 2026-27": verificare che sia legge approvata e i requisiti (16 dice che secondo l'ATO è per i residenti fiscali).
- 08: tax return cartacea "otto settimane o più": l'ATO indica fino a 50 giorni lavorativi (circa 10 settimane).
- medicare/page.tsx: esempi "circa 800 $ su 40.000 $ e 1.000 $ su 50.000 $" sono solo aritmetica sul 2%, non una promessa; lasciati.

## Per il lead
- DASP ha entrambi i generi nel sito (il DASP 19, la DASP 12 già presenti nella versione originale): non ho uniformato il testo vecchio, solo quello di oggi dove l'ho riscritto (maschile).
- "riconcilia" e "anno finanziario" erano già diffusi nel testo originale; ho corretto solo le righe di oggi.
- Accanto a "agente fiscale registrato" convivono "tax agent" e "agente registrato" (FAQ, KEY_FIGURES): li ho lasciati, nessuno lascia intendere che siamo noi l'agente.
