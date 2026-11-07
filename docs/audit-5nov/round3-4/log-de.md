# Native review log: de (German, du)

Edits: 34 (30 in blog/data.ts, 2 in blog/category/[slug]/page.tsx, 1 in page.tsx, 3 in tax-return/page.tsx incl. meta).
tsc --noEmit: pass. jest (compliance 6 languages + new-locales sitemap): 27/27 pass. Nothing committed.

## 10 most important before/after

1. tax-return meta description (iron rule: implied the business lodges)
   - Before: "Wir holen deine ATO-Daten, bereiten alles vor und reichen ein."
   - After: "Wir bereiten alles aus deinen ATO-Daten vor, ein registrierter Tax Agent gibt frei."
2. Gender of "Declaration" (feminine is dominant on the site; today's text used das/des)
   - Before: "Das Tax File Number Declaration hält einen laufenden Antrag fest und hält dich durch ein Fenster von 28 Tagen auf dem Working-Holiday-Satz von 15 %."
   - After: "Die Tax File Number Declaration vermerkt einen laufenden Antrag, und damit bleibst du für ein Fenster von 28 Tagen beim Working-Holiday-Maker-Satz von 15 %."
3. Same, plus calque "hält dich ... beim Satz" ("keeps you at")
   - Before: "Das 28-Tage-Fenster des Declarations ist die Abmilderung. Auf dem Tax File Number Declaration festhalten zu lassen, dass der Antrag läuft, hält dich durch dieses Fenster ..."
   - After: "Abfedern lässt sich das mit dem 28-Tage-Fenster der Declaration. Vermerkst du auf der Tax File Number Declaration, dass der Antrag läuft, bleibst du in diesem Fenster ..."
4. "Erklärung" was ambiguous (TFN declaration vs. tax return)
   - Before: "Ist auf der Erklärung vermerkt, dass der Antrag läuft ..." / "Die Erklärung hält es fest, und dieser Vermerk trägt den Working-Holiday-Satz von 15 % durch das 28-Tage-Fenster."
   - After: "Ist auf der Tax File Number Declaration vermerkt ..." / "Das Formular hält es fest, und mit diesem Vermerk gilt im 28-Tage-Fenster weiter der Working-Holiday-Maker-Satz von 15 %."
5. Repeated bridge sentence (pasted 4x in super/complaint guides): "Vor der Abreise gehören zwei Dinge zusammen: der DASP-Antrag für deine Super und die letzte [Steuererklärung als Working Holiday Maker] für dein Einkommen." Replaced with 4 distinct wordings, same link target /de/tax-return.
6. Repeated bridge (5x in wage/leave/farm/Fair-Work/underpayment guides): "... du kannst aus deinen Jahreszahlen deine [Steuererstattung schätzen]. Was dein Arbeitgeber über das Jahr einbehalten hat, auch Nachzahlungen und Phasen mit 45 %, wird in der [Steuererklärung als Working Holiday Maker] abgeglichen." Each rewritten differently (anchor texts varied: Steuerrechner, Rechner, Steuererklärung für dein Working-Holiday-Jahr ...); targets kept.
7. Repeated "Was mit 45 % einbehalten wurde, wird in der [Steuererklärung] mit der tatsächlichen Steuer verrechnet." (3x, once out of context in the ABN-vs-TFN guide) varied and fitted to each paragraph.
8. Calque "Gehaltsliste" (payroll)
   - Before: "alles, was über eine Gehaltsliste läuft" -> After: "alles, was über die Lohnabrechnung läuft"
9. Minimum wage guide
   - Before: "diese Zahl ist also eine Untergrenze und kein Satz." -> After: "... eine Untergrenze und nicht unbedingt dein Stundensatz."
10. Homepage FAQ anglicism
   - Before: "In 2025/26 und 2026/27 sind die Sätze gleich." -> After: "Für 2025/26 und 2026/27 gelten dieselben Sätze."

Smaller: "Sie zahlt dem Ersteller mehr" -> "Sie bringt dem Anbieter mehr"; "behandle den Brief als hochwertiges Dokument" -> "bewahre den Brief wie ein wichtiges Dokument auf"; "kann auch nicht als eine verwendet werden" -> "als solche"; "Wirkt er falsch" -> "Wirkt der Einbehalt falsch"; "in Frage" -> "infrage" (site spelling); comma splice in Super category intro split; "Rückerstattung" -> "Erstattung" (site term); "setzen an, was dazugehört" -> "was absetzbar ist"; double "für" in Medicare FAQ; "prüfen wir für Kunden im Rahmen deiner" -> "prüfen wir im Rahmen deiner".

## Facts that looked wrong (not changed)

- Reply times inconsistent: homepage FAQ says outside hours "am nächsten Morgen", contact page says "am nächsten Geschäftstag" (hours are Mon-Fri, so Friday evening -> next morning is Saturday).
- tfn guide (rejection): "Eine Ablehnung startet diese Uhr neu" (28-day window restarting after a rejected application) is not something I can confirm; worth a fact check.
- tax-return REFUND_SOURCES: foreign-resident rate "beginnt bei 30 Cent pro Dollar" vs. guides "derzeit 30 %": consistent, just flagging that 2026/27 foreign resident first-bracket rate should be verified.
- Medicare category intro: "Viele Inhaber von 417- und 462-Visa, etwa aus Deutschland oder Österreich, haben keinen Anspruch" fine; RHCA country list order differs between pages but content matches (11 countries).

## For the lead

- Pre-existing (owner) text further down blog/data.ts still uses "das Declaration" in two unchanged lines (around "auf das Declaration beim Arbeitgeber" and "aktualisiere das Declaration"); left untouched as out of scope.
- The bullet "Ob ... registriert ist, denn bei einem nicht registrierten kann auch ... zu Foreign-Resident-Sätzen (derzeit 30 %) einbehalten werden" recurs in ~8 TFN guides as part of "what decides your cost" lists; it is content, not a link bridge, so I left it, but it reads repetitive across the cluster.
- tax-return meta description is now ~176 characters (was ~178 before); may truncate in SERPs either way.
