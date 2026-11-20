# Pilota italiana (pilot-it)

Cinque messaggi realistici di clienti, con la risposta di Will secondo docs/engineering/language-rules/it.md. Ogni risposta ha un controllo in una riga. Le frasi con REVISIONE LEGALE sono segnalate.

## 1. Domanda semplice

Cliente: "Ciao, ho fatto il working holiday e ho lavorato in una fattoria. Mi serve la dichiarazione dei redditi?"

Will:
"Ciao! Ti aiutiamo a preparare e presentare la tua dichiarazione dei redditi per il working holiday. Questo lo controlliamo nella revisione del tuo caso, che parte dopo il pagamento.

Hai lavorato solo con un TFN, oppure anche con un ABN?"

Controllo: una domanda sola, nessuna valutazione fiscale, "tu", nessuna emoji.

## 2. Domanda sul prezzo

Cliente: "Quanto costa? Ho lavorato solo con il TFN."

Will:
"La tariffa per la dichiarazione con solo TFN è $220.

Copre la verifica della tua residenza fiscale, Medicare e deduzioni, poi prepariamo e presentiamo la tua dichiarazione dei redditi, così non ti sfugge nulla a cui hai diritto.

Vuoi che ti mandi i dati per il pagamento?"

Controllo: cifra presente nella sezione 5, nessuna emoji, nessuna garanzia (arriva solo con le coordinate bancarie), una domanda.

## 3. Pagamento dichiarato

Cliente: "Ho pagato ieri con bonifico ma non ho ancora nessuna conferma. Quando mi risponde qualcuno?"

Will:
"Grazie per avermelo detto. Da questa chat non posso verificare il bonifico, quindi l'ho passato al team. Ti rispondono qui, di solito entro un giorno lavorativo.

Se hai la ricevuta del bonifico, mandamela qui, così il team la trova subito."

Controllo: nessun "pagamento ricevuto", nessun rimborso, tempo solo quello approvato, nessuna emoji, nessuna domanda.

## 4. Reclamo

Cliente: "Sono due settimane che aspetto una risposta. Così non va bene, mi avete fatto perdere tempo."

Will:
"Mi dispiace per l'attesa, hai ragione a scrivere. L'ho passato al team, che ti risponde qui.

Ti va di dirmi in una riga qual è la cosa più urgente per te?"

Controllo: nessuna emoji, nessun tempo (regola della sezione 4 e riga 10 della sezione 1), nessuna scusa, una domanda.

## 5. Domanda sì o no

Cliente: "Siete un agente fiscale registrato? Rispondete sì o no."

Will:
"Operiamo sotto la supervisione di un agente fiscale registrato. Trovi i dettagli qui: https://workingholidaytax.com.au/client-agreement"

Controllo: la risposta non si apre con "Sì" o "No" (sezione 4), nessuna frase "siamo registrati", resa in REVISIONE LEGALE, il link viene dal testo approvato in inglese.

## Lacune trovate e correzioni

| Lacuna | Dove | Correzione in it.md |
|---|---|---|
| Al reclamo serviva il passaggio al team senza un tempo. La frase approvata ne ha uno. | Risposta 4 | Sezione 1, riga 10: in un reclamo, solo "ti risponde qui". |
| Rischio di mettere la garanzia nella risposta al prezzo. | Risposta 2 | Sezione 5 e controllo 5: garanzia solo con le coordinate TFN. |
| Rischio di aprire con "Sì" a una domanda sull'agente. | Risposta 5 | Sezione 4 e controllo 6. |
| Il codice usa "questionario" dove la regola dice "modulo". | Non emerso dai cinque casi, trovato nel codice | Sezione 1, riga 9, e sezione 13 (da correggere nel codice). |

Lacuna aperta, da chiudere con Jo: manca un messaggio italiano approvato per i prezzi. Le risposte 2 e 3 usano la resa della sezione 5, ancora da approvare.
