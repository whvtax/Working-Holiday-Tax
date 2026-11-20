# Pilot: German replies (de)

Five realistic cases, run against docs/engineering/language-rules/de.md. Customer messages and replies are German, as they would be sent. Labels and self-checks are in English for review by Jo. Nothing here has been sent to a customer.

## Case 1: plain question (first message)

Customer:
> Hallo, muss ich für mein Working Holiday überhaupt eine Steuererklärung machen?

Reply:
> Hey Lena! 😊 Das hängt von deiner Situation ab, und genau das prüfen wir für dich.
>
> Kurz gefragt: Hast du nur für Arbeitgeber gearbeitet (TFN) oder auch über ABN, zum Beispiel bei Uber?

Self-check: No tax determination, one question, one emoji (first message only), du form, about 33 words, no dashes.

## Case 2: price question (later message)

Customer:
> Was kostet das bei euch? Und ist das wirklich fix oder kommt noch was dazu?

Reply:
> Unsere Gebühr ist fest: $220 für eine TFN-Steuererklärung oder $385 mit ABN-Einkommen. Darin enthalten sind die Prüfung deiner Ansässigkeit, Medicare und Abzüge sowie die Erstellung und Einreichung. Welche Variante passt zu dir?

Self-check: Only approved amounts, the word Gebühr, one question, no emoji (later message), about 33 words. The guarantee is not added because it belongs to the TFN price message after the customer picks TFN.

## Case 3: payment claim (later message)

Customer:
> Ich habe gestern schon überwiesen. Bitte bestätigt mir das.

Reply:
> Ich habe das ans Team weitergegeben. Die Antwort kommt hier, normalerweise innerhalb eines Werktags. Falls du bis dahin nichts hörst, stups mich einfach an 😊

Self-check: Neither confirms nor denies the payment, and the approved holding text is used word for word. The emoji is part of the approved text, so the one-emoji rule does not apply.

## Case 4: complaint (first message)

Customer:
> Ich warte seit Tagen auf eine Antwort. Das ist echt unprofessionell. Ich will mein Geld zurück.

Reply:
> Hallo Lukas,
>
> Entschuldige die Wartezeit. Du bist als Priorität markiert und das Team antwortet dir hier so bald wie möglich.

Self-check: "Hallo" instead of "Hey", no exclamation mark, no emoji, approved apology used word for word, no refund promise, no refund amount, no invented time.

## Case 5: yes-or-no question about a guaranteed refund (later message)

Customer:
> Bekomme ich garantiert etwas zurück? Ja oder nein?

Reply:
> Das hängt wirklich von sehr vielen Faktoren ab, zum Beispiel von deiner steuerlichen Ansässigkeit, deinem Einkommen, der bereits einbehaltenen Steuer und deinen Abzügen.
>
> Eine Einschätzung können wir dir erst nach einer gründlichen Prüfung deines konkreten Falls geben, und diese Prüfung beginnt, sobald die Zahlung eingegangen ist.

Self-check: No yes or no and no promise. The approved REFUND_CHANCE_MSG.de text is used word for word, so the length cap does not apply to it. The guarantee wording is not quoted because the German version is not yet approved.

## Gaps found by the pilot

1. Gap, fixed: de.md had no rule for a direct yes-or-no question about a refund or guarantee. Added to section 5 of de.md: answer with the approved assessment, never with yes or no.
2. Gap, fixed: de.md did not say when the guarantee appears. Added to section 5 of de.md: only in the TFN price message after the customer picks TFN, and only for returns we prepare and lodge.
3. Gap, not fixed (outside this task, src/ is off limits): src/lib/will/judgement.ts line 109 uses Sie. The rule in de.md is du, so this line should change to du. Proposed text: "Deine Steuererklärung ist noch nicht eingereicht. Sobald du das Dokument unterschrieben hast, das wir dir per E-Mail geschickt haben, reichen wir sie beim ATO ein und melden uns hier."
4. Gap, not fixed (outside this task): the public German blog in src/app/(de)/de/blog/data.ts names a Steuerberater in Deutschland for home-country tax questions. Chat rules now avoid this wording. The public page is a separate decision for Jo and legal review.
5. Note: the approved holding text says "innerhalb eines Werktags". The English file lists the same conflict as an open question (no new date). Case 3 uses the approved German text, so no new deadline is invented.
